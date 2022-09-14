import { SearchService } from '@sinequa/components/search';
import { RecentQueriesService, RecentQuery, RecentQueryEventType } from '../../recent-queries.service';
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import { SavedQueriesService } from '../../saved-queries.service';
import { Query } from '@sinequa/core/app-utils';
import * as i0 from "@angular/core";
export declare class BsFacetRecentQueries extends AbstractFacet {
    searchService: SearchService;
    recentQueriesService: RecentQueriesService;
    savedQueriesService: SavedQueriesService;
    searchRoute: string;
    maxQueries: number;
    enableDelete: boolean;
    enableSave: boolean;
    page: number;
    previousPage: Action;
    nextPage: Action;
    constructor(searchService: SearchService, recentQueriesService: RecentQueriesService, savedQueriesService: SavedQueriesService);
    get maxPage(): number;
    get startIndex(): number;
    get endIndex(): number;
    get actions(): Action[];
    openRecentQuery(query: RecentQuery): boolean;
    deleteQuery(query: RecentQuery, event: Event): boolean;
    saveQuery(query: RecentQuery, event: Event): boolean;
    getQueryParams(recentQuery: Query): {
        query: string;
    };
    getRouterState(recentQuery: Query): {
        audit: {
            type: RecentQueryEventType;
            detail: {
                recentquery: string | undefined;
            };
        };
    };
    static ɵfac: i0.ɵɵFactoryDef<BsFacetRecentQueries, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsFacetRecentQueries, "sq-facet-recent-queries", never, { "searchRoute": "searchRoute"; "maxQueries": "maxQueries"; "enableDelete": "enableDelete"; "enableSave": "enableSave"; }, {}, never, never>;
}
//# sourceMappingURL=facet-recent-queries.d.ts.map