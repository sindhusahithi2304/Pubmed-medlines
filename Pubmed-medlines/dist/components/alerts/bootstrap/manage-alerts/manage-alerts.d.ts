import { OnInit } from "@angular/core";
import { ValidatorFn } from "@angular/forms";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { ModalButton } from "@sinequa/core/modal";
import { AuditEvent } from "@sinequa/core/web-services";
import { AlertsService, Alert, ManageAlertsModel } from "../../alerts.service";
import * as i0 from "@angular/core";
export declare class BsManageAlerts implements OnInit {
    model: ManageAlertsModel;
    alertsService: AlertsService;
    reordering: boolean;
    buttons: ModalButton[];
    removeAllButton: ModalButton;
    nameValidators: ValidatorFn[];
    showDirtyMessage: boolean;
    constructor(model: ManageAlertsModel, alertsService: AlertsService);
    ngOnInit(): void;
    addAuditEvent(auditEvent: AuditEvent): void;
    reorder(): void;
    remove(alert: Alert, index: number): boolean;
    editAlert(alert: Alert): boolean;
    dropped(drop: CdkDragDrop<Alert[]>): void;
    private createButtons;
    private createYesNoButtons;
    static ɵfac: i0.ɵɵFactoryDef<BsManageAlerts, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsManageAlerts, "sq-manage-alerts", never, {}, {}, never, never>;
}
//# sourceMappingURL=manage-alerts.d.ts.map