import { OnChanges, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Results } from '@sinequa/core/web-services';
import { AbstractFacet } from '../../abstract-facet';
import { Action } from '@sinequa/components/action';
import { FacetService } from '../../facet.service';
import * as i0 from "@angular/core";
export interface FacetConfig {
    name: string;
    type: 'list' | 'tree';
    title: string;
    icon?: string;
    aggregation: string;
    showCount?: boolean;
    searchable?: boolean;
    allowExclude?: boolean;
    allowOr?: boolean;
    allowAnd?: boolean;
    displayEmptyDistributionIntervals?: boolean;
    $count?: string;
    $hasData?: boolean;
    $hasFiltered?: boolean;
}
export declare class BsFacetMultiComponent extends AbstractFacet implements OnChanges {
    facetService: FacetService;
    private changeDetectorRef;
    results: Results;
    facets: FacetConfig[];
    showCount: boolean;
    showProgressBar: boolean;
    events: EventEmitter<FacetConfig>;
    facetComponent: AbstractFacet;
    /**
     * The facet configuration to open
     */
    openedFacet: FacetConfig | undefined;
    /**
     * Action to switch back from an opened facet to the facet multi view
     */
    backAction: Action;
    clearAllFiltersAction: Action;
    constructor(facetService: FacetService, changeDetectorRef: ChangeDetectorRef);
    /**
     * If a sub-facet is opened, add a Back button and forward
     * the actions of the facet.
     */
    get actions(): Action[];
    /**
     * Return the actions of the child facet
     */
    get facetActions(): Action[];
    /**
     * Open this sub facet
     * @param facet
     */
    openFacet(facet: FacetConfig): void;
    clearFacetFilters(facet: FacetConfig, e: Event): boolean;
    /**
     * Return the number of items to display for a given facet
     * @param facet
     */
    private getFacetCount;
    /**
     * Return whether a given facet has been used in the current context
     * @param facet
     */
    private hasFiltered;
    /**
     * When the results change, actualize count, hasData and hasFiltered
     * which are displayed in the template.
     */
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsFacetMultiComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsFacetMultiComponent, "sq-facet-multi", never, { "results": "results"; "facets": "facets"; "showCount": "showCount"; "showProgressBar": "showProgressBar"; }, { "events": "events"; }, never, never>;
}
//# sourceMappingURL=facet-multi.component.d.ts.map