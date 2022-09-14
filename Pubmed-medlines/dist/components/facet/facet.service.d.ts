import { InjectionToken } from "@angular/core";
import { UserSettingsWebService, Suggestion, Results, Aggregation, AggregationItem, TreeAggregation, TreeAggregationNode, AuditEvents, Select, CCColumn } from "@sinequa/core/web-services";
import { IntlService } from "@sinequa/core/intl";
import { Query, AppService, FormatService, ExprBuilder, Expr } from "@sinequa/core/app-utils";
import { Subject, Observable } from "rxjs";
import { SearchService, BreadcrumbsItem, Breadcrumbs } from "@sinequa/components/search";
import { SuggestService } from "@sinequa/components/autocomplete";
import * as i0 from "@angular/core";
export interface FacetState {
    name: string;
    position: number;
    expanded: boolean;
    hidden: boolean;
    view: string;
}
/**
 * Options for the [[FacetService.AddFilter]] and [[FacetService.AddFilterSearch]] methods
 *
 * and: If multiple items are filtered, determines whether they are filtered as AND or OR
 * not: Whether this is an exlusion of the filtered item
 * replaceCurrent: if true, the current filter is replaced
 */
export interface AddFilterOptions {
    and?: boolean;
    not?: boolean;
    replaceCurrent?: boolean;
}
export declare const enum FacetEventType {
    Loaded = "Facet_Loaded",
    Add = "Facet_Added",
    AddAll = "Facets_Added",
    Remove = "Facet_Removed",
    RemoveAll = "Facets_Removed",
    Patched = "Facet_Patched",
    ClearFilters = "Facet_ClearFilters",
    AddFilter = "Facet_AddFilter",
    RemoveFilter = "Facet_RemoveFilter",
    Open = "Facet_TreeOpen"
}
export declare const FACET_CHANGE_EVENTS: FacetEventType[];
export interface FacetChangeEvent {
    type: FacetEventType;
    facet?: FacetState;
}
export declare const ALL_FACETS: InjectionToken<any[]>;
export declare const DEFAULT_FACETS: InjectionToken<FacetState[]>;
export declare class FacetService {
    protected userSettingsService: UserSettingsWebService;
    protected searchService: SearchService;
    protected suggestService: SuggestService;
    protected appService: AppService;
    protected intlService: IntlService;
    protected formatService: FormatService;
    protected exprBuilder: ExprBuilder;
    allFacets: any[];
    defaultFacets: FacetState[];
    protected readonly _events: Subject<FacetChangeEvent>;
    protected readonly _changes: Subject<FacetChangeEvent>;
    constructor(userSettingsService: UserSettingsWebService, searchService: SearchService, suggestService: SuggestService, appService: AppService, intlService: IntlService, formatService: FormatService, exprBuilder: ExprBuilder, allFacets: any[], defaultFacets: FacetState[]);
    /**
     * Returns the list of this user's facets.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of facets if it does not already exist.
     */
    get facets(): FacetState[];
    /**
     * @returns a facet with the given name or undefined if it does not exist
     * @param name
     */
    facet(name: string): FacetState | undefined;
    /**
     * Returns the list of facet config in the given container (position)
     * @param position (default to 0 if there is a single container)
     */
    getFacets(position?: number): any[];
    /**
     * Returns true if this facet is opened (in any container)
     * @param facetName
     */
    isFacetOpened(facetName: any): boolean;
    protected facetIndex(name: string): number;
    /**
     * Triggers any events regarding the facets
     */
    get events(): Subject<FacetChangeEvent>;
    /**
     * Triggers when events affect the list of facets
     * Cf. CHANGE_EVENTS list
     */
    get changes(): Subject<FacetChangeEvent>;
    addFacet(facet: FacetState): void;
    removeFacet(facet: FacetState): void;
    addAllFacet(): void;
    removeAllFacet(): void;
    /**
     * Updates facets in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    protected patchFacets(auditEvents?: AuditEvents): import("rxjs").Subscription;
    /**
     * Filter/Exclude an item in a facet and launch a search.
     * Triggers an internal event and an Audit Event
     * @param facetName
     * @param aggregation
     * @param items
     * @param options
     */
    addFilterSearch(facetName: string, aggregation: Aggregation, items: AggregationItem | AggregationItem[], options?: AddFilterOptions): Promise<boolean>;
    /**
     * Filter/Exclude one or more item(s) in a facet (without launching a search)
     * @param facetName
     * @param aggregation
     * @param items
     * @param options
     * @param query the query on which to add the filter (defaults to search service query)
     * @param breadcrumbs breadcrumbs in which to look for selected items (defaults  to search service breadcrumbs)
     */
    addFilter(facetName: string, aggregation: Aggregation, items: AggregationItem | AggregationItem[], options?: AddFilterOptions, query?: Query, breadcrumbs?: Breadcrumbs | undefined): boolean;
    /**
     * Clears the query from the current selection on the given facet
     * @param facetName
     * @param all
     * @param query the query to clear from the facet selection (defaults to search service query)
     */
    clearFilters(facetName: string, all?: boolean, query?: Query): void;
    /**
     * Clears the query from the current selection on the given facet and perform a search
     * @param facetName
     * @param all
     */
    clearFiltersSearch(facetName: string | string[], all?: boolean): Promise<boolean>;
    /**
     * Remove a filter and update the appropriate Select if it was previously included in a selection
     * @param facetName the facet that removes the filter
     * @param aggregation the aggregation that contains the item to remove
     * @param item the aggregation item to remove from the query
     * @param query the query on which to remove the filter (defaults to search service query)
     * @param breadcrumbs breadcrumbs in which to look for selected items (defaults  to search service breadcrumbs)
     */
    removeFilter(facetName: string, aggregation: Aggregation, item: AggregationItem, query?: Query, breadcrumbs?: Breadcrumbs | undefined): Select | undefined;
    /**
     * Removes the aggregation from the search service query and refresh the search
     * @param facetName
     * @param aggregation
     * @param item
     */
    removeFilterSearch(facetName: string, aggregation: Aggregation, item: AggregationItem): Promise<boolean>;
    /**
     * Queries the server for data for this aggregation
     * @param aggregation
     * @param skip
     * @param count
     * @param query the query to use to fetch the data (default to search service query)
     */
    loadData(aggregation: string, skip?: number, count?: number, query?: Query, searchInactive?: boolean): Observable<Aggregation | undefined>;
    /**
     * Get suggestions given a text and a field name, using the Suggest service
     * @param text
     * @param field
     * @param suggestQuery
     */
    suggest(text: string, field: string, suggestQuery?: string): Observable<Suggestion[]>;
    /**
     * Format the given result item, using field formatter and/or i18n service
     * @param item
     */
    formatValue(item: AggregationItem): string;
    /**
     * Returns true if this facet has at least one active selection
     * filtering the search
     * @param facetName
     * @param breadcrumbs breadcrumbs in which to look for selected items (defaults to search service breadcrumbs)
     */
    hasFiltered(facetName: string, breadcrumbs?: Breadcrumbs | undefined): boolean;
    /**
     * Returns an active selection of this facet filtering the search
     * Returns it as an expression
     * @param facetName
     * @param breadcrumbs breadcrumbs in which to look for selected items (defaults to search service breadcrumbs)
     */
    findFilter(facetName: string, breadcrumbs?: Breadcrumbs | undefined): Expr | undefined;
    /**
     * Look for an aggregation with the given name in the search results and returns it.
     * Takes care of initializing the aggregation items to insert their $column property.
     * @param aggregationName
     * @param results The search results can be provided explicitly or taken from the SearchService implicitly.
     */
    getAggregation(aggregationName: string, results?: Results | undefined, treeAggregationOptions?: {
        facetName: string;
        levelCallback?: (nodes: TreeAggregationNode[], level: number, node: TreeAggregationNode) => void;
    }): Aggregation | TreeAggregation | undefined;
    /**
     * Look for a Tree aggregation with the given name in the search results and returns it.
     * Takes care of initializing the Node aggregation items to insert their properties ($column, $path, $opened, $level)
     * @deprecated use getAggregation() instead
     * @param facetName
     * @param aggregationName
     * @param results The search results can be provided explicitly or taken from the SearchService implicitly.
     * @param levelCallback A callback method called at every level of the tree.
     * Can be used to read or alter the properties of the nodes (opening, closing), or node list (sorting)
     */
    getTreeAggregation(facetName: string, aggregationName: string, results?: Results | undefined, levelCallback?: (nodes: TreeAggregationNode[], level: number, node: TreeAggregationNode) => void): TreeAggregation | undefined;
    /**
     * Returns the count parameter of the given aggregation (default is 10)
     * @param aggregationName
     */
    getAggregationCount(aggregationName: string): number;
    /**
     * Opens a Tree node of the given tree facet by querying data from the server
     * Takes care of initializing the Node aggregation items to insert their properties ($column, $path, $opened, $level)
     * @param facetName
     * @param aggregation
     * @param item
     * @param levelCallback A callback method called at every level of the tree.
     * Can be used to read or alter the properties of the nodes (opening, closing), or node list (sorting)
     */
    open(facetName: string, aggregation: TreeAggregation, item: TreeAggregationNode, levelCallback?: (nodes: TreeAggregationNode[], level: number, node: TreeAggregationNode) => void, query?: Query, searchInactive?: boolean): Observable<Results>;
    /**
     * Returns true if a given aggregation item is currently actively filtering the search
     * @param facetName
     * @param aggregation
     * @param item
     * @param breadcrumbs breadcrumbs in which to look for selected items (default to search service breadcrumbs)
     */
    itemFiltered(facetName: string, aggregation: Aggregation, item: AggregationItem, breadcrumbs?: Breadcrumbs | undefined): boolean;
    protected findItemFilter(facetName: string, aggregation: Aggregation, item: AggregationItem, breadcrumbs: Breadcrumbs | undefined): Expr | undefined;
    /**
     * Initializes the nodes of a tree (private, with a callback)
     * @param facetName
     * @param aggregation
     * @param root
     * @param children
     * @param expandPaths
     * @param levelCallback
     */
    protected initTreeNodes(facetName: string, aggregation: Aggregation, root: string, children: TreeAggregationNode[], expandPaths?: string[], levelCallback?: (nodes: TreeAggregationNode[], level: number, node: TreeAggregationNode) => void): void;
    protected setColumn(aggregation: Aggregation): void;
    protected static splitTreepath(path: string): string[];
    static treepathLast(path: string): string;
    protected static getAggregationNode(nodes: TreeAggregationNode[], path: string): TreeAggregationNode | undefined;
    /**
     * Convert an Expression object or an Expression Array to their AggregationItem equivalent
     *
     * @param expr Expression object or Expression Array
     * @param valuesAreExpressions when true values should be converted to string otherwise no
     *
     * @returns AggregationItem array with converted expression or an empty array
     */
    exprToAggregationItem(expr: Expr[] | Expr, valuesAreExpressions?: boolean): AggregationItem[];
    /**
     * Get all Breadcrumbs items from a specific facet
     *
     * @param facetName facet name where to extract all breadcrumbs
     * @param breadcrumbs breadcrumbs in which to look for selected items
     */
    getBreadcrumbsItems(facetName: string, breadcrumbs: Breadcrumbs | undefined): BreadcrumbsItem[];
    /**
     * Get all Aggregation items from a facet, currently filtered
     *
     * @param facetName facet name where to inspect
     * @param valuesAreExpressions when true, some transformations should be done
     * @param breadcrumbs breadcrumbs in which to look for selected items (default to search service breadcrumbs)
     */
    getAggregationItemsFiltered(facetName: string, valuesAreExpressions?: boolean, breadcrumbs?: Breadcrumbs | undefined): AggregationItem[];
    /**
     * Convert Suggestion to AggregationItem
     * @param suggest a Suggestion object
     *
     * @returns AggregationItem object with is `$column` property defined.
     * On boolean type, convert `value` property to boolean
     */
    suggestionToAggregationItem(suggest: Suggestion): AggregationItem;
    /**
     * Converts a list of suggestions into a structure of TreeAggregationNodes
     * @param suggests Suggestions to convert
     * @param searchTerm The searched term in the suggestions
     * @param aggregation The tree aggregations
     */
    suggestionsToTreeAggregationNodes(suggests: Suggestion[], searchTerm: string, aggregation: Aggregation | undefined): TreeAggregationNode[];
    /**
     * Utility recursive function to generate a tree aggregation structure from
     * a list of suggestions
     */
    protected addNode(items: TreeAggregationNode[], path2node: Map<string, TreeAggregationNode>, parentPath: string, path: string, count: number, level: number, matchend: number, column: CCColumn | undefined): void;
    /**
     * Check if a facet contains items
     * @param aggregation aggregation name
     * @param results search results
     *
     * @returns true if the facet contains a least one item otherwise false
     */
    hasData(aggregation: string, results: Results): boolean;
    /**
     * Returns the index of the first element in the supplied array
     * corresponding to `item.value` or -1 when not found.
     * A fallback to `item.display` is done before returning -1
     * @param item item to find
     */
    filteredIndex(data: Aggregation | undefined, arr: Array<AggregationItem>, item: AggregationItem): number;
    /**
     * Utility function to returns aggregation item's index in supplied array with fallback to `display` comparison.
     * Otherwise -1, indicating that no element passed the test.
     * @param arr The array findIndex() was called upon
     * @param value The value to be test
     */
    findAggregationItemIndex: (arr: Array<AggregationItem>, item: AggregationItem) => number;
    private trimAllWhitespace;
    static ɵfac: i0.ɵɵFactoryDef<FacetService, [null, null, null, null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDef<FacetService>;
}
//# sourceMappingURL=facet.service.d.ts.map