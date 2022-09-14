import { OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { Subscription } from "rxjs";
import { NotificationsService } from "@sinequa/core/notification";
import * as i0 from "@angular/core";
export declare class BsNetworkActivity implements OnInit, OnDestroy {
    private notificationsService;
    private changeDetectorRef;
    subscription: Subscription | undefined;
    active: boolean;
    hidden: boolean;
    constructor(notificationsService: NotificationsService, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    bind(): void;
    unbind(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsNetworkActivity, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsNetworkActivity, "sq-network-activity", never, {}, {}, never, never>;
}
//# sourceMappingURL=network-activity.d.ts.map