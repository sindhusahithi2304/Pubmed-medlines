import { OnDestroy } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { MapOf } from "@sinequa/core/base";
import * as i0 from "@angular/core";
/**
 * Notification types.
 */
export declare const enum NotificationType {
    Success = 0,
    Info = 1,
    Warning = 2,
    Error = 3,
    Last = 3
}
/**
 * Notification visibility states.
 */
export declare const enum NotificationState {
    Initial = 0,
    Showing = 1,
    Hidden = 2
}
/**
 * Describes a notification object.
 */
export interface Notification {
    /**
     * The notification title.
     */
    title?: string;
    /**
     * The notification text.
     */
    text?: string;
    /**
     * Message parameters for the notification `text`.
     */
    params?: MapOf<any>;
    /**
     * Determines whether the notification should close automatically after a period.
     * The duration is determined by a particular UI implementation.
     */
    autoClose?: boolean;
    /**
     * The notification type.
     */
    type?: NotificationType;
    /**
     * The nofification state.
     */
    state?: NotificationState;
}
/**
 * Describes a base notification event.
 */
export interface NotificationEvent {
    /**
     * The possible notification event types.
     */
    type: "updated" | "data-updated";
}
/**
 * Describes a notification "updated" event. This event is emitted
 * when one or more notifications are added, shown, hidden or deleted.
 */
export interface UpdatedEvent extends NotificationEvent {
    type: "updated";
}
/**
 * Describes a data updated event. This event is emitted by the
 * [NotificationsService.set]{NotificationsService#set} method
 * is called.
 */
export interface DataUpdatedEvent extends NotificationEvent {
    type: "data-updated";
}
/**
 * This service provides methods for managing notifications. No user interface
 * is imposed. It also manages a key-value data store. Events are emitted
 * when the notifications and data store are updated.
 */
export declare class NotificationsService implements OnDestroy {
    protected data: MapOf<any>;
    /**
     * The current notifications.
     */
    notifications: Notification[];
    protected _events: Subject<UpdatedEvent | DataUpdatedEvent>;
    protected _notificationsStream: Subject<Notification>;
    constructor();
    ngOnDestroy(): void;
    /**
     * Get the obervable stream of notification events.
     */
    get events(): Observable<UpdatedEvent | DataUpdatedEvent>;
    /**
     * Get the observable stream of notifications. This will
     * emit each time a notification is added. It will also emit
     * `null` when notifications are deleted.
     */
    get notificationsStream(): Observable<Notification>;
    /**
     * Set a value in the data store. The `data-updated` event
     * is emitted.
     *
     * @param key The value's key.
     * @param value The value.
     */
    set(key: string, value: any): void;
    /**
     * Get a value from the data store.
     *
     * @param key The value's key.
     */
    get(key: string): any;
    /**
     * Increment a counter in the data store identified by the passed `key`.
     * The intial value is 0.
     *
     * @param key The key for the counter.
     */
    enter(key: string): void;
    /**
     * Decrement a counter in the data store identified by the passed `key`.
     * Calls to `leave` should match calls to `enter`. If the counter becomes negative
     * an "underflow" warning is emitted to the console and the counter set to 0.
     *
     * @param key The key for the counter.
     */
    leave(key: string): void;
    /**
     * `true` if there are current notifications.
     */
    get haveNotifications(): boolean;
    /**
     * `true` if the all current notifications are in the `Showing` state.
     */
    get allNotificationsShowing(): boolean;
    /**
     * `true` if all current notifications are in the `Hidden` state.
     */
    get allNotificationsHidden(): boolean;
    /**
     * Gets the last added notification.
     */
    get lastNotification(): Notification | undefined;
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
    notify(type: NotificationType, text: string, params?: MapOf<any>, title?: string, autoClose?: boolean): Notification;
    /**
     * Add a `Success` type notification. The notification will auto-close.
     *
     * @param text The notification message text.
     * @param params Parameters for the message text.
     * @param title The notification title.
     */
    success(text: string, params?: MapOf<any>, title?: string): Notification;
    /**
     * Add an `Info` type notification. The notification will auto-close.
     *
     * @param text The notification message text.
     * @param params Parameters for the message text.
     * @param title The notification title.
     */
    info(text: string, params?: MapOf<any>, title?: string): Notification;
    /**
     * Add a `Warning` type notification. The nofification will not auto-close.
     *
     * @param text The notification message text.
     * @param params Parameters for the message text.
     * @param title The notification title.
     */
    warning(text: string, params?: MapOf<any>, title?: string): Notification;
    /**
     * Add an `Error` type notification. The nofification will not auto-close.
     *
     * @param text The notification message text.
     * @param params Parameters for the message text.
     * @param title The notification title.
     */
    error(text: string, params?: MapOf<any>, title?: string): Notification;
    /**
     * Set the state of all notifications to `Showing`. The `updated` event is
     * emitted.
     */
    showNotifications(): void;
    /**
     * Set the state of all notifications to `Hidden`. The `updated` event is
     * emitted.
     */
    hideNotifications(): void;
    /**
     * Delete all notifications. The `updated` event is
     * emitted. `null` is emitted on the notifications stream.
     */
    deleteAllNotifications(): void;
    /**
     * Delete the passed `notification`. The `updated` event is
     * emitted. `null` is emitted on the notifications stream if no notifications
     * remain.
     *
     * @param notification The notification to delete.
     */
    deleteNotification(notification: Notification): void;
    /**
     * Close the passed `notification`. If the notification is in the
     * `Initial` state then its state is set to `Hidden` otherwise the
     * notification is deleted. The `updated` event is emitted.
     *
     * @param notification The notification to close.
     */
    closeNotification(notification: Notification): void;
    static ɵfac: i0.ɵɵFactoryDef<NotificationsService, never>;
    static ɵprov: i0.ɵɵInjectableDef<NotificationsService>;
}
//# sourceMappingURL=notifications.service.d.ts.map