(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/animations'), require('@sinequa/core/base'), require('@sinequa/core/notification'), require('@sinequa/core/intl'), require('@sinequa/components/action')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/notification', ['exports', '@angular/core', '@angular/common', '@angular/animations', '@sinequa/core/base', '@sinequa/core/notification', '@sinequa/core/intl', '@sinequa/components/action'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components.notification = {}), global.ng.core, global.ng.common, global.ng.animations, global.sinequa.core.base, global.sinequa.core.notification, global.sinequa.core.intl, global.sinequa.components.action));
}(this, (function (exports, i0, i2, animations, base, i1, i3, i2$1) { 'use strict';

    function BsNotification_button_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r3_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "button", 7);
            i0.ɵɵlistener("click", function BsNotification_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3_1); var ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.close(); });
            i0.ɵɵelementStart(1, "span", 8);
            i0.ɵɵtext(2, "\u00D7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "span", 9);
            i0.ɵɵtext(4, "Close");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
    }
    function BsNotification_ng_container_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "span", 10);
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(4, "hr");
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, ctx_r1.notification.title));
        }
    }
    var _c0 = function (a0) { return { values: a0 }; };
    function notificationAnimations(timings) {
        return [
            animations.trigger('autoClose', [
                animations.transition('1 => void', [
                    animations.animate(timings, animations.style({ opacity: 0 }))
                ])
            ])
        ];
    }
    var BsNotification = /** @class */ (function () {
        function BsNotification(notificationsService) {
            this.notificationsService = notificationsService;
        }
        BsNotification.prototype.ngOnInit = function () {
            var _this = this;
            if (this.notification.autoClose && this.notification.state === 0 /* Initial */) {
                this.autoClose = true;
                base.Utils.delay(5000).then(function (value) {
                    if (_this.notification.state === 0 /* Initial */) {
                        _this.close();
                    }
                });
            }
        };
        Object.defineProperty(BsNotification.prototype, "alertClass", {
            get: function () {
                switch (this.notification.type) {
                    case 1 /* Info */: return "info";
                    case 0 /* Success */: return "success";
                    case 2 /* Warning */: return "warning";
                    case 3 /* Error */: return "danger";
                }
                return "";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsNotification.prototype, "notificationClass", {
            get: function () {
                switch (this.notification.type) {
                    case 1 /* Info */: return "fas fa-info-circle fa-lg";
                    case 0 /* Success */: return "fas fa-check-circle fa-lg";
                    case 2 /* Warning */: return "fas fa-exclamation-triangle fa-lg";
                    case 3 /* Error */: return "fas fa-exclamation-circle fa-lg";
                }
                return "";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsNotification.prototype, "showClose", {
            get: function () {
                return !this.notification.autoClose || this.notification.state !== 0 /* Initial */;
            },
            enumerable: false,
            configurable: true
        });
        BsNotification.prototype.close = function () {
            this.notificationsService.closeNotification(this.notification);
        };
        return BsNotification;
    }());
    BsNotification.ɵfac = function BsNotification_Factory(t) { return new (t || BsNotification)(i0.ɵɵdirectiveInject(i1.NotificationsService)); };
    BsNotification.ɵcmp = i0.ɵɵdefineComponent({ type: BsNotification, selectors: [["sq-notification"]], inputs: { notification: "notification" }, decls: 10, vars: 15, consts: [["role", "alert"], ["type", "button", "class", "close", "aria-label", "Close", 3, "click", 4, "ngIf"], [1, "sq-notification-container"], [1, "sq-notification-icon"], [1, "sq-notification-message"], [4, "ngIf"], [1, "sq-notification-text"], ["type", "button", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "sr-only"], [1, "sq-notification-title"]], template: function BsNotification_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtemplate(1, BsNotification_button_1_Template, 5, 0, "button", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵelementStart(3, "div", 3);
                i0.ɵɵelement(4, "span");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(5, "div", 4);
                i0.ɵɵtemplate(6, BsNotification_ng_container_6_Template, 5, 3, "ng-container", 5);
                i0.ɵɵelementStart(7, "span", 6);
                i0.ɵɵtext(8);
                i0.ɵɵpipe(9, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵclassMapInterpolate1("alert alert-", ctx.alertClass, " sq-notification");
                i0.ɵɵproperty("@autoClose", ctx.autoClose);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.showClose);
                i0.ɵɵadvance(3);
                i0.ɵɵclassMap(ctx.notificationClass);
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", !!ctx.notification.title);
                i0.ɵɵadvance(2);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 10, ctx.notification.text, i0.ɵɵpureFunction1(13, _c0, ctx.notification.params)));
            }
        }, directives: [i2.NgIf], pipes: [i3.MessagePipe], encapsulation: 2, data: { animation: notificationAnimations(".15s ease-in-out") } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsNotification, [{
                type: i0.Component,
                args: [{
                        selector: "sq-notification",
                        templateUrl: "./notification.html",
                        animations: notificationAnimations(".15s ease-in-out")
                    }]
            }], function () { return [{ type: i1.NotificationsService }]; }, { notification: [{
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

    function BsNotifications_sq_notification_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "sq-notification", 2);
        }
        if (rf & 2) {
            var notification_r1 = ctx.$implicit;
            i0.ɵɵproperty("notification", notification_r1);
        }
    }
    var BsNotifications = /** @class */ (function () {
        function BsNotifications(notificationsService, changeDetectorRef) {
            this.notificationsService = notificationsService;
            this.changeDetectorRef = changeDetectorRef;
            this.notifications = [];
        }
        BsNotifications.prototype.ngOnInit = function () {
            var _this = this;
            this.loadNotifications();
            this.subscription = this.notificationsService.events.subscribe(function (event) {
                if (event.type === "updated") {
                    _this.loadNotifications();
                    _this.changeDetectorRef.markForCheck();
                }
            });
        };
        BsNotifications.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        BsNotifications.prototype.loadNotifications = function () {
            var e_1, _a;
            this.notifications.splice(0);
            try {
                for (var _b = __values(this.notificationsService.notifications), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var notification = _c.value;
                    if (notification.state !== 2 /* Hidden */) {
                        this.notifications.unshift(notification);
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
        return BsNotifications;
    }());
    BsNotifications.ɵfac = function BsNotifications_Factory(t) { return new (t || BsNotifications)(i0.ɵɵdirectiveInject(i1.NotificationsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    BsNotifications.ɵcmp = i0.ɵɵdefineComponent({ type: BsNotifications, selectors: [["sq-notifications"]], decls: 2, vars: 1, consts: [[1, "sq-notifications"], [3, "notification", 4, "ngFor", "ngForOf"], [3, "notification"]], template: function BsNotifications_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtemplate(1, BsNotifications_sq_notification_1_Template, 1, 1, "sq-notification", 1);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", ctx.notifications);
            }
        }, directives: [i2.NgForOf, BsNotification], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsNotifications, [{
                type: i0.Component,
                args: [{
                        selector: "sq-notifications",
                        templateUrl: "./notifications.html"
                    }]
            }], function () { return [{ type: i1.NotificationsService }, { type: i0.ChangeDetectorRef }]; }, null);
    })();

    var _c0$1 = function (a0) { return [a0]; };
    var _c1 = function (a0) { return { items: a0 }; };
    var BsNotificationsManager = /** @class */ (function () {
        function BsNotificationsManager(notificationsService, changeDetectorRef) {
            this.notificationsService = notificationsService;
            this.changeDetectorRef = changeDetectorRef;
        }
        BsNotificationsManager.prototype.ngOnInit = function () {
            this.buildAction();
            this.unbind();
            this.bind();
        };
        BsNotificationsManager.prototype.bind = function () {
            var _this = this;
            this.subscription = this.notificationsService.notificationsStream.subscribe(function (notification) {
                _this.action.update();
            });
        };
        BsNotificationsManager.prototype.unbind = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
                this.subscription = undefined;
            }
        };
        BsNotificationsManager.prototype.ngOnDestroy = function () {
            this.unbind();
        };
        BsNotificationsManager.prototype.buildAction = function () {
            var _this = this;
            this.action = new i2$1.Action({
                icon: "fas fa-shield-alt",
                title: "msg#notification.title",
                hidden: true,
                children: [
                    new i2$1.Action({
                        text: "msg#notification.showNotifications",
                        action: function (item, $event) {
                            _this.notificationsService.showNotifications();
                        },
                        updater: function (item) {
                            item.hidden = _this.notificationsService.allNotificationsShowing;
                            _this.changeDetectorRef.markForCheck();
                        }
                    }),
                    new i2$1.Action({
                        text: "msg#notification.hideNotifications",
                        action: function (item, $event) {
                            _this.notificationsService.hideNotifications();
                        },
                        updater: function (item) {
                            item.hidden = _this.notificationsService.allNotificationsHidden;
                            _this.changeDetectorRef.markForCheck();
                        }
                    }),
                    new i2$1.Action({
                        separator: true
                    }),
                    new i2$1.Action({
                        text: "msg#notification.clearNotifications",
                        action: function (item, $event) {
                            _this.notificationsService.deleteAllNotifications();
                        }
                    })
                ]
            });
        };
        return BsNotificationsManager;
    }());
    BsNotificationsManager.ɵfac = function BsNotificationsManager_Factory(t) { return new (t || BsNotificationsManager)(i0.ɵɵdirectiveInject(i1.NotificationsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    BsNotificationsManager.ɵcmp = i0.ɵɵdefineComponent({ type: BsNotificationsManager, selectors: [["sq-notifications-manager"]], decls: 2, vars: 5, consts: [[1, "btn-toolbar", "dropup"], [1, "btn-group", 3, "sq-action-buttons"]], template: function BsNotificationsManager_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelement(1, "div", 1);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction1(3, _c1, i0.ɵɵpureFunction1(1, _c0$1, ctx.action)));
            }
        }, directives: [i2$1.BsActionButtons], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsNotificationsManager, [{
                type: i0.Component,
                args: [{
                        selector: "sq-notifications-manager",
                        templateUrl: "./notifications-manager.html"
                    }]
            }], function () { return [{ type: i1.NotificationsService }, { type: i0.ChangeDetectorRef }]; }, null);
    })();

    var BsNotificationModule = /** @class */ (function () {
        function BsNotificationModule() {
        }
        return BsNotificationModule;
    }());
    BsNotificationModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsNotificationModule });
    BsNotificationModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsNotificationModule_Factory(t) { return new (t || BsNotificationModule)(); }, imports: [[
                i2.CommonModule,
                i3.IntlModule,
                i2$1.BsActionModule,
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsNotificationModule, { declarations: [BsNotification, BsNotifications, BsNotificationsManager], imports: [i2.CommonModule,
                i3.IntlModule,
                i2$1.BsActionModule], exports: [BsNotifications, BsNotificationsManager] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsNotificationModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i2.CommonModule,
                            i3.IntlModule,
                            i2$1.BsActionModule,
                        ],
                        declarations: [
                            BsNotification, BsNotifications, BsNotificationsManager
                        ],
                        exports: [
                            BsNotifications, BsNotificationsManager
                        ]
                    }]
            }], null, null);
    })();

    var en = {
        "notification": {
            "title": "Notifications",
            "showNotifications": "Show notifications",
            "hideNotifications": "Hide notifications",
            "clearNotifications": "Clear notifications",
        }
    };

    var fr = {
        "notification": {
            "title": "Notifications",
            "showNotifications": "Afficher les notifications",
            "hideNotifications": "Masquer les notifications",
            "clearNotifications": "Effacer les notifications",
        }
    };

    var de = {
        "notification": {
            "title": "Benachrichtigungen",
            "showNotifications": "Zeige Benachrichtigungen",
            "hideNotifications": "Benachrichtigungen verstecken",
            "clearNotifications": "Benachrichtigungen löschen",
        }
    };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BsNotification = BsNotification;
    exports.BsNotificationModule = BsNotificationModule;
    exports.BsNotifications = BsNotifications;
    exports.BsNotificationsManager = BsNotificationsManager;
    exports.deNotification = de;
    exports.enNotification = en;
    exports.frNotification = fr;
    exports.notificationAnimations = notificationAnimations;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-notification.umd.js.map
