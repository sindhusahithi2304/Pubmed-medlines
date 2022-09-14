(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@sinequa/core/base'), require('@angular/core'), require('@angular/common'), require('@sinequa/components/utils'), require('@sinequa/core/load-component'), require('@sinequa/core/intl'), require('popper.js'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/action', ['exports', '@sinequa/core/base', '@angular/core', '@angular/common', '@sinequa/components/utils', '@sinequa/core/load-component', '@sinequa/core/intl', 'popper.js', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components.action = {}), global.sinequa.core.base, global.ng.core, global.ng.common, global.sinequa.components.utils, global.sinequa.core['load-component'], global.sinequa.core.intl, global.Popper, global.rxjs));
}(this, (function (exports, base, i0, i1, i1$1, i2, i3, Popper, rxjs) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Popper__default = /*#__PURE__*/_interopDefaultLegacy(Popper);

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

    var IAction = /** @class */ (function () {
        function IAction() {
        }
        return IAction;
    }());
    var Action = /** @class */ (function (_super) {
        __extends(Action, _super);
        function Action(options) {
            var _this = _super.call(this) || this;
            base.Utils.extend(_this, options);
            return _this;
        }
        Object.defineProperty(Action.prototype, "hasChildren", {
            get: function () {
                return !!this.children && (this.children.length > 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Action.prototype, "showSelected", {
            get: function () {
                return typeof this.selected !== 'undefined';
            },
            enumerable: false,
            configurable: true
        });
        Action.prototype.update = function () {
            var e_1, _a;
            if (this.updater) {
                this.updater(this);
            }
            if (this.children) {
                try {
                    for (var _b = __values(this.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var child = _c.value;
                        child.update();
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
        };
        return Action;
    }(IAction));

    function BsActionItemContent_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0);
        }
    }
    var _c0 = function (a0, a1) { return { component: a0, inputs: a1 }; };
    function BsActionItemContent_ng_template_1_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            var _r8_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementContainerStart(0, 5);
            i0.ɵɵlistener("click", function BsActionItemContent_ng_template_1_ng_container_0_Template_ng_container_click_0_listener($event) { i0.ɵɵrestoreView(_r8_1); var ctx_r7 = i0.ɵɵnextContext(2); return ctx_r7.componentClick($event); });
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r5 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("sqLoadComponent", i0.ɵɵpureFunction2(1, _c0, ctx_r5.item.component, ctx_r5.item.componentInputs));
        }
    }
    function BsActionItemContent_ng_template_1_div_1_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelement(1, "span", 9);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r9 = i0.ɵɵnextContext(3);
            i0.ɵɵadvance(1);
            i0.ɵɵclassMapInterpolate1("fas fa-check ", ctx_r9.item.selected ? "" : "invisible", "");
        }
    }
    function BsActionItemContent_ng_template_1_div_1_div_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelement(1, "span", 9);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r10 = i0.ɵɵnextContext(3);
            i0.ɵɵadvance(1);
            i0.ɵɵclassMap(ctx_r10.item.icon);
        }
    }
    function BsActionItemContent_ng_template_1_div_1_div_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 10);
            i0.ɵɵelement(1, "span", 9);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r11 = i0.ɵɵnextContext(3);
            i0.ɵɵadvance(1);
            i0.ɵɵclassMap(ctx_r11.item.iconAfter);
        }
    }
    function BsActionItemContent_ng_template_1_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 6);
            i0.ɵɵtemplate(1, BsActionItemContent_ng_template_1_div_1_div_1_Template, 2, 3, "div", 7);
            i0.ɵɵtemplate(2, BsActionItemContent_ng_template_1_div_1_div_2_Template, 2, 3, "div", 7);
            i0.ɵɵelementStart(3, "div");
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, BsActionItemContent_ng_template_1_div_1_div_6_Template, 2, 3, "div", 8);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r6 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r6.item.showSelected);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !!ctx_r6.item.icon);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 4, ctx_r6.text, ctx_r6.item.messageParams));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !!ctx_r6.item.iconAfter);
        }
    }
    function BsActionItemContent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtemplate(0, BsActionItemContent_ng_template_1_ng_container_0_Template, 1, 4, "ng-container", 3);
            i0.ɵɵtemplate(1, BsActionItemContent_ng_template_1_div_1_Template, 7, 7, "div", 4);
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext();
            i0.ɵɵproperty("ngIf", !!ctx_r2.item.component);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !!!ctx_r2.item.component);
        }
    }
    function BsActionItemContent_ng_template_3_span_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span", 9);
        }
        if (rf & 2) {
            var ctx_r12 = i0.ɵɵnextContext(2);
            i0.ɵɵclassMap(ctx_r12.item.icon);
        }
    }
    function BsActionItemContent_ng_template_3_span_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span", 9);
        }
        if (rf & 2) {
            var ctx_r13 = i0.ɵɵnextContext(2);
            i0.ɵɵclassMap(ctx_r13.item.iconAfter);
        }
    }
    function BsActionItemContent_ng_template_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 11);
            i0.ɵɵtemplate(1, BsActionItemContent_ng_template_3_span_1_Template, 1, 3, "span", 12);
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵtemplate(4, BsActionItemContent_ng_template_3_span_4_Template, 1, 3, "span", 12);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r4 = i0.ɵɵnextContext();
            i0.ɵɵproperty("ngClass", ctx_r4.item.styles || "");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !!ctx_r4.item.icon);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(3, 4, ctx_r4.text, ctx_r4.item.messageParams), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !!ctx_r4.item.iconAfter);
        }
    }
    var BsActionItemContent = /** @class */ (function () {
        function BsActionItemContent() {
        }
        BsActionItemContent.prototype.componentClick = function (event) {
            if (this.item.action && !this.item.disabled) {
                this.item.action(this.item, event);
            }
            event.stopPropagation();
            return false;
        };
        return BsActionItemContent;
    }());
    BsActionItemContent.ɵfac = function BsActionItemContent_Factory(t) { return new (t || BsActionItemContent)(); };
    BsActionItemContent.ɵcmp = i0.ɵɵdefineComponent({ type: BsActionItemContent, selectors: [["sq-action-item-content"]], inputs: { item: "item", text: "text", inDropdownMenu: ["in-dropdown-menu", "inDropdownMenu"] }, decls: 5, vars: 3, consts: [[4, "ngIf", "ngIfThen", "ngIfElse"], ["in_dropdown_menu", ""], ["not_in_dropdown_menu", ""], [3, "sqLoadComponent", "click", 4, "ngIf"], ["class", "d-flex flex-row sq-action-item-content-container", 4, "ngIf"], [3, "sqLoadComponent", "click"], [1, "d-flex", "flex-row", "sq-action-item-content-container"], [4, "ngIf"], ["class", "ml-auto", 4, "ngIf"], ["aria-hidden", "true"], [1, "ml-auto"], [3, "ngClass"], ["aria-hidden", "true", 3, "class", 4, "ngIf"]], template: function BsActionItemContent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsActionItemContent_ng_container_0_Template, 1, 0, "ng-container", 0);
                i0.ɵɵtemplate(1, BsActionItemContent_ng_template_1_Template, 2, 2, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
                i0.ɵɵtemplate(3, BsActionItemContent_ng_template_3_Template, 5, 7, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
            }
            if (rf & 2) {
                var _r1 = i0.ɵɵreference(2);
                var _r3 = i0.ɵɵreference(4);
                i0.ɵɵproperty("ngIf", ctx.inDropdownMenu)("ngIfThen", _r1)("ngIfElse", _r3);
            }
        }, directives: [i1.NgIf, i2.LoadComponentDirective, i1.NgClass], pipes: [i3.MessagePipe], styles: [".sq-action-item-content-container[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 0.25rem;\n}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsActionItemContent, [{
                type: i0.Component,
                args: [{
                        selector: "sq-action-item-content",
                        templateUrl: "./action-item-content.html",
                        styles: ["\n.sq-action-item-content-container > div:not(:last-child) {\n    margin-right: 0.25rem;\n}\n    "]
                    }]
            }], null, { item: [{
                    type: i0.Input
                }], text: [{
                    type: i0.Input
                }], inDropdownMenu: [{
                    type: i0.Input,
                    args: ["in-dropdown-menu"]
                }] });
    })();

    var gClassName = {
        DISABLED: 'disabled',
        SHOW: 'show',
        DROPUP: 'dropup',
        DROPRIGHT: 'dropright',
        DROPLEFT: 'dropleft',
        MENURIGHT: 'dropdown-menu-right',
        MENULEFT: 'dropdown-menu-left',
        POSITION_STATIC: 'position-static'
    };
    var gSelector = {
        DROPDOWN: '.dropdown',
        DATA_TOGGLE: '[data-toggle="dropdown"]',
        FORM_CHILD: '.dropdown form',
        MENU: '.dropdown-menu',
        NAVBAR_NAV: '.navbar-nav',
        VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var gAttachmentMap = {
        TOP: 'top-start',
        TOPEND: 'top-end',
        BOTTOM: 'bottom-start',
        BOTTOMEND: 'bottom-end',
        RIGHT: 'right-start',
        RIGHTEND: 'right-end',
        LEFT: 'left-start',
        LEFTEND: 'left-end'
    };
    var BsDropdownService = /** @class */ (function () {
        function BsDropdownService(rendererFactory) {
            var _this = this;
            this.dataApiKeydownHandler = function (event) {
                var descendant = _this.matchDescendant(document.documentElement, event, gSelector.DATA_TOGGLE + "," + gSelector.MENU);
                if (!descendant) {
                    return;
                }
                // If not input/textarea:
                //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
                // If input/textarea:
                //  - If space key => not a dropdown command
                //  - If key is other than escape
                //    - If key is not up or down => not a dropdown command
                //    - If trigger inside the menu => not a dropdown command
                if (/input|textarea/i.test(event.target.tagName) ?
                    event.which === base.Keys.space || event.which !== base.Keys.esc &&
                        (event.which !== base.Keys.down && event.which !== base.Keys.up || event.target.closest(gSelector.MENU)) :
                    !(event.which === base.Keys.up || event.which === base.Keys.down || event.which === base.Keys.esc)) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                if ( /*TODO descendant.disabled || */descendant.classList.contains(gClassName.DISABLED)) {
                    return;
                }
                var parent = _this.getParentFromElement(descendant);
                var isActive = parent instanceof HTMLElement && parent.classList.contains(gClassName.SHOW);
                if (!isActive && event.which === base.Keys.esc) {
                    return;
                }
                if (!isActive || isActive && (event.which === base.Keys.esc || event.which === base.Keys.space)) {
                    if (event.which === base.Keys.esc) {
                        var toggle = parent instanceof Element && parent.querySelector(gSelector.DATA_TOGGLE);
                        if (toggle instanceof HTMLElement) {
                            // toggle.dispatchEvent(new Event("focus", {bubbles: true}));
                            // NB $(toggle).trigger('focus') will set the focus on toggle
                            toggle.focus();
                        }
                    }
                    descendant.dispatchEvent(new Event("click", { bubbles: true }));
                    return;
                }
                var items = [];
                if (parent instanceof Element) {
                    items = items.slice.call(parent.querySelectorAll(gSelector.VISIBLE_ITEMS))
                        .filter(function (item) { return item instanceof HTMLElement && (item.offsetWidth > 0 || item.offsetHeight > 0); });
                }
                if (items.length === 0) {
                    return;
                }
                var index = items.indexOf(event.target);
                if (event.which === base.Keys.up && index > 0) { // Up
                    index--;
                }
                if (event.which === base.Keys.down && index < items.length - 1) { // Down
                    index++;
                }
                if (index < 0) {
                    index = 0;
                }
                items[index].focus();
            };
            this.clearMenus = function (event) {
                if (event && (event.which === 3 /*RIGHT_MOUSE_BUTTON_WHICH*/ ||
                    event.type === 'keyup' && event.which !== base.Keys.tab)) {
                    return;
                }
                _this._events.next({ type: "clear", sourceEvent: event });
            };
            this.toggle = function (event) {
                var descendant = _this.matchDescendant(document.documentElement, event, gSelector.DATA_TOGGLE);
                if (!descendant) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                _this._events.next({ type: "toggle", element: descendant });
            };
            this.formChildClick = function (event) {
                if (!_this.matchDescendant(document.documentElement, event, gSelector.FORM_CHILD)) {
                    return;
                }
                event.stopPropagation();
            };
            this._events = new rxjs.Subject();
            this.renderer = rendererFactory.createRenderer(null, null);
            this.unlisteners = [];
            this.unlisteners.push(this.renderer.listen(document, "keydown", this.dataApiKeydownHandler));
            this.unlisteners.push(this.renderer.listen(document, "click", this.clearMenus));
            this.unlisteners.push(this.renderer.listen(document, "keyup", this.clearMenus));
            this.unlisteners.push(this.renderer.listen(document, "click", this.toggle));
            this.unlisteners.push(this.renderer.listen(document, "click", this.formChildClick));
        }
        BsDropdownService.prototype.ngOnDestroy = function () {
            this._events.complete();
            this.unlisteners.forEach(function (unlistener) { return unlistener(); });
        };
        Object.defineProperty(BsDropdownService.prototype, "events", {
            get: function () {
                return this._events;
            },
            enumerable: false,
            configurable: true
        });
        BsDropdownService.prototype.matchDescendant = function (base, event, selector) {
            var element = event.target;
            while (element && element !== base) {
                if (element.matches(selector)) {
                    return element;
                }
                element = element.parentElement;
            }
            return null;
        };
        BsDropdownService.prototype.getSelectorFromElement = function (element) {
            var selector = element.getAttribute('data-target');
            if (!selector || selector === '#') {
                var hrefAttr = element.getAttribute('href');
                selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
            }
            try {
                return document.querySelector(selector) ? selector : null;
            }
            catch (err) {
                return null;
            }
        };
        BsDropdownService.prototype.getParentFromElement = function (element) {
            var parent = null;
            var selector = this.getSelectorFromElement(element);
            if (selector) {
                parent = document.querySelector(selector);
            }
            if (!parent) {
                // Account for scroll menus and sub menus
                parent = element.parentElement;
                while (parent &&
                    (parent.classList.contains("sq-scroll-menu") ||
                        parent.classList.contains("sq-scroll-menu-item") ||
                        parent.classList.contains("dropdown-submenu"))) {
                    parent = parent.parentElement;
                }
            }
            return parent;
        };
        BsDropdownService.prototype.raiseClear = function () {
            this._events.next({ type: "clear", sourceEvent: undefined });
        };
        return BsDropdownService;
    }());
    BsDropdownService.ɵfac = function BsDropdownService_Factory(t) { return new (t || BsDropdownService)(i0.ɵɵinject(i0.RendererFactory2)); };
    BsDropdownService.ɵprov = i0.ɵɵdefineInjectable({ token: BsDropdownService, factory: BsDropdownService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsDropdownService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () { return [{ type: i0.RendererFactory2 }]; }, null);
    })();

    // Based on  Bootstrap (v4.4.1): dropdown.js
    function noop() { }
    var gConfig = {
        offset: 0,
        flip: true,
        boundary: 'scrollParent',
        reference: 'toggle',
        display: 'dynamic',
        popperConfig: null
    };
    var BsDropdownDirective = /** @class */ (function () {
        function BsDropdownDirective(elementRef, dropdownService) {
            this.elementRef = elementRef;
            this.dropdownService = dropdownService;
        }
        Object.defineProperty(BsDropdownDirective.prototype, "dropdownMenu", {
            get: function () {
                if (!this._dropdownMenu && this.dropdown) {
                    this._dropdownMenu = this.dropdown.querySelector(gSelector.MENU);
                }
                return this._dropdownMenu;
            },
            enumerable: false,
            configurable: true
        });
        BsDropdownDirective.prototype.ngOnInit = function () {
            var _this = this;
            this.subscription = this.dropdownService.events.subscribe(function (event) {
                if (event.type === "clear") {
                    _this.clear(event.sourceEvent);
                }
                else if (event.type === "toggle") {
                    _this.toggle(event.element);
                }
            });
        };
        BsDropdownDirective.prototype.ngAfterViewInit = function () {
            this.dropdownToggle = this.elementRef.nativeElement;
            this.dropdown = this.dropdownService.getParentFromElement(this.dropdownToggle);
            this.inNavbar = !!this.dropdownToggle.closest('.navbar');
        };
        BsDropdownDirective.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        BsDropdownDirective.prototype.clickHandler = function (event) {
            // before event.stopPropagation() 
            // needed to avoid dropdown menu list to stay opened,
            // bubble event to his root parent first and once
            var isActive = this.dropdownMenu && this.dropdownMenu.classList.contains(gClassName.SHOW);
            if (!isActive)
                this.dropdown.dispatchEvent(new Event('click', { bubbles: true, cancelable: false }));
            event.preventDefault();
            event.stopPropagation();
            this.toggle(this.dropdownToggle);
        };
        BsDropdownDirective.prototype.toggle = function (element) {
            if (!element || this.dropdownToggle !== element || !this.dropdownMenu || !this.dropdown) {
                return;
            }
            if ( /*TODO element.disabled || */element.classList.contains(gClassName.DISABLED)) {
                return;
            }
            var isActive = this.dropdownMenu && this.dropdownMenu.classList.contains(gClassName.SHOW);
            this.dropdownService.raiseClear();
            if (isActive) {
                return;
            }
            this.show(true);
        };
        BsDropdownDirective.prototype.getPlacement = function () {
            var placement = gAttachmentMap.BOTTOM;
            // Handle dropup
            if (this.dropdown.classList.contains(gClassName.DROPUP)) {
                placement = gAttachmentMap.TOP;
                if (this.dropdownMenu && this.dropdownMenu.classList.contains(gClassName.MENURIGHT)) {
                    placement = gAttachmentMap.TOPEND;
                }
            }
            else if (this.dropdown.classList.contains(gClassName.DROPRIGHT)) {
                placement = gAttachmentMap.RIGHT;
            }
            else if (this.dropdown.classList.contains(gClassName.DROPLEFT)) {
                placement = gAttachmentMap.LEFT;
            }
            else if (this.dropdownMenu && this.dropdownMenu.classList.contains(gClassName.MENURIGHT)) {
                placement = gAttachmentMap.BOTTOMEND;
            }
            return placement;
        };
        BsDropdownDirective.prototype.getOffset = function () {
            return {
                offset: gConfig.offset
            };
        };
        BsDropdownDirective.prototype.getPopperConfig = function () {
            var popperConfig = {
                placement: this.getPlacement(),
                modifiers: {
                    offset: this.getOffset(),
                    flip: {
                        enabled: gConfig.flip
                    },
                    preventOverflow: {
                        boundariesElement: gConfig.boundary
                    }
                }
            };
            // Disable Popper.js if we have a static display
            if (gConfig.display === 'static') {
                popperConfig.modifiers.applyStyle = {
                    enabled: false
                };
            }
            return popperConfig;
        };
        BsDropdownDirective.prototype.show = function (usePopper) {
            if (usePopper === void 0) { usePopper = false; }
            if (!this.dropdownToggle || !this.dropdownMenu || !this.dropdown) {
                return;
            }
            if ( /*TODO element.disabled || */this.dropdownToggle.classList.contains(gClassName.DISABLED) ||
                this.dropdownMenu.classList.contains(gClassName.SHOW)) {
                return;
            }
            var parent = this.dropdown;
            // Disable totally Popper.js for Dropdown in Navbar
            if (!this.inNavbar && usePopper) {
                /**
                 * Check for Popper dependency
                 * Popper - https://popper.js.org
                 */
                if (typeof Popper__default['default'] === 'undefined') {
                    throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
                }
                var referenceElement = this.dropdownToggle;
                if (gConfig.reference === 'parent') {
                    referenceElement = parent;
                }
                // If boundary is not `scrollParent`, then set position to `static`
                // to allow the menu to "escape" the scroll parent's boundaries
                // https://github.com/twbs/bootstrap/issues/24251
                if (gConfig.boundary !== 'scrollParent') {
                    parent.classList.add(gClassName.POSITION_STATIC);
                }
                this.popper = new Popper__default['default'](referenceElement, this.dropdownMenu, this.getPopperConfig());
            }
            // If this is a touch-enabled device we add extra
            // empty mouseover listeners to the body's immediate children;
            // only needed because of broken event delegation on iOS
            // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
            if ('ontouchstart' in document.documentElement &&
                !parent.closest(gSelector.NAVBAR_NAV)) {
                Array.from(document.body.children).forEach(function (element) { return element.addEventListener('mouseover', noop); });
            }
            this.dropdownToggle.focus();
            this.dropdownToggle.setAttribute('aria-expanded', "true");
            this.dropdownMenu.classList.toggle(gClassName.SHOW);
            parent.classList.toggle(gClassName.SHOW);
        };
        BsDropdownDirective.prototype.clear = function (event) {
            if (!this.dropdownToggle || !this.dropdownMenu || !this.dropdown) {
                return;
            }
            var parent = this.dropdown;
            if (!parent.classList.contains(gClassName.SHOW)) {
                return;
            }
            if (event && (event.type === 'click' &&
                /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === base.Keys.tab) &&
                parent.contains(event.target)) {
                return;
            }
            // If this is a touch-enabled device we remove the extra
            // empty mouseover listeners we added for iOS support
            if ('ontouchstart' in document.documentElement) {
                Array.from(document.body.children).forEach(function (element) { return element.removeEventListener('mouseover', noop); });
            }
            this.dropdownToggle.setAttribute('aria-expanded', 'false');
            if (this.popper) {
                this.popper.destroy();
            }
            this.dropdownMenu.classList.remove(gClassName.SHOW);
            parent.classList.remove(gClassName.SHOW);
        };
        return BsDropdownDirective;
    }());
    BsDropdownDirective.ɵfac = function BsDropdownDirective_Factory(t) { return new (t || BsDropdownDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(BsDropdownService)); };
    BsDropdownDirective.ɵdir = i0.ɵɵdefineDirective({ type: BsDropdownDirective, selectors: [["", "data-toggle", "dropdown"]], hostBindings: function BsDropdownDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function BsDropdownDirective_click_HostBindingHandler($event) { return ctx.clickHandler($event); });
            }
        } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsDropdownDirective, [{
                type: i0.Directive,
                args: [{
                        selector: gSelector.DATA_TOGGLE
                    }]
            }], function () { return [{ type: i0.ElementRef }, { type: BsDropdownService }]; }, { clickHandler: [{
                    type: i0.HostListener,
                    args: ["click", ["$event"]]
                }] });
    })();

    var _c0$1 = ["sq-dropdown-menu", ""];
    function BsDropdownMenu_h6_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "h6", 2);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, ctx_r0.options.item.title, ctx_r0.options.item.messageParams));
        }
    }
    function BsDropdownMenu_ng_container_1_li_1_ng_container_3_a_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "a", 10);
            i0.ɵɵelement(1, "sq-action-item-content", 11);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var child_r2 = i0.ɵɵnextContext(3).$implicit;
            i0.ɵɵclassMapInterpolate1("dropdown-item ", child_r2.disabled ? "disabled" : "", "");
            i0.ɵɵpropertyInterpolate("href", child_r2.href, i0.ɵɵsanitizeUrl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("item", child_r2)("text", child_r2.text)("in-dropdown-menu", true);
        }
    }
    function BsDropdownMenu_ng_container_1_li_1_ng_container_3_a_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r12_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 12);
            i0.ɵɵlistener("click", function BsDropdownMenu_ng_container_1_li_1_ng_container_3_a_2_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r12_1); var child_r2 = i0.ɵɵnextContext(3).$implicit; var ctx_r10 = i0.ɵɵnextContext(); return ctx_r10.click(child_r2, $event); });
            i0.ɵɵelement(1, "sq-action-item-content", 11);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var child_r2 = i0.ɵɵnextContext(3).$implicit;
            i0.ɵɵclassMapInterpolate2("dropdown-item ", child_r2.hasChildren ? "dropdown-toggle" : "", " ", child_r2.disabled ? "disabled" : "", "");
            i0.ɵɵattribute("data-toggle", child_r2.hasChildren ? "dropdown" : "");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("item", child_r2)("text", child_r2.text)("in-dropdown-menu", true);
        }
    }
    function BsDropdownMenu_ng_container_1_li_1_ng_container_3_sq_action_item_content_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "sq-action-item-content", 11);
        }
        if (rf & 2) {
            var child_r2 = i0.ɵɵnextContext(3).$implicit;
            i0.ɵɵproperty("item", child_r2)("text", child_r2.text)("in-dropdown-menu", true);
        }
    }
    var _c1 = function (a0, a1) { return { item: a0, showMenuClass: a1 }; };
    function BsDropdownMenu_ng_container_1_li_1_ng_container_3_ul_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "ul", 13);
        }
        if (rf & 2) {
            var child_r2 = i0.ɵɵnextContext(3).$implicit;
            var ctx_r8 = i0.ɵɵnextContext();
            i0.ɵɵproperty("sq-dropdown-menu", i0.ɵɵpureFunction2(1, _c1, child_r2, ctx_r8.options.showMenuClass));
        }
    }
    function BsDropdownMenu_ng_container_1_li_1_ng_container_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsDropdownMenu_ng_container_1_li_1_ng_container_3_a_1_Template, 2, 7, "a", 6);
            i0.ɵɵtemplate(2, BsDropdownMenu_ng_container_1_li_1_ng_container_3_a_2_Template, 2, 8, "a", 7);
            i0.ɵɵtemplate(3, BsDropdownMenu_ng_container_1_li_1_ng_container_3_sq_action_item_content_3_Template, 1, 3, "sq-action-item-content", 8);
            i0.ɵɵtemplate(4, BsDropdownMenu_ng_container_1_li_1_ng_container_3_ul_4_Template, 1, 4, "ul", 9);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var child_r2 = i0.ɵɵnextContext(2).$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !child_r2.scrollGroup && child_r2.href);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !child_r2.scrollGroup && !child_r2.href && !child_r2.component);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", child_r2.component);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", child_r2.hasChildren);
        }
    }
    function BsDropdownMenu_ng_container_1_li_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "li", 4);
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵtemplate(3, BsDropdownMenu_ng_container_1_li_1_ng_container_3_Template, 5, 4, "ng-container", 5);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var child_r2 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵclassMap(child_r2.separator ? "dropdown-divider" : child_r2.scrollGroup ? "sq-scroll-menu-item open" : child_r2.hasChildren ? "dropdown-submenu" : "");
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind2(1, 6, child_r2.title, child_r2.messageParams));
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(2, 9, child_r2.title, child_r2.messageParams));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", !child_r2.separator);
        }
    }
    function BsDropdownMenu_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsDropdownMenu_ng_container_1_li_1_Template, 4, 12, "li", 3);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var child_r2 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !child_r2.hidden);
        }
    }
    var BsDropdownMenu = /** @class */ (function () {
        function BsDropdownMenu(elementRef) {
            this.elementRef = elementRef;
        }
        Object.defineProperty(BsDropdownMenu.prototype, "options", {
            get: function () {
                return this._options;
            },
            set: function (opts) {
                var _a;
                this._options = Object.assign({}, opts);
                this.children = ((_a = opts.item.children) === null || _a === void 0 ? void 0 : _a.filter(function (child) { return !child.hidden; })) || [];
            },
            enumerable: false,
            configurable: true
        });
        BsDropdownMenu.prototype.ngOnInit = function () {
            var element = this.elementRef.nativeElement;
            if (this.options.item.scrollable) {
                element.classList.add("sq-scrollable-menu");
            }
            else if (this.options.item.scrollGroup) {
                element.classList.add("sq-scroll-menu");
            }
            this.rightAligned = this.options.rightAligned;
        };
        BsDropdownMenu.prototype.getLi = function (element) {
            var element1 = element;
            while (element1 && element1.nodeName !== "LI") {
                element1 = element1.parentElement;
            }
            return element1;
        };
        BsDropdownMenu.prototype.click = function (item, event) {
            if (!this.options.item.disabled) {
                // Handle sub-menu opening
                var isOpen = false;
                var li = this.getLi(event.target);
                if (!!li && li.classList.contains("dropdown-submenu")) {
                    event.preventDefault();
                    event.stopPropagation();
                    isOpen = li.classList.contains(this.options.showMenuClass);
                    var ul = li.parentElement;
                    if (ul) {
                        for (var i = 0, ic = ul.children.length; i < ic; i++) {
                            var _li = ul.children[i];
                            _li.classList.remove(this.options.showMenuClass);
                        }
                    }
                    // NB toggle's second param does not work on IE
                    // li.classList.toggle(this.options.showMenuClass, !isOpen);
                    if (!isOpen) {
                        li.classList.add(this.options.showMenuClass);
                    }
                }
                if (item.action) {
                    item.action(item, event);
                }
                if (item.toggle) {
                    item.toggle(item, !isOpen);
                }
            }
        };
        return BsDropdownMenu;
    }());
    BsDropdownMenu.ɵfac = function BsDropdownMenu_Factory(t) { return new (t || BsDropdownMenu)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
    BsDropdownMenu.ɵcmp = i0.ɵɵdefineComponent({ type: BsDropdownMenu, selectors: [["", "sq-dropdown-menu", ""]], hostAttrs: ["role", "menu", 1, "dropdown-menu"], hostVars: 2, hostBindings: function BsDropdownMenu_HostBindings(rf, ctx) {
            if (rf & 2) {
                i0.ɵɵclassProp("dropdown-menu-right", ctx.rightAligned);
            }
        }, inputs: { options: ["sq-dropdown-menu", "options"] }, attrs: _c0$1, decls: 2, vars: 2, consts: [["class", "dropdown-header", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "dropdown-header"], [3, "class", "title", 4, "ngIf"], [3, "title"], [4, "ngIf"], ["tabindex", "-1", 3, "class", "href", 4, "ngIf"], ["href", "javascript:void(0)", "tabindex", "-1", 3, "class", "click", 4, "ngIf"], [3, "item", "text", "in-dropdown-menu", 4, "ngIf"], [3, "sq-dropdown-menu", 4, "ngIf"], ["tabindex", "-1", 3, "href"], [3, "item", "text", "in-dropdown-menu"], ["href", "javascript:void(0)", "tabindex", "-1", 3, "click"], [3, "sq-dropdown-menu"]], template: function BsDropdownMenu_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsDropdownMenu_h6_0_Template, 3, 4, "h6", 0);
                i0.ɵɵtemplate(1, BsDropdownMenu_ng_container_1_Template, 2, 1, "ng-container", 1);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.options.item.title && ctx.options.item.headerGroup);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", ctx.options.item.children);
            }
        }, directives: [i1.NgIf, i1.NgForOf, BsActionItemContent, BsDropdownMenu], pipes: [i3.MessagePipe], encapsulation: 2, changeDetection: 0 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsDropdownMenu, [{
                type: i0.Component,
                args: [{
                        selector: "[sq-dropdown-menu]",
                        host: {
                            "class": "dropdown-menu",
                            "role": "menu"
                        },
                        templateUrl: "./dropdown-menu.html",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], function () { return [{ type: i0.ElementRef }]; }, { options: [{
                    type: i0.Input,
                    args: ["sq-dropdown-menu"]
                }], rightAligned: [{
                    type: i0.HostBinding,
                    args: ["class.dropdown-menu-right"]
                }] });
    })();

    var _c0$2 = ["sq-action-item", ""];
    function BsActionItem_ng_container_0_button_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r11_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "button", 7);
            i0.ɵɵlistener("click", function BsActionItem_ng_container_0_button_1_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r11_1); var ctx_r10 = i0.ɵɵnextContext(2); return ctx_r10.click($event); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelement(3, "sq-action-item-content", 8);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r4 = i0.ɵɵnextContext(2);
            i0.ɵɵclassMapInterpolate3("btn ", ctx_r4.styleClass, " ", ctx_r4.sizeClass, " ", ctx_r4.options.item.disabled ? "disabled" : "", "");
            i0.ɵɵpropertyInterpolate("sqTooltip", i0.ɵɵpipeBind2(1, 9, ctx_r4.itemTitle, ctx_r4.itemMessageParams));
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(2, 12, ctx_r4.itemTitle, ctx_r4.itemMessageParams));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("item", ctx_r4.options.item)("text", ctx_r4.itemText);
        }
    }
    function BsActionItem_ng_container_0_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0);
        }
    }
    function BsActionItem_ng_container_0_ng_template_3_div_0_sq_action_item_content_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "sq-action-item-content", 8);
        }
        if (rf & 2) {
            var ctx_r13 = i0.ɵɵnextContext(4);
            i0.ɵɵproperty("item", ctx_r13.options.item)("text", ctx_r13.itemText);
        }
    }
    function BsActionItem_ng_container_0_ng_template_3_div_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵtemplate(1, BsActionItem_ng_container_0_ng_template_3_div_0_sq_action_item_content_1_Template, 1, 2, "sq-action-item-content", 1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r12 = i0.ɵɵnextContext(3);
            i0.ɵɵclassMapInterpolate1("btn-text ", ctx_r12.sizeClass, "");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r12.hasAction);
        }
    }
    function BsActionItem_ng_container_0_ng_template_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtemplate(0, BsActionItem_ng_container_0_ng_template_3_div_0_Template, 2, 4, "div", 9);
        }
        if (rf & 2) {
            var ctx_r7 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("ngIf", !ctx_r7.hasAction);
        }
    }
    function BsActionItem_ng_container_0_ng_template_5_sq_action_item_content_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "sq-action-item-content", 8);
        }
        if (rf & 2) {
            var ctx_r14 = i0.ɵɵnextContext(3);
            i0.ɵɵproperty("item", ctx_r14.options.item)("text", ctx_r14.itemText);
        }
    }
    function BsActionItem_ng_container_0_ng_template_5_ul_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "ul", 12);
        }
        if (rf & 2) {
            var ctx_r15 = i0.ɵɵnextContext(3);
            i0.ɵɵproperty("sq-dropdown-menu", ctx_r15.dropdownMenuOptions);
        }
    }
    function BsActionItem_ng_container_0_ng_template_5_Template(rf, ctx) {
        if (rf & 1) {
            var _r17_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "button", 10);
            i0.ɵɵlistener("touchstart", function BsActionItem_ng_container_0_ng_template_5_Template_button_touchstart_0_listener() { i0.ɵɵrestoreView(_r17_1); var ctx_r16 = i0.ɵɵnextContext(2); return ctx_r16.touchstart(); })("mousedown", function BsActionItem_ng_container_0_ng_template_5_Template_button_mousedown_0_listener() { i0.ɵɵrestoreView(_r17_1); var ctx_r18 = i0.ɵɵnextContext(2); return ctx_r18.mousedown(); })("focusin", function BsActionItem_ng_container_0_ng_template_5_Template_button_focusin_0_listener() { i0.ɵɵrestoreView(_r17_1); var ctx_r19 = i0.ɵɵnextContext(2); return ctx_r19.focusin(); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵtemplate(3, BsActionItem_ng_container_0_ng_template_5_sq_action_item_content_3_Template, 1, 2, "sq-action-item-content", 1);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(4, BsActionItem_ng_container_0_ng_template_5_ul_4_Template, 1, 1, "ul", 11);
        }
        if (rf & 2) {
            var ctx_r9 = i0.ɵɵnextContext(2);
            i0.ɵɵclassMapInterpolate2("btn ", ctx_r9.styleClass, " dropdown-toggle ", ctx_r9.sizeClass, "");
            i0.ɵɵpropertyInterpolate("sqTooltip", i0.ɵɵpipeBind2(1, 8, ctx_r9.itemTitle, ctx_r9.itemMessageParams));
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(2, 11, ctx_r9.itemTitle, ctx_r9.itemMessageParams));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", !ctx_r9.hasAction);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r9.showDropdown);
        }
    }
    function BsActionItem_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsActionItem_ng_container_0_button_1_Template, 4, 15, "button", 3);
            i0.ɵɵtemplate(2, BsActionItem_ng_container_0_ng_container_2_Template, 1, 0, "ng-container", 4);
            i0.ɵɵtemplate(3, BsActionItem_ng_container_0_ng_template_3_Template, 1, 1, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵtemplate(5, BsActionItem_ng_container_0_ng_template_5_Template, 5, 14, "ng-template", null, 6, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var _r6 = i0.ɵɵreference(4);
            var _r8 = i0.ɵɵreference(6);
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.hasAction);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.options.item.flattenable && (ctx_r0.options.item.children == null ? null : ctx_r0.options.item.children.length) === 1)("ngIfThen", _r6)("ngIfElse", _r8);
        }
    }
    function BsActionItem_sq_action_item_content_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "sq-action-item-content", 8);
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵproperty("item", ctx_r1.options.item)("text", ctx_r1.itemText);
        }
    }
    function BsActionItem_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r21_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "a", 13);
            i0.ɵɵlistener("click", function BsActionItem_ng_container_2_Template_a_click_1_listener($event) { i0.ɵɵrestoreView(_r21_1); var ctx_r20 = i0.ɵɵnextContext(); return ctx_r20.click($event); });
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵelement(4, "sq-action-item-content", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "ul", 12);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵclassMapInterpolate2("", ctx_r2.options.inMenu ? "nav-link" : "dropdown-item", " dropdown-toggle ", ctx_r2.options.item.disabled ? "disabled" : "", "");
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind2(2, 9, ctx_r2.itemTitle, ctx_r2.itemMessageParams));
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(3, 12, ctx_r2.itemTitle, ctx_r2.itemMessageParams));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("item", ctx_r2.options.item)("text", ctx_r2.itemText);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("sq-dropdown-menu", ctx_r2.dropdownMenuOptions);
        }
    }
    function BsActionItem_a_3_Template(rf, ctx) {
        if (rf & 1) {
            var _r23_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 14);
            i0.ɵɵlistener("click", function BsActionItem_a_3_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r23_1); var ctx_r22 = i0.ɵɵnextContext(); return ctx_r22.click($event); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelement(3, "sq-action-item-content", 8);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r3 = i0.ɵɵnextContext();
            i0.ɵɵclassMapInterpolate2("", ctx_r3.options.inMenu ? "nav-link" : "dropdown-item", " ", ctx_r3.options.item.disabled ? "disabled" : "", "");
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind2(1, 8, ctx_r3.itemTitle, ctx_r3.itemMessageParams));
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(2, 11, ctx_r3.itemTitle, ctx_r3.itemMessageParams));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("item", ctx_r3.options.item)("text", ctx_r3.itemText);
        }
    }
    var BsActionItem = /** @class */ (function () {
        function BsActionItem(uiService, elementRef, cdRef) {
            this.uiService = uiService;
            this.elementRef = elementRef;
            this.cdRef = cdRef;
            this.collapseBreakpoint = "md";
        }
        Object.defineProperty(BsActionItem.prototype, "haveItem", {
            get: function () {
                return !!this.options.item;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsActionItem.prototype, "isVisible", {
            get: function () {
                return this.haveItem && !this.options.item.hidden;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsActionItem.prototype, "hasAction", {
            get: function () {
                return this.haveItem && !!this.options.item.action;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsActionItem.prototype, "isDropdownButton", {
            get: function () {
                return this.isVisible && !this.inListItem && this.options.item.hasChildren;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsActionItem.prototype, "isButton", {
            get: function () {
                return this.isVisible && !this.inListItem && !this.options.item.hasChildren && this.hasAction;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsActionItem.prototype, "isDropdownListItem", {
            get: function () {
                return this.isVisible && this.inListItem && this.options.item.hasChildren;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsActionItem.prototype, "isListItem", {
            get: function () {
                return this.isVisible && this.inListItem && !this.options.item.hasChildren && this.hasAction;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsActionItem.prototype, "haveSpace", {
            get: function () {
                if (this.uiService.screenSizeIsGreaterOrEqual(this.autoAdjustBreakpoint)) {
                    return true;
                }
                if (this.inListItem && this.uiService.screenSizeIsLess(this.collapseBreakpoint)) {
                    return true;
                }
                return false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsActionItem.prototype, "haveIcon", {
            get: function () {
                return !!this.options.item.icon || !!this.options.item.iconAfter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsActionItem.prototype, "itemText", {
            get: function () {
                if (!this.haveItem) {
                    return "";
                }
                var text = this.options.item.text || "";
                if (this.options.autoAdjust && this.haveIcon) {
                    return this.haveSpace ? text : "";
                }
                else {
                    return text;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsActionItem.prototype, "itemTitle", {
            get: function () {
                if (!this.haveItem) {
                    return "";
                }
                var text = this.options.item.text || "";
                var title = this.options.item.title || "";
                if (this.options.autoAdjust && this.haveIcon) {
                    return this.haveSpace ? (title !== text ? title : "") : title || text;
                }
                else {
                    return title;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsActionItem.prototype, "itemMessageParams", {
            get: function () {
                if (!this.haveItem) {
                    return null;
                }
                return this.options.item.messageParams;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsActionItem.prototype, "sizeClass", {
            get: function () {
                return this.options.size ? "btn-" + this.options.size : "";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsActionItem.prototype, "styleClass", {
            get: function () {
                return this.options.style ? "btn-" + this.options.style : "btn-light";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsActionItem.prototype, "dropdownMenuOptions", {
            get: function () {
                return (Object.assign(Object.assign({}, this.options), { showMenuClass: 'show' }));
            },
            enumerable: false,
            configurable: true
        });
        BsActionItem.prototype.ngAfterViewInit = function () {
            this.dropdownButton = this.elementRef.nativeElement.querySelector("div.dropdown");
            this.dropdownListItem = this.elementRef.nativeElement.querySelector("li.dropdown-toggle");
        };
        BsActionItem.prototype.ngOnInit = function () {
            var _this = this;
            this.inListItem = (this.elementRef.nativeElement.nodeName === "LI");
            if (this.options.item.init) {
                this.options.item.init(this.options.item);
            }
            this.autoAdjustBreakpoint = this.options.autoAdjustBreakpoint;
            this.uiService.resizeEvent.subscribe(function (e) { return _this.cdRef.detectChanges(); });
        };
        BsActionItem.prototype.ngOnDestroy = function () {
            if (this.options.item.destroy) {
                this.options.item.destroy(this.options.item);
            }
        };
        BsActionItem.prototype.click = function (event) {
            if (!this.options.item.disabled) {
                if (this.options.item.action) {
                    this.options.item.action(this.options.item, event);
                }
                if (this.options.item.toggle && (this.isDropdownButton || this.isDropdownListItem)) {
                    var openElement = this.dropdownButton || (this.dropdownListItem ? this.dropdownListItem.parentElement : null);
                    if (openElement) {
                        this.options.item.toggle(this.options.item, !openElement.classList.contains("open"));
                    }
                }
            }
        };
        BsActionItem.prototype.touchstart = function () {
            this.showDropdown = true;
        };
        BsActionItem.prototype.mousedown = function () {
            this.showDropdown = true;
        };
        BsActionItem.prototype.focusin = function () {
            this.showDropdown = true;
        };
        return BsActionItem;
    }());
    BsActionItem.ɵfac = function BsActionItem_Factory(t) { return new (t || BsActionItem)(i0.ɵɵdirectiveInject(i1$1.UIService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    BsActionItem.ɵcmp = i0.ɵɵdefineComponent({ type: BsActionItem, selectors: [["", "sq-action-item", ""]], inputs: { options: ["sq-action-item", "options"], collapseBreakpoint: "collapseBreakpoint" }, attrs: _c0$2, decls: 4, vars: 4, consts: [[4, "ngIf"], [3, "item", "text", 4, "ngIf"], ["href", "javascript:void(0)", "role", "button", 3, "class", "title", "click", 4, "ngIf"], ["type", "button", 3, "class", "sqTooltip", "click", 4, "ngIf"], [4, "ngIf", "ngIfThen", "ngIfElse"], ["flattened", ""], ["unflattened", ""], ["type", "button", 3, "sqTooltip", "click"], [3, "item", "text"], [3, "class", 4, "ngIf"], ["type", "button", "data-toggle", "dropdown", 3, "sqTooltip", "touchstart", "mousedown", "focusin"], [3, "sq-dropdown-menu", 4, "ngIf"], [3, "sq-dropdown-menu"], ["href", "javascript:void(0)", "data-toggle", "dropdown", "role", "button", "aria-haspopup", "true", "aria-expanded", "false", 3, "title", "click"], ["href", "javascript:void(0)", "role", "button", 3, "title", "click"]], template: function BsActionItem_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsActionItem_ng_container_0_Template, 7, 4, "ng-container", 0);
                i0.ɵɵtemplate(1, BsActionItem_sq_action_item_content_1_Template, 1, 2, "sq-action-item-content", 1);
                i0.ɵɵtemplate(2, BsActionItem_ng_container_2_Template, 6, 15, "ng-container", 0);
                i0.ɵɵtemplate(3, BsActionItem_a_3_Template, 4, 14, "a", 2);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.isDropdownButton);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.isButton);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.isDropdownListItem);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.isListItem);
            }
        }, directives: [i1.NgIf, i1$1.TooltipDirective, BsActionItemContent, BsDropdownDirective, BsDropdownMenu], pipes: [i3.MessagePipe], encapsulation: 2, changeDetection: 0 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsActionItem, [{
                type: i0.Component,
                args: [{
                        selector: "[sq-action-item]",
                        templateUrl: "./action-item.html",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], function () { return [{ type: i1$1.UIService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, { options: [{
                    type: i0.Input,
                    args: ["sq-action-item"]
                }], collapseBreakpoint: [{
                    type: i0.Input
                }] });
    })();

    var _c0$3 = ["sq-action-buttons", ""];
    function BsActionButtons_ng_container_0_a_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r6_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 3);
            i0.ɵɵlistener("click", function BsActionButtons_ng_container_0_a_1_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r6_1); var item_r1 = i0.ɵɵnextContext().$implicit; var ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.itemClick(item_r1, $event); });
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r1 = i0.ɵɵnextContext().$implicit;
            var ctx_r2 = i0.ɵɵnextContext();
            i0.ɵɵproperty("sq-action-item", ctx_r2.getActionItemOptions(item_r1));
            i0.ɵɵattribute("href", !item_r1.disabled ? item_r1.href : null, i0.ɵɵsanitizeUrl);
        }
    }
    function BsActionButtons_ng_container_0_ng_container_2_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "div", 6);
        }
        if (rf & 2) {
            var item_r1 = i0.ɵɵnextContext(2).$implicit;
            var ctx_r8 = i0.ɵɵnextContext();
            i0.ɵɵproperty("sq-action-item", ctx_r8.getActionItemOptions(item_r1));
        }
    }
    function BsActionButtons_ng_container_0_ng_container_2_button_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r13_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "button", 7);
            i0.ɵɵlistener("click", function BsActionButtons_ng_container_0_ng_container_2_button_2_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r13_1); var item_r1 = i0.ɵɵnextContext(2).$implicit; var ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.itemClick(item_r1, $event); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r1 = i0.ɵɵnextContext(2).$implicit;
            var ctx_r9 = i0.ɵɵnextContext();
            i0.ɵɵclassMapInterpolate4("btn ", ctx_r9.styleClass, " ", ctx_r9.sizeClass, " ", item_r1.selected ? "active" : "", " ", item_r1.disabled ? "disabled" : "", "");
            i0.ɵɵpropertyInterpolate("sqTooltip", i0.ɵɵpipeBind2(1, 9, item_r1.title, item_r1.messageParams));
            i0.ɵɵproperty("sq-action-item", ctx_r9.getActionItemOptions(item_r1));
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(2, 12, item_r1.title, item_r1.messageParams));
        }
    }
    function BsActionButtons_ng_container_0_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsActionButtons_ng_container_0_ng_container_2_div_1_Template, 1, 1, "div", 4);
            i0.ɵɵtemplate(2, BsActionButtons_ng_container_0_ng_container_2_button_2_Template, 3, 15, "button", 5);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var item_r1 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", item_r1.hasChildren);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !item_r1.hasChildren);
        }
    }
    function BsActionButtons_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsActionButtons_ng_container_0_a_1_Template, 1, 2, "a", 1);
            i0.ɵɵtemplate(2, BsActionButtons_ng_container_0_ng_container_2_Template, 3, 2, "ng-container", 2);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var item_r1 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", item_r1.href);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !item_r1.href);
        }
    }
    var BsActionButtons = /** @class */ (function () {
        function BsActionButtons() {
        }
        Object.defineProperty(BsActionButtons.prototype, "options", {
            get: function () {
                return this._options;
            },
            set: function (opts) {
                this._options = opts;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsActionButtons.prototype, "sizeClass", {
            get: function () {
                return this._options.size ? "btn-" + this._options.size : "";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsActionButtons.prototype, "styleClass", {
            get: function () {
                return this._options.style ? "btn-" + this._options.style : "btn-light";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsActionButtons.prototype, "itemsVisible", {
            get: function () {
                // hidden items are not displayed
                return (Array.isArray(this._options.items)) ? this._options.items.filter(function (item) { return !item.hidden; }) : this._options.items.hidden ? [] : [this._options.items];
            },
            enumerable: false,
            configurable: true
        });
        BsActionButtons.prototype.getActionItemOptions = function (item) {
            return (Object.assign(Object.assign({}, this._options), { item: item, inMenu: false }));
        };
        BsActionButtons.prototype.itemClick = function (item, event) {
            if (!item.disabled && item.action) {
                item.action(item, event);
            }
            if (item.href === "#" || (!!item.href && item.disabled)) {
                event.preventDefault();
            }
        };
        return BsActionButtons;
    }());
    BsActionButtons.ɵfac = function BsActionButtons_Factory(t) { return new (t || BsActionButtons)(); };
    BsActionButtons.ɵcmp = i0.ɵɵdefineComponent({ type: BsActionButtons, selectors: [["", "sq-action-buttons", ""]], inputs: { options: ["sq-action-buttons", "options"] }, attrs: _c0$3, decls: 1, vars: 1, consts: [[4, "ngFor", "ngForOf"], ["class", "btn-text", 3, "sq-action-item", "click", 4, "ngIf"], [4, "ngIf"], [1, "btn-text", 3, "sq-action-item", "click"], ["class", "btn-group dropdown", 3, "sq-action-item", 4, "ngIf"], ["type", "button", 3, "class", "sq-action-item", "sqTooltip", "click", 4, "ngIf"], [1, "btn-group", "dropdown", 3, "sq-action-item"], ["type", "button", 3, "sq-action-item", "sqTooltip", "click"]], template: function BsActionButtons_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsActionButtons_ng_container_0_Template, 3, 2, "ng-container", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngForOf", ctx.itemsVisible);
            }
        }, directives: [i1.NgForOf, i1.NgIf, BsActionItem, i1$1.TooltipDirective], pipes: [i3.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsActionButtons, [{
                type: i0.Component,
                args: [{
                        selector: "[sq-action-buttons]",
                        templateUrl: "./action-buttons.html"
                    }]
            }], null, { options: [{
                    type: i0.Input,
                    args: ["sq-action-buttons"]
                }] });
    })();

    var _c0$4 = function (a0, a1, a2, a3) { return { item: a0, size: a1, autoAdjust: a2, autoAdjustBreakpoint: a3, inMenu: true }; };
    function BsActionMenu_ng_container_1_li_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "li", 2);
        }
        if (rf & 2) {
            var item_r1 = i0.ɵɵnextContext().$implicit;
            var ctx_r2 = i0.ɵɵnextContext();
            i0.ɵɵclassMapInterpolate1("nav-item ", item_r1.hasChildren ? "dropdown" : "", "");
            i0.ɵɵproperty("sq-action-item", i0.ɵɵpureFunction4(5, _c0$4, item_r1, ctx_r2.size, ctx_r2.autoAdjust, ctx_r2.autoAdjustBreakpoint))("collapseBreakpoint", ctx_r2.collapseBreakpoint);
        }
    }
    function BsActionMenu_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsActionMenu_ng_container_1_li_1_Template, 1, 10, "li", 1);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var item_r1 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !item_r1.hidden);
        }
    }
    var BsActionMenu = /** @class */ (function () {
        function BsActionMenu() {
        }
        BsActionMenu.prototype.ngOnInit = function () {
            if (!base.Utils.isArray(this.items)) {
                this.items = [this.items];
            }
        };
        BsActionMenu.prototype.identify = function (index, item) {
            return item.name || item.text || item.title || index;
        };
        return BsActionMenu;
    }());
    BsActionMenu.ɵfac = function BsActionMenu_Factory(t) { return new (t || BsActionMenu)(); };
    BsActionMenu.ɵcmp = i0.ɵɵdefineComponent({ type: BsActionMenu, selectors: [["sq-action-menu"]], inputs: { items: "items", size: "size", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", right: "right" }, decls: 2, vars: 5, consts: [[4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "class", "sq-action-item", "collapseBreakpoint", 4, "ngIf"], [3, "sq-action-item", "collapseBreakpoint"]], template: function BsActionMenu_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "ul");
                i0.ɵɵtemplate(1, BsActionMenu_ng_container_1_Template, 2, 1, "ng-container", 0);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵclassMapInterpolate1("navbar-nav ", ctx.right ? "navbar-right" : "", "");
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", ctx.items)("ngForTrackBy", ctx.identify);
            }
        }, directives: [i1.NgForOf, i1.NgIf, BsActionItem], encapsulation: 2, changeDetection: 0 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsActionMenu, [{
                type: i0.Component,
                args: [{
                        selector: "sq-action-menu",
                        templateUrl: "./action-menu.html",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], null, { items: [{
                    type: i0.Input
                }], size: [{
                    type: i0.Input
                }], autoAdjust: [{
                    type: i0.Input
                }], autoAdjustBreakpoint: [{
                    type: i0.Input
                }], collapseBreakpoint: [{
                    type: i0.Input
                }], right: [{
                    type: i0.Input
                }] });
    })();

    var BsActionModule = /** @class */ (function () {
        function BsActionModule() {
        }
        return BsActionModule;
    }());
    BsActionModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsActionModule });
    BsActionModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsActionModule_Factory(t) { return new (t || BsActionModule)(); }, imports: [[
                i1.CommonModule,
                i3.IntlModule,
                i2.LoadComponentModule,
                i1$1.UtilsModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsActionModule, { declarations: [BsActionButtons,
                BsActionItemContent,
                BsActionItem,
                BsActionMenu,
                BsDropdownMenu,
                BsDropdownDirective], imports: [i1.CommonModule,
                i3.IntlModule,
                i2.LoadComponentModule,
                i1$1.UtilsModule], exports: [BsActionButtons,
                BsActionMenu,
                BsActionItem,
                BsDropdownDirective] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsActionModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i1.CommonModule,
                            i3.IntlModule,
                            i2.LoadComponentModule,
                            i1$1.UtilsModule
                        ],
                        declarations: [
                            BsActionButtons,
                            BsActionItemContent,
                            BsActionItem,
                            BsActionMenu,
                            BsDropdownMenu,
                            BsDropdownDirective
                        ],
                        exports: [
                            BsActionButtons,
                            BsActionMenu,
                            BsActionItem,
                            BsDropdownDirective
                        ]
                    }]
            }], null, null);
    })();

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Action = Action;
    exports.BsActionButtons = BsActionButtons;
    exports.BsActionItem = BsActionItem;
    exports.BsActionItemContent = BsActionItemContent;
    exports.BsActionMenu = BsActionMenu;
    exports.BsActionModule = BsActionModule;
    exports.BsDropdownDirective = BsDropdownDirective;
    exports.BsDropdownMenu = BsDropdownMenu;
    exports.BsDropdownService = BsDropdownService;
    exports.IAction = IAction;
    exports.gAttachmentMap = gAttachmentMap;
    exports.gClassName = gClassName;
    exports.gSelector = gSelector;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-action.umd.js.map
