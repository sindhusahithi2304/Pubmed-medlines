import { Injectable, Optional, Inject, InjectionToken } from "@angular/core";
import { Subject } from "rxjs";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/web-services";
import * as i2 from "@sinequa/components/search";
// Types of events triggering a change event
export const RECENT_QUERIES_CHANGE_EVENTS = [
    "RecentQuery_Add" /* Add */,
    "RecentQuery_Update" /* Update */,
    "RecentQuery_Delete" /* Delete */,
];
export const MAX_QUERIES = new InjectionToken("MAX_QUERIES");
export class RecentQueriesService {
    constructor(userSettingsService, searchService, maxQueries) {
        this.userSettingsService = userSettingsService;
        this.searchService = searchService;
        this.maxQueries = maxQueries;
        this._events = new Subject();
        this._changes = new Subject();
        if (!this.maxQueries) {
            this.maxQueries = 20;
        }
        // Listen to the user settings
        this.userSettingsService.events.subscribe(event => {
            // E.g. new login occurs
            // ==> Revive dates
            this.recentqueries.forEach(rq => {
                if (Utils.isString(rq.date)) {
                    const date = Utils.toDate(rq.date);
                    if (date) {
                        rq.date = date;
                    }
                }
            });
            // ==> Menus need to be rebuilt
            this._events.next({ type: "RecentQuery_Loaded" /* Loaded */ });
        });
        // Listen to own events, to trigger change events
        this._events.subscribe(event => {
            if (RECENT_QUERIES_CHANGE_EVENTS.indexOf(event.type) !== -1) {
                this.changes.next(event);
            }
        });
        // Listen to search service and store queries
        this.searchService.queryStream.subscribe((query) => {
            if (query) {
                this.addRecentQuery({ query: query.copy(), date: new Date() });
            }
        });
    }
    // GETTERS
    /**
     * Returns the list of this user's recent queries.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of recent queries if it does not already exist.
     */
    get recentqueries() {
        if (!this.userSettingsService.userSettings)
            this.userSettingsService.userSettings = {};
        if (!this.userSettingsService.userSettings["recentQueries"])
            this.userSettingsService.userSettings["recentQueries"] = [];
        return this.userSettingsService.userSettings["recentQueries"];
    }
    /**
     * Triggers any event among RecentQueryChangeEvent
     * (use for fine-grained control of recent queries workflow)
     */
    get events() {
        return this._events;
    }
    /**
     * Triggers when events affect the list of recent queries
     * (use to refresh recent queries menus)
     * Cf. CHANGE_EVENTS list
     */
    get changes() {
        return this._changes;
    }
    /**
     * @returns true if there is at least one recent query
     */
    get hasRecentQuery() {
        return this.recentqueries.length > 0;
    }
    /**
     * @returns a recent query with the given name or undefined if it does not exist
     * @param name
     */
    recentquery(text) {
        const i = this.recentqueryIndex(text);
        return i >= 0 ? this.recentqueries[i] : undefined;
    }
    recentqueryIndex(text) {
        for (let i = 0, ic = this.recentqueries.length; i < ic; i++) {
            const recentquery = this.recentqueries[i];
            if (recentquery && recentquery.query.text && recentquery.query.text.toLowerCase() === text.toLowerCase()) {
                return i;
            }
        }
        return -1;
    }
    comparator(q1, q2) {
        return q2.date.getTime() - q1.date.getTime();
    }
    // CRUD
    /**
     * Creates a new recent query unless it already exists, in which case the existing query is updated.
     * Emits an recentquery event.
     * Update the data on the server.
     * @param recentquery the recentquery to create
     * @returns true if recentquery was created
     */
    addRecentQuery(recentquery) {
        if (!recentquery.query || !recentquery.query.text || recentquery.query.text.trim() === '') {
            return false;
        }
        const i = this.recentqueryIndex(recentquery.query.text); // If the query already exists
        if (i >= 0) {
            // Ignore identical queries issued within a certain time window (1s)
            // to avoid flooding the server. NB the request flooding mitigation in
            // SqHttpClient will not work in this case as the request payload includes
            // a timestamp
            if (Math.abs(recentquery.date.getTime() - this.recentqueries[i].date.getTime()) < 1000) {
                if (Utils.equals(this.recentqueries[i].query, recentquery.query)) {
                    return false;
                }
            }
            this.recentqueries[i].date = recentquery.date; // Update the date of the existing query
            this.recentqueries[i].query = recentquery.query;
            this._events.next({ type: "RecentQuery_Update" /* Update */, recentquery: this.recentqueries[i] });
        }
        else {
            this.recentqueries.push(recentquery);
            this._events.next({ type: "RecentQuery_Add" /* Add */, recentquery });
        }
        // Sort the list
        this.recentqueries.sort(this.comparator);
        // Truncate the list
        if (this.maxQueries >= 0)
            this.recentqueries.splice(this.maxQueries);
        this.patchRecentQueries(); // No need to emit an "Add" audit event, since it is redundant with the main search API
        return true;
    }
    /**
     * Deletes the given RecentQuery (based on its name)
     * Emits an RecentQuery event.
     * Update the data on the server.
     * @param recentquery
     * @returns true if recent query was deleted
     */
    deleteRecentQuery(recentquery) {
        const index = this.recentqueryIndex(recentquery.query.text || "");
        if (index === -1)
            return false; // Nothing to delete
        this.recentqueries.splice(index, 1);
        this._events.next({ type: "RecentQuery_Delete" /* Delete */, recentquery });
        this.patchRecentQueries([
            {
                type: "RecentQuery_Delete" /* Delete */,
                detail: {
                    recentquery: recentquery.query.text
                }
            }
        ]);
        return true;
    }
    /**
     * Updates Recent Queries in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    patchRecentQueries(auditEvents) {
        return this.userSettingsService.patch({ recentQueries: this.recentqueries }, auditEvents)
            .subscribe(next => {
            this._events.next({ type: "RecentQuery_Patched" /* Patched */ });
        }, error => {
            console.error("Could not patch Recent queries!", error);
        });
    }
    // EVENT HANDLERS (Menus)
    /**
     * Uses the SearchService to perform a search returning all
     * the documents matching this recent query.
     * @param recentquery
     * @returns the search service promise
     */
    searchRecentQuery(recentquery, path) {
        this.searchService.setQuery(Utils.extend(this.searchService.makeQuery(), Utils.copy(recentquery.query)));
        this._events.next({ type: "Search_RecentQuery" /* Search */, recentquery });
        return this.searchService.search({ path: path }, {
            type: "Search_RecentQuery" /* Search */,
            detail: {
                recentquery: recentquery.query.text
            }
        });
    }
    notifyOpenRecentQuery(recentquery) {
        this._events.next({ type: "Search_RecentQuery" /* Search */, recentquery });
    }
    ngOnDestroy() {
        this.events.complete();
        this.changes.complete();
    }
}
RecentQueriesService.ɵfac = function RecentQueriesService_Factory(t) { return new (t || RecentQueriesService)(i0.ɵɵinject(i1.UserSettingsWebService), i0.ɵɵinject(i2.SearchService), i0.ɵɵinject(MAX_QUERIES, 8)); };
RecentQueriesService.ɵprov = i0.ɵɵdefineInjectable({ token: RecentQueriesService, factory: RecentQueriesService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(RecentQueriesService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: i1.UserSettingsWebService }, { type: i2.SearchService }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [MAX_QUERIES]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjZW50LXF1ZXJpZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NhdmVkLXF1ZXJpZXMvIiwic291cmNlcyI6WyJyZWNlbnQtcXVlcmllcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUFhLE1BQU0sRUFBRSxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUc3QixPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFvQnpDLDRDQUE0QztBQUM1QyxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBRzs7OztDQUkzQyxDQUFDO0FBU0YsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLElBQUksY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBSzdELE1BQU0sT0FBTyxvQkFBb0I7SUFLN0IsWUFDVyxtQkFBMkMsRUFDM0MsYUFBNEIsRUFDTSxVQUFrQjtRQUZwRCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXdCO1FBQzNDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQ00sZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQU45QyxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQTBCLENBQUM7UUFDaEQsYUFBUSxHQUFHLElBQUksT0FBTyxFQUEwQixDQUFDO1FBTzlELElBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDO1lBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1NBQ3hCO1FBRUQsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlDLHdCQUF3QjtZQUN4QixtQkFBbUI7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVB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LEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDN0MsSUFBSSxtQ0FBNkI7WUFDakMsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUk7YUFDdEM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUJBQXFCLENBQUMsV0FBd0I7UUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLG1DQUE2QixFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7d0ZBaE9RLG9CQUFvQixxRkFRTCxXQUFXOzREQVIxQixvQkFBb0IsV0FBcEIsb0JBQW9CLG1CQUZqQixNQUFNO2tEQUVULG9CQUFvQjtjQUhoQyxVQUFVO2VBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7O3NCQVNRLFFBQVE7O3NCQUFJLE1BQU07dUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgT3B0aW9uYWwsIE9uRGVzdHJveSwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7U3ViamVjdH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7VXNlclNldHRpbmdzV2ViU2VydmljZSwgQXVkaXRFdmVudHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtRdWVyeX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYXBwLXV0aWxzXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge1NlYXJjaFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3NlYXJjaFwiO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVjZW50UXVlcnkge1xuICAgIHF1ZXJ5OiBRdWVyeTtcbiAgICBkYXRlOiBEYXRlO1xufVxuXG5cbi8vIGZyb20gY29yZS9tb2RlbHMvYXVkaXRcbmV4cG9ydCBjb25zdCBlbnVtIFJlY2VudFF1ZXJ5RXZlbnRUeXBlIHtcbiAgICBMb2FkZWQgPSBcIlJlY2VudFF1ZXJ5X0xvYWRlZFwiLFxuICAgIFBhdGNoZWQgPSBcIlJlY2VudFF1ZXJ5X1BhdGNoZWRcIixcbiAgICBBZGQgPSBcIlJlY2VudFF1ZXJ5X0FkZFwiLFxuICAgIFVwZGF0ZSA9IFwiUmVjZW50UXVlcnlfVXBkYXRlXCIsXG4gICAgRGVsZXRlID0gXCJSZWNlbnRRdWVyeV9EZWxldGVcIixcbiAgICBTZWFyY2ggPSBcIlNlYXJjaF9SZWNlbnRRdWVyeVwiXG59XG5cbi8vIFR5cGVzIG9mIGV2ZW50cyB0cmlnZ2VyaW5nIGEgY2hhbmdlIGV2ZW50XG5leHBvcnQgY29uc3QgUkVDRU5UX1FVRVJJRVNfQ0hBTkdFX0VWRU5UUyA9IFtcbiAgICBSZWNlbnRRdWVyeUV2ZW50VHlwZS5BZGQsXG4gICAgUmVjZW50UXVlcnlFdmVudFR5cGUuVXBkYXRlLFxuICAgIFJlY2VudFF1ZXJ5RXZlbnRUeXBlLkRlbGV0ZSxcbl07XG5cblxuLy8gQ1JVRCBFdmVudHNcbmV4cG9ydCBpbnRlcmZhY2UgUmVjZW50UXVlcnlDaGFuZ2VFdmVudCB7XG4gICAgdHlwZTogUmVjZW50UXVlcnlFdmVudFR5cGU7XG4gICAgcmVjZW50cXVlcnk/OiBSZWNlbnRRdWVyeTtcbn1cblxuZXhwb3J0IGNvbnN0IE1BWF9RVUVSSUVTID0gbmV3IEluamVjdGlvblRva2VuKFwiTUFYX1FVRVJJRVNcIik7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFJlY2VudFF1ZXJpZXNTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2V2ZW50cyA9IG5ldyBTdWJqZWN0PFJlY2VudFF1ZXJ5Q2hhbmdlRXZlbnQ+KCk7XG4gICAgcHJpdmF0ZSByZWFkb25seSBfY2hhbmdlcyA9IG5ldyBTdWJqZWN0PFJlY2VudFF1ZXJ5Q2hhbmdlRXZlbnQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHVzZXJTZXR0aW5nc1NlcnZpY2U6IFVzZXJTZXR0aW5nc1dlYlNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BWF9RVUVSSUVTKSBwcml2YXRlIG1heFF1ZXJpZXM6IG51bWJlcixcbiAgICApe1xuICAgICAgICBpZighdGhpcy5tYXhRdWVyaWVzKXtcbiAgICAgICAgICAgIHRoaXMubWF4UXVlcmllcyA9IDIwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTGlzdGVuIHRvIHRoZSB1c2VyIHNldHRpbmdzXG4gICAgICAgIHRoaXMudXNlclNldHRpbmdzU2VydmljZS5ldmVudHMuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIC8vIEUuZy4gbmV3IGxvZ2luIG9jY3Vyc1xuICAgICAgICAgICAgLy8gPT0+IFJldml2ZSBkYXRlc1xuICAgICAgICAgICAgdGhpcy5yZWNlbnRxdWVyaWVzLmZvckVhY2gocnEgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc1N0cmluZyhycS5kYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gVXRpbHMudG9EYXRlKHJxLmRhdGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcnEuZGF0ZSA9IGRhdGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vID09PiBNZW51cyBuZWVkIHRvIGJlIHJlYnVpbHRcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KHt0eXBlOiBSZWNlbnRRdWVyeUV2ZW50VHlwZS5Mb2FkZWR9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIExpc3RlbiB0byBvd24gZXZlbnRzLCB0byB0cmlnZ2VyIGNoYW5nZSBldmVudHNcbiAgICAgICAgdGhpcy5fZXZlbnRzLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICBpZihSRUNFTlRfUVVFUklFU19DSEFOR0VfRVZFTlRTLmluZGV4T2YoZXZlbnQudHlwZSkgIT09IC0xKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZXMubmV4dChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBMaXN0ZW4gdG8gc2VhcmNoIHNlcnZpY2UgYW5kIHN0b3JlIHF1ZXJpZXNcbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnF1ZXJ5U3RyZWFtLnN1YnNjcmliZSgocXVlcnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocXVlcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRSZWNlbnRRdWVyeSh7cXVlcnk6IHF1ZXJ5LmNvcHkoKSwgZGF0ZTogbmV3IERhdGUoKX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLy8gR0VUVEVSU1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGlzdCBvZiB0aGlzIHVzZXIncyByZWNlbnQgcXVlcmllcy5cbiAgICAgKiBUaGUgbGlzdCBpcyBzdG9yZWQgaW4gdGhlIHVzZXIgc2V0dGluZ3MgKHRoaXMgaXMgYSByZWRpcmVjdGlvbikuXG4gICAgICogVXNpbmcgdGhpcyBzZXJ2aWNlIGNyZWF0ZXMgdGhlIGxpc3Qgb2YgcmVjZW50IHF1ZXJpZXMgaWYgaXQgZG9lcyBub3QgYWxyZWFkeSBleGlzdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJlY2VudHF1ZXJpZXMoKSA6IFJlY2VudFF1ZXJ5W117XG4gICAgICAgIGlmKCF0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UudXNlclNldHRpbmdzKVxuICAgICAgICAgICAgdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnVzZXJTZXR0aW5ncyA9IHt9O1xuICAgICAgICBpZighdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnVzZXJTZXR0aW5nc1tcInJlY2VudFF1ZXJpZXNcIl0pXG4gICAgICAgICAgICB0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UudXNlclNldHRpbmdzW1wicmVjZW50UXVlcmllc1wiXSA9IFtdO1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnVzZXJTZXR0aW5nc1tcInJlY2VudFF1ZXJpZXNcIl07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgYW55IGV2ZW50IGFtb25nIFJlY2VudFF1ZXJ5Q2hhbmdlRXZlbnRcbiAgICAgKiAodXNlIGZvciBmaW5lLWdyYWluZWQgY29udHJvbCBvZiByZWNlbnQgcXVlcmllcyB3b3JrZmxvdylcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGV2ZW50cygpIDogU3ViamVjdDxSZWNlbnRRdWVyeUNoYW5nZUV2ZW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgd2hlbiBldmVudHMgYWZmZWN0IHRoZSBsaXN0IG9mIHJlY2VudCBxdWVyaWVzXG4gICAgICogKHVzZSB0byByZWZyZXNoIHJlY2VudCBxdWVyaWVzIG1lbnVzKVxuICAgICAqIENmLiBDSEFOR0VfRVZFTlRTIGxpc3RcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGNoYW5nZXMoKSA6IFN1YmplY3Q8UmVjZW50UXVlcnlDaGFuZ2VFdmVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hhbmdlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIHRoZXJlIGlzIGF0IGxlYXN0IG9uZSByZWNlbnQgcXVlcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGhhc1JlY2VudFF1ZXJ5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWNlbnRxdWVyaWVzLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgYSByZWNlbnQgcXVlcnkgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBvciB1bmRlZmluZWQgaWYgaXQgZG9lcyBub3QgZXhpc3RcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqL1xuICAgIHB1YmxpYyByZWNlbnRxdWVyeSh0ZXh0OiBzdHJpbmcpOiBSZWNlbnRRdWVyeSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGNvbnN0IGkgPSB0aGlzLnJlY2VudHF1ZXJ5SW5kZXgodGV4dCk7XG4gICAgICAgIHJldHVybiBpPj0gMD8gdGhpcy5yZWNlbnRxdWVyaWVzW2ldIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVjZW50cXVlcnlJbmRleCh0ZXh0OiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgaWMgPSB0aGlzLnJlY2VudHF1ZXJpZXMubGVuZ3RoOyBpIDwgaWM7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcmVjZW50cXVlcnkgPSB0aGlzLnJlY2VudHF1ZXJpZXNbaV07XG4gICAgICAgICAgICBpZiAocmVjZW50cXVlcnkgJiYgcmVjZW50cXVlcnkucXVlcnkudGV4dCAmJiByZWNlbnRxdWVyeS5xdWVyeS50ZXh0LnRvTG93ZXJDYXNlKCkgPT09IHRleHQudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbXBhcmF0b3IocTE6IFJlY2VudFF1ZXJ5LCBxMjogUmVjZW50UXVlcnkpe1xuICAgICAgICByZXR1cm4gcTIuZGF0ZS5nZXRUaW1lKCkgLSBxMS5kYXRlLmdldFRpbWUoKTtcbiAgICB9XG5cblxuICAgIC8vIENSVURcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgcmVjZW50IHF1ZXJ5IHVubGVzcyBpdCBhbHJlYWR5IGV4aXN0cywgaW4gd2hpY2ggY2FzZSB0aGUgZXhpc3RpbmcgcXVlcnkgaXMgdXBkYXRlZC5cbiAgICAgKiBFbWl0cyBhbiByZWNlbnRxdWVyeSBldmVudC5cbiAgICAgKiBVcGRhdGUgdGhlIGRhdGEgb24gdGhlIHNlcnZlci5cbiAgICAgKiBAcGFyYW0gcmVjZW50cXVlcnkgdGhlIHJlY2VudHF1ZXJ5IHRvIGNyZWF0ZVxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgcmVjZW50cXVlcnkgd2FzIGNyZWF0ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkUmVjZW50UXVlcnkocmVjZW50cXVlcnk6IFJlY2VudFF1ZXJ5KSA6IGJvb2xlYW4ge1xuXG4gICAgICAgIGlmKCFyZWNlbnRxdWVyeS5xdWVyeSB8fCAhcmVjZW50cXVlcnkucXVlcnkudGV4dCB8fCByZWNlbnRxdWVyeS5xdWVyeS50ZXh0LnRyaW0oKSA9PT0gJycpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaSA9IHRoaXMucmVjZW50cXVlcnlJbmRleChyZWNlbnRxdWVyeS5xdWVyeS50ZXh0KTsgLy8gSWYgdGhlIHF1ZXJ5IGFscmVhZHkgZXhpc3RzXG4gICAgICAgIGlmKGkgPj0gMCl7XG4gICAgICAgICAgICAvLyBJZ25vcmUgaWRlbnRpY2FsIHF1ZXJpZXMgaXNzdWVkIHdpdGhpbiBhIGNlcnRhaW4gdGltZSB3aW5kb3cgKDFzKVxuICAgICAgICAgICAgLy8gdG8gYXZvaWQgZmxvb2RpbmcgdGhlIHNlcnZlci4gTkIgdGhlIHJlcXVlc3QgZmxvb2RpbmcgbWl0aWdhdGlvbiBpblxuICAgICAgICAgICAgLy8gU3FIdHRwQ2xpZW50IHdpbGwgbm90IHdvcmsgaW4gdGhpcyBjYXNlIGFzIHRoZSByZXF1ZXN0IHBheWxvYWQgaW5jbHVkZXNcbiAgICAgICAgICAgIC8vIGEgdGltZXN0YW1wXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMocmVjZW50cXVlcnkuZGF0ZS5nZXRUaW1lKCkgLSB0aGlzLnJlY2VudHF1ZXJpZXNbaV0uZGF0ZS5nZXRUaW1lKCkpIDwgMTAwMCkge1xuICAgICAgICAgICAgICAgIGlmIChVdGlscy5lcXVhbHModGhpcy5yZWNlbnRxdWVyaWVzW2ldLnF1ZXJ5LCByZWNlbnRxdWVyeS5xdWVyeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVjZW50cXVlcmllc1tpXS5kYXRlID0gcmVjZW50cXVlcnkuZGF0ZTsgLy8gVXBkYXRlIHRoZSBkYXRlIG9mIHRoZSBleGlzdGluZyBxdWVyeVxuICAgICAgICAgICAgdGhpcy5yZWNlbnRxdWVyaWVzW2ldLnF1ZXJ5ID0gcmVjZW50cXVlcnkucXVlcnk7XG4gICAgICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZSA6IFJlY2VudFF1ZXJ5RXZlbnRUeXBlLlVwZGF0ZSwgcmVjZW50cXVlcnk6IHRoaXMucmVjZW50cXVlcmllc1tpXX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWNlbnRxdWVyaWVzLnB1c2gocmVjZW50cXVlcnkpO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoe3R5cGUgOiBSZWNlbnRRdWVyeUV2ZW50VHlwZS5BZGQsIHJlY2VudHF1ZXJ5fSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTb3J0IHRoZSBsaXN0XG4gICAgICAgIHRoaXMucmVjZW50cXVlcmllcy5zb3J0KHRoaXMuY29tcGFyYXRvcik7XG5cbiAgICAgICAgLy8gVHJ1bmNhdGUgdGhlIGxpc3RcbiAgICAgICAgaWYodGhpcy5tYXhRdWVyaWVzID49MCApXG4gICAgICAgICAgICB0aGlzLnJlY2VudHF1ZXJpZXMuc3BsaWNlKHRoaXMubWF4UXVlcmllcyk7XG5cbiAgICAgICAgdGhpcy5wYXRjaFJlY2VudFF1ZXJpZXMoKTsgLy8gTm8gbmVlZCB0byBlbWl0IGFuIFwiQWRkXCIgYXVkaXQgZXZlbnQsIHNpbmNlIGl0IGlzIHJlZHVuZGFudCB3aXRoIHRoZSBtYWluIHNlYXJjaCBBUElcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlcyB0aGUgZ2l2ZW4gUmVjZW50UXVlcnkgKGJhc2VkIG9uIGl0cyBuYW1lKVxuICAgICAqIEVtaXRzIGFuIFJlY2VudFF1ZXJ5IGV2ZW50LlxuICAgICAqIFVwZGF0ZSB0aGUgZGF0YSBvbiB0aGUgc2VydmVyLlxuICAgICAqIEBwYXJhbSByZWNlbnRxdWVyeVxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgcmVjZW50IHF1ZXJ5IHdhcyBkZWxldGVkXG4gICAgICovXG4gICAgcHVibGljIGRlbGV0ZVJlY2VudFF1ZXJ5KHJlY2VudHF1ZXJ5OiBSZWNlbnRRdWVyeSkgOiBib29sZWFuIHtcblxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucmVjZW50cXVlcnlJbmRleChyZWNlbnRxdWVyeS5xdWVyeS50ZXh0IHx8IFwiXCIpO1xuXG4gICAgICAgIGlmKGluZGV4ID09PSAtMSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gTm90aGluZyB0byBkZWxldGVcblxuICAgICAgICB0aGlzLnJlY2VudHF1ZXJpZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoe3R5cGUgOiBSZWNlbnRRdWVyeUV2ZW50VHlwZS5EZWxldGUsIHJlY2VudHF1ZXJ5fSk7XG4gICAgICAgIHRoaXMucGF0Y2hSZWNlbnRRdWVyaWVzKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBSZWNlbnRRdWVyeUV2ZW50VHlwZS5EZWxldGUsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlY2VudHF1ZXJ5OiByZWNlbnRxdWVyeS5xdWVyeS50ZXh0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBSZWNlbnQgUXVlcmllcyBpbiBVc2VyIHNldHRpbmdzLlxuICAgICAqIEBwYXJhbSBhdWRpdEV2ZW50cyA6IEF1ZGl0IEV2ZW50cyB0byBiZSB0cmlnZ2VyZWRcbiAgICAgKiBAcmV0dXJucyBhbiBPYnNlcnZhYmxlIHdoaWNoIGNhbiBiZSB1c2VkIHRvIHRyaWdnZXIgZnVydGhlciBldmVudHNcbiAgICAgKi9cbiAgICBwcml2YXRlIHBhdGNoUmVjZW50UXVlcmllcyhhdWRpdEV2ZW50cz86IEF1ZGl0RXZlbnRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UucGF0Y2goe3JlY2VudFF1ZXJpZXM6IHRoaXMucmVjZW50cXVlcmllc30sIGF1ZGl0RXZlbnRzKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICBuZXh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoe3R5cGU6IFJlY2VudFF1ZXJ5RXZlbnRUeXBlLlBhdGNoZWR9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvdWxkIG5vdCBwYXRjaCBSZWNlbnQgcXVlcmllcyFcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyBFVkVOVCBIQU5ETEVSUyAoTWVudXMpXG5cbiAgICAvKipcbiAgICAgKiBVc2VzIHRoZSBTZWFyY2hTZXJ2aWNlIHRvIHBlcmZvcm0gYSBzZWFyY2ggcmV0dXJuaW5nIGFsbFxuICAgICAqIHRoZSBkb2N1bWVudHMgbWF0Y2hpbmcgdGhpcyByZWNlbnQgcXVlcnkuXG4gICAgICogQHBhcmFtIHJlY2VudHF1ZXJ5XG4gICAgICogQHJldHVybnMgdGhlIHNlYXJjaCBzZXJ2aWNlIHByb21pc2VcbiAgICAgKi9cbiAgICBzZWFyY2hSZWNlbnRRdWVyeShyZWNlbnRxdWVyeTogUmVjZW50UXVlcnksIHBhdGg/OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNldFF1ZXJ5KFV0aWxzLmV4dGVuZCh0aGlzLnNlYXJjaFNlcnZpY2UubWFrZVF1ZXJ5KCksIFV0aWxzLmNvcHkocmVjZW50cXVlcnkucXVlcnkpKSk7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KHt0eXBlOiBSZWNlbnRRdWVyeUV2ZW50VHlwZS5TZWFyY2gsIHJlY2VudHF1ZXJ5fSk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKHsgcGF0aDogcGF0aCB9LCB7XG4gICAgICAgICAgICB0eXBlOiBSZWNlbnRRdWVyeUV2ZW50VHlwZS5TZWFyY2gsXG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICByZWNlbnRxdWVyeTogcmVjZW50cXVlcnkucXVlcnkudGV4dFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBub3RpZnlPcGVuUmVjZW50UXVlcnkocmVjZW50cXVlcnk6IFJlY2VudFF1ZXJ5KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KHt0eXBlOiBSZWNlbnRRdWVyeUV2ZW50VHlwZS5TZWFyY2gsIHJlY2VudHF1ZXJ5fSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIH1cbn1cbiJdfQ==