import { OnChanges, SimpleChanges, ChangeDetectorRef } from "@angular/core";
import { Results, TreeAggregation, AggregationItem, TreeAggregationNode } from "@sinequa/core/web-services";
import { FacetService } from "../../facet.service";
import { Action } from "@sinequa/components/action";
import { AbstractFacet } from "../../abstract-facet";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import * as i0 from "@angular/core";
export declare class BsFacetTree extends AbstractFacet implements OnChanges {
    private facetService;
    private changeDetectorRef;
    name: string;
    results: Results;
    aggregation: string;
    showCount: boolean;
    allowExclude: boolean;
    allowOr: boolean;
    searchable: boolean;
    expandedLevel: number;
    forceMaxHeight: boolean;
    displayActions: boolean;
    data: TreeAggregation | undefined;
    originalItems: AggregationItem[] | undefined;
    private readonly subscriptions;
    private readonly filtered;
    readonly selected: Map<string, TreeAggregationNode>;
    hiddenSelected: TreeAggregationNode[];
    myGroup: FormGroup;
    searchQuery: FormControl;
    suggestDelay: number;
    searchActive: boolean;
    noResults: boolean;
    private readonly filterItemsOr;
    private readonly excludeItems;
    private readonly clearFilters;
    readonly searchItems: Action;
    constructor(facetService: FacetService, changeDetectorRef: ChangeDetectorRef);
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
    initNodes: (nodes: TreeAggregationNode[], level: number, node: TreeAggregationNode) => void;
    /**
     * Returns all the actions that are relevant in the current context
     */
    get actions(): Action[];
    /**
     * Returns true if the given AggregationItem is filtered
     * @param item
     */
    isFiltered(item: AggregationItem): boolean;
    /**
     * Returns true if there is an active selection (or exclusion) from this facet
     */
    hasFiltered(): boolean;
    /**
     * Called when clicking on a facet item text
     * @param item
     * @param event
     */
    filterItem(item: AggregationItem, event: any): boolean;
    /**
     * Returns true if the given AggregationItem is selected
     * @param item
     */
    isSelected(item: TreeAggregationNode): boolean;
    /**
     * Returns all the selected items
     */
    getSelectedItems(): TreeAggregationNode[];
    /**
     * Called when selecting/unselecting an item in the facet
     * @param item
     */
    selectItem(item: TreeAggregationNode): boolean;
    refreshHiddenSelected(): void;
    find(items: TreeAggregationNode[] | undefined, item: TreeAggregationNode): boolean;
    /**
     * Expand/Collapse a Tree node (the data may need to downloaded from the server)
     * @param item
     */
    open(item: TreeAggregationNode, event: Event): boolean;
    isHidden(): boolean;
    clearSearch(): void;
    /**
     * Called on NgModel change (searchQuery)
     * Uses the suggestfield API to retrieve suggestions from the server
     * The suggestions "override" the data from the distribution (until search results are cleared)
     */
    suggest$: (text$: Observable<string>) => Observable<TreeAggregationNode[]>;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsFacetTree, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsFacetTree, "sq-facet-tree", never, { "name": "name"; "results": "results"; "aggregation": "aggregation"; "showCount": "showCount"; "allowExclude": "allowExclude"; "allowOr": "allowOr"; "searchable": "searchable"; "expandedLevel": "expandedLevel"; "forceMaxHeight": "forceMaxHeight"; "displayActions": "displayActions"; "initNodes": "initNodes"; }, {}, never, never>;
}
//# sourceMappingURL=facet-tree.d.ts.map