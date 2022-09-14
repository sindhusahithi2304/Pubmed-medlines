import { InjectionToken, OnDestroy } from "@angular/core";
import { Router, Params } from "@angular/router";
import { Subject, BehaviorSubject, Observable, Subscription } from "rxjs";
import { QueryWebService, AuditWebService, QueryIntentData, Results, Record, Tab, DidYouMeanKind, QueryIntentAction, QueryIntent, QueryAnalysis, IMulti, CCTab, AuditEvents, AuditEvent } from "@sinequa/core/web-services";
import { AppService, FormatService, ValueItem, Query, ExprBuilder } from "@sinequa/core/app-utils";
import { NotificationsService } from "@sinequa/core/notification";
import { LoginService } from "@sinequa/core/login";
import { IntlService } from "@sinequa/core/intl";
import { Breadcrumbs, BreadcrumbsItem } from './breadcrumbs';
import * as i0 from "@angular/core";
export interface SearchOptions {
    routes?: string[];
    skipSearchRoutes?: string[];
    homeRoute?: string;
    deactivateRouting?: boolean;
    preventQueryNameChanges?: boolean;
}
export declare const SEARCH_OPTIONS: InjectionToken<SearchOptions>;
export declare class SearchService implements OnDestroy {
    protected options: SearchOptions;
    protected router: Router;
    protected appService: AppService;
    protected queryService: QueryWebService;
    protected loginService: LoginService;
    protected intlService: IntlService;
    protected formatService: FormatService;
    protected auditService: AuditWebService;
    protected notificationsService: NotificationsService;
    protected exprBuilder: ExprBuilder;
    protected _query: Query | undefined;
    queryStringParams: Params;
    results: Results | undefined;
    breadcrumbs: Breadcrumbs | undefined;
    searchActive: boolean;
    protected loginSubscription: Subscription;
    protected routerSubscription: Subscription;
    protected appSubscription: Subscription;
    protected fetchingLoadMore: boolean;
    protected _events: Subject<SearchService.Events>;
    protected _queryStream: BehaviorSubject<Query | undefined>;
    protected _resultsStream: BehaviorSubject<Results | undefined>;
    constructor(options: SearchOptions, router: Router, appService: AppService, queryService: QueryWebService, loginService: LoginService, intlService: IntlService, formatService: FormatService, auditService: AuditWebService, notificationsService: NotificationsService, exprBuilder: ExprBuilder);
    ngOnDestroy(): void;
    get events(): Observable<SearchService.Events>;
    get queryStream(): Observable<Query | undefined>;
    get resultsStream(): Observable<Results | undefined>;
    getTabConfig(name: string): CCTab | undefined;
    get query(): Query;
    setQuery(query: Query | undefined, newQuery?: boolean): void;
    clearQuery(): void;
    updateBreadcrumbs(results: Results | undefined, options: SearchService.SetResultsOptions): void;
    private _setResults;
    setResults(results: Results): void;
    private treatQueryIntents;
    get haveRecords(): boolean;
    get rowCount(): number;
    get totalRowCount(): number;
    get pageSize(): number;
    get page(): number;
    get pageCount(): number;
    makeQuery(recentQuery?: Query): Query;
    protected makeAuditEvent(event: AuditEvent): AuditEvent;
    selectBreadcrumbsItem(item: BreadcrumbsItem): void;
    removeBreadcrumbsItem(item: BreadcrumbsItem): void;
    removeSelect(index: number): void;
    removeText(): void;
    clear(navigate?: boolean, path?: string): void;
    home(path?: string | undefined): void;
    protected makeQueryIntentData(queryIntentData: QueryIntentData): QueryIntentData;
    isEmptySearchIgnoreSelects(query: Query | undefined): boolean;
    isEmptySearch(query: Query | undefined): boolean;
    checkEmptySearch(queries: Query | Query[]): boolean;
    getResults(query: Query, auditEvents?: AuditEvents, options?: SearchService.GetResultsOptions): Observable<Results>;
    getMultipleResults(queries: Query[], auditEvents?: AuditEvents): Observable<IMulti<Results>>;
    navigate(options?: SearchService.NavigationOptions, audit?: AuditEvents): Promise<boolean>;
    protected getHistoryState(): SearchService.HistoryState;
    isSearchRouteActive(): boolean;
    protected isSearchRoute(pathname: string): boolean;
    protected isSkipSearchRoute(pathname: string): boolean;
    private checkSearchRoute;
    getQueryFromUrl(): Query | undefined;
    protected ensureQueryFromUrl(): Query | undefined;
    protected handleLogin(): Promise<boolean>;
    get routingActive(): boolean;
    set routingActive(value: boolean);
    protected makeAuditEventFromCurrentQuery(): AuditEvent | undefined;
    protected handleNavigation(navigationOptions?: SearchService.NavigationOptions, audit?: AuditEvents): Promise<boolean>;
    search(navigationOptions?: SearchService.NavigationOptions, audit?: AuditEvents): Promise<boolean>;
    searchText(path?: string): Promise<boolean>;
    searchRefine(text: string): Promise<boolean>;
    gotoPage(page: number): Promise<boolean>;
    /**
     * Load more results and append them to previous results
     */
    loadMore(): void;
    /**
     * @returns true if more are available otherwise false
     */
    hasMore(): boolean;
    didYouMean(text: string, context: "search" | "refine", kind: DidYouMeanKind): Promise<boolean>;
    getCurrentRecordIds(): string[];
    getRecordFromId(id: string): Record | undefined;
    addFieldSelect(field: string, items: ValueItem | ValueItem[], options?: SearchService.AddSelectOptions): boolean;
    get lastRefineText(): string;
    get hasRelevance(): boolean;
    selectTab(arg: string | Tab, options?: SearchService.NavigationOptions): Promise<boolean>;
    selectScope(scope: string): void;
    getTab(tabName: string): Tab | undefined;
    getCurrentTab(): Tab | undefined;
    notifyOpenOriginalDocument(record: Record, resultId?: string): void;
    checkBeforeSearch(cancelReasons?: string[]): boolean;
    static ɵfac: i0.ɵɵFactoryDef<SearchService, [{ optional: true; }, null, null, null, null, null, null, null, null, null]>;
    static ɵprov: i0.ɵɵInjectableDef<SearchService>;
}
export declare module SearchService {
    interface GetResultsOptions {
        queryIntents?: QueryIntent[];
        queryAnalysis?: QueryAnalysis;
        searchInactive?: boolean;
    }
    interface SetResultsOptions {
        resuseBreadcrumbs?: boolean;
        advanced?: boolean;
    }
    interface AddSelectOptions {
        not?: boolean;
        and?: boolean;
        facetName?: string;
    }
    interface NavigationOptions {
        path?: string;
        reuseBreadcrumbs?: boolean;
        selectTab?: boolean;
        analyzeQueryText?: boolean;
        queryIntents?: QueryIntent[];
        queryAnalysis?: QueryAnalysis;
        skipLocationChange?: boolean;
        skipSearch?: boolean;
    }
    interface HistoryState {
        audit?: AuditEvents;
        navigationOptions?: NavigationOptions;
    }
    interface Event {
        type: "new-query" | "update-query" | "make-query" | "before-new-results" | "new-results" | "make-query-intent-data" | "process-query-intent-action" | "make-audit-event" | "before-select-tab" | "after-select-tab" | "clear" | "open-original-document" | "before-search";
    }
    interface NewQueryEvent extends Event {
        type: "new-query";
        query: Query | undefined;
    }
    interface UpdateQueryEvent extends Event {
        type: "update-query";
        query: Query | undefined;
    }
    interface MakeQueryEvent extends Event {
        type: "make-query";
        query: Query;
    }
    interface BeforeNewResultsEvent extends Event {
        type: "before-new-results";
        results: Results | undefined;
    }
    interface NewResultsEvent extends Event {
        type: "new-results";
        results: Results | undefined;
    }
    interface MakeQueryIntentDataEvent extends Event {
        type: "make-query-intent-data";
        intentData: QueryIntentData;
    }
    interface ProcessQueryIntentActionEvent extends Event {
        type: "process-query-intent-action";
        action: QueryIntentAction;
        intent: QueryIntent;
        analysis: QueryAnalysis;
        actionProcessed?: boolean;
    }
    interface MakeAuditEventEvent extends Event {
        type: "make-audit-event";
        event: AuditEvent;
    }
    interface BeforeSelectTabEvent extends Event {
        type: "before-select-tab";
        query: Query;
    }
    interface AfterSelectTabEvent extends Event {
        type: "after-select-tab";
        observable: Observable<Results>;
    }
    interface ClearEvent extends Event {
        type: "clear";
        path?: string;
    }
    interface OpenOriginalDocument extends Event {
        type: "open-original-document";
        record: Record;
    }
    interface BeforeSearchEvent extends Event {
        type: "before-search";
        cancel?: boolean;
        cancelReasons?: string[];
    }
    type Events = NewQueryEvent | UpdateQueryEvent | MakeQueryEvent | BeforeNewResultsEvent | NewResultsEvent | MakeQueryIntentDataEvent | ProcessQueryIntentActionEvent | MakeAuditEventEvent | BeforeSelectTabEvent | AfterSelectTabEvent | ClearEvent | OpenOriginalDocument | BeforeSearchEvent;
    const DefaultPageSize = 20;
}
//# sourceMappingURL=search.service.d.ts.map