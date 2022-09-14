import { StartConfig, SqHttpClient, HttpService } from "@sinequa/core/web-services";
import { Observable } from "rxjs";
import { Credentials } from "./authentication.service";
import * as i0 from "@angular/core";
/**
 * A service to retrieve a JWT (JSON Web Token) from the Sinequa server.
 */
export declare class JWTService extends HttpService {
    private httpClient;
    constructor(startConfig: StartConfig, httpClient: SqHttpClient);
    /**
     * Get a JWT from the Sinequa server using the passed credentials. The JWT is received in a cookie
     * and the associated CSRF token in the response payload.
     *
     * @param credentials The credentials to be used for the JWT. These are sent in clear text
     */
    getToken(credentials: Credentials): Observable<string>;
    static ɵfac: i0.ɵɵFactoryDef<JWTService, never>;
    static ɵprov: i0.ɵɵInjectableDef<JWTService>;
}
//# sourceMappingURL=jwt.service.d.ts.map