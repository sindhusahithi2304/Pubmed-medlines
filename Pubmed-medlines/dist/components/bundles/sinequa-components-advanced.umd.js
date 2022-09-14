(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@sinequa/core/base'), require('@sinequa/core/app-utils'), require('@sinequa/components/search'), require('@sinequa/core/validation'), require('@sinequa/core/intl'), require('@sinequa/components/autocomplete'), require('@sinequa/components/utils'), require('@angular/common'), require('moment'), require('ngx-bootstrap/datepicker')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/advanced', ['exports', '@angular/core', '@angular/forms', '@sinequa/core/base', '@sinequa/core/app-utils', '@sinequa/components/search', '@sinequa/core/validation', '@sinequa/core/intl', '@sinequa/components/autocomplete', '@sinequa/components/utils', '@angular/common', 'moment', 'ngx-bootstrap/datepicker'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components.advanced = {}), global.ng.core, global.ng.forms, global.sinequa.core.base, global.sinequa.core['app-utils'], global.sinequa.components.search, global.sinequa.core.validation, global.sinequa.core.intl, global.sinequa.components.autocomplete, global.sinequa.components.utils, global.ng.common, global.moment, global['ngx-bootstrap'].datepicker));
}(this, (function (exports, i0, i2, base, i1, i2$1, i3, i1$1, i1$2, i3$1, i3$2, moment, i3$3) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

    /* Dépendences fonctionnelles internes d'Angular */
    var AdvancedService = /** @class */ (function () {
        function AdvancedService(appService, searchService, validationService, formatService, exprBuilder) {
            var _this = this;
            this.appService = appService;
            this.searchService = searchService;
            this.validationService = validationService;
            this.formatService = formatService;
            this.exprBuilder = exprBuilder;
            /**
             * Default form validators packaged within SBA to standardize advanced-search validation
             */
            this.validators = {
                min: function (min, field) { return _this.validationService.minValidator(min, _this._parser(field)); },
                max: function (max, field) { return _this.validationService.maxValidator(max, _this._parser(field)); },
                required: i2.Validators.required,
                email: i2.Validators.email,
                pattern: function (pattern) { return i2.Validators.pattern(pattern); },
                integer: function (field) { return _this.validationService.integerValidator(_this._parser(field)); },
                number: function (field) { return _this.validationService.numberValidator(_this._parser(field)); },
                date: function (field) { return _this.validationService.dateValidator(_this._parser(field)); },
                range: function (field) { return _this.validationService.rangeValidator(_this._rangeType(field), _this._parser(field)); },
            };
        }
        /**
         * Return a standard FormControl compatible with a select component
         * @param field
         * @param validators optional validators to be added to the returned FormControl
         * @param asyncValidators optional asyncValidators to be added to the returned FormControl
         * @param query Query where to fetch advanced values, if omitted, use searchService.query
         */
        AdvancedService.prototype.createSelectControl = function (field, validators, asyncValidators, query) {
            if (query === void 0) { query = this.searchService.query; }
            var value = this.getValue(field, query);
            return this.createControl(value, validators, asyncValidators);
        };
        /**
         * Return a standard FormControl compatible with a range-input component
         * @param field
         * @param validators optional validators to be added to the returned FormControl
         * @param asyncValidators optional asyncValidators to be added to the returned FormControl
         * @param query Query where to fetch advanced values, if omitted, use searchService.query
         */
        AdvancedService.prototype.createRangeControl = function (field, validators, asyncValidators, query) {
            if (query === void 0) { query = this.searchService.query; }
            var value = this.getRangeValue(field, query);
            return this.createControl(value, validators, asyncValidators);
        };
        /**
         * Return a standard FormControl compatible with a text input component
         * @param field
         * @param validators optional validators to be added to the returned FormControl
         * @param asyncValidators optional asyncValidators to be added to the returned FormControl
         * @param query Query where to fetch advanced values, if omitted, use searchService.query
         */
        AdvancedService.prototype.createInputControl = function (field, validators, asyncValidators, query) {
            if (query === void 0) { query = this.searchService.query; }
            var value = this.getValue(field, query);
            return this.createControl(value, validators, asyncValidators);
        };
        /**
         * Return a standard FormControl compatible with a multi-value text input component
         * @param field
         * @param validators optional validators to be added to the returned FormControl
         * @param asyncValidators optional asyncValidators to be added to the returned FormControl
         * @param query Query where to fetch advanced values, if omitted, use searchService.query
         */
        AdvancedService.prototype.createMultiInputControl = function (field, validators, asyncValidators, query) {
            if (query === void 0) { query = this.searchService.query; }
            var value = this.getValue(field, query);
            return this.createControl(value, validators, asyncValidators);
        };
        /**
         * Return a standard FormControl compatible with a checkbox component
         * @param field
         * @param validators optional validators to be added to the returned FormControl
         * @param asyncValidators optional asyncValidators to be added to the returned FormControl
         * @param query Query where to fetch advanced values, if omitted, use searchService.query
         */
        AdvancedService.prototype.createCheckboxControl = function (field, validators, asyncValidators, query) {
            if (query === void 0) { query = this.searchService.query; }
            var value = this.getBooleanValue(field, query);
            return this.createControl(value, validators, asyncValidators);
        };
        /**
         * Reset the supplied AbstractControl (and its validation) and sets its value to undefined
         * @param control
         */
        AdvancedService.prototype.resetControl = function (control) {
            control.reset();
            control.setValue(undefined);
        };
        /**
         * Reset the supplied AbstractControl (and its validation) and sets its value to [undefined, undefined]
         * @param control
         */
        AdvancedService.prototype.resetRangeControl = function (control) {
            control.reset();
            control.setValue([undefined, undefined]);
        };
        /**
         * Retrieve the value (ValueItem | ValueItem[] | undefined) to be set to the FormControl from the Query
         * @param field
         * @param query Query where to fetch advanced values, if omitted, use searchService.query
         */
        AdvancedService.prototype.getValue = function (field, query) {
            if (query === void 0) { query = this.searchService.query; }
            var expr = this.getAdvancedExpr(field, query);
            if (expr) {
                var value = this.getValueFromExpr(expr);
                return this.formatValueItems(field, value);
            }
            return undefined;
        };
        /**
         * Retrieve the boolean value to be set to the FormControl from the Query
         * @param field
         * @param query Query where to fetch advanced values, if omitted, use searchService.query
         */
        AdvancedService.prototype.getBooleanValue = function (field, query) {
            if (query === void 0) { query = this.searchService.query; }
            var expr = this.getAdvancedExpr(field, query);
            if (expr) {
                var value = this.getValueFromExpr(expr);
                return this.formatAdvancedValue(field, value.value);
            }
            return undefined;
        };
        /**
         * Retrieve the range value to be set to the FormControl from the Query
         * @param field
         * @param query Query where to fetch advanced values, if omitted, use searchService.query
         */
        AdvancedService.prototype.getRangeValue = function (field, query) {
            var _this = this;
            if (query === void 0) { query = this.searchService.query; }
            var expr = this.getAdvancedExpr(field, query);
            if (expr) {
                var value = this.getValueFromExpr(expr);
                if (base.Utils.isArray(value)) {
                    return value.map(function (e) { return _this.formatAdvancedValue(field, e.value); });
                }
                else {
                    var _value = this.formatAdvancedValue(field, value.value);
                    if (expr.operator === 3 /* gte */) {
                        return [_value, undefined];
                    }
                    else if (expr.operator === 5 /* lte */) {
                        return [undefined, _value];
                    }
                }
            }
            return [undefined, undefined];
        };
        /**
         * Return the select expression of an advanced filter
         * @param field
         * @param query Query where to fetch advanced values, if omitted, use searchService.query
         */
        AdvancedService.prototype.getAdvancedExpr = function (field, query) {
            if (query === void 0) { query = this.searchService.query; }
            var _a;
            var expr;
            var expression = (_a = query.findSelect(i1.advancedFacetPrefix + field)) === null || _a === void 0 ? void 0 : _a.expression;
            if (expression) {
                expr = this.appService.parseExpr(expression);
                if (expr instanceof i1.Expr) {
                    return expr;
                }
            }
            return undefined;
        };
        /**
         * Extract values from an expression
         * @param expr
         */
        AdvancedService.prototype.getValueFromExpr = function (expr) {
            var _a;
            var value;
            if (base.Utils.isString(expr.value) && expr.value.indexOf("[") > -1) {
                value = JSON.parse(expr.value.replace(/`/g, '"')).map(function (e) { return ({
                    value: e.value,
                    display: !!e.display ? e.display : e.value,
                }); });
            }
            else if (((_a = expr.operands) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                value = expr.operands.map(function (e) { return ({
                    value: e.value,
                    display: !!e.display ? e.display : e.value,
                }); });
            }
            if (!value) {
                if (expr.values && expr.values.length > 1) {
                    value = expr.values.map(function (e) { return ({ value: e, display: e }); });
                }
                else {
                    value = {
                        value: expr.value,
                        display: !!expr.display ? expr.display : expr.value,
                    };
                }
            }
            return value;
        };
        /**
         * Sets a select on a query (defaults to searchService.query) for a given
         * field and value(s)
         * @param field
         * @param value
         * @param query Query where to fetch advanced values, if omitted, use searchService.query
         * @param combineWithAnd
         */
        AdvancedService.prototype.setSelect = function (field, value, query, combineWithAnd) {
            var expr;
            if (value !== undefined) {
                var _value = this.asValueItems(value, field);
                if (combineWithAnd) {
                    expr = this.exprBuilder.makeAndExpr(field, _value);
                }
                else {
                    expr = this.exprBuilder.makeOrExpr(field, _value);
                }
            }
            // When expr is not defined, this simply removes the selection
            this.setAdvancedSelect(field, expr, query);
        };
        /**
         * Sets a select on a query (defaults to searchService.query) for a given
         * field and a boolean value
         * @param field
         * @param value
         * @param discardFalsy by default it is 'false', so a false value is used to be undefined
         * @param query
         */
        AdvancedService.prototype.setBooleanSelect = function (field, value, allowFalsy, query) {
            if (allowFalsy === void 0) { allowFalsy = false; }
            var expr;
            if (value === true || (value === false && allowFalsy)) {
                expr = this.exprBuilder.makeBooleanExpr(field, value);
            }
            // When expr is not defined, this simply removes the selection
            this.setAdvancedSelect(field, expr, query);
        };
        /**
         * Sets a select on a query (defaults to searchService.query) for a given
         * field, operator and value
         * @param field
         * @param value
         * @param operator
         * @param query
         */
        AdvancedService.prototype.setNumericalSelect = function (field, value, operator, query) {
            var expr;
            if (value !== undefined) {
                if (this._isValueItem(value)) {
                    value = value.value;
                }
                value = this.parse(value, field);
                expr = this.exprBuilder.makeNumericalExpr(field, operator, value);
            }
            // When expr is not defined, this simply removes the selection
            this.setAdvancedSelect(field, expr, query);
        };
        /**
         * Sets a select on a query (defaults to searchService.query) for a given
         * field and range of values
         * @param field
         * @param range
         * @param query
         */
        AdvancedService.prototype.setRangeSelect = function (field, range, query) {
            var expr;
            if (range && range.length === 2) {
                var from = this.parse(range[0] || undefined, field);
                var to = this.parse(range[1] || undefined, field);
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
        };
        /**
         * Sets a select for a given field and expression on the query (defaults to searchService.query)
         * @param query Query where to fetch advanced values, if omitted, use searchService.query
         * @param field
         * @param expr
         */
        AdvancedService.prototype.setAdvancedSelect = function (field, expr, query) {
            if (query === void 0) { query = this.searchService.query; }
            query.removeSelect(i1.advancedFacetPrefix + field);
            if (expr) {
                query.addSelect(expr, i1.advancedFacetPrefix + field);
            }
        };
        /**
         * Remove a specific advanced value by its field name.
         * By default, Trigger search() action
         * @param field
         * @param query Query from which will remove the specific advanced value, if omitted, use searchService.query
         * @param search
         */
        AdvancedService.prototype.removeAdvancedValue = function (field, search, query) {
            if (search === void 0) { search = true; }
            if (query === void 0) { query = this.searchService.query; }
            if (field) {
                query.removeSelect(i1.advancedFacetPrefix + field);
                this.searchService.setQuery(query, false);
                if (search) {
                    this.searchService.search();
                }
            }
        };
        /**
         * Remove all related advanced-search select(s) from a given query and update searchService.query accordingly
         * By default, Trigger search() action
         * @param query Query from which will remove all advanced values, if omitted, use searchService.query
         * @param search
         */
        AdvancedService.prototype.resetAdvancedValues = function (search, query) {
            if (search === void 0) { search = true; }
            if (query === void 0) { query = this.searchService.query; }
            this.searchService.setQuery(query.toStandard(), false);
            if (search) {
                this.searchService.search();
            }
        };
        /**
         * Transforms a value to a parsed ValueItem[]
         * @param value
         * @param field
         */
        AdvancedService.prototype.asValueItems = function (value, field) {
            var _this = this;
            if (this._isValueItemArray(value)) {
                return value.map(function (val) { return ({
                    value: _this.parse(val.value, field),
                    display: val.display,
                }); });
            }
            return [
                {
                    value: this.parse(value.value, field),
                    display: value.display,
                },
            ];
        };
        AdvancedService.prototype.formatValueItems = function (field, value) {
            var _this = this;
            if (this._isValueItemArray(value)) {
                return value.map(function (val) { return _this.formatValueItem(field, val); });
            }
            return this.formatValueItem(field, value);
        };
        /**
         * Format the display property of the ValueItem according its related column definition
         * @param field
         * @param value
         */
        AdvancedService.prototype.formatValueItem = function (field, value) {
            var column = this.appService.getColumn(field);
            if (column) {
                value.display = this.formatBaseAdvancedValue(value.display, column).toString();
            }
            return value;
        };
        /**
         * Format a given advanced value according to its column definition
         * @param field
         * @param value
         */
        AdvancedService.prototype.formatAdvancedValue = function (field, value) {
            var _this = this;
            if (value) {
                var column_1 = this.appService.getColumn(field);
                if (column_1) {
                    if (base.Utils.isArray(value)) {
                        return value.map(function (v) { return v ? _this.formatBaseAdvancedValue(v, column_1) : v; });
                    }
                    return this.formatBaseAdvancedValue(value, column_1);
                }
            }
            return value;
        };
        AdvancedService.prototype.formatBaseAdvancedValue = function (value, column) {
            if (value) {
                value = this.castAdvancedValue(value, column);
                return column.formatter ? this.formatService.formatValue(value, column) : value;
            }
            return value;
        };
        /**
         * Cast a given value as per its column definition
         * @param value
         * @param column
         */
        AdvancedService.prototype.castAdvancedValue = function (value, column) {
            if (column) {
                if (base.Utils.isString(value)) {
                    if (i1.AppService.isDate(column)) {
                        value = base.Utils.toDate(value);
                    }
                    else if (i1.AppService.isInteger(column)) {
                        if (base.Utils.testInteger(value)) {
                            value = base.Utils.toInt(value);
                        }
                    }
                    else if (i1.AppService.isDouble(column)) {
                        if (base.Utils.testFloat(value)) {
                            value = base.Utils.toNumber(value);
                        }
                    }
                    else if (i1.AppService.isBoolean(column)) {
                        value = base.Utils.isTrue(value);
                    }
                }
            }
            return value;
        };
        /**
         * Create a generic FormControl
         * @param value value of the FormControl
         * @param validators optional validators to be added to the returned FormControl
         * @param asyncValidators optional asyncValidators to be added to the returned FormControl
         */
        AdvancedService.prototype.createControl = function (value, validators, asyncValidators) {
            return new i2.FormControl({
                value: value,
                disabled: false,
            }, {
                validators: !!validators ? validators : [],
                asyncValidators: !!asyncValidators ? asyncValidators : [],
                updateOn: "change",
            });
        };
        /**
         * Parse a value according to its column definition
         * @param value
         * @param field
         */
        AdvancedService.prototype.parse = function (value, field) {
            var parser = this._parser(field);
            if (parser && base.Utils.isString(value)) {
                return this.formatService.parseValue(value, parser);
            }
            return value;
        };
        /**
         * Return the parser if existing in the given field
         * @param field
         */
        AdvancedService.prototype._parser = function (field) {
            var column = this.appService.getColumn(field);
            return column ? column.parser : undefined;
        };
        AdvancedService.prototype._rangeType = function (field) {
            var column = this.appService.getColumn(field);
            var rangeType;
            if (column &&
                (i1.AppService.isInteger(column) || i1.AppService.isDouble(column))) {
                rangeType = 0;
            }
            else if (column && i1.AppService.isDate(column)) {
                rangeType = new Date();
            }
            else {
                rangeType = "";
            }
            return rangeType;
        };
        /**
         * Return `true` if the passed value is an `ValueItem[]`
         */
        AdvancedService.prototype._isValueItemArray = function (value) {
            var _this = this;
            if (base.Utils.isArray(value)) {
                var condition = function (element) { return _this._isValueItem(element); };
                return value.every(condition);
            }
            return false;
        };
        /**
         * Return `true` if the passed value is an `ValueItem`
         */
        AdvancedService.prototype._isValueItem = function (value) {
            if (base.Utils.isObject(value) &&
                !base.Utils.isArray(value) &&
                !base.Utils.isDate(value)) {
                if (value.hasOwnProperty("value")) {
                    return true;
                }
            }
            return false;
        };
        return AdvancedService;
    }());
    AdvancedService.ɵfac = function AdvancedService_Factory(t) { return new (t || AdvancedService)(i0.ɵɵinject(i1.AppService), i0.ɵɵinject(i2$1.SearchService), i0.ɵɵinject(i3.ValidationService), i0.ɵɵinject(i1.FormatService), i0.ɵɵinject(i1.ExprBuilder)); };
    AdvancedService.ɵprov = i0.ɵɵdefineInjectable({ token: AdvancedService, factory: AdvancedService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AdvancedService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root",
                    }]
            }], function () { return [{ type: i1.AppService }, { type: i2$1.SearchService }, { type: i3.ValidationService }, { type: i1.FormatService }, { type: i1.ExprBuilder }]; }, null);
    })();

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var BsAdvancedFormValidation = /** @class */ (function (_super) {
        __extends(BsAdvancedFormValidation, _super);
        function BsAdvancedFormValidation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BsAdvancedFormValidation.prototype.ngOnInit = function () {
            this.options = {
                form: this.validationForm,
                controlName: this.field,
            };
            _super.prototype.ngOnInit.call(this);
        };
        return BsAdvancedFormValidation;
    }(i3.ValidationDirective));
    BsAdvancedFormValidation.ɵfac = function BsAdvancedFormValidation_Factory(t) { return ɵBsAdvancedFormValidation_BaseFactory(t || BsAdvancedFormValidation); };
    BsAdvancedFormValidation.ɵdir = i0.ɵɵdefineDirective({ type: BsAdvancedFormValidation, selectors: [["", "sqAdvancedFormValidation", ""]], inputs: { field: "field", validationForm: "validationForm" }, features: [i0.ɵɵInheritDefinitionFeature] });
    var ɵBsAdvancedFormValidation_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(BsAdvancedFormValidation);
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsAdvancedFormValidation, [{
                type: i0.Directive,
                args: [{
                        selector: "[sqAdvancedFormValidation]",
                    }]
            }], null, { field: [{
                    type: i0.Input
                }], validationForm: [{
                    type: i0.Input
                }] });
    })();

    var BsAdvancedFormCheckbox = /** @class */ (function () {
        function BsAdvancedFormCheckbox(appService) {
            this.appService = appService;
        }
        BsAdvancedFormCheckbox.prototype.ngOnChanges = function () {
            if (this.label === undefined) {
                this.label = this.appService.getLabel(this.field);
            }
        };
        return BsAdvancedFormCheckbox;
    }());
    BsAdvancedFormCheckbox.ɵfac = function BsAdvancedFormCheckbox_Factory(t) { return new (t || BsAdvancedFormCheckbox)(i0.ɵɵdirectiveInject(i1.AppService)); };
    BsAdvancedFormCheckbox.ɵcmp = i0.ɵɵdefineComponent({ type: BsAdvancedFormCheckbox, selectors: [["sq-advanced-form-checkbox"]], inputs: { form: "form", field: "field", label: "label" }, features: [i0.ɵɵNgOnChangesFeature], decls: 7, vars: 7, consts: [[1, "form-group", 3, "formGroup"], [1, "form-check"], [1, "custom-control", "custom-checkbox"], ["type", "checkbox", "sqAdvancedFormValidation", "", 1, "custom-control-input", 3, "field", "validationForm", "formControlName"], [1, "custom-control-label"]], template: function BsAdvancedFormCheckbox_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "div", 1);
                i0.ɵɵelementStart(2, "label", 2);
                i0.ɵɵelement(3, "input", 3);
                i0.ɵɵelementStart(4, "span", 4);
                i0.ɵɵtext(5);
                i0.ɵɵpipe(6, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("formGroup", ctx.form);
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("field", ctx.field)("validationForm", ctx.form)("formControlName", ctx.field);
                i0.ɵɵadvance(2);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 5, ctx.label));
            }
        }, directives: [i2.NgControlStatusGroup, i2.FormGroupDirective, i2.CheckboxControlValueAccessor, BsAdvancedFormValidation, i2.NgControlStatus, i2.FormControlName], pipes: [i1$1.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsAdvancedFormCheckbox, [{
                type: i0.Component,
                args: [{
                        selector: "sq-advanced-form-checkbox",
                        templateUrl: "./advanced-form-checkbox.html",
                    }]
            }], function () { return [{ type: i1.AppService }]; }, { form: [{
                    type: i0.Input
                }], field: [{
                    type: i0.Input
                }], label: [{
                    type: i0.Input
                }] });
    })();

    var BsAdvancedFormAutocomplete = /** @class */ (function (_super) {
        __extends(BsAdvancedFormAutocomplete, _super);
        function BsAdvancedFormAutocomplete(elementRef, suggestService, appService, uiService) {
            var _this = _super.call(this, elementRef, suggestService, appService, uiService) || this;
            _this.UpdateItem = new i0.EventEmitter();
            return _this;
        }
        /**
         * The ngOnInit() method from the original directive is overriden
         * On initialization, we listen to the autocomplete component for
         * selection events
         */
        BsAdvancedFormAutocomplete.prototype.ngOnInit = function () {
            var _this = this;
            this._dropdownSubscription = this.dropdown.clicked.subscribe(function (item) {
                _this.select(item, false); // An item was selected from the autocomplete => take the value
            });
            this.start();
        };
        BsAdvancedFormAutocomplete.prototype.getSuggests = function () {
            var value = this.getInputValue();
            if (value) {
                // If there is text, make a call to the suggest API
                this.processSuggests(this.getSuggestsObs(value, [this.field]));
            }
            else {
                // If empty input, restart autocomplete
                this.start();
            }
        };
        BsAdvancedFormAutocomplete.prototype.processSuggests = function (obs) {
            var _this = this;
            obs.subscribe(function (suggests) {
                if (_this.getState() === i1$2.AutocompleteState.ACTIVE || _this.getState() === i1$2.AutocompleteState.OPENED) {
                    _this.dropdown.update(true, suggests
                        .filter(function (item) { return item.category !== "$field$"; }) // Filter out fields
                        .map(function (item) {
                        if (!item.label) {
                            item.label = _this.appService.getLabel(item.category);
                        }
                        if (!item.normalized) {
                            item.normalized = item.display;
                        }
                        return item;
                    }));
                }
            }, function (err) {
                _this.dropdown.update(false);
            }, function () {
                if (_this.dropdown.hasItems && _this.getState() === i1$2.AutocompleteState.ACTIVE) {
                    _this.open(); // Switch from ACTIVE to OPENED (if not already)
                }
                else if (!_this.dropdown.hasItems && _this.getState() === i1$2.AutocompleteState.OPENED) { // No data
                    _this.active(); // Switch from OPENED to ACTIVE (if not already)
                }
            });
        };
        BsAdvancedFormAutocomplete.prototype.setAutocompleteItem = function (item) {
            if (item) {
                this.setInputValue(item.display);
                this.UpdateItem.next(Object.assign(Object.assign({}, item), { normalized: item.normalized ? item.normalized : item.display }));
                return true;
            }
            return false;
        };
        /**
         * Listen to blur events on the <input> host and overrides the autocomplete blur events
         */
        BsAdvancedFormAutocomplete.prototype.blur = function (event) {
            /** If there is text in the <input/> and not selected from the dropdown ==> set the item manually */
            if (this.getState() !== i1$2.AutocompleteState.SELECTED) {
                if (!!this.getInputValue() && this.getInputValue() !== "") {
                    var item = {
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
        };
        /**
         * Overrides the parent inputChanged method, so that it is possible to reinitialize the autocomplete
         * @param event
         */
        BsAdvancedFormAutocomplete.prototype.inputChanged = function (event) {
            switch (this.getState()) {
                case i1$2.AutocompleteState.OPENED:
                    this.suggest(); // Just request more data, but no state change
                    break;
                case i1$2.AutocompleteState.START:
                case i1$2.AutocompleteState.ACTIVE:
                    this.active(); // get more data, and change state if not already ACTIVE
                    break;
                case i1$2.AutocompleteState.SELECTED:
                    this.start(); // The model changed because we selected a value ==> we restart in case the user keeps typing
                    this.active();
                    break;
                case i1$2.AutocompleteState.INIT:
                    break;
            }
        };
        return BsAdvancedFormAutocomplete;
    }(i1$2.Autocomplete));
    BsAdvancedFormAutocomplete.ɵfac = function BsAdvancedFormAutocomplete_Factory(t) { return new (t || BsAdvancedFormAutocomplete)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1$2.SuggestService), i0.ɵɵdirectiveInject(i1.AppService), i0.ɵɵdirectiveInject(i3$1.UIService)); };
    BsAdvancedFormAutocomplete.ɵdir = i0.ɵɵdefineDirective({ type: BsAdvancedFormAutocomplete, selectors: [["", "sqAdvancedFormAutocomplete", ""]], hostBindings: function BsAdvancedFormAutocomplete_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("blur", function BsAdvancedFormAutocomplete_blur_HostBindingHandler($event) { return ctx.blur($event); })("input", function BsAdvancedFormAutocomplete_input_HostBindingHandler($event) { return ctx.inputChanged($event); });
            }
        }, inputs: { field: "field" }, outputs: { UpdateItem: "UpdateItem" }, features: [i0.ɵɵInheritDefinitionFeature] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsAdvancedFormAutocomplete, [{
                type: i0.Directive,
                args: [{
                        selector: "[sqAdvancedFormAutocomplete]",
                    }]
            }], function () { return [{ type: i0.ElementRef }, { type: i1$2.SuggestService }, { type: i1.AppService }, { type: i3$1.UIService }]; }, { UpdateItem: [{
                    type: i0.Output
                }], field: [{
                    type: i0.Input
                }], blur: [{
                    type: i0.HostListener,
                    args: ["blur", ["$event"]]
                }], inputChanged: [{
                    type: i0.HostListener,
                    args: ["input", ["$event"]]
                }] });
    })();

    function BsAdvancedFormInput_ng_template_8_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 6);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r3 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(item_r3.display);
        }
    }
    var BsAdvancedFormInput = /** @class */ (function () {
        function BsAdvancedFormInput(appService) {
            this.appService = appService;
        }
        BsAdvancedFormInput.prototype.ngOnChanges = function () {
            var _this = this;
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
                this._valueChangesSubscription = base.Utils.subscribe(this.control.valueChanges, function (val) {
                    if (val) {
                        _this.viewValue = val.display ? val.display : val.value.toString();
                    }
                });
            }
            else {
                throw new Error("No form control named " + this.field);
            }
        };
        BsAdvancedFormInput.prototype.ngOnDestroy = function () {
            if (this._valueChangesSubscription) {
                this._valueChangesSubscription.unsubscribe();
            }
        };
        BsAdvancedFormInput.prototype.onItemChange = function (item) {
            this.viewValue = item === null || item === void 0 ? void 0 : item.display;
            this._updateControl(item);
        };
        BsAdvancedFormInput.prototype._updateControl = function (item) {
            var _a, _b;
            var value = item
                ? {
                    value: item.normalized,
                    display: item.display
                } : undefined;
            (_a = this.control) === null || _a === void 0 ? void 0 : _a.markAsDirty();
            (_b = this.control) === null || _b === void 0 ? void 0 : _b.setValue(value, { emitEvent: false });
        };
        return BsAdvancedFormInput;
    }());
    BsAdvancedFormInput.ɵfac = function BsAdvancedFormInput_Factory(t) { return new (t || BsAdvancedFormInput)(i0.ɵɵdirectiveInject(i1.AppService)); };
    BsAdvancedFormInput.ɵcmp = i0.ɵɵdefineComponent({ type: BsAdvancedFormInput, selectors: [["sq-advanced-form-input"]], inputs: { form: "form", field: "field", suggestQuery: "suggestQuery", label: "label" }, features: [i0.ɵɵNgOnChangesFeature], decls: 10, vars: 11, consts: [[1, "form-group"], [3, "for"], [1, "d-flex", "flex-column"], ["sqAdvancedFormAutocomplete", "", "sqAdvancedFormValidation", "", "type", "text", "autocomplete", "off", "spellcheck", "off", 1, "form-control", 3, "off", "suggestQuery", "dropdown", "validationForm", "field", "id", "ngModel", "ngModelChange", "UpdateItem"], ["dropdown", ""], ["itemTpl", ""], [1, "py-2"]], template: function BsAdvancedFormInput_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "label", 1);
                i0.ɵɵtext(2);
                i0.ɵɵpipe(3, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(4, "div", 2);
                i0.ɵɵelementStart(5, "input", 3);
                i0.ɵɵlistener("ngModelChange", function BsAdvancedFormInput_Template_input_ngModelChange_5_listener($event) { return ctx.viewValue = $event; })("UpdateItem", function BsAdvancedFormInput_Template_input_UpdateItem_5_listener($event) { return ctx.onItemChange($event); });
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(6, "sq-autocomplete-list", null, 4);
                i0.ɵɵtemplate(8, BsAdvancedFormInput_ng_template_8_Template, 2, 1, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                var _r0 = i0.ɵɵreference(7);
                i0.ɵɵadvance(1);
                i0.ɵɵpropertyInterpolate("for", ctx.field);
                i0.ɵɵadvance(1);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 9, ctx.label));
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("off", !ctx.suggestQuery)("suggestQuery", ctx.suggestQuery)("dropdown", _r0)("validationForm", ctx.form)("field", ctx.field)("id", ctx.field)("ngModel", ctx.viewValue);
            }
        }, directives: [i2.DefaultValueAccessor, BsAdvancedFormAutocomplete, BsAdvancedFormValidation, i2.NgControlStatus, i2.NgModel, i1$2.BsAutocompleteList], pipes: [i1$1.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsAdvancedFormInput, [{
                type: i0.Component,
                args: [{
                        selector: "sq-advanced-form-input",
                        templateUrl: "./advanced-form-input.html"
                    }]
            }], function () { return [{ type: i1.AppService }]; }, { form: [{
                    type: i0.Input
                }], field: [{
                    type: i0.Input
                }], suggestQuery: [{
                    type: i0.Input
                }], label: [{
                    type: i0.Input
                }] });
    })();

    var BsAdvancedFormAutocompleteMultiInput = /** @class */ (function (_super) {
        __extends(BsAdvancedFormAutocompleteMultiInput, _super);
        function BsAdvancedFormAutocompleteMultiInput() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            /** Event synchronizing the list of search terms in the parent component */
            _this.itemsUpdate = new i0.EventEmitter();
            /** Stores the selected search terms selected via Tab */
            _this.items = [];
            return _this;
        }
        /**
         * The setAutocompleteItem() method from the original directive is overriden to
         * Sets the content of the <input> based on the given
         * Autocomplete Item.
         * @returns false since we don't need trigger search at this point of time
         */
        BsAdvancedFormAutocompleteMultiInput.prototype.setAutocompleteItem = function (item) {
            if (item) {
                // Store the autocomplete items that will be used to create a selection
                this.items.push(item);
                this.itemsUpdate.next(this.items);
                this.setInputValue("");
            }
            return false;
        };
        /**
         * Listen to user's keyboard actions in the <input>, in order to navigate
         * and select the autocomplete suggestions.
         * Overrides the parent keydown method, adds the management of the backspace key
         * to remove items, enhance the enter key to support adding new items.
         * @param event the keyboard
         */
        BsAdvancedFormAutocompleteMultiInput.prototype.keydown = function (event) {
            var keydown = _super.prototype.keydown.call(this, event);
            if (keydown === undefined) {
                /** We can remove selections by typing <backspace> when the input is empty */
                if (event.keyCode === base.Keys.backspace) {
                    if (this.getInputValue() === "") {
                        this.items.pop();
                        this.itemsUpdate.next(this.items);
                    }
                }
                /** Allow the selection one of new item */
                if (event.keyCode === base.Keys.enter) {
                    this._manageSetAutocompleteItem();
                }
            }
            return keydown;
        };
        /**
         * Listens to blur events (out of focus) on the <input> host and overrides the parent blur events
         */
        BsAdvancedFormAutocompleteMultiInput.prototype.blur = function (event) {
            this._manageSetAutocompleteItem();
            this.init();
        };
        BsAdvancedFormAutocompleteMultiInput.prototype._manageSetAutocompleteItem = function () {
            /** Always consider if there is text in the <input> and that it is not yet added in items  */
            if (!!this.getInputValue() && this.getInputValue() !== "") {
                this.setAutocompleteItem({
                    display: this.getInputValue(),
                    normalized: this.getInputValue(),
                    category: "",
                });
            }
        };
        return BsAdvancedFormAutocompleteMultiInput;
    }(BsAdvancedFormAutocomplete));
    BsAdvancedFormAutocompleteMultiInput.ɵfac = function BsAdvancedFormAutocompleteMultiInput_Factory(t) { return ɵBsAdvancedFormAutocompleteMultiInput_BaseFactory(t || BsAdvancedFormAutocompleteMultiInput); };
    BsAdvancedFormAutocompleteMultiInput.ɵdir = i0.ɵɵdefineDirective({ type: BsAdvancedFormAutocompleteMultiInput, selectors: [["", "sqAdvancedFormAutocompleteMultiInput", ""]], hostBindings: function BsAdvancedFormAutocompleteMultiInput_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("blur", function BsAdvancedFormAutocompleteMultiInput_blur_HostBindingHandler($event) { return ctx.blur($event); });
            }
        }, inputs: { items: "items" }, outputs: { itemsUpdate: "itemsUpdate" }, features: [i0.ɵɵInheritDefinitionFeature] });
    var ɵBsAdvancedFormAutocompleteMultiInput_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(BsAdvancedFormAutocompleteMultiInput);
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsAdvancedFormAutocompleteMultiInput, [{
                type: i0.Directive,
                args: [{
                        selector: "[sqAdvancedFormAutocompleteMultiInput]",
                    }]
            }], null, { itemsUpdate: [{
                    type: i0.Output
                }], items: [{
                    type: i0.Input
                }], blur: [{
                    type: i0.HostListener,
                    args: ["blur", ["$event"]]
                }] });
    })();

    function BsAdvancedFormMultiInput_span_6_Template(rf, ctx) {
        if (rf & 1) {
            var _r6_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "span", 7);
            i0.ɵɵtext(1);
            i0.ɵɵelementStart(2, "span", 8);
            i0.ɵɵlistener("click", function BsAdvancedFormMultiInput_span_6_Template_span_click_2_listener() { i0.ɵɵrestoreView(_r6_1); var item_r4 = ctx.$implicit; var ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.removeItem(item_r4); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r4 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", item_r4.display, " ");
        }
    }
    function BsAdvancedFormMultiInput_ng_template_10_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 9);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r7 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1("", item_r7.display, " ");
        }
    }
    /**
     * Component representing a text input that accepts multiple entries.
     * This component also performs value validation on each entry.
     *
     */
    var BsAdvancedFormMultiInput = /** @class */ (function () {
        function BsAdvancedFormMultiInput(elementRef, appService) {
            this.elementRef = elementRef;
            this.appService = appService;
            this.items = []; /** List of items already existing in the advanced search */
        }
        BsAdvancedFormMultiInput.prototype.ngOnChanges = function () {
            var _this = this;
            if (this.label === undefined) {
                this.label = this.appService.getPluralLabel(this.field);
            }
            this.control = this.form.get(this.field);
            if (this.control) {
                this.items = this.control.value
                    ? (base.Utils.isArray(this.control.value)
                        ? this.control.value
                        : [this.control.value]).map(function (item) {
                        return {
                            display: item.display ? item.display : item.value.toString(),
                            normalized: item.value.toString(),
                            category: "",
                        };
                    })
                    : [];
                this._valueChangesSubscription = base.Utils.subscribe(this.control.valueChanges, function (value) {
                    if (value && !base.Utils.isArray(value)) {
                        value = [value];
                    }
                    _this.items = value
                        ? value.map(function (item) {
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
        };
        BsAdvancedFormMultiInput.prototype.ngOnDestroy = function () {
            if (this._valueChangesSubscription) {
                this._valueChangesSubscription.unsubscribe();
            }
        };
        BsAdvancedFormMultiInput.prototype.removeItem = function (item) {
            this.items.splice(this.items.indexOf(item), 1);
            this._updateControl();
        };
        BsAdvancedFormMultiInput.prototype.onItemsChanged = function (items) {
            this.items = items;
            this._updateControl();
        };
        BsAdvancedFormMultiInput.prototype.keydown = function (event) {
            // Intercept tab and set focus to surrounding dropdown-item
            if (event.keyCode === base.Keys.tab) {
                var dropdownItem = this._getDropdownItem();
                if (dropdownItem) {
                    dropdownItem.focus();
                    event.preventDefault();
                    return false;
                }
            }
            return undefined;
        };
        BsAdvancedFormMultiInput.prototype.keypress = function (event) {
            if (event.keyCode === base.Keys.enter) {
                // Stop click event firing on surrounding anchor (Firefox)
                event.preventDefault();
                return false;
            }
            return undefined;
        };
        BsAdvancedFormMultiInput.prototype._updateControl = function () {
            var _a, _b;
            var value = this.items.length > 0
                ? this.items.map(function (item) { return ({
                    value: item.normalized,
                    display: item.display
                }); })
                : undefined;
            (_a = this.control) === null || _a === void 0 ? void 0 : _a.markAsDirty();
            (_b = this.control) === null || _b === void 0 ? void 0 : _b.setValue(value, { emitEvent: false });
        };
        BsAdvancedFormMultiInput.prototype._getDropdownItem = function () {
            if (this.elementRef) {
                var current = this.elementRef
                    .nativeElement;
                while (current && !current.classList.contains("dropdown-item")) {
                    current = current.parentElement;
                }
                return current;
            }
            return null;
        };
        return BsAdvancedFormMultiInput;
    }());
    BsAdvancedFormMultiInput.ɵfac = function BsAdvancedFormMultiInput_Factory(t) { return new (t || BsAdvancedFormMultiInput)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.AppService)); };
    BsAdvancedFormMultiInput.ɵcmp = i0.ɵɵdefineComponent({ type: BsAdvancedFormMultiInput, selectors: [["sq-advanced-form-multi-input"]], inputs: { form: "form", field: "field", suggestQuery: "suggestQuery", label: "label" }, features: [i0.ɵɵNgOnChangesFeature], decls: 12, vars: 11, consts: [[1, "d-inline"], [1, "sq-dropdown-form"], ["sqAdvancedFormValidation", "", 1, "form-control", "multi-entry", 3, "field", "validationForm"], ["class", "badge badge-pill badge-secondary align-self-center mr-1", 4, "ngFor", "ngForOf"], ["type", "text", "autocomplete", "off", "spellcheck", "off", "sqAdvancedFormAutocompleteMultiInput", "", 1, "input-autocomplete", "flex-grow-1", 3, "field", "off", "suggestQuery", "items", "dropdown", "itemsUpdate", "keydown", "keypress"], ["dropdown", ""], ["itemTpl", ""], [1, "badge", "badge-pill", "badge-secondary", "align-self-center", "mr-1"], [1, "fas", "fa-times-circle", "clickable", 3, "click"], [1, "autocomplete-item", "p-2"]], template: function BsAdvancedFormMultiInput_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "label");
                i0.ɵɵtext(2);
                i0.ɵɵpipe(3, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(4, "section", 1);
                i0.ɵɵelementStart(5, "div", 2);
                i0.ɵɵtemplate(6, BsAdvancedFormMultiInput_span_6_Template, 3, 1, "span", 3);
                i0.ɵɵelementStart(7, "input", 4);
                i0.ɵɵlistener("itemsUpdate", function BsAdvancedFormMultiInput_Template_input_itemsUpdate_7_listener($event) { return ctx.onItemsChanged($event); })("keydown", function BsAdvancedFormMultiInput_Template_input_keydown_7_listener($event) { return ctx.keydown($event); })("keypress", function BsAdvancedFormMultiInput_Template_input_keypress_7_listener($event) { return ctx.keypress($event); });
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(8, "sq-autocomplete-list", null, 5);
                i0.ɵɵtemplate(10, BsAdvancedFormMultiInput_ng_template_10_Template, 2, 1, "ng-template", null, 6, i0.ɵɵtemplateRefExtractor);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                var _r1 = i0.ɵɵreference(9);
                i0.ɵɵadvance(2);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 9, ctx.label));
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("field", ctx.field)("validationForm", ctx.form);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", ctx.items);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("field", ctx.field)("off", !ctx.suggestQuery)("suggestQuery", ctx.suggestQuery)("items", ctx.items)("dropdown", _r1);
            }
        }, directives: [BsAdvancedFormValidation, i3$2.NgForOf, BsAdvancedFormAutocompleteMultiInput, i1$2.BsAutocompleteList], pipes: [i1$1.MessagePipe], styles: [".sq-dropdown-form[_ngcontent-%COMP%]{display:inline;min-width:13rem}.disabled[_ngcontent-%COMP%]{cursor:not-allowed}.clickable[_ngcontent-%COMP%]{cursor:pointer}.clickable[_ngcontent-%COMP%]:hover{opacity:1%}.multi-entry[_ngcontent-%COMP%]{align-items:center;display:flex;flex-wrap:wrap;height:unset!important;width:100%}[_nghost-%COMP%]   input[_ngcontent-%COMP%]{border:none;flex-basis:100px;flex-grow:1;min-width:100px}[_nghost-%COMP%]   input[_ngcontent-%COMP%]:focus{outline:none}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsAdvancedFormMultiInput, [{
                type: i0.Component,
                args: [{
                        selector: "sq-advanced-form-multi-input",
                        templateUrl: "./advanced-form-multi-input.html",
                        styleUrls: ["./advanced-form-multi-input.scss"],
                    }]
            }], function () { return [{ type: i0.ElementRef }, { type: i1.AppService }]; }, { form: [{
                    type: i0.Input
                }], field: [{
                    type: i0.Input
                }], suggestQuery: [{
                    type: i0.Input
                }], label: [{
                    type: i0.Input
                }] });
    })();

    var _c0 = ["fromTo"];
    var _c1 = ["from"];
    var _c2 = ["to"];
    function BsDateRangePicker_div_0_Template(rf, ctx) {
        if (rf & 1) {
            var _r4_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵelementStart(1, "div", 2);
            i0.ɵɵelementStart(2, "input", 3, 4);
            i0.ɵɵlistener("ngModelChange", function BsDateRangePicker_div_0_Template_input_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r4_1); var ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.updateFromTo($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("bsConfig", ctx_r0.bsFromToConfig())("ngModel", ctx_r0.value)("placeholder", ctx_r0.dateFormat);
        }
    }
    function BsDateRangePicker_div_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r8_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵelementStart(1, "div", 5);
            i0.ɵɵelementStart(2, "input", 6, 7);
            i0.ɵɵlistener("ngModelChange", function BsDateRangePicker_div_1_Template_input_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r8_1); var ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.updateFrom($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 8);
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "div", 5);
            i0.ɵɵelementStart(8, "input", 9, 10);
            i0.ɵɵlistener("ngModelChange", function BsDateRangePicker_div_1_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r8_1); var ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.updateTo($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("id", ctx_r1.fromName)("bsConfig", ctx_r1.bsFromConfig())("ngModel", ctx_r1.value[0])("placeholder", ctx_r1.dateFormat);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 9, "msg#advanced.dateRangePicker.separator"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("id", ctx_r1.toName)("bsConfig", ctx_r1.bsToConfig())("ngModel", ctx_r1.value[1])("placeholder", ctx_r1.dateFormat);
        }
    }
    var DATE_RANGE_PICKER_VALUE_ACCESSOR = {
        provide: i2.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return BsDateRangePicker; }),
        multi: true
    };
    var BsDateRangePicker = /** @class */ (function () {
        function BsDateRangePicker(intlService) {
            this.intlService = intlService;
            this.SystemFormat = 'YYYY-MM-DD';
            this.onChangeCallback = function () { };
        }
        BsDateRangePicker.prototype.ngOnInit = function () {
            if (!this.options) {
                this.options = {};
            }
            this.fromName = "from_" + this.options.name;
            this.toName = "to_" + this.options.name;
            if (!this.value) {
                this.value = [undefined, undefined];
            }
        };
        Object.defineProperty(BsDateRangePicker.prototype, "dateFormat", {
            get: function () {
                return this.options.system ? this.SystemFormat : moment__default['default'].localeData().longDateFormat('L');
            },
            enumerable: false,
            configurable: true
        });
        BsDateRangePicker.prototype.setLocale = function () {
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
        };
        BsDateRangePicker.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.setLocale();
            this.localeChange = base.Utils.subscribe(this.intlService.events, function (value) {
                _this.setLocale();
            });
        };
        BsDateRangePicker.prototype.ngOnDestroy = function () {
            if (this.localeChange) {
                this.localeChange.unsubscribe();
            }
        };
        //#region closedRange
        BsDateRangePicker.prototype.bsFromToConfig = function () {
            return {
                minDate: this.options.minDate,
                maxDate: this.options.maxDate,
                containerClass: 'theme-default',
                showWeekNumbers: false,
                rangeInputFormat: this.options.system ? this.SystemFormat : moment__default['default'].localeData().longDateFormat('L')
            };
        };
        BsDateRangePicker.prototype.updateFromTo = function (fromTo) {
            this.setValue([!!fromTo ? fromTo[0] : undefined, !!fromTo ? fromTo[1] : undefined]);
            this.onChangeCallback(this.value);
        };
        BsDateRangePicker.prototype.bsFromConfig = function () {
            return {
                minDate: this.options.minDate,
                maxDate: this.maxDate,
                containerClass: 'theme-default',
                showWeekNumbers: false,
                dateInputFormat: this.options.system ? this.SystemFormat : moment__default['default'].localeData().longDateFormat('L'),
            };
        };
        BsDateRangePicker.prototype.bsToConfig = function () {
            return {
                minDate: this.minDate,
                maxDate: this.options.maxDate,
                containerClass: 'theme-default',
                showWeekNumbers: false,
                dateInputFormat: this.options.system ? this.SystemFormat : moment__default['default'].localeData().longDateFormat('L'),
            };
        };
        BsDateRangePicker.prototype.setMinMaxDate = function () {
            this.maxDate = this.value[1] || this.options.maxDate;
            this.minDate = this.value[0] || this.options.minDate;
        };
        BsDateRangePicker.prototype.resetMinMaxDate = function () {
            this.maxDate = this.options.maxDate;
            this.minDate = this.options.minDate;
        };
        BsDateRangePicker.prototype.updateFrom = function (from) {
            this.setValue([from, this.value[1]]);
            this.onChangeCallback(this.value);
        };
        BsDateRangePicker.prototype.updateTo = function (to) {
            this.setValue([this.value[0], to]);
            this.onChangeCallback(this.value);
        };
        //#endregion !closedRange
        BsDateRangePicker.prototype.zeroTimes = function () {
            if (this.value) {
                if (base.Utils.isDate(this.value[0])) {
                    var date = this.value[0];
                    date.setHours(0);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);
                }
                if (base.Utils.isDate(this.value[1])) {
                    var date = this.value[1];
                    date.setHours(0);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);
                }
            }
        };
        BsDateRangePicker.prototype.setValue = function (value) {
            if (!this.value || !value || !base.Utils.equals(this.value[0], value[0]) || !base.Utils.equals(this.value[1], value[1])) {
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
        };
        //#region ControlValueAccessor
        BsDateRangePicker.prototype.writeValue = function (value) {
            this.setValue(value);
        };
        BsDateRangePicker.prototype.registerOnChange = function (fn) {
            this.onChangeCallback = fn;
        };
        BsDateRangePicker.prototype.registerOnTouched = function (fn) {
        };
        return BsDateRangePicker;
    }());
    BsDateRangePicker.ɵfac = function BsDateRangePicker_Factory(t) { return new (t || BsDateRangePicker)(i0.ɵɵdirectiveInject(i1$1.IntlService)); };
    BsDateRangePicker.ɵcmp = i0.ɵɵdefineComponent({ type: BsDateRangePicker, selectors: [["sq-date-range-picker"]], viewQuery: function BsDateRangePicker_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵviewQuery(_c0, true);
                i0.ɵɵviewQuery(_c1, true);
                i0.ɵɵviewQuery(_c2, true);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fromToPicker = _t.first);
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fromPicker = _t.first);
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.toPicker = _t.first);
            }
        }, inputs: { options: "options" }, features: [i0.ɵɵProvidersFeature([DATE_RANGE_PICKER_VALUE_ACCESSOR])], decls: 2, vars: 2, consts: [["class", "sq-date-range-picker form-row", 4, "ngIf"], [1, "sq-date-range-picker", "form-row"], [1, "col"], ["type", "text", "autocomplete", "off", "bsDaterangepicker", "", "triggers", "click", 1, "form-control", 3, "bsConfig", "ngModel", "placeholder", "ngModelChange"], ["fromTo", "bsDaterangepicker"], [1, "col-auto"], ["type", "text", "autocomplete", "off", "bsDatepicker", "", "triggers", "click", 1, "form-control", "sq-range-from", 3, "id", "bsConfig", "ngModel", "placeholder", "ngModelChange"], ["from", "bsDatepicker"], [1, "col-auto", "sq-separator"], ["type", "text", "autocomplete", "off", "bsDatepicker", "", "triggers", "click", 1, "form-control", "sq-range-to", 3, "id", "bsConfig", "ngModel", "placeholder", "ngModelChange"], ["to", "bsDatepicker"]], template: function BsDateRangePicker_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsDateRangePicker_div_0_Template, 4, 3, "div", 0);
                i0.ɵɵtemplate(1, BsDateRangePicker_div_1_Template, 10, 11, "div", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.options.closedRange);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", !ctx.options.closedRange);
            }
        }, directives: [i3$2.NgIf, i3$3.BsDaterangepickerInputDirective, i2.DefaultValueAccessor, i3$3.BsDaterangepickerDirective, i2.NgControlStatus, i2.NgModel, i3$3.BsDatepickerInputDirective, i3$3.BsDatepickerDirective], pipes: [i1$1.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsDateRangePicker, [{
                type: i0.Component,
                args: [{
                        selector: "sq-date-range-picker",
                        template: "\n        <div *ngIf=\"options.closedRange\" class=\"sq-date-range-picker form-row\">\n            <div class=\"col\">\n                <input type=\"text\" autocomplete=\"off\" class=\"form-control\" bsDaterangepicker triggers=\"click\" #fromTo=\"bsDaterangepicker\" [bsConfig]=\"bsFromToConfig()\" [ngModel]=\"value\" (ngModelChange)=\"updateFromTo($event)\" [placeholder]=\"dateFormat\"/>\n            </div>\n        </div>\n        <div *ngIf=\"!options.closedRange\" class=\"sq-date-range-picker form-row\">\n            <div class=\"col-auto\">\n                <input type=\"text\" autocomplete=\"off\" [id]=\"fromName\" class=\"form-control sq-range-from\" bsDatepicker triggers=\"click\" #from=\"bsDatepicker\" [bsConfig]=\"bsFromConfig()\" [ngModel]=\"value[0]\" (ngModelChange)=\"updateFrom($event)\" [placeholder]=\"dateFormat\"/>\n            </div>\n            <div class=\"col-auto sq-separator\">{{'msg#advanced.dateRangePicker.separator' | sqMessage}}</div>\n            <div class=\"col-auto\">\n                <input type=\"text\" autocomplete=\"off\" [id]=\"toName\" class=\"form-control sq-range-to\" bsDatepicker triggers=\"click\" #to=\"bsDatepicker\" [bsConfig]=\"bsToConfig()\" [ngModel]=\"value[1]\" (ngModelChange)=\"updateTo($event)\" [placeholder]=\"dateFormat\"/>\n            </div>\n        </div>\n    ",
                        providers: [DATE_RANGE_PICKER_VALUE_ACCESSOR]
                    }]
            }], function () { return [{ type: i1$1.IntlService }]; }, { options: [{
                    type: i0.Input
                }], fromToPicker: [{
                    type: i0.ViewChild,
                    args: ["fromTo", { static: false }]
                }], fromPicker: [{
                    type: i0.ViewChild,
                    args: ["from", { static: false }]
                }], toPicker: [{
                    type: i0.ViewChild,
                    args: ["to", { static: false }]
                }] });
    })();

    var _c0$1 = function () { return { standalone: true }; };
    function BsAdvancedFormRange_div_4_Template(rf, ctx) {
        if (rf & 1) {
            var _r3_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 4);
            i0.ɵɵelementStart(1, "div", 5);
            i0.ɵɵelementStart(2, "input", 6);
            i0.ɵɵlistener("ngModelChange", function BsAdvancedFormRange_div_4_Template_input_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r3_1); var ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.updateFrom($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 7);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 5);
            i0.ɵɵelementStart(7, "input", 8);
            i0.ɵɵlistener("ngModelChange", function BsAdvancedFormRange_div_4_Template_input_ngModelChange_7_listener($event) { i0.ɵɵrestoreView(_r3_1); var ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.updateTo($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("field", ctx_r0.field)("validationForm", ctx_r0.form)("id", ctx_r0.field);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("id", ctx_r0.fromName)("ngModel", ctx_r0.value[0])("ngModelOptions", i0.ɵɵpureFunction0(12, _c0$1));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 10, "msg#advanced.rangeSeparator"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("id", ctx_r0.toName)("ngModel", ctx_r0.value[1])("ngModelOptions", i0.ɵɵpureFunction0(13, _c0$1));
        }
    }
    var _c1$1 = function (a0, a3, a4) { return { name: a0, system: false, closedRange: false, minDate: a3, maxDate: a4 }; };
    function BsAdvancedFormRange_sq_date_range_picker_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "sq-date-range-picker", 9);
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵproperty("options", i0.ɵɵpureFunction3(5, _c1$1, ctx_r1.field, ctx_r1.minDate, ctx_r1.maxDate))("formControlName", ctx_r1.field)("id", ctx_r1.field)("field", ctx_r1.field)("validationForm", ctx_r1.form);
        }
    }
    var BsAdvancedFormRange = /** @class */ (function () {
        function BsAdvancedFormRange(appService) {
            this.appService = appService;
        }
        BsAdvancedFormRange.prototype.ngOnInit = function () {
            var _this = this;
            this.fromName = "from_" + this.field;
            this.toName = "to_" + this.field;
            this.forName = this.fromName;
            this.column = this.appService.getColumn(this.field);
            if (this.label === undefined) {
                this.label = this.appService.getPluralLabel(this.field);
            }
            this.isDate = !!this.column && i1.AppService.isDate(this.column);
            if (this.isDate) {
                this.minDate = base.Utils.isDate(this.min)
                    ? this.min
                    : undefined;
                this.maxDate = base.Utils.isDate(this.max)
                    ? this.max
                    : undefined;
            }
            this.control = this.form.get(this.field);
            if (this.control) {
                this.value = this.control.value;
                this._valueChangesSubscription = base.Utils.subscribe(this.control.valueChanges, function (value) {
                    _this.value = value;
                });
            }
            else {
                throw new Error("No form control named " + this.field);
            }
        };
        BsAdvancedFormRange.prototype.ngOnDestroy = function () {
            if (this._valueChangesSubscription) {
                this._valueChangesSubscription.unsubscribe();
            }
        };
        BsAdvancedFormRange.prototype.ensureValue = function (value) {
            if (this.isDate) {
                var value1 = base.Utils.toDate(value);
                if (value1 !== undefined) {
                    return value1;
                }
            }
            else if (this.column && i1.AppService.isNumber(this.column)) {
                if (base.Utils.testFloat(value)) {
                    return base.Utils.toNumber(value);
                }
            }
            return value;
        };
        BsAdvancedFormRange.prototype.updateFrom = function (from) {
            this.value[0] = this.ensureValue(from);
            if (this.control) {
                this.control.markAsDirty();
                this.control.setValue(this.value);
            }
        };
        BsAdvancedFormRange.prototype.updateTo = function (to) {
            this.value[1] = this.ensureValue(to);
            if (this.control) {
                this.control.markAsDirty();
                this.control.setValue(this.value);
            }
        };
        return BsAdvancedFormRange;
    }());
    BsAdvancedFormRange.ɵfac = function BsAdvancedFormRange_Factory(t) { return new (t || BsAdvancedFormRange)(i0.ɵɵdirectiveInject(i1.AppService)); };
    BsAdvancedFormRange.ɵcmp = i0.ɵɵdefineComponent({ type: BsAdvancedFormRange, selectors: [["sq-advanced-form-range"]], inputs: { form: "form", field: "field", min: "min", max: "max", label: "label" }, decls: 6, vars: 7, consts: [[1, "form-group", 3, "formGroup"], [3, "for"], ["class", "sq-advanced-form-range form-row", "sqAdvancedFormValidation", "", 3, "field", "validationForm", "id", 4, "ngIf"], ["sqAdvancedFormValidation", "", 3, "options", "formControlName", "id", "field", "validationForm", 4, "ngIf"], ["sqAdvancedFormValidation", "", 1, "sq-advanced-form-range", "form-row", 3, "field", "validationForm", "id"], [1, "col-auto", "d-flex", "flex-column"], ["type", "text", "autocomplete", "off", "spellcheck", "off", 1, "form-control", "sq-range-from", 3, "id", "ngModel", "ngModelOptions", "ngModelChange"], [1, "col-auto", "sq-separator"], ["type", "text", "autocomplete", "off", "spellcheck", "off", 1, "form-control", "sq-range-to", 3, "id", "ngModel", "ngModelOptions", "ngModelChange"], ["sqAdvancedFormValidation", "", 3, "options", "formControlName", "id", "field", "validationForm"]], template: function BsAdvancedFormRange_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "label", 1);
                i0.ɵɵtext(2);
                i0.ɵɵpipe(3, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(4, BsAdvancedFormRange_div_4_Template, 8, 14, "div", 2);
                i0.ɵɵtemplate(5, BsAdvancedFormRange_sq_date_range_picker_5_Template, 1, 9, "sq-date-range-picker", 3);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("formGroup", ctx.form);
                i0.ɵɵadvance(1);
                i0.ɵɵpropertyInterpolate("for", ctx.forName);
                i0.ɵɵadvance(1);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 5, ctx.label));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", !ctx.isDate);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.isDate);
            }
        }, directives: [i2.NgControlStatusGroup, i2.FormGroupDirective, i3$2.NgIf, BsAdvancedFormValidation, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgModel, BsDateRangePicker, i2.FormControlName], pipes: [i1$1.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsAdvancedFormRange, [{
                type: i0.Component,
                args: [{
                        selector: "sq-advanced-form-range",
                        templateUrl: "./advanced-form-range.html"
                    }]
            }], function () { return [{ type: i1.AppService }]; }, { form: [{
                    type: i0.Input
                }], field: [{
                    type: i0.Input
                }], min: [{
                    type: i0.Input
                }], max: [{
                    type: i0.Input
                }], label: [{
                    type: i0.Input
                }] });
    })();

    var _c0$2 = ["button"];
    var _c1$2 = function (a0, a1) { return { active: a0, first: a1 }; };
    function BsSelectComponent_div_6_a_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r6_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 7);
            i0.ɵɵlistener("click", function BsSelectComponent_div_6_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r6_1); var i_r4 = ctx.index; var ctx_r5 = i0.ɵɵnextContext(2); return ctx_r5.toggleItemSelected(i_r4); })("keydown", function BsSelectComponent_div_6_a_1_Template_a_keydown_0_listener($event) { i0.ɵɵrestoreView(_r6_1); var ctx_r7 = i0.ɵɵnextContext(2); return ctx_r7.keydown($event); });
            i0.ɵɵelement(1, "span");
            i0.ɵɵelementStart(2, "span");
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var itemName_r3 = ctx.$implicit;
            var i_r4 = ctx.index;
            var ctx_r2 = i0.ɵɵnextContext(2);
            i0.ɵɵclassMapInterpolate1("dropdown-item", ctx_r2.activeItem === i_r4 ? " active" : "", "");
            i0.ɵɵproperty("sqScrollIntoView", i0.ɵɵpureFunction2(8, _c1$2, i_r4 === ctx_r2.activeItem, i_r4 === 0));
            i0.ɵɵadvance(1);
            i0.ɵɵclassMapInterpolate1("fas fa-check ", ctx_r2.isItemSelected(i_r4) ? "" : " invisible", " left");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(itemName_r3);
        }
    }
    function BsSelectComponent_div_6_Template(rf, ctx) {
        if (rf & 1) {
            var _r9_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 5);
            i0.ɵɵlistener("mousedown", function BsSelectComponent_div_6_Template_div_mousedown_0_listener($event) { i0.ɵɵrestoreView(_r9_1); var ctx_r8 = i0.ɵɵnextContext(); return ctx_r8.mousedown($event); });
            i0.ɵɵtemplate(1, BsSelectComponent_div_6_a_1_Template, 4, 11, "a", 6);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵstyleProp("max-height", ctx_r1.itemListHeight);
            i0.ɵɵproperty("hidden", !ctx_r1.isOpen);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r1.names);
        }
    }
    var BsSelectComponent = /** @class */ (function () {
        function BsSelectComponent() {
            this.opened = false;
            this.isOpen = false;
            this.activeItem = -1;
            this.cancelBlur = false; // For IE which takes focus when clicking on dropdown scrollbar despite the mousedown handling
            this.onChangeCallback = function () { };
        }
        BsSelectComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.clearSelected();
            if (this.items.length === 0) {
                this.disabled = false;
            }
            this.names = [];
            this.items.forEach(function (item) { return _this.names.push(item.display); });
        };
        BsSelectComponent.prototype.setOpen = function (value) {
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
        };
        BsSelectComponent.prototype.mousedown = function (event) {
            var _this = this;
            event.preventDefault();
            this.cancelBlur = true;
            base.Utils.delay().then(function () { return _this.cancelBlur = false; });
        };
        BsSelectComponent.prototype.blur = function (event) {
            var _this = this;
            if (this.cancelBlur) {
                event.preventDefault();
                event.stopImmediatePropagation();
                base.Utils.delay().then(function () {
                    _this.buttonElement.nativeElement.focus();
                });
                return;
            }
            this.setOpen(false);
        };
        BsSelectComponent.prototype.toggleOpen = function () {
            if (this.disabled) {
                return;
            }
            this.setOpen(!this.isOpen);
        };
        BsSelectComponent.prototype.keydown = function ($event) {
            if (this.disabled) {
                return;
            }
            // arrow down
            if ($event.keyCode === base.Keys.down) {
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
            else if ($event.keyCode === base.Keys.up) {
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
            else if (($event.keyCode === base.Keys.enter || $event.keyCode === base.Keys.space) &&
                this.activeItem >= 0 && this.activeItem < this.items.length) {
                this.toggleItemSelected(this.activeItem);
                $event.preventDefault();
                $event.stopPropagation();
            }
            // escape
            else if ($event.keyCode === base.Keys.esc && this.isOpen) {
                this.setOpen(false);
                $event.preventDefault();
                $event.stopPropagation();
            }
        };
        BsSelectComponent.prototype.clearSelected = function () {
            this.selectedItems = [];
        };
        BsSelectComponent.prototype.countSelected = function () {
            return this.selectedItems.length;
        };
        BsSelectComponent.prototype.isItemSelected = function (itemIndex) {
            return this.selectedItems.includes(itemIndex);
        };
        BsSelectComponent.prototype.toggleItemSelected = function (itemIndex) {
            var idx = this.selectedItems.indexOf(itemIndex);
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
        };
        Object.defineProperty(BsSelectComponent.prototype, "buttonTitleMessageParams", {
            /* Template properties */
            get: function () {
                return {
                    values: {
                        count: this.countSelected()
                    }
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsSelectComponent.prototype, "buttonTitle", {
            get: function () {
                var _this = this;
                var selectCount = this.countSelected();
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
                    .map(function (index) { return _this.items[index].display; })
                    .sort()
                    .join(", ");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsSelectComponent.prototype, "itemListHeight", {
            get: function () {
                // use 10 as default
                return (10 * 4) + "ex";
            },
            enumerable: false,
            configurable: true
        });
        /* End Template properties */
        /* Change event */
        BsSelectComponent.prototype.triggerOnChange = function () {
            var _this = this;
            // Gather selected item values
            var values;
            // We can not pass an empty array, when empty use undefined instead
            if (this.selectedItems.length === 0) {
                values = undefined;
            }
            // return an array if multiple
            else if (this.multiple) {
                values = this.selectedItems.map(function (index) { return _this.items[index]; });
            }
            // directly pass the value if not multiple
            else {
                values = this.items[this.selectedItems[0]];
            }
            this.onChangeCallback(values);
        };
        /* End Change event */
        /* ControlValueAccessor methods */
        BsSelectComponent.prototype.writeValue = function (value) {
            var _this = this;
            this.clearSelected();
            if (value) {
                // the value may not be an array if this select is not multiple
                var asArray_1 = Array.isArray(value) ? value : [value];
                //Mark items as selected based on input values
                this.items.forEach(function (item, index) {
                    if (asArray_1.find(function (el) { return el.value === item.value; }) && index !== undefined) {
                        _this.selectedItems.push(index);
                    }
                });
            }
        };
        BsSelectComponent.prototype.registerOnChange = function (fn) {
            this.onChangeCallback = fn;
        };
        BsSelectComponent.prototype.registerOnTouched = function (fn) {
        };
        return BsSelectComponent;
    }());
    BsSelectComponent.ɵfac = function BsSelectComponent_Factory(t) { return new (t || BsSelectComponent)(); };
    BsSelectComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsSelectComponent, selectors: [["sq-select"]], viewQuery: function BsSelectComponent_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵviewQuery(_c0$2, true);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.buttonElement = _t.first);
            }
        }, inputs: { items: "items", disabled: "disabled", multiple: "multiple" }, features: [i0.ɵɵProvidersFeature([{
                    provide: i2.NG_VALUE_ACCESSOR,
                    multi: true,
                    useExisting: i0.forwardRef(function () { return BsSelectComponent; }),
                }])], decls: 7, vars: 8, consts: [[1, "dropdown"], ["data-toggle", "dropdown", "type", "button", "role", "button", "tabindex", "0", 3, "click", "blur", "keydown"], ["button", ""], [1, "sq-button-text"], ["class", "dropdown-menu dropdown-menu-left show", "role", "combobox", 3, "hidden", "max-height", "mousedown", 4, "ngIf"], ["role", "combobox", 1, "dropdown-menu", "dropdown-menu-left", "show", 3, "hidden", "mousedown"], ["tabindex", "-1", 3, "class", "sqScrollIntoView", "click", "keydown", 4, "ngFor", "ngForOf"], ["tabindex", "-1", 3, "sqScrollIntoView", "click", "keydown"]], template: function BsSelectComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "button", 1, 2);
                i0.ɵɵlistener("click", function BsSelectComponent_Template_button_click_1_listener() { return ctx.toggleOpen(); })("blur", function BsSelectComponent_Template_button_blur_1_listener($event) { return ctx.blur($event); })("keydown", function BsSelectComponent_Template_button_keydown_1_listener($event) { return ctx.keydown($event); });
                i0.ɵɵelementStart(3, "span", 3);
                i0.ɵɵtext(4);
                i0.ɵɵpipe(5, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(6, BsSelectComponent_div_6_Template, 2, 4, "div", 4);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵclassMapInterpolate1("btn btn-light ", ctx.disabled ? " disabled" : "", " dropdown-toggle form-control");
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 5, ctx.buttonTitle, ctx.buttonTitleMessageParams));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", ctx.opened);
            }
        }, directives: [i3$2.NgIf, i3$2.NgForOf, i3$1.ScrollIntoView], pipes: [i1$1.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsSelectComponent, [{
                type: i0.Component,
                args: [{
                        selector: "sq-select",
                        templateUrl: "./select.html",
                        providers: [{
                                provide: i2.NG_VALUE_ACCESSOR,
                                multi: true,
                                useExisting: i0.forwardRef(function () { return BsSelectComponent; }),
                            }]
                    }]
            }], null, { items: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], multiple: [{
                    type: i0.Input
                }], buttonElement: [{
                    type: i0.ViewChild,
                    args: ["button", { static: false }]
                }] });
    })();

    var BsAdvancedFormSelect = /** @class */ (function () {
        function BsAdvancedFormSelect(appService, firstPageService) {
            this.appService = appService;
            this.firstPageService = firstPageService;
        }
        BsAdvancedFormSelect.prototype.ngOnInit = function () {
            var control = this.form.get(this.field);
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
        };
        BsAdvancedFormSelect.prototype.ngOnDestroy = function () {
            if (this._valueChangesSubscription) {
                this._valueChangesSubscription.unsubscribe();
            }
        };
        BsAdvancedFormSelect.prototype.getItems = function () {
            var _this = this;
            var firstPage = this.firstPageService.firstPage;
            if (firstPage) {
                // Find aggregation for field
                var condition = (this.aggregation) ?
                    function (aggr) { return base.Utils.eqNC(aggr.name, _this.aggregation); } :
                    function (aggr) { return _this.column && base.Utils.eqNC(aggr.column, _this.column.name); };
                var aggregation = firstPage.aggregations.find(condition);
                if (aggregation && aggregation.items) {
                    return aggregation.items
                        .filter(function (item) { return !base.Utils.isArray(item.value) && !!item.value; })
                        .map(function (item) { return ({
                        value: item.value,
                        display: item.display ? item.display : item.value.toString()
                    }); });
                }
            }
            return [];
        };
        return BsAdvancedFormSelect;
    }());
    BsAdvancedFormSelect.ɵfac = function BsAdvancedFormSelect_Factory(t) { return new (t || BsAdvancedFormSelect)(i0.ɵɵdirectiveInject(i1.AppService), i0.ɵɵdirectiveInject(i2$1.FirstPageService)); };
    BsAdvancedFormSelect.ɵcmp = i0.ɵɵdefineComponent({ type: BsAdvancedFormSelect, selectors: [["sq-advanced-form-select"]], inputs: { form: "form", field: "field", label: "label", multiple: "multiple", aggregation: "aggregation" }, decls: 5, vars: 11, consts: [[1, "form-group", 3, "formGroup"], [3, "for"], ["sqAdvancedFormValidation", "", 3, "items", "multiple", "formControlName", "id", "field", "validationForm"]], template: function BsAdvancedFormSelect_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "label", 1);
                i0.ɵɵtext(2);
                i0.ɵɵpipe(3, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelement(4, "sq-select", 2);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("formGroup", ctx.form);
                i0.ɵɵadvance(1);
                i0.ɵɵpropertyInterpolate("for", ctx.field);
                i0.ɵɵadvance(1);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 9, ctx.label));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("items", ctx.items)("multiple", ctx.multiple)("formControlName", ctx.field)("id", ctx.field)("field", ctx.field)("validationForm", ctx.form);
            }
        }, directives: [i2.NgControlStatusGroup, i2.FormGroupDirective, BsSelectComponent, BsAdvancedFormValidation, i2.NgControlStatus, i2.FormControlName], pipes: [i1$1.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsAdvancedFormSelect, [{
                type: i0.Component,
                args: [{
                        selector: "sq-advanced-form-select",
                        templateUrl: "./advanced-form-select.html",
                    }]
            }], function () { return [{ type: i1.AppService }, { type: i2$1.FirstPageService }]; }, { form: [{
                    type: i0.Input
                }], field: [{
                    type: i0.Input
                }], label: [{
                    type: i0.Input
                }], multiple: [{
                    type: i0.Input
                }], aggregation: [{
                    type: i0.Input
                }] });
    })();

    var _c0$3 = ["picker"];
    var _c1$3 = ["input"];
    var DATE_PICKER_VALUE_ACCESSOR = {
        provide: i2.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return BsDatePicker; }),
        multi: true
    };
    var BsDatePicker = /** @class */ (function () {
        function BsDatePicker(intlService) {
            this.intlService = intlService;
            this.SystemFormat = 'YYYY-MM-DD';
            this.onChangeCallback = function () { };
        }
        BsDatePicker.prototype.ngOnInit = function () {
            if (!this.options) {
                this.options = {};
            }
        };
        Object.defineProperty(BsDatePicker.prototype, "dateFormat", {
            get: function () {
                return this.options.system ? this.SystemFormat : moment__default['default'].localeData().longDateFormat('L');
            },
            enumerable: false,
            configurable: true
        });
        BsDatePicker.prototype.setLocale = function () {
            if (!!this.picker && this.picker.isOpen) {
                this.picker.hide();
                this.picker.show();
            }
        };
        BsDatePicker.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.setLocale();
            this.localeChange = base.Utils.subscribe(this.intlService.events, function (value) {
                _this.setLocale();
            });
        };
        BsDatePicker.prototype.ngOnDestroy = function () {
            if (this.localeChange) {
                this.localeChange.unsubscribe();
            }
        };
        BsDatePicker.prototype.bsConfig = function () {
            return {
                minDate: this.options.minDate,
                maxDate: this.options.maxDate,
                containerClass: 'theme-default',
                showWeekNumbers: false,
                dateInputFormat: this.options.system ? this.SystemFormat : moment__default['default'].localeData().longDateFormat('L')
            };
        };
        BsDatePicker.prototype.updateValue = function (value) {
            this.value = value;
            this.zeroTimes(this.value);
            this.onChangeCallback(this.value);
            this.focus();
        };
        BsDatePicker.prototype.zeroTimes = function (value) {
            if (base.Utils.isDate(value)) { // includes null checking
                value.setHours(0, 0, 0, 0);
            }
        };
        BsDatePicker.prototype.focus = function () {
            if (this.input) {
                this.input.nativeElement.focus();
            }
        };
        //#region ControlValueAccessor
        BsDatePicker.prototype.writeValue = function (value) {
            this.value = value;
        };
        BsDatePicker.prototype.registerOnChange = function (fn) {
            this.onChangeCallback = fn;
        };
        BsDatePicker.prototype.registerOnTouched = function (fn) {
        };
        return BsDatePicker;
    }());
    BsDatePicker.ɵfac = function BsDatePicker_Factory(t) { return new (t || BsDatePicker)(i0.ɵɵdirectiveInject(i1$1.IntlService)); };
    BsDatePicker.ɵcmp = i0.ɵɵdefineComponent({ type: BsDatePicker, selectors: [["sq-date-picker"]], viewQuery: function BsDatePicker_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵviewQuery(_c0$3, true);
                i0.ɵɵviewQuery(_c1$3, true);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.picker = _t.first);
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.input = _t.first);
            }
        }, inputs: { options: "options" }, features: [i0.ɵɵProvidersFeature([DATE_PICKER_VALUE_ACCESSOR])], decls: 5, vars: 3, consts: [[1, "sq-date-picker", "form-row"], [1, "col"], ["type", "text", "autocomplete", "off", "bsDatepicker", "", "triggers", "click", 1, "form-control", 3, "bsConfig", "ngModel", "placeholder", "ngModelChange"], ["input", "", "picker", "bsDatepicker"]], template: function BsDatePicker_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "div", 1);
                i0.ɵɵelementStart(2, "input", 2, 3);
                i0.ɵɵlistener("ngModelChange", function BsDatePicker_Template_input_ngModelChange_2_listener($event) { return ctx.updateValue($event); });
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("bsConfig", ctx.bsConfig())("ngModel", ctx.value)("placeholder", ctx.dateFormat);
            }
        }, directives: [i3$3.BsDatepickerInputDirective, i2.DefaultValueAccessor, i3$3.BsDatepickerDirective, i2.NgControlStatus, i2.NgModel], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsDatePicker, [{
                type: i0.Component,
                args: [{
                        selector: "sq-date-picker",
                        template: "\n        <div class=\"sq-date-picker form-row\">\n            <div class=\"col\">\n                <input type=\"text\" #input class=\"form-control\" autocomplete=\"off\" bsDatepicker triggers=\"click\" #picker=\"bsDatepicker\" [bsConfig]=\"bsConfig()\" [ngModel]=\"value\" (ngModelChange)=\"updateValue($event)\" [placeholder]=\"dateFormat\" />\n            </div>\n        </div>\n    ",
                        providers: [DATE_PICKER_VALUE_ACCESSOR]
                    }]
            }], function () { return [{ type: i1$1.IntlService }]; }, { options: [{
                    type: i0.Input
                }], picker: [{
                    type: i0.ViewChild,
                    args: ["picker", { static: false }]
                }], input: [{
                    type: i0.ViewChild,
                    args: ['input', { static: false }]
                }] });
    })();

    var BsAdvancedModule = /** @class */ (function () {
        function BsAdvancedModule() {
        }
        return BsAdvancedModule;
    }());
    BsAdvancedModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsAdvancedModule });
    BsAdvancedModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsAdvancedModule_Factory(t) { return new (t || BsAdvancedModule)(); }, imports: [[
                i3$2.CommonModule,
                i2.FormsModule,
                i2.ReactiveFormsModule,
                i1$1.IntlModule,
                // ngx-bootstrap
                i3$3.BsDatepickerModule.forRoot(),
                i3$1.UtilsModule,
                i1$2.BsAutocompleteModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsAdvancedModule, { declarations: [BsAdvancedFormCheckbox,
                BsAdvancedFormInput,
                BsAdvancedFormRange,
                BsAdvancedFormSelect,
                BsAdvancedFormMultiInput,
                BsDatePicker,
                BsDateRangePicker,
                BsSelectComponent,
                BsAdvancedFormAutocompleteMultiInput,
                BsAdvancedFormAutocomplete,
                BsAdvancedFormValidation], imports: [i3$2.CommonModule,
                i2.FormsModule,
                i2.ReactiveFormsModule,
                i1$1.IntlModule, i3$3.BsDatepickerModule, i3$1.UtilsModule,
                i1$2.BsAutocompleteModule], exports: [BsAdvancedFormCheckbox,
                BsAdvancedFormInput,
                BsAdvancedFormRange,
                BsAdvancedFormSelect,
                BsAdvancedFormMultiInput,
                BsDatePicker,
                BsDateRangePicker,
                BsSelectComponent,
                BsAdvancedFormAutocompleteMultiInput,
                BsAdvancedFormAutocomplete,
                BsAdvancedFormValidation] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsAdvancedModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i3$2.CommonModule,
                            i2.FormsModule,
                            i2.ReactiveFormsModule,
                            i1$1.IntlModule,
                            // ngx-bootstrap
                            i3$3.BsDatepickerModule.forRoot(),
                            i3$1.UtilsModule,
                            i1$2.BsAutocompleteModule
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
            }], null, null);
    })();

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

    var enAdvanced = base.Utils.merge({}, _enAdvanced, i2$1.enSearch);
    var frAdvanced = base.Utils.merge({}, _frAdvanced, i2$1.frSearch);
    var deAdvanced = base.Utils.merge({}, _deAdvanced, i2$1.deSearch);

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AdvancedService = AdvancedService;
    exports.BsAdvancedFormAutocomplete = BsAdvancedFormAutocomplete;
    exports.BsAdvancedFormAutocompleteMultiInput = BsAdvancedFormAutocompleteMultiInput;
    exports.BsAdvancedFormCheckbox = BsAdvancedFormCheckbox;
    exports.BsAdvancedFormInput = BsAdvancedFormInput;
    exports.BsAdvancedFormMultiInput = BsAdvancedFormMultiInput;
    exports.BsAdvancedFormRange = BsAdvancedFormRange;
    exports.BsAdvancedFormSelect = BsAdvancedFormSelect;
    exports.BsAdvancedFormValidation = BsAdvancedFormValidation;
    exports.BsAdvancedModule = BsAdvancedModule;
    exports.BsDatePicker = BsDatePicker;
    exports.BsDateRangePicker = BsDateRangePicker;
    exports.BsSelectComponent = BsSelectComponent;
    exports.DATE_PICKER_VALUE_ACCESSOR = DATE_PICKER_VALUE_ACCESSOR;
    exports.DATE_RANGE_PICKER_VALUE_ACCESSOR = DATE_RANGE_PICKER_VALUE_ACCESSOR;
    exports.deAdvanced = deAdvanced;
    exports.enAdvanced = enAdvanced;
    exports.frAdvanced = frAdvanced;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-advanced.umd.js.map
