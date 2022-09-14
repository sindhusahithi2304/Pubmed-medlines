import { Observable } from "rxjs";
import { SqHttpClient } from "./http-client";
import { HttpService } from "./http.service";
import { StartConfig } from "./start-config.web.service";
import { Record } from "./query.web.service";
import * as i0 from "@angular/core";
/**
 * A service for calling the similardocuments web service
 */
export declare class SimilarDocumentsWebService extends HttpService {
    private httpClient;
    constructor(startConfig: StartConfig, httpClient: SqHttpClient);
    /**
     * Gets an array of documents (records) similar to the passed document
     *
     * @param sourceDocumentId The id of the document for which to retrieve similar documents
     * @param queryName The name of the query
     */
    get(sourceDocumentId: string, queryName: string): Observable<Record[]>;
    static ɵfac: i0.ɵɵFactoryDef<SimilarDocumentsWebService, never>;
    static ɵprov: i0.ɵɵInjectableDef<SimilarDocumentsWebService>;
}
//# sourceMappingURL=similar-documents.web.service.d.ts.map