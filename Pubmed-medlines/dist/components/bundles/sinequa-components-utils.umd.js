(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@sinequa/core/base'), require('rxjs'), require('rxjs/operators'), require('@angular/flex-layout'), require('@angular/cdk/a11y'), require('element-resize-detector'), require('@sinequa/core/notification'), require('@angular/cdk/clipboard'), require('@angular/common'), require('@angular/cdk/portal'), require('@angular/animations'), require('@angular/cdk/overlay'), require('@sinequa/core/intl'), require('@sinequa/core/app-utils'), require('moment')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/utils', ['exports', '@angular/core', '@sinequa/core/base', 'rxjs', 'rxjs/operators', '@angular/flex-layout', '@angular/cdk/a11y', 'element-resize-detector', '@sinequa/core/notification', '@angular/cdk/clipboard', '@angular/common', '@angular/cdk/portal', '@angular/animations', '@angular/cdk/overlay', '@sinequa/core/intl', '@sinequa/core/app-utils', 'moment'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components.utils = {}), global.ng.core, global.sinequa.core.base, global.rxjs, global.rxjs.operators, global.ng.flexLayout, global.ng.cdk.a11y, global.elementResizeDetectorMaker, global.sinequa.core.notification, global.ng.cdk.clipboard, global.ng.common, global.ng.cdk.portal, global.ng.animations, global.ng.cdk.overlay, global.sinequa.core.intl, global.sinequa.core['app-utils'], global.moment));
}(this, (function (exports, i0, base, rxjs, operators, i1, a11y, elementResizeDetectorMaker, i1$1, i2, i2$1, portal, animations, i1$2, i1$3, i1$4, moment) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var elementResizeDetectorMaker__default = /*#__PURE__*/_interopDefaultLegacy(elementResizeDetectorMaker);
    var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

    var Autofocus = /** @class */ (function () {
        function Autofocus(elementRef) {
            this.element = elementRef.nativeElement;
        }
        Autofocus.prototype.setFocus = function () {
            var _this = this;
            base.Utils.delay()
                .then(function () {
                if (_this.element.offsetWidth !== 0) {
                    _this.element.focus();
                }
            });
        };
        Autofocus.prototype.ngOnChanges = function () {
            this.setFocus();
        };
        return Autofocus;
    }());
    Autofocus.ɵfac = function Autofocus_Factory(t) { return new (t || Autofocus)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
    Autofocus.ɵdir = i0.ɵɵdefineDirective({ type: Autofocus, selectors: [["", "sqAutofocus", ""]], inputs: { value: ["sqAutofocus", "value"] }, features: [i0.ɵɵNgOnChangesFeature] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(Autofocus, [{
                type: i0.Directive,
                args: [{
                        selector: "[sqAutofocus]"
                    }]
            }], function () { return [{ type: i0.ElementRef }]; }, { value: [{
                    type: i0.Input,
                    args: ["sqAutofocus"]
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

    var ClickOutside = /** @class */ (function () {
        function ClickOutside(elementRef) {
            var _this = this;
            this.clickOutside = new i0.EventEmitter();
            this.clickHandler = function (event) {
                var e_1, _a, e_2, _b;
                if (!event || !event.target) {
                    return;
                }
                if (_this.element.offsetWidth === 0) {
                    return;
                }
                if (event.target === document.body && document.elementFromPoint(event.pageX, event.pageY) !== event.target) {
                    return;
                }
                if (_this.element.contains(event.target)) {
                    return;
                }
                if (_this.options.exclude) {
                    var targetRoot = event.target;
                    while (!!targetRoot.parentElement) {
                        targetRoot = targetRoot.parentElement;
                    }
                    try {
                        for (var _c = __values(_this.options.exclude), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var selector = _d.value;
                            var elts = Array.from(targetRoot.querySelectorAll(selector));
                            try {
                                for (var elts_1 = (e_2 = void 0, __values(elts)), elts_1_1 = elts_1.next(); !elts_1_1.done; elts_1_1 = elts_1.next()) {
                                    var elt = elts_1_1.value;
                                    if (elt && elt.contains(event.target)) {
                                        return;
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (elts_1_1 && !elts_1_1.done && (_b = elts_1.return)) _b.call(elts_1);
                                }
                                finally { if (e_2) throw e_2.error; }
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
                }
                // Call via timeout so we can check whether the click was leading to us taking focus
                // If we have the focus then we don't call clickOutside
                base.Utils.delay()
                    .then(function () {
                    if (!_this.isActive(_this.element)) {
                        _this.clickOutside.emit({ click: event });
                    }
                });
            };
            this.element = elementRef.nativeElement;
        }
        ClickOutside.prototype.ngOnInit = function () {
            document.addEventListener("click", this.clickHandler);
            if (!this.options) {
                this.options = { exclude: ['.bs-datepicker'] }; // By default exclude bootstrap date picker
            }
        };
        ClickOutside.prototype.ngOnDestroy = function () {
            document.removeEventListener("click", this.clickHandler);
        };
        ClickOutside.prototype.isActive = function (element) {
            var active = document["activeElement"];
            while (active) {
                if (element === active) {
                    return true;
                }
                active = active.parentElement;
            }
            return false;
        };
        return ClickOutside;
    }());
    ClickOutside.ɵfac = function ClickOutside_Factory(t) { return new (t || ClickOutside)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
    ClickOutside.ɵdir = i0.ɵɵdefineDirective({ type: ClickOutside, selectors: [["", "sqClickOutside", ""]], inputs: { options: ["sqClickOutside", "options"] }, outputs: { clickOutside: "sqClickOutside" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ClickOutside, [{
                type: i0.Directive,
                args: [{
                        selector: "[sqClickOutside]"
                    }]
            }], function () { return [{ type: i0.ElementRef }]; }, { options: [{
                    type: i0.Input,
                    args: ["sqClickOutside"]
                }], clickOutside: [{
                    type: i0.Output,
                    args: ["sqClickOutside"]
                }] });
    })();

    // Adapted from https://github.com/angular/flex-layout/issues/142#issuecomment-379465022
    // Change ɵMatchMedia => MatchMedia when we move to angular 8
    var MediaIf = /** @class */ (function () {
        function MediaIf(template, viewContainer, breakpoints, matchMedia, changeDetectorRef) {
            var _this = this;
            this.template = template;
            this.viewContainer = viewContainer;
            this.breakpoints = breakpoints;
            this.matchMedia = matchMedia;
            this.changeDetectorRef = changeDetectorRef;
            this.hasView = false;
            this.matcher = new rxjs.Subject();
            this.subscription = this.matcher
                .pipe(operators.map(function (alias) {
                var breakpoint = _this.breakpoints.findByAlias(alias);
                if (!breakpoint) {
                    rxjs.throwError("breakpoint not found for " + alias);
                    return "";
                }
                else {
                    return breakpoint.mediaQuery;
                }
            }), operators.switchMap(function (mq) {
                //console.log("MediaIf:", mq);
                return _this.matchMedia.observe([mq], true)
                    .pipe(operators.map(function (result) {
                    //console.log("MediaChange:", result);
                    return result.matches;
                }), operators.startWith(_this.matchMedia.isActive(mq)));
            }))
                .subscribe(function (matches) { return matches ? _this.createView() : _this.destroyView(); });
        }
        Object.defineProperty(MediaIf.prototype, "sqMediaIf", {
            set: function (value) {
                this.matcher.next(value);
            },
            enumerable: false,
            configurable: true
        });
        MediaIf.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        MediaIf.prototype.createView = function () {
            if (!this.hasView) {
                this.viewContainer.createEmbeddedView(this.template);
                this.changeDetectorRef.markForCheck();
                this.hasView = true;
            }
        };
        MediaIf.prototype.destroyView = function () {
            if (this.hasView) {
                this.viewContainer.clear();
                this.hasView = false;
            }
        };
        return MediaIf;
    }());
    MediaIf.ɵfac = function MediaIf_Factory(t) { return new (t || MediaIf)(i0.ɵɵdirectiveInject(i0.TemplateRef), i0.ɵɵdirectiveInject(i0.ViewContainerRef), i0.ɵɵdirectiveInject(i1.BreakPointRegistry), i0.ɵɵdirectiveInject(i1.ɵMatchMedia), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    MediaIf.ɵdir = i0.ɵɵdefineDirective({ type: MediaIf, selectors: [["", "sqMediaIf", ""]], inputs: { sqMediaIf: "sqMediaIf" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(MediaIf, [{
                type: i0.Directive,
                args: [{
                        selector: "[sqMediaIf]",
                    }]
            }], function () { return [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }, { type: i1.BreakPointRegistry }, { type: i1.ɵMatchMedia }, { type: i0.ChangeDetectorRef }]; }, { sqMediaIf: [{
                    type: i0.Input
                }] });
    })();

    var ScrollIntoView = /** @class */ (function () {
        function ScrollIntoView(elementRef) {
            this.elementRef = elementRef;
        }
        ScrollIntoView.prototype.ngOnChanges = function () {
            if (this.options.active) {
                if (this.options.first) {
                    this.elementRef.nativeElement.scrollIntoView(false);
                }
                else {
                    this.elementRef.nativeElement.scrollIntoViewIfNeeded(false);
                }
            }
        };
        return ScrollIntoView;
    }());
    ScrollIntoView.ɵfac = function ScrollIntoView_Factory(t) { return new (t || ScrollIntoView)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
    ScrollIntoView.ɵdir = i0.ɵɵdefineDirective({ type: ScrollIntoView, selectors: [["", "sqScrollIntoView", ""]], inputs: { options: ["sqScrollIntoView", "options"] }, features: [i0.ɵɵNgOnChangesFeature] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ScrollIntoView, [{
                type: i0.Directive,
                args: [{
                        selector: "[sqScrollIntoView]"
                    }]
            }], function () { return [{ type: i0.ElementRef }]; }, { options: [{
                    type: i0.Input,
                    args: ["sqScrollIntoView"]
                }] });
    })();

    var FocusKeyListItemDirective = /** @class */ (function () {
        function FocusKeyListItemDirective(element) {
            this.element = element;
            this.tabindex = -1;
            this.role = "list-item";
        }
        FocusKeyListItemDirective.prototype.focus = function () {
            this.element.nativeElement.focus();
        };
        return FocusKeyListItemDirective;
    }());
    FocusKeyListItemDirective.ɵfac = function FocusKeyListItemDirective_Factory(t) { return new (t || FocusKeyListItemDirective)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
    FocusKeyListItemDirective.ɵdir = i0.ɵɵdefineDirective({ type: FocusKeyListItemDirective, selectors: [["", "sqFocusKeyListItem", ""]], hostVars: 2, hostBindings: function FocusKeyListItemDirective_HostBindings(rf, ctx) {
            if (rf & 2) {
                i0.ɵɵhostProperty("tabindex", ctx.tabindex);
                i0.ɵɵattribute("role", ctx.role);
            }
        } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(FocusKeyListItemDirective, [{
                type: i0.Directive,
                args: [{
                        selector: "[sqFocusKeyListItem]"
                    }]
            }], function () { return [{ type: i0.ElementRef }]; }, { tabindex: [{
                    type: i0.HostBinding
                }], role: [{
                    type: i0.HostBinding,
                    args: ["attr.role"]
                }] });
    })();

    var FocusKeyListDirective = /** @class */ (function () {
        function FocusKeyListDirective() {
            this.activeItem = -1;
            this.withWrap = true;
            this.itemSelect = new i0.EventEmitter();
            this.role = "list";
        }
        FocusKeyListDirective.prototype.ngOnChanges = function () {
            if (this.keyManager) {
                this.keyManager.setActiveItem(this.activeItem);
            }
        };
        FocusKeyListDirective.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.keyManager = new a11y.FocusKeyManager(this.components);
            if (this.withWrap) {
                this.keyManager.withWrap();
            }
            if (this.activeItem >= 0 && this.components.length > 0) {
                base.Utils.delay().then(function () {
                    _this.keyManager.setActiveItem(_this.activeItem);
                });
            }
        };
        FocusKeyListDirective.prototype.onKeydown = function (event) {
            this.keyManager.onKeydown(event);
            this.itemSelect.emit(this.keyManager.activeItemIndex !== null ? this.keyManager.activeItemIndex : undefined);
        };
        return FocusKeyListDirective;
    }());
    FocusKeyListDirective.ɵfac = function FocusKeyListDirective_Factory(t) { return new (t || FocusKeyListDirective)(); };
    FocusKeyListDirective.ɵdir = i0.ɵɵdefineDirective({ type: FocusKeyListDirective, selectors: [["", "sqFocusKeyList", ""]], contentQueries: function FocusKeyListDirective_ContentQueries(rf, ctx, dirIndex) {
            if (rf & 1) {
                i0.ɵɵcontentQuery(dirIndex, FocusKeyListItemDirective, false);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.components = _t);
            }
        }, hostVars: 1, hostBindings: function FocusKeyListDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("keydown", function FocusKeyListDirective_keydown_HostBindingHandler($event) { return ctx.onKeydown($event); });
            }
            if (rf & 2) {
                i0.ɵɵattribute("role", ctx.role);
            }
        }, inputs: { activeItem: "activeItem", withWrap: "withWrap" }, outputs: { itemSelect: "itemSelect" }, features: [i0.ɵɵNgOnChangesFeature] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(FocusKeyListDirective, [{
                type: i0.Directive,
                args: [{
                        selector: "[sqFocusKeyList]"
                    }]
            }], null, { activeItem: [{
                    type: i0.Input
                }], withWrap: [{
                    type: i0.Input
                }], itemSelect: [{
                    type: i0.Output
                }], role: [{
                    type: i0.HostBinding,
                    args: ["attr.role"]
                }], components: [{
                    type: i0.ContentChildren,
                    args: [FocusKeyListItemDirective]
                }], onKeydown: [{
                    type: i0.HostListener,
                    args: ["keydown", ["$event"]]
                }] });
    })();

    var SCREEN_SIZE_RULES = new i0.InjectionToken('SCREEN_SIZE_RULES');
    exports.UIService = /** @class */ (function () {
        function UIService(screenSizeRules, notificationsService, clipboard) {
            var _this = this;
            this.screenSizeRules = screenSizeRules;
            this.notificationsService = notificationsService;
            this.clipboard = clipboard;
            this._resizeEvent = new rxjs.Subject();
            this._priorityResizeEvent = new rxjs.Subject();
            this.factories = new Map();
            this.resizeEventListener = base.Utils.frame(function (event) {
                _this.setScreenSize();
                _this._priorityResizeEvent.next(event);
                _this._resizeEvent.next(event);
            });
            // See https://github.com/component/textarea-caret-position
            // We return a lineHeight value in addition
            this.textPositionProperties = [
                'direction',
                'boxSizing',
                'width',
                'height',
                'overflowX',
                'overflowY',
                'borderTopWidth',
                'borderRightWidth',
                'borderBottomWidth',
                'borderLeftWidth',
                'borderStyle',
                'paddingTop',
                'paddingRight',
                'paddingBottom',
                'paddingLeft',
                // https://developer.mozilla.org/en-US/docs/Web/CSS/font
                'fontStyle',
                'fontVariant',
                'fontWeight',
                'fontStretch',
                'fontSize',
                'fontSizeAdjust',
                'lineHeight',
                'fontFamily',
                'textAlign',
                'textTransform',
                'textIndent',
                'textDecoration',
                'letterSpacing',
                'wordSpacing',
                'tabSize',
                'MozTabSize'
            ];
            this.screenSizes = ["xs", "sm", "md", "lg", "xl", "xxl"]; // in ascending size order
            this.setScreenSize();
            window.addEventListener("resize", this.resizeEventListener);
            this.elementResizeDetector = elementResizeDetectorMaker__default['default']({ strategy: "scroll" });
        }
        UIService.prototype.ngOnDestroy = function () {
            this._resizeEvent.complete();
            this._priorityResizeEvent.complete();
            window.removeEventListener("resize", this.resizeEventListener);
        };
        Object.defineProperty(UIService.prototype, "resizeEvent", {
            get: function () {
                return this._resizeEvent;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UIService.prototype, "priorityResizeEvent", {
            get: function () {
                return this._priorityResizeEvent;
            },
            enumerable: false,
            configurable: true
        });
        /*private setTitle(title: string) {
            document.title = this.intlService.formatMessage(title);
        }*/
        UIService.prototype.appInit = function (appComponentRef) {
            //this.setTitle();
            //Utils.subscribe(this.intlService.events,
            //    (value) => {
            //        this.setTitle();
            //    });
            // See https://github.com/angular/angular/issues/18817
            /*this.resizeEvent.subscribe(
                (event) => {
                    appComponentRef.changeDetectorRef.markForCheck();
                });*/
            // this.loadComponent({component: DirtyChecker});
        };
        // legacy (was called from app.ts)
        UIService.prototype.addResizeListener = function (listener) {
            this._resizeEvent.subscribe(listener);
        };
        UIService.prototype.screenSizeIs = function (list) {
            var _this = this;
            //let rules = this.coreConfig.screenSizeRules;
            // validate that we're getting a string or array.
            if (!base.Utils.isString(list) && !base.Utils.isArray(list)) {
                throw new Error('screenSizeIs requires an array or comma-separated list');
            }
            // if it's a string, convert to array.
            if (base.Utils.isString(list)) {
                list = list.split(/\s*,\s*/);
            }
            return list.some(function (size) { return window.matchMedia(_this.screenSizeRules[size]).matches; });
        };
        UIService.prototype.setScreenSize = function () {
            var e_1, _a;
            try {
                for (var _b = __values(this.screenSizes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var size = _c.value;
                    if (this.screenSizeIs(size)) {
                        this.screenSize = size;
                        return;
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
            throw new Error("UIService.setScreenSize - no matching screen size");
        };
        UIService.prototype.screenSizeIsEqual = function (screenSize) {
            return this.screenSize === screenSize;
        };
        UIService.prototype.screenSizeIsGreater = function (screenSize) {
            var _this = this;
            var index1 = this.screenSizes.findIndex(function (value) { return value === _this.screenSize; });
            var index2 = this.screenSizes.findIndex(function (value) { return value === screenSize; });
            return index1 > index2;
        };
        UIService.prototype.screenSizeIsLess = function (screenSize) {
            var _this = this;
            var index1 = this.screenSizes.findIndex(function (value) { return value === _this.screenSize; });
            var index2 = this.screenSizes.findIndex(function (value) { return value === screenSize; });
            return index1 < index2;
        };
        UIService.prototype.screenSizeIsGreaterOrEqual = function (screenSize) {
            if (screenSize === this.screenSize) {
                return true;
            }
            return this.screenSizeIsGreater(screenSize);
        };
        UIService.prototype.screenSizeIsLessOrEqual = function (screenSize) {
            if (screenSize === this.screenSize) {
                return true;
            }
            return this.screenSizeIsLess(screenSize);
        };
        UIService.prototype._screenSizeTest = function (screenSize) {
            if (base.Utils.eqNCN(screenSize, "always", "true")) {
                return true;
            }
            if (base.Utils.eqNCN(screenSize, "never", "false")) {
                return false;
            }
            if (base.Utils.startsWith(screenSize, ">=")) {
                return this.screenSizeIsGreaterOrEqual(screenSize.slice(2));
            }
            if (base.Utils.startsWith(screenSize, ">")) {
                return this.screenSizeIsGreater(screenSize.slice(1));
            }
            if (base.Utils.startsWith(screenSize, "<=")) {
                return this.screenSizeIsLessOrEqual(screenSize.slice(2));
            }
            if (base.Utils.startsWith(screenSize, "<")) {
                return this.screenSizeIsLess(screenSize.slice(1));
            }
            if (base.Utils.startsWith(screenSize, "=")) {
                return this.screenSizeIsEqual(screenSize.slice(1));
            }
            return this.screenSizeIsEqual(screenSize);
        };
        // screenSizes is a sequence of size specs with optional operator separated by space or and (AND)
        // Multiple sequences can be specified using , or ; as a separator (these are OR'd)
        UIService.prototype.screenSizeTest = function (screenSizes) {
            var e_2, _a, e_3, _b;
            if (!screenSizes) {
                return true;
            }
            var ors = base.Utils.split(screenSizes, [',', ';']);
            try {
                for (var ors_1 = __values(ors), ors_1_1 = ors_1.next(); !ors_1_1.done; ors_1_1 = ors_1.next()) {
                    var or = ors_1_1.value;
                    var ands = base.Utils.split(or, " ");
                    if (ands.length === 0) {
                        continue;
                    }
                    var ok = true;
                    try {
                        for (var ands_1 = (e_3 = void 0, __values(ands)), ands_1_1 = ands_1.next(); !ands_1_1.done; ands_1_1 = ands_1.next()) {
                            var and = ands_1_1.value;
                            if (base.Utils.eqNC(and, "and")) { // space separated but you can use and if you want to
                                continue;
                            }
                            if (!this._screenSizeTest(and)) {
                                ok = false;
                                break;
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (ands_1_1 && !ands_1_1.done && (_b = ands_1.return)) _b.call(ands_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    if (ok) {
                        return true;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (ors_1_1 && !ors_1_1.done && (_a = ors_1.return)) _a.call(ors_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return false;
        };
        UIService.prototype.getContentRect = function (element) {
            var rect = element.getBoundingClientRect();
            var computedStyle = window.getComputedStyle(element);
            var borderLeft = parseFloat(computedStyle.borderLeft);
            var borderRight = parseFloat(computedStyle.borderRight);
            var borderTop = parseFloat(computedStyle.borderTop);
            var borderBottom = parseFloat(computedStyle.borderBottom);
            var paddingLeft = parseFloat(computedStyle.paddingLeft);
            var paddingRight = parseFloat(computedStyle.paddingRight);
            var paddingTop = parseFloat(computedStyle.paddingTop);
            var paddingBottom = parseFloat(computedStyle.paddingBottom);
            return {
                top: rect.top + borderTop + paddingTop,
                right: rect.right - borderRight - paddingRight,
                bottom: rect.bottom - borderBottom - paddingBottom,
                left: rect.left + borderLeft + paddingLeft,
                width: rect.width - borderLeft - paddingLeft - paddingRight - borderRight,
                height: rect.height - borderTop - paddingTop - paddingBottom - borderBottom
            };
        };
        // caret support
        UIService.prototype.getCaret = function (input) {
            return {
                start: input.selectionStart || 0,
                end: input.selectionEnd || 0
            };
        };
        UIService.prototype.setCaret = function (input, start, end, text, selectionAction, ensureVisible, raiseEvent) {
            if (end === void 0) { end = start; }
            if (selectionAction === void 0) { selectionAction = UIService.SelectionAction.collapse; }
            if (ensureVisible === void 0) { ensureVisible = true; }
            if (raiseEvent === void 0) { raiseEvent = true; }
            if (start < 0) {
                return;
            }
            if (base.Utils.isString(text)) {
                var value = input.value;
                if (end >= start) {
                    value = value.slice(0, start) + text + value.slice(end);
                }
                else {
                    value = value.slice(0, start) + text;
                }
                input.value = value;
                switch (selectionAction) {
                    case UIService.SelectionAction.adjust:
                        end = start + text.length;
                        break;
                    case UIService.SelectionAction.none:
                        break;
                    case UIService.SelectionAction.collapseToStart:
                        end = start;
                        break;
                    case UIService.SelectionAction.collapse:
                    default:
                        end = start + text.length;
                        start = end;
                        break;
                }
            }
            if (end < 0) {
                end = start;
            }
            input.setSelectionRange(start, end);
            if (ensureVisible) {
                var rect = input.getBoundingClientRect();
                var contentRect = this.getContentRect(input);
                var textPos = this.getTextPosition(input, this.getCaret(input).end);
                var scrollLeft = input.scrollLeft;
                var minX = contentRect.left + scrollLeft;
                var maxX = contentRect.right + scrollLeft;
                var caretX = rect.left + textPos.left;
                if (caretX < minX || caretX > maxX) {
                    scrollLeft = Math.max(caretX - contentRect.right + 1 /*for the caret*/, 0);
                    input.scrollLeft = scrollLeft;
                }
            }
            if (raiseEvent) {
                var event = new CustomEvent("input");
                input.dispatchEvent(event);
            }
        };
        UIService.prototype.getTextPosition = function (element, position, options) {
            var debug = options && options.debug || false;
            if (debug) {
                var el = document.querySelector('#input-textarea-caret-position-mirror-div');
                if (el) {
                    if (el.parentNode) {
                        el.parentNode.removeChild(el);
                    }
                }
            }
            // mirrored div
            var div = document.createElement('div');
            div.id = 'input-textarea-caret-position-mirror-div';
            document.body.appendChild(div);
            var style = div.style;
            var computed = !!window.getComputedStyle ? getComputedStyle(element) : element.currentStyle; // currentStyle for IE < 9
            // default textarea styles
            style.whiteSpace = 'pre-wrap';
            if (element.nodeName !== 'INPUT')
                style.wordWrap = 'break-word'; // only for textarea-s
            // position off-screen
            style.position = 'absolute'; // required to return coordinates properly
            if (!debug)
                style.visibility = 'hidden'; // not 'display: none' because we want rendering
            // transfer the element's properties to the div
            this.textPositionProperties.forEach(function (prop) {
                style[prop] = computed[prop];
            });
            if (!base.Utils.isUndefined(window.mozInnerScreenX)) {
                // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
                if (element.scrollHeight > parseInt(computed.height, 10))
                    style.overflowY = 'scroll';
            }
            else {
                style.overflow = 'hidden'; // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
            }
            div.textContent = element.value.substring(0, position);
            // the second special handling for input type="text" vs textarea: spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
            if (element.nodeName === 'INPUT' && div.textContent) {
                div.textContent = div.textContent.replace(/\s/g, '\u00a0');
            }
            var span = document.createElement('span');
            // Wrapping must be replicated *exactly*, including when a long word gets
            // onto the next line, with whitespace at the end of the line before (#7).
            // The  *only* reliable way to do that is to copy the *entire* rest of the
            // textarea's content into the <span> created at the caret position.
            // for inputs, just '.' would be enough, but why bother?
            div.appendChild(span);
            // return lineHeight too
            span.textContent = '.';
            var lineHeight = span.offsetHeight;
            span.textContent = element.value.substring(position) || '.'; // || because a completely empty faux span doesn't render at all
            var coordinates = {
                top: span.offsetTop + parseInt(computed['borderTopWidth'], 10),
                left: span.offsetLeft + parseInt(computed['borderLeftWidth'], 10),
                lineHeight: lineHeight
            };
            if (debug) {
                span.style.backgroundColor = '#aaa';
            }
            else {
                document.body.removeChild(div);
            }
            return coordinates;
        };
        UIService.prototype.getViewport = function () {
            return document.body.getBoundingClientRect();
        };
        UIService.prototype.addElementResizeListener = function (element, listener) {
            this.elementResizeDetector.listenTo(element, listener);
        };
        UIService.prototype.removeElementResizeListener = function (element, listener) {
            this.elementResizeDetector.removeListener(element, listener);
        };
        UIService.prototype.copyToClipboard = function (data, maxLength) {
            var _this = this;
            if (maxLength === void 0) { maxLength = 30; }
            if (!(navigator === null || navigator === void 0 ? void 0 : navigator.clipboard)) {
                // Note: CDK seems to struggle with large chunks of text
                this.copyToClipboardCdk(data, maxLength);
            }
            else {
                // Navigator built-in clipboard management
                navigator.clipboard.writeText(data).then(function () {
                    _this.notificationsService.success("msg#clipboard.success", { data: "\"" + (data.length > maxLength ? (data.slice(0, maxLength) + "...") : data) + "\"" });
                }, function (err) {
                    _this.notificationsService.warning("msg#clipboard.error");
                });
            }
        };
        UIService.prototype.copyToClipboardCdk = function (data, maxLength) {
            var _this = this;
            if (maxLength === void 0) { maxLength = 30; }
            var pending = this.clipboard.beginCopy(data);
            var remainingAttempts = 3;
            var attempt = function () {
                var result = pending.copy();
                if (!result && --remainingAttempts) {
                    setTimeout(attempt);
                }
                else {
                    // Remember to destroy when you're done!
                    pending.destroy();
                    if (result) {
                        _this.notificationsService.success("msg#clipboard.success", { data: "\"" + (data.length > maxLength ? (data.slice(0, maxLength) + "...") : data) + "\"" });
                    }
                    else {
                        _this.notificationsService.warning("msg#clipboard.error");
                    }
                }
            };
            attempt();
        };
        return UIService;
    }());
    exports.UIService.ɵfac = function UIService_Factory(t) { return new (t || exports.UIService)(i0.ɵɵinject(SCREEN_SIZE_RULES), i0.ɵɵinject(i1$1.NotificationsService), i0.ɵɵinject(i2.Clipboard)); };
    exports.UIService.ɵprov = i0.ɵɵdefineInjectable({ token: exports.UIService, factory: exports.UIService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(exports.UIService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [SCREEN_SIZE_RULES]
                        }] }, { type: i1$1.NotificationsService }, { type: i2.Clipboard }];
        }, null);
    })();
    (function (UIService) {
        var SelectionAction;
        (function (SelectionAction) {
            SelectionAction[SelectionAction["adjust"] = 0] = "adjust";
            SelectionAction[SelectionAction["none"] = 1] = "none";
            SelectionAction[SelectionAction["collapseToStart"] = 2] = "collapseToStart";
            SelectionAction[SelectionAction["collapse"] = 3] = "collapse";
        })(SelectionAction = UIService.SelectionAction || (UIService.SelectionAction = {}));
    })(exports.UIService || (exports.UIService = {}));

    var ResizeEventDirective = /** @class */ (function () {
        function ResizeEventDirective(elementRef, zone, uiService) {
            var _this = this;
            this.elementRef = elementRef;
            this.zone = zone;
            this.uiService = uiService;
            this.resizeEvent = new i0.EventEmitter();
            this.raiseEvent = function () {
                var contentRect = _this.elementRef.nativeElement.getBoundingClientRect();
                _this.resizeEvent.emit(contentRect);
            };
        }
        ResizeEventDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (window.ResizeObserver) {
                this.resizeObserver = new window.ResizeObserver(function (entries) {
                    _this.zone.run(function () {
                        var contentRect = ((entries === null || entries === void 0 ? void 0 : entries.length) === 1 && entries[0].contentRect);
                        _this.resizeEvent.emit(contentRect);
                    });
                });
                this.resizeObserver.observe(this.elementRef.nativeElement);
            }
            else {
                this.uiService.addElementResizeListener(this.elementRef.nativeElement, this.raiseEvent);
            }
        };
        ResizeEventDirective.prototype.ngOnDestroy = function () {
            if (window.ResizeObserver) {
                this.resizeObserver.unobserve(this.elementRef.nativeElement);
            }
            else {
                this.uiService.removeElementResizeListener(this.elementRef.nativeElement, this.raiseEvent);
            }
        };
        return ResizeEventDirective;
    }());
    ResizeEventDirective.ɵfac = function ResizeEventDirective_Factory(t) { return new (t || ResizeEventDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(exports.UIService)); };
    ResizeEventDirective.ɵdir = i0.ɵɵdefineDirective({ type: ResizeEventDirective, selectors: [["", "sqResize", ""]], outputs: { resizeEvent: "sqResize" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ResizeEventDirective, [{
                type: i0.Directive,
                args: [{
                        selector: "[sqResize]"
                    }]
            }], function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: exports.UIService }]; }, { resizeEvent: [{
                    type: i0.Output,
                    args: ["sqResize"]
                }] });
    })();

    var _c0 = ["container"];
    var _c1 = ["sqSticky", ""];
    var _c2 = function (a0) { return { "margin-top.px": a0 }; };
    var _c3 = function (a0, a1) { return { "top.px": a0, "bottom.px": a1 }; };
    var _c4 = ["*"];
    var StickyComponent = /** @class */ (function () {
        function StickyComponent(ui, cdRef) {
            var _this = this;
            this.ui = ui;
            this.cdRef = cdRef;
            this.marginTop = 0;
            this.postScrollUp = base.Utils.debounce(function () {
                _this.onScroll(true);
            }, 250);
        }
        StickyComponent.prototype.onScroll = function (forceScrollDown) {
            if (forceScrollDown === void 0) { forceScrollDown = false; }
            var scrollDelta = window.pageYOffset - this.scrollY;
            this.scrollY = window.pageYOffset;
            var offsets = this.offsets || { top: 0, bottom: 0 };
            var componentHeight = this.container.nativeElement.getBoundingClientRect().height;
            // Scrolling down (OR top of page OR forced after a scroll up OR component height small than screen height)
            if (scrollDelta >= 0 || this.scrollY === 0 || forceScrollDown || componentHeight + offsets.top + offsets.bottom < window.innerHeight) {
                this.marginTop = Math.min(this.scrollY, this.marginTop);
                this.bottom = undefined;
                this.top = Math.min(window.innerHeight - componentHeight - offsets.bottom, offsets.top);
            }
            // Scrolling up
            else {
                this.marginTop = Math.max(this.scrollY + window.innerHeight - componentHeight - offsets.bottom - offsets.top, this.marginTop);
                this.bottom = window.innerHeight - offsets.top - componentHeight;
                this.top = undefined;
                if (this.scrollY <= this.marginTop) {
                    this.postScrollUp();
                }
            }
            this.cdRef.markForCheck();
        };
        StickyComponent.prototype.ngOnInit = function () {
            var _a;
            if (CSS.supports("position", "sticky") || CSS.supports("position", "-webkit-sticky")) {
                this.scrollY = window.pageYOffset;
                this.top = (((_a = this.offsets) === null || _a === void 0 ? void 0 : _a.top) || 0);
            }
        };
        StickyComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            // position: sticky is not supported in Internet Explorer. A workaround could be to rely on position: relative and position: fixed, with additional logic.
            if (CSS.supports("position", "sticky") || CSS.supports("position", "-webkit-sticky")) {
                this.listener = function () { return _this.onScroll(); };
                window.addEventListener('scroll', this.listener);
                window.addEventListener('resize', this.listener);
                this.ui.addElementResizeListener(this.container.nativeElement, this.listener);
            }
        };
        StickyComponent.prototype.ngOnDestroy = function () {
            if (this.listener) {
                window.removeEventListener('scroll', this.listener);
                window.removeEventListener('resize', this.listener);
                this.ui.removeElementResizeListener(this.container.nativeElement, this.listener);
            }
        };
        return StickyComponent;
    }());
    StickyComponent.ɵfac = function StickyComponent_Factory(t) { return new (t || StickyComponent)(i0.ɵɵdirectiveInject(exports.UIService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    StickyComponent.ɵcmp = i0.ɵɵdefineComponent({ type: StickyComponent, selectors: [["", "sqSticky", ""]], viewQuery: function StickyComponent_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵviewQuery(_c0, true);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.container = _t.first);
            }
        }, inputs: { offsets: ["sqSticky", "offsets"] }, attrs: _c1, ngContentSelectors: _c4, decls: 4, vars: 7, consts: [[3, "ngStyle"], [1, "sticky-container", 3, "ngStyle"], ["container", ""]], template: function StickyComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵprojectionDef();
                i0.ɵɵelement(0, "div", 0);
                i0.ɵɵelementStart(1, "div", 1, 2);
                i0.ɵɵprojection(3);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(2, _c2, ctx.marginTop));
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction2(4, _c3, ctx.top, ctx.bottom));
            }
        }, directives: [i2$1.NgStyle], styles: [".sticky-container[_ngcontent-%COMP%] {\n    position: sticky;\n    position: -webkit-sticky;\n}"], changeDetection: 0 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(StickyComponent, [{
                type: i0.Component,
                args: [{
                        selector: '[sqSticky]',
                        template: "\n<div [ngStyle]=\"{'margin-top.px': marginTop}\"></div>\n<div #container class=\"sticky-container\" [ngStyle]=\"{'top.px': top, 'bottom.px': bottom}\">\n    <ng-content></ng-content>\n</div>\n",
                        styles: ["\n.sticky-container {\n    position: sticky;\n    position: -webkit-sticky;\n}\n    "],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], function () { return [{ type: exports.UIService }, { type: i0.ChangeDetectorRef }]; }, { offsets: [{
                    type: i0.Input,
                    args: ["sqSticky"]
                }], container: [{
                    type: i0.ViewChild,
                    args: ["container"]
                }] });
    })();

    var TooltipComponent = /** @class */ (function () {
        function TooltipComponent() {
            this.text = '';
        }
        return TooltipComponent;
    }());
    TooltipComponent.ɵfac = function TooltipComponent_Factory(t) { return new (t || TooltipComponent)(); };
    TooltipComponent.ɵcmp = i0.ɵɵdefineComponent({ type: TooltipComponent, selectors: [["sqx-tooltip"]], inputs: { text: "text" }, decls: 2, vars: 2, consts: [[1, "sq-tooltip"]], template: function TooltipComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtext(1);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("@tooltip", undefined);
                i0.ɵɵadvance(1);
                i0.ɵɵtextInterpolate(ctx.text);
            }
        }, styles: ["[_nghost-%COMP%]{display:block}[_nghost-%COMP%]   .sq-tooltip[_ngcontent-%COMP%]{background-color:#494949;border-radius:4px;color:#fff;font-size:14px;max-width:280px;padding:.5rem 1rem}.dark[_nghost-%COMP%]   .sq-tooltip[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .sq-tooltip[_ngcontent-%COMP%]{background-color:#f0f0f0;color:#606060}"], data: { animation: [
                animations.trigger('tooltip', [
                    animations.transition(':enter', [
                        animations.style({ opacity: 0 }),
                        animations.animate(300, animations.style({ opacity: 1 })),
                    ]),
                    animations.transition(':leave', [
                        animations.animate(300, animations.style({ opacity: 0 })),
                    ]),
                ]),
            ] }, changeDetection: 0 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(TooltipComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'sqx-tooltip',
                        styleUrls: ['./tooltip.component.css'],
                        template: "<div class=\"sq-tooltip\" @tooltip>{{ text }}</div>",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        animations: [
                            animations.trigger('tooltip', [
                                animations.transition(':enter', [
                                    animations.style({ opacity: 0 }),
                                    animations.animate(300, animations.style({ opacity: 1 })),
                                ]),
                                animations.transition(':leave', [
                                    animations.animate(300, animations.style({ opacity: 0 })),
                                ]),
                            ]),
                        ],
                    }]
            }], null, { text: [{
                    type: i0.Input
                }] });
    })();

    var TooltipDirective = /** @class */ (function () {
        function TooltipDirective(overlay, overlayPositionBuilder, elementRef) {
            this.overlay = overlay;
            this.overlayPositionBuilder = overlayPositionBuilder;
            this.elementRef = elementRef;
            this.text = "";
            this.placement = "bottom";
            this.delay = 300;
        }
        TooltipDirective.prototype.ngOnDestroy = function () {
            if (this.overlayRef) {
                this.overlayRef.detach();
            }
        };
        TooltipDirective.prototype.show = function (event) {
            var _this = this;
            event.preventDefault();
            event.stopPropagation();
            this.clearTimer();
            this.timeoutId = setTimeout(function () {
                if (_this.overlayRef) {
                    _this.overlayRef.detach();
                }
                if (_this.text.trim().length === 0) {
                    return;
                }
                var positionStrategy = _this.overlayPositionBuilder
                    .flexibleConnectedTo(_this.elementRef)
                    .withPositions([_this.position()]);
                var scrollStrategy = _this.overlay.scrollStrategies.close();
                _this.overlayRef = _this.overlay.create({ positionStrategy: positionStrategy, scrollStrategy: scrollStrategy });
                var tooltipRef = _this.overlayRef.attach(new portal.ComponentPortal(TooltipComponent));
                tooltipRef.instance.text = _this.text;
            }, this.delay);
        };
        TooltipDirective.prototype.mouseClick = function (event) {
            event.preventDefault();
            event.stopPropagation();
            this.clearTimer();
        };
        TooltipDirective.prototype.hide = function () {
            this.clearTimer();
        };
        TooltipDirective.prototype.position = function () {
            switch (this.placement) {
                case "bottom":
                    return {
                        originX: "center",
                        originY: "bottom",
                        overlayX: "center",
                        overlayY: "top",
                        offsetY: 8
                    };
                case "right":
                    return {
                        originX: "end",
                        originY: "center",
                        overlayX: "start",
                        overlayY: "center",
                        offsetX: 8
                    };
                case "left":
                    return {
                        originX: "start",
                        originY: "center",
                        overlayX: "end",
                        overlayY: "center",
                        offsetX: -8
                    };
                default:
                    return {
                        originX: "center",
                        originY: "top",
                        overlayX: "center",
                        overlayY: "bottom",
                        offsetY: -8
                    };
            }
        };
        TooltipDirective.prototype.clearTimer = function () {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }
            if (this.overlayRef) {
                this.overlayRef.detach();
            }
        };
        return TooltipDirective;
    }());
    TooltipDirective.ɵfac = function TooltipDirective_Factory(t) { return new (t || TooltipDirective)(i0.ɵɵdirectiveInject(i1$2.Overlay), i0.ɵɵdirectiveInject(i1$2.OverlayPositionBuilder), i0.ɵɵdirectiveInject(i0.ElementRef)); };
    TooltipDirective.ɵdir = i0.ɵɵdefineDirective({ type: TooltipDirective, selectors: [["", "sqTooltip", ""]], hostBindings: function TooltipDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("mouseenter", function TooltipDirective_mouseenter_HostBindingHandler($event) { return ctx.show($event); })("mousedown", function TooltipDirective_mousedown_HostBindingHandler($event) { return ctx.mouseClick($event); })("mouseleave", function TooltipDirective_mouseleave_HostBindingHandler() { return ctx.hide(); });
            }
        }, inputs: { text: ["sqTooltip", "text"], placement: "placement", delay: "delay" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(TooltipDirective, [{
                type: i0.Directive,
                args: [{ selector: "[sqTooltip]" }]
            }], function () { return [{ type: i1$2.Overlay }, { type: i1$2.OverlayPositionBuilder }, { type: i0.ElementRef }]; }, { text: [{
                    type: i0.Input,
                    args: ["sqTooltip"]
                }], placement: [{
                    type: i0.Input
                }], delay: [{
                    type: i0.Input
                }], show: [{
                    type: i0.HostListener,
                    args: ["mouseenter", ['$event']]
                }], mouseClick: [{
                    type: i0.HostListener,
                    args: ["mousedown", ['$event']]
                }], hide: [{
                    type: i0.HostListener,
                    args: ["mouseleave"]
                }] });
    })();

    var DatePipe = /** @class */ (function (_super) {
        __extends(DatePipe, _super);
        function DatePipe(intlService, changeDetectorRef) {
            return _super.call(this, intlService, changeDetectorRef) || this;
        }
        DatePipe.prototype.updateValue = function (key, params) {
            _super.prototype.updateValue.call(this, key, params);
            this.value = this.intlService.formatDate(key, params);
        };
        return DatePipe;
    }(i1$3.AbstractIntlPipe));
    DatePipe.ɵfac = function DatePipe_Factory(t) { return new (t || DatePipe)(i0.ɵɵdirectiveInject(i1$3.IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
    DatePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqDate", type: DatePipe, pure: false });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(DatePipe, [{
                type: i0.Pipe,
                args: [{ name: "sqDate", pure: false }]
            }], function () { return [{ type: i1$3.IntlService }, { type: i0.ChangeDetectorRef }]; }, null);
    })();

    var ExprPipe = /** @class */ (function (_super) {
        __extends(ExprPipe, _super);
        function ExprPipe(intlService, changeDetectorRef) {
            return _super.call(this, intlService, changeDetectorRef) || this;
        }
        ExprPipe.prototype.updateValue = function (key, params) {
            _super.prototype.updateValue.call(this, key, params);
            if (key instanceof i1$4.Expr) {
                var message = key.toMessage(params);
                this.value = this.intlService.formatMessage(message.message, message.values);
            }
            else {
                this.value = this.intlService.formatMessage(key);
                if (params && params.asHTML) {
                    this.value = base.Utils.encodeHTML(this.value);
                }
            }
        };
        return ExprPipe;
    }(i1$3.AbstractIntlPipe));
    ExprPipe.ɵfac = function ExprPipe_Factory(t) { return new (t || ExprPipe)(i0.ɵɵdirectiveInject(i1$3.IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
    ExprPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqExpr", type: ExprPipe, pure: false });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ExprPipe, [{
                type: i0.Pipe,
                args: [{ name: "sqExpr", pure: false }]
            }], function () { return [{ type: i1$3.IntlService }, { type: i0.ChangeDetectorRef }]; }, null);
    })();

    /**
     * A pipe to transform a number into a readable internationalized memory size label,
     * for example "126432" into "126 kB".
     *
     * @example
     * <span>Size:</span><span>{{ documentSize | sqMemorySize }}</span>
     */
    var MemorySizePipe = /** @class */ (function (_super) {
        __extends(MemorySizePipe, _super);
        function MemorySizePipe(formatService, intlService, changeDetectorRef) {
            var _this = _super.call(this, intlService, changeDetectorRef) || this;
            _this.formatService = formatService;
            return _this;
        }
        MemorySizePipe.prototype.updateValue = function (key) {
            _super.prototype.updateValue.call(this, key);
            this.value = this.formatService.formatMemorySize(key);
        };
        return MemorySizePipe;
    }(i1$3.AbstractIntlPipe));
    MemorySizePipe.ɵfac = function MemorySizePipe_Factory(t) { return new (t || MemorySizePipe)(i0.ɵɵdirectiveInject(i1$4.FormatService), i0.ɵɵdirectiveInject(i1$3.IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
    MemorySizePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqMemorySize", type: MemorySizePipe, pure: false });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(MemorySizePipe, [{
                type: i0.Pipe,
                args: [{ name: "sqMemorySize", pure: false }]
            }], function () { return [{ type: i1$4.FormatService }, { type: i1$3.IntlService }, { type: i0.ChangeDetectorRef }]; }, null);
    })();

    var MomentPipe = /** @class */ (function (_super) {
        __extends(MomentPipe, _super);
        function MomentPipe(intlService, changeDetectorRef) {
            return _super.call(this, intlService, changeDetectorRef) || this;
        }
        MomentPipe.prototype.updateValue = function (key, params) {
            if (params === void 0) { params = {}; }
            _super.prototype.updateValue.call(this, key, params);
            var m = moment__default['default'](key);
            if (params.format) {
                this.value = m.format(params.format);
            }
            else {
                switch (params.type) {
                    case "fromNow":
                        this.value = m.fromNow(params.suffix);
                        break;
                    case "from":
                        this.value = m.from(params.reference, params.suffix);
                        break;
                    case "toNow":
                        this.value = m.toNow(params.suffix);
                        break;
                    case "to":
                        this.value = m.to(params.reference, params.suffix);
                        break;
                    case "calendar":
                        this.value = m.calendar(params.reference);
                        break;
                    case "diff":
                        this.value = "" + m.diff(params.reference, params.unit, params.precise);
                        break;
                    case "valueOf":
                        this.value = "" + m.valueOf();
                        break;
                    case "unix":
                        this.value = "" + m.unix();
                        break;
                    case "daysInMonth":
                        this.value = "" + m.daysInMonth();
                        break;
                    case "iso":
                        this.value = m.toISOString();
                        break;
                }
            }
        };
        return MomentPipe;
    }(i1$3.AbstractIntlPipe));
    MomentPipe.ɵfac = function MomentPipe_Factory(t) { return new (t || MomentPipe)(i0.ɵɵdirectiveInject(i1$3.IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
    MomentPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqMoment", type: MomentPipe, pure: false });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(MomentPipe, [{
                type: i0.Pipe,
                args: [{ name: "sqMoment", pure: false }]
            }], function () { return [{ type: i1$3.IntlService }, { type: i0.ChangeDetectorRef }]; }, null);
    })();

    var NumberPipe = /** @class */ (function (_super) {
        __extends(NumberPipe, _super);
        function NumberPipe(intlService, changeDetectorRef) {
            return _super.call(this, intlService, changeDetectorRef) || this;
        }
        NumberPipe.prototype.updateValue = function (key, params) {
            _super.prototype.updateValue.call(this, key, params);
            this.value = typeof key === "number" ? this.intlService.formatNumber(key, params) : key;
        };
        return NumberPipe;
    }(i1$3.AbstractIntlPipe));
    NumberPipe.ɵfac = function NumberPipe_Factory(t) { return new (t || NumberPipe)(i0.ɵɵdirectiveInject(i1$3.IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
    NumberPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqNumber", type: NumberPipe, pure: false });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NumberPipe, [{
                type: i0.Pipe,
                args: [{ name: "sqNumber", pure: false }]
            }], function () { return [{ type: i1$3.IntlService }, { type: i0.ChangeDetectorRef }]; }, null);
    })();

    var RelativeTimePipe = /** @class */ (function (_super) {
        __extends(RelativeTimePipe, _super);
        function RelativeTimePipe(intlService, changeDetectorRef) {
            return _super.call(this, intlService, changeDetectorRef) || this;
        }
        RelativeTimePipe.prototype.updateValue = function (key, params) {
            _super.prototype.updateValue.call(this, key, params);
            this.value = this.intlService.formatRelativeTime(key, params ? params.unit : undefined, params);
        };
        return RelativeTimePipe;
    }(i1$3.AbstractIntlPipe));
    RelativeTimePipe.ɵfac = function RelativeTimePipe_Factory(t) { return new (t || RelativeTimePipe)(i0.ɵɵdirectiveInject(i1$3.IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
    RelativeTimePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqRelativeTime", type: RelativeTimePipe, pure: false });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(RelativeTimePipe, [{
                type: i0.Pipe,
                args: [{ name: "sqRelativeTime", pure: false }]
            }], function () { return [{ type: i1$3.IntlService }, { type: i0.ChangeDetectorRef }]; }, null);
    })();

    var TimePipe = /** @class */ (function (_super) {
        __extends(TimePipe, _super);
        function TimePipe(intlService, changeDetectorRef) {
            return _super.call(this, intlService, changeDetectorRef) || this;
        }
        TimePipe.prototype.updateValue = function (key, params) {
            _super.prototype.updateValue.call(this, key, params);
            this.value = this.intlService.formatTime(key, params);
        };
        return TimePipe;
    }(i1$3.AbstractIntlPipe));
    TimePipe.ɵfac = function TimePipe_Factory(t) { return new (t || TimePipe)(i0.ɵɵdirectiveInject(i1$3.IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
    TimePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqTime", type: TimePipe, pure: false });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(TimePipe, [{
                type: i0.Pipe,
                args: [{ name: "sqTime", pure: false }]
            }], function () { return [{ type: i1$3.IntlService }, { type: i0.ChangeDetectorRef }]; }, null);
    })();

    var ValuePipe = /** @class */ (function (_super) {
        __extends(ValuePipe, _super);
        function ValuePipe(formatService, intlService, changeDetectorRef) {
            var _this = _super.call(this, intlService, changeDetectorRef) || this;
            _this.formatService = formatService;
            return _this;
        }
        ValuePipe.prototype.updateValue = function (key, params) {
            _super.prototype.updateValue.call(this, key, params);
            this.value = this.formatService.formatFieldValue(key, params);
            this.value = base.Utils.replace(this.value, /;/g, "$&\u200B");
        };
        return ValuePipe;
    }(i1$3.AbstractIntlPipe));
    ValuePipe.ɵfac = function ValuePipe_Factory(t) { return new (t || ValuePipe)(i0.ɵɵdirectiveInject(i1$4.FormatService), i0.ɵɵdirectiveInject(i1$3.IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
    ValuePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqValue", type: ValuePipe, pure: false });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ValuePipe, [{
                type: i0.Pipe,
                args: [{ name: "sqValue", pure: false }]
            }], function () { return [{ type: i1$4.FormatService }, { type: i1$3.IntlService }, { type: i0.ChangeDetectorRef }]; }, null);
    })();

    var defaultScreenSizeRules = {
        xxl: "(min-width: 1920px)",
        xl: "(min-width: 1200px) and (max-width: 1919.98px)",
        lg: "(min-width: 992px) and (max-width: 1199.98px)",
        md: "(min-width: 768px) and (max-width: 991.98px)",
        sm: "(min-width: 576px) and (max-width: 767.98px)",
        xs: "(max-width: 575.98px)",
    };
    var UtilsModule = /** @class */ (function () {
        function UtilsModule() {
        }
        return UtilsModule;
    }());
    UtilsModule.ɵmod = i0.ɵɵdefineNgModule({ type: UtilsModule });
    UtilsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function UtilsModule_Factory(t) { return new (t || UtilsModule)(); }, providers: [
            {
                provide: SCREEN_SIZE_RULES,
                useValue: defaultScreenSizeRules
            }
        ], imports: [[
                i2$1.CommonModule,
                a11y.A11yModule,
                i1$3.IntlModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(UtilsModule, { declarations: [DatePipe, ExprPipe, MemorySizePipe, MomentPipe, NumberPipe, RelativeTimePipe, TimePipe, ValuePipe,
                Autofocus, ClickOutside, MediaIf, ScrollIntoView, FocusKeyListDirective, FocusKeyListItemDirective,
                ResizeEventDirective, StickyComponent, TooltipComponent, TooltipDirective], imports: [i2$1.CommonModule,
                a11y.A11yModule,
                i1$3.IntlModule], exports: [DatePipe, ExprPipe, MemorySizePipe, MomentPipe, NumberPipe, RelativeTimePipe, TimePipe, ValuePipe,
                Autofocus, ClickOutside, MediaIf, ScrollIntoView, FocusKeyListDirective, FocusKeyListItemDirective,
                ResizeEventDirective, StickyComponent, TooltipComponent, TooltipDirective] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(UtilsModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i2$1.CommonModule,
                            a11y.A11yModule,
                            i1$3.IntlModule
                        ],
                        declarations: [
                            DatePipe, ExprPipe, MemorySizePipe, MomentPipe, NumberPipe, RelativeTimePipe, TimePipe, ValuePipe,
                            Autofocus, ClickOutside, MediaIf, ScrollIntoView, FocusKeyListDirective, FocusKeyListItemDirective,
                            ResizeEventDirective, StickyComponent, TooltipComponent, TooltipDirective
                        ],
                        exports: [
                            DatePipe, ExprPipe, MemorySizePipe, MomentPipe, NumberPipe, RelativeTimePipe, TimePipe, ValuePipe,
                            Autofocus, ClickOutside, MediaIf, ScrollIntoView, FocusKeyListDirective, FocusKeyListItemDirective,
                            ResizeEventDirective, StickyComponent, TooltipComponent, TooltipDirective
                        ],
                        providers: [
                            {
                                provide: SCREEN_SIZE_RULES,
                                useValue: defaultScreenSizeRules
                            }
                        ]
                    }]
            }], null, null);
    })();

    var VoiceRecognitionService = /** @class */ (function () {
        function VoiceRecognitionService(intlService, notify) {
            var _this = this;
            this.intlService = intlService;
            this.notify = notify;
            this.recognizing = false;
            this.ignore_onend = false;
            this.text = new rxjs.Subject();
            this.started = new rxjs.Subject();
            this.available = false;
            this.onResult = function (e) {
                var transcript = Array.from(e.results)
                    .map(function (result) { return result[0]; })
                    .map(function (result) { return result.transcript; })
                    .join("");
                _this.text.next(transcript);
            };
            this.onStart = function (event) {
                _this.recognizing = true;
                _this.start_timestamp = event.timeStamp;
            };
            this.onEnd = function () {
                if (_this.ignore_onend) {
                    return;
                }
                _this.recognizing = false;
                _this.started.next(false);
            };
            this.onError = function (event) {
                var message = event.error;
                switch (event.error) {
                    case "no-speech": {
                        message = "No speech was detected.";
                        break;
                    }
                    case "audio-capture": {
                        message = "Audio capture failed.";
                        break;
                    }
                    case "not-allowed": {
                        if (event.timeStamp - _this.start_timestamp < 100) {
                            message = "info_blocked";
                        }
                        else {
                            message = "The user agent is not allowing any speech input to occur for reasons of security, privacy or user preference.";
                        }
                        break;
                    }
                    case "aborted":
                        {
                            message = "Speech input was aborted somehow, maybe by some user-agent-specific behavior such as UI that lets the user cancel speech input.";
                            break;
                        }
                        ;
                    case "network": {
                        message = "Some network communication that was required to complete the recognition failed.";
                        break;
                    }
                    case "service-not-allowed": {
                        message = "The user agent is not allowing the web application requested speech service, but would allow some speech service, to be used either because the user agent doesn’t support the selected one or because of reasons of security, privacy or user preference.";
                        break;
                    }
                    case "bad-grammar": {
                        message = "There was an error in the speech recognition grammar or semantic tags, or the grammar format or semantic tag format is unsupported.";
                        break;
                    }
                    case "language-not-supported": {
                        message = "The language [" + _this.recognition.lang + "] was not supported.";
                        _this.recognition.lang = "en-US";
                        break;
                    }
                }
                _this.notify.warning(message);
                _this.ignore_onend = true;
                _this.started.next(false);
            };
        }
        VoiceRecognitionService.prototype.init = function () {
            var _this = this;
            var _a;
            this.intlService.events.subscribe(function () {
                var _a;
                _this.recognition.lang = (_a = _this.intlService.currentLocale.data) === null || _a === void 0 ? void 0 : _a.intl.locale;
            });
            try {
                this.recognition = new webkitSpeechRecognition();
                this.recognition.continuous = false;
                this.recognition.interimResults = true;
                this.recognition.lang = (_a = this.intlService.currentLocale.data) === null || _a === void 0 ? void 0 : _a.intl.locale;
                this.recognition.addEventListener("error", this.onError);
                this.recognition.addEventListener("result", this.onResult);
                this.recognition.addEventListener("start", this.onStart);
                this.recognition.addEventListener("end", this.onEnd);
                this.available = true;
            }
            catch (error) {
                this.available = false;
            }
        };
        VoiceRecognitionService.prototype.ngOnDestroy = function () {
            this.recognition.removeEventListener("error", this.onError);
            this.recognition.removeEventListener("result", this.onResult);
            this.recognition.removeEventListener("start", this.onStart);
            this.recognition.removeEventListener("end", this.onEnd);
        };
        VoiceRecognitionService.prototype.start = function () {
            if (this.recognizing) {
                this.stop();
                return;
            }
            this.text.next("");
            this.started.next(true);
            this.recognition.start();
        };
        VoiceRecognitionService.prototype.stop = function () {
            this.recognition.stop();
            this.started.next(false);
        };
        VoiceRecognitionService.prototype.toggleRecognition = function () {
            if (this.recognizing) {
                this.stop();
            }
            else {
                this.start();
            }
        };
        return VoiceRecognitionService;
    }());
    VoiceRecognitionService.ɵfac = function VoiceRecognitionService_Factory(t) { return new (t || VoiceRecognitionService)(i0.ɵɵinject(i1$3.IntlService), i0.ɵɵinject(i1$1.NotificationsService)); };
    VoiceRecognitionService.ɵprov = i0.ɵɵdefineInjectable({ token: VoiceRecognitionService, factory: VoiceRecognitionService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(VoiceRecognitionService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () { return [{ type: i1$3.IntlService }, { type: i1$1.NotificationsService }]; }, null);
    })();

    var _enUtils = {
        "clipboard": {
            "success": "{data} copied to the clipboard",
            "error": "Clipboard error"
        }
    };

    var _frUtils = {
        "clipboard": {
            "success": "{data} copié dans le presse-papiers",
            "error": "Erreur du presse-papiers"
        }
    };

    var _deUtils = {
        "clipboard": {
            "success": "{data} in die Zwischenablage kopiert",
            "error": "Zwischenablagefehler"
        }
    };

    var enUtils = base.Utils.merge({}, _enUtils);
    var frUtils = base.Utils.merge({}, _frUtils);
    var deUtils = base.Utils.merge({}, _deUtils);

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Autofocus = Autofocus;
    exports.ClickOutside = ClickOutside;
    exports.DatePipe = DatePipe;
    exports.ExprPipe = ExprPipe;
    exports.FocusKeyListDirective = FocusKeyListDirective;
    exports.FocusKeyListItemDirective = FocusKeyListItemDirective;
    exports.MediaIf = MediaIf;
    exports.MemorySizePipe = MemorySizePipe;
    exports.MomentPipe = MomentPipe;
    exports.NumberPipe = NumberPipe;
    exports.RelativeTimePipe = RelativeTimePipe;
    exports.ResizeEventDirective = ResizeEventDirective;
    exports.SCREEN_SIZE_RULES = SCREEN_SIZE_RULES;
    exports.ScrollIntoView = ScrollIntoView;
    exports.StickyComponent = StickyComponent;
    exports.TimePipe = TimePipe;
    exports.TooltipComponent = TooltipComponent;
    exports.TooltipDirective = TooltipDirective;
    exports.UtilsModule = UtilsModule;
    exports.ValuePipe = ValuePipe;
    exports.VoiceRecognitionService = VoiceRecognitionService;
    exports.deUtils = deUtils;
    exports.defaultScreenSizeRules = defaultScreenSizeRules;
    exports.enUtils = enUtils;
    exports.frUtils = frUtils;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-utils.umd.js.map
