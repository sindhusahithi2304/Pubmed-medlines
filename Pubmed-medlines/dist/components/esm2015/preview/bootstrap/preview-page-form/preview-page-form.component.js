import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@sinequa/core/validation";
import * as i3 from "@angular/common";
import * as i4 from "@sinequa/core/intl";
const _c0 = function (a0) { return { form: a0, controlName: "page" }; };
function BsPreviewPageFormComponent_form_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 1);
    i0.ɵɵelementStart(1, "div", 2);
    i0.ɵɵelementStart(2, "div", 3);
    i0.ɵɵelementStart(3, "label", 4);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelement(6, "input", 5);
    i0.ɵɵelementStart(7, "div", 6);
    i0.ɵɵelementStart(8, "button", 7);
    i0.ɵɵlistener("click", function BsPreviewPageFormComponent_form_0_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r2); const ctx_r1 = i0.ɵɵnextContext(); return ctx_r1.submit(); });
    i0.ɵɵelement(9, "i", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r0.form);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("sqValidation", i0.ɵɵpureFunction1(5, _c0, ctx_r0.form));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 3, "msg#preview.gotopage"));
} }
export class BsPreviewPageFormComponent {
    constructor(formBuilder, validationService) {
        this.gotopage = new EventEmitter();
        this.pageControl = new FormControl('', [validationService.integerValidator(), validationService.minValidator(1)]);
        this.form = formBuilder.group({
            page: this.pageControl
        });
    }
    ngOnChanges() {
        this.pageControl.setValue(this.pageNumber);
    }
    submit() {
        const page = parseInt(this.pageControl.value, 10);
        if (!isNaN(page) && page !== this.pageNumber) {
            // remember the page number submitted
            // this allow us to submit again the previous page 
            // when page not exists and/or an error is triggered
            this.pageNumber = page;
            this.gotopage.next(page);
        }
    }
}
BsPreviewPageFormComponent.ɵfac = function BsPreviewPageFormComponent_Factory(t) { return new (t || BsPreviewPageFormComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.ValidationService)); };
BsPreviewPageFormComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewPageFormComponent, selectors: [["sq-preview-page-form"]], inputs: { pageNumber: "pageNumber" }, outputs: { gotopage: "gotopage" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["novalidate", "", "class", "mb-2", 3, "formGroup", 4, "ngIf"], ["novalidate", "", 1, "mb-2", 3, "formGroup"], [1, "input-group", "mb-1", 3, "sqValidation"], [1, "input-group-prepend"], ["for", "page-input", 1, "input-group-text"], ["id", "page-input", "type", "text", "placeholder", "page", "formControlName", "page", "autocomplete", "off", "spellcheck", "off", 1, "form-control"], [1, "input-group-append"], ["type", "submit", 1, "btn", "btn-primary", 3, "click"], [1, "fas", "fa-fw", "fa-arrow-right"]], template: function BsPreviewPageFormComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsPreviewPageFormComponent_form_0_Template, 10, 7, "form", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.pageNumber);
    } }, directives: [i3.NgIf, i1.ɵangular_packages_forms_forms_y, i1.NgControlStatusGroup, i1.FormGroupDirective, i2.ValidationDirective, i1.DefaultValueAccessor, i1.NgControlStatus, i1.FormControlName], pipes: [i4.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsPreviewPageFormComponent, [{
        type: Component,
        args: [{
                selector: 'sq-preview-page-form',
                templateUrl: './preview-page-form.component.html'
            }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.ValidationService }]; }, { pageNumber: [{
            type: Input
        }], gotopage: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy1wYWdlLWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvcHJldmlldy8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9wcmV2aWV3LXBhZ2UtZm9ybS9wcmV2aWV3LXBhZ2UtZm9ybS5jb21wb25lbnQudHMiLCJib290c3RyYXAvcHJldmlldy1wYWdlLWZvcm0vcHJldmlldy1wYWdlLWZvcm0uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQWUsV0FBVyxFQUFhLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7OztJQ0RyRSwrQkFDSTtJQUFBLDhCQUNJO0lBQUEsOEJBQ0k7SUFBQSxnQ0FBaUQ7SUFBQSxZQUF1Qzs7SUFBQSxpQkFBUTtJQUNwRyxpQkFBTTtJQUNOLDJCQUNBO0lBQUEsOEJBQ0k7SUFBQSxpQ0FDSTtJQUQwQywyTEFBa0I7SUFDNUQsdUJBQXdDO0lBQzVDLGlCQUFTO0lBQ2IsaUJBQU07SUFDVixpQkFBTTtJQUNWLGlCQUFPOzs7SUFaVSx1Q0FBa0I7SUFDMUIsZUFBa0Q7SUFBbEQsc0VBQWtEO0lBRUUsZUFBdUM7SUFBdkMsa0VBQXVDOztBREtwRyxNQUFNLE9BQU8sMEJBQTBCO0lBT25DLFlBQ0ksV0FBd0IsRUFDeEIsaUJBQW9DO1FBUDlCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBUzVDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xILElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUM1QixJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDdkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEQsSUFBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN6QyxxQ0FBcUM7WUFDckMsbURBQW1EO1lBQ25ELG9EQUFvRDtZQUNwRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QjtJQUNMLENBQUM7O29HQTlCUSwwQkFBMEI7K0RBQTFCLDBCQUEwQjtRQ1J2Qyw4RUFZTzs7UUFaOEIscUNBQWdCOztrRERReEMsMEJBQTBCO2NBSnRDLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxXQUFXLEVBQUUsb0NBQW9DO2FBQ3BEOzhGQUVZLFVBQVU7a0JBQWxCLEtBQUs7WUFDSSxRQUFRO2tCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS92YWxpZGF0aW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnc3EtcHJldmlldy1wYWdlLWZvcm0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wcmV2aWV3LXBhZ2UtZm9ybS5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQnNQcmV2aWV3UGFnZUZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXN7XG4gICAgQElucHV0KCkgcGFnZU51bWJlcj86IG51bWJlcjtcbiAgICBAT3V0cHV0KCkgZ290b3BhZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIGZvcm06IEZvcm1Hcm91cDtcbiAgICBwYWdlQ29udHJvbDogRm9ybUNvbnRyb2w7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgICAgICB2YWxpZGF0aW9uU2VydmljZTogVmFsaWRhdGlvblNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5wYWdlQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJywgW3ZhbGlkYXRpb25TZXJ2aWNlLmludGVnZXJWYWxpZGF0b3IoKSwgdmFsaWRhdGlvblNlcnZpY2UubWluVmFsaWRhdG9yKDEpXSk7XG4gICAgICAgIHRoaXMuZm9ybSA9IGZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICBwYWdlOiB0aGlzLnBhZ2VDb250cm9sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLnBhZ2VDb250cm9sLnNldFZhbHVlKHRoaXMucGFnZU51bWJlcik7XG4gICAgfVxuXG4gICAgc3VibWl0KCkge1xuICAgICAgICBjb25zdCBwYWdlID0gcGFyc2VJbnQodGhpcy5wYWdlQ29udHJvbC52YWx1ZSwgMTApO1xuICAgICAgICBpZighaXNOYU4ocGFnZSkgJiYgcGFnZSAhPT0gdGhpcy5wYWdlTnVtYmVyKSB7XG4gICAgICAgICAgICAvLyByZW1lbWJlciB0aGUgcGFnZSBudW1iZXIgc3VibWl0dGVkXG4gICAgICAgICAgICAvLyB0aGlzIGFsbG93IHVzIHRvIHN1Ym1pdCBhZ2FpbiB0aGUgcHJldmlvdXMgcGFnZSBcbiAgICAgICAgICAgIC8vIHdoZW4gcGFnZSBub3QgZXhpc3RzIGFuZC9vciBhbiBlcnJvciBpcyB0cmlnZ2VyZWRcbiAgICAgICAgICAgIHRoaXMucGFnZU51bWJlciA9IHBhZ2U7XG4gICAgICAgICAgICB0aGlzLmdvdG9wYWdlLm5leHQocGFnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCI8Zm9ybSBub3ZhbGlkYXRlIFtmb3JtR3JvdXBdPVwiZm9ybVwiICpuZ0lmPVwicGFnZU51bWJlclwiIGNsYXNzPVwibWItMlwiPlxuICAgIDxkaXYgW3NxVmFsaWRhdGlvbl09XCJ7Zm9ybTogZm9ybSwgY29udHJvbE5hbWU6ICdwYWdlJ31cIiBjbGFzcz1cImlucHV0LWdyb3VwIG1iLTFcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLXByZXBlbmRcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwYWdlLWlucHV0XCIgY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCI+e3sgJ21zZyNwcmV2aWV3LmdvdG9wYWdlJyB8IHNxTWVzc2FnZX19PC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxpbnB1dCBpZD1cInBhZ2UtaW5wdXRcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJwYWdlXCIgZm9ybUNvbnRyb2xOYW1lPVwicGFnZVwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIHNwZWxsY2hlY2s9XCJvZmZcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJzdWJtaXRcIiAoY2xpY2spPVwic3VibWl0KClcIiA+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZncgZmEtYXJyb3ctcmlnaHRcIj48L2k+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Zvcm0+Il19