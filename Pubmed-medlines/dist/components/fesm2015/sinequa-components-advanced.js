import { ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵdefineDirective, ɵɵInheritDefinitionFeature, ɵɵgetInheritedFactory, Directive, Input, ɵɵdirectiveInject, ɵɵdefineComponent, ɵɵNgOnChangesFeature, ɵɵelementStart, ɵɵelement, ɵɵtext, ɵɵpipe, ɵɵelementEnd, ɵɵproperty, ɵɵadvance, ɵɵtextInterpolate, ɵɵpipeBind1, Component, EventEmitter, ElementRef, ɵɵlistener, Output, HostListener, ɵɵtemplate, ɵɵtemplateRefExtractor, ɵɵreference, ɵɵpropertyInterpolate, ɵɵgetCurrentView, ɵɵrestoreView, ɵɵnextContext, ɵɵtextInterpolate1, forwardRef, ɵɵviewQuery, ɵɵqueryRefresh, ɵɵloadQuery, ɵɵProvidersFeature, ViewChild, ɵɵpureFunction0, ɵɵpureFunction3, ɵɵclassMapInterpolate1, ɵɵpureFunction2, ɵɵstyleProp, ɵɵpipeBind2, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { Validators, FormControl, NgControlStatusGroup, FormGroupDirective, CheckboxControlValueAccessor, NgControlStatus, FormControlName, DefaultValueAccessor, NgModel, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Utils, Keys } from '@sinequa/core/base';
import { advancedFacetPrefix, Expr, AppService, FormatService, ExprBuilder } from '@sinequa/core/app-utils';
import { SearchService, FirstPageService, enSearch, frSearch, deSearch } from '@sinequa/components/search';
import { ValidationService, ValidationDirective } from '@sinequa/core/validation';
import { MessagePipe, IntlService, IntlModule } from '@sinequa/core/intl';
import { Autocomplete, AutocompleteState, SuggestService, BsAutocompleteList, BsAutocompleteModule } from '@sinequa/components/autocomplete';
import { UIService, ScrollIntoView, UtilsModule } from '@sinequa/components/utils';
import { NgForOf, NgIf, CommonModule } from '@angular/common';
import moment from 'moment';
import { BsDaterangepickerInputDirective, BsDaterangepickerDirective, BsDatepickerInputDirective, BsDatepickerDirective, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

/* Dépendences fonctionnelles internes d'Angular */
class AdvancedService {
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
AdvancedService.ɵfac = function AdvancedService_Factory(t) { return new (t || AdvancedService)(ɵɵinject(AppService), ɵɵinject(SearchService), ɵɵinject(ValidationService), ɵɵinject(FormatService), ɵɵinject(ExprBuilder)); };
AdvancedService.ɵprov = ɵɵdefineInjectable({ token: AdvancedService, factory: AdvancedService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AdvancedService, [{
        type: Injectable,
        args: [{
                providedIn: "root",
            }]
    }], function () { return [{ type: AppService }, { type: SearchService }, { type: ValidationService }, { type: FormatService }, { type: ExprBuilder }]; }, null); })();

class BsAdvancedFormValidation extends ValidationDirective {
    ngOnInit() {
        this.options = {
            form: this.validationForm,
            controlName: this.field,
        };
        super.ngOnInit();
    }
}
BsAdvancedFormValidation.ɵfac = function BsAdvancedFormValidation_Factory(t) { return ɵBsAdvancedFormValidation_BaseFactory(t || BsAdvancedFormValidation); };
BsAdvancedFormValidation.ɵdir = ɵɵdefineDirective({ type: BsAdvancedFormValidation, selectors: [["", "sqAdvancedFormValidation", ""]], inputs: { field: "field", validationForm: "validationForm" }, features: [ɵɵInheritDefinitionFeature] });
const ɵBsAdvancedFormValidation_BaseFactory = /*@__PURE__*/ ɵɵgetInheritedFactory(BsAdvancedFormValidation);
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsAdvancedFormValidation, [{
        type: Directive,
        args: [{
                selector: "[sqAdvancedFormValidation]",
            }]
    }], null, { field: [{
            type: Input
        }], validationForm: [{
            type: Input
        }] }); })();

class BsAdvancedFormCheckbox {
    constructor(appService) {
        this.appService = appService;
    }
    ngOnChanges() {
        if (this.label === undefined) {
            this.label = this.appService.getLabel(this.field);
        }
    }
}
BsAdvancedFormCheckbox.ɵfac = function BsAdvancedFormCheckbox_Factory(t) { return new (t || BsAdvancedFormCheckbox)(ɵɵdirectiveInject(AppService)); };
BsAdvancedFormCheckbox.ɵcmp = ɵɵdefineComponent({ type: BsAdvancedFormCheckbox, selectors: [["sq-advanced-form-checkbox"]], inputs: { form: "form", field: "field", label: "label" }, features: [ɵɵNgOnChangesFeature], decls: 7, vars: 7, consts: [[1, "form-group", 3, "formGroup"], [1, "form-check"], [1, "custom-control", "custom-checkbox"], ["type", "checkbox", "sqAdvancedFormValidation", "", 1, "custom-control-input", 3, "field", "validationForm", "formControlName"], [1, "custom-control-label"]], template: function BsAdvancedFormCheckbox_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "div", 1);
        ɵɵelementStart(2, "label", 2);
        ɵɵelement(3, "input", 3);
        ɵɵelementStart(4, "span", 4);
        ɵɵtext(5);
        ɵɵpipe(6, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("formGroup", ctx.form);
        ɵɵadvance(3);
        ɵɵproperty("field", ctx.field)("validationForm", ctx.form)("formControlName", ctx.field);
        ɵɵadvance(2);
        ɵɵtextInterpolate(ɵɵpipeBind1(6, 5, ctx.label));
    } }, directives: [NgControlStatusGroup, FormGroupDirective, CheckboxControlValueAccessor, BsAdvancedFormValidation, NgControlStatus, FormControlName], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsAdvancedFormCheckbox, [{
        type: Component,
        args: [{
                selector: "sq-advanced-form-checkbox",
                templateUrl: "./advanced-form-checkbox.html",
            }]
    }], function () { return [{ type: AppService }]; }, { form: [{
            type: Input
        }], field: [{
            type: Input
        }], label: [{
            type: Input
        }] }); })();

class BsAdvancedFormAutocomplete extends Autocomplete {
    constructor(elementRef, suggestService, appService, uiService) {
        super(elementRef, suggestService, appService, uiService);
        this.UpdateItem = new EventEmitter();
    }
    /**
     * The ngOnInit() method from the original directive is overriden
     * On initialization, we listen to the autocomplete component for
     * selection events
     */
    ngOnInit() {
        this._dropdownSubscription = this.dropdown.clicked.subscribe((item) => {
            this.select(item, false); // An item was selected from the autocomplete => take the value
        });
        this.start();
    }
    getSuggests() {
        const value = this.getInputValue();
        if (value) {
            // If there is text, make a call to the suggest API
            this.processSuggests(this.getSuggestsObs(value, [this.field]));
        }
        else {
            // If empty input, restart autocomplete
            this.start();
        }
    }
    processSuggests(obs) {
        obs.subscribe(suggests => {
            if (this.getState() === AutocompleteState.ACTIVE || this.getState() === AutocompleteState.OPENED) {
                this.dropdown.update(true, suggests
                    .filter(item => item.category !== "$field$") // Filter out fields
                    .map(item => {
                    if (!item.label) {
                        item.label = this.appService.getLabel(item.category);
                    }
                    if (!item.normalized) {
                        item.normalized = item.display;
                    }
                    return item;
                }));
            }
        }, err => {
            this.dropdown.update(false);
        }, () => {
            if (this.dropdown.hasItems && this.getState() === AutocompleteState.ACTIVE) {
                this.open(); // Switch from ACTIVE to OPENED (if not already)
            }
            else if (!this.dropdown.hasItems && this.getState() === AutocompleteState.OPENED) { // No data
                this.active(); // Switch from OPENED to ACTIVE (if not already)
            }
        });
    }
    setAutocompleteItem(item) {
        if (item) {
            this.setInputValue(item.display);
            this.UpdateItem.next(Object.assign(Object.assign({}, item), { normalized: item.normalized ? item.normalized : item.display }));
            return true;
        }
        return false;
    }
    /**
     * Listen to blur events on the <input> host and overrides the autocomplete blur events
     */
    blur(event) {
        /** If there is text in the <input/> and not selected from the dropdown ==> set the item manually */
        if (this.getState() !== AutocompleteState.SELECTED) {
            if (!!this.getInputValue() && this.getInputValue() !== "") {
                const item = {
                    display: this.getInputValue(),
                    normalized: this.getInputValue(),
                    category: "",
                };
                this.setAutocompleteItem(item);
            }
            else {
                this.UpdateItem.next(undefined);
            }
        }
        this.init();
    }
    /**
     * Overrides the parent inputChanged method, so that it is possible to reinitialize the autocomplete
     * @param event
     */
    inputChanged(event) {
        switch (this.getState()) {
            case AutocompleteState.OPENED:
                this.suggest(); // Just request more data, but no state change
                break;
            case AutocompleteState.START:
            case AutocompleteState.ACTIVE:
                this.active(); // get more data, and change state if not already ACTIVE
                break;
            case AutocompleteState.SELECTED:
                this.start(); // The model changed because we selected a value ==> we restart in case the user keeps typing
                this.active();
                break;
            case AutocompleteState.INIT:
                break;
        }
    }
}
BsAdvancedFormAutocomplete.ɵfac = function BsAdvancedFormAutocomplete_Factory(t) { return new (t || BsAdvancedFormAutocomplete)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(SuggestService), ɵɵdirectiveInject(AppService), ɵɵdirectiveInject(UIService)); };
BsAdvancedFormAutocomplete.ɵdir = ɵɵdefineDirective({ type: BsAdvancedFormAutocomplete, selectors: [["", "sqAdvancedFormAutocomplete", ""]], hostBindings: function BsAdvancedFormAutocomplete_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("blur", function BsAdvancedFormAutocomplete_blur_HostBindingHandler($event) { return ctx.blur($event); })("input", function BsAdvancedFormAutocomplete_input_HostBindingHandler($event) { return ctx.inputChanged($event); });
    } }, inputs: { field: "field" }, outputs: { UpdateItem: "UpdateItem" }, features: [ɵɵInheritDefinitionFeature] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsAdvancedFormAutocomplete, [{
        type: Directive,
        args: [{
                selector: "[sqAdvancedFormAutocomplete]",
            }]
    }], function () { return [{ type: ElementRef }, { type: SuggestService }, { type: AppService }, { type: UIService }]; }, { UpdateItem: [{
            type: Output
        }], field: [{
            type: Input
        }], blur: [{
            type: HostListener,
            args: ["blur", ["$event"]]
        }], inputChanged: [{
            type: HostListener,
            args: ["input", ["$event"]]
        }] }); })();

function BsAdvancedFormInput_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 6);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate(item_r3.display);
} }
class BsAdvancedFormInput {
    constructor(appService) {
        this.appService = appService;
    }
    ngOnChanges() {
        if (this.label === undefined) {
            this.label = this.appService.getLabel(this.field);
        }
        this.control = this.form.get(this.field);
        if (this.control) {
            if (this.control.value) {
                this.viewValue = this.control.value.display
                    ? this.control.value.display
                    : this.control.value.value.toString();
            }
            this._valueChangesSubscription = Utils.subscribe(this.control.valueChanges, (val) => {
                if (val) {
                    this.viewValue = val.display ? val.display : val.value.toString();
                }
            });
        }
        else {
            throw new Error("No form control named " + this.field);
        }
    }
    ngOnDestroy() {
        if (this._valueChangesSubscription) {
            this._valueChangesSubscription.unsubscribe();
        }
    }
    onItemChange(item) {
        this.viewValue = item === null || item === void 0 ? void 0 : item.display;
        this._updateControl(item);
    }
    _updateControl(item) {
        var _a, _b;
        const value = item
            ? {
                value: item.normalized,
                display: item.display
            } : undefined;
        (_a = this.control) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        (_b = this.control) === null || _b === void 0 ? void 0 : _b.setValue(value, { emitEvent: false });
    }
}
BsAdvancedFormInput.ɵfac = function BsAdvancedFormInput_Factory(t) { return new (t || BsAdvancedFormInput)(ɵɵdirectiveInject(AppService)); };
BsAdvancedFormInput.ɵcmp = ɵɵdefineComponent({ type: BsAdvancedFormInput, selectors: [["sq-advanced-form-input"]], inputs: { form: "form", field: "field", suggestQuery: "suggestQuery", label: "label" }, features: [ɵɵNgOnChangesFeature], decls: 10, vars: 11, consts: [[1, "form-group"], [3, "for"], [1, "d-flex", "flex-column"], ["sqAdvancedFormAutocomplete", "", "sqAdvancedFormValidation", "", "type", "text", "autocomplete", "off", "spellcheck", "off", 1, "form-control", 3, "off", "suggestQuery", "dropdown", "validationForm", "field", "id", "ngModel", "ngModelChange", "UpdateItem"], ["dropdown", ""], ["itemTpl", ""], [1, "py-2"]], template: function BsAdvancedFormInput_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "label", 1);
        ɵɵtext(2);
        ɵɵpipe(3, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementStart(4, "div", 2);
        ɵɵelementStart(5, "input", 3);
        ɵɵlistener("ngModelChange", function BsAdvancedFormInput_Template_input_ngModelChange_5_listener($event) { return ctx.viewValue = $event; })("UpdateItem", function BsAdvancedFormInput_Template_input_UpdateItem_5_listener($event) { return ctx.onItemChange($event); });
        ɵɵelementEnd();
        ɵɵelementStart(6, "sq-autocomplete-list", null, 4);
        ɵɵtemplate(8, BsAdvancedFormInput_ng_template_8_Template, 2, 1, "ng-template", null, 5, ɵɵtemplateRefExtractor);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        const _r0 = ɵɵreference(7);
        ɵɵadvance(1);
        ɵɵpropertyInterpolate("for", ctx.field);
        ɵɵadvance(1);
        ɵɵtextInterpolate(ɵɵpipeBind1(3, 9, ctx.label));
        ɵɵadvance(3);
        ɵɵproperty("off", !ctx.suggestQuery)("suggestQuery", ctx.suggestQuery)("dropdown", _r0)("validationForm", ctx.form)("field", ctx.field)("id", ctx.field)("ngModel", ctx.viewValue);
    } }, directives: [DefaultValueAccessor, BsAdvancedFormAutocomplete, BsAdvancedFormValidation, NgControlStatus, NgModel, BsAutocompleteList], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsAdvancedFormInput, [{
        type: Component,
        args: [{
                selector: "sq-advanced-form-input",
                templateUrl: "./advanced-form-input.html"
            }]
    }], function () { return [{ type: AppService }]; }, { form: [{
            type: Input
        }], field: [{
            type: Input
        }], suggestQuery: [{
            type: Input
        }], label: [{
            type: Input
        }] }); })();

class BsAdvancedFormAutocompleteMultiInput extends BsAdvancedFormAutocomplete {
    constructor() {
        super(...arguments);
        /** Event synchronizing the list of search terms in the parent component */
        this.itemsUpdate = new EventEmitter();
        /** Stores the selected search terms selected via Tab */
        this.items = [];
    }
    /**
     * The setAutocompleteItem() method from the original directive is overriden to
     * Sets the content of the <input> based on the given
     * Autocomplete Item.
     * @returns false since we don't need trigger search at this point of time
     */
    setAutocompleteItem(item) {
        if (item) {
            // Store the autocomplete items that will be used to create a selection
            this.items.push(item);
            this.itemsUpdate.next(this.items);
            this.setInputValue("");
        }
        return false;
    }
    /**
     * Listen to user's keyboard actions in the <input>, in order to navigate
     * and select the autocomplete suggestions.
     * Overrides the parent keydown method, adds the management of the backspace key
     * to remove items, enhance the enter key to support adding new items.
     * @param event the keyboard
     */
    keydown(event) {
        const keydown = super.keydown(event);
        if (keydown === undefined) {
            /** We can remove selections by typing <backspace> when the input is empty */
            if (event.keyCode === Keys.backspace) {
                if (this.getInputValue() === "") {
                    this.items.pop();
                    this.itemsUpdate.next(this.items);
                }
            }
            /** Allow the selection one of new item */
            if (event.keyCode === Keys.enter) {
                this._manageSetAutocompleteItem();
            }
        }
        return keydown;
    }
    /**
     * Listens to blur events (out of focus) on the <input> host and overrides the parent blur events
     */
    blur(event) {
        this._manageSetAutocompleteItem();
        this.init();
    }
    _manageSetAutocompleteItem() {
        /** Always consider if there is text in the <input> and that it is not yet added in items  */
        if (!!this.getInputValue() && this.getInputValue() !== "") {
            this.setAutocompleteItem({
                display: this.getInputValue(),
                normalized: this.getInputValue(),
                category: "",
            });
        }
    }
}
BsAdvancedFormAutocompleteMultiInput.ɵfac = function BsAdvancedFormAutocompleteMultiInput_Factory(t) { return ɵBsAdvancedFormAutocompleteMultiInput_BaseFactory(t || BsAdvancedFormAutocompleteMultiInput); };
BsAdvancedFormAutocompleteMultiInput.ɵdir = ɵɵdefineDirective({ type: BsAdvancedFormAutocompleteMultiInput, selectors: [["", "sqAdvancedFormAutocompleteMultiInput", ""]], hostBindings: function BsAdvancedFormAutocompleteMultiInput_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("blur", function BsAdvancedFormAutocompleteMultiInput_blur_HostBindingHandler($event) { return ctx.blur($event); });
    } }, inputs: { items: "items" }, outputs: { itemsUpdate: "itemsUpdate" }, features: [ɵɵInheritDefinitionFeature] });
const ɵBsAdvancedFormAutocompleteMultiInput_BaseFactory = /*@__PURE__*/ ɵɵgetInheritedFactory(BsAdvancedFormAutocompleteMultiInput);
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsAdvancedFormAutocompleteMultiInput, [{
        type: Directive,
        args: [{
                selector: "[sqAdvancedFormAutocompleteMultiInput]",
            }]
    }], null, { itemsUpdate: [{
            type: Output
        }], items: [{
            type: Input
        }], blur: [{
            type: HostListener,
            args: ["blur", ["$event"]]
        }] }); })();

function BsAdvancedFormMultiInput_span_6_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 7);
    ɵɵtext(1);
    ɵɵelementStart(2, "span", 8);
    ɵɵlistener("click", function BsAdvancedFormMultiInput_span_6_Template_span_click_2_listener() { ɵɵrestoreView(_r6); const item_r4 = ctx.$implicit; const ctx_r5 = ɵɵnextContext(); return ctx_r5.removeItem(item_r4); });
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", item_r4.display, " ");
} }
function BsAdvancedFormMultiInput_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 9);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate1("", item_r7.display, " ");
} }
/**
 * Component representing a text input that accepts multiple entries.
 * This component also performs value validation on each entry.
 *
 */
class BsAdvancedFormMultiInput {
    constructor(elementRef, appService) {
        this.elementRef = elementRef;
        this.appService = appService;
        this.items = []; /** List of items already existing in the advanced search */
    }
    ngOnChanges() {
        if (this.label === undefined) {
            this.label = this.appService.getPluralLabel(this.field);
        }
        this.control = this.form.get(this.field);
        if (this.control) {
            this.items = this.control.value
                ? (Utils.isArray(this.control.value)
                    ? this.control.value
                    : [this.control.value]).map((item) => {
                    return {
                        display: item.display ? item.display : item.value.toString(),
                        normalized: item.value.toString(),
                        category: "",
                    };
                })
                : [];
            this._valueChangesSubscription = Utils.subscribe(this.control.valueChanges, (value) => {
                if (value && !Utils.isArray(value)) {
                    value = [value];
                }
                this.items = value
                    ? value.map((item) => {
                        return {
                            display: item.display ? item.display : item.value.toString(),
                            normalized: item.value.toString(),
                            category: "",
                        };
                    })
                    : [];
            });
        }
        else {
            throw new Error("No form control named " + this.field);
        }
    }
    ngOnDestroy() {
        if (this._valueChangesSubscription) {
            this._valueChangesSubscription.unsubscribe();
        }
    }
    removeItem(item) {
        this.items.splice(this.items.indexOf(item), 1);
        this._updateControl();
    }
    onItemsChanged(items) {
        this.items = items;
        this._updateControl();
    }
    keydown(event) {
        // Intercept tab and set focus to surrounding dropdown-item
        if (event.keyCode === Keys.tab) {
            const dropdownItem = this._getDropdownItem();
            if (dropdownItem) {
                dropdownItem.focus();
                event.preventDefault();
                return false;
            }
        }
        return undefined;
    }
    keypress(event) {
        if (event.keyCode === Keys.enter) {
            // Stop click event firing on surrounding anchor (Firefox)
            event.preventDefault();
            return false;
        }
        return undefined;
    }
    _updateControl() {
        var _a, _b;
        const value = this.items.length > 0
            ? this.items.map((item) => ({
                value: item.normalized,
                display: item.display
            }))
            : undefined;
        (_a = this.control) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        (_b = this.control) === null || _b === void 0 ? void 0 : _b.setValue(value, { emitEvent: false });
    }
    _getDropdownItem() {
        if (this.elementRef) {
            let current = this.elementRef
                .nativeElement;
            while (current && !current.classList.contains("dropdown-item")) {
                current = current.parentElement;
            }
            return current;
        }
        return null;
    }
}
BsAdvancedFormMultiInput.ɵfac = function BsAdvancedFormMultiInput_Factory(t) { return new (t || BsAdvancedFormMultiInput)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(AppService)); };
BsAdvancedFormMultiInput.ɵcmp = ɵɵdefineComponent({ type: BsAdvancedFormMultiInput, selectors: [["sq-advanced-form-multi-input"]], inputs: { form: "form", field: "field", suggestQuery: "suggestQuery", label: "label" }, features: [ɵɵNgOnChangesFeature], decls: 12, vars: 11, consts: [[1, "d-inline"], [1, "sq-dropdown-form"], ["sqAdvancedFormValidation", "", 1, "form-control", "multi-entry", 3, "field", "validationForm"], ["class", "badge badge-pill badge-secondary align-self-center mr-1", 4, "ngFor", "ngForOf"], ["type", "text", "autocomplete", "off", "spellcheck", "off", "sqAdvancedFormAutocompleteMultiInput", "", 1, "input-autocomplete", "flex-grow-1", 3, "field", "off", "suggestQuery", "items", "dropdown", "itemsUpdate", "keydown", "keypress"], ["dropdown", ""], ["itemTpl", ""], [1, "badge", "badge-pill", "badge-secondary", "align-self-center", "mr-1"], [1, "fas", "fa-times-circle", "clickable", 3, "click"], [1, "autocomplete-item", "p-2"]], template: function BsAdvancedFormMultiInput_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "label");
        ɵɵtext(2);
        ɵɵpipe(3, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementStart(4, "section", 1);
        ɵɵelementStart(5, "div", 2);
        ɵɵtemplate(6, BsAdvancedFormMultiInput_span_6_Template, 3, 1, "span", 3);
        ɵɵelementStart(7, "input", 4);
        ɵɵlistener("itemsUpdate", function BsAdvancedFormMultiInput_Template_input_itemsUpdate_7_listener($event) { return ctx.onItemsChanged($event); })("keydown", function BsAdvancedFormMultiInput_Template_input_keydown_7_listener($event) { return ctx.keydown($event); })("keypress", function BsAdvancedFormMultiInput_Template_input_keypress_7_listener($event) { return ctx.keypress($event); });
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(8, "sq-autocomplete-list", null, 5);
        ɵɵtemplate(10, BsAdvancedFormMultiInput_ng_template_10_Template, 2, 1, "ng-template", null, 6, ɵɵtemplateRefExtractor);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        const _r1 = ɵɵreference(9);
        ɵɵadvance(2);
        ɵɵtextInterpolate(ɵɵpipeBind1(3, 9, ctx.label));
        ɵɵadvance(3);
        ɵɵproperty("field", ctx.field)("validationForm", ctx.form);
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.items);
        ɵɵadvance(1);
        ɵɵproperty("field", ctx.field)("off", !ctx.suggestQuery)("suggestQuery", ctx.suggestQuery)("items", ctx.items)("dropdown", _r1);
    } }, directives: [BsAdvancedFormValidation, NgForOf, BsAdvancedFormAutocompleteMultiInput, BsAutocompleteList], pipes: [MessagePipe], styles: [".sq-dropdown-form[_ngcontent-%COMP%]{display:inline;min-width:13rem}.disabled[_ngcontent-%COMP%]{cursor:not-allowed}.clickable[_ngcontent-%COMP%]{cursor:pointer}.clickable[_ngcontent-%COMP%]:hover{opacity:1%}.multi-entry[_ngcontent-%COMP%]{align-items:center;display:flex;flex-wrap:wrap;height:unset!important;width:100%}[_nghost-%COMP%]   input[_ngcontent-%COMP%]{border:none;flex-basis:100px;flex-grow:1;min-width:100px}[_nghost-%COMP%]   input[_ngcontent-%COMP%]:focus{outline:none}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsAdvancedFormMultiInput, [{
        type: Component,
        args: [{
                selector: "sq-advanced-form-multi-input",
                templateUrl: "./advanced-form-multi-input.html",
                styleUrls: ["./advanced-form-multi-input.scss"],
            }]
    }], function () { return [{ type: ElementRef }, { type: AppService }]; }, { form: [{
            type: Input
        }], field: [{
            type: Input
        }], suggestQuery: [{
            type: Input
        }], label: [{
            type: Input
        }] }); })();

const _c0 = ["fromTo"];
const _c1 = ["from"];
const _c2 = ["to"];
function BsDateRangePicker_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 1);
    ɵɵelementStart(1, "div", 2);
    ɵɵelementStart(2, "input", 3, 4);
    ɵɵlistener("ngModelChange", function BsDateRangePicker_div_0_Template_input_ngModelChange_2_listener($event) { ɵɵrestoreView(_r4); const ctx_r3 = ɵɵnextContext(); return ctx_r3.updateFromTo($event); });
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("bsConfig", ctx_r0.bsFromToConfig())("ngModel", ctx_r0.value)("placeholder", ctx_r0.dateFormat);
} }
function BsDateRangePicker_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 1);
    ɵɵelementStart(1, "div", 5);
    ɵɵelementStart(2, "input", 6, 7);
    ɵɵlistener("ngModelChange", function BsDateRangePicker_div_1_Template_input_ngModelChange_2_listener($event) { ɵɵrestoreView(_r8); const ctx_r7 = ɵɵnextContext(); return ctx_r7.updateFrom($event); });
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(4, "div", 8);
    ɵɵtext(5);
    ɵɵpipe(6, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementStart(7, "div", 5);
    ɵɵelementStart(8, "input", 9, 10);
    ɵɵlistener("ngModelChange", function BsDateRangePicker_div_1_Template_input_ngModelChange_8_listener($event) { ɵɵrestoreView(_r8); const ctx_r9 = ɵɵnextContext(); return ctx_r9.updateTo($event); });
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("id", ctx_r1.fromName)("bsConfig", ctx_r1.bsFromConfig())("ngModel", ctx_r1.value[0])("placeholder", ctx_r1.dateFormat);
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind1(6, 9, "msg#advanced.dateRangePicker.separator"));
    ɵɵadvance(3);
    ɵɵproperty("id", ctx_r1.toName)("bsConfig", ctx_r1.bsToConfig())("ngModel", ctx_r1.value[1])("placeholder", ctx_r1.dateFormat);
} }
const DATE_RANGE_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BsDateRangePicker),
    multi: true
};
class BsDateRangePicker {
    constructor(intlService) {
        this.intlService = intlService;
        this.SystemFormat = 'YYYY-MM-DD';
        this.onChangeCallback = () => { };
    }
    ngOnInit() {
        if (!this.options) {
            this.options = {};
        }
        this.fromName = "from_" + this.options.name;
        this.toName = "to_" + this.options.name;
        if (!this.value) {
            this.value = [undefined, undefined];
        }
    }
    get dateFormat() {
        return this.options.system ? this.SystemFormat : moment.localeData().longDateFormat('L');
    }
    setLocale() {
        if (!!this.fromToPicker && this.fromToPicker.isOpen) {
            this.fromToPicker.hide();
            this.fromToPicker.show();
        }
        if (!!this.fromPicker && this.fromPicker.isOpen) {
            this.fromPicker.hide();
            this.fromPicker.show();
        }
        if (!!this.toPicker && this.toPicker.isOpen) {
            this.toPicker.hide();
            this.toPicker.show();
        }
    }
    ngAfterViewInit() {
        this.setLocale();
        this.localeChange = Utils.subscribe(this.intlService.events, (value) => {
            this.setLocale();
        });
    }
    ngOnDestroy() {
        if (this.localeChange) {
            this.localeChange.unsubscribe();
        }
    }
    //#region closedRange
    bsFromToConfig() {
        return {
            minDate: this.options.minDate,
            maxDate: this.options.maxDate,
            containerClass: 'theme-default',
            showWeekNumbers: false,
            rangeInputFormat: this.options.system ? this.SystemFormat : moment.localeData().longDateFormat('L')
        };
    }
    updateFromTo(fromTo) {
        this.setValue([!!fromTo ? fromTo[0] : undefined, !!fromTo ? fromTo[1] : undefined]);
        this.onChangeCallback(this.value);
    }
    bsFromConfig() {
        return {
            minDate: this.options.minDate,
            maxDate: this.maxDate,
            containerClass: 'theme-default',
            showWeekNumbers: false,
            dateInputFormat: this.options.system ? this.SystemFormat : moment.localeData().longDateFormat('L'),
        };
    }
    bsToConfig() {
        return {
            minDate: this.minDate,
            maxDate: this.options.maxDate,
            containerClass: 'theme-default',
            showWeekNumbers: false,
            dateInputFormat: this.options.system ? this.SystemFormat : moment.localeData().longDateFormat('L'),
        };
    }
    setMinMaxDate() {
        this.maxDate = this.value[1] || this.options.maxDate;
        this.minDate = this.value[0] || this.options.minDate;
    }
    resetMinMaxDate() {
        this.maxDate = this.options.maxDate;
        this.minDate = this.options.minDate;
    }
    updateFrom(from) {
        this.setValue([from, this.value[1]]);
        this.onChangeCallback(this.value);
    }
    updateTo(to) {
        this.setValue([this.value[0], to]);
        this.onChangeCallback(this.value);
    }
    //#endregion !closedRange
    zeroTimes() {
        if (this.value) {
            if (Utils.isDate(this.value[0])) {
                const date = this.value[0];
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
            }
            if (Utils.isDate(this.value[1])) {
                const date = this.value[1];
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
            }
        }
    }
    setValue(value) {
        if (!this.value || !value || !Utils.equals(this.value[0], value[0]) || !Utils.equals(this.value[1], value[1])) {
            if (!value) {
                value = [undefined, undefined];
            }
            else {
                value[0] = !!value[0] ? new Date(value[0]) : value[0];
                value[1] = !!value[1] ? new Date(value[1]) : value[1];
            }
            if (this.options.closedRange) {
                this.value = value;
                this.zeroTimes();
            }
            else {
                this.resetMinMaxDate();
                this.value = value;
                this.zeroTimes();
                this.setMinMaxDate();
            }
        }
    }
    //#region ControlValueAccessor
    writeValue(value) {
        this.setValue(value);
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
    }
}
BsDateRangePicker.ɵfac = function BsDateRangePicker_Factory(t) { return new (t || BsDateRangePicker)(ɵɵdirectiveInject(IntlService)); };
BsDateRangePicker.ɵcmp = ɵɵdefineComponent({ type: BsDateRangePicker, selectors: [["sq-date-range-picker"]], viewQuery: function BsDateRangePicker_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0, true);
        ɵɵviewQuery(_c1, true);
        ɵɵviewQuery(_c2, true);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.fromToPicker = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.fromPicker = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.toPicker = _t.first);
    } }, inputs: { options: "options" }, features: [ɵɵProvidersFeature([DATE_RANGE_PICKER_VALUE_ACCESSOR])], decls: 2, vars: 2, consts: [["class", "sq-date-range-picker form-row", 4, "ngIf"], [1, "sq-date-range-picker", "form-row"], [1, "col"], ["type", "text", "autocomplete", "off", "bsDaterangepicker", "", "triggers", "click", 1, "form-control", 3, "bsConfig", "ngModel", "placeholder", "ngModelChange"], ["fromTo", "bsDaterangepicker"], [1, "col-auto"], ["type", "text", "autocomplete", "off", "bsDatepicker", "", "triggers", "click", 1, "form-control", "sq-range-from", 3, "id", "bsConfig", "ngModel", "placeholder", "ngModelChange"], ["from", "bsDatepicker"], [1, "col-auto", "sq-separator"], ["type", "text", "autocomplete", "off", "bsDatepicker", "", "triggers", "click", 1, "form-control", "sq-range-to", 3, "id", "bsConfig", "ngModel", "placeholder", "ngModelChange"], ["to", "bsDatepicker"]], template: function BsDateRangePicker_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsDateRangePicker_div_0_Template, 4, 3, "div", 0);
        ɵɵtemplate(1, BsDateRangePicker_div_1_Template, 10, 11, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.options.closedRange);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", !ctx.options.closedRange);
    } }, directives: [NgIf, BsDaterangepickerInputDirective, DefaultValueAccessor, BsDaterangepickerDirective, NgControlStatus, NgModel, BsDatepickerInputDirective, BsDatepickerDirective], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsDateRangePicker, [{
        type: Component,
        args: [{
                selector: "sq-date-range-picker",
                template: `
        <div *ngIf="options.closedRange" class="sq-date-range-picker form-row">
            <div class="col">
                <input type="text" autocomplete="off" class="form-control" bsDaterangepicker triggers="click" #fromTo="bsDaterangepicker" [bsConfig]="bsFromToConfig()" [ngModel]="value" (ngModelChange)="updateFromTo($event)" [placeholder]="dateFormat"/>
            </div>
        </div>
        <div *ngIf="!options.closedRange" class="sq-date-range-picker form-row">
            <div class="col-auto">
                <input type="text" autocomplete="off" [id]="fromName" class="form-control sq-range-from" bsDatepicker triggers="click" #from="bsDatepicker" [bsConfig]="bsFromConfig()" [ngModel]="value[0]" (ngModelChange)="updateFrom($event)" [placeholder]="dateFormat"/>
            </div>
            <div class="col-auto sq-separator">{{'msg#advanced.dateRangePicker.separator' | sqMessage}}</div>
            <div class="col-auto">
                <input type="text" autocomplete="off" [id]="toName" class="form-control sq-range-to" bsDatepicker triggers="click" #to="bsDatepicker" [bsConfig]="bsToConfig()" [ngModel]="value[1]" (ngModelChange)="updateTo($event)" [placeholder]="dateFormat"/>
            </div>
        </div>
    `,
                providers: [DATE_RANGE_PICKER_VALUE_ACCESSOR]
            }]
    }], function () { return [{ type: IntlService }]; }, { options: [{
            type: Input
        }], fromToPicker: [{
            type: ViewChild,
            args: ["fromTo", { static: false }]
        }], fromPicker: [{
            type: ViewChild,
            args: ["from", { static: false }]
        }], toPicker: [{
            type: ViewChild,
            args: ["to", { static: false }]
        }] }); })();

const _c0$1 = function () { return { standalone: true }; };
function BsAdvancedFormRange_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 4);
    ɵɵelementStart(1, "div", 5);
    ɵɵelementStart(2, "input", 6);
    ɵɵlistener("ngModelChange", function BsAdvancedFormRange_div_4_Template_input_ngModelChange_2_listener($event) { ɵɵrestoreView(_r3); const ctx_r2 = ɵɵnextContext(); return ctx_r2.updateFrom($event); });
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(3, "div", 7);
    ɵɵtext(4);
    ɵɵpipe(5, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementStart(6, "div", 5);
    ɵɵelementStart(7, "input", 8);
    ɵɵlistener("ngModelChange", function BsAdvancedFormRange_div_4_Template_input_ngModelChange_7_listener($event) { ɵɵrestoreView(_r3); const ctx_r4 = ɵɵnextContext(); return ctx_r4.updateTo($event); });
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("field", ctx_r0.field)("validationForm", ctx_r0.form)("id", ctx_r0.field);
    ɵɵadvance(2);
    ɵɵproperty("id", ctx_r0.fromName)("ngModel", ctx_r0.value[0])("ngModelOptions", ɵɵpureFunction0(12, _c0$1));
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(5, 10, "msg#advanced.rangeSeparator"));
    ɵɵadvance(3);
    ɵɵproperty("id", ctx_r0.toName)("ngModel", ctx_r0.value[1])("ngModelOptions", ɵɵpureFunction0(13, _c0$1));
} }
const _c1$1 = function (a0, a3, a4) { return { name: a0, system: false, closedRange: false, minDate: a3, maxDate: a4 }; };
function BsAdvancedFormRange_sq_date_range_picker_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "sq-date-range-picker", 9);
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("options", ɵɵpureFunction3(5, _c1$1, ctx_r1.field, ctx_r1.minDate, ctx_r1.maxDate))("formControlName", ctx_r1.field)("id", ctx_r1.field)("field", ctx_r1.field)("validationForm", ctx_r1.form);
} }
class BsAdvancedFormRange {
    constructor(appService) {
        this.appService = appService;
    }
    ngOnInit() {
        this.fromName = "from_" + this.field;
        this.toName = "to_" + this.field;
        this.forName = this.fromName;
        this.column = this.appService.getColumn(this.field);
        if (this.label === undefined) {
            this.label = this.appService.getPluralLabel(this.field);
        }
        this.isDate = !!this.column && AppService.isDate(this.column);
        if (this.isDate) {
            this.minDate = Utils.isDate(this.min)
                ? this.min
                : undefined;
            this.maxDate = Utils.isDate(this.max)
                ? this.max
                : undefined;
        }
        this.control = this.form.get(this.field);
        if (this.control) {
            this.value = this.control.value;
            this._valueChangesSubscription = Utils.subscribe(this.control.valueChanges, (value) => {
                this.value = value;
            });
        }
        else {
            throw new Error("No form control named " + this.field);
        }
    }
    ngOnDestroy() {
        if (this._valueChangesSubscription) {
            this._valueChangesSubscription.unsubscribe();
        }
    }
    ensureValue(value) {
        if (this.isDate) {
            const value1 = Utils.toDate(value);
            if (value1 !== undefined) {
                return value1;
            }
        }
        else if (this.column && AppService.isNumber(this.column)) {
            if (Utils.testFloat(value)) {
                return Utils.toNumber(value);
            }
        }
        return value;
    }
    updateFrom(from) {
        this.value[0] = this.ensureValue(from);
        if (this.control) {
            this.control.markAsDirty();
            this.control.setValue(this.value);
        }
    }
    updateTo(to) {
        this.value[1] = this.ensureValue(to);
        if (this.control) {
            this.control.markAsDirty();
            this.control.setValue(this.value);
        }
    }
}
BsAdvancedFormRange.ɵfac = function BsAdvancedFormRange_Factory(t) { return new (t || BsAdvancedFormRange)(ɵɵdirectiveInject(AppService)); };
BsAdvancedFormRange.ɵcmp = ɵɵdefineComponent({ type: BsAdvancedFormRange, selectors: [["sq-advanced-form-range"]], inputs: { form: "form", field: "field", min: "min", max: "max", label: "label" }, decls: 6, vars: 7, consts: [[1, "form-group", 3, "formGroup"], [3, "for"], ["class", "sq-advanced-form-range form-row", "sqAdvancedFormValidation", "", 3, "field", "validationForm", "id", 4, "ngIf"], ["sqAdvancedFormValidation", "", 3, "options", "formControlName", "id", "field", "validationForm", 4, "ngIf"], ["sqAdvancedFormValidation", "", 1, "sq-advanced-form-range", "form-row", 3, "field", "validationForm", "id"], [1, "col-auto", "d-flex", "flex-column"], ["type", "text", "autocomplete", "off", "spellcheck", "off", 1, "form-control", "sq-range-from", 3, "id", "ngModel", "ngModelOptions", "ngModelChange"], [1, "col-auto", "sq-separator"], ["type", "text", "autocomplete", "off", "spellcheck", "off", 1, "form-control", "sq-range-to", 3, "id", "ngModel", "ngModelOptions", "ngModelChange"], ["sqAdvancedFormValidation", "", 3, "options", "formControlName", "id", "field", "validationForm"]], template: function BsAdvancedFormRange_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "label", 1);
        ɵɵtext(2);
        ɵɵpipe(3, "sqMessage");
        ɵɵelementEnd();
        ɵɵtemplate(4, BsAdvancedFormRange_div_4_Template, 8, 14, "div", 2);
        ɵɵtemplate(5, BsAdvancedFormRange_sq_date_range_picker_5_Template, 1, 9, "sq-date-range-picker", 3);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("formGroup", ctx.form);
        ɵɵadvance(1);
        ɵɵpropertyInterpolate("for", ctx.forName);
        ɵɵadvance(1);
        ɵɵtextInterpolate(ɵɵpipeBind1(3, 5, ctx.label));
        ɵɵadvance(2);
        ɵɵproperty("ngIf", !ctx.isDate);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.isDate);
    } }, directives: [NgControlStatusGroup, FormGroupDirective, NgIf, BsAdvancedFormValidation, DefaultValueAccessor, NgControlStatus, NgModel, BsDateRangePicker, FormControlName], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsAdvancedFormRange, [{
        type: Component,
        args: [{
                selector: "sq-advanced-form-range",
                templateUrl: "./advanced-form-range.html"
            }]
    }], function () { return [{ type: AppService }]; }, { form: [{
            type: Input
        }], field: [{
            type: Input
        }], min: [{
            type: Input
        }], max: [{
            type: Input
        }], label: [{
            type: Input
        }] }); })();

const _c0$2 = ["button"];
const _c1$2 = function (a0, a1) { return { active: a0, first: a1 }; };
function BsSelectComponent_div_6_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 7);
    ɵɵlistener("click", function BsSelectComponent_div_6_a_1_Template_a_click_0_listener() { ɵɵrestoreView(_r6); const i_r4 = ctx.index; const ctx_r5 = ɵɵnextContext(2); return ctx_r5.toggleItemSelected(i_r4); })("keydown", function BsSelectComponent_div_6_a_1_Template_a_keydown_0_listener($event) { ɵɵrestoreView(_r6); const ctx_r7 = ɵɵnextContext(2); return ctx_r7.keydown($event); });
    ɵɵelement(1, "span");
    ɵɵelementStart(2, "span");
    ɵɵtext(3);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const itemName_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵclassMapInterpolate1("dropdown-item", ctx_r2.activeItem === i_r4 ? " active" : "", "");
    ɵɵproperty("sqScrollIntoView", ɵɵpureFunction2(8, _c1$2, i_r4 === ctx_r2.activeItem, i_r4 === 0));
    ɵɵadvance(1);
    ɵɵclassMapInterpolate1("fas fa-check ", ctx_r2.isItemSelected(i_r4) ? "" : " invisible", " left");
    ɵɵadvance(2);
    ɵɵtextInterpolate(itemName_r3);
} }
function BsSelectComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 5);
    ɵɵlistener("mousedown", function BsSelectComponent_div_6_Template_div_mousedown_0_listener($event) { ɵɵrestoreView(_r9); const ctx_r8 = ɵɵnextContext(); return ctx_r8.mousedown($event); });
    ɵɵtemplate(1, BsSelectComponent_div_6_a_1_Template, 4, 11, "a", 6);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleProp("max-height", ctx_r1.itemListHeight);
    ɵɵproperty("hidden", !ctx_r1.isOpen);
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r1.names);
} }
class BsSelectComponent {
    constructor() {
        this.opened = false;
        this.isOpen = false;
        this.activeItem = -1;
        this.cancelBlur = false; // For IE which takes focus when clicking on dropdown scrollbar despite the mousedown handling
        this.onChangeCallback = () => { };
    }
    ngOnInit() {
        this.clearSelected();
        if (this.items.length === 0) {
            this.disabled = false;
        }
        this.names = [];
        this.items.forEach(item => this.names.push(item.display));
    }
    setOpen(value) {
        if (!this.opened) {
            if (this.disabled || !value) {
                return;
            }
            this.opened = true;
        }
        this.isOpen = value;
        if (!value) {
            this.activeItem = -1;
        }
    }
    mousedown(event) {
        event.preventDefault();
        this.cancelBlur = true;
        Utils.delay().then(() => this.cancelBlur = false);
    }
    blur(event) {
        if (this.cancelBlur) {
            event.preventDefault();
            event.stopImmediatePropagation();
            Utils.delay().then(() => {
                this.buttonElement.nativeElement.focus();
            });
            return;
        }
        this.setOpen(false);
    }
    toggleOpen() {
        if (this.disabled) {
            return;
        }
        this.setOpen(!this.isOpen);
    }
    keydown($event) {
        if (this.disabled) {
            return;
        }
        // arrow down
        if ($event.keyCode === Keys.down) {
            if (!this.isOpen) {
                this.setOpen(true);
            }
            this.activeItem++;
            if (this.activeItem >= this.items.length) {
                this.activeItem = 0;
            }
            $event.preventDefault();
            $event.stopPropagation();
        }
        // arrow up
        else if ($event.keyCode === Keys.up) {
            if (!this.isOpen) {
                this.setOpen(true);
            }
            this.activeItem--;
            if (this.activeItem < 0) {
                this.activeItem = this.items.length - 1;
            }
            $event.preventDefault();
            $event.stopPropagation();
        }
        // enter or space
        else if (($event.keyCode === Keys.enter || $event.keyCode === Keys.space) &&
            this.activeItem >= 0 && this.activeItem < this.items.length) {
            this.toggleItemSelected(this.activeItem);
            $event.preventDefault();
            $event.stopPropagation();
        }
        // escape
        else if ($event.keyCode === Keys.esc && this.isOpen) {
            this.setOpen(false);
            $event.preventDefault();
            $event.stopPropagation();
        }
    }
    clearSelected() {
        this.selectedItems = [];
    }
    countSelected() {
        return this.selectedItems.length;
    }
    isItemSelected(itemIndex) {
        return this.selectedItems.includes(itemIndex);
    }
    toggleItemSelected(itemIndex) {
        const idx = this.selectedItems.indexOf(itemIndex);
        // Remove item if it was already selected
        if (idx > -1) {
            this.selectedItems.splice(idx, 1);
        }
        // regular case: just add the index, and update the active item if it exists
        else if (this.multiple) {
            this.selectedItems.push(itemIndex);
            if (this.activeItem >= 0)
                this.activeItem = itemIndex;
        }
        // single-item case: ensure there is only one selected item, and close the menu
        else {
            this.selectedItems = [itemIndex];
            this.setOpen(false);
        }
        this.triggerOnChange();
    }
    /* Template properties */
    get buttonTitleMessageParams() {
        return {
            values: {
                count: this.countSelected()
            }
        };
    }
    get buttonTitle() {
        const selectCount = this.countSelected();
        if (selectCount === 0) {
            return "msg#advanced.select.noItems";
        }
        if (!this.multiple) {
            return this.items[this.selectedItems[0]].display;
        }
        if (selectCount === this.items.length) {
            return "msg#advanced.select.allItems";
        }
        //Get list of items names corresponding to selected indices
        return this.selectedItems
            .map(index => this.items[index].display)
            .sort()
            .join(", ");
    }
    get itemListHeight() {
        // use 10 as default
        return (10 * 4) + "ex";
    }
    /* End Template properties */
    /* Change event */
    triggerOnChange() {
        // Gather selected item values
        let values;
        // We can not pass an empty array, when empty use undefined instead
        if (this.selectedItems.length === 0) {
            values = undefined;
        }
        // return an array if multiple
        else if (this.multiple) {
            values = this.selectedItems.map(index => this.items[index]);
        }
        // directly pass the value if not multiple
        else {
            values = this.items[this.selectedItems[0]];
        }
        this.onChangeCallback(values);
    }
    /* End Change event */
    /* ControlValueAccessor methods */
    writeValue(value) {
        this.clearSelected();
        if (value) {
            // the value may not be an array if this select is not multiple
            const asArray = Array.isArray(value) ? value : [value];
            //Mark items as selected based on input values
            this.items.forEach((item, index) => {
                if (asArray.find((el) => el.value === item.value) && index !== undefined) {
                    this.selectedItems.push(index);
                }
            });
        }
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
    }
}
BsSelectComponent.ɵfac = function BsSelectComponent_Factory(t) { return new (t || BsSelectComponent)(); };
BsSelectComponent.ɵcmp = ɵɵdefineComponent({ type: BsSelectComponent, selectors: [["sq-select"]], viewQuery: function BsSelectComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0$2, true);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.buttonElement = _t.first);
    } }, inputs: { items: "items", disabled: "disabled", multiple: "multiple" }, features: [ɵɵProvidersFeature([{
                provide: NG_VALUE_ACCESSOR,
                multi: true,
                useExisting: forwardRef(() => BsSelectComponent),
            }])], decls: 7, vars: 8, consts: [[1, "dropdown"], ["data-toggle", "dropdown", "type", "button", "role", "button", "tabindex", "0", 3, "click", "blur", "keydown"], ["button", ""], [1, "sq-button-text"], ["class", "dropdown-menu dropdown-menu-left show", "role", "combobox", 3, "hidden", "max-height", "mousedown", 4, "ngIf"], ["role", "combobox", 1, "dropdown-menu", "dropdown-menu-left", "show", 3, "hidden", "mousedown"], ["tabindex", "-1", 3, "class", "sqScrollIntoView", "click", "keydown", 4, "ngFor", "ngForOf"], ["tabindex", "-1", 3, "sqScrollIntoView", "click", "keydown"]], template: function BsSelectComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "button", 1, 2);
        ɵɵlistener("click", function BsSelectComponent_Template_button_click_1_listener() { return ctx.toggleOpen(); })("blur", function BsSelectComponent_Template_button_blur_1_listener($event) { return ctx.blur($event); })("keydown", function BsSelectComponent_Template_button_keydown_1_listener($event) { return ctx.keydown($event); });
        ɵɵelementStart(3, "span", 3);
        ɵɵtext(4);
        ɵɵpipe(5, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵtemplate(6, BsSelectComponent_div_6_Template, 2, 4, "div", 4);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵclassMapInterpolate1("btn btn-light ", ctx.disabled ? " disabled" : "", " dropdown-toggle form-control");
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind2(5, 5, ctx.buttonTitle, ctx.buttonTitleMessageParams));
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.opened);
    } }, directives: [NgIf, NgForOf, ScrollIntoView], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsSelectComponent, [{
        type: Component,
        args: [{
                selector: "sq-select",
                templateUrl: "./select.html",
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        multi: true,
                        useExisting: forwardRef(() => BsSelectComponent),
                    }]
            }]
    }], null, { items: [{
            type: Input
        }], disabled: [{
            type: Input
        }], multiple: [{
            type: Input
        }], buttonElement: [{
            type: ViewChild,
            args: ["button", { static: false }]
        }] }); })();

class BsAdvancedFormSelect {
    constructor(appService, firstPageService) {
        this.appService = appService;
        this.firstPageService = firstPageService;
    }
    ngOnInit() {
        const control = this.form.get(this.field);
        if (!control) {
            throw new Error("No control in search-form named " + this.field);
        }
        this.column = this.appService.getColumn(this.field);
        this.items = this.getItems();
        if (this.label === undefined) {
            if (this.multiple) {
                this.label = this.appService.getPluralLabel(this.field);
            }
            else {
                this.label = this.appService.getLabel(this.field);
            }
        }
    }
    ngOnDestroy() {
        if (this._valueChangesSubscription) {
            this._valueChangesSubscription.unsubscribe();
        }
    }
    getItems() {
        const firstPage = this.firstPageService.firstPage;
        if (firstPage) {
            // Find aggregation for field
            const condition = (this.aggregation) ?
                (aggr) => Utils.eqNC(aggr.name, this.aggregation) :
                (aggr) => this.column && Utils.eqNC(aggr.column, this.column.name);
            const aggregation = firstPage.aggregations.find(condition);
            if (aggregation && aggregation.items) {
                return aggregation.items
                    .filter((item) => !Utils.isArray(item.value) && !!item.value)
                    .map((item) => ({
                    value: item.value,
                    display: item.display ? item.display : item.value.toString()
                }));
            }
        }
        return [];
    }
}
BsAdvancedFormSelect.ɵfac = function BsAdvancedFormSelect_Factory(t) { return new (t || BsAdvancedFormSelect)(ɵɵdirectiveInject(AppService), ɵɵdirectiveInject(FirstPageService)); };
BsAdvancedFormSelect.ɵcmp = ɵɵdefineComponent({ type: BsAdvancedFormSelect, selectors: [["sq-advanced-form-select"]], inputs: { form: "form", field: "field", label: "label", multiple: "multiple", aggregation: "aggregation" }, decls: 5, vars: 11, consts: [[1, "form-group", 3, "formGroup"], [3, "for"], ["sqAdvancedFormValidation", "", 3, "items", "multiple", "formControlName", "id", "field", "validationForm"]], template: function BsAdvancedFormSelect_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "label", 1);
        ɵɵtext(2);
        ɵɵpipe(3, "sqMessage");
        ɵɵelementEnd();
        ɵɵelement(4, "sq-select", 2);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("formGroup", ctx.form);
        ɵɵadvance(1);
        ɵɵpropertyInterpolate("for", ctx.field);
        ɵɵadvance(1);
        ɵɵtextInterpolate(ɵɵpipeBind1(3, 9, ctx.label));
        ɵɵadvance(2);
        ɵɵproperty("items", ctx.items)("multiple", ctx.multiple)("formControlName", ctx.field)("id", ctx.field)("field", ctx.field)("validationForm", ctx.form);
    } }, directives: [NgControlStatusGroup, FormGroupDirective, BsSelectComponent, BsAdvancedFormValidation, NgControlStatus, FormControlName], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsAdvancedFormSelect, [{
        type: Component,
        args: [{
                selector: "sq-advanced-form-select",
                templateUrl: "./advanced-form-select.html",
            }]
    }], function () { return [{ type: AppService }, { type: FirstPageService }]; }, { form: [{
            type: Input
        }], field: [{
            type: Input
        }], label: [{
            type: Input
        }], multiple: [{
            type: Input
        }], aggregation: [{
            type: Input
        }] }); })();

const _c0$3 = ["picker"];
const _c1$3 = ["input"];
const DATE_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BsDatePicker),
    multi: true
};
class BsDatePicker {
    constructor(intlService) {
        this.intlService = intlService;
        this.SystemFormat = 'YYYY-MM-DD';
        this.onChangeCallback = () => { };
    }
    ngOnInit() {
        if (!this.options) {
            this.options = {};
        }
    }
    get dateFormat() {
        return this.options.system ? this.SystemFormat : moment.localeData().longDateFormat('L');
    }
    setLocale() {
        if (!!this.picker && this.picker.isOpen) {
            this.picker.hide();
            this.picker.show();
        }
    }
    ngAfterViewInit() {
        this.setLocale();
        this.localeChange = Utils.subscribe(this.intlService.events, (value) => {
            this.setLocale();
        });
    }
    ngOnDestroy() {
        if (this.localeChange) {
            this.localeChange.unsubscribe();
        }
    }
    bsConfig() {
        return {
            minDate: this.options.minDate,
            maxDate: this.options.maxDate,
            containerClass: 'theme-default',
            showWeekNumbers: false,
            dateInputFormat: this.options.system ? this.SystemFormat : moment.localeData().longDateFormat('L')
        };
    }
    updateValue(value) {
        this.value = value;
        this.zeroTimes(this.value);
        this.onChangeCallback(this.value);
        this.focus();
    }
    zeroTimes(value) {
        if (Utils.isDate(value)) { // includes null checking
            value.setHours(0, 0, 0, 0);
        }
    }
    focus() {
        if (this.input) {
            this.input.nativeElement.focus();
        }
    }
    //#region ControlValueAccessor
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
    }
}
BsDatePicker.ɵfac = function BsDatePicker_Factory(t) { return new (t || BsDatePicker)(ɵɵdirectiveInject(IntlService)); };
BsDatePicker.ɵcmp = ɵɵdefineComponent({ type: BsDatePicker, selectors: [["sq-date-picker"]], viewQuery: function BsDatePicker_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0$3, true);
        ɵɵviewQuery(_c1$3, true);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.picker = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.input = _t.first);
    } }, inputs: { options: "options" }, features: [ɵɵProvidersFeature([DATE_PICKER_VALUE_ACCESSOR])], decls: 5, vars: 3, consts: [[1, "sq-date-picker", "form-row"], [1, "col"], ["type", "text", "autocomplete", "off", "bsDatepicker", "", "triggers", "click", 1, "form-control", 3, "bsConfig", "ngModel", "placeholder", "ngModelChange"], ["input", "", "picker", "bsDatepicker"]], template: function BsDatePicker_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "div", 1);
        ɵɵelementStart(2, "input", 2, 3);
        ɵɵlistener("ngModelChange", function BsDatePicker_Template_input_ngModelChange_2_listener($event) { return ctx.updateValue($event); });
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(2);
        ɵɵproperty("bsConfig", ctx.bsConfig())("ngModel", ctx.value)("placeholder", ctx.dateFormat);
    } }, directives: [BsDatepickerInputDirective, DefaultValueAccessor, BsDatepickerDirective, NgControlStatus, NgModel], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsDatePicker, [{
        type: Component,
        args: [{
                selector: "sq-date-picker",
                template: `
        <div class="sq-date-picker form-row">
            <div class="col">
                <input type="text" #input class="form-control" autocomplete="off" bsDatepicker triggers="click" #picker="bsDatepicker" [bsConfig]="bsConfig()" [ngModel]="value" (ngModelChange)="updateValue($event)" [placeholder]="dateFormat" />
            </div>
        </div>
    `,
                providers: [DATE_PICKER_VALUE_ACCESSOR]
            }]
    }], function () { return [{ type: IntlService }]; }, { options: [{
            type: Input
        }], picker: [{
            type: ViewChild,
            args: ["picker", { static: false }]
        }], input: [{
            type: ViewChild,
            args: ['input', { static: false }]
        }] }); })();

class BsAdvancedModule {
}
BsAdvancedModule.ɵmod = ɵɵdefineNgModule({ type: BsAdvancedModule });
BsAdvancedModule.ɵinj = ɵɵdefineInjector({ factory: function BsAdvancedModule_Factory(t) { return new (t || BsAdvancedModule)(); }, imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            IntlModule,
            // ngx-bootstrap
            BsDatepickerModule.forRoot(),
            UtilsModule,
            BsAutocompleteModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BsAdvancedModule, { declarations: [BsAdvancedFormCheckbox,
        BsAdvancedFormInput,
        BsAdvancedFormRange,
        BsAdvancedFormSelect,
        BsAdvancedFormMultiInput,
        BsDatePicker,
        BsDateRangePicker,
        BsSelectComponent,
        BsAdvancedFormAutocompleteMultiInput,
        BsAdvancedFormAutocomplete,
        BsAdvancedFormValidation], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IntlModule, BsDatepickerModule, UtilsModule,
        BsAutocompleteModule], exports: [BsAdvancedFormCheckbox,
        BsAdvancedFormInput,
        BsAdvancedFormRange,
        BsAdvancedFormSelect,
        BsAdvancedFormMultiInput,
        BsDatePicker,
        BsDateRangePicker,
        BsSelectComponent,
        BsAdvancedFormAutocompleteMultiInput,
        BsAdvancedFormAutocomplete,
        BsAdvancedFormValidation] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsAdvancedModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    IntlModule,
                    // ngx-bootstrap
                    BsDatepickerModule.forRoot(),
                    UtilsModule,
                    BsAutocompleteModule
                ],
                declarations: [
                    BsAdvancedFormCheckbox,
                    BsAdvancedFormInput,
                    BsAdvancedFormRange,
                    BsAdvancedFormSelect,
                    BsAdvancedFormMultiInput,
                    BsDatePicker,
                    BsDateRangePicker,
                    BsSelectComponent,
                    BsAdvancedFormAutocompleteMultiInput,
                    BsAdvancedFormAutocomplete,
                    BsAdvancedFormValidation,
                ],
                exports: [
                    BsAdvancedFormCheckbox,
                    BsAdvancedFormInput,
                    BsAdvancedFormRange,
                    BsAdvancedFormSelect,
                    BsAdvancedFormMultiInput,
                    BsDatePicker,
                    BsDateRangePicker,
                    BsSelectComponent,
                    BsAdvancedFormAutocompleteMultiInput,
                    BsAdvancedFormAutocomplete,
                    BsAdvancedFormValidation,
                ]
            }]
    }], null, null); })();

var _enAdvanced = {
    "advanced": {
        "rangeSeparator": " / ",
        "dateRangePicker": {
            "separator": " / "
        },
        "rangeInput": {
            "separator": "/"
        },
        "select": {
            "nItems": "{count} items selected",
            "allItems": "All items selected",
            "noItems": "No items selected"
        }
    }
};

var _frAdvanced = {
    "advanced": {
        "rangeSeparator": " / ",
        "dateRangePicker": {
            "separator": " / "
        },
        "rangeInput": {
            "separator": "/"
        },
        "select": {
            "nItems": "{count} éléments sélectionnés",
            "allItems": "Tous les éléments",
            "noItems": "Aucun élément"
        }
    }
};

var _deAdvanced = {
    "advanced": {
        "rangeSeparator": " / ",
        "dateRangePicker": {
            "separator": " / "
        },
        "rangeInput": {
            "separator": "/"
        },
        "select": {
            "nItems": "{count} Elemente ausgewählt",
            "allItems": "Alle Elemenente ausgewählt",
            "noItems": "Keine Elemente ausgewählt"
        }
    }
};

const enAdvanced = Utils.merge({}, _enAdvanced, enSearch);
const frAdvanced = Utils.merge({}, _frAdvanced, frSearch);
const deAdvanced = Utils.merge({}, _deAdvanced, deSearch);

/**
 * Generated bundle index. Do not edit.
 */

export { AdvancedService, BsAdvancedFormAutocomplete, BsAdvancedFormAutocompleteMultiInput, BsAdvancedFormCheckbox, BsAdvancedFormInput, BsAdvancedFormMultiInput, BsAdvancedFormRange, BsAdvancedFormSelect, BsAdvancedFormValidation, BsAdvancedModule, BsDatePicker, BsDateRangePicker, BsSelectComponent, DATE_PICKER_VALUE_ACCESSOR, DATE_RANGE_PICKER_VALUE_ACCESSOR, deAdvanced, enAdvanced, frAdvanced };
//# sourceMappingURL=sinequa-components-advanced.js.map
