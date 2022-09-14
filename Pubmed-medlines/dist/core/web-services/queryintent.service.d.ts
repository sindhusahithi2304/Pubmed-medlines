import { Observable } from "rxjs";
import { SqHttpClient } from "./http-client";
import { HttpService } from "./http.service";
import { StartConfig } from "./start-config.web.service";
import { IQuery } from "./query/query";
import * as i0 from "@angular/core";
export interface QueryIntentResponse {
    query: string;
    intents: QueryIntentMatch[];
}
export interface QueryIntentMatch {
    /** name of the intent */
    name: string;
    /** global entities that match */
    globalEntities?: QueryIntentEntity2[];
    /** rule that match if exact match rule */
    matchRule: string | null;
    /** ml score or 1 if rule */
    score: number;
    /** ml confidence score or 1 if rule */
    confidence: number;
}
export interface QueryIntentEntity2 {
    /** global entity name, eg. "person" */
    name: string;
    /** global entity type (entities are detected by classical NLP, slots are detected by ML) */
    type: "entity" | "slot";
    /** global entity resource */
    resource: string;
    /** text that match the global entity, eg. "Bill gates" */
    value: string;
    /** offset in the query */
    offset: number;
    /** length in the query */
    length: number;
    /** basic form if type=entity, eg. "BILL GATES"*/
    basic: string | null;
    /** normalization form if type=entity, eg. "William H Gates"*/
    normalization: string | null;
    /** score for the extraction if type=slot */
    score?: number;
}
/**
 * A service for calling the queryintent web service
 */
export declare class QueryIntentWebService extends HttpService {
    private httpClient;
    private readonly endpoint;
    constructor(startConfig: StartConfig, httpClient: SqHttpClient);
    getQueryIntent(query: IQuery): Observable<QueryIntentResponse>;
    static ɵfac: i0.ɵɵFactoryDef<QueryIntentWebService, never>;
    static ɵprov: i0.ɵɵInjectableDef<QueryIntentWebService>;
}
//# sourceMappingURL=queryintent.service.d.ts.map