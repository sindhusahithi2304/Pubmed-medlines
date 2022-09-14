import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MODAL_MODEL } from "@sinequa/core/modal";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/modal";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/cdk/a11y";
import * as i4 from "@angular/common";
import * as i5 from "@sinequa/core/intl";
import * as i6 from "@sinequa/core/validation";
function Login_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "br");
    i0.ɵɵelementStart(2, "span", 8);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqValidationError");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    let tmp_0_0 = null;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, (tmp_0_0 = ctx_r0.form.get("userName")) == null ? null : tmp_0_0.errors));
} }
function Login_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "br");
    i0.ɵɵelementStart(2, "span", 8);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqValidationError");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    let tmp_0_0 = null;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, (tmp_0_0 = ctx_r1.form.get("password")) == null ? null : tmp_0_0.errors));
} }
/**
 * A basic login component that request a user name and password. It is designed to work with
 * [LoginService.getCredentials]{@link LoginService#getCredentials} and can be set using the
 * {@link MODAL_LOGIN} injection token
 */
export class Login {
    constructor(model, modalRef, formBuilder) {
        this.model = model;
        this.modalRef = modalRef;
        this.formBuilder = formBuilder;
    }
    ngOnInit() {
        this.userNameControl = new FormControl(this.model.userName, Validators.required);
        this.passwordControl = new FormControl(this.model.password, Validators.required);
        this.form = this.formBuilder.group({
            userName: this.userNameControl,
            password: this.passwordControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges, (value) => {
            this.model.userName = this.userNameControl.value;
            this.model.password = this.passwordControl.value;
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
}
Login.ɵfac = function Login_Factory(t) { return new (t || Login)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(i1.ModalRef), i0.ɵɵdirectiveInject(i2.FormBuilder)); };
Login.ɵcmp = i0.ɵɵdefineComponent({ type: Login, selectors: [["sq-core-login"]], decls: 18, vars: 19, consts: [["novalidate", "", "cdkTrapFocus", "", 2, "border", "solid", "padding", "16px", "background-color", "white", 3, "formGroup", "cdkTrapFocusAutoCapture"], [2, "margin-top", "0"], ["formControlName", "userName", 3, "placeholder"], [4, "ngIf"], [2, "margin-bottom", "8px"], ["type", "password", "formControlName", "password", 3, "placeholder"], ["type", "submit", 3, "click"], ["type", "button", 3, "click"], [2, "color", "red"]], template: function Login_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "h3", 1);
        i0.ɵɵtext(2);
        i0.ɵɵpipe(3, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(4, "input", 2);
        i0.ɵɵpipe(5, "sqMessage");
        i0.ɵɵtemplate(6, Login_ng_container_6_Template, 5, 3, "ng-container", 3);
        i0.ɵɵelement(7, "div", 4);
        i0.ɵɵelement(8, "input", 5);
        i0.ɵɵpipe(9, "sqMessage");
        i0.ɵɵtemplate(10, Login_ng_container_10_Template, 5, 3, "ng-container", 3);
        i0.ɵɵelement(11, "hr");
        i0.ɵɵelementStart(12, "button", 6);
        i0.ɵɵlistener("click", function Login_Template_button_click_12_listener() { return ctx.ok(); });
        i0.ɵɵtext(13);
        i0.ɵɵpipe(14, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "button", 7);
        i0.ɵɵlistener("click", function Login_Template_button_click_15_listener() { return ctx.cancel(); });
        i0.ɵɵtext(16);
        i0.ɵɵpipe(17, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.form)("cdkTrapFocusAutoCapture", true);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 9, "msg#modal.login.title"));
        i0.ɵɵadvance(2);
        i0.ɵɵpropertyInterpolate("placeholder", i0.ɵɵpipeBind1(5, 11, "msg#modal.login.userName"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.showError(ctx.userNameControl));
        i0.ɵɵadvance(2);
        i0.ɵɵpropertyInterpolate("placeholder", i0.ɵɵpipeBind1(9, 13, "msg#modal.login.password"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.showError(ctx.passwordControl));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(14, 15, "msg#modal.buttons.ok"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 17, "msg#modal.buttons.cancel"));
    } }, directives: [i2.ɵangular_packages_forms_forms_y, i2.NgControlStatusGroup, i3.CdkTrapFocus, i2.FormGroupDirective, i2.DefaultValueAccessor, i2.NgControlStatus, i2.FormControlName, i4.NgIf], pipes: [i5.MessagePipe, i6.ValidationErrorPipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Login, [{
        type: Component,
        args: [{
                selector: "sq-core-login",
                template: `
        <form novalidate [formGroup]="form" style="border: solid;padding: 16px;background-color: white;"
            cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
            <h3 style="margin-top: 0;">{{'msg#modal.login.title' | sqMessage}}</h3>
            <input placeholder="{{'msg#modal.login.userName' | sqMessage}}" formControlName="userName">
            <ng-container *ngIf="showError(userNameControl)">
                <br>
                <span style="color: red;">{{form.get("userName")?.errors | sqValidationError}}</span>
            </ng-container>
            <div style="margin-bottom: 8px;"></div>
            <input type="password" placeholder="{{'msg#modal.login.password' | sqMessage}}" formControlName="password">
            <ng-container *ngIf="showError(passwordControl)">
                <br>
                <span style="color: red;">{{form.get("password")?.errors | sqValidationError}}</span>
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
            }] }, { type: i1.ModalRef }, { type: i2.FormBuilder }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvbG9naW4vIiwic291cmNlcyI6WyJsb2dpbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBcUIsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBeUIsV0FBVyxFQUFFLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRS9FLE9BQU8sRUFBQyxXQUFXLEVBQXdCLE1BQU0scUJBQXFCLENBQUM7QUFFdkUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7Ozs7SUFjN0IsNkJBQ0k7SUFBQSxxQkFDQTtJQUFBLCtCQUEwQjtJQUFBLFlBQW9EOztJQUFBLGlCQUFPO0lBQ3pGLDBCQUFlOzs7O0lBRGUsZUFBb0Q7SUFBcEQsbUhBQW9EOzs7SUFJbEYsNkJBQ0k7SUFBQSxxQkFDQTtJQUFBLCtCQUEwQjtJQUFBLFlBQW9EOztJQUFBLGlCQUFPO0lBQ3pGLDBCQUFlOzs7O0lBRGUsZUFBb0Q7SUFBcEQsbUhBQW9EOztBQXBCOUY7Ozs7R0FJRztBQXdCSCxNQUFNLE9BQU8sS0FBSztJQU1kLFlBQ21DLEtBQWtCLEVBQ3ZDLFFBQWtCLEVBQ2xCLFdBQXdCO1FBRkgsVUFBSyxHQUFMLEtBQUssQ0FBYTtRQUN2QyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQ3RDLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUMvQixRQUFRLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDOUIsUUFBUSxFQUFFLElBQUksQ0FBQyxlQUFlO1NBQ2pDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFDckQsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO1lBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxTQUFTLENBQUMsT0FBb0I7UUFDMUIsT0FBTyxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxFQUFFO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2xCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxhQUFnQixDQUFDO0lBQ3hDLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLGlCQUFvQixDQUFDO0lBQzVDLENBQUM7OzBEQTNDUSxLQUFLLHVCQU9GLFdBQVc7MENBUGQsS0FBSztRQXBCViwrQkFFSTtRQUFBLDZCQUEyQjtRQUFBLFlBQXVDOztRQUFBLGlCQUFLO1FBQ3ZFLDJCQUNBOztRQUFBLHdFQUdlO1FBQ2YseUJBQXVDO1FBQ3ZDLDJCQUNBOztRQUFBLDBFQUdlO1FBQ2Ysc0JBQ0E7UUFBQSxrQ0FBcUM7UUFBZixtRkFBUyxRQUFJLElBQUM7UUFBQyxhQUFzQzs7UUFBQSxpQkFBUztRQUNwRixrQ0FBeUM7UUFBbkIsbUZBQVMsWUFBUSxJQUFDO1FBQUMsYUFBMEM7O1FBQUEsaUJBQVM7UUFDaEcsaUJBQU87O1FBakJVLG9DQUFrQixpQ0FBQTtRQUVKLGVBQXVDO1FBQXZDLG1FQUF1QztRQUMzRCxlQUF3RDtRQUF4RCwwRkFBd0Q7UUFDaEQsZUFBZ0M7UUFBaEMseURBQWdDO1FBS3hCLGVBQXdEO1FBQXhELDBGQUF3RDtRQUNoRSxlQUFnQztRQUFoQyx5REFBZ0M7UUFLVixlQUFzQztRQUF0QyxvRUFBc0M7UUFDbEMsZUFBMEM7UUFBMUMsd0VBQTBDOztrREFJbEYsS0FBSztjQXZCakIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FtQlQ7YUFDSjs7c0JBUVEsTUFBTTt1QkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBJbmplY3R9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0Zvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JzfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtNT0RBTF9NT0RFTCwgTW9kYWxSZXN1bHQsIE1vZGFsUmVmfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9tb2RhbFwiO1xuaW1wb3J0IHtDcmVkZW50aWFsc30gZnJvbSBcIi4vYXV0aGVudGljYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuXG4vKipcbiAqIEEgYmFzaWMgbG9naW4gY29tcG9uZW50IHRoYXQgcmVxdWVzdCBhIHVzZXIgbmFtZSBhbmQgcGFzc3dvcmQuIEl0IGlzIGRlc2lnbmVkIHRvIHdvcmsgd2l0aFxuICogW0xvZ2luU2VydmljZS5nZXRDcmVkZW50aWFsc117QGxpbmsgTG9naW5TZXJ2aWNlI2dldENyZWRlbnRpYWxzfSBhbmQgY2FuIGJlIHNldCB1c2luZyB0aGVcbiAqIHtAbGluayBNT0RBTF9MT0dJTn0gaW5qZWN0aW9uIHRva2VuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLWNvcmUtbG9naW5cIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8Zm9ybSBub3ZhbGlkYXRlIFtmb3JtR3JvdXBdPVwiZm9ybVwiIHN0eWxlPVwiYm9yZGVyOiBzb2xpZDtwYWRkaW5nOiAxNnB4O2JhY2tncm91bmQtY29sb3I6IHdoaXRlO1wiXG4gICAgICAgICAgICBjZGtUcmFwRm9jdXMgW2Nka1RyYXBGb2N1c0F1dG9DYXB0dXJlXT1cInRydWVcIj5cbiAgICAgICAgICAgIDxoMyBzdHlsZT1cIm1hcmdpbi10b3A6IDA7XCI+e3snbXNnI21vZGFsLmxvZ2luLnRpdGxlJyB8IHNxTWVzc2FnZX19PC9oMz5cbiAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cInt7J21zZyNtb2RhbC5sb2dpbi51c2VyTmFtZScgfCBzcU1lc3NhZ2V9fVwiIGZvcm1Db250cm9sTmFtZT1cInVzZXJOYW1lXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2hvd0Vycm9yKHVzZXJOYW1lQ29udHJvbClcIj5cbiAgICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJjb2xvcjogcmVkO1wiPnt7Zm9ybS5nZXQoXCJ1c2VyTmFtZVwiKT8uZXJyb3JzIHwgc3FWYWxpZGF0aW9uRXJyb3J9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDhweDtcIj48L2Rpdj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cInt7J21zZyNtb2RhbC5sb2dpbi5wYXNzd29yZCcgfCBzcU1lc3NhZ2V9fVwiIGZvcm1Db250cm9sTmFtZT1cInBhc3N3b3JkXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2hvd0Vycm9yKHBhc3N3b3JkQ29udHJvbClcIj5cbiAgICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJjb2xvcjogcmVkO1wiPnt7Zm9ybS5nZXQoXCJwYXNzd29yZFwiKT8uZXJyb3JzIHwgc3FWYWxpZGF0aW9uRXJyb3J9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPGhyPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgKGNsaWNrKT1cIm9rKClcIj57eydtc2cjbW9kYWwuYnV0dG9ucy5vaycgfCBzcU1lc3NhZ2V9fTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNhbmNlbCgpXCI+e3snbXNnI21vZGFsLmJ1dHRvbnMuY2FuY2VsJyB8IHNxTWVzc2FnZX19PC9idXR0b24+XG4gICAgICAgIDwvZm9ybT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIHVzZXJOYW1lQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgcGFzc3dvcmRDb250cm9sOiBGb3JtQ29udHJvbDtcbiAgICBmb3JtOiBGb3JtR3JvdXA7XG4gICAgZm9ybUNoYW5nZXM6IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KE1PREFMX01PREVMKSBwcm90ZWN0ZWQgbW9kZWw6IENyZWRlbnRpYWxzLFxuICAgICAgICBwcm90ZWN0ZWQgbW9kYWxSZWY6IE1vZGFsUmVmLFxuICAgICAgICBwcm90ZWN0ZWQgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudXNlck5hbWVDb250cm9sID0gbmV3IEZvcm1Db250cm9sKHRoaXMubW9kZWwudXNlck5hbWUsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgICB0aGlzLnBhc3N3b3JkQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCh0aGlzLm1vZGVsLnBhc3N3b3JkLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICB1c2VyTmFtZTogdGhpcy51c2VyTmFtZUNvbnRyb2wsXG4gICAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZENvbnRyb2xcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZm9ybUNoYW5nZXMgPSBVdGlscy5zdWJzY3JpYmUodGhpcy5mb3JtLnZhbHVlQ2hhbmdlcyxcbiAgICAgICAgICAgICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudXNlck5hbWUgPSB0aGlzLnVzZXJOYW1lQ29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnBhc3N3b3JkID0gdGhpcy5wYXNzd29yZENvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5mb3JtQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHNob3dFcnJvcihjb250cm9sOiBGb3JtQ29udHJvbCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gY29udHJvbC5pbnZhbGlkICYmIChjb250cm9sLmRpcnR5IHx8IHRoaXMubW9kYWxSZWYuc3VibWl0dGVkKTtcbiAgICB9XG5cbiAgICBvaygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmZvcm0udmFsaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGFsUmVmLmNsb3NlKE1vZGFsUmVzdWx0Lk9LKTtcbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMubW9kYWxSZWYuY2xvc2UoTW9kYWxSZXN1bHQuQ2FuY2VsKTtcbiAgICB9XG59XG4iXX0=