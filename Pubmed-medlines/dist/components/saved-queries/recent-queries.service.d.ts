import { OnDestroy, InjectionToken } from "@angular/core";
import { Subject } from "rxjs";
import { UserSettingsWebService } from "@sinequa/core/web-services";
import { Query } from "@sinequa/core/app-utils";
import { SearchService } from "@sinequa/components/search";
import * as i0 from "@angular/core";
export interface RecentQuery {
    query: Query;
    date: Date;
}
export declare const enum RecentQueryEventType {
    Loaded = "RecentQuery_Loaded",
    Patched = "RecentQuery_Patched",
    Add = "RecentQuery_Add",
    Update = "RecentQuery_Update",
    Delete = "RecentQuery_Delete",
    Search = "Search_RecentQuery"
}
export declare const RECENT_QUERIES_CHANGE_EVENTS: RecentQueryEventType[];
export interface RecentQueryChangeEvent {
    type: RecentQueryEventType;
    recentquery?: RecentQuery;
}
export declare const MAX_QUERIES: InjectionToken<unknown>;
export declare class RecentQueriesService implements OnDestroy {
    userSettingsService: UserSettingsWebService;
    searchService: SearchService;
    private maxQueries;
    private readonly _events;
    private readonly _changes;
    constructor(userSettingsService: UserSettingsWebService, searchService: SearchService, maxQueries: number);
    /**
     * Returns the list of this user's recent queries.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of recent queries if it does not already exist.
     */
    get recentqueries(): RecentQuery[];
    /**
     * Triggers any event among RecentQueryChangeEvent
     * (use for fine-grained control of recent queries workflow)
     */
    get events(): Subject<RecentQueryChangeEvent>;
    /**
     * Triggers when events affect the list of recent queries
     * (use to refresh recent queries menus)
     * Cf. CHANGE_EVENTS list
     */
    get changes(): Subject<RecentQueryChangeEvent>;
    /**
     * @returns true if there is at least one recent query
     */
    get hasRecentQuery(): boolean;
    /**
     * @returns a recent query with the given name or undefined if it does not exist
     * @param name
     */
    recentquery(text: string): RecentQuery | undefined;
    private recentqueryIndex;
    private comparator;
    /**
     * Creates a new recent query unless it already exists, in which case the existing query is updated.
     * Emits an recentquery event.
     * Update the data on the server.
     * @param recentquery the recentquery to create
     * @returns true if recentquery was created
     */
    addRecentQuery(recentquery: RecentQuery): boolean;
    /**
     * Deletes the given RecentQuery (based on its name)
     * Emits an RecentQuery event.
     * Update the data on the server.
     * @param recentquery
     * @returns true if recent query was deleted
     */
    deleteRecentQuery(recentquery: RecentQuery): boolean;
    /**
     * Updates Recent Queries in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    private patchRecentQueries;
    /**
     * Uses the SearchService to perform a search returning all
     * the documents matching this recent query.
     * @param recentquery
     * @returns the search service promise
     */
    searchRecentQuery(recentquery: RecentQuery, path?: string): Promise<boolean>;
    notifyOpenRecentQuery(recentquery: RecentQuery): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<RecentQueriesService, [null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDef<RecentQueriesService>;
}
//# sourceMappingURL=recent-queries.service.d.ts.map