import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SqHttpClient } from "./http-client";
import { HttpService } from './http.service';
import { StartConfig } from "./start-config.web.service";
import { ExportOutputFormat } from './config/ccapp';
import { IQuery } from './query/query';
import { Results } from "./query.web.service";
import * as i0 from "@angular/core";
/**
 * A service to export the result of a query.
 */
export declare class QueryExportWebService extends HttpService {
    private httpClient;
    constructor(startConfig: StartConfig, httpClient: SqHttpClient);
    private logErrorToConsole;
    private preliminaryCheck;
    /**
     * Exports the current result.
     *
     * @param webService The configuration for the export web service.
     * @param query The query to export.
     * @param format The export format.
     * @param maxCount (Optional) The maximum number of exported rows.
     * @param exportedColumns (Optional) The columns to export, empty means all columns.
     */
    exportResult(webService: string, query: IQuery, results: Results | undefined, format: ExportOutputFormat, maxCount?: number, exportedColumns?: string[]): Observable<HttpResponse<Blob>>;
    /**
     * Exports the current selected records.
     *
     * @param webService The configuration for the export web service.
     * @param query
     * @param selection
     * @param format The export format.
     * @param maxCount (Optional) The maximum number of exported rows.
     * @param exportedColumns (Optional) The columns to export, empty means all columns.
     */
    exportSelection(webService: string, query: IQuery, results: Results | undefined, selection: string[], format: ExportOutputFormat, maxCount?: number, exportedColumns?: string[]): Observable<HttpResponse<Blob>>;
    /**
     * Exports the result of a saved query.
     *
     * @param webService The configuration for the export web service.
     * @param queryName The query name.
     * @param format The export format.
     * @param maxCount (Optional) The maximum number of exported rows.
     * @param exportedColumns (Optional) The columns to export, empty means all columns.
     */
    exportSavedQuery(webService: string, queryName: string, format: ExportOutputFormat, maxCount?: number, exportedColumns?: string[]): Observable<HttpResponse<Blob>>;
    private doExport;
    private readBlobFileName;
    static ɵfac: i0.ɵɵFactoryDef<QueryExportWebService, never>;
    static ɵprov: i0.ɵɵInjectableDef<QueryExportWebService>;
}
//# sourceMappingURL=query-export.web.service.d.ts.map