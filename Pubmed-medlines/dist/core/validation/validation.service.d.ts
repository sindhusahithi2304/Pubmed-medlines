import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { IntlService } from "@sinequa/core/intl";
import { FormatService } from "@sinequa/core/app-utils";
import * as i0 from "@angular/core";
/**
 * Enumerates the supported validator types.
 */
export declare enum ValidatorType {
    Min = "Min",
    Max = "Max",
    Required = "Required",
    Email = "Email",
    Pattern = "Pattern",
    Integer = "Integer",
    Number = "Number",
    Date = "Date",
    Range = "Range"
}
/**
 * Describes a `Validator` object.
 */
export interface Validator {
    /**
     * The validator's type.
     */
    type: ValidatorType;
    /**
     * The validator's name.
     */
    name: string;
    /**
     * The validator's error message to be displayed when a value is invalid.
     */
    errorMessage: string;
    /**
     * `true` if the validator is to be applied.
     */
    active: boolean;
}
/**
 * This service provides a set of locale-sensitive validators with support for arrays.
 * The validator error messages are {@link IntlService} `msg#` messages of the form:
 * `msg#validation.<validator name>`.
 */
export declare class ValidationService {
    protected formatService: FormatService;
    protected intlService: IntlService;
    constructor(formatService: FormatService, intlService: IntlService);
    /**
     * A pattern validator based on Angular's `Validators.pattern` with support for value arrays.
     *
     * @param pattern The pattern.
     * @returns The validation function.
     */
    static patternValidator(pattern: string | RegExp): ValidatorFn;
    /**
     * A pattern validator based on Angular's `Validators.email` with support for value arrays.
     *
     * @param control The control to validate.
     * @returns The result.
     */
    static emailValidation(control: AbstractControl): ValidationErrors | null;
    /**
     * Get the name of the first validator in a map of validation errors.
     * @param errors The validation errors
     * @returns The name of the first validator, if any - `undefined` otherwise.
     */
    getFirstError(errors: ValidationErrors): string | undefined;
    /**
     * Get the error message associated with the passed validator.
     * @param name The name of a validator.
     * @returns The error message.
     */
    getErrorText(name?: string): string;
    /**
     * Get the error message associated with first validator in a map of validation errors.
     * @param errors The validation errors.
     * @returns The error message.
     */
    getFirstErrorText(errors: ValidationErrors): string | undefined;
    /**
     * Get the data held for the first error in a map of validation errors
     * @param errors The validation errors.
     */
    getFirstErrorInfo(errors: ValidationErrors): any;
    /**
     * Get a validator function that validates that values are greater than or equal
     * to the passed `min` value. The function supports single values and arrays of
     * values and will optionally parse the values using the {@link FormatService} if
     * a parser is passed. Dates will be parsed according to the current locale.
     *
     * @param min The minimum value to test against. The type determines
     * how the test will be made.
     * @param parser An optional parser name.
     */
    minValidator(min: string | number | Date, parser?: string): ValidatorFn;
    /**
     * Get a validator function that validates that values are less than or equal
     * to the passed `max` value. The function supports single values and arrays of
     * values and will optionally parse the values using the {@link FormatService} if
     * a parser is passed. Dates will be parsed according to the current locale.
     *
     * @param max The maximum value to test against. The type determines
     * how the test will be made.
     * @param parser An optional parser name.
     */
    maxValidator(max: string | number | Date, parser?: string): ValidatorFn;
    /**
     * Get a validator function that validates that values are integers. The function
     * supports single values and arrays of values and will optionally parse the values
     * using the {@link FormatService} if a parser is passed.
     *
     * @param parser An optional parser name.
     */
    integerValidator(parser?: string): ValidatorFn;
    /**
     * Get a validator function that validates that values are numeric. The function
     * supports single values and arrays of values and will optionally parse the values
     * using the {@link FormatService} if a parser is passed.
     *
     * @param parser An optional parser name.
     */
    numberValidator(parser?: string): ValidatorFn;
    /**
     * Get a validator function that validates that values are dates. The function
     * supports single values and arrays of values and will optionally parse the values
     * using the {@link FormatService} if a parser is passed. Dates will be parsed according
     * to the current locale.
     *
     * @param parser An optional parser name.
     */
    dateValidator(parser?: string): ValidatorFn;
    /**
     * Get a validator function that validates that, for pair of values, the second value is
     * greater than the first. If one or both values are empty then the validation passes.
     * The validator function supports single values and arrays of values and will optionally
     * parse the values using the {@link FormatService} if a parser is passed. Dates will be
     * parsed according to the current locale.
     *
     * @param type A value whose type indicates how the range test will be made.
     * @param parser An optional parser name.
     */
    rangeValidator(type: string | number | Date, parser?: string): ValidatorFn;
    static ɵfac: i0.ɵɵFactoryDef<ValidationService, never>;
    static ɵprov: i0.ɵɵInjectableDef<ValidationService>;
}
//# sourceMappingURL=validation.service.d.ts.map