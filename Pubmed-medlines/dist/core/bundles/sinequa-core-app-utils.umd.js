(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@sinequa/core/base'), require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@sinequa/core/web-services'), require('@sinequa/core/intl'), require('d3-format'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('@sinequa/core/app-utils', ['exports', '@sinequa/core/base', '@angular/core', 'rxjs', 'rxjs/operators', '@sinequa/core/web-services', '@sinequa/core/intl', 'd3-format', '@angular/common/http'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.core = global.sinequa.core || {}, global.sinequa.core['app-utils'] = {}), global.sinequa.core.base, global.ng.core, global.rxjs, global.rxjs.operators, global.sinequa.core['web-services'], global.sinequa.core.intl, global.d3Format, global.ng.common.http));
}(this, (function (exports, base, i0, rxjs, operators, i1$1, i1, d3Format, http) { 'use strict';

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
     *
     * Used internally to avoid circular references between ExprParser, AppService and FormatService.
     * Do not export from the app-utils module.
     */
    var AppServiceHelpers = /** @class */ (function () {
        function AppServiceHelpers() {
        }
        AppServiceHelpers.isString = function (column) {
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
        };
        AppServiceHelpers.isCsv = function (column) {
            if (!column) {
                return false;
            }
            if (column.eType === 15 /* csv */ && (column.eTypeModifier & 8388608 /* x */) !== 8388608 /* x */) {
                return true;
            }
            return false;
        };
        AppServiceHelpers.isTree = function (column) {
            if (!column) {
                return false;
            }
            if (column.eType === 15 /* csv */ && (column.eTypeModifier & 524292 /* t */) === 524292 /* t */) {
                return true;
            }
            return false;
        };
        AppServiceHelpers.isEntity = function (column) {
            if (!column) {
                return false;
            }
            if (column.eType === 15 /* csv */ && (column.eTypeModifier & (2068 /* e */ | 2052 /* l */)) === (2068 /* e */ | 2052 /* l */)) {
                return true;
            }
            return false;
        };
        AppServiceHelpers.isBoolean = function (column) {
            if (!column) {
                return false;
            }
            if (column.eType === 1 /* bool */) {
                return true;
            }
            return false;
        };
        AppServiceHelpers.isDate = function (column) {
            if (!column) {
                return false;
            }
            if (column.eType === 2 /* date */ || column.eType === 3 /* dateTime */ || column.eType === 4 /* time */) {
                return true;
            }
            return false;
        };
        AppServiceHelpers.isDouble = function (column) {
            if (!column) {
                return false;
            }
            if (column.eType === 8 /* double */ || column.eType === 7 /* float */) {
                return true;
            }
            return false;
        };
        AppServiceHelpers.isInteger = function (column) {
            if (!column) {
                return false;
            }
            if (column.eType === 6 /* integer */ || column.eType === 5 /* unsigned */) {
                return true;
            }
            return false;
        };
        AppServiceHelpers.isNumber = function (column) {
            return AppServiceHelpers.isInteger(column) || AppServiceHelpers.isDouble(column);
        };
        AppServiceHelpers.isScalar = function (column) {
            return AppServiceHelpers.isNumber(column) || AppServiceHelpers.isDate(column) || AppServiceHelpers.isBoolean(column);
        };
        AppServiceHelpers.isSortable = function (column) {
            return AppServiceHelpers.isString(column) || AppServiceHelpers.isScalar(column) ||
                (AppServiceHelpers.isCsv(column) && !!column && ((column.eTypeModifier & 2052 /* l */) === 2052 /* l */));
        };
        return AppServiceHelpers;
    }());

    /**
     * Represents a parsed fielded search expression. A tree of expression nodes is built when an expression
     * combines sub-expressions using boolean operators
     */
    var Expr = /** @class */ (function () {
        function Expr(init) {
            this._field = undefined;
            this._display = undefined;
            this._displayObj = undefined;
            /**
             * The values of this expression
             */
            this.values = undefined;
            if (!init.op1) {
                var valueInit = init;
                this.exprContext = valueInit.exprContext;
                if (!base.Utils.isUndefined(valueInit.value)) {
                    this.value = ExprParser.unescape(valueInit.value);
                }
                else if (!base.Utils.isUndefined(valueInit.values)) {
                    this.values = ExprParser.unescapeList(valueInit.values);
                }
                this.locations = valueInit.locations;
                this.field = valueInit.field;
                this.display = valueInit.display;
                this.operator = !base.Utils.isUndefined(valueInit.operator) ? valueInit.operator : 0 /* none */;
                this.near = -1;
                this.start = -1;
                this.length = 0;
            }
            else {
                var opsInit = init;
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
        Object.defineProperty(Expr.prototype, "field", {
            /**
             * Return the field name of this expression. Return the first ancestor's non-empty field
             * if the field on this node is empty
             */
            get: function () {
                var expr = this;
                while (expr) {
                    if (!base.Utils.isEmpty(expr._field)) {
                        return expr._field;
                    }
                    expr = expr.parent;
                }
                return undefined;
            },
            /**
             * Set the field name of this expression
             */
            set: function (value) {
                this._field = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Expr.prototype, "display", {
            /**
             * Return the display value of this expression. Return the first ancestor's non-empty display value
             * if the display value on this node is empty
             */
            get: function () {
                var expr = this;
                while (expr) {
                    if (!base.Utils.isEmpty(expr._display)) {
                        return expr._display;
                    }
                    expr = expr.parent;
                }
                return undefined;
            },
            /**
             * Set the display value of this expression. If the display value is a valid stringified JSON object
             * then set `displayObj` to the parsed object
             */
            set: function (value) {
                this._display = value;
                if (!this._display) {
                    this._displayObj = undefined;
                }
                else {
                    if (this._display[0] === "{" && this._display[this._display.length - 1] === "}") {
                        try {
                            this._displayObj = base.Utils.fromJson(this._display);
                        }
                        catch (e) {
                            this._displayObj = undefined;
                        }
                    }
                    else {
                        this._displayObj = undefined;
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Expr.prototype, "displayObj", {
            /**
             * Return the display object of this expression. Return the first ancestor's non-empty display object
             * if the display object on this node is empty
             */
            get: function () {
                var expr = this;
                while (expr) {
                    if (expr._displayObj) {
                        return expr._displayObj;
                    }
                    expr = expr.parent;
                }
                return undefined;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Expr.prototype, "value", {
            /**
             * Return the value of this expression. Note that range expressions may have multiple values
             */
            get: function () {
                if (!this.values || this.values.length === 0) {
                    return undefined;
                }
                return this.values[0];
            },
            /**
             * Set the value of this expression
             */
            set: function (value) {
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
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Expr.prototype, "evaluationRegExps", {
            get: function () {
                if (!this._evaluationRegExps) {
                    this._evaluationRegExps = {};
                }
                return this._evaluationRegExps;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Add an operand to this expression
         *
         * @param operand The operand to add
         * @param contextField The parser's field context, if any
         * @param prepend If `true` the operand is prepended to the operands
         */
        Expr.prototype.addOperand = function (operand, contextField, prepend) {
            var e_1, _b;
            if (prepend === void 0) { prepend = false; }
            if (base.Utils.isUndefined(contextField)) {
                contextField = this.field;
            }
            if (!this.operands) {
                this.operands = [];
            }
            if (!base.Utils.isEmpty(this.field) && base.Utils.isEmpty(operand.field) && !operand.isStructured) {
                if (base.Utils.isEmpty(contextField)) {
                    try {
                        // Prefer setting the fields explicitly on the target operands rather the Field to "text" on the source operand
                        // operand.field = ExprParser.fieldPartnamePrefix + "text";
                        for (var _c = __values(this.operands), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var expr = _d.value;
                            if (base.Utils.isEmpty(expr._field)) {
                                expr._field = this.field;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    this.field = undefined;
                }
            }
            if (!base.Utils.eqNC(this.field || "", operand.field || "")) {
                operand._field = operand.field;
            }
            else {
                operand._field = undefined;
            }
            if (!base.Utils.isEmpty(this.display)) {
                operand._display = undefined;
            }
            if (prepend) {
                this.operands.unshift(operand);
            }
            else {
                this.operands.push(operand);
            }
            operand.parent = this;
        };
        Object.defineProperty(Expr.prototype, "isLeaf", {
            /**
             * Return `true` if this expression is a leaf node (does have a value)
             */
            get: function () {
                // if (this.value === null && !this.operands) throw "Expr.isLeaf - bad expression";
                return !!this.value;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Make an expression object
         *
         * @param exprContext The expression context
         * @param text The value of the expression
         * @param field The parser's field context
         * @param display The display value
         * @param allowEmptyValue Determines how empty values will be processed when making the expression
         */
        Expr.makeExpr = function (exprContext, text, field, display, allowEmptyValue) {
            if (!Expr.getIsStructuredField(exprContext, Expr.resolveField(exprContext, field))) {
                return new Expr({
                    exprContext: exprContext,
                    value: text,
                    field: field,
                    display: display
                });
            }
            var values = { value: undefined };
            var locations = { value: undefined };
            var operator = { value: 0 /* none */ };
            var range = { value: 0 /* none */ };
            Expr.parseValue(exprContext, text, field, allowEmptyValue, values, locations, operator, range);
            if (range.value !== 0 /* none */ && values.value && locations.value) {
                var value1 = values.value[0];
                var value2 = values.value[1];
                var location1 = locations.value[0];
                var location2 = locations.value[1];
                if (range.value === 1 /* gteLte */ && !base.Utils.eqNC(value1, "*") && !base.Utils.eqNC(value2, "*")) {
                    return new Expr({
                        exprContext: exprContext,
                        values: values.value,
                        locations: locations.value,
                        field: field,
                        display: display,
                        operator: 11 /* between */
                    });
                }
                var expr1 = !base.Utils.eqNC(value1, "*") ? new Expr({
                    exprContext: exprContext,
                    value: value1,
                    locations: [location1],
                    field: field,
                    display: display,
                    operator: range.value === 2 /* gteLt */ || range.value === 1 /* gteLte */ ? 3 /* gte */ : 2 /* gt */
                }) : null;
                var expr2 = !base.Utils.eqNC(value2, "*") ? new Expr({
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
        };
        Expr.resolveField = function (exprContext, field) {
            if (base.Utils.isString(field)) {
                return exprContext.appService.resolveColumnName(field);
            }
            return "";
        };
        Expr.getColumn = function (exprContext, field) {
            return exprContext.appService.getColumn(field);
        };
        Object.defineProperty(Expr.prototype, "column", {
            /**
             * Return the {@link CCColumn} corresponding to this expression
             */
            get: function () {
                return Expr.getColumn(this.exprContext, this.field);
            },
            enumerable: false,
            configurable: true
        });
        Expr.getIsStructuredField = function (exprContext, field) {
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
                if (base.Utils.eqNCN(field, "exists", "missing")) {
                    return true;
                }
                return !!Expr.getColumn(exprContext, field);
            }
        };
        Object.defineProperty(Expr.prototype, "isStructuredField", {
            /**
             * Return `true` if the expression has a non-fulltext field. In this case the expression will be a leaf node
             */
            get: function () {
                if (!this.isLeaf) {
                    return false;
                }
                return Expr.getIsStructuredField(this.exprContext, this.field);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Expr.prototype, "isStructured", {
            /**
             * Return `true` if the expression only contains non-fulltext fields
             */
            get: function () {
                var e_2, _b;
                if (this.mergedStructured) {
                    return true;
                }
                if (this.isLeaf) {
                    return this.isStructuredField;
                }
                if (!this.operands) {
                    return false;
                }
                try {
                    for (var _c = __values(this.operands), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var operand = _d.value;
                        if (!operand.isStructured) {
                            return false;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Expr.prototype, "isPositive", {
            /**
             * Return `true` if the expression and its ancestors do not have `not` set to `true`
             */
            get: function () {
                var positive = true;
                var current = this;
                while (current != null) {
                    positive = positive && !current.not;
                    current = current.parent;
                }
                return positive;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Return an `ExprValueLocation` object for the passed text. Leading and trailing
         * whitespace is excluded
         */
        Expr.getValueAndLocation = function (text) {
            var start = 0;
            var length = text.length;
            var value1 = base.Utils.trimStart(text);
            start += length - value1.length;
            length -= length - value1.length;
            var value2 = base.Utils.trimEnd(value1);
            length -= length - value2.length;
            return {
                value: value2,
                start: start,
                length: length
            };
        };
        Expr.parseValue = function (exprContext, text, field, allowEmptyValue, values, locations, operator, range) {
            if (base.Utils.isEmpty(text) && !allowEmptyValue) {
                return;
            }
            var first = text[0];
            var last = text[text.length - 1];
            var vl;
            if ("[{".includes(first) && "]}".includes(last)) {
                text = text.substr(1, text.length - 2);
                var sepLen = 4;
                var sep = text.indexOf(" TO ");
                if (sep === -1) {
                    sepLen = 2;
                    sep = text.indexOf("..");
                }
                if (sep === -1) {
                    var vls = ExprParser.valuesAndLocationsFromText(text, ',');
                    values.value = [];
                    locations.value = [];
                    vls.forEach(function (vl1) {
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
        };
        Expr.getOperatorText = function (operator) {
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
        };
        /**
         * Find the first `ExprValueInfo` object from a starting position in this expression
         *
         * @param start The position at which to start the search
         */
        Expr.prototype.findValue = function (start) {
            var e_3, _b;
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
                        for (var i = 0, ic = this.values.length; i < ic; i++) {
                            var value = this.values[i];
                            var location = this.locations[i];
                            if (start >= this.start + location.start && start <= this.start + location.start + location.length) {
                                return {
                                    value: value,
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
                try {
                    for (var _c = __values(this.operands), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var expr = _d.value;
                        var value = expr.findValue(start);
                        if (value) {
                            return value;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            return undefined;
        };
        /**
         * Combine two expressions into a single expression. The second expression will be added to
         * the first expression and the first expression returned if the first expression is non-leaf
         * and is an `AND` expression and not negated. Otherwise, a new `AND` expression will be created
         * to which both expressions are added as operands.
         */
        Expr.combine = function (expr1, expr2) {
            var e_4, _b;
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
                    try {
                        for (var _c = __values(expr2.operands), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var expr3 = _d.value;
                            expr1.addOperand(expr3);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_4) throw e_4.error; }
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
        };
        Expr.prototype.normalizeField = function (field) {
            if (field && field[0] === ExprParser.fieldPartnamePrefix) {
                return field.substr(1);
            }
            return field;
        };
        Expr.prototype.shouldDisplayField = function () {
            if (!this.field && !this.parent) { // top level full text
                return true;
            }
            return !!this.field && (!this.parent || !base.Utils.eqNC(this.field, this.parent.field || ""));
        };
        Expr.prototype.getOperatorString = function () {
            if (this.operator === 0 /* none */ || this.operator === 1 /* eq */) {
                return "";
            }
            return Expr.getOperatorText(this.operator);
        };
        Expr.prototype.escapeValue = function (value) {
            if (!!value && !!this.column && (AppServiceHelpers.isString(this.column) || AppServiceHelpers.isCsv(this.column))) {
                return ExprParser.escape(value);
            }
            return value || "";
        };
        Expr.prototype.getValueString = function () {
            var e_5, _b;
            if (this.operator === 11 /* between */ && this.values && this.values.length === 2) {
                return "[" + this.escapeValue(this.values[0]) + ".." + this.escapeValue(this.values[1]) + "]";
            }
            if (this.values && this.values.length > 1) {
                var sb = [];
                try {
                    for (var _c = __values(this.values), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var value = _d.value;
                        if (sb.length > 0) {
                            sb.push(", ");
                        }
                        sb.push(this.escapeValue(value));
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                sb.unshift("[");
                sb.push("]");
                return sb.join("");
            }
            return this.escapeValue(this.value);
        };
        Expr.prototype.addFieldToString = function (sb) {
            var added = false;
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
        };
        Expr.prototype._toString = function (withFields, inner) {
            var e_6, _b;
            var sb = [];
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
                var bracketed = inner;
                if (this.addFieldToString(sb)) {
                    bracketed = true;
                }
                if (bracketed) {
                    sb.push("(");
                }
                var first = true;
                try {
                    for (var _c = __values(this.operands), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var operand = _d.value;
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
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
                if (bracketed) {
                    sb.push(")");
                }
            }
            return sb.join("");
        };
        /**
         * Return a string representation of this expression
         *
         * @param withFields If `true`, include field names
         */
        Expr.prototype.toString = function (withFields) {
            if (withFields === void 0) { withFields = true; }
            return this._toString(withFields, false);
        };
        Expr.prototype.addDisplay = function (options, ctxt, display) {
            this._addValue(options, ctxt, this.value || "", display);
        };
        Expr.prototype.encodeHTML = function (text, options) {
            if (options && options.asHTML) {
                return base.Utils.encodeHTML(text);
            }
            else {
                return text;
            }
        };
        Expr.prototype._addValue = function (options, ctxt, value, display) {
            if (options.asHTML) {
                ctxt.message.push("<span class=\"sq-value\">");
            }
            var column = this.exprContext.appService.getColumn(this.field);
            var valueId = "value" + ctxt.valueIndex++;
            var _value = value;
            var _display;
            if (display) {
                _display = this.encodeHTML(ExprParser.unescape(display), options);
            }
            if (column && AppServiceHelpers.isNumber(column) && base.Utils.testFloat(value)) {
                _value = +value;
            }
            else if (column && AppServiceHelpers.isDate(column)) {
                _value = base.Utils.fromSysDateStr(value) || value;
            }
            else if (column && AppServiceHelpers.isBoolean(column)) {
                _value = base.Utils.isTrue(value);
            }
            else if (base.Utils.isString(_value)) {
                _value = this.encodeHTML(_value, options);
            }
            ctxt.message.push("{" + valueId + "}");
            ctxt.values[valueId] = column
                ? this.exprContext.formatService.formatFieldValue({ value: _value, display: _display }, column)
                : _display || _value;
            if (options.asHTML) {
                ctxt.message.push("</span>");
            }
        };
        Expr.prototype.addValue = function (options, ctxt) {
            var e_7, _b;
            if (this.values) {
                if (this.operator === 11 /* between */ && this.values.length === 2) {
                    this._addValue(options, ctxt, this.values[0]);
                    ctxt.message.push(" ");
                    this.addOperator("AND", options, ctxt);
                    ctxt.message.push(" ");
                    this._addValue(options, ctxt, this.values[1]);
                }
                else if (this.values.length > 1) {
                    var first = true;
                    try {
                        for (var _c = __values(this.values), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var value = _d.value;
                            ctxt.message.push(first ? "[" : ", ");
                            first = false;
                            this._addValue(options, ctxt, value);
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                    ctxt.message.push("]");
                }
                else {
                    this._addValue(options, ctxt, this.values[0]);
                }
            }
        };
        Expr.prototype.addText = function (options, ctxt, text) {
            var valueId = "value" + ctxt.valueIndex++;
            var message = "{" + valueId + "}";
            ctxt.message.push(message);
            ctxt.values[valueId] = this.encodeHTML(text, options);
        };
        Expr.prototype.addFieldLabel = function (options, ctxt) {
            var _this = this;
            var displayObj = this.displayObj;
            if (displayObj && displayObj.label) {
                this.addText(options, ctxt, displayObj.label);
            }
            else if (this.field) {
                var label = this.exprContext.appService.getLabel(this.normalizeField(this.field) || "");
                this.addText(options, ctxt, label);
            }
            else {
                if (!this.isStructured) {
                    var label = this.exprContext.appService.getLabel("text");
                    this.addText(options, ctxt, label);
                }
                else {
                    var fields = this.getFields();
                    fields.forEach(function (field, index) {
                        if (index !== 0) {
                            _this.addText(options, ctxt, "/");
                        }
                        var label = _this.exprContext.appService.getLabel(field);
                        _this.addText(options, ctxt, label);
                    });
                }
            }
        };
        Expr.prototype.addField = function (options, ctxt) {
            if (options.asHTML) {
                ctxt.message.push("<span class=\"sq-field\">");
            }
            this.addFieldLabel(options, ctxt);
            if (options.asHTML) {
                ctxt.message.push("</span>");
                ctxt.message.push("<span class=\"sq-separator\">");
            }
            this.addText(options, ctxt, "msg#system.fieldSeparator");
            if (options.asHTML) {
                ctxt.message.push("</span>");
            }
        };
        Expr.prototype.addOperator = function (operator, options, ctxt) {
            if (!operator) {
                return;
            }
            if (options.asHTML) {
                ctxt.message.push("<span class=\"sq-operator\">");
            }
            ctxt.message.push(this.encodeHTML(operator, options));
            if (options.asHTML) {
                ctxt.message.push("</span>");
            }
        };
        Expr.prototype._toMessage = function (ctxt, options) {
            var e_8, _b;
            var inner = ctxt.inner;
            ctxt.inner = true;
            if (!options) {
                options = {};
            }
            if (base.Utils.isUndefined(options.useDisplay)) {
                options.useDisplay = true;
            }
            var displayObj = this.displayObj;
            var display = (displayObj ? displayObj.display : undefined) || this.display;
            var showNot = this.not && (inner || !options.hideOuterNot);
            var showField = (options.withFields || inner) && this.shouldDisplayField();
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
                var operator = this.getOperatorString();
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
                var bracketed = inner;
                if (showField) {
                    this.addField(options, ctxt);
                    bracketed = true;
                }
                if (bracketed) {
                    ctxt.message.push("(");
                }
                var first = true;
                try {
                    for (var _c = __values(this.operands), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var operand = _d.value;
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
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_8) throw e_8.error; }
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
        };
        /**
         * Return an `ExprMessage` for the expression which can be used with [IntlService.formatMessage]{@link IntlService#formatMessage}
         * for display purposes
         */
        Expr.prototype.toMessage = function (options) {
            return this._toMessage({
                inner: false,
                message: ["txt#"],
                values: {},
                valueIndex: 0
            }, options);
        };
        Expr.matchNode = function (context, expr1, expr2) {
            var e_9, _b, e_10, _c;
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
                var field1 = context.appService.resolveColumnAlias(expr1.field);
                var field2 = context.appService.resolveColumnAlias(expr2.field);
                if (field1 !== field2) {
                    return false;
                }
                var operator1 = expr1.operator === 0 /* none */ ? 1 /* eq */ : expr1.operator;
                var operator2 = expr2.operator === 0 /* none */ ? 1 /* eq */ : expr2.operator;
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
                var expr1StructuredCount_1 = 0, expr1UnstructuredCount_1 = 0, expr2StructuredCount_1 = 0, expr2UnstructuredCount_1 = 0;
                expr1.operands.forEach(function (operand) {
                    if (operand.isStructured) {
                        expr1StructuredCount_1++;
                    }
                    else {
                        expr1UnstructuredCount_1++;
                    }
                });
                expr2.operands.forEach(function (operand) {
                    if (operand.isStructured) {
                        expr2StructuredCount_1++;
                    }
                    else {
                        expr2UnstructuredCount_1++;
                    }
                });
                if ((expr2StructuredCount_1 > expr1StructuredCount_1) || (expr2UnstructuredCount_1 > expr1UnstructuredCount_1)) {
                    return false;
                }
            }
            var values1Length = expr1.values ? expr1.values.length : 0;
            var values2Length = expr2.values ? expr2.values.length : 0;
            if (values1Length !== values2Length) {
                return false;
            }
            if (values1Length && expr1.values && expr2.values) {
                try {
                    for (var _d = __values(expr1.values), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var value1 = _e.value;
                        var found = false;
                        try {
                            for (var _f = (e_10 = void 0, __values(expr2.values)), _g = _f.next(); !_g.done; _g = _f.next()) {
                                var value2 = _g.value;
                                if (base.Utils.eqNC(value1, value2)) {
                                    found = true;
                                }
                            }
                        }
                        catch (e_10_1) { e_10 = { error: e_10_1 }; }
                        finally {
                            try {
                                if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                            }
                            finally { if (e_10) throw e_10.error; }
                        }
                        if (!found) {
                            return false;
                        }
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
            }
            return true;
        };
        /**
         * Return `true` if this expression matches the passed one
         */
        Expr.prototype.matchNode = function (expr) {
            return Expr.matchNode(this.exprContext, this, expr);
        };
        /**
         * Returns the matching expression or sub-expression in this expression with the passed one.
         *
         * @param expr The expression to match
         * @param filter An option filter function called on first level candidate sub-expressions
         * before matching within them
         */
        Expr.prototype.find = function (expr, filter) {
            var e_11, _b, e_12, _c, e_13, _d;
            if (this.matchNode(expr)) {
                if (!this.isLeaf && this.operands) {
                    try {
                        for (var _e = __values(expr.operands), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var child1 = _f.value;
                            var found = false;
                            try {
                                for (var _g = (e_12 = void 0, __values(this.operands)), _h = _g.next(); !_h.done; _h = _g.next()) {
                                    var child2 = _h.value;
                                    if (filter && filter(child2)) {
                                        continue;
                                    }
                                    if (child2.find(child1)) {
                                        found = true;
                                        break;
                                    }
                                }
                            }
                            catch (e_12_1) { e_12 = { error: e_12_1 }; }
                            finally {
                                try {
                                    if (_h && !_h.done && (_c = _g.return)) _c.call(_g);
                                }
                                finally { if (e_12) throw e_12.error; }
                            }
                            if (!found) {
                                return null;
                            }
                        }
                    }
                    catch (e_11_1) { e_11 = { error: e_11_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_11) throw e_11.error; }
                    }
                }
                return this;
            }
            else {
                if (!this.isLeaf && this.operands) {
                    try {
                        for (var _j = __values(this.operands), _k = _j.next(); !_k.done; _k = _j.next()) {
                            var child = _k.value;
                            if (filter && filter(child)) {
                                continue;
                            }
                            if (child.find(expr)) {
                                return child;
                            }
                        }
                    }
                    catch (e_13_1) { e_13 = { error: e_13_1 }; }
                    finally {
                        try {
                            if (_k && !_k.done && (_d = _j.return)) _d.call(_j);
                        }
                        finally { if (e_13) throw e_13.error; }
                    }
                }
            }
            return null;
        };
        /**
         * Perform the passed `action` on this expression and any descendant operands
         *
         * @param action The action to perform
         */
        Expr.prototype.forEach = function (action) {
            var e_14, _b;
            action(this);
            if (this.operands) {
                try {
                    for (var _c = __values(this.operands), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var operand = _d.value;
                        operand.forEach(action);
                    }
                }
                catch (e_14_1) { e_14 = { error: e_14_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_14) throw e_14.error; }
                }
            }
        };
        /**
         * Execute the callback function on this node and any descendants until the callback returns a truthy value
         * in which case immediately return `true`. Otherwise return `false`.
         */
        Expr.prototype.some = function (callback) {
            var e_15, _b;
            if (callback(this)) {
                return true;
            }
            if (this.operands) {
                try {
                    for (var _c = __values(this.operands), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var operand = _d.value;
                        if (operand.some(callback)) {
                            return true;
                        }
                    }
                }
                catch (e_15_1) { e_15 = { error: e_15_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_15) throw e_15.error; }
                }
            }
            return false;
        };
        /**
         * Execute the callback function on this node and any descendants until the callback returns a falsy value
         * in which case, immediately return `false`. Otherwise return `true`.
         */
        Expr.prototype.every = function (callback) {
            var e_16, _b;
            if (!callback(this)) {
                return false;
            }
            if (this.operands) {
                try {
                    for (var _c = __values(this.operands), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var operand = _d.value;
                        if (!operand.every(callback)) {
                            return false;
                        }
                    }
                }
                catch (e_16_1) { e_16 = { error: e_16_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_16) throw e_16.error; }
                }
            }
            return true;
        };
        Object.defineProperty(Expr.prototype, "hasRelevance", {
            /**
             * Return `true` if the exoression has at least one fulltext operand.
             * The test on `isPositive` filters expressions that only contain
             * negative fulltext terms which will be ignored on the server. Fulltext
             * expressions must have at least one positive term.
             */
            get: function () {
                return this.some(function (expr) { return expr.isLeaf && !expr.isStructured && expr.isPositive; });
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Return an array of all fields used in this expression
         */
        Expr.prototype.getFields = function () {
            var _this = this;
            var fields = [];
            this.forEach(function (expr) {
                var field = _this.exprContext.appService.resolveColumnAlias(expr.field);
                if (field) {
                    if (!fields.find(function (field1) { return base.Utils.eqNC(field, field1); })) {
                        fields.push(field);
                    }
                }
            });
            return fields;
        };
        /**
         * Return an array of all values used in this expression that pertain to the passed field and where the associated `isPositive`
         * field matches the passed `positive` parameter
         *
         * @param field The field for which values are to be returned
         * @param positive The value to test against `isPositive`
         */
        Expr.prototype.getValues = function (field, positive) {
            var _this = this;
            if (positive === void 0) { positive = true; }
            var values = [];
            var column = this.exprContext.appService.resolveColumnName(field);
            this.forEach(function (expr) {
                if (column) {
                    var column1 = _this.exprContext.appService.resolveColumnName(expr.field);
                    if (!base.Utils.eqNC(column, column1)) {
                        return;
                    }
                }
                if (expr.isLeaf && expr.isPositive === positive && expr.values) {
                    values.push.apply(values, __spread(expr.values));
                }
            });
            return values;
        };
        Expr.prototype.getDataValue = function (data, field, defaultScope) {
            var e_17, _b;
            if (!data) {
                return undefined;
            }
            var fields = base.Utils.split(field || "", ".");
            if (fields.length >= 1 && base.Utils.isUndefined(data[fields[0]]) && !!defaultScope) {
                // By default, look on the "defaultScope" sub-object
                fields.unshift.apply(fields, __spread(base.Utils.split(defaultScope, ".")));
            }
            var value = data;
            try {
                for (var fields_1 = __values(fields), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
                    var _field = fields_1_1.value;
                    if (!value) {
                        break;
                    }
                    value = value[_field];
                }
            }
            catch (e_17_1) { e_17 = { error: e_17_1 }; }
            finally {
                try {
                    if (fields_1_1 && !fields_1_1.done && (_b = fields_1.return)) _b.call(fields_1);
                }
                finally { if (e_17) throw e_17.error; }
            }
            return value;
        };
        Expr.prototype.getWildcardRegExp = function (value) {
            var e_18, _b;
            if (value) {
                var regExp = this.evaluationRegExps[value];
                if (!base.Utils.isUndefined(regExp)) {
                    return regExp;
                }
                var haveWildcards = false;
                var escaping = false;
                var sb = [];
                try {
                    for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                        var ch = value_1_1.value;
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
                }
                catch (e_18_1) { e_18 = { error: e_18_1 }; }
                finally {
                    try {
                        if (value_1_1 && !value_1_1.done && (_b = value_1.return)) _b.call(value_1);
                    }
                    finally { if (e_18) throw e_18.error; }
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
        };
        // NB comparisons with NaN always return false
        Expr.prototype.compare = function (value, dataValue, equality) {
            var e_19, _b, e_20, _c;
            if (base.Utils.isArray(dataValue) && dataValue.length === 0) {
                return NaN;
            }
            var column = Expr.getColumn(this.exprContext, this.field || "");
            if (base.Utils.isArray(dataValue) || base.Utils.isArray(value)) {
                // "in" / "contains"
                if (!base.Utils.isArray(dataValue)) {
                    dataValue = [dataValue];
                }
                if (base.Utils.isArray(value)) {
                    if (value.length === 0) {
                        return NaN;
                    }
                }
                else {
                    value = [value + ""];
                }
                try {
                    // At least one value in the value array must match a value in the dataValue array
                    for (var value_2 = __values(value), value_2_1 = value_2.next(); !value_2_1.done; value_2_1 = value_2.next()) {
                        var value1 = value_2_1.value;
                        try {
                            for (var dataValue_1 = (e_20 = void 0, __values(dataValue)), dataValue_1_1 = dataValue_1.next(); !dataValue_1_1.done; dataValue_1_1 = dataValue_1.next()) {
                                var dataValue1 = dataValue_1_1.value;
                                if (this.compare(value1, dataValue1, true) === 0) {
                                    return 0;
                                }
                            }
                        }
                        catch (e_20_1) { e_20 = { error: e_20_1 }; }
                        finally {
                            try {
                                if (dataValue_1_1 && !dataValue_1_1.done && (_c = dataValue_1.return)) _c.call(dataValue_1);
                            }
                            finally { if (e_20) throw e_20.error; }
                        }
                    }
                }
                catch (e_19_1) { e_19 = { error: e_19_1 }; }
                finally {
                    try {
                        if (value_2_1 && !value_2_1.done && (_b = value_2.return)) _b.call(value_2);
                    }
                    finally { if (e_19) throw e_19.error; }
                }
                return NaN;
            }
            if (!base.Utils.isArray(value)) {
                value = ExprParser.unescape(value || "");
                if (column && column.parser) {
                    value = this.exprContext.formatService.parseValue(value, column.parser);
                }
                if (AppServiceHelpers.isNumber(column)) {
                    if (!base.Utils.isNumber(dataValue)) {
                        dataValue = 0;
                    }
                    var _value = base.Utils.toNumber(value);
                    return dataValue - _value;
                }
                if (AppServiceHelpers.isDate(column)) {
                    if (base.Utils.isString(dataValue)) {
                        dataValue = base.Utils.toDate(dataValue);
                    }
                    if (base.Utils.isDate(dataValue)) {
                        var _value = this.exprContext.intlService.parseDate(value);
                        if (_value) {
                            return dataValue.getTime() - _value.getTime();
                        }
                    }
                    return NaN;
                }
                if (AppServiceHelpers.isBoolean(column)) {
                    var _value = base.Utils.isTrue(value) ? 1 : 0;
                    return (dataValue ? 1 : 0) - _value;
                }
                dataValue = dataValue || "";
                if (base.Utils.isString(dataValue)) {
                    dataValue = ExprParser.unescape(dataValue);
                    if (equality) {
                        var regExp = this.getWildcardRegExp(value);
                        if (regExp) {
                            return regExp.test(dataValue) ? 0 : -1;
                        }
                    }
                    return base.Utils.compare(dataValue, value);
                }
            }
            return NaN;
        };
        /**
         * Evaluate this expression using `data` to provide field values. Field values
         * can contain scopes (full stop separated components) to reference sub-objects
         * in the data
         *
         * @param data The field values to be used in the evaluation
         * @param defaultScope If a field value cannot be resolved then try to retrieve a value with this scope prepended to the field name
         * @return The boolean result of the expression evaluation
         */
        Expr.prototype.evaluate = function (data, defaultScope) {
            var e_21, _b;
            var ret;
            if (this.isLeaf) {
                if (!this.isStructured) {
                    ret = false;
                }
                else {
                    if (base.Utils.eqNC(this.field || "", "exists")) {
                        var dataValue = this.getDataValue(data, this.value, defaultScope);
                        ret = !base.Utils.isUndefined(dataValue);
                    }
                    else if (base.Utils.eqNC(this.field || "", "missing")) {
                        var dataValue = this.getDataValue(data, this.value, defaultScope);
                        ret = base.Utils.isUndefined(dataValue);
                    }
                    else {
                        var dataValue = this.getDataValue(data, this.field, defaultScope);
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
                                var regExp = new RegExp(this.value || "");
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
                try {
                    for (var _c = __values(this.operands), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var operand = _d.value;
                        var ret1 = operand.evaluate(data, defaultScope);
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
                catch (e_21_1) { e_21 = { error: e_21_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_21) throw e_21.error; }
                }
            }
            if (this.not) {
                ret = !ret;
            }
            return ret;
        };
        return Expr;
    }());
    /**
     * @ignore
     */
    var ExprParserOperator = /** @class */ (function () {
        function ExprParserOperator(tok, value, valuePos, valueLen) {
            if (value === void 0) { value = ""; }
            if (valuePos === void 0) { valuePos = -1; }
            if (valueLen === void 0) { valueLen = -1; }
            this.tok = tok;
            this.tokValue = value;
            this.tokValuePos = valuePos;
            this.tokValueLen = valueLen;
        }
        return ExprParserOperator;
    }());
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
    var ExprParser = /** @class */ (function () {
        function ExprParser(exprContext, options) {
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
        ExprParser.escape = function (value) {
            if (!value) {
                return "``";
            }
            value = String(value); // make sure we have a string
            if (value.search(/[\\`]/) === -1) {
                return "`" + value + "`";
            }
            var sb = ["`"];
            for (var i = 0, ic = value.length; i < ic; i++) {
                var ch = value[i];
                if (ch === "\\" || ch === "`") {
                    sb.push("\\");
                }
                sb.push(ch);
            }
            sb.push("`");
            return sb.join("");
        };
        ExprParser.isEscaped = function (value) {
            return !!value && value.length >= 2 && value[0] === "`" && value[value.length - 1] === "`";
        };
        /**
         * Perform the reverse operation to [ExprParser.escpae]{@link ExprParser#escape}
         */
        // remove surrounding ``
        // \\ => \
        // \` => `
        ExprParser.unescape = function (value) {
            if (!ExprParser.isEscaped(value)) {
                return value;
            }
            var sb = [];
            for (var i = 1, ic = value.length - 1; i < ic; i++) {
                var ch = value[i];
                if (ch === "\\") {
                    if (i >= ic - 1) { // we end with a \ => drop it
                        continue;
                    }
                    ch = value[++i];
                }
                sb.push(ch);
            }
            return sb.join("");
        };
        /**
         * @ignore
         */
        ExprParser.unescapeList = function (values) {
            if (!values) {
                return values;
            }
            var values1 = [];
            for (var _i = 0, _a = values; _i < _a.length; _i++) {
                var value = _a[_i];
                values1.push(ExprParser.unescape(value));
            }
            return values1;
        };
        /**
         * @ignore
         */
        ExprParser.valuesAndLocationsFromText = function (text, separator) {
            if (base.Utils.isEmpty(text)) {
                return [];
            }
            if (!text.includes(separator)) {
                return [{ value: text, start: 0, length: text.length }];
            }
            var values = [];
            var length = text.length;
            var current = 0;
            var currentStart = 0;
            var sb = [];
            var value;
            while (true) {
                if (current >= length) {
                    value = Expr.getValueAndLocation(sb.join(""));
                    value.start += currentStart;
                    if (!base.Utils.isEmpty(value.value)) {
                        values.push(value);
                    }
                    break;
                }
                var ch = text[current];
                if (ch === "\\") {
                    sb.push(ch);
                    current++;
                    if (current < length) {
                        var ch1 = text[current];
                        if (ch1 === "\\" || ch1 === "`") {
                            sb.push(ch1);
                            current++;
                        }
                    }
                }
                else if (ch === "`") {
                    var last = { value: 0 };
                    var s = ExprParser.matchUntil(text, length, current, current + 1, "`", last);
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
                    if (!base.Utils.isEmpty(value.value)) {
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
        };
        ExprParser.prototype.matchKeyword = function (keyword, sbCurrentValue, suffixCh) {
            if (sbCurrentValue.length !== 0) {
                var currentValue = sbCurrentValue.join("");
                if (!!currentValue && !" \r\n\t".includes(currentValue[currentValue.length - 1])) {
                    return false;
                }
            }
            if (base.Utils.isEmpty(keyword)) {
                return false;
            }
            var keywordLen = keyword.length;
            if (this.current + keywordLen > this.length) {
                return false;
            }
            for (var i = 0, ic = keywordLen; i < ic; i++) {
                var ch = this.text[this.current + i];
                var kh = keyword[i];
                if (ch !== kh) {
                    return false;
                }
            }
            if (this.current + keywordLen < this.length) {
                var nch = this.text[this.current + keywordLen];
                if (nch !== suffixCh && !" \r\n\t(".includes(nch)) {
                    return false;
                }
            }
            return true;
        };
        ExprParser.prototype.matchUntil = function (first, start, endChars, last) {
            return ExprParser.matchUntil(this.text, this.length, first, start, endChars, last);
        };
        ExprParser.matchUntil = function (text, length, first, start, endChars, last) {
            last.value = start;
            var found = false;
            var sb = [text.substr(first, start - first)];
            while (last.value < length) {
                var ch = text[last.value++];
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
        };
        ExprParser.prototype.matchSimpleValue = function (start) {
            var first = this.current;
            var last = start;
            while (last < this.length) {
                var ch = this.text[last];
                if (" \r\n\t)".includes(ch)) {
                    break;
                }
                last++;
            }
            if (last === start) {
                return "";
            }
            return this.text.substr(first, last - first);
        };
        ExprParser.prototype.getTerminators = function (ch, allowRanges) {
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
        };
        ExprParser.prototype.canBeTokValue = function (value, canBeEmpty) {
            if (canBeEmpty === void 0) { canBeEmpty = true; }
            return !base.Utils.isEmpty(value) || (canBeEmpty && this.options.allowEmptyValues && !base.Utils.isEmpty(this.field));
        };
        ExprParser.prototype._getTokValue = function (value, canBeEmpty) {
            if (canBeEmpty === void 0) { canBeEmpty = true; }
            // Current is pointing at the next non-whitepspace character after this value
            if (value === null)
                return false;
            var pos = this.current;
            var len = value.length;
            value = base.Utils.trimEnd(value);
            pos -= len - value.length;
            value = value.trim();
            if (this.canBeTokValue(value, canBeEmpty)) {
                this.op = new ExprParserOperator(8 /* value */, value, pos - value.length, value.length);
                return true;
            }
            return false;
        };
        ExprParser.prototype.getTokValue = function (sb, canBeEmpty) {
            if (canBeEmpty === void 0) { canBeEmpty = true; }
            if (!sb) {
                return false;
            }
            return this._getTokValue(sb.join(""), canBeEmpty);
        };
        ExprParser.prototype.ensureNearValue = function (value) {
            var defaultNearValue = this.exprContext.appService.ccquery ? this.exprContext.appService.ccquery.defaultNearValue : 0;
            var near = base.Utils.toInt(value, defaultNearValue);
            if (near < 0) {
                near = defaultNearValue;
            }
            return near.toString();
        };
        ExprParser.prototype.findDisplay = function (value) {
            if (!value || value.length < 3) {
                return -1;
            }
            if (value[value.length - 1] !== "`") {
                return -1;
            }
            var pos = value.length - 2;
            while (pos !== -1) {
                pos = value.lastIndexOf("`", pos);
                if (pos !== -1) {
                    var escapes = 0;
                    var pos1 = pos - 1;
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
        };
        ExprParser.prototype.isValidFieldName = function (name) {
            return this.options.allowScopedFields ? base.Utils.isValidScopedSimpleName(name) : base.Utils.isValidSimpleName(name);
        };
        ExprParser.prototype.isAllowedField = function (field, forcePartname, isPartname) {
            isPartname.value = false;
            if (base.Utils.eqNCN(field, "exists", "missing")) {
                return true;
            }
            if (base.Utils.eqNCN(field, "text", "concepts", "refine", "matchingpartnames")) {
                // NB @concepts, @refine and @matchingpartnames must be handled specially by the caller
                isPartname.value = true;
                return true;
            }
            var ccquery = this.exprContext.appService.ccquery;
            if (ccquery) {
                forcePartname = forcePartname && !this.exprContext.disallowFulltext;
                var column = forcePartname ? undefined : this.exprContext.appService.getColumn(field);
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
        };
        ExprParser.prototype.readToken = function () {
            if (this.saveOp !== ExprParserOperator.invalid) {
                this.prevOp = this.op;
                this.op = this.saveOp;
                this.saveOp = ExprParserOperator.invalid;
                return undefined;
            }
            var ch;
            this.prevOp = this.op;
            var nextValue;
            var sbCurrentValue = [];
            var candidateFieldPos = -1;
            var fieldSpecified = false;
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
                        var ch1 = this.text[this.current];
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
                        var last = { value: 0 };
                        nextValue = this.matchUntil(this.current + 1, this.current + 1, " \r\n\t`\"([/", last);
                        var near = -1;
                        if (nextValue !== undefined) {
                            nextValue = nextValue.substr(0, nextValue.length - 1);
                            near = base.Utils.toInt(nextValue, -1);
                        }
                        if (near < 0) {
                            return "bad operator";
                        }
                        this.current = last.value - 1;
                    }
                    nextValue = this.ensureNearValue(nextValue || "");
                    var infix = this.current >= this.length || this.text[this.current] !== "(";
                    // For infix, near value is the number of words between the two terms so add the 2 terms to
                    // the window (near/0 = adjacent terms)
                    this.op = infix ?
                        new ExprParserOperator(4 /* infixNear */, (base.Utils.toInt(nextValue) + 2).toString()) :
                        new ExprParserOperator(3 /* near */, nextValue);
                    return undefined;
                }
                else if (ch === "+" || ch === "-") {
                    if (this.current + 1 < this.length) {
                        var ch1 = this.text[this.current + 1];
                        var last = { value: 0 };
                        var length = void 0;
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
                    var last = { value: 0 };
                    nextValue = this.matchUntil(this.current, this.current + 1, this.getTerminators(ch, true), last);
                    if (!!nextValue) {
                        var forceRange = (fieldSpecified && "[{".includes(ch) && sbCurrentValue.length === 0);
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
                        var currentValue = sbCurrentValue.join("");
                        if (candidateFieldPos === -1) {
                            // Check for display
                            candidateFieldPos = this.findDisplay(currentValue);
                            if (candidateFieldPos === -1) {
                                this.op = ExprParserOperator.invalid;
                                return "invalid token";
                            }
                        }
                        var field = currentValue.substr(candidateFieldPos).trim();
                        var display = "";
                        // Extract display
                        var displayStart = this.findDisplay(field);
                        if (displayStart !== -1) {
                            display = ExprParser.unescape(field.substr(displayStart, field.length - displayStart));
                            field = field.substr(0, displayStart);
                        }
                        if (this.isValidFieldName(field) || (base.Utils.isEmpty(field) && !base.Utils.isEmpty(display))) {
                            var value = currentValue.substr(0, candidateFieldPos);
                            if (this.canBeTokValue(value.trim())) {
                                this.current -= (sbCurrentValue.join("").length - candidateFieldPos); // back up to field
                                this._getTokValue(value);
                                return undefined;
                            }
                            if (!base.Utils.isEmpty(field)) {
                                var forcePartname = false;
                                if (this.current + 1 < this.length && this.text[this.current + 1] === ":") {
                                    // :: => force partname over column
                                    forcePartname = true;
                                    this.current++;
                                }
                                var isPartname = { value: false };
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
                            if (!base.Utils.isEmpty(field)) {
                                this.field = field;
                                fieldSpecified = true;
                            }
                            if (!base.Utils.isEmpty(display)) {
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
        };
        ExprParser.prototype.clear = function () {
            this.text = "";
            this.current = 0;
            this.length = 0;
            this.operators.length = 0;
            this.expressions.length = 0;
            this.fields.length = 0;
            this.displays.length = 0;
        };
        /**
         * Parse some text using the Sinequa fielded search syntax
         *
         * @return The parsed `Expr` or an error string
         */
        ExprParser.parse = function (text, context, options) {
            var parser = new ExprParser(context, options);
            var error = parser.parse(text);
            if (error) {
                return error;
            }
            return parser.parseResult();
        };
        ExprParser.prototype.parseResult = function () {
            if (this.expressions.length !== 1) {
                return "no expression found";
            }
            return this.expressions[0];
        };
        Object.defineProperty(ExprParser.prototype, "contextField", {
            get: function () {
                var field = this.field;
                if (base.Utils.isEmpty(field)) {
                    field = this.peekField();
                }
                return field;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ExprParser.prototype, "contextDisplay", {
            get: function () {
                var display = this.display;
                if (base.Utils.isEmpty(display)) {
                    display = this.peekDisplay();
                }
                return display;
            },
            enumerable: false,
            configurable: true
        });
        ExprParser.prototype.parse = function (text) {
            this.clear();
            if (this.options.allowEmptyValues && !base.Utils.len(text.trim())) {
                var expr = Expr.makeExpr(this.exprContext, "", this.contextField, this.contextDisplay, this.options.allowEmptyValues);
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
            var err = this.readToken();
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
                var a = void 0;
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
        };
        ExprParser.prototype.shift = function () {
            var _this = this;
            if (this.op.tok === 8 /* value */) {
                var value = this.op.tokValue.trim();
                if (base.Utils.isEmpty(value) && !this.options.allowEmptyValues) {
                    return "empty token";
                }
                var expr = Expr.makeExpr(this.exprContext, value, this.contextField, this.contextDisplay, !!this.options.allowEmptyValues);
                if (!expr) {
                    return "invalid expression";
                }
                expr.start = this.op.tokValuePos;
                expr.length = this.op.tokValueLen;
                if (!!expr.operands) {
                    expr.operands.forEach(function (operand) {
                        operand.start = _this.op.tokValuePos;
                        operand.length = _this.op.tokValueLen;
                    });
                }
                this.expressions.push(expr);
                this.field = "";
                this.display = "";
            }
            else {
                this.operators.push(this.op);
                if (this.op.tok === 5 /* lPar */) {
                    if (base.Utils.isEmpty(this.field)) {
                        this.fields.push(this.peekField());
                    }
                    else {
                        this.fields.push(this.field);
                    }
                    this.field = "";
                    if (base.Utils.isEmpty(this.display)) {
                        this.displays.push(this.peekDisplay());
                    }
                    else {
                        this.displays.push(this.display);
                    }
                    this.display = "";
                }
            }
            return this.readToken();
        };
        ExprParser.prototype.peekField = function () {
            if (this.fields.length === 0) {
                return "";
            }
            return this.fields[this.fields.length - 1];
        };
        ExprParser.prototype.peekDisplay = function () {
            if (this.displays.length === 0) {
                return "";
            }
            return this.displays[this.displays.length - 1];
        };
        ExprParser.prototype.canBeMergeTarget = function (e, and) {
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
        };
        ExprParser.prototype.mergeExpr = function (e1, e2, and) {
            var e_22, _b;
            var source, target;
            var prepend = false;
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
                    and: and,
                    op2: e2,
                    field: this.peekField(),
                    display: this.peekDisplay()
                });
            }
            if (source.isLeaf || source.and !== and || source.not || !base.Utils.eq(source.display || "", target.display || "")) {
                target.addOperand(source, this.peekField(), prepend);
            }
            else {
                if (source.operands) {
                    try {
                        for (var _c = __values(source.operands), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var operand = _d.value;
                            target.addOperand(operand, this.peekField(), prepend);
                        }
                    }
                    catch (e_22_1) { e_22 = { error: e_22_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_22) throw e_22.error; }
                    }
                }
            }
            return target;
        };
        ExprParser.prototype.reduce = function () {
            var e;
            var e1;
            var e2;
            var op = this.operators[this.operators.length - 1];
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
                    e.near = base.Utils.toInt(this.ensureNearValue(op.tokValue));
                    this.expressions.push(e);
                    break;
                case 4 /* infixNear */:
                    e2 = this.expressions.pop();
                    e1 = this.expressions.pop();
                    if (!e1 || !e2) {
                        return "syntax error";
                    }
                    if (!e2.isLeaf || e2.isStructured || !e1.isLeaf || e1.isStructured || e2.not || e1.not || !base.Utils.eqNC(e2.field || "", e1.field || "")) {
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
                    e.near = base.Utils.toInt(this.ensureNearValue(op.tokValue));
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
                    var field = this.fields.pop();
                    var display = this.displays.pop();
                    // Set Field for single term bracketed expressions
                    e = this.expressions[this.expressions.length - 1];
                    if (e.isLeaf) {
                        if (base.Utils.isEmpty(e.field)) {
                            e.field = field;
                        }
                        if (base.Utils.isEmpty(e.display)) {
                            e.display = display;
                        }
                    }
                    break;
            }
            this.operators.pop();
            return undefined;
        };
        return ExprParser;
    }());
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

    var ExprBuilder = /** @class */ (function () {
        function ExprBuilder() {
        }
        /**
         * Make a standard selection expression
         * (resulting in a SQL clause like "company contains 'BOEING'")
         * @param field Name of the field to select (eg. "company")
         * @param value Value of the field to select (eg. "BOEING")
         * @param display Optional string to display that value (eg. "Boeing")
         */
        ExprBuilder.prototype.makeExpr = function (field, value, display) {
            field = this.formatField(field, display);
            return field + ": " + ExprParser.escape(value); // company`Boeing`: BOEING
        };
        /**
         * Make a boolean expression
         * @param field Name of the field to select (eg. "toto")
         * @param value Value of the field to select (eg. "true")
         * @param display Optional string to display that value (eg. "True")
         */
        ExprBuilder.prototype.makeBooleanExpr = function (field, value, display) {
            field = this.formatField(field, display);
            return field + ": " + ExprParser.escape(base.Utils.toSqlValue(value)); // toto`True`: true
        };
        /**
         * Make a numerical expression using a comparison operator (>, <, <=, >=, etc.)
         * @param field Name of the field to select (eg. "modified")
         * @param operator Comparison operator used for that selection (eg. ">")
         * @param value Value of the field to select (eg. "2020-12-15")
         * @param display Optional string to display that value (eg. "After Dec 15 2020")
         */
        ExprBuilder.prototype.makeNumericalExpr = function (field, operator, value, display) {
            field = this.formatField(field, display);
            if (base.Utils.isString(value)) {
                value = ExprParser.escape(value);
            }
            if (base.Utils.isDate(value) || base.Utils.isNumber(value)) {
                value = base.Utils.toSqlValue(value);
            }
            return field + ":" + operator + " " + value; // modified`After Dec 15 2020`:> 2020-12-15
        };
        /**
         * Make a list expression
         * @param field Name of the field to select (eg. "docformat")
         * @param values Values of the field to select (eg. ['htm','pdf'])
         * @param display Optional string to display that value (eg. "htm, pdf")
         */
        ExprBuilder.prototype.makeListExpr = function (field, values, display) {
            field = this.formatField(field, display);
            return field + ": [" + values.map(function (v) { return ExprParser.escape(v); }).join(',') + "]"; // docformat`htm, pdf`:[`htm`,`pdf`]
        };
        /**
         * Make a range expression
         * @param field Name of the field to select (eg. "modified")
         * @param from Begining of the range (eg. 2020-12-15)
         * @param to End of the range (eg. 2020-12-20)
         * @param display Optional string to display that value (eg. "[Dec 15 2020, Dec 20 2020]")
         */
        ExprBuilder.prototype.makeRangeExpr = function (field, from, to, display) {
            field = this.formatField(field, display);
            return field + ": [" + base.Utils.toSqlValue(from) + ".." + base.Utils.toSqlValue(to) + "]"; // modified`[Dec 15 2020, Dec 20 2020]`: [2020-12-15..2020-12-20]
        };
        /**
         * Make a RegExp expression
         * @param field Name of the field to select (eg. "company")
         * @param value Value of the regular expression to match (eg. "BOE.*")
         * @param display Optional string to display that value (eg. "Boe...")
         */
        ExprBuilder.prototype.makeRegexpExpr = function (field, value, display) {
            field = this.formatField(field, display);
            return field + ":~ " + ExprParser.escape(value); // company`Boe...`:~ BOE.*
        };
        /**
         * Make a refine expression
         * @param text The text to add to the query
         */
        ExprBuilder.prototype.makeRefineExpr = function (text) {
            return "refine: " + ExprParser.escape(text);
        };
        /**
         * Return an expression that selects multiple values for a field
         * (All values are ANDed)
         * @param field Name of the field to select (eg. "company")
         * @param values Values of the field to select (eg. ['IBM','APPLE'])
         * @param display Optional string to display that value (eg. "IBM and Apple")
         */
        ExprBuilder.prototype.makeAndExpr = function (field, values, display) {
            field = this.formatField(field, display);
            return field + ": (" + this.concatWithOperator(values, 'AND') + ")"; // company: (IBM AND APPLE AND GOOGLE)
        };
        /**
         * Return an expression that selects multiple values for a field
         * (All values are ORed)
         * This function should be equivalent to using makeListExpr
         * @param field Name of the field to select (eg. "company")
         * @param values Values of the field to select (eg. ['IBM','APPLE'])
         * @param display Optional string to display that value (eg. "IBM and Apple")
         */
        ExprBuilder.prototype.makeOrExpr = function (field, values, display) {
            field = this.formatField(field, display);
            return field + ": (" + this.concatWithOperator(values, 'OR') + ")"; // company: (IBM OR APPLE OR GOOGLE)
        };
        /**
         * Combine a list of values with AND or OR operators
         * @param values the list of values
         * @param operator the operator
         */
        ExprBuilder.prototype.concatWithOperator = function (values, operator) {
            return values.map(function (v) {
                if (base.Utils.isString(v)) {
                    return ExprParser.escape(v);
                }
                if (v.display) {
                    return ExprParser.escape(v.display) + ":" + ExprParser.escape(base.Utils.toSqlValue(v.value));
                }
                return ExprParser.escape(base.Utils.toSqlValue(v.value));
            }).join(' ' + operator + ' ');
        };
        /**
         * Returns the negative expression of the given expression
         * eg. NOT(person:Bill GATES)
         * @param expr
         */
        ExprBuilder.prototype.makeNotExpr = function (expr) {
            return "NOT (" + expr + ")";
        };
        /**
         * Returns an expression that is the union of given expressions
         * eg. person:Bill GATES OR company:MICROSOFT
         * @param exprs
         */
        ExprBuilder.prototype.concatOrExpr = function (exprs) {
            if (exprs.length <= 1) {
                return exprs[0] || '';
            }
            return "(" + exprs.join(') OR (') + ")";
        };
        /**
         * Returns an expression that is the intersection of given expressions
         * eg. person:Bill GATES AND company:MICROSOFT
         * @param exprs
         */
        ExprBuilder.prototype.concatAndExpr = function (exprs) {
            if (exprs.length <= 1) {
                return exprs[0] || '';
            }
            return "(" + exprs.join(') AND (') + ")";
        };
        /**
         * Returns an expression to select the given item
         * @param field Name of the field to select (eg. "company")
         * @param items A single or list of ValueItem object(s) (eg. content of a record)
         */
        ExprBuilder.prototype.makeFieldExpr = function (field, items, combineWithAnd) {
            if (!base.Utils.isArray(items)) {
                items = [items];
            }
            if (items.length === 0) {
                return ""; // Return a falsy string instead of "()" or "``" which would be truthy
            }
            return combineWithAnd ? this.makeAndExpr(field, items) : this.makeOrExpr(field, items);
        };
        /**
         * Create an expression for the given aggregation item
         * @param aggregation The aggregation containing this object
         * @param items The AggregationItem(s) to select
         * @param combineWithAnd If there are multiple values, combine them with AND (instead of OR)
         */
        ExprBuilder.prototype.makeAggregationExpr = function (aggregation, items, combineWithAnd) {
            if (!base.Utils.isArray(items)) {
                items = [items];
            }
            if (aggregation.valuesAreExpressions) {
                var exprs = items.map(function (i) { return i.value.toString(); }); // .toString() is to avoid typing issues. With valuesAreExpressions = true, item.value is expected to be a string
                return combineWithAnd ? this.concatAndExpr(exprs) : this.concatOrExpr(exprs);
            }
            else {
                var _items = this.asValueItems(items, aggregation.isTree);
                return this.makeFieldExpr(aggregation.column, _items, combineWithAnd);
            }
        };
        /**
         * Combines the field with the optional display value(s)
         * @param field
         * @param display
         */
        ExprBuilder.prototype.formatField = function (field, display) {
            if (display) {
                field = "" + field + ExprParser.escape(display);
            }
            return field;
        };
        /**
         * Return the AggregationItem list as a ValueItem list
         * @param items
         * @param isTree
         */
        ExprBuilder.prototype.asValueItems = function (items, isTree) {
            if (isTree) {
                return items.map(function (i) {
                    return {
                        value: i.$path + "*",
                        display: i.display || i.value
                    };
                });
            }
            return items; // This works because ValueItem and AggregationItem share the value and display properties
        };
        return ExprBuilder;
    }());
    ExprBuilder.ɵfac = function ExprBuilder_Factory(t) { return new (t || ExprBuilder)(); };
    ExprBuilder.ɵprov = i0.ɵɵdefineInjectable({ token: ExprBuilder, factory: ExprBuilder.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ExprBuilder, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], null, null);
    })();

    var advancedFacetPrefix = "advanced_";
    /**
     * Represents a query for retrieving search results from a Sinequa search engine.
     *
     * The properties are described in the {@link IQuery} interface
     */
    var Query = /** @class */ (function () {
        function Query(name) {
            this.name = name;
        }
        /**
         * Return a copy of the passed query
         */
        Query.copy = function (query) {
            if (!query) {
                return query;
            }
            return query.copy();
        };
        Object.defineProperty(Query.prototype, "hasRelevance", {
            /**
             * Return `true` if the query has fulltext search elements
             */
            get: function () {
                if (!base.Utils.isEmpty(this.text)) {
                    return true;
                }
                if (this.findSelect("refine")) {
                    return true;
                }
                return false;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Add a select filter to the query
         *
         * @param expr The fielded search expression to filter the results
         * @param facet The name of the associated facet
         */
        Query.prototype.addSelect = function (expr, facet) {
            return this.pushSelect({
                expression: expr,
                facet: facet || ""
            });
        };
        /**
         * Adds a new `Select` object to the end of the query's `selects`
         */
        Query.prototype.pushSelect = function (select) {
            if (!this.select) {
                this.select = [];
            }
            return this.select.push(select);
        };
        /**
         * Remove the last `Select` object from the `selects` and return it
         */
        Query.prototype.popSelect = function () {
            if (!this.select) {
                return undefined;
            }
            return this.select.pop();
        };
        /**
         * Remove the `Select` object identified by `indexOrFacet`
         *
         * @param indexOrFacet either an index in the `selects` array or a facet name
         * @param all If `true` and `indexOrFacet` is a facet name then all `Select` objects with a matching facet name will be removed
         */
        Query.prototype.removeSelect = function (indexOrFacet, all) {
            if (all === void 0) { all = false; }
            if (!this.select) {
                return;
            }
            if (base.Utils.isString(indexOrFacet)) {
                // indexOrFacet is a facet name
                for (var i = this.select.length - 1; i >= 0; i--) {
                    var _select = this.select[i];
                    if (base.Utils.eqNC(_select.facet, indexOrFacet)) {
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
        };
        /**
         * Replace a `Select` with another
         *
         * @param index The index in the `selects` array of the `Select to replace
         * @param select The `Select` to use as a replacement
         */
        Query.prototype.replaceSelect = function (index, select) {
            if (!this.select) {
                return;
            }
            this.select.splice(index, 1, select);
        };
        /**
         * Find the index of the nth `Select` object matching the passed facet name
         *
         * @param facet A facet name
         * @param ordinal Specifies which `Select` object to retrieve among selects with the same facet name
         */
        Query.prototype.findSelectIndex = function (facet, ordinal) {
            var e_1, _b;
            if (ordinal === void 0) { ordinal = 0; }
            if (!this.select) {
                return -1;
            }
            var index = 0;
            var facetOrdinal = 0;
            var facetIndex = -1;
            try {
                for (var _c = __values(this.select), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var select = _d.value;
                    if (base.Utils.eqNC(facet, select.facet)) {
                        facetIndex = index;
                        if (facetOrdinal === ordinal) {
                            break;
                        }
                        facetOrdinal++;
                    }
                    index++;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return facetIndex;
        };
        /**
         * Find the first `Select` matching the passed facet name
         *
         * @param facet A facet name
         * @param fromEnd If `true` start searching backwards from the last `Select`
         */
        Query.prototype.findSelect = function (facet, fromEnd) {
            if (fromEnd === void 0) { fromEnd = true; }
            var facetSelectIndex = this.findSelectIndex(facet, fromEnd ? -1 : 0);
            return facetSelectIndex >= 0 ? this.select && this.select[facetSelectIndex] : undefined;
        };
        /**
         * Return the last `Select` object
         */
        Query.prototype.lastSelect = function () {
            if (!this.select) {
                return undefined;
            }
            return this.select[this.select.length - 1];
        };
        Object.defineProperty(Query.prototype, "selectLength", {
            /**
             * Return the number of `Select` objects
             */
            get: function () {
                if (!this.select) {
                    return 0;
                }
                return this.select.length;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Add an `Open` filter to the query. This is typically used to load children of tree nodes
         *
         * @param expr The fielded search expression specifying the node to expand
         * @param aggregation The associated aggregation
         */
        Query.prototype.addOpen = function (expr, aggregation) {
            if (!this.open || !base.Utils.isArray(this.open)) {
                this.open = [];
            }
            return this.open.push({
                expression: expr,
                aggregation: aggregation
            });
        };
        /**
         * Clear all fields in the query except the name
         */
        Query.prototype.clear = function () {
            var name = this.name;
            base.Utils.clearObject(this);
            this.name = name;
        };
        /**
         * Remove advanced search select(s) from the query
         */
        Query.prototype.toStandard = function () {
            var _this = this;
            var _a;
            var advancedSelect = (_a = this.select) === null || _a === void 0 ? void 0 : _a.filter(function (select) { return select.facet && select.facet.startsWith(advancedFacetPrefix); });
            advancedSelect === null || advancedSelect === void 0 ? void 0 : advancedSelect.forEach(function (select) { return _this.removeSelect(select.facet, true); });
            return this;
        };
        /**
         * Return a copy of this query
         */
        Query.prototype.copy = function () {
            var query = new Query(this.name);
            base.Utils.copy(this, query);
            return query;
        };
        /**
         * Return a copy of this query but without any advanced select
         */
        Query.prototype.copyStandard = function () {
            var query = this.copy();
            return query.toStandard();
        };
        /**
         * Remove all properties from the query except advanced search select(s) and optionally `text`
         *
         * @param withText If `true` do not remove the `text` field
         */
        Query.prototype.toAdvanced = function (withText) {
            var _this = this;
            if (withText === void 0) { withText = false; }
            var _a;
            for (var property in this) {
                if (this.hasOwnProperty(property) && !base.Utils.eqNC(property, "select") && (!withText || !base.Utils.eqNC(property, "text"))) {
                    delete this[property];
                }
            }
            var notAdvancedSelect = (_a = this.select) === null || _a === void 0 ? void 0 : _a.filter(function (select) { return select.facet && !select.facet.startsWith(advancedFacetPrefix); });
            notAdvancedSelect === null || notAdvancedSelect === void 0 ? void 0 : notAdvancedSelect.forEach(function (select) { return _this.removeSelect(select.facet); });
            return this;
        };
        /**
         * Return a copy of this query including just the advanced fields and optionally `text`
         *
         * @param withText If `true` include the `text` field
         */
        Query.prototype.copyAdvanced = function (withText) {
            if (withText === void 0) { withText = false; }
            var query = this.copy();
            return query.toAdvanced(withText);
        };
        /**
         * Tests whether this query has advanced search selections
         */
        Query.prototype.hasAdvanced = function () {
            var _a;
            return !!((_a = this.select) === null || _a === void 0 ? void 0 : _a.find(function (s) { return s.facet && s.facet.startsWith(advancedFacetPrefix); }));
        };
        /**
         * Initialize this query from the passed JSON string
         *
         * @param jquery JSON in string form
         */
        Query.prototype.fromJson = function (jquery) {
            this.clear();
            var query = base.Utils.fromJson(jquery);
            // convert select and open
            var select = query.select;
            if (base.Utils.isArray(select)) {
                query.select = select.map(function (value) {
                    if (base.Utils.isArray(value)) {
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
            var open = query.open;
            if (base.Utils.isArray(open)) {
                query.open = open.map(function (value) {
                    if (base.Utils.isArray(value)) {
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
            base.Utils.extend(this, query);
            return this;
        };
        /**
         * Returns a JSON representation of this query where `Select` and `Open` objects are expressed as tuple arrays for conciseness
         */
        Query.prototype.toJsonForQueryString = function () {
            var o = {};
            base.Utils.merge(o, this);
            if (this.select) {
                o.select = this.select.map(function (value) {
                    var a = [value.expression];
                    if (value.facet) {
                        a.push(value.facet);
                    }
                    return a;
                });
            }
            if (this.open) {
                o.open = this.open.map(function (value) { return [value.expression, value.aggregation]; });
            }
            return base.Utils.toJson(o);
        };
        /**
         * Return a hash value of this query that excludes any pagination parameters
         */
        Query.prototype.hash = function () {
            var obj = {};
            base.Utils.mergeAndSort(obj, this);
            // remove pagination
            delete obj.page;
            delete obj.pageSize;
            var str = base.Utils.toJson(obj);
            return base.Utils.sha512(str);
        };
        return Query;
    }());

    /**
     * This service provides methods for locale-sensitive formatting and parsing of values that can be found in
     * Sinequa search results.
     */
    var FormatService = /** @class */ (function () {
        function FormatService(intlService) {
            var _this = this;
            this.intlService = intlService;
            /** D3 formatter for large number: 42096 => 42K */
            this.bigNumberFormatter = d3Format.format("~s");
            /** Similar to bigNumberFormatter, but replaces "G" by "B" (as in "$42B") */
            this.moneyFormatter = function (s) { return _this.bigNumberFormatter(s).replace(/G/, "B"); };
        }
        /**
         * Returns `true` if the passed parameter is a `ValueItem` object
         */
        FormatService.prototype.isValueItem = function (valueItem) {
            if (base.Utils.isObject(valueItem) && !base.Utils.isDate(valueItem) && !base.Utils.isArray(valueItem)) {
                return true;
            }
            return false;
        };
        /**
         * Extracts the value and display components from a parameter that can be either a `ValueItem`
         * object or a simple `FieldValue`, in which case the display will be `undefined`.
         */
        FormatService.prototype.getValueAndDisplay = function (valueItem) {
            var value;
            var display;
            if (this.isValueItem(valueItem)) {
                value = valueItem.value;
                display = valueItem.display || "";
            }
            else {
                value = valueItem;
                display = "";
            }
            return [value, display];
        };
        /**
         * Return the display equivalent of a Sinequa language specifier (`en`, `fr`, ...).
         * The display values are defined in the {@link IntlModule} message files
         *
         * @param value A value containing a Sinequa language specifier
         */
        FormatService.prototype.formatLanguage = function (value) {
            return this.intlService.formatMessage("msg#language." + base.Utils.toLowerCase(value + ""));
        };
        /**
         * Return the display equivalent of a size value. The units (`kb`, `mb`, ...) are defined
         * in the {@link IntlModule} message files
         *
         * @param size A memory size in bytes
         */
        FormatService.prototype.formatMemorySize = function (size) {
            var kiloBytes = size / 1024;
            var megaBytes = kiloBytes / 1024;
            var gigaBytes = megaBytes / 1024;
            var teraBytes = gigaBytes / 1024;
            var petaBytes = teraBytes / 1024;
            var messageKey = "msg#system.memorySize.bytes";
            var params = { value: size };
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
        };
        /**
         * Format an amount of money (typically extracted by a Sinequa Text-mining agent)
         * USD 42069 => USD 42K
         * @param value
         * @returns
         */
        FormatService.prototype.formatMoney = function (value) {
            var _a = __read(value.split(" "), 2), currency = _a[0], val = _a[1];
            return currency + " " + this.moneyFormatter(+val);
        };
        /**
         * Format a value for display according to the passed `column`. Formatters
         * can be defined in the column's configuration to provide domain-specific
         * formatting. The standard formatters are `language` and `memorysize`.
         *
         * @param valueItem The value to format
         * @param column The column associated with the value
         */
        FormatService.prototype.formatValue = function (valueItem, column) {
            var _this = this;
            var _a = __read(this.getValueAndDisplay(valueItem), 2), value = _a[0], display = _a[1];
            if (column && column.formatter) {
                switch (base.Utils.toLowerCase(column.formatter)) {
                    case "language": return this.formatLanguage(value);
                    case "memorysize":
                        if (base.Utils.isNumber(value)) {
                            return this.formatMemorySize(value);
                        }
                        break;
                    case "money":
                        if (base.Utils.isString(value)) {
                            return this.formatMoney(value);
                        }
                        else if (base.Utils.isArray(value)) {
                            return value.map(function (v) { return _this.formatMoney(base.Utils.isString(v) ? v : v.value); }).join(', ');
                        }
                        break;
                }
            }
            if (display) {
                if (base.Utils.isDate(display)) { // ES-7785
                    display = base.Utils.toSysDateStr(display);
                }
                return this.intlService.formatMessage(display, { value: value });
            }
            if (base.Utils.isNumber(value)) {
                var message = this.intlService.getMessage("msg#system.number");
                if (message) {
                    return this.intlService.formatText(message, { value: value });
                }
                else {
                    return this.intlService.formatNumber(value);
                }
            }
            if (column && AppServiceHelpers.isDate(column) && base.Utils.isString(value)) {
                value = base.Utils.fromSysDateStr(value) || value;
            }
            if (base.Utils.isDate(value)) {
                if (column && !AppServiceHelpers.isDate(column)) { // ES-7785
                    value = base.Utils.toSysDateStr(value);
                }
                else {
                    var message = this.intlService.getMessage("msg#system.date");
                    if (message) {
                        return this.intlService.formatText(message, { date: value, time: base.Utils.getTime(value) });
                    }
                    else {
                        var s = this.intlService.formatDate(value);
                        if (base.Utils.getTime(value) !== 0) {
                            s += ", " + this.intlService.formatTime(value);
                        }
                        return s;
                    }
                }
            }
            if (base.Utils.isBoolean(value)) {
                var message = this.intlService.getMessage("msg#system.boolean");
                if (message) {
                    return this.intlService.formatText(message, { value: value });
                }
                else {
                    return value.toString();
                }
            }
            if (base.Utils.isArray(value)) {
                var joinValue_1 = [];
                value.forEach(function (v) {
                    if (joinValue_1.length > 0) {
                        joinValue_1.push(";");
                    }
                    var _v;
                    if (!v) {
                        _v = "<null>";
                    }
                    else if (base.Utils.isDate(v)) {
                        _v = base.Utils.toSysDateStr(v);
                    }
                    else if (base.Utils.isString(v)) {
                        _v = v;
                    }
                    else {
                        _v = v.display || v.value || "<null>";
                    }
                    joinValue_1.push(_v);
                });
                value = joinValue_1.join("");
            }
            if (!value) {
                return value;
            }
            return this.intlService.formatMessage(value);
        };
        /**
         * Transform a display value. Multiple transformers can be defined on a column and their calls are chained.
         * The standard formatters are `uppercase`, `upperfirst`, `lowercase`, `lowerfirst`, `startcase`, `kebabcase`,
         * `snakecase` and `camelcase`.
         *
         * @param value The value to transform
         * @param column The column associated with the value
         */
        FormatService.prototype.transformValue = function (value, column) {
            var e_1, _a;
            var transforms = column ? base.Utils.split(column.transforms || "", ",") : undefined;
            if (!transforms || transforms.length === 0) {
                return value;
            }
            try {
                // transforms are composable
                for (var transforms_1 = __values(transforms), transforms_1_1 = transforms_1.next(); !transforms_1_1.done; transforms_1_1 = transforms_1.next()) {
                    var transform = transforms_1_1.value;
                    switch (base.Utils.toLowerCase(transform)) {
                        case "uppercase":
                            value = base.Utils.toUpperCase(value);
                            break;
                        case "upperfirst":
                            value = base.Utils.toUpperFirst(value);
                            break;
                        case "lowercase":
                            value = base.Utils.toLowerCase(value);
                            break;
                        case "lowerfirst":
                            value = base.Utils.toLowerFirst(value);
                            break;
                        case "startcase":
                            value = base.Utils.toStartCase(value);
                            break;
                        case "kebabcase":
                            value = base.Utils.toKebabCase(value);
                            break;
                        case "snakecase":
                            value = base.Utils.toSnakeCase(value);
                            break;
                        case "camelcase":
                            value = base.Utils.toCamelCase(value);
                            break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (transforms_1_1 && !transforms_1_1.done && (_a = transforms_1.return)) _a.call(transforms_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return value;
        };
        /**
         * Format a value item for display. This is the standard entry point for formatting a value.
         * By default, this method calls [formatValue]{@link #formatValue} and [transformValue]{@link #transformValue}.
         *
         * @param valueItem The value item to format
         * @param column The column associated with the value item
         */
        FormatService.prototype.formatFieldValue = function (valueItem, column) {
            var formattedValue = this.formatValue(valueItem, column);
            formattedValue = this.transformValue(formattedValue, column);
            return formattedValue;
        };
        /**
         * Parse an input value according to the passed `parser`. The standard parser is `memorysize`. Parsers
         * are configured in the {@link CCColumn} configuration. The parsed value is returned as a string for
         * processing by the {@link ValidationModule}
         *
         * @param value The value to parse
         * @param parser The parser to use
         */
        FormatService.prototype.parseValue = function (value, parser) {
            if (base.Utils.isString(value)) {
                if (parser) {
                    switch (base.Utils.toLowerCase(parser)) {
                        case "memorysize": {
                            return this.parseMemorySize(value) + "";
                        }
                    }
                }
            }
            return value;
        };
        /**
         * Parse a size string using [Utils.toSize]{@link Utils#toSize}
         *
         * @param str The string to parse
         * @param _default The default value to return if the string cannot be parsed
         * @return The parsed size in bytes
         */
        FormatService.prototype.parseMemorySize = function (str, _default) {
            if (_default === void 0) { _default = 0; }
            return base.Utils.toSize(str, _default);
        };
        /**
         * Display a raw value without applying any formatting
         * (besides the native toString() method for non-string values)
         * @param value
         * @returns
         */
        FormatService.prototype.formatRaw = function (value) {
            var _a = __read(this.getValueAndDisplay(value), 1), val = _a[0];
            if (base.Utils.isArray(val)) {
                return val.map(function (v) { return base.Utils.isString(v) ? v : v.value; }).join(';');
            }
            return val === null || val === void 0 ? void 0 : val.toString();
        };
        return FormatService;
    }());
    FormatService.ɵfac = function FormatService_Factory(t) { return new (t || FormatService)(i0.ɵɵinject(i1.IntlService)); };
    FormatService.ɵprov = i0.ɵɵdefineInjectable({ token: FormatService, factory: FormatService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(FormatService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () { return [{ type: i1.IntlService }]; }, null);
    })();

    /**
     * A service to manage the Sinequa SBA configuration
     */
    var AppService = /** @class */ (function () {
        function AppService(startConfig, appWebService, intlService, formatService) {
            this.startConfig = startConfig;
            this.appWebService = appWebService;
            this.intlService = intlService;
            this.formatService = formatService;
            this._events = new rxjs.Subject();
            if (!this.appName) {
                console.error("Missing app name!");
            }
        }
        AppService.toEngineType = function (type) {
            if (!type) {
                return 0 /* none */;
            }
            switch (base.Utils.toLowerCase(type)) {
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
        };
        AppService.toEngineTypeModifierSimple = function (c) {
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
        };
        AppService.toEngineTypeModifier = function (eType, typeModifier) {
            var e_1, _a;
            var etm = 0 /* none */;
            if (typeModifier) {
                try {
                    for (var typeModifier_1 = __values(typeModifier), typeModifier_1_1 = typeModifier_1.next(); !typeModifier_1_1.done; typeModifier_1_1 = typeModifier_1.next()) {
                        var c = typeModifier_1_1.value;
                        etm |= AppService.toEngineTypeModifierSimple(c);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (typeModifier_1_1 && !typeModifier_1_1.done && (_a = typeModifier_1.return)) _a.call(typeModifier_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return etm;
        };
        AppService.makeColumn = function (name, type, typeModifier, aliases) {
            var eType = AppService.toEngineType(type);
            var eTypeModifier = AppService.toEngineTypeModifier(eType, typeModifier || "");
            return {
                name: name,
                type: type,
                typeModifier: typeModifier,
                eType: eType,
                eTypeModifier: eTypeModifier,
                aliases: aliases
            };
        };
        /**
         * Return `true` if a `column` is a string
         */
        AppService.isString = function (column) {
            return AppServiceHelpers.isString(column);
        };
        /**
         * Return `true` if a `column` is a csv
         */
        AppService.isCsv = function (column) {
            return AppServiceHelpers.isCsv(column);
        };
        /**
         * Return `true` if a `column` is a tree
         */
        AppService.isTree = function (column) {
            return AppServiceHelpers.isTree(column);
        };
        /**
         * Return `true` if a `column` is an entity
         */
        AppService.isEntity = function (column) {
            return AppServiceHelpers.isEntity(column);
        };
        /**
         * Return `true` if a `column` is a boolean
         */
        AppService.isBoolean = function (column) {
            return AppServiceHelpers.isBoolean(column);
        };
        /**
         * Return `true` if a `column` is a date
         */
        AppService.isDate = function (column) {
            return AppServiceHelpers.isDate(column);
        };
        /**
         * Return `true` if a `column` is a double
         */
        AppService.isDouble = function (column) {
            return AppServiceHelpers.isDouble(column);
        };
        /**
         * Return `true` if a `column` is an integer
         */
        AppService.isInteger = function (column) {
            return AppServiceHelpers.isInteger(column);
        };
        /**
         * Return `true` if a `column` is a number (integer or double)
         */
        AppService.isNumber = function (column) {
            return AppServiceHelpers.isNumber(column);
        };
        /**
         * Return `true` if a `column` is a scalar
         */
        AppService.isScalar = function (column) {
            return AppServiceHelpers.isScalar(column);
        };
        /**
         * Return `true` if a `column` is sortable
         */
        AppService.isSortable = function (column) {
            return AppServiceHelpers.isSortable(column);
        };
        AppService.prototype.ngOnDestroy = function () {
            this._events.complete();
        };
        Object.defineProperty(AppService.prototype, "events", {
            /**
             * Return an `Observable` stream of the events that the `AppService` can generate
             */
            get: function () {
                return this._events;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppService.prototype, "appName", {
            /**
             * Return the name of the SBA
             */
            get: function () {
                return this.startConfig.app;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppService.prototype, "origin", {
            /**
             * Return the origin of the Sinequa server
             */
            get: function () {
                return this.startConfig.origin;
            },
            enumerable: false,
            configurable: true
        });
        AppService.prototype.initDefaultQuery = function () {
            if (!this.app) {
                console.warn("No app configured");
                return;
            }
            // If not set explicitly, the default query is the first in the list
            var defaultQueryName = this.app.defaultQueryName || base.Utils.split(this.app.queryNames, ",")[0];
            this._defaultCCQuery = base.Utils.getField(this.app.queries, defaultQueryName);
            if (!this._defaultCCQuery) {
                console.warn("Query not configured for app: " + this.appName);
            }
            this.ccquery = this._defaultCCQuery;
        };
        AppService.prototype.setApp = function (app) {
            this.app = app;
            this.verifyServerApiVersionCompatibility(app);
            this.cclabels = this.getWebService(this.app.labels);
            this.ccautocomplete = this.getWebService(this.app.autocomplete);
            this.initDefaultQuery();
            this.makeMaps();
            this.suggestQueries = base.Utils.split(this.ccautocomplete ? this.ccautocomplete.suggestQueries : "", ",");
        };
        AppService.prototype.verifyServerApiVersionCompatibility = function (app) {
            if (!app) {
                console.warn('Unexpected empty app configuration.');
                return;
            }
            if (!app.apiVersion) {
                console.error("The App config '" + app.name + "' is not of 'Angular Workspace application' type.");
            }
            else if (app.apiVersion !== i1$1.MINIMUM_COMPATIBLE_SERVER_API_VERSION) {
                console.warn("This SBA is not compatible with the REST API of Sinequa Server.\n" +
                    ("The SBA expects the server API version to be at least '" + i1$1.MINIMUM_COMPATIBLE_SERVER_API_VERSION + "',") +
                    (" whereas the server API version is '" + app.apiVersion + "'."));
            }
        };
        /**
         * Initialize this service by retrieving the current application
         * configuration from the Sinequa server and using it to set up the data structures
         * on which the service relies
         */
        AppService.prototype.init = function () {
            var _this = this;
            return this.appWebService.get().pipe(operators.map(function (app) {
                _this.setApp(app);
                return app;
            }));
        };
        /**
         * Initialize this service from an application configuration object. This is typically
         * used for supporting mutiple concurrent queries within the same application by providing
         * component level instances of this service.
         */
        AppService.prototype.initFromApp = function (app) {
            if (app) {
                this.setApp(app);
            }
        };
        /**
         * Refresh the application configuration, reinitializing the service if it has changed
         *
         * @param auditEvents Any associated audit events that should be stored
         */
        AppService.prototype.refresh = function (auditEvents) {
            var _this = this;
            var observable = this.appWebService.refresh(this.app ? this.app.versionId : "", auditEvents);
            observable.subscribe(function (response) {
                if (!response.upToDate && response.app) {
                    _this.setApp(response.app);
                }
                return response;
            });
            return observable.pipe(operators.map(function (value) {
                return _this.app;
            }));
        };
        /**
         * Clear the data associated with the service. Typically used when processing a user logout
         */
        AppService.prototype.clear = function () {
            this.app = undefined;
            this.cclabels = undefined;
            this._defaultCCQuery = undefined;
            this.ccquery = undefined;
            this.clearMaps();
        };
        AppService.prototype.indexIsNormal = function (ccindex) {
            return !!ccindex && (!ccindex.indexType || base.Utils.startsWith(ccindex.indexType, "normal"));
        };
        AppService.prototype.getIndexForQuery = function (ccquery) {
            if (!ccquery) {
                return undefined;
            }
            var indexes = base.Utils.split(ccquery.searchIndexes, [","]);
            if (indexes.length === 0) {
                return this.app ? this.app.indexes._ : undefined;
            }
            else {
                var ccindex = this.getIndex(indexes[0]);
                if (ccindex && this.indexIsNormal(ccindex)) {
                    return this.app ? this.app.indexes._ : undefined;
                }
                return ccindex;
            }
        };
        AppService.prototype._makeColumnMapForIndex = function (columnMap, ccindex) {
            var e_2, _a, e_3, _b;
            if (!ccindex || !ccindex.columns) {
                return;
            }
            try {
                for (var _c = __values(Object.keys(ccindex.columns)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var columnName = _d.value;
                    var column = ccindex.columns[columnName];
                    columnMap[base.Utils.toLowerCase(column.name)] = column;
                    if (column.aliases) {
                        try {
                            for (var _e = (e_3 = void 0, __values(column.aliases)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var alias = _f.value;
                                columnMap[base.Utils.toLowerCase(alias)] = column;
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        AppService.prototype._makeColumnMapForQuery = function (columnMap, ccquery) {
            var e_4, _a, e_5, _b;
            if (!ccquery || !ccquery.columnsInfo || !ccquery.columnsInfo.columns) {
                return;
            }
            var ccindex = this.getIndexForQuery(ccquery);
            if (!ccindex || !ccindex.columns) {
                return;
            }
            try {
                for (var _c = __values(ccquery.columnsInfo.columns), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var columnInfo = _d.value;
                    if (columnInfo.name) {
                        var columnName = base.Utils.toLowerCase(columnInfo.name);
                        var column = ccindex.columns[columnName];
                        if (!column) {
                            column = AppService.extraColumns[columnName];
                        }
                        if (column) {
                            // Copy column so we can add the query specific aliases and labels
                            column = base.Utils.copy(column);
                            columnMap[columnName] = column;
                            if (columnInfo.aliases) {
                                column.aliases = base.Utils.split(columnInfo.aliases, [",", ";"]);
                                try {
                                    for (var _e = (e_5 = void 0, __values(column.aliases)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                        var alias = _f.value;
                                        columnMap[base.Utils.toLowerCase(alias)] = column;
                                    }
                                }
                                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                finally {
                                    try {
                                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                                    }
                                    finally { if (e_5) throw e_5.error; }
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
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_4) throw e_4.error; }
            }
        };
        AppService.prototype.makeMaps = function () {
            var e_6, _a, e_7, _b, e_8, _c, e_9, _d, e_10, _e;
            this.columnsByQuery = {};
            this.columnsByIndex = {};
            this.fieldsByQuery = {};
            if (!this.app) {
                return;
            }
            var columnMap;
            // Queries
            if (this.app.queries) {
                try {
                    for (var _f = __values(Object.keys(this.app.queries)), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var queryName = _g.value;
                        var ccquery = this.app.queries[queryName];
                        if (ccquery) {
                            ccquery.$columnFieldsPattern = new base.PatternMatcher("included column fields", "excluded column fields");
                            ccquery.$columnFieldsPattern.includedPattern.setText(ccquery.columnFieldsIncluded);
                            ccquery.$columnFieldsPattern.excludedPattern.setText(ccquery.columnFieldsExcluded);
                            ccquery.$partnameFieldsPattern = new base.PatternMatcher("included part name fields", "excluded part name fields");
                            ccquery.$partnameFieldsPattern.includedPattern.setText(ccquery.partnameFieldsIncluded);
                            ccquery.$partnameFieldsPattern.excludedPattern.setText(ccquery.partnameFieldsExcluded);
                            if (ccquery.columnsInfo) {
                                columnMap = {};
                                this.columnsByQuery[base.Utils.toLowerCase(ccquery.name)] = columnMap;
                                this._makeColumnMapForQuery(columnMap, ccquery);
                            }
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
            // Indexes
            if (this.app.indexes) {
                // Special normal index
                var ccindex = this.app.indexes._;
                if (ccindex) {
                    columnMap = {};
                    this.columnsByIndex._ = columnMap;
                    this._makeColumnMapForIndex(columnMap, ccindex);
                }
                try {
                    for (var _h = __values(Object.keys(this.app.indexes)), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var indexName = _j.value;
                        var ccindex1 = this.app.indexes[base.Utils.toLowerCase(indexName)];
                        if (ccindex1) {
                            if (this.indexIsNormal(ccindex1)) {
                                if (ccindex1.name !== "_") {
                                    this.columnsByIndex[base.Utils.toLowerCase(ccindex1.name)] = this.columnsByIndex._;
                                }
                            }
                            else {
                                columnMap = {};
                                this.columnsByIndex[base.Utils.toLowerCase(ccindex1.name)] = columnMap;
                                this._makeColumnMapForIndex(columnMap, ccindex1);
                            }
                        }
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
            }
            // Fields per query (contains aliases for default query and globally defined aliases)
            var globalFields = new Map();
            var columns = this.columnsByIndex._;
            if (columns) {
                try {
                    for (var _k = __values(Object.keys(columns)), _l = _k.next(); !_l.done; _l = _k.next()) {
                        var key = _l.value;
                        var column = columns[key];
                        if (column.aliases && column.aliases.length > 0) {
                            var alias = column.aliases[0];
                            if (alias) {
                                globalFields.set(alias, alias);
                            }
                        }
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
            }
            try {
                for (var _m = __values(Object.keys(this.columnsByQuery)), _o = _m.next(); !_o.done; _o = _m.next()) {
                    var queryName = _o.value;
                    var queryFields = new Map(globalFields);
                    var columns1 = this.columnsByQuery[base.Utils.toLowerCase(this.defaultCCQuery ? this.defaultCCQuery.name : "")];
                    if (columns1) {
                        try {
                            for (var _p = (e_10 = void 0, __values(Object.keys(columns1))), _q = _p.next(); !_q.done; _q = _p.next()) {
                                var key = _q.value;
                                var column = columns1[key];
                                if (column.aliases && column.aliases.length > 0) {
                                    var alias = column.aliases[0];
                                    if (alias) {
                                        queryFields.set(alias, alias);
                                    }
                                }
                            }
                        }
                        catch (e_10_1) { e_10 = { error: e_10_1 }; }
                        finally {
                            try {
                                if (_q && !_q.done && (_e = _p.return)) _e.call(_p);
                            }
                            finally { if (e_10) throw e_10.error; }
                        }
                        this.fieldsByQuery[queryName] = Array.from(queryFields.keys());
                    }
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_o && !_o.done && (_d = _m.return)) _d.call(_m);
                }
                finally { if (e_9) throw e_9.error; }
            }
        };
        AppService.prototype.clearMaps = function () {
            this.columnsByQuery = {};
            this.columnsByIndex = {};
            this.fieldsByQuery = {};
        };
        /**
         * Get the configuration of the web service with the passed name
         */
        AppService.prototype.getWebService = function (name) {
            if (!this.app) {
                return undefined;
            }
            return base.Utils.getField(this.app.webServices, name);
        };
        /**
         * Get the list configuration with the passed name
         */
        AppService.prototype.getList = function (name) {
            if (!this.app) {
                return undefined;
            }
            return this.app.lists[name];
        };
        Object.defineProperty(AppService.prototype, "defaultCCQuery", {
            /**
             * Return the default {@link CCQuery}
             */
            get: function () {
                return this._defaultCCQuery;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppService.prototype, "ccquery", {
            /**
             * Return the current {@link CCQuery}
             */
            get: function () {
                if (!!this._ccquery) {
                    return this._ccquery;
                }
                return this._defaultCCQuery;
            },
            /**
             * Set the current {@link CCQuery}
             */
            set: function (value) {
                if (value !== this._ccquery) {
                    var previous = this._ccquery;
                    this._ccquery = value;
                    this._events.next({ type: "query-changed", current: this._ccquery, previous: previous });
                }
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Get the {@link CCQuery} with the passed name
         */
        AppService.prototype.getCCQuery = function (name) {
            return this.app ? this.app.queries[base.Utils.toLowerCase(name)] : undefined;
        };
        /**
         * Set the current {@link CCQuery} to that with the passed name
         */
        AppService.prototype.setCCQuery = function (name) {
            var ccquery = !name ? this.defaultCCQuery : this.getCCQuery(name);
            if (ccquery) {
                this.ccquery = ccquery;
                return true;
            }
            else {
                console.warn("AppService.setCCQuery - query '" + name + "' does not exist");
                return false;
            }
        };
        Object.defineProperty(AppService.prototype, "fields", {
            /**
             * Return the fields defined on the current {@link CCQuery}
             */
            get: function () {
                if (!this.ccquery) {
                    return [];
                }
                return this.fieldsByQuery[base.Utils.toLowerCase(this.ccquery.name)] || [];
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Get the {@link CCAggregation} with the passed name
         */
        AppService.prototype.getCCAggregation = function (name) {
            if (!this.ccquery || !this.ccquery.aggregations) {
                return undefined;
            }
            return this.ccquery.aggregations.find(function (value) { return base.Utils.eqNC(name, value.name); });
        };
        /**
         * Get the {@link CCIndex} with the passed name
         */
        AppService.prototype.getIndex = function (name) {
            if (!this.app) {
                return undefined;
            }
            return base.Utils.getField(this.app.indexes, name);
        };
        /**
         * Get the {@link CCColumn} with the passed name. Aliases are resolved
         */
        AppService.prototype.getColumn = function (name) {
            var e_11, _a;
            if (!name) {
                return undefined;
            }
            if (!this.ccquery) {
                return undefined;
            }
            // First, CCQuery specific aliases
            var column;
            var columnAliases = this.columnsByQuery[base.Utils.toLowerCase(this.ccquery.name)];
            if (columnAliases) {
                column = columnAliases[base.Utils.toLowerCase(name)];
                if (column) {
                    return column;
                }
            }
            // Second, aliases by index
            var indexes = base.Utils.split(this.ccquery.searchIndexes, [","]);
            var firstIndex = indexes.length === 0 ? undefined : this.getIndex(indexes[0]);
            if (indexes.length === 0 || (!!firstIndex && this.indexIsNormal(firstIndex))) {
                columnAliases = this.columnsByIndex._;
                if (columnAliases) {
                    column = columnAliases[base.Utils.toLowerCase(name)];
                    if (column) {
                        return column;
                    }
                }
            }
            else {
                try {
                    for (var indexes_1 = __values(indexes), indexes_1_1 = indexes_1.next(); !indexes_1_1.done; indexes_1_1 = indexes_1.next()) {
                        var index = indexes_1_1.value;
                        columnAliases = this.columnsByIndex[base.Utils.toLowerCase(index)];
                        if (columnAliases) {
                            column = columnAliases[base.Utils.toLowerCase(name)];
                            if (column) {
                                return column;
                            }
                        }
                    }
                }
                catch (e_11_1) { e_11 = { error: e_11_1 }; }
                finally {
                    try {
                        if (indexes_1_1 && !indexes_1_1.done && (_a = indexes_1.return)) _a.call(indexes_1);
                    }
                    finally { if (e_11) throw e_11.error; }
                }
            }
            // Third, extra columns
            column = AppService.extraColumns[base.Utils.toLowerCase(name)];
            if (column) {
                return column;
            }
            return undefined;
        };
        /**
         * Get the default alias a column
         *
         * @param column The column
         * @return The default alias or `null` if no alias is defined
         */
        AppService.prototype.getColumnDefaultAlias = function (column) {
            if (column) {
                if (column.aliases && column.aliases.length > 0) {
                    return column.aliases[0];
                }
            }
            return "";
        };
        /**
         * Get the name of a column
         *
         * @param column The column
         * @param _default A default name to return if `column` is empty
         */
        AppService.prototype.getColumnName = function (column, _default) {
            if (_default === void 0) { _default = ""; }
            if (column) {
                return column.name;
            }
            return _default;
        };
        /**
         * Get the default alias for a column
         *
         * @param column The column
         * @param _default A default alias name to return if the `column` is empty or no alias is defined
         */
        AppService.prototype.getColumnAlias = function (column, _default) {
            if (_default === void 0) { _default = ""; }
            if (column) {
                var alias = this.getColumnDefaultAlias(column);
                if (alias) {
                    return alias;
                }
            }
            return _default;
        };
        /**
         * Return a column name from a name which can be an alias
         */
        AppService.prototype.resolveColumnName = function (name) {
            var column = this.getColumn(name);
            return this.getColumnName(column, name || "");
        };
        /**
         * Return a column alias from a name which can be an alias
         */
        AppService.prototype.resolveColumnAlias = function (name) {
            var column = this.getColumn(name);
            return this.getColumnAlias(column, name || "");
        };
        /**
         * Parse a fielded search expression
         *
         * @param text The expression
         * @param options Options for the parsing
         * @return The parsed {@link Expr} or an error message
         */
        AppService.prototype.parseExpr = function (text, options) {
            return ExprParser.parse(text, { appService: this, formatService: this.formatService, intlService: this.intlService }, options);
        };
        /**
         * Escape a value for fielded search if necessary. `Date` objects are converted to
         * Sinequa system date strings and non-scalars fields are escaped
         * @param field The value's field
         * @param value The value
         */
        AppService.prototype.escapeFieldValue = function (field, value) {
            if (base.Utils.isDate(value)) {
                return base.Utils.toSysDateStr(value);
            }
            value = value + "";
            var column = this.getColumn(field);
            if (column && !AppService.isScalar(column)) {
                // escaoe columns that might contain search operators in them (treating negative numbers as an ignorable edge case)
                return ExprParser.escape(value);
            }
            return value;
        };
        /**
         * Get the label of a column. The plural label is returned for csv-type columns.
         *
         * @param name The name of the column which can be an alias
         * @param _default The default label to return if no label is defined
         */
        AppService.prototype.getLabel = function (name, _default) {
            var column = this.getColumn(name);
            if (column) {
                var label = AppService.isCsv(column) ? column.labelPlural : column.label;
                if (label) {
                    return label;
                }
            }
            if (!base.Utils.isUndefined(_default)) {
                return _default;
            }
            return name;
        };
        /**
         * Get the singular label of a column
         *
         * @param name The name of the column which can be an alias
         * @param _default The default label to return if no label is defined
         */
        AppService.prototype.getSingularLabel = function (name, _default) {
            var column = this.getColumn(name);
            if (column && column.label) {
                return column.label;
            }
            if (!base.Utils.isUndefined(_default)) {
                return _default;
            }
            return name;
        };
        /**
         * Get the plural label of a column
         *
         * @param name The name of the column which can be an alias
         * @param _default The default label to return if no label is defined
         */
        AppService.prototype.getPluralLabel = function (name, _default) {
            var column = this.getColumn(name);
            if (column && column.labelPlural) {
                return column.labelPlural;
            }
            if (!base.Utils.isUndefined(_default)) {
                return _default;
            }
            return name;
        };
        /**
         * Return `true` if a column with the passed name or alias is a string
         */
        AppService.prototype.isString = function (name) {
            var column = this.getColumn(name);
            return !!column && AppService.isString(column);
        };
        /**
         * Return `true` if a column with the passed name or alias is a csv
         */
        AppService.prototype.isCsv = function (name) {
            var column = this.getColumn(name);
            return !!column && AppService.isCsv(column);
        };
        /**
         * Return `true` if a column with the passed name or alias is a tree
         */
        AppService.prototype.isTree = function (name) {
            var column = this.getColumn(name);
            return !!column && AppService.isTree(column);
        };
        /**
         * Return `true` if a column with the passed name or alias is an entity
         */
        AppService.prototype.isEntity = function (name) {
            var column = this.getColumn(name);
            return !!column && AppService.isEntity(column);
        };
        /**
         * Return `true` if a column with the passed name or alias is a boolean
         */
        AppService.prototype.isBoolean = function (name) {
            var column = this.getColumn(name);
            return !!column && AppService.isBoolean(column);
        };
        /**
         * Return `true` if a column with the passed name or alias is a date
         */
        AppService.prototype.isDate = function (name) {
            var column = this.getColumn(name);
            return !!column && AppService.isDate(column);
        };
        /**
         * Return `true` if a column with the passed name or alias is a double
         */
        AppService.prototype.isDouble = function (name) {
            var column = this.getColumn(name);
            return !!column && AppService.isDouble(column);
        };
        /**
         * Return `true` if a column with the passed name or alias is an integer
         */
        AppService.prototype.isInteger = function (name) {
            var column = this.getColumn(name);
            return !!column && AppService.isInteger(column);
        };
        /**
         * Return `true` if a column with the passed name or alias is a number (integer or double)
         */
        AppService.prototype.isNumber = function (name) {
            return this.isInteger(name) || this.isDouble(name);
        };
        /**
         * Return `true` if a column with the passed name or alias is a scalar
         */
        AppService.prototype.isScalar = function (name) {
            var column = this.getColumn(name);
            return !!column && AppService.isScalar(column);
        };
        /**
         * Return `true` if a column with the passed name or alias is sortable
         */
        AppService.prototype.isSortable = function (name) {
            var column = this.getColumn(name);
            return !!column && AppService.isSortable(column);
        };
        /**
         * If the passed url is relative and CORS is active then
         * prepend it with the Sinequa server origin
         */
        AppService.prototype.updateUrlForCors = function (url) {
            if (this.startConfig.corsActive && !!url && !base.Utils.isUrlAbsolute(url)) {
                url = base.Utils.addUrl(this.origin, url);
            }
            return url;
        };
        Object.defineProperty(AppService.prototype, "adminUrl", {
            /**
             * Return the url to the Sinequa administration console
             */
            get: function () {
                return this.updateUrlForCors(base.Utils.addUrl(this.startConfig.applicationPath, "admin"));
            },
            enumerable: false,
            configurable: true
        });
        return AppService;
    }());
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
    AppService.ɵfac = function AppService_Factory(t) { return new (t || AppService)(i0.ɵɵinject(i1$1.START_CONFIG), i0.ɵɵinject(i1$1.AppWebService), i0.ɵɵinject(i1.IntlService), i0.ɵɵinject(FormatService)); };
    AppService.ɵprov = i0.ɵɵdefineInjectable({ token: AppService, factory: AppService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AppService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1$1.START_CONFIG]
                        }] }, { type: i1$1.AppWebService }, { type: i1.IntlService }, { type: FormatService }];
        }, null);
    })();

    /**
     * An `HttpInterceptor` to process audi events attached to the request body
     * in the `$auditRecord` member.
     */
    var AuditInterceptor = /** @class */ (function () {
        function AuditInterceptor(startConfig) {
            this.startConfig = startConfig;
        }
        AuditInterceptor.prototype.shouldIntercept = function (url) {
            return base.Utils.startsWith(url, this.startConfig.apiPath);
        };
        AuditInterceptor.prototype.isJsonable = function (obj) {
            return (base.Utils.isObject(obj) || base.Utils.isArray(obj)) && !base.Utils.isArrayBuffer(obj) && !base.Utils.isBlob(obj) &&
                !base.Utils.isString(obj) && !(obj instanceof http.HttpParams);
        };
        // Handle legacy calls where auditEvents is either an AuditEvent or AuditEvent[]
        AuditInterceptor.prototype.ensureAuditRecord = function (auditEvents) {
            if (!auditEvents) {
                return undefined;
            }
            var auditEvents1;
            if (base.Utils.isArray(auditEvents)) {
                auditEvents1 = auditEvents;
            }
            else if (base.Utils.isObject(auditEvents)) {
                var auditRecord = auditEvents;
                if (auditRecord.auditEvents || auditRecord.mlAuditEvents) {
                    return auditRecord;
                }
                auditEvents1 = [auditEvents];
            }
            return {
                auditEvents: auditEvents1
            };
        };
        /**
         * Add a sessionid to all the audit events
         * @param auditRecord
         */
        AuditInterceptor.prototype.addSessionId = function (auditRecord) {
            var _a;
            var sessionid = this.getSessionId();
            (_a = auditRecord === null || auditRecord === void 0 ? void 0 : auditRecord.auditEvents) === null || _a === void 0 ? void 0 : _a.forEach(function (event) {
                if (!event.detail) {
                    event.detail = {};
                }
                event.detail['session-id'] = sessionid;
            });
        };
        /**
         * Get a Session Id initialized upon login. The session is maintained for 10 minutes
         * after the last call to this method.
         */
        AuditInterceptor.prototype.getSessionId = function () {
            if (!this.sessionid || this.isSessionStale()) {
                this.sessionid = base.Utils.guid();
            }
            this.sessionstart = new Date();
            return this.sessionid;
        };
        /**
         * Test whether the current session id valid or stale (need to be refreshed)
         */
        AuditInterceptor.prototype.isSessionStale = function () {
            var lastSession = new Date().getTime() - this.sessionstart.getTime();
            // Consider the session stale after 10 minutes
            return lastSession > 10 * 60 * 1000;
        };
        /**
         * Called once the `$auditRecord` member has been standardized, this method
         * can be overidden to update fields in the audit events associated with a
         * web service call.
         */
        AuditInterceptor.prototype.updateAuditRecord = function (auditRecord) {
        };
        /**
         * Intercept requests with a JSON body and standardize the format of the
         * `$auditRecord` member.
         */
        AuditInterceptor.prototype.intercept = function (request, next) {
            if (this.shouldIntercept(request.url) && this.isJsonable(request.body)) {
                request.body.$auditRecord = this.ensureAuditRecord(request.body.$auditRecord);
                this.addSessionId(request.body.$auditRecord);
                this.updateAuditRecord(request.body.$auditRecord);
            }
            return next.handle(request);
        };
        return AuditInterceptor;
    }());
    AuditInterceptor.ɵfac = function AuditInterceptor_Factory(t) { return new (t || AuditInterceptor)(i0.ɵɵinject(i1$1.START_CONFIG)); };
    AuditInterceptor.ɵprov = i0.ɵɵdefineInjectable({ token: AuditInterceptor, factory: AuditInterceptor.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AuditInterceptor, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1$1.START_CONFIG]
                        }] }];
        }, null);
    })();

    var APP_UTILS_MODULE_PROVIDERS = [];

    /**
     * This module contains a utility {@link AppService} for managing the configuration of a Sinequa SBA and a {@link FormatService}
     * for handling the formatting and parsing of Sinequa field values. It also contains an implementation of a {@link Query} class
     * as well as classes for manipulating Sinequa fielded search expressions.
     *
     * The {@link AuditInterceptor} in this module should be registered using `HTTP_INTERCEPTORS` in your app module.
     */
    var AppUtilsModule = /** @class */ (function () {
        function AppUtilsModule() {
        }
        return AppUtilsModule;
    }());
    AppUtilsModule.ɵmod = i0.ɵɵdefineNgModule({ type: AppUtilsModule });
    AppUtilsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function AppUtilsModule_Factory(t) { return new (t || AppUtilsModule)(); }, providers: __spread(APP_UTILS_MODULE_PROVIDERS), imports: [[
                base.BaseModule,
                i1.IntlModule,
                i1$1.WebServicesModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AppUtilsModule, { imports: [base.BaseModule,
                i1.IntlModule,
                i1$1.WebServicesModule] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AppUtilsModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            base.BaseModule,
                            i1.IntlModule,
                            i1$1.WebServicesModule
                        ],
                        declarations: [],
                        exports: [],
                        providers: __spread(APP_UTILS_MODULE_PROVIDERS)
                    }]
            }], null, null);
    })();

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AppService = AppService;
    exports.AppUtilsModule = AppUtilsModule;
    exports.AuditInterceptor = AuditInterceptor;
    exports.Expr = Expr;
    exports.ExprBuilder = ExprBuilder;
    exports.ExprParser = ExprParser;
    exports.ExprParserOperator = ExprParserOperator;
    exports.FormatService = FormatService;
    exports.Query = Query;
    exports.advancedFacetPrefix = advancedFacetPrefix;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-core-app-utils.umd.js.map
