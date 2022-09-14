(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@sinequa/core/web-services'), require('@sinequa/core/base'), require('rxjs'), require('@sinequa/core/app-utils'), require('@sinequa/components/search'), require('@sinequa/components/action'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/rfm', ['exports', '@angular/core', '@sinequa/core/web-services', '@sinequa/core/base', 'rxjs', '@sinequa/core/app-utils', '@sinequa/components/search', '@sinequa/components/action', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components.rfm = {}), global.ng.core, global.sinequa.core['web-services'], global.sinequa.core.base, global.rxjs, global.sinequa.core['app-utils'], global.sinequa.components.search, global.sinequa.components.action, global.ng.common));
}(this, (function (exports, i0, i2, base, rxjs, i1, i3, i3$1, i2$1) { 'use strict';

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

    (function (RFMEventType) {
        RFMEventType["ClickSet"] = "RFM_ClickSet";
        RFMEventType["ClickReset"] = "RFM_ClickReset";
        RFMEventType["Like"] = "RFM_Like";
        RFMEventType["LikeReset"] = "RFM_LikeReset";
        RFMEventType["Dislike"] = "RFM_Dislike";
        RFMEventType["Important"] = "RFM_Important";
        RFMEventType["ImportantReset"] = "RFM_ImportantReset";
        RFMEventType["Ban"] = "RFM_Ban";
    })(exports.RFMEventType || (exports.RFMEventType = {}));
    var RFMService = /** @class */ (function () {
        function RFMService(appService, rfmService, searchService, auditService) {
            var _this = this;
            this.appService = appService;
            this.rfmService = rfmService;
            this.searchService = searchService;
            this.auditService = auditService;
            this._events = new rxjs.Subject();
            this._subscription = this.searchService.resultsStream.subscribe(function (results) {
                _this.updateRfm(results);
            });
        }
        Object.defineProperty(RFMService.prototype, "events", {
            get: function () {
                return this._events;
            },
            enumerable: false,
            configurable: true
        });
        RFMService.prototype.ngOnDestroy = function () {
            this._events.complete();
            this._subscription.unsubscribe();
        };
        RFMService.prototype.getMenuActions = function (config) {
            var actions = [i2.RFMDisplay.positiveRate, i2.RFMDisplay.unrate];
            if (config.negAvailable)
                actions.push(i2.RFMDisplay.negativeRate);
            return actions;
        };
        RFMService.getActionName = function (rfmDisplay) {
            switch (rfmDisplay) {
                case i2.RFMDisplay.positiveRate:
                    return "pos";
                case i2.RFMDisplay.mainlyPosRate:
                    return "mpos";
                case i2.RFMDisplay.unrate:
                    return "unrated";
                case i2.RFMDisplay.mainlyNegRate:
                    return "mneg";
                case i2.RFMDisplay.negativeRate:
                    return "neg";
                default:
                    return "none";
            }
        };
        RFMService.toAuditEventType = function (action, evt) {
            var aet;
            switch (action) {
                case "important":
                    switch (evt) {
                        case i2.RFMDisplay.positiveRate:
                            aet = exports.RFMEventType.Important;
                            break;
                        case i2.RFMDisplay.unrate:
                            aet = exports.RFMEventType.ImportantReset;
                            break;
                        case i2.RFMDisplay.negativeRate:
                            aet = exports.RFMEventType.Ban;
                            break;
                    }
                    break;
                case "like":
                    switch (evt) {
                        case i2.RFMDisplay.positiveRate:
                            aet = exports.RFMEventType.Like;
                            break;
                        case i2.RFMDisplay.unrate:
                            aet = exports.RFMEventType.LikeReset;
                            break;
                        case i2.RFMDisplay.negativeRate:
                            aet = exports.RFMEventType.Dislike;
                            break;
                    }
                    break;
                case "click":
                    switch (evt) {
                        case i2.RFMDisplay.positiveRate:
                            aet = exports.RFMEventType.ClickSet;
                            break;
                        case i2.RFMDisplay.unrate:
                            aet = exports.RFMEventType.ClickReset;
                            break;
                        //case RFMDisplay.negativeRate:
                        //aet = AuditEventType.RFM_Dislike;
                        //break;
                    }
                    break;
            }
            return aet;
        };
        RFMService.prototype.notifyRfmAction = function (rfmEvent, record, results) {
            this.auditService.notifyDocument(rfmEvent, record, results, undefined, {
                queryhash: this.searchService.results ? this.searchService.results.rfmQueryHash : undefined,
                querytext: this.searchService.query.text,
                querylang: this.searchService.query.questionLanguage || (this.appService.ccquery && this.appService.ccquery.questionLanguage)
            });
        };
        /**
         * Called every time new results come in.
         * Performs a request for
         * @param results
         */
        RFMService.prototype.updateRfm = function (results) {
            var _this = this;
            if (results && results.records) {
                var ccquery = this.appService.ccquery;
                if (ccquery && ccquery.rFM) {
                    base.Utils.subscribe(this.rfmService.getRfmData(ccquery.rFM, results), function (value) {
                        var e_1, _a;
                        if (value) {
                            try {
                                for (var _b = __values(results.records), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var record = _c.value;
                                    var rfmData = value[record.id];
                                    if (!!rfmData) {
                                        record.rfm = rfmData;
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
                            _this._events.next({ type: "updated" });
                        }
                    });
                }
            }
        };
        return RFMService;
    }());
    RFMService.ɵfac = function RFMService_Factory(t) { return new (t || RFMService)(i0.ɵɵinject(i1.AppService), i0.ɵɵinject(i2.RfmWebService), i0.ɵɵinject(i3.SearchService), i0.ɵɵinject(i2.AuditWebService)); };
    RFMService.ɵprov = i0.ɵɵdefineInjectable({ token: RFMService, factory: RFMService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(RFMService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () { return [{ type: i1.AppService }, { type: i2.RfmWebService }, { type: i3.SearchService }, { type: i2.AuditWebService }]; }, null);
    })();

    var _c0 = function (a0) { return [a0]; };
    var _c1 = function (a0, a2) { return { items: a0, autoAdjust: true, size: a2 }; };
    function BsRfmAction_ng_container_0_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "div", 2);
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction2(3, _c1, i0.ɵɵpureFunction1(1, _c0, ctx_r1.action), ctx_r1.size));
        }
    }
    function BsRfmAction_ng_container_0_div_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelementStart(1, "div", 3);
            i0.ɵɵelement(2, "span");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(2);
            i0.ɵɵclassMap(ctx_r2.getActionIcon(ctx_r2.rfm.image));
        }
    }
    function BsRfmAction_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsRfmAction_ng_container_0_div_1_Template, 1, 6, "div", 1);
            i0.ɵɵtemplate(2, BsRfmAction_ng_container_0_div_2_Template, 3, 3, "div", 0);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.displayImgAction || ctx_r0.displayMenu);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.displayNoAction);
        }
    }
    var BsRfmAction = /** @class */ (function () {
        function BsRfmAction(changeDetectorRef, rFMService) {
            this.changeDetectorRef = changeDetectorRef;
            this.rFMService = rFMService;
        }
        BsRfmAction.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if (!this.rfmSubscription) {
                this.rfmSubscription = this.rFMService.events.subscribe(function (event) {
                    _this.changeDetectorRef.markForCheck();
                });
            }
            if (changes["rfm"]) {
                if (!this.action) {
                    this.type = (base.Utils.toLowerCase(this.type) || "important");
                    // List of menu actions from app config
                    this.menuActions = this.rFMService.getMenuActions(this.config);
                    this.buildAction();
                }
                else {
                    this.action.update();
                }
            }
        };
        BsRfmAction.prototype.ngOnDestroy = function () {
            this.rfmSubscription.unsubscribe();
        };
        Object.defineProperty(BsRfmAction.prototype, "hasRFMAction", {
            get: function () {
                return this.record.rfmEnabled && this.config.enabled &&
                    this.hasRfmImage;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsRfmAction.prototype, "rfmStatus", {
            get: function () {
                return (!this.rfm) ? i2.RFMDisplay.unrate : this.rfm.status;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsRfmAction.prototype, "hasRfmImage", {
            get: function () {
                return this.rfmImage !== i2.RFMDisplay.none;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsRfmAction.prototype, "rfmImage", {
            get: function () {
                return (!this.rfm) ? this.rfmDefaultImage : this.rfm.image;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsRfmAction.prototype, "rfmDefaultImage", {
            get: function () {
                return (this.config.displayUnrated || !this.config.noMenu) ? i2.RFMDisplay.unrate : i2.RFMDisplay.none;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsRfmAction.prototype, "rfmImageAction", {
            get: function () {
                return (!this.rfm) ? this.rfmDefaultImageAction : this.rfm.imageAction;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsRfmAction.prototype, "rfmDefaultImageAction", {
            get: function () {
                return this.config.noMenu ? i2.RFMDisplay.positiveRate : i2.RFMDisplay.none;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsRfmAction.prototype, "rfmAvailableActions", {
            get: function () {
                return (!this.rfm) ? this.rfmDefaultAvailableActions : this.rfm.availableActions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsRfmAction.prototype, "rfmDefaultAvailableActions", {
            get: function () {
                if (this.config.noMenu) {
                    return i2.RFMDisplay.none;
                }
                if (this.config.negAvailable) {
                    return i2.RFMDisplay.personalAll;
                }
                return i2.RFMDisplay.personalPosOnly;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsRfmAction.prototype, "displayImgAction", {
            get: function () {
                return this.rfmImageAction !== i2.RFMDisplay.none;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsRfmAction.prototype, "displayMenu", {
            get: function () {
                return this.rfmImageAction === i2.RFMDisplay.none &&
                    this.rfmAvailableActions !== i2.RFMDisplay.none &&
                    !this.config.noMenu;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsRfmAction.prototype, "displayNoAction", {
            get: function () {
                return this.rfmImageAction === i2.RFMDisplay.none &&
                    this.rfmAvailableActions === i2.RFMDisplay.none;
            },
            enumerable: false,
            configurable: true
        });
        BsRfmAction.prototype.getActionIcon = function (rfmDisplay) {
            var name = RFMService.getActionName(rfmDisplay);
            return "rfm-" + this.type + "-" + name;
        };
        BsRfmAction.prototype.buildAction = function () {
            var _this = this;
            this.action = new i3$1.Action({
                updater: function (item) {
                    item.icon = _this.getActionIcon(_this.rfmImage);
                }
            });
            if (this.displayImgAction) {
                this.action.action = function (item) {
                    _this.selectRfmDisplay(_this.rfmImageAction);
                };
            }
            if (this.displayMenu) {
                this.action.children = this.menuActions.map(function (rfmDisplay) { return new i3$1.Action({
                    icon: _this.getActionIcon(rfmDisplay),
                    data: rfmDisplay,
                    action: function (item) {
                        _this.selectRfmDisplay(item.data);
                    },
                    updater: function (item) {
                        item.disabled = rfmDisplay === _this.rfmStatus;
                    }
                }); });
            }
            this.action.update();
        };
        BsRfmAction.prototype.selectRfmDisplay = function (rfmDisplay) {
            if (rfmDisplay !== this.rfmStatus) {
                var eventtype = RFMService.toAuditEventType(this.type, rfmDisplay);
                this.rFMService.notifyRfmAction(eventtype, this.record, this.results);
                // Update RFM data for the record (created a new RFM data can be necessary)
                this.updateRfmData(rfmDisplay, this.rfmStatus);
            }
        };
        BsRfmAction.prototype.updateRfmData = function (newStatus, newAction) {
            var updateNeeded = false;
            if (!this.rfm) {
                this.rfm = {
                    eventCount: 1,
                    average: 0,
                    status: newStatus,
                    image: newStatus,
                    imageAction: newAction,
                    availableActions: this.rfmDefaultAvailableActions
                };
                updateNeeded = true;
            }
            else {
                if (newStatus === i2.RFMDisplay.unrate) {
                    this.rfm.eventCount--;
                }
                else {
                    this.rfm.eventCount++;
                }
                this.rfm.status = newStatus;
                this.rfm.image = newStatus;
                this.rfm.imageAction = newAction;
            }
            if (updateNeeded) {
                var rfm = this.record.rfm;
                var updateRfm = false;
                if (!rfm) {
                    updateRfm = true;
                    rfm = {};
                }
                rfm[this.type] = this.rfm;
                if (updateRfm) {
                    this.record.rfm = rfm;
                }
            }
            this.action.update();
        };
        return BsRfmAction;
    }());
    BsRfmAction.ɵfac = function BsRfmAction_Factory(t) { return new (t || BsRfmAction)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(RFMService)); };
    BsRfmAction.ɵcmp = i0.ɵɵdefineComponent({ type: BsRfmAction, selectors: [["sq-rfm-action"]], inputs: { results: "results", record: "record", config: "config", rfm: "rfm", type: "type", size: "size" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "sq-action-buttons", 4, "ngIf"], [3, "sq-action-buttons"], [1, "btn-text", "rfm-no-action"]], template: function BsRfmAction_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsRfmAction_ng_container_0_Template, 3, 2, "ng-container", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.hasRFMAction);
            }
        }, directives: [i2$1.NgIf, i3$1.BsActionButtons], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsRfmAction, [{
                type: i0.Component,
                args: [{
                        selector: "sq-rfm-action",
                        templateUrl: "./rfm-action.html"
                    }]
            }], function () { return [{ type: i0.ChangeDetectorRef }, { type: RFMService }]; }, { results: [{
                    type: i0.Input
                }], record: [{
                    type: i0.Input
                }], config: [{
                    type: i0.Input
                }], rfm: [{
                    type: i0.Input
                }], type: [{
                    type: i0.Input
                }], size: [{
                    type: i0.Input
                }] });
    })();

    var BsRfmModule = /** @class */ (function () {
        function BsRfmModule() {
        }
        return BsRfmModule;
    }());
    BsRfmModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsRfmModule });
    BsRfmModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsRfmModule_Factory(t) { return new (t || BsRfmModule)(); }, imports: [[
                i2$1.CommonModule,
                i3$1.BsActionModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsRfmModule, { declarations: [BsRfmAction], imports: [i2$1.CommonModule,
                i3$1.BsActionModule], exports: [BsRfmAction] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsRfmModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i2$1.CommonModule,
                            i3$1.BsActionModule
                        ],
                        declarations: [
                            BsRfmAction
                        ],
                        exports: [
                            BsRfmAction
                        ]
                    }]
            }], null, null);
    })();

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BsRfmAction = BsRfmAction;
    exports.BsRfmModule = BsRfmModule;
    exports.RFMService = RFMService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-rfm.umd.js.map
