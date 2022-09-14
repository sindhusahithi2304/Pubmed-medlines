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
function BsAddLabel_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#bulkAddLabel.infoText"), " ");
} }
const _c0 = function (a0, a1) { return { "disabled": a0, "clickable": a1 }; };
function BsAddLabel_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵelementStart(1, "input", 10);
    i0.ɵɵlistener("click", function BsAddLabel_div_8_Template_input_click_1_listener() { i0.ɵɵrestoreView(_r4); const item_r2 = ctx.$implicit; const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.updateLabelsNature(item_r2.value); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 11);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("id", item_r2.id);
    i0.ɵɵpropertyInterpolate("value", item_r2.value);
    i0.ɵɵproperty("checked", item_r2.checked)("disabled", item_r2.disabled)("ngClass", i0.ɵɵpureFunction2(9, _c0, item_r2.disabled, !item_r2.disabled));
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("for", item_r2.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 7, item_r2.name));
} }
export class BsAddLabel {
    constructor(model, labelsService, changeDetectorRef, modalRef) {
        this.model = model;
        this.labelsService = labelsService;
        this.changeDetectorRef = changeDetectorRef;
        this.modalRef = modalRef;
        this.isProcessing = false;
    }
    ngOnInit() {
        this.buttons = [
            new ModalButton({
                text: "msg#bulkAddLabel.btnBulkAdd",
                primary: true,
                result: 0 /* Custom */,
                anchor: true,
                action: () => {
                    const observable = this.labelsService.bulkAddLabels(this.model.values, this.model.properties.public);
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
                },
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
BsAddLabel.ɵfac = function BsAddLabel_Factory(t) { return new (t || BsAddLabel)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(i1.LabelsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.ModalRef)); };
BsAddLabel.ɵcmp = i0.ɵɵdefineComponent({ type: BsAddLabel, selectors: [["sq-add-label"]], decls: 14, vars: 15, consts: [["name", "addLabel", "novalidate", ""], [3, "title", "buttons", "isProcessingState"], [1, "form-group", "sq-form-group"], ["role", "alert", 1, "alert", "alert-warning"], ["class", "alert alert-info", "role", "alert", 4, "ngIf"], ["class", "custom-control custom-radio custom-control-inline", 4, "ngFor", "ngForOf"], ["for", "label"], [3, "public", "disableAutocomplete", "allowNewLabels", "allowManagePublicLabels", "labelsUpdate"], ["role", "alert", 1, "alert", "alert-info"], [1, "custom-control", "custom-radio", "custom-control-inline"], ["type", "radio", "name", "nature", 1, "custom-control-input", 3, "id", "value", "checked", "disabled", "ngClass", "click"], [1, "custom-control-label", 3, "for"]], template: function BsAddLabel_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "sq-modal", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵtext(4);
        i0.ɵɵpipe(5, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(6, BsAddLabel_div_6_Template, 3, 3, "div", 4);
        i0.ɵɵelementStart(7, "section");
        i0.ɵɵtemplate(8, BsAddLabel_div_8_Template, 5, 12, "div", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "b");
        i0.ɵɵelementStart(10, "label", 6);
        i0.ɵɵtext(11);
        i0.ɵɵpipe(12, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "sq-labels-autocomplete", 7);
        i0.ɵɵlistener("labelsUpdate", function BsAddLabel_Template_sq_labels_autocomplete_labelsUpdate_13_listener($event) { return ctx.onLabelsChanged($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("title", "msg#bulkAddLabel.title")("buttons", ctx.buttons)("isProcessingState", ctx.isProcessing);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 11, "msg#bulkAddLabel.alertText"), " ");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.model.properties.allowManagePublicLabels || !ctx.model.properties.public);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.model.properties.radioButtons);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 13, "msg#labels.labels"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("public", ctx.model.properties.public)("disableAutocomplete", ctx.model.properties.disableAutocomplete)("allowNewLabels", ctx.model.properties.allowNewLabels)("allowManagePublicLabels", ctx.model.properties.allowManagePublicLabels);
    } }, directives: [i3.ɵangular_packages_forms_forms_y, i3.NgControlStatusGroup, i3.NgForm, i4.BsModal, i5.NgIf, i5.NgForOf, i6.BsLabelsAutocompleteComponent, i5.NgClass], pipes: [i7.MessagePipe], styles: [".clickable[_ngcontent-%COMP%] {\n                cursor: pointer;\n            }\n            .clickable[_ngcontent-%COMP%]:hover {\n                opacity: 85%;\n            }"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsAddLabel, [{
        type: Component,
        args: [{
                selector: "sq-add-label",
                templateUrl: "./add-label.html",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWxhYmVsLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvbGFiZWxzLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2FkZC1sYWJlbC9hZGQtbGFiZWwudHMiLCJib290c3RyYXAvYWRkLWxhYmVsL2FkZC1sYWJlbC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQ0gsV0FBVyxFQUVYLFdBQVcsR0FFZCxNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7OztJQ0YvQiw4QkFDSTtJQUFBLFlBQ0o7O0lBQUEsaUJBQU07O0lBREYsZUFDSjtJQURJLGtGQUNKOzs7OztJQUVJLDhCQUNJO0lBQUEsaUNBRUE7SUFEd0QsaU9BQXdDO0lBRGhHLGlCQUVBO0lBQUEsaUNBQXNEO0lBQUEsWUFBMkI7O0lBQUEsaUJBQVE7SUFDN0YsaUJBQU07OztJQUgrQyxlQUFnQjtJQUFoQiwwQ0FBZ0I7SUFBZSxnREFBc0I7SUFDbEcseUNBQXdCLDhCQUFBLDRFQUFBO0lBQ1EsZUFBaUI7SUFBakIsMkNBQWlCO0lBQUMsZUFBMkI7SUFBM0Isd0RBQTJCOztBRFdyRyxNQUFNLE9BQU8sVUFBVTtJQUluQixZQUVXLEtBR04sRUFDTyxhQUE0QixFQUM1QixpQkFBb0MsRUFDcEMsUUFBa0I7UUFObkIsVUFBSyxHQUFMLEtBQUssQ0FHWDtRQUNPLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQVZ2QixpQkFBWSxHQUFZLEtBQUssQ0FBQztJQVdsQyxDQUFDO0lBRUosUUFBUTtRQUNKLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxJQUFJLFdBQVcsQ0FBQztnQkFDWixJQUFJLEVBQUUsNkJBQTZCO2dCQUNuQyxPQUFPLEVBQUUsSUFBSTtnQkFDYixNQUFNLGdCQUFvQjtnQkFDMUIsTUFBTSxFQUFFLElBQUk7Z0JBQ1osTUFBTSxFQUFFLEdBQUcsRUFBRTtvQkFDVCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FDL0IsQ0FBQztvQkFDRixJQUFJLFVBQVUsRUFBRTt3QkFDWixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzt3QkFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUN0QyxLQUFLLENBQUMsU0FBUyxDQUNYLFVBQVUsRUFDVixHQUFHLEVBQUUsR0FBRSxDQUFDLEVBQ1IsQ0FBQyxLQUFLLEVBQUUsRUFBRTs0QkFDTixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDL0IsQ0FBQyxFQUNELEdBQUcsRUFBRTs0QkFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQzs0QkFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLGFBQWdCLENBQUM7d0JBQ3hDLENBQUMsQ0FDSixDQUFDO3FCQUNMO2dCQUNMLENBQUM7YUFDSixDQUFDO1lBQ0YsSUFBSSxXQUFXLENBQUM7Z0JBQ1osTUFBTSxpQkFBb0I7YUFDN0IsQ0FBQztTQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsa0JBQWtCLENBQUMsTUFBZTtRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQzFDLENBQUM7SUFFRCxlQUFlLENBQUMsTUFBZ0I7UUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQy9CLENBQUM7O29FQXhEUSxVQUFVLHVCQUtQLFdBQVc7K0NBTGQsVUFBVTtRQ3hCdkIsK0JBQ0k7UUFBQSxtQ0FDSTtRQUFBLDhCQUNJO1FBQUEsOEJBQ0k7UUFBQSxZQUNKOztRQUFBLGlCQUFNO1FBQ04sMkRBRU07UUFDTiwrQkFDSTtRQUFBLDREQUlNO1FBQ1YsaUJBQVU7UUFDVix5QkFBRztRQUFBLGlDQUFtQjtRQUFBLGFBQW1DOztRQUFBLGlCQUFRO1FBQUEsaUJBQUk7UUFDckUsa0RBTUE7UUFMSSw0SEFBZ0IsMkJBQXVCLElBQUM7UUFLNUMsaUJBQXlCO1FBQzdCLGlCQUFNO1FBQ1YsaUJBQVc7UUFDZixpQkFBTzs7UUF6Qk8sZUFBa0M7UUFBbEMsZ0RBQWtDLHdCQUFBLHVDQUFBO1FBR2hDLGVBQ0o7UUFESSxvRkFDSjtRQUNNLGVBQTBFO1FBQTFFLG1HQUEwRTtRQUl0RCxlQUFnQztRQUFoQywyREFBZ0M7UUFNcEMsZUFBbUM7UUFBbkMsaUVBQW1DO1FBR3JELGVBQWtDO1FBQWxDLG9EQUFrQyxpRUFBQSx1REFBQSx5RUFBQTs7a0RES3JDLFVBQVU7Y0FkdEIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixXQUFXLEVBQUUsa0JBQWtCO2dCQUMvQixNQUFNLEVBQUU7b0JBQ0o7Ozs7Ozs7U0FPQztpQkFDSjthQUNKOztzQkFNUSxNQUFNO3VCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICAgIE1vZGFsQnV0dG9uLFxuICAgIE1vZGFsUmVzdWx0LFxuICAgIE1PREFMX01PREVMLFxuICAgIE1vZGFsUmVmLFxufSBmcm9tIFwiQHNpbmVxdWEvY29yZS9tb2RhbFwiO1xuaW1wb3J0IHsgTW9kYWxQcm9wZXJ0aWVzLCBMYWJlbHNTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2xhYmVscy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtYWRkLWxhYmVsXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9hZGQtbGFiZWwuaHRtbFwiLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgXG4gICAgICAgICAgICAuY2xpY2thYmxlIHtcbiAgICAgICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuY2xpY2thYmxlOmhvdmVyIHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiA4NSU7XG4gICAgICAgICAgICB9XG4gICAgICAgIGAsXG4gICAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQnNBZGRMYWJlbCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHVibGljIGJ1dHRvbnM6IE1vZGFsQnV0dG9uW107XG4gICAgcHVibGljIGlzUHJvY2Vzc2luZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoTU9EQUxfTU9ERUwpXG4gICAgICAgIHB1YmxpYyBtb2RlbDoge1xuICAgICAgICAgICAgdmFsdWVzOiBzdHJpbmdbXSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IE1vZGFsUHJvcGVydGllc1xuICAgICAgICB9LFxuICAgICAgICBwcml2YXRlIGxhYmVsc1NlcnZpY2U6IExhYmVsc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIG1vZGFsUmVmOiBNb2RhbFJlZlxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBbXG4gICAgICAgICAgICBuZXcgTW9kYWxCdXR0b24oe1xuICAgICAgICAgICAgICAgIHRleHQ6IFwibXNnI2J1bGtBZGRMYWJlbC5idG5CdWxrQWRkXCIsXG4gICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZSxcbiAgICAgICAgICAgICAgICByZXN1bHQ6IE1vZGFsUmVzdWx0LkN1c3RvbSxcbiAgICAgICAgICAgICAgICBhbmNob3I6IHRydWUsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSB0aGlzLmxhYmVsc1NlcnZpY2UuYnVsa0FkZExhYmVscyhcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudmFsdWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5wcm9wZXJ0aWVzLnB1YmxpY1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JzZXJ2YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1Byb2Nlc3NpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGFsUmVmLmNsb3NlKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RhbFJlZi5jbG9zZShNb2RhbFJlc3VsdC5PSyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBNb2RhbEJ1dHRvbih7XG4gICAgICAgICAgICAgICAgcmVzdWx0OiBNb2RhbFJlc3VsdC5DYW5jZWwsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICB1cGRhdGVMYWJlbHNOYXR1cmUobmF0dXJlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMubW9kZWwucHJvcGVydGllcy5wdWJsaWMgPSBuYXR1cmU7XG4gICAgfVxuXG4gICAgb25MYWJlbHNDaGFuZ2VkKHZhbHVlczogc3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5tb2RlbC52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgfVxufVxuIiwiPGZvcm0gbmFtZT1cImFkZExhYmVsXCIgbm92YWxpZGF0ZT5cbiAgICA8c3EtbW9kYWwgW3RpdGxlXT1cIidtc2cjYnVsa0FkZExhYmVsLnRpdGxlJ1wiIFtidXR0b25zXT1cImJ1dHRvbnNcIiBbaXNQcm9jZXNzaW5nU3RhdGVdPVwiaXNQcm9jZXNzaW5nXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHNxLWZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC13YXJuaW5nXCIgcm9sZT1cImFsZXJ0XCI+XG4gICAgICAgICAgICAgICAge3snbXNnI2J1bGtBZGRMYWJlbC5hbGVydFRleHQnIHwgc3FNZXNzYWdlfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIm1vZGVsLnByb3BlcnRpZXMuYWxsb3dNYW5hZ2VQdWJsaWNMYWJlbHMgfHwgIW1vZGVsLnByb3BlcnRpZXMucHVibGljIFwiIGNsYXNzPVwiYWxlcnQgYWxlcnQtaW5mb1wiIHJvbGU9XCJhbGVydFwiPlxuICAgICAgICAgICAgICAgIHt7J21zZyNidWxrQWRkTGFiZWwuaW5mb1RleHQnIHwgc3FNZXNzYWdlfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBtb2RlbC5wcm9wZXJ0aWVzLnJhZGlvQnV0dG9uc1wiIGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wgY3VzdG9tLXJhZGlvIGN1c3RvbS1jb250cm9sLWlubGluZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3M9XCJjdXN0b20tY29udHJvbC1pbnB1dFwiIGlkPVwie3tpdGVtLmlkfX1cIiBuYW1lPVwibmF0dXJlXCIgdmFsdWU9XCJ7e2l0ZW0udmFsdWV9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2hlY2tlZF09XCJpdGVtLmNoZWNrZWRcIiBbZGlzYWJsZWRdPVwiaXRlbS5kaXNhYmxlZFwiIChjbGljayk9XCJ1cGRhdGVMYWJlbHNOYXR1cmUoaXRlbS52YWx1ZSlcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogaXRlbS5kaXNhYmxlZCwgJ2NsaWNrYWJsZSc6ICFpdGVtLmRpc2FibGVkfVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJjdXN0b20tY29udHJvbC1sYWJlbFwiIGZvcj1cInt7aXRlbS5pZH19XCI+e3sgaXRlbS5uYW1lIHwgc3FNZXNzYWdlIH19PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIDxiPjxsYWJlbCBmb3I9XCJsYWJlbFwiPnt7J21zZyNsYWJlbHMubGFiZWxzJyB8IHNxTWVzc2FnZX19PC9sYWJlbD48L2I+XG4gICAgICAgICAgICA8c3EtbGFiZWxzLWF1dG9jb21wbGV0ZVxuICAgICAgICAgICAgICAgIChsYWJlbHNVcGRhdGUpPVwib25MYWJlbHNDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAgICAgICAgIFtwdWJsaWNdPVwibW9kZWwucHJvcGVydGllcy5wdWJsaWNcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlQXV0b2NvbXBsZXRlXT1cIm1vZGVsLnByb3BlcnRpZXMuZGlzYWJsZUF1dG9jb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgW2FsbG93TmV3TGFiZWxzXT1cIm1vZGVsLnByb3BlcnRpZXMuYWxsb3dOZXdMYWJlbHNcIlxuICAgICAgICAgICAgICAgIFthbGxvd01hbmFnZVB1YmxpY0xhYmVsc109XCJtb2RlbC5wcm9wZXJ0aWVzLmFsbG93TWFuYWdlUHVibGljTGFiZWxzXCI+XG4gICAgICAgICAgICA8L3NxLWxhYmVscy1hdXRvY29tcGxldGU+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvc3EtbW9kYWw+XG48L2Zvcm0+XG4iXX0=