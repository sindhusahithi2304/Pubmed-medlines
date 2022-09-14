(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@sinequa/components/action'), require('@sinequa/components/search'), require('@sinequa/core/intl'), require('@angular/common'), require('@angular/cdk/drag-drop'), require('@sinequa/core/base')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/selection', ['exports', '@angular/core', 'rxjs', '@sinequa/components/action', '@sinequa/components/search', '@sinequa/core/intl', '@angular/common', '@angular/cdk/drag-drop', '@sinequa/core/base'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components.selection = {}), global.ng.core, global.rxjs, global.sinequa.components.action, global.sinequa.components.search, global.sinequa.core.intl, global.ng.common, global.ng.cdk.dragDrop, global.sinequa.core.base));
}(this, (function (exports, i0, rxjs, i2, i1, i2$1, i4, i3, base) { 'use strict';

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

    (function (SelectionEventType) {
        SelectionEventType[SelectionEventType["SELECT"] = 0] = "SELECT";
        SelectionEventType[SelectionEventType["UNSELECT"] = 1] = "UNSELECT";
        SelectionEventType[SelectionEventType["MOVE"] = 2] = "MOVE";
    })(exports.SelectionEventType || (exports.SelectionEventType = {}));
    var defaultSelectionOptions = {
        resetOnNewResults: false,
        resetOnNewQuery: true,
        storage: "id"
    };
    var SELECTION_OPTIONS = new i0.InjectionToken("SELECTION_OPTIONS");
    var SelectionService = /** @class */ (function () {
        function SelectionService(searchService, selectionOptions) {
            var _this = this;
            this.searchService = searchService;
            this.selectionOptions = selectionOptions;
            this.selectedRecords = []; // currently selected items
            this.selectionActions = []; // Actions that other services can register onto this service
            this._events = new rxjs.Subject();
            this.searchService.events.subscribe(function (event) {
                var e_1, _b;
                var _a;
                if (!_this.selectionOptions.resetOnNewResults && event.type === "new-results" && _this.searchService.haveRecords) {
                    var newSelectedRecords = [];
                    if ((_a = _this.searchService.results) === null || _a === void 0 ? void 0 : _a.records) {
                        var _loop_1 = function (record) {
                            var index = _this.selectedRecords.findIndex(function (item) { return item.id === record.id; });
                            if (index !== -1 && !record.$selected) {
                                record.$selected = true; // Select previously selected records
                                _this.selectedRecords.splice(index, 1, record);
                                newSelectedRecords.push(record);
                            }
                        };
                        try {
                            for (var _c = __values(_this.searchService.results.records), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var record = _d.value;
                                _loop_1(record);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                    if (newSelectedRecords.length > 0) // Menus might need to be refreshed
                        _this._events.next({ type: exports.SelectionEventType.SELECT, records: newSelectedRecords, source: event.type });
                }
                if (_this.selectionOptions.resetOnNewResults && event.type === "new-results") {
                    _this.clearSelectedRecords(event.type);
                }
                if (_this.selectionOptions.resetOnNewQuery && event.type === "new-query") {
                    _this.clearSelectedRecords(event.type);
                }
            });
            this.selectedRecordsAction = this.buildSelectRecordsAction();
            this.selectionActions.push(this.selectedRecordsAction);
            this.events.subscribe({ next: function () {
                    _this.selectionActions.forEach(function (action) { return action.update(); });
                } });
        }
        Object.defineProperty(SelectionService.prototype, "events", {
            /**
             * Emits an event on any (bulk or single) selection and unselection events
             */
            get: function () {
                return this._events;
            },
            enumerable: false,
            configurable: true
        });
        SelectionService.prototype.ngOnDestroy = function () {
            this._events.complete();
        };
        SelectionService.prototype.getItem = function (record) {
            if (this.selectionOptions.storage === "id") {
                return { id: record.id };
            }
            else if (this.selectionOptions.storage === "record") {
                return record;
            }
            else {
                return this.selectionOptions.storage(record);
            }
        };
        /**
         * Returns a copy of the list of selected records
         */
        SelectionService.prototype.getSelectedItems = function () {
            return this.selectedRecords.slice(0);
        };
        /**
         * Return the list of selected record ids
         */
        SelectionService.prototype.getSelectedIds = function () {
            return this.selectedRecords.map(function (r) { return r.id; });
        };
        Object.defineProperty(SelectionService.prototype, "haveSelectedRecords", {
            /**
             * @returns true if at least one record is selected
             */
            get: function () {
                return this.selectedRecords.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        SelectionService.prototype.getSelectedCount = function () {
            return this.selectedRecords.length;
        };
        Object.defineProperty(SelectionService.prototype, "allRecordsSelected", {
            /**
             * @returns true if all records in the search results are selected
             */
            get: function () {
                var e_2, _b;
                if (!this.searchService.results || !this.searchService.results.records) {
                    return false;
                }
                try {
                    for (var _c = __values(this.searchService.results.records), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var record = _d.value;
                        if (!record.$selected) {
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
        SelectionService.prototype.selectCurrentRecords = function (source) {
            var e_3, _b;
            var newSelectedRecords = [];
            if (this.searchService.results && this.searchService.results.records) {
                try {
                    for (var _c = __values(this.searchService.results.records), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var record = _d.value;
                        if (!record.$selected) {
                            this.selectedRecords.push(this.getItem(record));
                            newSelectedRecords.push(record);
                            record.$selected = true;
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
            if (newSelectedRecords.length > 0)
                this._events.next({ type: exports.SelectionEventType.SELECT, records: newSelectedRecords, source: source });
        };
        /**
         * Toggles the selection of one record or all those in the results.
         * Emits a SelectionEvent if a record is selected or unselected.
         * @param record if provided, will toggle the selection of this record; if not will toggle all records in results
         */
        SelectionService.prototype.toggleSelectedRecords = function (record, source) {
            if (!!record) {
                var index = this.selectedRecords.findIndex(function (item) { return item.id === record.id; });
                if (index > -1) {
                    this.selectedRecords.splice(index, 1);
                    record.$selected = false;
                }
                else {
                    this.selectedRecords.push(this.getItem(record));
                    record.$selected = true;
                }
                // record might not be the one in the search service results (if passing a SelectionItem)
                var ssRecord = this.searchService.getRecordFromId(record.id);
                if (ssRecord) {
                    ssRecord.$selected = record.$selected;
                }
                this._events.next({ type: record.$selected ? exports.SelectionEventType.UNSELECT : exports.SelectionEventType.SELECT, records: [record], source: source });
            }
            else {
                if (this.allRecordsSelected) {
                    this.clearSelectedRecords(source);
                }
                else {
                    this.selectCurrentRecords(source);
                }
            }
        };
        /**
         * Moves a selected record to a different index;
         * @param record
         * @param newIndex
         */
        SelectionService.prototype.moveSelectedRecord = function (record, newIndex, source) {
            var i = this.selectedRecords.findIndex(function (r) { return r.id === record.id; });
            if (i === -1) {
                throw new Error("Record " + record.id + " is not in the selected records");
            }
            this.selectedRecords.splice(i, 1);
            this.selectedRecords.splice(newIndex, 0, this.getItem(record));
            this.events.next({ type: exports.SelectionEventType.MOVE, records: [record], source: source });
        };
        /**
         * Unselect all selected records
         * Emits a SelectionEvent
         */
        SelectionService.prototype.clearSelectedRecords = function (source) {
            var e_4, _b;
            this.selectedRecords.splice(0);
            var newUnselectedRecords = [];
            if (this.searchService.results && this.searchService.results.records) {
                try {
                    for (var _c = __values(this.searchService.results.records), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var record = _d.value;
                        if (record.$selected) {
                            record.$selected = false;
                            newUnselectedRecords.push(record);
                        }
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
            if (newUnselectedRecords.length > 0)
                this._events.next({ type: exports.SelectionEventType.UNSELECT, records: newUnselectedRecords, source: source });
        };
        SelectionService.prototype.buildSelectRecordsAction = function () {
            var _this = this;
            return new i2.Action({
                icon: "far fa-square",
                text: "msg#resultsSelector.selectDocuments",
                title: this.allRecordsSelected ? "msg#resultsSelector.unselectDocumentsTitle" : "msg#resultsSelector.selectDocumentsTitle",
                messageParams: { values: { count: this.selectedRecords.length } },
                action: function (item, $event) {
                    _this.toggleSelectedRecords(undefined, "multiple-selector");
                },
                updater: function (item) {
                    item.icon = _this.haveSelectedRecords ? "far fa-check-square" : "far fa-square";
                    item.title = _this.allRecordsSelected ? "msg#resultsSelector.unselectDocumentsTitle" : "msg#resultsSelector.selectDocumentsTitle";
                    item.messageParams = { values: { count: _this.selectedRecords.length } };
                }
            });
        };
        return SelectionService;
    }());
    SelectionService.ɵfac = function SelectionService_Factory(t) { return new (t || SelectionService)(i0.ɵɵinject(i1.SearchService), i0.ɵɵinject(SELECTION_OPTIONS)); };
    SelectionService.ɵprov = i0.ɵɵdefineInjectable({ token: SelectionService, factory: SelectionService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SelectionService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () {
            return [{ type: i1.SearchService }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [SELECTION_OPTIONS]
                        }] }];
        }, null);
    })();

    var BsResultSelector = /** @class */ (function () {
        function BsResultSelector(selectionService) {
            this.selectionService = selectionService;
        }
        return BsResultSelector;
    }());
    BsResultSelector.ɵfac = function BsResultSelector_Factory(t) { return new (t || BsResultSelector)(i0.ɵɵdirectiveInject(SelectionService)); };
    BsResultSelector.ɵcmp = i0.ɵɵdefineComponent({ type: BsResultSelector, selectors: [["sq-result-selector"]], inputs: { record: "record" }, decls: 6, vars: 7, consts: [[1, "sq-select-results-item", "custom-control", "custom-control-inline", "custom-checkbox", 3, "title"], ["type", "checkbox", 1, "custom-control-input", 3, "checked", "change"], [1, "custom-control-label"]], template: function BsResultSelector_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "label", 0);
                i0.ɵɵpipe(1, "sqMessage");
                i0.ɵɵpipe(2, "sqMessage");
                i0.ɵɵelementStart(3, "input", 1);
                i0.ɵɵlistener("change", function BsResultSelector_Template_input_change_3_listener() { return ctx.selectionService.toggleSelectedRecords(ctx.record, "result"); });
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(4, "span", 2);
                i0.ɵɵtext(5, "\u200B");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 3, ctx.record.$selected ? "msg#resultSelector.unselectDocument" : "msg#resultSelector.selectDocument"));
                i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(2, 5, ctx.record.$selected ? "msg#resultSelector.unselectDocument" : "msg#resultSelector.selectDocument"));
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("checked", ctx.record.$selected);
            }
        }, pipes: [i2$1.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsResultSelector, [{
                type: i0.Component,
                args: [{
                        selector: "sq-result-selector",
                        templateUrl: "./result-selector.html"
                    }]
            }], function () { return [{ type: SelectionService }]; }, { record: [{
                    type: i0.Input
                }] });
    })();

    var _c0 = function (a0, a1, a2, a3) { return { items: a0, size: a1, style: a2, rightAligned: a3 }; };
    var BsResultsSelector = /** @class */ (function () {
        function BsResultsSelector(selectionService) {
            this.selectionService = selectionService;
        }
        Object.defineProperty(BsResultsSelector.prototype, "actions", {
            get: function () {
                return this.rightAligned ? this.selectionService.selectionActions.slice().reverse() : this.selectionService.selectionActions;
            },
            enumerable: false,
            configurable: true
        });
        return BsResultsSelector;
    }());
    BsResultsSelector.ɵfac = function BsResultsSelector_Factory(t) { return new (t || BsResultsSelector)(i0.ɵɵdirectiveInject(SelectionService)); };
    BsResultsSelector.ɵcmp = i0.ɵɵdefineComponent({ type: BsResultsSelector, selectors: [["sq-results-selector"]], inputs: { size: "size", style: "style", rightAligned: "rightAligned" }, decls: 1, vars: 6, consts: [[1, "btn-group", 3, "sq-action-buttons"]], template: function BsResultsSelector_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelement(0, "div", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction4(1, _c0, ctx.actions, ctx.size, ctx.style, ctx.rightAligned));
            }
        }, directives: [i2.BsActionButtons], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsResultsSelector, [{
                type: i0.Component,
                args: [{
                        selector: "sq-results-selector",
                        templateUrl: "./results-selector.html"
                    }]
            }], function () { return [{ type: SelectionService }]; }, { size: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], rightAligned: [{
                    type: i0.Input
                }] });
    })();

    function BsSelectionArranger_div_1_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "div", 6);
        }
    }
    function BsSelectionArranger_div_1_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0);
        }
    }
    var _c0$1 = function (a0, a1) { return { $implicit: a0, index: a1 }; };
    function BsSelectionArranger_div_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r6_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2);
            i0.ɵɵtemplate(1, BsSelectionArranger_div_1_div_1_Template, 1, 0, "div", 3);
            i0.ɵɵtemplate(2, BsSelectionArranger_div_1_ng_container_2_Template, 1, 0, "ng-container", 4);
            i0.ɵɵelementStart(3, "i", 5);
            i0.ɵɵlistener("click", function BsSelectionArranger_div_1_Template_i_click_3_listener() { i0.ɵɵrestoreView(_r6_1); var record_r1 = ctx.$implicit; var ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.removeRecord(record_r1); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var record_r1 = ctx.$implicit;
            var i_r2 = ctx.index;
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngTemplateOutlet", ctx_r0.recordTpl)("ngTemplateOutletContext", i0.ɵɵpureFunction2(2, _c0$1, record_r1, i_r2));
        }
    }
    var BsSelectionArranger = /** @class */ (function () {
        function BsSelectionArranger(searchService, selectionService) {
            this.searchService = searchService;
            this.selectionService = selectionService;
            /**
             * Triggers event when the user moves or removes a record in the list.
             */
            this.change = new i0.EventEmitter();
        }
        BsSelectionArranger.prototype.getRecords = function () {
            return this.records || this.selectionService.getSelectedItems();
        };
        BsSelectionArranger.prototype.dropRecord = function (event) {
            if (event.isPointerOverContainer) { //https://material.angular.io/cdk/drag-drop/api#CdkDragExit
                if (this.records) {
                    i3.moveItemInArray(this.records, event.previousIndex, event.currentIndex); // Reorder the items when item dragged inside the drop zone
                }
                else {
                    var record = this.selectionService.getSelectedItems()[event.previousIndex];
                    this.selectionService.moveSelectedRecord(record, event.currentIndex);
                }
            }
            else {
                if (this.records) {
                    this.records.splice(event.previousIndex, 1);
                }
                else {
                    var record = this.selectionService.getSelectedItems()[event.previousIndex];
                    this.selectionService.toggleSelectedRecords(record, "selection-arranger");
                }
            }
            this.change.next(this.getRecords());
        };
        BsSelectionArranger.prototype.removeRecord = function (record) {
            if (this.records) {
                this.records.splice(this.records.indexOf(record), 1);
            }
            else {
                this.selectionService.toggleSelectedRecords(record, "selection-arranger");
            }
            this.change.next(this.getRecords());
        };
        return BsSelectionArranger;
    }());
    BsSelectionArranger.ɵfac = function BsSelectionArranger_Factory(t) { return new (t || BsSelectionArranger)(i0.ɵɵdirectiveInject(i1.SearchService), i0.ɵɵdirectiveInject(SelectionService)); };
    BsSelectionArranger.ɵcmp = i0.ɵɵdefineComponent({ type: BsSelectionArranger, selectors: [["sq-selection-arranger"]], contentQueries: function BsSelectionArranger_ContentQueries(rf, ctx, dirIndex) {
            if (rf & 1) {
                i0.ɵɵcontentQuery(dirIndex, i0.TemplateRef, true);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.recordTpl = _t.first);
            }
        }, inputs: { records: "records" }, outputs: { change: "change" }, decls: 2, vars: 1, consts: [["cdkDropList", "", 3, "cdkDropListDropped"], ["class", "card", "cdkDrag", "", 4, "ngFor", "ngForOf"], ["cdkDrag", "", 1, "card"], ["class", "record-placeholder", 4, "cdkDragPlaceholder"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "position-absolute", "fas", "fa-times", "record-close", 3, "click"], [1, "record-placeholder"]], template: function BsSelectionArranger_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵlistener("cdkDropListDropped", function BsSelectionArranger_Template_div_cdkDropListDropped_0_listener($event) { return ctx.dropRecord($event); });
                i0.ɵɵtemplate(1, BsSelectionArranger_div_1_Template, 4, 5, "div", 1);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", ctx.getRecords());
            }
        }, directives: [i3.CdkDropList, i4.NgForOf, i3.CdkDrag, i3.CdkDragPlaceholder, i4.NgTemplateOutlet], styles: [".record-close[_ngcontent-%COMP%]{cursor:pointer;right:1rem;top:.25em}.cdk-drag-preview[_ngcontent-%COMP%]{border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);box-sizing:border-box}.cdk-drag-animating[_ngcontent-%COMP%], .record-placeholder[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}.record-placeholder[_ngcontent-%COMP%]{background:#ccc;border:3px dotted #999;cursor:move;height:8rem}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsSelectionArranger, [{
                type: i0.Component,
                args: [{
                        selector: "sq-selection-arranger",
                        templateUrl: "./selection-arranger.component.html",
                        styleUrls: ["./selection-arranger.component.scss"]
                    }]
            }], function () { return [{ type: i1.SearchService }, { type: SelectionService }]; }, { records: [{
                    type: i0.Input
                }], recordTpl: [{
                    type: i0.ContentChild,
                    args: [i0.TemplateRef, { static: false }]
                }], change: [{
                    type: i0.Output
                }] });
    })();

    var BsSelectionModule = /** @class */ (function () {
        function BsSelectionModule() {
        }
        return BsSelectionModule;
    }());
    BsSelectionModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsSelectionModule });
    BsSelectionModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsSelectionModule_Factory(t) { return new (t || BsSelectionModule)(); }, providers: [
            { provide: SELECTION_OPTIONS, useValue: defaultSelectionOptions }
        ], imports: [[
                i4.CommonModule,
                i3.DragDropModule,
                i2$1.IntlModule,
                i2.BsActionModule,
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsSelectionModule, { declarations: [BsResultsSelector, BsResultSelector, BsSelectionArranger], imports: [i4.CommonModule,
                i3.DragDropModule,
                i2$1.IntlModule,
                i2.BsActionModule], exports: [BsResultsSelector, BsResultSelector, BsSelectionArranger] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsSelectionModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i4.CommonModule,
                            i3.DragDropModule,
                            i2$1.IntlModule,
                            i2.BsActionModule,
                        ],
                        declarations: [
                            BsResultsSelector, BsResultSelector, BsSelectionArranger
                        ],
                        exports: [
                            BsResultsSelector, BsResultSelector, BsSelectionArranger
                        ],
                        providers: [
                            { provide: SELECTION_OPTIONS, useValue: defaultSelectionOptions }
                        ]
                    }]
            }], null, null);
    })();

    var _enSelection = {
        "resultSelector": {
            "selectDocument": "Select document",
            "unselectDocument": "Unselect document"
        },
        "resultsSelector": {
            "selectDocuments": "{count, selectordinal, =0 {} other {(#)}}",
            "selectDocumentsTitle": "Select documents",
            "unselectDocumentsTitle": "Unselect documents"
        },
        "selection": {
            "selectedDocuments": "{count, plural, =0 {} one {# selected document} other {# selected documents}}"
        }
    };

    var _frSelection = {
        "resultSelector": {
            "selectDocument": "Sélectionner le document",
            "unselectDocument": "Désélectionner le document"
        },
        "resultsSelector": {
            "selectDocuments": "{count, selectordinal, =0 {} other {(#)}}",
            "selectDocumentsTitle": "Sélectionner les documents",
            "unselectDocumentsTitle": "Désélectionner les documents",
        },
        "selection": {
            "selectedDocuments": "{count, plural, =0 {} one {# document sélectionné} other {# documents sélectionnés}}"
        }
    };

    var _deSelection = {
        "resultSelector": {
            "selectDocument": "Dokument auswählen",
            "unselectDocument": "Dokumentauswahl aufheben"
        },
        "resultsSelector": {
            "selectDocuments": "{count, selectordinal, =0 {} other {(#)}}",
            "selectDocumentsTitle": "Dokumente auswählen",
            "unselectDocumentsTitle": "Dokumentauswahl aufheben",
        },
        "selection": {
            "selectedDocuments": "{count, plural, =0 {} one {# ausgewähltes Dokument} other {# ausgewählte Dokumente}}"
        }
    };

    var enSelection = base.Utils.merge({}, _enSelection, i1.enSearch);
    var frSelection = base.Utils.merge({}, _frSelection, i1.frSearch);
    var deSelection = base.Utils.merge({}, _deSelection, i1.deSearch);

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BsResultSelector = BsResultSelector;
    exports.BsResultsSelector = BsResultsSelector;
    exports.BsSelectionArranger = BsSelectionArranger;
    exports.BsSelectionModule = BsSelectionModule;
    exports.SELECTION_OPTIONS = SELECTION_OPTIONS;
    exports.SelectionService = SelectionService;
    exports.deSelection = deSelection;
    exports.defaultSelectionOptions = defaultSelectionOptions;
    exports.enSelection = enSelection;
    exports.frSelection = frSelection;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-selection.umd.js.map
