(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router'), require('rxjs'), require('@sinequa/core/base'), require('@sinequa/components/search'), require('@sinequa/core/app-utils'), require('@sinequa/components/selection'), require('@angular/common'), require('@sinequa/core/intl'), require('@sinequa/components/utils'), require('@sinequa/core/load-component'), require('@sinequa/core/validation'), require('@sinequa/components/action')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/results-view', ['exports', '@angular/core', '@angular/router', 'rxjs', '@sinequa/core/base', '@sinequa/components/search', '@sinequa/core/app-utils', '@sinequa/components/selection', '@angular/common', '@sinequa/core/intl', '@sinequa/components/utils', '@sinequa/core/load-component', '@sinequa/core/validation', '@sinequa/components/action'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components['results-view'] = {}), global.ng.core, global.ng.router, global.rxjs, global.sinequa.core.base, global.sinequa.components.search, global.sinequa.core['app-utils'], global.sinequa.components.selection, global.ng.common, global.sinequa.core.intl, global.sinequa.components.utils, global.sinequa.core['load-component'], global.sinequa.core.validation, global.sinequa.components.action));
}(this, (function (exports, i0, i1, rxjs, base, i2, i1$1, i3, i4, i5, i6, loadComponent, validation, i2$1) { 'use strict';

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

    var RESULTS_VIEWS = new i0.InjectionToken("RESULTS_VIEWS");
    //export const DEFAULT_VIEW = new InjectionToken<ResultsView>("DEFAULT_VIEW");
    var ResultsViewService = /** @class */ (function () {
        /**
         * Constructor: Expects the configuration for a list of views and
         * one default view. These views can be set when importing the module in the AppModule
         * with the ResultsViewModule.forRoot() method.
         */
        function ResultsViewService(
        // @Inject(DEFAULT_VIEW) public defaultView: ResultsView,
        resultsViews, router, route, searchService) {
            var _this = this;
            this.router = router;
            this.route = route;
            this.searchService = searchService;
            this._resultsViewSelected = new rxjs.Subject();
            this._events = new rxjs.Subject();
            this._resultsViews = resultsViews;
            // this._resultsView = this.defaultView;
            /**
             * Listener triggered whenever the URL changes
             */
            this.router.events.subscribe(function (event) {
                if (event instanceof i1.NavigationEnd) {
                    _this.handleNavigation();
                }
            });
            /**
             * Listener triggered whenever new results come in.
             * Some views must be displayed after a search, hence the
             * pendingView flag.
             */
            this.searchService.resultsStream.subscribe(function (results) {
                if (_this.pendingView) {
                    _this.searchService.queryStringParams.view = _this.pendingView.name;
                    _this.searchService.navigate({ skipSearch: true });
                    _this.pendingView = undefined;
                }
            });
            // Automatically switch results views, if we go to a tab that has specific list of views
            this.searchService.events.subscribe(function (event) {
                // Event called just before the query for the new tab is searched
                if (event.type === "before-select-tab" && event.query.tab) {
                    var views = _this.getIncludedViews(event.query.tab);
                    // If there are views for this tab and they don't include the current one...
                    if (views.length > 0 && !views.includes(_this.resultsView)) {
                        // Set the view as pending
                        _this.pendingView = views[0];
                        // Modify the query if needed
                        if (_this.pendingView.beforeSearch) {
                            _this.pendingView.beforeSearch(event.query, _this.resultsView);
                        }
                    }
                }
            });
        }
        Object.defineProperty(ResultsViewService.prototype, "resultsViewSelected", {
            // GETTERS
            get: function () {
                return this._resultsViewSelected;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ResultsViewService.prototype, "events", {
            get: function () {
                return this._events;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ResultsViewService.prototype, "resultsView", {
            get: function () {
                return this._resultsView;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ResultsViewService.prototype, "views", {
            get: function () {
                return this._resultsViews;
            },
            enumerable: false,
            configurable: true
        });
        // EVENT HANDLERS
        /**
         * Navigate to a new URL including the given results view's name
         * @param view
         */
        ResultsViewService.prototype.navigate = function (view) {
            var waitForResults = !!view.beforeSearch;
            if (view.beforeSearch) {
                waitForResults = view.beforeSearch(this.searchService.query, this.resultsView);
            }
            if (!waitForResults) {
                // We switch view immediately via the search service (which centralizes the navigation)
                this.searchService.queryStringParams.view = view.name;
                this.searchService.navigate({ skipSearch: true });
            }
            else {
                // We set the view as "pending", that is waiting for new results to come in
                this.pendingView = view;
                this.searchService.search();
            }
        };
        /**
         * Responds to a change in the URL: Sets the results view if the URL
         * specifies a different results view name.
         */
        ResultsViewService.prototype.handleNavigation = function () {
            var url = base.Utils.makeURL(this.router.url);
            var view = this.getView(url.searchParams.get("view"));
            if (view && view !== this.resultsView) {
                this.searchService.queryStringParams.view = view.name; // Needed when refreshing the page
                this.setResultsView(view);
            }
        };
        /**
         * Sets the results view and emits an event
         * @param view
         */
        ResultsViewService.prototype.setResultsView = function (view) {
            this._resultsView = view;
            this._events.next({ type: "after-select", view: view });
            this._resultsViewSelected.next(view);
        };
        // PUBLIC API
        /**
         * Selects the given results view. This method is asynchronous:
         * - The selected results view might modify the query before being displayed
         * - The view selection works with a navigation via the router (adding the view name to the URL)
         * @param view
         */
        ResultsViewService.prototype.selectResultsView = function (view) {
            var _this = this;
            if (view) {
                // Raise before event...
                var beforeEvent = {
                    type: "before-select",
                    view: view,
                    promises: []
                };
                this._events.next(beforeEvent);
                if (beforeEvent.promises.length === 0) {
                    this.navigate(view);
                }
                else {
                    Promise.all(beforeEvent.promises)
                        .then(function (results) {
                        var ok = results.every(function (result) { return result; });
                        if (ok) {
                            _this.navigate(view);
                        }
                        else {
                            console.log("selectResultsView cancelled");
                            _this._events.next({ type: "select-cancelled", view: view });
                        }
                    })
                        .catch(function (reason) {
                        console.log("selectResultsView error:", reason);
                        _this._events.next({ type: "select-cancelled", view: view });
                    });
                }
            }
            else {
                console.error("Undefined Results View");
            }
        };
        /**
         * Selects the results view with the given name. This method is asynchronous:
         * - The selected results view might modify the query before being displayed
         * - The view selection works with a navigation via the router (adding the view name to the URL)
         * @param viewName
         */
        ResultsViewService.prototype.selectResultsViewName = function (viewName) {
            var view = this.getView(viewName);
            if (view) {
                this.selectResultsView(view);
            }
        };
        /**
         * Returns the results view with the given name
         * @param viewName
         */
        ResultsViewService.prototype.getView = function (viewName) {
            return this.views.find(function (v) { return v.name === viewName; });
        };
        /**
         * Returns the list of results views compatible with a given tab
         * @param tab
         */
        ResultsViewService.prototype.getIncludedViews = function (tab) {
            var e_1, _a;
            var views = [];
            try {
                for (var _b = __values(this.views), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var view = _c.value;
                    var included = !!view.includedTabs
                        ? view.includedTabs.includes(tab || "")
                        : !view.excludedTabs || !view.excludedTabs.includes(tab || "");
                    if (included) {
                        views.push(view);
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
            return views;
        };
        return ResultsViewService;
    }());
    ResultsViewService.ɵfac = function ResultsViewService_Factory(t) { return new (t || ResultsViewService)(i0.ɵɵinject(RESULTS_VIEWS), i0.ɵɵinject(i1.Router), i0.ɵɵinject(i1.ActivatedRoute), i0.ɵɵinject(i2.SearchService)); };
    ResultsViewService.ɵprov = i0.ɵɵdefineInjectable({ token: ResultsViewService, factory: ResultsViewService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ResultsViewService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [RESULTS_VIEWS]
                        }] }, { type: i1.Router }, { type: i1.ActivatedRoute }, { type: i2.SearchService }];
        }, null);
    })();

    function BsResultsGridView_th_9_span_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span");
        }
        if (rf & 2) {
            var columnData_r2 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵclassMap(columnData_r2.sortIcon);
        }
    }
    var _c0 = function (a0) { return { "sq-clickable": a0 }; };
    function BsResultsGridView_th_9_Template(rf, ctx) {
        if (rf & 1) {
            var _r6_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "th", 7);
            i0.ɵɵlistener("click", function BsResultsGridView_th_9_Template_th_click_0_listener() { i0.ɵɵrestoreView(_r6_1); var columnData_r2 = ctx.$implicit; var ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.setSort(columnData_r2); });
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵtemplate(3, BsResultsGridView_th_9_span_3_Template, 1, 3, "span", 8);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var columnData_r2 = ctx.$implicit;
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c0, ctx_r0.isSortable(columnData_r2)));
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(2, 4, columnData_r2.config.title), "", columnData_r2.sortIndicator, "");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r0.isSortable(columnData_r2));
        }
    }
    function BsResultsGridView_tr_11_ng_container_3_td_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "td", 12);
            i0.ɵɵpipe(1, "sqValue");
        }
        if (rf & 2) {
            var ctx_r14 = i0.ɵɵnextContext();
            var columnData_r9 = ctx_r14.$implicit;
            var $index_r10 = ctx_r14.index;
            var record_r7 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind2(1, 2, record_r7[columnData_r9.config.field], columnData_r9.column), i0.ɵɵsanitizeHtml);
            i0.ɵɵattribute("scope", $index_r10 === 0 ? "row" : null);
        }
    }
    function BsResultsGridView_tr_11_ng_container_3_td_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "td");
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqValue");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r15 = i0.ɵɵnextContext();
            var $index_r10 = ctx_r15.index;
            var columnData_r9 = ctx_r15.$implicit;
            var record_r7 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵattribute("scope", $index_r10 === 0 ? "row" : null);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 2, record_r7[columnData_r9.config.field], columnData_r9.column));
        }
    }
    function BsResultsGridView_tr_11_ng_container_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsResultsGridView_tr_11_ng_container_3_td_1_Template, 2, 5, "td", 10);
            i0.ɵɵtemplate(2, BsResultsGridView_tr_11_ng_container_3_td_2_Template, 3, 5, "td", 11);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var columnData_r9 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", columnData_r9.config.renderAsHtml);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !columnData_r9.config.renderAsHtml);
        }
    }
    function BsResultsGridView_tr_11_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "tr");
            i0.ɵɵelementStart(1, "td", 1);
            i0.ɵɵelement(2, "sq-result-selector", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(3, BsResultsGridView_tr_11_ng_container_3_Template, 3, 2, "ng-container", 6);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var record_r7 = ctx.$implicit;
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("record", record_r7);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r1.columnsData);
        }
    }
    var BsResultsGridView = /** @class */ (function () {
        function BsResultsGridView(appService, searchService, formatService, selectionService) {
            this.appService = appService;
            this.searchService = searchService;
            this.formatService = formatService;
            this.selectionService = selectionService;
        }
        BsResultsGridView.prototype.observeQueryFields = function () {
            this.initSorts();
        };
        BsResultsGridView.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if (!this.columnsData) {
                if (!!this.view.columns) {
                    this.columnsData = this.view.columns.filter(function (config) { return config.active; }).map(function (config) { return ({
                        config: config,
                        column: _this.appService.getColumn(config.field)
                    }); });
                    this.clearSorts();
                }
                else {
                    this.columnsData = [];
                }
            }
            if (!!changes["query"]) {
                this.observeQueryFields();
            }
        };
        BsResultsGridView.prototype.toggleSelectedRecords = function () {
            this.selectionService.toggleSelectedRecords();
        };
        Object.defineProperty(BsResultsGridView.prototype, "haveSelectedRecords", {
            get: function () {
                return this.selectionService.haveSelectedRecords;
            },
            enumerable: false,
            configurable: true
        });
        BsResultsGridView.prototype.getSortIndicator = function (columnData) {
            if (columnData.sortIndex === -1) {
                return undefined;
            }
            if (this.maxSortIndex === 0) {
                return undefined;
            }
            switch (columnData.sortIndex || -1 + 1) {
                case 1: return "\u00B9";
                case 2: return "\u00B2";
                case 3: return "\u00B3";
                case 4: return "\u2074";
                case 5: return "\u2075";
                case 6: return "\u2076";
                case 7: return "\u2077";
                case 8: return "\u2078";
                case 9: return "\u2079";
                default: return "\u207A";
            }
        };
        BsResultsGridView.prototype.ascendingFirst = function (column) {
            //return this.appService.isNumber(column.field);
            return false;
        };
        Object.defineProperty(BsResultsGridView.prototype, "maxSortIndex", {
            get: function () {
                var e_1, _a;
                var sortIndex = -1;
                if (this.columnsData) {
                    try {
                        for (var _b = __values(this.columnsData), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var columnData = _c.value;
                            if (columnData.sortIndex !== undefined && columnData.sortIndex > sortIndex) {
                                sortIndex = columnData.sortIndex;
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
                return sortIndex;
            },
            enumerable: false,
            configurable: true
        });
        BsResultsGridView.prototype._setSort = function (columnData, ascending) {
            var e_2, _a;
            var previousSortIndex = columnData.sortIndex;
            if (previousSortIndex === -1) {
                columnData.sortIndex = this.maxSortIndex + 1;
            }
            columnData.ascending = ascending;
            columnData.sortIcon = columnData.ascending ? "fas fa-caret-up" : "fas fa-caret-down";
            columnData.sortIndicator = this.getSortIndicator(columnData);
            if (previousSortIndex === -1) {
                if (this.columnsData) {
                    try {
                        for (var _b = __values(this.columnsData), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var columnData1 = _c.value;
                            columnData1.sortIndicator = this.getSortIndicator(columnData1);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
        };
        BsResultsGridView.prototype._clearSort = function (columnData) {
            var e_3, _a;
            var previousSortIndex = columnData.sortIndex || -1;
            columnData.sortIndex = -1;
            columnData.ascending = false;
            columnData.sortIcon = "fas fa-sort";
            columnData.sortIndicator = undefined;
            if (previousSortIndex !== -1) {
                if (this.columnsData) {
                    try {
                        for (var _b = __values(this.columnsData), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var columnData1 = _c.value;
                            if (columnData1.sortIndex !== undefined && columnData1.sortIndex > previousSortIndex) {
                                columnData1.sortIndex--;
                            }
                            columnData1.sortIndicator = this.getSortIndicator(columnData1);
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
            }
        };
        BsResultsGridView.prototype.clearSorts = function () {
            var e_4, _a;
            if (this.columnsData) {
                try {
                    for (var _b = __values(this.columnsData), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var columnData = _c.value;
                        this._clearSort(columnData);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        };
        BsResultsGridView.prototype.isSortable = function (columnData) {
            return !!columnData && columnData.config.sortable && this.appService.isSortable(columnData.config.field);
        };
        BsResultsGridView.prototype.initSorts = function () {
            var e_5, _a;
            if (this.searchService.query.orderBy === this.orderBy) {
                return;
            }
            this.orderBy = this.searchService.query.orderBy;
            this.clearSorts();
            if (!!this.orderBy) {
                var parts = base.Utils.split(this.orderBy, ",");
                var _loop_1 = function (part) {
                    var tokens = base.Utils.split(part, " ");
                    if (tokens.length > 0) {
                        var field_1 = tokens[0];
                        if (this_1.columnsData) {
                            var columnData = this_1.columnsData.find(function (value) { return base.Utils.eqNC(field_1, value.config.field); });
                            if (columnData && this_1.isSortable(columnData)) {
                                this_1._setSort(columnData, tokens.length > 1 ? base.Utils.eqNC(tokens[1], "asc") : true);
                            }
                        }
                    }
                };
                var this_1 = this;
                try {
                    for (var parts_1 = __values(parts), parts_1_1 = parts_1.next(); !parts_1_1.done; parts_1_1 = parts_1.next()) {
                        var part = parts_1_1.value;
                        _loop_1(part);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (parts_1_1 && !parts_1_1.done && (_a = parts_1.return)) _a.call(parts_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        };
        BsResultsGridView.prototype.setSort = function (columnData) {
            if (this.isSortable(columnData)) {
                if (columnData.sortIndex !== -1) {
                    if (this.ascendingFirst(columnData.config)) {
                        if (columnData.ascending) {
                            this._setSort(columnData, false);
                        }
                        else {
                            this._clearSort(columnData);
                        }
                    }
                    else {
                        if (columnData.ascending) {
                            this._clearSort(columnData);
                        }
                        else {
                            this._setSort(columnData, true);
                        }
                    }
                }
                else {
                    this._setSort(columnData, this.ascendingFirst(columnData.config));
                }
                var orderBy = [];
                if (this.columnsData) {
                    var _loop_2 = function (sortIndex) {
                        var columnData_1 = this_2.columnsData.find(function (columnData) { return columnData.sortIndex === sortIndex; });
                        if (!columnData_1) {
                            return "break";
                        }
                        if (orderBy.length !== 0) {
                            orderBy.push(",");
                        }
                        orderBy.push(columnData_1.config.field);
                        if (!columnData_1.ascending) {
                            orderBy.push(" desc");
                        }
                    };
                    var this_2 = this;
                    for (var sortIndex = 0;; sortIndex++) {
                        var state_1 = _loop_2(sortIndex);
                        if (state_1 === "break")
                            break;
                    }
                }
                if (orderBy.length === 0) {
                    this.searchService.query.orderBy = this.orderBy = undefined;
                }
                else {
                    this.searchService.query.orderBy = this.orderBy = orderBy.join("");
                }
                this.searchService.search();
            }
        };
        return BsResultsGridView;
    }());
    BsResultsGridView.ɵfac = function BsResultsGridView_Factory(t) { return new (t || BsResultsGridView)(i0.ɵɵdirectiveInject(i1$1.AppService), i0.ɵɵdirectiveInject(i2.SearchService), i0.ɵɵdirectiveInject(i1$1.FormatService), i0.ɵɵdirectiveInject(i3.SelectionService)); };
    BsResultsGridView.ɵcmp = i0.ɵɵdefineComponent({ type: BsResultsGridView, selectors: [["sq-results-grid-view"]], inputs: { results: "results", view: "view" }, features: [i0.ɵɵNgOnChangesFeature], decls: 12, vars: 6, consts: [[1, "sq-results-grid-view"], [1, "sq-grid-view-checkbox"], [1, "custom-control", "custom-checkbox", 3, "title"], ["type", "checkbox", 1, "custom-control-input", 3, "checked", "change"], [1, "custom-control-label"], ["scope", "col", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [4, "ngFor", "ngForOf"], ["scope", "col", 3, "ngClass", "click"], [3, "class", 4, "ngIf"], [3, "record"], [3, "innerHTML", 4, "ngIf"], [4, "ngIf"], [3, "innerHTML"]], template: function BsResultsGridView_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "table", 0);
                i0.ɵɵelementStart(1, "thead");
                i0.ɵɵelementStart(2, "tr");
                i0.ɵɵelementStart(3, "th", 1);
                i0.ɵɵelementStart(4, "label", 2);
                i0.ɵɵpipe(5, "sqMessage");
                i0.ɵɵelementStart(6, "input", 3);
                i0.ɵɵlistener("change", function BsResultsGridView_Template_input_change_6_listener() { return ctx.toggleSelectedRecords(); });
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(7, "span", 4);
                i0.ɵɵtext(8, "\u200B");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(9, BsResultsGridView_th_9_Template, 4, 8, "th", 5);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(10, "tbody");
                i0.ɵɵtemplate(11, BsResultsGridView_tr_11_Template, 4, 2, "tr", 6);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(4);
                i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(5, 4, ctx.haveSelectedRecords ? "msg#results.resultsGridView.unselectDocuments" : "msg#results.resultsGridView.selectDocuments"));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("checked", ctx.haveSelectedRecords);
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("ngForOf", ctx.columnsData);
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngForOf", ctx.results.records);
            }
        }, directives: [i4.NgForOf, i4.NgClass, i4.NgIf, i3.BsResultSelector], pipes: [i5.MessagePipe, i6.ValuePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsResultsGridView, [{
                type: i0.Component,
                args: [{
                        selector: "sq-results-grid-view",
                        templateUrl: "./results-grid-view.html"
                    }]
            }], function () { return [{ type: i1$1.AppService }, { type: i2.SearchService }, { type: i1$1.FormatService }, { type: i3.SelectionService }]; }, { results: [{
                    type: i0.Input
                }], view: [{
                    type: i0.Input
                }] });
    })();

    var _c0$1 = function (a0, a2, a3) { return { items: a0, autoAdjust: true, rightAligned: a2, size: a3 }; };
    var BsResultsViewSelector = /** @class */ (function () {
        function BsResultsViewSelector(resultsViewService) {
            var _this = this;
            this.resultsViewService = resultsViewService;
            this.useDropdownMenu = true;
            this._subscription = this.resultsViewService.resultsViewSelected.subscribe(function (view) {
                _this.setCurrentViewAction();
            });
        }
        BsResultsViewSelector.prototype.ngOnDestroy = function () {
            if (this._subscription) {
                this._subscription.unsubscribe();
            }
        };
        BsResultsViewSelector.prototype.setCurrentViewAction = function () {
            var _this = this;
            if (!!this.viewAction && !!this.resultsViewService.resultsView) {
                if (!base.Utils.isArray(this.viewAction)) {
                    var view = this.resultsViewService.views.find(function (view) { return base.Utils.eqNC(_this.resultsViewService.resultsView.name, view.name); });
                    if (view) {
                        this.viewAction.text = view.display || view.name;
                        this.viewAction.icon = view.icon || 'fas fa-list';
                    }
                    else {
                        this.viewAction.text = "msg#results.unselectableViewDisplay";
                        this.viewAction.icon = "far fa-square fa-fw";
                    }
                    this.viewAction.messageParams = { values: { text: this.viewAction.text } }; // for title
                }
                else {
                    this.viewAction.forEach(function (action) {
                        action.selected = base.Utils.eqNC(action.data.name, _this.resultsViewService.resultsView.name);
                    });
                }
            }
        };
        BsResultsViewSelector.prototype.buildViewAction = function () {
            var e_1, _a;
            var _this = this;
            if (this.resultsViewService.views.length <= 1) {
                this.viewAction = undefined;
                this.items = [];
                return;
            }
            var includedViews = this.resultsViewService.getIncludedViews(this.query.tab);
            if (includedViews.length <= 1) {
                this.viewAction = undefined;
                this.items = [];
                return;
            }
            if (this.useDropdownMenu) {
                this.viewAction = new i2$1.Action({
                    title: "msg#results.viewTitle",
                    children: includedViews.map(function (view) { return new i2$1.Action({
                        text: view.display,
                        icon: view.icon,
                        data: view,
                        action: function (item, event) {
                            _this.selectView(item.data);
                        }
                    }); })
                });
                this.items = [this.viewAction];
            }
            else {
                this.viewAction = [];
                try {
                    for (var includedViews_1 = __values(includedViews), includedViews_1_1 = includedViews_1.next(); !includedViews_1_1.done; includedViews_1_1 = includedViews_1.next()) {
                        var view = includedViews_1_1.value;
                        this.viewAction.push(new i2$1.Action({
                            icon: view.icon,
                            title: view.display,
                            data: view,
                            action: function (item, event) {
                                _this.selectView(item.data);
                            }
                        }));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (includedViews_1_1 && !includedViews_1_1.done && (_a = includedViews_1.return)) _a.call(includedViews_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                this.items = this.viewAction;
            }
            this.setCurrentViewAction();
        };
        BsResultsViewSelector.prototype.ngOnChanges = function (changes) {
            this.buildViewAction();
        };
        BsResultsViewSelector.prototype.selectView = function (view) {
            this.resultsViewService.selectResultsView(view);
        };
        return BsResultsViewSelector;
    }());
    BsResultsViewSelector.ɵfac = function BsResultsViewSelector_Factory(t) { return new (t || BsResultsViewSelector)(i0.ɵɵdirectiveInject(ResultsViewService)); };
    BsResultsViewSelector.ɵcmp = i0.ɵɵdefineComponent({ type: BsResultsViewSelector, selectors: [["sq-results-view-selector"]], inputs: { query: "query", results: "results", rightAligned: "rightAligned", useDropdownMenu: "useDropdownMenu", size: "size" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 5, consts: [[3, "sq-action-buttons"]], template: function BsResultsViewSelector_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelement(0, "div", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction3(1, _c0$1, ctx.items, ctx.rightAligned, ctx.size));
            }
        }, directives: [i2$1.BsActionButtons], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsResultsViewSelector, [{
                type: i0.Component,
                args: [{
                        selector: "sq-results-view-selector",
                        templateUrl: "./results-view-selector.html"
                    }]
            }], function () { return [{ type: ResultsViewService }]; }, { query: [{
                    type: i0.Input
                }], results: [{
                    type: i0.Input
                }], rightAligned: [{
                    type: i0.Input
                }], useDropdownMenu: [{
                    type: i0.Input
                }], size: [{
                    type: i0.Input
                }] });
    })();

    var BsResultsViewModule = /** @class */ (function () {
        function BsResultsViewModule() {
        }
        BsResultsViewModule.forRoot = function (resultsViews, defaultView) {
            return {
                ngModule: BsResultsViewModule,
                providers: [
                    {
                        provide: RESULTS_VIEWS,
                        useValue: resultsViews
                    },
                ]
            };
        };
        return BsResultsViewModule;
    }());
    BsResultsViewModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsResultsViewModule });
    BsResultsViewModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsResultsViewModule_Factory(t) { return new (t || BsResultsViewModule)(); }, imports: [[
                i4.CommonModule,
                loadComponent.LoadComponentModule,
                i5.IntlModule,
                validation.ValidationModule,
                i6.UtilsModule,
                i2$1.BsActionModule,
                i3.BsSelectionModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsResultsViewModule, { declarations: [BsResultsViewSelector,
                BsResultsGridView], imports: [i4.CommonModule,
                loadComponent.LoadComponentModule,
                i5.IntlModule,
                validation.ValidationModule,
                i6.UtilsModule,
                i2$1.BsActionModule,
                i3.BsSelectionModule], exports: [BsResultsViewSelector,
                BsResultsGridView] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsResultsViewModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i4.CommonModule,
                            loadComponent.LoadComponentModule,
                            i5.IntlModule,
                            validation.ValidationModule,
                            i6.UtilsModule,
                            i2$1.BsActionModule,
                            i3.BsSelectionModule
                        ],
                        declarations: [
                            BsResultsViewSelector,
                            BsResultsGridView,
                        ],
                        exports: [
                            BsResultsViewSelector,
                            BsResultsGridView,
                        ],
                    }]
            }], null, null);
    })();

    var _enResultsView = {
        "results": {
            "viewTitle": "View: {text}",
            "unselectableViewDisplay": "<Other>",
            "resultsListView": {
                "display": "List",
                "selectDocument": "Select document",
                "unselectDocument": "Unselect document",
                "previewPopup": "Document Navigator",
                "previewInCurrentPage": "Document Navigator (in current page)",
                "previewInNewTab": "Document Navigator (in new tab)",
                "showMetadata": "Details",
                "showLabels": "Labels"
            },
            "resultsGridView": {
                "display": "Grid",
                "selectDocument": "Select document",
                "unselectDocument": "Unselect document",
                "selectDocuments": "Select documents",
                "unselectDocuments": "Unselect documents"
            },
            "viewPageSize": "Number of results per page",
            "viewUpdateApply": "Apply",
            "warningNoViewForTab": "The '{tab}' tab has no associated result views.",
            "warningCannotDisplayTabOnView": "The '{tab}' tab cannot be displayed using '{view}' view because it is not included in the view configuration.",
            "resultsAllTab": "All",
            "resultsTextTab": "Text",
            "results_all_tab": "All",
            "results_text_tab": "Text",
        }
    };

    var _frResultsView = {
        "results": {
            "viewTitle": "Vue : {text}",
            "unselectableViewDisplay": "<Autre>",
            "resultsListView": {
                "display": "Liste",
                "selectDocument": "Sélectionner le document",
                "unselectDocument": "Désélectionner le document",
                "previewPopup": "Document Navigator",
                "previewInCurrentPage": "Document Navigator (dans la page courante)",
                "previewInNewTab": "Document Navigator (dans un nouvel onglet)",
                "showMetadata": "Détails",
                "showLabels": "Libellés"
            },
            "resultsGridView": {
                "display": "Grille",
                "selectDocument": "Sélectionner le document",
                "unselectDocument": "Désélectionner le document",
                "selectDocuments": "Sélectionner les documents",
                "unselectDocuments": "Désélectionner les documents "
            },
            "viewPageSize": "Nombre de résultats par page",
            "viewUpdateApply": "Appliquer",
            "warningNoViewForTab": "L'onglet '{tab}' n'est associé à aucune vue.",
            "warningCannotDisplayTabOnView": "L'onglet '{tab}' ne peut pas être affiché dans la vue '{view}' car il n'est pas inclus dans la configuration de la vue.",
            "resultsAllTab": "Tous",
            "resultsTextTab": "Texte",
            "results_all_tab": "Tous",
            "results_text_tab": "Texte",
        }
    };

    var _deResultsView = {
        "results": {
            "viewTitle": "Anzeige: {text}",
            "unselectableViewDisplay": "<Andere>",
            "resultsListView": {
                "display": "Liste",
                "selectDocument": "Dokument auswählen",
                "unselectDocument": "Dokumentauswahl aufheben",
                "previewPopup": "[Dokument-Navigator]",
                "previewInCurrentPage": "[Dokument-Navigator (auf der aktuellen Seite)]",
                "previewInNewTab": "[Dokument-Navigator (in einem neuen Reiter)]",
                "showMetadata": "[Metadaten]",
                "showLabels": "[Etiketten]"
            },
            "resultsGridView": {
                "display": "Tabelle",
                "selectDocument": "Dokument auswählen",
                "unselectDocument": "Dokumentauswahl aufheben",
                "selectDocuments": "Dokumente auswählen",
                "unselectDocuments": "Dokumentauswahl aufheben"
            },
            "viewPageSize": "Anzahl der Ergebnisse pro Seite",
            "viewUpdateApply": "Anwenden",
            "warningNoViewForTab": "Der Reiter '{tab}' hat keine zugewiesenen Ergebnisansichten.",
            "warningCannotDisplayTabOnView": "Der Reiter '{tab}' kann nicht mit der Ansicht '{view}' angezeigt werden, da diese nicht in der Ansichtskonfiguration enthalten ist.",
            "resultsAllTab": "Alle",
            "resultsTextTab": "Text",
            "results_all_tab": "Alle",
            "results_text_tab": "Text",
        }
    };

    var enResultsView = base.Utils.merge({}, _enResultsView, i2.enSearch, i3.enSelection);
    var frResultsView = base.Utils.merge({}, _frResultsView, i2.frSearch, i3.frSelection);
    var deResultsView = base.Utils.merge({}, _deResultsView, i2.deSearch, i3.deSelection);

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BsResultsGridView = BsResultsGridView;
    exports.BsResultsViewModule = BsResultsViewModule;
    exports.BsResultsViewSelector = BsResultsViewSelector;
    exports.RESULTS_VIEWS = RESULTS_VIEWS;
    exports.ResultsViewService = ResultsViewService;
    exports.deResultsView = deResultsView;
    exports.enResultsView = enResultsView;
    exports.frResultsView = frResultsView;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-results-view.umd.js.map
