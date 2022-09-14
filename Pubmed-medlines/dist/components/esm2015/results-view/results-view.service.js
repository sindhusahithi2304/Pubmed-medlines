import { Injectable, Inject, InjectionToken } from "@angular/core";
import { NavigationEnd } from "@angular/router";
import { Subject } from "rxjs";
import { Utils } from '@sinequa/core/base';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@sinequa/components/search";
export const RESULTS_VIEWS = new InjectionToken("RESULTS_VIEWS");
//export const DEFAULT_VIEW = new InjectionToken<ResultsView>("DEFAULT_VIEW");
export class ResultsViewService {
    /**
     * Constructor: Expects the configuration for a list of views and
     * one default view. These views can be set when importing the module in the AppModule
     * with the ResultsViewModule.forRoot() method.
     */
    constructor(
    // @Inject(DEFAULT_VIEW) public defaultView: ResultsView,
    resultsViews, router, route, searchService) {
        this.router = router;
        this.route = route;
        this.searchService = searchService;
        this._resultsViewSelected = new Subject();
        this._events = new Subject();
        this._resultsViews = resultsViews;
        // this._resultsView = this.defaultView;
        /**
         * Listener triggered whenever the URL changes
         */
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.handleNavigation();
            }
        });
        /**
         * Listener triggered whenever new results come in.
         * Some views must be displayed after a search, hence the
         * pendingView flag.
         */
        this.searchService.resultsStream.subscribe(results => {
            if (this.pendingView) {
                this.searchService.queryStringParams.view = this.pendingView.name;
                this.searchService.navigate({ skipSearch: true });
                this.pendingView = undefined;
            }
        });
        // Automatically switch results views, if we go to a tab that has specific list of views
        this.searchService.events.subscribe(event => {
            // Event called just before the query for the new tab is searched
            if (event.type === "before-select-tab" && event.query.tab) {
                const views = this.getIncludedViews(event.query.tab);
                // If there are views for this tab and they don't include the current one...
                if (views.length > 0 && !views.includes(this.resultsView)) {
                    // Set the view as pending
                    this.pendingView = views[0];
                    // Modify the query if needed
                    if (this.pendingView.beforeSearch) {
                        this.pendingView.beforeSearch(event.query, this.resultsView);
                    }
                }
            }
        });
    }
    // GETTERS
    get resultsViewSelected() {
        return this._resultsViewSelected;
    }
    get events() {
        return this._events;
    }
    get resultsView() {
        return this._resultsView;
    }
    get views() {
        return this._resultsViews;
    }
    // EVENT HANDLERS
    /**
     * Navigate to a new URL including the given results view's name
     * @param view
     */
    navigate(view) {
        let waitForResults = !!view.beforeSearch;
        if (view.beforeSearch) {
            waitForResults = view.beforeSearch(this.searchService.query, this.resultsView);
        }
        if (!waitForResults) {
            // We switch view immediately via the search service (which centralizes the navigation)
            this.searchService.queryStringParams.view = view.name;
            this.searchService.navigate({ skipSearch: true });
        }
        else {
            // We set the view as "pending", that is waiting for new results to come in
            this.pendingView = view;
            this.searchService.search();
        }
    }
    /**
     * Responds to a change in the URL: Sets the results view if the URL
     * specifies a different results view name.
     */
    handleNavigation() {
        const url = Utils.makeURL(this.router.url);
        const view = this.getView(url.searchParams.get("view"));
        if (view && view !== this.resultsView) {
            this.searchService.queryStringParams.view = view.name; // Needed when refreshing the page
            this.setResultsView(view);
        }
    }
    /**
     * Sets the results view and emits an event
     * @param view
     */
    setResultsView(view) {
        this._resultsView = view;
        this._events.next({ type: "after-select", view });
        this._resultsViewSelected.next(view);
    }
    // PUBLIC API
    /**
     * Selects the given results view. This method is asynchronous:
     * - The selected results view might modify the query before being displayed
     * - The view selection works with a navigation via the router (adding the view name to the URL)
     * @param view
     */
    selectResultsView(view) {
        if (view) {
            // Raise before event...
            const beforeEvent = {
                type: "before-select",
                view,
                promises: []
            };
            this._events.next(beforeEvent);
            if (beforeEvent.promises.length === 0) {
                this.navigate(view);
            }
            else {
                Promise.all(beforeEvent.promises)
                    .then((results) => {
                    const ok = results.every(result => result);
                    if (ok) {
                        this.navigate(view);
                    }
                    else {
                        console.log("selectResultsView cancelled");
                        this._events.next({ type: "select-cancelled", view });
                    }
                })
                    .catch((reason) => {
                    console.log("selectResultsView error:", reason);
                    this._events.next({ type: "select-cancelled", view });
                });
            }
        }
        else {
            console.error("Undefined Results View");
        }
    }
    /**
     * Selects the results view with the given name. This method is asynchronous:
     * - The selected results view might modify the query before being displayed
     * - The view selection works with a navigation via the router (adding the view name to the URL)
     * @param viewName
     */
    selectResultsViewName(viewName) {
        const view = this.getView(viewName);
        if (view) {
            this.selectResultsView(view);
        }
    }
    /**
     * Returns the results view with the given name
     * @param viewName
     */
    getView(viewName) {
        return this.views.find(v => v.name === viewName);
    }
    /**
     * Returns the list of results views compatible with a given tab
     * @param tab
     */
    getIncludedViews(tab) {
        const views = [];
        for (const view of this.views) {
            const included = !!view.includedTabs
                ? view.includedTabs.includes(tab || "")
                : !view.excludedTabs || !view.excludedTabs.includes(tab || "");
            if (included) {
                views.push(view);
            }
        }
        return views;
    }
}
ResultsViewService.ɵfac = function ResultsViewService_Factory(t) { return new (t || ResultsViewService)(i0.ɵɵinject(RESULTS_VIEWS), i0.ɵɵinject(i1.Router), i0.ɵɵinject(i1.ActivatedRoute), i0.ɵɵinject(i2.SearchService)); };
ResultsViewService.ɵprov = i0.ɵɵdefineInjectable({ token: ResultsViewService, factory: ResultsViewService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ResultsViewService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [RESULTS_VIEWS]
            }] }, { type: i1.Router }, { type: i1.ActivatedRoute }, { type: i2.SearchService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0cy12aWV3LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9yZXN1bHRzLXZpZXcvIiwic291cmNlcyI6WyJyZXN1bHRzLXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUEwQixhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQXVEM0MsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLElBQUksY0FBYyxDQUFnQixlQUFlLENBQUMsQ0FBQztBQUNoRiw4RUFBOEU7QUFLOUUsTUFBTSxPQUFPLGtCQUFrQjtJQVUzQjs7OztPQUlHO0lBQ0g7SUFDRyx5REFBeUQ7SUFDakMsWUFBMkIsRUFDeEMsTUFBYyxFQUNkLEtBQXFCLEVBQ3JCLGFBQTRCO1FBRjVCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWZoQyx5QkFBb0IsR0FBRyxJQUFJLE9BQU8sRUFBZSxDQUFDO1FBQ2xELFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBcUIsQ0FBQztRQWdCakQsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7UUFDbkMsd0NBQXdDO1FBRXZDOztXQUVHO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pDLElBQUksS0FBSyxZQUFZLGFBQWEsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDM0I7UUFDTCxDQUFDLENBQUMsQ0FB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QUssR0FBa0IsRUFBRSxDQUFDO1FBQ2hDLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUMzQixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVk7Z0JBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO2dCQUN2QyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBRW5FLElBQUksUUFBUSxFQUFFO2dCQUNWLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDcEI7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7O29GQW5OUSxrQkFBa0IsY0FpQmYsYUFBYTswREFqQmhCLGtCQUFrQixXQUFsQixrQkFBa0IsbUJBRmYsTUFBTTtrREFFVCxrQkFBa0I7Y0FIOUIsVUFBVTtlQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOztzQkFrQlEsTUFBTTt1QkFBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJ0BzaW5lcXVhL2NvcmUvYmFzZSc7XG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnQHNpbmVxdWEvY29tcG9uZW50cy9zZWFyY2gnO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tICdAc2luZXF1YS9jb3JlL2FwcC11dGlscyc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBvZiBhIFJlc3VsdHMgVmlld1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlc3VsdHNWaWV3IHtcbiAgICAvKiogTmFtZSBvZiB0aGUgcmVzdWx0cyB2aWV3ICovXG4gICAgbmFtZTogc3RyaW5nO1xuICAgIC8qKiBUeXBlIG9mIHRoZSByZXN1bHRzIHZpZXcgKG5vdCB1c2VkIGludGVybmFsbHksIGJ1dCBtYXkgYmUgdXNlZnVsIGlmIG11bHRpcGxlIHZpZXdzIHNoYXJlIGEgY29tbW9uIGNvbXBvbmVudCkgKi9cbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgLyoqIEhvdyB0aGUgcmVzdWx0cyB2aWV3IHNob3VsZCBiZSBkaXNwbGF5ZWQgKGRlZmF1bHQgdG8gdGhlIG5hbWUpICovXG4gICAgZGlzcGxheT86IHN0cmluZztcbiAgICAvKiogSWNvbiBjbGFzcyBmb3IgdGhlIHJlc3VsdHMgdmlldyAqL1xuICAgIGljb24/OiBzdHJpbmc7XG4gICAgLyoqIExpc3Qgb2YgdGFiIGZvciB3aGljaCB0aGlzIHRhYiBjYW4gYmUgZGlzcGxheWVkIChkZWZhdWx0cyB0byBhbGwgaWYgdW5kZWZpbmVkKSAqL1xuICAgIGluY2x1ZGVkVGFicz86IHN0cmluZ1tdO1xuICAgIC8qKiBMaXN0IG9mIHRhYiBmb3Igd2hpY2ggdGhpcyB0YWIgaXMgZXhjbHVkZWQgKGRlZmF1bHRzIHRvIG5vbmUgaWYgdW5kZWZpbmVkKSAqL1xuICAgIGV4Y2x1ZGVkVGFicz86IHN0cmluZ1tdO1xuICAgIC8qKlxuICAgICAqIE1ldGhvZCBjYWxsZWQgd2hlbiBzZWxlY3RpbmcgdGhpcyByZXN1bHRzIHZpZXcuIEl0IGNhbiBiZSB1c2VkIHRvIG1vZGlmeSB0aGUgc2VhcmNoIHF1ZXJ5XG4gICAgICogd2hlbiBhIHZpZXcgaGFzIHNwZWNpZmljIGRhdGEgdG8gZGlzcGxheS4gSWYgdGhlIG1ldGhvZCByZXR1cm5zIHRydWUsIHRoZW4gc2VsZWN0aW5nIHRoaXMgdmlld1xuICAgICAqIHRyaWdnZXJzIGEgc2VhcmNoIGFuZCB0aGUgdmlldyBzZWxlY3Rpb24gYmVjb21lcyBlZmZlY3RpdmUgdXBvbiByZXN1bHRzLiBJZiB0aGUgbWV0aG9kIHJlc3VsdHMgZmFsc2UsXG4gICAgICogKG9yIGlmIHRoZSBtZXRob2QgaXMgdW5kZWZpbmVkKSwgdGhlbiBzZWxlY3RpbmcgdGhpcyB2aWV3IGRvZXMgbm90IHRyaWdnZXIgYSBuZXcgc2VhcmNoXG4gICAgICogYW5kIHRoZSB2aWV3IHNlbGVjdGlvbiBpcyBpbW1lZGlhdGUuXG4gICAgICovXG4gICAgYmVmb3JlU2VhcmNoPzogKHF1ZXJ5OiBRdWVyeSwgcHJldmlvdXNWaWV3OiBSZXN1bHRzVmlldykgPT4gYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXN1bHRzVmlld0V2ZW50IHtcbiAgICB0eXBlOiBcImJlZm9yZS1zZWxlY3RcIiB8IFwiYWZ0ZXItc2VsZWN0XCIgfCBcInNlbGVjdC1jYW5jZWxsZWRcIjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXN1bHRzVmlld0JlZm9yZVNlbGVjdEV2ZW50IGV4dGVuZHMgUmVzdWx0c1ZpZXdFdmVudCB7XG4gICAgdHlwZTogXCJiZWZvcmUtc2VsZWN0XCI7XG4gICAgdmlldzogUmVzdWx0c1ZpZXc7XG4gICAgcHJvbWlzZXM6IFByb21pc2U8Ym9vbGVhbj5bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXN1bHRzVmlld0FmdGVyU2VsZWN0RXZlbnQgZXh0ZW5kcyBSZXN1bHRzVmlld0V2ZW50IHtcbiAgICB0eXBlOiBcImFmdGVyLXNlbGVjdFwiO1xuICAgIHZpZXc6IFJlc3VsdHNWaWV3O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlc3VsdHNWaWV3U2VsZWN0Q2FuY2VsbGVkRXZlbnQgZXh0ZW5kcyBSZXN1bHRzVmlld0V2ZW50IHtcbiAgICB0eXBlOiBcInNlbGVjdC1jYW5jZWxsZWRcIjtcbiAgICB2aWV3OiBSZXN1bHRzVmlldztcbn1cblxuZXhwb3J0IHR5cGUgUmVzdWx0c1ZpZXdFdmVudHMgPVxuICAgIFJlc3VsdHNWaWV3QmVmb3JlU2VsZWN0RXZlbnQgfFxuICAgIFJlc3VsdHNWaWV3QWZ0ZXJTZWxlY3RFdmVudCB8XG4gICAgUmVzdWx0c1ZpZXdTZWxlY3RDYW5jZWxsZWRFdmVudDtcblxuZXhwb3J0IGNvbnN0IFJFU1VMVFNfVklFV1MgPSBuZXcgSW5qZWN0aW9uVG9rZW48UmVzdWx0c1ZpZXdbXT4oXCJSRVNVTFRTX1ZJRVdTXCIpO1xuLy9leHBvcnQgY29uc3QgREVGQVVMVF9WSUVXID0gbmV3IEluamVjdGlvblRva2VuPFJlc3VsdHNWaWV3PihcIkRFRkFVTFRfVklFV1wiKTtcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUmVzdWx0c1ZpZXdTZXJ2aWNlIHtcblxuICAgIHByb3RlY3RlZCBfcmVzdWx0c1ZpZXcgOiBSZXN1bHRzVmlldztcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3Jlc3VsdHNWaWV3cyA6IFJlc3VsdHNWaWV3W107XG5cbiAgICBwcm90ZWN0ZWQgX3Jlc3VsdHNWaWV3U2VsZWN0ZWQgPSBuZXcgU3ViamVjdDxSZXN1bHRzVmlldz4oKTtcbiAgICBwcm90ZWN0ZWQgX2V2ZW50cyA9IG5ldyBTdWJqZWN0PFJlc3VsdHNWaWV3RXZlbnRzPigpO1xuXG4gICAgcHJvdGVjdGVkIHBlbmRpbmdWaWV3OiBSZXN1bHRzVmlldyB8IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yOiBFeHBlY3RzIHRoZSBjb25maWd1cmF0aW9uIGZvciBhIGxpc3Qgb2Ygdmlld3MgYW5kXG4gICAgICogb25lIGRlZmF1bHQgdmlldy4gVGhlc2Ugdmlld3MgY2FuIGJlIHNldCB3aGVuIGltcG9ydGluZyB0aGUgbW9kdWxlIGluIHRoZSBBcHBNb2R1bGVcbiAgICAgKiB3aXRoIHRoZSBSZXN1bHRzVmlld01vZHVsZS5mb3JSb290KCkgbWV0aG9kLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgIC8vIEBJbmplY3QoREVGQVVMVF9WSUVXKSBwdWJsaWMgZGVmYXVsdFZpZXc6IFJlc3VsdHNWaWV3LFxuICAgICAgICBASW5qZWN0KFJFU1VMVFNfVklFV1MpIHJlc3VsdHNWaWV3czogUmVzdWx0c1ZpZXdbXSxcbiAgICAgICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyLFxuICAgICAgICBwcm90ZWN0ZWQgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcm90ZWN0ZWQgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLl9yZXN1bHRzVmlld3MgPSByZXN1bHRzVmlld3M7XG4gICAgICAgLy8gdGhpcy5fcmVzdWx0c1ZpZXcgPSB0aGlzLmRlZmF1bHRWaWV3O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMaXN0ZW5lciB0cmlnZ2VyZWQgd2hlbmV2ZXIgdGhlIFVSTCBjaGFuZ2VzXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJvdXRlci5ldmVudHMuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU5hdmlnYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIExpc3RlbmVyIHRyaWdnZXJlZCB3aGVuZXZlciBuZXcgcmVzdWx0cyBjb21lIGluLlxuICAgICAgICAgKiBTb21lIHZpZXdzIG11c3QgYmUgZGlzcGxheWVkIGFmdGVyIGEgc2VhcmNoLCBoZW5jZSB0aGVcbiAgICAgICAgICogcGVuZGluZ1ZpZXcgZmxhZy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5yZXN1bHRzU3RyZWFtLnN1YnNjcmliZShyZXN1bHRzID0+IHtcbiAgICAgICAgICAgIGlmKHRoaXMucGVuZGluZ1ZpZXcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnlTdHJpbmdQYXJhbXMudmlldyA9IHRoaXMucGVuZGluZ1ZpZXcubmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UubmF2aWdhdGUoe3NraXBTZWFyY2g6IHRydWV9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmdWaWV3ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBBdXRvbWF0aWNhbGx5IHN3aXRjaCByZXN1bHRzIHZpZXdzLCBpZiB3ZSBnbyB0byBhIHRhYiB0aGF0IGhhcyBzcGVjaWZpYyBsaXN0IG9mIHZpZXdzXG4gICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5ldmVudHMuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIC8vIEV2ZW50IGNhbGxlZCBqdXN0IGJlZm9yZSB0aGUgcXVlcnkgZm9yIHRoZSBuZXcgdGFiIGlzIHNlYXJjaGVkXG4gICAgICAgICAgICBpZihldmVudC50eXBlID09PSBcImJlZm9yZS1zZWxlY3QtdGFiXCIgJiYgZXZlbnQucXVlcnkudGFiKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgdmlld3MgPSB0aGlzLmdldEluY2x1ZGVkVmlld3MoZXZlbnQucXVlcnkudGFiKTtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgdmlld3MgZm9yIHRoaXMgdGFiIGFuZCB0aGV5IGRvbid0IGluY2x1ZGUgdGhlIGN1cnJlbnQgb25lLi4uXG4gICAgICAgICAgICAgICAgaWYodmlld3MubGVuZ3RoID4gMCAmJiAhdmlld3MuaW5jbHVkZXModGhpcy5yZXN1bHRzVmlldykpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRoZSB2aWV3IGFzIHBlbmRpbmdcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nVmlldyA9IHZpZXdzWzBdO1xuICAgICAgICAgICAgICAgICAgICAvLyBNb2RpZnkgdGhlIHF1ZXJ5IGlmIG5lZWRlZFxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnBlbmRpbmdWaWV3LmJlZm9yZVNlYXJjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nVmlldy5iZWZvcmVTZWFyY2goZXZlbnQucXVlcnksIHRoaXMucmVzdWx0c1ZpZXcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgLy8gR0VUVEVSU1xuXG4gICAgcHVibGljIGdldCByZXN1bHRzVmlld1NlbGVjdGVkKCk6IE9ic2VydmFibGU8UmVzdWx0c1ZpZXc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3VsdHNWaWV3U2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBldmVudHMoKTogT2JzZXJ2YWJsZTxSZXN1bHRzVmlld0V2ZW50cz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcmVzdWx0c1ZpZXcoKTogUmVzdWx0c1ZpZXcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzdWx0c1ZpZXc7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB2aWV3cygpOiBSZXN1bHRzVmlld1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3VsdHNWaWV3cztcbiAgICB9XG5cbiAgICAvLyBFVkVOVCBIQU5ETEVSU1xuXG4gICAgLyoqXG4gICAgICogTmF2aWdhdGUgdG8gYSBuZXcgVVJMIGluY2x1ZGluZyB0aGUgZ2l2ZW4gcmVzdWx0cyB2aWV3J3MgbmFtZVxuICAgICAqIEBwYXJhbSB2aWV3IFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBuYXZpZ2F0ZSh2aWV3OiBSZXN1bHRzVmlldykge1xuICAgICAgICBsZXQgd2FpdEZvclJlc3VsdHMgPSAhIXZpZXcuYmVmb3JlU2VhcmNoO1xuICAgICAgICBpZih2aWV3LmJlZm9yZVNlYXJjaCkge1xuICAgICAgICAgICAgd2FpdEZvclJlc3VsdHMgPSB2aWV3LmJlZm9yZVNlYXJjaCh0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnksIHRoaXMucmVzdWx0c1ZpZXcpO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF3YWl0Rm9yUmVzdWx0cykge1xuICAgICAgICAgICAgLy8gV2Ugc3dpdGNoIHZpZXcgaW1tZWRpYXRlbHkgdmlhIHRoZSBzZWFyY2ggc2VydmljZSAod2hpY2ggY2VudHJhbGl6ZXMgdGhlIG5hdmlnYXRpb24pXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnlTdHJpbmdQYXJhbXMudmlldyA9IHZpZXcubmFtZTtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5uYXZpZ2F0ZSh7c2tpcFNlYXJjaDogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gV2Ugc2V0IHRoZSB2aWV3IGFzIFwicGVuZGluZ1wiLCB0aGF0IGlzIHdhaXRpbmcgZm9yIG5ldyByZXN1bHRzIHRvIGNvbWUgaW5cbiAgICAgICAgICAgIHRoaXMucGVuZGluZ1ZpZXcgPSB2aWV3O1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzcG9uZHMgdG8gYSBjaGFuZ2UgaW4gdGhlIFVSTDogU2V0cyB0aGUgcmVzdWx0cyB2aWV3IGlmIHRoZSBVUkxcbiAgICAgKiBzcGVjaWZpZXMgYSBkaWZmZXJlbnQgcmVzdWx0cyB2aWV3IG5hbWUuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGhhbmRsZU5hdmlnYXRpb24oKSB7XG4gICAgICAgIGNvbnN0IHVybCA9IFV0aWxzLm1ha2VVUkwodGhpcy5yb3V0ZXIudXJsKTtcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuZ2V0Vmlldyh1cmwuc2VhcmNoUGFyYW1zLmdldChcInZpZXdcIikpO1xuICAgICAgICBpZih2aWV3ICYmIHZpZXcgIT09IHRoaXMucmVzdWx0c1ZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeVN0cmluZ1BhcmFtcy52aWV3ID0gdmlldy5uYW1lOyAvLyBOZWVkZWQgd2hlbiByZWZyZXNoaW5nIHRoZSBwYWdlXG4gICAgICAgICAgICB0aGlzLnNldFJlc3VsdHNWaWV3KHZpZXcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcmVzdWx0cyB2aWV3IGFuZCBlbWl0cyBhbiBldmVudFxuICAgICAqIEBwYXJhbSB2aWV3IFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBzZXRSZXN1bHRzVmlldyh2aWV3OiBSZXN1bHRzVmlldykge1xuICAgICAgICB0aGlzLl9yZXN1bHRzVmlldyA9IHZpZXc7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KHt0eXBlOiBcImFmdGVyLXNlbGVjdFwiLCB2aWV3fSk7XG4gICAgICAgIHRoaXMuX3Jlc3VsdHNWaWV3U2VsZWN0ZWQubmV4dCh2aWV3KTtcbiAgICB9XG5cblxuICAgIC8vIFBVQkxJQyBBUElcblxuICAgIC8qKlxuICAgICAqIFNlbGVjdHMgdGhlIGdpdmVuIHJlc3VsdHMgdmlldy4gVGhpcyBtZXRob2QgaXMgYXN5bmNocm9ub3VzOlxuICAgICAqIC0gVGhlIHNlbGVjdGVkIHJlc3VsdHMgdmlldyBtaWdodCBtb2RpZnkgdGhlIHF1ZXJ5IGJlZm9yZSBiZWluZyBkaXNwbGF5ZWRcbiAgICAgKiAtIFRoZSB2aWV3IHNlbGVjdGlvbiB3b3JrcyB3aXRoIGEgbmF2aWdhdGlvbiB2aWEgdGhlIHJvdXRlciAoYWRkaW5nIHRoZSB2aWV3IG5hbWUgdG8gdGhlIFVSTClcbiAgICAgKiBAcGFyYW0gdmlldyBcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VsZWN0UmVzdWx0c1ZpZXcodmlldzogUmVzdWx0c1ZpZXcpIHtcbiAgICAgICAgaWYgKHZpZXcpIHtcbiAgICAgICAgICAgIC8vIFJhaXNlIGJlZm9yZSBldmVudC4uLlxuICAgICAgICAgICAgY29uc3QgYmVmb3JlRXZlbnQ6IFJlc3VsdHNWaWV3QmVmb3JlU2VsZWN0RXZlbnQgPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJiZWZvcmUtc2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgdmlldyxcbiAgICAgICAgICAgICAgICBwcm9taXNlczogW11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KGJlZm9yZUV2ZW50KTtcbiAgICAgICAgICAgIGlmIChiZWZvcmVFdmVudC5wcm9taXNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlKHZpZXcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoYmVmb3JlRXZlbnQucHJvbWlzZXMpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvayA9IHJlc3VsdHMuZXZlcnkocmVzdWx0ID0+IHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlKHZpZXcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZWxlY3RSZXN1bHRzVmlldyBjYW5jZWxsZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoe3R5cGU6IFwic2VsZWN0LWNhbmNlbGxlZFwiLCB2aWV3fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbGVjdFJlc3VsdHNWaWV3IGVycm9yOlwiLCByZWFzb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoe3R5cGU6IFwic2VsZWN0LWNhbmNlbGxlZFwiLCB2aWV3fSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVuZGVmaW5lZCBSZXN1bHRzIFZpZXdcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3RzIHRoZSByZXN1bHRzIHZpZXcgd2l0aCB0aGUgZ2l2ZW4gbmFtZS4gVGhpcyBtZXRob2QgaXMgYXN5bmNocm9ub3VzOlxuICAgICAqIC0gVGhlIHNlbGVjdGVkIHJlc3VsdHMgdmlldyBtaWdodCBtb2RpZnkgdGhlIHF1ZXJ5IGJlZm9yZSBiZWluZyBkaXNwbGF5ZWRcbiAgICAgKiAtIFRoZSB2aWV3IHNlbGVjdGlvbiB3b3JrcyB3aXRoIGEgbmF2aWdhdGlvbiB2aWEgdGhlIHJvdXRlciAoYWRkaW5nIHRoZSB2aWV3IG5hbWUgdG8gdGhlIFVSTClcbiAgICAgKiBAcGFyYW0gdmlld05hbWUgXG4gICAgICovXG4gICAgcHVibGljIHNlbGVjdFJlc3VsdHNWaWV3TmFtZSh2aWV3TmFtZTogc3RyaW5nKXtcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuZ2V0Vmlldyh2aWV3TmFtZSk7XG4gICAgICAgIGlmICh2aWV3KSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFJlc3VsdHNWaWV3KHZpZXcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcmVzdWx0cyB2aWV3IHdpdGggdGhlIGdpdmVuIG5hbWVcbiAgICAgKiBAcGFyYW0gdmlld05hbWUgXG4gICAgICovXG4gICAgcHVibGljIGdldFZpZXcodmlld05hbWUpOiBSZXN1bHRzVmlldyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpZXdzLmZpbmQodiA9PiB2Lm5hbWUgPT09IHZpZXdOYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsaXN0IG9mIHJlc3VsdHMgdmlld3MgY29tcGF0aWJsZSB3aXRoIGEgZ2l2ZW4gdGFiXG4gICAgICogQHBhcmFtIHRhYiBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0SW5jbHVkZWRWaWV3cyh0YWI/OiBzdHJpbmcpOiBSZXN1bHRzVmlld1tdIHtcbiAgICAgICAgY29uc3Qgdmlld3M6IFJlc3VsdHNWaWV3W10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCB2aWV3IG9mIHRoaXMudmlld3MpIHtcbiAgICAgICAgICAgIGNvbnN0IGluY2x1ZGVkID0gISF2aWV3LmluY2x1ZGVkVGFic1xuICAgICAgICAgICAgICAgID8gdmlldy5pbmNsdWRlZFRhYnMuaW5jbHVkZXModGFiIHx8IFwiXCIpXG4gICAgICAgICAgICAgICAgOiAhdmlldy5leGNsdWRlZFRhYnMgfHwgIXZpZXcuZXhjbHVkZWRUYWJzLmluY2x1ZGVzKHRhYiB8fCBcIlwiKTtcblxuICAgICAgICAgICAgaWYgKGluY2x1ZGVkKSB7XG4gICAgICAgICAgICAgICAgdmlld3MucHVzaCh2aWV3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmlld3M7XG4gICAgfVxuXG59Il19