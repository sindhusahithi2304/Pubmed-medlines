(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@sinequa/core/app-utils'), require('@sinequa/core/base'), require('rxjs'), require('rxjs/operators'), require('@sinequa/core/web-services'), require('@sinequa/components/search'), require('@sinequa/components/autocomplete'), require('@sinequa/core/intl'), require('@angular/common'), require('@sinequa/components/action'), require('@sinequa/components/collapse'), require('@angular/forms'), require('@sinequa/components/utils'), require('ng5-slider'), require('moment'), require('@sinequa/components/advanced'), require('@sinequa/components/selection')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/facet', ['exports', '@angular/core', '@sinequa/core/app-utils', '@sinequa/core/base', 'rxjs', 'rxjs/operators', '@sinequa/core/web-services', '@sinequa/components/search', '@sinequa/components/autocomplete', '@sinequa/core/intl', '@angular/common', '@sinequa/components/action', '@sinequa/components/collapse', '@angular/forms', '@sinequa/components/utils', 'ng5-slider', 'moment', '@sinequa/components/advanced', '@sinequa/components/selection'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components.facet = {}), global.ng.core, global.sinequa.core['app-utils'], global.sinequa.core.base, global.rxjs, global.rxjs.operators, global.sinequa.core['web-services'], global.sinequa.components.search, global.sinequa.components.autocomplete, global.sinequa.core.intl, global.ng.common, global.sinequa.components.action, global.sinequa.components.collapse, global.ng.forms, global.sinequa.components.utils, global['ng5-slider'], global.moment, global.sinequa.components.advanced, global.sinequa.components.selection));
}(this, (function (exports, i0, i4, base, rxjs, operators, i1, i2, i3, i4$1, i2$1, i3$1, i3$2, i4$2, i5, i8, moment, i6, selection) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

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

    // Types of events triggering a change event
    var FACET_CHANGE_EVENTS = [
        "Facet_Loaded" /* Loaded */,
        "Facet_Added" /* Add */,
        "Facet_Removed" /* Remove */
    ];
    var ALL_FACETS = new i0.InjectionToken('ALL_FACETS');
    var DEFAULT_FACETS = new i0.InjectionToken('DEFAULT_FACETS');
    var FacetService = /** @class */ (function () {
        function FacetService(userSettingsService, searchService, suggestService, appService, intlService, formatService, exprBuilder, allFacets, defaultFacets) {
            var _this = this;
            this.userSettingsService = userSettingsService;
            this.searchService = searchService;
            this.suggestService = suggestService;
            this.appService = appService;
            this.intlService = intlService;
            this.formatService = formatService;
            this.exprBuilder = exprBuilder;
            this.allFacets = allFacets;
            this.defaultFacets = defaultFacets;
            this._events = new rxjs.Subject();
            this._changes = new rxjs.Subject();
            /**
             * Utility function to returns aggregation item's index in supplied array with fallback to `display` comparison.
             * Otherwise -1, indicating that no element passed the test.
             * @param arr The array findIndex() was called upon
             * @param value The value to be test
             */
            this.findAggregationItemIndex = function (arr, item) {
                var index = arr.findIndex(function (it) { return it.value === item.value; });
                if (index === -1 && item.display) {
                    // fallback to display comparison
                    index = arr.findIndex(function (it) { return it.display === item.display; });
                }
                return index;
            };
            this.trimAllWhitespace = function (value) {
                switch (typeof value) {
                    case "string":
                        return value.replace(/\s/g, '');
                    default:
                        return value;
                }
            };
            // Listen to the user settings
            this.userSettingsService.events.subscribe(function (event) {
                // E.g. new login occurs
                // ==> Menus need to be rebuilt
                _this.events.next({ type: "Facet_Loaded" /* Loaded */ });
            });
            // Listen to own events, to trigger change events
            this._events.subscribe(function (event) {
                if (FACET_CHANGE_EVENTS.indexOf(event.type) !== -1) {
                    _this.changes.next(event);
                }
            });
        }
        Object.defineProperty(FacetService.prototype, "facets", {
            // GETTERS
            /**
             * Returns the list of this user's facets.
             * The list is stored in the user settings (this is a redirection).
             * Using this service creates the list of facets if it does not already exist.
             */
            get: function () {
                var _e;
                if (!this.userSettingsService.userSettings)
                    this.userSettingsService.userSettings = {};
                if (!this.userSettingsService.userSettings["facets"]) {
                    this.userSettingsService.userSettings["facets"] = [];
                    if (!!this.defaultFacets) {
                        (_e = this.userSettingsService.userSettings["facets"]).push.apply(_e, __spread(this.defaultFacets));
                        this.patchFacets();
                    }
                }
                return this.userSettingsService.userSettings["facets"];
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @returns a facet with the given name or undefined if it does not exist
         * @param name
         */
        FacetService.prototype.facet = function (name) {
            var i = this.facetIndex(name);
            return i >= 0 ? this.facets[i] : undefined;
        };
        /**
         * Returns the list of facet config in the given container (position)
         * @param position (default to 0 if there is a single container)
         */
        FacetService.prototype.getFacets = function (position) {
            var _this = this;
            if (position === void 0) { position = 0; }
            if (!this.allFacets) {
                return [];
            }
            return this.facets.filter(function (f) { return f.position === position; })
                .map(function (f) { return _this.allFacets.find(function (_f) { return _f.name === f.name; }); });
        };
        /**
         * Returns true if this facet is opened (in any container)
         * @param facetName
         */
        FacetService.prototype.isFacetOpened = function (facetName) {
            return !!this.facets.find(function (f) { return f.name === facetName; });
        };
        FacetService.prototype.facetIndex = function (name) {
            for (var i = 0, ic = this.facets.length; i < ic; i++) {
                var facet = this.facets[i];
                if (facet && facet.name === name) {
                    return i;
                }
            }
            return -1;
        };
        Object.defineProperty(FacetService.prototype, "events", {
            /**
             * Triggers any events regarding the facets
             */
            get: function () {
                return this._events;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FacetService.prototype, "changes", {
            /**
             * Triggers when events affect the list of facets
             * Cf. CHANGE_EVENTS list
             */
            get: function () {
                return this._changes;
            },
            enumerable: false,
            configurable: true
        });
        FacetService.prototype.addFacet = function (facet) {
            this.facets.push(facet);
            this.events.next({ type: "Facet_Added" /* Add */, facet: facet });
            this.patchFacets([{
                    type: "Facet_Added" /* Add */,
                    detail: {
                        facet: facet.name
                    }
                }]);
        };
        FacetService.prototype.removeFacet = function (facet) {
            var i = this.facetIndex(facet.name);
            if (i !== -1) {
                this.facets.splice(i, 1);
                this.events.next({ type: "Facet_Removed" /* Remove */, facet: facet });
                this.patchFacets([{
                        type: "Facet_Removed" /* Remove */,
                        detail: {
                            facet: facet.name
                        }
                    }]);
            }
        };
        FacetService.prototype.addAllFacet = function () {
            var _e;
            this.facets.splice(0, this.facets.length);
            if (!!this.defaultFacets)
                (_e = this.facets).push.apply(_e, __spread(this.defaultFacets));
            this.events.next({ type: "Facets_Added" /* AddAll */ });
            this.patchFacets([{
                    type: "Facets_Added" /* AddAll */
                }]);
        };
        FacetService.prototype.removeAllFacet = function () {
            this.facets.splice(0, this.facets.length);
            this.events.next({ type: "Facets_Removed" /* RemoveAll */ });
            this.patchFacets([{
                    type: "Facets_Removed" /* RemoveAll */
                }]);
        };
        /**
         * Updates facets in User settings.
         * @param auditEvents : Audit Events to be triggered
         * @returns an Observable which can be used to trigger further events
         */
        FacetService.prototype.patchFacets = function (auditEvents) {
            var _this = this;
            return this.userSettingsService.patch({ facets: this.facets }, auditEvents)
                .subscribe(function (next) {
                _this.events.next({ type: "Facet_Patched" /* Patched */ });
            }, function (error) {
                console.error("Could not patch Facets!", error);
            });
        };
        /**
         * Filter/Exclude an item in a facet and launch a search.
         * Triggers an internal event and an Audit Event
         * @param facetName
         * @param aggregation
         * @param items
         * @param options
         */
        FacetService.prototype.addFilterSearch = function (facetName, aggregation, items, options) {
            if (options === void 0) { options = {}; }
            var _c;
            var success = this.addFilter(facetName, aggregation, items, options);
            if (success) {
                this.events.next({ type: "Facet_AddFilter" /* AddFilter */, facet: this.facet(facetName) });
                return this.searchService.search(undefined, {
                    type: "Facet_AddFilter" /* AddFilter */,
                    detail: {
                        item: this.searchService.query.lastSelect(),
                        itembox: facetName,
                        itemcolumn: aggregation.column,
                        isitemexclude: options.not,
                        "from-result-id": (_c = this.searchService.results) === null || _c === void 0 ? void 0 : _c.id
                    }
                });
            }
            return Promise.resolve(false);
        };
        /**
         * Filter/Exclude one or more item(s) in a facet (without launching a search)
         * @param facetName
         * @param aggregation
         * @param items
         * @param options
         * @param query the query on which to add the filter (defaults to search service query)
         * @param breadcrumbs breadcrumbs in which to look for selected items (defaults  to search service breadcrumbs)
         */
        FacetService.prototype.addFilter = function (facetName, aggregation, items, options, query, breadcrumbs) {
            if (options === void 0) { options = {}; }
            if (query === void 0) { query = this.searchService.query; }
            if (breadcrumbs === void 0) { breadcrumbs = this.searchService.breadcrumbs; }
            if (!items) {
                return false;
            }
            if (options.replaceCurrent) {
                query.removeSelect(facetName);
            }
            if (!aggregation.isTree && (breadcrumbs === null || breadcrumbs === void 0 ? void 0 : breadcrumbs.activeSelects.length) && !options.replaceCurrent) {
                var expr_1 = breadcrumbs.findSelect(facetName);
                var index = breadcrumbs.activeSelects.findIndex(function (select) { return select.facet === facetName && (select.expr === expr_1 || select.expr === (expr_1 === null || expr_1 === void 0 ? void 0 : expr_1.parent)); });
                var same = (!Array.isArray(items)) ? true : (options.and ? "AND" : "OR") === ((expr_1 === null || expr_1 === void 0 ? void 0 : expr_1.and) ? "AND" : "OR") && (options.not ? "YES" : "NO") === ((expr_1 === null || expr_1 === void 0 ? void 0 : expr_1.not) ? "YES" : "NO");
                if (expr_1 && same && index !== -1) {
                    var _items = void 0;
                    if (expr_1 === null || expr_1 === void 0 ? void 0 : expr_1.operands) {
                        _items = this.exprToAggregationItem(expr_1.operands, aggregation.valuesAreExpressions).concat(items);
                    }
                    else {
                        // previous selection is a single value
                        _items = this.exprToAggregationItem(expr_1, aggregation.valuesAreExpressions).concat(items);
                    }
                    // MUST reset $excluded property otherwise expression is misunderstood
                    _items.forEach(function (item) { return item.$excluded = undefined; });
                    // overrides options settings with expression if any
                    var _expr = this.exprBuilder.makeAggregationExpr(aggregation, _items, options.and || expr_1.and);
                    if (options.not || expr_1.not) {
                        _expr = this.exprBuilder.makeNotExpr(_expr);
                    }
                    if (_expr) {
                        query.replaceSelect(index, { expression: _expr, facet: facetName });
                        return true;
                    }
                }
            }
            var expr = this.exprBuilder.makeAggregationExpr(aggregation, items, options.and);
            if (options.not) {
                expr = this.exprBuilder.makeNotExpr(expr);
            }
            if (expr) {
                query.addSelect(expr, facetName);
                return true;
            }
            return false;
        };
        /**
         * Clears the query from the current selection on the given facet
         * @param facetName
         * @param all
         * @param query the query to clear from the facet selection (defaults to search service query)
         */
        FacetService.prototype.clearFilters = function (facetName, all, query) {
            if (query === void 0) { query = this.searchService.query; }
            query.removeSelect(facetName, all);
        };
        /**
         * Clears the query from the current selection on the given facet and perform a search
         * @param facetName
         * @param all
         */
        FacetService.prototype.clearFiltersSearch = function (facetName, all) {
            var _this = this;
            var _c;
            [].concat(facetName).forEach(function (name) {
                _this.clearFilters(name, all);
                _this._events.next({ type: "Facet_ClearFilters" /* ClearFilters */, facet: _this.facet(name) });
            });
            return this.searchService.search(undefined, {
                type: "Facet_ClearFilters" /* ClearFilters */,
                detail: {
                    itembox: facetName,
                    "from-result-id": (_c = this.searchService.results) === null || _c === void 0 ? void 0 : _c.id
                }
            });
        };
        /**
         * Remove a filter and update the appropriate Select if it was previously included in a selection
         * @param facetName the facet that removes the filter
         * @param aggregation the aggregation that contains the item to remove
         * @param item the aggregation item to remove from the query
         * @param query the query on which to remove the filter (defaults to search service query)
         * @param breadcrumbs breadcrumbs in which to look for selected items (defaults  to search service breadcrumbs)
         */
        FacetService.prototype.removeFilter = function (facetName, aggregation, item, query, breadcrumbs) {
            if (query === void 0) { query = this.searchService.query; }
            if (breadcrumbs === void 0) { breadcrumbs = this.searchService.breadcrumbs; }
            if (breadcrumbs) {
                // if item is excluded, makeAggregation() should returns a NOT expression
                var stringExpr = item.$excluded ? this.exprBuilder.makeNotExpr(this.exprBuilder.makeAggregationExpr(aggregation, item)) : this.exprBuilder.makeAggregationExpr(aggregation, item);
                var filterExpr = this.findItemFilter(facetName, aggregation, item, breadcrumbs) || this.appService.parseExpr(stringExpr);
                var expr_2 = breadcrumbs.findSelect(facetName, filterExpr);
                var i = breadcrumbs.activeSelects.findIndex(function (select) { return select.facet === facetName && (select.expr === expr_2 || select.expr === (expr_2 === null || expr_2 === void 0 ? void 0 : expr_2.parent)); });
                // 'Select' can't be created when aggregation is a tree map, so, avoid aggregation tree
                // and remove whole breadcrumbs
                if (!aggregation.isTree && expr_2 && expr_2.parent && expr_2.parent.operands.length > 1) {
                    // create a new Expr from parent and replaces Select by this new one
                    // so, breadcrumbs stay ordered
                    var filterByValuesAreExpression = function (it) { return it.value.toString().replace(/ /g, "") !== item.value.toString().replace(/ /g, ""); };
                    var filterByValue = function (it) { return it.value !== item.value; };
                    var filter = (aggregation.valuesAreExpressions) ? filterByValuesAreExpression : filterByValue;
                    var items = this.exprToAggregationItem(expr_2.parent.operands, aggregation.valuesAreExpressions).filter(filter);
                    // MUST reset $excluded property otherwise expression is misunderstood (mainly NOT expressions)
                    items.forEach(function (item) { return item.$excluded = undefined; });
                    var _e = breadcrumbs.selects[i].expr || {}, not = _e.not, and = _e.and;
                    var _expr = this.exprBuilder.makeAggregationExpr(aggregation, items, and);
                    if (not) {
                        _expr = this.exprBuilder.makeNotExpr(_expr);
                    }
                    if (_expr) {
                        query.replaceSelect(i, { expression: _expr, facet: facetName });
                        return { expression: this.exprBuilder.makeAggregationExpr(aggregation, item), facet: facetName };
                    }
                }
                else {
                    // filter is a single value... remove it
                    var select = query.select ? query.select[i] : undefined;
                    query.removeSelect(i);
                    return select;
                }
            }
            return undefined;
        };
        /**
         * Removes the aggregation from the search service query and refresh the search
         * @param facetName
         * @param aggregation
         * @param item
         */
        FacetService.prototype.removeFilterSearch = function (facetName, aggregation, item) {
            var select = this.removeFilter(facetName, aggregation, item);
            if (select) {
                this._events.next({ type: "Facet_RemoveFilter" /* RemoveFilter */, facet: this.facet(facetName || "") });
                delete this.searchService.query.queryId; // SBA-154
                return this.searchService.search(undefined, {
                    type: "Facet_RemoveFilter" /* RemoveFilter */,
                    detail: {
                        item: { expression: select === null || select === void 0 ? void 0 : select.expression, facet: select === null || select === void 0 ? void 0 : select.facet },
                        itembox: facetName,
                        itemcolumn: aggregation.column,
                        "from-result-id": !!this.searchService.results ? this.searchService.results.id : null
                    }
                });
            }
            return Promise.resolve(false);
        };
        /**
         * Queries the server for data for this aggregation
         * @param aggregation
         * @param skip
         * @param count
         * @param query the query to use to fetch the data (default to search service query)
         */
        FacetService.prototype.loadData = function (aggregation, skip, count, query, searchInactive) {
            var _this = this;
            if (skip === void 0) { skip = 0; }
            if (count === void 0) { count = 10; }
            if (query === void 0) { query = this.searchService.query; }
            if (searchInactive === void 0) { searchInactive = true; }
            query = base.Utils.copy(query);
            query.action = "aggregate";
            query.aggregations = {};
            query.aggregations[aggregation] = { skip: skip, count: count };
            return this.searchService.getResults(query, undefined, { searchInactive: searchInactive }).pipe(operators.map(function (results) {
                var data = results.aggregations.find(function (a) { return base.Utils.eqNC(a.name, aggregation); });
                if (data) {
                    _this.setColumn(data); // Useful for formatting and i18n
                }
                return data;
            }));
        };
        /**
         * Get suggestions given a text and a field name, using the Suggest service
         * @param text
         * @param field
         * @param suggestQuery
         */
        FacetService.prototype.suggest = function (text, field, suggestQuery) {
            if (suggestQuery === void 0) { suggestQuery = this.appService.suggestQueries[0]; }
            return this.suggestService.get(suggestQuery, text, [field], this.searchService.query);
        };
        /**
         * Format the given result item, using field formatter and/or i18n service
         * @param item
         */
        FacetService.prototype.formatValue = function (item) {
            return this.intlService.formatMessage(this.formatService.formatFieldValue(item, item.$column));
        };
        /**
         * Returns true if this facet has at least one active selection
         * filtering the search
         * @param facetName
         * @param breadcrumbs breadcrumbs in which to look for selected items (defaults to search service breadcrumbs)
         */
        FacetService.prototype.hasFiltered = function (facetName, breadcrumbs) {
            if (breadcrumbs === void 0) { breadcrumbs = this.searchService.breadcrumbs; }
            return !!this.findFilter(facetName, breadcrumbs);
        };
        /**
         * Returns an active selection of this facet filtering the search
         * Returns it as an expression
         * @param facetName
         * @param breadcrumbs breadcrumbs in which to look for selected items (defaults to search service breadcrumbs)
         */
        FacetService.prototype.findFilter = function (facetName, breadcrumbs) {
            if (breadcrumbs === void 0) { breadcrumbs = this.searchService.breadcrumbs; }
            return breadcrumbs === null || breadcrumbs === void 0 ? void 0 : breadcrumbs.findSelect(facetName);
        };
        /**
         * Look for an aggregation with the given name in the search results and returns it.
         * Takes care of initializing the aggregation items to insert their $column property.
         * @param aggregationName
         * @param results The search results can be provided explicitly or taken from the SearchService implicitly.
         */
        FacetService.prototype.getAggregation = function (aggregationName, results, treeAggregationOptions) {
            if (results === void 0) { results = this.searchService.results; }
            if (results === null || results === void 0 ? void 0 : results.aggregations) {
                var aggregation = results.aggregations.find(function (agg) { return base.Utils.eqNC(agg.name, aggregationName); });
                if (aggregation) {
                    this.setColumn(aggregation); // Useful for formatting and i18n
                    if (aggregation.isTree && treeAggregationOptions) {
                        var expr = this.findFilter(treeAggregationOptions.facetName);
                        var expandPaths = expr ? expr.getValues(aggregation.column) : [];
                        this.initTreeNodes(treeAggregationOptions.facetName, aggregation, "/", aggregation.items, expandPaths, treeAggregationOptions.levelCallback);
                        return aggregation;
                    }
                    return aggregation;
                }
            }
            return undefined;
        };
        /**
         * Look for a Tree aggregation with the given name in the search results and returns it.
         * Takes care of initializing the Node aggregation items to insert their properties ($column, $path, $opened, $level)
         * @deprecated use getAggregation() instead
         * @param facetName
         * @param aggregationName
         * @param results The search results can be provided explicitly or taken from the SearchService implicitly.
         * @param levelCallback A callback method called at every level of the tree.
         * Can be used to read or alter the properties of the nodes (opening, closing), or node list (sorting)
         */
        FacetService.prototype.getTreeAggregation = function (facetName, aggregationName, results, levelCallback) {
            if (results === void 0) { results = this.searchService.results; }
            var agg = this.getAggregation(aggregationName, results);
            if (agg === null || agg === void 0 ? void 0 : agg.isTree) {
                var expr = this.findFilter(facetName);
                var expandPaths = expr ? expr.getValues(agg.column) : [];
                this.initTreeNodes(facetName, agg, "/", agg.items, expandPaths, levelCallback);
                return agg;
            }
            return undefined;
        };
        /**
         * Returns the count parameter of the given aggregation (default is 10)
         * @param aggregationName
         */
        FacetService.prototype.getAggregationCount = function (aggregationName) {
            var _c;
            return ((_c = this.appService.getCCAggregation(aggregationName)) === null || _c === void 0 ? void 0 : _c.count) || 10;
        };
        /**
         * Opens a Tree node of the given tree facet by querying data from the server
         * Takes care of initializing the Node aggregation items to insert their properties ($column, $path, $opened, $level)
         * @param facetName
         * @param aggregation
         * @param item
         * @param levelCallback A callback method called at every level of the tree.
         * Can be used to read or alter the properties of the nodes (opening, closing), or node list (sorting)
         */
        FacetService.prototype.open = function (facetName, aggregation, item, levelCallback, query, searchInactive) {
            var _this = this;
            if (query === void 0) { query = this.searchService.query; }
            if (searchInactive === void 0) { searchInactive = true; }
            var value = item.$path + "*";
            query = i4.Query.copy(query);
            query.action = "open";
            var expr = this.exprBuilder.makeExpr(aggregation.column, value);
            query.addOpen(expr, aggregation.name);
            this.events.next({ type: "Facet_TreeOpen" /* Open */, facet: this.facet(facetName) });
            return this.searchService.getResults(query, undefined, { searchInactive: searchInactive }).pipe(operators.map(function (results) {
                if (item.$path) {
                    var source = FacetService.getAggregationNode(results.aggregations[0].items, item.$path);
                    var target = FacetService.getAggregationNode(aggregation.items, item.$path);
                    if (source && target) {
                        target.items = source.items; // Insert the new data (source) into the original (target)
                    }
                    if (target && target.items) {
                        _this.initTreeNodes(facetName, aggregation, item.$path, target.items, undefined, levelCallback);
                    }
                }
                return results;
            }));
        };
        /**
         * Returns true if a given aggregation item is currently actively filtering the search
         * @param facetName
         * @param aggregation
         * @param item
         * @param breadcrumbs breadcrumbs in which to look for selected items (default to search service breadcrumbs)
         */
        FacetService.prototype.itemFiltered = function (facetName, aggregation, item, breadcrumbs) {
            if (breadcrumbs === void 0) { breadcrumbs = this.searchService.breadcrumbs; }
            return !!this.findItemFilter(facetName, aggregation, item, breadcrumbs);
        };
        FacetService.prototype.findItemFilter = function (facetName, aggregation, item, breadcrumbs) {
            var expr;
            var exprText;
            if (!aggregation.valuesAreExpressions) {
                var value = void 0;
                if (aggregation.isTree) {
                    value = base.Utils.toSqlValue(item.$path + "*");
                }
                else {
                    value = base.Utils.toSqlValue(item.value);
                }
                exprText = this.exprBuilder.makeExpr(aggregation.column, value);
            }
            else {
                exprText = item.value;
            }
            var ret = this.appService.parseExpr(exprText);
            if (ret instanceof i4.Expr) {
                expr = ret;
            }
            if (expr) {
                var expr2 = breadcrumbs === null || breadcrumbs === void 0 ? void 0 : breadcrumbs.findSelect(facetName, expr);
                if (!!expr2 && (!expr2.parent || !expr2.parent.parent)) {
                    return expr2;
                }
            }
            return undefined;
        };
        /**
         * Initializes the nodes of a tree (private, with a callback)
         * @param facetName
         * @param aggregation
         * @param root
         * @param children
         * @param expandPaths
         * @param levelCallback
         */
        FacetService.prototype.initTreeNodes = function (facetName, aggregation, root, children, expandPaths, levelCallback) {
            var _this = this;
            if (!children) {
                return;
            }
            var rootLevel;
            if (root) {
                rootLevel = base.Utils.count(root, "/", false) - 1;
            }
            else {
                root = "/";
                rootLevel = 0;
            }
            var column = this.appService.getColumn(aggregation.column);
            base.Utils.traverse(children, function (_nodes) {
                var e_1, _e;
                if (!_nodes) {
                    return false;
                }
                var path = root;
                var level = rootLevel;
                try {
                    for (var _nodes_1 = __values(_nodes), _nodes_1_1 = _nodes_1.next(); !_nodes_1_1.done; _nodes_1_1 = _nodes_1.next()) {
                        var _node_1 = _nodes_1_1.value;
                        path = path + _node_1.value + "/";
                        level++;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_nodes_1_1 && !_nodes_1_1.done && (_e = _nodes_1.return)) _e.call(_nodes_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                // console.log(path);
                var _node = _nodes[_nodes.length - 1];
                _node.$path = path;
                _node.$column = column;
                _node.$level = level;
                _node.$opened = false;
                _node.$filtered = _this.itemFiltered(facetName, aggregation, _node);
                expandPaths === null || expandPaths === void 0 ? void 0 : expandPaths.forEach(function (expandPath) {
                    if (expandPath.indexOf(path) === 0) {
                        var count = !!_node.items ? _node.items.length : _node.hasChildren ? -1 : 0;
                        if (count > 0) {
                            _node.$opened = true;
                        }
                    }
                });
                if (levelCallback) {
                    levelCallback(_nodes, level, _node);
                }
                return false; // don't stop
            });
        };
        FacetService.prototype.setColumn = function (aggregation) {
            if (!aggregation.isTree && aggregation.items) {
                var column_1 = this.appService.getColumn(aggregation.column);
                aggregation.items.forEach(function (value) { return value.$column = column_1; });
            }
        };
        // static methods
        FacetService.splitTreepath = function (path) {
            if (!path)
                return [];
            path = path.trim();
            if (path.length > 0 && path[0] === "/") {
                path = path.substr(1);
            }
            if (path.length > 0 && path[path.length - 1] === "/") {
                path = path.substr(0, path.length - 1);
            }
            if (path.length === 0) {
                return [];
            }
            return path.split("/");
        };
        FacetService.treepathLast = function (path) {
            var parts = FacetService.splitTreepath(path);
            if (!parts || parts.length === 0) {
                return "";
            }
            return parts[parts.length - 1];
        };
        FacetService.getAggregationNode = function (nodes, path) {
            if (!nodes || nodes.length === 0) {
                return undefined;
            }
            var names = FacetService.splitTreepath(path);
            var node;
            for (var _i = 0, _a = names; _i < _a.length; _i++) {
                if (!nodes || nodes.length === 0) {
                    return undefined;
                }
                var name = _a[_i].toLocaleLowerCase();
                node = undefined;
                for (var _j = 0, _b = nodes; _j < _b.length; _j++) {
                    var _node = _b[_j];
                    if (_node.value.toLocaleLowerCase() === name) {
                        node = _node;
                        break;
                    }
                }
                if (!node) {
                    return undefined;
                }
                nodes = node.items;
            }
            return node;
        };
        /**
         * Convert an Expression object or an Expression Array to their AggregationItem equivalent
         *
         * @param expr Expression object or Expression Array
         * @param valuesAreExpressions when true values should be converted to string otherwise no
         *
         * @returns AggregationItem array with converted expression or an empty array
         */
        FacetService.prototype.exprToAggregationItem = function (expr, valuesAreExpressions) {
            if (valuesAreExpressions === void 0) { valuesAreExpressions = false; }
            var fn = [
                function (item) {
                    var _c, _d;
                    var value = item.value;
                    if (((_c = item.column) === null || _c === void 0 ? void 0 : _c.eType) === 1 /* bool */) {
                        value = base.Utils.isTrue(item.value);
                    }
                    return { count: 0, value: value, display: item.display, $column: item.column, $excluded: ((item === null || item === void 0 ? void 0 : item.not) || ((_d = item === null || item === void 0 ? void 0 : item.parent) === null || _d === void 0 ? void 0 : _d.not)) };
                },
                function (item) { var _c; return ({ count: 0, value: item.toString((item.value) ? true : false), display: item.display, $column: item.column, $excluded: ((item === null || item === void 0 ? void 0 : item.not) || ((_c = item === null || item === void 0 ? void 0 : item.parent) === null || _c === void 0 ? void 0 : _c.not)) }); }
            ];
            var callback = valuesAreExpressions ? fn[1] : fn[0];
            return [].concat(expr).map(callback);
        };
        /**
         * Get all Breadcrumbs items from a specific facet
         *
         * @param facetName facet name where to extract all breadcrumbs
         * @param breadcrumbs breadcrumbs in which to look for selected items
         */
        FacetService.prototype.getBreadcrumbsItems = function (facetName, breadcrumbs) {
            return (breadcrumbs === null || breadcrumbs === void 0 ? void 0 : breadcrumbs.items.filter(function (item) { return item.facet === facetName; })) || [];
        };
        /**
         * Get all Aggregation items from a facet, currently filtered
         *
         * @param facetName facet name where to inspect
         * @param valuesAreExpressions when true, some transformations should be done
         * @param breadcrumbs breadcrumbs in which to look for selected items (default to search service breadcrumbs)
         */
        FacetService.prototype.getAggregationItemsFiltered = function (facetName, valuesAreExpressions, breadcrumbs) {
            var e_2, _e;
            if (valuesAreExpressions === void 0) { valuesAreExpressions = false; }
            if (breadcrumbs === void 0) { breadcrumbs = this.searchService.breadcrumbs; }
            var _c, _d;
            var items = this.getBreadcrumbsItems(facetName, breadcrumbs);
            // aggregation items are constructed from nested expressions
            var expr = [];
            try {
                for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                    var item = items_1_1.value;
                    var value = (((_c = item.expr) === null || _c === void 0 ? void 0 : _c.display) === undefined) ? ((_d = item.expr) === null || _d === void 0 ? void 0 : _d.operands) || item.expr : item.expr;
                    if (value) {
                        expr.push(value);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (items_1_1 && !items_1_1.done && (_e = items_1.return)) _e.call(items_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            // faltten results
            var flattenExpr = [].concat.apply([], expr);
            return this.exprToAggregationItem(flattenExpr, valuesAreExpressions);
        };
        /**
         * Convert Suggestion to AggregationItem
         * @param suggest a Suggestion object
         *
         * @returns AggregationItem object with is `$column` property defined.
         * On boolean type, convert `value` property to boolean
         */
        FacetService.prototype.suggestionToAggregationItem = function (suggest) {
            var _c;
            var item = {
                value: suggest.normalized || suggest.display,
                display: suggest.display,
                count: +(suggest.frequency || 0),
                $column: this.appService.getColumn(suggest.category)
            };
            if (((_c = item.$column) === null || _c === void 0 ? void 0 : _c.eType) === 1 /* bool */) {
                item.value = base.Utils.isTrue(item.value);
            }
            return item;
        };
        /**
         * Converts a list of suggestions into a structure of TreeAggregationNodes
         * @param suggests Suggestions to convert
         * @param searchTerm The searched term in the suggestions
         * @param aggregation The tree aggregations
         */
        FacetService.prototype.suggestionsToTreeAggregationNodes = function (suggests, searchTerm, aggregation) {
            var _this = this;
            var suggestions = [];
            if (suggests.length > 0) {
                var path2node_1 = new Map();
                var searchPattern_1 = new RegExp("\\b" + searchTerm, 'i');
                var column_2 = this.appService.getColumn(aggregation === null || aggregation === void 0 ? void 0 : aggregation.column);
                suggests.forEach(function (suggest) {
                    if (suggest.display.length > 1) {
                        var match = searchPattern_1.exec(suggest.display);
                        _this.addNode(suggestions, path2node_1, "/", suggest.display, +(suggest.frequency || 0), 1, ((match === null || match === void 0 ? void 0 : match.index) || 0) + searchTerm.length, column_2);
                    }
                });
            }
            return suggestions;
        };
        /**
         * Utility recursive function to generate a tree aggregation structure from
         * a list of suggestions
         */
        FacetService.prototype.addNode = function (items, path2node, parentPath, path, count, level, matchend, column) {
            var nextChild = path.indexOf("/", parentPath.length); // path = /Cities/Paris/17e/   parentPath = /Cities/
            var currentPath = path.substring(0, nextChild + 1); // => currentPath = /Cities/Paris/
            var node = path2node.get(currentPath);
            if (!node) {
                var value = path.substring(parentPath.length, nextChild);
                node = {
                    value: value,
                    count: count,
                    items: [],
                    hasChildren: false,
                    $column: column,
                    $level: level,
                    $opened: matchend >= currentPath.length,
                    $path: currentPath
                };
                path2node.set(currentPath, node);
                items.push(node);
            }
            if (currentPath.length < path.length) {
                node.hasChildren = true;
                this.addNode(node.items, path2node, currentPath, path, count, level + 1, matchend, column);
            }
        };
        /**
         * Check if a facet contains items
         * @param aggregation aggregation name
         * @param results search results
         *
         * @returns true if the facet contains a least one item otherwise false
         */
        FacetService.prototype.hasData = function (aggregation, results) {
            var _c, _d;
            // Avoid calling getAggregation() which is costly
            return !!((_d = (_c = results.aggregations.find(function (agg) { return base.Utils.eqNC(agg.name, aggregation); })) === null || _c === void 0 ? void 0 : _c.items) === null || _d === void 0 ? void 0 : _d.length);
        };
        /**
         * Returns the index of the first element in the supplied array
         * corresponding to `item.value` or -1 when not found.
         * A fallback to `item.display` is done before returning -1
         * @param item item to find
         */
        FacetService.prototype.filteredIndex = function (data, arr, item) {
            var _this = this;
            var indx = -1;
            // specific to Values Are Expressions where expression are not well formatted by Expression Parser
            // eg: when values is : "> 0", Expression Parser returns : ">0" without space between operator and value
            if (data === null || data === void 0 ? void 0 : data.valuesAreExpressions) {
                var value_1 = this.trimAllWhitespace(item.value);
                var normalizedArr = arr.map(function (item) { return (Object.assign(Object.assign({}, item), { value: _this.trimAllWhitespace(item.value) })); }) || [];
                indx = normalizedArr.findIndex(function (it) { return it.value === value_1; });
            }
            else {
                indx = this.findAggregationItemIndex(arr, item);
            }
            return indx;
        };
        return FacetService;
    }());
    FacetService.ɵfac = function FacetService_Factory(t) { return new (t || FacetService)(i0.ɵɵinject(i1.UserSettingsWebService), i0.ɵɵinject(i2.SearchService), i0.ɵɵinject(i3.SuggestService), i0.ɵɵinject(i4.AppService), i0.ɵɵinject(i4$1.IntlService), i0.ɵɵinject(i4.FormatService), i0.ɵɵinject(i4.ExprBuilder), i0.ɵɵinject(ALL_FACETS, 8), i0.ɵɵinject(DEFAULT_FACETS, 8)); };
    FacetService.ɵprov = i0.ɵɵdefineInjectable({ token: FacetService, factory: FacetService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(FacetService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () {
            return [{ type: i1.UserSettingsWebService }, { type: i2.SearchService }, { type: i3.SuggestService }, { type: i4.AppService }, { type: i4$1.IntlService }, { type: i4.FormatService }, { type: i4.ExprBuilder }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [ALL_FACETS]
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [DEFAULT_FACETS]
                        }] }];
        }, null);
    })();

    var _c0 = ["settingsTpl"];
    var _c1 = ["headerTpl"];
    var _c2 = ["subHeaderTpl"];
    var _c3 = ["footerTpl"];
    /**
     * This interface should be implemented by facet components, which expose
     * a list of actions and event listeners
     */
    var AbstractFacet = /** @class */ (function () {
        function AbstractFacet() {
            /**
             * Event emitter triggered when the list of action changes
             */
            this.actionsChanged = new i0.EventEmitter();
        }
        Object.defineProperty(AbstractFacet.prototype, "actions", {
            /**
             * List of custom actions of this facet
             */
            get: function () { return []; },
            enumerable: false,
            configurable: true
        });
        /**
         * Method called when a facet is collapsed
         */
        AbstractFacet.prototype.onCollapse = function (collapsed) { };
        /**
         * Method called when a facet is resized via an action (not accounting for window resizing)
         */
        AbstractFacet.prototype.onExpand = function (expanded) { };
        /**
         * Method called when the settings of this facet are opened
         */
        AbstractFacet.prototype.onOpenSettings = function (settingsOpened) { };
        /**
         * Method enabling the facet component to be hidden (if, for example there is no data to display)
         */
        AbstractFacet.prototype.isHidden = function () {
            return false;
        };
        return AbstractFacet;
    }());
    AbstractFacet.ɵfac = function AbstractFacet_Factory(t) { return new (t || AbstractFacet)(); };
    AbstractFacet.ɵcmp = i0.ɵɵdefineComponent({ type: AbstractFacet, selectors: [["ng-component"]], viewQuery: function AbstractFacet_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵstaticViewQuery(_c0, true, i0.TemplateRef);
                i0.ɵɵstaticViewQuery(_c1, true, i0.TemplateRef);
                i0.ɵɵstaticViewQuery(_c2, true, i0.TemplateRef);
                i0.ɵɵstaticViewQuery(_c3, true, i0.TemplateRef);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.settingsTpl = _t.first);
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.headerTpl = _t.first);
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.subHeaderTpl = _t.first);
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.footerTpl = _t.first);
            }
        }, outputs: { actionsChanged: "actionsChanged" }, decls: 0, vars: 0, template: function AbstractFacet_Template(rf, ctx) { }, encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AbstractFacet, [{
                type: i0.Component,
                args: [{
                        template: ""
                    }]
            }], null, { actionsChanged: [{
                    type: i0.Output
                }], settingsTpl: [{
                    type: i0.ViewChild,
                    args: ["settingsTpl", { static: true, read: i0.TemplateRef }]
                }], headerTpl: [{
                    type: i0.ViewChild,
                    args: ["headerTpl", { static: true, read: i0.TemplateRef }]
                }], subHeaderTpl: [{
                    type: i0.ViewChild,
                    args: ["subHeaderTpl", { static: true, read: i0.TemplateRef }]
                }], footerTpl: [{
                    type: i0.ViewChild,
                    args: ["footerTpl", { static: true, read: i0.TemplateRef }]
                }] });
    })();

    var _c0$1 = ["facet"];
    function BsFacetCard_div_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "div", 10);
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵclassMapInterpolate1("card-icon ", ctx_r0.icon, " mr-2");
        }
    }
    function BsFacetCard_div_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 11);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.title));
        }
    }
    function BsFacetCard_ng_container_7_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0, 12);
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext();
            i0.ɵɵproperty("ngTemplateOutlet", ctx_r2.facetComponent.headerTpl);
        }
    }
    function BsFacetCard_ng_container_9_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0, 12);
        }
        if (rf & 2) {
            var ctx_r3 = i0.ɵɵnextContext();
            i0.ɵɵproperty("ngTemplateOutlet", ctx_r3.facetComponent.subHeaderTpl);
        }
    }
    function BsFacetCard_sq_collapse_10_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵprojection(0);
        }
    }
    function BsFacetCard_sq_collapse_10_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "sq-collapse", 13);
            i0.ɵɵtemplate(1, BsFacetCard_sq_collapse_10_ng_template_1_Template, 1, 0, "ng-template");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r4 = i0.ɵɵnextContext();
            i0.ɵɵproperty("collapsed", ctx_r4._collapsed);
        }
    }
    function BsFacetCard_ng_container_11_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0, 12);
        }
        if (rf & 2) {
            var ctx_r5 = i0.ɵɵnextContext();
            i0.ɵɵproperty("ngTemplateOutlet", ctx_r5.facetComponent.settingsTpl);
        }
    }
    function BsFacetCard_ng_container_12_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0, 14);
        }
        if (rf & 2) {
            var ctx_r6 = i0.ɵɵnextContext();
            i0.ɵɵproperty("ngTemplateOutlet", ctx_r6.facetComponent.footerTpl);
        }
    }
    var _c1$1 = function (a0, a1, a2) { return { items: a0, style: a1, size: a2, rightAligned: true }; };
    var _c2$1 = ["*"];
    var BsFacetCard = /** @class */ (function () {
        function BsFacetCard(changeDetectorRef) {
            var _this = this;
            this.changeDetectorRef = changeDetectorRef;
            /**
             * List of custom actions for this facet (optional)
             */
            this.actions = [];
            /**
             * Whether the [actions]="..." passed by binding should be displayed before or after
             * the actions from the inner facet component
             */
            this.actionsFirst = true;
            /**
             * Size of the custom actions
             */
            this.actionsSize = "sm";
            /**
             * Whether the facet can be collapsed (default: true)
             */
            this.collapsible = true;
            /**
             * Whether the facet starts collapsed (if collapsible / default: false)
             */
            this.startCollapsed = false;
            /**
             * Whether other actions should be hidden when the facet is collapsed (default: true)
             */
            this.hideActionsCollapsed = true;
            /**
             * Whether the facet can be expanded (default: false)
             */
            this.expandable = false;
            /**
             * Whether the facet starts expanded (if expandable / default: false)
             */
            this.startExpanded = false;
            /**
             * Whether the facet starts with opened settings (default: false)
             */
            this.startSettingsOpened = false;
            /**
             * Event triggered when the facet gets expanded or reduced
             */
            this.facetExpanded = new i0.EventEmitter();
            /**
             * Event triggered when the facet gets expanded or reduced
             */
            this.facetCollapsed = new i0.EventEmitter();
            /**
             * Event triggered when the facet gets expanded or reduced
             */
            this.settingsOpened = new i0.EventEmitter();
            this.collapseAction = new i3$1.Action({
                action: function (action) {
                    _this._collapsed = !_this._collapsed;
                    _this.facetCollapsed.next(_this._collapsed ? "collapsed" : "expanded");
                    if (!!_this.facetComponent) {
                        _this.facetComponent.onCollapse(_this._collapsed);
                    }
                    action.update();
                },
                updater: function (action) {
                    action.icon = _this._collapsed ? "fas fa-chevron-down" : "fas fa-chevron-up";
                    action.title = _this._collapsed ? 'msg#facetCard.expand' : 'msg#facetCard.collapse';
                }
            });
            this.expandAction = new i3$1.Action({
                action: function (action) {
                    _this._expanded = !_this._expanded;
                    _this.facetExpanded.next(_this._expanded ? "expanded" : "reduced");
                    if (!!_this.facetComponent) {
                        _this.facetComponent.onExpand(_this._expanded);
                    }
                    action.update();
                },
                updater: function (action) {
                    action.icon = _this._expanded ? "fas fa-compress" : "fas fa-expand";
                    action.title = _this._expanded ? "msg#facetCard.reduce" : "msg#facetCard.enlarge";
                }
            });
            this.settingsAction = new i3$1.Action({
                action: function (action) {
                    _this._settingsOpened = !_this._settingsOpened;
                    _this.settingsOpened.next(_this._settingsOpened ? "opened" : "saved");
                    if (!!_this.facetComponent) {
                        _this.facetComponent.onOpenSettings(_this._settingsOpened);
                    }
                    action.update();
                },
                updater: function (action) {
                    action.icon = _this._settingsOpened ? "far fa-save" : "fas fa-cog";
                    action.title = _this._settingsOpened ? "msg#facetCard.saveSettings" : "msg#facetCard.openSettings";
                }
            });
        }
        Object.defineProperty(BsFacetCard.prototype, "hidden", {
            get: function () {
                return !!this.facetComponent && !!this.facetComponent.isHidden && this.facetComponent.isHidden();
            },
            enumerable: false,
            configurable: true
        });
        BsFacetCard.prototype.ngOnInit = function () {
            // Initialize actions
            this._collapsed = this.startCollapsed;
            this._expanded = this.startExpanded;
            this._settingsOpened = this.startSettingsOpened;
            this.collapseAction.update();
            this.expandAction.update();
            this.settingsAction.update();
        };
        BsFacetCard.prototype.ngAfterContentInit = function () {
            var _this = this;
            if (this.facetComponent) {
                this.actionChangedSubscription = this.facetComponent.actionsChanged.subscribe(function (actions) {
                    _this.allActions.forEach(function (action) { return action.update(); });
                    _this.changeDetectorRef.markForCheck();
                });
            }
            else {
                console.warn("No #facet component is defined in this facet card: ", this.title);
            }
        };
        BsFacetCard.prototype.ngOnDestroy = function () {
            if (this.actionChangedSubscription) {
                this.actionChangedSubscription.unsubscribe();
            }
        };
        Object.defineProperty(BsFacetCard.prototype, "allActions", {
            get: function () {
                if (this.hideActionsCollapsed && this._collapsed)
                    return [this.collapseAction]; // Hide other actions if collapsed
                var actions = [];
                if (this.actionsFirst) {
                    actions.push.apply(actions, __spread(this.actions));
                }
                if (this.facetComponent)
                    actions = actions.concat(this.facetComponent.actions);
                if (this.hasSettings)
                    actions.push(this.settingsAction);
                if (this.expandable)
                    actions.push(this.expandAction);
                if (this.collapsible)
                    actions.push(this.collapseAction);
                if (!this.actionsFirst) {
                    actions.push.apply(actions, __spread(this.actions));
                }
                return actions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsFacetCard.prototype, "hasSettings", {
            get: function () {
                return !!this.facetComponent && !!this.facetComponent.settingsTpl;
            },
            enumerable: false,
            configurable: true
        });
        return BsFacetCard;
    }());
    BsFacetCard.ɵfac = function BsFacetCard_Factory(t) { return new (t || BsFacetCard)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    BsFacetCard.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetCard, selectors: [["sq-facet-card"]], contentQueries: function BsFacetCard_ContentQueries(rf, ctx, dirIndex) {
            if (rf & 1) {
                i0.ɵɵcontentQuery(dirIndex, _c0$1, true);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.facetComponent = _t.first);
            }
        }, hostVars: 7, hostBindings: function BsFacetCard_HostBindings(rf, ctx) {
            if (rf & 2) {
                i0.ɵɵhostProperty("hidden", ctx.hidden);
                i0.ɵɵclassProp("collapsed", ctx._collapsed)("expanded", ctx._expanded)("settings-opened", ctx._settingsOpened);
            }
        }, inputs: { title: "title", tooltip: "tooltip", icon: "icon", buttonsStyle: "buttonsStyle", actions: "actions", actionsFirst: "actionsFirst", actionsSize: "actionsSize", collapsible: "collapsible", startCollapsed: "startCollapsed", hideActionsCollapsed: "hideActionsCollapsed", expandable: "expandable", startExpanded: "startExpanded", startSettingsOpened: "startSettingsOpened" }, outputs: { facetExpanded: "facetExpanded", facetCollapsed: "facetCollapsed", settingsOpened: "settingsOpened" }, ngContentSelectors: _c2$1, decls: 13, vars: 15, consts: [[1, "card"], [1, "card-header", "cursor-default", "pl-3", "pr-2", "py-1"], [1, "d-flex"], [1, "d-flex", "align-items-center", "text-truncate", "mr-auto", 3, "title"], ["aria-hidden", "true", 3, "class", 4, "ngIf"], ["class", "card-title text-truncate mb-0 py-1 mr-auto", 4, "ngIf"], [3, "ngTemplateOutlet", 4, "ngIf"], [1, "btn-group", 3, "sq-action-buttons"], [3, "collapsed", 4, "ngIf"], ["class", "card-footer", 3, "ngTemplateOutlet", 4, "ngIf"], ["aria-hidden", "true"], [1, "card-title", "text-truncate", "mb-0", "py-1", "mr-auto"], [3, "ngTemplateOutlet"], [3, "collapsed"], [1, "card-footer", 3, "ngTemplateOutlet"]], template: function BsFacetCard_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵprojectionDef();
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "div", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵelementStart(3, "div", 3);
                i0.ɵɵpipe(4, "sqMessage");
                i0.ɵɵtemplate(5, BsFacetCard_div_5_Template, 1, 3, "div", 4);
                i0.ɵɵtemplate(6, BsFacetCard_div_6_Template, 3, 3, "div", 5);
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(7, BsFacetCard_ng_container_7_Template, 1, 1, "ng-container", 6);
                i0.ɵɵelement(8, "div", 7);
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(9, BsFacetCard_ng_container_9_Template, 1, 1, "ng-container", 6);
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(10, BsFacetCard_sq_collapse_10_Template, 2, 1, "sq-collapse", 8);
                i0.ɵɵtemplate(11, BsFacetCard_ng_container_11_Template, 1, 1, "ng-container", 6);
                i0.ɵɵtemplate(12, BsFacetCard_ng_container_12_Template, 1, 1, "ng-container", 9);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("title", i0.ɵɵpipeBind1(4, 9, ctx.tooltip || ctx.title));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", !!ctx.icon);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.title);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.facetComponent && ctx.facetComponent.headerTpl);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction3(11, _c1$1, ctx.allActions, ctx.buttonsStyle, ctx.actionsSize));
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.facetComponent && ctx.facetComponent.subHeaderTpl);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", !ctx._settingsOpened);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.hasSettings && ctx._settingsOpened);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.facetComponent && ctx.facetComponent.footerTpl);
            }
        }, directives: [i2$1.NgIf, i3$1.BsActionButtons, i2$1.NgTemplateOutlet, i3$2.Collapse], pipes: [i4$1.MessagePipe], styles: [".cursor-default[_ngcontent-%COMP%] {cursor: default;}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsFacetCard, [{
                type: i0.Component,
                args: [{
                        selector: "sq-facet-card",
                        templateUrl: "./facet-card.html",
                        styles: ["\n        .cursor-default {cursor: default;}\n    "]
                    }]
            }], function () { return [{ type: i0.ChangeDetectorRef }]; }, { title: [{
                    type: i0.Input
                }], tooltip: [{
                    type: i0.Input
                }], icon: [{
                    type: i0.Input
                }], buttonsStyle: [{
                    type: i0.Input
                }], actions: [{
                    type: i0.Input
                }], actionsFirst: [{
                    type: i0.Input
                }], actionsSize: [{
                    type: i0.Input
                }], collapsible: [{
                    type: i0.Input
                }], startCollapsed: [{
                    type: i0.Input
                }], hideActionsCollapsed: [{
                    type: i0.Input
                }], expandable: [{
                    type: i0.Input
                }], startExpanded: [{
                    type: i0.Input
                }], startSettingsOpened: [{
                    type: i0.Input
                }], facetExpanded: [{
                    type: i0.Output
                }], facetCollapsed: [{
                    type: i0.Output
                }], settingsOpened: [{
                    type: i0.Output
                }], facetComponent: [{
                    type: i0.ContentChild,
                    args: ["facet", { static: false }]
                }], _collapsed: [{
                    type: i0.HostBinding,
                    args: ['class.collapsed']
                }], _expanded: [{
                    type: i0.HostBinding,
                    args: ['class.expanded']
                }], _settingsOpened: [{
                    type: i0.HostBinding,
                    args: ['class.settings-opened']
                }], hidden: [{
                    type: i0.HostBinding,
                    args: ['hidden']
                }] });
    })();

    var _c0$2 = function (a0) { return { items: a0, size: "sm" }; };
    function BsFacetList_div_0_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 9);
            i0.ɵɵelement(1, "div", 10);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction1(1, _c0$2, ctx_r1.actions));
        }
    }
    function BsFacetList_div_0_div_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 11);
            i0.ɵɵelementStart(1, "div", 12);
            i0.ɵɵelement(2, "input", 13);
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(4, "sq-loading-bar", 14);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("formGroup", ctx_r2.myGroup);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(3, 3, "msg#facet.searchPlaceholder"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("active", ctx_r2.searchActive);
        }
    }
    function BsFacetList_div_0_div_3_span_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 21);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqNumber");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r8 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, item_r8.count));
        }
    }
    var _c1$2 = function (a0, a1) { return { "list-group-item-success": a0, "list-group-item-secondary": a1 }; };
    function BsFacetList_div_0_div_3_Template(rf, ctx) {
        if (rf & 1) {
            var _r12_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 15);
            i0.ɵɵlistener("click", function BsFacetList_div_0_div_3_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r12_1); var item_r8 = ctx.$implicit; var ctx_r11 = i0.ɵɵnextContext(2); return ctx_r11.filterItem(item_r8, $event); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelementStart(2, "a", 16);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqValue");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, BsFacetList_div_0_div_3_span_5_Template, 3, 3, "span", 17);
            i0.ɵɵelementStart(6, "span", 18);
            i0.ɵɵelement(7, "i", 19);
            i0.ɵɵelement(8, "i", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r8 = ctx.$implicit;
            var ctx_r3 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(9, _c1$2, !item_r8.$excluded, item_r8.$excluded))("title", i0.ɵɵpipeBind1(1, 4, "msg#facet.selectedValue"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 6, item_r8, item_r8.$column));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r3.showCount && item_r8.count);
        }
    }
    function BsFacetList_div_0_div_4_span_7_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 21);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqNumber");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r13 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, item_r13.count));
        }
    }
    var _c2$2 = function (a0) { return { "terme": a0 }; };
    function BsFacetList_div_0_div_4_Template(rf, ctx) {
        if (rf & 1) {
            var _r17_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 22);
            i0.ɵɵlistener("click", function BsFacetList_div_0_div_4_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r17_1); var item_r13 = ctx.$implicit; var ctx_r16 = i0.ɵɵnextContext(2); return ctx_r16.selectItem(item_r13, $event); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelementStart(2, "a", 23);
            i0.ɵɵlistener("click", function BsFacetList_div_0_div_4_Template_a_click_2_listener($event) { i0.ɵɵrestoreView(_r17_1); var item_r13 = ctx.$implicit; var ctx_r18 = i0.ɵɵnextContext(2); return ctx_r18.filterItem(item_r13, $event); });
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵpipe(4, "sqValue");
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "sqValue");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(7, BsFacetList_div_0_div_4_span_7_Template, 3, 3, "span", 17);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r13 = ctx.$implicit;
            var ctx_r4 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 4, "msg#facet.itemUnselect"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("title", i0.ɵɵpipeBind2(3, 6, "msg#facet.filterItem", i0.ɵɵpureFunction1(15, _c2$2, i0.ɵɵpipeBind2(4, 9, item_r13, item_r13.$column))));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 12, item_r13, item_r13.$column));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r4.showCount && item_r13.count);
        }
    }
    function BsFacetList_div_0_div_5_span_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 27);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqNumber");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var suggest_r19 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, suggest_r19.count));
        }
    }
    var _c3$1 = function (a0) { return { "list-group-item-primary": a0 }; };
    function BsFacetList_div_0_div_5_Template(rf, ctx) {
        if (rf & 1) {
            var _r23_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 24);
            i0.ɵɵlistener("click", function BsFacetList_div_0_div_5_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r23_1); var suggest_r19 = ctx.$implicit; var ctx_r22 = i0.ɵɵnextContext(2); return ctx_r22.selectItem(suggest_r19, $event); });
            i0.ɵɵelementStart(1, "a", 25);
            i0.ɵɵlistener("click", function BsFacetList_div_0_div_5_Template_a_click_1_listener($event) { i0.ɵɵrestoreView(_r23_1); var suggest_r19 = ctx.$implicit; var ctx_r24 = i0.ɵɵnextContext(2); return ctx_r24.filterItem(suggest_r19, $event); });
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵpipe(3, "sqValue");
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "sqValue");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, BsFacetList_div_0_div_5_span_6_Template, 3, 3, "span", 26);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var suggest_r19 = ctx.$implicit;
            var ctx_r5 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(13, _c3$1, ctx_r5.isSelected(suggest_r19)));
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind2(2, 4, "msg#facet.filterItem", i0.ɵɵpureFunction1(15, _c2$2, i0.ɵɵpipeBind2(3, 7, suggest_r19, suggest_r19.$column))));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 10, suggest_r19, suggest_r19.$column));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r5.showCount && suggest_r19.count);
        }
    }
    function BsFacetList_div_0_span_7_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 28);
            i0.ɵɵelementStart(1, "i");
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "msg#facet.searchNoResult"));
        }
    }
    function BsFacetList_div_0_div_8_div_1_div_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "div", 36);
        }
        if (rf & 2) {
            var item_r27 = i0.ɵɵnextContext().$implicit;
            var ctx_r28 = i0.ɵɵnextContext(3);
            i0.ɵɵstyleProp("--count", ctx_r28.getPercent(item_r27.count));
        }
    }
    function BsFacetList_div_0_div_8_div_1_span_9_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 27);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqNumber");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r27 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, item_r27.count));
        }
    }
    function BsFacetList_div_0_div_8_div_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r33_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 32);
            i0.ɵɵlistener("click", function BsFacetList_div_0_div_8_div_1_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r33_1); var item_r27 = ctx.$implicit; var ctx_r32 = i0.ɵɵnextContext(3); return ctx_r32.selectItem(item_r27, $event); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵtemplate(2, BsFacetList_div_0_div_8_div_1_div_2_Template, 1, 2, "div", 33);
            i0.ɵɵelementStart(3, "div", 34);
            i0.ɵɵelementStart(4, "a", 35);
            i0.ɵɵlistener("click", function BsFacetList_div_0_div_8_div_1_Template_a_click_4_listener($event) { i0.ɵɵrestoreView(_r33_1); var item_r27 = ctx.$implicit; var ctx_r34 = i0.ɵɵnextContext(3); return ctx_r34.filterItem(item_r27, $event); });
            i0.ɵɵpipe(5, "sqMessage");
            i0.ɵɵpipe(6, "sqValue");
            i0.ɵɵtext(7);
            i0.ɵɵpipe(8, "sqValue");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(9, BsFacetList_div_0_div_8_div_1_span_9_Template, 3, 3, "span", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r27 = ctx.$implicit;
            var ctx_r25 = i0.ɵɵnextContext(3);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(17, _c3$1, ctx_r25.isSelected(item_r27)))("title", i0.ɵɵpipeBind1(1, 6, ctx_r25.isSelected(item_r27) ? "msg#facet.itemUnselect" : "msg#facet.itemSelect"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r25.showProgressBar && ctx_r25.resultsLength > 1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("title", i0.ɵɵpipeBind2(5, 8, "msg#facet.filterItem", i0.ɵɵpureFunction1(19, _c2$2, i0.ɵɵpipeBind2(6, 11, item_r27, item_r27.$column))));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 14, item_r27, item_r27.$column));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r25.showCount && item_r27.count);
        }
    }
    function BsFacetList_div_0_div_8_a_3_span_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span", 40);
        }
    }
    function BsFacetList_div_0_div_8_a_3_small_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "small");
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "msg#facet.loadMore"));
        }
    }
    function BsFacetList_div_0_div_8_a_3_Template(rf, ctx) {
        if (rf & 1) {
            var _r38_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 37);
            i0.ɵɵlistener("click", function BsFacetList_div_0_div_8_a_3_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r38_1); var ctx_r37 = i0.ɵɵnextContext(3); return ctx_r37.loadMore($event); });
            i0.ɵɵtemplate(1, BsFacetList_div_0_div_8_a_3_span_1_Template, 1, 0, "span", 38);
            i0.ɵɵtemplate(2, BsFacetList_div_0_div_8_a_3_small_2_Template, 3, 3, "small", 39);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r26 = i0.ɵɵnextContext(3);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r26.loadingMore);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r26.loadingMore);
        }
    }
    function BsFacetList_div_0_div_8_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 29);
            i0.ɵɵtemplate(1, BsFacetList_div_0_div_8_div_1_Template, 10, 21, "div", 30);
            i0.ɵɵpipe(2, "async");
            i0.ɵɵtemplate(3, BsFacetList_div_0_div_8_a_3_Template, 3, 2, "a", 31);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r7 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(2, 2, ctx_r7.items$));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r7.hasMore);
        }
    }
    function BsFacetList_div_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵtemplate(1, BsFacetList_div_0_div_1_Template, 2, 3, "div", 2);
            i0.ɵɵtemplate(2, BsFacetList_div_0_div_2_Template, 5, 5, "div", 3);
            i0.ɵɵtemplate(3, BsFacetList_div_0_div_3_Template, 9, 12, "div", 4);
            i0.ɵɵtemplate(4, BsFacetList_div_0_div_4_Template, 8, 17, "div", 5);
            i0.ɵɵtemplate(5, BsFacetList_div_0_div_5_Template, 7, 17, "div", 6);
            i0.ɵɵpipe(6, "async");
            i0.ɵɵtemplate(7, BsFacetList_div_0_span_7_Template, 4, 3, "span", 7);
            i0.ɵɵtemplate(8, BsFacetList_div_0_div_8_Template, 4, 4, "div", 8);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.displayActions && ctx_r0.actions);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.searchItems.selected);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r0.filtered);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r0.hiddenSelected);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(6, 7, ctx_r0.suggestions$));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r0.noResults);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r0.hasSuggestions());
        }
    }
    var BsFacetList = /** @class */ (function (_super) {
        __extends(BsFacetList, _super);
        function BsFacetList(facetService, changeDetectorRef) {
            var _this = _super.call(this) || this;
            _this.facetService = facetService;
            _this.changeDetectorRef = changeDetectorRef;
            _this.showCount = true; // Show the number of occurrences
            _this.searchable = true; // Allow to search for items in the facet
            _this.allowExclude = true; // Allow to exclude selected items
            _this.allowOr = true; // Allow to search various items in OR mode
            _this.allowAnd = true; // Allow to search various items in AND mode
            _this.displayEmptyDistributionIntervals = false; // If the aggregration is a distribution, then this property controls whether empty distribution intervals will be displayed
            _this.displayActions = false;
            _this.showProgressBar = false; // Allow to display item count as progress bar
            // Aggregation from the Results object
            _this.data$ = new rxjs.BehaviorSubject(undefined);
            _this.items$ = new rxjs.BehaviorSubject([]);
            _this.data = function () { return _this.data$.getValue(); };
            _this.subscriptions = [];
            _this.filtering = false;
            _this.suggestDelay = 200;
            _this.noResults = false;
            _this.searchActive = false;
            _this.suggestions$ = new rxjs.BehaviorSubject([]);
            /** List of selected items */
            _this.selected = [];
            /** Selected items that are not visible in the current aggregation (or suggestions in search mode) */
            _this.hiddenSelected = [];
            /** List of excluded/filtered items */
            _this.filtered = [];
            // Loading more data
            _this.skip = 0;
            /** num of items currently displayed in the facet */
            _this.count = 0;
            /** Does facet has more items to display ? */
            _this.loadingMore = false;
            /**
             * Called on NgModel change (searchQuery)
             * Uses the suggestfield API to retrieve suggestions from the server
             * The suggestions "override" the data from the distribution (until search results are cleared)
             */
            _this.suggest$ = function (text$) { return text$.pipe(operators.debounceTime(_this.suggestDelay), operators.distinctUntilChanged(), operators.switchMap(function (term) {
                var _a;
                if (term.trim() === "") {
                    _this.noResults = false;
                    return rxjs.of([]);
                }
                _this.searchActive = true;
                _this.changeDetectorRef.markForCheck();
                return _this.facetService.suggest(term, ((_a = _this.data()) === null || _a === void 0 ? void 0 : _a.column) || '').pipe(operators.catchError(function (err) {
                    console.log(err);
                    _this.noResults = false;
                    return rxjs.of([]);
                }), operators.map(function (items) {
                    var suggestions = items.slice(0, _this.count)
                        .map(function (item) { return _this.facetService.suggestionToAggregationItem(item); })
                        .filter(function (item) { return !_this.isFiltered(_this.data(), item); });
                    _this.noResults = suggestions.length === 0 && term.trim() !== "";
                    return suggestions;
                }));
            })); };
            _this.myGroup = new i4$2.FormGroup({
                searchQuery: new i4$2.FormControl()
            });
            _this.searchQuery = _this.myGroup.get("searchQuery");
            _this.subscriptions["suggest"] = _this.suggest$(_this.searchQuery.valueChanges)
                .subscribe(function (values) {
                _this.suggestions$.next(values);
                // Refresh hiddenSelected list when the list of items is updated
                _this.refreshHiddenSelected();
                _this.searchActive = false;
                _this.changeDetectorRef.markForCheck();
            });
            // Keep documents with ANY of the selected items
            _this.filterItemsOr = new i3$1.Action({
                icon: "fas fa-filter",
                title: "msg#facet.filterItems",
                action: function () {
                    if (_this.data()) {
                        _this.facetService.addFilterSearch(_this.getName(), _this.data(), _this.selected);
                    }
                }
            });
            // Keep documents with ALL the selected items
            _this.filterItemsAnd = new i3$1.Action({
                icon: "fas fa-bullseye",
                title: "msg#facet.filterItemsAnd",
                action: function () {
                    if (_this.data()) {
                        _this.facetService.addFilterSearch(_this.getName(), _this.data(), _this.selected, { and: true });
                    }
                }
            });
            // Exclude document with selected items
            _this.excludeItems = new i3$1.Action({
                icon: "fas fa-times",
                title: "msg#facet.excludeItems",
                action: function () {
                    if (_this.data()) {
                        _this.facetService.addFilterSearch(_this.getName(), _this.data(), _this.selected, { not: true });
                    }
                }
            });
            // Clear the current filters
            _this.clearFilters = new i3$1.Action({
                icon: "far fa-minus-square",
                title: "msg#facet.clearSelects",
                action: function () {
                    _this.facetService.clearFiltersSearch(_this.getName(), true);
                }
            });
            // Search for a value in this list
            _this.searchItems = new i3$1.Action({
                icon: "fas fa-search",
                title: "msg#facet.searchItems",
                action: function (item, event) {
                    item.selected = !item.selected;
                    if (!item.selected) {
                        _this.clearSearch();
                    }
                    event.stopPropagation();
                    _this.changeDetectorRef.markForCheck();
                }
            });
            return _this;
        }
        BsFacetList.prototype.clearSearch = function () {
            this.searchQuery.setValue(""); // Remove suggestions if some remain
            this.noResults = false;
            this.suggestions$.next([]);
        };
        /**
         * Name of the facet, used to create and retrieve selections
         * through the facet service.
         */
        BsFacetList.prototype.getName = function () {
            return this.name || this.aggregation;
        };
        /**
         * OnChanges listener awaits new results from the search service
         * This completely resets the display
         * @param changes
         */
        BsFacetList.prototype.ngOnChanges = function (changes) {
            if (this.showCount === undefined)
                this.showCount = true;
            if (this.searchable === undefined)
                this.searchable = true;
            if (this.allowExclude === undefined)
                this.allowExclude = true;
            if (this.allowOr === undefined)
                this.allowOr = true;
            if (this.allowAnd === undefined)
                this.allowAnd = true;
            if (!!changes["results"]) { // New data from the search service
                if (!this.count) {
                    this.count = this.facetService.getAggregationCount(this.aggregation);
                }
                this.filtered.length = 0;
                this.selected.length = 0;
                this.hiddenSelected.length = 0;
                this.skip = 0;
                this.searchItems.selected = false;
                this.clearSearch();
                this.data$.next(this.facetService.getAggregation(this.aggregation, this.results));
            }
        };
        BsFacetList.prototype.ngOnInit = function () {
            var _this = this;
            this.subscriptions["data"] = this.data$.pipe(operators.map(function (data) {
                var nonFilteredItems = _this.refreshFiltered(data);
                return !(data === null || data === void 0 ? void 0 : data.isDistribution) || _this.displayEmptyDistributionIntervals ?
                    nonFilteredItems : nonFilteredItems.filter(function (item) { return item.count > 0; });
            })).subscribe(function (items) {
                _this.sumOfCount = items.length > 0 ? items.map(function (item) { return item.count; }).reduce(function (acc, value) { return acc += value; }) / 100 : 0;
                _this.items$.next(items);
                // Refresh hiddenSelected list when the list of items is updated
                _this.refreshHiddenSelected();
            });
        };
        BsFacetList.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
        };
        Object.defineProperty(BsFacetList.prototype, "actions", {
            /**
             * Returns all the actions that are relevant in the current context
             */
            get: function () {
                var actions = [];
                if (this.selected.length > 0) {
                    if (this.allowOr) {
                        actions.push(this.filterItemsOr);
                    }
                    if (this.allowAnd && this.selected.length > 1) {
                        actions.push(this.filterItemsAnd);
                    }
                    if (this.allowExclude) {
                        actions.push(this.excludeItems);
                    }
                }
                if (!this.hasSuggestions() && this.hasFiltered()) {
                    actions.push(this.clearFilters);
                }
                if (this.searchable) {
                    actions.push(this.searchItems);
                }
                return actions;
            },
            enumerable: false,
            configurable: true
        });
        // Filtered items
        /**
         * Actualize the state of filtered items (note that excluded terms are not in the distribution, so the equivalent cannot be done)
         */
        BsFacetList.prototype.refreshFiltered = function (data) {
            var _this = this;
            var _a;
            // refresh filters from breadcrumbs
            var items = this.facetService.getAggregationItemsFiltered(this.getName(), data === null || data === void 0 ? void 0 : data.valuesAreExpressions);
            items.forEach(function (item) {
                if (!_this.isFiltered(data, item)) {
                    _this.filtered.push(item);
                }
            });
            var nonFilteredItems = [];
            (_a = data === null || data === void 0 ? void 0 : data.items) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
                var indx = _this.facetService.filteredIndex(data, _this.filtered, item);
                if (_this.facetService.itemFiltered(_this.getName(), data, item)) {
                    if (!_this.isFiltered(data, item)) {
                        _this.filtered.push(item);
                    }
                    else {
                        _this.filtered[indx].count = item.count;
                    }
                }
                else {
                    // sometime facetService.itemFiltered() could returns false but item is present in breadcrumbs
                    if (indx !== -1) {
                        _this.filtered[indx].count = item.count;
                    }
                    else {
                        nonFilteredItems.push(item);
                    }
                }
            });
            return nonFilteredItems;
        };
        BsFacetList.prototype.refreshHiddenSelected = function () {
            var _this = this;
            this.hiddenSelected = this.selected.filter(function (item) {
                var idx = _this.hasSuggestions()
                    ? _this.facetService.findAggregationItemIndex(_this.suggestions$.getValue(), item)
                    : _this.facetService.findAggregationItemIndex(_this.items$.getValue() || [], item);
                return idx === -1;
            });
        };
        /**
         * Returns true if the given AggregationItem is filtered
         * @param item
         */
        BsFacetList.prototype.isFiltered = function (data, item) {
            return this.facetService.filteredIndex(data, this.filtered, item) !== -1;
        };
        /**
         * Returns true if there is an active selection (or exclusion) from this facet
         */
        BsFacetList.prototype.hasFiltered = function () {
            return this.facetService.hasFiltered(this.getName());
        };
        /**
         * Called when clicking on a facet item text
         * @param item
         * @param event
         */
        BsFacetList.prototype.filterItem = function (item, event) {
            var data = this.data();
            if (data) {
                this.filtering = true;
                if (!this.isFiltered(data, item)) {
                    this.facetService.addFilterSearch(this.getName(), data, item);
                }
                else {
                    this.facetService.removeFilterSearch(this.getName(), data, item);
                }
            }
            event.preventDefault();
        };
        // Selected items
        /**
         * Returns true if the given AggregationItem is selected
         * @param item
         */
        BsFacetList.prototype.isSelected = function (item) {
            return this.facetService.findAggregationItemIndex(this.selected, item) !== -1;
        };
        /**
         * Called when selecting/unselecting an item in the facet
         * @param item
         */
        BsFacetList.prototype.selectItem = function (item, e) {
            e.preventDefault();
            if (!this.filtering) {
                this.updateSelected(item);
                e.stopPropagation();
            }
            this.filtering = false;
        };
        BsFacetList.prototype.updateSelected = function (item) {
            if (!this.isFiltered(this.data(), item)) {
                var index = this.facetService.findAggregationItemIndex(this.selected, item);
                if (index === -1) {
                    this.selected.push(item);
                }
                else {
                    this.selected.splice(index, 1);
                }
                this.refreshHiddenSelected();
            }
        };
        Object.defineProperty(BsFacetList.prototype, "hasMore", {
            // Loading more items
            /**
             * Returns true if this facet can get more data from the server
             * (The only way to guess is to check if the facet is "full", it capacity being the (skip+)count)
             */
            get: function () {
                return this.resultsLength >= this.skip + this.count;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsFacetList.prototype, "resultsLength", {
            get: function () {
                return this.items$.getValue().length + this.filtered.length;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Called on loadMore button click
         */
        BsFacetList.prototype.loadMore = function (e) {
            var _this = this;
            e.stopPropagation();
            if (this.data()) {
                var skip_1 = this.resultsLength; // avoid hasMore() to return false when fetching data
                this.loadingMore = true;
                this.changeDetectorRef.markForCheck();
                base.Utils.subscribe(this.facetService.loadData(this.aggregation, skip_1, this.count), function (agg) {
                    _this.skip = skip_1;
                    if ((agg === null || agg === void 0 ? void 0 : agg.items) && _this.data()) {
                        agg.items = _this.items$.getValue().concat(agg.items);
                        _this.data$.next(agg);
                    }
                }, undefined, function () {
                    _this.loadingMore = false;
                    _this.changeDetectorRef.markForCheck();
                });
            }
            return false; // Avoids following href
        };
        // Suggest / Search
        /**
         * Returns true if the search mode is active (ie. there are suggestions to display in place of the aggregation)
         */
        BsFacetList.prototype.hasSuggestions = function () {
            return this.suggestions$.getValue().length > 0 || this.noResults;
        };
        /* AbstractFacet abstract methods */
        BsFacetList.prototype.isHidden = function () {
            return !this.data();
        };
        /**
         * Convert facet item count to percentage width
         * @param count item count
         * @returns a % string representation
         */
        BsFacetList.prototype.getPercent = function (count) {
            return 100 - (count / this.sumOfCount) + "%";
        };
        return BsFacetList;
    }(AbstractFacet));
    BsFacetList.ɵfac = function BsFacetList_Factory(t) { return new (t || BsFacetList)(i0.ɵɵdirectiveInject(FacetService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    BsFacetList.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetList, selectors: [["sq-facet-list"]], inputs: { name: "name", results: "results", aggregation: "aggregation", showCount: "showCount", searchable: "searchable", allowExclude: "allowExclude", allowOr: "allowOr", allowAnd: "allowAnd", displayEmptyDistributionIntervals: "displayEmptyDistributionIntervals", displayActions: "displayActions", showProgressBar: "showProgressBar" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "list-group list-group-flush", 4, "ngIf"], [1, "list-group", "list-group-flush"], ["class", "d-flex pb-2 pr-2", 4, "ngIf"], ["class", "position-relative", 3, "formGroup", 4, "ngIf"], ["class", "d-flex flex-row align-items-center list-group-item list-group-item-action list-group-item-success text-truncate border-0 px-3 py-1 facet-row cursor-pointer", 3, "ngClass", "title", "click", 4, "ngFor", "ngForOf"], ["class", "d-flex flex-row align-items-center list-group-item list-group-item-primary text-truncate border-0 px-3 py-1 facet-row cursor-pointer", 3, "title", "click", 4, "ngFor", "ngForOf"], ["class", "d-flex flex-row align-items-center list-group-item list-group-item-action text-truncate border-0 px-3 py-1 facet-row cursor-pointer", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["class", "d-block text-center text-muted small py-1", 4, "ngIf"], ["class", "facet-results-scrollable", 4, "ngIf"], [1, "d-flex", "pb-2", "pr-2"], [1, "btn-group", "ml-auto", 3, "sq-action-buttons"], [1, "position-relative", 3, "formGroup"], [1, "p-1"], ["sqAutofocus", "", "formControlName", "searchQuery", 1, "form-control", 3, "placeholder"], [3, "active"], [1, "d-flex", "flex-row", "align-items-center", "list-group-item", "list-group-item-action", "list-group-item-success", "text-truncate", "border-0", "px-3", "py-1", "facet-row", "cursor-pointer", 3, "ngClass", "title", "click"], ["href", "#", 1, "text-truncate", "mr-auto"], ["class", "ml-2 text-muted small", 4, "ngIf"], [1, "fa-stack", "cursor-pointer"], [1, "ml-2", "far", "fa-minus-square", "fa-stack-1x", "icons", "icon-hover", "rotate"], [1, "ml-2", "far", "fa-check-square", "fa-stack-1x", "icons", "icon-default", "rotate"], [1, "ml-2", "text-muted", "small"], [1, "d-flex", "flex-row", "align-items-center", "list-group-item", "list-group-item-primary", "text-truncate", "border-0", "px-3", "py-1", "facet-row", "cursor-pointer", 3, "title", "click"], ["href", "#", 1, "text-truncate", "mr-auto", 3, "title", "click"], [1, "d-flex", "flex-row", "align-items-center", "list-group-item", "list-group-item-action", "text-truncate", "border-0", "px-3", "py-1", "facet-row", "cursor-pointer", 3, "ngClass", "click"], ["href", "#", "role", "button", 1, "text-truncate", "mr-auto", 3, "title", "click"], ["class", "ml-2 text-muted small", "style", "z-index: 1;", 4, "ngIf"], [1, "ml-2", "text-muted", "small", 2, "z-index", "1"], [1, "d-block", "text-center", "text-muted", "small", "py-1"], [1, "facet-results-scrollable"], ["class", "position-relative list-group-item list-group-item-action border-0 px-3 py-1 facet-row cursor-pointer", 3, "ngClass", "title", "click", 4, "ngFor", "ngForOf"], ["class", "d-block border-0 px-3 py-1 text-center", "href", "#", 3, "click", 4, "ngIf"], [1, "position-relative", "list-group-item", "list-group-item-action", "border-0", "px-3", "py-1", "facet-row", "cursor-pointer", 3, "ngClass", "title", "click"], ["class", "position-absolute progress-bar progress-color", 3, "--count", 4, "ngIf"], [1, "d-flex", "justify-content-between", "align-items-baseline"], ["href", "#", 1, "text-truncate", "mr-auto", 2, "z-index", "1", 3, "title", "click"], [1, "position-absolute", "progress-bar", "progress-color"], ["href", "#", 1, "d-block", "border-0", "px-3", "py-1", "text-center", 3, "click"], ["class", "fas fa-sync fa-fw fa-spin", 4, "ngIf"], [4, "ngIf"], [1, "fas", "fa-sync", "fa-fw", "fa-spin"]], template: function BsFacetList_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsFacetList_div_0_Template, 9, 9, "div", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !ctx.isHidden());
            }
        }, directives: [i2$1.NgIf, i2$1.NgForOf, i3$1.BsActionButtons, i4$2.NgControlStatusGroup, i4$2.FormGroupDirective, i4$2.DefaultValueAccessor, i5.Autofocus, i4$2.NgControlStatus, i4$2.FormControlName, i2.BsLoadingBar, i2$1.NgClass], pipes: [i2$1.AsyncPipe, i4$1.MessagePipe, i5.ValuePipe, i5.NumberPipe], styles: ["[_ngcontent-%COMP%]::-webkit-scrollbar{width:10px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#ccc}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background-color:#f3f3f3}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.progress-bar[_ngcontent-%COMP%]{bottom:0;height:2px;right:0;width:calc(100% - var(--count))}.progress-bar.progress-color[_ngcontent-%COMP%]{background-color:#7c7c7c;background-image:linear-gradient(90deg,#b8daff,transparent)}.facet-row[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]{transition:opacity .3s,transform .3s ease}.facet-row[_ngcontent-%COMP%]   .icons.icon-hover[_ngcontent-%COMP%]{opacity:0}.facet-row[_ngcontent-%COMP%]   .icons.icon-hover.rotate[_ngcontent-%COMP%]{transform:rotate(-180deg)}.facet-row[_ngcontent-%COMP%]:hover   .icon-default[_ngcontent-%COMP%]{opacity:0}.facet-row[_ngcontent-%COMP%]:hover   .icon-default.rotate[_ngcontent-%COMP%]{transform:rotate(180deg)}.facet-row[_ngcontent-%COMP%]:hover   .icon-hover[_ngcontent-%COMP%]{opacity:1}.facet-row[_ngcontent-%COMP%]:hover   .icon-hover.rotate[_ngcontent-%COMP%]{transform:rotate(0deg)}.facet-row[_ngcontent-%COMP%]   .fa-stack[_ngcontent-%COMP%]{height:1.5em;line-height:1.5em}.facet-results-scrollable[_ngcontent-%COMP%]{max-height:385px;overflow-y:auto}"], changeDetection: 0 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsFacetList, [{
                type: i0.Component,
                args: [{
                        selector: "sq-facet-list",
                        templateUrl: "./facet-list.html",
                        styleUrls: ["./facet-list.scss"],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], function () { return [{ type: FacetService }, { type: i0.ChangeDetectorRef }]; }, { name: [{
                    type: i0.Input
                }], results: [{
                    type: i0.Input
                }], aggregation: [{
                    type: i0.Input
                }], showCount: [{
                    type: i0.Input
                }], searchable: [{
                    type: i0.Input
                }], allowExclude: [{
                    type: i0.Input
                }], allowOr: [{
                    type: i0.Input
                }], allowAnd: [{
                    type: i0.Input
                }], displayEmptyDistributionIntervals: [{
                    type: i0.Input
                }], displayActions: [{
                    type: i0.Input
                }], showProgressBar: [{
                    type: i0.Input
                }] });
    })();

    var _c0$3 = function (a0) { return { items: a0, size: "sm" }; };
    function BsFacetTree_div_0_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 8);
            i0.ɵɵelement(1, "div", 9);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r3 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction1(1, _c0$3, ctx_r3.actions));
        }
    }
    function BsFacetTree_div_0_div_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 10);
            i0.ɵɵelementStart(1, "div", 11);
            i0.ɵɵelement(2, "input", 12);
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(4, "sq-loading-bar", 13);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r4 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("formGroup", ctx_r4.myGroup);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(3, 3, "msg#facet.searchPlaceholder"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("active", ctx_r4.searchActive);
        }
    }
    function BsFacetTree_div_0_div_3_span_7_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 17);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqNumber");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r8 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, item_r8.count));
        }
    }
    var _c1$3 = function (a0) { return { "terme": a0 }; };
    function BsFacetTree_div_0_div_3_Template(rf, ctx) {
        if (rf & 1) {
            var _r12_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 14);
            i0.ɵɵlistener("click", function BsFacetTree_div_0_div_3_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r12_1); var item_r8 = ctx.$implicit; var ctx_r11 = i0.ɵɵnextContext(2); return ctx_r11.selectItem(item_r8); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelementStart(2, "a", 15);
            i0.ɵɵlistener("click", function BsFacetTree_div_0_div_3_Template_a_click_2_listener($event) { i0.ɵɵrestoreView(_r12_1); var item_r8 = ctx.$implicit; var ctx_r13 = i0.ɵɵnextContext(2); return ctx_r13.filterItem(item_r8, $event); });
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵpipe(4, "slice");
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "slice");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(7, BsFacetTree_div_0_div_3_span_7_Template, 3, 3, "span", 16);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r8 = ctx.$implicit;
            var ctx_r5 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 4, "msg#facet.itemUnselect"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("title", i0.ɵɵpipeBind2(3, 6, "msg#facet.filterItem", i0.ɵɵpureFunction1(17, _c1$3, i0.ɵɵpipeBind3(4, 9, item_r8.$path, 1, -1))));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind3(6, 13, item_r8.$path, 1, -1));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r5.showCount && item_r8.count);
        }
    }
    function BsFacetTree_div_0_span_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 18);
            i0.ɵɵelementStart(1, "i");
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "msg#facet.searchNoResult"));
        }
    }
    function BsFacetTree_div_0_ng_container_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0);
        }
    }
    var _c2$3 = function (a0) { return { "scrollable": a0 }; };
    function BsFacetTree_div_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 2);
            i0.ɵɵtemplate(1, BsFacetTree_div_0_div_1_Template, 2, 3, "div", 3);
            i0.ɵɵtemplate(2, BsFacetTree_div_0_div_2_Template, 5, 5, "div", 4);
            i0.ɵɵtemplate(3, BsFacetTree_div_0_div_3_Template, 8, 19, "div", 5);
            i0.ɵɵtemplate(4, BsFacetTree_div_0_span_4_Template, 4, 3, "span", 6);
            i0.ɵɵtemplate(5, BsFacetTree_div_0_ng_container_5_Template, 1, 0, "ng-container", 7);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            var _r1 = i0.ɵɵreference(2);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(7, _c2$3, ctx_r0.forceMaxHeight));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.displayActions && ctx_r0.actions);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.searchItems.selected);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r0.hiddenSelected);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.noResults);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", ctx_r0.data);
        }
    }
    function BsFacetTree_ng_template_1_ng_container_0_a_4_span_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span", 31);
        }
    }
    function BsFacetTree_ng_template_1_ng_container_0_a_4_span_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span", 32);
        }
    }
    function BsFacetTree_ng_template_1_ng_container_0_a_4_span_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span", 33);
        }
    }
    function BsFacetTree_ng_template_1_ng_container_0_a_4_Template(rf, ctx) {
        if (rf & 1) {
            var _r27_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 27);
            i0.ɵɵlistener("click", function BsFacetTree_ng_template_1_ng_container_0_a_4_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r27_1); var item_r16 = i0.ɵɵnextContext().$implicit; var ctx_r25 = i0.ɵɵnextContext(2); return ctx_r25.open(item_r16, $event); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵtemplate(2, BsFacetTree_ng_template_1_ng_container_0_a_4_span_2_Template, 1, 0, "span", 28);
            i0.ɵɵtemplate(3, BsFacetTree_ng_template_1_ng_container_0_a_4_span_3_Template, 1, 0, "span", 29);
            i0.ɵɵtemplate(4, BsFacetTree_ng_template_1_ng_container_0_a_4_span_4_Template, 1, 0, "span", 30);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r16 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 4, item_r16["$opened"] ? "msg#facet.closeItem" : "msg#facet.openItem"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", item_r16["$opening"]);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !item_r16["$opening"] && item_r16["$opened"]);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !item_r16["$opening"] && !item_r16["$opened"]);
        }
    }
    function BsFacetTree_ng_template_1_ng_container_0_span_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span", 34);
        }
    }
    function BsFacetTree_ng_template_1_ng_container_0_i_10_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "i", 35);
        }
    }
    function BsFacetTree_ng_template_1_ng_container_0_span_11_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 17);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqNumber");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r16 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, item_r16.count));
        }
    }
    function BsFacetTree_ng_template_1_ng_container_0_ng_container_12_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0);
        }
    }
    function BsFacetTree_ng_template_1_ng_container_0_ng_container_12_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsFacetTree_ng_template_1_ng_container_0_ng_container_12_ng_container_1_Template, 1, 0, "ng-container", 7);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var item_r16 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵnextContext(2);
            var _r1 = i0.ɵɵreference(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", item_r16);
        }
    }
    var _c3$2 = function (a0, a1, a2, a3) { return { "list-group-item-primary": a0, "list-group-item-success": a1, "list-group-item-action": a2, "filtered": a3 }; };
    var _c4 = function (a0) { return { "margin-left.rem": a0 }; };
    function BsFacetTree_ng_template_1_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            var _r33_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "a", 20);
            i0.ɵɵlistener("click", function BsFacetTree_ng_template_1_ng_container_0_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r33_1); var item_r16 = ctx.$implicit; var ctx_r32 = i0.ɵɵnextContext(2); return ctx_r32.selectItem(item_r16); });
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementStart(3, "span", 21);
            i0.ɵɵtemplate(4, BsFacetTree_ng_template_1_ng_container_0_a_4_Template, 5, 6, "a", 22);
            i0.ɵɵtemplate(5, BsFacetTree_ng_template_1_ng_container_0_span_5_Template, 1, 0, "span", 23);
            i0.ɵɵelementStart(6, "a", 24);
            i0.ɵɵlistener("click", function BsFacetTree_ng_template_1_ng_container_0_Template_a_click_6_listener($event) { i0.ɵɵrestoreView(_r33_1); var item_r16 = ctx.$implicit; var ctx_r34 = i0.ɵɵnextContext(2); return ctx_r34.filterItem(item_r16, $event); });
            i0.ɵɵpipe(7, "sqValue");
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "sqValue");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(10, BsFacetTree_ng_template_1_ng_container_0_i_10_Template, 1, 0, "i", 25);
            i0.ɵɵtemplate(11, BsFacetTree_ng_template_1_ng_container_0_span_11_Template, 3, 3, "span", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(12, BsFacetTree_ng_template_1_ng_container_0_ng_container_12_Template, 2, 2, "ng-container", 26);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var item_r16 = ctx.$implicit;
            var ctx_r15 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction4(18, _c3$2, ctx_r15.isSelected(item_r16), ctx_r15.isFiltered(item_r16), !ctx_r15.isFiltered(item_r16), ctx_r15.isFiltered(item_r16)))("title", i0.ɵɵpipeBind1(2, 10, ctx_r15.isFiltered(item_r16) ? "msg#facet.selectedValue" : "msg#facet.itemSelect"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(23, _c4, item_r16["$level"] - 1));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", item_r16["hasChildren"]);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !item_r16["hasChildren"]);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("title", i0.ɵɵpipeBind2(7, 12, item_r16, item_r16.$column));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(9, 15, item_r16, item_r16.$column), "");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r15.isFiltered(item_r16));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r15.showCount && item_r16.count);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", item_r16["$opened"]);
        }
    }
    function BsFacetTree_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtemplate(0, BsFacetTree_ng_template_1_ng_container_0_Template, 13, 25, "ng-container", 19);
        }
        if (rf & 2) {
            var items_r14 = ctx.items;
            i0.ɵɵproperty("ngForOf", items_r14);
        }
    }
    var BsFacetTree = /** @class */ (function (_super) {
        __extends(BsFacetTree, _super);
        function BsFacetTree(facetService, changeDetectorRef) {
            var _this = _super.call(this) || this;
            _this.facetService = facetService;
            _this.changeDetectorRef = changeDetectorRef;
            _this.showCount = true; // Show the number of occurrences
            _this.allowExclude = true; // Allow to exclude selected items
            _this.allowOr = true; // Allow to search various items in OR mode
            _this.searchable = true; // Allow to search for items in the facet
            _this.expandedLevel = 2;
            _this.forceMaxHeight = true; // Allow to display a scrollbar automatically on long list items
            _this.displayActions = false;
            _this.subscriptions = [];
            // Sets to keep track of selected/excluded/filtered items
            _this.filtered = new Set();
            _this.selected = new Map();
            _this.hiddenSelected = [];
            _this.suggestDelay = 200;
            _this.searchActive = false;
            _this.noResults = false;
            // For each new node, set up properties necessary for display
            // This callback could also be used to filter or sorts nodes, etc.
            _this.initNodes = function (nodes, level, node) {
                if (node.$filtered) {
                    _this.filtered.add(node);
                }
                if (node.hasChildren && !node.$opened && node.items && node.items.length >= 0 && level <= _this.expandedLevel) {
                    node.$opened = true;
                }
            };
            /**
             * Called on NgModel change (searchQuery)
             * Uses the suggestfield API to retrieve suggestions from the server
             * The suggestions "override" the data from the distribution (until search results are cleared)
             */
            _this.suggest$ = function (text$) { return text$.pipe(operators.debounceTime(_this.suggestDelay), operators.distinctUntilChanged(), operators.switchMap(function (term) {
                var _a;
                if (term.trim() === "") {
                    _this.noResults = false;
                    return rxjs.of([]);
                }
                _this.changeDetectorRef.markForCheck();
                _this.searchActive = true;
                return _this.facetService.suggest(term, ((_a = _this.data) === null || _a === void 0 ? void 0 : _a.column) || '').pipe(operators.catchError(function (err) {
                    console.log(err);
                    _this.noResults = false;
                    return rxjs.of([]);
                }), operators.map(function (suggests) {
                    var items = _this.facetService.suggestionsToTreeAggregationNodes(suggests, term, _this.data);
                    _this.noResults = items.length === 0 && term.trim() !== "";
                    return items;
                }));
            })); };
            _this.myGroup = new i4$2.FormGroup({
                searchQuery: new i4$2.FormControl()
            });
            _this.searchQuery = _this.myGroup.get("searchQuery");
            _this.subscriptions["suggest"] = _this.suggest$(_this.searchQuery.valueChanges)
                .subscribe(function (values) {
                if (_this.data) {
                    var items = _this.searchQuery.value ? values : _this.originalItems;
                    _this.data = {
                        column: _this.data.column,
                        name: _this.data.name,
                        isTree: true,
                        items: items
                    };
                    // Refresh hiddenSelected list when the list of items is updated
                    _this.refreshHiddenSelected();
                    _this.searchActive = false;
                    _this.changeDetectorRef.markForCheck();
                }
            });
            // Keep documents with ANY of the selected items
            _this.filterItemsOr = new i3$1.Action({
                icon: "fas fa-filter",
                title: "msg#facet.filterItems",
                action: function () {
                    if (_this.data) {
                        _this.facetService.addFilterSearch(_this.getName(), _this.data, _this.getSelectedItems());
                    }
                }
            });
            // Exclude document with selected items
            _this.excludeItems = new i3$1.Action({
                icon: "fas fa-times",
                title: "msg#facet.excludeItems",
                action: function () {
                    if (_this.data) {
                        _this.facetService.addFilterSearch(_this.getName(), _this.data, _this.getSelectedItems(), { not: true });
                    }
                }
            });
            // Clear the current filters
            _this.clearFilters = new i3$1.Action({
                icon: "far fa-minus-square",
                title: "msg#facet.clearSelects",
                action: function () {
                    _this.facetService.clearFiltersSearch(_this.getName(), true);
                }
            });
            // Search for a value in this list
            _this.searchItems = new i3$1.Action({
                icon: "fas fa-search",
                title: "msg#facet.searchItems",
                action: function (item, event) {
                    item.selected = !item.selected;
                    if (!item.selected) {
                        _this.clearSearch();
                    }
                    event.stopPropagation();
                    _this.changeDetectorRef.markForCheck();
                }
            });
            return _this;
        }
        /**
         * Name of the facet, used to create and retrieve selections
         * through the facet service.
         */
        BsFacetTree.prototype.getName = function () {
            return this.name || this.aggregation;
        };
        /**
         * OnChanges listener awaits new results from the search service
         * This completely resets the display
         * @param changes
         */
        BsFacetTree.prototype.ngOnChanges = function (changes) {
            var _a;
            if (this.showCount === undefined)
                this.showCount = true;
            if (this.searchable === undefined)
                this.searchable = true;
            if (this.allowExclude === undefined)
                this.allowExclude = true;
            if (this.allowOr === undefined)
                this.allowOr = true;
            if (!!changes["results"]) { // New data from the search service
                this.filtered.clear();
                this.selected.clear();
                this.hiddenSelected.length = 0;
                this.data = this.facetService.getAggregation(this.aggregation, this.results, {
                    facetName: this.getName(),
                    levelCallback: this.initNodes
                });
                this.originalItems = (_a = this.data) === null || _a === void 0 ? void 0 : _a.items;
                this.searchItems.selected = false;
                this.clearSearch();
            }
        };
        Object.defineProperty(BsFacetTree.prototype, "actions", {
            /**
             * Returns all the actions that are relevant in the current context
             */
            get: function () {
                var actions = [];
                if (this.selected.size > 0) {
                    if (this.allowOr) {
                        actions.push(this.filterItemsOr);
                    }
                    if (this.allowExclude) {
                        actions.push(this.excludeItems);
                    }
                }
                if (this.hasFiltered()) {
                    actions.push(this.clearFilters);
                }
                if (this.searchable) {
                    actions.push(this.searchItems);
                }
                return actions;
            },
            enumerable: false,
            configurable: true
        });
        // Filtered items
        /**
         * Returns true if the given AggregationItem is filtered
         * @param item
         */
        BsFacetTree.prototype.isFiltered = function (item) {
            return this.filtered.has(item);
        };
        /**
         * Returns true if there is an active selection (or exclusion) from this facet
         */
        BsFacetTree.prototype.hasFiltered = function () {
            return this.facetService.hasFiltered(this.getName());
        };
        /**
         * Called when clicking on a facet item text
         * @param item
         * @param event
         */
        BsFacetTree.prototype.filterItem = function (item, event) {
            if (this.data) {
                if (!this.isFiltered(item)) {
                    this.facetService.addFilterSearch(this.getName(), this.data, item);
                }
                else {
                    this.facetService.removeFilterSearch(this.getName(), this.data, item);
                }
            }
            event.preventDefault();
            event.stopPropagation();
            return false; // Stop the propagation of the event (link inside link)
        };
        // Selected items
        /**
         * Returns true if the given AggregationItem is selected
         * @param item
         */
        BsFacetTree.prototype.isSelected = function (item) {
            return this.selected.has(item.$path);
        };
        /**
         * Returns all the selected items
         */
        BsFacetTree.prototype.getSelectedItems = function () {
            return Array.from(this.selected.values());
        };
        /**
         * Called when selecting/unselecting an item in the facet
         * @param item
         */
        BsFacetTree.prototype.selectItem = function (item) {
            if (!this.isFiltered(item)) {
                if (this.selected.has(item.$path)) {
                    this.selected.delete(item.$path);
                }
                else {
                    this.selected.set(item.$path, item);
                }
                this.refreshHiddenSelected();
            }
            return false;
        };
        BsFacetTree.prototype.refreshHiddenSelected = function () {
            var _this = this;
            this.hiddenSelected = this.getSelectedItems()
                .filter(function (item) { var _a; return !_this.find((_a = _this.data) === null || _a === void 0 ? void 0 : _a.items, item); });
        };
        BsFacetTree.prototype.find = function (items, item) {
            var e_1, _b;
            if (items) {
                try {
                    for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                        var i = items_1_1.value;
                        if (i.$path === item.$path || (i.$opened && this.find(i.items, item))) {
                            return true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (items_1_1 && !items_1_1.done && (_b = items_1.return)) _b.call(items_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return false;
        };
        /**
         * Expand/Collapse a Tree node (the data may need to downloaded from the server)
         * @param item
         */
        BsFacetTree.prototype.open = function (item, event) {
            var _this = this;
            if (item.hasChildren) {
                item.$opened = !item.$opened;
                if (!item.items || item.items.length === 0) {
                    item['$opening'] = true;
                    if (this.data) {
                        base.Utils.subscribe(this.facetService.open(this.getName(), this.data, item, this.initNodes), function (results) {
                            item['$opening'] = false;
                            _this.refreshHiddenSelected();
                            _this.changeDetectorRef.markForCheck();
                        });
                    }
                }
                this.refreshHiddenSelected();
            }
            event.preventDefault();
            event.stopPropagation();
            return false; // Prevent default action
        };
        /* AbstractFacet abstract methods */
        BsFacetTree.prototype.isHidden = function () {
            return !this.data;
        };
        // Search    
        BsFacetTree.prototype.clearSearch = function () {
            this.searchQuery.setValue(""); // Remove suggestions if some remain
            this.noResults = false;
        };
        BsFacetTree.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
        };
        return BsFacetTree;
    }(AbstractFacet));
    BsFacetTree.ɵfac = function BsFacetTree_Factory(t) { return new (t || BsFacetTree)(i0.ɵɵdirectiveInject(FacetService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    BsFacetTree.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetTree, selectors: [["sq-facet-tree"]], inputs: { name: "name", results: "results", aggregation: "aggregation", showCount: "showCount", allowExclude: "allowExclude", allowOr: "allowOr", searchable: "searchable", expandedLevel: "expandedLevel", forceMaxHeight: "forceMaxHeight", displayActions: "displayActions", initNodes: "initNodes" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 3, vars: 1, consts: [["class", "list-group list-group-flush", 3, "ngClass", 4, "ngIf"], ["itemsTpl", ""], [1, "list-group", "list-group-flush", 3, "ngClass"], ["class", "d-flex pb-2 pr-2", 4, "ngIf"], ["class", "position-relative", 3, "formGroup", 4, "ngIf"], ["class", "d-flex flex-row align-items-center list-group-item list-group-item-primary border-0 px-3 py-1 facet-row cursor-pointer", 3, "title", "click", 4, "ngFor", "ngForOf"], ["class", "d-block text-center text-muted small py-1", 4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "d-flex", "pb-2", "pr-2"], [1, "btn-group", "ml-auto", 3, "sq-action-buttons"], [1, "position-relative", 3, "formGroup"], [1, "p-1"], ["sqAutofocus", "", "formControlName", "searchQuery", 1, "form-control", 3, "placeholder"], [3, "active"], [1, "d-flex", "flex-row", "align-items-center", "list-group-item", "list-group-item-primary", "border-0", "px-3", "py-1", "facet-row", "cursor-pointer", 3, "title", "click"], ["href", "#", 1, "text-truncate", "mr-auto", 3, "title", "click"], ["class", "ml-2 text-muted small", 4, "ngIf"], [1, "ml-2", "text-muted", "small"], [1, "d-block", "text-center", "text-muted", "small", "py-1"], [4, "ngFor", "ngForOf"], ["href", "#", 1, "d-flex", "flex-row", "align-items-center", "list-group-item", "border-0", "pl-1", "pr-3", "py-1", 3, "ngClass", "title", "click"], [1, "mr-auto", "text-truncate", 3, "ngStyle"], ["class", "item-opener", "href", "#", 3, "title", "click", 4, "ngIf"], ["class", "fas fa-fw", 4, "ngIf"], ["href", "#", "role", "button", 1, "text-truncate", 3, "title", "click"], ["class", "ml-2 far fa-check-square", 4, "ngIf"], [4, "ngIf"], ["href", "#", 1, "item-opener", 3, "title", "click"], ["class", "fas fa-sync fa-fw fa-spin", 4, "ngIf"], ["class", "fas fa-caret-down fa-fw", 4, "ngIf"], ["class", "fas fa-caret-right fa-fw", 4, "ngIf"], [1, "fas", "fa-sync", "fa-fw", "fa-spin"], [1, "fas", "fa-caret-down", "fa-fw"], [1, "fas", "fa-caret-right", "fa-fw"], [1, "fas", "fa-fw"], [1, "ml-2", "far", "fa-check-square"]], template: function BsFacetTree_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsFacetTree_div_0_Template, 6, 9, "div", 0);
                i0.ɵɵtemplate(1, BsFacetTree_ng_template_1_Template, 1, 1, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !ctx.isHidden());
            }
        }, directives: [i2$1.NgIf, i2$1.NgClass, i2$1.NgForOf, i2$1.NgTemplateOutlet, i3$1.BsActionButtons, i4$2.NgControlStatusGroup, i4$2.FormGroupDirective, i4$2.DefaultValueAccessor, i5.Autofocus, i4$2.NgControlStatus, i4$2.FormControlName, i2.BsLoadingBar, i2$1.NgStyle], pipes: [i4$1.MessagePipe, i2$1.SlicePipe, i5.NumberPipe, i5.ValuePipe], styles: ["[_ngcontent-%COMP%]::-webkit-scrollbar{width:10px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#ccc}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background-color:#f3f3f3}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.scrollable[_ngcontent-%COMP%]{max-height:85vh;overflow-y:auto}.item-opener[_ngcontent-%COMP%]{text-decoration:none!important}a.filtered[_ngcontent-%COMP%], a.filtered[_ngcontent-%COMP%]:hover{color:inherit;cursor:inherit;text-decoration:none}"], changeDetection: 0 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsFacetTree, [{
                type: i0.Component,
                args: [{
                        selector: "sq-facet-tree",
                        templateUrl: "./facet-tree.html",
                        styleUrls: ["./facet-tree.scss"],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], function () { return [{ type: FacetService }, { type: i0.ChangeDetectorRef }]; }, { name: [{
                    type: i0.Input
                }], results: [{
                    type: i0.Input
                }], aggregation: [{
                    type: i0.Input
                }], showCount: [{
                    type: i0.Input
                }], allowExclude: [{
                    type: i0.Input
                }], allowOr: [{
                    type: i0.Input
                }], searchable: [{
                    type: i0.Input
                }], expandedLevel: [{
                    type: i0.Input
                }], forceMaxHeight: [{
                    type: i0.Input
                }], displayActions: [{
                    type: i0.Input
                }], initNodes: [{
                    type: i0.Input
                }] });
    })();

    function BsFacetBar_ng_container_3_sq_facet_list_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "sq-facet-list", 5, 6);
        }
        if (rf & 2) {
            var f_r1 = i0.ɵɵnextContext().$implicit;
            var ctx_r2 = i0.ɵɵnextContext();
            i0.ɵɵproperty("name", f_r1.name)("results", ctx_r2.results)("aggregation", f_r1.aggregations);
        }
    }
    function BsFacetBar_ng_container_3_sq_facet_tree_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "sq-facet-tree", 5, 6);
        }
        if (rf & 2) {
            var f_r1 = i0.ɵɵnextContext().$implicit;
            var ctx_r3 = i0.ɵɵnextContext();
            i0.ɵɵproperty("name", f_r1.name)("results", ctx_r3.results)("aggregation", f_r1.aggregations);
        }
    }
    function BsFacetBar_ng_container_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "sq-facet-card", 3);
            i0.ɵɵtemplate(2, BsFacetBar_ng_container_3_sq_facet_list_2_Template, 2, 3, "sq-facet-list", 4);
            i0.ɵɵtemplate(3, BsFacetBar_ng_container_3_sq_facet_tree_3_Template, 2, 3, "sq-facet-tree", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var f_r1 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵclassMap(f_r1["className"]);
            i0.ɵɵproperty("ngSwitch", f_r1.type)("title", f_r1.title);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngSwitchCase", "list");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngSwitchCase", "tree");
        }
    }
    var _c0$4 = ["*"];
    var BsFacetBar = /** @class */ (function () {
        function BsFacetBar(facetService) {
            this.facetService = facetService;
            this.containerIndex = 0; // There could be various facet bars (but only one service and storage array)
        }
        Object.defineProperty(BsFacetBar.prototype, "facets", {
            get: function () {
                var facets = this.facetService.getFacets(this.containerIndex);
                return facets;
            },
            enumerable: false,
            configurable: true
        });
        return BsFacetBar;
    }());
    BsFacetBar.ɵfac = function BsFacetBar_Factory(t) { return new (t || BsFacetBar)(i0.ɵɵdirectiveInject(FacetService)); };
    BsFacetBar.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetBar, selectors: [["sq-facet-bar"]], inputs: { results: "results", containerIndex: "containerIndex" }, ngContentSelectors: _c0$4, decls: 4, vars: 1, consts: [[1, "container-fluid"], [1, "row"], [4, "ngFor", "ngForOf"], [3, "ngSwitch", "title"], [3, "name", "results", "aggregation", 4, "ngSwitchCase"], [3, "name", "results", "aggregation"], ["facet", ""]], template: function BsFacetBar_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵprojectionDef();
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "div", 1);
                i0.ɵɵprojection(2);
                i0.ɵɵtemplate(3, BsFacetBar_ng_container_3_Template, 4, 7, "ng-container", 2);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("ngForOf", ctx.facets);
            }
        }, directives: [i2$1.NgForOf, BsFacetCard, i2$1.NgSwitch, i2$1.NgSwitchCase, BsFacetList, BsFacetTree], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsFacetBar, [{
                type: i0.Component,
                args: [{
                        selector: "sq-facet-bar",
                        templateUrl: "./facet-bar.html"
                    }]
            }], function () { return [{ type: FacetService }]; }, { results: [{
                    type: i0.Input
                }], containerIndex: [{
                    type: i0.Input
                }] });
    })();

    function BsFacetFilters_div_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵelement(1, "sq-action-menu", 2);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("items", ctx_r0.filters)("autoAdjust", ctx_r0.autoAdjust)("autoAdjustBreakpoint", ctx_r0.autoAdjustBreakpoint)("collapseBreakpoint", ctx_r0.collapseBreakpoint)("right", ctx_r0.rightAligned)("size", ctx_r0.size);
        }
    }
    var BsFacetFilters = /** @class */ (function () {
        function BsFacetFilters(facetService) {
            this.facetService = facetService;
            this.enableCustomization = false;
            this.autoAdjust = true;
            this.autoAdjustBreakpoint = 'xl';
            this.collapseBreakpoint = 'sm';
            this.rightAligned = false;
            this.filters = [];
            this.hidden = false;
            this.facetStatus = {
                add: {
                    title: "msg#facet.filters.add",
                    icon: "fas fa-plus"
                },
                remove: {
                    title: "msg#facet.filters.remove",
                    icon: "fas fa-minus"
                }
            };
            this.hidden = false;
            this.filters = [];
        }
        BsFacetFilters.prototype.ngOnInit = function () {
            var e_1, _c;
            if (!this.enableCustomization)
                return;
            if (!this.facetService.defaultFacets) {
                this.facetService.defaultFacets = [];
                try {
                    for (var _d = __values(this.facets), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var facet = _e.value;
                        this.facetService.defaultFacets.push({ name: facet.name, position: 0, hidden: false, expanded: true, view: "" });
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (!this.facetService.allFacets)
                this.facetService.allFacets = this.facets;
        };
        BsFacetFilters.prototype.ngOnChanges = function () {
            if (!!this.results)
                this.buildFilters();
            if (!this.results)
                this.hidden = true;
        };
        /**
         * Build filters bar actions
         */
        BsFacetFilters.prototype.buildFilters = function () {
            var _this = this;
            // For each facet
            this.filters = this.filteredFacets.map(function (facet) {
                var children = [
                    new i3$1.Action({
                        component: (facet.type === 'list') ? BsFacetList : BsFacetTree,
                        componentInputs: { results: _this.results, name: facet.name, aggregation: facet.aggregation, searchable: facet.searchable, displayActions: true }
                    })
                ];
                return new i3$1.Action({
                    name: facet.name,
                    text: facet.title,
                    title: facet.title,
                    icon: facet.icon,
                    disabled: !_this.hasData(facet),
                    styles: _this.hasFiltered(facet.name) ? "ml-2 font-weight-bold" : "ml-2",
                    children: children
                });
            });
            if (this.enableCustomization)
                this.addFacetMenu();
        };
        /**
         * Use to outline facet when filters are sets
         * @param facetName facet name
         *
         * @returns true if filters are sets otherwise false
         */
        BsFacetFilters.prototype.hasFiltered = function (facetName) {
            return this.facetService.hasFiltered(facetName);
        };
        /**
         * Use to disable menu item when no items in a facet
         * @param facet facet to check
         *
         * @returns true if facet contains at least one item otherwise false
         */
        BsFacetFilters.prototype.hasData = function (facet) {
            return this.facetService.hasData(facet.aggregation, this.results);
        };
        BsFacetFilters.prototype.addFacetMenu = function () {
            var e_2, _c;
            var _this = this;
            var _a, _b;
            var outFacets = [];
            outFacets.push(new i3$1.Action({
                name: "add_remove_all",
                text: this.userFacets.length < this.facets.length ? "msg#facet.filters.addAll" : "msg#facet.filters.removeAll",
                icon: this.hasFacetSelected ?
                    (this.userFacets.length < this.facets.length ? "far fa-minus-square mr-1" : "far fa-check-square mr-1")
                    : "far fa-square mr-1",
                title: this.userFacets.length < this.facets.length ? "msg#facet.filters.addAll" : "msg#facet.filters.removeAll",
                action: function () {
                    if (_this.hasFacetSelected && _this.userFacets.length === _this.facets.length)
                        _this.facetService.removeAllFacet();
                    else
                        _this.facetService.addAllFacet();
                    _this.buildFilters();
                }
            }));
            var _loop_1 = function (facet) {
                outFacets.push(new i3$1.Action({
                    name: "add_remove_" + facet.name,
                    text: facet.title,
                    icon: facet.icon,
                    selected: !!((_a = this_1.userFacets) === null || _a === void 0 ? void 0 : _a.find(function (userFacet) { return userFacet.name === facet.name; })),
                    title: !!((_b = this_1.userFacets) === null || _b === void 0 ? void 0 : _b.find(function (userFacet) { return userFacet.name === facet.name; })) ? "msg#facet.filters.add" : "msg#facet.filters.remove",
                    action: function () {
                        var _a;
                        if ((_a = _this.userFacets) === null || _a === void 0 ? void 0 : _a.find(function (userFacet) { return userFacet.name === facet.name; }))
                            _this.facetService.removeFacet({ name: facet.name, position: 0, hidden: false, expanded: true, view: "" });
                        else
                            _this.facetService.addFacet({ name: facet.name, position: 0, hidden: false, expanded: true, view: "" });
                        _this.buildFilters();
                    }
                }));
            };
            var this_1 = this;
            try {
                for (var _d = __values(this.facets), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var facet = _e.value;
                    _loop_1(facet);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                }
                finally { if (e_2) throw e_2.error; }
            }
            var add_action = new i3$1.Action({
                name: "facets_config",
                icon: "fas fa-cog",
                title: "msg#facet.filters.customizeFacets",
                children: outFacets
            });
            this.filters = __spread([add_action], this.filters);
        };
        Object.defineProperty(BsFacetFilters.prototype, "filteredFacets", {
            get: function () {
                var e_3, _c;
                if (!this.enableCustomization)
                    return this.facets;
                var new_facets = [];
                if (this.userFacets) {
                    var _loop_2 = function (facet) {
                        var pos = this_2.userFacets.findIndex(function (userFacet) { return userFacet.name === facet.name; });
                        if (pos >= 0)
                            new_facets.push(facet);
                    };
                    var this_2 = this;
                    try {
                        for (var _d = __values(this.facets), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var facet = _e.value;
                            _loop_2(facet);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
                return new_facets;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsFacetFilters.prototype, "userFacets", {
            get: function () {
                return this.facetService.facets;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsFacetFilters.prototype, "hasFacetSelected", {
            get: function () {
                var e_4, _c;
                if (this.userFacets.length === 0)
                    return false;
                var _loop_3 = function (facet) {
                    if (this_3.userFacets.find(function (userFacet) { return userFacet.name === facet.name; }))
                        return { value: true };
                };
                var this_3 = this;
                try {
                    for (var _d = __values(this.facets), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var facet = _e.value;
                        var state_1 = _loop_3(facet);
                        if (typeof state_1 === "object")
                            return state_1.value;
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                return false;
            },
            enumerable: false,
            configurable: true
        });
        return BsFacetFilters;
    }());
    BsFacetFilters.ɵfac = function BsFacetFilters_Factory(t) { return new (t || BsFacetFilters)(i0.ɵɵdirectiveInject(FacetService)); };
    BsFacetFilters.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetFilters, selectors: [["sq-facet-filters"]], inputs: { results: "results", facets: "facets", enableCustomization: "enableCustomization", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", rightAligned: "rightAligned", size: "size" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "facet-filters-bar", 4, "ngIf"], [1, "facet-filters-bar"], [3, "items", "autoAdjust", "autoAdjustBreakpoint", "collapseBreakpoint", "right", "size"]], template: function BsFacetFilters_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsFacetFilters_div_0_Template, 2, 6, "div", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !ctx.hidden);
            }
        }, directives: [i2$1.NgIf, i3$1.BsActionMenu], styles: [".navbar-nav[_ngcontent-%COMP%]{flex-direction:row;flex-wrap:wrap}.nav-item[_ngcontent-%COMP%]{padding:.25rem .75rem}div.sq-collapse.ng-animating[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{display:none}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsFacetFilters, [{
                type: i0.Component,
                args: [{
                        selector: "sq-facet-filters",
                        templateUrl: "./facet-filters.html",
                        styleUrls: ["./facet-filters.css"]
                    }]
            }], function () { return [{ type: FacetService }]; }, { results: [{
                    type: i0.Input
                }], facets: [{
                    type: i0.Input
                }], enableCustomization: [{
                    type: i0.Input
                }], autoAdjust: [{
                    type: i0.Input
                }], autoAdjustBreakpoint: [{
                    type: i0.Input
                }], collapseBreakpoint: [{
                    type: i0.Input
                }], rightAligned: [{
                    type: i0.Input
                }], size: [{
                    type: i0.Input
                }] });
    })();

    function BsRefine_ng_template_15_small_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "small", 14);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r3 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, item_r3.label || item_r3.category));
        }
    }
    function BsRefine_ng_template_15_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 12);
            i0.ɵɵtext(1);
            i0.ɵɵtemplate(2, BsRefine_ng_template_15_small_2_Template, 3, 3, "small", 13);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r3 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1("", item_r3.display, " ");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", item_r3.category);
        }
    }
    var BsRefine = /** @class */ (function (_super) {
        __extends(BsRefine, _super);
        function BsRefine(formBuilder, searchService, changeDetectorRef) {
            var _this = _super.call(this) || this;
            _this.formBuilder = formBuilder;
            _this.searchService = searchService;
            _this.changeDetectorRef = changeDetectorRef;
            /**
             * Minimum delay (in ms) between suggest queries
             */
            _this.suggestDelay = 200;
            _this.doRefine = function () {
                if (_this.searchControl) {
                    var text = base.Utils.trim(_this.searchControl.value);
                    if (text) {
                        _this.searchService.searchRefine(text);
                    }
                }
            };
            return _this;
        }
        BsRefine.prototype.ngOnChanges = function (changes) {
            if (!this.form) {
                this.form = this.formBuilder.group({
                    "search": ""
                });
                this.searchControl = this.form.get("search");
            }
            if (!!changes["results"] && this.searchControl) {
                this.searchControl.setValue(this.searchService.lastRefineText);
            }
        };
        BsRefine.prototype.setError = function (parseResult) {
            if (parseResult === void 0) { parseResult = {}; }
            if (parseResult.error !== this.inputErrorMessage) {
                this.inputErrorMessage = parseResult.error || "";
                this.changeDetectorRef.markForCheck();
            }
        };
        return BsRefine;
    }(AbstractFacet));
    BsRefine.ɵfac = function BsRefine_Factory(t) { return new (t || BsRefine)(i0.ɵɵdirectiveInject(i4$2.FormBuilder), i0.ɵɵdirectiveInject(i2.SearchService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    BsRefine.ɵcmp = i0.ɵɵdefineComponent({ type: BsRefine, selectors: [["sq-refine"]], inputs: { results: "results", autocompleteEnabled: "autocompleteEnabled", suggestQuery: "suggestQuery", suggestDelay: "suggestDelay" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 18, vars: 20, consts: [[1, "card-body"], ["role", "search", "novalidate", "", 3, "formGroup"], [1, "d-flex", "flex-column", "flex-grow-1", "position-relative"], [1, "input-group"], [1, "sr-only"], ["type", "text", "formControlName", "search", "spellcheck", "false", "autocomplete", "off", "sqAutocomplete", "", 3, "title", "placeholder", "dropdown", "suggestQuery", "off", "suggestDelay", "submit", "parse"], [1, "input-group-append"], ["type", "button", 1, "btn", "btn-light", 3, "title", "click"], [1, "fas", "fa-search"], ["dropdown", ""], ["itemTpl", ""], [3, "results", "context"], [1, "py-2", 2, "padding-left", "0.75rem"], ["class", "ml-2 text-muted", 4, "ngIf"], [1, "ml-2", "text-muted"]], template: function BsRefine_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "form", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵelementStart(3, "div", 3);
                i0.ɵɵelementStart(4, "label", 4);
                i0.ɵɵtext(5);
                i0.ɵɵpipe(6, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(7, "input", 5);
                i0.ɵɵlistener("submit", function BsRefine_Template_input_submit_7_listener() { return ctx.doRefine(); })("parse", function BsRefine_Template_input_parse_7_listener($event) { return ctx.setError($event); });
                i0.ɵɵpipe(8, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(9, "div", 6);
                i0.ɵɵelementStart(10, "button", 7);
                i0.ɵɵlistener("click", function BsRefine_Template_button_click_10_listener() { return ctx.doRefine(); });
                i0.ɵɵpipe(11, "sqMessage");
                i0.ɵɵelement(12, "i", 8);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(13, "sq-autocomplete-list", null, 9);
                i0.ɵɵtemplate(15, BsRefine_ng_template_15_Template, 3, 2, "ng-template", null, 10, i0.ɵɵtemplateRefExtractor);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelement(17, "sq-did-you-mean", 11);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                var _r0 = i0.ɵɵreference(14);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("formGroup", ctx.form);
                i0.ɵɵadvance(4);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 14, "msg#facet.refine.input.label"));
                i0.ɵɵadvance(2);
                i0.ɵɵclassMapInterpolate1("form-control ", ctx.inputErrorMessage ? "is-invalid" : "", "");
                i0.ɵɵproperty("title", ctx.inputErrorMessage)("placeholder", i0.ɵɵpipeBind1(8, 16, "msg#facet.refine.input.placeholder"))("dropdown", _r0)("suggestQuery", ctx.suggestQuery)("off", !ctx.autocompleteEnabled)("suggestDelay", ctx.suggestDelay);
                i0.ɵɵadvance(3);
                i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(11, 18, "msg#facet.refine.input.buttonTitle"));
                i0.ɵɵadvance(7);
                i0.ɵɵproperty("results", ctx.results)("context", "refine");
            }
        }, directives: [i4$2.ɵangular_packages_forms_forms_y, i4$2.NgControlStatusGroup, i4$2.FormGroupDirective, i4$2.DefaultValueAccessor, i4$2.NgControlStatus, i4$2.FormControlName, i3.Autocomplete, i3.BsAutocompleteList, i2.BsDidYouMean, i2$1.NgIf], pipes: [i4$1.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsRefine, [{
                type: i0.Component,
                args: [{
                        selector: "sq-refine",
                        templateUrl: "./facet-refine.html"
                    }]
            }], function () { return [{ type: i4$2.FormBuilder }, { type: i2.SearchService }, { type: i0.ChangeDetectorRef }]; }, { results: [{
                    type: i0.Input
                }], autocompleteEnabled: [{
                    type: i0.Input
                }], suggestQuery: [{
                    type: i0.Input
                }], suggestDelay: [{
                    type: i0.Input
                }] });
    })();

    function BsMySearch_ng_container_1_div_1_span_3_Template(rf, ctx) {
        if (rf & 1) {
            var _r8_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "span", 7);
            i0.ɵɵlistener("click", function BsMySearch_ng_container_1_div_1_span_3_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r8_1); var item_r2 = i0.ɵɵnextContext(2).$implicit; var ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.removeItem(item_r2); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 1, "msg#facet.mySearch.itemRemove"));
        }
    }
    var _c0$5 = function (a0) { return { "sq-metadata-border": a0 }; };
    var _c1$4 = function (a0) { return { withFields: a0, asHTML: true }; };
    function BsMySearch_ng_container_1_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 4);
            i0.ɵɵelement(1, "span", 5);
            i0.ɵɵpipe(2, "sqExpr");
            i0.ɵɵtemplate(3, BsMySearch_ng_container_1_div_1_span_3_Template, 2, 3, "span", 6);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r9 = i0.ɵɵnextContext();
            var i_r3 = ctx_r9.index;
            var item_r2 = ctx_r9.$implicit;
            var ctx_r4 = i0.ɵɵnextContext();
            i0.ɵɵclassMapInterpolate1("px-1 ml-1 mb-1 sq-metadata-item sq-metadata-color-", ctx_r4.fields[i_r3], "");
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c0$5, ctx_r4.useBadges));
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("title", ctx_r4.fields[i_r3]);
            i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind2(2, 7, item_r2.display, i0.ɵɵpureFunction1(12, _c1$4, ctx_r4.displayFieldNames)), i0.ɵɵsanitizeHtml);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r4.allowDeletion);
        }
    }
    function BsMySearch_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsMySearch_ng_container_1_div_1_Template, 4, 14, "div", 3);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var item_r2 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !item_r2.hidden);
        }
    }
    function BsMySearch_div_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r11_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelement(1, "hr");
            i0.ɵɵelementStart(2, "i", 8);
            i0.ɵɵlistener("click", function BsMySearch_div_2_Template_i_click_2_listener() { i0.ɵɵrestoreView(_r11_1); var ctx_r10 = i0.ɵɵnextContext(); return ctx_r10.collapsed = !ctx_r10.collapsed; });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵclassMapInterpolate1("fas fa-chevron-circle-", ctx_r1.collapsed ? "down" : "up", "");
        }
    }
    var BsMySearch = /** @class */ (function (_super) {
        __extends(BsMySearch, _super);
        function BsMySearch(searchService) {
            var _this = _super.call(this) || this;
            _this.searchService = searchService;
            /** Display icon to delete items */
            _this.allowDeletion = true;
            /** Display each item's field */
            _this.displayFieldNames = false;
            /** Make the div collapsible */
            _this.collapsible = false;
            /** Add a badge likely style to items */
            _this.useBadges = false;
            /** Wether we Ignore text and fielded search */
            _this.ignoreText = true;
            /** Items of those facets will be excluded  */
            _this.excludedFacets = ["search-form"];
            _this.collapsed = false;
            _this.items = [];
            _this.fields = [];
            _this.clearAction = new i3$1.Action({
                icon: "far fa-minus-square",
                title: "msg#facet.filters.clear",
                action: function () { return _this.clear(); },
            });
            return _this;
        }
        BsMySearch.prototype.ngOnChanges = function (changes) {
            var e_1, _c;
            var _this = this;
            var _a, _b;
            if (!!changes["results"]) {
                /** Initialize items based on input values */
                this.items = this.ignoreText
                    ? ((_a = this.searchService.breadcrumbs) === null || _a === void 0 ? void 0 : _a.items.filter(function (item) { return item.expr && !(item.expr && !item.expr.field && !item.expr.isStructured) && !_this.excludedFacets.includes(item.facet); })) || []
                    : ((_b = this.searchService.breadcrumbs) === null || _b === void 0 ? void 0 : _b.items) || [];
                /** Retrieve the field name of each item */
                this.fields = [];
                try {
                    for (var _d = __values(this.items), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var item = _e.value;
                        this.fields.push(this.getField(item));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        BsMySearch.prototype.getField = function (item) {
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
        BsMySearch.prototype.removeItem = function (item) {
            this.searchService.removeBreadcrumbsItem(item);
        };
        Object.defineProperty(BsMySearch.prototype, "isEmpty", {
            get: function () {
                return this.items.length === 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsMySearch.prototype, "actions", {
            get: function () {
                var actions = [];
                if (!this.isEmpty && this.allowDeletion) {
                    actions.push(this.clearAction);
                }
                return actions;
            },
            enumerable: false,
            configurable: true
        });
        BsMySearch.prototype.clear = function () {
            var e_2, _c;
            try {
                for (var _d = __values(this.items), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var item = _e.value;
                    this.searchService.removeBreadcrumbsItem(item);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        return BsMySearch;
    }(AbstractFacet));
    BsMySearch.ɵfac = function BsMySearch_Factory(t) { return new (t || BsMySearch)(i0.ɵɵdirectiveInject(i2.SearchService)); };
    BsMySearch.ɵcmp = i0.ɵɵdefineComponent({ type: BsMySearch, selectors: [["sq-facet-mysearch"]], inputs: { results: "results", allowDeletion: "allowDeletion", displayFieldNames: "displayFieldNames", collapsible: "collapsible", useBadges: "useBadges", ignoreText: "ignoreText", excludedFacets: "excludedFacets" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 3, vars: 3, consts: [[1, "my-search", "d-flex", "flex-row", "align-items-center", "flex-wrap", 3, "ngClass"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "class", "ngClass", 4, "ngIf"], [3, "ngClass"], [3, "innerHTML", "title"], ["class", "far fa-times-circle pl-1", "role", "button", 3, "title", "click", 4, "ngIf"], ["role", "button", 1, "far", "fa-times-circle", "pl-1", 3, "title", "click"], [3, "click"]], template: function BsMySearch_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtemplate(1, BsMySearch_ng_container_1_Template, 2, 1, "ng-container", 1);
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(2, BsMySearch_div_2_Template, 3, 3, "div", 2);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngClass", ctx.collapsed ? "collapsed-view" : "expanded-view");
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", ctx.items);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.collapsible && !ctx.isEmpty);
            }
        }, directives: [i2$1.NgClass, i2$1.NgForOf, i2$1.NgIf], pipes: [i5.ExprPipe, i4$1.MessagePipe], styles: [".my-search[_ngcontent-%COMP%]{font-size:.85rem}.sq-metadata-item[_ngcontent-%COMP%]{background-color:#fff;border-radius:20px;cursor:pointer}.sq-metadata-item[_ngcontent-%COMP%]:hover{background-color:#d3d3d3;opacity:.8}.sq-metadata-item[_ngcontent-%COMP%]   .fa-times-circle[_ngcontent-%COMP%]:hover{cursor:pointer;opacity:.8}.sq-metadata-border[_ngcontent-%COMP%]{border:1px solid}.text-decoration-line-through[_ngcontent-%COMP%]{text-decoration:line-through}.collapsed-view[_ngcontent-%COMP%]{height:29px;overflow-y:hidden}.expanded-view[_ngcontent-%COMP%]{height:unset}.fa-chevron-circle-down[_ngcontent-%COMP%], .fa-chevron-circle-up[_ngcontent-%COMP%]{color:#a9a9a9;left:49%;position:relative;top:-5px}.fa-chevron-circle-down[_ngcontent-%COMP%]:hover, .fa-chevron-circle-up[_ngcontent-%COMP%]:hover{cursor:pointer;opacity:.7}hr[_ngcontent-%COMP%]{margin-bottom:0!important;margin-top:0!important;width:30%}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsMySearch, [{
                type: i0.Component,
                args: [{
                        selector: "sq-facet-mysearch",
                        templateUrl: "./facet-mysearch.html",
                        styleUrls: ["./facet-mysearch.scss"],
                    }]
            }], function () { return [{ type: i2.SearchService }]; }, { results: [{
                    type: i0.Input
                }], allowDeletion: [{
                    type: i0.Input
                }], displayFieldNames: [{
                    type: i0.Input
                }], collapsible: [{
                    type: i0.Input
                }], useBadges: [{
                    type: i0.Input
                }], ignoreText: [{
                    type: i0.Input
                }], excludedFacets: [{
                    type: i0.Input
                }] });
    })();

    var _c0$6 = ["slider"];
    function BsFacetRange_ng_container_0_ng5_slider_3_Template(rf, ctx) {
        if (rf & 1) {
            var _r5_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "ng5-slider", 4);
            i0.ɵɵlistener("valueChange", function BsFacetRange_ng_container_0_ng5_slider_3_Template_ng5_slider_valueChange_0_listener($event) { i0.ɵɵrestoreView(_r5_1); var ctx_r4 = i0.ɵɵnextContext(2); return ctx_r4.value = $event; })("highValueChange", function BsFacetRange_ng_container_0_ng5_slider_3_Template_ng5_slider_highValueChange_0_listener($event) { i0.ɵɵrestoreView(_r5_1); var ctx_r6 = i0.ɵɵnextContext(2); return ctx_r6.highValue = $event; })("userChangeEnd", function BsFacetRange_ng_container_0_ng5_slider_3_Template_ng5_slider_userChangeEnd_0_listener($event) { i0.ɵɵrestoreView(_r5_1); var ctx_r7 = i0.ɵɵnextContext(2); return ctx_r7.onUserChangeEnd($event); });
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("value", ctx_r2.value)("highValue", ctx_r2.highValue)("options", ctx_r2.options)("manualRefresh", ctx_r2.manualRefresh);
        }
    }
    function BsFacetRange_ng_container_0_span_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "msg#facet.range.unavailable"));
        }
    }
    function BsFacetRange_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "div", 1, 2);
            i0.ɵɵtemplate(3, BsFacetRange_ng_container_0_ng5_slider_3_Template, 1, 4, "ng5-slider", 3);
            i0.ɵɵtemplate(4, BsFacetRange_ng_container_0_span_4_Template, 3, 3, "span", 0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx_r0.sliderActive);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r0.sliderActive);
        }
    }
    (function (RoundTarget) {
        RoundTarget[RoundTarget["number"] = 0] = "number";
        RoundTarget[RoundTarget["year"] = 1] = "year";
        RoundTarget[RoundTarget["month"] = 2] = "month";
        RoundTarget[RoundTarget["week"] = 3] = "week";
        RoundTarget[RoundTarget["day"] = 4] = "day";
    })(exports.RoundTarget || (exports.RoundTarget = {}));
    (function (RoundType) {
        RoundType[RoundType["up"] = 0] = "up";
        RoundType[RoundType["down"] = 1] = "down";
        RoundType[RoundType["nearest"] = 2] = "nearest";
    })(exports.RoundType || (exports.RoundType = {}));
    var BsFacetRange = /** @class */ (function (_super) {
        __extends(BsFacetRange, _super);
        function BsFacetRange(facetService, appService, searchService, formatService, intlService, uiService, advancedService, exprBuilder) {
            var _this = _super.call(this) || this;
            _this.facetService = facetService;
            _this.appService = appService;
            _this.searchService = searchService;
            _this.formatService = formatService;
            _this.intlService = intlService;
            _this.uiService = uiService;
            _this.advancedService = advancedService;
            _this.exprBuilder = exprBuilder;
            _this.manualRefresh = new i0.EventEmitter();
            _this.translate = function (value, label) {
                var value1 = _this.roundNearest(value); // to accommodate fractional steps generated for years/months
                if (_this.format) {
                    if (_this.column && i4.AppService.isDate(_this.column)) {
                        var date = new Date(value1);
                        var m = moment__default['default'](date);
                        return _this.intlService.formatMessage(_this.format, { date: date, time: base.Utils.getTime(date), weekDay: m.weekday(), week: m.week(), weekYear: m.weekYear() });
                    }
                    else {
                        return _this.intlService.formatMessage(_this.format, { value: value1 });
                    }
                }
                return _this.formatService.formatFieldValue(_this.column && i4.AppService.isDate(_this.column) ? new Date(value1) : value1, _this.column);
            };
            _this.onResize = function () {
                _this.manualRefresh.emit();
            };
            _this.clearFiltersAction = new i3$1.Action({
                icon: "far fa-minus-square",
                title: "msg#facet.range.clear",
                action: function () { return _this.clearRange(); }
            });
            _this.applyFiltersAction = new i3$1.Action({
                icon: "fas fa-filter",
                title: "msg#facet.range.apply",
                action: function () { return _this.applyRange(); }
            });
            return _this;
        }
        BsFacetRange.prototype.roundAdjustment = function (value, multiple, roundType) {
            switch (roundType) {
                case exports.RoundType.up:
                    return multiple - value % multiple;
                default:
                case exports.RoundType.down:
                    return -(value % multiple);
                case exports.RoundType.nearest: {
                    var adjustUp = multiple - value % multiple;
                    var adjustDown = -(value % multiple);
                    return Math.abs(adjustUp) <= Math.abs(adjustDown) ? adjustUp : adjustDown;
                }
            }
        };
        BsFacetRange.prototype._roundNumberUp = function (value, step) {
            return (value >= 0 ? Math.ceil(value / step) : Math.floor(value / step)) * step;
        };
        BsFacetRange.prototype._roundNumberDown = function (value, step) {
            return (value >= 0 ? Math.floor(value / step) : Math.ceil(value / step)) * step;
        };
        BsFacetRange.prototype._roundNumber = function (value, step, roundType) {
            switch (roundType) {
                case exports.RoundType.up:
                    return this._roundNumberUp(value, step);
                default:
                case exports.RoundType.down:
                    return this._roundNumberDown(value, step);
                case exports.RoundType.nearest: {
                    var up = this._roundNumberUp(value, step);
                    var down = this._roundNumberDown(value, step);
                    return Math.abs(up - value) <= Math.abs(down - value) ? up : down;
                }
            }
        };
        BsFacetRange.prototype._getNearestDate = function (date, upper, lower) {
            return Math.abs(upper.getTime() - date.getTime()) <= Math.abs(lower.getTime() - date.getTime()) ? upper : lower;
        };
        BsFacetRange.prototype._getNearestTargetDate = function (date, target) {
            switch (target) {
                case exports.RoundTarget.year: {
                    return this._getNearestDate(date, new Date(date.getFullYear() + 1, 0), new Date(date.getFullYear(), 0));
                }
                case exports.RoundTarget.month: {
                    return this._getNearestDate(date, new Date(date.getFullYear(), date.getMonth() + 1), new Date(date.getFullYear(), date.getMonth()));
                }
                default:
                case exports.RoundTarget.week:
                case exports.RoundTarget.day: {
                    return this._getNearestDate(date, new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1), new Date(date.getFullYear(), date.getMonth(), date.getDate()));
                }
            }
        };
        BsFacetRange.prototype._round = function (value, step, target, multiple, roundType) {
            if (roundType === void 0) { roundType = exports.RoundType.down; }
            if (this.column && i4.AppService.isDate(this.column)) {
                var date = new Date(value);
                if (roundType === exports.RoundType.nearest) {
                    // round to the nearest target year, month or day to adjust for the linear step size and leap years
                    date = this._getNearestTargetDate(date, target);
                }
                switch (target) {
                    case exports.RoundTarget.year: {
                        var year = date.getFullYear();
                        if (year % multiple !== 0 || date.getMonth() !== 0 || date.getDate() !== 1 ||
                            date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0) {
                            date = new Date(year + this.roundAdjustment(year, multiple, roundType), 0);
                        }
                        break;
                    }
                    case exports.RoundTarget.month: {
                        var month = date.getMonth();
                        if (month % multiple !== 0 || date.getDate() !== 1 ||
                            date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0) {
                            date = new Date(date.getFullYear(), month + this.roundAdjustment(month, multiple, roundType));
                        }
                        break;
                    }
                    case exports.RoundTarget.week: {
                        var day = date.getDay();
                        // First, round to Monday
                        if (day !== 1 /*Monday*/ ||
                            date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0) {
                            var adjust = void 0;
                            var up = 7 - (day - 1);
                            var down = -(day - 1);
                            switch (roundType) {
                                case exports.RoundType.up:
                                    adjust = up;
                                    break;
                                default:
                                case exports.RoundType.down:
                                    adjust = down;
                                    break;
                                case exports.RoundType.nearest:
                                    adjust = Math.abs(up) >= Math.abs(down) ? up : down;
                                    break;
                            }
                            date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + adjust);
                        }
                        // Then, round to week number
                        var m = moment__default['default'](date);
                        var week = m.week();
                        if (week % multiple !== 0) {
                            date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (this.roundAdjustment(week, multiple, roundType) * 7));
                        }
                        break;
                    }
                    case exports.RoundTarget.day: {
                        var _date = date.getDate();
                        if (date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0) {
                            date = new Date(date.getFullYear(), date.getMonth(), _date + this.roundAdjustment(_date, multiple, roundType));
                        }
                        break;
                    }
                }
                return date.getTime();
            }
            else {
                return this._roundNumber(value, step, roundType);
            }
        };
        BsFacetRange.prototype.round = function (value, roundType) {
            if (roundType === void 0) { roundType = exports.RoundType.down; }
            return this._round(value, this.options.step || 1, this.roundTarget, this.roundMultiple, roundType);
        };
        BsFacetRange.prototype.roundDown = function (value) {
            return this.round(value, exports.RoundType.down);
        };
        BsFacetRange.prototype.roundUp = function (value) {
            return this.round(value, exports.RoundType.up);
        };
        BsFacetRange.prototype.roundNearest = function (value) {
            return this.round(value, exports.RoundType.nearest);
        };
        //TODO - remove fix engine hack
        BsFacetRange.prototype.fixDate = function (dateStr) {
            if (dateStr) {
                var secondsSep = dateStr.lastIndexOf(":");
                if (secondsSep > 0) {
                    var seconds = base.Utils.toInt(dateStr.substr(secondsSep + 1));
                    if (seconds < 0) {
                        seconds = 0;
                    }
                    else if (seconds > 59) {
                        seconds = 59;
                    }
                    dateStr = dateStr.substr(0, secondsSep + 1) + seconds;
                }
            }
            return dateStr;
        };
        BsFacetRange.prototype.initMinMax = function () {
            var _a;
            var min = 0;
            var max = 0;
            if (!base.Utils.isEmpty(this.min) && (!base.Utils.isEmpty(this.max))) {
                min = this.parseValue(!!new Date(this.min).getDate() ? new Date(this.min) : this.min);
                max = this.parseValue(!!new Date(this.max).getDate() ? new Date(this.max) : this.max);
            }
            else {
                if ((_a = this.data) === null || _a === void 0 ? void 0 : _a.items) {
                    var item = this.data.items[0];
                    if (item && item.operatorResults) {
                        if (this.column && i4.AppService.isDate(this.column)) {
                            //TODO - remove fix engine hack
                            if (base.Utils.isString(item.operatorResults.min)) {
                                var date = base.Utils.fromSysDateStr(this.fixDate(item.operatorResults.min));
                                if (base.Utils.isDate(date)) {
                                    item.operatorResults.min = date;
                                }
                            }
                            if (base.Utils.isString(item.operatorResults.max)) {
                                var date = base.Utils.fromSysDateStr(this.fixDate(item.operatorResults.max));
                                if (base.Utils.isDate(date)) {
                                    item.operatorResults.max = date;
                                }
                            }
                            min = base.Utils.isDate(item.operatorResults.min) ? item.operatorResults.min.getTime() : 0;
                            max = base.Utils.isDate(item.operatorResults.max) ? item.operatorResults.max.getTime() : 0;
                        }
                        else {
                            min = base.Utils.isNumber(item.operatorResults.min) ? item.operatorResults.min : 0;
                            max = base.Utils.isNumber(item.operatorResults.max) ? item.operatorResults.max : 0;
                        }
                    }
                }
            }
            this.options.floor = min;
            this.options.ceil = max;
        };
        BsFacetRange.prototype.parseValue = function (value) {
            if (base.Utils.isDate(value)) {
                return value.getTime();
            }
            if (!base.Utils.isString(value)) {
                return 0;
            }
            var _value;
            if (this.column && this.column.parser) {
                var str = this.formatService.parseValue(value, this.column.parser);
                _value = base.Utils.toNumber(str);
            }
            if (base.Utils.isUndefined(_value)) {
                _value = this.column && i4.AppService.isDate(this.column) ?
                    base.Utils.toDuration(value) :
                    base.Utils.toSize(value);
            }
            return _value;
        };
        BsFacetRange.prototype.initStep = function () {
            var e_1, _c;
            // Select the first step definition where the range >= stepDef.minRange
            var format;
            var step;
            if (this.stepDefs) {
                try {
                    for (var _d = __values(this.stepDefs), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var stepDef = _e.value;
                        if (stepDef.step) {
                            var thisStep = this.parseValue(stepDef.step);
                            if (thisStep && stepDef.active) {
                                if (!stepDef.minRange) {
                                    step = thisStep;
                                    format = stepDef.format;
                                    break;
                                }
                                else {
                                    // Round min/max for thisStep
                                    var _f = this.getRoundTarget(thisStep), roundTarget_1 = _f.roundTarget, roundMultiple_1 = _f.roundMultiple;
                                    var min = this._round(this.options.floor || 0, thisStep, roundTarget_1, roundMultiple_1, exports.RoundType.down);
                                    var max = this._round(this.options.ceil || 0, thisStep, roundTarget_1, roundMultiple_1, exports.RoundType.up);
                                    var range = max - min;
                                    var minRange = this.parseValue(stepDef.minRange);
                                    if (range >= minRange) {
                                        step = thisStep;
                                        format = stepDef.format;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (!step) {
                // Default step, default formatting
                step = this.column && i4.AppService.isDate(this.column) ? base.Utils.oneDay : 1;
            }
            // Adjust step for year/month rounding (we assume daylight savings will balance out over the year)
            var _g = this.getRoundTarget(step), roundTarget = _g.roundTarget, roundMultiple = _g.roundMultiple;
            switch (roundTarget) {
                case exports.RoundTarget.year:
                    step = roundMultiple * 365.25 * base.Utils.oneDay;
                    break;
                case exports.RoundTarget.month:
                    step = roundMultiple * 365.25 * base.Utils.oneDay / 12;
                    break;
            }
            this.roundTarget = roundTarget;
            this.roundMultiple = roundMultiple;
            // Set default format based on roundTarget
            if (!format) {
                switch (this.roundTarget) {
                    case exports.RoundTarget.year:
                        format = "msg#facet.range.year";
                        break;
                    case exports.RoundTarget.month:
                        format = "msg#facet.range.monthYear";
                        break;
                    case exports.RoundTarget.week:
                        format = "msg#facet.range.weekYear";
                        break;
                    default:
                        format = "";
                        break;
                }
            }
            this.options.step = step;
            this.format = format;
        };
        BsFacetRange.prototype.getRoundTarget = function (step) {
            var ret = {
                roundTarget: exports.RoundTarget.number,
                roundMultiple: 1
            };
            if (this.column && i4.AppService.isDate(this.column)) {
                if (step % (365 * base.Utils.oneDay) === 0) {
                    ret.roundTarget = exports.RoundTarget.year;
                    ret.roundMultiple = step / (365 * base.Utils.oneDay);
                }
                else if (step % (30 * base.Utils.oneDay) === 0) {
                    ret.roundTarget = exports.RoundTarget.month;
                    ret.roundMultiple = step / (30 * base.Utils.oneDay);
                }
                else if (step % (7 * base.Utils.oneDay) === 0) {
                    ret.roundTarget = exports.RoundTarget.week;
                    ret.roundMultiple = step / (7 * base.Utils.oneDay);
                }
                else if (step % base.Utils.oneDay === 0) {
                    ret.roundTarget = exports.RoundTarget.day;
                    ret.roundMultiple = step / base.Utils.oneDay;
                }
            }
            return ret;
        };
        BsFacetRange.prototype.init = function () {
            this.options = {
                draggableRange: true,
                enforceStep: false,
                translate: this.translate
            };
            this.initMinMax();
            this.initStep();
            var ceil = this.options.ceil || 0;
            var floor = this.options.floor || 0;
            this.sliderActive = ceil > floor;
            if (ceil > floor) {
                floor = this.options.floor = this.roundDown(floor);
                ceil = this.options.ceil = this.roundUp(ceil);
            }
            var _c = __read(this.getRange(), 2), from = _c[0], to = _c[1];
            this.rangeActive = !base.Utils.isUndefined(from) || !base.Utils.isUndefined(to);
            this.rangeSelected = false;
            this.value = this.startValue = Math.max(from || floor, floor);
            this.highValue = this.startHighValue = Math.min(to || ceil, ceil);
        };
        BsFacetRange.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if (!this.initDone) {
                this.initDone = true;
                this.localeChange = base.Utils.subscribe(this.intlService.events, function (value) {
                    _this.manualRefresh.emit();
                });
            }
            if (!!changes["results"]) {
                this.data = this.facetService.getAggregation(this.aggregation, this.results);
                this.column = this.data && this.appService.getColumn(this.data.column);
                this.init();
            }
        };
        BsFacetRange.prototype.ngAfterViewInit = function () {
            this.uiService.addElementResizeListener(this.slider.nativeElement, this.onResize);
        };
        BsFacetRange.prototype.ngOnDestroy = function () {
            if (this.localeChange) {
                this.localeChange.unsubscribe();
            }
            if (this.uiService && this.slider) {
                this.uiService.removeElementResizeListener(this.slider.nativeElement, this.onResize);
            }
        };
        BsFacetRange.prototype.onUserChangeEnd = function (changeContext) {
            this.rangeSelected = this.value !== this.startValue || this.highValue !== this.startHighValue;
        };
        BsFacetRange.prototype.getRange = function () {
            var _this = this;
            var _a, _b;
            if (this.column) {
                var expr = void 0;
                var value = void 0;
                var expression = (_b = (_a = this.searchService.query) === null || _a === void 0 ? void 0 : _a.findSelect(this.column.name)) === null || _b === void 0 ? void 0 : _b.expression;
                if (expression) {
                    expr = this.appService.parseExpr(expression);
                    if (expr instanceof i4.Expr) {
                        if (expr.values && expr.values.length > 1) {
                            value = expr.values;
                        }
                        else {
                            value = expr.value;
                        }
                        if (!base.Utils.isArray(value)) {
                            if (expr.operator === 3 /* gte */) {
                                value = [value, undefined];
                            }
                            else if (expr.operator === 5 /* lte */) {
                                value = [undefined, value];
                            }
                        }
                        value = value.map(function (val) { return val ? _this.advancedService.castAdvancedValue(val, _this.column) : val; });
                        if (i4.AppService.isDate(this.column)) {
                            value = value.map(function (val) { return val ? new Date(val).getTime() : val; });
                        }
                        return value;
                    }
                }
            }
            return [undefined, undefined];
        };
        BsFacetRange.prototype.setRange = function (from, to) {
            var _a, _b;
            var valFrom;
            var valTo;
            var expression;
            if (this.column) {
                valFrom = i4.AppService.isDate(this.column) && base.Utils.isNumber(from) ? new Date(from) : from;
                valTo = i4.AppService.isDate(this.column) && base.Utils.isNumber(to) ? new Date(to) : to;
                if (!!valFrom && !!valTo) {
                    expression = this.exprBuilder.makeRangeExpr(this.column.name, valFrom, valTo);
                }
                else if (!!valFrom) {
                    expression = this.exprBuilder.makeNumericalExpr(this.column.name, '>=', valFrom);
                }
                else if (!!valTo) {
                    expression = this.exprBuilder.makeNumericalExpr(this.column.name, '<=', valTo);
                }
                (_a = this.searchService.query) === null || _a === void 0 ? void 0 : _a.removeSelect(this.column.name);
                if (expression) {
                    (_b = this.searchService.query) === null || _b === void 0 ? void 0 : _b.addSelect(expression, this.column.name);
                }
            }
        };
        BsFacetRange.prototype.applyRange = function () {
            this.setRange(this.roundNearest(this.value), this.roundNearest(this.highValue));
            this.searchService.search();
        };
        BsFacetRange.prototype.clearRange = function () {
            this.setRange(undefined, undefined);
            this.searchService.search();
        };
        Object.defineProperty(BsFacetRange.prototype, "actions", {
            get: function () {
                var actions = [];
                if (this.rangeSelected) {
                    actions.push(this.applyFiltersAction);
                }
                if (this.rangeActive) {
                    actions.push(this.clearFiltersAction);
                }
                return actions;
            },
            enumerable: false,
            configurable: true
        });
        return BsFacetRange;
    }(AbstractFacet));
    BsFacetRange.ɵfac = function BsFacetRange_Factory(t) { return new (t || BsFacetRange)(i0.ɵɵdirectiveInject(FacetService), i0.ɵɵdirectiveInject(i4.AppService), i0.ɵɵdirectiveInject(i2.SearchService), i0.ɵɵdirectiveInject(i4.FormatService), i0.ɵɵdirectiveInject(i4$1.IntlService), i0.ɵɵdirectiveInject(i5.UIService), i0.ɵɵdirectiveInject(i6.AdvancedService), i0.ɵɵdirectiveInject(i4.ExprBuilder)); };
    BsFacetRange.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetRange, selectors: [["sq-facet-range"]], viewQuery: function BsFacetRange_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵviewQuery(_c0$6, true);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.slider = _t.first);
            }
        }, inputs: { name: "name", results: "results", aggregation: "aggregation", min: "min", max: "max", stepDefs: "stepDefs" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "card-body"], ["slider", ""], [3, "value", "highValue", "options", "manualRefresh", "valueChange", "highValueChange", "userChangeEnd", 4, "ngIf"], [3, "value", "highValue", "options", "manualRefresh", "valueChange", "highValueChange", "userChangeEnd"]], template: function BsFacetRange_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsFacetRange_ng_container_0_Template, 5, 2, "ng-container", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.data);
            }
        }, directives: [i2$1.NgIf, i8.ɵa], pipes: [i4$1.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsFacetRange, [{
                type: i0.Component,
                args: [{
                        selector: "sq-facet-range",
                        templateUrl: "./facet-range.html"
                    }]
            }], function () { return [{ type: FacetService }, { type: i4.AppService }, { type: i2.SearchService }, { type: i4.FormatService }, { type: i4$1.IntlService }, { type: i5.UIService }, { type: i6.AdvancedService }, { type: i4.ExprBuilder }]; }, { name: [{
                    type: i0.Input
                }], results: [{
                    type: i0.Input
                }], aggregation: [{
                    type: i0.Input
                }], min: [{
                    type: i0.Input
                }], max: [{
                    type: i0.Input
                }], stepDefs: [{
                    type: i0.Input
                }], slider: [{
                    type: i0.ViewChild,
                    args: ["slider", { static: false }]
                }] });
    })();

    var _c0$7 = ["facet"];
    function BsFacetMultiComponent_div_0_div_1_span_4_Template(rf, ctx) {
        if (rf & 1) {
            var _r8_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "span", 9);
            i0.ɵɵlistener("click", function BsFacetMultiComponent_div_0_div_1_span_4_Template_span_click_0_listener($event) { i0.ɵɵrestoreView(_r8_1); var facet_r3 = i0.ɵɵnextContext().$implicit; var ctx_r6 = i0.ɵɵnextContext(2); return ctx_r6.clearFacetFilters(facet_r3, $event); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelement(2, "i", 10);
            i0.ɵɵelement(3, "i", 11);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵpropertyInterpolate("sqTooltip", i0.ɵɵpipeBind1(1, 1, "msg#facet.filters.clear"));
        }
    }
    var _c1$5 = function (a0) { return { count: a0 }; };
    var _c2$4 = function (a0) { return { values: a0 }; };
    function BsFacetMultiComponent_div_0_div_1_span_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 12);
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "sqNumber");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var facet_r3 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind2(1, 2, "msg#facet.filterItemCountTooltip", i0.ɵɵpureFunction1(9, _c2$4, i0.ɵɵpureFunction1(7, _c1$5, facet_r3.$count))));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 5, facet_r3.$count), " ");
        }
    }
    var _c3$3 = function (a0, a1) { return { "list-group-item-success": a0, "disabled": a1 }; };
    function BsFacetMultiComponent_div_0_div_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r11_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 4);
            i0.ɵɵlistener("click", function BsFacetMultiComponent_div_0_div_1_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r11_1); var facet_r3 = ctx.$implicit; var ctx_r10 = i0.ɵɵnextContext(2); return ctx_r10.openFacet(facet_r3); });
            i0.ɵɵelementStart(1, "span", 5);
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(4, BsFacetMultiComponent_div_0_div_1_span_4_Template, 4, 3, "span", 6);
            i0.ɵɵtemplate(5, BsFacetMultiComponent_div_0_div_1_span_5_Template, 4, 11, "span", 7);
            i0.ɵɵelement(6, "i", 8);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var facet_r3 = ctx.$implicit;
            var ctx_r2 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(6, _c3$3, facet_r3.$hasFiltered, !facet_r3.$hasData));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 4, facet_r3.title));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", facet_r3.$hasFiltered);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r2.showCount);
        }
    }
    function BsFacetMultiComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 2);
            i0.ɵɵtemplate(1, BsFacetMultiComponent_div_0_div_1_Template, 7, 9, "div", 3);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r0.facets);
        }
    }
    function BsFacetMultiComponent_ng_container_1_sq_facet_list_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "sq-facet-list", 15, 16);
        }
        if (rf & 2) {
            var ctx_r12 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("name", ctx_r12.openedFacet.name)("results", ctx_r12.results)("aggregation", ctx_r12.openedFacet.aggregation)("showCount", ctx_r12.openedFacet.showCount)("searchable", ctx_r12.openedFacet.searchable)("allowExclude", ctx_r12.openedFacet.allowExclude)("allowOr", ctx_r12.openedFacet.allowOr)("allowAnd", ctx_r12.openedFacet.allowAnd)("displayEmptyDistributionIntervals", ctx_r12.openedFacet.displayEmptyDistributionIntervals)("showProgressBar", ctx_r12.showProgressBar);
        }
    }
    function BsFacetMultiComponent_ng_container_1_sq_facet_tree_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "sq-facet-tree", 17, 16);
        }
        if (rf & 2) {
            var ctx_r13 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("name", ctx_r13.openedFacet.name)("results", ctx_r13.results)("aggregation", ctx_r13.openedFacet.aggregation)("showCount", ctx_r13.openedFacet.showCount)("allowExclude", ctx_r13.openedFacet.allowExclude)("allowOr", ctx_r13.openedFacet.allowOr);
        }
    }
    function BsFacetMultiComponent_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsFacetMultiComponent_ng_container_1_sq_facet_list_1_Template, 2, 10, "sq-facet-list", 13);
            i0.ɵɵtemplate(2, BsFacetMultiComponent_ng_container_1_sq_facet_tree_2_Template, 2, 6, "sq-facet-tree", 14);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r1.openedFacet.type === "list");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r1.openedFacet.type === "tree");
        }
    }
    var BsFacetMultiComponent = /** @class */ (function (_super) {
        __extends(BsFacetMultiComponent, _super);
        function BsFacetMultiComponent(facetService, changeDetectorRef) {
            var _this = _super.call(this) || this;
            _this.facetService = facetService;
            _this.changeDetectorRef = changeDetectorRef;
            _this.showCount = true;
            _this.showProgressBar = false; // will display or not item count as progress bar
            _this.events = new i0.EventEmitter();
            _this.backAction = new i3$1.Action({
                name: "back",
                icon: "fas fa-arrow-left",
                title: "msg#facet.filters.back",
                action: function () {
                    _this.openedFacet = undefined;
                    _this.events.next(undefined);
                    _this.changeDetectorRef.detectChanges();
                }
            });
            _this.clearAllFiltersAction = new i3$1.Action({
                icon: "far fa-minus-square",
                title: "msg#facet.filters.clear",
                action: function () {
                    var facetsWithFiltered = _this.facets.filter(function (facet) { return facet.$hasFiltered; }).map(function (facet) { return facet.name; });
                    _this.facetService.clearFiltersSearch(facetsWithFiltered, true);
                }
            });
            return _this;
        }
        Object.defineProperty(BsFacetMultiComponent.prototype, "actions", {
            /**
             * If a sub-facet is opened, add a Back button and forward
             * the actions of the facet.
             */
            get: function () {
                var actions = [];
                if (this.openedFacet) {
                    actions.push(this.backAction);
                }
                else {
                    var hasFiltered = this.facets.some(function (facet) { return facet.$hasFiltered; });
                    if (hasFiltered)
                        actions.push(this.clearAllFiltersAction);
                }
                if (this.facetComponent) {
                    actions.push.apply(actions, __spread(this.facetActions));
                }
                return actions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsFacetMultiComponent.prototype, "facetActions", {
            /**
             * Return the actions of the child facet
             */
            get: function () {
                if (this.facetComponent) {
                    return this.facetComponent.actions;
                }
                return [];
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Open this sub facet
         * @param facet
         */
        BsFacetMultiComponent.prototype.openFacet = function (facet) {
            this.openedFacet = facet;
            this.events.next(facet);
            this.changeDetectorRef.detectChanges();
        };
        BsFacetMultiComponent.prototype.clearFacetFilters = function (facet, e) {
            e.stopPropagation();
            this.facetService.clearFiltersSearch(facet.name, true);
            return false;
        };
        /**
         * Return the number of items to display for a given facet
         * @param facet
         */
        BsFacetMultiComponent.prototype.getFacetCount = function (facet) {
            var agg = this.results.aggregations.find(function (agg) { return base.Utils.eqNC(agg.name, facet.aggregation); }); // avoid calling getAggregation() which is costly for trees
            if (!(agg === null || agg === void 0 ? void 0 : agg.items))
                return "";
            var count = this.facetService.getAggregationCount(facet.aggregation); // configured count (default: 10)
            var aggItemCounter = (!agg.isDistribution || facet.displayEmptyDistributionIntervals)
                ? agg.items.length
                : agg.items.filter(function (item) { return item.count > 0; }).length;
            return aggItemCounter >= count ? count + "+" : "" + aggItemCounter;
        };
        /**
         * Return whether a given facet has been used in the current context
         * @param facet
         */
        BsFacetMultiComponent.prototype.hasFiltered = function (facet) {
            return this.facetService.hasFiltered(facet.name);
        };
        /**
         * When the results change, actualize count, hasData and hasFiltered
         * which are displayed in the template.
         */
        BsFacetMultiComponent.prototype.ngOnChanges = function () {
            var _this = this;
            this.facets.forEach(function (facet) {
                facet.$count = _this.getFacetCount(facet);
                facet.$hasData = _this.facetService.hasData(facet.aggregation, _this.results);
                facet.$hasFiltered = _this.hasFiltered(facet);
            });
            this.changeDetectorRef.detectChanges();
        };
        return BsFacetMultiComponent;
    }(AbstractFacet));
    BsFacetMultiComponent.ɵfac = function BsFacetMultiComponent_Factory(t) { return new (t || BsFacetMultiComponent)(i0.ɵɵdirectiveInject(FacetService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    BsFacetMultiComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetMultiComponent, selectors: [["sq-facet-multi"]], viewQuery: function BsFacetMultiComponent_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵviewQuery(_c0$7, true);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.facetComponent = _t.first);
            }
        }, inputs: { results: "results", facets: "facets", showCount: "showCount", showProgressBar: "showProgressBar" }, outputs: { events: "events" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 2, vars: 2, consts: [["class", "list-group list-group-flush", 4, "ngIf"], [4, "ngIf"], [1, "list-group", "list-group-flush"], ["class", "open-facet d-flex flex-row list-group-item border-0 list-group-item-action px-3 py-1 align-items-center", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "open-facet", "d-flex", "flex-row", "list-group-item", "border-0", "list-group-item-action", "px-3", "py-1", "align-items-center", 3, "ngClass", "click"], [1, "flex-grow-1"], ["class", "fa-stack icons-group", 3, "sqTooltip", "click", 4, "ngIf"], ["class", "mx-2 text-muted small", 3, "title", 4, "ngIf"], [1, "fas", "fa-caret-right"], [1, "fa-stack", "icons-group", 3, "sqTooltip", "click"], [1, "ml-2", "far", "fa-minus-square", "fa-stack-1x", "icons", "icon-hover"], [1, "ml-2", "far", "fa-check-square", "fa-stack-1x", "icons", "icon-default"], [1, "mx-2", "text-muted", "small", 3, "title"], [3, "name", "results", "aggregation", "showCount", "searchable", "allowExclude", "allowOr", "allowAnd", "displayEmptyDistributionIntervals", "showProgressBar", 4, "ngIf"], [3, "name", "results", "aggregation", "showCount", "allowExclude", "allowOr", 4, "ngIf"], [3, "name", "results", "aggregation", "showCount", "searchable", "allowExclude", "allowOr", "allowAnd", "displayEmptyDistributionIntervals", "showProgressBar"], ["facet", ""], [3, "name", "results", "aggregation", "showCount", "allowExclude", "allowOr"]], template: function BsFacetMultiComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsFacetMultiComponent_div_0_Template, 2, 1, "div", 0);
                i0.ɵɵtemplate(1, BsFacetMultiComponent_ng_container_1_Template, 3, 2, "ng-container", 1);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !ctx.openedFacet);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.openedFacet);
            }
        }, directives: [i2$1.NgIf, i2$1.NgForOf, i2$1.NgClass, i5.TooltipDirective, BsFacetList, BsFacetTree], pipes: [i4$1.MessagePipe, i5.NumberPipe], styles: [".open-facet[_ngcontent-%COMP%]{cursor:pointer}.list-group-item.disabled[_ngcontent-%COMP%]{color:#d3d3d3}.icons-group[_ngcontent-%COMP%]{cursor:pointer}.icons-group[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]{transition:opacity .3s,transform .3s}.icons-group[_ngcontent-%COMP%]   .icons.icon-hover[_ngcontent-%COMP%]{opacity:0;transform:rotate(-180deg)}.icons-group[_ngcontent-%COMP%]:hover   .icon-default[_ngcontent-%COMP%]{opacity:0;transform:rotate(180deg)}.icons-group[_ngcontent-%COMP%]:hover   .icon-hover[_ngcontent-%COMP%]{opacity:1;transform:rotate(0deg)}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsFacetMultiComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-facet-multi',
                        templateUrl: './facet-multi.component.html',
                        styleUrls: ['./facet-multi.component.scss']
                    }]
            }], function () { return [{ type: FacetService }, { type: i0.ChangeDetectorRef }]; }, { results: [{
                    type: i0.Input
                }], facets: [{
                    type: i0.Input
                }], showCount: [{
                    type: i0.Input
                }], showProgressBar: [{
                    type: i0.Input
                }], events: [{
                    type: i0.Output
                }], facetComponent: [{
                    type: i0.ViewChild,
                    args: ["facet", { static: false }]
                }] });
    })();

    function BsFacetTagCloud_li_1_i_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "i", 4);
        }
    }
    function BsFacetTagCloud_li_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r4_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "li");
            i0.ɵɵelementStart(1, "a", 2);
            i0.ɵɵlistener("click", function BsFacetTagCloud_li_1_Template_a_click_1_listener($event) { i0.ɵɵrestoreView(_r4_1); var data_r1 = ctx.$implicit; var ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.filterItem(data_r1, $event); });
            i0.ɵɵtemplate(2, BsFacetTagCloud_li_1_i_2_Template, 1, 0, "i", 3);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqValue");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var data_r1 = ctx.$implicit;
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵclassMapInterpolate1("sq-metadata-color-", data_r1.aggregation.column, "");
            i0.ɵɵattribute("data-count", data_r1.item.count)("data-weight", ctx_r0.proportionalWeight ? data_r1.weight : null);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", data_r1.item.$filtered);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(4, 7, data_r1.item, data_r1.item.$column), " ");
        }
    }
    var BsFacetTagCloud = /** @class */ (function (_super) {
        __extends(BsFacetTagCloud, _super);
        function BsFacetTagCloud(facetService) {
            var _this = _super.call(this) || this;
            _this.facetService = facetService;
            /** maximum number of data to be displayed in tag-cloud */
            _this.limit = 50;
            /** the way data are collected from given aggregations: equal repartition between them or most relevant among all of them */
            _this.uniformRepartition = false;
            /** show/hide number of occurrences of each item*/
            _this.showCount = false;
            /** define the size of each displayed item: common size for all or proportional size based on their count */
            _this.proportionalWeight = true;
            /** lowest count under which items will not be taken into account in tag-cloud data */
            _this.countThreshold = 0;
            /** wether data are rendered following their count sorting or randomly */
            _this.shuffleData = false;
            /** Isolate filtering results from other facets available in the app */
            _this.isolateFacetFilters = false;
            _this.aggregationsData = [];
            _this.tagCloudData = [];
            _this.filtered = [];
            // Default weight to be applied if proportionalWeight = false
            _this.defaultWeight = 2;
            // Prefix for tag-cloud facet name to be used if isolateFacetFilters = true
            _this.tagCloudFacetPrefix = "tag-cloud_";
            // Clear the current filters
            _this.clearFilters = new i3$1.Action({
                icon: "far fa-minus-square",
                title: "msg#facet.clearSelects",
                action: function () {
                    var e_1, _a;
                    if (base.Utils.isArray(_this.aggregations)) {
                        try {
                            for (var _b = __values(_this.aggregations), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var aggregation = _c.value;
                                _this.facetService.clearFiltersSearch(_this.getName(aggregation), true);
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
                    else {
                        _this.facetService.clearFiltersSearch(_this.getName(_this.aggregations), true);
                    }
                },
            });
            return _this;
        }
        BsFacetTagCloud.prototype.ngOnChanges = function (changes) {
            if (!!changes["results"]) {
                /* reset filtered items */
                this.filtered = [];
                /* update tag-cloud data */
                this.tagCloudData = this.getTagCloudData();
            }
        };
        /**
         * Defines the tag-cloud data according to given inputs
         */
        BsFacetTagCloud.prototype.getTagCloudData = function () {
            var _this = this;
            var aggregationsData = this.getAggregationsData();
            if (aggregationsData.length === 0) {
                return [];
            }
            else {
                var tmp_1 = [];
                if (this.uniformRepartition) {
                    aggregationsData.forEach(function (data) {
                        var end = Math.floor(_this.limit / aggregationsData.length);
                        // Firstly, take filtered items
                        tmp_1.push.apply(tmp_1, __spread(data
                            .items.filter(function (item) { return item.$filtered; })
                            .sort(function (a, b) { return b.count - a.count; })
                            .slice(0, end)
                            .map(function (item) { return ({
                            aggregation: data,
                            item: item,
                            weight: _this.proportionalWeight
                                ? item.count
                                : _this.defaultWeight,
                        }); })));
                        // add most relevant items if threshold not attenuated
                        if (tmp_1.length < end) {
                            tmp_1.push.apply(tmp_1, __spread(data
                                .items.filter(function (item) { return item.count > _this.countThreshold && !item.$filtered; })
                                .sort(function (a, b) { return b.count - a.count; })
                                .slice(0, end - tmp_1.length)
                                .map(function (item) { return ({
                                aggregation: data,
                                item: item,
                                weight: _this.proportionalWeight
                                    ? item.count
                                    : _this.defaultWeight,
                            }); })));
                        }
                    });
                    tmp_1 = tmp_1.sort(function (a, b) { return b.item.count - a.item.count; });
                }
                else {
                    aggregationsData.forEach(function (data) {
                        tmp_1.push.apply(tmp_1, __spread(data
                            .items.filter(function (item) { return item.count > _this.countThreshold || item.$filtered; })
                            .map(function (item) { return ({
                            aggregation: data,
                            item: item,
                            weight: _this.proportionalWeight
                                ? item.count
                                : _this.defaultWeight,
                        }); })));
                    });
                    var filtered = tmp_1.filter(function (elem) { return elem.item.$filtered; });
                    if (filtered.length < this.limit) {
                        var notFiltered = tmp_1
                            .filter(function (elem) { return !elem.item.$filtered; })
                            .sort(function (a, b) { return b.item.count - a.item.count; });
                        tmp_1 = __spread(filtered);
                        tmp_1.push.apply(tmp_1, __spread(notFiltered.slice(0, this.limit - filtered.length)));
                    }
                    else {
                        tmp_1 = filtered.slice(0, this.limit);
                    }
                }
                // By default, sort the whole array with respect to its counts and update its elements weight value
                tmp_1 = tmp_1
                    .sort(function (a, b) { return b.item.count - a.item.count; })
                    .map(function (elem) { return (Object.assign(Object.assign({}, elem), { weight: _this.proportionalWeight
                        ? _this.scaleItemWeight(tmp_1, elem.item.count)
                        : _this.defaultWeight })); });
                // Shuffle the array
                if (this.shuffleData) {
                    tmp_1 = this.shuffle(tmp_1);
                }
                return tmp_1;
            }
        };
        /**
         * Invoked on click on an item in order to update the query
         * @param tagCloudItem
         * @param event
         */
        BsFacetTagCloud.prototype.filterItem = function (tagCloudItem, event) {
            var name = this.getName(tagCloudItem.aggregation.name);
            var aggregation = tagCloudItem.aggregation;
            var item = tagCloudItem.item;
            if (!this.isFiltered(aggregation, item)) {
                this.facetService.addFilterSearch(name, aggregation, item);
            }
            else {
                this.facetService.removeFilterSearch(name, aggregation, item);
            }
            event.preventDefault();
        };
        Object.defineProperty(BsFacetTagCloud.prototype, "actions", {
            /**
             * Define the possible actions according to the actual context
             */
            get: function () {
                var actions = [];
                if (this.isFiltering()) {
                    actions.push(this.clearFilters);
                }
                return actions;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Map the initial aggregations names to a list of Aggregation
         */
        BsFacetTagCloud.prototype.getAggregationsData = function () {
            var _this = this;
            return []
                .concat(this.aggregations)
                .filter(function (agg) { return _this.facetService.hasData(agg, _this.results); })
                .map(function (agg) { return _this.facetService.getAggregation(agg, _this.results); })
                .map(function (data) { return _this.refreshFiltered(data); });
        };
        /**
         * Update aggregation's data with respect to active filters in the query & breadcrumbs
         * @param data
         */
        BsFacetTagCloud.prototype.refreshFiltered = function (data) {
            var _this = this;
            var facetName = this.getName(data.name);
            if (this.facetService.hasFiltered(facetName)) {
                // refresh filters from breadcrumbs
                var items = this.facetService.getAggregationItemsFiltered(facetName, data.valuesAreExpressions);
                items.forEach(function (item) {
                    if (!_this.isFiltered(data, item)) {
                        item.$filtered = true;
                        _this.filtered.push(item);
                    }
                });
                // double check filters from query and breadcrumb
                data.items.forEach(function (item) {
                    var indx = _this.facetService.filteredIndex(data, _this.filtered, item);
                    if (_this.facetService.itemFiltered(facetName, data, item)) {
                        item.$filtered = true;
                        if (!_this.isFiltered(data, item)) {
                            _this.filtered.push(item);
                        }
                    }
                    else if (indx !== -1) {
                        // sometime facetService.itemFiltered() could returns false but item is present in breadcrumbs
                        item.$filtered = true;
                    }
                });
            }
            return data;
        };
        /**
         * Returns facets names to be used according to @input() isolateFacetFilters
         * @param aggregationName
         */
        BsFacetTagCloud.prototype.getName = function (aggregationName) {
            if (!this.isolateFacetFilters) {
                return aggregationName;
            }
            return this.tagCloudFacetPrefix + aggregationName;
        };
        /**
         * Linearly map the original weight to a discrete scale from 1 to 10
         * @param weight original weight
         */
        BsFacetTagCloud.prototype.scaleItemWeight = function (tagCloudData, weight) {
            return (Math.round(((weight - tagCloudData[tagCloudData.length - 1].weight) /
                (tagCloudData[0].weight -
                    tagCloudData[tagCloudData.length - 1].weight)) *
                9.0) + 1);
        };
        /**
         * Returns true if the supplied item within the given aggregation is filtering the query
         * @param data
         * @param item
         */
        BsFacetTagCloud.prototype.isFiltered = function (data, item) {
            return this.facetService.filteredIndex(data, this.filtered, item) !== -1;
        };
        /**
         * Shuffle items of the supplied array
         * @param arr
         */
        BsFacetTagCloud.prototype.shuffle = function (arr) {
            for (var i = arr.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * i);
                var aux = arr[i];
                arr[i] = arr[j];
                arr[j] = aux;
            }
            return arr;
        };
        /**
         * Returns true if there is at least one active filter in the tag-cloud facet
         */
        BsFacetTagCloud.prototype.isFiltering = function () {
            var _this = this;
            return []
                .concat(this.aggregations)
                .some(function (aggregationName) { return _this.facetService.hasFiltered(_this.getName(aggregationName)); });
        };
        return BsFacetTagCloud;
    }(AbstractFacet));
    BsFacetTagCloud.ɵfac = function BsFacetTagCloud_Factory(t) { return new (t || BsFacetTagCloud)(i0.ɵɵdirectiveInject(FacetService)); };
    BsFacetTagCloud.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetTagCloud, selectors: [["sq-facet-tag-cloud"]], inputs: { results: "results", aggregations: "aggregations", limit: "limit", uniformRepartition: "uniformRepartition", showCount: "showCount", proportionalWeight: "proportionalWeight", countThreshold: "countThreshold", shuffleData: "shuffleData", isolateFacetFilters: "isolateFacetFilters" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 2, vars: 2, consts: [[1, "cloud"], [4, "ngFor", "ngForOf"], ["href", "#", 3, "click"], ["class", "far fa-check-circle filtered", 4, "ngIf"], [1, "far", "fa-check-circle", "filtered"]], template: function BsFacetTagCloud_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "ul", 0);
                i0.ɵɵtemplate(1, BsFacetTagCloud_li_1_Template, 5, 10, "li", 1);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵattribute("data-show-count", ctx.showCount ? "" : null);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", ctx.tagCloudData);
            }
        }, directives: [i2$1.NgForOf, i2$1.NgIf], pipes: [i5.ValuePipe], styles: ["ul.cloud[_ngcontent-%COMP%]{align-items:center;display:flex;flex-wrap:wrap;justify-content:center;list-style:none;overflow-wrap:anywhere;padding-left:0}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"1\"][_ngcontent-%COMP%]{--size:1}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"2\"][_ngcontent-%COMP%]{--size:2}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"3\"][_ngcontent-%COMP%]{--size:3}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"4\"][_ngcontent-%COMP%]{--size:4}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"5\"][_ngcontent-%COMP%]{--size:5}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"6\"][_ngcontent-%COMP%]{--size:6}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"7\"][_ngcontent-%COMP%]{--size:7}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"8\"][_ngcontent-%COMP%]{--size:8}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"9\"][_ngcontent-%COMP%]{--size:9}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"10\"][_ngcontent-%COMP%]{--size:10}ul.cloud[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{--color:#a33;--size:2;color:var(--color);display:block;font-size:calc(var(--size)*0.25rem + .5rem);padding:.125rem .25rem;position:relative;text-decoration:none}ul[data-show-count][_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:after{content:\" (\" attr(data-count) \")\";font-size:calc(var(--size)*0.125rem + .5rem)}ul.cloud[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:before{background:rgba(0,0,0,.03);content:\"\";height:100%;left:50%;position:absolute;top:0;transform:translate(-50%);transition:width .25s;width:0}ul.cloud[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus:before, ul.cloud[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover:before{width:100%}.filtered[_ngcontent-%COMP%]{font-size:calc(var(--size)*0.125rem + .5rem)}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsFacetTagCloud, [{
                type: i0.Component,
                args: [{
                        selector: "sq-facet-tag-cloud",
                        templateUrl: "./facet-tag-cloud.html",
                        styleUrls: ["./facet-tag-cloud.scss"],
                    }]
            }], function () { return [{ type: FacetService }]; }, { results: [{
                    type: i0.Input
                }], aggregations: [{
                    type: i0.Input
                }], limit: [{
                    type: i0.Input
                }], uniformRepartition: [{
                    type: i0.Input
                }], showCount: [{
                    type: i0.Input
                }], proportionalWeight: [{
                    type: i0.Input
                }], countThreshold: [{
                    type: i0.Input
                }], shuffleData: [{
                    type: i0.Input
                }], isolateFacetFilters: [{
                    type: i0.Input
                }] });
    })();

    var BsFacetModule = /** @class */ (function () {
        function BsFacetModule() {
        }
        BsFacetModule.forRoot = function (allFacets, defaultFacets) {
            if (allFacets === void 0) { allFacets = undefined; }
            if (defaultFacets === void 0) { defaultFacets = undefined; }
            return {
                ngModule: BsFacetModule,
                providers: [
                    {
                        provide: ALL_FACETS,
                        useValue: allFacets
                    },
                    {
                        provide: DEFAULT_FACETS,
                        useValue: defaultFacets
                    },
                ]
            };
        };
        return BsFacetModule;
    }());
    BsFacetModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsFacetModule });
    BsFacetModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsFacetModule_Factory(t) { return new (t || BsFacetModule)(); }, imports: [[
                i2$1.CommonModule,
                i4$2.FormsModule,
                i4$2.ReactiveFormsModule,
                i4$1.IntlModule,
                i5.UtilsModule,
                i3$2.CollapseModule,
                i3$1.BsActionModule,
                i2.BsSearchModule,
                i3.BsAutocompleteModule,
                i8.Ng5SliderModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsFacetModule, { declarations: [BsFacetCard, BsFacetList, BsFacetTree,
                BsFacetFilters,
                BsRefine,
                BsFacetRange, BsMySearch, BsFacetBar,
                BsFacetMultiComponent,
                BsFacetTagCloud], imports: [i2$1.CommonModule,
                i4$2.FormsModule,
                i4$2.ReactiveFormsModule,
                i4$1.IntlModule,
                i5.UtilsModule,
                i3$2.CollapseModule,
                i3$1.BsActionModule,
                i2.BsSearchModule,
                i3.BsAutocompleteModule,
                i8.Ng5SliderModule], exports: [BsFacetCard, BsFacetList, BsFacetTree,
                BsFacetFilters,
                BsRefine,
                BsFacetRange, BsMySearch, BsFacetBar,
                BsFacetMultiComponent,
                BsFacetTagCloud] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsFacetModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i2$1.CommonModule,
                            i4$2.FormsModule,
                            i4$2.ReactiveFormsModule,
                            i4$1.IntlModule,
                            i5.UtilsModule,
                            i3$2.CollapseModule,
                            i3$1.BsActionModule,
                            i2.BsSearchModule,
                            i3.BsAutocompleteModule,
                            i8.Ng5SliderModule
                        ],
                        declarations: [
                            BsFacetCard, BsFacetList, BsFacetTree,
                            BsFacetFilters,
                            BsRefine,
                            BsFacetRange, BsMySearch, BsFacetBar,
                            BsFacetMultiComponent,
                            BsFacetTagCloud
                        ],
                        exports: [
                            BsFacetCard, BsFacetList, BsFacetTree,
                            BsFacetFilters,
                            BsRefine,
                            BsFacetRange, BsMySearch, BsFacetBar,
                            BsFacetMultiComponent,
                            BsFacetTagCloud
                        ],
                    }]
            }], null, null);
    })();

    var _enFacet = {
        "facet": {
            "showFacetTextView": "Show text",
            "showFacetChartView": "Show chart",
            "itemExclude": "Exclude",
            "applyFilters": "{selections, plural, one {Apply filter} other {Apply filters}}",
            "clearFilters": "{selected, plural, one {Clear filter} other {Clear filters}}",
            "loadMore": "Load more",
            "showMore": "Show more",
            "showLess": "Show less",
            "displayed": "Displayed",
            "removeAll": "Remove all",
            "searchPlaceholder": "Search...",
            "itemSelect": "Select this value",
            "itemUnselect": "Unselect this value",
            "filterItem": "Keep documents with {terme}",
            "filterItems": "Keep documents with ANY of the selected items",
            "filterItemsAnd": "Keep documents with ALL the selected items",
            "excludeItems": "Exclude document with selected items",
            "clearSelects": "Clear the current filters",
            "searchItems": "Search for a value in this list",
            "searchNoResult": "No results",
            "openItem": "Open",
            "closeItem": "Close",
            "authors": {
                "title": "Authors"
            },
            "concepts": {
                "title": "Concepts"
            },
            "company": {
                "title": "Companies"
            },
            "docformat": {
                "title": "Formats"
            },
            "doctype": {
                "title": "Document Types"
            },
            "documentlanguages": {
                "title": "Languages"
            },
            "fileext": {
                "title": "File Extensions"
            },
            "filename": {
                "title": "Filenames"
            },
            "geo": {
                "title": "Places"
            },
            "matchingpartnames": {
                "title": "Matching Partnames"
            },
            "modified": {
                "title": "Dates"
            },
            "person": {
                "title": "People"
            },
            "refine": {
                "title": "Refine Search",
                "input": {
                    "label": "Refine",
                    "buttonTitle": "Refine",
                    "placeholder": "Refine by..."
                }
            },
            "size": {
                "title": "Sizes"
            },
            "tagcloud": {
                "title": "Tag Cloud"
            },
            "title": {
                "title": "Titles"
            },
            "treepath": {
                "title": "Sources"
            },
            "recentQueries": {
                "title": "Recent queries"
            },
            "recentQueriesPublic": {
                "title": "Public recent queries"
            },
            "mySearch": {
                "title": "My Search",
                "itemRemove": "Remove"
            },
            "search": {
                "label": "Search",
                "buttonTitle": "Search",
                "placeholder": "Search...",
                "showSearchForm": "Show search form",
                "hideSearchForm": "Hide search form"
            },
            "range": {
                "year": "{date, date, sqYear}",
                "monthYear": "{date, date, sqMonthYear}",
                "weekYear": "W{week, number, sqWeek} {weekYear, number, sqYear}",
                "apply": "Apply",
                "clear": "Clear",
                "unavailable": "No available range"
            },
            "filters": {
                "add": "Add facet",
                "addAll": "Add all facets",
                "remove": "Remove facet",
                "removeAll": "Remove all facets",
                "clear": "Clear filter",
                "moreFilters": "",
                "showFilters": "Show filters",
                "hideFilters": "Hide filters",
                "back": "Back to filters",
                "selectedFilters": "This filter is active in the current query",
                "customizeFacets": "Select facets to display or hide"
            },
            "selectedValue": "This value is selected in the current query",
            "previous": "Previous",
            "next": "Next",
            "filterItemCountTooltip": "{count} possible values for this filter",
        },
        "facetCard": {
            "expand": "Expand",
            "collapse": "Collapse",
            "enlarge": "Enlarge",
            "reduce": "Reduce",
            "openSettings": "Open settings",
            "saveSettings": "Save settings"
        }
    };

    var _frFacet = {
        "facet": {
            "showFacetTextView": "Afficher le texte",
            "showFacetChartView": "Afficher le graphique",
            "itemExclude": "Exclure",
            "applyFilters": "{selections, plural, one {Appliquer le filtre} other {Appliquer les filtres}}",
            "clearFilters": "{selected, plural, one {Effacer le filtre} other {Effacer les filtres}}",
            "loadMore": "Charger plus",
            "showMore": "Afficher plus",
            "showLess": "Afficher moins",
            "displayed": "Affiché",
            "removeAll": "Supprimer tout",
            "searchPlaceholder": "Rechercher...",
            "itemSelect": "Sélectionner cette valeur",
            "itemUnselect": "Désélectionner cette valeur",
            "filterItem": "Garder les documents qui contiennent {terme}",
            "filterItems": "Garder les documents qui contiennent n'importe lequel de ces termes",
            "filterItemsAnd": "Garder les documents qui contiennent tous ces termes",
            "excludeItems": "Exclure les documents contenant un de ces termes",
            "clearSelects": "Enlever les filtres",
            "searchItems": "Rechercher une valeur dans cette liste",
            "searchNoResult": "Pas de résultat",
            "openItem": "Ouvrir",
            "closeItem": "Refermer",
            "authors": {
                "title": "Auteurs"
            },
            "concepts": {
                "title": "Concepts"
            },
            "company": {
                "title": "Sociétés"
            },
            "docformat": {
                "title": "Formats"
            },
            "doctype": {
                "title": "Types de document"
            },
            "documentlanguages": {
                "title": "Langues"
            },
            "fileext": {
                "title": "Extensions de fichiers"
            },
            "filename": {
                "title": "Noms de fichiers"
            },
            "geo": {
                "title": "Lieux"
            },
            "matchingpartnames": {
                "title": "Partnames"
            },
            "modified": {
                "title": "Dates"
            },
            "person": {
                "title": "Personnes"
            },
            "refine": {
                "title": "Affiner la recherche",
                "input": {
                    "label": "Affiner",
                    "buttonTitle": "Affiner",
                    "placeholder": "Affiner par ..."
                }
            },
            "size": {
                "title": "Tailles"
            },
            "tagcloud": {
                "title": "Nuage de mots"
            },
            "title": {
                "title": "Titres"
            },
            "treepath": {
                "title": "Sources"
            },
            "recentQueries": {
                "title": "Requêtes récentes"
            },
            "recentQueriesPublic": {
                "title": "Requêtes publiques récentes"
            },
            "mySearch": {
                "title": "Ma recherche",
                "itemRemove": "Supprimer"
            },
            "search": {
                "label": "Rechercher",
                "buttonTitle": "Rechercher",
                "placeholder": "Rechercher ...",
                "showSearchForm": "Afficher le formulaire de recherche",
                "hideSearchForm": "Masquer le formulaire de recherche"
            },
            "range": {
                "year": "{date, date, sqYear}",
                "monthYear": "{date, date, sqMonthYear}",
                "weekYear": "s{week, number, sqWeek} {weekYear, number, sqYear}",
                "apply": "Appliquer",
                "clear": "Effacer",
                "unavailable": "Aucune plage disponible"
            },
            "filters": {
                "add": "Ajouter la facette",
                "addAll": "Ajouter toutes les facettes",
                "remove": "Retirer la facette",
                "removeAll": "Retirer toutes les facettes",
                "clear": "Réinitialiser",
                "moreFilters": "",
                "showFilters": "Montrer les filtres",
                "hideFilters": "Cacher les filtres",
                "back": "Retour aux filtres",
                "selectedFilters": "Ce filtre est utilisé dans la recherche actuelle",
                "customizeFacets": "Sélectionnez les facettes à montrer ou cacher"
            },
            "selectedValue": "Cette valeur est sélectionnée dans la recherche actuelle",
            "previous": "Précédent",
            "next": "Suivant",
            "filterItemCountTooltip": "{count} valeurs possibles pour ce filtre",
        },
        "facetCard": {
            "expand": "Déplier",
            "collapse": "Replier",
            "enlarge": "Agrandir",
            "reduce": "Réduire",
            "openSettings": "Ouvrir les paramètres",
            "saveSettings": "Enregistrer les paramètres"
        }
    };

    var _deFacet = {
        "facet": {
            "show_text_view": "Text anzeigen",
            "show_chart_view": "Chart anzeigen",
            "itemExclude": "Exkludieren",
            "applyFilters": "{selections, plural, one {Filter anwenden} other {Filter anwenden}}",
            "clearFilters": "{selected, plural, one {Filter löschen} other {Filter löschen}}",
            "loadMore": "Mehr laden",
            "showMore": "Mehr anzeigen",
            "showLess": "Weniger anzeigen",
            "displayed": "Angezeigt",
            "removeAll": "Alle entfernen",
            "searchPlaceholder": "Suche...",
            "itemSelect": "Diesen Wert auswählen",
            "filterItems": "Behalte Dokumente mit MINDESTENS EINEM der ausgewählten Werte",
            "filterItemsAnd": "Behalte Dokumente mit ALLEN ausgewählten Werten",
            "excludeItems": "Exckludiere Dokumente mit den ausgewählten Werten",
            "clearSelects": "Entferne die aktuellen Filter",
            "searchItems": "Suche nach eniem Wert in dieser Liste",
            "searchNoResult": "Keine Ergebnisse",
            "openItem": "Öffnen",
            "closeItem": "Schließen",
            "authors": {
                "title": "Autoren"
            },
            "concepts": {
                "title": "Konzepte"
            },
            "company": {
                "title": "Firmen"
            },
            "docformat": {
                "title": "Formate"
            },
            "doctype": {
                "title": "Dokumenttypen"
            },
            "documentlanguages": {
                "title": "Sprachen"
            },
            "fileext": {
                "title": "Dateierweiterungen"
            },
            "filename": {
                "title": "Dateinamen"
            },
            "geo": {
                "title": "Orte"
            },
            "matchingpartnames": {
                "title": "Übereinstimmende Partnames"
            },
            "modified": {
                "title": "Datumsangaben"
            },
            "person": {
                "title": "Personen"
            },
            "refine": {
                "title": "Suche verfeinern",
                "input": {
                    "label": "Verfeinern",
                    "buttonTitle": "Verfeinern",
                    "placeholder": "Verfeinern nach..."
                }
            },
            "size": {
                "title": "Größen"
            },
            "tagcloud": {
                "title": "Wortwolke"
            },
            "title": {
                "title": "Titel"
            },
            "treepath": {
                "title": "Quellen"
            },
            "recentQueries": {
                "title": "Kürzliche Suchanfragen"
            },
            "recentQueriesPublic": {
                "title": "Kürzliche öffentliche Suchanfragen"
            },
            "mySearch": {
                "title": "Meine Suche",
                "itemRemove": "Entfernen"
            },
            "search": {
                "label": "Suche",
                "buttonTitle": "Suche",
                "placeholder": "Suche...",
                "showSearchForm": "Suchmaske einblenden",
                "hideSearchForm": "Suchmaske ausblenden"
            },
            "range": {
                "year": "{date, date, sqYear}",
                "monthYear": "{date, date, sqMonthYear}",
                "weekYear": "W{week, number, sqWeek} {weekYear, number, sqYear}",
                "apply": "Anwenden",
                "clear": "Löschen",
                "unavailable": "Kein Bereich verfügbar"
            },
            "filters": {
                "add": "Filter hinzufügen",
                "addAll": "Alle Facetten hinzufügen",
                "remove": "Filter entfernen",
                "removeAll": "Alle Facetten entfernen",
                "clear": "Filter löschen",
                "moreFilters": "",
                "showFilters": "Filter einblenden",
                "hideFilters": "Filter ausblenden",
                "back": "Zurück zu den Filtern",
                "selectedFilters": "Dieser Filter ist in der aktuellen Suchanfrage aktiv",
                "customizeFacets": "Facetten zum Anzeigen oder Ausblenden auswählen"
            },
            "selectedValue": "Dieser Wert ist in der aktuellen Anfrage ausgewählt.",
            "previous": "Zurück",
            "next": "Weiter",
            "filterItemCountTooltip": "{count} mögliche Werte für diesen Filter",
        },
        "facetCard": {
            "expand": "Erweitern",
            "collapse": "Reduzieren",
            "enlarge": "Vergrößern",
            "reduce": "Reduzieren",
            "openSettings": "Einstellungen öffnen",
            "saveSettings": "Einstellungen speichern"
        }
    };

    var enFacet = base.Utils.merge({}, _enFacet, i2.enSearch, selection.enSelection, i3$2.enCollapse);
    var frFacet = base.Utils.merge({}, _frFacet, i2.frSearch, selection.frSelection, i3$2.frCollapse);
    var deFacet = base.Utils.merge({}, _deFacet, i2.deSearch, selection.deSelection, i3$2.deCollapse);

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ALL_FACETS = ALL_FACETS;
    exports.AbstractFacet = AbstractFacet;
    exports.BsFacetBar = BsFacetBar;
    exports.BsFacetCard = BsFacetCard;
    exports.BsFacetFilters = BsFacetFilters;
    exports.BsFacetList = BsFacetList;
    exports.BsFacetModule = BsFacetModule;
    exports.BsFacetMultiComponent = BsFacetMultiComponent;
    exports.BsFacetRange = BsFacetRange;
    exports.BsFacetTagCloud = BsFacetTagCloud;
    exports.BsFacetTree = BsFacetTree;
    exports.BsMySearch = BsMySearch;
    exports.BsRefine = BsRefine;
    exports.DEFAULT_FACETS = DEFAULT_FACETS;
    exports.FACET_CHANGE_EVENTS = FACET_CHANGE_EVENTS;
    exports.FacetService = FacetService;
    exports.deFacet = deFacet;
    exports.enFacet = enFacet;
    exports.frFacet = frFacet;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-facet.umd.js.map
