import { Injectable, Inject } from "@angular/core";
import { timer, of, throwError } from "rxjs";
import { share, flatMap, map, catchError } from "rxjs/operators";
import { HttpService, START_CONFIG } from "@sinequa/core/web-services";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/web-services";
import * as i2 from "./token.service";
import * as i3 from "./jwt.service";
import * as i4 from "ng2-ui-auth";
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
export class AuthenticationService extends HttpService {
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
AuthenticationService.ɵfac = function AuthenticationService_Factory(t) { return new (t || AuthenticationService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.SqHttpClient), i0.ɵɵinject(i2.TokenService), i0.ɵɵinject(i1.AuditWebService), i0.ɵɵinject(i3.JWTService), i0.ɵɵinject(i4.AuthService)); };
AuthenticationService.ɵprov = i0.ɵɵdefineInjectable({ token: AuthenticationService, factory: AuthenticationService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AuthenticationService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.SqHttpClient }, { type: i2.TokenService }, { type: i1.AuditWebService }, { type: i3.JWTService }, { type: i4.AuthService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2xvZ2luLyIsInNvdXJjZXMiOlsiYXV0aGVudGljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQWEsS0FBSyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRS9ELE9BQU8sRUFBQyxXQUFXLEVBQUUsWUFBWSxFQUErQixNQUFNLDRCQUE0QixDQUFDO0FBQ25HLE9BQU8sRUFBQyxLQUFLLEVBQWMsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7O0FBbUJ0RCxNQUFNLGlDQUFpQyxHQUFHLENBQUMsQ0FBQztBQTRENUM7Ozs7Ozs7O0dBUUc7QUFJSCxNQUFNLE9BQU8scUJBQXNCLFNBQVEsV0FBVztJQVNsRCxZQUMwQixXQUF3QixFQUN0QyxVQUF3QixFQUN4QixZQUEwQixFQUMxQixZQUE2QixFQUM3QixVQUFzQixFQUN0QixXQUF3QjtRQUNoQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFMWCxlQUFVLEdBQVYsVUFBVSxDQUFjO1FBQ3hCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGlCQUFZLEdBQVosWUFBWSxDQUFpQjtRQUM3QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBRWhDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBR0Q7O09BRUc7SUFDSCxJQUFJLFlBQVk7UUFDWixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7T0FHRztJQUNILElB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QUMsQ0FBQyxDQUFDLENBQUM7SUFDWixDQUFDOzswRkFsYVEscUJBQXFCLGNBVWxCLFlBQVk7NkRBVmYscUJBQXFCLFdBQXJCLHFCQUFxQixtQkFGbEIsTUFBTTtrREFFVCxxQkFBcUI7Y0FIakMsVUFBVTtlQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOztzQkFXUSxNQUFNO3VCQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIEluamVjdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMsIEh0dHBSZXNwb25zZSwgSHR0cEVycm9yUmVzcG9uc2V9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCB0aW1lciwgb2YsIHRocm93RXJyb3J9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge3NoYXJlLCBmbGF0TWFwLCBtYXAsIGNhdGNoRXJyb3J9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSBcIm5nMi11aS1hdXRoXCI7XG5pbXBvcnQge0h0dHBTZXJ2aWNlLCBTVEFSVF9DT05GSUcsIFN0YXJ0Q29uZmlnLCBBdWRpdFdlYlNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtVdGlscywgSVJlZiwgTWFwT2Z9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7U3FIdHRwQ2xpZW50fSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7VG9rZW5TZXJ2aWNlfSBmcm9tIFwiLi90b2tlbi5zZXJ2aWNlXCI7XG5pbXBvcnQge0pXVFNlcnZpY2V9IGZyb20gXCIuL2p3dC5zZXJ2aWNlXCI7XG5cbmludGVyZmFjZSBBdXRoZW50aWNhdGlvbiB7XG4gICAgY3NyZlRva2VuOiBzdHJpbmc7XG4gICAgaGVhZGVycz86IE1hcE9mPHN0cmluZz47ICAgIC8vIHNldCBpbiBodHRwIGhlYWRlcnNcbiAgICBwYXJhbXM/OiBNYXBPZjxzdHJpbmc+OyAgICAgLy8gYWRkZWQgdG8gcXVlcnkgc3RyaW5nXG59XG5cbi8qKlxuICogRGVzY3JpYmVzIHRoZSBjcmVkZW50aWFscyB0aGF0IGEgdXNlciB3b3VsZCBlbnRlciBtYW51YWxseSB0byBhdXRoZW50aWNhdGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDcmVkZW50aWFscyB7XG4gICAgdXNlck5hbWU/OiBzdHJpbmc7XG4gICAgcGFzc3dvcmQ/OiBzdHJpbmc7XG59XG5cbmNvbnN0IExFR0FDWV9QUk9DRVNTRURfQ1JFREVOVElBTFNfS0lORCA9IDA7XG5cbi8qKlxuICogRGVzY3JpYmVzIHRoZSBvYmplY3QgY3JlYXRlZCBhZnRlciBzdWNjZXNzZnVsIGF1dGhlbnRpY2F0aW9uLiBUaGUgZm9ybSBvZiB0aGlzIG9iamVjdFxuICogaXMgZGVzaWduZWQgdG8gbWFpbnRhaW4gY29tcGF0aWJpbGl0eSB3aXRoIHByZXZpb3VzIFNCQSBsaWJyYXJpZXNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQcm9jZXNzZWRDcmVkZW50aWFscyB7XG4gICAgLyoqXG4gICAgICogQW4gdW51c2VkIFwia2luZFwiIHZhbHVlIC0gYWx3YXlzIHNldCB0byAwXG4gICAgICovXG4gICAga2luZDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFRoZSB1c2VyIG5hbWUgb2YgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlclxuICAgICAqL1xuICAgIHVzZXJOYW1lPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEFkZGl0aW9uYWwgZGF0YSBjb250YWluaW5nIHRoZSBhc3NvY2lhdGVkIENTUkYgdG9rZW4gdGhhdCBpcyBzZW50IHdpdGhcbiAgICAgKiBhdXRoZW50aWNhdGVkIHdlYiBzZXJ2aWNlIHJlcXVlc3RzIGFuZCB0aGUgcHJvdmlkZXIgZm9yIGluZm9ybWF0aW9uYWxcbiAgICAgKiBwdXJwb3NlcyBvbmx5LiBUaGUgcHJvdmlkZXIgd2lsbCBiZSBgU2luZXF1YWAgZm9yIGZvcm0tYmFzZWQgYXV0aGVudGljYXRpb25cbiAgICAgKiBhbmQgdGhlIG5hbWUgb2YgdGhlIGF1dG8tbG9naW4gcHJvdmlkZXIgaW4gdGhlIFNpbmVxdWEgY29uZmlndXJhdGlvbiBmb3JcbiAgICAgKiBPQXV0aCBhbmQgU0FNTCBhdXRoZW50aWNhdGlvblxuICAgICAqL1xuICAgIGRhdGE6IHtcbiAgICAgICAgY3NyZlRva2VuOiBzdHJpbmcsIC8vIHRoZSB3ZWIgdG9rZW4gaXRzZWxmIGlzIHN0b3JlZCBpbiB0aGUgc2luZXF1YS13ZWItdG9rZW4gY29va2llXG4gICAgICAgIHByb3ZpZGVyOiBzdHJpbmdcbiAgICB9O1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyB0aGUgb2JqZWN0IHVzZWQgYnkgYW4gYWRtaW5pc3RyYXRvciB0byBhdXRoZW50aWNhdGUgYXMgYW5vdGhlciB1c2VyXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVXNlck92ZXJyaWRlIHtcbiAgICAvKipcbiAgICAgKiBUaGUgdXNlciBuYW1lIG9mIHRoZSB1c2VyIHRvIGF1dGhlbnRpY2F0ZSBhc1xuICAgICAqL1xuICAgIHVzZXJOYW1lOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIFNpbmVxdWEgZG9tYWluIG5hbWUgY29udGFpbmluZyB0aGUgdXNlclxuICAgICAqL1xuICAgIGRvbWFpbjogc3RyaW5nO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyBhIEpXVCBvYmplY3RcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBKc29uV2ViVG9rZW4ge1xuICAgIGhlYWRlcjoge1xuICAgICAgICB0eXA6IHN0cmluZyxcbiAgICAgICAgYWxnOiBzdHJpbmdcbiAgICB9O1xuICAgIHBheWxvYWQ6IHtcbiAgICAgICAgaXNzOiBzdHJpbmcsXG4gICAgICAgIGlhdDogc3RyaW5nLFxuICAgICAgICBleHA6IHN0cmluZyxcbiAgICAgICAgc3ViOiBzdHJpbmcsXG4gICAgICAgIGhhc2g6IHN0cmluZ1xuICAgIH07XG4gICAgc2lnbmF0dXJlOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQSBzZXJ2aWNlIHRvIGF1dGhlbnRpY2F0ZSBhIHVzZXIgd2l0aCBhIFNpbmVxdWEgc2VydmVyLiBBdXRoZW50aWNhdGlvbiBjYW4gYmUgYXV0b21hdGljIChPQXV0aC9TQU1MKSwgaWYgY29uZmlndXJlZCBpbiB0aGVcbiAqIFNpbmVxdWEgYWRtaW5pc3RyYXRpb24sIG9yIG1hbnVhbCB3aGVyZSB0aGUgdXNlciBuYW1lIGFuZCBwYXNzd29yZCBhcmUgZW50ZXJlZCBpbiBhIG1vZGFsIGRpYWxvZyBib3ggYW5kIHRyYW5zbWl0dGVkIGluXG4gKiBjbGVhciB0ZXh0LiBUaGVyZSBpcyBhbHNvIHN1cHBvcnQgZm9yIHRoZSBuZzItdWktYXV0aCBsaWJyYXJ5IHdoZXJlIHRoZSBhdXRoZW50aWNhdGlvbiBwcm9jZXNzIG9jY3VycyBpbiBhIGJyb3dzZXIgcG9wdXAgd2luZG93LlxuICogU3VjY2Vzc2Z1bCBhdXRoZW50aWNhdGlvbiByZXN1bHRzIGluIGEgSldUIHN0b3JlZCBpbiBjb29raWUgYWxvbmcgd2l0aCBhIENTUkYgdG9rZW4gd2hpY2ggaXMgc3RvcmVkIGluIHN0b3JhZ2Ugc28gaXQgY2FuXG4gKiBiZSBwaWNrZWQgdXAgaW4gb3RoZXIgYnJvd3NlciB0YWJzLlxuICpcbiAqIFRoZSBzZXJ2aWNlIGFsc28gaG9sZHMgaW5mb3JtYXRpb24gb24gdGhlIHN0YXR1cyBvZiB0aGUgXCJvdmVycmlkZSB1c2VyXCIgYWRtaW5pc3RyYXRvciBmdW5jdGlvblxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogXCJyb290XCJcbn0pXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRpb25TZXJ2aWNlIGV4dGVuZHMgSHR0cFNlcnZpY2Uge1xuICAgIHByaXZhdGUgYXV0aGVudGljYXRpb246IEF1dGhlbnRpY2F0aW9uIHwgdW5kZWZpbmVkO1xuICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZTtcbiAgICAvKipcbiAgICAgKiBBIGZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIGFuIGF0dGVtcHQgdG8gXCJvdmVycmlkZSB1c2VyXCIgaGFzIGZhaWxlZC4gVGhpcyBpcyBub3JtYWxseVxuICAgICAqIG9ubHkgc2V0IGJ5IHRoZSB7QGxpbmsgSHR0cEludGVyY2VwdG9yfSBhbmQgdGVzdGVkIGFuZCByZXNldCBpbiB7QGxpbmsgTG9naW5TZXJ2aWNlfVxuICAgICAqL1xuICAgIHVzZXJPdmVycmlkZUZhaWxlZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KFNUQVJUX0NPTkZJRykgc3RhcnRDb25maWc6IFN0YXJ0Q29uZmlnLFxuICAgICAgICBwcml2YXRlIGh0dHBDbGllbnQ6IFNxSHR0cENsaWVudCxcbiAgICAgICAgcHJpdmF0ZSB0b2tlblNlcnZpY2U6IFRva2VuU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBhdWRpdFNlcnZpY2U6IEF1ZGl0V2ViU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBqV1RTZXJ2aWNlOiBKV1RTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xuICAgICAgICBzdXBlcihzdGFydENvbmZpZyk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VzZXJPdmVycmlkZTogVXNlck92ZXJyaWRlIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycnJlbnQgdXNlciBvdmVycmlkZSwgaWYgYW55XG4gICAgICovXG4gICAgZ2V0IHVzZXJPdmVycmlkZSgpOiBVc2VyT3ZlcnJpZGUgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlck92ZXJyaWRlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldC91bnNldCB0aGUgdXNlciBvdmVycmlkZS4gVGhlIHtAbGluayAjdXNlck92ZXJyaWRlQWN0aXZlfSBmbGFnXG4gICAgICogaXMgc2V0IGFjY29yZGluZ2x5XG4gICAgICovXG4gICAgc2V0IHVzZXJPdmVycmlkZSh2YWx1ZTogVXNlck92ZXJyaWRlIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3VzZXJPdmVycmlkZSA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy5fdXNlck92ZXJyaWRlKSB7XG4gICAgICAgICAgICB0aGlzLl91c2VyT3ZlcnJpZGVBY3RpdmUgPSAhIXRoaXMuX3VzZXJPdmVycmlkZS51c2VyTmFtZSAmJiAhIXRoaXMuX3VzZXJPdmVycmlkZS5kb21haW47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl91c2VyT3ZlcnJpZGVBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3VzZXJPdmVycmlkZUFjdGl2ZTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEEgZmxhZyBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIGN1cnJlbnQgdXNlciBvdmVycmlkZSBpcyBhY3RpdmVcbiAgICAgKi9cbiAgICBnZXQgdXNlck92ZXJyaWRlQWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlck92ZXJyaWRlQWN0aXZlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Byb2Nlc3NlZENyZWRlbnRpYWxzOiBQcm9jZXNzZWRDcmVkZW50aWFscyB8IHVuZGVmaW5lZDtcbiAgICBwcml2YXRlIF9wcm9jZXNzZWRDcmVkZW50aWFsc1N0cjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50IHByb2Nlc3NlZCBjcmVkZW50aWFsc1xuICAgICAqL1xuICAgIGdldCBwcm9jZXNzZWRDcmVkZW50aWFscygpOiBQcm9jZXNzZWRDcmVkZW50aWFscyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzZWRDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGN1cnJlbnQgcHJvY2Vzc2VkIGNyZWRlbnRpYWxzLiBBIHN0cmluZ2lmaWVkIHZlcnNpb25cbiAgICAgKiBpcyBzdG9yZWQgaW4gZWl0aGVyIGxvY2FsIG9yIHNlc3Npb24gc3RvcmFnZVxuICAgICAqL1xuICAgIHNldCBwcm9jZXNzZWRDcmVkZW50aWFscyh2YWx1ZTogUHJvY2Vzc2VkQ3JlZGVudGlhbHMgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fcHJvY2Vzc2VkQ3JlZGVudGlhbHMgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdQcm9jZXNzZWRDcmVkZW50aWFsc1N0ciA9IFV0aWxzLnRvSnNvbih0aGlzLl9wcm9jZXNzZWRDcmVkZW50aWFscyk7XG4gICAgICAgICAgICBpZiAodGhpcy5fcHJvY2Vzc2VkQ3JlZGVudGlhbHNTdHIgIT09IG5ld1Byb2Nlc3NlZENyZWRlbnRpYWxzU3RyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc2VkQ3JlZGVudGlhbHNTdHIgPSBuZXdQcm9jZXNzZWRDcmVkZW50aWFsc1N0cjtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShcInNpbmVxdWEtY3JlZGVudGlhbHNcIiwgdGhpcy5fcHJvY2Vzc2VkQ3JlZGVudGlhbHNTdHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3Byb2Nlc3NlZENyZWRlbnRpYWxzU3RyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc2VkQ3JlZGVudGlhbHNTdHIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZUl0ZW0oXCJzaW5lcXVhLWNyZWRlbnRpYWxzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgYW4gT0F1dGggb3IgU0FNTCBhdXRvIHByb3ZpZGVyIGlzIGNvbmZpZ3VyZWRcbiAgICAgKi9cbiAgICBnZXQgYXV0b0xvZ2luQWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLnN0YXJ0Q29uZmlnLmF1dG9PQXV0aFByb3ZpZGVyIHx8ICEhdGhpcy5zdGFydENvbmZpZy5hdXRvU0FNTFByb3ZpZGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlYWN0aXZhdGUgdGhlIGN1cnJlbnQgdXNlciBvdmVycmlkZVxuICAgICAqL1xuICAgIGRlYWN0aXZhdGVVc2VyT3ZlcnJpZGUoKSB7XG4gICAgICAgIHRoaXMuX3VzZXJPdmVycmlkZUFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZENyZWRlbnRpYWxzKCkge1xuICAgICAgICBjb25zdCBzaW5lcXVhQ3JlZGVudGlhbHMgPSB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShcInNpbmVxdWEtY3JlZGVudGlhbHNcIik7XG4gICAgICAgIHRoaXMuX3Byb2Nlc3NlZENyZWRlbnRpYWxzU3RyID0gc2luZXF1YUNyZWRlbnRpYWxzID8gc2luZXF1YUNyZWRlbnRpYWxzIDogdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9wcm9jZXNzZWRDcmVkZW50aWFscyA9IHRoaXMuX3Byb2Nlc3NlZENyZWRlbnRpYWxzU3RyID8gVXRpbHMuZnJvbUpzb24odGhpcy5fcHJvY2Vzc2VkQ3JlZGVudGlhbHNTdHIpIDogbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNhdmVDcmVkZW50aWFscyh2YWx1ZTogUHJvY2Vzc2VkQ3JlZGVudGlhbHMpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzZWRDcmVkZW50aWFscyA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRDb25maWcuYXV0aGVudGljYXRpb25TdG9yYWdlID09PSBcImxvY2FsXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2UgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2FkQ3JlZGVudGlhbHMoKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCAoZXZlbnQ6IFN0b3JhZ2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnN0b3JhZ2VBcmVhID09PSB0aGlzLnN0b3JhZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV2ZW50LmtleSkgeyAvLyBjbGVhclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NlZENyZWRlbnRpYWxzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChldmVudC5rZXkgPT09IFwic2luZXF1YS1jcmVkZW50aWFsc1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5uZXdWYWx1ZSAhPT0gdGhpcy5fcHJvY2Vzc2VkQ3JlZGVudGlhbHNTdHIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZENyZWRlbnRpYWxzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgYHByb2Nlc3NlZENyZWRlbnRpYWxzYCBleGlzdHNcbiAgICAgKi9cbiAgICBnZXQgaGF2ZUNyZWRlbnRpYWxzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLnByb2Nlc3NlZENyZWRlbnRpYWxzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCB0aGUgY3VycmVudCBhdXRoZW50aWNhdGlvbiBpbmZvcm1hdGlvbiB0byB0aGUgcGFzc2VkIGBIdHRwSGVhZGVyc2AgYW5kIGBIdHRwUGFyYW1zYC5cbiAgICAgKiBDdXJyZW50bHksIHRoaXMgYWRkcyB0aGUgYHNpbmVxdWEtY3NyZi10b2tlbmAgdmFsdWUgdG8gdGhlIEhUVFAgaGVhZGVycy4gQ2FsbGVkIGZyb21cbiAgICAgKiB7QGxpbmsgSHR0cEludGVyY2VwdG9yfVxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbmZpZyBIdHRwSGVhZGVycyBhbmQgSHR0cFBhcmFtcyB0byBiZSB1cGRhdGVkXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBuZXcgY29uZmlndXJhdGlvblxuICAgICAqL1xuICAgIGFkZEF1dGhlbnRpY2F0aW9uKGNvbmZpZzoge2hlYWRlcnM6IEh0dHBIZWFkZXJzLCBwYXJhbXM6IEh0dHBQYXJhbXN9KToge2hlYWRlcnM6IEh0dHBIZWFkZXJzLCBwYXJhbXM6IEh0dHBQYXJhbXN9IHtcbiAgICAgICAgdGhpcy5kb0F1dGhlbnRpY2F0aW9uKCk7XG4gICAgICAgIGlmICh0aGlzLmF1dGhlbnRpY2F0aW9uKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRoZW50aWNhdGlvbi5oZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBoZWFkZXIgaW4gdGhpcy5hdXRoZW50aWNhdGlvbi5oZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dGhlbnRpY2F0aW9uLmhlYWRlcnMuaGFzT3duUHJvcGVydHkoaGVhZGVyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycy5zZXQoaGVhZGVyLCB0aGlzLmF1dGhlbnRpY2F0aW9uLmhlYWRlcnNbaGVhZGVyXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRoZW50aWNhdGlvbi5wYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHBhcmFtIGluIHRoaXMuYXV0aGVudGljYXRpb24ucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dGhlbnRpY2F0aW9uLnBhcmFtcy5oYXNPd25Qcm9wZXJ0eShwYXJhbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZy5wYXJhbXMgPSBjb25maWcucGFyYW1zLnNldChwYXJhbSwgdGhpcy5hdXRoZW50aWNhdGlvbi5wYXJhbXNbcGFyYW1dKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgY3VycmVudCBhdXRoZW50aWNhdGlvbiBpbmZvcm1hdGlvbiB3aXRoIGluZm9ybWF0aW9uIGluIHRoZSBwYXNzZWQgYHJlc3BvbnNlYC5cbiAgICAgKiBUaGlzIHByb2Nlc3NlcyB0aGUgYHNpbmVxdWEtand0LXJlZnJlc2hgIGhlYWRlciB3aGljaCB3aWxsIGNvbnRhaW4gYW4gdXBkYXRlZCBDU1JGIHRva2VuXG4gICAgICogdG8gY29ycmVzcG9uZCB0byB0aGUgbmV3IEpXVCBjb29raWUuIENhbGxlZCBmcm9tIHtAbGluayBIdHRwSW50ZXJjZXB0b3J9XG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzcG9uc2UgQW4gYEh0dHBSZXNwb25zZWBcbiAgICAgKi9cbiAgICB1cGRhdGVBdXRoZW50aWNhdGlvbihyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pIHtcbiAgICAgICAgY29uc3QgY3NyZlRva2VuID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoXCJzaW5lcXVhLWp3dC1yZWZyZXNoXCIpO1xuICAgICAgICBpZiAoY3NyZlRva2VuKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9jZXNzZWRDcmVkZW50aWFscykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb2Nlc3NlZENyZWRlbnRpYWxzLmRhdGEuY3NyZlRva2VuICE9PSBjc3JmVG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzZWRDcmVkZW50aWFscy5kYXRhLmNzcmZUb2tlbiA9IGNzcmZUb2tlbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlQ3JlZGVudGlhbHModGhpcy5wcm9jZXNzZWRDcmVkZW50aWFscyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDc3JmVG9rZW4oY3NyZlRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaEF1dGhlbnRpY2F0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9jZXNzZWRDcmVkZW50aWFscykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmF1dGhlbnRpY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoZW50aWNhdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgY3NyZlRva2VuOiB0aGlzLnByb2Nlc3NlZENyZWRlbnRpYWxzLmRhdGEuY3NyZlRva2VuXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRpb24uY3NyZlRva2VuID0gdGhpcy5wcm9jZXNzZWRDcmVkZW50aWFscy5kYXRhLmNzcmZUb2tlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRvQXV0aGVudGljYXRpb24oKSB7XG4gICAgICAgIHRoaXMucmVmcmVzaEF1dGhlbnRpY2F0aW9uKCk7XG4gICAgICAgIGlmICh0aGlzLmF1dGhlbnRpY2F0aW9uICYmIHRoaXMuYXV0aGVudGljYXRpb24uY3NyZlRva2VuKSB7XG4gICAgICAgICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uLmhlYWRlcnMgPSB7XG4gICAgICAgICAgICAgICAgXCJzaW5lcXVhLWNzcmYtdG9rZW5cIjogdGhpcy5hdXRoZW50aWNhdGlvbi5jc3JmVG9rZW5cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEF1dGhlbnRpY2F0ZUhlYWRlcihyZWdleDogUmVnRXhwLCBhdXRoZW50aWNhdGlvbkhlYWRlcnM6IHN0cmluZ1tdLCBoZWFkZXI6IElSZWY8c3RyaW5nPik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoYXV0aGVudGljYXRpb25IZWFkZXJzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaWMgPSBhdXRoZW50aWNhdGlvbkhlYWRlcnMubGVuZ3RoOyBpIDwgaWM7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGF1dGhlbnRpY2F0aW9uSGVhZGVyID0gYXV0aGVudGljYXRpb25IZWFkZXJzW2ldO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSByZWdleC5leGVjKGF1dGhlbnRpY2F0aW9uSGVhZGVyKTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJlZml4ID0gbWF0Y2hlc1swXTtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyLnZhbHVlID0gYXV0aGVudGljYXRpb25IZWFkZXIuc2xpY2UocHJlZml4Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXV0aGVudGljYXRlIHdpdGggdGhlIFNpbmVxdWEgc2VydmVyIHVzaW5nIHRoZSBwYXNzZWQgY3JlZGVudGlhbHMuIFRoZSBjcmVkZW50aWFscyBhcmUgc2VudFxuICAgICAqIGluIGNsZWFyIHRleHQuIFByaW9yIHRvIHRoZSBhdXRoZW50aWNhdGlvbiB0aGUgcGFzc2VkIGByZXNwb25zZWAgaXMgY2hlY2tlZCBmb3IgYVxuICAgICAqIGBXV1ctQXV0aGVudGljYXRlOiBCZWFyZXJgIGhlYWRlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjcmVkZW50aWFscyBUaGUgY3JlZGVudGlhbHMgdG8gYXV0aGVudGljYXRlIHdpdGhcbiAgICAgKiBAcGFyYW0gcmVzcG9uc2UgVGhlIGVycm9yIHJlc3BvbnNlIHRoZSByZWNlcHRpb24gb2Ygd2hpY2ggaW5pdGlhdGVkIHRoZSBjYWxsIHRvIHRoaXMgbWV0aG9kXG4gICAgICovXG4gICAgYXV0aGVudGljYXRlKFxuICAgICAgICBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMsXG4gICAgICAgIHJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSk6IFByb21pc2U8UHJvY2Vzc2VkQ3JlZGVudGlhbHMgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3Qgd3d3QXV0aGVudGljYXRlID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoXCJXV1ctQXV0aGVudGljYXRlXCIpO1xuICAgICAgICBpZiAoIXd3d0F1dGhlbnRpY2F0ZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1pc3NpbmcgV1dXLUF1dGhlbnRpY2F0ZSBoZWFkZXJcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXV0aGVudGljYXRlSGVhZGVycyA9IHd3d0F1dGhlbnRpY2F0ZS5zcGxpdChcIiwgXCIpO1xuICAgICAgICBjb25zdCBoZWFkZXI6IElSZWY8c3RyaW5nPiA9IHt2YWx1ZTogXCJcIn07XG4gICAgICAgIGlmICghdGhpcy5nZXRBdXRoZW50aWNhdGVIZWFkZXIoL15CZWFyZXIgPy8sIGF1dGhlbnRpY2F0ZUhlYWRlcnMsIGhlYWRlcikpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmV4cGVjdGVkIFdXVy1BdXRoZW50aWNhdGUgaGVhZGVyXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmpXVFNlcnZpY2UuZ2V0VG9rZW4oY3JlZGVudGlhbHMpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAudGhlbigodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBraW5kOiBMRUdBQ1lfUFJPQ0VTU0VEX0NSRURFTlRJQUxTX0tJTkQsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJOYW1lOiBjcmVkZW50aWFscy51c2VyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3NyZlRva2VuOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyOiBcIlNpbmVxdWFcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbGwgY3VycmVudCBhdXRoZW50aWNhdGlvbiBkYXRhLiBUaGUgSldUIGNvb2tpZVxuICAgICAqIGlzIHJlbW92ZWRcbiAgICAgKi9cbiAgICBsb2dvdXQoKSB7XG4gICAgICAgIHRoaXMuYXVkaXRTZXJ2aWNlLm5vdGlmeUxvZ291dCgpLnN1YnNjcmliZShcbiAgICAgICAgICAgIF8gPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudG9rZW5TZXJ2aWNlLmRlbGV0ZVdlYlRva2VuQ29va2llKCkuc3Vic2NyaWJlKClcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc2VkQ3JlZGVudGlhbHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIHRoZSBjdXJyZW50IHVzZXIgb3ZlcnJpZGUgaW5mb3JtYXRpb24gdG8gdGhlIHBhc3NlZCBoZWFkZXJzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbmZpZyBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgYEh0dHBIZWFkZXJzYCB0byB1cGRhdGVcbiAgICAgKi9cbiAgICBhZGRVc2VyT3ZlcnJpZGUoY29uZmlnOiB7aGVhZGVyczogSHR0cEhlYWRlcnN9KTogSHR0cEhlYWRlcnMge1xuICAgICAgICBpZiAodGhpcy51c2VyT3ZlcnJpZGUgJiYgdGhpcy51c2VyT3ZlcnJpZGVBY3RpdmUpIHtcbiAgICAgICAgICAgIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMuc2V0KFwic2luZXF1YS1vdmVycmlkZS11c2VyXCIsIHRoaXMudXNlck92ZXJyaWRlLnVzZXJOYW1lKTtcbiAgICAgICAgICAgIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMuc2V0KFwic2luZXF1YS1vdmVycmlkZS1kb21haW5cIiwgdGhpcy51c2VyT3ZlcnJpZGUuZG9tYWluKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb25maWcuaGVhZGVycztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWF0ZSBhdXRoZW50aWNhdGlvbiB1c2luZyB0aGUgbmcyLXVpLWF1dGggbGlicmFyeS4gVGhlIGF1dGhlbnRpY2F0aW9uIHByb2Nlc3Mgd2lsbCBiZSBwZXJmb3JtZWRcbiAgICAgKiBpbiBhIGJyb3dzZXIgcG9wdXAgd2luZG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvdmlkZXIgVGhlIG5hbWUgb2YgdGhlIHByb3ZpZGVyIHRvIHVzZS4gVGhpcyBpcyB0aGUgbmFtZSBjb25maWd1cmVkIGluIHRoZSBTaW5lcXVhIGFkbWluaXN0cmF0aW9uXG4gICAgICogY29uc29sZVxuICAgICAqL1xuICAgIGF1dGhlbnRpY2F0ZVdpdGhQcm92aWRlcihwcm92aWRlcjogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgLy8gQXV0aFNlcnZpY2UuYXV0aGVudGljYXRlIG9wZW5zIGEgcG9wdXAuIE9uIHNvbWUgcGxhdGZvcm1zIChGaXJlZm94KSB0aGlzIGlzIGFzeW5jaHJvbm91c1xuICAgICAgICAvLyBzbyB3ZSBhZGQgYSBkZWxheSAodGltZXIoMCkpIHNvIHRoZSBjYWxsZXIgY2FuIGNyZWF0ZSBhIHByb21pc2UgZnJvbSB0aGUgcmV0dXJuZWQgb2JzZXJ2YWJsZVxuICAgICAgICAvLyB3aXRob3V0IHlpZWxkaW5nXG4gICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSB0aW1lcigwKS5waXBlKGZsYXRNYXAoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvYnNlcnZhYmxlMSA9IHRoaXMuYXV0aFNlcnZpY2UuYXV0aGVudGljYXRlKHByb3ZpZGVyLCB0cnVlKS5waXBlKHNoYXJlKCkpO1xuICAgICAgICAgICAgVXRpbHMuc3Vic2NyaWJlKG9ic2VydmFibGUxLFxuICAgICAgICAgICAgICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBOQiByZXNwb25zZSBzaG91bGQgYmUgdGhlIHJldHVybiB2YWx1ZSBmcm9tIEpPQXV0aC9KU2FtbCBqc29uIG1ldGhvZHNcbiAgICAgICAgICAgICAgICAgICAgLy8gSXQgY2FuIGJlIHVuZGVmaW5lZCBlZyBpZiB0aGUgcG9wdXAgZmFpbHMgdG8gb3BlblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc2VkQ3JlZGVudGlhbHMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZDogTEVHQUNZX1BST0NFU1NFRF9DUkVERU5USUFMU19LSU5ELFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NyZlRva2VuOiByZXNwb25zZS5jc3JmVG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG9ic2VydmFibGUxO1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q3NyZlRva2VuKGNzcmZUb2tlbjogc3RyaW5nLCBwcm92aWRlciA9IFwiU2luZXF1YVwiKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghY3NyZlRva2VuKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9jZXNzZWRDcmVkZW50aWFscyA9IHtcbiAgICAgICAgICAgIGtpbmQ6IExFR0FDWV9QUk9DRVNTRURfQ1JFREVOVElBTFNfS0lORCxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjc3JmVG9rZW4sXG4gICAgICAgICAgICAgICAgcHJvdmlkZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0aWF0ZUF1dG9BdXRoZW50aWNhdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXJ0Q29uZmlnLnVzZVBvcHVwRm9yTG9naW4gJiYgdGhpcy5hdXRvTG9naW5BY3RpdmUpIHtcbiAgICAgICAgICAgIGxldCBvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPHtyZWRpcmVjdFVybDogc3RyaW5nfT47XG4gICAgICAgICAgICBpZiAodGhpcy5zdGFydENvbmZpZy5hdXRvT0F1dGhQcm92aWRlcikge1xuICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHBDbGllbnQucG9zdDx7cmVkaXJlY3RVcmw6IHN0cmluZ30+KHRoaXMubWFrZVVybChcInNlY3VyaXR5Lm9hdXRoXCIpLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IFwiZ2V0Y29kZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXI6IHRoaXMuc3RhcnRDb25maWcuYXV0b09BdXRoUHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbkluQ29va2llOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxVcmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogdGhpcy5tYWtlUGFyYW1zKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1VzZXJPdmVycmlkZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0F1dG9BdXRoZW50aWNhdGlvbjogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlID0gdGhpcy5odHRwQ2xpZW50LnBvc3Q8e3JlZGlyZWN0VXJsOiBzdHJpbmd9Pih0aGlzLm1ha2VVcmwoXCJzZWN1cml0eS5zYW1sXCIpLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IFwiZ2V0cmVzcG9uc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyOiB0aGlzLnN0YXJ0Q29uZmlnLmF1dG9TQU1MUHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbkluQ29va2llOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxVcmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHRoaXMubWFrZVBhcmFtcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Vc2VyT3ZlcnJpZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9BdXRvQXV0aGVudGljYXRpb246IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHJlc3BvbnNlLnJlZGlyZWN0VXJsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWF0ZSB0aGUgYXV0by1hdXRoZW50aWNhdGlvbiBwcm9jZXNzIGlmIGFuIGF1dG9tYXRpYyBPQXV0aCBvciBTQU1MIHByb3ZpZGVyIGlzIGNvbmZpZ3VyZWQuXG4gICAgICogVGhlIHtATG9naW5TZXJ2aWNlfSBjYWxscyB0aGlzIG1ldGhvZCBhdCBzdGFydHVwLiBGaXJzdCwgYW4gYXR0ZW1wdCBpcyBtYWRlIHRvIHJldHJpZXZlIGEgQ1NSRiB0b2tlbi5cbiAgICAgKiBJZiB0aGF0IHdvcmtzLCB0aGVuIHRoZSB0b2tlbiBpcyBzZXQgYW5kIGF1dGhlbnRpY2F0aW9uIGlzIGNvbXBsZXRlLiBPdGhlcndpc2UsIHRoZSBpbml0aWFsIE9BdXRoIG9yIFNBTUxcbiAgICAgKiBjYWxsIGlzIG1hZGUgdG8gdGhlIFNpbmVxdWEgc2VydmVyLiBUaGUgYHJlZGlyZWN0VXJsYCBpbiB0aGUgcmVzcG9uc2UgdG8gdGhpcyBjYWxsIGlzIHRoZW4gdXNlZCB0byByZWRpcmVjdFxuICAgICAqIHRoZSBicm93c2VyIHRvIGNvbnRpbnVlIHRoZSBub3JtYWwgT0F1dGgvU0FNTCBhdXRlbnRpY2F0aW9uIGZsb3cuIEEgc3VjY2Vzc2Z1bCBhdXRoZW50aWN0aW9uIHdpbGwgY3VsbWluYXRlXG4gICAgICogaW4gdGhlIFNCQSBiZWluZyBsb2FkZWQgYSBzZWNvbmQgdGltZSwgdGhpcyBtZXRob2QgYmVpbmcgY2FsbGVkIGFnYWluIGFuZCB0aGUgYXR0ZW1wdCB0byByZXRyaWV2ZSBhIENTUkZcbiAgICAgKiB0b2tlbiBzdWNjZWVkaW5nIGJlY2F1c2UgYSB2YWxpZCBKV1QgY29va2llIHdpbGwgbm93IGJlIHByZXNlbnQuXG4gICAgICpcbiAgICAgKiBBIENTUkYgdG9rZW4gaXMgYWx3YXlzIHJlcXVlc3RlZCB0byBhbGxvdyBhdXRvbWF0aWMgbG9naW4gaWYgYSB2YWxpZCB3ZWIgdG9rZW4gY29va2llIGhhcyBwcmV2aW91c2x5IGJlZW5cbiAgICAgKiB3cml0dGVuIHZpYSwgZm9yIGV4YW1wbGUsIGEgbG9naW4gdG8gdGhlIGFkbWluIGNvbnNvbGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBbiBPYnNlcnZhYmxlIG9mIGEgYm9vbGVhbiB2YWx1ZSB3aGljaCBpZiBgdHJ1ZWAgaW5kaWNhdGVzIHRoYXQgYXV0by1hdXRoZW50aWNhdGlvbiBoYXMgYmVlbiBpbml0aWF0ZWQuXG4gICAgICovXG4gICAgYXV0b0F1dGhlbnRpY2F0ZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5TZXJ2aWNlLmdldENzcmZUb2tlbigpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGNzcmZUb2tlbikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFRva2VuIGNhbiBiZSBlbXB0eSBhcyBnZXRDc3JmVG9rZW4gc3VwcHJlc3NlcyBhcHBsaWNhdGlvbiBlcnJvcnMgKG5vIGNvb2tpZSBvciBjb29raWUgaW52YWxpZClcbiAgICAgICAgICAgICAgICAvLyAoV2UgZG8gdGhpcyB0byBhdm9pZCBoYXZpbmcgZXJyb3JzIGluIHRoZSBjb25zb2xlIGZvciBub3JtYWwgc2l0dWF0aW9ucy4pXG4gICAgICAgICAgICAgICAgaWYgKGNzcmZUb2tlbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENzcmZUb2tlbihjc3JmVG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRpYXRlQXV0b0F1dGhlbnRpY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBXZSBzaG91bGQgcmFyZWx5IGhhdmUgYW4gZXJyb3Igbm93IGFzIGdldENzcmZUb2tlblxuICAgICAgICAgICAgICAgIC8vIHN1cHByZXNzZXMgdGhlIGFwcGxpY2F0aW9uLWxldmVsIG9uZXNcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbml0aWF0ZUF1dG9BdXRoZW50aWNhdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gU3dhbGxvdyB0aGUgZXJyb3IgYW5kIGNvbnRpbnVlIHdpdGggbm9uLWF1dG8gbG9naW4gcHJvY2Vzc1xuICAgICAgICAgICAgICAgIHJldHVybiBvZihmYWxzZSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxufVxuIl19