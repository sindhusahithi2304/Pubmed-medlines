import { Component, Input, } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import { AppService } from "@sinequa/core/app-utils";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
import * as i4 from "../advanced-form-validation.directive";
import * as i5 from "./date-range-picker/date-range-picker";
import * as i6 from "@sinequa/core/intl";
const _c0 = function () { return { standalone: true }; };
function BsAdvancedFormRange_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelementStart(1, "div", 5);
    i0.ɵɵelementStart(2, "input", 6);
    i0.ɵɵlistener("ngModelChange", function BsAdvancedFormRange_div_4_Template_input_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.updateFrom($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 7);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 5);
    i0.ɵɵelementStart(7, "input", 8);
    i0.ɵɵlistener("ngModelChange", function BsAdvancedFormRange_div_4_Template_input_ngModelChange_7_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.updateTo($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("field", ctx_r0.field)("validationForm", ctx_r0.form)("id", ctx_r0.field);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", ctx_r0.fromName)("ngModel", ctx_r0.value[0])("ngModelOptions", i0.ɵɵpureFunction0(12, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 10, "msg#advanced.rangeSeparator"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("id", ctx_r0.toName)("ngModel", ctx_r0.value[1])("ngModelOptions", i0.ɵɵpureFunction0(13, _c0));
} }
const _c1 = function (a0, a3, a4) { return { name: a0, system: false, closedRange: false, minDate: a3, maxDate: a4 }; };
function BsAdvancedFormRange_sq_date_range_picker_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "sq-date-range-picker", 9);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("options", i0.ɵɵpureFunction3(5, _c1, ctx_r1.field, ctx_r1.minDate, ctx_r1.maxDate))("formControlName", ctx_r1.field)("id", ctx_r1.field)("field", ctx_r1.field)("validationForm", ctx_r1.form);
} }
export class BsAdvancedFormRange {
    constructor(appService) {
        this.appService = appService;
    }
    ngOnInit() {
        this.fromName = "from_" + this.field;
        this.toName = "to_" + this.field;
        this.forName = this.fromName;
        this.column = this.appService.getColumn(this.field);
        if (this.label === undefined) {
            this.label = this.appService.getPluralLabel(this.field);
        }
        this.isDate = !!this.column && AppService.isDate(this.column);
        if (this.isDate) {
            this.minDate = Utils.isDate(this.min)
                ? this.min
                : undefined;
            this.maxDate = Utils.isDate(this.max)
                ? this.max
                : undefined;
        }
        this.control = this.form.get(this.field);
        if (this.control) {
            this.value = this.control.value;
            this._valueChangesSubscription = Utils.subscribe(this.control.valueChanges, (value) => {
                this.value = value;
            });
        }
        else {
            throw new Error("No form control named " + this.field);
        }
    }
    ngOnDestroy() {
        if (this._valueChangesSubscription) {
            this._valueChangesSubscription.unsubscribe();
        }
    }
    ensureValue(value) {
        if (this.isDate) {
            const value1 = Utils.toDate(value);
            if (value1 !== undefined) {
                return value1;
            }
        }
        else if (this.column && AppService.isNumber(this.column)) {
            if (Utils.testFloat(value)) {
                return Utils.toNumber(value);
            }
        }
        return value;
    }
    updateFrom(from) {
        this.value[0] = this.ensureValue(from);
        if (this.control) {
            this.control.markAsDirty();
            this.control.setValue(this.value);
        }
    }
    updateTo(to) {
        this.value[1] = this.ensureValue(to);
        if (this.control) {
            this.control.markAsDirty();
            this.control.setValue(this.value);
        }
    }
}
BsAdvancedFormRange.ɵfac = function BsAdvancedFormRange_Factory(t) { return new (t || BsAdvancedFormRange)(i0.ɵɵdirectiveInject(i1.AppService)); };
BsAdvancedFormRange.ɵcmp = i0.ɵɵdefineComponent({ type: BsAdvancedFormRange, selectors: [["sq-advanced-form-range"]], inputs: { form: "form", field: "field", min: "min", max: "max", label: "label" }, decls: 6, vars: 7, consts: [[1, "form-group", 3, "formGroup"], [3, "for"], ["class", "sq-advanced-form-range form-row", "sqAdvancedFormValidation", "", 3, "field", "validationForm", "id", 4, "ngIf"], ["sqAdvancedFormValidation", "", 3, "options", "formControlName", "id", "field", "validationForm", 4, "ngIf"], ["sqAdvancedFormValidation", "", 1, "sq-advanced-form-range", "form-row", 3, "field", "validationForm", "id"], [1, "col-auto", "d-flex", "flex-column"], ["type", "text", "autocomplete", "off", "spellcheck", "off", 1, "form-control", "sq-range-from", 3, "id", "ngModel", "ngModelOptions", "ngModelChange"], [1, "col-auto", "sq-separator"], ["type", "text", "autocomplete", "off", "spellcheck", "off", 1, "form-control", "sq-range-to", 3, "id", "ngModel", "ngModelOptions", "ngModelChange"], ["sqAdvancedFormValidation", "", 3, "options", "formControlName", "id", "field", "validationForm"]], template: function BsAdvancedFormRange_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "label", 1);
        i0.ɵɵtext(2);
        i0.ɵɵpipe(3, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(4, BsAdvancedFormRange_div_4_Template, 8, 14, "div", 2);
        i0.ɵɵtemplate(5, BsAdvancedFormRange_sq_date_range_picker_5_Template, 1, 9, "sq-date-range-picker", 3);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(1);
        i0.ɵɵpropertyInterpolate("for", ctx.forName);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 5, ctx.label));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", !ctx.isDate);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isDate);
    } }, directives: [i2.NgControlStatusGroup, i2.FormGroupDirective, i3.NgIf, i4.BsAdvancedFormValidation, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgModel, i5.BsDateRangePicker, i2.FormControlName], pipes: [i6.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsAdvancedFormRange, [{
        type: Component,
        args: [{
                selector: "sq-advanced-form-range",
                templateUrl: "./advanced-form-range.html"
            }]
    }], function () { return [{ type: i1.AppService }]; }, { form: [{
            type: Input
        }], field: [{
            type: Input
        }], min: [{
            type: Input
        }], max: [{
            type: Input
        }], label: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2YW5jZWQtZm9ybS1yYW5nZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2FkdmFuY2VkLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2FkdmFuY2VkLWZvcm0tcmFuZ2UvYWR2YW5jZWQtZm9ybS1yYW5nZS50cyIsImJvb3RzdHJhcC9hZHZhbmNlZC1mb3JtLXJhbmdlL2FkdmFuY2VkLWZvcm0tcmFuZ2UuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssR0FHUixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7Ozs7OztJQ1JqRCw4QkFNSTtJQUFBLDhCQUNJO0lBQUEsZ0NBU0o7SUFGUSxrTkFBb0M7SUFQeEMsaUJBU0o7SUFBQSxpQkFBTTtJQUNOLDhCQUFtQztJQUFBLFlBQTZDOztJQUFBLGlCQUFNO0lBQ3RGLDhCQUNJO0lBQUEsZ0NBU0o7SUFGUSxnTkFBa0M7SUFQdEMsaUJBU0o7SUFBQSxpQkFBTTtJQUNWLGlCQUFNOzs7SUExQkYsb0NBQWUsK0JBQUEsb0JBQUE7SUFTUCxlQUFlO0lBQWYsb0NBQWUsNEJBQUEsK0NBQUE7SUFLWSxlQUE2QztJQUE3QywwRUFBNkM7SUFPeEUsZUFBYTtJQUFiLGtDQUFhLDRCQUFBLCtDQUFBOzs7O0lBTXpCLDBDQU91Qjs7O0lBTm5CLGtHQUFnRyxpQ0FBQSxvQkFBQSx1QkFBQSwrQkFBQTs7QURqQnhHLE1BQU0sT0FBTyxtQkFBbUI7SUFrQjVCLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDO0lBRTlDLFFBQVE7UUFDSixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3JDLElBQUksQ0FB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O1NBQ3JDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxFQUFVO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JDO0lBQ0wsQ0FBQzs7c0ZBdEZRLG1CQUFtQjt3REFBbkIsbUJBQW1CO1FDaEJoQyw4QkFDSTtRQUFBLGdDQUF5QjtRQUFBLFlBQXFCOztRQUFBLGlCQUFRO1FBQ3RELHFFQTZCTTtRQUNOLHNHQU91QjtRQUMzQixpQkFBTTs7UUF4Q2tCLG9DQUFrQjtRQUMvQixlQUFpQjtRQUFqQiw0Q0FBaUI7UUFBQyxlQUFxQjtRQUFyQixxREFBcUI7UUFDeEMsZUFBYTtRQUFiLGtDQUFhO1FBOEJJLGVBQVk7UUFBWixpQ0FBWTs7a0REaEIxQixtQkFBbUI7Y0FKL0IsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLFdBQVcsRUFBRSw0QkFBNEI7YUFDNUM7NkRBRVksSUFBSTtrQkFBWixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBQ0csR0FBRztrQkFBWCxLQUFLO1lBQ0csR0FBRztrQkFBWCxLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXQsXG4gICAgT25Jbml0LFxuICAgIE9uRGVzdHJveSxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEZvcm1Hcm91cCwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQgeyBDQ0NvbHVtbiB9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHsgQXBwU2VydmljZSB9IGZyb20gXCJAc2luZXF1YS9jb3JlL2FwcC11dGlsc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1hZHZhbmNlZC1mb3JtLXJhbmdlXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9hZHZhbmNlZC1mb3JtLXJhbmdlLmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBCc0FkdmFuY2VkRm9ybVJhbmdlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIGZvcm06IEZvcm1Hcm91cDtcbiAgICBASW5wdXQoKSBmaWVsZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1pbjogRGF0ZSB8IG51bWJlciB8IHN0cmluZztcbiAgICBASW5wdXQoKSBtYXg6IERhdGUgfCBudW1iZXIgfCBzdHJpbmc7XG4gICAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcblxuICAgIGZyb21OYW1lOiBzdHJpbmc7XG4gICAgdG9OYW1lOiBzdHJpbmc7XG4gICAgZm9yTmFtZTogc3RyaW5nO1xuICAgIGNvbHVtbjogQ0NDb2x1bW4gfCB1bmRlZmluZWQ7XG4gICAgbWluRGF0ZTogRGF0ZSB8IHVuZGVmaW5lZDtcbiAgICBtYXhEYXRlOiBEYXRlIHwgdW5kZWZpbmVkO1xuICAgIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCB8IG51bGw7XG4gICAgdmFsdWU6IChzdHJpbmcgfCBudW1iZXIgfCBEYXRlKVtdO1xuICAgIGlzRGF0ZTogYm9vbGVhbjtcbiAgICBwcml2YXRlIF92YWx1ZUNoYW5nZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBwU2VydmljZTogQXBwU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmZyb21OYW1lID0gXCJmcm9tX1wiICsgdGhpcy5maWVsZDtcbiAgICAgICAgdGhpcy50b05hbWUgPSBcInRvX1wiICsgdGhpcy5maWVsZDtcbiAgICAgICAgdGhpcy5mb3JOYW1lID0gdGhpcy5mcm9tTmFtZTtcbiAgICAgICAgdGhpcy5jb2x1bW4gPSB0aGlzLmFwcFNlcnZpY2UuZ2V0Q29sdW1uKHRoaXMuZmllbGQpO1xuICAgICAgICBpZih0aGlzLmxhYmVsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWwgPSB0aGlzLmFwcFNlcnZpY2UuZ2V0UGx1cmFsTGFiZWwodGhpcy5maWVsZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0RhdGUgPSAhIXRoaXMuY29sdW1uICYmIEFwcFNlcnZpY2UuaXNEYXRlKHRoaXMuY29sdW1uKTtcbiAgICAgICAgaWYgKHRoaXMuaXNEYXRlKSB7XG4gICAgICAgICAgICB0aGlzLm1pbkRhdGUgPSBVdGlscy5pc0RhdGUodGhpcy5taW4pXG4gICAgICAgICAgICAgICAgPyB0aGlzLm1pblxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5tYXhEYXRlID0gVXRpbHMuaXNEYXRlKHRoaXMubWF4KVxuICAgICAgICAgICAgICAgID8gdGhpcy5tYXhcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnRyb2wgPSB0aGlzLmZvcm0uZ2V0KHRoaXMuZmllbGQpO1xuICAgICAgICBpZiAodGhpcy5jb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5jb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uID0gVXRpbHMuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbC52YWx1ZUNoYW5nZXMsXG4gICAgICAgICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gZm9ybSBjb250cm9sIG5hbWVkIFwiK3RoaXMuZmllbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLl92YWx1ZUNoYW5nZXNTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW5zdXJlVmFsdWUodmFsdWU6IHN0cmluZyk6IHN0cmluZyB8IG51bWJlciB8IERhdGUge1xuICAgICAgICBpZiAodGhpcy5pc0RhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlMSA9IFV0aWxzLnRvRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAodmFsdWUxICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29sdW1uICYmIEFwcFNlcnZpY2UuaXNOdW1iZXIodGhpcy5jb2x1bW4pKSB7XG4gICAgICAgICAgICBpZiAoVXRpbHMudGVzdEZsb2F0KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy50b051bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHVwZGF0ZUZyb20oZnJvbTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudmFsdWVbMF0gPSB0aGlzLmVuc3VyZVZhbHVlKGZyb20pO1xuICAgICAgICBpZiAodGhpcy5jb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5zZXRWYWx1ZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVRvKHRvOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy52YWx1ZVsxXSA9IHRoaXMuZW5zdXJlVmFsdWUodG8pO1xuICAgICAgICBpZiAodGhpcy5jb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5zZXRWYWx1ZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgPGxhYmVsIGZvcj1cInt7Zm9yTmFtZX19XCI+e3tsYWJlbCB8IHNxTWVzc2FnZX19PC9sYWJlbD5cbiAgICA8ZGl2ICpuZ0lmPVwiIWlzRGF0ZVwiXG4gICAgICAgIGNsYXNzPVwic3EtYWR2YW5jZWQtZm9ybS1yYW5nZSBmb3JtLXJvd1wiXG4gICAgICAgIHNxQWR2YW5jZWRGb3JtVmFsaWRhdGlvblxuICAgICAgICBbZmllbGRdPVwiZmllbGRcIlxuICAgICAgICBbdmFsaWRhdGlvbkZvcm1dPVwiZm9ybVwiXG4gICAgICAgIFtpZF09XCJmaWVsZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWF1dG8gZC1mbGV4IGZsZXgtY29sdW1uXCI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgICAgICAgICBzcGVsbGNoZWNrPVwib2ZmXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBzcS1yYW5nZS1mcm9tXCJcbiAgICAgICAgICAgICAgICBbaWRdPVwiZnJvbU5hbWVcIlxuICAgICAgICAgICAgICAgIFtuZ01vZGVsXT1cInZhbHVlWzBdXCJcbiAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJ1cGRhdGVGcm9tKCRldmVudClcIlxuICAgICAgICAgICAgICAgIFtuZ01vZGVsT3B0aW9uc109XCJ7c3RhbmRhbG9uZTogdHJ1ZX1cIi8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWF1dG8gc3Etc2VwYXJhdG9yXCI+e3snbXNnI2FkdmFuY2VkLnJhbmdlU2VwYXJhdG9yJyB8IHNxTWVzc2FnZX19PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtYXV0byBkLWZsZXggZmxleC1jb2x1bW5cIj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgICAgICAgICAgIHNwZWxsY2hlY2s9XCJvZmZcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIHNxLXJhbmdlLXRvXCJcbiAgICAgICAgICAgICAgICBbaWRdPVwidG9OYW1lXCJcbiAgICAgICAgICAgICAgICBbbmdNb2RlbF09XCJ2YWx1ZVsxXVwiXG4gICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwidXBkYXRlVG8oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW25nTW9kZWxPcHRpb25zXT1cIntzdGFuZGFsb25lOiB0cnVlfVwiLz5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPHNxLWRhdGUtcmFuZ2UtcGlja2VyICpuZ0lmPVwiaXNEYXRlXCJcbiAgICAgICAgW29wdGlvbnNdPVwie25hbWU6IGZpZWxkLCBzeXN0ZW06IGZhbHNlLCBjbG9zZWRSYW5nZTogZmFsc2UsIG1pbkRhdGU6IG1pbkRhdGUsIG1heERhdGU6IG1heERhdGV9XCJcbiAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJmaWVsZFwiXG4gICAgICAgIFtpZF09XCJmaWVsZFwiXG4gICAgICAgIHNxQWR2YW5jZWRGb3JtVmFsaWRhdGlvblxuICAgICAgICBbZmllbGRdPVwiZmllbGRcIlxuICAgICAgICBbdmFsaWRhdGlvbkZvcm1dPVwiZm9ybVwiPlxuICAgIDwvc3EtZGF0ZS1yYW5nZS1waWNrZXI+XG48L2Rpdj5cbiJdfQ==