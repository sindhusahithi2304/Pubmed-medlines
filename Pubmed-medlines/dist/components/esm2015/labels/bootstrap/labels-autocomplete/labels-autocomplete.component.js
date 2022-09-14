import { Component, EventEmitter, Output, Input, } from "@angular/core";
import { Keys } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common";
import * as i3 from "../../labels-autocomplete.directive";
import * as i4 from "@sinequa/components/autocomplete";
import * as i5 from "@sinequa/core/intl";
const _c0 = function (a0, a1) { return { "label-public": a0, "label-private": a1 }; };
function BsLabelsAutocompleteComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "span", 8);
    i0.ɵɵlistener("click", function BsLabelsAutocompleteComponent_span_3_Template_span_click_2_listener() { i0.ɵɵrestoreView(_r6); const item_r4 = ctx.$implicit; const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.removeItem(item_r4); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(2, _c0, ctx_r0.public, !ctx_r0.public));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r4.display, " ");
} }
function BsLabelsAutocompleteComponent_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", item_r7.display, " ");
} }
/**
 * Component containing a form and autocomplete to search
 * through the list labels according to a specific type (public/private) and select one(s) of them
 *
 * The component can be used as custom component in the Action
 * menu's modals.
 */
export class BsLabelsAutocompleteComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        /** Event synchronizing the list of selected labels and label's type in the parent component */
        this.labelsUpdate = new EventEmitter();
        this.disableAutocomplete = false /** Whether the autocomplete input is disabled or not */;
        this.initLabels = []; /** Initial labels to be displayed in the labelsAutocomplete input*/
        this.labelsItems = []; /** List of assigned labels to selected record(s) */
    }
    ngOnChanges(changes) {
        if (changes.public) {
            this.labelsItems = [];
        }
        if (changes.initLabels) {
            this.labelsItems = this.initLabels.map((label) => {
                return {
                    display: label,
                    category: "",
                };
            });
        }
    }
    removeItem(item) {
        this.labelsItems.splice(this.labelsItems.indexOf(item), 1);
        this.labelsItems = [
            ...this.labelsItems,
        ]; /** Need to programmatically update this.labelsItems object in order to fire ngOnChanges hook in sqAutocompleteLabels */
        this.labelsUpdate.next(this.labelsItems.map((item) => item.display));
    }
    onLabelsItemsChanged(labelsItems) {
        this.labelsItems = labelsItems; /** Need to Programmatically update this.labelsItems to catch updates happening in the sqAutocompleteLabels  */
        this.labelsUpdate.next(labelsItems.map((item) => item.display));
    }
    getDropdownItem() {
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
    keydown(event) {
        // Intercept tab and set focus to surrounding dropdown-item
        if (event.keyCode === Keys.tab) {
            const dropdownItem = this.getDropdownItem();
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
}
BsLabelsAutocompleteComponent.ɵfac = function BsLabelsAutocompleteComponent_Factory(t) { return new (t || BsLabelsAutocompleteComponent)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
BsLabelsAutocompleteComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsLabelsAutocompleteComponent, selectors: [["sq-labels-autocomplete"]], inputs: { public: "public", disableAutocomplete: "disableAutocomplete", allowNewLabels: "allowNewLabels", allowManagePublicLabels: "allowManagePublicLabels", initLabels: "initLabels" }, outputs: { labelsUpdate: "labelsUpdate" }, features: [i0.ɵɵNgOnChangesFeature], decls: 10, vars: 13, consts: [["name", "labelsForm", 1, "d-inline"], [1, "sq-dropdown-form"], [1, "form-control"], ["class", "badge badge-pill badge-info align-self-center", 3, "ngClass", 4, "ngFor", "ngForOf"], ["type", "text", "name", "labelName", "spellcheck", "false", "autocomplete", "off", "sqAutocompleteLabels", "", 1, "input-autocomplete", "flex-grow-1", 3, "public", "placeholder", "dropdown", "allowNewLabels", "allowManagePublicLabels", "disabled", "off", "labelsItems", "keydown", "keypress", "itemsUpdate"], ["dropdown", ""], ["itemTpl", ""], [1, "badge", "badge-pill", "badge-info", "align-self-center", 3, "ngClass"], [1, "fas", "fa-times-circle", "clickable", 3, "click"], [1, "autocomplete-item", "p-2"]], template: function BsLabelsAutocompleteComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "section", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵtemplate(3, BsLabelsAutocompleteComponent_span_3_Template, 3, 5, "span", 3);
        i0.ɵɵelementStart(4, "input", 4);
        i0.ɵɵlistener("keydown", function BsLabelsAutocompleteComponent_Template_input_keydown_4_listener($event) { return ctx.keydown($event); })("keypress", function BsLabelsAutocompleteComponent_Template_input_keypress_4_listener($event) { return ctx.keypress($event); })("itemsUpdate", function BsLabelsAutocompleteComponent_Template_input_itemsUpdate_4_listener($event) { return ctx.onLabelsItemsChanged($event); });
        i0.ɵɵpipe(5, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "sq-autocomplete-list", null, 5);
        i0.ɵɵtemplate(8, BsLabelsAutocompleteComponent_ng_template_8_Template, 2, 1, "ng-template", null, 6, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r1 = i0.ɵɵreference(7);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.labelsItems);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("disabled", ctx.disableAutocomplete);
        i0.ɵɵproperty("public", ctx.public)("placeholder", i0.ɵɵpipeBind1(5, 11, "msg#labels.selectLabel"))("dropdown", _r1)("allowNewLabels", ctx.allowNewLabels)("allowManagePublicLabels", ctx.allowManagePublicLabels)("disabled", ctx.disableAutocomplete)("off", ctx.disableAutocomplete)("labelsItems", ctx.labelsItems);
    } }, directives: [i1.ɵangular_packages_forms_forms_y, i1.NgControlStatusGroup, i1.NgForm, i2.NgForOf, i3.LabelsAutocomplete, i4.BsAutocompleteList, i2.NgClass], pipes: [i5.MessagePipe], styles: [".sq-dropdown-form[_ngcontent-%COMP%] {\n                min-width: 13rem;\n                display: inline;\n            }\n            .disabled[_ngcontent-%COMP%] {\n                cursor: not-allowed;\n            }\n            [_nghost-%COMP%]     .sq-autocomplete-list {\n                width: 50% !important;\n            }\n            .clickable[_ngcontent-%COMP%] {\n                cursor: pointer;\n            }\n            .clickable[_ngcontent-%COMP%]:hover {\n                opacity: 85%;\n            }\n            .label-public[_ngcontent-%COMP%] {\n                background-color: #4fc3f7;\n                margin: 2px;\n            }\n            .label-private[_ngcontent-%COMP%] {\n                background-color: #7283a7;\n                margin: 2px;\n            }\n\n            [_nghost-%COMP%]   div[_ngcontent-%COMP%] {\n                width: 100%;\n                display: flex;\n                flex-wrap: wrap;\n                align-items: center;\n                height: unset !important;\n            }\n            [_nghost-%COMP%]   input[_ngcontent-%COMP%] {\n                border: none;\n                flex-grow: 1;\n                flex-basis: 100px;\n                min-width: 100px;\n            }\n            [_nghost-%COMP%]   input[_ngcontent-%COMP%]:focus {\n                outline: none;\n            }"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsLabelsAutocompleteComponent, [{
        type: Component,
        args: [{
                selector: "sq-labels-autocomplete",
                templateUrl: "./labels-autocomplete.component.html",
                styles: [
                    `
            .sq-dropdown-form {
                min-width: 13rem;
                display: inline;
            }
            .disabled {
                cursor: not-allowed;
            }
            :host ::ng-deep .sq-autocomplete-list {
                width: 50% !important;
            }
            .clickable {
                cursor: pointer;
            }
            .clickable:hover {
                opacity: 85%;
            }
            .label-public {
                background-color: #4fc3f7;
                margin: 2px;
            }
            .label-private {
                background-color: #7283a7;
                margin: 2px;
            }

            :host div {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                height: unset !important;
            }
            :host input {
                border: none;
                flex-grow: 1;
                flex-basis: 100px;
                min-width: 100px;
            }
            :host input:focus {
                outline: none;
            }
        `,
                ],
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { labelsUpdate: [{
            type: Output
        }], public: [{
            type: Input
        }], disableAutocomplete: [{
            type: Input
        }], allowNewLabels: [{
            type: Input
        }], allowManagePublicLabels: [{
            type: Input
        }], initLabels: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWxzLWF1dG9jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9sYWJlbHMvIiwic291cmNlcyI6WyJib290c3RyYXAvbGFiZWxzLWF1dG9jb21wbGV0ZS9sYWJlbHMtYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyIsImJvb3RzdHJhcC9sYWJlbHMtYXV0b2NvbXBsZXRlL2xhYmVscy1hdXRvY29tcGxldGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFFVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssR0FHUixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7Ozs7SUNOOUIsK0JBSUk7SUFBQSxZQUNBO0lBQUEsK0JBQXVFO0lBQTNCLHNPQUEwQjtJQUFDLGlCQUFPO0lBQ2xGLGlCQUFPOzs7O0lBSEgsbUZBQThEO0lBQzlELGVBQ0E7SUFEQSxnREFDQTs7O0lBdUJBLDhCQUFtQztJQUFBLFlBQ25DO0lBQUEsaUJBQU07OztJQUQ2QixlQUNuQztJQURtQywrQ0FDbkM7O0FEcEJoQjs7Ozs7O0dBTUc7QUFtREgsTUFBTSxPQUFPLDZCQUE2QjtJQVl0QyxZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBWDFDLCtGQUErRjtRQUNyRixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFZLENBQUM7UUFHN0Msd0JBQW1CLEdBQVksS0FBSyxDQUFDLHdEQUF3RCxDQUFDO1FBRzlGLGVBQVUsR0FBYSxFQUFFLENBQUMsQ0FBQyxvRUFBb0U7UUFFeEcsZ0JBQVcsR0FBdUIsRUFBRSxDQUFDLENBQUMsb0RBQW9EO0lBRTdDLENBQUM7SUFFOUMsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNoQixJQUFJLENB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Z0NBQUE7O2tERHFEcEIsNkJBQTZCO2NBakR6QyxTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsV0FBVyxFQUFFLHNDQUFzQztnQkFDbkQsTUFBTSxFQUFFO29CQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0EwQ0M7aUJBQ0o7YUFDSjs2REFHYSxZQUFZO2tCQUFyQixNQUFNO1lBRUUsTUFBTTtrQkFBZCxLQUFLO1lBQ0csbUJBQW1CO2tCQUEzQixLQUFLO1lBQ0csY0FBYztrQkFBdEIsS0FBSztZQUNHLHVCQUF1QjtrQkFBL0IsS0FBSztZQUNHLFVBQVU7a0JBQWxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBPdXRwdXQsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBLZXlzIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHsgQXV0b2NvbXBsZXRlSXRlbSB9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2F1dG9jb21wbGV0ZVwiO1xuXG4vKipcbiAqIENvbXBvbmVudCBjb250YWluaW5nIGEgZm9ybSBhbmQgYXV0b2NvbXBsZXRlIHRvIHNlYXJjaFxuICogdGhyb3VnaCB0aGUgbGlzdCBsYWJlbHMgYWNjb3JkaW5nIHRvIGEgc3BlY2lmaWMgdHlwZSAocHVibGljL3ByaXZhdGUpIGFuZCBzZWxlY3Qgb25lKHMpIG9mIHRoZW1cbiAqXG4gKiBUaGUgY29tcG9uZW50IGNhbiBiZSB1c2VkIGFzIGN1c3RvbSBjb21wb25lbnQgaW4gdGhlIEFjdGlvblxuICogbWVudSdzIG1vZGFscy5cbiAqL1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1sYWJlbHMtYXV0b2NvbXBsZXRlXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9sYWJlbHMtYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGBcbiAgICAgICAgICAgIC5zcS1kcm9wZG93bi1mb3JtIHtcbiAgICAgICAgICAgICAgICBtaW4td2lkdGg6IDEzcmVtO1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5kaXNhYmxlZCB7XG4gICAgICAgICAgICAgICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDpob3N0IDo6bmctZGVlcCAuc3EtYXV0b2NvbXBsZXRlLWxpc3Qge1xuICAgICAgICAgICAgICAgIHdpZHRoOiA1MCUgIWltcG9ydGFudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5jbGlja2FibGUge1xuICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5jbGlja2FibGU6aG92ZXIge1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDg1JTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5sYWJlbC1wdWJsaWMge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM0ZmMzZjc7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAycHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubGFiZWwtcHJpdmF0ZSB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzcyODNhNztcbiAgICAgICAgICAgICAgICBtYXJnaW46IDJweDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgOmhvc3QgZGl2IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgICAgIGhlaWdodDogdW5zZXQgIWltcG9ydGFudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDpob3N0IGlucHV0IHtcbiAgICAgICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICAgICAgICAgIGZsZXgtYmFzaXM6IDEwMHB4O1xuICAgICAgICAgICAgICAgIG1pbi13aWR0aDogMTAwcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6aG9zdCBpbnB1dDpmb2N1cyB7XG4gICAgICAgICAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYCxcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBCc0xhYmVsc0F1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gICAgLyoqIEV2ZW50IHN5bmNocm9uaXppbmcgdGhlIGxpc3Qgb2Ygc2VsZWN0ZWQgbGFiZWxzIGFuZCBsYWJlbCdzIHR5cGUgaW4gdGhlIHBhcmVudCBjb21wb25lbnQgKi9cbiAgICBAT3V0cHV0KCkgbGFiZWxzVXBkYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmdbXT4oKTtcblxuICAgIEBJbnB1dCgpIHB1YmxpYzogYm9vbGVhbjsgLyoqIFdoZXRoZXIgbGFiZWxzIGFyZSBwdWJsaWMvcHJpdmF0ZSAqL1xuICAgIEBJbnB1dCgpIGRpc2FibGVBdXRvY29tcGxldGU6IGJvb2xlYW4gPSBmYWxzZSAvKiogV2hldGhlciB0aGUgYXV0b2NvbXBsZXRlIGlucHV0IGlzIGRpc2FibGVkIG9yIG5vdCAqLztcbiAgICBASW5wdXQoKSBhbGxvd05ld0xhYmVsczogYm9vbGVhbjsgLyoqIFdoZXRoZXIgZW5hYmxlIGFkZGluZyBuZXcgbGFiZWxzIG9yIG5vdCAqL1xuICAgIEBJbnB1dCgpIGFsbG93TWFuYWdlUHVibGljTGFiZWxzOiBib29sZWFuOyAvKiogRGVmaW5lIHRoZSByaWdodCBvZiBhZGRpbmcgbmV3IGxhYmVscyAqL1xuICAgIEBJbnB1dCgpIGluaXRMYWJlbHM6IHN0cmluZ1tdID0gW107IC8qKiBJbml0aWFsIGxhYmVscyB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIGxhYmVsc0F1dG9jb21wbGV0ZSBpbnB1dCovXG5cbiAgICBsYWJlbHNJdGVtczogQXV0b2NvbXBsZXRlSXRlbVtdID0gW107IC8qKiBMaXN0IG9mIGFzc2lnbmVkIGxhYmVscyB0byBzZWxlY3RlZCByZWNvcmQocykgKi9cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMucHVibGljKSB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsc0l0ZW1zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXMuaW5pdExhYmVscykge1xuICAgICAgICAgICAgdGhpcy5sYWJlbHNJdGVtcyA9IHRoaXMuaW5pdExhYmVscy5tYXAoKGxhYmVsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogbGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBcIlwiLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUl0ZW0oaXRlbTogQXV0b2NvbXBsZXRlSXRlbSkge1xuICAgICAgICB0aGlzLmxhYmVsc0l0ZW1zLnNwbGljZSh0aGlzLmxhYmVsc0l0ZW1zLmluZGV4T2YoaXRlbSksIDEpO1xuICAgICAgICB0aGlzLmxhYmVsc0l0ZW1zID0gW1xuICAgICAgICAgICAgLi4udGhpcy5sYWJlbHNJdGVtcyxcbiAgICAgICAgXTsgLyoqIE5lZWQgdG8gcHJvZ3JhbW1hdGljYWxseSB1cGRhdGUgdGhpcy5sYWJlbHNJdGVtcyBvYmplY3QgaW4gb3JkZXIgdG8gZmlyZSBuZ09uQ2hhbmdlcyBob29rIGluIHNxQXV0b2NvbXBsZXRlTGFiZWxzICovXG4gICAgICAgIHRoaXMubGFiZWxzVXBkYXRlLm5leHQodGhpcy5sYWJlbHNJdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0uZGlzcGxheSkpO1xuICAgIH1cblxuICAgIG9uTGFiZWxzSXRlbXNDaGFuZ2VkKGxhYmVsc0l0ZW1zOiBBdXRvY29tcGxldGVJdGVtW10pIHtcbiAgICAgICAgdGhpcy5sYWJlbHNJdGVtcyA9IGxhYmVsc0l0ZW1zOyAvKiogTmVlZCB0byBQcm9ncmFtbWF0aWNhbGx5IHVwZGF0ZSB0aGlzLmxhYmVsc0l0ZW1zIHRvIGNhdGNoIHVwZGF0ZXMgaGFwcGVuaW5nIGluIHRoZSBzcUF1dG9jb21wbGV0ZUxhYmVscyAgKi9cbiAgICAgICAgdGhpcy5sYWJlbHNVcGRhdGUubmV4dChsYWJlbHNJdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0uZGlzcGxheSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RHJvcGRvd25JdGVtKCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRSZWYpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLmVsZW1lbnRSZWZcbiAgICAgICAgICAgICAgICAubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgIHdoaWxlIChjdXJyZW50ICYmICFjdXJyZW50LmNsYXNzTGlzdC5jb250YWlucyhcImRyb3Bkb3duLWl0ZW1cIikpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvLyBJbnRlcmNlcHQgdGFiIGFuZCBzZXQgZm9jdXMgdG8gc3Vycm91bmRpbmcgZHJvcGRvd24taXRlbVxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS2V5cy50YWIpIHtcbiAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duSXRlbSA9IHRoaXMuZ2V0RHJvcGRvd25JdGVtKCk7XG4gICAgICAgICAgICBpZiAoZHJvcGRvd25JdGVtKSB7XG4gICAgICAgICAgICAgICAgZHJvcGRvd25JdGVtLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBrZXlwcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS2V5cy5lbnRlcikge1xuICAgICAgICAgICAgLy8gU3RvcCBjbGljayBldmVudCBmaXJpbmcgb24gc3Vycm91bmRpbmcgYW5jaG9yIChGaXJlZm94KVxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cbiIsIjxmb3JtIG5hbWU9XCJsYWJlbHNGb3JtXCIgY2xhc3M9XCJkLWlubGluZVwiPlxuICAgIDxzZWN0aW9uIGNsYXNzPVwic3EtZHJvcGRvd24tZm9ybVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGxhYmVsc0l0ZW1zXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtaW5mbyBhbGlnbi1zZWxmLWNlbnRlclwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydsYWJlbC1wdWJsaWMnOiBwdWJsaWMsICdsYWJlbC1wcml2YXRlJzogIXB1YmxpY31cIj5cbiAgICAgICAgICAgICAgICB7eyBpdGVtLmRpc3BsYXkgfX1cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhcyBmYS10aW1lcy1jaXJjbGUgY2xpY2thYmxlXCIgKGNsaWNrKT1cInJlbW92ZUl0ZW0oaXRlbSlcIj48L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiaW5wdXQtYXV0b2NvbXBsZXRlIGZsZXgtZ3Jvdy0xXCJcbiAgICAgICAgICAgICAgICBuYW1lPVwibGFiZWxOYW1lXCJcbiAgICAgICAgICAgICAgICBzcGVsbGNoZWNrPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgICAgICAgICAgICAgc3FBdXRvY29tcGxldGVMYWJlbHNcbiAgICAgICAgICAgICAgICBbcHVibGljXT1cInB1YmxpY1wiXG4gICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cIidtc2cjbGFiZWxzLnNlbGVjdExhYmVsJyB8IHNxTWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgW2Ryb3Bkb3duXT1cImRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICBbYWxsb3dOZXdMYWJlbHNdPVwiYWxsb3dOZXdMYWJlbHNcIlxuICAgICAgICAgICAgICAgIFthbGxvd01hbmFnZVB1YmxpY0xhYmVsc109XCJhbGxvd01hbmFnZVB1YmxpY0xhYmVsc1wiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwia2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoa2V5cHJlc3MpPVwia2V5cHJlc3MoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGl0ZW1zVXBkYXRlKT1cIm9uTGFiZWxzSXRlbXNDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlQXV0b2NvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICBbb2ZmXT1cImRpc2FibGVBdXRvY29tcGxldGVcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlQXV0b2NvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICBbbGFiZWxzSXRlbXNdPVwibGFiZWxzSXRlbXNcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxzcS1hdXRvY29tcGxldGUtbGlzdCAjZHJvcGRvd24+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2l0ZW1UcGwgbGV0LWl0ZW0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF1dG9jb21wbGV0ZS1pdGVtIHAtMlwiPnt7aXRlbS5kaXNwbGF5fX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvc3EtYXV0b2NvbXBsZXRlLWxpc3Q+XG4gICAgPC9zZWN0aW9uPlxuPC9mb3JtPlxuXG5cbiJdfQ==