import { OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { NotificationsService, Notification } from "@sinequa/core/notification";
import * as i0 from "@angular/core";
export declare class BsNotifications implements OnInit, OnDestroy {
    private notificationsService;
    private changeDetectorRef;
    private subscription;
    notifications: Notification[];
    constructor(notificationsService: NotificationsService, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    loadNotifications(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsNotifications, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsNotifications, "sq-notifications", never, {}, {}, never, never>;
}
//# sourceMappingURL=notifications.d.ts.map