import { SavedQueriesService, SavedQuery, SavedQueryEventType } from '../../saved-queries.service';
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import * as i0 from "@angular/core";
export declare class BsFacetSavedQueries extends AbstractFacet {
    savedQueriesService: SavedQueriesService;
    searchRoute: string;
    maxQueries: number;
    enableDelete: boolean;
    page: number;
    manageSavedQueries: Action;
    previousPage: Action;
    nextPage: Action;
    constructor(savedQueriesService: SavedQueriesService);
    get maxPage(): number;
    get startIndex(): number;
    get endIndex(): number;
    get actions(): Action[];
    openSavedQuery(query: SavedQuery): boolean;
    deleteQuery(query: SavedQuery, event: Event): boolean;
    getQueryParams(savedQuery: SavedQuery): {
        query: string;
    };
    getRouterState(savedQuery: SavedQuery): {
        audit: {
            type: SavedQueryEventType;
            detail: {
                "saved-query": string;
            };
        };
    };
    static ɵfac: i0.ɵɵFactoryDef<BsFacetSavedQueries, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsFacetSavedQueries, "sq-facet-saved-queries", never, { "searchRoute": "searchRoute"; "maxQueries": "maxQueries"; "enableDelete": "enableDelete"; }, {}, never, never>;
}
//# sourceMappingURL=facet-saved-queries.d.ts.map