import { Injectable, Inject, Optional, InjectionToken } from "@angular/core";
import { Query, Expr } from "@sinequa/core/app-utils";
import { Utils } from "@sinequa/core/base";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/web-services";
import * as i2 from "@sinequa/components/search";
import * as i3 from "@sinequa/components/autocomplete";
import * as i4 from "@sinequa/core/app-utils";
import * as i5 from "@sinequa/core/intl";
// Types of events triggering a change event
export const FACET_CHANGE_EVENTS = [
    "Facet_Loaded" /* Loaded */,
    "Facet_Added" /* Add */,
    "Facet_Removed" /* Remove */
];
export const ALL_FACETS = new InjectionToken('ALL_FACETS');
export const DEFAULT_FACETS = new InjectionToken('DEFAULT_FACETS');
export class FacetService {
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
FacetService.ɵfac = function FacetService_Factory(t) { return new (t || FacetService)(i0.ɵɵinject(i1.UserSettingsWebService), i0.ɵɵinject(i2.SearchService), i0.ɵɵinject(i3.SuggestService), i0.ɵɵinject(i4.AppService), i0.ɵɵinject(i5.IntlService), i0.ɵɵinject(i4.FormatService), i0.ɵɵinject(i4.ExprBuilder), i0.ɵɵinject(ALL_FACETS, 8), i0.ɵɵinject(DEFAULT_FACETS, 8)); };
FacetService.ɵprov = i0.ɵɵdefineInjectable({ token: FacetService, factory: FacetService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(FacetService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: i1.UserSettingsWebService }, { type: i2.SearchService }, { type: i3.SuggestService }, { type: i4.AppService }, { type: i5.IntlService }, { type: i4.FormatService }, { type: i4.ExprBuilder }, { type: undefined, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2ZhY2V0LyIsInNvdXJjZXMiOlsiZmFjZXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBTTNFLE9BQU8sRUFBQyxLQUFLLEVBQTBDLElBQUksRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVGLE9BQU8sRUFBYSxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMsT0FBTyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztBQXlDbkMsNENBQTRDO0FBQzVDLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHOzs7O0NBSWxDLENBQUM7QUFTRixNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxjQUFjLENBQVEsWUFBWSxDQUFDLENBQUM7QUFDbEUsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLElBQUksY0FBYyxDQUFlLGdCQUFnQixDQUFDLENBQUM7QUFLakYsTUFBTSxPQUFPLFlBQVk7SUFLckIsWUFDYyxtQkFBMkMsRUFDM0MsYUFBNEIsRUFDNUIsY0FBOEIsRUFDOUIsVUFBc0IsRUFDdEIsV0FBd0IsRUFDeEIsYUFBNEIsRUFDNUIsV0FBd0IsRUFDSyxTQUFnQixFQUNaLGFBQTJCO1FBUjVELHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBd0I7UUFDM0Msa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcs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YSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQ0FBSyxJQUFJLEtBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwRyxJQUFJLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUM7U0FDNUQ7YUFBTTtZQUNILElBQUksR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7d0VBMzJCUSxZQUFZLDBPQWFHLFVBQVUsa0JBQ1YsY0FBYztvREFkN0IsWUFBWSxXQUFaLFlBQVksbUJBRlQsTUFBTTtrREFFVCxZQUFZO2NBSHhCLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7c0JBY1EsUUFBUTs7c0JBQUksTUFBTTt1QkFBQyxVQUFVOztzQkFDN0IsUUFBUTs7c0JBQUksTUFBTTt1QkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsLCBJbmplY3Rpb25Ub2tlbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7VXNlclNldHRpbmdzV2ViU2VydmljZSwgVXNlclNldHRpbmdzLCBTdWdnZXN0aW9uLFxuICAgIFJlc3VsdHMsIEFnZ3JlZ2F0aW9uLCBBZ2dyZWdhdGlvbkl0ZW0sIFRyZWVBZ2dyZWdhdGlvbiwgVHJlZUFnZ3JlZ2F0aW9uTm9kZSxcbiAgICBBdWRpdEV2ZW50cywgRW5naW5lVHlwZSwgU2VsZWN0LCBDQ0NvbHVtblxufSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7SW50bFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL2ludGxcIjtcbmltcG9ydCB7UXVlcnksIEFwcFNlcnZpY2UsIEZvcm1hdFNlcnZpY2UsIEV4cHJCdWlsZGVyLCBFeHByfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9hcHAtdXRpbHNcIjtcbmltcG9ydCB7RmllbGRWYWx1ZSwgVXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7U3ViamVjdCwgT2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7bWFwfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCB7U2VhcmNoU2VydmljZSwgQnJlYWRjcnVtYnNJdGVtLCBCcmVhZGNydW1ic30gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvc2VhcmNoXCI7XG5pbXBvcnQge1N1Z2dlc3RTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9hdXRvY29tcGxldGVcIjtcblxuLy8gRmFjZXQgaW50ZXJmYWNlIChmcm9tIG1vZGVscy9Vc2VyU2V0dGluZ3MpXG5leHBvcnQgaW50ZXJmYWNlIEZhY2V0U3RhdGUge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBwb3NpdGlvbjogbnVtYmVyOyAvLyBlZyAwID0gbGVmdCwgMSA9IHJpZ2h0XG4gICAgZXhwYW5kZWQ6IGJvb2xlYW47XG4gICAgaGlkZGVuOiBib29sZWFuO1xuICAgIHZpZXc6IHN0cmluZztcbn1cblxuLyoqXG4gKiBPcHRpb25zIGZvciB0aGUgW1tGYWNldFNlcnZpY2UuQWRkRmlsdGVyXV0gYW5kIFtbRmFjZXRTZXJ2aWNlLkFkZEZpbHRlclNlYXJjaF1dIG1ldGhvZHNcbiAqXG4gKiBhbmQ6IElmIG11bHRpcGxlIGl0ZW1zIGFyZSBmaWx0ZXJlZCwgZGV0ZXJtaW5lcyB3aGV0aGVyIHRoZXkgYXJlIGZpbHRlcmVkIGFzIEFORCBvciBPUlxuICogbm90OiBXaGV0aGVyIHRoaXMgaXMgYW4gZXhsdXNpb24gb2YgdGhlIGZpbHRlcmVkIGl0ZW1cbiAqIHJlcGxhY2VDdXJyZW50OiBpZiB0cnVlLCB0aGUgY3VycmVudCBmaWx0ZXIgaXMgcmVwbGFjZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBZGRGaWx0ZXJPcHRpb25zIHtcbiAgICBhbmQ/OiBib29sZWFuO1xuICAgIG5vdD86IGJvb2xlYW47XG4gICAgcmVwbGFjZUN1cnJlbnQ/OiBib29sZWFuO1xufVxuXG4vLyBBdWRpdCBFdmVudHMgKGZyb20gbW9kZWxzL0F1ZGl0KVxuZXhwb3J0IGNvbnN0IGVudW0gRmFjZXRFdmVudFR5cGUge1xuICAgIExvYWRlZCA9IFwiRmFjZXRfTG9hZGVkXCIsXG4gICAgQWRkID0gXCJGYWNldF9BZGRlZFwiLFxuICAgIEFkZEFsbCA9IFwiRmFjZXRzX0FkZGVkXCIsXG4gICAgUmVtb3ZlID0gXCJGYWNldF9SZW1vdmVkXCIsXG4gICAgUmVtb3ZlQWxsID0gXCJGYWNldHNfUmVtb3ZlZFwiLFxuXG4gICAgUGF0Y2hlZCA9IFwiRmFjZXRfUGF0Y2hlZFwiLFxuICAgIENsZWFyRmlsdGVycyA9IFwiRmFjZXRfQ2xlYXJGaWx0ZXJzXCIsXG4gICAgQWRkRmlsdGVyID0gXCJGYWNldF9BZGRGaWx0ZXJcIixcbiAgICBSZW1vdmVGaWx0ZXIgPSBcIkZhY2V0X1JlbW92ZUZpbHRlclwiLFxuICAgIE9wZW4gPSBcIkZhY2V0X1RyZWVPcGVuXCJcbn1cblxuLy8gVHlwZXMgb2YgZXZlbnRzIHRyaWdnZXJpbmcgYSBjaGFuZ2UgZXZlbnRcbmV4cG9ydCBjb25zdCBGQUNFVF9DSEFOR0VfRVZFTlRTID0gW1xuICAgIEZhY2V0RXZlbnRUeXBlLkxvYWRlZCxcbiAgICBGYWNldEV2ZW50VHlwZS5BZGQsXG4gICAgRmFjZXRFdmVudFR5cGUuUmVtb3ZlXG5dO1xuXG5cbi8vIENSVUQgRXZlbnRzXG5leHBvcnQgaW50ZXJmYWNlIEZhY2V0Q2hhbmdlRXZlbnQge1xuICAgIHR5cGU6IEZhY2V0RXZlbnRUeXBlO1xuICAgIGZhY2V0PzogRmFjZXRTdGF0ZTtcbn1cblxuZXhwb3J0IGNvbnN0IEFMTF9GQUNFVFMgPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55W10+KCdBTExfRkFDRVRTJyk7XG5leHBvcnQgY29uc3QgREVGQVVMVF9GQUNFVFMgPSBuZXcgSW5qZWN0aW9uVG9rZW48RmFjZXRTdGF0ZVtdPignREVGQVVMVF9GQUNFVFMnKTtcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgRmFjZXRTZXJ2aWNlIHtcblxuICAgIHByb3RlY3RlZCByZWFkb25seSBfZXZlbnRzID0gbmV3IFN1YmplY3Q8RmFjZXRDaGFuZ2VFdmVudD4oKTtcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2NoYW5nZXMgPSBuZXcgU3ViamVjdDxGYWNldENoYW5nZUV2ZW50PigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCB1c2VyU2V0dGluZ3NTZXJ2aWNlOiBVc2VyU2V0dGluZ3NXZWJTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIHN1Z2dlc3RTZXJ2aWNlOiBTdWdnZXN0U2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIGFwcFNlcnZpY2U6IEFwcFNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBpbnRsU2VydmljZTogSW50bFNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBmb3JtYXRTZXJ2aWNlOiBGb3JtYXRTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgZXhwckJ1aWxkZXI6IEV4cHJCdWlsZGVyLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFMTF9GQUNFVFMpIHB1YmxpYyBhbGxGYWNldHM6IGFueVtdLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERFRkFVTFRfRkFDRVRTKSBwdWJsaWMgZGVmYXVsdEZhY2V0czogRmFjZXRTdGF0ZVtdKXtcblxuICAgICAgICAvLyBMaXN0ZW4gdG8gdGhlIHVzZXIgc2V0dGluZ3NcbiAgICAgICAgdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLmV2ZW50cy5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICAgICAgLy8gRS5nLiBuZXcgbG9naW4gb2NjdXJzXG4gICAgICAgICAgICAvLyA9PT4gTWVudXMgbmVlZCB0byBiZSByZWJ1aWx0XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KHt0eXBlOiBGYWNldEV2ZW50VHlwZS5Mb2FkZWR9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIExpc3RlbiB0byBvd24gZXZlbnRzLCB0byB0cmlnZ2VyIGNoYW5nZSBldmVudHNcbiAgICAgICAgdGhpcy5fZXZlbnRzLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICBpZihGQUNFVF9DSEFOR0VfRVZFTlRTLmluZGV4T2YoZXZlbnQudHlwZSkgIT09IC0xKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZXMubmV4dChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEdFVFRFUlNcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxpc3Qgb2YgdGhpcyB1c2VyJ3MgZmFjZXRzLlxuICAgICAqIFRoZSBsaXN0IGlzIHN0b3JlZCBpbiB0aGUgdXNlciBzZXR0aW5ncyAodGhpcyBpcyBhIHJlZGlyZWN0aW9uKS5cbiAgICAgKiBVc2luZyB0aGlzIHNlcnZpY2UgY3JlYXRlcyB0aGUgbGlzdCBvZiBmYWNldHMgaWYgaXQgZG9lcyBub3QgYWxyZWFkeSBleGlzdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGZhY2V0cygpIDogRmFjZXRTdGF0ZVtdIHtcbiAgICAgICAgaWYoIXRoaXMudXNlclNldHRpbmdzU2VydmljZS51c2VyU2V0dGluZ3MpXG4gICAgICAgICAgICB0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UudXNlclNldHRpbmdzID0ge307XG4gICAgICAgIGlmKCF0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UudXNlclNldHRpbmdzW1wiZmFjZXRzXCJdKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UudXNlclNldHRpbmdzW1wiZmFjZXRzXCJdID0gW107XG4gICAgICAgICAgICBpZighIXRoaXMuZGVmYXVsdEZhY2V0cyl7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnVzZXJTZXR0aW5nc1tcImZhY2V0c1wiXS5wdXNoKC4uLnRoaXMuZGVmYXVsdEZhY2V0cyk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRjaEZhY2V0cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UudXNlclNldHRpbmdzW1wiZmFjZXRzXCJdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIGEgZmFjZXQgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBvciB1bmRlZmluZWQgaWYgaXQgZG9lcyBub3QgZXhpc3RcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqL1xuICAgIHB1YmxpYyBmYWNldChuYW1lOiBzdHJpbmcpOiBGYWNldFN0YXRlIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgY29uc3QgaSA9IHRoaXMuZmFjZXRJbmRleChuYW1lKTtcbiAgICAgICAgcmV0dXJuIGk+PSAwPyB0aGlzLmZhY2V0c1tpXSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsaXN0IG9mIGZhY2V0IGNvbmZpZyBpbiB0aGUgZ2l2ZW4gY29udGFpbmVyIChwb3NpdGlvbilcbiAgICAgKiBAcGFyYW0gcG9zaXRpb24gKGRlZmF1bHQgdG8gMCBpZiB0aGVyZSBpcyBhIHNpbmdsZSBjb250YWluZXIpXG4gICAgICovXG4gICAgcHVibGljIGdldEZhY2V0cyhwb3NpdGlvbjogbnVtYmVyID0gMCkgOiBhbnlbXSB7XG4gICAgICAgIGlmICghdGhpcy5hbGxGYWNldHMpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5mYWNldHMuZmlsdGVyKGYgPT4gZi5wb3NpdGlvbiA9PT0gcG9zaXRpb24pXG4gICAgICAgICAgICAubWFwKGYgPT4gdGhpcy5hbGxGYWNldHMuZmluZChfZiA9PiBfZi5uYW1lID09PSBmLm5hbWUpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBmYWNldCBpcyBvcGVuZWQgKGluIGFueSBjb250YWluZXIpXG4gICAgICogQHBhcmFtIGZhY2V0TmFtZVxuICAgICAqL1xuICAgIHB1YmxpYyBpc0ZhY2V0T3BlbmVkKGZhY2V0TmFtZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLmZhY2V0cy5maW5kKGYgPT4gZi5uYW1lID09PSBmYWNldE5hbWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBmYWNldEluZGV4KG5hbWU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBpYyA9IHRoaXMuZmFjZXRzLmxlbmd0aDsgaSA8IGljOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGZhY2V0ID0gdGhpcy5mYWNldHNbaV07XG4gICAgICAgICAgICBpZiAoZmFjZXQgJiYgZmFjZXQubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBhbnkgZXZlbnRzIHJlZ2FyZGluZyB0aGUgZmFjZXRzXG4gICAgICovXG4gICAgcHVibGljIGdldCBldmVudHMoKTogU3ViamVjdDxGYWNldENoYW5nZUV2ZW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgd2hlbiBldmVudHMgYWZmZWN0IHRoZSBsaXN0IG9mIGZhY2V0c1xuICAgICAqIENmLiBDSEFOR0VfRVZFTlRTIGxpc3RcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGNoYW5nZXMoKSA6IFN1YmplY3Q8RmFjZXRDaGFuZ2VFdmVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hhbmdlcztcbiAgICB9XG5cblxuICAgIHB1YmxpYyBhZGRGYWNldChmYWNldDogRmFjZXRTdGF0ZSl7XG4gICAgICAgIHRoaXMuZmFjZXRzLnB1c2goZmFjZXQpO1xuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KHt0eXBlIDogRmFjZXRFdmVudFR5cGUuQWRkLCBmYWNldDogZmFjZXR9KTtcbiAgICAgICAgdGhpcy5wYXRjaEZhY2V0cyhbe1xuICAgICAgICAgICAgdHlwZTogRmFjZXRFdmVudFR5cGUuQWRkLFxuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgZmFjZXQ6IGZhY2V0Lm5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVGYWNldChmYWNldDogRmFjZXRTdGF0ZSl7XG4gICAgICAgIGNvbnN0IGkgPSB0aGlzLmZhY2V0SW5kZXgoZmFjZXQubmFtZSk7XG4gICAgICAgIGlmKGkgIT09IC0xKXtcbiAgICAgICAgICAgIHRoaXMuZmFjZXRzLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgdGhpcy5ldmVudHMubmV4dCh7dHlwZSA6IEZhY2V0RXZlbnRUeXBlLlJlbW92ZSwgZmFjZXQ6IGZhY2V0fSk7XG4gICAgICAgICAgICB0aGlzLnBhdGNoRmFjZXRzKFt7XG4gICAgICAgICAgICAgICAgdHlwZTogRmFjZXRFdmVudFR5cGUuUmVtb3ZlLFxuICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICBmYWNldDogZmFjZXQubmFtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGRBbGxGYWNldCgpIHtcbiAgICAgICAgdGhpcy5mYWNldHMuc3BsaWNlKDAsdGhpcy5mYWNldHMubGVuZ3RoKTtcbiAgICAgICAgaWYoISF0aGlzLmRlZmF1bHRGYWNldHMpIHRoaXMuZmFjZXRzLnB1c2goLi4udGhpcy5kZWZhdWx0RmFjZXRzKTtcbiAgICAgICAgdGhpcy5ldmVudHMubmV4dCh7dHlwZSA6IEZhY2V0RXZlbnRUeXBlLkFkZEFsbH0pO1xuICAgICAgICB0aGlzLnBhdGNoRmFjZXRzKFt7XG4gICAgICAgICAgICB0eXBlOiBGYWNldEV2ZW50VHlwZS5BZGRBbGxcbiAgICAgICAgfV0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVBbGxGYWNldCgpIHtcbiAgICAgICAgdGhpcy5mYWNldHMuc3BsaWNlKDAsdGhpcy5mYWNldHMubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5ldmVudHMubmV4dCh7dHlwZSA6IEZhY2V0RXZlbnRUeXBlLlJlbW92ZUFsbH0pO1xuICAgICAgICB0aGlzLnBhdGNoRmFjZXRzKFt7XG4gICAgICAgICAgICB0eXBlOiBGYWNldEV2ZW50VHlwZS5SZW1vdmVBbGxcbiAgICAgICAgfV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgZmFjZXRzIGluIFVzZXIgc2V0dGluZ3MuXG4gICAgICogQHBhcmFtIGF1ZGl0RXZlbnRzIDogQXVkaXQgRXZlbnRzIHRvIGJlIHRyaWdnZXJlZFxuICAgICAqIEByZXR1cm5zIGFuIE9ic2VydmFibGUgd2hpY2ggY2FuIGJlIHVzZWQgdG8gdHJpZ2dlciBmdXJ0aGVyIGV2ZW50c1xuICAgICAqL1xuICAgIHByb3RlY3RlZCBwYXRjaEZhY2V0cyhhdWRpdEV2ZW50cz86IEF1ZGl0RXZlbnRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UucGF0Y2goe2ZhY2V0czogdGhpcy5mYWNldHN9IGFzIFVzZXJTZXR0aW5ncywgYXVkaXRFdmVudHMpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIG5leHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KHt0eXBlOiBGYWNldEV2ZW50VHlwZS5QYXRjaGVkfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb3VsZCBub3QgcGF0Y2ggRmFjZXRzIVwiLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaWx0ZXIvRXhjbHVkZSBhbiBpdGVtIGluIGEgZmFjZXQgYW5kIGxhdW5jaCBhIHNlYXJjaC5cbiAgICAgKiBUcmlnZ2VycyBhbiBpbnRlcm5hbCBldmVudCBhbmQgYW4gQXVkaXQgRXZlbnRcbiAgICAgKiBAcGFyYW0gZmFjZXROYW1lXG4gICAgICogQHBhcmFtIGFnZ3JlZ2F0aW9uXG4gICAgICogQHBhcmFtIGl0ZW1zXG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkRmlsdGVyU2VhcmNoKFxuICAgICAgICBmYWNldE5hbWU6IHN0cmluZyxcbiAgICAgICAgYWdncmVnYXRpb246IEFnZ3JlZ2F0aW9uLFxuICAgICAgICBpdGVtczogQWdncmVnYXRpb25JdGVtIHwgQWdncmVnYXRpb25JdGVtW10sXG4gICAgICAgIG9wdGlvbnM6IEFkZEZpbHRlck9wdGlvbnMgPSB7fSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXG4gICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmFkZEZpbHRlcihmYWNldE5hbWUsIGFnZ3JlZ2F0aW9uLCBpdGVtcywgb3B0aW9ucyk7XG4gICAgICAgIGlmKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLm5leHQoeyB0eXBlOiBGYWNldEV2ZW50VHlwZS5BZGRGaWx0ZXIsIGZhY2V0OiB0aGlzLmZhY2V0KGZhY2V0TmFtZSkgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaCh1bmRlZmluZWQsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBGYWNldEV2ZW50VHlwZS5BZGRGaWx0ZXIsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW06IDxhbnk+dGhpcy5zZWFyY2hTZXJ2aWNlLnF1ZXJ5Lmxhc3RTZWxlY3QoKSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbWJveDogZmFjZXROYW1lLFxuICAgICAgICAgICAgICAgICAgICBpdGVtY29sdW1uOiBhZ2dyZWdhdGlvbi5jb2x1bW4sXG4gICAgICAgICAgICAgICAgICAgIGlzaXRlbWV4Y2x1ZGU6IG9wdGlvbnMubm90LFxuICAgICAgICAgICAgICAgICAgICBcImZyb20tcmVzdWx0LWlkXCI6IHRoaXMuc2VhcmNoU2VydmljZS5yZXN1bHRzPy5pZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRmlsdGVyL0V4Y2x1ZGUgb25lIG9yIG1vcmUgaXRlbShzKSBpbiBhIGZhY2V0ICh3aXRob3V0IGxhdW5jaGluZyBhIHNlYXJjaClcbiAgICAgKiBAcGFyYW0gZmFjZXROYW1lXG4gICAgICogQHBhcmFtIGFnZ3JlZ2F0aW9uXG4gICAgICogQHBhcmFtIGl0ZW1zXG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0gcXVlcnkgdGhlIHF1ZXJ5IG9uIHdoaWNoIHRvIGFkZCB0aGUgZmlsdGVyIChkZWZhdWx0cyB0byBzZWFyY2ggc2VydmljZSBxdWVyeSlcbiAgICAgKiBAcGFyYW0gYnJlYWRjcnVtYnMgYnJlYWRjcnVtYnMgaW4gd2hpY2ggdG8gbG9vayBmb3Igc2VsZWN0ZWQgaXRlbXMgKGRlZmF1bHRzICB0byBzZWFyY2ggc2VydmljZSBicmVhZGNydW1icylcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkRmlsdGVyKFxuICAgICAgICBmYWNldE5hbWU6IHN0cmluZyxcbiAgICAgICAgYWdncmVnYXRpb246IEFnZ3JlZ2F0aW9uLFxuICAgICAgICBpdGVtczogQWdncmVnYXRpb25JdGVtIHwgQWdncmVnYXRpb25JdGVtW10sXG4gICAgICAgIG9wdGlvbnM6IEFkZEZpbHRlck9wdGlvbnMgPSB7fSxcbiAgICAgICAgcXVlcnkgPSB0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnksXG4gICAgICAgIGJyZWFkY3J1bWJzID0gdGhpcy5zZWFyY2hTZXJ2aWNlLmJyZWFkY3J1bWJzKTogYm9vbGVhbiB7XG5cbiAgICAgICAgaWYgKCFpdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnJlcGxhY2VDdXJyZW50KSB7XG4gICAgICAgICAgICBxdWVyeS5yZW1vdmVTZWxlY3QoZmFjZXROYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghYWdncmVnYXRpb24uaXNUcmVlICYmIGJyZWFkY3J1bWJzPy5hY3RpdmVTZWxlY3RzLmxlbmd0aCAmJiAhb3B0aW9ucy5yZXBsYWNlQ3VycmVudCkge1xuICAgICAgICAgICAgY29uc3QgZXhwciA9IGJyZWFkY3J1bWJzLmZpbmRTZWxlY3QoZmFjZXROYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gYnJlYWRjcnVtYnMuYWN0aXZlU2VsZWN0cy5maW5kSW5kZXgoc2VsZWN0ID0+IHNlbGVjdC5mYWNldCA9PT0gZmFjZXROYW1lICYmIChzZWxlY3QuZXhwciA9PT0gZXhwciB8fCBzZWxlY3QuZXhwciA9PT0gZXhwcj8ucGFyZW50KSk7XG4gICAgICAgICAgICBjb25zdCBzYW1lID0gKCFBcnJheS5pc0FycmF5KGl0ZW1zKSkgPyB0cnVlIDogKG9wdGlvbnMuYW5kID8gXCJBTkRcIiA6IFwiT1JcIikgPT09IChleHByPy5hbmQgPyBcIkFORFwiIDogXCJPUlwiKSAmJiAob3B0aW9ucy5ub3QgPyBcIllFU1wiIDogXCJOT1wiKSA9PT0gKGV4cHI/Lm5vdCA/IFwiWUVTXCIgOiBcIk5PXCIpO1xuXG4gICAgICAgICAgICBpZiAoZXhwciAmJiBzYW1lICYmIGluZGV4ICE9PSAtMSl7XG4gICAgICAgICAgICAgICAgbGV0IF9pdGVtczogQWdncmVnYXRpb25JdGVtW107XG4gICAgICAgICAgICAgICAgaWYgKGV4cHI/Lm9wZXJhbmRzKSB7XG4gICAgICAgICAgICAgICAgICAgIF9pdGVtcyA9IHRoaXMuZXhwclRvQWdncmVnYXRpb25JdGVtKGV4cHIub3BlcmFuZHMsIGFnZ3JlZ2F0aW9uLnZhbHVlc0FyZUV4cHJlc3Npb25zKS5jb25jYXQoaXRlbXMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHByZXZpb3VzIHNlbGVjdGlvbiBpcyBhIHNpbmdsZSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICBfaXRlbXMgPSB0aGlzLmV4cHJUb0FnZ3JlZ2F0aW9uSXRlbShleHByIGFzIEV4cHIsIGFnZ3JlZ2F0aW9uLnZhbHVlc0FyZUV4cHJlc3Npb25zKS5jb25jYXQoaXRlbXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBNVVNUIHJlc2V0ICRleGNsdWRlZCBwcm9wZXJ0eSBvdGhlcndpc2UgZXhwcmVzc2lvbiBpcyBtaXN1bmRlcnN0b29kXG4gICAgICAgICAgICAgICAgX2l0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLiRleGNsdWRlZCA9IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgLy8gb3ZlcnJpZGVzIG9wdGlvbnMgc2V0dGluZ3Mgd2l0aCBleHByZXNzaW9uIGlmIGFueVxuICAgICAgICAgICAgICAgIGxldCBfZXhwciA9IHRoaXMuZXhwckJ1aWxkZXIubWFrZUFnZ3JlZ2F0aW9uRXhwcihhZ2dyZWdhdGlvbiwgX2l0ZW1zLCBvcHRpb25zLmFuZCB8fCBleHByLmFuZCk7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMubm90IHx8IGV4cHIubm90KSB7XG4gICAgICAgICAgICAgICAgICAgIF9leHByID0gdGhpcy5leHByQnVpbGRlci5tYWtlTm90RXhwcihfZXhwcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChfZXhwcikge1xuICAgICAgICAgICAgICAgICAgICBxdWVyeS5yZXBsYWNlU2VsZWN0KGluZGV4LCB7ZXhwcmVzc2lvbjogX2V4cHIsIGZhY2V0OiBmYWNldE5hbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBleHByID0gdGhpcy5leHByQnVpbGRlci5tYWtlQWdncmVnYXRpb25FeHByKGFnZ3JlZ2F0aW9uLCBpdGVtcywgb3B0aW9ucy5hbmQpO1xuICAgICAgICBpZiAob3B0aW9ucy5ub3QpIHtcbiAgICAgICAgICAgIGV4cHIgPSB0aGlzLmV4cHJCdWlsZGVyLm1ha2VOb3RFeHByKGV4cHIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChleHByKSB7XG4gICAgICAgICAgICBxdWVyeS5hZGRTZWxlY3QoZXhwciwgZmFjZXROYW1lKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIHF1ZXJ5IGZyb20gdGhlIGN1cnJlbnQgc2VsZWN0aW9uIG9uIHRoZSBnaXZlbiBmYWNldFxuICAgICAqIEBwYXJhbSBmYWNldE5hbWVcbiAgICAgKiBAcGFyYW0gYWxsXG4gICAgICogQHBhcmFtIHF1ZXJ5IHRoZSBxdWVyeSB0byBjbGVhciBmcm9tIHRoZSBmYWNldCBzZWxlY3Rpb24gKGRlZmF1bHRzIHRvIHNlYXJjaCBzZXJ2aWNlIHF1ZXJ5KVxuICAgICAqL1xuICAgIHB1YmxpYyBjbGVhckZpbHRlcnMoZmFjZXROYW1lOiBzdHJpbmcsIGFsbD86IGJvb2xlYW4sIHF1ZXJ5ID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnF1ZXJ5KSB7XG4gICAgICAgIHF1ZXJ5LnJlbW92ZVNlbGVjdChmYWNldE5hbWUsIGFsbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBxdWVyeSBmcm9tIHRoZSBjdXJyZW50IHNlbGVjdGlvbiBvbiB0aGUgZ2l2ZW4gZmFjZXQgYW5kIHBlcmZvcm0gYSBzZWFyY2hcbiAgICAgKiBAcGFyYW0gZmFjZXROYW1lXG4gICAgICogQHBhcmFtIGFsbFxuICAgICAqL1xuICAgIHB1YmxpYyBjbGVhckZpbHRlcnNTZWFyY2goZmFjZXROYW1lOiBzdHJpbmcgfCBzdHJpbmdbXSwgYWxsPzogYm9vbGVhbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBbXS5jb25jYXQoZmFjZXROYW1lIGFzIFtdKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbGVhckZpbHRlcnMobmFtZSwgYWxsKTtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KHt0eXBlOiBGYWNldEV2ZW50VHlwZS5DbGVhckZpbHRlcnMsIGZhY2V0OiB0aGlzLmZhY2V0KG5hbWUpfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKHVuZGVmaW5lZCwge1xuICAgICAgICAgICAgICAgIHR5cGU6IEZhY2V0RXZlbnRUeXBlLkNsZWFyRmlsdGVycyxcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbWJveDogZmFjZXROYW1lLFxuICAgICAgICAgICAgICAgICAgICBcImZyb20tcmVzdWx0LWlkXCI6IHRoaXMuc2VhcmNoU2VydmljZS5yZXN1bHRzPy5pZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIGZpbHRlciBhbmQgdXBkYXRlIHRoZSBhcHByb3ByaWF0ZSBTZWxlY3QgaWYgaXQgd2FzIHByZXZpb3VzbHkgaW5jbHVkZWQgaW4gYSBzZWxlY3Rpb25cbiAgICAgKiBAcGFyYW0gZmFjZXROYW1lIHRoZSBmYWNldCB0aGF0IHJlbW92ZXMgdGhlIGZpbHRlclxuICAgICAqIEBwYXJhbSBhZ2dyZWdhdGlvbiB0aGUgYWdncmVnYXRpb24gdGhhdCBjb250YWlucyB0aGUgaXRlbSB0byByZW1vdmVcbiAgICAgKiBAcGFyYW0gaXRlbSB0aGUgYWdncmVnYXRpb24gaXRlbSB0byByZW1vdmUgZnJvbSB0aGUgcXVlcnlcbiAgICAgKiBAcGFyYW0gcXVlcnkgdGhlIHF1ZXJ5IG9uIHdoaWNoIHRvIHJlbW92ZSB0aGUgZmlsdGVyIChkZWZhdWx0cyB0byBzZWFyY2ggc2VydmljZSBxdWVyeSlcbiAgICAgKiBAcGFyYW0gYnJlYWRjcnVtYnMgYnJlYWRjcnVtYnMgaW4gd2hpY2ggdG8gbG9vayBmb3Igc2VsZWN0ZWQgaXRlbXMgKGRlZmF1bHRzICB0byBzZWFyY2ggc2VydmljZSBicmVhZGNydW1icylcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVtb3ZlRmlsdGVyKFxuICAgICAgICBmYWNldE5hbWU6IHN0cmluZyxcbiAgICAgICAgYWdncmVnYXRpb246IEFnZ3JlZ2F0aW9uLFxuICAgICAgICBpdGVtOiBBZ2dyZWdhdGlvbkl0ZW0sXG4gICAgICAgIHF1ZXJ5ID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnF1ZXJ5LFxuICAgICAgICBicmVhZGNydW1icyA9IHRoaXMuc2VhcmNoU2VydmljZS5icmVhZGNydW1icyk6IFNlbGVjdCB8IHVuZGVmaW5lZCB7XG5cbiAgICAgICAgaWYgKGJyZWFkY3J1bWJzKSB7XG4gICAgICAgICAgICAvLyBpZiBpdGVtIGlzIGV4Y2x1ZGVkLCBtYWtlQWdncmVnYXRpb24oKSBzaG91bGQgcmV0dXJucyBhIE5PVCBleHByZXNzaW9uXG4gICAgICAgICAgICBjb25zdCBzdHJpbmdFeHByID0gaXRlbS4kZXhjbHVkZWQgPyB0aGlzLmV4cHJCdWlsZGVyLm1ha2VOb3RFeHByKHRoaXMuZXhwckJ1aWxkZXIubWFrZUFnZ3JlZ2F0aW9uRXhwcihhZ2dyZWdhdGlvbiwgaXRlbSkpIDogdGhpcy5leHByQnVpbGRlci5tYWtlQWdncmVnYXRpb25FeHByKGFnZ3JlZ2F0aW9uLCBpdGVtKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlckV4cHIgPSB0aGlzLmZpbmRJdGVtRmlsdGVyKGZhY2V0TmFtZSwgYWdncmVnYXRpb24sIGl0ZW0sIGJyZWFkY3J1bWJzKSB8fCB0aGlzLmFwcFNlcnZpY2UucGFyc2VFeHByKHN0cmluZ0V4cHIpO1xuICAgICAgICAgICAgY29uc3QgZXhwciA9IGJyZWFkY3J1bWJzLmZpbmRTZWxlY3QoZmFjZXROYW1lLCBmaWx0ZXJFeHByKTtcbiAgICAgICAgICAgIGNvbnN0IGkgPSBicmVhZGNydW1icy5hY3RpdmVTZWxlY3RzLmZpbmRJbmRleChzZWxlY3QgPT4gc2VsZWN0LmZhY2V0ID09PSBmYWNldE5hbWUgJiYgKHNlbGVjdC5leHByID09PSBleHByIHx8IHNlbGVjdC5leHByID09PSBleHByPy5wYXJlbnQpKTtcblxuICAgICAgICAgICAgLy8gJ1NlbGVjdCcgY2FuJ3QgYmUgY3JlYXRlZCB3aGVuIGFnZ3JlZ2F0aW9uIGlzIGEgdHJlZSBtYXAsIHNvLCBhdm9pZCBhZ2dyZWdhdGlvbiB0cmVlXG4gICAgICAgICAgICAvLyBhbmQgcmVtb3ZlIHdob2xlIGJyZWFkY3J1bWJzXG4gICAgICAgICAgICBpZiAoIWFnZ3JlZ2F0aW9uLmlzVHJlZSAmJiBleHByICYmIGV4cHIucGFyZW50ICYmIGV4cHIucGFyZW50Lm9wZXJhbmRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgYSBuZXcgRXhwciBmcm9tIHBhcmVudCBhbmQgcmVwbGFjZXMgU2VsZWN0IGJ5IHRoaXMgbmV3IG9uZVxuICAgICAgICAgICAgICAgIC8vIHNvLCBicmVhZGNydW1icyBzdGF5IG9yZGVyZWRcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJCeVZhbHVlc0FyZUV4cHJlc3Npb24gPSAoaXQ6IEFnZ3JlZ2F0aW9uSXRlbSkgPT4gaXQudmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC8gL2csIFwiXCIpICE9PSBpdGVtLnZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZSgvIC9nLCBcIlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJCeVZhbHVlID0gKGl0OiBBZ2dyZWdhdGlvbkl0ZW0pID0+IGl0LnZhbHVlICE9PSBpdGVtLnZhbHVlXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gKGFnZ3JlZ2F0aW9uLnZhbHVlc0FyZUV4cHJlc3Npb25zKSA/IGZpbHRlckJ5VmFsdWVzQXJlRXhwcmVzc2lvbiA6IGZpbHRlckJ5VmFsdWU7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtczogQWdncmVnYXRpb25JdGVtW10gPSB0aGlzLmV4cHJUb0FnZ3JlZ2F0aW9uSXRlbShleHByLnBhcmVudC5vcGVyYW5kcywgYWdncmVnYXRpb24udmFsdWVzQXJlRXhwcmVzc2lvbnMpLmZpbHRlcihmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIC8vIE1VU1QgcmVzZXQgJGV4Y2x1ZGVkIHByb3BlcnR5IG90aGVyd2lzZSBleHByZXNzaW9uIGlzIG1pc3VuZGVyc3Rvb2QgKG1haW5seSBOT1QgZXhwcmVzc2lvbnMpXG4gICAgICAgICAgICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uJGV4Y2x1ZGVkID0gdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICBjb25zdCB7bm90LCBhbmR9ID0gYnJlYWRjcnVtYnMuc2VsZWN0c1tpXS5leHByIHx8IHt9O1xuICAgICAgICAgICAgICAgIGxldCBfZXhwciA9IHRoaXMuZXhwckJ1aWxkZXIubWFrZUFnZ3JlZ2F0aW9uRXhwcihhZ2dyZWdhdGlvbiwgaXRlbXMsIGFuZCk7XG4gICAgICAgICAgICAgICAgaWYgKG5vdCkge1xuICAgICAgICAgICAgICAgICAgICBfZXhwciA9IHRoaXMuZXhwckJ1aWxkZXIubWFrZU5vdEV4cHIoX2V4cHIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoX2V4cHIpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkucmVwbGFjZVNlbGVjdChpLCB7ZXhwcmVzc2lvbjogX2V4cHIsIGZhY2V0OiBmYWNldE5hbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtleHByZXNzaW9uOiB0aGlzLmV4cHJCdWlsZGVyLm1ha2VBZ2dyZWdhdGlvbkV4cHIoYWdncmVnYXRpb24sIGl0ZW0pLCBmYWNldDogZmFjZXROYW1lfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGZpbHRlciBpcyBhIHNpbmdsZSB2YWx1ZS4uLiByZW1vdmUgaXRcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3QgPSBxdWVyeS5zZWxlY3QgPyBxdWVyeS5zZWxlY3RbaV0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcXVlcnkucmVtb3ZlU2VsZWN0KGkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBhZ2dyZWdhdGlvbiBmcm9tIHRoZSBzZWFyY2ggc2VydmljZSBxdWVyeSBhbmQgcmVmcmVzaCB0aGUgc2VhcmNoXG4gICAgICogQHBhcmFtIGZhY2V0TmFtZVxuICAgICAqIEBwYXJhbSBhZ2dyZWdhdGlvblxuICAgICAqIEBwYXJhbSBpdGVtXG4gICAgICovXG4gICAgcHVibGljIHJlbW92ZUZpbHRlclNlYXJjaChmYWNldE5hbWU6IHN0cmluZywgYWdncmVnYXRpb246IEFnZ3JlZ2F0aW9uLCBpdGVtOiBBZ2dyZWdhdGlvbkl0ZW0pOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICBjb25zdCBzZWxlY3QgPSB0aGlzLnJlbW92ZUZpbHRlcihmYWNldE5hbWUsIGFnZ3JlZ2F0aW9uLCBpdGVtKTtcbiAgICAgICAgaWYoc2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZTogRmFjZXRFdmVudFR5cGUuUmVtb3ZlRmlsdGVyLCBmYWNldDogdGhpcy5mYWNldChmYWNldE5hbWUgfHwgXCJcIil9KTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnkucXVlcnlJZDsgLy8gU0JBLTE1NFxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2godW5kZWZpbmVkLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogRmFjZXRFdmVudFR5cGUuUmVtb3ZlRmlsdGVyLFxuICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICBpdGVtOiB7ZXhwcmVzc2lvbjogc2VsZWN0Py5leHByZXNzaW9uLCBmYWNldDogc2VsZWN0Py5mYWNldH0sXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1ib3g6IGZhY2V0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbWNvbHVtbjogYWdncmVnYXRpb24uY29sdW1uLFxuICAgICAgICAgICAgICAgICAgICBcImZyb20tcmVzdWx0LWlkXCI6ICEhdGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHMgPyB0aGlzLnNlYXJjaFNlcnZpY2UucmVzdWx0cy5pZCA6IG51bGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBRdWVyaWVzIHRoZSBzZXJ2ZXIgZm9yIGRhdGEgZm9yIHRoaXMgYWdncmVnYXRpb25cbiAgICAgKiBAcGFyYW0gYWdncmVnYXRpb25cbiAgICAgKiBAcGFyYW0gc2tpcFxuICAgICAqIEBwYXJhbSBjb3VudFxuICAgICAqIEBwYXJhbSBxdWVyeSB0aGUgcXVlcnkgdG8gdXNlIHRvIGZldGNoIHRoZSBkYXRhIChkZWZhdWx0IHRvIHNlYXJjaCBzZXJ2aWNlIHF1ZXJ5KVxuICAgICAqL1xuICAgIHB1YmxpYyBsb2FkRGF0YShcbiAgICAgICAgYWdncmVnYXRpb246IHN0cmluZyxcbiAgICAgICAgc2tpcDogbnVtYmVyID0gMCxcbiAgICAgICAgY291bnQ6IG51bWJlciA9IDEwLFxuICAgICAgICBxdWVyeSA9IHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeSxcbiAgICAgICAgc2VhcmNoSW5hY3RpdmUgPSB0cnVlKTogT2JzZXJ2YWJsZTxBZ2dyZWdhdGlvbiB8IHVuZGVmaW5lZD4ge1xuXG4gICAgICAgIHF1ZXJ5ID0gVXRpbHMuY29weShxdWVyeSk7XG4gICAgICAgIHF1ZXJ5LmFjdGlvbiA9IFwiYWdncmVnYXRlXCI7XG4gICAgICAgIHF1ZXJ5LmFnZ3JlZ2F0aW9ucyA9IHt9O1xuICAgICAgICBxdWVyeS5hZ2dyZWdhdGlvbnNbYWdncmVnYXRpb25dID0ge3NraXA6IHNraXAsIGNvdW50OiBjb3VudH07XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaFNlcnZpY2UuZ2V0UmVzdWx0cyhxdWVyeSwgdW5kZWZpbmVkLCB7c2VhcmNoSW5hY3RpdmV9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHRzOiBSZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3VsdHMuYWdncmVnYXRpb25zLmZpbmQoYSA9PiBVdGlscy5lcU5DKGEubmFtZSwgYWdncmVnYXRpb24pKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENvbHVtbihkYXRhKTsgICAvLyBVc2VmdWwgZm9yIGZvcm1hdHRpbmcgYW5kIGkxOG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBzdWdnZXN0aW9ucyBnaXZlbiBhIHRleHQgYW5kIGEgZmllbGQgbmFtZSwgdXNpbmcgdGhlIFN1Z2dlc3Qgc2VydmljZVxuICAgICAqIEBwYXJhbSB0ZXh0XG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICogQHBhcmFtIHN1Z2dlc3RRdWVyeVxuICAgICAqL1xuICAgIHB1YmxpYyBzdWdnZXN0KHRleHQ6IHN0cmluZywgZmllbGQ6IHN0cmluZywgc3VnZ2VzdFF1ZXJ5ID0gdGhpcy5hcHBTZXJ2aWNlLnN1Z2dlc3RRdWVyaWVzWzBdKTogT2JzZXJ2YWJsZTxTdWdnZXN0aW9uW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VnZ2VzdFNlcnZpY2UuZ2V0KHN1Z2dlc3RRdWVyeSwgdGV4dCwgW2ZpZWxkXSwgdGhpcy5zZWFyY2hTZXJ2aWNlLnF1ZXJ5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb3JtYXQgdGhlIGdpdmVuIHJlc3VsdCBpdGVtLCB1c2luZyBmaWVsZCBmb3JtYXR0ZXIgYW5kL29yIGkxOG4gc2VydmljZVxuICAgICAqIEBwYXJhbSBpdGVtXG4gICAgICovXG4gICAgZm9ybWF0VmFsdWUoaXRlbTogQWdncmVnYXRpb25JdGVtKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50bFNlcnZpY2UuZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0U2VydmljZS5mb3JtYXRGaWVsZFZhbHVlKGl0ZW0sIGl0ZW0uJGNvbHVtbikpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGZhY2V0IGhhcyBhdCBsZWFzdCBvbmUgYWN0aXZlIHNlbGVjdGlvblxuICAgICAqIGZpbHRlcmluZyB0aGUgc2VhcmNoXG4gICAgICogQHBhcmFtIGZhY2V0TmFtZVxuICAgICAqIEBwYXJhbSBicmVhZGNydW1icyBicmVhZGNydW1icyBpbiB3aGljaCB0byBsb29rIGZvciBzZWxlY3RlZCBpdGVtcyAoZGVmYXVsdHMgdG8gc2VhcmNoIHNlcnZpY2UgYnJlYWRjcnVtYnMpXG4gICAgICovXG4gICAgcHVibGljIGhhc0ZpbHRlcmVkKGZhY2V0TmFtZTogc3RyaW5nLCBicmVhZGNydW1icyA9IHRoaXMuc2VhcmNoU2VydmljZS5icmVhZGNydW1icykgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5maW5kRmlsdGVyKGZhY2V0TmFtZSwgYnJlYWRjcnVtYnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYWN0aXZlIHNlbGVjdGlvbiBvZiB0aGlzIGZhY2V0IGZpbHRlcmluZyB0aGUgc2VhcmNoXG4gICAgICogUmV0dXJucyBpdCBhcyBhbiBleHByZXNzaW9uXG4gICAgICogQHBhcmFtIGZhY2V0TmFtZVxuICAgICAqIEBwYXJhbSBicmVhZGNydW1icyBicmVhZGNydW1icyBpbiB3aGljaCB0byBsb29rIGZvciBzZWxlY3RlZCBpdGVtcyAoZGVmYXVsdHMgdG8gc2VhcmNoIHNlcnZpY2UgYnJlYWRjcnVtYnMpXG4gICAgICovXG4gICAgcHVibGljIGZpbmRGaWx0ZXIoZmFjZXROYW1lOiBzdHJpbmcsIGJyZWFkY3J1bWJzID0gdGhpcy5zZWFyY2hTZXJ2aWNlLmJyZWFkY3J1bWJzKSA6IEV4cHIgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gYnJlYWRjcnVtYnM/LmZpbmRTZWxlY3QoZmFjZXROYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb29rIGZvciBhbiBhZ2dyZWdhdGlvbiB3aXRoIHRoZSBnaXZlbiBuYW1lIGluIHRoZSBzZWFyY2ggcmVzdWx0cyBhbmQgcmV0dXJucyBpdC5cbiAgICAgKiBUYWtlcyBjYXJlIG9mIGluaXRpYWxpemluZyB0aGUgYWdncmVnYXRpb24gaXRlbXMgdG8gaW5zZXJ0IHRoZWlyICRjb2x1bW4gcHJvcGVydHkuXG4gICAgICogQHBhcmFtIGFnZ3JlZ2F0aW9uTmFtZVxuICAgICAqIEBwYXJhbSByZXN1bHRzIFRoZSBzZWFyY2ggcmVzdWx0cyBjYW4gYmUgcHJvdmlkZWQgZXhwbGljaXRseSBvciB0YWtlbiBmcm9tIHRoZSBTZWFyY2hTZXJ2aWNlIGltcGxpY2l0bHkuXG4gICAgICovXG4gICAgZ2V0QWdncmVnYXRpb24oXG4gICAgICAgIGFnZ3JlZ2F0aW9uTmFtZTogc3RyaW5nLFxuICAgICAgICByZXN1bHRzID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHMsXG4gICAgICAgIHRyZWVBZ2dyZWdhdGlvbk9wdGlvbnM/OiB7XG4gICAgICAgICAgICBmYWNldE5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgIGxldmVsQ2FsbGJhY2s/OiAobm9kZXM6IFRyZWVBZ2dyZWdhdGlvbk5vZGVbXSwgbGV2ZWw6IG51bWJlciwgbm9kZTogVHJlZUFnZ3JlZ2F0aW9uTm9kZSkgPT4gdm9pZFxuICAgICAgICB9XG4gICAgKTogQWdncmVnYXRpb24gfCBUcmVlQWdncmVnYXRpb24gfCB1bmRlZmluZWQge1xuXG4gICAgICAgIGlmIChyZXN1bHRzPy5hZ2dyZWdhdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGFnZ3JlZ2F0aW9uID0gcmVzdWx0cy5hZ2dyZWdhdGlvbnMuZmluZChhZ2cgPT4gVXRpbHMuZXFOQyhhZ2cubmFtZSwgYWdncmVnYXRpb25OYW1lKSlcbiAgICAgICAgICAgIGlmIChhZ2dyZWdhdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29sdW1uKGFnZ3JlZ2F0aW9uKTsgICAgLy8gVXNlZnVsIGZvciBmb3JtYXR0aW5nIGFuZCBpMThuXG4gICAgICAgICAgICAgICAgaWYgKGFnZ3JlZ2F0aW9uLmlzVHJlZSAmJiB0cmVlQWdncmVnYXRpb25PcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4cHIgPSB0aGlzLmZpbmRGaWx0ZXIodHJlZUFnZ3JlZ2F0aW9uT3B0aW9ucy5mYWNldE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBleHBhbmRQYXRocyA9IGV4cHIgPyBleHByLmdldFZhbHVlcyhhZ2dyZWdhdGlvbi5jb2x1bW4pIDogW107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFRyZWVOb2Rlcyh0cmVlQWdncmVnYXRpb25PcHRpb25zLmZhY2V0TmFtZSwgYWdncmVnYXRpb24sIFwiL1wiLCBhZ2dyZWdhdGlvbi5pdGVtcyBhcyBUcmVlQWdncmVnYXRpb25Ob2RlW10sIGV4cGFuZFBhdGhzLCB0cmVlQWdncmVnYXRpb25PcHRpb25zLmxldmVsQ2FsbGJhY2spO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhZ2dyZWdhdGlvbiBhcyBUcmVlQWdncmVnYXRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhZ2dyZWdhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvb2sgZm9yIGEgVHJlZSBhZ2dyZWdhdGlvbiB3aXRoIHRoZSBnaXZlbiBuYW1lIGluIHRoZSBzZWFyY2ggcmVzdWx0cyBhbmQgcmV0dXJucyBpdC5cbiAgICAgKiBUYWtlcyBjYXJlIG9mIGluaXRpYWxpemluZyB0aGUgTm9kZSBhZ2dyZWdhdGlvbiBpdGVtcyB0byBpbnNlcnQgdGhlaXIgcHJvcGVydGllcyAoJGNvbHVtbiwgJHBhdGgsICRvcGVuZWQsICRsZXZlbClcbiAgICAgKiBAZGVwcmVjYXRlZCB1c2UgZ2V0QWdncmVnYXRpb24oKSBpbnN0ZWFkXG4gICAgICogQHBhcmFtIGZhY2V0TmFtZVxuICAgICAqIEBwYXJhbSBhZ2dyZWdhdGlvbk5hbWVcbiAgICAgKiBAcGFyYW0gcmVzdWx0cyBUaGUgc2VhcmNoIHJlc3VsdHMgY2FuIGJlIHByb3ZpZGVkIGV4cGxpY2l0bHkgb3IgdGFrZW4gZnJvbSB0aGUgU2VhcmNoU2VydmljZSBpbXBsaWNpdGx5LlxuICAgICAqIEBwYXJhbSBsZXZlbENhbGxiYWNrIEEgY2FsbGJhY2sgbWV0aG9kIGNhbGxlZCBhdCBldmVyeSBsZXZlbCBvZiB0aGUgdHJlZS5cbiAgICAgKiBDYW4gYmUgdXNlZCB0byByZWFkIG9yIGFsdGVyIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBub2RlcyAob3BlbmluZywgY2xvc2luZyksIG9yIG5vZGUgbGlzdCAoc29ydGluZylcbiAgICAgKi9cbiAgICBnZXRUcmVlQWdncmVnYXRpb24oXG4gICAgICAgIGZhY2V0TmFtZTogc3RyaW5nLFxuICAgICAgICBhZ2dyZWdhdGlvbk5hbWU6IHN0cmluZyxcbiAgICAgICAgcmVzdWx0cyA9IHRoaXMuc2VhcmNoU2VydmljZS5yZXN1bHRzLFxuICAgICAgICBsZXZlbENhbGxiYWNrPzogKG5vZGVzOiBUcmVlQWdncmVnYXRpb25Ob2RlW10sIGxldmVsOiBudW1iZXIsIG5vZGU6IFRyZWVBZ2dyZWdhdGlvbk5vZGUpID0+IHZvaWRcbiAgICApOiBUcmVlQWdncmVnYXRpb24gfCB1bmRlZmluZWQge1xuXG4gICAgICAgIGNvbnN0IGFnZyA9IHRoaXMuZ2V0QWdncmVnYXRpb24oYWdncmVnYXRpb25OYW1lLCByZXN1bHRzKTtcbiAgICAgICAgaWYoYWdnPy5pc1RyZWUpe1xuICAgICAgICAgICAgY29uc3QgZXhwciA9IHRoaXMuZmluZEZpbHRlcihmYWNldE5hbWUpO1xuICAgICAgICAgICAgY29uc3QgZXhwYW5kUGF0aHMgPSBleHByID8gZXhwci5nZXRWYWx1ZXMoYWdnLmNvbHVtbikgOiBbXTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRyZWVOb2RlcyhmYWNldE5hbWUsIGFnZywgXCIvXCIsIGFnZy5pdGVtcyBhcyBUcmVlQWdncmVnYXRpb25Ob2RlW10sIGV4cGFuZFBhdGhzLCBsZXZlbENhbGxiYWNrKTtcblxuICAgICAgICAgICAgcmV0dXJuIGFnZyBhcyBUcmVlQWdncmVnYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjb3VudCBwYXJhbWV0ZXIgb2YgdGhlIGdpdmVuIGFnZ3JlZ2F0aW9uIChkZWZhdWx0IGlzIDEwKVxuICAgICAqIEBwYXJhbSBhZ2dyZWdhdGlvbk5hbWVcbiAgICAgKi9cbiAgICBnZXRBZ2dyZWdhdGlvbkNvdW50KGFnZ3JlZ2F0aW9uTmFtZTogc3RyaW5nKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcFNlcnZpY2UuZ2V0Q0NBZ2dyZWdhdGlvbihhZ2dyZWdhdGlvbk5hbWUpPy5jb3VudCB8fCAxMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVucyBhIFRyZWUgbm9kZSBvZiB0aGUgZ2l2ZW4gdHJlZSBmYWNldCBieSBxdWVyeWluZyBkYXRhIGZyb20gdGhlIHNlcnZlclxuICAgICAqIFRha2VzIGNhcmUgb2YgaW5pdGlhbGl6aW5nIHRoZSBOb2RlIGFnZ3JlZ2F0aW9uIGl0ZW1zIHRvIGluc2VydCB0aGVpciBwcm9wZXJ0aWVzICgkY29sdW1uLCAkcGF0aCwgJG9wZW5lZCwgJGxldmVsKVxuICAgICAqIEBwYXJhbSBmYWNldE5hbWVcbiAgICAgKiBAcGFyYW0gYWdncmVnYXRpb25cbiAgICAgKiBAcGFyYW0gaXRlbVxuICAgICAqIEBwYXJhbSBsZXZlbENhbGxiYWNrIEEgY2FsbGJhY2sgbWV0aG9kIGNhbGxlZCBhdCBldmVyeSBsZXZlbCBvZiB0aGUgdHJlZS5cbiAgICAgKiBDYW4gYmUgdXNlZCB0byByZWFkIG9yIGFsdGVyIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBub2RlcyAob3BlbmluZywgY2xvc2luZyksIG9yIG5vZGUgbGlzdCAoc29ydGluZylcbiAgICAgKi9cbiAgICBvcGVuKFxuICAgICAgICBmYWNldE5hbWU6IHN0cmluZyxcbiAgICAgICAgYWdncmVnYXRpb246IFRyZWVBZ2dyZWdhdGlvbixcbiAgICAgICAgaXRlbTogVHJlZUFnZ3JlZ2F0aW9uTm9kZSxcbiAgICAgICAgbGV2ZWxDYWxsYmFjaz86IChub2RlczogVHJlZUFnZ3JlZ2F0aW9uTm9kZVtdLCBsZXZlbDogbnVtYmVyLCBub2RlOiBUcmVlQWdncmVnYXRpb25Ob2RlKSA9PiB2b2lkLFxuICAgICAgICBxdWVyeSA9IHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeSxcbiAgICAgICAgc2VhcmNoSW5hY3RpdmUgPSB0cnVlXG4gICAgKTogT2JzZXJ2YWJsZTxSZXN1bHRzPiB7XG5cbiAgICAgICAgY29uc3QgdmFsdWUgPSBpdGVtLiRwYXRoICsgXCIqXCI7XG4gICAgICAgIHF1ZXJ5ID0gUXVlcnkuY29weShxdWVyeSk7XG4gICAgICAgIHF1ZXJ5LmFjdGlvbiA9IFwib3BlblwiO1xuICAgICAgICBjb25zdCBleHByID0gdGhpcy5leHByQnVpbGRlci5tYWtlRXhwcihhZ2dyZWdhdGlvbi5jb2x1bW4sIHZhbHVlKTtcbiAgICAgICAgcXVlcnkuYWRkT3BlbihleHByLCBhZ2dyZWdhdGlvbi5uYW1lKTtcblxuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KHt0eXBlOiBGYWNldEV2ZW50VHlwZS5PcGVuLCBmYWNldDogdGhpcy5mYWNldChmYWNldE5hbWUpfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaFNlcnZpY2UuZ2V0UmVzdWx0cyhxdWVyeSwgdW5kZWZpbmVkLCB7c2VhcmNoSW5hY3RpdmV9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHRzOiBSZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uJHBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc291cmNlID0gRmFjZXRTZXJ2aWNlLmdldEFnZ3JlZ2F0aW9uTm9kZShyZXN1bHRzLmFnZ3JlZ2F0aW9uc1swXS5pdGVtcyBhcyBUcmVlQWdncmVnYXRpb25Ob2RlW10sIGl0ZW0uJHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBGYWNldFNlcnZpY2UuZ2V0QWdncmVnYXRpb25Ob2RlKGFnZ3JlZ2F0aW9uLml0ZW1zIGFzIFRyZWVBZ2dyZWdhdGlvbk5vZGVbXSwgaXRlbS4kcGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2UgJiYgdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuaXRlbXMgPSBzb3VyY2UuaXRlbXM7ICAgIC8vIEluc2VydCB0aGUgbmV3IGRhdGEgKHNvdXJjZSkgaW50byB0aGUgb3JpZ2luYWwgKHRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0VHJlZU5vZGVzKGZhY2V0TmFtZSwgYWdncmVnYXRpb24sIGl0ZW0uJHBhdGgsIHRhcmdldC5pdGVtcywgdW5kZWZpbmVkLCBsZXZlbENhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGEgZ2l2ZW4gYWdncmVnYXRpb24gaXRlbSBpcyBjdXJyZW50bHkgYWN0aXZlbHkgZmlsdGVyaW5nIHRoZSBzZWFyY2hcbiAgICAgKiBAcGFyYW0gZmFjZXROYW1lXG4gICAgICogQHBhcmFtIGFnZ3JlZ2F0aW9uXG4gICAgICogQHBhcmFtIGl0ZW1cbiAgICAgKiBAcGFyYW0gYnJlYWRjcnVtYnMgYnJlYWRjcnVtYnMgaW4gd2hpY2ggdG8gbG9vayBmb3Igc2VsZWN0ZWQgaXRlbXMgKGRlZmF1bHQgdG8gc2VhcmNoIHNlcnZpY2UgYnJlYWRjcnVtYnMpXG4gICAgICovXG4gICAgaXRlbUZpbHRlcmVkKGZhY2V0TmFtZTogc3RyaW5nLCBhZ2dyZWdhdGlvbjogQWdncmVnYXRpb24sIGl0ZW06IEFnZ3JlZ2F0aW9uSXRlbSwgYnJlYWRjcnVtYnMgPSB0aGlzLnNlYXJjaFNlcnZpY2UuYnJlYWRjcnVtYnMpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5maW5kSXRlbUZpbHRlcihmYWNldE5hbWUsIGFnZ3JlZ2F0aW9uLCBpdGVtLCBicmVhZGNydW1icyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGZpbmRJdGVtRmlsdGVyKGZhY2V0TmFtZTogc3RyaW5nLCBhZ2dyZWdhdGlvbjogQWdncmVnYXRpb24sIGl0ZW06IEFnZ3JlZ2F0aW9uSXRlbSwgYnJlYWRjcnVtYnM6IEJyZWFkY3J1bWJzIHwgdW5kZWZpbmVkKSA6IEV4cHIgfCB1bmRlZmluZWQge1xuICAgICAgICBsZXQgZXhwcjogRXhwciB8IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGV4cHJUZXh0OiBzdHJpbmc7XG4gICAgICAgIGlmICghYWdncmVnYXRpb24udmFsdWVzQXJlRXhwcmVzc2lvbnMpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nO1xuICAgICAgICAgICAgaWYgKGFnZ3JlZ2F0aW9uLmlzVHJlZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gVXRpbHMudG9TcWxWYWx1ZSgoPFRyZWVBZ2dyZWdhdGlvbk5vZGU+aXRlbSkuJHBhdGggKyBcIipcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IFV0aWxzLnRvU3FsVmFsdWUoaXRlbS52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHByVGV4dCA9IHRoaXMuZXhwckJ1aWxkZXIubWFrZUV4cHIoYWdncmVnYXRpb24uY29sdW1uLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBleHByVGV4dCA9IGl0ZW0udmFsdWUgYXMgc3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJldCA9IHRoaXMuYXBwU2VydmljZS5wYXJzZUV4cHIoZXhwclRleHQpO1xuICAgICAgICBpZiAocmV0IGluc3RhbmNlb2YgRXhwcikge1xuICAgICAgICAgICAgZXhwciA9IDxFeHByPnJldDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXhwcikge1xuICAgICAgICAgICAgY29uc3QgZXhwcjIgPSBicmVhZGNydW1icz8uZmluZFNlbGVjdChmYWNldE5hbWUsIGV4cHIpO1xuICAgICAgICAgICAgaWYoISFleHByMiAmJiAoIWV4cHIyLnBhcmVudCB8fCAhZXhwcjIucGFyZW50LnBhcmVudCkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBleHByMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBub2RlcyBvZiBhIHRyZWUgKHByaXZhdGUsIHdpdGggYSBjYWxsYmFjaylcbiAgICAgKiBAcGFyYW0gZmFjZXROYW1lXG4gICAgICogQHBhcmFtIGFnZ3JlZ2F0aW9uXG4gICAgICogQHBhcmFtIHJvb3RcbiAgICAgKiBAcGFyYW0gY2hpbGRyZW5cbiAgICAgKiBAcGFyYW0gZXhwYW5kUGF0aHNcbiAgICAgKiBAcGFyYW0gbGV2ZWxDYWxsYmFja1xuICAgICAqL1xuICAgIHByb3RlY3RlZCBpbml0VHJlZU5vZGVzKFxuICAgICAgICBmYWNldE5hbWU6IHN0cmluZyxcbiAgICAgICAgYWdncmVnYXRpb246IEFnZ3JlZ2F0aW9uLFxuICAgICAgICByb290OiBzdHJpbmcsXG4gICAgICAgIGNoaWxkcmVuOiBUcmVlQWdncmVnYXRpb25Ob2RlW10sXG4gICAgICAgIGV4cGFuZFBhdGhzPzogc3RyaW5nW10sXG4gICAgICAgIGxldmVsQ2FsbGJhY2s/OiAobm9kZXM6IFRyZWVBZ2dyZWdhdGlvbk5vZGVbXSwgbGV2ZWw6IG51bWJlciwgbm9kZTogVHJlZUFnZ3JlZ2F0aW9uTm9kZSkgPT4gdm9pZFxuICAgICkge1xuICAgICAgICBpZiAoIWNoaWxkcmVuKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJvb3RMZXZlbDogbnVtYmVyO1xuICAgICAgICBpZiAocm9vdCkge1xuICAgICAgICAgICAgcm9vdExldmVsID0gVXRpbHMuY291bnQocm9vdCwgXCIvXCIsIGZhbHNlKSAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByb290ID0gXCIvXCI7XG4gICAgICAgICAgICByb290TGV2ZWwgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuYXBwU2VydmljZS5nZXRDb2x1bW4oYWdncmVnYXRpb24uY29sdW1uKTtcbiAgICAgICAgVXRpbHMudHJhdmVyc2UoY2hpbGRyZW4sIChfbm9kZXMpID0+IHtcbiAgICAgICAgICAgIGlmICghX25vZGVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHBhdGggPSByb290O1xuICAgICAgICAgICAgbGV0IGxldmVsID0gcm9vdExldmVsO1xuICAgICAgICAgICAgZm9yIChjb25zdCBfbm9kZSBvZiBfbm9kZXMpIHtcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aCArIF9ub2RlLnZhbHVlICsgXCIvXCI7XG4gICAgICAgICAgICAgICAgbGV2ZWwrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBhdGgpO1xuICAgICAgICAgICAgY29uc3QgX25vZGUgPSBfbm9kZXNbX25vZGVzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgX25vZGUuJHBhdGggPSBwYXRoO1xuICAgICAgICAgICAgX25vZGUuJGNvbHVtbiA9IGNvbHVtbjtcbiAgICAgICAgICAgIF9ub2RlLiRsZXZlbCA9IGxldmVsO1xuICAgICAgICAgICAgX25vZGUuJG9wZW5lZCA9IGZhbHNlO1xuICAgICAgICAgICAgX25vZGUuJGZpbHRlcmVkID0gdGhpcy5pdGVtRmlsdGVyZWQoZmFjZXROYW1lLCBhZ2dyZWdhdGlvbiwgX25vZGUpXG4gICAgICAgICAgICBleHBhbmRQYXRocz8uZm9yRWFjaChleHBhbmRQYXRoID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXhwYW5kUGF0aC5pbmRleE9mKHBhdGgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gISFfbm9kZS5pdGVtcyA/IF9ub2RlLml0ZW1zLmxlbmd0aCA6IF9ub2RlLmhhc0NoaWxkcmVuID8gLTEgOiAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfbm9kZS4kb3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGxldmVsQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBsZXZlbENhbGxiYWNrKF9ub2RlcywgbGV2ZWwsIF9ub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gZG9uJ3Qgc3RvcFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0Q29sdW1uKGFnZ3JlZ2F0aW9uOiBBZ2dyZWdhdGlvbil7XG4gICAgICAgIGlmKCFhZ2dyZWdhdGlvbi5pc1RyZWUgJiYgYWdncmVnYXRpb24uaXRlbXMpe1xuICAgICAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5hcHBTZXJ2aWNlLmdldENvbHVtbihhZ2dyZWdhdGlvbi5jb2x1bW4pO1xuICAgICAgICAgICAgYWdncmVnYXRpb24uaXRlbXMuZm9yRWFjaCgodmFsdWUpID0+IHZhbHVlLiRjb2x1bW4gPSBjb2x1bW4pO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIC8vIHN0YXRpYyBtZXRob2RzXG5cbiAgICBwcm90ZWN0ZWQgc3RhdGljIHNwbGl0VHJlZXBhdGgocGF0aDogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgICAgICBpZiAoIXBhdGgpIHJldHVybiBbXTtcbiAgICAgICAgcGF0aCA9IHBhdGgudHJpbSgpO1xuICAgICAgICBpZiAocGF0aC5sZW5ndGggPiAwICYmIHBhdGhbMF0gPT09IFwiL1wiKSB7XG4gICAgICAgICAgICBwYXRoID0gcGF0aC5zdWJzdHIoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhdGgubGVuZ3RoID4gMCAmJiBwYXRoW3BhdGgubGVuZ3RoIC0gMV0gPT09IFwiL1wiKSB7XG4gICAgICAgICAgICBwYXRoID0gcGF0aC5zdWJzdHIoMCwgcGF0aC5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGF0aC5zcGxpdChcIi9cIik7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc3RhdGljIHRyZWVwYXRoTGFzdChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBwYXJ0cyA9IEZhY2V0U2VydmljZS5zcGxpdFRyZWVwYXRoKHBhdGgpO1xuICAgICAgICBpZiAoIXBhcnRzIHx8IHBhcnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzdGF0aWMgZ2V0QWdncmVnYXRpb25Ob2RlKG5vZGVzOiBUcmVlQWdncmVnYXRpb25Ob2RlW10sIHBhdGg6IHN0cmluZyk6IFRyZWVBZ2dyZWdhdGlvbk5vZGUgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoIW5vZGVzIHx8IG5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuYW1lcyA9IEZhY2V0U2VydmljZS5zcGxpdFRyZWVwYXRoKHBhdGgpO1xuICAgICAgICBsZXQgbm9kZTogVHJlZUFnZ3JlZ2F0aW9uTm9kZSB8IHVuZGVmaW5lZDtcbiAgICAgICAgZm9yIChsZXQgX2kgPSAwLCBfYSA9IG5hbWVzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgaWYgKCFub2RlcyB8fCBub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IF9hW19pXS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgbm9kZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGZvciAobGV0IF9qID0gMCwgX2IgPSBub2RlczsgX2ogPCBfYi5sZW5ndGg7IF9qKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBfbm9kZSA9IF9iW19qXTtcbiAgICAgICAgICAgICAgICBpZiAoKDxzdHJpbmc+X25vZGUudmFsdWUpLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IF9ub2RlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZXMgPSBub2RlLml0ZW1zO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBhbiBFeHByZXNzaW9uIG9iamVjdCBvciBhbiBFeHByZXNzaW9uIEFycmF5IHRvIHRoZWlyIEFnZ3JlZ2F0aW9uSXRlbSBlcXVpdmFsZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXhwciBFeHByZXNzaW9uIG9iamVjdCBvciBFeHByZXNzaW9uIEFycmF5XG4gICAgICogQHBhcmFtIHZhbHVlc0FyZUV4cHJlc3Npb25zIHdoZW4gdHJ1ZSB2YWx1ZXMgc2hvdWxkIGJlIGNvbnZlcnRlZCB0byBzdHJpbmcgb3RoZXJ3aXNlIG5vXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBZ2dyZWdhdGlvbkl0ZW0gYXJyYXkgd2l0aCBjb252ZXJ0ZWQgZXhwcmVzc2lvbiBvciBhbiBlbXB0eSBhcnJheVxuICAgICAqL1xuICAgIGV4cHJUb0FnZ3JlZ2F0aW9uSXRlbShleHByOiBFeHByW10gfCBFeHByLCB2YWx1ZXNBcmVFeHByZXNzaW9uczogYm9vbGVhbiA9IGZhbHNlKTogQWdncmVnYXRpb25JdGVtW10ge1xuICAgICAgICBjb25zdCBmbiA9IFtcbiAgICAgICAgICAgIChpdGVtOiBFeHByKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBGaWVsZFZhbHVlID0gaXRlbS52YWx1ZSBhcyBzdHJpbmc7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY29sdW1uPy5lVHlwZSA9PT0gRW5naW5lVHlwZS5ib29sKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gVXRpbHMuaXNUcnVlKGl0ZW0udmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gKHtjb3VudDogMCwgdmFsdWUsIGRpc3BsYXk6IGl0ZW0uZGlzcGxheSwgJGNvbHVtbjogaXRlbS5jb2x1bW4sICRleGNsdWRlZDogKGl0ZW0/Lm5vdCB8fCBpdGVtPy5wYXJlbnQ/Lm5vdCl9IGFzIEFnZ3JlZ2F0aW9uSXRlbSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGl0ZW06IEV4cHIpID0+ICh7Y291bnQ6IDAsIHZhbHVlOiBpdGVtLnRvU3RyaW5nKChpdGVtLnZhbHVlKSA/IHRydWUgOiBmYWxzZSksIGRpc3BsYXk6IGl0ZW0uZGlzcGxheSwgJGNvbHVtbjogaXRlbS5jb2x1bW4sICRleGNsdWRlZDogKGl0ZW0/Lm5vdCB8fCBpdGVtPy5wYXJlbnQ/Lm5vdCl9IGFzIEFnZ3JlZ2F0aW9uSXRlbSlcbiAgICAgICAgXTtcblxuICAgICAgICBjb25zdCBjYWxsYmFjayA9IHZhbHVlc0FyZUV4cHJlc3Npb25zID8gZm5bMV0gOiBmblswXTtcbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdChleHByIGFzIFtdKS5tYXAoY2FsbGJhY2spIGFzIEFnZ3JlZ2F0aW9uSXRlbVtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgQnJlYWRjcnVtYnMgaXRlbXMgZnJvbSBhIHNwZWNpZmljIGZhY2V0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gZmFjZXROYW1lIGZhY2V0IG5hbWUgd2hlcmUgdG8gZXh0cmFjdCBhbGwgYnJlYWRjcnVtYnNcbiAgICAgKiBAcGFyYW0gYnJlYWRjcnVtYnMgYnJlYWRjcnVtYnMgaW4gd2hpY2ggdG8gbG9vayBmb3Igc2VsZWN0ZWQgaXRlbXNcbiAgICAgKi9cbiAgICBnZXRCcmVhZGNydW1ic0l0ZW1zKGZhY2V0TmFtZTogc3RyaW5nLCBicmVhZGNydW1iczogQnJlYWRjcnVtYnMgfCB1bmRlZmluZWQpOiBCcmVhZGNydW1ic0l0ZW1bXSB7XG4gICAgICAgIHJldHVybiBicmVhZGNydW1icz8uaXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5mYWNldCA9PT0gZmFjZXROYW1lKSB8fCBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIEFnZ3JlZ2F0aW9uIGl0ZW1zIGZyb20gYSBmYWNldCwgY3VycmVudGx5IGZpbHRlcmVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZmFjZXROYW1lIGZhY2V0IG5hbWUgd2hlcmUgdG8gaW5zcGVjdFxuICAgICAqIEBwYXJhbSB2YWx1ZXNBcmVFeHByZXNzaW9ucyB3aGVuIHRydWUsIHNvbWUgdHJhbnNmb3JtYXRpb25zIHNob3VsZCBiZSBkb25lXG4gICAgICogQHBhcmFtIGJyZWFkY3J1bWJzIGJyZWFkY3J1bWJzIGluIHdoaWNoIHRvIGxvb2sgZm9yIHNlbGVjdGVkIGl0ZW1zIChkZWZhdWx0IHRvIHNlYXJjaCBzZXJ2aWNlIGJyZWFkY3J1bWJzKVxuICAgICAqL1xuICAgIGdldEFnZ3JlZ2F0aW9uSXRlbXNGaWx0ZXJlZChmYWNldE5hbWU6IHN0cmluZywgdmFsdWVzQXJlRXhwcmVzc2lvbnM6IGJvb2xlYW4gPSBmYWxzZSwgYnJlYWRjcnVtYnMgPSB0aGlzLnNlYXJjaFNlcnZpY2UuYnJlYWRjcnVtYnMpOiBBZ2dyZWdhdGlvbkl0ZW1bXSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5nZXRCcmVhZGNydW1ic0l0ZW1zKGZhY2V0TmFtZSwgYnJlYWRjcnVtYnMpO1xuXG4gICAgICAgIC8vIGFnZ3JlZ2F0aW9uIGl0ZW1zIGFyZSBjb25zdHJ1Y3RlZCBmcm9tIG5lc3RlZCBleHByZXNzaW9uc1xuICAgICAgICBjb25zdCBleHByID0gW10gYXMgRXhwcltdW107XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAoaXRlbS5leHByPy5kaXNwbGF5ID09PSB1bmRlZmluZWQpID8gaXRlbS5leHByPy5vcGVyYW5kcyBhcyBFeHByW10gfHwgaXRlbS5leHByIDogaXRlbS5leHByO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZXhwci5wdXNoKHZhbHVlIGFzIEV4cHJbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gZmFsdHRlbiByZXN1bHRzXG4gICAgICAgIGNvbnN0IGZsYXR0ZW5FeHByID0gW10uY29uY2F0LmFwcGx5KFtdLCBleHByKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5leHByVG9BZ2dyZWdhdGlvbkl0ZW0oZmxhdHRlbkV4cHIsIHZhbHVlc0FyZUV4cHJlc3Npb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IFN1Z2dlc3Rpb24gdG8gQWdncmVnYXRpb25JdGVtXG4gICAgICogQHBhcmFtIHN1Z2dlc3QgYSBTdWdnZXN0aW9uIG9iamVjdFxuICAgICAqXG4gICAgICogQHJldHVybnMgQWdncmVnYXRpb25JdGVtIG9iamVjdCB3aXRoIGlzIGAkY29sdW1uYCBwcm9wZXJ0eSBkZWZpbmVkLlxuICAgICAqIE9uIGJvb2xlYW4gdHlwZSwgY29udmVydCBgdmFsdWVgIHByb3BlcnR5IHRvIGJvb2xlYW5cbiAgICAgKi9cbiAgICBzdWdnZXN0aW9uVG9BZ2dyZWdhdGlvbkl0ZW0oc3VnZ2VzdDogU3VnZ2VzdGlvbik6IEFnZ3JlZ2F0aW9uSXRlbSB7XG4gICAgICAgIGNvbnN0IGl0ZW06IEFnZ3JlZ2F0aW9uSXRlbSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBzdWdnZXN0Lm5vcm1hbGl6ZWQgfHwgc3VnZ2VzdC5kaXNwbGF5LFxuICAgICAgICAgICAgZGlzcGxheTogc3VnZ2VzdC5kaXNwbGF5LFxuICAgICAgICAgICAgY291bnQ6ICsoc3VnZ2VzdC5mcmVxdWVuY3kgfHwgMCksXG4gICAgICAgICAgICAkY29sdW1uOiB0aGlzLmFwcFNlcnZpY2UuZ2V0Q29sdW1uKHN1Z2dlc3QuY2F0ZWdvcnkpXG4gICAgICAgIH07XG4gICAgICAgIGlmIChpdGVtLiRjb2x1bW4/LmVUeXBlID09PSBFbmdpbmVUeXBlLmJvb2wpIHtcbiAgICAgICAgICAgIGl0ZW0udmFsdWUgPSBVdGlscy5pc1RydWUoaXRlbS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBsaXN0IG9mIHN1Z2dlc3Rpb25zIGludG8gYSBzdHJ1Y3R1cmUgb2YgVHJlZUFnZ3JlZ2F0aW9uTm9kZXNcbiAgICAgKiBAcGFyYW0gc3VnZ2VzdHMgU3VnZ2VzdGlvbnMgdG8gY29udmVydFxuICAgICAqIEBwYXJhbSBzZWFyY2hUZXJtIFRoZSBzZWFyY2hlZCB0ZXJtIGluIHRoZSBzdWdnZXN0aW9uc1xuICAgICAqIEBwYXJhbSBhZ2dyZWdhdGlvbiBUaGUgdHJlZSBhZ2dyZWdhdGlvbnNcbiAgICAgKi9cbiAgICBzdWdnZXN0aW9uc1RvVHJlZUFnZ3JlZ2F0aW9uTm9kZXMoc3VnZ2VzdHM6IFN1Z2dlc3Rpb25bXSwgc2VhcmNoVGVybTogc3RyaW5nLCBhZ2dyZWdhdGlvbjogQWdncmVnYXRpb24gfCB1bmRlZmluZWQpOiBUcmVlQWdncmVnYXRpb25Ob2RlW10ge1xuICAgICAgICBjb25zdCBzdWdnZXN0aW9uczogVHJlZUFnZ3JlZ2F0aW9uTm9kZVtdID0gW107XG4gICAgICAgIGlmKHN1Z2dlc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGgybm9kZSA9IG5ldyBNYXA8c3RyaW5nLFRyZWVBZ2dyZWdhdGlvbk5vZGU+KCk7XG4gICAgICAgICAgICBjb25zdCBzZWFyY2hQYXR0ZXJuID0gbmV3IFJlZ0V4cChgXFxcXGIke3NlYXJjaFRlcm19YCwgJ2knKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuYXBwU2VydmljZS5nZXRDb2x1bW4oYWdncmVnYXRpb24/LmNvbHVtbik7XG4gICAgICAgICAgICBzdWdnZXN0cy5mb3JFYWNoKHN1Z2dlc3QgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHN1Z2dlc3QuZGlzcGxheS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gc2VhcmNoUGF0dGVybi5leGVjKHN1Z2dlc3QuZGlzcGxheSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkTm9kZShzdWdnZXN0aW9ucywgcGF0aDJub2RlLCBcIi9cIiwgc3VnZ2VzdC5kaXNwbGF5LCArKHN1Z2dlc3QuZnJlcXVlbmN5IHx8IDApLCAxLCAobWF0Y2g/LmluZGV4IHx8IDApK3NlYXJjaFRlcm0ubGVuZ3RoLCBjb2x1bW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWdnZXN0aW9ucztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IHJlY3Vyc2l2ZSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBhIHRyZWUgYWdncmVnYXRpb24gc3RydWN0dXJlIGZyb21cbiAgICAgKiBhIGxpc3Qgb2Ygc3VnZ2VzdGlvbnNcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWRkTm9kZShpdGVtczogVHJlZUFnZ3JlZ2F0aW9uTm9kZVtdLFxuICAgICAgICAgICAgcGF0aDJub2RlOiBNYXA8c3RyaW5nLFRyZWVBZ2dyZWdhdGlvbk5vZGU+LFxuICAgICAgICAgICAgcGFyZW50UGF0aDogc3RyaW5nLFxuICAgICAgICAgICAgcGF0aDogc3RyaW5nLFxuICAgICAgICAgICAgY291bnQ6IG51bWJlcixcbiAgICAgICAgICAgIGxldmVsOiBudW1iZXIsXG4gICAgICAgICAgICBtYXRjaGVuZDogbnVtYmVyLFxuICAgICAgICAgICAgY29sdW1uOiBDQ0NvbHVtbiB8IHVuZGVmaW5lZCkge1xuXG4gICAgICAgIGNvbnN0IG5leHRDaGlsZCA9IHBhdGguaW5kZXhPZihcIi9cIiwgcGFyZW50UGF0aC5sZW5ndGgpOyAvLyBwYXRoID0gL0NpdGllcy9QYXJpcy8xN2UvICAgcGFyZW50UGF0aCA9IC9DaXRpZXMvXG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gcGF0aC5zdWJzdHJpbmcoMCwgbmV4dENoaWxkKzEpOyAvLyA9PiBjdXJyZW50UGF0aCA9IC9DaXRpZXMvUGFyaXMvXG4gICAgICAgIGxldCBub2RlID0gcGF0aDJub2RlLmdldChjdXJyZW50UGF0aCk7XG5cbiAgICAgICAgaWYoIW5vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcGF0aC5zdWJzdHJpbmcocGFyZW50UGF0aC5sZW5ndGgsIG5leHRDaGlsZCk7XG4gICAgICAgICAgICBub2RlID0ge1xuICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgIGNvdW50LFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgICAgICAgICBoYXNDaGlsZHJlbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgJGNvbHVtbjogY29sdW1uLFxuICAgICAgICAgICAgICAgICRsZXZlbDogbGV2ZWwsXG4gICAgICAgICAgICAgICAgJG9wZW5lZDogbWF0Y2hlbmQgPj0gY3VycmVudFBhdGgubGVuZ3RoLFxuICAgICAgICAgICAgICAgICRwYXRoOiBjdXJyZW50UGF0aFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGgybm9kZS5zZXQoY3VycmVudFBhdGgsIG5vZGUpO1xuICAgICAgICAgICAgaXRlbXMucHVzaChub2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGN1cnJlbnRQYXRoLmxlbmd0aCA8IHBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICBub2RlLmhhc0NoaWxkcmVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYWRkTm9kZShub2RlLml0ZW1zLCBwYXRoMm5vZGUsIGN1cnJlbnRQYXRoLCBwYXRoLCBjb3VudCwgbGV2ZWwrMSwgbWF0Y2hlbmQsIGNvbHVtbik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGEgZmFjZXQgY29udGFpbnMgaXRlbXNcbiAgICAgKiBAcGFyYW0gYWdncmVnYXRpb24gYWdncmVnYXRpb24gbmFtZVxuICAgICAqIEBwYXJhbSByZXN1bHRzIHNlYXJjaCByZXN1bHRzXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIHRoZSBmYWNldCBjb250YWlucyBhIGxlYXN0IG9uZSBpdGVtIG90aGVyd2lzZSBmYWxzZVxuICAgICAqL1xuICAgIGhhc0RhdGEoYWdncmVnYXRpb246IHN0cmluZywgcmVzdWx0czogUmVzdWx0cyk6IGJvb2xlYW4ge1xuICAgICAgICAvLyBBdm9pZCBjYWxsaW5nIGdldEFnZ3JlZ2F0aW9uKCkgd2hpY2ggaXMgY29zdGx5XG4gICAgICAgIHJldHVybiAhIXJlc3VsdHMuYWdncmVnYXRpb25zLmZpbmQoYWdnID0+IFV0aWxzLmVxTkMoYWdnLm5hbWUsIGFnZ3JlZ2F0aW9uKSk/Lml0ZW1zPy5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhlIHN1cHBsaWVkIGFycmF5XG4gICAgICogY29ycmVzcG9uZGluZyB0byBgaXRlbS52YWx1ZWAgb3IgLTEgd2hlbiBub3QgZm91bmQuXG4gICAgICogQSBmYWxsYmFjayB0byBgaXRlbS5kaXNwbGF5YCBpcyBkb25lIGJlZm9yZSByZXR1cm5pbmcgLTFcbiAgICAgKiBAcGFyYW0gaXRlbSBpdGVtIHRvIGZpbmRcbiAgICAgKi9cbiAgICBmaWx0ZXJlZEluZGV4KGRhdGE6IEFnZ3JlZ2F0aW9uIHwgdW5kZWZpbmVkLCBhcnI6IEFycmF5PEFnZ3JlZ2F0aW9uSXRlbT4sIGl0ZW06IEFnZ3JlZ2F0aW9uSXRlbSk6IG51bWJlciB7XG4gICAgICAgIGxldCBpbmR4ID0gLTE7XG4gICAgICAgIC8vIHNwZWNpZmljIHRvIFZhbHVlcyBBcmUgRXhwcmVzc2lvbnMgd2hlcmUgZXhwcmVzc2lvbiBhcmUgbm90IHdlbGwgZm9ybWF0dGVkIGJ5IEV4cHJlc3Npb24gUGFyc2VyXG4gICAgICAgIC8vIGVnOiB3aGVuIHZhbHVlcyBpcyA6IFwiPiAwXCIsIEV4cHJlc3Npb24gUGFyc2VyIHJldHVybnMgOiBcIj4wXCIgd2l0aG91dCBzcGFjZSBiZXR3ZWVuIG9wZXJhdG9yIGFuZCB2YWx1ZVxuICAgICAgICBpZiAoZGF0YT8udmFsdWVzQXJlRXhwcmVzc2lvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy50cmltQWxsV2hpdGVzcGFjZShpdGVtLnZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRBcnIgPSBhcnIubWFwKGl0ZW0gPT4gKHsuLi5pdGVtLCB2YWx1ZTogdGhpcy50cmltQWxsV2hpdGVzcGFjZShpdGVtLnZhbHVlKX0pKSB8fCBbXTtcbiAgICAgICAgICAgIGluZHggPSBub3JtYWxpemVkQXJyLmZpbmRJbmRleChpdCA9PiBpdC52YWx1ZSA9PT0gdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5keCA9IHRoaXMuZmluZEFnZ3JlZ2F0aW9uSXRlbUluZGV4KGFyciwgaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluZHg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXRpbGl0eSBmdW5jdGlvbiB0byByZXR1cm5zIGFnZ3JlZ2F0aW9uIGl0ZW0ncyBpbmRleCBpbiBzdXBwbGllZCBhcnJheSB3aXRoIGZhbGxiYWNrIHRvIGBkaXNwbGF5YCBjb21wYXJpc29uLlxuICAgICAqIE90aGVyd2lzZSAtMSwgaW5kaWNhdGluZyB0aGF0IG5vIGVsZW1lbnQgcGFzc2VkIHRoZSB0ZXN0LlxuICAgICAqIEBwYXJhbSBhcnIgVGhlIGFycmF5IGZpbmRJbmRleCgpIHdhcyBjYWxsZWQgdXBvblxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gYmUgdGVzdFxuICAgICAqL1xuICAgIHB1YmxpYyBmaW5kQWdncmVnYXRpb25JdGVtSW5kZXggPSAoYXJyOiBBcnJheTxBZ2dyZWdhdGlvbkl0ZW0+LCBpdGVtOiBBZ2dyZWdhdGlvbkl0ZW0pID0+IHtcbiAgICAgICAgbGV0IGluZGV4ID0gYXJyLmZpbmRJbmRleChpdCA9PiBpdC52YWx1ZSA9PT0gaXRlbS52YWx1ZSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEgJiYgaXRlbS5kaXNwbGF5KSB7XG4gICAgICAgICAgICAvLyBmYWxsYmFjayB0byBkaXNwbGF5IGNvbXBhcmlzb25cbiAgICAgICAgICAgIGluZGV4ID0gYXJyLmZpbmRJbmRleChpdCA9PiBpdC5kaXNwbGF5ID09PSBpdGVtLmRpc3BsYXkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSB0cmltQWxsV2hpdGVzcGFjZSA9ICh2YWx1ZTogRmllbGRWYWx1ZSB8IHVuZGVmaW5lZCk6IEZpZWxkVmFsdWUgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIl19