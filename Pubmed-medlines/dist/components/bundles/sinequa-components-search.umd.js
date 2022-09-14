(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@sinequa/core/app-utils'), require('@sinequa/core/base'), require('@angular/core'), require('@angular/router'), require('rxjs'), require('rxjs/operators'), require('@sinequa/core/web-services'), require('@sinequa/core/login'), require('@sinequa/core/intl'), require('@sinequa/core/notification'), require('@angular/common'), require('@sinequa/components/utils'), require('@sinequa/components/action'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/search', ['exports', '@sinequa/core/app-utils', '@sinequa/core/base', '@angular/core', '@angular/router', 'rxjs', 'rxjs/operators', '@sinequa/core/web-services', '@sinequa/core/login', '@sinequa/core/intl', '@sinequa/core/notification', '@angular/common', '@sinequa/components/utils', '@sinequa/components/action', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components.search = {}), global.sinequa.core['app-utils'], global.sinequa.core.base, global.ng.core, global.ng.router, global.rxjs, global.rxjs.operators, global.sinequa.core['web-services'], global.sinequa.core.login, global.sinequa.core.intl, global.sinequa.core.notification, global.ng.common, global.sinequa.components.utils, global.sinequa.components.action, global.ng.forms));
}(this, (function (exports, i2, base, i0, i1, rxjs, operators, i3, i4, i3$1, i6, i2$1, i4$1, i3$2, forms) { 'use strict';

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
     * Description of the Breadcrumbs class - link to {@link SearchService}
     */
    var Breadcrumbs = /** @class */ (function () {
        function Breadcrumbs(appService, searchService, query) {
            this.appService = appService;
            this.searchService = searchService;
            this.query = query.copy();
            this.items = [];
            this.advanced = [];
            this.fields = new Set();
        }
        Breadcrumbs.create = function (appService, searchService, query) {
            var breadcrumbs = new Breadcrumbs(appService, searchService, query);
            return breadcrumbs.init();
        };
        Object.defineProperty(Breadcrumbs.prototype, "activeIndex", {
            get: function () {
                return this.items.findIndex(function (item) { return item.active; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Breadcrumbs.prototype, "activeItem", {
            get: function () {
                var index = this.activeIndex;
                if (index !== -1) {
                    return this.items[index];
                }
                return undefined;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Breadcrumbs.prototype, "text", {
            get: function () {
                return this.items[0].display;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Breadcrumbs.prototype, "textExpr", {
            get: function () {
                return this.items[0].expr;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Breadcrumbs.prototype, "selects", {
            get: function () {
                return this.items.slice(1);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Breadcrumbs.prototype, "activeSelects", {
            get: function () {
                return this.items.slice(1, this.activeIndex + 1);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Breadcrumbs.prototype, "activeItems", {
            get: function () {
                return this.items.slice(0, this.activeIndex + 1);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Breadcrumbs.prototype, "isEmpty", {
            get: function () {
                if (this.items.length === 0) {
                    return true;
                }
                if (this.items.length === 1 && this.items[0].hidden) {
                    return true;
                }
                return false;
            },
            enumerable: false,
            configurable: true
        });
        Breadcrumbs.prototype.find = function (expr) {
            var e_1, _a, e_2, _b;
            var _this = this;
            var expr1 = expr;
            var init = expr;
            if (!(expr instanceof i2.Expr)) {
                expr1 = new i2.Expr(init);
            }
            if (!expr1.every(function (expr2) {
                var field = expr2.exprContext.appService.resolveColumnAlias(expr2.field);
                return !field || _this.fields.has(field);
            })) {
                return undefined;
            }
            try {
                for (var _c = __values(this.advanced), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var expr3 = _d.value;
                    var expr2 = expr3.find(expr1);
                    if (expr2) {
                        return expr2;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var _e = __values(this.selects), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var select = _f.value;
                    if (select.expr) {
                        var expr2 = select.expr.find(expr1);
                        if (expr2) {
                            return expr2;
                        }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (this.textExpr) {
                var expr2 = this.textExpr.find(expr1, function (expr3) { return expr3.isStructured; });
                if (expr2) {
                    return expr2;
                }
                expr2 = this.textExpr.find(expr1, function (expr3) { return !expr3.isStructured; });
                if (expr2) {
                    return expr2;
                }
            }
            return undefined;
        };
        Breadcrumbs.prototype.findSelect = function (facet, exprOrField) {
            // Active selects only, most recent first
            var activeSelects = this.activeSelects;
            for (var i = activeSelects.length - 1; i >= 0; i--) {
                var select = activeSelects[i];
                if (select.expr && (!facet || base.Utils.eqNC(facet, select.facet || ""))) {
                    if (!exprOrField) {
                        return select.expr;
                    }
                    if (base.Utils.isString(exprOrField)) {
                        if (base.Utils.eqNC(exprOrField, select.expr.field || "")) {
                            return select.expr;
                        }
                    }
                    else {
                        var expr1 = select.expr.find(exprOrField);
                        if (expr1) {
                            return expr1;
                        }
                    }
                }
            }
            return undefined;
        };
        Breadcrumbs.prototype.addFields = function (expr) {
            var _this = this;
            if (expr) {
                var fields = expr.getFields();
                fields.forEach(function (field) {
                    _this.fields.add(field);
                });
            }
        };
        Breadcrumbs.prototype.makeBreadcrumbsItemFromExpr = function (text) {
            var expr = this.appService.parseExpr(text);
            if (!(expr instanceof i2.Expr)) {
                expr = this.appService.parseExpr(i2.ExprParser.escape(text));
            }
            if (expr instanceof i2.Expr) {
                return { expr: expr, display: expr };
            }
            else {
                return { expr: undefined, display: expr };
            }
        };
        Breadcrumbs.prototype.initItems = function () {
            var e_3, _a;
            // Text
            if (this.query && this.query.text) {
                var item = this.makeBreadcrumbsItemFromExpr(this.query.text);
                this.items.push(item);
                this.addFields(item.expr);
            }
            else {
                this.items.push({
                    expr: undefined,
                    display: this.query && this.query.basket ? this.query.basket : "msg#breadcrumbs.emptySearch",
                    hidden: this.appService.ccquery && !this.appService.ccquery.allowEmptySearch &&
                        this.searchService.isEmptySearchIgnoreSelects(this.query)
                });
            }
            // Selects
            if (this.query && this.query.select) {
                try {
                    for (var _b = __values(this.query.select), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var select = _c.value;
                        var item = this.makeBreadcrumbsItemFromExpr(select.expression);
                        item.facet = select.facet;
                        this.items.push(item);
                        this.addFields(item.expr);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            // Set last item active
            this.items[this.items.length - 1].active = true;
        };
        Breadcrumbs.prototype.init = function () {
            this.initItems();
            return this;
        };
        Breadcrumbs.prototype.selectItem = function (item) {
            var index = this.items.indexOf(item);
            if (this.query && index !== -1) {
                var query = this.query.copy();
                if (query.select) {
                    query.select.splice(index);
                }
                this.items.forEach(function (item1) { return item1.active = false; });
                item.active = true;
                return query;
            }
            return undefined;
        };
        Breadcrumbs.prototype.removeItem = function (item) {
            var index = this.items.indexOf(item);
            if (this.query && index !== -1) {
                var next = void 0;
                if (index === 0) { // Text
                    if (this.query.text || this.query.basket) {
                        delete this.query.text;
                        delete this.query.basket;
                        item.expr = undefined;
                        item.display = "msg#breadcrumbs.emptySearch";
                        item.hidden = this.appService.ccquery && !this.appService.ccquery.allowEmptySearch &&
                            this.searchService.isEmptySearchIgnoreSelects(this.query);
                    }
                    if (!item.hidden) {
                        next = this.activeItem;
                    }
                    else if (this.items.length > 1) {
                        next = this.items[this.items.length - 1];
                    }
                }
                else {
                    // Find next item to activate, if necessary
                    var activeIndex = this.activeIndex;
                    if (activeIndex >= index) {
                        if (activeIndex > index) {
                            next = this.items[activeIndex];
                        }
                        else {
                            if (index === this.items.length - 1) {
                                next = this.items[index - 1];
                            }
                            else {
                                next = this.items[index + 1];
                            }
                            if (next.hidden) {
                                next = undefined;
                            }
                        }
                    }
                    if (this.query.select) {
                        this.query.select.splice(index - 1, 1);
                    }
                    this.items.splice(index, 1);
                }
                return next;
            }
            return undefined;
        };
        Breadcrumbs.prototype.update = function (query) {
            if (!this.query) {
                this.query = query.copy();
            }
            this.query.text = query.text;
            this.query.basket = query.basket;
            if (!this.query.text && !this.query.basket) {
                var item = this.items[0];
                item.expr = undefined;
                item.display = "msg#breadcrumbs.emptySearch";
                item.hidden = this.appService.ccquery && !this.appService.ccquery.allowEmptySearch &&
                    this.searchService.isEmptySearchIgnoreSelects(this.query);
            }
        };
        return Breadcrumbs;
    }());

    var SEARCH_OPTIONS = new i0.InjectionToken("SEARCH_OPTIONS");
    exports.SearchService = /** @class */ (function () {
        function SearchService(options, router, appService, queryService, loginService, intlService, formatService, auditService, notificationsService, exprBuilder) {
            var _this = this;
            this.options = options;
            this.router = router;
            this.appService = appService;
            this.queryService = queryService;
            this.loginService = loginService;
            this.intlService = intlService;
            this.formatService = formatService;
            this.auditService = auditService;
            this.notificationsService = notificationsService;
            this.exprBuilder = exprBuilder;
            this.queryStringParams = {};
            this.fetchingLoadMore = false;
            this._events = new rxjs.Subject();
            this._queryStream = new rxjs.BehaviorSubject(undefined);
            this._resultsStream = new rxjs.BehaviorSubject(undefined);
            if (!this.options) {
                this.options = {
                    routes: ["search"]
                };
            }
            this.results = undefined;
            this.breadcrumbs = undefined;
            this.loginSubscription = this.loginService.events.subscribe(function (value) {
                if (value.type === "session-changed") {
                    _this.handleLogin();
                }
            });
            this.routerSubscription = this.router.events.subscribe(function (event) {
                if (event instanceof i1.NavigationStart) {
                    // Restore state on back/forward until this issue is fixed: https://github.com/angular/angular/issues/28108
                    var currentNavigation = _this.router.getCurrentNavigation();
                    if (currentNavigation && event.navigationTrigger === "popstate" &&
                        !currentNavigation.extras.state && event.restoredState) {
                        currentNavigation.extras.state = event.restoredState;
                    }
                }
                else if (event instanceof i1.NavigationEnd) {
                    _this.handleNavigation();
                }
            });
            this.appSubscription = this.appService.events.subscribe(function (event) {
                if (event.type === "query-changed") {
                    if (_this._query && (!_this.appService.ccquery || (_this._query.name !== _this.appService.ccquery.name))) {
                        _this.clearQuery();
                    }
                }
            });
        }
        SearchService.prototype.ngOnDestroy = function () {
            this.loginSubscription.unsubscribe();
            this.routerSubscription.unsubscribe();
            this.appSubscription.unsubscribe();
            this._events.complete();
            this._queryStream.complete();
            this._resultsStream.complete();
        };
        Object.defineProperty(SearchService.prototype, "events", {
            get: function () {
                return this._events;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SearchService.prototype, "queryStream", {
            get: function () {
                return this._queryStream;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SearchService.prototype, "resultsStream", {
            get: function () {
                return this._resultsStream.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        SearchService.prototype.getTabConfig = function (name) {
            if (this.appService.ccquery && this.appService.ccquery.tabSearch && this.appService.ccquery.tabSearch.tabs) {
                return this.appService.ccquery.tabSearch.tabs.find(function (t) { return base.Utils.eqNC(t.name, name); });
            }
            return undefined;
        };
        Object.defineProperty(SearchService.prototype, "query", {
            get: function () {
                if (!this._query) {
                    this._query = this.makeQuery();
                    this._events.next({ type: "new-query", query: this._query });
                }
                return this._query;
            },
            enumerable: false,
            configurable: true
        });
        SearchService.prototype.setQuery = function (query, newQuery) {
            if (newQuery === void 0) { newQuery = true; }
            if (query === this._query) {
                return;
            }
            this._query = query;
            if (this._query) {
                var ccquery = void 0;
                if (this.options.preventQueryNameChanges) {
                    ccquery = this.appService.ccquery || this.appService.defaultCCQuery;
                }
                else {
                    ccquery = this.appService.getCCQuery(this._query.name);
                    if (!ccquery) {
                        console.warn("Query '" + this._query.name + "' not found");
                        ccquery = this.appService.defaultCCQuery;
                    }
                }
                if (ccquery) {
                    this._query.name = ccquery.name;
                    if (this.appService.ccquery !== ccquery) {
                        this.appService.ccquery = ccquery;
                    }
                }
            }
            if (newQuery) {
                this._events.next({ type: "new-query", query: this._query });
            }
        };
        SearchService.prototype.clearQuery = function () {
            this.setQuery(undefined);
        };
        SearchService.prototype.updateBreadcrumbs = function (results, options) {
            if (!results) {
                this.breadcrumbs = undefined;
                return;
            }
            if (!this.breadcrumbs || (!options.resuseBreadcrumbs && !options.advanced)) {
                this.breadcrumbs = Breadcrumbs.create(this.appService, this, this.query);
            }
            else if (options.advanced) {
                this.breadcrumbs.update(this.query);
            }
        };
        SearchService.prototype._setResults = function (results, options) {
            if (options === void 0) { options = {}; }
            if (results === this.results) {
                return;
            }
            this._events.next({ type: "before-new-results", results: results });
            this.results = results;
            this.treatQueryIntents(results);
            this.updateBreadcrumbs(results, options);
            if (this.results) {
                if (this.results.tab) {
                    this.query.tab = this.results.tab;
                }
                if (this.results.attributes && this.results.attributes.queryid) {
                    this.query.queryId = this.results.attributes.queryid;
                }
            }
            this._events.next({ type: "new-results", results: this.results });
            this._resultsStream.next(this.results);
        };
        SearchService.prototype.setResults = function (results) {
            return this._setResults(results);
        };
        // TODO: queryintents in their own service ?
        SearchService.prototype.treatQueryIntents = function (results) {
            var e_1, _f, e_2, _g;
            if (results && results.queryAnalysis && results.queryIntents) {
                var queryIntents = results.queryIntents;
                try {
                    for (var queryIntents_1 = __values(queryIntents), queryIntents_1_1 = queryIntents_1.next(); !queryIntents_1_1.done; queryIntents_1_1 = queryIntents_1.next()) {
                        var intent = queryIntents_1_1.value;
                        if (intent.actions) {
                            try {
                                for (var _h = (e_2 = void 0, __values(intent.actions)), _j = _h.next(); !_j.done; _j = _h.next()) {
                                    var action = _j.value;
                                    var event = { type: "process-query-intent-action", action: action, intent: intent, analysis: results.queryAnalysis };
                                    this._events.next(event);
                                    if (!event.actionProcessed) {
                                        if (!!action.data) {
                                            switch (action.type) {
                                                case "tab":
                                                    if (results.queryAnalysis.initial && this.query &&
                                                        !base.Utils.eqNC(this.query.tab || "", action.data)) {
                                                        this.selectTab(action.data, { skipLocationChange: true });
                                                    }
                                                    break;
                                            }
                                        }
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_j && !_j.done && (_g = _h.return)) _g.call(_h);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (queryIntents_1_1 && !queryIntents_1_1.done && (_f = queryIntents_1.return)) _f.call(queryIntents_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        Object.defineProperty(SearchService.prototype, "haveRecords", {
            get: function () {
                return !!this.results && !!this.results.records && this.results.records.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SearchService.prototype, "rowCount", {
            get: function () {
                return (!!this.results && this.results.rowCount) ? this.results.rowCount : 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SearchService.prototype, "totalRowCount", {
            get: function () {
                return (!!this.results && this.results.totalRowCount) ? this.results.totalRowCount : 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SearchService.prototype, "pageSize", {
            get: function () {
                if (this.query && this.query.pageSize) {
                    return this.query.pageSize;
                }
                if (this.appService.ccquery && this.appService.ccquery.pageSize) {
                    return this.appService.ccquery.pageSize;
                }
                return SearchService.DefaultPageSize;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SearchService.prototype, "page", {
            get: function () {
                if (!this.results) {
                    return 1;
                }
                return this.results.page;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SearchService.prototype, "pageCount", {
            get: function () {
                if (!this.results || !this.results.rowCount) {
                    return 0;
                }
                return Math.ceil(this.results.rowCount / this.results.pageSize);
            },
            enumerable: false,
            configurable: true
        });
        SearchService.prototype.makeQuery = function (recentQuery) {
            var ccquery = this.appService.ccquery;
            var query = new i2.Query(ccquery ? ccquery.name : "_unknown");
            if (recentQuery) {
                Object.assign(query, recentQuery);
            }
            this._events.next({ type: "make-query", query: query });
            return query;
        };
        SearchService.prototype.makeAuditEvent = function (event) {
            this._events.next({ type: "make-audit-event", event: event });
            return event;
        };
        SearchService.prototype.selectBreadcrumbsItem = function (item) {
            if (this.breadcrumbs) {
                var query = this.breadcrumbs.selectItem(item);
                if (query) {
                    this.setQuery(query, false);
                    this.search({ reuseBreadcrumbs: true }); // audit?
                }
            }
        };
        SearchService.prototype.removeBreadcrumbsItem = function (item) {
            if (this.breadcrumbs) {
                var next = this.breadcrumbs.removeItem(item);
                if (this.isEmptySearch(this.breadcrumbs.query)) {
                    this.clear();
                    return;
                }
                if (next) {
                    this.selectBreadcrumbsItem(next);
                }
            }
        };
        SearchService.prototype.removeSelect = function (index) {
            if (this.breadcrumbs) {
                var item = this.breadcrumbs.items[index + 1];
                this.removeBreadcrumbsItem(item);
            }
        };
        SearchService.prototype.removeText = function () {
            if (this.breadcrumbs) {
                var item = this.breadcrumbs.items[0];
                this.removeBreadcrumbsItem(item);
            }
        };
        SearchService.prototype.clear = function (navigate, path) {
            if (navigate === void 0) { navigate = true; }
            this.clearQuery();
            path = path || this.options.homeRoute;
            this._setResults(undefined);
            this._events.next({ type: "clear", path: path });
            if (navigate) {
                this.navigate({ path: path || this.options.homeRoute });
            }
        };
        SearchService.prototype.home = function (path) {
            if (path === void 0) { path = this.options.homeRoute; }
            this.clear(true, path);
        };
        SearchService.prototype.makeQueryIntentData = function (queryIntentData) {
            this._events.next({ type: "make-query-intent-data", intentData: queryIntentData });
            return queryIntentData;
        };
        SearchService.prototype.isEmptySearchIgnoreSelects = function (query) {
            if (!query) {
                return true;
            }
            if (!query.action || query.action === "search") {
                // Test isFirstPage
                if (query.isFirstPage) {
                    return false;
                }
                // Test empty text
                if (query.text && base.Utils.trim(query.text)) {
                    return false;
                }
                // Test basket
                if (query.basket) {
                    return false;
                }
                return true;
            }
            return false;
        };
        SearchService.prototype.isEmptySearch = function (query) {
            if (!query) {
                return true;
            }
            if (!query.action || query.action === "search") {
                if (!this.isEmptySearchIgnoreSelects(query)) {
                    return false;
                }
                // Test no facet selection
                if (query.select && query.select.length > 0) {
                    return false;
                }
                return true;
            }
            return false;
        };
        SearchService.prototype.checkEmptySearch = function (queries) {
            var e_3, _f;
            if (this.appService.ccquery && !this.appService.ccquery.allowEmptySearch) {
                if (!base.Utils.isArray(queries)) {
                    queries = [queries];
                }
                try {
                    for (var queries_1 = __values(queries), queries_1_1 = queries_1.next(); !queries_1_1.done; queries_1_1 = queries_1.next()) {
                        var query = queries_1_1.value;
                        if (this.isEmptySearch(query)) {
                            this.notificationsService.info("msg#search.emptySearchNotification");
                            return false;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (queries_1_1 && !queries_1_1.done && (_f = queries_1.return)) _f.call(queries_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            return true;
        };
        SearchService.prototype.getResults = function (query, auditEvents, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            if (!this.checkEmptySearch(query)) {
                return rxjs.throwError("empty search");
            }
            if (!options.searchInactive) {
                this.searchActive = true;
            }
            var tab = this.getCurrentTab();
            return this.queryService.getResults(query, auditEvents, this.makeQueryIntentData({
                tab: !!tab ? tab.name : undefined,
                queryIntents: options.queryIntents,
                queryAnalysis: options.queryAnalysis
            })).pipe(operators.map(function (results) {
                _this.searchActive = false;
                return results;
            }));
        };
        SearchService.prototype.getMultipleResults = function (queries, auditEvents) {
            if (!this.checkEmptySearch(queries)) {
                return rxjs.of({ results: [] });
            }
            return this.queryService.getMultipleResults(queries, auditEvents);
        };
        SearchService.prototype.navigate = function (options, audit) {
            var e_4, _f;
            if (!options) {
                options = {};
            }
            if (!options.analyzeQueryText && this.results) {
                options.queryIntents = this.results.queryIntents;
                options.queryAnalysis = this.results.queryAnalysis;
            }
            if (!this.routingActive) {
                this.handleNavigation(options, audit);
                return Promise.resolve(true);
            }
            else {
                // Save currentPath and currentSearch
                var url = base.Utils.makeURL(this.router.url);
                var currentPath = url.pathname;
                url.searchParams.delete("$refresh");
                var currentSearch = decodeURIComponent(url.search);
                // Set up queryParams and add current query
                var queryParams = base.Utils.copy(this.queryStringParams);
                if (this._query) {
                    queryParams.query = this._query.toJsonForQueryString();
                }
                // Set up history state
                var state = {
                    audit: audit,
                    navigationOptions: options
                };
                var extras = {
                    queryParams: queryParams,
                    state: state,
                    skipLocationChange: options.skipLocationChange
                };
                // Calculate new search
                var path = options.path;
                if (!path) {
                    path = currentPath;
                }
                url = base.Utils.makeURL(path);
                path = url.pathname; // normalized
                try {
                    for (var _g = __values(Object.keys(queryParams)), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var key = _h.value;
                        url.searchParams.set(key, queryParams[key]);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_h && !_h.done && (_f = _g.return)) _f.call(_g);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                var search = decodeURIComponent(url.search);
                // If path and search are both the same as current then force navigation (without adding to history)
                if (base.Utils.eq(currentPath, path) && base.Utils.eq(currentSearch, search)) {
                    // We want to force the navigation so that the query will be processed
                    extras.queryParams.$refresh = base.Utils.now.getTime();
                    // But don't update the browser url
                    extras.skipLocationChange = true;
                }
                return this.router.navigate([path], extras);
            }
        };
        SearchService.prototype.getHistoryState = function () {
            var navigation = this.router.getCurrentNavigation();
            if (navigation) {
                return navigation.extras && navigation.extras.state || {};
            }
            return window.history.state || {};
        };
        SearchService.prototype.isSearchRouteActive = function () {
            var url = base.Utils.makeURL(this.router.url);
            return this.isSearchRoute(url.pathname);
        };
        SearchService.prototype.isSearchRoute = function (pathname) {
            return this.checkSearchRoute(pathname, this.options.routes);
        };
        SearchService.prototype.isSkipSearchRoute = function (pathname) {
            return this.checkSearchRoute(pathname, this.options.skipSearchRoutes);
        };
        SearchService.prototype.checkSearchRoute = function (pathname, routes) {
            var e_5, _f;
            if (routes) {
                try {
                    for (var routes_1 = __values(routes), routes_1_1 = routes_1.next(); !routes_1_1.done; routes_1_1 = routes_1.next()) {
                        var route = routes_1_1.value;
                        if (base.Utils.endsWith(pathname, base.Utils.addUrl("/", route))) {
                            return true;
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (routes_1_1 && !routes_1_1.done && (_f = routes_1.return)) _f.call(routes_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
            return false;
        };
        SearchService.prototype.getQueryFromUrl = function () {
            var query;
            var url = base.Utils.makeURL(this.router.url);
            if (this.isSearchRoute(url.pathname)) {
                var jquery = url.searchParams.get("query");
                if (jquery) {
                    try {
                        query = this.makeQuery().fromJson(jquery);
                    }
                    catch (_a) { }
                }
            }
            return query;
        };
        SearchService.prototype.ensureQueryFromUrl = function () {
            var query = this.getQueryFromUrl();
            if (!query) {
                this.clear(false);
                return undefined;
            }
            else {
                // The url query should be the same as the current query on SearchService unless
                // it's the initial navigation or if the url is changed manually.
                // In any case, we always set the query from the url. We only send a new-query
                // event if the current query is empty so that we don't systematically create a
                // new query "session" (ml-audit)
                this.setQuery(query, !this._query);
                return query;
            }
        };
        SearchService.prototype.handleLogin = function () {
            if (!this.loginService.complete) {
                return Promise.resolve(false);
            }
            if (!!this.ensureQueryFromUrl()) {
                return this.navigate();
            }
            else {
                return Promise.resolve(true);
            }
        };
        Object.defineProperty(SearchService.prototype, "routingActive", {
            get: function () {
                return !this.options.deactivateRouting;
            },
            set: function (value) {
                this.options.deactivateRouting = !value;
            },
            enumerable: false,
            configurable: true
        });
        SearchService.prototype.makeAuditEventFromCurrentQuery = function () {
            var lastSelect = this.query.lastSelect();
            if (lastSelect) {
                var lastExpr = this.appService.parseExpr(lastSelect.expression);
                if (lastExpr instanceof i2.Expr) {
                    if (lastExpr.field === "refine") {
                        return this.makeAuditEvent({
                            type: "Search_Refine" /* Search_Refine */,
                            detail: {
                                text: lastExpr.value,
                                itembox: lastSelect.facet,
                                "from-result-id": !!this.results ? this.results.id : null
                            }
                        });
                    }
                    else {
                        return this.makeAuditEvent({
                            type: "Search_Select_Item" /* Search_Select_Item */,
                            detail: {
                                item: lastSelect,
                                itembox: lastSelect.facet,
                                itemcolumn: lastExpr.field,
                                isitemexclude: lastExpr.not,
                                "from-result-id": !!this.results ? this.results.id : null
                            }
                        });
                    }
                }
            }
            else {
                if (this.query.basket) {
                    return this.makeAuditEvent({
                        type: "Basket_Open" /* Basket_Open */,
                        detail: {
                            basket: this.query.basket
                        }
                    });
                }
                else {
                    return this.makeAuditEvent({
                        type: "Search_Text" /* Search_Text */,
                        detail: {
                            text: this.query.text,
                            scope: this.query.scope
                        }
                    });
                }
            }
            return undefined;
        };
        SearchService.prototype.handleNavigation = function (navigationOptions, audit) {
            var _this = this;
            if (!this.loginService.complete) {
                return Promise.resolve(false);
            }
            if (!this.appService.ccquery) {
                return Promise.resolve(false);
            }
            var query = this._query;
            if (this.routingActive) {
                query = this.ensureQueryFromUrl();
            }
            this._events.next({ type: "update-query", query: query });
            this._queryStream.next(query);
            if (!query) {
                return Promise.resolve(true);
            }
            if (this.routingActive) {
                var state = this.getHistoryState();
                // console.log("history.state:", state);
                audit = state.audit;
                navigationOptions = state.navigationOptions;
            }
            navigationOptions = navigationOptions || {};
            var pathName = navigationOptions.path ? navigationOptions.path : base.Utils.makeURL(this.router.url).pathname;
            if (navigationOptions.skipSearch || this.isSkipSearchRoute(pathName)) {
                return Promise.resolve(true);
            }
            if (!audit) {
                audit = this.makeAuditEventFromCurrentQuery();
                if (audit && audit.type === "Search_Text" /* Search_Text */) {
                    delete navigationOptions.queryIntents;
                    delete navigationOptions.queryAnalysis;
                }
            }
            var observable = this.getResults(this.query, audit, {
                queryIntents: navigationOptions.queryIntents,
                queryAnalysis: navigationOptions.queryAnalysis
            });
            base.Utils.subscribe(observable, function (results) {
                navigationOptions = navigationOptions || {};
                _this._setResults(results, {
                    resuseBreadcrumbs: navigationOptions.reuseBreadcrumbs,
                });
                return results;
            });
            if (navigationOptions.selectTab) {
                var afterSelectTabEvent = {
                    type: "after-select-tab",
                    observable: observable
                };
                this._events.next(afterSelectTabEvent);
                observable = afterSelectTabEvent.observable;
            }
            return observable.pipe(operators.map(function () { return true; }), operators.catchError(function () { return rxjs.of(false); })).toPromise();
        };
        SearchService.prototype.search = function (navigationOptions, audit) {
            delete this.query.page;
            delete this.query.spellingCorrectionMode;
            return this.navigate(navigationOptions, audit);
        };
        SearchService.prototype.searchText = function (path) {
            // Check for empty search preemptively to avoid clearing the current results in the most
            // common case of the user entering empty search text in the search box
            // The lower level check in getResults will handle less obvious cases (url editing etc)
            if (!this.checkEmptySearch(this.query)) {
                return Promise.resolve(false);
            }
            return this.search({
                path: path,
                analyzeQueryText: true
            }, this.makeAuditEvent({
                type: "Search_Text" /* Search_Text */,
                detail: {
                    text: this.query.text,
                    scope: this.query.scope,
                    language: this.intlService.currentLocale.name
                }
            }));
        };
        SearchService.prototype.searchRefine = function (text) {
            // add "refine" name to facet value is mandatory as it's used in preview's query
            this.query.addSelect(this.exprBuilder.makeRefineExpr(text), "refine");
            return this.search(undefined, this.makeAuditEvent({
                type: "Search_Refine" /* Search_Refine */,
                detail: {
                    text: text,
                    itembox: "refine",
                    "from-result-id": !!this.results ? this.results.id : null
                }
            }));
        };
        SearchService.prototype.gotoPage = function (page) {
            this.query.page = page;
            return this.navigate(undefined, this.makeAuditEvent({
                type: "Search_GotoPage" /* Search_GotoPage */,
                detail: {
                    page: page,
                    "from-result-id": !!this.results ? this.results.id : null
                }
            }));
        };
        /**
         * Load more results and append them to previous results
         */
        SearchService.prototype.loadMore = function () {
            var _this = this;
            if (!this.fetchingLoadMore) {
                var page = this.query.page || this.page;
                page += (page <= this.pageCount) ? 1 : 0;
                if (page <= this.pageCount) {
                    this.fetchingLoadMore = true;
                    this.query.page = page;
                    var auditEvents = this.makeAuditEvent({
                        type: "Search_GotoPage" /* Search_GotoPage */,
                        detail: {
                            page: page,
                            "from-result-id": !!this.results ? this.results.id : null
                        }
                    });
                    this.getResults(this.query, auditEvents)
                        .subscribe(function (results) {
                        var _a;
                        if (_this.results && results) {
                            _this.results.records = __spread(((_a = _this.results) === null || _a === void 0 ? void 0 : _a.records) || [], results.records) || [];
                            _this._resultsStream.next(_this.results);
                        }
                        _this.fetchingLoadMore = false;
                    });
                }
            }
        };
        /**
         * @returns true if more are available otherwise false
         */
        SearchService.prototype.hasMore = function () {
            var page = this.query.page || this.page;
            return (page < this.pageCount);
        };
        SearchService.prototype.didYouMean = function (text, context, kind) {
            if (context === "search") {
                this.query.text = text;
            }
            else {
                var refineSelect = this.query.findSelect("refine");
                if (refineSelect) {
                    refineSelect.expression = "refine:" + i2.ExprParser.escape(text);
                }
            }
            this.query.spellingCorrectionMode = "dymonly";
            return this.navigate(undefined, this.makeAuditEvent({
                type: kind === i3.DidYouMeanKind.Original ? "Search_DidYouMean_Original" /* Search_DidYouMean_Original */ : "Search_DidYouMean_Correction" /* Search_DidYouMean_Correction */,
                detail: {
                    text: text
                }
            }));
        };
        SearchService.prototype.getCurrentRecordIds = function () {
            if (this.results && this.results.records) {
                return this.results.records.map(function (record) { return record.id; });
            }
            return [];
        };
        SearchService.prototype.getRecordFromId = function (id) {
            if (this.results && this.results.records) {
                return this.results.records.find(function (record) { return base.Utils.eq(record.id, id); });
            }
            return undefined;
        };
        SearchService.prototype.addFieldSelect = function (field, items, options) {
            if (items && (!base.Utils.isArray(items) || items.length > 0)) {
                var expr = this.exprBuilder.makeFieldExpr(field, items, options === null || options === void 0 ? void 0 : options.and);
                if (options === null || options === void 0 ? void 0 : options.not) {
                    expr = this.exprBuilder.makeNotExpr(expr);
                }
                this.query.addSelect(expr, options === null || options === void 0 ? void 0 : options.facetName);
                return true;
            }
            return false;
        };
        Object.defineProperty(SearchService.prototype, "lastRefineText", {
            get: function () {
                if (this.breadcrumbs) {
                    var refineExpr = this.breadcrumbs.findSelect("refine");
                    if (refineExpr) {
                        return i2.ExprParser.unescape(refineExpr.toString(false));
                    }
                }
                return "";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SearchService.prototype, "hasRelevance", {
            get: function () {
                var _a;
                if (!this.breadcrumbs) {
                    return false;
                }
                if ((_a = this.breadcrumbs.textExpr) === null || _a === void 0 ? void 0 : _a.hasRelevance) {
                    return true;
                }
                var refineExpr = this.breadcrumbs.findSelect("refine");
                return (refineExpr === null || refineExpr === void 0 ? void 0 : refineExpr.hasRelevance) || false;
            },
            enumerable: false,
            configurable: true
        });
        SearchService.prototype.selectTab = function (arg, options) {
            if (options === void 0) { options = {}; }
            options.selectTab = true;
            var tabName = typeof arg === 'string' ? arg : arg.name;
            this.query.tab = tabName;
            delete this.query.queryId; // SBA-154
            this._events.next({ type: "before-select-tab", query: this.query });
            return this.search(options, this.makeAuditEvent({
                type: "Search_GotoTab" /* Search_GotoTab */,
                detail: {
                    tab: tabName,
                    "from-result-id": !!this.results ? this.results.id : null
                }
            }));
        };
        SearchService.prototype.selectScope = function (scope) {
            this.query.scope = scope;
        };
        SearchService.prototype.getTab = function (tabName) {
            var e_6, _f;
            if (this.results && this.results.tabs) {
                try {
                    for (var _g = __values(this.results.tabs), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var tab = _h.value;
                        if (base.Utils.equals(tab.name, tabName)) {
                            return tab;
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_h && !_h.done && (_f = _g.return)) _f.call(_g);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
            return undefined;
        };
        SearchService.prototype.getCurrentTab = function () {
            if (this.results && this.results.tab) {
                return this.getTab(this.results.tab);
            }
            return undefined;
        };
        SearchService.prototype.notifyOpenOriginalDocument = function (record, resultId) {
            var _a, _b, _c, _d, _e;
            var results = this.results && this.results.records && this.results.records.includes(record) ? this.results : undefined;
            this._events.next({ type: "open-original-document", record: record });
            var querylang = ((_b = (_a = this.results) === null || _a === void 0 ? void 0 : _a.queryAnalysis) === null || _b === void 0 ? void 0 : _b.queryLanguage) || ((_c = this.query) === null || _c === void 0 ? void 0 : _c.questionLanguage)
                || ((_e = (_d = this.appService) === null || _d === void 0 ? void 0 : _d.ccquery) === null || _e === void 0 ? void 0 : _e.questionLanguage);
            this.auditService.notifyDocument("Click_ResultLink" /* Click_ResultLink */, record, results || resultId || "", {
                text: this.query.text,
                querylang: querylang,
            }, {
                queryhash: results ? results.rfmQueryHash : undefined,
                querytext: this.query.text,
                querylang: querylang
            });
        };
        SearchService.prototype.checkBeforeSearch = function (cancelReasons) {
            var beforeSearch = { type: "before-search" };
            this._events.next(beforeSearch);
            if (cancelReasons && beforeSearch.cancelReasons) {
                cancelReasons.splice.apply(cancelReasons, __spread([0, 0], beforeSearch.cancelReasons));
            }
            return !beforeSearch.cancel;
        };
        return SearchService;
    }());
    exports.SearchService.ɵfac = function SearchService_Factory(t) { return new (t || exports.SearchService)(i0.ɵɵinject(SEARCH_OPTIONS, 8), i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.AppService), i0.ɵɵinject(i3.QueryWebService), i0.ɵɵinject(i4.LoginService), i0.ɵɵinject(i3$1.IntlService), i0.ɵɵinject(i2.FormatService), i0.ɵɵinject(i3.AuditWebService), i0.ɵɵinject(i6.NotificationsService), i0.ɵɵinject(i2.ExprBuilder)); };
    exports.SearchService.ɵprov = i0.ɵɵdefineInjectable({ token: exports.SearchService, factory: exports.SearchService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(exports.SearchService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [SEARCH_OPTIONS]
                        }] }, { type: i1.Router }, { type: i2.AppService }, { type: i3.QueryWebService }, { type: i4.LoginService }, { type: i3$1.IntlService }, { type: i2.FormatService }, { type: i3.AuditWebService }, { type: i6.NotificationsService }, { type: i2.ExprBuilder }];
        }, null);
    })();
    (function (SearchService) {
        SearchService.DefaultPageSize = 20;
    })(exports.SearchService || (exports.SearchService = {}));

    var FIRST_PAGE_OPTIONS = new i0.InjectionToken("FIRST_PAGE_OPTIONS");
    var FirstPageService = /** @class */ (function () {
        function FirstPageService(options, searchService, router) {
            var _this = this;
            this.options = options;
            this.searchService = searchService;
            this.router = router;
            if (!this.options) {
                this.options = {};
            }
            this.searchSubscription = this.searchService.events.subscribe(function (event) {
                if (event.type === "clear") {
                    if (_this.displayOnHomePage(event.path)) {
                        base.Utils.subscribe(_this.getFirstPage(), function (results) {
                            _this.searchService.setResults(results);
                        });
                    }
                }
            });
        }
        FirstPageService.prototype.ngOnDestroy = function () {
            this.searchSubscription.unsubscribe();
        };
        Object.defineProperty(FirstPageService.prototype, "isFirstPage", {
            /**
             * @ignore
             * legacy
             */
            get: function () {
                return this.isCurrentSearchResults;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FirstPageService.prototype, "isCurrentSearchResults", {
            get: function () {
                return !!this.searchService.results && this.searchService.results === this.firstPage;
            },
            enumerable: false,
            configurable: true
        });
        FirstPageService.prototype.displayOnHomePage = function (path) {
            var e_1, _a;
            if (base.Utils.isArray(this.options.displayOnHomePage)) {
                if (!path) {
                    var url = base.Utils.makeURL(this.router.url);
                    path = url.pathname;
                }
                try {
                    for (var _b = __values(this.options.displayOnHomePage), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var path1 = _c.value;
                        if (base.Utils.endsWith(path, base.Utils.addUrl("/", path1))) {
                            return true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return false;
            }
            else {
                return !!this.options.displayOnHomePage;
            }
        };
        FirstPageService.prototype.getFirstPage = function () {
            var _this = this;
            if (this.firstPage) {
                return rxjs.of(this.firstPage);
            }
            var query = this.searchService.makeQuery();
            query.isFirstPage = true;
            var observable = this.searchService.getResults(query, {
                type: "Search_FirstPage" /* Search_FirstPage */
            }, {
                searchInactive: true
            });
            base.Utils.subscribe(observable, function (results) {
                _this.firstPage = results;
                return results;
            });
            return observable;
        };
        return FirstPageService;
    }());
    FirstPageService.ɵfac = function FirstPageService_Factory(t) { return new (t || FirstPageService)(i0.ɵɵinject(FIRST_PAGE_OPTIONS, 8), i0.ɵɵinject(exports.SearchService), i0.ɵɵinject(i1.Router)); };
    FirstPageService.ɵprov = i0.ɵɵdefineInjectable({ token: FirstPageService, factory: FirstPageService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(FirstPageService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [FIRST_PAGE_OPTIONS]
                        }] }, { type: exports.SearchService }, { type: i1.Router }];
        }, null);
    })();

    var _c0 = function (a0) { return { withFields: a0, asHTML: true }; };
    function BsBreadcrumbs_ng_container_4_li_1_a_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r8_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 9);
            i0.ɵɵlistener("click", function BsBreadcrumbs_ng_container_4_li_1_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r8_1); var item_r1 = i0.ɵɵnextContext(2).$implicit; var ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.selectItem(item_r1); });
            i0.ɵɵpipe(1, "sqExpr");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r1 = i0.ɵɵnextContext(2).$implicit;
            var ctx_r3 = i0.ɵɵnextContext();
            i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind2(1, 1, item_r1.display, i0.ɵɵpureFunction1(4, _c0, ctx_r3.displayFieldNames)), i0.ɵɵsanitizeHtml);
        }
    }
    function BsBreadcrumbs_ng_container_4_li_1_span_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span", 10);
            i0.ɵɵpipe(1, "sqExpr");
        }
        if (rf & 2) {
            var item_r1 = i0.ɵɵnextContext(2).$implicit;
            var ctx_r4 = i0.ɵɵnextContext();
            i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind2(1, 1, item_r1.display, i0.ɵɵpureFunction1(4, _c0, ctx_r4.displayFieldNames)), i0.ɵɵsanitizeHtml);
        }
    }
    function BsBreadcrumbs_ng_container_4_li_1_span_3_Template(rf, ctx) {
        if (rf & 1) {
            var _r13_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "span", 11);
            i0.ɵɵlistener("click", function BsBreadcrumbs_ng_container_4_li_1_span_3_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r13_1); var item_r1 = i0.ɵɵnextContext(2).$implicit; var ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.removeItem(item_r1); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 1, "msg#breadcrumbs.itemRemove"));
        }
    }
    function BsBreadcrumbs_ng_container_4_li_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "li");
            i0.ɵɵtemplate(1, BsBreadcrumbs_ng_container_4_li_1_a_1_Template, 2, 6, "a", 6);
            i0.ɵɵtemplate(2, BsBreadcrumbs_ng_container_4_li_1_span_2_Template, 2, 6, "span", 7);
            i0.ɵɵtemplate(3, BsBreadcrumbs_ng_container_4_li_1_span_3_Template, 2, 3, "span", 8);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r1 = i0.ɵɵnextContext().$implicit;
            var ctx_r2 = i0.ɵɵnextContext();
            i0.ɵɵclassMapInterpolate2("breadcrumb-item ", item_r1.active ? "active" : "", " sq-breadcrumb-item  sq-breadcrumb-item-", ctx_r2.getField(item_r1), "");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !item_r1.active);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", item_r1.active);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r2.allowDeletion);
        }
    }
    function BsBreadcrumbs_ng_container_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsBreadcrumbs_ng_container_4_li_1_Template, 4, 7, "li", 5);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var item_r1 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !item_r1.hidden);
        }
    }
    var BsBreadcrumbs = /** @class */ (function () {
        function BsBreadcrumbs(searchService) {
            this.searchService = searchService;
            this.allowDeletion = true;
            this.displayFieldNames = true;
        }
        BsBreadcrumbs.prototype.getField = function (item) {
            if (item.expr) {
                if (item.expr.field) {
                    return item.expr.field;
                }
                else {
                    if (!item.expr.isStructured) {
                        return "text";
                    }
                    else {
                        var fields = item.expr.getFields();
                        return fields.join("-");
                    }
                }
            }
            return "unknown";
        };
        BsBreadcrumbs.prototype.home = function () {
            this.searchService.home();
            return false;
        };
        BsBreadcrumbs.prototype.selectItem = function (item) {
            this.searchService.selectBreadcrumbsItem(item);
            return false;
        };
        BsBreadcrumbs.prototype.removeItem = function (item) {
            this.searchService.removeBreadcrumbsItem(item);
        };
        return BsBreadcrumbs;
    }());
    BsBreadcrumbs.ɵfac = function BsBreadcrumbs_Factory(t) { return new (t || BsBreadcrumbs)(i0.ɵɵdirectiveInject(exports.SearchService)); };
    BsBreadcrumbs.ɵcmp = i0.ɵɵdefineComponent({ type: BsBreadcrumbs, selectors: [["sq-breadcrumbs"]], inputs: { results: "results", allowDeletion: "allowDeletion", displayFieldNames: "displayFieldNames" }, decls: 5, vars: 1, consts: [[1, "breadcrumb"], [1, "breadcrumb-item"], ["href", "#", "title", "Home", 3, "click"], [1, "fas", "fa-home"], [4, "ngFor", "ngForOf"], [3, "class", 4, "ngIf"], ["href", "#", 3, "innerHTML", "click", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], ["class", "fas fa-times", "role", "button", 3, "title", "click", 4, "ngIf"], ["href", "#", 3, "innerHTML", "click"], [3, "innerHTML"], ["role", "button", 1, "fas", "fa-times", 3, "title", "click"]], template: function BsBreadcrumbs_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "ol", 0);
                i0.ɵɵelementStart(1, "li", 1);
                i0.ɵɵelementStart(2, "a", 2);
                i0.ɵɵlistener("click", function BsBreadcrumbs_Template_a_click_2_listener() { return ctx.home(); });
                i0.ɵɵelement(3, "span", 3);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(4, BsBreadcrumbs_ng_container_4_Template, 2, 1, "ng-container", 4);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(4);
                i0.ɵɵproperty("ngForOf", ctx.searchService.breadcrumbs == null ? null : ctx.searchService.breadcrumbs.items);
            }
        }, directives: [i2$1.NgForOf, i2$1.NgIf], pipes: [i4$1.ExprPipe, i3$1.MessagePipe], styles: [".breadcrumb[_ngcontent-%COMP%]{background-color:inherit;font-size:.85rem;margin-bottom:0;padding:.375rem 0}.sq-breadcrumbs-remove[_ngcontent-%COMP%]{color:#d3d3d3;cursor:pointer}.sq-breadcrumbs-remove[_ngcontent-%COMP%]:hover{color:#a9a9a9}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsBreadcrumbs, [{
                type: i0.Component,
                args: [{
                        selector: "sq-breadcrumbs",
                        templateUrl: "./breadcrumbs.html",
                        styleUrls: ["./breadcrumbs.css"]
                    }]
            }], function () { return [{ type: exports.SearchService }]; }, { results: [{
                    type: i0.Input
                }], allowDeletion: [{
                    type: i0.Input
                }], displayFieldNames: [{
                    type: i0.Input
                }] });
    })();

    function BsDidYouMean_div_0_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r5_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementStart(3, "a", 3);
            i0.ɵɵlistener("click", function BsDidYouMean_div_0_ng_container_1_Template_a_click_3_listener() { i0.ɵɵrestoreView(_r5_1); var ctx_r4 = i0.ɵɵnextContext(2); return ctx_r4.selectCorrected(); });
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "sqMessage");
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 3, "msg#didYouMean.dymonlyBeforeCorrected"), "");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx_r1.item.corrected);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(6, 5, "msg#didYouMean.dymonlyAfterCorrected"), " ");
        }
    }
    function BsDidYouMean_div_0_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r7_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementStart(3, "a", 3);
            i0.ɵɵlistener("click", function BsDidYouMean_div_0_ng_container_2_Template_a_click_3_listener() { i0.ɵɵrestoreView(_r7_1); var ctx_r6 = i0.ɵɵnextContext(2); return ctx_r6.selectCorrected(); });
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "sqMessage");
            i0.ɵɵelementStart(7, "a", 4);
            i0.ɵɵlistener("click", function BsDidYouMean_div_0_ng_container_2_Template_a_click_7_listener() { i0.ɵɵrestoreView(_r7_1); var ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.selectOriginal(); });
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(9);
            i0.ɵɵpipe(10, "sqMessage");
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 5, "msg#didYouMean.correctBeforeCorrected"), "");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx_r2.item.corrected);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 7, "msg#didYouMean.correctBeforeOriginal"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx_r2.item.original);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(10, 9, "msg#didYouMean.correctAfterOriginal"), " ");
        }
    }
    function BsDidYouMean_div_0_ng_container_3_Template(rf, ctx) {
        if (rf & 1) {
            var _r10_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementStart(3, "a", 4);
            i0.ɵɵlistener("click", function BsDidYouMean_div_0_ng_container_3_Template_a_click_3_listener() { i0.ɵɵrestoreView(_r10_1); var ctx_r9 = i0.ɵɵnextContext(2); return ctx_r9.selectOriginal(); });
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "sqMessage");
            i0.ɵɵelementStart(7, "a", 4);
            i0.ɵɵlistener("click", function BsDidYouMean_div_0_ng_container_3_Template_a_click_7_listener() { i0.ɵɵrestoreView(_r10_1); var ctx_r11 = i0.ɵɵnextContext(2); return ctx_r11.selectCorrected(); });
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(9);
            i0.ɵɵpipe(10, "sqMessage");
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r3 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 5, "msg#didYouMean.smartBeforeOriginal"), "");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx_r3.item.original);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 7, "msg#didYouMean.smartBeforeCorrected"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx_r3.item.corrected);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(10, 9, "msg#didYouMean.smartAfterCorrected"), " ");
        }
    }
    function BsDidYouMean_div_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵtemplate(1, BsDidYouMean_div_0_ng_container_1_Template, 7, 7, "ng-container", 2);
            i0.ɵɵtemplate(2, BsDidYouMean_div_0_ng_container_2_Template, 11, 11, "ng-container", 2);
            i0.ɵɵtemplate(3, BsDidYouMean_div_0_ng_container_3_Template, 11, 11, "ng-container", 2);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵclassMapInterpolate1("sq-did-you-mean sq-text ", "sq-" + ctx_r0.context, "");
            i0.ɵɵproperty("ngSwitch", ctx_r0.results.didYouMean.spellingCorrectionMode);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngSwitchCase", "DYMOnly");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngSwitchCase", "Correct");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngSwitchCase", "Smart");
        }
    }
    var BsDidYouMean = /** @class */ (function () {
        function BsDidYouMean(searchService) {
            this.searchService = searchService;
            this.context = "search";
        }
        BsDidYouMean.prototype.handleResults = function () {
            this.item = undefined;
            if (this.results && this.results.didYouMean) {
                if (this.context === "search") {
                    var item = this.results.didYouMean.text;
                    if (item && item.corrected) {
                        this.item = item;
                    }
                }
                else {
                    var refineSelect = this.searchService.query.findSelect("refine");
                    if (refineSelect && base.Utils.startsWith(refineSelect.expression, "refine:") && !!this.results.didYouMean.refine) {
                        var dymItem = this.results.didYouMean.refine[this.results.didYouMean.refine.length - 1];
                        if (dymItem.corrected) {
                            this.item = dymItem;
                        }
                    }
                }
            }
        };
        BsDidYouMean.prototype.ngOnChanges = function (changes) {
            if (!!changes["results"]) {
                this.handleResults();
            }
        };
        BsDidYouMean.prototype.selectOriginal = function () {
            if (this.item) {
                this.searchService.didYouMean(this.item.original, this.context, i3.DidYouMeanKind.Original);
            }
            return false;
        };
        BsDidYouMean.prototype.selectCorrected = function () {
            if (this.item) {
                this.searchService.didYouMean(this.item.corrected, this.context, i3.DidYouMeanKind.Corrected);
            }
            return false;
        };
        return BsDidYouMean;
    }());
    BsDidYouMean.ɵfac = function BsDidYouMean_Factory(t) { return new (t || BsDidYouMean)(i0.ɵɵdirectiveInject(exports.SearchService)); };
    BsDidYouMean.ɵcmp = i0.ɵɵdefineComponent({ type: BsDidYouMean, selectors: [["sq-did-you-mean"]], inputs: { results: "results", context: "context" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "class", "ngSwitch", 4, "ngIf"], [3, "ngSwitch"], [4, "ngSwitchCase"], ["href", "#", 1, "sq-did-you-mean-corrected", 3, "click"], ["href", "#", 1, "sq-did-you-mean-original", 3, "click"]], template: function BsDidYouMean_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsDidYouMean_div_0_Template, 4, 7, "div", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !!ctx.item);
            }
        }, directives: [i2$1.NgIf, i2$1.NgSwitch, i2$1.NgSwitchCase], pipes: [i3$1.MessagePipe], styles: [".sq-did-you-mean[_ngcontent-%COMP%]   .sq-did-you-mean-corrected[_ngcontent-%COMP%], .sq-did-you-mean[_ngcontent-%COMP%]   .sq-did-you-mean-original[_ngcontent-%COMP%]{font-style:italic}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsDidYouMean, [{
                type: i0.Component,
                args: [{
                        selector: "sq-did-you-mean",
                        templateUrl: "./did-you-mean.html",
                        styleUrls: ["./did-you-mean.css"]
                    }]
            }], function () { return [{ type: exports.SearchService }]; }, { results: [{
                    type: i0.Input
                }], context: [{
                    type: i0.Input
                }] });
    })();

    var _c0$1 = function (a0) { return [a0]; };
    var _c1 = function (a0, a2) { return { items: a0, autoAdjust: true, rightAligned: a2 }; };
    function BsPageSizeSelector_div_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵelement(1, "div", 2);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction2(3, _c1, i0.ɵɵpureFunction1(1, _c0$1, ctx_r0.pageSizingAction), ctx_r0.rightAligned));
        }
    }
    //import {ResultsView} from '@sinequa/components/results-view';
    // TODO restore functionality of storing page size in user settings ?
    /**
     * Component for choosing the page size of the results view
     *
     */
    var BsPageSizeSelector = /** @class */ (function () {
        function BsPageSizeSelector(appService, searchService) {
            this.appService = appService;
            this.searchService = searchService;
            //@Input() resultsView: ResultsView;
            this.showInRegularView = true;
        }
        BsPageSizeSelector.prototype.ngOnChanges = function (changes) {
            this.refreshVisualisation();
        };
        Object.defineProperty(BsPageSizeSelector.prototype, "configPageSize", {
            /*
            private get globalPageSize(): number {
                const globalQueryParams = this.userSettingsService.getUserSettings().queryParams;
                return globalQueryParams ? globalQueryParams.pageSize : undefined;
            }
            */
            get: function () {
                return this.appService.ccquery ? this.appService.ccquery.pageSize : 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsPageSizeSelector.prototype, "defaultPageSize", {
            get: function () {
                //let res = this.globalPageSize;
                //if (!res) {
                var res = this.configPageSize;
                if (!res) {
                    res = exports.SearchService.DefaultPageSize;
                }
                //}
                return res;
            },
            enumerable: false,
            configurable: true
        });
        BsPageSizeSelector.prototype.buildPageSizingAction = function () {
            var e_1, _b;
            var _this = this;
            this.availableSizes = this.pageSizes ? this.pageSizes.slice(0) : [];
            this.availableSizes.sort(function (a, b) { return a - b; });
            var children = [];
            children.push(new i3$2.Action({
                text: 'msg#pageSizeSelector.defaultPageSize',
                messageParams: { values: { size: this.defaultPageSize } },
                data: undefined,
                action: function (item, event) {
                    _this.updatePageSize(item.data);
                }
            }));
            try {
                for (var _c = __values(this.availableSizes), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var size = _d.value;
                    children.push(new i3$2.Action({
                        text: size.toString(),
                        data: size,
                        action: function (item, event) {
                            _this.updatePageSize(item.data);
                        }
                    }));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return new i3$2.Action({
                icon: 'fas fa-arrows-alt-v',
                text: 'msg#pageSizeSelector.pageSizeChoice',
                children: children
            });
        };
        BsPageSizeSelector.prototype.refreshVisualisation = function () {
            this.pageSizingAction = this.buildPageSizingAction();
            if (this.results) {
                //const queryParams = this.userSettingsService.getViewQueryParams(this.resultsView.name);
                //this.currentPageSize = queryParams.pageSize;
                this.setCurrentSize(this.currentPageSize);
            }
        };
        BsPageSizeSelector.prototype.setCurrentSize = function (size) {
            var _a;
            if (!size) {
                this.pageSizingAction.text = 'msg#pageSizeSelector.defaultPageSizeChoice';
                this.pageSizingAction.messageParams = { values: { size: this.defaultPageSize } };
            }
            else {
                var selectedAction = (_a = this.pageSizingAction.children) === null || _a === void 0 ? void 0 : _a.find(function (action) { return action.data === size; });
                this.pageSizingAction.text = 'msg#pageSizeSelector.pageSizeChoice';
                this.pageSizingAction.messageParams = { values: { size: selectedAction === null || selectedAction === void 0 ? void 0 : selectedAction.data } };
            }
        };
        BsPageSizeSelector.prototype.updatePageSize = function (size) {
            if (this.currentPageSize !== size) {
                //this.userSettingsService.saveResultsViewPageSize(this.resultsView.name, size);
                this.currentPageSize = size;
                this.searchService.query.pageSize = size;
                this.searchService.search();
            }
            this.setCurrentSize(size);
        };
        return BsPageSizeSelector;
    }());
    BsPageSizeSelector.ɵfac = function BsPageSizeSelector_Factory(t) { return new (t || BsPageSizeSelector)(i0.ɵɵdirectiveInject(i2.AppService), i0.ɵɵdirectiveInject(exports.SearchService)); };
    BsPageSizeSelector.ɵcmp = i0.ɵɵdefineComponent({ type: BsPageSizeSelector, selectors: [["sq-page-size-selector"]], inputs: { results: "results", showInRegularView: "showInRegularView", showInCustomization: "showInCustomization", pageSizes: "pageSizes", rightAligned: "rightAligned" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "btn-toolbar", 4, "ngIf"], [1, "btn-toolbar"], [1, "btn-group", 3, "sq-action-buttons"]], template: function BsPageSizeSelector_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsPageSizeSelector_div_0_Template, 2, 6, "div", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !!ctx.results);
            }
        }, directives: [i2$1.NgIf, i3$2.BsActionButtons], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsPageSizeSelector, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-page-size-selector',
                        templateUrl: './page-size-selector.html'
                    }]
            }], function () { return [{ type: i2.AppService }, { type: exports.SearchService }]; }, { results: [{
                    type: i0.Input
                }], showInRegularView: [{
                    type: i0.Input
                }], showInCustomization: [{
                    type: i0.Input
                }], pageSizes: [{
                    type: i0.Input
                }], rightAligned: [{
                    type: i0.Input
                }] });
    })();

    var _c0$2 = function (a0) { return { page: a0 }; };
    var _c1$1 = function (a0) { return { values: a0 }; };
    var _c2 = function (a0, a1, a2, a3, a4) { return { "active": a0, "disabled": a1, "sq-navigation": a2, "sq-page": a3, "sq-ellipsis": a4 }; };
    function BsPager_ul_0_li_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r4_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "li", 3);
            i0.ɵɵlistener("click", function BsPager_ul_0_li_1_Template_li_click_0_listener() { i0.ɵɵrestoreView(_r4_1); var item_r2 = ctx.$implicit; var ctx_r3 = i0.ɵɵnextContext(2); return ctx_r3.gotoPage(item_r2.page); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelementStart(2, "a", 4);
            i0.ɵɵelementStart(3, "span");
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "sqNumber");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r2 = ctx.$implicit;
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind2(1, 3, item_r2.title, i0.ɵɵpureFunction1(10, _c1$1, i0.ɵɵpureFunction1(8, _c0$2, item_r2.page))));
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction5(12, _c2, item_r2.active, item_r2.disabled, item_r2.isNavigation, item_r2.isPage, item_r2.isEllipsis));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 6, item_r2.display));
        }
    }
    function BsPager_ul_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "ul", 1);
            i0.ɵɵtemplate(1, BsPager_ul_0_li_1_Template, 6, 18, "li", 2);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r0.items);
        }
    }
    exports.BsPager = /** @class */ (function () {
        function BsPager(searchService) {
            this.searchService = searchService;
            this.showNavigation = true;
            this.showFirstLast = true;
            this.showPages = true;
            this.endPages = 1;
            this.pages = 5;
            this.pageCount = 0;
        }
        BsPager.prototype.ngOnChanges = function (changes) {
            if (changes["results"]) {
                this.makeItems();
            }
        };
        BsPager.prototype.makeItems = function () {
            this.pageCount = this.searchService.pageCount;
            this.currentPage = this.searchService.page;
            if (this.pageCount === 0) {
                this.items = undefined;
                return;
            }
            var endPages = this.endPages;
            if (!endPages || endPages <= 0) {
                endPages = 1;
            }
            var endWidth = endPages + 1; // +1 for the …
            var pages = this.pages;
            if (!pages) {
                pages = 3 + endWidth * 2;
            }
            if (pages < 3 + endWidth * 2) {
                pages = 3 + endWidth * 2; // 3 is the minimum number of pages to show between the … separators
            }
            var split1 = -1, split2 = -1;
            if (this.pageCount <= pages) {
                pages = this.pageCount;
            }
            else {
                // pages must be an odd number to accommodate:  (First page) … (Current page - 1) (Current page) (Current page + 1) … (Last page)
                pages = Math.floor(pages / 2) * 2 + 1;
                var mid = pages - endWidth * 2;
                var delta = Math.floor(mid / 2);
                if ((this.currentPage - delta) > endPages + 1 + 1) {
                    split1 = this.currentPage - delta;
                }
                if ((this.currentPage + delta) < (this.pageCount - endWidth)) {
                    split2 = this.currentPage + delta;
                }
                if (split1 === -1 && split2 !== -1) {
                    split2 += endPages + 1 + 1 - (this.currentPage - delta);
                }
                else if (split2 === -1 && split1 !== -1) {
                    split1 -= (this.currentPage + delta) - (this.pageCount - endWidth);
                }
            }
            this.items = [];
            if (this.showNavigation) {
                if (this.showFirstLast) {
                    this.items.push(new BsPager.Item(1, this.currentPage, BsPager.FIRST_PAGE, "msg#pager.firstPage"));
                }
                this.items.push(new BsPager.Item(this.currentPage > 1 ? this.currentPage - 1 : 1, this.currentPage, BsPager.PREVIOUS_PAGE, "msg#pager.previousPage"));
            }
            if (this.showPages) {
                for (var i = 1, ic = split1 !== -1 ? endPages : split2 !== -1 ? split2 : this.pageCount; i <= ic; i++) {
                    this.items.push(new BsPager.Item(i, this.currentPage));
                }
                if (split1 !== -1) {
                    this.items.push(new BsPager.Item(0, this.currentPage, BsPager.ELLIPSIS));
                    for (var i = split1, ic = split2 !== -1 ? split2 : this.pageCount; i <= ic; i++) {
                        this.items.push(new BsPager.Item(i, this.currentPage));
                    }
                }
                if (split2 !== -1) {
                    this.items.push(new BsPager.Item(0, this.currentPage, BsPager.ELLIPSIS));
                    for (var i = this.pageCount - endPages + 1, ic = this.pageCount; i <= ic; i++) {
                        this.items.push(new BsPager.Item(i, this.currentPage));
                    }
                }
            }
            if (this.showNavigation) {
                this.items.push(new BsPager.Item(this.currentPage < this.pageCount ? this.currentPage + 1 : this.pageCount, this.currentPage, BsPager.NEXT_PAGE, "msg#pager.nextPage"));
                if (this.showFirstLast) {
                    this.items.push(new BsPager.Item(this.pageCount, this.currentPage, BsPager.LAST_PAGE, "msg#pager.lastPage"));
                }
            }
        };
        BsPager.prototype.gotoPage = function (page) {
            if (page !== this.currentPage && page > 0) {
                this.searchService.gotoPage(page);
            }
        };
        return BsPager;
    }());
    exports.BsPager.FIRST_PAGE = "«";
    exports.BsPager.PREVIOUS_PAGE = "‹";
    exports.BsPager.NEXT_PAGE = "›";
    exports.BsPager.LAST_PAGE = "»";
    exports.BsPager.ELLIPSIS = "…";
    exports.BsPager.ɵfac = function BsPager_Factory(t) { return new (t || exports.BsPager)(i0.ɵɵdirectiveInject(exports.SearchService)); };
    exports.BsPager.ɵcmp = i0.ɵɵdefineComponent({ type: exports.BsPager, selectors: [["sq-pager"]], inputs: { results: "results", showNavigation: "showNavigation", showFirstLast: "showFirstLast", showPages: "showPages", endPages: "endPages", pages: "pages" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "pagination my-0", 4, "ngIf"], [1, "pagination", "my-0"], ["class", "page-item", 3, "title", "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "page-item", 3, "title", "ngClass", "click"], ["href", "javascript:void(0)", 1, "page-link"]], template: function BsPager_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsPager_ul_0_Template, 2, 1, "ul", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.pageCount > 1);
            }
        }, directives: [i2$1.NgIf, i2$1.NgForOf, i2$1.NgClass], pipes: [i3$1.MessagePipe, i4$1.NumberPipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(exports.BsPager, [{
                type: i0.Component,
                args: [{
                        selector: "sq-pager",
                        templateUrl: "./pager.html",
                    }]
            }], function () { return [{ type: exports.SearchService }]; }, { results: [{
                    type: i0.Input
                }], showNavigation: [{
                    type: i0.Input
                }], showFirstLast: [{
                    type: i0.Input
                }], showPages: [{
                    type: i0.Input
                }], endPages: [{
                    type: i0.Input
                }], pages: [{
                    type: i0.Input
                }] });
    })();
    (function (BsPager) {
        var Item = /** @class */ (function () {
            function Item(page, currentPage, display, title) {
                this.page = page;
                this.currentPage = currentPage;
                this.display = display;
                this.title = title;
                if (display) {
                    this.display = display;
                }
                else {
                    this.display = page;
                }
                if (base.Utils.isUndefined(title) && page) {
                    this.title = "msg#pager.pageNumberTitle";
                }
            }
            Object.defineProperty(Item.prototype, "active", {
                get: function () {
                    return this.isPage && (this.currentPage === this.page);
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(Item.prototype, "disabled", {
                get: function () {
                    return this.isEllipsis || ((this.currentPage === this.page) && this.isNavigation);
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(Item.prototype, "isNavigation", {
                get: function () {
                    return this.display === BsPager.FIRST_PAGE ||
                        this.display === BsPager.PREVIOUS_PAGE ||
                        this.display === BsPager.NEXT_PAGE ||
                        this.display === BsPager.LAST_PAGE;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(Item.prototype, "isPage", {
                get: function () {
                    return !!this.page && !this.isNavigation;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(Item.prototype, "isEllipsis", {
                get: function () {
                    return this.display === BsPager.ELLIPSIS;
                },
                enumerable: false,
                configurable: true
            });
            return Item;
        }());
        BsPager.Item = Item;
    })(exports.BsPager || (exports.BsPager = {}));

    var _c0$3 = function (a0) { return [a0]; };
    var _c1$2 = function (a0, a1, a3, a4) { return { items: a0, style: a1, autoAdjust: true, rightAligned: a3, size: a4 }; };
    var BsSortSelector = /** @class */ (function () {
        function BsSortSelector(appService, searchService) {
            this.appService = appService;
            this.searchService = searchService;
        }
        BsSortSelector.prototype.ngOnChanges = function (changes) {
            if (changes["results"]) {
                this.buildSortAction();
            }
        };
        BsSortSelector.prototype.setCurrentSort = function (name) {
            if (this.sortAction) {
                var sortingChoices = this.getSortingChoices();
                var current = sortingChoices && sortingChoices.find(function (value) {
                    return base.Utils.eqNC(value.name, name);
                });
                if (current) {
                    var queryOrderBy = this.searchService.query.orderBy;
                    this.sortAction.text = !!queryOrderBy ? "msg#sortSelector.sortOther" : current.display || current.name;
                    this.sortAction.icon = !!queryOrderBy ? 'fas fa-sort'
                        : this.isAscendingSort(current.orderByClause) ? 'fas fa-sort-amount-up'
                            : this.isDescendingSort(current.orderByClause) ? 'fas fa-sort-amount-down' : 'fas fa-sort';
                }
                else {
                    this.sortAction.text = "msg#sortSelector.sortOther";
                    this.sortAction.icon = "fas fa-sort";
                }
                this.sortAction.messageParams = { values: { text: this.sortAction.text } }; // for title
            }
        };
        BsSortSelector.prototype.selectSort = function (sortingChoice) {
            this.setCurrentSort(sortingChoice.name);
            this.searchService.query.sort = sortingChoice.name;
            var audit = {
                type: "Search_Sort" /* Search_Sort */,
                detail: {
                    sort: sortingChoice.name,
                    orderByClause: sortingChoice.orderByClause,
                }
            };
            this.searchService.search(undefined, audit);
        };
        BsSortSelector.prototype.buildSortAction = function () {
            var _this = this;
            var sortingChoices = this.getSortingChoices();
            if (!sortingChoices || sortingChoices.length === 0) {
                this.sortAction = undefined;
                return;
            }
            this.sortAction = new i3$2.Action({
                title: "msg#sortSelector.sortByTitle",
                children: sortingChoices
                    .filter(function (sortingChoice) { return _this.searchService.hasRelevance || !base.Utils.includes(sortingChoice.orderByClause, "globalrelevance"); })
                    .map(function (sortingChoice) { return new i3$2.Action({
                    icon: _this.isAscendingSort(sortingChoice.orderByClause) ? 'fas fa-sort-amount-up'
                        : _this.isDescendingSort(sortingChoice.orderByClause) ? 'fas fa-sort-amount-down' : '',
                    text: sortingChoice.display || sortingChoice.name,
                    data: sortingChoice,
                    action: function (item, event) {
                        _this.selectSort(item.data);
                    }
                }); })
            });
            if (!!this.searchService.results) {
                this.setCurrentSort(this.searchService.results.sort);
            }
        };
        BsSortSelector.prototype.isAscendingSort = function (orderByClause) {
            if (!orderByClause) {
                return false;
            }
            var lastElement = orderByClause.substring(orderByClause.lastIndexOf(' ') + 1);
            return base.Utils.eqNC('asc', lastElement);
        };
        BsSortSelector.prototype.isDescendingSort = function (orderByClause) {
            if (!orderByClause) {
                return false;
            }
            var lastElement = orderByClause.substring(orderByClause.lastIndexOf(' ') + 1);
            return base.Utils.eqNC('desc', lastElement);
        };
        BsSortSelector.prototype.isTabSearch = function () {
            var query = this.appService.ccquery;
            if (!query)
                return false;
            var tabSearch = query.tabSearch;
            return !(!tabSearch || !tabSearch.column || !tabSearch.isActive ||
                !tabSearch.tabs || tabSearch.tabs.length === 0);
        };
        BsSortSelector.prototype.getSortingChoices = function () {
            var e_1, _a;
            if (this.isTabSearch()) {
                var tabName = this.searchService.results && this.searchService.results.tab;
                if (tabName && this.appService.ccquery) {
                    try {
                        for (var _b = __values(this.appService.ccquery.tabSearch.tabs), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var t = _c.value;
                            if (t.name === tabName) {
                                var s = t.sortingChoices;
                                if (s && s.length > 0)
                                    return s;
                                else
                                    break;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
            var q = this.appService.ccquery;
            return q && q.sortingChoices;
        };
        return BsSortSelector;
    }());
    BsSortSelector.ɵfac = function BsSortSelector_Factory(t) { return new (t || BsSortSelector)(i0.ɵɵdirectiveInject(i2.AppService), i0.ɵɵdirectiveInject(exports.SearchService)); };
    BsSortSelector.ɵcmp = i0.ɵɵdefineComponent({ type: BsSortSelector, selectors: [["sq-sort-selector"]], inputs: { results: "results", rightAligned: "rightAligned", style: "style", size: "size" }, features: [i0.ɵɵNgOnChangesFeature], decls: 2, vars: 9, consts: [["role", "toolbar", "aria-label", "Toolbar", 1, "btn-toolbar"], [1, "btn-group", 3, "hidden", "sq-action-buttons"]], template: function BsSortSelector_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelement(1, "div", 1);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("hidden", !ctx.searchService.haveRecords || !ctx.sortAction)("sq-action-buttons", i0.ɵɵpureFunction4(4, _c1$2, i0.ɵɵpureFunction1(2, _c0$3, ctx.sortAction), ctx.style, ctx.rightAligned, ctx.size));
            }
        }, directives: [i3$2.BsActionButtons], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsSortSelector, [{
                type: i0.Component,
                args: [{
                        selector: "sq-sort-selector",
                        templateUrl: "./sort-selector.html"
                    }]
            }], function () { return [{ type: i2.AppService }, { type: exports.SearchService }]; }, { results: [{
                    type: i0.Input
                }], rightAligned: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], size: [{
                    type: i0.Input
                }] });
    })();

    var _c0$4 = function (a0, a1) { return { "active": a0, "disabled": a1 }; };
    function BsTabs_ul_0_ng_container_1_li_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r6_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "li", 4);
            i0.ɵɵelementStart(1, "a", 5);
            i0.ɵɵlistener("click", function BsTabs_ul_0_ng_container_1_li_1_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r6_1); var tab_r4 = ctx.$implicit; var ctx_r5 = i0.ɵɵnextContext(3); return ctx_r5.selectTab(tab_r4); });
            i0.ɵɵelement(2, "i", 6);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementStart(5, "span", 7);
            i0.ɵɵtext(6);
            i0.ɵɵpipe(7, "sqNumber");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var tab_r4 = ctx.$implicit;
            var ctx_r3 = i0.ɵɵnextContext(3);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(8, _c0$4, tab_r4 == ctx_r3.currentTab, tab_r4.count == 0));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", ctx_r3.iconMap[tab_r4.name]);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(4, 4, tab_r4.display || tab_r4.name), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("(", i0.ɵɵpipeBind1(7, 6, tab_r4.count), ")");
        }
    }
    function BsTabs_ul_0_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsTabs_ul_0_ng_container_1_li_1_Template, 8, 11, "li", 3);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r1.searchtabs);
        }
    }
    function BsTabs_ul_0_ng_container_2_li_1_span_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 7);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqNumber");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var tab_r8 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1("(", i0.ɵɵpipeBind1(2, 1, tab_r8.count), ")");
        }
    }
    function BsTabs_ul_0_ng_container_2_li_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r12_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "li", 4);
            i0.ɵɵelementStart(1, "a", 5);
            i0.ɵɵlistener("click", function BsTabs_ul_0_ng_container_2_li_1_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r12_1); var tab_r8 = ctx.$implicit; var ctx_r11 = i0.ɵɵnextContext(3); return ctx_r11.selectTab(tab_r8, false); });
            i0.ɵɵelement(2, "i", 6);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵtemplate(5, BsTabs_ul_0_ng_container_2_li_1_span_5_Template, 3, 3, "span", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var tab_r8 = ctx.$implicit;
            var ctx_r7 = i0.ɵɵnextContext(3);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(6, _c0$4, tab_r8 == ctx_r7.currentTab, tab_r8.count == 0));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", ctx_r7.iconMap[tab_r8.name]);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(4, 4, tab_r8.display || tab_r8.name), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", tab_r8.count >= 0);
        }
    }
    function BsTabs_ul_0_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsTabs_ul_0_ng_container_2_li_1_Template, 6, 9, "li", 3);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r2.customtabs);
        }
    }
    function BsTabs_ul_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "ul", 1);
            i0.ɵɵtemplate(1, BsTabs_ul_0_ng_container_1_Template, 2, 1, "ng-container", 2);
            i0.ɵɵtemplate(2, BsTabs_ul_0_ng_container_2_Template, 2, 1, "ng-container", 2);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !!ctx_r0.searchtabs);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !!ctx_r0.customtabs);
        }
    }
    var BsTabs = /** @class */ (function () {
        function BsTabs(searchService) {
            this.searchService = searchService;
            /**
             * Associate icon to a tab name ({tab1 : 'icon class 1', tab2 : ...})
             */
            this.iconMap = {};
            /**
             * Emits an event when a tab is selected
             */
            this.events = new i0.EventEmitter();
        }
        BsTabs.prototype.update = function () {
            if (this.results && this.results.tabs) {
                this.currentTab = this.searchService.getCurrentTab();
                this.searchtabs = this.results.tabs;
            }
            else {
                this.currentTab = undefined;
                this.searchtabs = undefined;
            }
        };
        BsTabs.prototype.ngOnChanges = function (changes) {
            if (!!changes["results"]) {
                this.update();
            }
        };
        BsTabs.prototype.selectTab = function (tab, search) {
            if (search === void 0) { search = true; }
            if (tab !== this.currentTab) {
                if (search) {
                    this.searchService.selectTab(tab); // the currentTab will be updated in update()
                }
                else {
                    this.currentTab = tab;
                }
                this.events.next(tab);
            }
            return false; // Stop following href
        };
        return BsTabs;
    }());
    BsTabs.ɵfac = function BsTabs_Factory(t) { return new (t || BsTabs)(i0.ɵɵdirectiveInject(exports.SearchService)); };
    BsTabs.ɵcmp = i0.ɵɵdefineComponent({ type: BsTabs, selectors: [["sq-tabs"]], inputs: { results: "results", customtabs: "customtabs", iconMap: "iconMap" }, outputs: { events: "events" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "nav nav-tabs mb-1", 4, "ngIf"], [1, "nav", "nav-tabs", "mb-1"], [4, "ngIf"], ["class", "nav-item", 4, "ngFor", "ngForOf"], [1, "nav-item"], ["href", "#", 1, "nav-link", 3, "ngClass", "click"], [3, "ngClass"], [1, "count"], ["class", "count", 4, "ngIf"]], template: function BsTabs_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsTabs_ul_0_Template, 3, 2, "ul", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !!ctx.searchtabs || !!ctx.customtabs);
            }
        }, directives: [i2$1.NgIf, i2$1.NgForOf, i2$1.NgClass], pipes: [i3$1.MessagePipe, i4$1.NumberPipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsTabs, [{
                type: i0.Component,
                args: [{
                        selector: "sq-tabs",
                        templateUrl: "./tabs.html"
                    }]
            }], function () { return [{ type: exports.SearchService }]; }, { results: [{
                    type: i0.Input
                }], customtabs: [{
                    type: i0.Input
                }], iconMap: [{
                    type: i0.Input
                }], events: [{
                    type: i0.Output
                }] });
    })();

    function BsLoadingBar_div_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵelement(1, "div", 2);
            i0.ɵɵelement(2, "div", 3);
            i0.ɵɵelement(3, "div", 4);
            i0.ɵɵelementEnd();
        }
    }
    // From https://stackoverflow.com/questions/34773266/how-to-write-css-keyframes-to-indeterminate-material-design-progress-bar
    var BsLoadingBar = /** @class */ (function () {
        function BsLoadingBar(searchService) {
            this.searchService = searchService;
        }
        BsLoadingBar.prototype.isActive = function () {
            return this.active === undefined ? this.searchService.searchActive : this.active;
        };
        return BsLoadingBar;
    }());
    BsLoadingBar.ɵfac = function BsLoadingBar_Factory(t) { return new (t || BsLoadingBar)(i0.ɵɵdirectiveInject(exports.SearchService)); };
    BsLoadingBar.ɵcmp = i0.ɵɵdefineComponent({ type: BsLoadingBar, selectors: [["sq-loading-bar"]], inputs: { active: "active" }, decls: 1, vars: 1, consts: [["class", "slider", 4, "ngIf"], [1, "slider"], [1, "line"], [1, "subline", "inc"], [1, "subline", "dec"]], template: function BsLoadingBar_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsLoadingBar_div_0_Template, 4, 0, "div", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.isActive());
            }
        }, directives: [i2$1.NgIf], styles: [".slider[_ngcontent-%COMP%]{\n  position:absolute;\n  width:100%;\n  height:3px;\n  overflow: hidden;\n  z-index: 3;\n}\n\n.line[_ngcontent-%COMP%]{\n  position:absolute;\n  opacity: 0.4;\n  background:#4a8df8;\n  width:150%;\n  height:5px;\n}\n\n.subline[_ngcontent-%COMP%]{\n  position:absolute;\n  background:#4a8df8;\n  height:5px;\n}\n.inc[_ngcontent-%COMP%]{\nanimation: increase 1s infinite;\n}\n.dec[_ngcontent-%COMP%]{\nanimation: decrease 1s 0.25s infinite;\n}\n\n@keyframes increase {\n from { left: -5%; width: 5%; }\n to { left: 130%; width: 100%;}\n}\n@keyframes decrease {\n from { left: -80%; width: 80%; }\n to { left: 110%; width: 10%;}\n}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsLoadingBar, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-loading-bar',
                        template: "\n<div class=\"slider\" *ngIf=\"isActive()\">\n\t<div class=\"line\"></div>\n  <div class=\"subline inc\"></div>\n  <div class=\"subline dec\"></div>\n</div>\n    ",
                        styles: ["\n\n.slider{\n  position:absolute;\n  width:100%;\n  height:3px;\n  overflow: hidden;\n  z-index: 3;\n}\n\n.line{\n  position:absolute;\n  opacity: 0.4;\n  background:#4a8df8;\n  width:150%;\n  height:5px;\n}\n\n.subline{\n  position:absolute;\n  background:#4a8df8;\n  height:5px;\n}\n.inc{\nanimation: increase 1s infinite;\n}\n.dec{\nanimation: decrease 1s 0.25s infinite;\n}\n\n@keyframes increase {\n from { left: -5%; width: 5%; }\n to { left: 130%; width: 100%;}\n}\n@keyframes decrease {\n from { left: -80%; width: 80%; }\n to { left: 110%; width: 10%;}\n}\n    "]
                    }]
            }], function () { return [{ type: exports.SearchService }]; }, { active: [{
                    type: i0.Input
                }] });
    })();

    var _c0$5 = ["anchor"];
    var BsScroller = /** @class */ (function () {
        function BsScroller(searchService) {
            this.searchService = searchService;
            this.options = {};
        }
        BsScroller.prototype.ngAfterViewInit = function () {
            var _this = this;
            var options = Object.assign({ root: null }, this.options);
            this.observer = new IntersectionObserver(function (_a) {
                var _b = __read(_a, 1), entry = _b[0];
                if (entry.isIntersecting) {
                    _this.searchService.loadMore();
                }
            }, options);
            this.observer.observe(this.anchor.nativeElement);
        };
        BsScroller.prototype.ngOnDestroy = function () {
            this.observer.disconnect();
        };
        return BsScroller;
    }());
    BsScroller.ɵfac = function BsScroller_Factory(t) { return new (t || BsScroller)(i0.ɵɵdirectiveInject(exports.SearchService)); };
    BsScroller.ɵcmp = i0.ɵɵdefineComponent({ type: BsScroller, selectors: [["sq-scroller"]], viewQuery: function BsScroller_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵviewQuery(_c0$5, true);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.anchor = _t.first);
            }
        }, inputs: { options: "options" }, decls: 2, vars: 0, consts: [[2, "height", "5px"], ["anchor", ""]], template: function BsScroller_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelement(0, "div", 0, 1);
            }
        }, encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsScroller, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-scroller',
                        template: "<div #anchor style=\"height:5px\"></div>"
                    }]
            }], function () { return [{ type: exports.SearchService }]; }, { options: [{
                    type: i0.Input
                }], anchor: [{
                    type: i0.ViewChild,
                    args: ['anchor']
                }] });
    })();

    var _c0$6 = function (a0) { return [a0]; };
    var _c1$3 = function (a0, a1, a2) { return { items: a0, style: a1, size: a2, rightAligned: false }; };
    function BsLoadMore_div_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "div", 1);
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction3(3, _c1$3, i0.ɵɵpureFunction1(1, _c0$6, ctx_r0.loadMoreAction), ctx_r0.buttonsStyle, ctx_r0.actionsSize));
        }
    }
    var BsLoadMore = /** @class */ (function () {
        function BsLoadMore(searchService) {
            var _this = this;
            this.searchService = searchService;
            this.buttonsStyle = "outline-primary";
            this.actionsSize = "sm";
            this.subscription = new rxjs.Subscription();
            this.hasMore = false;
            this.loadMoreAction = new i3$2.Action({
                text: "msg#facet.loadMore",
                title: "msg#facet.loadMore",
                action: function (action) {
                    _this.searchService.loadMore();
                    action.update();
                },
                updater: function () {
                    // hide button while fetching new data
                    _this.hasMore = false;
                }
            });
        }
        BsLoadMore.prototype.ngOnInit = function () {
            var _this = this;
            this.subscription = this.searchService.resultsStream
                .subscribe(function (results) {
                _this.hasMore = _this.searchService.hasMore();
            });
        };
        BsLoadMore.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        return BsLoadMore;
    }());
    BsLoadMore.ɵfac = function BsLoadMore_Factory(t) { return new (t || BsLoadMore)(i0.ɵɵdirectiveInject(exports.SearchService)); };
    BsLoadMore.ɵcmp = i0.ɵɵdefineComponent({ type: BsLoadMore, selectors: [["sq-load-more"]], inputs: { buttonsStyle: "buttonsStyle", actionsSize: "actionsSize" }, decls: 1, vars: 1, consts: [["class", "btn-group", 3, "sq-action-buttons", 4, "ngIf"], [1, "btn-group", 3, "sq-action-buttons"]], template: function BsLoadMore_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsLoadMore_div_0_Template, 1, 7, "div", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.hasMore);
            }
        }, directives: [i2$1.NgIf, i3$2.BsActionButtons], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsLoadMore, [{
                type: i0.Component,
                args: [{
                        selector: "sq-load-more",
                        templateUrl: "./load-more.html"
                    }]
            }], function () { return [{ type: exports.SearchService }]; }, { buttonsStyle: [{
                    type: i0.Input
                }], actionsSize: [{
                    type: i0.Input
                }] });
    })();

    var BsSearchModule = /** @class */ (function () {
        function BsSearchModule() {
        }
        BsSearchModule.forRoot = function (searchOptions) {
            return {
                ngModule: BsSearchModule,
                providers: [
                    // Provide SEARCH_OPTIONS
                    { provide: SEARCH_OPTIONS, useValue: searchOptions },
                ]
            };
        };
        return BsSearchModule;
    }());
    BsSearchModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsSearchModule });
    BsSearchModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsSearchModule_Factory(t) { return new (t || BsSearchModule)(); }, imports: [[
                i2$1.CommonModule,
                forms.FormsModule, forms.ReactiveFormsModule,
                i3.WebServicesModule,
                i3$1.IntlModule,
                i4.LoginModule,
                i4$1.UtilsModule,
                i3$2.BsActionModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsSearchModule, { declarations: [BsDidYouMean,
                BsBreadcrumbs, exports.BsPager, BsPageSizeSelector, BsSortSelector,
                BsTabs, BsLoadingBar,
                BsScroller, BsLoadMore], imports: [i2$1.CommonModule,
                forms.FormsModule, forms.ReactiveFormsModule,
                i3.WebServicesModule,
                i3$1.IntlModule,
                i4.LoginModule,
                i4$1.UtilsModule,
                i3$2.BsActionModule], exports: [BsDidYouMean,
                BsBreadcrumbs, exports.BsPager, BsPageSizeSelector, BsSortSelector,
                BsTabs, BsLoadingBar,
                BsScroller, BsLoadMore] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsSearchModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i2$1.CommonModule,
                            forms.FormsModule, forms.ReactiveFormsModule,
                            i3.WebServicesModule,
                            i3$1.IntlModule,
                            i4.LoginModule,
                            i4$1.UtilsModule,
                            i3$2.BsActionModule
                        ],
                        declarations: [
                            BsDidYouMean,
                            BsBreadcrumbs, exports.BsPager, BsPageSizeSelector, BsSortSelector,
                            BsTabs, BsLoadingBar,
                            BsScroller, BsLoadMore
                        ],
                        exports: [
                            BsDidYouMean,
                            BsBreadcrumbs, exports.BsPager, BsPageSizeSelector, BsSortSelector,
                            BsTabs, BsLoadingBar,
                            BsScroller, BsLoadMore
                        ],
                    }]
            }], null, null);
    })();

    var en = {
        "search": {
            "emptySearchNotification": "Please enter some search terms to perform a search",
            "alreadyFiltered": "Already selected"
        },
        "breadcrumbs": {
            "emptySearch": "<empty search>",
            "itemRemove": "Remove"
        },
        "didYouMean": {
            "dymonlyBeforeCorrected": "Did you mean: ",
            "dymonlyAfterCorrected": "?",
            "correctBeforeCorrected": "Showing results for: ",
            "correctBeforeOriginal": ". Search instead for: ",
            "correctAfterOriginal": "",
            "smartBeforeOriginal": "Showing results for: ",
            "smartBeforeCorrected": " and ",
            "smartAfterCorrected": ""
        },
        "pageSizeSelector": {
            "pageSizeChoice": "{size, number} per page",
            "defaultPageSize": "Default ({size, number})",
            "defaultPageSizeChoice": "{size, number} per page (default)"
        },
        "pager": {
            "pageNumberTitle": "Page {page, number}",
            "firstPage": "First page",
            "nextPage": "Next page",
            "previousPage": "Previous page",
            "lastPage": "Last page"
        },
        "sortSelector": {
            "sortByTitle": "Sort by: {text}",
            "sortOther": "<Other>"
        },
        "sort": {
            "relevance": "Relevance",
            "date": "Date",
            "filename": "File name",
            "title": "Title"
        },
        "queryIntent": {
            "externalServiceTimeoutError": "This result page is incomplete due to an internal timeout. Please retry later."
        }
    };

    var fr = {
        "search": {
            "emptySearchNotification": "Veuillez saisir des termes de recherche pour effectuer une recherche",
            "alreadySelected": "Déjà sélectionné"
        },
        "breadcrumbs": {
            "emptySearch": "<recherche vide>",
            "itemRemove": "Supprimer"
        },
        "didYouMean": {
            "dymonlyBeforeCorrected": "Essayez avec cette orthographe : ",
            "dymonlyAfterCorrected": "",
            "correctBeforeCorrected": "Résultats pour : ",
            "correctBeforeOriginal": ". Essayez avec l'orthographe : ",
            "correctAfterOriginal": "",
            "smartBeforeOriginal": "Résultats pour : ",
            "smartBeforeCorrected": " et ",
            "smartAfterCorrected": ""
        },
        "pageSizeSelector": {
            "pageSizeChoice": "{size, number} par page",
            "defaultPageSize": "Défaut ({size, number})",
            "defaultPageSizeChoice": "{size, number} par page (défaut)"
        },
        "pager": {
            "pageNumberTitle": "Page {page, number}",
            "firstPage": "Première page",
            "nextPage": "Page suivante",
            "previousPage": "Page précédente",
            "lastPage": "Dernière page"
        },
        "sortSelector": {
            "sortByTitle": "Trier par: {text}",
            "sortOther": "<Autre>"
        },
        "sort": {
            "relevance": "Pertinence",
            "date": "Date",
            "filename": "Nom de fichier",
            "title": "Titre"
        },
        "queryIntent": {
            "externalServiceTimeoutError": "Cette page de résultat est incomplète due à un délai d'attente interne dépassé. S'il vous plaît, réessayez plus tard."
        }
    };

    var de = {
        "search": {
            "emptySearchNotification": "Bitte geben Sie einige Suchbegriffe ein, um eine Suche durchzuführen",
            "alreadyFiltered": "bereits ausgewählt"
        },
        "breadcrumbs": {
            "emptySearch": "<Suche ohne Suchbegriff>",
            "itemRemove": "Entfernen"
        },
        "didYouMean": {
            "dymonlyBeforeCorrected": "Meinten Sie: ",
            "dymonlyAfterCorrected": "?",
            "correctBeforeCorrected": "Zeige Ergebnisse für [",
            "correctBeforeOriginal": "]. Zeige stattdessen Ergebnisse für [",
            "correctAfterOriginal": "]",
            "smartBeforeOriginal": "Zeige Ergebnisse für [",
            "smartBeforeCorrected": "] und [",
            "smartAfterCorrected": "]"
        },
        "pageSizeSelector": {
            "pageSizeChoice": "{size, number} pro Seite",
            "defaultPageSize": "Standard ({size, number})",
            "defaultPageSizeChoice": "{size, number} pro Seite (standard)"
        },
        "pager": {
            "pageNumberTitle": "Seite {page, number}",
            "firstPage": "Erste Seite",
            "nextPage": "Nächste Seite",
            "previousPage": "Vorherige Seite",
            "lastPage": "Letzte Seite"
        },
        "sortSelector": {
            "sortByTitle": "Sortieren nach: {text}",
            "sortOther": "<Andere>"
        },
        "sort": {
            "relevance": "Relevanz",
            "date": "Datum",
            "filename": "Dateiname",
            "title": "Titel"
        },
        "queryIntent": {
            "externalServiceTimeoutError": "Diese Ergebnisseite ist aufgrund eines internen Zeitlimits unvollständig. Bitte versuchen Sie es später noch einmal."
        }
    };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Breadcrumbs = Breadcrumbs;
    exports.BsBreadcrumbs = BsBreadcrumbs;
    exports.BsDidYouMean = BsDidYouMean;
    exports.BsLoadMore = BsLoadMore;
    exports.BsLoadingBar = BsLoadingBar;
    exports.BsPageSizeSelector = BsPageSizeSelector;
    exports.BsScroller = BsScroller;
    exports.BsSearchModule = BsSearchModule;
    exports.BsSortSelector = BsSortSelector;
    exports.BsTabs = BsTabs;
    exports.FIRST_PAGE_OPTIONS = FIRST_PAGE_OPTIONS;
    exports.FirstPageService = FirstPageService;
    exports.SEARCH_OPTIONS = SEARCH_OPTIONS;
    exports.deSearch = de;
    exports.enSearch = en;
    exports.frSearch = fr;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-search.umd.js.map
