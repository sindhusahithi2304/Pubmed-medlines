import { Utils, PatternMatcher, BaseModule } from '@sinequa/core/base';
import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵinject, Inject, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MINIMUM_COMPATIBLE_SERVER_API_VERSION, START_CONFIG, AppWebService, WebServicesModule } from '@sinequa/core/web-services';
import { IntlService, IntlModule } from '@sinequa/core/intl';
import { format } from 'd3-format';
import { HttpParams } from '@angular/common/http';

/**
 * @ignore
 *
 * Used internally to avoid circular references between ExprParser, AppService and FormatService.
 * Do not export from the app-utils module.
 */
class AppServiceHelpers {
    static isString(column) {
        if (!column) {
            return false;
        }
        if (column.eType === 14 /* string */) {
            return true;
        }
        if (column.eType === 15 /* csv */ && (column.eTypeModifier & 8388608 /* x */) === 8388608 /* x */) {
            return true;
        }
        return false;
    }
    static isCsv(column) {
        if (!column) {
            return false;
        }
        if (column.eType === 15 /* csv */ && (column.eTypeModifier & 8388608 /* x */) !== 8388608 /* x */) {
            return true;
        }
        return false;
    }
    static isTree(column) {
        if (!column) {
            return false;
        }
        if (column.eType === 15 /* csv */ && (column.eTypeModifier & 524292 /* t */) === 524292 /* t */) {
            return true;
        }
        return false;
    }
    static isEntity(column) {
        if (!column) {
            return false;
        }
        if (column.eType === 15 /* csv */ && (column.eTypeModifier & (2068 /* e */ | 2052 /* l */)) === (2068 /* e */ | 2052 /* l */)) {
            return true;
        }
        return false;
    }
    static isBoolean(column) {
        if (!column) {
            return false;
        }
        if (column.eType === 1 /* bool */) {
            return true;
        }
        return false;
    }
    static isDate(column) {
        if (!column) {
            return false;
        }
        if (column.eType === 2 /* date */ || column.eType === 3 /* dateTime */ || column.eType === 4 /* time */) {
            return true;
        }
        return false;
    }
    static isDouble(column) {
        if (!column) {
            return false;
        }
        if (column.eType === 8 /* double */ || column.eType === 7 /* float */) {
            return true;
        }
        return false;
    }
    static isInteger(column) {
        if (!column) {
            return false;
        }
        if (column.eType === 6 /* integer */ || column.eType === 5 /* unsigned */) {
            return true;
        }
        return false;
    }
    static isNumber(column) {
        return AppServiceHelpers.isInteger(column) || AppServiceHelpers.isDouble(column);
    }
    static isScalar(column) {
        return AppServiceHelpers.isNumber(column) || AppServiceHelpers.isDate(column) || AppServiceHelpers.isBoolean(column);
    }
    static isSortable(column) {
        return AppServiceHelpers.isString(column) || AppServiceHelpers.isScalar(column) ||
            (AppServiceHelpers.isCsv(column) && !!column && ((column.eTypeModifier & 2052 /* l */) === 2052 /* l */));
    }
}

/**
 * Represents a parsed fielded search expression. A tree of expression nodes is built when an expression
 * combines sub-expressions using boolean operators
 */
class Expr {
    constructor(init) {
        this._field = undefined;
        this._display = undefined;
        this._displayObj = undefined;
        /**
         * The values of this expression
         */
        this.values = undefined;
        if (!init.op1) {
            const valueInit = init;
            this.exprContext = valueInit.exprContext;
            if (!Utils.isUndefined(valueInit.value)) {
                this.value = ExprParser.unescape(valueInit.value);
            }
            else if (!Utils.isUndefined(valueInit.values)) {
                this.values = ExprParser.unescapeList(valueInit.values);
            }
            this.locations = valueInit.locations;
            this.field = valueInit.field;
            this.display = valueInit.display;
            this.operator = !Utils.isUndefined(valueInit.operator) ? valueInit.operator : 0 /* none */;
            this.near = -1;
            this.start = -1;
            this.length = 0;
        }
        else {
            const opsInit = init;
            this.exprContext = opsInit.exprContext;
            this.field = opsInit.field;
            this.display = opsInit.display;
            this.addOperand(opsInit.op1);
            this.addOperand(opsInit.op2);
            this.and = opsInit.and;
            this.near = -1;
            this.start = -1;
            this.length = 0;
        }
    }
    /**
     * Return the field name of this expression. Return the first ancestor's non-empty field
     * if the field on this node is empty
     */
    get field() {
        let expr = this;
        while (expr) {
            if (!Utils.isEmpty(expr._field)) {
                return expr._field;
            }
            expr = expr.parent;
        }
        return undefined;
    }
    /**
     * Set the field name of this expression
     */
    set field(value) {
        this._field = value;
    }
    /**
     * Return the display value of this expression. Return the first ancestor's non-empty display value
     * if the display value on this node is empty
     */
    get display() {
        let expr = this;
        while (expr) {
            if (!Utils.isEmpty(expr._display)) {
                return expr._display;
            }
            expr = expr.parent;
        }
        return undefined;
    }
    /**
     * Set the display value of this expression. If the display value is a valid stringified JSON object
     * then set `displayObj` to the parsed object
     */
    set display(value) {
        this._display = value;
        if (!this._display) {
            this._displayObj = undefined;
        }
        else {
            if (this._display[0] === "{" && this._display[this._display.length - 1] === "}") {
                try {
                    this._displayObj = Utils.fromJson(this._display);
                }
                catch (e) {
                    this._displayObj = undefined;
                }
            }
            else {
                this._displayObj = undefined;
            }
        }
    }
    /**
     * Return the display object of this expression. Return the first ancestor's non-empty display object
     * if the display object on this node is empty
     */
    get displayObj() {
        let expr = this;
        while (expr) {
            if (expr._displayObj) {
                return expr._displayObj;
            }
            expr = expr.parent;
        }
        return undefined;
    }
    /**
     * Return the value of this expression. Note that range expressions may have multiple values
     */
    get value() {
        if (!this.values || this.values.length === 0) {
            return undefined;
        }
        return this.values[0];
    }
    /**
     * Set the value of this expression
     */
    set value(value) {
        if (value === undefined) {
            this.values = undefined;
        }
        else {
            if (!this.values) {
                this.values = [];
            }
            this.values[0] = value;
            this.values.length = 1;
        }
    }
    get evaluationRegExps() {
        if (!this._evaluationRegExps) {
            this._evaluationRegExps = {};
        }
        return this._evaluationRegExps;
    }
    /**
     * Add an operand to this expression
     *
     * @param operand The operand to add
     * @param contextField The parser's field context, if any
     * @param prepend If `true` the operand is prepended to the operands
     */
    addOperand(operand, contextField, prepend = false) {
        if (Utils.isUndefined(contextField)) {
            contextField = this.field;
        }
        if (!this.operands) {
            this.operands = [];
        }
        if (!Utils.isEmpty(this.field) && Utils.isEmpty(operand.field) && !operand.isStructured) {
            if (Utils.isEmpty(contextField)) {
                // Prefer setting the fields explicitly on the target operands rather the Field to "text" on the source operand
                // operand.field = ExprParser.fieldPartnamePrefix + "text";
                for (const expr of this.operands) {
                    if (Utils.isEmpty(expr._field)) {
                        expr._field = this.field;
                    }
                }
                this.field = undefined;
            }
        }
        if (!Utils.eqNC(this.field || "", operand.field || "")) {
            operand._field = operand.field;
        }
        else {
            operand._field = undefined;
        }
        if (!Utils.isEmpty(this.display)) {
            operand._display = undefined;
        }
        if (prepend) {
            this.operands.unshift(operand);
        }
        else {
            this.operands.push(operand);
        }
        operand.parent = this;
    }
    /**
     * Return `true` if this expression is a leaf node (does have a value)
     */
    get isLeaf() {
        // if (this.value === null && !this.operands) throw "Expr.isLeaf - bad expression";
        return !!this.value;
    }
    /**
     * Make an expression object
     *
     * @param exprContext The expression context
     * @param text The value of the expression
     * @param field The parser's field context
     * @param display The display value
     * @param allowEmptyValue Determines how empty values will be processed when making the expression
     */
    static makeExpr(exprContext, text, field, display, allowEmptyValue) {
        if (!Expr.getIsStructuredField(exprContext, Expr.resolveField(exprContext, field))) {
            return new Expr({
                exprContext: exprContext,
                value: text,
                field: field,
                display: display
            });
        }
        const values = { value: undefined };
        const locations = { value: undefined };
        const operator = { value: 0 /* none */ };
        const range = { value: 0 /* none */ };
        Expr.parseValue(exprContext, text, field, allowEmptyValue, values, locations, operator, range);
        if (range.value !== 0 /* none */ && values.value && locations.value) {
            const value1 = values.value[0];
            const value2 = values.value[1];
            const location1 = locations.value[0];
            const location2 = locations.value[1];
            if (range.value === 1 /* gteLte */ && !Utils.eqNC(value1, "*") && !Utils.eqNC(value2, "*")) {
                return new Expr({
                    exprContext: exprContext,
                    values: values.value,
                    locations: locations.value,
                    field: field,
                    display: display,
                    operator: 11 /* between */
                });
            }
            const expr1 = !Utils.eqNC(value1, "*") ? new Expr({
                exprContext: exprContext,
                value: value1,
                locations: [location1],
                field: field,
                display: display,
                operator: range.value === 2 /* gteLt */ || range.value === 1 /* gteLte */ ? 3 /* gte */ : 2 /* gt */
            }) : null;
            const expr2 = !Utils.eqNC(value2, "*") ? new Expr({
                exprContext: exprContext,
                value: value2,
                locations: [location2],
                field: field,
                display: display,
                operator: range.value === 1 /* gteLte */ || range.value === 3 /* gtLte */ ? 5 /* lte */ : 4 /* lt */
            }) : undefined;
            if (!expr1 && !expr2) {
                return undefined;
            }
            if (!(!!expr1 && !!expr2))
                return !!expr1 ? expr1 : expr2;
            return new Expr({
                exprContext: exprContext,
                op1: expr1,
                and: true,
                op2: expr2,
                display: display
            });
        }
        return new Expr({
            exprContext: exprContext,
            values: values.value,
            locations: locations.value,
            field: field,
            display: display,
            operator: operator.value
        });
    }
    static resolveField(exprContext, field) {
        if (Utils.isString(field)) {
            return exprContext.appService.resolveColumnName(field);
        }
        return "";
    }
    static getColumn(exprContext, field) {
        return exprContext.appService.getColumn(field);
    }
    /**
     * Return the {@link CCColumn} corresponding to this expression
     */
    get column() {
        return Expr.getColumn(this.exprContext, this.field);
    }
    static getIsStructuredField(exprContext, field) {
        if (!field) {
            return false;
        }
        if (exprContext.disallowFulltext) {
            return true;
        }
        else {
            if (field[0] === ":") {
                return false; // :: => take partname over column
            }
            if (Utils.eqNCN(field, "exists", "missing")) {
                return true;
            }
            return !!Expr.getColumn(exprContext, field);
        }
    }
    /**
     * Return `true` if the expression has a non-fulltext field. In this case the expression will be a leaf node
     */
    get isStructuredField() {
        if (!this.isLeaf) {
            return false;
        }
        return Expr.getIsStructuredField(this.exprContext, this.field);
    }
    /**
     * Return `true` if the expression only contains non-fulltext fields
     */
    get isStructured() {
        if (this.mergedStructured) {
            return true;
        }
        if (this.isLeaf) {
            return this.isStructuredField;
        }
        if (!this.operands) {
            return false;
        }
        for (const operand of this.operands) {
            if (!operand.isStructured) {
                return false;
            }
        }
        return true;
    }
    /**
     * Return `true` if the expression and its ancestors do not have `not` set to `true`
     */
    get isPositive() {
        let positive = true;
        let current = this;
        while (current != null) {
            positive = positive && !current.not;
            current = current.parent;
        }
        return positive;
    }
    /**
     * Return an `ExprValueLocation` object for the passed text. Leading and trailing
     * whitespace is excluded
     */
    static getValueAndLocation(text) {
        let start = 0;
        let length = text.length;
        const value1 = Utils.trimStart(text);
        start += length - value1.length;
        length -= length - value1.length;
        const value2 = Utils.trimEnd(value1);
        length -= length - value2.length;
        return {
            value: value2,
            start: start,
            length: length
        };
    }
    static parseValue(exprContext, text, field, allowEmptyValue, values, locations, operator, range) {
        if (Utils.isEmpty(text) && !allowEmptyValue) {
            return;
        }
        const first = text[0];
        const last = text[text.length - 1];
        let vl;
        if ("[{".includes(first) && "]}".includes(last)) {
            text = text.substr(1, text.length - 2);
            let sepLen = 4;
            let sep = text.indexOf(" TO ");
            if (sep === -1) {
                sepLen = 2;
                sep = text.indexOf("..");
            }
            if (sep === -1) {
                const vls = ExprParser.valuesAndLocationsFromText(text, ',');
                values.value = [];
                locations.value = [];
                vls.forEach(vl1 => {
                    values.value.push(vl1.value);
                    locations.value.push({ start: 1 + vl1.start, length: vl1.length });
                });
                operator.value = 10 /* in */;
                return;
            }
            vl = Expr.getValueAndLocation(text.substr(0, sep));
            values.value = [vl.value];
            locations.value = [{ start: 1 + vl.start, length: vl.length }];
            vl = Expr.getValueAndLocation(text.substr(sep + sepLen));
            values.value.push(vl.value);
            locations.value.push({ start: 1 + sep + sepLen + vl.start, length: vl.length });
            if (first === "[") {
                range.value = last === "]" ? 1 /* gteLte */ : 2 /* gteLt */;
            }
            else { // '{'
                range.value = last === "}" ? 4 /* gtLt */ : 3 /* gtLte */;
            }
            return;
        }
        vl = {
            value: text,
            start: 0,
            length: text.length
        };
        if (text.startsWith("=")) {
            operator.value = 1 /* eq */;
            vl = Expr.getValueAndLocation(text.substr(1));
            vl.start += 1;
        }
        else if (text.startsWith(">=")) {
            operator.value = 3 /* gte */;
            vl = Expr.getValueAndLocation(text.substr(2));
            vl.start += 2;
        }
        else if (text.startsWith(">")) {
            operator.value = 2 /* gt */;
            vl = Expr.getValueAndLocation(text.substr(1));
            vl.start += 1;
        }
        else if (text.startsWith("<=")) {
            operator.value = 5 /* lte */;
            vl = Expr.getValueAndLocation(text.substr(2));
            vl.start += 2;
        }
        else if (text.startsWith("<>")) {
            operator.value = 6 /* neq */;
            vl = Expr.getValueAndLocation(text.substr(2));
            vl.start += 2;
        }
        else if (text.startsWith("<")) {
            operator.value = 4 /* lt */;
            vl = Expr.getValueAndLocation(text.substr(1));
            vl.start += 1;
        }
        else if (text.startsWith("~")) {
            operator.value = 7 /* regex */;
            vl = Expr.getValueAndLocation(text.substr(1));
            vl.start += 1;
        }
        else if (text.length > 1 && text.startsWith("/") && text.endsWith("/")) {
            operator.value = 7 /* regex */;
            vl.value = text.substr(1, text.length - 2);
            vl.start = 1;
            vl.length = vl.value.length;
        }
        if (text.startsWith("\"") && text.endsWith("\"")) {
            vl.value = text.substr(1, text.length - 2);
            vl.start = 1;
            vl.length = vl.value.length;
        }
        values.value = [vl.value];
        locations.value = [{ start: vl.start, length: vl.length }];
    }
    static getOperatorText(operator) {
        switch (operator) {
            case 1 /* eq */: return "=";
            case 2 /* gt */: return ">";
            case 3 /* gte */: return ">=";
            case 4 /* lt */: return "<";
            case 5 /* lte */: return "<=";
            case 6 /* neq */: return "<>";
            case 7 /* regex */: return "REGEXP";
            case 8 /* like */: return "LIKE";
            case 9 /* contains */: return "CONTAINS";
            case 10 /* in */: return "IN";
            case 11 /* between */: return "BETWEEN";
            default: return "=";
        }
    }
    /**
     * Find the first `ExprValueInfo` object from a starting position in this expression
     *
     * @param start The position at which to start the search
     */
    findValue(start) {
        if (this.isLeaf) {
            if (start >= this.start && start <= this.start + this.length) {
                if (!this.isStructured) {
                    return {
                        /* eslint-disable-next-line */
                        value: this.value,
                        /* eslint-disable-next-line */
                        field: this.field,
                        start: this.start,
                        length: this.length
                    };
                }
                else if (!!this.locations && this.values && this.values.length === this.locations.length) {
                    for (let i = 0, ic = this.values.length; i < ic; i++) {
                        const value = this.values[i];
                        const location = this.locations[i];
                        if (start >= this.start + location.start && start <= this.start + location.start + location.length) {
                            return {
                                value,
                                /* eslint-disable-next-line */
                                field: this.field,
                                start: this.start + location.start,
                                length: location.length
                            };
                        }
                    }
                }
            }
        }
        else if (!!this.operands) {
            for (const expr of this.operands) {
                const value = expr.findValue(start);
                if (value) {
                    return value;
                }
            }
        }
        return undefined;
    }
    /**
     * Combine two expressions into a single expression. The second expression will be added to
     * the first expression and the first expression returned if the first expression is non-leaf
     * and is an `AND` expression and not negated. Otherwise, a new `AND` expression will be created
     * to which both expressions are added as operands.
     */
    static combine(expr1, expr2) {
        if (!expr1) {
            return expr2;
        }
        if (!expr2) {
            return expr1;
        }
        if (!expr1.isLeaf && expr1.and && !expr1.not) {
            if (expr1.isLeaf || !expr2.and || expr2.not) {
                expr1.addOperand(expr2);
            }
            else {
                for (const expr3 of expr2.operands) {
                    expr1.addOperand(expr3);
                }
            }
            return expr1;
        }
        return new Expr({
            exprContext: expr1.exprContext,
            op1: expr1,
            and: true,
            op2: expr2
        });
    }
    normalizeField(field) {
        if (field && field[0] === ExprParser.fieldPartnamePrefix) {
            return field.substr(1);
        }
        return field;
    }
    shouldDisplayField() {
        if (!this.field && !this.parent) { // top level full text
            return true;
        }
        return !!this.field && (!this.parent || !Utils.eqNC(this.field, this.parent.field || ""));
    }
    getOperatorString() {
        if (this.operator === 0 /* none */ || this.operator === 1 /* eq */) {
            return "";
        }
        return Expr.getOperatorText(this.operator);
    }
    escapeValue(value) {
        if (!!value && !!this.column && (AppServiceHelpers.isString(this.column) || AppServiceHelpers.isCsv(this.column))) {
            return ExprParser.escape(value);
        }
        return value || "";
    }
    getValueString() {
        if (this.operator === 11 /* between */ && this.values && this.values.length === 2) {
            return `[${this.escapeValue(this.values[0])}..${this.escapeValue(this.values[1])}]`;
        }
        if (this.values && this.values.length > 1) {
            const sb = [];
            for (const value of this.values) {
                if (sb.length > 0) {
                    sb.push(", ");
                }
                sb.push(this.escapeValue(value));
            }
            sb.unshift("[");
            sb.push("]");
            return sb.join("");
        }
        return this.escapeValue(this.value);
    }
    addFieldToString(sb) {
        let added = false;
        if (this.shouldDisplayField()) {
            sb.push(this.normalizeField(this.field) || "text");
            added = true;
        }
        if (this.display) {
            sb.push(ExprParser.escape(this.display));
            added = true;
        }
        if (added) {
            sb.push(":");
        }
        return added;
    }
    _toString(withFields, inner) {
        const sb = [];
        if (this.isLeaf) {
            if (this.not) {
                sb.push("NOT ");
            }
            if (withFields) {
                this.addFieldToString(sb);
            }
            sb.push(this.getOperatorString());
            sb.push(this.getValueString());
        }
        else {
            if (!this.operands) {
                return "";
            }
            if (this.not) {
                sb.push("NOT ");
            }
            let bracketed = inner;
            if (this.addFieldToString(sb)) {
                bracketed = true;
            }
            if (bracketed) {
                sb.push("(");
            }
            let first = true;
            for (const operand of this.operands) {
                if (!first) {
                    if (this.and) {
                        sb.push(" AND ");
                    }
                    else {
                        sb.push(" OR ");
                    }
                }
                first = false;
                sb.push(operand._toString(withFields, true));
            }
            if (bracketed) {
                sb.push(")");
            }
        }
        return sb.join("");
    }
    /**
     * Return a string representation of this expression
     *
     * @param withFields If `true`, include field names
     */
    toString(withFields = true) {
        return this._toString(withFields, false);
    }
    addDisplay(options, ctxt, display) {
        this._addValue(options, ctxt, this.value || "", display);
    }
    encodeHTML(text, options) {
        if (options && options.asHTML) {
            return Utils.encodeHTML(text);
        }
        else {
            return text;
        }
    }
    _addValue(options, ctxt, value, display) {
        if (options.asHTML) {
            ctxt.message.push(`<span class="sq-value">`);
        }
        const column = this.exprContext.appService.getColumn(this.field);
        const valueId = `value${ctxt.valueIndex++}`;
        let _value = value;
        let _display;
        if (display) {
            _display = this.encodeHTML(ExprParser.unescape(display), options);
        }
        if (column && AppServiceHelpers.isNumber(column) && Utils.testFloat(value)) {
            _value = +value;
        }
        else if (column && AppServiceHelpers.isDate(column)) {
            _value = Utils.fromSysDateStr(value) || value;
        }
        else if (column && AppServiceHelpers.isBoolean(column)) {
            _value = Utils.isTrue(value);
        }
        else if (Utils.isString(_value)) {
            _value = this.encodeHTML(_value, options);
        }
        ctxt.message.push(`{${valueId}}`);
        ctxt.values[valueId] = column
            ? this.exprContext.formatService.formatFieldValue({ value: _value, display: _display }, column)
            : _display || _value;
        if (options.asHTML) {
            ctxt.message.push(`</span>`);
        }
    }
    addValue(options, ctxt) {
        if (this.values) {
            if (this.operator === 11 /* between */ && this.values.length === 2) {
                this._addValue(options, ctxt, this.values[0]);
                ctxt.message.push(" ");
                this.addOperator("AND", options, ctxt);
                ctxt.message.push(" ");
                this._addValue(options, ctxt, this.values[1]);
            }
            else if (this.values.length > 1) {
                let first = true;
                for (const value of this.values) {
                    ctxt.message.push(first ? "[" : ", ");
                    first = false;
                    this._addValue(options, ctxt, value);
                }
                ctxt.message.push("]");
            }
            else {
                this._addValue(options, ctxt, this.values[0]);
            }
        }
    }
    addText(options, ctxt, text) {
        const valueId = `value${ctxt.valueIndex++}`;
        const message = `{${valueId}}`;
        ctxt.message.push(message);
        ctxt.values[valueId] = this.encodeHTML(text, options);
    }
    addFieldLabel(options, ctxt) {
        const displayObj = this.displayObj;
        if (displayObj && displayObj.label) {
            this.addText(options, ctxt, displayObj.label);
        }
        else if (this.field) {
            const label = this.exprContext.appService.getLabel(this.normalizeField(this.field) || "");
            this.addText(options, ctxt, label);
        }
        else {
            if (!this.isStructured) {
                const label = this.exprContext.appService.getLabel("text");
                this.addText(options, ctxt, label);
            }
            else {
                const fields = this.getFields();
                fields.forEach((field, index) => {
                    if (index !== 0) {
                        this.addText(options, ctxt, "/");
                    }
                    const label = this.exprContext.appService.getLabel(field);
                    this.addText(options, ctxt, label);
                });
            }
        }
    }
    addField(options, ctxt) {
        if (options.asHTML) {
            ctxt.message.push(`<span class="sq-field">`);
        }
        this.addFieldLabel(options, ctxt);
        if (options.asHTML) {
            ctxt.message.push(`</span>`);
            ctxt.message.push(`<span class="sq-separator">`);
        }
        this.addText(options, ctxt, "msg#system.fieldSeparator");
        if (options.asHTML) {
            ctxt.message.push(`</span>`);
        }
    }
    addOperator(operator, options, ctxt) {
        if (!operator) {
            return;
        }
        if (options.asHTML) {
            ctxt.message.push(`<span class="sq-operator">`);
        }
        ctxt.message.push(this.encodeHTML(operator, options));
        if (options.asHTML) {
            ctxt.message.push(`</span>`);
        }
    }
    _toMessage(ctxt, options) {
        const inner = ctxt.inner;
        ctxt.inner = true;
        if (!options) {
            options = {};
        }
        if (Utils.isUndefined(options.useDisplay)) {
            options.useDisplay = true;
        }
        const displayObj = this.displayObj;
        const display = (displayObj ? displayObj.display : undefined) || this.display;
        const showNot = this.not && (inner || !options.hideOuterNot);
        const showField = (options.withFields || inner) && this.shouldDisplayField();
        if (options.useDisplay && !!display) {
            if (showNot) {
                this.addOperator("NOT", options, ctxt);
                ctxt.message.push(" ");
            }
            if (showField) {
                this.addField(options, ctxt);
            }
            this.addDisplay(options, ctxt, display);
        }
        else if (this.isLeaf) {
            if (showNot) {
                this.addOperator("NOT", options, ctxt);
                ctxt.message.push(" ");
            }
            if (showField) {
                this.addField(options, ctxt);
            }
            const operator = this.getOperatorString();
            if (operator) {
                this.addOperator(operator, options, ctxt);
                ctxt.message.push(" ");
            }
            this.addValue(options, ctxt);
        }
        else {
            if (!this.operands) {
                return { message: "" };
            }
            if (showNot) {
                this.addOperator("NOT", options, ctxt);
                ctxt.message.push(" ");
            }
            let bracketed = inner;
            if (showField) {
                this.addField(options, ctxt);
                bracketed = true;
            }
            if (bracketed) {
                ctxt.message.push("(");
            }
            let first = true;
            for (const operand of this.operands) {
                if (!first) {
                    if (this.and) {
                        ctxt.message.push(" ");
                        this.addOperator("AND", options, ctxt);
                        ctxt.message.push(" ");
                    }
                    else {
                        ctxt.message.push(" ");
                        this.addOperator("OR", options, ctxt);
                        ctxt.message.push(" ");
                    }
                }
                first = false;
                operand._toMessage(ctxt, options);
            }
            if (bracketed) {
                ctxt.message.push(")");
            }
        }
        if (inner) {
            return { message: "" };
        }
        return {
            message: ctxt.message.join(""),
            values: ctxt.values
        };
    }
    /**
     * Return an `ExprMessage` for the expression which can be used with [IntlService.formatMessage]{@link IntlService#formatMessage}
     * for display purposes
     */
    toMessage(options) {
        return this._toMessage({
            inner: false,
            message: ["txt#"],
            values: {},
            valueIndex: 0
        }, options);
    }
    static matchNode(context, expr1, expr2) {
        if (expr1.isLeaf !== expr2.isLeaf) {
            return false;
        }
        if (expr1.isLeaf) {
            if (expr1.isStructured !== expr2.isStructured) {
                return false;
            }
            if (expr1.not !== expr2.not) {
                return false;
            }
            const field1 = context.appService.resolveColumnAlias(expr1.field);
            const field2 = context.appService.resolveColumnAlias(expr2.field);
            if (field1 !== field2) {
                return false;
            }
            const operator1 = expr1.operator === 0 /* none */ ? 1 /* eq */ : expr1.operator;
            const operator2 = expr2.operator === 0 /* none */ ? 1 /* eq */ : expr2.operator;
            if (operator1 !== operator2) {
                return false;
            }
        }
        if (!expr1.isLeaf) {
            if (expr1.and !== expr2.and) {
                return false;
            }
            // All of the structured and non-structured operands in expr2 must be in expr1 so check that there are at least enough
            // operands available. (The actual matching of the contents of the operand nodes is done in the recursive calls to MatchNode)
            if (!expr1.operands !== !expr2.operands) {
                return false;
            }
            let expr1StructuredCount = 0, expr1UnstructuredCount = 0, expr2StructuredCount = 0, expr2UnstructuredCount = 0;
            expr1.operands.forEach((operand) => { if (operand.isStructured) {
                expr1StructuredCount++;
            }
            else {
                expr1UnstructuredCount++;
            } });
            expr2.operands.forEach((operand) => { if (operand.isStructured) {
                expr2StructuredCount++;
            }
            else {
                expr2UnstructuredCount++;
            } });
            if ((expr2StructuredCount > expr1StructuredCount) || (expr2UnstructuredCount > expr1UnstructuredCount)) {
                return false;
            }
        }
        const values1Length = expr1.values ? expr1.values.length : 0;
        const values2Length = expr2.values ? expr2.values.length : 0;
        if (values1Length !== values2Length) {
            return false;
        }
        if (values1Length && expr1.values && expr2.values) {
            for (const value1 of expr1.values) {
                let found = false;
                for (const value2 of expr2.values) {
                    if (Utils.eqNC(value1, value2)) {
                        found = true;
                    }
                }
                if (!found) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * Return `true` if this expression matches the passed one
     */
    matchNode(expr) {
        return Expr.matchNode(this.exprContext, this, expr);
    }
    /**
     * Returns the matching expression or sub-expression in this expression with the passed one.
     *
     * @param expr The expression to match
     * @param filter An option filter function called on first level candidate sub-expressions
     * before matching within them
     */
    find(expr, filter) {
        if (this.matchNode(expr)) {
            if (!this.isLeaf && this.operands) {
                for (const child1 of expr.operands) {
                    let found = false;
                    for (const child2 of this.operands) {
                        if (filter && filter(child2)) {
                            continue;
                        }
                        if (child2.find(child1)) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        return null;
                    }
                }
            }
            return this;
        }
        else {
            if (!this.isLeaf && this.operands) {
                for (const child of this.operands) {
                    if (filter && filter(child)) {
                        continue;
                    }
                    if (child.find(expr)) {
                        return child;
                    }
                }
            }
        }
        return null;
    }
    /**
     * Perform the passed `action` on this expression and any descendant operands
     *
     * @param action The action to perform
     */
    forEach(action) {
        action(this);
        if (this.operands) {
            for (const operand of this.operands) {
                operand.forEach(action);
            }
        }
    }
    /**
     * Execute the callback function on this node and any descendants until the callback returns a truthy value
     * in which case immediately return `true`. Otherwise return `false`.
     */
    some(callback) {
        if (callback(this)) {
            return true;
        }
        if (this.operands) {
            for (const operand of this.operands) {
                if (operand.some(callback)) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Execute the callback function on this node and any descendants until the callback returns a falsy value
     * in which case, immediately return `false`. Otherwise return `true`.
     */
    every(callback) {
        if (!callback(this)) {
            return false;
        }
        if (this.operands) {
            for (const operand of this.operands) {
                if (!operand.every(callback)) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * Return `true` if the exoression has at least one fulltext operand.
     * The test on `isPositive` filters expressions that only contain
     * negative fulltext terms which will be ignored on the server. Fulltext
     * expressions must have at least one positive term.
     */
    get hasRelevance() {
        return this.some(expr => expr.isLeaf && !expr.isStructured && expr.isPositive);
    }
    /**
     * Return an array of all fields used in this expression
     */
    getFields() {
        const fields = [];
        this.forEach((expr) => {
            const field = this.exprContext.appService.resolveColumnAlias(expr.field);
            if (field) {
                if (!fields.find((field1) => Utils.eqNC(field, field1))) {
                    fields.push(field);
                }
            }
        });
        return fields;
    }
    /**
     * Return an array of all values used in this expression that pertain to the passed field and where the associated `isPositive`
     * field matches the passed `positive` parameter
     *
     * @param field The field for which values are to be returned
     * @param positive The value to test against `isPositive`
     */
    getValues(field, positive = true) {
        const values = [];
        const column = this.exprContext.appService.resolveColumnName(field);
        this.forEach((expr) => {
            if (column) {
                const column1 = this.exprContext.appService.resolveColumnName(expr.field);
                if (!Utils.eqNC(column, column1)) {
                    return;
                }
            }
            if (expr.isLeaf && expr.isPositive === positive && expr.values) {
                values.push(...expr.values);
            }
        });
        return values;
    }
    getDataValue(data, field, defaultScope) {
        if (!data) {
            return undefined;
        }
        const fields = Utils.split(field || "", ".");
        if (fields.length >= 1 && Utils.isUndefined(data[fields[0]]) && !!defaultScope) {
            // By default, look on the "defaultScope" sub-object
            fields.unshift(...Utils.split(defaultScope, "."));
        }
        let value = data;
        for (const _field of fields) {
            if (!value) {
                break;
            }
            value = value[_field];
        }
        return value;
    }
    getWildcardRegExp(value) {
        if (value) {
            let regExp = this.evaluationRegExps[value];
            if (!Utils.isUndefined(regExp)) {
                return regExp;
            }
            let haveWildcards = false;
            let escaping = false;
            const sb = [];
            for (const ch of value) {
                switch (ch) {
                    // Handle wildcards and wildcard escaping
                    case "\\":
                        if (escaping) {
                            sb.push("\\\\");
                            escaping = false;
                        }
                        else {
                            escaping = true;
                        }
                        break;
                    case "*":
                        if (escaping) {
                            sb.push("\\");
                            sb.push(ch);
                            escaping = false;
                        }
                        else {
                            haveWildcards = true;
                            sb.push(".*?");
                        }
                        break;
                    case "?":
                        if (escaping) {
                            sb.push("\\");
                            sb.push(ch);
                            escaping = false;
                        }
                        else {
                            haveWildcards = true;
                            sb.push(".");
                        }
                        break;
                    // Escape other regexp special characters
                    case "-":
                    case "/":
                    case "^":
                    case "$":
                    case "+":
                    case ".":
                    case "(":
                    case ")":
                    case "|":
                    case "[":
                    case "]":
                    case "{":
                    case "}":
                        sb.push("\\");
                        sb.push(ch);
                        escaping = false;
                        break;
                    // All other characters just emit
                    default:
                        sb.push(ch);
                        escaping = false;
                        break;
                }
            }
            if (haveWildcards) {
                regExp = new RegExp("^" + sb.join("") + "$", "i");
                this.evaluationRegExps[value] = regExp;
                return regExp;
            }
            else {
                this.evaluationRegExps[value] = undefined;
            }
        }
        return undefined;
    }
    // NB comparisons with NaN always return false
    compare(value, dataValue, equality) {
        if (Utils.isArray(dataValue) && dataValue.length === 0) {
            return NaN;
        }
        const column = Expr.getColumn(this.exprContext, this.field || "");
        if (Utils.isArray(dataValue) || Utils.isArray(value)) {
            // "in" / "contains"
            if (!Utils.isArray(dataValue)) {
                dataValue = [dataValue];
            }
            if (Utils.isArray(value)) {
                if (value.length === 0) {
                    return NaN;
                }
            }
            else {
                value = [value + ""];
            }
            // At least one value in the value array must match a value in the dataValue array
            for (const value1 of value) {
                for (const dataValue1 of dataValue) {
                    if (this.compare(value1, dataValue1, true) === 0) {
                        return 0;
                    }
                }
            }
            return NaN;
        }
        if (!Utils.isArray(value)) {
            value = ExprParser.unescape(value || "");
            if (column && column.parser) {
                value = this.exprContext.formatService.parseValue(value, column.parser);
            }
            if (AppServiceHelpers.isNumber(column)) {
                if (!Utils.isNumber(dataValue)) {
                    dataValue = 0;
                }
                const _value = Utils.toNumber(value);
                return dataValue - _value;
            }
            if (AppServiceHelpers.isDate(column)) {
                if (Utils.isString(dataValue)) {
                    dataValue = Utils.toDate(dataValue);
                }
                if (Utils.isDate(dataValue)) {
                    const _value = this.exprContext.intlService.parseDate(value);
                    if (_value) {
                        return dataValue.getTime() - _value.getTime();
                    }
                }
                return NaN;
            }
            if (AppServiceHelpers.isBoolean(column)) {
                const _value = Utils.isTrue(value) ? 1 : 0;
                return (dataValue ? 1 : 0) - _value;
            }
            dataValue = dataValue || "";
            if (Utils.isString(dataValue)) {
                dataValue = ExprParser.unescape(dataValue);
                if (equality) {
                    const regExp = this.getWildcardRegExp(value);
                    if (regExp) {
                        return regExp.test(dataValue) ? 0 : -1;
                    }
                }
                return Utils.compare(dataValue, value);
            }
        }
        return NaN;
    }
    /**
     * Evaluate this expression using `data` to provide field values. Field values
     * can contain scopes (full stop separated components) to reference sub-objects
     * in the data
     *
     * @param data The field values to be used in the evaluation
     * @param defaultScope If a field value cannot be resolved then try to retrieve a value with this scope prepended to the field name
     * @return The boolean result of the expression evaluation
     */
    evaluate(data, defaultScope) {
        let ret;
        if (this.isLeaf) {
            if (!this.isStructured) {
                ret = false;
            }
            else {
                if (Utils.eqNC(this.field || "", "exists")) {
                    const dataValue = this.getDataValue(data, this.value, defaultScope);
                    ret = !Utils.isUndefined(dataValue);
                }
                else if (Utils.eqNC(this.field || "", "missing")) {
                    const dataValue = this.getDataValue(data, this.value, defaultScope);
                    ret = Utils.isUndefined(dataValue);
                }
                else {
                    const dataValue = this.getDataValue(data, this.field, defaultScope);
                    switch (this.operator) {
                        case 0 /* none */:
                        case 1 /* eq */:
                            ret = this.compare(this.value, dataValue, true) === 0;
                            break;
                        case 2 /* gt */:
                            ret = this.compare(this.value, dataValue) > 0;
                            break;
                        case 3 /* gte */:
                            ret = this.compare(this.value, dataValue) >= 0;
                            break;
                        case 4 /* lt */:
                            ret = this.compare(this.value, dataValue) < 0;
                            break;
                        case 5 /* lte */:
                            ret = this.compare(this.value, dataValue) <= 0;
                            break;
                        case 6 /* neq */:
                            ret = this.compare(this.value, dataValue, true) !== 0;
                            break;
                        case 7 /* regex */: {
                            const regExp = new RegExp(this.value || "");
                            ret = regExp.test(dataValue + "");
                            break;
                        }
                        case 8 /* like */: // not currently generated in parse
                            ret = this.compare(this.value + "*", dataValue, true) === 0;
                            break;
                        case 10 /* in */:
                            ret = this.compare(this.values, dataValue, true) === 0;
                            break;
                        case 9 /* contains */: // not currently generated in parse
                            ret = this.compare(this.value, dataValue, true) === 0;
                            break;
                        case 11 /* between */:
                            ret = !!this.values &&
                                this.compare(this.values[0], dataValue) >= 0 && this.compare(this.values[1], dataValue) <= 0;
                            break;
                    }
                }
            }
        }
        else {
            ret = !!this.and;
            for (const operand of this.operands) {
                const ret1 = operand.evaluate(data, defaultScope);
                if (this.and) {
                    ret = ret && ret1;
                    if (!ret) {
                        break;
                    }
                }
                else {
                    ret = ret || ret1;
                }
            }
        }
        if (this.not) {
            ret = !ret;
        }
        return ret;
    }
}
/**
 * @ignore
 */
class ExprParserOperator {
    constructor(tok, value = "", valuePos = -1, valueLen = -1) {
        this.tok = tok;
        this.tokValue = value;
        this.tokValuePos = valuePos;
        this.tokValueLen = valueLen;
    }
}
ExprParserOperator.invalid = new ExprParserOperator(-1 /* invalid */);
ExprParserOperator.or = new ExprParserOperator(0 /* or */);
ExprParserOperator.and = new ExprParserOperator(1 /* and */);
ExprParserOperator.not = new ExprParserOperator(2 /* not */);
ExprParserOperator.lPar = new ExprParserOperator(5 /* lPar */);
ExprParserOperator.rPar = new ExprParserOperator(6 /* rPar */);
ExprParserOperator.eof = new ExprParserOperator(7 /* eof */);
/**
 * A parser for Sinequa fielded search expressions. Such expressions allow filters to be specified in fulltext and
 * can be combined with boolean operators to build complex queries.
 *
 * A single fielded search clause has this form:
 * ``<fieldname>[`display value`]:[:][<operator>]<value>``
 *
 * A field name is either a column name or alias or a partname. In the case of a partname and column name clashing then
 * the field is treated as a column. Two colons can be specified as the separator to denote that the field is a partname.
 * An optional display value can follow the fieldname enclosed in backquote characters
 *
 * Operators are: `=` (default), `>=`, `>`, `<=`, `<`, `~` (regexp)
 * In addition, a regular expression can be specified by enclosing the value in `/` characters
 *
 * An inclusive range of values can be specified using a square bracket syntax: `[value1..value2]`
 * An exclusive range of values can be specified using a curly bracket syntax: `{value1..value2}`
 * The brackets can be mixed. For example: `age:{5..13]` expresses `13 >= age > 5`.
 *
 * For multi-value csv fields an `IN` condition can be expressed using a comma-separated list of values enclosed in square brackets.
 * For example: `authors:[Proust, Orwell, Dickens]`
 *
 * If a value contains reserved characters then it can be enclosed in backquote characters to prevent the parser interpreting them
 * incorrectly. For example: ``code: `a:b:c` ``
 *
 * The parser also supports a NEAR operator to allow searching for terms close to each other. There are two forms suppported:
 * * infix - `term1 NEAR[/n] term2` where `n` is the maximum number of words between the two terms for them to match
 * * function - `NEAR[/n](term1, term2, term3, ...)` where `n` is "window" size within which all the terms must be present for them
 * to match. The minimum useful value for n is thus equal to the number of terms passed to the operator.
 *
 * Fielded search expresions can be combined with the boolean operators `AND`, `OR` and `NOT` and brackets used for grouping.
 * For example: `football (age:>=7 AND (name:smith OR name:jones))`
 */
class ExprParser {
    constructor(exprContext, options) {
        this.exprContext = exprContext;
        this.options = options || {};
        this.exprContext.disallowFulltext = this.options.disallowFulltext;
        this.expressions = [];
        this.operators = [];
        this.fields = [];
        this.displays = [];
        this.text = "";
        this.current = 0;
        this.length = 0;
        this.op = this.prevOp = this.saveOp = ExprParserOperator.invalid;
    }
    /**
     * Escape a string so that the characters in it are not processed by the fielded search expression parser.
     * Single occurrences of the backslash character are replaced by two backslashes and backquote characters
     * are prefixed by a backslash. Finally, the string is enclosed in backquotes.
     *
     * For example: `` a\`\b `` => `` a\\\`\\b ``
     */
    // \ => \\
    // ` => \`
    // then surround with ``
    static escape(value) {
        if (!value) {
            return "``";
        }
        value = String(value); // make sure we have a string
        if (value.search(/[\\`]/) === -1) {
            return "`" + value + "`";
        }
        const sb = ["`"];
        for (let i = 0, ic = value.length; i < ic; i++) {
            const ch = value[i];
            if (ch === "\\" || ch === "`") {
                sb.push("\\");
            }
            sb.push(ch);
        }
        sb.push("`");
        return sb.join("");
    }
    static isEscaped(value) {
        return !!value && value.length >= 2 && value[0] === "`" && value[value.length - 1] === "`";
    }
    /**
     * Perform the reverse operation to [ExprParser.escpae]{@link ExprParser#escape}
     */
    // remove surrounding ``
    // \\ => \
    // \` => `
    static unescape(value) {
        if (!ExprParser.isEscaped(value)) {
            return value;
        }
        const sb = [];
        for (let i = 1, ic = value.length - 1; i < ic; i++) {
            let ch = value[i];
            if (ch === "\\") {
                if (i >= ic - 1) { // we end with a \ => drop it
                    continue;
                }
                ch = value[++i];
            }
            sb.push(ch);
        }
        return sb.join("");
    }
    /**
     * @ignore
     */
    static unescapeList(values) {
        if (!values) {
            return values;
        }
        const values1 = [];
        for (let _i = 0, _a = values; _i < _a.length; _i++) {
            const value = _a[_i];
            values1.push(ExprParser.unescape(value));
        }
        return values1;
    }
    /**
     * @ignore
     */
    static valuesAndLocationsFromText(text, separator) {
        if (Utils.isEmpty(text)) {
            return [];
        }
        if (!text.includes(separator)) {
            return [{ value: text, start: 0, length: text.length }];
        }
        const values = [];
        const length = text.length;
        let current = 0;
        let currentStart = 0;
        const sb = [];
        let value;
        while (true) {
            if (current >= length) {
                value = Expr.getValueAndLocation(sb.join(""));
                value.start += currentStart;
                if (!Utils.isEmpty(value.value)) {
                    values.push(value);
                }
                break;
            }
            const ch = text[current];
            if (ch === "\\") {
                sb.push(ch);
                current++;
                if (current < length) {
                    const ch1 = text[current];
                    if (ch1 === "\\" || ch1 === "`") {
                        sb.push(ch1);
                        current++;
                    }
                }
            }
            else if (ch === "`") {
                const last = { value: 0 };
                const s = ExprParser.matchUntil(text, length, current, current + 1, "`", last);
                if (!!s) {
                    sb.push(s);
                    current = last.value;
                }
                else {
                    sb.push(ch);
                    current++;
                }
            }
            else if (ch === separator) {
                value = Expr.getValueAndLocation(sb.join(""));
                value.start += currentStart;
                sb.length = 0;
                if (!Utils.isEmpty(value.value)) {
                    values.push(value);
                }
                current++;
                currentStart = current;
            }
            else {
                sb.push(ch);
                current++;
            }
        }
        return values;
    }
    matchKeyword(keyword, sbCurrentValue, suffixCh) {
        if (sbCurrentValue.length !== 0) {
            const currentValue = sbCurrentValue.join("");
            if (!!currentValue && !" \r\n\t".includes(currentValue[currentValue.length - 1])) {
                return false;
            }
        }
        if (Utils.isEmpty(keyword)) {
            return false;
        }
        const keywordLen = keyword.length;
        if (this.current + keywordLen > this.length) {
            return false;
        }
        for (let i = 0, ic = keywordLen; i < ic; i++) {
            const ch = this.text[this.current + i];
            const kh = keyword[i];
            if (ch !== kh) {
                return false;
            }
        }
        if (this.current + keywordLen < this.length) {
            const nch = this.text[this.current + keywordLen];
            if (nch !== suffixCh && !" \r\n\t(".includes(nch)) {
                return false;
            }
        }
        return true;
    }
    matchUntil(first, start, endChars, last) {
        return ExprParser.matchUntil(this.text, this.length, first, start, endChars, last);
    }
    static matchUntil(text, length, first, start, endChars, last) {
        last.value = start;
        let found = false;
        const sb = [text.substr(first, start - first)];
        while (last.value < length) {
            let ch = text[last.value++];
            if (ch === "\\") {
                sb.push(ch);
                if (last.value < length) {
                    ch = text[last.value++];
                    if (ch === "\\" || ch === "`") {
                        sb.push(ch);
                        continue;
                    }
                }
            }
            sb.push(ch);
            if (endChars.includes(ch)) {
                found = true;
                break;
            }
        }
        if (!found) {
            return undefined;
        }
        return sb.join("");
    }
    matchSimpleValue(start) {
        const first = this.current;
        let last = start;
        while (last < this.length) {
            const ch = this.text[last];
            if (" \r\n\t)".includes(ch)) {
                break;
            }
            last++;
        }
        if (last === start) {
            return "";
        }
        return this.text.substr(first, last - first);
    }
    getTerminators(ch, allowRanges) {
        if (ch === "\"")
            return "\"";
        if (ch === "[")
            return allowRanges ? "]}" : "]";
        if (ch === "{")
            return allowRanges ? "}]" : "}";
        if (ch === "/")
            return "/";
        if (ch === "(")
            return ")";
        if (ch === "`")
            return "`";
        return "";
    }
    canBeTokValue(value, canBeEmpty = true) {
        return !Utils.isEmpty(value) || (canBeEmpty && this.options.allowEmptyValues && !Utils.isEmpty(this.field));
    }
    _getTokValue(value, canBeEmpty = true) {
        // Current is pointing at the next non-whitepspace character after this value
        if (value === null)
            return false;
        let pos = this.current;
        const len = value.length;
        value = Utils.trimEnd(value);
        pos -= len - value.length;
        value = value.trim();
        if (this.canBeTokValue(value, canBeEmpty)) {
            this.op = new ExprParserOperator(8 /* value */, value, pos - value.length, value.length);
            return true;
        }
        return false;
    }
    getTokValue(sb, canBeEmpty = true) {
        if (!sb) {
            return false;
        }
        return this._getTokValue(sb.join(""), canBeEmpty);
    }
    ensureNearValue(value) {
        const defaultNearValue = this.exprContext.appService.ccquery ? this.exprContext.appService.ccquery.defaultNearValue : 0;
        let near = Utils.toInt(value, defaultNearValue);
        if (near < 0) {
            near = defaultNearValue;
        }
        return near.toString();
    }
    findDisplay(value) {
        if (!value || value.length < 3) {
            return -1;
        }
        if (value[value.length - 1] !== "`") {
            return -1;
        }
        let pos = value.length - 2;
        while (pos !== -1) {
            pos = value.lastIndexOf("`", pos);
            if (pos !== -1) {
                let escapes = 0;
                let pos1 = pos - 1;
                while (pos1 >= 0) {
                    if (value[pos1] !== "\\") {
                        break;
                    }
                    escapes++;
                    pos1--;
                }
                if (escapes % 2 === 0) {
                    return pos;
                }
                pos--;
            }
        }
        return -1;
    }
    isValidFieldName(name) {
        return this.options.allowScopedFields ? Utils.isValidScopedSimpleName(name) : Utils.isValidSimpleName(name);
    }
    isAllowedField(field, forcePartname, isPartname) {
        isPartname.value = false;
        if (Utils.eqNCN(field, "exists", "missing")) {
            return true;
        }
        if (Utils.eqNCN(field, "text", "concepts", "refine", "matchingpartnames")) {
            // NB @concepts, @refine and @matchingpartnames must be handled specially by the caller
            isPartname.value = true;
            return true;
        }
        const ccquery = this.exprContext.appService.ccquery;
        if (ccquery) {
            forcePartname = forcePartname && !this.exprContext.disallowFulltext;
            let column = forcePartname ? undefined : this.exprContext.appService.getColumn(field);
            if (!!column) {
                if (column.eType === 12 /* varchar */) { // only type not indexed
                    column = undefined;
                }
                else if ((ccquery.$columnFieldsPattern && ccquery.$columnFieldsPattern.hasPatterns()) &&
                    !ccquery.$columnFieldsPattern.isIncluded(field) &&
                    !ccquery.$columnFieldsPattern.isIncluded(column.name)) {
                    column = undefined;
                }
            }
            if (!this.exprContext.disallowFulltext && !column) {
                isPartname.value = true;
                if ((ccquery.$partnameFieldsPattern && ccquery.$partnameFieldsPattern.hasPatterns()) &&
                    !ccquery.$partnameFieldsPattern.isIncluded(field)) {
                    return false;
                }
            }
        }
        return true;
    }
    readToken() {
        if (this.saveOp !== ExprParserOperator.invalid) {
            this.prevOp = this.op;
            this.op = this.saveOp;
            this.saveOp = ExprParserOperator.invalid;
            return undefined;
        }
        let ch;
        this.prevOp = this.op;
        let nextValue;
        const sbCurrentValue = [];
        let candidateFieldPos = -1;
        let fieldSpecified = false;
        while (true) {
            if (this.current >= this.length) {
                if (this.getTokValue(sbCurrentValue)) {
                    return undefined;
                }
                this.op = ExprParserOperator.eof;
                return undefined;
            }
            ch = this.text[this.current];
            if (ch === "\\") { // \ escapes \ and `
                sbCurrentValue.push(ch);
                this.current++;
                if (this.current < this.length) {
                    const ch1 = this.text[this.current];
                    if (ch1 === "\\" || ch1 === "`") {
                        sbCurrentValue.push(ch1);
                        this.current++;
                    }
                }
            }
            else if (ch === "(") {
                if (this.getTokValue(sbCurrentValue, false)) {
                    return undefined;
                }
                this.op = ExprParserOperator.lPar;
                this.current++;
                return undefined;
            }
            else if (ch === ")") {
                if (this.getTokValue(sbCurrentValue)) {
                    return undefined;
                }
                this.op = ExprParserOperator.rPar;
                this.current++;
                return undefined;
            }
            else if (this.matchKeyword("AND", sbCurrentValue)) {
                if (this.getTokValue(sbCurrentValue)) {
                    return undefined;
                }
                this.op = ExprParserOperator.and;
                this.current += 3;
                return undefined;
            }
            else if (this.matchKeyword("OR", sbCurrentValue)) {
                if (this.getTokValue(sbCurrentValue)) {
                    return undefined;
                }
                this.op = ExprParserOperator.or;
                this.current += 2;
                return undefined;
            }
            else if (this.matchKeyword("NOT", sbCurrentValue)) {
                if (this.getTokValue(sbCurrentValue)) {
                    return undefined;
                }
                this.op = ExprParserOperator.not;
                this.current += 3;
                return undefined;
            }
            else if (this.matchKeyword("NEAR", sbCurrentValue, "/")) {
                if (this.getTokValue(sbCurrentValue)) {
                    return undefined;
                }
                this.current += 4;
                nextValue = undefined;
                if (this.current < this.length && this.text[this.current] === "/") {
                    const last = { value: 0 };
                    nextValue = this.matchUntil(this.current + 1, this.current + 1, " \r\n\t`\"([/", last);
                    let near = -1;
                    if (nextValue !== undefined) {
                        nextValue = nextValue.substr(0, nextValue.length - 1);
                        near = Utils.toInt(nextValue, -1);
                    }
                    if (near < 0) {
                        return "bad operator";
                    }
                    this.current = last.value - 1;
                }
                nextValue = this.ensureNearValue(nextValue || "");
                const infix = this.current >= this.length || this.text[this.current] !== "(";
                // For infix, near value is the number of words between the two terms so add the 2 terms to
                // the window (near/0 = adjacent terms)
                this.op = infix ?
                    new ExprParserOperator(4 /* infixNear */, (Utils.toInt(nextValue) + 2).toString()) :
                    new ExprParserOperator(3 /* near */, nextValue);
                return undefined;
            }
            else if (ch === "+" || ch === "-") {
                if (this.current + 1 < this.length) {
                    const ch1 = this.text[this.current + 1];
                    const last = { value: 0 };
                    let length;
                    if ("(\"[/`".includes(ch1)) { // ( " [ / `
                        nextValue = this.matchUntil(this.current, this.current + 2, this.getTerminators(ch1, false), last);
                        length = last.value - this.current;
                    }
                    else {
                        nextValue = this.matchSimpleValue(this.current + 1);
                        length = !!nextValue ? nextValue.length : 0;
                    }
                    if (!!nextValue) {
                        sbCurrentValue.push(nextValue);
                        this.current += length;
                        continue;
                    }
                }
                return "bad operator: " + ch;
            }
            else if ("\"[{/`".includes(ch)) { // " [ { / `
                const last = { value: 0 };
                nextValue = this.matchUntil(this.current, this.current + 1, this.getTerminators(ch, true), last);
                if (!!nextValue) {
                    const forceRange = (fieldSpecified && "[{".includes(ch) && sbCurrentValue.length === 0);
                    sbCurrentValue.push(nextValue);
                    this.current = last.value;
                    if (forceRange && this.getTokValue(sbCurrentValue)) {
                        return undefined;
                    }
                    continue;
                }
                return "bad operator: " + ch;
            }
            else {
                if (ch === ":") { // Field
                    // Pick out previous value and/or field name
                    // Field specifier can be:
                    // field:value
                    // field`display`:value
                    // `display`:value
                    const currentValue = sbCurrentValue.join("");
                    if (candidateFieldPos === -1) {
                        // Check for display
                        candidateFieldPos = this.findDisplay(currentValue);
                        if (candidateFieldPos === -1) {
                            this.op = ExprParserOperator.invalid;
                            return "invalid token";
                        }
                    }
                    let field = currentValue.substr(candidateFieldPos).trim();
                    let display = "";
                    // Extract display
                    const displayStart = this.findDisplay(field);
                    if (displayStart !== -1) {
                        display = ExprParser.unescape(field.substr(displayStart, field.length - displayStart));
                        field = field.substr(0, displayStart);
                    }
                    if (this.isValidFieldName(field) || (Utils.isEmpty(field) && !Utils.isEmpty(display))) {
                        const value = currentValue.substr(0, candidateFieldPos);
                        if (this.canBeTokValue(value.trim())) {
                            this.current -= (sbCurrentValue.join("").length - candidateFieldPos); // back up to field
                            this._getTokValue(value);
                            return undefined;
                        }
                        if (!Utils.isEmpty(field)) {
                            let forcePartname = false;
                            if (this.current + 1 < this.length && this.text[this.current + 1] === ":") {
                                // :: => force partname over column
                                forcePartname = true;
                                this.current++;
                            }
                            const isPartname = { value: false };
                            if (!this.isAllowedField(field, forcePartname, isPartname)) {
                                candidateFieldPos = -1;
                                sbCurrentValue.push(":");
                                if (forcePartname) {
                                    sbCurrentValue.push(":");
                                }
                                this.current++;
                                continue;
                            }
                            if (isPartname.value) {
                                field = ExprParser.fieldPartnamePrefix + field;
                            }
                        }
                        if (!Utils.isEmpty(field)) {
                            this.field = field;
                            fieldSpecified = true;
                        }
                        if (!Utils.isEmpty(display)) {
                            this.display = display;
                        }
                        sbCurrentValue.length = 0;
                        this.current++;
                        continue;
                    }
                }
                if (" \r\n\t)".includes(ch)) {
                    candidateFieldPos = -1;
                }
                else if (candidateFieldPos === -1) {
                    candidateFieldPos = sbCurrentValue.join("").length;
                }
                sbCurrentValue.push(ch);
                this.current++;
            }
        }
    }
    clear() {
        this.text = "";
        this.current = 0;
        this.length = 0;
        this.operators.length = 0;
        this.expressions.length = 0;
        this.fields.length = 0;
        this.displays.length = 0;
    }
    /**
     * Parse some text using the Sinequa fielded search syntax
     *
     * @return The parsed `Expr` or an error string
     */
    static parse(text, context, options) {
        const parser = new ExprParser(context, options);
        const error = parser.parse(text);
        if (error) {
            return error;
        }
        return parser.parseResult();
    }
    parseResult() {
        if (this.expressions.length !== 1) {
            return "no expression found";
        }
        return this.expressions[0];
    }
    get contextField() {
        let field = this.field;
        if (Utils.isEmpty(field)) {
            field = this.peekField();
        }
        return field;
    }
    get contextDisplay() {
        let display = this.display;
        if (Utils.isEmpty(display)) {
            display = this.peekDisplay();
        }
        return display;
    }
    parse(text) {
        this.clear();
        if (this.options.allowEmptyValues && !Utils.len(text.trim())) {
            const expr = Expr.makeExpr(this.exprContext, "", this.contextField, this.contextDisplay, this.options.allowEmptyValues);
            if (expr) {
                expr.start = 0;
                expr.length = 0;
                this.expressions.push(expr);
            }
            return "";
        }
        this.text = text || "";
        this.length = this.text.length;
        this.operators.push(ExprParserOperator.eof);
        let err = this.readToken();
        if (err) {
            return err;
        }
        while (true) {
            if ((this.op.tok === 8 /* value */ || this.op.tok === 5 /* lPar */ || this.op.tok === 2 /* not */ || this.op.tok === 3 /* near */) &&
                (this.prevOp.tok === 8 /* value */ || this.prevOp.tok === 6 /* rPar */)) {
                // Default to AND for space separated terms
                // NOT xxx => AND NOT xxx
                this.saveOp = this.op;
                this.op = ExprParserOperator.and;
            }
            let a;
            if (this.op.tok === 8 /* value */) {
                a = 0 /* s */;
            }
            else {
                a = ExprParser.parsetbl[this.operators[this.operators.length - 1].tok][this.op.tok];
            }
            switch (a) {
                case 1 /* r */:
                    err = this.reduce();
                    if (err) {
                        return err;
                    }
                    break;
                case 0 /* s */:
                    err = this.shift();
                    if (err) {
                        return err;
                    }
                    break;
                case 2 /* a */:
                    if (this.expressions.length !== 1) {
                        return "syntax error";
                    }
                    return "";
                case 3 /* e1 */:
                    return "missing ')'";
                case 4 /* e2 */:
                    return "missing operator (AND,OR,NOT)";
                case 5 /* e3 */:
                    return "missing '('";
                case 6 /* e4 */:
                    return "invalid argument";
            }
        }
    }
    shift() {
        if (this.op.tok === 8 /* value */) {
            const value = this.op.tokValue.trim();
            if (Utils.isEmpty(value) && !this.options.allowEmptyValues) {
                return "empty token";
            }
            const expr = Expr.makeExpr(this.exprContext, value, this.contextField, this.contextDisplay, !!this.options.allowEmptyValues);
            if (!expr) {
                return "invalid expression";
            }
            expr.start = this.op.tokValuePos;
            expr.length = this.op.tokValueLen;
            if (!!expr.operands) {
                expr.operands.forEach(operand => {
                    operand.start = this.op.tokValuePos;
                    operand.length = this.op.tokValueLen;
                });
            }
            this.expressions.push(expr);
            this.field = "";
            this.display = "";
        }
        else {
            this.operators.push(this.op);
            if (this.op.tok === 5 /* lPar */) {
                if (Utils.isEmpty(this.field)) {
                    this.fields.push(this.peekField());
                }
                else {
                    this.fields.push(this.field);
                }
                this.field = "";
                if (Utils.isEmpty(this.display)) {
                    this.displays.push(this.peekDisplay());
                }
                else {
                    this.displays.push(this.display);
                }
                this.display = "";
            }
        }
        return this.readToken();
    }
    peekField() {
        if (this.fields.length === 0) {
            return "";
        }
        return this.fields[this.fields.length - 1];
    }
    peekDisplay() {
        if (this.displays.length === 0) {
            return "";
        }
        return this.displays[this.displays.length - 1];
    }
    canBeMergeTarget(e, and) {
        if (e.isLeaf) {
            return false;
        }
        if (e.near >= 0) {
            return false;
        }
        if (e.and !== and) {
            return false;
        }
        if (e.not) {
            return false;
        }
        return true;
    }
    mergeExpr(e1, e2, and) {
        let source, target;
        let prepend = false;
        if (this.canBeMergeTarget(e1, and)) {
            target = e1;
            source = e2;
        }
        else if (this.canBeMergeTarget(e2, and)) {
            target = e2;
            source = e1;
            prepend = true; // to keep the same order as in the input text
        }
        else {
            return new Expr({
                exprContext: e1.exprContext,
                op1: e1,
                and,
                op2: e2,
                field: this.peekField(),
                display: this.peekDisplay()
            });
        }
        if (source.isLeaf || source.and !== and || source.not || !Utils.eq(source.display || "", target.display || "")) {
            target.addOperand(source, this.peekField(), prepend);
        }
        else {
            if (source.operands) {
                for (const operand of source.operands) {
                    target.addOperand(operand, this.peekField(), prepend);
                }
            }
        }
        return target;
    }
    reduce() {
        let e;
        let e1;
        let e2;
        const op = this.operators[this.operators.length - 1];
        switch (op.tok) {
            case 2 /* not */:
                // Apply E := NOT E
                e = this.expressions.pop();
                if (!e) {
                    return "syntax error";
                }
                e.not = !e.not;
                this.expressions.push(e);
                break;
            case 1 /* and */:
                e2 = this.expressions.pop();
                e1 = this.expressions.pop();
                if (!e1 || !e2) {
                    return "syntax error";
                }
                this.expressions.push(this.mergeExpr(e1, e2, true));
                break;
            case 0 /* or */:
                e2 = this.expressions.pop();
                e1 = this.expressions.pop();
                if (!e1 || !e2) {
                    return "syntax error";
                }
                this.expressions.push(this.mergeExpr(e1, e2, false));
                break;
            case 3 /* near */:
                e = this.expressions.pop();
                if (!e) {
                    return "syntax error";
                }
                e.near = Utils.toInt(this.ensureNearValue(op.tokValue));
                this.expressions.push(e);
                break;
            case 4 /* infixNear */:
                e2 = this.expressions.pop();
                e1 = this.expressions.pop();
                if (!e1 || !e2) {
                    return "syntax error";
                }
                if (!e2.isLeaf || e2.isStructured || !e1.isLeaf || e1.isStructured || e2.not || e1.not || !Utils.eqNC(e2.field || "", e1.field || "")) {
                    return "syntax error";
                }
                e = new Expr({
                    exprContext: e1.exprContext,
                    op1: e1,
                    and: false,
                    op2: e2,
                    field: this.peekField(),
                    display: this.peekDisplay()
                });
                e.near = Utils.toInt(this.ensureNearValue(op.tokValue));
                this.expressions.push(e);
                break;
            case 6 /* rPar */:
                this.operators.pop();
                if (this.fields.length === 0) {
                    return "missing field";
                }
                if (this.expressions.length === 0) {
                    return "syntax error";
                }
                const field = this.fields.pop();
                const display = this.displays.pop();
                // Set Field for single term bracketed expressions
                e = this.expressions[this.expressions.length - 1];
                if (e.isLeaf) {
                    if (Utils.isEmpty(e.field)) {
                        e.field = field;
                    }
                    if (Utils.isEmpty(e.display)) {
                        e.display = display;
                    }
                }
                break;
        }
        this.operators.pop();
        return undefined;
    }
}
ExprParser.fieldPartnamePrefix = "@";
ExprParser.parsetbl = [
    /* stk  ------------- input ------------*/
    /*		                                 INFIX                  */
    /*		         OR	   AND	 NOT   NEAR  NEAR  (	  )	     $  */
    /*OR */ [1 /* r */, 0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 1 /* r */, 1 /* r */],
    /*AND*/ [1 /* r */, 1 /* r */, 0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 1 /* r */, 1 /* r */],
    /*NOT*/ [1 /* r */, 1 /* r */, 0 /* s */, 0 /* s */, 1 /* r */, 0 /* s */, 1 /* r */, 1 /* r */],
    /*NEAR*/ [1 /* r */, 1 /* r */, 0 /* s */, 0 /* s */, 1 /* r */, 0 /* s */, 1 /* r */, 1 /* r */],
    /*INFIXNEAR*/ [1 /* r */, 1 /* r */, 0 /* s */, 0 /* s */, 1 /* r */, 0 /* s */, 1 /* r */, 1 /* r */],
    /*(*/ [0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 3 /* e1 */],
    /*)*/ [1 /* r */, 1 /* r */, 1 /* r */, 1 /* r */, 1 /* r */, 4 /* e2 */, 1 /* r */, 1 /* r */],
    /*$*/ [0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 5 /* e3 */, 2 /* a */]
];

class ExprBuilder {
    /**
     * Make a standard selection expression
     * (resulting in a SQL clause like "company contains 'BOEING'")
     * @param field Name of the field to select (eg. "company")
     * @param value Value of the field to select (eg. "BOEING")
     * @param display Optional string to display that value (eg. "Boeing")
     */
    makeExpr(field, value, display) {
        field = this.formatField(field, display);
        return `${field}: ${ExprParser.escape(value)}`; // company`Boeing`: BOEING
    }
    /**
     * Make a boolean expression
     * @param field Name of the field to select (eg. "toto")
     * @param value Value of the field to select (eg. "true")
     * @param display Optional string to display that value (eg. "True")
     */
    makeBooleanExpr(field, value, display) {
        field = this.formatField(field, display);
        return `${field}: ${ExprParser.escape(Utils.toSqlValue(value))}`; // toto`True`: true
    }
    /**
     * Make a numerical expression using a comparison operator (>, <, <=, >=, etc.)
     * @param field Name of the field to select (eg. "modified")
     * @param operator Comparison operator used for that selection (eg. ">")
     * @param value Value of the field to select (eg. "2020-12-15")
     * @param display Optional string to display that value (eg. "After Dec 15 2020")
     */
    makeNumericalExpr(field, operator, value, display) {
        field = this.formatField(field, display);
        if (Utils.isString(value)) {
            value = ExprParser.escape(value);
        }
        if (Utils.isDate(value) || Utils.isNumber(value)) {
            value = Utils.toSqlValue(value);
        }
        return `${field}:${operator} ${value}`; // modified`After Dec 15 2020`:> 2020-12-15
    }
    /**
     * Make a list expression
     * @param field Name of the field to select (eg. "docformat")
     * @param values Values of the field to select (eg. ['htm','pdf'])
     * @param display Optional string to display that value (eg. "htm, pdf")
     */
    makeListExpr(field, values, display) {
        field = this.formatField(field, display);
        return `${field}: [${values.map(v => ExprParser.escape(v)).join(',')}]`; // docformat`htm, pdf`:[`htm`,`pdf`]
    }
    /**
     * Make a range expression
     * @param field Name of the field to select (eg. "modified")
     * @param from Begining of the range (eg. 2020-12-15)
     * @param to End of the range (eg. 2020-12-20)
     * @param display Optional string to display that value (eg. "[Dec 15 2020, Dec 20 2020]")
     */
    makeRangeExpr(field, from, to, display) {
        field = this.formatField(field, display);
        return `${field}: [${Utils.toSqlValue(from)}..${Utils.toSqlValue(to)}]`; // modified`[Dec 15 2020, Dec 20 2020]`: [2020-12-15..2020-12-20]
    }
    /**
     * Make a RegExp expression
     * @param field Name of the field to select (eg. "company")
     * @param value Value of the regular expression to match (eg. "BOE.*")
     * @param display Optional string to display that value (eg. "Boe...")
     */
    makeRegexpExpr(field, value, display) {
        field = this.formatField(field, display);
        return `${field}:~ ${ExprParser.escape(value)}`; // company`Boe...`:~ BOE.*
    }
    /**
     * Make a refine expression
     * @param text The text to add to the query
     */
    makeRefineExpr(text) {
        return `refine: ${ExprParser.escape(text)}`;
    }
    /**
     * Return an expression that selects multiple values for a field
     * (All values are ANDed)
     * @param field Name of the field to select (eg. "company")
     * @param values Values of the field to select (eg. ['IBM','APPLE'])
     * @param display Optional string to display that value (eg. "IBM and Apple")
     */
    makeAndExpr(field, values, display) {
        field = this.formatField(field, display);
        return `${field}: (${this.concatWithOperator(values, 'AND')})`; // company: (IBM AND APPLE AND GOOGLE)
    }
    /**
     * Return an expression that selects multiple values for a field
     * (All values are ORed)
     * This function should be equivalent to using makeListExpr
     * @param field Name of the field to select (eg. "company")
     * @param values Values of the field to select (eg. ['IBM','APPLE'])
     * @param display Optional string to display that value (eg. "IBM and Apple")
     */
    makeOrExpr(field, values, display) {
        field = this.formatField(field, display);
        return `${field}: (${this.concatWithOperator(values, 'OR')})`; // company: (IBM OR APPLE OR GOOGLE)
    }
    /**
     * Combine a list of values with AND or OR operators
     * @param values the list of values
     * @param operator the operator
     */
    concatWithOperator(values, operator) {
        return values.map(v => {
            if (Utils.isString(v)) {
                return ExprParser.escape(v);
            }
            if (v.display) {
                return `${ExprParser.escape(v.display)}:${ExprParser.escape(Utils.toSqlValue(v.value))}`;
            }
            return ExprParser.escape(Utils.toSqlValue(v.value));
        }).join(' ' + operator + ' ');
    }
    /**
     * Returns the negative expression of the given expression
     * eg. NOT(person:Bill GATES)
     * @param expr
     */
    makeNotExpr(expr) {
        return `NOT (${expr})`;
    }
    /**
     * Returns an expression that is the union of given expressions
     * eg. person:Bill GATES OR company:MICROSOFT
     * @param exprs
     */
    concatOrExpr(exprs) {
        if (exprs.length <= 1) {
            return exprs[0] || '';
        }
        return `(${exprs.join(') OR (')})`;
    }
    /**
     * Returns an expression that is the intersection of given expressions
     * eg. person:Bill GATES AND company:MICROSOFT
     * @param exprs
     */
    concatAndExpr(exprs) {
        if (exprs.length <= 1) {
            return exprs[0] || '';
        }
        return `(${exprs.join(') AND (')})`;
    }
    /**
     * Returns an expression to select the given item
     * @param field Name of the field to select (eg. "company")
     * @param items A single or list of ValueItem object(s) (eg. content of a record)
     */
    makeFieldExpr(field, items, combineWithAnd) {
        if (!Utils.isArray(items)) {
            items = [items];
        }
        if (items.length === 0) {
            return ""; // Return a falsy string instead of "()" or "``" which would be truthy
        }
        return combineWithAnd ? this.makeAndExpr(field, items) : this.makeOrExpr(field, items);
    }
    /**
     * Create an expression for the given aggregation item
     * @param aggregation The aggregation containing this object
     * @param items The AggregationItem(s) to select
     * @param combineWithAnd If there are multiple values, combine them with AND (instead of OR)
     */
    makeAggregationExpr(aggregation, items, combineWithAnd) {
        if (!Utils.isArray(items)) {
            items = [items];
        }
        if (aggregation.valuesAreExpressions) {
            const exprs = items.map(i => i.value.toString()); // .toString() is to avoid typing issues. With valuesAreExpressions = true, item.value is expected to be a string
            return combineWithAnd ? this.concatAndExpr(exprs) : this.concatOrExpr(exprs);
        }
        else {
            const _items = this.asValueItems(items, aggregation.isTree);
            return this.makeFieldExpr(aggregation.column, _items, combineWithAnd);
        }
    }
    /**
     * Combines the field with the optional display value(s)
     * @param field
     * @param display
     */
    formatField(field, display) {
        if (display) {
            field = `${field}${ExprParser.escape(display)}`;
        }
        return field;
    }
    /**
     * Return the AggregationItem list as a ValueItem list
     * @param items
     * @param isTree
     */
    asValueItems(items, isTree) {
        if (isTree) {
            return items.map(i => {
                return {
                    value: i.$path + "*",
                    display: i.display || i.value
                };
            });
        }
        return items; // This works because ValueItem and AggregationItem share the value and display properties
    }
}
ExprBuilder.ɵfac = function ExprBuilder_Factory(t) { return new (t || ExprBuilder)(); };
ExprBuilder.ɵprov = ɵɵdefineInjectable({ token: ExprBuilder, factory: ExprBuilder.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ExprBuilder, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

const advancedFacetPrefix = "advanced_";
/**
 * Represents a query for retrieving search results from a Sinequa search engine.
 *
 * The properties are described in the {@link IQuery} interface
 */
class Query {
    constructor(name) {
        this.name = name;
    }
    /**
     * Return a copy of the passed query
     */
    static copy(query) {
        if (!query) {
            return query;
        }
        return query.copy();
    }
    /**
     * Return `true` if the query has fulltext search elements
     */
    get hasRelevance() {
        if (!Utils.isEmpty(this.text)) {
            return true;
        }
        if (this.findSelect("refine")) {
            return true;
        }
        return false;
    }
    /**
     * Add a select filter to the query
     *
     * @param expr The fielded search expression to filter the results
     * @param facet The name of the associated facet
     */
    addSelect(expr, facet) {
        return this.pushSelect({
            expression: expr,
            facet: facet || ""
        });
    }
    /**
     * Adds a new `Select` object to the end of the query's `selects`
     */
    pushSelect(select) {
        if (!this.select) {
            this.select = [];
        }
        return this.select.push(select);
    }
    /**
     * Remove the last `Select` object from the `selects` and return it
     */
    popSelect() {
        if (!this.select) {
            return undefined;
        }
        return this.select.pop();
    }
    /**
     * Remove the `Select` object identified by `indexOrFacet`
     *
     * @param indexOrFacet either an index in the `selects` array or a facet name
     * @param all If `true` and `indexOrFacet` is a facet name then all `Select` objects with a matching facet name will be removed
     */
    removeSelect(indexOrFacet, all = false) {
        if (!this.select) {
            return;
        }
        if (Utils.isString(indexOrFacet)) {
            // indexOrFacet is a facet name
            for (let i = this.select.length - 1; i >= 0; i--) {
                const _select = this.select[i];
                if (Utils.eqNC(_select.facet, indexOrFacet)) {
                    this.select.splice(i, 1);
                    if (this.select.length === 0) {
                        delete this.select; // Clean the query if no more select
                        return;
                    }
                    if (!all) {
                        return;
                    }
                }
            }
        }
        else {
            if (indexOrFacet < 0 || indexOrFacet >= this.select.length) {
                return;
            }
            this.select.splice(indexOrFacet, 1);
            if (this.select.length === 0) {
                delete this.select;
            }
        }
    }
    /**
     * Replace a `Select` with another
     *
     * @param index The index in the `selects` array of the `Select to replace
     * @param select The `Select` to use as a replacement
     */
    replaceSelect(index, select) {
        if (!this.select) {
            return;
        }
        this.select.splice(index, 1, select);
    }
    /**
     * Find the index of the nth `Select` object matching the passed facet name
     *
     * @param facet A facet name
     * @param ordinal Specifies which `Select` object to retrieve among selects with the same facet name
     */
    findSelectIndex(facet, ordinal = 0) {
        if (!this.select) {
            return -1;
        }
        let index = 0;
        let facetOrdinal = 0;
        let facetIndex = -1;
        for (const select of this.select) {
            if (Utils.eqNC(facet, select.facet)) {
                facetIndex = index;
                if (facetOrdinal === ordinal) {
                    break;
                }
                facetOrdinal++;
            }
            index++;
        }
        return facetIndex;
    }
    /**
     * Find the first `Select` matching the passed facet name
     *
     * @param facet A facet name
     * @param fromEnd If `true` start searching backwards from the last `Select`
     */
    findSelect(facet, fromEnd = true) {
        const facetSelectIndex = this.findSelectIndex(facet, fromEnd ? -1 : 0);
        return facetSelectIndex >= 0 ? this.select && this.select[facetSelectIndex] : undefined;
    }
    /**
     * Return the last `Select` object
     */
    lastSelect() {
        if (!this.select) {
            return undefined;
        }
        return this.select[this.select.length - 1];
    }
    /**
     * Return the number of `Select` objects
     */
    get selectLength() {
        if (!this.select) {
            return 0;
        }
        return this.select.length;
    }
    /**
     * Add an `Open` filter to the query. This is typically used to load children of tree nodes
     *
     * @param expr The fielded search expression specifying the node to expand
     * @param aggregation The associated aggregation
     */
    addOpen(expr, aggregation) {
        if (!this.open || !Utils.isArray(this.open)) {
            this.open = [];
        }
        return this.open.push({
            expression: expr,
            aggregation
        });
    }
    /**
     * Clear all fields in the query except the name
     */
    clear() {
        const name = this.name;
        Utils.clearObject(this);
        this.name = name;
    }
    /**
     * Remove advanced search select(s) from the query
     */
    toStandard() {
        var _a;
        const advancedSelect = (_a = this.select) === null || _a === void 0 ? void 0 : _a.filter((select) => select.facet && select.facet.startsWith(advancedFacetPrefix));
        advancedSelect === null || advancedSelect === void 0 ? void 0 : advancedSelect.forEach((select) => this.removeSelect(select.facet, true));
        return this;
    }
    /**
     * Return a copy of this query
     */
    copy() {
        const query = new Query(this.name);
        Utils.copy(this, query);
        return query;
    }
    /**
     * Return a copy of this query but without any advanced select
     */
    copyStandard() {
        const query = this.copy();
        return query.toStandard();
    }
    /**
     * Remove all properties from the query except advanced search select(s) and optionally `text`
     *
     * @param withText If `true` do not remove the `text` field
     */
    toAdvanced(withText = false) {
        var _a;
        for (const property in this) {
            if (this.hasOwnProperty(property) && !Utils.eqNC(property, "select") && (!withText || !Utils.eqNC(property, "text"))) {
                delete this[property];
            }
        }
        const notAdvancedSelect = (_a = this.select) === null || _a === void 0 ? void 0 : _a.filter((select) => select.facet && !select.facet.startsWith(advancedFacetPrefix));
        notAdvancedSelect === null || notAdvancedSelect === void 0 ? void 0 : notAdvancedSelect.forEach((select) => this.removeSelect(select.facet));
        return this;
    }
    /**
     * Return a copy of this query including just the advanced fields and optionally `text`
     *
     * @param withText If `true` include the `text` field
     */
    copyAdvanced(withText = false) {
        const query = this.copy();
        return query.toAdvanced(withText);
    }
    /**
     * Tests whether this query has advanced search selections
     */
    hasAdvanced() {
        var _a;
        return !!((_a = this.select) === null || _a === void 0 ? void 0 : _a.find(s => s.facet && s.facet.startsWith(advancedFacetPrefix)));
    }
    /**
     * Initialize this query from the passed JSON string
     *
     * @param jquery JSON in string form
     */
    fromJson(jquery) {
        this.clear();
        const query = Utils.fromJson(jquery);
        // convert select and open
        const select = query.select;
        if (Utils.isArray(select)) {
            query.select = select.map((value) => {
                if (Utils.isArray(value)) {
                    return {
                        expression: value[0],
                        facet: value[1]
                    };
                }
                else {
                    return value;
                }
            });
        }
        const open = query.open;
        if (Utils.isArray(open)) {
            query.open = open.map((value) => {
                if (Utils.isArray(value)) {
                    return {
                        expression: value[0],
                        aggregation: value[1]
                    };
                }
                else {
                    return value;
                }
            });
        }
        Utils.extend(this, query);
        return this;
    }
    /**
     * Returns a JSON representation of this query where `Select` and `Open` objects are expressed as tuple arrays for conciseness
     */
    toJsonForQueryString() {
        const o = {};
        Utils.merge(o, this);
        if (this.select) {
            o.select = this.select.map((value) => {
                const a = [value.expression];
                if (value.facet) {
                    a.push(value.facet);
                }
                return a;
            });
        }
        if (this.open) {
            o.open = this.open.map((value) => [value.expression, value.aggregation]);
        }
        return Utils.toJson(o);
    }
    /**
     * Return a hash value of this query that excludes any pagination parameters
     */
    hash() {
        const obj = {};
        Utils.mergeAndSort(obj, this);
        // remove pagination
        delete obj.page;
        delete obj.pageSize;
        const str = Utils.toJson(obj);
        return Utils.sha512(str);
    }
}

/**
 * This service provides methods for locale-sensitive formatting and parsing of values that can be found in
 * Sinequa search results.
 */
class FormatService {
    constructor(intlService) {
        this.intlService = intlService;
        /** D3 formatter for large number: 42096 => 42K */
        this.bigNumberFormatter = format("~s");
        /** Similar to bigNumberFormatter, but replaces "G" by "B" (as in "$42B") */
        this.moneyFormatter = s => this.bigNumberFormatter(s).replace(/G/, "B");
    }
    /**
     * Returns `true` if the passed parameter is a `ValueItem` object
     */
    isValueItem(valueItem) {
        if (Utils.isObject(valueItem) && !Utils.isDate(valueItem) && !Utils.isArray(valueItem)) {
            return true;
        }
        return false;
    }
    /**
     * Extracts the value and display components from a parameter that can be either a `ValueItem`
     * object or a simple `FieldValue`, in which case the display will be `undefined`.
     */
    getValueAndDisplay(valueItem) {
        let value;
        let display;
        if (this.isValueItem(valueItem)) {
            value = valueItem.value;
            display = valueItem.display || "";
        }
        else {
            value = valueItem;
            display = "";
        }
        return [value, display];
    }
    /**
     * Return the display equivalent of a Sinequa language specifier (`en`, `fr`, ...).
     * The display values are defined in the {@link IntlModule} message files
     *
     * @param value A value containing a Sinequa language specifier
     */
    formatLanguage(value) {
        return this.intlService.formatMessage(`msg#language.${Utils.toLowerCase(value + "")}`);
    }
    /**
     * Return the display equivalent of a size value. The units (`kb`, `mb`, ...) are defined
     * in the {@link IntlModule} message files
     *
     * @param size A memory size in bytes
     */
    formatMemorySize(size) {
        const kiloBytes = size / 1024;
        const megaBytes = kiloBytes / 1024;
        const gigaBytes = megaBytes / 1024;
        const teraBytes = gigaBytes / 1024;
        const petaBytes = teraBytes / 1024;
        let messageKey = "msg#system.memorySize.bytes";
        const params = { value: size };
        if (Math.abs(petaBytes) >= 1) {
            messageKey = "msg#system.memorySize.pb";
            params.value = petaBytes;
        }
        else if (Math.abs(teraBytes) >= 1) {
            messageKey = "msg#system.memorySize.tb";
            params.value = teraBytes;
        }
        else if (Math.abs(gigaBytes) >= 1) {
            messageKey = "msg#system.memorySize.gb";
            params.value = gigaBytes;
        }
        else if (Math.abs(megaBytes) >= 1) {
            messageKey = "msg#system.memorySize.mb";
            params.value = megaBytes;
        }
        else if (Math.abs(kiloBytes) >= 1) {
            messageKey = "msg#system.memorySize.kb";
            params.value = kiloBytes;
        }
        return this.intlService.formatMessage(messageKey, params);
    }
    /**
     * Format an amount of money (typically extracted by a Sinequa Text-mining agent)
     * USD 42069 => USD 42K
     * @param value
     * @returns
     */
    formatMoney(value) {
        let [currency, val] = value.split(" ");
        return `${currency} ${this.moneyFormatter(+val)}`;
    }
    /**
     * Format a value for display according to the passed `column`. Formatters
     * can be defined in the column's configuration to provide domain-specific
     * formatting. The standard formatters are `language` and `memorysize`.
     *
     * @param valueItem The value to format
     * @param column The column associated with the value
     */
    formatValue(valueItem, column) {
        let [value, display] = this.getValueAndDisplay(valueItem);
        if (column && column.formatter) {
            switch (Utils.toLowerCase(column.formatter)) {
                case "language": return this.formatLanguage(value);
                case "memorysize":
                    if (Utils.isNumber(value)) {
                        return this.formatMemorySize(value);
                    }
                    break;
                case "money":
                    if (Utils.isString(value)) {
                        return this.formatMoney(value);
                    }
                    else if (Utils.isArray(value)) {
                        return value.map(v => this.formatMoney(Utils.isString(v) ? v : v.value)).join(', ');
                    }
                    break;
            }
        }
        if (display) {
            if (Utils.isDate(display)) { // ES-7785
                display = Utils.toSysDateStr(display);
            }
            return this.intlService.formatMessage(display, { value });
        }
        if (Utils.isNumber(value)) {
            const message = this.intlService.getMessage("msg#system.number");
            if (message) {
                return this.intlService.formatText(message, { value });
            }
            else {
                return this.intlService.formatNumber(value);
            }
        }
        if (column && AppServiceHelpers.isDate(column) && Utils.isString(value)) {
            value = Utils.fromSysDateStr(value) || value;
        }
        if (Utils.isDate(value)) {
            if (column && !AppServiceHelpers.isDate(column)) { // ES-7785
                value = Utils.toSysDateStr(value);
            }
            else {
                const message = this.intlService.getMessage("msg#system.date");
                if (message) {
                    return this.intlService.formatText(message, { date: value, time: Utils.getTime(value) });
                }
                else {
                    let s = this.intlService.formatDate(value);
                    if (Utils.getTime(value) !== 0) {
                        s += ", " + this.intlService.formatTime(value);
                    }
                    return s;
                }
            }
        }
        if (Utils.isBoolean(value)) {
            const message = this.intlService.getMessage("msg#system.boolean");
            if (message) {
                return this.intlService.formatText(message, { value });
            }
            else {
                return value.toString();
            }
        }
        if (Utils.isArray(value)) {
            const joinValue = [];
            value.forEach(v => {
                if (joinValue.length > 0) {
                    joinValue.push(";");
                }
                let _v;
                if (!v) {
                    _v = "<null>";
                }
                else if (Utils.isDate(v)) {
                    _v = Utils.toSysDateStr(v);
                }
                else if (Utils.isString(v)) {
                    _v = v;
                }
                else {
                    _v = v.display || v.value || "<null>";
                }
                joinValue.push(_v);
            });
            value = joinValue.join("");
        }
        if (!value) {
            return value;
        }
        return this.intlService.formatMessage(value);
    }
    /**
     * Transform a display value. Multiple transformers can be defined on a column and their calls are chained.
     * The standard formatters are `uppercase`, `upperfirst`, `lowercase`, `lowerfirst`, `startcase`, `kebabcase`,
     * `snakecase` and `camelcase`.
     *
     * @param value The value to transform
     * @param column The column associated with the value
     */
    transformValue(value, column) {
        const transforms = column ? Utils.split(column.transforms || "", ",") : undefined;
        if (!transforms || transforms.length === 0) {
            return value;
        }
        // transforms are composable
        for (const transform of transforms) {
            switch (Utils.toLowerCase(transform)) {
                case "uppercase":
                    value = Utils.toUpperCase(value);
                    break;
                case "upperfirst":
                    value = Utils.toUpperFirst(value);
                    break;
                case "lowercase":
                    value = Utils.toLowerCase(value);
                    break;
                case "lowerfirst":
                    value = Utils.toLowerFirst(value);
                    break;
                case "startcase":
                    value = Utils.toStartCase(value);
                    break;
                case "kebabcase":
                    value = Utils.toKebabCase(value);
                    break;
                case "snakecase":
                    value = Utils.toSnakeCase(value);
                    break;
                case "camelcase":
                    value = Utils.toCamelCase(value);
                    break;
            }
        }
        return value;
    }
    /**
     * Format a value item for display. This is the standard entry point for formatting a value.
     * By default, this method calls [formatValue]{@link #formatValue} and [transformValue]{@link #transformValue}.
     *
     * @param valueItem The value item to format
     * @param column The column associated with the value item
     */
    formatFieldValue(valueItem, column) {
        let formattedValue = this.formatValue(valueItem, column);
        formattedValue = this.transformValue(formattedValue, column);
        return formattedValue;
    }
    /**
     * Parse an input value according to the passed `parser`. The standard parser is `memorysize`. Parsers
     * are configured in the {@link CCColumn} configuration. The parsed value is returned as a string for
     * processing by the {@link ValidationModule}
     *
     * @param value The value to parse
     * @param parser The parser to use
     */
    parseValue(value, parser) {
        if (Utils.isString(value)) {
            if (parser) {
                switch (Utils.toLowerCase(parser)) {
                    case "memorysize": {
                        return this.parseMemorySize(value) + "";
                    }
                }
            }
        }
        return value;
    }
    /**
     * Parse a size string using [Utils.toSize]{@link Utils#toSize}
     *
     * @param str The string to parse
     * @param _default The default value to return if the string cannot be parsed
     * @return The parsed size in bytes
     */
    parseMemorySize(str, _default = 0) {
        return Utils.toSize(str, _default);
    }
    /**
     * Display a raw value without applying any formatting
     * (besides the native toString() method for non-string values)
     * @param value
     * @returns
     */
    formatRaw(value) {
        let [val] = this.getValueAndDisplay(value);
        if (Utils.isArray(val)) {
            return val.map(v => Utils.isString(v) ? v : v.value).join(';');
        }
        return val === null || val === void 0 ? void 0 : val.toString();
    }
}
FormatService.ɵfac = function FormatService_Factory(t) { return new (t || FormatService)(ɵɵinject(IntlService)); };
FormatService.ɵprov = ɵɵdefineInjectable({ token: FormatService, factory: FormatService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(FormatService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: IntlService }]; }, null); })();

/**
 * A service to manage the Sinequa SBA configuration
 */
class AppService {
    constructor(startConfig, appWebService, intlService, formatService) {
        this.startConfig = startConfig;
        this.appWebService = appWebService;
        this.intlService = intlService;
        this.formatService = formatService;
        this._events = new Subject();
        if (!this.appName) {
            console.error("Missing app name!");
        }
    }
    static toEngineType(type) {
        if (!type) {
            return 0 /* none */;
        }
        switch (Utils.toLowerCase(type)) {
            case "bool":
            case "boolean": return 1 /* bool */;
            case "date": return 2 /* date */;
            case "datetime": return 3 /* dateTime */;
            case "time": return 4 /* time */;
            case "unsigned": return 5 /* unsigned */;
            case "integer": return 6 /* integer */;
            case "float": return 7 /* float */;
            case "double": return 8 /* double */;
            case "dates": return 9 /* dates */;
            case "datetimes": return 10 /* dateTimes */;
            case "times": return 11 /* times */;
            case "varchar": return 12 /* varchar */;
            case "binary": return 13 /* binary */;
            case "string": return 14 /* string */;
            case "csv": return 15 /* csv */;
            default: return 0 /* none */;
        }
    }
    static toEngineTypeModifierSimple(c) {
        switch (c) {
            case 'a': return 2053 /* a */;
            case 'c': return 4 /* c */;
            case 'd': return 8 /* d */;
            case 'e': return 2068 /* e */;
            case 'i': return 256 /* i */;
            case 'l': return 2052 /* l */;
            case 'n': return 8192 /* n */;
            case 't': return 524292 /* t */;
            case 'x': return 8388608 /* x */;
            case 'z': return 33554432 /* z */;
            default: return 0 /* none */;
        }
    }
    static toEngineTypeModifier(eType, typeModifier) {
        let etm = 0 /* none */;
        if (typeModifier) {
            for (const c of typeModifier) {
                etm |= AppService.toEngineTypeModifierSimple(c);
            }
        }
        return etm;
    }
    static makeColumn(name, type, typeModifier, aliases) {
        const eType = AppService.toEngineType(type);
        const eTypeModifier = AppService.toEngineTypeModifier(eType, typeModifier || "");
        return {
            name,
            type,
            typeModifier,
            eType,
            eTypeModifier,
            aliases
        };
    }
    /**
     * Return `true` if a `column` is a string
     */
    static isString(column) {
        return AppServiceHelpers.isString(column);
    }
    /**
     * Return `true` if a `column` is a csv
     */
    static isCsv(column) {
        return AppServiceHelpers.isCsv(column);
    }
    /**
     * Return `true` if a `column` is a tree
     */
    static isTree(column) {
        return AppServiceHelpers.isTree(column);
    }
    /**
     * Return `true` if a `column` is an entity
     */
    static isEntity(column) {
        return AppServiceHelpers.isEntity(column);
    }
    /**
     * Return `true` if a `column` is a boolean
     */
    static isBoolean(column) {
        return AppServiceHelpers.isBoolean(column);
    }
    /**
     * Return `true` if a `column` is a date
     */
    static isDate(column) {
        return AppServiceHelpers.isDate(column);
    }
    /**
     * Return `true` if a `column` is a double
     */
    static isDouble(column) {
        return AppServiceHelpers.isDouble(column);
    }
    /**
     * Return `true` if a `column` is an integer
     */
    static isInteger(column) {
        return AppServiceHelpers.isInteger(column);
    }
    /**
     * Return `true` if a `column` is a number (integer or double)
     */
    static isNumber(column) {
        return AppServiceHelpers.isNumber(column);
    }
    /**
     * Return `true` if a `column` is a scalar
     */
    static isScalar(column) {
        return AppServiceHelpers.isScalar(column);
    }
    /**
     * Return `true` if a `column` is sortable
     */
    static isSortable(column) {
        return AppServiceHelpers.isSortable(column);
    }
    ngOnDestroy() {
        this._events.complete();
    }
    /**
     * Return an `Observable` stream of the events that the `AppService` can generate
     */
    get events() {
        return this._events;
    }
    /**
     * Return the name of the SBA
     */
    get appName() {
        return this.startConfig.app;
    }
    /**
     * Return the origin of the Sinequa server
     */
    get origin() {
        return this.startConfig.origin;
    }
    initDefaultQuery() {
        if (!this.app) {
            console.warn("No app configured");
            return;
        }
        // If not set explicitly, the default query is the first in the list
        const defaultQueryName = this.app.defaultQueryName || Utils.split(this.app.queryNames, ",")[0];
        this._defaultCCQuery = Utils.getField(this.app.queries, defaultQueryName);
        if (!this._defaultCCQuery) {
            console.warn(`Query not configured for app: ${this.appName}`);
        }
        this.ccquery = this._defaultCCQuery;
    }
    setApp(app) {
        this.app = app;
        this.verifyServerApiVersionCompatibility(app);
        this.cclabels = this.getWebService(this.app.labels);
        this.ccautocomplete = this.getWebService(this.app.autocomplete);
        this.initDefaultQuery();
        this.makeMaps();
        this.suggestQueries = Utils.split(this.ccautocomplete ? this.ccautocomplete.suggestQueries : "", ",");
    }
    verifyServerApiVersionCompatibility(app) {
        if (!app) {
            console.warn('Unexpected empty app configuration.');
            return;
        }
        if (!app.apiVersion) {
            console.error(`The App config '${app.name}' is not of 'Angular Workspace application' type.`);
        }
        else if (app.apiVersion !== MINIMUM_COMPATIBLE_SERVER_API_VERSION) {
            console.warn(`This SBA is not compatible with the REST API of Sinequa Server.\n` +
                `The SBA expects the server API version to be at least '${MINIMUM_COMPATIBLE_SERVER_API_VERSION}',` +
                ` whereas the server API version is '${app.apiVersion}'.`);
        }
    }
    /**
     * Initialize this service by retrieving the current application
     * configuration from the Sinequa server and using it to set up the data structures
     * on which the service relies
     */
    init() {
        return this.appWebService.get().pipe(map(app => {
            this.setApp(app);
            return app;
        }));
    }
    /**
     * Initialize this service from an application configuration object. This is typically
     * used for supporting mutiple concurrent queries within the same application by providing
     * component level instances of this service.
     */
    initFromApp(app) {
        if (app) {
            this.setApp(app);
        }
    }
    /**
     * Refresh the application configuration, reinitializing the service if it has changed
     *
     * @param auditEvents Any associated audit events that should be stored
     */
    refresh(auditEvents) {
        const observable = this.appWebService.refresh(this.app ? this.app.versionId : "", auditEvents);
        observable.subscribe(response => {
            if (!response.upToDate && response.app) {
                this.setApp(response.app);
            }
            return response;
        });
        return observable.pipe(map((value) => {
            return this.app;
        }));
    }
    /**
     * Clear the data associated with the service. Typically used when processing a user logout
     */
    clear() {
        this.app = undefined;
        this.cclabels = undefined;
        this._defaultCCQuery = undefined;
        this.ccquery = undefined;
        this.clearMaps();
    }
    indexIsNormal(ccindex) {
        return !!ccindex && (!ccindex.indexType || Utils.startsWith(ccindex.indexType, "normal"));
    }
    getIndexForQuery(ccquery) {
        if (!ccquery) {
            return undefined;
        }
        const indexes = Utils.split(ccquery.searchIndexes, [","]);
        if (indexes.length === 0) {
            return this.app ? this.app.indexes._ : undefined;
        }
        else {
            const ccindex = this.getIndex(indexes[0]);
            if (ccindex && this.indexIsNormal(ccindex)) {
                return this.app ? this.app.indexes._ : undefined;
            }
            return ccindex;
        }
    }
    _makeColumnMapForIndex(columnMap, ccindex) {
        if (!ccindex || !ccindex.columns) {
            return;
        }
        for (const columnName of Object.keys(ccindex.columns)) {
            const column = ccindex.columns[columnName];
            columnMap[Utils.toLowerCase(column.name)] = column;
            if (column.aliases) {
                for (const alias of column.aliases) {
                    columnMap[Utils.toLowerCase(alias)] = column;
                }
            }
        }
    }
    _makeColumnMapForQuery(columnMap, ccquery) {
        if (!ccquery || !ccquery.columnsInfo || !ccquery.columnsInfo.columns) {
            return;
        }
        const ccindex = this.getIndexForQuery(ccquery);
        if (!ccindex || !ccindex.columns) {
            return;
        }
        for (const columnInfo of ccquery.columnsInfo.columns) {
            if (columnInfo.name) {
                const columnName = Utils.toLowerCase(columnInfo.name);
                let column = ccindex.columns[columnName];
                if (!column) {
                    column = AppService.extraColumns[columnName];
                }
                if (column) {
                    // Copy column so we can add the query specific aliases and labels
                    column = Utils.copy(column);
                    columnMap[columnName] = column;
                    if (columnInfo.aliases) {
                        column.aliases = Utils.split(columnInfo.aliases, [",", ";"]);
                        for (const alias of column.aliases) {
                            columnMap[Utils.toLowerCase(alias)] = column;
                        }
                    }
                    // Overwrite labels if defined on the query
                    if (columnInfo.label) {
                        column.label = columnInfo.label;
                    }
                    if (columnInfo.labelPlural) {
                        column.labelPlural = columnInfo.labelPlural;
                    }
                    if (columnInfo.formatter) {
                        column.formatter = columnInfo.formatter;
                    }
                    if (columnInfo.transforms) {
                        column.transforms = columnInfo.transforms;
                    }
                    if (columnInfo.parser) {
                        column.parser = columnInfo.parser;
                    }
                    if (columnInfo.description) {
                        column.description = columnInfo.description;
                    }
                }
            }
        }
    }
    makeMaps() {
        this.columnsByQuery = {};
        this.columnsByIndex = {};
        this.fieldsByQuery = {};
        if (!this.app) {
            return;
        }
        let columnMap;
        // Queries
        if (this.app.queries) {
            for (const queryName of Object.keys(this.app.queries)) {
                const ccquery = this.app.queries[queryName];
                if (ccquery) {
                    ccquery.$columnFieldsPattern = new PatternMatcher("included column fields", "excluded column fields");
                    ccquery.$columnFieldsPattern.includedPattern.setText(ccquery.columnFieldsIncluded);
                    ccquery.$columnFieldsPattern.excludedPattern.setText(ccquery.columnFieldsExcluded);
                    ccquery.$partnameFieldsPattern = new PatternMatcher("included part name fields", "excluded part name fields");
                    ccquery.$partnameFieldsPattern.includedPattern.setText(ccquery.partnameFieldsIncluded);
                    ccquery.$partnameFieldsPattern.excludedPattern.setText(ccquery.partnameFieldsExcluded);
                    if (ccquery.columnsInfo) {
                        columnMap = {};
                        this.columnsByQuery[Utils.toLowerCase(ccquery.name)] = columnMap;
                        this._makeColumnMapForQuery(columnMap, ccquery);
                    }
                }
            }
        }
        // Indexes
        if (this.app.indexes) {
            // Special normal index
            const ccindex = this.app.indexes._;
            if (ccindex) {
                columnMap = {};
                this.columnsByIndex._ = columnMap;
                this._makeColumnMapForIndex(columnMap, ccindex);
            }
            for (const indexName of Object.keys(this.app.indexes)) {
                const ccindex1 = this.app.indexes[Utils.toLowerCase(indexName)];
                if (ccindex1) {
                    if (this.indexIsNormal(ccindex1)) {
                        if (ccindex1.name !== "_") {
                            this.columnsByIndex[Utils.toLowerCase(ccindex1.name)] = this.columnsByIndex._;
                        }
                    }
                    else {
                        columnMap = {};
                        this.columnsByIndex[Utils.toLowerCase(ccindex1.name)] = columnMap;
                        this._makeColumnMapForIndex(columnMap, ccindex1);
                    }
                }
            }
        }
        // Fields per query (contains aliases for default query and globally defined aliases)
        const globalFields = new Map();
        const columns = this.columnsByIndex._;
        if (columns) {
            for (const key of Object.keys(columns)) {
                const column = columns[key];
                if (column.aliases && column.aliases.length > 0) {
                    const alias = column.aliases[0];
                    if (alias) {
                        globalFields.set(alias, alias);
                    }
                }
            }
        }
        for (const queryName of Object.keys(this.columnsByQuery)) {
            const queryFields = new Map(globalFields);
            const columns1 = this.columnsByQuery[Utils.toLowerCase(this.defaultCCQuery ? this.defaultCCQuery.name : "")];
            if (columns1) {
                for (const key of Object.keys(columns1)) {
                    const column = columns1[key];
                    if (column.aliases && column.aliases.length > 0) {
                        const alias = column.aliases[0];
                        if (alias) {
                            queryFields.set(alias, alias);
                        }
                    }
                }
                this.fieldsByQuery[queryName] = Array.from(queryFields.keys());
            }
        }
    }
    clearMaps() {
        this.columnsByQuery = {};
        this.columnsByIndex = {};
        this.fieldsByQuery = {};
    }
    /**
     * Get the configuration of the web service with the passed name
     */
    getWebService(name) {
        if (!this.app) {
            return undefined;
        }
        return Utils.getField(this.app.webServices, name);
    }
    /**
     * Get the list configuration with the passed name
     */
    getList(name) {
        if (!this.app) {
            return undefined;
        }
        return this.app.lists[name];
    }
    /**
     * Return the default {@link CCQuery}
     */
    get defaultCCQuery() {
        return this._defaultCCQuery;
    }
    /**
     * Return the current {@link CCQuery}
     */
    get ccquery() {
        if (!!this._ccquery) {
            return this._ccquery;
        }
        return this._defaultCCQuery;
    }
    /**
     * Set the current {@link CCQuery}
     */
    set ccquery(value) {
        if (value !== this._ccquery) {
            const previous = this._ccquery;
            this._ccquery = value;
            this._events.next({ type: "query-changed", current: this._ccquery, previous: previous });
        }
    }
    /**
     * Get the {@link CCQuery} with the passed name
     */
    getCCQuery(name) {
        return this.app ? this.app.queries[Utils.toLowerCase(name)] : undefined;
    }
    /**
     * Set the current {@link CCQuery} to that with the passed name
     */
    setCCQuery(name) {
        const ccquery = !name ? this.defaultCCQuery : this.getCCQuery(name);
        if (ccquery) {
            this.ccquery = ccquery;
            return true;
        }
        else {
            console.warn(`AppService.setCCQuery - query '${name}' does not exist`);
            return false;
        }
    }
    /**
     * Return the fields defined on the current {@link CCQuery}
     */
    get fields() {
        if (!this.ccquery) {
            return [];
        }
        return this.fieldsByQuery[Utils.toLowerCase(this.ccquery.name)] || [];
    }
    /**
     * Get the {@link CCAggregation} with the passed name
     */
    getCCAggregation(name) {
        if (!this.ccquery || !this.ccquery.aggregations) {
            return undefined;
        }
        return this.ccquery.aggregations.find((value) => Utils.eqNC(name, value.name));
    }
    /**
     * Get the {@link CCIndex} with the passed name
     */
    getIndex(name) {
        if (!this.app) {
            return undefined;
        }
        return Utils.getField(this.app.indexes, name);
    }
    /**
     * Get the {@link CCColumn} with the passed name. Aliases are resolved
     */
    getColumn(name) {
        if (!name) {
            return undefined;
        }
        if (!this.ccquery) {
            return undefined;
        }
        // First, CCQuery specific aliases
        let column;
        let columnAliases = this.columnsByQuery[Utils.toLowerCase(this.ccquery.name)];
        if (columnAliases) {
            column = columnAliases[Utils.toLowerCase(name)];
            if (column) {
                return column;
            }
        }
        // Second, aliases by index
        const indexes = Utils.split(this.ccquery.searchIndexes, [","]);
        const firstIndex = indexes.length === 0 ? undefined : this.getIndex(indexes[0]);
        if (indexes.length === 0 || (!!firstIndex && this.indexIsNormal(firstIndex))) {
            columnAliases = this.columnsByIndex._;
            if (columnAliases) {
                column = columnAliases[Utils.toLowerCase(name)];
                if (column) {
                    return column;
                }
            }
        }
        else {
            for (const index of indexes) {
                columnAliases = this.columnsByIndex[Utils.toLowerCase(index)];
                if (columnAliases) {
                    column = columnAliases[Utils.toLowerCase(name)];
                    if (column) {
                        return column;
                    }
                }
            }
        }
        // Third, extra columns
        column = AppService.extraColumns[Utils.toLowerCase(name)];
        if (column) {
            return column;
        }
        return undefined;
    }
    /**
     * Get the default alias a column
     *
     * @param column The column
     * @return The default alias or `null` if no alias is defined
     */
    getColumnDefaultAlias(column) {
        if (column) {
            if (column.aliases && column.aliases.length > 0) {
                return column.aliases[0];
            }
        }
        return "";
    }
    /**
     * Get the name of a column
     *
     * @param column The column
     * @param _default A default name to return if `column` is empty
     */
    getColumnName(column, _default = "") {
        if (column) {
            return column.name;
        }
        return _default;
    }
    /**
     * Get the default alias for a column
     *
     * @param column The column
     * @param _default A default alias name to return if the `column` is empty or no alias is defined
     */
    getColumnAlias(column, _default = "") {
        if (column) {
            const alias = this.getColumnDefaultAlias(column);
            if (alias) {
                return alias;
            }
        }
        return _default;
    }
    /**
     * Return a column name from a name which can be an alias
     */
    resolveColumnName(name) {
        const column = this.getColumn(name);
        return this.getColumnName(column, name || "");
    }
    /**
     * Return a column alias from a name which can be an alias
     */
    resolveColumnAlias(name) {
        const column = this.getColumn(name);
        return this.getColumnAlias(column, name || "");
    }
    /**
     * Parse a fielded search expression
     *
     * @param text The expression
     * @param options Options for the parsing
     * @return The parsed {@link Expr} or an error message
     */
    parseExpr(text, options) {
        return ExprParser.parse(text, { appService: this, formatService: this.formatService, intlService: this.intlService }, options);
    }
    /**
     * Escape a value for fielded search if necessary. `Date` objects are converted to
     * Sinequa system date strings and non-scalars fields are escaped
     * @param field The value's field
     * @param value The value
     */
    escapeFieldValue(field, value) {
        if (Utils.isDate(value)) {
            return Utils.toSysDateStr(value);
        }
        value = value + "";
        const column = this.getColumn(field);
        if (column && !AppService.isScalar(column)) {
            // escaoe columns that might contain search operators in them (treating negative numbers as an ignorable edge case)
            return ExprParser.escape(value);
        }
        return value;
    }
    /**
     * Get the label of a column. The plural label is returned for csv-type columns.
     *
     * @param name The name of the column which can be an alias
     * @param _default The default label to return if no label is defined
     */
    getLabel(name, _default) {
        const column = this.getColumn(name);
        if (column) {
            const label = AppService.isCsv(column) ? column.labelPlural : column.label;
            if (label) {
                return label;
            }
        }
        if (!Utils.isUndefined(_default)) {
            return _default;
        }
        return name;
    }
    /**
     * Get the singular label of a column
     *
     * @param name The name of the column which can be an alias
     * @param _default The default label to return if no label is defined
     */
    getSingularLabel(name, _default) {
        const column = this.getColumn(name);
        if (column && column.label) {
            return column.label;
        }
        if (!Utils.isUndefined(_default)) {
            return _default;
        }
        return name;
    }
    /**
     * Get the plural label of a column
     *
     * @param name The name of the column which can be an alias
     * @param _default The default label to return if no label is defined
     */
    getPluralLabel(name, _default) {
        const column = this.getColumn(name);
        if (column && column.labelPlural) {
            return column.labelPlural;
        }
        if (!Utils.isUndefined(_default)) {
            return _default;
        }
        return name;
    }
    /**
     * Return `true` if a column with the passed name or alias is a string
     */
    isString(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isString(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is a csv
     */
    isCsv(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isCsv(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is a tree
     */
    isTree(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isTree(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is an entity
     */
    isEntity(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isEntity(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is a boolean
     */
    isBoolean(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isBoolean(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is a date
     */
    isDate(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isDate(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is a double
     */
    isDouble(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isDouble(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is an integer
     */
    isInteger(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isInteger(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is a number (integer or double)
     */
    isNumber(name) {
        return this.isInteger(name) || this.isDouble(name);
    }
    /**
     * Return `true` if a column with the passed name or alias is a scalar
     */
    isScalar(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isScalar(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is sortable
     */
    isSortable(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isSortable(column);
    }
    /**
     * If the passed url is relative and CORS is active then
     * prepend it with the Sinequa server origin
     */
    updateUrlForCors(url) {
        if (this.startConfig.corsActive && !!url && !Utils.isUrlAbsolute(url)) {
            url = Utils.addUrl(this.origin, url);
        }
        return url;
    }
    /**
     * Return the url to the Sinequa administration console
     */
    get adminUrl() {
        return this.updateUrlForCors(Utils.addUrl(this.startConfig.applicationPath, "admin"));
    }
}
// Should match AdditionalQueryableColumns in Engine.cs
AppService.extraColumns = {
    id: AppService.makeColumn("id", "string"),
    text: AppService.makeColumn("text", "varchar"),
    documentlanguages: AppService.makeColumn("documentlanguages", "csv", "ci"),
    databasealias: AppService.makeColumn("databasealias", "varchar"),
    globalrelevance: AppService.makeColumn("globalrelevance", "double"),
    matchingpartnames: AppService.makeColumn("matchingpartnames", "csv"),
    matchlocations: AppService.makeColumn("matchlocations", "csv"),
    matchlocationsperpartname: AppService.makeColumn("matchlocationsperpartname", "varchar"),
    extracts: AppService.makeColumn("extracts", "csv"),
    extractsperpartname: AppService.makeColumn("extractsperpartname", "varchar"),
    extractslocations: AppService.makeColumn("extractslocations", "csv"),
    documentweight: AppService.makeColumn("documentweight", "varchar"),
    groupcount: AppService.makeColumn("groupcount", "integer"),
    accesslists: AppService.makeColumn("accesslists", "varchar", undefined, ["accessLists"]) // json
};
AppService.ɵfac = function AppService_Factory(t) { return new (t || AppService)(ɵɵinject(START_CONFIG), ɵɵinject(AppWebService), ɵɵinject(IntlService), ɵɵinject(FormatService)); };
AppService.ɵprov = ɵɵdefineInjectable({ token: AppService, factory: AppService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AppService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: AppWebService }, { type: IntlService }, { type: FormatService }]; }, null); })();

/**
 * An `HttpInterceptor` to process audi events attached to the request body
 * in the `$auditRecord` member.
 */
class AuditInterceptor {
    constructor(startConfig) {
        this.startConfig = startConfig;
    }
    shouldIntercept(url) {
        return Utils.startsWith(url, this.startConfig.apiPath);
    }
    isJsonable(obj) {
        return (Utils.isObject(obj) || Utils.isArray(obj)) && !Utils.isArrayBuffer(obj) && !Utils.isBlob(obj) &&
            !Utils.isString(obj) && !(obj instanceof HttpParams);
    }
    // Handle legacy calls where auditEvents is either an AuditEvent or AuditEvent[]
    ensureAuditRecord(auditEvents) {
        if (!auditEvents) {
            return undefined;
        }
        let auditEvents1;
        if (Utils.isArray(auditEvents)) {
            auditEvents1 = auditEvents;
        }
        else if (Utils.isObject(auditEvents)) {
            const auditRecord = auditEvents;
            if (auditRecord.auditEvents || auditRecord.mlAuditEvents) {
                return auditRecord;
            }
            auditEvents1 = [auditEvents];
        }
        return {
            auditEvents: auditEvents1
        };
    }
    /**
     * Add a sessionid to all the audit events
     * @param auditRecord
     */
    addSessionId(auditRecord) {
        var _a;
        const sessionid = this.getSessionId();
        (_a = auditRecord === null || auditRecord === void 0 ? void 0 : auditRecord.auditEvents) === null || _a === void 0 ? void 0 : _a.forEach(event => {
            if (!event.detail) {
                event.detail = {};
            }
            event.detail['session-id'] = sessionid;
        });
    }
    /**
     * Get a Session Id initialized upon login. The session is maintained for 10 minutes
     * after the last call to this method.
     */
    getSessionId() {
        if (!this.sessionid || this.isSessionStale()) {
            this.sessionid = Utils.guid();
        }
        this.sessionstart = new Date();
        return this.sessionid;
    }
    /**
     * Test whether the current session id valid or stale (need to be refreshed)
     */
    isSessionStale() {
        const lastSession = new Date().getTime() - this.sessionstart.getTime();
        // Consider the session stale after 10 minutes
        return lastSession > 10 * 60 * 1000;
    }
    /**
     * Called once the `$auditRecord` member has been standardized, this method
     * can be overidden to update fields in the audit events associated with a
     * web service call.
     */
    updateAuditRecord(auditRecord) {
    }
    /**
     * Intercept requests with a JSON body and standardize the format of the
     * `$auditRecord` member.
     */
    intercept(request, next) {
        if (this.shouldIntercept(request.url) && this.isJsonable(request.body)) {
            request.body.$auditRecord = this.ensureAuditRecord(request.body.$auditRecord);
            this.addSessionId(request.body.$auditRecord);
            this.updateAuditRecord(request.body.$auditRecord);
        }
        return next.handle(request);
    }
}
AuditInterceptor.ɵfac = function AuditInterceptor_Factory(t) { return new (t || AuditInterceptor)(ɵɵinject(START_CONFIG)); };
AuditInterceptor.ɵprov = ɵɵdefineInjectable({ token: AuditInterceptor, factory: AuditInterceptor.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AuditInterceptor, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }]; }, null); })();

const APP_UTILS_MODULE_PROVIDERS = [];

/**
 * This module contains a utility {@link AppService} for managing the configuration of a Sinequa SBA and a {@link FormatService}
 * for handling the formatting and parsing of Sinequa field values. It also contains an implementation of a {@link Query} class
 * as well as classes for manipulating Sinequa fielded search expressions.
 *
 * The {@link AuditInterceptor} in this module should be registered using `HTTP_INTERCEPTORS` in your app module.
 */
class AppUtilsModule {
}
AppUtilsModule.ɵmod = ɵɵdefineNgModule({ type: AppUtilsModule });
AppUtilsModule.ɵinj = ɵɵdefineInjector({ factory: function AppUtilsModule_Factory(t) { return new (t || AppUtilsModule)(); }, providers: [
        ...APP_UTILS_MODULE_PROVIDERS
    ], imports: [[
            BaseModule,
            IntlModule,
            WebServicesModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(AppUtilsModule, { imports: [BaseModule,
        IntlModule,
        WebServicesModule] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(AppUtilsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    BaseModule,
                    IntlModule,
                    WebServicesModule
                ],
                declarations: [],
                exports: [],
                providers: [
                    ...APP_UTILS_MODULE_PROVIDERS
                ]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { AppService, AppUtilsModule, AuditInterceptor, Expr, ExprBuilder, ExprParser, ExprParserOperator, FormatService, Query, advancedFacetPrefix };
//# sourceMappingURL=sinequa-core-app-utils.js.map
