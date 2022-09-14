import { ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, InjectionToken, ɵɵdirectiveInject, ViewContainerRef, ɵɵdefineDirective, Directive, Type, Inject, Input, ɵɵinjectPipeChangeDetectorRef, ɵɵdefinePipe, Pipe, ChangeDetectorRef, ɵɵdefineComponent, ɵɵelementStart, ɵɵtext, ɵɵpipe, ɵɵelementEnd, ɵɵadvance, ɵɵtextInterpolate, ɵɵpipeBind2, ɵɵpureFunction1, Component, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { Utils, BaseModule } from '@sinequa/core/base';
import { LoadComponentService, LoadComponentModule } from '@sinequa/core/load-component';
import { FormatService, AppUtilsModule } from '@sinequa/core/app-utils';
import { IntlService, AbstractIntlPipe, MessagePipe, IntlModule, enIntl, frIntl, deIntl } from '@sinequa/core/intl';
import { CommonModule } from '@angular/common';

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
var ValidatorType;
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
class ValidationService {
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
ValidationService.ɵfac = function ValidationService_Factory(t) { return new (t || ValidationService)(ɵɵinject(FormatService), ɵɵinject(IntlService)); };
ValidationService.ɵprov = ɵɵdefineInjectable({ token: ValidationService, factory: ValidationService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ValidationService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: FormatService }, { type: IntlService }]; }, null); })();

/**
 * An injection token that can be provided to override the component loaded by {@link ValidationDirective}
 * to display validation error messages. The default component is {@link ValidationMessageComponent}.
 */
const VALIDATION_MESSAGE_COMPONENT = new InjectionToken("VALIDATION_MESSAGE_COMPONENT");
/**
 * A directive to automatically add validity classes to the element to which it is attached. In addition,
 * when the associated `FormControl` is invalid a component is dynamically loaded after the element to display
 * the validation message.
 * The component to load can be specified by providing the {@link VALIDATION_MESSAGE_COMPONENT} injection token.
 * By default, the {@link ValidationMessageComponent} component is used.
 */
class ValidationDirective {
    constructor(validationMessageComponent, viewContainerRef, loadComponentService, validationService) {
        this.validationMessageComponent = validationMessageComponent;
        this.viewContainerRef = viewContainerRef;
        this.loadComponentService = loadComponentService;
        this.validationService = validationService;
        this.element = viewContainerRef.element.nativeElement;
    }
    ngOnInit() {
        if (!this.options) {
            console.log("Validation.ngOnInit - no options");
            return;
        }
        let controlName;
        if (this.options instanceof FormGroup) {
            this.form = this.options;
        }
        else {
            this.form = this.options.form;
            controlName = this.options.controlName;
            this.validClass = this.options.validClass;
            this.invalidClass = this.options.invalidClass;
            this.childSelector = this.options.childSelector;
            this.errorMessages = this.options.errorMessages;
        }
        if (!this.form) {
            console.log("Validation.ngOnInit - no form model");
            return;
        }
        if (!this.form.controls) {
            console.log("Validation.ngOnInit - no form controls");
            return;
        }
        if (controlName) {
            this.control = this.form.controls[controlName];
        }
        else {
            const formControlName = this.element.getAttribute("formControlName");
            if (formControlName) {
                this.control = this.form.controls[formControlName];
            }
        }
        if (!this.control) {
            console.log("Validation.ngOnInit - no control");
            return;
        }
        if (!this.validClass) {
            this.validClass = "is-valid";
        }
        if (!this.invalidClass) {
            this.invalidClass = "is-invalid";
        }
        if (Utils.isUndefined(this.childSelector)) {
            this.childSelector = ".form-control";
        }
        this.valid = this.control.valid;
        this.dirty = this.control.dirty;
        this.active = true;
        this.error = undefined;
    }
    getFirstError() {
        if (this.control.errors) {
            return Object.keys(this.control.errors)[0];
        }
        return undefined;
    }
    getErrorText(error) {
        if (error && this.errorMessages && !!this.errorMessages[error]) {
            return this.errorMessages[error];
        }
        return this.validationService.getErrorText(error);
    }
    getErrorInfo(error) {
        if (error && this.control.errors) {
            return this.control.errors[error];
        }
        return undefined;
    }
    setValidityClasses() {
        const add = this.control.valid ? this.validClass : this.invalidClass;
        const remove = this.control.valid ? this.invalidClass : this.validClass;
        if (remove) {
            this.element.classList.remove(remove);
        }
        if (add) {
            this.element.classList.add(add);
        }
        if (this.childSelector) {
            const children = Array.from(this.element.querySelectorAll(this.childSelector));
            children.forEach(element => {
                if (remove) {
                    element.classList.remove(remove);
                }
                if (add) {
                    element.classList.add(add);
                }
            });
        }
    }
    removeValidityClasses() {
        if (this.validClass) {
            this.element.classList.remove(this.validClass);
        }
        if (this.invalidClass) {
            this.element.classList.remove(this.invalidClass);
        }
        if (this.childSelector) {
            const children = Array.from(this.element.querySelectorAll(this.childSelector));
            children.forEach(element => {
                if (this.validClass) {
                    element.classList.remove(this.validClass);
                }
                if (this.invalidClass) {
                    element.classList.remove(this.invalidClass);
                }
            });
        }
    }
    /**
     * Update the validity classes on the element depending on the validity state of the
     * associated `FormControl`. If the control is invalid then the validation message component
     * is loaded to display an error message.
     */
    ngDoCheck() {
        if (!this.active) {
            return;
        }
        if (this.valid === this.control.valid && this.dirty === this.control.dirty) {
            const firstError = this.getFirstError();
            const errorInfo = this.getErrorInfo(firstError);
            if (firstError === this.error && errorInfo === this.errorInfo) {
                return;
            }
            this.error = firstError;
            this.errorInfo = errorInfo;
        }
        this.valid = this.control.valid;
        this.dirty = this.control.dirty;
        if (this.control.dirty) {
            this.setValidityClasses();
            if (this.control.valid) {
                if (this.validationMessage) {
                    this.validationMessage.componentRef.instance.text = "";
                }
            }
            else {
                if (!this.validationMessage) {
                    this.validationMessage =
                        this.loadComponentService.loadComponent({ component: this.validationMessageComponent }, this.viewContainerRef);
                }
                const error = this.getFirstError();
                this.validationMessage.componentRef.instance.text = this.getErrorText(error);
                this.validationMessage.componentRef.instance.info = this.getErrorInfo(error);
            }
        }
        else {
            this.removeValidityClasses();
            if (this.validationMessage) {
                this.validationMessage.componentRef.instance.text = "";
            }
        }
    }
}
ValidationDirective.ɵfac = function ValidationDirective_Factory(t) { return new (t || ValidationDirective)(ɵɵdirectiveInject(VALIDATION_MESSAGE_COMPONENT), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(LoadComponentService), ɵɵdirectiveInject(ValidationService)); };
ValidationDirective.ɵdir = ɵɵdefineDirective({ type: ValidationDirective, selectors: [["", "sqValidation", ""]], inputs: { options: ["sqValidation", "options"] } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ValidationDirective, [{
        type: Directive,
        args: [{
                selector: "[sqValidation]"
            }]
    }], function () { return [{ type: Type, decorators: [{
                type: Inject,
                args: [VALIDATION_MESSAGE_COMPONENT]
            }] }, { type: ViewContainerRef }, { type: LoadComponentService }, { type: ValidationService }]; }, { options: [{
            type: Input,
            args: ["sqValidation"]
        }] }); })();

/**
 * A pipe to display the first error in a `ValidationErrors` map.
 */
class ValidationErrorPipe extends AbstractIntlPipe {
    constructor(intlService, changeDetectorRef, validationService) {
        super(intlService, changeDetectorRef);
        this.validationService = validationService;
    }
    updateValue(key, params) {
        super.updateValue(key, params);
        const text = this.validationService.getFirstErrorText(key);
        const info = this.validationService.getFirstErrorInfo(key);
        this.value = text ? this.intlService.formatMessage(text, { values: info }) : undefined;
    }
}
ValidationErrorPipe.ɵfac = function ValidationErrorPipe_Factory(t) { return new (t || ValidationErrorPipe)(ɵɵdirectiveInject(IntlService), ɵɵinjectPipeChangeDetectorRef(), ɵɵdirectiveInject(ValidationService)); };
ValidationErrorPipe.ɵpipe = ɵɵdefinePipe({ name: "sqValidationError", type: ValidationErrorPipe, pure: false });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ValidationErrorPipe, [{
        type: Pipe,
        args: [{ name: "sqValidationError", pure: false }]
    }], function () { return [{ type: IntlService }, { type: ChangeDetectorRef }, { type: ValidationService }]; }, null); })();

const _c0 = function (a0) { return { values: a0 }; };
/**
 * A default component to be used by the {@link ValidationDirective} directive to display
 * a validation error message using {@link MessagePipe}.
 */
class ValidationMessageComponent {
}
ValidationMessageComponent.ɵfac = function ValidationMessageComponent_Factory(t) { return new (t || ValidationMessageComponent)(); };
ValidationMessageComponent.ɵcmp = ɵɵdefineComponent({ type: ValidationMessageComponent, selectors: [["sq-validation-message"]], inputs: { text: "text", info: "info" }, decls: 3, vars: 6, consts: [[1, "sq-validation-message"]], template: function ValidationMessageComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtext(1);
        ɵɵpipe(2, "sqMessage");
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵtextInterpolate(ɵɵpipeBind2(2, 1, ctx.text, ɵɵpureFunction1(4, _c0, ctx.info)));
    } }, pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ValidationMessageComponent, [{
        type: Component,
        args: [{
                selector: "sq-validation-message",
                template: `
        <div class="sq-validation-message">{{text | sqMessage:{values: info} }}</div>
    `
            }]
    }], null, { text: [{
            type: Input
        }], info: [{
            type: Input
        }] }); })();

const VALIDATION_MODULE_PROVIDERS = [];

/**
 * This module contains facilities for working with Angular's form validation. It provides a
 * {@link ValidationService} that works with {@link IntlService} and {@link FormatService} to
 * support locale-sensitive validators.
 */
class ValidationModule {
}
ValidationModule.ɵmod = ɵɵdefineNgModule({ type: ValidationModule });
ValidationModule.ɵinj = ɵɵdefineInjector({ factory: function ValidationModule_Factory(t) { return new (t || ValidationModule)(); }, providers: [
        { provide: VALIDATION_MESSAGE_COMPONENT, useValue: ValidationMessageComponent },
        ...VALIDATION_MODULE_PROVIDERS
    ], imports: [[
            CommonModule,
            BaseModule,
            AppUtilsModule,
            IntlModule,
            LoadComponentModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(ValidationModule, { declarations: [ValidationDirective, ValidationMessageComponent, ValidationErrorPipe], imports: [CommonModule,
        BaseModule,
        AppUtilsModule,
        IntlModule,
        LoadComponentModule], exports: [ValidationDirective, ValidationMessageComponent, ValidationErrorPipe] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(ValidationModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    BaseModule,
                    AppUtilsModule,
                    IntlModule,
                    LoadComponentModule
                ],
                declarations: [
                    ValidationDirective, ValidationMessageComponent, ValidationErrorPipe,
                ],
                exports: [
                    ValidationDirective, ValidationMessageComponent, ValidationErrorPipe,
                ],
                providers: [
                    { provide: VALIDATION_MESSAGE_COMPONENT, useValue: ValidationMessageComponent },
                    ...VALIDATION_MODULE_PROVIDERS
                ]
            }]
    }], null, null); })();

var _enValidation = {
    "validation": {
        "min": "The value must be at least {min}",
        "max": "The value can be no more than {max}",
        "required": "This field is required",
        "requiredTrue": "This field must be set",
        "email": "A valid email address is required",
        "minLength": "The value must have at least {requiredLength, plural, one {# character} other {# characters}}",
        "maxLength": "The value can have no more than {requiredLength, plural, one {# character} other {# characters}}",
        "pattern": "The value is invalid",
        "unique": "This field must be unique",
        "integer": "The value must be an integer",
        "number": "The value must be a number",
        "date": "",
        "range": "The first value must be less than or equal to the second"
    }
};

var _frValidation = {
    "validation": {
        "min": "La valeur doit être supérieure ou égale à {min}",
        "max": "La valeur ne peut pas être supérieure à {max}",
        "required": "Ce champ est obligatoire",
        "requiredTrue": "Ce champ doit être positionné",
        "email": "Une adresse e-mail valide est exigée",
        "minLength": "La valeur doit comporter au moins {requiredLength, plural, one {# caractère} autre que {# caractère}}",
        "maxLength": "La valeur ne peut comporter plus de {requiredLength, plural, one {# caractère} autre que {# caractères}}",
        "pattern": "La valeur est invalide",
        "unique": "Ce champ doit être unique",
        "integer": "La valeur doit être un entier",
        "number": "La valeur doit être un nombre",
        "date": "",
        "range": "La première valeur doit être inférieure ou égale à la seconde"
    }
};

var _deValidation = {
    "validation": {
        "min": "Der Mindestwert ist {min}",
        "max": "Der Wert kann nicht größer sein als {max}",
        "required": "Dies ist ein Mussfeld",
        "requiredTrue": "Dieses Feld muss ausgefüllt werden",
        "email": "Eine gültige E-Mail-Adresse ist einzutragen",
        "minLength": "Die Mindestlänge des Wertes beträgt {requiredLength, plural, one {# Zeichen} other {# Zeichen}}",
        "maxLength": "Der Wert darf nicht mehr als {requiredLength, plural, one {# Zeichen} other {# Zeichen}} haben",
        "pattern": "Der Wert ist ungültig",
        "unique": "Dieses Feld muss eindeutig sein",
        "integer": "Der Wert muss eine ganze Zahl sein",
        "number": "Der Wert muss eine Nummer sein",
        "date": "",
        "range": "Der erste Wert muss kleiner oder gleich dem zweiten Wert sein"
    }
};

const enValidation = Utils.merge({}, _enValidation, enIntl);
const frValidation = Utils.merge({}, _frValidation, frIntl);
const deValidation = Utils.merge({}, _deValidation, deIntl);

/**
 * Generated bundle index. Do not edit.
 */

export { VALIDATION_MESSAGE_COMPONENT, ValidationDirective, ValidationErrorPipe, ValidationMessageComponent, ValidationModule, ValidationService, ValidatorType, deValidation, enValidation, frValidation };
//# sourceMappingURL=sinequa-core-validation.js.map
