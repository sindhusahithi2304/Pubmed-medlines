(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@sinequa/components/utils'), require('@sinequa/core/base'), require('rxjs'), require('rxjs/operators'), require('@sinequa/core/app-utils'), require('@sinequa/core/web-services')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/autocomplete', ['exports', '@angular/core', '@angular/common', '@sinequa/components/utils', '@sinequa/core/base', 'rxjs', 'rxjs/operators', '@sinequa/core/app-utils', '@sinequa/core/web-services'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components.autocomplete = {}), global.ng.core, global.ng.common, global.sinequa.components.utils, global.sinequa.core.base, global.rxjs, global.rxjs.operators, global.sinequa.core['app-utils'], global.sinequa.core['web-services']));
}(this, (function (exports, i0, i1, i3, base, rxjs, operators, i2, i1$1) { 'use strict';

    var _c0 = ["itemTpl"];
    var _c1 = ["footerTpl"];
    function BsAutocompleteList_div_0_a_2_ng_container_1_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0);
        }
    }
    var _c2 = function (a0) { return { $implicit: a0 }; };
    function BsAutocompleteList_div_0_a_2_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsAutocompleteList_div_0_a_2_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 7);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var item_r3 = i0.ɵɵnextContext().$implicit;
            var ctx_r5 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngTemplateOutlet", ctx_r5.itemTpl)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c2, item_r3));
        }
    }
    var _c3 = function (a0) { return { "list-group-item-primary": a0 }; };
    var _c4 = function (a0, a1) { return { active: a0, first: a1 }; };
    function BsAutocompleteList_div_0_a_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r9_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 5);
            i0.ɵɵlistener("click", function BsAutocompleteList_div_0_a_2_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r9_1); var item_r3 = ctx.$implicit; var ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8._itemClicked(item_r3, $event); });
            i0.ɵɵtemplate(1, BsAutocompleteList_div_0_a_2_ng_container_1_Template, 2, 4, "ng-container", 6);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r3 = ctx.$implicit;
            var i_r4 = ctx.index;
            var ctx_r1 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c3, ctx_r1._isSelected(item_r3, i_r4)))("sqScrollIntoView", i0.ɵɵpureFunction2(5, _c4, ctx_r1._isSelected(item_r3, i_r4), i_r4 === 0));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r1.itemTpl);
        }
    }
    function BsAutocompleteList_div_0_div_3_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0);
        }
    }
    function BsAutocompleteList_div_0_div_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 8);
            i0.ɵɵtemplate(1, BsAutocompleteList_div_0_div_3_ng_container_1_Template, 1, 0, "ng-container", 7);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngTemplateOutlet", ctx_r2.footerTpl)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c2, ctx_r2._items));
        }
    }
    function BsAutocompleteList_div_0_Template(rf, ctx) {
        if (rf & 1) {
            var _r12_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵlistener("mousedown", function BsAutocompleteList_div_0_Template_div_mousedown_0_listener($event) { i0.ɵɵrestoreView(_r12_1); var ctx_r11 = i0.ɵɵnextContext(); return ctx_r11._mouseDown($event); });
            i0.ɵɵelementStart(1, "div", 2);
            i0.ɵɵtemplate(2, BsAutocompleteList_div_0_a_2_Template, 2, 8, "a", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(3, BsAutocompleteList_div_0_div_3_Template, 2, 4, "div", 4);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx_r0._items);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.footerTpl);
        }
    }
    var BsAutocompleteList = /** @class */ (function () {
        function BsAutocompleteList(changeDetectorRef) {
            this.changeDetectorRef = changeDetectorRef;
            /**
             * Event emitter for clicks on an autocomplete item
             */
            this.clicked = new i0.EventEmitter();
            this._active = false;
            this._cursor = -1;
        }
        /**
         * Update the data and state of this component
         * @param active whether the component should be displayed
         * @param items The list of items to display
         */
        BsAutocompleteList.prototype.update = function (active, items) {
            //console.log("autocomplete update ", active, items);
            this._active = active;
            this._items = items;
            this._cursor = -1;
            this.changeDetectorRef.markForCheck();
        };
        Object.defineProperty(BsAutocompleteList.prototype, "hasItems", {
            /**
             * Whether there are any item to display
             */
            get: function () {
                return this._active && !!this._items && this._items.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsAutocompleteList.prototype, "selectedValue", {
            /**
             * Returns the currently selected item, if any
             */
            get: function () {
                if (this._items && this._cursor >= 0 && this._cursor < this._items.length)
                    return this._items[this._cursor];
                return undefined;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Select the next item in the list and returns it
         */
        BsAutocompleteList.prototype.selectNext = function () {
            if (this._items && this._cursor < this._items.length - 1) {
                this._cursor++;
            }
            return this.selectedValue;
        };
        /**
         * Select the previous item in the list and returns it
         */
        BsAutocompleteList.prototype.selectPrevious = function () {
            if (this._cursor > 0)
                this._cursor--;
            return this.selectedValue;
        };
        /**
         * Test whether an item is selected
         * @param item
         * @param i
         */
        BsAutocompleteList.prototype._isSelected = function (item, i) {
            return this._cursor === i;
        };
        /**
         * Listen to click events and emits events
         * @param item
         * @param event
         */
        BsAutocompleteList.prototype._itemClicked = function (item, event) {
            this.clicked.next(item);
            event.stopPropagation();
            return false;
        };
        /**
         * This prevents the focus to be removed from the <input>, which clauses the dropdown
         */
        BsAutocompleteList.prototype._mouseDown = function (event) {
            event.preventDefault();
        };
        return BsAutocompleteList;
    }());
    BsAutocompleteList.ɵfac = function BsAutocompleteList_Factory(t) { return new (t || BsAutocompleteList)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    BsAutocompleteList.ɵcmp = i0.ɵɵdefineComponent({ type: BsAutocompleteList, selectors: [["sq-autocomplete-list"]], contentQueries: function BsAutocompleteList_ContentQueries(rf, ctx, dirIndex) {
            if (rf & 1) {
                i0.ɵɵcontentQuery(dirIndex, _c0, true);
                i0.ɵɵcontentQuery(dirIndex, _c1, true);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.itemTpl = _t.first);
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.footerTpl = _t.first);
            }
        }, outputs: { clicked: "clicked" }, decls: 1, vars: 1, consts: [["class", "sq-autocomplete-list card position-absolute", 3, "mousedown", 4, "ngIf"], [1, "sq-autocomplete-list", "card", "position-absolute", 3, "mousedown"], [1, "list-group", "list-group-flush"], ["href", "#", "class", "list-group-item list-group-item-action p-0 border-0", 3, "ngClass", "sqScrollIntoView", "click", 4, "ngFor", "ngForOf"], ["class", "card-footer", 4, "ngIf"], ["href", "#", 1, "list-group-item", "list-group-item-action", "p-0", "border-0", 3, "ngClass", "sqScrollIntoView", "click"], [4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "card-footer"]], template: function BsAutocompleteList_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsAutocompleteList_div_0_Template, 4, 2, "div", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.hasItems);
            }
        }, directives: [i1.NgIf, i1.NgForOf, i1.NgClass, i3.ScrollIntoView, i1.NgTemplateOutlet], styles: [".sq-autocomplete-list[_ngcontent-%COMP%]{box-shadow:0 2px 5px 1px #d3d3d3;width:100%;z-index:10}.list-group[_ngcontent-%COMP%]{max-height:500px;overflow:auto}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsAutocompleteList, [{
                type: i0.Component,
                args: [{
                        selector: "sq-autocomplete-list",
                        templateUrl: "./autocomplete-list.html",
                        styleUrls: ["./autocomplete-list.css"]
                    }]
            }], function () { return [{ type: i0.ChangeDetectorRef }]; }, { itemTpl: [{
                    type: i0.ContentChild,
                    args: ["itemTpl", { static: false }]
                }], footerTpl: [{
                    type: i0.ContentChild,
                    args: ["footerTpl", { static: false }]
                }], clicked: [{
                    type: i0.Output
                }] });
    })();

    function BsFieldSearchItemsComponent_span_0_Template(rf, ctx) {
        if (rf & 1) {
            var _r3_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "span", 1);
            i0.ɵɵtext(1);
            i0.ɵɵelementStart(2, "span", 2);
            i0.ɵɵlistener("click", function BsFieldSearchItemsComponent_span_0_Template_span_click_2_listener() { i0.ɵɵrestoreView(_r3_1); var item_r1 = ctx.$implicit; var ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.removeItem(item_r1); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r1 = ctx.$implicit;
            i0.ɵɵproperty("ngClass", item_r1.category);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", item_r1.display, " ");
        }
    }
    var BsFieldSearchItemsComponent = /** @class */ (function () {
        function BsFieldSearchItemsComponent(changeDetectorRef) {
            this.changeDetectorRef = changeDetectorRef;
            this.itemRemoved = new i0.EventEmitter();
            this.items = [];
        }
        BsFieldSearchItemsComponent.prototype.update = function (items) {
            this.items = items;
            this.changeDetectorRef.markForCheck();
        };
        BsFieldSearchItemsComponent.prototype.removeItem = function (item) {
            this.itemRemoved.next(item);
            this.changeDetectorRef.markForCheck();
        };
        return BsFieldSearchItemsComponent;
    }());
    BsFieldSearchItemsComponent.ɵfac = function BsFieldSearchItemsComponent_Factory(t) { return new (t || BsFieldSearchItemsComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    BsFieldSearchItemsComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsFieldSearchItemsComponent, selectors: [["sq-field-search-items"]], outputs: { itemRemoved: "itemRemoved" }, decls: 1, vars: 1, consts: [["class", "badge badge-pill badge-info align-self-center mr-1", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "badge", "badge-pill", "badge-info", "align-self-center", "mr-1", 3, "ngClass"], [1, "fas", "fa-times-circle", "clickable", 3, "click"]], template: function BsFieldSearchItemsComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsFieldSearchItemsComponent_span_0_Template, 3, 2, "span", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngForOf", ctx.items);
            }
        }, directives: [i1.NgForOf, i1.NgClass], styles: ["[_nghost-%COMP%] {\n    display: flex;\n}\n.clickable[_ngcontent-%COMP%] {\n    cursor: pointer;\n}\n.clickable[_ngcontent-%COMP%]:hover {\n    opacity: 85%;\n}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsFieldSearchItemsComponent, [{
                type: i0.Component,
                args: [{
                        selector: "sq-field-search-items",
                        template: "\n<span *ngFor=\"let item of items\" class=\"badge badge-pill badge-info align-self-center mr-1\" [ngClass]=\"item.category\">\n    {{item.display}} <span class=\"fas fa-times-circle clickable\" (click)=\"removeItem(item)\"></span>\n</span>\n",
                        styles: ["\n:host {\n    display: flex;\n}\n.clickable {\n    cursor: pointer;\n}\n.clickable:hover {\n    opacity: 85%;\n}\n"]
                    }]
            }], function () { return [{ type: i0.ChangeDetectorRef }]; }, { itemRemoved: [{
                    type: i0.Output
                }] });
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

    var SuggestService = /** @class */ (function () {
        function SuggestService(suggestQueryWebService, suggestFieldWebService, appService) {
            this.suggestQueryWebService = suggestQueryWebService;
            this.suggestFieldWebService = suggestFieldWebService;
            this.appService = appService;
            this.fieldCategory = "$field$";
        }
        SuggestService.prototype.addFields = function (text, suggests) {
            var e_1, _a;
            if (text.includes(" ")) {
                return;
            }
            try {
                for (var _b = __values(this.appService.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var field = _c.value;
                    if (base.Utils.startsWith(field, text)) {
                        suggests.unshift({
                            category: this.fieldCategory,
                            display: field
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
        };
        SuggestService.prototype.get = function (suggestQuery, text, fields, query) {
            var _this = this;
            if (!this.appService.ccquery) {
                return rxjs.of([]);
            }
            var observable = this.suggestQueryWebService.get(suggestQuery, text, this.appService.ccquery.name, fields);
            return observable.pipe(operators.flatMap(function (suggests) {
                var e_2, _a;
                if (!fields) {
                    if (!suggests) {
                        suggests = [];
                    }
                    _this.addFields(text, suggests);
                }
                else {
                    if (!suggests || suggests.length === 0) {
                        var _fields = base.Utils.isArray(fields) ? fields : [fields];
                        fields = [];
                        try {
                            for (var _fields_1 = __values(_fields), _fields_1_1 = _fields_1.next(); !_fields_1_1.done; _fields_1_1 = _fields_1.next()) {
                                var field = _fields_1_1.value;
                                var column = _this.appService.getColumn(field);
                                if (!!column && (column.eType === 15 /* csv */ || i2.AppService.isScalar(column))) {
                                    fields.push(field);
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_fields_1_1 && !_fields_1_1.done && (_a = _fields_1.return)) _a.call(_fields_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        if (fields.length > 0) {
                            return _this.suggestFieldWebService.get(text, fields, query).pipe(operators.map(function (suggests) {
                                suggests.forEach(function (value) { return value.display = base.Utils.toSqlValue(value.display); }); // because dates get automatically converted by the interceptor
                                return suggests;
                            }));
                        }
                    }
                }
                return rxjs.of(suggests);
            }));
        };
        /**
         * Search for the input text in a list of objects and return autocomplete items asynchronously
         * @param query The text to search for
         * @param data The list of objects
         * @param primaryText A function that returns the primary text input given the object
         * @param secondaryText An (optional) function that returns a list of secondary text inputs given the object
         */
        SuggestService.prototype.searchData = function (category, query, data, primaryText, secondaryText, label) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, data
                            .map(function (obj) { return SuggestService.findMatch(primaryText(obj), query, !!secondaryText ? secondaryText(obj) : [], obj); }) // Look for matches in all saved queries
                            .filter(function (item) { return !!item; }) // Keep only the matches
                            .sort(function (a, b) { return b.score - a.score; }) // Sort by decreasing score
                            .map(function (item) {
                            item = item;
                            return {
                                display: item.display,
                                displayHtml: item.displayHtml,
                                category: category,
                                label: label || category,
                                data: item.data,
                                score: item.score
                            };
                        })];
                });
            });
        };
        /**
         * Searches for the query string inside a given text. Returns a match object containing:
         * - a score proportional to the number and quality of matches
         * - the text formatted as HTML with the query found in the text
         * @param text The text to search
         * @param query The string to search for
         * @param secondaryText Secondary fields to search input, with less importance than the primary field
         * @param data A data object to be included in the match object (for convenience mostly)
         */
        SuggestService.findMatch = function (text, query, secondaryText, data) {
            var _this = this;
            if (!text || !query) {
                return undefined;
            }
            // pass text and query in lower case and no accent to make search case insensitive
            var textLower = base.Utils.removeAccents(text.toLowerCase());
            query = base.Utils.removeAccents(query.toLowerCase());
            var i = 0;
            var matches = [];
            var score = 0;
            // Compute score of the match
            i = textLower.indexOf(query);
            while (i !== -1) { // While there's a match
                matches.push(i);
                if (i === 0) { // Start of the text
                    score += 4;
                }
                else if (textLower[i - 1] === " ") { // Start of a word
                    score += 2;
                }
                else {
                    score += 1; // Middle of a word
                }
                i = textLower.indexOf(query, i + query.length);
            }
            // Format HTML display
            var html = text;
            for (var j = matches.length - 1; j >= 0; j--) { // decreasing order so the indices remain valid
                i = matches[j];
                html = html.slice(0, i).concat("<strong>", html.slice(i, i + query.length), "</strong>", html.slice(i + query.length));
            }
            // Secondary text
            if (secondaryText) {
                secondaryText
                    .map(function (t) { return _this.findMatch(t, query); }) // Search each secondary text for matches
                    .filter(function (item) { return !!item; }) // Keep only the matches
                    .sort(function (a, b) { return b.score - a.score; }) // Sort by decreasing score
                    .forEach(function (match) {
                    match = match;
                    score += match.score / 2; // Secondary matches added to the score, but count half
                    html += " <small>" + match.displayHtml + "</small>"; // Concatenate secondary match html to the main html
                });
            }
            if (score > 0) {
                return {
                    display: text,
                    displayHtml: html,
                    score: score,
                    data: data
                };
            }
            return undefined;
        };
        return SuggestService;
    }());
    SuggestService.ɵfac = function SuggestService_Factory(t) { return new (t || SuggestService)(i0.ɵɵinject(i1$1.SuggestQueryWebService), i0.ɵɵinject(i1$1.SuggestFieldWebService), i0.ɵɵinject(i2.AppService)); };
    SuggestService.ɵprov = i0.ɵɵdefineInjectable({ token: SuggestService, factory: SuggestService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SuggestService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () { return [{ type: i1$1.SuggestQueryWebService }, { type: i1$1.SuggestFieldWebService }, { type: i2.AppService }]; }, null);
    })();

    (function (AutocompleteState) {
        AutocompleteState["OFF"] = "OFF";
        AutocompleteState["INIT"] = "INIT";
        AutocompleteState["START"] = "START";
        AutocompleteState["ACTIVE"] = "ACTIVE";
        AutocompleteState["OPENED"] = "OPENED";
        AutocompleteState["SELECTED"] = "SELECTED"; // Input is focused, an input from the dropdown was selected
    })(exports.AutocompleteState || (exports.AutocompleteState = {}));
    var Autocomplete = /** @class */ (function () {
        // Initialization
        function Autocomplete(elementRef, suggestService, appService, uiService) {
            var _this = this;
            this.suggestService = suggestService;
            this.appService = appService;
            this.uiService = uiService;
            /** Debounce delay between autocomplete queries */
            this.suggestDelay = 200;
            /** Custom placeholder */
            this.placeholder = '';
            // Event emitters
            this.stateChange = new i0.EventEmitter();
            this.submit = new i0.EventEmitter();
            this._state = exports.AutocompleteState.INIT;
            /**
             * Use the suggest service to retrieve suggestions given the input text.
             * The suggest (autocomplete) query is debounded to avoid flooding the server.
             */
            this.debounceSuggest = base.Utils.debounce(function () {
                _this.getSuggests();
            }, this.suggestDelay);
            this.inputElement = elementRef.nativeElement;
        }
        /**
         * On initialization, we listen to the autocomplete component for
         * selection events
         */
        Autocomplete.prototype.ngOnInit = function () {
            var _this = this;
            this._dropdownSubscription = this.dropdown.clicked.subscribe(function (item) {
                _this.select(item, true); // An item was selected from the autocomplete => take the value
            });
            this._placeholder = this.placeholder;
            this.inputElement.focus();
            this.start();
        };
        /**
         * If the off input changes state, react accordingly
         * @param changes
         */
        Autocomplete.prototype.ngOnChanges = function (changes) {
            // Turn on the autocomplete
            if (changes["off"] && !this.off) {
                this.start();
            }
        };
        /**
         * Unsubscribe when destroying the component
         */
        Autocomplete.prototype.ngOnDestroy = function () {
            if (this._dropdownSubscription) {
                this._dropdownSubscription.unsubscribe();
            }
        };
        // Getters and Setters
        /**
         * Return the current state of the autocomplete
         */
        Autocomplete.prototype.getState = function () {
            return this._state;
        };
        /**
         * Set the current state of the autocomplete
         */
        Autocomplete.prototype.setState = function (state) {
            if (this.off) {
                if (this._state !== exports.AutocompleteState.OFF) {
                    this._state = exports.AutocompleteState.OFF;
                    this.stateChange.next(this.getState());
                }
                // ignore state change if Autocomplete is off
            }
            else if (!!state && this._state !== state) {
                this._state = state;
                //console.log("STATE: ", this._state);
                this.stateChange.next(this.getState());
            }
        };
        /**
         * Get the current text value of the HTML <input>
         * to which this directive is attached
         */
        Autocomplete.prototype.getInputValue = function () {
            return this.inputElement.value;
        };
        /**
         * Set the current text value of the HTML <input>
         * to which this directive is attached
         */
        Autocomplete.prototype.setInputValue = function (value) {
            // Using setCaret() allows to properly update the underlying form
            this.uiService.setCaret(this.inputElement, 0, -1, value); // 0, -1 erases the current value and writes the new one
        };
        /**
         * Sets the content of the <input> based on the given
         * Autocomplete Item (various implementations are possible,
         * depending on the item content and nature).
         * This would be the right method to override to implement
         * fielded search autocomplete.
         * @returns true if this autocomplete item should be searched
         */
        Autocomplete.prototype.setAutocompleteItem = function (item) {
            if (item) {
                this.setInputValue(item.display);
                return true;
            }
            return false;
        };
        // Methods triggering state changes
        /**
         * INIT state (Input is not focused, dropdown is closed)
         */
        Autocomplete.prototype.init = function () {
            this.setState(exports.AutocompleteState.INIT);
            this.dropdown.update(false); // If the dropdown was active
        };
        /**
         * START state (Input is focused, no text typed in, dropdown is closed)
         */
        Autocomplete.prototype.start = function () {
            this.setState(exports.AutocompleteState.START);
            this.dropdown.update(false); // If the dropdown was active
        };
        /**
         * START state and if the <input> has content, immediately switch to ACTIVE
         */
        Autocomplete.prototype.startOrActive = function () {
            if (this.getState() !== exports.AutocompleteState.ACTIVE && this.getState() !== exports.AutocompleteState.OPENED) { // Avoid flickering
                this.start();
                if (!!this.getInputValue()) {
                    this.active();
                }
            }
        };
        /**
         * ACTIVE state (Input is focused, text is typed, suggests are being queried, dropdown is closed)
         */
        Autocomplete.prototype.active = function () {
            if (this.getState() === exports.AutocompleteState.START || this.getState() === exports.AutocompleteState.ACTIVE || this.getState() === exports.AutocompleteState.OPENED) {
                this.setState(exports.AutocompleteState.ACTIVE);
                this.dropdown.update(false); // If the dropdown was active
                this.suggest();
            }
        };
        /**
         * Select the given autocomplete suggestion for search
         * @param submit if, true also trigger a submit
         * @param item a specific item to submit
         */
        Autocomplete.prototype.select = function (item, submit) {
            this.setState(exports.AutocompleteState.SELECTED); // Change state BEFORE setting input value, so the event is correctly processed
            var searchable = this.setAutocompleteItem(item);
            this.dropdown.update(false); // Close dropdown
            if (submit && searchable)
                this.submit.next();
        };
        /**
         * Switch to OPENED state (from ACTIVE only)
         */
        Autocomplete.prototype.open = function () {
            if (this.getState() === exports.AutocompleteState.ACTIVE) {
                this.setState(exports.AutocompleteState.OPENED);
            }
        };
        /**
         * Request suggestions from the server, and update the dropdown contents
         * and autocomplete state asynchronously.
         * Override this method for a synchronous implementation.
         */
        Autocomplete.prototype.suggest = function () {
            this.debounceSuggest();
        };
        /**
         * Actually makes the API call to the suggestService to retrieve suggestions
         * and process them.
         */
        Autocomplete.prototype.getSuggests = function () {
            var value = this.getInputValue();
            if (value) { // If there is text, make a call to the suggest API
                this.processSuggests(this.getSuggestsObs(value));
            }
            else { // If empty input, restart autocomplete
                this.start();
            }
        };
        /**
         * Returns an observable of Suggestions, given some input text
         * @param value input text for which to return suggestions
         */
        Autocomplete.prototype.getSuggestsObs = function (value, fields) {
            return this.suggestService.get(this.suggestQuery, value, fields);
        };
        /**
         * Process suggestions obtained (from whatever mean):
         * - If data available, filter out fields
         * - update the dropdown content
         * - Switch between OPEN and ACTIVE states
         * - Use changeDetectorRef to update display
         * @param obs an observable of AutocompleteItem suggestions
         */
        Autocomplete.prototype.processSuggests = function (obs) {
            var _this = this;
            obs.subscribe(function (suggests) {
                if (_this.getState() === exports.AutocompleteState.ACTIVE || _this.getState() === exports.AutocompleteState.OPENED) {
                    _this.dropdown.update(true, suggests
                        .filter(function (item) { return item.category !== "$field$"; }) // Filter out fields
                        .map(function (item) {
                        if (!item.label) {
                            item.label = _this.appService.getLabel(item.category);
                        }
                        return item;
                    }));
                }
            }, function (err) {
                _this.dropdown.update(false);
            }, function () {
                if (_this.dropdown.hasItems && _this.getState() === exports.AutocompleteState.ACTIVE) {
                    _this.open(); // Switch from ACTIVE to OPENED (if not already)
                }
                else if (!_this.dropdown.hasItems && _this.getState() === exports.AutocompleteState.OPENED) { // No data
                    _this.active(); // Switch from OPENED to ACTIVE (if not already)
                }
            });
        };
        /**
         * Returns the caret position within the input
         */
        Autocomplete.prototype.getInputPosition = function () {
            // Come back before trailing spaces so the preceding value is still seen as the input value
            // (needed for ExprParser to stop autocomplete being cancelled on entering trailing spaces)
            var position = this.uiService.getCaret(this.inputElement).start;
            var length = base.Utils.len(base.Utils.trimEnd(this.getInputValue()));
            return Math.min(position, length);
        };
        /**
         * The following are event listeners applied to the <input> host component
         * onto which this directive is applied.
         * The events affect the state of the autocomplete, which triggers
         * various actions (call to suggest API, etc.).
         */
        /**
         * Listens to click events on the <input> host
         */
        Autocomplete.prototype.click = function () {
            //console.log("input clicked");
            this.startOrActive();
        };
        /**
         * Listens to touchstart events (mobile clicks) on the <input> host
         */
        Autocomplete.prototype.touchstart = function () {
            //console.log("input touchstart");
            this.startOrActive();
        };
        /**
         * Listens to focus events on the <input> host
         */
        Autocomplete.prototype.focus = function () {
            //console.log("input focus gained");
            this.start();
        };
        /**
         * Listens to blur events (out of focus) on the <input> host
         */
        Autocomplete.prototype.blur = function (event) {
            //console.log("input focus lost");
            this.init();
        };
        /**
         * Listen to any change in the <input> content and react
         * according to the current state of the autocomplete
         * @param event
         */
        Autocomplete.prototype.inputChanged = function (event) {
            //console.log("input value changed");
            switch (this.getState()) {
                case exports.AutocompleteState.OPENED:
                    this.suggest(); // Just request more data, but no state change
                    break;
                case exports.AutocompleteState.START:
                case exports.AutocompleteState.ACTIVE:
                    this.active(); // get more data, and change state if not already ACTIVE
                    break;
                case exports.AutocompleteState.SELECTED:
                    this.start(); // The model changed because we selected a value ==> we restart in case the user keeps typing
                    break;
                case exports.AutocompleteState.INIT:
                    console.error("Should not be in INIT state if the form changes");
                    break;
            }
        };
        /**
         * Listen to user's keyboard actions in the <input>, in order to navigate
         * and select the autocomplete suggestions.
         * @param event the keyboard
         */
        Autocomplete.prototype.keydown = function (event) {
            // Navigation in the opened dropdown
            if (this.getState() === exports.AutocompleteState.OPENED) {
                switch (event.keyCode) {
                    case base.Keys.up:
                        this.dropdown.selectPrevious();
                        return false; // prevent default
                    case base.Keys.down:
                        this.dropdown.selectNext();
                        return false; // prevent default
                    case base.Keys.tab:
                        if (!!this.dropdown.selectedValue) {
                            this.select(this.dropdown.selectedValue);
                        }
                        else {
                            this.dropdown.selectNext();
                        }
                        return false; // prevent default (change focus)
                    case base.Keys.esc:
                        this.start(); // Just restart the autocomplete
                        //event.stopPropagation(); // needed?
                        return false; // prevent default
                    case base.Keys.enter:
                        if (!!this.dropdown.selectedValue) {
                            this.select(this.dropdown.selectedValue, true);
                            //event.stopPropagation(); // needed?
                            return false; // prevent default action (auto submit)
                        }
                }
            }
            // If a search was triggered, restart the autocomplete
            if (event.keyCode === base.Keys.enter) {
                this.submit.next();
                this.start();
            }
            return undefined;
        };
        return Autocomplete;
    }());
    Autocomplete.ɵfac = function Autocomplete_Factory(t) { return new (t || Autocomplete)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(SuggestService), i0.ɵɵdirectiveInject(i2.AppService), i0.ɵɵdirectiveInject(i3.UIService)); };
    Autocomplete.ɵdir = i0.ɵɵdefineDirective({ type: Autocomplete, selectors: [["", "sqAutocomplete", ""]], hostVars: 1, hostBindings: function Autocomplete_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function Autocomplete_click_HostBindingHandler() { return ctx.click(); })("touchstart", function Autocomplete_touchstart_HostBindingHandler() { return ctx.touchstart(); })("focus", function Autocomplete_focus_HostBindingHandler() { return ctx.focus(); })("blur", function Autocomplete_blur_HostBindingHandler($event) { return ctx.blur($event); })("input", function Autocomplete_input_HostBindingHandler($event) { return ctx.inputChanged($event); })("keydown", function Autocomplete_keydown_HostBindingHandler($event) { return ctx.keydown($event); });
            }
            if (rf & 2) {
                i0.ɵɵattribute("placeholder", ctx._placeholder);
            }
        }, inputs: { dropdown: "dropdown", off: "off", suggestDelay: "suggestDelay", suggestQuery: "suggestQuery", placeholder: "placeholder" }, outputs: { stateChange: "stateChange", submit: "submit" }, features: [i0.ɵɵNgOnChangesFeature] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(Autocomplete, [{
                type: i0.Directive,
                args: [{
                        selector: "[sqAutocomplete]"
                    }]
            }], function () { return [{ type: i0.ElementRef }, { type: SuggestService }, { type: i2.AppService }, { type: i3.UIService }]; }, { dropdown: [{
                    type: i0.Input
                }], off: [{
                    type: i0.Input
                }], suggestDelay: [{
                    type: i0.Input
                }], suggestQuery: [{
                    type: i0.Input
                }], placeholder: [{
                    type: i0.Input
                }], _placeholder: [{
                    type: i0.HostBinding,
                    args: ['attr.placeholder']
                }], stateChange: [{
                    type: i0.Output
                }], submit: [{
                    type: i0.Output
                }], click: [{
                    type: i0.HostListener,
                    args: ["click"]
                }], touchstart: [{
                    type: i0.HostListener,
                    args: ["touchstart"]
                }], focus: [{
                    type: i0.HostListener,
                    args: ["focus"]
                }], blur: [{
                    type: i0.HostListener,
                    args: ["blur", ["$event"]]
                }], inputChanged: [{
                    type: i0.HostListener,
                    args: ["input", ["$event"]]
                }], keydown: [{
                    type: i0.HostListener,
                    args: ["keydown", ["$event"]]
                }] });
    })();

    var AutocompleteFieldSearch = /** @class */ (function (_super) {
        __extends(AutocompleteFieldSearch, _super);
        function AutocompleteFieldSearch(elementRef, suggestService, appService, uiService, exprBuilder) {
            var _this = _super.call(this, elementRef, suggestService, appService, uiService) || this;
            _this.exprBuilder = exprBuilder;
            // FIELDED SEARCH
            /**
             * "text" mode: fielded search is entirely managed as text in the <input> component
             * "selects" mode: fielded search stores the selected autocomplete items to create selections, while keeping a clean <input> content (better UI/UX but does not support operators like OR, NOT, and parentheses)
             */
            _this.fieldSearchMode = "text";
            /** Fields excluded from fielded search (searched as regular strings if selected) */
            _this.excludedFields = ["concepts"];
            /** Stores the selected fielded search items selected via Tab */
            _this.fieldSearchItems = [];
            // Event emitters
            _this.parse = new i0.EventEmitter();
            return _this;
        }
        /**
         * If the off input changes state, react accordingly
         * @param changes
         */
        AutocompleteFieldSearch.prototype.ngOnChanges = function (changes) {
            var _this = this;
            var _a;
            _super.prototype.ngOnChanges.call(this, changes);
            // Subscribe to the field search items's container
            if (changes["fieldSearchItemsContainer"] && this.fieldSearchItemsContainer) {
                if (this._fieldSearchSubscription) {
                    this._fieldSearchSubscription.unsubscribe();
                }
                this._fieldSearchSubscription = this.fieldSearchItemsContainer.itemRemoved.subscribe(function (item) {
                    _this.fieldSearchItems.splice(_this.fieldSearchItems.indexOf(item), 1);
                    _this.updatePlaceholder();
                    _this.submit.next();
                });
            }
            // Transform the field search expresion (Expr string) into a list of autocomplete items displayed in the field search container
            if (changes["fieldSearchExpression"] && this.fieldSearchMode === "selects") {
                if (this.fieldSearchExpression) {
                    var expr = this.appService.parseExpr(this.fieldSearchExpression);
                    if (expr instanceof i2.Expr && this.fieldSearchItems.length !== expr.getFields().length) {
                        this.fieldSearchItems.splice(0);
                        if (expr.and) {
                            expr.operands.forEach(function (e) { return _this.fieldSearchItems.push(_this.exprToItem(e)); });
                        }
                        else {
                            this.fieldSearchItems.push(this.exprToItem(expr));
                        }
                    }
                }
                else {
                    this.fieldSearchItems.splice(0);
                }
            }
            // If fieldSearchMode changes from selects to something else, we must remove the field search items
            if (changes["fieldSearchMode"] && this.fieldSearchMode !== "selects" && this.fieldSearchItems.length > 0) {
                this.fieldSearchItems.splice(0);
            }
            this.updatePlaceholder();
            (_a = this.fieldSearchItemsContainer) === null || _a === void 0 ? void 0 : _a.update(this.fieldSearchItems);
        };
        /**
         * Unsubscribe when destroying the component
         */
        AutocompleteFieldSearch.prototype.ngOnDestroy = function () {
            _super.prototype.ngOnDestroy.call(this);
            if (this._fieldSearchSubscription) {
                this._fieldSearchSubscription.unsubscribe();
            }
        };
        /**
         * Insert the given autocomplete item into the current search input
         * at the right location
         * @param item
         */
        AutocompleteFieldSearch.prototype.insertAutocompleteItem = function (item) {
            var _a, _b;
            var value = this.getInputValue(); // Current text in the input
            if (value) { // There should always be text
                var parseResult = this.parseQuery(); // Parse the current text
                if (parseResult.result) { // (if no result, a parsing error occurred)
                    var res = parseResult.result.findValue(this.getInputPosition()); // Get the expression at the caret location
                    // Autocomplete "compa" => "company:"
                    if (res && item.category === "$field$") {
                        this.replaceValueInForm(res, item.display + ": ");
                        return false;
                    }
                    // Autocomplete "company:Goo" => "company:`GOOGLE`"
                    if (res && res.field === item.category) {
                        this.replaceValueInForm(res, i2.ExprParser.escape(item.normalized || item.display));
                        return true;
                    }
                    // Autocomplete "Goo" => "company:`GOOGLE`"
                    if (res && !res.field && item.category &&
                        (this.includedFields && ((_a = this.includedFields) === null || _a === void 0 ? void 0 : _a.includes(item.category)) ||
                            (!this.includedFields && !((_b = this.excludedFields) === null || _b === void 0 ? void 0 : _b.includes(item.category))))) { // Filter out fields if not in fieldSearch mode
                        this.replaceValueInForm(res, this.exprBuilder.makeExpr(item.category, item.normalized || item.display));
                        return true;
                    }
                    // Autocomplete "Search eng" => "Search engine"
                    if (res && !res.field) {
                        this.replaceValueInForm(res, item.display);
                        return true;
                    }
                    // Remaining edge case ?
                    console.error(item, parseResult.result);
                }
            }
            console.error("Shouldn't be here: an autocomplete item is selected, but there is no text or a parse error!");
            // Default to just overriding the current value (a complex query with multiple items might become reduced to this single item!)
            if (item.category === "$field$") {
                this.setInputValue(item.display + ":");
                return false;
            }
            this.setInputValue(this.exprBuilder.makeExpr(item.category, item.normalized || item.display)); // person: `Bill Gates`
            return true;
        };
        /**
         * Replaces the piece of expression (res) with a new value
         * in the input form
         * @param res The piece of expression parsed from the input content
         * @param value The new value
         */
        AutocompleteFieldSearch.prototype.replaceValueInForm = function (res, value) {
            this.uiService.setCaret(this.inputElement, res.start, res.start + res.length, value);
        };
        /**
         * Sets the content of the <input> based on the given
         * Autocomplete Item (various implementations are possible,
         * depending on the item content and nature).
         * This would be the right method to override to implement
         * fielded search autocomplete.
         * @returns true if this autocomplete item should be searched
         */
        AutocompleteFieldSearch.prototype.setAutocompleteItem = function (item) {
            var _a, _b, _c;
            if (item) {
                if (this.fieldSearchMode === "text") {
                    return this.insertAutocompleteItem(item);
                }
                else if (this.fieldSearchMode === "selects" && item.category &&
                    (this.includedFields && ((_a = this.includedFields) === null || _a === void 0 ? void 0 : _a.includes(item.category)) ||
                        (!this.includedFields && !((_b = this.excludedFields) === null || _b === void 0 ? void 0 : _b.includes(item.category))))) { // Filter out fields if not in fieldSearch mode
                    // In the case of of a field name, we display the field for autocomplete, but we don't want to search for it
                    if (item.category === "$field$") {
                        this.setInputValue(item.display + ":");
                        return false;
                    }
                    // Store the autocomplete item that will be used to create a selection
                    this.setInputValue("");
                    this.fieldSearchItems.push(item);
                    this.updatePlaceholder();
                    (_c = this.fieldSearchItemsContainer) === null || _c === void 0 ? void 0 : _c.update(this.fieldSearchItems);
                    return true;
                }
                else {
                    this.setInputValue(item.display);
                    return true;
                }
            }
            return false;
        };
        /**
         * Returns an expression (Expr) for the fielded search items
         */
        AutocompleteFieldSearch.prototype.getFieldSearchExpression = function () {
            return this.itemsToExpr(this.fieldSearchItems);
        };
        /**
         * Transforms a list of AutocompleteItems into an expression
         * @param items list of AutocompleteItems
         */
        AutocompleteFieldSearch.prototype.itemsToExpr = function (items) {
            var _this = this;
            if (items.length > 0) {
                return this.exprBuilder.concatAndExpr(items.map(function (item) { return _this.exprBuilder.makeExpr(item.category, item.normalized || item.display, item.display); }));
            }
            return undefined;
        };
        /**
         * Transforms an expression into a list of AutocompleteItems
         * @param expr an expression
         */
        AutocompleteFieldSearch.prototype.exprToItem = function (expr) {
            return {
                category: expr.field,
                display: expr.display,
                normalized: expr.value,
            };
        };
        /**
         * Takes the text from the <input> element and parse it to
         * determine what type of suggestion to request from the server.
         * The suggestions are then fetched by getSuggestsObs() and processed
         * by processSuggests().
         */
        AutocompleteFieldSearch.prototype.getSuggests = function () {
            var value = this.getInputValue();
            if (value) { // If there is text, make a call to the suggest API
                var parseResult = this.parseQuery(); // If using fieldSearch, the result can be used to detect an active field
                var fields = void 0;
                if (parseResult.result && this.fieldSearchMode !== "off") {
                    var position = this.getInputPosition(); // Position of the caret, if needed
                    var res = parseResult.result.findValue(position);
                    // Field Search suggest
                    if (!!res && !!res.field) {
                        fields = base.Utils.startsWith(res.field, "@") ? ["text"] : [res.field];
                        value = res.value;
                    }
                    if (!!res && this.fieldSearchMode === "text") {
                        value = res.value;
                    }
                }
                if (parseResult.error && this.fieldSearchMode !== "off") {
                    this.processSuggests(rxjs.of([])); // Empty autocomplete if parsing errors
                    return;
                }
                this.processSuggests(this.getSuggestsObs(value, fields));
            }
            else { // If empty input, restart autocomplete
                this.parse.next({}); // remove error messages if any
                this.start();
            }
        };
        /**
         * Process suggestions obtained (from whatever mean):
         * - If data available, filter out fields
         * - update the dropdown content
         * - Switch between OPEN and ACTIVE states
         * - Use changeDetectorRef to update display
         * @param obs an observable of AutocompleteItem suggestions
         */
        AutocompleteFieldSearch.prototype.processSuggests = function (obs) {
            var _this = this;
            obs.subscribe(function (suggests) {
                if (_this.getState() === exports.AutocompleteState.ACTIVE || _this.getState() === exports.AutocompleteState.OPENED) {
                    _this.dropdown.update(true, suggests
                        .filter(function (item) {
                        var _a, _b;
                        return item.category !== "$field$" || (_this.fieldSearchMode !== "off" &&
                            (_this.includedFields && ((_a = _this.includedFields) === null || _a === void 0 ? void 0 : _a.includes(item.display)) ||
                                (!_this.includedFields && !((_b = _this.excludedFields) === null || _b === void 0 ? void 0 : _b.includes(item.display)))));
                    }) // Filter out fields if not in fieldSearch mode
                        .map(function (item) {
                        if (!item.label) {
                            if (item.category === "$field$") {
                                item.label = "Field";
                            }
                            else {
                                item.label = _this.appService.getLabel(item.category);
                            }
                        }
                        return item;
                    }));
                }
            }, function (err) {
                _this.dropdown.update(false);
            }, function () {
                if (_this.dropdown.hasItems && _this.getState() === exports.AutocompleteState.ACTIVE) {
                    _this.open(); // Switch from ACTIVE to OPENED (if not already)
                }
                else if (!_this.dropdown.hasItems && _this.getState() === exports.AutocompleteState.OPENED) { // No data
                    _this.active(); // Switch from OPENED to ACTIVE (if not already)
                }
            });
        };
        /**
         * Parse the query for syntax errors (also allows to detect field search if needed).
         * Fires a parse event.
         */
        AutocompleteFieldSearch.prototype.parseQuery = function () {
            var value = this.getInputValue();
            var result = this.appService.parseExpr(value, { allowEmptyValues: true });
            var event = result instanceof i2.Expr ? { result: result } : { error: result };
            this.parse.next(event);
            return event;
        };
        /**
         * Listen to user's keyboard actions in the <input>, in order to navigate
         * and select the autocomplete suggestions.
         * Overrides the parent keydown method, adds the management of the backspace key
         * to remove field search items.
         * @param event the keyboard
         */
        AutocompleteFieldSearch.prototype.keydown = function (event) {
            var _a;
            var keydown = _super.prototype.keydown.call(this, event);
            if (keydown === undefined) {
                // In fielded search mode, we can remove selections by typing <backspace> when the input is empty
                if (event.keyCode === base.Keys.backspace) {
                    if (this.fieldSearchMode === "selects" && this.getInputValue() === '') {
                        this.fieldSearchItems.pop();
                        this.updatePlaceholder();
                        (_a = this.fieldSearchItemsContainer) === null || _a === void 0 ? void 0 : _a.update(this.fieldSearchItems);
                    }
                }
            }
            return keydown;
        };
        /**
         * Updates the <input>'s placeholder to avoid displaying something
         * when there are fieldSearchItems displayed to the left.
         */
        AutocompleteFieldSearch.prototype.updatePlaceholder = function () {
            this._placeholder = this.fieldSearchItems.length > 0 ? '' : this.placeholder;
        };
        return AutocompleteFieldSearch;
    }(Autocomplete));
    AutocompleteFieldSearch.ɵfac = function AutocompleteFieldSearch_Factory(t) { return new (t || AutocompleteFieldSearch)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(SuggestService), i0.ɵɵdirectiveInject(i2.AppService), i0.ɵɵdirectiveInject(i3.UIService), i0.ɵɵdirectiveInject(i2.ExprBuilder)); };
    AutocompleteFieldSearch.ɵdir = i0.ɵɵdefineDirective({ type: AutocompleteFieldSearch, selectors: [["", "sqAutocompleteFieldSearch", ""]], inputs: { fieldSearchMode: "fieldSearchMode", excludedFields: "excludedFields", includedFields: "includedFields", fieldSearchItemsContainer: "fieldSearchItemsContainer", fieldSearchExpression: "fieldSearchExpression" }, outputs: { parse: "parse" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AutocompleteFieldSearch, [{
                type: i0.Directive,
                args: [{
                        selector: "[sqAutocompleteFieldSearch]"
                    }]
            }], function () { return [{ type: i0.ElementRef }, { type: SuggestService }, { type: i2.AppService }, { type: i3.UIService }, { type: i2.ExprBuilder }]; }, { fieldSearchMode: [{
                    type: i0.Input
                }], excludedFields: [{
                    type: i0.Input
                }], includedFields: [{
                    type: i0.Input
                }], fieldSearchItemsContainer: [{
                    type: i0.Input
                }], fieldSearchExpression: [{
                    type: i0.Input
                }], parse: [{
                    type: i0.Output
                }] });
    })();

    var BsAutocompleteModule = /** @class */ (function () {
        function BsAutocompleteModule() {
        }
        return BsAutocompleteModule;
    }());
    BsAutocompleteModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsAutocompleteModule });
    BsAutocompleteModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsAutocompleteModule_Factory(t) { return new (t || BsAutocompleteModule)(); }, imports: [[
                i1.CommonModule,
                i3.UtilsModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsAutocompleteModule, { declarations: [BsAutocompleteList, BsFieldSearchItemsComponent, Autocomplete, AutocompleteFieldSearch], imports: [i1.CommonModule,
                i3.UtilsModule], exports: [BsAutocompleteList, BsFieldSearchItemsComponent, Autocomplete, AutocompleteFieldSearch] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsAutocompleteModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i1.CommonModule,
                            i3.UtilsModule
                        ],
                        declarations: [
                            BsAutocompleteList, BsFieldSearchItemsComponent, Autocomplete, AutocompleteFieldSearch
                        ],
                        exports: [
                            BsAutocompleteList, BsFieldSearchItemsComponent, Autocomplete, AutocompleteFieldSearch
                        ]
                    }]
            }], null, null);
    })();

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Autocomplete = Autocomplete;
    exports.AutocompleteFieldSearch = AutocompleteFieldSearch;
    exports.BsAutocompleteList = BsAutocompleteList;
    exports.BsAutocompleteModule = BsAutocompleteModule;
    exports.BsFieldSearchItemsComponent = BsFieldSearchItemsComponent;
    exports.SuggestService = SuggestService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-autocomplete.umd.js.map
