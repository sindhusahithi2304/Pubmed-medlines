import { OnChanges, OnDestroy } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";
import { AppService } from "@sinequa/core/app-utils";
import { AutocompleteItem } from '@sinequa/components/autocomplete';
import * as i0 from "@angular/core";
export declare class BsAdvancedFormInput implements OnChanges, OnDestroy {
    appService: AppService;
    form: FormGroup;
    field: string;
    suggestQuery: string;
    label: string;
    control: AbstractControl | null;
    viewValue: string | number | undefined | null;
    private _valueChangesSubscription;
    constructor(appService: AppService);
    ngOnChanges(): void;
    ngOnDestroy(): void;
    onItemChange(item: AutocompleteItem): void;
    private _updateControl;
    static ɵfac: i0.ɵɵFactoryDef<BsAdvancedFormInput, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsAdvancedFormInput, "sq-advanced-form-input", never, { "form": "form"; "field": "field"; "suggestQuery": "suggestQuery"; "label": "label"; }, {}, never, never>;
}
//# sourceMappingURL=advanced-form-input.d.ts.map