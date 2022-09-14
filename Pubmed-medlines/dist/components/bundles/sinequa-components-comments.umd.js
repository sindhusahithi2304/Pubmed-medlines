(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@sinequa/components/collapse'), require('@sinequa/components/utils'), require('@sinequa/core/intl'), require('@sinequa/core/login'), require('@sinequa/core/web-services'), require('@angular/forms'), require('@sinequa/core/modal'), require('rxjs'), require('rxjs/operators'), require('marked')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/comments', ['exports', '@angular/common', '@angular/core', '@sinequa/components/collapse', '@sinequa/components/utils', '@sinequa/core/intl', '@sinequa/core/login', '@sinequa/core/web-services', '@angular/forms', '@sinequa/core/modal', 'rxjs', 'rxjs/operators', 'marked'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components.comments = {}), global.ng.common, global.ng.core, global.sinequa.components.collapse, global.sinequa.components.utils, global.sinequa.core.intl, global.sinequa.core.login, global.sinequa.core['web-services'], global.ng.forms, global.sinequa.core.modal, global.rxjs, global.rxjs.operators, global.marked));
}(this, (function (exports, i4, i0, i5, i8, i1$1, login, i1, forms, i2, rxjs, operators, marked) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) { return e; } else {
            var n = Object.create(null);
            if (e) {
                Object.keys(e).forEach(function (k) {
                    if (k !== 'default') {
                        var d = Object.getOwnPropertyDescriptor(e, k);
                        Object.defineProperty(n, k, d.get ? d : {
                            enumerable: true,
                            get: function () {
                                return e[k];
                            }
                        });
                    }
                });
            }
            n['default'] = e;
            return Object.freeze(n);
        }
    }

    var marked__namespace = /*#__PURE__*/_interopNamespace(marked);

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

    var CommentsWebService = /** @class */ (function (_super) {
        __extends(CommentsWebService, _super);
        function CommentsWebService(startConfig, httpClient) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            _this.endpoint = 'plugin/CommentsWebService';
            return _this;
        }
        /**
         * Return the list of comments for a given document
         * @param docid
         * @returns
         */
        CommentsWebService.prototype.getComments = function (docid) {
            return this.httpClient.post(this.makeUrl(this.endpoint), { docid: docid, action: 'read' }).pipe(operators.pluck('comments'));
        };
        /**
         * Return the number of comments for a given document
         * @param docid
         * @returns
         */
        CommentsWebService.prototype.getCommentCount = function (docid) {
            return this.httpClient.post(this.makeUrl(this.endpoint), { docid: docid, action: 'count' }).pipe(operators.pluck('count'));
        };
        /**
         * Return the number of comments for a list of documents
         * @param docids
         * @returns
         */
        CommentsWebService.prototype.getCommentCounts = function (docids) {
            if (docids.length === 0) {
                return rxjs.of({});
            }
            return this.httpClient.post(this.makeUrl(this.endpoint), { docid: docids[0], docids: docids, action: 'count' }).pipe(operators.pluck('counts'));
        };
        /**
         * Create a comment with given message for a given document
         * @param docid
         * @param message
         * @param replyto
         * @returns
         */
        CommentsWebService.prototype.createComment = function (docid, message, replyto) {
            return this.httpClient.post(this.makeUrl(this.endpoint), { docid: docid, message: message, replyto: replyto, action: 'create' }).pipe(operators.pluck('comment'));
        };
        /**
         * Modify the content of a comment
         * @param docid
         * @param commentid
         * @param message
         * @returns
         */
        CommentsWebService.prototype.updateComment = function (docid, commentid, message) {
            return this.httpClient.post(this.makeUrl(this.endpoint), { docid: docid, commentid: commentid, message: message, action: 'update' }).pipe(operators.pluck('comment'));
        };
        /**
         * Delete a specific comment
         * @param docid
         * @param commentid
         * @param markAsDeleted
         * @returns
         */
        CommentsWebService.prototype.deleteComment = function (docid, commentid, markAsDeleted) {
            return this.httpClient.post(this.makeUrl(this.endpoint), { docid: docid, commentid: commentid, markAsDeleted: markAsDeleted, action: 'delete' });
        };
        /**
         * Add a like to a comment
         * @param docid
         * @param commentid
         * @returns
         */
        CommentsWebService.prototype.likeComment = function (docid, commentid) {
            return this.httpClient.post(this.makeUrl(this.endpoint), { docid: docid, commentid: commentid, action: 'like' }).pipe(operators.pluck('comment'));
        };
        return CommentsWebService;
    }(i1.HttpService));
    CommentsWebService.ɵfac = function CommentsWebService_Factory(t) { return new (t || CommentsWebService)(i0.ɵɵinject(i1.START_CONFIG), i0.ɵɵinject(i1.SqHttpClient)); };
    CommentsWebService.ɵprov = i0.ɵɵdefineInjectable({ token: CommentsWebService, factory: CommentsWebService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(CommentsWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1.START_CONFIG]
                        }] }, { type: i1.SqHttpClient }];
        }, null);
    })();

    var CreationDatePipe = /** @class */ (function () {
        function CreationDatePipe(intlService) {
            this.intlService = intlService;
        }
        CreationDatePipe.prototype.transform = function (comment) {
            var creation = this.intlService.formatDate(comment.creation) + " " + this.intlService.formatTime(comment.creation);
            var msg = this.intlService.formatMessage("msg#comments.created", { date: creation });
            if (comment.modified !== comment.creation) {
                var modified = this.intlService.formatDate(comment.modified) + " " + this.intlService.formatTime(comment.modified);
                msg += " - " + this.intlService.formatMessage("msg#comments.modified", { date: modified });
            }
            return msg;
        };
        return CreationDatePipe;
    }());
    CreationDatePipe.ɵfac = function CreationDatePipe_Factory(t) { return new (t || CreationDatePipe)(i0.ɵɵdirectiveInject(i1$1.IntlService)); };
    CreationDatePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqCreationDate", type: CreationDatePipe, pure: true });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(CreationDatePipe, [{
                type: i0.Pipe,
                args: [{
                        name: "sqCreationDate"
                    }]
            }], function () { return [{ type: i1$1.IntlService }]; }, null);
    })();

    var MarkdownPipe = /** @class */ (function () {
        function MarkdownPipe() {
        }
        MarkdownPipe.prototype.transform = function (value) {
            if (value && value.length > 0) {
                return marked__namespace(value);
            }
            return value;
        };
        return MarkdownPipe;
    }());
    MarkdownPipe.ɵfac = function MarkdownPipe_Factory(t) { return new (t || MarkdownPipe)(); };
    MarkdownPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqMarkdown", type: MarkdownPipe, pure: true });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(MarkdownPipe, [{
                type: i0.Pipe,
                args: [{
                        name: "sqMarkdown"
                    }]
            }], null, null);
    })();

    function CommentsComponent_div_0_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0);
        }
    }
    function CommentsComponent_div_0_div_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 8);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#comments.noComment"), " ");
        }
    }
    var _c0 = function (a0) { return { $implicit: a0 }; };
    function CommentsComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
            var _r7_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 3);
            i0.ɵɵtemplate(1, CommentsComponent_div_0_ng_container_1_Template, 1, 0, "ng-container", 4);
            i0.ɵɵtemplate(2, CommentsComponent_div_0_div_2_Template, 3, 3, "div", 5);
            i0.ɵɵelementStart(3, "div");
            i0.ɵɵelementStart(4, "button", 6);
            i0.ɵɵlistener("click", function CommentsComponent_div_0_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r7_1); var ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.addComment(); });
            i0.ɵɵelement(5, "i", 7);
            i0.ɵɵtext(6);
            i0.ɵɵpipe(7, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            var _r2 = i0.ɵɵreference(3);
            i0.ɵɵproperty("ngClass", ctx_r0.theme);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngTemplateOutlet", _r2)("ngTemplateOutletContext", i0.ɵɵpureFunction1(7, _c0, ctx_r0.comments));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.comments.length === 0);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(7, 5, "msg#comments.write"), " ");
        }
    }
    function CommentsComponent_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelementStart(1, "div", 9);
            i0.ɵɵelementStart(2, "span", 10);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, "msg#preview.loading"));
        }
    }
    function CommentsComponent_ng_template_2_ng_container_0_span_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 20);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var comment_r10 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(comment_r10.username);
        }
    }
    function CommentsComponent_ng_template_2_ng_container_0_span_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 20);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "msg#comments.deleted"));
        }
    }
    function CommentsComponent_ng_template_2_ng_container_0_ng_container_10_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtext(1, "*");
            i0.ɵɵelementContainerEnd();
        }
    }
    function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "div", 25);
            i0.ɵɵpipe(1, "sqMarkdown");
        }
        if (rf & 2) {
            var comment_r10 = i0.ɵɵnextContext(2).$implicit;
            i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, comment_r10.message), i0.ɵɵsanitizeHtml);
        }
    }
    function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 26);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "msg#comments.deleted"));
        }
    }
    function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_span_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var comment_r10 = i0.ɵɵnextContext(3).$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1("\u00A0", comment_r10.likes, "");
        }
    }
    function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_span_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1("\u00A0", i0.ɵɵpipeBind1(2, 1, "msg#comments.like"), "");
        }
    }
    function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_button_10_Template(rf, ctx) {
        if (rf & 1) {
            var _r28_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "button", 30);
            i0.ɵɵlistener("click", function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_button_10_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r28_1); var comment_r10 = i0.ɵɵnextContext(3).$implicit; var ctx_r26 = i0.ɵɵnextContext(2); return ctx_r26.editComment(comment_r10); });
            i0.ɵɵelement(1, "i", 33);
            i0.ɵɵelementStart(2, "span");
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("\u00A0", i0.ɵɵpipeBind1(4, 1, "msg#comments.edit"), "");
        }
    }
    function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_button_11_Template(rf, ctx) {
        if (rf & 1) {
            var _r31_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "button", 30);
            i0.ɵɵlistener("click", function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_button_11_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r31_1); var comment_r10 = i0.ɵɵnextContext(3).$implicit; var ctx_r29 = i0.ɵɵnextContext(2); return ctx_r29.deleteComment(comment_r10); });
            i0.ɵɵelement(1, "i", 34);
            i0.ɵɵelementStart(2, "span");
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("\u00A0", i0.ɵɵpipeBind1(4, 1, "msg#comments.delete"), "");
        }
    }
    var _c1 = function (a0, a1) { return { "btn-success": a0, "btn-outline-secondary": a1 }; };
    function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_Template(rf, ctx) {
        if (rf & 1) {
            var _r35_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 27);
            i0.ɵɵlistener("click", function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_Template_div_click_0_listener($event) { return $event.stopPropagation(); });
            i0.ɵɵelementStart(1, "button", 28);
            i0.ɵɵlistener("click", function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r35_1); var comment_r10 = i0.ɵɵnextContext(2).$implicit; var ctx_r33 = i0.ɵɵnextContext(2); return ctx_r33.likeComment(comment_r10); });
            i0.ɵɵelement(2, "i", 29);
            i0.ɵɵtemplate(3, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_span_3_Template, 2, 1, "span", 1);
            i0.ɵɵtemplate(4, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_span_4_Template, 3, 3, "span", 1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "button", 30);
            i0.ɵɵlistener("click", function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r35_1); var comment_r10 = i0.ɵɵnextContext(2).$implicit; var ctx_r36 = i0.ɵɵnextContext(2); return ctx_r36.addComment(comment_r10); });
            i0.ɵɵelement(6, "i", 31);
            i0.ɵɵelementStart(7, "span");
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(10, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_button_10_Template, 5, 3, "button", 32);
            i0.ɵɵtemplate(11, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_button_11_Template, 5, 3, "button", 32);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var comment_r10 = i0.ɵɵnextContext(2).$implicit;
            var ctx_r19 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(8, _c1, comment_r10.likedByUser, !comment_r10.likedByUser));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", comment_r10.likes > 0);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", comment_r10.likes === 0);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("\u00A0", i0.ɵɵpipeBind1(9, 6, "msg#comments.reply"), "");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", (ctx_r19.user == null ? null : ctx_r19.user.userId) === comment_r10.userid || (ctx_r19.user == null ? null : ctx_r19.user.isAdministrator));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx_r19.user == null ? null : ctx_r19.user.userId) === comment_r10.userid || (ctx_r19.user == null ? null : ctx_r19.user.isAdministrator));
        }
    }
    function CommentsComponent_ng_template_2_ng_container_0_ng_template_13_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtemplate(0, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_0_Template, 2, 3, "div", 21);
            i0.ɵɵtemplate(1, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_1_Template, 3, 3, "div", 22);
            i0.ɵɵelementStart(2, "div", 23);
            i0.ɵɵtemplate(3, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_div_3_Template, 12, 11, "div", 24);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var comment_r10 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵproperty("ngIf", !comment_r10.deleted);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", comment_r10.deleted);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !comment_r10.deleted);
        }
    }
    function CommentsComponent_ng_template_2_ng_container_0_div_14_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0);
        }
    }
    function CommentsComponent_ng_template_2_ng_container_0_div_14_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 35);
            i0.ɵɵtemplate(1, CommentsComponent_ng_template_2_ng_container_0_div_14_ng_container_1_Template, 1, 0, "ng-container", 4);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var comment_r10 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵnextContext(2);
            var _r2 = i0.ɵɵreference(3);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngTemplateOutlet", _r2)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c0, comment_r10.subcomments));
        }
    }
    var _c2 = function (a0) { return { "text-muted": a0 }; };
    function CommentsComponent_ng_template_2_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "div", 12);
            i0.ɵɵelementStart(2, "div", 13);
            i0.ɵɵlistener("click", function CommentsComponent_ng_template_2_ng_container_0_Template_div_click_2_listener() { var comment_r10 = ctx.$implicit; return comment_r10.$collapsed = !comment_r10.$collapsed; });
            i0.ɵɵelement(3, "i", 14);
            i0.ɵɵtemplate(4, CommentsComponent_ng_template_2_ng_container_0_span_4_Template, 2, 1, "span", 15);
            i0.ɵɵtemplate(5, CommentsComponent_ng_template_2_ng_container_0_span_5_Template, 3, 3, "span", 15);
            i0.ɵɵelementStart(6, "span", 16);
            i0.ɵɵpipe(7, "sqCreationDate");
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "sqRelativeTime");
            i0.ɵɵtemplate(10, CommentsComponent_ng_template_2_ng_container_0_ng_container_10_Template, 2, 0, "ng-container", 1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "sq-collapse-button", 17);
            i0.ɵɵlistener("state", function CommentsComponent_ng_template_2_ng_container_0_Template_sq_collapse_button_state_11_listener($event) { var comment_r10 = ctx.$implicit; return comment_r10.$collapsed = $event; })("click", function CommentsComponent_ng_template_2_ng_container_0_Template_sq_collapse_button_click_11_listener($event) { return $event.stopPropagation(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "sq-collapse", 18);
            i0.ɵɵtemplate(13, CommentsComponent_ng_template_2_ng_container_0_ng_template_13_Template, 4, 3, "ng-template");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(14, CommentsComponent_ng_template_2_ng_container_0_div_14_Template, 2, 4, "div", 19);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var comment_r10 = ctx.$implicit;
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(13, _c2, comment_r10.deleted));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !comment_r10.deleted);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", comment_r10.deleted);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("title", i0.ɵɵpipeBind1(7, 9, comment_r10));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 11, comment_r10.modified));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", comment_r10.modified !== comment_r10.creation);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("collapsed", comment_r10.$collapsed);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("collapsed", comment_r10.$collapsed);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !comment_r10.$collapsed && comment_r10.subcomments);
        }
    }
    function CommentsComponent_ng_template_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtemplate(0, CommentsComponent_ng_template_2_ng_container_0_Template, 15, 15, "ng-container", 11);
        }
        if (rf & 2) {
            var comments_r8 = ctx.$implicit;
            i0.ɵɵproperty("ngForOf", comments_r8);
        }
    }
    var CommentsComponent = /** @class */ (function () {
        function CommentsComponent(commentsWebService, modalService, principalService) {
            this.commentsWebService = commentsWebService;
            this.modalService = modalService;
            this.principalService = principalService;
            this.theme = 'light';
        }
        CommentsComponent.prototype.ngOnChanges = function (simpleChanges) {
            var _this = this;
            if (simpleChanges.docid && this.docid) {
                this.user = this.principalService.principal;
                this.commentsWebService.getComments(this.docid)
                    .subscribe(function (comments) { return _this.comments = comments; });
            }
        };
        CommentsComponent.prototype.addComment = function (replyTo) {
            var _this = this;
            var model = {
                title: replyTo ? 'msg#comments.replyTo' : 'msg#comments.add',
                message: 'msg#comments.markdownNotice',
                buttons: [],
                output: '',
                validators: [forms.Validators.required],
                rowCount: 5
            };
            this.modalService.prompt(model).then(function (result) {
                if (result === -1 /* OK */ && model.output.trim() !== "") {
                    _this.commentsWebService.createComment(_this.docid, model.output, replyTo === null || replyTo === void 0 ? void 0 : replyTo.commentid).subscribe(function (comment) {
                        if (replyTo) {
                            if (!replyTo.subcomments) {
                                replyTo.subcomments = [];
                            }
                            replyTo.subcomments.push(comment);
                        }
                        else {
                            _this.comments.push(comment);
                        }
                    });
                }
            });
        };
        CommentsComponent.prototype.likeComment = function (comment) {
            this.commentsWebService.likeComment(comment.docid, comment.commentid)
                .subscribe(function (res) {
                comment.likes = res.likes;
                comment.likedByUser = res.likedByUser;
            });
        };
        CommentsComponent.prototype.editComment = function (comment) {
            var _this = this;
            var model = {
                title: 'msg#comments.editComment',
                message: 'msg#comments.markdownNotice',
                buttons: [],
                output: comment.message,
                validators: [forms.Validators.required],
                rowCount: 5
            };
            this.modalService.prompt(model).then(function (result) {
                if (result === -1 /* OK */ && model.output.trim() !== "") {
                    _this.commentsWebService.updateComment(comment.docid, comment.commentid, model.output)
                        .subscribe(function (res) {
                        comment.message = res.message;
                        comment.modified = res.modified;
                        comment.likes = res.likes;
                        comment.likedByUser = res.likedByUser;
                    });
                }
            });
        };
        CommentsComponent.prototype.deleteComment = function (comment) {
            var _this = this;
            var _a;
            // If the comment has subcomments, only mark it as deleted
            var markAsDeleted = !!((_a = comment.subcomments) === null || _a === void 0 ? void 0 : _a.length);
            this.modalService.confirm({
                message: "msg#comments.deleteNotice",
                confirmType: 2 /* Warning */,
                buttons: [
                    new i2.ModalButton({
                        result: -3 /* Yes */,
                        primary: true
                    }),
                    new i2.ModalButton({
                        result: -2 /* Cancel */
                    })
                ]
            }).then(function (res) {
                if (res === -3 /* Yes */) {
                    _this.commentsWebService.deleteComment(comment.docid, comment.commentid, markAsDeleted)
                        .subscribe(function (res) {
                        if (markAsDeleted) {
                            var c = comment;
                            c.deleted = true;
                            delete c.message;
                            delete c.userid;
                            delete c.username;
                            delete c.likes;
                            delete c.likedByUser;
                        }
                        else {
                            _this.remove(_this.comments, comment);
                        }
                    });
                }
            });
        };
        CommentsComponent.prototype.remove = function (comments, comment) {
            for (var i = 0; i < comments.length; i++) {
                if (comments[i] === comment) {
                    comments.splice(i, 1);
                    return true;
                }
                var subcomments = comments[i].subcomments;
                if (subcomments) {
                    if (this.remove(subcomments, comment)) {
                        return true;
                    }
                }
            }
            return false;
        };
        return CommentsComponent;
    }());
    CommentsComponent.ɵfac = function CommentsComponent_Factory(t) { return new (t || CommentsComponent)(i0.ɵɵdirectiveInject(CommentsWebService), i0.ɵɵdirectiveInject(i2.ModalService), i0.ɵɵdirectiveInject(i1.PrincipalWebService)); };
    CommentsComponent.ɵcmp = i0.ɵɵdefineComponent({ type: CommentsComponent, selectors: [["sq-comments"]], inputs: { docid: "docid", theme: "theme" }, features: [i0.ɵɵNgOnChangesFeature], decls: 4, vars: 2, consts: [["class", "comments", 3, "ngClass", 4, "ngIf"], [4, "ngIf"], ["commentsTpl", ""], [1, "comments", 3, "ngClass"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["class", "font-italic text-center my-4", 4, "ngIf"], [1, "btn", "btn-primary", "d-block", "mx-auto", "mt-3", 3, "click"], [1, "fas", "fa-comment"], [1, "font-italic", "text-center", "my-4"], ["role", "status", 1, "spinner-grow", "d-block", "mx-auto", "mt-4"], [1, "sr-only"], [4, "ngFor", "ngForOf"], [1, "message", "pl-2", "py-1", "pr-2"], [1, "mt-2", "d-flex", 3, "ngClass", "click"], [1, "fas", "fa-user-circle", "mr-1"], ["class", "text-truncate small font-weight-bold mr-2", 4, "ngIf"], [1, "small", "text-muted", "ml-auto", 3, "title"], [1, "ml-1", "small", 3, "collapsed", "state", "click"], [3, "collapsed"], ["class", "subcomments ml-2", 4, "ngIf"], [1, "text-truncate", "small", "font-weight-bold", "mr-2"], ["class", "message-body", 3, "innerHTML", 4, "ngIf"], ["class", "text-muted", 4, "ngIf"], [1, "d-flex", "justify-content-end"], ["class", "btn-group", "role", "group", 3, "click", 4, "ngIf"], [1, "message-body", 3, "innerHTML"], [1, "text-muted"], ["role", "group", 1, "btn-group", 3, "click"], [1, "btn", "btn-sm", 3, "ngClass", "click"], [1, "fas", "fa-thumbs-up"], [1, "btn", "btn-sm", "btn-outline-secondary", 3, "click"], [1, "fas", "fa-reply"], ["class", "btn btn-sm btn-outline-secondary", 3, "click", 4, "ngIf"], [1, "fas", "fa-edit"], [1, "fas", "fa-trash-alt"], [1, "subcomments", "ml-2"]], template: function CommentsComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, CommentsComponent_div_0_Template, 8, 9, "div", 0);
                i0.ɵɵtemplate(1, CommentsComponent_div_1_Template, 5, 3, "div", 1);
                i0.ɵɵtemplate(2, CommentsComponent_ng_template_2_Template, 1, 1, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.comments);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", !ctx.comments);
            }
        }, directives: [i4.NgIf, i4.NgClass, i4.NgTemplateOutlet, i4.NgForOf, i5.CollapseButton, i5.Collapse], pipes: [i1$1.MessagePipe, CreationDatePipe, i8.RelativeTimePipe, MarkdownPipe], styles: [".subcomments[_ngcontent-%COMP%]{border-left:2px solid #d3d3d3}.btn-sm[_ngcontent-%COMP%]{font-size:.8rem;line-height:1.1}.message[_ngcontent-%COMP%]:hover{background:rgba(0,0,0,.05)}.message[_ngcontent-%COMP%]   .message-body[_ngcontent-%COMP%] >   :last-child{margin-bottom:.25rem}.message[_ngcontent-%COMP%]   .message-body[_ngcontent-%COMP%]     img{border-radius:8px;max-width:100%;padding:5px}.comments.dark[_ngcontent-%COMP%]   .btn-outline-secondary[_ngcontent-%COMP%]:not(:hover){border-color:#aab2b9;color:#aab2b9}.comments.dark[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]:hover{background:hsla(0,0%,100%,.1)}sq-collapse-button[_ngcontent-%COMP%]{cursor:pointer}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(CommentsComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-comments',
                        templateUrl: './comments.component.html',
                        styleUrls: ['./comments.component.scss']
                    }]
            }], function () { return [{ type: CommentsWebService }, { type: i2.ModalService }, { type: i1.PrincipalWebService }]; }, { docid: [{
                    type: i0.Input
                }], theme: [{
                    type: i0.Input
                }] });
    })();

    var CommentsModule = /** @class */ (function () {
        function CommentsModule() {
        }
        return CommentsModule;
    }());
    CommentsModule.ɵmod = i0.ɵɵdefineNgModule({ type: CommentsModule });
    CommentsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function CommentsModule_Factory(t) { return new (t || CommentsModule)(); }, imports: [[
                i4.CommonModule,
                i1.WebServicesModule,
                i1$1.IntlModule,
                login.LoginModule,
                i8.UtilsModule,
                i5.CollapseModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CommentsModule, { declarations: [CommentsComponent,
                CreationDatePipe,
                MarkdownPipe], imports: [i4.CommonModule,
                i1.WebServicesModule,
                i1$1.IntlModule,
                login.LoginModule,
                i8.UtilsModule,
                i5.CollapseModule], exports: [CommentsComponent,
                MarkdownPipe] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(CommentsModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i4.CommonModule,
                            i1.WebServicesModule,
                            i1$1.IntlModule,
                            login.LoginModule,
                            i8.UtilsModule,
                            i5.CollapseModule
                        ],
                        declarations: [
                            CommentsComponent,
                            CreationDatePipe,
                            MarkdownPipe
                        ],
                        exports: [
                            CommentsComponent,
                            MarkdownPipe
                        ],
                    }]
            }], null, null);
    })();

    var en = {
        "comments": {
            "created": "Created on {date}",
            "modified": "Modified on {date}",
            "replyTo": "Reply to comment",
            "add": "Add a comment",
            "write": "Write a comment",
            "like": "Like",
            "reply": "Reply",
            "edit": "Edit",
            "delete": "Delete",
            "editComment": "Edit your comment",
            "markdownNotice": "(Markdown syntax supported)",
            "noComment": "No comment yet",
            "deleteNotice": "Are you sure you want to delete this comment? (replies will remain visible)",
            "deleted": "[deleted]"
        }
    };

    var fr = {
        "comments": {
            "created": "Créé le {date}",
            "modified": "Modifié le {date}",
            "replyTo": "Répondre à un commentaire",
            "add": "Ajouter un commentaire",
            "write": "Écrire un commentaire",
            "like": "Aimer",
            "reply": "Répondre",
            "edit": "Éditer",
            "delete": "Supprimer",
            "editComment": "Éditer votre commentaire",
            "markdownNotice": "(Syntaxe Markdown supportée)",
            "noComment": "Pas encore de commentaire",
            "deleteNotice": "Êtes-vous certain de vouloir supprimer ce commentaire? (les réponses resteront visibles)",
            "deleted": "[supprimé]"
        }
    };

    var de = {
        "comments": {
            "created": "Erstellt am {date}",
            "modified": "Geändert am {date}",
            "replyTo": "Auf einen Kommentar antworten",
            "add": "Einen Kommentar hinzufügen",
            "write": "Schreibe einen Kommentar",
            "like": "Mögen",
            "reply": "Antworten",
            "edit": "Bearbeiten",
            "delete": "Löschen",
            "editComment": "Bearbeiten Sie Ihren Kommentar",
            "markdownNotice": "(Markdown-Syntax unterstützt)",
            "noComment": "Noch kein Kommentar",
            "deleteNotice": "Möchten Sie diesen Kommentar wirklich löschen? (Antworten bleiben sichtbar)",
            "deleted": "[gelöscht]"
        }
    };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CommentsComponent = CommentsComponent;
    exports.CommentsModule = CommentsModule;
    exports.CommentsWebService = CommentsWebService;
    exports.CreationDatePipe = CreationDatePipe;
    exports.MarkdownPipe = MarkdownPipe;
    exports.deComments = de;
    exports.enComments = en;
    exports.frComments = fr;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-comments.umd.js.map
