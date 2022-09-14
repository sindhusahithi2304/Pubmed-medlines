import { OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { NotificationsService } from "@sinequa/core/notification";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
export declare class BsNotificationsManager implements OnInit, OnDestroy {
    private notificationsService;
    private changeDetectorRef;
    private subscription;
    action: Action;
    randomAction: Action;
    constructor(notificationsService: NotificationsService, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    bind(): void;
    unbind(): void;
    ngOnDestroy(): void;
    buildAction(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsNotificationsManager, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsNotificationsManager, "sq-notifications-manager", never, {}, {}, never, never>;
}
//# sourceMappingURL=notifications-manager.d.ts.map