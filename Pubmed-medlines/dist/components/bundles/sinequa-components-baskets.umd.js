(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@sinequa/core/base'), require('@sinequa/components/action'), require('@sinequa/core/web-services'), require('@sinequa/components/search'), require('@sinequa/core/modal'), require('@sinequa/components/selection'), require('@angular/common'), require('@angular/forms'), require('@angular/cdk/drag-drop'), require('@sinequa/core/intl'), require('@sinequa/core/validation'), require('@sinequa/components/utils'), require('@sinequa/components/modal'), require('@sinequa/core/login'), require('@sinequa/components/facet'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/baskets', ['exports', '@angular/core', 'rxjs', '@sinequa/core/base', '@sinequa/components/action', '@sinequa/core/web-services', '@sinequa/components/search', '@sinequa/core/modal', '@sinequa/components/selection', '@angular/common', '@angular/forms', '@angular/cdk/drag-drop', '@sinequa/core/intl', '@sinequa/core/validation', '@sinequa/components/utils', '@sinequa/components/modal', '@sinequa/core/login', '@sinequa/components/facet', '@angular/router'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components.baskets = {}), global.ng.core, global.rxjs, global.sinequa.core.base, global.sinequa.components.action, global.sinequa.core['web-services'], global.sinequa.components.search, global.sinequa.core.modal, global.sinequa.components.selection, global.ng.common, global.ng.forms, global.ng.cdk.dragDrop, global.sinequa.core.intl, global.sinequa.core.validation, global.sinequa.components.utils, global.sinequa.components.modal, global.sinequa.core.login, global.sinequa.components.facet, global.ng.router));
}(this, (function (exports, i0, rxjs, base, i3, i3$1, i2, i3$2, i4, i3$4, i1, i4$2, i5, i4$1, i3$3, i2$1, i1$1, facet, i3$5) { 'use strict';

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
    var BASKET_CHANGE_EVENTS = [
        "Basket_Loaded" /* Loaded */,
        "Basket_Add" /* Add */,
        "Basket_Delete" /* Delete */,
        "Basket_DeleteAll" /* DeleteAll */,
        "Basket_Update" /* Update */,
        "Basket_Rename" /* Rename */
    ];
    var BASKET_COMPONENTS = new i0.InjectionToken('BASKET_COMPONENTS');
    var BasketsService = /** @class */ (function () {
        function BasketsService(userSettingsService, searchService, modalService, selectionService, basketComponents) {
            var _this = this;
            this.userSettingsService = userSettingsService;
            this.searchService = searchService;
            this.modalService = modalService;
            this.selectionService = selectionService;
            this.basketComponents = basketComponents;
            this._events = new rxjs.Subject();
            this._changes = new rxjs.Subject();
            // Listen to the user settings
            this.userSettingsService.events.subscribe(function (event) {
                // E.g. new login occurs
                // ==> Menus need to be rebuilt
                _this._events.next({ type: "Basket_Loaded" /* Loaded */ });
            });
            // Listen to own events, to trigger change events
            this._events.subscribe(function (event) {
                if (BASKET_CHANGE_EVENTS.indexOf(event.type) !== -1) {
                    _this.changes.next(event);
                }
            });
            // Register a basket action onto the selection service, so that users can add/remove to/from baskets when documents are selected
            this.selectedRecordsAction = this.buildBasketsAction();
        }
        Object.defineProperty(BasketsService.prototype, "baskets", {
            // GETTERS
            /**
             * Returns the list of this user's baskets.
             * The list is stored in the user settings (this is a redirection).
             * Using this service creates the list of baskets if it does not already exist.
             */
            get: function () {
                if (!this.userSettingsService.userSettings)
                    this.userSettingsService.userSettings = {};
                if (!this.userSettingsService.userSettings["baskets"])
                    this.userSettingsService.userSettings["baskets"] = [];
                return this.userSettingsService.userSettings["baskets"];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BasketsService.prototype, "events", {
            /**
             * Triggers any event among BasketChangeEvent
             * (use for fine-grained control of baskets workflow)
             */
            get: function () {
                return this._events;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BasketsService.prototype, "changes", {
            /**
             * Triggers when events affect the list of baskets
             * (use to refresh basket menus)
             * Cf. CHANGE_EVENTS list
             */
            get: function () {
                return this._changes;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BasketsService.prototype, "hasBasket", {
            /**
             * @returns true if there is at least one basket
             */
            get: function () {
                return this.baskets.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @returns a basket with the given name or null if it does not exist
         * @param name
         */
        BasketsService.prototype.basket = function (name) {
            var i = this.basketIndex(name);
            return i >= 0 ? this.baskets[i] : undefined;
        };
        BasketsService.prototype.basketIndex = function (name) {
            for (var i = 0, ic = this.baskets.length; i < ic; i++) {
                var basket = this.baskets[i];
                if (basket && basket.name === name) {
                    return i;
                }
            }
            return -1;
        };
        // CRUD
        /**
         * Creates a new basket unless it already exists.
         * Emits an Basket event.
         * Update the data on the server.
         * @param basket the basket to create
         * @returns true if basket was created
         */
        BasketsService.prototype.createBasket = function (basket) {
            if (this.basketIndex(basket.name) >= 0)
                return false; // This basket already exists
            this.baskets.unshift(basket);
            this._events.next({ type: "Basket_Add" /* Add */, basket: basket });
            this.patchBaskets([{
                    type: "Basket_Add" /* Add */,
                    detail: {
                        basket: basket.name
                    }
                }]);
            return true;
        };
        /**
         * Update the basket at the given index, unless a basket with the same name
         * already exists in the list of baskets.
         * Emits a Basket event.
         * Update the data on the server.
         * @param basket the basket to update
         * @param index the index at which to update the basket
         * @returns true if basket was updated
         */
        BasketsService.prototype.updateBasket = function (basket, index) {
            var prevIndex = this.basketIndex(basket.name);
            if (prevIndex !== -1 && index !== prevIndex)
                return false; // A basket with the same name exists at a different index
            if (index >= 0 && index < this.baskets.length) {
                this.baskets.splice(index, 1, basket);
                this._events.next({ type: "Basket_Update" /* Update */, basket: basket });
                this.patchBaskets([
                    {
                        type: "Basket_Update" /* Update */,
                        detail: {
                            basket: basket.name
                        }
                    }
                ], true);
                return true;
            }
            return false; // This basket does not exist
        };
        /**
         * Updates the full list of Baskets.
         * Emits a Basket event.
         * Update the data on the server.
         * @param baskets the new list of baskets
         * @param auditEvents the list of audit events to log
         */
        BasketsService.prototype.updateBaskets = function (baskets, auditEvents) {
            base.Utils.arraySet(this.baskets, baskets);
            this._events.next({ type: "Basket_Update" /* Update */ });
            this.patchBaskets(auditEvents, true);
            return true;
        };
        /**
         * Deletes the given Basket (based on its name)
         * Emits an Basket event.
         * Update the data on the server.
         * @param basket
         * @returns true if basket was deleted
         */
        BasketsService.prototype.deleteBasket = function (basket) {
            var index = this.basketIndex(basket.name);
            if (index === -1)
                return false; // Nothing to delete
            this.baskets.splice(index, 1);
            this._events.next({ type: "Basket_Delete" /* Delete */, basket: basket });
            this.patchBaskets([
                {
                    type: "Basket_Delete" /* Delete */,
                    detail: {
                        savedquery: basket.name
                    }
                }
            ], true);
            return true;
        };
        /**
         * Adds one or more documents to a basket.
         * Emits a Basket event.
         * Update the data on the server.
         * @param name basket to which to add the document(s)
         * @param ids id(s) of the document(s) to add to the basket
         * @param skipPatch if true, will not update the data on the server (use for bulk updates)
         * @returns true if the document was added
         */
        BasketsService.prototype.addToBasket = function (name, ids, skipPatch) {
            if (!ids) {
                return false;
            }
            var basket = this.basket(name);
            if (!basket)
                return false;
            if (!basket.ids)
                basket.ids = [];
            if (base.Utils.isArray(ids)) {
                for (var i = 0, ic = ids.length; i < ic; i++) {
                    var id = ids[i];
                    if (basket.ids.indexOf(id) === -1) {
                        basket.ids.push(id);
                    }
                }
            }
            else {
                if (basket.ids.indexOf(ids) === -1) {
                    basket.ids.push(ids);
                }
            }
            if (!skipPatch) {
                this._events.next({ type: "Basket_AddDoc" /* AddDoc */ });
                this.patchBaskets({
                    type: "Basket_AddDoc" /* AddDoc */,
                    detail: {
                        basket: name,
                        "doc-id": basket.ids[0]
                    }
                });
            }
            return true;
        };
        /**
         * Removes one or more documents from a basket.
         * Emits a Basket event.
         * Update the data on the server.
         * @param name basket from which to remove the document(s)
         * @param ids id(s) of the document(s) to remove from the basket
         * @param skipPatch if true, will not update the data on the server (use for bulk updates)
         * @returns true if the document was removed
         */
        BasketsService.prototype.removeFromBasket = function (name, ids, skipPatch) {
            if (!ids) {
                return false;
            }
            var basket = this.basket(name);
            if (!basket)
                return false;
            if (!basket.ids)
                basket.ids = [];
            if (base.Utils.isArray(ids)) {
                for (var i = 0, ic = ids.length; i < ic; i++) {
                    var id = ids[i];
                    var index = basket.ids.indexOf(id);
                    if (index !== -1) {
                        basket.ids.splice(index, 1);
                    }
                }
            }
            else {
                var index = basket.ids.indexOf(ids);
                if (index !== -1) {
                    basket.ids.splice(index, 1);
                }
            }
            if (!skipPatch) {
                this._events.next({ type: "Basket_RemoveDoc" /* RemoveDoc */ });
                this.patchBaskets({
                    type: "Basket_RemoveDoc" /* RemoveDoc */,
                    detail: {
                        basket: name,
                        "doc-id": basket.ids[0]
                    }
                }, true);
            }
            return true;
        };
        /**
         * Removes a document from all the baskets
         * @param id id of the document to remove
         */
        BasketsService.prototype.removeFromAllBaskets = function (id) {
            var e_1, _a;
            var auditEvents = [];
            try {
                for (var _b = __values(this.baskets), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var basket = _c.value;
                    if (this.removeFromBasket(basket.name, id, true)) {
                        auditEvents.push({
                            type: "Basket_RemoveDoc" /* RemoveDoc */,
                            detail: {
                                basket: basket.name,
                                "doc-id": id
                            }
                        });
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
            if (auditEvents.length > 0) {
                this._events.next({ type: "Basket_RemoveDoc" /* RemoveDoc */ });
                this.patchBaskets(auditEvents, true);
                return true;
            }
            return false;
        };
        /**
         * Updates Baskets in User settings.
         * @param auditEvents : Audit Events to be triggered
         * @returns an Observable which can be used to trigger further events
         */
        BasketsService.prototype.patchBaskets = function (auditEvents, updateSearch) {
            var _this = this;
            var obs = this.userSettingsService.patch({ baskets: this.baskets }, auditEvents);
            obs.subscribe(function (next) {
                _this._events.next({ type: "Basked_Patched" /* Patched */ });
                if (updateSearch && _this.searchService.query.basket) {
                    _this.searchService.search(); // Update search results to reflect the new basket content
                }
            }, function (error) {
                console.error("Could not patch Baskets!", error);
            });
            return obs;
        };
        // EVENT HANDLERS (Menus)
        /**
         * Uses the SearchService to perform a search returning all
         * the documents in this basket
         * @param basket
         * @param path
         * @returns the search service promise
         */
        BasketsService.prototype.searchBasket = function (basket, path) {
            var query = this.searchService.makeQuery();
            query.basket = basket.name;
            this.searchService.setQuery(query);
            this._events.next({ type: "Basket_Open" /* Open */, basket: basket });
            return this.searchService.search({ path: path }, {
                type: "Basket_Open" /* Open */,
                detail: {
                    basket: basket.name
                }
            });
        };
        /**
         * Opens a dialog allowing a user to add one (or more) document(s)
         * to a basket.
         * @param ids id(s) of the documents to add to a basket
         * @param recordBaskets names of the baskets the document already belongs to
         * @returns a boolean promise resolved when the user closes the dialog
         * the result is true if the document was added to a basket
         */
        BasketsService.prototype.addToBasketModal = function (ids, recordBaskets) {
            var _this = this;
            var model = {
                basket: undefined,
                basketFilter: recordBaskets ? function (b) { return !recordBaskets.includes(b.name); } : undefined,
                allowNew: true
            };
            return this.modalService
                .open(this.basketComponents.selectBasketModal, { model: model })
                .then(function (result) {
                if (result === -1 /* OK */ && model.basket) {
                    return _this.addToBasket(model.basket.name, ids);
                }
                return false;
            });
        };
        /**
         * Opens a dialog allowing a user to remove one (or more) document(s)
         * from a basket.
         * @param ids id(s) of the documents to remove from a basket
         * @param recordBaskets names of the baskets the document already belongs to
         * @returns a boolean promise resolved when the user closes the dialog
         * the result is true if the document was removed from a basket
         */
        BasketsService.prototype.removeFromBasketModal = function (ids, recordBaskets) {
            var _this = this;
            var model = {
                basket: undefined,
                basketFilter: recordBaskets ? function (b) { return recordBaskets.includes(b.name); } : undefined
            };
            return this.modalService
                .open(this.basketComponents.selectBasketModal, { model: model })
                .then(function (result) {
                if (result === -1 /* OK */ && model.basket) {
                    return _this.removeFromBasket(model.basket.name, ids);
                }
                return false;
            });
        };
        /**
         * Opens a dialog allowing a user to create new basket.
         * @param model the initial basket object model
         * @returns a boolean promise resolved when the user closes the dialog
         * the result is true if the basket was created.
         */
        BasketsService.prototype.createBasketModal = function (model) {
            var _this = this;
            if (model === void 0) { model = { name: "" }; }
            return this.modalService.open(this.basketComponents.editBasketModal, { model: model })
                .then(function (result) {
                if (result === -1 /* OK */) {
                    var index_1 = _this.basketIndex(model.name);
                    if (index_1 !== -1) {
                        return _this.modalService.yesNo("msg#baskets.basketAlreadyExists")
                            .then(function (result) {
                            if (result === -3 /* Yes */) {
                                return _this.updateBasket(model, index_1);
                            }
                            return false;
                        });
                    }
                    else {
                        return _this.createBasket(model);
                    }
                }
                return false;
            });
        };
        // Not relevant as of now
        // public editBasketModal(basket: Basket)
        /**
         * Opens a dialog allowing a user to reorganize and edit the
         * list of baskets.
         * @returns a boolean promise resolved when the user closes the dialog
         * the result is true is the list was updated.
         */
        BasketsService.prototype.manageBasketsModal = function () {
            var _this = this;
            var model = { baskets: base.Utils.copy(this.baskets) };
            return this.modalService.open(this.basketComponents.manageBasketsModal, { model: model })
                .then(function (result) {
                if (result === -1 /* OK */) {
                    return _this.updateBaskets(model.baskets, model.auditEvents);
                }
                return false;
            });
        };
        BasketsService.prototype.buildBasketsAction = function () {
            var _this = this;
            return new i3.Action({
                icon: "fas fa-shopping-basket",
                title: "msg#baskets.baskets",
                hidden: true,
                children: [
                    new i3.Action({
                        text: "msg#baskets.addToBasket",
                        action: function (item, $event) {
                            _this.addToBasketModal(_this.selectionService.getSelectedIds());
                        }
                    }),
                    new i3.Action({
                        text: "msg#baskets.removeFromBasket",
                        action: function (item, $event) {
                            _this.removeFromBasketModal(_this.selectionService.getSelectedIds());
                        }
                    })
                ],
                updater: function (action) {
                    action.hidden = !_this.selectionService.haveSelectedRecords;
                }
            });
        };
        BasketsService.prototype.makeQuery = function (basket) {
            var query = this.searchService.makeQuery();
            query.basket = basket.name;
            return query;
        };
        BasketsService.prototype.notifyOpenBasket = function (basket) {
            this._events.next({ type: "Basket_Open" /* Open */, basket: basket });
        };
        BasketsService.prototype.ngOnDestroy = function () {
            this.events.complete();
            this.changes.complete();
        };
        return BasketsService;
    }());
    BasketsService.ɵfac = function BasketsService_Factory(t) { return new (t || BasketsService)(i0.ɵɵinject(i3$1.UserSettingsWebService), i0.ɵɵinject(i2.SearchService), i0.ɵɵinject(i3$2.ModalService), i0.ɵɵinject(i4.SelectionService), i0.ɵɵinject(BASKET_COMPONENTS)); };
    BasketsService.ɵprov = i0.ɵɵdefineInjectable({ token: BasketsService, factory: BasketsService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BasketsService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () {
            return [{ type: i3$1.UserSettingsWebService }, { type: i2.SearchService }, { type: i3$2.ModalService }, { type: i4.SelectionService }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [BASKET_COMPONENTS]
                        }] }];
        }, null);
    })();

    var BsEditBasket = /** @class */ (function () {
        function BsEditBasket(model, formBuilder) {
            this.model = model;
            this.formBuilder = formBuilder;
        }
        BsEditBasket.prototype.ngOnInit = function () {
            var _this = this;
            this.nameControl = new i1.FormControl(this.model.name, i1.Validators.required);
            this.form = this.formBuilder.group({
                basketName: this.nameControl
            });
            this.formChanges = base.Utils.subscribe(this.form.valueChanges, function (value) {
                _this.model.name = _this.nameControl.value;
            });
            this.buttons = [
                new i3$2.ModalButton({
                    result: -1 /* OK */,
                    primary: true,
                    validation: this.form
                }),
                new i3$2.ModalButton({
                    result: -2 /* Cancel */
                })
            ];
        };
        BsEditBasket.prototype.ngOnDestroy = function () {
            this.formChanges.unsubscribe();
        };
        return BsEditBasket;
    }());
    BsEditBasket.ɵfac = function BsEditBasket_Factory(t) { return new (t || BsEditBasket)(i0.ɵɵdirectiveInject(i3$2.MODAL_MODEL), i0.ɵɵdirectiveInject(i1.FormBuilder)); };
    BsEditBasket.ɵcmp = i0.ɵɵdefineComponent({ type: BsEditBasket, selectors: [["sq-edit-basket"]], decls: 7, vars: 7, consts: [["name", "editBasket", "novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "form-group", "sq-form-group"], ["for", "basketName"], ["type", "text", "id", "basketName", "formControlName", "basketName", "spellcheck", "off", "sqAutofocus", "", 1, "form-control", 3, "sqValidation"]], template: function BsEditBasket_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "form", 0);
                i0.ɵɵelementStart(1, "sq-modal", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵelementStart(3, "label", 3);
                i0.ɵɵtext(4);
                i0.ɵɵpipe(5, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelement(6, "input", 4);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("formGroup", ctx.form);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("title", "msg#editBasket.title")("buttons", ctx.buttons);
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 5, "msg#editBasket.name"));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("sqValidation", ctx.form);
            }
        }, directives: [i1.ɵangular_packages_forms_forms_y, i1.NgControlStatusGroup, i1.FormGroupDirective, i2$1.BsModal, i1.DefaultValueAccessor, i1.NgControlStatus, i1.FormControlName, i3$3.Autofocus, i4$1.ValidationDirective], pipes: [i5.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsEditBasket, [{
                type: i0.Component,
                args: [{
                        selector: "sq-edit-basket",
                        templateUrl: "./edit-basket.html"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i3$2.MODAL_MODEL]
                        }] }, { type: i1.FormBuilder }];
        }, null);
    })();

    function BsManageBaskets_div_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r3_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 6);
            i0.ɵɵelementStart(1, "button", 7);
            i0.ɵɵlistener("click", function BsManageBaskets_div_2_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r3_1); var ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.reorder(); });
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, ctx_r0.reordering ? "msg#manageBaskets.edit" : "msg#manageBaskets.reorder"));
        }
    }
    function BsManageBaskets_div_5_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 14);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var basket_r4 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(basket_r4.name);
        }
    }
    function BsManageBaskets_div_5_sq_editable_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r13_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "sq-editable", 15);
            i0.ɵɵlistener("valueChange", function BsManageBaskets_div_5_sq_editable_2_Template_sq_editable_valueChange_0_listener($event) { i0.ɵɵrestoreView(_r13_1); var basket_r4 = i0.ɵɵnextContext().$implicit; var ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.setName(basket_r4, $event); });
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var basket_r4 = i0.ɵɵnextContext().$implicit;
            var ctx_r7 = i0.ɵɵnextContext();
            i0.ɵɵproperty("value", basket_r4.name)("model", basket_r4)("validators", ctx_r7.nameValidators);
        }
    }
    function BsManageBaskets_div_5_a_4_Template(rf, ctx) {
        if (rf & 1) {
            var _r17_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 16);
            i0.ɵɵlistener("click", function BsManageBaskets_div_5_a_4_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r17_1); var ctx_r16 = i0.ɵɵnextContext(); var basket_r4 = ctx_r16.$implicit; var $index_r5 = ctx_r16.index; var ctx_r15 = i0.ɵɵnextContext(); return ctx_r15.remove(basket_r4, $index_r5); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelement(2, "span", 17);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 1, "msg#manageBaskets.remove"));
        }
    }
    function BsManageBaskets_div_5_span_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span", 18);
        }
    }
    var _c0 = "list-group-item list-group-item-action d-flex w-auto-unimportant";
    var _c1 = function (a1) { return [_c0, a1]; };
    function BsManageBaskets_div_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 8);
            i0.ɵɵtemplate(1, BsManageBaskets_div_5_div_1_Template, 2, 1, "div", 9);
            i0.ɵɵtemplate(2, BsManageBaskets_div_5_sq_editable_2_Template, 1, 3, "sq-editable", 10);
            i0.ɵɵelementStart(3, "div", 11);
            i0.ɵɵtemplate(4, BsManageBaskets_div_5_a_4_Template, 3, 3, "a", 12);
            i0.ɵɵtemplate(5, BsManageBaskets_div_5_span_5_Template, 1, 0, "span", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(5, _c1, ctx_r1.reordering ? "cursor-move" : ""));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r1.reordering);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r1.reordering);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx_r1.reordering);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r1.reordering);
        }
    }
    var BsManageBaskets = /** @class */ (function () {
        function BsManageBaskets(model) {
            var _this = this;
            this.model = model;
            this.reordering = false;
            this.nameValidators = [
                i1.Validators.required,
                function (control) {
                    var e_1, _a;
                    var modelControl = control.root.get("model");
                    if (modelControl) {
                        try {
                            for (var _b = __values(_this.model.baskets), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var item = _c.value;
                                if (modelControl.value === item) {
                                    continue;
                                }
                                if (control.value === item.name) {
                                    return {
                                        unique: true
                                    };
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
                    return null;
                }
            ];
        }
        BsManageBaskets.prototype.ngOnInit = function () {
            var _this = this;
            this.buttons = [
                this.removeAllButton = new i3$2.ModalButton({
                    text: "msg#manageBaskets.removeAll",
                    result: 0 /* Custom */,
                    action: function (button) {
                        _this.model.baskets.splice(0);
                        button.visible = false;
                        _this.addAuditEvent({
                            type: "Basket_DeleteAll" /* DeleteAll */
                        });
                    },
                    visible: this.model.baskets.length > 0
                }),
                new i3$2.ModalButton({
                    result: -1 /* OK */,
                    primary: true
                }),
                new i3$2.ModalButton({
                    result: -2 /* Cancel */
                })
            ];
        };
        BsManageBaskets.prototype.addAuditEvent = function (auditEvent) {
            if (!this.model.auditEvents) {
                this.model.auditEvents = [];
            }
            this.model.auditEvents.push(auditEvent);
        };
        BsManageBaskets.prototype.reorder = function () {
            this.reordering = !this.reordering;
        };
        BsManageBaskets.prototype.setName = function (basket, name) {
            if (!base.Utils.eqNC(basket.name, name)) {
                this.addAuditEvent({
                    type: "Basket_Rename" /* Rename */,
                    detail: {
                        basket: name,
                        "old-name": basket.name
                    }
                });
                basket.name = name;
            }
        };
        BsManageBaskets.prototype.remove = function (basket, index) {
            this.model.baskets.splice(index, 1);
            this.removeAllButton.visible = this.model.baskets.length > 0;
            this.addAuditEvent({
                type: "Basket_Delete" /* Delete */,
                detail: {
                    basket: basket.name
                }
            });
            return false;
        };
        BsManageBaskets.prototype.dropped = function (drop) {
            base.Utils.arrayMove(this.model.baskets, drop.previousIndex, drop.currentIndex);
        };
        return BsManageBaskets;
    }());
    BsManageBaskets.ɵfac = function BsManageBaskets_Factory(t) { return new (t || BsManageBaskets)(i0.ɵɵdirectiveInject(i3$2.MODAL_MODEL)); };
    BsManageBaskets.ɵcmp = i0.ɵɵdefineComponent({ type: BsManageBaskets, selectors: [["sq-manage-baskets"]], decls: 6, vars: 6, consts: [["name", "manageBaskets", "novalidate", ""], [3, "title", "buttons"], ["class", "form-group clearfix", 4, "ngIf"], [1, "form-group"], ["cdkDropList", "", 1, "list-group", 3, "cdkDropListData", "cdkDropListDisabled", "cdkDropListDropped"], ["cdkDrag", "", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "form-group", "clearfix"], ["type", "button", 1, "btn", "btn-secondary", "float-right", 3, "click"], ["cdkDrag", "", 3, "ngClass"], ["class", "sq-basket-text", 4, "ngIf"], ["name", "msg#manageBaskets.name", 3, "value", "model", "validators", "valueChange", 4, "ngIf"], [1, "ml-auto"], ["class", "ml-2", "href", "#", 3, "title", "click", 4, "ngIf"], ["class", "ml-2 fas fa-bars sq-move", 4, "ngIf"], [1, "sq-basket-text"], ["name", "msg#manageBaskets.name", 3, "value", "model", "validators", "valueChange"], ["href", "#", 1, "ml-2", 3, "title", "click"], [1, "fas", "fa-times", "sq-remove"], [1, "ml-2", "fas", "fa-bars", "sq-move"]], template: function BsManageBaskets_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "form", 0);
                i0.ɵɵelementStart(1, "sq-modal", 1);
                i0.ɵɵtemplate(2, BsManageBaskets_div_2_Template, 4, 3, "div", 2);
                i0.ɵɵelementStart(3, "div", 3);
                i0.ɵɵelementStart(4, "div", 4);
                i0.ɵɵlistener("cdkDropListDropped", function BsManageBaskets_Template_div_cdkDropListDropped_4_listener($event) { return ctx.dropped($event); });
                i0.ɵɵtemplate(5, BsManageBaskets_div_5_Template, 6, 7, "div", 5);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("title", "msg#manageBaskets.title")("buttons", ctx.buttons);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.model.baskets.length);
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("cdkDropListData", ctx.model.baskets)("cdkDropListDisabled", !ctx.reordering);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", ctx.model.baskets);
            }
        }, directives: [i1.ɵangular_packages_forms_forms_y, i1.NgControlStatusGroup, i1.NgForm, i2$1.BsModal, i3$4.NgIf, i4$2.CdkDropList, i3$4.NgForOf, i4$2.CdkDrag, i3$4.NgClass, i2$1.BsEditable], pipes: [i5.MessagePipe], styles: [".list-group[_ngcontent-%COMP%]{max-height:18.5rem;overflow-y:auto;width:100%}.sq-basket-text[_ngcontent-%COMP%]{overflow-wrap:break-word;width:100%;word-break:break-word;word-wrap:break-word}.sq-move[_ngcontent-%COMP%]{cursor:move}span.sq-move[_ngcontent-%COMP%]{color:grey}.sq-remove[_ngcontent-%COMP%]{color:#d3d3d3;cursor:pointer}.sq-remove[_ngcontent-%COMP%]:hover{color:#8b0000}.w-auto-unimportant[_ngcontent-%COMP%]{width:auto}.cursor-move[_ngcontent-%COMP%]{cursor:move}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsManageBaskets, [{
                type: i0.Component,
                args: [{
                        selector: "sq-manage-baskets",
                        templateUrl: "./manage-baskets.html",
                        styleUrls: ["./manage-baskets.scss"]
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i3$2.MODAL_MODEL]
                        }] }];
        }, null);
    })();

    function BsSelectBasket_a_4_Template(rf, ctx) {
        if (rf & 1) {
            var _r4_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 6);
            i0.ɵɵlistener("click", function BsSelectBasket_a_4_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r4_1); var basket_r2 = ctx.$implicit; var ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.select(basket_r2); });
            i0.ɵɵelementStart(1, "div");
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var basket_r2 = ctx.$implicit;
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, basket_r2.name));
        }
    }
    function BsSelectBasket_a_5_Template(rf, ctx) {
        if (rf & 1) {
            var _r6_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 6);
            i0.ɵɵlistener("click", function BsSelectBasket_a_5_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r6_1); var ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.newBasket(); });
            i0.ɵɵelementStart(1, "div");
            i0.ɵɵelementStart(2, "i");
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, "msg#selectBasket.newBasket"));
        }
    }
    var BsSelectBasket = /** @class */ (function () {
        function BsSelectBasket(model, basketsService, modalRef) {
            this.model = model;
            this.basketsService = basketsService;
            this.modalRef = modalRef;
            this.baskets = this.basketsService.baskets;
            if (!this.baskets) {
                this.baskets = [];
            }
            this.buttons = [
                new i3$2.ModalButton({
                    result: -2 /* Cancel */
                })
            ];
        }
        BsSelectBasket.prototype.ngOnInit = function () {
            if (!!this.model.basketFilter) {
                this.baskets = this.baskets.filter(this.model.basketFilter);
            }
        };
        BsSelectBasket.prototype.activate = function (model) {
            this.model = model;
        };
        BsSelectBasket.prototype.select = function (basket) {
            if (basket) {
                this.model.basket = basket;
                this.modalRef.close(-1 /* OK */);
            }
        };
        BsSelectBasket.prototype.newBasket = function () {
            var _this = this;
            var model = { name: "" };
            this.basketsService.createBasketModal(model)
                .then(function (result) {
                if (result) { // The basket was created
                    _this.select(model);
                }
            });
        };
        return BsSelectBasket;
    }());
    BsSelectBasket.ɵfac = function BsSelectBasket_Factory(t) { return new (t || BsSelectBasket)(i0.ɵɵdirectiveInject(i3$2.MODAL_MODEL), i0.ɵɵdirectiveInject(BasketsService), i0.ɵɵdirectiveInject(i3$2.ModalRef)); };
    BsSelectBasket.ɵcmp = i0.ɵɵdefineComponent({ type: BsSelectBasket, selectors: [["sq-select-basket"]], decls: 6, vars: 4, consts: [["name", "selectBasket", "novalidate", ""], [3, "title", "buttons"], [1, "form-group"], [1, "list-group", "sq-list-group"], ["href", "javascript:void(0)", "class", "list-group-item list-group-item-action", 3, "click", 4, "ngFor", "ngForOf"], ["href", "javascript:void(0)", "class", "list-group-item list-group-item-action", 3, "click", 4, "ngIf"], ["href", "javascript:void(0)", 1, "list-group-item", "list-group-item-action", 3, "click"]], template: function BsSelectBasket_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "form", 0);
                i0.ɵɵelementStart(1, "sq-modal", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵelementStart(3, "div", 3);
                i0.ɵɵtemplate(4, BsSelectBasket_a_4_Template, 4, 3, "a", 4);
                i0.ɵɵtemplate(5, BsSelectBasket_a_5_Template, 5, 3, "a", 5);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("title", "msg#selectBasket.title")("buttons", ctx.buttons);
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("ngForOf", ctx.baskets);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.model.allowNew);
            }
        }, directives: [i1.ɵangular_packages_forms_forms_y, i1.NgControlStatusGroup, i1.NgForm, i2$1.BsModal, i3$4.NgForOf, i3$4.NgIf], pipes: [i5.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsSelectBasket, [{
                type: i0.Component,
                args: [{
                        selector: "sq-select-basket",
                        templateUrl: "./select-basket.html"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i3$2.MODAL_MODEL]
                        }] }, { type: BasketsService }, { type: i3$2.ModalRef }];
        }, null);
    })();

    var _c0$1 = function (a0) { return [a0]; };
    var _c1$1 = function (a0, a2) { return { items: a0, autoAdjust: true, rightAligned: a2 }; };
    /**
     * Component representing the add-to-baskets button in one item of the result list view.
     *
     */
    var BsResultBaskets = /** @class */ (function () {
        function BsResultBaskets(modalService, basketsService, changeDetectorRef) {
            this.modalService = modalService;
            this.basketsService = basketsService;
            this.changeDetectorRef = changeDetectorRef;
            this.baskets = [];
        }
        BsResultBaskets.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if (!this.initialized) {
                this.initialized = true;
                this.addToBasketAction = this.buildAddToBasketAction();
                this.removeFromBasketAction = this.buildRemoveFromBasketAction();
                this.removeFromAllBasketsAction = this.buildRemovalFromAllBasketsAction();
                this.basketsSubscription = this.basketsService.changes.subscribe(function (event) {
                    _this.updateRecordBaskets();
                    _this.refreshVisualization();
                });
            }
            this.updateRecordBaskets();
            this.refreshVisualization();
        };
        BsResultBaskets.prototype.ngOnDestroy = function () {
            if (this.basketsSubscription) {
                this.basketsSubscription.unsubscribe();
            }
        };
        Object.defineProperty(BsResultBaskets.prototype, "isInBaskets", {
            get: function () {
                return this.baskets.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        BsResultBaskets.prototype.refreshVisualization = function () {
            this.basketsAction = this.buildBasketsAction();
            this.changeDetectorRef.markForCheck();
        };
        BsResultBaskets.prototype.updateRecordBaskets = function () {
            var e_1, _a;
            var currentBaskets = this.basketsService.baskets;
            this.baskets = [];
            try {
                for (var currentBaskets_1 = __values(currentBaskets), currentBaskets_1_1 = currentBaskets_1.next(); !currentBaskets_1_1.done; currentBaskets_1_1 = currentBaskets_1.next()) {
                    var basket = currentBaskets_1_1.value;
                    if (!!basket.ids && basket.ids.includes(this.record.id)) {
                        this.baskets.push(basket.name);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (currentBaskets_1_1 && !currentBaskets_1_1.done && (_a = currentBaskets_1.return)) _a.call(currentBaskets_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        BsResultBaskets.prototype.buildAddToBasketAction = function () {
            var _this = this;
            return new i3.Action({
                text: 'msg#baskets.addToBasket',
                action: function (item, $event) {
                    _this.basketsService.addToBasketModal(_this.record.id, _this.baskets);
                }
            });
        };
        BsResultBaskets.prototype.buildRemoveFromBasketAction = function () {
            var _this = this;
            return new i3.Action({
                text: 'msg#baskets.removeFromBasket',
                action: function (item, $event) {
                    _this.basketsService.removeFromBasketModal(_this.record.id, _this.baskets);
                }
            });
        };
        BsResultBaskets.prototype.buildRemovalFromAllBasketsAction = function () {
            var _this = this;
            return new i3.Action({
                text: 'msg#baskets.removeFromAllBaskets',
                action: function () {
                    _this.modalService
                        .yesNo('msg#baskets.removeFromAllBasketsConfirmation', { values: { baskets: _this.baskets.join(', ') } })
                        .then(function (result) {
                        if (result === -3 /* Yes */) {
                            _this.basketsService.removeFromAllBaskets(_this.record.id);
                        }
                    });
                }
            });
        };
        BsResultBaskets.prototype.buildBasketsAction = function () {
            return new i3.Action({
                icon: 'fas fa-shopping-basket',
                title: 'msg#baskets.baskets',
                children: this.isInBaskets
                    ? this.baskets.length === 1
                        ? [this.addToBasketAction, this.removeFromBasketAction]
                        : [this.addToBasketAction, this.removeFromBasketAction, this.removeFromAllBasketsAction]
                    : [this.addToBasketAction]
            });
        };
        return BsResultBaskets;
    }());
    BsResultBaskets.ɵfac = function BsResultBaskets_Factory(t) { return new (t || BsResultBaskets)(i0.ɵɵdirectiveInject(i3$2.ModalService), i0.ɵɵdirectiveInject(BasketsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    BsResultBaskets.ɵcmp = i0.ɵɵdefineComponent({ type: BsResultBaskets, selectors: [["sq-result-baskets"]], inputs: { record: "record", rightAligned: "rightAligned" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 9, consts: [[3, "sq-action-buttons"]], template: function BsResultBaskets_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelement(0, "div", 0);
            }
            if (rf & 2) {
                i0.ɵɵclassMapInterpolate1("btn-group ", ctx.isInBaskets ? "sq-document-in-baskets" : "sq-document-not-in-baskets", "");
                i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction2(6, _c1$1, i0.ɵɵpureFunction1(4, _c0$1, ctx.basketsAction), ctx.rightAligned));
            }
        }, directives: [i3.BsActionButtons], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsResultBaskets, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-result-baskets',
                        templateUrl: './result-baskets.html'
                    }]
            }], function () { return [{ type: i3$2.ModalService }, { type: BasketsService }, { type: i0.ChangeDetectorRef }]; }, { record: [{
                    type: i0.Input
                }], rightAligned: [{
                    type: i0.Input
                }] });
    })();

    var _c0$2 = function (a0, a1, a2, a3) { return { item: a0, size: a1, autoAdjust: a2, autoAdjustBreakpoint: a3, inMenu: true }; };
    function BsBasketsMenuComponent_li_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "li", 1);
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("sq-action-item", i0.ɵɵpureFunction4(2, _c0$2, ctx_r0.menu, ctx_r0.size, ctx_r0.autoAdjust, ctx_r0.autoAdjustBreakpoint))("collapseBreakpoint", ctx_r0.collapseBreakpoint);
        }
    }
    var BsBasketsMenuComponent = /** @class */ (function () {
        function BsBasketsMenuComponent(loginService, basketsService, principalService, userSettingsService, appService) {
            var _this = this;
            this.loginService = loginService;
            this.basketsService = basketsService;
            this.principalService = principalService;
            this.userSettingsService = userSettingsService;
            this.appService = appService;
            this.searchRoute = "/search";
            this.icon = "fas fa-shopping-basket";
            this.autoAdjust = true;
            this.autoAdjustBreakpoint = "xl";
            this.collapseBreakpoint = "sm";
            this.basketOptions = ["Select", "Share"];
            this.basketCustomOptions = [];
            this.createAction = new i3.Action({
                text: "msg#baskets.createBasket",
                title: "msg#baskets.createBasket",
                action: function (_) {
                    _this.basketsService.createBasketModal();
                },
            });
            this.manageAction = new i3.Action({
                text: "msg#baskets.manageBaskets",
                title: "msg#baskets.manageBaskets",
                action: function (_) {
                    _this.basketsService.manageBasketsModal();
                },
            });
        }
        BsBasketsMenuComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.updateMenu();
            this.basketsService.changes.subscribe({
                next: function () {
                    _this.updateMenu();
                },
            });
            this.loginService.events.subscribe(function (event) {
                if (event.type === "session-changed") {
                    _this.updateMenu();
                }
            });
        };
        BsBasketsMenuComponent.prototype.updateMenu = function () {
            var _this = this;
            if (!this.loginService.complete) {
                this.menu = undefined;
                return;
            }
            //Select and Share options//
            var basketsActions = [];
            if (this.basketsService.hasBasket) {
                this.basketsService.baskets.map(function (basket) { return basketsActions.push(new i3.Action({
                    text: basket.name,
                    title: basket.name,
                    children: [
                        new i3.Action({
                            text: "Select",
                            title: "Select",
                            action: function () { return _this.basketsService.searchBasket(basket, _this.searchRoute); },
                        }),
                        new i3.Action({
                            text: "Share",
                            title: "Share",
                            action: function () { return _this.sendEmail(basket, _this.searchRoute); },
                        }),
                    ],
                })); });
            }
            basketsActions.push(new i3.Action({ separator: true }));
            basketsActions.push(this.createAction);
            if (this.basketsService.hasBasket) {
                basketsActions.push(this.manageAction);
            }
            this.menu = new i3.Action({
                icon: this.icon,
                text: "msg#baskets.baskets",
                title: "msg#baskets.baskets",
                children: basketsActions,
            });
        };
        BsBasketsMenuComponent.prototype.sendEmail = function (basket, curr) {
            var _a, _b;
            var mailToUrl = "";
            var name = (_b = (_a = this.principalService) === null || _a === void 0 ? void 0 : _a.principal) === null || _b === void 0 ? void 0 : _b.name;
            var basketName = basket.name;
            var query = "#/search?query=%7B%22name%22:%22" + this.appService.appName + "%22,%22basket%22:%22" + basketName + "%22,%22user%22:%22" + name + "%22,%22tab%22:%22ALL%22%7D&view=list" + "&user=" + name + "&sharedBasket=" + basketName;
            var body = "https://" + window.location.host + window.location.pathname + encodeURIComponent(query);
            console.log(body);
            //?query={%22name%22:%22GlobalSearch_V3.2%22,%22basket%22:%22Favorites%22,%22tab%22:%22ALL%22}&view=list&user=200035114&sharedBasket=Favorites
            mailToUrl = "mailto:?subject=Pubmed Search Basket&body=" + body;
            console.log(mailToUrl);
            window.location.href = mailToUrl;
        };
        return BsBasketsMenuComponent;
    }());
    BsBasketsMenuComponent.ɵfac = function BsBasketsMenuComponent_Factory(t) { return new (t || BsBasketsMenuComponent)(i0.ɵɵdirectiveInject(i1$1.LoginService), i0.ɵɵdirectiveInject(BasketsService), i0.ɵɵdirectiveInject(i3$1.PrincipalWebService), i0.ɵɵdirectiveInject(i3$1.UserSettingsWebService), i0.ɵɵdirectiveInject(i3$1.AppWebService)); };
    BsBasketsMenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsBasketsMenuComponent, selectors: [["sq-baskets-menu"]], inputs: { searchRoute: "searchRoute", icon: "icon", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", size: "size" }, decls: 1, vars: 1, consts: [["class", "nav-item dropdown", 3, "sq-action-item", "collapseBreakpoint", 4, "ngIf"], [1, "nav-item", "dropdown", 3, "sq-action-item", "collapseBreakpoint"]], template: function BsBasketsMenuComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsBasketsMenuComponent_li_0_Template, 1, 7, "li", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !!ctx.menu && !ctx.menu.hidden);
            }
        }, directives: [i3$4.NgIf, i3.BsActionItem], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsBasketsMenuComponent, [{
                type: i0.Component,
                args: [{
                        selector: "sq-baskets-menu",
                        templateUrl: "./baskets-menu.component.html",
                    }]
            }], function () { return [{ type: i1$1.LoginService }, { type: BasketsService }, { type: i3$1.PrincipalWebService }, { type: i3$1.UserSettingsWebService }, { type: i3$1.AppWebService }]; }, { searchRoute: [{
                    type: i0.Input
                }], icon: [{
                    type: i0.Input
                }], autoAdjust: [{
                    type: i0.Input
                }], autoAdjustBreakpoint: [{
                    type: i0.Input
                }], collapseBreakpoint: [{
                    type: i0.Input
                }], size: [{
                    type: i0.Input
                }] });
    })();

    function BsFacetBasketsComponent_a_1_span_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 7);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var basket_r2 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(basket_r2.ids.length);
        }
    }
    function BsFacetBasketsComponent_a_1_i_4_Template(rf, ctx) {
        if (rf & 1) {
            var _r8_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "i", 8);
            i0.ɵɵlistener("click", function BsFacetBasketsComponent_a_1_i_4_Template_i_click_0_listener($event) { i0.ɵɵrestoreView(_r8_1); var basket_r2 = i0.ɵɵnextContext().$implicit; var ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.deleteBasket(basket_r2, $event); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 1, "msg#baskets.delete"));
        }
    }
    var _c0$3 = function (a0) { return [a0]; };
    function BsFacetBasketsComponent_a_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r10_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 3);
            i0.ɵɵlistener("click", function BsFacetBasketsComponent_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r10_1); var basket_r2 = ctx.$implicit; var ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.openBasket(basket_r2); });
            i0.ɵɵelementStart(1, "span", 4);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(3, BsFacetBasketsComponent_a_1_span_3_Template, 2, 1, "span", 5);
            i0.ɵɵtemplate(4, BsFacetBasketsComponent_a_1_i_4_Template, 2, 3, "i", 6);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var basket_r2 = ctx.$implicit;
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(6, _c0$3, ctx_r0.searchRoute))("queryParams", ctx_r0.getQueryParams(basket_r2))("state", ctx_r0.getRouterState(basket_r2));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(basket_r2.name);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", basket_r2.ids);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.enableDelete);
        }
    }
    function BsFacetBasketsComponent_div_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 9);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#baskets.noBasket"), " ");
        }
    }
    var BsFacetBasketsComponent = /** @class */ (function (_super) {
        __extends(BsFacetBasketsComponent, _super);
        function BsFacetBasketsComponent(basketsService) {
            var _this = _super.call(this) || this;
            _this.basketsService = basketsService;
            _this.searchRoute = "/search";
            _this.maxBaskets = 5;
            _this.enableDelete = true;
            _this.page = 0;
            _this.createBasket = new i3.Action({
                icon: "fas fa-plus",
                title: "msg#baskets.createBasket",
                action: function () {
                    _this.basketsService.createBasketModal();
                }
            });
            _this.manageBasket = new i3.Action({
                icon: "fas fa-cog",
                title: "msg#baskets.manageBaskets",
                action: function () {
                    _this.basketsService.manageBasketsModal();
                }
            });
            _this.previousPage = new i3.Action({
                icon: "fas fa-chevron-left",
                title: "msg#facet.previous",
                action: function () {
                    _this.page--;
                },
                updater: function (action) {
                    action.disabled = _this.page <= 0;
                    action.hidden = _this.maxPage === 0;
                }
            });
            _this.nextPage = new i3.Action({
                icon: "fas fa-chevron-right",
                title: "msg#facet.next",
                action: function () {
                    _this.page++;
                },
                updater: function (action) {
                    action.disabled = _this.page >= _this.maxPage;
                    action.hidden = _this.maxPage === 0;
                }
            });
            return _this;
        }
        Object.defineProperty(BsFacetBasketsComponent.prototype, "maxPage", {
            get: function () {
                return Math.max(0, Math.ceil(this.basketsService.baskets.length / this.maxBaskets) - 1);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsFacetBasketsComponent.prototype, "startIndex", {
            get: function () {
                return this.page * this.maxBaskets;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsFacetBasketsComponent.prototype, "endIndex", {
            get: function () {
                return (this.page + 1) * this.maxBaskets;
            },
            enumerable: false,
            configurable: true
        });
        BsFacetBasketsComponent.prototype.openBasket = function (basket) {
            this.basketsService.notifyOpenBasket(basket);
            return true;
        };
        Object.defineProperty(BsFacetBasketsComponent.prototype, "actions", {
            get: function () {
                this.previousPage.update();
                this.nextPage.update();
                return [this.createBasket, this.previousPage, this.nextPage, this.manageBasket];
            },
            enumerable: false,
            configurable: true
        });
        BsFacetBasketsComponent.prototype.deleteBasket = function (basket, event) {
            event.stopPropagation();
            this.basketsService.deleteBasket(basket);
            this.page = Math.min(this.page, this.maxPage);
            return false;
        };
        BsFacetBasketsComponent.prototype.getQueryParams = function (basket) {
            var query = this.basketsService.makeQuery(basket);
            var queryParams = query.toJsonForQueryString();
            return { query: queryParams };
        };
        BsFacetBasketsComponent.prototype.getRouterState = function (basket) {
            return {
                audit: {
                    type: "Basket_Open" /* Open */,
                    detail: {
                        basket: basket.name
                    }
                }
            };
        };
        return BsFacetBasketsComponent;
    }(facet.AbstractFacet));
    BsFacetBasketsComponent.ɵfac = function BsFacetBasketsComponent_Factory(t) { return new (t || BsFacetBasketsComponent)(i0.ɵɵdirectiveInject(BasketsService)); };
    BsFacetBasketsComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetBasketsComponent, selectors: [["sq-facet-baskets"]], inputs: { searchRoute: "searchRoute", maxBaskets: "maxBaskets", enableDelete: "enableDelete" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 4, vars: 6, consts: [[1, "list-group", "list-group-flush"], ["class", "basket-item list-group-item list-group-item-action d-flex align-items-center", 3, "routerLink", "queryParams", "state", "click", 4, "ngFor", "ngForOf"], ["class", "list-group-item text-center text-muted font-italic small py-5", 4, "ngIf"], [1, "basket-item", "list-group-item", "list-group-item-action", "d-flex", "align-items-center", 3, "routerLink", "queryParams", "state", "click"], [1, "basket-name", "text-truncate", "mr-auto"], ["class", "basket-count ml-2 text-muted small", 4, "ngIf"], ["class", "basket-delete ml-2 fas fa-times", 3, "title", "click", 4, "ngIf"], [1, "basket-count", "ml-2", "text-muted", "small"], [1, "basket-delete", "ml-2", "fas", "fa-times", 3, "title", "click"], [1, "list-group-item", "text-center", "text-muted", "font-italic", "small", "py-5"]], template: function BsFacetBasketsComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtemplate(1, BsFacetBasketsComponent_a_1_Template, 5, 8, "a", 1);
                i0.ɵɵpipe(2, "slice");
                i0.ɵɵtemplate(3, BsFacetBasketsComponent_div_3_Template, 3, 3, "div", 2);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind3(2, 2, ctx.basketsService.baskets, ctx.startIndex, ctx.endIndex));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", ctx.basketsService.baskets.length == 0);
            }
        }, directives: [i3$4.NgForOf, i3$4.NgIf, i3$5.RouterLinkWithHref], pipes: [i3$4.SlicePipe, i5.MessagePipe], styles: [".basket-item[_ngcontent-%COMP%]   .basket-delete[_ngcontent-%COMP%]{\n    opacity: 0;\n}\n\n.basket-item[_ngcontent-%COMP%]:hover   .basket-delete[_ngcontent-%COMP%]{\n    opacity: 1;\n    transition: opacity 0.2s ease-in-out;\n}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsFacetBasketsComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-facet-baskets',
                        templateUrl: './facet-baskets.component.html',
                        styles: ["\n.basket-item .basket-delete{\n    opacity: 0;\n}\n\n.basket-item:hover .basket-delete{\n    opacity: 1;\n    transition: opacity 0.2s ease-in-out;\n}\n  "]
                    }]
            }], function () { return [{ type: BasketsService }]; }, { searchRoute: [{
                    type: i0.Input
                }], maxBaskets: [{
                    type: i0.Input
                }], enableDelete: [{
                    type: i0.Input
                }] });
    })();

    var BsBasketsModule = /** @class */ (function () {
        function BsBasketsModule() {
        }
        return BsBasketsModule;
    }());
    BsBasketsModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsBasketsModule });
    BsBasketsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsBasketsModule_Factory(t) { return new (t || BsBasketsModule)(); }, providers: [
            {
                provide: BASKET_COMPONENTS,
                useValue: {
                    selectBasketModal: BsSelectBasket,
                    editBasketModal: BsEditBasket,
                    manageBasketsModal: BsManageBaskets
                }
            }
        ], imports: [[
                i3$4.CommonModule,
                i1.FormsModule, i1.ReactiveFormsModule,
                i4$2.DragDropModule,
                i3$5.RouterModule,
                i2$1.BsModalModule,
                i5.IntlModule,
                i4$1.ValidationModule,
                i3$3.UtilsModule,
                i4.BsSelectionModule,
                i3.BsActionModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsBasketsModule, { declarations: [BsEditBasket, BsManageBaskets, BsSelectBasket,
                BsResultBaskets, BsBasketsMenuComponent,
                BsFacetBasketsComponent], imports: [i3$4.CommonModule,
                i1.FormsModule, i1.ReactiveFormsModule,
                i4$2.DragDropModule,
                i3$5.RouterModule,
                i2$1.BsModalModule,
                i5.IntlModule,
                i4$1.ValidationModule,
                i3$3.UtilsModule,
                i4.BsSelectionModule,
                i3.BsActionModule], exports: [BsEditBasket, BsManageBaskets, BsSelectBasket,
                BsResultBaskets, BsBasketsMenuComponent,
                BsFacetBasketsComponent] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsBasketsModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i3$4.CommonModule,
                            i1.FormsModule, i1.ReactiveFormsModule,
                            i4$2.DragDropModule,
                            i3$5.RouterModule,
                            i2$1.BsModalModule,
                            i5.IntlModule,
                            i4$1.ValidationModule,
                            i3$3.UtilsModule,
                            i4.BsSelectionModule,
                            i3.BsActionModule
                        ],
                        declarations: [
                            BsEditBasket, BsManageBaskets, BsSelectBasket,
                            BsResultBaskets, BsBasketsMenuComponent,
                            BsFacetBasketsComponent
                        ],
                        exports: [
                            BsEditBasket, BsManageBaskets, BsSelectBasket,
                            BsResultBaskets, BsBasketsMenuComponent,
                            BsFacetBasketsComponent
                        ],
                        providers: [
                            {
                                provide: BASKET_COMPONENTS,
                                useValue: {
                                    selectBasketModal: BsSelectBasket,
                                    editBasketModal: BsEditBasket,
                                    manageBasketsModal: BsManageBaskets
                                }
                            }
                        ]
                    }]
            }], null, null);
    })();

    var _enBaskets = {
        "baskets": {
            "baskets": "Baskets",
            "addToBasket": "Add to basket",
            "removeFromBasket": "Remove from basket",
            "removeFromAllBaskets": "Remove from all baskets",
            "removeFromAllBasketsConfirmation": "Are you sure you want to remove this result from these baskets: {baskets}?",
            "basketAlreadyExists": "A basket with that name already exists. Would you like to replace it?",
            "noBasket": "You have not yet added a document to a basket...",
            "createBasket": "Create Basket",
            "manageBaskets": "Manage Baskets",
            "delete": "Delete this basket"
        },
        "editBasket": {
            "title": "Basket",
            "name": "Name"
        },
        "manageBaskets": {
            "title": "Manage Baskets",
            "edit": "Edit",
            "reorder": "Reorder",
            "remove": "Remove",
            "removeAll": "Remove all",
            "name": "Name"
        },
        "selectBasket": {
            "title": "Select Basket",
            "newBasket": "New basket..."
        }
    };

    var _frBaskets = {
        "baskets": {
            "baskets": "Paniers",
            "addToBasket": "Ajouter au panier",
            "removeFromBasket": "Supprimer du panier",
            "removeFromAllBaskets": "Supprimer de tous les paniers",
            "removeFromAllBasketsConfirmation": "Êtes-vous sûr de vouloir supprimer ce résultat de ces paniers : {baskets} ?",
            "basketAlreadyExists": "Un panier avec ce nom existe déjà. Voulez-vous le remplacer ?",
            "noBasket": "Vous n'avez pas encore ajouté de document à un panier...",
            "createBasket": "Créer un panier",
            "manageBaskets": "Gérer les paniers",
            "delete": "Supprimer ce panier"
        },
        "editBasket": {
            "title": "Panier",
            "name": "Nom"
        },
        "manageBaskets": {
            "title": "Gérer les paniers",
            "edit": "Editer",
            "reorder": "Réorganiser",
            "remove": "Effacer",
            "removeAll": "Effacer tout",
            "name": "Nom"
        },
        "selectBasket": {
            "title": "Sélectionner un panier",
            "newBasket": "Nouveau panier..."
        },
    };

    var _deBaskets = {
        "baskets": {
            "baskets": "Ablagekörbe",
            "addToBasket": "Zum Ablagekorb hinzufügen",
            "removeFromBasket": "Aus dem Ablagekorb entfernen",
            "removeFromAllBaskets": "Von allen Ablagekörben entfernen",
            "removeFromAllBasketsConfirmation": "Möchten Sie dieses Eregbnis wirklich von diesen Ablagekörben entfernen: {baskets}?",
            "basketAlreadyExists": "Es existiert bereits ein Ablagekorb mit diesem Namen. Möchten Sie ihn ersetzen?",
            "noBasket": "Sie haben noch kein Dokument zu einem Ablagekorb hinzugefügt...",
            "createBasket": "Ablagekorb erstellen",
            "manageBaskets": "Ablagekörbe verwalten",
            "delete": "Diesen Ablagekorb löschen"
        },
        "editBasket": {
            "title": "Ablagekorb",
            "name": "Name"
        },
        "manageBaskets": {
            "title": "Ablagekörbe verwalten",
            "edit": "Bearbeiten",
            "reorder": "Neu sortieren",
            "remove": "Entfernen",
            "removeAll": "Alle entfernen",
            "name": "Name"
        },
        "selectBasket": {
            "title": "Ablagekorb auswählen",
            "newBasket": "Neuer Ablagekorb..."
        },
    };

    var enBaskets = base.Utils.merge({}, _enBaskets, i2.enSearch, i4.enSelection, i2$1.enModal);
    var frBaskets = base.Utils.merge({}, _frBaskets, i2.frSearch, i4.frSelection, i2$1.frModal);
    var deBaskets = base.Utils.merge({}, _deBaskets, i2.deSearch, i4.deSelection, i2$1.deModal);

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BASKET_CHANGE_EVENTS = BASKET_CHANGE_EVENTS;
    exports.BASKET_COMPONENTS = BASKET_COMPONENTS;
    exports.BasketsService = BasketsService;
    exports.BsBasketsMenuComponent = BsBasketsMenuComponent;
    exports.BsBasketsModule = BsBasketsModule;
    exports.BsEditBasket = BsEditBasket;
    exports.BsFacetBasketsComponent = BsFacetBasketsComponent;
    exports.BsManageBaskets = BsManageBaskets;
    exports.BsResultBaskets = BsResultBaskets;
    exports.BsSelectBasket = BsSelectBasket;
    exports.deBaskets = deBaskets;
    exports.enBaskets = enBaskets;
    exports.frBaskets = frBaskets;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-baskets.umd.js.map
