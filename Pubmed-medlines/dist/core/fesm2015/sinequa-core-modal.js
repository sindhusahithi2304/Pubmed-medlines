import { InjectionToken, Injector, ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, Type, Inject, ɵɵgetCurrentView, ɵɵelementStart, ɵɵlistener, ɵɵrestoreView, ɵɵnextContext, ɵɵtext, ɵɵpipe, ɵɵelementEnd, ɵɵpropertyInterpolate, ɵɵadvance, ɵɵtextInterpolate, ɵɵpipeBind1, ɵɵelementContainerStart, ɵɵtemplate, ɵɵelementContainerEnd, ɵɵproperty, ɵɵdirectiveInject, ɵɵdefineComponent, ɵɵelement, ɵɵpipeBind2, Component, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { OverlayConfig, Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Utils, Keys, BaseModule } from '@sinequa/core/base';
import { Subject, of } from 'rxjs';
import { CdkTrapFocus, A11yModule } from '@angular/cdk/a11y';
import { NgForOf, NgIf, CommonModule } from '@angular/common';
import { MessagePipe, IntlModule, enIntl, frIntl, deIntl } from '@sinequa/core/intl';
import { FormControl, Validators, FormBuilder, ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, DefaultValueAccessor, NgControlStatus, FormControlName, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorPipe, ValidationModule } from '@sinequa/core/validation';

/**
 * An implementation of the {@link IModalRef} interface.
 */
class ModalRef {
    constructor(overlayRef) {
        this.overlayRef = overlayRef;
        this._checkClose = new Subject();
        this._beforeClosed = new Subject();
        this._afterClosed = new Subject();
        this.submitListener = (event) => {
            this.submitted = true;
            event.preventDefault();
            return false;
        };
    }
    /**
     * A stream that emits before the referenced modal is closed to allow an observer
     * to cancel the closing.
     */
    checkClose() {
        return this._checkClose.asObservable();
    }
    /**
     * A stream that emits before the referenced modal is closed.
     */
    beforeClosed() {
        return this._beforeClosed.asObservable();
    }
    /**
     * A stream that emits aftervthe referenced modal is closed.
     */
    afterClosed() {
        return this._afterClosed.asObservable();
    }
    /**
     * Close the referenced modal with the passed `result`.
     * @param result The referenced modal's result.
     */
    close(result = -2 /* Cancel */) {
        // Delay to allow submit handling
        Utils.delay().then(() => {
            const checkCloseEvent = { result };
            this._checkClose.next(checkCloseEvent);
            (checkCloseEvent.cancelled || of(false)).subscribe((cancelled) => {
                if (!cancelled) {
                    this._checkClose.complete();
                    this._beforeClosed.next(result);
                    this._beforeClosed.complete();
                    this.removeSubmitListener();
                    this.overlayRef.detachBackdrop();
                    this.overlayRef.dispose();
                    this.componentInstance = undefined;
                    this._afterClosed.next(result);
                    this._afterClosed.complete();
                }
            });
        });
    }
    /**
     * Disable the standard browser submit handling on any HTML form in the modal component.
     */
    disableSubmit() {
        if (!this.formElement) {
            const formElement = this.overlayRef.overlayElement.querySelector("form");
            if (formElement) {
                this.formElement = formElement;
                this.formElement.addEventListener("submit", this.submitListener);
            }
        }
    }
    removeSubmitListener() {
        if (this.formElement) {
            this.formElement.removeEventListener("submit", this.submitListener);
            this.formElement = undefined;
        }
    }
}

const DEFAULT_CONFIG = {
    hasBackdrop: true,
    backdropClass: ["cdk-overlay-dark-backdrop", "sq-modal-backdrop"],
    panelClass: "sq-modal-pane",
    model: null,
    closeOnBackdropClick: true
};
/**
 * The `MODAL_MODEL` injection token can be used to access the modal's model in
 * the the modal component. The value is `provided` from the value set in the
 * {@link ModalConfig} options when the modal is opened.
 */
const MODAL_MODEL = new InjectionToken('MODAL_MODEL');
/**
 * A class representing a button displayed in a modal.
 */
class ModalButton {
    constructor(options) {
        Utils.extend(this, { visible: true, anchor: false }, options);
    }
    /**
     * Get the button text. Buttons with non-custom result types
     * have default text depending on their result type -
     * `msg#modal.buttons.ok`, `msg#modal.buttons.cancel` etc
     */
    getText() {
        if (this.text) {
            return this.text;
        }
        switch (this.result) {
            case -1 /* OK */:
                return "msg#modal.buttons.ok";
            case -2 /* Cancel */:
                return "msg#modal.buttons.cancel";
            case -3 /* Yes */:
                return "msg#modal.buttons.yes";
            case -4 /* No */:
                return "msg#modal.buttons.no";
            case -5 /* Abort */:
                return "msg#modal.buttons.abort";
            case -6 /* Retry */:
                return "msg#modal.buttons.retry";
            case -7 /* Ignore */:
                return "msg#modal.buttons.ignore";
            default:
                return "";
        }
    }
    /**
     * Perform a click on a button. The button's explicit action is performed if set and
     * the modal closed with the button's modal result if the `result` type is non-`Custom`.
     * If the validation status not `valid` this method returns without performing any action.
     *
     * @param closer An object with a `close` method. If the result type is non-custom then
     * the `close` method of this object is called.
     */
    click(closer) {
        if (this.validation && !this.validation.valid) {
            return;
        }
        if (this.action) {
            this.action(this);
        }
        if (this.result !== 0 /* Custom */) {
            closer.close(this.result);
        }
    }
}
/**
 * An injection token to set the component to use for the `confirm` modal displayed
 * by the [ModalService.confirm]{@link ModalService#confirm} method.
 */
const MODAL_CONFIRM = new InjectionToken('MODAL_CONFIRM');
/**
 * An injection token to set the component to use for the `prompt` modal displayed
 * by the [ModalService.prompt]{@link ModalService#confirm} method.
 */
const MODAL_PROMPT = new InjectionToken('MODAL_PROMPT');
/**
 * A service to open modal dialogs.
 */
class ModalService {
    constructor(injector, overlay, confirmModal, promptModal) {
        this.injector = injector;
        this.overlay = overlay;
        this.confirmModal = confirmModal;
        this.promptModal = promptModal;
    }
    /**
     * Open a modal dialog using the passed configuration options.
     *
     * @param component The type of the component to use for the modal.
     * @param config Configuration options for the modal.
     * @retuns An `IModalRef` object that can be used to close the modal.
     */
    openRef(component, config = {}) {
        // Override default configuration
        const modalConfig = Object.assign(Object.assign({}, DEFAULT_CONFIG), config);
        if (modalConfig.fullscreen) {
            modalConfig.width = "100%";
            modalConfig.height = "100%";
            if (Utils.isString(modalConfig.panelClass)) {
                modalConfig.panelClass = [modalConfig.panelClass, "sq-modal-fullscreen"];
            }
            else if (modalConfig.panelClass) {
                modalConfig.panelClass.push("sq-modal-fullscreen");
            }
            else {
                modalConfig.panelClass = "sq-modal-fullscreen";
            }
        }
        // Returns an OverlayRef which is a PortalHost
        const overlayRef = this.createOverlay(modalConfig);
        // Instantiate remote control
        const modalRef = new ModalRef(overlayRef);
        const overlayComponent = this.attachDialogContainer(component, overlayRef, modalConfig, modalRef);
        modalRef.componentInstance = overlayComponent;
        overlayRef.hostElement.classList.add("sq-modal-host");
        if (modalConfig.closeOnBackdropClick) {
            // NB backdropClick will not fire if pointer-events are enabled on modal-host
            overlayRef.backdropClick().subscribe(() => modalRef.close());
            // Provide support for a scrollable sq-modal-host (overlay wrapper)
            // The standard cdk styling disables pointer-events at this level which means that scrolling
            // won't work. We can enable pointer-events in css but then the backdrop will not receive the
            // click event. So, we handle the click event directly on sq-modal-host also and if the
            // click target === sq-modal-host then we initiate modal closing here
            overlayRef.hostElement.addEventListener("click", (event) => {
                if (event.target === overlayRef.hostElement) {
                    modalRef.close();
                }
            });
        }
        overlayRef.keydownEvents().subscribe((event) => {
            if (event.keyCode === Keys.esc) {
                modalRef.close();
            }
        });
        modalRef.disableSubmit();
        return modalRef;
    }
    /**
     * A wrapper around the {@link #openRef} method which returns a `Promise` that resolves
     * with the `ModalResult` when the modal is closed.
     *
     * @param component The type of the component to use for the modal.
     * @param config Configuration options for the modal.
     * @retuns The `ModalResult` when the modal is closed.
     */
    open(component, config = {}) {
        const modalRef = this.openRef(component, config);
        return modalRef.afterClosed().toPromise();
    }
    createOverlay(config) {
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }
    attachDialogContainer(component, overlayRef, config, modalRef) {
        // PortalInjector() is deprecated
        const injector = Injector.create({
            providers: [
                { provide: ModalRef, useValue: modalRef },
                { provide: MODAL_MODEL, useValue: config.model }
            ],
            parent: this.injector
        });
        const containerPortal = new ComponentPortal(component, null, injector);
        const containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }
    getOverlayConfig(config) {
        const positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();
        const overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });
        return overlayConfig;
    }
    /**
     * Open a confirmation modal dialog displaying a message and a set buttons. This is similar to the Javacsript
     * `Window.alert` method but renders a modal.
     *
     * @param options The options used to open the confirm modal. These are set as the `MODAL_MODEL`  of the modal.
     */
    confirm(options) {
        return this.open(this.confirmModal, { model: options });
    }
    /**
     * Open a prompt modal dialog displaying a message, an input and OK/Cancel buttons.
     *
     * @param options The options used to open the prompt modal. These are set as the `MODAL_MODEL`  of the modal.
     */
    prompt(options) {
        return this.open(this.promptModal, { model: options });
    }
    /**
     * Open a confirm modal that has an `OK` button.
     *
     * @param message The message to display in the modal.
     * @param messageParams The parameters for the message.
     * @param title The confirm modal's title.
     * @param confirmType The type of the confirm modal.
     */
    oK(message, messageParams, title, confirmType = 0 /* Success */) {
        return this.confirm({
            title,
            message,
            messageParams,
            confirmType,
            buttons: [
                new ModalButton({ visible: true, result: -1 /* OK */, primary: true })
            ]
        });
    }
    /**
     * Open a confirm modal that has `OK` and `Cancel` buttons.
     *
     * @param message The message to display in the modal.
     * @param messageParams The parameters for the message.
     * @param title The confirm modal's title.
     * @param confirmType The type of the confirm modal.
     * @param primaryButton The result type of the button which should be primary.
     */
    oKCancel(message, messageParams, title, confirmType = 1 /* Info */, primaryButton = -1 /* OK */) {
        return this.confirm({
            title,
            message,
            messageParams,
            confirmType,
            buttons: [
                new ModalButton({ visible: true, result: -1 /* OK */, primary: primaryButton === -1 /* OK */ }),
                new ModalButton({ visible: true, result: -2 /* Cancel */, primary: primaryButton === -2 /* Cancel */ })
            ]
        });
    }
    /**
     * Open a confirm modal that has `Yes` and `No` buttons.
     *
     * @param message The message to display in the modal.
     * @param messageParams The parameters for the message.
     * @param title The confirm modal's title.
     * @param confirmType The type of the confirm modal.
     * @param primaryButton The result type of the button which should be primary.
     */
    yesNo(message, messageParams, title, confirmType = 1 /* Info */, primaryButton = -3 /* Yes */) {
        return this.confirm({
            title,
            message,
            messageParams,
            confirmType,
            buttons: [
                new ModalButton({ visible: true, result: -3 /* Yes */, primary: primaryButton === -3 /* Yes */ }),
                new ModalButton({ visible: true, result: -4 /* No */, primary: primaryButton === -4 /* No */ })
            ]
        });
    }
}
ModalService.ɵfac = function ModalService_Factory(t) { return new (t || ModalService)(ɵɵinject(Injector), ɵɵinject(Overlay), ɵɵinject(MODAL_CONFIRM), ɵɵinject(MODAL_PROMPT)); };
ModalService.ɵprov = ɵɵdefineInjectable({ token: ModalService, factory: ModalService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ModalService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: Injector }, { type: Overlay }, { type: Type, decorators: [{
                type: Inject,
                args: [MODAL_CONFIRM]
            }] }, { type: Type, decorators: [{
                type: Inject,
                args: [MODAL_PROMPT]
            }] }]; }, null); })();

function Confirm_ng_container_8_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 4);
    ɵɵlistener("click", function Confirm_ng_container_8_button_1_Template_button_click_0_listener() { ɵɵrestoreView(_r5); const button_r1 = ɵɵnextContext().$implicit; const ctx_r3 = ɵɵnextContext(); return ctx_r3.buttonClick(button_r1); });
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    const button_r1 = ɵɵnextContext().$implicit;
    ɵɵpropertyInterpolate("type", button_r1.primary ? "submit" : "button");
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 2, button_r1.getText()));
} }
function Confirm_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Confirm_ng_container_8_button_1_Template, 3, 4, "button", 3);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const button_r1 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵproperty("ngIf", button_r1.visible);
} }
class Confirm {
    constructor(model, modalRef) {
        this.model = model;
        this.modalRef = modalRef;
    }
    get title() {
        return this.model.title ? this.model.title : "msg#modal.confirm.title";
    }
    buttonClick(button) {
        button.click(this.modalRef);
    }
}
Confirm.ɵfac = function Confirm_Factory(t) { return new (t || Confirm)(ɵɵdirectiveInject(MODAL_MODEL), ɵɵdirectiveInject(ModalRef)); };
Confirm.ɵcmp = ɵɵdefineComponent({ type: Confirm, selectors: [["sq-core-confirm"]], decls: 9, vars: 9, consts: [["cdkTrapFocus", "", 2, "border", "solid", "padding", "16px", "background-color", "white", 3, "cdkTrapFocusAutoCapture"], [2, "margin-top", "0"], [4, "ngFor", "ngForOf"], [3, "type", "click", 4, "ngIf"], [3, "type", "click"]], template: function Confirm_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "h3", 1);
        ɵɵtext(2);
        ɵɵpipe(3, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementStart(4, "div");
        ɵɵtext(5);
        ɵɵpipe(6, "sqMessage");
        ɵɵelementEnd();
        ɵɵelement(7, "hr");
        ɵɵtemplate(8, Confirm_ng_container_8_Template, 2, 1, "ng-container", 2);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("cdkTrapFocusAutoCapture", true);
        ɵɵadvance(2);
        ɵɵtextInterpolate(ɵɵpipeBind1(3, 4, ctx.title));
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind2(6, 6, ctx.model.message, ctx.model.messageParams));
        ɵɵadvance(3);
        ɵɵproperty("ngForOf", ctx.model.buttons);
    } }, directives: [CdkTrapFocus, NgForOf, NgIf], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(Confirm, [{
        type: Component,
        args: [{
                selector: "sq-core-confirm",
                template: `
        <div style="border: solid;padding: 16px;background-color: white;" cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
            <h3 style="margin-top: 0;">{{title | sqMessage}}</h3>
            <div>{{model.message | sqMessage:model.messageParams}}</div>
            <hr>
            <ng-container *ngFor="let button of model.buttons">
                <button *ngIf="button.visible" type="{{button.primary ? 'submit' : 'button'}}"
                    (click)="buttonClick(button)">{{button.getText() | sqMessage}}</button>
            </ng-container>
        </div>
    `
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: ModalRef }]; }, null); })();

function Prompt_input_7_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "input", 7);
} }
function Prompt_textarea_8_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "textarea", 8);
    ɵɵtext(1, "            ");
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵpropertyInterpolate("rows", ctx_r1.model.rowCount);
} }
function Prompt_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "br");
    ɵɵelementStart(2, "span", 9);
    ɵɵtext(3);
    ɵɵpipe(4, "sqValidationError");
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    let tmp_0_0 = null;
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind1(4, 1, (tmp_0_0 = ctx_r2.form.get("input")) == null ? null : tmp_0_0.errors));
} }
class Prompt {
    constructor(model, modalRef, formBuilder) {
        this.model = model;
        this.modalRef = modalRef;
        this.formBuilder = formBuilder;
    }
    ngOnInit() {
        this.inputControl = new FormControl(this.model.output, this.model.validators || Validators.required);
        this.form = this.formBuilder.group({
            input: this.inputControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges, (value) => {
            this.model.output = this.inputControl.value;
        });
    }
    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }
    showError(control) {
        return control.invalid && (control.dirty || this.modalRef.submitted);
    }
    ok() {
        if (!this.form.valid) {
            return;
        }
        this.modalRef.close(-1 /* OK */);
    }
    cancel() {
        this.modalRef.close(-2 /* Cancel */);
    }
    get title() {
        return this.model.title ? this.model.title : "msg#modal.prompt.title";
    }
}
Prompt.ɵfac = function Prompt_Factory(t) { return new (t || Prompt)(ɵɵdirectiveInject(MODAL_MODEL), ɵɵdirectiveInject(ModalRef), ɵɵdirectiveInject(FormBuilder)); };
Prompt.ɵcmp = ɵɵdefineComponent({ type: Prompt, selectors: [["sq-core-prompt"]], decls: 17, vars: 18, consts: [["novalidate", "", "cdkTrapFocus", "", 2, "border", "solid", "padding", "16px", "background-color", "white", 3, "formGroup", "cdkTrapFocusAutoCapture"], [2, "margin-top", "0"], ["type", "text", "formControlName", "input", 4, "ngIf"], ["type", "text", "formControlName", "input", "spellcheck", "on", "autofocus", "", 3, "rows", 4, "ngIf"], [4, "ngIf"], ["type", "submit", 3, "click"], ["type", "button", 3, "click"], ["type", "text", "formControlName", "input"], ["type", "text", "formControlName", "input", "spellcheck", "on", "autofocus", "", 3, "rows"], [2, "color", "red"]], template: function Prompt_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "h3", 1);
        ɵɵtext(2);
        ɵɵpipe(3, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementStart(4, "div");
        ɵɵtext(5);
        ɵɵpipe(6, "sqMessage");
        ɵɵelementEnd();
        ɵɵtemplate(7, Prompt_input_7_Template, 1, 0, "input", 2);
        ɵɵtemplate(8, Prompt_textarea_8_Template, 2, 1, "textarea", 3);
        ɵɵtemplate(9, Prompt_ng_container_9_Template, 5, 3, "ng-container", 4);
        ɵɵelement(10, "hr");
        ɵɵelementStart(11, "button", 5);
        ɵɵlistener("click", function Prompt_Template_button_click_11_listener() { return ctx.ok(); });
        ɵɵtext(12);
        ɵɵpipe(13, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementStart(14, "button", 6);
        ɵɵlistener("click", function Prompt_Template_button_click_14_listener() { return ctx.cancel(); });
        ɵɵtext(15);
        ɵɵpipe(16, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("formGroup", ctx.form)("cdkTrapFocusAutoCapture", true);
        ɵɵadvance(2);
        ɵɵtextInterpolate(ɵɵpipeBind1(3, 9, ctx.title));
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind2(6, 11, ctx.model.message, ctx.model.messageParams));
        ɵɵadvance(2);
        ɵɵproperty("ngIf", !ctx.model.rowCount);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", !!ctx.model.rowCount);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.showError(ctx.inputControl));
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind1(13, 14, "msg#modal.buttons.ok"));
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind1(16, 16, "msg#modal.buttons.cancel"));
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, CdkTrapFocus, FormGroupDirective, NgIf, DefaultValueAccessor, NgControlStatus, FormControlName], pipes: [MessagePipe, ValidationErrorPipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(Prompt, [{
        type: Component,
        args: [{
                selector: "sq-core-prompt",
                template: `
        <form novalidate [formGroup]="form" style="border: solid;padding: 16px;background-color: white;" cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
            <h3 style="margin-top: 0;">{{title | sqMessage}}</h3>
            <div>{{model.message | sqMessage:model.messageParams}}</div>
            <input type="text" formControlName="input" *ngIf="!model.rowCount">
            <textarea type="text" formControlName="input" spellcheck="on" rows="{{model.rowCount}}" autofocus *ngIf="!!model.rowCount">
            </textarea>
            <ng-container *ngIf="showError(inputControl)">
                <br>
                <span style="color: red;">{{form.get("input")?.errors | sqValidationError}}</span>
            </ng-container>
            <hr>
            <button type="submit" (click)="ok()">{{'msg#modal.buttons.ok' | sqMessage}}</button>
            <button type="button" (click)="cancel()">{{'msg#modal.buttons.cancel' | sqMessage}}</button>
        </form>
    `
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: ModalRef }, { type: FormBuilder }]; }, null); })();

const MODAL_MODULE_PROVIDERS = [];

/**
 * This module contains an implementation of a [modal dialog service]{@link ModalService} which can be extended
 * to support UI frameworks such as Bootstrap and Material Design. It uses the `Overlay` and `Portal` funcionality
 * provided by the [Angular CDK]{@link https://material.angular.io/cdk/categories} library.
 */
class ModalModule {
    static forRoot(confirmModal = Confirm, promptModal = Prompt) {
        return {
            ngModule: ModalModule,
            providers: [
                { provide: MODAL_CONFIRM, useValue: confirmModal },
                { provide: MODAL_PROMPT, useValue: promptModal },
            ]
        };
    }
}
ModalModule.ɵmod = ɵɵdefineNgModule({ type: ModalModule });
ModalModule.ɵinj = ɵɵdefineInjector({ factory: function ModalModule_Factory(t) { return new (t || ModalModule)(); }, providers: [
        ...MODAL_MODULE_PROVIDERS
    ], imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            // CDK
            OverlayModule,
            A11yModule,
            // Sinequa modules
            BaseModule,
            IntlModule,
            ValidationModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(ModalModule, { declarations: [Confirm,
        Prompt], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // CDK
        OverlayModule,
        A11yModule,
        // Sinequa modules
        BaseModule,
        IntlModule,
        ValidationModule] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(ModalModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    // CDK
                    OverlayModule,
                    A11yModule,
                    // Sinequa modules
                    BaseModule,
                    IntlModule,
                    ValidationModule,
                ],
                declarations: [
                    Confirm,
                    Prompt
                ],
                exports: [],
                providers: [
                    ...MODAL_MODULE_PROVIDERS
                ]
            }]
    }], null, null); })();

var _enModal = {
    "modal": {
        "buttons": {
            "ok": "OK",
            "cancel": "Cancel",
            "yes": "Yes",
            "no": "No",
            "abort": "Abort",
            "retry": "Retry",
            "ignore": "Ignore"
        },
        "confirm": {
            "title": "Confirm"
        },
        "prompt": {
            "title": "Enter a value"
        }
    }
};

var _frModal = {
    "modal": {
        "buttons": {
            "ok": "OK",
            "cancel": "Annuler",
            "yes": "Oui",
            "no": "Non",
            "abort": "Abandonner",
            "retry": "Réessayer",
            "ignore": "Ignorer"
        },
        "confirm": {
            "title": "Confirmer"
        },
        "prompt": {
            "title": "Saississez une valeur"
        }
    }
};

var _deModal = {
    "modal": {
        "buttons": {
            "ok": "OK",
            "cancel": "Abbrechen",
            "yes": "Ja",
            "no": "Nein",
            "abort": "Abbrechen",
            "retry": "Wiederholen",
            "ignore": "Ignorieren"
        },
        "confirm": {
            "title": "Bestätigen"
        },
        "prompt": {
            "title": "Geben Sie einen Wert ein"
        }
    }
};

const enModal = Utils.merge({}, _enModal, enIntl);
const frModal = Utils.merge({}, _frModal, frIntl);
const deModal = Utils.merge({}, _deModal, deIntl);

/**
 * Generated bundle index. Do not edit.
 */

export { Confirm, MODAL_CONFIRM, MODAL_MODEL, MODAL_PROMPT, ModalButton, ModalModule, ModalRef, ModalService, Prompt, deModal, enModal, frModal };
//# sourceMappingURL=sinequa-core-modal.js.map
