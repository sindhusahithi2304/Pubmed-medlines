import { InjectionToken } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject, Observable } from "rxjs";
import { SearchService } from '@sinequa/components/search';
import { Query } from '@sinequa/core/app-utils';
import * as i0 from "@angular/core";
/**
 * Configuration of a Results View
 */
export interface ResultsView {
    /** Name of the results view */
    name: string;
    /** Type of the results view (not used internally, but may be useful if multiple views share a common component) */
    type: string;
    /** How the results view should be displayed (default to the name) */
    display?: string;
    /** Icon class for the results view */
    icon?: string;
    /** List of tab for which this tab can be displayed (defaults to all if undefined) */
    includedTabs?: string[];
    /** List of tab for which this tab is excluded (defaults to none if undefined) */
    excludedTabs?: string[];
    /**
     * Method called when selecting this results view. It can be used to modify the search query
     * when a view has specific data to display. If the method returns true, then selecting this view
     * triggers a search and the view selection becomes effective upon results. If the method results false,
     * (or if the method is undefined), then selecting this view does not trigger a new search
     * and the view selection is immediate.
     */
    beforeSearch?: (query: Query, previousView: ResultsView) => boolean;
}
export interface ResultsViewEvent {
    type: "before-select" | "after-select" | "select-cancelled";
}
export interface ResultsViewBeforeSelectEvent extends ResultsViewEvent {
    type: "before-select";
    view: ResultsView;
    promises: Promise<boolean>[];
}
export interface ResultsViewAfterSelectEvent extends ResultsViewEvent {
    type: "after-select";
    view: ResultsView;
}
export interface ResultsViewSelectCancelledEvent extends ResultsViewEvent {
    type: "select-cancelled";
    view: ResultsView;
}
export declare type ResultsViewEvents = ResultsViewBeforeSelectEvent | ResultsViewAfterSelectEvent | ResultsViewSelectCancelledEvent;
export declare const RESULTS_VIEWS: InjectionToken<ResultsView[]>;
export declare class ResultsViewService {
    protected router: Router;
    protected route: ActivatedRoute;
    protected searchService: SearchService;
    protected _resultsView: ResultsView;
    protected readonly _resultsViews: ResultsView[];
    protected _resultsViewSelected: Subject<ResultsView>;
    protected _events: Subject<ResultsViewEvents>;
    protected pendingView: ResultsView | undefined;
    /**
     * Constructor: Expects the configuration for a list of views and
     * one default view. These views can be set when importing the module in the AppModule
     * with the ResultsViewModule.forRoot() method.
     */
    constructor(resultsViews: ResultsView[], router: Router, route: ActivatedRoute, searchService: SearchService);
    get resultsViewSelected(): Observable<ResultsView>;
    get events(): Observable<ResultsViewEvents>;
    get resultsView(): ResultsView;
    get views(): ResultsView[];
    /**
     * Navigate to a new URL including the given results view's name
     * @param view
     */
    protected navigate(view: ResultsView): void;
    /**
     * Responds to a change in the URL: Sets the results view if the URL
     * specifies a different results view name.
     */
    protected handleNavigation(): void;
    /**
     * Sets the results view and emits an event
     * @param view
     */
    protected setResultsView(view: ResultsView): void;
    /**
     * Selects the given results view. This method is asynchronous:
     * - The selected results view might modify the query before being displayed
     * - The view selection works with a navigation via the router (adding the view name to the URL)
     * @param view
     */
    selectResultsView(view: ResultsView): void;
    /**
     * Selects the results view with the given name. This method is asynchronous:
     * - The selected results view might modify the query before being displayed
     * - The view selection works with a navigation via the router (adding the view name to the URL)
     * @param viewName
     */
    selectResultsViewName(viewName: string): void;
    /**
     * Returns the results view with the given name
     * @param viewName
     */
    getView(viewName: any): ResultsView | undefined;
    /**
     * Returns the list of results views compatible with a given tab
     * @param tab
     */
    getIncludedViews(tab?: string): ResultsView[];
    static ɵfac: i0.ɵɵFactoryDef<ResultsViewService, never>;
    static ɵprov: i0.ɵɵInjectableDef<ResultsViewService>;
}
//# sourceMappingURL=results-view.service.d.ts.map