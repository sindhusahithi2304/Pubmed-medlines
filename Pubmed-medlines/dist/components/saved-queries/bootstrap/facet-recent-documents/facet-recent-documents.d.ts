import { EventEmitter } from '@angular/core';
import { RecentDocumentsService, RecentDocument } from '../../recent-documents.service';
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import { SearchService } from '@sinequa/components/search';
import * as i0 from "@angular/core";
export declare class BsFacetRecentDocuments extends AbstractFacet {
    recentDocumentsService: RecentDocumentsService;
    searchService: SearchService;
    searchRoute: string;
    maxDocuments: number;
    enableDelete: boolean;
    openOriginal: boolean;
    documentOpened: EventEmitter<RecentDocument>;
    page: number;
    previousPage: Action;
    nextPage: Action;
    constructor(recentDocumentsService: RecentDocumentsService, searchService: SearchService);
    get maxPage(): number;
    get startIndex(): number;
    get endIndex(): number;
    get actions(): Action[];
    openRecentDocument(document: RecentDocument): boolean;
    deleteDocument(document: RecentDocument, event: Event): boolean;
    getQueryParams(document: RecentDocument): {
        id: string;
        query: string;
    };
    static ɵfac: i0.ɵɵFactoryDef<BsFacetRecentDocuments, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsFacetRecentDocuments, "sq-facet-recent-documents", never, { "searchRoute": "searchRoute"; "maxDocuments": "maxDocuments"; "enableDelete": "enableDelete"; "openOriginal": "openOriginal"; }, { "documentOpened": "documentOpened"; }, never, never>;
}
//# sourceMappingURL=facet-recent-documents.d.ts.map