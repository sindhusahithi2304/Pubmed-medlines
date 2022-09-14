import { Injectable, Inject } from "@angular/core";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { HttpService } from "./http.service";
import { START_CONFIG } from "./start-config.web.service";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "./http-client";
/**
 * A service for calling the suggestfield web service
 */
export class SuggestFieldWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Gets suggestions for the passed text for a set of fields and in the context of the passed query
     *
     * @param text The text to match
     * @param fields The fields for which to return suggestions
     * @param query The query context
     */
    get(text, fields, query) {
        if (!fields) {
            return of([]);
        }
        else {
            if (!Utils.isArray(fields)) {
                fields = [fields];
            }
            const observable = this.httpClient.post(this.makeUrl("suggestfield"), {
                app: this.appName,
                text: text,
                fields: fields,
                query: query
            }).pipe(map((value) => {
                value.suggests.forEach(value => value.display = Utils.toSqlValue(value.display)); // because dates get automatically converted by the interceptor
                return value.suggests;
            }));
            return observable;
        }
    }
}
SuggestFieldWebService.ɵfac = function SuggestFieldWebService_Factory(t) { return new (t || SuggestFieldWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.SqHttpClient)); };
SuggestFieldWebService.ɵprov = i0.ɵɵdefineInjectable({ token: SuggestFieldWebService, factory: SuggestFieldWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SuggestFieldWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.SqHttpClient }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnZ2VzdC1maWVsZC53ZWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3dlYi1zZXJ2aWNlcy8iLCJzb3VyY2VzIjpbInN1Z2dlc3QtZmllbGQud2ViLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFhLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxZQUFZLEVBQWMsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7OztBQUl6Qzs7R0FFRztBQUlILE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxXQUFXO0lBQ25ELFlBQzBCLFdBQXdCLEVBQ3RDLFVBQXdCO1FBQ2hDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQURYLGVBQVUsR0FBVixVQUFVLENBQWM7SUFFcEMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEdBQUcsQ0FBQyxJQUFZLEVBQUUsTUFBeUIsRUFBRSxLQUFjO1FBQ3ZELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNqQjthQUNJO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3hCLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3JCO1lBQ0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQTJCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUU7Z0JBQzVGLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDakIsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsS0FBSyxFQUFFLEtBQUs7YUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNsQixLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLCtEQUErRDtnQkFDakosT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDSixPQUFPLFVBQVUsQ0FBQztTQUNyQjtJQUNMLENBQUM7OzRGQWpDUSxzQkFBc0IsY0FFbkIsWUFBWTs4REFGZixzQkFBc0IsV0FBdEIsc0JBQXNCLG1CQUZuQixNQUFNO2tEQUVULHNCQUFzQjtjQUhsQyxVQUFVO2VBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7O3NCQUdRLE1BQU07dUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBvZn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7bWFwfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCB7U3FIdHRwQ2xpZW50fSBmcm9tIFwiLi9odHRwLWNsaWVudFwiO1xuaW1wb3J0IHtIdHRwU2VydmljZX0gZnJvbSBcIi4vaHR0cC5zZXJ2aWNlXCI7XG5pbXBvcnQge1NUQVJUX0NPTkZJRywgU3RhcnRDb25maWd9IGZyb20gXCIuL3N0YXJ0LWNvbmZpZy53ZWIuc2VydmljZVwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHtTdWdnZXN0aW9ufSBmcm9tIFwiLi9zdWdnZXN0L3N1Z2dlc3Rpb25cIjtcbmltcG9ydCB7SVF1ZXJ5fSBmcm9tIFwiLi9xdWVyeS9xdWVyeVwiO1xuXG4vKipcbiAqIEEgc2VydmljZSBmb3IgY2FsbGluZyB0aGUgc3VnZ2VzdGZpZWxkIHdlYiBzZXJ2aWNlXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBTdWdnZXN0RmllbGRXZWJTZXJ2aWNlIGV4dGVuZHMgSHR0cFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KFNUQVJUX0NPTkZJRykgc3RhcnRDb25maWc6IFN0YXJ0Q29uZmlnLFxuICAgICAgICBwcml2YXRlIGh0dHBDbGllbnQ6IFNxSHR0cENsaWVudCkge1xuICAgICAgICBzdXBlcihzdGFydENvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBzdWdnZXN0aW9ucyBmb3IgdGhlIHBhc3NlZCB0ZXh0IGZvciBhIHNldCBvZiBmaWVsZHMgYW5kIGluIHRoZSBjb250ZXh0IG9mIHRoZSBwYXNzZWQgcXVlcnlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0IFRoZSB0ZXh0IHRvIG1hdGNoXG4gICAgICogQHBhcmFtIGZpZWxkcyBUaGUgZmllbGRzIGZvciB3aGljaCB0byByZXR1cm4gc3VnZ2VzdGlvbnNcbiAgICAgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IGNvbnRleHRcbiAgICAgKi9cbiAgICBnZXQodGV4dDogc3RyaW5nLCBmaWVsZHM6IHN0cmluZyB8IHN0cmluZ1tdLCBxdWVyeT86IElRdWVyeSk6IE9ic2VydmFibGU8U3VnZ2VzdGlvbltdPiB7XG4gICAgICAgIGlmICghZmllbGRzKSB7XG4gICAgICAgICAgICByZXR1cm4gb2YoW10pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFVdGlscy5pc0FycmF5KGZpZWxkcykpIHtcbiAgICAgICAgICAgICAgICBmaWVsZHMgPSBbZmllbGRzXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSB0aGlzLmh0dHBDbGllbnQucG9zdDx7c3VnZ2VzdHM6IFN1Z2dlc3Rpb25bXX0+KHRoaXMubWFrZVVybChcInN1Z2dlc3RmaWVsZFwiKSwge1xuICAgICAgICAgICAgICAgIGFwcDogdGhpcy5hcHBOYW1lLFxuICAgICAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICAgICAgZmllbGRzOiBmaWVsZHMsXG4gICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5XG4gICAgICAgICAgICB9KS5waXBlKG1hcCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5zdWdnZXN0cy5mb3JFYWNoKHZhbHVlID0+IHZhbHVlLmRpc3BsYXkgPSBVdGlscy50b1NxbFZhbHVlKHZhbHVlLmRpc3BsYXkpKTsgLy8gYmVjYXVzZSBkYXRlcyBnZXQgYXV0b21hdGljYWxseSBjb252ZXJ0ZWQgYnkgdGhlIGludGVyY2VwdG9yXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnN1Z2dlc3RzO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgICAgIH1cbiAgICB9XG59Il19