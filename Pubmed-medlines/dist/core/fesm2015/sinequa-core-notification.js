import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵinject, Inject, ɵɵdefineNgModule, ɵɵdefineInjector, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { Utils } from '@sinequa/core/base';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { START_CONFIG } from '@sinequa/core/web-services';

/**
 * This service provides methods for managing notifications. No user interface
 * is imposed. It also manages a key-value data store. Events are emitted
 * when the notifications and data store are updated.
 */
class NotificationsService {
    constructor() {
        this._events = new Subject();
        this._notificationsStream = new Subject();
        this.data = {};
        this.notifications = [];
    }
    ngOnDestroy() {
        this._events.complete();
    }
    /**
     * Get the obervable stream of notification events.
     */
    get events() {
        return this._events;
    }
    /**
     * Get the observable stream of notifications. This will
     * emit each time a notification is added. It will also emit
     * `null` when notifications are deleted.
     */
    get notificationsStream() {
        return this._notificationsStream;
    }
    /**
     * Set a value in the data store. The `data-updated` event
     * is emitted.
     *
     * @param key The value's key.
     * @param value The value.
     */
    set(key, value) {
        this.data[key] = value;
        this._events.next({ type: "data-updated" });
    }
    /**
     * Get a value from the data store.
     *
     * @param key The value's key.
     */
    get(key) {
        return this.data[key];
    }
    /**
     * Increment a counter in the data store identified by the passed `key`.
     * The intial value is 0.
     *
     * @param key The key for the counter.
     */
    enter(key) {
        let value = this.data[key];
        if (!value) {
            value = 0;
        }
        value++;
        this.set(key, value);
    }
    /**
     * Decrement a counter in the data store identified by the passed `key`.
     * Calls to `leave` should match calls to `enter`. If the counter becomes negative
     * an "underflow" warning is emitted to the console and the counter set to 0.
     *
     * @param key The key for the counter.
     */
    leave(key) {
        let value = this.data[key];
        value--;
        if (value < 0) {
            console.warn("NotificationsService.leave underflow for:", key);
        }
        if (!value || value < 0) {
            value = 0;
        }
        this.set(key, value);
    }
    /**
     * `true` if there are current notifications.
     */
    get haveNotifications() {
        return this.notifications.length > 0;
    }
    /**
     * `true` if the all current notifications are in the `Showing` state.
     */
    get allNotificationsShowing() {
        for (const notification of this.notifications) {
            if (notification.state !== 1 /* Showing */) {
                return false;
            }
        }
        return true;
    }
    /**
     * `true` if all current notifications are in the `Hidden` state.
     */
    get allNotificationsHidden() {
        for (const notification of this.notifications) {
            if (notification.state !== 2 /* Hidden */) {
                return false;
            }
        }
        return true;
    }
    /**
     * Gets the last added notification.
     */
    get lastNotification() {
        if (this.notifications.length > 0) {
            return this.notifications[this.notifications.length - 1];
        }
        return undefined;
    }
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
    notify(type, text, params, title, autoClose) {
        const notification = {
            type,
            text,
            params,
            title,
            autoClose
        };
        // Replace the last notification if it is the same as the new one
        const lastNotification = this.lastNotification;
        if (lastNotification) {
            notification.state = lastNotification.state;
            if (Utils.equals(notification, lastNotification)) {
                this.notifications.splice(this.notifications.length - 1, 1);
            }
        }
        notification.state = 0 /* Initial */;
        this.notifications.push(notification);
        this._events.next({ type: "updated" });
        this._notificationsStream.next(notification);
        return notification;
    }
    /**
     * Add a `Success` type notification. The notification will auto-close.
     *
     * @param text The notification message text.
     * @param params Parameters for the message text.
     * @param title The notification title.
     */
    success(text, params, title) {
        return this.notify(0 /* Success */, text, params, title, true);
    }
    /**
     * Add an `Info` type notification. The notification will auto-close.
     *
     * @param text The notification message text.
     * @param params Parameters for the message text.
     * @param title The notification title.
     */
    info(text, params, title) {
        return this.notify(1 /* Info */, text, params, title, true);
    }
    /**
     * Add a `Warning` type notification. The nofification will not auto-close.
     *
     * @param text The notification message text.
     * @param params Parameters for the message text.
     * @param title The notification title.
     */
    warning(text, params, title) {
        return this.notify(2 /* Warning */, text, params, title, false);
    }
    /**
     * Add an `Error` type notification. The nofification will not auto-close.
     *
     * @param text The notification message text.
     * @param params Parameters for the message text.
     * @param title The notification title.
     */
    error(text, params, title) {
        return this.notify(3 /* Error */, text, params, title, false);
    }
    /**
     * Set the state of all notifications to `Showing`. The `updated` event is
     * emitted.
     */
    showNotifications() {
        for (const notification of this.notifications) {
            notification.state = 1 /* Showing */;
        }
        this._events.next({ type: "updated" });
    }
    /**
     * Set the state of all notifications to `Hidden`. The `updated` event is
     * emitted.
     */
    hideNotifications() {
        for (const notification of this.notifications) {
            notification.state = 2 /* Hidden */;
        }
        this._events.next({ type: "updated" });
    }
    /**
     * Delete all notifications. The `updated` event is
     * emitted. `null` is emitted on the notifications stream.
     */
    deleteAllNotifications() {
        this.notifications.splice(0);
        this._events.next({ type: "updated" });
        this._notificationsStream.next(undefined);
    }
    /**
     * Delete the passed `notification`. The `updated` event is
     * emitted. `null` is emitted on the notifications stream if no notifications
     * remain.
     *
     * @param notification The notification to delete.
     */
    deleteNotification(notification) {
        for (let i = 0, ic = this.notifications.length; i < ic; i++) {
            if (this.notifications[i] === notification) {
                this.notifications.splice(i, 1);
                this._events.next({ type: "updated" });
                if (this.notifications.length === 0) {
                    this._notificationsStream.next(undefined);
                }
                break;
            }
        }
    }
    /**
     * Close the passed `notification`. If the notification is in the
     * `Initial` state then its state is set to `Hidden` otherwise the
     * notification is deleted. The `updated` event is emitted.
     *
     * @param notification The notification to close.
     */
    closeNotification(notification) {
        if (notification.state === 0 /* Initial */) {
            notification.state = 2 /* Hidden */;
            this._events.next({ type: "updated" });
        }
        else {
            this.deleteNotification(notification);
        }
    }
}
NotificationsService.ɵfac = function NotificationsService_Factory(t) { return new (t || NotificationsService)(); };
NotificationsService.ɵprov = ɵɵdefineInjectable({ token: NotificationsService, factory: NotificationsService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(NotificationsService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return []; }, null); })();

/**
 * An `HttpInterceptor` to process notifications attached to the response body
 * in the `$notifications` member.
 */
class NotificationsInterceptor {
    constructor(startConfig, notificationsService) {
        this.startConfig = startConfig;
        this.notificationsService = notificationsService;
    }
    shouldIntercept(url) {
        return Utils.startsWith(url, this.startConfig.apiPath);
    }
    processNotifications(notifications) {
        if (Utils.isArray(notifications)) {
            for (const notification of notifications) {
                let type = notification.type;
                if (Utils.isUndefined(type)) {
                    type = 1 /* Info */;
                }
                const text = notification.text;
                if (text) {
                    const params = notification.params;
                    const title = notification.title;
                    let autoClose = notification.autoClose;
                    if (Utils.isUndefined(autoClose)) {
                        autoClose = (type === 0 /* Success */) || (type === 1 /* Info */);
                    }
                    this.notificationsService.notify(type, text, params, title, autoClose);
                }
            }
        }
    }
    intercept(request, next) {
        if (!this.shouldIntercept(request.url)) {
            return next.handle(request);
        }
        return next.handle(request).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                if (request.responseType === "json" && Utils.isObject(event.body)) {
                    this.processNotifications(event.body.$notifications);
                }
            }
        }));
    }
}
NotificationsInterceptor.ɵfac = function NotificationsInterceptor_Factory(t) { return new (t || NotificationsInterceptor)(ɵɵinject(START_CONFIG), ɵɵinject(NotificationsService)); };
NotificationsInterceptor.ɵprov = ɵɵdefineInjectable({ token: NotificationsInterceptor, factory: NotificationsInterceptor.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(NotificationsInterceptor, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: NotificationsService }]; }, null); })();

const NOTIFICATION_MODULE_PROVIDERS = [];

/**
 * This module provides a service for managing notifications. It is used by the
 * Sinequa runtime and can also be used for application-specific purposes.
 *
 * The {@link NotificationsInterceptor} in this module should be registered using `HTTP_INTERCEPTORS` in your app module.
 */
class NotificationModule {
}
NotificationModule.ɵmod = ɵɵdefineNgModule({ type: NotificationModule });
NotificationModule.ɵinj = ɵɵdefineInjector({ factory: function NotificationModule_Factory(t) { return new (t || NotificationModule)(); }, providers: [
        ...NOTIFICATION_MODULE_PROVIDERS
    ], imports: [[]] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(NotificationModule, [{
        type: NgModule,
        args: [{
                imports: [],
                declarations: [],
                exports: [],
                providers: [
                    ...NOTIFICATION_MODULE_PROVIDERS
                ]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { NotificationModule, NotificationsInterceptor, NotificationsService };
//# sourceMappingURL=sinequa-core-notification.js.map
