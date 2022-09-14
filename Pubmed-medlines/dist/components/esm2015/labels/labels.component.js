import { Component, Input, HostBinding } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "./labels.service";
import * as i3 from "@angular/common";
import * as i4 from "@sinequa/core/intl";
import * as i5 from "./label.pipe";
function Labels_div_0_span_1_i_6_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "i", 6);
    i0.ɵɵlistener("click", function Labels_div_0_span_1_i_6_Template_i_click_0_listener() { i0.ɵɵrestoreView(_r7); const $index_r3 = i0.ɵɵnextContext().index; const ctx_r5 = i0.ɵɵnextContext(2); return ctx_r5.remove($index_r3); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 1, ctx_r4.public ? "msg#labels.removePublicLabelTitle" : "msg#labels.removePrivateLabelTitle"));
} }
const _c0 = function (a0, a1) { return { "sq-labels-public": a0, "sq-labels-private": a1 }; };
function Labels_div_0_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 1);
    i0.ɵɵelementStart(1, "div", 3);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementStart(3, "span", 4);
    i0.ɵɵlistener("click", function Labels_div_0_span_1_Template_span_click_3_listener() { i0.ɵɵrestoreView(_r9); const label_r2 = ctx.$implicit; const ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.select(label_r2); });
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "sqLabel");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, Labels_div_0_span_1_i_6_Template, 2, 3, "i", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const label_r2 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(2, 4, ctx_r1.public ? "msg#labels.selectPublicLabelTitle" : "msg#labels.selectPrivateLabelTitle"));
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(9, _c0, ctx_r1.public, !ctx_r1.public));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 6, label_r2, ctx_r1.public));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.canRemove());
} }
function Labels_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtemplate(1, Labels_div_0_span_1_Template, 7, 12, "span", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.labels);
} }
export class Labels {
    constructor(appService, labelsService) {
        this.appService = appService;
        this.labelsService = labelsService;
        this.enableDelete = false; /** Display the delete button in the label tag */
    }
    ngOnChanges() {
        const field = this.public
            ? this.labelsService.publicLabelsField
            : this.labelsService.privateLabelsField;
        this.labelsField = this.appService.resolveColumnAlias(field);
        this.showLabels = !!this.labelsField;
        this.makeLabels();
    }
    makeLabels() {
        if (!this.showLabels) {
            this.labels = [];
            return;
        }
        const labels = this.record[this.labelsField];
        if (Utils.isArray(labels)) {
            this.labels = this.labelsService.sort(labels.slice(), this.public);
        }
        else {
            this.labels = [];
        }
    }
    select(label) {
        if (!this.public) {
            label = this.labelsService.removePrivatePrefix(label);
        }
        this.labelsService.selectLabels([label], this.public);
    }
    remove(index) {
        if (this.canRemove()) {
            let label = this.labels[index];
            if (!this.public) {
                label = this.labelsService.removePrivatePrefix(label);
            }
            this.labelsService.removeLabels([label], [this.record.id], this.public);
        }
    }
    canRemove() {
        return this.public
            ? this.enableDelete &&
                this.labelsService.allowPublicLabelsManagement &&
                this.labelsService.userLabelsRights &&
                this.labelsService.userLabelsRights.canManagePublicLabels
            : this.enableDelete && true;
    }
}
Labels.ɵfac = function Labels_Factory(t) { return new (t || Labels)(i0.ɵɵdirectiveInject(i1.AppService), i0.ɵɵdirectiveInject(i2.LabelsService)); };
Labels.ɵcmp = i0.ɵɵdefineComponent({ type: Labels, selectors: [["sq-labels"]], hostVars: 2, hostBindings: function Labels_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassMap(ctx.hostClasses);
    } }, inputs: { record: "record", public: "public", enableDelete: "enableDelete" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "d-inline", 4, "ngIf"], [1, "d-inline"], ["class", "d-inline", 4, "ngFor", "ngForOf"], [1, "badge", "badge-pill", "badge-info", "align-self-center", "mr-1", "d-inline", 3, "ngClass", "title"], [3, "click"], ["class", "sq-label-remove fas fa-times-circle clickable", 3, "title", "click", 4, "ngIf"], [1, "sq-label-remove", "fas", "fa-times-circle", "clickable", 3, "title", "click"]], template: function Labels_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, Labels_div_0_Template, 2, 1, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.showLabels);
    } }, directives: [i3.NgIf, i3.NgForOf, i3.NgClass], pipes: [i4.MessagePipe, i5.LabelPipe], styles: [".sq-labels-public[_ngcontent-%COMP%] {\n                background-color: #4fc3f7;\n            }\n            .sq-labels-private[_ngcontent-%COMP%] {\n                background-color: #7283a7;\n            }\n            .sq-label-remove[_ngcontent-%COMP%] {\n                margin-left: 3px;\n            }\n            .clickable[_ngcontent-%COMP%] {\n                cursor: pointer;\n            }\n            .clickable[_ngcontent-%COMP%]:hover {\n                opacity: 85%;\n            }"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Labels, [{
        type: Component,
        args: [{
                selector: "sq-labels",
                // We need the two spans to get whitespace between each label
                // change size by adding h1-6 class to .sq-label div (default is h5)
                templateUrl: "./labels.component.html",
                styles: [
                    `
            .sq-labels-public {
                background-color: #4fc3f7;
            }
            .sq-labels-private {
                background-color: #7283a7;
            }
            .sq-label-remove {
                margin-left: 3px;
            }
            .clickable {
                cursor: pointer;
            }
            .clickable:hover {
                opacity: 85%;
            }
        `,
                ],
            }]
    }], function () { return [{ type: i1.AppService }, { type: i2.LabelsService }]; }, { record: [{
            type: Input
        }], public: [{
            type: Input
        }], enableDelete: [{
            type: Input
        }], hostClasses: [{
            type: HostBinding,
            args: ["class"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2xhYmVscy8iLCJzb3VyY2VzIjpbImxhYmVscy5jb21wb25lbnQudHMiLCJsYWJlbHMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7O0lDSS9CLDRCQUVBO0lBRnlELGtPQUF3Qjs7SUFFakYsaUJBQUk7OztJQURBLG1KQUE2Rzs7Ozs7SUFMekgsK0JBQ0k7SUFBQSw4QkFFSTs7SUFBQSwrQkFBOEI7SUFBeEIsb05BQXVCO0lBQUMsWUFBMEI7O0lBQUEsaUJBQU87SUFDL0QsZ0VBRUk7SUFDUixpQkFBTTtJQUNWLGlCQUFPOzs7O0lBTkMsZUFBNkc7SUFBN0csbUpBQTZHO0lBRHhDLG1GQUFzRTtJQUU3RyxlQUEwQjtJQUExQixtRUFBMEI7SUFDMkIsZUFBaUI7SUFBakIseUNBQWlCOzs7SUFMaEgsOEJBQ0k7SUFBQSxnRUFRTztJQUNYLGlCQUFNOzs7SUFUc0IsZUFBVztJQUFYLHVDQUFXOztBRDhCdkMsTUFBTSxPQUFPLE1BQU07SUFXZixZQUNZLFVBQXNCLEVBQ3RCLGFBQTRCO1FBRDVCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFWL0IsaUJBQVksR0FBWSxLQUFLLENBQUMsQ0FBQyxpREFBaUQ7SUFXdEYsQ0FBQztJQUVKLFdBQVc7UUFDUCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTTtZQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUI7WUFDdEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUM7UUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDckMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTyxVQUFVO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDakIsT0FBTztTQUNWO1FBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0MsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN0RTthQUFNO1lBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQWE7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZCxLQUFLLEdBQVcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqRTtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxNQUFNLENBQUMsS0FBYTtRQUNoQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNsQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNkLEtBQUssR0FBVyxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2pFO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQzNCLENBQUMsS0FBSyxDQUFDLEVBQ1AsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUNoQixJQUFJLENBQUMsTUFBTSxDQUNkLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTTtZQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWTtnQkFDZixJQUFJLENBQUMsYUFBYSxDQUFDLDJCQUEyQjtnQkFDOUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0I7Z0JBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCO1lBQzdELENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQztJQUNwQyxDQUFDOzs0REFsRVEsTUFBTTsyQ0FBTixNQUFNOzs7UUMvQm5CLHVEQVVNOztRQVZBLHFDQUFnQjs7a0REK0JULE1BQU07Y0F6QmxCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsV0FBVztnQkFDckIsNkRBQTZEO2dCQUM3RCxvRUFBb0U7Z0JBQ3BFLFdBQVcsRUFBRSx5QkFBeUI7Z0JBQ3RDLE1BQU0sRUFBRTtvQkFDSjs7Ozs7Ozs7Ozs7Ozs7OztTQWdCQztpQkFDSjthQUNKO3lGQUVZLE1BQU07a0JBQWQsS0FBSztZQUNHLE1BQU07a0JBQWQsS0FBSztZQUNHLFlBQVk7a0JBQXBCLEtBQUs7WUFNZ0IsV0FBVztrQkFBaEMsV0FBVzttQkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBIb3N0QmluZGluZyB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7IFJlY29yZCB9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHsgTGFiZWxzU2VydmljZSB9IGZyb20gXCIuL2xhYmVscy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBBcHBTZXJ2aWNlIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYXBwLXV0aWxzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLWxhYmVsc1wiLFxuICAgIC8vIFdlIG5lZWQgdGhlIHR3byBzcGFucyB0byBnZXQgd2hpdGVzcGFjZSBiZXR3ZWVuIGVhY2ggbGFiZWxcbiAgICAvLyBjaGFuZ2Ugc2l6ZSBieSBhZGRpbmcgaDEtNiBjbGFzcyB0byAuc3EtbGFiZWwgZGl2IChkZWZhdWx0IGlzIGg1KVxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbGFiZWxzLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGBcbiAgICAgICAgICAgIC5zcS1sYWJlbHMtcHVibGljIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGZjM2Y3O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnNxLWxhYmVscy1wcml2YXRlIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzI4M2E3O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnNxLWxhYmVsLXJlbW92ZSB7XG4gICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDNweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5jbGlja2FibGUge1xuICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5jbGlja2FibGU6aG92ZXIge1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDg1JTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYCxcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBMYWJlbHMgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIHJlY29yZDogUmVjb3JkO1xuICAgIEBJbnB1dCgpIHB1YmxpYzogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBlbmFibGVEZWxldGU6IGJvb2xlYW4gPSBmYWxzZTsgLyoqIERpc3BsYXkgdGhlIGRlbGV0ZSBidXR0b24gaW4gdGhlIGxhYmVsIHRhZyAqL1xuXG4gICAgcHJvdGVjdGVkIGxhYmVsc0ZpZWxkOiBzdHJpbmc7XG4gICAgc2hvd0xhYmVsczogYm9vbGVhbjtcbiAgICBsYWJlbHM6IHN0cmluZ1tdO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3NcIikgaG9zdENsYXNzZXM7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhcHBTZXJ2aWNlOiBBcHBTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGxhYmVsc1NlcnZpY2U6IExhYmVsc1NlcnZpY2VcbiAgICApIHt9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgY29uc3QgZmllbGQgPSB0aGlzLnB1YmxpY1xuICAgICAgICAgICAgPyB0aGlzLmxhYmVsc1NlcnZpY2UucHVibGljTGFiZWxzRmllbGRcbiAgICAgICAgICAgIDogdGhpcy5sYWJlbHNTZXJ2aWNlLnByaXZhdGVMYWJlbHNGaWVsZDtcbiAgICAgICAgdGhpcy5sYWJlbHNGaWVsZCA9IHRoaXMuYXBwU2VydmljZS5yZXNvbHZlQ29sdW1uQWxpYXMoZmllbGQpO1xuICAgICAgICB0aGlzLnNob3dMYWJlbHMgPSAhIXRoaXMubGFiZWxzRmllbGQ7XG4gICAgICAgIHRoaXMubWFrZUxhYmVscygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWFrZUxhYmVscygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNob3dMYWJlbHMpIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWxzID0gW107XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGFiZWxzID0gdGhpcy5yZWNvcmRbdGhpcy5sYWJlbHNGaWVsZF07XG4gICAgICAgIGlmIChVdGlscy5pc0FycmF5KGxhYmVscykpIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWxzID0gdGhpcy5sYWJlbHNTZXJ2aWNlLnNvcnQobGFiZWxzLnNsaWNlKCksIHRoaXMucHVibGljKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWxzID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3QobGFiZWw6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMucHVibGljKSB7XG4gICAgICAgICAgICBsYWJlbCA9IDxzdHJpbmc+dGhpcy5sYWJlbHNTZXJ2aWNlLnJlbW92ZVByaXZhdGVQcmVmaXgobGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGFiZWxzU2VydmljZS5zZWxlY3RMYWJlbHMoW2xhYmVsXSwgdGhpcy5wdWJsaWMpO1xuICAgIH1cblxuICAgIHJlbW92ZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmNhblJlbW92ZSgpKSB7XG4gICAgICAgICAgICBsZXQgbGFiZWwgPSB0aGlzLmxhYmVsc1tpbmRleF07XG4gICAgICAgICAgICBpZiAoIXRoaXMucHVibGljKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSA8c3RyaW5nPnRoaXMubGFiZWxzU2VydmljZS5yZW1vdmVQcml2YXRlUHJlZml4KGxhYmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubGFiZWxzU2VydmljZS5yZW1vdmVMYWJlbHMoXG4gICAgICAgICAgICAgICAgW2xhYmVsXSxcbiAgICAgICAgICAgICAgICBbdGhpcy5yZWNvcmQuaWRdLFxuICAgICAgICAgICAgICAgIHRoaXMucHVibGljXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuUmVtb3ZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wdWJsaWNcbiAgICAgICAgICAgID8gdGhpcy5lbmFibGVEZWxldGUgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsc1NlcnZpY2UuYWxsb3dQdWJsaWNMYWJlbHNNYW5hZ2VtZW50ICYmXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbHNTZXJ2aWNlLnVzZXJMYWJlbHNSaWdodHMgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsc1NlcnZpY2UudXNlckxhYmVsc1JpZ2h0cy5jYW5NYW5hZ2VQdWJsaWNMYWJlbHNcbiAgICAgICAgICAgIDogdGhpcy5lbmFibGVEZWxldGUgJiYgdHJ1ZTtcbiAgICB9XG59XG4iLCI8ZGl2ICpuZ0lmPVwic2hvd0xhYmVsc1wiIGNsYXNzPVwiZC1pbmxpbmVcIj5cbiAgICA8c3BhbiAqbmdGb3I9XCJsZXQgbGFiZWwgb2YgbGFiZWxzOyBsZXQgJGluZGV4ID0gaW5kZXhcIiBjbGFzcz1cImQtaW5saW5lXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWluZm8gYWxpZ24tc2VsZi1jZW50ZXIgbXItMSBkLWlubGluZVwiIFtuZ0NsYXNzXT1cInsnc3EtbGFiZWxzLXB1YmxpYyc6IHB1YmxpYywgJ3NxLWxhYmVscy1wcml2YXRlJzogIXB1YmxpY31cIlxuICAgICAgICAgICAgdGl0bGU9XCJ7eyhwdWJsaWMgPyAnbXNnI2xhYmVscy5zZWxlY3RQdWJsaWNMYWJlbFRpdGxlJyA6ICdtc2cjbGFiZWxzLnNlbGVjdFByaXZhdGVMYWJlbFRpdGxlJykgfCBzcU1lc3NhZ2V9fVwiPlxuICAgICAgICAgICAgPHNwYW4gKGNsaWNrKT1cInNlbGVjdChsYWJlbClcIj57e2xhYmVsIHwgc3FMYWJlbDpwdWJsaWN9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwic3EtbGFiZWwtcmVtb3ZlIGZhcyBmYS10aW1lcy1jaXJjbGUgY2xpY2thYmxlXCIgKGNsaWNrKT1cInJlbW92ZSgkaW5kZXgpXCIgKm5nSWY9XCJjYW5SZW1vdmUoKVwiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJ7eyhwdWJsaWMgPyAnbXNnI2xhYmVscy5yZW1vdmVQdWJsaWNMYWJlbFRpdGxlJyA6ICdtc2cjbGFiZWxzLnJlbW92ZVByaXZhdGVMYWJlbFRpdGxlJykgfCBzcU1lc3NhZ2V9fVwiPlxuICAgICAgICAgICAgPC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L3NwYW4+XG48L2Rpdj5cbiJdfQ==