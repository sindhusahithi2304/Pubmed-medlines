import { OnDestroy } from "@angular/core";
import { RfmWebService, AuditWebService, Results, Record, RFMDisplay } from "@sinequa/core/web-services";
import { AppService } from "@sinequa/core/app-utils";
import { SearchService } from "@sinequa/components/search";
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare type RFMType = "important" | "click" | "like";
export interface CCRFM {
    name: string;
    click: CCRFM.Action;
    like: CCRFM.Action;
    important: CCRFM.Action;
}
export declare module CCRFM {
    interface Action {
        name: string;
        enabled: boolean;
        actionEnabled: boolean;
        noMenu: boolean;
        displayUnrated: boolean;
        negAvailable: boolean;
    }
}
export declare enum RFMEventType {
    ClickSet = "RFM_ClickSet",
    ClickReset = "RFM_ClickReset",
    Like = "RFM_Like",
    LikeReset = "RFM_LikeReset",
    Dislike = "RFM_Dislike",
    Important = "RFM_Important",
    ImportantReset = "RFM_ImportantReset",
    Ban = "RFM_Ban"
}
export interface RFMEvent {
    type: "updated";
}
export declare class RFMService implements OnDestroy {
    appService: AppService;
    rfmService: RfmWebService;
    searchService: SearchService;
    auditService: AuditWebService;
    private _events;
    private _subscription;
    constructor(appService: AppService, rfmService: RfmWebService, searchService: SearchService, auditService: AuditWebService);
    get events(): Observable<RFMEvent>;
    ngOnDestroy(): void;
    getMenuActions(config: CCRFM.Action): RFMDisplay[];
    static getActionName(rfmDisplay: RFMDisplay): string;
    static toAuditEventType(action: RFMType, evt: RFMDisplay): RFMEventType | undefined;
    notifyRfmAction(rfmEvent: any, record: Record, results: Results): void;
    /**
     * Called every time new results come in.
     * Performs a request for
     * @param results
     */
    private updateRfm;
    static ɵfac: i0.ɵɵFactoryDef<RFMService, never>;
    static ɵprov: i0.ɵɵInjectableDef<RFMService>;
}
//# sourceMappingURL=rfm.service.d.ts.map