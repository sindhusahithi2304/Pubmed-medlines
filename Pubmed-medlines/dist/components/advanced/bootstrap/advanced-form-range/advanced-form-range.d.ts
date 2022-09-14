import { OnInit, OnDestroy } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";
import { CCColumn } from "@sinequa/core/web-services";
import { AppService } from "@sinequa/core/app-utils";
import * as i0 from "@angular/core";
export declare class BsAdvancedFormRange implements OnInit, OnDestroy {
    private appService;
    form: FormGroup;
    field: string;
    min: Date | number | string;
    max: Date | number | string;
    label: string;
    fromName: string;
    toName: string;
    forName: string;
    column: CCColumn | undefined;
    minDate: Date | undefined;
    maxDate: Date | undefined;
    control: AbstractControl | null;
    value: (string | number | Date)[];
    isDate: boolean;
    private _valueChangesSubscription;
    constructor(appService: AppService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ensureValue(value: string): string | number | Date;
    updateFrom(from: string): void;
    updateTo(to: string): void;
    static ɵfac: i0.ɵɵFactoryDef<BsAdvancedFormRange, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsAdvancedFormRange, "sq-advanced-form-range", never, { "form": "form"; "field": "field"; "min": "min"; "max": "max"; "label": "label"; }, {}, never, never>;
}
//# sourceMappingURL=advanced-form-range.d.ts.map