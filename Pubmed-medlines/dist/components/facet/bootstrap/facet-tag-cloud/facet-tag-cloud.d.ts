import { SimpleChanges, OnChanges } from "@angular/core";
import { AbstractFacet } from "../../abstract-facet";
import { Results, AggregationItem, Aggregation } from "@sinequa/core/web-services";
import { Action } from "@sinequa/components/action";
import { FacetService } from "../../facet.service";
import * as i0 from "@angular/core";
export interface TagCloudItem {
    aggregation: Aggregation;
    item: AggregationItem;
    weight: number;
}
export declare class BsFacetTagCloud extends AbstractFacet implements OnChanges {
    private facetService;
    /** search results */
    results: Results;
    /** list of aggregations to be considered in collecting tag-cloud data */
    aggregations: string | string[];
    /** maximum number of data to be displayed in tag-cloud */
    limit: number;
    /** the way data are collected from given aggregations: equal repartition between them or most relevant among all of them */
    uniformRepartition: boolean;
    /** show/hide number of occurrences of each item*/
    showCount: boolean;
    /** define the size of each displayed item: common size for all or proportional size based on their count */
    proportionalWeight: boolean;
    /** lowest count under which items will not be taken into account in tag-cloud data */
    countThreshold: number;
    /** wether data are rendered following their count sorting or randomly */
    shuffleData: boolean;
    /** Isolate filtering results from other facets available in the app */
    isolateFacetFilters: boolean;
    aggregationsData: Aggregation[];
    tagCloudData: TagCloudItem[];
    private filtered;
    private readonly clearFilters;
    private readonly defaultWeight;
    private readonly tagCloudFacetPrefix;
    constructor(facetService: FacetService);
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Defines the tag-cloud data according to given inputs
     */
    getTagCloudData(): TagCloudItem[];
    /**
     * Invoked on click on an item in order to update the query
     * @param tagCloudItem
     * @param event
     */
    filterItem(tagCloudItem: TagCloudItem, event: any): void;
    /**
     * Define the possible actions according to the actual context
     */
    get actions(): Action[];
    /**
     * Map the initial aggregations names to a list of Aggregation
     */
    protected getAggregationsData(): Aggregation[];
    /**
     * Update aggregation's data with respect to active filters in the query & breadcrumbs
     * @param data
     */
    protected refreshFiltered(data: Aggregation): Aggregation;
    /**
     * Returns facets names to be used according to @input() isolateFacetFilters
     * @param aggregationName
     */
    private getName;
    /**
     * Linearly map the original weight to a discrete scale from 1 to 10
     * @param weight original weight
     */
    private scaleItemWeight;
    /**
     * Returns true if the supplied item within the given aggregation is filtering the query
     * @param data
     * @param item
     */
    private isFiltered;
    /**
     * Shuffle items of the supplied array
     * @param arr
     */
    private shuffle;
    /**
     * Returns true if there is at least one active filter in the tag-cloud facet
     */
    private isFiltering;
    static ɵfac: i0.ɵɵFactoryDef<BsFacetTagCloud, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsFacetTagCloud, "sq-facet-tag-cloud", never, { "results": "results"; "aggregations": "aggregations"; "limit": "limit"; "uniformRepartition": "uniformRepartition"; "showCount": "showCount"; "proportionalWeight": "proportionalWeight"; "countThreshold": "countThreshold"; "shuffleData": "shuffleData"; "isolateFacetFilters": "isolateFacetFilters"; }, {}, never, never>;
}
//# sourceMappingURL=facet-tag-cloud.d.ts.map