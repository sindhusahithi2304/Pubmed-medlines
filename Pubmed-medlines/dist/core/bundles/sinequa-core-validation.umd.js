(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@sinequa/core/base'), require('@sinequa/core/load-component'), require('@sinequa/core/app-utils'), require('@sinequa/core/intl'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sinequa/core/validation', ['exports', '@angular/core', '@angular/forms', '@sinequa/core/base', '@sinequa/core/load-component', '@sinequa/core/app-utils', '@sinequa/core/intl', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.core = global.sinequa.core || {}, global.sinequa.core.validation = {}), global.ng.core, global.ng.forms, global.sinequa.core.base, global.sinequa.core['load-component'], global.sinequa.core['app-utils'], global.sinequa.core.intl, global.ng.common));
}(this, (function (exports, i0, forms, base, i1$2, i1, i1$1, common) { 'use strict';

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

    /**
     * @ignore
     */
    function isEmptyInputValue(value) {
        // we don't check for string here so it also works with arrays
        return value === null || value === undefined || value.length === 0;
    }
    var processInputValue = function (value) {
        if (base.Utils.isArray(value)) {
            return value.map(function (val) {
                if (base.Utils.isObject(val) && val.hasOwnProperty("value")) {
                    return val.value;
                }
                return val;
            });
        }
        else {
            if (base.Utils.isObject(value) && value.hasOwnProperty("value")) {
                return [value.value];
            }
            return [value];
        }
    };
    // Email regular expression, taken from built-in Angular validators.
    /**
     * @ignore
     */
    var EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    (function (ValidatorType) {
        ValidatorType["Min"] = "Min";
        ValidatorType["Max"] = "Max";
        ValidatorType["Required"] = "Required";
        ValidatorType["Email"] = "Email";
        ValidatorType["Pattern"] = "Pattern";
        ValidatorType["Integer"] = "Integer";
        ValidatorType["Number"] = "Number";
        ValidatorType["Date"] = "Date";
        ValidatorType["Range"] = "Range";
    })(exports.ValidatorType || (exports.ValidatorType = {}));
    /**
     * Defines the default error messages for each validator.
     */
    var errorMessagesMap = {
        // Built-in Angular validators
        min: "msg#validation.min",
        max: "msg#validation.max",
        required: "msg#validation.required",
        requiredTrue: "msg#validation.requiredTrue",
        email: "msg#validation.email",
        minlength: "msg#validation.minLength",
        maxlength: "msg#validation.maxLength",
        pattern: "msg#validation.pattern",
        // Custom
        unique: "msg#validation.unique",
        integer: "msg#validation.integer",
        number: "msg#validation.number",
        date: "msg#validation.date",
        range: "msg#validation.range"
    };
    /**
     * This service provides a set of locale-sensitive validators with support for arrays.
     * The validator error messages are {@link IntlService} `msg#` messages of the form:
     * `msg#validation.<validator name>`.
     */
    var ValidationService = /** @class */ (function () {
        function ValidationService(formatService, intlService) {
            this.formatService = formatService;
            this.intlService = intlService;
        }
        /**
         * A pattern validator based on Angular's `Validators.pattern` with support for value arrays.
         *
         * @param pattern The pattern.
         * @returns The validation function.
         */
        ValidationService.patternValidator = function (pattern) {
            // #region This code region is based on Validators.pattern()
            if (!pattern) {
                return forms.Validators.nullValidator;
            }
            var regex;
            var regexStr;
            if (typeof pattern === 'string') {
                regexStr = '';
                if (pattern.charAt(0) !== '^') {
                    regexStr += '^';
                }
                regexStr += pattern;
                if (pattern.charAt(pattern.length - 1) !== '$') {
                    regexStr += '$';
                }
                regex = new RegExp(regexStr);
            }
            else {
                regexStr = pattern.toString();
                regex = pattern;
            }
            // #endregion
            return function (control) {
                var e_1, _a;
                if (isEmptyInputValue(control.value)) {
                    return null; // don't validate empty values to allow optional controls
                }
                var values = [];
                values = processInputValue(control.value);
                try {
                    for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                        var value = values_1_1.value;
                        if (!regex.test(value)) {
                            return { pattern: { requiredPattern: pattern.toString(), actualValue: value } };
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return null;
            };
        };
        /**
         * A pattern validator based on Angular's `Validators.email` with support for value arrays.
         *
         * @param control The control to validate.
         * @returns The result.
         */
        ValidationService.emailValidation = function (control) {
            var e_2, _a;
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            var values = [];
            values = processInputValue(control.value);
            try {
                for (var values_2 = __values(values), values_2_1 = values_2.next(); !values_2_1.done; values_2_1 = values_2.next()) {
                    var value = values_2_1.value;
                    if (!EMAIL_REGEXP.test(value)) {
                        return { email: true };
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (values_2_1 && !values_2_1.done && (_a = values_2.return)) _a.call(values_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return null;
        };
        /**
         * Get the name of the first validator in a map of validation errors.
         * @param errors The validation errors
         * @returns The name of the first validator, if any - `undefined` otherwise.
         */
        ValidationService.prototype.getFirstError = function (errors) {
            if (errors) {
                return Object.keys(errors)[0];
            }
            return undefined;
        };
        /**
         * Get the error message associated with the passed validator.
         * @param name The name of a validator.
         * @returns The error message.
         */
        ValidationService.prototype.getErrorText = function (name) {
            var text = name ? errorMessagesMap[name] : undefined;
            if (!text) {
                return "Unknown validator: " + name;
            }
            return text;
        };
        /**
         * Get the error message associated with first validator in a map of validation errors.
         * @param errors The validation errors.
         * @returns The error message.
         */
        ValidationService.prototype.getFirstErrorText = function (errors) {
            if (errors) {
                var error = this.getFirstError(errors);
                if (error) {
                    return this.getErrorText(error);
                }
            }
            return undefined;
        };
        /**
         * Get the data held for the first error in a map of validation errors
         * @param errors The validation errors.
         */
        ValidationService.prototype.getFirstErrorInfo = function (errors) {
            if (errors) {
                var error = this.getFirstError(errors);
                if (error) {
                    return errors[error];
                }
            }
            return undefined;
        };
        /**
         * Get a validator function that validates that values are greater than or equal
         * to the passed `min` value. The function supports single values and arrays of
         * values and will optionally parse the values using the {@link FormatService} if
         * a parser is passed. Dates will be parsed according to the current locale.
         *
         * @param min The minimum value to test against. The type determines
         * how the test will be made.
         * @param parser An optional parser name.
         */
        ValidationService.prototype.minValidator = function (min, parser) {
            var _this = this;
            return function (control) {
                var e_3, _a;
                if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
                    return null; // don't validate empty values to allow optional controls
                }
                var values = [];
                values = processInputValue(control.value);
                try {
                    for (var values_3 = __values(values), values_3_1 = values_3.next(); !values_3_1.done; values_3_1 = values_3.next()) {
                        var value = values_3_1.value;
                        if (!isEmptyInputValue(value)) {
                            var value1 = value;
                            if (parser) {
                                value1 = _this.formatService.parseValue(value1, parser);
                            }
                            var cmp = 0;
                            if (base.Utils.isNumber(min)) {
                                if (base.Utils.testFloat(value1)) {
                                    value1 = base.Utils.toNumber(value1);
                                    cmp = value1 - min;
                                }
                            }
                            else if (base.Utils.isString(min)) {
                                cmp = base.Utils.compare(value1, min);
                            }
                            else if (base.Utils.isDate(min)) {
                                if (base.Utils.isString(value1)) {
                                    value1 = _this.intlService.parseDate(value1);
                                    if (value1) {
                                        cmp = value1.getTime() - min.getTime();
                                    }
                                }
                                else if (base.Utils.isDate(value1)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                                    cmp = value1.getTime() - min.getTime();
                                }
                            }
                            if (cmp < 0) {
                                return { min: { min: min, actual: value } };
                            }
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (values_3_1 && !values_3_1.done && (_a = values_3.return)) _a.call(values_3);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return null;
            };
        };
        /**
         * Get a validator function that validates that values are less than or equal
         * to the passed `max` value. The function supports single values and arrays of
         * values and will optionally parse the values using the {@link FormatService} if
         * a parser is passed. Dates will be parsed according to the current locale.
         *
         * @param max The maximum value to test against. The type determines
         * how the test will be made.
         * @param parser An optional parser name.
         */
        ValidationService.prototype.maxValidator = function (max, parser) {
            var _this = this;
            return function (control) {
                var e_4, _a;
                if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
                    return null; // don't validate empty values to allow optional controls
                }
                var values = [];
                values = processInputValue(control.value);
                try {
                    for (var values_4 = __values(values), values_4_1 = values_4.next(); !values_4_1.done; values_4_1 = values_4.next()) {
                        var value = values_4_1.value;
                        if (!isEmptyInputValue(value)) {
                            var value1 = value;
                            if (parser) {
                                value1 = _this.formatService.parseValue(value1, parser);
                            }
                            var cmp = 0;
                            if (base.Utils.isNumber(max)) {
                                if (base.Utils.testFloat(value1)) {
                                    value1 = base.Utils.toNumber(value1);
                                    cmp = value1 - max;
                                }
                            }
                            else if (base.Utils.isString(max)) {
                                cmp = base.Utils.compare(value1, max);
                            }
                            else if (base.Utils.isDate(max)) {
                                if (base.Utils.isString(value1)) {
                                    value1 = _this.intlService.parseDate(value1);
                                    if (value1) {
                                        cmp = value1.getTime() - max.getTime();
                                    }
                                }
                                else if (base.Utils.isDate(value1)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                                    cmp = value1.getTime() - max.getTime();
                                }
                            }
                            if (cmp > 0) {
                                return { max: { max: max, actual: value } };
                            }
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (values_4_1 && !values_4_1.done && (_a = values_4.return)) _a.call(values_4);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                return null;
            };
        };
        /**
         * Get a validator function that validates that values are integers. The function
         * supports single values and arrays of values and will optionally parse the values
         * using the {@link FormatService} if a parser is passed.
         *
         * @param parser An optional parser name.
         */
        ValidationService.prototype.integerValidator = function (parser) {
            var _this = this;
            return function (control) {
                var e_5, _a;
                if (isEmptyInputValue(control.value)) {
                    return null; // don't validate empty values to allow optional controls
                }
                var values = [];
                values = processInputValue(control.value);
                try {
                    for (var values_5 = __values(values), values_5_1 = values_5.next(); !values_5_1.done; values_5_1 = values_5.next()) {
                        var value = values_5_1.value;
                        if (!isEmptyInputValue(value)) {
                            var value1 = value;
                            if (parser) {
                                value1 = _this.formatService.parseValue(value1, parser);
                            }
                            if (!base.Utils.testInteger(value1)) {
                                return { integer: { value: value } };
                            }
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (values_5_1 && !values_5_1.done && (_a = values_5.return)) _a.call(values_5);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                return null;
            };
        };
        /**
         * Get a validator function that validates that values are numeric. The function
         * supports single values and arrays of values and will optionally parse the values
         * using the {@link FormatService} if a parser is passed.
         *
         * @param parser An optional parser name.
         */
        ValidationService.prototype.numberValidator = function (parser) {
            var _this = this;
            return function (control) {
                var e_6, _a;
                if (isEmptyInputValue(control.value)) {
                    return null; // don't validate empty values to allow optional controls
                }
                var values = [];
                values = processInputValue(control.value);
                try {
                    for (var values_6 = __values(values), values_6_1 = values_6.next(); !values_6_1.done; values_6_1 = values_6.next()) {
                        var value = values_6_1.value;
                        if (!isEmptyInputValue(value)) {
                            var value1 = value;
                            if (parser) {
                                value1 = _this.formatService.parseValue(value1, parser);
                            }
                            if (!base.Utils.testFloat(value1)) {
                                return { number: { value: value } };
                            }
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (values_6_1 && !values_6_1.done && (_a = values_6.return)) _a.call(values_6);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
                return null;
            };
        };
        /**
         * Get a validator function that validates that values are dates. The function
         * supports single values and arrays of values and will optionally parse the values
         * using the {@link FormatService} if a parser is passed. Dates will be parsed according
         * to the current locale.
         *
         * @param parser An optional parser name.
         */
        ValidationService.prototype.dateValidator = function (parser) {
            var _this = this;
            return function (control) {
                var e_7, _a;
                if (isEmptyInputValue(control.value)) {
                    return null; // don't validate empty values to allow optional controls
                }
                var values = [];
                values = processInputValue(control.value);
                try {
                    for (var values_7 = __values(values), values_7_1 = values_7.next(); !values_7_1.done; values_7_1 = values_7.next()) {
                        var value = values_7_1.value;
                        if (!isEmptyInputValue(value)) {
                            if (base.Utils.isString(value)) {
                                var value1 = value;
                                if (parser) {
                                    value1 = _this.formatService.parseValue(value1, parser);
                                }
                                if (!_this.intlService.parseDate(value1)) {
                                    return { date: { value: value } };
                                }
                            }
                            else if (base.Utils.isDate(value)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                                if (isNaN(value.getTime())) {
                                    return { date: { value: value } };
                                }
                            }
                        }
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (values_7_1 && !values_7_1.done && (_a = values_7.return)) _a.call(values_7);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
                return null;
            };
        };
        /**
         * Get a validator function that validates that, for pair of values, the second value is
         * greater than the first. If one or both values are empty then the validation passes.
         * The validator function supports single values and arrays of values and will optionally
         * parse the values using the {@link FormatService} if a parser is passed. Dates will be
         * parsed according to the current locale.
         *
         * @param type A value whose type indicates how the range test will be made.
         * @param parser An optional parser name.
         */
        ValidationService.prototype.rangeValidator = function (type, parser) {
            var _this = this;
            return function (control) {
                if (isEmptyInputValue(control.value) || !base.Utils.isArray(control.value) || control.value.length !== 2) {
                    return null; // don't validate empty values to allow optional controls
                }
                var value1 = control.value[0];
                var value2 = control.value[1];
                if (isEmptyInputValue(value1) || isEmptyInputValue(value2)) {
                    return null;
                }
                if (parser) {
                    value1 = _this.formatService.parseValue(value1, parser);
                    value2 = _this.formatService.parseValue(value2, parser);
                }
                var cmp = 0;
                if (base.Utils.isString(type)) {
                    cmp = base.Utils.compare(value2, value1);
                }
                else if (base.Utils.isDate(type)) {
                    var date1 = void 0;
                    var date2 = void 0;
                    if (base.Utils.isString(value1)) {
                        date1 = _this.intlService.parseDate(value1);
                    }
                    else if (base.Utils.isDate(value1)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                        date1 = value1;
                    }
                    if (base.Utils.isString(value2)) {
                        date2 = _this.intlService.parseDate(value2);
                    }
                    else if (base.Utils.isDate(value2)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                        date2 = value2;
                    }
                    if (date1 && date2) {
                        cmp = date2.getTime() - date1.getTime();
                    }
                }
                else if (base.Utils.isNumber(type)) {
                    if (base.Utils.testFloat(value1) && base.Utils.testFloat(value2)) {
                        var num1 = base.Utils.toNumber(value1);
                        var num2 = base.Utils.toNumber(value2);
                        if (num1 !== null && num2 !== null) {
                            cmp = num2 - num1;
                        }
                    }
                }
                return cmp < 0 ? { range: { value1: value1, value2: value2 } } : null;
            };
        };
        return ValidationService;
    }());
    ValidationService.ɵfac = function ValidationService_Factory(t) { return new (t || ValidationService)(i0.ɵɵinject(i1.FormatService), i0.ɵɵinject(i1$1.IntlService)); };
    ValidationService.ɵprov = i0.ɵɵdefineInjectable({ token: ValidationService, factory: ValidationService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ValidationService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () { return [{ type: i1.FormatService }, { type: i1$1.IntlService }]; }, null);
    })();

    /**
     * An injection token that can be provided to override the component loaded by {@link ValidationDirective}
     * to display validation error messages. The default component is {@link ValidationMessageComponent}.
     */
    var VALIDATION_MESSAGE_COMPONENT = new i0.InjectionToken("VALIDATION_MESSAGE_COMPONENT");
    /**
     * A directive to automatically add validity classes to the element to which it is attached. In addition,
     * when the associated `FormControl` is invalid a component is dynamically loaded after the element to display
     * the validation message.
     * The component to load can be specified by providing the {@link VALIDATION_MESSAGE_COMPONENT} injection token.
     * By default, the {@link ValidationMessageComponent} component is used.
     */
    var ValidationDirective = /** @class */ (function () {
        function ValidationDirective(validationMessageComponent, viewContainerRef, loadComponentService, validationService) {
            this.validationMessageComponent = validationMessageComponent;
            this.viewContainerRef = viewContainerRef;
            this.loadComponentService = loadComponentService;
            this.validationService = validationService;
            this.element = viewContainerRef.element.nativeElement;
        }
        ValidationDirective.prototype.ngOnInit = function () {
            if (!this.options) {
                console.log("Validation.ngOnInit - no options");
                return;
            }
            var controlName;
            if (this.options instanceof forms.FormGroup) {
                this.form = this.options;
            }
            else {
                this.form = this.options.form;
                controlName = this.options.controlName;
                this.validClass = this.options.validClass;
                this.invalidClass = this.options.invalidClass;
                this.childSelector = this.options.childSelector;
                this.errorMessages = this.options.errorMessages;
            }
            if (!this.form) {
                console.log("Validation.ngOnInit - no form model");
                return;
            }
            if (!this.form.controls) {
                console.log("Validation.ngOnInit - no form controls");
                return;
            }
            if (controlName) {
                this.control = this.form.controls[controlName];
            }
            else {
                var formControlName = this.element.getAttribute("formControlName");
                if (formControlName) {
                    this.control = this.form.controls[formControlName];
                }
            }
            if (!this.control) {
                console.log("Validation.ngOnInit - no control");
                return;
            }
            if (!this.validClass) {
                this.validClass = "is-valid";
            }
            if (!this.invalidClass) {
                this.invalidClass = "is-invalid";
            }
            if (base.Utils.isUndefined(this.childSelector)) {
                this.childSelector = ".form-control";
            }
            this.valid = this.control.valid;
            this.dirty = this.control.dirty;
            this.active = true;
            this.error = undefined;
        };
        ValidationDirective.prototype.getFirstError = function () {
            if (this.control.errors) {
                return Object.keys(this.control.errors)[0];
            }
            return undefined;
        };
        ValidationDirective.prototype.getErrorText = function (error) {
            if (error && this.errorMessages && !!this.errorMessages[error]) {
                return this.errorMessages[error];
            }
            return this.validationService.getErrorText(error);
        };
        ValidationDirective.prototype.getErrorInfo = function (error) {
            if (error && this.control.errors) {
                return this.control.errors[error];
            }
            return undefined;
        };
        ValidationDirective.prototype.setValidityClasses = function () {
            var add = this.control.valid ? this.validClass : this.invalidClass;
            var remove = this.control.valid ? this.invalidClass : this.validClass;
            if (remove) {
                this.element.classList.remove(remove);
            }
            if (add) {
                this.element.classList.add(add);
            }
            if (this.childSelector) {
                var children = Array.from(this.element.querySelectorAll(this.childSelector));
                children.forEach(function (element) {
                    if (remove) {
                        element.classList.remove(remove);
                    }
                    if (add) {
                        element.classList.add(add);
                    }
                });
            }
        };
        ValidationDirective.prototype.removeValidityClasses = function () {
            var _this = this;
            if (this.validClass) {
                this.element.classList.remove(this.validClass);
            }
            if (this.invalidClass) {
                this.element.classList.remove(this.invalidClass);
            }
            if (this.childSelector) {
                var children = Array.from(this.element.querySelectorAll(this.childSelector));
                children.forEach(function (element) {
                    if (_this.validClass) {
                        element.classList.remove(_this.validClass);
                    }
                    if (_this.invalidClass) {
                        element.classList.remove(_this.invalidClass);
                    }
                });
            }
        };
        /**
         * Update the validity classes on the element depending on the validity state of the
         * associated `FormControl`. If the control is invalid then the validation message component
         * is loaded to display an error message.
         */
        ValidationDirective.prototype.ngDoCheck = function () {
            if (!this.active) {
                return;
            }
            if (this.valid === this.control.valid && this.dirty === this.control.dirty) {
                var firstError = this.getFirstError();
                var errorInfo = this.getErrorInfo(firstError);
                if (firstError === this.error && errorInfo === this.errorInfo) {
                    return;
                }
                this.error = firstError;
                this.errorInfo = errorInfo;
            }
            this.valid = this.control.valid;
            this.dirty = this.control.dirty;
            if (this.control.dirty) {
                this.setValidityClasses();
                if (this.control.valid) {
                    if (this.validationMessage) {
                        this.validationMessage.componentRef.instance.text = "";
                    }
                }
                else {
                    if (!this.validationMessage) {
                        this.validationMessage =
                            this.loadComponentService.loadComponent({ component: this.validationMessageComponent }, this.viewContainerRef);
                    }
                    var error = this.getFirstError();
                    this.validationMessage.componentRef.instance.text = this.getErrorText(error);
                    this.validationMessage.componentRef.instance.info = this.getErrorInfo(error);
                }
            }
            else {
                this.removeValidityClasses();
                if (this.validationMessage) {
                    this.validationMessage.componentRef.instance.text = "";
                }
            }
        };
        return ValidationDirective;
    }());
    ValidationDirective.ɵfac = function ValidationDirective_Factory(t) { return new (t || ValidationDirective)(i0.ɵɵdirectiveInject(VALIDATION_MESSAGE_COMPONENT), i0.ɵɵdirectiveInject(i0.ViewContainerRef), i0.ɵɵdirectiveInject(i1$2.LoadComponentService), i0.ɵɵdirectiveInject(ValidationService)); };
    ValidationDirective.ɵdir = i0.ɵɵdefineDirective({ type: ValidationDirective, selectors: [["", "sqValidation", ""]], inputs: { options: ["sqValidation", "options"] } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ValidationDirective, [{
                type: i0.Directive,
                args: [{
                        selector: "[sqValidation]"
                    }]
            }], function () {
            return [{ type: i0.Type, decorators: [{
                            type: i0.Inject,
                            args: [VALIDATION_MESSAGE_COMPONENT]
                        }] }, { type: i0.ViewContainerRef }, { type: i1$2.LoadComponentService }, { type: ValidationService }];
        }, { options: [{
                    type: i0.Input,
                    args: ["sqValidation"]
                }] });
    })();

    /**
     * A pipe to display the first error in a `ValidationErrors` map.
     */
    var ValidationErrorPipe = /** @class */ (function (_super) {
        __extends(ValidationErrorPipe, _super);
        function ValidationErrorPipe(intlService, changeDetectorRef, validationService) {
            var _this = _super.call(this, intlService, changeDetectorRef) || this;
            _this.validationService = validationService;
            return _this;
        }
        ValidationErrorPipe.prototype.updateValue = function (key, params) {
            _super.prototype.updateValue.call(this, key, params);
            var text = this.validationService.getFirstErrorText(key);
            var info = this.validationService.getFirstErrorInfo(key);
            this.value = text ? this.intlService.formatMessage(text, { values: info }) : undefined;
        };
        return ValidationErrorPipe;
    }(i1$1.AbstractIntlPipe));
    ValidationErrorPipe.ɵfac = function ValidationErrorPipe_Factory(t) { return new (t || ValidationErrorPipe)(i0.ɵɵdirectiveInject(i1$1.IntlService), i0.ɵɵinjectPipeChangeDetectorRef(), i0.ɵɵdirectiveInject(ValidationService)); };
    ValidationErrorPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqValidationError", type: ValidationErrorPipe, pure: false });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ValidationErrorPipe, [{
                type: i0.Pipe,
                args: [{ name: "sqValidationError", pure: false }]
            }], function () { return [{ type: i1$1.IntlService }, { type: i0.ChangeDetectorRef }, { type: ValidationService }]; }, null);
    })();

    var _c0 = function (a0) { return { values: a0 }; };
    /**
     * A default component to be used by the {@link ValidationDirective} directive to display
     * a validation error message using {@link MessagePipe}.
     */
    var ValidationMessageComponent = /** @class */ (function () {
        function ValidationMessageComponent() {
        }
        return ValidationMessageComponent;
    }());
    ValidationMessageComponent.ɵfac = function ValidationMessageComponent_Factory(t) { return new (t || ValidationMessageComponent)(); };
    ValidationMessageComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ValidationMessageComponent, selectors: [["sq-validation-message"]], inputs: { text: "text", info: "info" }, decls: 3, vars: 6, consts: [[1, "sq-validation-message"]], template: function ValidationMessageComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtext(1);
                i0.ɵɵpipe(2, "sqMessage");
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, ctx.text, i0.ɵɵpureFunction1(4, _c0, ctx.info)));
            }
        }, pipes: [i1$1.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ValidationMessageComponent, [{
                type: i0.Component,
                args: [{
                        selector: "sq-validation-message",
                        template: "\n        <div class=\"sq-validation-message\">{{text | sqMessage:{values: info} }}</div>\n    "
                    }]
            }], null, { text: [{
                    type: i0.Input
                }], info: [{
                    type: i0.Input
                }] });
    })();

    var VALIDATION_MODULE_PROVIDERS = [];

    /**
     * This module contains facilities for working with Angular's form validation. It provides a
     * {@link ValidationService} that works with {@link IntlService} and {@link FormatService} to
     * support locale-sensitive validators.
     */
    var ValidationModule = /** @class */ (function () {
        function ValidationModule() {
        }
        return ValidationModule;
    }());
    ValidationModule.ɵmod = i0.ɵɵdefineNgModule({ type: ValidationModule });
    ValidationModule.ɵinj = i0.ɵɵdefineInjector({ factory: function ValidationModule_Factory(t) { return new (t || ValidationModule)(); }, providers: __spread([
            { provide: VALIDATION_MESSAGE_COMPONENT, useValue: ValidationMessageComponent }
        ], VALIDATION_MODULE_PROVIDERS), imports: [[
                common.CommonModule,
                base.BaseModule,
                i1.AppUtilsModule,
                i1$1.IntlModule,
                i1$2.LoadComponentModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ValidationModule, { declarations: [ValidationDirective, ValidationMessageComponent, ValidationErrorPipe], imports: [common.CommonModule,
                base.BaseModule,
                i1.AppUtilsModule,
                i1$1.IntlModule,
                i1$2.LoadComponentModule], exports: [ValidationDirective, ValidationMessageComponent, ValidationErrorPipe] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ValidationModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            common.CommonModule,
                            base.BaseModule,
                            i1.AppUtilsModule,
                            i1$1.IntlModule,
                            i1$2.LoadComponentModule
                        ],
                        declarations: [
                            ValidationDirective, ValidationMessageComponent, ValidationErrorPipe,
                        ],
                        exports: [
                            ValidationDirective, ValidationMessageComponent, ValidationErrorPipe,
                        ],
                        providers: __spread([
                            { provide: VALIDATION_MESSAGE_COMPONENT, useValue: ValidationMessageComponent }
                        ], VALIDATION_MODULE_PROVIDERS)
                    }]
            }], null, null);
    })();

    var _enValidation = {
        "validation": {
            "min": "The value must be at least {min}",
            "max": "The value can be no more than {max}",
            "required": "This field is required",
            "requiredTrue": "This field must be set",
            "email": "A valid email address is required",
            "minLength": "The value must have at least {requiredLength, plural, one {# character} other {# characters}}",
            "maxLength": "The value can have no more than {requiredLength, plural, one {# character} other {# characters}}",
            "pattern": "The value is invalid",
            "unique": "This field must be unique",
            "integer": "The value must be an integer",
            "number": "The value must be a number",
            "date": "",
            "range": "The first value must be less than or equal to the second"
        }
    };

    var _frValidation = {
        "validation": {
            "min": "La valeur doit être supérieure ou égale à {min}",
            "max": "La valeur ne peut pas être supérieure à {max}",
            "required": "Ce champ est obligatoire",
            "requiredTrue": "Ce champ doit être positionné",
            "email": "Une adresse e-mail valide est exigée",
            "minLength": "La valeur doit comporter au moins {requiredLength, plural, one {# caractère} autre que {# caractère}}",
            "maxLength": "La valeur ne peut comporter plus de {requiredLength, plural, one {# caractère} autre que {# caractères}}",
            "pattern": "La valeur est invalide",
            "unique": "Ce champ doit être unique",
            "integer": "La valeur doit être un entier",
            "number": "La valeur doit être un nombre",
            "date": "",
            "range": "La première valeur doit être inférieure ou égale à la seconde"
        }
    };

    var _deValidation = {
        "validation": {
            "min": "Der Mindestwert ist {min}",
            "max": "Der Wert kann nicht größer sein als {max}",
            "required": "Dies ist ein Mussfeld",
            "requiredTrue": "Dieses Feld muss ausgefüllt werden",
            "email": "Eine gültige E-Mail-Adresse ist einzutragen",
            "minLength": "Die Mindestlänge des Wertes beträgt {requiredLength, plural, one {# Zeichen} other {# Zeichen}}",
            "maxLength": "Der Wert darf nicht mehr als {requiredLength, plural, one {# Zeichen} other {# Zeichen}} haben",
            "pattern": "Der Wert ist ungültig",
            "unique": "Dieses Feld muss eindeutig sein",
            "integer": "Der Wert muss eine ganze Zahl sein",
            "number": "Der Wert muss eine Nummer sein",
            "date": "",
            "range": "Der erste Wert muss kleiner oder gleich dem zweiten Wert sein"
        }
    };

    var enValidation = base.Utils.merge({}, _enValidation, i1$1.enIntl);
    var frValidation = base.Utils.merge({}, _frValidation, i1$1.frIntl);
    var deValidation = base.Utils.merge({}, _deValidation, i1$1.deIntl);

    /**
     * Generated bundle index. Do not edit.
     */

    exports.VALIDATION_MESSAGE_COMPONENT = VALIDATION_MESSAGE_COMPONENT;
    exports.ValidationDirective = ValidationDirective;
    exports.ValidationErrorPipe = ValidationErrorPipe;
    exports.ValidationMessageComponent = ValidationMessageComponent;
    exports.ValidationModule = ValidationModule;
    exports.ValidationService = ValidationService;
    exports.deValidation = deValidation;
    exports.enValidation = enValidation;
    exports.frValidation = frValidation;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-core-validation.umd.js.map
