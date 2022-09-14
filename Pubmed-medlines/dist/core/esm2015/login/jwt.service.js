import { Injectable, Inject } from "@angular/core";
import { START_CONFIG, HttpService } from "@sinequa/core/web-services";
import { map } from "rxjs/operators";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/web-services";
/**
 * A service to retrieve a JWT (JSON Web Token) from the Sinequa server.
 */
export class JWTService extends HttpService {
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
JWTService.ɵfac = function JWTService_Factory(t) { return new (t || JWTService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.SqHttpClient)); };
JWTService.ɵprov = i0.ɵɵdefineInjectable({ token: JWTService, factory: JWTService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(JWTService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.SqHttpClient }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9sb2dpbi8iLCJzb3VyY2VzIjpbImp3dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxZQUFZLEVBQTZCLFdBQVcsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRWhHLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBR25DOztHQUVHO0FBSUgsTUFBTSxPQUFPLFVBQVcsU0FBUSxXQUFXO0lBRXZDLFlBQzBCLFdBQXdCLEVBQ3RDLFVBQXdCO1FBQ2hDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQURYLGVBQVUsR0FBVixVQUFVLENBQWM7SUFFcEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsUUFBUSxDQUFDLFdBQXdCO1FBQzdCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFzQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUNqRjtZQUNJLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFFLFdBQVcsQ0FBQyxRQUFRO1lBQzFCLFFBQVEsRUFBRSxXQUFXLENBQUMsUUFBUTtZQUM5QixhQUFhLEVBQUUsSUFBSTtTQUN0QixFQUNEO1lBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ3BCLGNBQWMsRUFBRSxJQUFJO2dCQUNwQixvQkFBb0IsRUFBRSxJQUFJO2FBQzdCLENBQUM7U0FDTCxDQUFDLENBQUM7UUFDUCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQ2xCLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ1YsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDWixDQUFDOztvRUFoQ1EsVUFBVSxjQUdQLFlBQVk7a0RBSGYsVUFBVSxXQUFWLFVBQVUsbUJBRlAsTUFBTTtrREFFVCxVQUFVO2NBSHRCLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7c0JBSVEsTUFBTTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1NUQVJUX0NPTkZJRywgU3RhcnRDb25maWcsIFNxSHR0cENsaWVudCwgSHR0cFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHttYXB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHtDcmVkZW50aWFsc30gZnJvbSBcIi4vYXV0aGVudGljYXRpb24uc2VydmljZVwiO1xuXG4vKipcbiAqIEEgc2VydmljZSB0byByZXRyaWV2ZSBhIEpXVCAoSlNPTiBXZWIgVG9rZW4pIGZyb20gdGhlIFNpbmVxdWEgc2VydmVyLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogXCJyb290XCJcbn0pXG5leHBvcnQgY2xhc3MgSldUU2VydmljZSBleHRlbmRzIEh0dHBTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KFNUQVJUX0NPTkZJRykgc3RhcnRDb25maWc6IFN0YXJ0Q29uZmlnLFxuICAgICAgICBwcml2YXRlIGh0dHBDbGllbnQ6IFNxSHR0cENsaWVudCkge1xuICAgICAgICBzdXBlcihzdGFydENvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgSldUIGZyb20gdGhlIFNpbmVxdWEgc2VydmVyIHVzaW5nIHRoZSBwYXNzZWQgY3JlZGVudGlhbHMuIFRoZSBKV1QgaXMgcmVjZWl2ZWQgaW4gYSBjb29raWVcbiAgICAgKiBhbmQgdGhlIGFzc29jaWF0ZWQgQ1NSRiB0b2tlbiBpbiB0aGUgcmVzcG9uc2UgcGF5bG9hZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjcmVkZW50aWFscyBUaGUgY3JlZGVudGlhbHMgdG8gYmUgdXNlZCBmb3IgdGhlIEpXVC4gVGhlc2UgYXJlIHNlbnQgaW4gY2xlYXIgdGV4dFxuICAgICAqL1xuICAgIGdldFRva2VuKGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSB0aGlzLmh0dHBDbGllbnQucG9zdDx7Y3NyZlRva2VuOiBzdHJpbmd9Pih0aGlzLm1ha2VVcmwoXCJ3ZWJUb2tlblwiKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhY3Rpb246IFwiZ2V0XCIsXG4gICAgICAgICAgICAgICAgdXNlcjogY3JlZGVudGlhbHMudXNlck5hbWUsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGNyZWRlbnRpYWxzLnBhc3N3b3JkLFxuICAgICAgICAgICAgICAgIHRva2VuSW5Db29raWU6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhcmFtczogdGhpcy5tYWtlUGFyYW1zKHtcbiAgICAgICAgICAgICAgICAgICAgbm9Vc2VyT3ZlcnJpZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG5vQXV0b0F1dGhlbnRpY2F0aW9uOiB0cnVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5waXBlKFxuICAgICAgICAgICAgbWFwKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5jc3JmVG9rZW47XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxufVxuIl19