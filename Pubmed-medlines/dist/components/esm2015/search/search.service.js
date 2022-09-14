import { Injectable, InjectionToken, Inject, Optional } from "@angular/core";
import { NavigationStart, NavigationEnd } from "@angular/router";
import { Subject, BehaviorSubject, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { DidYouMeanKind } from "@sinequa/core/web-services";
import { Query, ExprParser, Expr } from "@sinequa/core/app-utils";
import { Utils } from "@sinequa/core/base";
import { Breadcrumbs } from './breadcrumbs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@sinequa/core/app-utils";
import * as i3 from "@sinequa/core/web-services";
import * as i4 from "@sinequa/core/login";
import * as i5 from "@sinequa/core/intl";
import * as i6 from "@sinequa/core/notification";
export const SEARCH_OPTIONS = new InjectionToken("SEARCH_OPTIONS");
export class SearchService {
    constructor(options, router, appService, queryService, loginService, intlService, formatService, auditService, notificationsService, exprBuilder) {
        this.options = options;
        this.router = router;
        this.appService = appService;
        this.queryService = queryService;
        this.loginService = loginService;
        this.intlService = intlService;
        this.formatService = formatService;
        this.auditService = auditService;
        this.notificationsService = notificationsService;
        this.exprBuilder = exprBuilder;
        this.queryStringParams = {};
        this.fetchingLoadMore = false;
        this._events = new Subject();
        this._queryStream = new BehaviorSubject(undefined);
        this._resultsStream = new BehaviorSubject(undefined);
        if (!this.options) {
            this.options = {
                routes: ["search"]
            };
        }
        this.results = undefined;
        this.breadcrumbs = undefined;
        this.loginSubscription = this.loginService.events.subscribe((value) => {
            if (value.type === "session-changed") {
                this.handleLogin();
            }
        });
        this.routerSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                // Restore state on back/forward until this issue is fixed: https://github.com/angular/angular/issues/28108
                const currentNavigation = this.router.getCurrentNavigation();
                if (currentNavigation && event.navigationTrigger === "popstate" &&
                    !currentNavigation.extras.state && event.restoredState) {
                    currentNavigation.extras.state = event.restoredState;
                }
            }
            else if (event instanceof NavigationEnd) {
                this.handleNavigation();
            }
        });
        this.appSubscription = this.appService.events.subscribe((event) => {
            if (event.type === "query-changed") {
                if (this._query && (!this.appService.ccquery || (this._query.name !== this.appService.ccquery.name))) {
                    this.clearQuery();
                }
            }
        });
    }
    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
        this.routerSubscription.unsubscribe();
        this.appSubscription.unsubscribe();
        this._events.complete();
        this._queryStream.complete();
        this._resultsStream.complete();
    }
    get events() {
        return this._events;
    }
    get queryStream() {
        return this._queryStream;
    }
    get resultsStream() {
        return this._resultsStream.asObservable();
    }
    getTabConfig(name) {
        if (this.appService.ccquery && this.appService.ccquery.tabSearch && this.appService.ccquery.tabSearch.tabs) {
            return this.appService.ccquery.tabSearch.tabs.find(t => Utils.eqNC(t.name, name));
        }
        return undefined;
    }
    get query() {
        if (!this._query) {
            this._query = this.makeQuery();
            this._events.next({ type: "new-query", query: this._query });
        }
        return this._query;
    }
    setQuery(query, newQuery = true) {
        if (query === this._query) {
            return;
        }
        this._query = query;
        if (this._query) {
            let ccquery;
            if (this.options.preventQueryNameChanges) {
                ccquery = this.appService.ccquery || this.appService.defaultCCQuery;
            }
            else {
                ccquery = this.appService.getCCQuery(this._query.name);
                if (!ccquery) {
                    console.warn(`Query '${this._query.name}' not found`);
                    ccquery = this.appService.defaultCCQuery;
                }
            }
            if (ccquery) {
                this._query.name = ccquery.name;
                if (this.appService.ccquery !== ccquery) {
                    this.appService.ccquery = ccquery;
                }
            }
        }
        if (newQuery) {
            this._events.next({ type: "new-query", query: this._query });
        }
    }
    clearQuery() {
        this.setQuery(undefined);
    }
    updateBreadcrumbs(results, options) {
        if (!results) {
            this.breadcrumbs = undefined;
            return;
        }
        if (!this.breadcrumbs || (!options.resuseBreadcrumbs && !options.advanced)) {
            this.breadcrumbs = Breadcrumbs.create(this.appService, this, this.query);
        }
        else if (options.advanced) {
            this.breadcrumbs.update(this.query);
        }
    }
    _setResults(results, options = {}) {
        if (results === this.results) {
            return;
        }
        this._events.next({ type: "before-new-results", results });
        this.results = results;
        this.treatQueryIntents(results);
        this.updateBreadcrumbs(results, options);
        if (this.results) {
            if (this.results.tab) {
                this.query.tab = this.results.tab;
            }
            if (this.results.attributes && this.results.attributes.queryid) {
                this.query.queryId = this.results.attributes.queryid;
            }
        }
        this._events.next({ type: "new-results", results: this.results });
        this._resultsStream.next(this.results);
    }
    setResults(results) {
        return this._setResults(results);
    }
    // TODO: queryintents in their own service ?
    treatQueryIntents(results) {
        if (results && results.queryAnalysis && results.queryIntents) {
            const queryIntents = results.queryIntents;
            for (const intent of queryIntents) {
                if (intent.actions) {
                    for (const action of intent.actions) {
                        const event = { type: "process-query-intent-action", action: action, intent: intent, analysis: results.queryAnalysis };
                        this._events.next(event);
                        if (!event.actionProcessed) {
                            if (!!action.data) {
                                switch (action.type) {
                                    case "tab":
                                        if (results.queryAnalysis.initial && this.query &&
                                            !Utils.eqNC(this.query.tab || "", action.data)) {
                                            this.selectTab(action.data, { skipLocationChange: true });
                                        }
                                        break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    get haveRecords() {
        return !!this.results && !!this.results.records && this.results.records.length > 0;
    }
    get rowCount() {
        return (!!this.results && this.results.rowCount) ? this.results.rowCount : 0;
    }
    get totalRowCount() {
        return (!!this.results && this.results.totalRowCount) ? this.results.totalRowCount : 0;
    }
    get pageSize() {
        if (this.query && this.query.pageSize) {
            return this.query.pageSize;
        }
        if (this.appService.ccquery && this.appService.ccquery.pageSize) {
            return this.appService.ccquery.pageSize;
        }
        return SearchService.DefaultPageSize;
    }
    get page() {
        if (!this.results) {
            return 1;
        }
        return this.results.page;
    }
    get pageCount() {
        if (!this.results || !this.results.rowCount) {
            return 0;
        }
        return Math.ceil(this.results.rowCount / this.results.pageSize);
    }
    makeQuery(recentQuery) {
        const ccquery = this.appService.ccquery;
        const query = new Query(ccquery ? ccquery.name : "_unknown");
        if (recentQuery) {
            Object.assign(query, recentQuery);
        }
        this._events.next({ type: "make-query", query: query });
        return query;
    }
    makeAuditEvent(event) {
        this._events.next({ type: "make-audit-event", event: event });
        return event;
    }
    selectBreadcrumbsItem(item) {
        if (this.breadcrumbs) {
            const query = this.breadcrumbs.selectItem(item);
            if (query) {
                this.setQuery(query, false);
                this.search({ reuseBreadcrumbs: true }); // audit?
            }
        }
    }
    removeBreadcrumbsItem(item) {
        if (this.breadcrumbs) {
            const next = this.breadcrumbs.removeItem(item);
            if (this.isEmptySearch(this.breadcrumbs.query)) {
                this.clear();
                return;
            }
            if (next) {
                this.selectBreadcrumbsItem(next);
            }
        }
    }
    removeSelect(index) {
        if (this.breadcrumbs) {
            const item = this.breadcrumbs.items[index + 1];
            this.removeBreadcrumbsItem(item);
        }
    }
    removeText() {
        if (this.breadcrumbs) {
            const item = this.breadcrumbs.items[0];
            this.removeBreadcrumbsItem(item);
        }
    }
    clear(navigate = true, path) {
        this.clearQuery();
        path = path || this.options.homeRoute;
        this._setResults(undefined);
        this._events.next({ type: "clear", path });
        if (navigate) {
            this.navigate({ path: path || this.options.homeRoute });
        }
    }
    home(path = this.options.homeRoute) {
        this.clear(true, path);
    }
    makeQueryIntentData(queryIntentData) {
        this._events.next({ type: "make-query-intent-data", intentData: queryIntentData });
        return queryIntentData;
    }
    isEmptySearchIgnoreSelects(query) {
        if (!query) {
            return true;
        }
        if (!query.action || query.action === "search") {
            // Test isFirstPage
            if (query.isFirstPage) {
                return false;
            }
            // Test empty text
            if (query.text && Utils.trim(query.text)) {
                return false;
            }
            // Test basket
            if (query.basket) {
                return false;
            }
            return true;
        }
        return false;
    }
    isEmptySearch(query) {
        if (!query) {
            return true;
        }
        if (!query.action || query.action === "search") {
            if (!this.isEmptySearchIgnoreSelects(query)) {
                return false;
            }
            // Test no facet selection
            if (query.select && query.select.length > 0) {
                return false;
            }
            return true;
        }
        return false;
    }
    checkEmptySearch(queries) {
        if (this.appService.ccquery && !this.appService.ccquery.allowEmptySearch) {
            if (!Utils.isArray(queries)) {
                queries = [queries];
            }
            for (const query of queries) {
                if (this.isEmptySearch(query)) {
                    this.notificationsService.info("msg#search.emptySearchNotification");
                    return false;
                }
            }
        }
        return true;
    }
    getResults(query, auditEvents, options = {}) {
        if (!this.checkEmptySearch(query)) {
            return throwError("empty search");
        }
        if (!options.searchInactive) {
            this.searchActive = true;
        }
        const tab = this.getCurrentTab();
        return this.queryService.getResults(query, auditEvents, this.makeQueryIntentData({
            tab: !!tab ? tab.name : undefined,
            queryIntents: options.queryIntents,
            queryAnalysis: options.queryAnalysis
        })).pipe(map((results) => {
            this.searchActive = false;
            return results;
        }));
    }
    getMultipleResults(queries, auditEvents) {
        if (!this.checkEmptySearch(queries)) {
            return of({ results: [] });
        }
        return this.queryService.getMultipleResults(queries, auditEvents);
    }
    navigate(options, audit) {
        if (!options) {
            options = {};
        }
        if (!options.analyzeQueryText && this.results) {
            options.queryIntents = this.results.queryIntents;
            options.queryAnalysis = this.results.queryAnalysis;
        }
        if (!this.routingActive) {
            this.handleNavigation(options, audit);
            return Promise.resolve(true);
        }
        else {
            // Save currentPath and currentSearch
            let url = Utils.makeURL(this.router.url);
            const currentPath = url.pathname;
            url.searchParams.delete("$refresh");
            const currentSearch = decodeURIComponent(url.search);
            // Set up queryParams and add current query
            const queryParams = Utils.copy(this.queryStringParams);
            if (this._query) {
                queryParams.query = this._query.toJsonForQueryString();
            }
            // Set up history state
            const state = {
                audit,
                navigationOptions: options
            };
            const extras = {
                queryParams,
                state,
                skipLocationChange: options.skipLocationChange
            };
            // Calculate new search
            let path = options.path;
            if (!path) {
                path = currentPath;
            }
            url = Utils.makeURL(path);
            path = url.pathname; // normalized
            for (const key of Object.keys(queryParams)) {
                url.searchParams.set(key, queryParams[key]);
            }
            const search = decodeURIComponent(url.search);
            // If path and search are both the same as current then force navigation (without adding to history)
            if (Utils.eq(currentPath, path) && Utils.eq(currentSearch, search)) {
                // We want to force the navigation so that the query will be processed
                extras.queryParams.$refresh = Utils.now.getTime();
                // But don't update the browser url
                extras.skipLocationChange = true;
            }
            return this.router.navigate([path], extras);
        }
    }
    getHistoryState() {
        const navigation = this.router.getCurrentNavigation();
        if (navigation) {
            return navigation.extras && navigation.extras.state || {};
        }
        return window.history.state || {};
    }
    isSearchRouteActive() {
        const url = Utils.makeURL(this.router.url);
        return this.isSearchRoute(url.pathname);
    }
    isSearchRoute(pathname) {
        return this.checkSearchRoute(pathname, this.options.routes);
    }
    isSkipSearchRoute(pathname) {
        return this.checkSearchRoute(pathname, this.options.skipSearchRoutes);
    }
    checkSearchRoute(pathname, routes) {
        if (routes) {
            for (const route of routes) {
                if (Utils.endsWith(pathname, Utils.addUrl("/", route))) {
                    return true;
                }
            }
        }
        return false;
    }
    getQueryFromUrl() {
        let query;
        const url = Utils.makeURL(this.router.url);
        if (this.isSearchRoute(url.pathname)) {
            const jquery = url.searchParams.get("query");
            if (jquery) {
                try {
                    query = this.makeQuery().fromJson(jquery);
                }
                catch (_a) { }
            }
        }
        return query;
    }
    ensureQueryFromUrl() {
        const query = this.getQueryFromUrl();
        if (!query) {
            this.clear(false);
            return undefined;
        }
        else {
            // The url query should be the same as the current query on SearchService unless
            // it's the initial navigation or if the url is changed manually.
            // In any case, we always set the query from the url. We only send a new-query
            // event if the current query is empty so that we don't systematically create a
            // new query "session" (ml-audit)
            this.setQuery(query, !this._query);
            return query;
        }
    }
    handleLogin() {
        if (!this.loginService.complete) {
            return Promise.resolve(false);
        }
        if (!!this.ensureQueryFromUrl()) {
            return this.navigate();
        }
        else {
            return Promise.resolve(true);
        }
    }
    get routingActive() {
        return !this.options.deactivateRouting;
    }
    set routingActive(value) {
        this.options.deactivateRouting = !value;
    }
    makeAuditEventFromCurrentQuery() {
        const lastSelect = this.query.lastSelect();
        if (lastSelect) {
            const lastExpr = this.appService.parseExpr(lastSelect.expression);
            if (lastExpr instanceof Expr) {
                if (lastExpr.field === "refine") {
                    return this.makeAuditEvent({
                        type: "Search_Refine" /* Search_Refine */,
                        detail: {
                            text: lastExpr.value,
                            itembox: lastSelect.facet,
                            "from-result-id": !!this.results ? this.results.id : null
                        }
                    });
                }
                else {
                    return this.makeAuditEvent({
                        type: "Search_Select_Item" /* Search_Select_Item */,
                        detail: {
                            item: lastSelect,
                            itembox: lastSelect.facet,
                            itemcolumn: lastExpr.field,
                            isitemexclude: lastExpr.not,
                            "from-result-id": !!this.results ? this.results.id : null
                        }
                    });
                }
            }
        }
        else {
            if (this.query.basket) {
                return this.makeAuditEvent({
                    type: "Basket_Open" /* Basket_Open */,
                    detail: {
                        basket: this.query.basket
                    }
                });
            }
            else {
                return this.makeAuditEvent({
                    type: "Search_Text" /* Search_Text */,
                    detail: {
                        text: this.query.text,
                        scope: this.query.scope
                    }
                });
            }
        }
        return undefined;
    }
    handleNavigation(navigationOptions, audit) {
        if (!this.loginService.complete) {
            return Promise.resolve(false);
        }
        if (!this.appService.ccquery) {
            return Promise.resolve(false);
        }
        let query = this._query;
        if (this.routingActive) {
            query = this.ensureQueryFromUrl();
        }
        this._events.next({ type: "update-query", query });
        this._queryStream.next(query);
        if (!query) {
            return Promise.resolve(true);
        }
        if (this.routingActive) {
            const state = this.getHistoryState();
            // console.log("history.state:", state);
            audit = state.audit;
            navigationOptions = state.navigationOptions;
        }
        navigationOptions = navigationOptions || {};
        const pathName = navigationOptions.path ? navigationOptions.path : Utils.makeURL(this.router.url).pathname;
        if (navigationOptions.skipSearch || this.isSkipSearchRoute(pathName)) {
            return Promise.resolve(true);
        }
        if (!audit) {
            audit = this.makeAuditEventFromCurrentQuery();
            if (audit && audit.type === "Search_Text" /* Search_Text */) {
                delete navigationOptions.queryIntents;
                delete navigationOptions.queryAnalysis;
            }
        }
        let observable = this.getResults(this.query, audit, {
            queryIntents: navigationOptions.queryIntents,
            queryAnalysis: navigationOptions.queryAnalysis
        });
        Utils.subscribe(observable, (results) => {
            navigationOptions = navigationOptions || {};
            this._setResults(results, {
                resuseBreadcrumbs: navigationOptions.reuseBreadcrumbs,
            });
            return results;
        });
        if (navigationOptions.selectTab) {
            const afterSelectTabEvent = {
                type: "after-select-tab",
                observable
            };
            this._events.next(afterSelectTabEvent);
            observable = afterSelectTabEvent.observable;
        }
        return observable.pipe(map(() => true), catchError(() => of(false))).toPromise();
    }
    search(navigationOptions, audit) {
        delete this.query.page;
        delete this.query.spellingCorrectionMode;
        return this.navigate(navigationOptions, audit);
    }
    searchText(path) {
        // Check for empty search preemptively to avoid clearing the current results in the most
        // common case of the user entering empty search text in the search box
        // The lower level check in getResults will handle less obvious cases (url editing etc)
        if (!this.checkEmptySearch(this.query)) {
            return Promise.resolve(false);
        }
        return this.search({
            path,
            analyzeQueryText: true
        }, this.makeAuditEvent({
            type: "Search_Text" /* Search_Text */,
            detail: {
                text: this.query.text,
                scope: this.query.scope,
                language: this.intlService.currentLocale.name
            }
        }));
    }
    searchRefine(text) {
        // add "refine" name to facet value is mandatory as it's used in preview's query
        this.query.addSelect(this.exprBuilder.makeRefineExpr(text), "refine");
        return this.search(undefined, this.makeAuditEvent({
            type: "Search_Refine" /* Search_Refine */,
            detail: {
                text: text,
                itembox: "refine",
                "from-result-id": !!this.results ? this.results.id : null
            }
        }));
    }
    gotoPage(page) {
        this.query.page = page;
        return this.navigate(undefined, this.makeAuditEvent({
            type: "Search_GotoPage" /* Search_GotoPage */,
            detail: {
                page: page,
                "from-result-id": !!this.results ? this.results.id : null
            }
        }));
    }
    /**
     * Load more results and append them to previous results
     */
    loadMore() {
        if (!this.fetchingLoadMore) {
            let page = this.query.page || this.page;
            page += (page <= this.pageCount) ? 1 : 0;
            if (page <= this.pageCount) {
                this.fetchingLoadMore = true;
                this.query.page = page;
                const auditEvents = this.makeAuditEvent({
                    type: "Search_GotoPage" /* Search_GotoPage */,
                    detail: {
                        page: page,
                        "from-result-id": !!this.results ? this.results.id : null
                    }
                });
                this.getResults(this.query, auditEvents)
                    .subscribe(results => {
                    var _a;
                    if (this.results && results) {
                        this.results.records = [...((_a = this.results) === null || _a === void 0 ? void 0 : _a.records) || [], ...results.records] || [];
                        this._resultsStream.next(this.results);
                    }
                    this.fetchingLoadMore = false;
                });
            }
        }
    }
    /**
     * @returns true if more are available otherwise false
     */
    hasMore() {
        const page = this.query.page || this.page;
        return (page < this.pageCount);
    }
    didYouMean(text, context, kind) {
        if (context === "search") {
            this.query.text = text;
        }
        else {
            const refineSelect = this.query.findSelect("refine");
            if (refineSelect) {
                refineSelect.expression = "refine:" + ExprParser.escape(text);
            }
        }
        this.query.spellingCorrectionMode = "dymonly";
        return this.navigate(undefined, this.makeAuditEvent({
            type: kind === DidYouMeanKind.Original ? "Search_DidYouMean_Original" /* Search_DidYouMean_Original */ : "Search_DidYouMean_Correction" /* Search_DidYouMean_Correction */,
            detail: {
                text: text
            }
        }));
    }
    getCurrentRecordIds() {
        if (this.results && this.results.records) {
            return this.results.records.map(record => record.id);
        }
        return [];
    }
    getRecordFromId(id) {
        if (this.results && this.results.records) {
            return this.results.records.find(record => Utils.eq(record.id, id));
        }
        return undefined;
    }
    addFieldSelect(field, items, options) {
        if (items && (!Utils.isArray(items) || items.length > 0)) {
            let expr = this.exprBuilder.makeFieldExpr(field, items, options === null || options === void 0 ? void 0 : options.and);
            if (options === null || options === void 0 ? void 0 : options.not) {
                expr = this.exprBuilder.makeNotExpr(expr);
            }
            this.query.addSelect(expr, options === null || options === void 0 ? void 0 : options.facetName);
            return true;
        }
        return false;
    }
    get lastRefineText() {
        if (this.breadcrumbs) {
            const refineExpr = this.breadcrumbs.findSelect("refine");
            if (refineExpr) {
                return ExprParser.unescape(refineExpr.toString(false));
            }
        }
        return "";
    }
    get hasRelevance() {
        var _a;
        if (!this.breadcrumbs) {
            return false;
        }
        if ((_a = this.breadcrumbs.textExpr) === null || _a === void 0 ? void 0 : _a.hasRelevance) {
            return true;
        }
        const refineExpr = this.breadcrumbs.findSelect("refine");
        return (refineExpr === null || refineExpr === void 0 ? void 0 : refineExpr.hasRelevance) || false;
    }
    selectTab(arg, options = {}) {
        options.selectTab = true;
        const tabName = typeof arg === 'string' ? arg : arg.name;
        this.query.tab = tabName;
        delete this.query.queryId; // SBA-154
        this._events.next({ type: "before-select-tab", query: this.query });
        return this.search(options, this.makeAuditEvent({
            type: "Search_GotoTab" /* Search_GotoTab */,
            detail: {
                tab: tabName,
                "from-result-id": !!this.results ? this.results.id : null
            }
        }));
    }
    selectScope(scope) {
        this.query.scope = scope;
    }
    getTab(tabName) {
        if (this.results && this.results.tabs) {
            for (const tab of this.results.tabs) {
                if (Utils.equals(tab.name, tabName)) {
                    return tab;
                }
            }
        }
        return undefined;
    }
    getCurrentTab() {
        if (this.results && this.results.tab) {
            return this.getTab(this.results.tab);
        }
        return undefined;
    }
    notifyOpenOriginalDocument(record, resultId) {
        var _a, _b, _c, _d, _e;
        const results = this.results && this.results.records && this.results.records.includes(record) ? this.results : undefined;
        this._events.next({ type: "open-original-document", record });
        const querylang = ((_b = (_a = this.results) === null || _a === void 0 ? void 0 : _a.queryAnalysis) === null || _b === void 0 ? void 0 : _b.queryLanguage) || ((_c = this.query) === null || _c === void 0 ? void 0 : _c.questionLanguage)
            || ((_e = (_d = this.appService) === null || _d === void 0 ? void 0 : _d.ccquery) === null || _e === void 0 ? void 0 : _e.questionLanguage);
        this.auditService.notifyDocument("Click_ResultLink" /* Click_ResultLink */, record, results || resultId || "", {
            text: this.query.text,
            querylang,
        }, {
            queryhash: results ? results.rfmQueryHash : undefined,
            querytext: this.query.text,
            querylang: querylang
        });
    }
    checkBeforeSearch(cancelReasons) {
        const beforeSearch = { type: "before-search" };
        this._events.next(beforeSearch);
        if (cancelReasons && beforeSearch.cancelReasons) {
            cancelReasons.splice(0, 0, ...beforeSearch.cancelReasons);
        }
        return !beforeSearch.cancel;
    }
}
SearchService.ɵfac = function SearchService_Factory(t) { return new (t || SearchService)(i0.ɵɵinject(SEARCH_OPTIONS, 8), i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.AppService), i0.ɵɵinject(i3.QueryWebService), i0.ɵɵinject(i4.LoginService), i0.ɵɵinject(i5.IntlService), i0.ɵɵinject(i2.FormatService), i0.ɵɵinject(i3.AuditWebService), i0.ɵɵinject(i6.NotificationsService), i0.ɵɵinject(i2.ExprBuilder)); };
SearchService.ɵprov = i0.ɵɵdefineInjectable({ token: SearchService, factory: SearchService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SearchService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [SEARCH_OPTIONS]
            }] }, { type: i1.Router }, { type: i2.AppService }, { type: i3.QueryWebService }, { type: i4.LoginService }, { type: i5.IntlService }, { type: i2.FormatService }, { type: i3.AuditWebService }, { type: i6.NotificationsService }, { type: i2.ExprBuilder }]; }, null); })();
(function (SearchService) {
    SearchService.DefaultPageSize = 20;
})(SearchService || (SearchService = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zZWFyY2gvIiwic291cmNlcyI6WyJzZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBUyxlQUFlLEVBQUUsYUFBYSxFQUFTLE1BQU0saUJBQWlCLENBQUM7QUFDL0UsT0FBTyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQTRCLEVBQUUsRUFBRSxVQUFVLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDeEYsT0FBTyxFQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUcsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQW1GLGNBQWMsRUFFNUQsTUFBTSw0QkFBNEIsQ0FBQztBQUMvRSxPQUFPLEVBQXVDLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFjLE1BQU0seUJBQXlCLENBQUM7QUFJbkgsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxXQUFXLEVBQWtCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztBQVUzRCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQWdCLGdCQUFnQixDQUFDLENBQUM7QUFLbEYsTUFBTSxPQUFPLGFBQWE7SUFldEIsWUFDa0QsT0FBc0IsRUFDMUQsTUFBYyxFQUNkLFVBQXNCLEVBQ3RCLFlBQTZCLEVBQzdCLFlBQTBCLEVBQzFCLFdBQXdCLEVBQ3hCLGFBQTRCLEVBQzVCLFlBQTZCLEVBQzdCLG9CQUEwQyxFQUMxQyxXQUF3QjtRQVRZLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFDMUQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsaUJBQVksR0FB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LElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7WUFDckIsU0FBUztTQUNaLEVBQ0Q7WUFDSSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTO1lBQ3JELFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7WUFDMUIsU0FBUyxFQUFFLFNBQVM7U0FDdkIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVELGlCQUFpQixDQUFDLGFBQXdCO1FBQ3RDLE1BQU0sWUFBWSxHQUFvQyxFQUFDLElBQUksRUFBRSxlQUFlLEVBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoQyxJQUFJLGFBQWEsSUFBSSxZQUFZLENBQUMsYUFBYSxFQUFFO1lBQzdDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM3RDtRQUNELE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO0lBQ2hDLENBQUM7OzBFQXAyQlEsYUFBYSxjQWdCRSxjQUFjO3FEQWhCN0IsYUFBYSxXQUFiLGFBQWEsbUJBRlYsTUFBTTtrREFFVCxhQUFhO2NBSHpCLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7c0JBaUJRLFFBQVE7O3NCQUFJLE1BQU07dUJBQUMsY0FBYzs7QUF1MUIxQyxXQUFjLGFBQWE7SUE0SFYsNkJBQWUsR0FBRyxFQUFFLENBQUM7QUFDdEMsQ0FBQyxFQTdIYSxhQUFhLEtBQWIsYUFBYSxRQTZIMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIEluamVjdGlvblRva2VuLCBJbmplY3QsIE9wdGlvbmFsLCBPbkRlc3Ryb3l9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1JvdXRlciwgTmF2aWdhdGlvblN0YXJ0LCBOYXZpZ2F0aW9uRW5kLCBQYXJhbXN9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7U3ViamVjdCwgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIG9mLCB0aHJvd0Vycm9yfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHttYXAsIGNhdGNoRXJyb3IgIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQge1F1ZXJ5V2ViU2VydmljZSwgQXVkaXRXZWJTZXJ2aWNlLCBDQ1F1ZXJ5LCBRdWVyeUludGVudERhdGEsIFJlc3VsdHMsIFJlY29yZCwgVGFiLCBEaWRZb3VNZWFuS2luZCxcbiAgICBRdWVyeUludGVudEFjdGlvbiwgUXVlcnlJbnRlbnQsIFF1ZXJ5QW5hbHlzaXMsIElNdWx0aSwgQ0NUYWIsXG4gICAgQXVkaXRFdmVudHMsIEF1ZGl0RXZlbnRUeXBlLCBBdWRpdEV2ZW50fSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7QXBwU2VydmljZSwgRm9ybWF0U2VydmljZSwgVmFsdWVJdGVtLCBRdWVyeSwgRXhwclBhcnNlciwgRXhwciwgRXhwckJ1aWxkZXJ9IGZyb20gXCJAc2luZXF1YS9jb3JlL2FwcC11dGlsc1wiO1xuaW1wb3J0IHtOb3RpZmljYXRpb25zU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbm90aWZpY2F0aW9uXCI7XG5pbXBvcnQge0xvZ2luU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbG9naW5cIjtcbmltcG9ydCB7SW50bFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL2ludGxcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7QnJlYWRjcnVtYnMsIEJyZWFkY3J1bWJzSXRlbX0gZnJvbSAnLi9icmVhZGNydW1icyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VhcmNoT3B0aW9ucyB7XG4gICAgcm91dGVzPzogc3RyaW5nW107XG4gICAgc2tpcFNlYXJjaFJvdXRlcz86IHN0cmluZ1tdO1xuICAgIGhvbWVSb3V0ZT86IHN0cmluZztcbiAgICBkZWFjdGl2YXRlUm91dGluZz86IGJvb2xlYW47XG4gICAgcHJldmVudFF1ZXJ5TmFtZUNoYW5nZXM/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgU0VBUkNIX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48U2VhcmNoT3B0aW9ucz4oXCJTRUFSQ0hfT1BUSU9OU1wiKTtcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46IFwicm9vdFwiXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIHByb3RlY3RlZCBfcXVlcnk6IFF1ZXJ5IHwgdW5kZWZpbmVkO1xuICAgIHF1ZXJ5U3RyaW5nUGFyYW1zOiBQYXJhbXMgPSB7fTtcbiAgICByZXN1bHRzOiBSZXN1bHRzIHwgdW5kZWZpbmVkO1xuICAgIGJyZWFkY3J1bWJzOiBCcmVhZGNydW1icyB8IHVuZGVmaW5lZDtcbiAgICBzZWFyY2hBY3RpdmU6IGJvb2xlYW47XG5cbiAgICBwcm90ZWN0ZWQgbG9naW5TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcm90ZWN0ZWQgcm91dGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHJvdGVjdGVkIGFwcFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByb3RlY3RlZCBmZXRjaGluZ0xvYWRNb3JlID0gZmFsc2U7XG4gICAgcHJvdGVjdGVkIF9ldmVudHMgPSBuZXcgU3ViamVjdDxTZWFyY2hTZXJ2aWNlLkV2ZW50cz4oKTtcbiAgICBwcm90ZWN0ZWQgX3F1ZXJ5U3RyZWFtID0gbmV3IEJlaGF2aW9yU3ViamVjdDxRdWVyeSB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgICBwcm90ZWN0ZWQgX3Jlc3VsdHNTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFJlc3VsdHMgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChTRUFSQ0hfT1BUSU9OUykgcHJvdGVjdGVkIG9wdGlvbnM6IFNlYXJjaE9wdGlvbnMsXG4gICAgICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJvdGVjdGVkIGFwcFNlcnZpY2U6IEFwcFNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBxdWVyeVNlcnZpY2U6IFF1ZXJ5V2ViU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIGxvZ2luU2VydmljZTogTG9naW5TZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgaW50bFNlcnZpY2U6IEludGxTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgZm9ybWF0U2VydmljZTogRm9ybWF0U2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIGF1ZGl0U2VydmljZTogQXVkaXRXZWJTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgbm90aWZpY2F0aW9uc1NlcnZpY2U6IE5vdGlmaWNhdGlvbnNTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgZXhwckJ1aWxkZXI6IEV4cHJCdWlsZGVyKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICByb3V0ZXM6IFtcInNlYXJjaFwiXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVzdWx0cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5icmVhZGNydW1icyA9IHVuZGVmaW5lZDtcblxuICAgICAgICB0aGlzLmxvZ2luU3Vic2NyaXB0aW9uID0gdGhpcy5sb2dpblNlcnZpY2UuZXZlbnRzLnN1YnNjcmliZShcbiAgICAgICAgICAgICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlID09PSBcInNlc3Npb24tY2hhbmdlZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTG9naW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yb3V0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlci5ldmVudHMuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlc3RvcmUgc3RhdGUgb24gYmFjay9mb3J3YXJkIHVudGlsIHRoaXMgaXNzdWUgaXMgZml4ZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzI4MTA4XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnROYXZpZ2F0aW9uID0gdGhpcy5yb3V0ZXIuZ2V0Q3VycmVudE5hdmlnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROYXZpZ2F0aW9uICYmIGV2ZW50Lm5hdmlnYXRpb25UcmlnZ2VyID09PSBcInBvcHN0YXRlXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICFjdXJyZW50TmF2aWdhdGlvbi5leHRyYXMuc3RhdGUgJiYgZXZlbnQucmVzdG9yZWRTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudE5hdmlnYXRpb24uZXh0cmFzLnN0YXRlID0gZXZlbnQucmVzdG9yZWRTdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVOYXZpZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYXBwU3Vic2NyaXB0aW9uID0gdGhpcy5hcHBTZXJ2aWNlLmV2ZW50cy5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJxdWVyeS1jaGFuZ2VkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3F1ZXJ5ICYmICghdGhpcy5hcHBTZXJ2aWNlLmNjcXVlcnkgfHwgKHRoaXMuX3F1ZXJ5Lm5hbWUgIT09IHRoaXMuYXBwU2VydmljZS5jY3F1ZXJ5Lm5hbWUpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclF1ZXJ5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5sb2dpblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnJvdXRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmFwcFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLl9ldmVudHMuY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5fcXVlcnlTdHJlYW0uY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5fcmVzdWx0c1N0cmVhbS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIGdldCBldmVudHMoKTogT2JzZXJ2YWJsZTxTZWFyY2hTZXJ2aWNlLkV2ZW50cz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzO1xuICAgIH1cblxuICAgIGdldCBxdWVyeVN0cmVhbSgpOiBPYnNlcnZhYmxlPFF1ZXJ5IHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVyeVN0cmVhbTtcbiAgICB9XG5cbiAgICBnZXQgcmVzdWx0c1N0cmVhbSgpOiBPYnNlcnZhYmxlPFJlc3VsdHMgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3VsdHNTdHJlYW0uYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgZ2V0VGFiQ29uZmlnKG5hbWU6IHN0cmluZyk6IENDVGFiIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwU2VydmljZS5jY3F1ZXJ5ICYmIHRoaXMuYXBwU2VydmljZS5jY3F1ZXJ5LnRhYlNlYXJjaCAmJiB0aGlzLmFwcFNlcnZpY2UuY2NxdWVyeS50YWJTZWFyY2gudGFicykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwU2VydmljZS5jY3F1ZXJ5LnRhYlNlYXJjaC50YWJzLmZpbmQodCA9PiBVdGlscy5lcU5DKHQubmFtZSwgbmFtZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IHF1ZXJ5KCk6IFF1ZXJ5IHtcbiAgICAgICAgaWYgKCF0aGlzLl9xdWVyeSkge1xuICAgICAgICAgICAgdGhpcy5fcXVlcnkgPSB0aGlzLm1ha2VRdWVyeSgpO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoe3R5cGU6IFwibmV3LXF1ZXJ5XCIsIHF1ZXJ5OiB0aGlzLl9xdWVyeX0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVyeTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UXVlcnkocXVlcnk6IFF1ZXJ5IHwgdW5kZWZpbmVkLCBuZXdRdWVyeSA9IHRydWUpIHtcbiAgICAgICAgaWYgKHF1ZXJ5ID09PSB0aGlzLl9xdWVyeSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3F1ZXJ5ID0gcXVlcnk7XG4gICAgICAgIGlmICh0aGlzLl9xdWVyeSkge1xuICAgICAgICAgICAgbGV0IGNjcXVlcnk6IENDUXVlcnkgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnByZXZlbnRRdWVyeU5hbWVDaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgY2NxdWVyeSA9IHRoaXMuYXBwU2VydmljZS5jY3F1ZXJ5IHx8IHRoaXMuYXBwU2VydmljZS5kZWZhdWx0Q0NRdWVyeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjcXVlcnkgPSB0aGlzLmFwcFNlcnZpY2UuZ2V0Q0NRdWVyeSh0aGlzLl9xdWVyeS5uYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoIWNjcXVlcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBRdWVyeSAnJHt0aGlzLl9xdWVyeS5uYW1lfScgbm90IGZvdW5kYCk7XG4gICAgICAgICAgICAgICAgICAgIGNjcXVlcnkgPSB0aGlzLmFwcFNlcnZpY2UuZGVmYXVsdENDUXVlcnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNjcXVlcnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9xdWVyeS5uYW1lID0gY2NxdWVyeS5uYW1lO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFwcFNlcnZpY2UuY2NxdWVyeSAhPT0gY2NxdWVyeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcFNlcnZpY2UuY2NxdWVyeSA9IGNjcXVlcnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdRdWVyeSkge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoe3R5cGU6IFwibmV3LXF1ZXJ5XCIsIHF1ZXJ5OiB0aGlzLl9xdWVyeX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyUXVlcnkoKSB7XG4gICAgICAgIHRoaXMuc2V0UXVlcnkodW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlQnJlYWRjcnVtYnMocmVzdWx0czogUmVzdWx0cyB8IHVuZGVmaW5lZCwgb3B0aW9uczogU2VhcmNoU2VydmljZS5TZXRSZXN1bHRzT3B0aW9ucykge1xuICAgICAgICBpZiAoIXJlc3VsdHMpIHtcbiAgICAgICAgICAgIHRoaXMuYnJlYWRjcnVtYnMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmJyZWFkY3J1bWJzIHx8ICghb3B0aW9ucy5yZXN1c2VCcmVhZGNydW1icyAmJiAhb3B0aW9ucy5hZHZhbmNlZCkpIHtcbiAgICAgICAgICAgIHRoaXMuYnJlYWRjcnVtYnMgPSBCcmVhZGNydW1icy5jcmVhdGUodGhpcy5hcHBTZXJ2aWNlLCB0aGlzLCB0aGlzLnF1ZXJ5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcHRpb25zLmFkdmFuY2VkKSB7XG4gICAgICAgICAgICB0aGlzLmJyZWFkY3J1bWJzLnVwZGF0ZSh0aGlzLnF1ZXJ5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3NldFJlc3VsdHMocmVzdWx0czogUmVzdWx0cyB8IHVuZGVmaW5lZCwgb3B0aW9uczogU2VhcmNoU2VydmljZS5TZXRSZXN1bHRzT3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGlmIChyZXN1bHRzID09PSB0aGlzLnJlc3VsdHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZTogXCJiZWZvcmUtbmV3LXJlc3VsdHNcIiwgcmVzdWx0c30pO1xuICAgICAgICB0aGlzLnJlc3VsdHMgPSByZXN1bHRzO1xuICAgICAgICB0aGlzLnRyZWF0UXVlcnlJbnRlbnRzKHJlc3VsdHMpO1xuICAgICAgICB0aGlzLnVwZGF0ZUJyZWFkY3J1bWJzKHJlc3VsdHMsIG9wdGlvbnMpO1xuICAgICAgICBpZiAodGhpcy5yZXN1bHRzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZXN1bHRzLnRhYikge1xuICAgICAgICAgICAgICAgIHRoaXMucXVlcnkudGFiID0gdGhpcy5yZXN1bHRzLnRhYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3VsdHMuYXR0cmlidXRlcyAmJiB0aGlzLnJlc3VsdHMuYXR0cmlidXRlcy5xdWVyeWlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWVyeS5xdWVyeUlkID0gdGhpcy5yZXN1bHRzLmF0dHJpYnV0ZXMucXVlcnlpZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZTogXCJuZXctcmVzdWx0c1wiLCByZXN1bHRzOiB0aGlzLnJlc3VsdHN9KTtcbiAgICAgICAgdGhpcy5fcmVzdWx0c1N0cmVhbS5uZXh0KHRoaXMucmVzdWx0cyk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFJlc3VsdHMocmVzdWx0czogUmVzdWx0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0UmVzdWx0cyhyZXN1bHRzKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBxdWVyeWludGVudHMgaW4gdGhlaXIgb3duIHNlcnZpY2UgP1xuXG4gICAgcHJpdmF0ZSB0cmVhdFF1ZXJ5SW50ZW50cyAocmVzdWx0czogUmVzdWx0cyB8IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAocmVzdWx0cyAmJiByZXN1bHRzLnF1ZXJ5QW5hbHlzaXMgJiYgcmVzdWx0cy5xdWVyeUludGVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5SW50ZW50cyA9IHJlc3VsdHMucXVlcnlJbnRlbnRzO1xuICAgICAgICAgICAgZm9yIChjb25zdCBpbnRlbnQgb2YgcXVlcnlJbnRlbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGludGVudC5hY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIGludGVudC5hY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudDogU2VhcmNoU2VydmljZS5Qcm9jZXNzUXVlcnlJbnRlbnRBY3Rpb25FdmVudCA9IHt0eXBlOiBcInByb2Nlc3MtcXVlcnktaW50ZW50LWFjdGlvblwiLCBhY3Rpb246IGFjdGlvbiwgaW50ZW50OiBpbnRlbnQsIGFuYWx5c2lzOiByZXN1bHRzLnF1ZXJ5QW5hbHlzaXN9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFldmVudC5hY3Rpb25Qcm9jZXNzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFhY3Rpb24uZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGFiXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdHMucXVlcnlBbmFseXNpcy5pbml0aWFsICYmIHRoaXMucXVlcnkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIVV0aWxzLmVxTkModGhpcy5xdWVyeS50YWIgfHwgXCJcIiwgYWN0aW9uLmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiKGFjdGlvbi5kYXRhLCB7c2tpcExvY2F0aW9uQ2hhbmdlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGhhdmVSZWNvcmRzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLnJlc3VsdHMgJiYgISF0aGlzLnJlc3VsdHMucmVjb3JkcyAmJiB0aGlzLnJlc3VsdHMucmVjb3Jkcy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGdldCByb3dDb3VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gKCEhdGhpcy5yZXN1bHRzICYmIHRoaXMucmVzdWx0cy5yb3dDb3VudCkgPyB0aGlzLnJlc3VsdHMucm93Q291bnQgOiAwO1xuICAgIH1cblxuICAgIGdldCB0b3RhbFJvd0NvdW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAoISF0aGlzLnJlc3VsdHMgJiYgdGhpcy5yZXN1bHRzLnRvdGFsUm93Q291bnQpID8gdGhpcy5yZXN1bHRzLnRvdGFsUm93Q291bnQgOiAwO1xuICAgIH1cblxuICAgIGdldCBwYWdlU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5xdWVyeSAmJiB0aGlzLnF1ZXJ5LnBhZ2VTaXplKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5xdWVyeS5wYWdlU2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hcHBTZXJ2aWNlLmNjcXVlcnkgJiYgdGhpcy5hcHBTZXJ2aWNlLmNjcXVlcnkucGFnZVNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcFNlcnZpY2UuY2NxdWVyeS5wYWdlU2l6ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU2VhcmNoU2VydmljZS5EZWZhdWx0UGFnZVNpemU7XG4gICAgfVxuXG4gICAgZ2V0IHBhZ2UoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlc3VsdHMpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3VsdHMucGFnZTtcbiAgICB9XG5cbiAgICBnZXQgcGFnZUNvdW50KCk6IG51bWJlciB7XG4gICAgICAgIGlmICghdGhpcy5yZXN1bHRzIHx8ICF0aGlzLnJlc3VsdHMucm93Q291bnQpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy5yZXN1bHRzLnJvd0NvdW50IC8gdGhpcy5yZXN1bHRzLnBhZ2VTaXplKTtcbiAgICB9XG5cbiAgICBtYWtlUXVlcnkocmVjZW50UXVlcnk/OiBRdWVyeSk6IFF1ZXJ5IHtcbiAgICAgICAgY29uc3QgY2NxdWVyeSA9IHRoaXMuYXBwU2VydmljZS5jY3F1ZXJ5O1xuICAgICAgICBjb25zdCBxdWVyeSA9IG5ldyBRdWVyeShjY3F1ZXJ5ID8gY2NxdWVyeS5uYW1lIDogXCJfdW5rbm93blwiKTtcbiAgICAgICAgaWYocmVjZW50UXVlcnkpe1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihxdWVyeSwgcmVjZW50UXVlcnkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KHt0eXBlOiBcIm1ha2UtcXVlcnlcIiwgcXVlcnk6IHF1ZXJ5fSk7XG4gICAgICAgIHJldHVybiBxdWVyeTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFrZUF1ZGl0RXZlbnQoZXZlbnQ6IEF1ZGl0RXZlbnQpOiBBdWRpdEV2ZW50IHtcbiAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoe3R5cGU6IFwibWFrZS1hdWRpdC1ldmVudFwiLCBldmVudDogZXZlbnR9KTtcbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH1cblxuICAgIHNlbGVjdEJyZWFkY3J1bWJzSXRlbShpdGVtOiBCcmVhZGNydW1ic0l0ZW0pIHtcbiAgICAgICAgaWYgKHRoaXMuYnJlYWRjcnVtYnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5icmVhZGNydW1icy5zZWxlY3RJdGVtKGl0ZW0pO1xuICAgICAgICAgICAgaWYgKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRRdWVyeShxdWVyeSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoKHtyZXVzZUJyZWFkY3J1bWJzOiB0cnVlfSk7IC8vIGF1ZGl0P1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlQnJlYWRjcnVtYnNJdGVtKGl0ZW06IEJyZWFkY3J1bWJzSXRlbSkge1xuICAgICAgICBpZiAodGhpcy5icmVhZGNydW1icykge1xuICAgICAgICAgICAgY29uc3QgbmV4dCA9IHRoaXMuYnJlYWRjcnVtYnMucmVtb3ZlSXRlbShpdGVtKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHlTZWFyY2godGhpcy5icmVhZGNydW1icy5xdWVyeSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEJyZWFkY3J1bWJzSXRlbShuZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVNlbGVjdChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmJyZWFkY3J1bWJzKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5icmVhZGNydW1icy5pdGVtc1tpbmRleCArIDFdO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVCcmVhZGNydW1ic0l0ZW0oaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVUZXh0KCkge1xuICAgICAgICBpZiAodGhpcy5icmVhZGNydW1icykge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuYnJlYWRjcnVtYnMuaXRlbXNbMF07XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUJyZWFkY3J1bWJzSXRlbShpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyKG5hdmlnYXRlID0gdHJ1ZSwgcGF0aD86IHN0cmluZykge1xuICAgICAgICB0aGlzLmNsZWFyUXVlcnkoKTtcbiAgICAgICAgcGF0aCA9IHBhdGggfHwgdGhpcy5vcHRpb25zLmhvbWVSb3V0ZTtcbiAgICAgICAgdGhpcy5fc2V0UmVzdWx0cyh1bmRlZmluZWQpO1xuICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZTogXCJjbGVhclwiLCBwYXRofSk7XG4gICAgICAgIGlmIChuYXZpZ2F0ZSkge1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZSh7cGF0aDogcGF0aCB8fCB0aGlzLm9wdGlvbnMuaG9tZVJvdXRlfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBob21lKHBhdGggPSB0aGlzLm9wdGlvbnMuaG9tZVJvdXRlKSB7XG4gICAgICAgIHRoaXMuY2xlYXIodHJ1ZSwgcGF0aCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1ha2VRdWVyeUludGVudERhdGEocXVlcnlJbnRlbnREYXRhOiBRdWVyeUludGVudERhdGEpOiBRdWVyeUludGVudERhdGEge1xuICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZTogXCJtYWtlLXF1ZXJ5LWludGVudC1kYXRhXCIsIGludGVudERhdGE6IHF1ZXJ5SW50ZW50RGF0YX0pO1xuICAgICAgICByZXR1cm4gcXVlcnlJbnRlbnREYXRhO1xuICAgIH1cblxuICAgIGlzRW1wdHlTZWFyY2hJZ25vcmVTZWxlY3RzKHF1ZXJ5OiBRdWVyeSB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXF1ZXJ5LmFjdGlvbiB8fCBxdWVyeS5hY3Rpb24gPT09IFwic2VhcmNoXCIpIHtcbiAgICAgICAgICAgIC8vIFRlc3QgaXNGaXJzdFBhZ2VcbiAgICAgICAgICAgIGlmIChxdWVyeS5pc0ZpcnN0UGFnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRlc3QgZW1wdHkgdGV4dFxuICAgICAgICAgICAgaWYgKHF1ZXJ5LnRleHQgJiYgVXRpbHMudHJpbShxdWVyeS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRlc3QgYmFza2V0XG4gICAgICAgICAgICBpZiAocXVlcnkuYmFza2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzRW1wdHlTZWFyY2gocXVlcnk6IFF1ZXJ5IHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghcXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcXVlcnkuYWN0aW9uIHx8IHF1ZXJ5LmFjdGlvbiA9PT0gXCJzZWFyY2hcIikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzRW1wdHlTZWFyY2hJZ25vcmVTZWxlY3RzKHF1ZXJ5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRlc3Qgbm8gZmFjZXQgc2VsZWN0aW9uXG4gICAgICAgICAgICBpZiAocXVlcnkuc2VsZWN0ICYmIHF1ZXJ5LnNlbGVjdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNoZWNrRW1wdHlTZWFyY2gocXVlcmllczogUXVlcnkgfCBRdWVyeVtdKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmFwcFNlcnZpY2UuY2NxdWVyeSAmJiAhdGhpcy5hcHBTZXJ2aWNlLmNjcXVlcnkuYWxsb3dFbXB0eVNlYXJjaCkge1xuICAgICAgICAgICAgaWYgKCFVdGlscy5pc0FycmF5KHF1ZXJpZXMpKSB7XG4gICAgICAgICAgICAgICAgcXVlcmllcyA9IFtxdWVyaWVzXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgcXVlcnkgb2YgcXVlcmllcykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHlTZWFyY2gocXVlcnkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uc1NlcnZpY2UuaW5mbyhcIm1zZyNzZWFyY2guZW1wdHlTZWFyY2hOb3RpZmljYXRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZ2V0UmVzdWx0cyhcbiAgICAgICAgcXVlcnk6IFF1ZXJ5LCBhdWRpdEV2ZW50cz86IEF1ZGl0RXZlbnRzLFxuICAgICAgICBvcHRpb25zOiBTZWFyY2hTZXJ2aWNlLkdldFJlc3VsdHNPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPFJlc3VsdHM+IHtcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrRW1wdHlTZWFyY2gocXVlcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihcImVtcHR5IHNlYXJjaFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9wdGlvbnMuc2VhcmNoSW5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0YWIgPSB0aGlzLmdldEN1cnJlbnRUYWIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnlTZXJ2aWNlLmdldFJlc3VsdHMocXVlcnksIGF1ZGl0RXZlbnRzLFxuICAgICAgICAgICAgdGhpcy5tYWtlUXVlcnlJbnRlbnREYXRhKHtcbiAgICAgICAgICAgICAgICB0YWI6ICEhdGFiID8gdGFiLm5hbWUgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgcXVlcnlJbnRlbnRzOiBvcHRpb25zLnF1ZXJ5SW50ZW50cyxcbiAgICAgICAgICAgICAgICBxdWVyeUFuYWx5c2lzOiBvcHRpb25zLnF1ZXJ5QW5hbHlzaXNcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldE11bHRpcGxlUmVzdWx0cyhxdWVyaWVzOiBRdWVyeVtdLCBhdWRpdEV2ZW50cz86IEF1ZGl0RXZlbnRzKTogT2JzZXJ2YWJsZTxJTXVsdGk8UmVzdWx0cz4+IHtcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrRW1wdHlTZWFyY2gocXVlcmllcykpIHtcbiAgICAgICAgICAgIHJldHVybiBvZih7cmVzdWx0czogW119KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeVNlcnZpY2UuZ2V0TXVsdGlwbGVSZXN1bHRzKHF1ZXJpZXMsIGF1ZGl0RXZlbnRzKTtcbiAgICB9XG5cbiAgICBuYXZpZ2F0ZShvcHRpb25zPzogU2VhcmNoU2VydmljZS5OYXZpZ2F0aW9uT3B0aW9ucywgYXVkaXQ/OiBBdWRpdEV2ZW50cyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9wdGlvbnMuYW5hbHl6ZVF1ZXJ5VGV4dCAmJiB0aGlzLnJlc3VsdHMpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucXVlcnlJbnRlbnRzID0gdGhpcy5yZXN1bHRzLnF1ZXJ5SW50ZW50cztcbiAgICAgICAgICAgIG9wdGlvbnMucXVlcnlBbmFseXNpcyA9IHRoaXMucmVzdWx0cy5xdWVyeUFuYWx5c2lzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5yb3V0aW5nQWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZU5hdmlnYXRpb24ob3B0aW9ucywgYXVkaXQpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFNhdmUgY3VycmVudFBhdGggYW5kIGN1cnJlbnRTZWFyY2hcbiAgICAgICAgICAgIGxldCB1cmwgPSBVdGlscy5tYWtlVVJMKHRoaXMucm91dGVyLnVybCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UGF0aCA9IHVybC5wYXRobmFtZTtcbiAgICAgICAgICAgIHVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKFwiJHJlZnJlc2hcIik7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50U2VhcmNoID0gZGVjb2RlVVJJQ29tcG9uZW50KHVybC5zZWFyY2gpO1xuICAgICAgICAgICAgLy8gU2V0IHVwIHF1ZXJ5UGFyYW1zIGFuZCBhZGQgY3VycmVudCBxdWVyeVxuICAgICAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSBVdGlscy5jb3B5KHRoaXMucXVlcnlTdHJpbmdQYXJhbXMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3F1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgcXVlcnlQYXJhbXMucXVlcnkgPSB0aGlzLl9xdWVyeS50b0pzb25Gb3JRdWVyeVN0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU2V0IHVwIGhpc3Rvcnkgc3RhdGVcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlOiBTZWFyY2hTZXJ2aWNlLkhpc3RvcnlTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICBhdWRpdCxcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uT3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGV4dHJhcyA9IHtcbiAgICAgICAgICAgICAgICBxdWVyeVBhcmFtcyxcbiAgICAgICAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICAgICAgICBza2lwTG9jYXRpb25DaGFuZ2U6IG9wdGlvbnMuc2tpcExvY2F0aW9uQ2hhbmdlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIG5ldyBzZWFyY2hcbiAgICAgICAgICAgIGxldCBwYXRoID0gb3B0aW9ucy5wYXRoO1xuICAgICAgICAgICAgaWYgKCFwYXRoKSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IGN1cnJlbnRQYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXJsID0gVXRpbHMubWFrZVVSTChwYXRoKTtcbiAgICAgICAgICAgIHBhdGggPSB1cmwucGF0aG5hbWU7IC8vIG5vcm1hbGl6ZWRcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHF1ZXJ5UGFyYW1zKSkge1xuICAgICAgICAgICAgICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KGtleSwgcXVlcnlQYXJhbXNba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzZWFyY2ggPSBkZWNvZGVVUklDb21wb25lbnQodXJsLnNlYXJjaCk7XG4gICAgICAgICAgICAvLyBJZiBwYXRoIGFuZCBzZWFyY2ggYXJlIGJvdGggdGhlIHNhbWUgYXMgY3VycmVudCB0aGVuIGZvcmNlIG5hdmlnYXRpb24gKHdpdGhvdXQgYWRkaW5nIHRvIGhpc3RvcnkpXG4gICAgICAgICAgICBpZiAoVXRpbHMuZXEoY3VycmVudFBhdGgsIHBhdGgpICYmIFV0aWxzLmVxKGN1cnJlbnRTZWFyY2gsIHNlYXJjaCkpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSB3YW50IHRvIGZvcmNlIHRoZSBuYXZpZ2F0aW9uIHNvIHRoYXQgdGhlIHF1ZXJ5IHdpbGwgYmUgcHJvY2Vzc2VkXG4gICAgICAgICAgICAgICAgZXh0cmFzLnF1ZXJ5UGFyYW1zLiRyZWZyZXNoID0gVXRpbHMubm93LmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAvLyBCdXQgZG9uJ3QgdXBkYXRlIHRoZSBicm93c2VyIHVybFxuICAgICAgICAgICAgICAgIGV4dHJhcy5za2lwTG9jYXRpb25DaGFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm91dGVyLm5hdmlnYXRlKFtwYXRoXSwgZXh0cmFzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRIaXN0b3J5U3RhdGUoKTogU2VhcmNoU2VydmljZS5IaXN0b3J5U3RhdGUge1xuICAgICAgICBjb25zdCBuYXZpZ2F0aW9uID0gdGhpcy5yb3V0ZXIuZ2V0Q3VycmVudE5hdmlnYXRpb24oKTtcbiAgICAgICAgaWYgKG5hdmlnYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBuYXZpZ2F0aW9uLmV4dHJhcyAmJiBuYXZpZ2F0aW9uLmV4dHJhcy5zdGF0ZSB8fCB7fTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2luZG93Lmhpc3Rvcnkuc3RhdGUgfHwge307XG4gICAgfVxuXG4gICAgcHVibGljIGlzU2VhcmNoUm91dGVBY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHVybCA9IFV0aWxzLm1ha2VVUkwodGhpcy5yb3V0ZXIudXJsKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTZWFyY2hSb3V0ZSh1cmwucGF0aG5hbWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBpc1NlYXJjaFJvdXRlKHBhdGhuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tTZWFyY2hSb3V0ZShwYXRobmFtZSwgdGhpcy5vcHRpb25zLnJvdXRlcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGlzU2tpcFNlYXJjaFJvdXRlKHBhdGhuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tTZWFyY2hSb3V0ZShwYXRobmFtZSwgdGhpcy5vcHRpb25zLnNraXBTZWFyY2hSb3V0ZXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tTZWFyY2hSb3V0ZShwYXRobmFtZTogc3RyaW5nLCByb3V0ZXM6IHN0cmluZ1tdIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChyb3V0ZXMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgcm91dGUgb2Ygcm91dGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKFV0aWxzLmVuZHNXaXRoKHBhdGhuYW1lLCBVdGlscy5hZGRVcmwoXCIvXCIsIHJvdXRlKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UXVlcnlGcm9tVXJsKCk6IFF1ZXJ5IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgbGV0IHF1ZXJ5OiBRdWVyeSB8IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgdXJsID0gVXRpbHMubWFrZVVSTCh0aGlzLnJvdXRlci51cmwpO1xuICAgICAgICBpZiAodGhpcy5pc1NlYXJjaFJvdXRlKHVybC5wYXRobmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGpxdWVyeSA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwicXVlcnlcIik7XG4gICAgICAgICAgICBpZiAoanF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkgPSB0aGlzLm1ha2VRdWVyeSgpLmZyb21Kc29uKGpxdWVyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBlbnN1cmVRdWVyeUZyb21VcmwoKTogUXVlcnkgfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMuZ2V0UXVlcnlGcm9tVXJsKCk7XG4gICAgICAgIGlmICghcXVlcnkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRoZSB1cmwgcXVlcnkgc2hvdWxkIGJlIHRoZSBzYW1lIGFzIHRoZSBjdXJyZW50IHF1ZXJ5IG9uIFNlYXJjaFNlcnZpY2UgdW5sZXNzXG4gICAgICAgICAgICAvLyBpdCdzIHRoZSBpbml0aWFsIG5hdmlnYXRpb24gb3IgaWYgdGhlIHVybCBpcyBjaGFuZ2VkIG1hbnVhbGx5LlxuICAgICAgICAgICAgLy8gSW4gYW55IGNhc2UsIHdlIGFsd2F5cyBzZXQgdGhlIHF1ZXJ5IGZyb20gdGhlIHVybC4gV2Ugb25seSBzZW5kIGEgbmV3LXF1ZXJ5XG4gICAgICAgICAgICAvLyBldmVudCBpZiB0aGUgY3VycmVudCBxdWVyeSBpcyBlbXB0eSBzbyB0aGF0IHdlIGRvbid0IHN5c3RlbWF0aWNhbGx5IGNyZWF0ZSBhXG4gICAgICAgICAgICAvLyBuZXcgcXVlcnkgXCJzZXNzaW9uXCIgKG1sLWF1ZGl0KVxuICAgICAgICAgICAgdGhpcy5zZXRRdWVyeShxdWVyeSwgIXRoaXMuX3F1ZXJ5KTtcbiAgICAgICAgICAgIHJldHVybiBxdWVyeTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBoYW5kbGVMb2dpbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2luU2VydmljZS5jb21wbGV0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhdGhpcy5lbnN1cmVRdWVyeUZyb21VcmwoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmF2aWdhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgcm91dGluZ0FjdGl2ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLm9wdGlvbnMuZGVhY3RpdmF0ZVJvdXRpbmc7XG4gICAgfVxuXG4gICAgc2V0IHJvdXRpbmdBY3RpdmUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmRlYWN0aXZhdGVSb3V0aW5nID0gIXZhbHVlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYWtlQXVkaXRFdmVudEZyb21DdXJyZW50UXVlcnkoKTogQXVkaXRFdmVudCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGNvbnN0IGxhc3RTZWxlY3QgPSB0aGlzLnF1ZXJ5Lmxhc3RTZWxlY3QoKTtcbiAgICAgICAgaWYgKGxhc3RTZWxlY3QpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RFeHByID0gdGhpcy5hcHBTZXJ2aWNlLnBhcnNlRXhwcihsYXN0U2VsZWN0LmV4cHJlc3Npb24pO1xuICAgICAgICAgICAgaWYgKGxhc3RFeHByIGluc3RhbmNlb2YgRXhwcikge1xuICAgICAgICAgICAgICAgIGlmIChsYXN0RXhwci5maWVsZCA9PT0gXCJyZWZpbmVcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYWtlQXVkaXRFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBBdWRpdEV2ZW50VHlwZS5TZWFyY2hfUmVmaW5lLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbGFzdEV4cHIudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbWJveDogbGFzdFNlbGVjdC5mYWNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZyb20tcmVzdWx0LWlkXCI6ICEhdGhpcy5yZXN1bHRzID8gdGhpcy5yZXN1bHRzLmlkIDogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1ha2VBdWRpdEV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEF1ZGl0RXZlbnRUeXBlLlNlYXJjaF9TZWxlY3RfSXRlbSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IGxhc3RTZWxlY3QgYXMgYW55LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1ib3g6IGxhc3RTZWxlY3QuZmFjZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbWNvbHVtbjogbGFzdEV4cHIuZmllbGQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNpdGVtZXhjbHVkZTogbGFzdEV4cHIubm90LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJvbS1yZXN1bHQtaWRcIjogISF0aGlzLnJlc3VsdHMgPyB0aGlzLnJlc3VsdHMuaWQgOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnF1ZXJ5LmJhc2tldCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1ha2VBdWRpdEV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogQXVkaXRFdmVudFR5cGUuQmFza2V0X09wZW4sXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFza2V0OiB0aGlzLnF1ZXJ5LmJhc2tldFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYWtlQXVkaXRFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEF1ZGl0RXZlbnRUeXBlLlNlYXJjaF9UZXh0LFxuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMucXVlcnkudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlOiB0aGlzLnF1ZXJ5LnNjb3BlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBoYW5kbGVOYXZpZ2F0aW9uKG5hdmlnYXRpb25PcHRpb25zPzogU2VhcmNoU2VydmljZS5OYXZpZ2F0aW9uT3B0aW9ucywgYXVkaXQ/OiBBdWRpdEV2ZW50cyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBpZiAoIXRoaXMubG9naW5TZXJ2aWNlLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuYXBwU2VydmljZS5jY3F1ZXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcXVlcnkgPSB0aGlzLl9xdWVyeTtcbiAgICAgICAgaWYgKHRoaXMucm91dGluZ0FjdGl2ZSkge1xuICAgICAgICAgICAgcXVlcnkgPSB0aGlzLmVuc3VyZVF1ZXJ5RnJvbVVybCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KHt0eXBlOiBcInVwZGF0ZS1xdWVyeVwiLCBxdWVyeX0pO1xuICAgICAgICB0aGlzLl9xdWVyeVN0cmVhbS5uZXh0KHF1ZXJ5KTtcbiAgICAgICAgaWYgKCFxdWVyeSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yb3V0aW5nQWN0aXZlKSB7XG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0SGlzdG9yeVN0YXRlKCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImhpc3Rvcnkuc3RhdGU6XCIsIHN0YXRlKTtcbiAgICAgICAgICAgIGF1ZGl0ID0gc3RhdGUuYXVkaXQ7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uT3B0aW9ucyA9IHN0YXRlLm5hdmlnYXRpb25PcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIG5hdmlnYXRpb25PcHRpb25zID0gbmF2aWdhdGlvbk9wdGlvbnMgfHwge307XG4gICAgICAgIGNvbnN0IHBhdGhOYW1lID0gbmF2aWdhdGlvbk9wdGlvbnMucGF0aCA/IG5hdmlnYXRpb25PcHRpb25zLnBhdGggOiBVdGlscy5tYWtlVVJMKHRoaXMucm91dGVyLnVybCkucGF0aG5hbWU7XG4gICAgICAgIGlmKG5hdmlnYXRpb25PcHRpb25zLnNraXBTZWFyY2ggfHwgdGhpcy5pc1NraXBTZWFyY2hSb3V0ZShwYXRoTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhdWRpdCkge1xuICAgICAgICAgICAgYXVkaXQgPSB0aGlzLm1ha2VBdWRpdEV2ZW50RnJvbUN1cnJlbnRRdWVyeSgpO1xuICAgICAgICAgICAgaWYgKGF1ZGl0ICYmIGF1ZGl0LnR5cGUgPT09IEF1ZGl0RXZlbnRUeXBlLlNlYXJjaF9UZXh0KSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG5hdmlnYXRpb25PcHRpb25zLnF1ZXJ5SW50ZW50cztcbiAgICAgICAgICAgICAgICBkZWxldGUgbmF2aWdhdGlvbk9wdGlvbnMucXVlcnlBbmFseXNpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IHRoaXMuZ2V0UmVzdWx0cyh0aGlzLnF1ZXJ5LCBhdWRpdCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBxdWVyeUludGVudHM6IG5hdmlnYXRpb25PcHRpb25zLnF1ZXJ5SW50ZW50cyxcbiAgICAgICAgICAgICAgICBxdWVyeUFuYWx5c2lzOiBuYXZpZ2F0aW9uT3B0aW9ucy5xdWVyeUFuYWx5c2lzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgVXRpbHMuc3Vic2NyaWJlKG9ic2VydmFibGUsXG4gICAgICAgICAgICAocmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgICAgIG5hdmlnYXRpb25PcHRpb25zID0gbmF2aWdhdGlvbk9wdGlvbnMgfHwge307XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0UmVzdWx0cyhyZXN1bHRzLCB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VzZUJyZWFkY3J1bWJzOiBuYXZpZ2F0aW9uT3B0aW9ucy5yZXVzZUJyZWFkY3J1bWJzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIGlmIChuYXZpZ2F0aW9uT3B0aW9ucy5zZWxlY3RUYWIpIHtcbiAgICAgICAgICAgIGNvbnN0IGFmdGVyU2VsZWN0VGFiRXZlbnQ6IFNlYXJjaFNlcnZpY2UuQWZ0ZXJTZWxlY3RUYWJFdmVudCA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFmdGVyLXNlbGVjdC10YWJcIixcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoYWZ0ZXJTZWxlY3RUYWJFdmVudCk7XG4gICAgICAgICAgICBvYnNlcnZhYmxlID0gYWZ0ZXJTZWxlY3RUYWJFdmVudC5vYnNlcnZhYmxlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUoXG4gICAgICAgICAgICBtYXAoKCkgPT4gdHJ1ZSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKCgpID0+IG9mKGZhbHNlKSkpLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIHNlYXJjaChuYXZpZ2F0aW9uT3B0aW9ucz86IFNlYXJjaFNlcnZpY2UuTmF2aWdhdGlvbk9wdGlvbnMsIGF1ZGl0PzogQXVkaXRFdmVudHMpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgZGVsZXRlIHRoaXMucXVlcnkucGFnZTtcbiAgICAgICAgZGVsZXRlIHRoaXMucXVlcnkuc3BlbGxpbmdDb3JyZWN0aW9uTW9kZTtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF2aWdhdGUobmF2aWdhdGlvbk9wdGlvbnMsIGF1ZGl0KTtcbiAgICB9XG5cbiAgICBzZWFyY2hUZXh0KHBhdGg/OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGVtcHR5IHNlYXJjaCBwcmVlbXB0aXZlbHkgdG8gYXZvaWQgY2xlYXJpbmcgdGhlIGN1cnJlbnQgcmVzdWx0cyBpbiB0aGUgbW9zdFxuICAgICAgICAvLyBjb21tb24gY2FzZSBvZiB0aGUgdXNlciBlbnRlcmluZyBlbXB0eSBzZWFyY2ggdGV4dCBpbiB0aGUgc2VhcmNoIGJveFxuICAgICAgICAvLyBUaGUgbG93ZXIgbGV2ZWwgY2hlY2sgaW4gZ2V0UmVzdWx0cyB3aWxsIGhhbmRsZSBsZXNzIG9idmlvdXMgY2FzZXMgKHVybCBlZGl0aW5nIGV0YylcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrRW1wdHlTZWFyY2godGhpcy5xdWVyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaChcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgICAgIGFuYWx5emVRdWVyeVRleHQ6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGlzLm1ha2VBdWRpdEV2ZW50KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBBdWRpdEV2ZW50VHlwZS5TZWFyY2hfVGV4dCxcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5xdWVyeS50ZXh0LFxuICAgICAgICAgICAgICAgICAgICBzY29wZTogdGhpcy5xdWVyeS5zY29wZSxcbiAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2U6IHRoaXMuaW50bFNlcnZpY2UuY3VycmVudExvY2FsZS5uYW1lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHNlYXJjaFJlZmluZSh0ZXh0OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgLy8gYWRkIFwicmVmaW5lXCIgbmFtZSB0byBmYWNldCB2YWx1ZSBpcyBtYW5kYXRvcnkgYXMgaXQncyB1c2VkIGluIHByZXZpZXcncyBxdWVyeVxuICAgICAgICB0aGlzLnF1ZXJ5LmFkZFNlbGVjdCh0aGlzLmV4cHJCdWlsZGVyLm1ha2VSZWZpbmVFeHByKHRleHQpLCBcInJlZmluZVwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoKHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHRoaXMubWFrZUF1ZGl0RXZlbnQoe1xuICAgICAgICAgICAgICAgIHR5cGU6IEF1ZGl0RXZlbnRUeXBlLlNlYXJjaF9SZWZpbmUsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1ib3g6IFwicmVmaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZnJvbS1yZXN1bHQtaWRcIjogISF0aGlzLnJlc3VsdHMgPyB0aGlzLnJlc3VsdHMuaWQgOiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIGdvdG9QYWdlKHBhZ2U6IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICB0aGlzLnF1ZXJ5LnBhZ2UgPSBwYWdlO1xuICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZSh1bmRlZmluZWQsIHRoaXMubWFrZUF1ZGl0RXZlbnQoe1xuICAgICAgICAgICAgdHlwZTogQXVkaXRFdmVudFR5cGUuU2VhcmNoX0dvdG9QYWdlLFxuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgcGFnZTogcGFnZSxcbiAgICAgICAgICAgICAgICBcImZyb20tcmVzdWx0LWlkXCI6ICEhdGhpcy5yZXN1bHRzID8gdGhpcy5yZXN1bHRzLmlkIDogbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZCBtb3JlIHJlc3VsdHMgYW5kIGFwcGVuZCB0aGVtIHRvIHByZXZpb3VzIHJlc3VsdHNcbiAgICAgKi9cbiAgICBsb2FkTW9yZSgpIHtcbiAgICAgICAgaWYoIXRoaXMuZmV0Y2hpbmdMb2FkTW9yZSkge1xuICAgICAgICAgICAgbGV0IHBhZ2UgPSB0aGlzLnF1ZXJ5LnBhZ2UgfHwgdGhpcy5wYWdlO1xuICAgICAgICAgICAgcGFnZSArPSAocGFnZSA8PSB0aGlzLnBhZ2VDb3VudCkgPyAxIDogMDtcbiAgICAgICAgICAgIGlmIChwYWdlIDw9IHRoaXMucGFnZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaGluZ0xvYWRNb3JlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5LnBhZ2UgPSBwYWdlO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgYXVkaXRFdmVudHMgPSB0aGlzLm1ha2VBdWRpdEV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogQXVkaXRFdmVudFR5cGUuU2VhcmNoX0dvdG9QYWdlLFxuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2U6IHBhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyb20tcmVzdWx0LWlkXCI6ICEhdGhpcy5yZXN1bHRzID8gdGhpcy5yZXN1bHRzLmlkIDogbnVsbFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVzdWx0cyh0aGlzLnF1ZXJ5LCBhdWRpdEV2ZW50cylcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnJlc3VsdHMgJiYgcmVzdWx0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRzLnJlY29yZHMgPSBbLi4udGhpcy5yZXN1bHRzPy5yZWNvcmRzIHx8IFtdLCAuLi5yZXN1bHRzLnJlY29yZHNdIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzdWx0c1N0cmVhbS5uZXh0KHRoaXMucmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mZXRjaGluZ0xvYWRNb3JlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIG1vcmUgYXJlIGF2YWlsYWJsZSBvdGhlcndpc2UgZmFsc2VcbiAgICAgKi9cbiAgICBoYXNNb3JlKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBwYWdlID0gdGhpcy5xdWVyeS5wYWdlIHx8IHRoaXMucGFnZTtcbiAgICAgICAgcmV0dXJuIChwYWdlIDwgdGhpcy5wYWdlQ291bnQpO1xuICAgIH1cblxuICAgIGRpZFlvdU1lYW4odGV4dDogc3RyaW5nLCBjb250ZXh0OiBcInNlYXJjaFwiIHwgXCJyZWZpbmVcIiwga2luZDogRGlkWW91TWVhbktpbmQpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgaWYgKGNvbnRleHQgPT09IFwic2VhcmNoXCIpIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnkudGV4dCA9IHRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCByZWZpbmVTZWxlY3QgPSB0aGlzLnF1ZXJ5LmZpbmRTZWxlY3QoXCJyZWZpbmVcIik7XG4gICAgICAgICAgICBpZiAocmVmaW5lU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgcmVmaW5lU2VsZWN0LmV4cHJlc3Npb24gPSBcInJlZmluZTpcIiArIEV4cHJQYXJzZXIuZXNjYXBlKHRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucXVlcnkuc3BlbGxpbmdDb3JyZWN0aW9uTW9kZSA9IFwiZHltb25seVwiO1xuICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZSh1bmRlZmluZWQsIHRoaXMubWFrZUF1ZGl0RXZlbnQoe1xuICAgICAgICAgICAgdHlwZToga2luZCA9PT0gRGlkWW91TWVhbktpbmQuT3JpZ2luYWwgPyBBdWRpdEV2ZW50VHlwZS5TZWFyY2hfRGlkWW91TWVhbl9PcmlnaW5hbCA6IEF1ZGl0RXZlbnRUeXBlLlNlYXJjaF9EaWRZb3VNZWFuX0NvcnJlY3Rpb24sXG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICB0ZXh0OiB0ZXh0XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50UmVjb3JkSWRzKCk6IHN0cmluZ1tde1xuICAgICAgICBpZiAodGhpcy5yZXN1bHRzICYmIHRoaXMucmVzdWx0cy5yZWNvcmRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHRzLnJlY29yZHMubWFwKHJlY29yZCA9PiByZWNvcmQuaWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBnZXRSZWNvcmRGcm9tSWQoaWQ6IHN0cmluZyk6IFJlY29yZCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICh0aGlzLnJlc3VsdHMgJiYgdGhpcy5yZXN1bHRzLnJlY29yZHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc3VsdHMucmVjb3Jkcy5maW5kKHJlY29yZCA9PiBVdGlscy5lcShyZWNvcmQuaWQsIGlkKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBhZGRGaWVsZFNlbGVjdChmaWVsZDogc3RyaW5nLCBpdGVtczogVmFsdWVJdGVtIHwgVmFsdWVJdGVtW10sIG9wdGlvbnM/OiBTZWFyY2hTZXJ2aWNlLkFkZFNlbGVjdE9wdGlvbnMpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGl0ZW1zICYmICghVXRpbHMuaXNBcnJheShpdGVtcykgfHwgaXRlbXMubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgIGxldCBleHByID0gdGhpcy5leHByQnVpbGRlci5tYWtlRmllbGRFeHByKGZpZWxkLCBpdGVtcywgb3B0aW9ucz8uYW5kKTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zPy5ub3QpIHtcbiAgICAgICAgICAgICAgICBleHByID0gdGhpcy5leHByQnVpbGRlci5tYWtlTm90RXhwcihleHByKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucXVlcnkuYWRkU2VsZWN0KGV4cHIsIG9wdGlvbnM/LmZhY2V0TmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG5cbiAgICBnZXQgbGFzdFJlZmluZVRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuYnJlYWRjcnVtYnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlZmluZUV4cHIgPSB0aGlzLmJyZWFkY3J1bWJzLmZpbmRTZWxlY3QoXCJyZWZpbmVcIik7XG4gICAgICAgICAgICBpZiAocmVmaW5lRXhwcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBFeHByUGFyc2VyLnVuZXNjYXBlKHJlZmluZUV4cHIudG9TdHJpbmcoZmFsc2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG5cbiAgICBnZXQgaGFzUmVsZXZhbmNlKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIXRoaXMuYnJlYWRjcnVtYnMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5icmVhZGNydW1icy50ZXh0RXhwcj8uaGFzUmVsZXZhbmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZWZpbmVFeHByID0gdGhpcy5icmVhZGNydW1icy5maW5kU2VsZWN0KFwicmVmaW5lXCIpO1xuICAgICAgICByZXR1cm4gcmVmaW5lRXhwcj8uaGFzUmVsZXZhbmNlIHx8IGZhbHNlO1xuICAgIH1cblxuICAgIHNlbGVjdFRhYihhcmc6IHN0cmluZyB8IFRhYiwgb3B0aW9uczogU2VhcmNoU2VydmljZS5OYXZpZ2F0aW9uT3B0aW9ucyA9IHt9KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIG9wdGlvbnMuc2VsZWN0VGFiID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgdGFiTmFtZSA9IHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnID8gYXJnIDogYXJnLm5hbWU7XG4gICAgICAgIHRoaXMucXVlcnkudGFiID0gdGFiTmFtZTtcbiAgICAgICAgZGVsZXRlIHRoaXMucXVlcnkucXVlcnlJZDsgLy8gU0JBLTE1NFxuICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZTogXCJiZWZvcmUtc2VsZWN0LXRhYlwiLCBxdWVyeTogdGhpcy5xdWVyeX0pO1xuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2gob3B0aW9ucyxcbiAgICAgICAgICAgIHRoaXMubWFrZUF1ZGl0RXZlbnQoe1xuICAgICAgICAgICAgICAgIHR5cGU6IEF1ZGl0RXZlbnRUeXBlLlNlYXJjaF9Hb3RvVGFiLFxuICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICB0YWI6IHRhYk5hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwiZnJvbS1yZXN1bHQtaWRcIjogISF0aGlzLnJlc3VsdHMgPyB0aGlzLnJlc3VsdHMuaWQgOiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHNlbGVjdFNjb3BlKHNjb3BlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5xdWVyeS5zY29wZSA9IHNjb3BlO1xuICAgIH1cblxuICAgIGdldFRhYih0YWJOYW1lOiBzdHJpbmcpOiBUYWIgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy5yZXN1bHRzICYmIHRoaXMucmVzdWx0cy50YWJzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRhYiBvZiB0aGlzLnJlc3VsdHMudGFicykge1xuICAgICAgICAgICAgICAgIGlmIChVdGlscy5lcXVhbHModGFiLm5hbWUsIHRhYk5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0Q3VycmVudFRhYigpOiBUYWIgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy5yZXN1bHRzICYmIHRoaXMucmVzdWx0cy50YWIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFRhYih0aGlzLnJlc3VsdHMudGFiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIG5vdGlmeU9wZW5PcmlnaW5hbERvY3VtZW50KHJlY29yZDogUmVjb3JkLCByZXN1bHRJZD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gdGhpcy5yZXN1bHRzICYmIHRoaXMucmVzdWx0cy5yZWNvcmRzICYmIHRoaXMucmVzdWx0cy5yZWNvcmRzLmluY2x1ZGVzKHJlY29yZCkgPyB0aGlzLnJlc3VsdHMgOiB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KHsgdHlwZTogXCJvcGVuLW9yaWdpbmFsLWRvY3VtZW50XCIsIHJlY29yZCB9KTtcbiAgICAgICAgY29uc3QgcXVlcnlsYW5nID0gdGhpcy5yZXN1bHRzPy5xdWVyeUFuYWx5c2lzPy5xdWVyeUxhbmd1YWdlXG4gICAgICAgICAgICB8fCB0aGlzLnF1ZXJ5Py5xdWVzdGlvbkxhbmd1YWdlXG4gICAgICAgICAgICB8fCB0aGlzLmFwcFNlcnZpY2U/LmNjcXVlcnk/LnF1ZXN0aW9uTGFuZ3VhZ2U7XG4gICAgICAgIHRoaXMuYXVkaXRTZXJ2aWNlLm5vdGlmeURvY3VtZW50KFxuICAgICAgICAgICAgQXVkaXRFdmVudFR5cGUuQ2xpY2tfUmVzdWx0TGluayxcbiAgICAgICAgICAgIHJlY29yZCxcbiAgICAgICAgICAgIHJlc3VsdHMgfHwgcmVzdWx0SWQgfHwgXCJcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLnF1ZXJ5LnRleHQsXG4gICAgICAgICAgICAgICAgcXVlcnlsYW5nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBxdWVyeWhhc2g6IHJlc3VsdHMgPyByZXN1bHRzLnJmbVF1ZXJ5SGFzaCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBxdWVyeXRleHQ6IHRoaXMucXVlcnkudGV4dCxcbiAgICAgICAgICAgICAgICBxdWVyeWxhbmc6IHF1ZXJ5bGFuZ1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGNoZWNrQmVmb3JlU2VhcmNoKGNhbmNlbFJlYXNvbnM/OiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBiZWZvcmVTZWFyY2g6IFNlYXJjaFNlcnZpY2UuQmVmb3JlU2VhcmNoRXZlbnQgPSB7dHlwZTogXCJiZWZvcmUtc2VhcmNoXCJ9O1xuICAgICAgICB0aGlzLl9ldmVudHMubmV4dChiZWZvcmVTZWFyY2gpO1xuICAgICAgICBpZiAoY2FuY2VsUmVhc29ucyAmJiBiZWZvcmVTZWFyY2guY2FuY2VsUmVhc29ucykge1xuICAgICAgICAgICAgY2FuY2VsUmVhc29ucy5zcGxpY2UoMCwgMCwgLi4uYmVmb3JlU2VhcmNoLmNhbmNlbFJlYXNvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAhYmVmb3JlU2VhcmNoLmNhbmNlbDtcbiAgICB9XG59XG5cbmV4cG9ydCBtb2R1bGUgU2VhcmNoU2VydmljZSB7XG4gICAgZXhwb3J0IGludGVyZmFjZSBHZXRSZXN1bHRzT3B0aW9ucyB7XG4gICAgICAgIHF1ZXJ5SW50ZW50cz86IFF1ZXJ5SW50ZW50W107XG4gICAgICAgIHF1ZXJ5QW5hbHlzaXM/OiBRdWVyeUFuYWx5c2lzO1xuICAgICAgICBzZWFyY2hJbmFjdGl2ZT86IGJvb2xlYW47ICAgLy8gZGVmYXVsdCBcImZhbHNlXCJcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIFNldFJlc3VsdHNPcHRpb25zIHtcbiAgICAgICAgcmVzdXNlQnJlYWRjcnVtYnM/OiBib29sZWFuO1xuICAgICAgICBhZHZhbmNlZD86IGJvb2xlYW47XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBBZGRTZWxlY3RPcHRpb25zIHtcbiAgICAgICAgbm90PzogYm9vbGVhbjsgICAgICAvLyBkZWZhdWx0IFwiZmFsc2VcIlxuICAgICAgICBhbmQ/OiBib29sZWFuOyAgICAgIC8vIGRlZmF1bHQgXCJmYWxzZVwiXG4gICAgICAgIGZhY2V0TmFtZT86IHN0cmluZzsgLy8gZGVmYXVsdDogdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBOYXZpZ2F0aW9uT3B0aW9ucyB7XG4gICAgICAgIHBhdGg/OiBzdHJpbmc7IC8vIGFic29sdXRlIHBhdGgsIGN1cnJlbnQgcGF0aCB1c2VkIGlmIG5vdCBzcGVjaWZpZWRcbiAgICAgICAgcmV1c2VCcmVhZGNydW1icz86IGJvb2xlYW47XG4gICAgICAgIHNlbGVjdFRhYj86IGJvb2xlYW47XG4gICAgICAgIGFuYWx5emVRdWVyeVRleHQ/OiBib29sZWFuO1xuICAgICAgICBxdWVyeUludGVudHM/OiBRdWVyeUludGVudFtdO1xuICAgICAgICBxdWVyeUFuYWx5c2lzPzogUXVlcnlBbmFseXNpcztcbiAgICAgICAgc2tpcExvY2F0aW9uQ2hhbmdlPzogYm9vbGVhbjtcbiAgICAgICAgc2tpcFNlYXJjaD86IGJvb2xlYW47XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBIaXN0b3J5U3RhdGUge1xuICAgICAgICBhdWRpdD86IEF1ZGl0RXZlbnRzO1xuICAgICAgICBuYXZpZ2F0aW9uT3B0aW9ucz86IE5hdmlnYXRpb25PcHRpb25zO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgRXZlbnQge1xuICAgICAgICB0eXBlOiBcIm5ldy1xdWVyeVwiIHwgXCJ1cGRhdGUtcXVlcnlcIiB8IFwibWFrZS1xdWVyeVwiIHwgXCJiZWZvcmUtbmV3LXJlc3VsdHNcIiB8IFwibmV3LXJlc3VsdHNcIiB8IFwibWFrZS1xdWVyeS1pbnRlbnQtZGF0YVwiIHxcbiAgICAgICAgICAgIFwicHJvY2Vzcy1xdWVyeS1pbnRlbnQtYWN0aW9uXCIgfCBcIm1ha2UtYXVkaXQtZXZlbnRcIiB8XG4gICAgICAgICAgICBcImJlZm9yZS1zZWxlY3QtdGFiXCIgfCBcImFmdGVyLXNlbGVjdC10YWJcIiB8IFwiY2xlYXJcIiB8IFwib3Blbi1vcmlnaW5hbC1kb2N1bWVudFwiIHwgXCJiZWZvcmUtc2VhcmNoXCI7XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBOZXdRdWVyeUV2ZW50IGV4dGVuZHMgRXZlbnQge1xuICAgICAgICB0eXBlOiBcIm5ldy1xdWVyeVwiO1xuICAgICAgICBxdWVyeTogUXVlcnkgfCB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBVcGRhdGVRdWVyeUV2ZW50IGV4dGVuZHMgRXZlbnQge1xuICAgICAgICB0eXBlOiBcInVwZGF0ZS1xdWVyeVwiO1xuICAgICAgICBxdWVyeTogUXVlcnkgfCB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBNYWtlUXVlcnlFdmVudCBleHRlbmRzIEV2ZW50IHtcbiAgICAgICAgdHlwZTogXCJtYWtlLXF1ZXJ5XCI7XG4gICAgICAgIHF1ZXJ5OiBRdWVyeTtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIEJlZm9yZU5ld1Jlc3VsdHNFdmVudCBleHRlbmRzIEV2ZW50IHtcbiAgICAgICAgdHlwZTogXCJiZWZvcmUtbmV3LXJlc3VsdHNcIjtcbiAgICAgICAgcmVzdWx0czogUmVzdWx0cyB8IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIE5ld1Jlc3VsdHNFdmVudCBleHRlbmRzIEV2ZW50IHtcbiAgICAgICAgdHlwZTogXCJuZXctcmVzdWx0c1wiO1xuICAgICAgICByZXN1bHRzOiBSZXN1bHRzIHwgdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgTWFrZVF1ZXJ5SW50ZW50RGF0YUV2ZW50IGV4dGVuZHMgRXZlbnQge1xuICAgICAgICB0eXBlOiBcIm1ha2UtcXVlcnktaW50ZW50LWRhdGFcIjtcbiAgICAgICAgaW50ZW50RGF0YTogUXVlcnlJbnRlbnREYXRhO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgUHJvY2Vzc1F1ZXJ5SW50ZW50QWN0aW9uRXZlbnQgZXh0ZW5kcyBFdmVudCB7XG4gICAgICAgIHR5cGU6IFwicHJvY2Vzcy1xdWVyeS1pbnRlbnQtYWN0aW9uXCI7XG4gICAgICAgIGFjdGlvbjogUXVlcnlJbnRlbnRBY3Rpb247XG4gICAgICAgIGludGVudDogUXVlcnlJbnRlbnQ7XG4gICAgICAgIGFuYWx5c2lzOiBRdWVyeUFuYWx5c2lzO1xuICAgICAgICBhY3Rpb25Qcm9jZXNzZWQ/OiBib29sZWFuO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgTWFrZUF1ZGl0RXZlbnRFdmVudCBleHRlbmRzIEV2ZW50IHtcbiAgICAgICAgdHlwZTogXCJtYWtlLWF1ZGl0LWV2ZW50XCI7XG4gICAgICAgIGV2ZW50OiBBdWRpdEV2ZW50O1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQmVmb3JlU2VsZWN0VGFiRXZlbnQgZXh0ZW5kcyBFdmVudCB7XG4gICAgICAgIHR5cGU6IFwiYmVmb3JlLXNlbGVjdC10YWJcIjtcbiAgICAgICAgcXVlcnk6IFF1ZXJ5O1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQWZ0ZXJTZWxlY3RUYWJFdmVudCBleHRlbmRzIEV2ZW50IHtcbiAgICAgICAgdHlwZTogXCJhZnRlci1zZWxlY3QtdGFiXCI7XG4gICAgICAgIG9ic2VydmFibGU6IE9ic2VydmFibGU8UmVzdWx0cz47XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBDbGVhckV2ZW50IGV4dGVuZHMgRXZlbnQge1xuICAgICAgICB0eXBlOiBcImNsZWFyXCI7XG4gICAgICAgIHBhdGg/OiBzdHJpbmc7XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBPcGVuT3JpZ2luYWxEb2N1bWVudCBleHRlbmRzIEV2ZW50IHtcbiAgICAgICAgdHlwZTogXCJvcGVuLW9yaWdpbmFsLWRvY3VtZW50XCI7XG4gICAgICAgIHJlY29yZDogUmVjb3JkO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQmVmb3JlU2VhcmNoRXZlbnQgZXh0ZW5kcyBFdmVudCB7XG4gICAgICAgIHR5cGU6IFwiYmVmb3JlLXNlYXJjaFwiO1xuICAgICAgICBjYW5jZWw/OiBib29sZWFuO1xuICAgICAgICBjYW5jZWxSZWFzb25zPzogc3RyaW5nW107XG4gICAgfVxuXG4gICAgZXhwb3J0IHR5cGUgRXZlbnRzID1cbiAgICAgICAgTmV3UXVlcnlFdmVudCB8XG4gICAgICAgIFVwZGF0ZVF1ZXJ5RXZlbnQgfFxuICAgICAgICBNYWtlUXVlcnlFdmVudCB8XG4gICAgICAgIEJlZm9yZU5ld1Jlc3VsdHNFdmVudCB8XG4gICAgICAgIE5ld1Jlc3VsdHNFdmVudCB8XG4gICAgICAgIE1ha2VRdWVyeUludGVudERhdGFFdmVudCB8XG4gICAgICAgIFByb2Nlc3NRdWVyeUludGVudEFjdGlvbkV2ZW50IHxcbiAgICAgICAgTWFrZUF1ZGl0RXZlbnRFdmVudCB8XG4gICAgICAgIEJlZm9yZVNlbGVjdFRhYkV2ZW50IHxcbiAgICAgICAgQWZ0ZXJTZWxlY3RUYWJFdmVudCB8XG4gICAgICAgIENsZWFyRXZlbnQgfFxuICAgICAgICBPcGVuT3JpZ2luYWxEb2N1bWVudCB8XG4gICAgICAgIEJlZm9yZVNlYXJjaEV2ZW50O1xuXG4gICAgZXhwb3J0IGNvbnN0IERlZmF1bHRQYWdlU2l6ZSA9IDIwO1xufVxuIl19