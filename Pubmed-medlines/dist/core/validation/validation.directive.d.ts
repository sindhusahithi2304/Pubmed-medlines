import { OnInit, DoCheck, InjectionToken, Type, ViewContainerRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MapOf } from "@sinequa/core/base";
import { LoadComponentService } from "@sinequa/core/load-component";
import { ValidationService } from "./validation.service";
import * as i0 from "@angular/core";
/**
 * Describes the options that can be passed to {@link ValidationDirective}.
 */
export interface ValidationOptions {
    /**
     * The `FormGroup` container.
     */
    form: FormGroup;
    /**
     * Identifies the control to validate. Defaults to the value of the `formControlName`
     * attribute on the element to which the `ValidationDirective` is attached.
     */
    controlName?: string;
    /**
     * The class name to set on the element if validation passes. Defaults to `is-valid`.
     */
    validClass?: string;
    /**
     * The class name to set on the element if validation fails. Defaults to `is-invalid`.
     */
    invalidClass?: string;
    /**
     * The selector to identify children of the element to which to also apply the validity
     * classes. Defaults to `.form-control`. Set to `null` to not select any children.
     */
    childSelector?: string;
    /**
     * Custom error messages to use for the validators. By default the messages defined in
     * {@link ValidationService} are used.
     */
    errorMessages?: MapOf<string>;
}
/**
 * An injection token that can be provided to override the component loaded by {@link ValidationDirective}
 * to display validation error messages. The default component is {@link ValidationMessageComponent}.
 */
export declare const VALIDATION_MESSAGE_COMPONENT: InjectionToken<Type<any>>;
/**
 * A directive to automatically add validity classes to the element to which it is attached. In addition,
 * when the associated `FormControl` is invalid a component is dynamically loaded after the element to display
 * the validation message.
 * The component to load can be specified by providing the {@link VALIDATION_MESSAGE_COMPONENT} injection token.
 * By default, the {@link ValidationMessageComponent} component is used.
 */
export declare class ValidationDirective implements OnInit, DoCheck {
    private validationMessageComponent;
    private viewContainerRef;
    private loadComponentService;
    private validationService;
    options: FormGroup | ValidationOptions;
    private element;
    private form;
    private control;
    private validClass?;
    private invalidClass?;
    private childSelector?;
    private errorMessages?;
    private validationMessage;
    private active;
    private valid;
    private dirty;
    private error?;
    private errorInfo?;
    constructor(validationMessageComponent: Type<any>, viewContainerRef: ViewContainerRef, loadComponentService: LoadComponentService, validationService: ValidationService);
    ngOnInit(): void;
    private getFirstError;
    private getErrorText;
    private getErrorInfo;
    private setValidityClasses;
    private removeValidityClasses;
    /**
     * Update the validity classes on the element depending on the validity state of the
     * associated `FormControl`. If the control is invalid then the validation message component
     * is loaded to display an error message.
     */
    ngDoCheck(): void;
    static ɵfac: i0.ɵɵFactoryDef<ValidationDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<ValidationDirective, "[sqValidation]", never, { "options": "sqValidation"; }, {}, never>;
}
//# sourceMappingURL=validation.directive.d.ts.map