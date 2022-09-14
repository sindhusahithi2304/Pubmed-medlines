import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MODAL_MODEL, ModalButton } from "@sinequa/core/modal";
import { Utils } from "@sinequa/core/base";
import { Alert } from "../../alerts.service";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@sinequa/components/search";
import * as i3 from "../../alerts.service";
import * as i4 from "@sinequa/core/modal";
import * as i5 from "@sinequa/components/modal";
import * as i6 from "@sinequa/components/utils";
import * as i7 from "@sinequa/core/validation";
import * as i8 from "@angular/common";
import * as i9 from "../alert-message/alert-message.component";
import * as i10 from "@sinequa/core/intl";
function BsEditAlert_option_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 18);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const frequencyValue_r4 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", frequencyValue_r4);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, ctx_r0.frequency[frequencyValue_r4]));
} }
function BsEditAlert_label_18_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 13);
    i0.ɵɵelementStart(1, "input", 19);
    i0.ɵɵlistener("change", function BsEditAlert_label_18_Template_input_change_1_listener($event) { i0.ɵɵrestoreView(_r7); const day_r5 = ctx.$implicit; const ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.dayChange($event, day_r5.value); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span", 15);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("checked", ctx_r1.dayChecked(day_r5.value));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 2, "msg#editAlert." + day_r5.key));
} }
function BsEditAlert_label_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "label", 13);
    i0.ɵɵelement(1, "input", 20);
    i0.ɵɵelementStart(2, "span", 15);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, "msg#editAlert.updateQuery"));
} }
function BsEditAlert_sq_alert_message_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "sq-alert-message", 21);
    i0.ɵɵpipe(1, "sqMessage");
} if (rf & 2) {
    i0.ɵɵproperty("message", i0.ɵɵpipeBind1(1, 1, "msg#editAlert.lossDataMessage"));
} }
export class BsEditAlert {
    constructor(model, formBuilder, searchService, alertsService, modalRef) {
        this.model = model;
        this.formBuilder = formBuilder;
        this.searchService = searchService;
        this.alertsService = alertsService;
        this.modalRef = modalRef;
        this.weekdays = {
            'monday': Alert.Days.Monday,
            'tuesday': Alert.Days.Tuesday,
            'wednesday': Alert.Days.Wednesday,
            'thursday': Alert.Days.Thursday,
            'friday': Alert.Days.Friday,
            'saturday': Alert.Days.Saturday,
            'sunday': Alert.Days.Sunday
        };
        this.showDirtyMessage = false;
        // Preserve original property order
        this.originalOrder = (a, b) => 0;
        this.frequencies = [
            Alert.Frequency.Daily,
            Alert.Frequency.Hourly,
            Alert.Frequency.Immediate,
        ];
        this.frequency = Alert.Frequency;
    }
    get alert() {
        return this.model.alert;
    }
    ngOnInit() {
        if (!this.alert.days) {
            this.alert.days = Alert.Days.None;
        }
        this.canUpdateQuery = (!!this.alertsService.alert(this.alert.name)) &&
            !!this.searchService.results && !!this.searchService.results.records;
        this.alertDaysControl = new FormControl(this.alert.days);
        this.alertNameControl = new FormControl(this.alert.name, Validators.required);
        this.alertFrequencyControl = new FormControl(this.alert.frequency);
        this.alertTimesControl = new FormControl(this.alert.times); // TODO validator
        this.alertActiveControl = new FormControl(this.alert.active);
        this.updateQueryControl = new FormControl(this.updateQuery);
        this.form = this.formBuilder.group({
            alertName: this.alertNameControl,
            alertFrequency: this.alertFrequencyControl,
            alertTimes: this.alertTimesControl,
            alertActive: this.alertActiveControl,
            updateQuery: this.updateQueryControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges, (value) => {
            this.alert.name = this.alertNameControl.value;
            this.alert.frequency = this.alertFrequencyControl.value;
            this.alert.times = this.alertTimesControl.value;
            this.alert.active = this.alertActiveControl.value;
            this.alert.days = this.alertDaysControl.value;
            this.updateQuery = this.updateQueryControl.value;
        });
        this.createButtons();
    }
    createButtons() {
        this.buttons = [
            new ModalButton({
                text: "msg#editAlert.runQuery",
                result: 0 /* Custom */,
                action: (button) => {
                    this.runQuery();
                    this.modalRef.close(-2 /* Cancel */); // dismiss the dialog too (?)
                },
                visible: !!this.alertsService.alert(this.alert.name)
            }),
            new ModalButton({
                result: -1 /* OK */,
                primary: true,
                validation: this.form,
                action: (button) => {
                    if (this.updateQuery) {
                        this.alertsService.setAlertToCurrentQuery(this.alert);
                    }
                }
            }),
            new ModalButton({
                result: -2 /* Cancel */,
                action: (button) => {
                    if (this.form.dirty) {
                        button.result = 0 /* Custom */;
                        this.showDirtyMessage = true;
                        this.createYesNoButtons();
                    }
                }
            })
        ];
    }
    createYesNoButtons() {
        this.buttons = [
            new ModalButton({
                result: -3 /* Yes */,
                primary: true,
            }),
            new ModalButton({
                result: -4 /* No */,
                action: (button) => {
                    button.result = 0 /* Custom */;
                    this.showDirtyMessage = false;
                    this.createButtons();
                }
            })
        ];
    }
    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }
    dayChecked(day) {
        return (this.alert.days & day) !== 0;
    }
    dayChange(event, day) {
        const input = event.target;
        if (input.checked) {
            this.alertDaysControl.setValue(this.alert.days |= day);
            // this.alert.days |= day;
        }
        else {
            this.alertDaysControl.setValue(this.alert.days &= ~day);
            // this.alert.days &= ~day;
        }
        this.form.markAsDirty();
    }
    runQuery() {
        this.alertsService.searchAlert(this.alert, this.model.searchRoute);
    }
}
BsEditAlert.ɵfac = function BsEditAlert_Factory(t) { return new (t || BsEditAlert)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.SearchService), i0.ɵɵdirectiveInject(i3.AlertsService), i0.ɵɵdirectiveInject(i4.ModalRef)); };
BsEditAlert.ɵcmp = i0.ɵɵdefineComponent({ type: BsEditAlert, selectors: [["sq-edit-alert"]], decls: 33, vars: 26, consts: [["name", "editAlert", "novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "form-group", "sq-form-group"], ["for", "alertName"], ["type", "text", "id", "alertName", "formControlName", "alertName", "autocomplete", "off", "spellcheck", "off", "sqAutofocus", "", 1, "form-control", 3, "sqValidation"], [1, "form-group"], ["for", "alertFrequency"], ["id", "alertFrequency", "formControlName", "alertFrequency", 1, "form-control", "custom-select"], [3, "value", 4, "ngFor", "ngForOf"], [1, "weekdays-grid"], ["class", "custom-control custom-control-inline custom-checkbox", 4, "ngFor", "ngForOf"], ["for", "alertTimes"], ["type", "text", "id", "alertTimes", "formControlName", "alertTimes", "autocomplete", "off", "spellcheck", "off", 1, "form-control"], [1, "custom-control", "custom-control-inline", "custom-checkbox"], ["type", "checkbox", "id", "alertActive", "formControlName", "alertActive", 1, "custom-control-input"], [1, "custom-control-label", "user-select-none", "cursor-pointer"], ["class", "custom-control custom-control-inline custom-checkbox", 4, "ngIf"], ["footer", "", 3, "message", 4, "ngIf"], [3, "value"], ["type", "checkbox", 1, "custom-control-input", 3, "checked", "change"], ["type", "checkbox", "id", "updateQuery", "formControlName", "updateQuery", 1, "custom-control-input"], ["footer", "", 3, "message"]], template: function BsEditAlert_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "sq-modal", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "label", 3);
        i0.ɵɵtext(4);
        i0.ɵɵpipe(5, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(6, "input", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "div", 5);
        i0.ɵɵelementStart(8, "label", 6);
        i0.ɵɵtext(9);
        i0.ɵɵpipe(10, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "select", 7);
        i0.ɵɵtemplate(12, BsEditAlert_option_12_Template, 3, 4, "option", 8);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "div", 5);
        i0.ɵɵelementStart(14, "label");
        i0.ɵɵtext(15);
        i0.ɵɵpipe(16, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "div", 9);
        i0.ɵɵtemplate(18, BsEditAlert_label_18_Template, 5, 4, "label", 10);
        i0.ɵɵpipe(19, "keyvalue");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "div", 5);
        i0.ɵɵelementStart(21, "label", 11);
        i0.ɵɵtext(22);
        i0.ɵɵpipe(23, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(24, "input", 12);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "div", 5);
        i0.ɵɵelementStart(26, "label", 13);
        i0.ɵɵelement(27, "input", 14);
        i0.ɵɵelementStart(28, "span", 15);
        i0.ɵɵtext(29);
        i0.ɵɵpipe(30, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(31, BsEditAlert_label_31_Template, 5, 3, "label", 16);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(32, BsEditAlert_sq_alert_message_32_Template, 2, 3, "sq-alert-message", 17);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("title", "msg#editAlert.title")("buttons", ctx.buttons);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 13, "msg#editAlert.name"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("sqValidation", ctx.form);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 15, "msg#editAlert.frequency"));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.frequencies);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 17, "msg#editAlert.days"));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind2(19, 19, ctx.weekdays, ctx.originalOrder));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(23, 22, "msg#editAlert.times"));
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(30, 24, "msg#editAlert.active"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.canUpdateQuery);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showDirtyMessage);
    } }, directives: [i1.ɵangular_packages_forms_forms_y, i1.NgControlStatusGroup, i1.FormGroupDirective, i5.BsModal, i1.DefaultValueAccessor, i1.NgControlStatus, i1.FormControlName, i6.Autofocus, i7.ValidationDirective, i1.SelectControlValueAccessor, i8.NgForOf, i1.CheckboxControlValueAccessor, i8.NgIf, i1.NgSelectOption, i1.ɵangular_packages_forms_forms_x, i9.BsAlertMessageComponent], pipes: [i10.MessagePipe, i8.KeyValuePipe], styles: [".custom-control-label.user-select-none[_ngcontent-%COMP%]{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;user-select:none}.custom-control-label.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.weekdays-grid[_ngcontent-%COMP%]{display:-ms-grid;display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr))}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsEditAlert, [{
        type: Component,
        args: [{
                selector: "sq-edit-alert",
                templateUrl: "./edit-alert.html",
                styleUrls: ["./edit-alert.scss"]
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: i1.FormBuilder }, { type: i2.SearchService }, { type: i3.AlertsService }, { type: i4.ModalRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1hbGVydC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2FsZXJ0cy8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9lZGl0LWFsZXJ0L2VkaXQtYWxlcnQudHMiLCJib290c3RyYXAvZWRpdC1hbGVydC9lZGl0LWFsZXJ0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBcUIsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBeUIsV0FBVyxFQUFFLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRS9FLE9BQU8sRUFBVyxXQUFXLEVBQUUsV0FBVyxFQUFjLE1BQU0scUJBQXFCLENBQUM7QUFDcEYsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3pDLE9BQU8sRUFBZ0IsS0FBSyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7Ozs7Ozs7Ozs7Ozs7SUNJMUMsa0NBQTRFO0lBQUEsWUFBeUM7O0lBQUEsaUJBQVM7Ozs7SUFBM0UseUNBQXdCO0lBQUMsZUFBeUM7SUFBekMsK0VBQXlDOzs7O0lBTXJILGlDQUNJO0lBQUEsaUNBQ0E7SUFEc0YsME9BQXVDO0lBQTdILGlCQUNBO0lBQUEsZ0NBQW1FO0lBQUEsWUFBeUM7O0lBQUEsaUJBQU87SUFDdkgsaUJBQVE7Ozs7SUFGZ0QsZUFBaUM7SUFBakMseURBQWlDO0lBQ2xCLGVBQXlDO0lBQXpDLHlFQUF5Qzs7O0lBYXBILGlDQUNJO0lBQUEsNEJBQ0E7SUFBQSxnQ0FBbUU7SUFBQSxZQUEyQzs7SUFBQSxpQkFBTztJQUN6SCxpQkFBUTs7SUFEK0QsZUFBMkM7SUFBM0MsdUVBQTJDOzs7SUFHdEgsdUNBQTZIOzs7SUFBcEcsK0VBQXVEOztBRHJCeEYsTUFBTSxPQUFPLFdBQVc7SUE4QnBCLFlBQ2dDLEtBQTZDLEVBQ2pFLFdBQXdCLEVBQ3hCLGFBQTRCLEVBQzVCLGFBQTRCLEVBQzVCLFFB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QVE7UUFDbkQsK0JBQ0k7UUFBQSxtRUFHUTs7UUFDWixpQkFBTTtRQUNWLGlCQUFNO1FBQ04sK0JBQ0k7UUFBQSxrQ0FBd0I7UUFBQSxhQUFxQzs7UUFBQSxpQkFBUTtRQUNyRSw2QkFDSjtRQUFBLGlCQUFNO1FBQ04sK0JBQ0k7UUFBQSxrQ0FDSTtRQUFBLDZCQUNBO1FBQUEsaUNBQW1FO1FBQUEsYUFBc0M7O1FBQUEsaUJBQU87UUFDcEgsaUJBQVE7UUFDUixtRUFHUTtRQUNaLGlCQUFNO1FBQ04seUZBQTZIO1FBQ2pJLGlCQUFXO1FBQ2YsaUJBQU87O1FBckMyQixvQ0FBa0I7UUFDdEMsZUFBK0I7UUFBL0IsNkNBQStCLHdCQUFBO1FBRVYsZUFBb0M7UUFBcEMsaUVBQW9DO1FBQ3BELGVBQXFCO1FBQXJCLHVDQUFxQjtRQUdBLGVBQXlDO1FBQXpDLHVFQUF5QztRQUU5QixlQUFjO1FBQWQseUNBQWM7UUFJOUMsZUFBb0M7UUFBcEMsa0VBQW9DO1FBRWhCLGVBQXFDO1FBQXJDLGlGQUFxQztRQU94QyxlQUFxQztRQUFyQyxtRUFBcUM7UUFNVSxlQUFzQztRQUF0QyxvRUFBc0M7UUFFckcsZUFBb0I7UUFBcEIseUNBQW9CO1FBS2tELGVBQXNCO1FBQXRCLDJDQUFzQjs7a0REckJuRyxXQUFXO2NBTHZCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsV0FBVyxFQUFFLG1CQUFtQjtnQkFDaEMsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUM7YUFDbkM7O3NCQWdDUSxNQUFNO3VCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIEluamVjdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Rm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnN9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge01vZGFsUmVmLCBNT0RBTF9NT0RFTCwgTW9kYWxCdXR0b24sIE1vZGFsUmVzdWx0fSBmcm9tIFwiQHNpbmVxdWEvY29yZS9tb2RhbFwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHtBbGVydHNTZXJ2aWNlLCBBbGVydH0gZnJvbSBcIi4uLy4uL2FsZXJ0cy5zZXJ2aWNlXCI7XG5pbXBvcnQge1NlYXJjaFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3NlYXJjaFwiO1xuaW1wb3J0IHtLZXlWYWx1ZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1lZGl0LWFsZXJ0XCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9lZGl0LWFsZXJ0Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vZWRpdC1hbGVydC5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEJzRWRpdEFsZXJ0IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIGZvcm06IEZvcm1Hcm91cDtcbiAgICBmb3JtQ2hhbmdlczogU3Vic2NyaXB0aW9uO1xuICAgIGJ1dHRvbnM6IE1vZGFsQnV0dG9uW107XG4gICAgZnJlcXVlbmNpZXM6IEFsZXJ0LkZyZXF1ZW5jeVtdO1xuICAgIGZyZXF1ZW5jeTogdHlwZW9mIEFsZXJ0LkZyZXF1ZW5jeTtcbiAgICBjYW5VcGRhdGVRdWVyeTogYm9vbGVhbjtcbiAgICB1cGRhdGVRdWVyeTogYm9vbGVhbjtcbiAgICB3ZWVrZGF5cyA9IHtcbiAgICAgICAgJ21vbmRheSc6IEFsZXJ0LkRheXMuTW9uZGF5LCBcbiAgICAgICAgJ3R1ZXNkYXknOiBBbGVydC5EYXlzLlR1ZXNkYXksXG4gICAgICAgICd3ZWRuZXNkYXknOiBBbGVydC5EYXlzLldlZG5lc2RheSxcbiAgICAgICAgJ3RodXJzZGF5JzogQWxlcnQuRGF5cy5UaHVyc2RheSxcbiAgICAgICAgJ2ZyaWRheSc6IEFsZXJ0LkRheXMuRnJpZGF5LFxuICAgICAgICAnc2F0dXJkYXknOiBBbGVydC5EYXlzLlNhdHVyZGF5LFxuICAgICAgICAnc3VuZGF5JzogQWxlcnQuRGF5cy5TdW5kYXlcbiAgICB9O1xuICAgIFxuICAgIHNob3dEaXJ0eU1lc3NhZ2UgPSBmYWxzZTtcbiAgICBcbiAgICAvLyBQcmVzZXJ2ZSBvcmlnaW5hbCBwcm9wZXJ0eSBvcmRlclxuICAgIG9yaWdpbmFsT3JkZXIgPSAoYTogS2V5VmFsdWU8c3RyaW5nLCBBbGVydC5EYXlzPiwgYjogS2V5VmFsdWU8c3RyaW5nLCBBbGVydC5EYXlzPik6IG51bWJlciA9PiAwXG4gICAgXG4gICAgcHJpdmF0ZSBhbGVydERheXNDb250cm9sOiBGb3JtQ29udHJvbDtcbiAgICBwcml2YXRlIGFsZXJ0TmFtZUNvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIHByaXZhdGUgYWxlcnRGcmVxdWVuY3lDb250cm9sOiBGb3JtQ29udHJvbDtcbiAgICBwcml2YXRlIGFsZXJ0VGltZXNDb250cm9sOiBGb3JtQ29udHJvbDtcbiAgICBwcml2YXRlIGFsZXJ0QWN0aXZlQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgcHJpdmF0ZSB1cGRhdGVRdWVyeUNvbnRyb2w6IEZvcm1Db250cm9sO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoTU9EQUxfTU9ERUwpIHB1YmxpYyBtb2RlbDogeyBhbGVydDogQWxlcnQsIHNlYXJjaFJvdXRlPzogc3RyaW5nIH0sXG4gICAgICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgICAgICBwcml2YXRlIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgYWxlcnRzU2VydmljZTogQWxlcnRzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFJlZjogTW9kYWxSZWYpIHtcbiAgICAgICAgdGhpcy5mcmVxdWVuY2llcyA9IFtcbiAgICAgICAgICAgIEFsZXJ0LkZyZXF1ZW5jeS5EYWlseSxcbiAgICAgICAgICAgIEFsZXJ0LkZyZXF1ZW5jeS5Ib3VybHksXG4gICAgICAgICAgICBBbGVydC5GcmVxdWVuY3kuSW1tZWRpYXRlLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLmZyZXF1ZW5jeSA9IEFsZXJ0LkZyZXF1ZW5jeTtcbiAgICB9XG5cbiAgICBnZXQgYWxlcnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLmFsZXJ0O1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMuYWxlcnQuZGF5cykge1xuICAgICAgICAgICAgdGhpcy5hbGVydC5kYXlzID0gQWxlcnQuRGF5cy5Ob25lO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FuVXBkYXRlUXVlcnkgPSAoISF0aGlzLmFsZXJ0c1NlcnZpY2UuYWxlcnQodGhpcy5hbGVydC5uYW1lKSkgJiZcbiAgICAgICAgICAgICEhdGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHMgJiYgISF0aGlzLnNlYXJjaFNlcnZpY2UucmVzdWx0cy5yZWNvcmRzO1xuXG4gICAgICAgIHRoaXMuYWxlcnREYXlzQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCh0aGlzLmFsZXJ0LmRheXMpO1xuICAgICAgICB0aGlzLmFsZXJ0TmFtZUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wodGhpcy5hbGVydC5uYW1lLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICAgICAgdGhpcy5hbGVydEZyZXF1ZW5jeUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wodGhpcy5hbGVydC5mcmVxdWVuY3kpO1xuICAgICAgICB0aGlzLmFsZXJ0VGltZXNDb250cm9sID0gbmV3IEZvcm1Db250cm9sKHRoaXMuYWxlcnQudGltZXMpOyAvLyBUT0RPIHZhbGlkYXRvclxuICAgICAgICB0aGlzLmFsZXJ0QWN0aXZlQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCh0aGlzLmFsZXJ0LmFjdGl2ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlUXVlcnlDb250cm9sID0gbmV3IEZvcm1Db250cm9sKHRoaXMudXBkYXRlUXVlcnkpO1xuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIGFsZXJ0TmFtZTogdGhpcy5hbGVydE5hbWVDb250cm9sLFxuICAgICAgICAgICAgYWxlcnRGcmVxdWVuY3k6IHRoaXMuYWxlcnRGcmVxdWVuY3lDb250cm9sLFxuICAgICAgICAgICAgYWxlcnRUaW1lczogdGhpcy5hbGVydFRpbWVzQ29udHJvbCxcbiAgICAgICAgICAgIGFsZXJ0QWN0aXZlOiB0aGlzLmFsZXJ0QWN0aXZlQ29udHJvbCxcbiAgICAgICAgICAgIHVwZGF0ZVF1ZXJ5OiB0aGlzLnVwZGF0ZVF1ZXJ5Q29udHJvbFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5mb3JtQ2hhbmdlcyA9IFV0aWxzLnN1YnNjcmliZSh0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLFxuICAgICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydC5uYW1lID0gdGhpcy5hbGVydE5hbWVDb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnQuZnJlcXVlbmN5ID0gdGhpcy5hbGVydEZyZXF1ZW5jeUNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydC50aW1lcyA9IHRoaXMuYWxlcnRUaW1lc0NvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydC5hY3RpdmUgPSB0aGlzLmFsZXJ0QWN0aXZlQ29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0LmRheXMgPSB0aGlzLmFsZXJ0RGF5c0NvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVRdWVyeSA9IHRoaXMudXBkYXRlUXVlcnlDb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b25zKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVCdXR0b25zKCkge1xuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBbXG4gICAgICAgICAgICBuZXcgTW9kYWxCdXR0b24oe1xuICAgICAgICAgICAgICAgIHRleHQ6IFwibXNnI2VkaXRBbGVydC5ydW5RdWVyeVwiLFxuICAgICAgICAgICAgICAgIHJlc3VsdDogTW9kYWxSZXN1bHQuQ3VzdG9tLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogKGJ1dHRvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1blF1ZXJ5KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWxSZWYuY2xvc2UoTW9kYWxSZXN1bHQuQ2FuY2VsKTsgLy8gZGlzbWlzcyB0aGUgZGlhbG9nIHRvbyAoPylcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpc2libGU6ICEhdGhpcy5hbGVydHNTZXJ2aWNlLmFsZXJ0KHRoaXMuYWxlcnQubmFtZSlcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmV3IE1vZGFsQnV0dG9uKHtcbiAgICAgICAgICAgICAgICByZXN1bHQ6IE1vZGFsUmVzdWx0Lk9LLFxuICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWUsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbjogdGhpcy5mb3JtLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogKGJ1dHRvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51cGRhdGVRdWVyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGVydHNTZXJ2aWNlLnNldEFsZXJ0VG9DdXJyZW50UXVlcnkodGhpcy5hbGVydCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBNb2RhbEJ1dHRvbih7XG4gICAgICAgICAgICAgICAgcmVzdWx0OiBNb2RhbFJlc3VsdC5DYW5jZWwsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiAoYnV0dG9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm0uZGlydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5yZXN1bHQgPSBNb2RhbFJlc3VsdC5DdXN0b207XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dEaXJ0eU1lc3NhZ2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVZZXNOb0J1dHRvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIF07XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlWWVzTm9CdXR0b25zKCkge1xuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBbXG4gICAgICAgICAgICBuZXcgTW9kYWxCdXR0b24oe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogTW9kYWxSZXN1bHQuWWVzLFxuICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBNb2RhbEJ1dHRvbih7XG4gICAgICAgICAgICAgICAgcmVzdWx0OiBNb2RhbFJlc3VsdC5ObyxcbiAgICAgICAgICAgICAgICBhY3Rpb246IChidXR0b24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLnJlc3VsdCA9IE1vZGFsUmVzdWx0LkN1c3RvbTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RGlydHlNZXNzYWdlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQnV0dG9ucygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIF07XG4gICAgfVxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmZvcm1DaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgZGF5Q2hlY2tlZChkYXk6IEFsZXJ0LkRheXMpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmFsZXJ0LmRheXMgJiBkYXkpICE9PSAwO1xuICAgIH1cblxuICAgIGRheUNoYW5nZShldmVudDogVUlFdmVudCwgZGF5OiBBbGVydC5EYXlzKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgIGlmIChpbnB1dC5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0RGF5c0NvbnRyb2wuc2V0VmFsdWUodGhpcy5hbGVydC5kYXlzIHw9IGRheSk7XG4gICAgICAgICAgICAvLyB0aGlzLmFsZXJ0LmRheXMgfD0gZGF5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hbGVydERheXNDb250cm9sLnNldFZhbHVlKHRoaXMuYWxlcnQuZGF5cyAmPSB+ZGF5KTtcbiAgICAgICAgICAgIC8vIHRoaXMuYWxlcnQuZGF5cyAmPSB+ZGF5O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9ybS5tYXJrQXNEaXJ0eSgpO1xuICAgIH1cblxuICAgIHJ1blF1ZXJ5KCkge1xuICAgICAgICB0aGlzLmFsZXJ0c1NlcnZpY2Uuc2VhcmNoQWxlcnQodGhpcy5hbGVydCwgdGhpcy5tb2RlbC5zZWFyY2hSb3V0ZSk7XG4gICAgfVxufSIsIjxmb3JtIG5hbWU9XCJlZGl0QWxlcnRcIiBub3ZhbGlkYXRlIFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgIDxzcS1tb2RhbCBbdGl0bGVdPVwiJ21zZyNlZGl0QWxlcnQudGl0bGUnXCIgW2J1dHRvbnNdPVwiYnV0dG9uc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBzcS1mb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiYWxlcnROYW1lXCI+e3snbXNnI2VkaXRBbGVydC5uYW1lJyB8IHNxTWVzc2FnZX19PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBbc3FWYWxpZGF0aW9uXT1cImZvcm1cIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJhbGVydE5hbWVcIiBmb3JtQ29udHJvbE5hbWU9XCJhbGVydE5hbWVcIiBhdXRvY29tcGxldGU9XCJvZmZcIiBzcGVsbGNoZWNrPVwib2ZmXCIgc3FBdXRvZm9jdXM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImFsZXJ0RnJlcXVlbmN5XCI+e3snbXNnI2VkaXRBbGVydC5mcmVxdWVuY3knIHwgc3FNZXNzYWdlfX08L2xhYmVsPlxuICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBjdXN0b20tc2VsZWN0XCIgaWQ9XCJhbGVydEZyZXF1ZW5jeVwiIGZvcm1Db250cm9sTmFtZT1cImFsZXJ0RnJlcXVlbmN5XCI+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgZnJlcXVlbmN5VmFsdWUgb2YgZnJlcXVlbmNpZXNcIiBbdmFsdWVdPVwiZnJlcXVlbmN5VmFsdWVcIj57e2ZyZXF1ZW5jeVtmcmVxdWVuY3lWYWx1ZV0gfCBzcU1lc3NhZ2V9fTwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgPGxhYmVsPnt7J21zZyNlZGl0QWxlcnQuZGF5cycgfCBzcU1lc3NhZ2V9fTwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid2Vla2RheXMtZ3JpZFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCAqbmdGb3I9XCJsZXQgZGF5IG9mIHdlZWtkYXlzIHwga2V5dmFsdWU6IG9yaWdpbmFsT3JkZXJcIiBjbGFzcz1cImN1c3RvbS1jb250cm9sIGN1c3RvbS1jb250cm9sLWlubGluZSBjdXN0b20tY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wtaW5wdXRcIiB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJkYXlDaGVja2VkKGRheS52YWx1ZSlcIiAoY2hhbmdlKT1cImRheUNoYW5nZSgkZXZlbnQsIGRheS52YWx1ZSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjdXN0b20tY29udHJvbC1sYWJlbCB1c2VyLXNlbGVjdC1ub25lIGN1cnNvci1wb2ludGVyXCI+e3sgJ21zZyNlZGl0QWxlcnQuJytkYXkua2V5IHwgc3FNZXNzYWdlfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJhbGVydFRpbWVzXCI+e3snbXNnI2VkaXRBbGVydC50aW1lcycgfCBzcU1lc3NhZ2V9fTwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwiYWxlcnRUaW1lc1wiIGZvcm1Db250cm9sTmFtZT1cImFsZXJ0VGltZXNcIiBhdXRvY29tcGxldGU9XCJvZmZcIiBzcGVsbGNoZWNrPVwib2ZmXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wgY3VzdG9tLWNvbnRyb2wtaW5saW5lIGN1c3RvbS1jaGVja2JveFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImN1c3RvbS1jb250cm9sLWlucHV0XCIgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJhbGVydEFjdGl2ZVwiIGZvcm1Db250cm9sTmFtZT1cImFsZXJ0QWN0aXZlXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjdXN0b20tY29udHJvbC1sYWJlbCB1c2VyLXNlbGVjdC1ub25lIGN1cnNvci1wb2ludGVyXCI+e3snbXNnI2VkaXRBbGVydC5hY3RpdmUnIHwgc3FNZXNzYWdlfX08L3NwYW4+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsICpuZ0lmPVwiY2FuVXBkYXRlUXVlcnlcIiBjbGFzcz1cImN1c3RvbS1jb250cm9sIGN1c3RvbS1jb250cm9sLWlubGluZSBjdXN0b20tY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJjdXN0b20tY29udHJvbC1pbnB1dFwiIHR5cGU9XCJjaGVja2JveFwiIGlkPVwidXBkYXRlUXVlcnlcIiBmb3JtQ29udHJvbE5hbWU9XCJ1cGRhdGVRdWVyeVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wtbGFiZWwgdXNlci1zZWxlY3Qtbm9uZSBjdXJzb3ItcG9pbnRlclwiPnt7J21zZyNlZGl0QWxlcnQudXBkYXRlUXVlcnknIHwgc3FNZXNzYWdlfX08L3NwYW4+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHNxLWFsZXJ0LW1lc3NhZ2UgZm9vdGVyIFttZXNzYWdlXT1cIidtc2cjZWRpdEFsZXJ0Lmxvc3NEYXRhTWVzc2FnZScgfCBzcU1lc3NhZ2VcIiAqbmdJZj1cInNob3dEaXJ0eU1lc3NhZ2VcIj48L3NxLWFsZXJ0LW1lc3NhZ2U+XG4gICAgPC9zcS1tb2RhbD5cbjwvZm9ybT4iXX0=