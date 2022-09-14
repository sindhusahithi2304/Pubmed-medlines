import { OnChanges, OnInit } from "@angular/core";
import { Results } from "@sinequa/core/web-services";
import { FacetService } from "../../facet.service";
import { Action } from "@sinequa/components/action";
import { FacetConfig } from '../facet-multi/facet-multi.component';
import * as i0 from "@angular/core";
export declare class BsFacetFilters implements OnInit, OnChanges {
    private facetService;
    results: Results;
    facets: FacetConfig[];
    enableCustomization: boolean;
    autoAdjust: boolean;
    autoAdjustBreakpoint: string;
    collapseBreakpoint: string;
    rightAligned: boolean;
    size: string;
    filters: Action[];
    hidden: boolean;
    facetStatus: {
        add: {
            title: string;
            icon: string;
        };
        remove: {
            title: string;
            icon: string;
        };
    };
    constructor(facetService: FacetService);
    ngOnInit(): void;
    ngOnChanges(): void;
    /**
     * Build filters bar actions
     */
    private buildFilters;
    /**
     * Use to outline facet when filters are sets
     * @param facetName facet name
     *
     * @returns true if filters are sets otherwise false
     */
    private hasFiltered;
    /**
     * Use to disable menu item when no items in a facet
     * @param facet facet to check
     *
     * @returns true if facet contains at least one item otherwise false
     */
    private hasData;
    private addFacetMenu;
    get filteredFacets(): FacetConfig[];
    get userFacets(): import("../../facet.service").FacetState[];
    get hasFacetSelected(): boolean;
    static ɵfac: i0.ɵɵFactoryDef<BsFacetFilters, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsFacetFilters, "sq-facet-filters", never, { "results": "results"; "facets": "facets"; "enableCustomization": "enableCustomization"; "autoAdjust": "autoAdjust"; "autoAdjustBreakpoint": "autoAdjustBreakpoint"; "collapseBreakpoint": "collapseBreakpoint"; "rightAligned": "rightAligned"; "size": "size"; }, {}, never, never>;
}
//# sourceMappingURL=facet-filters.d.ts.map