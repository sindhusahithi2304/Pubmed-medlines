(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@sinequa/core/app-utils'), require('@sinequa/components/search'), require('@angular/common'), require('@sinequa/core/base'), require('@sinequa/components/facet'), require('@sinequa/components/collapse'), require('@sinequa/core/intl'), require('@sinequa/components/utils')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/metadata', ['exports', '@angular/core', '@sinequa/core/app-utils', '@sinequa/components/search', '@angular/common', '@sinequa/core/base', '@sinequa/components/facet', '@sinequa/components/collapse', '@sinequa/core/intl', '@sinequa/components/utils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components.metadata = {}), global.ng.core, global.sinequa.core['app-utils'], global.sinequa.components.search, global.ng.common, global.sinequa.core.base, global.sinequa.components.facet, global.sinequa.components.collapse, global.sinequa.core.intl, global.sinequa.components.utils));
}(this, (function (exports, i0, i1$1, i2$1, i2, base, facet, i1, i3, i6) { 'use strict';

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

    function MetadataAccessListsItemSingleAccessList_ng_template_6_div_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 7);
            i0.ɵɵelementStart(1, "div", 8);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 9);
            i0.ɵɵtext(4, " | ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 10);
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var principal_r2 = ctx.$implicit;
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(principal_r2.domain);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(principal_r2.id);
        }
    }
    function MetadataAccessListsItemSingleAccessList_ng_template_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 4);
            i0.ɵɵelementStart(1, "div", 5);
            i0.ɵɵtemplate(2, MetadataAccessListsItemSingleAccessList_ng_template_6_div_2_Template, 7, 2, "div", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx_r0.accessList);
        }
    }
    var _c0 = function (a0) { return { value: a0 }; };
    var _c1 = function (a0) { return { values: a0 }; };
    var MetadataAccessListsItemSingleAccessList = /** @class */ (function () {
        function MetadataAccessListsItemSingleAccessList() {
            this.collapsed = true;
        }
        Object.defineProperty(MetadataAccessListsItemSingleAccessList.prototype, "headerMessage", {
            get: function () {
                return "msg#metadata.accessLists." + (this.authorized ? "authorizedListHeader" : "deniedListHeader");
            },
            enumerable: false,
            configurable: true
        });
        MetadataAccessListsItemSingleAccessList.prototype.collapseClick = function (event) {
            this.collapsed = !this.collapsed;
            event.preventDefault();
        };
        return MetadataAccessListsItemSingleAccessList;
    }());
    MetadataAccessListsItemSingleAccessList.ɵfac = function MetadataAccessListsItemSingleAccessList_Factory(t) { return new (t || MetadataAccessListsItemSingleAccessList)(); };
    MetadataAccessListsItemSingleAccessList.ɵcmp = i0.ɵɵdefineComponent({ type: MetadataAccessListsItemSingleAccessList, selectors: [["sq-metadata-access-lists-item-single-access-list"]], inputs: { authorized: "authorized", index: "index", accessList: "accessList" }, decls: 7, vars: 10, consts: [[1, "accessListHeader"], ["href", "#", 3, "click"], [1, "collapseButton", 3, "collapsed"], [3, "collapsed"], [1, "accessListBody"], [1, "principalList"], ["class", "principal", 4, "ngFor", "ngForOf"], [1, "principal"], [1, "domain"], [1, "separator"], [1, "id"]], template: function MetadataAccessListsItemSingleAccessList_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtext(1);
                i0.ɵɵpipe(2, "sqMessage");
                i0.ɵɵelementStart(3, "a", 1);
                i0.ɵɵlistener("click", function MetadataAccessListsItemSingleAccessList_Template_a_click_3_listener($event) { return ctx.collapseClick($event); });
                i0.ɵɵelement(4, "sq-collapse-button", 2);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(5, "sq-collapse", 3);
                i0.ɵɵtemplate(6, MetadataAccessListsItemSingleAccessList_ng_template_6_Template, 3, 1, "ng-template");
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(2, 3, ctx.headerMessage, i0.ɵɵpureFunction1(8, _c1, i0.ɵɵpureFunction1(6, _c0, ctx.index))), " ");
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("collapsed", ctx.collapsed);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("collapsed", ctx.collapsed);
            }
        }, directives: [i1.CollapseButton, i1.Collapse, i2.NgForOf], pipes: [i3.MessagePipe], styles: [".collapseButton[_ngcontent-%COMP%]{float:right}.principalList[_ngcontent-%COMP%]{display:table}.principal[_ngcontent-%COMP%]{display:table-row}.domain[_ngcontent-%COMP%], .id[_ngcontent-%COMP%], .separator[_ngcontent-%COMP%]{display:table-cell}.separator[_ngcontent-%COMP%]{padding-left:.25em;padding-right:.25em}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(MetadataAccessListsItemSingleAccessList, [{
                type: i0.Component,
                args: [{
                        selector: "sq-metadata-access-lists-item-single-access-list",
                        templateUrl: "./metadata-access-lists-item-single-access-list.html",
                        styleUrls: ["./metadata-access-lists-item-single-access-list.css"]
                    }]
            }], null, { authorized: [{
                    type: i0.Input
                }], index: [{
                    type: i0.Input
                }], accessList: [{
                    type: i0.Input
                }] });
    })();

    function MetadataAccessListsItem_ng_container_0_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 2);
            i0.ɵɵelement(1, "div", 3);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementStart(3, "div", 4);
            i0.ɵɵelement(4, "sq-metadata-access-lists-item-single-access-list", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var i_r1 = i0.ɵɵnextContext().$implicit;
            var ctx_r2 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(2, 4, "msg#metadata.accessLists.authorizedListTitleText"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("authorized", true)("index", i_r1)("accessList", ctx_r2.accessLists.authorizedLists[i_r1]);
        }
    }
    function MetadataAccessListsItem_ng_container_0_div_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 2);
            i0.ɵɵelement(1, "div", 6);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementStart(3, "div", 4);
            i0.ɵɵelement(4, "sq-metadata-access-lists-item-single-access-list", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var i_r1 = i0.ɵɵnextContext().$implicit;
            var ctx_r3 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(2, 4, "msg#metadata.accessLists.deniedListTitleText"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("authorized", false)("index", i_r1)("accessList", ctx_r3.accessLists.deniedLists[i_r1]);
        }
    }
    function MetadataAccessListsItem_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, MetadataAccessListsItem_ng_container_0_div_1_Template, 5, 6, "div", 1);
            i0.ɵɵtemplate(2, MetadataAccessListsItem_ng_container_0_div_2_Template, 5, 6, "div", 1);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var i_r1 = ctx.$implicit;
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.accessLists.authorizedLists[i_r1]);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.accessLists.deniedLists[i_r1]);
        }
    }
    var MetadataAccessListsItem = /** @class */ (function () {
        function MetadataAccessListsItem() {
        }
        return MetadataAccessListsItem;
    }());
    MetadataAccessListsItem.ɵfac = function MetadataAccessListsItem_Factory(t) { return new (t || MetadataAccessListsItem)(); };
    MetadataAccessListsItem.ɵcmp = i0.ɵɵdefineComponent({ type: MetadataAccessListsItem, selectors: [["sq-metadata-access-lists-item"]], inputs: { accessLists: "accessLists" }, decls: 1, vars: 1, consts: [[4, "ngFor", "ngForOf"], ["class", "accessList", 4, "ngIf"], [1, "accessList"], [1, "accessListIcon", "authorizedListIcon", "far", "fa-check-circle", 3, "title"], [1, "accessListValue"], [3, "authorized", "index", "accessList"], [1, "accessListIcon", "deniedListIcon", "fas", "fa-minus-circle", 3, "title"]], template: function MetadataAccessListsItem_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, MetadataAccessListsItem_ng_container_0_Template, 3, 2, "ng-container", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngForOf", ctx.accessLists.accessListIndices);
            }
        }, directives: [i2.NgForOf, i2.NgIf, MetadataAccessListsItemSingleAccessList], pipes: [i3.MessagePipe], styles: [".accessList[_ngcontent-%COMP%]{display:table-row}.accessListIcon[_ngcontent-%COMP%], .accessListValue[_ngcontent-%COMP%]{display:table-cell}.accessListValue[_ngcontent-%COMP%]{padding-left:.5em;width:99%}.authorizedListIcon[_ngcontent-%COMP%]{color:green}.deniedListIcon[_ngcontent-%COMP%]{color:red}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(MetadataAccessListsItem, [{
                type: i0.Component,
                args: [{
                        selector: "sq-metadata-access-lists-item",
                        templateUrl: "./metadata-access-lists-item.html",
                        styleUrls: ["./metadata-access-lists-item.css"]
                    }]
            }], null, { accessLists: [{
                    type: i0.Input
                }] });
    })();

    function Showmore_span_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span", 2);
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("innerHTML", ctx_r0.shortQuestion, i0.ɵɵsanitizeHtml);
        }
    }
    function Showmore_span_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span", 2);
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵproperty("innerHTML", ctx_r1.longQuestion, i0.ɵɵsanitizeHtml);
        }
    }
    function Showmore_span_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r4_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "span", 3);
            i0.ɵɵlistener("click", function Showmore_span_2_Template_span_click_0_listener($event) { i0.ɵɵrestoreView(_r4_1); var ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.showMore($event); });
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", ctx_r2.isShowMore ? "show less" : "show more", "");
        }
    }
    var Showmore = /** @class */ (function () {
        function Showmore() {
            this.isShowMore = false;
            this.isBigQuestion = false;
        }
        Showmore.prototype.ngOnInit = function () {
            this.longQuestion = this.question;
            // this.searchTextArray.forEach(element => {
            //     const re = new RegExp(element, "gi");
            //     this.longQuestion = this.longQuestion.replace(re,
            //         '<span class="highlighted">' + element + "</span>"
            //     );
            // });
            if (this.question.length > 300) {
                this.isBigQuestion = true;
                this.shortQuestion = this.question.substring(0, 400) + "...";
                // this.searchTextArray.forEach(element => {
                //     const re = new RegExp(element, "gi");
                //     this.shortQuestion = this.shortQuestion.replace(re, '<span class="highlighted">' + element + "</span>");
                // });
                this.display = this.shortQuestion;
            }
            else {
                this.display = this.longQuestion;
            }
        };
        Showmore.prototype.showMore = function (event) {
            event.stopPropagation();
            this.isShowMore = !this.isShowMore;
            if (this.isShowMore)
                this.display = this.longQuestion;
            else
                this.display = this.shortQuestion;
        };
        return Showmore;
    }());
    Showmore.ɵfac = function Showmore_Factory(t) { return new (t || Showmore)(); };
    Showmore.ɵcmp = i0.ɵɵdefineComponent({ type: Showmore, selectors: [["sq-showmore"]], inputs: { question: "question" }, decls: 3, vars: 3, consts: [[3, "innerHTML", 4, "ngIf"], ["class", "showMore", 3, "click", 4, "ngIf"], [3, "innerHTML"], [1, "showMore", 3, "click"]], template: function Showmore_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, Showmore_span_0_Template, 1, 1, "span", 0);
                i0.ɵɵtemplate(1, Showmore_span_1_Template, 1, 1, "span", 0);
                i0.ɵɵtemplate(2, Showmore_span_2_Template, 2, 1, "span", 1);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !ctx.isShowMore);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.isShowMore || !ctx.isBigQuestion);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.isBigQuestion);
            }
        }, directives: [i2.NgIf], styles: [".showMore[_ngcontent-%COMP%]{color:#00f;cursor:pointer}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(Showmore, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-showmore',
                        templateUrl: './showmore.html',
                        styleUrls: ['./showmore.scss'],
                    }]
            }], function () { return []; }, { question: [{
                    type: i0.Input
                }] });
    })();

    function MetadataItem_div_0_span_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span", 8);
            i0.ɵɵpipe(1, "sqMessage");
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext(2);
            i0.ɵɵclassMapInterpolate2("sq-metadata-item-icon sq-icon-", ctx_r1.item, " ", ctx_r1.docFormatIconClass, " fa-fw pr-2");
            i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 5, ctx_r1.label));
        }
    }
    function MetadataItem_div_0_span_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 9);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "msg#metadata.item.label", ctx_r2.itemLabelMessageParams));
        }
    }
    function MetadataItem_div_0_a_5_Template(rf, ctx) {
        if (rf & 1) {
            var _r9_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 10);
            i0.ɵɵlistener("click", function MetadataItem_div_0_a_5_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r9_1); var ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.toggleCollapse(); });
            i0.ɵɵelement(1, "i");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r4 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵclassMapInterpolate1("fas fa-fw fa-chevron-", ctx_r4.collapsed ? "right" : "down", "");
        }
    }
    function MetadataItem_div_0_sq_metadata_access_lists_item_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "sq-metadata-access-lists-item", 11);
        }
        if (rf & 2) {
            var ctx_r5 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("accessLists", ctx_r5.accessListsData);
        }
    }
    function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_a_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r26_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 21);
            i0.ɵɵlistener("click", function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r26_1); var $subIndex_r20 = i0.ɵɵnextContext().index; var $index_r15 = i0.ɵɵnextContext(2).index; var ctx_r24 = i0.ɵɵnextContext(4); return ctx_r24.select($index_r15, $subIndex_r20); });
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqValue");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var part_r19 = i0.ɵɵnextContext().$implicit;
            var ctx_r21 = i0.ɵɵnextContext(6);
            i0.ɵɵproperty("ngClass", "sq-metadata-item-" + ctx_r21.item);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 2, part_r19, ctx_r21.column));
        }
    }
    function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_span_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 22);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqValue");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var part_r19 = i0.ɵɵnextContext().$implicit;
            var ctx_r22 = i0.ɵɵnextContext(6);
            i0.ɵɵproperty("ngClass", "sq-metadata-item-" + ctx_r22.item);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 2, part_r19, ctx_r22.column));
        }
    }
    function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_span_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 23);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "msg#metadata.item.treeNodeSeparator"));
        }
    }
    function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "li");
            i0.ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_a_1_Template, 3, 5, "a", 18);
            i0.ɵɵtemplate(2, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_span_2_Template, 3, 5, "span", 19);
            i0.ɵɵtemplate(3, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_span_3_Template, 3, 3, "span", 20);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var $subIndex_r20 = ctx.index;
            var valueItem_r14 = i0.ɵɵnextContext(2).$implicit;
            var ctx_r18 = i0.ɵɵnextContext(4);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r18.clickable);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r18.clickable);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", $subIndex_r20 < valueItem_r14.parts.length - 1);
        }
    }
    function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "ol", 17);
            i0.ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_Template, 4, 3, "li", 14);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var valueItem_r14 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", valueItem_r14.parts);
        }
    }
    function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_span_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 24);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "msg#metadata.item.treeSeparator"));
        }
    }
    function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_Template, 2, 1, "ol", 15);
            i0.ɵɵtemplate(2, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_span_2_Template, 3, 3, "span", 16);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var valueItem_r14 = ctx.$implicit;
            var $index_r15 = ctx.index;
            var ctx_r13 = i0.ɵɵnextContext(4);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !!valueItem_r14.parts && valueItem_r14.parts.length > 0);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", $index_r15 < ctx_r13.valueItems.length - 1);
        }
    }
    function MetadataItem_div_0_ng_template_7_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_Template, 3, 2, "ng-container", 14);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r10 = i0.ɵɵnextContext(3);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r10.valueItems);
        }
    }
    function MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_a_1_span_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 29);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var valueItem_r36 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵproperty("title", valueItem_r36.count + " occurrences in document");
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(valueItem_r36.count);
        }
    }
    function MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_a_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r41_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 27);
            i0.ɵɵlistener("click", function MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r41_1); var $index_r37 = ctx.index; var ctx_r40 = i0.ɵɵnextContext(5); return ctx_r40.select($index_r37); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "sqValue");
            i0.ɵɵtemplate(4, MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_a_1_span_4_Template, 2, 2, "span", 28);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var valueItem_r36 = ctx.$implicit;
            var ctx_r35 = i0.ɵɵnextContext(5);
            i0.ɵɵclassMapInterpolate1("badge badge-pill ", "sq-metadata-item-" + ctx_r35.item, " mr-1");
            i0.ɵɵproperty("href", valueItem_r36.value, i0.ɵɵsanitizeUrl);
            i0.ɵɵattribute("title", ctx_r35.showTitle ? null : i0.ɵɵpipeBind1(1, 7, ctx_r35.label));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(3, 9, valueItem_r36, ctx_r35.column), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r35.showCounts && valueItem_r36.count);
        }
    }
    function MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_a_1_Template, 5, 12, "a", 26);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r32 = i0.ɵɵnextContext(4);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r32.valueItems);
        }
    }
    function MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_ng_container_0_span_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 33);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var valueItem_r43 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵproperty("title", valueItem_r43.count + " occurrences in document");
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1("(", valueItem_r43.count, ")");
        }
    }
    function MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_ng_container_0_span_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 34);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "msg#metadata.item.listSeparator"));
        }
    }
    function MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "span");
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelement(3, "sq-showmore", 30);
            i0.ɵɵtemplate(4, MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_ng_container_0_span_4_Template, 2, 2, "span", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_ng_container_0_span_5_Template, 3, 3, "span", 32);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var valueItem_r43 = ctx.$implicit;
            var $index_r44 = ctx.index;
            var ctx_r42 = i0.ɵɵnextContext(5);
            i0.ɵɵadvance(1);
            i0.ɵɵclassMap("sq-metadata-item-" + ctx_r42.item);
            i0.ɵɵattribute("title", ctx_r42.showTitle ? null : i0.ɵɵpipeBind1(2, 7, ctx_r42.label));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("question", valueItem_r43.value);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r42.showCounts && valueItem_r43.count);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", $index_r44 < ctx_r42.valueItems.length - 1);
        }
    }
    function MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtemplate(0, MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_ng_container_0_Template, 6, 9, "ng-container", 14);
        }
        if (rf & 2) {
            var ctx_r34 = i0.ɵɵnextContext(4);
            i0.ɵɵproperty("ngForOf", ctx_r34.valueItems);
        }
    }
    function MetadataItem_div_0_ng_template_7_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtemplate(0, MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_Template, 2, 1, "ng-container", 12);
            i0.ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_Template, 1, 1, "ng-template", null, 25, i0.ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
            var _r33 = i0.ɵɵreference(2);
            var ctx_r12 = i0.ɵɵnextContext(3);
            i0.ɵɵproperty("ngIf", ctx_r12.clickable)("ngIfElse", _r33);
        }
    }
    function MetadataItem_div_0_ng_template_7_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtemplate(0, MetadataItem_div_0_ng_template_7_ng_container_0_Template, 2, 1, "ng-container", 12);
            i0.ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_template_1_Template, 3, 2, "ng-template", null, 13, i0.ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
            var _r11 = i0.ɵɵreference(2);
            var ctx_r7 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("ngIf", ctx_r7.isTree)("ngIfElse", _r11);
        }
    }
    var _c0$1 = function (a0) { return { collapsed: a0 }; };
    function MetadataItem_div_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵtemplate(1, MetadataItem_div_0_span_1_Template, 2, 7, "span", 1);
            i0.ɵɵtemplate(2, MetadataItem_div_0_span_2_Template, 3, 4, "span", 2);
            i0.ɵɵelementStart(3, "span", 3, 4);
            i0.ɵɵtemplate(5, MetadataItem_div_0_a_5_Template, 2, 3, "a", 5);
            i0.ɵɵtemplate(6, MetadataItem_div_0_sq_metadata_access_lists_item_6_Template, 1, 1, "sq-metadata-access-lists-item", 6);
            i0.ɵɵtemplate(7, MetadataItem_div_0_ng_template_7_Template, 3, 2, "ng-template", null, 7, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var _r6 = i0.ɵɵreference(8);
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵclassMapInterpolate1("sq-metadata-item ", ctx_r0.itemClasses, "");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.showIcon && !!ctx_r0.item);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.showTitle && !!ctx_r0.item);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(9, _c0$1, !!ctx_r0.collapsed));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r0.collapseRows && ctx_r0.needsCollapse);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.isAccessLists)("ngIfElse", _r6);
        }
    }
    var MetadataItem = /** @class */ (function () {
        function MetadataItem(appService, formatService) {
            this.appService = appService;
            this.formatService = formatService;
            this.showTitle = true;
            this.showIcon = false;
            this.showCounts = true;
            this.clickable = true;
            this.tabular = true;
            this.collapseRows = true;
            this._select = new i0.EventEmitter();
            this.needsCollapse = false;
            this.valueItems = [];
        }
        Object.defineProperty(MetadataItem.prototype, "hidden", {
            get: function () { return this.isEmpty; },
            enumerable: false,
            configurable: true
        });
        MetadataItem.prototype.ensureScalarValue = function (value) {
            if (base.Utils.isEmpty(value) && this.column) {
                if (i1$1.AppService.isBoolean(this.column)) {
                    value = 'msg#metadata.item.empty_boolean';
                }
                else if (i1$1.AppService.isNumber(this.column)) {
                    value = 'msg#metadata.item.empty_number';
                }
            }
            return value;
        };
        MetadataItem.prototype.ngOnChanges = function (changes) {
            var e_1, _a, _b, _c;
            if (!this.column) {
                this.column = this.appService.getColumn(this.item);
                this.itemLabelMessageParams = { values: { label: this.label } };
            }
            this.valueItems = [];
            this.isTree = !!this.column && i1$1.AppService.isTree(this.column);
            this.isEntity = !!this.column && i1$1.AppService.isEntity(this.column);
            this.isCsv = !!this.column && i1$1.AppService.isCsv(this.column);
            var values = this.record[this.appService.getColumnAlias(this.column, this.item)];
            if (this.isTree) {
                var paths = values;
                if (paths) {
                    try {
                        for (var paths_1 = __values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()) {
                            var path = paths_1_1.value;
                            var parts = path.split("/");
                            if (parts.length > 0 && parts[0] === "") {
                                parts.splice(0, 1);
                            }
                            if (parts.length > 0 && parts[parts.length - 1] === "") {
                                parts.splice(parts.length - 1, 1);
                            }
                            var item = { value: path, parts: parts.map(function (value) { return ({ value: value }); }) };
                            this.valueItems.push(item);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
            else if (this.isEntity) {
                var entityItems = values;
                if (entityItems) {
                    (_b = this.valueItems).push.apply(_b, __spread(entityItems));
                }
            }
            else if (this.isCsv) {
                if (values && values instanceof Array) {
                    (_c = this.valueItems).push.apply(_c, __spread(values.map(function (value) { return ({ value: value }); })));
                }
                else if (!base.Utils.isEmpty(values)) {
                    this.valueItems.push({ value: values });
                }
            }
            else {
                var value = this.ensureScalarValue(values);
                if (!base.Utils.isEmpty(value)) {
                    this.valueItems.push({ value: value });
                }
            }
            var collapsable = (this.isEntity || this.isCsv) && !this.isTree; // Tree columns are multivalues, and therefore isCsv=true
            if (changes.collapseRows || this.collapsed === undefined) {
                this.collapsed = collapsable && this.collapseRows;
            }
            this.needsCollapse = collapsable && this.collapseRows && this.tabular && this.valueItems.length > 1; // We display the collapse button as soon as the number of values is >1 which does not take into account the actualy width of each value...
        };
        Object.defineProperty(MetadataItem.prototype, "isEmpty", {
            get: function () {
                if (!this.item) {
                    return true;
                }
                if (this.item === "accesslists") {
                    if (!this.record.accesslists || !this.record.accesslists.accessListIndices
                        || this.record.accesslists.accessListIndices.length === 0) {
                        return true;
                    }
                }
                else {
                    if (this.valueItems.length === 0) {
                        return true;
                    }
                }
                return false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MetadataItem.prototype, "itemClasses", {
            get: function () {
                var classes = "sq-text";
                if (this.clickable) {
                    classes += " sq-clickable";
                }
                if (this.tabular) {
                    classes += " sq-tabular";
                }
                return classes;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MetadataItem.prototype, "label", {
            get: function () {
                return this.appService.getLabel(this.item);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MetadataItem.prototype, "isAccessLists", {
            get: function () {
                return this.item === "accesslists";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MetadataItem.prototype, "accessListsData", {
            get: function () {
                return this.record.accesslists;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MetadataItem.prototype, "docFormatIconClass", {
            get: function () {
                if (this.item == null || this.item !== "docformat" && this.item !== "fileext") {
                    return "";
                }
                var value = this.record[this.item];
                if (!value) {
                    return "far fa-file";
                }
                return "far fa-file sq-icon-file-" + value;
            },
            enumerable: false,
            configurable: true
        });
        MetadataItem.prototype.select = function (index, subIndex) {
            if (subIndex === void 0) { subIndex = 0; }
            if (this.isTree) {
                var valueItem = this.valueItems[index];
                var parts = valueItem.parts.map(function (item) { return item.value; }).slice(0, subIndex + 1);
                if (parts.length > 0) {
                    parts.unshift("");
                    parts.push("");
                }
                var path = parts.join("/");
                this._select.emit({ item: this.item, valueItem: { value: path + "*", display: facet.FacetService.treepathLast(path) } });
            }
            else {
                this._select.emit({ item: this.item, valueItem: this.valueItems[index] });
            }
            return false; // prevent default
        };
        MetadataItem.prototype.toggleCollapse = function () {
            this.collapsed = !this.collapsed;
            return false;
        };
        return MetadataItem;
    }());
    MetadataItem.ɵfac = function MetadataItem_Factory(t) { return new (t || MetadataItem)(i0.ɵɵdirectiveInject(i1$1.AppService), i0.ɵɵdirectiveInject(i1$1.FormatService)); };
    MetadataItem.ɵcmp = i0.ɵɵdefineComponent({ type: MetadataItem, selectors: [["sq-metadata-item"]], hostVars: 1, hostBindings: function MetadataItem_HostBindings(rf, ctx) {
            if (rf & 2) {
                i0.ɵɵhostProperty("hidden", ctx.hidden);
            }
        }, inputs: { record: "record", item: "item", showTitle: "showTitle", showIcon: "showIcon", showCounts: "showCounts", clickable: "clickable", tabular: "tabular", collapseRows: "collapseRows" }, outputs: { _select: "select" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "class", 4, "ngIf"], [3, "class", "title", 4, "ngIf"], ["class", "sq-metadata-item-label pr-2", 4, "ngIf"], [1, "sq-metadata-item-values", 3, "ngClass"], ["values", ""], ["href", "#", "class", "collapse-button mr-1", 3, "click", 4, "ngIf"], [3, "accessLists", 4, "ngIf", "ngIfElse"], ["default", ""], [3, "title"], [1, "sq-metadata-item-label", "pr-2"], ["href", "#", 1, "collapse-button", "mr-1", 3, "click"], [3, "accessLists"], [4, "ngIf", "ngIfElse"], ["isNotTree", ""], [4, "ngFor", "ngForOf"], ["class", "breadcrumb", 4, "ngIf"], ["class", "sq-metadata-item-tree-separator", 4, "ngIf"], [1, "breadcrumb"], ["class", "badge badge-pill", "href", "#", 3, "ngClass", "click", 4, "ngIf"], [3, "ngClass", 4, "ngIf"], ["class", "sq-metadata-item-tree-node-separator", 4, "ngIf"], ["href", "#", 1, "badge", "badge-pill", 3, "ngClass", "click"], [3, "ngClass"], [1, "sq-metadata-item-tree-node-separator"], [1, "sq-metadata-item-tree-separator"], ["notTreeNonClickable", ""], ["target", "_blank", 3, "class", "href", "click", 4, "ngFor", "ngForOf"], ["target", "_blank", 3, "href", "click"], ["class", "counter badge badge-light ml-1", 3, "title", 4, "ngIf"], [1, "counter", "badge", "badge-light", "ml-1", 3, "title"], [3, "question"], ["class", "small", 3, "title", 4, "ngIf"], ["class", "sq-metadata-item-list-separator", 4, "ngIf"], [1, "small", 3, "title"], [1, "sq-metadata-item-list-separator"]], template: function MetadataItem_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, MetadataItem_div_0_Template, 9, 11, "div", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !ctx.isEmpty);
            }
        }, directives: [i2.NgIf, i2.NgClass, MetadataAccessListsItem, i2.NgForOf, Showmore], pipes: [i3.MessagePipe, i6.ValuePipe], styles: [".sq-metadata-item-label[_ngcontent-%COMP%]{white-space:nowrap;width:1px}.sq-metadata-item-values[_ngcontent-%COMP%]{max-height:15rem;overflow:hidden;transition:max-height .2s ease-in-out}.sq-metadata-item-values[_ngcontent-%COMP%]   .breadcrumb[_ngcontent-%COMP%]{background-color:inherit;display:inline;padding:0}.sq-metadata-item-values[_ngcontent-%COMP%]   .breadcrumb[_ngcontent-%COMP%]:after, .sq-metadata-item-values[_ngcontent-%COMP%]   .breadcrumb[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{display:inline}.sq-metadata-item-values[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%]{font-size:83%}.sq-metadata-item-values.collapsed[_ngcontent-%COMP%]{display:block;max-height:1.5rem}.sq-metadata-item-values[_ngcontent-%COMP%]   .collapse-button[_ngcontent-%COMP%]{font-size:.9rem}.sq-metadata-item.sq-tabular[_ngcontent-%COMP%]{display:table-row}.sq-metadata-item.sq-tabular[_ngcontent-%COMP%]   .sq-metadata-item-icon[_ngcontent-%COMP%], .sq-metadata-item.sq-tabular[_ngcontent-%COMP%]   .sq-metadata-item-label[_ngcontent-%COMP%]{display:table-cell}.sq-metadata-item[_ngcontent-%COMP%]:not(.sq-tabular), .sq-metadata-item[_ngcontent-%COMP%]:not(.sq-tabular)   .sq-metadata-item-label[_ngcontent-%COMP%], .sq-metadata-item[_ngcontent-%COMP%]:not(.sq-tabular)   .sq-metadata-item-values[_ngcontent-%COMP%]{display:inline}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(MetadataItem, [{
                type: i0.Component,
                args: [{
                        selector: "sq-metadata-item",
                        templateUrl: "./metadata-item.html",
                        styleUrls: ['./metadata-item.scss']
                    }]
            }], function () { return [{ type: i1$1.AppService }, { type: i1$1.FormatService }]; }, { record: [{
                    type: i0.Input
                }], item: [{
                    type: i0.Input
                }], showTitle: [{
                    type: i0.Input
                }], showIcon: [{
                    type: i0.Input
                }], showCounts: [{
                    type: i0.Input
                }], clickable: [{
                    type: i0.Input
                }], tabular: [{
                    type: i0.Input
                }], collapseRows: [{
                    type: i0.Input
                }], _select: [{
                    type: i0.Output,
                    args: ["select"]
                }], hidden: [{
                    type: i0.HostBinding,
                    args: ['hidden']
                }] });
    })();

    function Metadata_sq_metadata_item_0_span_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 3);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "msg#metadata.item.separator"));
        }
    }
    function Metadata_sq_metadata_item_0_Template(rf, ctx) {
        if (rf & 1) {
            var _r5_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "sq-metadata-item", 1);
            i0.ɵɵlistener("select", function Metadata_sq_metadata_item_0_Template_sq_metadata_item_select_0_listener($event) { i0.ɵɵrestoreView(_r5_1); var ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.select($event.item, $event.valueItem); });
            i0.ɵɵtemplate(1, Metadata_sq_metadata_item_0_span_1_Template, 3, 3, "span", 2);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r1 = ctx.$implicit;
            var $index_r2 = ctx.index;
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("record", ctx_r0.record)("item", item_r1)("showTitle", ctx_r0.showTitles)("showIcon", ctx_r0.showIcons)("showCounts", ctx_r0.showCounts)("clickable", ctx_r0.clickable)("tabular", ctx_r0.tabular)("collapseRows", ctx_r0.collapseRows);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r0.tabular && $index_r2 < ctx_r0.items.length - 1);
        }
    }
    var Metadata = /** @class */ (function () {
        function Metadata(appService, searchService) {
            this.appService = appService;
            this.searchService = searchService;
            this.showTitles = true;
            this.showIcons = false;
            this.showCounts = true;
            this.clickable = true;
            this.tabular = true;
            this.collapseRows = true;
            this.searchOnClick = true;
            this._select = new i0.EventEmitter();
        }
        Metadata.prototype.select = function (item, valueItem) {
            if (this.searchOnClick) {
                this.searchService.addFieldSelect(item, valueItem);
                this.searchService.search();
            }
            this._select.emit({ item: item, valueItem: valueItem });
        };
        return Metadata;
    }());
    Metadata.ɵfac = function Metadata_Factory(t) { return new (t || Metadata)(i0.ɵɵdirectiveInject(i1$1.AppService), i0.ɵɵdirectiveInject(i2$1.SearchService)); };
    Metadata.ɵcmp = i0.ɵɵdefineComponent({ type: Metadata, selectors: [["sq-metadata"]], hostVars: 2, hostBindings: function Metadata_HostBindings(rf, ctx) {
            if (rf & 2) {
                i0.ɵɵclassProp("sq-tabular", ctx.tabular);
            }
        }, inputs: { record: "record", items: "items", showTitles: "showTitles", showIcons: "showIcons", showCounts: "showCounts", clickable: "clickable", tabular: "tabular", collapseRows: "collapseRows", searchOnClick: "searchOnClick" }, outputs: { _select: "select" }, decls: 1, vars: 1, consts: [[3, "record", "item", "showTitle", "showIcon", "showCounts", "clickable", "tabular", "collapseRows", "select", 4, "ngFor", "ngForOf"], [3, "record", "item", "showTitle", "showIcon", "showCounts", "clickable", "tabular", "collapseRows", "select"], ["class", "ml-1 mr-2", 4, "ngIf"], [1, "ml-1", "mr-2"]], template: function Metadata_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, Metadata_sq_metadata_item_0_Template, 2, 9, "sq-metadata-item", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngForOf", ctx.items);
            }
        }, directives: [i2.NgForOf, MetadataItem, i2.NgIf], pipes: [i3.MessagePipe], styles: [".sq-tabular[_nghost-%COMP%]{display:table}.sq-tabular[_nghost-%COMP%]   sq-metadata-item[_ngcontent-%COMP%]{display:table-row-group}[_nghost-%COMP%]:not(.sq-tabular){display:block}[_nghost-%COMP%]:not(.sq-tabular)   sq-metadata-item[_ngcontent-%COMP%]{display:inline}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(Metadata, [{
                type: i0.Component,
                args: [{
                        selector: "sq-metadata",
                        templateUrl: "./metadata.html",
                        styleUrls: ["./metadata.scss"]
                    }]
            }], function () { return [{ type: i1$1.AppService }, { type: i2$1.SearchService }]; }, { record: [{
                    type: i0.Input
                }], items: [{
                    type: i0.Input
                }], showTitles: [{
                    type: i0.Input
                }], showIcons: [{
                    type: i0.Input
                }], showCounts: [{
                    type: i0.Input
                }], clickable: [{
                    type: i0.Input
                }], tabular: [{
                    type: i0.HostBinding,
                    args: ["class.sq-tabular"]
                }, {
                    type: i0.Input
                }], collapseRows: [{
                    type: i0.Input
                }], searchOnClick: [{
                    type: i0.Input
                }], _select: [{
                    type: i0.Output,
                    args: ["select"]
                }] });
    })();

    var MetadataModule = /** @class */ (function () {
        function MetadataModule() {
        }
        return MetadataModule;
    }());
    MetadataModule.ɵmod = i0.ɵɵdefineNgModule({ type: MetadataModule });
    MetadataModule.ɵinj = i0.ɵɵdefineInjector({ factory: function MetadataModule_Factory(t) { return new (t || MetadataModule)(); }, imports: [[
                i2.CommonModule,
                i3.IntlModule,
                i6.UtilsModule,
                i1.CollapseModule,
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(MetadataModule, { declarations: [Metadata, MetadataItem, Showmore,
                MetadataAccessListsItem, MetadataAccessListsItemSingleAccessList], imports: [i2.CommonModule,
                i3.IntlModule,
                i6.UtilsModule,
                i1.CollapseModule], exports: [Metadata, MetadataItem, Showmore] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(MetadataModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i2.CommonModule,
                            i3.IntlModule,
                            i6.UtilsModule,
                            i1.CollapseModule,
                        ],
                        declarations: [
                            Metadata, MetadataItem, Showmore,
                            MetadataAccessListsItem, MetadataAccessListsItemSingleAccessList
                        ],
                        exports: [
                            Metadata, MetadataItem, Showmore
                        ],
                    }]
            }], null, null);
    })();

    var _enMetadata = {
        metadata: {
            extractslocationsLabel: "Relevant extract",
            extractslocationsPluralLabel: "Relevant extracts",
            geoLabel: "Place",
            geoPluralLabel: "Places",
            personLabel: "Person",
            personPluralLabel: "People",
            companyLabel: "Company",
            companyPluralLabel: "Companies",
            treepathLabel: "Source",
            treepathPluralLabel: "Sources",
            matchlocationsLabel: "Search term",
            matchlocationsPluralLabel: "Search terms",
            titleLabel: "Title",
            titlePluralLabel: "Titles",
            authorsLabel: "Author",
            authorsPluralLabel: "Authors",
            filenameLabel: "Filename",
            filenamePluralLabel: "Filenames",
            modifiedLabel: "Date",
            modifiedPluralLabel: "Dates",
            sizeLabel: "Size",
            sizePluralLabel: "Sizes",
            docformatLabel: "Format",
            docformatPluralLabel: "Formats",
            documentlanguagesLabel: "Language",
            documentlanguagesPluralLabel: "Languages",
            geo_label: "Place",
            geo_plural_label: "Places",
            person_label: "Person",
            person_plural_label: "People",
            company_label: "Company",
            company_plural_label: "Companies",
            treepath_label: "Source",
            treepath_plural_label: "Sources",
            title_label: "Title",
            title_plural_label: "Titles",
            authors_label: "Author",
            authors_plural_label: "Authors",
            filename_label: "Filename",
            filename_plural_label: "Filenames",
            modified_label: "Date",
            modified_plural_label: "Dates",
            size_label: "Size",
            size_plural_label: "Sizes",
            docformat_label: "Format",
            docformat_plural_label: "Formats",
            documentlanguages_label: "Language",
            documentlanguages_plural_label: "Languages",
            accessLists: {
                authorizedListTitleText: "Authorized access list",
                authorizedListHeader: "Authorized access list {value, number}",
                deniedListTitleText: "Denied access list",
                deniedListHeader: "Denied access list {value, number}"
            },
            item: {
                label: "{label}:",
                separator: "|",
                treeSeparator: " ; ",
                treeNodeSeparator: "/",
                listSeparator: ", ",
                empty_boolean: 'false',
                empty_number: '0'
            }
        },
    };

    var _frMetadata = {
        metadata: {
            extractslocationsLabel: "Extrait pertinent",
            extractslocationsPluralLabel: "Extraits pertinents",
            geoLabel: "Lieu",
            geoPluralLabel: "Lieux",
            personLabel: "Personne",
            personPluralLabel: "Personnes",
            companyLabel: "Société",
            companyPluralLabel: "Sociétés",
            treepathLabel: "Source",
            treepathPluralLabel: "Sources",
            matchlocationsLabel: "Terme recherché",
            matchlocationsPluralLabel: "Termes recherchés",
            titleLabel: "Titre",
            titlePluralLabel: "Titres",
            authorsLabel: "Auteur",
            authorsPluralLabel: "Auteurs",
            filenameLabel: "Nom de fichier",
            filenamePluralLabel: "Noms de fichiers",
            modifiedLabel: "Date",
            modifiedPluralLabel: "Dates",
            sizeLabel: "Taille",
            sizePluralLabel: "Tailles",
            docformatLabel: "Format",
            docformatPluralLabel: "Formats",
            documentlanguagesLabel: "Langue",
            documentlanguagesPluralLabel: "Langues",
            geo_label: "Lieu",
            geo_plural_label: "Lieux",
            person_label: "Personne",
            person_plural_label: "Personnes",
            company_label: "Société",
            company_plural_label: "Sociétés",
            treepath_label: "Source",
            treepath_plural_label: "Sources",
            title_label: "Titre",
            title_plural_label: "Titres",
            authors_label: "Auteur",
            authors_plural_label: "Auteurs",
            filename_label: "Nom de fichier",
            filename_plural_label: "Noms de fichiers",
            modified_label: "Date",
            modified_plural_label: "Dates",
            size_label: "Taille",
            size_plural_label: "Tailles",
            docformat_label: "Format",
            docformat_plural_label: "Formats",
            documentlanguages_label: "Langue",
            documentlanguages_plural_label: "Langues",
            accessLists: {
                authorizedListTitleText: "Accès autorisés",
                authorizedListHeader: "Liste d'accès autorisés {value, number}",
                deniedListTitleText: "Accès refusés",
                deniedListHeader: "Liste d'accès refusés {value, number}"
            },
            item: {
                label: "{label}:",
                separator: "|",
                treeSeparator: " ; ",
                treeNodeSeparator: "/",
                listSeparator: ", ",
                empty_boolean: 'false',
                empty_number: '0'
            }
        },
    };

    var _deMetadata = {
        metadata: {
            extractslocationsLabel: "Relevanter Extrakt",
            extractslocationsPluralLabel: "Relevante Extrakte",
            geoLabel: "Ort",
            geoPluralLabel: "Orte",
            personLabel: "Person",
            personPluralLabel: "Personen",
            companyLabel: "Firma",
            companyPluralLabel: "Firmen",
            treepathLabel: "Quelle",
            treepathPluralLabel: "Quellen",
            matchlocationsLabel: "Suchbegriff",
            matchlocationsPluralLabel: "Suchbegriffe",
            titleLabel: "Titel",
            titlePluralLabel: "Titel",
            authorsLabel: "Autor",
            authorsPluralLabel: "Autoren",
            filenameLabel: "Dateiname",
            filenamePluralLabel: "Dateinamen",
            modifiedLabel: "Datum",
            modifiedPluralLabel: "Datumsangaben",
            sizeLabel: "Größe",
            sizePluralLabel: "Größen",
            docformatLabel: "Format",
            docformatPluralLabel: "Formate",
            documentlanguagesLabel: "Sprache",
            documentlanguagesPluralLabel: "Sprachen",
            geo_label: "Ort",
            geo_plural_label: "Orte",
            person_label: "Person",
            person_plural_label: "Personen",
            company_label: "Firma",
            company_plural_label: "Firmen",
            treepath_label: "Quelle",
            treepath_plural_label: "Quellen",
            title_label: "Titel",
            title_plural_label: "Titel",
            authors_label: "Autor",
            authors_plural_label: "Autoren",
            filename_label: "Dateiname",
            filename_plural_label: "Dateinamen",
            modified_label: "Datum",
            modified_plural_label: "Datumsangaben",
            size_label: "Größe",
            size_plural_label: "Größen",
            docformat_label: "Format",
            docformat_plural_label: "Formate",
            documentlanguages_label: "Sprache",
            documentlanguages_plural_label: "Sprachen",
            accessLists: {
                authorizedListTitleText: "Liste der erlaubten Zugriffe",
                authorizedListHeader: "Liste der erlaubten Zugriffe {value, number}",
                deniedListTitleText: "Liste der unerlaubten Zugriffe",
                deniedListHeader: "Liste der unerlaubten Zugriffe {value, number}"
            },
            item: {
                label: "{label}:",
                separator: "|",
                treeSeparator: " ; ",
                treeNodeSeparator: "/",
                listSeparator: ", ",
                empty_boolean: 'false',
                empty_number: '0'
            }
        }
    };

    var enMetadata = base.Utils.merge({}, _enMetadata, facet.enFacet, i1.enCollapse);
    var frMetadata = base.Utils.merge({}, _frMetadata, facet.frFacet, i1.frCollapse);
    var deMetadata = base.Utils.merge({}, _deMetadata, facet.deFacet, i1.deCollapse);

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Metadata = Metadata;
    exports.MetadataAccessListsItem = MetadataAccessListsItem;
    exports.MetadataAccessListsItemSingleAccessList = MetadataAccessListsItemSingleAccessList;
    exports.MetadataItem = MetadataItem;
    exports.MetadataModule = MetadataModule;
    exports.Showmore = Showmore;
    exports.deMetadata = deMetadata;
    exports.enMetadata = enMetadata;
    exports.frMetadata = frMetadata;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-metadata.umd.js.map
