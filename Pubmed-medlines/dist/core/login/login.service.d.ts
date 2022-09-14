import { OnDestroy, Type, InjectionToken } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { StartConfig, CCApp, PrincipalWebService, Principal, UserSettingsWebService, UserSettings } from "@sinequa/core/web-services";
import { ModalService, ModalResult } from "@sinequa/core/modal";
import { NotificationsService } from "@sinequa/core/notification";
import { AppService } from "@sinequa/core/app-utils";
import { AuthenticationService, ProcessedCredentials, UserOverride } from "./authentication.service";
import * as i0 from "@angular/core";
/**
 * Describes the different session events that are emitted by the {@link LoginService}
 * * `session-start`: emitted after successful login
 * * `session-end`: emitted after logout and also when the {@link LoginService} is destroyed
 * * `session-changed`: emitted whenever the login state changes - login, logout and user override
 */
export interface SessionEvent {
    type: "session-start" | "session-end" | "session-changed";
}
/**
 * An `InjectionToken` to set the component to use for the login modal dialog which is displayed
 * by the {@link LoginService} when performing a manual login. This makes the service independent
 * of any particular UI framework. If manual login is to be used a component must be configured by
 * providing this token.
 */
export declare const MODAL_LOGIN: InjectionToken<Type<any>>;
/**
 * Describes the data retrieved during the login process.
 */
export interface LoginData {
    /**
     * The application configuration.
     */
    app: CCApp;
    /**
     * The principal corresponding to the logged in user.
     */
    principal: Principal;
    /**
     * The user settings for the logged in user.
     */
    userSettings: UserSettings;
}
/**
 * A high-level service to manage user login
 */
export declare class LoginService implements OnDestroy {
    protected startConfig: StartConfig;
    protected loginModal: Type<any>;
    protected router: Router;
    protected appService: AppService;
    protected principalService: PrincipalWebService;
    protected userSettingsService: UserSettingsWebService;
    protected modalService: ModalService;
    protected notificationsService: NotificationsService;
    protected authenticationService: AuthenticationService;
    /**
     * `true` if a user is currently logged in
     */
    complete: boolean;
    protected loginModalPromise: Promise<ModalResult> | undefined;
    protected processCredentialsPromise: Promise<ProcessedCredentials | undefined> | undefined;
    protected checkPrincipalPromise: Promise<Principal> | undefined;
    protected automaticLoginPromise: Promise<any> | undefined;
    protected _events: BehaviorSubject<SessionEvent>;
    constructor(startConfig: StartConfig, loginModal: Type<any>, router: Router, appService: AppService, principalService: PrincipalWebService, userSettingsService: UserSettingsWebService, modalService: ModalService, notificationsService: NotificationsService, authenticationService: AuthenticationService);
    protected beforeUnloadEventListener: (e: Event) => void;
    ngOnDestroy(): void;
    /**
     * Get an `Observable` stream of {@link SessionEvent} events emitted by the service
     */
    get events(): Observable<SessionEvent>;
    /**
     * Get the currently logged in {@link Principal}, if any. Note that a principal can exist
     * without the login being complete. For example, in the situation where access is denied to
     * the selected app.
     */
    get principal(): Principal | undefined;
    private setComplete;
    /**
     * Perform a logout of the currently logged in user. [AppService.app]{@link AppService#app},
     * [PrincipalWebService.principal]{@link PrincipalWebService#prinicpal} and
     * [UserSettingsWebService.userSettings]{@link UserSettingsWebService#userSettings} are reset.
     * The `session-end` event is emitted
     */
    logout(): void;
    /**
     * Override the current user to the user specified in `userOverride`. Only an administrator
     * is permitted to do this. They can revert to the normal login by calling this method with
     * `undefined`
     *
     * @param userOverride The user override
     */
    overrideUser(userOverride: UserOverride | undefined): void;
    private switchPrincipal;
    /**
     * Initiate the user login process. The method attempts to retrieve
     * the [application configuration]{@link CCApp}, the
     * [logged in user]{@link Principal} and the [user settings]{@link UserSettings}.
     * If a user is not currently authenticated then authentication is performed using
     * the {@link AuthenticationService} - OAuth/SAML if configured on the Sinequa Server
     * or manual using a login modal dialog provided using the {@link MODAL_LOGIN} injection
     * token.
     */
    login(): Observable<LoginData>;
    private getAutomaticProvider;
    /**
     * Called by the {@link HttpInterceptor} on reception of an `HTTP 401` response.
     * This will either initiate an auto login process (OAuth/SAML) if configured on
     * the Sinequa server or display the login modal dialog to request user credentials
     *
     * @param response An `HTTP 401` response
     * @param acceptCurrent If `true` and the `AuthenticationService` currently has
     * processed credentials then use them instead of starting a new login
     * @returns A promise that is resolved when credentials have been obtained. Note that
     * when auto-authentication is configured the promise will be rejected and the browser
     * redirected to the OAuth/SAML redirect url
     */
    getCredentials(response: HttpErrorResponse, acceptCurrent: boolean): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDef<LoginService, [null, null, { optional: true; }, null, null, null, null, null, null]>;
    static ɵprov: i0.ɵɵInjectableDef<LoginService>;
}
//# sourceMappingURL=login.service.d.ts.map