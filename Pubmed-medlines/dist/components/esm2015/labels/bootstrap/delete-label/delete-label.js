import { Component, Inject } from "@angular/core";
import { ModalButton, MODAL_MODEL, } from "@sinequa/core/modal";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "../../labels.service";
import * as i2 from "@sinequa/core/modal";
import * as i3 from "@angular/forms";
import * as i4 from "@sinequa/components/modal";
import * as i5 from "@angular/common";
import * as i6 from "../labels-autocomplete/labels-autocomplete.component";
import * as i7 from "@sinequa/core/intl";
const _c0 = function (a0, a1) { return { "disabled": a0, "clickable": a1 }; };
function BsDeleteLabel_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵelementStart(1, "input", 8);
    i0.ɵɵlistener("click", function BsDeleteLabel_div_7_Template_input_click_1_listener() { i0.ɵɵrestoreView(_r3); const item_r1 = ctx.$implicit; const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.updateLabelsNature(item_r1.value); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 9);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("id", item_r1.id);
    i0.ɵɵpropertyInterpolate("value", item_r1.value);
    i0.ɵɵproperty("checked", item_r1.checked)("disabled", item_r1.disabled)("ngClass", i0.ɵɵpureFunction2(9, _c0, item_r1.disabled, !item_r1.disabled));
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("for", item_r1.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 7, item_r1.name));
} }
const _c1 = function (a0, a1) { return { "alert-danger": a0, "alert-warning": a1 }; };
export class BsDeleteLabel {
    constructor(model, labelsService, changeDetectorRef, modalRef) {
        this.model = model;
        this.labelsService = labelsService;
        this.changeDetectorRef = changeDetectorRef;
        this.modalRef = modalRef;
        this.isProcessing = false;
    }
    ngOnInit() {
        switch (this.model.properties.action) {
            case 3 /* delete */:
                this.title = "msg#deleteLabel.title";
                this.btnText = "msg#deleteLabel.btnDelete";
                this.alert = "msg#deleteLabel.alertText";
                this._action = () => {
                    const observable = this.labelsService.deleteLabels(this.model.values, this.model.properties.public);
                    if (observable) {
                        this.isProcessing = true;
                        this.changeDetectorRef.markForCheck();
                        Utils.subscribe(observable, () => { }, (error) => {
                            this.modalRef.close(error);
                        }, () => {
                            this.isProcessing = false;
                            this.modalRef.close(-1 /* OK */);
                        });
                    }
                };
                break;
            case 5 /* bulkRemove */:
                this.title = "msg#bulkRemoveLabel.title";
                this.btnText = "msg#bulkRemoveLabel.btnBulkRemove";
                this.alert = "msg#bulkRemoveLabel.alertText";
                this._action = () => {
                    const observable = this.labelsService.bulkRemoveLabels(this.model.values, this.model.properties.public);
                    if (observable) {
                        this.isProcessing = true;
                        this.changeDetectorRef.markForCheck();
                        Utils.subscribe(observable, () => { }, (error) => {
                            this.modalRef.close(error);
                        }, () => {
                            this.isProcessing = false;
                            this.modalRef.close(-1 /* OK */);
                        });
                    }
                };
                break;
            default:
                this.title = "";
                this.btnText = "";
                this.alert = "";
                break;
        }
        this.buttons = [
            new ModalButton({
                text: this.btnText,
                primary: true,
                result: 0 /* Custom */,
                anchor: true,
                action: this._action,
            }),
            new ModalButton({
                result: -2 /* Cancel */,
            }),
        ];
    }
    updateLabelsNature(nature) {
        this.model.properties.public = nature;
    }
    onLabelsChanged(values) {
        this.model.values = values;
    }
}
BsDeleteLabel.ɵfac = function BsDeleteLabel_Factory(t) { return new (t || BsDeleteLabel)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(i1.LabelsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.ModalRef)); };
BsDeleteLabel.ɵcmp = i0.ɵɵdefineComponent({ type: BsDeleteLabel, selectors: [["sq-delete-label"]], decls: 13, vars: 18, consts: [["name", "deleteLabel", "novalidate", ""], [3, "title", "buttons", "isProcessingState"], [1, "form-group", "sq-form-group"], ["role", "alert", 1, "alert", 3, "ngClass"], ["class", "custom-control custom-radio custom-control-inline", 4, "ngFor", "ngForOf"], ["for", "label"], [3, "public", "disableAutocomplete", "allowNewLabels", "allowManagePublicLabels", "labelsUpdate"], [1, "custom-control", "custom-radio", "custom-control-inline"], ["type", "radio", "name", "nature", 1, "custom-control-input", 3, "id", "value", "checked", "disabled", "ngClass", "click"], [1, "custom-control-label", 3, "for"]], template: function BsDeleteLabel_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "sq-modal", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵtext(4);
        i0.ɵɵpipe(5, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "section");
        i0.ɵɵtemplate(7, BsDeleteLabel_div_7_Template, 5, 12, "div", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "b");
        i0.ɵɵelementStart(9, "label", 5);
        i0.ɵɵtext(10);
        i0.ɵɵpipe(11, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(12, "sq-labels-autocomplete", 6);
        i0.ɵɵlistener("labelsUpdate", function BsDeleteLabel_Template_sq_labels_autocomplete_labelsUpdate_12_listener($event) { return ctx.onLabelsChanged($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("title", ctx.title)("buttons", ctx.buttons)("isProcessingState", ctx.isProcessing);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(15, _c1, ctx.model.properties.action === 3, ctx.model.properties.action === 5));
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 11, ctx.alert), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.model.properties.radioButtons);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 13, "msg#labels.labels"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("public", ctx.model.properties.public)("disableAutocomplete", ctx.model.properties.disableAutocomplete)("allowNewLabels", ctx.model.properties.allowNewLabels)("allowManagePublicLabels", ctx.model.properties.allowManagePublicLabels);
    } }, directives: [i3.ɵangular_packages_forms_forms_y, i3.NgControlStatusGroup, i3.NgForm, i4.BsModal, i5.NgClass, i5.NgForOf, i6.BsLabelsAutocompleteComponent], pipes: [i7.MessagePipe], styles: [".clickable[_ngcontent-%COMP%] {\n                cursor: pointer;\n            }\n            .clickable[_ngcontent-%COMP%]:hover {\n                opacity: 85%;\n            }"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsDeleteLabel, [{
        type: Component,
        args: [{
                selector: "sq-delete-label",
                templateUrl: "./delete-label.html",
                styles: [
                    `
            .clickable {
                cursor: pointer;
            }
            .clickable:hover {
                opacity: 85%;
            }
        `,
                ],
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: i1.LabelsService }, { type: i0.ChangeDetectorRef }, { type: i2.ModalRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWxhYmVsLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvbGFiZWxzLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2RlbGV0ZS1sYWJlbC9kZWxldGUtbGFiZWwudHMiLCJib290c3RyYXAvZGVsZXRlLWxhYmVsL2RlbGV0ZS1sYWJlbC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQ0gsV0FBVyxFQUVYLFdBQVcsR0FFZCxNQUFNLHFCQUFxQixDQUFDO0FBTTdCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7Ozs7O0lDTDNCLDhCQUNJO0lBQUEsZ0NBRUE7SUFEd0Qsb09BQXdDO0lBRGhHLGlCQUVBO0lBQUEsZ0NBQXNEO0lBQUEsWUFBMkI7O0lBQUEsaUJBQVE7SUFDN0YsaUJBQU07OztJQUgrQyxlQUFnQjtJQUFoQiwwQ0FBZ0I7SUFBZSxnREFBc0I7SUFDbEcseUNBQXdCLDhCQUFBLDRFQUFBO0lBQ1EsZUFBaUI7SUFBakIsMkNBQWlCO0lBQUMsZUFBMkI7SUFBM0Isd0RBQTJCOzs7QURrQnJHLE1BQU0sT0FBTyxhQUFhO0lBU3RCLFlBRVcsS0FHTixFQUNPLGFBQTRCLEVBQzVCLGlCQUFvQyxFQUNwQyxRQUFrQjtRQU5uQixVQUFLLEdBQUwsS0FBSyxDQUdYO1FBQ08sa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBWnZCLGlCQUFZLEdBQVksS0FBSyxDQUFDO0lBYWxDLENBQUM7SUFFSixRQUFRO1FBQ0osUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDbEM7Z0JBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyx1QkFBdUIs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SUFFRCxlQUFlLENBQUMsTUFBZ0I7UUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQy9CLENBQUM7OzBFQXJHUSxhQUFhLHVCQVVWLFdBQVc7a0RBVmQsYUFBYTtRQzVCMUIsK0JBQ0k7UUFBQSxtQ0FDSTtRQUFBLDhCQUNJO1FBQUEsOEJBQ0k7UUFBQSxZQUNKOztRQUFBLGlCQUFNO1FBQ04sK0JBQ0k7UUFBQSwrREFJTTtRQUNWLGlCQUFVO1FBQ1YseUJBQUc7UUFBQSxnQ0FBbUI7UUFBQSxhQUFtQzs7UUFBQSxpQkFBUTtRQUFBLGlCQUFJO1FBQ3JFLGtEQU1BO1FBTEksK0hBQWdCLDJCQUF1QixJQUFDO1FBSzVDLGlCQUF5QjtRQUM3QixpQkFBTTtRQUNWLGlCQUFXO1FBQ2YsaUJBQU87O1FBdEJPLGVBQWU7UUFBZixpQ0FBZSx3QkFBQSx1Q0FBQTtRQUVFLGVBQTJHO1FBQTNHLDJIQUEyRztRQUMxSCxlQUNKO1FBREksaUVBQ0o7UUFFMEIsZUFBZ0M7UUFBaEMsMkRBQWdDO1FBTXBDLGVBQW1DO1FBQW5DLGlFQUFtQztRQUdyRCxlQUFrQztRQUFsQyxvREFBa0MsaUVBQUEsdURBQUEseUVBQUE7O2tERFlyQyxhQUFhO2NBZHpCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixXQUFXLEVBQUUscUJBQXFCO2dCQUNsQyxNQUFNLEVBQUU7b0JBQ0o7Ozs7Ozs7U0FPQztpQkFDSjthQUNKOztzQkFXUSxNQUFNO3VCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICAgIE1vZGFsQnV0dG9uLFxuICAgIE1vZGFsUmVzdWx0LFxuICAgIE1PREFMX01PREVMLFxuICAgIE1vZGFsUmVmLFxufSBmcm9tIFwiQHNpbmVxdWEvY29yZS9tb2RhbFwiO1xuaW1wb3J0IHtcbiAgICBVcGRhdGVMYWJlbHNBY3Rpb24sXG4gICAgTW9kYWxQcm9wZXJ0aWVzLFxuICAgIExhYmVsc1NlcnZpY2UsXG59IGZyb20gXCIuLi8uLi9sYWJlbHMuc2VydmljZVwiO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLWRlbGV0ZS1sYWJlbFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vZGVsZXRlLWxhYmVsLmh0bWxcIixcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYFxuICAgICAgICAgICAgLmNsaWNrYWJsZSB7XG4gICAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmNsaWNrYWJsZTpob3ZlciB7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogODUlO1xuICAgICAgICAgICAgfVxuICAgICAgICBgLFxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIEJzRGVsZXRlTGFiZWwgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyBidXR0b25zOiBNb2RhbEJ1dHRvbltdO1xuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIHB1YmxpYyBhbGVydDogc3RyaW5nO1xuICAgIHB1YmxpYyBidG5UZXh0OiBzdHJpbmc7XG4gICAgcHVibGljIGlzUHJvY2Vzc2luZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfYWN0aW9uOiAoKSA9PiB2b2lkO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoTU9EQUxfTU9ERUwpXG4gICAgICAgIHB1YmxpYyBtb2RlbDoge1xuICAgICAgICAgICAgdmFsdWVzOiBzdHJpbmdbXSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IE1vZGFsUHJvcGVydGllc1xuICAgICAgICB9LFxuICAgICAgICBwcml2YXRlIGxhYmVsc1NlcnZpY2U6IExhYmVsc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIG1vZGFsUmVmOiBNb2RhbFJlZlxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMubW9kZWwucHJvcGVydGllcy5hY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgVXBkYXRlTGFiZWxzQWN0aW9uLmRlbGV0ZTpcbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJtc2cjZGVsZXRlTGFiZWwudGl0bGVcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blRleHQgPSBcIm1zZyNkZWxldGVMYWJlbC5idG5EZWxldGVcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0ID0gXCJtc2cjZGVsZXRlTGFiZWwuYWxlcnRUZXh0XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aW9uID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5sYWJlbHNTZXJ2aWNlLmRlbGV0ZUxhYmVscyhcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudmFsdWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5wcm9wZXJ0aWVzLnB1YmxpY1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JzZXJ2YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1Byb2Nlc3NpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGFsUmVmLmNsb3NlKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RhbFJlZi5jbG9zZShNb2RhbFJlc3VsdC5PSyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFVwZGF0ZUxhYmVsc0FjdGlvbi5idWxrUmVtb3ZlOlxuICAgICAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcIm1zZyNidWxrUmVtb3ZlTGFiZWwudGl0bGVcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blRleHQgPSBcIm1zZyNidWxrUmVtb3ZlTGFiZWwuYnRuQnVsa1JlbW92ZVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnQgPSBcIm1zZyNidWxrUmVtb3ZlTGFiZWwuYWxlcnRUZXh0XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aW9uID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5sYWJlbHNTZXJ2aWNlLmJ1bGtSZW1vdmVMYWJlbHMoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnZhbHVlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwucHJvcGVydGllcy5wdWJsaWNcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9ic2VydmFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNQcm9jZXNzaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RhbFJlZi5jbG9zZShlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNQcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWxSZWYuY2xvc2UoTW9kYWxSZXN1bHQuT0spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blRleHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5idXR0b25zID0gW1xuICAgICAgICAgICAgbmV3IE1vZGFsQnV0dG9uKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLmJ0blRleHQsXG4gICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZSxcbiAgICAgICAgICAgICAgICByZXN1bHQ6IE1vZGFsUmVzdWx0LkN1c3RvbSxcbiAgICAgICAgICAgICAgICBhbmNob3I6IHRydWUsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLl9hY3Rpb24sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBNb2RhbEJ1dHRvbih7XG4gICAgICAgICAgICAgICAgcmVzdWx0OiBNb2RhbFJlc3VsdC5DYW5jZWwsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICB1cGRhdGVMYWJlbHNOYXR1cmUobmF0dXJlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMubW9kZWwucHJvcGVydGllcy5wdWJsaWMgPSBuYXR1cmU7XG4gICAgfVxuXG4gICAgb25MYWJlbHNDaGFuZ2VkKHZhbHVlczogc3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5tb2RlbC52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgfVxufVxuIiwiPGZvcm0gbmFtZT1cImRlbGV0ZUxhYmVsXCIgbm92YWxpZGF0ZT5cbiAgICA8c3EtbW9kYWwgW3RpdGxlXT1cInRpdGxlXCIgW2J1dHRvbnNdPVwiYnV0dG9uc1wiIFtpc1Byb2Nlc3NpbmdTdGF0ZV09XCJpc1Byb2Nlc3NpbmdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgc3EtZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFsZXJ0XCIgW25nQ2xhc3NdPVwieydhbGVydC1kYW5nZXInOiBtb2RlbC5wcm9wZXJ0aWVzLmFjdGlvbiA9PT0gMywgJ2FsZXJ0LXdhcm5pbmcnOiBtb2RlbC5wcm9wZXJ0aWVzLmFjdGlvbiA9PT0gNX1cIiByb2xlPVwiYWxlcnRcIj5cbiAgICAgICAgICAgICAgICB7e2FsZXJ0IHwgc3FNZXNzYWdlfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBtb2RlbC5wcm9wZXJ0aWVzLnJhZGlvQnV0dG9uc1wiIGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wgY3VzdG9tLXJhZGlvIGN1c3RvbS1jb250cm9sLWlubGluZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3M9XCJjdXN0b20tY29udHJvbC1pbnB1dFwiIGlkPVwie3tpdGVtLmlkfX1cIiBuYW1lPVwibmF0dXJlXCIgdmFsdWU9XCJ7e2l0ZW0udmFsdWV9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2hlY2tlZF09XCJpdGVtLmNoZWNrZWRcIiBbZGlzYWJsZWRdPVwiaXRlbS5kaXNhYmxlZFwiIChjbGljayk9XCJ1cGRhdGVMYWJlbHNOYXR1cmUoaXRlbS52YWx1ZSlcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogaXRlbS5kaXNhYmxlZCwgJ2NsaWNrYWJsZSc6ICFpdGVtLmRpc2FibGVkfVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJjdXN0b20tY29udHJvbC1sYWJlbFwiIGZvcj1cInt7aXRlbS5pZH19XCI+e3sgaXRlbS5uYW1lIHwgc3FNZXNzYWdlIH19PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIDxiPjxsYWJlbCBmb3I9XCJsYWJlbFwiPnt7J21zZyNsYWJlbHMubGFiZWxzJyB8IHNxTWVzc2FnZX19PC9sYWJlbD48L2I+XG4gICAgICAgICAgICA8c3EtbGFiZWxzLWF1dG9jb21wbGV0ZVxuICAgICAgICAgICAgICAgIChsYWJlbHNVcGRhdGUpPVwib25MYWJlbHNDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAgICAgICAgIFtwdWJsaWNdPVwibW9kZWwucHJvcGVydGllcy5wdWJsaWNcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlQXV0b2NvbXBsZXRlXT1cIm1vZGVsLnByb3BlcnRpZXMuZGlzYWJsZUF1dG9jb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgW2FsbG93TmV3TGFiZWxzXT1cIm1vZGVsLnByb3BlcnRpZXMuYWxsb3dOZXdMYWJlbHNcIlxuICAgICAgICAgICAgICAgIFthbGxvd01hbmFnZVB1YmxpY0xhYmVsc109XCJtb2RlbC5wcm9wZXJ0aWVzLmFsbG93TWFuYWdlUHVibGljTGFiZWxzXCI+XG4gICAgICAgICAgICA8L3NxLWxhYmVscy1hdXRvY29tcGxldGU+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvc3EtbW9kYWw+XG48L2Zvcm0+XG4iXX0=