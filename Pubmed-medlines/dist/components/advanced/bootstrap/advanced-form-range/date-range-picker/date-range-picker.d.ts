import { OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { IntlService } from "@sinequa/core/intl";
import { BsDaterangepickerDirective, BsDaterangepickerConfig, BsDatepickerDirective, BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { DatePickerOptions } from '../date-picker/date-picker';
import * as i0 from "@angular/core";
export declare const DATE_RANGE_PICKER_VALUE_ACCESSOR: any;
export interface DateRangePickerOptions extends DatePickerOptions {
    closedRange?: boolean;
}
export declare class BsDateRangePicker implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
    intlService: IntlService;
    private readonly SystemFormat;
    options: DateRangePickerOptions;
    value: (Date | undefined)[];
    private onChangeCallback;
    private localeChange;
    fromToPicker: BsDaterangepickerDirective;
    fromPicker: BsDatepickerDirective;
    toPicker: BsDatepickerDirective;
    fromName: string;
    toName: string;
    constructor(intlService: IntlService);
    ngOnInit(): void;
    get dateFormat(): string;
    setLocale(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    bsFromToConfig(): BsDaterangepickerConfig;
    updateFromTo(fromTo: Date[]): void;
    maxDate: Date | undefined;
    minDate: Date | undefined;
    bsFromConfig(): BsDatepickerConfig;
    bsToConfig(): BsDatepickerConfig;
    setMinMaxDate(): void;
    resetMinMaxDate(): void;
    updateFrom(from: Date): void;
    updateTo(to: Date): void;
    zeroTimes(): void;
    setValue(value: (Date | undefined)[] | undefined): void;
    writeValue(value: Date[]): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    static ɵfac: i0.ɵɵFactoryDef<BsDateRangePicker, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsDateRangePicker, "sq-date-range-picker", never, { "options": "options"; }, {}, never, never>;
}
//# sourceMappingURL=date-range-picker.d.ts.map