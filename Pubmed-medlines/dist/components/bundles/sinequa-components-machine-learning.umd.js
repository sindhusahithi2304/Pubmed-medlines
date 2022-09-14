(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@sinequa/core/web-services'), require('@sinequa/core/base'), require('@sinequa/core/app-utils'), require('@sinequa/core/login'), require('@sinequa/core/intl'), require('@sinequa/components/search'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/machine-learning', ['exports', '@angular/core', 'rxjs', '@sinequa/core/web-services', '@sinequa/core/base', '@sinequa/core/app-utils', '@sinequa/core/login', '@sinequa/core/intl', '@sinequa/components/search', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components['machine-learning'] = {}), global.ng.core, global.rxjs, global.sinequa.core['web-services'], global.sinequa.core.base, global.sinequa.core['app-utils'], global.sinequa.core.login, global.sinequa.core.intl, global.sinequa.components.search, global.ng.common));
}(this, (function (exports, i0, rxjs, i3, base, i1, i2, i4, i5, common) { 'use strict';

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

    var MlAuditService = /** @class */ (function (_super) {
        __extends(MlAuditService, _super);
        function MlAuditService(startConfig, appService, loginService, principalService, intlService, httpClient, searchService) {
            var _this = _super.call(this, startConfig) || this;
            _this.appService = appService;
            _this.loginService = loginService;
            _this.principalService = principalService;
            _this.intlService = intlService;
            _this.httpClient = httpClient;
            _this.searchService = searchService;
            _this.requestInitializer = function (request) {
                request.body.$auditRecord = _this.ensureAuditRecord(request.body.$auditRecord);
                return true;
            };
            return _this;
        }
        MlAuditService.prototype.newTimestamp = function () {
            return (new Date()).toISOString();
        };
        MlAuditService.prototype.calcDwellTime = function (event, defaultValue) {
            if (!event.timestamp) {
                return defaultValue;
            }
            return Date.now() - (new Date(event.timestamp)).getTime();
        };
        MlAuditService.prototype.startSession = function () {
            this.endSession();
            if (this.principalService.principal) {
                this.session = {
                    type: "session",
                    subType: "start",
                    id: base.Utils.guid(false),
                    timestamp: this.newTimestamp(),
                    userId: this.principalService.principal.userId,
                    isAdmin: this.principalService.principal.isAdministrator,
                    locale: this.intlService.currentLocale.name
                };
            }
        };
        MlAuditService.prototype.endSession = function () {
            this.endQuery();
            if (this.session && this.session.sent) {
                this.notifyEvent({
                    type: "session",
                    subType: "end",
                    id: this.session.id,
                    dwellTime: this.calcDwellTime(this.session)
                });
            }
            this.session = undefined;
            this.query = undefined;
            this.results = undefined;
        };
        MlAuditService.prototype.newQuery = function (event) {
            this.endQuery();
            if (event.query) {
                this.query = {
                    type: "query",
                    subType: "start",
                    id: base.Utils.guid(false),
                    sessionId: this.session ? this.session.id : undefined,
                    indexes: this.appService.ccquery ? this.appService.ccquery.searchIndexes : undefined,
                    timestamp: this.newTimestamp()
                };
            }
        };
        MlAuditService.prototype.endQuery = function () {
            this.endResults();
            if (this.query && this.query.sent) {
                this.notifyEvent({
                    type: "query",
                    subType: "end",
                    id: this.query.id,
                    sessionId: this.session ? this.session.id : undefined,
                    dwellTime: this.calcDwellTime(this.query)
                });
            }
            this.query = undefined;
            this.results = undefined;
        };
        MlAuditService.prototype.newResults = function () {
            this.endResults();
            if (this.searchService.results && this.searchService.results.records) {
                this.results = {
                    type: "results",
                    subType: "start",
                    id: base.Utils.guid(false),
                    queryId: this.query ? this.query.id : undefined,
                    sessionId: (!this.query && this.session) ? this.session.id : undefined,
                    timestamp: this.newTimestamp(),
                    queryText: this.searchService.query.text,
                    queryHash: this.searchService.query.hash(),
                    page: this.searchService.results.page,
                    documentIds: this.searchService.results.records.map(function (record) { return record.id; }),
                };
            }
        };
        MlAuditService.prototype.endResults = function () {
            if (this.results && this.results.sent) {
                this.notifyEvent({
                    type: "results",
                    subType: "end",
                    id: this.results.id,
                    queryId: this.query ? this.query.id : undefined,
                    sessionId: (!this.query && this.session) ? this.session.id : undefined,
                    dwellTime: this.calcDwellTime(this.results)
                });
            }
            this.results = undefined;
        };
        MlAuditService.prototype.flushContext = function () {
            var events = [];
            if (this.session && !this.session.sent) {
                events.push(this.session);
            }
            if (this.query && !this.query.sent) {
                events.push(this.query);
            }
            if (this.results && !this.results.sent) {
                events.push(this.results);
            }
            if (events.length !== 0) {
                this.notifyEvent(events);
                events.forEach(function (event) { return event.sent = true; });
            }
        };
        MlAuditService.prototype.newAction = function (actionOrActionType, documentIds) {
            this.flushContext();
            var action = {
                type: "action",
                subType: undefined,
                actionType: "click",
                id: base.Utils.guid(false),
                resultsId: this.results ? this.results.id : undefined,
                queryId: (!this.results && this.query) ? this.query.id : undefined,
                sessionId: (!this.results && !this.query && this.session) ? this.session.id : undefined,
                documentIds: []
            };
            delete action.actionType;
            delete action.documentIds;
            if (base.Utils.isObject(actionOrActionType)) {
                base.Utils.merge(action, actionOrActionType);
            }
            else {
                action.actionType = actionOrActionType;
                if (documentIds) {
                    action.documentIds = documentIds;
                }
            }
            return action;
        };
        MlAuditService.prototype.endAction = function (action) {
            if (action) {
                this.notifyEvent({
                    type: "action",
                    subType: "end",
                    id: action.id,
                    resultsId: this.results ? this.results.id : undefined,
                    queryId: (!this.results && this.query) ? this.query.id : undefined,
                    sessionId: (!this.results && !this.query && this.session) ? this.session.id : undefined,
                    dwellTime: this.calcDwellTime(action)
                });
            }
        };
        MlAuditService.prototype.init = function () {
            var _this = this;
            base.Utils.subscribe(this.loginService.events, function (event) {
                switch (event.type) {
                    case "session-start":
                        _this.startSession();
                        break;
                    case "session-end":
                        _this.endSession();
                        break;
                }
            });
            base.Utils.subscribe(this.searchService.events, function (event) {
                switch (event.type) {
                    case "new-query":
                        _this.newQuery(event);
                        break;
                    case "new-results":
                        _this.newResults();
                        break;
                }
            });
        };
        MlAuditService.prototype.notifyEvent = function (events) {
            if (!this.startConfig.mlAuditEnabled) {
                return rxjs.of(undefined);
            }
            var observable = this.httpClient.post(this.makeUrl(MlAuditService.Endpoint), {
                events: events
            });
            base.Utils.subscribe(observable, function (response) {
                return response;
            }, function (error) {
                console.log("MlAuditService.notify failure - error: ", error);
            });
            return observable;
        };
        MlAuditService.prototype.notify = function (actions, documentIds) {
            var _this = this;
            if (base.Utils.isString(actions)) {
                return this.notifyEvent(this.newAction(actions, documentIds));
            }
            else if (base.Utils.isArray(actions)) {
                return this.notifyEvent(actions.map(function (actionInit) { return _this.newAction(actionInit); }));
            }
            else {
                return this.notifyEvent(this.newAction(actions));
            }
        };
        MlAuditService.prototype.ensureAuditRecord = function (auditEvents) {
            var _this = this;
            if (base.Utils.isObject(auditEvents)) {
                var auditRecord = auditEvents;
                if (auditRecord.auditEvents || auditRecord.mlAuditEvents) {
                    if (auditRecord.mlAuditEvents) {
                        return {
                            auditEvents: auditRecord.auditEvents,
                            mlAuditEvents: auditRecord.mlAuditEvents.map(function (actionInit) { return _this.newAction(actionInit); })
                        };
                    }
                }
            }
            return auditEvents; // leave unchanged
        };
        return MlAuditService;
    }(i3.HttpService));
    MlAuditService.Endpoint = "ml.audit.notify";
    MlAuditService.ɵfac = function MlAuditService_Factory(t) { return new (t || MlAuditService)(i0.ɵɵinject(i3.START_CONFIG), i0.ɵɵinject(i1.AppService), i0.ɵɵinject(i2.LoginService), i0.ɵɵinject(i3.PrincipalWebService), i0.ɵɵinject(i4.IntlService), i0.ɵɵinject(i3.SqHttpClient), i0.ɵɵinject(i5.SearchService)); };
    MlAuditService.ɵprov = i0.ɵɵdefineInjectable({ token: MlAuditService, factory: MlAuditService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(MlAuditService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i3.START_CONFIG]
                        }] }, { type: i1.AppService }, { type: i2.LoginService }, { type: i3.PrincipalWebService }, { type: i4.IntlService }, { type: i3.SqHttpClient }, { type: i5.SearchService }];
        }, null);
    })();

    var DwellTime = /** @class */ (function () {
        function DwellTime(mlAuditService) {
            this.mlAuditService = mlAuditService;
        }
        DwellTime.prototype.ngOnInit = function () {
            if (this.options.actionType === "preview") {
                this.action = this.mlAuditService.newAction(this.options.actionType, this.options.docId);
                this.action.subType = "start";
                this.mlAuditService.notifyEvent(this.action);
                this.action.timestamp = this.mlAuditService.newTimestamp();
            }
        };
        DwellTime.prototype.ngOnDestroy = function () {
            if (this.options.actionType === "preview") {
                if (this.action) {
                    this.mlAuditService.endAction(this.action);
                    this.action = undefined;
                }
            }
        };
        DwellTime.prototype.onMouseEnter = function (event) {
            if (this.options.actionType === "over") {
                this.action = this.mlAuditService.newAction(this.options.actionType, this.options.docId);
                this.action.timestamp = this.mlAuditService.newTimestamp();
            }
        };
        DwellTime.prototype.onMouseLeave = function (event) {
            if (this.options.actionType === "over") {
                if (this.action) {
                    this.action.dwellTime = this.mlAuditService.calcDwellTime(this.action);
                    this.action.timestamp = undefined;
                    this.mlAuditService.notifyEvent(this.action);
                    this.action = undefined;
                }
            }
        };
        return DwellTime;
    }());
    DwellTime.ɵfac = function DwellTime_Factory(t) { return new (t || DwellTime)(i0.ɵɵdirectiveInject(MlAuditService)); };
    DwellTime.ɵdir = i0.ɵɵdefineDirective({ type: DwellTime, selectors: [["", "sqDwellTime", ""]], hostBindings: function DwellTime_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("mouseenter", function DwellTime_mouseenter_HostBindingHandler($event) { return ctx.onMouseEnter($event); })("mouseleave", function DwellTime_mouseleave_HostBindingHandler($event) { return ctx.onMouseLeave($event); });
            }
        }, inputs: { options: ["sqDwellTime", "options"] } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(DwellTime, [{
                type: i0.Directive,
                args: [{
                        selector: "[sqDwellTime]"
                    }]
            }], function () { return [{ type: MlAuditService }]; }, { options: [{
                    type: i0.Input,
                    args: ["sqDwellTime"]
                }], onMouseEnter: [{
                    type: i0.HostListener,
                    args: ["mouseenter", ["$event"]]
                }], onMouseLeave: [{
                    type: i0.HostListener,
                    args: ["mouseleave", ["$event"]]
                }] });
    })();

    // Initialization that needs to be done once the app component has been created
    function AppBootstrapListener(mlAuditService) {
        return function () {
            mlAuditService.init();
        };
    }
    function HttpRequestListener(mlAuditService) {
        return mlAuditService.requestInitializer;
    }
    // See https://github.com/angular/angular/issues/19698
    // @dynamic
    var MLModule = /** @class */ (function () {
        function MLModule() {
        }
        return MLModule;
    }());
    MLModule.ɵmod = i0.ɵɵdefineNgModule({ type: MLModule });
    MLModule.ɵinj = i0.ɵɵdefineInjector({ factory: function MLModule_Factory(t) { return new (t || MLModule)(); }, providers: [
            { provide: i0.APP_BOOTSTRAP_LISTENER, useFactory: AppBootstrapListener, deps: [MlAuditService], multi: true },
            { provide: i2.HTTP_REQUEST_INITIALIZERS, useFactory: HttpRequestListener, deps: [MlAuditService], multi: true },
        ], imports: [[
                common.CommonModule,
                i5.BsSearchModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(MLModule, { declarations: [DwellTime], imports: [common.CommonModule,
                i5.BsSearchModule] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(MLModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            common.CommonModule,
                            i5.BsSearchModule
                        ],
                        declarations: [
                            DwellTime
                        ],
                        exports: [],
                        providers: [
                            { provide: i0.APP_BOOTSTRAP_LISTENER, useFactory: AppBootstrapListener, deps: [MlAuditService], multi: true },
                            { provide: i2.HTTP_REQUEST_INITIALIZERS, useFactory: HttpRequestListener, deps: [MlAuditService], multi: true },
                        ]
                    }]
            }], null, null);
    })();

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AppBootstrapListener = AppBootstrapListener;
    exports.DwellTime = DwellTime;
    exports.HttpRequestListener = HttpRequestListener;
    exports.MLModule = MLModule;
    exports.MlAuditService = MlAuditService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-machine-learning.umd.js.map
