(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/overlay'), require('@angular/cdk/portal'), require('@sinequa/core/base'), require('rxjs'), require('@angular/cdk/a11y'), require('@angular/common'), require('@sinequa/core/intl'), require('@angular/forms'), require('@sinequa/core/validation')) :
    typeof define === 'function' && define.amd ? define('@sinequa/core/modal', ['exports', '@angular/core', '@angular/cdk/overlay', '@angular/cdk/portal', '@sinequa/core/base', 'rxjs', '@angular/cdk/a11y', '@angular/common', '@sinequa/core/intl', '@angular/forms', '@sinequa/core/validation'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.core = global.sinequa.core || {}, global.sinequa.core.modal = {}), global.ng.core, global.ng.cdk.overlay, global.ng.cdk.portal, global.sinequa.core.base, global.rxjs, global.ng.cdk.a11y, global.ng.common, global.sinequa.core.intl, global.ng.forms, global.sinequa.core.validation));
}(this, (function (exports, i0, i1, portal, base, rxjs, i2, i3, i4, i2$1, i6) { 'use strict';

    /**
     * An implementation of the {@link IModalRef} interface.
     */
    var ModalRef = /** @class */ (function () {
        function ModalRef(overlayRef) {
            var _this = this;
            this.overlayRef = overlayRef;
            this._checkClose = new rxjs.Subject();
            this._beforeClosed = new rxjs.Subject();
            this._afterClosed = new rxjs.Subject();
            this.submitListener = function (event) {
                _this.submitted = true;
                event.preventDefault();
                return false;
            };
        }
        /**
         * A stream that emits before the referenced modal is closed to allow an observer
         * to cancel the closing.
         */
        ModalRef.prototype.checkClose = function () {
            return this._checkClose.asObservable();
        };
        /**
         * A stream that emits before the referenced modal is closed.
         */
        ModalRef.prototype.beforeClosed = function () {
            return this._beforeClosed.asObservable();
        };
        /**
         * A stream that emits aftervthe referenced modal is closed.
         */
        ModalRef.prototype.afterClosed = function () {
            return this._afterClosed.asObservable();
        };
        /**
         * Close the referenced modal with the passed `result`.
         * @param result The referenced modal's result.
         */
        ModalRef.prototype.close = function (result /* Cancel */) {
            var _this = this;
            if (result === void 0) { result = -2; }
            // Delay to allow submit handling
            base.Utils.delay().then(function () {
                var checkCloseEvent = { result: result };
                _this._checkClose.next(checkCloseEvent);
                (checkCloseEvent.cancelled || rxjs.of(false)).subscribe(function (cancelled) {
                    if (!cancelled) {
                        _this._checkClose.complete();
                        _this._beforeClosed.next(result);
                        _this._beforeClosed.complete();
                        _this.removeSubmitListener();
                        _this.overlayRef.detachBackdrop();
                        _this.overlayRef.dispose();
                        _this.componentInstance = undefined;
                        _this._afterClosed.next(result);
                        _this._afterClosed.complete();
                    }
                });
            });
        };
        /**
         * Disable the standard browser submit handling on any HTML form in the modal component.
         */
        ModalRef.prototype.disableSubmit = function () {
            if (!this.formElement) {
                var formElement = this.overlayRef.overlayElement.querySelector("form");
                if (formElement) {
                    this.formElement = formElement;
                    this.formElement.addEventListener("submit", this.submitListener);
                }
            }
        };
        ModalRef.prototype.removeSubmitListener = function () {
            if (this.formElement) {
                this.formElement.removeEventListener("submit", this.submitListener);
                this.formElement = undefined;
            }
        };
        return ModalRef;
    }());

    var DEFAULT_CONFIG = {
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
    var MODAL_MODEL = new i0.InjectionToken('MODAL_MODEL');
    /**
     * A class representing a button displayed in a modal.
     */
    var ModalButton = /** @class */ (function () {
        function ModalButton(options) {
            base.Utils.extend(this, { visible: true, anchor: false }, options);
        }
        /**
         * Get the button text. Buttons with non-custom result types
         * have default text depending on their result type -
         * `msg#modal.buttons.ok`, `msg#modal.buttons.cancel` etc
         */
        ModalButton.prototype.getText = function () {
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
        };
        /**
         * Perform a click on a button. The button's explicit action is performed if set and
         * the modal closed with the button's modal result if the `result` type is non-`Custom`.
         * If the validation status not `valid` this method returns without performing any action.
         *
         * @param closer An object with a `close` method. If the result type is non-custom then
         * the `close` method of this object is called.
         */
        ModalButton.prototype.click = function (closer) {
            if (this.validation && !this.validation.valid) {
                return;
            }
            if (this.action) {
                this.action(this);
            }
            if (this.result !== 0 /* Custom */) {
                closer.close(this.result);
            }
        };
        return ModalButton;
    }());
    /**
     * An injection token to set the component to use for the `confirm` modal displayed
     * by the [ModalService.confirm]{@link ModalService#confirm} method.
     */
    var MODAL_CONFIRM = new i0.InjectionToken('MODAL_CONFIRM');
    /**
     * An injection token to set the component to use for the `prompt` modal displayed
     * by the [ModalService.prompt]{@link ModalService#confirm} method.
     */
    var MODAL_PROMPT = new i0.InjectionToken('MODAL_PROMPT');
    /**
     * A service to open modal dialogs.
     */
    var ModalService = /** @class */ (function () {
        function ModalService(injector, overlay, confirmModal, promptModal) {
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
        ModalService.prototype.openRef = function (component, config) {
            if (config === void 0) { config = {}; }
            // Override default configuration
            var modalConfig = Object.assign(Object.assign({}, DEFAULT_CONFIG), config);
            if (modalConfig.fullscreen) {
                modalConfig.width = "100%";
                modalConfig.height = "100%";
                if (base.Utils.isString(modalConfig.panelClass)) {
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
            var overlayRef = this.createOverlay(modalConfig);
            // Instantiate remote control
            var modalRef = new ModalRef(overlayRef);
            var overlayComponent = this.attachDialogContainer(component, overlayRef, modalConfig, modalRef);
            modalRef.componentInstance = overlayComponent;
            overlayRef.hostElement.classList.add("sq-modal-host");
            if (modalConfig.closeOnBackdropClick) {
                // NB backdropClick will not fire if pointer-events are enabled on modal-host
                overlayRef.backdropClick().subscribe(function () { return modalRef.close(); });
                // Provide support for a scrollable sq-modal-host (overlay wrapper)
                // The standard cdk styling disables pointer-events at this level which means that scrolling
                // won't work. We can enable pointer-events in css but then the backdrop will not receive the
                // click event. So, we handle the click event directly on sq-modal-host also and if the
                // click target === sq-modal-host then we initiate modal closing here
                overlayRef.hostElement.addEventListener("click", function (event) {
                    if (event.target === overlayRef.hostElement) {
                        modalRef.close();
                    }
                });
            }
            overlayRef.keydownEvents().subscribe(function (event) {
                if (event.keyCode === base.Keys.esc) {
                    modalRef.close();
                }
            });
            modalRef.disableSubmit();
            return modalRef;
        };
        /**
         * A wrapper around the {@link #openRef} method which returns a `Promise` that resolves
         * with the `ModalResult` when the modal is closed.
         *
         * @param component The type of the component to use for the modal.
         * @param config Configuration options for the modal.
         * @retuns The `ModalResult` when the modal is closed.
         */
        ModalService.prototype.open = function (component, config) {
            if (config === void 0) { config = {}; }
            var modalRef = this.openRef(component, config);
            return modalRef.afterClosed().toPromise();
        };
        ModalService.prototype.createOverlay = function (config) {
            var overlayConfig = this.getOverlayConfig(config);
            return this.overlay.create(overlayConfig);
        };
        ModalService.prototype.attachDialogContainer = function (component, overlayRef, config, modalRef) {
            // PortalInjector() is deprecated
            var injector = i0.Injector.create({
                providers: [
                    { provide: ModalRef, useValue: modalRef },
                    { provide: MODAL_MODEL, useValue: config.model }
                ],
                parent: this.injector
            });
            var containerPortal = new portal.ComponentPortal(component, null, injector);
            var containerRef = overlayRef.attach(containerPortal);
            return containerRef.instance;
        };
        ModalService.prototype.getOverlayConfig = function (config) {
            var positionStrategy = this.overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically();
            var overlayConfig = new i1.OverlayConfig({
                hasBackdrop: config.hasBackdrop,
                backdropClass: config.backdropClass,
                panelClass: config.panelClass,
                scrollStrategy: this.overlay.scrollStrategies.block(),
                positionStrategy: positionStrategy
            });
            return overlayConfig;
        };
        /**
         * Open a confirmation modal dialog displaying a message and a set buttons. This is similar to the Javacsript
         * `Window.alert` method but renders a modal.
         *
         * @param options The options used to open the confirm modal. These are set as the `MODAL_MODEL`  of the modal.
         */
        ModalService.prototype.confirm = function (options) {
            return this.open(this.confirmModal, { model: options });
        };
        /**
         * Open a prompt modal dialog displaying a message, an input and OK/Cancel buttons.
         *
         * @param options The options used to open the prompt modal. These are set as the `MODAL_MODEL`  of the modal.
         */
        ModalService.prototype.prompt = function (options) {
            return this.open(this.promptModal, { model: options });
        };
        /**
         * Open a confirm modal that has an `OK` button.
         *
         * @param message The message to display in the modal.
         * @param messageParams The parameters for the message.
         * @param title The confirm modal's title.
         * @param confirmType The type of the confirm modal.
         */
        ModalService.prototype.oK = function (message, messageParams, title, confirmType /* Success */) {
            if (confirmType === void 0) { confirmType = 0; }
            return this.confirm({
                title: title,
                message: message,
                messageParams: messageParams,
                confirmType: confirmType,
                buttons: [
                    new ModalButton({ visible: true, result: -1 /* OK */, primary: true })
                ]
            });
        };
        /**
         * Open a confirm modal that has `OK` and `Cancel` buttons.
         *
         * @param message The message to display in the modal.
         * @param messageParams The parameters for the message.
         * @param title The confirm modal's title.
         * @param confirmType The type of the confirm modal.
         * @param primaryButton The result type of the button which should be primary.
         */
        ModalService.prototype.oKCancel = function (message, messageParams, title, confirmType /* Info */, primaryButton /* OK */) {
            if (confirmType === void 0) { confirmType = 1; }
            if (primaryButton === void 0) { primaryButton = -1; }
            return this.confirm({
                title: title,
                message: message,
                messageParams: messageParams,
                confirmType: confirmType,
                buttons: [
                    new ModalButton({ visible: true, result: -1 /* OK */, primary: primaryButton === -1 /* OK */ }),
                    new ModalButton({ visible: true, result: -2 /* Cancel */, primary: primaryButton === -2 /* Cancel */ })
                ]
            });
        };
        /**
         * Open a confirm modal that has `Yes` and `No` buttons.
         *
         * @param message The message to display in the modal.
         * @param messageParams The parameters for the message.
         * @param title The confirm modal's title.
         * @param confirmType The type of the confirm modal.
         * @param primaryButton The result type of the button which should be primary.
         */
        ModalService.prototype.yesNo = function (message, messageParams, title, confirmType /* Info */, primaryButton /* Yes */) {
            if (confirmType === void 0) { confirmType = 1; }
            if (primaryButton === void 0) { primaryButton = -3; }
            return this.confirm({
                title: title,
                message: message,
                messageParams: messageParams,
                confirmType: confirmType,
                buttons: [
                    new ModalButton({ visible: true, result: -3 /* Yes */, primary: primaryButton === -3 /* Yes */ }),
                    new ModalButton({ visible: true, result: -4 /* No */, primary: primaryButton === -4 /* No */ })
                ]
            });
        };
        return ModalService;
    }());
    ModalService.ɵfac = function ModalService_Factory(t) { return new (t || ModalService)(i0.ɵɵinject(i0.Injector), i0.ɵɵinject(i1.Overlay), i0.ɵɵinject(MODAL_CONFIRM), i0.ɵɵinject(MODAL_PROMPT)); };
    ModalService.ɵprov = i0.ɵɵdefineInjectable({ token: ModalService, factory: ModalService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ModalService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: i0.Injector }, { type: i1.Overlay }, { type: i0.Type, decorators: [{
                            type: i0.Inject,
                            args: [MODAL_CONFIRM]
                        }] }, { type: i0.Type, decorators: [{
                            type: i0.Inject,
                            args: [MODAL_PROMPT]
                        }] }];
        }, null);
    })();

    function Confirm_ng_container_8_button_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r5_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "button", 4);
            i0.ɵɵlistener("click", function Confirm_ng_container_8_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5_1); var button_r1 = i0.ɵɵnextContext().$implicit; var ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.buttonClick(button_r1); });
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var button_r1 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵpropertyInterpolate("type", button_r1.primary ? "submit" : "button");
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, button_r1.getText()));
        }
    }
    function Confirm_ng_container_8_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, Confirm_ng_container_8_button_1_Template, 3, 4, "button", 3);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var button_r1 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", button_r1.visible);
        }
    }
    var Confirm = /** @class */ (function () {
        function Confirm(model, modalRef) {
            this.model = model;
            this.modalRef = modalRef;
        }
        Object.defineProperty(Confirm.prototype, "title", {
            get: function () {
                return this.model.title ? this.model.title : "msg#modal.confirm.title";
            },
            enumerable: false,
            configurable: true
        });
        Confirm.prototype.buttonClick = function (button) {
            button.click(this.modalRef);
        };
        return Confirm;
    }());
    Confirm.ɵfac = function Confirm_Factory(t) { return new (t || Confirm)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(ModalRef)); };
    Confirm.ɵcmp = i0.ɵɵdefineComponent({ type: Confirm, selectors: [["sq-core-confirm"]], decls: 9, vars: 9, consts: [["cdkTrapFocus", "", 2, "border", "solid", "padding", "16px", "background-color", "white", 3, "cdkTrapFocusAutoCapture"], [2, "margin-top", "0"], [4, "ngFor", "ngForOf"], [3, "type", "click", 4, "ngIf"], [3, "type", "click"]], template: function Confirm_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "h3", 1);
                i0.ɵɵtext(2);
                i0.ɵɵpipe(3, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(4, "div");
                i0.ɵɵtext(5);
                i0.ɵɵpipe(6, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelement(7, "hr");
                i0.ɵɵtemplate(8, Confirm_ng_container_8_Template, 2, 1, "ng-container", 2);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("cdkTrapFocusAutoCapture", true);
                i0.ɵɵadvance(2);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 4, ctx.title));
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 6, ctx.model.message, ctx.model.messageParams));
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("ngForOf", ctx.model.buttons);
            }
        }, directives: [i2.CdkTrapFocus, i3.NgForOf, i3.NgIf], pipes: [i4.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(Confirm, [{
                type: i0.Component,
                args: [{
                        selector: "sq-core-confirm",
                        template: "\n        <div style=\"border: solid;padding: 16px;background-color: white;\" cdkTrapFocus [cdkTrapFocusAutoCapture]=\"true\">\n            <h3 style=\"margin-top: 0;\">{{title | sqMessage}}</h3>\n            <div>{{model.message | sqMessage:model.messageParams}}</div>\n            <hr>\n            <ng-container *ngFor=\"let button of model.buttons\">\n                <button *ngIf=\"button.visible\" type=\"{{button.primary ? 'submit' : 'button'}}\"\n                    (click)=\"buttonClick(button)\">{{button.getText() | sqMessage}}</button>\n            </ng-container>\n        </div>\n    "
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [MODAL_MODEL]
                        }] }, { type: ModalRef }];
        }, null);
    })();

    function Prompt_input_7_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "input", 7);
        }
    }
    function Prompt_textarea_8_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "textarea", 8);
            i0.ɵɵtext(1, "            ");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵpropertyInterpolate("rows", ctx_r1.model.rowCount);
        }
    }
    function Prompt_ng_container_9_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelement(1, "br");
            i0.ɵɵelementStart(2, "span", 9);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqValidationError");
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext();
            var tmp_0_0 = null;
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, (tmp_0_0 = ctx_r2.form.get("input")) == null ? null : tmp_0_0.errors));
        }
    }
    var Prompt = /** @class */ (function () {
        function Prompt(model, modalRef, formBuilder) {
            this.model = model;
            this.modalRef = modalRef;
            this.formBuilder = formBuilder;
        }
        Prompt.prototype.ngOnInit = function () {
            var _this = this;
            this.inputControl = new i2$1.FormControl(this.model.output, this.model.validators || i2$1.Validators.required);
            this.form = this.formBuilder.group({
                input: this.inputControl
            });
            this.formChanges = base.Utils.subscribe(this.form.valueChanges, function (value) {
                _this.model.output = _this.inputControl.value;
            });
        };
        Prompt.prototype.ngOnDestroy = function () {
            this.formChanges.unsubscribe();
        };
        Prompt.prototype.showError = function (control) {
            return control.invalid && (control.dirty || this.modalRef.submitted);
        };
        Prompt.prototype.ok = function () {
            if (!this.form.valid) {
                return;
            }
            this.modalRef.close(-1 /* OK */);
        };
        Prompt.prototype.cancel = function () {
            this.modalRef.close(-2 /* Cancel */);
        };
        Object.defineProperty(Prompt.prototype, "title", {
            get: function () {
                return this.model.title ? this.model.title : "msg#modal.prompt.title";
            },
            enumerable: false,
            configurable: true
        });
        return Prompt;
    }());
    Prompt.ɵfac = function Prompt_Factory(t) { return new (t || Prompt)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(ModalRef), i0.ɵɵdirectiveInject(i2$1.FormBuilder)); };
    Prompt.ɵcmp = i0.ɵɵdefineComponent({ type: Prompt, selectors: [["sq-core-prompt"]], decls: 17, vars: 18, consts: [["novalidate", "", "cdkTrapFocus", "", 2, "border", "solid", "padding", "16px", "background-color", "white", 3, "formGroup", "cdkTrapFocusAutoCapture"], [2, "margin-top", "0"], ["type", "text", "formControlName", "input", 4, "ngIf"], ["type", "text", "formControlName", "input", "spellcheck", "on", "autofocus", "", 3, "rows", 4, "ngIf"], [4, "ngIf"], ["type", "submit", 3, "click"], ["type", "button", 3, "click"], ["type", "text", "formControlName", "input"], ["type", "text", "formControlName", "input", "spellcheck", "on", "autofocus", "", 3, "rows"], [2, "color", "red"]], template: function Prompt_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "form", 0);
                i0.ɵɵelementStart(1, "h3", 1);
                i0.ɵɵtext(2);
                i0.ɵɵpipe(3, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(4, "div");
                i0.ɵɵtext(5);
                i0.ɵɵpipe(6, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(7, Prompt_input_7_Template, 1, 0, "input", 2);
                i0.ɵɵtemplate(8, Prompt_textarea_8_Template, 2, 1, "textarea", 3);
                i0.ɵɵtemplate(9, Prompt_ng_container_9_Template, 5, 3, "ng-container", 4);
                i0.ɵɵelement(10, "hr");
                i0.ɵɵelementStart(11, "button", 5);
                i0.ɵɵlistener("click", function Prompt_Template_button_click_11_listener() { return ctx.ok(); });
                i0.ɵɵtext(12);
                i0.ɵɵpipe(13, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(14, "button", 6);
                i0.ɵɵlistener("click", function Prompt_Template_button_click_14_listener() { return ctx.cancel(); });
                i0.ɵɵtext(15);
                i0.ɵɵpipe(16, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("formGroup", ctx.form)("cdkTrapFocusAutoCapture", true);
                i0.ɵɵadvance(2);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 9, ctx.title));
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 11, ctx.model.message, ctx.model.messageParams));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", !ctx.model.rowCount);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", !!ctx.model.rowCount);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.showError(ctx.inputControl));
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 14, "msg#modal.buttons.ok"));
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 16, "msg#modal.buttons.cancel"));
            }
        }, directives: [i2$1.ɵangular_packages_forms_forms_y, i2$1.NgControlStatusGroup, i2.CdkTrapFocus, i2$1.FormGroupDirective, i3.NgIf, i2$1.DefaultValueAccessor, i2$1.NgControlStatus, i2$1.FormControlName], pipes: [i4.MessagePipe, i6.ValidationErrorPipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(Prompt, [{
                type: i0.Component,
                args: [{
                        selector: "sq-core-prompt",
                        template: "\n        <form novalidate [formGroup]=\"form\" style=\"border: solid;padding: 16px;background-color: white;\" cdkTrapFocus [cdkTrapFocusAutoCapture]=\"true\">\n            <h3 style=\"margin-top: 0;\">{{title | sqMessage}}</h3>\n            <div>{{model.message | sqMessage:model.messageParams}}</div>\n            <input type=\"text\" formControlName=\"input\" *ngIf=\"!model.rowCount\">\n            <textarea type=\"text\" formControlName=\"input\" spellcheck=\"on\" rows=\"{{model.rowCount}}\" autofocus *ngIf=\"!!model.rowCount\">\n            </textarea>\n            <ng-container *ngIf=\"showError(inputControl)\">\n                <br>\n                <span style=\"color: red;\">{{form.get(\"input\")?.errors | sqValidationError}}</span>\n            </ng-container>\n            <hr>\n            <button type=\"submit\" (click)=\"ok()\">{{'msg#modal.buttons.ok' | sqMessage}}</button>\n            <button type=\"button\" (click)=\"cancel()\">{{'msg#modal.buttons.cancel' | sqMessage}}</button>\n        </form>\n    "
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [MODAL_MODEL]
                        }] }, { type: ModalRef }, { type: i2$1.FormBuilder }];
        }, null);
    })();

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var MODAL_MODULE_PROVIDERS = [];

    /**
     * This module contains an implementation of a [modal dialog service]{@link ModalService} which can be extended
     * to support UI frameworks such as Bootstrap and Material Design. It uses the `Overlay` and `Portal` funcionality
     * provided by the [Angular CDK]{@link https://material.angular.io/cdk/categories} library.
     */
    var ModalModule = /** @class */ (function () {
        function ModalModule() {
        }
        ModalModule.forRoot = function (confirmModal, promptModal) {
            if (confirmModal === void 0) { confirmModal = Confirm; }
            if (promptModal === void 0) { promptModal = Prompt; }
            return {
                ngModule: ModalModule,
                providers: [
                    { provide: MODAL_CONFIRM, useValue: confirmModal },
                    { provide: MODAL_PROMPT, useValue: promptModal },
                ]
            };
        };
        return ModalModule;
    }());
    ModalModule.ɵmod = i0.ɵɵdefineNgModule({ type: ModalModule });
    ModalModule.ɵinj = i0.ɵɵdefineInjector({ factory: function ModalModule_Factory(t) { return new (t || ModalModule)(); }, providers: __spread(MODAL_MODULE_PROVIDERS), imports: [[
                i3.CommonModule,
                i2$1.FormsModule,
                i2$1.ReactiveFormsModule,
                // CDK
                i1.OverlayModule,
                i2.A11yModule,
                // Sinequa modules
                base.BaseModule,
                i4.IntlModule,
                i6.ValidationModule,
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ModalModule, { declarations: [Confirm,
                Prompt], imports: [i3.CommonModule,
                i2$1.FormsModule,
                i2$1.ReactiveFormsModule,
                // CDK
                i1.OverlayModule,
                i2.A11yModule,
                // Sinequa modules
                base.BaseModule,
                i4.IntlModule,
                i6.ValidationModule] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ModalModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i3.CommonModule,
                            i2$1.FormsModule,
                            i2$1.ReactiveFormsModule,
                            // CDK
                            i1.OverlayModule,
                            i2.A11yModule,
                            // Sinequa modules
                            base.BaseModule,
                            i4.IntlModule,
                            i6.ValidationModule,
                        ],
                        declarations: [
                            Confirm,
                            Prompt
                        ],
                        exports: [],
                        providers: __spread(MODAL_MODULE_PROVIDERS)
                    }]
            }], null, null);
    })();

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

    var enModal = base.Utils.merge({}, _enModal, i4.enIntl);
    var frModal = base.Utils.merge({}, _frModal, i4.frIntl);
    var deModal = base.Utils.merge({}, _deModal, i4.deIntl);

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Confirm = Confirm;
    exports.MODAL_CONFIRM = MODAL_CONFIRM;
    exports.MODAL_MODEL = MODAL_MODEL;
    exports.MODAL_PROMPT = MODAL_PROMPT;
    exports.ModalButton = ModalButton;
    exports.ModalModule = ModalModule;
    exports.ModalRef = ModalRef;
    exports.ModalService = ModalService;
    exports.Prompt = Prompt;
    exports.deModal = deModal;
    exports.enModal = enModal;
    exports.frModal = frModal;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-core-modal.umd.js.map
