import { EventEmitter, OnChanges } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ValidationService } from "@sinequa/core/validation";
import * as i0 from "@angular/core";
export declare class BsPreviewPageFormComponent implements OnChanges {
    pageNumber?: number;
    gotopage: EventEmitter<number>;
    form: FormGroup;
    pageControl: FormControl;
    constructor(formBuilder: FormBuilder, validationService: ValidationService);
    ngOnChanges(): void;
    submit(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsPreviewPageFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsPreviewPageFormComponent, "sq-preview-page-form", never, { "pageNumber": "pageNumber"; }, { "gotopage": "gotopage"; }, never, never>;
}
//# sourceMappingURL=preview-page-form.component.d.ts.map