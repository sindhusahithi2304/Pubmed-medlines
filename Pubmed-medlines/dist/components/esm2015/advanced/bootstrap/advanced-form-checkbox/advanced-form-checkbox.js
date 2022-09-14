import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "@angular/forms";
import * as i3 from "../advanced-form-validation.directive";
import * as i4 from "@sinequa/core/intl";
export class BsAdvancedFormCheckbox {
    constructor(appService) {
        this.appService = appService;
    }
    ngOnChanges() {
        if (this.label === undefined) {
            this.label = this.appService.getLabel(this.field);
        }
    }
}
BsAdvancedFormCheckbox.ɵfac = function BsAdvancedFormCheckbox_Factory(t) { return new (t || BsAdvancedFormCheckbox)(i0.ɵɵdirectiveInject(i1.AppService)); };
BsAdvancedFormCheckbox.ɵcmp = i0.ɵɵdefineComponent({ type: BsAdvancedFormCheckbox, selectors: [["sq-advanced-form-checkbox"]], inputs: { form: "form", field: "field", label: "label" }, features: [i0.ɵɵNgOnChangesFeature], decls: 7, vars: 7, consts: [[1, "form-group", 3, "formGroup"], [1, "form-check"], [1, "custom-control", "custom-checkbox"], ["type", "checkbox", "sqAdvancedFormValidation", "", 1, "custom-control-input", 3, "field", "validationForm", "formControlName"], [1, "custom-control-label"]], template: function BsAdvancedFormCheckbox_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "label", 2);
        i0.ɵɵelement(3, "input", 3);
        i0.ɵɵelementStart(4, "span", 4);
        i0.ɵɵtext(5);
        i0.ɵɵpipe(6, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("field", ctx.field)("validationForm", ctx.form)("formControlName", ctx.field);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 5, ctx.label));
    } }, directives: [i2.NgControlStatusGroup, i2.FormGroupDirective, i2.CheckboxControlValueAccessor, i3.BsAdvancedFormValidation, i2.NgControlStatus, i2.FormControlName], pipes: [i4.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsAdvancedFormCheckbox, [{
        type: Component,
        args: [{
                selector: "sq-advanced-form-checkbox",
                templateUrl: "./advanced-form-checkbox.html",
            }]
    }], function () { return [{ type: i1.AppService }]; }, { form: [{
            type: Input
        }], field: [{
            type: Input
        }], label: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2YW5jZWQtZm9ybS1jaGVja2JveC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2FkdmFuY2VkLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2FkdmFuY2VkLWZvcm0tY2hlY2tib3gvYWR2YW5jZWQtZm9ybS1jaGVja2JveC50cyIsImJvb3RzdHJhcC9hZHZhbmNlZC1mb3JtLWNoZWNrYm94L2FkdmFuY2VkLWZvcm0tY2hlY2tib3guaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBUTVELE1BQU0sT0FBTyxzQkFBc0I7SUFLL0IsWUFBbUIsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFHLENBQUM7SUFFN0MsV0FBVztRQUNQLElBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckQ7SUFDTCxDQUFDOzs0RkFYUSxzQkFBc0I7MkRBQXRCLHNCQUFzQjtRQ1JuQyw4QkFDSTtRQUFBLDhCQUNJO1FBQUEsZ0NBQ0k7UUFBQSwyQkFPQTtRQUFBLCtCQUFtQztRQUFBLFlBQXFCOztRQUFBLGlCQUFPO1FBQ25FLGlCQUFRO1FBQ1osaUJBQU07UUFDVixpQkFBTTs7UUFia0Isb0NBQWtCO1FBTzFCLGVBQWU7UUFBZixpQ0FBZSw0QkFBQSw4QkFBQTtRQUdnQixlQUFxQjtRQUFyQixxREFBcUI7O2tEREZ2RCxzQkFBc0I7Y0FKbEMsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLFdBQVcsRUFBRSwrQkFBK0I7YUFDL0M7NkRBRVksSUFBSTtrQkFBWixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgQXBwU2VydmljZSB9IGZyb20gJ0BzaW5lcXVhL2NvcmUvYXBwLXV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtYWR2YW5jZWQtZm9ybS1jaGVja2JveFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vYWR2YW5jZWQtZm9ybS1jaGVja2JveC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEJzQWR2YW5jZWRGb3JtQ2hlY2tib3ggaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIGZvcm06IEZvcm1Hcm91cDtcbiAgICBASW5wdXQoKSBmaWVsZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgYXBwU2VydmljZTogQXBwU2VydmljZSkge31cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICBpZih0aGlzLmxhYmVsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWwgPSB0aGlzLmFwcFNlcnZpY2UuZ2V0TGFiZWwodGhpcy5maWVsZCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWNoZWNrXCI+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImN1c3RvbS1jb250cm9sIGN1c3RvbS1jaGVja2JveFwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJjdXN0b20tY29udHJvbC1pbnB1dFwiXG4gICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICBzcUFkdmFuY2VkRm9ybVZhbGlkYXRpb25cbiAgICAgICAgICAgICAgICBbZmllbGRdPVwiZmllbGRcIlxuICAgICAgICAgICAgICAgIFt2YWxpZGF0aW9uRm9ybV09XCJmb3JtXCJcbiAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImZpZWxkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImN1c3RvbS1jb250cm9sLWxhYmVsXCI+e3tsYWJlbCB8IHNxTWVzc2FnZX19PC9zcGFuPlxuICAgICAgICA8L2xhYmVsPlxuICAgIDwvZGl2PlxuPC9kaXY+XG4iXX0=