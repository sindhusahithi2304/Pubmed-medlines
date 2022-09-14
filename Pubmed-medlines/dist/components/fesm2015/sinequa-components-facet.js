import { InjectionToken, ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, Optional, Inject, EventEmitter, ɵɵdefineComponent, ɵɵstaticViewQuery, TemplateRef, ɵɵqueryRefresh, ɵɵloadQuery, Component, Output, ViewChild, ɵɵelement, ɵɵnextContext, ɵɵclassMapInterpolate1, ɵɵelementStart, ɵɵtext, ɵɵpipe, ɵɵelementEnd, ɵɵadvance, ɵɵtextInterpolate, ɵɵpipeBind1, ɵɵelementContainer, ɵɵproperty, ɵɵprojection, ɵɵtemplate, ɵɵdirectiveInject, ChangeDetectorRef, ɵɵcontentQuery, ɵɵhostProperty, ɵɵclassProp, ɵɵprojectionDef, ɵɵpureFunction3, Input, ContentChild, HostBinding, ɵɵpureFunction1, ɵɵgetCurrentView, ɵɵlistener, ɵɵrestoreView, ɵɵpureFunction2, ɵɵpipeBind2, ɵɵpropertyInterpolate, ɵɵstyleProp, ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature, ChangeDetectionStrategy, ɵɵpipeBind3, ɵɵreference, ɵɵelementContainerStart, ɵɵelementContainerEnd, ɵɵpureFunction4, ɵɵtextInterpolate1, ɵɵtemplateRefExtractor, ɵɵclassMap, ɵɵsanitizeHtml, ɵɵviewQuery, ɵɵattribute, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { Query, Expr, AppService, FormatService, ExprBuilder } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { UserSettingsWebService } from '@sinequa/core/web-services';
import { SearchService, BsLoadingBar, BsDidYouMean, BsSearchModule, enSearch, frSearch, deSearch } from '@sinequa/components/search';
import { SuggestService, Autocomplete, BsAutocompleteList, BsAutocompleteModule } from '@sinequa/components/autocomplete';
import { IntlService, MessagePipe, IntlModule } from '@sinequa/core/intl';
import { NgIf, NgTemplateOutlet, NgForOf, NgClass, AsyncPipe, NgStyle, SlicePipe, NgSwitch, NgSwitchCase, CommonModule } from '@angular/common';
import { Action, BsActionButtons, BsActionMenu, BsActionModule } from '@sinequa/components/action';
import { Collapse, CollapseModule, enCollapse, frCollapse, deCollapse } from '@sinequa/components/collapse';
import { FormGroup, FormControl, NgControlStatusGroup, FormGroupDirective, DefaultValueAccessor, NgControlStatus, FormControlName, FormBuilder, ɵangular_packages_forms_forms_y, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Autofocus, ValuePipe, NumberPipe, ExprPipe, UIService, TooltipDirective, UtilsModule } from '@sinequa/components/utils';
import { ɵa, Ng5SliderModule } from 'ng5-slider';
import moment from 'moment';
import { AdvancedService } from '@sinequa/components/advanced';
import { enSelection, frSelection, deSelection } from '@sinequa/components/selection';

// Types of events triggering a change event
const FACET_CHANGE_EVENTS = [
    "Facet_Loaded" /* Loaded */,
    "Facet_Added" /* Add */,
    "Facet_Removed" /* Remove */
];
const ALL_FACETS = new InjectionToken('ALL_FACETS');
const DEFAULT_FACETS = new InjectionToken('DEFAULT_FACETS');
class FacetService {
    constructor(userSettingsService, searchService, suggestService, appService, intlService, formatService, exprBuilder, allFacets, defaultFacets) {
        this.userSettingsService = userSettingsService;
        this.searchService = searchService;
        this.suggestService = suggestService;
        this.appService = appService;
        this.intlService = intlService;
        this.formatService = formatService;
        this.exprBuilder = exprBuilder;
        this.allFacets = allFacets;
        this.defaultFacets = defaultFacets;
        this._events = new Subject();
        this._changes = new Subject();
        /**
         * Utility function to returns aggregation item's index in supplied array with fallback to `display` comparison.
         * Otherwise -1, indicating that no element passed the test.
         * @param arr The array findIndex() was called upon
         * @param value The value to be test
         */
        this.findAggregationItemIndex = (arr, item) => {
            let index = arr.findIndex(it => it.value === item.value);
            if (index === -1 && item.display) {
                // fallback to display comparison
                index = arr.findIndex(it => it.display === item.display);
            }
            return index;
        };
        this.trimAllWhitespace = (value) => {
            switch (typeof value) {
                case "string":
                    return value.replace(/\s/g, '');
                default:
                    return value;
            }
        };
        // Listen to the user settings
        this.userSettingsService.events.subscribe(event => {
            // E.g. new login occurs
            // ==> Menus need to be rebuilt
            this.events.next({ type: "Facet_Loaded" /* Loaded */ });
        });
        // Listen to own events, to trigger change events
        this._events.subscribe(event => {
            if (FACET_CHANGE_EVENTS.indexOf(event.type) !== -1) {
                this.changes.next(event);
            }
        });
    }
    // GETTERS
    /**
     * Returns the list of this user's facets.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of facets if it does not already exist.
     */
    get facets() {
        if (!this.userSettingsService.userSettings)
            this.userSettingsService.userSettings = {};
        if (!this.userSettingsService.userSettings["facets"]) {
            this.userSettingsService.userSettings["facets"] = [];
            if (!!this.defaultFacets) {
                this.userSettingsService.userSettings["facets"].push(...this.defaultFacets);
                this.patchFacets();
            }
        }
        return this.userSettingsService.userSettings["facets"];
    }
    /**
     * @returns a facet with the given name or undefined if it does not exist
     * @param name
     */
    facet(name) {
        const i = this.facetIndex(name);
        return i >= 0 ? this.facets[i] : undefined;
    }
    /**
     * Returns the list of facet config in the given container (position)
     * @param position (default to 0 if there is a single container)
     */
    getFacets(position = 0) {
        if (!this.allFacets) {
            return [];
        }
        return this.facets.filter(f => f.position === position)
            .map(f => this.allFacets.find(_f => _f.name === f.name));
    }
    /**
     * Returns true if this facet is opened (in any container)
     * @param facetName
     */
    isFacetOpened(facetName) {
        return !!this.facets.find(f => f.name === facetName);
    }
    facetIndex(name) {
        for (let i = 0, ic = this.facets.length; i < ic; i++) {
            const facet = this.facets[i];
            if (facet && facet.name === name) {
                return i;
            }
        }
        return -1;
    }
    /**
     * Triggers any events regarding the facets
     */
    get events() {
        return this._events;
    }
    /**
     * Triggers when events affect the list of facets
     * Cf. CHANGE_EVENTS list
     */
    get changes() {
        return this._changes;
    }
    addFacet(facet) {
        this.facets.push(facet);
        this.events.next({ type: "Facet_Added" /* Add */, facet: facet });
        this.patchFacets([{
                type: "Facet_Added" /* Add */,
                detail: {
                    facet: facet.name
                }
            }]);
    }
    removeFacet(facet) {
        const i = this.facetIndex(facet.name);
        if (i !== -1) {
            this.facets.splice(i, 1);
            this.events.next({ type: "Facet_Removed" /* Remove */, facet: facet });
            this.patchFacets([{
                    type: "Facet_Removed" /* Remove */,
                    detail: {
                        facet: facet.name
                    }
                }]);
        }
    }
    addAllFacet() {
        this.facets.splice(0, this.facets.length);
        if (!!this.defaultFacets)
            this.facets.push(...this.defaultFacets);
        this.events.next({ type: "Facets_Added" /* AddAll */ });
        this.patchFacets([{
                type: "Facets_Added" /* AddAll */
            }]);
    }
    removeAllFacet() {
        this.facets.splice(0, this.facets.length);
        this.events.next({ type: "Facets_Removed" /* RemoveAll */ });
        this.patchFacets([{
                type: "Facets_Removed" /* RemoveAll */
            }]);
    }
    /**
     * Updates facets in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    patchFacets(auditEvents) {
        return this.userSettingsService.patch({ facets: this.facets }, auditEvents)
            .subscribe(next => {
            this.events.next({ type: "Facet_Patched" /* Patched */ });
        }, error => {
            console.error("Could not patch Facets!", error);
        });
    }
    /**
     * Filter/Exclude an item in a facet and launch a search.
     * Triggers an internal event and an Audit Event
     * @param facetName
     * @param aggregation
     * @param items
     * @param options
     */
    addFilterSearch(facetName, aggregation, items, options = {}) {
        var _c;
        const success = this.addFilter(facetName, aggregation, items, options);
        if (success) {
            this.events.next({ type: "Facet_AddFilter" /* AddFilter */, facet: this.facet(facetName) });
            return this.searchService.search(undefined, {
                type: "Facet_AddFilter" /* AddFilter */,
                detail: {
                    item: this.searchService.query.lastSelect(),
                    itembox: facetName,
                    itemcolumn: aggregation.column,
                    isitemexclude: options.not,
                    "from-result-id": (_c = this.searchService.results) === null || _c === void 0 ? void 0 : _c.id
                }
            });
        }
        return Promise.resolve(false);
    }
    /**
     * Filter/Exclude one or more item(s) in a facet (without launching a search)
     * @param facetName
     * @param aggregation
     * @param items
     * @param options
     * @param query the query on which to add the filter (defaults to search service query)
     * @param breadcrumbs breadcrumbs in which to look for selected items (defaults  to search service breadcrumbs)
     */
    addFilter(facetName, aggregation, items, options = {}, query = this.searchService.query, breadcrumbs = this.searchService.breadcrumbs) {
        if (!items) {
            return false;
        }
        if (options.replaceCurrent) {
            query.removeSelect(facetName);
        }
        if (!aggregation.isTree && (breadcrumbs === null || breadcrumbs === void 0 ? void 0 : breadcrumbs.activeSelects.length) && !options.replaceCurrent) {
            const expr = breadcrumbs.findSelect(facetName);
            const index = breadcrumbs.activeSelects.findIndex(select => select.facet === facetName && (select.expr === expr || select.expr === (expr === null || expr === void 0 ? void 0 : expr.parent)));
            const same = (!Array.isArray(items)) ? true : (options.and ? "AND" : "OR") === ((expr === null || expr === void 0 ? void 0 : expr.and) ? "AND" : "OR") && (options.not ? "YES" : "NO") === ((expr === null || expr === void 0 ? void 0 : expr.not) ? "YES" : "NO");
            if (expr && same && index !== -1) {
                let _items;
                if (expr === null || expr === void 0 ? void 0 : expr.operands) {
                    _items = this.exprToAggregationItem(expr.operands, aggregation.valuesAreExpressions).concat(items);
                }
                else {
                    // previous selection is a single value
                    _items = this.exprToAggregationItem(expr, aggregation.valuesAreExpressions).concat(items);
                }
                // MUST reset $excluded property otherwise expression is misunderstood
                _items.forEach(item => item.$excluded = undefined);
                // overrides options settings with expression if any
                let _expr = this.exprBuilder.makeAggregationExpr(aggregation, _items, options.and || expr.and);
                if (options.not || expr.not) {
                    _expr = this.exprBuilder.makeNotExpr(_expr);
                }
                if (_expr) {
                    query.replaceSelect(index, { expression: _expr, facet: facetName });
                    return true;
                }
            }
        }
        let expr = this.exprBuilder.makeAggregationExpr(aggregation, items, options.and);
        if (options.not) {
            expr = this.exprBuilder.makeNotExpr(expr);
        }
        if (expr) {
            query.addSelect(expr, facetName);
            return true;
        }
        return false;
    }
    /**
     * Clears the query from the current selection on the given facet
     * @param facetName
     * @param all
     * @param query the query to clear from the facet selection (defaults to search service query)
     */
    clearFilters(facetName, all, query = this.searchService.query) {
        query.removeSelect(facetName, all);
    }
    /**
     * Clears the query from the current selection on the given facet and perform a search
     * @param facetName
     * @param all
     */
    clearFiltersSearch(facetName, all) {
        var _c;
        [].concat(facetName).forEach(name => {
            this.clearFilters(name, all);
            this._events.next({ type: "Facet_ClearFilters" /* ClearFilters */, facet: this.facet(name) });
        });
        return this.searchService.search(undefined, {
            type: "Facet_ClearFilters" /* ClearFilters */,
            detail: {
                itembox: facetName,
                "from-result-id": (_c = this.searchService.results) === null || _c === void 0 ? void 0 : _c.id
            }
        });
    }
    /**
     * Remove a filter and update the appropriate Select if it was previously included in a selection
     * @param facetName the facet that removes the filter
     * @param aggregation the aggregation that contains the item to remove
     * @param item the aggregation item to remove from the query
     * @param query the query on which to remove the filter (defaults to search service query)
     * @param breadcrumbs breadcrumbs in which to look for selected items (defaults  to search service breadcrumbs)
     */
    removeFilter(facetName, aggregation, item, query = this.searchService.query, breadcrumbs = this.searchService.breadcrumbs) {
        if (breadcrumbs) {
            // if item is excluded, makeAggregation() should returns a NOT expression
            const stringExpr = item.$excluded ? this.exprBuilder.makeNotExpr(this.exprBuilder.makeAggregationExpr(aggregation, item)) : this.exprBuilder.makeAggregationExpr(aggregation, item);
            const filterExpr = this.findItemFilter(facetName, aggregation, item, breadcrumbs) || this.appService.parseExpr(stringExpr);
            const expr = breadcrumbs.findSelect(facetName, filterExpr);
            const i = breadcrumbs.activeSelects.findIndex(select => select.facet === facetName && (select.expr === expr || select.expr === (expr === null || expr === void 0 ? void 0 : expr.parent)));
            // 'Select' can't be created when aggregation is a tree map, so, avoid aggregation tree
            // and remove whole breadcrumbs
            if (!aggregation.isTree && expr && expr.parent && expr.parent.operands.length > 1) {
                // create a new Expr from parent and replaces Select by this new one
                // so, breadcrumbs stay ordered
                const filterByValuesAreExpression = (it) => it.value.toString().replace(/ /g, "") !== item.value.toString().replace(/ /g, "");
                const filterByValue = (it) => it.value !== item.value;
                const filter = (aggregation.valuesAreExpressions) ? filterByValuesAreExpression : filterByValue;
                const items = this.exprToAggregationItem(expr.parent.operands, aggregation.valuesAreExpressions).filter(filter);
                // MUST reset $excluded property otherwise expression is misunderstood (mainly NOT expressions)
                items.forEach(item => item.$excluded = undefined);
                const { not, and } = breadcrumbs.selects[i].expr || {};
                let _expr = this.exprBuilder.makeAggregationExpr(aggregation, items, and);
                if (not) {
                    _expr = this.exprBuilder.makeNotExpr(_expr);
                }
                if (_expr) {
                    query.replaceSelect(i, { expression: _expr, facet: facetName });
                    return { expression: this.exprBuilder.makeAggregationExpr(aggregation, item), facet: facetName };
                }
            }
            else {
                // filter is a single value... remove it
                const select = query.select ? query.select[i] : undefined;
                query.removeSelect(i);
                return select;
            }
        }
        return undefined;
    }
    /**
     * Removes the aggregation from the search service query and refresh the search
     * @param facetName
     * @param aggregation
     * @param item
     */
    removeFilterSearch(facetName, aggregation, item) {
        const select = this.removeFilter(facetName, aggregation, item);
        if (select) {
            this._events.next({ type: "Facet_RemoveFilter" /* RemoveFilter */, facet: this.facet(facetName || "") });
            delete this.searchService.query.queryId; // SBA-154
            return this.searchService.search(undefined, {
                type: "Facet_RemoveFilter" /* RemoveFilter */,
                detail: {
                    item: { expression: select === null || select === void 0 ? void 0 : select.expression, facet: select === null || select === void 0 ? void 0 : select.facet },
                    itembox: facetName,
                    itemcolumn: aggregation.column,
                    "from-result-id": !!this.searchService.results ? this.searchService.results.id : null
                }
            });
        }
        return Promise.resolve(false);
    }
    /**
     * Queries the server for data for this aggregation
     * @param aggregation
     * @param skip
     * @param count
     * @param query the query to use to fetch the data (default to search service query)
     */
    loadData(aggregation, skip = 0, count = 10, query = this.searchService.query, searchInactive = true) {
        query = Utils.copy(query);
        query.action = "aggregate";
        query.aggregations = {};
        query.aggregations[aggregation] = { skip: skip, count: count };
        return this.searchService.getResults(query, undefined, { searchInactive }).pipe(map((results) => {
            const data = results.aggregations.find(a => Utils.eqNC(a.name, aggregation));
            if (data) {
                this.setColumn(data); // Useful for formatting and i18n
            }
            return data;
        }));
    }
    /**
     * Get suggestions given a text and a field name, using the Suggest service
     * @param text
     * @param field
     * @param suggestQuery
     */
    suggest(text, field, suggestQuery = this.appService.suggestQueries[0]) {
        return this.suggestService.get(suggestQuery, text, [field], this.searchService.query);
    }
    /**
     * Format the given result item, using field formatter and/or i18n service
     * @param item
     */
    formatValue(item) {
        return this.intlService.formatMessage(this.formatService.formatFieldValue(item, item.$column));
    }
    /**
     * Returns true if this facet has at least one active selection
     * filtering the search
     * @param facetName
     * @param breadcrumbs breadcrumbs in which to look for selected items (defaults to search service breadcrumbs)
     */
    hasFiltered(facetName, breadcrumbs = this.searchService.breadcrumbs) {
        return !!this.findFilter(facetName, breadcrumbs);
    }
    /**
     * Returns an active selection of this facet filtering the search
     * Returns it as an expression
     * @param facetName
     * @param breadcrumbs breadcrumbs in which to look for selected items (defaults to search service breadcrumbs)
     */
    findFilter(facetName, breadcrumbs = this.searchService.breadcrumbs) {
        return breadcrumbs === null || breadcrumbs === void 0 ? void 0 : breadcrumbs.findSelect(facetName);
    }
    /**
     * Look for an aggregation with the given name in the search results and returns it.
     * Takes care of initializing the aggregation items to insert their $column property.
     * @param aggregationName
     * @param results The search results can be provided explicitly or taken from the SearchService implicitly.
     */
    getAggregation(aggregationName, results = this.searchService.results, treeAggregationOptions) {
        if (results === null || results === void 0 ? void 0 : results.aggregations) {
            const aggregation = results.aggregations.find(agg => Utils.eqNC(agg.name, aggregationName));
            if (aggregation) {
                this.setColumn(aggregation); // Useful for formatting and i18n
                if (aggregation.isTree && treeAggregationOptions) {
                    const expr = this.findFilter(treeAggregationOptions.facetName);
                    const expandPaths = expr ? expr.getValues(aggregation.column) : [];
                    this.initTreeNodes(treeAggregationOptions.facetName, aggregation, "/", aggregation.items, expandPaths, treeAggregationOptions.levelCallback);
                    return aggregation;
                }
                return aggregation;
            }
        }
        return undefined;
    }
    /**
     * Look for a Tree aggregation with the given name in the search results and returns it.
     * Takes care of initializing the Node aggregation items to insert their properties ($column, $path, $opened, $level)
     * @deprecated use getAggregation() instead
     * @param facetName
     * @param aggregationName
     * @param results The search results can be provided explicitly or taken from the SearchService implicitly.
     * @param levelCallback A callback method called at every level of the tree.
     * Can be used to read or alter the properties of the nodes (opening, closing), or node list (sorting)
     */
    getTreeAggregation(facetName, aggregationName, results = this.searchService.results, levelCallback) {
        const agg = this.getAggregation(aggregationName, results);
        if (agg === null || agg === void 0 ? void 0 : agg.isTree) {
            const expr = this.findFilter(facetName);
            const expandPaths = expr ? expr.getValues(agg.column) : [];
            this.initTreeNodes(facetName, agg, "/", agg.items, expandPaths, levelCallback);
            return agg;
        }
        return undefined;
    }
    /**
     * Returns the count parameter of the given aggregation (default is 10)
     * @param aggregationName
     */
    getAggregationCount(aggregationName) {
        var _c;
        return ((_c = this.appService.getCCAggregation(aggregationName)) === null || _c === void 0 ? void 0 : _c.count) || 10;
    }
    /**
     * Opens a Tree node of the given tree facet by querying data from the server
     * Takes care of initializing the Node aggregation items to insert their properties ($column, $path, $opened, $level)
     * @param facetName
     * @param aggregation
     * @param item
     * @param levelCallback A callback method called at every level of the tree.
     * Can be used to read or alter the properties of the nodes (opening, closing), or node list (sorting)
     */
    open(facetName, aggregation, item, levelCallback, query = this.searchService.query, searchInactive = true) {
        const value = item.$path + "*";
        query = Query.copy(query);
        query.action = "open";
        const expr = this.exprBuilder.makeExpr(aggregation.column, value);
        query.addOpen(expr, aggregation.name);
        this.events.next({ type: "Facet_TreeOpen" /* Open */, facet: this.facet(facetName) });
        return this.searchService.getResults(query, undefined, { searchInactive }).pipe(map((results) => {
            if (item.$path) {
                const source = FacetService.getAggregationNode(results.aggregations[0].items, item.$path);
                const target = FacetService.getAggregationNode(aggregation.items, item.$path);
                if (source && target) {
                    target.items = source.items; // Insert the new data (source) into the original (target)
                }
                if (target && target.items) {
                    this.initTreeNodes(facetName, aggregation, item.$path, target.items, undefined, levelCallback);
                }
            }
            return results;
        }));
    }
    /**
     * Returns true if a given aggregation item is currently actively filtering the search
     * @param facetName
     * @param aggregation
     * @param item
     * @param breadcrumbs breadcrumbs in which to look for selected items (default to search service breadcrumbs)
     */
    itemFiltered(facetName, aggregation, item, breadcrumbs = this.searchService.breadcrumbs) {
        return !!this.findItemFilter(facetName, aggregation, item, breadcrumbs);
    }
    findItemFilter(facetName, aggregation, item, breadcrumbs) {
        let expr;
        let exprText;
        if (!aggregation.valuesAreExpressions) {
            let value;
            if (aggregation.isTree) {
                value = Utils.toSqlValue(item.$path + "*");
            }
            else {
                value = Utils.toSqlValue(item.value);
            }
            exprText = this.exprBuilder.makeExpr(aggregation.column, value);
        }
        else {
            exprText = item.value;
        }
        const ret = this.appService.parseExpr(exprText);
        if (ret instanceof Expr) {
            expr = ret;
        }
        if (expr) {
            const expr2 = breadcrumbs === null || breadcrumbs === void 0 ? void 0 : breadcrumbs.findSelect(facetName, expr);
            if (!!expr2 && (!expr2.parent || !expr2.parent.parent)) {
                return expr2;
            }
        }
        return undefined;
    }
    /**
     * Initializes the nodes of a tree (private, with a callback)
     * @param facetName
     * @param aggregation
     * @param root
     * @param children
     * @param expandPaths
     * @param levelCallback
     */
    initTreeNodes(facetName, aggregation, root, children, expandPaths, levelCallback) {
        if (!children) {
            return;
        }
        let rootLevel;
        if (root) {
            rootLevel = Utils.count(root, "/", false) - 1;
        }
        else {
            root = "/";
            rootLevel = 0;
        }
        const column = this.appService.getColumn(aggregation.column);
        Utils.traverse(children, (_nodes) => {
            if (!_nodes) {
                return false;
            }
            let path = root;
            let level = rootLevel;
            for (const _node of _nodes) {
                path = path + _node.value + "/";
                level++;
            }
            // console.log(path);
            const _node = _nodes[_nodes.length - 1];
            _node.$path = path;
            _node.$column = column;
            _node.$level = level;
            _node.$opened = false;
            _node.$filtered = this.itemFiltered(facetName, aggregation, _node);
            expandPaths === null || expandPaths === void 0 ? void 0 : expandPaths.forEach(expandPath => {
                if (expandPath.indexOf(path) === 0) {
                    const count = !!_node.items ? _node.items.length : _node.hasChildren ? -1 : 0;
                    if (count > 0) {
                        _node.$opened = true;
                    }
                }
            });
            if (levelCallback) {
                levelCallback(_nodes, level, _node);
            }
            return false; // don't stop
        });
    }
    setColumn(aggregation) {
        if (!aggregation.isTree && aggregation.items) {
            const column = this.appService.getColumn(aggregation.column);
            aggregation.items.forEach((value) => value.$column = column);
        }
    }
    // static methods
    static splitTreepath(path) {
        if (!path)
            return [];
        path = path.trim();
        if (path.length > 0 && path[0] === "/") {
            path = path.substr(1);
        }
        if (path.length > 0 && path[path.length - 1] === "/") {
            path = path.substr(0, path.length - 1);
        }
        if (path.length === 0) {
            return [];
        }
        return path.split("/");
    }
    static treepathLast(path) {
        const parts = FacetService.splitTreepath(path);
        if (!parts || parts.length === 0) {
            return "";
        }
        return parts[parts.length - 1];
    }
    static getAggregationNode(nodes, path) {
        if (!nodes || nodes.length === 0) {
            return undefined;
        }
        const names = FacetService.splitTreepath(path);
        let node;
        for (let _i = 0, _a = names; _i < _a.length; _i++) {
            if (!nodes || nodes.length === 0) {
                return undefined;
            }
            const name = _a[_i].toLocaleLowerCase();
            node = undefined;
            for (let _j = 0, _b = nodes; _j < _b.length; _j++) {
                const _node = _b[_j];
                if (_node.value.toLocaleLowerCase() === name) {
                    node = _node;
                    break;
                }
            }
            if (!node) {
                return undefined;
            }
            nodes = node.items;
        }
        return node;
    }
    /**
     * Convert an Expression object or an Expression Array to their AggregationItem equivalent
     *
     * @param expr Expression object or Expression Array
     * @param valuesAreExpressions when true values should be converted to string otherwise no
     *
     * @returns AggregationItem array with converted expression or an empty array
     */
    exprToAggregationItem(expr, valuesAreExpressions = false) {
        const fn = [
            (item) => {
                var _c, _d;
                let value = item.value;
                if (((_c = item.column) === null || _c === void 0 ? void 0 : _c.eType) === 1 /* bool */) {
                    value = Utils.isTrue(item.value);
                }
                return { count: 0, value, display: item.display, $column: item.column, $excluded: ((item === null || item === void 0 ? void 0 : item.not) || ((_d = item === null || item === void 0 ? void 0 : item.parent) === null || _d === void 0 ? void 0 : _d.not)) };
            },
            (item) => { var _c; return ({ count: 0, value: item.toString((item.value) ? true : false), display: item.display, $column: item.column, $excluded: ((item === null || item === void 0 ? void 0 : item.not) || ((_c = item === null || item === void 0 ? void 0 : item.parent) === null || _c === void 0 ? void 0 : _c.not)) }); }
        ];
        const callback = valuesAreExpressions ? fn[1] : fn[0];
        return [].concat(expr).map(callback);
    }
    /**
     * Get all Breadcrumbs items from a specific facet
     *
     * @param facetName facet name where to extract all breadcrumbs
     * @param breadcrumbs breadcrumbs in which to look for selected items
     */
    getBreadcrumbsItems(facetName, breadcrumbs) {
        return (breadcrumbs === null || breadcrumbs === void 0 ? void 0 : breadcrumbs.items.filter(item => item.facet === facetName)) || [];
    }
    /**
     * Get all Aggregation items from a facet, currently filtered
     *
     * @param facetName facet name where to inspect
     * @param valuesAreExpressions when true, some transformations should be done
     * @param breadcrumbs breadcrumbs in which to look for selected items (default to search service breadcrumbs)
     */
    getAggregationItemsFiltered(facetName, valuesAreExpressions = false, breadcrumbs = this.searchService.breadcrumbs) {
        var _c, _d;
        const items = this.getBreadcrumbsItems(facetName, breadcrumbs);
        // aggregation items are constructed from nested expressions
        const expr = [];
        for (const item of items) {
            const value = (((_c = item.expr) === null || _c === void 0 ? void 0 : _c.display) === undefined) ? ((_d = item.expr) === null || _d === void 0 ? void 0 : _d.operands) || item.expr : item.expr;
            if (value) {
                expr.push(value);
            }
        }
        // faltten results
        const flattenExpr = [].concat.apply([], expr);
        return this.exprToAggregationItem(flattenExpr, valuesAreExpressions);
    }
    /**
     * Convert Suggestion to AggregationItem
     * @param suggest a Suggestion object
     *
     * @returns AggregationItem object with is `$column` property defined.
     * On boolean type, convert `value` property to boolean
     */
    suggestionToAggregationItem(suggest) {
        var _c;
        const item = {
            value: suggest.normalized || suggest.display,
            display: suggest.display,
            count: +(suggest.frequency || 0),
            $column: this.appService.getColumn(suggest.category)
        };
        if (((_c = item.$column) === null || _c === void 0 ? void 0 : _c.eType) === 1 /* bool */) {
            item.value = Utils.isTrue(item.value);
        }
        return item;
    }
    /**
     * Converts a list of suggestions into a structure of TreeAggregationNodes
     * @param suggests Suggestions to convert
     * @param searchTerm The searched term in the suggestions
     * @param aggregation The tree aggregations
     */
    suggestionsToTreeAggregationNodes(suggests, searchTerm, aggregation) {
        const suggestions = [];
        if (suggests.length > 0) {
            const path2node = new Map();
            const searchPattern = new RegExp(`\\b${searchTerm}`, 'i');
            const column = this.appService.getColumn(aggregation === null || aggregation === void 0 ? void 0 : aggregation.column);
            suggests.forEach(suggest => {
                if (suggest.display.length > 1) {
                    const match = searchPattern.exec(suggest.display);
                    this.addNode(suggestions, path2node, "/", suggest.display, +(suggest.frequency || 0), 1, ((match === null || match === void 0 ? void 0 : match.index) || 0) + searchTerm.length, column);
                }
            });
        }
        return suggestions;
    }
    /**
     * Utility recursive function to generate a tree aggregation structure from
     * a list of suggestions
     */
    addNode(items, path2node, parentPath, path, count, level, matchend, column) {
        const nextChild = path.indexOf("/", parentPath.length); // path = /Cities/Paris/17e/   parentPath = /Cities/
        const currentPath = path.substring(0, nextChild + 1); // => currentPath = /Cities/Paris/
        let node = path2node.get(currentPath);
        if (!node) {
            const value = path.substring(parentPath.length, nextChild);
            node = {
                value,
                count,
                items: [],
                hasChildren: false,
                $column: column,
                $level: level,
                $opened: matchend >= currentPath.length,
                $path: currentPath
            };
            path2node.set(currentPath, node);
            items.push(node);
        }
        if (currentPath.length < path.length) {
            node.hasChildren = true;
            this.addNode(node.items, path2node, currentPath, path, count, level + 1, matchend, column);
        }
    }
    /**
     * Check if a facet contains items
     * @param aggregation aggregation name
     * @param results search results
     *
     * @returns true if the facet contains a least one item otherwise false
     */
    hasData(aggregation, results) {
        var _c, _d;
        // Avoid calling getAggregation() which is costly
        return !!((_d = (_c = results.aggregations.find(agg => Utils.eqNC(agg.name, aggregation))) === null || _c === void 0 ? void 0 : _c.items) === null || _d === void 0 ? void 0 : _d.length);
    }
    /**
     * Returns the index of the first element in the supplied array
     * corresponding to `item.value` or -1 when not found.
     * A fallback to `item.display` is done before returning -1
     * @param item item to find
     */
    filteredIndex(data, arr, item) {
        let indx = -1;
        // specific to Values Are Expressions where expression are not well formatted by Expression Parser
        // eg: when values is : "> 0", Expression Parser returns : ">0" without space between operator and value
        if (data === null || data === void 0 ? void 0 : data.valuesAreExpressions) {
            const value = this.trimAllWhitespace(item.value);
            const normalizedArr = arr.map(item => (Object.assign(Object.assign({}, item), { value: this.trimAllWhitespace(item.value) }))) || [];
            indx = normalizedArr.findIndex(it => it.value === value);
        }
        else {
            indx = this.findAggregationItemIndex(arr, item);
        }
        return indx;
    }
}
FacetService.ɵfac = function FacetService_Factory(t) { return new (t || FacetService)(ɵɵinject(UserSettingsWebService), ɵɵinject(SearchService), ɵɵinject(SuggestService), ɵɵinject(AppService), ɵɵinject(IntlService), ɵɵinject(FormatService), ɵɵinject(ExprBuilder), ɵɵinject(ALL_FACETS, 8), ɵɵinject(DEFAULT_FACETS, 8)); };
FacetService.ɵprov = ɵɵdefineInjectable({ token: FacetService, factory: FacetService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(FacetService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: UserSettingsWebService }, { type: SearchService }, { type: SuggestService }, { type: AppService }, { type: IntlService }, { type: FormatService }, { type: ExprBuilder }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [ALL_FACETS]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [DEFAULT_FACETS]
            }] }]; }, null); })();

const _c0 = ["settingsTpl"];
const _c1 = ["headerTpl"];
const _c2 = ["subHeaderTpl"];
const _c3 = ["footerTpl"];
/**
 * This interface should be implemented by facet components, which expose
 * a list of actions and event listeners
 */
class AbstractFacet {
    constructor() {
        /**
         * Event emitter triggered when the list of action changes
         */
        this.actionsChanged = new EventEmitter();
    }
    /**
     * List of custom actions of this facet
     */
    get actions() { return []; }
    /**
     * Method called when a facet is collapsed
     */
    onCollapse(collapsed) { }
    /**
     * Method called when a facet is resized via an action (not accounting for window resizing)
     */
    onExpand(expanded) { }
    /**
     * Method called when the settings of this facet are opened
     */
    onOpenSettings(settingsOpened) { }
    /**
     * Method enabling the facet component to be hidden (if, for example there is no data to display)
     */
    isHidden() {
        return false;
    }
}
AbstractFacet.ɵfac = function AbstractFacet_Factory(t) { return new (t || AbstractFacet)(); };
AbstractFacet.ɵcmp = ɵɵdefineComponent({ type: AbstractFacet, selectors: [["ng-component"]], viewQuery: function AbstractFacet_Query(rf, ctx) { if (rf & 1) {
        ɵɵstaticViewQuery(_c0, true, TemplateRef);
        ɵɵstaticViewQuery(_c1, true, TemplateRef);
        ɵɵstaticViewQuery(_c2, true, TemplateRef);
        ɵɵstaticViewQuery(_c3, true, TemplateRef);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.settingsTpl = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerTpl = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.subHeaderTpl = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerTpl = _t.first);
    } }, outputs: { actionsChanged: "actionsChanged" }, decls: 0, vars: 0, template: function AbstractFacet_Template(rf, ctx) { }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AbstractFacet, [{
        type: Component,
        args: [{
                template: ""
            }]
    }], null, { actionsChanged: [{
            type: Output
        }], settingsTpl: [{
            type: ViewChild,
            args: ["settingsTpl", { static: true, read: TemplateRef }]
        }], headerTpl: [{
            type: ViewChild,
            args: ["headerTpl", { static: true, read: TemplateRef }]
        }], subHeaderTpl: [{
            type: ViewChild,
            args: ["subHeaderTpl", { static: true, read: TemplateRef }]
        }], footerTpl: [{
            type: ViewChild,
            args: ["footerTpl", { static: true, read: TemplateRef }]
        }] }); })();

const _c0$1 = ["facet"];
function BsFacetCard_div_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "div", 10);
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMapInterpolate1("card-icon ", ctx_r0.icon, " mr-2");
} }
function BsFacetCard_div_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 11);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, ctx_r1.title));
} }
function BsFacetCard_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0, 12);
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.facetComponent.headerTpl);
} }
function BsFacetCard_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0, 12);
} if (rf & 2) {
    const ctx_r3 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r3.facetComponent.subHeaderTpl);
} }
function BsFacetCard_sq_collapse_10_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵprojection(0);
} }
function BsFacetCard_sq_collapse_10_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "sq-collapse", 13);
    ɵɵtemplate(1, BsFacetCard_sq_collapse_10_ng_template_1_Template, 1, 0, "ng-template");
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = ɵɵnextContext();
    ɵɵproperty("collapsed", ctx_r4._collapsed);
} }
function BsFacetCard_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0, 12);
} if (rf & 2) {
    const ctx_r5 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r5.facetComponent.settingsTpl);
} }
function BsFacetCard_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0, 14);
} if (rf & 2) {
    const ctx_r6 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r6.facetComponent.footerTpl);
} }
const _c1$1 = function (a0, a1, a2) { return { items: a0, style: a1, size: a2, rightAligned: true }; };
const _c2$1 = ["*"];
class BsFacetCard {
    constructor(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        /**
         * List of custom actions for this facet (optional)
         */
        this.actions = [];
        /**
         * Whether the [actions]="..." passed by binding should be displayed before or after
         * the actions from the inner facet component
         */
        this.actionsFirst = true;
        /**
         * Size of the custom actions
         */
        this.actionsSize = "sm";
        /**
         * Whether the facet can be collapsed (default: true)
         */
        this.collapsible = true;
        /**
         * Whether the facet starts collapsed (if collapsible / default: false)
         */
        this.startCollapsed = false;
        /**
         * Whether other actions should be hidden when the facet is collapsed (default: true)
         */
        this.hideActionsCollapsed = true;
        /**
         * Whether the facet can be expanded (default: false)
         */
        this.expandable = false;
        /**
         * Whether the facet starts expanded (if expandable / default: false)
         */
        this.startExpanded = false;
        /**
         * Whether the facet starts with opened settings (default: false)
         */
        this.startSettingsOpened = false;
        /**
         * Event triggered when the facet gets expanded or reduced
         */
        this.facetExpanded = new EventEmitter();
        /**
         * Event triggered when the facet gets expanded or reduced
         */
        this.facetCollapsed = new EventEmitter();
        /**
         * Event triggered when the facet gets expanded or reduced
         */
        this.settingsOpened = new EventEmitter();
        this.collapseAction = new Action({
            action: (action) => {
                this._collapsed = !this._collapsed;
                this.facetCollapsed.next(this._collapsed ? "collapsed" : "expanded");
                if (!!this.facetComponent) {
                    this.facetComponent.onCollapse(this._collapsed);
                }
                action.update();
            },
            updater: (action) => {
                action.icon = this._collapsed ? "fas fa-chevron-down" : "fas fa-chevron-up";
                action.title = this._collapsed ? 'msg#facetCard.expand' : 'msg#facetCard.collapse';
            }
        });
        this.expandAction = new Action({
            action: (action) => {
                this._expanded = !this._expanded;
                this.facetExpanded.next(this._expanded ? "expanded" : "reduced");
                if (!!this.facetComponent) {
                    this.facetComponent.onExpand(this._expanded);
                }
                action.update();
            },
            updater: (action) => {
                action.icon = this._expanded ? "fas fa-compress" : "fas fa-expand";
                action.title = this._expanded ? "msg#facetCard.reduce" : "msg#facetCard.enlarge";
            }
        });
        this.settingsAction = new Action({
            action: (action) => {
                this._settingsOpened = !this._settingsOpened;
                this.settingsOpened.next(this._settingsOpened ? "opened" : "saved");
                if (!!this.facetComponent) {
                    this.facetComponent.onOpenSettings(this._settingsOpened);
                }
                action.update();
            },
            updater: (action) => {
                action.icon = this._settingsOpened ? "far fa-save" : "fas fa-cog";
                action.title = this._settingsOpened ? "msg#facetCard.saveSettings" : "msg#facetCard.openSettings";
            }
        });
    }
    get hidden() {
        return !!this.facetComponent && !!this.facetComponent.isHidden && this.facetComponent.isHidden();
    }
    ngOnInit() {
        // Initialize actions
        this._collapsed = this.startCollapsed;
        this._expanded = this.startExpanded;
        this._settingsOpened = this.startSettingsOpened;
        this.collapseAction.update();
        this.expandAction.update();
        this.settingsAction.update();
    }
    ngAfterContentInit() {
        if (this.facetComponent) {
            this.actionChangedSubscription = this.facetComponent.actionsChanged.subscribe((actions) => {
                this.allActions.forEach(action => action.update());
                this.changeDetectorRef.markForCheck();
            });
        }
        else {
            console.warn("No #facet component is defined in this facet card: ", this.title);
        }
    }
    ngOnDestroy() {
        if (this.actionChangedSubscription) {
            this.actionChangedSubscription.unsubscribe();
        }
    }
    get allActions() {
        if (this.hideActionsCollapsed && this._collapsed)
            return [this.collapseAction]; // Hide other actions if collapsed
        let actions = [];
        if (this.actionsFirst) {
            actions.push(...this.actions);
        }
        if (this.facetComponent)
            actions = actions.concat(this.facetComponent.actions);
        if (this.hasSettings)
            actions.push(this.settingsAction);
        if (this.expandable)
            actions.push(this.expandAction);
        if (this.collapsible)
            actions.push(this.collapseAction);
        if (!this.actionsFirst) {
            actions.push(...this.actions);
        }
        return actions;
    }
    get hasSettings() {
        return !!this.facetComponent && !!this.facetComponent.settingsTpl;
    }
}
BsFacetCard.ɵfac = function BsFacetCard_Factory(t) { return new (t || BsFacetCard)(ɵɵdirectiveInject(ChangeDetectorRef)); };
BsFacetCard.ɵcmp = ɵɵdefineComponent({ type: BsFacetCard, selectors: [["sq-facet-card"]], contentQueries: function BsFacetCard_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0$1, true);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.facetComponent = _t.first);
    } }, hostVars: 7, hostBindings: function BsFacetCard_HostBindings(rf, ctx) { if (rf & 2) {
        ɵɵhostProperty("hidden", ctx.hidden);
        ɵɵclassProp("collapsed", ctx._collapsed)("expanded", ctx._expanded)("settings-opened", ctx._settingsOpened);
    } }, inputs: { title: "title", tooltip: "tooltip", icon: "icon", buttonsStyle: "buttonsStyle", actions: "actions", actionsFirst: "actionsFirst", actionsSize: "actionsSize", collapsible: "collapsible", startCollapsed: "startCollapsed", hideActionsCollapsed: "hideActionsCollapsed", expandable: "expandable", startExpanded: "startExpanded", startSettingsOpened: "startSettingsOpened" }, outputs: { facetExpanded: "facetExpanded", facetCollapsed: "facetCollapsed", settingsOpened: "settingsOpened" }, ngContentSelectors: _c2$1, decls: 13, vars: 15, consts: [[1, "card"], [1, "card-header", "cursor-default", "pl-3", "pr-2", "py-1"], [1, "d-flex"], [1, "d-flex", "align-items-center", "text-truncate", "mr-auto", 3, "title"], ["aria-hidden", "true", 3, "class", 4, "ngIf"], ["class", "card-title text-truncate mb-0 py-1 mr-auto", 4, "ngIf"], [3, "ngTemplateOutlet", 4, "ngIf"], [1, "btn-group", 3, "sq-action-buttons"], [3, "collapsed", 4, "ngIf"], ["class", "card-footer", 3, "ngTemplateOutlet", 4, "ngIf"], ["aria-hidden", "true"], [1, "card-title", "text-truncate", "mb-0", "py-1", "mr-auto"], [3, "ngTemplateOutlet"], [3, "collapsed"], [1, "card-footer", 3, "ngTemplateOutlet"]], template: function BsFacetCard_Template(rf, ctx) { if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "div", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelementStart(3, "div", 3);
        ɵɵpipe(4, "sqMessage");
        ɵɵtemplate(5, BsFacetCard_div_5_Template, 1, 3, "div", 4);
        ɵɵtemplate(6, BsFacetCard_div_6_Template, 3, 3, "div", 5);
        ɵɵelementEnd();
        ɵɵtemplate(7, BsFacetCard_ng_container_7_Template, 1, 1, "ng-container", 6);
        ɵɵelement(8, "div", 7);
        ɵɵelementEnd();
        ɵɵtemplate(9, BsFacetCard_ng_container_9_Template, 1, 1, "ng-container", 6);
        ɵɵelementEnd();
        ɵɵtemplate(10, BsFacetCard_sq_collapse_10_Template, 2, 1, "sq-collapse", 8);
        ɵɵtemplate(11, BsFacetCard_ng_container_11_Template, 1, 1, "ng-container", 6);
        ɵɵtemplate(12, BsFacetCard_ng_container_12_Template, 1, 1, "ng-container", 9);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(3);
        ɵɵproperty("title", ɵɵpipeBind1(4, 9, ctx.tooltip || ctx.title));
        ɵɵadvance(2);
        ɵɵproperty("ngIf", !!ctx.icon);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.title);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.facetComponent && ctx.facetComponent.headerTpl);
        ɵɵadvance(1);
        ɵɵproperty("sq-action-buttons", ɵɵpureFunction3(11, _c1$1, ctx.allActions, ctx.buttonsStyle, ctx.actionsSize));
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.facetComponent && ctx.facetComponent.subHeaderTpl);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", !ctx._settingsOpened);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.hasSettings && ctx._settingsOpened);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.facetComponent && ctx.facetComponent.footerTpl);
    } }, directives: [NgIf, BsActionButtons, NgTemplateOutlet, Collapse], pipes: [MessagePipe], styles: [".cursor-default[_ngcontent-%COMP%] {cursor: default;}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsFacetCard, [{
        type: Component,
        args: [{
                selector: "sq-facet-card",
                templateUrl: "./facet-card.html",
                styles: [`
        .cursor-default {cursor: default;}
    `]
            }]
    }], function () { return [{ type: ChangeDetectorRef }]; }, { title: [{
            type: Input
        }], tooltip: [{
            type: Input
        }], icon: [{
            type: Input
        }], buttonsStyle: [{
            type: Input
        }], actions: [{
            type: Input
        }], actionsFirst: [{
            type: Input
        }], actionsSize: [{
            type: Input
        }], collapsible: [{
            type: Input
        }], startCollapsed: [{
            type: Input
        }], hideActionsCollapsed: [{
            type: Input
        }], expandable: [{
            type: Input
        }], startExpanded: [{
            type: Input
        }], startSettingsOpened: [{
            type: Input
        }], facetExpanded: [{
            type: Output
        }], facetCollapsed: [{
            type: Output
        }], settingsOpened: [{
            type: Output
        }], facetComponent: [{
            type: ContentChild,
            args: ["facet", { static: false }]
        }], _collapsed: [{
            type: HostBinding,
            args: ['class.collapsed']
        }], _expanded: [{
            type: HostBinding,
            args: ['class.expanded']
        }], _settingsOpened: [{
            type: HostBinding,
            args: ['class.settings-opened']
        }], hidden: [{
            type: HostBinding,
            args: ['hidden']
        }] }); })();

const _c0$2 = function (a0) { return { items: a0, size: "sm" }; };
function BsFacetList_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 9);
    ɵɵelement(1, "div", 10);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("sq-action-buttons", ɵɵpureFunction1(1, _c0$2, ctx_r1.actions));
} }
function BsFacetList_div_0_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 11);
    ɵɵelementStart(1, "div", 12);
    ɵɵelement(2, "input", 13);
    ɵɵpipe(3, "sqMessage");
    ɵɵelementEnd();
    ɵɵelement(4, "sq-loading-bar", 14);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("formGroup", ctx_r2.myGroup);
    ɵɵadvance(2);
    ɵɵproperty("placeholder", ɵɵpipeBind1(3, 3, "msg#facet.searchPlaceholder"));
    ɵɵadvance(2);
    ɵɵproperty("active", ctx_r2.searchActive);
} }
function BsFacetList_div_0_div_3_span_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 21);
    ɵɵtext(1);
    ɵɵpipe(2, "sqNumber");
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, item_r8.count));
} }
const _c1$2 = function (a0, a1) { return { "list-group-item-success": a0, "list-group-item-secondary": a1 }; };
function BsFacetList_div_0_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r12 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 15);
    ɵɵlistener("click", function BsFacetList_div_0_div_3_Template_div_click_0_listener($event) { ɵɵrestoreView(_r12); const item_r8 = ctx.$implicit; const ctx_r11 = ɵɵnextContext(2); return ctx_r11.filterItem(item_r8, $event); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelementStart(2, "a", 16);
    ɵɵtext(3);
    ɵɵpipe(4, "sqValue");
    ɵɵelementEnd();
    ɵɵtemplate(5, BsFacetList_div_0_div_3_span_5_Template, 3, 3, "span", 17);
    ɵɵelementStart(6, "span", 18);
    ɵɵelement(7, "i", 19);
    ɵɵelement(8, "i", 20);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const ctx_r3 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpureFunction2(9, _c1$2, !item_r8.$excluded, item_r8.$excluded))("title", ɵɵpipeBind1(1, 4, "msg#facet.selectedValue"));
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind2(4, 6, item_r8, item_r8.$column));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r3.showCount && item_r8.count);
} }
function BsFacetList_div_0_div_4_span_7_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 21);
    ɵɵtext(1);
    ɵɵpipe(2, "sqNumber");
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r13 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, item_r13.count));
} }
const _c2$2 = function (a0) { return { "terme": a0 }; };
function BsFacetList_div_0_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r17 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 22);
    ɵɵlistener("click", function BsFacetList_div_0_div_4_Template_div_click_0_listener($event) { ɵɵrestoreView(_r17); const item_r13 = ctx.$implicit; const ctx_r16 = ɵɵnextContext(2); return ctx_r16.selectItem(item_r13, $event); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelementStart(2, "a", 23);
    ɵɵlistener("click", function BsFacetList_div_0_div_4_Template_a_click_2_listener($event) { ɵɵrestoreView(_r17); const item_r13 = ctx.$implicit; const ctx_r18 = ɵɵnextContext(2); return ctx_r18.filterItem(item_r13, $event); });
    ɵɵpipe(3, "sqMessage");
    ɵɵpipe(4, "sqValue");
    ɵɵtext(5);
    ɵɵpipe(6, "sqValue");
    ɵɵelementEnd();
    ɵɵtemplate(7, BsFacetList_div_0_div_4_span_7_Template, 3, 3, "span", 17);
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r13 = ctx.$implicit;
    const ctx_r4 = ɵɵnextContext(2);
    ɵɵproperty("title", ɵɵpipeBind1(1, 4, "msg#facet.itemUnselect"));
    ɵɵadvance(2);
    ɵɵproperty("title", ɵɵpipeBind2(3, 6, "msg#facet.filterItem", ɵɵpureFunction1(15, _c2$2, ɵɵpipeBind2(4, 9, item_r13, item_r13.$column))));
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind2(6, 12, item_r13, item_r13.$column));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r4.showCount && item_r13.count);
} }
function BsFacetList_div_0_div_5_span_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 27);
    ɵɵtext(1);
    ɵɵpipe(2, "sqNumber");
    ɵɵelementEnd();
} if (rf & 2) {
    const suggest_r19 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, suggest_r19.count));
} }
const _c3$1 = function (a0) { return { "list-group-item-primary": a0 }; };
function BsFacetList_div_0_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r23 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 24);
    ɵɵlistener("click", function BsFacetList_div_0_div_5_Template_div_click_0_listener($event) { ɵɵrestoreView(_r23); const suggest_r19 = ctx.$implicit; const ctx_r22 = ɵɵnextContext(2); return ctx_r22.selectItem(suggest_r19, $event); });
    ɵɵelementStart(1, "a", 25);
    ɵɵlistener("click", function BsFacetList_div_0_div_5_Template_a_click_1_listener($event) { ɵɵrestoreView(_r23); const suggest_r19 = ctx.$implicit; const ctx_r24 = ɵɵnextContext(2); return ctx_r24.filterItem(suggest_r19, $event); });
    ɵɵpipe(2, "sqMessage");
    ɵɵpipe(3, "sqValue");
    ɵɵtext(4);
    ɵɵpipe(5, "sqValue");
    ɵɵelementEnd();
    ɵɵtemplate(6, BsFacetList_div_0_div_5_span_6_Template, 3, 3, "span", 26);
    ɵɵelementEnd();
} if (rf & 2) {
    const suggest_r19 = ctx.$implicit;
    const ctx_r5 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpureFunction1(13, _c3$1, ctx_r5.isSelected(suggest_r19)));
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("title", ɵɵpipeBind2(2, 4, "msg#facet.filterItem", ɵɵpureFunction1(15, _c2$2, ɵɵpipeBind2(3, 7, suggest_r19, suggest_r19.$column))));
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind2(5, 10, suggest_r19, suggest_r19.$column));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r5.showCount && suggest_r19.count);
} }
function BsFacetList_div_0_span_7_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 28);
    ɵɵelementStart(1, "i");
    ɵɵtext(2);
    ɵɵpipe(3, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(3, 1, "msg#facet.searchNoResult"));
} }
function BsFacetList_div_0_div_8_div_1_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "div", 36);
} if (rf & 2) {
    const item_r27 = ɵɵnextContext().$implicit;
    const ctx_r28 = ɵɵnextContext(3);
    ɵɵstyleProp("--count", ctx_r28.getPercent(item_r27.count));
} }
function BsFacetList_div_0_div_8_div_1_span_9_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 27);
    ɵɵtext(1);
    ɵɵpipe(2, "sqNumber");
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r27 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, item_r27.count));
} }
function BsFacetList_div_0_div_8_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r33 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 32);
    ɵɵlistener("click", function BsFacetList_div_0_div_8_div_1_Template_div_click_0_listener($event) { ɵɵrestoreView(_r33); const item_r27 = ctx.$implicit; const ctx_r32 = ɵɵnextContext(3); return ctx_r32.selectItem(item_r27, $event); });
    ɵɵpipe(1, "sqMessage");
    ɵɵtemplate(2, BsFacetList_div_0_div_8_div_1_div_2_Template, 1, 2, "div", 33);
    ɵɵelementStart(3, "div", 34);
    ɵɵelementStart(4, "a", 35);
    ɵɵlistener("click", function BsFacetList_div_0_div_8_div_1_Template_a_click_4_listener($event) { ɵɵrestoreView(_r33); const item_r27 = ctx.$implicit; const ctx_r34 = ɵɵnextContext(3); return ctx_r34.filterItem(item_r27, $event); });
    ɵɵpipe(5, "sqMessage");
    ɵɵpipe(6, "sqValue");
    ɵɵtext(7);
    ɵɵpipe(8, "sqValue");
    ɵɵelementEnd();
    ɵɵtemplate(9, BsFacetList_div_0_div_8_div_1_span_9_Template, 3, 3, "span", 26);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r27 = ctx.$implicit;
    const ctx_r25 = ɵɵnextContext(3);
    ɵɵproperty("ngClass", ɵɵpureFunction1(17, _c3$1, ctx_r25.isSelected(item_r27)))("title", ɵɵpipeBind1(1, 6, ctx_r25.isSelected(item_r27) ? "msg#facet.itemUnselect" : "msg#facet.itemSelect"));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r25.showProgressBar && ctx_r25.resultsLength > 1);
    ɵɵadvance(2);
    ɵɵproperty("title", ɵɵpipeBind2(5, 8, "msg#facet.filterItem", ɵɵpureFunction1(19, _c2$2, ɵɵpipeBind2(6, 11, item_r27, item_r27.$column))));
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind2(8, 14, item_r27, item_r27.$column));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r25.showCount && item_r27.count);
} }
function BsFacetList_div_0_div_8_a_3_span_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span", 40);
} }
function BsFacetList_div_0_div_8_a_3_small_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "small");
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, "msg#facet.loadMore"));
} }
function BsFacetList_div_0_div_8_a_3_Template(rf, ctx) { if (rf & 1) {
    const _r38 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 37);
    ɵɵlistener("click", function BsFacetList_div_0_div_8_a_3_Template_a_click_0_listener($event) { ɵɵrestoreView(_r38); const ctx_r37 = ɵɵnextContext(3); return ctx_r37.loadMore($event); });
    ɵɵtemplate(1, BsFacetList_div_0_div_8_a_3_span_1_Template, 1, 0, "span", 38);
    ɵɵtemplate(2, BsFacetList_div_0_div_8_a_3_small_2_Template, 3, 3, "small", 39);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r26 = ɵɵnextContext(3);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r26.loadingMore);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r26.loadingMore);
} }
function BsFacetList_div_0_div_8_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 29);
    ɵɵtemplate(1, BsFacetList_div_0_div_8_div_1_Template, 10, 21, "div", 30);
    ɵɵpipe(2, "async");
    ɵɵtemplate(3, BsFacetList_div_0_div_8_a_3_Template, 3, 2, "a", 31);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ɵɵpipeBind1(2, 2, ctx_r7.items$));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r7.hasMore);
} }
function BsFacetList_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 1);
    ɵɵtemplate(1, BsFacetList_div_0_div_1_Template, 2, 3, "div", 2);
    ɵɵtemplate(2, BsFacetList_div_0_div_2_Template, 5, 5, "div", 3);
    ɵɵtemplate(3, BsFacetList_div_0_div_3_Template, 9, 12, "div", 4);
    ɵɵtemplate(4, BsFacetList_div_0_div_4_Template, 8, 17, "div", 5);
    ɵɵtemplate(5, BsFacetList_div_0_div_5_Template, 7, 17, "div", 6);
    ɵɵpipe(6, "async");
    ɵɵtemplate(7, BsFacetList_div_0_span_7_Template, 4, 3, "span", 7);
    ɵɵtemplate(8, BsFacetList_div_0_div_8_Template, 4, 4, "div", 8);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.displayActions && ctx_r0.actions);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.searchItems.selected);
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r0.filtered);
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r0.hiddenSelected);
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ɵɵpipeBind1(6, 7, ctx_r0.suggestions$));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r0.noResults);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r0.hasSuggestions());
} }
class BsFacetList extends AbstractFacet {
    constructor(facetService, changeDetectorRef) {
        super();
        this.facetService = facetService;
        this.changeDetectorRef = changeDetectorRef;
        this.showCount = true; // Show the number of occurrences
        this.searchable = true; // Allow to search for items in the facet
        this.allowExclude = true; // Allow to exclude selected items
        this.allowOr = true; // Allow to search various items in OR mode
        this.allowAnd = true; // Allow to search various items in AND mode
        this.displayEmptyDistributionIntervals = false; // If the aggregration is a distribution, then this property controls whether empty distribution intervals will be displayed
        this.displayActions = false;
        this.showProgressBar = false; // Allow to display item count as progress bar
        // Aggregation from the Results object
        this.data$ = new BehaviorSubject(undefined);
        this.items$ = new BehaviorSubject([]);
        this.data = () => this.data$.getValue();
        this.subscriptions = [];
        this.filtering = false;
        this.suggestDelay = 200;
        this.noResults = false;
        this.searchActive = false;
        this.suggestions$ = new BehaviorSubject([]);
        /** List of selected items */
        this.selected = [];
        /** Selected items that are not visible in the current aggregation (or suggestions in search mode) */
        this.hiddenSelected = [];
        /** List of excluded/filtered items */
        this.filtered = [];
        // Loading more data
        this.skip = 0;
        /** num of items currently displayed in the facet */
        this.count = 0;
        /** Does facet has more items to display ? */
        this.loadingMore = false;
        /**
         * Called on NgModel change (searchQuery)
         * Uses the suggestfield API to retrieve suggestions from the server
         * The suggestions "override" the data from the distribution (until search results are cleared)
         */
        this.suggest$ = (text$) => text$.pipe(debounceTime(this.suggestDelay), distinctUntilChanged(), switchMap(term => {
            var _a;
            if (term.trim() === "") {
                this.noResults = false;
                return of([]);
            }
            this.searchActive = true;
            this.changeDetectorRef.markForCheck();
            return this.facetService.suggest(term, ((_a = this.data()) === null || _a === void 0 ? void 0 : _a.column) || '').pipe(catchError(err => {
                console.log(err);
                this.noResults = false;
                return of([]);
            }), map(items => {
                const suggestions = items.slice(0, this.count)
                    .map(item => this.facetService.suggestionToAggregationItem(item))
                    .filter(item => !this.isFiltered(this.data(), item));
                this.noResults = suggestions.length === 0 && term.trim() !== "";
                return suggestions;
            }));
        }));
        this.myGroup = new FormGroup({
            searchQuery: new FormControl()
        });
        this.searchQuery = this.myGroup.get("searchQuery");
        this.subscriptions["suggest"] = this.suggest$(this.searchQuery.valueChanges)
            .subscribe(values => {
            this.suggestions$.next(values);
            // Refresh hiddenSelected list when the list of items is updated
            this.refreshHiddenSelected();
            this.searchActive = false;
            this.changeDetectorRef.markForCheck();
        });
        // Keep documents with ANY of the selected items
        this.filterItemsOr = new Action({
            icon: "fas fa-filter",
            title: "msg#facet.filterItems",
            action: () => {
                if (this.data()) {
                    this.facetService.addFilterSearch(this.getName(), this.data(), this.selected);
                }
            }
        });
        // Keep documents with ALL the selected items
        this.filterItemsAnd = new Action({
            icon: "fas fa-bullseye",
            title: "msg#facet.filterItemsAnd",
            action: () => {
                if (this.data()) {
                    this.facetService.addFilterSearch(this.getName(), this.data(), this.selected, { and: true });
                }
            }
        });
        // Exclude document with selected items
        this.excludeItems = new Action({
            icon: "fas fa-times",
            title: "msg#facet.excludeItems",
            action: () => {
                if (this.data()) {
                    this.facetService.addFilterSearch(this.getName(), this.data(), this.selected, { not: true });
                }
            }
        });
        // Clear the current filters
        this.clearFilters = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.clearSelects",
            action: () => {
                this.facetService.clearFiltersSearch(this.getName(), true);
            }
        });
        // Search for a value in this list
        this.searchItems = new Action({
            icon: "fas fa-search",
            title: "msg#facet.searchItems",
            action: (item, event) => {
                item.selected = !item.selected;
                if (!item.selected) {
                    this.clearSearch();
                }
                event.stopPropagation();
                this.changeDetectorRef.markForCheck();
            }
        });
    }
    clearSearch() {
        this.searchQuery.setValue(""); // Remove suggestions if some remain
        this.noResults = false;
        this.suggestions$.next([]);
    }
    /**
     * Name of the facet, used to create and retrieve selections
     * through the facet service.
     */
    getName() {
        return this.name || this.aggregation;
    }
    /**
     * OnChanges listener awaits new results from the search service
     * This completely resets the display
     * @param changes
     */
    ngOnChanges(changes) {
        if (this.showCount === undefined)
            this.showCount = true;
        if (this.searchable === undefined)
            this.searchable = true;
        if (this.allowExclude === undefined)
            this.allowExclude = true;
        if (this.allowOr === undefined)
            this.allowOr = true;
        if (this.allowAnd === undefined)
            this.allowAnd = true;
        if (!!changes["results"]) { // New data from the search service
            if (!this.count) {
                this.count = this.facetService.getAggregationCount(this.aggregation);
            }
            this.filtered.length = 0;
            this.selected.length = 0;
            this.hiddenSelected.length = 0;
            this.skip = 0;
            this.searchItems.selected = false;
            this.clearSearch();
            this.data$.next(this.facetService.getAggregation(this.aggregation, this.results));
        }
    }
    ngOnInit() {
        this.subscriptions["data"] = this.data$.pipe(map(data => {
            const nonFilteredItems = this.refreshFiltered(data);
            return !(data === null || data === void 0 ? void 0 : data.isDistribution) || this.displayEmptyDistributionIntervals ?
                nonFilteredItems : nonFilteredItems.filter(item => item.count > 0);
        })).subscribe(items => {
            this.sumOfCount = items.length > 0 ? items.map(item => item.count).reduce((acc, value) => acc += value) / 100 : 0;
            this.items$.next(items);
            // Refresh hiddenSelected list when the list of items is updated
            this.refreshHiddenSelected();
        });
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
    /**
     * Returns all the actions that are relevant in the current context
     */
    get actions() {
        const actions = [];
        if (this.selected.length > 0) {
            if (this.allowOr) {
                actions.push(this.filterItemsOr);
            }
            if (this.allowAnd && this.selected.length > 1) {
                actions.push(this.filterItemsAnd);
            }
            if (this.allowExclude) {
                actions.push(this.excludeItems);
            }
        }
        if (!this.hasSuggestions() && this.hasFiltered()) {
            actions.push(this.clearFilters);
        }
        if (this.searchable) {
            actions.push(this.searchItems);
        }
        return actions;
    }
    // Filtered items
    /**
     * Actualize the state of filtered items (note that excluded terms are not in the distribution, so the equivalent cannot be done)
     */
    refreshFiltered(data) {
        var _a;
        // refresh filters from breadcrumbs
        const items = this.facetService.getAggregationItemsFiltered(this.getName(), data === null || data === void 0 ? void 0 : data.valuesAreExpressions);
        items.forEach(item => {
            if (!this.isFiltered(data, item)) {
                this.filtered.push(item);
            }
        });
        const nonFilteredItems = [];
        (_a = data === null || data === void 0 ? void 0 : data.items) === null || _a === void 0 ? void 0 : _a.forEach(item => {
            const indx = this.facetService.filteredIndex(data, this.filtered, item);
            if (this.facetService.itemFiltered(this.getName(), data, item)) {
                if (!this.isFiltered(data, item)) {
                    this.filtered.push(item);
                }
                else {
                    this.filtered[indx].count = item.count;
                }
            }
            else {
                // sometime facetService.itemFiltered() could returns false but item is present in breadcrumbs
                if (indx !== -1) {
                    this.filtered[indx].count = item.count;
                }
                else {
                    nonFilteredItems.push(item);
                }
            }
        });
        return nonFilteredItems;
    }
    refreshHiddenSelected() {
        this.hiddenSelected = this.selected.filter(item => {
            const idx = this.hasSuggestions()
                ? this.facetService.findAggregationItemIndex(this.suggestions$.getValue(), item)
                : this.facetService.findAggregationItemIndex(this.items$.getValue() || [], item);
            return idx === -1;
        });
    }
    /**
     * Returns true if the given AggregationItem is filtered
     * @param item
     */
    isFiltered(data, item) {
        return this.facetService.filteredIndex(data, this.filtered, item) !== -1;
    }
    /**
     * Returns true if there is an active selection (or exclusion) from this facet
     */
    hasFiltered() {
        return this.facetService.hasFiltered(this.getName());
    }
    /**
     * Called when clicking on a facet item text
     * @param item
     * @param event
     */
    filterItem(item, event) {
        const data = this.data();
        if (data) {
            this.filtering = true;
            if (!this.isFiltered(data, item)) {
                this.facetService.addFilterSearch(this.getName(), data, item);
            }
            else {
                this.facetService.removeFilterSearch(this.getName(), data, item);
            }
        }
        event.preventDefault();
    }
    // Selected items
    /**
     * Returns true if the given AggregationItem is selected
     * @param item
     */
    isSelected(item) {
        return this.facetService.findAggregationItemIndex(this.selected, item) !== -1;
    }
    /**
     * Called when selecting/unselecting an item in the facet
     * @param item
     */
    selectItem(item, e) {
        e.preventDefault();
        if (!this.filtering) {
            this.updateSelected(item);
            e.stopPropagation();
        }
        this.filtering = false;
    }
    updateSelected(item) {
        if (!this.isFiltered(this.data(), item)) {
            const index = this.facetService.findAggregationItemIndex(this.selected, item);
            if (index === -1) {
                this.selected.push(item);
            }
            else {
                this.selected.splice(index, 1);
            }
            this.refreshHiddenSelected();
        }
    }
    // Loading more items
    /**
     * Returns true if this facet can get more data from the server
     * (The only way to guess is to check if the facet is "full", it capacity being the (skip+)count)
     */
    get hasMore() {
        return this.resultsLength >= this.skip + this.count;
    }
    get resultsLength() {
        return this.items$.getValue().length + this.filtered.length;
    }
    /**
     * Called on loadMore button click
     */
    loadMore(e) {
        e.stopPropagation();
        if (this.data()) {
            const skip = this.resultsLength; // avoid hasMore() to return false when fetching data
            this.loadingMore = true;
            this.changeDetectorRef.markForCheck();
            Utils.subscribe(this.facetService.loadData(this.aggregation, skip, this.count), agg => {
                this.skip = skip;
                if ((agg === null || agg === void 0 ? void 0 : agg.items) && this.data()) {
                    agg.items = this.items$.getValue().concat(agg.items);
                    this.data$.next(agg);
                }
            }, undefined, () => {
                this.loadingMore = false;
                this.changeDetectorRef.markForCheck();
            });
        }
        return false; // Avoids following href
    }
    // Suggest / Search
    /**
     * Returns true if the search mode is active (ie. there are suggestions to display in place of the aggregation)
     */
    hasSuggestions() {
        return this.suggestions$.getValue().length > 0 || this.noResults;
    }
    /* AbstractFacet abstract methods */
    isHidden() {
        return !this.data();
    }
    /**
     * Convert facet item count to percentage width
     * @param count item count
     * @returns a % string representation
     */
    getPercent(count) {
        return `${100 - (count / this.sumOfCount)}%`;
    }
}
BsFacetList.ɵfac = function BsFacetList_Factory(t) { return new (t || BsFacetList)(ɵɵdirectiveInject(FacetService), ɵɵdirectiveInject(ChangeDetectorRef)); };
BsFacetList.ɵcmp = ɵɵdefineComponent({ type: BsFacetList, selectors: [["sq-facet-list"]], inputs: { name: "name", results: "results", aggregation: "aggregation", showCount: "showCount", searchable: "searchable", allowExclude: "allowExclude", allowOr: "allowOr", allowAnd: "allowAnd", displayEmptyDistributionIntervals: "displayEmptyDistributionIntervals", displayActions: "displayActions", showProgressBar: "showProgressBar" }, features: [ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "list-group list-group-flush", 4, "ngIf"], [1, "list-group", "list-group-flush"], ["class", "d-flex pb-2 pr-2", 4, "ngIf"], ["class", "position-relative", 3, "formGroup", 4, "ngIf"], ["class", "d-flex flex-row align-items-center list-group-item list-group-item-action list-group-item-success text-truncate border-0 px-3 py-1 facet-row cursor-pointer", 3, "ngClass", "title", "click", 4, "ngFor", "ngForOf"], ["class", "d-flex flex-row align-items-center list-group-item list-group-item-primary text-truncate border-0 px-3 py-1 facet-row cursor-pointer", 3, "title", "click", 4, "ngFor", "ngForOf"], ["class", "d-flex flex-row align-items-center list-group-item list-group-item-action text-truncate border-0 px-3 py-1 facet-row cursor-pointer", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["class", "d-block text-center text-muted small py-1", 4, "ngIf"], ["class", "facet-results-scrollable", 4, "ngIf"], [1, "d-flex", "pb-2", "pr-2"], [1, "btn-group", "ml-auto", 3, "sq-action-buttons"], [1, "position-relative", 3, "formGroup"], [1, "p-1"], ["sqAutofocus", "", "formControlName", "searchQuery", 1, "form-control", 3, "placeholder"], [3, "active"], [1, "d-flex", "flex-row", "align-items-center", "list-group-item", "list-group-item-action", "list-group-item-success", "text-truncate", "border-0", "px-3", "py-1", "facet-row", "cursor-pointer", 3, "ngClass", "title", "click"], ["href", "#", 1, "text-truncate", "mr-auto"], ["class", "ml-2 text-muted small", 4, "ngIf"], [1, "fa-stack", "cursor-pointer"], [1, "ml-2", "far", "fa-minus-square", "fa-stack-1x", "icons", "icon-hover", "rotate"], [1, "ml-2", "far", "fa-check-square", "fa-stack-1x", "icons", "icon-default", "rotate"], [1, "ml-2", "text-muted", "small"], [1, "d-flex", "flex-row", "align-items-center", "list-group-item", "list-group-item-primary", "text-truncate", "border-0", "px-3", "py-1", "facet-row", "cursor-pointer", 3, "title", "click"], ["href", "#", 1, "text-truncate", "mr-auto", 3, "title", "click"], [1, "d-flex", "flex-row", "align-items-center", "list-group-item", "list-group-item-action", "text-truncate", "border-0", "px-3", "py-1", "facet-row", "cursor-pointer", 3, "ngClass", "click"], ["href", "#", "role", "button", 1, "text-truncate", "mr-auto", 3, "title", "click"], ["class", "ml-2 text-muted small", "style", "z-index: 1;", 4, "ngIf"], [1, "ml-2", "text-muted", "small", 2, "z-index", "1"], [1, "d-block", "text-center", "text-muted", "small", "py-1"], [1, "facet-results-scrollable"], ["class", "position-relative list-group-item list-group-item-action border-0 px-3 py-1 facet-row cursor-pointer", 3, "ngClass", "title", "click", 4, "ngFor", "ngForOf"], ["class", "d-block border-0 px-3 py-1 text-center", "href", "#", 3, "click", 4, "ngIf"], [1, "position-relative", "list-group-item", "list-group-item-action", "border-0", "px-3", "py-1", "facet-row", "cursor-pointer", 3, "ngClass", "title", "click"], ["class", "position-absolute progress-bar progress-color", 3, "--count", 4, "ngIf"], [1, "d-flex", "justify-content-between", "align-items-baseline"], ["href", "#", 1, "text-truncate", "mr-auto", 2, "z-index", "1", 3, "title", "click"], [1, "position-absolute", "progress-bar", "progress-color"], ["href", "#", 1, "d-block", "border-0", "px-3", "py-1", "text-center", 3, "click"], ["class", "fas fa-sync fa-fw fa-spin", 4, "ngIf"], [4, "ngIf"], [1, "fas", "fa-sync", "fa-fw", "fa-spin"]], template: function BsFacetList_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsFacetList_div_0_Template, 9, 9, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !ctx.isHidden());
    } }, directives: [NgIf, NgForOf, BsActionButtons, NgControlStatusGroup, FormGroupDirective, DefaultValueAccessor, Autofocus, NgControlStatus, FormControlName, BsLoadingBar, NgClass], pipes: [AsyncPipe, MessagePipe, ValuePipe, NumberPipe], styles: ["[_ngcontent-%COMP%]::-webkit-scrollbar{width:10px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#ccc}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background-color:#f3f3f3}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.progress-bar[_ngcontent-%COMP%]{bottom:0;height:2px;right:0;width:calc(100% - var(--count))}.progress-bar.progress-color[_ngcontent-%COMP%]{background-color:#7c7c7c;background-image:linear-gradient(90deg,#b8daff,transparent)}.facet-row[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]{transition:opacity .3s,transform .3s ease}.facet-row[_ngcontent-%COMP%]   .icons.icon-hover[_ngcontent-%COMP%]{opacity:0}.facet-row[_ngcontent-%COMP%]   .icons.icon-hover.rotate[_ngcontent-%COMP%]{transform:rotate(-180deg)}.facet-row[_ngcontent-%COMP%]:hover   .icon-default[_ngcontent-%COMP%]{opacity:0}.facet-row[_ngcontent-%COMP%]:hover   .icon-default.rotate[_ngcontent-%COMP%]{transform:rotate(180deg)}.facet-row[_ngcontent-%COMP%]:hover   .icon-hover[_ngcontent-%COMP%]{opacity:1}.facet-row[_ngcontent-%COMP%]:hover   .icon-hover.rotate[_ngcontent-%COMP%]{transform:rotate(0deg)}.facet-row[_ngcontent-%COMP%]   .fa-stack[_ngcontent-%COMP%]{height:1.5em;line-height:1.5em}.facet-results-scrollable[_ngcontent-%COMP%]{max-height:385px;overflow-y:auto}"], changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsFacetList, [{
        type: Component,
        args: [{
                selector: "sq-facet-list",
                templateUrl: "./facet-list.html",
                styleUrls: ["./facet-list.scss"],
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: FacetService }, { type: ChangeDetectorRef }]; }, { name: [{
            type: Input
        }], results: [{
            type: Input
        }], aggregation: [{
            type: Input
        }], showCount: [{
            type: Input
        }], searchable: [{
            type: Input
        }], allowExclude: [{
            type: Input
        }], allowOr: [{
            type: Input
        }], allowAnd: [{
            type: Input
        }], displayEmptyDistributionIntervals: [{
            type: Input
        }], displayActions: [{
            type: Input
        }], showProgressBar: [{
            type: Input
        }] }); })();

const _c0$3 = function (a0) { return { items: a0, size: "sm" }; };
function BsFacetTree_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 8);
    ɵɵelement(1, "div", 9);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("sq-action-buttons", ɵɵpureFunction1(1, _c0$3, ctx_r3.actions));
} }
function BsFacetTree_div_0_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 10);
    ɵɵelementStart(1, "div", 11);
    ɵɵelement(2, "input", 12);
    ɵɵpipe(3, "sqMessage");
    ɵɵelementEnd();
    ɵɵelement(4, "sq-loading-bar", 13);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = ɵɵnextContext(2);
    ɵɵproperty("formGroup", ctx_r4.myGroup);
    ɵɵadvance(2);
    ɵɵproperty("placeholder", ɵɵpipeBind1(3, 3, "msg#facet.searchPlaceholder"));
    ɵɵadvance(2);
    ɵɵproperty("active", ctx_r4.searchActive);
} }
function BsFacetTree_div_0_div_3_span_7_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 17);
    ɵɵtext(1);
    ɵɵpipe(2, "sqNumber");
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, item_r8.count));
} }
const _c1$3 = function (a0) { return { "terme": a0 }; };
function BsFacetTree_div_0_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r12 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 14);
    ɵɵlistener("click", function BsFacetTree_div_0_div_3_Template_div_click_0_listener() { ɵɵrestoreView(_r12); const item_r8 = ctx.$implicit; const ctx_r11 = ɵɵnextContext(2); return ctx_r11.selectItem(item_r8); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelementStart(2, "a", 15);
    ɵɵlistener("click", function BsFacetTree_div_0_div_3_Template_a_click_2_listener($event) { ɵɵrestoreView(_r12); const item_r8 = ctx.$implicit; const ctx_r13 = ɵɵnextContext(2); return ctx_r13.filterItem(item_r8, $event); });
    ɵɵpipe(3, "sqMessage");
    ɵɵpipe(4, "slice");
    ɵɵtext(5);
    ɵɵpipe(6, "slice");
    ɵɵelementEnd();
    ɵɵtemplate(7, BsFacetTree_div_0_div_3_span_7_Template, 3, 3, "span", 16);
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const ctx_r5 = ɵɵnextContext(2);
    ɵɵproperty("title", ɵɵpipeBind1(1, 4, "msg#facet.itemUnselect"));
    ɵɵadvance(2);
    ɵɵproperty("title", ɵɵpipeBind2(3, 6, "msg#facet.filterItem", ɵɵpureFunction1(17, _c1$3, ɵɵpipeBind3(4, 9, item_r8.$path, 1, -1))));
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind3(6, 13, item_r8.$path, 1, -1));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r5.showCount && item_r8.count);
} }
function BsFacetTree_div_0_span_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 18);
    ɵɵelementStart(1, "i");
    ɵɵtext(2);
    ɵɵpipe(3, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(3, 1, "msg#facet.searchNoResult"));
} }
function BsFacetTree_div_0_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
const _c2$3 = function (a0) { return { "scrollable": a0 }; };
function BsFacetTree_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵtemplate(1, BsFacetTree_div_0_div_1_Template, 2, 3, "div", 3);
    ɵɵtemplate(2, BsFacetTree_div_0_div_2_Template, 5, 5, "div", 4);
    ɵɵtemplate(3, BsFacetTree_div_0_div_3_Template, 8, 19, "div", 5);
    ɵɵtemplate(4, BsFacetTree_div_0_span_4_Template, 4, 3, "span", 6);
    ɵɵtemplate(5, BsFacetTree_div_0_ng_container_5_Template, 1, 0, "ng-container", 7);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const _r1 = ɵɵreference(2);
    ɵɵproperty("ngClass", ɵɵpureFunction1(7, _c2$3, ctx_r0.forceMaxHeight));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.displayActions && ctx_r0.actions);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.searchItems.selected);
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r0.hiddenSelected);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.noResults);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", ctx_r0.data);
} }
function BsFacetTree_ng_template_1_ng_container_0_a_4_span_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span", 31);
} }
function BsFacetTree_ng_template_1_ng_container_0_a_4_span_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span", 32);
} }
function BsFacetTree_ng_template_1_ng_container_0_a_4_span_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span", 33);
} }
function BsFacetTree_ng_template_1_ng_container_0_a_4_Template(rf, ctx) { if (rf & 1) {
    const _r27 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 27);
    ɵɵlistener("click", function BsFacetTree_ng_template_1_ng_container_0_a_4_Template_a_click_0_listener($event) { ɵɵrestoreView(_r27); const item_r16 = ɵɵnextContext().$implicit; const ctx_r25 = ɵɵnextContext(2); return ctx_r25.open(item_r16, $event); });
    ɵɵpipe(1, "sqMessage");
    ɵɵtemplate(2, BsFacetTree_ng_template_1_ng_container_0_a_4_span_2_Template, 1, 0, "span", 28);
    ɵɵtemplate(3, BsFacetTree_ng_template_1_ng_container_0_a_4_span_3_Template, 1, 0, "span", 29);
    ɵɵtemplate(4, BsFacetTree_ng_template_1_ng_container_0_a_4_span_4_Template, 1, 0, "span", 30);
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r16 = ɵɵnextContext().$implicit;
    ɵɵproperty("title", ɵɵpipeBind1(1, 4, item_r16["$opened"] ? "msg#facet.closeItem" : "msg#facet.openItem"));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", item_r16["$opening"]);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !item_r16["$opening"] && item_r16["$opened"]);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !item_r16["$opening"] && !item_r16["$opened"]);
} }
function BsFacetTree_ng_template_1_ng_container_0_span_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span", 34);
} }
function BsFacetTree_ng_template_1_ng_container_0_i_10_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "i", 35);
} }
function BsFacetTree_ng_template_1_ng_container_0_span_11_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 17);
    ɵɵtext(1);
    ɵɵpipe(2, "sqNumber");
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r16 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, item_r16.count));
} }
function BsFacetTree_ng_template_1_ng_container_0_ng_container_12_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
function BsFacetTree_ng_template_1_ng_container_0_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsFacetTree_ng_template_1_ng_container_0_ng_container_12_ng_container_1_Template, 1, 0, "ng-container", 7);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r16 = ɵɵnextContext().$implicit;
    ɵɵnextContext(2);
    const _r1 = ɵɵreference(2);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", item_r16);
} }
const _c3$2 = function (a0, a1, a2, a3) { return { "list-group-item-primary": a0, "list-group-item-success": a1, "list-group-item-action": a2, "filtered": a3 }; };
const _c4 = function (a0) { return { "margin-left.rem": a0 }; };
function BsFacetTree_ng_template_1_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r33 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "a", 20);
    ɵɵlistener("click", function BsFacetTree_ng_template_1_ng_container_0_Template_a_click_1_listener() { ɵɵrestoreView(_r33); const item_r16 = ctx.$implicit; const ctx_r32 = ɵɵnextContext(2); return ctx_r32.selectItem(item_r16); });
    ɵɵpipe(2, "sqMessage");
    ɵɵelementStart(3, "span", 21);
    ɵɵtemplate(4, BsFacetTree_ng_template_1_ng_container_0_a_4_Template, 5, 6, "a", 22);
    ɵɵtemplate(5, BsFacetTree_ng_template_1_ng_container_0_span_5_Template, 1, 0, "span", 23);
    ɵɵelementStart(6, "a", 24);
    ɵɵlistener("click", function BsFacetTree_ng_template_1_ng_container_0_Template_a_click_6_listener($event) { ɵɵrestoreView(_r33); const item_r16 = ctx.$implicit; const ctx_r34 = ɵɵnextContext(2); return ctx_r34.filterItem(item_r16, $event); });
    ɵɵpipe(7, "sqValue");
    ɵɵtext(8);
    ɵɵpipe(9, "sqValue");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵtemplate(10, BsFacetTree_ng_template_1_ng_container_0_i_10_Template, 1, 0, "i", 25);
    ɵɵtemplate(11, BsFacetTree_ng_template_1_ng_container_0_span_11_Template, 3, 3, "span", 16);
    ɵɵelementEnd();
    ɵɵtemplate(12, BsFacetTree_ng_template_1_ng_container_0_ng_container_12_Template, 2, 2, "ng-container", 26);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r16 = ctx.$implicit;
    const ctx_r15 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngClass", ɵɵpureFunction4(18, _c3$2, ctx_r15.isSelected(item_r16), ctx_r15.isFiltered(item_r16), !ctx_r15.isFiltered(item_r16), ctx_r15.isFiltered(item_r16)))("title", ɵɵpipeBind1(2, 10, ctx_r15.isFiltered(item_r16) ? "msg#facet.selectedValue" : "msg#facet.itemSelect"));
    ɵɵadvance(2);
    ɵɵproperty("ngStyle", ɵɵpureFunction1(23, _c4, item_r16["$level"] - 1));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", item_r16["hasChildren"]);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !item_r16["hasChildren"]);
    ɵɵadvance(1);
    ɵɵproperty("title", ɵɵpipeBind2(7, 12, item_r16, item_r16.$column));
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind2(9, 15, item_r16, item_r16.$column), "");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r15.isFiltered(item_r16));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r15.showCount && item_r16.count);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", item_r16["$opened"]);
} }
function BsFacetTree_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵtemplate(0, BsFacetTree_ng_template_1_ng_container_0_Template, 13, 25, "ng-container", 19);
} if (rf & 2) {
    const items_r14 = ctx.items;
    ɵɵproperty("ngForOf", items_r14);
} }
class BsFacetTree extends AbstractFacet {
    constructor(facetService, changeDetectorRef) {
        super();
        this.facetService = facetService;
        this.changeDetectorRef = changeDetectorRef;
        this.showCount = true; // Show the number of occurrences
        this.allowExclude = true; // Allow to exclude selected items
        this.allowOr = true; // Allow to search various items in OR mode
        this.searchable = true; // Allow to search for items in the facet
        this.expandedLevel = 2;
        this.forceMaxHeight = true; // Allow to display a scrollbar automatically on long list items
        this.displayActions = false;
        this.subscriptions = [];
        // Sets to keep track of selected/excluded/filtered items
        this.filtered = new Set();
        this.selected = new Map();
        this.hiddenSelected = [];
        this.suggestDelay = 200;
        this.searchActive = false;
        this.noResults = false;
        // For each new node, set up properties necessary for display
        // This callback could also be used to filter or sorts nodes, etc.
        this.initNodes = (nodes, level, node) => {
            if (node.$filtered) {
                this.filtered.add(node);
            }
            if (node.hasChildren && !node.$opened && node.items && node.items.length >= 0 && level <= this.expandedLevel) {
                node.$opened = true;
            }
        };
        /**
         * Called on NgModel change (searchQuery)
         * Uses the suggestfield API to retrieve suggestions from the server
         * The suggestions "override" the data from the distribution (until search results are cleared)
         */
        this.suggest$ = (text$) => text$.pipe(debounceTime(this.suggestDelay), distinctUntilChanged(), switchMap(term => {
            var _a;
            if (term.trim() === "") {
                this.noResults = false;
                return of([]);
            }
            this.changeDetectorRef.markForCheck();
            this.searchActive = true;
            return this.facetService.suggest(term, ((_a = this.data) === null || _a === void 0 ? void 0 : _a.column) || '').pipe(catchError(err => {
                console.log(err);
                this.noResults = false;
                return of([]);
            }), map(suggests => {
                const items = this.facetService.suggestionsToTreeAggregationNodes(suggests, term, this.data);
                this.noResults = items.length === 0 && term.trim() !== "";
                return items;
            }));
        }));
        this.myGroup = new FormGroup({
            searchQuery: new FormControl()
        });
        this.searchQuery = this.myGroup.get("searchQuery");
        this.subscriptions["suggest"] = this.suggest$(this.searchQuery.valueChanges)
            .subscribe(values => {
            if (this.data) {
                let items = this.searchQuery.value ? values : this.originalItems;
                this.data = {
                    column: this.data.column,
                    name: this.data.name,
                    isTree: true,
                    items
                };
                // Refresh hiddenSelected list when the list of items is updated
                this.refreshHiddenSelected();
                this.searchActive = false;
                this.changeDetectorRef.markForCheck();
            }
        });
        // Keep documents with ANY of the selected items
        this.filterItemsOr = new Action({
            icon: "fas fa-filter",
            title: "msg#facet.filterItems",
            action: () => {
                if (this.data) {
                    this.facetService.addFilterSearch(this.getName(), this.data, this.getSelectedItems());
                }
            }
        });
        // Exclude document with selected items
        this.excludeItems = new Action({
            icon: "fas fa-times",
            title: "msg#facet.excludeItems",
            action: () => {
                if (this.data) {
                    this.facetService.addFilterSearch(this.getName(), this.data, this.getSelectedItems(), { not: true });
                }
            }
        });
        // Clear the current filters
        this.clearFilters = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.clearSelects",
            action: () => {
                this.facetService.clearFiltersSearch(this.getName(), true);
            }
        });
        // Search for a value in this list
        this.searchItems = new Action({
            icon: "fas fa-search",
            title: "msg#facet.searchItems",
            action: (item, event) => {
                item.selected = !item.selected;
                if (!item.selected) {
                    this.clearSearch();
                }
                event.stopPropagation();
                this.changeDetectorRef.markForCheck();
            }
        });
    }
    /**
     * Name of the facet, used to create and retrieve selections
     * through the facet service.
     */
    getName() {
        return this.name || this.aggregation;
    }
    /**
     * OnChanges listener awaits new results from the search service
     * This completely resets the display
     * @param changes
     */
    ngOnChanges(changes) {
        var _a;
        if (this.showCount === undefined)
            this.showCount = true;
        if (this.searchable === undefined)
            this.searchable = true;
        if (this.allowExclude === undefined)
            this.allowExclude = true;
        if (this.allowOr === undefined)
            this.allowOr = true;
        if (!!changes["results"]) { // New data from the search service
            this.filtered.clear();
            this.selected.clear();
            this.hiddenSelected.length = 0;
            this.data = this.facetService.getAggregation(this.aggregation, this.results, {
                facetName: this.getName(),
                levelCallback: this.initNodes
            });
            this.originalItems = (_a = this.data) === null || _a === void 0 ? void 0 : _a.items;
            this.searchItems.selected = false;
            this.clearSearch();
        }
    }
    /**
     * Returns all the actions that are relevant in the current context
     */
    get actions() {
        const actions = [];
        if (this.selected.size > 0) {
            if (this.allowOr) {
                actions.push(this.filterItemsOr);
            }
            if (this.allowExclude) {
                actions.push(this.excludeItems);
            }
        }
        if (this.hasFiltered()) {
            actions.push(this.clearFilters);
        }
        if (this.searchable) {
            actions.push(this.searchItems);
        }
        return actions;
    }
    // Filtered items
    /**
     * Returns true if the given AggregationItem is filtered
     * @param item
     */
    isFiltered(item) {
        return this.filtered.has(item);
    }
    /**
     * Returns true if there is an active selection (or exclusion) from this facet
     */
    hasFiltered() {
        return this.facetService.hasFiltered(this.getName());
    }
    /**
     * Called when clicking on a facet item text
     * @param item
     * @param event
     */
    filterItem(item, event) {
        if (this.data) {
            if (!this.isFiltered(item)) {
                this.facetService.addFilterSearch(this.getName(), this.data, item);
            }
            else {
                this.facetService.removeFilterSearch(this.getName(), this.data, item);
            }
        }
        event.preventDefault();
        event.stopPropagation();
        return false; // Stop the propagation of the event (link inside link)
    }
    // Selected items
    /**
     * Returns true if the given AggregationItem is selected
     * @param item
     */
    isSelected(item) {
        return this.selected.has(item.$path);
    }
    /**
     * Returns all the selected items
     */
    getSelectedItems() {
        return Array.from(this.selected.values());
    }
    /**
     * Called when selecting/unselecting an item in the facet
     * @param item
     */
    selectItem(item) {
        if (!this.isFiltered(item)) {
            if (this.selected.has(item.$path)) {
                this.selected.delete(item.$path);
            }
            else {
                this.selected.set(item.$path, item);
            }
            this.refreshHiddenSelected();
        }
        return false;
    }
    refreshHiddenSelected() {
        this.hiddenSelected = this.getSelectedItems()
            .filter(item => { var _a; return !this.find((_a = this.data) === null || _a === void 0 ? void 0 : _a.items, item); });
    }
    find(items, item) {
        if (items) {
            for (let i of items) {
                if (i.$path === item.$path || (i.$opened && this.find(i.items, item))) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Expand/Collapse a Tree node (the data may need to downloaded from the server)
     * @param item
     */
    open(item, event) {
        if (item.hasChildren) {
            item.$opened = !item.$opened;
            if (!item.items || item.items.length === 0) {
                item['$opening'] = true;
                if (this.data) {
                    Utils.subscribe(this.facetService.open(this.getName(), this.data, item, this.initNodes), (results) => {
                        item['$opening'] = false;
                        this.refreshHiddenSelected();
                        this.changeDetectorRef.markForCheck();
                    });
                }
            }
            this.refreshHiddenSelected();
        }
        event.preventDefault();
        event.stopPropagation();
        return false; // Prevent default action
    }
    /* AbstractFacet abstract methods */
    isHidden() {
        return !this.data;
    }
    // Search    
    clearSearch() {
        this.searchQuery.setValue(""); // Remove suggestions if some remain
        this.noResults = false;
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
BsFacetTree.ɵfac = function BsFacetTree_Factory(t) { return new (t || BsFacetTree)(ɵɵdirectiveInject(FacetService), ɵɵdirectiveInject(ChangeDetectorRef)); };
BsFacetTree.ɵcmp = ɵɵdefineComponent({ type: BsFacetTree, selectors: [["sq-facet-tree"]], inputs: { name: "name", results: "results", aggregation: "aggregation", showCount: "showCount", allowExclude: "allowExclude", allowOr: "allowOr", searchable: "searchable", expandedLevel: "expandedLevel", forceMaxHeight: "forceMaxHeight", displayActions: "displayActions", initNodes: "initNodes" }, features: [ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature], decls: 3, vars: 1, consts: [["class", "list-group list-group-flush", 3, "ngClass", 4, "ngIf"], ["itemsTpl", ""], [1, "list-group", "list-group-flush", 3, "ngClass"], ["class", "d-flex pb-2 pr-2", 4, "ngIf"], ["class", "position-relative", 3, "formGroup", 4, "ngIf"], ["class", "d-flex flex-row align-items-center list-group-item list-group-item-primary border-0 px-3 py-1 facet-row cursor-pointer", 3, "title", "click", 4, "ngFor", "ngForOf"], ["class", "d-block text-center text-muted small py-1", 4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "d-flex", "pb-2", "pr-2"], [1, "btn-group", "ml-auto", 3, "sq-action-buttons"], [1, "position-relative", 3, "formGroup"], [1, "p-1"], ["sqAutofocus", "", "formControlName", "searchQuery", 1, "form-control", 3, "placeholder"], [3, "active"], [1, "d-flex", "flex-row", "align-items-center", "list-group-item", "list-group-item-primary", "border-0", "px-3", "py-1", "facet-row", "cursor-pointer", 3, "title", "click"], ["href", "#", 1, "text-truncate", "mr-auto", 3, "title", "click"], ["class", "ml-2 text-muted small", 4, "ngIf"], [1, "ml-2", "text-muted", "small"], [1, "d-block", "text-center", "text-muted", "small", "py-1"], [4, "ngFor", "ngForOf"], ["href", "#", 1, "d-flex", "flex-row", "align-items-center", "list-group-item", "border-0", "pl-1", "pr-3", "py-1", 3, "ngClass", "title", "click"], [1, "mr-auto", "text-truncate", 3, "ngStyle"], ["class", "item-opener", "href", "#", 3, "title", "click", 4, "ngIf"], ["class", "fas fa-fw", 4, "ngIf"], ["href", "#", "role", "button", 1, "text-truncate", 3, "title", "click"], ["class", "ml-2 far fa-check-square", 4, "ngIf"], [4, "ngIf"], ["href", "#", 1, "item-opener", 3, "title", "click"], ["class", "fas fa-sync fa-fw fa-spin", 4, "ngIf"], ["class", "fas fa-caret-down fa-fw", 4, "ngIf"], ["class", "fas fa-caret-right fa-fw", 4, "ngIf"], [1, "fas", "fa-sync", "fa-fw", "fa-spin"], [1, "fas", "fa-caret-down", "fa-fw"], [1, "fas", "fa-caret-right", "fa-fw"], [1, "fas", "fa-fw"], [1, "ml-2", "far", "fa-check-square"]], template: function BsFacetTree_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsFacetTree_div_0_Template, 6, 9, "div", 0);
        ɵɵtemplate(1, BsFacetTree_ng_template_1_Template, 1, 1, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !ctx.isHidden());
    } }, directives: [NgIf, NgClass, NgForOf, NgTemplateOutlet, BsActionButtons, NgControlStatusGroup, FormGroupDirective, DefaultValueAccessor, Autofocus, NgControlStatus, FormControlName, BsLoadingBar, NgStyle], pipes: [MessagePipe, SlicePipe, NumberPipe, ValuePipe], styles: ["[_ngcontent-%COMP%]::-webkit-scrollbar{width:10px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#ccc}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background-color:#f3f3f3}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.scrollable[_ngcontent-%COMP%]{max-height:85vh;overflow-y:auto}.item-opener[_ngcontent-%COMP%]{text-decoration:none!important}a.filtered[_ngcontent-%COMP%], a.filtered[_ngcontent-%COMP%]:hover{color:inherit;cursor:inherit;text-decoration:none}"], changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsFacetTree, [{
        type: Component,
        args: [{
                selector: "sq-facet-tree",
                templateUrl: "./facet-tree.html",
                styleUrls: ["./facet-tree.scss"],
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: FacetService }, { type: ChangeDetectorRef }]; }, { name: [{
            type: Input
        }], results: [{
            type: Input
        }], aggregation: [{
            type: Input
        }], showCount: [{
            type: Input
        }], allowExclude: [{
            type: Input
        }], allowOr: [{
            type: Input
        }], searchable: [{
            type: Input
        }], expandedLevel: [{
            type: Input
        }], forceMaxHeight: [{
            type: Input
        }], displayActions: [{
            type: Input
        }], initNodes: [{
            type: Input
        }] }); })();

function BsFacetBar_ng_container_3_sq_facet_list_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "sq-facet-list", 5, 6);
} if (rf & 2) {
    const f_r1 = ɵɵnextContext().$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("name", f_r1.name)("results", ctx_r2.results)("aggregation", f_r1.aggregations);
} }
function BsFacetBar_ng_container_3_sq_facet_tree_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "sq-facet-tree", 5, 6);
} if (rf & 2) {
    const f_r1 = ɵɵnextContext().$implicit;
    const ctx_r3 = ɵɵnextContext();
    ɵɵproperty("name", f_r1.name)("results", ctx_r3.results)("aggregation", f_r1.aggregations);
} }
function BsFacetBar_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "sq-facet-card", 3);
    ɵɵtemplate(2, BsFacetBar_ng_container_3_sq_facet_list_2_Template, 2, 3, "sq-facet-list", 4);
    ɵɵtemplate(3, BsFacetBar_ng_container_3_sq_facet_tree_3_Template, 2, 3, "sq-facet-tree", 4);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const f_r1 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵclassMap(f_r1["className"]);
    ɵɵproperty("ngSwitch", f_r1.type)("title", f_r1.title);
    ɵɵadvance(1);
    ɵɵproperty("ngSwitchCase", "list");
    ɵɵadvance(1);
    ɵɵproperty("ngSwitchCase", "tree");
} }
const _c0$4 = ["*"];
class BsFacetBar {
    constructor(facetService) {
        this.facetService = facetService;
        this.containerIndex = 0; // There could be various facet bars (but only one service and storage array)
    }
    get facets() {
        const facets = this.facetService.getFacets(this.containerIndex);
        return facets;
    }
}
BsFacetBar.ɵfac = function BsFacetBar_Factory(t) { return new (t || BsFacetBar)(ɵɵdirectiveInject(FacetService)); };
BsFacetBar.ɵcmp = ɵɵdefineComponent({ type: BsFacetBar, selectors: [["sq-facet-bar"]], inputs: { results: "results", containerIndex: "containerIndex" }, ngContentSelectors: _c0$4, decls: 4, vars: 1, consts: [[1, "container-fluid"], [1, "row"], [4, "ngFor", "ngForOf"], [3, "ngSwitch", "title"], [3, "name", "results", "aggregation", 4, "ngSwitchCase"], [3, "name", "results", "aggregation"], ["facet", ""]], template: function BsFacetBar_Template(rf, ctx) { if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "div", 1);
        ɵɵprojection(2);
        ɵɵtemplate(3, BsFacetBar_ng_container_3_Template, 4, 7, "ng-container", 2);
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(3);
        ɵɵproperty("ngForOf", ctx.facets);
    } }, directives: [NgForOf, BsFacetCard, NgSwitch, NgSwitchCase, BsFacetList, BsFacetTree], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsFacetBar, [{
        type: Component,
        args: [{
                selector: "sq-facet-bar",
                templateUrl: "./facet-bar.html"
            }]
    }], function () { return [{ type: FacetService }]; }, { results: [{
            type: Input
        }], containerIndex: [{
            type: Input
        }] }); })();

function BsFacetFilters_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 1);
    ɵɵelement(1, "sq-action-menu", 2);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("items", ctx_r0.filters)("autoAdjust", ctx_r0.autoAdjust)("autoAdjustBreakpoint", ctx_r0.autoAdjustBreakpoint)("collapseBreakpoint", ctx_r0.collapseBreakpoint)("right", ctx_r0.rightAligned)("size", ctx_r0.size);
} }
class BsFacetFilters {
    constructor(facetService) {
        this.facetService = facetService;
        this.enableCustomization = false;
        this.autoAdjust = true;
        this.autoAdjustBreakpoint = 'xl';
        this.collapseBreakpoint = 'sm';
        this.rightAligned = false;
        this.filters = [];
        this.hidden = false;
        this.facetStatus = {
            add: {
                title: "msg#facet.filters.add",
                icon: "fas fa-plus"
            },
            remove: {
                title: "msg#facet.filters.remove",
                icon: "fas fa-minus"
            }
        };
        this.hidden = false;
        this.filters = [];
    }
    ngOnInit() {
        if (!this.enableCustomization)
            return;
        if (!this.facetService.defaultFacets) {
            this.facetService.defaultFacets = [];
            for (let facet of this.facets)
                this.facetService.defaultFacets.push({ name: facet.name, position: 0, hidden: false, expanded: true, view: "" });
        }
        if (!this.facetService.allFacets)
            this.facetService.allFacets = this.facets;
    }
    ngOnChanges() {
        if (!!this.results)
            this.buildFilters();
        if (!this.results)
            this.hidden = true;
    }
    /**
     * Build filters bar actions
     */
    buildFilters() {
        // For each facet
        this.filters = this.filteredFacets.map((facet) => {
            const children = [
                new Action({
                    component: (facet.type === 'list') ? BsFacetList : BsFacetTree,
                    componentInputs: { results: this.results, name: facet.name, aggregation: facet.aggregation, searchable: facet.searchable, displayActions: true }
                })
            ];
            return new Action({
                name: facet.name,
                text: facet.title,
                title: facet.title,
                icon: facet.icon,
                disabled: !this.hasData(facet),
                styles: this.hasFiltered(facet.name) ? "ml-2 font-weight-bold" : "ml-2",
                children: children
            });
        });
        if (this.enableCustomization)
            this.addFacetMenu();
    }
    /**
     * Use to outline facet when filters are sets
     * @param facetName facet name
     *
     * @returns true if filters are sets otherwise false
     */
    hasFiltered(facetName) {
        return this.facetService.hasFiltered(facetName);
    }
    /**
     * Use to disable menu item when no items in a facet
     * @param facet facet to check
     *
     * @returns true if facet contains at least one item otherwise false
     */
    hasData(facet) {
        return this.facetService.hasData(facet.aggregation, this.results);
    }
    addFacetMenu() {
        var _a, _b;
        let outFacets = [];
        outFacets.push(new Action({
            name: `add_remove_all`,
            text: this.userFacets.length < this.facets.length ? "msg#facet.filters.addAll" : "msg#facet.filters.removeAll",
            icon: this.hasFacetSelected ?
                (this.userFacets.length < this.facets.length ? "far fa-minus-square mr-1" : "far fa-check-square mr-1")
                : "far fa-square mr-1",
            title: this.userFacets.length < this.facets.length ? "msg#facet.filters.addAll" : "msg#facet.filters.removeAll",
            action: () => {
                if (this.hasFacetSelected && this.userFacets.length === this.facets.length)
                    this.facetService.removeAllFacet();
                else
                    this.facetService.addAllFacet();
                this.buildFilters();
            }
        }));
        for (let facet of this.facets) {
            outFacets.push(new Action({
                name: `add_remove_${facet.name}`,
                text: facet.title,
                icon: facet.icon,
                selected: !!((_a = this.userFacets) === null || _a === void 0 ? void 0 : _a.find(userFacet => userFacet.name === facet.name)),
                title: !!((_b = this.userFacets) === null || _b === void 0 ? void 0 : _b.find(userFacet => userFacet.name === facet.name)) ? "msg#facet.filters.add" : "msg#facet.filters.remove",
                action: () => {
                    var _a;
                    if ((_a = this.userFacets) === null || _a === void 0 ? void 0 : _a.find(userFacet => userFacet.name === facet.name))
                        this.facetService.removeFacet({ name: facet.name, position: 0, hidden: false, expanded: true, view: "" });
                    else
                        this.facetService.addFacet({ name: facet.name, position: 0, hidden: false, expanded: true, view: "" });
                    this.buildFilters();
                }
            }));
        }
        let add_action = new Action({
            name: "facets_config",
            icon: "fas fa-cog",
            title: "msg#facet.filters.customizeFacets",
            children: outFacets
        });
        this.filters = [add_action, ...this.filters];
    }
    get filteredFacets() {
        if (!this.enableCustomization)
            return this.facets;
        let new_facets = [];
        if (this.userFacets) {
            for (let facet of this.facets) {
                let pos = this.userFacets.findIndex((userFacet) => userFacet.name === facet.name);
                if (pos >= 0)
                    new_facets.push(facet);
            }
        }
        return new_facets;
    }
    get userFacets() {
        return this.facetService.facets;
    }
    get hasFacetSelected() {
        if (this.userFacets.length === 0)
            return false;
        for (let facet of this.facets) {
            if (this.userFacets.find(userFacet => userFacet.name === facet.name))
                return true;
        }
        return false;
    }
}
BsFacetFilters.ɵfac = function BsFacetFilters_Factory(t) { return new (t || BsFacetFilters)(ɵɵdirectiveInject(FacetService)); };
BsFacetFilters.ɵcmp = ɵɵdefineComponent({ type: BsFacetFilters, selectors: [["sq-facet-filters"]], inputs: { results: "results", facets: "facets", enableCustomization: "enableCustomization", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", rightAligned: "rightAligned", size: "size" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "facet-filters-bar", 4, "ngIf"], [1, "facet-filters-bar"], [3, "items", "autoAdjust", "autoAdjustBreakpoint", "collapseBreakpoint", "right", "size"]], template: function BsFacetFilters_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsFacetFilters_div_0_Template, 2, 6, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !ctx.hidden);
    } }, directives: [NgIf, BsActionMenu], styles: [".navbar-nav[_ngcontent-%COMP%]{flex-direction:row;flex-wrap:wrap}.nav-item[_ngcontent-%COMP%]{padding:.25rem .75rem}div.sq-collapse.ng-animating[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{display:none}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsFacetFilters, [{
        type: Component,
        args: [{
                selector: "sq-facet-filters",
                templateUrl: "./facet-filters.html",
                styleUrls: ["./facet-filters.css"]
            }]
    }], function () { return [{ type: FacetService }]; }, { results: [{
            type: Input
        }], facets: [{
            type: Input
        }], enableCustomization: [{
            type: Input
        }], autoAdjust: [{
            type: Input
        }], autoAdjustBreakpoint: [{
            type: Input
        }], collapseBreakpoint: [{
            type: Input
        }], rightAligned: [{
            type: Input
        }], size: [{
            type: Input
        }] }); })();

function BsRefine_ng_template_15_small_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "small", 14);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, item_r3.label || item_r3.category));
} }
function BsRefine_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 12);
    ɵɵtext(1);
    ɵɵtemplate(2, BsRefine_ng_template_15_small_2_Template, 3, 3, "small", 13);
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate1("", item_r3.display, " ");
    ɵɵadvance(1);
    ɵɵproperty("ngIf", item_r3.category);
} }
class BsRefine extends AbstractFacet {
    constructor(formBuilder, searchService, changeDetectorRef) {
        super();
        this.formBuilder = formBuilder;
        this.searchService = searchService;
        this.changeDetectorRef = changeDetectorRef;
        /**
         * Minimum delay (in ms) between suggest queries
         */
        this.suggestDelay = 200;
        this.doRefine = () => {
            if (this.searchControl) {
                const text = Utils.trim(this.searchControl.value);
                if (text) {
                    this.searchService.searchRefine(text);
                }
            }
        };
    }
    ngOnChanges(changes) {
        if (!this.form) {
            this.form = this.formBuilder.group({
                "search": ""
            });
            this.searchControl = this.form.get("search");
        }
        if (!!changes["results"] && this.searchControl) {
            this.searchControl.setValue(this.searchService.lastRefineText);
        }
    }
    setError(parseResult = {}) {
        if (parseResult.error !== this.inputErrorMessage) {
            this.inputErrorMessage = parseResult.error || "";
            this.changeDetectorRef.markForCheck();
        }
    }
}
BsRefine.ɵfac = function BsRefine_Factory(t) { return new (t || BsRefine)(ɵɵdirectiveInject(FormBuilder), ɵɵdirectiveInject(SearchService), ɵɵdirectiveInject(ChangeDetectorRef)); };
BsRefine.ɵcmp = ɵɵdefineComponent({ type: BsRefine, selectors: [["sq-refine"]], inputs: { results: "results", autocompleteEnabled: "autocompleteEnabled", suggestQuery: "suggestQuery", suggestDelay: "suggestDelay" }, features: [ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature], decls: 18, vars: 20, consts: [[1, "card-body"], ["role", "search", "novalidate", "", 3, "formGroup"], [1, "d-flex", "flex-column", "flex-grow-1", "position-relative"], [1, "input-group"], [1, "sr-only"], ["type", "text", "formControlName", "search", "spellcheck", "false", "autocomplete", "off", "sqAutocomplete", "", 3, "title", "placeholder", "dropdown", "suggestQuery", "off", "suggestDelay", "submit", "parse"], [1, "input-group-append"], ["type", "button", 1, "btn", "btn-light", 3, "title", "click"], [1, "fas", "fa-search"], ["dropdown", ""], ["itemTpl", ""], [3, "results", "context"], [1, "py-2", 2, "padding-left", "0.75rem"], ["class", "ml-2 text-muted", 4, "ngIf"], [1, "ml-2", "text-muted"]], template: function BsRefine_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "form", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelementStart(3, "div", 3);
        ɵɵelementStart(4, "label", 4);
        ɵɵtext(5);
        ɵɵpipe(6, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementStart(7, "input", 5);
        ɵɵlistener("submit", function BsRefine_Template_input_submit_7_listener() { return ctx.doRefine(); })("parse", function BsRefine_Template_input_parse_7_listener($event) { return ctx.setError($event); });
        ɵɵpipe(8, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementStart(9, "div", 6);
        ɵɵelementStart(10, "button", 7);
        ɵɵlistener("click", function BsRefine_Template_button_click_10_listener() { return ctx.doRefine(); });
        ɵɵpipe(11, "sqMessage");
        ɵɵelement(12, "i", 8);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(13, "sq-autocomplete-list", null, 9);
        ɵɵtemplate(15, BsRefine_ng_template_15_Template, 3, 2, "ng-template", null, 10, ɵɵtemplateRefExtractor);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelement(17, "sq-did-you-mean", 11);
        ɵɵelementEnd();
    } if (rf & 2) {
        const _r0 = ɵɵreference(14);
        ɵɵadvance(1);
        ɵɵproperty("formGroup", ctx.form);
        ɵɵadvance(4);
        ɵɵtextInterpolate(ɵɵpipeBind1(6, 14, "msg#facet.refine.input.label"));
        ɵɵadvance(2);
        ɵɵclassMapInterpolate1("form-control ", ctx.inputErrorMessage ? "is-invalid" : "", "");
        ɵɵproperty("title", ctx.inputErrorMessage)("placeholder", ɵɵpipeBind1(8, 16, "msg#facet.refine.input.placeholder"))("dropdown", _r0)("suggestQuery", ctx.suggestQuery)("off", !ctx.autocompleteEnabled)("suggestDelay", ctx.suggestDelay);
        ɵɵadvance(3);
        ɵɵpropertyInterpolate("title", ɵɵpipeBind1(11, 18, "msg#facet.refine.input.buttonTitle"));
        ɵɵadvance(7);
        ɵɵproperty("results", ctx.results)("context", "refine");
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, DefaultValueAccessor, NgControlStatus, FormControlName, Autocomplete, BsAutocompleteList, BsDidYouMean, NgIf], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsRefine, [{
        type: Component,
        args: [{
                selector: "sq-refine",
                templateUrl: "./facet-refine.html"
            }]
    }], function () { return [{ type: FormBuilder }, { type: SearchService }, { type: ChangeDetectorRef }]; }, { results: [{
            type: Input
        }], autocompleteEnabled: [{
            type: Input
        }], suggestQuery: [{
            type: Input
        }], suggestDelay: [{
            type: Input
        }] }); })();

function BsMySearch_ng_container_1_div_1_span_3_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 7);
    ɵɵlistener("click", function BsMySearch_ng_container_1_div_1_span_3_Template_span_click_0_listener() { ɵɵrestoreView(_r8); const item_r2 = ɵɵnextContext(2).$implicit; const ctx_r6 = ɵɵnextContext(); return ctx_r6.removeItem(item_r2); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(1, 1, "msg#facet.mySearch.itemRemove"));
} }
const _c0$5 = function (a0) { return { "sq-metadata-border": a0 }; };
const _c1$4 = function (a0) { return { withFields: a0, asHTML: true }; };
function BsMySearch_ng_container_1_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 4);
    ɵɵelement(1, "span", 5);
    ɵɵpipe(2, "sqExpr");
    ɵɵtemplate(3, BsMySearch_ng_container_1_div_1_span_3_Template, 2, 3, "span", 6);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = ɵɵnextContext();
    const i_r3 = ctx_r9.index;
    const item_r2 = ctx_r9.$implicit;
    const ctx_r4 = ɵɵnextContext();
    ɵɵclassMapInterpolate1("px-1 ml-1 mb-1 sq-metadata-item sq-metadata-color-", ctx_r4.fields[i_r3], "");
    ɵɵproperty("ngClass", ɵɵpureFunction1(10, _c0$5, ctx_r4.useBadges));
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("title", ctx_r4.fields[i_r3]);
    ɵɵproperty("innerHTML", ɵɵpipeBind2(2, 7, item_r2.display, ɵɵpureFunction1(12, _c1$4, ctx_r4.displayFieldNames)), ɵɵsanitizeHtml);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r4.allowDeletion);
} }
function BsMySearch_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsMySearch_ng_container_1_div_1_Template, 4, 14, "div", 3);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !item_r2.hidden);
} }
function BsMySearch_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div");
    ɵɵelement(1, "hr");
    ɵɵelementStart(2, "i", 8);
    ɵɵlistener("click", function BsMySearch_div_2_Template_i_click_2_listener() { ɵɵrestoreView(_r11); const ctx_r10 = ɵɵnextContext(); return ctx_r10.collapsed = !ctx_r10.collapsed; });
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵclassMapInterpolate1("fas fa-chevron-circle-", ctx_r1.collapsed ? "down" : "up", "");
} }
class BsMySearch extends AbstractFacet {
    constructor(searchService) {
        super();
        this.searchService = searchService;
        /** Display icon to delete items */
        this.allowDeletion = true;
        /** Display each item's field */
        this.displayFieldNames = false;
        /** Make the div collapsible */
        this.collapsible = false;
        /** Add a badge likely style to items */
        this.useBadges = false;
        /** Wether we Ignore text and fielded search */
        this.ignoreText = true;
        /** Items of those facets will be excluded  */
        this.excludedFacets = ["search-form"];
        this.collapsed = false;
        this.items = [];
        this.fields = [];
        this.clearAction = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.filters.clear",
            action: () => this.clear(),
        });
    }
    ngOnChanges(changes) {
        var _a, _b;
        if (!!changes["results"]) {
            /** Initialize items based on input values */
            this.items = this.ignoreText
                ? ((_a = this.searchService.breadcrumbs) === null || _a === void 0 ? void 0 : _a.items.filter((item) => item.expr && !(item.expr && !item.expr.field && !item.expr.isStructured) && !this.excludedFacets.includes(item.facet))) || []
                : ((_b = this.searchService.breadcrumbs) === null || _b === void 0 ? void 0 : _b.items) || [];
            /** Retrieve the field name of each item */
            this.fields = [];
            for (const item of this.items) {
                this.fields.push(this.getField(item));
            }
        }
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
    removeItem(item) {
        this.searchService.removeBreadcrumbsItem(item);
    }
    get isEmpty() {
        return this.items.length === 0;
    }
    get actions() {
        const actions = [];
        if (!this.isEmpty && this.allowDeletion) {
            actions.push(this.clearAction);
        }
        return actions;
    }
    clear() {
        for (const item of this.items) {
            this.searchService.removeBreadcrumbsItem(item);
        }
    }
}
BsMySearch.ɵfac = function BsMySearch_Factory(t) { return new (t || BsMySearch)(ɵɵdirectiveInject(SearchService)); };
BsMySearch.ɵcmp = ɵɵdefineComponent({ type: BsMySearch, selectors: [["sq-facet-mysearch"]], inputs: { results: "results", allowDeletion: "allowDeletion", displayFieldNames: "displayFieldNames", collapsible: "collapsible", useBadges: "useBadges", ignoreText: "ignoreText", excludedFacets: "excludedFacets" }, features: [ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature], decls: 3, vars: 3, consts: [[1, "my-search", "d-flex", "flex-row", "align-items-center", "flex-wrap", 3, "ngClass"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "class", "ngClass", 4, "ngIf"], [3, "ngClass"], [3, "innerHTML", "title"], ["class", "far fa-times-circle pl-1", "role", "button", 3, "title", "click", 4, "ngIf"], ["role", "button", 1, "far", "fa-times-circle", "pl-1", 3, "title", "click"], [3, "click"]], template: function BsMySearch_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, BsMySearch_ng_container_1_Template, 2, 1, "ng-container", 1);
        ɵɵelementEnd();
        ɵɵtemplate(2, BsMySearch_div_2_Template, 3, 3, "div", 2);
    } if (rf & 2) {
        ɵɵproperty("ngClass", ctx.collapsed ? "collapsed-view" : "expanded-view");
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.items);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.collapsible && !ctx.isEmpty);
    } }, directives: [NgClass, NgForOf, NgIf], pipes: [ExprPipe, MessagePipe], styles: [".my-search[_ngcontent-%COMP%]{font-size:.85rem}.sq-metadata-item[_ngcontent-%COMP%]{background-color:#fff;border-radius:20px;cursor:pointer}.sq-metadata-item[_ngcontent-%COMP%]:hover{background-color:#d3d3d3;opacity:.8}.sq-metadata-item[_ngcontent-%COMP%]   .fa-times-circle[_ngcontent-%COMP%]:hover{cursor:pointer;opacity:.8}.sq-metadata-border[_ngcontent-%COMP%]{border:1px solid}.text-decoration-line-through[_ngcontent-%COMP%]{text-decoration:line-through}.collapsed-view[_ngcontent-%COMP%]{height:29px;overflow-y:hidden}.expanded-view[_ngcontent-%COMP%]{height:unset}.fa-chevron-circle-down[_ngcontent-%COMP%], .fa-chevron-circle-up[_ngcontent-%COMP%]{color:#a9a9a9;left:49%;position:relative;top:-5px}.fa-chevron-circle-down[_ngcontent-%COMP%]:hover, .fa-chevron-circle-up[_ngcontent-%COMP%]:hover{cursor:pointer;opacity:.7}hr[_ngcontent-%COMP%]{margin-bottom:0!important;margin-top:0!important;width:30%}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsMySearch, [{
        type: Component,
        args: [{
                selector: "sq-facet-mysearch",
                templateUrl: "./facet-mysearch.html",
                styleUrls: ["./facet-mysearch.scss"],
            }]
    }], function () { return [{ type: SearchService }]; }, { results: [{
            type: Input
        }], allowDeletion: [{
            type: Input
        }], displayFieldNames: [{
            type: Input
        }], collapsible: [{
            type: Input
        }], useBadges: [{
            type: Input
        }], ignoreText: [{
            type: Input
        }], excludedFacets: [{
            type: Input
        }] }); })();

const _c0$6 = ["slider"];
function BsFacetRange_ng_container_0_ng5_slider_3_Template(rf, ctx) { if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ng5-slider", 4);
    ɵɵlistener("valueChange", function BsFacetRange_ng_container_0_ng5_slider_3_Template_ng5_slider_valueChange_0_listener($event) { ɵɵrestoreView(_r5); const ctx_r4 = ɵɵnextContext(2); return ctx_r4.value = $event; })("highValueChange", function BsFacetRange_ng_container_0_ng5_slider_3_Template_ng5_slider_highValueChange_0_listener($event) { ɵɵrestoreView(_r5); const ctx_r6 = ɵɵnextContext(2); return ctx_r6.highValue = $event; })("userChangeEnd", function BsFacetRange_ng_container_0_ng5_slider_3_Template_ng5_slider_userChangeEnd_0_listener($event) { ɵɵrestoreView(_r5); const ctx_r7 = ɵɵnextContext(2); return ctx_r7.onUserChangeEnd($event); });
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("value", ctx_r2.value)("highValue", ctx_r2.highValue)("options", ctx_r2.options)("manualRefresh", ctx_r2.manualRefresh);
} }
function BsFacetRange_ng_container_0_span_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, "msg#facet.range.unavailable"));
} }
function BsFacetRange_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 1, 2);
    ɵɵtemplate(3, BsFacetRange_ng_container_0_ng5_slider_3_Template, 1, 4, "ng5-slider", 3);
    ɵɵtemplate(4, BsFacetRange_ng_container_0_span_4_Template, 3, 3, "span", 0);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(3);
    ɵɵproperty("ngIf", ctx_r0.sliderActive);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r0.sliderActive);
} }
var RoundTarget;
(function (RoundTarget) {
    RoundTarget[RoundTarget["number"] = 0] = "number";
    RoundTarget[RoundTarget["year"] = 1] = "year";
    RoundTarget[RoundTarget["month"] = 2] = "month";
    RoundTarget[RoundTarget["week"] = 3] = "week";
    RoundTarget[RoundTarget["day"] = 4] = "day";
})(RoundTarget || (RoundTarget = {}));
var RoundType;
(function (RoundType) {
    RoundType[RoundType["up"] = 0] = "up";
    RoundType[RoundType["down"] = 1] = "down";
    RoundType[RoundType["nearest"] = 2] = "nearest";
})(RoundType || (RoundType = {}));
class BsFacetRange extends AbstractFacet {
    constructor(facetService, appService, searchService, formatService, intlService, uiService, advancedService, exprBuilder) {
        super();
        this.facetService = facetService;
        this.appService = appService;
        this.searchService = searchService;
        this.formatService = formatService;
        this.intlService = intlService;
        this.uiService = uiService;
        this.advancedService = advancedService;
        this.exprBuilder = exprBuilder;
        this.manualRefresh = new EventEmitter();
        this.translate = (value, label) => {
            const value1 = this.roundNearest(value); // to accommodate fractional steps generated for years/months
            if (this.format) {
                if (this.column && AppService.isDate(this.column)) {
                    const date = new Date(value1);
                    const m = moment(date);
                    return this.intlService.formatMessage(this.format, { date: date, time: Utils.getTime(date), weekDay: m.weekday(), week: m.week(), weekYear: m.weekYear() });
                }
                else {
                    return this.intlService.formatMessage(this.format, { value: value1 });
                }
            }
            return this.formatService.formatFieldValue(this.column && AppService.isDate(this.column) ? new Date(value1) : value1, this.column);
        };
        this.onResize = () => {
            this.manualRefresh.emit();
        };
        this.clearFiltersAction = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.range.clear",
            action: () => this.clearRange()
        });
        this.applyFiltersAction = new Action({
            icon: "fas fa-filter",
            title: "msg#facet.range.apply",
            action: () => this.applyRange()
        });
    }
    roundAdjustment(value, multiple, roundType) {
        switch (roundType) {
            case RoundType.up:
                return multiple - value % multiple;
            default:
            case RoundType.down:
                return -(value % multiple);
            case RoundType.nearest: {
                const adjustUp = multiple - value % multiple;
                const adjustDown = -(value % multiple);
                return Math.abs(adjustUp) <= Math.abs(adjustDown) ? adjustUp : adjustDown;
            }
        }
    }
    _roundNumberUp(value, step) {
        return (value >= 0 ? Math.ceil(value / step) : Math.floor(value / step)) * step;
    }
    _roundNumberDown(value, step) {
        return (value >= 0 ? Math.floor(value / step) : Math.ceil(value / step)) * step;
    }
    _roundNumber(value, step, roundType) {
        switch (roundType) {
            case RoundType.up:
                return this._roundNumberUp(value, step);
            default:
            case RoundType.down:
                return this._roundNumberDown(value, step);
            case RoundType.nearest: {
                const up = this._roundNumberUp(value, step);
                const down = this._roundNumberDown(value, step);
                return Math.abs(up - value) <= Math.abs(down - value) ? up : down;
            }
        }
    }
    _getNearestDate(date, upper, lower) {
        return Math.abs(upper.getTime() - date.getTime()) <= Math.abs(lower.getTime() - date.getTime()) ? upper : lower;
    }
    _getNearestTargetDate(date, target) {
        switch (target) {
            case RoundTarget.year: {
                return this._getNearestDate(date, new Date(date.getFullYear() + 1, 0), new Date(date.getFullYear(), 0));
            }
            case RoundTarget.month: {
                return this._getNearestDate(date, new Date(date.getFullYear(), date.getMonth() + 1), new Date(date.getFullYear(), date.getMonth()));
            }
            default:
            case RoundTarget.week:
            case RoundTarget.day: {
                return this._getNearestDate(date, new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1), new Date(date.getFullYear(), date.getMonth(), date.getDate()));
            }
        }
    }
    _round(value, step, target, multiple, roundType = RoundType.down) {
        if (this.column && AppService.isDate(this.column)) {
            let date = new Date(value);
            if (roundType === RoundType.nearest) {
                // round to the nearest target year, month or day to adjust for the linear step size and leap years
                date = this._getNearestTargetDate(date, target);
            }
            switch (target) {
                case RoundTarget.year: {
                    const year = date.getFullYear();
                    if (year % multiple !== 0 || date.getMonth() !== 0 || date.getDate() !== 1 ||
                        date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0) {
                        date = new Date(year + this.roundAdjustment(year, multiple, roundType), 0);
                    }
                    break;
                }
                case RoundTarget.month: {
                    const month = date.getMonth();
                    if (month % multiple !== 0 || date.getDate() !== 1 ||
                        date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0) {
                        date = new Date(date.getFullYear(), month + this.roundAdjustment(month, multiple, roundType));
                    }
                    break;
                }
                case RoundTarget.week: {
                    const day = date.getDay();
                    // First, round to Monday
                    if (day !== 1 /*Monday*/ ||
                        date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0) {
                        let adjust;
                        const up = 7 - (day - 1);
                        const down = -(day - 1);
                        switch (roundType) {
                            case RoundType.up:
                                adjust = up;
                                break;
                            default:
                            case RoundType.down:
                                adjust = down;
                                break;
                            case RoundType.nearest:
                                adjust = Math.abs(up) >= Math.abs(down) ? up : down;
                                break;
                        }
                        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + adjust);
                    }
                    // Then, round to week number
                    const m = moment(date);
                    const week = m.week();
                    if (week % multiple !== 0) {
                        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (this.roundAdjustment(week, multiple, roundType) * 7));
                    }
                    break;
                }
                case RoundTarget.day: {
                    const _date = date.getDate();
                    if (date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0) {
                        date = new Date(date.getFullYear(), date.getMonth(), _date + this.roundAdjustment(_date, multiple, roundType));
                    }
                    break;
                }
            }
            return date.getTime();
        }
        else {
            return this._roundNumber(value, step, roundType);
        }
    }
    round(value, roundType = RoundType.down) {
        return this._round(value, this.options.step || 1, this.roundTarget, this.roundMultiple, roundType);
    }
    roundDown(value) {
        return this.round(value, RoundType.down);
    }
    roundUp(value) {
        return this.round(value, RoundType.up);
    }
    roundNearest(value) {
        return this.round(value, RoundType.nearest);
    }
    //TODO - remove fix engine hack
    fixDate(dateStr) {
        if (dateStr) {
            const secondsSep = dateStr.lastIndexOf(":");
            if (secondsSep > 0) {
                let seconds = Utils.toInt(dateStr.substr(secondsSep + 1));
                if (seconds < 0) {
                    seconds = 0;
                }
                else if (seconds > 59) {
                    seconds = 59;
                }
                dateStr = dateStr.substr(0, secondsSep + 1) + seconds;
            }
        }
        return dateStr;
    }
    initMinMax() {
        var _a;
        let min = 0;
        let max = 0;
        if (!Utils.isEmpty(this.min) && (!Utils.isEmpty(this.max))) {
            min = this.parseValue(!!new Date(this.min).getDate() ? new Date(this.min) : this.min);
            max = this.parseValue(!!new Date(this.max).getDate() ? new Date(this.max) : this.max);
        }
        else {
            if ((_a = this.data) === null || _a === void 0 ? void 0 : _a.items) {
                const item = this.data.items[0];
                if (item && item.operatorResults) {
                    if (this.column && AppService.isDate(this.column)) {
                        //TODO - remove fix engine hack
                        if (Utils.isString(item.operatorResults.min)) {
                            const date = Utils.fromSysDateStr(this.fixDate(item.operatorResults.min));
                            if (Utils.isDate(date)) {
                                item.operatorResults.min = date;
                            }
                        }
                        if (Utils.isString(item.operatorResults.max)) {
                            const date = Utils.fromSysDateStr(this.fixDate(item.operatorResults.max));
                            if (Utils.isDate(date)) {
                                item.operatorResults.max = date;
                            }
                        }
                        min = Utils.isDate(item.operatorResults.min) ? item.operatorResults.min.getTime() : 0;
                        max = Utils.isDate(item.operatorResults.max) ? item.operatorResults.max.getTime() : 0;
                    }
                    else {
                        min = Utils.isNumber(item.operatorResults.min) ? item.operatorResults.min : 0;
                        max = Utils.isNumber(item.operatorResults.max) ? item.operatorResults.max : 0;
                    }
                }
            }
        }
        this.options.floor = min;
        this.options.ceil = max;
    }
    parseValue(value) {
        if (Utils.isDate(value)) {
            return value.getTime();
        }
        if (!Utils.isString(value)) {
            return 0;
        }
        let _value;
        if (this.column && this.column.parser) {
            const str = this.formatService.parseValue(value, this.column.parser);
            _value = Utils.toNumber(str);
        }
        if (Utils.isUndefined(_value)) {
            _value = this.column && AppService.isDate(this.column) ?
                Utils.toDuration(value) :
                Utils.toSize(value);
        }
        return _value;
    }
    initStep() {
        // Select the first step definition where the range >= stepDef.minRange
        let format;
        let step;
        if (this.stepDefs) {
            for (const stepDef of this.stepDefs) {
                if (stepDef.step) {
                    const thisStep = this.parseValue(stepDef.step);
                    if (thisStep && stepDef.active) {
                        if (!stepDef.minRange) {
                            step = thisStep;
                            format = stepDef.format;
                            break;
                        }
                        else {
                            // Round min/max for thisStep
                            const { roundTarget, roundMultiple } = this.getRoundTarget(thisStep);
                            const min = this._round(this.options.floor || 0, thisStep, roundTarget, roundMultiple, RoundType.down);
                            const max = this._round(this.options.ceil || 0, thisStep, roundTarget, roundMultiple, RoundType.up);
                            const range = max - min;
                            const minRange = this.parseValue(stepDef.minRange);
                            if (range >= minRange) {
                                step = thisStep;
                                format = stepDef.format;
                                break;
                            }
                        }
                    }
                }
            }
        }
        if (!step) {
            // Default step, default formatting
            step = this.column && AppService.isDate(this.column) ? Utils.oneDay : 1;
        }
        // Adjust step for year/month rounding (we assume daylight savings will balance out over the year)
        const { roundTarget, roundMultiple } = this.getRoundTarget(step);
        switch (roundTarget) {
            case RoundTarget.year:
                step = roundMultiple * 365.25 * Utils.oneDay;
                break;
            case RoundTarget.month:
                step = roundMultiple * 365.25 * Utils.oneDay / 12;
                break;
        }
        this.roundTarget = roundTarget;
        this.roundMultiple = roundMultiple;
        // Set default format based on roundTarget
        if (!format) {
            switch (this.roundTarget) {
                case RoundTarget.year:
                    format = "msg#facet.range.year";
                    break;
                case RoundTarget.month:
                    format = "msg#facet.range.monthYear";
                    break;
                case RoundTarget.week:
                    format = "msg#facet.range.weekYear";
                    break;
                default:
                    format = "";
                    break;
            }
        }
        this.options.step = step;
        this.format = format;
    }
    getRoundTarget(step) {
        const ret = {
            roundTarget: RoundTarget.number,
            roundMultiple: 1
        };
        if (this.column && AppService.isDate(this.column)) {
            if (step % (365 * Utils.oneDay) === 0) {
                ret.roundTarget = RoundTarget.year;
                ret.roundMultiple = step / (365 * Utils.oneDay);
            }
            else if (step % (30 * Utils.oneDay) === 0) {
                ret.roundTarget = RoundTarget.month;
                ret.roundMultiple = step / (30 * Utils.oneDay);
            }
            else if (step % (7 * Utils.oneDay) === 0) {
                ret.roundTarget = RoundTarget.week;
                ret.roundMultiple = step / (7 * Utils.oneDay);
            }
            else if (step % Utils.oneDay === 0) {
                ret.roundTarget = RoundTarget.day;
                ret.roundMultiple = step / Utils.oneDay;
            }
        }
        return ret;
    }
    init() {
        this.options = {
            draggableRange: true,
            enforceStep: false,
            translate: this.translate
        };
        this.initMinMax();
        this.initStep();
        let ceil = this.options.ceil || 0;
        let floor = this.options.floor || 0;
        this.sliderActive = ceil > floor;
        if (ceil > floor) {
            floor = this.options.floor = this.roundDown(floor);
            ceil = this.options.ceil = this.roundUp(ceil);
        }
        const [from, to] = this.getRange();
        this.rangeActive = !Utils.isUndefined(from) || !Utils.isUndefined(to);
        this.rangeSelected = false;
        this.value = this.startValue = Math.max(from || floor, floor);
        this.highValue = this.startHighValue = Math.min(to || ceil, ceil);
    }
    ngOnChanges(changes) {
        if (!this.initDone) {
            this.initDone = true;
            this.localeChange = Utils.subscribe(this.intlService.events, (value) => {
                this.manualRefresh.emit();
            });
        }
        if (!!changes["results"]) {
            this.data = this.facetService.getAggregation(this.aggregation, this.results);
            this.column = this.data && this.appService.getColumn(this.data.column);
            this.init();
        }
    }
    ngAfterViewInit() {
        this.uiService.addElementResizeListener(this.slider.nativeElement, this.onResize);
    }
    ngOnDestroy() {
        if (this.localeChange) {
            this.localeChange.unsubscribe();
        }
        if (this.uiService && this.slider) {
            this.uiService.removeElementResizeListener(this.slider.nativeElement, this.onResize);
        }
    }
    onUserChangeEnd(changeContext) {
        this.rangeSelected = this.value !== this.startValue || this.highValue !== this.startHighValue;
    }
    getRange() {
        var _a, _b;
        if (this.column) {
            let expr;
            let value;
            const expression = (_b = (_a = this.searchService.query) === null || _a === void 0 ? void 0 : _a.findSelect(this.column.name)) === null || _b === void 0 ? void 0 : _b.expression;
            if (expression) {
                expr = this.appService.parseExpr(expression);
                if (expr instanceof Expr) {
                    if (expr.values && expr.values.length > 1) {
                        value = expr.values;
                    }
                    else {
                        value = expr.value;
                    }
                    if (!Utils.isArray(value)) {
                        if (expr.operator === 3 /* gte */) {
                            value = [value, undefined];
                        }
                        else if (expr.operator === 5 /* lte */) {
                            value = [undefined, value];
                        }
                    }
                    value = value.map((val) => val ? this.advancedService.castAdvancedValue(val, this.column) : val);
                    if (AppService.isDate(this.column)) {
                        value = value.map((val) => val ? new Date(val).getTime() : val);
                    }
                    return value;
                }
            }
        }
        return [undefined, undefined];
    }
    setRange(from, to) {
        var _a, _b;
        let valFrom;
        let valTo;
        let expression;
        if (this.column) {
            valFrom = AppService.isDate(this.column) && Utils.isNumber(from) ? new Date(from) : from;
            valTo = AppService.isDate(this.column) && Utils.isNumber(to) ? new Date(to) : to;
            if (!!valFrom && !!valTo) {
                expression = this.exprBuilder.makeRangeExpr(this.column.name, valFrom, valTo);
            }
            else if (!!valFrom) {
                expression = this.exprBuilder.makeNumericalExpr(this.column.name, '>=', valFrom);
            }
            else if (!!valTo) {
                expression = this.exprBuilder.makeNumericalExpr(this.column.name, '<=', valTo);
            }
            (_a = this.searchService.query) === null || _a === void 0 ? void 0 : _a.removeSelect(this.column.name);
            if (expression) {
                (_b = this.searchService.query) === null || _b === void 0 ? void 0 : _b.addSelect(expression, this.column.name);
            }
        }
    }
    applyRange() {
        this.setRange(this.roundNearest(this.value), this.roundNearest(this.highValue));
        this.searchService.search();
    }
    clearRange() {
        this.setRange(undefined, undefined);
        this.searchService.search();
    }
    get actions() {
        const actions = [];
        if (this.rangeSelected) {
            actions.push(this.applyFiltersAction);
        }
        if (this.rangeActive) {
            actions.push(this.clearFiltersAction);
        }
        return actions;
    }
}
BsFacetRange.ɵfac = function BsFacetRange_Factory(t) { return new (t || BsFacetRange)(ɵɵdirectiveInject(FacetService), ɵɵdirectiveInject(AppService), ɵɵdirectiveInject(SearchService), ɵɵdirectiveInject(FormatService), ɵɵdirectiveInject(IntlService), ɵɵdirectiveInject(UIService), ɵɵdirectiveInject(AdvancedService), ɵɵdirectiveInject(ExprBuilder)); };
BsFacetRange.ɵcmp = ɵɵdefineComponent({ type: BsFacetRange, selectors: [["sq-facet-range"]], viewQuery: function BsFacetRange_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0$6, true);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.slider = _t.first);
    } }, inputs: { name: "name", results: "results", aggregation: "aggregation", min: "min", max: "max", stepDefs: "stepDefs" }, features: [ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "card-body"], ["slider", ""], [3, "value", "highValue", "options", "manualRefresh", "valueChange", "highValueChange", "userChangeEnd", 4, "ngIf"], [3, "value", "highValue", "options", "manualRefresh", "valueChange", "highValueChange", "userChangeEnd"]], template: function BsFacetRange_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsFacetRange_ng_container_0_Template, 5, 2, "ng-container", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.data);
    } }, directives: [NgIf, ɵa], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsFacetRange, [{
        type: Component,
        args: [{
                selector: "sq-facet-range",
                templateUrl: "./facet-range.html"
            }]
    }], function () { return [{ type: FacetService }, { type: AppService }, { type: SearchService }, { type: FormatService }, { type: IntlService }, { type: UIService }, { type: AdvancedService }, { type: ExprBuilder }]; }, { name: [{
            type: Input
        }], results: [{
            type: Input
        }], aggregation: [{
            type: Input
        }], min: [{
            type: Input
        }], max: [{
            type: Input
        }], stepDefs: [{
            type: Input
        }], slider: [{
            type: ViewChild,
            args: ["slider", { static: false }]
        }] }); })();

const _c0$7 = ["facet"];
function BsFacetMultiComponent_div_0_div_1_span_4_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 9);
    ɵɵlistener("click", function BsFacetMultiComponent_div_0_div_1_span_4_Template_span_click_0_listener($event) { ɵɵrestoreView(_r8); const facet_r3 = ɵɵnextContext().$implicit; const ctx_r6 = ɵɵnextContext(2); return ctx_r6.clearFacetFilters(facet_r3, $event); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelement(2, "i", 10);
    ɵɵelement(3, "i", 11);
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵpropertyInterpolate("sqTooltip", ɵɵpipeBind1(1, 1, "msg#facet.filters.clear"));
} }
const _c1$5 = function (a0) { return { count: a0 }; };
const _c2$4 = function (a0) { return { values: a0 }; };
function BsFacetMultiComponent_div_0_div_1_span_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 12);
    ɵɵpipe(1, "sqMessage");
    ɵɵtext(2);
    ɵɵpipe(3, "sqNumber");
    ɵɵelementEnd();
} if (rf & 2) {
    const facet_r3 = ɵɵnextContext().$implicit;
    ɵɵpropertyInterpolate("title", ɵɵpipeBind2(1, 2, "msg#facet.filterItemCountTooltip", ɵɵpureFunction1(9, _c2$4, ɵɵpureFunction1(7, _c1$5, facet_r3.$count))));
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(3, 5, facet_r3.$count), " ");
} }
const _c3$3 = function (a0, a1) { return { "list-group-item-success": a0, "disabled": a1 }; };
function BsFacetMultiComponent_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 4);
    ɵɵlistener("click", function BsFacetMultiComponent_div_0_div_1_Template_div_click_0_listener() { ɵɵrestoreView(_r11); const facet_r3 = ctx.$implicit; const ctx_r10 = ɵɵnextContext(2); return ctx_r10.openFacet(facet_r3); });
    ɵɵelementStart(1, "span", 5);
    ɵɵtext(2);
    ɵɵpipe(3, "sqMessage");
    ɵɵelementEnd();
    ɵɵtemplate(4, BsFacetMultiComponent_div_0_div_1_span_4_Template, 4, 3, "span", 6);
    ɵɵtemplate(5, BsFacetMultiComponent_div_0_div_1_span_5_Template, 4, 11, "span", 7);
    ɵɵelement(6, "i", 8);
    ɵɵelementEnd();
} if (rf & 2) {
    const facet_r3 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpureFunction2(6, _c3$3, facet_r3.$hasFiltered, !facet_r3.$hasData));
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(3, 4, facet_r3.title));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", facet_r3.$hasFiltered);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r2.showCount);
} }
function BsFacetMultiComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵtemplate(1, BsFacetMultiComponent_div_0_div_1_Template, 7, 9, "div", 3);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r0.facets);
} }
function BsFacetMultiComponent_ng_container_1_sq_facet_list_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "sq-facet-list", 15, 16);
} if (rf & 2) {
    const ctx_r12 = ɵɵnextContext(2);
    ɵɵproperty("name", ctx_r12.openedFacet.name)("results", ctx_r12.results)("aggregation", ctx_r12.openedFacet.aggregation)("showCount", ctx_r12.openedFacet.showCount)("searchable", ctx_r12.openedFacet.searchable)("allowExclude", ctx_r12.openedFacet.allowExclude)("allowOr", ctx_r12.openedFacet.allowOr)("allowAnd", ctx_r12.openedFacet.allowAnd)("displayEmptyDistributionIntervals", ctx_r12.openedFacet.displayEmptyDistributionIntervals)("showProgressBar", ctx_r12.showProgressBar);
} }
function BsFacetMultiComponent_ng_container_1_sq_facet_tree_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "sq-facet-tree", 17, 16);
} if (rf & 2) {
    const ctx_r13 = ɵɵnextContext(2);
    ɵɵproperty("name", ctx_r13.openedFacet.name)("results", ctx_r13.results)("aggregation", ctx_r13.openedFacet.aggregation)("showCount", ctx_r13.openedFacet.showCount)("allowExclude", ctx_r13.openedFacet.allowExclude)("allowOr", ctx_r13.openedFacet.allowOr);
} }
function BsFacetMultiComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsFacetMultiComponent_ng_container_1_sq_facet_list_1_Template, 2, 10, "sq-facet-list", 13);
    ɵɵtemplate(2, BsFacetMultiComponent_ng_container_1_sq_facet_tree_2_Template, 2, 6, "sq-facet-tree", 14);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r1.openedFacet.type === "list");
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r1.openedFacet.type === "tree");
} }
class BsFacetMultiComponent extends AbstractFacet {
    constructor(facetService, changeDetectorRef) {
        super();
        this.facetService = facetService;
        this.changeDetectorRef = changeDetectorRef;
        this.showCount = true;
        this.showProgressBar = false; // will display or not item count as progress bar
        this.events = new EventEmitter();
        this.backAction = new Action({
            name: "back",
            icon: "fas fa-arrow-left",
            title: "msg#facet.filters.back",
            action: () => {
                this.openedFacet = undefined;
                this.events.next(undefined);
                this.changeDetectorRef.detectChanges();
            }
        });
        this.clearAllFiltersAction = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.filters.clear",
            action: () => {
                const facetsWithFiltered = this.facets.filter((facet) => facet.$hasFiltered).map(facet => facet.name);
                this.facetService.clearFiltersSearch(facetsWithFiltered, true);
            }
        });
    }
    /**
     * If a sub-facet is opened, add a Back button and forward
     * the actions of the facet.
     */
    get actions() {
        const actions = [];
        if (this.openedFacet) {
            actions.push(this.backAction);
        }
        else {
            const hasFiltered = this.facets.some(facet => facet.$hasFiltered);
            if (hasFiltered)
                actions.push(this.clearAllFiltersAction);
        }
        if (this.facetComponent) {
            actions.push(...this.facetActions);
        }
        return actions;
    }
    /**
     * Return the actions of the child facet
     */
    get facetActions() {
        if (this.facetComponent) {
            return this.facetComponent.actions;
        }
        return [];
    }
    /**
     * Open this sub facet
     * @param facet
     */
    openFacet(facet) {
        this.openedFacet = facet;
        this.events.next(facet);
        this.changeDetectorRef.detectChanges();
    }
    clearFacetFilters(facet, e) {
        e.stopPropagation();
        this.facetService.clearFiltersSearch(facet.name, true);
        return false;
    }
    /**
     * Return the number of items to display for a given facet
     * @param facet
     */
    getFacetCount(facet) {
        const agg = this.results.aggregations.find(agg => Utils.eqNC(agg.name, facet.aggregation)); // avoid calling getAggregation() which is costly for trees
        if (!(agg === null || agg === void 0 ? void 0 : agg.items))
            return "";
        const count = this.facetService.getAggregationCount(facet.aggregation); // configured count (default: 10)
        const aggItemCounter = (!agg.isDistribution || facet.displayEmptyDistributionIntervals)
            ? agg.items.length
            : agg.items.filter(item => item.count > 0).length;
        return aggItemCounter >= count ? `${count}+` : `${aggItemCounter}`;
    }
    /**
     * Return whether a given facet has been used in the current context
     * @param facet
     */
    hasFiltered(facet) {
        return this.facetService.hasFiltered(facet.name);
    }
    /**
     * When the results change, actualize count, hasData and hasFiltered
     * which are displayed in the template.
     */
    ngOnChanges() {
        this.facets.forEach(facet => {
            facet.$count = this.getFacetCount(facet);
            facet.$hasData = this.facetService.hasData(facet.aggregation, this.results);
            facet.$hasFiltered = this.hasFiltered(facet);
        });
        this.changeDetectorRef.detectChanges();
    }
}
BsFacetMultiComponent.ɵfac = function BsFacetMultiComponent_Factory(t) { return new (t || BsFacetMultiComponent)(ɵɵdirectiveInject(FacetService), ɵɵdirectiveInject(ChangeDetectorRef)); };
BsFacetMultiComponent.ɵcmp = ɵɵdefineComponent({ type: BsFacetMultiComponent, selectors: [["sq-facet-multi"]], viewQuery: function BsFacetMultiComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0$7, true);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.facetComponent = _t.first);
    } }, inputs: { results: "results", facets: "facets", showCount: "showCount", showProgressBar: "showProgressBar" }, outputs: { events: "events" }, features: [ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature], decls: 2, vars: 2, consts: [["class", "list-group list-group-flush", 4, "ngIf"], [4, "ngIf"], [1, "list-group", "list-group-flush"], ["class", "open-facet d-flex flex-row list-group-item border-0 list-group-item-action px-3 py-1 align-items-center", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "open-facet", "d-flex", "flex-row", "list-group-item", "border-0", "list-group-item-action", "px-3", "py-1", "align-items-center", 3, "ngClass", "click"], [1, "flex-grow-1"], ["class", "fa-stack icons-group", 3, "sqTooltip", "click", 4, "ngIf"], ["class", "mx-2 text-muted small", 3, "title", 4, "ngIf"], [1, "fas", "fa-caret-right"], [1, "fa-stack", "icons-group", 3, "sqTooltip", "click"], [1, "ml-2", "far", "fa-minus-square", "fa-stack-1x", "icons", "icon-hover"], [1, "ml-2", "far", "fa-check-square", "fa-stack-1x", "icons", "icon-default"], [1, "mx-2", "text-muted", "small", 3, "title"], [3, "name", "results", "aggregation", "showCount", "searchable", "allowExclude", "allowOr", "allowAnd", "displayEmptyDistributionIntervals", "showProgressBar", 4, "ngIf"], [3, "name", "results", "aggregation", "showCount", "allowExclude", "allowOr", 4, "ngIf"], [3, "name", "results", "aggregation", "showCount", "searchable", "allowExclude", "allowOr", "allowAnd", "displayEmptyDistributionIntervals", "showProgressBar"], ["facet", ""], [3, "name", "results", "aggregation", "showCount", "allowExclude", "allowOr"]], template: function BsFacetMultiComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsFacetMultiComponent_div_0_Template, 2, 1, "div", 0);
        ɵɵtemplate(1, BsFacetMultiComponent_ng_container_1_Template, 3, 2, "ng-container", 1);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !ctx.openedFacet);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.openedFacet);
    } }, directives: [NgIf, NgForOf, NgClass, TooltipDirective, BsFacetList, BsFacetTree], pipes: [MessagePipe, NumberPipe], styles: [".open-facet[_ngcontent-%COMP%]{cursor:pointer}.list-group-item.disabled[_ngcontent-%COMP%]{color:#d3d3d3}.icons-group[_ngcontent-%COMP%]{cursor:pointer}.icons-group[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]{transition:opacity .3s,transform .3s}.icons-group[_ngcontent-%COMP%]   .icons.icon-hover[_ngcontent-%COMP%]{opacity:0;transform:rotate(-180deg)}.icons-group[_ngcontent-%COMP%]:hover   .icon-default[_ngcontent-%COMP%]{opacity:0;transform:rotate(180deg)}.icons-group[_ngcontent-%COMP%]:hover   .icon-hover[_ngcontent-%COMP%]{opacity:1;transform:rotate(0deg)}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsFacetMultiComponent, [{
        type: Component,
        args: [{
                selector: 'sq-facet-multi',
                templateUrl: './facet-multi.component.html',
                styleUrls: ['./facet-multi.component.scss']
            }]
    }], function () { return [{ type: FacetService }, { type: ChangeDetectorRef }]; }, { results: [{
            type: Input
        }], facets: [{
            type: Input
        }], showCount: [{
            type: Input
        }], showProgressBar: [{
            type: Input
        }], events: [{
            type: Output
        }], facetComponent: [{
            type: ViewChild,
            args: ["facet", { static: false }]
        }] }); })();

function BsFacetTagCloud_li_1_i_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "i", 4);
} }
function BsFacetTagCloud_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li");
    ɵɵelementStart(1, "a", 2);
    ɵɵlistener("click", function BsFacetTagCloud_li_1_Template_a_click_1_listener($event) { ɵɵrestoreView(_r4); const data_r1 = ctx.$implicit; const ctx_r3 = ɵɵnextContext(); return ctx_r3.filterItem(data_r1, $event); });
    ɵɵtemplate(2, BsFacetTagCloud_li_1_i_2_Template, 1, 0, "i", 3);
    ɵɵtext(3);
    ɵɵpipe(4, "sqValue");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const data_r1 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵclassMapInterpolate1("sq-metadata-color-", data_r1.aggregation.column, "");
    ɵɵattribute("data-count", data_r1.item.count)("data-weight", ctx_r0.proportionalWeight ? data_r1.weight : null);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", data_r1.item.$filtered);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind2(4, 7, data_r1.item, data_r1.item.$column), " ");
} }
class BsFacetTagCloud extends AbstractFacet {
    constructor(facetService) {
        super();
        this.facetService = facetService;
        /** maximum number of data to be displayed in tag-cloud */
        this.limit = 50;
        /** the way data are collected from given aggregations: equal repartition between them or most relevant among all of them */
        this.uniformRepartition = false;
        /** show/hide number of occurrences of each item*/
        this.showCount = false;
        /** define the size of each displayed item: common size for all or proportional size based on their count */
        this.proportionalWeight = true;
        /** lowest count under which items will not be taken into account in tag-cloud data */
        this.countThreshold = 0;
        /** wether data are rendered following their count sorting or randomly */
        this.shuffleData = false;
        /** Isolate filtering results from other facets available in the app */
        this.isolateFacetFilters = false;
        this.aggregationsData = [];
        this.tagCloudData = [];
        this.filtered = [];
        // Default weight to be applied if proportionalWeight = false
        this.defaultWeight = 2;
        // Prefix for tag-cloud facet name to be used if isolateFacetFilters = true
        this.tagCloudFacetPrefix = "tag-cloud_";
        // Clear the current filters
        this.clearFilters = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.clearSelects",
            action: () => {
                if (Utils.isArray(this.aggregations)) {
                    for (const aggregation of this.aggregations)
                        this.facetService.clearFiltersSearch(this.getName(aggregation), true);
                }
                else {
                    this.facetService.clearFiltersSearch(this.getName(this.aggregations), true);
                }
            },
        });
    }
    ngOnChanges(changes) {
        if (!!changes["results"]) {
            /* reset filtered items */
            this.filtered = [];
            /* update tag-cloud data */
            this.tagCloudData = this.getTagCloudData();
        }
    }
    /**
     * Defines the tag-cloud data according to given inputs
     */
    getTagCloudData() {
        const aggregationsData = this.getAggregationsData();
        if (aggregationsData.length === 0) {
            return [];
        }
        else {
            let tmp = [];
            if (this.uniformRepartition) {
                aggregationsData.forEach((data) => {
                    const end = Math.floor(this.limit / aggregationsData.length);
                    // Firstly, take filtered items
                    tmp.push(...data
                        .items.filter((item) => item.$filtered)
                        .sort((a, b) => b.count - a.count)
                        .slice(0, end)
                        .map((item) => ({
                        aggregation: data,
                        item: item,
                        weight: this.proportionalWeight
                            ? item.count
                            : this.defaultWeight,
                    })));
                    // add most relevant items if threshold not attenuated
                    if (tmp.length < end) {
                        tmp.push(...data
                            .items.filter((item) => item.count > this.countThreshold && !item.$filtered)
                            .sort((a, b) => b.count - a.count)
                            .slice(0, end - tmp.length)
                            .map((item) => ({
                            aggregation: data,
                            item: item,
                            weight: this.proportionalWeight
                                ? item.count
                                : this.defaultWeight,
                        })));
                    }
                });
                tmp = tmp.sort((a, b) => b.item.count - a.item.count);
            }
            else {
                aggregationsData.forEach((data) => {
                    tmp.push(...data
                        .items.filter((item) => item.count > this.countThreshold || item.$filtered)
                        .map((item) => ({
                        aggregation: data,
                        item: item,
                        weight: this.proportionalWeight
                            ? item.count
                            : this.defaultWeight,
                    })));
                });
                const filtered = tmp.filter((elem) => elem.item.$filtered);
                if (filtered.length < this.limit) {
                    const notFiltered = tmp
                        .filter((elem) => !elem.item.$filtered)
                        .sort((a, b) => b.item.count - a.item.count);
                    tmp = [...filtered];
                    tmp.push(...notFiltered.slice(0, this.limit - filtered.length));
                }
                else {
                    tmp = filtered.slice(0, this.limit);
                }
            }
            // By default, sort the whole array with respect to its counts and update its elements weight value
            tmp = tmp
                .sort((a, b) => b.item.count - a.item.count)
                .map((elem) => (Object.assign(Object.assign({}, elem), { weight: this.proportionalWeight
                    ? this.scaleItemWeight(tmp, elem.item.count)
                    : this.defaultWeight })));
            // Shuffle the array
            if (this.shuffleData) {
                tmp = this.shuffle(tmp);
            }
            return tmp;
        }
    }
    /**
     * Invoked on click on an item in order to update the query
     * @param tagCloudItem
     * @param event
     */
    filterItem(tagCloudItem, event) {
        const name = this.getName(tagCloudItem.aggregation.name);
        const aggregation = tagCloudItem.aggregation;
        const item = tagCloudItem.item;
        if (!this.isFiltered(aggregation, item)) {
            this.facetService.addFilterSearch(name, aggregation, item);
        }
        else {
            this.facetService.removeFilterSearch(name, aggregation, item);
        }
        event.preventDefault();
    }
    /**
     * Define the possible actions according to the actual context
     */
    get actions() {
        const actions = [];
        if (this.isFiltering()) {
            actions.push(this.clearFilters);
        }
        return actions;
    }
    /**
     * Map the initial aggregations names to a list of Aggregation
     */
    getAggregationsData() {
        return []
            .concat(this.aggregations)
            .filter((agg) => this.facetService.hasData(agg, this.results))
            .map((agg) => this.facetService.getAggregation(agg, this.results))
            .map((data) => this.refreshFiltered(data));
    }
    /**
     * Update aggregation's data with respect to active filters in the query & breadcrumbs
     * @param data
     */
    refreshFiltered(data) {
        const facetName = this.getName(data.name);
        if (this.facetService.hasFiltered(facetName)) {
            // refresh filters from breadcrumbs
            const items = this.facetService.getAggregationItemsFiltered(facetName, data.valuesAreExpressions);
            items.forEach((item) => {
                if (!this.isFiltered(data, item)) {
                    item.$filtered = true;
                    this.filtered.push(item);
                }
            });
            // double check filters from query and breadcrumb
            data.items.forEach((item) => {
                const indx = this.facetService.filteredIndex(data, this.filtered, item);
                if (this.facetService.itemFiltered(facetName, data, item)) {
                    item.$filtered = true;
                    if (!this.isFiltered(data, item)) {
                        this.filtered.push(item);
                    }
                }
                else if (indx !== -1) {
                    // sometime facetService.itemFiltered() could returns false but item is present in breadcrumbs
                    item.$filtered = true;
                }
            });
        }
        return data;
    }
    /**
     * Returns facets names to be used according to @input() isolateFacetFilters
     * @param aggregationName
     */
    getName(aggregationName) {
        if (!this.isolateFacetFilters) {
            return aggregationName;
        }
        return this.tagCloudFacetPrefix + aggregationName;
    }
    /**
     * Linearly map the original weight to a discrete scale from 1 to 10
     * @param weight original weight
     */
    scaleItemWeight(tagCloudData, weight) {
        return (Math.round(((weight - tagCloudData[tagCloudData.length - 1].weight) /
            (tagCloudData[0].weight -
                tagCloudData[tagCloudData.length - 1].weight)) *
            9.0) + 1);
    }
    /**
     * Returns true if the supplied item within the given aggregation is filtering the query
     * @param data
     * @param item
     */
    isFiltered(data, item) {
        return this.facetService.filteredIndex(data, this.filtered, item) !== -1;
    }
    /**
     * Shuffle items of the supplied array
     * @param arr
     */
    shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const aux = arr[i];
            arr[i] = arr[j];
            arr[j] = aux;
        }
        return arr;
    }
    /**
     * Returns true if there is at least one active filter in the tag-cloud facet
     */
    isFiltering() {
        return []
            .concat(this.aggregations)
            .some((aggregationName) => this.facetService.hasFiltered(this.getName(aggregationName)));
    }
}
BsFacetTagCloud.ɵfac = function BsFacetTagCloud_Factory(t) { return new (t || BsFacetTagCloud)(ɵɵdirectiveInject(FacetService)); };
BsFacetTagCloud.ɵcmp = ɵɵdefineComponent({ type: BsFacetTagCloud, selectors: [["sq-facet-tag-cloud"]], inputs: { results: "results", aggregations: "aggregations", limit: "limit", uniformRepartition: "uniformRepartition", showCount: "showCount", proportionalWeight: "proportionalWeight", countThreshold: "countThreshold", shuffleData: "shuffleData", isolateFacetFilters: "isolateFacetFilters" }, features: [ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature], decls: 2, vars: 2, consts: [[1, "cloud"], [4, "ngFor", "ngForOf"], ["href", "#", 3, "click"], ["class", "far fa-check-circle filtered", 4, "ngIf"], [1, "far", "fa-check-circle", "filtered"]], template: function BsFacetTagCloud_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "ul", 0);
        ɵɵtemplate(1, BsFacetTagCloud_li_1_Template, 5, 10, "li", 1);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵattribute("data-show-count", ctx.showCount ? "" : null);
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.tagCloudData);
    } }, directives: [NgForOf, NgIf], pipes: [ValuePipe], styles: ["ul.cloud[_ngcontent-%COMP%]{align-items:center;display:flex;flex-wrap:wrap;justify-content:center;list-style:none;overflow-wrap:anywhere;padding-left:0}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"1\"][_ngcontent-%COMP%]{--size:1}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"2\"][_ngcontent-%COMP%]{--size:2}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"3\"][_ngcontent-%COMP%]{--size:3}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"4\"][_ngcontent-%COMP%]{--size:4}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"5\"][_ngcontent-%COMP%]{--size:5}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"6\"][_ngcontent-%COMP%]{--size:6}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"7\"][_ngcontent-%COMP%]{--size:7}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"8\"][_ngcontent-%COMP%]{--size:8}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"9\"][_ngcontent-%COMP%]{--size:9}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"10\"][_ngcontent-%COMP%]{--size:10}ul.cloud[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{--color:#a33;--size:2;color:var(--color);display:block;font-size:calc(var(--size)*0.25rem + .5rem);padding:.125rem .25rem;position:relative;text-decoration:none}ul[data-show-count][_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:after{content:\" (\" attr(data-count) \")\";font-size:calc(var(--size)*0.125rem + .5rem)}ul.cloud[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:before{background:rgba(0,0,0,.03);content:\"\";height:100%;left:50%;position:absolute;top:0;transform:translate(-50%);transition:width .25s;width:0}ul.cloud[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus:before, ul.cloud[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover:before{width:100%}.filtered[_ngcontent-%COMP%]{font-size:calc(var(--size)*0.125rem + .5rem)}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsFacetTagCloud, [{
        type: Component,
        args: [{
                selector: "sq-facet-tag-cloud",
                templateUrl: "./facet-tag-cloud.html",
                styleUrls: ["./facet-tag-cloud.scss"],
            }]
    }], function () { return [{ type: FacetService }]; }, { results: [{
            type: Input
        }], aggregations: [{
            type: Input
        }], limit: [{
            type: Input
        }], uniformRepartition: [{
            type: Input
        }], showCount: [{
            type: Input
        }], proportionalWeight: [{
            type: Input
        }], countThreshold: [{
            type: Input
        }], shuffleData: [{
            type: Input
        }], isolateFacetFilters: [{
            type: Input
        }] }); })();

class BsFacetModule {
    static forRoot(allFacets = undefined, defaultFacets = undefined) {
        return {
            ngModule: BsFacetModule,
            providers: [
                {
                    provide: ALL_FACETS,
                    useValue: allFacets
                },
                {
                    provide: DEFAULT_FACETS,
                    useValue: defaultFacets
                },
            ]
        };
    }
}
BsFacetModule.ɵmod = ɵɵdefineNgModule({ type: BsFacetModule });
BsFacetModule.ɵinj = ɵɵdefineInjector({ factory: function BsFacetModule_Factory(t) { return new (t || BsFacetModule)(); }, imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            IntlModule,
            UtilsModule,
            CollapseModule,
            BsActionModule,
            BsSearchModule,
            BsAutocompleteModule,
            Ng5SliderModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BsFacetModule, { declarations: [BsFacetCard, BsFacetList, BsFacetTree,
        BsFacetFilters,
        BsRefine,
        BsFacetRange, BsMySearch, BsFacetBar,
        BsFacetMultiComponent,
        BsFacetTagCloud], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IntlModule,
        UtilsModule,
        CollapseModule,
        BsActionModule,
        BsSearchModule,
        BsAutocompleteModule,
        Ng5SliderModule], exports: [BsFacetCard, BsFacetList, BsFacetTree,
        BsFacetFilters,
        BsRefine,
        BsFacetRange, BsMySearch, BsFacetBar,
        BsFacetMultiComponent,
        BsFacetTagCloud] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsFacetModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    IntlModule,
                    UtilsModule,
                    CollapseModule,
                    BsActionModule,
                    BsSearchModule,
                    BsAutocompleteModule,
                    Ng5SliderModule
                ],
                declarations: [
                    BsFacetCard, BsFacetList, BsFacetTree,
                    BsFacetFilters,
                    BsRefine,
                    BsFacetRange, BsMySearch, BsFacetBar,
                    BsFacetMultiComponent,
                    BsFacetTagCloud
                ],
                exports: [
                    BsFacetCard, BsFacetList, BsFacetTree,
                    BsFacetFilters,
                    BsRefine,
                    BsFacetRange, BsMySearch, BsFacetBar,
                    BsFacetMultiComponent,
                    BsFacetTagCloud
                ],
            }]
    }], null, null); })();

var _enFacet = {
    "facet": {
        "showFacetTextView": "Show text",
        "showFacetChartView": "Show chart",
        "itemExclude": "Exclude",
        "applyFilters": "{selections, plural, one {Apply filter} other {Apply filters}}",
        "clearFilters": "{selected, plural, one {Clear filter} other {Clear filters}}",
        "loadMore": "Load more",
        "showMore": "Show more",
        "showLess": "Show less",
        "displayed": "Displayed",
        "removeAll": "Remove all",
        "searchPlaceholder": "Search...",
        "itemSelect": "Select this value",
        "itemUnselect": "Unselect this value",
        "filterItem": "Keep documents with {terme}",
        "filterItems": "Keep documents with ANY of the selected items",
        "filterItemsAnd": "Keep documents with ALL the selected items",
        "excludeItems": "Exclude document with selected items",
        "clearSelects": "Clear the current filters",
        "searchItems": "Search for a value in this list",
        "searchNoResult": "No results",
        "openItem": "Open",
        "closeItem": "Close",
        "authors": {
            "title": "Authors"
        },
        "concepts": {
            "title": "Concepts"
        },
        "company": {
            "title": "Companies"
        },
        "docformat": {
            "title": "Formats"
        },
        "doctype": {
            "title": "Document Types"
        },
        "documentlanguages": {
            "title": "Languages"
        },
        "fileext": {
            "title": "File Extensions"
        },
        "filename": {
            "title": "Filenames"
        },
        "geo": {
            "title": "Places"
        },
        "matchingpartnames": {
            "title": "Matching Partnames"
        },
        "modified": {
            "title": "Dates"
        },
        "person": {
            "title": "People"
        },
        "refine": {
            "title": "Refine Search",
            "input": {
                "label": "Refine",
                "buttonTitle": "Refine",
                "placeholder": "Refine by..."
            }
        },
        "size": {
            "title": "Sizes"
        },
        "tagcloud": {
            "title": "Tag Cloud"
        },
        "title": {
            "title": "Titles"
        },
        "treepath": {
            "title": "Sources"
        },
        "recentQueries": {
            "title": "Recent queries"
        },
        "recentQueriesPublic": {
            "title": "Public recent queries"
        },
        "mySearch": {
            "title": "My Search",
            "itemRemove": "Remove"
        },
        "search": {
            "label": "Search",
            "buttonTitle": "Search",
            "placeholder": "Search...",
            "showSearchForm": "Show search form",
            "hideSearchForm": "Hide search form"
        },
        "range": {
            "year": "{date, date, sqYear}",
            "monthYear": "{date, date, sqMonthYear}",
            "weekYear": "W{week, number, sqWeek} {weekYear, number, sqYear}",
            "apply": "Apply",
            "clear": "Clear",
            "unavailable": "No available range"
        },
        "filters": {
            "add": "Add facet",
            "addAll": "Add all facets",
            "remove": "Remove facet",
            "removeAll": "Remove all facets",
            "clear": "Clear filter",
            "moreFilters": "",
            "showFilters": "Show filters",
            "hideFilters": "Hide filters",
            "back": "Back to filters",
            "selectedFilters": "This filter is active in the current query",
            "customizeFacets": "Select facets to display or hide"
        },
        "selectedValue": "This value is selected in the current query",
        "previous": "Previous",
        "next": "Next",
        "filterItemCountTooltip": "{count} possible values for this filter",
    },
    "facetCard": {
        "expand": "Expand",
        "collapse": "Collapse",
        "enlarge": "Enlarge",
        "reduce": "Reduce",
        "openSettings": "Open settings",
        "saveSettings": "Save settings"
    }
};

var _frFacet = {
    "facet": {
        "showFacetTextView": "Afficher le texte",
        "showFacetChartView": "Afficher le graphique",
        "itemExclude": "Exclure",
        "applyFilters": "{selections, plural, one {Appliquer le filtre} other {Appliquer les filtres}}",
        "clearFilters": "{selected, plural, one {Effacer le filtre} other {Effacer les filtres}}",
        "loadMore": "Charger plus",
        "showMore": "Afficher plus",
        "showLess": "Afficher moins",
        "displayed": "Affiché",
        "removeAll": "Supprimer tout",
        "searchPlaceholder": "Rechercher...",
        "itemSelect": "Sélectionner cette valeur",
        "itemUnselect": "Désélectionner cette valeur",
        "filterItem": "Garder les documents qui contiennent {terme}",
        "filterItems": "Garder les documents qui contiennent n'importe lequel de ces termes",
        "filterItemsAnd": "Garder les documents qui contiennent tous ces termes",
        "excludeItems": "Exclure les documents contenant un de ces termes",
        "clearSelects": "Enlever les filtres",
        "searchItems": "Rechercher une valeur dans cette liste",
        "searchNoResult": "Pas de résultat",
        "openItem": "Ouvrir",
        "closeItem": "Refermer",
        "authors": {
            "title": "Auteurs"
        },
        "concepts": {
            "title": "Concepts"
        },
        "company": {
            "title": "Sociétés"
        },
        "docformat": {
            "title": "Formats"
        },
        "doctype": {
            "title": "Types de document"
        },
        "documentlanguages": {
            "title": "Langues"
        },
        "fileext": {
            "title": "Extensions de fichiers"
        },
        "filename": {
            "title": "Noms de fichiers"
        },
        "geo": {
            "title": "Lieux"
        },
        "matchingpartnames": {
            "title": "Partnames"
        },
        "modified": {
            "title": "Dates"
        },
        "person": {
            "title": "Personnes"
        },
        "refine": {
            "title": "Affiner la recherche",
            "input": {
                "label": "Affiner",
                "buttonTitle": "Affiner",
                "placeholder": "Affiner par ..."
            }
        },
        "size": {
            "title": "Tailles"
        },
        "tagcloud": {
            "title": "Nuage de mots"
        },
        "title": {
            "title": "Titres"
        },
        "treepath": {
            "title": "Sources"
        },
        "recentQueries": {
            "title": "Requêtes récentes"
        },
        "recentQueriesPublic": {
            "title": "Requêtes publiques récentes"
        },
        "mySearch": {
            "title": "Ma recherche",
            "itemRemove": "Supprimer"
        },
        "search": {
            "label": "Rechercher",
            "buttonTitle": "Rechercher",
            "placeholder": "Rechercher ...",
            "showSearchForm": "Afficher le formulaire de recherche",
            "hideSearchForm": "Masquer le formulaire de recherche"
        },
        "range": {
            "year": "{date, date, sqYear}",
            "monthYear": "{date, date, sqMonthYear}",
            "weekYear": "s{week, number, sqWeek} {weekYear, number, sqYear}",
            "apply": "Appliquer",
            "clear": "Effacer",
            "unavailable": "Aucune plage disponible"
        },
        "filters": {
            "add": "Ajouter la facette",
            "addAll": "Ajouter toutes les facettes",
            "remove": "Retirer la facette",
            "removeAll": "Retirer toutes les facettes",
            "clear": "Réinitialiser",
            "moreFilters": "",
            "showFilters": "Montrer les filtres",
            "hideFilters": "Cacher les filtres",
            "back": "Retour aux filtres",
            "selectedFilters": "Ce filtre est utilisé dans la recherche actuelle",
            "customizeFacets": "Sélectionnez les facettes à montrer ou cacher"
        },
        "selectedValue": "Cette valeur est sélectionnée dans la recherche actuelle",
        "previous": "Précédent",
        "next": "Suivant",
        "filterItemCountTooltip": "{count} valeurs possibles pour ce filtre",
    },
    "facetCard": {
        "expand": "Déplier",
        "collapse": "Replier",
        "enlarge": "Agrandir",
        "reduce": "Réduire",
        "openSettings": "Ouvrir les paramètres",
        "saveSettings": "Enregistrer les paramètres"
    }
};

var _deFacet = {
    "facet": {
        "show_text_view": "Text anzeigen",
        "show_chart_view": "Chart anzeigen",
        "itemExclude": "Exkludieren",
        "applyFilters": "{selections, plural, one {Filter anwenden} other {Filter anwenden}}",
        "clearFilters": "{selected, plural, one {Filter löschen} other {Filter löschen}}",
        "loadMore": "Mehr laden",
        "showMore": "Mehr anzeigen",
        "showLess": "Weniger anzeigen",
        "displayed": "Angezeigt",
        "removeAll": "Alle entfernen",
        "searchPlaceholder": "Suche...",
        "itemSelect": "Diesen Wert auswählen",
        "filterItems": "Behalte Dokumente mit MINDESTENS EINEM der ausgewählten Werte",
        "filterItemsAnd": "Behalte Dokumente mit ALLEN ausgewählten Werten",
        "excludeItems": "Exckludiere Dokumente mit den ausgewählten Werten",
        "clearSelects": "Entferne die aktuellen Filter",
        "searchItems": "Suche nach eniem Wert in dieser Liste",
        "searchNoResult": "Keine Ergebnisse",
        "openItem": "Öffnen",
        "closeItem": "Schließen",
        "authors": {
            "title": "Autoren"
        },
        "concepts": {
            "title": "Konzepte"
        },
        "company": {
            "title": "Firmen"
        },
        "docformat": {
            "title": "Formate"
        },
        "doctype": {
            "title": "Dokumenttypen"
        },
        "documentlanguages": {
            "title": "Sprachen"
        },
        "fileext": {
            "title": "Dateierweiterungen"
        },
        "filename": {
            "title": "Dateinamen"
        },
        "geo": {
            "title": "Orte"
        },
        "matchingpartnames": {
            "title": "Übereinstimmende Partnames"
        },
        "modified": {
            "title": "Datumsangaben"
        },
        "person": {
            "title": "Personen"
        },
        "refine": {
            "title": "Suche verfeinern",
            "input": {
                "label": "Verfeinern",
                "buttonTitle": "Verfeinern",
                "placeholder": "Verfeinern nach..."
            }
        },
        "size": {
            "title": "Größen"
        },
        "tagcloud": {
            "title": "Wortwolke"
        },
        "title": {
            "title": "Titel"
        },
        "treepath": {
            "title": "Quellen"
        },
        "recentQueries": {
            "title": "Kürzliche Suchanfragen"
        },
        "recentQueriesPublic": {
            "title": "Kürzliche öffentliche Suchanfragen"
        },
        "mySearch": {
            "title": "Meine Suche",
            "itemRemove": "Entfernen"
        },
        "search": {
            "label": "Suche",
            "buttonTitle": "Suche",
            "placeholder": "Suche...",
            "showSearchForm": "Suchmaske einblenden",
            "hideSearchForm": "Suchmaske ausblenden"
        },
        "range": {
            "year": "{date, date, sqYear}",
            "monthYear": "{date, date, sqMonthYear}",
            "weekYear": "W{week, number, sqWeek} {weekYear, number, sqYear}",
            "apply": "Anwenden",
            "clear": "Löschen",
            "unavailable": "Kein Bereich verfügbar"
        },
        "filters": {
            "add": "Filter hinzufügen",
            "addAll": "Alle Facetten hinzufügen",
            "remove": "Filter entfernen",
            "removeAll": "Alle Facetten entfernen",
            "clear": "Filter löschen",
            "moreFilters": "",
            "showFilters": "Filter einblenden",
            "hideFilters": "Filter ausblenden",
            "back": "Zurück zu den Filtern",
            "selectedFilters": "Dieser Filter ist in der aktuellen Suchanfrage aktiv",
            "customizeFacets": "Facetten zum Anzeigen oder Ausblenden auswählen"
        },
        "selectedValue": "Dieser Wert ist in der aktuellen Anfrage ausgewählt.",
        "previous": "Zurück",
        "next": "Weiter",
        "filterItemCountTooltip": "{count} mögliche Werte für diesen Filter",
    },
    "facetCard": {
        "expand": "Erweitern",
        "collapse": "Reduzieren",
        "enlarge": "Vergrößern",
        "reduce": "Reduzieren",
        "openSettings": "Einstellungen öffnen",
        "saveSettings": "Einstellungen speichern"
    }
};

const enFacet = Utils.merge({}, _enFacet, enSearch, enSelection, enCollapse);
const frFacet = Utils.merge({}, _frFacet, frSearch, frSelection, frCollapse);
const deFacet = Utils.merge({}, _deFacet, deSearch, deSelection, deCollapse);

/**
 * Generated bundle index. Do not edit.
 */

export { ALL_FACETS, AbstractFacet, BsFacetBar, BsFacetCard, BsFacetFilters, BsFacetList, BsFacetModule, BsFacetMultiComponent, BsFacetRange, BsFacetTagCloud, BsFacetTree, BsMySearch, BsRefine, DEFAULT_FACETS, FACET_CHANGE_EVENTS, FacetService, RoundTarget, RoundType, deFacet, enFacet, frFacet };
//# sourceMappingURL=sinequa-components-facet.js.map
