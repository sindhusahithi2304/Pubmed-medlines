import { OnChanges, SimpleChanges, ChangeDetectorRef, OnInit, OnDestroy } from "@angular/core";
import { Results, Aggregation, AggregationItem } from "@sinequa/core/web-services";
import { FacetService } from "../../facet.service";
import { Action } from "@sinequa/components/action";
import { AbstractFacet } from "../../abstract-facet";
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class BsFacetList extends AbstractFacet implements OnChanges, OnInit, OnDestroy {
    private facetService;
    private changeDetectorRef;
    name: string;
    results: Results;
    aggregation: string;
    showCount: boolean;
    searchable: boolean;
    allowExclude: boolean;
    allowOr: boolean;
    allowAnd: boolean;
    displayEmptyDistributionIntervals: boolean;
    displayActions: boolean;
    showProgressBar: boolean;
    data$: BehaviorSubject<Aggregation | undefined>;
    items$: BehaviorSubject<AggregationItem[]>;
    data: () => Aggregation | undefined;
    subscriptions: Subscription[];
    filtering: boolean;
    myGroup: FormGroup;
    searchQuery: FormControl;
    suggestDelay: number;
    noResults: boolean;
    searchActive: boolean;
    suggestions$: BehaviorSubject<AggregationItem[]>;
    /** Sum of all items count value */
    sumOfCount: number;
    /** List of selected items */
    selected: AggregationItem[];
    /** Selected items that are not visible in the current aggregation (or suggestions in search mode) */
    hiddenSelected: AggregationItem[];
    /** List of excluded/filtered items */
    filtered: AggregationItem[];
    private skip;
    /** num of items currently displayed in the facet */
    private count;
    /** Does facet has more items to display ? */
    loadingMore: boolean;
    private readonly filterItemsOr;
    private readonly filterItemsAnd;
    private readonly excludeItems;
    private readonly clearFilters;
    readonly searchItems: Action;
    constructor(facetService: FacetService, changeDetectorRef: ChangeDetectorRef);
    clearSearch(): void;
    /**
     * Name of the facet, used to create and retrieve selections
     * through the facet service.
     */
    getName(): string;
    /**
     * OnChanges listener awaits new results from the search service
     * This completely resets the display
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Returns all the actions that are relevant in the current context
     */
    get actions(): Action[];
    /**
     * Actualize the state of filtered items (note that excluded terms are not in the distribution, so the equivalent cannot be done)
     */
    refreshFiltered(data: Aggregation | undefined): AggregationItem[];
    refreshHiddenSelected(): void;
    /**
     * Returns true if the given AggregationItem is filtered
     * @param item
     */
    isFiltered(data: Aggregation | undefined, item: AggregationItem): boolean;
    /**
     * Returns true if there is an active selection (or exclusion) from this facet
     */
    hasFiltered(): boolean;
    /**
     * Called when clicking on a facet item text
     * @param item
     * @param event
     */
    filterItem(item: AggregationItem, event: any): void;
    /**
     * Returns true if the given AggregationItem is selected
     * @param item
     */
    isSelected(item: AggregationItem): boolean;
    /**
     * Called when selecting/unselecting an item in the facet
     * @param item
     */
    selectItem(item: AggregationItem, e: Event): void;
    private updateSelected;
    /**
     * Returns true if this facet can get more data from the server
     * (The only way to guess is to check if the facet is "full", it capacity being the (skip+)count)
     */
    get hasMore(): boolean;
    get resultsLength(): number;
    /**
     * Called on loadMore button click
     */
    loadMore(e: Event): boolean;
    /**
     * Returns true if the search mode is active (ie. there are suggestions to display in place of the aggregation)
     */
    hasSuggestions(): boolean;
    /**
     * Called on NgModel change (searchQuery)
     * Uses the suggestfield API to retrieve suggestions from the server
     * The suggestions "override" the data from the distribution (until search results are cleared)
     */
    suggest$: (text$: Observable<string>) => Observable<AggregationItem[]>;
    isHidden(): boolean;
    /**
     * Convert facet item count to percentage width
     * @param count item count
     * @returns a % string representation
     */
    getPercent(count: number): string;
    static ɵfac: i0.ɵɵFactoryDef<BsFacetList, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsFacetList, "sq-facet-list", never, { "name": "name"; "results": "results"; "aggregation": "aggregation"; "showCount": "showCount"; "searchable": "searchable"; "allowExclude": "allowExclude"; "allowOr": "allowOr"; "allowAnd": "allowAnd"; "displayEmptyDistributionIntervals": "displayEmptyDistributionIntervals"; "displayActions": "displayActions"; "showProgressBar": "showProgressBar"; }, {}, never, never>;
}
//# sourceMappingURL=facet-list.d.ts.map