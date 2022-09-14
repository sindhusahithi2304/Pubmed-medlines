import { Observable } from 'rxjs';
import { SqHttpClient } from "./http-client";
import { HttpService } from './http.service';
import { IntlService } from "@sinequa/core/intl";
import { StartConfig } from "./start-config.web.service";
import { IQuery } from './query/query';
import * as i0 from "@angular/core";
/**
 * Describes a single sponsored link
 */
export interface LinkResult {
    id: string;
    title: string;
    url: string;
    icon: string;
    thumbnail: string;
    tooltip: string;
    summary: string;
    rank: number;
    relevance: number;
}
/**
 * Describes a set of sponsored links
 */
export interface LinksResults {
    sql: string[];
    links: LinkResult[];
}
/**
 * A service for calling the query.links web service.
 */
export declare class SponsoredLinksWebService extends HttpService {
    private httpClient;
    private intlService;
    constructor(startConfig: StartConfig, httpClient: SqHttpClient, intlService: IntlService);
    /**
     * Queries the server for sponsored links.
     *
     * @param query The query information.
     * @param webService The web service configuration.
     */
    getLinks(query: IQuery, webService: string): Observable<LinksResults>;
    static ɵfac: i0.ɵɵFactoryDef<SponsoredLinksWebService, never>;
    static ɵprov: i0.ɵɵInjectableDef<SponsoredLinksWebService>;
}
//# sourceMappingURL=sponsored-links.web.service.d.ts.map