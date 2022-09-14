import { OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { StartConfig } from "@sinequa/core/web-services";
import { ModalService, ModalRef, ModalButton } from "@sinequa/core/modal";
import { AuthenticationService, Credentials } from "@sinequa/core/login";
import * as i0 from "@angular/core";
export declare class BsLogin implements OnInit, OnDestroy {
    protected model: Credentials;
    protected modalService: ModalService;
    protected modalRef: ModalRef;
    protected formBuilder: FormBuilder;
    protected startConfig: StartConfig;
    protected authenticationService: AuthenticationService;
    true: any;
    userNameControl: FormControl;
    passwordControl: FormControl;
    providerNameControl: FormControl;
    form: FormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];
    providers: any[];
    providerName: string;
    constructor(model: Credentials, modalService: ModalService, modalRef: ModalRef, formBuilder: FormBuilder, startConfig: StartConfig, authenticationService: AuthenticationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    yes(): void;
    authenticate(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsLogin, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsLogin, "sq-login", never, {}, {}, never, never>;
}
//# sourceMappingURL=login.component.d.ts.map