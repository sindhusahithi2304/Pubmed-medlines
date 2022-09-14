import { Observable } from "rxjs";
import { SqHttpClient } from "./http-client";
import { HttpService } from "./http.service";
import { StartConfig } from "./start-config.web.service";
import { Suggestion } from "./suggest/suggestion";
import * as i0 from "@angular/core";
/**
 * A service for calling the suggestquery web service
 */
export declare class SuggestQueryWebService extends HttpService {
    private httpClient;
    constructor(startConfig: StartConfig, httpClient: SqHttpClient);
    /**
     * Gets suggestions for the passed text for a set of fields using the passed suggestquery web service
     *
     * @param suggestQuery The name of the suggestquery web service to use
     * @param text The text to match
     * @param query The name of the current query
     * @param fields The fields for which to return suggestions
     */
    get(suggestQuery: string, text: string, query: string, fields?: string | string[]): Observable<Suggestion[]>;
    static ɵfac: i0.ɵɵFactoryDef<SuggestQueryWebService, never>;
    static ɵprov: i0.ɵɵInjectableDef<SuggestQueryWebService>;
}
//# sourceMappingURL=suggest-query.web.service.d.ts.map