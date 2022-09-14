import { Expr, ExprParser, Query, AppService, FormatService, ExprBuilder } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { InjectionToken, ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, Optional, Inject, ɵɵgetCurrentView, ɵɵelementStart, ɵɵlistener, ɵɵrestoreView, ɵɵnextContext, ɵɵpipe, ɵɵelementEnd, ɵɵproperty, ɵɵpipeBind2, ɵɵpureFunction1, ɵɵsanitizeHtml, ɵɵelement, ɵɵpropertyInterpolate, ɵɵpipeBind1, ɵɵtemplate, ɵɵclassMapInterpolate2, ɵɵadvance, ɵɵelementContainerStart, ɵɵelementContainerEnd, ɵɵdirectiveInject, ɵɵdefineComponent, Component, Input, ɵɵtext, ɵɵtextInterpolate1, ɵɵtextInterpolate, ɵɵclassMapInterpolate1, ɵɵNgOnChangesFeature, ɵɵpureFunction2, ɵɵpureFunction5, ɵɵpureFunction4, EventEmitter, Output, ɵɵviewQuery, ɵɵqueryRefresh, ɵɵloadQuery, ViewChild, ɵɵpureFunction3, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';
import { Subject, BehaviorSubject, throwError, of, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DidYouMeanKind, QueryWebService, AuditWebService, WebServicesModule } from '@sinequa/core/web-services';
import { LoginService, LoginModule } from '@sinequa/core/login';
import { IntlService, MessagePipe, IntlModule } from '@sinequa/core/intl';
import { NotificationsService } from '@sinequa/core/notification';
import { NgForOf, NgIf, NgSwitch, NgSwitchCase, NgClass, CommonModule } from '@angular/common';
import { ExprPipe, NumberPipe, UtilsModule } from '@sinequa/components/utils';
import { Action, BsActionButtons, BsActionModule } from '@sinequa/components/action';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Description of the Breadcrumbs class - link to {@link SearchService}
 */
class Breadcrumbs {
    constructor(appService, searchService, query) {
        this.appService = appService;
        this.searchService = searchService;
        this.query = query.copy();
        this.items = [];
        this.advanced = [];
        this.fields = new Set();
    }
    static create(appService, searchService, query) {
        const breadcrumbs = new Breadcrumbs(appService, searchService, query);
        return breadcrumbs.init();
    }
    get activeIndex() {
        return this.items.findIndex(item => item.active);
    }
    get activeItem() {
        const index = this.activeIndex;
        if (index !== -1) {
            return this.items[index];
        }
        return undefined;
    }
    get text() {
        return this.items[0].display;
    }
    get textExpr() {
        return this.items[0].expr;
    }
    get selects() {
        return this.items.slice(1);
    }
    get activeSelects() {
        return this.items.slice(1, this.activeIndex + 1);
    }
    get activeItems() {
        return this.items.slice(0, this.activeIndex + 1);
    }
    get isEmpty() {
        if (this.items.length === 0) {
            return true;
        }
        if (this.items.length === 1 && this.items[0].hidden) {
            return true;
        }
        return false;
    }
    find(expr) {
        let expr1 = expr;
        const init = expr;
        if (!(expr instanceof Expr)) {
            expr1 = new Expr(init);
        }
        if (!expr1.every((expr2) => {
            const field = expr2.exprContext.appService.resolveColumnAlias(expr2.field);
            return !field || this.fields.has(field);
        })) {
            return undefined;
        }
        for (const expr3 of this.advanced) {
            const expr2 = expr3.find(expr1);
            if (expr2) {
                return expr2;
            }
        }
        for (const select of this.selects) {
            if (select.expr) {
                const expr2 = select.expr.find(expr1);
                if (expr2) {
                    return expr2;
                }
            }
        }
        if (this.textExpr) {
            let expr2 = this.textExpr.find(expr1, (expr3) => expr3.isStructured);
            if (expr2) {
                return expr2;
            }
            expr2 = this.textExpr.find(expr1, (expr3) => !expr3.isStructured);
            if (expr2) {
                return expr2;
            }
        }
        return undefined;
    }
    findSelect(facet, exprOrField) {
        // Active selects only, most recent first
        const activeSelects = this.activeSelects;
        for (let i = activeSelects.length - 1; i >= 0; i--) {
            const select = activeSelects[i];
            if (select.expr && (!facet || Utils.eqNC(facet, select.facet || ""))) {
                if (!exprOrField) {
                    return select.expr;
                }
                if (Utils.isString(exprOrField)) {
                    if (Utils.eqNC(exprOrField, select.expr.field || "")) {
                        return select.expr;
                    }
                }
                else {
                    const expr1 = select.expr.find(exprOrField);
                    if (expr1) {
                        return expr1;
                    }
                }
            }
        }
        return undefined;
    }
    addFields(expr) {
        if (expr) {
            const fields = expr.getFields();
            fields.forEach((field) => {
                this.fields.add(field);
            });
        }
    }
    makeBreadcrumbsItemFromExpr(text) {
        let expr = this.appService.parseExpr(text);
        if (!(expr instanceof Expr)) {
            expr = this.appService.parseExpr(ExprParser.escape(text));
        }
        if (expr instanceof Expr) {
            return { expr, display: expr };
        }
        else {
            return { expr: undefined, display: expr };
        }
    }
    initItems() {
        // Text
        if (this.query && this.query.text) {
            const item = this.makeBreadcrumbsItemFromExpr(this.query.text);
            this.items.push(item);
            this.addFields(item.expr);
        }
        else {
            this.items.push({
                expr: undefined,
                display: this.query && this.query.basket ? this.query.basket : "msg#breadcrumbs.emptySearch",
                hidden: this.appService.ccquery && !this.appService.ccquery.allowEmptySearch &&
                    this.searchService.isEmptySearchIgnoreSelects(this.query)
            });
        }
        // Selects
        if (this.query && this.query.select) {
            for (const select of this.query.select) {
                const item = this.makeBreadcrumbsItemFromExpr(select.expression);
                item.facet = select.facet;
                this.items.push(item);
                this.addFields(item.expr);
            }
        }
        // Set last item active
        this.items[this.items.length - 1].active = true;
    }
    init() {
        this.initItems();
        return this;
    }
    selectItem(item) {
        const index = this.items.indexOf(item);
        if (this.query && index !== -1) {
            const query = this.query.copy();
            if (query.select) {
                query.select.splice(index);
            }
            this.items.forEach(item1 => item1.active = false);
            item.active = true;
            return query;
        }
        return undefined;
    }
    removeItem(item) {
        const index = this.items.indexOf(item);
        if (this.query && index !== -1) {
            let next;
            if (index === 0) { // Text
                if (this.query.text || this.query.basket) {
                    delete this.query.text;
                    delete this.query.basket;
                    item.expr = undefined;
                    item.display = "msg#breadcrumbs.emptySearch";
                    item.hidden = this.appService.ccquery && !this.appService.ccquery.allowEmptySearch &&
                        this.searchService.isEmptySearchIgnoreSelects(this.query);
                }
                if (!item.hidden) {
                    next = this.activeItem;
                }
                else if (this.items.length > 1) {
                    next = this.items[this.items.length - 1];
                }
            }
            else {
                // Find next item to activate, if necessary
                const activeIndex = this.activeIndex;
                if (activeIndex >= index) {
                    if (activeIndex > index) {
                        next = this.items[activeIndex];
                    }
                    else {
                        if (index === this.items.length - 1) {
                            next = this.items[index - 1];
                        }
                        else {
                            next = this.items[index + 1];
                        }
                        if (next.hidden) {
                            next = undefined;
                        }
                    }
                }
                if (this.query.select) {
                    this.query.select.splice(index - 1, 1);
                }
                this.items.splice(index, 1);
            }
            return next;
        }
        return undefined;
    }
    update(query) {
        if (!this.query) {
            this.query = query.copy();
        }
        this.query.text = query.text;
        this.query.basket = query.basket;
        if (!this.query.text && !this.query.basket) {
            const item = this.items[0];
            item.expr = undefined;
            item.display = "msg#breadcrumbs.emptySearch";
            item.hidden = this.appService.ccquery && !this.appService.ccquery.allowEmptySearch &&
                this.searchService.isEmptySearchIgnoreSelects(this.query);
        }
    }
}

const SEARCH_OPTIONS = new InjectionToken("SEARCH_OPTIONS");
class SearchService {
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
SearchService.ɵfac = function SearchService_Factory(t) { return new (t || SearchService)(ɵɵinject(SEARCH_OPTIONS, 8), ɵɵinject(Router), ɵɵinject(AppService), ɵɵinject(QueryWebService), ɵɵinject(LoginService), ɵɵinject(IntlService), ɵɵinject(FormatService), ɵɵinject(AuditWebService), ɵɵinject(NotificationsService), ɵɵinject(ExprBuilder)); };
SearchService.ɵprov = ɵɵdefineInjectable({ token: SearchService, factory: SearchService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SearchService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [SEARCH_OPTIONS]
            }] }, { type: Router }, { type: AppService }, { type: QueryWebService }, { type: LoginService }, { type: IntlService }, { type: FormatService }, { type: AuditWebService }, { type: NotificationsService }, { type: ExprBuilder }]; }, null); })();
(function (SearchService) {
    SearchService.DefaultPageSize = 20;
})(SearchService || (SearchService = {}));

const FIRST_PAGE_OPTIONS = new InjectionToken("FIRST_PAGE_OPTIONS");
class FirstPageService {
    constructor(options, searchService, router) {
        this.options = options;
        this.searchService = searchService;
        this.router = router;
        if (!this.options) {
            this.options = {};
        }
        this.searchSubscription = this.searchService.events.subscribe((event) => {
            if (event.type === "clear") {
                if (this.displayOnHomePage(event.path)) {
                    Utils.subscribe(this.getFirstPage(), (results) => {
                        this.searchService.setResults(results);
                    });
                }
            }
        });
    }
    ngOnDestroy() {
        this.searchSubscription.unsubscribe();
    }
    /**
     * @ignore
     * legacy
     */
    get isFirstPage() {
        return this.isCurrentSearchResults;
    }
    get isCurrentSearchResults() {
        return !!this.searchService.results && this.searchService.results === this.firstPage;
    }
    displayOnHomePage(path) {
        if (Utils.isArray(this.options.displayOnHomePage)) {
            if (!path) {
                const url = Utils.makeURL(this.router.url);
                path = url.pathname;
            }
            for (const path1 of this.options.displayOnHomePage) {
                if (Utils.endsWith(path, Utils.addUrl("/", path1))) {
                    return true;
                }
            }
            return false;
        }
        else {
            return !!this.options.displayOnHomePage;
        }
    }
    getFirstPage() {
        if (this.firstPage) {
            return of(this.firstPage);
        }
        const query = this.searchService.makeQuery();
        query.isFirstPage = true;
        const observable = this.searchService.getResults(query, {
            type: "Search_FirstPage" /* Search_FirstPage */
        }, {
            searchInactive: true
        });
        Utils.subscribe(observable, (results) => {
            this.firstPage = results;
            return results;
        });
        return observable;
    }
}
FirstPageService.ɵfac = function FirstPageService_Factory(t) { return new (t || FirstPageService)(ɵɵinject(FIRST_PAGE_OPTIONS, 8), ɵɵinject(SearchService), ɵɵinject(Router)); };
FirstPageService.ɵprov = ɵɵdefineInjectable({ token: FirstPageService, factory: FirstPageService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(FirstPageService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [FIRST_PAGE_OPTIONS]
            }] }, { type: SearchService }, { type: Router }]; }, null); })();

const _c0 = function (a0) { return { withFields: a0, asHTML: true }; };
function BsBreadcrumbs_ng_container_4_li_1_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 9);
    ɵɵlistener("click", function BsBreadcrumbs_ng_container_4_li_1_a_1_Template_a_click_0_listener() { ɵɵrestoreView(_r8); const item_r1 = ɵɵnextContext(2).$implicit; const ctx_r6 = ɵɵnextContext(); return ctx_r6.selectItem(item_r1); });
    ɵɵpipe(1, "sqExpr");
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ɵɵnextContext(2).$implicit;
    const ctx_r3 = ɵɵnextContext();
    ɵɵproperty("innerHTML", ɵɵpipeBind2(1, 1, item_r1.display, ɵɵpureFunction1(4, _c0, ctx_r3.displayFieldNames)), ɵɵsanitizeHtml);
} }
function BsBreadcrumbs_ng_container_4_li_1_span_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span", 10);
    ɵɵpipe(1, "sqExpr");
} if (rf & 2) {
    const item_r1 = ɵɵnextContext(2).$implicit;
    const ctx_r4 = ɵɵnextContext();
    ɵɵproperty("innerHTML", ɵɵpipeBind2(1, 1, item_r1.display, ɵɵpureFunction1(4, _c0, ctx_r4.displayFieldNames)), ɵɵsanitizeHtml);
} }
function BsBreadcrumbs_ng_container_4_li_1_span_3_Template(rf, ctx) { if (rf & 1) {
    const _r13 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 11);
    ɵɵlistener("click", function BsBreadcrumbs_ng_container_4_li_1_span_3_Template_span_click_0_listener() { ɵɵrestoreView(_r13); const item_r1 = ɵɵnextContext(2).$implicit; const ctx_r11 = ɵɵnextContext(); return ctx_r11.removeItem(item_r1); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(1, 1, "msg#breadcrumbs.itemRemove"));
} }
function BsBreadcrumbs_ng_container_4_li_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "li");
    ɵɵtemplate(1, BsBreadcrumbs_ng_container_4_li_1_a_1_Template, 2, 6, "a", 6);
    ɵɵtemplate(2, BsBreadcrumbs_ng_container_4_li_1_span_2_Template, 2, 6, "span", 7);
    ɵɵtemplate(3, BsBreadcrumbs_ng_container_4_li_1_span_3_Template, 2, 3, "span", 8);
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ɵɵnextContext().$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassMapInterpolate2("breadcrumb-item ", item_r1.active ? "active" : "", " sq-breadcrumb-item  sq-breadcrumb-item-", ctx_r2.getField(item_r1), "");
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !item_r1.active);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", item_r1.active);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r2.allowDeletion);
} }
function BsBreadcrumbs_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsBreadcrumbs_ng_container_4_li_1_Template, 4, 7, "li", 5);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !item_r1.hidden);
} }
class BsBreadcrumbs {
    constructor(searchService) {
        this.searchService = searchService;
        this.allowDeletion = true;
        this.displayFieldNames = true;
    }
    getField(item) {
        if (item.expr) {
            if (item.expr.field) {
                return item.expr.field;
            }
            else {
                if (!item.expr.isStructured) {
                    return "text";
                }
                else {
                    const fields = item.expr.getFields();
                    return fields.join("-");
                }
            }
        }
        return "unknown";
    }
    home() {
        this.searchService.home();
        return false;
    }
    selectItem(item) {
        this.searchService.selectBreadcrumbsItem(item);
        return false;
    }
    removeItem(item) {
        this.searchService.removeBreadcrumbsItem(item);
    }
}
BsBreadcrumbs.ɵfac = function BsBreadcrumbs_Factory(t) { return new (t || BsBreadcrumbs)(ɵɵdirectiveInject(SearchService)); };
BsBreadcrumbs.ɵcmp = ɵɵdefineComponent({ type: BsBreadcrumbs, selectors: [["sq-breadcrumbs"]], inputs: { results: "results", allowDeletion: "allowDeletion", displayFieldNames: "displayFieldNames" }, decls: 5, vars: 1, consts: [[1, "breadcrumb"], [1, "breadcrumb-item"], ["href", "#", "title", "Home", 3, "click"], [1, "fas", "fa-home"], [4, "ngFor", "ngForOf"], [3, "class", 4, "ngIf"], ["href", "#", 3, "innerHTML", "click", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], ["class", "fas fa-times", "role", "button", 3, "title", "click", 4, "ngIf"], ["href", "#", 3, "innerHTML", "click"], [3, "innerHTML"], ["role", "button", 1, "fas", "fa-times", 3, "title", "click"]], template: function BsBreadcrumbs_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "ol", 0);
        ɵɵelementStart(1, "li", 1);
        ɵɵelementStart(2, "a", 2);
        ɵɵlistener("click", function BsBreadcrumbs_Template_a_click_2_listener() { return ctx.home(); });
        ɵɵelement(3, "span", 3);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵtemplate(4, BsBreadcrumbs_ng_container_4_Template, 2, 1, "ng-container", 4);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(4);
        ɵɵproperty("ngForOf", ctx.searchService.breadcrumbs == null ? null : ctx.searchService.breadcrumbs.items);
    } }, directives: [NgForOf, NgIf], pipes: [ExprPipe, MessagePipe], styles: [".breadcrumb[_ngcontent-%COMP%]{background-color:inherit;font-size:.85rem;margin-bottom:0;padding:.375rem 0}.sq-breadcrumbs-remove[_ngcontent-%COMP%]{color:#d3d3d3;cursor:pointer}.sq-breadcrumbs-remove[_ngcontent-%COMP%]:hover{color:#a9a9a9}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsBreadcrumbs, [{
        type: Component,
        args: [{
                selector: "sq-breadcrumbs",
                templateUrl: "./breadcrumbs.html",
                styleUrls: ["./breadcrumbs.css"]
            }]
    }], function () { return [{ type: SearchService }]; }, { results: [{
            type: Input
        }], allowDeletion: [{
            type: Input
        }], displayFieldNames: [{
            type: Input
        }] }); })();

function BsDidYouMean_div_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementStart(3, "a", 3);
    ɵɵlistener("click", function BsDidYouMean_div_0_ng_container_1_Template_a_click_3_listener() { ɵɵrestoreView(_r5); const ctx_r4 = ɵɵnextContext(2); return ctx_r4.selectCorrected(); });
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵtext(5);
    ɵɵpipe(6, "sqMessage");
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(2, 3, "msg#didYouMean.dymonlyBeforeCorrected"), "");
    ɵɵadvance(3);
    ɵɵtextInterpolate(ctx_r1.item.corrected);
    ɵɵadvance(1);
    ɵɵtextInterpolate1("", ɵɵpipeBind1(6, 5, "msg#didYouMean.dymonlyAfterCorrected"), " ");
} }
function BsDidYouMean_div_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementStart(3, "a", 3);
    ɵɵlistener("click", function BsDidYouMean_div_0_ng_container_2_Template_a_click_3_listener() { ɵɵrestoreView(_r7); const ctx_r6 = ɵɵnextContext(2); return ctx_r6.selectCorrected(); });
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵtext(5);
    ɵɵpipe(6, "sqMessage");
    ɵɵelementStart(7, "a", 4);
    ɵɵlistener("click", function BsDidYouMean_div_0_ng_container_2_Template_a_click_7_listener() { ɵɵrestoreView(_r7); const ctx_r8 = ɵɵnextContext(2); return ctx_r8.selectOriginal(); });
    ɵɵtext(8);
    ɵɵelementEnd();
    ɵɵtext(9);
    ɵɵpipe(10, "sqMessage");
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(2, 5, "msg#didYouMean.correctBeforeCorrected"), "");
    ɵɵadvance(3);
    ɵɵtextInterpolate(ctx_r2.item.corrected);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(6, 7, "msg#didYouMean.correctBeforeOriginal"));
    ɵɵadvance(3);
    ɵɵtextInterpolate(ctx_r2.item.original);
    ɵɵadvance(1);
    ɵɵtextInterpolate1("", ɵɵpipeBind1(10, 9, "msg#didYouMean.correctAfterOriginal"), " ");
} }
function BsDidYouMean_div_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementStart(3, "a", 4);
    ɵɵlistener("click", function BsDidYouMean_div_0_ng_container_3_Template_a_click_3_listener() { ɵɵrestoreView(_r10); const ctx_r9 = ɵɵnextContext(2); return ctx_r9.selectOriginal(); });
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵtext(5);
    ɵɵpipe(6, "sqMessage");
    ɵɵelementStart(7, "a", 4);
    ɵɵlistener("click", function BsDidYouMean_div_0_ng_container_3_Template_a_click_7_listener() { ɵɵrestoreView(_r10); const ctx_r11 = ɵɵnextContext(2); return ctx_r11.selectCorrected(); });
    ɵɵtext(8);
    ɵɵelementEnd();
    ɵɵtext(9);
    ɵɵpipe(10, "sqMessage");
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(2, 5, "msg#didYouMean.smartBeforeOriginal"), "");
    ɵɵadvance(3);
    ɵɵtextInterpolate(ctx_r3.item.original);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(6, 7, "msg#didYouMean.smartBeforeCorrected"));
    ɵɵadvance(3);
    ɵɵtextInterpolate(ctx_r3.item.corrected);
    ɵɵadvance(1);
    ɵɵtextInterpolate1("", ɵɵpipeBind1(10, 9, "msg#didYouMean.smartAfterCorrected"), " ");
} }
function BsDidYouMean_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 1);
    ɵɵtemplate(1, BsDidYouMean_div_0_ng_container_1_Template, 7, 7, "ng-container", 2);
    ɵɵtemplate(2, BsDidYouMean_div_0_ng_container_2_Template, 11, 11, "ng-container", 2);
    ɵɵtemplate(3, BsDidYouMean_div_0_ng_container_3_Template, 11, 11, "ng-container", 2);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMapInterpolate1("sq-did-you-mean sq-text ", "sq-" + ctx_r0.context, "");
    ɵɵproperty("ngSwitch", ctx_r0.results.didYouMean.spellingCorrectionMode);
    ɵɵadvance(1);
    ɵɵproperty("ngSwitchCase", "DYMOnly");
    ɵɵadvance(1);
    ɵɵproperty("ngSwitchCase", "Correct");
    ɵɵadvance(1);
    ɵɵproperty("ngSwitchCase", "Smart");
} }
class BsDidYouMean {
    constructor(searchService) {
        this.searchService = searchService;
        this.context = "search";
    }
    handleResults() {
        this.item = undefined;
        if (this.results && this.results.didYouMean) {
            if (this.context === "search") {
                const item = this.results.didYouMean.text;
                if (item && item.corrected) {
                    this.item = item;
                }
            }
            else {
                const refineSelect = this.searchService.query.findSelect("refine");
                if (refineSelect && Utils.startsWith(refineSelect.expression, "refine:") && !!this.results.didYouMean.refine) {
                    const dymItem = this.results.didYouMean.refine[this.results.didYouMean.refine.length - 1];
                    if (dymItem.corrected) {
                        this.item = dymItem;
                    }
                }
            }
        }
    }
    ngOnChanges(changes) {
        if (!!changes["results"]) {
            this.handleResults();
        }
    }
    selectOriginal() {
        if (this.item) {
            this.searchService.didYouMean(this.item.original, this.context, DidYouMeanKind.Original);
        }
        return false;
    }
    selectCorrected() {
        if (this.item) {
            this.searchService.didYouMean(this.item.corrected, this.context, DidYouMeanKind.Corrected);
        }
        return false;
    }
}
BsDidYouMean.ɵfac = function BsDidYouMean_Factory(t) { return new (t || BsDidYouMean)(ɵɵdirectiveInject(SearchService)); };
BsDidYouMean.ɵcmp = ɵɵdefineComponent({ type: BsDidYouMean, selectors: [["sq-did-you-mean"]], inputs: { results: "results", context: "context" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "class", "ngSwitch", 4, "ngIf"], [3, "ngSwitch"], [4, "ngSwitchCase"], ["href", "#", 1, "sq-did-you-mean-corrected", 3, "click"], ["href", "#", 1, "sq-did-you-mean-original", 3, "click"]], template: function BsDidYouMean_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsDidYouMean_div_0_Template, 4, 7, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !!ctx.item);
    } }, directives: [NgIf, NgSwitch, NgSwitchCase], pipes: [MessagePipe], styles: [".sq-did-you-mean[_ngcontent-%COMP%]   .sq-did-you-mean-corrected[_ngcontent-%COMP%], .sq-did-you-mean[_ngcontent-%COMP%]   .sq-did-you-mean-original[_ngcontent-%COMP%]{font-style:italic}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsDidYouMean, [{
        type: Component,
        args: [{
                selector: "sq-did-you-mean",
                templateUrl: "./did-you-mean.html",
                styleUrls: ["./did-you-mean.css"]
            }]
    }], function () { return [{ type: SearchService }]; }, { results: [{
            type: Input
        }], context: [{
            type: Input
        }] }); })();

const _c0$1 = function (a0) { return [a0]; };
const _c1 = function (a0, a2) { return { items: a0, autoAdjust: true, rightAligned: a2 }; };
function BsPageSizeSelector_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 1);
    ɵɵelement(1, "div", 2);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("sq-action-buttons", ɵɵpureFunction2(3, _c1, ɵɵpureFunction1(1, _c0$1, ctx_r0.pageSizingAction), ctx_r0.rightAligned));
} }
//import {ResultsView} from '@sinequa/components/results-view';
// TODO restore functionality of storing page size in user settings ?
/**
 * Component for choosing the page size of the results view
 *
 */
class BsPageSizeSelector {
    constructor(appService, searchService) {
        this.appService = appService;
        this.searchService = searchService;
        //@Input() resultsView: ResultsView;
        this.showInRegularView = true;
    }
    ngOnChanges(changes) {
        this.refreshVisualisation();
    }
    /*
    private get globalPageSize(): number {
        const globalQueryParams = this.userSettingsService.getUserSettings().queryParams;
        return globalQueryParams ? globalQueryParams.pageSize : undefined;
    }
    */
    get configPageSize() {
        return this.appService.ccquery ? this.appService.ccquery.pageSize : 0;
    }
    get defaultPageSize() {
        //let res = this.globalPageSize;
        //if (!res) {
        let res = this.configPageSize;
        if (!res) {
            res = SearchService.DefaultPageSize;
        }
        //}
        return res;
    }
    buildPageSizingAction() {
        this.availableSizes = this.pageSizes ? this.pageSizes.slice(0) : [];
        this.availableSizes.sort((a, b) => a - b);
        const children = [];
        children.push(new Action({
            text: 'msg#pageSizeSelector.defaultPageSize',
            messageParams: { values: { size: this.defaultPageSize } },
            data: undefined,
            action: (item, event) => {
                this.updatePageSize(item.data);
            }
        }));
        for (const size of this.availableSizes) {
            children.push(new Action({
                text: size.toString(),
                data: size,
                action: (item, event) => {
                    this.updatePageSize(item.data);
                }
            }));
        }
        return new Action({
            icon: 'fas fa-arrows-alt-v',
            text: 'msg#pageSizeSelector.pageSizeChoice',
            children: children
        });
    }
    refreshVisualisation() {
        this.pageSizingAction = this.buildPageSizingAction();
        if (this.results) {
            //const queryParams = this.userSettingsService.getViewQueryParams(this.resultsView.name);
            //this.currentPageSize = queryParams.pageSize;
            this.setCurrentSize(this.currentPageSize);
        }
    }
    setCurrentSize(size) {
        var _a;
        if (!size) {
            this.pageSizingAction.text = 'msg#pageSizeSelector.defaultPageSizeChoice';
            this.pageSizingAction.messageParams = { values: { size: this.defaultPageSize } };
        }
        else {
            const selectedAction = (_a = this.pageSizingAction.children) === null || _a === void 0 ? void 0 : _a.find(action => action.data === size);
            this.pageSizingAction.text = 'msg#pageSizeSelector.pageSizeChoice';
            this.pageSizingAction.messageParams = { values: { size: selectedAction === null || selectedAction === void 0 ? void 0 : selectedAction.data } };
        }
    }
    updatePageSize(size) {
        if (this.currentPageSize !== size) {
            //this.userSettingsService.saveResultsViewPageSize(this.resultsView.name, size);
            this.currentPageSize = size;
            this.searchService.query.pageSize = size;
            this.searchService.search();
        }
        this.setCurrentSize(size);
    }
}
BsPageSizeSelector.ɵfac = function BsPageSizeSelector_Factory(t) { return new (t || BsPageSizeSelector)(ɵɵdirectiveInject(AppService), ɵɵdirectiveInject(SearchService)); };
BsPageSizeSelector.ɵcmp = ɵɵdefineComponent({ type: BsPageSizeSelector, selectors: [["sq-page-size-selector"]], inputs: { results: "results", showInRegularView: "showInRegularView", showInCustomization: "showInCustomization", pageSizes: "pageSizes", rightAligned: "rightAligned" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "btn-toolbar", 4, "ngIf"], [1, "btn-toolbar"], [1, "btn-group", 3, "sq-action-buttons"]], template: function BsPageSizeSelector_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsPageSizeSelector_div_0_Template, 2, 6, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !!ctx.results);
    } }, directives: [NgIf, BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsPageSizeSelector, [{
        type: Component,
        args: [{
                selector: 'sq-page-size-selector',
                templateUrl: './page-size-selector.html'
            }]
    }], function () { return [{ type: AppService }, { type: SearchService }]; }, { results: [{
            type: Input
        }], showInRegularView: [{
            type: Input
        }], showInCustomization: [{
            type: Input
        }], pageSizes: [{
            type: Input
        }], rightAligned: [{
            type: Input
        }] }); })();

const _c0$2 = function (a0) { return { page: a0 }; };
const _c1$1 = function (a0) { return { values: a0 }; };
const _c2 = function (a0, a1, a2, a3, a4) { return { "active": a0, "disabled": a1, "sq-navigation": a2, "sq-page": a3, "sq-ellipsis": a4 }; };
function BsPager_ul_0_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 3);
    ɵɵlistener("click", function BsPager_ul_0_li_1_Template_li_click_0_listener() { ɵɵrestoreView(_r4); const item_r2 = ctx.$implicit; const ctx_r3 = ɵɵnextContext(2); return ctx_r3.gotoPage(item_r2.page); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelementStart(2, "a", 4);
    ɵɵelementStart(3, "span");
    ɵɵtext(4);
    ɵɵpipe(5, "sqNumber");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    ɵɵpropertyInterpolate("title", ɵɵpipeBind2(1, 3, item_r2.title, ɵɵpureFunction1(10, _c1$1, ɵɵpureFunction1(8, _c0$2, item_r2.page))));
    ɵɵproperty("ngClass", ɵɵpureFunction5(12, _c2, item_r2.active, item_r2.disabled, item_r2.isNavigation, item_r2.isPage, item_r2.isEllipsis));
    ɵɵadvance(4);
    ɵɵtextInterpolate(ɵɵpipeBind1(5, 6, item_r2.display));
} }
function BsPager_ul_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "ul", 1);
    ɵɵtemplate(1, BsPager_ul_0_li_1_Template, 6, 18, "li", 2);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r0.items);
} }
class BsPager {
    constructor(searchService) {
        this.searchService = searchService;
        this.showNavigation = true;
        this.showFirstLast = true;
        this.showPages = true;
        this.endPages = 1;
        this.pages = 5;
        this.pageCount = 0;
    }
    ngOnChanges(changes) {
        if (changes["results"]) {
            this.makeItems();
        }
    }
    makeItems() {
        this.pageCount = this.searchService.pageCount;
        this.currentPage = this.searchService.page;
        if (this.pageCount === 0) {
            this.items = undefined;
            return;
        }
        let endPages = this.endPages;
        if (!endPages || endPages <= 0) {
            endPages = 1;
        }
        const endWidth = endPages + 1; // +1 for the …
        let pages = this.pages;
        if (!pages) {
            pages = 3 + endWidth * 2;
        }
        if (pages < 3 + endWidth * 2) {
            pages = 3 + endWidth * 2; // 3 is the minimum number of pages to show between the … separators
        }
        let split1 = -1, split2 = -1;
        if (this.pageCount <= pages) {
            pages = this.pageCount;
        }
        else {
            // pages must be an odd number to accommodate:  (First page) … (Current page - 1) (Current page) (Current page + 1) … (Last page)
            pages = Math.floor(pages / 2) * 2 + 1;
            const mid = pages - endWidth * 2;
            const delta = Math.floor(mid / 2);
            if ((this.currentPage - delta) > endPages + 1 + 1) {
                split1 = this.currentPage - delta;
            }
            if ((this.currentPage + delta) < (this.pageCount - endWidth)) {
                split2 = this.currentPage + delta;
            }
            if (split1 === -1 && split2 !== -1) {
                split2 += endPages + 1 + 1 - (this.currentPage - delta);
            }
            else if (split2 === -1 && split1 !== -1) {
                split1 -= (this.currentPage + delta) - (this.pageCount - endWidth);
            }
        }
        this.items = [];
        if (this.showNavigation) {
            if (this.showFirstLast) {
                this.items.push(new BsPager.Item(1, this.currentPage, BsPager.FIRST_PAGE, "msg#pager.firstPage"));
            }
            this.items.push(new BsPager.Item(this.currentPage > 1 ? this.currentPage - 1 : 1, this.currentPage, BsPager.PREVIOUS_PAGE, "msg#pager.previousPage"));
        }
        if (this.showPages) {
            for (let i = 1, ic = split1 !== -1 ? endPages : split2 !== -1 ? split2 : this.pageCount; i <= ic; i++) {
                this.items.push(new BsPager.Item(i, this.currentPage));
            }
            if (split1 !== -1) {
                this.items.push(new BsPager.Item(0, this.currentPage, BsPager.ELLIPSIS));
                for (let i = split1, ic = split2 !== -1 ? split2 : this.pageCount; i <= ic; i++) {
                    this.items.push(new BsPager.Item(i, this.currentPage));
                }
            }
            if (split2 !== -1) {
                this.items.push(new BsPager.Item(0, this.currentPage, BsPager.ELLIPSIS));
                for (let i = this.pageCount - endPages + 1, ic = this.pageCount; i <= ic; i++) {
                    this.items.push(new BsPager.Item(i, this.currentPage));
                }
            }
        }
        if (this.showNavigation) {
            this.items.push(new BsPager.Item(this.currentPage < this.pageCount ? this.currentPage + 1 : this.pageCount, this.currentPage, BsPager.NEXT_PAGE, "msg#pager.nextPage"));
            if (this.showFirstLast) {
                this.items.push(new BsPager.Item(this.pageCount, this.currentPage, BsPager.LAST_PAGE, "msg#pager.lastPage"));
            }
        }
    }
    gotoPage(page) {
        if (page !== this.currentPage && page > 0) {
            this.searchService.gotoPage(page);
        }
    }
}
BsPager.FIRST_PAGE = "«";
BsPager.PREVIOUS_PAGE = "‹";
BsPager.NEXT_PAGE = "›";
BsPager.LAST_PAGE = "»";
BsPager.ELLIPSIS = "…";
BsPager.ɵfac = function BsPager_Factory(t) { return new (t || BsPager)(ɵɵdirectiveInject(SearchService)); };
BsPager.ɵcmp = ɵɵdefineComponent({ type: BsPager, selectors: [["sq-pager"]], inputs: { results: "results", showNavigation: "showNavigation", showFirstLast: "showFirstLast", showPages: "showPages", endPages: "endPages", pages: "pages" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "pagination my-0", 4, "ngIf"], [1, "pagination", "my-0"], ["class", "page-item", 3, "title", "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "page-item", 3, "title", "ngClass", "click"], ["href", "javascript:void(0)", 1, "page-link"]], template: function BsPager_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsPager_ul_0_Template, 2, 1, "ul", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.pageCount > 1);
    } }, directives: [NgIf, NgForOf, NgClass], pipes: [MessagePipe, NumberPipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsPager, [{
        type: Component,
        args: [{
                selector: "sq-pager",
                templateUrl: "./pager.html",
            }]
    }], function () { return [{ type: SearchService }]; }, { results: [{
            type: Input
        }], showNavigation: [{
            type: Input
        }], showFirstLast: [{
            type: Input
        }], showPages: [{
            type: Input
        }], endPages: [{
            type: Input
        }], pages: [{
            type: Input
        }] }); })();
(function (BsPager) {
    class Item {
        constructor(page, currentPage, display, title) {
            this.page = page;
            this.currentPage = currentPage;
            this.display = display;
            this.title = title;
            if (display) {
                this.display = display;
            }
            else {
                this.display = page;
            }
            if (Utils.isUndefined(title) && page) {
                this.title = "msg#pager.pageNumberTitle";
            }
        }
        get active() {
            return this.isPage && (this.currentPage === this.page);
        }
        get disabled() {
            return this.isEllipsis || ((this.currentPage === this.page) && this.isNavigation);
        }
        get isNavigation() {
            return this.display === BsPager.FIRST_PAGE ||
                this.display === BsPager.PREVIOUS_PAGE ||
                this.display === BsPager.NEXT_PAGE ||
                this.display === BsPager.LAST_PAGE;
        }
        get isPage() {
            return !!this.page && !this.isNavigation;
        }
        get isEllipsis() {
            return this.display === BsPager.ELLIPSIS;
        }
    }
    BsPager.Item = Item;
})(BsPager || (BsPager = {}));

const _c0$3 = function (a0) { return [a0]; };
const _c1$2 = function (a0, a1, a3, a4) { return { items: a0, style: a1, autoAdjust: true, rightAligned: a3, size: a4 }; };
class BsSortSelector {
    constructor(appService, searchService) {
        this.appService = appService;
        this.searchService = searchService;
    }
    ngOnChanges(changes) {
        if (changes["results"]) {
            this.buildSortAction();
        }
    }
    setCurrentSort(name) {
        if (this.sortAction) {
            const sortingChoices = this.getSortingChoices();
            const current = sortingChoices && sortingChoices.find((value) => {
                return Utils.eqNC(value.name, name);
            });
            if (current) {
                const queryOrderBy = this.searchService.query.orderBy;
                this.sortAction.text = !!queryOrderBy ? "msg#sortSelector.sortOther" : current.display || current.name;
                this.sortAction.icon = !!queryOrderBy ? 'fas fa-sort'
                    : this.isAscendingSort(current.orderByClause) ? 'fas fa-sort-amount-up'
                        : this.isDescendingSort(current.orderByClause) ? 'fas fa-sort-amount-down' : 'fas fa-sort';
            }
            else {
                this.sortAction.text = "msg#sortSelector.sortOther";
                this.sortAction.icon = "fas fa-sort";
            }
            this.sortAction.messageParams = { values: { text: this.sortAction.text } }; // for title
        }
    }
    selectSort(sortingChoice) {
        this.setCurrentSort(sortingChoice.name);
        this.searchService.query.sort = sortingChoice.name;
        const audit = {
            type: "Search_Sort" /* Search_Sort */,
            detail: {
                sort: sortingChoice.name,
                orderByClause: sortingChoice.orderByClause,
            }
        };
        this.searchService.search(undefined, audit);
    }
    buildSortAction() {
        const sortingChoices = this.getSortingChoices();
        if (!sortingChoices || sortingChoices.length === 0) {
            this.sortAction = undefined;
            return;
        }
        this.sortAction = new Action({
            title: "msg#sortSelector.sortByTitle",
            children: sortingChoices
                .filter(sortingChoice => this.searchService.hasRelevance || !Utils.includes(sortingChoice.orderByClause, "globalrelevance"))
                .map(sortingChoice => new Action({
                icon: this.isAscendingSort(sortingChoice.orderByClause) ? 'fas fa-sort-amount-up'
                    : this.isDescendingSort(sortingChoice.orderByClause) ? 'fas fa-sort-amount-down' : '',
                text: sortingChoice.display || sortingChoice.name,
                data: sortingChoice,
                action: (item, event) => {
                    this.selectSort(item.data);
                }
            }))
        });
        if (!!this.searchService.results) {
            this.setCurrentSort(this.searchService.results.sort);
        }
    }
    isAscendingSort(orderByClause) {
        if (!orderByClause) {
            return false;
        }
        const lastElement = orderByClause.substring(orderByClause.lastIndexOf(' ') + 1);
        return Utils.eqNC('asc', lastElement);
    }
    isDescendingSort(orderByClause) {
        if (!orderByClause) {
            return false;
        }
        const lastElement = orderByClause.substring(orderByClause.lastIndexOf(' ') + 1);
        return Utils.eqNC('desc', lastElement);
    }
    isTabSearch() {
        const query = this.appService.ccquery;
        if (!query)
            return false;
        const tabSearch = query.tabSearch;
        return !(!tabSearch || !tabSearch.column || !tabSearch.isActive ||
            !tabSearch.tabs || tabSearch.tabs.length === 0);
    }
    getSortingChoices() {
        if (this.isTabSearch()) {
            const tabName = this.searchService.results && this.searchService.results.tab;
            if (tabName && this.appService.ccquery) {
                for (const t of this.appService.ccquery.tabSearch.tabs) {
                    if (t.name === tabName) {
                        const s = t.sortingChoices;
                        if (s && s.length > 0)
                            return s;
                        else
                            break;
                    }
                }
            }
        }
        const q = this.appService.ccquery;
        return q && q.sortingChoices;
    }
}
BsSortSelector.ɵfac = function BsSortSelector_Factory(t) { return new (t || BsSortSelector)(ɵɵdirectiveInject(AppService), ɵɵdirectiveInject(SearchService)); };
BsSortSelector.ɵcmp = ɵɵdefineComponent({ type: BsSortSelector, selectors: [["sq-sort-selector"]], inputs: { results: "results", rightAligned: "rightAligned", style: "style", size: "size" }, features: [ɵɵNgOnChangesFeature], decls: 2, vars: 9, consts: [["role", "toolbar", "aria-label", "Toolbar", 1, "btn-toolbar"], [1, "btn-group", 3, "hidden", "sq-action-buttons"]], template: function BsSortSelector_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelement(1, "div", 1);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("hidden", !ctx.searchService.haveRecords || !ctx.sortAction)("sq-action-buttons", ɵɵpureFunction4(4, _c1$2, ɵɵpureFunction1(2, _c0$3, ctx.sortAction), ctx.style, ctx.rightAligned, ctx.size));
    } }, directives: [BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsSortSelector, [{
        type: Component,
        args: [{
                selector: "sq-sort-selector",
                templateUrl: "./sort-selector.html"
            }]
    }], function () { return [{ type: AppService }, { type: SearchService }]; }, { results: [{
            type: Input
        }], rightAligned: [{
            type: Input
        }], style: [{
            type: Input
        }], size: [{
            type: Input
        }] }); })();

const _c0$4 = function (a0, a1) { return { "active": a0, "disabled": a1 }; };
function BsTabs_ul_0_ng_container_1_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 4);
    ɵɵelementStart(1, "a", 5);
    ɵɵlistener("click", function BsTabs_ul_0_ng_container_1_li_1_Template_a_click_1_listener() { ɵɵrestoreView(_r6); const tab_r4 = ctx.$implicit; const ctx_r5 = ɵɵnextContext(3); return ctx_r5.selectTab(tab_r4); });
    ɵɵelement(2, "i", 6);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementStart(5, "span", 7);
    ɵɵtext(6);
    ɵɵpipe(7, "sqNumber");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const tab_r4 = ctx.$implicit;
    const ctx_r3 = ɵɵnextContext(3);
    ɵɵadvance(1);
    ɵɵproperty("ngClass", ɵɵpureFunction2(8, _c0$4, tab_r4 == ctx_r3.currentTab, tab_r4.count == 0));
    ɵɵadvance(1);
    ɵɵproperty("ngClass", ctx_r3.iconMap[tab_r4.name]);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(4, 4, tab_r4.display || tab_r4.name), " ");
    ɵɵadvance(3);
    ɵɵtextInterpolate1("(", ɵɵpipeBind1(7, 6, tab_r4.count), ")");
} }
function BsTabs_ul_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsTabs_ul_0_ng_container_1_li_1_Template, 8, 11, "li", 3);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r1.searchtabs);
} }
function BsTabs_ul_0_ng_container_2_li_1_span_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 7);
    ɵɵtext(1);
    ɵɵpipe(2, "sqNumber");
    ɵɵelementEnd();
} if (rf & 2) {
    const tab_r8 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate1("(", ɵɵpipeBind1(2, 1, tab_r8.count), ")");
} }
function BsTabs_ul_0_ng_container_2_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r12 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 4);
    ɵɵelementStart(1, "a", 5);
    ɵɵlistener("click", function BsTabs_ul_0_ng_container_2_li_1_Template_a_click_1_listener() { ɵɵrestoreView(_r12); const tab_r8 = ctx.$implicit; const ctx_r11 = ɵɵnextContext(3); return ctx_r11.selectTab(tab_r8, false); });
    ɵɵelement(2, "i", 6);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵtemplate(5, BsTabs_ul_0_ng_container_2_li_1_span_5_Template, 3, 3, "span", 8);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const tab_r8 = ctx.$implicit;
    const ctx_r7 = ɵɵnextContext(3);
    ɵɵadvance(1);
    ɵɵproperty("ngClass", ɵɵpureFunction2(6, _c0$4, tab_r8 == ctx_r7.currentTab, tab_r8.count == 0));
    ɵɵadvance(1);
    ɵɵproperty("ngClass", ctx_r7.iconMap[tab_r8.name]);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(4, 4, tab_r8.display || tab_r8.name), " ");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", tab_r8.count >= 0);
} }
function BsTabs_ul_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsTabs_ul_0_ng_container_2_li_1_Template, 6, 9, "li", 3);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r2.customtabs);
} }
function BsTabs_ul_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "ul", 1);
    ɵɵtemplate(1, BsTabs_ul_0_ng_container_1_Template, 2, 1, "ng-container", 2);
    ɵɵtemplate(2, BsTabs_ul_0_ng_container_2_Template, 2, 1, "ng-container", 2);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !!ctx_r0.searchtabs);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !!ctx_r0.customtabs);
} }
class BsTabs {
    constructor(searchService) {
        this.searchService = searchService;
        /**
         * Associate icon to a tab name ({tab1 : 'icon class 1', tab2 : ...})
         */
        this.iconMap = {};
        /**
         * Emits an event when a tab is selected
         */
        this.events = new EventEmitter();
    }
    update() {
        if (this.results && this.results.tabs) {
            this.currentTab = this.searchService.getCurrentTab();
            this.searchtabs = this.results.tabs;
        }
        else {
            this.currentTab = undefined;
            this.searchtabs = undefined;
        }
    }
    ngOnChanges(changes) {
        if (!!changes["results"]) {
            this.update();
        }
    }
    selectTab(tab, search = true) {
        if (tab !== this.currentTab) {
            if (search) {
                this.searchService.selectTab(tab); // the currentTab will be updated in update()
            }
            else {
                this.currentTab = tab;
            }
            this.events.next(tab);
        }
        return false; // Stop following href
    }
}
BsTabs.ɵfac = function BsTabs_Factory(t) { return new (t || BsTabs)(ɵɵdirectiveInject(SearchService)); };
BsTabs.ɵcmp = ɵɵdefineComponent({ type: BsTabs, selectors: [["sq-tabs"]], inputs: { results: "results", customtabs: "customtabs", iconMap: "iconMap" }, outputs: { events: "events" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "nav nav-tabs mb-1", 4, "ngIf"], [1, "nav", "nav-tabs", "mb-1"], [4, "ngIf"], ["class", "nav-item", 4, "ngFor", "ngForOf"], [1, "nav-item"], ["href", "#", 1, "nav-link", 3, "ngClass", "click"], [3, "ngClass"], [1, "count"], ["class", "count", 4, "ngIf"]], template: function BsTabs_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsTabs_ul_0_Template, 3, 2, "ul", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !!ctx.searchtabs || !!ctx.customtabs);
    } }, directives: [NgIf, NgForOf, NgClass], pipes: [MessagePipe, NumberPipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsTabs, [{
        type: Component,
        args: [{
                selector: "sq-tabs",
                templateUrl: "./tabs.html"
            }]
    }], function () { return [{ type: SearchService }]; }, { results: [{
            type: Input
        }], customtabs: [{
            type: Input
        }], iconMap: [{
            type: Input
        }], events: [{
            type: Output
        }] }); })();

function BsLoadingBar_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 1);
    ɵɵelement(1, "div", 2);
    ɵɵelement(2, "div", 3);
    ɵɵelement(3, "div", 4);
    ɵɵelementEnd();
} }
// From https://stackoverflow.com/questions/34773266/how-to-write-css-keyframes-to-indeterminate-material-design-progress-bar
class BsLoadingBar {
    constructor(searchService) {
        this.searchService = searchService;
    }
    isActive() {
        return this.active === undefined ? this.searchService.searchActive : this.active;
    }
}
BsLoadingBar.ɵfac = function BsLoadingBar_Factory(t) { return new (t || BsLoadingBar)(ɵɵdirectiveInject(SearchService)); };
BsLoadingBar.ɵcmp = ɵɵdefineComponent({ type: BsLoadingBar, selectors: [["sq-loading-bar"]], inputs: { active: "active" }, decls: 1, vars: 1, consts: [["class", "slider", 4, "ngIf"], [1, "slider"], [1, "line"], [1, "subline", "inc"], [1, "subline", "dec"]], template: function BsLoadingBar_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsLoadingBar_div_0_Template, 4, 0, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.isActive());
    } }, directives: [NgIf], styles: [".slider[_ngcontent-%COMP%]{\n  position:absolute;\n  width:100%;\n  height:3px;\n  overflow: hidden;\n  z-index: 3;\n}\n\n.line[_ngcontent-%COMP%]{\n  position:absolute;\n  opacity: 0.4;\n  background:#4a8df8;\n  width:150%;\n  height:5px;\n}\n\n.subline[_ngcontent-%COMP%]{\n  position:absolute;\n  background:#4a8df8;\n  height:5px;\n}\n.inc[_ngcontent-%COMP%]{\nanimation: increase 1s infinite;\n}\n.dec[_ngcontent-%COMP%]{\nanimation: decrease 1s 0.25s infinite;\n}\n\n@keyframes increase {\n from { left: -5%; width: 5%; }\n to { left: 130%; width: 100%;}\n}\n@keyframes decrease {\n from { left: -80%; width: 80%; }\n to { left: 110%; width: 10%;}\n}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsLoadingBar, [{
        type: Component,
        args: [{
                selector: 'sq-loading-bar',
                template: `
<div class="slider" *ngIf="isActive()">
	<div class="line"></div>
  <div class="subline inc"></div>
  <div class="subline dec"></div>
</div>
    `,
                styles: [`

.slider{
  position:absolute;
  width:100%;
  height:3px;
  overflow: hidden;
  z-index: 3;
}

.line{
  position:absolute;
  opacity: 0.4;
  background:#4a8df8;
  width:150%;
  height:5px;
}

.subline{
  position:absolute;
  background:#4a8df8;
  height:5px;
}
.inc{
animation: increase 1s infinite;
}
.dec{
animation: decrease 1s 0.25s infinite;
}

@keyframes increase {
 from { left: -5%; width: 5%; }
 to { left: 130%; width: 100%;}
}
@keyframes decrease {
 from { left: -80%; width: 80%; }
 to { left: 110%; width: 10%;}
}
    `]
            }]
    }], function () { return [{ type: SearchService }]; }, { active: [{
            type: Input
        }] }); })();

const _c0$5 = ["anchor"];
class BsScroller {
    constructor(searchService) {
        this.searchService = searchService;
        this.options = {};
    }
    ngAfterViewInit() {
        const options = Object.assign({ root: null }, this.options);
        this.observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                this.searchService.loadMore();
            }
        }, options);
        this.observer.observe(this.anchor.nativeElement);
    }
    ngOnDestroy() {
        this.observer.disconnect();
    }
}
BsScroller.ɵfac = function BsScroller_Factory(t) { return new (t || BsScroller)(ɵɵdirectiveInject(SearchService)); };
BsScroller.ɵcmp = ɵɵdefineComponent({ type: BsScroller, selectors: [["sq-scroller"]], viewQuery: function BsScroller_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0$5, true);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.anchor = _t.first);
    } }, inputs: { options: "options" }, decls: 2, vars: 0, consts: [[2, "height", "5px"], ["anchor", ""]], template: function BsScroller_Template(rf, ctx) { if (rf & 1) {
        ɵɵelement(0, "div", 0, 1);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsScroller, [{
        type: Component,
        args: [{
                selector: 'sq-scroller',
                template: `<div #anchor style="height:5px"></div>`
            }]
    }], function () { return [{ type: SearchService }]; }, { options: [{
            type: Input
        }], anchor: [{
            type: ViewChild,
            args: ['anchor']
        }] }); })();

const _c0$6 = function (a0) { return [a0]; };
const _c1$3 = function (a0, a1, a2) { return { items: a0, style: a1, size: a2, rightAligned: false }; };
function BsLoadMore_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "div", 1);
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("sq-action-buttons", ɵɵpureFunction3(3, _c1$3, ɵɵpureFunction1(1, _c0$6, ctx_r0.loadMoreAction), ctx_r0.buttonsStyle, ctx_r0.actionsSize));
} }
class BsLoadMore {
    constructor(searchService) {
        this.searchService = searchService;
        this.buttonsStyle = "outline-primary";
        this.actionsSize = "sm";
        this.subscription = new Subscription();
        this.hasMore = false;
        this.loadMoreAction = new Action({
            text: "msg#facet.loadMore",
            title: "msg#facet.loadMore",
            action: (action) => {
                this.searchService.loadMore();
                action.update();
            },
            updater: () => {
                // hide button while fetching new data
                this.hasMore = false;
            }
        });
    }
    ngOnInit() {
        this.subscription = this.searchService.resultsStream
            .subscribe(results => {
            this.hasMore = this.searchService.hasMore();
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
BsLoadMore.ɵfac = function BsLoadMore_Factory(t) { return new (t || BsLoadMore)(ɵɵdirectiveInject(SearchService)); };
BsLoadMore.ɵcmp = ɵɵdefineComponent({ type: BsLoadMore, selectors: [["sq-load-more"]], inputs: { buttonsStyle: "buttonsStyle", actionsSize: "actionsSize" }, decls: 1, vars: 1, consts: [["class", "btn-group", 3, "sq-action-buttons", 4, "ngIf"], [1, "btn-group", 3, "sq-action-buttons"]], template: function BsLoadMore_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsLoadMore_div_0_Template, 1, 7, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.hasMore);
    } }, directives: [NgIf, BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsLoadMore, [{
        type: Component,
        args: [{
                selector: "sq-load-more",
                templateUrl: "./load-more.html"
            }]
    }], function () { return [{ type: SearchService }]; }, { buttonsStyle: [{
            type: Input
        }], actionsSize: [{
            type: Input
        }] }); })();

class BsSearchModule {
    static forRoot(searchOptions) {
        return {
            ngModule: BsSearchModule,
            providers: [
                // Provide SEARCH_OPTIONS
                { provide: SEARCH_OPTIONS, useValue: searchOptions },
            ]
        };
    }
}
BsSearchModule.ɵmod = ɵɵdefineNgModule({ type: BsSearchModule });
BsSearchModule.ɵinj = ɵɵdefineInjector({ factory: function BsSearchModule_Factory(t) { return new (t || BsSearchModule)(); }, imports: [[
            CommonModule,
            FormsModule, ReactiveFormsModule,
            WebServicesModule,
            IntlModule,
            LoginModule,
            UtilsModule,
            BsActionModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BsSearchModule, { declarations: [BsDidYouMean,
        BsBreadcrumbs, BsPager, BsPageSizeSelector, BsSortSelector,
        BsTabs, BsLoadingBar,
        BsScroller, BsLoadMore], imports: [CommonModule,
        FormsModule, ReactiveFormsModule,
        WebServicesModule,
        IntlModule,
        LoginModule,
        UtilsModule,
        BsActionModule], exports: [BsDidYouMean,
        BsBreadcrumbs, BsPager, BsPageSizeSelector, BsSortSelector,
        BsTabs, BsLoadingBar,
        BsScroller, BsLoadMore] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsSearchModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule, ReactiveFormsModule,
                    WebServicesModule,
                    IntlModule,
                    LoginModule,
                    UtilsModule,
                    BsActionModule
                ],
                declarations: [
                    BsDidYouMean,
                    BsBreadcrumbs, BsPager, BsPageSizeSelector, BsSortSelector,
                    BsTabs, BsLoadingBar,
                    BsScroller, BsLoadMore
                ],
                exports: [
                    BsDidYouMean,
                    BsBreadcrumbs, BsPager, BsPageSizeSelector, BsSortSelector,
                    BsTabs, BsLoadingBar,
                    BsScroller, BsLoadMore
                ],
            }]
    }], null, null); })();

var en = {
    "search": {
        "emptySearchNotification": "Please enter some search terms to perform a search",
        "alreadyFiltered": "Already selected"
    },
    "breadcrumbs": {
        "emptySearch": "<empty search>",
        "itemRemove": "Remove"
    },
    "didYouMean": {
        "dymonlyBeforeCorrected": "Did you mean: ",
        "dymonlyAfterCorrected": "?",
        "correctBeforeCorrected": "Showing results for: ",
        "correctBeforeOriginal": ". Search instead for: ",
        "correctAfterOriginal": "",
        "smartBeforeOriginal": "Showing results for: ",
        "smartBeforeCorrected": " and ",
        "smartAfterCorrected": ""
    },
    "pageSizeSelector": {
        "pageSizeChoice": "{size, number} per page",
        "defaultPageSize": "Default ({size, number})",
        "defaultPageSizeChoice": "{size, number} per page (default)"
    },
    "pager": {
        "pageNumberTitle": "Page {page, number}",
        "firstPage": "First page",
        "nextPage": "Next page",
        "previousPage": "Previous page",
        "lastPage": "Last page"
    },
    "sortSelector": {
        "sortByTitle": "Sort by: {text}",
        "sortOther": "<Other>"
    },
    "sort": {
        "relevance": "Relevance",
        "date": "Date",
        "filename": "File name",
        "title": "Title"
    },
    "queryIntent": {
        "externalServiceTimeoutError": "This result page is incomplete due to an internal timeout. Please retry later."
    }
};

var fr = {
    "search": {
        "emptySearchNotification": "Veuillez saisir des termes de recherche pour effectuer une recherche",
        "alreadySelected": "Déjà sélectionné"
    },
    "breadcrumbs": {
        "emptySearch": "<recherche vide>",
        "itemRemove": "Supprimer"
    },
    "didYouMean": {
        "dymonlyBeforeCorrected": "Essayez avec cette orthographe : ",
        "dymonlyAfterCorrected": "",
        "correctBeforeCorrected": "Résultats pour : ",
        "correctBeforeOriginal": ". Essayez avec l'orthographe : ",
        "correctAfterOriginal": "",
        "smartBeforeOriginal": "Résultats pour : ",
        "smartBeforeCorrected": " et ",
        "smartAfterCorrected": ""
    },
    "pageSizeSelector": {
        "pageSizeChoice": "{size, number} par page",
        "defaultPageSize": "Défaut ({size, number})",
        "defaultPageSizeChoice": "{size, number} par page (défaut)"
    },
    "pager": {
        "pageNumberTitle": "Page {page, number}",
        "firstPage": "Première page",
        "nextPage": "Page suivante",
        "previousPage": "Page précédente",
        "lastPage": "Dernière page"
    },
    "sortSelector": {
        "sortByTitle": "Trier par: {text}",
        "sortOther": "<Autre>"
    },
    "sort": {
        "relevance": "Pertinence",
        "date": "Date",
        "filename": "Nom de fichier",
        "title": "Titre"
    },
    "queryIntent": {
        "externalServiceTimeoutError": "Cette page de résultat est incomplète due à un délai d'attente interne dépassé. S'il vous plaît, réessayez plus tard."
    }
};

var de = {
    "search": {
        "emptySearchNotification": "Bitte geben Sie einige Suchbegriffe ein, um eine Suche durchzuführen",
        "alreadyFiltered": "bereits ausgewählt"
    },
    "breadcrumbs": {
        "emptySearch": "<Suche ohne Suchbegriff>",
        "itemRemove": "Entfernen"
    },
    "didYouMean": {
        "dymonlyBeforeCorrected": "Meinten Sie: ",
        "dymonlyAfterCorrected": "?",
        "correctBeforeCorrected": "Zeige Ergebnisse für [",
        "correctBeforeOriginal": "]. Zeige stattdessen Ergebnisse für [",
        "correctAfterOriginal": "]",
        "smartBeforeOriginal": "Zeige Ergebnisse für [",
        "smartBeforeCorrected": "] und [",
        "smartAfterCorrected": "]"
    },
    "pageSizeSelector": {
        "pageSizeChoice": "{size, number} pro Seite",
        "defaultPageSize": "Standard ({size, number})",
        "defaultPageSizeChoice": "{size, number} pro Seite (standard)"
    },
    "pager": {
        "pageNumberTitle": "Seite {page, number}",
        "firstPage": "Erste Seite",
        "nextPage": "Nächste Seite",
        "previousPage": "Vorherige Seite",
        "lastPage": "Letzte Seite"
    },
    "sortSelector": {
        "sortByTitle": "Sortieren nach: {text}",
        "sortOther": "<Andere>"
    },
    "sort": {
        "relevance": "Relevanz",
        "date": "Datum",
        "filename": "Dateiname",
        "title": "Titel"
    },
    "queryIntent": {
        "externalServiceTimeoutError": "Diese Ergebnisseite ist aufgrund eines internen Zeitlimits unvollständig. Bitte versuchen Sie es später noch einmal."
    }
};

/**
 * Generated bundle index. Do not edit.
 */

export { Breadcrumbs, BsBreadcrumbs, BsDidYouMean, BsLoadMore, BsLoadingBar, BsPageSizeSelector, BsPager, BsScroller, BsSearchModule, BsSortSelector, BsTabs, FIRST_PAGE_OPTIONS, FirstPageService, SEARCH_OPTIONS, SearchService, de as deSearch, en as enSearch, fr as frSearch };
//# sourceMappingURL=sinequa-components-search.js.map
