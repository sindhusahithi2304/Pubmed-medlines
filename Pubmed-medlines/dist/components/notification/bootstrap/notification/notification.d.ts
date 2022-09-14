import { OnInit } from "@angular/core";
import { AnimationTriggerMetadata } from '@angular/animations';
import { NotificationsService, Notification } from "@sinequa/core/notification";
import * as i0 from "@angular/core";
export declare function notificationAnimations(timings: number | string): AnimationTriggerMetadata[];
export declare class BsNotification implements OnInit {
    private notificationsService;
    notification: Notification;
    autoClose: boolean;
    constructor(notificationsService: NotificationsService);
    ngOnInit(): void;
    get alertClass(): string;
    get notificationClass(): string;
    get showClose(): boolean;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsNotification, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsNotification, "sq-notification", never, { "notification": "notification"; }, {}, never, never>;
}
//# sourceMappingURL=notification.d.ts.map