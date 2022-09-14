import { Observable } from "rxjs";
import { SqHttpClient } from "./http-client";
import { HttpService } from "./http.service";
import { StartConfig } from "./start-config.web.service";
import { IQuery } from "./query/query";
import * as i0 from "@angular/core";
export declare class RecentQueriesList {
    constructor(name: string);
    name: string;
    queries: IQuery[];
}
export declare class RecentQueries {
    app?: RecentQueriesList;
    user?: RecentQueriesList;
}
export declare class RecentQueriesWebService extends HttpService {
    private httpClient;
    recentQueries: RecentQueries;
    constructor(startConfig: StartConfig, httpClient: SqHttpClient);
    load(): Observable<RecentQueries>;
    appRecentQueries(): IQuery[];
    appRecentQueriesLength(): number;
    userRecentQueries(): IQuery[];
    userRecentQueriesLength(): number;
    static ɵfac: i0.ɵɵFactoryDef<RecentQueriesWebService, never>;
    static ɵprov: i0.ɵɵInjectableDef<RecentQueriesWebService>;
}
//# sourceMappingURL=recent-queries.web.service.d.ts.map