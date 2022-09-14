import { Directive, Input, InjectionToken, Inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/load-component";
import * as i2 from "./validation.service";
/**
 * An injection token that can be provided to override the component loaded by {@link ValidationDirective}
 * to display validation error messages. The default component is {@link ValidationMessageComponent}.
 */
export const VALIDATION_MESSAGE_COMPONENT = new InjectionToken("VALIDATION_MESSAGE_COMPONENT");
/**
 * A directive to automatically add validity classes to the element to which it is attached. In addition,
 * when the associated `FormControl` is invalid a component is dynamically loaded after the element to display
 * the validation message.
 * The component to load can be specified by providing the {@link VALIDATION_MESSAGE_COMPONENT} injection token.
 * By default, the {@link ValidationMessageComponent} component is used.
 */
export class ValidationDirective {
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
ValidationDirective.ɵfac = function ValidationDirective_Factory(t) { return new (t || ValidationDirective)(i0.ɵɵdirectiveInject(VALIDATION_MESSAGE_COMPONENT), i0.ɵɵdirectiveInject(i0.ViewContainerRef), i0.ɵɵdirectiveInject(i1.LoadComponentService), i0.ɵɵdirectiveInject(i2.ValidationService)); };
ValidationDirective.ɵdir = i0.ɵɵdefineDirective({ type: ValidationDirective, selectors: [["", "sqValidation", ""]], inputs: { options: ["sqValidation", "options"] } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ValidationDirective, [{
        type: Directive,
        args: [{
                selector: "[sqValidation]"
            }]
    }], function () { return [{ type: i0.Type, decorators: [{
                type: Inject,
                args: [VALIDATION_MESSAGE_COMPONENT]
            }] }, { type: i0.ViewContainerRef }, { type: i1.LoadComponentService }, { type: i2.ValidationService }]; }, { options: [{
            type: Input,
            args: ["sqValidation"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS92YWxpZGF0aW9uLyIsInNvdXJjZXMiOlsidmFsaWRhdGlvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQW1CLGNBQWMsRUFBUSxNQUFNLEVBQW1CLE1BQU0sZUFBZSxDQUFDO0FBQ2hILE9BQU8sRUFBQyxTQUFTLEVBQWtCLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUQsT0FBTyxFQUFDLEtBQUssRUFBUSxNQUFNLG9CQUFvQixDQUFDOzs7O0FBcUNoRDs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBRyxJQUFJLGNBQWMsQ0FBWSw4QkFBOEIsQ0FBQyxDQUFDO0FBRTFHOzs7Ozs7R0FNRztBQUlILE1BQU0sT0FBTyxtQkFBbUI7SUFnQjVCLFlBQ2tELDBCQUFxQyxFQUMzRSxnQkFBa0MsRUFDbEMsb0JBQTBDLEVBQzFDLGlCQUFvQztRQUhFLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBVztRQUMzRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDMUQsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUNoRCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLFdBQVcsQ0FBQztRQUNoQixJQUFJLElBQUksQ0FBQyxPQUFPLFlBQVksU0FBUyxFQUFFO1lBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FB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Q0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDaEY7U0FDSjthQUNJO1lBQ0QsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDN0IsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7YUFDMUQ7U0FDSjtJQUNMLENBQUM7O3NGQXZMUSxtQkFBbUIsdUJBaUJoQiw0QkFBNEI7d0RBakIvQixtQkFBbUI7a0RBQW5CLG1CQUFtQjtjQUgvQixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjthQUM3Qjs7c0JBa0JRLE1BQU07dUJBQUMsNEJBQTRCOzBIQWhCakIsT0FBTztrQkFBN0IsS0FBSzttQkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0LCBPbkluaXQsIERvQ2hlY2ssIEluamVjdGlvblRva2VuLCBUeXBlLCBJbmplY3QsIFZpZXdDb250YWluZXJSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0Zvcm1Hcm91cCwgQWJzdHJhY3RDb250cm9sfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7VXRpbHMsIE1hcE9mfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge0xvYWRDb21wb25lbnRTZXJ2aWNlLCBMb2FkZWRDb21wb25lbnR9IGZyb20gXCJAc2luZXF1YS9jb3JlL2xvYWQtY29tcG9uZW50XCI7XG5pbXBvcnQge1ZhbGlkYXRpb25TZXJ2aWNlfSBmcm9tIFwiLi92YWxpZGF0aW9uLnNlcnZpY2VcIjtcblxuLyoqXG4gKiBEZXNjcmliZXMgdGhlIG9wdGlvbnMgdGhhdCBjYW4gYmUgcGFzc2VkIHRvIHtAbGluayBWYWxpZGF0aW9uRGlyZWN0aXZlfS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0aW9uT3B0aW9ucyB7XG4gICAgLyoqXG4gICAgICogVGhlIGBGb3JtR3JvdXBgIGNvbnRhaW5lci5cbiAgICAgKi9cbiAgICBmb3JtOiBGb3JtR3JvdXA7XG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllcyB0aGUgY29udHJvbCB0byB2YWxpZGF0ZS4gRGVmYXVsdHMgdG8gdGhlIHZhbHVlIG9mIHRoZSBgZm9ybUNvbnRyb2xOYW1lYFxuICAgICAqIGF0dHJpYnV0ZSBvbiB0aGUgZWxlbWVudCB0byB3aGljaCB0aGUgYFZhbGlkYXRpb25EaXJlY3RpdmVgIGlzIGF0dGFjaGVkLlxuICAgICAqL1xuICAgIGNvbnRyb2xOYW1lPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBjbGFzcyBuYW1lIHRvIHNldCBvbiB0aGUgZWxlbWVudCBpZiB2YWxpZGF0aW9uIHBhc3Nlcy4gRGVmYXVsdHMgdG8gYGlzLXZhbGlkYC5cbiAgICAgKi9cbiAgICB2YWxpZENsYXNzPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBjbGFzcyBuYW1lIHRvIHNldCBvbiB0aGUgZWxlbWVudCBpZiB2YWxpZGF0aW9uIGZhaWxzLiBEZWZhdWx0cyB0byBgaXMtaW52YWxpZGAuXG4gICAgICovXG4gICAgaW52YWxpZENsYXNzPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBzZWxlY3RvciB0byBpZGVudGlmeSBjaGlsZHJlbiBvZiB0aGUgZWxlbWVudCB0byB3aGljaCB0byBhbHNvIGFwcGx5IHRoZSB2YWxpZGl0eVxuICAgICAqIGNsYXNzZXMuIERlZmF1bHRzIHRvIGAuZm9ybS1jb250cm9sYC4gU2V0IHRvIGBudWxsYCB0byBub3Qgc2VsZWN0IGFueSBjaGlsZHJlbi5cbiAgICAgKi9cbiAgICBjaGlsZFNlbGVjdG9yPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEN1c3RvbSBlcnJvciBtZXNzYWdlcyB0byB1c2UgZm9yIHRoZSB2YWxpZGF0b3JzLiBCeSBkZWZhdWx0IHRoZSBtZXNzYWdlcyBkZWZpbmVkIGluXG4gICAgICoge0BsaW5rIFZhbGlkYXRpb25TZXJ2aWNlfSBhcmUgdXNlZC5cbiAgICAgKi9cbiAgICBlcnJvck1lc3NhZ2VzPzogTWFwT2Y8c3RyaW5nPjtcbn1cblxuLyoqXG4gKiBBbiBpbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgcHJvdmlkZWQgdG8gb3ZlcnJpZGUgdGhlIGNvbXBvbmVudCBsb2FkZWQgYnkge0BsaW5rIFZhbGlkYXRpb25EaXJlY3RpdmV9XG4gKiB0byBkaXNwbGF5IHZhbGlkYXRpb24gZXJyb3IgbWVzc2FnZXMuIFRoZSBkZWZhdWx0IGNvbXBvbmVudCBpcyB7QGxpbmsgVmFsaWRhdGlvbk1lc3NhZ2VDb21wb25lbnR9LlxuICovXG5leHBvcnQgY29uc3QgVkFMSURBVElPTl9NRVNTQUdFX0NPTVBPTkVOVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxUeXBlPGFueT4+KFwiVkFMSURBVElPTl9NRVNTQUdFX0NPTVBPTkVOVFwiKTtcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBhdXRvbWF0aWNhbGx5IGFkZCB2YWxpZGl0eSBjbGFzc2VzIHRvIHRoZSBlbGVtZW50IHRvIHdoaWNoIGl0IGlzIGF0dGFjaGVkLiBJbiBhZGRpdGlvbixcbiAqIHdoZW4gdGhlIGFzc29jaWF0ZWQgYEZvcm1Db250cm9sYCBpcyBpbnZhbGlkIGEgY29tcG9uZW50IGlzIGR5bmFtaWNhbGx5IGxvYWRlZCBhZnRlciB0aGUgZWxlbWVudCB0byBkaXNwbGF5XG4gKiB0aGUgdmFsaWRhdGlvbiBtZXNzYWdlLlxuICogVGhlIGNvbXBvbmVudCB0byBsb2FkIGNhbiBiZSBzcGVjaWZpZWQgYnkgcHJvdmlkaW5nIHRoZSB7QGxpbmsgVkFMSURBVElPTl9NRVNTQUdFX0NPTVBPTkVOVH0gaW5qZWN0aW9uIHRva2VuLlxuICogQnkgZGVmYXVsdCwgdGhlIHtAbGluayBWYWxpZGF0aW9uTWVzc2FnZUNvbXBvbmVudH0gY29tcG9uZW50IGlzIHVzZWQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltzcVZhbGlkYXRpb25dXCJcbn0pXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjayB7XG4gICAgQElucHV0KFwic3FWYWxpZGF0aW9uXCIpIG9wdGlvbnM6IEZvcm1Hcm91cCB8IFZhbGlkYXRpb25PcHRpb25zO1xuICAgIHByaXZhdGUgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBmb3JtOiBGb3JtR3JvdXA7XG4gICAgcHJpdmF0ZSBjb250cm9sOiBBYnN0cmFjdENvbnRyb2w7XG4gICAgcHJpdmF0ZSB2YWxpZENsYXNzPzogc3RyaW5nO1xuICAgIHByaXZhdGUgaW52YWxpZENsYXNzPzogc3RyaW5nO1xuICAgIHByaXZhdGUgY2hpbGRTZWxlY3Rvcj86IHN0cmluZztcbiAgICBwcml2YXRlIGVycm9yTWVzc2FnZXM/OiBNYXBPZjxzdHJpbmc+O1xuICAgIHByaXZhdGUgdmFsaWRhdGlvbk1lc3NhZ2U6IExvYWRlZENvbXBvbmVudDtcbiAgICBwcml2YXRlIGFjdGl2ZTogYm9vbGVhbjtcbiAgICBwcml2YXRlIHZhbGlkOiBib29sZWFuO1xuICAgIHByaXZhdGUgZGlydHk6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBlcnJvcj86IHN0cmluZztcbiAgICBwcml2YXRlIGVycm9ySW5mbz86IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KFZBTElEQVRJT05fTUVTU0FHRV9DT01QT05FTlQpIHByaXZhdGUgdmFsaWRhdGlvbk1lc3NhZ2VDb21wb25lbnQ6IFR5cGU8YW55PixcbiAgICAgICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIGxvYWRDb21wb25lbnRTZXJ2aWNlOiBMb2FkQ29tcG9uZW50U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB2YWxpZGF0aW9uU2VydmljZTogVmFsaWRhdGlvblNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdmlld0NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZhbGlkYXRpb24ubmdPbkluaXQgLSBubyBvcHRpb25zXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjb250cm9sTmFtZTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucyBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5vcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5vcHRpb25zLmZvcm07XG4gICAgICAgICAgICBjb250cm9sTmFtZSA9IHRoaXMub3B0aW9ucy5jb250cm9sTmFtZTtcbiAgICAgICAgICAgIHRoaXMudmFsaWRDbGFzcyA9IHRoaXMub3B0aW9ucy52YWxpZENsYXNzO1xuICAgICAgICAgICAgdGhpcy5pbnZhbGlkQ2xhc3MgPSB0aGlzLm9wdGlvbnMuaW52YWxpZENsYXNzO1xuICAgICAgICAgICAgdGhpcy5jaGlsZFNlbGVjdG9yID0gdGhpcy5vcHRpb25zLmNoaWxkU2VsZWN0b3I7XG4gICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSB0aGlzLm9wdGlvbnMuZXJyb3JNZXNzYWdlcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuZm9ybSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJWYWxpZGF0aW9uLm5nT25Jbml0IC0gbm8gZm9ybSBtb2RlbFwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuZm9ybS5jb250cm9scykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJWYWxpZGF0aW9uLm5nT25Jbml0IC0gbm8gZm9ybSBjb250cm9sc1wiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udHJvbE5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbCA9IHRoaXMuZm9ybS5jb250cm9sc1tjb250cm9sTmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtQ29udHJvbE5hbWUgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZm9ybUNvbnRyb2xOYW1lXCIpO1xuICAgICAgICAgICAgaWYgKGZvcm1Db250cm9sTmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbCA9IHRoaXMuZm9ybS5jb250cm9sc1tmb3JtQ29udHJvbE5hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5jb250cm9sKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZhbGlkYXRpb24ubmdPbkluaXQgLSBubyBjb250cm9sXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy52YWxpZENsYXNzKSB7XG4gICAgICAgICAgICB0aGlzLnZhbGlkQ2xhc3MgPSBcImlzLXZhbGlkXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmludmFsaWRDbGFzcykge1xuICAgICAgICAgICAgdGhpcy5pbnZhbGlkQ2xhc3MgPSBcImlzLWludmFsaWRcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVXRpbHMuaXNVbmRlZmluZWQodGhpcy5jaGlsZFNlbGVjdG9yKSkge1xuICAgICAgICAgICAgdGhpcy5jaGlsZFNlbGVjdG9yID0gXCIuZm9ybS1jb250cm9sXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWxpZCA9IHRoaXMuY29udHJvbC52YWxpZDtcbiAgICAgICAgdGhpcy5kaXJ0eSA9IHRoaXMuY29udHJvbC5kaXJ0eTtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmVycm9yID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Rmlyc3RFcnJvcigpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy5jb250cm9sLmVycm9ycykge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuY29udHJvbC5lcnJvcnMpWzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRFcnJvclRleHQoZXJyb3I/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoZXJyb3IgJiYgdGhpcy5lcnJvck1lc3NhZ2VzICYmICEhdGhpcy5lcnJvck1lc3NhZ2VzW2Vycm9yXSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JNZXNzYWdlc1tlcnJvcl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvblNlcnZpY2UuZ2V0RXJyb3JUZXh0KGVycm9yKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEVycm9ySW5mbyhlcnJvcj86IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGlmIChlcnJvciAmJiB0aGlzLmNvbnRyb2wuZXJyb3JzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sLmVycm9yc1tlcnJvcl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFZhbGlkaXR5Q2xhc3NlcygpIHtcbiAgICAgICAgY29uc3QgYWRkID0gdGhpcy5jb250cm9sLnZhbGlkID8gdGhpcy52YWxpZENsYXNzIDogdGhpcy5pbnZhbGlkQ2xhc3M7XG4gICAgICAgIGNvbnN0IHJlbW92ZSA9IHRoaXMuY29udHJvbC52YWxpZCA/IHRoaXMuaW52YWxpZENsYXNzIDogdGhpcy52YWxpZENsYXNzO1xuICAgICAgICBpZiAocmVtb3ZlKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShyZW1vdmUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhZGQpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGFkZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2hpbGRTZWxlY3Rvcikge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBBcnJheS5mcm9tKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuY2hpbGRTZWxlY3RvcikpO1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVtb3ZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShyZW1vdmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYWRkKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChhZGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVWYWxpZGl0eUNsYXNzZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkQ2xhc3MpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMudmFsaWRDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaW52YWxpZENsYXNzKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmludmFsaWRDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2hpbGRTZWxlY3Rvcikge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBBcnJheS5mcm9tKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuY2hpbGRTZWxlY3RvcikpO1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52YWxpZENsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnZhbGlkQ2xhc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnZhbGlkQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuaW52YWxpZENsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgdmFsaWRpdHkgY2xhc3NlcyBvbiB0aGUgZWxlbWVudCBkZXBlbmRpbmcgb24gdGhlIHZhbGlkaXR5IHN0YXRlIG9mIHRoZVxuICAgICAqIGFzc29jaWF0ZWQgYEZvcm1Db250cm9sYC4gSWYgdGhlIGNvbnRyb2wgaXMgaW52YWxpZCB0aGVuIHRoZSB2YWxpZGF0aW9uIG1lc3NhZ2UgY29tcG9uZW50XG4gICAgICogaXMgbG9hZGVkIHRvIGRpc3BsYXkgYW4gZXJyb3IgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy52YWxpZCA9PT0gdGhpcy5jb250cm9sLnZhbGlkICYmIHRoaXMuZGlydHkgPT09IHRoaXMuY29udHJvbC5kaXJ0eSkge1xuICAgICAgICAgICAgY29uc3QgZmlyc3RFcnJvciA9IHRoaXMuZ2V0Rmlyc3RFcnJvcigpO1xuICAgICAgICAgICAgY29uc3QgZXJyb3JJbmZvID0gdGhpcy5nZXRFcnJvckluZm8oZmlyc3RFcnJvcik7XG4gICAgICAgICAgICBpZiAoZmlyc3RFcnJvciA9PT0gdGhpcy5lcnJvciAmJiBlcnJvckluZm8gPT09IHRoaXMuZXJyb3JJbmZvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lcnJvciA9IGZpcnN0RXJyb3I7XG4gICAgICAgICAgICB0aGlzLmVycm9ySW5mbyA9IGVycm9ySW5mbztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbGlkID0gdGhpcy5jb250cm9sLnZhbGlkO1xuICAgICAgICB0aGlzLmRpcnR5ID0gdGhpcy5jb250cm9sLmRpcnR5O1xuICAgICAgICBpZiAodGhpcy5jb250cm9sLmRpcnR5KSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbGlkaXR5Q2xhc3NlcygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbC52YWxpZCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRpb25NZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGlvbk1lc3NhZ2UuY29tcG9uZW50UmVmLmluc3RhbmNlLnRleHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy52YWxpZGF0aW9uTWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRpb25NZXNzYWdlID1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZENvbXBvbmVudFNlcnZpY2UubG9hZENvbXBvbmVudCh7Y29tcG9uZW50OiB0aGlzLnZhbGlkYXRpb25NZXNzYWdlQ29tcG9uZW50fSwgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSB0aGlzLmdldEZpcnN0RXJyb3IoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRpb25NZXNzYWdlLmNvbXBvbmVudFJlZi5pbnN0YW5jZS50ZXh0ID0gdGhpcy5nZXRFcnJvclRleHQoZXJyb3IpO1xuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGlvbk1lc3NhZ2UuY29tcG9uZW50UmVmLmluc3RhbmNlLmluZm8gPSB0aGlzLmdldEVycm9ySW5mbyhlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVZhbGlkaXR5Q2xhc3NlcygpO1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsaWRhdGlvbk1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRpb25NZXNzYWdlLmNvbXBvbmVudFJlZi5pbnN0YW5jZS50ZXh0ID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==