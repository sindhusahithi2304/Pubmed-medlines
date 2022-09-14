import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
/**
 * This service provides methods for managing notifications. No user interface
 * is imposed. It also manages a key-value data store. Events are emitted
 * when the notifications and data store are updated.
 */
export class NotificationsService {
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
NotificationsService.ɵprov = i0.ɵɵdefineInjectable({ token: NotificationsService, factory: NotificationsService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NotificationsService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvbm90aWZpY2F0aW9uLyIsInNvdXJjZXMiOlsibm90aWZpY2F0aW9ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFDLE9BQU8sRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQUMsS0FBSyxFQUFRLE1BQU0sb0JBQW9CLENBQUM7O0FBZ0ZoRDs7OztHQUlHO0FBSUgsTUFBTSxPQUFPLG9CQUFvQjtJQVM3QjtRQUhVLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBbUMsQ0FBQztRQUN6RCx5QkFBb0IsR0FBRyxJQUFJLE9BQU8sRUFBZ0IsQ0FBQztRQUd6RCxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJLG1CQUFtQjtRQUNuQixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsR0FBRyxDQUFDLEdBQVcsRUFBRSxLQUFVO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLGNBQWMsRUFBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxHQUFHLENBQUMsR0FB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Ozs7Ozs7T0FNRztJQUNILGlCQUFpQixDQUFDLFlBQTBCO1FBQ3hDLElBQUksWUFBWSxDQUFDLEtBQUssb0JBQThCLEVBQUU7WUFDbEQsWUFBWSxDQUFDLEtBQUssaUJBQTJCLENBQUM7WUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztTQUN4QzthQUNJO1lBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3pDO0lBQ0wsQ0FBQzs7d0ZBbFJRLG9CQUFvQjs0REFBcEIsb0JBQW9CLFdBQXBCLG9CQUFvQixtQkFGakIsTUFBTTtrREFFVCxvQkFBb0I7Y0FIaEMsVUFBVTtlQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBPbkRlc3Ryb3l9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1N1YmplY3QsIE9ic2VydmFibGV9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1V0aWxzLCBNYXBPZn0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuXG4vKipcbiAqIE5vdGlmaWNhdGlvbiB0eXBlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gTm90aWZpY2F0aW9uVHlwZSB7XG4gICAgU3VjY2VzcyxcbiAgICBJbmZvLFxuICAgIFdhcm5pbmcsXG4gICAgRXJyb3IsXG4gICAgTGFzdCA9IEVycm9yXG59XG5cbi8qKlxuICogTm90aWZpY2F0aW9uIHZpc2liaWxpdHkgc3RhdGVzLlxuICovXG5leHBvcnQgY29uc3QgZW51bSBOb3RpZmljYXRpb25TdGF0ZSB7XG4gICAgSW5pdGlhbCxcbiAgICBTaG93aW5nLFxuICAgIEhpZGRlblxufVxuXG4vKipcbiAqIERlc2NyaWJlcyBhIG5vdGlmaWNhdGlvbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTm90aWZpY2F0aW9uIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbm90aWZpY2F0aW9uIHRpdGxlLlxuICAgICAqL1xuICAgIHRpdGxlPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBub3RpZmljYXRpb24gdGV4dC5cbiAgICAgKi9cbiAgICB0ZXh0Pzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIE1lc3NhZ2UgcGFyYW1ldGVycyBmb3IgdGhlIG5vdGlmaWNhdGlvbiBgdGV4dGAuXG4gICAgICovXG4gICAgcGFyYW1zPzogTWFwT2Y8YW55PjtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIG5vdGlmaWNhdGlvbiBzaG91bGQgY2xvc2UgYXV0b21hdGljYWxseSBhZnRlciBhIHBlcmlvZC5cbiAgICAgKiBUaGUgZHVyYXRpb24gaXMgZGV0ZXJtaW5lZCBieSBhIHBhcnRpY3VsYXIgVUkgaW1wbGVtZW50YXRpb24uXG4gICAgICovXG4gICAgYXV0b0Nsb3NlPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBUaGUgbm90aWZpY2F0aW9uIHR5cGUuXG4gICAgICovXG4gICAgdHlwZT86IE5vdGlmaWNhdGlvblR5cGU7XG4gICAgLyoqXG4gICAgICogVGhlIG5vZmlmaWNhdGlvbiBzdGF0ZS5cbiAgICAgKi9cbiAgICBzdGF0ZT86IE5vdGlmaWNhdGlvblN0YXRlO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyBhIGJhc2Ugbm90aWZpY2F0aW9uIGV2ZW50LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmaWNhdGlvbkV2ZW50IHtcbiAgICAvKipcbiAgICAgKiBUaGUgcG9zc2libGUgbm90aWZpY2F0aW9uIGV2ZW50IHR5cGVzLlxuICAgICAqL1xuICAgIHR5cGU6IFwidXBkYXRlZFwiIHwgXCJkYXRhLXVwZGF0ZWRcIjtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgYSBub3RpZmljYXRpb24gXCJ1cGRhdGVkXCIgZXZlbnQuIFRoaXMgZXZlbnQgaXMgZW1pdHRlZFxuICogd2hlbiBvbmUgb3IgbW9yZSBub3RpZmljYXRpb25zIGFyZSBhZGRlZCwgc2hvd24sIGhpZGRlbiBvciBkZWxldGVkLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZWRFdmVudCBleHRlbmRzIE5vdGlmaWNhdGlvbkV2ZW50IHtcbiAgICB0eXBlOiBcInVwZGF0ZWRcIjtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgYSBkYXRhIHVwZGF0ZWQgZXZlbnQuIFRoaXMgZXZlbnQgaXMgZW1pdHRlZCBieSB0aGVcbiAqIFtOb3RpZmljYXRpb25zU2VydmljZS5zZXRde05vdGlmaWNhdGlvbnNTZXJ2aWNlI3NldH0gbWV0aG9kXG4gKiBpcyBjYWxsZWQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YVVwZGF0ZWRFdmVudCBleHRlbmRzIE5vdGlmaWNhdGlvbkV2ZW50IHtcbiAgICB0eXBlOiBcImRhdGEtdXBkYXRlZFwiO1xufVxuXG4vKipcbiAqIFRoaXMgc2VydmljZSBwcm92aWRlcyBtZXRob2RzIGZvciBtYW5hZ2luZyBub3RpZmljYXRpb25zLiBObyB1c2VyIGludGVyZmFjZVxuICogaXMgaW1wb3NlZC4gSXQgYWxzbyBtYW5hZ2VzIGEga2V5LXZhbHVlIGRhdGEgc3RvcmUuIEV2ZW50cyBhcmUgZW1pdHRlZFxuICogd2hlbiB0aGUgbm90aWZpY2F0aW9ucyBhbmQgZGF0YSBzdG9yZSBhcmUgdXBkYXRlZC5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46IFwicm9vdFwiXG59KVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbnNTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICBwcm90ZWN0ZWQgZGF0YTogTWFwT2Y8YW55PjtcbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBub3RpZmljYXRpb25zLlxuICAgICAqL1xuICAgIG5vdGlmaWNhdGlvbnM6IE5vdGlmaWNhdGlvbltdO1xuICAgIHByb3RlY3RlZCBfZXZlbnRzID0gbmV3IFN1YmplY3Q8VXBkYXRlZEV2ZW50IHwgRGF0YVVwZGF0ZWRFdmVudD4oKTtcbiAgICBwcm90ZWN0ZWQgX25vdGlmaWNhdGlvbnNTdHJlYW0gPSBuZXcgU3ViamVjdDxOb3RpZmljYXRpb24+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kYXRhID0ge307XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IFtdO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9ldmVudHMuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG9iZXJ2YWJsZSBzdHJlYW0gb2Ygbm90aWZpY2F0aW9uIGV2ZW50cy5cbiAgICAgKi9cbiAgICBnZXQgZXZlbnRzKCk6IE9ic2VydmFibGU8VXBkYXRlZEV2ZW50IHwgRGF0YVVwZGF0ZWRFdmVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgb2JzZXJ2YWJsZSBzdHJlYW0gb2Ygbm90aWZpY2F0aW9ucy4gVGhpcyB3aWxsXG4gICAgICogZW1pdCBlYWNoIHRpbWUgYSBub3RpZmljYXRpb24gaXMgYWRkZWQuIEl0IHdpbGwgYWxzbyBlbWl0XG4gICAgICogYG51bGxgIHdoZW4gbm90aWZpY2F0aW9ucyBhcmUgZGVsZXRlZC5cbiAgICAgKi9cbiAgICBnZXQgbm90aWZpY2F0aW9uc1N0cmVhbSgpOiBPYnNlcnZhYmxlPE5vdGlmaWNhdGlvbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbm90aWZpY2F0aW9uc1N0cmVhbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYSB2YWx1ZSBpbiB0aGUgZGF0YSBzdG9yZS4gVGhlIGBkYXRhLXVwZGF0ZWRgIGV2ZW50XG4gICAgICogaXMgZW1pdHRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXkgVGhlIHZhbHVlJ3Mga2V5LlxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUuXG4gICAgICovXG4gICAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KHt0eXBlOiBcImRhdGEtdXBkYXRlZFwifSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgdmFsdWUgZnJvbSB0aGUgZGF0YSBzdG9yZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXkgVGhlIHZhbHVlJ3Mga2V5LlxuICAgICAqL1xuICAgIGdldChrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFba2V5XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbmNyZW1lbnQgYSBjb3VudGVyIGluIHRoZSBkYXRhIHN0b3JlIGlkZW50aWZpZWQgYnkgdGhlIHBhc3NlZCBga2V5YC5cbiAgICAgKiBUaGUgaW50aWFsIHZhbHVlIGlzIDAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkgZm9yIHRoZSBjb3VudGVyLlxuICAgICAqL1xuICAgIGVudGVyKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZGF0YVtrZXldO1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUrKztcbiAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVjcmVtZW50IGEgY291bnRlciBpbiB0aGUgZGF0YSBzdG9yZSBpZGVudGlmaWVkIGJ5IHRoZSBwYXNzZWQgYGtleWAuXG4gICAgICogQ2FsbHMgdG8gYGxlYXZlYCBzaG91bGQgbWF0Y2ggY2FsbHMgdG8gYGVudGVyYC4gSWYgdGhlIGNvdW50ZXIgYmVjb21lcyBuZWdhdGl2ZVxuICAgICAqIGFuIFwidW5kZXJmbG93XCIgd2FybmluZyBpcyBlbWl0dGVkIHRvIHRoZSBjb25zb2xlIGFuZCB0aGUgY291bnRlciBzZXQgdG8gMC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXkgVGhlIGtleSBmb3IgdGhlIGNvdW50ZXIuXG4gICAgICovXG4gICAgbGVhdmUoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5kYXRhW2tleV07XG4gICAgICAgIHZhbHVlLS07XG4gICAgICAgIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIk5vdGlmaWNhdGlvbnNTZXJ2aWNlLmxlYXZlIHVuZGVyZmxvdyBmb3I6XCIsIGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA8IDApIHtcbiAgICAgICAgICAgIHZhbHVlID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldChrZXksIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBgdHJ1ZWAgaWYgdGhlcmUgYXJlIGN1cnJlbnQgbm90aWZpY2F0aW9ucy5cbiAgICAgKi9cbiAgICBnZXQgaGF2ZU5vdGlmaWNhdGlvbnMoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vdGlmaWNhdGlvbnMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBgdHJ1ZWAgaWYgdGhlIGFsbCBjdXJyZW50IG5vdGlmaWNhdGlvbnMgYXJlIGluIHRoZSBgU2hvd2luZ2Agc3RhdGUuXG4gICAgICovXG4gICAgZ2V0IGFsbE5vdGlmaWNhdGlvbnNTaG93aW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IgKGNvbnN0IG5vdGlmaWNhdGlvbiBvZiB0aGlzLm5vdGlmaWNhdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChub3RpZmljYXRpb24uc3RhdGUgIT09IE5vdGlmaWNhdGlvblN0YXRlLlNob3dpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYHRydWVgIGlmIGFsbCBjdXJyZW50IG5vdGlmaWNhdGlvbnMgYXJlIGluIHRoZSBgSGlkZGVuYCBzdGF0ZS5cbiAgICAgKi9cbiAgICBnZXQgYWxsTm90aWZpY2F0aW9uc0hpZGRlbigpOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChjb25zdCBub3RpZmljYXRpb24gb2YgdGhpcy5ub3RpZmljYXRpb25zKSB7XG4gICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uLnN0YXRlICE9PSBOb3RpZmljYXRpb25TdGF0ZS5IaWRkZW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbGFzdCBhZGRlZCBub3RpZmljYXRpb24uXG4gICAgICovXG4gICAgZ2V0IGxhc3ROb3RpZmljYXRpb24oKTogTm90aWZpY2F0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHRoaXMubm90aWZpY2F0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub3RpZmljYXRpb25zW3RoaXMubm90aWZpY2F0aW9ucy5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIG5vdGlmaWNhdGlvbi4gVGhlIGB1cGRhdGVkYCBldmVudCBpcyBlbWl0dGVkIGFuZCB0aGUgYWRkZWQgbm90aWZpY2F0aW9uXG4gICAgICogaXMgZW1pdHRlZCBvbiB0aGUgbm90aWZpY2F0aW9ucyBzdHJlYW0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdHlwZSBUaGUgbm90aWZpY2F0aW9uIHR5cGUuXG4gICAgICogQHBhcmFtIHRleHQgVGhlIG5vdGlmaWNhdGlvbiBtZXNzYWdlIHRleHQuXG4gICAgICogQHBhcmFtIHBhcmFtcyBQYXJhbWV0ZXJzIGZvciB0aGUgbWVzc2FnZSB0ZXh0LlxuICAgICAqIEBwYXJhbSB0aXRsZSBUaGUgbm90aWZpY2F0aW9uIHRpdGxlLlxuICAgICAqIEBwYXJhbSBhdXRvQ2xvc2UgQSBmbGFnIGRldGVybWluaW5nIHdoZXRoZXIgdGhlIG5vdGlmaWNhdGlvbiBzaG91bGQgYXV0by1jbG9zZS5cbiAgICAgKi9cbiAgICBub3RpZnkodHlwZTogTm90aWZpY2F0aW9uVHlwZSwgdGV4dDogc3RyaW5nLCBwYXJhbXM/OiBNYXBPZjxhbnk+LCB0aXRsZT86IHN0cmluZywgYXV0b0Nsb3NlPzogYm9vbGVhbik6IE5vdGlmaWNhdGlvbiB7XG4gICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uID0ge1xuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHRleHQsXG4gICAgICAgICAgICBwYXJhbXMsXG4gICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgIGF1dG9DbG9zZVxuICAgICAgICB9O1xuICAgICAgICAvLyBSZXBsYWNlIHRoZSBsYXN0IG5vdGlmaWNhdGlvbiBpZiBpdCBpcyB0aGUgc2FtZSBhcyB0aGUgbmV3IG9uZVxuICAgICAgICBjb25zdCBsYXN0Tm90aWZpY2F0aW9uID0gdGhpcy5sYXN0Tm90aWZpY2F0aW9uO1xuICAgICAgICBpZiAobGFzdE5vdGlmaWNhdGlvbikge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uLnN0YXRlID0gbGFzdE5vdGlmaWNhdGlvbi5zdGF0ZTtcbiAgICAgICAgICAgIGlmIChVdGlscy5lcXVhbHMobm90aWZpY2F0aW9uLCBsYXN0Tm90aWZpY2F0aW9uKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9ucy5zcGxpY2UodGhpcy5ub3RpZmljYXRpb25zLmxlbmd0aCAtIDEsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG5vdGlmaWNhdGlvbi5zdGF0ZSA9IE5vdGlmaWNhdGlvblN0YXRlLkluaXRpYWw7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucy5wdXNoKG5vdGlmaWNhdGlvbik7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KHt0eXBlOiBcInVwZGF0ZWRcIn0pO1xuICAgICAgICB0aGlzLl9ub3RpZmljYXRpb25zU3RyZWFtLm5leHQobm90aWZpY2F0aW9uKTtcbiAgICAgICAgcmV0dXJuIG5vdGlmaWNhdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBgU3VjY2Vzc2AgdHlwZSBub3RpZmljYXRpb24uIFRoZSBub3RpZmljYXRpb24gd2lsbCBhdXRvLWNsb3NlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRleHQgVGhlIG5vdGlmaWNhdGlvbiBtZXNzYWdlIHRleHQuXG4gICAgICogQHBhcmFtIHBhcmFtcyBQYXJhbWV0ZXJzIGZvciB0aGUgbWVzc2FnZSB0ZXh0LlxuICAgICAqIEBwYXJhbSB0aXRsZSBUaGUgbm90aWZpY2F0aW9uIHRpdGxlLlxuICAgICAqL1xuICAgIHN1Y2Nlc3ModGV4dDogc3RyaW5nLCBwYXJhbXM/OiBNYXBPZjxhbnk+LCB0aXRsZT86IHN0cmluZyk6IE5vdGlmaWNhdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vdGlmeShOb3RpZmljYXRpb25UeXBlLlN1Y2Nlc3MsIHRleHQsIHBhcmFtcywgdGl0bGUsIHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhbiBgSW5mb2AgdHlwZSBub3RpZmljYXRpb24uIFRoZSBub3RpZmljYXRpb24gd2lsbCBhdXRvLWNsb3NlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRleHQgVGhlIG5vdGlmaWNhdGlvbiBtZXNzYWdlIHRleHQuXG4gICAgICogQHBhcmFtIHBhcmFtcyBQYXJhbWV0ZXJzIGZvciB0aGUgbWVzc2FnZSB0ZXh0LlxuICAgICAqIEBwYXJhbSB0aXRsZSBUaGUgbm90aWZpY2F0aW9uIHRpdGxlLlxuICAgICAqL1xuICAgIGluZm8odGV4dDogc3RyaW5nLCBwYXJhbXM/OiBNYXBPZjxhbnk+LCB0aXRsZT86IHN0cmluZyk6IE5vdGlmaWNhdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vdGlmeShOb3RpZmljYXRpb25UeXBlLkluZm8sIHRleHQsIHBhcmFtcywgdGl0bGUsIHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIGBXYXJuaW5nYCB0eXBlIG5vdGlmaWNhdGlvbi4gVGhlIG5vZmlmaWNhdGlvbiB3aWxsIG5vdCBhdXRvLWNsb3NlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRleHQgVGhlIG5vdGlmaWNhdGlvbiBtZXNzYWdlIHRleHQuXG4gICAgICogQHBhcmFtIHBhcmFtcyBQYXJhbWV0ZXJzIGZvciB0aGUgbWVzc2FnZSB0ZXh0LlxuICAgICAqIEBwYXJhbSB0aXRsZSBUaGUgbm90aWZpY2F0aW9uIHRpdGxlLlxuICAgICAqL1xuICAgIHdhcm5pbmcodGV4dDogc3RyaW5nLCBwYXJhbXM/OiBNYXBPZjxhbnk+LCB0aXRsZT86IHN0cmluZyk6IE5vdGlmaWNhdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vdGlmeShOb3RpZmljYXRpb25UeXBlLldhcm5pbmcsIHRleHQsIHBhcmFtcywgdGl0bGUsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYW4gYEVycm9yYCB0eXBlIG5vdGlmaWNhdGlvbi4gVGhlIG5vZmlmaWNhdGlvbiB3aWxsIG5vdCBhdXRvLWNsb3NlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRleHQgVGhlIG5vdGlmaWNhdGlvbiBtZXNzYWdlIHRleHQuXG4gICAgICogQHBhcmFtIHBhcmFtcyBQYXJhbWV0ZXJzIGZvciB0aGUgbWVzc2FnZSB0ZXh0LlxuICAgICAqIEBwYXJhbSB0aXRsZSBUaGUgbm90aWZpY2F0aW9uIHRpdGxlLlxuICAgICAqL1xuICAgIGVycm9yKHRleHQ6IHN0cmluZywgcGFyYW1zPzogTWFwT2Y8YW55PiwgdGl0bGU/OiBzdHJpbmcpOiBOb3RpZmljYXRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5ub3RpZnkoTm90aWZpY2F0aW9uVHlwZS5FcnJvciwgdGV4dCwgcGFyYW1zLCB0aXRsZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgc3RhdGUgb2YgYWxsIG5vdGlmaWNhdGlvbnMgdG8gYFNob3dpbmdgLiBUaGUgYHVwZGF0ZWRgIGV2ZW50IGlzXG4gICAgICogZW1pdHRlZC5cbiAgICAgKi9cbiAgICBzaG93Tm90aWZpY2F0aW9ucygpIHtcbiAgICAgICAgZm9yIChjb25zdCBub3RpZmljYXRpb24gb2YgdGhpcy5ub3RpZmljYXRpb25zKSB7XG4gICAgICAgICAgICBub3RpZmljYXRpb24uc3RhdGUgPSBOb3RpZmljYXRpb25TdGF0ZS5TaG93aW5nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KHt0eXBlOiBcInVwZGF0ZWRcIn0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgc3RhdGUgb2YgYWxsIG5vdGlmaWNhdGlvbnMgdG8gYEhpZGRlbmAuIFRoZSBgdXBkYXRlZGAgZXZlbnQgaXNcbiAgICAgKiBlbWl0dGVkLlxuICAgICAqL1xuICAgIGhpZGVOb3RpZmljYXRpb25zKCkge1xuICAgICAgICBmb3IgKGNvbnN0IG5vdGlmaWNhdGlvbiBvZiB0aGlzLm5vdGlmaWNhdGlvbnMpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5zdGF0ZSA9IE5vdGlmaWNhdGlvblN0YXRlLkhpZGRlbjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZTogXCJ1cGRhdGVkXCJ9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgYWxsIG5vdGlmaWNhdGlvbnMuIFRoZSBgdXBkYXRlZGAgZXZlbnQgaXNcbiAgICAgKiBlbWl0dGVkLiBgbnVsbGAgaXMgZW1pdHRlZCBvbiB0aGUgbm90aWZpY2F0aW9ucyBzdHJlYW0uXG4gICAgICovXG4gICAgZGVsZXRlQWxsTm90aWZpY2F0aW9ucygpIHtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zLnNwbGljZSgwKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoe3R5cGU6IFwidXBkYXRlZFwifSk7XG4gICAgICAgIHRoaXMuX25vdGlmaWNhdGlvbnNTdHJlYW0ubmV4dCh1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSB0aGUgcGFzc2VkIGBub3RpZmljYXRpb25gLiBUaGUgYHVwZGF0ZWRgIGV2ZW50IGlzXG4gICAgICogZW1pdHRlZC4gYG51bGxgIGlzIGVtaXR0ZWQgb24gdGhlIG5vdGlmaWNhdGlvbnMgc3RyZWFtIGlmIG5vIG5vdGlmaWNhdGlvbnNcbiAgICAgKiByZW1haW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm90aWZpY2F0aW9uIFRoZSBub3RpZmljYXRpb24gdG8gZGVsZXRlLlxuICAgICAqL1xuICAgIGRlbGV0ZU5vdGlmaWNhdGlvbihub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbikge1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgaWMgPSB0aGlzLm5vdGlmaWNhdGlvbnMubGVuZ3RoOyBpIDwgaWM7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMubm90aWZpY2F0aW9uc1tpXSA9PT0gbm90aWZpY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZTogXCJ1cGRhdGVkXCJ9KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub3RpZmljYXRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ub3RpZmljYXRpb25zU3RyZWFtLm5leHQodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbG9zZSB0aGUgcGFzc2VkIGBub3RpZmljYXRpb25gLiBJZiB0aGUgbm90aWZpY2F0aW9uIGlzIGluIHRoZVxuICAgICAqIGBJbml0aWFsYCBzdGF0ZSB0aGVuIGl0cyBzdGF0ZSBpcyBzZXQgdG8gYEhpZGRlbmAgb3RoZXJ3aXNlIHRoZVxuICAgICAqIG5vdGlmaWNhdGlvbiBpcyBkZWxldGVkLiBUaGUgYHVwZGF0ZWRgIGV2ZW50IGlzIGVtaXR0ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm90aWZpY2F0aW9uIFRoZSBub3RpZmljYXRpb24gdG8gY2xvc2UuXG4gICAgICovXG4gICAgY2xvc2VOb3RpZmljYXRpb24obm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb24pIHtcbiAgICAgICAgaWYgKG5vdGlmaWNhdGlvbi5zdGF0ZSA9PT0gTm90aWZpY2F0aW9uU3RhdGUuSW5pdGlhbCkge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uLnN0YXRlID0gTm90aWZpY2F0aW9uU3RhdGUuSGlkZGVuO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoe3R5cGU6IFwidXBkYXRlZFwifSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZU5vdGlmaWNhdGlvbihub3RpZmljYXRpb24pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19