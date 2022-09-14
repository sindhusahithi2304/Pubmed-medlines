import { Observable } from "rxjs";
import { SqHttpClient } from "./http-client";
import { HttpService } from "./http.service";
import { StartConfig } from "./start-config.web.service";
import { MapOf } from "@sinequa/core/base";
import { Results, RFMData } from "./query.web.service";
import * as i0 from "@angular/core";
/**
 * A service for calling the search.rfm web service
 */
export declare class RfmWebService extends HttpService {
    private httpClient;
    private static readonly endpoint;
    constructor(startConfig: StartConfig, httpClient: SqHttpClient);
    /**
     * Get RFM data for a set of results
     *
     * @param rfm The name of the RFM
     * @param results The results for which to retrieve RFM data
     */
    getRfmData(rfm: string, results: Results): Observable<MapOf<RFMData>>;
    static ɵfac: i0.ɵɵFactoryDef<RfmWebService, never>;
    static ɵprov: i0.ɵɵInjectableDef<RfmWebService>;
}
//# sourceMappingURL=rfm.web.service.d.ts.map