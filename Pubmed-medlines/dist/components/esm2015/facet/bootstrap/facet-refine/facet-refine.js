import { Component, Input } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import { AbstractFacet } from "../../abstract-facet";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@sinequa/components/search";
import * as i3 from "@sinequa/components/autocomplete";
import * as i4 from "@angular/common";
import * as i5 from "@sinequa/core/intl";
function BsRefine_ng_template_15_small_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 14);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, item_r3.label || item_r3.category));
} }
function BsRefine_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, BsRefine_ng_template_15_small_2_Template, 3, 3, "small", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", item_r3.display, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r3.category);
} }
export class BsRefine extends AbstractFacet {
    constructor(formBuilder, searchService, changeDetectorRef) {
        super();
        this.formBuilder = formBuilder;
        this.searchService = searchService;
        this.changeDetectorRef = changeDetectorRef;
        /**
         * Minimum delay (in ms) between suggest queries
         */
        this.suggestDelay = 200;
        this.doRefine = () => {
            if (this.searchControl) {
                const text = Utils.trim(this.searchControl.value);
                if (text) {
                    this.searchService.searchRefine(text);
                }
            }
        };
    }
    ngOnChanges(changes) {
        if (!this.form) {
            this.form = this.formBuilder.group({
                "search": ""
            });
            this.searchControl = this.form.get("search");
        }
        if (!!changes["results"] && this.searchControl) {
            this.searchControl.setValue(this.searchService.lastRefineText);
        }
    }
    setError(parseResult = {}) {
        if (parseResult.error !== this.inputErrorMessage) {
            this.inputErrorMessage = parseResult.error || "";
            this.changeDetectorRef.markForCheck();
        }
    }
}
BsRefine.ɵfac = function BsRefine_Factory(t) { return new (t || BsRefine)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.SearchService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
BsRefine.ɵcmp = i0.ɵɵdefineComponent({ type: BsRefine, selectors: [["sq-refine"]], inputs: { results: "results", autocompleteEnabled: "autocompleteEnabled", suggestQuery: "suggestQuery", suggestDelay: "suggestDelay" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 18, vars: 20, consts: [[1, "card-body"], ["role", "search", "novalidate", "", 3, "formGroup"], [1, "d-flex", "flex-column", "flex-grow-1", "position-relative"], [1, "input-group"], [1, "sr-only"], ["type", "text", "formControlName", "search", "spellcheck", "false", "autocomplete", "off", "sqAutocomplete", "", 3, "title", "placeholder", "dropdown", "suggestQuery", "off", "suggestDelay", "submit", "parse"], [1, "input-group-append"], ["type", "button", 1, "btn", "btn-light", 3, "title", "click"], [1, "fas", "fa-search"], ["dropdown", ""], ["itemTpl", ""], [3, "results", "context"], [1, "py-2", 2, "padding-left", "0.75rem"], ["class", "ml-2 text-muted", 4, "ngIf"], [1, "ml-2", "text-muted"]], template: function BsRefine_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "form", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵelementStart(4, "label", 4);
        i0.ɵɵtext(5);
        i0.ɵɵpipe(6, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "input", 5);
        i0.ɵɵlistener("submit", function BsRefine_Template_input_submit_7_listener() { return ctx.doRefine(); })("parse", function BsRefine_Template_input_parse_7_listener($event) { return ctx.setError($event); });
        i0.ɵɵpipe(8, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "div", 6);
        i0.ɵɵelementStart(10, "button", 7);
        i0.ɵɵlistener("click", function BsRefine_Template_button_click_10_listener() { return ctx.doRefine(); });
        i0.ɵɵpipe(11, "sqMessage");
        i0.ɵɵelement(12, "i", 8);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "sq-autocomplete-list", null, 9);
        i0.ɵɵtemplate(15, BsRefine_ng_template_15_Template, 3, 2, "ng-template", null, 10, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelement(17, "sq-did-you-mean", 11);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r0 = i0.ɵɵreference(14);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 14, "msg#facet.refine.input.label"));
        i0.ɵɵadvance(2);
        i0.ɵɵclassMapInterpolate1("form-control ", ctx.inputErrorMessage ? "is-invalid" : "", "");
        i0.ɵɵproperty("title", ctx.inputErrorMessage)("placeholder", i0.ɵɵpipeBind1(8, 16, "msg#facet.refine.input.placeholder"))("dropdown", _r0)("suggestQuery", ctx.suggestQuery)("off", !ctx.autocompleteEnabled)("suggestDelay", ctx.suggestDelay);
        i0.ɵɵadvance(3);
        i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(11, 18, "msg#facet.refine.input.buttonTitle"));
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("results", ctx.results)("context", "refine");
    } }, directives: [i1.ɵangular_packages_forms_forms_y, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.DefaultValueAccessor, i1.NgControlStatus, i1.FormControlName, i3.Autocomplete, i3.BsAutocompleteList, i2.BsDidYouMean, i4.NgIf], pipes: [i5.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsRefine, [{
        type: Component,
        args: [{
                selector: "sq-refine",
                templateUrl: "./facet-refine.html"
            }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.SearchService }, { type: i0.ChangeDetectorRef }]; }, { results: [{
            type: Input
        }], autocompleteEnabled: [{
            type: Input
        }], suggestQuery: [{
            type: Input
        }], suggestDelay: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtcmVmaW5lLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvZmFjZXQvIiwic291cmNlcyI6WyJib290c3RyYXAvZmFjZXQtcmVmaW5lL2ZhY2V0LXJlZmluZS50cyIsImJvb3RzdHJhcC9mYWNldC1yZWZpbmUvZmFjZXQtcmVmaW5lLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQThDLE1BQU0sZUFBZSxDQUFDO0FBRzVGLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUV6QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7Ozs7Ozs7O0lDNkIzQixpQ0FBcUQ7SUFBQSxZQUE2Qzs7SUFBQSxpQkFBUTs7O0lBQXJELGVBQTZDO0lBQTdDLDZFQUE2Qzs7O0lBRHRHLCtCQUFnRDtJQUFBLFlBQzVDO0lBQUEsNkVBQTBHO0lBQzlHLGlCQUFNOzs7SUFGMEMsZUFDNUM7SUFENEMsK0NBQzVDO0lBQVEsZUFBbUI7SUFBbkIsdUNBQW1COztBRHRCbkQsTUFBTSxPQUFPLFFBQVMsU0FBUSxhQUFhO0lBMkJ2QyxZQUNXLFdBQXdCLEVBQ3hCLGFBQTRCLEVBQzNCLGlCQUFvQztRQUM1QyxLQUFLLEVBQUUsQ0FBQztRQUhELGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzNCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFiaEQ7O1dBRUc7UUFDTSxpQkFBWSxHQUFXLEdBQUcsQ0FBQztRQTBCcEMsYUFBUSxHQUFHLEdBQUcsRUFBRTtZQUNaLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDcEIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLElBQUksRUFBRTtvQkFDTixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDekM7YUFDSjtRQUNMLENBQUMsQ0FBQTtJQXJCRCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1osSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztnQkFDL0IsUUFBUSxFQUFFLEVBQUU7YUFDZixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUNsRTtJQUNMLENBQUM7SUFXRCxRQUFRLENBQUMsY0FBMkIsRUFBRTtRQUNsQyxJQUFHLFdBQVcsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLGlCQUFpQixFQUFDO1lBQzVDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxXQUFXLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDekM7SUFDTCxDQUFDOztnRUE1RFEsUUFBUTs2Q0FBUixRQUFRO1FDWnJCLDhCQUNJO1FBQUEsK0JBRUk7UUFBQSw4QkFDSTtRQUFBLDhCQUNJO1FBQUEsZ0NBQXVCO1FBQUEsWUFBOEM7O1FBQUEsaUJBQVE7UUFFN0UsZ0NBaUJBO1FBSEksc0ZBQVUsY0FBVSxJQUFDLDZFQUNaLG9CQUFnQixJQURKOztRQWR6QixpQkFpQkE7UUFBQSw4QkFDSTtRQUFBLGtDQUNJO1FBRHdDLHNGQUFTLGNBQVUsSUFBQzs7UUFDNUQsd0JBQTZCO1FBQ2pDLGlCQUFTO1FBQ2IsaUJBQU07UUFDVixpQkFBTTtRQUVOLHNEQUNJO1FBQUEsNkdBSWM7UUFDbEIsaUJBQXVCO1FBQzNCLGlCQUFNO1FBQ1YsaUJBQU87UUFDUCx1Q0FBNEU7UUFDaEYsaUJBQU07OztRQXhDNkIsZUFBa0I7UUFBbEIsb0NBQWtCO1FBSWQsZUFBOEM7UUFBOUMsMkVBQThDO1FBSWpFLGVBQThEO1FBQTlELHlGQUE4RDtRQUc5RCw2Q0FBMkIsNEVBQUEsaUJBQUEsa0NBQUEsaUNBQUEsa0NBQUE7UUFhc0MsZUFBNEQ7UUFBNUQsK0ZBQTREO1FBZTVILGVBQW1CO1FBQW5CLHFDQUFtQixxQkFBQTs7a0RENUIzQixRQUFRO2NBSnBCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsV0FBVztnQkFDckIsV0FBVyxFQUFFLHFCQUFxQjthQUNyQzswSEFNWSxPQUFPO2tCQUFmLEtBQUs7WUFLRyxtQkFBbUI7a0JBQTNCLEtBQUs7WUFLRyxZQUFZO2tCQUFwQixLQUFLO1lBS0csWUFBWTtrQkFBcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Rm9ybUdyb3VwLCBGb3JtQnVpbGRlciwgQWJzdHJhY3RDb250cm9sfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7UmVzdWx0c30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge1NlYXJjaFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3NlYXJjaFwiO1xuaW1wb3J0IHtBYnN0cmFjdEZhY2V0fSBmcm9tIFwiLi4vLi4vYWJzdHJhY3QtZmFjZXRcIjtcbmltcG9ydCB7UGFyc2VSZXN1bHR9IGZyb20gJ0BzaW5lcXVhL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtcmVmaW5lXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9mYWNldC1yZWZpbmUuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEJzUmVmaW5lIGV4dGVuZHMgQWJzdHJhY3RGYWNldCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICAvKipcbiAgICAgKiBSZXN1bHRzIG9mIHRoZSBzZWFyY2ggcGFnZSBhc3NvY2lhdGVkIHRvIHRoaXMgcmVmaW5lXG4gICAgICovXG4gICAgQElucHV0KCkgcmVzdWx0czogUmVzdWx0cztcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgb3Igbm90IHRvIGVuYWJsZSBhdXRvY29tcGxldGlvblxuICAgICAqL1xuICAgIEBJbnB1dCgpIGF1dG9jb21wbGV0ZUVuYWJsZWQ6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBTdWdnZXN0IHF1ZXJ5IHdpdGggd2hpY2ggdG8gcGVyZm9ybSBhdXRvY29tcGxldGlvblxuICAgICAqL1xuICAgIEBJbnB1dCgpIHN1Z2dlc3RRdWVyeTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogTWluaW11bSBkZWxheSAoaW4gbXMpIGJldHdlZW4gc3VnZ2VzdCBxdWVyaWVzXG4gICAgICovXG4gICAgQElucHV0KCkgc3VnZ2VzdERlbGF5OiBudW1iZXIgPSAyMDA7XG5cbiAgICBmb3JtOiBGb3JtR3JvdXA7XG4gICAgc2VhcmNoQ29udHJvbDogQWJzdHJhY3RDb250cm9sIHwgbnVsbDtcblxuICAgIGlucHV0RXJyb3JNZXNzYWdlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICAgICAgcHVibGljIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoIXRoaXMuZm9ybSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICAgICAgXCJzZWFyY2hcIjogXCJcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaENvbnRyb2wgPSB0aGlzLmZvcm0uZ2V0KFwic2VhcmNoXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghIWNoYW5nZXNbXCJyZXN1bHRzXCJdICYmIHRoaXMuc2VhcmNoQ29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hDb250cm9sLnNldFZhbHVlKHRoaXMuc2VhcmNoU2VydmljZS5sYXN0UmVmaW5lVGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb1JlZmluZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoQ29udHJvbCkge1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IFV0aWxzLnRyaW0odGhpcy5zZWFyY2hDb250cm9sLnZhbHVlKTtcbiAgICAgICAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaFJlZmluZSh0ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEVycm9yKHBhcnNlUmVzdWx0OiBQYXJzZVJlc3VsdCA9IHt9KXtcbiAgICAgICAgaWYocGFyc2VSZXN1bHQuZXJyb3IgIT09IHRoaXMuaW5wdXRFcnJvck1lc3NhZ2Upe1xuICAgICAgICAgICAgdGhpcy5pbnB1dEVycm9yTWVzc2FnZSA9IHBhcnNlUmVzdWx0LmVycm9yIHx8IFwiXCI7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxufSIsIjxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICA8Zm9ybSByb2xlPVwic2VhcmNoXCIgbm92YWxpZGF0ZSBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggZmxleC1jb2x1bW4gZmxleC1ncm93LTEgcG9zaXRpb24tcmVsYXRpdmVcIj4gICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwic3Itb25seVwiPnt7J21zZyNmYWNldC5yZWZpbmUuaW5wdXQubGFiZWwnIHwgc3FNZXNzYWdlfX08L2xhYmVsPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInNlYXJjaFwiIFxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCB7e2lucHV0RXJyb3JNZXNzYWdlID8gJ2lzLWludmFsaWQnIDogJyd9fVwiXG4gICAgICAgICAgICAgICAgICAgIHNwZWxsY2hlY2s9XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgICAgICAgICAgICAgICAgIFt0aXRsZV09XCJpbnB1dEVycm9yTWVzc2FnZVwiXG5cbiAgICAgICAgICAgICAgICAgICAgc3FBdXRvY29tcGxldGVcbiAgICAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cIidtc2cjZmFjZXQucmVmaW5lLmlucHV0LnBsYWNlaG9sZGVyJyB8IHNxTWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgICAgIFtkcm9wZG93bl09XCJkcm9wZG93blwiIFxuICAgICAgICAgICAgICAgICAgICBbc3VnZ2VzdFF1ZXJ5XT1cInN1Z2dlc3RRdWVyeVwiXG4gICAgICAgICAgICAgICAgICAgIFtvZmZdPVwiIWF1dG9jb21wbGV0ZUVuYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICBbc3VnZ2VzdERlbGF5XT1cInN1Z2dlc3REZWxheVwiICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAoc3VibWl0KT1cImRvUmVmaW5lKClcIlxuICAgICAgICAgICAgICAgICAgICAocGFyc2UpPVwic2V0RXJyb3IoJGV2ZW50KVwiPlxuICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tbGlnaHRcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImRvUmVmaW5lKClcIiB0aXRsZT1cInt7J21zZyNmYWNldC5yZWZpbmUuaW5wdXQuYnV0dG9uVGl0bGUnIHwgc3FNZXNzYWdlfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXNlYXJjaFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICBcbiAgICAgICAgICAgIDxzcS1hdXRvY29tcGxldGUtbGlzdCAjZHJvcGRvd24+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNpdGVtVHBsIGxldC1pdGVtPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHktMlwiIHN0eWxlPVwicGFkZGluZy1sZWZ0OjAuNzVyZW07XCI+e3tpdGVtLmRpc3BsYXl9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsICpuZ0lmPVwiaXRlbS5jYXRlZ29yeVwiIGNsYXNzPVwibWwtMiB0ZXh0LW11dGVkXCI+e3soaXRlbS5sYWJlbCB8fCBpdGVtLmNhdGVnb3J5KSB8IHNxTWVzc2FnZX19PC9zbWFsbD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvc3EtYXV0b2NvbXBsZXRlLWxpc3Q+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZm9ybT4gICAgXG4gICAgPHNxLWRpZC15b3UtbWVhbiBbcmVzdWx0c109XCJyZXN1bHRzXCIgW2NvbnRleHRdPVwiJ3JlZmluZSdcIj48L3NxLWRpZC15b3UtbWVhbj5cbjwvZGl2PiJdfQ==