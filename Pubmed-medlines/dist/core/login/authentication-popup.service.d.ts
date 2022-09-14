import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PopupService } from "ng2-ui-auth";
import { StartConfig } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
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
export declare class AuthenticationPopupService extends PopupService {
    protected startConfig: StartConfig;
    protected httpClient: HttpClient;
    constructor(startConfig: StartConfig, httpClient: HttpClient);
    open(url: string, options: any, cordova: boolean | undefined): Observable<Window>;
    static ɵfac: i0.ɵɵFactoryDef<AuthenticationPopupService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AuthenticationPopupService>;
}
//# sourceMappingURL=authentication-popup.service.d.ts.map