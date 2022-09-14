import { AuditWebService } from "@sinequa/core/web-services";
import { AppService } from "@sinequa/core/app-utils";
import { NotificationsService } from "@sinequa/core/notification";
import { ModalService } from "@sinequa/core/modal";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
export declare const AuditFeedbackType = "UserFeedback";
export declare class FeedbackService {
    auditService: AuditWebService;
    modalService: ModalService;
    appService: AppService;
    notificationsService: NotificationsService;
    constructor(auditService: AuditWebService, modalService: ModalService, appService: AppService, notificationsService: NotificationsService);
    sendUserFeedback(type: string, message: string, thankUser: boolean): void;
    buildFeedbackAction(): Action[];
    createAction(type: string, text: string, title: string, icon: string): Action;
    openFeedbackModal(type: string, title: string): void;
    static ɵfac: i0.ɵɵFactoryDef<FeedbackService, never>;
    static ɵprov: i0.ɵɵInjectableDef<FeedbackService>;
}
//# sourceMappingURL=feedback.service.d.ts.map