import { Injectable, Inject } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpService } from './http.service';
import { Utils } from "@sinequa/core/base";
import { START_CONFIG } from "./start-config.web.service";
import { ExportOutputFormat, ExportSourceType } from './config/ccapp';
import * as i0 from "@angular/core";
import * as i1 from "./http-client";
/**
 * A service to export the result of a query.
 */
export class QueryExportWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    logErrorToConsole(methodName, errorMessage) {
        console.log(`queryExportService.${methodName} ${errorMessage}.`);
    }
    preliminaryCheck(methodName, webService, format) {
        if (!this.appName) {
            const errorMessage = 'No app';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage });
        }
        if (!webService) {
            const errorMessage = 'No web service';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage });
        }
        if (!format || format === ExportOutputFormat.None) {
            const errorMessage = 'No output format';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage });
        }
        return undefined;
    }
    /**
     * Exports the current result.
     *
     * @param webService The configuration for the export web service.
     * @param query The query to export.
     * @param format The export format.
     * @param maxCount (Optional) The maximum number of exported rows.
     * @param exportedColumns (Optional) The columns to export, empty means all columns.
     */
    exportResult(webService, query, results, format, maxCount, exportedColumns) {
        const methodName = 'exportResult';
        const preliminaryCheckResult = this.preliminaryCheck(methodName, webService, format);
        if (preliminaryCheckResult) {
            return preliminaryCheckResult;
        }
        if (!query) {
            const errorMessage = 'No query';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage });
        }
        const postData = {
            app: this.appName,
            webService,
            query,
            type: ExportSourceType[ExportSourceType.Result],
            format: ExportOutputFormat[format],
            maxCount: maxCount ? maxCount.toString() : undefined,
            exportedColumns: exportedColumns,
            $auditRecord: {
                type: "Search_ExportCSV" /* Search_ExportCSV */,
                detail: {
                    "result-id": !!results ? results.id : undefined
                }
            }
        };
        return this.doExport(postData);
    }
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
    exportSelection(webService, query, results, selection, format, maxCount, exportedColumns) {
        const methodName = 'exportSelection';
        const preliminaryCheckResult = this.preliminaryCheck(methodName, webService, format);
        if (preliminaryCheckResult) {
            return preliminaryCheckResult;
        }
        if (!query) {
            const errorMessage = 'No query';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage });
        }
        if (!selection || selection.length === 0) {
            const errorMessage = 'No selection';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage });
        }
        const postData = {
            app: this.appName,
            webService,
            query,
            selection,
            type: ExportSourceType[ExportSourceType.Selection],
            format: ExportOutputFormat[format],
            maxCount: maxCount ? maxCount.toString() : undefined,
            exportedColumns: exportedColumns,
            $auditRecord: {
                type: "Search_Selection_ExportCSV" /* Search_Selection_ExportCSV */,
                detail: {
                    "result-id": !!results ? results.id : undefined
                }
            }
        };
        return this.doExport(postData);
    }
    /**
     * Exports the result of a saved query.
     *
     * @param webService The configuration for the export web service.
     * @param queryName The query name.
     * @param format The export format.
     * @param maxCount (Optional) The maximum number of exported rows.
     * @param exportedColumns (Optional) The columns to export, empty means all columns.
     */
    exportSavedQuery(webService, queryName, format, maxCount, exportedColumns) {
        const methodName = 'exportSavedQuery';
        const preliminaryCheckResult = this.preliminaryCheck(methodName, webService, format);
        if (preliminaryCheckResult) {
            return preliminaryCheckResult;
        }
        if (!queryName) {
            const errorMessage = 'No saved query';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage });
        }
        const postData = {
            app: this.appName,
            webService,
            type: ExportSourceType[ExportSourceType.SavedQuery],
            format: ExportOutputFormat[format],
            name: queryName,
            maxCount: maxCount ? maxCount.toString() : undefined,
            exportedColumns: exportedColumns,
            $auditRecord: {
                type: "Search_SavedQuery_ExportCSV" /* Search_SavedQuery_ExportCSV */,
                detail: {
                    query: queryName
                }
            }
        };
        return this.doExport(postData);
    }
    doExport(body) {
        const observable = this.httpClient.post(this.makeUrl('query.export'), body, {
            observe: 'response',
            responseType: 'blob'
        });
        Utils.subscribe(observable, (response) => {
            console.log('queryExportService.export success: ', this.readBlobFileName(response));
            return response;
        }, (error) => {
            console.log('queryExportService.export failure - error: ', error);
        });
        return observable;
    }
    readBlobFileName(response) {
        const header = response.headers.get('content-disposition');
        return header ? header.split('filename=')[1].replace('"', '').replace('"', '') : "";
    }
}
QueryExportWebService.ɵfac = function QueryExportWebService_Factory(t) { return new (t || QueryExportWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.SqHttpClient)); };
QueryExportWebService.ɵprov = i0.ɵɵdefineInjectable({ token: QueryExportWebService, factory: QueryExportWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(QueryExportWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.SqHttpClient }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktZXhwb3J0LndlYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvd2ViLXNlcnZpY2VzLyIsInNvdXJjZXMiOlsicXVlcnktZXhwb3J0LndlYi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFjLE1BQU0sNEJBQTRCLENBQUM7QUFDckUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUt0RTs7R0FFRztBQUlILE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxXQUFXO0lBRWxELFlBQzBCLFdBQXdCLEVBQ3RDLFVBQXdCO1FBQ2hDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQURYLGVBQVUsR0FBVixVQUFVLENBQWM7SUFFcEMsQ0FBQztJQUVPLGlCQUFpQixDQUFDLFVBQWtCLEVBQUUsWUFBb0I7UUFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsVUFBVSxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVPLGdCQUFnQixDQUNwQixVQUFrQixFQUNsQixVQUFrQixFQUNsQixNQUEwQjtRQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQztZQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ2pELE9BQU8sVUFBVSxDQUFDLEVBQUUsS0FBSyxFQUFF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QUM7WUFDcEYsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxFQUNELENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQyxDQUFDO1FBRVAsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVPLGdCQUFnQixDQUFDLFFBQTRCO1FBQ2pELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDM0QsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDeEYsQ0FBQzs7MEZBM05RLHFCQUFxQixjQUdsQixZQUFZOzZEQUhmLHFCQUFxQixXQUFyQixxQkFBcUIsbUJBRmxCLE1BQU07a0RBRVQscUJBQXFCO2NBSGpDLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7c0JBSVEsTUFBTTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTcUh0dHBDbGllbnQgfSBmcm9tIFwiLi9odHRwLWNsaWVudFwiO1xuaW1wb3J0IHsgSHR0cFNlcnZpY2UgfSBmcm9tICcuL2h0dHAuc2VydmljZSc7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge1NUQVJUX0NPTkZJRywgU3RhcnRDb25maWd9IGZyb20gXCIuL3N0YXJ0LWNvbmZpZy53ZWIuc2VydmljZVwiO1xuaW1wb3J0IHsgRXhwb3J0T3V0cHV0Rm9ybWF0LCBFeHBvcnRTb3VyY2VUeXBlIH0gZnJvbSAnLi9jb25maWcvY2NhcHAnO1xuaW1wb3J0IHsgSVF1ZXJ5IH0gZnJvbSAnLi9xdWVyeS9xdWVyeSc7XG5pbXBvcnQgeyBSZXN1bHRzIH0gZnJvbSBcIi4vcXVlcnkud2ViLnNlcnZpY2VcIjtcbmltcG9ydCB7IEF1ZGl0RXZlbnRUeXBlIH0gZnJvbSAnLi9hdWRpdC53ZWIuc2VydmljZSc7XG5cbi8qKlxuICogQSBzZXJ2aWNlIHRvIGV4cG9ydCB0aGUgcmVzdWx0IG9mIGEgcXVlcnkuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBRdWVyeUV4cG9ydFdlYlNlcnZpY2UgZXh0ZW5kcyBIdHRwU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChTVEFSVF9DT05GSUcpIHN0YXJ0Q29uZmlnOiBTdGFydENvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBTcUh0dHBDbGllbnQpIHtcbiAgICAgICAgc3VwZXIoc3RhcnRDb25maWcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9nRXJyb3JUb0NvbnNvbGUobWV0aG9kTmFtZTogc3RyaW5nLCBlcnJvck1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZyhgcXVlcnlFeHBvcnRTZXJ2aWNlLiR7bWV0aG9kTmFtZX0gJHtlcnJvck1lc3NhZ2V9LmApO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlbGltaW5hcnlDaGVjayhcbiAgICAgICAgbWV0aG9kTmFtZTogc3RyaW5nLFxuICAgICAgICB3ZWJTZXJ2aWNlOiBzdHJpbmcsXG4gICAgICAgIGZvcm1hdDogRXhwb3J0T3V0cHV0Rm9ybWF0KTogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8QmxvYj4+IHwgdW5kZWZpbmVkIHtcblxuICAgICAgICBpZiAoIXRoaXMuYXBwTmFtZSkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gJ05vIGFwcCc7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yVG9Db25zb2xlKG1ldGhvZE5hbWUsIGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcih7IGVycm9yOiBlcnJvck1lc3NhZ2V9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghd2ViU2VydmljZSkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gJ05vIHdlYiBzZXJ2aWNlJztcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3JUb0NvbnNvbGUobWV0aG9kTmFtZSwgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHsgZXJyb3I6IGVycm9yTWVzc2FnZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFmb3JtYXQgfHwgZm9ybWF0IGFzIEV4cG9ydE91dHB1dEZvcm1hdCA9PT0gRXhwb3J0T3V0cHV0Rm9ybWF0Lk5vbmUpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdObyBvdXRwdXQgZm9ybWF0JztcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3JUb0NvbnNvbGUobWV0aG9kTmFtZSwgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHsgZXJyb3I6IGVycm9yTWVzc2FnZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHBvcnRzIHRoZSBjdXJyZW50IHJlc3VsdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB3ZWJTZXJ2aWNlIFRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgZXhwb3J0IHdlYiBzZXJ2aWNlLlxuICAgICAqIEBwYXJhbSBxdWVyeSBUaGUgcXVlcnkgdG8gZXhwb3J0LlxuICAgICAqIEBwYXJhbSBmb3JtYXQgVGhlIGV4cG9ydCBmb3JtYXQuXG4gICAgICogQHBhcmFtIG1heENvdW50IChPcHRpb25hbCkgVGhlIG1heGltdW0gbnVtYmVyIG9mIGV4cG9ydGVkIHJvd3MuXG4gICAgICogQHBhcmFtIGV4cG9ydGVkQ29sdW1ucyAoT3B0aW9uYWwpIFRoZSBjb2x1bW5zIHRvIGV4cG9ydCwgZW1wdHkgbWVhbnMgYWxsIGNvbHVtbnMuXG4gICAgICovXG4gICAgcHVibGljIGV4cG9ydFJlc3VsdChcbiAgICAgICAgd2ViU2VydmljZTogc3RyaW5nLFxuICAgICAgICBxdWVyeTogSVF1ZXJ5LFxuICAgICAgICByZXN1bHRzOiBSZXN1bHRzIHwgdW5kZWZpbmVkLFxuICAgICAgICBmb3JtYXQ6IEV4cG9ydE91dHB1dEZvcm1hdCxcbiAgICAgICAgbWF4Q291bnQ/OiBudW1iZXIsXG4gICAgICAgIGV4cG9ydGVkQ29sdW1ucz86IHN0cmluZ1tdXG4gICAgKTogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8QmxvYj4+IHtcblxuICAgICAgICBjb25zdCBtZXRob2ROYW1lID0gJ2V4cG9ydFJlc3VsdCc7XG4gICAgICAgIGNvbnN0IHByZWxpbWluYXJ5Q2hlY2tSZXN1bHQgPSB0aGlzLnByZWxpbWluYXJ5Q2hlY2sobWV0aG9kTmFtZSwgd2ViU2VydmljZSwgZm9ybWF0KTtcbiAgICAgICAgaWYgKHByZWxpbWluYXJ5Q2hlY2tSZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmVsaW1pbmFyeUNoZWNrUmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFxdWVyeSkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gJ05vIHF1ZXJ5JztcbiAgICAgICAgICAgIHRoaXMubG9nRXJyb3JUb0NvbnNvbGUobWV0aG9kTmFtZSwgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHsgZXJyb3I6IGVycm9yTWVzc2FnZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcG9zdERhdGEgPSB7XG4gICAgICAgICAgICBhcHA6IHRoaXMuYXBwTmFtZSxcbiAgICAgICAgICAgIHdlYlNlcnZpY2UsXG4gICAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAgIHR5cGU6IEV4cG9ydFNvdXJjZVR5cGVbRXhwb3J0U291cmNlVHlwZS5SZXN1bHRdLFxuICAgICAgICAgICAgZm9ybWF0OiBFeHBvcnRPdXRwdXRGb3JtYXRbZm9ybWF0XSxcbiAgICAgICAgICAgIG1heENvdW50OiBtYXhDb3VudCA/IG1heENvdW50LnRvU3RyaW5nKCkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBleHBvcnRlZENvbHVtbnM6IGV4cG9ydGVkQ29sdW1ucyxcbiAgICAgICAgICAgICRhdWRpdFJlY29yZDoge1xuICAgICAgICAgICAgICAgIHR5cGU6IEF1ZGl0RXZlbnRUeXBlLlNlYXJjaF9FeHBvcnRDU1YsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIFwicmVzdWx0LWlkXCI6ICEhcmVzdWx0cyA/IHJlc3VsdHMuaWQgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZG9FeHBvcnQocG9zdERhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4cG9ydHMgdGhlIGN1cnJlbnQgc2VsZWN0ZWQgcmVjb3Jkcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB3ZWJTZXJ2aWNlIFRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgZXhwb3J0IHdlYiBzZXJ2aWNlLlxuICAgICAqIEBwYXJhbSBxdWVyeVxuICAgICAqIEBwYXJhbSBzZWxlY3Rpb25cbiAgICAgKiBAcGFyYW0gZm9ybWF0IFRoZSBleHBvcnQgZm9ybWF0LlxuICAgICAqIEBwYXJhbSBtYXhDb3VudCAoT3B0aW9uYWwpIFRoZSBtYXhpbXVtIG51bWJlciBvZiBleHBvcnRlZCByb3dzLlxuICAgICAqIEBwYXJhbSBleHBvcnRlZENvbHVtbnMgKE9wdGlvbmFsKSBUaGUgY29sdW1ucyB0byBleHBvcnQsIGVtcHR5IG1lYW5zIGFsbCBjb2x1bW5zLlxuICAgICAqL1xuICAgIHB1YmxpYyBleHBvcnRTZWxlY3Rpb24oXG4gICAgICAgIHdlYlNlcnZpY2U6IHN0cmluZyxcbiAgICAgICAgcXVlcnk6IElRdWVyeSxcbiAgICAgICAgcmVzdWx0czogUmVzdWx0cyB8IHVuZGVmaW5lZCxcbiAgICAgICAgc2VsZWN0aW9uOiBzdHJpbmdbXSxcbiAgICAgICAgZm9ybWF0OiBFeHBvcnRPdXRwdXRGb3JtYXQsXG4gICAgICAgIG1heENvdW50PzogbnVtYmVyLFxuICAgICAgICBleHBvcnRlZENvbHVtbnM/OiBzdHJpbmdbXVxuICAgICk6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPEJsb2I+PiB7XG5cbiAgICAgICAgY29uc3QgbWV0aG9kTmFtZSA9ICdleHBvcnRTZWxlY3Rpb24nO1xuICAgICAgICBjb25zdCBwcmVsaW1pbmFyeUNoZWNrUmVzdWx0ID0gdGhpcy5wcmVsaW1pbmFyeUNoZWNrKG1ldGhvZE5hbWUsIHdlYlNlcnZpY2UsIGZvcm1hdCk7XG4gICAgICAgIGlmIChwcmVsaW1pbmFyeUNoZWNrUmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcHJlbGltaW5hcnlDaGVja1Jlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcXVlcnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdObyBxdWVyeSc7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yVG9Db25zb2xlKG1ldGhvZE5hbWUsIGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcih7IGVycm9yOiBlcnJvck1lc3NhZ2V9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc2VsZWN0aW9uIHx8IHNlbGVjdGlvbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdObyBzZWxlY3Rpb24nO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvclRvQ29uc29sZShtZXRob2ROYW1lLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoeyBlcnJvcjogZXJyb3JNZXNzYWdlfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwb3N0RGF0YSA9IHtcbiAgICAgICAgICAgIGFwcDogdGhpcy5hcHBOYW1lLFxuICAgICAgICAgICAgd2ViU2VydmljZSxcbiAgICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgICAgc2VsZWN0aW9uLFxuICAgICAgICAgICAgdHlwZTogRXhwb3J0U291cmNlVHlwZVtFeHBvcnRTb3VyY2VUeXBlLlNlbGVjdGlvbl0sXG4gICAgICAgICAgICBmb3JtYXQ6IEV4cG9ydE91dHB1dEZvcm1hdFtmb3JtYXRdLFxuICAgICAgICAgICAgbWF4Q291bnQ6IG1heENvdW50ID8gbWF4Q291bnQudG9TdHJpbmcoKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGV4cG9ydGVkQ29sdW1uczogZXhwb3J0ZWRDb2x1bW5zLFxuICAgICAgICAgICAgJGF1ZGl0UmVjb3JkOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogQXVkaXRFdmVudFR5cGUuU2VhcmNoX1NlbGVjdGlvbl9FeHBvcnRDU1YsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIFwicmVzdWx0LWlkXCI6ICEhcmVzdWx0cyA/IHJlc3VsdHMuaWQgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZG9FeHBvcnQocG9zdERhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4cG9ydHMgdGhlIHJlc3VsdCBvZiBhIHNhdmVkIHF1ZXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHdlYlNlcnZpY2UgVGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBleHBvcnQgd2ViIHNlcnZpY2UuXG4gICAgICogQHBhcmFtIHF1ZXJ5TmFtZSBUaGUgcXVlcnkgbmFtZS5cbiAgICAgKiBAcGFyYW0gZm9ybWF0IFRoZSBleHBvcnQgZm9ybWF0LlxuICAgICAqIEBwYXJhbSBtYXhDb3VudCAoT3B0aW9uYWwpIFRoZSBtYXhpbXVtIG51bWJlciBvZiBleHBvcnRlZCByb3dzLlxuICAgICAqIEBwYXJhbSBleHBvcnRlZENvbHVtbnMgKE9wdGlvbmFsKSBUaGUgY29sdW1ucyB0byBleHBvcnQsIGVtcHR5IG1lYW5zIGFsbCBjb2x1bW5zLlxuICAgICAqL1xuICAgIHB1YmxpYyBleHBvcnRTYXZlZFF1ZXJ5KFxuICAgICAgICB3ZWJTZXJ2aWNlOiBzdHJpbmcsXG4gICAgICAgIHF1ZXJ5TmFtZTogc3RyaW5nLFxuICAgICAgICBmb3JtYXQ6IEV4cG9ydE91dHB1dEZvcm1hdCxcbiAgICAgICAgbWF4Q291bnQ/OiBudW1iZXIsXG4gICAgICAgIGV4cG9ydGVkQ29sdW1ucz86IHN0cmluZ1tdXG4gICAgKTogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8QmxvYj4+IHtcblxuICAgICAgICBjb25zdCBtZXRob2ROYW1lID0gJ2V4cG9ydFNhdmVkUXVlcnknO1xuICAgICAgICBjb25zdCBwcmVsaW1pbmFyeUNoZWNrUmVzdWx0ID0gdGhpcy5wcmVsaW1pbmFyeUNoZWNrKG1ldGhvZE5hbWUsIHdlYlNlcnZpY2UsIGZvcm1hdCk7XG4gICAgICAgIGlmIChwcmVsaW1pbmFyeUNoZWNrUmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcHJlbGltaW5hcnlDaGVja1Jlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcXVlcnlOYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAnTm8gc2F2ZWQgcXVlcnknO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvclRvQ29uc29sZShtZXRob2ROYW1lLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoeyBlcnJvcjogZXJyb3JNZXNzYWdlfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwb3N0RGF0YSA9IHtcbiAgICAgICAgICAgIGFwcDogdGhpcy5hcHBOYW1lLFxuICAgICAgICAgICAgd2ViU2VydmljZSxcbiAgICAgICAgICAgIHR5cGU6IEV4cG9ydFNvdXJjZVR5cGVbRXhwb3J0U291cmNlVHlwZS5TYXZlZFF1ZXJ5XSxcbiAgICAgICAgICAgIGZvcm1hdDogRXhwb3J0T3V0cHV0Rm9ybWF0W2Zvcm1hdF0sXG4gICAgICAgICAgICBuYW1lOiBxdWVyeU5hbWUsXG4gICAgICAgICAgICBtYXhDb3VudDogbWF4Q291bnQgPyBtYXhDb3VudC50b1N0cmluZygpIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZXhwb3J0ZWRDb2x1bW5zOiBleHBvcnRlZENvbHVtbnMsXG4gICAgICAgICAgICAkYXVkaXRSZWNvcmQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBBdWRpdEV2ZW50VHlwZS5TZWFyY2hfU2F2ZWRRdWVyeV9FeHBvcnRDU1YsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeU5hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZG9FeHBvcnQocG9zdERhdGEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZG9FeHBvcnQoYm9keToge30pOiBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxCbG9iPj4ge1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5odHRwQ2xpZW50LnBvc3QoXG4gICAgICAgICAgICB0aGlzLm1ha2VVcmwoJ3F1ZXJ5LmV4cG9ydCcpLFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlOiAncmVzcG9uc2UnLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ2Jsb2InXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgVXRpbHMuc3Vic2NyaWJlKFxuICAgICAgICAgICAgb2JzZXJ2YWJsZSxcbiAgICAgICAgICAgIChyZXNwb25zZTogSHR0cFJlc3BvbnNlPEJsb2I+KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3F1ZXJ5RXhwb3J0U2VydmljZS5leHBvcnQgc3VjY2VzczogJywgdGhpcy5yZWFkQmxvYkZpbGVOYW1lKHJlc3BvbnNlKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdxdWVyeUV4cG9ydFNlcnZpY2UuZXhwb3J0IGZhaWx1cmUgLSBlcnJvcjogJywgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWFkQmxvYkZpbGVOYW1lKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8QmxvYj4pOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1kaXNwb3NpdGlvbicpO1xuICAgICAgICByZXR1cm4gaGVhZGVyID8gaGVhZGVyLnNwbGl0KCdmaWxlbmFtZT0nKVsxXS5yZXBsYWNlKCdcIicsICcnKS5yZXBsYWNlKCdcIicsICcnKSA6IFwiXCI7XG4gICAgfVxufVxuIl19