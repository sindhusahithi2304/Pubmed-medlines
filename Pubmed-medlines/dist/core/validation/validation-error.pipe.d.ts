import { ChangeDetectorRef } from "@angular/core";
import { ValidationErrors } from "@angular/forms";
import { AbstractIntlPipe, IntlService } from "@sinequa/core/intl";
import { ValidationService } from "./validation.service";
import * as i0 from "@angular/core";
/**
 * A pipe to display the first error in a `ValidationErrors` map.
 */
export declare class ValidationErrorPipe extends AbstractIntlPipe {
    protected validationService: ValidationService;
    constructor(intlService: IntlService, changeDetectorRef: ChangeDetectorRef, validationService: ValidationService);
    updateValue(key: ValidationErrors, params: any): void;
    static ɵfac: i0.ɵɵFactoryDef<ValidationErrorPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<ValidationErrorPipe, "sqValidationError">;
}
//# sourceMappingURL=validation-error.pipe.d.ts.map