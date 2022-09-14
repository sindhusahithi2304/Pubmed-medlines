import { Component, Input } from "@angular/core";
import { Keys, Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "../advanced-form-validation.directive";
import * as i3 from "@angular/common";
import * as i4 from "./advanced-form-autocomplete-multi-input.directive";
import * as i5 from "@sinequa/components/autocomplete";
import * as i6 from "@sinequa/core/intl";
function BsAdvancedFormMultiInput_span_6_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "span", 8);
    i0.ɵɵlistener("click", function BsAdvancedFormMultiInput_span_6_Template_span_click_2_listener() { i0.ɵɵrestoreView(_r6); const item_r4 = ctx.$implicit; const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.removeItem(item_r4); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r4.display, " ");
} }
function BsAdvancedFormMultiInput_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", item_r7.display, " ");
} }
/**
 * Component representing a text input that accepts multiple entries.
 * This component also performs value validation on each entry.
 *
 */
export class BsAdvancedFormMultiInput {
    constructor(elementRef, appService) {
        this.elementRef = elementRef;
        this.appService = appService;
        this.items = []; /** List of items already existing in the advanced search */
    }
    ngOnChanges() {
        if (this.label === undefined) {
            this.label = this.appService.getPluralLabel(this.field);
        }
        this.control = this.form.get(this.field);
        if (this.control) {
            this.items = this.control.value
                ? (Utils.isArray(this.control.value)
                    ? this.control.value
                    : [this.control.value]).map((item) => {
                    return {
                        display: item.display ? item.display : item.value.toString(),
                        normalized: item.value.toString(),
                        category: "",
                    };
                })
                : [];
            this._valueChangesSubscription = Utils.subscribe(this.control.valueChanges, (value) => {
                if (value && !Utils.isArray(value)) {
                    value = [value];
                }
                this.items = value
                    ? value.map((item) => {
                        return {
                            display: item.display ? item.display : item.value.toString(),
                            normalized: item.value.toString(),
                            category: "",
                        };
                    })
                    : [];
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
    removeItem(item) {
        this.items.splice(this.items.indexOf(item), 1);
        this._updateControl();
    }
    onItemsChanged(items) {
        this.items = items;
        this._updateControl();
    }
    keydown(event) {
        // Intercept tab and set focus to surrounding dropdown-item
        if (event.keyCode === Keys.tab) {
            const dropdownItem = this._getDropdownItem();
            if (dropdownItem) {
                dropdownItem.focus();
                event.preventDefault();
                return false;
            }
        }
        return undefined;
    }
    keypress(event) {
        if (event.keyCode === Keys.enter) {
            // Stop click event firing on surrounding anchor (Firefox)
            event.preventDefault();
            return false;
        }
        return undefined;
    }
    _updateControl() {
        var _a, _b;
        const value = this.items.length > 0
            ? this.items.map((item) => ({
                value: item.normalized,
                display: item.display
            }))
            : undefined;
        (_a = this.control) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        (_b = this.control) === null || _b === void 0 ? void 0 : _b.setValue(value, { emitEvent: false });
    }
    _getDropdownItem() {
        if (this.elementRef) {
            let current = this.elementRef
                .nativeElement;
            while (current && !current.classList.contains("dropdown-item")) {
                current = current.parentElement;
            }
            return current;
        }
        return null;
    }
}
BsAdvancedFormMultiInput.ɵfac = function BsAdvancedFormMultiInput_Factory(t) { return new (t || BsAdvancedFormMultiInput)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.AppService)); };
BsAdvancedFormMultiInput.ɵcmp = i0.ɵɵdefineComponent({ type: BsAdvancedFormMultiInput, selectors: [["sq-advanced-form-multi-input"]], inputs: { form: "form", field: "field", suggestQuery: "suggestQuery", label: "label" }, features: [i0.ɵɵNgOnChangesFeature], decls: 12, vars: 11, consts: [[1, "d-inline"], [1, "sq-dropdown-form"], ["sqAdvancedFormValidation", "", 1, "form-control", "multi-entry", 3, "field", "validationForm"], ["class", "badge badge-pill badge-secondary align-self-center mr-1", 4, "ngFor", "ngForOf"], ["type", "text", "autocomplete", "off", "spellcheck", "off", "sqAdvancedFormAutocompleteMultiInput", "", 1, "input-autocomplete", "flex-grow-1", 3, "field", "off", "suggestQuery", "items", "dropdown", "itemsUpdate", "keydown", "keypress"], ["dropdown", ""], ["itemTpl", ""], [1, "badge", "badge-pill", "badge-secondary", "align-self-center", "mr-1"], [1, "fas", "fa-times-circle", "clickable", 3, "click"], [1, "autocomplete-item", "p-2"]], template: function BsAdvancedFormMultiInput_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "label");
        i0.ɵɵtext(2);
        i0.ɵɵpipe(3, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "section", 1);
        i0.ɵɵelementStart(5, "div", 2);
        i0.ɵɵtemplate(6, BsAdvancedFormMultiInput_span_6_Template, 3, 1, "span", 3);
        i0.ɵɵelementStart(7, "input", 4);
        i0.ɵɵlistener("itemsUpdate", function BsAdvancedFormMultiInput_Template_input_itemsUpdate_7_listener($event) { return ctx.onItemsChanged($event); })("keydown", function BsAdvancedFormMultiInput_Template_input_keydown_7_listener($event) { return ctx.keydown($event); })("keypress", function BsAdvancedFormMultiInput_Template_input_keypress_7_listener($event) { return ctx.keypress($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "sq-autocomplete-list", null, 5);
        i0.ɵɵtemplate(10, BsAdvancedFormMultiInput_ng_template_10_Template, 2, 1, "ng-template", null, 6, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r1 = i0.ɵɵreference(9);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 9, ctx.label));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("field", ctx.field)("validationForm", ctx.form);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.items);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("field", ctx.field)("off", !ctx.suggestQuery)("suggestQuery", ctx.suggestQuery)("items", ctx.items)("dropdown", _r1);
    } }, directives: [i2.BsAdvancedFormValidation, i3.NgForOf, i4.BsAdvancedFormAutocompleteMultiInput, i5.BsAutocompleteList], pipes: [i6.MessagePipe], styles: [".sq-dropdown-form[_ngcontent-%COMP%]{display:inline;min-width:13rem}.disabled[_ngcontent-%COMP%]{cursor:not-allowed}.clickable[_ngcontent-%COMP%]{cursor:pointer}.clickable[_ngcontent-%COMP%]:hover{opacity:1%}.multi-entry[_ngcontent-%COMP%]{align-items:center;display:flex;flex-wrap:wrap;height:unset!important;width:100%}[_nghost-%COMP%]   input[_ngcontent-%COMP%]{border:none;flex-basis:100px;flex-grow:1;min-width:100px}[_nghost-%COMP%]   input[_ngcontent-%COMP%]:focus{outline:none}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsAdvancedFormMultiInput, [{
        type: Component,
        args: [{
                selector: "sq-advanced-form-multi-input",
                templateUrl: "./advanced-form-multi-input.html",
                styleUrls: ["./advanced-form-multi-input.scss"],
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.AppService }]; }, { form: [{
            type: Input
        }], field: [{
            type: Input
        }], suggestQuery: [{
            type: Input
        }], label: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2YW5jZWQtZm9ybS1tdWx0aS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2FkdmFuY2VkLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2FkdmFuY2VkLWZvcm0tbXVsdGktaW5wdXQvYWR2YW5jZWQtZm9ybS1tdWx0aS1pbnB1dC50cyIsImJvb3RzdHJhcC9hZHZhbmNlZC1mb3JtLW11bHRpLWlucHV0L2FkdmFuY2VkLWZvcm0tbXVsdGktaW5wdXQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFFbkYsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7OztJQ0tyQywrQkFHSTtJQUFBLFlBQ0E7SUFBQSwrQkFBdUU7SUFBM0IsaU9BQTBCO0lBQUMsaUJBQU87SUFDbEYsaUJBQU87OztJQUZILGVBQ0E7SUFEQSxnREFDQTs7O0lBbUJBLDhCQUFtQztJQUFBLFlBQ25DO0lBQUEsaUJBQU07OztJQUQ2QixlQUNuQztJQURtQywrQ0FDbkM7O0FEeEJoQjs7OztHQUlHO0FBTUgsTUFBTSxPQUFPLHdCQUF3QjtJQVdqQyxZQUNZLFVBQXNCLEVBQ3ZCLFVBQXNCO1FBRHJCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdkIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQVBqQyxVQUFLLEdBQXVCLEVBQUUsQ0FBQyxDQUFDLDREQUE0RDtJQU94RCxDQUFDO0lBRXJDLFdBQVc7UUFDUCxJQUFHLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNEO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFD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QnJDLDhCQUNJO1FBQUEsNkJBQU87UUFBQSxZQUFxQjs7UUFBQSxpQkFBUTtRQUNwQyxrQ0FDSTtRQUFBLDhCQUlJO1FBQUEsMkVBS087UUFDUCxnQ0FjSjtRQUxRLHNIQUFlLDBCQUFzQixJQUFDLGlHQUczQixtQkFBZSxJQUhZLG1HQUkxQixvQkFBZ0IsSUFKVTtRQVQxQyxpQkFjSjtRQUFBLGlCQUFNO1FBQ04scURBQ0k7UUFBQSw0SEFHYztRQUNsQixpQkFBdUI7UUFDM0IsaUJBQVU7UUFDZCxpQkFBTTs7O1FBbENLLGVBQXFCO1FBQXJCLHFEQUFxQjtRQUlwQixlQUFlO1FBQWYsaUNBQWUsNEJBQUE7UUFHTSxlQUFRO1FBQVIsbUNBQVE7UUFXekIsZUFBZTtRQUFmLGlDQUFlLDBCQUFBLGtDQUFBLG9CQUFBLGlCQUFBOztrRERGbEIsd0JBQXdCO2NBTHBDLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsOEJBQThCO2dCQUN4QyxXQUFXLEVBQUUsa0NBQWtDO2dCQUMvQyxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQzthQUNsRDtzRkFFWSxJQUFJO2tCQUFaLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxZQUFZO2tCQUFwQixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBFbGVtZW50UmVmLCBPbkRlc3Ryb3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IEtleXMsIFV0aWxzIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHsgQXV0b2NvbXBsZXRlSXRlbSB9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2F1dG9jb21wbGV0ZVwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IEFwcFNlcnZpY2UsIFZhbHVlSXRlbSB9IGZyb20gJ0BzaW5lcXVhL2NvcmUvYXBwLXV0aWxzJztcblxuLyoqXG4gKiBDb21wb25lbnQgcmVwcmVzZW50aW5nIGEgdGV4dCBpbnB1dCB0aGF0IGFjY2VwdHMgbXVsdGlwbGUgZW50cmllcy5cbiAqIFRoaXMgY29tcG9uZW50IGFsc28gcGVyZm9ybXMgdmFsdWUgdmFsaWRhdGlvbiBvbiBlYWNoIGVudHJ5LlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtYWR2YW5jZWQtZm9ybS1tdWx0aS1pbnB1dFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vYWR2YW5jZWQtZm9ybS1tdWx0aS1pbnB1dC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL2FkdmFuY2VkLWZvcm0tbXVsdGktaW5wdXQuc2Nzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQnNBZHZhbmNlZEZvcm1NdWx0aUlucHV0IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIGZvcm06IEZvcm1Hcm91cDtcbiAgICBASW5wdXQoKSBmaWVsZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHN1Z2dlc3RRdWVyeTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgICBpdGVtczogQXV0b2NvbXBsZXRlSXRlbVtdID0gW107IC8qKiBMaXN0IG9mIGl0ZW1zIGFscmVhZHkgZXhpc3RpbmcgaW4gdGhlIGFkdmFuY2VkIHNlYXJjaCAqL1xuICAgIHByaXZhdGUgX3ZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29udHJvbDogQWJzdHJhY3RDb250cm9sIHwgbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHB1YmxpYyBhcHBTZXJ2aWNlOiBBcHBTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgICAgIGlmKHRoaXMubGFiZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5sYWJlbCA9IHRoaXMuYXBwU2VydmljZS5nZXRQbHVyYWxMYWJlbCh0aGlzLmZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnRyb2wgPSB0aGlzLmZvcm0uZ2V0KHRoaXMuZmllbGQpO1xuICAgICAgICBpZiAodGhpcy5jb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5jb250cm9sLnZhbHVlXG4gICAgICAgICAgICAgICAgPyAoVXRpbHMuaXNBcnJheSh0aGlzLmNvbnRyb2wudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuY29udHJvbC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBbdGhpcy5jb250cm9sLnZhbHVlXVxuICAgICAgICAgICAgICAgICAgICApLm1hcCgoaXRlbTogVmFsdWVJdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGl0ZW0uZGlzcGxheSA/IGl0ZW0uZGlzcGxheSA6IGl0ZW0udmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVkOiBpdGVtLnZhbHVlLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIDogW107XG5cbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbiA9IFV0aWxzLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2wudmFsdWVDaGFuZ2VzLFxuICAgICAgICAgICAgICAgICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZSAmJiAhVXRpbHMuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gW3ZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdmFsdWUubWFwKChpdGVtOiBWYWx1ZUl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGl0ZW0uZGlzcGxheSA/IGl0ZW0uZGlzcGxheSA6IGl0ZW0udmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWQ6IGl0ZW0udmFsdWUudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBmb3JtIGNvbnRyb2wgbmFtZWQgXCIrdGhpcy5maWVsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVJdGVtKGl0ZW06IEF1dG9jb21wbGV0ZUl0ZW0pIHtcbiAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UodGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pLCAxKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ29udHJvbCgpO1xuICAgIH1cblxuICAgIG9uSXRlbXNDaGFuZ2VkKGl0ZW1zOiBBdXRvY29tcGxldGVJdGVtW10pIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xuICAgICAgICB0aGlzLl91cGRhdGVDb250cm9sKCk7XG4gICAgfVxuXG4gICAga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvLyBJbnRlcmNlcHQgdGFiIGFuZCBzZXQgZm9jdXMgdG8gc3Vycm91bmRpbmcgZHJvcGRvd24taXRlbVxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS2V5cy50YWIpIHtcbiAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duSXRlbSA9IHRoaXMuX2dldERyb3Bkb3duSXRlbSgpO1xuICAgICAgICAgICAgaWYgKGRyb3Bkb3duSXRlbSkge1xuICAgICAgICAgICAgICAgIGRyb3Bkb3duSXRlbS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAga2V5cHJlc3MoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEtleXMuZW50ZXIpIHtcbiAgICAgICAgICAgIC8vIFN0b3AgY2xpY2sgZXZlbnQgZmlyaW5nIG9uIHN1cnJvdW5kaW5nIGFuY2hvciAoRmlyZWZveClcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVDb250cm9sKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuaXRlbXMubGVuZ3RoID4gMFxuICAgICAgICAgICAgPyB0aGlzLml0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW0ubm9ybWFsaXplZCEsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGl0ZW0uZGlzcGxheVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkpXG4gICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICB0aGlzLmNvbnRyb2w/Lm1hcmtBc0RpcnR5KCk7XG4gICAgICAgIHRoaXMuY29udHJvbD8uc2V0VmFsdWUodmFsdWUsIHtlbWl0RXZlbnQ6IGZhbHNlfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0RHJvcGRvd25JdGVtKCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRSZWYpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLmVsZW1lbnRSZWZcbiAgICAgICAgICAgICAgICAubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgIHdoaWxlIChjdXJyZW50ICYmICFjdXJyZW50LmNsYXNzTGlzdC5jb250YWlucyhcImRyb3Bkb3duLWl0ZW1cIikpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImQtaW5saW5lXCI+XG4gICAgPGxhYmVsPnt7bGFiZWwgfCBzcU1lc3NhZ2V9fTwvbGFiZWw+XG4gICAgPHNlY3Rpb24gY2xhc3M9XCJzcS1kcm9wZG93bi1mb3JtXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWNvbnRyb2wgbXVsdGktZW50cnlcIlxuICAgICAgICAgICAgc3FBZHZhbmNlZEZvcm1WYWxpZGF0aW9uXG4gICAgICAgICAgICBbZmllbGRdPVwiZmllbGRcIlxuICAgICAgICAgICAgW3ZhbGlkYXRpb25Gb3JtXT1cImZvcm1cIj5cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1zZWNvbmRhcnkgYWxpZ24tc2VsZi1jZW50ZXIgbXItMVwiPlxuICAgICAgICAgICAgICAgIHt7IGl0ZW0uZGlzcGxheSB9fVxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmFzIGZhLXRpbWVzLWNpcmNsZSBjbGlja2FibGVcIiAoY2xpY2spPVwicmVtb3ZlSXRlbShpdGVtKVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGNsYXNzPVwiaW5wdXQtYXV0b2NvbXBsZXRlIGZsZXgtZ3Jvdy0xXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgICAgICAgICBzcGVsbGNoZWNrPVwib2ZmXCJcbiAgICAgICAgICAgICAgICBzcUFkdmFuY2VkRm9ybUF1dG9jb21wbGV0ZU11bHRpSW5wdXRcbiAgICAgICAgICAgICAgICBbZmllbGRdPVwiZmllbGRcIlxuICAgICAgICAgICAgICAgIFtvZmZdPVwiIXN1Z2dlc3RRdWVyeVwiXG4gICAgICAgICAgICAgICAgW3N1Z2dlc3RRdWVyeV09XCJzdWdnZXN0UXVlcnlcIlxuICAgICAgICAgICAgICAgIChpdGVtc1VwZGF0ZSk9XCJvbkl0ZW1zQ2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbaXRlbXNdPVwiaXRlbXNcIlxuICAgICAgICAgICAgICAgIFtkcm9wZG93bl09XCJkcm9wZG93blwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwia2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoa2V5cHJlc3MpPVwia2V5cHJlc3MoJGV2ZW50KVwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHNxLWF1dG9jb21wbGV0ZS1saXN0ICNkcm9wZG93bj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaXRlbVRwbCBsZXQtaXRlbT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXV0b2NvbXBsZXRlLWl0ZW0gcC0yXCI+e3tpdGVtLmRpc3BsYXl9fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9zcS1hdXRvY29tcGxldGUtbGlzdD5cbiAgICA8L3NlY3Rpb24+XG48L2Rpdj5cbiJdfQ==