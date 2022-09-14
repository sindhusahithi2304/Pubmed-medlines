import { Component, Input } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import { RFMDisplay } from "@sinequa/core/web-services";
import { RFMService } from "../../rfm.service";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
import * as i1 from "../../rfm.service";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/components/action";
const _c0 = function (a0) { return [a0]; };
const _c1 = function (a0, a2) { return { items: a0, autoAdjust: true, size: a2 }; };
function BsRfmAction_ng_container_0_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 2);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction2(3, _c1, i0.ɵɵpureFunction1(1, _c0, ctx_r1.action), ctx_r1.size));
} }
function BsRfmAction_ng_container_0_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "div", 3);
    i0.ɵɵelement(2, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r2.getActionIcon(ctx_r2.rfm.image));
} }
function BsRfmAction_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsRfmAction_ng_container_0_div_1_Template, 1, 6, "div", 1);
    i0.ɵɵtemplate(2, BsRfmAction_ng_container_0_div_2_Template, 3, 3, "div", 0);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.displayImgAction || ctx_r0.displayMenu);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.displayNoAction);
} }
export class BsRfmAction {
    constructor(changeDetectorRef, rFMService) {
        this.changeDetectorRef = changeDetectorRef;
        this.rFMService = rFMService;
    }
    ngOnChanges(changes) {
        if (!this.rfmSubscription) {
            this.rfmSubscription = this.rFMService.events.subscribe((event) => {
                this.changeDetectorRef.markForCheck();
            });
        }
        if (changes["rfm"]) {
            if (!this.action) {
                this.type = (Utils.toLowerCase(this.type) || "important");
                // List of menu actions from app config
                this.menuActions = this.rFMService.getMenuActions(this.config);
                this.buildAction();
            }
            else {
                this.action.update();
            }
        }
    }
    ngOnDestroy() {
        this.rfmSubscription.unsubscribe();
    }
    get hasRFMAction() {
        return this.record.rfmEnabled && this.config.enabled &&
            this.hasRfmImage;
    }
    get rfmStatus() {
        return (!this.rfm) ? RFMDisplay.unrate : this.rfm.status;
    }
    get hasRfmImage() {
        return this.rfmImage !== RFMDisplay.none;
    }
    get rfmImage() {
        return (!this.rfm) ? this.rfmDefaultImage : this.rfm.image;
    }
    get rfmDefaultImage() {
        return (this.config.displayUnrated || !this.config.noMenu) ? RFMDisplay.unrate : RFMDisplay.none;
    }
    get rfmImageAction() {
        return (!this.rfm) ? this.rfmDefaultImageAction : this.rfm.imageAction;
    }
    get rfmDefaultImageAction() {
        return this.config.noMenu ? RFMDisplay.positiveRate : RFMDisplay.none;
    }
    get rfmAvailableActions() {
        return (!this.rfm) ? this.rfmDefaultAvailableActions : this.rfm.availableActions;
    }
    get rfmDefaultAvailableActions() {
        if (this.config.noMenu) {
            return RFMDisplay.none;
        }
        if (this.config.negAvailable) {
            return RFMDisplay.personalAll;
        }
        return RFMDisplay.personalPosOnly;
    }
    get displayImgAction() {
        return this.rfmImageAction !== RFMDisplay.none;
    }
    get displayMenu() {
        return this.rfmImageAction === RFMDisplay.none &&
            this.rfmAvailableActions !== RFMDisplay.none &&
            !this.config.noMenu;
    }
    get displayNoAction() {
        return this.rfmImageAction === RFMDisplay.none &&
            this.rfmAvailableActions === RFMDisplay.none;
    }
    getActionIcon(rfmDisplay) {
        const name = RFMService.getActionName(rfmDisplay);
        return `rfm-${this.type}-${name}`;
    }
    buildAction() {
        this.action = new Action({
            updater: (item) => {
                item.icon = this.getActionIcon(this.rfmImage);
            }
        });
        if (this.displayImgAction) {
            this.action.action = (item) => {
                this.selectRfmDisplay(this.rfmImageAction);
            };
        }
        if (this.displayMenu) {
            this.action.children = this.menuActions.map(rfmDisplay => new Action({
                icon: this.getActionIcon(rfmDisplay),
                data: rfmDisplay,
                action: (item) => {
                    this.selectRfmDisplay(item.data);
                },
                updater: (item) => {
                    item.disabled = rfmDisplay === this.rfmStatus;
                }
            }));
        }
        this.action.update();
    }
    selectRfmDisplay(rfmDisplay) {
        if (rfmDisplay !== this.rfmStatus) {
            const eventtype = RFMService.toAuditEventType(this.type, rfmDisplay);
            this.rFMService.notifyRfmAction(eventtype, this.record, this.results);
            // Update RFM data for the record (created a new RFM data can be necessary)
            this.updateRfmData(rfmDisplay, this.rfmStatus);
        }
    }
    updateRfmData(newStatus, newAction) {
        let updateNeeded = false;
        if (!this.rfm) {
            this.rfm = {
                eventCount: 1,
                average: 0,
                status: newStatus,
                image: newStatus,
                imageAction: newAction,
                availableActions: this.rfmDefaultAvailableActions
            };
            updateNeeded = true;
        }
        else {
            if (newStatus === RFMDisplay.unrate) {
                this.rfm.eventCount--;
            }
            else {
                this.rfm.eventCount++;
            }
            this.rfm.status = newStatus;
            this.rfm.image = newStatus;
            this.rfm.imageAction = newAction;
        }
        if (updateNeeded) {
            let rfm = this.record.rfm;
            let updateRfm = false;
            if (!rfm) {
                updateRfm = true;
                rfm = {};
            }
            rfm[this.type] = this.rfm;
            if (updateRfm) {
                this.record.rfm = rfm;
            }
        }
        this.action.update();
    }
}
BsRfmAction.ɵfac = function BsRfmAction_Factory(t) { return new (t || BsRfmAction)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.RFMService)); };
BsRfmAction.ɵcmp = i0.ɵɵdefineComponent({ type: BsRfmAction, selectors: [["sq-rfm-action"]], inputs: { results: "results", record: "record", config: "config", rfm: "rfm", type: "type", size: "size" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "sq-action-buttons", 4, "ngIf"], [3, "sq-action-buttons"], [1, "btn-text", "rfm-no-action"]], template: function BsRfmAction_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsRfmAction_ng_container_0_Template, 3, 2, "ng-container", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.hasRFMAction);
    } }, directives: [i2.NgIf, i3.BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsRfmAction, [{
        type: Component,
        args: [{
                selector: "sq-rfm-action",
                templateUrl: "./rfm-action.html"
            }]
    }], function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.RFMService }]; }, { results: [{
            type: Input
        }], record: [{
            type: Input
        }], config: [{
            type: Input
        }], rfm: [{
            type: Input
        }], type: [{
            type: Input
        }], size: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmZtLWFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3JmbS8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9yZm0tYWN0aW9uL3JmbS1hY3Rpb24udHMiLCJib290c3RyYXAvcmZtLWFjdGlvbi9yZm0tYWN0aW9uLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQXlELE1BQU0sZUFBZSxDQUFDO0FBQ3ZHLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN6QyxPQUFPLEVBQWtCLFVBQVUsRUFBbUIsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RixPQUFPLEVBQUMsVUFBVSxFQUFpQixNQUFNLG1CQUFtQixDQUFDO0FBQzdELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7Ozs7SUNIOUMseUJBQXlIOzs7SUFBNUUsc0hBQXFFOzs7SUFDbEgsMkJBQ0k7SUFBQSw4QkFDSTtJQUFBLHVCQUFrRDtJQUN0RCxpQkFBTTtJQUNWLGlCQUFNOzs7SUFGUSxlQUFvQztJQUFwQyxxREFBb0M7OztJQUp0RCw2QkFDSTtJQUFBLDJFQUF5SDtJQUN6SCwyRUFJTTtJQUNWLDBCQUFlOzs7SUFOTCxlQUFxQztJQUFyQyxvRUFBcUM7SUFDckMsZUFBcUI7SUFBckIsNkNBQXFCOztBRFMvQixNQUFNLE9BQU8sV0FBVztJQWFwQixZQUNjLGlCQUFvQyxFQUNwQyxVQUFzQjtRQUR0QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGVBQVUsR0FBVixVQUFVLENBQVk7SUFDcEMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN2QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FDbkQsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDTixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDMUMsQ0FBQyxDQUNKLENBQUM7U0FDTDtRQUNELElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxXQUFXLENBQVksQ0FBQztnQkFDckUsdUNBQXVDO2dCQUN2QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3RCO2lCQUNJO2dCQUNELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDeEI7U0FDSjtJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87WUFDaEQsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1QsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUM3RCxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDN0MsQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFDL0QsQ0FBQztJQUVELElBQVksZUFBZTtRQUN2QixPQUFPLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO0lBQ3RHLENBQUM7SUFFRCxJQUFJLGNBQWM7UUFDZCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFDM0UsQ0FBQztJQUVELElBQVkscUJBQXFCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDMUUsQ0FBQztJQUVELElBQUksbUJBQW1CO1FBQ25CLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0lBQ3JGLENBQUM7SUFFRCxJQUFZLDBCQUEwQjtRQUNsQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3BCLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQztTQUMxQjtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDMUIsT0FBTyxVQUFVLENBQUMsV0FBVyxDQUFDO1NBQ2pDO1FBQ0QsT0FBTyxVQUFVLENBQUMsZUFBZSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxJQUFJLGdCQUFnQjtRQUNoQixPQUFPLElBQUksQ0FBQyxjQUFjLEtBQUssVUFBVSxDQUFDLElBQUksQ0FBQztJQUNuRCxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsY0FBYyxLQUFLLFVBQVUsQ0FBQyxJQUFJO1lBQzFDLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxVQUFVLENBQUMsSUFBSTtZQUM1QyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLGVBQWU7UUFDZixPQUFPLElBQUksQ0FBQyxjQUFjLEtBQUssVUFBVSxDQUFDLElBQUk7WUFDMUMsSUFBSSxDQUFDLG1CQUFtQixLQUFLLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDckQsQ0FBQztJQUVELGFBQWEsQ0FBQyxVQUFzQjtRQUNoQyxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQztZQUNyQixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDZCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xELENBQUM7U0FDSixDQUFDLENBQUM7UUFDSCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQztTQUNMO1FBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUM7Z0JBQ2pFLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztnQkFDcEMsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO29CQUNiLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDbEQsQ0FBQzthQUNKLENBQUMsQ0FBQyxDQUFDO1NBQ1A7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxVQUFzQjtRQUNuQyxJQUFJLFVBQVUsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQy9CLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0RSwyRUFBMkU7WUFDM0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2xEO0lBQ0wsQ0FBQztJQUVPLGFBQWEsQ0FBQyxTQUFxQixFQUFFLFNBQXFCO1FBQzlELElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNYLElBQUksQ0FBQyxHQUFHLEdBQUc7Z0JBQ1AsVUFBVSxFQUFFLENBQUM7Z0JBQ2IsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLEtBQUssRUFBRSxTQUFTO2dCQUNoQixXQUFXLEVBQUUsU0FBUztnQkFDdEIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQjthQUNwRCxDQUFDO1lBQ0YsWUFBWSxHQUFHLElBQUksQ0FBQztTQUN2QjthQUNJO1lBQ0QsSUFBSSxTQUFTLEtBQUssVUFBVSxDQUFDLE1BQU0sRUFBRTtnQkFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUN6QjtpQkFDSTtnQkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3pCO1lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7U0FDcEM7UUFFRCxJQUFJLFlBQVksRUFBRTtZQUNkLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQzFCLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNOLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLEdBQUcsR0FBRyxFQUFFLENBQUM7YUFDWjtZQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUMxQixJQUFJLFNBQVMsRUFBRTtnQkFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7YUFDekI7U0FDSjtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7c0VBbkxRLFdBQVc7Z0RBQVgsV0FBVztRQ1h4Qiw4RUFPZTs7UUFQQSx1Q0FBa0I7O2tERFdwQixXQUFXO2NBSnZCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsV0FBVyxFQUFFLG1CQUFtQjthQUNuQzs2RkFFWSxPQUFPO2tCQUFmLEtBQUs7WUFDRyxNQUFNO2tCQUFkLEtBQUs7WUFDRyxNQUFNO2tCQUFkLEtBQUs7WUFDRyxHQUFHO2tCQUFYLEtBQUs7WUFDRyxJQUFJO2tCQUFaLEtBQUs7WUFDRyxJQUFJO2tCQUFaLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgT25EZXN0cm95LCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7UmVzdWx0cywgUmVjb3JkLCBSRk1EaXNwbGF5LCBSRk1BY3Rpb25EaXNwbGF5fSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7UkZNU2VydmljZSwgQ0NSRk0sIFJGTVR5cGV9IGZyb20gXCIuLi8uLi9yZm0uc2VydmljZVwiO1xuaW1wb3J0IHtBY3Rpb259IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2FjdGlvblwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLXJmbS1hY3Rpb25cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3JmbS1hY3Rpb24uaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEJzUmZtQWN0aW9uIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHJlc3VsdHM6IFJlc3VsdHM7XG4gICAgQElucHV0KCkgcmVjb3JkOiBSZWNvcmQ7XG4gICAgQElucHV0KCkgY29uZmlnOiBDQ1JGTS5BY3Rpb247ICAvLyBQYXJlbnQgc2hvdWxkIGJpbmQgdGhpcy5hcHBTZXJ2aWNlLmNjcmZtW3R5cGVdXG4gICAgQElucHV0KCkgcmZtOiBSRk1BY3Rpb25EaXNwbGF5OyAvLyBQYXJlbnQgc2hvdWxkIGJpbmQgcmVjb3JkLnJmbSAmJiByZWNvcmQucmZtW3R5cGVdXG4gICAgQElucHV0KCkgdHlwZTogUkZNVHlwZTsgICAgICAgICAvLyBjbGljaywgbGlrZSwgaW1wb3J0YW50IChkZWZhdWx0KVxuICAgIEBJbnB1dCgpIHNpemU6IHN0cmluZztcbiAgICBhY3Rpb246IEFjdGlvbjtcblxuICAgIG1lbnVBY3Rpb25zOiBSRk1EaXNwbGF5W107XG5cbiAgICBwcml2YXRlIHJmbVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByb3RlY3RlZCByRk1TZXJ2aWNlOiBSRk1TZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoIXRoaXMucmZtU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnJmbVN1YnNjcmlwdGlvbiA9IHRoaXMuckZNU2VydmljZS5ldmVudHMuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbXCJyZm1cIl0pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5hY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSAoVXRpbHMudG9Mb3dlckNhc2UodGhpcy50eXBlKSB8fCBcImltcG9ydGFudFwiKSBhcyBSRk1UeXBlO1xuICAgICAgICAgICAgICAgIC8vIExpc3Qgb2YgbWVudSBhY3Rpb25zIGZyb20gYXBwIGNvbmZpZ1xuICAgICAgICAgICAgICAgIHRoaXMubWVudUFjdGlvbnMgPSB0aGlzLnJGTVNlcnZpY2UuZ2V0TWVudUFjdGlvbnModGhpcy5jb25maWcpO1xuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRBY3Rpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucmZtU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgZ2V0IGhhc1JGTUFjdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjb3JkLnJmbUVuYWJsZWQgJiYgdGhpcy5jb25maWcuZW5hYmxlZCAmJlxuICAgICAgICAgICAgdGhpcy5oYXNSZm1JbWFnZTtcbiAgICB9XG5cbiAgICBnZXQgcmZtU3RhdHVzKCk6IFJGTURpc3BsYXkge1xuICAgICAgICByZXR1cm4gKCF0aGlzLnJmbSkgPyBSRk1EaXNwbGF5LnVucmF0ZSA6IHRoaXMucmZtLnN0YXR1cztcbiAgICB9XG5cbiAgICBnZXQgaGFzUmZtSW1hZ2UoKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZm1JbWFnZSAhPT0gUkZNRGlzcGxheS5ub25lO1xuICAgIH1cblxuICAgIGdldCByZm1JbWFnZSgpOiBSRk1EaXNwbGF5IHtcbiAgICAgICAgcmV0dXJuICghdGhpcy5yZm0pID8gdGhpcy5yZm1EZWZhdWx0SW1hZ2UgOiB0aGlzLnJmbS5pbWFnZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCByZm1EZWZhdWx0SW1hZ2UoKTogUkZNRGlzcGxheSB7XG4gICAgICAgIHJldHVybiAoIHRoaXMuY29uZmlnLmRpc3BsYXlVbnJhdGVkIHx8ICF0aGlzLmNvbmZpZy5ub01lbnUpID8gUkZNRGlzcGxheS51bnJhdGUgOiBSRk1EaXNwbGF5Lm5vbmU7XG4gICAgfVxuXG4gICAgZ2V0IHJmbUltYWdlQWN0aW9uKCk6IFJGTURpc3BsYXkge1xuICAgICAgICByZXR1cm4gKCF0aGlzLnJmbSkgPyB0aGlzLnJmbURlZmF1bHRJbWFnZUFjdGlvbiA6IHRoaXMucmZtLmltYWdlQWN0aW9uO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IHJmbURlZmF1bHRJbWFnZUFjdGlvbigpOiBSRk1EaXNwbGF5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLm5vTWVudSA/IFJGTURpc3BsYXkucG9zaXRpdmVSYXRlIDogUkZNRGlzcGxheS5ub25lO1xuICAgIH1cblxuICAgIGdldCByZm1BdmFpbGFibGVBY3Rpb25zKCk6IFJGTURpc3BsYXkge1xuICAgICAgICByZXR1cm4gKCF0aGlzLnJmbSkgPyB0aGlzLnJmbURlZmF1bHRBdmFpbGFibGVBY3Rpb25zIDogdGhpcy5yZm0uYXZhaWxhYmxlQWN0aW9ucztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCByZm1EZWZhdWx0QXZhaWxhYmxlQWN0aW9ucygpOiBSRk1EaXNwbGF5IHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLm5vTWVudSkge1xuICAgICAgICAgICAgcmV0dXJuIFJGTURpc3BsYXkubm9uZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb25maWcubmVnQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gUkZNRGlzcGxheS5wZXJzb25hbEFsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUkZNRGlzcGxheS5wZXJzb25hbFBvc09ubHk7XG4gICAgfVxuXG4gICAgZ2V0IGRpc3BsYXlJbWdBY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJmbUltYWdlQWN0aW9uICE9PSBSRk1EaXNwbGF5Lm5vbmU7XG4gICAgfVxuXG4gICAgZ2V0IGRpc3BsYXlNZW51KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZm1JbWFnZUFjdGlvbiA9PT0gUkZNRGlzcGxheS5ub25lICYmXG4gICAgICAgICAgICB0aGlzLnJmbUF2YWlsYWJsZUFjdGlvbnMgIT09IFJGTURpc3BsYXkubm9uZSAmJlxuICAgICAgICAgICAgIXRoaXMuY29uZmlnLm5vTWVudTtcbiAgICB9XG5cbiAgICBnZXQgZGlzcGxheU5vQWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZm1JbWFnZUFjdGlvbiA9PT0gUkZNRGlzcGxheS5ub25lICYmXG4gICAgICAgICAgICB0aGlzLnJmbUF2YWlsYWJsZUFjdGlvbnMgPT09IFJGTURpc3BsYXkubm9uZTtcbiAgICB9XG5cbiAgICBnZXRBY3Rpb25JY29uKHJmbURpc3BsYXk6IFJGTURpc3BsYXkpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBuYW1lID0gUkZNU2VydmljZS5nZXRBY3Rpb25OYW1lKHJmbURpc3BsYXkpO1xuICAgICAgICByZXR1cm4gYHJmbS0ke3RoaXMudHlwZX0tJHtuYW1lfWA7XG4gICAgfVxuXG4gICAgYnVpbGRBY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuYWN0aW9uID0gbmV3IEFjdGlvbih7XG4gICAgICAgICAgICB1cGRhdGVyOiAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0uaWNvbiA9IHRoaXMuZ2V0QWN0aW9uSWNvbih0aGlzLnJmbUltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXlJbWdBY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uLmFjdGlvbiA9IChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RSZm1EaXNwbGF5KHRoaXMucmZtSW1hZ2VBY3Rpb24pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kaXNwbGF5TWVudSkge1xuICAgICAgICAgICAgdGhpcy5hY3Rpb24uY2hpbGRyZW4gPSB0aGlzLm1lbnVBY3Rpb25zLm1hcChyZm1EaXNwbGF5ID0+IG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgICAgIGljb246IHRoaXMuZ2V0QWN0aW9uSWNvbihyZm1EaXNwbGF5KSxcbiAgICAgICAgICAgICAgICBkYXRhOiByZm1EaXNwbGF5LFxuICAgICAgICAgICAgICAgIGFjdGlvbjogKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RSZm1EaXNwbGF5KGl0ZW0uZGF0YSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB1cGRhdGVyOiAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmRpc2FibGVkID0gcmZtRGlzcGxheSA9PT0gdGhpcy5yZm1TdGF0dXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWN0aW9uLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHNlbGVjdFJmbURpc3BsYXkocmZtRGlzcGxheTogUkZNRGlzcGxheSkge1xuICAgICAgICBpZiAocmZtRGlzcGxheSAhPT0gdGhpcy5yZm1TdGF0dXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50dHlwZSA9IFJGTVNlcnZpY2UudG9BdWRpdEV2ZW50VHlwZSh0aGlzLnR5cGUsIHJmbURpc3BsYXkpO1xuICAgICAgICAgICAgdGhpcy5yRk1TZXJ2aWNlLm5vdGlmeVJmbUFjdGlvbihldmVudHR5cGUsIHRoaXMucmVjb3JkLCB0aGlzLnJlc3VsdHMpO1xuICAgICAgICAgICAgLy8gVXBkYXRlIFJGTSBkYXRhIGZvciB0aGUgcmVjb3JkIChjcmVhdGVkIGEgbmV3IFJGTSBkYXRhIGNhbiBiZSBuZWNlc3NhcnkpXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJmbURhdGEocmZtRGlzcGxheSwgdGhpcy5yZm1TdGF0dXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVSZm1EYXRhKG5ld1N0YXR1czogUkZNRGlzcGxheSwgbmV3QWN0aW9uOiBSRk1EaXNwbGF5KSB7XG4gICAgICAgIGxldCB1cGRhdGVOZWVkZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLnJmbSkge1xuICAgICAgICAgICAgdGhpcy5yZm0gPSB7XG4gICAgICAgICAgICAgICAgZXZlbnRDb3VudDogMSxcbiAgICAgICAgICAgICAgICBhdmVyYWdlOiAwLFxuICAgICAgICAgICAgICAgIHN0YXR1czogbmV3U3RhdHVzLFxuICAgICAgICAgICAgICAgIGltYWdlOiBuZXdTdGF0dXMsXG4gICAgICAgICAgICAgICAgaW1hZ2VBY3Rpb246IG5ld0FjdGlvbixcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVBY3Rpb25zOiB0aGlzLnJmbURlZmF1bHRBdmFpbGFibGVBY3Rpb25zXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdXBkYXRlTmVlZGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChuZXdTdGF0dXMgPT09IFJGTURpc3BsYXkudW5yYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZm0uZXZlbnRDb3VudC0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZm0uZXZlbnRDb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZm0uc3RhdHVzID0gbmV3U3RhdHVzO1xuICAgICAgICAgICAgdGhpcy5yZm0uaW1hZ2UgPSBuZXdTdGF0dXM7XG4gICAgICAgICAgICB0aGlzLnJmbS5pbWFnZUFjdGlvbiA9IG5ld0FjdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1cGRhdGVOZWVkZWQpIHtcbiAgICAgICAgICAgIGxldCByZm0gPSB0aGlzLnJlY29yZC5yZm07XG4gICAgICAgICAgICBsZXQgdXBkYXRlUmZtID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIXJmbSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZVJmbSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmZtID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZm1bdGhpcy50eXBlXSA9IHRoaXMucmZtO1xuICAgICAgICAgICAgaWYgKHVwZGF0ZVJmbSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkLnJmbSA9IHJmbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFjdGlvbi51cGRhdGUoKTtcbiAgICB9XG59IiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImhhc1JGTUFjdGlvblwiPlxuICAgIDxkaXYgKm5nSWY9XCJkaXNwbGF5SW1nQWN0aW9uIHx8IGRpc3BsYXlNZW51XCIgW3NxLWFjdGlvbi1idXR0b25zXT1cIntpdGVtczogW2FjdGlvbl0sIGF1dG9BZGp1c3Q6IHRydWUsIHNpemU6IHNpemV9XCI+PC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cImRpc3BsYXlOb0FjdGlvblwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLXRleHQgcmZtLW5vLWFjdGlvblwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ7e2dldEFjdGlvbkljb24ocmZtLmltYWdlKX19XCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPiJdfQ==