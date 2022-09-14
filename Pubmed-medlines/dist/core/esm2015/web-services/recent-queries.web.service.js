import { Injectable, Inject } from "@angular/core";
import { HttpService } from "./http.service";
import { START_CONFIG } from "./start-config.web.service";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "./http-client";
export class RecentQueriesList {
    constructor(name) {
        this.name = name;
        this.queries = []; // Make sure to have at least a valid "queries" member, to simplify tests in GUI code.
    }
}
export class RecentQueries {
}
export class RecentQueriesWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    load() {
        const observable = this.httpClient.get(this.makeUrl("recentqueries"), {
            params: this.makeParams({
                app: this.appName,
                action: "load"
            })
        });
        Utils.subscribe(observable, (response) => {
            this.recentQueries = response;
            if (!this.recentQueries)
                this.recentQueries = new RecentQueries();
            if (this.recentQueries) {
                if (!this.recentQueries.app)
                    this.recentQueries.app = new RecentQueriesList(this.appName);
                if (!this.recentQueries.user)
                    this.recentQueries.user = new RecentQueriesList("currentuser");
            }
            console.log("recentQueriesService.load success - data: ", response);
            return response;
        }, (error) => {
            console.log("recentQueriesService.load failure - error: ", error);
        });
        return observable;
    }
    // No save/patch action for the recent queries: MRU lists are generated server side when the query is executed.
    appRecentQueries() {
        if (this.recentQueries && this.recentQueries.app && this.recentQueries.app.queries)
            return this.recentQueries.app.queries;
        else {
            return [];
        }
    }
    appRecentQueriesLength() {
        if (this.recentQueries && this.recentQueries.app && this.recentQueries.app.queries)
            return this.recentQueries.app.queries.length;
        else
            return 0;
    }
    userRecentQueries() {
        if (this.recentQueries && this.recentQueries.user && this.recentQueries.user.queries)
            return this.recentQueries.user.queries;
        else {
            return [];
        }
    }
    userRecentQueriesLength() {
        if (this.recentQueries && this.recentQueries.user && this.recentQueries.user.queries)
            return this.recentQueries.user.queries.length;
        else
            return 0;
    }
}
RecentQueriesWebService.ɵfac = function RecentQueriesWebService_Factory(t) { return new (t || RecentQueriesWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.SqHttpClient)); };
RecentQueriesWebService.ɵprov = i0.ɵɵdefineInjectable({ token: RecentQueriesWebService, factory: RecentQueriesWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(RecentQueriesWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.SqHttpClient }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjZW50LXF1ZXJpZXMud2ViLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS93ZWItc2VydmljZXMvIiwic291cmNlcyI6WyJyZWNlbnQtcXVlcmllcy53ZWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUdqRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLFlBQVksRUFBYyxNQUFNLDRCQUE0QixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBR3pDLE1BQU0sT0FBTyxpQkFBaUI7SUFDMUIsWUFBWSxJQUFZO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsc0ZBQXNGO0lBQzdHLENBQUM7Q0FHSjtBQUVELE1BQU0sT0FBTyxhQUFhO0NBR3pCO0FBS0QsTUFBTSxPQUFPLHVCQUF3QixTQUFRLFdBQVc7SUFHcEQsWUFDMEIsV0FBd0IsRUFDdEMsVUFBd0I7UUFDaEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRFgsZUFBVSxHQUFWLFVBQVUsQ0FBYztJQUVwQyxDQUFDO0lBRUQsSUFBSTtRQUNBLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFnQixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ2pGLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNwQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ2pCLE1BQU0sRUFBRSxNQUFNO2FBQ2pCLENBQUM7U0FDTCxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFDdEIsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNULElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYTtnQkFDbkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1lBQzdDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRztvQkFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUk7b0JBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDdEU7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3BFLE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUMsRUFDRCxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RSxDQUFDLENBQUMsQ0FBQztRQUNQLE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFDRCwrR0FBK0c7SUFFL0csZ0JBQWdCO1FBQ1osSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU87WUFDOUUsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7YUFDckM7WUFDRCxPQUFPLEVBQUUsQ0FBQztTQUNiO0lBQ0wsQ0FBQztJQUVELHNCQUFzQjtRQUNsQixJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTztZQUM5RSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7O1lBRTdDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxpQkFBaUI7UUFDYixJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTztZQUNoRixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUN0QztZQUNELE9BQU8sRUFBRSxDQUFDO1NBQ2I7SUFDTCxDQUFDO0lBRUQsdUJBQXVCO1FBQ25CLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQ2hGLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzs7WUFFOUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQzs7OEZBakVRLHVCQUF1QixjQUlwQixZQUFZOytEQUpmLHVCQUF1QixXQUF2Qix1QkFBdUIsbUJBRnBCLE1BQU07a0RBRVQsdUJBQXVCO2NBSG5DLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7c0JBS1EsTUFBTTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1NxSHR0cENsaWVudH0gZnJvbSBcIi4vaHR0cC1jbGllbnRcIjtcbmltcG9ydCB7SHR0cFNlcnZpY2V9IGZyb20gXCIuL2h0dHAuc2VydmljZVwiO1xuaW1wb3J0IHtTVEFSVF9DT05GSUcsIFN0YXJ0Q29uZmlnfSBmcm9tIFwiLi9zdGFydC1jb25maWcud2ViLnNlcnZpY2VcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7SVF1ZXJ5fSBmcm9tIFwiLi9xdWVyeS9xdWVyeVwiO1xuXG5leHBvcnQgY2xhc3MgUmVjZW50UXVlcmllc0xpc3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnF1ZXJpZXMgPSBbXTtcdC8vIE1ha2Ugc3VyZSB0byBoYXZlIGF0IGxlYXN0IGEgdmFsaWQgXCJxdWVyaWVzXCIgbWVtYmVyLCB0byBzaW1wbGlmeSB0ZXN0cyBpbiBHVUkgY29kZS5cbiAgICB9XG4gICAgbmFtZTogc3RyaW5nO1x0XHQvLyBBcHAgbmFtZSBvciB1c2VyIG5hbWUgdGhlIHF1ZXJpZXMgYXJlIHJlbGF0ZWQgdG8uXG4gICAgcXVlcmllczogSVF1ZXJ5W107XG59XG5cbmV4cG9ydCBjbGFzcyBSZWNlbnRRdWVyaWVzIHtcbiAgICBhcHA/OiBSZWNlbnRRdWVyaWVzTGlzdDtcbiAgICB1c2VyPzogUmVjZW50UXVlcmllc0xpc3Q7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBSZWNlbnRRdWVyaWVzV2ViU2VydmljZSBleHRlbmRzIEh0dHBTZXJ2aWNlIHtcbiAgICByZWNlbnRRdWVyaWVzOiBSZWNlbnRRdWVyaWVzO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoU1RBUlRfQ09ORklHKSBzdGFydENvbmZpZzogU3RhcnRDb25maWcsXG4gICAgICAgIHByaXZhdGUgaHR0cENsaWVudDogU3FIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKHN0YXJ0Q29uZmlnKTtcbiAgICB9XG5cbiAgICBsb2FkKCk6IE9ic2VydmFibGU8UmVjZW50UXVlcmllcz4ge1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5odHRwQ2xpZW50LmdldDxSZWNlbnRRdWVyaWVzPih0aGlzLm1ha2VVcmwoXCJyZWNlbnRxdWVyaWVzXCIpLCB7XG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMubWFrZVBhcmFtcyh7XG4gICAgICAgICAgICAgICAgYXBwOiB0aGlzLmFwcE5hbWUsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBcImxvYWRcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIFV0aWxzLnN1YnNjcmliZShvYnNlcnZhYmxlLFxuICAgICAgICAgICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNlbnRRdWVyaWVzID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJlY2VudFF1ZXJpZXMpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVjZW50UXVlcmllcyA9IG5ldyBSZWNlbnRRdWVyaWVzKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVjZW50UXVlcmllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucmVjZW50UXVlcmllcy5hcHApXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY2VudFF1ZXJpZXMuYXBwID0gbmV3IFJlY2VudFF1ZXJpZXNMaXN0KHRoaXMuYXBwTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZWNlbnRRdWVyaWVzLnVzZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY2VudFF1ZXJpZXMudXNlciA9IG5ldyBSZWNlbnRRdWVyaWVzTGlzdChcImN1cnJlbnR1c2VyXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VudFF1ZXJpZXNTZXJ2aWNlLmxvYWQgc3VjY2VzcyAtIGRhdGE6IFwiLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZW50UXVlcmllc1NlcnZpY2UubG9hZCBmYWlsdXJlIC0gZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfVxuICAgIC8vIE5vIHNhdmUvcGF0Y2ggYWN0aW9uIGZvciB0aGUgcmVjZW50IHF1ZXJpZXM6IE1SVSBsaXN0cyBhcmUgZ2VuZXJhdGVkIHNlcnZlciBzaWRlIHdoZW4gdGhlIHF1ZXJ5IGlzIGV4ZWN1dGVkLlxuXG4gICAgYXBwUmVjZW50UXVlcmllcygpOiBJUXVlcnlbXXtcbiAgICAgICAgaWYgKHRoaXMucmVjZW50UXVlcmllcyAmJiB0aGlzLnJlY2VudFF1ZXJpZXMuYXBwICYmIHRoaXMucmVjZW50UXVlcmllcy5hcHAucXVlcmllcylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlY2VudFF1ZXJpZXMuYXBwLnF1ZXJpZXM7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwUmVjZW50UXVlcmllc0xlbmd0aCgpOiBudW1iZXJ7XG4gICAgICAgIGlmICh0aGlzLnJlY2VudFF1ZXJpZXMgJiYgdGhpcy5yZWNlbnRRdWVyaWVzLmFwcCAmJiB0aGlzLnJlY2VudFF1ZXJpZXMuYXBwLnF1ZXJpZXMpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWNlbnRRdWVyaWVzLmFwcC5xdWVyaWVzLmxlbmd0aDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgdXNlclJlY2VudFF1ZXJpZXMoKTogSVF1ZXJ5W117XG4gICAgICAgIGlmICh0aGlzLnJlY2VudFF1ZXJpZXMgJiYgdGhpcy5yZWNlbnRRdWVyaWVzLnVzZXIgJiYgdGhpcy5yZWNlbnRRdWVyaWVzLnVzZXIucXVlcmllcylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlY2VudFF1ZXJpZXMudXNlci5xdWVyaWVzO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVzZXJSZWNlbnRRdWVyaWVzTGVuZ3RoKCk6IG51bWJlcntcbiAgICAgICAgaWYgKHRoaXMucmVjZW50UXVlcmllcyAmJiB0aGlzLnJlY2VudFF1ZXJpZXMudXNlciAmJiB0aGlzLnJlY2VudFF1ZXJpZXMudXNlci5xdWVyaWVzKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVjZW50UXVlcmllcy51c2VyLnF1ZXJpZXMubGVuZ3RoO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICB9XG59Il19