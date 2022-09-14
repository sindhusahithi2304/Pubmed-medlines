import { ɵɵelementStart, ɵɵtext, ɵɵpipe, ɵɵelementEnd, ɵɵnextContext, ɵɵadvance, ɵɵtextInterpolate, ɵɵpipeBind1, ɵɵdirectiveInject, Injector, ɵɵdefineComponent, ɵɵclassProp, ɵɵprojectionDef, ɵɵtemplate, ɵɵprojection, ɵɵlistener, ɵɵproperty, ɵsetClassMetadata, Component, Input, HostBinding, ɵɵgetCurrentView, ɵɵrestoreView, ɵɵclassMapInterpolate1, ɵɵpropertyInterpolate, ɵɵelementContainerStart, ɵɵelementContainerEnd, ɵɵelement, ɵɵNgOnChangesFeature, ViewEncapsulation, Inject, ɵɵpipeBind2, ɵɵsanitizeResourceUrl, EventEmitter, ElementRef, ɵɵattribute, Output, HostListener, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { NgIf, NgForOf, CommonModule } from '@angular/common';
import { FormControl, Validators, FormBuilder, ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, DefaultValueAccessor, NgControlStatus, FormControlName, SelectControlValueAccessor, NgSelectOption, ɵangular_packages_forms_forms_x, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalService, ModalRef, ModalButton, MODAL_MODEL, ModalModule } from '@sinequa/core/modal';
import { AuthenticationService, LoginModule } from '@sinequa/core/login';
import { MessagePipe, IntlModule } from '@sinequa/core/intl';
import { ValidationDirective, ValidationModule } from '@sinequa/core/validation';
import { Autofocus, UtilsModule } from '@sinequa/components/utils';
import { CdkTrapFocus, A11yModule } from '@angular/cdk/a11y';
import { START_CONFIG } from '@sinequa/core/web-services';
import { Utils, Keys } from '@sinequa/core/base';
import { DomSanitizer } from '@angular/platform-browser';
import { debounceTime } from 'rxjs/operators';
import { OverlayModule } from '@angular/cdk/overlay';

function BsModalHeader_h5_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "h5", 3);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, ctx_r0.title));
} }
const _c0 = ["*"];
class BsModalHeader {
    constructor(modalRef, injector) {
        this.modalRef = modalRef;
        this.injector = injector;
    }
    // Avoid circular reference (via Confirm)
    get modalService() {
        return this.injector.get(ModalService);
    }
    cancel() {
        this.modalRef.close(-2 /* Cancel */);
    }
}
BsModalHeader.ɵfac = function BsModalHeader_Factory(t) { return new (t || BsModalHeader)(ɵɵdirectiveInject(ModalRef), ɵɵdirectiveInject(Injector)); };
BsModalHeader.ɵcmp = ɵɵdefineComponent({ type: BsModalHeader, selectors: [["sq-modal-header"]], hostVars: 2, hostBindings: function BsModalHeader_HostBindings(rf, ctx) { if (rf & 2) {
        ɵɵclassProp("sq-modal-header", true);
    } }, inputs: { title: "title" }, ngContentSelectors: _c0, decls: 5, vars: 1, consts: [[1, "modal-header"], ["class", "modal-title", 4, "ngIf"], ["type", "button", "data-dismiss", "modal", "aria-hidden", "true", 1, "close", 3, "click"], [1, "modal-title"]], template: function BsModalHeader_Template(rf, ctx) { if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, BsModalHeader_h5_1_Template, 3, 3, "h5", 1);
        ɵɵprojection(2);
        ɵɵelementStart(3, "button", 2);
        ɵɵlistener("click", function BsModalHeader_Template_button_click_3_listener() { return ctx.cancel(); });
        ɵɵtext(4, "\u00D7");
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.title);
    } }, directives: [NgIf], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsModalHeader, [{
        type: Component,
        args: [{
                selector: "sq-modal-header",
                templateUrl: "./modal-header.component.html"
            }]
    }], function () { return [{ type: ModalRef }, { type: Injector }]; }, { title: [{
            type: Input
        }], true: [{
            type: HostBinding,
            args: ["class.sq-modal-header"]
        }] }); })();

function BsModalFooter_ng_container_1_section_1_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 5);
    ɵɵlistener("click", function BsModalFooter_ng_container_1_section_1_button_1_Template_button_click_0_listener() { ɵɵrestoreView(_r8); const button_r3 = ɵɵnextContext().$implicit; const ctx_r6 = ɵɵnextContext(2); return ctx_r6.buttonClick(button_r3); });
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    const button_r3 = ɵɵnextContext().$implicit;
    ɵɵclassMapInterpolate1("btn ", button_r3.primary ? "btn-primary" : button_r3.result < 0 ? "" : "btn-secondary", "");
    ɵɵpropertyInterpolate("type", button_r3.primary ? "submit" : "button");
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 5, button_r3.getText()));
} }
function BsModalFooter_ng_container_1_section_1_a_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 6);
    ɵɵlistener("click", function BsModalFooter_ng_container_1_section_1_a_2_Template_a_click_0_listener() { ɵɵrestoreView(_r12); const button_r3 = ɵɵnextContext().$implicit; const ctx_r10 = ɵɵnextContext(2); return ctx_r10.buttonClick(button_r3); });
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    const button_r3 = ɵɵnextContext().$implicit;
    ɵɵclassMapInterpolate1("btn ", button_r3.primary ? "btn-primary" : button_r3.result < 0 ? "sq-anchor-btn" : "btn-secondary", "");
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 4, button_r3.getText()));
} }
function BsModalFooter_ng_container_1_section_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "section");
    ɵɵtemplate(1, BsModalFooter_ng_container_1_section_1_button_1_Template, 3, 7, "button", 3);
    ɵɵtemplate(2, BsModalFooter_ng_container_1_section_1_a_2_Template, 3, 6, "a", 4);
    ɵɵelementEnd();
} if (rf & 2) {
    const button_r3 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵproperty("ngIf", button_r3.visible && !button_r3.anchor);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", button_r3.visible && button_r3.anchor);
} }
function BsModalFooter_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsModalFooter_ng_container_1_section_1_Template, 3, 2, "section", 2);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r0.buttons);
} }
function BsModalFooter_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r15 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "span", 7);
    ɵɵelementStart(2, "button", 8);
    ɵɵlistener("click", function BsModalFooter_ng_container_2_Template_button_click_2_listener() { ɵɵrestoreView(_r15); const ctx_r14 = ɵɵnextContext(); return ctx_r14.close(); });
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind1(4, 1, "msg#btnClose.text"));
} }
const _c0$1 = ["*"];
class BsModalFooter {
    constructor(modalRef, injector) {
        this.modalRef = modalRef;
        this.injector = injector;
        this.buttons = [];
    }
    ngOnChanges(changes) {
        if (changes.isProcessingState) {
            this.isProcessingState = changes.isProcessingState.currentValue;
        }
    }
    buttonClick(button) {
        if (button.validation && button.validation.controls) {
            // Mark all controls as dirty so validation errors are shown on all controls after a submit
            for (const name of Object.keys(button.validation.controls)) {
                button.validation.controls[name].markAsDirty();
            }
        }
        button.click(this.modalRef);
        return false;
    }
    close() {
        this.modalRef.close(-2 /* Cancel */);
    }
}
BsModalFooter.ɵfac = function BsModalFooter_Factory(t) { return new (t || BsModalFooter)(ɵɵdirectiveInject(ModalRef), ɵɵdirectiveInject(Injector)); };
BsModalFooter.ɵcmp = ɵɵdefineComponent({ type: BsModalFooter, selectors: [["sq-modal-footer"]], hostVars: 2, hostBindings: function BsModalFooter_HostBindings(rf, ctx) { if (rf & 2) {
        ɵɵclassProp("sq-modal-footer", true);
    } }, inputs: { buttons: "buttons", isProcessingState: "isProcessingState" }, features: [ɵɵNgOnChangesFeature], ngContentSelectors: _c0$1, decls: 4, vars: 2, consts: [[1, "modal-footer"], [4, "ngIf"], [4, "ngFor", "ngForOf"], [3, "type", "class", "click", 4, "ngIf"], ["href", "#", 3, "class", "click", 4, "ngIf"], [3, "type", "click"], ["href", "#", 3, "click"], [1, "loader"], ["type", "button", 1, "btn", 3, "click"]], template: function BsModalFooter_Template(rf, ctx) { if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, BsModalFooter_ng_container_1_Template, 2, 1, "ng-container", 1);
        ɵɵtemplate(2, BsModalFooter_ng_container_2_Template, 5, 3, "ng-container", 1);
        ɵɵelementEnd();
        ɵɵprojection(3);
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngIf", !ctx.isProcessingState);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.isProcessingState);
    } }, directives: [NgIf, NgForOf], pipes: [MessagePipe], styles: [".loader[_ngcontent-%COMP%]{-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite;border:.6rem solid #f3f3f3;border-radius:50%;border-top-color:#3498db;height:2.5rem;width:2.5rem}@-webkit-keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsModalFooter, [{
        type: Component,
        args: [{
                selector: "sq-modal-footer",
                templateUrl: "./modal-footer.component.html",
                styleUrls: ["./modal-footer.component.scss"]
            }]
    }], function () { return [{ type: ModalRef }, { type: Injector }]; }, { buttons: [{
            type: Input
        }], isProcessingState: [{
            type: Input
        }], true: [{
            type: HostBinding,
            args: ["class.sq-modal-footer"]
        }] }); })();

function BsModal_sq_modal_header_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "sq-modal-header", 5);
    ɵɵprojection(1, 1);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("title", ctx_r0.title);
} }
function BsModal_sq_modal_footer_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "sq-modal-footer", 6);
    ɵɵprojection(1, 2);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("buttons", ctx_r1.buttons)("isProcessingState", ctx_r1.isProcessingState);
} }
const _c0$2 = ["*", [["", "header", ""]], [["", "footer", ""]]];
const _c1 = ["*", "[header]", "[footer]"];
class BsModal {
    constructor() {
        this.showHeader = true;
        this.showFooter = true;
        this.isProcessingState = false;
    }
}
BsModal.ɵfac = function BsModal_Factory(t) { return new (t || BsModal)(); };
BsModal.ɵcmp = ɵɵdefineComponent({ type: BsModal, selectors: [["sq-modal"]], hostVars: 2, hostBindings: function BsModal_HostBindings(rf, ctx) { if (rf & 2) {
        ɵɵclassProp("sq-modal", true);
    } }, inputs: { title: "title", buttons: "buttons", showHeader: "showHeader", showFooter: "showFooter", isProcessingState: "isProcessingState" }, ngContentSelectors: _c1, decls: 6, vars: 3, consts: [["cdkTrapFocus", "", 1, "modal-dialog", 3, "cdkTrapFocusAutoCapture"], [1, "modal-content"], [3, "title", 4, "ngIf"], [1, "modal-body"], [3, "buttons", "isProcessingState", 4, "ngIf"], [3, "title"], [3, "buttons", "isProcessingState"]], template: function BsModal_Template(rf, ctx) { if (rf & 1) {
        ɵɵprojectionDef(_c0$2);
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "div", 1);
        ɵɵtemplate(2, BsModal_sq_modal_header_2_Template, 2, 1, "sq-modal-header", 2);
        ɵɵelementStart(3, "div", 3);
        ɵɵprojection(4);
        ɵɵelementEnd();
        ɵɵtemplate(5, BsModal_sq_modal_footer_5_Template, 2, 2, "sq-modal-footer", 4);
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("cdkTrapFocusAutoCapture", true);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.showHeader);
        ɵɵadvance(3);
        ɵɵproperty("ngIf", ctx.showFooter);
    } }, directives: [CdkTrapFocus, NgIf, BsModalHeader, BsModalFooter], styles: [".cdk-global-overlay-wrapper,.cdk-overlay-backdrop,.cdk-overlay-container{z-index:1040}.sq-modal-host{display:block;overflow:auto;pointer-events:auto}.sq-modal-pane{display:block;height:100%;padding:30px;pointer-events:none!important}.sq-modal-fullscreen *>form,.sq-modal-fullscreen .modal-content,.sq-modal-fullscreen .modal-dialog{height:100%}.sq-modal-fullscreen .modal-dialog{margin:0;max-width:none}"], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsModal, [{
        type: Component,
        args: [{
                selector: "sq-modal",
                templateUrl: "./modal.component.html",
                styleUrls: ["./modal.component.scss"],
                encapsulation: ViewEncapsulation.None
            }]
    }], null, { title: [{
            type: Input
        }], buttons: [{
            type: Input
        }], showHeader: [{
            type: Input
        }], showFooter: [{
            type: Input
        }], isProcessingState: [{
            type: Input
        }], true: [{
            type: HostBinding,
            args: ["class.sq-modal"]
        }] }); })();

function BsLogin_div_12_option_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "option", 11);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    const provider_r2 = ctx.$implicit;
    ɵɵproperty("value", provider_r2.name)("hidden", !provider_r2.name)("disabled", !provider_r2.name);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 4, provider_r2.displayName || provider_r2.name));
} }
function BsLogin_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 2);
    ɵɵelementStart(1, "label", 8);
    ɵɵtext(2);
    ɵɵpipe(3, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementStart(4, "select", 9);
    ɵɵlistener("change", function BsLogin_div_12_Template_select_change_4_listener() { ɵɵrestoreView(_r4); const ctx_r3 = ɵɵnextContext(); return ctx_r3.authenticate(); });
    ɵɵtemplate(5, BsLogin_div_12_option_5_Template, 3, 6, "option", 10);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(3, 2, "msg#modal.login.singleSignOn"));
    ɵɵadvance(3);
    ɵɵproperty("ngForOf", ctx_r0.providers);
} }
class BsLogin {
    constructor(model, modalService, modalRef, formBuilder, startConfig, authenticationService) {
        this.model = model;
        this.modalService = modalService;
        this.modalRef = modalRef;
        this.formBuilder = formBuilder;
        this.startConfig = startConfig;
        this.authenticationService = authenticationService;
    }
    ngOnInit() {
        this.userNameControl = new FormControl(this.model.userName, Validators.required);
        this.passwordControl = new FormControl(this.model.password, Validators.required);
        this.providerNameControl = new FormControl();
        this.form = this.formBuilder.group({
            userName: this.userNameControl,
            password: this.passwordControl,
            providerName: this.providerNameControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges, (value) => {
            this.model.userName = this.userNameControl.value;
            this.model.password = this.passwordControl.value;
            this.providerName = this.providerNameControl.value;
        });
        this.buttons = [
            new ModalButton({
                result: -1 /* OK */,
                primary: true,
                validation: this.form
            }),
            new ModalButton({
                result: -2 /* Cancel */
            })
        ];
        if (this.startConfig.providers) {
            Object.keys(this.startConfig.providers).forEach((providerName) => {
                if (!this.providers) {
                    this.providerName = "";
                    this.providers = [{ displayName: "msg#modal.login.signInWith", name: "" }];
                }
                this.providers.push(this.startConfig.providers[providerName]);
            });
        }
    }
    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }
    yes() {
        this.modalRef.close(-3 /* Yes */);
    }
    authenticate() {
        Utils.subscribe(this.authenticationService.authenticateWithProvider(this.providerName), (response) => {
            this.yes();
        }, (error) => {
            console.log("login.authenticate cancelled: ", error);
        });
    }
}
BsLogin.ɵfac = function BsLogin_Factory(t) { return new (t || BsLogin)(ɵɵdirectiveInject(MODAL_MODEL), ɵɵdirectiveInject(ModalService), ɵɵdirectiveInject(ModalRef), ɵɵdirectiveInject(FormBuilder), ɵɵdirectiveInject(START_CONFIG), ɵɵdirectiveInject(AuthenticationService)); };
BsLogin.ɵcmp = ɵɵdefineComponent({ type: BsLogin, selectors: [["sq-login"]], hostVars: 2, hostBindings: function BsLogin_HostBindings(rf, ctx) { if (rf & 2) {
        ɵɵclassProp("sq-login", true);
    } }, decls: 13, vars: 12, consts: [["novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "form-group", "sq-form-group"], ["for", "userName"], ["type", "text", "id", "userName", "formControlName", "userName", "spellcheck", "off", "cdkFocusInitial", "", 1, "form-control", 3, "sqValidation"], ["for", "password"], ["type", "password", "id", "password", "formControlName", "password", "autocomplete", "off", "spellcheck", "off", 1, "form-control", 3, "sqValidation"], ["class", "form-group sq-form-group", 4, "ngIf"], ["for", "providerName"], ["id", "providerName", "formControlName", "providerName", 1, "form-control", "custom-select", 3, "change"], [3, "value", "hidden", "disabled", 4, "ngFor", "ngForOf"], [3, "value", "hidden", "disabled"]], template: function BsLogin_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "sq-modal", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelementStart(3, "label", 3);
        ɵɵtext(4);
        ɵɵpipe(5, "sqMessage");
        ɵɵelementEnd();
        ɵɵelement(6, "input", 4);
        ɵɵelementEnd();
        ɵɵelementStart(7, "div", 2);
        ɵɵelementStart(8, "label", 5);
        ɵɵtext(9);
        ɵɵpipe(10, "sqMessage");
        ɵɵelementEnd();
        ɵɵelement(11, "input", 6);
        ɵɵelementEnd();
        ɵɵtemplate(12, BsLogin_div_12_Template, 6, 4, "div", 7);
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("formGroup", ctx.form);
        ɵɵadvance(1);
        ɵɵproperty("title", "msg#modal.login.title")("buttons", ctx.buttons);
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind1(5, 8, "msg#modal.login.userName"));
        ɵɵadvance(2);
        ɵɵproperty("sqValidation", ctx.form);
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind1(10, 10, "msg#modal.login.password"));
        ɵɵadvance(2);
        ɵɵproperty("sqValidation", ctx.form);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", !!ctx.providers);
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, BsModal, DefaultValueAccessor, NgControlStatus, FormControlName, ValidationDirective, NgIf, SelectControlValueAccessor, NgForOf, NgSelectOption, ɵangular_packages_forms_forms_x], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsLogin, [{
        type: Component,
        args: [{
                selector: "sq-login",
                templateUrl: "./login.component.html"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: ModalService }, { type: ModalRef }, { type: FormBuilder }, { type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: AuthenticationService }]; }, { true: [{
            type: HostBinding,
            args: ["class.sq-login"]
        }] }); })();

class BsConfirm {
    constructor(model, modalRef) {
        this.model = model;
        this.modalRef = modalRef;
    }
    get title() {
        return this.model.title ? this.model.title : "msg#modal.confirm.title";
    }
    getMessageClass(confirmType) {
        switch (confirmType) {
            case 1 /* Info */:
                return "alert-info";
            case 0 /* Success */:
                return "alert-sucess";
            case 2 /* Warning */:
                return "alert-warning";
            case 3 /* Error */:
                return "alert-danger";
            default:
                return "";
        }
    }
}
BsConfirm.ɵfac = function BsConfirm_Factory(t) { return new (t || BsConfirm)(ɵɵdirectiveInject(MODAL_MODEL), ɵɵdirectiveInject(ModalRef)); };
BsConfirm.ɵcmp = ɵɵdefineComponent({ type: BsConfirm, selectors: [["sq-confirm"]], hostVars: 2, hostBindings: function BsConfirm_HostBindings(rf, ctx) { if (rf & 2) {
        ɵɵclassProp("sq-confirm", true);
    } }, decls: 4, vars: 9, consts: [[3, "title", "buttons"]], template: function BsConfirm_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "sq-modal", 0);
        ɵɵelementStart(1, "div");
        ɵɵtext(2);
        ɵɵpipe(3, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("title", ctx.title)("buttons", ctx.model.buttons);
        ɵɵadvance(1);
        ɵɵclassMapInterpolate1("alert ", ctx.getMessageClass(ctx.model.confirmType), "");
        ɵɵadvance(1);
        ɵɵtextInterpolate(ɵɵpipeBind2(3, 6, ctx.model.message, ctx.model.messageParams));
    } }, directives: [BsModal], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsConfirm, [{
        type: Component,
        args: [{
                selector: "sq-confirm",
                templateUrl: "./confirm.component.html"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: ModalRef }]; }, { true: [{
            type: HostBinding,
            args: ["class.sq-confirm"]
        }] }); })();

function BsPrompt_input_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "input", 6);
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("sqValidation", ctx_r0.form);
} }
function BsPrompt_textarea_7_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "textarea", 7);
    ɵɵtext(1, "                    ");
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵpropertyInterpolate("rows", ctx_r1.model.rowCount);
    ɵɵproperty("sqValidation", ctx_r1.form);
} }
class BsPrompt {
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
        this.buttons = [
            new ModalButton({
                result: -1 /* OK */,
                primary: true,
                validation: this.form
            }),
            new ModalButton({
                result: -2 /* Cancel */
            })
        ];
    }
    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }
    get title() {
        return this.model.title ? this.model.title : "msg#modal.prompt.title";
    }
}
BsPrompt.ɵfac = function BsPrompt_Factory(t) { return new (t || BsPrompt)(ɵɵdirectiveInject(MODAL_MODEL), ɵɵdirectiveInject(ModalRef), ɵɵdirectiveInject(FormBuilder)); };
BsPrompt.ɵcmp = ɵɵdefineComponent({ type: BsPrompt, selectors: [["sq-prompt"]], decls: 8, vars: 9, consts: [["name", "prompt", "novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "form-group", "sq-form-group"], ["for", "input"], ["type", "text", "class", "form-control", "id", "input", "formControlName", "input", "spellcheck", "off", "sqAutofocus", "", 3, "sqValidation", 4, "ngIf"], ["type", "text", "class", "form-control", "id", "input", "formControlName", "input", "spellcheck", "on", "sqAutofocus", "", 3, "sqValidation", "rows", 4, "ngIf"], ["type", "text", "id", "input", "formControlName", "input", "spellcheck", "off", "sqAutofocus", "", 1, "form-control", 3, "sqValidation"], ["type", "text", "id", "input", "formControlName", "input", "spellcheck", "on", "sqAutofocus", "", 1, "form-control", 3, "sqValidation", "rows"]], template: function BsPrompt_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "sq-modal", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelementStart(3, "label", 3);
        ɵɵtext(4);
        ɵɵpipe(5, "sqMessage");
        ɵɵelementEnd();
        ɵɵtemplate(6, BsPrompt_input_6_Template, 1, 1, "input", 4);
        ɵɵtemplate(7, BsPrompt_textarea_7_Template, 2, 2, "textarea", 5);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("formGroup", ctx.form);
        ɵɵadvance(1);
        ɵɵproperty("title", ctx.title)("buttons", ctx.buttons);
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind2(5, 6, ctx.model.message, ctx.model.messageParams));
        ɵɵadvance(2);
        ɵɵproperty("ngIf", !ctx.model.rowCount);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", !!ctx.model.rowCount);
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, BsModal, NgIf, DefaultValueAccessor, NgControlStatus, FormControlName, Autofocus, ValidationDirective], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsPrompt, [{
        type: Component,
        args: [{
                selector: "sq-prompt",
                template: `
        <form name="prompt" novalidate [formGroup]="form">
            <sq-modal [title]="title" [buttons]="buttons">
                <div class="form-group sq-form-group">
                    <label for="input">{{model.message | sqMessage:model.messageParams}}</label>
                    <input [sqValidation]="form" type="text" class="form-control" id="input" formControlName="input" spellcheck="off" sqAutofocus *ngIf="!model.rowCount">
                    <textarea [sqValidation]="form" type="text" class="form-control" id="input" formControlName="input" spellcheck="on" rows="{{model.rowCount}}" sqAutofocus *ngIf="!!model.rowCount">
                    </textarea>
                </div>
            </sq-modal>
        </form>
    `
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: ModalRef }, { type: FormBuilder }]; }, null); })();

class BsHelp {
    constructor(startConfig, sanitizer) {
        this.startConfig = startConfig;
        this.sanitizer = sanitizer;
    }
    ngOnInit() {
        const url = this.startConfig.helpUrl || "assets/help/index.html";
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
BsHelp.ɵfac = function BsHelp_Factory(t) { return new (t || BsHelp)(ɵɵdirectiveInject(START_CONFIG), ɵɵdirectiveInject(DomSanitizer)); };
BsHelp.ɵcmp = ɵɵdefineComponent({ type: BsHelp, selectors: [["sq-help"]], hostVars: 2, hostBindings: function BsHelp_HostBindings(rf, ctx) { if (rf & 2) {
        ɵɵclassProp("modal-content", true);
    } }, decls: 3, vars: 2, consts: [[3, "title"], [1, "d-flex", "flex-column"], [3, "src"]], template: function BsHelp_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "sq-modal", 0);
        ɵɵelementStart(1, "div", 1);
        ɵɵelement(2, "iframe", 2);
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("title", "msg#help.title");
        ɵɵadvance(2);
        ɵɵproperty("src", ctx.url, ɵɵsanitizeResourceUrl);
    } }, directives: [BsModal], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsHelp, [{
        type: Component,
        args: [{
                selector: "sq-help",
                templateUrl: "./help.html"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: DomSanitizer }]; }, { true: [{
            type: HostBinding,
            args: ["class.modal-content"]
        }] }); })();

class BsOverrideUser {
    constructor(model, formBuilder) {
        this.model = model;
        this.formBuilder = formBuilder;
    }
    ngOnInit() {
        this.form = this.formBuilder.group({
            "userName": [this.model.userName, Validators.required],
            "domain": [this.model.domain, Validators.required]
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges.pipe(debounceTime(100)), (value) => {
            Utils.merge(this.model, value);
            //this.model.userName = this.form.get("userName").value;
            //this.model.domain = this.form.get("domain").value;
        });
        this.buttons = [
            new ModalButton({
                result: -1 /* OK */,
                primary: true,
                validation: this.form
            }),
            new ModalButton({
                result: -2 /* Cancel */
            })
        ];
    }
    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }
}
BsOverrideUser.ɵfac = function BsOverrideUser_Factory(t) { return new (t || BsOverrideUser)(ɵɵdirectiveInject(MODAL_MODEL), ɵɵdirectiveInject(FormBuilder)); };
BsOverrideUser.ɵcmp = ɵɵdefineComponent({ type: BsOverrideUser, selectors: [["sq-override-user"]], decls: 12, vars: 11, consts: [["name", "overrideUser", "novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "form-group", "sq-form-group"], ["for", "userName"], ["type", "text", "id", "userName", "formControlName", "userName", "spellcheck", "off", "sqAutofocus", "", 1, "form-control", 3, "sqValidation"], ["for", "domain"], ["type", "text", "id", "domain", "formControlName", "domain", "spellcheck", "off", 1, "form-control", 3, "sqValidation"]], template: function BsOverrideUser_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "sq-modal", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelementStart(3, "label", 3);
        ɵɵtext(4);
        ɵɵpipe(5, "sqMessage");
        ɵɵelementEnd();
        ɵɵelement(6, "input", 4);
        ɵɵelementEnd();
        ɵɵelementStart(7, "div", 2);
        ɵɵelementStart(8, "label", 5);
        ɵɵtext(9);
        ɵɵpipe(10, "sqMessage");
        ɵɵelementEnd();
        ɵɵelement(11, "input", 6);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("formGroup", ctx.form);
        ɵɵadvance(1);
        ɵɵproperty("title", "msg#overrideUser.title")("buttons", ctx.buttons);
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind1(5, 7, "msg#overrideUser.userName"));
        ɵɵadvance(2);
        ɵɵproperty("sqValidation", ctx.form);
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind1(10, 9, "msg#overrideUser.domain"));
        ɵɵadvance(2);
        ɵɵproperty("sqValidation", ctx.form);
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, BsModal, DefaultValueAccessor, NgControlStatus, FormControlName, Autofocus, ValidationDirective], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsOverrideUser, [{
        type: Component,
        args: [{
                selector: "sq-override-user",
                templateUrl: "./override-user.html"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: FormBuilder }]; }, null); })();

function BsEditable_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵtextInterpolate(ctx_r0.value);
} }
function BsEditable_form_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "form", 3);
    ɵɵelementStart(1, "div", 4);
    ɵɵelementStart(2, "label", 5);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementStart(5, "input", 6);
    ɵɵlistener("keydown", function BsEditable_form_1_Template_input_keydown_5_listener($event) { ɵɵrestoreView(_r3); const ctx_r2 = ɵɵnextContext(); return ctx_r2.inputKeydown($event); })("blur", function BsEditable_form_1_Template_input_blur_5_listener() { ɵɵrestoreView(_r3); const ctx_r4 = ɵɵnextContext(); return ctx_r4.stopEditing(); });
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("formGroup", ctx_r1.form);
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind1(4, 3, ctx_r1.name));
    ɵɵadvance(2);
    ɵɵproperty("sqValidation", ctx_r1.form);
} }
class BsEditable {
    constructor(formBuilder, elementRef) {
        this.formBuilder = formBuilder;
        this.elementRef = elementRef;
        this.tabindex = "0";
        this.valueChange = new EventEmitter();
    }
    ngOnInit() {
        this.editableControl = new FormControl(this.value, this.validators);
        this.modelControl = new FormControl(this.model);
        this.form = this.formBuilder.group({
            editable: this.editableControl,
            model: this.modelControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges, (value) => {
            this.value = this.editableControl.value;
        });
    }
    ngOnDestroy() {
        this.valueChange.unsubscribe();
        this.formChanges.unsubscribe();
    }
    startEditing() {
        if (!this.editing) {
            this.previousValue = this.value;
            this.editableControl["_touched"] = false; //TODO - need markAsPristine?
            this.editableControl["_pristine"] = true; //
            this.editing = true;
        }
    }
    stopEditing(cancel = false) {
        if (this.editing) {
            this.editing = false;
            if (this.focusAfterEdit && this.elementRef) {
                this.elementRef.nativeElement.focus();
            }
            this.focusAfterEdit = false;
            if (cancel) {
                this.value = this.previousValue;
            }
            this.valueChange.emit(this.value);
        }
    }
    inputKeydown(event) {
        switch (event.keyCode) {
            case Keys.enter:
                event.stopPropagation();
                this.stopEditing();
                return false;
            case Keys.esc:
                event.stopPropagation();
                this.stopEditing(true);
                return false;
        }
        return undefined;
    }
    hostKeydown(event) {
        if (event.keyCode === Keys.enter) {
            this.focusAfterEdit = true;
            this.startEditing();
            return false;
        }
        return undefined;
    }
}
BsEditable.ɵfac = function BsEditable_Factory(t) { return new (t || BsEditable)(ɵɵdirectiveInject(FormBuilder), ɵɵdirectiveInject(ElementRef)); };
BsEditable.ɵcmp = ɵɵdefineComponent({ type: BsEditable, selectors: [["sq-editable"]], hostVars: 1, hostBindings: function BsEditable_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("mousedown", function BsEditable_mousedown_HostBindingHandler() { return ctx.startEditing(); })("touchstart", function BsEditable_touchstart_HostBindingHandler() { return ctx.startEditing(); })("keydown", function BsEditable_keydown_HostBindingHandler($event) { return ctx.hostKeydown($event); });
    } if (rf & 2) {
        ɵɵattribute("tabindex", ctx.tabindex);
    } }, inputs: { name: "name", value: "value", model: "model", validators: "validators" }, outputs: { valueChange: "valueChange" }, decls: 2, vars: 2, consts: [["class", "editable-text", 4, "ngIf"], ["class", "form-inline", "role", "form", "novalidate", "", 3, "formGroup", 4, "ngIf"], [1, "editable-text"], ["role", "form", "novalidate", "", 1, "form-inline", 3, "formGroup"], [1, "form-group"], ["for", "editable", 1, "sr-only"], ["type", "text", "id", "editable", "formControlName", "editable", "spellcheck", "false", "sqAutofocus", "", 1, "form-control", 3, "sqValidation", "keydown", "blur"]], template: function BsEditable_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsEditable_div_0_Template, 2, 1, "div", 0);
        ɵɵtemplate(1, BsEditable_form_1_Template, 6, 5, "form", 1);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !ctx.editing);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.editing);
    } }, directives: [NgIf, ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, DefaultValueAccessor, NgControlStatus, FormControlName, Autofocus, ValidationDirective], pipes: [MessagePipe], styles: ["[_nghost-%COMP%]{display:block;flex:1 1 0px}[_nghost-%COMP%]   .editable-text[_ngcontent-%COMP%]{min-width:4rem;overflow-wrap:break-word;word-break:break-word;word-wrap:break-word}[_nghost-%COMP%]   form[_ngcontent-%COMP%]{display:inline-block;margin:0;white-space:nowrap;width:90%}[_nghost-%COMP%]   form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%!important}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsEditable, [{
        type: Component,
        args: [{
                selector: "sq-editable",
                templateUrl: "./editable.html",
                styleUrls: ["./editable.scss"]
            }]
    }], function () { return [{ type: FormBuilder }, { type: ElementRef }]; }, { tabindex: [{
            type: HostBinding,
            args: ["attr.tabindex"]
        }], name: [{
            type: Input
        }], value: [{
            type: Input
        }], model: [{
            type: Input
        }], valueChange: [{
            type: Output
        }], validators: [{
            type: Input
        }], startEditing: [{
            type: HostListener,
            args: ["mousedown"]
        }, {
            type: HostListener,
            args: ["touchstart"]
        }], hostKeydown: [{
            type: HostListener,
            args: ["keydown", ["$event"]]
        }] }); })();

class BsModalModule {
}
BsModalModule.ɵmod = ɵɵdefineNgModule({ type: BsModalModule });
BsModalModule.ɵinj = ɵɵdefineInjector({ factory: function BsModalModule_Factory(t) { return new (t || BsModalModule)(); }, imports: [[
            CommonModule,
            FormsModule, ReactiveFormsModule,
            OverlayModule,
            A11yModule,
            IntlModule,
            ValidationModule,
            ModalModule.forRoot(BsConfirm, BsPrompt),
            LoginModule.forRoot(BsLogin),
            UtilsModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BsModalModule, { declarations: [BsModal, BsModalHeader, BsModalFooter, BsLogin, BsConfirm,
        BsHelp, BsOverrideUser, BsEditable, BsPrompt], imports: [CommonModule,
        FormsModule, ReactiveFormsModule,
        OverlayModule,
        A11yModule,
        IntlModule,
        ValidationModule, ModalModule, LoginModule, UtilsModule], exports: [BsModal, BsModalHeader, BsModalFooter, BsLogin, BsConfirm,
        BsHelp, BsOverrideUser, BsEditable, BsPrompt] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsModalModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule, ReactiveFormsModule,
                    OverlayModule,
                    A11yModule,
                    IntlModule,
                    ValidationModule,
                    ModalModule.forRoot(BsConfirm, BsPrompt),
                    LoginModule.forRoot(BsLogin),
                    UtilsModule,
                ],
                declarations: [
                    BsModal, BsModalHeader, BsModalFooter, BsLogin, BsConfirm,
                    BsHelp, BsOverrideUser, BsEditable, BsPrompt
                ],
                exports: [
                    BsModal, BsModalHeader, BsModalFooter, BsLogin, BsConfirm,
                    BsHelp, BsOverrideUser, BsEditable, BsPrompt
                ],
            }]
    }], null, null); })();

var en = {
    "help": {
        "title": "Online Help"
    },
    "overrideUser": {
        "title": "Override User",
        "userName": "User name",
        "domain": "Domain"
    },
    "btnClose": {
        "text": "Close"
    }
};

var fr = {
    "help": {
        "title": "Aide en ligne"
    },
    "overrideUser": {
        "title": "Emprunt d'identité",
        "userName": "Identifiant",
        "domain": "Domaine"
    },
    "btnClose": {
        "text": "Fermer"
    }
};

var de = {
    "help": {
        "title": "Online-Hilfe"
    },
    "overrideUser": {
        "title": "Benutzer wechseln",
        "userName": "Benutzername",
        "domain": "Domäne"
    },
    "btnClose": {
        "text": "Schließen"
    }
};

/**
 * Generated bundle index. Do not edit.
 */

export { BsConfirm, BsEditable, BsHelp, BsLogin, BsModal, BsModalFooter, BsModalHeader, BsModalModule, BsOverrideUser, BsPrompt, de as deModal, en as enModal, fr as frModal };
//# sourceMappingURL=sinequa-components-modal.js.map
