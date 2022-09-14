(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@sinequa/core/base'), require('@angular/common/http'), require('rxjs/operators'), require('@sinequa/core/web-services')) :
    typeof define === 'function' && define.amd ? define('@sinequa/core/notification', ['exports', '@angular/core', 'rxjs', '@sinequa/core/base', '@angular/common/http', 'rxjs/operators', '@sinequa/core/web-services'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.core = global.sinequa.core || {}, global.sinequa.core.notification = {}), global.ng.core, global.rxjs, global.sinequa.core.base, global.ng.common.http, global.rxjs.operators, global.sinequa.core['web-services']));
}(this, (function (exports, i0, rxjs, base, http, operators, webServices) { 'use strict';

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

    /**
     * This service provides methods for managing notifications. No user interface
     * is imposed. It also manages a key-value data store. Events are emitted
     * when the notifications and data store are updated.
     */
    var NotificationsService = /** @class */ (function () {
        function NotificationsService() {
            this._events = new rxjs.Subject();
            this._notificationsStream = new rxjs.Subject();
            this.data = {};
            this.notifications = [];
        }
        NotificationsService.prototype.ngOnDestroy = function () {
            this._events.complete();
        };
        Object.defineProperty(NotificationsService.prototype, "events", {
            /**
             * Get the obervable stream of notification events.
             */
            get: function () {
                return this._events;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NotificationsService.prototype, "notificationsStream", {
            /**
             * Get the observable stream of notifications. This will
             * emit each time a notification is added. It will also emit
             * `null` when notifications are deleted.
             */
            get: function () {
                return this._notificationsStream;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Set a value in the data store. The `data-updated` event
         * is emitted.
         *
         * @param key The value's key.
         * @param value The value.
         */
        NotificationsService.prototype.set = function (key, value) {
            this.data[key] = value;
            this._events.next({ type: "data-updated" });
        };
        /**
         * Get a value from the data store.
         *
         * @param key The value's key.
         */
        NotificationsService.prototype.get = function (key) {
            return this.data[key];
        };
        /**
         * Increment a counter in the data store identified by the passed `key`.
         * The intial value is 0.
         *
         * @param key The key for the counter.
         */
        NotificationsService.prototype.enter = function (key) {
            var value = this.data[key];
            if (!value) {
                value = 0;
            }
            value++;
            this.set(key, value);
        };
        /**
         * Decrement a counter in the data store identified by the passed `key`.
         * Calls to `leave` should match calls to `enter`. If the counter becomes negative
         * an "underflow" warning is emitted to the console and the counter set to 0.
         *
         * @param key The key for the counter.
         */
        NotificationsService.prototype.leave = function (key) {
            var value = this.data[key];
            value--;
            if (value < 0) {
                console.warn("NotificationsService.leave underflow for:", key);
            }
            if (!value || value < 0) {
                value = 0;
            }
            this.set(key, value);
        };
        Object.defineProperty(NotificationsService.prototype, "haveNotifications", {
            /**
             * `true` if there are current notifications.
             */
            get: function () {
                return this.notifications.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NotificationsService.prototype, "allNotificationsShowing", {
            /**
             * `true` if the all current notifications are in the `Showing` state.
             */
            get: function () {
                var e_1, _a;
                try {
                    for (var _b = __values(this.notifications), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var notification = _c.value;
                        if (notification.state !== 1 /* Showing */) {
                            return false;
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
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NotificationsService.prototype, "allNotificationsHidden", {
            /**
             * `true` if all current notifications are in the `Hidden` state.
             */
            get: function () {
                var e_2, _a;
                try {
                    for (var _b = __values(this.notifications), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var notification = _c.value;
                        if (notification.state !== 2 /* Hidden */) {
                            return false;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NotificationsService.prototype, "lastNotification", {
            /**
             * Gets the last added notification.
             */
            get: function () {
                if (this.notifications.length > 0) {
                    return this.notifications[this.notifications.length - 1];
                }
                return undefined;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Add a notification. The `updated` event is emitted and the added notification
         * is emitted on the notifications stream.
         *
         * @param type The notification type.
         * @param text The notification message text.
         * @param params Parameters for the message text.
         * @param title The notification title.
         * @param autoClose A flag determining whether the notification should auto-close.
         */
        NotificationsService.prototype.notify = function (type, text, params, title, autoClose) {
            var notification = {
                type: type,
                text: text,
                params: params,
                title: title,
                autoClose: autoClose
            };
            // Replace the last notification if it is the same as the new one
            var lastNotification = this.lastNotification;
            if (lastNotification) {
                notification.state = lastNotification.state;
                if (base.Utils.equals(notification, lastNotification)) {
                    this.notifications.splice(this.notifications.length - 1, 1);
                }
            }
            notification.state = 0 /* Initial */;
            this.notifications.push(notification);
            this._events.next({ type: "updated" });
            this._notificationsStream.next(notification);
            return notification;
        };
        /**
         * Add a `Success` type notification. The notification will auto-close.
         *
         * @param text The notification message text.
         * @param params Parameters for the message text.
         * @param title The notification title.
         */
        NotificationsService.prototype.success = function (text, params, title) {
            return this.notify(0 /* Success */, text, params, title, true);
        };
        /**
         * Add an `Info` type notification. The notification will auto-close.
         *
         * @param text The notification message text.
         * @param params Parameters for the message text.
         * @param title The notification title.
         */
        NotificationsService.prototype.info = function (text, params, title) {
            return this.notify(1 /* Info */, text, params, title, true);
        };
        /**
         * Add a `Warning` type notification. The nofification will not auto-close.
         *
         * @param text The notification message text.
         * @param params Parameters for the message text.
         * @param title The notification title.
         */
        NotificationsService.prototype.warning = function (text, params, title) {
            return this.notify(2 /* Warning */, text, params, title, false);
        };
        /**
         * Add an `Error` type notification. The nofification will not auto-close.
         *
         * @param text The notification message text.
         * @param params Parameters for the message text.
         * @param title The notification title.
         */
        NotificationsService.prototype.error = function (text, params, title) {
            return this.notify(3 /* Error */, text, params, title, false);
        };
        /**
         * Set the state of all notifications to `Showing`. The `updated` event is
         * emitted.
         */
        NotificationsService.prototype.showNotifications = function () {
            var e_3, _a;
            try {
                for (var _b = __values(this.notifications), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var notification = _c.value;
                    notification.state = 1 /* Showing */;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            this._events.next({ type: "updated" });
        };
        /**
         * Set the state of all notifications to `Hidden`. The `updated` event is
         * emitted.
         */
        NotificationsService.prototype.hideNotifications = function () {
            var e_4, _a;
            try {
                for (var _b = __values(this.notifications), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var notification = _c.value;
                    notification.state = 2 /* Hidden */;
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
            this._events.next({ type: "updated" });
        };
        /**
         * Delete all notifications. The `updated` event is
         * emitted. `null` is emitted on the notifications stream.
         */
        NotificationsService.prototype.deleteAllNotifications = function () {
            this.notifications.splice(0);
            this._events.next({ type: "updated" });
            this._notificationsStream.next(undefined);
        };
        /**
         * Delete the passed `notification`. The `updated` event is
         * emitted. `null` is emitted on the notifications stream if no notifications
         * remain.
         *
         * @param notification The notification to delete.
         */
        NotificationsService.prototype.deleteNotification = function (notification) {
            for (var i = 0, ic = this.notifications.length; i < ic; i++) {
                if (this.notifications[i] === notification) {
                    this.notifications.splice(i, 1);
                    this._events.next({ type: "updated" });
                    if (this.notifications.length === 0) {
                        this._notificationsStream.next(undefined);
                    }
                    break;
                }
            }
        };
        /**
         * Close the passed `notification`. If the notification is in the
         * `Initial` state then its state is set to `Hidden` otherwise the
         * notification is deleted. The `updated` event is emitted.
         *
         * @param notification The notification to close.
         */
        NotificationsService.prototype.closeNotification = function (notification) {
            if (notification.state === 0 /* Initial */) {
                notification.state = 2 /* Hidden */;
                this._events.next({ type: "updated" });
            }
            else {
                this.deleteNotification(notification);
            }
        };
        return NotificationsService;
    }());
    NotificationsService.ɵfac = function NotificationsService_Factory(t) { return new (t || NotificationsService)(); };
    NotificationsService.ɵprov = i0.ɵɵdefineInjectable({ token: NotificationsService, factory: NotificationsService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NotificationsService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () { return []; }, null);
    })();

    /**
     * An `HttpInterceptor` to process notifications attached to the response body
     * in the `$notifications` member.
     */
    var NotificationsInterceptor = /** @class */ (function () {
        function NotificationsInterceptor(startConfig, notificationsService) {
            this.startConfig = startConfig;
            this.notificationsService = notificationsService;
        }
        NotificationsInterceptor.prototype.shouldIntercept = function (url) {
            return base.Utils.startsWith(url, this.startConfig.apiPath);
        };
        NotificationsInterceptor.prototype.processNotifications = function (notifications) {
            var e_1, _a;
            if (base.Utils.isArray(notifications)) {
                try {
                    for (var notifications_1 = __values(notifications), notifications_1_1 = notifications_1.next(); !notifications_1_1.done; notifications_1_1 = notifications_1.next()) {
                        var notification = notifications_1_1.value;
                        var type = notification.type;
                        if (base.Utils.isUndefined(type)) {
                            type = 1 /* Info */;
                        }
                        var text = notification.text;
                        if (text) {
                            var params = notification.params;
                            var title = notification.title;
                            var autoClose = notification.autoClose;
                            if (base.Utils.isUndefined(autoClose)) {
                                autoClose = (type === 0 /* Success */) || (type === 1 /* Info */);
                            }
                            this.notificationsService.notify(type, text, params, title, autoClose);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (notifications_1_1 && !notifications_1_1.done && (_a = notifications_1.return)) _a.call(notifications_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        NotificationsInterceptor.prototype.intercept = function (request, next) {
            var _this = this;
            if (!this.shouldIntercept(request.url)) {
                return next.handle(request);
            }
            return next.handle(request).pipe(operators.tap(function (event) {
                if (event instanceof http.HttpResponse) {
                    if (request.responseType === "json" && base.Utils.isObject(event.body)) {
                        _this.processNotifications(event.body.$notifications);
                    }
                }
            }));
        };
        return NotificationsInterceptor;
    }());
    NotificationsInterceptor.ɵfac = function NotificationsInterceptor_Factory(t) { return new (t || NotificationsInterceptor)(i0.ɵɵinject(webServices.START_CONFIG), i0.ɵɵinject(NotificationsService)); };
    NotificationsInterceptor.ɵprov = i0.ɵɵdefineInjectable({ token: NotificationsInterceptor, factory: NotificationsInterceptor.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NotificationsInterceptor, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [webServices.START_CONFIG]
                        }] }, { type: NotificationsService }];
        }, null);
    })();

    var NOTIFICATION_MODULE_PROVIDERS = [];

    /**
     * This module provides a service for managing notifications. It is used by the
     * Sinequa runtime and can also be used for application-specific purposes.
     *
     * The {@link NotificationsInterceptor} in this module should be registered using `HTTP_INTERCEPTORS` in your app module.
     */
    var NotificationModule = /** @class */ (function () {
        function NotificationModule() {
        }
        return NotificationModule;
    }());
    NotificationModule.ɵmod = i0.ɵɵdefineNgModule({ type: NotificationModule });
    NotificationModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NotificationModule_Factory(t) { return new (t || NotificationModule)(); }, providers: __spread(NOTIFICATION_MODULE_PROVIDERS), imports: [[]] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NotificationModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [],
                        declarations: [],
                        exports: [],
                        providers: __spread(NOTIFICATION_MODULE_PROVIDERS)
                    }]
            }], null, null);
    })();

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NotificationModule = NotificationModule;
    exports.NotificationsInterceptor = NotificationsInterceptor;
    exports.NotificationsService = NotificationsService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-core-notification.umd.js.map
