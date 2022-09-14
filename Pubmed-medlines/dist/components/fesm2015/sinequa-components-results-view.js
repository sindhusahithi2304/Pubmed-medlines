import { InjectionToken, ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, Inject, ɵɵelement, ɵɵnextContext, ɵɵclassMap, ɵɵgetCurrentView, ɵɵelementStart, ɵɵlistener, ɵɵrestoreView, ɵɵtext, ɵɵpipe, ɵɵtemplate, ɵɵelementEnd, ɵɵproperty, ɵɵpureFunction1, ɵɵadvance, ɵɵtextInterpolate2, ɵɵpipeBind1, ɵɵpipeBind2, ɵɵsanitizeHtml, ɵɵattribute, ɵɵtextInterpolate, ɵɵelementContainerStart, ɵɵelementContainerEnd, ɵɵdirectiveInject, ɵɵdefineComponent, ɵɵNgOnChangesFeature, ɵɵpropertyInterpolate, Component, Input, ɵɵpureFunction3, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Utils } from '@sinequa/core/base';
import { SearchService, enSearch, frSearch, deSearch } from '@sinequa/components/search';
import { AppService, FormatService } from '@sinequa/core/app-utils';
import { SelectionService, BsResultSelector, BsSelectionModule, enSelection, frSelection, deSelection } from '@sinequa/components/selection';
import { NgForOf, NgClass, NgIf, CommonModule } from '@angular/common';
import { MessagePipe, IntlModule } from '@sinequa/core/intl';
import { ValuePipe, UtilsModule } from '@sinequa/components/utils';
import { LoadComponentModule } from '@sinequa/core/load-component';
import { ValidationModule } from '@sinequa/core/validation';
import { Action, BsActionButtons, BsActionModule } from '@sinequa/components/action';

const RESULTS_VIEWS = new InjectionToken("RESULTS_VIEWS");
//export const DEFAULT_VIEW = new InjectionToken<ResultsView>("DEFAULT_VIEW");
class ResultsViewService {
    /**
     * Constructor: Expects the configuration for a list of views and
     * one default view. These views can be set when importing the module in the AppModule
     * with the ResultsViewModule.forRoot() method.
     */
    constructor(
    // @Inject(DEFAULT_VIEW) public defaultView: ResultsView,
    resultsViews, router, route, searchService) {
        this.router = router;
        this.route = route;
        this.searchService = searchService;
        this._resultsViewSelected = new Subject();
        this._events = new Subject();
        this._resultsViews = resultsViews;
        // this._resultsView = this.defaultView;
        /**
         * Listener triggered whenever the URL changes
         */
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.handleNavigation();
            }
        });
        /**
         * Listener triggered whenever new results come in.
         * Some views must be displayed after a search, hence the
         * pendingView flag.
         */
        this.searchService.resultsStream.subscribe(results => {
            if (this.pendingView) {
                this.searchService.queryStringParams.view = this.pendingView.name;
                this.searchService.navigate({ skipSearch: true });
                this.pendingView = undefined;
            }
        });
        // Automatically switch results views, if we go to a tab that has specific list of views
        this.searchService.events.subscribe(event => {
            // Event called just before the query for the new tab is searched
            if (event.type === "before-select-tab" && event.query.tab) {
                const views = this.getIncludedViews(event.query.tab);
                // If there are views for this tab and they don't include the current one...
                if (views.length > 0 && !views.includes(this.resultsView)) {
                    // Set the view as pending
                    this.pendingView = views[0];
                    // Modify the query if needed
                    if (this.pendingView.beforeSearch) {
                        this.pendingView.beforeSearch(event.query, this.resultsView);
                    }
                }
            }
        });
    }
    // GETTERS
    get resultsViewSelected() {
        return this._resultsViewSelected;
    }
    get events() {
        return this._events;
    }
    get resultsView() {
        return this._resultsView;
    }
    get views() {
        return this._resultsViews;
    }
    // EVENT HANDLERS
    /**
     * Navigate to a new URL including the given results view's name
     * @param view
     */
    navigate(view) {
        let waitForResults = !!view.beforeSearch;
        if (view.beforeSearch) {
            waitForResults = view.beforeSearch(this.searchService.query, this.resultsView);
        }
        if (!waitForResults) {
            // We switch view immediately via the search service (which centralizes the navigation)
            this.searchService.queryStringParams.view = view.name;
            this.searchService.navigate({ skipSearch: true });
        }
        else {
            // We set the view as "pending", that is waiting for new results to come in
            this.pendingView = view;
            this.searchService.search();
        }
    }
    /**
     * Responds to a change in the URL: Sets the results view if the URL
     * specifies a different results view name.
     */
    handleNavigation() {
        const url = Utils.makeURL(this.router.url);
        const view = this.getView(url.searchParams.get("view"));
        if (view && view !== this.resultsView) {
            this.searchService.queryStringParams.view = view.name; // Needed when refreshing the page
            this.setResultsView(view);
        }
    }
    /**
     * Sets the results view and emits an event
     * @param view
     */
    setResultsView(view) {
        this._resultsView = view;
        this._events.next({ type: "after-select", view });
        this._resultsViewSelected.next(view);
    }
    // PUBLIC API
    /**
     * Selects the given results view. This method is asynchronous:
     * - The selected results view might modify the query before being displayed
     * - The view selection works with a navigation via the router (adding the view name to the URL)
     * @param view
     */
    selectResultsView(view) {
        if (view) {
            // Raise before event...
            const beforeEvent = {
                type: "before-select",
                view,
                promises: []
            };
            this._events.next(beforeEvent);
            if (beforeEvent.promises.length === 0) {
                this.navigate(view);
            }
            else {
                Promise.all(beforeEvent.promises)
                    .then((results) => {
                    const ok = results.every(result => result);
                    if (ok) {
                        this.navigate(view);
                    }
                    else {
                        console.log("selectResultsView cancelled");
                        this._events.next({ type: "select-cancelled", view });
                    }
                })
                    .catch((reason) => {
                    console.log("selectResultsView error:", reason);
                    this._events.next({ type: "select-cancelled", view });
                });
            }
        }
        else {
            console.error("Undefined Results View");
        }
    }
    /**
     * Selects the results view with the given name. This method is asynchronous:
     * - The selected results view might modify the query before being displayed
     * - The view selection works with a navigation via the router (adding the view name to the URL)
     * @param viewName
     */
    selectResultsViewName(viewName) {
        const view = this.getView(viewName);
        if (view) {
            this.selectResultsView(view);
        }
    }
    /**
     * Returns the results view with the given name
     * @param viewName
     */
    getView(viewName) {
        return this.views.find(v => v.name === viewName);
    }
    /**
     * Returns the list of results views compatible with a given tab
     * @param tab
     */
    getIncludedViews(tab) {
        const views = [];
        for (const view of this.views) {
            const included = !!view.includedTabs
                ? view.includedTabs.includes(tab || "")
                : !view.excludedTabs || !view.excludedTabs.includes(tab || "");
            if (included) {
                views.push(view);
            }
        }
        return views;
    }
}
ResultsViewService.ɵfac = function ResultsViewService_Factory(t) { return new (t || ResultsViewService)(ɵɵinject(RESULTS_VIEWS), ɵɵinject(Router), ɵɵinject(ActivatedRoute), ɵɵinject(SearchService)); };
ResultsViewService.ɵprov = ɵɵdefineInjectable({ token: ResultsViewService, factory: ResultsViewService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ResultsViewService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [RESULTS_VIEWS]
            }] }, { type: Router }, { type: ActivatedRoute }, { type: SearchService }]; }, null); })();

function BsResultsGridView_th_9_span_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span");
} if (rf & 2) {
    const columnData_r2 = ɵɵnextContext().$implicit;
    ɵɵclassMap(columnData_r2.sortIcon);
} }
const _c0 = function (a0) { return { "sq-clickable": a0 }; };
function BsResultsGridView_th_9_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "th", 7);
    ɵɵlistener("click", function BsResultsGridView_th_9_Template_th_click_0_listener() { ɵɵrestoreView(_r6); const columnData_r2 = ctx.$implicit; const ctx_r5 = ɵɵnextContext(); return ctx_r5.setSort(columnData_r2); });
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵtemplate(3, BsResultsGridView_th_9_span_3_Template, 1, 3, "span", 8);
    ɵɵelementEnd();
} if (rf & 2) {
    const columnData_r2 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction1(6, _c0, ctx_r0.isSortable(columnData_r2)));
    ɵɵadvance(1);
    ɵɵtextInterpolate2("", ɵɵpipeBind1(2, 4, columnData_r2.config.title), "", columnData_r2.sortIndicator, "");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r0.isSortable(columnData_r2));
} }
function BsResultsGridView_tr_11_ng_container_3_td_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "td", 12);
    ɵɵpipe(1, "sqValue");
} if (rf & 2) {
    const ctx_r14 = ɵɵnextContext();
    const columnData_r9 = ctx_r14.$implicit;
    const $index_r10 = ctx_r14.index;
    const record_r7 = ɵɵnextContext().$implicit;
    ɵɵproperty("innerHTML", ɵɵpipeBind2(1, 2, record_r7[columnData_r9.config.field], columnData_r9.column), ɵɵsanitizeHtml);
    ɵɵattribute("scope", $index_r10 === 0 ? "row" : null);
} }
function BsResultsGridView_tr_11_ng_container_3_td_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "td");
    ɵɵtext(1);
    ɵɵpipe(2, "sqValue");
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r15 = ɵɵnextContext();
    const $index_r10 = ctx_r15.index;
    const columnData_r9 = ctx_r15.$implicit;
    const record_r7 = ɵɵnextContext().$implicit;
    ɵɵattribute("scope", $index_r10 === 0 ? "row" : null);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind2(2, 2, record_r7[columnData_r9.config.field], columnData_r9.column));
} }
function BsResultsGridView_tr_11_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsResultsGridView_tr_11_ng_container_3_td_1_Template, 2, 5, "td", 10);
    ɵɵtemplate(2, BsResultsGridView_tr_11_ng_container_3_td_2_Template, 3, 5, "td", 11);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const columnData_r9 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵproperty("ngIf", columnData_r9.config.renderAsHtml);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !columnData_r9.config.renderAsHtml);
} }
function BsResultsGridView_tr_11_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "tr");
    ɵɵelementStart(1, "td", 1);
    ɵɵelement(2, "sq-result-selector", 9);
    ɵɵelementEnd();
    ɵɵtemplate(3, BsResultsGridView_tr_11_ng_container_3_Template, 3, 2, "ng-container", 6);
    ɵɵelementEnd();
} if (rf & 2) {
    const record_r7 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("record", record_r7);
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r1.columnsData);
} }
class BsResultsGridView {
    constructor(appService, searchService, formatService, selectionService) {
        this.appService = appService;
        this.searchService = searchService;
        this.formatService = formatService;
        this.selectionService = selectionService;
    }
    observeQueryFields() {
        this.initSorts();
    }
    ngOnChanges(changes) {
        if (!this.columnsData) {
            if (!!this.view.columns) {
                this.columnsData = this.view.columns.filter(config => config.active).map(config => ({
                    config: config,
                    column: this.appService.getColumn(config.field)
                }));
                this.clearSorts();
            }
            else {
                this.columnsData = [];
            }
        }
        if (!!changes["query"]) {
            this.observeQueryFields();
        }
    }
    toggleSelectedRecords() {
        this.selectionService.toggleSelectedRecords();
    }
    get haveSelectedRecords() {
        return this.selectionService.haveSelectedRecords;
    }
    getSortIndicator(columnData) {
        if (columnData.sortIndex === -1) {
            return undefined;
        }
        if (this.maxSortIndex === 0) {
            return undefined;
        }
        switch (columnData.sortIndex || -1 + 1) {
            case 1: return "\u00B9";
            case 2: return "\u00B2";
            case 3: return "\u00B3";
            case 4: return "\u2074";
            case 5: return "\u2075";
            case 6: return "\u2076";
            case 7: return "\u2077";
            case 8: return "\u2078";
            case 9: return "\u2079";
            default: return "\u207A";
        }
    }
    ascendingFirst(column) {
        //return this.appService.isNumber(column.field);
        return false;
    }
    get maxSortIndex() {
        let sortIndex = -1;
        if (this.columnsData) {
            for (const columnData of this.columnsData) {
                if (columnData.sortIndex !== undefined && columnData.sortIndex > sortIndex) {
                    sortIndex = columnData.sortIndex;
                }
            }
        }
        return sortIndex;
    }
    _setSort(columnData, ascending) {
        const previousSortIndex = columnData.sortIndex;
        if (previousSortIndex === -1) {
            columnData.sortIndex = this.maxSortIndex + 1;
        }
        columnData.ascending = ascending;
        columnData.sortIcon = columnData.ascending ? "fas fa-caret-up" : "fas fa-caret-down";
        columnData.sortIndicator = this.getSortIndicator(columnData);
        if (previousSortIndex === -1) {
            if (this.columnsData) {
                for (const columnData1 of this.columnsData) {
                    columnData1.sortIndicator = this.getSortIndicator(columnData1);
                }
            }
        }
    }
    _clearSort(columnData) {
        const previousSortIndex = columnData.sortIndex || -1;
        columnData.sortIndex = -1;
        columnData.ascending = false;
        columnData.sortIcon = "fas fa-sort";
        columnData.sortIndicator = undefined;
        if (previousSortIndex !== -1) {
            if (this.columnsData) {
                for (const columnData1 of this.columnsData) {
                    if (columnData1.sortIndex !== undefined && columnData1.sortIndex > previousSortIndex) {
                        columnData1.sortIndex--;
                    }
                    columnData1.sortIndicator = this.getSortIndicator(columnData1);
                }
            }
        }
    }
    clearSorts() {
        if (this.columnsData) {
            for (const columnData of this.columnsData) {
                this._clearSort(columnData);
            }
        }
    }
    isSortable(columnData) {
        return !!columnData && columnData.config.sortable && this.appService.isSortable(columnData.config.field);
    }
    initSorts() {
        if (this.searchService.query.orderBy === this.orderBy) {
            return;
        }
        this.orderBy = this.searchService.query.orderBy;
        this.clearSorts();
        if (!!this.orderBy) {
            const parts = Utils.split(this.orderBy, ",");
            for (const part of parts) {
                const tokens = Utils.split(part, " ");
                if (tokens.length > 0) {
                    const field = tokens[0];
                    if (this.columnsData) {
                        const columnData = this.columnsData.find(value => Utils.eqNC(field, value.config.field));
                        if (columnData && this.isSortable(columnData)) {
                            this._setSort(columnData, tokens.length > 1 ? Utils.eqNC(tokens[1], "asc") : true);
                        }
                    }
                }
            }
        }
    }
    setSort(columnData) {
        if (this.isSortable(columnData)) {
            if (columnData.sortIndex !== -1) {
                if (this.ascendingFirst(columnData.config)) {
                    if (columnData.ascending) {
                        this._setSort(columnData, false);
                    }
                    else {
                        this._clearSort(columnData);
                    }
                }
                else {
                    if (columnData.ascending) {
                        this._clearSort(columnData);
                    }
                    else {
                        this._setSort(columnData, true);
                    }
                }
            }
            else {
                this._setSort(columnData, this.ascendingFirst(columnData.config));
            }
            const orderBy = [];
            if (this.columnsData) {
                for (let sortIndex = 0;; sortIndex++) {
                    const columnData = this.columnsData.find(columnData => columnData.sortIndex === sortIndex);
                    if (!columnData) {
                        break;
                    }
                    if (orderBy.length !== 0) {
                        orderBy.push(",");
                    }
                    orderBy.push(columnData.config.field);
                    if (!columnData.ascending) {
                        orderBy.push(" desc");
                    }
                }
            }
            if (orderBy.length === 0) {
                this.searchService.query.orderBy = this.orderBy = undefined;
            }
            else {
                this.searchService.query.orderBy = this.orderBy = orderBy.join("");
            }
            this.searchService.search();
        }
    }
}
BsResultsGridView.ɵfac = function BsResultsGridView_Factory(t) { return new (t || BsResultsGridView)(ɵɵdirectiveInject(AppService), ɵɵdirectiveInject(SearchService), ɵɵdirectiveInject(FormatService), ɵɵdirectiveInject(SelectionService)); };
BsResultsGridView.ɵcmp = ɵɵdefineComponent({ type: BsResultsGridView, selectors: [["sq-results-grid-view"]], inputs: { results: "results", view: "view" }, features: [ɵɵNgOnChangesFeature], decls: 12, vars: 6, consts: [[1, "sq-results-grid-view"], [1, "sq-grid-view-checkbox"], [1, "custom-control", "custom-checkbox", 3, "title"], ["type", "checkbox", 1, "custom-control-input", 3, "checked", "change"], [1, "custom-control-label"], ["scope", "col", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [4, "ngFor", "ngForOf"], ["scope", "col", 3, "ngClass", "click"], [3, "class", 4, "ngIf"], [3, "record"], [3, "innerHTML", 4, "ngIf"], [4, "ngIf"], [3, "innerHTML"]], template: function BsResultsGridView_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "table", 0);
        ɵɵelementStart(1, "thead");
        ɵɵelementStart(2, "tr");
        ɵɵelementStart(3, "th", 1);
        ɵɵelementStart(4, "label", 2);
        ɵɵpipe(5, "sqMessage");
        ɵɵelementStart(6, "input", 3);
        ɵɵlistener("change", function BsResultsGridView_Template_input_change_6_listener() { return ctx.toggleSelectedRecords(); });
        ɵɵelementEnd();
        ɵɵelementStart(7, "span", 4);
        ɵɵtext(8, "\u200B");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵtemplate(9, BsResultsGridView_th_9_Template, 4, 8, "th", 5);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(10, "tbody");
        ɵɵtemplate(11, BsResultsGridView_tr_11_Template, 4, 2, "tr", 6);
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(4);
        ɵɵpropertyInterpolate("title", ɵɵpipeBind1(5, 4, ctx.haveSelectedRecords ? "msg#results.resultsGridView.unselectDocuments" : "msg#results.resultsGridView.selectDocuments"));
        ɵɵadvance(2);
        ɵɵproperty("checked", ctx.haveSelectedRecords);
        ɵɵadvance(3);
        ɵɵproperty("ngForOf", ctx.columnsData);
        ɵɵadvance(2);
        ɵɵproperty("ngForOf", ctx.results.records);
    } }, directives: [NgForOf, NgClass, NgIf, BsResultSelector], pipes: [MessagePipe, ValuePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsResultsGridView, [{
        type: Component,
        args: [{
                selector: "sq-results-grid-view",
                templateUrl: "./results-grid-view.html"
            }]
    }], function () { return [{ type: AppService }, { type: SearchService }, { type: FormatService }, { type: SelectionService }]; }, { results: [{
            type: Input
        }], view: [{
            type: Input
        }] }); })();

const _c0$1 = function (a0, a2, a3) { return { items: a0, autoAdjust: true, rightAligned: a2, size: a3 }; };
class BsResultsViewSelector {
    constructor(resultsViewService) {
        this.resultsViewService = resultsViewService;
        this.useDropdownMenu = true;
        this._subscription = this.resultsViewService.resultsViewSelected.subscribe((view) => {
            this.setCurrentViewAction();
        });
    }
    ngOnDestroy() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }
    setCurrentViewAction() {
        if (!!this.viewAction && !!this.resultsViewService.resultsView) {
            if (!Utils.isArray(this.viewAction)) {
                const view = this.resultsViewService.views.find(view => Utils.eqNC(this.resultsViewService.resultsView.name, view.name));
                if (view) {
                    this.viewAction.text = view.display || view.name;
                    this.viewAction.icon = view.icon || 'fas fa-list';
                }
                else {
                    this.viewAction.text = "msg#results.unselectableViewDisplay";
                    this.viewAction.icon = "far fa-square fa-fw";
                }
                this.viewAction.messageParams = { values: { text: this.viewAction.text } }; // for title
            }
            else {
                this.viewAction.forEach(action => {
                    action.selected = Utils.eqNC(action.data.name, this.resultsViewService.resultsView.name);
                });
            }
        }
    }
    buildViewAction() {
        if (this.resultsViewService.views.length <= 1) {
            this.viewAction = undefined;
            this.items = [];
            return;
        }
        const includedViews = this.resultsViewService.getIncludedViews(this.query.tab);
        if (includedViews.length <= 1) {
            this.viewAction = undefined;
            this.items = [];
            return;
        }
        if (this.useDropdownMenu) {
            this.viewAction = new Action({
                title: "msg#results.viewTitle",
                children: includedViews.map(view => new Action({
                    text: view.display,
                    icon: view.icon,
                    data: view,
                    action: (item, event) => {
                        this.selectView(item.data);
                    }
                }))
            });
            this.items = [this.viewAction];
        }
        else {
            this.viewAction = [];
            for (const view of includedViews) {
                this.viewAction.push(new Action({
                    icon: view.icon,
                    title: view.display,
                    data: view,
                    action: (item, event) => {
                        this.selectView(item.data);
                    }
                }));
            }
            this.items = this.viewAction;
        }
        this.setCurrentViewAction();
    }
    ngOnChanges(changes) {
        this.buildViewAction();
    }
    selectView(view) {
        this.resultsViewService.selectResultsView(view);
    }
}
BsResultsViewSelector.ɵfac = function BsResultsViewSelector_Factory(t) { return new (t || BsResultsViewSelector)(ɵɵdirectiveInject(ResultsViewService)); };
BsResultsViewSelector.ɵcmp = ɵɵdefineComponent({ type: BsResultsViewSelector, selectors: [["sq-results-view-selector"]], inputs: { query: "query", results: "results", rightAligned: "rightAligned", useDropdownMenu: "useDropdownMenu", size: "size" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 5, consts: [[3, "sq-action-buttons"]], template: function BsResultsViewSelector_Template(rf, ctx) { if (rf & 1) {
        ɵɵelement(0, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("sq-action-buttons", ɵɵpureFunction3(1, _c0$1, ctx.items, ctx.rightAligned, ctx.size));
    } }, directives: [BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsResultsViewSelector, [{
        type: Component,
        args: [{
                selector: "sq-results-view-selector",
                templateUrl: "./results-view-selector.html"
            }]
    }], function () { return [{ type: ResultsViewService }]; }, { query: [{
            type: Input
        }], results: [{
            type: Input
        }], rightAligned: [{
            type: Input
        }], useDropdownMenu: [{
            type: Input
        }], size: [{
            type: Input
        }] }); })();

class BsResultsViewModule {
    static forRoot(resultsViews, defaultView) {
        return {
            ngModule: BsResultsViewModule,
            providers: [
                {
                    provide: RESULTS_VIEWS,
                    useValue: resultsViews
                },
            ]
        };
    }
}
BsResultsViewModule.ɵmod = ɵɵdefineNgModule({ type: BsResultsViewModule });
BsResultsViewModule.ɵinj = ɵɵdefineInjector({ factory: function BsResultsViewModule_Factory(t) { return new (t || BsResultsViewModule)(); }, imports: [[
            CommonModule,
            LoadComponentModule,
            IntlModule,
            ValidationModule,
            UtilsModule,
            BsActionModule,
            BsSelectionModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BsResultsViewModule, { declarations: [BsResultsViewSelector,
        BsResultsGridView], imports: [CommonModule,
        LoadComponentModule,
        IntlModule,
        ValidationModule,
        UtilsModule,
        BsActionModule,
        BsSelectionModule], exports: [BsResultsViewSelector,
        BsResultsGridView] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsResultsViewModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    LoadComponentModule,
                    IntlModule,
                    ValidationModule,
                    UtilsModule,
                    BsActionModule,
                    BsSelectionModule
                ],
                declarations: [
                    BsResultsViewSelector,
                    BsResultsGridView,
                ],
                exports: [
                    BsResultsViewSelector,
                    BsResultsGridView,
                ],
            }]
    }], null, null); })();

var _enResultsView = {
    "results": {
        "viewTitle": "View: {text}",
        "unselectableViewDisplay": "<Other>",
        "resultsListView": {
            "display": "List",
            "selectDocument": "Select document",
            "unselectDocument": "Unselect document",
            "previewPopup": "Document Navigator",
            "previewInCurrentPage": "Document Navigator (in current page)",
            "previewInNewTab": "Document Navigator (in new tab)",
            "showMetadata": "Details",
            "showLabels": "Labels"
        },
        "resultsGridView": {
            "display": "Grid",
            "selectDocument": "Select document",
            "unselectDocument": "Unselect document",
            "selectDocuments": "Select documents",
            "unselectDocuments": "Unselect documents"
        },
        "viewPageSize": "Number of results per page",
        "viewUpdateApply": "Apply",
        "warningNoViewForTab": "The '{tab}' tab has no associated result views.",
        "warningCannotDisplayTabOnView": "The '{tab}' tab cannot be displayed using '{view}' view because it is not included in the view configuration.",
        "resultsAllTab": "All",
        "resultsTextTab": "Text",
        "results_all_tab": "All",
        "results_text_tab": "Text",
    }
};

var _frResultsView = {
    "results": {
        "viewTitle": "Vue : {text}",
        "unselectableViewDisplay": "<Autre>",
        "resultsListView": {
            "display": "Liste",
            "selectDocument": "Sélectionner le document",
            "unselectDocument": "Désélectionner le document",
            "previewPopup": "Document Navigator",
            "previewInCurrentPage": "Document Navigator (dans la page courante)",
            "previewInNewTab": "Document Navigator (dans un nouvel onglet)",
            "showMetadata": "Détails",
            "showLabels": "Libellés"
        },
        "resultsGridView": {
            "display": "Grille",
            "selectDocument": "Sélectionner le document",
            "unselectDocument": "Désélectionner le document",
            "selectDocuments": "Sélectionner les documents",
            "unselectDocuments": "Désélectionner les documents "
        },
        "viewPageSize": "Nombre de résultats par page",
        "viewUpdateApply": "Appliquer",
        "warningNoViewForTab": "L'onglet '{tab}' n'est associé à aucune vue.",
        "warningCannotDisplayTabOnView": "L'onglet '{tab}' ne peut pas être affiché dans la vue '{view}' car il n'est pas inclus dans la configuration de la vue.",
        "resultsAllTab": "Tous",
        "resultsTextTab": "Texte",
        "results_all_tab": "Tous",
        "results_text_tab": "Texte",
    }
};

var _deResultsView = {
    "results": {
        "viewTitle": "Anzeige: {text}",
        "unselectableViewDisplay": "<Andere>",
        "resultsListView": {
            "display": "Liste",
            "selectDocument": "Dokument auswählen",
            "unselectDocument": "Dokumentauswahl aufheben",
            "previewPopup": "[Dokument-Navigator]",
            "previewInCurrentPage": "[Dokument-Navigator (auf der aktuellen Seite)]",
            "previewInNewTab": "[Dokument-Navigator (in einem neuen Reiter)]",
            "showMetadata": "[Metadaten]",
            "showLabels": "[Etiketten]"
        },
        "resultsGridView": {
            "display": "Tabelle",
            "selectDocument": "Dokument auswählen",
            "unselectDocument": "Dokumentauswahl aufheben",
            "selectDocuments": "Dokumente auswählen",
            "unselectDocuments": "Dokumentauswahl aufheben"
        },
        "viewPageSize": "Anzahl der Ergebnisse pro Seite",
        "viewUpdateApply": "Anwenden",
        "warningNoViewForTab": "Der Reiter '{tab}' hat keine zugewiesenen Ergebnisansichten.",
        "warningCannotDisplayTabOnView": "Der Reiter '{tab}' kann nicht mit der Ansicht '{view}' angezeigt werden, da diese nicht in der Ansichtskonfiguration enthalten ist.",
        "resultsAllTab": "Alle",
        "resultsTextTab": "Text",
        "results_all_tab": "Alle",
        "results_text_tab": "Text",
    }
};

const enResultsView = Utils.merge({}, _enResultsView, enSearch, enSelection);
const frResultsView = Utils.merge({}, _frResultsView, frSearch, frSelection);
const deResultsView = Utils.merge({}, _deResultsView, deSearch, deSelection);

/**
 * Generated bundle index. Do not edit.
 */

export { BsResultsGridView, BsResultsViewModule, BsResultsViewSelector, RESULTS_VIEWS, ResultsViewService, deResultsView, enResultsView, frResultsView };
//# sourceMappingURL=sinequa-components-results-view.js.map
