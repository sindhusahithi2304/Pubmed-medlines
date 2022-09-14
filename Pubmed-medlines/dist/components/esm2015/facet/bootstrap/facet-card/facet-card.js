import { Component, Input, Output, EventEmitter, ContentChild, HostBinding } from "@angular/core";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@sinequa/components/action";
import * as i3 from "@sinequa/components/collapse";
import * as i4 from "@sinequa/core/intl";
const _c0 = ["facet"];
function BsFacetCard_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 10);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMapInterpolate1("card-icon ", ctx_r0.icon, " mr-2");
} }
function BsFacetCard_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.title));
} }
function BsFacetCard_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0, 12);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r2.facetComponent.headerTpl);
} }
function BsFacetCard_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0, 12);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r3.facetComponent.subHeaderTpl);
} }
function BsFacetCard_sq_collapse_10_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵprojection(0);
} }
function BsFacetCard_sq_collapse_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "sq-collapse", 13);
    i0.ɵɵtemplate(1, BsFacetCard_sq_collapse_10_ng_template_1_Template, 1, 0, "ng-template");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("collapsed", ctx_r4._collapsed);
} }
function BsFacetCard_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0, 12);
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r5.facetComponent.settingsTpl);
} }
function BsFacetCard_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0, 14);
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r6.facetComponent.footerTpl);
} }
const _c1 = function (a0, a1, a2) { return { items: a0, style: a1, size: a2, rightAligned: true }; };
const _c2 = ["*"];
export class BsFacetCard {
    constructor(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        /**
         * List of custom actions for this facet (optional)
         */
        this.actions = [];
        /**
         * Whether the [actions]="..." passed by binding should be displayed before or after
         * the actions from the inner facet component
         */
        this.actionsFirst = true;
        /**
         * Size of the custom actions
         */
        this.actionsSize = "sm";
        /**
         * Whether the facet can be collapsed (default: true)
         */
        this.collapsible = true;
        /**
         * Whether the facet starts collapsed (if collapsible / default: false)
         */
        this.startCollapsed = false;
        /**
         * Whether other actions should be hidden when the facet is collapsed (default: true)
         */
        this.hideActionsCollapsed = true;
        /**
         * Whether the facet can be expanded (default: false)
         */
        this.expandable = false;
        /**
         * Whether the facet starts expanded (if expandable / default: false)
         */
        this.startExpanded = false;
        /**
         * Whether the facet starts with opened settings (default: false)
         */
        this.startSettingsOpened = false;
        /**
         * Event triggered when the facet gets expanded or reduced
         */
        this.facetExpanded = new EventEmitter();
        /**
         * Event triggered when the facet gets expanded or reduced
         */
        this.facetCollapsed = new EventEmitter();
        /**
         * Event triggered when the facet gets expanded or reduced
         */
        this.settingsOpened = new EventEmitter();
        this.collapseAction = new Action({
            action: (action) => {
                this._collapsed = !this._collapsed;
                this.facetCollapsed.next(this._collapsed ? "collapsed" : "expanded");
                if (!!this.facetComponent) {
                    this.facetComponent.onCollapse(this._collapsed);
                }
                action.update();
            },
            updater: (action) => {
                action.icon = this._collapsed ? "fas fa-chevron-down" : "fas fa-chevron-up";
                action.title = this._collapsed ? 'msg#facetCard.expand' : 'msg#facetCard.collapse';
            }
        });
        this.expandAction = new Action({
            action: (action) => {
                this._expanded = !this._expanded;
                this.facetExpanded.next(this._expanded ? "expanded" : "reduced");
                if (!!this.facetComponent) {
                    this.facetComponent.onExpand(this._expanded);
                }
                action.update();
            },
            updater: (action) => {
                action.icon = this._expanded ? "fas fa-compress" : "fas fa-expand";
                action.title = this._expanded ? "msg#facetCard.reduce" : "msg#facetCard.enlarge";
            }
        });
        this.settingsAction = new Action({
            action: (action) => {
                this._settingsOpened = !this._settingsOpened;
                this.settingsOpened.next(this._settingsOpened ? "opened" : "saved");
                if (!!this.facetComponent) {
                    this.facetComponent.onOpenSettings(this._settingsOpened);
                }
                action.update();
            },
            updater: (action) => {
                action.icon = this._settingsOpened ? "far fa-save" : "fas fa-cog";
                action.title = this._settingsOpened ? "msg#facetCard.saveSettings" : "msg#facetCard.openSettings";
            }
        });
    }
    get hidden() {
        return !!this.facetComponent && !!this.facetComponent.isHidden && this.facetComponent.isHidden();
    }
    ngOnInit() {
        // Initialize actions
        this._collapsed = this.startCollapsed;
        this._expanded = this.startExpanded;
        this._settingsOpened = this.startSettingsOpened;
        this.collapseAction.update();
        this.expandAction.update();
        this.settingsAction.update();
    }
    ngAfterContentInit() {
        if (this.facetComponent) {
            this.actionChangedSubscription = this.facetComponent.actionsChanged.subscribe((actions) => {
                this.allActions.forEach(action => action.update());
                this.changeDetectorRef.markForCheck();
            });
        }
        else {
            console.warn("No #facet component is defined in this facet card: ", this.title);
        }
    }
    ngOnDestroy() {
        if (this.actionChangedSubscription) {
            this.actionChangedSubscription.unsubscribe();
        }
    }
    get allActions() {
        if (this.hideActionsCollapsed && this._collapsed)
            return [this.collapseAction]; // Hide other actions if collapsed
        let actions = [];
        if (this.actionsFirst) {
            actions.push(...this.actions);
        }
        if (this.facetComponent)
            actions = actions.concat(this.facetComponent.actions);
        if (this.hasSettings)
            actions.push(this.settingsAction);
        if (this.expandable)
            actions.push(this.expandAction);
        if (this.collapsible)
            actions.push(this.collapseAction);
        if (!this.actionsFirst) {
            actions.push(...this.actions);
        }
        return actions;
    }
    get hasSettings() {
        return !!this.facetComponent && !!this.facetComponent.settingsTpl;
    }
}
BsFacetCard.ɵfac = function BsFacetCard_Factory(t) { return new (t || BsFacetCard)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
BsFacetCard.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetCard, selectors: [["sq-facet-card"]], contentQueries: function BsFacetCard_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, _c0, true);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.facetComponent = _t.first);
    } }, hostVars: 7, hostBindings: function BsFacetCard_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵhostProperty("hidden", ctx.hidden);
        i0.ɵɵclassProp("collapsed", ctx._collapsed)("expanded", ctx._expanded)("settings-opened", ctx._settingsOpened);
    } }, inputs: { title: "title", tooltip: "tooltip", icon: "icon", buttonsStyle: "buttonsStyle", actions: "actions", actionsFirst: "actionsFirst", actionsSize: "actionsSize", collapsible: "collapsible", startCollapsed: "startCollapsed", hideActionsCollapsed: "hideActionsCollapsed", expandable: "expandable", startExpanded: "startExpanded", startSettingsOpened: "startSettingsOpened" }, outputs: { facetExpanded: "facetExpanded", facetCollapsed: "facetCollapsed", settingsOpened: "settingsOpened" }, ngContentSelectors: _c2, decls: 13, vars: 15, consts: [[1, "card"], [1, "card-header", "cursor-default", "pl-3", "pr-2", "py-1"], [1, "d-flex"], [1, "d-flex", "align-items-center", "text-truncate", "mr-auto", 3, "title"], ["aria-hidden", "true", 3, "class", 4, "ngIf"], ["class", "card-title text-truncate mb-0 py-1 mr-auto", 4, "ngIf"], [3, "ngTemplateOutlet", 4, "ngIf"], [1, "btn-group", 3, "sq-action-buttons"], [3, "collapsed", 4, "ngIf"], ["class", "card-footer", 3, "ngTemplateOutlet", 4, "ngIf"], ["aria-hidden", "true"], [1, "card-title", "text-truncate", "mb-0", "py-1", "mr-auto"], [3, "ngTemplateOutlet"], [3, "collapsed"], [1, "card-footer", 3, "ngTemplateOutlet"]], template: function BsFacetCard_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵpipe(4, "sqMessage");
        i0.ɵɵtemplate(5, BsFacetCard_div_5_Template, 1, 3, "div", 4);
        i0.ɵɵtemplate(6, BsFacetCard_div_6_Template, 3, 3, "div", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(7, BsFacetCard_ng_container_7_Template, 1, 1, "ng-container", 6);
        i0.ɵɵelement(8, "div", 7);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(9, BsFacetCard_ng_container_9_Template, 1, 1, "ng-container", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(10, BsFacetCard_sq_collapse_10_Template, 2, 1, "sq-collapse", 8);
        i0.ɵɵtemplate(11, BsFacetCard_ng_container_11_Template, 1, 1, "ng-container", 6);
        i0.ɵɵtemplate(12, BsFacetCard_ng_container_12_Template, 1, 1, "ng-container", 9);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("title", i0.ɵɵpipeBind1(4, 9, ctx.tooltip || ctx.title));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", !!ctx.icon);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.facetComponent && ctx.facetComponent.headerTpl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction3(11, _c1, ctx.allActions, ctx.buttonsStyle, ctx.actionsSize));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.facetComponent && ctx.facetComponent.subHeaderTpl);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx._settingsOpened);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.hasSettings && ctx._settingsOpened);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.facetComponent && ctx.facetComponent.footerTpl);
    } }, directives: [i1.NgIf, i2.BsActionButtons, i1.NgTemplateOutlet, i3.Collapse], pipes: [i4.MessagePipe], styles: [".cursor-default[_ngcontent-%COMP%] {cursor: default;}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsFacetCard, [{
        type: Component,
        args: [{
                selector: "sq-facet-card",
                templateUrl: "./facet-card.html",
                styles: [`
        .cursor-default {cursor: default;}
    `]
            }]
    }], function () { return [{ type: i0.ChangeDetectorRef }]; }, { title: [{
            type: Input
        }], tooltip: [{
            type: Input
        }], icon: [{
            type: Input
        }], buttonsStyle: [{
            type: Input
        }], actions: [{
            type: Input
        }], actionsFirst: [{
            type: Input
        }], actionsSize: [{
            type: Input
        }], collapsible: [{
            type: Input
        }], startCollapsed: [{
            type: Input
        }], hideActionsCollapsed: [{
            type: Input
        }], expandable: [{
            type: Input
        }], startExpanded: [{
            type: Input
        }], startSettingsOpened: [{
            type: Input
        }], facetExpanded: [{
            type: Output
        }], facetCollapsed: [{
            type: Output
        }], settingsOpened: [{
            type: Output
        }], facetComponent: [{
            type: ContentChild,
            args: ["facet", { static: false }]
        }], _collapsed: [{
            type: HostBinding,
            args: ['class.collapsed']
        }], _expanded: [{
            type: HostBinding,
            args: ['class.expanded']
        }], _settingsOpened: [{
            type: HostBinding,
            args: ['class.settings-opened']
        }], hidden: [{
            type: HostBinding,
            args: ['hidden']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtY2FyZC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2ZhY2V0LyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2ZhY2V0LWNhcmQvZmFjZXQtY2FyZC50cyIsImJvb3RzdHJhcC9mYWNldC1jYXJkL2ZhY2V0LWNhcmQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQXFCLFlBQVksRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFzQyxNQUFNLGVBQWUsQ0FBQztBQUV4SixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7O0lDRWxDLDBCQUE2RTs7O0lBQXpELDZEQUErQjs7O0lBQ25ELCtCQUFzRTtJQUFBLFlBQXNCOztJQUFBLGlCQUFNOzs7SUFBNUIsZUFBc0I7SUFBdEIsd0RBQXNCOzs7SUFFaEcsNEJBQ2U7OztJQURrRCxrRUFBNkM7OztJQUlsSCw0QkFBb0k7OztJQUFoRSxxRUFBZ0Q7OztJQUloSCxrQkFDYTs7O0lBSHJCLHVDQUNJO0lBQUEsd0ZBR2M7SUFDbEIsaUJBQWM7OztJQUxELDZDQUF3Qjs7O0lBTXJDLDRCQUFvSDs7O0lBQS9ELG9FQUErQzs7O0lBQ3BHLDRCQUFrSjs7O0lBQTdELGtFQUE2Qzs7OztBRFJ0SSxNQUFNLE9BQU8sV0FBVztJQXNHcEIsWUFDWSxpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQWpGaEQ7O1dBRUc7UUFDTSxZQUFPLEdBQWEsRUFBRSxDQUFDO1FBRWhDOzs7V0FHRztRQUNNLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBRTdCOztXQUVHO1FBQ00sZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFFNUI7O1dBRUc7UUFDTSxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUVyQzs7V0FFRztRQUNNLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBRXpDOztXQUVHO1FB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WUFBWTtrQkFBcEIsS0FBSztZQUtHLE9BQU87a0JBQWYsS0FBSztZQU1HLFlBQVk7a0JBQXBCLEtBQUs7WUFLRyxXQUFXO2tCQUFuQixLQUFLO1lBS0csV0FBVztrQkFBbkIsS0FBSztZQUtHLGNBQWM7a0JBQXRCLEtBQUs7WUFLRyxvQkFBb0I7a0JBQTVCLEtBQUs7WUFLRyxVQUFVO2tCQUFsQixLQUFLO1lBS0csYUFBYTtrQkFBckIsS0FBSztZQUtHLG1CQUFtQjtrQkFBM0IsS0FBSztZQUtJLGFBQWE7a0JBQXRCLE1BQU07WUFLRyxjQUFjO2tCQUF2QixNQUFNO1lBS0csY0FBYztrQkFBdkIsTUFBTTtZQUt3QyxjQUFjO2tCQUE1RCxZQUFZO21CQUFDLE9BQU8sRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7WUFFTixVQUFVO2tCQUF6QyxXQUFXO21CQUFDLGlCQUFpQjtZQUNDLFNBQVM7a0JBQXZDLFdBQVc7bUJBQUMsZ0JBQWdCO1lBQ1MsZUFBZTtrQkFBcEQsV0FBVzttQkFBQyx1QkFBdUI7WUFFVCxNQUFNO2tCQUFoQyxXQUFXO21CQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgT25Jbml0LCBPbkRlc3Ryb3ksIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkLCBIb3N0QmluZGluZywgQWZ0ZXJDb250ZW50SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7QWN0aW9ufSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9hY3Rpb25cIjtcbmltcG9ydCB7QWJzdHJhY3RGYWNldH0gZnJvbSBcIi4uLy4uL2Fic3RyYWN0LWZhY2V0XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLWZhY2V0LWNhcmRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2ZhY2V0LWNhcmQuaHRtbFwiLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgLmN1cnNvci1kZWZhdWx0IHtjdXJzb3I6IGRlZmF1bHQ7fVxuICAgIGBdXG59KVxuZXhwb3J0IGNsYXNzIEJzRmFjZXRDYXJkIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudEluaXQge1xuXG4gICAgLyoqXG4gICAgICogVGl0bGUgb2YgdGhpcyBmYWNldCAob3B0aW9uYWwpXG4gICAgICovXG4gICAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRvb2x0aXAgb2YgdGhpcyBmYWNldCAoZGVmYXVsdHMgdG8gdGl0bGUpXG4gICAgICovXG4gICAgQElucHV0KCkgdG9vbHRpcDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogSWNvbiBvZiB0aGlzIGZhY2V0LCBpbiBhIGZvcm0gb2YgYSBzcGFuIGNsYXNzIG5hbWUgKG9wdGlvbmFsKVxuICAgICAqL1xuICAgIEBJbnB1dCgpIGljb246IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEJvb3RzdHJhcCB0aGVtZSBuYW1lIChsaWdodCwgZGFyay4uLilcbiAgICAgKi9cbiAgICBASW5wdXQoKSBidXR0b25zU3R5bGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgY3VzdG9tIGFjdGlvbnMgZm9yIHRoaXMgZmFjZXQgKG9wdGlvbmFsKVxuICAgICAqL1xuICAgIEBJbnB1dCgpIGFjdGlvbnM6IEFjdGlvbltdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBbYWN0aW9uc109XCIuLi5cIiBwYXNzZWQgYnkgYmluZGluZyBzaG91bGQgYmUgZGlzcGxheWVkIGJlZm9yZSBvciBhZnRlclxuICAgICAqIHRoZSBhY3Rpb25zIGZyb20gdGhlIGlubmVyIGZhY2V0IGNvbXBvbmVudFxuICAgICAqL1xuICAgIEBJbnB1dCgpIGFjdGlvbnNGaXJzdCA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBTaXplIG9mIHRoZSBjdXN0b20gYWN0aW9uc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFjdGlvbnNTaXplID0gXCJzbVwiO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgZmFjZXQgY2FuIGJlIGNvbGxhcHNlZCAoZGVmYXVsdDogdHJ1ZSlcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjb2xsYXBzaWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBmYWNldCBzdGFydHMgY29sbGFwc2VkIChpZiBjb2xsYXBzaWJsZSAvIGRlZmF1bHQ6IGZhbHNlKVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0YXJ0Q29sbGFwc2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIG90aGVyIGFjdGlvbnMgc2hvdWxkIGJlIGhpZGRlbiB3aGVuIHRoZSBmYWNldCBpcyBjb2xsYXBzZWQgKGRlZmF1bHQ6IHRydWUpXG4gICAgICovXG4gICAgQElucHV0KCkgaGlkZUFjdGlvbnNDb2xsYXBzZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgZmFjZXQgY2FuIGJlIGV4cGFuZGVkIChkZWZhdWx0OiBmYWxzZSlcbiAgICAgKi9cbiAgICBASW5wdXQoKSBleHBhbmRhYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBmYWNldCBzdGFydHMgZXhwYW5kZWQgKGlmIGV4cGFuZGFibGUgLyBkZWZhdWx0OiBmYWxzZSlcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdGFydEV4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBmYWNldCBzdGFydHMgd2l0aCBvcGVuZWQgc2V0dGluZ3MgKGRlZmF1bHQ6IGZhbHNlKVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0YXJ0U2V0dGluZ3NPcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IHRyaWdnZXJlZCB3aGVuIHRoZSBmYWNldCBnZXRzIGV4cGFuZGVkIG9yIHJlZHVjZWRcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgZmFjZXRFeHBhbmRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8XCJleHBhbmRlZFwifFwicmVkdWNlZFwiPigpO1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgdHJpZ2dlcmVkIHdoZW4gdGhlIGZhY2V0IGdldHMgZXhwYW5kZWQgb3IgcmVkdWNlZFxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBmYWNldENvbGxhcHNlZCA9IG5ldyBFdmVudEVtaXR0ZXI8XCJjb2xsYXBzZWRcInxcImV4cGFuZGVkXCI+KCk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCB0cmlnZ2VyZWQgd2hlbiB0aGUgZmFjZXQgZ2V0cyBleHBhbmRlZCBvciByZWR1Y2VkXG4gICAgICovXG4gICAgQE91dHB1dCgpIHNldHRpbmdzT3BlbmVkID0gbmV3IEV2ZW50RW1pdHRlcjxcIm9wZW5lZFwifFwic2F2ZWRcInxcImNhbmNlbGVkXCI+KCk7XG5cbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgdG8gdGhlIGNoaWxkIGZhY2V0IGluc2VydGVkIGJ5IHRyYW5zY2x1c2lvbiAobmctY29udGVudClcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKFwiZmFjZXRcIiwge3N0YXRpYzogZmFsc2V9KSBwdWJsaWMgZmFjZXRDb21wb25lbnQ6IEFic3RyYWN0RmFjZXQ7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNvbGxhcHNlZCcpIF9jb2xsYXBzZWQ6IGJvb2xlYW47XG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5leHBhbmRlZCcpIF9leHBhbmRlZDogYm9vbGVhbjtcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNldHRpbmdzLW9wZW5lZCcpIF9zZXR0aW5nc09wZW5lZDogYm9vbGVhbjtcblxuICAgIEBIb3N0QmluZGluZygnaGlkZGVuJykgZ2V0IGhpZGRlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5mYWNldENvbXBvbmVudCAmJiAhIXRoaXMuZmFjZXRDb21wb25lbnQuaXNIaWRkZW4gJiYgdGhpcy5mYWNldENvbXBvbmVudC5pc0hpZGRlbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVhZG9ubHkgY29sbGFwc2VBY3Rpb247XG4gICAgcHJpdmF0ZSByZWFkb25seSBleHBhbmRBY3Rpb247XG4gICAgcHJpdmF0ZSByZWFkb25seSBzZXR0aW5nc0FjdGlvbjtcblxuICAgIHByaXZhdGUgYWN0aW9uQ2hhbmdlZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKXtcblxuICAgICAgICB0aGlzLmNvbGxhcHNlQWN0aW9uID0gbmV3IEFjdGlvbih7XG4gICAgICAgICAgICBhY3Rpb246IChhY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb2xsYXBzZWQgPSAhdGhpcy5fY29sbGFwc2VkO1xuICAgICAgICAgICAgICAgIHRoaXMuZmFjZXRDb2xsYXBzZWQubmV4dCh0aGlzLl9jb2xsYXBzZWQgPyBcImNvbGxhcHNlZFwiIDogXCJleHBhbmRlZFwiKTtcbiAgICAgICAgICAgICAgICBpZighIXRoaXMuZmFjZXRDb21wb25lbnQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhY2V0Q29tcG9uZW50Lm9uQ29sbGFwc2UodGhpcy5fY29sbGFwc2VkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZXI6IChhY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICBhY3Rpb24uaWNvbiA9IHRoaXMuX2NvbGxhcHNlZCA/IFwiZmFzIGZhLWNoZXZyb24tZG93blwiIDogXCJmYXMgZmEtY2hldnJvbi11cFwiO1xuICAgICAgICAgICAgICAgIGFjdGlvbi50aXRsZSA9IHRoaXMuX2NvbGxhcHNlZCA/ICdtc2cjZmFjZXRDYXJkLmV4cGFuZCcgOiAnbXNnI2ZhY2V0Q2FyZC5jb2xsYXBzZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZXhwYW5kQWN0aW9uID0gbmV3IEFjdGlvbih7XG4gICAgICAgICAgICBhY3Rpb246IChhY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9leHBhbmRlZCA9ICF0aGlzLl9leHBhbmRlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2V0RXhwYW5kZWQubmV4dCh0aGlzLl9leHBhbmRlZCA/IFwiZXhwYW5kZWRcIiA6IFwicmVkdWNlZFwiKTtcbiAgICAgICAgICAgICAgICBpZighIXRoaXMuZmFjZXRDb21wb25lbnQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhY2V0Q29tcG9uZW50Lm9uRXhwYW5kKHRoaXMuX2V4cGFuZGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZXI6IChhY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICBhY3Rpb24uaWNvbiA9IHRoaXMuX2V4cGFuZGVkID8gXCJmYXMgZmEtY29tcHJlc3NcIiA6IFwiZmFzIGZhLWV4cGFuZFwiO1xuICAgICAgICAgICAgICAgIGFjdGlvbi50aXRsZSA9IHRoaXMuX2V4cGFuZGVkID8gXCJtc2cjZmFjZXRDYXJkLnJlZHVjZVwiIDogXCJtc2cjZmFjZXRDYXJkLmVubGFyZ2VcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZXR0aW5nc0FjdGlvbiA9IG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uOiAoYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NPcGVuZWQgPSAhdGhpcy5fc2V0dGluZ3NPcGVuZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nc09wZW5lZC5uZXh0KHRoaXMuX3NldHRpbmdzT3BlbmVkPyBcIm9wZW5lZFwiIDogXCJzYXZlZFwiKTtcbiAgICAgICAgICAgICAgICBpZighIXRoaXMuZmFjZXRDb21wb25lbnQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhY2V0Q29tcG9uZW50Lm9uT3BlblNldHRpbmdzKHRoaXMuX3NldHRpbmdzT3BlbmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZXI6IChhY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICBhY3Rpb24uaWNvbiA9IHRoaXMuX3NldHRpbmdzT3BlbmVkID8gXCJmYXIgZmEtc2F2ZVwiIDogXCJmYXMgZmEtY29nXCI7XG4gICAgICAgICAgICAgICAgYWN0aW9uLnRpdGxlID0gdGhpcy5fc2V0dGluZ3NPcGVuZWQgPyBcIm1zZyNmYWNldENhcmQuc2F2ZVNldHRpbmdzXCIgOiBcIm1zZyNmYWNldENhcmQub3BlblNldHRpbmdzXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKXtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBhY3Rpb25zXG4gICAgICAgIHRoaXMuX2NvbGxhcHNlZCA9IHRoaXMuc3RhcnRDb2xsYXBzZWQ7XG4gICAgICAgIHRoaXMuX2V4cGFuZGVkID0gdGhpcy5zdGFydEV4cGFuZGVkO1xuICAgICAgICB0aGlzLl9zZXR0aW5nc09wZW5lZCA9IHRoaXMuc3RhcnRTZXR0aW5nc09wZW5lZDtcblxuICAgICAgICB0aGlzLmNvbGxhcHNlQWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLmV4cGFuZEFjdGlvbi51cGRhdGUoKTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc0FjdGlvbi51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKXtcbiAgICAgICAgaWYodGhpcy5mYWNldENvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25DaGFuZ2VkU3Vic2NyaXB0aW9uID0gdGhpcy5mYWNldENvbXBvbmVudC5hY3Rpb25zQ2hhbmdlZC5zdWJzY3JpYmUoKGFjdGlvbnMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsbEFjdGlvbnMuZm9yRWFjaChhY3Rpb24gPT4gYWN0aW9uLnVwZGF0ZSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJObyAjZmFjZXQgY29tcG9uZW50IGlzIGRlZmluZWQgaW4gdGhpcyBmYWNldCBjYXJkOiBcIiwgdGhpcy50aXRsZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpe1xuICAgICAgICBpZih0aGlzLmFjdGlvbkNoYW5nZWRTdWJzY3JpcHRpb24pe1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25DaGFuZ2VkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGFsbEFjdGlvbnMoKSA6IEFjdGlvbltdIHtcbiAgICAgICAgaWYodGhpcy5oaWRlQWN0aW9uc0NvbGxhcHNlZCAmJiB0aGlzLl9jb2xsYXBzZWQpIHJldHVybiBbdGhpcy5jb2xsYXBzZUFjdGlvbl07IC8vIEhpZGUgb3RoZXIgYWN0aW9ucyBpZiBjb2xsYXBzZWRcbiAgICAgICAgbGV0IGFjdGlvbnMgPSBbXSBhcyBBY3Rpb25bXTtcbiAgICAgICAgaWYodGhpcy5hY3Rpb25zRmlyc3QpIHtcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaCguLi50aGlzLmFjdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuZmFjZXRDb21wb25lbnQpIGFjdGlvbnMgPSBhY3Rpb25zLmNvbmNhdCh0aGlzLmZhY2V0Q29tcG9uZW50LmFjdGlvbnMpO1xuICAgICAgICBpZih0aGlzLmhhc1NldHRpbmdzKSBhY3Rpb25zLnB1c2godGhpcy5zZXR0aW5nc0FjdGlvbik7XG4gICAgICAgIGlmKHRoaXMuZXhwYW5kYWJsZSkgYWN0aW9ucy5wdXNoKHRoaXMuZXhwYW5kQWN0aW9uKTtcbiAgICAgICAgaWYodGhpcy5jb2xsYXBzaWJsZSkgYWN0aW9ucy5wdXNoKHRoaXMuY29sbGFwc2VBY3Rpb24pO1xuICAgICAgICBpZighdGhpcy5hY3Rpb25zRmlyc3QpIHtcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaCguLi50aGlzLmFjdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY3Rpb25zO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaGFzU2V0dGluZ3MoKXtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5mYWNldENvbXBvbmVudCAmJiAhIXRoaXMuZmFjZXRDb21wb25lbnQuc2V0dGluZ3NUcGw7XG4gICAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImNhcmRcIj4gICAgXG4gICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyIGN1cnNvci1kZWZhdWx0IHBsLTMgcHItMiBweS0xXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXhcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyIHRleHQtdHJ1bmNhdGUgbXItYXV0b1wiIFt0aXRsZV09XCIodG9vbHRpcCB8fCB0aXRsZSkgfCBzcU1lc3NhZ2VcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiISFpY29uXCIgY2xhc3M9XCJjYXJkLWljb24ge3tpY29ufX0gbXItMlwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJ0aXRsZVwiIGNsYXNzPVwiY2FyZC10aXRsZSB0ZXh0LXRydW5jYXRlIG1iLTAgcHktMSBtci1hdXRvXCI+e3t0aXRsZSB8IHNxTWVzc2FnZSB9fTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZmFjZXRDb21wb25lbnQgJiYgZmFjZXRDb21wb25lbnQuaGVhZGVyVHBsXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiZmFjZXRDb21wb25lbnQuaGVhZGVyVHBsXCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiBbc3EtYWN0aW9uLWJ1dHRvbnNdPVwie2l0ZW1zOiBhbGxBY3Rpb25zLCBzdHlsZTogYnV0dG9uc1N0eWxlLCBzaXplOiBhY3Rpb25zU2l6ZSwgcmlnaHRBbGlnbmVkOiB0cnVlfVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImZhY2V0Q29tcG9uZW50ICYmIGZhY2V0Q29tcG9uZW50LnN1YkhlYWRlclRwbFwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImZhY2V0Q29tcG9uZW50LnN1YkhlYWRlclRwbFwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICAgIDxzcS1jb2xsYXBzZSBbY29sbGFwc2VkXT1cIl9jb2xsYXBzZWRcIiAqbmdJZj1cIiFfc2V0dGluZ3NPcGVuZWRcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9zcS1jb2xsYXBzZT5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaGFzU2V0dGluZ3MgJiYgX3NldHRpbmdzT3BlbmVkXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiZmFjZXRDb21wb25lbnQuc2V0dGluZ3NUcGxcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8bmctY29udGFpbmVyIGNsYXNzPVwiY2FyZC1mb290ZXJcIiAqbmdJZj1cImZhY2V0Q29tcG9uZW50ICYmIGZhY2V0Q29tcG9uZW50LmZvb3RlclRwbFwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImZhY2V0Q29tcG9uZW50LmZvb3RlclRwbFwiPjwvbmctY29udGFpbmVyPlxuPC9kaXY+Il19