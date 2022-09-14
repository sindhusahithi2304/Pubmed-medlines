import { Component, Inject } from "@angular/core";
import { ModalButton, MODAL_MODEL, } from "@sinequa/core/modal";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "@sinequa/components/selection";
import * as i3 from "../../labels.service";
import * as i4 from "@sinequa/components/search";
import * as i5 from "@sinequa/core/notification";
import * as i6 from "@sinequa/core/modal";
import * as i7 from "@angular/forms";
import * as i8 from "@sinequa/components/modal";
import * as i9 from "@angular/common";
import * as i10 from "../labels-autocomplete/labels-autocomplete.component";
import * as i11 from "@sinequa/core/intl";
function BsEditLabel_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#editLabel.infoText"), " ");
} }
const _c0 = function (a0, a1) { return { "disabled": a0, "clickable": a1 }; };
function BsEditLabel_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵelementStart(1, "input", 9);
    i0.ɵɵlistener("click", function BsEditLabel_div_8_Template_input_click_1_listener() { i0.ɵɵrestoreView(_r6); const item_r4 = ctx.$implicit; const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.updateLabelsNature(item_r4.value); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 10);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("id", item_r4.id);
    i0.ɵɵpropertyInterpolate("value", item_r4.value);
    i0.ɵɵproperty("checked", item_r4.checked)("disabled", item_r4.disabled)("ngClass", i0.ɵɵpureFunction2(9, _c0, item_r4.disabled, !item_r4.disabled));
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("for", item_r4.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 7, item_r4.name));
} }
function BsEditLabel_section_9_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section");
    i0.ɵɵelementStart(1, "b");
    i0.ɵɵelementStart(2, "label", 11);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "sq-labels-autocomplete", 12);
    i0.ɵɵlistener("labelsUpdate", function BsEditLabel_section_9_Template_sq_labels_autocomplete_labelsUpdate_5_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.onLabelsChanged($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 6, "msg#labels.labels"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("public", ctx_r2.model.properties.public)("disableAutocomplete", ctx_r2.model.properties.disableAutocomplete)("allowNewLabels", ctx_r2.model.properties.allowNewLabels)("allowManagePublicLabels", ctx_r2.model.properties.allowManagePublicLabels)("initLabels", ctx_r2.initialLabels);
} }
function BsEditLabel_section_10_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section");
    i0.ɵɵelementStart(1, "b");
    i0.ɵɵelementStart(2, "label", 11);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "sq-labels-autocomplete", 13);
    i0.ɵɵlistener("labelsUpdate", function BsEditLabel_section_10_Template_sq_labels_autocomplete_labelsUpdate_5_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.onLabelsToBeAddedChanged($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "b");
    i0.ɵɵelementStart(7, "label", 11);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "sq-labels-autocomplete", 13);
    i0.ɵɵlistener("labelsUpdate", function BsEditLabel_section_10_Template_sq_labels_autocomplete_labelsUpdate_10_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.onLabelsToBeRemovedChanged($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 10, "msg#editLabel.labelsToBeAdded"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("public", ctx_r3.model.properties.public)("disableAutocomplete", ctx_r3.model.properties.disableAutocomplete)("allowNewLabels", ctx_r3.model.properties.allowNewLabels)("allowManagePublicLabels", ctx_r3.model.properties.allowManagePublicLabels);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 12, "msg#editLabel.labelsToBeRemoved"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("public", ctx_r3.model.properties.public)("disableAutocomplete", ctx_r3.model.properties.disableAutocomplete)("allowNewLabels", ctx_r3.model.properties.allowNewLabels)("allowManagePublicLabels", ctx_r3.model.properties.allowManagePublicLabels);
} }
export class BsEditLabel {
    constructor(model, appService, selectionService, labelsService, searchService, notificationService, changeDetectorRef, modalRef) {
        this.model = model;
        this.appService = appService;
        this.selectionService = selectionService;
        this.labelsService = labelsService;
        this.searchService = searchService;
        this.notificationService = notificationService;
        this.changeDetectorRef = changeDetectorRef;
        this.modalRef = modalRef;
        /** Initial labels list assigned to a record */
        this.initialLabels = [];
        this.isProcessing = false;
    }
    ngOnInit() {
        this.selectedRecordsIds = !!this.selectionService.getSelectedIds()
            ? this.selectionService.getSelectedIds()
            : [];
        if (this.selectedRecordsIds.length === 1) {
            this.record = this.searchService.getRecordFromId(this.selectedRecordsIds[0]);
            this.initialLabels = this._getInitialRecordLabels();
        }
        this.buttons = [
            new ModalButton({
                text: "msg#editLabel.btnEdit",
                primary: true,
                result: 0 /* Custom */,
                anchor: true,
                action: () => {
                    const observable = this.labelsService.addLabels(this.model.valuesToBeAdded, this.selectionService.getSelectedIds(), this.model.properties.public);
                    if (observable) {
                        this.isProcessing = true;
                        this.changeDetectorRef.markForCheck();
                        Utils.subscribe(observable, () => { }, (error) => {
                            this.notificationService.error("msg#editLabel.errorFeedback");
                            this.modalRef.close(error);
                        }, () => {
                            this.labelsService
                                .removeLabels(this.model.valuesToBeRemoved, this.selectionService.getSelectedIds(), this.model.properties.public)
                                .subscribe(() => { }, (error) => {
                                this.notificationService.error("msg#editLabel.errorFeedback");
                                this.modalRef.close(error);
                            }, () => {
                                this.isProcessing = false;
                                this.modalRef.close(-1 /* OK */);
                                this.notificationService.success("msg#editLabel.successFeedback");
                                this.searchService.search(); /** Update the display immediately in the components and facets*/
                            });
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
        this.model.valuesToBeRemoved = [];
        this.model.valuesToBeAdded = [];
        if (this.selectedRecordsIds.length === 1) {
            this.initialLabels = this._getInitialRecordLabels(); /** update initial labels */
        }
    }
    onLabelsChanged(values) {
        if (!!this.initialLabels) {
            this.model.valuesToBeAdded = values.filter((value) => !this.initialLabels.find((label) => label === value));
            this.model.valuesToBeRemoved = this.initialLabels.filter((label) => !values.find((value) => value === label));
        }
        else {
            this.model.valuesToBeAdded = values;
            this.model.valuesToBeRemoved = [];
        }
    }
    onLabelsToBeAddedChanged(values) {
        this.model.valuesToBeAdded = values;
    }
    onLabelsToBeRemovedChanged(values) {
        this.model.valuesToBeRemoved = values;
    }
    /**
     * Return the list of labels already assigned to the selected record
     */
    _getInitialRecordLabels() {
        if (!!this.record) {
            const field = this.model.properties.public
                ? this.labelsService.publicLabelsField
                : this.labelsService.privateLabelsField;
            const labelsField = this.appService.resolveColumnAlias(field);
            if (!this.model.properties.public) {
                return !!this.record[labelsField]
                    ? this.labelsService.removePrivatePrefix(this.record[labelsField])
                    : [];
            }
            return this.record[labelsField] || [];
        }
        else {
            return [];
        }
    }
}
BsEditLabel.ɵfac = function BsEditLabel_Factory(t) { return new (t || BsEditLabel)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(i1.AppService), i0.ɵɵdirectiveInject(i2.SelectionService), i0.ɵɵdirectiveInject(i3.LabelsService), i0.ɵɵdirectiveInject(i4.SearchService), i0.ɵɵdirectiveInject(i5.NotificationsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i6.ModalRef)); };
BsEditLabel.ɵcmp = i0.ɵɵdefineComponent({ type: BsEditLabel, selectors: [["sq-edit-label"]], decls: 11, vars: 10, consts: [["name", "editLabel", "novalidate", ""], [3, "title", "buttons", "isProcessingState"], [1, "form-group", "sq-form-group"], ["role", "alert", 1, "alert", "alert-warning"], ["class", "alert alert-info", "role", "alert", 4, "ngIf"], ["class", "custom-control custom-radio custom-control-inline", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["role", "alert", 1, "alert", "alert-info"], [1, "custom-control", "custom-radio", "custom-control-inline"], ["type", "radio", "name", "nature", 1, "custom-control-input", 3, "id", "value", "checked", "disabled", "ngClass", "click"], [1, "custom-control-label", 3, "for"], ["for", "label"], [3, "public", "disableAutocomplete", "allowNewLabels", "allowManagePublicLabels", "initLabels", "labelsUpdate"], [3, "public", "disableAutocomplete", "allowNewLabels", "allowManagePublicLabels", "labelsUpdate"]], template: function BsEditLabel_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "sq-modal", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵtext(4);
        i0.ɵɵpipe(5, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(6, BsEditLabel_div_6_Template, 3, 3, "div", 4);
        i0.ɵɵelementStart(7, "section");
        i0.ɵɵtemplate(8, BsEditLabel_div_8_Template, 5, 12, "div", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(9, BsEditLabel_section_9_Template, 6, 8, "section", 6);
        i0.ɵɵtemplate(10, BsEditLabel_section_10_Template, 11, 14, "section", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("title", "msg#editLabel.title")("buttons", ctx.buttons)("isProcessingState", ctx.isProcessing);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 8, "msg#editLabel.alertText"), " ");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.model.properties.allowManagePublicLabels || !ctx.model.properties.public);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.model.properties.radioButtons);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.record);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.record);
    } }, directives: [i7.ɵangular_packages_forms_forms_y, i7.NgControlStatusGroup, i7.NgForm, i8.BsModal, i9.NgIf, i9.NgForOf, i9.NgClass, i10.BsLabelsAutocompleteComponent], pipes: [i11.MessagePipe], styles: [".clickable[_ngcontent-%COMP%] {\n                cursor: pointer;\n            }\n            .clickable[_ngcontent-%COMP%]:hover {\n                opacity: 85%;\n            }"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsEditLabel, [{
        type: Component,
        args: [{
                selector: "sq-edit-label",
                templateUrl: "./edit-label.html",
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
            }] }, { type: i1.AppService }, { type: i2.SelectionService }, { type: i3.LabelsService }, { type: i4.SearchService }, { type: i5.NotificationsService }, { type: i0.ChangeDetectorRef }, { type: i6.ModalRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1sYWJlbC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2xhYmVscy8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9lZGl0LWxhYmVsL2VkaXQtbGFiZWwudHMiLCJib290c3RyYXAvZWRpdC1sYWJlbC9lZGl0LWxhYmVsLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFDSCxXQUFXLEVBRVgsV0FBVyxHQUVkLE1BQU0scUJBQXFCLENBQUM7QUFNN0IsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7Ozs7Ozs7OztJQ04vQiw4QkFDSTtJQUFBLFlBQ0o7O0lBQUEsaUJBQU07O0lBREYsZUFDSjtJQURJLCtFQUNKOzs7OztJQUVJLDhCQUNJO0lBQUEsZ0NBRUE7SUFEd0Qsa09BQXdDO0lBRGhHLGlCQUVBO0lBQUEsaUNBQXNEO0lBQUEsWUFBMkI7O0lBQUEsaUJBQVE7SUFDN0YsaUJBQU07OztJQUgrQyxlQUFnQjtJQUFoQiwwQ0FBZ0I7SUFBZSxnREFBc0I7SUFDbEcseUNBQXdCLDhCQUFBLDRFQUFBO0lBQ1EsZUFBaUI7SUFBakIsMkNBQWlCO0lBQUMsZUFBMkI7SUFBM0Isd0RBQTJCOzs7O0lBSXpGLCtCQUNJO0lBQUEseUJBQUc7SUFBQSxpQ0FBbUI7SUFBQSxZQUFtQzs7SUFBQSxpQkFBUTtJQUFBLGlCQUFJO0lBQ3JFLGtEQU9BO0lBTkksa09BQXdDO0lBTTVDLGlCQUF5QjtJQUM3QixpQkFBVTs7O0lBVGdCLGVBQW1DO0lBQW5DLCtEQUFtQztJQUdyRCxlQUFrQztJQUFsQyx1REFBa0Msb0VBQUEsMERBQUEsNEVBQUEsb0NBQUE7Ozs7SUFRMUMsK0JBQ0k7SUFBQSx5QkFBRztJQUFBLGlDQUFtQjtJQUFBLFlBQStDOztJQUFBLGlCQUFRO0lBQUEsaUJBQUk7SUFD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bnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgICBNb2RhbEJ1dHRvbixcbiAgICBNb2RhbFJlc3VsdCxcbiAgICBNT0RBTF9NT0RFTCxcbiAgICBNb2RhbFJlZixcbn0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbW9kYWxcIjtcbmltcG9ydCB7IE1vZGFsUHJvcGVydGllcywgTGFiZWxzU2VydmljZSB9IGZyb20gXCIuLi8uLi9sYWJlbHMuc2VydmljZVwiO1xuaW1wb3J0IHsgU2VsZWN0aW9uU2VydmljZSB9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3NlbGVjdGlvblwiO1xuaW1wb3J0IHsgQXBwU2VydmljZSB9IGZyb20gXCJAc2luZXF1YS9jb3JlL2FwcC11dGlsc1wiO1xuaW1wb3J0IHsgUmVjb3JkIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvc2VhcmNoXCI7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNTZXJ2aWNlIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbm90aWZpY2F0aW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLWVkaXQtbGFiZWxcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2VkaXQtbGFiZWwuaHRtbFwiLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgXG4gICAgICAgICAgICAuY2xpY2thYmxlIHtcbiAgICAgICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuY2xpY2thYmxlOmhvdmVyIHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiA4NSU7XG4gICAgICAgICAgICB9XG4gICAgICAgIGAsXG4gICAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQnNFZGl0TGFiZWwgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyBzZWxlY3RlZFJlY29yZHNJZHM6IHN0cmluZ1tdO1xuICAgIHB1YmxpYyBidXR0b25zOiBNb2RhbEJ1dHRvbltdO1xuICAgIC8qKiBJbml0aWFsIGxhYmVscyBsaXN0IGFzc2lnbmVkIHRvIGEgcmVjb3JkICovXG4gICAgcHVibGljIGluaXRpYWxMYWJlbHM6IHN0cmluZ1tdID0gW107XG4gICAgcHVibGljIHJlY29yZDogUmVjb3JkIHwgdW5kZWZpbmVkO1xuICAgIHB1YmxpYyBpc1Byb2Nlc3Npbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KE1PREFMX01PREVMKVxuICAgICAgICBwdWJsaWMgbW9kZWw6IHtcbiAgICAgICAgICAgIHZhbHVlc1RvQmVBZGRlZDogc3RyaW5nW10sXG4gICAgICAgICAgICB2YWx1ZXNUb0JlUmVtb3ZlZDogc3RyaW5nW10sXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBNb2RhbFByb3BlcnRpZXNcbiAgICAgICAgfSxcbiAgICAgICAgcHJpdmF0ZSBhcHBTZXJ2aWNlOiBBcHBTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHNlbGVjdGlvblNlcnZpY2U6IFNlbGVjdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbGFiZWxzU2VydmljZTogTGFiZWxzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvbnNTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFJlZjogTW9kYWxSZWZcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFJlY29yZHNJZHMgPSAhIXRoaXMuc2VsZWN0aW9uU2VydmljZS5nZXRTZWxlY3RlZElkcygpXG4gICAgICAgICAgICA/IHRoaXMuc2VsZWN0aW9uU2VydmljZS5nZXRTZWxlY3RlZElkcygpXG4gICAgICAgICAgICA6IFtdO1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFJlY29yZHNJZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnJlY29yZCA9IHRoaXMuc2VhcmNoU2VydmljZS5nZXRSZWNvcmRGcm9tSWQoXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJlY29yZHNJZHNbMF1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxMYWJlbHMgPSB0aGlzLl9nZXRJbml0aWFsUmVjb3JkTGFiZWxzKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5idXR0b25zID0gW1xuICAgICAgICAgICAgbmV3IE1vZGFsQnV0dG9uKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIm1zZyNlZGl0TGFiZWwuYnRuRWRpdFwiLFxuICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWUsXG4gICAgICAgICAgICAgICAgcmVzdWx0OiBNb2RhbFJlc3VsdC5DdXN0b20sXG4gICAgICAgICAgICAgICAgYW5jaG9yOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5sYWJlbHNTZXJ2aWNlLmFkZExhYmVscyhcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudmFsdWVzVG9CZUFkZGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmdldFNlbGVjdGVkSWRzKCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnByb3BlcnRpZXMucHVibGljXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYnNlcnZhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUHJvY2Vzc2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibXNnI2VkaXRMYWJlbC5lcnJvckZlZWRiYWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RhbFJlZi5jbG9zZShlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFiZWxzU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUxhYmVscyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnZhbHVlc1RvQmVSZW1vdmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5nZXRTZWxlY3RlZElkcygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwucHJvcGVydGllcy5wdWJsaWNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibXNnI2VkaXRMYWJlbC5lcnJvckZlZWRiYWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RhbFJlZi5jbG9zZShlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNQcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWxSZWYuY2xvc2UoTW9kYWxSZXN1bHQuT0spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibXNnI2VkaXRMYWJlbC5zdWNjZXNzRmVlZGJhY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKCk7IC8qKiBVcGRhdGUgdGhlIGRpc3BsYXkgaW1tZWRpYXRlbHkgaW4gdGhlIGNvbXBvbmVudHMgYW5kIGZhY2V0cyovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmV3IE1vZGFsQnV0dG9uKHtcbiAgICAgICAgICAgICAgICByZXN1bHQ6IE1vZGFsUmVzdWx0LkNhbmNlbCxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIHVwZGF0ZUxhYmVsc05hdHVyZShuYXR1cmU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5tb2RlbC5wcm9wZXJ0aWVzLnB1YmxpYyA9IG5hdHVyZTtcbiAgICAgICAgdGhpcy5tb2RlbC52YWx1ZXNUb0JlUmVtb3ZlZCA9IFtdO1xuICAgICAgICB0aGlzLm1vZGVsLnZhbHVlc1RvQmVBZGRlZCA9IFtdO1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFJlY29yZHNJZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxMYWJlbHMgPSB0aGlzLl9nZXRJbml0aWFsUmVjb3JkTGFiZWxzKCk7IC8qKiB1cGRhdGUgaW5pdGlhbCBsYWJlbHMgKi9cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTGFiZWxzQ2hhbmdlZCh2YWx1ZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGlmICghIXRoaXMuaW5pdGlhbExhYmVscykge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC52YWx1ZXNUb0JlQWRkZWQgPSB2YWx1ZXMuZmlsdGVyKFxuICAgICAgICAgICAgICAgICh2YWx1ZSkgPT4gIXRoaXMuaW5pdGlhbExhYmVscy5maW5kKChsYWJlbCkgPT4gbGFiZWwgPT09IHZhbHVlKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMubW9kZWwudmFsdWVzVG9CZVJlbW92ZWQgPSB0aGlzLmluaXRpYWxMYWJlbHMuZmlsdGVyKFxuICAgICAgICAgICAgICAgIChsYWJlbCkgPT4gIXZhbHVlcy5maW5kKCh2YWx1ZSkgPT4gdmFsdWUgPT09IGxhYmVsKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwudmFsdWVzVG9CZUFkZGVkID0gdmFsdWVzO1xuICAgICAgICAgICAgdGhpcy5tb2RlbC52YWx1ZXNUb0JlUmVtb3ZlZCA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25MYWJlbHNUb0JlQWRkZWRDaGFuZ2VkKHZhbHVlczogc3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5tb2RlbC52YWx1ZXNUb0JlQWRkZWQgPSB2YWx1ZXM7XG4gICAgfVxuXG4gICAgb25MYWJlbHNUb0JlUmVtb3ZlZENoYW5nZWQodmFsdWVzOiBzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLm1vZGVsLnZhbHVlc1RvQmVSZW1vdmVkID0gdmFsdWVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgbGlzdCBvZiBsYWJlbHMgYWxyZWFkeSBhc3NpZ25lZCB0byB0aGUgc2VsZWN0ZWQgcmVjb3JkXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZ2V0SW5pdGlhbFJlY29yZExhYmVscygpOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmICghIXRoaXMucmVjb3JkKSB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMubW9kZWwucHJvcGVydGllcy5wdWJsaWNcbiAgICAgICAgICAgICAgICA/IHRoaXMubGFiZWxzU2VydmljZS5wdWJsaWNMYWJlbHNGaWVsZFxuICAgICAgICAgICAgICAgIDogdGhpcy5sYWJlbHNTZXJ2aWNlLnByaXZhdGVMYWJlbHNGaWVsZDtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsc0ZpZWxkID0gdGhpcy5hcHBTZXJ2aWNlLnJlc29sdmVDb2x1bW5BbGlhcyhmaWVsZCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMubW9kZWwucHJvcGVydGllcy5wdWJsaWMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISF0aGlzLnJlY29yZFtsYWJlbHNGaWVsZF1cbiAgICAgICAgICAgICAgICAgICAgPyAodGhpcy5sYWJlbHNTZXJ2aWNlLnJlbW92ZVByaXZhdGVQcmVmaXgoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkW2xhYmVsc0ZpZWxkXVxuICAgICAgICAgICAgICAgICAgICAgICkgYXMgc3RyaW5nW10pXG4gICAgICAgICAgICAgICAgICAgIDogKFtdIGFzIHN0cmluZ1tdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlY29yZFtsYWJlbHNGaWVsZF0gfHwgW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCI8Zm9ybSBuYW1lPVwiZWRpdExhYmVsXCIgbm92YWxpZGF0ZT5cbiAgICA8c3EtbW9kYWwgW3RpdGxlXT1cIidtc2cjZWRpdExhYmVsLnRpdGxlJ1wiIFtidXR0b25zXT1cImJ1dHRvbnNcIiBbaXNQcm9jZXNzaW5nU3RhdGVdPVwiaXNQcm9jZXNzaW5nXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHNxLWZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC13YXJuaW5nXCIgcm9sZT1cImFsZXJ0XCI+XG4gICAgICAgICAgICAgICAge3snbXNnI2VkaXRMYWJlbC5hbGVydFRleHQnIHwgc3FNZXNzYWdlfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIm1vZGVsLnByb3BlcnRpZXMuYWxsb3dNYW5hZ2VQdWJsaWNMYWJlbHMgfHwgIW1vZGVsLnByb3BlcnRpZXMucHVibGljIFwiIGNsYXNzPVwiYWxlcnQgYWxlcnQtaW5mb1wiIHJvbGU9XCJhbGVydFwiPlxuICAgICAgICAgICAgICAgIHt7J21zZyNlZGl0TGFiZWwuaW5mb1RleHQnIHwgc3FNZXNzYWdlfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBtb2RlbC5wcm9wZXJ0aWVzLnJhZGlvQnV0dG9uc1wiIGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wgY3VzdG9tLXJhZGlvIGN1c3RvbS1jb250cm9sLWlubGluZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3M9XCJjdXN0b20tY29udHJvbC1pbnB1dFwiIGlkPVwie3tpdGVtLmlkfX1cIiBuYW1lPVwibmF0dXJlXCIgdmFsdWU9XCJ7e2l0ZW0udmFsdWV9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2hlY2tlZF09XCJpdGVtLmNoZWNrZWRcIiBbZGlzYWJsZWRdPVwiaXRlbS5kaXNhYmxlZFwiIChjbGljayk9XCJ1cGRhdGVMYWJlbHNOYXR1cmUoaXRlbS52YWx1ZSlcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogaXRlbS5kaXNhYmxlZCwgJ2NsaWNrYWJsZSc6ICFpdGVtLmRpc2FibGVkfVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJjdXN0b20tY29udHJvbC1sYWJlbFwiIGZvcj1cInt7aXRlbS5pZH19XCI+e3sgaXRlbS5uYW1lIHwgc3FNZXNzYWdlIH19PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICAgICAgPHNlY3Rpb24gKm5nSWY9XCJyZWNvcmRcIj5cbiAgICAgICAgICAgICAgICA8Yj48bGFiZWwgZm9yPVwibGFiZWxcIj57eydtc2cjbGFiZWxzLmxhYmVscycgfCBzcU1lc3NhZ2V9fTwvbGFiZWw+PC9iPlxuICAgICAgICAgICAgICAgIDxzcS1sYWJlbHMtYXV0b2NvbXBsZXRlXG4gICAgICAgICAgICAgICAgICAgIChsYWJlbHNVcGRhdGUpPVwib25MYWJlbHNDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbcHVibGljXT1cIm1vZGVsLnByb3BlcnRpZXMucHVibGljXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVBdXRvY29tcGxldGVdPVwibW9kZWwucHJvcGVydGllcy5kaXNhYmxlQXV0b2NvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICAgICAgW2FsbG93TmV3TGFiZWxzXT1cIm1vZGVsLnByb3BlcnRpZXMuYWxsb3dOZXdMYWJlbHNcIlxuICAgICAgICAgICAgICAgICAgICBbYWxsb3dNYW5hZ2VQdWJsaWNMYWJlbHNdPVwibW9kZWwucHJvcGVydGllcy5hbGxvd01hbmFnZVB1YmxpY0xhYmVsc1wiXG4gICAgICAgICAgICAgICAgICAgIFtpbml0TGFiZWxzXT1cImluaXRpYWxMYWJlbHNcIj5cbiAgICAgICAgICAgICAgICA8L3NxLWxhYmVscy1hdXRvY29tcGxldGU+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgICAgIDxzZWN0aW9uICpuZ0lmPVwiIXJlY29yZFwiPlxuICAgICAgICAgICAgICAgIDxiPjxsYWJlbCBmb3I9XCJsYWJlbFwiPnt7J21zZyNlZGl0TGFiZWwubGFiZWxzVG9CZUFkZGVkJyB8IHNxTWVzc2FnZX19PC9sYWJlbD48L2I+XG4gICAgICAgICAgICAgICAgPHNxLWxhYmVscy1hdXRvY29tcGxldGVcbiAgICAgICAgICAgICAgICAgICAgKGxhYmVsc1VwZGF0ZSk9XCJvbkxhYmVsc1RvQmVBZGRlZENoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFtwdWJsaWNdPVwibW9kZWwucHJvcGVydGllcy5wdWJsaWNcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZUF1dG9jb21wbGV0ZV09XCJtb2RlbC5wcm9wZXJ0aWVzLmRpc2FibGVBdXRvY29tcGxldGVcIlxuICAgICAgICAgICAgICAgICAgICBbYWxsb3dOZXdMYWJlbHNdPVwibW9kZWwucHJvcGVydGllcy5hbGxvd05ld0xhYmVsc1wiXG4gICAgICAgICAgICAgICAgICAgIFthbGxvd01hbmFnZVB1YmxpY0xhYmVsc109XCJtb2RlbC5wcm9wZXJ0aWVzLmFsbG93TWFuYWdlUHVibGljTGFiZWxzXCI+XG4gICAgICAgICAgICAgICAgPC9zcS1sYWJlbHMtYXV0b2NvbXBsZXRlPlxuICAgICAgICAgICAgICAgIDxiPjxsYWJlbCBmb3I9XCJsYWJlbFwiPnt7J21zZyNlZGl0TGFiZWwubGFiZWxzVG9CZVJlbW92ZWQnIHwgc3FNZXNzYWdlfX08L2xhYmVsPjwvYj5cbiAgICAgICAgICAgICAgICA8c3EtbGFiZWxzLWF1dG9jb21wbGV0ZVxuICAgICAgICAgICAgICAgICAgICAobGFiZWxzVXBkYXRlKT1cIm9uTGFiZWxzVG9CZVJlbW92ZWRDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbcHVibGljXT1cIm1vZGVsLnByb3BlcnRpZXMucHVibGljXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVBdXRvY29tcGxldGVdPVwibW9kZWwucHJvcGVydGllcy5kaXNhYmxlQXV0b2NvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICAgICAgW2FsbG93TmV3TGFiZWxzXT1cIm1vZGVsLnByb3BlcnRpZXMuYWxsb3dOZXdMYWJlbHNcIlxuICAgICAgICAgICAgICAgICAgICBbYWxsb3dNYW5hZ2VQdWJsaWNMYWJlbHNdPVwibW9kZWwucHJvcGVydGllcy5hbGxvd01hbmFnZVB1YmxpY0xhYmVsc1wiPlxuICAgICAgICAgICAgICAgIDwvc3EtbGFiZWxzLWF1dG9jb21wbGV0ZT5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICA8L2Rpdj5cbiAgICA8L3NxLW1vZGFsPlxuPC9mb3JtPlxuIl19