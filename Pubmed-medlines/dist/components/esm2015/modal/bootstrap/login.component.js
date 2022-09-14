import { Component, HostBinding, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { START_CONFIG } from "@sinequa/core/web-services";
import { MODAL_MODEL, ModalButton } from "@sinequa/core/modal";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/modal";
import * as i2 from "@angular/forms";
import * as i3 from "@sinequa/core/login";
import * as i4 from "./modal.component";
import * as i5 from "@sinequa/core/validation";
import * as i6 from "@angular/common";
import * as i7 from "@sinequa/core/intl";
function BsLogin_div_12_option_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const provider_r2 = ctx.$implicit;
    i0.ɵɵproperty("value", provider_r2.name)("hidden", !provider_r2.name)("disabled", !provider_r2.name);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 4, provider_r2.displayName || provider_r2.name));
} }
function BsLogin_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelementStart(1, "label", 8);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "select", 9);
    i0.ɵɵlistener("change", function BsLogin_div_12_Template_select_change_4_listener() { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.authenticate(); });
    i0.ɵɵtemplate(5, BsLogin_div_12_option_5_Template, 3, 6, "option", 10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, "msg#modal.login.singleSignOn"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r0.providers);
} }
export class BsLogin {
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
BsLogin.ɵfac = function BsLogin_Factory(t) { return new (t || BsLogin)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(i1.ModalService), i0.ɵɵdirectiveInject(i1.ModalRef), i0.ɵɵdirectiveInject(i2.FormBuilder), i0.ɵɵdirectiveInject(START_CONFIG), i0.ɵɵdirectiveInject(i3.AuthenticationService)); };
BsLogin.ɵcmp = i0.ɵɵdefineComponent({ type: BsLogin, selectors: [["sq-login"]], hostVars: 2, hostBindings: function BsLogin_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("sq-login", true);
    } }, decls: 13, vars: 12, consts: [["novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "form-group", "sq-form-group"], ["for", "userName"], ["type", "text", "id", "userName", "formControlName", "userName", "spellcheck", "off", "cdkFocusInitial", "", 1, "form-control", 3, "sqValidation"], ["for", "password"], ["type", "password", "id", "password", "formControlName", "password", "autocomplete", "off", "spellcheck", "off", 1, "form-control", 3, "sqValidation"], ["class", "form-group sq-form-group", 4, "ngIf"], ["for", "providerName"], ["id", "providerName", "formControlName", "providerName", 1, "form-control", "custom-select", 3, "change"], [3, "value", "hidden", "disabled", 4, "ngFor", "ngForOf"], [3, "value", "hidden", "disabled"]], template: function BsLogin_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "sq-modal", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "label", 3);
        i0.ɵɵtext(4);
        i0.ɵɵpipe(5, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(6, "input", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "div", 2);
        i0.ɵɵelementStart(8, "label", 5);
        i0.ɵɵtext(9);
        i0.ɵɵpipe(10, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(11, "input", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(12, BsLogin_div_12_Template, 6, 4, "div", 7);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("title", "msg#modal.login.title")("buttons", ctx.buttons);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 8, "msg#modal.login.userName"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("sqValidation", ctx.form);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 10, "msg#modal.login.password"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("sqValidation", ctx.form);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !!ctx.providers);
    } }, directives: [i2.ɵangular_packages_forms_forms_y, i2.NgControlStatusGroup, i2.FormGroupDirective, i4.BsModal, i2.DefaultValueAccessor, i2.NgControlStatus, i2.FormControlName, i5.ValidationDirective, i6.NgIf, i2.SelectControlValueAccessor, i6.NgForOf, i2.NgSelectOption, i2.ɵangular_packages_forms_forms_x], pipes: [i7.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsLogin, [{
        type: Component,
        args: [{
                selector: "sq-login",
                templateUrl: "./login.component.html"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: i1.ModalService }, { type: i1.ModalRef }, { type: i2.FormBuilder }, { type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i3.AuthenticationService }]; }, { true: [{
            type: HostBinding,
            args: ["class.sq-login"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvbW9kYWwvIiwic291cmNlcyI6WyJib290c3RyYXAvbG9naW4uY29tcG9uZW50LnRzIiwiYm9vdHN0cmFwL2xvZ2luLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsV0FBVyxFQUFxQixNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUF5QixXQUFXLEVBQUUsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0UsT0FBTyxFQUFDLFlBQVksRUFBYyxNQUFNLDRCQUE0QixDQUFDO0FBQ3JFLE9BQU8sRUFBZSxXQUFXLEVBQVksV0FBVyxFQUFjLE1BQU0scUJBQXFCLENBQUM7QUFDbEcsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7Ozs7O0lDVXpCLGtDQUF5SDtJQUFBLFlBQXVEOztJQUFBLGlCQUFTOzs7SUFBOUksd0NBQXVCLDZCQUFBLCtCQUFBO0lBQXVELGVBQXVEO0lBQXZELHVGQUF1RDs7OztJQUh4TCw4QkFDSTtJQUFBLGdDQUEwQjtJQUFBLFlBQThDOztJQUFBLGlCQUFRO0lBQ2hGLGlDQUNJO0lBRHdGLGdMQUF5QjtJQUNqSCxzRUFBeUw7SUFDN0wsaUJBQVM7SUFDYixpQkFBTTs7O0lBSndCLGVBQThDO0lBQTlDLDBFQUE4QztJQUV2QyxlQUFZO0lBQVosMENBQVk7O0FESHpELE1BQU0sT0FBTyxPQUFPO0lBV2hCLFlBQ21DLEtBQWtCLEVBQ3ZDLFlBQTBCLEVBQzFCLFFBQWtCLEVBQ2xCLFdBQXdCLEVBQ0YsV0FBd0IsRUFDOUMscUJBQTRDO1FBTHZCLFVBQUssR0FBTCxLQUFLLENBQWE7UUFDdkMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixnQkFBVyxHQUFY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MUVRLE9BQU8sdUJBWUosV0FBVyx3SUFJWCxZQUFZOzRDQWhCZixPQUFPOzs7UUNacEIsK0JBQ0k7UUFBQSxtQ0FHSTtRQUFBLDhCQUNJO1FBQUEsZ0NBQXNCO1FBQUEsWUFBMEM7O1FBQUEsaUJBQVE7UUFDeEUsMkJBQ0o7UUFBQSxpQkFBTTtRQUNOLDhCQUNJO1FBQUEsZ0NBQXNCO1FBQUEsWUFBMEM7O1FBQUEsaUJBQVE7UUFDeEUsNEJBQ0o7UUFBQSxpQkFBTTtRQUNOLDBEQUtNO1FBQ1YsaUJBQVc7UUFDZixpQkFBTzs7UUFuQlUsb0NBQWtCO1FBRTNCLGVBQWlDO1FBQWpDLCtDQUFpQyx3QkFBQTtRQUdQLGVBQTBDO1FBQTFDLHNFQUEwQztRQUN6RCxlQUFxQjtRQUFyQix1Q0FBcUI7UUFHTixlQUEwQztRQUExQyx3RUFBMEM7UUFDekQsZUFBcUI7UUFBckIsdUNBQXFCO1FBRU8sZUFBaUI7UUFBakIsc0NBQWlCOztrRERBbkQsT0FBTztjQUpuQixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFdBQVcsRUFBRSx3QkFBd0I7YUFDeEM7O3NCQWFRLE1BQU07dUJBQUMsV0FBVzs7c0JBSWxCLE1BQU07dUJBQUMsWUFBWTs0REFmTyxJQUFJO2tCQUFsQyxXQUFXO21CQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBIb3N0QmluZGluZywgT25Jbml0LCBPbkRlc3Ryb3ksIEluamVjdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Rm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnN9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1NUQVJUX0NPTkZJRywgU3RhcnRDb25maWd9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtNb2RhbFNlcnZpY2UsIE1PREFMX01PREVMLCBNb2RhbFJlZiwgTW9kYWxCdXR0b24sIE1vZGFsUmVzdWx0fSBmcm9tIFwiQHNpbmVxdWEvY29yZS9tb2RhbFwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHtBdXRoZW50aWNhdGlvblNlcnZpY2UsIENyZWRlbnRpYWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9sb2dpblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbG9naW4uY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBCc0xvZ2luIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnNxLWxvZ2luXCIpIHRydWU7XG4gICAgdXNlck5hbWVDb250cm9sOiBGb3JtQ29udHJvbDtcbiAgICBwYXNzd29yZENvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIHByb3ZpZGVyTmFtZUNvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIGZvcm06IEZvcm1Hcm91cDtcbiAgICBmb3JtQ2hhbmdlczogU3Vic2NyaXB0aW9uO1xuICAgIGJ1dHRvbnM6IE1vZGFsQnV0dG9uW107XG4gICAgcHJvdmlkZXJzOiBhbnlbXTtcbiAgICBwcm92aWRlck5hbWU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KE1PREFMX01PREVMKSBwcm90ZWN0ZWQgbW9kZWw6IENyZWRlbnRpYWxzLFxuICAgICAgICBwcm90ZWN0ZWQgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBtb2RhbFJlZjogTW9kYWxSZWYsXG4gICAgICAgIHByb3RlY3RlZCBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgICAgIEBJbmplY3QoU1RBUlRfQ09ORklHKSBwcm90ZWN0ZWQgc3RhcnRDb25maWc6IFN0YXJ0Q29uZmlnLFxuICAgICAgICBwcm90ZWN0ZWQgYXV0aGVudGljYXRpb25TZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy51c2VyTmFtZUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wodGhpcy5tb2RlbC51c2VyTmFtZSwgVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgICAgIHRoaXMucGFzc3dvcmRDb250cm9sID0gbmV3IEZvcm1Db250cm9sKHRoaXMubW9kZWwucGFzc3dvcmQsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgICB0aGlzLnByb3ZpZGVyTmFtZUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICB1c2VyTmFtZTogdGhpcy51c2VyTmFtZUNvbnRyb2wsXG4gICAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZENvbnRyb2wsXG4gICAgICAgICAgICBwcm92aWRlck5hbWU6IHRoaXMucHJvdmlkZXJOYW1lQ29udHJvbFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5mb3JtQ2hhbmdlcyA9IFV0aWxzLnN1YnNjcmliZSh0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLFxuICAgICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC51c2VyTmFtZSA9IHRoaXMudXNlck5hbWVDb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwucGFzc3dvcmQgPSB0aGlzLnBhc3N3b3JkQ29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3ZpZGVyTmFtZSA9IHRoaXMucHJvdmlkZXJOYW1lQ29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IFtcbiAgICAgICAgICAgIG5ldyBNb2RhbEJ1dHRvbih7XG4gICAgICAgICAgICAgICAgcmVzdWx0OiBNb2RhbFJlc3VsdC5PSyxcbiAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IHRoaXMuZm9ybVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXcgTW9kYWxCdXR0b24oe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogTW9kYWxSZXN1bHQuQ2FuY2VsXG4gICAgICAgICAgICB9KVxuICAgICAgICBdO1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0Q29uZmlnLnByb3ZpZGVycykge1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5zdGFydENvbmZpZy5wcm92aWRlcnMpLmZvckVhY2goKHByb3ZpZGVyTmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wcm92aWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm92aWRlck5hbWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3ZpZGVycyA9IFt7ZGlzcGxheU5hbWU6IFwibXNnI21vZGFsLmxvZ2luLnNpZ25JbldpdGhcIiwgbmFtZTogXCJcIn1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnByb3ZpZGVycy5wdXNoKHRoaXMuc3RhcnRDb25maWcucHJvdmlkZXJzIVtwcm92aWRlck5hbWVdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZm9ybUNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICB5ZXMoKSB7XG4gICAgICAgIHRoaXMubW9kYWxSZWYuY2xvc2UoTW9kYWxSZXN1bHQuWWVzKTtcbiAgICB9XG5cbiAgICBhdXRoZW50aWNhdGUoKSB7XG4gICAgICAgIFV0aWxzLnN1YnNjcmliZSh0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5hdXRoZW50aWNhdGVXaXRoUHJvdmlkZXIodGhpcy5wcm92aWRlck5hbWUpLFxuICAgICAgICAgICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy55ZXMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvZ2luLmF1dGhlbnRpY2F0ZSBjYW5jZWxsZWQ6IFwiLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4iLCI8Zm9ybSBub3ZhbGlkYXRlIFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgIDxzcS1tb2RhbFxuICAgICAgICBbdGl0bGVdPVwiJ21zZyNtb2RhbC5sb2dpbi50aXRsZSdcIlxuICAgICAgICBbYnV0dG9uc109XCJidXR0b25zXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHNxLWZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ1c2VyTmFtZVwiPnt7J21zZyNtb2RhbC5sb2dpbi51c2VyTmFtZScgfCBzcU1lc3NhZ2V9fTwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgW3NxVmFsaWRhdGlvbl09XCJmb3JtXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwidXNlck5hbWVcIiBmb3JtQ29udHJvbE5hbWU9XCJ1c2VyTmFtZVwiIHNwZWxsY2hlY2s9XCJvZmZcIiBjZGtGb2N1c0luaXRpYWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBzcS1mb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj57eydtc2cjbW9kYWwubG9naW4ucGFzc3dvcmQnIHwgc3FNZXNzYWdlfX08L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IFtzcVZhbGlkYXRpb25dPVwiZm9ybVwiIHR5cGU9XCJwYXNzd29yZFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJwYXNzd29yZFwiIGZvcm1Db250cm9sTmFtZT1cInBhc3N3b3JkXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgc3BlbGxjaGVjaz1cIm9mZlwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgc3EtZm9ybS1ncm91cFwiICpuZ0lmPVwiISFwcm92aWRlcnNcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwcm92aWRlck5hbWVcIj57eydtc2cjbW9kYWwubG9naW4uc2luZ2xlU2lnbk9uJyB8IHNxTWVzc2FnZX19PC9sYWJlbD5cbiAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgY3VzdG9tLXNlbGVjdFwiIGlkPVwicHJvdmlkZXJOYW1lXCIgZm9ybUNvbnRyb2xOYW1lPVwicHJvdmlkZXJOYW1lXCIgKGNoYW5nZSk9XCJhdXRoZW50aWNhdGUoKVwiPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IHByb3ZpZGVyIG9mIHByb3ZpZGVyc1wiIFt2YWx1ZV09XCJwcm92aWRlci5uYW1lXCIgW2hpZGRlbl09XCIhcHJvdmlkZXIubmFtZVwiIFtkaXNhYmxlZF09XCIhcHJvdmlkZXIubmFtZVwiPnt7KHByb3ZpZGVyLmRpc3BsYXlOYW1lIHx8IHByb3ZpZGVyLm5hbWUpIHwgc3FNZXNzYWdlfX08L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L3NxLW1vZGFsPlxuPC9mb3JtPiJdfQ==