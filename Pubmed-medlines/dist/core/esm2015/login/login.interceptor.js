import { Injectable, Inject, InjectionToken, Optional } from "@angular/core";
import { HttpErrorResponse, HttpParams, HttpResponse } from "@angular/common/http";
import { from, throwError } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { Utils, SqError, SqErrorCode } from "@sinequa/core/base";
import { START_CONFIG } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/notification";
import * as i2 from "./login.service";
import * as i3 from "./authentication.service";
export const HTTP_REQUEST_INITIALIZERS = new InjectionToken("HTTP_REQUEST_INITIALIZERS");
/**
 * An `HttpInterceptor` to handle `HTTP 401 unauthorized` error responses by calling
 * [LoginService.getCredentials]{@link LoginService#getCredentials}. It also handles
 * the `sinequa-jwt-refresh` header set when auto refreshing of JWT is configured in
 * the Sinequa administration console.
 */
export class LoginInterceptor {
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
LoginInterceptor.ɵfac = function LoginInterceptor_Factory(t) { return new (t || LoginInterceptor)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(HTTP_REQUEST_INITIALIZERS, 8), i0.ɵɵinject(i1.NotificationsService), i0.ɵɵinject(i2.LoginService), i0.ɵɵinject(i3.AuthenticationService)); };
LoginInterceptor.ɵprov = i0.ɵɵdefineInjectable({ token: LoginInterceptor, factory: LoginInterceptor.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LoginInterceptor, [{
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
            }] }, { type: i1.NotificationsService }, { type: i2.LoginService }, { type: i3.AuthenticationService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9sb2dpbi8iLCJzb3VyY2VzIjpbImxvZ2luLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUVRLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQ3pELE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFDLElBQUksRUFBYyxVQUFVLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbEQsT0FBTyxFQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUQsT0FBTyxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDL0QsT0FBTyxFQUFDLFlBQVksRUFBYyxNQUFNLDRCQUE0QixDQUFDOzs7OztBQU1yRSxNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FBRyxJQUFJLGNBQWMsQ0FBMkIsMkJBQTJCLENBQUMsQ0FBQztBQUluSDs7Ozs7R0FLRztBQUlILE1BQU0sT0FBTyxnQkFBZ0I7SUFFekIsWUFDa0MsV0FBd0IsRUFDQyxtQkFBNkMsRUFDNUYsb0JBQTBDLEVBQzFDLFlBQTBCLEVBQzFCLFdBQWtDO1FBSlosZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQTBCO1FBQzVGLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsZ0JBQVcsR0FBWCxXQUFXLENBQXVCO0lBQUcsQ0FBQztJQUUxQywwQkFBMEIsQ0FBQyxPQUF5QjtRQUN4RCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUMxQixLQUFL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RyxJQUFJLENBQUM7b0JBQzNDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztpQkFDcEU7Z0JBQ0QsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDMUI7WUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDekQsSUFBSSxDQUNELFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDZCxNQUFNLEVBQUMsT0FBTyxFQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDMUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDLEVBQ0YsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2IsdUZBQXVGO1lBQ3ZGLEdBQUcsWUFBWSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQzlELENBQUMsQ0FBQztTQUNkO1FBRUQsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7Z0ZBOUxRLGdCQUFnQixjQUdiLFlBQVksZUFDQSx5QkFBeUI7d0RBSnhDLGdCQUFnQixXQUFoQixnQkFBZ0IsbUJBRmIsTUFBTTtrREFFVCxnQkFBZ0I7Y0FINUIsVUFBVTtlQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOztzQkFJUSxNQUFNO3VCQUFDLFlBQVk7O3NCQUNuQixRQUFROztzQkFBSSxNQUFNO3VCQUFDLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgT3B0aW9uYWx9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICAgIEh0dHBJbnRlcmNlcHRvciwgSHR0cFJlcXVlc3QsIEh0dHBIYW5kbGVyLFxuICAgIEh0dHBFdmVudCwgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBQYXJhbXMsIEh0dHBSZXNwb25zZVxufSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7ZnJvbSwgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvcn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7Y2F0Y2hFcnJvciwgbWFwLCBzd2l0Y2hNYXB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHtVdGlscywgU3FFcnJvciwgU3FFcnJvckNvZGV9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7U1RBUlRfQ09ORklHLCBTdGFydENvbmZpZ30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge05vdGlmaWNhdGlvbnNTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9ub3RpZmljYXRpb25cIjtcbmltcG9ydCB7TG9naW5TZXJ2aWNlfSBmcm9tIFwiLi9sb2dpbi5zZXJ2aWNlXCI7XG5pbXBvcnQge0F1dGhlbnRpY2F0aW9uU2VydmljZX0gZnJvbSBcIi4vYXV0aGVudGljYXRpb24uc2VydmljZVwiO1xuXG5leHBvcnQgdHlwZSBIdHRwUmVxdWVzdEluaXRpYWxpemVyID0gKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4pID0+IGJvb2xlYW47XG5leHBvcnQgY29uc3QgSFRUUF9SRVFVRVNUX0lOSVRJQUxJWkVSUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxIdHRwUmVxdWVzdEluaXRpYWxpemVyW10+KFwiSFRUUF9SRVFVRVNUX0lOSVRJQUxJWkVSU1wiKTtcblxudHlwZSBPcHRpb25zID0ge25vQXV0b0F1dGhlbnRpY2F0aW9uOiBib29sZWFuLCBub1VzZXJPdmVycmlkZTogYm9vbGVhbiwgaGFkQ3JlZGVudGlhbHM6IGJvb2xlYW4sIHVzZXJPdmVycmlkZUFjdGl2ZTogYm9vbGVhbn07XG5cbi8qKlxuICogQW4gYEh0dHBJbnRlcmNlcHRvcmAgdG8gaGFuZGxlIGBIVFRQIDQwMSB1bmF1dGhvcml6ZWRgIGVycm9yIHJlc3BvbnNlcyBieSBjYWxsaW5nXG4gKiBbTG9naW5TZXJ2aWNlLmdldENyZWRlbnRpYWxzXXtAbGluayBMb2dpblNlcnZpY2UjZ2V0Q3JlZGVudGlhbHN9LiBJdCBhbHNvIGhhbmRsZXNcbiAqIHRoZSBgc2luZXF1YS1qd3QtcmVmcmVzaGAgaGVhZGVyIHNldCB3aGVuIGF1dG8gcmVmcmVzaGluZyBvZiBKV1QgaXMgY29uZmlndXJlZCBpblxuICogdGhlIFNpbmVxdWEgYWRtaW5pc3RyYXRpb24gY29uc29sZS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46IFwicm9vdFwiXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoU1RBUlRfQ09ORklHKSBwcml2YXRlIHN0YXJ0Q29uZmlnOiBTdGFydENvbmZpZyxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChIVFRQX1JFUVVFU1RfSU5JVElBTElaRVJTKSBwcml2YXRlIHJlcXVlc3RJbml0aWFsaXplcnM6IEh0dHBSZXF1ZXN0SW5pdGlhbGl6ZXJbXSxcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25zU2VydmljZTogTm90aWZpY2F0aW9uc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbG9naW5TZXJ2aWNlOiBMb2dpblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSkge31cblxuICAgIHByaXZhdGUgcHJvY2Vzc1JlcXVlc3RJbml0aWFsaXplcnMocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pikge1xuICAgICAgICBpZiAodGhpcy5yZXF1ZXN0SW5pdGlhbGl6ZXJzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJlcXVlc3RJbml0aWFsaXplciBvZiB0aGlzLnJlcXVlc3RJbml0aWFsaXplcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlcXVlc3RJbml0aWFsaXplcihyZXF1ZXN0KSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGlzSnNvbmFibGUob2JqKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoVXRpbHMuaXNPYmplY3Qob2JqKSB8fCBVdGlscy5pc0FycmF5KG9iaikpICYmICFVdGlscy5pc0FycmF5QnVmZmVyKG9iaikgJiYgIVV0aWxzLmlzQmxvYihvYmopICYmXG4gICAgICAgICAgICAhVXRpbHMuaXNTdHJpbmcob2JqKSAmJiAhKG9iaiBpbnN0YW5jZW9mIEh0dHBQYXJhbXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvdWxkSW50ZXJjZXB0KHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBVdGlscy5zdGFydHNXaXRoKHVybCwgdGhpcy5zdGFydENvbmZpZy5hcGlQYXRoISk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBub3RpZnlFcnJvcihlcnJvcjogYW55KSB7XG4gICAgICAgIGxldCBtZXNzYWdlO1xuICAgICAgICBjb25zdCB0aXRsZSA9IFwibXNnI2Vycm9yLnNlcnZlckVycm9yXCI7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGVycm9yO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmVycm9yO1xuICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc1N0cmluZyhkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBkYXRhLmVycm9yTWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZXJyb3JDb2RlVGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IGAke21lc3NhZ2V9ICgke2RhdGEuZXJyb3JDb2RlVGV4dH0pYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLmVycm9yQ29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IGAke21lc3NhZ2V9ICgke2RhdGEuZXJyb3JDb2RlfSlgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIm1zZyNlcnJvci5yZXNwb25zZUxvYWRGYWlsdXJlXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1c1RleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IGAke3Jlc3BvbnNlLnN0YXR1c1RleHR9ICgke3Jlc3BvbnNlLnN0YXR1c30pYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBgSFRUUCBlcnJvcjogJHtyZXNwb25zZS5zdGF0dXN9YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoU3FFcnJvci5pcyhlcnJvcikpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbWVzc2FnZSA9IChlcnJvciArIFwiXCIpIHx8IFwibXNnI2Vycm9yLnVua25vd25FcnJvclwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uc1NlcnZpY2UuZXJyb3IobWVzc2FnZSwgdW5kZWZpbmVkLCB0aXRsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDcmVkZW50aWFscyhyZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UsIGFjY2VwdEN1cnJlbnQ6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9naW5TZXJ2aWNlLmdldENyZWRlbnRpYWxzKHJlc3BvbnNlLCBhY2NlcHRDdXJyZW50KVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChTcUVycm9yLmlzKGVycm9yLCBTcUVycm9yQ29kZS5wcm9jZXNzZWRDcmVkZW50aWFsc0Vycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDcmVkZW50aWFscyhyZXNwb25zZSwgYWNjZXB0Q3VycmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBgSFRUUCA0MDEgdW5hdXRob3JpemVkIGVycm9ycyByZXNwb25zZXMgYnkgY2FsbGluZ1xuICAgICAqIFtMb2dpblNlcnZpY2UuZ2V0Q3JlZGVudGlhbHNde0BsaW5rIExvZ2luU2VydmljZSNnZXRDcmVkZW50aWFsc30uIEl0IGFsc28gaGFuZGxlcyBhdXRvXG4gICAgICogcmVmcmVzaGluZyBvZiBKV1QgYnkgcHJvY2Vzc2luZyB0aGUgYHNpbmVxdWEtand0LXJlZnJlc2hgIGhlYWRlci4gVGhlIEpXVCBjb29raWUgaXRzZWxmXG4gICAgICogaXMgdXBkYXRlZCBieSBhIGBTZXQtQ29va2llYCBoZWFkZXIgaW4gdGhlIHJlc3BvbnNlLiBUaGVyZSBhcmUgYSBudW1iZXIgb2YgZmxhZ3MgdGhhdFxuICAgICAqIGNhbiBiZSBzZXQgaW4gdGhlIHJlcXVlc3QgcGFyYW1ldGVycyB3aGljaCB3aWxsIGJlIHJlbW92ZWQgYmVmb3JlIHRoZSByZXF1ZXN0IGlzIGFjdHVhbGx5XG4gICAgICogc2VudDpcbiAgICAgKiAqIGBub0F1dG9BdXRoZW50aWNhdGlvbmAgLSBzZXQgdG8gYnlwYXNzIHRoZSBgSFRUUCA0MDFgIGhhbmRsaW5nXG4gICAgICogKiBgbm9Vc2VyT3ZlcnJpZGVgIC0gc2V0IHRvIG5vdCBhZGQgdGhlIGN1cnJlbnQgdXNlciBvdmVycmlkZSB0byB0aGUgcmVxdWVzdFxuICAgICAqICogYG5vTm90aWZ5YCAtIHNldCB0byBub3Qgbm90aWZ5IGVycm9ycyB1c2luZyB0aGUge0BsaW5rIE5vdGlmaWNhdGlvblNlcnZpY2V9XG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVxdWVzdCBUaGUgaW50ZXJjZXB0ZWQgcmVxdWVzdFxuICAgICAqIEBwYXJhbSBuZXh0IFRoZSBuZXh0IGludGVyY2VwdG9yIGluIHRoZSBjaGFpblxuICAgICAqL1xuICAgIGludGVyY2VwdChyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICAgICAgaWYgKCF0aGlzLnNob3VsZEludGVyY2VwdChyZXF1ZXN0LnVybCkgfHwgcmVxdWVzdC5wYXJhbXMuaGFzKFwibm9JbnRlcmNlcHRcIikpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb25maWcgPSB7aGVhZGVyczogcmVxdWVzdC5oZWFkZXJzLCBwYXJhbXM6IHJlcXVlc3QucGFyYW1zfTtcblxuICAgICAgICBjb25zdCBvcHRpb25zOiBPcHRpb25zID0ge1xuICAgICAgICAgICAgbm9BdXRvQXV0aGVudGljYXRpb246IFV0aWxzLmlzVHJ1ZShjb25maWcucGFyYW1zLmdldChcIm5vQXV0b0F1dGhlbnRpY2F0aW9uXCIpKSB8fCBmYWxzZSxcbiAgICAgICAgICAgIG5vVXNlck92ZXJyaWRlOiBVdGlscy5pc1RydWUoY29uZmlnLnBhcmFtcy5nZXQoXCJub1VzZXJPdmVycmlkZVwiKSkgfHwgZmFsc2UsXG4gICAgICAgICAgICBoYWRDcmVkZW50aWFsczogdGhpcy5hdXRoU2VydmljZS5oYXZlQ3JlZGVudGlhbHMsXG4gICAgICAgICAgICB1c2VyT3ZlcnJpZGVBY3RpdmU6IGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBub05vdGlmeSA9IFV0aWxzLmlzVHJ1ZShjb25maWcucGFyYW1zLmdldChcIm5vTm90aWZ5XCIpKSB8fCBmYWxzZTtcblxuICAgICAgICBjb25maWcucGFyYW1zID0gY29uZmlnLnBhcmFtcy5kZWxldGUoXCJub0F1dG9BdXRoZW50aWNhdGlvblwiKTtcbiAgICAgICAgY29uZmlnLnBhcmFtcyA9IGNvbmZpZy5wYXJhbXMuZGVsZXRlKFwibm9Vc2VyT3ZlcnJpZGVcIik7XG4gICAgICAgIGNvbmZpZy5wYXJhbXMgPSBjb25maWcucGFyYW1zLmRlbGV0ZShcIm5vTm90aWZ5XCIpO1xuXG4gICAgICAgIGNvbmZpZyA9IHRoaXMuYXV0aFNlcnZpY2UuYWRkQXV0aGVudGljYXRpb24oY29uZmlnKTtcblxuICAgICAgICBpZiAodGhpcy5hdXRoU2VydmljZS51c2VyT3ZlcnJpZGVBY3RpdmUgJiYgIW9wdGlvbnMubm9Vc2VyT3ZlcnJpZGUpIHtcbiAgICAgICAgICAgIG9wdGlvbnMudXNlck92ZXJyaWRlQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbmZpZy5oZWFkZXJzID0gdGhpcy5hdXRoU2VydmljZS5hZGRVc2VyT3ZlcnJpZGUoY29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMuc2V0KFwic2luZXF1YS1mb3JjZS1jYW1lbC1jYXNlXCIsIFwidHJ1ZVwiKTtcblxuICAgICAgICBpZiAodGhpcy5pc0pzb25hYmxlKHJlcXVlc3QuYm9keSkpIHtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc1JlcXVlc3RJbml0aWFsaXplcnMocmVxdWVzdCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnNTZXJ2aWNlLmVudGVyKFwibmV0d29ya1wiKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IF9yZXF1ZXN0ID0gcmVxdWVzdC5jbG9uZSh7XG4gICAgICAgICAgICBoZWFkZXJzOiBjb25maWcuaGVhZGVycyxcbiAgICAgICAgICAgIHBhcmFtczogY29uZmlnLnBhcmFtcyxcbiAgICAgICAgICAgIGJvZHk6IHJlcXVlc3QuYm9keSxcbiAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUoX3JlcXVlc3QpLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvciwgY2F1Z2h0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zU2VydmljZS5sZWF2ZShcIm5ldHdvcmtcIik7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChlcnJvci5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDAxOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlNDAxRXJyb3IoZXJyb3IsIF9yZXF1ZXN0LCBuZXh0LCBvcHRpb25zLCBjYXVnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghbm9Ob3RpZnkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnlFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWFwKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnNTZXJ2aWNlLmxlYXZlKFwibmV0d29ya1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRoU2VydmljZS51cGRhdGVBdXRoZW50aWNhdGlvbihldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBldmVudDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGU0MDFFcnJvcihlcnI6IEh0dHBFcnJvclJlc3BvbnNlLCByZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyLCBvcHRpb25zOiBPcHRpb25zLCBjYXVnaHQ6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgICAgICBpZiAoIW9wdGlvbnMubm9BdXRvQXV0aGVudGljYXRpb24pIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnVzZXJPdmVycmlkZUFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dGhTZXJ2aWNlLnVzZXJPdmVycmlkZUFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmRlYWN0aXZhdGVVc2VyT3ZlcnJpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRoU2VydmljZS51c2VyT3ZlcnJpZGVGYWlsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnNTZXJ2aWNlLmVycm9yKFwibXNnI2Vycm9yLnVzZXJPdmVycmlkZUZhaWx1cmVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmcm9tKHRoaXMuZ2V0Q3JlZGVudGlhbHMoZXJyLCAhb3B0aW9ucy5oYWRDcmVkZW50aWFscykpXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaE1hcCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7aGVhZGVyc30gPSB0aGlzLmF1dGhTZXJ2aWNlLmFkZEF1dGhlbnRpY2F0aW9uKHJlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxLmNsb25lKHtoZWFkZXJzfSkpO1xuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2hFcnJvcihlcnIgPT4gXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpbiBjYXNlIG9mIGFuIEh0dHAgZXJyb3IsICdjYXVnaHQnIG11c3QgYmUgcmV0dXJuZWQgdG8gYmUgY2F0Y2hlZCBieSB0aGUgaW50ZXJjZXB0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlID8gY2F1Z2h0IDogdGhyb3dFcnJvcihlcnIpXG4gICAgICAgICAgICAgICAgICAgICkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyKTtcbiAgICB9XG59XG4iXX0=