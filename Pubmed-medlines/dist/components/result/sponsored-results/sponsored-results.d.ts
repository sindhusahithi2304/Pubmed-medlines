import { OnChanges, SimpleChanges, OnInit, ChangeDetectorRef } from '@angular/core';
import { LinkResult, SponsoredLinksWebService, AuditWebService } from "@sinequa/core/web-services";
import { AppService, Query } from "@sinequa/core/app-utils";
import { SearchService } from "@sinequa/components/search";
import * as i0 from "@angular/core";
export declare class SponsoredResults implements OnChanges, OnInit {
    private appService;
    private searchService;
    private sponsoredResultsService;
    private auditService;
    private changeDetectorRef;
    query: Query;
    sponsoredlinks: LinkResult[];
    private lastText;
    private currentPage?;
    private linksQuery;
    private initDone;
    private webService;
    constructor(appService: AppService, searchService: SearchService, sponsoredResultsService: SponsoredLinksWebService, auditService: AuditWebService, changeDetectorRef: ChangeDetectorRef);
    /**
     * Considers the text of the new query and sees if the list of the sponsored lists needs to be updated.
     *
     * @param text The text of the new query.
     * @memberof SponsoredLinks
     */
    private updateSponsoredLinksIfNecessary;
    /**
     * Retrieves the web service for sponsored links.
     * If it is defined both in the component configuration and the app configuration,
     * this method returns the one in the component configuration.
     *
     * @returns the web service for sponsored links.
     */
    private getWebService;
    ngOnChanges(changes: SimpleChanges): void;
    private initialize;
    ngOnInit(): void;
    auditLinksDisplay(): void;
    click(link: LinkResult): void;
    static ɵfac: i0.ɵɵFactoryDef<SponsoredResults, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<SponsoredResults, "sq-sponsored-results", never, { "query": "query"; }, {}, never, never>;
}
//# sourceMappingURL=sponsored-results.d.ts.map