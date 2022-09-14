import { Injectable, Inject, InjectionToken, Optional } from "@angular/core";
import { BehaviorSubject, forkJoin, of, throwError } from "rxjs";
import { flatMap } from "rxjs/operators";
import { Utils, SqError, SqErrorCode } from "@sinequa/core/base";
import { START_CONFIG } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@sinequa/core/app-utils";
import * as i3 from "@sinequa/core/web-services";
import * as i4 from "@sinequa/core/modal";
import * as i5 from "@sinequa/core/notification";
import * as i6 from "./authentication.service";
/**
 * An `InjectionToken` to set the component to use for the login modal dialog which is displayed
 * by the {@link LoginService} when performing a manual login. This makes the service independent
 * of any particular UI framework. If manual login is to be used a component must be configured by
 * providing this token.
 */
export const MODAL_LOGIN = new InjectionToken('MODAL_LOGIN');
/**
 * A high-level service to manage user login
 */
export class LoginService {
    constructor(startConfig, loginModal, router, appService, principalService, userSettingsService, modalService, notificationsService, authenticationService) {
        this.startConfig = startConfig;
        this.loginModal = loginModal;
        this.router = router;
        this.appService = appService;
        this.principalService = principalService;
        this.userSettingsService = userSettingsService;
        this.modalService = modalService;
        this.notificationsService = notificationsService;
        this.authenticationService = authenticationService;
        this._events = new BehaviorSubject({ type: "session-changed" });
        this.beforeUnloadEventListener = (e) => {
            this._events.next({ type: "session-end" });
        };
        // NB unload doesn't fire reliably so we listen for beforeunload
        window.addEventListener("beforeunload", this.beforeUnloadEventListener);
    }
    ngOnDestroy() {
        this._events.complete();
        window.removeEventListener("beforeunload", this.beforeUnloadEventListener);
    }
    /**
     * Get an `Observable` stream of {@link SessionEvent} events emitted by the service
     */
    get events() {
        return this._events;
    }
    /**
     * Get the currently logged in {@link Principal}, if any. Note that a principal can exist
     * without the login being complete. For example, in the situation where access is denied to
     * the selected app.
     */
    get principal() {
        return this.principalService.principal;
    }
    setComplete() {
        const complete = this.complete;
        this.complete = !!this.appService.app && !!this.principalService.principal && !!this.userSettingsService.userSettings;
        if (this.complete) {
            if (!this.authenticationService.userOverrideFailed) {
                this.notificationsService.hideNotifications();
            }
            this.authenticationService.userOverrideFailed = false;
        }
        if (!!complete !== !!this.complete) {
            this._events.next({ type: "session-changed" });
        }
    }
    /**
     * Perform a logout of the currently logged in user. [AppService.app]{@link AppService#app},
     * [PrincipalWebService.principal]{@link PrincipalWebService#prinicpal} and
     * [UserSettingsWebService.userSettings]{@link UserSettingsWebService#userSettings} are reset.
     * The `session-end` event is emitted
     */
    logout() {
        this._events.next({ type: "session-end" });
        this.appService.clear();
        this.principalService.principal = undefined;
        this.userSettingsService.userSettings = undefined;
        this.authenticationService.deactivateUserOverride();
        this.authenticationService.logout();
        this.setComplete();
    }
    /**
     * Override the current user to the user specified in `userOverride`. Only an administrator
     * is permitted to do this. They can revert to the normal login by calling this method with
     * `undefined`
     *
     * @param userOverride The user override
     */
    overrideUser(userOverride) {
        this.authenticationService.userOverride = userOverride;
        this.appService.clear();
        this.principalService.principal = undefined;
        this.userSettingsService.userSettings = undefined;
        this.setComplete();
        Utils.delay().then(() => this.login());
    }
    switchPrincipal(principal) {
        if (!principal.isAdministrator) {
            this.authenticationService.deactivateUserOverride();
        }
        this.principalService.principal = principal;
        this.userSettingsService.userSettings = undefined;
        Utils.delay().then(() => this.login());
    }
    /**
     * Initiate the user login process. The method attempts to retrieve
     * the [application configuration]{@link CCApp}, the
     * [logged in user]{@link Principal} and the [user settings]{@link UserSettings}.
     * If a user is not currently authenticated then authentication is performed using
     * the {@link AuthenticationService} - OAuth/SAML if configured on the Sinequa Server
     * or manual using a login modal dialog provided using the {@link MODAL_LOGIN} injection
     * token.
     */
    login() {
        const appName = this.appService.appName;
        if (!appName) {
            return throwError({ error: "App not specified" });
        }
        let appNeeded;
        if (this.router) {
            const hash = window.location.hash.replace("#", "");
            const href = hash.split("?")[0];
            const params = new URLSearchParams(hash.split("?")[1]);
            const queryParams = {};
            params.forEach((v, k) => queryParams[k] = v);
            // Pick up any user override from the query string
            const overrideUser = queryParams["overrideUser"];
            const overrideDomain = queryParams["overrideDomain"];
            if (overrideUser) {
                this.authenticationService.userOverride = {
                    userName: overrideUser,
                    domain: overrideDomain
                };
                delete queryParams["overrideUser"];
                delete queryParams["overrideDomain"];
                const url = Utils.makeURL(href);
                this.router.navigate([url.pathname], { queryParams });
            }
        }
        const makeObservables = () => {
            const observables = {
                app: undefined,
                principal: undefined,
                userSettings: undefined
            };
            if (!this.appService.app || (appName && this.appService.app.name !== appName)) {
                appNeeded = true;
                observables.app = this.appService.init();
            }
            else {
                observables.app = of(this.appService.app);
            }
            let loadUserSettings = false;
            if (!this.principalService.principal) {
                loadUserSettings = true;
                observables.principal = this.principalService.load();
            }
            else {
                observables.principal = of(this.principalService.principal);
            }
            if (!this.userSettingsService.userSettings || loadUserSettings) {
                observables.userSettings = this.userSettingsService.load();
            }
            else {
                observables.userSettings = of(this.userSettingsService.userSettings);
            }
            return observables;
        };
        const observable = this.authenticationService.autoAuthenticate()
            .pipe(flatMap((success) => {
            const observables = makeObservables();
            return forkJoin(observables);
        }));
        Utils.subscribe(observable, (result) => {
            console.log("loginService.login ok: ", result);
            this.setComplete();
            if (appNeeded) {
                this._events.next({ type: "session-start" });
            }
        }, (error) => {
            console.log("loginService.login failed: ", error);
            // proceed to logout to clean process
            this.logout();
            return throwError(error);
        });
        return observable;
    }
    getAutomaticProvider() {
        if (this.startConfig.providers) {
            return Object.keys(this.startConfig.providers).find((value) => {
                const provider = this.startConfig.providers && this.startConfig.providers[value];
                return !!provider && provider.automatic;
            });
        }
        return undefined;
    }
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
    getCredentials(response, acceptCurrent) {
        if (acceptCurrent && this.authenticationService.processedCredentials) {
            return Promise.resolve(); // initiate retry
        }
        if (!this.startConfig.usePopupForLogin && this.authenticationService.autoLoginActive) {
            return this.authenticationService.autoAuthenticate().toPromise()
                .then(result => {
                if (result /*auto-authentication initiated*/) {
                    return Promise.reject("performing auto login");
                }
                else {
                    return undefined;
                }
            });
        }
        let firstCaller = false;
        const automaticProvider = this.getAutomaticProvider();
        if (automaticProvider) {
            if (!this.automaticLoginPromise) {
                this.automaticLoginPromise = this.authenticationService.authenticateWithProvider(automaticProvider).toPromise();
                firstCaller = true;
            }
            return this.automaticLoginPromise
                .then((result) => {
                // NB response should be the return value from JOAuth/JSaml json methods
                // It can be undefined eg if the popup fails to open
                this.automaticLoginPromise = undefined;
                return result ? Promise.resolve() : Promise.reject("popup failed?");
            })
                .catch((reason) => {
                this.automaticLoginPromise = undefined;
                const error = new SqError(SqErrorCode.autoLoginError);
                if (firstCaller) {
                    this.notificationsService.error(error.message);
                }
                throw error;
            });
        }
        const credentials = {};
        if (this.authenticationService.processedCredentials) {
            credentials.userName = this.authenticationService.processedCredentials.userName;
        }
        if (!this.loginModalPromise) {
            this.loginModalPromise = this.modalService.open(this.loginModal, { model: credentials });
            firstCaller = true;
        }
        return this.loginModalPromise
            .then((result) => {
            this.loginModalPromise = undefined;
            // result === ModalResult.Yes is a special return from Login when using AuthenticationService.authenticateWithProvider
            if (result === -1 /* OK */ || result === -3 /* Yes */) {
                if (!this.processCredentialsPromise) {
                    this.processCredentialsPromise = result === -3 /* Yes */ ?
                        Promise.resolve(undefined) :
                        this.authenticationService.authenticate(credentials, response);
                }
                return this.processCredentialsPromise
                    .then((value) => {
                    this.processCredentialsPromise = undefined;
                    if (result !== -3 /* Yes */) {
                        this.authenticationService.processedCredentials = value;
                    }
                    if (!this.checkPrincipalPromise) {
                        this.checkPrincipalPromise = this.principalService.get(false).toPromise();
                    }
                    return this.checkPrincipalPromise
                        .then((principal) => {
                        this.checkPrincipalPromise = undefined;
                        if (!this.principalService.principal || this.principalService.principal.id === principal.id) {
                            // no current principal OR prinicpal unchanged - initiate retry
                            return Promise.resolve();
                        }
                        const error = new SqError(SqErrorCode.principalSwitched);
                        if (firstCaller) {
                            this.switchPrincipal(principal);
                            this.notificationsService.info(error.message);
                        }
                        throw error;
                    })
                        .catch((reason) => {
                        this.checkPrincipalPromise = undefined;
                        throw reason;
                    });
                })
                    .catch((reason) => {
                    this.processCredentialsPromise = undefined;
                    if (SqError.is(reason, SqErrorCode.principalSwitched)) {
                        throw reason;
                    }
                    throw new SqError(SqErrorCode.processedCredentialsError);
                });
            }
            else {
                this.authenticationService.processedCredentials = undefined; // clean slate
                const error = new SqError(SqErrorCode.loginCancelled);
                if (firstCaller) {
                    this.notificationsService.info(error.message);
                }
                throw error;
            }
        })
            .catch((reason) => {
            if (!SqError.is(reason, SqErrorCode.principalSwitched)) {
                this.authenticationService.processedCredentials = undefined; // clean slate
            }
            this.loginModalPromise = undefined;
            throw reason;
        });
    }
}
LoginService.ɵfac = function LoginService_Factory(t) { return new (t || LoginService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(MODAL_LOGIN), i0.ɵɵinject(i1.Router, 8), i0.ɵɵinject(i2.AppService), i0.ɵɵinject(i3.PrincipalWebService), i0.ɵɵinject(i3.UserSettingsWebService), i0.ɵɵinject(i4.ModalService), i0.ɵɵinject(i5.NotificationsService), i0.ɵɵinject(i6.AuthenticationService)); };
LoginService.ɵprov = i0.ɵɵdefineInjectable({ token: LoginService, factory: LoginService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LoginService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i0.Type, decorators: [{
                type: Inject,
                args: [MODAL_LOGIN]
            }] }, { type: i1.Router, decorators: [{
                type: Optional
            }] }, { type: i2.AppService }, { type: i3.PrincipalWebService }, { type: i3.UserSettingsWebService }, { type: i4.ModalService }, { type: i5.NotificationsService }, { type: i6.AuthenticationService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2xvZ2luLyIsInNvdXJjZXMiOlsibG9naW4uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBbUIsY0FBYyxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUc1RixPQUFPLEVBQUMsZUFBZSxFQUFjLFFBQVEsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzNFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUMvRCxPQUFPLEVBQUMsWUFBWSxFQUNxQixNQUFNLDRCQUE0QixDQUFDOzs7Ozs7OztBQWlCNUU7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxjQUFjLENBQVksYUFBYSxDQUFDLENBQUM7QUFvQnhFOztHQUVHO0FBSUgsTUFBTSxPQUFPLFlBQVk7SUFZckIsWUFDb0MsV0FBd0IsRUFDekIsVUFBcUIsRUFDOUIsTUFBYyxFQUMxQixVQUFzQixFQUN0QixnQkFBcUMsRUFDckMsbUJBQTJDLEVBQzNDLFlBQTBCLEVBQzFCLG9CQUEwQyxFQUMxQyxxQkFBNEM7UUFSdEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDekIsZUFBVSxHQUFWLFVBQVUsQ0FBVztRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQzFCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFxQjtRQUNyQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXdCO1FBQzNDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMs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dUJBQUMsV0FBVzs7c0JBQ2xCLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIEluamVjdCwgT25EZXN0cm95LCBUeXBlLCBJbmplY3Rpb25Ub2tlbiwgT3B0aW9uYWx9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0h0dHBFcnJvclJlc3BvbnNlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgZm9ya0pvaW4sIG9mLCB0aHJvd0Vycm9yfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtmbGF0TWFwfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCB7VXRpbHMsIFNxRXJyb3IsIFNxRXJyb3JDb2RlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge1NUQVJUX0NPTkZJRywgU3RhcnRDb25maWcsIENDQXBwLCBQcmluY2lwYWxXZWJTZXJ2aWNlLCBQcmluY2lwYWwsXG4gICAgVXNlclNldHRpbmdzV2ViU2VydmljZSwgVXNlclNldHRpbmdzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7TW9kYWxTZXJ2aWNlLCBNb2RhbFJlc3VsdH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbW9kYWxcIjtcbmltcG9ydCB7Tm90aWZpY2F0aW9uc1NlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL25vdGlmaWNhdGlvblwiO1xuaW1wb3J0IHtBcHBTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9hcHAtdXRpbHNcIjtcbmltcG9ydCB7QXV0aGVudGljYXRpb25TZXJ2aWNlLCBQcm9jZXNzZWRDcmVkZW50aWFscywgQ3JlZGVudGlhbHMsIFVzZXJPdmVycmlkZX0gZnJvbSBcIi4vYXV0aGVudGljYXRpb24uc2VydmljZVwiO1xuXG4vKipcbiAqIERlc2NyaWJlcyB0aGUgZGlmZmVyZW50IHNlc3Npb24gZXZlbnRzIHRoYXQgYXJlIGVtaXR0ZWQgYnkgdGhlIHtAbGluayBMb2dpblNlcnZpY2V9XG4gKiAqIGBzZXNzaW9uLXN0YXJ0YDogZW1pdHRlZCBhZnRlciBzdWNjZXNzZnVsIGxvZ2luXG4gKiAqIGBzZXNzaW9uLWVuZGA6IGVtaXR0ZWQgYWZ0ZXIgbG9nb3V0IGFuZCBhbHNvIHdoZW4gdGhlIHtAbGluayBMb2dpblNlcnZpY2V9IGlzIGRlc3Ryb3llZFxuICogKiBgc2Vzc2lvbi1jaGFuZ2VkYDogZW1pdHRlZCB3aGVuZXZlciB0aGUgbG9naW4gc3RhdGUgY2hhbmdlcyAtIGxvZ2luLCBsb2dvdXQgYW5kIHVzZXIgb3ZlcnJpZGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZXNzaW9uRXZlbnQge1xuICAgIHR5cGU6IFwic2Vzc2lvbi1zdGFydFwiIHwgXCJzZXNzaW9uLWVuZFwiIHwgXCJzZXNzaW9uLWNoYW5nZWRcIjtcbn1cblxuXG4vKipcbiAqIEFuIGBJbmplY3Rpb25Ub2tlbmAgdG8gc2V0IHRoZSBjb21wb25lbnQgdG8gdXNlIGZvciB0aGUgbG9naW4gbW9kYWwgZGlhbG9nIHdoaWNoIGlzIGRpc3BsYXllZFxuICogYnkgdGhlIHtAbGluayBMb2dpblNlcnZpY2V9IHdoZW4gcGVyZm9ybWluZyBhIG1hbnVhbCBsb2dpbi4gVGhpcyBtYWtlcyB0aGUgc2VydmljZSBpbmRlcGVuZGVudFxuICogb2YgYW55IHBhcnRpY3VsYXIgVUkgZnJhbWV3b3JrLiBJZiBtYW51YWwgbG9naW4gaXMgdG8gYmUgdXNlZCBhIGNvbXBvbmVudCBtdXN0IGJlIGNvbmZpZ3VyZWQgYnlcbiAqIHByb3ZpZGluZyB0aGlzIHRva2VuLlxuICovXG5leHBvcnQgY29uc3QgTU9EQUxfTE9HSU4gPSBuZXcgSW5qZWN0aW9uVG9rZW48VHlwZTxhbnk+PignTU9EQUxfTE9HSU4nKTtcblxuLyoqXG4gKiBEZXNjcmliZXMgdGhlIGRhdGEgcmV0cmlldmVkIGR1cmluZyB0aGUgbG9naW4gcHJvY2Vzcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBMb2dpbkRhdGEge1xuICAgIC8qKlxuICAgICAqIFRoZSBhcHBsaWNhdGlvbiBjb25maWd1cmF0aW9uLlxuICAgICAqL1xuICAgIGFwcDogQ0NBcHA7XG4gICAgLyoqXG4gICAgICogVGhlIHByaW5jaXBhbCBjb3JyZXNwb25kaW5nIHRvIHRoZSBsb2dnZWQgaW4gdXNlci5cbiAgICAgKi9cbiAgICBwcmluY2lwYWw6IFByaW5jaXBhbDtcbiAgICAvKipcbiAgICAgKiBUaGUgdXNlciBzZXR0aW5ncyBmb3IgdGhlIGxvZ2dlZCBpbiB1c2VyLlxuICAgICAqL1xuICAgIHVzZXJTZXR0aW5nczogVXNlclNldHRpbmdzO1xufVxuXG4vKipcbiAqIEEgaGlnaC1sZXZlbCBzZXJ2aWNlIHRvIG1hbmFnZSB1c2VyIGxvZ2luXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBMb2dpblNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIGB0cnVlYCBpZiBhIHVzZXIgaXMgY3VycmVudGx5IGxvZ2dlZCBpblxuICAgICAqL1xuICAgIGNvbXBsZXRlOiBib29sZWFuO1xuICAgIC8vIGdldENyZWRlbnRpYWxzIGhhbmRsaW5nIChjb25jdXJyZW50IGNhbGxzKVxuICAgIHByb3RlY3RlZCBsb2dpbk1vZGFsUHJvbWlzZTogUHJvbWlzZTxNb2RhbFJlc3VsdD4gfCB1bmRlZmluZWQ7XG4gICAgcHJvdGVjdGVkIHByb2Nlc3NDcmVkZW50aWFsc1Byb21pc2U6IFByb21pc2U8UHJvY2Vzc2VkQ3JlZGVudGlhbHMgfCB1bmRlZmluZWQ+IHwgdW5kZWZpbmVkO1xuICAgIHByb3RlY3RlZCBjaGVja1ByaW5jaXBhbFByb21pc2U6IFByb21pc2U8UHJpbmNpcGFsPiB8IHVuZGVmaW5lZDtcbiAgICBwcm90ZWN0ZWQgYXV0b21hdGljTG9naW5Qcm9taXNlOiBQcm9taXNlPGFueT4gfCB1bmRlZmluZWQ7XG4gICAgcHJvdGVjdGVkIF9ldmVudHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNlc3Npb25FdmVudD4oe3R5cGU6IFwic2Vzc2lvbi1jaGFuZ2VkXCJ9KTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KFNUQVJUX0NPTkZJRykgcHJvdGVjdGVkIHN0YXJ0Q29uZmlnOiBTdGFydENvbmZpZyxcbiAgICAgICAgQEluamVjdChNT0RBTF9MT0dJTikgcHJvdGVjdGVkIGxvZ2luTW9kYWw6IFR5cGU8YW55PixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyLFxuICAgICAgICBwcm90ZWN0ZWQgYXBwU2VydmljZTogQXBwU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIHByaW5jaXBhbFNlcnZpY2U6IFByaW5jaXBhbFdlYlNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCB1c2VyU2V0dGluZ3NTZXJ2aWNlOiBVc2VyU2V0dGluZ3NXZWJTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBub3RpZmljYXRpb25zU2VydmljZTogTm90aWZpY2F0aW9uc1NlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBhdXRoZW50aWNhdGlvblNlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSkge1xuICAgICAgICAvLyBOQiB1bmxvYWQgZG9lc24ndCBmaXJlIHJlbGlhYmx5IHNvIHdlIGxpc3RlbiBmb3IgYmVmb3JldW5sb2FkXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIHRoaXMuYmVmb3JlVW5sb2FkRXZlbnRMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJlZm9yZVVubG9hZEV2ZW50TGlzdGVuZXIgPSAoZTogRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoe3R5cGU6IFwic2Vzc2lvbi1lbmRcIn0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9ldmVudHMuY29tcGxldGUoKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgdGhpcy5iZWZvcmVVbmxvYWRFdmVudExpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gYE9ic2VydmFibGVgIHN0cmVhbSBvZiB7QGxpbmsgU2Vzc2lvbkV2ZW50fSBldmVudHMgZW1pdHRlZCBieSB0aGUgc2VydmljZVxuICAgICAqL1xuICAgIGdldCBldmVudHMoKTogT2JzZXJ2YWJsZTxTZXNzaW9uRXZlbnQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnRseSBsb2dnZWQgaW4ge0BsaW5rIFByaW5jaXBhbH0sIGlmIGFueS4gTm90ZSB0aGF0IGEgcHJpbmNpcGFsIGNhbiBleGlzdFxuICAgICAqIHdpdGhvdXQgdGhlIGxvZ2luIGJlaW5nIGNvbXBsZXRlLiBGb3IgZXhhbXBsZSwgaW4gdGhlIHNpdHVhdGlvbiB3aGVyZSBhY2Nlc3MgaXMgZGVuaWVkIHRvXG4gICAgICogdGhlIHNlbGVjdGVkIGFwcC5cbiAgICAgKi9cbiAgICBnZXQgcHJpbmNpcGFsKCk6IFByaW5jaXBhbCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLnByaW5jaXBhbFNlcnZpY2UucHJpbmNpcGFsO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q29tcGxldGUoKSB7XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlID0gdGhpcy5jb21wbGV0ZTtcbiAgICAgICAgdGhpcy5jb21wbGV0ZSA9ICEhdGhpcy5hcHBTZXJ2aWNlLmFwcCAmJiAhIXRoaXMucHJpbmNpcGFsU2VydmljZS5wcmluY2lwYWwgJiYgISF0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UudXNlclNldHRpbmdzO1xuICAgICAgICBpZiAodGhpcy5jb21wbGV0ZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS51c2VyT3ZlcnJpZGVGYWlsZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnNTZXJ2aWNlLmhpZGVOb3RpZmljYXRpb25zKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS51c2VyT3ZlcnJpZGVGYWlsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISFjb21wbGV0ZSAhPT0gISF0aGlzLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZTogXCJzZXNzaW9uLWNoYW5nZWRcIn0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIGxvZ291dCBvZiB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyLiBbQXBwU2VydmljZS5hcHBde0BsaW5rIEFwcFNlcnZpY2UjYXBwfSxcbiAgICAgKiBbUHJpbmNpcGFsV2ViU2VydmljZS5wcmluY2lwYWxde0BsaW5rIFByaW5jaXBhbFdlYlNlcnZpY2UjcHJpbmljcGFsfSBhbmRcbiAgICAgKiBbVXNlclNldHRpbmdzV2ViU2VydmljZS51c2VyU2V0dGluZ3Nde0BsaW5rIFVzZXJTZXR0aW5nc1dlYlNlcnZpY2UjdXNlclNldHRpbmdzfSBhcmUgcmVzZXQuXG4gICAgICogVGhlIGBzZXNzaW9uLWVuZGAgZXZlbnQgaXMgZW1pdHRlZFxuICAgICAqL1xuICAgIGxvZ291dCgpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoe3R5cGU6IFwic2Vzc2lvbi1lbmRcIn0pO1xuICAgICAgICB0aGlzLmFwcFNlcnZpY2UuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5wcmluY2lwYWxTZXJ2aWNlLnByaW5jaXBhbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnVzZXJTZXR0aW5ncyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UuZGVhY3RpdmF0ZVVzZXJPdmVycmlkZSgpO1xuICAgICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5sb2dvdXQoKTtcbiAgICAgICAgdGhpcy5zZXRDb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoZSBjdXJyZW50IHVzZXIgdG8gdGhlIHVzZXIgc3BlY2lmaWVkIGluIGB1c2VyT3ZlcnJpZGVgLiBPbmx5IGFuIGFkbWluaXN0cmF0b3JcbiAgICAgKiBpcyBwZXJtaXR0ZWQgdG8gZG8gdGhpcy4gVGhleSBjYW4gcmV2ZXJ0IHRvIHRoZSBub3JtYWwgbG9naW4gYnkgY2FsbGluZyB0aGlzIG1ldGhvZCB3aXRoXG4gICAgICogYHVuZGVmaW5lZGBcbiAgICAgKlxuICAgICAqIEBwYXJhbSB1c2VyT3ZlcnJpZGUgVGhlIHVzZXIgb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBvdmVycmlkZVVzZXIodXNlck92ZXJyaWRlOiBVc2VyT3ZlcnJpZGUgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UudXNlck92ZXJyaWRlID0gdXNlck92ZXJyaWRlO1xuICAgICAgICB0aGlzLmFwcFNlcnZpY2UuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5wcmluY2lwYWxTZXJ2aWNlLnByaW5jaXBhbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnVzZXJTZXR0aW5ncyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zZXRDb21wbGV0ZSgpO1xuICAgICAgICBVdGlscy5kZWxheSgpLnRoZW4oKCkgPT4gdGhpcy5sb2dpbigpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN3aXRjaFByaW5jaXBhbChwcmluY2lwYWw6IFByaW5jaXBhbCkge1xuICAgICAgICBpZiAoIXByaW5jaXBhbC5pc0FkbWluaXN0cmF0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmRlYWN0aXZhdGVVc2VyT3ZlcnJpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByaW5jaXBhbFNlcnZpY2UucHJpbmNpcGFsID0gcHJpbmNpcGFsO1xuICAgICAgICB0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UudXNlclNldHRpbmdzID0gdW5kZWZpbmVkO1xuICAgICAgICBVdGlscy5kZWxheSgpLnRoZW4oKCkgPT4gdGhpcy5sb2dpbigpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWF0ZSB0aGUgdXNlciBsb2dpbiBwcm9jZXNzLiBUaGUgbWV0aG9kIGF0dGVtcHRzIHRvIHJldHJpZXZlXG4gICAgICogdGhlIFthcHBsaWNhdGlvbiBjb25maWd1cmF0aW9uXXtAbGluayBDQ0FwcH0sIHRoZVxuICAgICAqIFtsb2dnZWQgaW4gdXNlcl17QGxpbmsgUHJpbmNpcGFsfSBhbmQgdGhlIFt1c2VyIHNldHRpbmdzXXtAbGluayBVc2VyU2V0dGluZ3N9LlxuICAgICAqIElmIGEgdXNlciBpcyBub3QgY3VycmVudGx5IGF1dGhlbnRpY2F0ZWQgdGhlbiBhdXRoZW50aWNhdGlvbiBpcyBwZXJmb3JtZWQgdXNpbmdcbiAgICAgKiB0aGUge0BsaW5rIEF1dGhlbnRpY2F0aW9uU2VydmljZX0gLSBPQXV0aC9TQU1MIGlmIGNvbmZpZ3VyZWQgb24gdGhlIFNpbmVxdWEgU2VydmVyXG4gICAgICogb3IgbWFudWFsIHVzaW5nIGEgbG9naW4gbW9kYWwgZGlhbG9nIHByb3ZpZGVkIHVzaW5nIHRoZSB7QGxpbmsgTU9EQUxfTE9HSU59IGluamVjdGlvblxuICAgICAqIHRva2VuLlxuICAgICAqL1xuICAgIGxvZ2luKCk6IE9ic2VydmFibGU8TG9naW5EYXRhPiB7XG4gICAgICAgIGNvbnN0IGFwcE5hbWUgPSB0aGlzLmFwcFNlcnZpY2UuYXBwTmFtZTtcbiAgICAgICAgaWYgKCFhcHBOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcih7ZXJyb3I6IFwiQXBwIG5vdCBzcGVjaWZpZWRcIn0pO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhcHBOZWVkZWQ6IGJvb2xlYW47XG4gICAgICAgIGlmICh0aGlzLnJvdXRlcikge1xuICAgICAgICAgICAgY29uc3QgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoXCIjXCIsIFwiXCIpO1xuICAgICAgICAgICAgY29uc3QgaHJlZiA9IGhhc2guc3BsaXQoXCI/XCIpWzBdO1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhoYXNoLnNwbGl0KFwiP1wiKVsxXSk7XG4gICAgICAgICAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHt9XG4gICAgICAgICAgICBwYXJhbXMuZm9yRWFjaCgodiwgaykgPT4gcXVlcnlQYXJhbXNba10gPSB2KTtcblxuICAgICAgICAgICAgLy8gUGljayB1cCBhbnkgdXNlciBvdmVycmlkZSBmcm9tIHRoZSBxdWVyeSBzdHJpbmdcbiAgICAgICAgICAgIGNvbnN0IG92ZXJyaWRlVXNlciA9IHF1ZXJ5UGFyYW1zW1wib3ZlcnJpZGVVc2VyXCJdO1xuICAgICAgICAgICAgY29uc3Qgb3ZlcnJpZGVEb21haW4gPSBxdWVyeVBhcmFtc1tcIm92ZXJyaWRlRG9tYWluXCJdO1xuICAgICAgICAgICAgaWYgKG92ZXJyaWRlVXNlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLnVzZXJPdmVycmlkZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlck5hbWU6IG92ZXJyaWRlVXNlcixcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBvdmVycmlkZURvbWFpblxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZGVsZXRlIHF1ZXJ5UGFyYW1zW1wib3ZlcnJpZGVVc2VyXCJdO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBxdWVyeVBhcmFtc1tcIm92ZXJyaWRlRG9tYWluXCJdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IFV0aWxzLm1ha2VVUkwoaHJlZik7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3VybC5wYXRobmFtZV0sIHtxdWVyeVBhcmFtc30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaW50ZXJmYWNlIE9ic2VydmFibGVMb2dpbkRhdGEge1xuICAgICAgICAgICAgYXBwOiBPYnNlcnZhYmxlPENDQXBwPiB8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHByaW5jaXBhbDogT2JzZXJ2YWJsZTxQcmluY2lwYWw+IHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgdXNlclNldHRpbmdzOiBPYnNlcnZhYmxlPFVzZXJTZXR0aW5ncz4gfCB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtYWtlT2JzZXJ2YWJsZXMgPSAoKTogT2JzZXJ2YWJsZUxvZ2luRGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvYnNlcnZhYmxlczogT2JzZXJ2YWJsZUxvZ2luRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBhcHA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBwcmluY2lwYWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB1c2VyU2V0dGluZ3M6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICghdGhpcy5hcHBTZXJ2aWNlLmFwcCB8fCAoYXBwTmFtZSAmJiB0aGlzLmFwcFNlcnZpY2UuYXBwLm5hbWUgIT09IGFwcE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgYXBwTmVlZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlcy5hcHAgPSB0aGlzLmFwcFNlcnZpY2UuaW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZXMuYXBwID0gb2YodGhpcy5hcHBTZXJ2aWNlLmFwcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbG9hZFVzZXJTZXR0aW5ncyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnByaW5jaXBhbFNlcnZpY2UucHJpbmNpcGFsKSB7XG4gICAgICAgICAgICAgICAgbG9hZFVzZXJTZXR0aW5ncyA9IHRydWU7XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZXMucHJpbmNpcGFsID0gdGhpcy5wcmluY2lwYWxTZXJ2aWNlLmxvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ic2VydmFibGVzLnByaW5jaXBhbCA9IG9mKHRoaXMucHJpbmNpcGFsU2VydmljZS5wcmluY2lwYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UudXNlclNldHRpbmdzIHx8IGxvYWRVc2VyU2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlcy51c2VyU2V0dGluZ3MgPSB0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UubG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZXMudXNlclNldHRpbmdzID0gb2YodGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnVzZXJTZXR0aW5ncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmF1dG9BdXRoZW50aWNhdGUoKVxuICAgICAgICAgICAgLnBpcGUoZmxhdE1hcCgoc3VjY2VzcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9ic2VydmFibGVzID0gbWFrZU9ic2VydmFibGVzKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcmtKb2luPE9ic2VydmFibGVMb2dpbkRhdGEsIGtleW9mIE9ic2VydmFibGVMb2dpbkRhdGE+KG9ic2VydmFibGVzKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgVXRpbHMuc3Vic2NyaWJlKG9ic2VydmFibGUsXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2dpblNlcnZpY2UubG9naW4gb2s6IFwiLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICBpZiAoYXBwTmVlZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KHt0eXBlOiBcInNlc3Npb24tc3RhcnRcIn0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvZ2luU2VydmljZS5sb2dpbiBmYWlsZWQ6IFwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgLy8gcHJvY2VlZCB0byBsb2dvdXQgdG8gY2xlYW4gcHJvY2Vzc1xuICAgICAgICAgICAgICAgIHRoaXMubG9nb3V0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0QXV0b21hdGljUHJvdmlkZXIoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRDb25maWcucHJvdmlkZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5zdGFydENvbmZpZy5wcm92aWRlcnMpLmZpbmQoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSB0aGlzLnN0YXJ0Q29uZmlnLnByb3ZpZGVycyAmJiB0aGlzLnN0YXJ0Q29uZmlnLnByb3ZpZGVyc1t2YWx1ZV07XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhcHJvdmlkZXIgJiYgKHByb3ZpZGVyIGFzIGFueSkuYXV0b21hdGljO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIHtAbGluayBIdHRwSW50ZXJjZXB0b3J9IG9uIHJlY2VwdGlvbiBvZiBhbiBgSFRUUCA0MDFgIHJlc3BvbnNlLlxuICAgICAqIFRoaXMgd2lsbCBlaXRoZXIgaW5pdGlhdGUgYW4gYXV0byBsb2dpbiBwcm9jZXNzIChPQXV0aC9TQU1MKSBpZiBjb25maWd1cmVkIG9uXG4gICAgICogdGhlIFNpbmVxdWEgc2VydmVyIG9yIGRpc3BsYXkgdGhlIGxvZ2luIG1vZGFsIGRpYWxvZyB0byByZXF1ZXN0IHVzZXIgY3JlZGVudGlhbHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNwb25zZSBBbiBgSFRUUCA0MDFgIHJlc3BvbnNlXG4gICAgICogQHBhcmFtIGFjY2VwdEN1cnJlbnQgSWYgYHRydWVgIGFuZCB0aGUgYEF1dGhlbnRpY2F0aW9uU2VydmljZWAgY3VycmVudGx5IGhhc1xuICAgICAqIHByb2Nlc3NlZCBjcmVkZW50aWFscyB0aGVuIHVzZSB0aGVtIGluc3RlYWQgb2Ygc3RhcnRpbmcgYSBuZXcgbG9naW5cbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIGNyZWRlbnRpYWxzIGhhdmUgYmVlbiBvYnRhaW5lZC4gTm90ZSB0aGF0XG4gICAgICogd2hlbiBhdXRvLWF1dGhlbnRpY2F0aW9uIGlzIGNvbmZpZ3VyZWQgdGhlIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZCBhbmQgdGhlIGJyb3dzZXJcbiAgICAgKiByZWRpcmVjdGVkIHRvIHRoZSBPQXV0aC9TQU1MIHJlZGlyZWN0IHVybFxuICAgICAqL1xuICAgIGdldENyZWRlbnRpYWxzKHJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSwgYWNjZXB0Q3VycmVudDogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAoYWNjZXB0Q3VycmVudCAmJiB0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5wcm9jZXNzZWRDcmVkZW50aWFscykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpOyAvLyBpbml0aWF0ZSByZXRyeVxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5zdGFydENvbmZpZy51c2VQb3B1cEZvckxvZ2luICYmIHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmF1dG9Mb2dpbkFjdGl2ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmF1dG9BdXRoZW50aWNhdGUoKS50b1Byb21pc2UoKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQvKmF1dG8tYXV0aGVudGljYXRpb24gaW5pdGlhdGVkKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcInBlcmZvcm1pbmcgYXV0byBsb2dpblwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZmlyc3RDYWxsZXIgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgYXV0b21hdGljUHJvdmlkZXIgPSB0aGlzLmdldEF1dG9tYXRpY1Byb3ZpZGVyKCk7XG4gICAgICAgIGlmIChhdXRvbWF0aWNQcm92aWRlcikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmF1dG9tYXRpY0xvZ2luUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0b21hdGljTG9naW5Qcm9taXNlID0gdGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UuYXV0aGVudGljYXRlV2l0aFByb3ZpZGVyKGF1dG9tYXRpY1Byb3ZpZGVyKS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgICAgICBmaXJzdENhbGxlciA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdXRvbWF0aWNMb2dpblByb21pc2VcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5CIHJlc3BvbnNlIHNob3VsZCBiZSB0aGUgcmV0dXJuIHZhbHVlIGZyb20gSk9BdXRoL0pTYW1sIGpzb24gbWV0aG9kc1xuICAgICAgICAgICAgICAgICAgICAvLyBJdCBjYW4gYmUgdW5kZWZpbmVkIGVnIGlmIHRoZSBwb3B1cCBmYWlscyB0byBvcGVuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b21hdGljTG9naW5Qcm9taXNlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ID8gUHJvbWlzZS5yZXNvbHZlKCkgOiBQcm9taXNlLnJlamVjdChcInBvcHVwIGZhaWxlZD9cIik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9tYXRpY0xvZ2luUHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgU3FFcnJvcihTcUVycm9yQ29kZS5hdXRvTG9naW5FcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdENhbGxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zU2VydmljZS5lcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSB7fTtcbiAgICAgICAgaWYgKHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLnByb2Nlc3NlZENyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICBjcmVkZW50aWFscy51c2VyTmFtZSA9IHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLnByb2Nlc3NlZENyZWRlbnRpYWxzLnVzZXJOYW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5sb2dpbk1vZGFsUHJvbWlzZSkge1xuICAgICAgICAgICAgdGhpcy5sb2dpbk1vZGFsUHJvbWlzZSA9IHRoaXMubW9kYWxTZXJ2aWNlLm9wZW4odGhpcy5sb2dpbk1vZGFsLCB7bW9kZWw6IGNyZWRlbnRpYWxzfSk7XG4gICAgICAgICAgICBmaXJzdENhbGxlciA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9naW5Nb2RhbFByb21pc2VcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2luTW9kYWxQcm9taXNlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIC8vIHJlc3VsdCA9PT0gTW9kYWxSZXN1bHQuWWVzIGlzIGEgc3BlY2lhbCByZXR1cm4gZnJvbSBMb2dpbiB3aGVuIHVzaW5nIEF1dGhlbnRpY2F0aW9uU2VydmljZS5hdXRoZW50aWNhdGVXaXRoUHJvdmlkZXJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBNb2RhbFJlc3VsdC5PSyB8fCByZXN1bHQgPT09IE1vZGFsUmVzdWx0Llllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucHJvY2Vzc0NyZWRlbnRpYWxzUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzQ3JlZGVudGlhbHNQcm9taXNlID0gcmVzdWx0ID09PSBNb2RhbFJlc3VsdC5ZZXMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZTxQcm9jZXNzZWRDcmVkZW50aWFscyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UuYXV0aGVudGljYXRlKGNyZWRlbnRpYWxzLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc0NyZWRlbnRpYWxzUHJvbWlzZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzQ3JlZGVudGlhbHNQcm9taXNlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT09IE1vZGFsUmVzdWx0Llllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5wcm9jZXNzZWRDcmVkZW50aWFscyA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tQcmluY2lwYWxQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tQcmluY2lwYWxQcm9taXNlID0gdGhpcy5wcmluY2lwYWxTZXJ2aWNlLmdldChmYWxzZSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNoZWNrUHJpbmNpcGFsUHJvbWlzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocHJpbmNpcGFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrUHJpbmNpcGFsUHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5wcmluY2lwYWxTZXJ2aWNlLnByaW5jaXBhbCB8fCB0aGlzLnByaW5jaXBhbFNlcnZpY2UucHJpbmNpcGFsLmlkID09PSBwcmluY2lwYWwuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBubyBjdXJyZW50IHByaW5jaXBhbCBPUiBwcmluaWNwYWwgdW5jaGFuZ2VkIC0gaW5pdGlhdGUgcmV0cnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBTcUVycm9yKFNxRXJyb3JDb2RlLnByaW5jaXBhbFN3aXRjaGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdENhbGxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3dpdGNoUHJpbmNpcGFsKHByaW5jaXBhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zU2VydmljZS5pbmZvKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrUHJpbmNpcGFsUHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IHJlYXNvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NDcmVkZW50aWFsc1Byb21pc2UgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFNxRXJyb3IuaXMocmVhc29uLCBTcUVycm9yQ29kZS5wcmluY2lwYWxTd2l0Y2hlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgcmVhc29uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3FFcnJvcihTcUVycm9yQ29kZS5wcm9jZXNzZWRDcmVkZW50aWFsc0Vycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UucHJvY2Vzc2VkQ3JlZGVudGlhbHMgPSB1bmRlZmluZWQ7IC8vIGNsZWFuIHNsYXRlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFNxRXJyb3IoU3FFcnJvckNvZGUubG9naW5DYW5jZWxsZWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3RDYWxsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uc1NlcnZpY2UuaW5mbyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIVNxRXJyb3IuaXMocmVhc29uLCBTcUVycm9yQ29kZS5wcmluY2lwYWxTd2l0Y2hlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UucHJvY2Vzc2VkQ3JlZGVudGlhbHMgPSB1bmRlZmluZWQ7IC8vIGNsZWFuIHNsYXRlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubG9naW5Nb2RhbFByb21pc2UgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdGhyb3cgcmVhc29uO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuIl19