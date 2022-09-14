import { Component, Inject } from "@angular/core";
import { MODAL_MODEL, ModalButton } from "@sinequa/core/modal";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "../../alerts.service";
import * as i2 from "@angular/forms";
import * as i3 from "@sinequa/components/modal";
import * as i4 from "@angular/common";
import * as i5 from "@angular/cdk/drag-drop";
import * as i6 from "../alert-message/alert-message.component";
import * as i7 from "@sinequa/core/intl";
function BsManageAlerts_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵelementStart(1, "button", 8);
    i0.ɵɵlistener("click", function BsManageAlerts_div_2_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.reorder(); });
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, ctx_r0.reordering ? "msg#manageAlerts.edit" : "msg#manageAlerts.reorder"));
} }
function BsManageAlerts_a_5_a_4_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 14);
    i0.ɵɵlistener("click", function BsManageAlerts_a_5_a_4_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r10 = i0.ɵɵnextContext(); const alert_r5 = ctx_r10.$implicit; const $index_r6 = ctx_r10.index; const ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.remove(alert_r5, $index_r6); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelement(2, "span", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 1, "msg#manageAlerts.remove"));
} }
function BsManageAlerts_a_5_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 16);
} }
const _c0 = "list-group-item list-group-item-action d-flex w-auto-unimportant";
const _c1 = function (a1) { return [_c0, a1]; };
const _c2 = function (a0) { return { "sq-active": a0, "sq-alert-text": true }; };
function BsManageAlerts_a_5_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 9);
    i0.ɵɵlistener("click", function BsManageAlerts_a_5_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r13); const alert_r5 = ctx.$implicit; const ctx_r12 = i0.ɵɵnextContext(); return ctx_r12.editAlert(alert_r5); });
    i0.ɵɵelementStart(1, "div", 10);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 11);
    i0.ɵɵtemplate(4, BsManageAlerts_a_5_a_4_Template, 3, 3, "a", 12);
    i0.ɵɵtemplate(5, BsManageAlerts_a_5_span_5_Template, 1, 0, "span", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const alert_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(5, _c1, ctx_r1.reordering ? "cursor-move" : ""));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(7, _c2, !ctx_r1.reordering));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(alert_r5.name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r1.reordering);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.reordering);
} }
function BsManageAlerts_sq_alert_message_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "sq-alert-message", 17);
    i0.ɵɵpipe(1, "sqMessage");
} if (rf & 2) {
    i0.ɵɵproperty("message", i0.ɵɵpipeBind1(1, 1, "msg#editAlert.lossDataMessage"));
} }
export class BsManageAlerts {
    constructor(model, alertsService) {
        this.model = model;
        this.alertsService = alertsService;
        this.showDirtyMessage = false;
        this.reordering = false;
    }
    ngOnInit() {
        this.createButtons();
    }
    addAuditEvent(auditEvent) {
        if (!this.model.auditEvents) {
            this.model.auditEvents = [];
        }
        this.model.auditEvents.push(auditEvent);
    }
    reorder() {
        this.reordering = !this.reordering;
    }
    remove(alert, index) {
        this.model.alerts.splice(index, 1);
        this.removeAllButton.visible = this.model.alerts.length > 0;
        this.addAuditEvent({
            type: "Alert_Delete" /* Alert_Delete */,
            detail: {
                alert: alert.name
            }
        });
        return false;
    }
    editAlert(alert) {
        if (!this.reordering) {
            const alert1 = Utils.copy(alert);
            this.alertsService.editAlertModal(alert1, true, this.model.searchRoute)
                .then(result => {
                if (result) {
                    Utils.copy(alert1, alert);
                    this.addAuditEvent({
                        type: "Alert_Edit" /* Alert_Edit */,
                        detail: {
                            alert: alert.name
                        }
                    });
                }
            });
        }
        return false;
    }
    dropped(drop) {
        Utils.arrayMove(this.model.alerts, drop.previousIndex, drop.currentIndex);
    }
    createButtons() {
        this.buttons = [
            this.removeAllButton = new ModalButton({
                text: "msg#manageAlerts.removeAll",
                result: 0 /* Custom */,
                action: (button) => {
                    this.model.alerts.splice(0);
                    button.visible = false;
                    this.addAuditEvent({
                        type: "Alert_DeleteAll" /* DeleteAll */
                    });
                },
                visible: this.model.alerts.length > 0
            }),
            new ModalButton({
                result: -1 /* OK */,
                primary: true
            }),
            new ModalButton({
                result: -2 /* Cancel */,
                action: (button) => {
                    var _a;
                    if (this.model.auditEvents && ((_a = this.model.auditEvents) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                        button.result = 0 /* Custom */;
                        this.showDirtyMessage = true;
                        this.createYesNoButtons();
                    }
                }
            })
        ];
    }
    createYesNoButtons() {
        this.buttons = [
            new ModalButton({
                result: -3 /* Yes */,
                primary: true,
            }),
            new ModalButton({
                result: -4 /* No */,
                action: (button) => {
                    button.result = 0 /* Custom */;
                    this.showDirtyMessage = false;
                    this.createButtons();
                }
            })
        ];
    }
}
BsManageAlerts.ɵfac = function BsManageAlerts_Factory(t) { return new (t || BsManageAlerts)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(i1.AlertsService)); };
BsManageAlerts.ɵcmp = i0.ɵɵdefineComponent({ type: BsManageAlerts, selectors: [["sq-manage-alerts"]], decls: 7, vars: 7, consts: [["name", "manageAlerts", "novalidate", ""], [3, "title", "buttons"], ["class", "form-group clearfix", 4, "ngIf"], [1, "form-group"], ["cdkDropList", "", 1, "list-group", 3, "cdkDropListData", "cdkDropListDisabled", "cdkDropListDropped"], ["href", "#", "cdkDrag", "", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["footer", "", 3, "message", 4, "ngIf"], [1, "form-group", "clearfix"], ["type", "button", 1, "btn", "btn-secondary", "float-right", 3, "click"], ["href", "#", "cdkDrag", "", 3, "ngClass", "click"], [3, "ngClass"], [1, "ml-auto"], ["class", "ml-2", "href", "#", 3, "title", "click", 4, "ngIf"], ["class", "ml-2 fas fa-bars sq-move", 4, "ngIf"], ["href", "#", 1, "ml-2", 3, "title", "click"], [1, "fas", "fa-times", "sq-remove"], [1, "ml-2", "fas", "fa-bars", "sq-move"], ["footer", "", 3, "message"]], template: function BsManageAlerts_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "sq-modal", 1);
        i0.ɵɵtemplate(2, BsManageAlerts_div_2_Template, 4, 3, "div", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵelementStart(4, "div", 4);
        i0.ɵɵlistener("cdkDropListDropped", function BsManageAlerts_Template_div_cdkDropListDropped_4_listener($event) { return ctx.dropped($event); });
        i0.ɵɵtemplate(5, BsManageAlerts_a_5_Template, 6, 9, "a", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(6, BsManageAlerts_sq_alert_message_6_Template, 2, 3, "sq-alert-message", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("title", "msg#manageAlerts.title")("buttons", ctx.buttons);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.model.alerts.length);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("cdkDropListData", ctx.model.alerts)("cdkDropListDisabled", !ctx.reordering);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.model.alerts);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showDirtyMessage);
    } }, directives: [i2.ɵangular_packages_forms_forms_y, i2.NgControlStatusGroup, i2.NgForm, i3.BsModal, i4.NgIf, i5.CdkDropList, i4.NgForOf, i5.CdkDrag, i4.NgClass, i6.BsAlertMessageComponent], pipes: [i7.MessagePipe], styles: [".list-group[_ngcontent-%COMP%]{max-height:18.5rem;overflow-y:auto;width:100%}.sq-alert-text[_ngcontent-%COMP%]{overflow-wrap:break-word;width:100%;word-break:break-word;word-wrap:break-word}.sq-move[_ngcontent-%COMP%]{cursor:move}span.sq-move[_ngcontent-%COMP%]{color:grey}.sq-remove[_ngcontent-%COMP%]{color:#d3d3d3;cursor:pointer}.sq-remove[_ngcontent-%COMP%]:hover{color:#8b0000}.w-auto-unimportant[_ngcontent-%COMP%]{width:auto}.cursor-move[_ngcontent-%COMP%]{cursor:move}.sq-active[_ngcontent-%COMP%]{color:#007bff}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsManageAlerts, [{
        type: Component,
        args: [{
                selector: "sq-manage-alerts",
                templateUrl: "./manage-alerts.html",
                styleUrls: ["./manage-alerts.scss"]
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: i1.AlertsService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWFsZXJ0cy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2FsZXJ0cy8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9tYW5hZ2UtYWxlcnRzL21hbmFnZS1hbGVydHMudHMiLCJib290c3RyYXAvbWFuYWdlLWFsZXJ0cy9tYW5hZ2UtYWxlcnRzLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFHeEQsT0FBTyxFQUFDLFdBQVcsRUFBRSxXQUFXLEVBQWMsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7Ozs7O0lDRmpDLDhCQUNJO0lBQUEsaUNBQWdGO0lBQXBCLCtLQUFtQjtJQUFDLFlBQW1GOztJQUFBLGlCQUFTO0lBQ2hMLGlCQUFNOzs7SUFEOEUsZUFBbUY7SUFBbkYsb0hBQW1GOzs7O0lBUXZKLDZCQUNJO0lBRHlDLHdTQUErQjs7SUFDeEUsMkJBQTRDO0lBQ2hELGlCQUFJOztJQUZ5RSxrRkFBaUQ7OztJQUc5SCwyQkFBaUU7Ozs7Ozs7SUFQekUsNEJBRUk7SUFGK0QscU5BQTBCO0lBRXpGLCtCQUFtRTtJQUFBLFlBQWM7SUFBQSxpQkFBTTtJQUN2RiwrQkFDSTtJQUFBLGdFQUVJO0lBQ0osc0VBQWlFO0lBQ3JFLGlCQUFNO0lBQ1YsaUJBQUk7Ozs7SUFSQSw0RkFBZ0g7SUFDM0csZUFBNkQ7SUFBN0Qsd0VBQTZEO0lBQUMsZUFBYztJQUFkLG1DQUFjO0lBRXpFLGVBQWlCO0lBQWpCLHlDQUFpQjtJQUdkLGVBQWdCO0lBQWhCLHdDQUFnQjs7O0lBS3ZDLHVDQUE2SDs7O0lBQXBHLCtFQUF1RDs7QUROeEYsTUFBTSxPQUFPLGNBQWM7SUFPdkIsWUFDZ0MsS0FBd0IsRUFDN0MsYUFBNEI7UUFEUCxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUM3QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUp2QyxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFLckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELGFBQWEsQ0FBQyxVQUFzQjtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDdkMsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFZLEVBQUUsS0FBYTtRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUNmLElBQUksbUNBQTZCO1lBQ2pDLE1BQU0sRUFBRTtnQkFDSixLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUk7YUFDcEI7U0FDSixDQUFDLENBQUM7UUFDSCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQVk7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbEIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO2lCQUNsRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ1gsSUFBSSxNQUFNLEVBQUU7b0JBQ1IsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQzFCLElBQUksQ0FBQyxhQUFhLENBQUM7d0JBQ2YsSUFBSSwrQkFBMkI7d0JBQy9CLE1BQU0sRUFBRTs0QkFDSixLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUk7eUJBQ3BCO3FCQUNKLENBQUMsQ0FBQztpQkFDTjtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ1Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQTBCO1FBQzlCLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVPLGFBQWE7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxXQUFXLENBQUM7Z0JBQ25DLElBQUksRUFBRSw0QkFBNEI7Z0JBQ2xDLE1BQU0sZ0JBQW9CO2dCQUMxQixNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQkFDZixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO29CQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDO3dCQUNmLElBQUksbUNBQTBCO3FCQUNqQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFDRCxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUM7YUFDeEMsQ0FBQztZQUNGLElBQUksV0FBVyxDQUFDO2dCQUNaLE1BQU0sYUFBZ0I7Z0JBQ3RCLE9BQU8sRUFBRSxJQUFJO2FBQ2hCLENBQUM7WUFDRixJQUFJLFdBQVcsQ0FBQztnQkFDWixNQUFNLGlCQUFvQjtnQkFDMUIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7O29CQUNmLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksT0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsMENBQUUsTUFBTSxJQUFHLENBQUMsRUFBRTt3QkFDOUQsTUFBTSxDQUFDLE1BQU0saUJBQXFCLENBQUM7d0JBQ25DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7d0JBQzdCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO3FCQUM3QjtnQkFDTCxDQUFDO2FBQ0osQ0FBQztTQUNMLENBQUM7SUFDTixDQUFDO0lBRU8sa0JBQWtCO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxJQUFJLFdBQVcsQ0FBQztnQkFDWixNQUFNLGNBQWlCO2dCQUN2QixPQUFPLEVBQUUsSUFBSTthQUNoQixDQUFDO1lBQ0YsSUFBSSxXQUFXLENBQUM7Z0JBQ1osTUFBTSxhQUFnQjtnQkFDdEIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ2YsTUFBTSxDQUFDLE1BQU0saUJBQXFCLENBQUM7b0JBQ25DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7b0JBQzlCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDekIsQ0FBQzthQUNKLENBQUM7U0FDTCxDQUFDO0lBQ04sQ0FBQzs7NEVBN0dRLGNBQWMsdUJBUVgsV0FBVzttREFSZCxjQUFjO1FDYjNCLCtCQUNJO1FBQUEsbUNBQ0k7UUFBQSwrREFFTTtRQUNOLDhCQUNJO1FBQUEsOEJBQ0k7UUFEcUcsd0hBQXNCLG1CQUFlLElBQUM7UUFDM0ksMkRBU0k7UUFDUixpQkFBTTtRQUNWLGlCQUFNO1FBQ04seUZBQTZIO1FBQ2pJLGlCQUFXO1FBQ2YsaUJBQU87O1FBcEJPLGVBQWtDO1FBQWxDLGdEQUFrQyx3QkFBQTtRQUNsQyxlQUF5QjtRQUF6Qiw4Q0FBeUI7UUFJUyxlQUFnQztRQUFoQyxrREFBZ0Msd0NBQUE7UUFDM0MsZUFBaUI7UUFBakIsMENBQWlCO1FBWW9DLGVBQXNCO1FBQXRCLDJDQUFzQjs7a0RETm5HLGNBQWM7Y0FMMUIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFdBQVcsRUFBRSxzQkFBc0I7Z0JBQ25DLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO2FBQ3RDOztzQkFTUSxNQUFNO3VCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5qZWN0LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1ZhbGlkYXRvckZufSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7Q2RrRHJhZ0Ryb3B9IGZyb20gXCJAYW5ndWxhci9jZGsvZHJhZy1kcm9wXCI7XG5pbXBvcnQge01PREFMX01PREVMLCBNb2RhbEJ1dHRvbiwgTW9kYWxSZXN1bHR9IGZyb20gXCJAc2luZXF1YS9jb3JlL21vZGFsXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge0F1ZGl0RXZlbnQsIEF1ZGl0RXZlbnRUeXBlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7QWxlcnRzU2VydmljZSwgQWxlcnQsIEFsZXJ0RXZlbnRUeXBlLCBNYW5hZ2VBbGVydHNNb2RlbH0gZnJvbSBcIi4uLy4uL2FsZXJ0cy5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLW1hbmFnZS1hbGVydHNcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL21hbmFnZS1hbGVydHMuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9tYW5hZ2UtYWxlcnRzLnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQnNNYW5hZ2VBbGVydHMgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHJlb3JkZXJpbmc6IGJvb2xlYW47XG4gICAgYnV0dG9uczogTW9kYWxCdXR0b25bXTtcbiAgICByZW1vdmVBbGxCdXR0b246IE1vZGFsQnV0dG9uO1xuICAgIG5hbWVWYWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdO1xuICAgIHNob3dEaXJ0eU1lc3NhZ2UgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KE1PREFMX01PREVMKSBwdWJsaWMgbW9kZWw6IE1hbmFnZUFsZXJ0c01vZGVsLFxuICAgICAgICBwdWJsaWMgYWxlcnRzU2VydmljZTogQWxlcnRzU2VydmljZSkge1xuICAgICAgICB0aGlzLnJlb3JkZXJpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b25zKCk7XG4gICAgfVxuXG4gICAgYWRkQXVkaXRFdmVudChhdWRpdEV2ZW50OiBBdWRpdEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5tb2RlbC5hdWRpdEV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5hdWRpdEV2ZW50cyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9kZWwuYXVkaXRFdmVudHMucHVzaChhdWRpdEV2ZW50KTtcbiAgICB9XG5cbiAgICByZW9yZGVyKCkge1xuICAgICAgICB0aGlzLnJlb3JkZXJpbmcgPSAhdGhpcy5yZW9yZGVyaW5nO1xuICAgIH1cblxuICAgIHJlbW92ZShhbGVydDogQWxlcnQsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5tb2RlbC5hbGVydHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxCdXR0b24udmlzaWJsZSA9IHRoaXMubW9kZWwuYWxlcnRzLmxlbmd0aCA+IDA7XG4gICAgICAgIHRoaXMuYWRkQXVkaXRFdmVudCh7XG4gICAgICAgICAgICB0eXBlOiBBdWRpdEV2ZW50VHlwZS5BbGVydF9EZWxldGUsXG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICBhbGVydDogYWxlcnQubmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGVkaXRBbGVydChhbGVydDogQWxlcnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlb3JkZXJpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGFsZXJ0MSA9IFV0aWxzLmNvcHkoYWxlcnQpO1xuICAgICAgICAgICAgdGhpcy5hbGVydHNTZXJ2aWNlLmVkaXRBbGVydE1vZGFsKGFsZXJ0MSwgdHJ1ZSwgdGhpcy5tb2RlbC5zZWFyY2hSb3V0ZSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5jb3B5KGFsZXJ0MSwgYWxlcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRBdWRpdEV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBBdWRpdEV2ZW50VHlwZS5BbGVydF9FZGl0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydDogYWxlcnQubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGRyb3BwZWQoZHJvcDogQ2RrRHJhZ0Ryb3A8QWxlcnRbXT4pIHtcbiAgICAgICAgVXRpbHMuYXJyYXlNb3ZlKHRoaXMubW9kZWwuYWxlcnRzLCBkcm9wLnByZXZpb3VzSW5kZXgsIGRyb3AuY3VycmVudEluZGV4KTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBjcmVhdGVCdXR0b25zKCkge1xuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBbXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbEJ1dHRvbiA9IG5ldyBNb2RhbEJ1dHRvbih7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJtc2cjbWFuYWdlQWxlcnRzLnJlbW92ZUFsbFwiLFxuICAgICAgICAgICAgICAgIHJlc3VsdDogTW9kYWxSZXN1bHQuQ3VzdG9tLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogKGJ1dHRvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmFsZXJ0cy5zcGxpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQXVkaXRFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBBbGVydEV2ZW50VHlwZS5EZWxldGVBbGxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiB0aGlzLm1vZGVsLmFsZXJ0cy5sZW5ndGggPiAwXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBNb2RhbEJ1dHRvbih7XG4gICAgICAgICAgICAgICAgcmVzdWx0OiBNb2RhbFJlc3VsdC5PSyxcbiAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBNb2RhbEJ1dHRvbih7XG4gICAgICAgICAgICAgICAgcmVzdWx0OiBNb2RhbFJlc3VsdC5DYW5jZWwsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiAoYnV0dG9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLmF1ZGl0RXZlbnRzICYmIHRoaXMubW9kZWwuYXVkaXRFdmVudHM/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5yZXN1bHQgPSBNb2RhbFJlc3VsdC5DdXN0b207XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dEaXJ0eU1lc3NhZ2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVZZXNOb0J1dHRvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIF07XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgY3JlYXRlWWVzTm9CdXR0b25zKCkge1xuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBbXG4gICAgICAgICAgICBuZXcgTW9kYWxCdXR0b24oe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogTW9kYWxSZXN1bHQuWWVzLFxuICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBNb2RhbEJ1dHRvbih7XG4gICAgICAgICAgICAgICAgcmVzdWx0OiBNb2RhbFJlc3VsdC5ObyxcbiAgICAgICAgICAgICAgICBhY3Rpb246IChidXR0b24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLnJlc3VsdCA9IE1vZGFsUmVzdWx0LkN1c3RvbTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RGlydHlNZXNzYWdlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQnV0dG9ucygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIF07XG4gICAgfVxufVxuIiwiPGZvcm0gbmFtZT1cIm1hbmFnZUFsZXJ0c1wiIG5vdmFsaWRhdGU+XG4gICAgPHNxLW1vZGFsIFt0aXRsZV09XCInbXNnI21hbmFnZUFsZXJ0cy50aXRsZSdcIiBbYnV0dG9uc109XCJidXR0b25zXCI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJtb2RlbC5hbGVydHMubGVuZ3RoXCIgY2xhc3M9XCJmb3JtLWdyb3VwIGNsZWFyZml4XCI+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGZsb2F0LXJpZ2h0XCIgKGNsaWNrKT1cInJlb3JkZXIoKVwiPnt7KHJlb3JkZXJpbmcgPyBcIm1zZyNtYW5hZ2VBbGVydHMuZWRpdFwiIDogXCJtc2cjbWFuYWdlQWxlcnRzLnJlb3JkZXJcIikgfCBzcU1lc3NhZ2V9fTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWdyb3VwXCIgY2RrRHJvcExpc3QgW2Nka0Ryb3BMaXN0RGF0YV09XCJtb2RlbC5hbGVydHNcIiBbY2RrRHJvcExpc3REaXNhYmxlZF09XCIhcmVvcmRlcmluZ1wiIChjZGtEcm9wTGlzdERyb3BwZWQpPVwiZHJvcHBlZCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPGEgKm5nRm9yPVwibGV0IGFsZXJ0IG9mIG1vZGVsLmFsZXJ0czsgbGV0ICRpbmRleCA9IGluZGV4XCIgaHJlZj1cIiNcIiAoY2xpY2spPVwiZWRpdEFsZXJ0KGFsZXJ0KVwiIGNka0RyYWcgXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIlsnbGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS1hY3Rpb24gZC1mbGV4IHctYXV0by11bmltcG9ydGFudCcsIHJlb3JkZXJpbmcgPyAnY3Vyc29yLW1vdmUnOiAnJ11cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3NxLWFjdGl2ZSc6ICFyZW9yZGVyaW5nLCAnc3EtYWxlcnQtdGV4dCc6IHRydWV9XCI+e3thbGVydC5uYW1lfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1sLWF1dG9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiIXJlb3JkZXJpbmdcIiBjbGFzcz1cIm1sLTJcIiBocmVmPVwiI1wiIChjbGljayk9XCJyZW1vdmUoYWxlcnQsICRpbmRleClcIiB0aXRsZT1cInt7J21zZyNtYW5hZ2VBbGVydHMucmVtb3ZlJyB8IHNxTWVzc2FnZX19XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYXMgZmEtdGltZXMgc3EtcmVtb3ZlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJyZW9yZGVyaW5nXCIgY2xhc3M9XCJtbC0yIGZhcyBmYS1iYXJzIHNxLW1vdmVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHNxLWFsZXJ0LW1lc3NhZ2UgZm9vdGVyIFttZXNzYWdlXT1cIidtc2cjZWRpdEFsZXJ0Lmxvc3NEYXRhTWVzc2FnZScgfCBzcU1lc3NhZ2VcIiAqbmdJZj1cInNob3dEaXJ0eU1lc3NhZ2VcIj48L3NxLWFsZXJ0LW1lc3NhZ2U+XG4gICAgPC9zcS1tb2RhbD5cbjwvZm9ybT5cbiJdfQ==