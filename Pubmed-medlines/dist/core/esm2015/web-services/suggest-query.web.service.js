import { Injectable, Inject } from "@angular/core";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { HttpService } from "./http.service";
import { START_CONFIG } from "./start-config.web.service";
import * as i0 from "@angular/core";
import * as i1 from "./http-client";
/**
 * A service for calling the suggestquery web service
 */
export class SuggestQueryWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Gets suggestions for the passed text for a set of fields using the passed suggestquery web service
     *
     * @param suggestQuery The name of the suggestquery web service to use
     * @param text The text to match
     * @param query The name of the current query
     * @param fields The fields for which to return suggestions
     */
    get(suggestQuery, text, query, fields) {
        if (!suggestQuery) {
            return of([]);
        }
        else {
            const observable = this.httpClient.post(this.makeUrl("suggestquery"), {
                app: this.appName,
                suggestQuery: suggestQuery,
                text: text,
                query: query,
                kinds: fields
            });
            return observable.pipe(map(value => value.suggests));
        }
    }
}
SuggestQueryWebService.ɵfac = function SuggestQueryWebService_Factory(t) { return new (t || SuggestQueryWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.SqHttpClient)); };
SuggestQueryWebService.ɵprov = i0.ɵɵdefineInjectable({ token: SuggestQueryWebService, factory: SuggestQueryWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SuggestQueryWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.SqHttpClient }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnZ2VzdC1xdWVyeS53ZWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3dlYi1zZXJ2aWNlcy8iLCJzb3VyY2VzIjpbInN1Z2dlc3QtcXVlcnkud2ViLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFhLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxZQUFZLEVBQWMsTUFBTSw0QkFBNEIsQ0FBQzs7O0FBR3JFOztHQUVHO0FBSUgsTUFBTSxPQUFPLHNCQUF1QixTQUFRLFdBQVc7SUFDbkQsWUFDMEIsV0FBd0IsRUFDdEMsVUFBd0I7UUFDaEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRFgsZUFBVSxHQUFWLFVBQVUsQ0FBYztJQUVwQyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILEdBQUcsQ0FBQyxZQUFvQixFQUFFLElBQVksRUFBRSxLQUFhLEVBQUUsTUFBMEI7UUFDN0UsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNmLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pCO2FBQ0k7WUFDRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBMkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRTtnQkFDNUYsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNqQixZQUFZLEVBQUUsWUFBWTtnQkFDMUIsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osS0FBSyxFQUFFLE1BQU07YUFDaEIsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0wsQ0FBQzs7NEZBN0JRLHNCQUFzQixjQUVuQixZQUFZOzhEQUZmLHNCQUFzQixXQUF0QixzQkFBc0IsbUJBRm5CLE1BQU07a0RBRVQsc0JBQXNCO2NBSGxDLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7c0JBR1EsTUFBTTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge09ic2VydmFibGUsIG9mfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHttYXB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHtTcUh0dHBDbGllbnR9IGZyb20gXCIuL2h0dHAtY2xpZW50XCI7XG5pbXBvcnQge0h0dHBTZXJ2aWNlfSBmcm9tIFwiLi9odHRwLnNlcnZpY2VcIjtcbmltcG9ydCB7U1RBUlRfQ09ORklHLCBTdGFydENvbmZpZ30gZnJvbSBcIi4vc3RhcnQtY29uZmlnLndlYi5zZXJ2aWNlXCI7XG5pbXBvcnQge1N1Z2dlc3Rpb259IGZyb20gXCIuL3N1Z2dlc3Qvc3VnZ2VzdGlvblwiO1xuXG4vKipcbiAqIEEgc2VydmljZSBmb3IgY2FsbGluZyB0aGUgc3VnZ2VzdHF1ZXJ5IHdlYiBzZXJ2aWNlXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBTdWdnZXN0UXVlcnlXZWJTZXJ2aWNlIGV4dGVuZHMgSHR0cFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KFNUQVJUX0NPTkZJRykgc3RhcnRDb25maWc6IFN0YXJ0Q29uZmlnLFxuICAgICAgICBwcml2YXRlIGh0dHBDbGllbnQ6IFNxSHR0cENsaWVudCkge1xuICAgICAgICBzdXBlcihzdGFydENvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBzdWdnZXN0aW9ucyBmb3IgdGhlIHBhc3NlZCB0ZXh0IGZvciBhIHNldCBvZiBmaWVsZHMgdXNpbmcgdGhlIHBhc3NlZCBzdWdnZXN0cXVlcnkgd2ViIHNlcnZpY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzdWdnZXN0UXVlcnkgVGhlIG5hbWUgb2YgdGhlIHN1Z2dlc3RxdWVyeSB3ZWIgc2VydmljZSB0byB1c2VcbiAgICAgKiBAcGFyYW0gdGV4dCBUaGUgdGV4dCB0byBtYXRjaFxuICAgICAqIEBwYXJhbSBxdWVyeSBUaGUgbmFtZSBvZiB0aGUgY3VycmVudCBxdWVyeVxuICAgICAqIEBwYXJhbSBmaWVsZHMgVGhlIGZpZWxkcyBmb3Igd2hpY2ggdG8gcmV0dXJuIHN1Z2dlc3Rpb25zXG4gICAgICovXG4gICAgZ2V0KHN1Z2dlc3RRdWVyeTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIHF1ZXJ5OiBzdHJpbmcsIGZpZWxkcz86IHN0cmluZyB8IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxTdWdnZXN0aW9uW10+IHtcbiAgICAgICAgaWYgKCFzdWdnZXN0UXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiBvZihbXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5odHRwQ2xpZW50LnBvc3Q8e3N1Z2dlc3RzOiBTdWdnZXN0aW9uW119Pih0aGlzLm1ha2VVcmwoXCJzdWdnZXN0cXVlcnlcIiksIHtcbiAgICAgICAgICAgICAgICBhcHA6IHRoaXMuYXBwTmFtZSxcbiAgICAgICAgICAgICAgICBzdWdnZXN0UXVlcnk6IHN1Z2dlc3RRdWVyeSxcbiAgICAgICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgICAgICBraW5kczogZmllbGRzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUobWFwKHZhbHVlID0+IHZhbHVlLnN1Z2dlc3RzKSk7XG4gICAgICAgIH1cbiAgICB9XG59Il19