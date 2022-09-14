import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { Utils } from "@sinequa/core/base";
import { ModalButton, MODAL_MODEL } from "@sinequa/core/modal";
import { ExportSourceType, ExportOutputFormat } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@sinequa/core/app-utils";
import * as i3 from "@sinequa/components/selection";
import * as i4 from "../../saved-queries.service";
import * as i5 from "@sinequa/core/validation";
import * as i6 from "@sinequa/core/notification";
import * as i7 from "@sinequa/core/modal";
import * as i8 from "@sinequa/components/modal";
import * as i9 from "@sinequa/components/utils";
import * as i10 from "@angular/common";
import * as i11 from "@sinequa/core/intl";
function BsExportQuery_option_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const format_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", format_r3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r0.outputFormats[format_r3].toUpperCase());
} }
function BsExportQuery_option_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", column_r4);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(column_r4);
} }
function BsExportQuery_div_21_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelementStart(1, "label", 12);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div");
    i0.ɵɵelementStart(5, "div", 13);
    i0.ɵɵelementStart(6, "label", 14);
    i0.ɵɵelementStart(7, "input", 15);
    i0.ɵɵlistener("change", function BsExportQuery_div_21_Template_input_change_7_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.sourceChanged($event, ctx_r5.sourceTypes.Result); });
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 13);
    i0.ɵɵelementStart(11, "label", 14);
    i0.ɵɵelementStart(12, "input", 16);
    i0.ɵɵlistener("change", function BsExportQuery_div_21_Template_input_change_12_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.sourceChanged($event, ctx_r7.sourceTypes.Selection); });
    i0.ɵɵelementEnd();
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 6, "msg#exportQuery.dialogSourceType"));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("checked", ctx_r2.sourceChosen(ctx_r2.sourceTypes.Result));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(9, 8, "msg#exportQuery.dialogResult"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("checked", ctx_r2.sourceChosen(ctx_r2.sourceTypes.Selection))("disabled", !ctx_r2.hasSelectedRecords());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(14, 10, "msg#exportQuery.dialogSelection"), " ");
} }
const _c0 = function (a0) { return { count: a0 }; };
const _c1 = function (a0) { return { values: a0 }; };
/**
 * Component representing the Export dialog where user can customize the query export action.
 *
 */
export class BsExportQuery {
    constructor(model, formBuilder, appService, selectionService, savedQueriesService, validationService, notificationsService, changeDetectorRef, modalRef) {
        this.model = model;
        this.formBuilder = formBuilder;
        this.appService = appService;
        this.selectionService = selectionService;
        this.savedQueriesService = savedQueriesService;
        this.validationService = validationService;
        this.notificationsService = notificationsService;
        this.changeDetectorRef = changeDetectorRef;
        this.modalRef = modalRef;
        this.supportedFormats = [
            ExportOutputFormat.Csv,
            ExportOutputFormat.Xlsx,
            ExportOutputFormat.Json
        ];
        this.outputFormats = ExportOutputFormat;
        this.sourceTypes = ExportSourceType;
        this.maxCount = 1000; // Default max count hard coded in web service
    }
    ngOnInit() {
        this.savedQueries = [];
        for (const query of this.savedQueriesService.savedqueries) {
            this.savedQueries.push(query.name);
        }
        this.exportableColumns = [];
        if (this.appService.app) {
            const queryExportConfig = this.getDefaultQueryExportConfig(this.appService.app);
            const columns = (queryExportConfig.columns && queryExportConfig.columns['column$']) || [];
            for (const column of columns) {
                this.exportableColumns.push(column.title);
            }
            if (queryExportConfig.maxCount && Utils.isNumber(queryExportConfig.maxCount)) {
                this.maxCount = queryExportConfig.maxCount;
            }
        }
        this.form = this.formBuilder.group({
            'format': [this.supportedFormats[0]],
            'exportedColumns': [this.model.exportedColumns],
            'export': [this.model.export, Validators.required],
            'maxCount': [this.model.maxCount, Validators.compose([
                    this.validationService.integerValidator(),
                    this.validationService.minValidator(1)
                ])],
        });
        this.isDownloading = false;
        this.buttons = [
            new ModalButton({
                text: "msg#exportQuery.btnDownload",
                result: 0 /* Custom */,
                anchor: true,
                primary: true,
                action: (_button) => {
                    const observable = this.savedQueriesService.download(this.model);
                    if (observable) {
                        Utils.subscribe(observable, (response) => {
                            console.log('exportQuery.download done.');
                            this.notificationsService.info('msg#exportQuery.successNotification');
                            this.modalRef.close(-1 /* OK */);
                            return response;
                        }, (error) => {
                            console.log('exportQuery.download failure - error: ', error);
                            this.modalRef.close(error);
                        });
                        this.isDownloading = true;
                        this.changeDetectorRef.markForCheck();
                    }
                },
            }),
            new ModalButton({
                result: -2 /* Cancel */,
            })
        ];
        const onFormChanged = () => {
            const newFormat = this.form.value['format'];
            const newMaxCount = this.form.value['maxCount'];
            const newExportedColumns = this.form.value['exportedColumns'];
            if (this.model.format !== newFormat) {
                this.model.format = newFormat;
            }
            if (this.model.maxCount !== newMaxCount) {
                this.model.maxCount = newMaxCount;
            }
            this.model.exportedColumns = newExportedColumns;
        };
        this.formChanges = Utils.subscribe(this.form.valueChanges, onFormChanged);
    }
    ngOnDestroy() {
        if (this.formChanges) {
            this.formChanges.unsubscribe();
        }
    }
    getDefaultQueryExportConfig(app) {
        let queryExport = app.queryExport;
        if (queryExport.indexOf(',') !== -1) {
            queryExport = queryExport.substring(0, queryExport.indexOf(','));
        }
        return Utils.getField(app.webServices, queryExport);
    }
    /**
     * Check if the client has selected some records.
     *
     * @returns true if the client has selected some records.
     */
    hasSelectedRecords() {
        return this.selectionService.haveSelectedRecords;
    }
    /**
     * Checks if the user chosen export source is the same as the given one.
     * <p>
     * Used to control the radio button state.
     *
     * @param type The source to check.
     * @returns true if the user chosen export source is the same as the given one.
     */
    sourceChosen(type) {
        return (this.model.export & type) !== 0;
    }
    /**
     * Callback called when user chooses a new export source.
     *
     * @param event The related UI event.
     * @param type The new chosen source.
     */
    sourceChanged(event, type) {
        const input = event.target;
        if (input.checked) {
            this.model.export = type;
        }
    }
    /**
     * Checks if the dialog allows user to choose export source.
     * Generally, it returns false when the input model export type is already saved query.
     *
     * @returns true if the dialog allows user to choose export source.
     */
    showSourceChooser() {
        return !this.sourceChosen(ExportSourceType.SavedQuery);
    }
}
BsExportQuery.ɵfac = function BsExportQuery_Factory(t) { return new (t || BsExportQuery)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AppService), i0.ɵɵdirectiveInject(i3.SelectionService), i0.ɵɵdirectiveInject(i4.SavedQueriesService), i0.ɵɵdirectiveInject(i5.ValidationService), i0.ɵɵdirectiveInject(i6.NotificationsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i7.ModalRef)); };
BsExportQuery.ɵcmp = i0.ɵɵdefineComponent({ type: BsExportQuery, selectors: [["sq-export-query"]], decls: 22, vars: 30, consts: [["name", "exportQuery", "novalidate", "", 3, "formGroup"], [3, "title", "buttons", "isProcessingState"], [1, "form-group", "sq-form-group"], ["for", "format"], ["formControlName", "format", "id", "format", "sqAutofocus", "", 1, "form-control", "custom-select", 3, "sqValidation"], [3, "value", 4, "ngFor", "ngForOf"], ["for", "exportedColumns", 3, "title"], ["id", "exportedColumns", "formControlName", "exportedColumns", "sqAutofocus", "", "multiple", "", 1, "form-control", "custom-select", 3, "sqValidation"], ["for", "maxCount", 3, "title"], ["type", "number", "id", "maxCount", "formControlName", "maxCount", "autocomplete", "off", "spellcheck", "off", 1, "form-control", 3, "sqValidation"], ["class", "form-group sq-form-group", 4, "ngIf"], [3, "value"], ["for", "export"], [1, "form-check", "form-check-inline"], [1, "form-check-label"], ["type", "radio", 1, "form-check-input", 3, "checked", "change"], ["type", "radio", 1, "form-check-input", 3, "checked", "disabled", "change"]], template: function BsExportQuery_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "sq-modal", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "label", 3);
        i0.ɵɵtext(4);
        i0.ɵɵpipe(5, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "select", 4);
        i0.ɵɵtemplate(7, BsExportQuery_option_7_Template, 2, 2, "option", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "div", 2);
        i0.ɵɵelementStart(9, "label", 6);
        i0.ɵɵpipe(10, "sqMessage");
        i0.ɵɵtext(11);
        i0.ɵɵpipe(12, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "select", 7);
        i0.ɵɵtemplate(14, BsExportQuery_option_14_Template, 2, 2, "option", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "div", 2);
        i0.ɵɵelementStart(16, "label", 8);
        i0.ɵɵpipe(17, "sqMessage");
        i0.ɵɵtext(18);
        i0.ɵɵpipe(19, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(20, "input", 9);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(21, BsExportQuery_div_21_Template, 15, 12, "div", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("title", "msg#exportQuery.dialogTitle")("buttons", ctx.buttons)("isProcessingState", ctx.isDownloading);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 15, "msg#exportQuery.dialogOutputFormat"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("sqValidation", ctx.form);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.supportedFormats);
        i0.ɵɵadvance(2);
        i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(10, 17, "msg#exportQuery.exportedColumnsLabelTooltip"));
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(12, 19, "msg#exportQuery.exportedColumns"), "\u00A0\u24D8 ");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("sqValidation", ctx.form);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.exportableColumns);
        i0.ɵɵadvance(2);
        i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind2(17, 21, "msg#exportQuery.dialogMaxCountTooltip", i0.ɵɵpureFunction1(28, _c1, i0.ɵɵpureFunction1(26, _c0, ctx.maxCount))));
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(19, 24, "msg#exportQuery.dialogMaxCount"), "\u00A0\u24D8");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("sqValidation", ctx.form);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showSourceChooser());
    } }, directives: [i1.ɵangular_packages_forms_forms_y, i1.NgControlStatusGroup, i1.FormGroupDirective, i8.BsModal, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.FormControlName, i9.Autofocus, i5.ValidationDirective, i10.NgForOf, i1.SelectMultipleControlValueAccessor, i1.NumberValueAccessor, i1.DefaultValueAccessor, i10.NgIf, i1.NgSelectOption, i1.ɵangular_packages_forms_forms_x], pipes: [i11.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsExportQuery, [{
        type: Component,
        args: [{
                selector: 'sq-export-query',
                templateUrl: './export-query.html'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: i1.FormBuilder }, { type: i2.AppService }, { type: i3.SelectionService }, { type: i4.SavedQueriesService }, { type: i5.ValidationService }, { type: i6.NotificationsService }, { type: i0.ChangeDetectorRef }, { type: i7.ModalRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LXF1ZXJ5LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc2F2ZWQtcXVlcmllcy8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9leHBvcnQtcXVlcnkvZXhwb3J0LXF1ZXJ5LnRzIiwiYm9vdHN0cmFwL2V4cG9ydC1xdWVyeS9leHBvcnQtcXVlcnkuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBRXZGLE9BQU8sRUFBMEIsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJcEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzNDLE9BQU8sRUFBWSxXQUFXLEVBQWUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixFQUFzQixNQUFNLDRCQUE0QixDQUFDOzs7Ozs7Ozs7Ozs7OztJQ0F0RixrQ0FBaUU7SUFBQSxZQUF5QztJQUFBLGlCQUFTOzs7O0lBQTNHLGlDQUFnQjtJQUF5QyxlQUF5QztJQUF6QyxtRUFBeUM7OztJQWlCMUcsa0NBQWtFO0lBQUEsWUFBWTtJQUFBLGlCQUFTOzs7SUFBL0UsaUNBQWdCO0lBQTBDLGVBQVk7SUFBWiwrQkFBWTs7OztJQVV0Riw4QkFDSTtJQUFBLGlDQUFvQjtJQUFBLFlBQW9EOztJQUFBLGlCQUFRO0lBQ2hGLDJCQUNJO0lBQUEsK0JBQ0k7SUFBQSxpQ0FDSTtJQUFBLGlDQUNBO0lBRDBGLDZOQUFvRDtJQUE5SSxpQkFDQTtJQUFBLFlBQ0o7O0lBQUEsaUJBQVE7SUFDWixpQkFBTTtJQUNOLGdDQUNJO0lBQUEsa0NBQ0k7SUFBQSxrQ0FFQTtJQUY2RixpT0FBdUQ7SUFBcEosaUJBRUE7SUFBQSxhQUNKOztJQUFBLGlCQUFRO0lBQ1osaUJBQU07SUFDVixpQkFBTTtJQUNWLGlCQUFNOzs7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O1FBQ04sbUVBaUJNO1FBQ1YsaUJBQVc7UUFDZixpQkFBTzs7UUF0RDZCLG9DQUFrQjtRQUU5QyxlQUF1QztRQUF2QyxxREFBdUMsd0JBQUEsd0NBQUE7UUFJZixlQUFzRDtRQUF0RCxpRkFBc0Q7UUFDbEUsZUFBcUI7UUFBckIsdUNBQXFCO1FBQ21CLGVBQW1CO1FBQW5CLDhDQUFtQjtRQU0vRCxlQUF1RTtRQUF2RSx3R0FBdUU7UUFFdkUsZUFDSjtRQURJLHNHQUNKO1FBSUksZUFBcUI7UUFBckIsdUNBQXFCO1FBSXVCLGVBQW9CO1FBQXBCLCtDQUFvQjtRQU1oRSxlQUE4RjtRQUE5RiwwS0FBOEY7UUFDakcsZUFBK0Q7UUFBL0QsbUdBQStEO1FBQ3pELGVBQXFCO1FBQXJCLHVDQUFxQjtRQUVPLGVBQXlCO1FBQXpCLDhDQUF5Qjs7a0REZDNELGFBQWE7Y0FKekIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFdBQVcsRUFBRSxxQkFBcUI7YUFDckM7O3NCQXNCUSxNQUFNO3VCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBJbmplY3QsIENoYW5nZURldGVjdG9yUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvdmFsaWRhdGlvblwiO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc1NlcnZpY2UgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9ub3RpZmljYXRpb25cIjtcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHsgTW9kYWxSZWYsIE1vZGFsQnV0dG9uLCBNb2RhbFJlc3VsdCwgTU9EQUxfTU9ERUwgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9tb2RhbFwiO1xuaW1wb3J0IHsgRXhwb3J0U291cmNlVHlwZSwgRXhwb3J0T3V0cHV0Rm9ybWF0LCBDQ1dlYlNlcnZpY2UsIENDQXBwfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7U2F2ZWRRdWVyaWVzU2VydmljZSwgRXhwb3J0UXVlcnlNb2RlbH0gZnJvbSBcIi4uLy4uL3NhdmVkLXF1ZXJpZXMuc2VydmljZVwiO1xuaW1wb3J0IHtTZWxlY3Rpb25TZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9zZWxlY3Rpb25cIjtcbmltcG9ydCB7IEFwcFNlcnZpY2UgfSBmcm9tICdAc2luZXF1YS9jb3JlL2FwcC11dGlscyc7XG5cbi8qKlxuICogQ29tcG9uZW50IHJlcHJlc2VudGluZyB0aGUgRXhwb3J0IGRpYWxvZyB3aGVyZSB1c2VyIGNhbiBjdXN0b21pemUgdGhlIHF1ZXJ5IGV4cG9ydCBhY3Rpb24uXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3NxLWV4cG9ydC1xdWVyeScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2V4cG9ydC1xdWVyeS5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBCc0V4cG9ydFF1ZXJ5IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgcHVibGljIHJlYWRvbmx5IHN1cHBvcnRlZEZvcm1hdHM6IEV4cG9ydE91dHB1dEZvcm1hdFtdID0gW1xuICAgICAgICBFeHBvcnRPdXRwdXRGb3JtYXQuQ3N2LFxuICAgICAgICBFeHBvcnRPdXRwdXRGb3JtYXQuWGxzeCxcbiAgICAgICAgRXhwb3J0T3V0cHV0Rm9ybWF0Lkpzb25cbiAgICBdO1xuICAgIHB1YmxpYyByZWFkb25seSBvdXRwdXRGb3JtYXRzOiB0eXBlb2YgRXhwb3J0T3V0cHV0Rm9ybWF0ID0gRXhwb3J0T3V0cHV0Rm9ybWF0O1xuICAgIHB1YmxpYyByZWFkb25seSBzb3VyY2VUeXBlczogdHlwZW9mIEV4cG9ydFNvdXJjZVR5cGUgPSBFeHBvcnRTb3VyY2VUeXBlO1xuXG4gICAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcbiAgICBwdWJsaWMgc2F2ZWRRdWVyaWVzOiBzdHJpbmdbXTtcbiAgICBwdWJsaWMgYnV0dG9uczogTW9kYWxCdXR0b25bXTtcbiAgICBwdWJsaWMgaXNEb3dubG9hZGluZzogYm9vbGVhbjtcbiAgICBwdWJsaWMgZXhwb3J0YWJsZUNvbHVtbnM6IHN0cmluZ1tdO1xuXG4gICAgcHJpdmF0ZSBmb3JtQ2hhbmdlczogU3Vic2NyaXB0aW9uO1xuXG4gICAgbWF4Q291bnQgPSAxMDAwOyAvLyBEZWZhdWx0IG1heCBjb3VudCBoYXJkIGNvZGVkIGluIHdlYiBzZXJ2aWNlXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChNT0RBTF9NT0RFTCkgcHVibGljIG1vZGVsOiBFeHBvcnRRdWVyeU1vZGVsLFxuICAgICAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICAgICAgcHJpdmF0ZSBhcHBTZXJ2aWNlOiBBcHBTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHNlbGVjdGlvblNlcnZpY2U6IFNlbGVjdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgc2F2ZWRRdWVyaWVzU2VydmljZTogU2F2ZWRRdWVyaWVzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB2YWxpZGF0aW9uU2VydmljZTogVmFsaWRhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uc1NlcnZpY2U6IE5vdGlmaWNhdGlvbnNTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHVibGljIG1vZGFsUmVmOiBNb2RhbFJlZikgeyB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zYXZlZFF1ZXJpZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBxdWVyeSBvZiB0aGlzLnNhdmVkUXVlcmllc1NlcnZpY2Uuc2F2ZWRxdWVyaWVzKSB7XG4gICAgICAgICAgICB0aGlzLnNhdmVkUXVlcmllcy5wdXNoKHF1ZXJ5Lm5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5leHBvcnRhYmxlQ29sdW1ucyA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLmFwcFNlcnZpY2UuYXBwKSB7XG4gICAgICAgICAgICBjb25zdCBxdWVyeUV4cG9ydENvbmZpZyA9IHRoaXMuZ2V0RGVmYXVsdFF1ZXJ5RXhwb3J0Q29uZmlnKHRoaXMuYXBwU2VydmljZS5hcHApO1xuICAgICAgICAgICAgY29uc3QgY29sdW1ucyA9IChxdWVyeUV4cG9ydENvbmZpZy5jb2x1bW5zICYmIHF1ZXJ5RXhwb3J0Q29uZmlnLmNvbHVtbnNbJ2NvbHVtbiQnXSkgfHwgW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBjb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBvcnRhYmxlQ29sdW1ucy5wdXNoKGNvbHVtbi50aXRsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihxdWVyeUV4cG9ydENvbmZpZy5tYXhDb3VudCAmJiBVdGlscy5pc051bWJlcihxdWVyeUV4cG9ydENvbmZpZy5tYXhDb3VudCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1heENvdW50ID0gcXVlcnlFeHBvcnRDb25maWcubWF4Q291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgICdmb3JtYXQnOiBbdGhpcy5zdXBwb3J0ZWRGb3JtYXRzWzBdXSxcbiAgICAgICAgICAgICdleHBvcnRlZENvbHVtbnMnOiBbdGhpcy5tb2RlbC5leHBvcnRlZENvbHVtbnNdLFxuICAgICAgICAgICAgJ2V4cG9ydCc6IFt0aGlzLm1vZGVsLmV4cG9ydCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICAnbWF4Q291bnQnOiBbdGhpcy5tb2RlbC5tYXhDb3VudCwgVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRpb25TZXJ2aWNlLmludGVnZXJWYWxpZGF0b3IoKSxcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRpb25TZXJ2aWNlLm1pblZhbGlkYXRvcigxKVxuICAgICAgICAgICAgXSldLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmlzRG93bmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBbXG4gICAgICAgICAgICBuZXcgTW9kYWxCdXR0b24oe1xuICAgICAgICAgICAgICAgIHRleHQ6IFwibXNnI2V4cG9ydFF1ZXJ5LmJ0bkRvd25sb2FkXCIsXG4gICAgICAgICAgICAgICAgcmVzdWx0OiBNb2RhbFJlc3VsdC5DdXN0b20sXG4gICAgICAgICAgICAgICAgYW5jaG9yOiB0cnVlLFxuICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWUsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiAoX2J1dHRvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5zYXZlZFF1ZXJpZXNTZXJ2aWNlLmRvd25sb2FkKHRoaXMubW9kZWwpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JzZXJ2YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuc3Vic2NyaWJlKG9ic2VydmFibGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8QmxvYj4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2V4cG9ydFF1ZXJ5LmRvd25sb2FkIGRvbmUuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uc1NlcnZpY2UuaW5mbygnbXNnI2V4cG9ydFF1ZXJ5LnN1Y2Nlc3NOb3RpZmljYXRpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RhbFJlZi5jbG9zZShNb2RhbFJlc3VsdC5PSyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXhwb3J0UXVlcnkuZG93bmxvYWQgZmFpbHVyZSAtIGVycm9yOiAnLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWxSZWYuY2xvc2UoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRG93bmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBNb2RhbEJ1dHRvbih7XG4gICAgICAgICAgICAgICAgcmVzdWx0OiBNb2RhbFJlc3VsdC5DYW5jZWwsXG4gICAgICAgICAgICB9KVxuICAgICAgICBdO1xuXG4gICAgICAgIGNvbnN0IG9uRm9ybUNoYW5nZWQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdGb3JtYXQgPSB0aGlzLmZvcm0udmFsdWVbJ2Zvcm1hdCddO1xuICAgICAgICAgICAgY29uc3QgbmV3TWF4Q291bnQgPSB0aGlzLmZvcm0udmFsdWVbJ21heENvdW50J107XG4gICAgICAgICAgICBjb25zdCBuZXdFeHBvcnRlZENvbHVtbnMgPSB0aGlzLmZvcm0udmFsdWVbJ2V4cG9ydGVkQ29sdW1ucyddO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5mb3JtYXQgIT09IG5ld0Zvcm1hdCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuZm9ybWF0ID0gbmV3Rm9ybWF0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5tYXhDb3VudCAhPT0gbmV3TWF4Q291bnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLm1heENvdW50ID0gbmV3TWF4Q291bnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubW9kZWwuZXhwb3J0ZWRDb2x1bW5zID0gbmV3RXhwb3J0ZWRDb2x1bW5zO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZm9ybUNoYW5nZXMgPSBVdGlscy5zdWJzY3JpYmUodGhpcy5mb3JtLnZhbHVlQ2hhbmdlcywgb25Gb3JtQ2hhbmdlZCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmZvcm1DaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1DaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERlZmF1bHRRdWVyeUV4cG9ydENvbmZpZyhhcHA6IENDQXBwKTogQ0NRdWVyeUV4cG9ydCB7XG4gICAgICAgIGxldCBxdWVyeUV4cG9ydCA9IGFwcC5xdWVyeUV4cG9ydDtcbiAgICAgICAgaWYgKHF1ZXJ5RXhwb3J0LmluZGV4T2YoJywnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHF1ZXJ5RXhwb3J0ID0gcXVlcnlFeHBvcnQuc3Vic3RyaW5nKDAsIHF1ZXJ5RXhwb3J0LmluZGV4T2YoJywnKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxDQ1F1ZXJ5RXhwb3J0PlV0aWxzLmdldEZpZWxkKGFwcC53ZWJTZXJ2aWNlcywgcXVlcnlFeHBvcnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBjbGllbnQgaGFzIHNlbGVjdGVkIHNvbWUgcmVjb3Jkcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgdGhlIGNsaWVudCBoYXMgc2VsZWN0ZWQgc29tZSByZWNvcmRzLlxuICAgICAqL1xuICAgIHB1YmxpYyBoYXNTZWxlY3RlZFJlY29yZHMoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblNlcnZpY2UuaGF2ZVNlbGVjdGVkUmVjb3JkcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIHVzZXIgY2hvc2VuIGV4cG9ydCBzb3VyY2UgaXMgdGhlIHNhbWUgYXMgdGhlIGdpdmVuIG9uZS5cbiAgICAgKiA8cD5cbiAgICAgKiBVc2VkIHRvIGNvbnRyb2wgdGhlIHJhZGlvIGJ1dHRvbiBzdGF0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0eXBlIFRoZSBzb3VyY2UgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiB0aGUgdXNlciBjaG9zZW4gZXhwb3J0IHNvdXJjZSBpcyB0aGUgc2FtZSBhcyB0aGUgZ2l2ZW4gb25lLlxuICAgICAqL1xuICAgIHB1YmxpYyBzb3VyY2VDaG9zZW4odHlwZTogRXhwb3J0U291cmNlVHlwZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHRoaXMubW9kZWwuZXhwb3J0ICYgdHlwZSkgIT09IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgY2FsbGVkIHdoZW4gdXNlciBjaG9vc2VzIGEgbmV3IGV4cG9ydCBzb3VyY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnQgVGhlIHJlbGF0ZWQgVUkgZXZlbnQuXG4gICAgICogQHBhcmFtIHR5cGUgVGhlIG5ldyBjaG9zZW4gc291cmNlLlxuICAgICAqL1xuICAgIHB1YmxpYyBzb3VyY2VDaGFuZ2VkKGV2ZW50OiBVSUV2ZW50LCB0eXBlOiBFeHBvcnRTb3VyY2VUeXBlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAoaW5wdXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5leHBvcnQgPSB0eXBlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBkaWFsb2cgYWxsb3dzIHVzZXIgdG8gY2hvb3NlIGV4cG9ydCBzb3VyY2UuXG4gICAgICogR2VuZXJhbGx5LCBpdCByZXR1cm5zIGZhbHNlIHdoZW4gdGhlIGlucHV0IG1vZGVsIGV4cG9ydCB0eXBlIGlzIGFscmVhZHkgc2F2ZWQgcXVlcnkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIHRoZSBkaWFsb2cgYWxsb3dzIHVzZXIgdG8gY2hvb3NlIGV4cG9ydCBzb3VyY2UuXG4gICAgICovXG4gICAgcHVibGljIHNob3dTb3VyY2VDaG9vc2VyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuc291cmNlQ2hvc2VuKEV4cG9ydFNvdXJjZVR5cGUuU2F2ZWRRdWVyeSk7XG4gICAgfVxufVxuXG5pbnRlcmZhY2UgQ0NRdWVyeUV4cG9ydENvbHVtbkRlZiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwYXR0ZXJuOiBzdHJpbmc7XG4gICAgc2VsZWN0aW9uUXVlcnk/OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBDQ1F1ZXJ5RXhwb3J0IGV4dGVuZHMgQ0NXZWJTZXJ2aWNlIHtcbiAgICB3ZWJTZXJ2aWNlVHlwZTogXCJxdWVyeWV4cG9ydFwiO1xuICAgIGNvbHVtbnM/OiBDQ1F1ZXJ5RXhwb3J0Q29sdW1uRGVmW107XG4gICAgbGlua3NGaWx0ZXJEdXBsaWNhdGVVcmxzPzogYm9vbGVhbjtcbiAgICBsaW5rc0dsb2JhbFJlbGV2YW5jZT86IHN0cmluZztcbiAgICBsaW5rc01heENvdW50PzogbnVtYmVyO1xuICAgIGxpbmtzU29ydEJ5T3JkZXI/OiBib29sZWFuO1xuICAgIG1heENvdW50PzogbnVtYmVyO1xuICAgIHNlcGFyYXRvcj86IHN0cmluZztcbn1cbiIsIjxmb3JtIG5hbWU9XCJleHBvcnRRdWVyeVwiIG5vdmFsaWRhdGUgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgPHNxLW1vZGFsXG4gICAgICAgIFt0aXRsZV09XCInbXNnI2V4cG9ydFF1ZXJ5LmRpYWxvZ1RpdGxlJ1wiXG4gICAgICAgIFtidXR0b25zXT1cImJ1dHRvbnNcIlxuICAgICAgICBbaXNQcm9jZXNzaW5nU3RhdGVdPVwiaXNEb3dubG9hZGluZ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBzcS1mb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZm9ybWF0XCI+e3sgJ21zZyNleHBvcnRRdWVyeS5kaWFsb2dPdXRwdXRGb3JtYXQnIHwgc3FNZXNzYWdlIH19PC9sYWJlbD5cbiAgICAgICAgICAgIDxzZWxlY3QgW3NxVmFsaWRhdGlvbl09XCJmb3JtXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgY3VzdG9tLXNlbGVjdFwiIGZvcm1Db250cm9sTmFtZT1cImZvcm1hdFwiIGlkPVwiZm9ybWF0XCIgc3FBdXRvZm9jdXM+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiBbdmFsdWVdPVwiZm9ybWF0XCIgKm5nRm9yPVwibGV0IGZvcm1hdCBvZiBzdXBwb3J0ZWRGb3JtYXRzXCI+e3sgb3V0cHV0Rm9ybWF0c1tmb3JtYXRdLnRvVXBwZXJDYXNlKCkgfX08L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgc3EtZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgICAgZm9yPVwiZXhwb3J0ZWRDb2x1bW5zXCJcbiAgICAgICAgICAgICAgICB0aXRsZT1cInt7ICdtc2cjZXhwb3J0UXVlcnkuZXhwb3J0ZWRDb2x1bW5zTGFiZWxUb29sdGlwJyB8IHNxTWVzc2FnZSB9fVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3sgJ21zZyNleHBvcnRRdWVyeS5leHBvcnRlZENvbHVtbnMnIHwgc3FNZXNzYWdlIH19Jm5ic3A7JiM5NDMyO1xuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICBpZD1cImV4cG9ydGVkQ29sdW1uc1wiXG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwiZXhwb3J0ZWRDb2x1bW5zXCJcbiAgICAgICAgICAgICAgICBbc3FWYWxpZGF0aW9uXT1cImZvcm1cIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIGN1c3RvbS1zZWxlY3RcIlxuICAgICAgICAgICAgICAgIHNxQXV0b2ZvY3VzIG11bHRpcGxlXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiBbdmFsdWVdPVwiY29sdW1uXCIgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBleHBvcnRhYmxlQ29sdW1uc1wiPnt7IGNvbHVtbiB9fTwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBzcS1mb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWwgXG4gICAgICAgICAgICAgICAgZm9yPVwibWF4Q291bnRcIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwie3sgJ21zZyNleHBvcnRRdWVyeS5kaWFsb2dNYXhDb3VudFRvb2x0aXAnIHwgc3FNZXNzYWdlOnt2YWx1ZXM6IHtjb3VudDogbWF4Q291bnR9IH0gfX1cIlxuICAgICAgICAgICAgPnt7ICdtc2cjZXhwb3J0UXVlcnkuZGlhbG9nTWF4Q291bnQnIHwgc3FNZXNzYWdlIH19Jm5ic3A7JiM5NDMyOzwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgW3NxVmFsaWRhdGlvbl09XCJmb3JtXCIgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJtYXhDb3VudFwiIGZvcm1Db250cm9sTmFtZT1cIm1heENvdW50XCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgc3BlbGxjaGVjaz1cIm9mZlwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgc3EtZm9ybS1ncm91cFwiICpuZ0lmPVwic2hvd1NvdXJjZUNob29zZXIoKVwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImV4cG9ydFwiPnt7ICdtc2cjZXhwb3J0UXVlcnkuZGlhbG9nU291cmNlVHlwZScgfCBzcU1lc3NhZ2UgfX08L2xhYmVsPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1jaGVjayBmb3JtLWNoZWNrLWlubGluZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWNoZWNrLWxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNoZWNrLWlucHV0XCIgdHlwZT1cInJhZGlvXCIgW2NoZWNrZWRdPVwic291cmNlQ2hvc2VuKHNvdXJjZVR5cGVzLlJlc3VsdClcIiAoY2hhbmdlKT1cInNvdXJjZUNoYW5nZWQoJGV2ZW50LCBzb3VyY2VUeXBlcy5SZXN1bHQpXCIgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgJ21zZyNleHBvcnRRdWVyeS5kaWFsb2dSZXN1bHQnIHwgc3FNZXNzYWdlIH19XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tY2hlY2sgZm9ybS1jaGVjay1pbmxpbmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1jaGVjay1sYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jaGVjay1pbnB1dFwiIHR5cGU9XCJyYWRpb1wiIFtjaGVja2VkXT1cInNvdXJjZUNob3Nlbihzb3VyY2VUeXBlcy5TZWxlY3Rpb24pXCIgKGNoYW5nZSk9XCJzb3VyY2VDaGFuZ2VkKCRldmVudCwgc291cmNlVHlwZXMuU2VsZWN0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiIWhhc1NlbGVjdGVkUmVjb3JkcygpXCIgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgJ21zZyNleHBvcnRRdWVyeS5kaWFsb2dTZWxlY3Rpb24nIHwgc3FNZXNzYWdlIH19XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9zcS1tb2RhbD5cbjwvZm9ybT5cbiJdfQ==