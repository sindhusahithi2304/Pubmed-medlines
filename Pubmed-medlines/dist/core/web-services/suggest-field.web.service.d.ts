import { Observable } from "rxjs";
import { SqHttpClient } from "./http-client";
import { HttpService } from "./http.service";
import { StartConfig } from "./start-config.web.service";
import { Suggestion } from "./suggest/suggestion";
import { IQuery } from "./query/query";
import * as i0 from "@angular/core";
/**
 * A service for calling the suggestfield web service
 */
export declare class SuggestFieldWebService extends HttpService {
    private httpClient;
    constructor(startConfig: StartConfig, httpClient: SqHttpClient);
    /**
     * Gets suggestions for the passed text for a set of fields and in the context of the passed query
     *
     * @param text The text to match
     * @param fields The fields for which to return suggestions
     * @param query The query context
     */
    get(text: string, fields: string | string[], query?: IQuery): Observable<Suggestion[]>;
    static ɵfac: i0.ɵɵFactoryDef<SuggestFieldWebService, never>;
    static ɵprov: i0.ɵɵInjectableDef<SuggestFieldWebService>;
}
//# sourceMappingURL=suggest-field.web.service.d.ts.map