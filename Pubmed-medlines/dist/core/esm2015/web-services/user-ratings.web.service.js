import { Injectable, Inject } from "@angular/core";
import { tap } from "rxjs/operators";
import { HttpService } from "./http.service";
import { START_CONFIG } from "./start-config.web.service";
import * as i0 from "@angular/core";
import * as i1 from "./http-client";
/**
 * A service for calling the ratings web service
 */
export class UserRatingsWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Gets the current user rating for a document
     *
     * @param docid The id of a document for which to get the rating
     * @param config The ratings configuration
     */
    getRating(docid, config) {
        return this.httpClient.post(this.makeUrl("ratings"), {
            action: "get",
            docid,
            ratingscolumn: config.ratingsColumn,
            averagecolumn: config.averageColumn,
            ratingsdistribution: config.ratingsDistribution
        }).pipe(tap(r => { }, error => console.log("ratingsService.getRating failure - error: ", error)));
    }
    /**
     * Sets the current user rating for a document
     *
     * @param record The document for which to set the rating
     * @param rating A rating value
     * @param config The ratings configuration
     */
    setRating(record, rating, config) {
        const ratingResponse = this.getRecordRating(record, config);
        const observable = this.httpClient.post(this.makeUrl("ratings"), {
            action: "set",
            docid: record.id,
            ratingscolumn: config.ratingsColumn,
            averagecolumn: config.averageColumn,
            ratingsdistribution: config.ratingsDistribution,
            updatedocweight: config.updateDocWeight,
            rating,
            $auditRecord: {
                auditEvents: [
                    {
                        type: "Rating_Set" /* Rating_Set */,
                        detail: {
                            "doc-id": record.id,
                            ratingnum: rating,
                            value: ratingResponse.rating,
                            average: ratingResponse.averagerating
                        }
                    }
                ],
                mlAuditEvents: [
                    {
                        actionType: "addRating",
                        documentIds: record.id
                    }
                ]
            }
        });
        observable.subscribe(response => response, error => console.log("ratingsService.setRating failure - error: ", error));
        return observable;
    }
    /**
     * Delete a rating for a document
     *
     * @param record The document for which to delete the rating
     * @param config The ratings configuration
     */
    deleteRating(record, config) {
        const ratingResponse = this.getRecordRating(record, config);
        const observable = this.httpClient.post(this.makeUrl("ratings"), {
            action: "delete",
            docid: record.id,
            ratingscolumn: config.ratingsColumn,
            averagecolumn: config.averageColumn,
            ratingsdistribution: config.ratingsDistribution,
            updatedocweight: config.updateDocWeight,
            $auditRecord: {
                auditEvents: [
                    {
                        type: "Rating_Delete" /* Rating_Delete */,
                        detail: {
                            "doc-id": record.id,
                            value: ratingResponse.rating,
                            average: ratingResponse.averagerating
                        }
                    }
                ],
                mlAuditEvents: [
                    {
                        actionType: "removeRating",
                        documentIds: record.id
                    }
                ]
            }
        });
        observable.subscribe(response => response, error => console.log("ratingsService.deleteRating failure - error: ", error));
        return observable;
    }
    /**
     * Gets user rating information from the given record
     *
     * @param record The record for which to get the rating
     * @param config The ratings configuration
     */
    getRecordRating(record, config) {
        return {
            rating: this.parseUserRating(record[config.ratingsColumn], config),
            averagerating: this.parseAverageRating(record[config.averageColumn], config)
        };
    }
    parseAverageRating(columnEntries, config) {
        if (config.ratingsDistribution && columnEntries) {
            return config.ratingsDistribution.indexOf(columnEntries[0]);
        }
        else {
            return -1;
        }
    }
    parseUserRating(ratingValues, config) {
        if (ratingValues) {
            if (config.ratingsDistribution) {
                return config.ratingsDistribution.indexOf(ratingValues[0]);
            }
        }
        return -1;
    }
}
UserRatingsWebService.ɵfac = function UserRatingsWebService_Factory(t) { return new (t || UserRatingsWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.SqHttpClient)); };
UserRatingsWebService.ɵprov = i0.ɵɵdefineInjectable({ token: UserRatingsWebService, factory: UserRatingsWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(UserRatingsWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.SqHttpClient }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yYXRpbmdzLndlYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvd2ViLXNlcnZpY2VzLyIsInNvdXJjZXMiOlsidXNlci1yYXRpbmdzLndlYi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuQyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLFlBQVksRUFBYyxNQUFNLDRCQUE0QixDQUFDOzs7QUF3QnJFOztHQUVHO0FBSUgsTUFBTSxPQUFPLHFCQUFzQixTQUFRLFdBQVc7SUFDbEQsWUFDMEIsV0FBd0IsRUFDdEMsVUFBd0I7UUFDaEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRFgsZUFBVSxHQUFWLFVBQVUsQ0FBYztJQUVwQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxTQUFTLENBQUMsS0FBYSxFQUFFLE1BQWdCO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQXFCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDckUsTUFBTSxFQUFFLEtBQUs7WUFDYixLQUFLO1lBQ0wsYUFBYSxFQUFFLE1BQU0sQ0FBQyxhQUFhO1lBQ25DLGFBQWEsRUFBRSxNQUFNLENBQUMsYUFBYTtZQUNuQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsbUJBQW1CO1NBQ2xELENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUNQLENBQUMsQ0FBQyxFQUFFLEdBQUUsQ0FBQyxFQUNQLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsRUFBRSxLQUFLLENBQUMsQ0FDNUUsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVE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TSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxNQUFNLENBQUM7WUFDbEUsYUFBYSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE1BQU0sQ0FBQztTQUMvRSxDQUFDO0lBQ04sQ0FBQztJQUVPLGtCQUFrQixDQUFDLGFBQXVCLEVBQUUsTUFBZ0I7UUFDaEUsSUFBSSxNQUFNLENBQUMsbUJBQW1CLElBQUksYUFBYSxFQUFFO1lBQzdDLE9BQU8sTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvRDthQUNJO1lBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNiO0lBQ0wsQ0FBQztJQUVPLGVBQWUsQ0FBQyxZQUFzQixFQUFFLE1BQWdCO1FBQzVELElBQUcsWUFBWSxFQUFFO1lBQ2IsSUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzVCLE9BQU8sTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5RDtTQUNKO1FBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNkLENBQUM7OzBGQWhKUSxxQkFBcUIsY0FFbEIsWUFBWTs2REFGZixxQkFBcUIsV0FBckIscUJBQXFCLG1CQUZsQixNQUFNO2tEQUVULHFCQUFxQjtjQUhqQyxVQUFVO2VBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7O3NCQUdRLE1BQU07dUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHt0YXB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHtTcUh0dHBDbGllbnR9IGZyb20gXCIuL2h0dHAtY2xpZW50XCI7XG5pbXBvcnQge0h0dHBTZXJ2aWNlfSBmcm9tIFwiLi9odHRwLnNlcnZpY2VcIjtcbmltcG9ydCB7U1RBUlRfQ09ORklHLCBTdGFydENvbmZpZ30gZnJvbSBcIi4vc3RhcnQtY29uZmlnLndlYi5zZXJ2aWNlXCI7XG5pbXBvcnQge1JlY29yZH0gZnJvbSBcIi4vcXVlcnkud2ViLnNlcnZpY2VcIjtcbmltcG9ydCB7QXVkaXRFdmVudFR5cGV9IGZyb20gXCIuL2F1ZGl0LndlYi5zZXJ2aWNlXCI7XG5cbi8qKlxuICogRGVzY3JpYmVzIGEgcmF0aW5nIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ0NSYXRpbmcge1xuICAgIHJhdGluZ3NDb2x1bW46IHN0cmluZztcbiAgICBhdmVyYWdlQ29sdW1uOiBzdHJpbmc7XG5cbiAgICB1cGRhdGVEb2NXZWlnaHQ6IGJvb2xlYW47XG5cbiAgICByYXRpbmdzRGlzdHJpYnV0aW9uOiBzdHJpbmdbXTtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgYSB1c2VyIHJhdGluZyByZXNwb25zZSBvYmplY3RcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBVc2VyUmF0aW5nUmVzcG9uc2Uge1xuICAgIHJhdGluZzogbnVtYmVyO1xuICAgIGF2ZXJhZ2VyYXRpbmc6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBBIHNlcnZpY2UgZm9yIGNhbGxpbmcgdGhlIHJhdGluZ3Mgd2ViIHNlcnZpY2VcbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46IFwicm9vdFwiXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJSYXRpbmdzV2ViU2VydmljZSBleHRlbmRzIEh0dHBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChTVEFSVF9DT05GSUcpIHN0YXJ0Q29uZmlnOiBTdGFydENvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBTcUh0dHBDbGllbnQpIHtcbiAgICAgICAgc3VwZXIoc3RhcnRDb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgdXNlciByYXRpbmcgZm9yIGEgZG9jdW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBkb2NpZCBUaGUgaWQgb2YgYSBkb2N1bWVudCBmb3Igd2hpY2ggdG8gZ2V0IHRoZSByYXRpbmdcbiAgICAgKiBAcGFyYW0gY29uZmlnIFRoZSByYXRpbmdzIGNvbmZpZ3VyYXRpb25cbiAgICAgKi9cbiAgICBnZXRSYXRpbmcoZG9jaWQ6IHN0cmluZywgY29uZmlnOiBDQ1JhdGluZyk6IE9ic2VydmFibGU8VXNlclJhdGluZ1Jlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucG9zdDxVc2VyUmF0aW5nUmVzcG9uc2U+KHRoaXMubWFrZVVybChcInJhdGluZ3NcIiksIHtcbiAgICAgICAgICAgIGFjdGlvbjogXCJnZXRcIixcbiAgICAgICAgICAgIGRvY2lkLFxuICAgICAgICAgICAgcmF0aW5nc2NvbHVtbjogY29uZmlnLnJhdGluZ3NDb2x1bW4sXG4gICAgICAgICAgICBhdmVyYWdlY29sdW1uOiBjb25maWcuYXZlcmFnZUNvbHVtbixcbiAgICAgICAgICAgIHJhdGluZ3NkaXN0cmlidXRpb246IGNvbmZpZy5yYXRpbmdzRGlzdHJpYnV0aW9uXG4gICAgICAgIH0pLnBpcGUodGFwKFxuICAgICAgICAgICAgciA9PiB7fSxcbiAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUubG9nKFwicmF0aW5nc1NlcnZpY2UuZ2V0UmF0aW5nIGZhaWx1cmUgLSBlcnJvcjogXCIsIGVycm9yKVxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHVzZXIgcmF0aW5nIGZvciBhIGRvY3VtZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVjb3JkIFRoZSBkb2N1bWVudCBmb3Igd2hpY2ggdG8gc2V0IHRoZSByYXRpbmdcbiAgICAgKiBAcGFyYW0gcmF0aW5nIEEgcmF0aW5nIHZhbHVlXG4gICAgICogQHBhcmFtIGNvbmZpZyBUaGUgcmF0aW5ncyBjb25maWd1cmF0aW9uXG4gICAgICovXG4gICAgc2V0UmF0aW5nKHJlY29yZDogUmVjb3JkLCByYXRpbmc6IG51bWJlciwgY29uZmlnOiBDQ1JhdGluZyk6IE9ic2VydmFibGU8VXNlclJhdGluZ1Jlc3BvbnNlPiB7XG4gICAgICAgIGNvbnN0IHJhdGluZ1Jlc3BvbnNlID0gdGhpcy5nZXRSZWNvcmRSYXRpbmcocmVjb3JkLCBjb25maWcpO1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5odHRwQ2xpZW50LnBvc3Q8VXNlclJhdGluZ1Jlc3BvbnNlPih0aGlzLm1ha2VVcmwoXCJyYXRpbmdzXCIpLCB7XG4gICAgICAgICAgICBhY3Rpb246IFwic2V0XCIsXG4gICAgICAgICAgICBkb2NpZDogcmVjb3JkLmlkLFxuICAgICAgICAgICAgcmF0aW5nc2NvbHVtbjogY29uZmlnLnJhdGluZ3NDb2x1bW4sXG4gICAgICAgICAgICBhdmVyYWdlY29sdW1uOiBjb25maWcuYXZlcmFnZUNvbHVtbixcbiAgICAgICAgICAgIHJhdGluZ3NkaXN0cmlidXRpb246IGNvbmZpZy5yYXRpbmdzRGlzdHJpYnV0aW9uLFxuICAgICAgICAgICAgdXBkYXRlZG9jd2VpZ2h0OiBjb25maWcudXBkYXRlRG9jV2VpZ2h0LFxuICAgICAgICAgICAgcmF0aW5nLFxuICAgICAgICAgICAgJGF1ZGl0UmVjb3JkOiB7XG4gICAgICAgICAgICAgICAgYXVkaXRFdmVudHM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogQXVkaXRFdmVudFR5cGUuUmF0aW5nX1NldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZG9jLWlkXCI6IHJlY29yZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdudW06IHJhdGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmF0aW5nUmVzcG9uc2UucmF0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2ZXJhZ2U6IHJhdGluZ1Jlc3BvbnNlLmF2ZXJhZ2VyYXRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgbWxBdWRpdEV2ZW50czogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25UeXBlOiBcImFkZFJhdGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRJZHM6IHJlY29yZC5pZFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZShcbiAgICAgICAgICAgIHJlc3BvbnNlID0+IHJlc3BvbnNlLFxuICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5sb2coXCJyYXRpbmdzU2VydmljZS5zZXRSYXRpbmcgZmFpbHVyZSAtIGVycm9yOiBcIiwgZXJyb3IpXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIGEgcmF0aW5nIGZvciBhIGRvY3VtZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVjb3JkIFRoZSBkb2N1bWVudCBmb3Igd2hpY2ggdG8gZGVsZXRlIHRoZSByYXRpbmdcbiAgICAgKiBAcGFyYW0gY29uZmlnIFRoZSByYXRpbmdzIGNvbmZpZ3VyYXRpb25cbiAgICAgKi9cbiAgICBkZWxldGVSYXRpbmcocmVjb3JkOiBSZWNvcmQsIGNvbmZpZzogQ0NSYXRpbmcpOiBPYnNlcnZhYmxlPFVzZXJSYXRpbmdSZXNwb25zZT4ge1xuICAgICAgICBjb25zdCByYXRpbmdSZXNwb25zZSA9IHRoaXMuZ2V0UmVjb3JkUmF0aW5nKHJlY29yZCwgY29uZmlnKTtcbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cENsaWVudC5wb3N0PFVzZXJSYXRpbmdSZXNwb25zZT4odGhpcy5tYWtlVXJsKFwicmF0aW5nc1wiKSwge1xuICAgICAgICAgICAgYWN0aW9uOiBcImRlbGV0ZVwiLFxuICAgICAgICAgICAgZG9jaWQ6IHJlY29yZC5pZCxcbiAgICAgICAgICAgIHJhdGluZ3Njb2x1bW46IGNvbmZpZy5yYXRpbmdzQ29sdW1uLFxuICAgICAgICAgICAgYXZlcmFnZWNvbHVtbjogY29uZmlnLmF2ZXJhZ2VDb2x1bW4sXG4gICAgICAgICAgICByYXRpbmdzZGlzdHJpYnV0aW9uOiBjb25maWcucmF0aW5nc0Rpc3RyaWJ1dGlvbixcbiAgICAgICAgICAgIHVwZGF0ZWRvY3dlaWdodDogY29uZmlnLnVwZGF0ZURvY1dlaWdodCxcbiAgICAgICAgICAgICRhdWRpdFJlY29yZDoge1xuICAgICAgICAgICAgICAgIGF1ZGl0RXZlbnRzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEF1ZGl0RXZlbnRUeXBlLlJhdGluZ19EZWxldGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRvYy1pZFwiOiByZWNvcmQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJhdGluZ1Jlc3BvbnNlLnJhdGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmVyYWdlOiByYXRpbmdSZXNwb25zZS5hdmVyYWdlcmF0aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIG1sQXVkaXRFdmVudHM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uVHlwZTogXCJyZW1vdmVSYXRpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50SWRzOiByZWNvcmQuaWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoXG4gICAgICAgICAgICByZXNwb25zZSA9PiByZXNwb25zZSxcbiAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUubG9nKFwicmF0aW5nc1NlcnZpY2UuZGVsZXRlUmF0aW5nIGZhaWx1cmUgLSBlcnJvcjogXCIsIGVycm9yKVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdXNlciByYXRpbmcgaW5mb3JtYXRpb24gZnJvbSB0aGUgZ2l2ZW4gcmVjb3JkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVjb3JkIFRoZSByZWNvcmQgZm9yIHdoaWNoIHRvIGdldCB0aGUgcmF0aW5nXG4gICAgICogQHBhcmFtIGNvbmZpZyBUaGUgcmF0aW5ncyBjb25maWd1cmF0aW9uXG4gICAgICovXG4gICAgZ2V0UmVjb3JkUmF0aW5nKHJlY29yZDogUmVjb3JkLCBjb25maWc6IENDUmF0aW5nKTogVXNlclJhdGluZ1Jlc3BvbnNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJhdGluZzogdGhpcy5wYXJzZVVzZXJSYXRpbmcocmVjb3JkW2NvbmZpZy5yYXRpbmdzQ29sdW1uXSwgY29uZmlnKSxcbiAgICAgICAgICAgIGF2ZXJhZ2VyYXRpbmc6IHRoaXMucGFyc2VBdmVyYWdlUmF0aW5nKHJlY29yZFtjb25maWcuYXZlcmFnZUNvbHVtbl0sIGNvbmZpZylcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlQXZlcmFnZVJhdGluZyhjb2x1bW5FbnRyaWVzOiBzdHJpbmdbXSwgY29uZmlnOiBDQ1JhdGluZyk6IG51bWJlciB7XG4gICAgICAgIGlmIChjb25maWcucmF0aW5nc0Rpc3RyaWJ1dGlvbiAmJiBjb2x1bW5FbnRyaWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uZmlnLnJhdGluZ3NEaXN0cmlidXRpb24uaW5kZXhPZihjb2x1bW5FbnRyaWVzWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VVc2VyUmF0aW5nKHJhdGluZ1ZhbHVlczogc3RyaW5nW10sIGNvbmZpZzogQ0NSYXRpbmcpOiBudW1iZXIge1xuICAgICAgICBpZihyYXRpbmdWYWx1ZXMpIHtcbiAgICAgICAgICAgIGlmIChjb25maWcucmF0aW5nc0Rpc3RyaWJ1dGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWcucmF0aW5nc0Rpc3RyaWJ1dGlvbi5pbmRleE9mKHJhdGluZ1ZhbHVlc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbn1cbiJdfQ==