import { Component, Input, } from "@angular/core";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/login";
import * as i2 from "../../labels.service";
import * as i3 from "@angular/common";
import * as i4 from "@sinequa/components/action";
const _c0 = function (a0, a1, a2, a3) { return { item: a0, size: a1, autoAdjust: a2, autoAdjustBreakpoint: a3, inMenu: true }; };
function BsLabelsMenuComponent_li_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "li", 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("sq-action-item", i0.ɵɵpureFunction4(2, _c0, ctx_r0.menu, ctx_r0.size, ctx_r0.autoAdjust, ctx_r0.autoAdjustBreakpoint))("collapseBreakpoint", ctx_r0.collapseBreakpoint);
} }
export class BsLabelsMenuComponent {
    constructor(loginService, labelsService) {
        this.loginService = loginService;
        this.labelsService = labelsService;
        this.icon = "fas fa-tags";
        this.autoAdjust = true;
        this.autoAdjustBreakpoint = "xl";
        this.collapseBreakpoint = "sm";
        this.renameAction = new Action({
            text: "msg#renameLabel.title",
            title: "msg#renameLabel.title",
            action: () => {
                this.labelsService.renameLabelModal();
            },
        });
        this.deleteAction = new Action({
            text: "msg#deleteLabel.title",
            title: "msg#deleteLabel.title",
            action: () => {
                this.labelsService.deleteLabelModal();
            },
        });
        this.bulkAddAction = new Action({
            text: "msg#bulkAddLabel.title",
            title: "msg#bulkAddLabel.title",
            action: () => {
                this.labelsService.bulkAddLabelModal();
            },
        });
        this.bulkDeleteAction = new Action({
            text: "msg#bulkRemoveLabel.title",
            title: "msg#bulkRemoveLabel.title",
            action: () => {
                this.labelsService.bulkRemoveLabelModal();
            },
        });
    }
    ngOnInit() {
        this._loginServiceSubscription = this.loginService.events.subscribe((event) => {
            if (event.type === "session-changed") {
                this.updateMenu();
            }
        });
    }
    ngOnDestroy() {
        if (this._loginServiceSubscription) {
            this._loginServiceSubscription.unsubscribe();
        }
    }
    ngOnChanges(changes) {
        if (changes.results) {
            this.updateMenu();
        }
    }
    updateMenu() {
        if (!this.loginService.complete) {
            this.menu = undefined;
            return;
        }
        if (!this.labelsService.publicLabelsField &&
            !this.labelsService.privateLabelsField) {
            this.menu = undefined;
            return;
        }
        const labelsActions = [this.renameAction, this.deleteAction];
        /** Allow Bulk actions only if there are some results */
        if (!!this.results && !!this.results.records) {
            labelsActions.push(this.bulkAddAction);
            labelsActions.push(this.bulkDeleteAction);
        }
        this.menu = new Action({
            icon: this.icon,
            text: "msg#labels.labels",
            children: labelsActions,
        });
    }
}
BsLabelsMenuComponent.ɵfac = function BsLabelsMenuComponent_Factory(t) { return new (t || BsLabelsMenuComponent)(i0.ɵɵdirectiveInject(i1.LoginService), i0.ɵɵdirectiveInject(i2.LabelsService)); };
BsLabelsMenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsLabelsMenuComponent, selectors: [["sq-labels-menu"]], inputs: { results: "results", icon: "icon", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", size: "size" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "nav-item dropdown", 3, "sq-action-item", "collapseBreakpoint", 4, "ngIf"], [1, "nav-item", "dropdown", 3, "sq-action-item", "collapseBreakpoint"]], template: function BsLabelsMenuComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsLabelsMenuComponent_li_0_Template, 1, 7, "li", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !!ctx.menu && !ctx.menu.hidden);
    } }, directives: [i3.NgIf, i4.BsActionItem], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsLabelsMenuComponent, [{
        type: Component,
        args: [{
                selector: "sq-labels-menu",
                templateUrl: "./labels-menu.component.html",
            }]
    }], function () { return [{ type: i1.LoginService }, { type: i2.LabelsService }]; }, { results: [{
            type: Input
        }], icon: [{
            type: Input
        }], autoAdjust: [{
            type: Input
        }], autoAdjustBreakpoint: [{
            type: Input
        }], collapseBreakpoint: [{
            type: Input
        }], size: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWxzLW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvbGFiZWxzLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2xhYmVscy1tZW51L2xhYmVscy1tZW51LmNvbXBvbmVudC50cyIsImJvb3RzdHJhcC9sYWJlbHMtbWVudS9sYWJlbHMtbWVudS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUVULEtBQUssR0FJUixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7O0lDUnBELHdCQUdNOzs7SUFGRixxSUFBNkgsaURBQUE7O0FEaUJqSSxNQUFNLE9BQU8scUJBQXFCO0lBa0I5QixZQUNXLFlBQTBCLEVBQzFCLGFBQTRCO1FBRDVCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBbEI5QixTQUFJLEdBQVcsYUFBYSxDQUFDO1FBQzdCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IseUJBQW9CLEdBQVcsSUFBSSxDQUFDO1FBQ3BDLHVCQUFrQixHQUFXLElBQUksQ0FBQztRQWlCdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLE1BQU0sQ0FBQztZQUMzQixJQUFJLEVBQUUsdUJBQXVCO1lBQzdCLEtBQUssRUFBRSx1QkFBdUI7WUFDOUIsTUFBTSxFQUFFLEdBQUcsRUFBRTtnQkFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDMUMsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUM7WUFDM0IsSUFBSSxFQUFFLHVCQUF1QjtZQUM3QixLQUFLLEVBQUUsdUJBQXVCO1lBQzlCLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLGFB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b21wb25lbnQsXG4gICAgT25Jbml0LFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2FjdGlvblwiO1xuaW1wb3J0IHsgTG9naW5TZXJ2aWNlIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbG9naW5cIjtcbmltcG9ydCB7IExhYmVsc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vbGFiZWxzLnNlcnZpY2VcIjtcbmltcG9ydCB7IFJlc3VsdHMgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gXCJyeGpzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLWxhYmVscy1tZW51XCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9sYWJlbHMtbWVudS5jb21wb25lbnQuaHRtbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBCc0xhYmVsc01lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSByZXN1bHRzOiBSZXN1bHRzO1xuICAgIEBJbnB1dCgpIGljb246IHN0cmluZyA9IFwiZmFzIGZhLXRhZ3NcIjtcbiAgICBASW5wdXQoKSBhdXRvQWRqdXN0OiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBhdXRvQWRqdXN0QnJlYWtwb2ludDogc3RyaW5nID0gXCJ4bFwiO1xuICAgIEBJbnB1dCgpIGNvbGxhcHNlQnJlYWtwb2ludDogc3RyaW5nID0gXCJzbVwiO1xuICAgIEBJbnB1dCgpIHNpemU6IHN0cmluZztcblxuICAgIG1lbnU6IEFjdGlvbiB8IHVuZGVmaW5lZDtcblxuICAgIC8vIExhYmVscyAgYWN0aW9uc1xuICAgIHJlbmFtZUFjdGlvbjogQWN0aW9uO1xuICAgIGRlbGV0ZUFjdGlvbjogQWN0aW9uO1xuICAgIGJ1bGtBZGRBY3Rpb246IEFjdGlvbjtcbiAgICBidWxrRGVsZXRlQWN0aW9uOiBBY3Rpb247XG5cbiAgICBwcml2YXRlIF9sb2dpblNlcnZpY2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgbG9naW5TZXJ2aWNlOiBMb2dpblNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBsYWJlbHNTZXJ2aWNlOiBMYWJlbHNTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMucmVuYW1lQWN0aW9uID0gbmV3IEFjdGlvbih7XG4gICAgICAgICAgICB0ZXh0OiBcIm1zZyNyZW5hbWVMYWJlbC50aXRsZVwiLFxuICAgICAgICAgICAgdGl0bGU6IFwibXNnI3JlbmFtZUxhYmVsLnRpdGxlXCIsXG4gICAgICAgICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsc1NlcnZpY2UucmVuYW1lTGFiZWxNb2RhbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kZWxldGVBY3Rpb24gPSBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgIHRleHQ6IFwibXNnI2RlbGV0ZUxhYmVsLnRpdGxlXCIsXG4gICAgICAgICAgICB0aXRsZTogXCJtc2cjZGVsZXRlTGFiZWwudGl0bGVcIixcbiAgICAgICAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxzU2VydmljZS5kZWxldGVMYWJlbE1vZGFsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmJ1bGtBZGRBY3Rpb24gPSBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgIHRleHQ6IFwibXNnI2J1bGtBZGRMYWJlbC50aXRsZVwiLFxuICAgICAgICAgICAgdGl0bGU6IFwibXNnI2J1bGtBZGRMYWJlbC50aXRsZVwiLFxuICAgICAgICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbHNTZXJ2aWNlLmJ1bGtBZGRMYWJlbE1vZGFsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmJ1bGtEZWxldGVBY3Rpb24gPSBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgIHRleHQ6IFwibXNnI2J1bGtSZW1vdmVMYWJlbC50aXRsZVwiLFxuICAgICAgICAgICAgdGl0bGU6IFwibXNnI2J1bGtSZW1vdmVMYWJlbC50aXRsZVwiLFxuICAgICAgICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbHNTZXJ2aWNlLmJ1bGtSZW1vdmVMYWJlbE1vZGFsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5fbG9naW5TZXJ2aWNlU3Vic2NyaXB0aW9uID0gdGhpcy5sb2dpblNlcnZpY2UuZXZlbnRzLnN1YnNjcmliZShcbiAgICAgICAgICAgIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcInNlc3Npb24tY2hhbmdlZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTWVudSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2xvZ2luU2VydmljZVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fbG9naW5TZXJ2aWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLnJlc3VsdHMpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWVudSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlTWVudSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2luU2VydmljZS5jb21wbGV0ZSkge1xuICAgICAgICAgICAgdGhpcy5tZW51ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXRoaXMubGFiZWxzU2VydmljZS5wdWJsaWNMYWJlbHNGaWVsZCAmJlxuICAgICAgICAgICAgIXRoaXMubGFiZWxzU2VydmljZS5wcml2YXRlTGFiZWxzRmllbGRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsYWJlbHNBY3Rpb25zOiBBY3Rpb25bXSA9IFt0aGlzLnJlbmFtZUFjdGlvbiwgdGhpcy5kZWxldGVBY3Rpb25dO1xuXG4gICAgICAgIC8qKiBBbGxvdyBCdWxrIGFjdGlvbnMgb25seSBpZiB0aGVyZSBhcmUgc29tZSByZXN1bHRzICovXG4gICAgICAgIGlmICghIXRoaXMucmVzdWx0cyAmJiAhIXRoaXMucmVzdWx0cy5yZWNvcmRzKSB7XG4gICAgICAgICAgICBsYWJlbHNBY3Rpb25zLnB1c2godGhpcy5idWxrQWRkQWN0aW9uKTtcbiAgICAgICAgICAgIGxhYmVsc0FjdGlvbnMucHVzaCh0aGlzLmJ1bGtEZWxldGVBY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tZW51ID0gbmV3IEFjdGlvbih7XG4gICAgICAgICAgICBpY29uOiB0aGlzLmljb24sXG4gICAgICAgICAgICB0ZXh0OiBcIm1zZyNsYWJlbHMubGFiZWxzXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogbGFiZWxzQWN0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiPGxpICpuZ0lmPVwiISFtZW51ICYmICFtZW51LmhpZGRlblwiIGNsYXNzPVwibmF2LWl0ZW0gZHJvcGRvd25cIiBcbiAgICBbc3EtYWN0aW9uLWl0ZW1dPVwie2l0ZW06IG1lbnUsIHNpemU6IHNpemUsIGF1dG9BZGp1c3Q6IGF1dG9BZGp1c3QsIGF1dG9BZGp1c3RCcmVha3BvaW50OiBhdXRvQWRqdXN0QnJlYWtwb2ludCwgaW5NZW51OiB0cnVlfVwiXG4gICAgW2NvbGxhcHNlQnJlYWtwb2ludF09XCJjb2xsYXBzZUJyZWFrcG9pbnRcIlxuPjwvbGk+Il19