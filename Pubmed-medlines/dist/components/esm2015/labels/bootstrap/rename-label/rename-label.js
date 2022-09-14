import { Component, Inject, } from "@angular/core";
import { FormControl, Validators, } from "@angular/forms";
import { ModalButton, MODAL_MODEL, } from "@sinequa/core/modal";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../labels.service";
import * as i3 from "@sinequa/core/modal";
import * as i4 from "@sinequa/components/modal";
import * as i5 from "@angular/common";
import * as i6 from "../labels-autocomplete/labels-autocomplete.component";
import * as i7 from "@sinequa/core/validation";
import * as i8 from "@sinequa/core/intl";
const _c0 = function (a0, a1) { return { "disabled": a0, "clickable": a1 }; };
function BsRenameLabel_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵelementStart(1, "input", 9);
    i0.ɵɵlistener("click", function BsRenameLabel_div_7_Template_input_click_1_listener() { i0.ɵɵrestoreView(_r3); const item_r1 = ctx.$implicit; const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.updateLabelsNature(item_r1.value); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 10);
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
export class BsRenameLabel {
    constructor(model, formBuilder, labelsService, changeDetectorRef, modalRef) {
        this.model = model;
        this.formBuilder = formBuilder;
        this.labelsService = labelsService;
        this.changeDetectorRef = changeDetectorRef;
        this.modalRef = modalRef;
        this.isProcessing = false;
    }
    ngOnInit() {
        this.labelControl = new FormControl(this.model.newValue, Validators.required);
        this.form = this.formBuilder.group({
            label: this.labelControl,
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges, () => {
            this.model.newValue = this.labelControl.value;
        });
        this.buttons = [
            new ModalButton({
                text: "msg#renameLabel.btnRename",
                primary: true,
                validation: this.form,
                result: 0 /* Custom */,
                anchor: true,
                action: () => {
                    const observable = this.labelsService.renameLabels(this.model.oldValues, this.model.newValue, this.model.properties.public);
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
    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }
    updateLabelsNature(nature) {
        this.model.properties.public = nature;
    }
    onLabelsChanged(values) {
        this.model.oldValues = values;
    }
}
BsRenameLabel.ɵfac = function BsRenameLabel_Factory(t) { return new (t || BsRenameLabel)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.LabelsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i3.ModalRef)); };
BsRenameLabel.ɵcmp = i0.ɵɵdefineComponent({ type: BsRenameLabel, selectors: [["sq-rename-label"]], decls: 19, vars: 22, consts: [["name", "renameLabel", "novalidate", "", 3, "formGroup"], [3, "title", "buttons", "isProcessingState"], [1, "form-group", "sq-form-group"], ["role", "alert", 1, "alert", "alert-danger"], ["class", "custom-control custom-radio custom-control-inline", 4, "ngFor", "ngForOf"], ["for", "label"], [3, "public", "disableAutocomplete", "allowNewLabels", "allowManagePublicLabels", "labelsUpdate"], ["type", "text", "id", "label", "formControlName", "label", "autocomplete", "off", "spellcheck", "off", 1, "form-control", 3, "sqValidation", "placeholder"], [1, "custom-control", "custom-radio", "custom-control-inline"], ["type", "radio", "name", "nature", 1, "custom-control-input", 3, "id", "value", "checked", "disabled", "ngClass", "click"], [1, "custom-control-label", 3, "for"]], template: function BsRenameLabel_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "sq-modal", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵtext(4);
        i0.ɵɵpipe(5, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "section");
        i0.ɵɵtemplate(7, BsRenameLabel_div_7_Template, 5, 12, "div", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "b");
        i0.ɵɵelementStart(9, "label", 5);
        i0.ɵɵtext(10);
        i0.ɵɵpipe(11, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(12, "sq-labels-autocomplete", 6);
        i0.ɵɵlistener("labelsUpdate", function BsRenameLabel_Template_sq_labels_autocomplete_labelsUpdate_12_listener($event) { return ctx.onLabelsChanged($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "b");
        i0.ɵɵelementStart(14, "label", 5);
        i0.ɵɵtext(15);
        i0.ɵɵpipe(16, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelement(17, "input", 7);
        i0.ɵɵpipe(18, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("title", "msg#renameLabel.title")("buttons", ctx.buttons)("isProcessingState", ctx.isProcessing);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 14, "msg#renameLabel.alertText"), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.model.properties.radioButtons);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 16, "msg#renameLabel.oldLabels"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("public", ctx.model.properties.public)("disableAutocomplete", ctx.model.properties.disableAutocomplete)("allowNewLabels", ctx.model.properties.allowNewLabels)("allowManagePublicLabels", ctx.model.properties.allowManagePublicLabels);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 18, "msg#renameLabel.newLabel"));
        i0.ɵɵadvance(2);
        i0.ɵɵpropertyInterpolate("placeholder", i0.ɵɵpipeBind1(18, 20, "msg#renameLabel.newLabel"));
        i0.ɵɵproperty("sqValidation", ctx.form);
    } }, directives: [i1.ɵangular_packages_forms_forms_y, i1.NgControlStatusGroup, i1.FormGroupDirective, i4.BsModal, i5.NgForOf, i6.BsLabelsAutocompleteComponent, i1.DefaultValueAccessor, i1.NgControlStatus, i1.FormControlName, i7.ValidationDirective, i5.NgClass], pipes: [i8.MessagePipe], styles: [".clickable[_ngcontent-%COMP%] {\n                cursor: pointer;\n            }\n            .clickable[_ngcontent-%COMP%]:hover {\n                opacity: 85%;\n            }"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsRenameLabel, [{
        type: Component,
        args: [{
                selector: "sq-rename-label",
                templateUrl: "./rename-label.html",
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
            }] }, { type: i1.FormBuilder }, { type: i2.LabelsService }, { type: i0.ChangeDetectorRef }, { type: i3.ModalRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuYW1lLWxhYmVsLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvbGFiZWxzLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL3JlbmFtZS1sYWJlbC9yZW5hbWUtbGFiZWwudHMiLCJib290c3RyYXAvcmVuYW1lLWxhYmVsL3JlbmFtZS1sYWJlbC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxTQUFTLEVBR1QsTUFBTSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHSCxXQUFXLEVBQ1gsVUFBVSxHQUNiLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUNILFdBQVcsRUFFWCxXQUFXLEdBRWQsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7Ozs7Ozs7SUNiM0IsOEJBQ0k7SUFBQSxnQ0FFQTtJQUR3RCxvT0FBd0M7SUFEaEcsaUJBRUE7SUFBQSxpQ0FBc0Q7SUFBQSxZQUEyQjs7SUFBQSxpQkFBUTtJQUM3RixpQkFBTTs7O0lBSCtDLGVBQWdCO0lBQWhCLDBDQUFnQjtJQUFlLGdEQUFzQjtJQUNsRyx5Q0FBd0IsOEJBQUEsNEVBQUE7SUFDUSxlQUFpQjtJQUFqQiwyQ0FBaUI7SUFBQyxlQUEyQjtJQUEzQix3REFBMkI7O0FEMkJyRyxNQUFNLE9BQU8sYUFBYTtJQU90QixZQUVXLEtBSU4sRUFDTyxXQUF3QixFQUN4QixhQUE0QixFQUM1QixpQkFBb0MsRUFDcEMsUUFBa0I7UUFSbkIsVUFBSyxHQUFMLEtBQUssQ0FJWDtRQUNPLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQVp2QixpQkFBWSxHQUFZLEtBQUssQ0FBQztJQWFsQyxDQUFDO0lBRUosUUFB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dUNBQUE7UUFHL0IsZUFDSjtRQURJLG1GQUNKO1FBRTBCLGVBQWdDO1FBQWhDLDJEQUFnQztRQU1wQyxlQUEyQztRQUEzQyx5RUFBMkM7UUFHN0QsZUFBa0M7UUFBbEMsb0RBQWtDLGlFQUFBLHVEQUFBLHlFQUFBO1FBS2hCLGVBQTBDO1FBQTFDLHdFQUEwQztRQVM1RCxlQUF3RDtRQUF4RCwyRkFBd0Q7UUFQeEQsdUNBQXFCOztrRERjeEIsYUFBYTtjQWR6QixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsV0FBVyxFQUFFLHFCQUFxQjtnQkFDbEMsTUFBTSxFQUFFO29CQUNKOzs7Ozs7O1NBT0M7aUJBQ0o7YUFDSjs7c0JBU1EsTUFBTTt1QkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgT25Jbml0LFxuICAgIE9uRGVzdHJveSxcbiAgICBJbmplY3QsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICAgIEZvcm1CdWlsZGVyLFxuICAgIEZvcm1Hcm91cCxcbiAgICBGb3JtQ29udHJvbCxcbiAgICBWYWxpZGF0b3JzLFxufSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1xuICAgIE1vZGFsQnV0dG9uLFxuICAgIE1vZGFsUmVzdWx0LFxuICAgIE1PREFMX01PREVMLFxuICAgIE1vZGFsUmVmLFxufSBmcm9tIFwiQHNpbmVxdWEvY29yZS9tb2RhbFwiO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQgeyBNb2RhbFByb3BlcnRpZXMsIExhYmVsc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vbGFiZWxzLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtcmVuYW1lLWxhYmVsXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9yZW5hbWUtbGFiZWwuaHRtbFwiLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgXG4gICAgICAgICAgICAuY2xpY2thYmxlIHtcbiAgICAgICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuY2xpY2thYmxlOmhvdmVyIHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiA4NSU7XG4gICAgICAgICAgICB9XG4gICAgICAgIGAsXG4gICAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQnNSZW5hbWVMYWJlbCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBwdWJsaWMgbGFiZWxDb250cm9sOiBGb3JtQ29udHJvbDtcbiAgICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwO1xuICAgIHB1YmxpYyBmb3JtQ2hhbmdlczogU3Vic2NyaXB0aW9uO1xuICAgIHB1YmxpYyBidXR0b25zOiBNb2RhbEJ1dHRvbltdO1xuICAgIHB1YmxpYyBpc1Byb2Nlc3Npbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KE1PREFMX01PREVMKVxuICAgICAgICBwdWJsaWMgbW9kZWw6IHtcbiAgICAgICAgICAgIG9sZFZhbHVlczogc3RyaW5nW10sXG4gICAgICAgICAgICBuZXdWYWx1ZTogc3RyaW5nLFxuICAgICAgICAgICAgcHJvcGVydGllczogTW9kYWxQcm9wZXJ0aWVzXG4gICAgICAgIH0sXG4gICAgICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgICAgICBwcml2YXRlIGxhYmVsc1NlcnZpY2U6IExhYmVsc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIG1vZGFsUmVmOiBNb2RhbFJlZlxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmxhYmVsQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbChcbiAgICAgICAgICAgIHRoaXMubW9kZWwubmV3VmFsdWUsXG4gICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgbGFiZWw6IHRoaXMubGFiZWxDb250cm9sLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5mb3JtQ2hhbmdlcyA9IFV0aWxzLnN1YnNjcmliZSh0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLm5ld1ZhbHVlID0gdGhpcy5sYWJlbENvbnRyb2wudmFsdWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IFtcbiAgICAgICAgICAgIG5ldyBNb2RhbEJ1dHRvbih7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJtc2cjcmVuYW1lTGFiZWwuYnRuUmVuYW1lXCIsXG4gICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uOiB0aGlzLmZvcm0sXG4gICAgICAgICAgICAgICAgcmVzdWx0OiBNb2RhbFJlc3VsdC5DdXN0b20sXG4gICAgICAgICAgICAgICAgYW5jaG9yOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5sYWJlbHNTZXJ2aWNlLnJlbmFtZUxhYmVscyhcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwub2xkVmFsdWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5uZXdWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwucHJvcGVydGllcy5wdWJsaWNcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9ic2VydmFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNQcm9jZXNzaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RhbFJlZi5jbG9zZShlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNQcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWxSZWYuY2xvc2UoTW9kYWxSZXN1bHQuT0spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXcgTW9kYWxCdXR0b24oe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogTW9kYWxSZXN1bHQuQ2FuY2VsLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZm9ybUNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVMYWJlbHNOYXR1cmUobmF0dXJlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMubW9kZWwucHJvcGVydGllcy5wdWJsaWMgPSBuYXR1cmU7XG4gICAgfVxuXG4gICAgb25MYWJlbHNDaGFuZ2VkKHZhbHVlczogc3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5tb2RlbC5vbGRWYWx1ZXMgPSB2YWx1ZXM7XG4gICAgfVxufVxuIiwiPGZvcm0gbmFtZT1cInJlbmFtZUxhYmVsXCIgbm92YWxpZGF0ZSBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICA8c3EtbW9kYWwgW3RpdGxlXT1cIidtc2cjcmVuYW1lTGFiZWwudGl0bGUnXCIgW2J1dHRvbnNdPVwiYnV0dG9uc1wiIFtpc1Byb2Nlc3NpbmdTdGF0ZV09XCJpc1Byb2Nlc3NpbmdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgc3EtZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiIHJvbGU9XCJhbGVydFwiPlxuICAgICAgICAgICAgICAgIHt7J21zZyNyZW5hbWVMYWJlbC5hbGVydFRleHQnIHwgc3FNZXNzYWdlfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBtb2RlbC5wcm9wZXJ0aWVzLnJhZGlvQnV0dG9uc1wiIGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wgY3VzdG9tLXJhZGlvIGN1c3RvbS1jb250cm9sLWlubGluZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3M9XCJjdXN0b20tY29udHJvbC1pbnB1dFwiIGlkPVwie3tpdGVtLmlkfX1cIiBuYW1lPVwibmF0dXJlXCIgdmFsdWU9XCJ7e2l0ZW0udmFsdWV9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2hlY2tlZF09XCJpdGVtLmNoZWNrZWRcIiBbZGlzYWJsZWRdPVwiaXRlbS5kaXNhYmxlZFwiIChjbGljayk9XCJ1cGRhdGVMYWJlbHNOYXR1cmUoaXRlbS52YWx1ZSlcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogaXRlbS5kaXNhYmxlZCwgJ2NsaWNrYWJsZSc6ICFpdGVtLmRpc2FibGVkfVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJjdXN0b20tY29udHJvbC1sYWJlbFwiIGZvcj1cInt7aXRlbS5pZH19XCI+e3sgaXRlbS5uYW1lIHwgc3FNZXNzYWdlIH19PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIDxiPjxsYWJlbCBmb3I9XCJsYWJlbFwiPnt7J21zZyNyZW5hbWVMYWJlbC5vbGRMYWJlbHMnIHwgc3FNZXNzYWdlfX08L2xhYmVsPjwvYj5cbiAgICAgICAgICAgIDxzcS1sYWJlbHMtYXV0b2NvbXBsZXRlXG4gICAgICAgICAgICAgICAgKGxhYmVsc1VwZGF0ZSk9XCJvbkxhYmVsc0NoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW3B1YmxpY109XCJtb2RlbC5wcm9wZXJ0aWVzLnB1YmxpY1wiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVBdXRvY29tcGxldGVdPVwibW9kZWwucHJvcGVydGllcy5kaXNhYmxlQXV0b2NvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICBbYWxsb3dOZXdMYWJlbHNdPVwibW9kZWwucHJvcGVydGllcy5hbGxvd05ld0xhYmVsc1wiXG4gICAgICAgICAgICAgICAgW2FsbG93TWFuYWdlUHVibGljTGFiZWxzXT1cIm1vZGVsLnByb3BlcnRpZXMuYWxsb3dNYW5hZ2VQdWJsaWNMYWJlbHNcIj5cbiAgICAgICAgICAgIDwvc3EtbGFiZWxzLWF1dG9jb21wbGV0ZT5cbiAgICAgICAgICAgIDxiPjxsYWJlbCBmb3I9XCJsYWJlbFwiPnt7J21zZyNyZW5hbWVMYWJlbC5uZXdMYWJlbCcgfCBzcU1lc3NhZ2V9fTwvbGFiZWw+PC9iPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgW3NxVmFsaWRhdGlvbl09XCJmb3JtXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgIGlkPVwibGFiZWxcIlxuICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cImxhYmVsXCJcbiAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgICAgICAgICAgIHNwZWxsY2hlY2s9XCJvZmZcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3snbXNnI3JlbmFtZUxhYmVsLm5ld0xhYmVsJyB8IHNxTWVzc2FnZX19XCI+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvc3EtbW9kYWw+XG48L2Zvcm0+XG4iXX0=