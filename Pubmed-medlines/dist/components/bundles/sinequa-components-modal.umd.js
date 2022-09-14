(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('@sinequa/core/modal'), require('@sinequa/core/login'), require('@sinequa/core/intl'), require('@sinequa/core/validation'), require('@sinequa/components/utils'), require('@angular/cdk/a11y'), require('@sinequa/core/web-services'), require('@sinequa/core/base'), require('@angular/platform-browser'), require('rxjs/operators'), require('@angular/cdk/overlay')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/modal', ['exports', '@angular/core', '@angular/common', '@angular/forms', '@sinequa/core/modal', '@sinequa/core/login', '@sinequa/core/intl', '@sinequa/core/validation', '@sinequa/components/utils', '@angular/cdk/a11y', '@sinequa/core/web-services', '@sinequa/core/base', '@angular/platform-browser', 'rxjs/operators', '@angular/cdk/overlay'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components.modal = {}), global.ng.core, global.ng.common, global.ng.forms, global.sinequa.core.modal, global.sinequa.core.login, global.sinequa.core.intl, global.sinequa.core.validation, global.sinequa.components.utils, global.ng.cdk.a11y, global.sinequa.core['web-services'], global.sinequa.core.base, global.ng.platformBrowser, global.rxjs.operators, global.ng.cdk.overlay));
}(this, (function (exports, i0, i2, i2$1, i1, i3$1, i3, i4, i3$2, i1$1, webServices, base, i1$2, operators, overlay) { 'use strict';

    function BsModalHeader_h5_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "h5", 3);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.title));
        }
    }
    var _c0 = ["*"];
    var BsModalHeader = /** @class */ (function () {
        function BsModalHeader(modalRef, injector) {
            this.modalRef = modalRef;
            this.injector = injector;
        }
        Object.defineProperty(BsModalHeader.prototype, "modalService", {
            // Avoid circular reference (via Confirm)
            get: function () {
                return this.injector.get(i1.ModalService);
            },
            enumerable: false,
            configurable: true
        });
        BsModalHeader.prototype.cancel = function () {
            this.modalRef.close(-2 /* Cancel */);
        };
        return BsModalHeader;
    }());
    BsModalHeader.ɵfac = function BsModalHeader_Factory(t) { return new (t || BsModalHeader)(i0.ɵɵdirectiveInject(i1.ModalRef), i0.ɵɵdirectiveInject(i0.Injector)); };
    BsModalHeader.ɵcmp = i0.ɵɵdefineComponent({ type: BsModalHeader, selectors: [["sq-modal-header"]], hostVars: 2, hostBindings: function BsModalHeader_HostBindings(rf, ctx) {
            if (rf & 2) {
                i0.ɵɵclassProp("sq-modal-header", true);
            }
        }, inputs: { title: "title" }, ngContentSelectors: _c0, decls: 5, vars: 1, consts: [[1, "modal-header"], ["class", "modal-title", 4, "ngIf"], ["type", "button", "data-dismiss", "modal", "aria-hidden", "true", 1, "close", 3, "click"], [1, "modal-title"]], template: function BsModalHeader_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵprojectionDef();
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtemplate(1, BsModalHeader_h5_1_Template, 3, 3, "h5", 1);
                i0.ɵɵprojection(2);
                i0.ɵɵelementStart(3, "button", 2);
                i0.ɵɵlistener("click", function BsModalHeader_Template_button_click_3_listener() { return ctx.cancel(); });
                i0.ɵɵtext(4, "\u00D7");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.title);
            }
        }, directives: [i2.NgIf], pipes: [i3.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsModalHeader, [{
                type: i0.Component,
                args: [{
                        selector: "sq-modal-header",
                        templateUrl: "./modal-header.component.html"
                    }]
            }], function () { return [{ type: i1.ModalRef }, { type: i0.Injector }]; }, { title: [{
                    type: i0.Input
                }], true: [{
                    type: i0.HostBinding,
                    args: ["class.sq-modal-header"]
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

    function BsModalFooter_ng_container_1_section_1_button_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r8_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "button", 5);
            i0.ɵɵlistener("click", function BsModalFooter_ng_container_1_section_1_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8_1); var button_r3 = i0.ɵɵnextContext().$implicit; var ctx_r6 = i0.ɵɵnextContext(2); return ctx_r6.buttonClick(button_r3); });
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var button_r3 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵclassMapInterpolate1("btn ", button_r3.primary ? "btn-primary" : button_r3.result < 0 ? "" : "btn-secondary", "");
            i0.ɵɵpropertyInterpolate("type", button_r3.primary ? "submit" : "button");
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 5, button_r3.getText()));
        }
    }
    function BsModalFooter_ng_container_1_section_1_a_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r12_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 6);
            i0.ɵɵlistener("click", function BsModalFooter_ng_container_1_section_1_a_2_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r12_1); var button_r3 = i0.ɵɵnextContext().$implicit; var ctx_r10 = i0.ɵɵnextContext(2); return ctx_r10.buttonClick(button_r3); });
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var button_r3 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵclassMapInterpolate1("btn ", button_r3.primary ? "btn-primary" : button_r3.result < 0 ? "sq-anchor-btn" : "btn-secondary", "");
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 4, button_r3.getText()));
        }
    }
    function BsModalFooter_ng_container_1_section_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "section");
            i0.ɵɵtemplate(1, BsModalFooter_ng_container_1_section_1_button_1_Template, 3, 7, "button", 3);
            i0.ɵɵtemplate(2, BsModalFooter_ng_container_1_section_1_a_2_Template, 3, 6, "a", 4);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var button_r3 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", button_r3.visible && !button_r3.anchor);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", button_r3.visible && button_r3.anchor);
        }
    }
    function BsModalFooter_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsModalFooter_ng_container_1_section_1_Template, 3, 2, "section", 2);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r0.buttons);
        }
    }
    function BsModalFooter_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r15_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelement(1, "span", 7);
            i0.ɵɵelementStart(2, "button", 8);
            i0.ɵɵlistener("click", function BsModalFooter_ng_container_2_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r15_1); var ctx_r14 = i0.ɵɵnextContext(); return ctx_r14.close(); });
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, "msg#btnClose.text"));
        }
    }
    var _c0$1 = ["*"];
    var BsModalFooter = /** @class */ (function () {
        function BsModalFooter(modalRef, injector) {
            this.modalRef = modalRef;
            this.injector = injector;
            this.buttons = [];
        }
        BsModalFooter.prototype.ngOnChanges = function (changes) {
            if (changes.isProcessingState) {
                this.isProcessingState = changes.isProcessingState.currentValue;
            }
        };
        BsModalFooter.prototype.buttonClick = function (button) {
            var e_1, _a;
            if (button.validation && button.validation.controls) {
                try {
                    // Mark all controls as dirty so validation errors are shown on all controls after a submit
                    for (var _b = __values(Object.keys(button.validation.controls)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var name = _c.value;
                        button.validation.controls[name].markAsDirty();
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
            button.click(this.modalRef);
            return false;
        };
        BsModalFooter.prototype.close = function () {
            this.modalRef.close(-2 /* Cancel */);
        };
        return BsModalFooter;
    }());
    BsModalFooter.ɵfac = function BsModalFooter_Factory(t) { return new (t || BsModalFooter)(i0.ɵɵdirectiveInject(i1.ModalRef), i0.ɵɵdirectiveInject(i0.Injector)); };
    BsModalFooter.ɵcmp = i0.ɵɵdefineComponent({ type: BsModalFooter, selectors: [["sq-modal-footer"]], hostVars: 2, hostBindings: function BsModalFooter_HostBindings(rf, ctx) {
            if (rf & 2) {
                i0.ɵɵclassProp("sq-modal-footer", true);
            }
        }, inputs: { buttons: "buttons", isProcessingState: "isProcessingState" }, features: [i0.ɵɵNgOnChangesFeature], ngContentSelectors: _c0$1, decls: 4, vars: 2, consts: [[1, "modal-footer"], [4, "ngIf"], [4, "ngFor", "ngForOf"], [3, "type", "class", "click", 4, "ngIf"], ["href", "#", 3, "class", "click", 4, "ngIf"], [3, "type", "click"], ["href", "#", 3, "click"], [1, "loader"], ["type", "button", 1, "btn", 3, "click"]], template: function BsModalFooter_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵprojectionDef();
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtemplate(1, BsModalFooter_ng_container_1_Template, 2, 1, "ng-container", 1);
                i0.ɵɵtemplate(2, BsModalFooter_ng_container_2_Template, 5, 3, "ng-container", 1);
                i0.ɵɵelementEnd();
                i0.ɵɵprojection(3);
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", !ctx.isProcessingState);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.isProcessingState);
            }
        }, directives: [i2.NgIf, i2.NgForOf], pipes: [i3.MessagePipe], styles: [".loader[_ngcontent-%COMP%]{-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite;border:.6rem solid #f3f3f3;border-radius:50%;border-top-color:#3498db;height:2.5rem;width:2.5rem}@-webkit-keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsModalFooter, [{
                type: i0.Component,
                args: [{
                        selector: "sq-modal-footer",
                        templateUrl: "./modal-footer.component.html",
                        styleUrls: ["./modal-footer.component.scss"]
                    }]
            }], function () { return [{ type: i1.ModalRef }, { type: i0.Injector }]; }, { buttons: [{
                    type: i0.Input
                }], isProcessingState: [{
                    type: i0.Input
                }], true: [{
                    type: i0.HostBinding,
                    args: ["class.sq-modal-footer"]
                }] });
    })();

    function BsModal_sq_modal_header_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "sq-modal-header", 5);
            i0.ɵɵprojection(1, 1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("title", ctx_r0.title);
        }
    }
    function BsModal_sq_modal_footer_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "sq-modal-footer", 6);
            i0.ɵɵprojection(1, 2);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵproperty("buttons", ctx_r1.buttons)("isProcessingState", ctx_r1.isProcessingState);
        }
    }
    var _c0$2 = ["*", [["", "header", ""]], [["", "footer", ""]]];
    var _c1 = ["*", "[header]", "[footer]"];
    var BsModal = /** @class */ (function () {
        function BsModal() {
            this.showHeader = true;
            this.showFooter = true;
            this.isProcessingState = false;
        }
        return BsModal;
    }());
    BsModal.ɵfac = function BsModal_Factory(t) { return new (t || BsModal)(); };
    BsModal.ɵcmp = i0.ɵɵdefineComponent({ type: BsModal, selectors: [["sq-modal"]], hostVars: 2, hostBindings: function BsModal_HostBindings(rf, ctx) {
            if (rf & 2) {
                i0.ɵɵclassProp("sq-modal", true);
            }
        }, inputs: { title: "title", buttons: "buttons", showHeader: "showHeader", showFooter: "showFooter", isProcessingState: "isProcessingState" }, ngContentSelectors: _c1, decls: 6, vars: 3, consts: [["cdkTrapFocus", "", 1, "modal-dialog", 3, "cdkTrapFocusAutoCapture"], [1, "modal-content"], [3, "title", 4, "ngIf"], [1, "modal-body"], [3, "buttons", "isProcessingState", 4, "ngIf"], [3, "title"], [3, "buttons", "isProcessingState"]], template: function BsModal_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵprojectionDef(_c0$2);
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "div", 1);
                i0.ɵɵtemplate(2, BsModal_sq_modal_header_2_Template, 2, 1, "sq-modal-header", 2);
                i0.ɵɵelementStart(3, "div", 3);
                i0.ɵɵprojection(4);
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(5, BsModal_sq_modal_footer_5_Template, 2, 2, "sq-modal-footer", 4);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("cdkTrapFocusAutoCapture", true);
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", ctx.showHeader);
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("ngIf", ctx.showFooter);
            }
        }, directives: [i1$1.CdkTrapFocus, i2.NgIf, BsModalHeader, BsModalFooter], styles: [".cdk-global-overlay-wrapper,.cdk-overlay-backdrop,.cdk-overlay-container{z-index:1040}.sq-modal-host{display:block;overflow:auto;pointer-events:auto}.sq-modal-pane{display:block;height:100%;padding:30px;pointer-events:none!important}.sq-modal-fullscreen *>form,.sq-modal-fullscreen .modal-content,.sq-modal-fullscreen .modal-dialog{height:100%}.sq-modal-fullscreen .modal-dialog{margin:0;max-width:none}"], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsModal, [{
                type: i0.Component,
                args: [{
                        selector: "sq-modal",
                        templateUrl: "./modal.component.html",
                        styleUrls: ["./modal.component.scss"],
                        encapsulation: i0.ViewEncapsulation.None
                    }]
            }], null, { title: [{
                    type: i0.Input
                }], buttons: [{
                    type: i0.Input
                }], showHeader: [{
                    type: i0.Input
                }], showFooter: [{
                    type: i0.Input
                }], isProcessingState: [{
                    type: i0.Input
                }], true: [{
                    type: i0.HostBinding,
                    args: ["class.sq-modal"]
                }] });
    })();

    function BsLogin_div_12_option_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "option", 11);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var provider_r2 = ctx.$implicit;
            i0.ɵɵproperty("value", provider_r2.name)("hidden", !provider_r2.name)("disabled", !provider_r2.name);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 4, provider_r2.displayName || provider_r2.name));
        }
    }
    function BsLogin_div_12_Template(rf, ctx) {
        if (rf & 1) {
            var _r4_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2);
            i0.ɵɵelementStart(1, "label", 8);
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "select", 9);
            i0.ɵɵlistener("change", function BsLogin_div_12_Template_select_change_4_listener() { i0.ɵɵrestoreView(_r4_1); var ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.authenticate(); });
            i0.ɵɵtemplate(5, BsLogin_div_12_option_5_Template, 3, 6, "option", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, "msg#modal.login.singleSignOn"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx_r0.providers);
        }
    }
    var BsLogin = /** @class */ (function () {
        function BsLogin(model, modalService, modalRef, formBuilder, startConfig, authenticationService) {
            this.model = model;
            this.modalService = modalService;
            this.modalRef = modalRef;
            this.formBuilder = formBuilder;
            this.startConfig = startConfig;
            this.authenticationService = authenticationService;
        }
        BsLogin.prototype.ngOnInit = function () {
            var _this = this;
            this.userNameControl = new i2$1.FormControl(this.model.userName, i2$1.Validators.required);
            this.passwordControl = new i2$1.FormControl(this.model.password, i2$1.Validators.required);
            this.providerNameControl = new i2$1.FormControl();
            this.form = this.formBuilder.group({
                userName: this.userNameControl,
                password: this.passwordControl,
                providerName: this.providerNameControl
            });
            this.formChanges = base.Utils.subscribe(this.form.valueChanges, function (value) {
                _this.model.userName = _this.userNameControl.value;
                _this.model.password = _this.passwordControl.value;
                _this.providerName = _this.providerNameControl.value;
            });
            this.buttons = [
                new i1.ModalButton({
                    result: -1 /* OK */,
                    primary: true,
                    validation: this.form
                }),
                new i1.ModalButton({
                    result: -2 /* Cancel */
                })
            ];
            if (this.startConfig.providers) {
                Object.keys(this.startConfig.providers).forEach(function (providerName) {
                    if (!_this.providers) {
                        _this.providerName = "";
                        _this.providers = [{ displayName: "msg#modal.login.signInWith", name: "" }];
                    }
                    _this.providers.push(_this.startConfig.providers[providerName]);
                });
            }
        };
        BsLogin.prototype.ngOnDestroy = function () {
            this.formChanges.unsubscribe();
        };
        BsLogin.prototype.yes = function () {
            this.modalRef.close(-3 /* Yes */);
        };
        BsLogin.prototype.authenticate = function () {
            var _this = this;
            base.Utils.subscribe(this.authenticationService.authenticateWithProvider(this.providerName), function (response) {
                _this.yes();
            }, function (error) {
                console.log("login.authenticate cancelled: ", error);
            });
        };
        return BsLogin;
    }());
    BsLogin.ɵfac = function BsLogin_Factory(t) { return new (t || BsLogin)(i0.ɵɵdirectiveInject(i1.MODAL_MODEL), i0.ɵɵdirectiveInject(i1.ModalService), i0.ɵɵdirectiveInject(i1.ModalRef), i0.ɵɵdirectiveInject(i2$1.FormBuilder), i0.ɵɵdirectiveInject(webServices.START_CONFIG), i0.ɵɵdirectiveInject(i3$1.AuthenticationService)); };
    BsLogin.ɵcmp = i0.ɵɵdefineComponent({ type: BsLogin, selectors: [["sq-login"]], hostVars: 2, hostBindings: function BsLogin_HostBindings(rf, ctx) {
            if (rf & 2) {
                i0.ɵɵclassProp("sq-login", true);
            }
        }, decls: 13, vars: 12, consts: [["novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "form-group", "sq-form-group"], ["for", "userName"], ["type", "text", "id", "userName", "formControlName", "userName", "spellcheck", "off", "cdkFocusInitial", "", 1, "form-control", 3, "sqValidation"], ["for", "password"], ["type", "password", "id", "password", "formControlName", "password", "autocomplete", "off", "spellcheck", "off", 1, "form-control", 3, "sqValidation"], ["class", "form-group sq-form-group", 4, "ngIf"], ["for", "providerName"], ["id", "providerName", "formControlName", "providerName", 1, "form-control", "custom-select", 3, "change"], [3, "value", "hidden", "disabled", 4, "ngFor", "ngForOf"], [3, "value", "hidden", "disabled"]], template: function BsLogin_Template(rf, ctx) {
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
                i0.ɵɵelementStart(7, "div", 2);
                i0.ɵɵelementStart(8, "label", 5);
                i0.ɵɵtext(9);
                i0.ɵɵpipe(10, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelement(11, "input", 6);
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(12, BsLogin_div_12_Template, 6, 4, "div", 7);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("formGroup", ctx.form);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("title", "msg#modal.login.title")("buttons", ctx.buttons);
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 8, "msg#modal.login.userName"));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("sqValidation", ctx.form);
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 10, "msg#modal.login.password"));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("sqValidation", ctx.form);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", !!ctx.providers);
            }
        }, directives: [i2$1.ɵangular_packages_forms_forms_y, i2$1.NgControlStatusGroup, i2$1.FormGroupDirective, BsModal, i2$1.DefaultValueAccessor, i2$1.NgControlStatus, i2$1.FormControlName, i4.ValidationDirective, i2.NgIf, i2$1.SelectControlValueAccessor, i2.NgForOf, i2$1.NgSelectOption, i2$1.ɵangular_packages_forms_forms_x], pipes: [i3.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsLogin, [{
                type: i0.Component,
                args: [{
                        selector: "sq-login",
                        templateUrl: "./login.component.html"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1.MODAL_MODEL]
                        }] }, { type: i1.ModalService }, { type: i1.ModalRef }, { type: i2$1.FormBuilder }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [webServices.START_CONFIG]
                        }] }, { type: i3$1.AuthenticationService }];
        }, { true: [{
                    type: i0.HostBinding,
                    args: ["class.sq-login"]
                }] });
    })();

    var BsConfirm = /** @class */ (function () {
        function BsConfirm(model, modalRef) {
            this.model = model;
            this.modalRef = modalRef;
        }
        Object.defineProperty(BsConfirm.prototype, "title", {
            get: function () {
                return this.model.title ? this.model.title : "msg#modal.confirm.title";
            },
            enumerable: false,
            configurable: true
        });
        BsConfirm.prototype.getMessageClass = function (confirmType) {
            switch (confirmType) {
                case 1 /* Info */:
                    return "alert-info";
                case 0 /* Success */:
                    return "alert-sucess";
                case 2 /* Warning */:
                    return "alert-warning";
                case 3 /* Error */:
                    return "alert-danger";
                default:
                    return "";
            }
        };
        return BsConfirm;
    }());
    BsConfirm.ɵfac = function BsConfirm_Factory(t) { return new (t || BsConfirm)(i0.ɵɵdirectiveInject(i1.MODAL_MODEL), i0.ɵɵdirectiveInject(i1.ModalRef)); };
    BsConfirm.ɵcmp = i0.ɵɵdefineComponent({ type: BsConfirm, selectors: [["sq-confirm"]], hostVars: 2, hostBindings: function BsConfirm_HostBindings(rf, ctx) {
            if (rf & 2) {
                i0.ɵɵclassProp("sq-confirm", true);
            }
        }, decls: 4, vars: 9, consts: [[3, "title", "buttons"]], template: function BsConfirm_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "sq-modal", 0);
                i0.ɵɵelementStart(1, "div");
                i0.ɵɵtext(2);
                i0.ɵɵpipe(3, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("title", ctx.title)("buttons", ctx.model.buttons);
                i0.ɵɵadvance(1);
                i0.ɵɵclassMapInterpolate1("alert ", ctx.getMessageClass(ctx.model.confirmType), "");
                i0.ɵɵadvance(1);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 6, ctx.model.message, ctx.model.messageParams));
            }
        }, directives: [BsModal], pipes: [i3.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsConfirm, [{
                type: i0.Component,
                args: [{
                        selector: "sq-confirm",
                        templateUrl: "./confirm.component.html"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1.MODAL_MODEL]
                        }] }, { type: i1.ModalRef }];
        }, { true: [{
                    type: i0.HostBinding,
                    args: ["class.sq-confirm"]
                }] });
    })();

    function BsPrompt_input_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "input", 6);
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("sqValidation", ctx_r0.form);
        }
    }
    function BsPrompt_textarea_7_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "textarea", 7);
            i0.ɵɵtext(1, "                    ");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵpropertyInterpolate("rows", ctx_r1.model.rowCount);
            i0.ɵɵproperty("sqValidation", ctx_r1.form);
        }
    }
    var BsPrompt = /** @class */ (function () {
        function BsPrompt(model, modalRef, formBuilder) {
            this.model = model;
            this.modalRef = modalRef;
            this.formBuilder = formBuilder;
        }
        BsPrompt.prototype.ngOnInit = function () {
            var _this = this;
            this.inputControl = new i2$1.FormControl(this.model.output, this.model.validators || i2$1.Validators.required);
            this.form = this.formBuilder.group({
                input: this.inputControl
            });
            this.formChanges = base.Utils.subscribe(this.form.valueChanges, function (value) {
                _this.model.output = _this.inputControl.value;
            });
            this.buttons = [
                new i1.ModalButton({
                    result: -1 /* OK */,
                    primary: true,
                    validation: this.form
                }),
                new i1.ModalButton({
                    result: -2 /* Cancel */
                })
            ];
        };
        BsPrompt.prototype.ngOnDestroy = function () {
            this.formChanges.unsubscribe();
        };
        Object.defineProperty(BsPrompt.prototype, "title", {
            get: function () {
                return this.model.title ? this.model.title : "msg#modal.prompt.title";
            },
            enumerable: false,
            configurable: true
        });
        return BsPrompt;
    }());
    BsPrompt.ɵfac = function BsPrompt_Factory(t) { return new (t || BsPrompt)(i0.ɵɵdirectiveInject(i1.MODAL_MODEL), i0.ɵɵdirectiveInject(i1.ModalRef), i0.ɵɵdirectiveInject(i2$1.FormBuilder)); };
    BsPrompt.ɵcmp = i0.ɵɵdefineComponent({ type: BsPrompt, selectors: [["sq-prompt"]], decls: 8, vars: 9, consts: [["name", "prompt", "novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "form-group", "sq-form-group"], ["for", "input"], ["type", "text", "class", "form-control", "id", "input", "formControlName", "input", "spellcheck", "off", "sqAutofocus", "", 3, "sqValidation", 4, "ngIf"], ["type", "text", "class", "form-control", "id", "input", "formControlName", "input", "spellcheck", "on", "sqAutofocus", "", 3, "sqValidation", "rows", 4, "ngIf"], ["type", "text", "id", "input", "formControlName", "input", "spellcheck", "off", "sqAutofocus", "", 1, "form-control", 3, "sqValidation"], ["type", "text", "id", "input", "formControlName", "input", "spellcheck", "on", "sqAutofocus", "", 1, "form-control", 3, "sqValidation", "rows"]], template: function BsPrompt_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "form", 0);
                i0.ɵɵelementStart(1, "sq-modal", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵelementStart(3, "label", 3);
                i0.ɵɵtext(4);
                i0.ɵɵpipe(5, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(6, BsPrompt_input_6_Template, 1, 1, "input", 4);
                i0.ɵɵtemplate(7, BsPrompt_textarea_7_Template, 2, 2, "textarea", 5);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("formGroup", ctx.form);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("title", ctx.title)("buttons", ctx.buttons);
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 6, ctx.model.message, ctx.model.messageParams));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", !ctx.model.rowCount);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", !!ctx.model.rowCount);
            }
        }, directives: [i2$1.ɵangular_packages_forms_forms_y, i2$1.NgControlStatusGroup, i2$1.FormGroupDirective, BsModal, i2.NgIf, i2$1.DefaultValueAccessor, i2$1.NgControlStatus, i2$1.FormControlName, i3$2.Autofocus, i4.ValidationDirective], pipes: [i3.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsPrompt, [{
                type: i0.Component,
                args: [{
                        selector: "sq-prompt",
                        template: "\n        <form name=\"prompt\" novalidate [formGroup]=\"form\">\n            <sq-modal [title]=\"title\" [buttons]=\"buttons\">\n                <div class=\"form-group sq-form-group\">\n                    <label for=\"input\">{{model.message | sqMessage:model.messageParams}}</label>\n                    <input [sqValidation]=\"form\" type=\"text\" class=\"form-control\" id=\"input\" formControlName=\"input\" spellcheck=\"off\" sqAutofocus *ngIf=\"!model.rowCount\">\n                    <textarea [sqValidation]=\"form\" type=\"text\" class=\"form-control\" id=\"input\" formControlName=\"input\" spellcheck=\"on\" rows=\"{{model.rowCount}}\" sqAutofocus *ngIf=\"!!model.rowCount\">\n                    </textarea>\n                </div>\n            </sq-modal>\n        </form>\n    "
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1.MODAL_MODEL]
                        }] }, { type: i1.ModalRef }, { type: i2$1.FormBuilder }];
        }, null);
    })();

    var BsHelp = /** @class */ (function () {
        function BsHelp(startConfig, sanitizer) {
            this.startConfig = startConfig;
            this.sanitizer = sanitizer;
        }
        BsHelp.prototype.ngOnInit = function () {
            var url = this.startConfig.helpUrl || "assets/help/index.html";
            this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        };
        return BsHelp;
    }());
    BsHelp.ɵfac = function BsHelp_Factory(t) { return new (t || BsHelp)(i0.ɵɵdirectiveInject(webServices.START_CONFIG), i0.ɵɵdirectiveInject(i1$2.DomSanitizer)); };
    BsHelp.ɵcmp = i0.ɵɵdefineComponent({ type: BsHelp, selectors: [["sq-help"]], hostVars: 2, hostBindings: function BsHelp_HostBindings(rf, ctx) {
            if (rf & 2) {
                i0.ɵɵclassProp("modal-content", true);
            }
        }, decls: 3, vars: 2, consts: [[3, "title"], [1, "d-flex", "flex-column"], [3, "src"]], template: function BsHelp_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "sq-modal", 0);
                i0.ɵɵelementStart(1, "div", 1);
                i0.ɵɵelement(2, "iframe", 2);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("title", "msg#help.title");
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("src", ctx.url, i0.ɵɵsanitizeResourceUrl);
            }
        }, directives: [BsModal], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsHelp, [{
                type: i0.Component,
                args: [{
                        selector: "sq-help",
                        templateUrl: "./help.html"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [webServices.START_CONFIG]
                        }] }, { type: i1$2.DomSanitizer }];
        }, { true: [{
                    type: i0.HostBinding,
                    args: ["class.modal-content"]
                }] });
    })();

    var BsOverrideUser = /** @class */ (function () {
        function BsOverrideUser(model, formBuilder) {
            this.model = model;
            this.formBuilder = formBuilder;
        }
        BsOverrideUser.prototype.ngOnInit = function () {
            var _this = this;
            this.form = this.formBuilder.group({
                "userName": [this.model.userName, i2$1.Validators.required],
                "domain": [this.model.domain, i2$1.Validators.required]
            });
            this.formChanges = base.Utils.subscribe(this.form.valueChanges.pipe(operators.debounceTime(100)), function (value) {
                base.Utils.merge(_this.model, value);
                //this.model.userName = this.form.get("userName").value;
                //this.model.domain = this.form.get("domain").value;
            });
            this.buttons = [
                new i1.ModalButton({
                    result: -1 /* OK */,
                    primary: true,
                    validation: this.form
                }),
                new i1.ModalButton({
                    result: -2 /* Cancel */
                })
            ];
        };
        BsOverrideUser.prototype.ngOnDestroy = function () {
            this.formChanges.unsubscribe();
        };
        return BsOverrideUser;
    }());
    BsOverrideUser.ɵfac = function BsOverrideUser_Factory(t) { return new (t || BsOverrideUser)(i0.ɵɵdirectiveInject(i1.MODAL_MODEL), i0.ɵɵdirectiveInject(i2$1.FormBuilder)); };
    BsOverrideUser.ɵcmp = i0.ɵɵdefineComponent({ type: BsOverrideUser, selectors: [["sq-override-user"]], decls: 12, vars: 11, consts: [["name", "overrideUser", "novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "form-group", "sq-form-group"], ["for", "userName"], ["type", "text", "id", "userName", "formControlName", "userName", "spellcheck", "off", "sqAutofocus", "", 1, "form-control", 3, "sqValidation"], ["for", "domain"], ["type", "text", "id", "domain", "formControlName", "domain", "spellcheck", "off", 1, "form-control", 3, "sqValidation"]], template: function BsOverrideUser_Template(rf, ctx) {
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
                i0.ɵɵelementStart(7, "div", 2);
                i0.ɵɵelementStart(8, "label", 5);
                i0.ɵɵtext(9);
                i0.ɵɵpipe(10, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelement(11, "input", 6);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("formGroup", ctx.form);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("title", "msg#overrideUser.title")("buttons", ctx.buttons);
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 7, "msg#overrideUser.userName"));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("sqValidation", ctx.form);
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 9, "msg#overrideUser.domain"));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("sqValidation", ctx.form);
            }
        }, directives: [i2$1.ɵangular_packages_forms_forms_y, i2$1.NgControlStatusGroup, i2$1.FormGroupDirective, BsModal, i2$1.DefaultValueAccessor, i2$1.NgControlStatus, i2$1.FormControlName, i3$2.Autofocus, i4.ValidationDirective], pipes: [i3.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsOverrideUser, [{
                type: i0.Component,
                args: [{
                        selector: "sq-override-user",
                        templateUrl: "./override-user.html"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1.MODAL_MODEL]
                        }] }, { type: i2$1.FormBuilder }];
        }, null);
    })();

    function BsEditable_div_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 2);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(ctx_r0.value);
        }
    }
    function BsEditable_form_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r3_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "form", 3);
            i0.ɵɵelementStart(1, "div", 4);
            i0.ɵɵelementStart(2, "label", 5);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "input", 6);
            i0.ɵɵlistener("keydown", function BsEditable_form_1_Template_input_keydown_5_listener($event) { i0.ɵɵrestoreView(_r3_1); var ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.inputKeydown($event); })("blur", function BsEditable_form_1_Template_input_blur_5_listener() { i0.ɵɵrestoreView(_r3_1); var ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.stopEditing(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵproperty("formGroup", ctx_r1.form);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 3, ctx_r1.name));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("sqValidation", ctx_r1.form);
        }
    }
    var BsEditable = /** @class */ (function () {
        function BsEditable(formBuilder, elementRef) {
            this.formBuilder = formBuilder;
            this.elementRef = elementRef;
            this.tabindex = "0";
            this.valueChange = new i0.EventEmitter();
        }
        BsEditable.prototype.ngOnInit = function () {
            var _this = this;
            this.editableControl = new i2$1.FormControl(this.value, this.validators);
            this.modelControl = new i2$1.FormControl(this.model);
            this.form = this.formBuilder.group({
                editable: this.editableControl,
                model: this.modelControl
            });
            this.formChanges = base.Utils.subscribe(this.form.valueChanges, function (value) {
                _this.value = _this.editableControl.value;
            });
        };
        BsEditable.prototype.ngOnDestroy = function () {
            this.valueChange.unsubscribe();
            this.formChanges.unsubscribe();
        };
        BsEditable.prototype.startEditing = function () {
            if (!this.editing) {
                this.previousValue = this.value;
                this.editableControl["_touched"] = false; //TODO - need markAsPristine?
                this.editableControl["_pristine"] = true; //
                this.editing = true;
            }
        };
        BsEditable.prototype.stopEditing = function (cancel) {
            if (cancel === void 0) { cancel = false; }
            if (this.editing) {
                this.editing = false;
                if (this.focusAfterEdit && this.elementRef) {
                    this.elementRef.nativeElement.focus();
                }
                this.focusAfterEdit = false;
                if (cancel) {
                    this.value = this.previousValue;
                }
                this.valueChange.emit(this.value);
            }
        };
        BsEditable.prototype.inputKeydown = function (event) {
            switch (event.keyCode) {
                case base.Keys.enter:
                    event.stopPropagation();
                    this.stopEditing();
                    return false;
                case base.Keys.esc:
                    event.stopPropagation();
                    this.stopEditing(true);
                    return false;
            }
            return undefined;
        };
        BsEditable.prototype.hostKeydown = function (event) {
            if (event.keyCode === base.Keys.enter) {
                this.focusAfterEdit = true;
                this.startEditing();
                return false;
            }
            return undefined;
        };
        return BsEditable;
    }());
    BsEditable.ɵfac = function BsEditable_Factory(t) { return new (t || BsEditable)(i0.ɵɵdirectiveInject(i2$1.FormBuilder), i0.ɵɵdirectiveInject(i0.ElementRef)); };
    BsEditable.ɵcmp = i0.ɵɵdefineComponent({ type: BsEditable, selectors: [["sq-editable"]], hostVars: 1, hostBindings: function BsEditable_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("mousedown", function BsEditable_mousedown_HostBindingHandler() { return ctx.startEditing(); })("touchstart", function BsEditable_touchstart_HostBindingHandler() { return ctx.startEditing(); })("keydown", function BsEditable_keydown_HostBindingHandler($event) { return ctx.hostKeydown($event); });
            }
            if (rf & 2) {
                i0.ɵɵattribute("tabindex", ctx.tabindex);
            }
        }, inputs: { name: "name", value: "value", model: "model", validators: "validators" }, outputs: { valueChange: "valueChange" }, decls: 2, vars: 2, consts: [["class", "editable-text", 4, "ngIf"], ["class", "form-inline", "role", "form", "novalidate", "", 3, "formGroup", 4, "ngIf"], [1, "editable-text"], ["role", "form", "novalidate", "", 1, "form-inline", 3, "formGroup"], [1, "form-group"], ["for", "editable", 1, "sr-only"], ["type", "text", "id", "editable", "formControlName", "editable", "spellcheck", "false", "sqAutofocus", "", 1, "form-control", 3, "sqValidation", "keydown", "blur"]], template: function BsEditable_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsEditable_div_0_Template, 2, 1, "div", 0);
                i0.ɵɵtemplate(1, BsEditable_form_1_Template, 6, 5, "form", 1);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !ctx.editing);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.editing);
            }
        }, directives: [i2.NgIf, i2$1.ɵangular_packages_forms_forms_y, i2$1.NgControlStatusGroup, i2$1.FormGroupDirective, i2$1.DefaultValueAccessor, i2$1.NgControlStatus, i2$1.FormControlName, i3$2.Autofocus, i4.ValidationDirective], pipes: [i3.MessagePipe], styles: ["[_nghost-%COMP%]{display:block;flex:1 1 0px}[_nghost-%COMP%]   .editable-text[_ngcontent-%COMP%]{min-width:4rem;overflow-wrap:break-word;word-break:break-word;word-wrap:break-word}[_nghost-%COMP%]   form[_ngcontent-%COMP%]{display:inline-block;margin:0;white-space:nowrap;width:90%}[_nghost-%COMP%]   form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%!important}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsEditable, [{
                type: i0.Component,
                args: [{
                        selector: "sq-editable",
                        templateUrl: "./editable.html",
                        styleUrls: ["./editable.scss"]
                    }]
            }], function () { return [{ type: i2$1.FormBuilder }, { type: i0.ElementRef }]; }, { tabindex: [{
                    type: i0.HostBinding,
                    args: ["attr.tabindex"]
                }], name: [{
                    type: i0.Input
                }], value: [{
                    type: i0.Input
                }], model: [{
                    type: i0.Input
                }], valueChange: [{
                    type: i0.Output
                }], validators: [{
                    type: i0.Input
                }], startEditing: [{
                    type: i0.HostListener,
                    args: ["mousedown"]
                }, {
                    type: i0.HostListener,
                    args: ["touchstart"]
                }], hostKeydown: [{
                    type: i0.HostListener,
                    args: ["keydown", ["$event"]]
                }] });
    })();

    var BsModalModule = /** @class */ (function () {
        function BsModalModule() {
        }
        return BsModalModule;
    }());
    BsModalModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsModalModule });
    BsModalModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsModalModule_Factory(t) { return new (t || BsModalModule)(); }, imports: [[
                i2.CommonModule,
                i2$1.FormsModule, i2$1.ReactiveFormsModule,
                overlay.OverlayModule,
                i1$1.A11yModule,
                i3.IntlModule,
                i4.ValidationModule,
                i1.ModalModule.forRoot(BsConfirm, BsPrompt),
                i3$1.LoginModule.forRoot(BsLogin),
                i3$2.UtilsModule,
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsModalModule, { declarations: [BsModal, BsModalHeader, BsModalFooter, BsLogin, BsConfirm,
                BsHelp, BsOverrideUser, BsEditable, BsPrompt], imports: [i2.CommonModule,
                i2$1.FormsModule, i2$1.ReactiveFormsModule,
                overlay.OverlayModule,
                i1$1.A11yModule,
                i3.IntlModule,
                i4.ValidationModule, i1.ModalModule, i3$1.LoginModule, i3$2.UtilsModule], exports: [BsModal, BsModalHeader, BsModalFooter, BsLogin, BsConfirm,
                BsHelp, BsOverrideUser, BsEditable, BsPrompt] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsModalModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i2.CommonModule,
                            i2$1.FormsModule, i2$1.ReactiveFormsModule,
                            overlay.OverlayModule,
                            i1$1.A11yModule,
                            i3.IntlModule,
                            i4.ValidationModule,
                            i1.ModalModule.forRoot(BsConfirm, BsPrompt),
                            i3$1.LoginModule.forRoot(BsLogin),
                            i3$2.UtilsModule,
                        ],
                        declarations: [
                            BsModal, BsModalHeader, BsModalFooter, BsLogin, BsConfirm,
                            BsHelp, BsOverrideUser, BsEditable, BsPrompt
                        ],
                        exports: [
                            BsModal, BsModalHeader, BsModalFooter, BsLogin, BsConfirm,
                            BsHelp, BsOverrideUser, BsEditable, BsPrompt
                        ],
                    }]
            }], null, null);
    })();

    var en = {
        "help": {
            "title": "Online Help"
        },
        "overrideUser": {
            "title": "Override User",
            "userName": "User name",
            "domain": "Domain"
        },
        "btnClose": {
            "text": "Close"
        }
    };

    var fr = {
        "help": {
            "title": "Aide en ligne"
        },
        "overrideUser": {
            "title": "Emprunt d'identité",
            "userName": "Identifiant",
            "domain": "Domaine"
        },
        "btnClose": {
            "text": "Fermer"
        }
    };

    var de = {
        "help": {
            "title": "Online-Hilfe"
        },
        "overrideUser": {
            "title": "Benutzer wechseln",
            "userName": "Benutzername",
            "domain": "Domäne"
        },
        "btnClose": {
            "text": "Schließen"
        }
    };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BsConfirm = BsConfirm;
    exports.BsEditable = BsEditable;
    exports.BsHelp = BsHelp;
    exports.BsLogin = BsLogin;
    exports.BsModal = BsModal;
    exports.BsModalFooter = BsModalFooter;
    exports.BsModalHeader = BsModalHeader;
    exports.BsModalModule = BsModalModule;
    exports.BsOverrideUser = BsOverrideUser;
    exports.BsPrompt = BsPrompt;
    exports.deModal = de;
    exports.enModal = en;
    exports.frModal = fr;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-modal.umd.js.map
