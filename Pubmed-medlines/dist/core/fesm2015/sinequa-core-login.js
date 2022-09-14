import { ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, Inject, InjectionToken, Type, Optional, ɵɵdirectiveInject, ChangeDetectorRef, ɵɵdefineComponent, Component, ɵɵelementContainerStart, ɵɵelement, ɵɵelementStart, ɵɵtext, ɵɵpipe, ɵɵelementEnd, ɵɵelementContainerEnd, ɵɵnextContext, ɵɵadvance, ɵɵtextInterpolate, ɵɵpipeBind1, ɵɵtemplate, ɵɵlistener, ɵɵproperty, ɵɵpropertyInterpolate, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { timer, throwError, of, BehaviorSubject, forkJoin, from } from 'rxjs';
import { map, flatMap, share, catchError, switchMap } from 'rxjs/operators';
import { HttpService, START_CONFIG, SqHttpClient, AuditWebService, PrincipalWebService, UserSettingsWebService, WebServicesModule } from '@sinequa/core/web-services';
import { Utils, SqError, SqErrorCode, BaseModule } from '@sinequa/core/base';
import { AuthService, OauthService, SharedService, PopupService, ConfigService, CONFIG_OPTIONS, Ng2UiAuthModule } from 'ng2-ui-auth';
import { Router } from '@angular/router';
import { AppService, AppUtilsModule } from '@sinequa/core/app-utils';
import { ModalService, MODAL_MODEL, ModalRef, ModalModule, enModal, frModal, deModal } from '@sinequa/core/modal';
import { NotificationsService, NotificationModule } from '@sinequa/core/notification';
import { NgIf, CommonModule } from '@angular/common';
import { FormControl, Validators, FormBuilder, ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, DefaultValueAccessor, NgControlStatus, FormControlName, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTrapFocus, A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClient, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ValidationErrorPipe, ValidationModule, enValidation, frValidation, deValidation } from '@sinequa/core/validation';
import { MessagePipe, IntlModule, enIntl, frIntl, deIntl } from '@sinequa/core/intl';

/**
 * A service to manage JWT and CSRF tokens. The methods of this service
 * can be called before the authentication process has completed
 */
class TokenService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Retrieve the CSRF token corresponding to the current JWT cookie
     * which should accompany the request. This method is called by
     * [AuthenticationService.autoAuthenticate]{@link AuthenticationService#autoAuthenticate}
     *
     * @param notify `true` if any errors should be notified using the {@NotificationService}
     */
    getCsrfToken(notify = false) {
        return this.httpClient.get(this.makeUrl("challenge"), {
            params: this.makeParams({
                action: "getCsrfToken",
                suppressErrors: !notify,
                noUserOverride: true,
                noAutoAuthentication: true,
                noNotify: !notify
            })
        }).pipe(map((value) => {
            return value.csrfToken;
        }));
    }
    /**
     * Delete the current JWT cookie.
     * This method is called by [AuthenticationService.logout]{@link AuthenticationService#logout}
     */
    deleteWebTokenCookie() {
        return this.httpClient.get(this.makeUrl("challenge"), {
            params: this.makeParams({
                action: "deleteWebTokenCookie",
                noUserOverride: true,
                noAutoAuthentication: true
            })
        });
    }
}
TokenService.ɵfac = function TokenService_Factory(t) { return new (t || TokenService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient)); };
TokenService.ɵprov = ɵɵdefineInjectable({ token: TokenService, factory: TokenService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(TokenService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }]; }, null); })();

/**
 * A service to retrieve a JWT (JSON Web Token) from the Sinequa server.
 */
class JWTService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Get a JWT from the Sinequa server using the passed credentials. The JWT is received in a cookie
     * and the associated CSRF token in the response payload.
     *
     * @param credentials The credentials to be used for the JWT. These are sent in clear text
     */
    getToken(credentials) {
        const observable = this.httpClient.post(this.makeUrl("webToken"), {
            action: "get",
            user: credentials.userName,
            password: credentials.password,
            tokenInCookie: true,
        }, {
            params: this.makeParams({
                noUserOverride: true,
                noAutoAuthentication: true
            })
        });
        return observable.pipe(map((value) => {
            return value.csrfToken;
        }));
    }
}
JWTService.ɵfac = function JWTService_Factory(t) { return new (t || JWTService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient)); };
JWTService.ɵprov = ɵɵdefineInjectable({ token: JWTService, factory: JWTService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(JWTService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }]; }, null); })();

const LEGACY_PROCESSED_CREDENTIALS_KIND = 0;
/**
 * A service to authenticate a user with a Sinequa server. Authentication can be automatic (OAuth/SAML), if configured in the
 * Sinequa administration, or manual where the user name and password are entered in a modal dialog box and transmitted in
 * clear text. There is also support for the ng2-ui-auth library where the authentication process occurs in a browser popup window.
 * Successful authentication results in a JWT stored in cookie along with a CSRF token which is stored in storage so it can
 * be picked up in other browser tabs.
 *
 * The service also holds information on the status of the "override user" administrator function
 */
class AuthenticationService extends HttpService {
    constructor(startConfig, httpClient, tokenService, auditService, jWTService, authService) {
        super(startConfig);
        this.httpClient = httpClient;
        this.tokenService = tokenService;
        this.auditService = auditService;
        this.jWTService = jWTService;
        this.authService = authService;
        this.init();
    }
    /**
     * Get the currrent user override, if any
     */
    get userOverride() {
        return this._userOverride;
    }
    /**
     * Set/unset the user override. The {@link #userOverrideActive} flag
     * is set accordingly
     */
    set userOverride(value) {
        this._userOverride = value;
        if (this._userOverride) {
            this._userOverrideActive = !!this._userOverride.userName && !!this._userOverride.domain;
        }
        else {
            this._userOverrideActive = false;
        }
    }
    /**
     * A flag indicating whether the current user override is active
     */
    get userOverrideActive() {
        return this._userOverrideActive;
    }
    /**
     * Get the current processed credentials
     */
    get processedCredentials() {
        return this._processedCredentials;
    }
    /**
     * Set the current processed credentials. A stringified version
     * is stored in either local or session storage
     */
    set processedCredentials(value) {
        this._processedCredentials = value;
        if (value) {
            const newProcessedCredentialsStr = Utils.toJson(this._processedCredentials);
            if (this._processedCredentialsStr !== newProcessedCredentialsStr) {
                this._processedCredentialsStr = newProcessedCredentialsStr;
                this.storage.setItem("sinequa-credentials", this._processedCredentialsStr);
            }
        }
        else {
            if (this._processedCredentialsStr) {
                this._processedCredentialsStr = undefined;
                this.storage.removeItem("sinequa-credentials");
            }
        }
    }
    /**
     * Returns `true` if an OAuth or SAML auto provider is configured
     */
    get autoLoginActive() {
        return !!this.startConfig.autoOAuthProvider || !!this.startConfig.autoSAMLProvider;
    }
    /**
     * Deactivate the current user override
     */
    deactivateUserOverride() {
        this._userOverrideActive = false;
    }
    loadCredentials() {
        const sinequaCredentials = this.storage.getItem("sinequa-credentials");
        this._processedCredentialsStr = sinequaCredentials ? sinequaCredentials : undefined;
        this._processedCredentials = this._processedCredentialsStr ? Utils.fromJson(this._processedCredentialsStr) : null;
    }
    saveCredentials(value) {
        this.processedCredentials = value;
    }
    init() {
        if (this.startConfig.authenticationStorage === "local") {
            this.storage = window.localStorage;
        }
        else {
            this.storage = window.sessionStorage;
        }
        this.loadCredentials();
        window.addEventListener('storage', (event) => {
            if (event.storageArea === this.storage) {
                if (!event.key) { // clear
                    this.processedCredentials = undefined;
                }
                else if (event.key === "sinequa-credentials") {
                    if (event.newValue !== this._processedCredentialsStr) {
                        this.loadCredentials();
                    }
                }
            }
        });
    }
    /**
     * Return `true` if `processedCredentials` exists
     */
    get haveCredentials() {
        return !!this.processedCredentials;
    }
    /**
     * Add the current authentication information to the passed `HttpHeaders` and `HttpParams`.
     * Currently, this adds the `sinequa-csrf-token` value to the HTTP headers. Called from
     * {@link HttpInterceptor}
     *
     * @param config HttpHeaders and HttpParams to be updated
     *
     * @returns new configuration
     */
    addAuthentication(config) {
        this.doAuthentication();
        if (this.authentication) {
            if (this.authentication.headers) {
                for (const header in this.authentication.headers) {
                    if (this.authentication.headers.hasOwnProperty(header)) {
                        config.headers = config.headers.set(header, this.authentication.headers[header]);
                    }
                }
            }
            if (this.authentication.params) {
                for (const param in this.authentication.params) {
                    if (this.authentication.params.hasOwnProperty(param)) {
                        config.params = config.params.set(param, this.authentication.params[param]);
                    }
                }
            }
        }
        return config;
    }
    /**
     * Update the current authentication information with information in the passed `response`.
     * This processes the `sinequa-jwt-refresh` header which will contain an updated CSRF token
     * to correspond to the new JWT cookie. Called from {@link HttpInterceptor}
     *
     * @param response An `HttpResponse`
     */
    updateAuthentication(response) {
        const csrfToken = response.headers.get("sinequa-jwt-refresh");
        if (csrfToken) {
            if (this.processedCredentials) {
                if (this.processedCredentials.data.csrfToken !== csrfToken) {
                    this.processedCredentials.data.csrfToken = csrfToken;
                    this.saveCredentials(this.processedCredentials);
                }
            }
            else {
                this.setCsrfToken(csrfToken);
            }
        }
    }
    refreshAuthentication() {
        if (this.processedCredentials) {
            if (!this.authentication) {
                this.authentication = {
                    csrfToken: this.processedCredentials.data.csrfToken
                };
            }
            else {
                this.authentication.csrfToken = this.processedCredentials.data.csrfToken;
            }
        }
        else {
            this.authentication = undefined;
        }
    }
    doAuthentication() {
        this.refreshAuthentication();
        if (this.authentication && this.authentication.csrfToken) {
            this.authentication.headers = {
                "sinequa-csrf-token": this.authentication.csrfToken
            };
        }
    }
    getAuthenticateHeader(regex, authenticationHeaders, header) {
        if (authenticationHeaders) {
            for (let i = 0, ic = authenticationHeaders.length; i < ic; i++) {
                const authenticationHeader = authenticationHeaders[i];
                const matches = regex.exec(authenticationHeader);
                if (matches && matches.length > 0) {
                    const prefix = matches[0];
                    header.value = authenticationHeader.slice(prefix.length);
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Authenticate with the Sinequa server using the passed credentials. The credentials are sent
     * in clear text. Prior to the authentication the passed `response` is checked for a
     * `WWW-Authenticate: Bearer` header.
     *
     * @param credentials The credentials to authenticate with
     * @param response The error response the reception of which initiated the call to this method
     */
    authenticate(credentials, response) {
        const wwwAuthenticate = response.headers.get("WWW-Authenticate");
        if (!wwwAuthenticate) {
            console.error("Missing WWW-Authenticate header");
            return Promise.resolve(undefined);
        }
        const authenticateHeaders = wwwAuthenticate.split(", ");
        const header = { value: "" };
        if (!this.getAuthenticateHeader(/^Bearer ?/, authenticateHeaders, header)) {
            console.error("Unexpected WWW-Authenticate header");
            return Promise.resolve(undefined);
        }
        return this.jWTService.getToken(credentials).toPromise()
            .then((value) => {
            return {
                kind: LEGACY_PROCESSED_CREDENTIALS_KIND,
                userName: credentials.userName,
                data: {
                    csrfToken: value,
                    provider: "Sinequa"
                }
            };
        });
    }
    /**
     * Remove all current authentication data. The JWT cookie
     * is removed
     */
    logout() {
        this.auditService.notifyLogout().subscribe(_ => {
            this.tokenService.deleteWebTokenCookie().subscribe();
            this.authentication = undefined;
            this.processedCredentials = undefined;
        });
    }
    /**
     * Add the current user override information to the passed headers.
     *
     * @param config An object containing the `HttpHeaders` to update
     */
    addUserOverride(config) {
        if (this.userOverride && this.userOverrideActive) {
            config.headers = config.headers.set("sinequa-override-user", this.userOverride.userName);
            config.headers = config.headers.set("sinequa-override-domain", this.userOverride.domain);
        }
        return config.headers;
    }
    /**
     * Initiate authentication using the ng2-ui-auth library. The authentication process will be performed
     * in a browser popup window
     *
     * @param provider The name of the provider to use. This is the name configured in the Sinequa administration
     * console
     */
    authenticateWithProvider(provider) {
        // AuthService.authenticate opens a popup. On some platforms (Firefox) this is asynchronous
        // so we add a delay (timer(0)) so the caller can create a promise from the returned observable
        // without yielding
        const observable = timer(0).pipe(flatMap((value) => {
            const observable1 = this.authService.authenticate(provider, true).pipe(share());
            Utils.subscribe(observable1, (response) => {
                // NB response should be the return value from JOAuth/JSaml json methods
                // It can be undefined eg if the popup fails to open
                if (response) {
                    this.processedCredentials = {
                        kind: LEGACY_PROCESSED_CREDENTIALS_KIND,
                        data: {
                            csrfToken: response.csrfToken,
                            provider
                        }
                    };
                }
            });
            return observable1;
        }));
        return observable;
    }
    setCsrfToken(csrfToken, provider = "Sinequa") {
        if (!csrfToken) {
            return false;
        }
        this.processedCredentials = {
            kind: LEGACY_PROCESSED_CREDENTIALS_KIND,
            data: {
                csrfToken,
                provider
            }
        };
        return true;
    }
    initiateAutoAuthentication() {
        if (!this.startConfig.usePopupForLogin && this.autoLoginActive) {
            let observable;
            if (this.startConfig.autoOAuthProvider) {
                observable = this.httpClient.post(this.makeUrl("security.oauth"), {
                    action: "getcode",
                    provider: this.startConfig.autoOAuthProvider,
                    tokenInCookie: true,
                    originalUrl: window.location.href
                }, {
                    params: this.makeParams({
                        noUserOverride: true,
                        noAutoAuthentication: true
                    })
                });
            }
            else {
                observable = this.httpClient.post(this.makeUrl("security.saml"), {
                    action: "getresponse",
                    provider: this.startConfig.autoSAMLProvider,
                    tokenInCookie: true,
                    originalUrl: window.location.href,
                }, {
                    params: this.makeParams({
                        noUserOverride: true,
                        noAutoAuthentication: true
                    })
                });
            }
            observable.subscribe((response) => {
                window.location.replace(response.redirectUrl);
            });
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Initiate the auto-authentication process if an automatic OAuth or SAML provider is configured.
     * The {@LoginService} calls this method at startup. First, an attempt is made to retrieve a CSRF token.
     * If that works, then the token is set and authentication is complete. Otherwise, the initial OAuth or SAML
     * call is made to the Sinequa server. The `redirectUrl` in the response to this call is then used to redirect
     * the browser to continue the normal OAuth/SAML autentication flow. A successful authentiction will culminate
     * in the SBA being loaded a second time, this method being called again and the attempt to retrieve a CSRF
     * token succeeding because a valid JWT cookie will now be present.
     *
     * A CSRF token is always requested to allow automatic login if a valid web token cookie has previously been
     * written via, for example, a login to the admin console.
     *
     * @returns An Observable of a boolean value which if `true` indicates that auto-authentication has been initiated.
     */
    autoAuthenticate() {
        return this.tokenService.getCsrfToken().pipe(map((csrfToken) => {
            // Token can be empty as getCsrfToken suppresses application errors (no cookie or cookie invalid)
            // (We do this to avoid having errors in the console for normal situations.)
            if (csrfToken) {
                this.setCsrfToken(csrfToken);
                return false;
            }
            else {
                this.initiateAutoAuthentication();
                return true;
            }
        }), catchError((error) => {
            // We should rarely have an error now as getCsrfToken
            // suppresses the application-level ones
            if (this.initiateAutoAuthentication()) {
                return throwError(error);
            }
            // Swallow the error and continue with non-auto login process
            return of(false);
        }));
    }
}
AuthenticationService.ɵfac = function AuthenticationService_Factory(t) { return new (t || AuthenticationService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient), ɵɵinject(TokenService), ɵɵinject(AuditWebService), ɵɵinject(JWTService), ɵɵinject(AuthService)); };
AuthenticationService.ɵprov = ɵɵdefineInjectable({ token: AuthenticationService, factory: AuthenticationService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AuthenticationService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }, { type: TokenService }, { type: AuditWebService }, { type: JWTService }, { type: AuthService }]; }, null); })();

/**
 * An `InjectionToken` to set the component to use for the login modal dialog which is displayed
 * by the {@link LoginService} when performing a manual login. This makes the service independent
 * of any particular UI framework. If manual login is to be used a component must be configured by
 * providing this token.
 */
const MODAL_LOGIN = new InjectionToken('MODAL_LOGIN');
/**
 * A high-level service to manage user login
 */
class LoginService {
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
LoginService.ɵfac = function LoginService_Factory(t) { return new (t || LoginService)(ɵɵinject(START_CONFIG), ɵɵinject(MODAL_LOGIN), ɵɵinject(Router, 8), ɵɵinject(AppService), ɵɵinject(PrincipalWebService), ɵɵinject(UserSettingsWebService), ɵɵinject(ModalService), ɵɵinject(NotificationsService), ɵɵinject(AuthenticationService)); };
LoginService.ɵprov = ɵɵdefineInjectable({ token: LoginService, factory: LoginService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(LoginService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: Type, decorators: [{
                type: Inject,
                args: [MODAL_LOGIN]
            }] }, { type: Router, decorators: [{
                type: Optional
            }] }, { type: AppService }, { type: PrincipalWebService }, { type: UserSettingsWebService }, { type: ModalService }, { type: NotificationsService }, { type: AuthenticationService }]; }, null); })();

/**
 * A utility base class to assist main components in the handling of the login state of the
 * the application. It initiates the login process and sets `loginComplete` accordingly
 * whenever the login state changes
 */
class ComponentWithLogin {
    constructor(loginService, changeDetectorRef) {
        this.loginService = loginService;
        this.changeDetectorRef = changeDetectorRef;
    }
    /**
     * A method called whenever the `session-changed` event is received. This can be
     * overridden by the subclassing component.
     */
    onLoginComplete() {
    }
    /**
     * Subscribes to the [LoginService.events]{@link LoginService#events} and sets
     * the `loginComplete` member whenever the `session-changed` event is received
     */
    ngOnInit() {
        this.loginComplete = this.loginService.complete;
        this.loginSubscription = this.loginService.events.subscribe(event => {
            if (event.type === "session-changed") {
                this.loginComplete = this.loginService.complete;
                this.onLoginComplete();
                this.changeDetectorRef.markForCheck();
            }
        });
    }
    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
    }
    /**
     * Initiates the login process by calling [LoginService.login]{@link LoginService#login}
     */
    ngAfterViewInit() {
        this.loginService.login();
    }
}
ComponentWithLogin.ɵfac = function ComponentWithLogin_Factory(t) { return new (t || ComponentWithLogin)(ɵɵdirectiveInject(LoginService), ɵɵdirectiveInject(ChangeDetectorRef)); };
ComponentWithLogin.ɵcmp = ɵɵdefineComponent({ type: ComponentWithLogin, selectors: [["ng-component"]], decls: 0, vars: 0, template: function ComponentWithLogin_Template(rf, ctx) { }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ComponentWithLogin, [{
        type: Component,
        args: [{
                template: ''
            }]
    }], function () { return [{ type: LoginService }, { type: ChangeDetectorRef }]; }, null); })();

/**
 * Override ng2-ui-auth's state handling to retrieve a state from the Sinequa server
 */
class AuthenticationOauthService extends OauthService {
    constructor(startConfig, httpClient, sharedService, popupService, configService) {
        super(httpClient, sharedService, configService, popupService);
        this.startConfig = startConfig;
        this.httpClient = httpClient;
        this.sharedService = sharedService;
        this.popupService = popupService;
        this.configService = configService;
    }
    authenticate(name, userData) {
        const options = this.configService.options.providers[name];
        if (options.sqInitState) {
            return this.httpClient.get(Utils.addUrl(this.startConfig.apiPath, "oauth"), {
                params: Utils.makeHttpParams({
                    action: "initstate",
                    provider: options.name,
                    tokenInCookie: true,
                    loginInPopup: true,
                    noUserOverride: true,
                    noAutoAuthentication: true
                })
            }).pipe(flatMap((ret) => {
                options.state = ret.state;
                return super.authenticate(name, userData);
            }));
        }
        return super.authenticate(name, userData);
    }
}
AuthenticationOauthService.ɵfac = function AuthenticationOauthService_Factory(t) { return new (t || AuthenticationOauthService)(ɵɵinject(START_CONFIG), ɵɵinject(HttpClient), ɵɵinject(SharedService), ɵɵinject(PopupService), ɵɵinject(ConfigService)); };
AuthenticationOauthService.ɵprov = ɵɵdefineInjectable({ token: AuthenticationOauthService, factory: AuthenticationOauthService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AuthenticationOauthService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: HttpClient }, { type: SharedService }, { type: PopupService }, { type: ConfigService }]; }, null); })();

/**
 * Override ng2-ui-auth's popup handling as it doesn't work with SAML + IE11 because
 * of a double redirection.
 * The initial request is to Sinequa which redirects to the authentication provider.
 * On successful authentication, the authentication provider redirects back
 * to Sinequa to perform the login.
 * In IE the initial redirection causes the popup window to be reported as "closed"
 * which breaks the process.
 * So, override ng2-ui-auth's PopupService and do the inital request to get the
 * redirect url outside of the popup
 */
class AuthenticationPopupService extends PopupService {
    constructor(startConfig, httpClient) {
        super();
        this.startConfig = startConfig;
        this.httpClient = httpClient;
    }
    open(url, options /*IOauth2Options | IOauth1Options*/, cordova) {
        if (Utils.startsWith(url, this.startConfig.apiPath)) {
            return this.httpClient.get(url, {
                params: Utils.makeHttpParams({
                    noUserOverride: true,
                    noAutoAuthentication: true,
                    tokenInCookie: true,
                    loginInPopup: true
                })
            }).pipe(flatMap((ret) => {
                return super.open(ret.redirectUrl, options, cordova);
            }));
        }
        return super.open(url, options, cordova);
    }
}
AuthenticationPopupService.ɵfac = function AuthenticationPopupService_Factory(t) { return new (t || AuthenticationPopupService)(ɵɵinject(START_CONFIG), ɵɵinject(HttpClient)); };
AuthenticationPopupService.ɵprov = ɵɵdefineInjectable({ token: AuthenticationPopupService, factory: AuthenticationPopupService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AuthenticationPopupService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: HttpClient }]; }, null); })();

function Login_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "br");
    ɵɵelementStart(2, "span", 8);
    ɵɵtext(3);
    ɵɵpipe(4, "sqValidationError");
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    let tmp_0_0 = null;
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind1(4, 1, (tmp_0_0 = ctx_r0.form.get("userName")) == null ? null : tmp_0_0.errors));
} }
function Login_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "br");
    ɵɵelementStart(2, "span", 8);
    ɵɵtext(3);
    ɵɵpipe(4, "sqValidationError");
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    let tmp_0_0 = null;
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind1(4, 1, (tmp_0_0 = ctx_r1.form.get("password")) == null ? null : tmp_0_0.errors));
} }
/**
 * A basic login component that request a user name and password. It is designed to work with
 * [LoginService.getCredentials]{@link LoginService#getCredentials} and can be set using the
 * {@link MODAL_LOGIN} injection token
 */
class Login {
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
Login.ɵfac = function Login_Factory(t) { return new (t || Login)(ɵɵdirectiveInject(MODAL_MODEL), ɵɵdirectiveInject(ModalRef), ɵɵdirectiveInject(FormBuilder)); };
Login.ɵcmp = ɵɵdefineComponent({ type: Login, selectors: [["sq-core-login"]], decls: 18, vars: 19, consts: [["novalidate", "", "cdkTrapFocus", "", 2, "border", "solid", "padding", "16px", "background-color", "white", 3, "formGroup", "cdkTrapFocusAutoCapture"], [2, "margin-top", "0"], ["formControlName", "userName", 3, "placeholder"], [4, "ngIf"], [2, "margin-bottom", "8px"], ["type", "password", "formControlName", "password", 3, "placeholder"], ["type", "submit", 3, "click"], ["type", "button", 3, "click"], [2, "color", "red"]], template: function Login_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "h3", 1);
        ɵɵtext(2);
        ɵɵpipe(3, "sqMessage");
        ɵɵelementEnd();
        ɵɵelement(4, "input", 2);
        ɵɵpipe(5, "sqMessage");
        ɵɵtemplate(6, Login_ng_container_6_Template, 5, 3, "ng-container", 3);
        ɵɵelement(7, "div", 4);
        ɵɵelement(8, "input", 5);
        ɵɵpipe(9, "sqMessage");
        ɵɵtemplate(10, Login_ng_container_10_Template, 5, 3, "ng-container", 3);
        ɵɵelement(11, "hr");
        ɵɵelementStart(12, "button", 6);
        ɵɵlistener("click", function Login_Template_button_click_12_listener() { return ctx.ok(); });
        ɵɵtext(13);
        ɵɵpipe(14, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementStart(15, "button", 7);
        ɵɵlistener("click", function Login_Template_button_click_15_listener() { return ctx.cancel(); });
        ɵɵtext(16);
        ɵɵpipe(17, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("formGroup", ctx.form)("cdkTrapFocusAutoCapture", true);
        ɵɵadvance(2);
        ɵɵtextInterpolate(ɵɵpipeBind1(3, 9, "msg#modal.login.title"));
        ɵɵadvance(2);
        ɵɵpropertyInterpolate("placeholder", ɵɵpipeBind1(5, 11, "msg#modal.login.userName"));
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.showError(ctx.userNameControl));
        ɵɵadvance(2);
        ɵɵpropertyInterpolate("placeholder", ɵɵpipeBind1(9, 13, "msg#modal.login.password"));
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.showError(ctx.passwordControl));
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind1(14, 15, "msg#modal.buttons.ok"));
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind1(17, 17, "msg#modal.buttons.cancel"));
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, CdkTrapFocus, FormGroupDirective, DefaultValueAccessor, NgControlStatus, FormControlName, NgIf], pipes: [MessagePipe, ValidationErrorPipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(Login, [{
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
            }] }, { type: ModalRef }, { type: FormBuilder }]; }, null); })();

const LOGIN_MODULE_PROVIDERS = [];

/**
 * Configuration for the ng2-ui-auth library
 */
class AuthConfig {
    constructor(startConfig) {
        this.storageType = "memory";
        this.providers = startConfig.providers || {};
    }
}
AuthConfig.ɵfac = function AuthConfig_Factory(t) { return new (t || AuthConfig)(ɵɵinject(START_CONFIG)); };
AuthConfig.ɵprov = ɵɵdefineInjectable({ token: AuthConfig, factory: AuthConfig.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AuthConfig, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }]; }, null); })();
/**
 * This module provides support for user authentication in the {@link AuthenticationService}. This authentication can be
 * automatic (OAuth/SAML), if configured in the Sinequa administration, or manual where the user name and password are
 * entered in a modal dialog box and transmitted in clear text. There is also support for the ng2-ui-auth library where the
 * authentication process occurs in a browser popup window. Authentication is instigated by the handling of HTTP 401 errors
 * in an `HttpInterceptor` so all web service calls requiring authentication are automatically protected. This module will
 * not be used for authentication when the web server is configured for Windows authentication.
 *
 * A higher level {@link LoginService} groups the successful retrieval of the current `application configuration` ({@link AppService}),
 * `principal` ({@link PrincipalWebService}), and `user settings` ({@link UserSettingsWebService}) all of which require the user
 * to be authenticated. This can be used as a "gatekeeper" to protect access to the main, often routed, component(s).
 *
 * The {@link LoginInterceptor} in this module must be registered using `HTTP_INTERCEPTORS` in your app module.
 */
class LoginModule {
    static forRoot(loginModal = Login) {
        return {
            ngModule: LoginModule,
            providers: [
                // Login
                { provide: MODAL_LOGIN, useValue: loginModal },
            ]
        };
    }
}
LoginModule.ɵmod = ɵɵdefineNgModule({ type: LoginModule });
LoginModule.ɵinj = ɵɵdefineInjector({ factory: function LoginModule_Factory(t) { return new (t || LoginModule)(); }, providers: [
        // Auth module dependencies
        { provide: CONFIG_OPTIONS, useClass: AuthConfig },
        { provide: OauthService, useExisting: AuthenticationOauthService },
        { provide: PopupService, useExisting: AuthenticationPopupService },
        ...LOGIN_MODULE_PROVIDERS
    ], imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            Ng2UiAuthModule.forRoot(undefined, false),
            ModalModule.forRoot(),
            // CDK
            OverlayModule,
            A11yModule,
            // Sinequa modules
            BaseModule,
            AppUtilsModule,
            WebServicesModule,
            IntlModule,
            ValidationModule,
            NotificationModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(LoginModule, { declarations: [Login], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule, Ng2UiAuthModule, ModalModule, 
        // CDK
        OverlayModule,
        A11yModule,
        // Sinequa modules
        BaseModule,
        AppUtilsModule,
        WebServicesModule,
        IntlModule,
        ValidationModule,
        NotificationModule] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(LoginModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    Ng2UiAuthModule.forRoot(undefined, false),
                    ModalModule.forRoot(),
                    // CDK
                    OverlayModule,
                    A11yModule,
                    // Sinequa modules
                    BaseModule,
                    AppUtilsModule,
                    WebServicesModule,
                    IntlModule,
                    ValidationModule,
                    NotificationModule
                ],
                declarations: [
                    Login,
                ],
                exports: [],
                providers: [
                    // Auth module dependencies
                    { provide: CONFIG_OPTIONS, useClass: AuthConfig },
                    { provide: OauthService, useExisting: AuthenticationOauthService },
                    { provide: PopupService, useExisting: AuthenticationPopupService },
                    ...LOGIN_MODULE_PROVIDERS
                ]
            }]
    }], null, null); })();

const HTTP_REQUEST_INITIALIZERS = new InjectionToken("HTTP_REQUEST_INITIALIZERS");
/**
 * An `HttpInterceptor` to handle `HTTP 401 unauthorized` error responses by calling
 * [LoginService.getCredentials]{@link LoginService#getCredentials}. It also handles
 * the `sinequa-jwt-refresh` header set when auto refreshing of JWT is configured in
 * the Sinequa administration console.
 */
class LoginInterceptor {
    constructor(startConfig, requestInitializers, notificationsService, loginService, authService) {
        this.startConfig = startConfig;
        this.requestInitializers = requestInitializers;
        this.notificationsService = notificationsService;
        this.loginService = loginService;
        this.authService = authService;
    }
    processRequestInitializers(request) {
        if (this.requestInitializers) {
            for (const requestInitializer of this.requestInitializers) {
                if (!requestInitializer(request)) {
                    break;
                }
            }
        }
    }
    isJsonable(obj) {
        return (Utils.isObject(obj) || Utils.isArray(obj)) && !Utils.isArrayBuffer(obj) && !Utils.isBlob(obj) &&
            !Utils.isString(obj) && !(obj instanceof HttpParams);
    }
    shouldIntercept(url) {
        return Utils.startsWith(url, this.startConfig.apiPath);
    }
    notifyError(error) {
        let message;
        const title = "msg#error.serverError";
        if (error instanceof HttpErrorResponse) {
            const response = error;
            try {
                let data = response.error;
                if (Utils.isString(data)) {
                    try {
                        data = JSON.parse(data);
                    }
                    catch (exception) {
                    }
                }
                if (data && data.errorMessage) {
                    message = data.errorMessage;
                    if (data.errorCodeText) {
                        message = `${message} (${data.errorCodeText})`;
                    }
                    else if (data.errorCode) {
                        message = `${message} (${data.errorCode})`;
                    }
                }
            }
            catch (exception) {
            }
            if (!message) {
                if (response.status === 200) {
                    message = "msg#error.responseLoadFailure";
                }
                else if (response.statusText) {
                    message = `${response.statusText} (${response.status})`;
                }
                else {
                    message = `HTTP error: ${response.status}`;
                }
            }
        }
        else if (SqError.is(error)) {
            message = error.message;
        }
        else {
            message = (error + "") || "msg#error.unknownError";
        }
        this.notificationsService.error(message, undefined, title);
    }
    getCredentials(response, acceptCurrent) {
        return this.loginService.getCredentials(response, acceptCurrent)
            .catch((error) => {
            if (SqError.is(error, SqErrorCode.processedCredentialsError)) {
                return this.getCredentials(response, acceptCurrent);
            }
            throw error;
        });
    }
    /**
     * Handles `HTTP 401 unauthorized errors responses by calling
     * [LoginService.getCredentials]{@link LoginService#getCredentials}. It also handles auto
     * refreshing of JWT by processing the `sinequa-jwt-refresh` header. The JWT cookie itself
     * is updated by a `Set-Cookie` header in the response. There are a number of flags that
     * can be set in the request parameters which will be removed before the request is actually
     * sent:
     * * `noAutoAuthentication` - set to bypass the `HTTP 401` handling
     * * `noUserOverride` - set to not add the current user override to the request
     * * `noNotify` - set to not notify errors using the {@link NotificationService}
     *
     * @param request The intercepted request
     * @param next The next interceptor in the chain
     */
    intercept(request, next) {
        if (!this.shouldIntercept(request.url) || request.params.has("noIntercept")) {
            return next.handle(request);
        }
        let config = { headers: request.headers, params: request.params };
        const options = {
            noAutoAuthentication: Utils.isTrue(config.params.get("noAutoAuthentication")) || false,
            noUserOverride: Utils.isTrue(config.params.get("noUserOverride")) || false,
            hadCredentials: this.authService.haveCredentials,
            userOverrideActive: false
        };
        const noNotify = Utils.isTrue(config.params.get("noNotify")) || false;
        config.params = config.params.delete("noAutoAuthentication");
        config.params = config.params.delete("noUserOverride");
        config.params = config.params.delete("noNotify");
        config = this.authService.addAuthentication(config);
        if (this.authService.userOverrideActive && !options.noUserOverride) {
            options.userOverrideActive = true;
            config.headers = this.authService.addUserOverride(config);
        }
        config.headers = config.headers.set("sinequa-force-camel-case", "true");
        if (this.isJsonable(request.body)) {
            this.processRequestInitializers(request);
        }
        this.notificationsService.enter("network");
        const _request = request.clone({
            headers: config.headers,
            params: config.params,
            body: request.body,
            withCredentials: true
        });
        return next.handle(_request).pipe(catchError((error, caught) => {
            this.notificationsService.leave("network");
            if (error instanceof HttpErrorResponse) {
                switch (error.status) {
                    case 401: {
                        return this.handle401Error(error, _request, next, options, caught);
                    }
                }
            }
            if (!noNotify) {
                this.notifyError(error);
            }
            return throwError(error);
        }), map((event) => {
            if (event instanceof HttpResponse) {
                this.notificationsService.leave("network");
                this.authService.updateAuthentication(event);
            }
            return event;
        }));
    }
    handle401Error(err, req, next, options, caught) {
        if (!options.noAutoAuthentication) {
            if (options.userOverrideActive) {
                if (this.authService.userOverrideActive) {
                    this.authService.deactivateUserOverride();
                    this.authService.userOverrideFailed = true;
                    this.notificationsService.error("msg#error.userOverrideFailure");
                }
                return throwError(err);
            }
            return from(this.getCredentials(err, !options.hadCredentials))
                .pipe(switchMap(value => {
                const { headers } = this.authService.addAuthentication(req);
                return next.handle(req.clone({ headers }));
            }), catchError(err => 
            // in case of an Http error, 'caught' must be returned to be catched by the interceptor
            err instanceof HttpErrorResponse ? caught : throwError(err)));
        }
        return throwError(err);
    }
}
LoginInterceptor.ɵfac = function LoginInterceptor_Factory(t) { return new (t || LoginInterceptor)(ɵɵinject(START_CONFIG), ɵɵinject(HTTP_REQUEST_INITIALIZERS, 8), ɵɵinject(NotificationsService), ɵɵinject(LoginService), ɵɵinject(AuthenticationService)); };
LoginInterceptor.ɵprov = ɵɵdefineInjectable({ token: LoginInterceptor, factory: LoginInterceptor.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(LoginInterceptor, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [HTTP_REQUEST_INITIALIZERS]
            }] }, { type: NotificationsService }, { type: LoginService }, { type: AuthenticationService }]; }, null); })();

var _enLogin = {
    "modal": {
        "login": {
            "title": "Login",
            "userName": "User name",
            "password": "Password",
            "singleSignOn": "Single sign-on",
            "signInWith": "Sign in with..."
        }
    }
};

var _frLogin = {
    "modal": {
        "login": {
            "title": "Connexion",
            "userName": "Identifiant",
            "password": "Mot de passe",
            "singleSignOn": "Authentification unique",
            "signInWith": "S'identifier avec ..."
        }
    },
};

var _deLogin = {
    "modal": {
        "login": {
            "title": "Anmeldung",
            "userName": "Benutzername",
            "password": "Passwort",
            "singleSignOn": "Einmalanmeldung (Single sign-on)",
            "signInWith": "Anmelden mit..."
        }
    }
};

const enLogin = Utils.merge({}, _enLogin, enIntl, enModal, enValidation);
const frLogin = Utils.merge({}, _frLogin, frIntl, frModal, frValidation);
const deLogin = Utils.merge({}, _deLogin, deIntl, deModal, deValidation);

/**
 * Generated bundle index. Do not edit.
 */

export { AuthConfig, AuthenticationOauthService, AuthenticationPopupService, AuthenticationService, ComponentWithLogin, HTTP_REQUEST_INITIALIZERS, JWTService, Login, LoginInterceptor, LoginModule, LoginService, MODAL_LOGIN, TokenService, deLogin, enLogin, frLogin };
//# sourceMappingURL=sinequa-core-login.js.map
