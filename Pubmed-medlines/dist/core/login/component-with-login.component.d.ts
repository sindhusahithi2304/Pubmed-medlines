import { OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Subscription } from "rxjs";
import { LoginService } from "./login.service";
import * as i0 from "@angular/core";
/**
 * A utility base class to assist main components in the handling of the login state of the
 * the application. It initiates the login process and sets `loginComplete` accordingly
 * whenever the login state changes
 */
export declare class ComponentWithLogin implements OnInit, OnDestroy, AfterViewInit {
    protected loginService: LoginService;
    protected changeDetectorRef: ChangeDetectorRef;
    protected loginSubscription: Subscription;
    /**
     * `true` if the application is currently logged in successfully
     */
    loginComplete: boolean;
    constructor(loginService: LoginService, changeDetectorRef: ChangeDetectorRef);
    /**
     * A method called whenever the `session-changed` event is received. This can be
     * overridden by the subclassing component.
     */
    onLoginComplete(): void;
    /**
     * Subscribes to the [LoginService.events]{@link LoginService#events} and sets
     * the `loginComplete` member whenever the `session-changed` event is received
     */
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Initiates the login process by calling [LoginService.login]{@link LoginService#login}
     */
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDef<ComponentWithLogin, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<ComponentWithLogin, "ng-component", never, {}, {}, never, never>;
}
//# sourceMappingURL=component-with-login.component.d.ts.map