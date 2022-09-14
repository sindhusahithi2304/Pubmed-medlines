import { StartConfig, SqHttpClient, HttpService } from "@sinequa/core/web-services";
import { Observable } from "rxjs";
import * as i0 from "@angular/core";
/**
 * A service to manage JWT and CSRF tokens. The methods of this service
 * can be called before the authentication process has completed
 */
export declare class TokenService extends HttpService {
    private httpClient;
    constructor(startConfig: StartConfig, httpClient: SqHttpClient);
    /**
     * Retrieve the CSRF token corresponding to the current JWT cookie
     * which should accompany the request. This method is called by
     * [AuthenticationService.autoAuthenticate]{@link AuthenticationService#autoAuthenticate}
     *
     * @param notify `true` if any errors should be notified using the {@NotificationService}
     */
    getCsrfToken(notify?: boolean): Observable<string>;
    /**
     * Delete the current JWT cookie.
     * This method is called by [AuthenticationService.logout]{@link AuthenticationService#logout}
     */
    deleteWebTokenCookie(): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDef<TokenService, never>;
    static ɵprov: i0.ɵɵInjectableDef<TokenService>;
}
//# sourceMappingURL=token.service.d.ts.map