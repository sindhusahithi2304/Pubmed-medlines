import { OnChanges, SimpleChanges } from "@angular/core";
import { Results } from "@sinequa/core/web-services";
import { SearchService, BreadcrumbsItem } from "@sinequa/components/search";
import { AbstractFacet } from "../../abstract-facet";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
export declare class BsMySearch extends AbstractFacet implements OnChanges {
    searchService: SearchService;
    results: Results;
    /** Display icon to delete items */
    allowDeletion: boolean;
    /** Display each item's field */
    displayFieldNames: boolean;
    /** Make the div collapsible */
    collapsible: boolean;
    /** Add a badge likely style to items */
    useBadges: boolean;
    /** Wether we Ignore text and fielded search */
    ignoreText: boolean;
    /** Items of those facets will be excluded  */
    excludedFacets: (string | undefined)[];
    collapsed: boolean;
    clearAction: Action;
    items: BreadcrumbsItem[];
    fields: string[];
    constructor(searchService: SearchService);
    ngOnChanges(changes: SimpleChanges): void;
    protected getField(item: BreadcrumbsItem): string;
    removeItem(item: BreadcrumbsItem): void;
    get isEmpty(): boolean;
    get actions(): Action[];
    protected clear(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsMySearch, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsMySearch, "sq-facet-mysearch", never, { "results": "results"; "allowDeletion": "allowDeletion"; "displayFieldNames": "displayFieldNames"; "collapsible": "collapsible"; "useBadges": "useBadges"; "ignoreText": "ignoreText"; "excludedFacets": "excludedFacets"; }, {}, never, never>;
}
//# sourceMappingURL=facet-mysearch.d.ts.map