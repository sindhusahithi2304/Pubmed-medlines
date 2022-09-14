import { Component, Input } from "@angular/core";
import { Utils } from '@sinequa/core/base';
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "@angular/forms";
import * as i3 from "../advanced-form-autocomplete.directive";
import * as i4 from "../advanced-form-validation.directive";
import * as i5 from "@sinequa/components/autocomplete";
import * as i6 from "@sinequa/core/intl";
function BsAdvancedFormInput_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r3.display);
} }
export class BsAdvancedFormInput {
    constructor(appService) {
        this.appService = appService;
    }
    ngOnChanges() {
        if (this.label === undefined) {
            this.label = this.appService.getLabel(this.field);
        }
        this.control = this.form.get(this.field);
        if (this.control) {
            if (this.control.value) {
                this.viewValue = this.control.value.display
                    ? this.control.value.display
                    : this.control.value.value.toString();
            }
            this._valueChangesSubscription = Utils.subscribe(this.control.valueChanges, (val) => {
                if (val) {
                    this.viewValue = val.display ? val.display : val.value.toString();
                }
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
    onItemChange(item) {
        this.viewValue = item === null || item === void 0 ? void 0 : item.display;
        this._updateControl(item);
    }
    _updateControl(item) {
        var _a, _b;
        const value = item
            ? {
                value: item.normalized,
                display: item.display
            } : undefined;
        (_a = this.control) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        (_b = this.control) === null || _b === void 0 ? void 0 : _b.setValue(value, { emitEvent: false });
    }
}
BsAdvancedFormInput.ɵfac = function BsAdvancedFormInput_Factory(t) { return new (t || BsAdvancedFormInput)(i0.ɵɵdirectiveInject(i1.AppService)); };
BsAdvancedFormInput.ɵcmp = i0.ɵɵdefineComponent({ type: BsAdvancedFormInput, selectors: [["sq-advanced-form-input"]], inputs: { form: "form", field: "field", suggestQuery: "suggestQuery", label: "label" }, features: [i0.ɵɵNgOnChangesFeature], decls: 10, vars: 11, consts: [[1, "form-group"], [3, "for"], [1, "d-flex", "flex-column"], ["sqAdvancedFormAutocomplete", "", "sqAdvancedFormValidation", "", "type", "text", "autocomplete", "off", "spellcheck", "off", 1, "form-control", 3, "off", "suggestQuery", "dropdown", "validationForm", "field", "id", "ngModel", "ngModelChange", "UpdateItem"], ["dropdown", ""], ["itemTpl", ""], [1, "py-2"]], template: function BsAdvancedFormInput_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "label", 1);
        i0.ɵɵtext(2);
        i0.ɵɵpipe(3, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "div", 2);
        i0.ɵɵelementStart(5, "input", 3);
        i0.ɵɵlistener("ngModelChange", function BsAdvancedFormInput_Template_input_ngModelChange_5_listener($event) { return ctx.viewValue = $event; })("UpdateItem", function BsAdvancedFormInput_Template_input_UpdateItem_5_listener($event) { return ctx.onItemChange($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "sq-autocomplete-list", null, 4);
        i0.ɵɵtemplate(8, BsAdvancedFormInput_ng_template_8_Template, 2, 1, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r0 = i0.ɵɵreference(7);
        i0.ɵɵadvance(1);
        i0.ɵɵpropertyInterpolate("for", ctx.field);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 9, ctx.label));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("off", !ctx.suggestQuery)("suggestQuery", ctx.suggestQuery)("dropdown", _r0)("validationForm", ctx.form)("field", ctx.field)("id", ctx.field)("ngModel", ctx.viewValue);
    } }, directives: [i2.DefaultValueAccessor, i3.BsAdvancedFormAutocomplete, i4.BsAdvancedFormValidation, i2.NgControlStatus, i2.NgModel, i5.BsAutocompleteList], pipes: [i6.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsAdvancedFormInput, [{
        type: Component,
        args: [{
                selector: "sq-advanced-form-input",
                templateUrl: "./advanced-form-input.html"
            }]
    }], function () { return [{ type: i1.AppService }]; }, { form: [{
            type: Input
        }], field: [{
            type: Input
        }], suggestQuery: [{
            type: Input
        }], label: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2YW5jZWQtZm9ybS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2FkdmFuY2VkLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2FkdmFuY2VkLWZvcm0taW5wdXQvYWR2YW5jZWQtZm9ybS1pbnB1dC50cyIsImJvb3RzdHJhcC9hZHZhbmNlZC1mb3JtLWlucHV0L2FkdmFuY2VkLWZvcm0taW5wdXQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBd0IsTUFBTSxlQUFlLENBQUM7QUFHdkUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7Ozs7SUNpQjNCLDhCQUFrQjtJQUFBLFlBQWdCO0lBQUEsaUJBQU07OztJQUF0QixlQUFnQjtJQUFoQixxQ0FBZ0I7O0FEVGxELE1BQU0sT0FBTyxtQkFBbUI7SUFXNUIsWUFBbUIsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFHLENBQUM7SUFFN0MsV0FBVztRQUNQLElBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckQ7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU87b0JBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPO29CQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQzdDO1lBRUQsSUFBSSxDQUFDLHlCQUF5QixHQUFHLEtBQUssQ0FBQyxTQUFTLENBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUN6QixDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNOLElBQUksR0FBRyxFQUFFO29CQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDckU7WUFDSCxDQUFDLENBQ0osQ0FBQztTQUNMO2FBQ0k7WUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4RDtJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMseUJBQXlCLEVBQUU7WUFDaEMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2hEO0lBQ0wsQ0FBQztJQUVELFlBQVksQ0FBQyxJQUFzQjtRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU8sY0FBYyxDQUFDLElBQXNCOztRQUN6QyxNQUFNLEtBQUssR0FBRyxJQUFJO1lBQ2xCLENBQUMsQ0FBQztnQkFDRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVc7Z0JBQ3ZCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzthQUN4QixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDZCxNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLFdBQVcsR0FBRztRQUM1QixNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLEVBQUU7SUFDdEQsQ0FBQzs7c0ZBMURRLG1CQUFtQjt3REFBbkIsbUJBQW1CO1FDWGhDLDhCQUNJO1FBQUEsZ0NBQXVCO1FBQUEsWUFBcUI7O1FBQUEsaUJBQVE7UUFDcEQsOEJBQ0k7UUFBQSxnQ0FlQTtRQUZJLCtJQUF1QixrR0FDVCx3QkFBb0IsSUFEWDtRQWIzQixpQkFlQTtRQUFBLHFEQUNJO1FBQUEscUhBRWM7UUFDbEIsaUJBQXVCO1FBQzNCLGlCQUFNO1FBQ1YsaUJBQU07OztRQXZCSyxlQUFlO1FBQWYsMENBQWU7UUFBQyxlQUFxQjtRQUFyQixxREFBcUI7UUFJcEMsZUFBcUI7UUFBckIsdUNBQXFCLGtDQUFBLGlCQUFBLDRCQUFBLG9CQUFBLGlCQUFBLDBCQUFBOztrRERNcEIsbUJBQW1CO2NBSi9CLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxXQUFXLEVBQUUsNEJBQTRCO2FBQzVDOzZEQUVZLElBQUk7a0JBQVosS0FBSztZQUNHLEtBQUs7a0JBQWIsS0FBSztZQUNHLFlBQVk7a0JBQXBCLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEFic3RyYWN0Q29udHJvbCB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgQXBwU2VydmljZSB9IGZyb20gXCJAc2luZXF1YS9jb3JlL2FwcC11dGlsc1wiO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICdAc2luZXF1YS9jb3JlL2Jhc2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBdXRvY29tcGxldGVJdGVtIH0gZnJvbSAnQHNpbmVxdWEvY29tcG9uZW50cy9hdXRvY29tcGxldGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1hZHZhbmNlZC1mb3JtLWlucHV0XCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9hZHZhbmNlZC1mb3JtLWlucHV0Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBCc0FkdmFuY2VkRm9ybUlucHV0IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIGZvcm06IEZvcm1Hcm91cDtcbiAgICBASW5wdXQoKSBmaWVsZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHN1Z2dlc3RRdWVyeTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgICBjb250cm9sOiBBYnN0cmFjdENvbnRyb2wgfCBudWxsO1xuICAgIHZpZXdWYWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIHByaXZhdGUgX3ZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGFwcFNlcnZpY2U6IEFwcFNlcnZpY2UpIHt9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgaWYodGhpcy5sYWJlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsID0gdGhpcy5hcHBTZXJ2aWNlLmdldExhYmVsKHRoaXMuZmllbGQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udHJvbCA9IHRoaXMuZm9ybS5nZXQodGhpcy5maWVsZCk7XG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2wpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdWYWx1ZSA9IHRoaXMuY29udHJvbC52YWx1ZS5kaXNwbGF5XG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5jb250cm9sLnZhbHVlLmRpc3BsYXlcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmNvbnRyb2wudmFsdWUudmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uID0gVXRpbHMuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbC52YWx1ZUNoYW5nZXMsXG4gICAgICAgICAgICAgICAgKHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlld1ZhbHVlID0gdmFsLmRpc3BsYXkgPyB2YWwuZGlzcGxheSA6IHZhbC52YWx1ZS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBmb3JtIGNvbnRyb2wgbmFtZWQgXCIrdGhpcy5maWVsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkl0ZW1DaGFuZ2UoaXRlbTogQXV0b2NvbXBsZXRlSXRlbSkge1xuICAgICAgICB0aGlzLnZpZXdWYWx1ZSA9IGl0ZW0/LmRpc3BsYXk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNvbnRyb2woaXRlbSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlQ29udHJvbChpdGVtOiBBdXRvY29tcGxldGVJdGVtKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gaXRlbVxuICAgICAgICA/IHtcbiAgICAgICAgICAgIHZhbHVlOiBpdGVtLm5vcm1hbGl6ZWQhLFxuICAgICAgICAgICAgZGlzcGxheTogaXRlbS5kaXNwbGF5XG4gICAgICAgIH0gOiB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY29udHJvbD8ubWFya0FzRGlydHkoKTtcbiAgICAgICAgdGhpcy5jb250cm9sPy5zZXRWYWx1ZSh2YWx1ZSwge2VtaXRFdmVudDogZmFsc2V9KTtcbiAgICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgIDxsYWJlbCBmb3I9XCJ7e2ZpZWxkfX1cIj57e2xhYmVsIHwgc3FNZXNzYWdlfX08L2xhYmVsPlxuICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggZmxleC1jb2x1bW5cIj5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBzcUFkdmFuY2VkRm9ybUF1dG9jb21wbGV0ZVxuICAgICAgICAgICAgW29mZl09XCIhc3VnZ2VzdFF1ZXJ5XCJcbiAgICAgICAgICAgIFtzdWdnZXN0UXVlcnldPVwic3VnZ2VzdFF1ZXJ5XCJcbiAgICAgICAgICAgIFtkcm9wZG93bl09XCJkcm9wZG93blwiXG4gICAgICAgICAgICBzcUFkdmFuY2VkRm9ybVZhbGlkYXRpb25cbiAgICAgICAgICAgIFt2YWxpZGF0aW9uRm9ybV09XCJmb3JtXCJcbiAgICAgICAgICAgIFtmaWVsZF09XCJmaWVsZFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICBbaWRdPVwiZmllbGRcIlxuICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgICAgIHNwZWxsY2hlY2s9XCJvZmZcIlxuICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJ2aWV3VmFsdWVcIlxuICAgICAgICAgICAgKFVwZGF0ZUl0ZW0pPVwib25JdGVtQ2hhbmdlKCRldmVudClcIj5cbiAgICAgICAgPHNxLWF1dG9jb21wbGV0ZS1saXN0ICNkcm9wZG93bj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaXRlbVRwbCBsZXQtaXRlbT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHktMlwiPnt7aXRlbS5kaXNwbGF5fX08L2Rpdj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvc3EtYXV0b2NvbXBsZXRlLWxpc3Q+XG4gICAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==