(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@sinequa/core/base'), require('@angular/common'), require('@sinequa/components/collapse'), require('@sinequa/components/utils'), require('@sinequa/core/intl'), require('@angular/forms'), require('@sinequa/components/metadata'), require('@sinequa/components/search'), require('@sinequa/core/app-utils'), require('@sinequa/core/web-services')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/result', ['exports', '@angular/core', '@sinequa/core/base', '@angular/common', '@sinequa/components/collapse', '@sinequa/components/utils', '@sinequa/core/intl', '@angular/forms', '@sinequa/components/metadata', '@sinequa/components/search', '@sinequa/core/app-utils', '@sinequa/core/web-services'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components.result = {}), global.ng.core, global.sinequa.core.base, global.ng.common, global.sinequa.components.collapse, global.sinequa.components.utils, global.sinequa.core.intl, global.ng.forms, global.sinequa.components.metadata, global.sinequa.components.search, global.sinequa.core['app-utils'], global.sinequa.core['web-services']));
}(this, (function (exports, i0, base, i1, i2, i3, i2$1, forms, metadata, i1$1, i1$2, i3$1) { 'use strict';

    function ResultExtracts_ng_container_0_p_1_span_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 5);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqDate");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r4 = i0.ɵɵnextContext(3);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(2, 2, ctx_r4.record.modified, ctx_r4.dateFormat), "", !!ctx_r4.text ? " - " : "", "");
        }
    }
    function ResultExtracts_ng_container_0_p_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "p");
            i0.ɵɵtemplate(1, ResultExtracts_ng_container_0_p_1_span_1_Template, 3, 5, "span", 3);
            i0.ɵɵelement(2, "span", 4);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext(2);
            i0.ɵɵclassMapInterpolate1("", ctx_r1.extractsClass, " sq-text");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r1.record.modified && !ctx_r1.hideDate);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("innerHTML", ctx_r1.text, i0.ɵɵsanitizeHtml);
        }
    }
    function ResultExtracts_ng_container_0_ng_container_2_p_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "p");
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqDate");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r5 = i0.ɵɵnextContext(3);
            i0.ɵɵclassMapInterpolate1("", ctx_r5.extractsClass, " extracts-date sq-text");
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 4, ctx_r5.record.modified, ctx_r5.dateFormat));
        }
    }
    function ResultExtracts_ng_container_0_ng_container_2_ul_2_li_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "li", 7);
        }
        if (rf & 2) {
            var extract_r8 = ctx.$implicit;
            i0.ɵɵproperty("innerHTML", extract_r8, i0.ɵɵsanitizeHtml);
        }
    }
    function ResultExtracts_ng_container_0_ng_container_2_ul_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "ul");
            i0.ɵɵtemplate(1, ResultExtracts_ng_container_0_ng_container_2_ul_2_li_1_Template, 1, 1, "li", 6);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r6 = i0.ɵɵnextContext(3);
            i0.ɵɵclassMapInterpolate1("", ctx_r6.extractsClass, " sq-text");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r6.longExtracts);
        }
    }
    function ResultExtracts_ng_container_0_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, ResultExtracts_ng_container_0_ng_container_2_p_1_Template, 3, 7, "p", 1);
            i0.ɵɵtemplate(2, ResultExtracts_ng_container_0_ng_container_2_ul_2_Template, 2, 4, "ul", 1);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r2.record.modified && !ctx_r2.hideDate);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r2.longExtracts);
        }
    }
    function ResultExtracts_ng_container_0_a_3_Template(rf, ctx) {
        if (rf & 1) {
            var _r10_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 8);
            i0.ɵɵlistener("click", function ResultExtracts_ng_container_0_a_3_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r10_1); var ctx_r9 = i0.ɵɵnextContext(2); return ctx_r9.collapseClick($event); });
            i0.ɵɵelement(1, "sq-collapse-button", 9);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r3 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("collapsed", ctx_r3.collapsed);
        }
    }
    function ResultExtracts_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, ResultExtracts_ng_container_0_p_1_Template, 3, 5, "p", 1);
            i0.ɵɵtemplate(2, ResultExtracts_ng_container_0_ng_container_2_Template, 3, 2, "ng-container", 0);
            i0.ɵɵtemplate(3, ResultExtracts_ng_container_0_a_3_Template, 2, 1, "a", 2);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r0.longExtracts);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.longExtracts);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.showLinesExpander);
        }
    }
    var ResultExtracts = /** @class */ (function () {
        function ResultExtracts() {
            this.dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };
            this.collapsed = true;
        }
        ResultExtracts.prototype.setup = function () {
            this.text = undefined;
            this.longExtracts = undefined;
            if (this.showTextAlways) {
                this.text = base.Utils.encodeHTML(this.record.text);
                this.extractsClass = "sq-text-extracts";
            }
            else {
                if (this.showLongExtracts && (this.record["extracts"] || this.record["extractsperpartname"])) {
                    this.longExtracts = [];
                    // extractsperpartname is a complex structure where extracts are stored in an object: "highlight.data"
                    // in a csv field (';' separator)
                    var recordExtracts = this.record["extracts"] || this.record["extractsperpartname"].highlight[0].data.split(";");
                    if (this.maxLongExtracts) {
                        recordExtracts = recordExtracts.slice(0, this.maxLongExtracts * 3);
                    }
                    for (var i = 0; i < recordExtracts.length; i += 3) {
                        this.longExtracts.push(recordExtracts[i].replace(/\{b\}/g, "<strong>").replace(/\{nb\}/g, "</strong>"));
                    }
                    this.extractsClass = "sq-long-extracts";
                }
                else if (this.record.relevantExtracts) {
                    this.text = this.record.relevantExtracts;
                    this.extractsClass = "sq-relevant-extracts";
                }
                else {
                    this.text = base.Utils.encodeHTML(this.record.text);
                    this.extractsClass = "sq-text-extracts";
                }
            }
            if (!this.limitLinesDisplayed || !this.collapsed) {
                this.extractsClass += " sq-show-all";
            }
        };
        ResultExtracts.prototype.ngOnChanges = function (changes) {
            this.setup();
        };
        ResultExtracts.prototype.collapseClick = function (event) {
            this.collapsed = !this.collapsed;
            this.setup();
            event.preventDefault();
        };
        return ResultExtracts;
    }());
    ResultExtracts.ɵfac = function ResultExtracts_Factory(t) { return new (t || ResultExtracts)(); };
    ResultExtracts.ɵcmp = i0.ɵɵdefineComponent({ type: ResultExtracts, selectors: [["sq-result-extracts"]], inputs: { record: "record", limitLinesDisplayed: "limitLinesDisplayed", showLinesExpander: "showLinesExpander", showTextAlways: "showTextAlways", showLongExtracts: "showLongExtracts", hideDate: "hideDate", maxLongExtracts: "maxLongExtracts", dateFormat: "dateFormat" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "class", 4, "ngIf"], ["class", "sq-text", "href", "#", 3, "click", 4, "ngIf"], ["class", "extracts-date", 4, "ngIf"], [1, "extracts-text", 3, "innerHTML"], [1, "extracts-date"], [3, "innerHTML", 4, "ngFor", "ngForOf"], [3, "innerHTML"], ["href", "#", 1, "sq-text", 3, "click"], [3, "collapsed"]], template: function ResultExtracts_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, ResultExtracts_ng_container_0_Template, 4, 3, "ng-container", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.text || ctx.longExtracts);
            }
        }, directives: [i1.NgIf, i1.NgForOf, i2.CollapseButton], pipes: [i3.DatePipe], styles: ["p[_ngcontent-%COMP%], ul[_ngcontent-%COMP%] {\n    margin: 0;\n    color: #676767;\n    font-size: 0.9em;\n}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ResultExtracts, [{
                type: i0.Component,
                args: [{
                        selector: "sq-result-extracts",
                        templateUrl: "./result-extracts.html",
                        styles: ["\np, ul {\n    margin: 0;\n    color: #676767;\n    font-size: 0.9em;\n}\n    "]
                    }]
            }], null, { record: [{
                    type: i0.Input
                }], limitLinesDisplayed: [{
                    type: i0.Input
                }], showLinesExpander: [{
                    type: i0.Input
                }], showTextAlways: [{
                    type: i0.Input
                }], showLongExtracts: [{
                    type: i0.Input
                }], hideDate: [{
                    type: i0.Input
                }], maxLongExtracts: [{
                    type: i0.Input
                }], dateFormat: [{
                    type: i0.Input
                }] });
    })();

    /**
     * This component requires a global CSS file to map file extensions (doc, ppt, xls, etc.)
     * to Font Awesome icons via a class `sq-icon-file-{{fileext}}`
     */
    var ResultIcon = /** @class */ (function () {
        function ResultIcon() {
            /**
             * Integer controlling the icon's size
             */
            this.size = 1;
        }
        return ResultIcon;
    }());
    ResultIcon.ɵfac = function ResultIcon_Factory(t) { return new (t || ResultIcon)(); };
    ResultIcon.ɵcmp = i0.ɵɵdefineComponent({ type: ResultIcon, selectors: [["sq-result-icon"]], inputs: { record: "record", size: "size" }, decls: 1, vars: 5, consts: [[3, "title"]], template: function ResultIcon_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelement(0, "span", 0);
            }
            if (rf & 2) {
                i0.ɵɵclassMapInterpolate2("far fa-file sq-icon-file-", ctx.record.fileext, " fa-", ctx.size, "x fa-fw");
                i0.ɵɵpropertyInterpolate("title", ctx.record.fileext);
            }
        }, encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ResultIcon, [{
                type: i0.Component,
                args: [{
                        selector: "sq-result-icon",
                        templateUrl: "./result-icon.html"
                    }]
            }], null, { record: [{
                    type: i0.Input
                }], size: [{
                    type: i0.Input
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

    function ResultMissingTerms_ng_container_0_span_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 4);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var term_r2 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", term_r2, "");
        }
    }
    function ResultMissingTerms_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "span", 1);
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "span", 2);
            i0.ɵɵtemplate(5, ResultMissingTerms_ng_container_0_span_5_Template, 2, 1, "span", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, "msg#results.missingTerms"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx_r0.missingTerms);
        }
    }
    var ResultMissingTerms = /** @class */ (function () {
        function ResultMissingTerms() {
        }
        ResultMissingTerms.prototype.ngOnChanges = function (changes) {
            var e_1, _a;
            if (changes["record"]) {
                this.missingTerms = [];
                if (this.record.termspresence) {
                    try {
                        for (var _b = __values(this.record.termspresence), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var tp = _c.value;
                            if (base.Utils.eqNC(tp.presence, "missing")) {
                                this.missingTerms.push(tp.term);
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
        };
        return ResultMissingTerms;
    }());
    ResultMissingTerms.ɵfac = function ResultMissingTerms_Factory(t) { return new (t || ResultMissingTerms)(); };
    ResultMissingTerms.ɵcmp = i0.ɵɵdefineComponent({ type: ResultMissingTerms, selectors: [["sq-result-missing-terms"]], inputs: { record: "record" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "sq-missing-terms-label", "sq-text"], [1, "sq-missing-terms", "sq-text"], ["class", "sq-missing-term", 4, "ngFor", "ngForOf"], [1, "sq-missing-term"]], template: function ResultMissingTerms_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, ResultMissingTerms_ng_container_0_Template, 6, 4, "ng-container", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.missingTerms.length > 0);
            }
        }, directives: [i1.NgIf, i1.NgForOf], pipes: [i2$1.MessagePipe], styles: ["[_nghost-%COMP%]{color:#707070;display:block;font-size:.9rem}.sq-missing-term[_ngcontent-%COMP%]{-webkit-text-decoration-line:line-through;text-decoration-line:line-through}.sq-missing-term[_ngcontent-%COMP%]:not(:first-child){margin-left:.25em}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ResultMissingTerms, [{
                type: i0.Component,
                args: [{
                        selector: "sq-result-missing-terms",
                        templateUrl: "./result-missing-terms.html",
                        styleUrls: ["./result-missing-terms.css"]
                    }]
            }], null, { record: [{
                    type: i0.Input
                }] });
    })();

    function ResultTitle_span_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span", 2);
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵpropertyInterpolate("title", ctx_r0.record.title);
            i0.ɵɵproperty("innerHTML", ctx_r0.title, i0.ɵɵsanitizeHtml);
        }
    }
    function ResultTitle_a_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r3_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 3);
            i0.ɵɵlistener("click", function ResultTitle_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r3_1); var ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.click(); });
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵpropertyInterpolate("title", ctx_r1.record.title);
            i0.ɵɵpropertyInterpolate("href", ctx_r1.href, i0.ɵɵsanitizeUrl);
            i0.ɵɵpropertyInterpolate("target", ctx_r1.target);
            i0.ɵɵproperty("innerHTML", ctx_r1.title, i0.ɵɵsanitizeHtml);
        }
    }
    var ResultTitle = /** @class */ (function () {
        function ResultTitle(searchService, appService) {
            this.searchService = searchService;
            this.appService = appService;
            /**
             * "open" mode: Display a link which opens the original document (url1) if available, or emits a titleClicked event to perform an action otherwise
             * "action" mode: Display a link which emits a titleClicked event to perform an action
             * "open-if-url" mode: Display a link which opens the original document (url1) if available, or displays a SPAN with the title otherwise
             * "display" mode: Only display a SPAN element (no link)
             */
            this.titleLinkBehavior = "open";
            /** Optional field name containing the title. Otherwise displayTitle or title are used */
            this.field = "";
            /** Event emitter to perform actions at the parent level */
            this.titleClicked = new i0.EventEmitter(); // TODO: Custom options to get title & URL (replace pluginservice)
        }
        ResultTitle.prototype.ngOnChanges = function (changes) {
            if (changes["record"]) {
                this.titleField = this.appService.resolveColumnAlias(this.field);
                this.title = this.getTitle();
                this.documentUrl = this.record.url1;
            }
        };
        Object.defineProperty(ResultTitle.prototype, "hasLinkBehaviour", {
            get: function () {
                return this.titleLinkBehavior === "open" || (this.titleLinkBehavior === "open-if-url" && this.hasUrl);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ResultTitle.prototype, "hasSpanBehaviour", {
            /**
             * A span is shown in "display" mode or "open-if-url" mode when no url is present
             * A link is shown in all other cases (even in "open" mode with no url, which is equivalent to "action" mode)
             */
            get: function () {
                return this.titleLinkBehavior === "display" || (this.titleLinkBehavior === "open-if-url" && !this.hasUrl);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ResultTitle.prototype, "href", {
            get: function () {
                return (this.hasLinkBehaviour && this.documentUrl) || "#";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ResultTitle.prototype, "target", {
            get: function () {
                return (this.hasLinkBehaviour && this.documentUrl) ? this.originalDocTarget || '_blank' : "_self";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ResultTitle.prototype, "hasUrl", {
            get: function () {
                return !!this.documentUrl;
            },
            enumerable: false,
            configurable: true
        });
        ResultTitle.prototype.getTitle = function () {
            var title;
            if (this.titleField) {
                title = base.Utils.escapeHtml(this.record[this.titleField]);
            }
            if (!title) {
                title = this.record.displayTitle || base.Utils.escapeHtml(this.record.title);
            }
            return title;
        };
        ResultTitle.prototype.click = function () {
            var isLink = this.hasLinkBehaviour && !!this.documentUrl; // true if this is a regular link (performs the default action)
            if (isLink)
                this.searchService.notifyOpenOriginalDocument(this.record);
            this.titleClicked.emit(isLink); // Can be use to trigger actions
            return isLink;
        };
        return ResultTitle;
    }());
    ResultTitle.ɵfac = function ResultTitle_Factory(t) { return new (t || ResultTitle)(i0.ɵɵdirectiveInject(i1$1.SearchService), i0.ɵɵdirectiveInject(i1$2.AppService)); };
    ResultTitle.ɵcmp = i0.ɵɵdefineComponent({ type: ResultTitle, selectors: [["sq-result-title"]], inputs: { record: "record", titleLinkBehavior: "titleLinkBehavior", field: "field", originalDocTarget: "originalDocTarget" }, outputs: { titleClicked: "titleClicked" }, features: [i0.ɵɵNgOnChangesFeature], decls: 2, vars: 2, consts: [["class", "sq-result-title", 3, "title", "innerHTML", 4, "ngIf"], ["class", "sq-result-title", 3, "title", "href", "target", "innerHTML", "click", 4, "ngIf"], [1, "sq-result-title", 3, "title", "innerHTML"], [1, "sq-result-title", 3, "title", "href", "target", "innerHTML", "click"]], template: function ResultTitle_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, ResultTitle_span_0_Template, 1, 2, "span", 0);
                i0.ɵɵtemplate(1, ResultTitle_a_1_Template, 1, 4, "a", 1);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.hasSpanBehaviour);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", !ctx.hasSpanBehaviour);
            }
        }, directives: [i1.NgIf], styles: ["\nsq-result-title {\n    font-size: 1.25rem;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n.match-highlight {\n    font-weight: bold;\n    font-style: italic;\n}\n    "], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ResultTitle, [{
                type: i0.Component,
                args: [{
                        selector: "sq-result-title",
                        templateUrl: "./result-title.html",
                        styles: ["\nsq-result-title {\n    font-size: 1.25rem;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n.match-highlight {\n    font-weight: bold;\n    font-style: italic;\n}\n    "],
                        encapsulation: i0.ViewEncapsulation.None // Currently necessary for the match-highlight
                    }]
            }], function () { return [{ type: i1$1.SearchService }, { type: i1$2.AppService }]; }, { record: [{
                    type: i0.Input
                }], titleLinkBehavior: [{
                    type: i0.Input
                }], field: [{
                    type: i0.Input
                }], originalDocTarget: [{
                    type: i0.Input
                }], titleClicked: [{
                    type: i0.Output
                }] });
    })();

    function ResultSource_ng_container_1_span_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1, " \u203A ");
            i0.ɵɵelementEnd();
        }
    }
    function ResultSource_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r7_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, ResultSource_ng_container_1_span_1_Template, 2, 0, "span", 2);
            i0.ɵɵelementStart(2, "span", 4);
            i0.ɵɵlistener("click", function ResultSource_ng_container_1_Template_span_click_2_listener() { i0.ɵɵrestoreView(_r7_1); var s_r3 = ctx.$implicit; var ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.select(s_r3); });
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var s_r3 = ctx.$implicit;
            var i_r4 = ctx.index;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", i_r4 > 0);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(s_r3.display);
        }
    }
    function ResultSource_span_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1, " - ");
            i0.ɵɵelementEnd();
        }
    }
    function ResultSource_a_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "a", 5);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext();
            i0.ɵɵpropertyInterpolate("href", ctx_r2.url, i0.ɵɵsanitizeUrl);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(ctx_r2.url);
        }
    }
    var ResultSource = /** @class */ (function () {
        function ResultSource(searchService) {
            this.searchService = searchService;
            this.displayTreepathMinLevel = 0;
            this.displayUrl = true;
            this.source = [];
        }
        ResultSource.prototype.ngOnInit = function () {
            if (this.displayTreepath && !!this.record.treepath) {
                var treepath = this.record.treepath[0];
                if (!!treepath && treepath.length >= 2) {
                    this.source = treepath.substr(1, treepath.length - 2).split('/')
                        .slice(this.displayTreepathMinLevel, this.displayTreepathMaxLevel)
                        .map(function (path, i, array) {
                        return {
                            display: path,
                            value: '/' + array.slice(0, i + 1).join('/') + '/*'
                        };
                    });
                }
            }
            if (this.displayUrl) {
                this.url = this.record.url1;
            }
        };
        ResultSource.prototype.select = function (item) {
            if (this.searchService.addFieldSelect("treepath", item)) {
                this.searchService.search();
            }
        };
        return ResultSource;
    }());
    ResultSource.ɵfac = function ResultSource_Factory(t) { return new (t || ResultSource)(i0.ɵɵdirectiveInject(i1$1.SearchService)); };
    ResultSource.ɵcmp = i0.ɵɵdefineComponent({ type: ResultSource, selectors: [["sq-result-source"]], inputs: { record: "record", displayTreepath: "displayTreepath", displayTreepathMinLevel: "displayTreepathMinLevel", displayTreepathMaxLevel: "displayTreepathMaxLevel", displayUrl: "displayUrl" }, decls: 4, vars: 3, consts: [[1, "sq-result-source"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["target", "_blank", 3, "href", 4, "ngIf"], ["title", "Select this source", 1, "link", 3, "click"], ["target", "_blank", 3, "href"]], template: function ResultSource_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "span", 0);
                i0.ɵɵtemplate(1, ResultSource_ng_container_1_Template, 4, 2, "ng-container", 1);
                i0.ɵɵtemplate(2, ResultSource_span_2_Template, 2, 0, "span", 2);
                i0.ɵɵtemplate(3, ResultSource_a_3_Template, 2, 2, "a", 3);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", ctx.source);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.source.length > 0 && !!ctx.url);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.url);
            }
        }, directives: [i1.NgForOf, i1.NgIf], styles: [".sq-result-source[_ngcontent-%COMP%]{color:#006621;display:inline-block;font-size:.9rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}.link[_ngcontent-%COMP%]{cursor:pointer}.link[_ngcontent-%COMP%]:hover{text-decoration:underline}a[_ngcontent-%COMP%]{color:inherit}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ResultSource, [{
                type: i0.Component,
                args: [{
                        selector: "sq-result-source",
                        templateUrl: "./result-source.html",
                        styleUrls: ["./result-source.css"]
                    }]
            }], function () { return [{ type: i1$1.SearchService }]; }, { record: [{
                    type: i0.Input
                }], displayTreepath: [{
                    type: i0.Input
                }], displayTreepathMinLevel: [{
                    type: i0.Input
                }], displayTreepathMaxLevel: [{
                    type: i0.Input
                }], displayUrl: [{
                    type: i0.Input
                }] });
    })();

    function ResultThumbnail_a_0_Template(rf, ctx) {
        if (rf & 1) {
            var _r2_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 1);
            i0.ɵɵlistener("click", function ResultThumbnail_a_0_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r2_1); var ctx_r1 = i0.ɵɵnextContext(); return ctx_r1.click(); });
            i0.ɵɵelement(1, "img", 2);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵpropertyInterpolate("href", ctx_r0.href, i0.ɵɵsanitizeUrl);
            i0.ɵɵpropertyInterpolate("target", ctx_r0.target);
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("src", ctx_r0.thumbnailUrl, i0.ɵɵsanitizeUrl);
        }
    }
    var ResultThumbnail = /** @class */ (function () {
        function ResultThumbnail(appService, searchService) {
            this.appService = appService;
            this.searchService = searchService;
            this.linkBehavior = "open";
            this.defaultThumbnail = "";
            this.thumbnailClicked = new i0.EventEmitter();
        }
        ResultThumbnail.prototype.ngOnChanges = function (changes) {
            if (!!changes["record"]) {
                this.documentUrl = this.record.url1;
                if (!!this.thumbnailColumn) {
                    this.thumbnailUrl = this.record[this.thumbnailColumn];
                }
                if (!this.thumbnailUrl && !!this.record.thumbnailUrl) {
                    this.thumbnailUrl = this.record.thumbnailUrl;
                }
                if (!this.thumbnailUrl && !!this.defaultThumbnail) {
                    this.thumbnailUrl = this.defaultThumbnail;
                }
                this.thumbnailUrl = this.appService.updateUrlForCors(this.thumbnailUrl);
            }
        };
        Object.defineProperty(ResultThumbnail.prototype, "hasLinkBehaviour", {
            get: function () {
                return this.linkBehavior === "open";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ResultThumbnail.prototype, "href", {
            get: function () {
                return (this.hasLinkBehaviour && this.documentUrl) || "#";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ResultThumbnail.prototype, "target", {
            get: function () {
                return (this.hasLinkBehaviour && this.documentUrl) ? "_blank" : "_self";
            },
            enumerable: false,
            configurable: true
        });
        ResultThumbnail.prototype.click = function () {
            var isLink = this.hasLinkBehaviour && !!this.documentUrl; // true if this is a regular link (performs the default action)
            if (isLink)
                this.searchService.notifyOpenOriginalDocument(this.record);
            this.thumbnailClicked.emit(isLink); // Can be use to trigger actions
            return isLink;
        };
        return ResultThumbnail;
    }());
    ResultThumbnail.ɵfac = function ResultThumbnail_Factory(t) { return new (t || ResultThumbnail)(i0.ɵɵdirectiveInject(i1$2.AppService), i0.ɵɵdirectiveInject(i1$1.SearchService)); };
    ResultThumbnail.ɵcmp = i0.ɵɵdefineComponent({ type: ResultThumbnail, selectors: [["sq-result-thumbnail"]], inputs: { record: "record", linkBehavior: "linkBehavior", thumbnailColumn: "thumbnailColumn", defaultThumbnail: "defaultThumbnail" }, outputs: { thumbnailClicked: "thumbnailClicked" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "href", "target", "click", 4, "ngIf"], [3, "href", "target", "click"], [3, "src"]], template: function ResultThumbnail_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, ResultThumbnail_a_0_Template, 2, 3, "a", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.thumbnailUrl);
            }
        }, directives: [i1.NgIf], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ResultThumbnail, [{
                type: i0.Component,
                args: [{
                        selector: "sq-result-thumbnail",
                        templateUrl: "./result-thumbnail.html"
                    }]
            }], function () { return [{ type: i1$2.AppService }, { type: i1$1.SearchService }]; }, { record: [{
                    type: i0.Input
                }], linkBehavior: [{
                    type: i0.Input
                }], thumbnailColumn: [{
                    type: i0.Input
                }], defaultThumbnail: [{
                    type: i0.Input
                }], thumbnailClicked: [{
                    type: i0.Output
                }] });
    })();

    function UserRating_li_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "li", 4);
            i0.ɵɵelementStart(1, "span");
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, ctx_r0.caption));
        }
    }
    function UserRating_li_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r6_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "li", 5);
            i0.ɵɵelementStart(1, "a", 6);
            i0.ɵɵlistener("click", function UserRating_li_2_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r6_1); var i_r4 = ctx.index; var ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.select(i_r4); });
            i0.ɵɵelement(2, "span");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var i_r4 = ctx.index;
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("title", ctx_r1.getTitle(i_r4));
            i0.ɵɵadvance(1);
            i0.ɵɵclassMap(i_r4 <= ctx_r1.userRatingIndex ? "fas fa-star" : "far fa-star");
        }
    }
    function UserRating_li_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "li", 7);
            i0.ɵɵelementStart(1, "span");
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 1, "msg#userRatings.average", ctx_r2.messageParams));
        }
    }
    var UserRating = /** @class */ (function () {
        function UserRating(userRatingService, changeDetector) {
            var _this = this;
            this.userRatingService = userRatingService;
            this.changeDetector = changeDetector;
            this.handleResponse = function (response) {
                _this.userRatingIndex = response.rating;
                _this.averageRatingIndex = response.averagerating;
                _this.changeDetector.markForCheck();
            };
        }
        UserRating.prototype.ngOnInit = function () {
            this.ensureRatingValues();
            this.handleResponse(this.userRatingService.getRecordRating(this.record, this.getCCRating()));
        };
        UserRating.prototype.getCCRating = function () {
            return {
                ratingsColumn: this.ratingsColumn,
                averageColumn: this.averageColumn,
                updateDocWeight: this.updateDocWeight,
                ratingsDistribution: this.ratingValues
            };
        };
        Object.defineProperty(UserRating.prototype, "messageParams", {
            get: function () {
                return {
                    values: {
                        average: this.getAverageRating()
                    }
                };
            },
            enumerable: false,
            configurable: true
        });
        UserRating.prototype.getTitle = function (ratingIndex) {
            if (this.titles) {
                return this.titles.split(";")[ratingIndex] || "";
            }
            else {
                return "";
            }
        };
        UserRating.prototype.getRating = function (ratingIndex) {
            return this.ratingValues[ratingIndex];
        };
        UserRating.prototype.getAverageRating = function () {
            if (this.averageRatingIndex < 0) {
                return "";
            }
            else {
                return this.ratingValues[this.averageRatingIndex];
            }
        };
        UserRating.prototype.select = function (selectedRatingIndex) {
            //If selected rating was already selected, remove the rating
            if (this.userRatingIndex === selectedRatingIndex) {
                this.userRatingService.deleteRating(this.record, this.getCCRating()).subscribe(this.handleResponse);
            }
            else {
                this.userRatingService.setRating(this.record, selectedRatingIndex, this.getCCRating()).subscribe(this.handleResponse);
            }
        };
        UserRating.prototype.ensureRatingValues = function () {
            if (!this.ratingValues) {
                var count = this.count || 0;
                //Work out rating value range
                if (this.values) {
                    //Use predefined values
                    this.ratingValues = this.values.split(";");
                    //Initialize missing values - so that ratingValues.length matches config.count
                    for (var i = this.ratingValues.length; i < count; i++) {
                        this.ratingValues.push((i + 1).toString());
                    }
                }
                else {
                    //Generates [1, ... config.count]
                    this.ratingValues = Array(count).fill(0).map(function (_, i) { return (i + 1).toString(); });
                }
            }
        };
        return UserRating;
    }());
    UserRating.ɵfac = function UserRating_Factory(t) { return new (t || UserRating)(i0.ɵɵdirectiveInject(i3$1.UserRatingsWebService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    UserRating.ɵcmp = i0.ɵɵdefineComponent({ type: UserRating, selectors: [["sq-user-rating"]], inputs: { record: "record", ratingsColumn: "ratingsColumn", averageColumn: "averageColumn", updateDocWeight: "updateDocWeight", count: "count", values: "values", titles: "titles", caption: "caption", showAverage: "showAverage" }, decls: 4, vars: 3, consts: [[1, "sq-user-rating-stars"], ["class", "sq-user-rating-caption", 4, "ngIf"], ["class", "sq-user-rating-item", 4, "ngFor", "ngForOf"], ["class", "sq-user-rating-average", 4, "ngIf"], [1, "sq-user-rating-caption"], [1, "sq-user-rating-item"], ["href", "javascript:void(0)", 1, "sq-user-rating-star", 3, "title", "click"], [1, "sq-user-rating-average"]], template: function UserRating_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "ul", 0);
                i0.ɵɵtemplate(1, UserRating_li_1_Template, 4, 3, "li", 1);
                i0.ɵɵtemplate(2, UserRating_li_2_Template, 3, 4, "li", 2);
                i0.ɵɵtemplate(3, UserRating_li_3_Template, 4, 4, "li", 3);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.caption);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", ctx.ratingValues);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.showAverage && ctx.getAverageRating() !== undefined && ctx.getAverageRating() !== "");
            }
        }, directives: [i1.NgIf, i1.NgForOf], pipes: [i2$1.MessagePipe], styles: [".sq-user-rating-stars[_ngcontent-%COMP%]{list-style-type:none;padding:0}.sq-user-rating-item[_ngcontent-%COMP%]{display:inline}.sq-user-rating-star[_ngcontent-%COMP%]{text-decoration:none}.sq-user-rating-caption[_ngcontent-%COMP%]{display:inline;font-size:.875rem;margin-right:4px}.sq-user-rating-average[_ngcontent-%COMP%]{display:inline;font-size:.875rem;margin-left:4px}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(UserRating, [{
                type: i0.Component,
                args: [{
                        selector: "sq-user-rating",
                        templateUrl: "./user-rating.html",
                        styleUrls: ["./user-rating.css"]
                    }]
            }], function () { return [{ type: i3$1.UserRatingsWebService }, { type: i0.ChangeDetectorRef }]; }, { record: [{
                    type: i0.Input
                }], ratingsColumn: [{
                    type: i0.Input
                }], averageColumn: [{
                    type: i0.Input
                }], updateDocWeight: [{
                    type: i0.Input
                }], count: [{
                    type: i0.Input
                }], values: [{
                    type: i0.Input
                }], titles: [{
                    type: i0.Input
                }], caption: [{
                    type: i0.Input
                }], showAverage: [{
                    type: i0.Input
                }] });
    })();

    function SponsoredResults_ul_0_li_1_div_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r7_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 9);
            i0.ɵɵelementStart(1, "a", 10);
            i0.ɵɵlistener("click", function SponsoredResults_ul_0_li_1_div_2_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r7_1); var link_r2 = i0.ɵɵnextContext().$implicit; var ctx_r5 = i0.ɵɵnextContext(2); return ctx_r5.click(link_r2); });
            i0.ɵɵelement(2, "img", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var link_r2 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("href", link_r2.url, i0.ɵɵsanitizeUrl);
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("src", link_r2.thumbnail, i0.ɵɵsanitizeUrl);
        }
    }
    function SponsoredResults_ul_0_li_1_div_8_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 12);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var link_r2 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, link_r2.summary));
        }
    }
    function SponsoredResults_ul_0_li_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r11_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "li", 3);
            i0.ɵɵelementStart(1, "div", 4);
            i0.ɵɵtemplate(2, SponsoredResults_ul_0_li_1_div_2_Template, 3, 2, "div", 5);
            i0.ɵɵelementStart(3, "div", 6);
            i0.ɵɵelementStart(4, "a", 7);
            i0.ɵɵlistener("click", function SponsoredResults_ul_0_li_1_Template_a_click_4_listener() { i0.ɵɵrestoreView(_r11_1); var link_r2 = ctx.$implicit; var ctx_r10 = i0.ɵɵnextContext(2); return ctx_r10.click(link_r2); });
            i0.ɵɵpipe(5, "sqMessage");
            i0.ɵɵtext(6);
            i0.ɵɵpipe(7, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(8, SponsoredResults_ul_0_li_1_div_8_Template, 3, 3, "div", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var link_r2 = ctx.$implicit;
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", link_r2.thumbnail);
            i0.ɵɵadvance(2);
            i0.ɵɵpropertyInterpolate("href", link_r2.url, i0.ɵɵsanitizeUrl);
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(5, 5, link_r2.title));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 7, link_r2.title));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", link_r2.summary);
        }
    }
    function SponsoredResults_ul_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "ul", 1);
            i0.ɵɵtemplate(1, SponsoredResults_ul_0_li_1_Template, 9, 9, "li", 2);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r0.sponsoredlinks);
        }
    }
    /**
     * Represent the component that display the sponsored results on result page.
     * NOTE: this class and (its containing file) could have been named SponsoredLinks but this naming causes
     * the file to be flagged as ads by Adblock.
     */
    var SponsoredResults = /** @class */ (function () {
        function SponsoredResults(appService, searchService, sponsoredResultsService, auditService, changeDetectorRef) {
            this.appService = appService;
            this.searchService = searchService;
            this.sponsoredResultsService = sponsoredResultsService;
            this.auditService = auditService;
            this.changeDetectorRef = changeDetectorRef;
        }
        /**
         * Considers the text of the new query and sees if the list of the sponsored lists needs to be updated.
         *
         * @param text The text of the new query.
         * @memberof SponsoredLinks
         */
        SponsoredResults.prototype.updateSponsoredLinksIfNecessary = function (text) {
            var _this = this;
            if (!this.appService.app) {
                return; // logout
            }
            var redoQuery = false;
            var currentWS = this.getWebService();
            if (!base.Utils.eqNC(this.webService, currentWS)) {
                this.webService = currentWS;
                redoQuery = true;
            }
            if (!redoQuery && !base.Utils.eqNC(this.lastText, text)) {
                this.lastText = text;
                redoQuery = true;
            }
            if (!redoQuery && this.currentPage !== this.searchService.query.page) {
                this.currentPage = this.searchService.query.page;
                redoQuery = true;
            }
            if (redoQuery) {
                if (!base.Utils.isEmpty(this.webService) && !base.Utils.isEmpty(text)) {
                    this.linksQuery.text = text;
                    this.linksQuery.page = this.currentPage;
                    base.Utils.subscribe(this.sponsoredResultsService.getLinks(this.linksQuery, this.webService), function (results) {
                        _this.sponsoredlinks = results.links;
                        _this.auditLinksDisplay();
                        _this.changeDetectorRef.markForCheck();
                    }, function (error) { return console.log("Could not retrieve sponsored links: " + error + "."); });
                }
                else {
                    this.sponsoredlinks = [];
                }
            }
        };
        /**
         * Retrieves the web service for sponsored links.
         * If it is defined both in the component configuration and the app configuration,
         * this method returns the one in the component configuration.
         *
         * @returns the web service for sponsored links.
         */
        SponsoredResults.prototype.getWebService = function () {
            return (this.appService.app && this.appService.app.sponsoredLinks) || "";
        };
        SponsoredResults.prototype.ngOnChanges = function (changes) {
            if (!this.initDone) {
                this.initialize();
            }
            if (changes['query'] || changes['results']) {
                this.updateSponsoredLinksIfNecessary(base.Utils.trim(this.query.text || ""));
            }
        };
        SponsoredResults.prototype.initialize = function () {
            if (this.initDone) {
                return;
            }
            if (this.appService.ccquery) {
                this.linksQuery = new i1$2.Query(this.appService.ccquery.name);
            }
            else {
                return;
            }
            this.initDone = true;
        };
        SponsoredResults.prototype.ngOnInit = function () {
            this.initialize();
        };
        SponsoredResults.prototype.auditLinksDisplay = function () {
            var _this = this;
            if (!!this.sponsoredlinks && this.sponsoredlinks.length > 0) {
                var auditEvents_1 = [];
                this.sponsoredlinks.forEach(function (link) {
                    auditEvents_1.push({
                        type: "Link_Display" /* Link_Display */,
                        detail: {
                            resultid: _this.searchService.results && _this.searchService.results.id,
                            linkid: link.id,
                            rank: link.rank,
                            title: link.title,
                            url: link.url
                        }
                    });
                });
                this.auditService.notify(auditEvents_1);
            }
        };
        SponsoredResults.prototype.click = function (link) {
            this.auditService.notifySponsoredLink("Link_Click" /* Link_Click */, link, this.searchService.results && this.searchService.results.id || "");
        };
        return SponsoredResults;
    }());
    SponsoredResults.ɵfac = function SponsoredResults_Factory(t) { return new (t || SponsoredResults)(i0.ɵɵdirectiveInject(i1$2.AppService), i0.ɵɵdirectiveInject(i1$1.SearchService), i0.ɵɵdirectiveInject(i3$1.SponsoredLinksWebService), i0.ɵɵdirectiveInject(i3$1.AuditWebService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    SponsoredResults.ɵcmp = i0.ɵɵdefineComponent({ type: SponsoredResults, selectors: [["sq-sponsored-results"]], inputs: { query: "query" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "sq-sponsored-links-list", 4, "ngIf"], [1, "sq-sponsored-links-list"], ["class", "sponsored-item", 4, "ngFor", "ngForOf"], [1, "sponsored-item"], [1, "sq-sponsored-link-view"], ["class", "sq-sponsored-link-view-thumbnail", 4, "ngIf"], [1, "sq-sponsored-link-view-info"], ["target", "_blank", 3, "href", "title", "click"], ["class", "sq-sponsored-link-view-summary", 4, "ngIf"], [1, "sq-sponsored-link-view-thumbnail"], ["target", "_blank", 3, "href", "click"], [3, "src"], [1, "sq-sponsored-link-view-summary"]], template: function SponsoredResults_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, SponsoredResults_ul_0_Template, 2, 1, "ul", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !!ctx.sponsoredlinks);
            }
        }, directives: [i1.NgIf, i1.NgForOf], pipes: [i2$1.MessagePipe], styles: [".sq-sponsored-links-list[_ngcontent-%COMP%]{list-style:none;padding:0}.sq-sponsored-links-list[_ngcontent-%COMP%] > .sponsored-item[_ngcontent-%COMP%]{overflow:hidden;overflow-wrap:break-word;text-overflow:ellipsis;word-break:break-word;word-wrap:break-word}.sq-sponsored-link-view[_ngcontent-%COMP%]{align-items:center;display:flex}.sq-sponsored-link-view[_ngcontent-%COMP%]   .sq-sponsored-link-view-info[_ngcontent-%COMP%]{flex:1;min-width:0}.sq-sponsored-link-view[_ngcontent-%COMP%]   .sq-sponsored-link-view-info[_ngcontent-%COMP%]   .sq-sponsored-link-view-summary[_ngcontent-%COMP%], .sq-sponsored-link-view[_ngcontent-%COMP%]   .sq-sponsored-link-view-info[_ngcontent-%COMP%]   .sq-sponsored-link-view-title[_ngcontent-%COMP%]{min-width:0}.sq-sponsored-link-view[_ngcontent-%COMP%]   .sq-sponsored-link-view-thumbnail[_ngcontent-%COMP%]{margin-right:1em}.sq-sponsored-link-view[_ngcontent-%COMP%]   .sq-sponsored-link-view-thumbnail[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:7rem;max-width:5rem}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SponsoredResults, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-sponsored-results',
                        templateUrl: './sponsored-results.html',
                        styleUrls: ["./sponsored-results.scss"]
                    }]
            }], function () { return [{ type: i1$2.AppService }, { type: i1$1.SearchService }, { type: i3$1.SponsoredLinksWebService }, { type: i3$1.AuditWebService }, { type: i0.ChangeDetectorRef }]; }, { query: [{
                    type: i0.Input
                }] });
    })();

    var _c0 = function (a0) { return { count: a0 }; };
    var _c1 = function (a0) { return { values: a0 }; };
    var ResultsCounter = /** @class */ (function () {
        function ResultsCounter() {
        }
        return ResultsCounter;
    }());
    ResultsCounter.ɵfac = function ResultsCounter_Factory(t) { return new (t || ResultsCounter)(); };
    ResultsCounter.ɵcmp = i0.ɵɵdefineComponent({ type: ResultsCounter, selectors: [["sq-results-counter"]], inputs: { rowCount: "rowCount" }, decls: 3, vars: 8, consts: [[1, "sq-results-count"]], template: function ResultsCounter_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtext(1);
                i0.ɵɵpipe(2, "sqMessage");
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "msg#results.resultsCount", i0.ɵɵpureFunction1(6, _c1, i0.ɵɵpureFunction1(4, _c0, ctx.rowCount))));
            }
        }, pipes: [i2$1.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ResultsCounter, [{
                type: i0.Component,
                args: [{
                        selector: "sq-results-counter",
                        templateUrl: "./results-counter.html"
                    }]
            }], null, { rowCount: [{
                    type: i0.Input
                }] });
    })();

    var ResultModule = /** @class */ (function () {
        function ResultModule() {
        }
        return ResultModule;
    }());
    ResultModule.ɵmod = i0.ɵɵdefineNgModule({ type: ResultModule });
    ResultModule.ɵinj = i0.ɵɵdefineInjector({ factory: function ResultModule_Factory(t) { return new (t || ResultModule)(); }, imports: [[
                i1.CommonModule,
                forms.FormsModule, forms.ReactiveFormsModule,
                i2$1.IntlModule,
                i3.UtilsModule,
                i2.CollapseModule,
                metadata.MetadataModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ResultModule, { declarations: [ResultTitle, ResultExtracts,
                ResultMissingTerms,
                ResultThumbnail, UserRating,
                SponsoredResults, ResultsCounter,
                ResultIcon, ResultSource], imports: [i1.CommonModule,
                forms.FormsModule, forms.ReactiveFormsModule,
                i2$1.IntlModule,
                i3.UtilsModule,
                i2.CollapseModule,
                metadata.MetadataModule], exports: [ResultTitle, ResultExtracts,
                ResultMissingTerms,
                ResultThumbnail, UserRating,
                SponsoredResults, ResultsCounter,
                ResultIcon, ResultSource] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ResultModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i1.CommonModule,
                            forms.FormsModule, forms.ReactiveFormsModule,
                            i2$1.IntlModule,
                            i3.UtilsModule,
                            i2.CollapseModule,
                            metadata.MetadataModule
                        ],
                        declarations: [
                            ResultTitle, ResultExtracts,
                            ResultMissingTerms,
                            ResultThumbnail, UserRating,
                            SponsoredResults, ResultsCounter,
                            ResultIcon, ResultSource
                        ],
                        exports: [
                            ResultTitle, ResultExtracts,
                            ResultMissingTerms,
                            ResultThumbnail, UserRating,
                            SponsoredResults, ResultsCounter,
                            ResultIcon, ResultSource
                        ]
                    }]
            }], null, null);
    })();

    var _enResult = {
        results: {
            missingTerms: "Missing terms:",
            resultsCount: "{count, plural, =0 {no results} one {# result} other {# results}}",
        },
        userRatings: {
            average: "Average: {average}"
        },
    };

    var _frResult = {
        results: {
            missingTerms: "Termes manquants :",
            resultsCount: "{count, plural, =0 {aucune réponse} one {# réponse} other {# réponses}}",
        },
        userRatings: {
            average: "Moyenne : {average}"
        },
    };

    var _deResult = {
        "results": {
            "missingTerms": "fehlende Begriffe:",
            "resultsCount": "{count, plural, =0 {keine Ergebnisse} one {# Ergebnis} other {# Ergebnisse}}"
        },
        "userRatings": {
            "average": "Durchschnittlich: {average}"
        },
    };

    var enResult = base.Utils.merge({}, _enResult, i1$1.enSearch, metadata.enMetadata, i2.enCollapse);
    var frResult = base.Utils.merge({}, _frResult, i1$1.frSearch, metadata.frMetadata, i2.frCollapse);
    var deResult = base.Utils.merge({}, _deResult, i1$1.deSearch, metadata.deMetadata, i2.deCollapse);

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ResultExtracts = ResultExtracts;
    exports.ResultIcon = ResultIcon;
    exports.ResultMissingTerms = ResultMissingTerms;
    exports.ResultModule = ResultModule;
    exports.ResultSource = ResultSource;
    exports.ResultThumbnail = ResultThumbnail;
    exports.ResultTitle = ResultTitle;
    exports.ResultsCounter = ResultsCounter;
    exports.SponsoredResults = SponsoredResults;
    exports.UserRating = UserRating;
    exports.deResult = deResult;
    exports.enResult = enResult;
    exports.frResult = frResult;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-result.umd.js.map
