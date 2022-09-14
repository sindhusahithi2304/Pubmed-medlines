import { InjectionToken } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { StartConfig } from "@sinequa/core/web-services";
import { NotificationsService } from "@sinequa/core/notification";
import { LoginService } from "./login.service";
import { AuthenticationService } from "./authentication.service";
import * as i0 from "@angular/core";
export declare type HttpRequestInitializer = (request: HttpRequest<any>) => boolean;
export declare const HTTP_REQUEST_INITIALIZERS: InjectionToken<HttpRequestInitializer[]>;
/**
 * An `HttpInterceptor` to handle `HTTP 401 unauthorized` error responses by calling
 * [LoginService.getCredentials]{@link LoginService#getCredentials}. It also handles
 * the `sinequa-jwt-refresh` header set when auto refreshing of JWT is configured in
 * the Sinequa administration console.
 */
export declare class LoginInterceptor implements HttpInterceptor {
    private startConfig;
    private requestInitializers;
    private notificationsService;
    private loginService;
    private authService;
    constructor(startConfig: StartConfig, requestInitializers: HttpRequestInitializer[], notificationsService: NotificationsService, loginService: LoginService, authService: AuthenticationService);
    private processRequestInitializers;
    private isJsonable;
    private shouldIntercept;
    private notifyError;
    private getCredentials;
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
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    private handle401Error;
    static ɵfac: i0.ɵɵFactoryDef<LoginInterceptor, [null, { optional: true; }, null, null, null]>;
    static ɵprov: i0.ɵɵInjectableDef<LoginInterceptor>;
}
//# sourceMappingURL=login.interceptor.d.ts.map