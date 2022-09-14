import { OnInit, AfterViewInit, OnDestroy, ElementRef } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { IntlService } from "@sinequa/core/intl";
import { BsDatepickerDirective, BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import * as i0 from "@angular/core";
export declare const DATE_PICKER_VALUE_ACCESSOR: any;
export interface DatePickerOptions {
    name?: string;
    system?: boolean;
    minDate?: Date;
    maxDate?: Date;
}
export declare class BsDatePicker implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
    intlService: IntlService;
    private readonly SystemFormat;
    options: DatePickerOptions;
    value: Date;
    private onChangeCallback;
    private localeChange;
    picker: BsDatepickerDirective;
    input: ElementRef;
    constructor(intlService: IntlService);
    ngOnInit(): void;
    get dateFormat(): string;
    setLocale(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    bsConfig(): BsDatepickerConfig;
    updateValue(value: Date): void;
    private zeroTimes;
    focus(): void;
    writeValue(value: Date): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    static ɵfac: i0.ɵɵFactoryDef<BsDatePicker, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsDatePicker, "sq-date-picker", never, { "options": "options"; }, {}, never, never>;
}
//# sourceMappingURL=date-picker.d.ts.map