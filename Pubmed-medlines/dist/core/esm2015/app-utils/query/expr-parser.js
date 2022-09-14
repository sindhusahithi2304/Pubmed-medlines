import { Utils } from "@sinequa/core/base";
import { AppServiceHelpers } from "../app-service-helpers";
/**
 * Represents a parsed fielded search expression. A tree of expression nodes is built when an expression
 * combines sub-expressions using boolean operators
 */
export class Expr {
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
export class ExprParserOperator {
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
export class ExprParser {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwci1wYXJzZXIuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9hcHAtdXRpbHMvIiwic291cmNlcyI6WyJxdWVyeS9leHByLXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsS0FBSyxFQUEwQixNQUFNLG9CQUFvQixDQUFDO0FBRWxFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBNEx6RDs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sSUFBSTtJQXNLYixZQUFZLElBQW9EO1FBcEt4RCxXQUFNLEdBQXVCLFNBQVMsQ0FBQztRQXdCdkMsYUFBUSxHQUF1QixTQUFTLENBQUM7UUFDekMsZ0JBQVcsR0FBbUQsU0FBUyxDQUFDO1FBd0RoRjs7V0FFRztRQUNJLFdBQU0sR0FBeUIsU0FBUyxDQUFDO1FBaUY1QyxJQUFJLENBQTJCLElBQUssQ0FBQyxHQUFHLEVBQUU7WUFDdEMsTUFBTSxTQUFTLEdBQStDLElBQUksQ0FBQztZQUNuRSxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3JEO2lCQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMzRDtZQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztZQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7WUFDN0Is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RDtJQUN6RSxLQUFLLENBQVcseUZBQXlEO0NBQ3hFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1V0aWxzLCBNYXBPZiwgSVJlZiwgRmllbGRWYWx1ZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHtBcHBTZXJ2aWNlfSBmcm9tIFwiLi4vYXBwLnNlcnZpY2VcIjtcbmltcG9ydCB7QXBwU2VydmljZUhlbHBlcnN9IGZyb20gXCIuLi9hcHAtc2VydmljZS1oZWxwZXJzXCI7XG5pbXBvcnQge0NDQ29sdW1uLCBFbmdpbmVUeXBlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7SW50bFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL2ludGxcIjtcbmltcG9ydCB7Rm9ybWF0U2VydmljZX0gZnJvbSBcIi4uL2Zvcm1hdC5zZXJ2aWNlXCI7XG5cbi8qKlxuICogRGVzY3JpYmVzIGEgY29udGV4dCBmb3IgcHJvY2Vzc2luZyBleHByZXNzaW9uc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEV4cHJDb250ZXh0IHtcbiAgICBhcHBTZXJ2aWNlOiBBcHBTZXJ2aWNlO1xuICAgIGZvcm1hdFNlcnZpY2U6IEZvcm1hdFNlcnZpY2U7XG4gICAgaW50bFNlcnZpY2U6IEludGxTZXJ2aWNlO1xuICAgIGRpc2FsbG93RnVsbHRleHQ/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIFRoZSBvcGVyYXRvcnMgYWNjZXB0ZWQgaW4gZmllbGRlZCBzZWFyY2ggZXhwcmVzc2lvbnNcbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gRXhwck9wZXJhdG9yIHtcbiAgICBub25lLFxuICAgIGVxLFxuICAgIGd0LFxuICAgIGd0ZSxcbiAgICBsdCxcbiAgICBsdGUsXG4gICAgbmVxLFxuICAgIHJlZ2V4LFxuICAgIGxpa2UsXG4gICAgY29udGFpbnMsXG4gICAgaW4sXG4gICAgYmV0d2VlblxufVxuXG4vKipcbiAqIFRoZSByYW5nZSBvcGVyYXRvcnMgYWNjZXB0ZWQgaW4gZmllbGRlZCBzZWFyY2ggZXhwcmVzc2lvbnNcbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gRXhwclJhbmdlIHtcbiAgICBub25lLFxuICAgIGd0ZUx0ZSxcbiAgICBndGVMdCxcbiAgICBndEx0ZSxcbiAgICBndEx0XG59XG5cbi8qKlxuICogQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGRhdGEgbmVjZXNzYXJ5IHRvIGZvcm1hdCBhbiBgRXhwcmAgdXNpbmdcbiAqIFtJbnRsU2VydmljZS5mb3JtYXRNZXNzYWdlXXtAbGluayBJbnRsU2VydmljZSNmb3JtYXRNZXNzYWdlfVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEV4cHJNZXNzYWdlIHtcbiAgICAvKipcbiAgICAgKiBUaGUgYEludGxTZXJ2aWNlYCBjb21wYXRpYmxlIG1lc3NhZ2Ugc3RyaW5nXG4gICAgICovXG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEFueSB2YWx1ZXMgcmVmZXJlbmNlZCBieSBgbWVzc2FnZWBcbiAgICAgKi9cbiAgICB2YWx1ZXM/OiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IEZpZWxkVmFsdWVcbiAgICB9O1xufVxuXG4vKipcbiAqIE9wdGlvbnMgdG8gYmUgdXNlZCB3aXRoIGBFeHByLnRvTWVzc2FnZWBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFeHByTWVzc2FnZU9wdGlvbnMge1xuICAgIC8qKlxuICAgICAqIElmIGB0cnVlYCwgZmllbGQgbmFtZXMgYXJlIGluY2x1ZGVkIGluIHRoZSBtZXNzYWdlXG4gICAgICovXG4gICAgd2l0aEZpZWxkcz86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogSWYgYHRydWVgLCB1c2UgYW55IGRpc3BsYXkgdmFsdWUgc2V0IGluIHRoZSBleHByZXNzaW9uXG4gICAgICovXG4gICAgdXNlRGlzcGxheT86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogSW5jbHVkZSBIVE1MIGZvcm1hdHRpbmcgaW4gdGhlIG1lc3NhZ2VcbiAgICAgKi9cbiAgICBhc0hUTUw/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIElmIGB0cnVlYCwgZG9uJ3QgaW5jbHVkZSBhbnkgb3V0ZXIgYE5PVGAgb3BlcmF0b3IgaW4gdGhlIG1lc3NhZ2VcbiAgICAgKi9cbiAgICBoaWRlT3V0ZXJOb3Q/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuaW50ZXJmYWNlIEV4cHJNZXNzYWdlQ3R4dCB7XG4gICAgaW5uZXI6IGJvb2xlYW47XG4gICAgbWVzc2FnZTogc3RyaW5nW107XG4gICAgdmFsdWVzOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IEZpZWxkVmFsdWVcbiAgICB9O1xuICAgIHZhbHVlSW5kZXg6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgYSBsb2NhdGlvbiBpbiBhIGZpZWxkZWQgc2VhcmNoIGV4cHJlc3Npb25cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFeHByTG9jYXRpb24ge1xuICAgIHN0YXJ0OiBudW1iZXI7XG4gICAgbGVuZ3RoOiBudW1iZXI7XG59XG5cbi8qKlxuICogRGVzY3JpYmVzIGEgbG9jYXRpb24gYW5kIHZhbHVlIGluIGEgZmllbGRlZCBzZWFyY2ggZXhwcmVzc2lvblxuICovXG5leHBvcnQgaW50ZXJmYWNlIEV4cHJWYWx1ZUxvY2F0aW9uIGV4dGVuZHMgRXhwckxvY2F0aW9uIHtcbiAgICB2YWx1ZTogc3RyaW5nO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyBhIGxvY2F0aW9uLCB2YWx1ZSBhbmQgZmllbGQgaW4gYSBmaWVsZGVkIHNlYXJjaCBleHByZXNzaW9uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRXhwclZhbHVlSW5mbyBleHRlbmRzIEV4cHJWYWx1ZUxvY2F0aW9uIHtcbiAgICBmaWVsZDogc3RyaW5nO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyB0aGUgZGF0YSB1c2VkIGluIFtFeHByLmV2YWx1YXRlXXtAbGluayBFeHByI2V2YWx1YXRlfVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEV4cHJFdmFsdWF0aW9uQ29udGV4dCB7XG4gICAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyBhbiBpbml0aWFsaXphdGlvbiBvYmplY3QgdXNlZCBpbiB0aGUgY29uc3RydWN0aW9uIG9mIGFuIHtAbGluayBFeHByfSBmcm9tIGEgdmFsdWVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFeHByVmFsdWVJbml0aWFsaXplciB7XG4gICAgLyoqXG4gICAgICogVGhlIGV4cHJlc3Npb24gY29udGV4dFxuICAgICAqL1xuICAgIGV4cHJDb250ZXh0OiBFeHByQ29udGV4dDtcbiAgICAvKipcbiAgICAgKiBBIHNpbmdsZSB2YWx1ZVxuICAgICAqL1xuICAgIHZhbHVlPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIHZhbHVlc1xuICAgICAqL1xuICAgIHZhbHVlcz86IHN0cmluZ1tdO1xuICAgIC8qKlxuICAgICAqIExvY2F0aW9ucyBvZiB0aGUgdmFsdWVzIHVzZWQgaW4gcmFuZ2UgZXhwcmVzc2lvbnNcbiAgICAgKi9cbiAgICBsb2NhdGlvbnM/OiBFeHByTG9jYXRpb25bXTtcbiAgICAvKipcbiAgICAgKiBUaGUgb3BlcmF0b3IgdXNlZCBpbiB0aGUgZXhwcmVzc2lvblxuICAgICAqL1xuICAgIG9wZXJhdG9yPzogRXhwck9wZXJhdG9yO1xuICAgIC8qKlxuICAgICAqIFRoZSBmaWVsZCBuYW1lXG4gICAgICovXG4gICAgZmllbGQ/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIGRpc3BsYXkgdmFsdWVcbiAgICAgKi9cbiAgICBkaXNwbGF5Pzogc3RyaW5nO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyBhbiBpbml0aWFsaXphdGlvbiBvYmplY3QgdXNlZCBpbiB0aGUgY29uc3RydWN0aW9uIG9mIGEgYm9vbGVhbiB7QGxpbmsgRXhwcn0gd2l0aCBhIHBhaXIgb2Ygb3BlcmFuZHNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFeHByT3BlcmFuZHNJbml0aWFsaXplciB7XG4gICAgLyoqXG4gICAgICogVGhlIGV4cHJlc3Npb24gY29udGV4dFxuICAgICAqL1xuICAgIGV4cHJDb250ZXh0OiBFeHByQ29udGV4dDtcbiAgICAvKipcbiAgICAgKiBUaGUgZmlyc3Qgb3BlcmFuZFxuICAgICAqL1xuICAgIG9wMTogRXhwcjtcbiAgICAvKipcbiAgICAgKiBJZiBgdHJ1ZWAgdGhpcyBgRXhwcmAgcmVwcmVzZW50cyBhbiBgQU5EYCBleHByZXNzaW9uLCBvdGhlcndpc2UgaXQgcmVwcmVzZW50cyBhbiBgT1JgIGV4cHJlc3Npb25cbiAgICAgKi9cbiAgICBhbmQ6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogVGhlIHNlY29uZCBvcGVyYW5kXG4gICAgICovXG4gICAgb3AyOiBFeHByO1xuICAgIC8qKlxuICAgICAqIFRoZSBmaWVsZCBuYW1lXG4gICAgICovXG4gICAgZmllbGQ/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIGRpc3BsYXkgdmFsdWVcbiAgICAgKi9cbiAgICBkaXNwbGF5Pzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwYXJzZWQgZmllbGRlZCBzZWFyY2ggZXhwcmVzc2lvbi4gQSB0cmVlIG9mIGV4cHJlc3Npb24gbm9kZXMgaXMgYnVpbHQgd2hlbiBhbiBleHByZXNzaW9uXG4gKiBjb21iaW5lcyBzdWItZXhwcmVzc2lvbnMgdXNpbmcgYm9vbGVhbiBvcGVyYXRvcnNcbiAqL1xuZXhwb3J0IGNsYXNzIEV4cHIge1xuXG4gICAgcHJpdmF0ZSBfZmllbGQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgZmllbGQgbmFtZSBvZiB0aGlzIGV4cHJlc3Npb24uIFJldHVybiB0aGUgZmlyc3QgYW5jZXN0b3IncyBub24tZW1wdHkgZmllbGRcbiAgICAgKiBpZiB0aGUgZmllbGQgb24gdGhpcyBub2RlIGlzIGVtcHR5XG4gICAgICovXG4gICAgcHVibGljIGdldCBmaWVsZCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBsZXQgZXhwcjogRXhwciA9IHRoaXM7XG4gICAgICAgIHdoaWxlIChleHByKSB7XG4gICAgICAgICAgICBpZiAoIVV0aWxzLmlzRW1wdHkoZXhwci5fZmllbGQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4cHIuX2ZpZWxkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXhwciA9IGV4cHIucGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBmaWVsZCBuYW1lIG9mIHRoaXMgZXhwcmVzc2lvblxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgZmllbGQodmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9maWVsZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc3BsYXk6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBwcml2YXRlIF9kaXNwbGF5T2JqOiB7bGFiZWw/OiBzdHJpbmcsIGRpc3BsYXk/OiBzdHJpbmd9IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoaXMgZXhwcmVzc2lvbi4gUmV0dXJuIHRoZSBmaXJzdCBhbmNlc3RvcidzIG5vbi1lbXB0eSBkaXNwbGF5IHZhbHVlXG4gICAgICogaWYgdGhlIGRpc3BsYXkgdmFsdWUgb24gdGhpcyBub2RlIGlzIGVtcHR5XG4gICAgICovXG4gICAgcHVibGljIGdldCBkaXNwbGF5KCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGxldCBleHByOiBFeHByID0gdGhpcztcbiAgICAgICAgd2hpbGUgKGV4cHIpIHtcbiAgICAgICAgICAgIGlmICghVXRpbHMuaXNFbXB0eShleHByLl9kaXNwbGF5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBleHByLl9kaXNwbGF5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXhwciA9IGV4cHIucGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoaXMgZXhwcmVzc2lvbi4gSWYgdGhlIGRpc3BsYXkgdmFsdWUgaXMgYSB2YWxpZCBzdHJpbmdpZmllZCBKU09OIG9iamVjdFxuICAgICAqIHRoZW4gc2V0IGBkaXNwbGF5T2JqYCB0byB0aGUgcGFyc2VkIG9iamVjdFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgZGlzcGxheSh2YWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2Rpc3BsYXkgPSB2YWx1ZTtcbiAgICAgICAgaWYgKCF0aGlzLl9kaXNwbGF5KSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5T2JqID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2Rpc3BsYXlbMF0gPT09IFwie1wiICYmIHRoaXMuX2Rpc3BsYXlbdGhpcy5fZGlzcGxheS5sZW5ndGggLSAxXSA9PT0gXCJ9XCIpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXNwbGF5T2JqID0gVXRpbHMuZnJvbUpzb24odGhpcy5fZGlzcGxheSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlPYmogPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlzcGxheU9iaiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgZGlzcGxheSBvYmplY3Qgb2YgdGhpcyBleHByZXNzaW9uLiBSZXR1cm4gdGhlIGZpcnN0IGFuY2VzdG9yJ3Mgbm9uLWVtcHR5IGRpc3BsYXkgb2JqZWN0XG4gICAgICogaWYgdGhlIGRpc3BsYXkgb2JqZWN0IG9uIHRoaXMgbm9kZSBpcyBlbXB0eVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgZGlzcGxheU9iaigpOiB7bGFiZWw/OiBzdHJpbmcsIGRpc3BsYXk/OiBzdHJpbmd9IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgbGV0IGV4cHI6IEV4cHIgPSB0aGlzO1xuICAgICAgICB3aGlsZSAoZXhwcikge1xuICAgICAgICAgICAgaWYgKGV4cHIuX2Rpc3BsYXlPYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhwci5fZGlzcGxheU9iajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4cHIgPSBleHByLnBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZXMgb2YgdGhpcyBleHByZXNzaW9uXG4gICAgICovXG4gICAgcHVibGljIHZhbHVlczogc3RyaW5nW10gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGhlIGxvY2F0aW9ucyBvZiB0aGUgdmFsdWVzIG9mIHRoaXMgZXhwcmVzc2lvblxuICAgICAqL1xuICAgIHB1YmxpYyBsb2NhdGlvbnM6IEV4cHJMb2NhdGlvbltdIHwgdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSB2YWx1ZSBvZiB0aGlzIGV4cHJlc3Npb24uIE5vdGUgdGhhdCByYW5nZSBleHByZXNzaW9ucyBtYXkgaGF2ZSBtdWx0aXBsZSB2YWx1ZXNcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICghdGhpcy52YWx1ZXMgfHwgdGhpcy52YWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlc1swXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHZhbHVlIG9mIHRoaXMgZXhwcmVzc2lvblxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgdmFsdWUodmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudmFsdWVzWzBdID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnZhbHVlcy5sZW5ndGggPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIG9wZXJhdG9yIG9mIHRoaXMgZXhwcmVzc2lvblxuICAgICAqL1xuICAgIHB1YmxpYyBvcGVyYXRvcjogRXhwck9wZXJhdG9yO1xuICAgIC8qKlxuICAgICAqIElmIGB0cnVlYCB0aGVuIHRoaXMgZXhwcmVzc2lvbiBpbmNsdWRlZCB0aGUgYE5PVGAgYm9vbGVhbiBvcGVyYXRvclxuICAgICAqL1xuICAgIHB1YmxpYyBub3Q6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogSWYgYHRydWVgIHRoZW4gdGhlIG9wZXJhbmRzIG9mIHRoaXMgZXhwcmVzc2lvbiBhcmUgY29tYmluZWQgd2l0aCB0aGUgYEFORGAgb3BlcmF0b3IuXG4gICAgICogT3RoZXJ3aXNlIHRoZSBvcGVyYW5kcyBhcmUgY29tYmluZWQgd2l0aCB0aGUgYE9SYCBvcGVyYXRvclxuICAgICAqL1xuICAgIHB1YmxpYyBhbmQ6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogVGhlIG9wZXJhbmRzIG9mIHRoaXMgZXhwcmVzc2lvbiwgaWYgYW55XG4gICAgICovXG4gICAgcHVibGljIG9wZXJhbmRzOiBFeHByW107XG4gICAgLyoqXG4gICAgICogVGhlIHBhcmVudCBleHByZXNzaW9uLCBpZiBhbnlcbiAgICAgKi9cbiAgICBwdWJsaWMgcGFyZW50OiBFeHByO1xuICAgIC8qKlxuICAgICAqIFRoZSBleHByZXNzaW9uIGNvbnRleHRcbiAgICAgKi9cbiAgICBwdWJsaWMgZXhwckNvbnRleHQ6IEV4cHJDb250ZXh0O1xuICAgIC8qKlxuICAgICAqIFRoZSBkaXN0YW5jZSBzcGVjaWZpZWQgaW4gYSBgTkVBUmAgZXhwcmVzc2lvblxuICAgICAqL1xuICAgIHB1YmxpYyBuZWFyOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVGhlIHBvc2l0aW9uIG9mIHRoaXMgZXhwcmVzc2lvbidzIHZhbHVlIGluIHRoZSBvcmlnaW5hbCB0ZXh0XG4gICAgICovXG4gICAgcHVibGljIHN0YXJ0OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVGhlIGxlbmd0aCBvZiB0aGlzIGV4cHJlc3Npb24ncyB2YWx1ZSBpbiB0aGUgb3JpZ2luYWwgdGV4dFxuICAgICAqL1xuICAgIHB1YmxpYyBsZW5ndGg6IG51bWJlcjtcbiAgICBwcml2YXRlIG1lcmdlZFN0cnVjdHVyZWQ6IGJvb2xlYW47XG5cbiAgICAvLyBmb3IgZXZhbHVhdGVcbiAgICBwcml2YXRlIF9ldmFsdWF0aW9uUmVnRXhwczogTWFwT2Y8UmVnRXhwIHwgdW5kZWZpbmVkPjtcbiAgICBwcml2YXRlIGdldCBldmFsdWF0aW9uUmVnRXhwcygpOiBNYXBPZjxSZWdFeHAgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9ldmFsdWF0aW9uUmVnRXhwcykge1xuICAgICAgICAgICAgdGhpcy5fZXZhbHVhdGlvblJlZ0V4cHMgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZXZhbHVhdGlvblJlZ0V4cHM7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoaW5pdDogRXhwclZhbHVlSW5pdGlhbGl6ZXIgfCBFeHByT3BlcmFuZHNJbml0aWFsaXplcikge1xuICAgICAgICBpZiAoISg8RXhwck9wZXJhbmRzSW5pdGlhbGl6ZXI+aW5pdCkub3AxKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZUluaXQ6IEV4cHJWYWx1ZUluaXRpYWxpemVyID0gPEV4cHJWYWx1ZUluaXRpYWxpemVyPmluaXQ7XG4gICAgICAgICAgICB0aGlzLmV4cHJDb250ZXh0ID0gdmFsdWVJbml0LmV4cHJDb250ZXh0O1xuICAgICAgICAgICAgaWYgKCFVdGlscy5pc1VuZGVmaW5lZCh2YWx1ZUluaXQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IEV4cHJQYXJzZXIudW5lc2NhcGUodmFsdWVJbml0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFVdGlscy5pc1VuZGVmaW5lZCh2YWx1ZUluaXQudmFsdWVzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzID0gRXhwclBhcnNlci51bmVzY2FwZUxpc3QodmFsdWVJbml0LnZhbHVlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9ucyA9IHZhbHVlSW5pdC5sb2NhdGlvbnM7XG4gICAgICAgICAgICB0aGlzLmZpZWxkID0gdmFsdWVJbml0LmZpZWxkO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID0gdmFsdWVJbml0LmRpc3BsYXk7XG4gICAgICAgICAgICB0aGlzLm9wZXJhdG9yID0gIVV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlSW5pdC5vcGVyYXRvcikgPyB2YWx1ZUluaXQub3BlcmF0b3IgOiBFeHByT3BlcmF0b3Iubm9uZTtcbiAgICAgICAgICAgIHRoaXMubmVhciA9IC0xO1xuICAgICAgICAgICAgdGhpcy5zdGFydCA9IC0xO1xuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgb3BzSW5pdDogRXhwck9wZXJhbmRzSW5pdGlhbGl6ZXIgPSBpbml0IGFzIEV4cHJPcGVyYW5kc0luaXRpYWxpemVyO1xuICAgICAgICAgICAgdGhpcy5leHByQ29udGV4dCA9IG9wc0luaXQuZXhwckNvbnRleHQ7XG4gICAgICAgICAgICB0aGlzLmZpZWxkID0gb3BzSW5pdC5maWVsZDtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSA9IG9wc0luaXQuZGlzcGxheTtcbiAgICAgICAgICAgIHRoaXMuYWRkT3BlcmFuZChvcHNJbml0Lm9wMSk7XG4gICAgICAgICAgICB0aGlzLmFkZE9wZXJhbmQob3BzSW5pdC5vcDIpO1xuICAgICAgICAgICAgdGhpcy5hbmQgPSBvcHNJbml0LmFuZDtcbiAgICAgICAgICAgIHRoaXMubmVhciA9IC0xO1xuICAgICAgICAgICAgdGhpcy5zdGFydCA9IC0xO1xuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGFuIG9wZXJhbmQgdG8gdGhpcyBleHByZXNzaW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3BlcmFuZCBUaGUgb3BlcmFuZCB0byBhZGRcbiAgICAgKiBAcGFyYW0gY29udGV4dEZpZWxkIFRoZSBwYXJzZXIncyBmaWVsZCBjb250ZXh0LCBpZiBhbnlcbiAgICAgKiBAcGFyYW0gcHJlcGVuZCBJZiBgdHJ1ZWAgdGhlIG9wZXJhbmQgaXMgcHJlcGVuZGVkIHRvIHRoZSBvcGVyYW5kc1xuICAgICAqL1xuICAgIHB1YmxpYyBhZGRPcGVyYW5kKG9wZXJhbmQ6IEV4cHIsIGNvbnRleHRGaWVsZD86IHN0cmluZywgcHJlcGVuZCA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChVdGlscy5pc1VuZGVmaW5lZChjb250ZXh0RmllbGQpKSB7XG4gICAgICAgICAgICBjb250ZXh0RmllbGQgPSB0aGlzLmZpZWxkO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5vcGVyYW5kcykge1xuICAgICAgICAgICAgdGhpcy5vcGVyYW5kcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghVXRpbHMuaXNFbXB0eSh0aGlzLmZpZWxkKSAmJiBVdGlscy5pc0VtcHR5KG9wZXJhbmQuZmllbGQpICYmICFvcGVyYW5kLmlzU3RydWN0dXJlZCkge1xuICAgICAgICAgICAgaWYgKFV0aWxzLmlzRW1wdHkoY29udGV4dEZpZWxkKSkge1xuICAgICAgICAgICAgICAgIC8vIFByZWZlciBzZXR0aW5nIHRoZSBmaWVsZHMgZXhwbGljaXRseSBvbiB0aGUgdGFyZ2V0IG9wZXJhbmRzIHJhdGhlciB0aGUgRmllbGQgdG8gXCJ0ZXh0XCIgb24gdGhlIHNvdXJjZSBvcGVyYW5kXG4gICAgICAgICAgICAgICAgLy8gb3BlcmFuZC5maWVsZCA9IEV4cHJQYXJzZXIuZmllbGRQYXJ0bmFtZVByZWZpeCArIFwidGV4dFwiO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZXhwciBvZiB0aGlzLm9wZXJhbmRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc0VtcHR5KGV4cHIuX2ZpZWxkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwci5fZmllbGQgPSB0aGlzLmZpZWxkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZmllbGQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFVdGlscy5lcU5DKHRoaXMuZmllbGQgfHwgXCJcIiwgb3BlcmFuZC5maWVsZCB8fCBcIlwiKSkge1xuICAgICAgICAgICAgb3BlcmFuZC5fZmllbGQgPSBvcGVyYW5kLmZpZWxkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3BlcmFuZC5fZmllbGQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFVdGlscy5pc0VtcHR5KHRoaXMuZGlzcGxheSkpIHtcbiAgICAgICAgICAgIG9wZXJhbmQuX2Rpc3BsYXkgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZXBlbmQpIHtcbiAgICAgICAgICAgIHRoaXMub3BlcmFuZHMudW5zaGlmdChvcGVyYW5kKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3BlcmFuZHMucHVzaChvcGVyYW5kKTtcbiAgICAgICAgfVxuICAgICAgICBvcGVyYW5kLnBhcmVudCA9IHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGB0cnVlYCBpZiB0aGlzIGV4cHJlc3Npb24gaXMgYSBsZWFmIG5vZGUgKGRvZXMgaGF2ZSBhIHZhbHVlKVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgaXNMZWFmKCk6IGJvb2xlYW4ge1xuICAgICAgICAvLyBpZiAodGhpcy52YWx1ZSA9PT0gbnVsbCAmJiAhdGhpcy5vcGVyYW5kcykgdGhyb3cgXCJFeHByLmlzTGVhZiAtIGJhZCBleHByZXNzaW9uXCI7XG4gICAgICAgIHJldHVybiAhIXRoaXMudmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSBhbiBleHByZXNzaW9uIG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIGV4cHJDb250ZXh0IFRoZSBleHByZXNzaW9uIGNvbnRleHRcbiAgICAgKiBAcGFyYW0gdGV4dCBUaGUgdmFsdWUgb2YgdGhlIGV4cHJlc3Npb25cbiAgICAgKiBAcGFyYW0gZmllbGQgVGhlIHBhcnNlcidzIGZpZWxkIGNvbnRleHRcbiAgICAgKiBAcGFyYW0gZGlzcGxheSBUaGUgZGlzcGxheSB2YWx1ZVxuICAgICAqIEBwYXJhbSBhbGxvd0VtcHR5VmFsdWUgRGV0ZXJtaW5lcyBob3cgZW1wdHkgdmFsdWVzIHdpbGwgYmUgcHJvY2Vzc2VkIHdoZW4gbWFraW5nIHRoZSBleHByZXNzaW9uXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBtYWtlRXhwcihleHByQ29udGV4dDogRXhwckNvbnRleHQsIHRleHQ6IHN0cmluZywgZmllbGQ6IHN0cmluZywgZGlzcGxheTogc3RyaW5nLCBhbGxvd0VtcHR5VmFsdWU6IGJvb2xlYW4pOiBFeHByIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKCFFeHByLmdldElzU3RydWN0dXJlZEZpZWxkKGV4cHJDb250ZXh0LCBFeHByLnJlc29sdmVGaWVsZChleHByQ29udGV4dCwgZmllbGQpKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFeHByKHtcbiAgICAgICAgICAgICAgICBleHByQ29udGV4dDogZXhwckNvbnRleHQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRleHQsXG4gICAgICAgICAgICAgICAgZmllbGQ6IGZpZWxkLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGRpc3BsYXlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFsdWVzOiBJUmVmPHN0cmluZ1tdIHwgdW5kZWZpbmVkPiA9IHt2YWx1ZTogdW5kZWZpbmVkfTtcbiAgICAgICAgY29uc3QgbG9jYXRpb25zOiBJUmVmPEV4cHJMb2NhdGlvbltdIHwgdW5kZWZpbmVkPiA9IHt2YWx1ZTogdW5kZWZpbmVkfTtcbiAgICAgICAgY29uc3Qgb3BlcmF0b3I6IElSZWY8RXhwck9wZXJhdG9yPiA9IHt2YWx1ZTogRXhwck9wZXJhdG9yLm5vbmV9O1xuICAgICAgICBjb25zdCByYW5nZTogSVJlZjxFeHByUmFuZ2U+ID0ge3ZhbHVlOiBFeHByUmFuZ2Uubm9uZX07XG4gICAgICAgIEV4cHIucGFyc2VWYWx1ZShleHByQ29udGV4dCwgdGV4dCwgZmllbGQsIGFsbG93RW1wdHlWYWx1ZSwgdmFsdWVzLCBsb2NhdGlvbnMsIG9wZXJhdG9yLCByYW5nZSk7XG4gICAgICAgIGlmIChyYW5nZS52YWx1ZSAhPT0gRXhwclJhbmdlLm5vbmUgJiYgdmFsdWVzLnZhbHVlICYmIGxvY2F0aW9ucy52YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUxID0gdmFsdWVzLnZhbHVlWzBdO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUyID0gdmFsdWVzLnZhbHVlWzFdO1xuICAgICAgICAgICAgY29uc3QgbG9jYXRpb24xID0gbG9jYXRpb25zLnZhbHVlWzBdO1xuICAgICAgICAgICAgY29uc3QgbG9jYXRpb24yID0gbG9jYXRpb25zLnZhbHVlWzFdO1xuICAgICAgICAgICAgaWYgKHJhbmdlLnZhbHVlID09PSBFeHByUmFuZ2UuZ3RlTHRlICYmICFVdGlscy5lcU5DKHZhbHVlMSwgXCIqXCIpICYmICFVdGlscy5lcU5DKHZhbHVlMiwgXCIqXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFeHByKHtcbiAgICAgICAgICAgICAgICAgICAgZXhwckNvbnRleHQ6IGV4cHJDb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHZhbHVlcy52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25zOiBsb2NhdGlvbnMudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBmaWVsZCxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZGlzcGxheSxcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0b3I6IEV4cHJPcGVyYXRvci5iZXR3ZWVuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBleHByMSA9ICFVdGlscy5lcU5DKHZhbHVlMSwgXCIqXCIpID8gbmV3IEV4cHIoe1xuICAgICAgICAgICAgICAgIGV4cHJDb250ZXh0OiBleHByQ29udGV4dCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUxLFxuICAgICAgICAgICAgICAgIGxvY2F0aW9uczogW2xvY2F0aW9uMV0sXG4gICAgICAgICAgICAgICAgZmllbGQ6IGZpZWxkLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGRpc3BsYXksXG4gICAgICAgICAgICAgICAgb3BlcmF0b3I6IHJhbmdlLnZhbHVlID09PSBFeHByUmFuZ2UuZ3RlTHQgfHwgcmFuZ2UudmFsdWUgPT09IEV4cHJSYW5nZS5ndGVMdGUgPyBFeHByT3BlcmF0b3IuZ3RlIDogRXhwck9wZXJhdG9yLmd0XG4gICAgICAgICAgICB9KSA6IG51bGw7XG4gICAgICAgICAgICBjb25zdCBleHByMiA9ICFVdGlscy5lcU5DKHZhbHVlMiwgXCIqXCIpID8gbmV3IEV4cHIoe1xuICAgICAgICAgICAgICAgIGV4cHJDb250ZXh0OiBleHByQ29udGV4dCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUyLFxuICAgICAgICAgICAgICAgIGxvY2F0aW9uczogW2xvY2F0aW9uMl0sXG4gICAgICAgICAgICAgICAgZmllbGQ6IGZpZWxkLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGRpc3BsYXksXG4gICAgICAgICAgICAgICAgb3BlcmF0b3I6IHJhbmdlLnZhbHVlID09PSBFeHByUmFuZ2UuZ3RlTHRlIHx8IHJhbmdlLnZhbHVlID09PSBFeHByUmFuZ2UuZ3RMdGUgPyBFeHByT3BlcmF0b3IubHRlIDogRXhwck9wZXJhdG9yLmx0XG4gICAgICAgICAgICB9KSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmICghZXhwcjEgJiYgIWV4cHIyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKCEhZXhwcjEgJiYgISFleHByMikpIHJldHVybiAhIWV4cHIxID8gZXhwcjEgOiBleHByMjtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXhwcih7XG4gICAgICAgICAgICAgICAgZXhwckNvbnRleHQ6IGV4cHJDb250ZXh0LFxuICAgICAgICAgICAgICAgIG9wMTogZXhwcjEsXG4gICAgICAgICAgICAgICAgYW5kOiB0cnVlLFxuICAgICAgICAgICAgICAgIG9wMjogZXhwcjIsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogZGlzcGxheVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBFeHByKHtcbiAgICAgICAgICAgIGV4cHJDb250ZXh0OiBleHByQ29udGV4dCxcbiAgICAgICAgICAgIHZhbHVlczogdmFsdWVzLnZhbHVlLFxuICAgICAgICAgICAgbG9jYXRpb25zOiBsb2NhdGlvbnMudmFsdWUsXG4gICAgICAgICAgICBmaWVsZDogZmllbGQsXG4gICAgICAgICAgICBkaXNwbGF5OiBkaXNwbGF5LFxuICAgICAgICAgICAgb3BlcmF0b3I6IG9wZXJhdG9yLnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHJlc29sdmVGaWVsZChleHByQ29udGV4dDogRXhwckNvbnRleHQsIGZpZWxkOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKGZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGV4cHJDb250ZXh0LmFwcFNlcnZpY2UucmVzb2x2ZUNvbHVtbk5hbWUoZmllbGQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldENvbHVtbihleHByQ29udGV4dDogRXhwckNvbnRleHQsIGZpZWxkOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBDQ0NvbHVtbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiBleHByQ29udGV4dC5hcHBTZXJ2aWNlLmdldENvbHVtbihmaWVsZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSB7QGxpbmsgQ0NDb2x1bW59IGNvcnJlc3BvbmRpbmcgdG8gdGhpcyBleHByZXNzaW9uXG4gICAgICovXG4gICAgZ2V0IGNvbHVtbigpOiBDQ0NvbHVtbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiBFeHByLmdldENvbHVtbih0aGlzLmV4cHJDb250ZXh0LCB0aGlzLmZpZWxkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRJc1N0cnVjdHVyZWRGaWVsZChleHByQ29udGV4dDogRXhwckNvbnRleHQsIGZpZWxkOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCFmaWVsZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChleHByQ29udGV4dC5kaXNhbGxvd0Z1bGx0ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChmaWVsZFswXSA9PT0gXCI6XCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIDo6ID0+IHRha2UgcGFydG5hbWUgb3ZlciBjb2x1bW5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChVdGlscy5lcU5DTihmaWVsZCwgXCJleGlzdHNcIiwgXCJtaXNzaW5nXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gISFFeHByLmdldENvbHVtbihleHByQ29udGV4dCwgZmllbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGB0cnVlYCBpZiB0aGUgZXhwcmVzc2lvbiBoYXMgYSBub24tZnVsbHRleHQgZmllbGQuIEluIHRoaXMgY2FzZSB0aGUgZXhwcmVzc2lvbiB3aWxsIGJlIGEgbGVhZiBub2RlXG4gICAgICovXG4gICAgZ2V0IGlzU3RydWN0dXJlZEZpZWxkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIXRoaXMuaXNMZWFmKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEV4cHIuZ2V0SXNTdHJ1Y3R1cmVkRmllbGQodGhpcy5leHByQ29udGV4dCwgdGhpcy5maWVsZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGB0cnVlYCBpZiB0aGUgZXhwcmVzc2lvbiBvbmx5IGNvbnRhaW5zIG5vbi1mdWxsdGV4dCBmaWVsZHNcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGlzU3RydWN0dXJlZCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMubWVyZ2VkU3RydWN0dXJlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNMZWFmKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc1N0cnVjdHVyZWRGaWVsZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMub3BlcmFuZHMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IG9wZXJhbmQgb2YgdGhpcy5vcGVyYW5kcykge1xuICAgICAgICAgICAgaWYgKCFvcGVyYW5kLmlzU3RydWN0dXJlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIHRoZSBleHByZXNzaW9uIGFuZCBpdHMgYW5jZXN0b3JzIGRvIG5vdCBoYXZlIGBub3RgIHNldCB0byBgdHJ1ZWBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGlzUG9zaXRpdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBwb3NpdGl2ZSA9IHRydWU7XG4gICAgICAgIGxldCBjdXJyZW50OiBFeHByID0gdGhpcztcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgcG9zaXRpdmUgPSBwb3NpdGl2ZSAmJiAhY3VycmVudC5ub3Q7XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBvc2l0aXZlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbiBgRXhwclZhbHVlTG9jYXRpb25gIG9iamVjdCBmb3IgdGhlIHBhc3NlZCB0ZXh0LiBMZWFkaW5nIGFuZCB0cmFpbGluZ1xuICAgICAqIHdoaXRlc3BhY2UgaXMgZXhjbHVkZWRcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0VmFsdWVBbmRMb2NhdGlvbih0ZXh0OiBzdHJpbmcpOiBFeHByVmFsdWVMb2NhdGlvbiB7XG4gICAgICAgIGxldCBzdGFydCA9IDA7XG4gICAgICAgIGxldCBsZW5ndGggPSB0ZXh0Lmxlbmd0aDtcbiAgICAgICAgY29uc3QgdmFsdWUxID0gVXRpbHMudHJpbVN0YXJ0KHRleHQpO1xuICAgICAgICBzdGFydCArPSBsZW5ndGggLSB2YWx1ZTEubGVuZ3RoO1xuICAgICAgICBsZW5ndGggLT0gbGVuZ3RoIC0gdmFsdWUxLmxlbmd0aDtcbiAgICAgICAgY29uc3QgdmFsdWUyID0gVXRpbHMudHJpbUVuZCh2YWx1ZTEpO1xuICAgICAgICBsZW5ndGggLT0gbGVuZ3RoIC0gdmFsdWUyLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZTIsXG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICBsZW5ndGg6IGxlbmd0aFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHBhcnNlVmFsdWUoZXhwckNvbnRleHQ6IEV4cHJDb250ZXh0LCB0ZXh0OiBzdHJpbmcsIGZpZWxkOiBzdHJpbmcsIGFsbG93RW1wdHlWYWx1ZTogYm9vbGVhbiwgdmFsdWVzOiBJUmVmPHN0cmluZ1tdIHwgdW5kZWZpbmVkPiwgbG9jYXRpb25zOiBJUmVmPEV4cHJMb2NhdGlvbltdIHwgdW5kZWZpbmVkPiwgb3BlcmF0b3I6IElSZWY8RXhwck9wZXJhdG9yPiwgcmFuZ2U6IElSZWY8RXhwclJhbmdlPikge1xuICAgICAgICBpZiAoVXRpbHMuaXNFbXB0eSh0ZXh0KSAmJiAhYWxsb3dFbXB0eVZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlyc3QgPSB0ZXh0WzBdO1xuICAgICAgICBjb25zdCBsYXN0ID0gdGV4dFt0ZXh0Lmxlbmd0aCAtIDFdO1xuICAgICAgICBsZXQgdmw6IEV4cHJWYWx1ZUxvY2F0aW9uO1xuICAgICAgICBpZiAoXCJbe1wiLmluY2x1ZGVzKGZpcnN0KSAmJiBcIl19XCIuaW5jbHVkZXMobGFzdCkpIHtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cigxLCB0ZXh0Lmxlbmd0aCAtIDIpO1xuICAgICAgICAgICAgbGV0IHNlcExlbiA9IDQ7XG4gICAgICAgICAgICBsZXQgc2VwID0gdGV4dC5pbmRleE9mKFwiIFRPIFwiKTtcbiAgICAgICAgICAgIGlmIChzZXAgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgc2VwTGVuID0gMjtcbiAgICAgICAgICAgICAgICBzZXAgPSB0ZXh0LmluZGV4T2YoXCIuLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZXAgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmxzID0gRXhwclBhcnNlci52YWx1ZXNBbmRMb2NhdGlvbnNGcm9tVGV4dCh0ZXh0LCAnLCcpO1xuICAgICAgICAgICAgICAgIHZhbHVlcy52YWx1ZSA9IFtdO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9ucy52YWx1ZSA9IFtdO1xuICAgICAgICAgICAgICAgIHZscy5mb3JFYWNoKHZsMSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy52YWx1ZSEucHVzaCh2bDEudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbnMudmFsdWUhLnB1c2goe3N0YXJ0OiAxICsgdmwxLnN0YXJ0LCBsZW5ndGg6IHZsMS5sZW5ndGh9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBvcGVyYXRvci52YWx1ZSA9IEV4cHJPcGVyYXRvci5pbjtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2bCA9IEV4cHIuZ2V0VmFsdWVBbmRMb2NhdGlvbih0ZXh0LnN1YnN0cigwLCBzZXApKTtcbiAgICAgICAgICAgIHZhbHVlcy52YWx1ZSA9IFt2bC52YWx1ZV07XG4gICAgICAgICAgICBsb2NhdGlvbnMudmFsdWUgPSBbe3N0YXJ0OiAxICsgdmwuc3RhcnQsIGxlbmd0aDogdmwubGVuZ3RofV07XG4gICAgICAgICAgICB2bCA9IEV4cHIuZ2V0VmFsdWVBbmRMb2NhdGlvbih0ZXh0LnN1YnN0cihzZXAgKyBzZXBMZW4pKTtcbiAgICAgICAgICAgIHZhbHVlcy52YWx1ZS5wdXNoKHZsLnZhbHVlKTtcbiAgICAgICAgICAgIGxvY2F0aW9ucy52YWx1ZS5wdXNoKHtzdGFydDogMSArIHNlcCArIHNlcExlbiArIHZsLnN0YXJ0LCBsZW5ndGg6IHZsLmxlbmd0aH0pO1xuICAgICAgICAgICAgaWYgKGZpcnN0ID09PSBcIltcIikge1xuICAgICAgICAgICAgICAgIHJhbmdlLnZhbHVlID0gbGFzdCA9PT0gXCJdXCIgPyBFeHByUmFuZ2UuZ3RlTHRlIDogRXhwclJhbmdlLmd0ZUx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8vICd7J1xuICAgICAgICAgICAgICAgIHJhbmdlLnZhbHVlID0gbGFzdCA9PT0gXCJ9XCIgPyBFeHByUmFuZ2UuZ3RMdCA6IEV4cHJSYW5nZS5ndEx0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2bCA9IHtcbiAgICAgICAgICAgIHZhbHVlOiB0ZXh0LFxuICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICBsZW5ndGg6IHRleHQubGVuZ3RoXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0ZXh0LnN0YXJ0c1dpdGgoXCI9XCIpKSB7XG4gICAgICAgICAgICBvcGVyYXRvci52YWx1ZSA9IEV4cHJPcGVyYXRvci5lcTtcbiAgICAgICAgICAgIHZsID0gRXhwci5nZXRWYWx1ZUFuZExvY2F0aW9uKHRleHQuc3Vic3RyKDEpKTtcbiAgICAgICAgICAgIHZsLnN0YXJ0ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGV4dC5zdGFydHNXaXRoKFwiPj1cIikpIHtcbiAgICAgICAgICAgIG9wZXJhdG9yLnZhbHVlID0gRXhwck9wZXJhdG9yLmd0ZTtcbiAgICAgICAgICAgIHZsID0gRXhwci5nZXRWYWx1ZUFuZExvY2F0aW9uKHRleHQuc3Vic3RyKDIpKTtcbiAgICAgICAgICAgIHZsLnN0YXJ0ICs9IDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGV4dC5zdGFydHNXaXRoKFwiPlwiKSkge1xuICAgICAgICAgICAgb3BlcmF0b3IudmFsdWUgPSBFeHByT3BlcmF0b3IuZ3Q7XG4gICAgICAgICAgICB2bCA9IEV4cHIuZ2V0VmFsdWVBbmRMb2NhdGlvbih0ZXh0LnN1YnN0cigxKSk7XG4gICAgICAgICAgICB2bC5zdGFydCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRleHQuc3RhcnRzV2l0aChcIjw9XCIpKSB7XG4gICAgICAgICAgICBvcGVyYXRvci52YWx1ZSA9IEV4cHJPcGVyYXRvci5sdGU7XG4gICAgICAgICAgICB2bCA9IEV4cHIuZ2V0VmFsdWVBbmRMb2NhdGlvbih0ZXh0LnN1YnN0cigyKSk7XG4gICAgICAgICAgICB2bC5zdGFydCArPSAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRleHQuc3RhcnRzV2l0aChcIjw+XCIpKSB7XG4gICAgICAgICAgICBvcGVyYXRvci52YWx1ZSA9IEV4cHJPcGVyYXRvci5uZXE7XG4gICAgICAgICAgICB2bCA9IEV4cHIuZ2V0VmFsdWVBbmRMb2NhdGlvbih0ZXh0LnN1YnN0cigyKSk7XG4gICAgICAgICAgICB2bC5zdGFydCArPSAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRleHQuc3RhcnRzV2l0aChcIjxcIikpIHtcbiAgICAgICAgICAgIG9wZXJhdG9yLnZhbHVlID0gRXhwck9wZXJhdG9yLmx0O1xuICAgICAgICAgICAgdmwgPSBFeHByLmdldFZhbHVlQW5kTG9jYXRpb24odGV4dC5zdWJzdHIoMSkpO1xuICAgICAgICAgICAgdmwuc3RhcnQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0ZXh0LnN0YXJ0c1dpdGgoXCJ+XCIpKSB7XG4gICAgICAgICAgICBvcGVyYXRvci52YWx1ZSA9IEV4cHJPcGVyYXRvci5yZWdleDtcbiAgICAgICAgICAgIHZsID0gRXhwci5nZXRWYWx1ZUFuZExvY2F0aW9uKHRleHQuc3Vic3RyKDEpKTtcbiAgICAgICAgICAgIHZsLnN0YXJ0ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGV4dC5sZW5ndGggPiAxICYmIHRleHQuc3RhcnRzV2l0aChcIi9cIikgJiYgdGV4dC5lbmRzV2l0aChcIi9cIikpIHtcbiAgICAgICAgICAgIG9wZXJhdG9yLnZhbHVlID0gRXhwck9wZXJhdG9yLnJlZ2V4O1xuICAgICAgICAgICAgdmwudmFsdWUgPSB0ZXh0LnN1YnN0cigxLCB0ZXh0Lmxlbmd0aCAtIDIpO1xuICAgICAgICAgICAgdmwuc3RhcnQgPSAxO1xuICAgICAgICAgICAgdmwubGVuZ3RoID0gdmwudmFsdWUubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ZXh0LnN0YXJ0c1dpdGgoXCJcXFwiXCIpICYmIHRleHQuZW5kc1dpdGgoXCJcXFwiXCIpKSB7XG4gICAgICAgICAgICB2bC52YWx1ZSA9IHRleHQuc3Vic3RyKDEsIHRleHQubGVuZ3RoIC0gMik7XG4gICAgICAgICAgICB2bC5zdGFydCA9IDE7XG4gICAgICAgICAgICB2bC5sZW5ndGggPSB2bC52YWx1ZS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWVzLnZhbHVlID0gW3ZsLnZhbHVlXTtcbiAgICAgICAgbG9jYXRpb25zLnZhbHVlID0gW3tzdGFydDogdmwuc3RhcnQsIGxlbmd0aDogdmwubGVuZ3RofV07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0T3BlcmF0b3JUZXh0KG9wZXJhdG9yOiBFeHByT3BlcmF0b3IpOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgICAgICAgICBjYXNlIEV4cHJPcGVyYXRvci5lcTogcmV0dXJuIFwiPVwiO1xuICAgICAgICAgICAgY2FzZSBFeHByT3BlcmF0b3IuZ3Q6IHJldHVybiBcIj5cIjtcbiAgICAgICAgICAgIGNhc2UgRXhwck9wZXJhdG9yLmd0ZTogcmV0dXJuIFwiPj1cIjtcbiAgICAgICAgICAgIGNhc2UgRXhwck9wZXJhdG9yLmx0OiByZXR1cm4gXCI8XCI7XG4gICAgICAgICAgICBjYXNlIEV4cHJPcGVyYXRvci5sdGU6IHJldHVybiBcIjw9XCI7XG4gICAgICAgICAgICBjYXNlIEV4cHJPcGVyYXRvci5uZXE6IHJldHVybiBcIjw+XCI7XG4gICAgICAgICAgICBjYXNlIEV4cHJPcGVyYXRvci5yZWdleDogcmV0dXJuIFwiUkVHRVhQXCI7XG4gICAgICAgICAgICBjYXNlIEV4cHJPcGVyYXRvci5saWtlOiByZXR1cm4gXCJMSUtFXCI7XG4gICAgICAgICAgICBjYXNlIEV4cHJPcGVyYXRvci5jb250YWluczogcmV0dXJuIFwiQ09OVEFJTlNcIjtcbiAgICAgICAgICAgIGNhc2UgRXhwck9wZXJhdG9yLmluOiByZXR1cm4gXCJJTlwiO1xuICAgICAgICAgICAgY2FzZSBFeHByT3BlcmF0b3IuYmV0d2VlbjogcmV0dXJuIFwiQkVUV0VFTlwiO1xuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwiPVwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZCB0aGUgZmlyc3QgYEV4cHJWYWx1ZUluZm9gIG9iamVjdCBmcm9tIGEgc3RhcnRpbmcgcG9zaXRpb24gaW4gdGhpcyBleHByZXNzaW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RhcnQgVGhlIHBvc2l0aW9uIGF0IHdoaWNoIHRvIHN0YXJ0IHRoZSBzZWFyY2hcbiAgICAgKi9cbiAgICBmaW5kVmFsdWUoc3RhcnQ6IG51bWJlcik6IEV4cHJWYWx1ZUluZm8gfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy5pc0xlYWYpIHtcbiAgICAgICAgICAgIGlmIChzdGFydCA+PSB0aGlzLnN0YXJ0ICYmIHN0YXJ0IDw9IHRoaXMuc3RhcnQgKyB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1N0cnVjdHVyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUhLFxuICAgICAgICAgICAgICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lICovXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogdGhpcy5maWVsZCEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogdGhpcy5zdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aDogdGhpcy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoISF0aGlzLmxvY2F0aW9ucyAmJiB0aGlzLnZhbHVlcyAmJiB0aGlzLnZhbHVlcy5sZW5ndGggPT09IHRoaXMubG9jYXRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaWMgPSB0aGlzLnZhbHVlcy5sZW5ndGg7IGkgPCBpYzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmxvY2F0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFydCA+PSB0aGlzLnN0YXJ0ICsgbG9jYXRpb24uc3RhcnQgJiYgc3RhcnQgPD0gdGhpcy5zdGFydCArIGxvY2F0aW9uLnN0YXJ0ICsgbG9jYXRpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogdGhpcy5maWVsZCEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiB0aGlzLnN0YXJ0ICsgbG9jYXRpb24uc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aDogbG9jYXRpb24ubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghIXRoaXMub3BlcmFuZHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZXhwciBvZiB0aGlzLm9wZXJhbmRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBleHByLmZpbmRWYWx1ZShzdGFydCk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21iaW5lIHR3byBleHByZXNzaW9ucyBpbnRvIGEgc2luZ2xlIGV4cHJlc3Npb24uIFRoZSBzZWNvbmQgZXhwcmVzc2lvbiB3aWxsIGJlIGFkZGVkIHRvXG4gICAgICogdGhlIGZpcnN0IGV4cHJlc3Npb24gYW5kIHRoZSBmaXJzdCBleHByZXNzaW9uIHJldHVybmVkIGlmIHRoZSBmaXJzdCBleHByZXNzaW9uIGlzIG5vbi1sZWFmXG4gICAgICogYW5kIGlzIGFuIGBBTkRgIGV4cHJlc3Npb24gYW5kIG5vdCBuZWdhdGVkLiBPdGhlcndpc2UsIGEgbmV3IGBBTkRgIGV4cHJlc3Npb24gd2lsbCBiZSBjcmVhdGVkXG4gICAgICogdG8gd2hpY2ggYm90aCBleHByZXNzaW9ucyBhcmUgYWRkZWQgYXMgb3BlcmFuZHMuXG4gICAgICovXG4gICAgc3RhdGljIGNvbWJpbmUoZXhwcjE6IEV4cHIsIGV4cHIyOiBFeHByKTogRXhwciB7XG4gICAgICAgIGlmICghZXhwcjEpIHtcbiAgICAgICAgICAgIHJldHVybiBleHByMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWV4cHIyKSB7XG4gICAgICAgICAgICByZXR1cm4gZXhwcjE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFleHByMS5pc0xlYWYgJiYgZXhwcjEuYW5kICYmICFleHByMS5ub3QpIHtcbiAgICAgICAgICAgIGlmIChleHByMS5pc0xlYWYgfHwgIWV4cHIyLmFuZCB8fCBleHByMi5ub3QpIHtcbiAgICAgICAgICAgICAgICBleHByMS5hZGRPcGVyYW5kKGV4cHIyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZXhwcjMgb2YgZXhwcjIub3BlcmFuZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwcjEuYWRkT3BlcmFuZChleHByMyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGV4cHIxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgRXhwcih7XG4gICAgICAgICAgICBleHByQ29udGV4dDogZXhwcjEuZXhwckNvbnRleHQsXG4gICAgICAgICAgICBvcDE6IGV4cHIxLFxuICAgICAgICAgICAgYW5kOiB0cnVlLFxuICAgICAgICAgICAgb3AyOiBleHByMlxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG5vcm1hbGl6ZUZpZWxkKGZpZWxkOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoZmllbGQgJiYgZmllbGRbMF0gPT09IEV4cHJQYXJzZXIuZmllbGRQYXJ0bmFtZVByZWZpeCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpZWxkLnN1YnN0cigxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmllbGQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG91bGREaXNwbGF5RmllbGQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghdGhpcy5maWVsZCAmJiAhdGhpcy5wYXJlbnQpIHsgLy8gdG9wIGxldmVsIGZ1bGwgdGV4dFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICEhdGhpcy5maWVsZCAmJiAoIXRoaXMucGFyZW50IHx8ICFVdGlscy5lcU5DKHRoaXMuZmllbGQsIHRoaXMucGFyZW50LmZpZWxkIHx8IFwiXCIpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE9wZXJhdG9yU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLm9wZXJhdG9yID09PSBFeHByT3BlcmF0b3Iubm9uZSB8fCB0aGlzLm9wZXJhdG9yID09PSBFeHByT3BlcmF0b3IuZXEpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBFeHByLmdldE9wZXJhdG9yVGV4dCh0aGlzLm9wZXJhdG9yKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVzY2FwZVZhbHVlKHZhbHVlOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCEhdmFsdWUgJiYgISF0aGlzLmNvbHVtbiAmJiAoQXBwU2VydmljZUhlbHBlcnMuaXNTdHJpbmcodGhpcy5jb2x1bW4pIHx8IEFwcFNlcnZpY2VIZWxwZXJzLmlzQ3N2KHRoaXMuY29sdW1uKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBFeHByUGFyc2VyLmVzY2FwZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlIHx8IFwiXCI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRWYWx1ZVN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5vcGVyYXRvciA9PT0gRXhwck9wZXJhdG9yLmJldHdlZW4gJiYgdGhpcy52YWx1ZXMgJiYgdGhpcy52YWx1ZXMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gYFske3RoaXMuZXNjYXBlVmFsdWUodGhpcy52YWx1ZXNbMF0pfS4uJHt0aGlzLmVzY2FwZVZhbHVlKHRoaXMudmFsdWVzWzFdKX1dYDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy52YWx1ZXMgJiYgdGhpcy52YWx1ZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgY29uc3Qgc2I6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHRoaXMudmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNiLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2IucHVzaChcIiwgXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzYi5wdXNoKHRoaXMuZXNjYXBlVmFsdWUodmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNiLnVuc2hpZnQoXCJbXCIpO1xuICAgICAgICAgICAgc2IucHVzaChcIl1cIik7XG4gICAgICAgICAgICByZXR1cm4gc2Iuam9pbihcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5lc2NhcGVWYWx1ZSh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZEZpZWxkVG9TdHJpbmcoc2I6IHN0cmluZ1tdKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBhZGRlZCA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5zaG91bGREaXNwbGF5RmllbGQoKSkge1xuICAgICAgICAgICAgc2IucHVzaCh0aGlzLm5vcm1hbGl6ZUZpZWxkKHRoaXMuZmllbGQpIHx8IFwidGV4dFwiKTtcbiAgICAgICAgICAgIGFkZGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kaXNwbGF5KSB7XG4gICAgICAgICAgICBzYi5wdXNoKEV4cHJQYXJzZXIuZXNjYXBlKHRoaXMuZGlzcGxheSkpO1xuICAgICAgICAgICAgYWRkZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhZGRlZCkge1xuICAgICAgICAgICAgc2IucHVzaChcIjpcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFkZGVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RvU3RyaW5nKHdpdGhGaWVsZHM6IGJvb2xlYW4sIGlubmVyOiBib29sZWFuKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3Qgc2I6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGlmICh0aGlzLmlzTGVhZikge1xuICAgICAgICAgICAgaWYgKHRoaXMubm90KSB7XG4gICAgICAgICAgICAgICAgc2IucHVzaChcIk5PVCBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAod2l0aEZpZWxkcykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRmllbGRUb1N0cmluZyhzYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzYi5wdXNoKHRoaXMuZ2V0T3BlcmF0b3JTdHJpbmcoKSk7XG4gICAgICAgICAgICBzYi5wdXNoKHRoaXMuZ2V0VmFsdWVTdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMub3BlcmFuZHMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm5vdCkge1xuICAgICAgICAgICAgICAgIHNiLnB1c2goXCJOT1QgXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGJyYWNrZXRlZCA9IGlubmVyO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWRkRmllbGRUb1N0cmluZyhzYikpIHtcbiAgICAgICAgICAgICAgICBicmFja2V0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJyYWNrZXRlZCkge1xuICAgICAgICAgICAgICAgIHNiLnB1c2goXCIoXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3BlcmFuZCBvZiB0aGlzLm9wZXJhbmRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFmaXJzdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLnB1c2goXCIgQU5EIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLnB1c2goXCIgT1IgXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2IucHVzaChvcGVyYW5kLl90b1N0cmluZyh3aXRoRmllbGRzLCB0cnVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYnJhY2tldGVkKSB7XG4gICAgICAgICAgICAgICAgc2IucHVzaChcIilcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNiLmpvaW4oXCJcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgZXhwcmVzc2lvblxuICAgICAqXG4gICAgICogQHBhcmFtIHdpdGhGaWVsZHMgSWYgYHRydWVgLCBpbmNsdWRlIGZpZWxkIG5hbWVzXG4gICAgICovXG4gICAgdG9TdHJpbmcod2l0aEZpZWxkcyA9IHRydWUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG9TdHJpbmcod2l0aEZpZWxkcywgZmFsc2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkRGlzcGxheShvcHRpb25zOiBFeHByTWVzc2FnZU9wdGlvbnMsIGN0eHQ6IEV4cHJNZXNzYWdlQ3R4dCwgZGlzcGxheTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2FkZFZhbHVlKG9wdGlvbnMsIGN0eHQsIHRoaXMudmFsdWUgfHwgXCJcIiwgZGlzcGxheSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbmNvZGVIVE1MKHRleHQ6IHN0cmluZywgb3B0aW9uczogRXhwck1lc3NhZ2VPcHRpb25zKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5hc0hUTUwpIHtcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5lbmNvZGVIVE1MKHRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9hZGRWYWx1ZShvcHRpb25zOiBFeHByTWVzc2FnZU9wdGlvbnMsIGN0eHQ6IEV4cHJNZXNzYWdlQ3R4dCwgdmFsdWU6IHN0cmluZywgZGlzcGxheT86IHN0cmluZykge1xuICAgICAgICBpZiAob3B0aW9ucy5hc0hUTUwpIHtcbiAgICAgICAgICAgIGN0eHQubWVzc2FnZS5wdXNoKGA8c3BhbiBjbGFzcz1cInNxLXZhbHVlXCI+YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5leHByQ29udGV4dC5hcHBTZXJ2aWNlLmdldENvbHVtbih0aGlzLmZpZWxkKTtcbiAgICAgICAgY29uc3QgdmFsdWVJZCA9IGB2YWx1ZSR7Y3R4dC52YWx1ZUluZGV4Kyt9YDtcbiAgICAgICAgbGV0IF92YWx1ZTogRmllbGRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBsZXQgX2Rpc3BsYXk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKGRpc3BsYXkpIHtcbiAgICAgICAgICAgIF9kaXNwbGF5ID0gdGhpcy5lbmNvZGVIVE1MKEV4cHJQYXJzZXIudW5lc2NhcGUoZGlzcGxheSksIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2x1bW4gJiYgQXBwU2VydmljZUhlbHBlcnMuaXNOdW1iZXIoY29sdW1uKSAmJiBVdGlscy50ZXN0RmxvYXQodmFsdWUpKSB7XG4gICAgICAgICAgICBfdmFsdWUgPSArdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29sdW1uICYmIEFwcFNlcnZpY2VIZWxwZXJzLmlzRGF0ZShjb2x1bW4pKSB7XG4gICAgICAgICAgICBfdmFsdWUgPSBVdGlscy5mcm9tU3lzRGF0ZVN0cih2YWx1ZSkgfHwgdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29sdW1uICYmIEFwcFNlcnZpY2VIZWxwZXJzLmlzQm9vbGVhbihjb2x1bW4pKSB7XG4gICAgICAgICAgICBfdmFsdWUgPSBVdGlscy5pc1RydWUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFV0aWxzLmlzU3RyaW5nKF92YWx1ZSkpIHtcbiAgICAgICAgICAgIF92YWx1ZSA9IHRoaXMuZW5jb2RlSFRNTChfdmFsdWUsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGN0eHQubWVzc2FnZS5wdXNoKGB7JHt2YWx1ZUlkfX1gKTtcbiAgICAgICAgY3R4dC52YWx1ZXNbdmFsdWVJZF0gPSBjb2x1bW5cbiAgICAgICAgICAgID8gdGhpcy5leHByQ29udGV4dC5mb3JtYXRTZXJ2aWNlLmZvcm1hdEZpZWxkVmFsdWUoe3ZhbHVlOiBfdmFsdWUsIGRpc3BsYXk6IF9kaXNwbGF5fSwgY29sdW1uKVxuICAgICAgICAgICAgOiBfZGlzcGxheSB8fCBfdmFsdWU7XG4gICAgICAgIGlmIChvcHRpb25zLmFzSFRNTCkge1xuICAgICAgICAgICAgY3R4dC5tZXNzYWdlLnB1c2goYDwvc3Bhbj5gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkVmFsdWUob3B0aW9uczogRXhwck1lc3NhZ2VPcHRpb25zLCBjdHh0OiBFeHByTWVzc2FnZUN0eHQpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcGVyYXRvciA9PT0gRXhwck9wZXJhdG9yLmJldHdlZW4gJiYgdGhpcy52YWx1ZXMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkVmFsdWUob3B0aW9ucywgY3R4dCwgdGhpcy52YWx1ZXNbMF0pO1xuICAgICAgICAgICAgICAgIGN0eHQubWVzc2FnZS5wdXNoKFwiIFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZE9wZXJhdG9yKFwiQU5EXCIsIG9wdGlvbnMsIGN0eHQpO1xuICAgICAgICAgICAgICAgIGN0eHQubWVzc2FnZS5wdXNoKFwiIFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRWYWx1ZShvcHRpb25zLCBjdHh0LCB0aGlzLnZhbHVlc1sxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnZhbHVlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHRoaXMudmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eHQubWVzc2FnZS5wdXNoKGZpcnN0ID8gXCJbXCIgOiBcIiwgXCIpO1xuICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRWYWx1ZShvcHRpb25zLCBjdHh0LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN0eHQubWVzc2FnZS5wdXNoKFwiXVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZFZhbHVlKG9wdGlvbnMsIGN0eHQsIHRoaXMudmFsdWVzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkVGV4dChvcHRpb25zOiBFeHByTWVzc2FnZU9wdGlvbnMsIGN0eHQ6IEV4cHJNZXNzYWdlQ3R4dCwgdGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlSWQgPSBgdmFsdWUke2N0eHQudmFsdWVJbmRleCsrfWA7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgeyR7dmFsdWVJZH19YDtcbiAgICAgICAgY3R4dC5tZXNzYWdlLnB1c2gobWVzc2FnZSk7XG4gICAgICAgIGN0eHQudmFsdWVzW3ZhbHVlSWRdID0gdGhpcy5lbmNvZGVIVE1MKHRleHQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkRmllbGRMYWJlbChvcHRpb25zOiBFeHByTWVzc2FnZU9wdGlvbnMsIGN0eHQ6IEV4cHJNZXNzYWdlQ3R4dCkge1xuICAgICAgICBjb25zdCBkaXNwbGF5T2JqID0gdGhpcy5kaXNwbGF5T2JqO1xuICAgICAgICBpZiAoZGlzcGxheU9iaiAmJiBkaXNwbGF5T2JqLmxhYmVsKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFRleHQob3B0aW9ucywgY3R4dCwgZGlzcGxheU9iai5sYWJlbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5maWVsZCkge1xuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmV4cHJDb250ZXh0LmFwcFNlcnZpY2UuZ2V0TGFiZWwodGhpcy5ub3JtYWxpemVGaWVsZCh0aGlzLmZpZWxkKSB8fCBcIlwiKTtcbiAgICAgICAgICAgIHRoaXMuYWRkVGV4dChvcHRpb25zLCBjdHh0LCBsYWJlbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNTdHJ1Y3R1cmVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmV4cHJDb250ZXh0LmFwcFNlcnZpY2UuZ2V0TGFiZWwoXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkVGV4dChvcHRpb25zLCBjdHh0LCBsYWJlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWVsZHMgPSB0aGlzLmdldEZpZWxkcygpO1xuICAgICAgICAgICAgICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFRleHQob3B0aW9ucywgY3R4dCwgXCIvXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5leHByQ29udGV4dC5hcHBTZXJ2aWNlLmdldExhYmVsKGZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRUZXh0KG9wdGlvbnMsIGN0eHQsIGxhYmVsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkRmllbGQob3B0aW9uczogRXhwck1lc3NhZ2VPcHRpb25zLCBjdHh0OiBFeHByTWVzc2FnZUN0eHQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuYXNIVE1MKSB7XG4gICAgICAgICAgICBjdHh0Lm1lc3NhZ2UucHVzaChgPHNwYW4gY2xhc3M9XCJzcS1maWVsZFwiPmApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkRmllbGRMYWJlbChvcHRpb25zLCBjdHh0KTtcbiAgICAgICAgaWYgKG9wdGlvbnMuYXNIVE1MKSB7XG4gICAgICAgICAgICBjdHh0Lm1lc3NhZ2UucHVzaChgPC9zcGFuPmApO1xuICAgICAgICAgICAgY3R4dC5tZXNzYWdlLnB1c2goYDxzcGFuIGNsYXNzPVwic3Etc2VwYXJhdG9yXCI+YCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRUZXh0KG9wdGlvbnMsIGN0eHQsIFwibXNnI3N5c3RlbS5maWVsZFNlcGFyYXRvclwiKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuYXNIVE1MKSB7XG4gICAgICAgICAgICBjdHh0Lm1lc3NhZ2UucHVzaChgPC9zcGFuPmApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRPcGVyYXRvcihvcGVyYXRvcjogc3RyaW5nLCBvcHRpb25zOiBFeHByTWVzc2FnZU9wdGlvbnMsIGN0eHQ6IEV4cHJNZXNzYWdlQ3R4dCkge1xuICAgICAgICBpZiAoIW9wZXJhdG9yKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuYXNIVE1MKSB7XG4gICAgICAgICAgICBjdHh0Lm1lc3NhZ2UucHVzaChgPHNwYW4gY2xhc3M9XCJzcS1vcGVyYXRvclwiPmApO1xuICAgICAgICB9XG4gICAgICAgIGN0eHQubWVzc2FnZS5wdXNoKHRoaXMuZW5jb2RlSFRNTChvcGVyYXRvciwgb3B0aW9ucykpO1xuICAgICAgICBpZiAob3B0aW9ucy5hc0hUTUwpIHtcbiAgICAgICAgICAgIGN0eHQubWVzc2FnZS5wdXNoKGA8L3NwYW4+YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF90b01lc3NhZ2UoY3R4dDogRXhwck1lc3NhZ2VDdHh0LCBvcHRpb25zPzogRXhwck1lc3NhZ2VPcHRpb25zKTogRXhwck1lc3NhZ2Uge1xuICAgICAgICBjb25zdCBpbm5lciA9IGN0eHQuaW5uZXI7XG4gICAgICAgIGN0eHQuaW5uZXIgPSB0cnVlO1xuICAgICAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVXRpbHMuaXNVbmRlZmluZWQob3B0aW9ucy51c2VEaXNwbGF5KSkge1xuICAgICAgICAgICAgb3B0aW9ucy51c2VEaXNwbGF5ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRpc3BsYXlPYmogPSB0aGlzLmRpc3BsYXlPYmo7XG4gICAgICAgIGNvbnN0IGRpc3BsYXkgPSAoZGlzcGxheU9iaiA/IGRpc3BsYXlPYmouZGlzcGxheSA6IHVuZGVmaW5lZCkgfHwgdGhpcy5kaXNwbGF5O1xuICAgICAgICBjb25zdCBzaG93Tm90ID0gdGhpcy5ub3QgJiYgKGlubmVyIHx8ICFvcHRpb25zLmhpZGVPdXRlck5vdCk7XG4gICAgICAgIGNvbnN0IHNob3dGaWVsZCA9IChvcHRpb25zLndpdGhGaWVsZHMgfHwgaW5uZXIpICYmIHRoaXMuc2hvdWxkRGlzcGxheUZpZWxkKCk7XG4gICAgICAgIGlmIChvcHRpb25zLnVzZURpc3BsYXkgJiYgISFkaXNwbGF5KSB7XG4gICAgICAgICAgICBpZiAoc2hvd05vdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkT3BlcmF0b3IoXCJOT1RcIiwgb3B0aW9ucywgY3R4dCk7XG4gICAgICAgICAgICAgICAgY3R4dC5tZXNzYWdlLnB1c2goXCIgXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNob3dGaWVsZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRmllbGQob3B0aW9ucywgY3R4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFkZERpc3BsYXkob3B0aW9ucywgY3R4dCwgZGlzcGxheSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc0xlYWYpIHtcbiAgICAgICAgICAgIGlmIChzaG93Tm90KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRPcGVyYXRvcihcIk5PVFwiLCBvcHRpb25zLCBjdHh0KTtcbiAgICAgICAgICAgICAgICBjdHh0Lm1lc3NhZ2UucHVzaChcIiBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2hvd0ZpZWxkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRGaWVsZChvcHRpb25zLCBjdHh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG9wZXJhdG9yID0gdGhpcy5nZXRPcGVyYXRvclN0cmluZygpO1xuICAgICAgICAgICAgaWYgKG9wZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRPcGVyYXRvcihvcGVyYXRvciwgb3B0aW9ucywgY3R4dCk7XG4gICAgICAgICAgICAgICAgY3R4dC5tZXNzYWdlLnB1c2goXCIgXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hZGRWYWx1ZShvcHRpb25zLCBjdHh0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5vcGVyYW5kcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7bWVzc2FnZTogXCJcIn07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2hvd05vdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkT3BlcmF0b3IoXCJOT1RcIiwgb3B0aW9ucywgY3R4dCk7XG4gICAgICAgICAgICAgICAgY3R4dC5tZXNzYWdlLnB1c2goXCIgXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGJyYWNrZXRlZCA9IGlubmVyO1xuICAgICAgICAgICAgaWYgKHNob3dGaWVsZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRmllbGQob3B0aW9ucywgY3R4dCk7XG4gICAgICAgICAgICAgICAgYnJhY2tldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChicmFja2V0ZWQpIHtcbiAgICAgICAgICAgICAgICBjdHh0Lm1lc3NhZ2UucHVzaChcIihcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZmlyc3QgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcGVyYW5kIG9mIHRoaXMub3BlcmFuZHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWZpcnN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4dC5tZXNzYWdlLnB1c2goXCIgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRPcGVyYXRvcihcIkFORFwiLCBvcHRpb25zLCBjdHh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eHQubWVzc2FnZS5wdXNoKFwiIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eHQubWVzc2FnZS5wdXNoKFwiIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkT3BlcmF0b3IoXCJPUlwiLCBvcHRpb25zLCBjdHh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eHQubWVzc2FnZS5wdXNoKFwiIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG9wZXJhbmQuX3RvTWVzc2FnZShjdHh0LCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChicmFja2V0ZWQpIHtcbiAgICAgICAgICAgICAgICBjdHh0Lm1lc3NhZ2UucHVzaChcIilcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlubmVyKSB7XG4gICAgICAgICAgICByZXR1cm4ge21lc3NhZ2U6IFwiXCJ9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtZXNzYWdlOiBjdHh0Lm1lc3NhZ2Uuam9pbihcIlwiKSxcbiAgICAgICAgICAgIHZhbHVlczogY3R4dC52YWx1ZXNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYW4gYEV4cHJNZXNzYWdlYCBmb3IgdGhlIGV4cHJlc3Npb24gd2hpY2ggY2FuIGJlIHVzZWQgd2l0aCBbSW50bFNlcnZpY2UuZm9ybWF0TWVzc2FnZV17QGxpbmsgSW50bFNlcnZpY2UjZm9ybWF0TWVzc2FnZX1cbiAgICAgKiBmb3IgZGlzcGxheSBwdXJwb3Nlc1xuICAgICAqL1xuICAgIHRvTWVzc2FnZShvcHRpb25zPzogRXhwck1lc3NhZ2VPcHRpb25zKTogRXhwck1lc3NhZ2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG9NZXNzYWdlKHtcbiAgICAgICAgICAgIGlubmVyOiBmYWxzZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFtcInR4dCNcIl0sXG4gICAgICAgICAgICB2YWx1ZXM6IHt9LFxuICAgICAgICAgICAgdmFsdWVJbmRleDogMFxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBtYXRjaE5vZGUoY29udGV4dDogRXhwckNvbnRleHQsIGV4cHIxOiBFeHByLCBleHByMjogRXhwcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoZXhwcjEuaXNMZWFmICE9PSBleHByMi5pc0xlYWYpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXhwcjEuaXNMZWFmKSB7XG4gICAgICAgICAgICBpZiAoZXhwcjEuaXNTdHJ1Y3R1cmVkICE9PSBleHByMi5pc1N0cnVjdHVyZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXhwcjEubm90ICE9PSBleHByMi5ub3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBmaWVsZDEgPSBjb250ZXh0LmFwcFNlcnZpY2UucmVzb2x2ZUNvbHVtbkFsaWFzKGV4cHIxLmZpZWxkKTtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkMiA9IGNvbnRleHQuYXBwU2VydmljZS5yZXNvbHZlQ29sdW1uQWxpYXMoZXhwcjIuZmllbGQpO1xuICAgICAgICAgICAgaWYgKGZpZWxkMSAhPT0gZmllbGQyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgb3BlcmF0b3IxID0gZXhwcjEub3BlcmF0b3IgPT09IEV4cHJPcGVyYXRvci5ub25lID8gRXhwck9wZXJhdG9yLmVxIDogZXhwcjEub3BlcmF0b3I7XG4gICAgICAgICAgICBjb25zdCBvcGVyYXRvcjIgPSBleHByMi5vcGVyYXRvciA9PT0gRXhwck9wZXJhdG9yLm5vbmUgPyBFeHByT3BlcmF0b3IuZXEgOiBleHByMi5vcGVyYXRvcjtcbiAgICAgICAgICAgIGlmIChvcGVyYXRvcjEgIT09IG9wZXJhdG9yMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWV4cHIxLmlzTGVhZikge1xuICAgICAgICAgICAgaWYgKGV4cHIxLmFuZCAhPT0gZXhwcjIuYW5kKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQWxsIG9mIHRoZSBzdHJ1Y3R1cmVkIGFuZCBub24tc3RydWN0dXJlZCBvcGVyYW5kcyBpbiBleHByMiBtdXN0IGJlIGluIGV4cHIxIHNvIGNoZWNrIHRoYXQgdGhlcmUgYXJlIGF0IGxlYXN0IGVub3VnaFxuICAgICAgICAgICAgLy8gb3BlcmFuZHMgYXZhaWxhYmxlLiAoVGhlIGFjdHVhbCBtYXRjaGluZyBvZiB0aGUgY29udGVudHMgb2YgdGhlIG9wZXJhbmQgbm9kZXMgaXMgZG9uZSBpbiB0aGUgcmVjdXJzaXZlIGNhbGxzIHRvIE1hdGNoTm9kZSlcbiAgICAgICAgICAgIGlmICghZXhwcjEub3BlcmFuZHMgIT09ICFleHByMi5vcGVyYW5kcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBleHByMVN0cnVjdHVyZWRDb3VudCA9IDAsIGV4cHIxVW5zdHJ1Y3R1cmVkQ291bnQgPSAwLCBleHByMlN0cnVjdHVyZWRDb3VudCA9IDAsIGV4cHIyVW5zdHJ1Y3R1cmVkQ291bnQgPSAwO1xuICAgICAgICAgICAgZXhwcjEub3BlcmFuZHMuZm9yRWFjaCgob3BlcmFuZCkgPT4geyBpZiAob3BlcmFuZC5pc1N0cnVjdHVyZWQpIHsgZXhwcjFTdHJ1Y3R1cmVkQ291bnQrKzsgfSBlbHNlIHsgZXhwcjFVbnN0cnVjdHVyZWRDb3VudCsrOyB9fSk7XG4gICAgICAgICAgICBleHByMi5vcGVyYW5kcy5mb3JFYWNoKChvcGVyYW5kKSA9PiB7IGlmIChvcGVyYW5kLmlzU3RydWN0dXJlZCkgeyBleHByMlN0cnVjdHVyZWRDb3VudCsrOyB9IGVsc2UgeyBleHByMlVuc3RydWN0dXJlZENvdW50Kys7IH19KTtcbiAgICAgICAgICAgIGlmICgoZXhwcjJTdHJ1Y3R1cmVkQ291bnQgPiBleHByMVN0cnVjdHVyZWRDb3VudCkgfHwgKGV4cHIyVW5zdHJ1Y3R1cmVkQ291bnQgPiBleHByMVVuc3RydWN0dXJlZENvdW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZXMxTGVuZ3RoID0gZXhwcjEudmFsdWVzID8gZXhwcjEudmFsdWVzLmxlbmd0aCA6IDA7XG4gICAgICAgIGNvbnN0IHZhbHVlczJMZW5ndGggPSBleHByMi52YWx1ZXMgPyBleHByMi52YWx1ZXMubGVuZ3RoIDogMDtcbiAgICAgICAgaWYgKHZhbHVlczFMZW5ndGggIT09IHZhbHVlczJMZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWVzMUxlbmd0aCAmJiBleHByMS52YWx1ZXMgJiYgZXhwcjIudmFsdWVzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlMSBvZiBleHByMS52YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlMiBvZiBleHByMi52YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzLmVxTkModmFsdWUxLCB2YWx1ZTIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgdGhpcyBleHByZXNzaW9uIG1hdGNoZXMgdGhlIHBhc3NlZCBvbmVcbiAgICAgKi9cbiAgICBtYXRjaE5vZGUoZXhwcjogRXhwcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gRXhwci5tYXRjaE5vZGUodGhpcy5leHByQ29udGV4dCwgdGhpcywgZXhwcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbWF0Y2hpbmcgZXhwcmVzc2lvbiBvciBzdWItZXhwcmVzc2lvbiBpbiB0aGlzIGV4cHJlc3Npb24gd2l0aCB0aGUgcGFzc2VkIG9uZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBleHByIFRoZSBleHByZXNzaW9uIHRvIG1hdGNoXG4gICAgICogQHBhcmFtIGZpbHRlciBBbiBvcHRpb24gZmlsdGVyIGZ1bmN0aW9uIGNhbGxlZCBvbiBmaXJzdCBsZXZlbCBjYW5kaWRhdGUgc3ViLWV4cHJlc3Npb25zXG4gICAgICogYmVmb3JlIG1hdGNoaW5nIHdpdGhpbiB0aGVtXG4gICAgICovXG4gICAgZmluZChleHByOiBFeHByLCBmaWx0ZXI/OiAoZXhwcjogRXhwcikgPT4gYm9vbGVhbik6IEV4cHIgfCBudWxsIHtcbiAgICAgICAgaWYgKHRoaXMubWF0Y2hOb2RlKGV4cHIpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNMZWFmICYmIHRoaXMub3BlcmFuZHMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkMSBvZiBleHByLm9wZXJhbmRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkMiBvZiB0aGlzLm9wZXJhbmRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyICYmIGZpbHRlcihjaGlsZDIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQyLmZpbmQoY2hpbGQxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzTGVhZiAmJiB0aGlzLm9wZXJhbmRzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB0aGlzLm9wZXJhbmRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIgJiYgZmlsdGVyKGNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkLmZpbmQoZXhwcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIHRoZSBwYXNzZWQgYGFjdGlvbmAgb24gdGhpcyBleHByZXNzaW9uIGFuZCBhbnkgZGVzY2VuZGFudCBvcGVyYW5kc1xuICAgICAqXG4gICAgICogQHBhcmFtIGFjdGlvbiBUaGUgYWN0aW9uIHRvIHBlcmZvcm1cbiAgICAgKi9cbiAgICBmb3JFYWNoKGFjdGlvbjogKGV4cHI6IEV4cHIpID0+IHZvaWQpIHtcbiAgICAgICAgYWN0aW9uKHRoaXMpO1xuICAgICAgICBpZiAodGhpcy5vcGVyYW5kcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcGVyYW5kIG9mIHRoaXMub3BlcmFuZHMpIHtcbiAgICAgICAgICAgICAgICBvcGVyYW5kLmZvckVhY2goYWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIG9uIHRoaXMgbm9kZSBhbmQgYW55IGRlc2NlbmRhbnRzIHVudGlsIHRoZSBjYWxsYmFjayByZXR1cm5zIGEgdHJ1dGh5IHZhbHVlXG4gICAgICogaW4gd2hpY2ggY2FzZSBpbW1lZGlhdGVseSByZXR1cm4gYHRydWVgLiBPdGhlcndpc2UgcmV0dXJuIGBmYWxzZWAuXG4gICAgICovXG4gICAgc29tZShjYWxsYmFjazogKGV4cHI6IEV4cHIpID0+IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcGVyYW5kcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcGVyYW5kIG9mIHRoaXMub3BlcmFuZHMpIHtcbiAgICAgICAgICAgICAgICBpZiAob3BlcmFuZC5zb21lKGNhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIG9uIHRoaXMgbm9kZSBhbmQgYW55IGRlc2NlbmRhbnRzIHVudGlsIHRoZSBjYWxsYmFjayByZXR1cm5zIGEgZmFsc3kgdmFsdWVcbiAgICAgKiBpbiB3aGljaCBjYXNlLCBpbW1lZGlhdGVseSByZXR1cm4gYGZhbHNlYC4gT3RoZXJ3aXNlIHJldHVybiBgdHJ1ZWAuXG4gICAgICovXG4gICAgZXZlcnkoY2FsbGJhY2s6IChleHByOiBFeHByKSA9PiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghY2FsbGJhY2sodGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcGVyYW5kcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcGVyYW5kIG9mIHRoaXMub3BlcmFuZHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9wZXJhbmQuZXZlcnkoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGB0cnVlYCBpZiB0aGUgZXhvcmVzc2lvbiBoYXMgYXQgbGVhc3Qgb25lIGZ1bGx0ZXh0IG9wZXJhbmQuXG4gICAgICogVGhlIHRlc3Qgb24gYGlzUG9zaXRpdmVgIGZpbHRlcnMgZXhwcmVzc2lvbnMgdGhhdCBvbmx5IGNvbnRhaW5cbiAgICAgKiBuZWdhdGl2ZSBmdWxsdGV4dCB0ZXJtcyB3aGljaCB3aWxsIGJlIGlnbm9yZWQgb24gdGhlIHNlcnZlci4gRnVsbHRleHRcbiAgICAgKiBleHByZXNzaW9ucyBtdXN0IGhhdmUgYXQgbGVhc3Qgb25lIHBvc2l0aXZlIHRlcm0uXG4gICAgICovXG4gICAgZ2V0IGhhc1JlbGV2YW5jZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc29tZShleHByID0+IGV4cHIuaXNMZWFmICYmICFleHByLmlzU3RydWN0dXJlZCAmJiBleHByLmlzUG9zaXRpdmUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbiBhcnJheSBvZiBhbGwgZmllbGRzIHVzZWQgaW4gdGhpcyBleHByZXNzaW9uXG4gICAgICovXG4gICAgZ2V0RmllbGRzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgZmllbGRzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICB0aGlzLmZvckVhY2goKGV4cHIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gdGhpcy5leHByQ29udGV4dC5hcHBTZXJ2aWNlLnJlc29sdmVDb2x1bW5BbGlhcyhleHByLmZpZWxkKTtcbiAgICAgICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgICAgICAgIGlmICghZmllbGRzLmZpbmQoKGZpZWxkMSkgPT4gVXRpbHMuZXFOQyhmaWVsZCwgZmllbGQxKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzLnB1c2goZmllbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmaWVsZHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFuIGFycmF5IG9mIGFsbCB2YWx1ZXMgdXNlZCBpbiB0aGlzIGV4cHJlc3Npb24gdGhhdCBwZXJ0YWluIHRvIHRoZSBwYXNzZWQgZmllbGQgYW5kIHdoZXJlIHRoZSBhc3NvY2lhdGVkIGBpc1Bvc2l0aXZlYFxuICAgICAqIGZpZWxkIG1hdGNoZXMgdGhlIHBhc3NlZCBgcG9zaXRpdmVgIHBhcmFtZXRlclxuICAgICAqXG4gICAgICogQHBhcmFtIGZpZWxkIFRoZSBmaWVsZCBmb3Igd2hpY2ggdmFsdWVzIGFyZSB0byBiZSByZXR1cm5lZFxuICAgICAqIEBwYXJhbSBwb3NpdGl2ZSBUaGUgdmFsdWUgdG8gdGVzdCBhZ2FpbnN0IGBpc1Bvc2l0aXZlYFxuICAgICAqL1xuICAgIGdldFZhbHVlcyhmaWVsZDogc3RyaW5nLCBwb3NpdGl2ZSA9IHRydWUpOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IHZhbHVlczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5leHByQ29udGV4dC5hcHBTZXJ2aWNlLnJlc29sdmVDb2x1bW5OYW1lKGZpZWxkKTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKChleHByKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29sdW1uKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sdW1uMSA9IHRoaXMuZXhwckNvbnRleHQuYXBwU2VydmljZS5yZXNvbHZlQ29sdW1uTmFtZShleHByLmZpZWxkKTtcbiAgICAgICAgICAgICAgICBpZiAoIVV0aWxzLmVxTkMoY29sdW1uLCBjb2x1bW4xKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV4cHIuaXNMZWFmICYmIGV4cHIuaXNQb3NpdGl2ZSA9PT0gcG9zaXRpdmUgJiYgZXhwci52YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaCguLi5leHByLnZhbHVlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGF0YVZhbHVlKGRhdGE6IEV4cHJFdmFsdWF0aW9uQ29udGV4dCwgZmllbGQ/OiBzdHJpbmcsIGRlZmF1bHRTY29wZT86IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWVsZHMgPSBVdGlscy5zcGxpdChmaWVsZCB8fCBcIlwiLCBcIi5cIik7XG4gICAgICAgIGlmIChmaWVsZHMubGVuZ3RoID49IDEgJiYgVXRpbHMuaXNVbmRlZmluZWQoZGF0YVtmaWVsZHNbMF1dKSAmJiAhIWRlZmF1bHRTY29wZSkge1xuICAgICAgICAgICAgLy8gQnkgZGVmYXVsdCwgbG9vayBvbiB0aGUgXCJkZWZhdWx0U2NvcGVcIiBzdWItb2JqZWN0XG4gICAgICAgICAgICBmaWVsZHMudW5zaGlmdCguLi5VdGlscy5zcGxpdChkZWZhdWx0U2NvcGUsIFwiLlwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZhbHVlOiBhbnkgPSBkYXRhO1xuICAgICAgICBmb3IgKGNvbnN0IF9maWVsZCBvZiBmaWVsZHMpIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWVbX2ZpZWxkXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRXaWxkY2FyZFJlZ0V4cCh2YWx1ZTogc3RyaW5nKTogUmVnRXhwIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgcmVnRXhwID0gdGhpcy5ldmFsdWF0aW9uUmVnRXhwc1t2YWx1ZV07XG4gICAgICAgICAgICBpZiAoIVV0aWxzLmlzVW5kZWZpbmVkKHJlZ0V4cCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVnRXhwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGhhdmVXaWxkY2FyZHMgPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBlc2NhcGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3Qgc2I6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNoIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjaCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBIYW5kbGUgd2lsZGNhcmRzIGFuZCB3aWxkY2FyZCBlc2NhcGluZ1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiXFxcXFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVzY2FwaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2IucHVzaChcIlxcXFxcXFxcXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVzY2FwaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlc2NhcGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIipcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlc2NhcGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNiLnB1c2goXCJcXFxcXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNiLnB1c2goY2gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVzY2FwaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXZlV2lsZGNhcmRzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYi5wdXNoKFwiLio/XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCI/XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXNjYXBpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYi5wdXNoKFwiXFxcXFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYi5wdXNoKGNoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlc2NhcGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGF2ZVdpbGRjYXJkcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2IucHVzaChcIi5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy8gRXNjYXBlIG90aGVyIHJlZ2V4cCBzcGVjaWFsIGNoYXJhY3RlcnNcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIi1cIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIi9cIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIl5cIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIiRcIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIitcIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIi5cIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIihcIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIilcIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInxcIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIltcIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIl1cIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIntcIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIn1cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLnB1c2goXCJcXFxcXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2IucHVzaChjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlc2NhcGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFsbCBvdGhlciBjaGFyYWN0ZXJzIGp1c3QgZW1pdFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgc2IucHVzaChjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlc2NhcGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhdmVXaWxkY2FyZHMpIHtcbiAgICAgICAgICAgICAgICByZWdFeHAgPSBuZXcgUmVnRXhwKFwiXlwiICsgc2Iuam9pbihcIlwiKSArIFwiJFwiLCBcImlcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmFsdWF0aW9uUmVnRXhwc1t2YWx1ZV0gPSByZWdFeHA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlZ0V4cDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZhbHVhdGlvblJlZ0V4cHNbdmFsdWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLy8gTkIgY29tcGFyaXNvbnMgd2l0aCBOYU4gYWx3YXlzIHJldHVybiBmYWxzZVxuICAgIHByaXZhdGUgY29tcGFyZSh2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10gfCB1bmRlZmluZWQsIGRhdGFWYWx1ZTogYW55LCBlcXVhbGl0eT86IGJvb2xlYW4pOiBudW1iZXIge1xuICAgICAgICBpZiAoVXRpbHMuaXNBcnJheShkYXRhVmFsdWUpICYmIGRhdGFWYWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29sdW1uID0gRXhwci5nZXRDb2x1bW4odGhpcy5leHByQ29udGV4dCwgdGhpcy5maWVsZCB8fCBcIlwiKTtcbiAgICAgICAgaWYgKFV0aWxzLmlzQXJyYXkoZGF0YVZhbHVlKSB8fCBVdGlscy5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgLy8gXCJpblwiIC8gXCJjb250YWluc1wiXG4gICAgICAgICAgICBpZiAoIVV0aWxzLmlzQXJyYXkoZGF0YVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGRhdGFWYWx1ZSA9IFtkYXRhVmFsdWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFV0aWxzLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gW3ZhbHVlICsgXCJcIl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBdCBsZWFzdCBvbmUgdmFsdWUgaW4gdGhlIHZhbHVlIGFycmF5IG11c3QgbWF0Y2ggYSB2YWx1ZSBpbiB0aGUgZGF0YVZhbHVlIGFycmF5XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlMSBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZGF0YVZhbHVlMSBvZiBkYXRhVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29tcGFyZSh2YWx1ZTEsIGRhdGFWYWx1ZTEsIHRydWUpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFVdGlscy5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBFeHByUGFyc2VyLnVuZXNjYXBlKHZhbHVlIHx8IFwiXCIpO1xuICAgICAgICAgICAgaWYgKGNvbHVtbiAmJiBjb2x1bW4ucGFyc2VyKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmV4cHJDb250ZXh0LmZvcm1hdFNlcnZpY2UucGFyc2VWYWx1ZSh2YWx1ZSwgY29sdW1uLnBhcnNlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoQXBwU2VydmljZUhlbHBlcnMuaXNOdW1iZXIoY29sdW1uKSkge1xuICAgICAgICAgICAgICAgIGlmICghVXRpbHMuaXNOdW1iZXIoZGF0YVZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBfdmFsdWUgPSBVdGlscy50b051bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFWYWx1ZSAtIF92YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChBcHBTZXJ2aWNlSGVscGVycy5pc0RhdGUoY29sdW1uKSkge1xuICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc1N0cmluZyhkYXRhVmFsdWUpKXtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVZhbHVlID0gVXRpbHMudG9EYXRlKGRhdGFWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc0RhdGUoZGF0YVZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBfdmFsdWUgPSB0aGlzLmV4cHJDb250ZXh0LmludGxTZXJ2aWNlLnBhcnNlRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhVmFsdWUuZ2V0VGltZSgpIC0gX3ZhbHVlLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKEFwcFNlcnZpY2VIZWxwZXJzLmlzQm9vbGVhbihjb2x1bW4pKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgX3ZhbHVlID0gVXRpbHMuaXNUcnVlKHZhbHVlKSA/IDEgOiAwO1xuICAgICAgICAgICAgICAgIHJldHVybiAoZGF0YVZhbHVlID8gMSA6IDApIC0gX3ZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0YVZhbHVlID0gZGF0YVZhbHVlIHx8IFwiXCI7XG4gICAgICAgICAgICBpZiAoVXRpbHMuaXNTdHJpbmcoZGF0YVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGRhdGFWYWx1ZSA9IEV4cHJQYXJzZXIudW5lc2NhcGUoZGF0YVZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoZXF1YWxpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnRXhwID0gdGhpcy5nZXRXaWxkY2FyZFJlZ0V4cCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWdFeHApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWdFeHAudGVzdChkYXRhVmFsdWUpID8gMCA6IC0xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5jb21wYXJlKGRhdGFWYWx1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBOYU47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXZhbHVhdGUgdGhpcyBleHByZXNzaW9uIHVzaW5nIGBkYXRhYCB0byBwcm92aWRlIGZpZWxkIHZhbHVlcy4gRmllbGQgdmFsdWVzXG4gICAgICogY2FuIGNvbnRhaW4gc2NvcGVzIChmdWxsIHN0b3Agc2VwYXJhdGVkIGNvbXBvbmVudHMpIHRvIHJlZmVyZW5jZSBzdWItb2JqZWN0c1xuICAgICAqIGluIHRoZSBkYXRhXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YSBUaGUgZmllbGQgdmFsdWVzIHRvIGJlIHVzZWQgaW4gdGhlIGV2YWx1YXRpb25cbiAgICAgKiBAcGFyYW0gZGVmYXVsdFNjb3BlIElmIGEgZmllbGQgdmFsdWUgY2Fubm90IGJlIHJlc29sdmVkIHRoZW4gdHJ5IHRvIHJldHJpZXZlIGEgdmFsdWUgd2l0aCB0aGlzIHNjb3BlIHByZXBlbmRlZCB0byB0aGUgZmllbGQgbmFtZVxuICAgICAqIEByZXR1cm4gVGhlIGJvb2xlYW4gcmVzdWx0IG9mIHRoZSBleHByZXNzaW9uIGV2YWx1YXRpb25cbiAgICAgKi9cbiAgICBldmFsdWF0ZShkYXRhOiBFeHByRXZhbHVhdGlvbkNvbnRleHQsIGRlZmF1bHRTY29wZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgcmV0OiBib29sZWFuO1xuICAgICAgICBpZiAodGhpcy5pc0xlYWYpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1N0cnVjdHVyZWQpIHtcbiAgICAgICAgICAgICAgICByZXQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChVdGlscy5lcU5DKHRoaXMuZmllbGQgfHwgXCJcIiwgXCJleGlzdHNcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YVZhbHVlID0gdGhpcy5nZXREYXRhVmFsdWUoZGF0YSwgdGhpcy52YWx1ZSwgZGVmYXVsdFNjb3BlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gIVV0aWxzLmlzVW5kZWZpbmVkKGRhdGFWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKFV0aWxzLmVxTkModGhpcy5maWVsZCB8fCBcIlwiLCBcIm1pc3NpbmdcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YVZhbHVlID0gdGhpcy5nZXREYXRhVmFsdWUoZGF0YSwgdGhpcy52YWx1ZSwgZGVmYXVsdFNjb3BlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gVXRpbHMuaXNVbmRlZmluZWQoZGF0YVZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFWYWx1ZSA9IHRoaXMuZ2V0RGF0YVZhbHVlKGRhdGEsIHRoaXMuZmllbGQsIGRlZmF1bHRTY29wZSk7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5vcGVyYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBFeHByT3BlcmF0b3Iubm9uZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgRXhwck9wZXJhdG9yLmVxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9IHRoaXMuY29tcGFyZSh0aGlzLnZhbHVlLCBkYXRhVmFsdWUsIHRydWUpID09PSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBFeHByT3BlcmF0b3IuZ3Q6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gdGhpcy5jb21wYXJlKHRoaXMudmFsdWUsIGRhdGFWYWx1ZSkgPiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBFeHByT3BlcmF0b3IuZ3RlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9IHRoaXMuY29tcGFyZSh0aGlzLnZhbHVlLCBkYXRhVmFsdWUpID49IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEV4cHJPcGVyYXRvci5sdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQgPSB0aGlzLmNvbXBhcmUodGhpcy52YWx1ZSwgZGF0YVZhbHVlKSA8IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEV4cHJPcGVyYXRvci5sdGU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gdGhpcy5jb21wYXJlKHRoaXMudmFsdWUsIGRhdGFWYWx1ZSkgPD0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgRXhwck9wZXJhdG9yLm5lcTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQgPSB0aGlzLmNvbXBhcmUodGhpcy52YWx1ZSwgZGF0YVZhbHVlLCB0cnVlKSAhPT0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgRXhwck9wZXJhdG9yLnJlZ2V4OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnRXhwID0gbmV3IFJlZ0V4cCh0aGlzLnZhbHVlIHx8IFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9IHJlZ0V4cC50ZXN0KGRhdGFWYWx1ZSArIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBFeHByT3BlcmF0b3IubGlrZTogLy8gbm90IGN1cnJlbnRseSBnZW5lcmF0ZWQgaW4gcGFyc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQgPSB0aGlzLmNvbXBhcmUodGhpcy52YWx1ZSArIFwiKlwiLCBkYXRhVmFsdWUsIHRydWUpID09PSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBFeHByT3BlcmF0b3IuaW46XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gdGhpcy5jb21wYXJlKHRoaXMudmFsdWVzLCBkYXRhVmFsdWUsIHRydWUpID09PSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBFeHByT3BlcmF0b3IuY29udGFpbnM6IC8vIG5vdCBjdXJyZW50bHkgZ2VuZXJhdGVkIGluIHBhcnNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gdGhpcy5jb21wYXJlKHRoaXMudmFsdWUsIGRhdGFWYWx1ZSwgdHJ1ZSkgPT09IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEV4cHJPcGVyYXRvci5iZXR3ZWVuOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9ICEhdGhpcy52YWx1ZXMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wYXJlKHRoaXMudmFsdWVzWzBdLCBkYXRhVmFsdWUpID49IDAgJiYgdGhpcy5jb21wYXJlKHRoaXMudmFsdWVzWzFdLCBkYXRhVmFsdWUpIDw9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXQgPSAhIXRoaXMuYW5kO1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcGVyYW5kIG9mIHRoaXMub3BlcmFuZHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXQxID0gb3BlcmFuZC5ldmFsdWF0ZShkYXRhLCBkZWZhdWx0U2NvcGUpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuZCkge1xuICAgICAgICAgICAgICAgICAgICByZXQgPSByZXQgJiYgcmV0MTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXQgPSByZXQgfHwgcmV0MTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubm90KSB7XG4gICAgICAgICAgICByZXQgPSAhcmV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxufVxuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gVG9rZW4ge1xuICAgIGludmFsaWQ9LTEsXG4gICAgb3I9MCxcbiAgICBhbmQ9MSxcbiAgICBub3Q9MixcbiAgICBuZWFyPTMsXG4gICAgaW5maXhOZWFyPTQsXG4gICAgbFBhcj01LFxuICAgIHJQYXI9NixcbiAgICBlb2Y9NyxcbiAgICB2YWx1ZT04XG59XG5cbi8qKlxuICogQGlnbm9yZVxuICovXG5jb25zdCBlbnVtIEFjdCB7XG4gICAgcywgIC8vIHNoaWZ0XG4gICAgciwgIC8vIHJlZHVjZVxuICAgIGEsICAvLyBhY2NlcHRcbiAgICBlMSwgLy8gZXJyb3IgOiBtaXNzaW5nIHJpZ2h0IHBhcmVudGhlc2lzXG4gICAgZTIsIC8vIGVycm9yIDogbWlzc2luZyBvcGVyYXRvclxuICAgIGUzLCAvLyBlcnJvciA6IHVuYmFsYW5jZWQgcmlnaHQgcGFyZW50aGVzaXNcbiAgICBlNCAgLy8gZXJyb3IgOiBpbnZhbGlkIGZ1bmN0aW9uIGFyZ3VtZW50XG59XG5cbi8qKlxuICogUGFyc2luZyBvcHRpb25zXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRXhwclBhcnNlck9wdGlvbnMge1xuICAgIC8qKlxuICAgICAqIElmIGB0cnVlYCB0aGVuIGEgZmllbGRlZCBzZWFyY2ggZXhwcmVzc2lvbiB3aXRoIG5vIHZhbHVlIHdpbGwgbm90IGdlbmVyYXRlIGFuIGVycm9yLiBUaGlzIHdvdWxkIGJlIHVzZWRcbiAgICAgKiB3aGVuIHByb3ZpZGluZyBmZWVkYmFjayBkdXJpbmcgdGV4dCBlbnRyeVxuICAgICAqL1xuICAgIGFsbG93RW1wdHlWYWx1ZXM/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIElmIGB0cnVlYCwgZmllbGRzIGNhbiBjb250YWluIHRoZSBzY29waW5nIGNoYXJhY3RlciAoYC5gKS4gVGhpcyBpcyB0eXBpY2FsbHkgdXNlZCB3aXRoIGBFeHByLmV2YWx1YXRlYFxuICAgICAqL1xuICAgIGFsbG93U2NvcGVkRmllbGRzPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBJZiBgdHJ1ZWAgdGhlbiBhcmJpdHJhcnkgZmllbGQgbmFtZXMgYXJlIHBlcm1pdHRlZC4gVGhpcyBpcyB0eXBpY2FsbHkgdXNlZCB3aXRoIGBFeHByLmV2YWx1YXRlYFxuICAgICAqL1xuICAgIGRpc2FsbG93RnVsbHRleHQ/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNsYXNzIEV4cHJQYXJzZXJPcGVyYXRvciB7XG4gICAgcHVibGljIHN0YXRpYyBpbnZhbGlkOiBFeHByUGFyc2VyT3BlcmF0b3IgPSBuZXcgRXhwclBhcnNlck9wZXJhdG9yKFRva2VuLmludmFsaWQpO1xuICAgIHB1YmxpYyBzdGF0aWMgb3I6IEV4cHJQYXJzZXJPcGVyYXRvciA9IG5ldyBFeHByUGFyc2VyT3BlcmF0b3IoVG9rZW4ub3IpO1xuICAgIHB1YmxpYyBzdGF0aWMgYW5kOiBFeHByUGFyc2VyT3BlcmF0b3IgPSBuZXcgRXhwclBhcnNlck9wZXJhdG9yKFRva2VuLmFuZCk7XG4gICAgcHVibGljIHN0YXRpYyBub3Q6IEV4cHJQYXJzZXJPcGVyYXRvciA9IG5ldyBFeHByUGFyc2VyT3BlcmF0b3IoVG9rZW4ubm90KTtcbiAgICBwdWJsaWMgc3RhdGljIGxQYXI6IEV4cHJQYXJzZXJPcGVyYXRvciA9IG5ldyBFeHByUGFyc2VyT3BlcmF0b3IoVG9rZW4ubFBhcik7XG4gICAgcHVibGljIHN0YXRpYyByUGFyOiBFeHByUGFyc2VyT3BlcmF0b3IgPSBuZXcgRXhwclBhcnNlck9wZXJhdG9yKFRva2VuLnJQYXIpO1xuICAgIHB1YmxpYyBzdGF0aWMgZW9mOiBFeHByUGFyc2VyT3BlcmF0b3IgPSBuZXcgRXhwclBhcnNlck9wZXJhdG9yKFRva2VuLmVvZik7XG5cbiAgICBwdWJsaWMgdG9rOiBUb2tlbjtcbiAgICBwdWJsaWMgdG9rVmFsdWU6IHN0cmluZztcbiAgICBwdWJsaWMgdG9rVmFsdWVQb3M6IG51bWJlcjtcbiAgICBwdWJsaWMgdG9rVmFsdWVMZW46IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHRvazogVG9rZW4sIHZhbHVlOiBzdHJpbmcgPSBcIlwiLCB2YWx1ZVBvczogbnVtYmVyID0gLTEsIHZhbHVlTGVuOiBudW1iZXIgPSAtMSkge1xuICAgICAgICB0aGlzLnRvayA9IHRvaztcbiAgICAgICAgdGhpcy50b2tWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnRva1ZhbHVlUG9zID0gdmFsdWVQb3M7XG4gICAgICAgIHRoaXMudG9rVmFsdWVMZW4gPSB2YWx1ZUxlbjtcbiAgICB9XG59XG5cbi8qKlxuICogQSBwYXJzZXIgZm9yIFNpbmVxdWEgZmllbGRlZCBzZWFyY2ggZXhwcmVzc2lvbnMuIFN1Y2ggZXhwcmVzc2lvbnMgYWxsb3cgZmlsdGVycyB0byBiZSBzcGVjaWZpZWQgaW4gZnVsbHRleHQgYW5kXG4gKiBjYW4gYmUgY29tYmluZWQgd2l0aCBib29sZWFuIG9wZXJhdG9ycyB0byBidWlsZCBjb21wbGV4IHF1ZXJpZXMuXG4gKlxuICogQSBzaW5nbGUgZmllbGRlZCBzZWFyY2ggY2xhdXNlIGhhcyB0aGlzIGZvcm06XG4gKiBgYDxmaWVsZG5hbWU+W2BkaXNwbGF5IHZhbHVlYF06WzpdWzxvcGVyYXRvcj5dPHZhbHVlPmBgXG4gKlxuICogQSBmaWVsZCBuYW1lIGlzIGVpdGhlciBhIGNvbHVtbiBuYW1lIG9yIGFsaWFzIG9yIGEgcGFydG5hbWUuIEluIHRoZSBjYXNlIG9mIGEgcGFydG5hbWUgYW5kIGNvbHVtbiBuYW1lIGNsYXNoaW5nIHRoZW5cbiAqIHRoZSBmaWVsZCBpcyB0cmVhdGVkIGFzIGEgY29sdW1uLiBUd28gY29sb25zIGNhbiBiZSBzcGVjaWZpZWQgYXMgdGhlIHNlcGFyYXRvciB0byBkZW5vdGUgdGhhdCB0aGUgZmllbGQgaXMgYSBwYXJ0bmFtZS5cbiAqIEFuIG9wdGlvbmFsIGRpc3BsYXkgdmFsdWUgY2FuIGZvbGxvdyB0aGUgZmllbGRuYW1lIGVuY2xvc2VkIGluIGJhY2txdW90ZSBjaGFyYWN0ZXJzXG4gKlxuICogT3BlcmF0b3JzIGFyZTogYD1gIChkZWZhdWx0KSwgYD49YCwgYD5gLCBgPD1gLCBgPGAsIGB+YCAocmVnZXhwKVxuICogSW4gYWRkaXRpb24sIGEgcmVndWxhciBleHByZXNzaW9uIGNhbiBiZSBzcGVjaWZpZWQgYnkgZW5jbG9zaW5nIHRoZSB2YWx1ZSBpbiBgL2AgY2hhcmFjdGVyc1xuICpcbiAqIEFuIGluY2x1c2l2ZSByYW5nZSBvZiB2YWx1ZXMgY2FuIGJlIHNwZWNpZmllZCB1c2luZyBhIHNxdWFyZSBicmFja2V0IHN5bnRheDogYFt2YWx1ZTEuLnZhbHVlMl1gXG4gKiBBbiBleGNsdXNpdmUgcmFuZ2Ugb2YgdmFsdWVzIGNhbiBiZSBzcGVjaWZpZWQgdXNpbmcgYSBjdXJseSBicmFja2V0IHN5bnRheDogYHt2YWx1ZTEuLnZhbHVlMn1gXG4gKiBUaGUgYnJhY2tldHMgY2FuIGJlIG1peGVkLiBGb3IgZXhhbXBsZTogYGFnZTp7NS4uMTNdYCBleHByZXNzZXMgYDEzID49IGFnZSA+IDVgLlxuICpcbiAqIEZvciBtdWx0aS12YWx1ZSBjc3YgZmllbGRzIGFuIGBJTmAgY29uZGl0aW9uIGNhbiBiZSBleHByZXNzZWQgdXNpbmcgYSBjb21tYS1zZXBhcmF0ZWQgbGlzdCBvZiB2YWx1ZXMgZW5jbG9zZWQgaW4gc3F1YXJlIGJyYWNrZXRzLlxuICogRm9yIGV4YW1wbGU6IGBhdXRob3JzOltQcm91c3QsIE9yd2VsbCwgRGlja2Vuc11gXG4gKlxuICogSWYgYSB2YWx1ZSBjb250YWlucyByZXNlcnZlZCBjaGFyYWN0ZXJzIHRoZW4gaXQgY2FuIGJlIGVuY2xvc2VkIGluIGJhY2txdW90ZSBjaGFyYWN0ZXJzIHRvIHByZXZlbnQgdGhlIHBhcnNlciBpbnRlcnByZXRpbmcgdGhlbVxuICogaW5jb3JyZWN0bHkuIEZvciBleGFtcGxlOiBgYGNvZGU6IGBhOmI6Y2AgYGBcbiAqXG4gKiBUaGUgcGFyc2VyIGFsc28gc3VwcG9ydHMgYSBORUFSIG9wZXJhdG9yIHRvIGFsbG93IHNlYXJjaGluZyBmb3IgdGVybXMgY2xvc2UgdG8gZWFjaCBvdGhlci4gVGhlcmUgYXJlIHR3byBmb3JtcyBzdXBwcG9ydGVkOlxuICogKiBpbmZpeCAtIGB0ZXJtMSBORUFSWy9uXSB0ZXJtMmAgd2hlcmUgYG5gIGlzIHRoZSBtYXhpbXVtIG51bWJlciBvZiB3b3JkcyBiZXR3ZWVuIHRoZSB0d28gdGVybXMgZm9yIHRoZW0gdG8gbWF0Y2hcbiAqICogZnVuY3Rpb24gLSBgTkVBUlsvbl0odGVybTEsIHRlcm0yLCB0ZXJtMywgLi4uKWAgd2hlcmUgYG5gIGlzIFwid2luZG93XCIgc2l6ZSB3aXRoaW4gd2hpY2ggYWxsIHRoZSB0ZXJtcyBtdXN0IGJlIHByZXNlbnQgZm9yIHRoZW1cbiAqIHRvIG1hdGNoLiBUaGUgbWluaW11bSB1c2VmdWwgdmFsdWUgZm9yIG4gaXMgdGh1cyBlcXVhbCB0byB0aGUgbnVtYmVyIG9mIHRlcm1zIHBhc3NlZCB0byB0aGUgb3BlcmF0b3IuXG4gKlxuICogRmllbGRlZCBzZWFyY2ggZXhwcmVzaW9ucyBjYW4gYmUgY29tYmluZWQgd2l0aCB0aGUgYm9vbGVhbiBvcGVyYXRvcnMgYEFORGAsIGBPUmAgYW5kIGBOT1RgIGFuZCBicmFja2V0cyB1c2VkIGZvciBncm91cGluZy5cbiAqIEZvciBleGFtcGxlOiBgZm9vdGJhbGwgKGFnZTo+PTcgQU5EIChuYW1lOnNtaXRoIE9SIG5hbWU6am9uZXMpKWBcbiAqL1xuZXhwb3J0IGNsYXNzIEV4cHJQYXJzZXIge1xuXG4gICAgcHVibGljIHN0YXRpYyBmaWVsZFBhcnRuYW1lUHJlZml4ID0gXCJAXCI7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcGFyc2V0Ymw6IEFjdFtdW10gPSBbXG4gICAgLyogc3RrICAtLS0tLS0tLS0tLS0tIGlucHV0IC0tLS0tLS0tLS0tLSovXG4gICAgLypcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSU5GSVggICAgICAgICAgICAgICAgICAqL1xuICAgIC8qXHRcdCAgICAgICAgIE9SXHQgICBBTkRcdCBOT1QgICBORUFSICBORUFSICAoXHQgIClcdCAgICAgJCAgKi9cbiAgICAvKk9SICovICAgICAgICAgW0FjdC5yLCBBY3QucywgQWN0LnMsIEFjdC5zLCBBY3QucywgQWN0LnMsIEFjdC5yLCBBY3Qucl0sXG4gICAgLypBTkQqLyAgICAgICAgIFtBY3QuciwgQWN0LnIsIEFjdC5zLCBBY3QucywgQWN0LnMsIEFjdC5zLCBBY3QuciwgQWN0LnJdLFxuICAgIC8qTk9UKi8gICAgICAgICBbQWN0LnIsIEFjdC5yLCBBY3QucywgQWN0LnMsIEFjdC5yLCBBY3QucywgQWN0LnIsIEFjdC5yXSxcbiAgICAvKk5FQVIqLyAgICAgICAgW0FjdC5yLCBBY3QuciwgQWN0LnMsIEFjdC5zLCBBY3QuciwgQWN0LnMsIEFjdC5yLCBBY3Qucl0sXG4gICAgLypJTkZJWE5FQVIqLyAgIFtBY3QuciwgQWN0LnIsIEFjdC5zLCBBY3QucywgQWN0LnIsIEFjdC5zLCBBY3QuciwgQWN0LnJdLFxuICAgIC8qKCovICAgICAgICAgICBbQWN0LnMsIEFjdC5zLCBBY3QucywgQWN0LnMsIEFjdC5zLCBBY3QucywgQWN0LnMsIEFjdC5lMV0sXG4gICAgLyopKi8gICAgICAgICAgIFtBY3QuciwgQWN0LnIsIEFjdC5yLCBBY3QuciwgQWN0LnIsIEFjdC5lMiwgQWN0LnIsIEFjdC5yXSxcbiAgICAvKiQqLyAgICAgICAgICAgW0FjdC5zLCBBY3QucywgQWN0LnMsIEFjdC5zLCBBY3QucywgQWN0LnMsIEFjdC5lMywgQWN0LmFdXG4gICAgXTtcblxuICAgIHByaXZhdGUgZXhwckNvbnRleHQ6IEV4cHJDb250ZXh0O1xuICAgIHByaXZhdGUgb3B0aW9uczogRXhwclBhcnNlck9wdGlvbnM7XG4gICAgcHJpdmF0ZSBleHByZXNzaW9uczogRXhwcltdO1xuICAgIHByaXZhdGUgb3BlcmF0b3JzOiBFeHByUGFyc2VyT3BlcmF0b3JbXTtcbiAgICBwcml2YXRlIGZpZWxkczogc3RyaW5nW107IC8vIHB1c2hlZCBvbiAnKCcsIHBvcHBlZCBvbiAnKSdcbiAgICBwcml2YXRlIGRpc3BsYXlzOiBzdHJpbmdbXTsgLy8gcHVzaGVkIG9uICcoJywgcG9wcGVkIG9uICcpJ1xuICAgIHByaXZhdGUgb3A6IEV4cHJQYXJzZXJPcGVyYXRvcjtcbiAgICBwcml2YXRlIHByZXZPcDogRXhwclBhcnNlck9wZXJhdG9yO1xuICAgIHByaXZhdGUgc2F2ZU9wOiBFeHByUGFyc2VyT3BlcmF0b3I7IC8vIGZvciBkZWZhdWx0IGNvbmp1bmN0aW9uIG9wZXJhdG9yXG4gICAgcHJpdmF0ZSBmaWVsZDogc3RyaW5nO1xuICAgIHByaXZhdGUgZGlzcGxheTogc3RyaW5nO1xuICAgIHByaXZhdGUgdGV4dDogc3RyaW5nO1xuICAgIHByaXZhdGUgY3VycmVudDogbnVtYmVyO1xuICAgIHByaXZhdGUgbGVuZ3RoOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKGV4cHJDb250ZXh0OiBFeHByQ29udGV4dCwgb3B0aW9ucz86IEV4cHJQYXJzZXJPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZXhwckNvbnRleHQgPSBleHByQ29udGV4dDtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdGhpcy5leHByQ29udGV4dC5kaXNhbGxvd0Z1bGx0ZXh0ID0gdGhpcy5vcHRpb25zLmRpc2FsbG93RnVsbHRleHQ7XG4gICAgICAgIHRoaXMuZXhwcmVzc2lvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5vcGVyYXRvcnMgPSBbXTtcbiAgICAgICAgdGhpcy5maWVsZHMgPSBbXTtcbiAgICAgICAgdGhpcy5kaXNwbGF5cyA9IFtdO1xuICAgICAgICB0aGlzLnRleHQgPSBcIlwiO1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSAwO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMub3AgPSB0aGlzLnByZXZPcCA9IHRoaXMuc2F2ZU9wID0gRXhwclBhcnNlck9wZXJhdG9yLmludmFsaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXNjYXBlIGEgc3RyaW5nIHNvIHRoYXQgdGhlIGNoYXJhY3RlcnMgaW4gaXQgYXJlIG5vdCBwcm9jZXNzZWQgYnkgdGhlIGZpZWxkZWQgc2VhcmNoIGV4cHJlc3Npb24gcGFyc2VyLlxuICAgICAqIFNpbmdsZSBvY2N1cnJlbmNlcyBvZiB0aGUgYmFja3NsYXNoIGNoYXJhY3RlciBhcmUgcmVwbGFjZWQgYnkgdHdvIGJhY2tzbGFzaGVzIGFuZCBiYWNrcXVvdGUgY2hhcmFjdGVyc1xuICAgICAqIGFyZSBwcmVmaXhlZCBieSBhIGJhY2tzbGFzaC4gRmluYWxseSwgdGhlIHN0cmluZyBpcyBlbmNsb3NlZCBpbiBiYWNrcXVvdGVzLlxuICAgICAqXG4gICAgICogRm9yIGV4YW1wbGU6IGBgIGFcXGBcXGIgYGAgPT4gYGAgYVxcXFxcXGBcXFxcYiBgYFxuICAgICAqL1xuICAgIC8vIFxcID0+IFxcXFxcbiAgICAvLyBgID0+IFxcYFxuICAgIC8vIHRoZW4gc3Vycm91bmQgd2l0aCBgYFxuICAgIHB1YmxpYyBzdGF0aWMgZXNjYXBlKHZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJgYFwiO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKTsgLy8gbWFrZSBzdXJlIHdlIGhhdmUgYSBzdHJpbmdcbiAgICAgICAgaWYgKHZhbHVlLnNlYXJjaCgvW1xcXFxgXS8pID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiYFwiICsgdmFsdWUgKyBcImBcIjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzYjogc3RyaW5nW10gPSBbXCJgXCJdO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgaWMgPSB2YWx1ZS5sZW5ndGg7IGkgPCBpYzsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjaCA9IHZhbHVlW2ldO1xuICAgICAgICAgICAgaWYgKGNoID09PSBcIlxcXFxcIiB8fCBjaCA9PT0gXCJgXCIpIHtcbiAgICAgICAgICAgICAgICBzYi5wdXNoKFwiXFxcXFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNiLnB1c2goY2gpO1xuICAgICAgICB9XG4gICAgICAgIHNiLnB1c2goXCJgXCIpO1xuICAgICAgICByZXR1cm4gc2Iuam9pbihcIlwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpc0VzY2FwZWQodmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPj0gMiAmJiB2YWx1ZVswXSA9PT0gXCJgXCIgJiYgdmFsdWVbdmFsdWUubGVuZ3RoIC0gMV0gPT09IFwiYFwiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gdGhlIHJldmVyc2Ugb3BlcmF0aW9uIHRvIFtFeHByUGFyc2VyLmVzY3BhZV17QGxpbmsgRXhwclBhcnNlciNlc2NhcGV9XG4gICAgICovXG4gICAgLy8gcmVtb3ZlIHN1cnJvdW5kaW5nIGBgXG4gICAgLy8gXFxcXCA9PiBcXFxuICAgIC8vIFxcYCA9PiBgXG4gICAgcHVibGljIHN0YXRpYyB1bmVzY2FwZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCFFeHByUGFyc2VyLmlzRXNjYXBlZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzYjogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDEsIGljID0gdmFsdWUubGVuZ3RoIC0gMTsgaSA8IGljOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjaCA9IHZhbHVlW2ldO1xuICAgICAgICAgICAgaWYgKGNoID09PSBcIlxcXFxcIikge1xuICAgICAgICAgICAgICAgIGlmIChpID49IGljIC0gMSkgeyAvLyB3ZSBlbmQgd2l0aCBhIFxcID0+IGRyb3AgaXRcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoID0gdmFsdWVbKytpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNiLnB1c2goY2gpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzYi5qb2luKFwiXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHVuZXNjYXBlTGlzdCh2YWx1ZXM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICAgICAgICBpZiAoIXZhbHVlcykge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZXMxOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBfaSA9IDAsIF9hID0gdmFsdWVzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBfYVtfaV07XG4gICAgICAgICAgICB2YWx1ZXMxLnB1c2goRXhwclBhcnNlci51bmVzY2FwZSh2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZXMxO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHZhbHVlc0FuZExvY2F0aW9uc0Zyb21UZXh0KHRleHQ6IHN0cmluZywgc2VwYXJhdG9yOiBzdHJpbmcpOiBFeHByVmFsdWVMb2NhdGlvbltdIHtcbiAgICAgICAgaWYgKFV0aWxzLmlzRW1wdHkodGV4dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRleHQuaW5jbHVkZXMoc2VwYXJhdG9yKSkge1xuICAgICAgICAgICAgcmV0dXJuIFt7dmFsdWU6IHRleHQsIHN0YXJ0OiAwLCBsZW5ndGg6IHRleHQubGVuZ3RofV07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWVzOiBFeHByVmFsdWVMb2NhdGlvbltdID0gW107XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRleHQubGVuZ3RoO1xuICAgICAgICBsZXQgY3VycmVudCA9IDA7XG4gICAgICAgIGxldCBjdXJyZW50U3RhcnQgPSAwO1xuICAgICAgICBjb25zdCBzYjogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgbGV0IHZhbHVlOiBFeHByVmFsdWVMb2NhdGlvbjtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50ID49IGxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gRXhwci5nZXRWYWx1ZUFuZExvY2F0aW9uKHNiLmpvaW4oXCJcIikpO1xuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXJ0ICs9IGN1cnJlbnRTdGFydDtcbiAgICAgICAgICAgICAgICBpZiAoIVV0aWxzLmlzRW1wdHkodmFsdWUudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjaCA9IHRleHRbY3VycmVudF07XG4gICAgICAgICAgICBpZiAoY2ggPT09IFwiXFxcXFwiKSB7XG4gICAgICAgICAgICAgICAgc2IucHVzaChjaCk7XG4gICAgICAgICAgICAgICAgY3VycmVudCsrO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50IDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoMSA9IHRleHRbY3VycmVudF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaDEgPT09IFwiXFxcXFwiIHx8IGNoMSA9PT0gXCJgXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLnB1c2goY2gxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBcImBcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3Q6IElSZWY8bnVtYmVyPiA9IHt2YWx1ZTogMH07XG4gICAgICAgICAgICAgICAgY29uc3QgcyA9IEV4cHJQYXJzZXIubWF0Y2hVbnRpbCh0ZXh0LCBsZW5ndGgsIGN1cnJlbnQsIGN1cnJlbnQgKyAxLCBcImBcIiwgbGFzdCk7XG4gICAgICAgICAgICAgICAgaWYgKCEhcykge1xuICAgICAgICAgICAgICAgICAgICBzYi5wdXNoKHMpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gbGFzdC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNiLnB1c2goY2gpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IHNlcGFyYXRvcikge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gRXhwci5nZXRWYWx1ZUFuZExvY2F0aW9uKHNiLmpvaW4oXCJcIikpO1xuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXJ0ICs9IGN1cnJlbnRTdGFydDtcbiAgICAgICAgICAgICAgICBzYi5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIGlmICghVXRpbHMuaXNFbXB0eSh2YWx1ZS52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdXJyZW50Kys7XG4gICAgICAgICAgICAgICAgY3VycmVudFN0YXJ0ID0gY3VycmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNiLnB1c2goY2gpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWF0Y2hLZXl3b3JkKGtleXdvcmQ6IHN0cmluZywgc2JDdXJyZW50VmFsdWU6IHN0cmluZ1tdLCBzdWZmaXhDaD86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoc2JDdXJyZW50VmFsdWUubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBzYkN1cnJlbnRWYWx1ZS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgaWYgKCEhY3VycmVudFZhbHVlICYmICFcIiBcXHJcXG5cXHRcIi5pbmNsdWRlcyhjdXJyZW50VmFsdWVbY3VycmVudFZhbHVlLmxlbmd0aCAtIDFdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoVXRpbHMuaXNFbXB0eShrZXl3b3JkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGtleXdvcmRMZW4gPSBrZXl3b3JkLmxlbmd0aDtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudCArIGtleXdvcmRMZW4gPiB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBpYyA9IGtleXdvcmRMZW47IGkgPCBpYzsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjaCA9IHRoaXMudGV4dFt0aGlzLmN1cnJlbnQgKyBpXTtcbiAgICAgICAgICAgIGNvbnN0IGtoID0ga2V5d29yZFtpXTtcbiAgICAgICAgICAgIGlmIChjaCAhPT0ga2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudCArIGtleXdvcmRMZW4gPCB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgbmNoID0gdGhpcy50ZXh0W3RoaXMuY3VycmVudCArIGtleXdvcmRMZW5dO1xuICAgICAgICAgICAgaWYgKG5jaCAhPT0gc3VmZml4Q2ggJiYgIVwiIFxcclxcblxcdChcIi5pbmNsdWRlcyhuY2gpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWF0Y2hVbnRpbChmaXJzdDogbnVtYmVyLCBzdGFydDogbnVtYmVyLCBlbmRDaGFyczogc3RyaW5nLCBsYXN0OiBJUmVmPG51bWJlcj4pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gRXhwclBhcnNlci5tYXRjaFVudGlsKHRoaXMudGV4dCwgdGhpcy5sZW5ndGgsIGZpcnN0LCBzdGFydCwgZW5kQ2hhcnMsIGxhc3QpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIG1hdGNoVW50aWwodGV4dDogc3RyaW5nLCBsZW5ndGg6IG51bWJlciwgZmlyc3Q6IG51bWJlciwgc3RhcnQ6IG51bWJlciwgZW5kQ2hhcnM6IHN0cmluZywgbGFzdDogSVJlZjxudW1iZXI+KTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgbGFzdC52YWx1ZSA9IHN0YXJ0O1xuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgY29uc3Qgc2I6IHN0cmluZ1tdID0gW3RleHQuc3Vic3RyKGZpcnN0LCBzdGFydCAtIGZpcnN0KV07XG4gICAgICAgIHdoaWxlIChsYXN0LnZhbHVlIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgY2ggPSB0ZXh0W2xhc3QudmFsdWUrK107XG4gICAgICAgICAgICBpZiAoY2ggPT09IFwiXFxcXFwiKSB7XG4gICAgICAgICAgICAgICAgc2IucHVzaChjaCk7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3QudmFsdWUgPCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2ggPSB0ZXh0W2xhc3QudmFsdWUrK107XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gXCJcXFxcXCIgfHwgY2ggPT09IFwiYFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5wdXNoKGNoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2IucHVzaChjaCk7XG4gICAgICAgICAgICBpZiAoZW5kQ2hhcnMuaW5jbHVkZXMoY2gpKSB7XG4gICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNiLmpvaW4oXCJcIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXRjaFNpbXBsZVZhbHVlKHN0YXJ0OiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBmaXJzdCA9IHRoaXMuY3VycmVudDtcbiAgICAgICAgbGV0IGxhc3QgPSBzdGFydDtcbiAgICAgICAgd2hpbGUgKGxhc3QgPCB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgY2ggPSB0aGlzLnRleHRbbGFzdF07XG4gICAgICAgICAgICBpZiAoXCIgXFxyXFxuXFx0KVwiLmluY2x1ZGVzKGNoKSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdCsrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXN0ID09PSBzdGFydCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dC5zdWJzdHIoZmlyc3QsIGxhc3QgLSBmaXJzdCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUZXJtaW5hdG9ycyhjaDogc3RyaW5nLCBhbGxvd1JhbmdlczogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgICAgIGlmIChjaCA9PT0gXCJcXFwiXCIpIHJldHVybiBcIlxcXCJcIjtcbiAgICAgICAgaWYgKGNoID09PSBcIltcIikgcmV0dXJuIGFsbG93UmFuZ2VzID8gXCJdfVwiIDogXCJdXCI7XG4gICAgICAgIGlmIChjaCA9PT0gXCJ7XCIpIHJldHVybiBhbGxvd1JhbmdlcyA/IFwifV1cIiA6IFwifVwiO1xuICAgICAgICBpZiAoY2ggPT09IFwiL1wiKSByZXR1cm4gXCIvXCI7XG4gICAgICAgIGlmIChjaCA9PT0gXCIoXCIpIHJldHVybiBcIilcIjtcbiAgICAgICAgaWYgKGNoID09PSBcImBcIikgcmV0dXJuIFwiYFwiO1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbkJlVG9rVmFsdWUodmFsdWU6IHN0cmluZywgY2FuQmVFbXB0eSA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuICFVdGlscy5pc0VtcHR5KHZhbHVlKSB8fCAoY2FuQmVFbXB0eSAmJiB0aGlzLm9wdGlvbnMuYWxsb3dFbXB0eVZhbHVlcyAmJiAhVXRpbHMuaXNFbXB0eSh0aGlzLmZpZWxkKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0VG9rVmFsdWUodmFsdWU6IHN0cmluZywgY2FuQmVFbXB0eSA9IHRydWUpOiBib29sZWFuIHtcbiAgICAgICAgLy8gQ3VycmVudCBpcyBwb2ludGluZyBhdCB0aGUgbmV4dCBub24td2hpdGVwc3BhY2UgY2hhcmFjdGVyIGFmdGVyIHRoaXMgdmFsdWVcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGxldCBwb3MgPSB0aGlzLmN1cnJlbnQ7XG4gICAgICAgIGNvbnN0IGxlbiA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgdmFsdWUgPSBVdGlscy50cmltRW5kKHZhbHVlKTtcbiAgICAgICAgcG9zIC09IGxlbiAtIHZhbHVlLmxlbmd0aDtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50cmltKCk7XG4gICAgICAgIGlmICh0aGlzLmNhbkJlVG9rVmFsdWUodmFsdWUsIGNhbkJlRW1wdHkpKSB7XG4gICAgICAgICAgICB0aGlzLm9wID0gbmV3IEV4cHJQYXJzZXJPcGVyYXRvcihUb2tlbi52YWx1ZSwgdmFsdWUsIHBvcyAtIHZhbHVlLmxlbmd0aCwgdmFsdWUubGVuZ3RoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRva1ZhbHVlKHNiOiBzdHJpbmdbXSwgY2FuQmVFbXB0eSA9IHRydWUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCFzYikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRUb2tWYWx1ZShzYi5qb2luKFwiXCIpLCBjYW5CZUVtcHR5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVuc3VyZU5lYXJWYWx1ZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdE5lYXJWYWx1ZSA9IHRoaXMuZXhwckNvbnRleHQuYXBwU2VydmljZS5jY3F1ZXJ5ID8gdGhpcy5leHByQ29udGV4dC5hcHBTZXJ2aWNlLmNjcXVlcnkuZGVmYXVsdE5lYXJWYWx1ZSA6IDA7XG4gICAgICAgIGxldCBuZWFyID0gVXRpbHMudG9JbnQodmFsdWUsIGRlZmF1bHROZWFyVmFsdWUpO1xuICAgICAgICBpZiAobmVhciA8IDApIHtcbiAgICAgICAgICAgIG5lYXIgPSBkZWZhdWx0TmVhclZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZWFyLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaW5kRGlzcGxheSh2YWx1ZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZS5sZW5ndGggPCAzKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlW3ZhbHVlLmxlbmd0aCAtIDFdICE9PSBcImBcIikge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwb3MgPSB2YWx1ZS5sZW5ndGggLSAyO1xuICAgICAgICB3aGlsZSAocG9zICE9PSAtMSkge1xuICAgICAgICAgICAgcG9zID0gdmFsdWUubGFzdEluZGV4T2YoXCJgXCIsIHBvcyk7XG4gICAgICAgICAgICBpZiAocG9zICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGxldCBlc2NhcGVzID0gMDtcbiAgICAgICAgICAgICAgICBsZXQgcG9zMSA9IHBvcyAtIDE7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHBvczEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVbcG9zMV0gIT09IFwiXFxcXFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlc2NhcGVzKys7XG4gICAgICAgICAgICAgICAgICAgIHBvczEtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVzY2FwZXMgJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwb3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvcy0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzVmFsaWRGaWVsZE5hbWUobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYWxsb3dTY29wZWRGaWVsZHMgPyBVdGlscy5pc1ZhbGlkU2NvcGVkU2ltcGxlTmFtZShuYW1lKSA6IFV0aWxzLmlzVmFsaWRTaW1wbGVOYW1lKG5hbWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNBbGxvd2VkRmllbGQoZmllbGQ6IHN0cmluZywgZm9yY2VQYXJ0bmFtZTogYm9vbGVhbiwgaXNQYXJ0bmFtZTogSVJlZjxib29sZWFuPik6IGJvb2xlYW4ge1xuICAgICAgICBpc1BhcnRuYW1lLnZhbHVlID0gZmFsc2U7XG4gICAgICAgIGlmIChVdGlscy5lcU5DTihmaWVsZCwgXCJleGlzdHNcIiwgXCJtaXNzaW5nXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVXRpbHMuZXFOQ04oZmllbGQsIFwidGV4dFwiLCBcImNvbmNlcHRzXCIsIFwicmVmaW5lXCIsIFwibWF0Y2hpbmdwYXJ0bmFtZXNcIikpIHtcbiAgICAgICAgICAgIC8vIE5CIEBjb25jZXB0cywgQHJlZmluZSBhbmQgQG1hdGNoaW5ncGFydG5hbWVzIG11c3QgYmUgaGFuZGxlZCBzcGVjaWFsbHkgYnkgdGhlIGNhbGxlclxuICAgICAgICAgICAgaXNQYXJ0bmFtZS52YWx1ZSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjY3F1ZXJ5ID0gdGhpcy5leHByQ29udGV4dC5hcHBTZXJ2aWNlLmNjcXVlcnk7XG4gICAgICAgIGlmIChjY3F1ZXJ5KSB7XG4gICAgICAgICAgICBmb3JjZVBhcnRuYW1lID0gZm9yY2VQYXJ0bmFtZSAmJiAhdGhpcy5leHByQ29udGV4dC5kaXNhbGxvd0Z1bGx0ZXh0O1xuICAgICAgICAgICAgbGV0IGNvbHVtbiA9IGZvcmNlUGFydG5hbWUgPyB1bmRlZmluZWQgOiB0aGlzLmV4cHJDb250ZXh0LmFwcFNlcnZpY2UuZ2V0Q29sdW1uKGZpZWxkKTtcbiAgICAgICAgICAgIGlmICghIWNvbHVtbikge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW4uZVR5cGUgPT09IEVuZ2luZVR5cGUudmFyY2hhcikgeyAvLyBvbmx5IHR5cGUgbm90IGluZGV4ZWRcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICgoY2NxdWVyeS4kY29sdW1uRmllbGRzUGF0dGVybiAmJiBjY3F1ZXJ5LiRjb2x1bW5GaWVsZHNQYXR0ZXJuLmhhc1BhdHRlcm5zKCkpICYmXG4gICAgICAgICAgICAgICAgICAgICFjY3F1ZXJ5LiRjb2x1bW5GaWVsZHNQYXR0ZXJuLmlzSW5jbHVkZWQoZmllbGQpICYmXG4gICAgICAgICAgICAgICAgICAgICFjY3F1ZXJ5LiRjb2x1bW5GaWVsZHNQYXR0ZXJuLmlzSW5jbHVkZWQoY29sdW1uLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuZXhwckNvbnRleHQuZGlzYWxsb3dGdWxsdGV4dCAmJiAhY29sdW1uKSB7XG4gICAgICAgICAgICAgICAgaXNQYXJ0bmFtZS52YWx1ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKChjY3F1ZXJ5LiRwYXJ0bmFtZUZpZWxkc1BhdHRlcm4gJiYgY2NxdWVyeS4kcGFydG5hbWVGaWVsZHNQYXR0ZXJuLmhhc1BhdHRlcm5zKCkpICYmXG4gICAgICAgICAgICAgICAgICAgICFjY3F1ZXJ5LiRwYXJ0bmFtZUZpZWxkc1BhdHRlcm4uaXNJbmNsdWRlZChmaWVsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlYWRUb2tlbigpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy5zYXZlT3AgIT09IEV4cHJQYXJzZXJPcGVyYXRvci5pbnZhbGlkKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZPcCA9IHRoaXMub3A7XG4gICAgICAgICAgICB0aGlzLm9wID0gdGhpcy5zYXZlT3A7XG4gICAgICAgICAgICB0aGlzLnNhdmVPcCA9IEV4cHJQYXJzZXJPcGVyYXRvci5pbnZhbGlkO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2g7XG4gICAgICAgIHRoaXMucHJldk9wID0gdGhpcy5vcDtcbiAgICAgICAgbGV0IG5leHRWYWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBzYkN1cnJlbnRWYWx1ZTogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgbGV0IGNhbmRpZGF0ZUZpZWxkUG9zID0gLTE7XG4gICAgICAgIGxldCBmaWVsZFNwZWNpZmllZCA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudCA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFRva1ZhbHVlKHNiQ3VycmVudFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm9wID0gRXhwclBhcnNlck9wZXJhdG9yLmVvZjtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2ggPSB0aGlzLnRleHRbdGhpcy5jdXJyZW50XTtcbiAgICAgICAgICAgIGlmIChjaCA9PT0gXCJcXFxcXCIpIHsgLy8gXFwgZXNjYXBlcyBcXCBhbmQgYFxuICAgICAgICAgICAgICAgIHNiQ3VycmVudFZhbHVlLnB1c2goY2gpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudCsrO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnQgPCB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaDEgPSB0aGlzLnRleHRbdGhpcy5jdXJyZW50XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoMSA9PT0gXCJcXFxcXCIgfHwgY2gxID09PSBcImBcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2JDdXJyZW50VmFsdWUucHVzaChjaDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Kys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gXCIoXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRUb2tWYWx1ZShzYkN1cnJlbnRWYWx1ZSwgZmFsc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMub3AgPSBFeHByUGFyc2VyT3BlcmF0b3IubFBhcjtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IFwiKVwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0VG9rVmFsdWUoc2JDdXJyZW50VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMub3AgPSBFeHByUGFyc2VyT3BlcmF0b3IuclBhcjtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tYXRjaEtleXdvcmQoXCJBTkRcIiwgc2JDdXJyZW50VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0VG9rVmFsdWUoc2JDdXJyZW50VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMub3AgPSBFeHByUGFyc2VyT3BlcmF0b3IuYW5kO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudCArPSAzO1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1hdGNoS2V5d29yZChcIk9SXCIsIHNiQ3VycmVudFZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFRva1ZhbHVlKHNiQ3VycmVudFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm9wID0gRXhwclBhcnNlck9wZXJhdG9yLm9yO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudCArPSAyO1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1hdGNoS2V5d29yZChcIk5PVFwiLCBzYkN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRUb2tWYWx1ZShzYkN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5vcCA9IEV4cHJQYXJzZXJPcGVyYXRvci5ub3Q7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50ICs9IDM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubWF0Y2hLZXl3b3JkKFwiTkVBUlwiLCBzYkN1cnJlbnRWYWx1ZSwgXCIvXCIpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0VG9rVmFsdWUoc2JDdXJyZW50VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudCArPSA0O1xuICAgICAgICAgICAgICAgIG5leHRWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50IDwgdGhpcy5sZW5ndGggJiYgdGhpcy50ZXh0W3RoaXMuY3VycmVudF0gPT09IFwiL1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3Q6IElSZWY8bnVtYmVyPiA9IHt2YWx1ZTogMH07XG4gICAgICAgICAgICAgICAgICAgIG5leHRWYWx1ZSA9IHRoaXMubWF0Y2hVbnRpbCh0aGlzLmN1cnJlbnQgKyAxLCB0aGlzLmN1cnJlbnQgKyAxLCBcIiBcXHJcXG5cXHRgXFxcIihbL1wiLCBsYXN0KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5lYXIgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0VmFsdWUgPSBuZXh0VmFsdWUuc3Vic3RyKDAsIG5leHRWYWx1ZS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lYXIgPSBVdGlscy50b0ludChuZXh0VmFsdWUsIC0xKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobmVhciA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImJhZCBvcGVyYXRvclwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IGxhc3QudmFsdWUgLSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0VmFsdWUgPSB0aGlzLmVuc3VyZU5lYXJWYWx1ZShuZXh0VmFsdWUgfHwgXCJcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5maXggPSB0aGlzLmN1cnJlbnQgPj0gdGhpcy5sZW5ndGggfHwgdGhpcy50ZXh0W3RoaXMuY3VycmVudF0gIT09IFwiKFwiO1xuICAgICAgICAgICAgICAgIC8vIEZvciBpbmZpeCwgbmVhciB2YWx1ZSBpcyB0aGUgbnVtYmVyIG9mIHdvcmRzIGJldHdlZW4gdGhlIHR3byB0ZXJtcyBzbyBhZGQgdGhlIDIgdGVybXMgdG9cbiAgICAgICAgICAgICAgICAvLyB0aGUgd2luZG93IChuZWFyLzAgPSBhZGphY2VudCB0ZXJtcylcbiAgICAgICAgICAgICAgICB0aGlzLm9wID0gaW5maXggP1xuICAgICAgICAgICAgICAgICAgICBuZXcgRXhwclBhcnNlck9wZXJhdG9yKFRva2VuLmluZml4TmVhciwgKFV0aWxzLnRvSW50KG5leHRWYWx1ZSkgKyAyKS50b1N0cmluZygpKSA6XG4gICAgICAgICAgICAgICAgICAgIG5ldyBFeHByUGFyc2VyT3BlcmF0b3IoVG9rZW4ubmVhciwgbmV4dFZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IFwiK1wiIHx8IGNoID09PSBcIi1cIikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnQgKyAxIDwgdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2gxID0gdGhpcy50ZXh0W3RoaXMuY3VycmVudCArIDFdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0OiBJUmVmPG51bWJlcj4gPSB7dmFsdWU6IDB9O1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGVuZ3RoOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcIihcXFwiWy9gXCIuaW5jbHVkZXMoY2gxKSkgeyAvLyAoIFwiIFsgLyBgXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0VmFsdWUgPSB0aGlzLm1hdGNoVW50aWwodGhpcy5jdXJyZW50LCB0aGlzLmN1cnJlbnQgKyAyLCB0aGlzLmdldFRlcm1pbmF0b3JzKGNoMSwgZmFsc2UpLCBsYXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IGxhc3QudmFsdWUgLSB0aGlzLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0VmFsdWUgPSB0aGlzLm1hdGNoU2ltcGxlVmFsdWUodGhpcy5jdXJyZW50ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSAhIW5leHRWYWx1ZSA/IG5leHRWYWx1ZS5sZW5ndGggOiAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghIW5leHRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2JDdXJyZW50VmFsdWUucHVzaChuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50ICs9IGxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBcImJhZCBvcGVyYXRvcjogXCIgKyBjaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKFwiXFxcIlt7L2BcIi5pbmNsdWRlcyhjaCkpIHsgLy8gXCIgWyB7IC8gYFxuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3Q6IElSZWY8bnVtYmVyPiA9IHt2YWx1ZTogMH07XG4gICAgICAgICAgICAgICAgbmV4dFZhbHVlID0gdGhpcy5tYXRjaFVudGlsKHRoaXMuY3VycmVudCwgdGhpcy5jdXJyZW50ICsgMSwgdGhpcy5nZXRUZXJtaW5hdG9ycyhjaCwgdHJ1ZSksIGxhc3QpO1xuICAgICAgICAgICAgICAgIGlmICghIW5leHRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JjZVJhbmdlID0gKGZpZWxkU3BlY2lmaWVkICYmIFwiW3tcIi5pbmNsdWRlcyhjaCkgJiYgc2JDdXJyZW50VmFsdWUubGVuZ3RoID09PSAwKTtcbiAgICAgICAgICAgICAgICAgICAgc2JDdXJyZW50VmFsdWUucHVzaChuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSBsYXN0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2VSYW5nZSAmJiB0aGlzLmdldFRva1ZhbHVlKHNiQ3VycmVudFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiYmFkIG9wZXJhdG9yOiBcIiArIGNoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoID09PSBcIjpcIikgeyAvLyBGaWVsZFxuICAgICAgICAgICAgICAgICAgICAvLyBQaWNrIG91dCBwcmV2aW91cyB2YWx1ZSBhbmQvb3IgZmllbGQgbmFtZVxuICAgICAgICAgICAgICAgICAgICAvLyBGaWVsZCBzcGVjaWZpZXIgY2FuIGJlOlxuICAgICAgICAgICAgICAgICAgICAvLyBmaWVsZDp2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAvLyBmaWVsZGBkaXNwbGF5YDp2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAvLyBgZGlzcGxheWA6dmFsdWVcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gc2JDdXJyZW50VmFsdWUuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZUZpZWxkUG9zID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGRpc3BsYXlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZUZpZWxkUG9zID0gdGhpcy5maW5kRGlzcGxheShjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZUZpZWxkUG9zID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3AgPSBFeHByUGFyc2VyT3BlcmF0b3IuaW52YWxpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJpbnZhbGlkIHRva2VuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkID0gY3VycmVudFZhbHVlLnN1YnN0cihjYW5kaWRhdGVGaWVsZFBvcykudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGlzcGxheSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIC8vIEV4dHJhY3QgZGlzcGxheVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXNwbGF5U3RhcnQgPSB0aGlzLmZpbmREaXNwbGF5KGZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3BsYXlTdGFydCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgPSBFeHByUGFyc2VyLnVuZXNjYXBlKGZpZWxkLnN1YnN0cihkaXNwbGF5U3RhcnQsIGZpZWxkLmxlbmd0aCAtIGRpc3BsYXlTdGFydCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQgPSBmaWVsZC5zdWJzdHIoMCwgZGlzcGxheVN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkRmllbGROYW1lKGZpZWxkKSB8fCAoVXRpbHMuaXNFbXB0eShmaWVsZCkgJiYgIVV0aWxzLmlzRW1wdHkoZGlzcGxheSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnJlbnRWYWx1ZS5zdWJzdHIoMCwgY2FuZGlkYXRlRmllbGRQb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FuQmVUb2tWYWx1ZSh2YWx1ZS50cmltKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50IC09IChzYkN1cnJlbnRWYWx1ZS5qb2luKFwiXCIpLmxlbmd0aCAtIGNhbmRpZGF0ZUZpZWxkUG9zKTsgLy8gYmFjayB1cCB0byBmaWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2dldFRva1ZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFVdGlscy5pc0VtcHR5KGZpZWxkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb3JjZVBhcnRuYW1lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudCArIDEgPCB0aGlzLmxlbmd0aCAmJiB0aGlzLnRleHRbdGhpcy5jdXJyZW50ICsgMV0gPT09IFwiOlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDo6ID0+IGZvcmNlIHBhcnRuYW1lIG92ZXIgY29sdW1uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcmNlUGFydG5hbWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNQYXJ0bmFtZTogSVJlZjxib29sZWFuPiA9IHsgdmFsdWU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzQWxsb3dlZEZpZWxkKGZpZWxkLCBmb3JjZVBhcnRuYW1lLCBpc1BhcnRuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVGaWVsZFBvcyA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYkN1cnJlbnRWYWx1ZS5wdXNoKFwiOlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcmNlUGFydG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNiQ3VycmVudFZhbHVlLnB1c2goXCI6XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzUGFydG5hbWUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQgPSBFeHByUGFyc2VyLmZpZWxkUGFydG5hbWVQcmVmaXggKyBmaWVsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIVV0aWxzLmlzRW1wdHkoZmllbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWVsZCA9IGZpZWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkU3BlY2lmaWVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghVXRpbHMuaXNFbXB0eShkaXNwbGF5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheSA9IGRpc3BsYXk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzYkN1cnJlbnRWYWx1ZS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoXCIgXFxyXFxuXFx0KVwiLmluY2x1ZGVzKGNoKSkge1xuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVGaWVsZFBvcyA9IC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjYW5kaWRhdGVGaWVsZFBvcyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlRmllbGRQb3MgPSBzYkN1cnJlbnRWYWx1ZS5qb2luKFwiXCIpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2JDdXJyZW50VmFsdWUucHVzaChjaCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNsZWFyKCkge1xuICAgICAgICB0aGlzLnRleHQgPSBcIlwiO1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSAwO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMub3BlcmF0b3JzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZXhwcmVzc2lvbnMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5maWVsZHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5kaXNwbGF5cy5sZW5ndGggPSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIHNvbWUgdGV4dCB1c2luZyB0aGUgU2luZXF1YSBmaWVsZGVkIHNlYXJjaCBzeW50YXhcbiAgICAgKlxuICAgICAqIEByZXR1cm4gVGhlIHBhcnNlZCBgRXhwcmAgb3IgYW4gZXJyb3Igc3RyaW5nXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBwYXJzZSh0ZXh0OiBzdHJpbmcsIGNvbnRleHQ6IEV4cHJDb250ZXh0LCBvcHRpb25zPzogRXhwclBhcnNlck9wdGlvbnMpOiBFeHByIHwgc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcGFyc2VyID0gbmV3IEV4cHJQYXJzZXIoY29udGV4dCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IGVycm9yID0gcGFyc2VyLnBhcnNlKHRleHQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyc2VyLnBhcnNlUmVzdWx0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZVJlc3VsdCgpOiBFeHByIHwgc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuZXhwcmVzc2lvbnMubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJubyBleHByZXNzaW9uIGZvdW5kXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZXhwcmVzc2lvbnNbMF07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgY29udGV4dEZpZWxkKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBmaWVsZCA9IHRoaXMuZmllbGQ7XG4gICAgICAgIGlmIChVdGlscy5pc0VtcHR5KGZpZWxkKSkge1xuICAgICAgICAgICAgZmllbGQgPSB0aGlzLnBlZWtGaWVsZCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWVsZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBjb250ZXh0RGlzcGxheSgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgZGlzcGxheSA9IHRoaXMuZGlzcGxheTtcbiAgICAgICAgaWYgKFV0aWxzLmlzRW1wdHkoZGlzcGxheSkpIHtcbiAgICAgICAgICAgIGRpc3BsYXkgPSB0aGlzLnBlZWtEaXNwbGF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpc3BsYXk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZSh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWxsb3dFbXB0eVZhbHVlcyAmJiAhVXRpbHMubGVuKHRleHQudHJpbSgpKSkge1xuICAgICAgICAgICAgY29uc3QgZXhwciA9IEV4cHIubWFrZUV4cHIodGhpcy5leHByQ29udGV4dCwgXCJcIiwgdGhpcy5jb250ZXh0RmllbGQsIHRoaXMuY29udGV4dERpc3BsYXksIHRoaXMub3B0aW9ucy5hbGxvd0VtcHR5VmFsdWVzKTtcbiAgICAgICAgICAgIGlmIChleHByKSB7XG4gICAgICAgICAgICAgICAgZXhwci5zdGFydCA9IDA7XG4gICAgICAgICAgICAgICAgZXhwci5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvbnMucHVzaChleHByKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQgfHwgXCJcIjtcbiAgICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLnRleHQubGVuZ3RoO1xuICAgICAgICB0aGlzLm9wZXJhdG9ycy5wdXNoKEV4cHJQYXJzZXJPcGVyYXRvci5lb2YpO1xuICAgICAgICBsZXQgZXJyID0gdGhpcy5yZWFkVG9rZW4oKTtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgaWYgKCh0aGlzLm9wLnRvayA9PT0gVG9rZW4udmFsdWUgfHwgdGhpcy5vcC50b2sgPT09IFRva2VuLmxQYXIgfHwgdGhpcy5vcC50b2sgPT09IFRva2VuLm5vdCB8fCB0aGlzLm9wLnRvayA9PT0gVG9rZW4ubmVhcikgJiZcbiAgICAgICAgICAgICAgICAodGhpcy5wcmV2T3AudG9rID09PSBUb2tlbi52YWx1ZSB8fCB0aGlzLnByZXZPcC50b2sgPT09IFRva2VuLnJQYXIpKSB7XG4gICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBBTkQgZm9yIHNwYWNlIHNlcGFyYXRlZCB0ZXJtc1xuICAgICAgICAgICAgICAgIC8vIE5PVCB4eHggPT4gQU5EIE5PVCB4eHhcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVPcCA9IHRoaXMub3A7XG4gICAgICAgICAgICAgICAgdGhpcy5vcCA9IEV4cHJQYXJzZXJPcGVyYXRvci5hbmQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBhOiBBY3Q7XG4gICAgICAgICAgICBpZiAodGhpcy5vcC50b2sgPT09IFRva2VuLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgYSA9IEFjdC5zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYSA9IEV4cHJQYXJzZXIucGFyc2V0YmxbdGhpcy5vcGVyYXRvcnNbdGhpcy5vcGVyYXRvcnMubGVuZ3RoIC0gMV0udG9rXVt0aGlzLm9wLnRva107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKGEpIHtcbiAgICAgICAgICAgICAgICBjYXNlIEFjdC5yOlxuICAgICAgICAgICAgICAgICAgICBlcnIgPSB0aGlzLnJlZHVjZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXJyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgQWN0LnM6XG4gICAgICAgICAgICAgICAgICAgIGVyciA9IHRoaXMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEFjdC5hOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5leHByZXNzaW9ucy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN5bnRheCBlcnJvclwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgICAgIGNhc2UgQWN0LmUxOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJtaXNzaW5nICcpJ1wiO1xuICAgICAgICAgICAgICAgIGNhc2UgQWN0LmUyOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJtaXNzaW5nIG9wZXJhdG9yIChBTkQsT1IsTk9UKVwiO1xuICAgICAgICAgICAgICAgIGNhc2UgQWN0LmUzOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJtaXNzaW5nICcoJ1wiO1xuICAgICAgICAgICAgICAgIGNhc2UgQWN0LmU0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJpbnZhbGlkIGFyZ3VtZW50XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNoaWZ0KCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICh0aGlzLm9wLnRvayA9PT0gVG9rZW4udmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5vcC50b2tWYWx1ZS50cmltKCk7XG4gICAgICAgICAgICBpZiAoVXRpbHMuaXNFbXB0eSh2YWx1ZSkgJiYgIXRoaXMub3B0aW9ucy5hbGxvd0VtcHR5VmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZW1wdHkgdG9rZW5cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGV4cHIgPSBFeHByLm1ha2VFeHByKHRoaXMuZXhwckNvbnRleHQsIHZhbHVlLCB0aGlzLmNvbnRleHRGaWVsZCwgdGhpcy5jb250ZXh0RGlzcGxheSwgISF0aGlzLm9wdGlvbnMuYWxsb3dFbXB0eVZhbHVlcyk7XG4gICAgICAgICAgICBpZiAoIWV4cHIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJpbnZhbGlkIGV4cHJlc3Npb25cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4cHIuc3RhcnQgPSB0aGlzLm9wLnRva1ZhbHVlUG9zO1xuICAgICAgICAgICAgZXhwci5sZW5ndGggPSB0aGlzLm9wLnRva1ZhbHVlTGVuO1xuICAgICAgICAgICAgaWYgKCEhZXhwci5vcGVyYW5kcykge1xuICAgICAgICAgICAgICAgIGV4cHIub3BlcmFuZHMuZm9yRWFjaChvcGVyYW5kID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmFuZC5zdGFydCA9IHRoaXMub3AudG9rVmFsdWVQb3M7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhbmQubGVuZ3RoID0gdGhpcy5vcC50b2tWYWx1ZUxlbjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvbnMucHVzaChleHByKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGQgPSBcIlwiO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3BlcmF0b3JzLnB1c2godGhpcy5vcCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcC50b2sgPT09IFRva2VuLmxQYXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoVXRpbHMuaXNFbXB0eSh0aGlzLmZpZWxkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKHRoaXMucGVla0ZpZWxkKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWVsZHMucHVzaCh0aGlzLmZpZWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKFV0aWxzLmlzRW1wdHkodGhpcy5kaXNwbGF5KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlzLnB1c2godGhpcy5wZWVrRGlzcGxheSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheXMucHVzaCh0aGlzLmRpc3BsYXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRUb2tlbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGVla0ZpZWxkKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmZpZWxkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmZpZWxkc1t0aGlzLmZpZWxkcy5sZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBlZWtEaXNwbGF5KCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheXNbdGhpcy5kaXNwbGF5cy5sZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbkJlTWVyZ2VUYXJnZXQoZTogRXhwciwgYW5kOiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChlLmlzTGVhZikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLm5lYXIgPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLmFuZCAhPT0gYW5kKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUubm90KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtZXJnZUV4cHIoZTE6IEV4cHIsIGUyOiBFeHByLCBhbmQ6IGJvb2xlYW4pOiBFeHByIHtcbiAgICAgICAgbGV0IHNvdXJjZTogRXhwciwgdGFyZ2V0OiBFeHByO1xuICAgICAgICBsZXQgcHJlcGVuZCA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5jYW5CZU1lcmdlVGFyZ2V0KGUxLCBhbmQpKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSBlMTtcbiAgICAgICAgICAgIHNvdXJjZSA9IGUyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY2FuQmVNZXJnZVRhcmdldChlMiwgYW5kKSkge1xuICAgICAgICAgICAgdGFyZ2V0ID0gZTI7XG4gICAgICAgICAgICBzb3VyY2UgPSBlMTtcbiAgICAgICAgICAgIHByZXBlbmQgPSB0cnVlOyAvLyB0byBrZWVwIHRoZSBzYW1lIG9yZGVyIGFzIGluIHRoZSBpbnB1dCB0ZXh0XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEV4cHIoe1xuICAgICAgICAgICAgICAgIGV4cHJDb250ZXh0OiBlMS5leHByQ29udGV4dCxcbiAgICAgICAgICAgICAgICBvcDE6IGUxLFxuICAgICAgICAgICAgICAgIGFuZCxcbiAgICAgICAgICAgICAgICBvcDI6IGUyLFxuICAgICAgICAgICAgICAgIGZpZWxkOiB0aGlzLnBlZWtGaWVsZCgpLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IHRoaXMucGVla0Rpc3BsYXkoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNvdXJjZS5pc0xlYWYgfHwgc291cmNlLmFuZCAhPT0gYW5kIHx8IHNvdXJjZS5ub3QgfHwgIVV0aWxzLmVxKHNvdXJjZS5kaXNwbGF5IHx8IFwiXCIsIHRhcmdldC5kaXNwbGF5IHx8IFwiXCIpKSB7XG4gICAgICAgICAgICB0YXJnZXQuYWRkT3BlcmFuZChzb3VyY2UsIHRoaXMucGVla0ZpZWxkKCksIHByZXBlbmQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHNvdXJjZS5vcGVyYW5kcykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgb3BlcmFuZCBvZiBzb3VyY2Uub3BlcmFuZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmFkZE9wZXJhbmQob3BlcmFuZCwgdGhpcy5wZWVrRmllbGQoKSwgcHJlcGVuZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWR1Y2UoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgbGV0IGU6IEV4cHIgfCB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBlMTogRXhwciB8IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGUyOiBFeHByIHwgdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBvcDogRXhwclBhcnNlck9wZXJhdG9yID0gdGhpcy5vcGVyYXRvcnNbdGhpcy5vcGVyYXRvcnMubGVuZ3RoIC0gMV07XG4gICAgICAgIHN3aXRjaCAob3AudG9rKSB7XG4gICAgICAgICAgICBjYXNlIFRva2VuLm5vdDpcbiAgICAgICAgICAgICAgICAvLyBBcHBseSBFIDo9IE5PVCBFXG4gICAgICAgICAgICAgICAgZSA9IHRoaXMuZXhwcmVzc2lvbnMucG9wKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN5bnRheCBlcnJvclwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlLm5vdCA9ICFlLm5vdDtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cHJlc3Npb25zLnB1c2goZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRva2VuLmFuZDpcbiAgICAgICAgICAgICAgICBlMiA9IHRoaXMuZXhwcmVzc2lvbnMucG9wKCk7XG4gICAgICAgICAgICAgICAgZTEgPSB0aGlzLmV4cHJlc3Npb25zLnBvcCgpO1xuICAgICAgICAgICAgICAgIGlmICghZTEgfHwgIWUyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN5bnRheCBlcnJvclwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmV4cHJlc3Npb25zLnB1c2godGhpcy5tZXJnZUV4cHIoZTEsIGUyLCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRva2VuLm9yOlxuICAgICAgICAgICAgICAgIGUyID0gdGhpcy5leHByZXNzaW9ucy5wb3AoKTtcbiAgICAgICAgICAgICAgICBlMSA9IHRoaXMuZXhwcmVzc2lvbnMucG9wKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFlMSB8fCAhZTIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3ludGF4IGVycm9yXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvbnMucHVzaCh0aGlzLm1lcmdlRXhwcihlMSwgZTIsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRva2VuLm5lYXI6XG4gICAgICAgICAgICAgICAgZSA9IHRoaXMuZXhwcmVzc2lvbnMucG9wKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN5bnRheCBlcnJvclwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlLm5lYXIgPSBVdGlscy50b0ludCh0aGlzLmVuc3VyZU5lYXJWYWx1ZShvcC50b2tWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvbnMucHVzaChlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVG9rZW4uaW5maXhOZWFyOlxuICAgICAgICAgICAgICAgIGUyID0gdGhpcy5leHByZXNzaW9ucy5wb3AoKTtcbiAgICAgICAgICAgICAgICBlMSA9IHRoaXMuZXhwcmVzc2lvbnMucG9wKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFlMSB8fCAhZTIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3ludGF4IGVycm9yXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZTIuaXNMZWFmIHx8IGUyLmlzU3RydWN0dXJlZCB8fCAhZTEuaXNMZWFmIHx8IGUxLmlzU3RydWN0dXJlZCB8fCBlMi5ub3QgfHwgZTEubm90IHx8ICFVdGlscy5lcU5DKGUyLmZpZWxkIHx8IFwiXCIsIGUxLmZpZWxkIHx8IFwiXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN5bnRheCBlcnJvclwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlID0gbmV3IEV4cHIoe1xuICAgICAgICAgICAgICAgICAgICBleHByQ29udGV4dDogZTEuZXhwckNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgIG9wMTogZTEsXG4gICAgICAgICAgICAgICAgICAgIGFuZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG9wMjogZTIsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiB0aGlzLnBlZWtGaWVsZCgpLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiB0aGlzLnBlZWtEaXNwbGF5KClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBlLm5lYXIgPSBVdGlscy50b0ludCh0aGlzLmVuc3VyZU5lYXJWYWx1ZShvcC50b2tWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvbnMucHVzaChlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVG9rZW4uclBhcjpcbiAgICAgICAgICAgICAgICB0aGlzLm9wZXJhdG9ycy5wb3AoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWVsZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIm1pc3NpbmcgZmllbGRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhwcmVzc2lvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN5bnRheCBlcnJvclwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzLnBvcCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3BsYXkgPSB0aGlzLmRpc3BsYXlzLnBvcCgpO1xuICAgICAgICAgICAgICAgIC8vIFNldCBGaWVsZCBmb3Igc2luZ2xlIHRlcm0gYnJhY2tldGVkIGV4cHJlc3Npb25zXG4gICAgICAgICAgICAgICAgZSA9IHRoaXMuZXhwcmVzc2lvbnNbdGhpcy5leHByZXNzaW9ucy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAoZS5pc0xlYWYpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzLmlzRW1wdHkoZS5maWVsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuZmllbGQgPSBmaWVsZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbHMuaXNFbXB0eShlLmRpc3BsYXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLmRpc3BsYXkgPSBkaXNwbGF5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3BlcmF0b3JzLnBvcCgpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cbiJdfQ==