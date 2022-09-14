import { ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵelement, ɵɵnextContext, ɵɵproperty, ɵɵpureFunction2, ɵɵpureFunction1, ɵɵelementStart, ɵɵelementEnd, ɵɵadvance, ɵɵclassMap, ɵɵelementContainerStart, ɵɵtemplate, ɵɵelementContainerEnd, ɵɵdirectiveInject, ChangeDetectorRef, ɵɵdefineComponent, ɵɵNgOnChangesFeature, Component, Input, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { RFMDisplay, RfmWebService, AuditWebService } from '@sinequa/core/web-services';
import { Utils } from '@sinequa/core/base';
import { Subject } from 'rxjs';
import { AppService } from '@sinequa/core/app-utils';
import { SearchService } from '@sinequa/components/search';
import { Action, BsActionButtons, BsActionModule } from '@sinequa/components/action';
import { NgIf, CommonModule } from '@angular/common';

var RFMEventType;
(function (RFMEventType) {
    RFMEventType["ClickSet"] = "RFM_ClickSet";
    RFMEventType["ClickReset"] = "RFM_ClickReset";
    RFMEventType["Like"] = "RFM_Like";
    RFMEventType["LikeReset"] = "RFM_LikeReset";
    RFMEventType["Dislike"] = "RFM_Dislike";
    RFMEventType["Important"] = "RFM_Important";
    RFMEventType["ImportantReset"] = "RFM_ImportantReset";
    RFMEventType["Ban"] = "RFM_Ban";
})(RFMEventType || (RFMEventType = {}));
class RFMService {
    constructor(appService, rfmService, searchService, auditService) {
        this.appService = appService;
        this.rfmService = rfmService;
        this.searchService = searchService;
        this.auditService = auditService;
        this._events = new Subject();
        this._subscription = this.searchService.resultsStream.subscribe(results => {
            this.updateRfm(results);
        });
    }
    get events() {
        return this._events;
    }
    ngOnDestroy() {
        this._events.complete();
        this._subscription.unsubscribe();
    }
    getMenuActions(config) {
        const actions = [RFMDisplay.positiveRate, RFMDisplay.unrate];
        if (config.negAvailable)
            actions.push(RFMDisplay.negativeRate);
        return actions;
    }
    static getActionName(rfmDisplay) {
        switch (rfmDisplay) {
            case RFMDisplay.positiveRate:
                return "pos";
            case RFMDisplay.mainlyPosRate:
                return "mpos";
            case RFMDisplay.unrate:
                return "unrated";
            case RFMDisplay.mainlyNegRate:
                return "mneg";
            case RFMDisplay.negativeRate:
                return "neg";
            default:
                return "none";
        }
    }
    static toAuditEventType(action, evt) {
        let aet;
        switch (action) {
            case "important":
                switch (evt) {
                    case RFMDisplay.positiveRate:
                        aet = RFMEventType.Important;
                        break;
                    case RFMDisplay.unrate:
                        aet = RFMEventType.ImportantReset;
                        break;
                    case RFMDisplay.negativeRate:
                        aet = RFMEventType.Ban;
                        break;
                }
                break;
            case "like":
                switch (evt) {
                    case RFMDisplay.positiveRate:
                        aet = RFMEventType.Like;
                        break;
                    case RFMDisplay.unrate:
                        aet = RFMEventType.LikeReset;
                        break;
                    case RFMDisplay.negativeRate:
                        aet = RFMEventType.Dislike;
                        break;
                }
                break;
            case "click":
                switch (evt) {
                    case RFMDisplay.positiveRate:
                        aet = RFMEventType.ClickSet;
                        break;
                    case RFMDisplay.unrate:
                        aet = RFMEventType.ClickReset;
                        break;
                    //case RFMDisplay.negativeRate:
                    //aet = AuditEventType.RFM_Dislike;
                    //break;
                }
                break;
        }
        return aet;
    }
    notifyRfmAction(rfmEvent, record, results) {
        this.auditService.notifyDocument(rfmEvent, record, results, undefined, {
            queryhash: this.searchService.results ? this.searchService.results.rfmQueryHash : undefined,
            querytext: this.searchService.query.text,
            querylang: this.searchService.query.questionLanguage || (this.appService.ccquery && this.appService.ccquery.questionLanguage)
        });
    }
    /**
     * Called every time new results come in.
     * Performs a request for
     * @param results
     */
    updateRfm(results) {
        if (results && results.records) {
            const ccquery = this.appService.ccquery;
            if (ccquery && ccquery.rFM) {
                Utils.subscribe(this.rfmService.getRfmData(ccquery.rFM, results), (value) => {
                    if (value) {
                        for (const record of results.records) {
                            const rfmData = value[record.id];
                            if (!!rfmData) {
                                record.rfm = rfmData;
                            }
                        }
                        this._events.next({ type: "updated" });
                    }
                });
            }
        }
    }
}
RFMService.ɵfac = function RFMService_Factory(t) { return new (t || RFMService)(ɵɵinject(AppService), ɵɵinject(RfmWebService), ɵɵinject(SearchService), ɵɵinject(AuditWebService)); };
RFMService.ɵprov = ɵɵdefineInjectable({ token: RFMService, factory: RFMService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(RFMService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: AppService }, { type: RfmWebService }, { type: SearchService }, { type: AuditWebService }]; }, null); })();

const _c0 = function (a0) { return [a0]; };
const _c1 = function (a0, a2) { return { items: a0, autoAdjust: true, size: a2 }; };
function BsRfmAction_ng_container_0_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "div", 2);
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("sq-action-buttons", ɵɵpureFunction2(3, _c1, ɵɵpureFunction1(1, _c0, ctx_r1.action), ctx_r1.size));
} }
function BsRfmAction_ng_container_0_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵelementStart(1, "div", 3);
    ɵɵelement(2, "span");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵclassMap(ctx_r2.getActionIcon(ctx_r2.rfm.image));
} }
function BsRfmAction_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsRfmAction_ng_container_0_div_1_Template, 1, 6, "div", 1);
    ɵɵtemplate(2, BsRfmAction_ng_container_0_div_2_Template, 3, 3, "div", 0);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.displayImgAction || ctx_r0.displayMenu);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.displayNoAction);
} }
class BsRfmAction {
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
BsRfmAction.ɵfac = function BsRfmAction_Factory(t) { return new (t || BsRfmAction)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(RFMService)); };
BsRfmAction.ɵcmp = ɵɵdefineComponent({ type: BsRfmAction, selectors: [["sq-rfm-action"]], inputs: { results: "results", record: "record", config: "config", rfm: "rfm", type: "type", size: "size" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "sq-action-buttons", 4, "ngIf"], [3, "sq-action-buttons"], [1, "btn-text", "rfm-no-action"]], template: function BsRfmAction_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsRfmAction_ng_container_0_Template, 3, 2, "ng-container", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.hasRFMAction);
    } }, directives: [NgIf, BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsRfmAction, [{
        type: Component,
        args: [{
                selector: "sq-rfm-action",
                templateUrl: "./rfm-action.html"
            }]
    }], function () { return [{ type: ChangeDetectorRef }, { type: RFMService }]; }, { results: [{
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

class BsRfmModule {
}
BsRfmModule.ɵmod = ɵɵdefineNgModule({ type: BsRfmModule });
BsRfmModule.ɵinj = ɵɵdefineInjector({ factory: function BsRfmModule_Factory(t) { return new (t || BsRfmModule)(); }, imports: [[
            CommonModule,
            BsActionModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BsRfmModule, { declarations: [BsRfmAction], imports: [CommonModule,
        BsActionModule], exports: [BsRfmAction] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsRfmModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    BsActionModule
                ],
                declarations: [
                    BsRfmAction
                ],
                exports: [
                    BsRfmAction
                ]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { BsRfmAction, BsRfmModule, RFMEventType, RFMService };
//# sourceMappingURL=sinequa-components-rfm.js.map
