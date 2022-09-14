/* Dépendences fonctionnelles internes d'Angular */
import { Injectable } from "@angular/core";
import { FormControl, Validators, } from "@angular/forms";
/* Services */
import { Utils } from "@sinequa/core/base";
import { AppService, Expr, advancedFacetPrefix, } from "@sinequa/core/app-utils";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "@sinequa/components/search";
import * as i3 from "@sinequa/core/validation";
export class AdvancedService {
    constructor(appService, searchService, validationService, formatService, exprBuilder) {
        this.appService = appService;
        this.searchService = searchService;
        this.validationService = validationService;
        this.formatService = formatService;
        this.exprBuilder = exprBuilder;
        /**
         * Default form validators packaged within SBA to standardize advanced-search validation
         */
        this.validators = {
            min: (min, field) => this.validationService.minValidator(min, this._parser(field)),
            max: (max, field) => this.validationService.maxValidator(max, this._parser(field)),
            required: Validators.required,
            email: Validators.email,
            pattern: (pattern) => Validators.pattern(pattern),
            integer: (field) => this.validationService.integerValidator(this._parser(field)),
            number: (field) => this.validationService.numberValidator(this._parser(field)),
            date: (field) => this.validationService.dateValidator(this._parser(field)),
            range: (field) => this.validationService.rangeValidator(this._rangeType(field), this._parser(field)),
        };
    }
    /**
     * Return a standard FormControl compatible with a select component
     * @param field
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    createSelectControl(field, validators, asyncValidators, query = this.searchService.query) {
        const value = this.getValue(field, query);
        return this.createControl(value, validators, asyncValidators);
    }
    /**
     * Return a standard FormControl compatible with a range-input component
     * @param field
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    createRangeControl(field, validators, asyncValidators, query = this.searchService.query) {
        const value = this.getRangeValue(field, query);
        return this.createControl(value, validators, asyncValidators);
    }
    /**
     * Return a standard FormControl compatible with a text input component
     * @param field
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    createInputControl(field, validators, asyncValidators, query = this.searchService.query) {
        const value = this.getValue(field, query);
        return this.createControl(value, validators, asyncValidators);
    }
    /**
     * Return a standard FormControl compatible with a multi-value text input component
     * @param field
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    createMultiInputControl(field, validators, asyncValidators, query = this.searchService.query) {
        const value = this.getValue(field, query);
        return this.createControl(value, validators, asyncValidators);
    }
    /**
     * Return a standard FormControl compatible with a checkbox component
     * @param field
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    createCheckboxControl(field, validators, asyncValidators, query = this.searchService.query) {
        const value = this.getBooleanValue(field, query);
        return this.createControl(value, validators, asyncValidators);
    }
    /**
     * Reset the supplied AbstractControl (and its validation) and sets its value to undefined
     * @param control
     */
    resetControl(control) {
        control.reset();
        control.setValue(undefined);
    }
    /**
     * Reset the supplied AbstractControl (and its validation) and sets its value to [undefined, undefined]
     * @param control
     */
    resetRangeControl(control) {
        control.reset();
        control.setValue([undefined, undefined]);
    }
    /**
     * Retrieve the value (ValueItem | ValueItem[] | undefined) to be set to the FormControl from the Query
     * @param field
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    getValue(field, query = this.searchService.query) {
        const expr = this.getAdvancedExpr(field, query);
        if (expr) {
            const value = this.getValueFromExpr(expr);
            return this.formatValueItems(field, value);
        }
        return undefined;
    }
    /**
     * Retrieve the boolean value to be set to the FormControl from the Query
     * @param field
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    getBooleanValue(field, query = this.searchService.query) {
        const expr = this.getAdvancedExpr(field, query);
        if (expr) {
            const value = this.getValueFromExpr(expr);
            return this.formatAdvancedValue(field, value.value);
        }
        return undefined;
    }
    /**
     * Retrieve the range value to be set to the FormControl from the Query
     * @param field
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    getRangeValue(field, query = this.searchService.query) {
        const expr = this.getAdvancedExpr(field, query);
        if (expr) {
            const value = this.getValueFromExpr(expr);
            if (Utils.isArray(value)) {
                return value.map((e) => this.formatAdvancedValue(field, e.value));
            }
            else {
                const _value = this.formatAdvancedValue(field, value.value);
                if (expr.operator === 3 /* gte */) {
                    return [_value, undefined];
                }
                else if (expr.operator === 5 /* lte */) {
                    return [undefined, _value];
                }
            }
        }
        return [undefined, undefined];
    }
    /**
     * Return the select expression of an advanced filter
     * @param field
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    getAdvancedExpr(field, query = this.searchService.query) {
        var _a;
        let expr;
        const expression = (_a = query.findSelect(advancedFacetPrefix + field)) === null || _a === void 0 ? void 0 : _a.expression;
        if (expression) {
            expr = this.appService.parseExpr(expression);
            if (expr instanceof Expr) {
                return expr;
            }
        }
        return undefined;
    }
    /**
     * Extract values from an expression
     * @param expr
     */
    getValueFromExpr(expr) {
        var _a;
        let value;
        if (Utils.isString(expr.value) && expr.value.indexOf("[") > -1) {
            value = JSON.parse(expr.value.replace(/`/g, '"')).map((e) => ({
                value: e.value,
                display: !!e.display ? e.display : e.value,
            }));
        }
        else if (((_a = expr.operands) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            value = expr.operands.map((e) => ({
                value: e.value,
                display: !!e.display ? e.display : e.value,
            }));
        }
        if (!value) {
            if (expr.values && expr.values.length > 1) {
                value = expr.values.map((e) => ({ value: e, display: e }));
            }
            else {
                value = {
                    value: expr.value,
                    display: !!expr.display ? expr.display : expr.value,
                };
            }
        }
        return value;
    }
    /**
     * Sets a select on a query (defaults to searchService.query) for a given
     * field and value(s)
     * @param field
     * @param value
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     * @param combineWithAnd
     */
    setSelect(field, value, query, combineWithAnd) {
        let expr;
        if (value !== undefined) {
            const _value = this.asValueItems(value, field);
            if (combineWithAnd) {
                expr = this.exprBuilder.makeAndExpr(field, _value);
            }
            else {
                expr = this.exprBuilder.makeOrExpr(field, _value);
            }
        }
        // When expr is not defined, this simply removes the selection
        this.setAdvancedSelect(field, expr, query);
    }
    /**
     * Sets a select on a query (defaults to searchService.query) for a given
     * field and a boolean value
     * @param field
     * @param value
     * @param discardFalsy by default it is 'false', so a false value is used to be undefined
     * @param query
     */
    setBooleanSelect(field, value, allowFalsy = false, query) {
        let expr;
        if (value === true || (value === false && allowFalsy)) {
            expr = this.exprBuilder.makeBooleanExpr(field, value);
        }
        // When expr is not defined, this simply removes the selection
        this.setAdvancedSelect(field, expr, query);
    }
    /**
     * Sets a select on a query (defaults to searchService.query) for a given
     * field, operator and value
     * @param field
     * @param value
     * @param operator
     * @param query
     */
    setNumericalSelect(field, value, operator, query) {
        let expr;
        if (value !== undefined) {
            if (this._isValueItem(value)) {
                value = value.value;
            }
            value = this.parse(value, field);
            expr = this.exprBuilder.makeNumericalExpr(field, operator, value);
        }
        // When expr is not defined, this simply removes the selection
        this.setAdvancedSelect(field, expr, query);
    }
    /**
     * Sets a select on a query (defaults to searchService.query) for a given
     * field and range of values
     * @param field
     * @param range
     * @param query
     */
    setRangeSelect(field, range, query) {
        let expr;
        if (range && range.length === 2) {
            const from = this.parse(range[0] || undefined, field);
            const to = this.parse(range[1] || undefined, field);
            if (from && to) {
                expr = this.exprBuilder.makeRangeExpr(field, from, to);
            }
            else if (from) {
                expr = this.exprBuilder.makeNumericalExpr(field, ">=", from);
            }
            else if (to) {
                expr = this.exprBuilder.makeNumericalExpr(field, "<=", to);
            }
        }
        // When expr is not defined, this simply removes the selection
        this.setAdvancedSelect(field, expr, query);
    }
    /**
     * Sets a select for a given field and expression on the query (defaults to searchService.query)
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     * @param field
     * @param expr
     */
    setAdvancedSelect(field, expr, query = this.searchService.query) {
        query.removeSelect(advancedFacetPrefix + field);
        if (expr) {
            query.addSelect(expr, advancedFacetPrefix + field);
        }
    }
    /**
     * Remove a specific advanced value by its field name.
     * By default, Trigger search() action
     * @param field
     * @param query Query from which will remove the specific advanced value, if omitted, use searchService.query
     * @param search
     */
    removeAdvancedValue(field, search = true, query = this.searchService.query) {
        if (field) {
            query.removeSelect(advancedFacetPrefix + field);
            this.searchService.setQuery(query, false);
            if (search) {
                this.searchService.search();
            }
        }
    }
    /**
     * Remove all related advanced-search select(s) from a given query and update searchService.query accordingly
     * By default, Trigger search() action
     * @param query Query from which will remove all advanced values, if omitted, use searchService.query
     * @param search
     */
    resetAdvancedValues(search = true, query = this.searchService.query) {
        this.searchService.setQuery(query.toStandard(), false);
        if (search) {
            this.searchService.search();
        }
    }
    /**
     * Transforms a value to a parsed ValueItem[]
     * @param value
     * @param field
     */
    asValueItems(value, field) {
        if (this._isValueItemArray(value)) {
            return value.map((val) => ({
                value: this.parse(val.value, field),
                display: val.display,
            }));
        }
        return [
            {
                value: this.parse(value.value, field),
                display: value.display,
            },
        ];
    }
    formatValueItems(field, value) {
        if (this._isValueItemArray(value)) {
            return value.map((val) => this.formatValueItem(field, val));
        }
        return this.formatValueItem(field, value);
    }
    /**
     * Format the display property of the ValueItem according its related column definition
     * @param field
     * @param value
     */
    formatValueItem(field, value) {
        const column = this.appService.getColumn(field);
        if (column) {
            value.display = this.formatBaseAdvancedValue(value.display, column).toString();
        }
        return value;
    }
    /**
     * Format a given advanced value according to its column definition
     * @param field
     * @param value
     */
    formatAdvancedValue(field, value) {
        if (value) {
            const column = this.appService.getColumn(field);
            if (column) {
                if (Utils.isArray(value)) {
                    return value.map((v) => v ? this.formatBaseAdvancedValue(v, column) : v);
                }
                return this.formatBaseAdvancedValue(value, column);
            }
        }
        return value;
    }
    formatBaseAdvancedValue(value, column) {
        if (value) {
            value = this.castAdvancedValue(value, column);
            return column.formatter ? this.formatService.formatValue(value, column) : value;
        }
        return value;
    }
    /**
     * Cast a given value as per its column definition
     * @param value
     * @param column
     */
    castAdvancedValue(value, column) {
        if (column) {
            if (Utils.isString(value)) {
                if (AppService.isDate(column)) {
                    value = Utils.toDate(value);
                }
                else if (AppService.isInteger(column)) {
                    if (Utils.testInteger(value)) {
                        value = Utils.toInt(value);
                    }
                }
                else if (AppService.isDouble(column)) {
                    if (Utils.testFloat(value)) {
                        value = Utils.toNumber(value);
                    }
                }
                else if (AppService.isBoolean(column)) {
                    value = Utils.isTrue(value);
                }
            }
        }
        return value;
    }
    /**
     * Create a generic FormControl
     * @param value value of the FormControl
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     */
    createControl(value, validators, asyncValidators) {
        return new FormControl({
            value,
            disabled: false,
        }, {
            validators: !!validators ? validators : [],
            asyncValidators: !!asyncValidators ? asyncValidators : [],
            updateOn: "change",
        });
    }
    /**
     * Parse a value according to its column definition
     * @param value
     * @param field
     */
    parse(value, field) {
        const parser = this._parser(field);
        if (parser && Utils.isString(value)) {
            return this.formatService.parseValue(value, parser);
        }
        return value;
    }
    /**
     * Return the parser if existing in the given field
     * @param field
     */
    _parser(field) {
        const column = this.appService.getColumn(field);
        return column ? column.parser : undefined;
    }
    _rangeType(field) {
        const column = this.appService.getColumn(field);
        let rangeType;
        if (column &&
            (AppService.isInteger(column) || AppService.isDouble(column))) {
            rangeType = 0;
        }
        else if (column && AppService.isDate(column)) {
            rangeType = new Date();
        }
        else {
            rangeType = "";
        }
        return rangeType;
    }
    /**
     * Return `true` if the passed value is an `ValueItem[]`
     */
    _isValueItemArray(value) {
        if (Utils.isArray(value)) {
            const condition = (element) => this._isValueItem(element);
            return value.every(condition);
        }
        return false;
    }
    /**
     * Return `true` if the passed value is an `ValueItem`
     */
    _isValueItem(value) {
        if (Utils.isObject(value) &&
            !Utils.isArray(value) &&
            !Utils.isDate(value)) {
            if (value.hasOwnProperty("value")) {
                return true;
            }
        }
        return false;
    }
}
AdvancedService.ɵfac = function AdvancedService_Factory(t) { return new (t || AdvancedService)(i0.ɵɵinject(i1.AppService), i0.ɵɵinject(i2.SearchService), i0.ɵɵinject(i3.ValidationService), i0.ɵɵinject(i1.FormatService), i0.ɵɵinject(i1.ExprBuilder)); };
AdvancedService.ɵprov = i0.ɵɵdefineInjectable({ token: AdvancedService, factory: AdvancedService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AdvancedService, [{
        type: Injectable,
        args: [{
                providedIn: "root",
            }]
    }], function () { return [{ type: i1.AppService }, { type: i2.SearchService }, { type: i3.ValidationService }, { type: i1.FormatService }, { type: i1.ExprBuilder }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2YW5jZWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2FkdmFuY2VkLyIsInNvdXJjZXMiOlsiYWR2YW5jZWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxtREFBbUQ7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQ0gsV0FBVyxFQUdYLFVBQVUsR0FFYixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLGNBQWM7QUFDZCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFM0MsT0FBTyxFQUNILFVBQVUsRUFDVixJQUFJLEVBSUosbUJBQW1CLEdBR3RCLE1BQU0seUJBQXlCLENBQUM7Ozs7O0FBNkJqQyxNQUFNLE9BQU8sZUFBZTtJQXlCeEIsWUFDVyxVQUFzQixFQUN0QixhQUE0QixFQUM1QixpQkFBb0MsRUFDcEMsYUFBNEIsRUFDNUIsV0FBd0I7UUFKeEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBN0JuQzs7V0FFRztRQUNhLGVBQVUsR0FBMkI7WUFDakQsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQ2hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQ2hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7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S0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDL0IsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7OEVBM21CUSxlQUFlO3VEQUFmLGVBQWUsV0FBZixlQUFlLG1CQUZaLE1BQU07a0RBRVQsZUFBZTtjQUgzQixVQUFVO2VBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBEw6lwZW5kZW5jZXMgZm9uY3Rpb25uZWxsZXMgaW50ZXJuZXMgZCdBbmd1bGFyICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gICAgRm9ybUNvbnRyb2wsXG4gICAgVmFsaWRhdG9yRm4sXG4gICAgQXN5bmNWYWxpZGF0b3JGbixcbiAgICBWYWxpZGF0b3JzLFxuICAgIEFic3RyYWN0Q29udHJvbCxcbn0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5cbi8qIFNlcnZpY2VzICovXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9zZWFyY2hcIjtcbmltcG9ydCB7XG4gICAgQXBwU2VydmljZSxcbiAgICBFeHByLFxuICAgIEV4cHJPcGVyYXRvcixcbiAgICBGb3JtYXRTZXJ2aWNlLFxuICAgIFF1ZXJ5LFxuICAgIGFkdmFuY2VkRmFjZXRQcmVmaXgsXG4gICAgRXhwckJ1aWxkZXIsXG4gICAgVmFsdWVJdGVtLFxufSBmcm9tIFwiQHNpbmVxdWEvY29yZS9hcHAtdXRpbHNcIjtcbmltcG9ydCB7IFZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvdmFsaWRhdGlvblwiO1xuaW1wb3J0IHsgQ0NDb2x1bW4gfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcblxuLyoqXG4gKiBEZWZpbmVzIHRoZSBwb3NzaWJsZSBiYXNpYyB0eXBlcyBvZiBhbiBhZHZhbmNlZCB2YWx1ZVxuICovXG5leHBvcnQgdHlwZSBCYXNlQWR2YW5jZWRWYWx1ZSA9IHN0cmluZyB8IG51bWJlciB8IERhdGUgfCBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4vKipcbiAqIERlZmluZXMgYW4gYWR2YW5jZWQgdmFsdWUgdHlwZSBhcyBlaXRoZXIgYSBzaW5nbGUgYmFzaWMgYWR2YW5jZWQgdmFsdWUgb3IgYW4gYXJyYXkgb2YgYmFzaWMgYWR2YW5jZWQgdmFsdWVzXG4gKi9cbmV4cG9ydCB0eXBlIEFkdmFuY2VkVmFsdWUgPSBCYXNlQWR2YW5jZWRWYWx1ZSB8IEJhc2VBZHZhbmNlZFZhbHVlW107XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWR2YW5jZWRGb3JtVmFsaWRhdG9ycyB7XG4gICAgbWluOiAobWluOiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlLCBmaWVsZDogc3RyaW5nKSA9PiBWYWxpZGF0b3JGbjtcbiAgICBtYXg6IChtYXg6IHN0cmluZyB8IG51bWJlciB8IERhdGUsIGZpZWxkOiBzdHJpbmcpID0+IFZhbGlkYXRvckZuO1xuICAgIHJlcXVpcmVkOiBWYWxpZGF0b3JGbjtcbiAgICBlbWFpbDogVmFsaWRhdG9yRm47XG4gICAgcGF0dGVybjogKHBhdHRlcm46IHN0cmluZyB8IFJlZ0V4cCkgPT4gVmFsaWRhdG9yRm47XG4gICAgaW50ZWdlcjogKGZpZWxkOiBzdHJpbmcpID0+IFZhbGlkYXRvckZuO1xuICAgIG51bWJlcjogKGZpZWxkOiBzdHJpbmcpID0+IFZhbGlkYXRvckZuO1xuICAgIGRhdGU6IChmaWVsZDogc3RyaW5nKSA9PiBWYWxpZGF0b3JGbjtcbiAgICByYW5nZTogKGZpZWxkOiBzdHJpbmcpID0+IFZhbGlkYXRvckZuO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogXCJyb290XCIsXG59KVxuZXhwb3J0IGNsYXNzIEFkdmFuY2VkU2VydmljZSB7XG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBmb3JtIHZhbGlkYXRvcnMgcGFja2FnZWQgd2l0aGluIFNCQSB0byBzdGFuZGFyZGl6ZSBhZHZhbmNlZC1zZWFyY2ggdmFsaWRhdGlvblxuICAgICAqL1xuICAgIHB1YmxpYyByZWFkb25seSB2YWxpZGF0b3JzOiBBZHZhbmNlZEZvcm1WYWxpZGF0b3JzID0ge1xuICAgICAgICBtaW46IChtaW4sIGZpZWxkKSA9PlxuICAgICAgICAgICAgdGhpcy52YWxpZGF0aW9uU2VydmljZS5taW5WYWxpZGF0b3IobWluLCB0aGlzLl9wYXJzZXIoZmllbGQpKSxcbiAgICAgICAgbWF4OiAobWF4LCBmaWVsZCkgPT5cbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGlvblNlcnZpY2UubWF4VmFsaWRhdG9yKG1heCwgdGhpcy5fcGFyc2VyKGZpZWxkKSksXG4gICAgICAgIHJlcXVpcmVkOiBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICBlbWFpbDogVmFsaWRhdG9ycy5lbWFpbCxcbiAgICAgICAgcGF0dGVybjogKHBhdHRlcm46IHN0cmluZyB8IFJlZ0V4cCkgPT4gVmFsaWRhdG9ycy5wYXR0ZXJuKHBhdHRlcm4pLFxuICAgICAgICBpbnRlZ2VyOiAoZmllbGQpID0+XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRpb25TZXJ2aWNlLmludGVnZXJWYWxpZGF0b3IodGhpcy5fcGFyc2VyKGZpZWxkKSksXG4gICAgICAgIG51bWJlcjogKGZpZWxkKSA9PlxuICAgICAgICAgICAgdGhpcy52YWxpZGF0aW9uU2VydmljZS5udW1iZXJWYWxpZGF0b3IodGhpcy5fcGFyc2VyKGZpZWxkKSksXG4gICAgICAgIGRhdGU6IChmaWVsZCkgPT5cbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGlvblNlcnZpY2UuZGF0ZVZhbGlkYXRvcih0aGlzLl9wYXJzZXIoZmllbGQpKSxcbiAgICAgICAgcmFuZ2U6IChmaWVsZCkgPT5cbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGlvblNlcnZpY2UucmFuZ2VWYWxpZGF0b3IoXG4gICAgICAgICAgICAgICAgdGhpcy5fcmFuZ2VUeXBlKGZpZWxkKSxcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJzZXIoZmllbGQpXG4gICAgICAgICAgICApLFxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGFwcFNlcnZpY2U6IEFwcFNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgdmFsaWRhdGlvblNlcnZpY2U6IFZhbGlkYXRpb25TZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgZm9ybWF0U2VydmljZTogRm9ybWF0U2VydmljZSxcbiAgICAgICAgcHVibGljIGV4cHJCdWlsZGVyOiBFeHByQnVpbGRlclxuICAgICkge31cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIHN0YW5kYXJkIEZvcm1Db250cm9sIGNvbXBhdGlibGUgd2l0aCBhIHNlbGVjdCBjb21wb25lbnRcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKiBAcGFyYW0gdmFsaWRhdG9ycyBvcHRpb25hbCB2YWxpZGF0b3JzIHRvIGJlIGFkZGVkIHRvIHRoZSByZXR1cm5lZCBGb3JtQ29udHJvbFxuICAgICAqIEBwYXJhbSBhc3luY1ZhbGlkYXRvcnMgb3B0aW9uYWwgYXN5bmNWYWxpZGF0b3JzIHRvIGJlIGFkZGVkIHRvIHRoZSByZXR1cm5lZCBGb3JtQ29udHJvbFxuICAgICAqIEBwYXJhbSBxdWVyeSBRdWVyeSB3aGVyZSB0byBmZXRjaCBhZHZhbmNlZCB2YWx1ZXMsIGlmIG9taXR0ZWQsIHVzZSBzZWFyY2hTZXJ2aWNlLnF1ZXJ5XG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZVNlbGVjdENvbnRyb2woXG4gICAgICAgIGZpZWxkOiBzdHJpbmcsXG4gICAgICAgIHZhbGlkYXRvcnM/OiBWYWxpZGF0b3JGbltdLFxuICAgICAgICBhc3luY1ZhbGlkYXRvcnM/OiBBc3luY1ZhbGlkYXRvckZuW10sXG4gICAgICAgIHF1ZXJ5ID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnF1ZXJ5XG4gICAgKTogRm9ybUNvbnRyb2wge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoZmllbGQsIHF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQ29udHJvbCh2YWx1ZSwgdmFsaWRhdG9ycywgYXN5bmNWYWxpZGF0b3JzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBzdGFuZGFyZCBGb3JtQ29udHJvbCBjb21wYXRpYmxlIHdpdGggYSByYW5nZS1pbnB1dCBjb21wb25lbnRcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKiBAcGFyYW0gdmFsaWRhdG9ycyBvcHRpb25hbCB2YWxpZGF0b3JzIHRvIGJlIGFkZGVkIHRvIHRoZSByZXR1cm5lZCBGb3JtQ29udHJvbFxuICAgICAqIEBwYXJhbSBhc3luY1ZhbGlkYXRvcnMgb3B0aW9uYWwgYXN5bmNWYWxpZGF0b3JzIHRvIGJlIGFkZGVkIHRvIHRoZSByZXR1cm5lZCBGb3JtQ29udHJvbFxuICAgICAqIEBwYXJhbSBxdWVyeSBRdWVyeSB3aGVyZSB0byBmZXRjaCBhZHZhbmNlZCB2YWx1ZXMsIGlmIG9taXR0ZWQsIHVzZSBzZWFyY2hTZXJ2aWNlLnF1ZXJ5XG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZVJhbmdlQ29udHJvbChcbiAgICAgICAgZmllbGQ6IHN0cmluZyxcbiAgICAgICAgdmFsaWRhdG9ycz86IFZhbGlkYXRvckZuW10sXG4gICAgICAgIGFzeW5jVmFsaWRhdG9ycz86IEFzeW5jVmFsaWRhdG9yRm5bXSxcbiAgICAgICAgcXVlcnkgPSB0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnlcbiAgICApOiBGb3JtQ29udHJvbCB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRSYW5nZVZhbHVlKGZpZWxkLCBxdWVyeSk7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUNvbnRyb2wodmFsdWUsIHZhbGlkYXRvcnMsIGFzeW5jVmFsaWRhdG9ycyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgc3RhbmRhcmQgRm9ybUNvbnRyb2wgY29tcGF0aWJsZSB3aXRoIGEgdGV4dCBpbnB1dCBjb21wb25lbnRcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKiBAcGFyYW0gdmFsaWRhdG9ycyBvcHRpb25hbCB2YWxpZGF0b3JzIHRvIGJlIGFkZGVkIHRvIHRoZSByZXR1cm5lZCBGb3JtQ29udHJvbFxuICAgICAqIEBwYXJhbSBhc3luY1ZhbGlkYXRvcnMgb3B0aW9uYWwgYXN5bmNWYWxpZGF0b3JzIHRvIGJlIGFkZGVkIHRvIHRoZSByZXR1cm5lZCBGb3JtQ29udHJvbFxuICAgICAqIEBwYXJhbSBxdWVyeSBRdWVyeSB3aGVyZSB0byBmZXRjaCBhZHZhbmNlZCB2YWx1ZXMsIGlmIG9taXR0ZWQsIHVzZSBzZWFyY2hTZXJ2aWNlLnF1ZXJ5XG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZUlucHV0Q29udHJvbChcbiAgICAgICAgZmllbGQ6IHN0cmluZyxcbiAgICAgICAgdmFsaWRhdG9ycz86IFZhbGlkYXRvckZuW10sXG4gICAgICAgIGFzeW5jVmFsaWRhdG9ycz86IEFzeW5jVmFsaWRhdG9yRm5bXSxcbiAgICAgICAgcXVlcnkgPSB0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnlcbiAgICApOiBGb3JtQ29udHJvbCB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZShmaWVsZCwgcXVlcnkpO1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVDb250cm9sKHZhbHVlLCB2YWxpZGF0b3JzLCBhc3luY1ZhbGlkYXRvcnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIHN0YW5kYXJkIEZvcm1Db250cm9sIGNvbXBhdGlibGUgd2l0aCBhIG11bHRpLXZhbHVlIHRleHQgaW5wdXQgY29tcG9uZW50XG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICogQHBhcmFtIHZhbGlkYXRvcnMgb3B0aW9uYWwgdmFsaWRhdG9ycyB0byBiZSBhZGRlZCB0byB0aGUgcmV0dXJuZWQgRm9ybUNvbnRyb2xcbiAgICAgKiBAcGFyYW0gYXN5bmNWYWxpZGF0b3JzIG9wdGlvbmFsIGFzeW5jVmFsaWRhdG9ycyB0byBiZSBhZGRlZCB0byB0aGUgcmV0dXJuZWQgRm9ybUNvbnRyb2xcbiAgICAgKiBAcGFyYW0gcXVlcnkgUXVlcnkgd2hlcmUgdG8gZmV0Y2ggYWR2YW5jZWQgdmFsdWVzLCBpZiBvbWl0dGVkLCB1c2Ugc2VhcmNoU2VydmljZS5xdWVyeVxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGVNdWx0aUlucHV0Q29udHJvbChcbiAgICAgICAgZmllbGQ6IHN0cmluZyxcbiAgICAgICAgdmFsaWRhdG9ycz86IFZhbGlkYXRvckZuW10sXG4gICAgICAgIGFzeW5jVmFsaWRhdG9ycz86IEFzeW5jVmFsaWRhdG9yRm5bXSxcbiAgICAgICAgcXVlcnkgPSB0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnlcbiAgICApOiBGb3JtQ29udHJvbCB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZShmaWVsZCwgcXVlcnkpO1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVDb250cm9sKHZhbHVlLCB2YWxpZGF0b3JzLCBhc3luY1ZhbGlkYXRvcnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIHN0YW5kYXJkIEZvcm1Db250cm9sIGNvbXBhdGlibGUgd2l0aCBhIGNoZWNrYm94IGNvbXBvbmVudFxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JzIG9wdGlvbmFsIHZhbGlkYXRvcnMgdG8gYmUgYWRkZWQgdG8gdGhlIHJldHVybmVkIEZvcm1Db250cm9sXG4gICAgICogQHBhcmFtIGFzeW5jVmFsaWRhdG9ycyBvcHRpb25hbCBhc3luY1ZhbGlkYXRvcnMgdG8gYmUgYWRkZWQgdG8gdGhlIHJldHVybmVkIEZvcm1Db250cm9sXG4gICAgICogQHBhcmFtIHF1ZXJ5IFF1ZXJ5IHdoZXJlIHRvIGZldGNoIGFkdmFuY2VkIHZhbHVlcywgaWYgb21pdHRlZCwgdXNlIHNlYXJjaFNlcnZpY2UucXVlcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlQ2hlY2tib3hDb250cm9sKFxuICAgICAgICBmaWVsZDogc3RyaW5nLFxuICAgICAgICB2YWxpZGF0b3JzPzogVmFsaWRhdG9yRm5bXSxcbiAgICAgICAgYXN5bmNWYWxpZGF0b3JzPzogQXN5bmNWYWxpZGF0b3JGbltdLFxuICAgICAgICBxdWVyeSA9IHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeVxuICAgICk6IEZvcm1Db250cm9sIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldEJvb2xlYW5WYWx1ZShmaWVsZCwgcXVlcnkpO1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVDb250cm9sKHZhbHVlLCB2YWxpZGF0b3JzLCBhc3luY1ZhbGlkYXRvcnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0IHRoZSBzdXBwbGllZCBBYnN0cmFjdENvbnRyb2wgKGFuZCBpdHMgdmFsaWRhdGlvbikgYW5kIHNldHMgaXRzIHZhbHVlIHRvIHVuZGVmaW5lZFxuICAgICAqIEBwYXJhbSBjb250cm9sXG4gICAgICovXG4gICAgcHVibGljIHJlc2V0Q29udHJvbChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICAgICAgY29udHJvbC5yZXNldCgpO1xuICAgICAgICBjb250cm9sLnNldFZhbHVlKHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXQgdGhlIHN1cHBsaWVkIEFic3RyYWN0Q29udHJvbCAoYW5kIGl0cyB2YWxpZGF0aW9uKSBhbmQgc2V0cyBpdHMgdmFsdWUgdG8gW3VuZGVmaW5lZCwgdW5kZWZpbmVkXVxuICAgICAqIEBwYXJhbSBjb250cm9sXG4gICAgICovXG4gICAgcHVibGljIHJlc2V0UmFuZ2VDb250cm9sKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkge1xuICAgICAgICBjb250cm9sLnJlc2V0KCk7XG4gICAgICAgIGNvbnRyb2wuc2V0VmFsdWUoW3VuZGVmaW5lZCwgdW5kZWZpbmVkXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmUgdGhlIHZhbHVlIChWYWx1ZUl0ZW0gfCBWYWx1ZUl0ZW1bXSB8IHVuZGVmaW5lZCkgdG8gYmUgc2V0IHRvIHRoZSBGb3JtQ29udHJvbCBmcm9tIHRoZSBRdWVyeVxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqIEBwYXJhbSBxdWVyeSBRdWVyeSB3aGVyZSB0byBmZXRjaCBhZHZhbmNlZCB2YWx1ZXMsIGlmIG9taXR0ZWQsIHVzZSBzZWFyY2hTZXJ2aWNlLnF1ZXJ5XG4gICAgICovXG4gICAgcHVibGljIGdldFZhbHVlKFxuICAgICAgICBmaWVsZDogc3RyaW5nLFxuICAgICAgICBxdWVyeSA9IHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeVxuICAgICk6IFZhbHVlSXRlbSB8IFZhbHVlSXRlbVtdIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgY29uc3QgZXhwciA9IHRoaXMuZ2V0QWR2YW5jZWRFeHByKGZpZWxkLCBxdWVyeSk7XG4gICAgICAgIGlmIChleHByKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWVGcm9tRXhwcihleHByKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFZhbHVlSXRlbXMoZmllbGQsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIHRoZSBib29sZWFuIHZhbHVlIHRvIGJlIHNldCB0byB0aGUgRm9ybUNvbnRyb2wgZnJvbSB0aGUgUXVlcnlcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKiBAcGFyYW0gcXVlcnkgUXVlcnkgd2hlcmUgdG8gZmV0Y2ggYWR2YW5jZWQgdmFsdWVzLCBpZiBvbWl0dGVkLCB1c2Ugc2VhcmNoU2VydmljZS5xdWVyeVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRCb29sZWFuVmFsdWUoXG4gICAgICAgIGZpZWxkOiBzdHJpbmcsXG4gICAgICAgIHF1ZXJ5ID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnF1ZXJ5XG4gICAgKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGNvbnN0IGV4cHIgPSB0aGlzLmdldEFkdmFuY2VkRXhwcihmaWVsZCwgcXVlcnkpO1xuICAgICAgICBpZiAoZXhwcikge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlRnJvbUV4cHIoZXhwcikgYXMgVmFsdWVJdGVtO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0QWR2YW5jZWRWYWx1ZShmaWVsZCwgdmFsdWUudmFsdWUgYXMgYm9vbGVhbikgYXMgYm9vbGVhbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIHRoZSByYW5nZSB2YWx1ZSB0byBiZSBzZXQgdG8gdGhlIEZvcm1Db250cm9sIGZyb20gdGhlIFF1ZXJ5XG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICogQHBhcmFtIHF1ZXJ5IFF1ZXJ5IHdoZXJlIHRvIGZldGNoIGFkdmFuY2VkIHZhbHVlcywgaWYgb21pdHRlZCwgdXNlIHNlYXJjaFNlcnZpY2UucXVlcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UmFuZ2VWYWx1ZShcbiAgICAgICAgZmllbGQ6IHN0cmluZyxcbiAgICAgICAgcXVlcnkgPSB0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnlcbiAgICApOiBBZHZhbmNlZFZhbHVlIHtcbiAgICAgICAgY29uc3QgZXhwciA9IHRoaXMuZ2V0QWR2YW5jZWRFeHByKGZpZWxkLCBxdWVyeSk7XG4gICAgICAgIGlmIChleHByKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWVGcm9tRXhwcihleHByKTtcbiAgICAgICAgICAgIGlmIChVdGlscy5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5tYXAoKGUpID0+XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybWF0QWR2YW5jZWRWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZS52YWx1ZSBhcyBzdHJpbmcgfCBEYXRlIHwgbnVtYmVyXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApIGFzIEFkdmFuY2VkVmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IF92YWx1ZSA9IHRoaXMuZm9ybWF0QWR2YW5jZWRWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLnZhbHVlIGFzIHN0cmluZyB8IERhdGUgfCBudW1iZXJcbiAgICAgICAgICAgICAgICApIGFzIEJhc2VBZHZhbmNlZFZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChleHByLm9wZXJhdG9yID09PSBFeHByT3BlcmF0b3IuZ3RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbX3ZhbHVlLCB1bmRlZmluZWRdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXhwci5vcGVyYXRvciA9PT0gRXhwck9wZXJhdG9yLmx0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW3VuZGVmaW5lZCwgX3ZhbHVlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt1bmRlZmluZWQsIHVuZGVmaW5lZF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBzZWxlY3QgZXhwcmVzc2lvbiBvZiBhbiBhZHZhbmNlZCBmaWx0ZXJcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKiBAcGFyYW0gcXVlcnkgUXVlcnkgd2hlcmUgdG8gZmV0Y2ggYWR2YW5jZWQgdmFsdWVzLCBpZiBvbWl0dGVkLCB1c2Ugc2VhcmNoU2VydmljZS5xdWVyeVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRBZHZhbmNlZEV4cHIoXG4gICAgICAgIGZpZWxkOiBzdHJpbmcsXG4gICAgICAgIHF1ZXJ5ID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnF1ZXJ5XG4gICAgKTogRXhwciB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGxldCBleHByOiBFeHByIHwgc3RyaW5nO1xuICAgICAgICBjb25zdCBleHByZXNzaW9uID0gcXVlcnkuZmluZFNlbGVjdChhZHZhbmNlZEZhY2V0UHJlZml4ICsgZmllbGQpXG4gICAgICAgICAgICA/LmV4cHJlc3Npb247XG4gICAgICAgIGlmIChleHByZXNzaW9uKSB7XG4gICAgICAgICAgICBleHByID0gdGhpcy5hcHBTZXJ2aWNlLnBhcnNlRXhwcihleHByZXNzaW9uKTtcbiAgICAgICAgICAgIGlmIChleHByIGluc3RhbmNlb2YgRXhwcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBleHByO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXh0cmFjdCB2YWx1ZXMgZnJvbSBhbiBleHByZXNzaW9uXG4gICAgICogQHBhcmFtIGV4cHJcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0VmFsdWVGcm9tRXhwcihleHByOiBFeHByKTogVmFsdWVJdGVtIHwgVmFsdWVJdGVtW10ge1xuICAgICAgICBsZXQgdmFsdWU6IFZhbHVlSXRlbSB8IFZhbHVlSXRlbVtdIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAoVXRpbHMuaXNTdHJpbmcoZXhwci52YWx1ZSkgJiYgZXhwci52YWx1ZS5pbmRleE9mKFwiW1wiKSA+IC0xKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UoZXhwci52YWx1ZS5yZXBsYWNlKC9gL2csICdcIicpKS5tYXAoKGUpID0+ICh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGUudmFsdWUhLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICEhZS5kaXNwbGF5ID8gZS5kaXNwbGF5IDogZS52YWx1ZSxcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSBlbHNlIGlmIChleHByLm9wZXJhbmRzPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGV4cHIub3BlcmFuZHMubWFwKChlKSA9PiAoe1xuICAgICAgICAgICAgICAgIHZhbHVlOiBlLnZhbHVlISxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAhIWUuZGlzcGxheSA/IGUuZGlzcGxheSA6IGUudmFsdWUsXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKGV4cHIudmFsdWVzICYmIGV4cHIudmFsdWVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGV4cHIudmFsdWVzLm1hcCgoZSkgPT4gKHsgdmFsdWU6IGUsIGRpc3BsYXk6IGUgfSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGV4cHIudmFsdWUhLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAhIWV4cHIuZGlzcGxheSA/IGV4cHIuZGlzcGxheSA6IGV4cHIudmFsdWUsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhIHNlbGVjdCBvbiBhIHF1ZXJ5IChkZWZhdWx0cyB0byBzZWFyY2hTZXJ2aWNlLnF1ZXJ5KSBmb3IgYSBnaXZlblxuICAgICAqIGZpZWxkIGFuZCB2YWx1ZShzKVxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSBxdWVyeSBRdWVyeSB3aGVyZSB0byBmZXRjaCBhZHZhbmNlZCB2YWx1ZXMsIGlmIG9taXR0ZWQsIHVzZSBzZWFyY2hTZXJ2aWNlLnF1ZXJ5XG4gICAgICogQHBhcmFtIGNvbWJpbmVXaXRoQW5kXG4gICAgICovXG4gICAgcHVibGljIHNldFNlbGVjdChcbiAgICAgICAgZmllbGQ6IHN0cmluZyxcbiAgICAgICAgdmFsdWU6IFZhbHVlSXRlbSB8IFZhbHVlSXRlbVtdIHwgdW5kZWZpbmVkLFxuICAgICAgICBxdWVyeT86IFF1ZXJ5LFxuICAgICAgICBjb21iaW5lV2l0aEFuZD86IGJvb2xlYW5cbiAgICApIHtcbiAgICAgICAgbGV0IGV4cHI7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBfdmFsdWUgPSB0aGlzLmFzVmFsdWVJdGVtcyh2YWx1ZSwgZmllbGQpO1xuICAgICAgICAgICAgaWYgKGNvbWJpbmVXaXRoQW5kKSB7XG4gICAgICAgICAgICAgICAgZXhwciA9IHRoaXMuZXhwckJ1aWxkZXIubWFrZUFuZEV4cHIoZmllbGQsIF92YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLmV4cHJCdWlsZGVyLm1ha2VPckV4cHIoZmllbGQsIF92YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2hlbiBleHByIGlzIG5vdCBkZWZpbmVkLCB0aGlzIHNpbXBseSByZW1vdmVzIHRoZSBzZWxlY3Rpb25cbiAgICAgICAgdGhpcy5zZXRBZHZhbmNlZFNlbGVjdChmaWVsZCwgZXhwciwgcXVlcnkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgYSBzZWxlY3Qgb24gYSBxdWVyeSAoZGVmYXVsdHMgdG8gc2VhcmNoU2VydmljZS5xdWVyeSkgZm9yIGEgZ2l2ZW5cbiAgICAgKiBmaWVsZCBhbmQgYSBib29sZWFuIHZhbHVlXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIGRpc2NhcmRGYWxzeSBieSBkZWZhdWx0IGl0IGlzICdmYWxzZScsIHNvIGEgZmFsc2UgdmFsdWUgaXMgdXNlZCB0byBiZSB1bmRlZmluZWRcbiAgICAgKiBAcGFyYW0gcXVlcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0Qm9vbGVhblNlbGVjdChcbiAgICAgICAgZmllbGQ6IHN0cmluZyxcbiAgICAgICAgdmFsdWU6IGJvb2xlYW4gfCB1bmRlZmluZWQsXG4gICAgICAgIGFsbG93RmFsc3k6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICAgICAgcXVlcnk/OiBRdWVyeVxuICAgICkge1xuICAgICAgICBsZXQgZXhwcjtcbiAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlIHx8ICh2YWx1ZSA9PT0gZmFsc2UgJiYgYWxsb3dGYWxzeSkpIHtcbiAgICAgICAgICAgIGV4cHIgPSB0aGlzLmV4cHJCdWlsZGVyLm1ha2VCb29sZWFuRXhwcihmaWVsZCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdoZW4gZXhwciBpcyBub3QgZGVmaW5lZCwgdGhpcyBzaW1wbHkgcmVtb3ZlcyB0aGUgc2VsZWN0aW9uXG4gICAgICAgIHRoaXMuc2V0QWR2YW5jZWRTZWxlY3QoZmllbGQsIGV4cHIsIHF1ZXJ5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgc2VsZWN0IG9uIGEgcXVlcnkgKGRlZmF1bHRzIHRvIHNlYXJjaFNlcnZpY2UucXVlcnkpIGZvciBhIGdpdmVuXG4gICAgICogZmllbGQsIG9wZXJhdG9yIGFuZCB2YWx1ZVxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSBvcGVyYXRvclxuICAgICAqIEBwYXJhbSBxdWVyeVxuICAgICAqL1xuICAgIHB1YmxpYyBzZXROdW1lcmljYWxTZWxlY3QoXG4gICAgICAgIGZpZWxkOiBzdHJpbmcsXG4gICAgICAgIHZhbHVlOiBzdHJpbmcgfCBEYXRlIHwgbnVtYmVyIHwgVmFsdWVJdGVtIHwgdW5kZWZpbmVkLFxuICAgICAgICBvcGVyYXRvcjogXCI+XCIgfCBcIj49XCIgfCBcIjxcIiB8IFwiPD1cIiB8IFwiPVwiIHwgXCI8PlwiLFxuICAgICAgICBxdWVyeT86IFF1ZXJ5XG4gICAgKSB7XG4gICAgICAgIGxldCBleHByO1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzVmFsdWVJdGVtKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudmFsdWUgYXMgc3RyaW5nIHwgRGF0ZSB8IG51bWJlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5wYXJzZSh2YWx1ZSwgZmllbGQpO1xuICAgICAgICAgICAgZXhwciA9IHRoaXMuZXhwckJ1aWxkZXIubWFrZU51bWVyaWNhbEV4cHIoZmllbGQsIG9wZXJhdG9yLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2hlbiBleHByIGlzIG5vdCBkZWZpbmVkLCB0aGlzIHNpbXBseSByZW1vdmVzIHRoZSBzZWxlY3Rpb25cbiAgICAgICAgdGhpcy5zZXRBZHZhbmNlZFNlbGVjdChmaWVsZCwgZXhwciwgcXVlcnkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgYSBzZWxlY3Qgb24gYSBxdWVyeSAoZGVmYXVsdHMgdG8gc2VhcmNoU2VydmljZS5xdWVyeSkgZm9yIGEgZ2l2ZW5cbiAgICAgKiBmaWVsZCBhbmQgcmFuZ2Ugb2YgdmFsdWVzXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICogQHBhcmFtIHJhbmdlXG4gICAgICogQHBhcmFtIHF1ZXJ5XG4gICAgICovXG4gICAgcHVibGljIHNldFJhbmdlU2VsZWN0KFxuICAgICAgICBmaWVsZDogc3RyaW5nLFxuICAgICAgICByYW5nZTogKHN0cmluZyB8IERhdGUgfCBudW1iZXIpW10gfCB1bmRlZmluZWQsXG4gICAgICAgIHF1ZXJ5PzogUXVlcnlcbiAgICApIHtcbiAgICAgICAgbGV0IGV4cHI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHJhbmdlICYmIHJhbmdlLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgY29uc3QgZnJvbSA9IHRoaXMucGFyc2UocmFuZ2VbMF0gfHwgdW5kZWZpbmVkLCBmaWVsZCk7XG4gICAgICAgICAgICBjb25zdCB0byA9IHRoaXMucGFyc2UocmFuZ2VbMV0gfHwgdW5kZWZpbmVkLCBmaWVsZCk7XG4gICAgICAgICAgICBpZiAoZnJvbSAmJiB0bykge1xuICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLmV4cHJCdWlsZGVyLm1ha2VSYW5nZUV4cHIoZmllbGQsIGZyb20sIHRvKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZnJvbSkge1xuICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLmV4cHJCdWlsZGVyLm1ha2VOdW1lcmljYWxFeHByKGZpZWxkLCBcIj49XCIsIGZyb20pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0bykge1xuICAgICAgICAgICAgICAgIGV4cHIgPSB0aGlzLmV4cHJCdWlsZGVyLm1ha2VOdW1lcmljYWxFeHByKGZpZWxkLCBcIjw9XCIsIHRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBXaGVuIGV4cHIgaXMgbm90IGRlZmluZWQsIHRoaXMgc2ltcGx5IHJlbW92ZXMgdGhlIHNlbGVjdGlvblxuICAgICAgICB0aGlzLnNldEFkdmFuY2VkU2VsZWN0KGZpZWxkLCBleHByLCBxdWVyeSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhIHNlbGVjdCBmb3IgYSBnaXZlbiBmaWVsZCBhbmQgZXhwcmVzc2lvbiBvbiB0aGUgcXVlcnkgKGRlZmF1bHRzIHRvIHNlYXJjaFNlcnZpY2UucXVlcnkpXG4gICAgICogQHBhcmFtIHF1ZXJ5IFF1ZXJ5IHdoZXJlIHRvIGZldGNoIGFkdmFuY2VkIHZhbHVlcywgaWYgb21pdHRlZCwgdXNlIHNlYXJjaFNlcnZpY2UucXVlcnlcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKiBAcGFyYW0gZXhwclxuICAgICAqL1xuICAgIHByb3RlY3RlZCBzZXRBZHZhbmNlZFNlbGVjdChcbiAgICAgICAgZmllbGQ6IHN0cmluZyxcbiAgICAgICAgZXhwcjogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgICBxdWVyeSA9IHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeVxuICAgICkge1xuICAgICAgICBxdWVyeS5yZW1vdmVTZWxlY3QoYWR2YW5jZWRGYWNldFByZWZpeCArIGZpZWxkKTtcbiAgICAgICAgaWYgKGV4cHIpIHtcbiAgICAgICAgICAgIHF1ZXJ5LmFkZFNlbGVjdChleHByLCBhZHZhbmNlZEZhY2V0UHJlZml4ICsgZmllbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgc3BlY2lmaWMgYWR2YW5jZWQgdmFsdWUgYnkgaXRzIGZpZWxkIG5hbWUuXG4gICAgICogQnkgZGVmYXVsdCwgVHJpZ2dlciBzZWFyY2goKSBhY3Rpb25cbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKiBAcGFyYW0gcXVlcnkgUXVlcnkgZnJvbSB3aGljaCB3aWxsIHJlbW92ZSB0aGUgc3BlY2lmaWMgYWR2YW5jZWQgdmFsdWUsIGlmIG9taXR0ZWQsIHVzZSBzZWFyY2hTZXJ2aWNlLnF1ZXJ5XG4gICAgICogQHBhcmFtIHNlYXJjaFxuICAgICAqL1xuICAgIHB1YmxpYyByZW1vdmVBZHZhbmNlZFZhbHVlKFxuICAgICAgICBmaWVsZDogc3RyaW5nLFxuICAgICAgICBzZWFyY2g6IGJvb2xlYW4gPSB0cnVlLFxuICAgICAgICBxdWVyeTogUXVlcnkgPSB0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnlcbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgICBxdWVyeS5yZW1vdmVTZWxlY3QoYWR2YW5jZWRGYWNldFByZWZpeCArIGZpZWxkKTtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZXRRdWVyeShxdWVyeSwgZmFsc2UpO1xuICAgICAgICAgICAgaWYgKHNlYXJjaCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbGwgcmVsYXRlZCBhZHZhbmNlZC1zZWFyY2ggc2VsZWN0KHMpIGZyb20gYSBnaXZlbiBxdWVyeSBhbmQgdXBkYXRlIHNlYXJjaFNlcnZpY2UucXVlcnkgYWNjb3JkaW5nbHlcbiAgICAgKiBCeSBkZWZhdWx0LCBUcmlnZ2VyIHNlYXJjaCgpIGFjdGlvblxuICAgICAqIEBwYXJhbSBxdWVyeSBRdWVyeSBmcm9tIHdoaWNoIHdpbGwgcmVtb3ZlIGFsbCBhZHZhbmNlZCB2YWx1ZXMsIGlmIG9taXR0ZWQsIHVzZSBzZWFyY2hTZXJ2aWNlLnF1ZXJ5XG4gICAgICogQHBhcmFtIHNlYXJjaFxuICAgICAqL1xuICAgIHB1YmxpYyByZXNldEFkdmFuY2VkVmFsdWVzKFxuICAgICAgICBzZWFyY2g6IGJvb2xlYW4gPSB0cnVlLFxuICAgICAgICBxdWVyeTogUXVlcnkgPSB0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnlcbiAgICApOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNldFF1ZXJ5KHF1ZXJ5LnRvU3RhbmRhcmQoKSwgZmFsc2UpO1xuICAgICAgICBpZiAoc2VhcmNoKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmFuc2Zvcm1zIGEgdmFsdWUgdG8gYSBwYXJzZWQgVmFsdWVJdGVtW11cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYXNWYWx1ZUl0ZW1zKFxuICAgICAgICB2YWx1ZTogVmFsdWVJdGVtIHwgVmFsdWVJdGVtW10sXG4gICAgICAgIGZpZWxkOiBzdHJpbmdcbiAgICApOiBWYWx1ZUl0ZW1bXSB7XG4gICAgICAgIGlmICh0aGlzLl9pc1ZhbHVlSXRlbUFycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLm1hcCgodmFsKSA9PiAoe1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnBhcnNlKHZhbC52YWx1ZSwgZmllbGQpIGFzXG4gICAgICAgICAgICAgICAgICAgIHwgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgIHwgRGF0ZVxuICAgICAgICAgICAgICAgICAgICB8IG51bWJlclxuICAgICAgICAgICAgICAgICAgICB8IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgZGlzcGxheTogdmFsLmRpc3BsYXksXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5wYXJzZSh2YWx1ZS52YWx1ZSwgZmllbGQpIGFzXG4gICAgICAgICAgICAgICAgICAgIHwgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgIHwgRGF0ZVxuICAgICAgICAgICAgICAgICAgICB8IG51bWJlclxuICAgICAgICAgICAgICAgICAgICB8IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgZGlzcGxheTogdmFsdWUuZGlzcGxheSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgcHVibGljIGZvcm1hdFZhbHVlSXRlbXMoXG4gICAgICAgIGZpZWxkOiBzdHJpbmcsXG4gICAgICAgIHZhbHVlOiBWYWx1ZUl0ZW0gfCBWYWx1ZUl0ZW1bXVxuICAgICk6IFZhbHVlSXRlbSB8IFZhbHVlSXRlbVtdIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzVmFsdWVJdGVtQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUubWFwKCh2YWwpID0+IHRoaXMuZm9ybWF0VmFsdWVJdGVtKGZpZWxkLCB2YWwpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRWYWx1ZUl0ZW0oZmllbGQsIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb3JtYXQgdGhlIGRpc3BsYXkgcHJvcGVydHkgb2YgdGhlIFZhbHVlSXRlbSBhY2NvcmRpbmcgaXRzIHJlbGF0ZWQgY29sdW1uIGRlZmluaXRpb25cbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZm9ybWF0VmFsdWVJdGVtKGZpZWxkOiBzdHJpbmcsIHZhbHVlOiBWYWx1ZUl0ZW0pOiBWYWx1ZUl0ZW0ge1xuICAgICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLmFwcFNlcnZpY2UuZ2V0Q29sdW1uKGZpZWxkKTtcbiAgICAgICAgaWYgKGNvbHVtbikge1xuICAgICAgICAgICAgdmFsdWUuZGlzcGxheSA9ICh0aGlzLmZvcm1hdEJhc2VBZHZhbmNlZFZhbHVlKFxuICAgICAgICAgICAgICAgIHZhbHVlLmRpc3BsYXkhLFxuICAgICAgICAgICAgICAgIGNvbHVtblxuICAgICAgICAgICAgKSBhcyBzdHJpbmcgfCBEYXRlIHwgbnVtYmVyIHwgYm9vbGVhbikudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9ybWF0IGEgZ2l2ZW4gYWR2YW5jZWQgdmFsdWUgYWNjb3JkaW5nIHRvIGl0cyBjb2x1bW4gZGVmaW5pdGlvblxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBmb3JtYXRBZHZhbmNlZFZhbHVlKFxuICAgICAgICBmaWVsZDogc3RyaW5nLFxuICAgICAgICB2YWx1ZTogQWR2YW5jZWRWYWx1ZVxuICAgICk6IEFkdmFuY2VkVmFsdWUge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuYXBwU2VydmljZS5nZXRDb2x1bW4oZmllbGQpO1xuICAgICAgICAgICAgaWYgKGNvbHVtbikge1xuICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUubWFwKCh2KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgdiA/IHRoaXMuZm9ybWF0QmFzZUFkdmFuY2VkVmFsdWUodiwgY29sdW1uKSA6IHZcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0QmFzZUFkdmFuY2VkVmFsdWUodmFsdWUsIGNvbHVtbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBmb3JtYXRCYXNlQWR2YW5jZWRWYWx1ZShcbiAgICAgICAgdmFsdWU6IEJhc2VBZHZhbmNlZFZhbHVlLFxuICAgICAgICBjb2x1bW46IENDQ29sdW1uXG4gICAgKTogQmFzZUFkdmFuY2VkVmFsdWUge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5jYXN0QWR2YW5jZWRWYWx1ZSh2YWx1ZSwgY29sdW1uKTtcbiAgICAgICAgICAgIHJldHVybiBjb2x1bW4uZm9ybWF0dGVyID8gdGhpcy5mb3JtYXRTZXJ2aWNlLmZvcm1hdFZhbHVlKHZhbHVlISwgY29sdW1uKSA6IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYXN0IGEgZ2l2ZW4gdmFsdWUgYXMgcGVyIGl0cyBjb2x1bW4gZGVmaW5pdGlvblxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSBjb2x1bW5cbiAgICAgKi9cbiAgICBwdWJsaWMgY2FzdEFkdmFuY2VkVmFsdWUoXG4gICAgICAgIHZhbHVlOiBCYXNlQWR2YW5jZWRWYWx1ZSxcbiAgICAgICAgY29sdW1uOiBDQ0NvbHVtbiB8IHVuZGVmaW5lZFxuICAgICk6IEJhc2VBZHZhbmNlZFZhbHVlIHtcbiAgICAgICAgaWYgKGNvbHVtbikge1xuICAgICAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmIChBcHBTZXJ2aWNlLmlzRGF0ZShjb2x1bW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gVXRpbHMudG9EYXRlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKEFwcFNlcnZpY2UuaXNJbnRlZ2VyKGNvbHVtbikpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzLnRlc3RJbnRlZ2VyKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBVdGlscy50b0ludCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKEFwcFNlcnZpY2UuaXNEb3VibGUoY29sdW1uKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbHMudGVzdEZsb2F0KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBVdGlscy50b051bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKEFwcFNlcnZpY2UuaXNCb29sZWFuKGNvbHVtbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBVdGlscy5pc1RydWUodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgZ2VuZXJpYyBGb3JtQ29udHJvbFxuICAgICAqIEBwYXJhbSB2YWx1ZSB2YWx1ZSBvZiB0aGUgRm9ybUNvbnRyb2xcbiAgICAgKiBAcGFyYW0gdmFsaWRhdG9ycyBvcHRpb25hbCB2YWxpZGF0b3JzIHRvIGJlIGFkZGVkIHRvIHRoZSByZXR1cm5lZCBGb3JtQ29udHJvbFxuICAgICAqIEBwYXJhbSBhc3luY1ZhbGlkYXRvcnMgb3B0aW9uYWwgYXN5bmNWYWxpZGF0b3JzIHRvIGJlIGFkZGVkIHRvIHRoZSByZXR1cm5lZCBGb3JtQ29udHJvbFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBjcmVhdGVDb250cm9sKFxuICAgICAgICB2YWx1ZTogQWR2YW5jZWRWYWx1ZSB8IFZhbHVlSXRlbSB8IFZhbHVlSXRlbVtdLFxuICAgICAgICB2YWxpZGF0b3JzPzogVmFsaWRhdG9yRm5bXSxcbiAgICAgICAgYXN5bmNWYWxpZGF0b3JzPzogQXN5bmNWYWxpZGF0b3JGbltdXG4gICAgKTogRm9ybUNvbnRyb2wge1xuICAgICAgICByZXR1cm4gbmV3IEZvcm1Db250cm9sKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yczogISF2YWxpZGF0b3JzID8gdmFsaWRhdG9ycyA6IFtdLFxuICAgICAgICAgICAgICAgIGFzeW5jVmFsaWRhdG9yczogISFhc3luY1ZhbGlkYXRvcnMgPyBhc3luY1ZhbGlkYXRvcnMgOiBbXSxcbiAgICAgICAgICAgICAgICB1cGRhdGVPbjogXCJjaGFuZ2VcIixcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBhIHZhbHVlIGFjY29yZGluZyB0byBpdHMgY29sdW1uIGRlZmluaXRpb25cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcGFyc2U8VD4odmFsdWU6IFQsIGZpZWxkOiBzdHJpbmcpOiBUIHwgc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcGFyc2VyID0gdGhpcy5fcGFyc2VyKGZpZWxkKTtcbiAgICAgICAgaWYgKHBhcnNlciAmJiBVdGlscy5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFNlcnZpY2UucGFyc2VWYWx1ZSh2YWx1ZSwgcGFyc2VyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBwYXJzZXIgaWYgZXhpc3RpbmcgaW4gdGhlIGdpdmVuIGZpZWxkXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9wYXJzZXIoZmllbGQ6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuYXBwU2VydmljZS5nZXRDb2x1bW4oZmllbGQpO1xuICAgICAgICByZXR1cm4gY29sdW1uID8gY29sdW1uLnBhcnNlciA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3JhbmdlVHlwZShmaWVsZDogc3RyaW5nKTogc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSB7XG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuYXBwU2VydmljZS5nZXRDb2x1bW4oZmllbGQpO1xuICAgICAgICBsZXQgcmFuZ2VUeXBlO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjb2x1bW4gJiZcbiAgICAgICAgICAgIChBcHBTZXJ2aWNlLmlzSW50ZWdlcihjb2x1bW4pIHx8IEFwcFNlcnZpY2UuaXNEb3VibGUoY29sdW1uKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByYW5nZVR5cGUgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbHVtbiAmJiBBcHBTZXJ2aWNlLmlzRGF0ZShjb2x1bW4pKSB7XG4gICAgICAgICAgICByYW5nZVR5cGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmFuZ2VUeXBlID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmFuZ2VUeXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhbiBgVmFsdWVJdGVtW11gXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9pc1ZhbHVlSXRlbUFycmF5KHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBWYWx1ZUl0ZW1bXSB7XG4gICAgICAgIGlmIChVdGlscy5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgY29uc3QgY29uZGl0aW9uID0gKGVsZW1lbnQpID0+IHRoaXMuX2lzVmFsdWVJdGVtKGVsZW1lbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmV2ZXJ5KGNvbmRpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhbiBgVmFsdWVJdGVtYFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfaXNWYWx1ZUl0ZW0odmFsdWU6IGFueSk6IHZhbHVlIGlzIFZhbHVlSXRlbSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIFV0aWxzLmlzT2JqZWN0KHZhbHVlKSAmJlxuICAgICAgICAgICAgIVV0aWxzLmlzQXJyYXkodmFsdWUpICYmXG4gICAgICAgICAgICAhVXRpbHMuaXNEYXRlKHZhbHVlKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eShcInZhbHVlXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiJdfQ==