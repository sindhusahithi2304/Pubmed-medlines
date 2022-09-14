import { HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "ng2-ui-auth";
import { HttpService, StartConfig, AuditWebService } from "@sinequa/core/web-services";
import { SqHttpClient } from "@sinequa/core/web-services";
import { TokenService } from "./token.service";
import { JWTService } from "./jwt.service";
import * as i0 from "@angular/core";
/**
 * Describes the credentials that a user would enter manually to authenticate
 */
export interface Credentials {
    userName?: string;
    password?: string;
}
/**
 * Describes the object created after successful authentication. The form of this object
 * is designed to maintain compatibility with previous SBA libraries
 */
export interface ProcessedCredentials {
    /**
     * An unused "kind" value - always set to 0
     */
    kind: number;
    /**
     * The user name of the authenticated user
     */
    userName?: string;
    /**
     * Additional data containing the associated CSRF token that is sent with
     * authenticated web service requests and the provider for informational
     * purposes only. The provider will be `Sinequa` for form-based authentication
     * and the name of the auto-login provider in the Sinequa configuration for
     * OAuth and SAML authentication
     */
    data: {
        csrfToken: string;
        provider: string;
    };
}
/**
 * Describes the object used by an administrator to authenticate as another user
 */
export interface UserOverride {
    /**
     * The user name of the user to authenticate as
     */
    userName: string;
    /**
     * The Sinequa domain name containing the user
     */
    domain: string;
}
/**
 * Describes a JWT object
 */
export interface JsonWebToken {
    header: {
        typ: string;
        alg: string;
    };
    payload: {
        iss: string;
        iat: string;
        exp: string;
        sub: string;
        hash: string;
    };
    signature: string;
}
/**
 * A service to authenticate a user with a Sinequa server. Authentication can be automatic (OAuth/SAML), if configured in the
 * Sinequa administration, or manual where the user name and password are entered in a modal dialog box and transmitted in
 * clear text. There is also support for the ng2-ui-auth library where the authentication process occurs in a browser popup window.
 * Successful authentication results in a JWT stored in cookie along with a CSRF token which is stored in storage so it can
 * be picked up in other browser tabs.
 *
 * The service also holds information on the status of the "override user" administrator function
 */
export declare class AuthenticationService extends HttpService {
    private httpClient;
    private tokenService;
    private auditService;
    private jWTService;
    private authService;
    private authentication;
    private storage;
    /**
     * A flag indicating whether an attempt to "override user" has failed. This is normally
     * only set by the {@link HttpInterceptor} and tested and reset in {@link LoginService}
     */
    userOverrideFailed: boolean;
    constructor(startConfig: StartConfig, httpClient: SqHttpClient, tokenService: TokenService, auditService: AuditWebService, jWTService: JWTService, authService: AuthService);
    private _userOverride;
    /**
     * Get the currrent user override, if any
     */
    get userOverride(): UserOverride | undefined;
    /**
     * Set/unset the user override. The {@link #userOverrideActive} flag
     * is set accordingly
     */
    set userOverride(value: UserOverride | undefined);
    private _userOverrideActive;
    /**
     * A flag indicating whether the current user override is active
     */
    get userOverrideActive(): boolean;
    private _processedCredentials;
    private _processedCredentialsStr;
    /**
     * Get the current processed credentials
     */
    get processedCredentials(): ProcessedCredentials | undefined;
    /**
     * Set the current processed credentials. A stringified version
     * is stored in either local or session storage
     */
    set processedCredentials(value: ProcessedCredentials | undefined);
    /**
     * Returns `true` if an OAuth or SAML auto provider is configured
     */
    get autoLoginActive(): boolean;
    /**
     * Deactivate the current user override
     */
    deactivateUserOverride(): void;
    private loadCredentials;
    private saveCredentials;
    private init;
    /**
     * Return `true` if `processedCredentials` exists
     */
    get haveCredentials(): boolean;
    /**
     * Add the current authentication information to the passed `HttpHeaders` and `HttpParams`.
     * Currently, this adds the `sinequa-csrf-token` value to the HTTP headers. Called from
     * {@link HttpInterceptor}
     *
     * @param config HttpHeaders and HttpParams to be updated
     *
     * @returns new configuration
     */
    addAuthentication(config: {
        headers: HttpHeaders;
        params: HttpParams;
    }): {
        headers: HttpHeaders;
        params: HttpParams;
    };
    /**
     * Update the current authentication information with information in the passed `response`.
     * This processes the `sinequa-jwt-refresh` header which will contain an updated CSRF token
     * to correspond to the new JWT cookie. Called from {@link HttpInterceptor}
     *
     * @param response An `HttpResponse`
     */
    updateAuthentication(response: HttpResponse<any>): void;
    private refreshAuthentication;
    private doAuthentication;
    private getAuthenticateHeader;
    /**
     * Authenticate with the Sinequa server using the passed credentials. The credentials are sent
     * in clear text. Prior to the authentication the passed `response` is checked for a
     * `WWW-Authenticate: Bearer` header.
     *
     * @param credentials The credentials to authenticate with
     * @param response The error response the reception of which initiated the call to this method
     */
    authenticate(credentials: Credentials, response: HttpErrorResponse): Promise<ProcessedCredentials | undefined>;
    /**
     * Remove all current authentication data. The JWT cookie
     * is removed
     */
    logout(): void;
    /**
     * Add the current user override information to the passed headers.
     *
     * @param config An object containing the `HttpHeaders` to update
     */
    addUserOverride(config: {
        headers: HttpHeaders;
    }): HttpHeaders;
    /**
     * Initiate authentication using the ng2-ui-auth library. The authentication process will be performed
     * in a browser popup window
     *
     * @param provider The name of the provider to use. This is the name configured in the Sinequa administration
     * console
     */
    authenticateWithProvider(provider: string): Observable<any>;
    private setCsrfToken;
    private initiateAutoAuthentication;
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
    autoAuthenticate(): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDef<AuthenticationService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AuthenticationService>;
}
//# sourceMappingURL=authentication.service.d.ts.map