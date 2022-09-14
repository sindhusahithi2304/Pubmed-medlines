import { Injectable, Inject } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpService } from "./http.service";
import { START_CONFIG } from "./start-config.web.service";
import * as i0 from "@angular/core";
import * as i1 from "./http-client";
/**
 * A service for calling the similardocuments web service
 */
export class SimilarDocumentsWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Gets an array of documents (records) similar to the passed document
     *
     * @param sourceDocumentId The id of the document for which to retrieve similar documents
     * @param queryName The name of the query
     */
    get(sourceDocumentId, queryName) {
        return this.httpClient.post(this.makeUrl("similardocuments"), {
            app: this.appName,
            sourceDocumentId,
            query: {
                name: queryName
            }
        }).pipe(map((response) => response.data));
    }
}
SimilarDocumentsWebService.ɵfac = function SimilarDocumentsWebService_Factory(t) { return new (t || SimilarDocumentsWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.SqHttpClient)); };
SimilarDocumentsWebService.ɵprov = i0.ɵɵdefineInjectable({ token: SimilarDocumentsWebService, factory: SimilarDocumentsWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SimilarDocumentsWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.SqHttpClient }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltaWxhci1kb2N1bWVudHMud2ViLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS93ZWItc2VydmljZXMvIiwic291cmNlcyI6WyJzaW1pbGFyLWRvY3VtZW50cy53ZWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQWUsTUFBTSw0QkFBNEIsQ0FBQzs7O0FBR3ZFOztHQUVHO0FBSUgsTUFBTSxPQUFPLDBCQUEyQixTQUFRLFdBQVc7SUFDdkQsWUFDMEIsV0FBd0IsRUFDdEMsVUFBd0I7UUFDaEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRFgsZUFBVSxHQUFWLFVBQVUsQ0FBYztJQUVwQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxHQUFHLENBQUMsZ0JBQXdCLEVBQUUsU0FBaUI7UUFDcEQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBbUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxFQUM1RTtZQUNFLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztZQUNqQixnQkFBZ0I7WUFDaEIsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRSxTQUFTO2FBQ2hCO1NBQ0YsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7O29HQXRCUSwwQkFBMEIsY0FFdkIsWUFBWTtrRUFGZiwwQkFBMEIsV0FBMUIsMEJBQTBCLG1CQUZ6QixNQUFNO2tEQUVQLDBCQUEwQjtjQUh0QyxVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7O3NCQUdRLE1BQU07dUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IG1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU3FIdHRwQ2xpZW50IH0gZnJvbSBcIi4vaHR0cC1jbGllbnRcIjtcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSBcIi4vaHR0cC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTVEFSVF9DT05GSUcsIFN0YXJ0Q29uZmlnIH0gZnJvbSBcIi4vc3RhcnQtY29uZmlnLndlYi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBSZWNvcmQgfSBmcm9tIFwiLi9xdWVyeS53ZWIuc2VydmljZVwiO1xuXG4vKipcbiAqIEEgc2VydmljZSBmb3IgY2FsbGluZyB0aGUgc2ltaWxhcmRvY3VtZW50cyB3ZWIgc2VydmljZVxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46IFwicm9vdFwiXG59KVxuZXhwb3J0IGNsYXNzIFNpbWlsYXJEb2N1bWVudHNXZWJTZXJ2aWNlIGV4dGVuZHMgSHR0cFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KFNUQVJUX0NPTkZJRykgc3RhcnRDb25maWc6IFN0YXJ0Q29uZmlnLFxuICAgICAgICBwcml2YXRlIGh0dHBDbGllbnQ6IFNxSHR0cENsaWVudCkge1xuICAgICAgICBzdXBlcihzdGFydENvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBhcnJheSBvZiBkb2N1bWVudHMgKHJlY29yZHMpIHNpbWlsYXIgdG8gdGhlIHBhc3NlZCBkb2N1bWVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHNvdXJjZURvY3VtZW50SWQgVGhlIGlkIG9mIHRoZSBkb2N1bWVudCBmb3Igd2hpY2ggdG8gcmV0cmlldmUgc2ltaWxhciBkb2N1bWVudHNcbiAgICAgKiBAcGFyYW0gcXVlcnlOYW1lIFRoZSBuYW1lIG9mIHRoZSBxdWVyeVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQoc291cmNlRG9jdW1lbnRJZDogc3RyaW5nLCBxdWVyeU5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8UmVjb3JkW10+IHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucG9zdDx7ZGF0YTogUmVjb3JkW119Pih0aGlzLm1ha2VVcmwoXCJzaW1pbGFyZG9jdW1lbnRzXCIpLFxuICAgICAgICB7XG4gICAgICAgICAgYXBwOiB0aGlzLmFwcE5hbWUsXG4gICAgICAgICAgc291cmNlRG9jdW1lbnRJZCxcbiAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgbmFtZTogcXVlcnlOYW1lXG4gICAgICAgICAgfVxuICAgICAgICB9KS5waXBlKG1hcCgocmVzcG9uc2UpID0+IHJlc3BvbnNlLmRhdGEpKTtcbiAgICB9XG59XG4iXX0=