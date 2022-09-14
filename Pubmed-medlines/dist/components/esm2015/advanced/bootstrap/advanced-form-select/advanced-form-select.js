import { Component, Input } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "@sinequa/components/search";
import * as i3 from "@angular/forms";
import * as i4 from "./select/select";
import * as i5 from "../advanced-form-validation.directive";
import * as i6 from "@sinequa/core/intl";
export class BsAdvancedFormSelect {
    constructor(appService, firstPageService) {
        this.appService = appService;
        this.firstPageService = firstPageService;
    }
    ngOnInit() {
        const control = this.form.get(this.field);
        if (!control) {
            throw new Error("No control in search-form named " + this.field);
        }
        this.column = this.appService.getColumn(this.field);
        this.items = this.getItems();
        if (this.label === undefined) {
            if (this.multiple) {
                this.label = this.appService.getPluralLabel(this.field);
            }
            else {
                this.label = this.appService.getLabel(this.field);
            }
        }
    }
    ngOnDestroy() {
        if (this._valueChangesSubscription) {
            this._valueChangesSubscription.unsubscribe();
        }
    }
    getItems() {
        const firstPage = this.firstPageService.firstPage;
        if (firstPage) {
            // Find aggregation for field
            const condition = (this.aggregation) ?
                (aggr) => Utils.eqNC(aggr.name, this.aggregation) :
                (aggr) => this.column && Utils.eqNC(aggr.column, this.column.name);
            const aggregation = firstPage.aggregations.find(condition);
            if (aggregation && aggregation.items) {
                return aggregation.items
                    .filter((item) => !Utils.isArray(item.value) && !!item.value)
                    .map((item) => ({
                    value: item.value,
                    display: item.display ? item.display : item.value.toString()
                }));
            }
        }
        return [];
    }
}
BsAdvancedFormSelect.ɵfac = function BsAdvancedFormSelect_Factory(t) { return new (t || BsAdvancedFormSelect)(i0.ɵɵdirectiveInject(i1.AppService), i0.ɵɵdirectiveInject(i2.FirstPageService)); };
BsAdvancedFormSelect.ɵcmp = i0.ɵɵdefineComponent({ type: BsAdvancedFormSelect, selectors: [["sq-advanced-form-select"]], inputs: { form: "form", field: "field", label: "label", multiple: "multiple", aggregation: "aggregation" }, decls: 5, vars: 11, consts: [[1, "form-group", 3, "formGroup"], [3, "for"], ["sqAdvancedFormValidation", "", 3, "items", "multiple", "formControlName", "id", "field", "validationForm"]], template: function BsAdvancedFormSelect_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "label", 1);
        i0.ɵɵtext(2);
        i0.ɵɵpipe(3, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(4, "sq-select", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(1);
        i0.ɵɵpropertyInterpolate("for", ctx.field);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 9, ctx.label));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("items", ctx.items)("multiple", ctx.multiple)("formControlName", ctx.field)("id", ctx.field)("field", ctx.field)("validationForm", ctx.form);
    } }, directives: [i3.NgControlStatusGroup, i3.FormGroupDirective, i4.BsSelectComponent, i5.BsAdvancedFormValidation, i3.NgControlStatus, i3.FormControlName], pipes: [i6.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsAdvancedFormSelect, [{
        type: Component,
        args: [{
                selector: "sq-advanced-form-select",
                templateUrl: "./advanced-form-select.html",
            }]
    }], function () { return [{ type: i1.AppService }, { type: i2.FirstPageService }]; }, { form: [{
            type: Input
        }], field: [{
            type: Input
        }], label: [{
            type: Input
        }], multiple: [{
            type: Input
        }], aggregation: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2YW5jZWQtZm9ybS1zZWxlY3QuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9hZHZhbmNlZC8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9hZHZhbmNlZC1mb3JtLXNlbGVjdC9hZHZhbmNlZC1mb3JtLXNlbGVjdC50cyIsImJvb3RzdHJhcC9hZHZhbmNlZC1mb3JtLXNlbGVjdC9hZHZhbmNlZC1mb3JtLXNlbGVjdC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUlsRSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7O0FBUXpDLE1BQU0sT0FBTyxvQkFBb0I7SUFlN0IsWUFDWSxVQUFzQixFQUN0QixnQkFBa0M7UUFEbEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQzlDLENBQUM7SUFFRCxRQUFRO1FBQ0osTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLElBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDVCxNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsRTtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdCLElBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDekIsSUFBRyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzNEO2lCQUNJO2dCQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3JEO1NBQ0o7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLHlCQUF5QixFQUFFO1lBQ2hDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNoRDtJQUNMLENBQUM7SUFFTyxRQUFRO1FBQ1osTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQztRQUNsRCxJQUFJLFNBQVMsRUFBRTtZQUNYLDZCQUE2QjtZQUM3QixNQUFNLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxDQUFDLElBQWlCLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDaEUsQ0FBQyxJQUFpQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BGLE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRTNELElBQUksV0FBVyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2xDLE9BQU8sV0FBVyxDQUFDLEtBQUs7cUJBQ3ZCLE1BQU0sQ0FDSCxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FDdkQ7cUJBQ0EsR0FBRyxDQUNBLENBQUMsSUFBcUIsRUFBRSxFQUFFLENBQUMsQ0FDdkI7b0JBQ0ksS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO29CQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7aUJBQy9ELENBQ0osQ0FDSixDQUFDO2FBQ0w7U0FDSjtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7d0ZBcEVRLG9CQUFvQjt5REFBcEIsb0JBQW9CO1FDWmpDLDhCQUNJO1FBQUEsZ0NBQXVCO1FBQUEsWUFBcUI7O1FBQUEsaUJBQVE7UUFDcEQsK0JBUVk7UUFDaEIsaUJBQU07O1FBWGtCLG9DQUFrQjtRQUMvQixlQUFlO1FBQWYsMENBQWU7UUFBQyxlQUFxQjtRQUFyQixxREFBcUI7UUFFeEMsZUFBZTtRQUFmLGlDQUFlLDBCQUFBLDhCQUFBLGlCQUFBLG9CQUFBLDRCQUFBOztrRERTVixvQkFBb0I7Y0FKaEMsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLFdBQVcsRUFBRSw2QkFBNkI7YUFDN0M7NEZBRVksSUFBSTtrQkFBWixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBRUcsS0FBSztrQkFBYixLQUFLO1lBRUcsUUFBUTtrQkFBaEIsS0FBSztZQUVHLFdBQVc7a0JBQW5CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtGb3JtR3JvdXB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtBcHBTZXJ2aWNlLCBWYWx1ZUl0ZW19IGZyb20gXCJAc2luZXF1YS9jb3JlL2FwcC11dGlsc1wiO1xuaW1wb3J0IHtDQ0NvbHVtbiwgQWdncmVnYXRpb24sIEFnZ3JlZ2F0aW9uSXRlbX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7Rmlyc3RQYWdlU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvc2VhcmNoXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLWFkdmFuY2VkLWZvcm0tc2VsZWN0XCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9hZHZhbmNlZC1mb3JtLXNlbGVjdC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEJzQWR2YW5jZWRGb3JtU2VsZWN0IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIGZvcm06IEZvcm1Hcm91cDtcbiAgICBASW5wdXQoKSBmaWVsZDogc3RyaW5nO1xuICAgIC8qKiBPcHRpb25hbCBsYWJlbDogdGhlIGNvbXBvbmVudCBsb29rcyBmb3IgdGhlIGxhYmVsIGluIHRoZSBRdWVyeSB3ZWIgc2VydmljZSBjb25maWd1cmF0aW9uIGZvciB0aGUgZ2l2ZW4gZmllbGQgKi9cbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuICAgIC8qKiBXaGV0aGVyIHRoZSBjb21wb25lbnQgc3VwcG9ydHMgbXVsdGlwbGUgc2VsZWN0aW9uICovXG4gICAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW47XG4gICAgLyoqIE9wdGlvbmFsIGlucHV0LiBUaGUgY29tcG9uZW50IGF1dG9tYXRpY2FsbHkgbG9va3MgZm9yIGFuIGFnZ3JlZ2F0aW9uIHdpdGggdGhlIG5hbWUgZXF1YWwgdG8gdGhlIGZpZWxkICovXG4gICAgQElucHV0KCkgYWdncmVnYXRpb246IHN0cmluZztcblxuICAgIGNvbHVtbjogQ0NDb2x1bW4gfCB1bmRlZmluZWQ7XG4gICAgaXRlbXM6IFZhbHVlSXRlbVtdO1xuXG4gICAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhcHBTZXJ2aWNlOiBBcHBTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGZpcnN0UGFnZVNlcnZpY2U6IEZpcnN0UGFnZVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZm9ybS5nZXQodGhpcy5maWVsZCk7XG4gICAgICAgIGlmKCFjb250cm9sKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjb250cm9sIGluIHNlYXJjaC1mb3JtIG5hbWVkIFwiK3RoaXMuZmllbGQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29sdW1uID0gdGhpcy5hcHBTZXJ2aWNlLmdldENvbHVtbih0aGlzLmZpZWxkKTtcbiAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuZ2V0SXRlbXMoKTtcbiAgICAgICAgaWYodGhpcy5sYWJlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZih0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbCA9IHRoaXMuYXBwU2VydmljZS5nZXRQbHVyYWxMYWJlbCh0aGlzLmZpZWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwgPSB0aGlzLmFwcFNlcnZpY2UuZ2V0TGFiZWwodGhpcy5maWVsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEl0ZW1zKCk6IFZhbHVlSXRlbVtdIHtcbiAgICAgICAgY29uc3QgZmlyc3RQYWdlID0gdGhpcy5maXJzdFBhZ2VTZXJ2aWNlLmZpcnN0UGFnZTtcbiAgICAgICAgaWYgKGZpcnN0UGFnZSkge1xuICAgICAgICAgICAgLy8gRmluZCBhZ2dyZWdhdGlvbiBmb3IgZmllbGRcbiAgICAgICAgICAgIGNvbnN0IGNvbmRpdGlvbiA9ICh0aGlzLmFnZ3JlZ2F0aW9uKSA/XG4gICAgICAgICAgICAgICAgKGFnZ3I6IEFnZ3JlZ2F0aW9uKSA9PiBVdGlscy5lcU5DKGFnZ3IubmFtZSwgdGhpcy5hZ2dyZWdhdGlvbikgOlxuICAgICAgICAgICAgICAgIChhZ2dyOiBBZ2dyZWdhdGlvbikgPT4gdGhpcy5jb2x1bW4gJiYgVXRpbHMuZXFOQyhhZ2dyLmNvbHVtbiwgdGhpcy5jb2x1bW4ubmFtZSk7XG4gICAgICAgICAgICBjb25zdCBhZ2dyZWdhdGlvbiA9IGZpcnN0UGFnZS5hZ2dyZWdhdGlvbnMuZmluZChjb25kaXRpb24pO1xuXG4gICAgICAgICAgICBpZiAoYWdncmVnYXRpb24gJiYgYWdncmVnYXRpb24uaXRlbXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWdncmVnYXRpb24uaXRlbXNcbiAgICAgICAgICAgICAgICAuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAoaXRlbSkgPT4gIVV0aWxzLmlzQXJyYXkoaXRlbS52YWx1ZSkgJiYgISFpdGVtLnZhbHVlXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAgICAgICAgIChpdGVtOiBBZ2dyZWdhdGlvbkl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaXRlbS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBpdGVtLmRpc3BsYXkgPyBpdGVtLmRpc3BsYXkgOiBpdGVtLnZhbHVlLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgPGxhYmVsIGZvcj1cInt7ZmllbGR9fVwiPnt7bGFiZWwgfCBzcU1lc3NhZ2V9fTwvbGFiZWw+XG4gICAgPHNxLXNlbGVjdFxuICAgICAgICBbaXRlbXNdPVwiaXRlbXNcIlxuICAgICAgICBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIlxuICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImZpZWxkXCJcbiAgICAgICAgW2lkXT1cImZpZWxkXCJcbiAgICAgICAgc3FBZHZhbmNlZEZvcm1WYWxpZGF0aW9uXG4gICAgICAgIFtmaWVsZF09XCJmaWVsZFwiXG4gICAgICAgIFt2YWxpZGF0aW9uRm9ybV09XCJmb3JtXCI+XG4gICAgPC9zcS1zZWxlY3Q+XG48L2Rpdj5cbiJdfQ==