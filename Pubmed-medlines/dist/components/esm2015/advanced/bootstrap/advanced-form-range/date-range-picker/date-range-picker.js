import { Component, Input, ViewChild, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Utils } from "@sinequa/core/base";
import moment from "moment";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/intl";
import * as i2 from "@angular/common";
import * as i3 from "ngx-bootstrap/datepicker";
import * as i4 from "@angular/forms";
const _c0 = ["fromTo"];
const _c1 = ["from"];
const _c2 = ["to"];
function BsDateRangePicker_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelementStart(1, "div", 2);
    i0.ɵɵelementStart(2, "input", 3, 4);
    i0.ɵɵlistener("ngModelChange", function BsDateRangePicker_div_0_Template_input_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.updateFromTo($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("bsConfig", ctx_r0.bsFromToConfig())("ngModel", ctx_r0.value)("placeholder", ctx_r0.dateFormat);
} }
function BsDateRangePicker_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelementStart(1, "div", 5);
    i0.ɵɵelementStart(2, "input", 6, 7);
    i0.ɵɵlistener("ngModelChange", function BsDateRangePicker_div_1_Template_input_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.updateFrom($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 8);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 5);
    i0.ɵɵelementStart(8, "input", 9, 10);
    i0.ɵɵlistener("ngModelChange", function BsDateRangePicker_div_1_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.updateTo($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", ctx_r1.fromName)("bsConfig", ctx_r1.bsFromConfig())("ngModel", ctx_r1.value[0])("placeholder", ctx_r1.dateFormat);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 9, "msg#advanced.dateRangePicker.separator"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("id", ctx_r1.toName)("bsConfig", ctx_r1.bsToConfig())("ngModel", ctx_r1.value[1])("placeholder", ctx_r1.dateFormat);
} }
export const DATE_RANGE_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BsDateRangePicker),
    multi: true
};
export class BsDateRangePicker {
    constructor(intlService) {
        this.intlService = intlService;
        this.SystemFormat = 'YYYY-MM-DD';
        this.onChangeCallback = () => { };
    }
    ngOnInit() {
        if (!this.options) {
            this.options = {};
        }
        this.fromName = "from_" + this.options.name;
        this.toName = "to_" + this.options.name;
        if (!this.value) {
            this.value = [undefined, undefined];
        }
    }
    get dateFormat() {
        return this.options.system ? this.SystemFormat : moment.localeData().longDateFormat('L');
    }
    setLocale() {
        if (!!this.fromToPicker && this.fromToPicker.isOpen) {
            this.fromToPicker.hide();
            this.fromToPicker.show();
        }
        if (!!this.fromPicker && this.fromPicker.isOpen) {
            this.fromPicker.hide();
            this.fromPicker.show();
        }
        if (!!this.toPicker && this.toPicker.isOpen) {
            this.toPicker.hide();
            this.toPicker.show();
        }
    }
    ngAfterViewInit() {
        this.setLocale();
        this.localeChange = Utils.subscribe(this.intlService.events, (value) => {
            this.setLocale();
        });
    }
    ngOnDestroy() {
        if (this.localeChange) {
            this.localeChange.unsubscribe();
        }
    }
    //#region closedRange
    bsFromToConfig() {
        return {
            minDate: this.options.minDate,
            maxDate: this.options.maxDate,
            containerClass: 'theme-default',
            showWeekNumbers: false,
            rangeInputFormat: this.options.system ? this.SystemFormat : moment.localeData().longDateFormat('L')
        };
    }
    updateFromTo(fromTo) {
        this.setValue([!!fromTo ? fromTo[0] : undefined, !!fromTo ? fromTo[1] : undefined]);
        this.onChangeCallback(this.value);
    }
    bsFromConfig() {
        return {
            minDate: this.options.minDate,
            maxDate: this.maxDate,
            containerClass: 'theme-default',
            showWeekNumbers: false,
            dateInputFormat: this.options.system ? this.SystemFormat : moment.localeData().longDateFormat('L'),
        };
    }
    bsToConfig() {
        return {
            minDate: this.minDate,
            maxDate: this.options.maxDate,
            containerClass: 'theme-default',
            showWeekNumbers: false,
            dateInputFormat: this.options.system ? this.SystemFormat : moment.localeData().longDateFormat('L'),
        };
    }
    setMinMaxDate() {
        this.maxDate = this.value[1] || this.options.maxDate;
        this.minDate = this.value[0] || this.options.minDate;
    }
    resetMinMaxDate() {
        this.maxDate = this.options.maxDate;
        this.minDate = this.options.minDate;
    }
    updateFrom(from) {
        this.setValue([from, this.value[1]]);
        this.onChangeCallback(this.value);
    }
    updateTo(to) {
        this.setValue([this.value[0], to]);
        this.onChangeCallback(this.value);
    }
    //#endregion !closedRange
    zeroTimes() {
        if (this.value) {
            if (Utils.isDate(this.value[0])) {
                const date = this.value[0];
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
            }
            if (Utils.isDate(this.value[1])) {
                const date = this.value[1];
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
            }
        }
    }
    setValue(value) {
        if (!this.value || !value || !Utils.equals(this.value[0], value[0]) || !Utils.equals(this.value[1], value[1])) {
            if (!value) {
                value = [undefined, undefined];
            }
            else {
                value[0] = !!value[0] ? new Date(value[0]) : value[0];
                value[1] = !!value[1] ? new Date(value[1]) : value[1];
            }
            if (this.options.closedRange) {
                this.value = value;
                this.zeroTimes();
            }
            else {
                this.resetMinMaxDate();
                this.value = value;
                this.zeroTimes();
                this.setMinMaxDate();
            }
        }
    }
    //#region ControlValueAccessor
    writeValue(value) {
        this.setValue(value);
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
    }
}
BsDateRangePicker.ɵfac = function BsDateRangePicker_Factory(t) { return new (t || BsDateRangePicker)(i0.ɵɵdirectiveInject(i1.IntlService)); };
BsDateRangePicker.ɵcmp = i0.ɵɵdefineComponent({ type: BsDateRangePicker, selectors: [["sq-date-range-picker"]], viewQuery: function BsDateRangePicker_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
        i0.ɵɵviewQuery(_c1, true);
        i0.ɵɵviewQuery(_c2, true);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fromToPicker = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fromPicker = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.toPicker = _t.first);
    } }, inputs: { options: "options" }, features: [i0.ɵɵProvidersFeature([DATE_RANGE_PICKER_VALUE_ACCESSOR])], decls: 2, vars: 2, consts: [["class", "sq-date-range-picker form-row", 4, "ngIf"], [1, "sq-date-range-picker", "form-row"], [1, "col"], ["type", "text", "autocomplete", "off", "bsDaterangepicker", "", "triggers", "click", 1, "form-control", 3, "bsConfig", "ngModel", "placeholder", "ngModelChange"], ["fromTo", "bsDaterangepicker"], [1, "col-auto"], ["type", "text", "autocomplete", "off", "bsDatepicker", "", "triggers", "click", 1, "form-control", "sq-range-from", 3, "id", "bsConfig", "ngModel", "placeholder", "ngModelChange"], ["from", "bsDatepicker"], [1, "col-auto", "sq-separator"], ["type", "text", "autocomplete", "off", "bsDatepicker", "", "triggers", "click", 1, "form-control", "sq-range-to", 3, "id", "bsConfig", "ngModel", "placeholder", "ngModelChange"], ["to", "bsDatepicker"]], template: function BsDateRangePicker_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsDateRangePicker_div_0_Template, 4, 3, "div", 0);
        i0.ɵɵtemplate(1, BsDateRangePicker_div_1_Template, 10, 11, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.options.closedRange);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.options.closedRange);
    } }, directives: [i2.NgIf, i3.BsDaterangepickerInputDirective, i4.DefaultValueAccessor, i3.BsDaterangepickerDirective, i4.NgControlStatus, i4.NgModel, i3.BsDatepickerInputDirective, i3.BsDatepickerDirective], pipes: [i1.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsDateRangePicker, [{
        type: Component,
        args: [{
                selector: "sq-date-range-picker",
                template: `
        <div *ngIf="options.closedRange" class="sq-date-range-picker form-row">
            <div class="col">
                <input type="text" autocomplete="off" class="form-control" bsDaterangepicker triggers="click" #fromTo="bsDaterangepicker" [bsConfig]="bsFromToConfig()" [ngModel]="value" (ngModelChange)="updateFromTo($event)" [placeholder]="dateFormat"/>
            </div>
        </div>
        <div *ngIf="!options.closedRange" class="sq-date-range-picker form-row">
            <div class="col-auto">
                <input type="text" autocomplete="off" [id]="fromName" class="form-control sq-range-from" bsDatepicker triggers="click" #from="bsDatepicker" [bsConfig]="bsFromConfig()" [ngModel]="value[0]" (ngModelChange)="updateFrom($event)" [placeholder]="dateFormat"/>
            </div>
            <div class="col-auto sq-separator">{{'msg#advanced.dateRangePicker.separator' | sqMessage}}</div>
            <div class="col-auto">
                <input type="text" autocomplete="off" [id]="toName" class="form-control sq-range-to" bsDatepicker triggers="click" #to="bsDatepicker" [bsConfig]="bsToConfig()" [ngModel]="value[1]" (ngModelChange)="updateTo($event)" [placeholder]="dateFormat"/>
            </div>
        </div>
    `,
                providers: [DATE_RANGE_PICKER_VALUE_ACCESSOR]
            }]
    }], function () { return [{ type: i1.IntlService }]; }, { options: [{
            type: Input
        }], fromToPicker: [{
            type: ViewChild,
            args: ["fromTo", { static: false }]
        }], fromPicker: [{
            type: ViewChild,
            args: ["from", { static: false }]
        }], toPicker: [{
            type: ViewChild,
            args: ["to", { static: false }]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yYW5nZS1waWNrZXIuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9hZHZhbmNlZC8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9hZHZhbmNlZC1mb3JtLXJhbmdlL2RhdGUtcmFuZ2UtcGlja2VyL2RhdGUtcmFuZ2UtcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFvQyxTQUFTLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hHLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFHekMsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7OztJQWdCcEIsOEJBQ0k7SUFBQSw4QkFDSTtJQUFBLG1DQUNKO0lBRDhLLGtOQUFzQztJQUFoTixpQkFDSjtJQUFBLGlCQUFNO0lBQ1YsaUJBQU07OztJQUY0SCxlQUE2QjtJQUE3QixrREFBNkIseUJBQUEsa0NBQUE7Ozs7SUFHL0osOEJBQ0k7SUFBQSw4QkFDSTtJQUFBLG1DQUNKO0lBRGlNLGdOQUFvQztJQUFqTyxpQkFDSjtJQUFBLGlCQUFNO0lBQ04sOEJBQW1DO0lBQUEsWUFBd0Q7O0lBQUEsaUJBQU07SUFDakcsOEJBQ0k7SUFBQSxvQ0FDSjtJQUR5TCw4TUFBa0M7SUFBdk4saUJBQ0o7SUFBQSxpQkFBTTtJQUNWLGlCQUFNOzs7SUFOd0MsZUFBZTtJQUFmLG9DQUFlLG1DQUFBLDRCQUFBLGtDQUFBO0lBRXRCLGVBQXdEO0lBQXhELG9GQUF3RDtJQUVqRCxlQUFhO0lBQWIsa0NBQWEsaUNBQUEsNEJBQUEsa0NBQUE7O0FBeEJuRSxNQUFNLENBQUMsTUFBTSxnQ0FBZ0MsR0FBUTtJQUNqRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FB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RSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7WUFDQSxVQUFVO2tCQUE3QyxTQUFTO21CQUFDLE1BQU0sRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7WUFDQSxRQUFRO2tCQUF6QyxTQUFTO21CQUFDLElBQUksRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBWaWV3Q2hpbGQsIGZvcndhcmRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7SW50bFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL2ludGxcIjtcbmltcG9ydCB7QnNEYXRlcmFuZ2VwaWNrZXJEaXJlY3RpdmUsIEJzRGF0ZXJhbmdlcGlja2VyQ29uZmlnLCBCc0RhdGVwaWNrZXJEaXJlY3RpdmUsIEJzRGF0ZXBpY2tlckNvbmZpZ30gZnJvbSBcIm5neC1ib290c3RyYXAvZGF0ZXBpY2tlclwiO1xuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XG5pbXBvcnQgeyBEYXRlUGlja2VyT3B0aW9ucyB9IGZyb20gJy4uL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyJztcblxuZXhwb3J0IGNvbnN0IERBVEVfUkFOR0VfUElDS0VSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQnNEYXRlUmFuZ2VQaWNrZXIpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIERhdGVSYW5nZVBpY2tlck9wdGlvbnMgZXh0ZW5kcyBEYXRlUGlja2VyT3B0aW9ucyB7XG4gICAgY2xvc2VkUmFuZ2U/OiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1kYXRlLXJhbmdlLXBpY2tlclwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgKm5nSWY9XCJvcHRpb25zLmNsb3NlZFJhbmdlXCIgY2xhc3M9XCJzcS1kYXRlLXJhbmdlLXBpY2tlciBmb3JtLXJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgYnNEYXRlcmFuZ2VwaWNrZXIgdHJpZ2dlcnM9XCJjbGlja1wiICNmcm9tVG89XCJic0RhdGVyYW5nZXBpY2tlclwiIFtic0NvbmZpZ109XCJic0Zyb21Ub0NvbmZpZygpXCIgW25nTW9kZWxdPVwidmFsdWVcIiAobmdNb2RlbENoYW5nZSk9XCJ1cGRhdGVGcm9tVG8oJGV2ZW50KVwiIFtwbGFjZWhvbGRlcl09XCJkYXRlRm9ybWF0XCIvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiIW9wdGlvbnMuY2xvc2VkUmFuZ2VcIiBjbGFzcz1cInNxLWRhdGUtcmFuZ2UtcGlja2VyIGZvcm0tcm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWF1dG9cIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBhdXRvY29tcGxldGU9XCJvZmZcIiBbaWRdPVwiZnJvbU5hbWVcIiBjbGFzcz1cImZvcm0tY29udHJvbCBzcS1yYW5nZS1mcm9tXCIgYnNEYXRlcGlja2VyIHRyaWdnZXJzPVwiY2xpY2tcIiAjZnJvbT1cImJzRGF0ZXBpY2tlclwiIFtic0NvbmZpZ109XCJic0Zyb21Db25maWcoKVwiIFtuZ01vZGVsXT1cInZhbHVlWzBdXCIgKG5nTW9kZWxDaGFuZ2UpPVwidXBkYXRlRnJvbSgkZXZlbnQpXCIgW3BsYWNlaG9sZGVyXT1cImRhdGVGb3JtYXRcIi8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtYXV0byBzcS1zZXBhcmF0b3JcIj57eydtc2cjYWR2YW5jZWQuZGF0ZVJhbmdlUGlja2VyLnNlcGFyYXRvcicgfCBzcU1lc3NhZ2V9fTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgW2lkXT1cInRvTmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIHNxLXJhbmdlLXRvXCIgYnNEYXRlcGlja2VyIHRyaWdnZXJzPVwiY2xpY2tcIiAjdG89XCJic0RhdGVwaWNrZXJcIiBbYnNDb25maWddPVwiYnNUb0NvbmZpZygpXCIgW25nTW9kZWxdPVwidmFsdWVbMV1cIiAobmdNb2RlbENoYW5nZSk9XCJ1cGRhdGVUbygkZXZlbnQpXCIgW3BsYWNlaG9sZGVyXT1cImRhdGVGb3JtYXRcIi8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBwcm92aWRlcnM6IFtEQVRFX1JBTkdFX1BJQ0tFUl9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgQnNEYXRlUmFuZ2VQaWNrZXIgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBTeXN0ZW1Gb3JtYXQ6IHN0cmluZyA9ICdZWVlZLU1NLUREJztcblxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IERhdGVSYW5nZVBpY2tlck9wdGlvbnM7XG4gICAgdmFsdWU6IChEYXRlIHwgdW5kZWZpbmVkKVtdO1xuICAgIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICAgIHByaXZhdGUgbG9jYWxlQ2hhbmdlOiBTdWJzY3JpcHRpb247XG4gICAgQFZpZXdDaGlsZChcImZyb21Ub1wiLCB7c3RhdGljOiBmYWxzZX0pIGZyb21Ub1BpY2tlcjogQnNEYXRlcmFuZ2VwaWNrZXJEaXJlY3RpdmU7XG4gICAgQFZpZXdDaGlsZChcImZyb21cIiwge3N0YXRpYzogZmFsc2V9KSBmcm9tUGlja2VyOiBCc0RhdGVwaWNrZXJEaXJlY3RpdmU7XG4gICAgQFZpZXdDaGlsZChcInRvXCIsIHtzdGF0aWM6IGZhbHNlfSkgdG9QaWNrZXI6IEJzRGF0ZXBpY2tlckRpcmVjdGl2ZTtcbiAgICBmcm9tTmFtZTogc3RyaW5nO1xuICAgIHRvTmFtZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBpbnRsU2VydmljZTogSW50bFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZnJvbU5hbWUgPSBcImZyb21fXCIgKyB0aGlzLm9wdGlvbnMubmFtZTtcbiAgICAgICAgdGhpcy50b05hbWUgPSBcInRvX1wiICsgdGhpcy5vcHRpb25zLm5hbWU7XG5cbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gW3VuZGVmaW5lZCwgdW5kZWZpbmVkXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZGF0ZUZvcm1hdCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnN5c3RlbSA/IHRoaXMuU3lzdGVtRm9ybWF0IDogbW9tZW50LmxvY2FsZURhdGEoKS5sb25nRGF0ZUZvcm1hdCgnTCcpO1xuICAgIH1cblxuICAgIHNldExvY2FsZSgpIHtcbiAgICAgICAgaWYgKCEhdGhpcy5mcm9tVG9QaWNrZXIgJiYgdGhpcy5mcm9tVG9QaWNrZXIuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmZyb21Ub1BpY2tlci5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLmZyb21Ub1BpY2tlci5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhdGhpcy5mcm9tUGlja2VyICYmIHRoaXMuZnJvbVBpY2tlci5pc09wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuZnJvbVBpY2tlci5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLmZyb21QaWNrZXIuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghIXRoaXMudG9QaWNrZXIgJiYgdGhpcy50b1BpY2tlci5pc09wZW4pIHtcbiAgICAgICAgICAgIHRoaXMudG9QaWNrZXIuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy50b1BpY2tlci5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuc2V0TG9jYWxlKCk7XG4gICAgICAgIHRoaXMubG9jYWxlQ2hhbmdlID0gVXRpbHMuc3Vic2NyaWJlKHRoaXMuaW50bFNlcnZpY2UuZXZlbnRzLFxuICAgICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5sb2NhbGVDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMubG9jYWxlQ2hhbmdlLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyNyZWdpb24gY2xvc2VkUmFuZ2VcbiAgICBic0Zyb21Ub0NvbmZpZygpOiBCc0RhdGVyYW5nZXBpY2tlckNvbmZpZyB7XG4gICAgICAgIHJldHVybiA8YW55PntcbiAgICAgICAgICAgIG1pbkRhdGU6IHRoaXMub3B0aW9ucy5taW5EYXRlLFxuICAgICAgICAgICAgbWF4RGF0ZTogdGhpcy5vcHRpb25zLm1heERhdGUsXG4gICAgICAgICAgICBjb250YWluZXJDbGFzczondGhlbWUtZGVmYXVsdCcsXG4gICAgICAgICAgICBzaG93V2Vla051bWJlcnM6IGZhbHNlLFxuICAgICAgICAgICAgcmFuZ2VJbnB1dEZvcm1hdDogdGhpcy5vcHRpb25zLnN5c3RlbSA/IHRoaXMuU3lzdGVtRm9ybWF0IDogbW9tZW50LmxvY2FsZURhdGEoKS5sb25nRGF0ZUZvcm1hdCgnTCcpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdXBkYXRlRnJvbVRvKGZyb21UbzogRGF0ZVtdKSB7XG4gICAgICAgIHRoaXMuc2V0VmFsdWUoWyEhZnJvbVRvID8gZnJvbVRvWzBdIDogdW5kZWZpbmVkLCAhIWZyb21UbyA/IGZyb21Ub1sxXSA6IHVuZGVmaW5lZF0pO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy52YWx1ZSk7XG4gICAgfVxuICAgIC8vI2VuZHJlZ2lvbiBjbG9zZWRSYW5nZVxuXG4gICAgLy8jcmVnaW9uICFjbG9zZWRSYW5nZVxuICAgIG1heERhdGU6IERhdGUgfCB1bmRlZmluZWQ7XG4gICAgbWluRGF0ZTogRGF0ZSB8IHVuZGVmaW5lZDtcbiAgICBic0Zyb21Db25maWcoKTogQnNEYXRlcGlja2VyQ29uZmlnIHtcbiAgICAgICAgcmV0dXJuIDxhbnk+e1xuICAgICAgICAgICAgbWluRGF0ZTogdGhpcy5vcHRpb25zLm1pbkRhdGUsXG4gICAgICAgICAgICBtYXhEYXRlOiB0aGlzLm1heERhdGUsXG4gICAgICAgICAgICBjb250YWluZXJDbGFzczondGhlbWUtZGVmYXVsdCcsXG4gICAgICAgICAgICBzaG93V2Vla051bWJlcnM6IGZhbHNlLFxuICAgICAgICAgICAgZGF0ZUlucHV0Rm9ybWF0OiB0aGlzLm9wdGlvbnMuc3lzdGVtID8gdGhpcy5TeXN0ZW1Gb3JtYXQgOiBtb21lbnQubG9jYWxlRGF0YSgpLmxvbmdEYXRlRm9ybWF0KCdMJyksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgYnNUb0NvbmZpZygpOiBCc0RhdGVwaWNrZXJDb25maWcge1xuICAgICAgICByZXR1cm4gPGFueT57XG4gICAgICAgICAgICBtaW5EYXRlOiB0aGlzLm1pbkRhdGUsXG4gICAgICAgICAgICBtYXhEYXRlOiB0aGlzLm9wdGlvbnMubWF4RGF0ZSxcbiAgICAgICAgICAgIGNvbnRhaW5lckNsYXNzOid0aGVtZS1kZWZhdWx0JyxcbiAgICAgICAgICAgIHNob3dXZWVrTnVtYmVyczogZmFsc2UsXG4gICAgICAgICAgICBkYXRlSW5wdXRGb3JtYXQ6IHRoaXMub3B0aW9ucy5zeXN0ZW0gPyB0aGlzLlN5c3RlbUZvcm1hdCA6IG1vbWVudC5sb2NhbGVEYXRhKCkubG9uZ0RhdGVGb3JtYXQoJ0wnKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzZXRNaW5NYXhEYXRlKCkge1xuICAgICAgICB0aGlzLm1heERhdGUgPSB0aGlzLnZhbHVlWzFdIHx8IHRoaXMub3B0aW9ucy5tYXhEYXRlO1xuICAgICAgICB0aGlzLm1pbkRhdGUgPSB0aGlzLnZhbHVlWzBdIHx8IHRoaXMub3B0aW9ucy5taW5EYXRlO1xuICAgIH1cblxuICAgIHJlc2V0TWluTWF4RGF0ZSgpIHtcbiAgICAgICAgdGhpcy5tYXhEYXRlID0gdGhpcy5vcHRpb25zLm1heERhdGU7XG4gICAgICAgIHRoaXMubWluRGF0ZSA9IHRoaXMub3B0aW9ucy5taW5EYXRlO1xuICAgIH1cblxuICAgIHVwZGF0ZUZyb20oZnJvbTogRGF0ZSkge1xuICAgICAgICB0aGlzLnNldFZhbHVlKFtmcm9tLCB0aGlzLnZhbHVlWzFdXSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICB1cGRhdGVUbyh0bzogRGF0ZSkge1xuICAgICAgICB0aGlzLnNldFZhbHVlKFt0aGlzLnZhbHVlWzBdLCB0b10pO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy52YWx1ZSk7XG4gICAgfVxuICAgIC8vI2VuZHJlZ2lvbiAhY2xvc2VkUmFuZ2VcblxuICAgIHplcm9UaW1lcygpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChVdGlscy5pc0RhdGUodGhpcy52YWx1ZVswXSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gdGhpcy52YWx1ZVswXTtcbiAgICAgICAgICAgICAgICBkYXRlLnNldEhvdXJzKDApO1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0TWludXRlcygwKTtcbiAgICAgICAgICAgICAgICBkYXRlLnNldFNlY29uZHMoMCk7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRNaWxsaXNlY29uZHMoMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoVXRpbHMuaXNEYXRlKHRoaXMudmFsdWVbMV0pKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMudmFsdWVbMV07XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRIb3VycygwKTtcbiAgICAgICAgICAgICAgICBkYXRlLnNldE1pbnV0ZXMoMCk7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRTZWNvbmRzKDApO1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0TWlsbGlzZWNvbmRzKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0VmFsdWUodmFsdWU6IChEYXRlIHwgdW5kZWZpbmVkKVtdIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghdGhpcy52YWx1ZSB8fCAhdmFsdWUgfHwgIVV0aWxzLmVxdWFscyh0aGlzLnZhbHVlWzBdLCB2YWx1ZVswXSkgfHwgIVV0aWxzLmVxdWFscyh0aGlzLnZhbHVlWzFdLCB2YWx1ZVsxXSkpIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IFt1bmRlZmluZWQsIHVuZGVmaW5lZF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlWzBdID0gISF2YWx1ZVswXSA/IG5ldyBEYXRlKHZhbHVlWzBdKSA6IHZhbHVlWzBdO1xuICAgICAgICAgICAgICAgIHZhbHVlWzFdID0gISF2YWx1ZVsxXSA/IG5ldyBEYXRlKHZhbHVlWzFdKSA6IHZhbHVlWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZWRSYW5nZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnplcm9UaW1lcygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0TWluTWF4RGF0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnplcm9UaW1lcygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWluTWF4RGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8jcmVnaW9uIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogRGF0ZVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0VmFsdWUodmFsdWUpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgfVxuICAgIC8vI2VuZHJlZ2lvblxufVxuIl19