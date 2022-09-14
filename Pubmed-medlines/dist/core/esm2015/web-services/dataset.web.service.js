import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpService } from "./http.service";
import { START_CONFIG } from "./start-config.web.service";
import * as i0 from "@angular/core";
import * as i1 from "./http-client";
/**
 * A service to notify the audit manager on the Sinequa server of client-side events
 */
export class DatasetWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Return the list of queries configured in the given
     * dataset web service.
     * @param webServiceName name of the web service
     */
    list(webServiceName) {
        return this.httpClient.get(`${this.makeUrl(DatasetWebService.endpoint)}/${webServiceName}`);
    }
    /**
     * Queries the given web service.
     * @param webServiceName name of the web service
     * @param query name of the query
     * @param params parameters of the queries
     */
    get(webServiceName, query, parameters = {}) {
        let url = `${this.makeUrl(DatasetWebService.endpoint)}/${webServiceName}/${query}`;
        return this.httpClient.post(url, { parameters })
            .pipe(map(d => d.datasets[query]));
    }
    /**
     * Queries the given web service.
     * @param webServiceName name of the web service
     * @param params parameters of the queries
     */
    getAll(webServiceName, parameters = {}) {
        let url = `${this.makeUrl(DatasetWebService.endpoint)}/${webServiceName}`;
        return this.httpClient.post(url, { parameters })
            .pipe(map(d => d.datasets));
    }
}
DatasetWebService.endpoint = "search.dataset";
DatasetWebService.ɵfac = function DatasetWebService_Factory(t) { return new (t || DatasetWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.SqHttpClient)); };
DatasetWebService.ɵprov = i0.ɵɵdefineInjectable({ token: DatasetWebService, factory: DatasetWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DatasetWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.SqHttpClient }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC53ZWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3dlYi1zZXJ2aWNlcy8iLCJzb3VyY2VzIjpbImRhdGFzZXQud2ViLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQWUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7OztBQWN2RTs7R0FFRztBQUlILE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxXQUFXO0lBRzlDLFlBQzBCLFdBQXdCLEVBQ3BDLFVBQXdCO1FBQ2xDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQURULGVBQVUsR0FBVixVQUFVLENBQWM7SUFFdEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJLENBQUMsY0FBc0I7UUFDdkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FDdEIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLGNBQWMsRUFBRSxDQUNsRSxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsR0FBRyxDQUFDLGNBQXNCLEVBQUUsS0FBYSxFQUFFLFVBQVUsR0FBRyxFQUFFO1FBQ3RELElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxjQUFjLElBQUksS0FBSyxFQUFFLENBQUM7UUFDbkYsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBc0IsR0FBRyxFQUFFLEVBQUMsVUFBVSxFQUFDLENBQUM7YUFDOUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLGNBQXNCLEVBQUUsVUFBVSxHQUFHLEVBQUU7UUFDMUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQzFFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQXNCLEdBQUcsRUFBRSxFQUFDLFVBQVUsRUFBQyxDQUFDO2FBQzlELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDOztBQXhDdUIsMEJBQVEsR0FBRyxnQkFBZ0IsQ0FBQztrRkFEM0MsaUJBQWlCLGNBSWQsWUFBWTt5REFKZixpQkFBaUIsV0FBakIsaUJBQWlCLG1CQUZkLE1BQU07a0RBRVQsaUJBQWlCO2NBSDdCLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7c0JBS1EsTUFBTTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5pbXBvcnQgeyBTcUh0dHBDbGllbnQgfSBmcm9tIFwiLi9odHRwLWNsaWVudFwiO1xyXG5pbXBvcnQgeyBIdHRwU2VydmljZSB9IGZyb20gXCIuL2h0dHAuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSZXN1bHRzIH0gZnJvbSBcIi4vcXVlcnkud2ViLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3RhcnRDb25maWcsIFNUQVJUX0NPTkZJRyB9IGZyb20gXCIuL3N0YXJ0LWNvbmZpZy53ZWIuc2VydmljZVwiO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YXNldCA9IHtba2V5OiBzdHJpbmddOiBSZXN1bHRzfERhdGFzZXRFcnJvcn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGFzZXRFcnJvciB7XHJcbiAgICBlcnJvckNvZGU6IG51bWJlcjtcclxuICAgIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGFzZXREZXNjcmlwdGlvbiB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIEEgc2VydmljZSB0byBub3RpZnkgdGhlIGF1ZGl0IG1hbmFnZXIgb24gdGhlIFNpbmVxdWEgc2VydmVyIG9mIGNsaWVudC1zaWRlIGV2ZW50c1xyXG4gKi9cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogXCJyb290XCJcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFzZXRXZWJTZXJ2aWNlIGV4dGVuZHMgSHR0cFNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgZW5kcG9pbnQgPSBcInNlYXJjaC5kYXRhc2V0XCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgQEluamVjdChTVEFSVF9DT05GSUcpIHN0YXJ0Q29uZmlnOiBTdGFydENvbmZpZyxcclxuICAgICAgICBwcm90ZWN0ZWQgaHR0cENsaWVudDogU3FIdHRwQ2xpZW50KSB7XHJcbiAgICAgICAgc3VwZXIoc3RhcnRDb25maWcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRoZSBsaXN0IG9mIHF1ZXJpZXMgY29uZmlndXJlZCBpbiB0aGUgZ2l2ZW5cclxuICAgICAqIGRhdGFzZXQgd2ViIHNlcnZpY2UuXHJcbiAgICAgKiBAcGFyYW0gd2ViU2VydmljZU5hbWUgbmFtZSBvZiB0aGUgd2ViIHNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgbGlzdCh3ZWJTZXJ2aWNlTmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxEYXRhc2V0RGVzY3JpcHRpb25bXT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0PERhdGFzZXREZXNjcmlwdGlvbltdPihcclxuICAgICAgICAgICAgYCR7dGhpcy5tYWtlVXJsKERhdGFzZXRXZWJTZXJ2aWNlLmVuZHBvaW50KX0vJHt3ZWJTZXJ2aWNlTmFtZX1gXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFF1ZXJpZXMgdGhlIGdpdmVuIHdlYiBzZXJ2aWNlLlxyXG4gICAgICogQHBhcmFtIHdlYlNlcnZpY2VOYW1lIG5hbWUgb2YgdGhlIHdlYiBzZXJ2aWNlXHJcbiAgICAgKiBAcGFyYW0gcXVlcnkgbmFtZSBvZiB0aGUgcXVlcnlcclxuICAgICAqIEBwYXJhbSBwYXJhbXMgcGFyYW1ldGVycyBvZiB0aGUgcXVlcmllc1xyXG4gICAgICovXHJcbiAgICBnZXQod2ViU2VydmljZU5hbWU6IHN0cmluZywgcXVlcnk6IHN0cmluZywgcGFyYW1ldGVycyA9IHt9KTogT2JzZXJ2YWJsZTxSZXN1bHRzfERhdGFzZXRFcnJvcj4ge1xyXG4gICAgICAgIGxldCB1cmwgPSBgJHt0aGlzLm1ha2VVcmwoRGF0YXNldFdlYlNlcnZpY2UuZW5kcG9pbnQpfS8ke3dlYlNlcnZpY2VOYW1lfS8ke3F1ZXJ5fWA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0PHtkYXRhc2V0czogRGF0YXNldH0+KHVybCwge3BhcmFtZXRlcnN9KVxyXG4gICAgICAgICAgICAucGlwZShtYXAoZCA9PiBkLmRhdGFzZXRzW3F1ZXJ5XSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUXVlcmllcyB0aGUgZ2l2ZW4gd2ViIHNlcnZpY2UuXHJcbiAgICAgKiBAcGFyYW0gd2ViU2VydmljZU5hbWUgbmFtZSBvZiB0aGUgd2ViIHNlcnZpY2VcclxuICAgICAqIEBwYXJhbSBwYXJhbXMgcGFyYW1ldGVycyBvZiB0aGUgcXVlcmllc1xyXG4gICAgICovXHJcbiAgICBnZXRBbGwod2ViU2VydmljZU5hbWU6IHN0cmluZywgcGFyYW1ldGVycyA9IHt9KTogT2JzZXJ2YWJsZTxEYXRhc2V0PiB7XHJcbiAgICAgICAgbGV0IHVybCA9IGAke3RoaXMubWFrZVVybChEYXRhc2V0V2ViU2VydmljZS5lbmRwb2ludCl9LyR7d2ViU2VydmljZU5hbWV9YDtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnBvc3Q8e2RhdGFzZXRzOiBEYXRhc2V0fT4odXJsLCB7cGFyYW1ldGVyc30pXHJcbiAgICAgICAgICAgIC5waXBlKG1hcChkID0+IGQuZGF0YXNldHMpKTtcclxuICAgIH1cclxuXHJcbn0iXX0=