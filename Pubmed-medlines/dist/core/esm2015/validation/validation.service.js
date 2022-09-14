import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "@sinequa/core/intl";
/**
 * @ignore
 */
function isEmptyInputValue(value) {
    // we don't check for string here so it also works with arrays
    return value === null || value === undefined || value.length === 0;
}
const processInputValue = (value) => {
    if (Utils.isArray(value)) {
        return value.map((val) => {
            if (Utils.isObject(val) && val.hasOwnProperty("value")) {
                return val.value;
            }
            return val;
        });
    }
    else {
        if (Utils.isObject(value) && value.hasOwnProperty("value")) {
            return [value.value];
        }
        return [value];
    }
};
// Email regular expression, taken from built-in Angular validators.
/**
 * @ignore
 */
const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
/**
 * Enumerates the supported validator types.
 */
export var ValidatorType;
(function (ValidatorType) {
    ValidatorType["Min"] = "Min";
    ValidatorType["Max"] = "Max";
    ValidatorType["Required"] = "Required";
    ValidatorType["Email"] = "Email";
    ValidatorType["Pattern"] = "Pattern";
    ValidatorType["Integer"] = "Integer";
    ValidatorType["Number"] = "Number";
    ValidatorType["Date"] = "Date";
    ValidatorType["Range"] = "Range";
})(ValidatorType || (ValidatorType = {}));
/**
 * Defines the default error messages for each validator.
 */
const errorMessagesMap = {
    // Built-in Angular validators
    min: "msg#validation.min",
    max: "msg#validation.max",
    required: "msg#validation.required",
    requiredTrue: "msg#validation.requiredTrue",
    email: "msg#validation.email",
    minlength: "msg#validation.minLength",
    maxlength: "msg#validation.maxLength",
    pattern: "msg#validation.pattern",
    // Custom
    unique: "msg#validation.unique",
    integer: "msg#validation.integer",
    number: "msg#validation.number",
    date: "msg#validation.date",
    range: "msg#validation.range"
};
/**
 * This service provides a set of locale-sensitive validators with support for arrays.
 * The validator error messages are {@link IntlService} `msg#` messages of the form:
 * `msg#validation.<validator name>`.
 */
export class ValidationService {
    constructor(formatService, intlService) {
        this.formatService = formatService;
        this.intlService = intlService;
    }
    /**
     * A pattern validator based on Angular's `Validators.pattern` with support for value arrays.
     *
     * @param pattern The pattern.
     * @returns The validation function.
     */
    static patternValidator(pattern) {
        // #region This code region is based on Validators.pattern()
        if (!pattern) {
            return Validators.nullValidator;
        }
        let regex;
        let regexStr;
        if (typeof pattern === 'string') {
            regexStr = '';
            if (pattern.charAt(0) !== '^') {
                regexStr += '^';
            }
            regexStr += pattern;
            if (pattern.charAt(pattern.length - 1) !== '$') {
                regexStr += '$';
            }
            regex = new RegExp(regexStr);
        }
        else {
            regexStr = pattern.toString();
            regex = pattern;
        }
        // #endregion
        return (control) => {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            let values = [];
            values = processInputValue(control.value);
            for (const value of values) {
                if (!regex.test(value)) {
                    return { pattern: { requiredPattern: pattern.toString(), actualValue: value } };
                }
            }
            return null;
        };
    }
    /**
     * A pattern validator based on Angular's `Validators.email` with support for value arrays.
     *
     * @param control The control to validate.
     * @returns The result.
     */
    static emailValidation(control) {
        if (isEmptyInputValue(control.value)) {
            return null; // don't validate empty values to allow optional controls
        }
        let values = [];
        values = processInputValue(control.value);
        for (const value of values) {
            if (!EMAIL_REGEXP.test(value)) {
                return { email: true };
            }
        }
        return null;
    }
    /**
     * Get the name of the first validator in a map of validation errors.
     * @param errors The validation errors
     * @returns The name of the first validator, if any - `undefined` otherwise.
     */
    getFirstError(errors) {
        if (errors) {
            return Object.keys(errors)[0];
        }
        return undefined;
    }
    /**
     * Get the error message associated with the passed validator.
     * @param name The name of a validator.
     * @returns The error message.
     */
    getErrorText(name) {
        const text = name ? errorMessagesMap[name] : undefined;
        if (!text) {
            return "Unknown validator: " + name;
        }
        return text;
    }
    /**
     * Get the error message associated with first validator in a map of validation errors.
     * @param errors The validation errors.
     * @returns The error message.
     */
    getFirstErrorText(errors) {
        if (errors) {
            const error = this.getFirstError(errors);
            if (error) {
                return this.getErrorText(error);
            }
        }
        return undefined;
    }
    /**
     * Get the data held for the first error in a map of validation errors
     * @param errors The validation errors.
     */
    getFirstErrorInfo(errors) {
        if (errors) {
            const error = this.getFirstError(errors);
            if (error) {
                return errors[error];
            }
        }
        return undefined;
    }
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
    minValidator(min, parser) {
        return (control) => {
            if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
                return null; // don't validate empty values to allow optional controls
            }
            let values = [];
            values = processInputValue(control.value);
            for (const value of values) {
                if (!isEmptyInputValue(value)) {
                    let value1 = value;
                    if (parser) {
                        value1 = this.formatService.parseValue(value1, parser);
                    }
                    let cmp = 0;
                    if (Utils.isNumber(min)) {
                        if (Utils.testFloat(value1)) {
                            value1 = Utils.toNumber(value1);
                            cmp = value1 - min;
                        }
                    }
                    else if (Utils.isString(min)) {
                        cmp = Utils.compare(value1, min);
                    }
                    else if (Utils.isDate(min)) {
                        if (Utils.isString(value1)) {
                            value1 = this.intlService.parseDate(value1);
                            if (value1) {
                                cmp = value1.getTime() - min.getTime();
                            }
                        }
                        else if (Utils.isDate(value1)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                            cmp = value1.getTime() - min.getTime();
                        }
                    }
                    if (cmp < 0) {
                        return { min: { min, actual: value } };
                    }
                }
            }
            return null;
        };
    }
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
    maxValidator(max, parser) {
        return (control) => {
            if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
                return null; // don't validate empty values to allow optional controls
            }
            let values = [];
            values = processInputValue(control.value);
            for (const value of values) {
                if (!isEmptyInputValue(value)) {
                    let value1 = value;
                    if (parser) {
                        value1 = this.formatService.parseValue(value1, parser);
                    }
                    let cmp = 0;
                    if (Utils.isNumber(max)) {
                        if (Utils.testFloat(value1)) {
                            value1 = Utils.toNumber(value1);
                            cmp = value1 - max;
                        }
                    }
                    else if (Utils.isString(max)) {
                        cmp = Utils.compare(value1, max);
                    }
                    else if (Utils.isDate(max)) {
                        if (Utils.isString(value1)) {
                            value1 = this.intlService.parseDate(value1);
                            if (value1) {
                                cmp = value1.getTime() - max.getTime();
                            }
                        }
                        else if (Utils.isDate(value1)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                            cmp = value1.getTime() - max.getTime();
                        }
                    }
                    if (cmp > 0) {
                        return { max: { max, actual: value } };
                    }
                }
            }
            return null;
        };
    }
    /**
     * Get a validator function that validates that values are integers. The function
     * supports single values and arrays of values and will optionally parse the values
     * using the {@link FormatService} if a parser is passed.
     *
     * @param parser An optional parser name.
     */
    integerValidator(parser) {
        return (control) => {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            let values = [];
            values = processInputValue(control.value);
            for (const value of values) {
                if (!isEmptyInputValue(value)) {
                    let value1 = value;
                    if (parser) {
                        value1 = this.formatService.parseValue(value1, parser);
                    }
                    if (!Utils.testInteger(value1)) {
                        return { integer: { value } };
                    }
                }
            }
            return null;
        };
    }
    /**
     * Get a validator function that validates that values are numeric. The function
     * supports single values and arrays of values and will optionally parse the values
     * using the {@link FormatService} if a parser is passed.
     *
     * @param parser An optional parser name.
     */
    numberValidator(parser) {
        return (control) => {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            let values = [];
            values = processInputValue(control.value);
            for (const value of values) {
                if (!isEmptyInputValue(value)) {
                    let value1 = value;
                    if (parser) {
                        value1 = this.formatService.parseValue(value1, parser);
                    }
                    if (!Utils.testFloat(value1)) {
                        return { number: { value } };
                    }
                }
            }
            return null;
        };
    }
    /**
     * Get a validator function that validates that values are dates. The function
     * supports single values and arrays of values and will optionally parse the values
     * using the {@link FormatService} if a parser is passed. Dates will be parsed according
     * to the current locale.
     *
     * @param parser An optional parser name.
     */
    dateValidator(parser) {
        return (control) => {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            let values = [];
            values = processInputValue(control.value);
            for (const value of values) {
                if (!isEmptyInputValue(value)) {
                    if (Utils.isString(value)) {
                        let value1 = value;
                        if (parser) {
                            value1 = this.formatService.parseValue(value1, parser);
                        }
                        if (!this.intlService.parseDate(value1)) {
                            return { date: { value } };
                        }
                    }
                    else if (Utils.isDate(value)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                        if (isNaN(value.getTime())) {
                            return { date: { value } };
                        }
                    }
                }
            }
            return null;
        };
    }
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
    rangeValidator(type, parser) {
        return (control) => {
            if (isEmptyInputValue(control.value) || !Utils.isArray(control.value) || control.value.length !== 2) {
                return null; // don't validate empty values to allow optional controls
            }
            let value1 = control.value[0];
            let value2 = control.value[1];
            if (isEmptyInputValue(value1) || isEmptyInputValue(value2)) {
                return null;
            }
            if (parser) {
                value1 = this.formatService.parseValue(value1, parser);
                value2 = this.formatService.parseValue(value2, parser);
            }
            let cmp = 0;
            if (Utils.isString(type)) {
                cmp = Utils.compare(value2, value1);
            }
            else if (Utils.isDate(type)) {
                let date1;
                let date2;
                if (Utils.isString(value1)) {
                    date1 = this.intlService.parseDate(value1);
                }
                else if (Utils.isDate(value1)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                    date1 = value1;
                }
                if (Utils.isString(value2)) {
                    date2 = this.intlService.parseDate(value2);
                }
                else if (Utils.isDate(value2)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                    date2 = value2;
                }
                if (date1 && date2) {
                    cmp = date2.getTime() - date1.getTime();
                }
            }
            else if (Utils.isNumber(type)) {
                if (Utils.testFloat(value1) && Utils.testFloat(value2)) {
                    const num1 = Utils.toNumber(value1);
                    const num2 = Utils.toNumber(value2);
                    if (num1 !== null && num2 !== null) {
                        cmp = num2 - num1;
                    }
                }
            }
            return cmp < 0 ? { range: { value1, value2 } } : null;
        };
    }
}
ValidationService.ɵfac = function ValidationService_Factory(t) { return new (t || ValidationService)(i0.ɵɵinject(i1.FormatService), i0.ɵɵinject(i2.IntlService)); };
ValidationService.ɵprov = i0.ɵɵdefineInjectable({ token: ValidationService, factory: ValidationService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ValidationService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: i1.FormatService }, { type: i2.IntlService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvdmFsaWRhdGlvbi8iLCJzb3VyY2VzIjpbInZhbGlkYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxVQUFVLEVBQWlELE1BQU0sZ0JBQWdCLENBQUM7QUFHMUYsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7O0FBRXpDOztHQUVHO0FBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxLQUFVO0lBQ2pDLDhEQUE4RDtJQUM5RCxPQUFPLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztBQUN2RSxDQUFDO0FBRUQsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO0lBQ3ZDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN4QixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQ2QsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNOLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUN0RCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUM7YUFDbEI7WUFDRCxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsQ0FDRixDQUFBO0tBQ0Y7U0FBTTtRQUNMLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzFELE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7UUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDaEI7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ZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7VmFsaWRhdG9ycywgVmFsaWRhdG9yRm4sIEFic3RyYWN0Q29udHJvbCwgVmFsaWRhdGlvbkVycm9yc30gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge0ludGxTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9pbnRsXCI7XG5pbXBvcnQge0Zvcm1hdFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL2FwcC11dGlsc1wiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gaXNFbXB0eUlucHV0VmFsdWUodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIC8vIHdlIGRvbid0IGNoZWNrIGZvciBzdHJpbmcgaGVyZSBzbyBpdCBhbHNvIHdvcmtzIHdpdGggYXJyYXlzXG4gICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUubGVuZ3RoID09PSAwO1xufVxuXG5jb25zdCBwcm9jZXNzSW5wdXRWYWx1ZSA9ICh2YWx1ZTogYW55KSA9PiB7IC8vIGFkZCBzdXBwb3J0IGZvciBvYmplY3QgdmFsdWVzIG9mIHRoZSBhZHZhbmNlZCBzZWFyY2hcbiAgaWYgKFV0aWxzLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLm1hcChcbiAgICAgICh2YWwpID0+IHtcbiAgICAgICAgaWYgKFV0aWxzLmlzT2JqZWN0KHZhbCkgJiYgdmFsLmhhc093blByb3BlcnR5KFwidmFsdWVcIikpIHtcbiAgICAgICAgICByZXR1cm4gdmFsLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9XG4gICAgKVxuICB9IGVsc2Uge1xuICAgIGlmIChVdGlscy5pc09iamVjdCh2YWx1ZSkgJiYgdmFsdWUuaGFzT3duUHJvcGVydHkoXCJ2YWx1ZVwiKSkge1xuICAgICAgcmV0dXJuIFt2YWx1ZS52YWx1ZV07XG4gICAgfVxuICAgIHJldHVybiBbdmFsdWVdO1xuICB9XG59XG5cbi8vIEVtYWlsIHJlZ3VsYXIgZXhwcmVzc2lvbiwgdGFrZW4gZnJvbSBidWlsdC1pbiBBbmd1bGFyIHZhbGlkYXRvcnMuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuY29uc3QgRU1BSUxfUkVHRVhQID0gL14oPz0uezEsMjU0fSQpKD89LnsxLDY0fUApWy0hIyQlJicqKy8wLTk9P0EtWl5fYGEtent8fX5dKyhcXC5bLSEjJCUmJyorLzAtOT0/QS1aXl9gYS16e3x9fl0rKSpAW0EtWmEtejAtOV0oW0EtWmEtejAtOS1dezAsNjF9W0EtWmEtejAtOV0pPyhcXC5bQS1aYS16MC05XShbQS1aYS16MC05LV17MCw2MX1bQS1aYS16MC05XSk/KSokLztcblxuLyoqXG4gKiBFbnVtZXJhdGVzIHRoZSBzdXBwb3J0ZWQgdmFsaWRhdG9yIHR5cGVzLlxuICovXG5leHBvcnQgZW51bSBWYWxpZGF0b3JUeXBlIHtcbiAgICBNaW4gPSBcIk1pblwiLFxuICAgIE1heCA9IFwiTWF4XCIsXG4gICAgUmVxdWlyZWQgPSBcIlJlcXVpcmVkXCIsXG4gICAgRW1haWwgPSBcIkVtYWlsXCIsXG4gICAgUGF0dGVybiA9IFwiUGF0dGVyblwiLFxuICAgIEludGVnZXIgPSBcIkludGVnZXJcIixcbiAgICBOdW1iZXIgPSBcIk51bWJlclwiLFxuICAgIERhdGUgPSBcIkRhdGVcIixcbiAgICBSYW5nZSA9IFwiUmFuZ2VcIixcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgYSBgVmFsaWRhdG9yYCBvYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdG9yIHtcbiAgICAvKipcbiAgICAgKiBUaGUgdmFsaWRhdG9yJ3MgdHlwZS5cbiAgICAgKi9cbiAgICB0eXBlOiBWYWxpZGF0b3JUeXBlO1xuICAgIC8qKlxuICAgICAqIFRoZSB2YWxpZGF0b3IncyBuYW1lLlxuICAgICAqL1xuICAgIG5hbWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgdmFsaWRhdG9yJ3MgZXJyb3IgbWVzc2FnZSB0byBiZSBkaXNwbGF5ZWQgd2hlbiBhIHZhbHVlIGlzIGludmFsaWQuXG4gICAgICovXG4gICAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogYHRydWVgIGlmIHRoZSB2YWxpZGF0b3IgaXMgdG8gYmUgYXBwbGllZC5cbiAgICAgKi9cbiAgICBhY3RpdmU6IGJvb2xlYW47XG59XG5cbi8qKlxuICogRGVmaW5lcyB0aGUgZGVmYXVsdCBlcnJvciBtZXNzYWdlcyBmb3IgZWFjaCB2YWxpZGF0b3IuXG4gKi9cbmNvbnN0IGVycm9yTWVzc2FnZXNNYXAgPSB7XG4gICAgLy8gQnVpbHQtaW4gQW5ndWxhciB2YWxpZGF0b3JzXG4gICAgbWluOiBcIm1zZyN2YWxpZGF0aW9uLm1pblwiLFxuICAgIG1heDogXCJtc2cjdmFsaWRhdGlvbi5tYXhcIixcbiAgICByZXF1aXJlZDogXCJtc2cjdmFsaWRhdGlvbi5yZXF1aXJlZFwiLFxuICAgIHJlcXVpcmVkVHJ1ZTogXCJtc2cjdmFsaWRhdGlvbi5yZXF1aXJlZFRydWVcIixcbiAgICBlbWFpbDogXCJtc2cjdmFsaWRhdGlvbi5lbWFpbFwiLFxuICAgIG1pbmxlbmd0aDogXCJtc2cjdmFsaWRhdGlvbi5taW5MZW5ndGhcIixcbiAgICBtYXhsZW5ndGg6IFwibXNnI3ZhbGlkYXRpb24ubWF4TGVuZ3RoXCIsXG4gICAgcGF0dGVybjogXCJtc2cjdmFsaWRhdGlvbi5wYXR0ZXJuXCIsXG5cbiAgICAvLyBDdXN0b21cbiAgICB1bmlxdWU6IFwibXNnI3ZhbGlkYXRpb24udW5pcXVlXCIsXG4gICAgaW50ZWdlcjogXCJtc2cjdmFsaWRhdGlvbi5pbnRlZ2VyXCIsXG4gICAgbnVtYmVyOiBcIm1zZyN2YWxpZGF0aW9uLm51bWJlclwiLFxuICAgIGRhdGU6IFwibXNnI3ZhbGlkYXRpb24uZGF0ZVwiLFxuICAgIHJhbmdlOiBcIm1zZyN2YWxpZGF0aW9uLnJhbmdlXCJcbn07XG5cblxuLyoqXG4gKiBUaGlzIHNlcnZpY2UgcHJvdmlkZXMgYSBzZXQgb2YgbG9jYWxlLXNlbnNpdGl2ZSB2YWxpZGF0b3JzIHdpdGggc3VwcG9ydCBmb3IgYXJyYXlzLlxuICogVGhlIHZhbGlkYXRvciBlcnJvciBtZXNzYWdlcyBhcmUge0BsaW5rIEludGxTZXJ2aWNlfSBgbXNnI2AgbWVzc2FnZXMgb2YgdGhlIGZvcm06XG4gKiBgbXNnI3ZhbGlkYXRpb24uPHZhbGlkYXRvciBuYW1lPmAuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBmb3JtYXRTZXJ2aWNlOiBGb3JtYXRTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgaW50bFNlcnZpY2U6IEludGxTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBwYXR0ZXJuIHZhbGlkYXRvciBiYXNlZCBvbiBBbmd1bGFyJ3MgYFZhbGlkYXRvcnMucGF0dGVybmAgd2l0aCBzdXBwb3J0IGZvciB2YWx1ZSBhcnJheXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0dGVybiBUaGUgcGF0dGVybi5cbiAgICAgKiBAcmV0dXJucyBUaGUgdmFsaWRhdGlvbiBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBzdGF0aWMgcGF0dGVyblZhbGlkYXRvcihwYXR0ZXJuOiBzdHJpbmcgfCBSZWdFeHApOiBWYWxpZGF0b3JGbiB7XG4gICAgICAgIC8vICNyZWdpb24gVGhpcyBjb2RlIHJlZ2lvbiBpcyBiYXNlZCBvbiBWYWxpZGF0b3JzLnBhdHRlcm4oKVxuICAgICAgICBpZiAoIXBhdHRlcm4pIHtcbiAgICAgICAgICAgIHJldHVybiBWYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVnZXg6IFJlZ0V4cDtcbiAgICAgICAgbGV0IHJlZ2V4U3RyOiBzdHJpbmc7XG4gICAgICAgIGlmICh0eXBlb2YgcGF0dGVybiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJlZ2V4U3RyID0gJyc7XG5cbiAgICAgICAgICAgIGlmIChwYXR0ZXJuLmNoYXJBdCgwKSAhPT0gJ14nKSB7XG4gICAgICAgICAgICAgICAgcmVnZXhTdHIgKz0gJ14nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZWdleFN0ciArPSBwYXR0ZXJuO1xuXG4gICAgICAgICAgICBpZiAocGF0dGVybi5jaGFyQXQocGF0dGVybi5sZW5ndGggLSAxKSAhPT0gJyQnKSB7XG4gICAgICAgICAgICAgICAgcmVnZXhTdHIgKz0gJyQnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZWdleCA9IG5ldyBSZWdFeHAocmVnZXhTdHIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVnZXhTdHIgPSBwYXR0ZXJuLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICByZWdleCA9IHBhdHRlcm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gI2VuZHJlZ2lvblxuXG4gICAgICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICAgICAgaWYgKGlzRW1wdHlJbnB1dFZhbHVlKGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7ICAvLyBkb24ndCB2YWxpZGF0ZSBlbXB0eSB2YWx1ZXMgdG8gYWxsb3cgb3B0aW9uYWwgY29udHJvbHNcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHZhbHVlczogYW55W10gPSBbXTtcbiAgICAgICAgICAgIHZhbHVlcyA9IHByb2Nlc3NJbnB1dFZhbHVlKGNvbnRyb2wudmFsdWUpO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICAgICAgICAgIGlmICghcmVnZXgudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtwYXR0ZXJuOiB7cmVxdWlyZWRQYXR0ZXJuOiBwYXR0ZXJuLnRvU3RyaW5nKCksIGFjdHVhbFZhbHVlOiB2YWx1ZX19O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBwYXR0ZXJuIHZhbGlkYXRvciBiYXNlZCBvbiBBbmd1bGFyJ3MgYFZhbGlkYXRvcnMuZW1haWxgIHdpdGggc3VwcG9ydCBmb3IgdmFsdWUgYXJyYXlzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRyb2wgVGhlIGNvbnRyb2wgdG8gdmFsaWRhdGUuXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdC5cbiAgICAgKi9cbiAgICBzdGF0aWMgZW1haWxWYWxpZGF0aW9uKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICAgICAgaWYgKGlzRW1wdHlJbnB1dFZhbHVlKGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDsgIC8vIGRvbid0IHZhbGlkYXRlIGVtcHR5IHZhbHVlcyB0byBhbGxvdyBvcHRpb25hbCBjb250cm9sc1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhbHVlczogYW55W10gPSBbXTtcbiAgICAgICAgdmFsdWVzID0gcHJvY2Vzc0lucHV0VmFsdWUoY29udHJvbC52YWx1ZSk7XG5cbiAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICAgIGlmICghRU1BSUxfUkVHRVhQLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtlbWFpbDogdHJ1ZX07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG5hbWUgb2YgdGhlIGZpcnN0IHZhbGlkYXRvciBpbiBhIG1hcCBvZiB2YWxpZGF0aW9uIGVycm9ycy5cbiAgICAgKiBAcGFyYW0gZXJyb3JzIFRoZSB2YWxpZGF0aW9uIGVycm9yc1xuICAgICAqIEByZXR1cm5zIFRoZSBuYW1lIG9mIHRoZSBmaXJzdCB2YWxpZGF0b3IsIGlmIGFueSAtIGB1bmRlZmluZWRgIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBnZXRGaXJzdEVycm9yKGVycm9yczogVmFsaWRhdGlvbkVycm9ycyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhlcnJvcnMpWzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBlcnJvciBtZXNzYWdlIGFzc29jaWF0ZWQgd2l0aCB0aGUgcGFzc2VkIHZhbGlkYXRvci5cbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiBhIHZhbGlkYXRvci5cbiAgICAgKiBAcmV0dXJucyBUaGUgZXJyb3IgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBnZXRFcnJvclRleHQobmFtZT86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHRleHQgPSBuYW1lID8gZXJyb3JNZXNzYWdlc01hcFtuYW1lXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCF0ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gXCJVbmtub3duIHZhbGlkYXRvcjogXCIgKyBuYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZXJyb3IgbWVzc2FnZSBhc3NvY2lhdGVkIHdpdGggZmlyc3QgdmFsaWRhdG9yIGluIGEgbWFwIG9mIHZhbGlkYXRpb24gZXJyb3JzLlxuICAgICAqIEBwYXJhbSBlcnJvcnMgVGhlIHZhbGlkYXRpb24gZXJyb3JzLlxuICAgICAqIEByZXR1cm5zIFRoZSBlcnJvciBtZXNzYWdlLlxuICAgICAqL1xuICAgIGdldEZpcnN0RXJyb3JUZXh0KGVycm9yczogVmFsaWRhdGlvbkVycm9ycyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gdGhpcy5nZXRGaXJzdEVycm9yKGVycm9ycyk7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRFcnJvclRleHQoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBkYXRhIGhlbGQgZm9yIHRoZSBmaXJzdCBlcnJvciBpbiBhIG1hcCBvZiB2YWxpZGF0aW9uIGVycm9yc1xuICAgICAqIEBwYXJhbSBlcnJvcnMgVGhlIHZhbGlkYXRpb24gZXJyb3JzLlxuICAgICAqL1xuICAgIGdldEZpcnN0RXJyb3JJbmZvKGVycm9yczogVmFsaWRhdGlvbkVycm9ycyk6IGFueSB7XG4gICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gdGhpcy5nZXRGaXJzdEVycm9yKGVycm9ycyk7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3JzW2Vycm9yXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIHZhbGlkYXRvciBmdW5jdGlvbiB0aGF0IHZhbGlkYXRlcyB0aGF0IHZhbHVlcyBhcmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsXG4gICAgICogdG8gdGhlIHBhc3NlZCBgbWluYCB2YWx1ZS4gVGhlIGZ1bmN0aW9uIHN1cHBvcnRzIHNpbmdsZSB2YWx1ZXMgYW5kIGFycmF5cyBvZlxuICAgICAqIHZhbHVlcyBhbmQgd2lsbCBvcHRpb25hbGx5IHBhcnNlIHRoZSB2YWx1ZXMgdXNpbmcgdGhlIHtAbGluayBGb3JtYXRTZXJ2aWNlfSBpZlxuICAgICAqIGEgcGFyc2VyIGlzIHBhc3NlZC4gRGF0ZXMgd2lsbCBiZSBwYXJzZWQgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IGxvY2FsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtaW4gVGhlIG1pbmltdW0gdmFsdWUgdG8gdGVzdCBhZ2FpbnN0LiBUaGUgdHlwZSBkZXRlcm1pbmVzXG4gICAgICogaG93IHRoZSB0ZXN0IHdpbGwgYmUgbWFkZS5cbiAgICAgKiBAcGFyYW0gcGFyc2VyIEFuIG9wdGlvbmFsIHBhcnNlciBuYW1lLlxuICAgICAqL1xuICAgIG1pblZhbGlkYXRvcihtaW46IHN0cmluZyB8IG51bWJlciB8IERhdGUsIHBhcnNlcj86IHN0cmluZyk6IFZhbGlkYXRvckZuIHtcbiAgICAgICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgICAgICBpZiAoaXNFbXB0eUlucHV0VmFsdWUoY29udHJvbC52YWx1ZSkgfHwgaXNFbXB0eUlucHV0VmFsdWUobWluKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsOyAgLy8gZG9uJ3QgdmFsaWRhdGUgZW1wdHkgdmFsdWVzIHRvIGFsbG93IG9wdGlvbmFsIGNvbnRyb2xzXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZXM6IGFueVtdID0gW107XG4gICAgICAgICAgICB2YWx1ZXMgPSBwcm9jZXNzSW5wdXRWYWx1ZShjb250cm9sLnZhbHVlKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzRW1wdHlJbnB1dFZhbHVlKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUxID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlMSA9IHRoaXMuZm9ybWF0U2VydmljZS5wYXJzZVZhbHVlKHZhbHVlMSwgcGFyc2VyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgY21wID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzLmlzTnVtYmVyKG1pbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChVdGlscy50ZXN0RmxvYXQodmFsdWUxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlMSA9IFV0aWxzLnRvTnVtYmVyKHZhbHVlMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY21wID0gdmFsdWUxIC0gbWluO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFV0aWxzLmlzU3RyaW5nKG1pbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNtcCA9IFV0aWxzLmNvbXBhcmUodmFsdWUxLCBtaW4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFV0aWxzLmlzRGF0ZShtaW4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbHMuaXNTdHJpbmcodmFsdWUxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlMSA9IHRoaXMuaW50bFNlcnZpY2UucGFyc2VEYXRlKHZhbHVlMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbXAgPSB2YWx1ZTEuZ2V0VGltZSgpIC0gbWluLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChVdGlscy5pc0RhdGUodmFsdWUxKSkgeyAvLyBuZ3gtYm9vdHN0cmFwIHJldHVybnMgZGF0ZSB2YWx1ZXMgKG5ldyBEYXRlKE5hTikgaWYgaW52YWxpZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbXAgPSB2YWx1ZTEuZ2V0VGltZSgpIC0gbWluLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoY21wIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHttaW46IHttaW4sIGFjdHVhbDogdmFsdWV9fTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIHZhbGlkYXRvciBmdW5jdGlvbiB0aGF0IHZhbGlkYXRlcyB0aGF0IHZhbHVlcyBhcmUgbGVzcyB0aGFuIG9yIGVxdWFsXG4gICAgICogdG8gdGhlIHBhc3NlZCBgbWF4YCB2YWx1ZS4gVGhlIGZ1bmN0aW9uIHN1cHBvcnRzIHNpbmdsZSB2YWx1ZXMgYW5kIGFycmF5cyBvZlxuICAgICAqIHZhbHVlcyBhbmQgd2lsbCBvcHRpb25hbGx5IHBhcnNlIHRoZSB2YWx1ZXMgdXNpbmcgdGhlIHtAbGluayBGb3JtYXRTZXJ2aWNlfSBpZlxuICAgICAqIGEgcGFyc2VyIGlzIHBhc3NlZC4gRGF0ZXMgd2lsbCBiZSBwYXJzZWQgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IGxvY2FsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtYXggVGhlIG1heGltdW0gdmFsdWUgdG8gdGVzdCBhZ2FpbnN0LiBUaGUgdHlwZSBkZXRlcm1pbmVzXG4gICAgICogaG93IHRoZSB0ZXN0IHdpbGwgYmUgbWFkZS5cbiAgICAgKiBAcGFyYW0gcGFyc2VyIEFuIG9wdGlvbmFsIHBhcnNlciBuYW1lLlxuICAgICAqL1xuICAgIG1heFZhbGlkYXRvcihtYXg6IHN0cmluZyB8IG51bWJlciB8IERhdGUsIHBhcnNlcj86IHN0cmluZyk6IFZhbGlkYXRvckZuIHtcbiAgICAgICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgICAgICBpZiAoaXNFbXB0eUlucHV0VmFsdWUoY29udHJvbC52YWx1ZSkgfHwgaXNFbXB0eUlucHV0VmFsdWUobWF4KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsOyAgLy8gZG9uJ3QgdmFsaWRhdGUgZW1wdHkgdmFsdWVzIHRvIGFsbG93IG9wdGlvbmFsIGNvbnRyb2xzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdmFsdWVzOiBhbnlbXSA9IFtdO1xuICAgICAgICAgICAgdmFsdWVzID0gcHJvY2Vzc0lucHV0VmFsdWUoY29udHJvbC52YWx1ZSk7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0VtcHR5SW5wdXRWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlMSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTEgPSB0aGlzLmZvcm1hdFNlcnZpY2UucGFyc2VWYWx1ZSh2YWx1ZTEsIHBhcnNlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNtcCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc051bWJlcihtYXgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbHMudGVzdEZsb2F0KHZhbHVlMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTEgPSBVdGlscy50b051bWJlcih2YWx1ZTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNtcCA9IHZhbHVlMSAtIG1heDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChVdGlscy5pc1N0cmluZyhtYXgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbXAgPSBVdGlscy5jb21wYXJlKHZhbHVlMSwgbWF4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChVdGlscy5pc0RhdGUobWF4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKHZhbHVlMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTEgPSB0aGlzLmludGxTZXJ2aWNlLnBhcnNlRGF0ZSh2YWx1ZTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY21wID0gdmFsdWUxLmdldFRpbWUoKSAtIG1heC5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoVXRpbHMuaXNEYXRlKHZhbHVlMSkpIHsgLy8gbmd4LWJvb3RzdHJhcCByZXR1cm5zIGRhdGUgdmFsdWVzIChuZXcgRGF0ZShOYU4pIGlmIGludmFsaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY21wID0gdmFsdWUxLmdldFRpbWUoKSAtIG1heC5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNtcCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7bWF4OiB7bWF4LCBhY3R1YWw6IHZhbHVlfX07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSB2YWxpZGF0b3IgZnVuY3Rpb24gdGhhdCB2YWxpZGF0ZXMgdGhhdCB2YWx1ZXMgYXJlIGludGVnZXJzLiBUaGUgZnVuY3Rpb25cbiAgICAgKiBzdXBwb3J0cyBzaW5nbGUgdmFsdWVzIGFuZCBhcnJheXMgb2YgdmFsdWVzIGFuZCB3aWxsIG9wdGlvbmFsbHkgcGFyc2UgdGhlIHZhbHVlc1xuICAgICAqIHVzaW5nIHRoZSB7QGxpbmsgRm9ybWF0U2VydmljZX0gaWYgYSBwYXJzZXIgaXMgcGFzc2VkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhcnNlciBBbiBvcHRpb25hbCBwYXJzZXIgbmFtZS5cbiAgICAgKi9cbiAgICBpbnRlZ2VyVmFsaWRhdG9yKHBhcnNlcj86IHN0cmluZyk6IFZhbGlkYXRvckZuIHtcbiAgICAgICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgICAgICBpZiAoaXNFbXB0eUlucHV0VmFsdWUoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDsgIC8vIGRvbid0IHZhbGlkYXRlIGVtcHR5IHZhbHVlcyB0byBhbGxvdyBvcHRpb25hbCBjb250cm9sc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHZhbHVlczogYW55W10gPSBbXTtcbiAgICAgICAgICAgIHZhbHVlcyA9IHByb2Nlc3NJbnB1dFZhbHVlKGNvbnRyb2wudmFsdWUpO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICAgICAgICAgIGlmICghaXNFbXB0eUlucHV0VmFsdWUodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZTEgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUxID0gdGhpcy5mb3JtYXRTZXJ2aWNlLnBhcnNlVmFsdWUodmFsdWUxLCBwYXJzZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghVXRpbHMudGVzdEludGVnZXIodmFsdWUxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtpbnRlZ2VyOiB7dmFsdWV9fTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIHZhbGlkYXRvciBmdW5jdGlvbiB0aGF0IHZhbGlkYXRlcyB0aGF0IHZhbHVlcyBhcmUgbnVtZXJpYy4gVGhlIGZ1bmN0aW9uXG4gICAgICogc3VwcG9ydHMgc2luZ2xlIHZhbHVlcyBhbmQgYXJyYXlzIG9mIHZhbHVlcyBhbmQgd2lsbCBvcHRpb25hbGx5IHBhcnNlIHRoZSB2YWx1ZXNcbiAgICAgKiB1c2luZyB0aGUge0BsaW5rIEZvcm1hdFNlcnZpY2V9IGlmIGEgcGFyc2VyIGlzIHBhc3NlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXJzZXIgQW4gb3B0aW9uYWwgcGFyc2VyIG5hbWUuXG4gICAgICovXG4gICAgbnVtYmVyVmFsaWRhdG9yKHBhcnNlcj86IHN0cmluZyk6IFZhbGlkYXRvckZuIHtcbiAgICAgICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgICAgICBpZiAoaXNFbXB0eUlucHV0VmFsdWUoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDsgIC8vIGRvbid0IHZhbGlkYXRlIGVtcHR5IHZhbHVlcyB0byBhbGxvdyBvcHRpb25hbCBjb250cm9sc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHZhbHVlczogYW55W10gPSBbXTtcbiAgICAgICAgICAgIHZhbHVlcyA9IHByb2Nlc3NJbnB1dFZhbHVlKGNvbnRyb2wudmFsdWUpO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICAgICAgICAgIGlmICghaXNFbXB0eUlucHV0VmFsdWUodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZTEgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUxID0gdGhpcy5mb3JtYXRTZXJ2aWNlLnBhcnNlVmFsdWUodmFsdWUxLCBwYXJzZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghVXRpbHMudGVzdEZsb2F0KHZhbHVlMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7bnVtYmVyOiB7dmFsdWV9fTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIHZhbGlkYXRvciBmdW5jdGlvbiB0aGF0IHZhbGlkYXRlcyB0aGF0IHZhbHVlcyBhcmUgZGF0ZXMuIFRoZSBmdW5jdGlvblxuICAgICAqIHN1cHBvcnRzIHNpbmdsZSB2YWx1ZXMgYW5kIGFycmF5cyBvZiB2YWx1ZXMgYW5kIHdpbGwgb3B0aW9uYWxseSBwYXJzZSB0aGUgdmFsdWVzXG4gICAgICogdXNpbmcgdGhlIHtAbGluayBGb3JtYXRTZXJ2aWNlfSBpZiBhIHBhcnNlciBpcyBwYXNzZWQuIERhdGVzIHdpbGwgYmUgcGFyc2VkIGFjY29yZGluZ1xuICAgICAqIHRvIHRoZSBjdXJyZW50IGxvY2FsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXJzZXIgQW4gb3B0aW9uYWwgcGFyc2VyIG5hbWUuXG4gICAgICovXG4gICAgZGF0ZVZhbGlkYXRvcihwYXJzZXI/OiBzdHJpbmcpOiBWYWxpZGF0b3JGbiB7XG4gICAgICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICAgICAgaWYgKGlzRW1wdHlJbnB1dFZhbHVlKGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7ICAvLyBkb24ndCB2YWxpZGF0ZSBlbXB0eSB2YWx1ZXMgdG8gYWxsb3cgb3B0aW9uYWwgY29udHJvbHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB2YWx1ZXM6IGFueVtdID0gW107XG4gICAgICAgICAgICB2YWx1ZXMgPSBwcm9jZXNzSW5wdXRWYWx1ZShjb250cm9sLnZhbHVlKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzRW1wdHlJbnB1dFZhbHVlKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbHMuaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUxID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUxID0gdGhpcy5mb3JtYXRTZXJ2aWNlLnBhcnNlVmFsdWUodmFsdWUxLCBwYXJzZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmludGxTZXJ2aWNlLnBhcnNlRGF0ZSh2YWx1ZTEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtkYXRlOiB7dmFsdWV9fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChVdGlscy5pc0RhdGUodmFsdWUpKSB7IC8vIG5neC1ib290c3RyYXAgcmV0dXJucyBkYXRlIHZhbHVlcyAobmV3IERhdGUoTmFOKSBpZiBpbnZhbGlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKHZhbHVlLmdldFRpbWUoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge2RhdGU6IHt2YWx1ZX19O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgdmFsaWRhdG9yIGZ1bmN0aW9uIHRoYXQgdmFsaWRhdGVzIHRoYXQsIGZvciBwYWlyIG9mIHZhbHVlcywgdGhlIHNlY29uZCB2YWx1ZSBpc1xuICAgICAqIGdyZWF0ZXIgdGhhbiB0aGUgZmlyc3QuIElmIG9uZSBvciBib3RoIHZhbHVlcyBhcmUgZW1wdHkgdGhlbiB0aGUgdmFsaWRhdGlvbiBwYXNzZXMuXG4gICAgICogVGhlIHZhbGlkYXRvciBmdW5jdGlvbiBzdXBwb3J0cyBzaW5nbGUgdmFsdWVzIGFuZCBhcnJheXMgb2YgdmFsdWVzIGFuZCB3aWxsIG9wdGlvbmFsbHlcbiAgICAgKiBwYXJzZSB0aGUgdmFsdWVzIHVzaW5nIHRoZSB7QGxpbmsgRm9ybWF0U2VydmljZX0gaWYgYSBwYXJzZXIgaXMgcGFzc2VkLiBEYXRlcyB3aWxsIGJlXG4gICAgICogcGFyc2VkIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBsb2NhbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdHlwZSBBIHZhbHVlIHdob3NlIHR5cGUgaW5kaWNhdGVzIGhvdyB0aGUgcmFuZ2UgdGVzdCB3aWxsIGJlIG1hZGUuXG4gICAgICogQHBhcmFtIHBhcnNlciBBbiBvcHRpb25hbCBwYXJzZXIgbmFtZS5cbiAgICAgKi9cbiAgICByYW5nZVZhbGlkYXRvcih0eXBlOiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlLCBwYXJzZXI/OiBzdHJpbmcpOiBWYWxpZGF0b3JGbiB7XG4gICAgICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICAgICAgaWYgKGlzRW1wdHlJbnB1dFZhbHVlKGNvbnRyb2wudmFsdWUpIHx8ICFVdGlscy5pc0FycmF5KGNvbnRyb2wudmFsdWUpIHx8IGNvbnRyb2wudmFsdWUubGVuZ3RoICE9PSAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7ICAvLyBkb24ndCB2YWxpZGF0ZSBlbXB0eSB2YWx1ZXMgdG8gYWxsb3cgb3B0aW9uYWwgY29udHJvbHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB2YWx1ZTEgPSBjb250cm9sLnZhbHVlWzBdO1xuICAgICAgICAgICAgbGV0IHZhbHVlMiA9IGNvbnRyb2wudmFsdWVbMV07XG4gICAgICAgICAgICBpZiAoaXNFbXB0eUlucHV0VmFsdWUodmFsdWUxKSB8fCBpc0VtcHR5SW5wdXRWYWx1ZSh2YWx1ZTIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyc2VyKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUxID0gdGhpcy5mb3JtYXRTZXJ2aWNlLnBhcnNlVmFsdWUodmFsdWUxLCBwYXJzZXIpO1xuICAgICAgICAgICAgICAgIHZhbHVlMiA9IHRoaXMuZm9ybWF0U2VydmljZS5wYXJzZVZhbHVlKHZhbHVlMiwgcGFyc2VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBjbXAgPSAwO1xuICAgICAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgY21wID0gVXRpbHMuY29tcGFyZSh2YWx1ZTIsIHZhbHVlMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChVdGlscy5pc0RhdGUodHlwZSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZTE6IERhdGUgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGUyOiBEYXRlIHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc1N0cmluZyh2YWx1ZTEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGUxID0gdGhpcy5pbnRsU2VydmljZS5wYXJzZURhdGUodmFsdWUxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoVXRpbHMuaXNEYXRlKHZhbHVlMSkpIHsgLy8gbmd4LWJvb3RzdHJhcCByZXR1cm5zIGRhdGUgdmFsdWVzIChuZXcgRGF0ZShOYU4pIGlmIGludmFsaWQpXG4gICAgICAgICAgICAgICAgICAgIGRhdGUxID0gdmFsdWUxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoVXRpbHMuaXNTdHJpbmcodmFsdWUyKSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRlMiA9IHRoaXMuaW50bFNlcnZpY2UucGFyc2VEYXRlKHZhbHVlMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKFV0aWxzLmlzRGF0ZSh2YWx1ZTIpKSB7IC8vIG5neC1ib290c3RyYXAgcmV0dXJucyBkYXRlIHZhbHVlcyAobmV3IERhdGUoTmFOKSBpZiBpbnZhbGlkKVxuICAgICAgICAgICAgICAgICAgICBkYXRlMiA9IHZhbHVlMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRhdGUxICYmIGRhdGUyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNtcCA9IGRhdGUyLmdldFRpbWUoKSAtIGRhdGUxLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChVdGlscy5pc051bWJlcih0eXBlKSkge1xuICAgICAgICAgICAgICAgIGlmIChVdGlscy50ZXN0RmxvYXQodmFsdWUxKSAmJiBVdGlscy50ZXN0RmxvYXQodmFsdWUyKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBudW0xID0gVXRpbHMudG9OdW1iZXIodmFsdWUxKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbnVtMiA9IFV0aWxzLnRvTnVtYmVyKHZhbHVlMik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChudW0xICE9PSBudWxsICYmIG51bTIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNtcCA9IG51bTIgLSBudW0xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNtcCA8IDAgPyB7cmFuZ2U6IHt2YWx1ZTEsIHZhbHVlMn19IDogbnVsbDtcbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=