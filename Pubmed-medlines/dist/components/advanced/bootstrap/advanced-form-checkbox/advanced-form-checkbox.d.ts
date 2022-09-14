import { OnChanges } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AppService } from '@sinequa/core/app-utils';
import * as i0 from "@angular/core";
export declare class BsAdvancedFormCheckbox implements OnChanges {
    appService: AppService;
    form: FormGroup;
    field: string;
    label: string;
    constructor(appService: AppService);
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsAdvancedFormCheckbox, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsAdvancedFormCheckbox, "sq-advanced-form-checkbox", never, { "form": "form"; "field": "field"; "label": "label"; }, {}, never, never>;
}
//# sourceMappingURL=advanced-form-checkbox.d.ts.map