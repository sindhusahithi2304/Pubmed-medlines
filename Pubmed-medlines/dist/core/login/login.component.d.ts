import { OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { ModalRef } from "@sinequa/core/modal";
import { Credentials } from "./authentication.service";
import * as i0 from "@angular/core";
/**
 * A basic login component that request a user name and password. It is designed to work with
 * [LoginService.getCredentials]{@link LoginService#getCredentials} and can be set using the
 * {@link MODAL_LOGIN} injection token
 */
export declare class Login implements OnInit, OnDestroy {
    protected model: Credentials;
    protected modalRef: ModalRef;
    protected formBuilder: FormBuilder;
    userNameControl: FormControl;
    passwordControl: FormControl;
    form: FormGroup;
    formChanges: Subscription;
    constructor(model: Credentials, modalRef: ModalRef, formBuilder: FormBuilder);
    ngOnInit(): void;
    ngOnDestroy(): void;
    showError(control: FormControl): boolean;
    ok(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDef<Login, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<Login, "sq-core-login", never, {}, {}, never, never>;
}
//# sourceMappingURL=login.component.d.ts.map