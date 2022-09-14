import { Observable } from "rxjs";
import { SqHttpClient } from "./http-client";
import { HttpService } from "./http.service";
import { Results } from "./query.web.service";
import { StartConfig } from "./start-config.web.service";
import * as i0 from "@angular/core";
export declare type Dataset = {
    [key: string]: Results | DatasetError;
};
export interface DatasetError {
    errorCode: number;
    errorMessage: string;
}
export interface DatasetDescription {
    name: string;
    description?: string;
}
/**
 * A service to notify the audit manager on the Sinequa server of client-side events
 */
export declare class DatasetWebService extends HttpService {
    protected httpClient: SqHttpClient;
    private static readonly endpoint;
    constructor(startConfig: StartConfig, httpClient: SqHttpClient);
    /**
     * Return the list of queries configured in the given
     * dataset web service.
     * @param webServiceName name of the web service
     */
    list(webServiceName: string): Observable<DatasetDescription[]>;
    /**
     * Queries the given web service.
     * @param webServiceName name of the web service
     * @param query name of the query
     * @param params parameters of the queries
     */
    get(webServiceName: string, query: string, parameters?: {}): Observable<Results | DatasetError>;
    /**
     * Queries the given web service.
     * @param webServiceName name of the web service
     * @param params parameters of the queries
     */
    getAll(webServiceName: string, parameters?: {}): Observable<Dataset>;
    static ɵfac: i0.ɵɵFactoryDef<DatasetWebService, never>;
    static ɵprov: i0.ɵɵInjectableDef<DatasetWebService>;
}
//# sourceMappingURL=dataset.web.service.d.ts.map