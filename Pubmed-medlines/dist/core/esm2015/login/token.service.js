import { Injectable, Inject } from "@angular/core";
import { START_CONFIG, HttpService } from "@sinequa/core/web-services";
import { map } from "rxjs/operators";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/web-services";
/**
 * A service to manage JWT and CSRF tokens. The methods of this service
 * can be called before the authentication process has completed
 */
export class TokenService extends HttpService {
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
TokenService.ɵfac = function TokenService_Factory(t) { return new (t || TokenService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.SqHttpClient)); };
TokenService.ɵprov = i0.ɵɵdefineInjectable({ token: TokenService, factory: TokenService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(TokenService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.SqHttpClient }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2xvZ2luLyIsInNvdXJjZXMiOlsidG9rZW4uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUMsWUFBWSxFQUE2QixXQUFXLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUVoRyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7OztBQUVuQzs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sWUFBYSxTQUFRLFdBQVc7SUFFekMsWUFDMEIsV0FBd0IsRUFDdEMsVUFBd0I7UUFDaEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRFgsZUFBVSxHQUFWLFVBQVUsQ0FBYztJQUVwQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsWUFBWSxDQUFDLE1BQU0sR0FBRyxLQUFLO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQXNCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDdkUsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ3BCLE1BQU0sRUFBRSxjQUFjO2dCQUN0QixjQUFjLEVBQUUsQ0FBQyxNQUFNO2dCQUN2QixjQUFjLEVBQUUsSUFBSTtnQkFDcEIsb0JBQW9CLEVBQUUsSUFBSTtnQkFDMUIsUUFBUSxFQUFFLENBQUMsTUFBTTthQUNwQixDQUFDO1NBQ0wsQ0FBQyxDQUFDLElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNWLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVEOzs7T0FHRztJQUNILG9CQUFvQjtRQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDeEQsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ3BCLE1BQU0sRUFBRSxzQkFBc0I7Z0JBQzlCLGNBQWMsRUFBRSxJQUFJO2dCQUNwQixvQkFBb0IsRUFBRSxJQUFJO2FBQzdCLENBQUM7U0FDTCxDQUFDLENBQUM7SUFDUCxDQUFDOzt3RUExQ1EsWUFBWSxjQUdULFlBQVk7b0RBSGYsWUFBWSxXQUFaLFlBQVksbUJBRlQsTUFBTTtrREFFVCxZQUFZO2NBSHhCLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7c0JBSVEsTUFBTTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1NUQVJUX0NPTkZJRywgU3RhcnRDb25maWcsIFNxSHR0cENsaWVudCwgSHR0cFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHttYXB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuXG4vKipcbiAqIEEgc2VydmljZSB0byBtYW5hZ2UgSldUIGFuZCBDU1JGIHRva2Vucy4gVGhlIG1ldGhvZHMgb2YgdGhpcyBzZXJ2aWNlXG4gKiBjYW4gYmUgY2FsbGVkIGJlZm9yZSB0aGUgYXV0aGVudGljYXRpb24gcHJvY2VzcyBoYXMgY29tcGxldGVkXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBUb2tlblNlcnZpY2UgZXh0ZW5kcyBIdHRwU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChTVEFSVF9DT05GSUcpIHN0YXJ0Q29uZmlnOiBTdGFydENvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBTcUh0dHBDbGllbnQpIHtcbiAgICAgICAgc3VwZXIoc3RhcnRDb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIHRoZSBDU1JGIHRva2VuIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGN1cnJlbnQgSldUIGNvb2tpZVxuICAgICAqIHdoaWNoIHNob3VsZCBhY2NvbXBhbnkgdGhlIHJlcXVlc3QuIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBieVxuICAgICAqIFtBdXRoZW50aWNhdGlvblNlcnZpY2UuYXV0b0F1dGhlbnRpY2F0ZV17QGxpbmsgQXV0aGVudGljYXRpb25TZXJ2aWNlI2F1dG9BdXRoZW50aWNhdGV9XG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm90aWZ5IGB0cnVlYCBpZiBhbnkgZXJyb3JzIHNob3VsZCBiZSBub3RpZmllZCB1c2luZyB0aGUge0BOb3RpZmljYXRpb25TZXJ2aWNlfVxuICAgICAqL1xuICAgIGdldENzcmZUb2tlbihub3RpZnkgPSBmYWxzZSk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0PHtjc3JmVG9rZW46IHN0cmluZ30+KHRoaXMubWFrZVVybChcImNoYWxsZW5nZVwiKSwge1xuICAgICAgICAgICAgcGFyYW1zOiB0aGlzLm1ha2VQYXJhbXMoe1xuICAgICAgICAgICAgICAgIGFjdGlvbjogXCJnZXRDc3JmVG9rZW5cIixcbiAgICAgICAgICAgICAgICBzdXBwcmVzc0Vycm9yczogIW5vdGlmeSxcbiAgICAgICAgICAgICAgICBub1VzZXJPdmVycmlkZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBub0F1dG9BdXRoZW50aWNhdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBub05vdGlmeTogIW5vdGlmeVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgIG1hcCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUuY3NyZlRva2VuO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSB0aGUgY3VycmVudCBKV1QgY29va2llLlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBieSBbQXV0aGVudGljYXRpb25TZXJ2aWNlLmxvZ291dF17QGxpbmsgQXV0aGVudGljYXRpb25TZXJ2aWNlI2xvZ291dH1cbiAgICAgKi9cbiAgICBkZWxldGVXZWJUb2tlbkNvb2tpZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5nZXQ8dm9pZD4odGhpcy5tYWtlVXJsKFwiY2hhbGxlbmdlXCIpLCB7XG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMubWFrZVBhcmFtcyh7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiBcImRlbGV0ZVdlYlRva2VuQ29va2llXCIsXG4gICAgICAgICAgICAgICAgbm9Vc2VyT3ZlcnJpZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgbm9BdXRvQXV0aGVudGljYXRpb246IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==