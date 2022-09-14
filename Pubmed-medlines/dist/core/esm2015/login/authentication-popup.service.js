import { Injectable, Inject } from "@angular/core";
import { flatMap } from "rxjs/operators";
import { PopupService } from "ng2-ui-auth";
import { START_CONFIG } from "@sinequa/core/web-services";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
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
export class AuthenticationPopupService extends PopupService {
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
AuthenticationPopupService.ɵfac = function AuthenticationPopupService_Factory(t) { return new (t || AuthenticationPopupService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.HttpClient)); };
AuthenticationPopupService.ɵprov = i0.ɵɵdefineInjectable({ token: AuthenticationPopupService, factory: AuthenticationPopupService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AuthenticationPopupService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.HttpClient }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24tcG9wdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2xvZ2luLyIsInNvdXJjZXMiOlsiYXV0aGVudGljYXRpb24tcG9wdXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUdqRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFjLE1BQU0sNEJBQTRCLENBQUM7QUFDckUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7QUFFekM7Ozs7Ozs7Ozs7R0FVRztBQUlILE1BQU0sT0FBTywwQkFBMkIsU0FBUSxZQUFZO0lBQ3hELFlBQ29DLFdBQXdCLEVBQzlDLFVBQXNCO1FBQ2hDLEtBQUssRUFBRSxDQUFDO1FBRndCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQzlDLGVBQVUsR0FBVixVQUFVLENBQVk7SUFFcEMsQ0FBQztJQUVELElBQUksQ0FBQyxHQUFXLEVBQUUsT0FBWSxDQUFBLG1DQUFtQyxFQUFFLE9BQTRCO1FBQzNGLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFRLENBQUMsRUFBRTtZQUNsRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUF3QixHQUFHLEVBQUU7Z0JBQ25ELE1BQU0sRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDO29CQUN6QixjQUFjLEVBQUUsSUFBSTtvQkFDcEIsb0JBQW9CLEVBQUUsSUFBSTtvQkFDMUIsYUFBYSxFQUFFLElBQUk7b0JBQ25CLFlBQVksRUFBRSxJQUFJO2lCQUNyQixDQUFDO2FBQ0wsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDcEIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDUDtRQUNELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7O29HQXJCUSwwQkFBMEIsY0FFdkIsWUFBWTtrRUFGZiwwQkFBMEIsV0FBMUIsMEJBQTBCLG1CQUZ2QixNQUFNO2tEQUVULDBCQUEwQjtjQUh0QyxVQUFVO2VBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7O3NCQUdRLE1BQU07dUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7ZmxhdE1hcH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQge1BvcHVwU2VydmljZX0gZnJvbSBcIm5nMi11aS1hdXRoXCI7XG5pbXBvcnQge1NUQVJUX0NPTkZJRywgU3RhcnRDb25maWd9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuXG4vKipcbiAqIE92ZXJyaWRlIG5nMi11aS1hdXRoJ3MgcG9wdXAgaGFuZGxpbmcgYXMgaXQgZG9lc24ndCB3b3JrIHdpdGggU0FNTCArIElFMTEgYmVjYXVzZVxuICogb2YgYSBkb3VibGUgcmVkaXJlY3Rpb24uXG4gKiBUaGUgaW5pdGlhbCByZXF1ZXN0IGlzIHRvIFNpbmVxdWEgd2hpY2ggcmVkaXJlY3RzIHRvIHRoZSBhdXRoZW50aWNhdGlvbiBwcm92aWRlci5cbiAqIE9uIHN1Y2Nlc3NmdWwgYXV0aGVudGljYXRpb24sIHRoZSBhdXRoZW50aWNhdGlvbiBwcm92aWRlciByZWRpcmVjdHMgYmFja1xuICogdG8gU2luZXF1YSB0byBwZXJmb3JtIHRoZSBsb2dpbi5cbiAqIEluIElFIHRoZSBpbml0aWFsIHJlZGlyZWN0aW9uIGNhdXNlcyB0aGUgcG9wdXAgd2luZG93IHRvIGJlIHJlcG9ydGVkIGFzIFwiY2xvc2VkXCJcbiAqIHdoaWNoIGJyZWFrcyB0aGUgcHJvY2Vzcy5cbiAqIFNvLCBvdmVycmlkZSBuZzItdWktYXV0aCdzIFBvcHVwU2VydmljZSBhbmQgZG8gdGhlIGluaXRhbCByZXF1ZXN0IHRvIGdldCB0aGVcbiAqIHJlZGlyZWN0IHVybCBvdXRzaWRlIG9mIHRoZSBwb3B1cFxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogXCJyb290XCJcbn0pXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRpb25Qb3B1cFNlcnZpY2UgZXh0ZW5kcyBQb3B1cFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KFNUQVJUX0NPTkZJRykgcHJvdGVjdGVkIHN0YXJ0Q29uZmlnOiBTdGFydENvbmZpZyxcbiAgICAgICAgcHJvdGVjdGVkIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBvcGVuKHVybDogc3RyaW5nLCBvcHRpb25zOiBhbnkvKklPYXV0aDJPcHRpb25zIHwgSU9hdXRoMU9wdGlvbnMqLywgY29yZG92YTogYm9vbGVhbiB8IHVuZGVmaW5lZCk6IE9ic2VydmFibGU8V2luZG93PiB7XG4gICAgICAgIGlmIChVdGlscy5zdGFydHNXaXRoKHVybCwgdGhpcy5zdGFydENvbmZpZy5hcGlQYXRoISkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0PHtyZWRpcmVjdFVybDogc3RyaW5nfT4odXJsLCB7XG4gICAgICAgICAgICAgICAgcGFyYW1zOiBVdGlscy5tYWtlSHR0cFBhcmFtcyh7XG4gICAgICAgICAgICAgICAgICAgIG5vVXNlck92ZXJyaWRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBub0F1dG9BdXRoZW50aWNhdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5JbkNvb2tpZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbG9naW5JblBvcHVwOiB0cnVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pLnBpcGUoZmxhdE1hcCgocmV0KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm9wZW4ocmV0LnJlZGlyZWN0VXJsLCBvcHRpb25zLCBjb3Jkb3ZhKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwZXIub3Blbih1cmwsIG9wdGlvbnMsIGNvcmRvdmEpO1xuICAgIH1cbn1cbiJdfQ==