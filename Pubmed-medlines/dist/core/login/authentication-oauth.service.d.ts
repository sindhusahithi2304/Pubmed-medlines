import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { OauthService, SharedService, PopupService, ConfigService } from "ng2-ui-auth";
import { StartConfig } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
/**
 * Override ng2-ui-auth's state handling to retrieve a state from the Sinequa server
 */
export declare class AuthenticationOauthService extends OauthService {
    protected startConfig: StartConfig;
    protected httpClient: HttpClient;
    protected sharedService: SharedService;
    protected popupService: PopupService;
    protected configService: ConfigService;
    constructor(startConfig: StartConfig, httpClient: HttpClient, sharedService: SharedService, popupService: PopupService, configService: ConfigService);
    authenticate<T extends object | string>(name: string, userData: any): Observable<T>;
    static ɵfac: i0.ɵɵFactoryDef<AuthenticationOauthService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AuthenticationOauthService>;
}
//# sourceMappingURL=authentication-oauth.service.d.ts.map