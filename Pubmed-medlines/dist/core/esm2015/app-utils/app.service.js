import { Injectable, Inject } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Utils, PatternMatcher } from "@sinequa/core/base";
import { START_CONFIG, MINIMUM_COMPATIBLE_SERVER_API_VERSION } from "@sinequa/core/web-services";
import { ExprParser } from "./query/expr-parser";
import { AppServiceHelpers } from "./app-service-helpers";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/web-services";
import * as i2 from "@sinequa/core/intl";
import * as i3 from "./format.service";
/**
 * A service to manage the Sinequa SBA configuration
 */
export class AppService {
    constructor(startConfig, appWebService, intlService, formatService) {
        this.startConfig = startConfig;
        this.appWebService = appWebService;
        this.intlService = intlService;
        this.formatService = formatService;
        this._events = new Subject();
        if (!this.appName) {
            console.error("Missing app name!");
        }
    }
    static toEngineType(type) {
        if (!type) {
            return 0 /* none */;
        }
        switch (Utils.toLowerCase(type)) {
            case "bool":
            case "boolean": return 1 /* bool */;
            case "date": return 2 /* date */;
            case "datetime": return 3 /* dateTime */;
            case "time": return 4 /* time */;
            case "unsigned": return 5 /* unsigned */;
            case "integer": return 6 /* integer */;
            case "float": return 7 /* float */;
            case "double": return 8 /* double */;
            case "dates": return 9 /* dates */;
            case "datetimes": return 10 /* dateTimes */;
            case "times": return 11 /* times */;
            case "varchar": return 12 /* varchar */;
            case "binary": return 13 /* binary */;
            case "string": return 14 /* string */;
            case "csv": return 15 /* csv */;
            default: return 0 /* none */;
        }
    }
    static toEngineTypeModifierSimple(c) {
        switch (c) {
            case 'a': return 2053 /* a */;
            case 'c': return 4 /* c */;
            case 'd': return 8 /* d */;
            case 'e': return 2068 /* e */;
            case 'i': return 256 /* i */;
            case 'l': return 2052 /* l */;
            case 'n': return 8192 /* n */;
            case 't': return 524292 /* t */;
            case 'x': return 8388608 /* x */;
            case 'z': return 33554432 /* z */;
            default: return 0 /* none */;
        }
    }
    static toEngineTypeModifier(eType, typeModifier) {
        let etm = 0 /* none */;
        if (typeModifier) {
            for (const c of typeModifier) {
                etm |= AppService.toEngineTypeModifierSimple(c);
            }
        }
        return etm;
    }
    static makeColumn(name, type, typeModifier, aliases) {
        const eType = AppService.toEngineType(type);
        const eTypeModifier = AppService.toEngineTypeModifier(eType, typeModifier || "");
        return {
            name,
            type,
            typeModifier,
            eType,
            eTypeModifier,
            aliases
        };
    }
    /**
     * Return `true` if a `column` is a string
     */
    static isString(column) {
        return AppServiceHelpers.isString(column);
    }
    /**
     * Return `true` if a `column` is a csv
     */
    static isCsv(column) {
        return AppServiceHelpers.isCsv(column);
    }
    /**
     * Return `true` if a `column` is a tree
     */
    static isTree(column) {
        return AppServiceHelpers.isTree(column);
    }
    /**
     * Return `true` if a `column` is an entity
     */
    static isEntity(column) {
        return AppServiceHelpers.isEntity(column);
    }
    /**
     * Return `true` if a `column` is a boolean
     */
    static isBoolean(column) {
        return AppServiceHelpers.isBoolean(column);
    }
    /**
     * Return `true` if a `column` is a date
     */
    static isDate(column) {
        return AppServiceHelpers.isDate(column);
    }
    /**
     * Return `true` if a `column` is a double
     */
    static isDouble(column) {
        return AppServiceHelpers.isDouble(column);
    }
    /**
     * Return `true` if a `column` is an integer
     */
    static isInteger(column) {
        return AppServiceHelpers.isInteger(column);
    }
    /**
     * Return `true` if a `column` is a number (integer or double)
     */
    static isNumber(column) {
        return AppServiceHelpers.isNumber(column);
    }
    /**
     * Return `true` if a `column` is a scalar
     */
    static isScalar(column) {
        return AppServiceHelpers.isScalar(column);
    }
    /**
     * Return `true` if a `column` is sortable
     */
    static isSortable(column) {
        return AppServiceHelpers.isSortable(column);
    }
    ngOnDestroy() {
        this._events.complete();
    }
    /**
     * Return an `Observable` stream of the events that the `AppService` can generate
     */
    get events() {
        return this._events;
    }
    /**
     * Return the name of the SBA
     */
    get appName() {
        return this.startConfig.app;
    }
    /**
     * Return the origin of the Sinequa server
     */
    get origin() {
        return this.startConfig.origin;
    }
    initDefaultQuery() {
        if (!this.app) {
            console.warn("No app configured");
            return;
        }
        // If not set explicitly, the default query is the first in the list
        const defaultQueryName = this.app.defaultQueryName || Utils.split(this.app.queryNames, ",")[0];
        this._defaultCCQuery = Utils.getField(this.app.queries, defaultQueryName);
        if (!this._defaultCCQuery) {
            console.warn(`Query not configured for app: ${this.appName}`);
        }
        this.ccquery = this._defaultCCQuery;
    }
    setApp(app) {
        this.app = app;
        this.verifyServerApiVersionCompatibility(app);
        this.cclabels = this.getWebService(this.app.labels);
        this.ccautocomplete = this.getWebService(this.app.autocomplete);
        this.initDefaultQuery();
        this.makeMaps();
        this.suggestQueries = Utils.split(this.ccautocomplete ? this.ccautocomplete.suggestQueries : "", ",");
    }
    verifyServerApiVersionCompatibility(app) {
        if (!app) {
            console.warn('Unexpected empty app configuration.');
            return;
        }
        if (!app.apiVersion) {
            console.error(`The App config '${app.name}' is not of 'Angular Workspace application' type.`);
        }
        else if (app.apiVersion !== MINIMUM_COMPATIBLE_SERVER_API_VERSION) {
            console.warn(`This SBA is not compatible with the REST API of Sinequa Server.\n` +
                `The SBA expects the server API version to be at least '${MINIMUM_COMPATIBLE_SERVER_API_VERSION}',` +
                ` whereas the server API version is '${app.apiVersion}'.`);
        }
    }
    /**
     * Initialize this service by retrieving the current application
     * configuration from the Sinequa server and using it to set up the data structures
     * on which the service relies
     */
    init() {
        return this.appWebService.get().pipe(map(app => {
            this.setApp(app);
            return app;
        }));
    }
    /**
     * Initialize this service from an application configuration object. This is typically
     * used for supporting mutiple concurrent queries within the same application by providing
     * component level instances of this service.
     */
    initFromApp(app) {
        if (app) {
            this.setApp(app);
        }
    }
    /**
     * Refresh the application configuration, reinitializing the service if it has changed
     *
     * @param auditEvents Any associated audit events that should be stored
     */
    refresh(auditEvents) {
        const observable = this.appWebService.refresh(this.app ? this.app.versionId : "", auditEvents);
        observable.subscribe(response => {
            if (!response.upToDate && response.app) {
                this.setApp(response.app);
            }
            return response;
        });
        return observable.pipe(map((value) => {
            return this.app;
        }));
    }
    /**
     * Clear the data associated with the service. Typically used when processing a user logout
     */
    clear() {
        this.app = undefined;
        this.cclabels = undefined;
        this._defaultCCQuery = undefined;
        this.ccquery = undefined;
        this.clearMaps();
    }
    indexIsNormal(ccindex) {
        return !!ccindex && (!ccindex.indexType || Utils.startsWith(ccindex.indexType, "normal"));
    }
    getIndexForQuery(ccquery) {
        if (!ccquery) {
            return undefined;
        }
        const indexes = Utils.split(ccquery.searchIndexes, [","]);
        if (indexes.length === 0) {
            return this.app ? this.app.indexes._ : undefined;
        }
        else {
            const ccindex = this.getIndex(indexes[0]);
            if (ccindex && this.indexIsNormal(ccindex)) {
                return this.app ? this.app.indexes._ : undefined;
            }
            return ccindex;
        }
    }
    _makeColumnMapForIndex(columnMap, ccindex) {
        if (!ccindex || !ccindex.columns) {
            return;
        }
        for (const columnName of Object.keys(ccindex.columns)) {
            const column = ccindex.columns[columnName];
            columnMap[Utils.toLowerCase(column.name)] = column;
            if (column.aliases) {
                for (const alias of column.aliases) {
                    columnMap[Utils.toLowerCase(alias)] = column;
                }
            }
        }
    }
    _makeColumnMapForQuery(columnMap, ccquery) {
        if (!ccquery || !ccquery.columnsInfo || !ccquery.columnsInfo.columns) {
            return;
        }
        const ccindex = this.getIndexForQuery(ccquery);
        if (!ccindex || !ccindex.columns) {
            return;
        }
        for (const columnInfo of ccquery.columnsInfo.columns) {
            if (columnInfo.name) {
                const columnName = Utils.toLowerCase(columnInfo.name);
                let column = ccindex.columns[columnName];
                if (!column) {
                    column = AppService.extraColumns[columnName];
                }
                if (column) {
                    // Copy column so we can add the query specific aliases and labels
                    column = Utils.copy(column);
                    columnMap[columnName] = column;
                    if (columnInfo.aliases) {
                        column.aliases = Utils.split(columnInfo.aliases, [",", ";"]);
                        for (const alias of column.aliases) {
                            columnMap[Utils.toLowerCase(alias)] = column;
                        }
                    }
                    // Overwrite labels if defined on the query
                    if (columnInfo.label) {
                        column.label = columnInfo.label;
                    }
                    if (columnInfo.labelPlural) {
                        column.labelPlural = columnInfo.labelPlural;
                    }
                    if (columnInfo.formatter) {
                        column.formatter = columnInfo.formatter;
                    }
                    if (columnInfo.transforms) {
                        column.transforms = columnInfo.transforms;
                    }
                    if (columnInfo.parser) {
                        column.parser = columnInfo.parser;
                    }
                    if (columnInfo.description) {
                        column.description = columnInfo.description;
                    }
                }
            }
        }
    }
    makeMaps() {
        this.columnsByQuery = {};
        this.columnsByIndex = {};
        this.fieldsByQuery = {};
        if (!this.app) {
            return;
        }
        let columnMap;
        // Queries
        if (this.app.queries) {
            for (const queryName of Object.keys(this.app.queries)) {
                const ccquery = this.app.queries[queryName];
                if (ccquery) {
                    ccquery.$columnFieldsPattern = new PatternMatcher("included column fields", "excluded column fields");
                    ccquery.$columnFieldsPattern.includedPattern.setText(ccquery.columnFieldsIncluded);
                    ccquery.$columnFieldsPattern.excludedPattern.setText(ccquery.columnFieldsExcluded);
                    ccquery.$partnameFieldsPattern = new PatternMatcher("included part name fields", "excluded part name fields");
                    ccquery.$partnameFieldsPattern.includedPattern.setText(ccquery.partnameFieldsIncluded);
                    ccquery.$partnameFieldsPattern.excludedPattern.setText(ccquery.partnameFieldsExcluded);
                    if (ccquery.columnsInfo) {
                        columnMap = {};
                        this.columnsByQuery[Utils.toLowerCase(ccquery.name)] = columnMap;
                        this._makeColumnMapForQuery(columnMap, ccquery);
                    }
                }
            }
        }
        // Indexes
        if (this.app.indexes) {
            // Special normal index
            const ccindex = this.app.indexes._;
            if (ccindex) {
                columnMap = {};
                this.columnsByIndex._ = columnMap;
                this._makeColumnMapForIndex(columnMap, ccindex);
            }
            for (const indexName of Object.keys(this.app.indexes)) {
                const ccindex1 = this.app.indexes[Utils.toLowerCase(indexName)];
                if (ccindex1) {
                    if (this.indexIsNormal(ccindex1)) {
                        if (ccindex1.name !== "_") {
                            this.columnsByIndex[Utils.toLowerCase(ccindex1.name)] = this.columnsByIndex._;
                        }
                    }
                    else {
                        columnMap = {};
                        this.columnsByIndex[Utils.toLowerCase(ccindex1.name)] = columnMap;
                        this._makeColumnMapForIndex(columnMap, ccindex1);
                    }
                }
            }
        }
        // Fields per query (contains aliases for default query and globally defined aliases)
        const globalFields = new Map();
        const columns = this.columnsByIndex._;
        if (columns) {
            for (const key of Object.keys(columns)) {
                const column = columns[key];
                if (column.aliases && column.aliases.length > 0) {
                    const alias = column.aliases[0];
                    if (alias) {
                        globalFields.set(alias, alias);
                    }
                }
            }
        }
        for (const queryName of Object.keys(this.columnsByQuery)) {
            const queryFields = new Map(globalFields);
            const columns1 = this.columnsByQuery[Utils.toLowerCase(this.defaultCCQuery ? this.defaultCCQuery.name : "")];
            if (columns1) {
                for (const key of Object.keys(columns1)) {
                    const column = columns1[key];
                    if (column.aliases && column.aliases.length > 0) {
                        const alias = column.aliases[0];
                        if (alias) {
                            queryFields.set(alias, alias);
                        }
                    }
                }
                this.fieldsByQuery[queryName] = Array.from(queryFields.keys());
            }
        }
    }
    clearMaps() {
        this.columnsByQuery = {};
        this.columnsByIndex = {};
        this.fieldsByQuery = {};
    }
    /**
     * Get the configuration of the web service with the passed name
     */
    getWebService(name) {
        if (!this.app) {
            return undefined;
        }
        return Utils.getField(this.app.webServices, name);
    }
    /**
     * Get the list configuration with the passed name
     */
    getList(name) {
        if (!this.app) {
            return undefined;
        }
        return this.app.lists[name];
    }
    /**
     * Return the default {@link CCQuery}
     */
    get defaultCCQuery() {
        return this._defaultCCQuery;
    }
    /**
     * Return the current {@link CCQuery}
     */
    get ccquery() {
        if (!!this._ccquery) {
            return this._ccquery;
        }
        return this._defaultCCQuery;
    }
    /**
     * Set the current {@link CCQuery}
     */
    set ccquery(value) {
        if (value !== this._ccquery) {
            const previous = this._ccquery;
            this._ccquery = value;
            this._events.next({ type: "query-changed", current: this._ccquery, previous: previous });
        }
    }
    /**
     * Get the {@link CCQuery} with the passed name
     */
    getCCQuery(name) {
        return this.app ? this.app.queries[Utils.toLowerCase(name)] : undefined;
    }
    /**
     * Set the current {@link CCQuery} to that with the passed name
     */
    setCCQuery(name) {
        const ccquery = !name ? this.defaultCCQuery : this.getCCQuery(name);
        if (ccquery) {
            this.ccquery = ccquery;
            return true;
        }
        else {
            console.warn(`AppService.setCCQuery - query '${name}' does not exist`);
            return false;
        }
    }
    /**
     * Return the fields defined on the current {@link CCQuery}
     */
    get fields() {
        if (!this.ccquery) {
            return [];
        }
        return this.fieldsByQuery[Utils.toLowerCase(this.ccquery.name)] || [];
    }
    /**
     * Get the {@link CCAggregation} with the passed name
     */
    getCCAggregation(name) {
        if (!this.ccquery || !this.ccquery.aggregations) {
            return undefined;
        }
        return this.ccquery.aggregations.find((value) => Utils.eqNC(name, value.name));
    }
    /**
     * Get the {@link CCIndex} with the passed name
     */
    getIndex(name) {
        if (!this.app) {
            return undefined;
        }
        return Utils.getField(this.app.indexes, name);
    }
    /**
     * Get the {@link CCColumn} with the passed name. Aliases are resolved
     */
    getColumn(name) {
        if (!name) {
            return undefined;
        }
        if (!this.ccquery) {
            return undefined;
        }
        // First, CCQuery specific aliases
        let column;
        let columnAliases = this.columnsByQuery[Utils.toLowerCase(this.ccquery.name)];
        if (columnAliases) {
            column = columnAliases[Utils.toLowerCase(name)];
            if (column) {
                return column;
            }
        }
        // Second, aliases by index
        const indexes = Utils.split(this.ccquery.searchIndexes, [","]);
        const firstIndex = indexes.length === 0 ? undefined : this.getIndex(indexes[0]);
        if (indexes.length === 0 || (!!firstIndex && this.indexIsNormal(firstIndex))) {
            columnAliases = this.columnsByIndex._;
            if (columnAliases) {
                column = columnAliases[Utils.toLowerCase(name)];
                if (column) {
                    return column;
                }
            }
        }
        else {
            for (const index of indexes) {
                columnAliases = this.columnsByIndex[Utils.toLowerCase(index)];
                if (columnAliases) {
                    column = columnAliases[Utils.toLowerCase(name)];
                    if (column) {
                        return column;
                    }
                }
            }
        }
        // Third, extra columns
        column = AppService.extraColumns[Utils.toLowerCase(name)];
        if (column) {
            return column;
        }
        return undefined;
    }
    /**
     * Get the default alias a column
     *
     * @param column The column
     * @return The default alias or `null` if no alias is defined
     */
    getColumnDefaultAlias(column) {
        if (column) {
            if (column.aliases && column.aliases.length > 0) {
                return column.aliases[0];
            }
        }
        return "";
    }
    /**
     * Get the name of a column
     *
     * @param column The column
     * @param _default A default name to return if `column` is empty
     */
    getColumnName(column, _default = "") {
        if (column) {
            return column.name;
        }
        return _default;
    }
    /**
     * Get the default alias for a column
     *
     * @param column The column
     * @param _default A default alias name to return if the `column` is empty or no alias is defined
     */
    getColumnAlias(column, _default = "") {
        if (column) {
            const alias = this.getColumnDefaultAlias(column);
            if (alias) {
                return alias;
            }
        }
        return _default;
    }
    /**
     * Return a column name from a name which can be an alias
     */
    resolveColumnName(name) {
        const column = this.getColumn(name);
        return this.getColumnName(column, name || "");
    }
    /**
     * Return a column alias from a name which can be an alias
     */
    resolveColumnAlias(name) {
        const column = this.getColumn(name);
        return this.getColumnAlias(column, name || "");
    }
    /**
     * Parse a fielded search expression
     *
     * @param text The expression
     * @param options Options for the parsing
     * @return The parsed {@link Expr} or an error message
     */
    parseExpr(text, options) {
        return ExprParser.parse(text, { appService: this, formatService: this.formatService, intlService: this.intlService }, options);
    }
    /**
     * Escape a value for fielded search if necessary. `Date` objects are converted to
     * Sinequa system date strings and non-scalars fields are escaped
     * @param field The value's field
     * @param value The value
     */
    escapeFieldValue(field, value) {
        if (Utils.isDate(value)) {
            return Utils.toSysDateStr(value);
        }
        value = value + "";
        const column = this.getColumn(field);
        if (column && !AppService.isScalar(column)) {
            // escaoe columns that might contain search operators in them (treating negative numbers as an ignorable edge case)
            return ExprParser.escape(value);
        }
        return value;
    }
    /**
     * Get the label of a column. The plural label is returned for csv-type columns.
     *
     * @param name The name of the column which can be an alias
     * @param _default The default label to return if no label is defined
     */
    getLabel(name, _default) {
        const column = this.getColumn(name);
        if (column) {
            const label = AppService.isCsv(column) ? column.labelPlural : column.label;
            if (label) {
                return label;
            }
        }
        if (!Utils.isUndefined(_default)) {
            return _default;
        }
        return name;
    }
    /**
     * Get the singular label of a column
     *
     * @param name The name of the column which can be an alias
     * @param _default The default label to return if no label is defined
     */
    getSingularLabel(name, _default) {
        const column = this.getColumn(name);
        if (column && column.label) {
            return column.label;
        }
        if (!Utils.isUndefined(_default)) {
            return _default;
        }
        return name;
    }
    /**
     * Get the plural label of a column
     *
     * @param name The name of the column which can be an alias
     * @param _default The default label to return if no label is defined
     */
    getPluralLabel(name, _default) {
        const column = this.getColumn(name);
        if (column && column.labelPlural) {
            return column.labelPlural;
        }
        if (!Utils.isUndefined(_default)) {
            return _default;
        }
        return name;
    }
    /**
     * Return `true` if a column with the passed name or alias is a string
     */
    isString(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isString(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is a csv
     */
    isCsv(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isCsv(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is a tree
     */
    isTree(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isTree(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is an entity
     */
    isEntity(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isEntity(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is a boolean
     */
    isBoolean(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isBoolean(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is a date
     */
    isDate(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isDate(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is a double
     */
    isDouble(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isDouble(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is an integer
     */
    isInteger(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isInteger(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is a number (integer or double)
     */
    isNumber(name) {
        return this.isInteger(name) || this.isDouble(name);
    }
    /**
     * Return `true` if a column with the passed name or alias is a scalar
     */
    isScalar(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isScalar(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is sortable
     */
    isSortable(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isSortable(column);
    }
    /**
     * If the passed url is relative and CORS is active then
     * prepend it with the Sinequa server origin
     */
    updateUrlForCors(url) {
        if (this.startConfig.corsActive && !!url && !Utils.isUrlAbsolute(url)) {
            url = Utils.addUrl(this.origin, url);
        }
        return url;
    }
    /**
     * Return the url to the Sinequa administration console
     */
    get adminUrl() {
        return this.updateUrlForCors(Utils.addUrl(this.startConfig.applicationPath, "admin"));
    }
}
// Should match AdditionalQueryableColumns in Engine.cs
AppService.extraColumns = {
    id: AppService.makeColumn("id", "string"),
    text: AppService.makeColumn("text", "varchar"),
    documentlanguages: AppService.makeColumn("documentlanguages", "csv", "ci"),
    databasealias: AppService.makeColumn("databasealias", "varchar"),
    globalrelevance: AppService.makeColumn("globalrelevance", "double"),
    matchingpartnames: AppService.makeColumn("matchingpartnames", "csv"),
    matchlocations: AppService.makeColumn("matchlocations", "csv"),
    matchlocationsperpartname: AppService.makeColumn("matchlocationsperpartname", "varchar"),
    extracts: AppService.makeColumn("extracts", "csv"),
    extractsperpartname: AppService.makeColumn("extractsperpartname", "varchar"),
    extractslocations: AppService.makeColumn("extractslocations", "csv"),
    documentweight: AppService.makeColumn("documentweight", "varchar"),
    groupcount: AppService.makeColumn("groupcount", "integer"),
    accesslists: AppService.makeColumn("accesslists", "varchar", undefined, ["accessLists"]) // json
};
AppService.ɵfac = function AppService_Factory(t) { return new (t || AppService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.AppWebService), i0.ɵɵinject(i2.IntlService), i0.ɵɵinject(i3.FormatService)); };
AppService.ɵprov = i0.ɵɵdefineInjectable({ token: AppService, factory: AppService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AppService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.AppWebService }, { type: i2.IntlService }, { type: i3.FormatService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9hcHAtdXRpbHMvIiwic291cmNlcyI6WyJhcHAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQWEsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuQyxPQUFPLEVBQUMsS0FBSyxFQUFTLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBR2hFLE9BQU8sRUFBNkIsWUFBWSxFQUVaLHFDQUFxQyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDN0csT0FBTyxFQUFDLFVBQVUsRUFBMEIsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7QUF1QnhEOztHQUVHO0FBSUgsTUFBTSxPQUFPLFVBQVU7SUF3TG5CLFlBQ2lDLFdBQXdCLEVBQzlDLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ3hCLGFBQTRCO1FBSE4sZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDOUMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFuSjdCLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBYSxDQUFDO1FBcUp6QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUN0QztJQUNMLENBQUM7SUF0Sk8sTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFZO1FBQ3BDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxvQkFBdUI7U0FDMUI7UUFDRCxRQUFRLEtBQUssQ0FBQyxX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VSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDO0lBQ2xELG1CQUFtQixFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMscUJBQXFCLEVBQUUsU0FBUyxDQUFDO0lBQzVFLGlCQUFpQixFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDO0lBQ3BFLGNBQWMsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLFNBQVMsQ0FBQztJQUNsRSxVQUFVLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDO0lBQzFELFdBQVcsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxPQUFPO0NBQ25HLENBQUM7b0VBakJPLFVBQVUsY0F5TFAsWUFBWTtrREF6TGYsVUFBVSxXQUFWLFVBQVUsbUJBRlAsTUFBTTtrREFFVCxVQUFVO2NBSHRCLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7c0JBMExRLE1BQU07dUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0LCBPbkRlc3Ryb3l9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge21hcH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQge1V0aWxzLCBNYXBPZiwgUGF0dGVybk1hdGNoZXJ9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7SW50bFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL2ludGxcIjtcbmltcG9ydCB7Rm9ybWF0U2VydmljZX0gZnJvbSBcIi4vZm9ybWF0LnNlcnZpY2VcIjtcbmltcG9ydCB7QXBwV2ViU2VydmljZSwgQXVkaXRFdmVudHMsIFNUQVJUX0NPTkZJRywgU3RhcnRDb25maWcsXG4gICAgQ0NBcHAsIENDUXVlcnksIENDTGFiZWxzLCBDQ0F1dG9jb21wbGV0ZSwgQ0NDb2x1bW4sIENDSW5kZXgsIENDV2ViU2VydmljZSwgQ0NDb25maWcsIENDTGlzdCwgQ0NBZ2dyZWdhdGlvbixcbiAgICBFbmdpbmVUeXBlLCBFbmdpbmVUeXBlTW9kaWZpZXIsIE1JTklNVU1fQ09NUEFUSUJMRV9TRVJWRVJfQVBJX1ZFUlNJT059IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtFeHByUGFyc2VyLCBFeHByUGFyc2VyT3B0aW9ucywgRXhwcn0gZnJvbSBcIi4vcXVlcnkvZXhwci1wYXJzZXJcIjtcbmltcG9ydCB7QXBwU2VydmljZUhlbHBlcnN9IGZyb20gXCIuL2FwcC1zZXJ2aWNlLWhlbHBlcnNcIjtcblxuLyoqXG4gKiBBIGJhc2UgZXZlbnQgZnJvbSB3aGljaCBhbGwgZXZlbnRzIHRoYXQgY2FuIGJlIGlzc3VlZCBieSB0aGUge0BsaW5rIEFwcFNlcnZpY2V9IGFyZSBkZXJpdmVkXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXBwRXZlbnQge1xuICAgIHR5cGU6IFwicXVlcnktY2hhbmdlZFwiO1xufVxuXG4vKipcbiAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgZWFjaCB0aW1lIHRoZSBbY2NxdWVyeV17QGxpbmsgQXBwU2VydmljZSNjY3F1ZXJ5fSBtZW1iZXIgaXMgbW9kaWZpZWQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUXVlcnlDaGFuZ2VkRXZlbnQgZXh0ZW5kcyBBcHBFdmVudCB7XG4gICAgdHlwZTogXCJxdWVyeS1jaGFuZ2VkXCI7XG4gICAgY3VycmVudD86IENDUXVlcnk7XG4gICAgcHJldmlvdXM/OiBDQ1F1ZXJ5O1xufVxuXG4vKipcbiAqIEEgdW5pb24gb2YgdGhlIGRpZmZlcmVudCBldmVudHMgdGhhdCB0aGUge0BsaW5rIEFwcFNlcnZpY2V9IGNhbiBnZW5lcmF0ZVxuICovXG5leHBvcnQgdHlwZSBBcHBFdmVudHMgPSBRdWVyeUNoYW5nZWRFdmVudDtcblxuLyoqXG4gKiBBIHNlcnZpY2UgdG8gbWFuYWdlIHRoZSBTaW5lcXVhIFNCQSBjb25maWd1cmF0aW9uXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBBcHBTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICAvLyBTaG91bGQgbWF0Y2ggQWRkaXRpb25hbFF1ZXJ5YWJsZUNvbHVtbnMgaW4gRW5naW5lLmNzXG4gICAgcHJpdmF0ZSBzdGF0aWMgZXh0cmFDb2x1bW5zOiBNYXBPZjxDQ0NvbHVtbj4gPSB7XG4gICAgICAgIGlkOiBBcHBTZXJ2aWNlLm1ha2VDb2x1bW4oXCJpZFwiLCBcInN0cmluZ1wiKSxcbiAgICAgICAgdGV4dDogQXBwU2VydmljZS5tYWtlQ29sdW1uKFwidGV4dFwiLCBcInZhcmNoYXJcIiksXG4gICAgICAgIGRvY3VtZW50bGFuZ3VhZ2VzOiBBcHBTZXJ2aWNlLm1ha2VDb2x1bW4oXCJkb2N1bWVudGxhbmd1YWdlc1wiLCBcImNzdlwiLCBcImNpXCIpLFxuICAgICAgICBkYXRhYmFzZWFsaWFzOiBBcHBTZXJ2aWNlLm1ha2VDb2x1bW4oXCJkYXRhYmFzZWFsaWFzXCIsIFwidmFyY2hhclwiKSxcbiAgICAgICAgZ2xvYmFscmVsZXZhbmNlOiBBcHBTZXJ2aWNlLm1ha2VDb2x1bW4oXCJnbG9iYWxyZWxldmFuY2VcIiwgXCJkb3VibGVcIiksXG4gICAgICAgIG1hdGNoaW5ncGFydG5hbWVzOiBBcHBTZXJ2aWNlLm1ha2VDb2x1bW4oXCJtYXRjaGluZ3BhcnRuYW1lc1wiLCBcImNzdlwiKSxcbiAgICAgICAgbWF0Y2hsb2NhdGlvbnM6IEFwcFNlcnZpY2UubWFrZUNvbHVtbihcIm1hdGNobG9jYXRpb25zXCIsIFwiY3N2XCIpLFxuICAgICAgICBtYXRjaGxvY2F0aW9uc3BlcnBhcnRuYW1lOiBBcHBTZXJ2aWNlLm1ha2VDb2x1bW4oXCJtYXRjaGxvY2F0aW9uc3BlcnBhcnRuYW1lXCIsIFwidmFyY2hhclwiKSwgLy8ganNvblxuICAgICAgICBleHRyYWN0czogQXBwU2VydmljZS5tYWtlQ29sdW1uKFwiZXh0cmFjdHNcIiwgXCJjc3ZcIiksXG4gICAgICAgIGV4dHJhY3RzcGVycGFydG5hbWU6IEFwcFNlcnZpY2UubWFrZUNvbHVtbihcImV4dHJhY3RzcGVycGFydG5hbWVcIiwgXCJ2YXJjaGFyXCIpLCAvLyBqc29uXG4gICAgICAgIGV4dHJhY3RzbG9jYXRpb25zOiBBcHBTZXJ2aWNlLm1ha2VDb2x1bW4oXCJleHRyYWN0c2xvY2F0aW9uc1wiLCBcImNzdlwiKSxcbiAgICAgICAgZG9jdW1lbnR3ZWlnaHQ6IEFwcFNlcnZpY2UubWFrZUNvbHVtbihcImRvY3VtZW50d2VpZ2h0XCIsIFwidmFyY2hhclwiKSxcbiAgICAgICAgZ3JvdXBjb3VudDogQXBwU2VydmljZS5tYWtlQ29sdW1uKFwiZ3JvdXBjb3VudFwiLCBcImludGVnZXJcIiksXG4gICAgICAgIGFjY2Vzc2xpc3RzOiBBcHBTZXJ2aWNlLm1ha2VDb2x1bW4oXCJhY2Nlc3NsaXN0c1wiLCBcInZhcmNoYXJcIiwgdW5kZWZpbmVkLCBbXCJhY2Nlc3NMaXN0c1wiXSkgLy8ganNvblxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYXBwIGNvbmZpZ3VyYXRpb25cbiAgICAgKi9cbiAgICBhcHA/OiBDQ0FwcDtcbiAgICAvKipcbiAgICAgKiBUaGUgbGFiZWxzIGNvbmZpZ3VyYXRpb25cbiAgICAgKi9cbiAgICBjY2xhYmVscz86IENDTGFiZWxzO1xuICAgIC8qKlxuICAgICAqIFRoZSBhdXRvY29tcGxldGUgY29uZmlndXJhdGlvblxuICAgICAqL1xuICAgIGNjYXV0b2NvbXBsZXRlPzogQ0NBdXRvY29tcGxldGU7XG4gICAgLyoqXG4gICAgICogVGhlIHN1Z2dlc3QgcXVlcmllcyBjb25maWd1cmVkIG9uIHRoZSBhcHBsaWNhdGlvblxuICAgICAqL1xuICAgIHN1Z2dlc3RRdWVyaWVzOiBzdHJpbmdbXTtcbiAgICBwcml2YXRlIGNvbHVtbnNCeVF1ZXJ5OiBNYXBPZjxNYXBPZjxDQ0NvbHVtbj4+O1xuICAgIHByaXZhdGUgY29sdW1uc0J5SW5kZXg6IE1hcE9mPE1hcE9mPENDQ29sdW1uPj47XG4gICAgcHJpdmF0ZSBmaWVsZHNCeVF1ZXJ5OiBNYXBPZjxzdHJpbmdbXT47XG4gICAgcHJpdmF0ZSBfZGVmYXVsdENDUXVlcnk/OiBDQ1F1ZXJ5O1xuICAgIHByaXZhdGUgX2NjcXVlcnk/OiBDQ1F1ZXJ5O1xuXG4gICAgcHJvdGVjdGVkIF9ldmVudHMgPSBuZXcgU3ViamVjdDxBcHBFdmVudHM+KCk7XG5cbiAgICBwcml2YXRlIHN0YXRpYyB0b0VuZ2luZVR5cGUodHlwZTogc3RyaW5nKTogRW5naW5lVHlwZSB7XG4gICAgICAgIGlmICghdHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIEVuZ2luZVR5cGUubm9uZTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKFV0aWxzLnRvTG93ZXJDYXNlKHR5cGUpKSB7XG4gICAgICAgICAgICBjYXNlIFwiYm9vbFwiICAgICA6XG4gICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiICA6IHJldHVybiBFbmdpbmVUeXBlLmJvb2w7XG4gICAgICAgICAgICBjYXNlIFwiZGF0ZVwiICAgICA6IHJldHVybiBFbmdpbmVUeXBlLmRhdGU7XG4gICAgICAgICAgICBjYXNlIFwiZGF0ZXRpbWVcIiA6IHJldHVybiBFbmdpbmVUeXBlLmRhdGVUaW1lO1xuICAgICAgICAgICAgY2FzZSBcInRpbWVcIiAgICAgOiByZXR1cm4gRW5naW5lVHlwZS50aW1lO1xuICAgICAgICAgICAgY2FzZSBcInVuc2lnbmVkXCIgOiByZXR1cm4gRW5naW5lVHlwZS51bnNpZ25lZDtcbiAgICAgICAgICAgIGNhc2UgXCJpbnRlZ2VyXCIgIDogcmV0dXJuIEVuZ2luZVR5cGUuaW50ZWdlcjtcbiAgICAgICAgICAgIGNhc2UgXCJmbG9hdFwiICAgIDogcmV0dXJuIEVuZ2luZVR5cGUuZmxvYXQ7XG4gICAgICAgICAgICBjYXNlIFwiZG91YmxlXCIgICA6IHJldHVybiBFbmdpbmVUeXBlLmRvdWJsZTtcbiAgICAgICAgICAgIGNhc2UgXCJkYXRlc1wiICAgIDogcmV0dXJuIEVuZ2luZVR5cGUuZGF0ZXM7XG4gICAgICAgICAgICBjYXNlIFwiZGF0ZXRpbWVzXCI6IHJldHVybiBFbmdpbmVUeXBlLmRhdGVUaW1lcztcbiAgICAgICAgICAgIGNhc2UgXCJ0aW1lc1wiICAgIDogcmV0dXJuIEVuZ2luZVR5cGUudGltZXM7XG4gICAgICAgICAgICBjYXNlIFwidmFyY2hhclwiICA6IHJldHVybiBFbmdpbmVUeXBlLnZhcmNoYXI7XG4gICAgICAgICAgICBjYXNlIFwiYmluYXJ5XCIgICA6IHJldHVybiBFbmdpbmVUeXBlLmJpbmFyeTtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIiAgIDogcmV0dXJuIEVuZ2luZVR5cGUuc3RyaW5nO1xuICAgICAgICAgICAgY2FzZSBcImNzdlwiICAgICAgOiByZXR1cm4gRW5naW5lVHlwZS5jc3Y7XG4gICAgICAgICAgICBkZWZhdWx0ICAgICAgICAgOiByZXR1cm4gRW5naW5lVHlwZS5ub25lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgdG9FbmdpbmVUeXBlTW9kaWZpZXJTaW1wbGUoYzogc3RyaW5nKTogRW5naW5lVHlwZU1vZGlmaWVyIHtcbiAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgICBjYXNlICdhJzogcmV0dXJuIEVuZ2luZVR5cGVNb2RpZmllci5hO1xuICAgICAgICAgICAgY2FzZSAnYyc6IHJldHVybiBFbmdpbmVUeXBlTW9kaWZpZXIuYztcbiAgICAgICAgICAgIGNhc2UgJ2QnOiByZXR1cm4gRW5naW5lVHlwZU1vZGlmaWVyLmQ7XG4gICAgICAgICAgICBjYXNlICdlJzogcmV0dXJuIEVuZ2luZVR5cGVNb2RpZmllci5lO1xuICAgICAgICAgICAgY2FzZSAnaSc6IHJldHVybiBFbmdpbmVUeXBlTW9kaWZpZXIuaTtcbiAgICAgICAgICAgIGNhc2UgJ2wnOiByZXR1cm4gRW5naW5lVHlwZU1vZGlmaWVyLmw7XG4gICAgICAgICAgICBjYXNlICduJzogcmV0dXJuIEVuZ2luZVR5cGVNb2RpZmllci5uO1xuICAgICAgICAgICAgY2FzZSAndCc6IHJldHVybiBFbmdpbmVUeXBlTW9kaWZpZXIudDtcbiAgICAgICAgICAgIGNhc2UgJ3gnOiByZXR1cm4gRW5naW5lVHlwZU1vZGlmaWVyLng7XG4gICAgICAgICAgICBjYXNlICd6JzogcmV0dXJuIEVuZ2luZVR5cGVNb2RpZmllci56O1xuICAgICAgICAgICAgZGVmYXVsdCA6IHJldHVybiBFbmdpbmVUeXBlTW9kaWZpZXIubm9uZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHRvRW5naW5lVHlwZU1vZGlmaWVyKGVUeXBlOiBFbmdpbmVUeXBlLCB0eXBlTW9kaWZpZXI6IHN0cmluZyk6IEVuZ2luZVR5cGVNb2RpZmllciB7XG4gICAgICAgIGxldCBldG0gPSBFbmdpbmVUeXBlTW9kaWZpZXIubm9uZTtcbiAgICAgICAgaWYgKHR5cGVNb2RpZmllcikge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjIG9mIHR5cGVNb2RpZmllcikge1xuICAgICAgICAgICAgICAgIGV0bSB8PSBBcHBTZXJ2aWNlLnRvRW5naW5lVHlwZU1vZGlmaWVyU2ltcGxlKGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBldG07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgbWFrZUNvbHVtbihuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgdHlwZU1vZGlmaWVyPzogc3RyaW5nLCBhbGlhc2VzPzogc3RyaW5nW10pIHtcbiAgICAgICAgY29uc3QgZVR5cGUgPSBBcHBTZXJ2aWNlLnRvRW5naW5lVHlwZSh0eXBlKTtcbiAgICAgICAgY29uc3QgZVR5cGVNb2RpZmllciA9IEFwcFNlcnZpY2UudG9FbmdpbmVUeXBlTW9kaWZpZXIoZVR5cGUsIHR5cGVNb2RpZmllciB8fCBcIlwiKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgdHlwZU1vZGlmaWVyLFxuICAgICAgICAgICAgZVR5cGUsXG4gICAgICAgICAgICBlVHlwZU1vZGlmaWVyLFxuICAgICAgICAgICAgYWxpYXNlc1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgYSBgY29sdW1uYCBpcyBhIHN0cmluZ1xuICAgICAqL1xuICAgIHN0YXRpYyBpc1N0cmluZyhjb2x1bW46IENDQ29sdW1uIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBBcHBTZXJ2aWNlSGVscGVycy5pc1N0cmluZyhjb2x1bW4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgYSBgY29sdW1uYCBpcyBhIGNzdlxuICAgICAqL1xuICAgIHN0YXRpYyBpc0Nzdihjb2x1bW46IENDQ29sdW1uIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBBcHBTZXJ2aWNlSGVscGVycy5pc0Nzdihjb2x1bW4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgYSBgY29sdW1uYCBpcyBhIHRyZWVcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNUcmVlKGNvbHVtbjogQ0NDb2x1bW4gfCB1bmRlZmluZWQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIEFwcFNlcnZpY2VIZWxwZXJzLmlzVHJlZShjb2x1bW4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgYSBgY29sdW1uYCBpcyBhbiBlbnRpdHlcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNFbnRpdHkoY29sdW1uOiBDQ0NvbHVtbiB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gQXBwU2VydmljZUhlbHBlcnMuaXNFbnRpdHkoY29sdW1uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIGEgYGNvbHVtbmAgaXMgYSBib29sZWFuXG4gICAgICovXG4gICAgc3RhdGljIGlzQm9vbGVhbihjb2x1bW46IENDQ29sdW1uIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBBcHBTZXJ2aWNlSGVscGVycy5pc0Jvb2xlYW4oY29sdW1uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIGEgYGNvbHVtbmAgaXMgYSBkYXRlXG4gICAgICovXG4gICAgc3RhdGljIGlzRGF0ZShjb2x1bW46IENDQ29sdW1uIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBBcHBTZXJ2aWNlSGVscGVycy5pc0RhdGUoY29sdW1uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIGEgYGNvbHVtbmAgaXMgYSBkb3VibGVcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNEb3VibGUoY29sdW1uOiBDQ0NvbHVtbiB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gQXBwU2VydmljZUhlbHBlcnMuaXNEb3VibGUoY29sdW1uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIGEgYGNvbHVtbmAgaXMgYW4gaW50ZWdlclxuICAgICAqL1xuICAgIHN0YXRpYyBpc0ludGVnZXIoY29sdW1uOiBDQ0NvbHVtbiB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gQXBwU2VydmljZUhlbHBlcnMuaXNJbnRlZ2VyKGNvbHVtbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGB0cnVlYCBpZiBhIGBjb2x1bW5gIGlzIGEgbnVtYmVyIChpbnRlZ2VyIG9yIGRvdWJsZSlcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNOdW1iZXIoY29sdW1uOiBDQ0NvbHVtbiB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gQXBwU2VydmljZUhlbHBlcnMuaXNOdW1iZXIoY29sdW1uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIGEgYGNvbHVtbmAgaXMgYSBzY2FsYXJcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNTY2FsYXIoY29sdW1uOiBDQ0NvbHVtbiB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gQXBwU2VydmljZUhlbHBlcnMuaXNTY2FsYXIoY29sdW1uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIGEgYGNvbHVtbmAgaXMgc29ydGFibGVcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNTb3J0YWJsZShjb2x1bW46IENDQ29sdW1uIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBBcHBTZXJ2aWNlSGVscGVycy5pc1NvcnRhYmxlKGNvbHVtbik7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoU1RBUlRfQ09ORklHKSBwdWJsaWMgc3RhcnRDb25maWc6IFN0YXJ0Q29uZmlnLFxuICAgICAgICBwdWJsaWMgYXBwV2ViU2VydmljZTogQXBwV2ViU2VydmljZSxcbiAgICAgICAgcHVibGljIGludGxTZXJ2aWNlOiBJbnRsU2VydmljZSxcbiAgICAgICAgcHVibGljIGZvcm1hdFNlcnZpY2U6IEZvcm1hdFNlcnZpY2UpIHtcblxuICAgICAgICBpZiAoIXRoaXMuYXBwTmFtZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1pc3NpbmcgYXBwIG5hbWUhXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbiBgT2JzZXJ2YWJsZWAgc3RyZWFtIG9mIHRoZSBldmVudHMgdGhhdCB0aGUgYEFwcFNlcnZpY2VgIGNhbiBnZW5lcmF0ZVxuICAgICAqL1xuICAgIGdldCBldmVudHMoKTogT2JzZXJ2YWJsZTxBcHBFdmVudHM+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIG5hbWUgb2YgdGhlIFNCQVxuICAgICAqL1xuICAgIGdldCBhcHBOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0Q29uZmlnLmFwcCE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBvcmlnaW4gb2YgdGhlIFNpbmVxdWEgc2VydmVyXG4gICAgICovXG4gICAgZ2V0IG9yaWdpbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFydENvbmZpZy5vcmlnaW4hO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdERlZmF1bHRRdWVyeSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFwcCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiTm8gYXBwIGNvbmZpZ3VyZWRcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgbm90IHNldCBleHBsaWNpdGx5LCB0aGUgZGVmYXVsdCBxdWVyeSBpcyB0aGUgZmlyc3QgaW4gdGhlIGxpc3RcbiAgICAgICAgY29uc3QgZGVmYXVsdFF1ZXJ5TmFtZSA9IHRoaXMuYXBwLmRlZmF1bHRRdWVyeU5hbWUgfHwgVXRpbHMuc3BsaXQodGhpcy5hcHAucXVlcnlOYW1lcywgXCIsXCIpWzBdO1xuICAgICAgICB0aGlzLl9kZWZhdWx0Q0NRdWVyeSA9IFV0aWxzLmdldEZpZWxkPENDUXVlcnk+KHRoaXMuYXBwLnF1ZXJpZXMsIGRlZmF1bHRRdWVyeU5hbWUpO1xuICAgICAgICBpZiAoIXRoaXMuX2RlZmF1bHRDQ1F1ZXJ5KSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYFF1ZXJ5IG5vdCBjb25maWd1cmVkIGZvciBhcHA6ICR7dGhpcy5hcHBOYW1lfWApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2NxdWVyeSA9IHRoaXMuX2RlZmF1bHRDQ1F1ZXJ5O1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0QXBwKGFwcDogQ0NBcHApIHtcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgICAgIHRoaXMudmVyaWZ5U2VydmVyQXBpVmVyc2lvbkNvbXBhdGliaWxpdHkoYXBwKTtcbiAgICAgICAgdGhpcy5jY2xhYmVscyA9IHRoaXMuZ2V0V2ViU2VydmljZTxDQ0xhYmVscz4odGhpcy5hcHAubGFiZWxzKTtcbiAgICAgICAgdGhpcy5jY2F1dG9jb21wbGV0ZSA9IHRoaXMuZ2V0V2ViU2VydmljZTxDQ0F1dG9jb21wbGV0ZT4odGhpcy5hcHAuYXV0b2NvbXBsZXRlKTtcbiAgICAgICAgdGhpcy5pbml0RGVmYXVsdFF1ZXJ5KCk7XG4gICAgICAgIHRoaXMubWFrZU1hcHMoKTtcbiAgICAgICAgdGhpcy5zdWdnZXN0UXVlcmllcyA9IFV0aWxzLnNwbGl0KHRoaXMuY2NhdXRvY29tcGxldGUgPyB0aGlzLmNjYXV0b2NvbXBsZXRlLnN1Z2dlc3RRdWVyaWVzIDogXCJcIiwgXCIsXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdmVyaWZ5U2VydmVyQXBpVmVyc2lvbkNvbXBhdGliaWxpdHkoYXBwOiBDQ0FwcCk6IHZvaWQge1xuICAgICAgICBpZiAoIWFwcCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVbmV4cGVjdGVkIGVtcHR5IGFwcCBjb25maWd1cmF0aW9uLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYXBwLmFwaVZlcnNpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFRoZSBBcHAgY29uZmlnICcke2FwcC5uYW1lfScgaXMgbm90IG9mICdBbmd1bGFyIFdvcmtzcGFjZSBhcHBsaWNhdGlvbicgdHlwZS5gKTtcbiAgICAgICAgfSBlbHNlIGlmIChhcHAuYXBpVmVyc2lvbiAhPT0gTUlOSU1VTV9DT01QQVRJQkxFX1NFUlZFUl9BUElfVkVSU0lPTikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBUaGlzIFNCQSBpcyBub3QgY29tcGF0aWJsZSB3aXRoIHRoZSBSRVNUIEFQSSBvZiBTaW5lcXVhIFNlcnZlci5cXG5gICtcbiAgICAgICAgICAgICAgICBgVGhlIFNCQSBleHBlY3RzIHRoZSBzZXJ2ZXIgQVBJIHZlcnNpb24gdG8gYmUgYXQgbGVhc3QgJyR7TUlOSU1VTV9DT01QQVRJQkxFX1NFUlZFUl9BUElfVkVSU0lPTn0nLGAgK1xuICAgICAgICAgICAgICAgIGAgd2hlcmVhcyB0aGUgc2VydmVyIEFQSSB2ZXJzaW9uIGlzICcke2FwcC5hcGlWZXJzaW9ufScuYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoaXMgc2VydmljZSBieSByZXRyaWV2aW5nIHRoZSBjdXJyZW50IGFwcGxpY2F0aW9uXG4gICAgICogY29uZmlndXJhdGlvbiBmcm9tIHRoZSBTaW5lcXVhIHNlcnZlciBhbmQgdXNpbmcgaXQgdG8gc2V0IHVwIHRoZSBkYXRhIHN0cnVjdHVyZXNcbiAgICAgKiBvbiB3aGljaCB0aGUgc2VydmljZSByZWxpZXNcbiAgICAgKi9cbiAgICBpbml0KCk6IE9ic2VydmFibGU8Q0NBcHA+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwV2ViU2VydmljZS5nZXQoKS5waXBlKFxuICAgICAgICAgICAgbWFwKGFwcCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBcHAoYXBwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXBwO1xuICAgICAgICAgICAgfVxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoaXMgc2VydmljZSBmcm9tIGFuIGFwcGxpY2F0aW9uIGNvbmZpZ3VyYXRpb24gb2JqZWN0LiBUaGlzIGlzIHR5cGljYWxseVxuICAgICAqIHVzZWQgZm9yIHN1cHBvcnRpbmcgbXV0aXBsZSBjb25jdXJyZW50IHF1ZXJpZXMgd2l0aGluIHRoZSBzYW1lIGFwcGxpY2F0aW9uIGJ5IHByb3ZpZGluZ1xuICAgICAqIGNvbXBvbmVudCBsZXZlbCBpbnN0YW5jZXMgb2YgdGhpcyBzZXJ2aWNlLlxuICAgICAqL1xuICAgIGluaXRGcm9tQXBwKGFwcDogQ0NBcHApIHtcbiAgICAgICAgaWYgKGFwcCkge1xuICAgICAgICAgICAgdGhpcy5zZXRBcHAoYXBwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZnJlc2ggdGhlIGFwcGxpY2F0aW9uIGNvbmZpZ3VyYXRpb24sIHJlaW5pdGlhbGl6aW5nIHRoZSBzZXJ2aWNlIGlmIGl0IGhhcyBjaGFuZ2VkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYXVkaXRFdmVudHMgQW55IGFzc29jaWF0ZWQgYXVkaXQgZXZlbnRzIHRoYXQgc2hvdWxkIGJlIHN0b3JlZFxuICAgICAqL1xuICAgIHJlZnJlc2goYXVkaXRFdmVudHM/OiBBdWRpdEV2ZW50cyk6IE9ic2VydmFibGU8Q0NBcHAgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IHRoaXMuYXBwV2ViU2VydmljZS5yZWZyZXNoKHRoaXMuYXBwID8gdGhpcy5hcHAudmVyc2lvbklkIDogXCJcIiwgYXVkaXRFdmVudHMpO1xuICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZShcbiAgICAgICAgICAgIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLnVwVG9EYXRlICYmIHJlc3BvbnNlLmFwcCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFwcChyZXNwb25zZS5hcHApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUobWFwKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwO1xuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXIgdGhlIGRhdGEgYXNzb2NpYXRlZCB3aXRoIHRoZSBzZXJ2aWNlLiBUeXBpY2FsbHkgdXNlZCB3aGVuIHByb2Nlc3NpbmcgYSB1c2VyIGxvZ291dFxuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmFwcCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jY2xhYmVscyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fZGVmYXVsdENDUXVlcnkgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY2NxdWVyeSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jbGVhck1hcHMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluZGV4SXNOb3JtYWwoY2NpbmRleDogQ0NJbmRleCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISFjY2luZGV4ICYmICghY2NpbmRleC5pbmRleFR5cGUgfHwgVXRpbHMuc3RhcnRzV2l0aChjY2luZGV4LmluZGV4VHlwZSwgXCJub3JtYWxcIikpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SW5kZXhGb3JRdWVyeShjY3F1ZXJ5OiBDQ1F1ZXJ5KTogQ0NJbmRleCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICghY2NxdWVyeSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbmRleGVzID0gVXRpbHMuc3BsaXQoY2NxdWVyeS5zZWFyY2hJbmRleGVzLCBbXCIsXCJdKTtcbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcHAgPyB0aGlzLmFwcC5pbmRleGVzLl8gOiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBjY2luZGV4ID0gdGhpcy5nZXRJbmRleChpbmRleGVzWzBdKTtcbiAgICAgICAgICAgIGlmIChjY2luZGV4ICYmIHRoaXMuaW5kZXhJc05vcm1hbChjY2luZGV4KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcCA/IHRoaXMuYXBwLmluZGV4ZXMuXyA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjY2luZGV4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWFrZUNvbHVtbk1hcEZvckluZGV4KGNvbHVtbk1hcDogTWFwT2Y8Q0NDb2x1bW4+LCBjY2luZGV4OiBDQ0luZGV4KSB7XG4gICAgICAgIGlmICghY2NpbmRleCB8fCAhY2NpbmRleC5jb2x1bW5zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBjb2x1bW5OYW1lIG9mIE9iamVjdC5rZXlzKGNjaW5kZXguY29sdW1ucykpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IGNjaW5kZXguY29sdW1uc1tjb2x1bW5OYW1lXTtcbiAgICAgICAgICAgIGNvbHVtbk1hcFtVdGlscy50b0xvd2VyQ2FzZShjb2x1bW4ubmFtZSldID0gY29sdW1uO1xuICAgICAgICAgICAgaWYgKGNvbHVtbi5hbGlhc2VzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhbGlhcyBvZiBjb2x1bW4uYWxpYXNlcykge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW5NYXBbVXRpbHMudG9Mb3dlckNhc2UoYWxpYXMpXSA9IGNvbHVtbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tYWtlQ29sdW1uTWFwRm9yUXVlcnkoY29sdW1uTWFwOiBNYXBPZjxDQ0NvbHVtbj4sIGNjcXVlcnk6IENDUXVlcnkpIHtcbiAgICAgICAgaWYgKCFjY3F1ZXJ5IHx8ICFjY3F1ZXJ5LmNvbHVtbnNJbmZvIHx8ICFjY3F1ZXJ5LmNvbHVtbnNJbmZvLmNvbHVtbnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjY2luZGV4ID0gdGhpcy5nZXRJbmRleEZvclF1ZXJ5KGNjcXVlcnkpO1xuICAgICAgICBpZiAoIWNjaW5kZXggfHwgIWNjaW5kZXguY29sdW1ucykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgY29sdW1uSW5mbyBvZiBjY3F1ZXJ5LmNvbHVtbnNJbmZvLmNvbHVtbnMpIHtcbiAgICAgICAgICAgIGlmIChjb2x1bW5JbmZvLm5hbWUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5OYW1lID0gVXRpbHMudG9Mb3dlckNhc2UoY29sdW1uSW5mby5uYW1lKTtcbiAgICAgICAgICAgICAgICBsZXQgY29sdW1uID0gY2NpbmRleC5jb2x1bW5zW2NvbHVtbk5hbWVdO1xuICAgICAgICAgICAgICAgIGlmICghY29sdW1uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbiA9IEFwcFNlcnZpY2UuZXh0cmFDb2x1bW5zW2NvbHVtbk5hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENvcHkgY29sdW1uIHNvIHdlIGNhbiBhZGQgdGhlIHF1ZXJ5IHNwZWNpZmljIGFsaWFzZXMgYW5kIGxhYmVsc1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW4gPSBVdGlscy5jb3B5KGNvbHVtbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1hcFtjb2x1bW5OYW1lXSA9IGNvbHVtbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZm8uYWxpYXNlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uLmFsaWFzZXMgPSBVdGlscy5zcGxpdChjb2x1bW5JbmZvLmFsaWFzZXMsIFtcIixcIiwgXCI7XCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYWxpYXMgb2YgY29sdW1uLmFsaWFzZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5NYXBbVXRpbHMudG9Mb3dlckNhc2UoYWxpYXMpXSA9IGNvbHVtbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBPdmVyd3JpdGUgbGFiZWxzIGlmIGRlZmluZWQgb24gdGhlIHF1ZXJ5XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmZvLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW4ubGFiZWwgPSBjb2x1bW5JbmZvLmxhYmVsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmZvLmxhYmVsUGx1cmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW4ubGFiZWxQbHVyYWwgPSBjb2x1bW5JbmZvLmxhYmVsUGx1cmFsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmZvLmZvcm1hdHRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uLmZvcm1hdHRlciA9IGNvbHVtbkluZm8uZm9ybWF0dGVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmZvLnRyYW5zZm9ybXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbi50cmFuc2Zvcm1zID0gY29sdW1uSW5mby50cmFuc2Zvcm1zO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmZvLnBhcnNlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uLnBhcnNlciA9IGNvbHVtbkluZm8ucGFyc2VyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmZvLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW4uZGVzY3JpcHRpb24gPSBjb2x1bW5JbmZvLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1ha2VNYXBzKCkge1xuICAgICAgICB0aGlzLmNvbHVtbnNCeVF1ZXJ5ID0ge307XG4gICAgICAgIHRoaXMuY29sdW1uc0J5SW5kZXggPSB7fTtcbiAgICAgICAgdGhpcy5maWVsZHNCeVF1ZXJ5ID0ge307XG4gICAgICAgIGlmICghdGhpcy5hcHApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY29sdW1uTWFwOiBNYXBPZjxDQ0NvbHVtbj47XG5cbiAgICAgICAgLy8gUXVlcmllc1xuICAgICAgICBpZiAodGhpcy5hcHAucXVlcmllcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBxdWVyeU5hbWUgb2YgT2JqZWN0LmtleXModGhpcy5hcHAucXVlcmllcykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjY3F1ZXJ5ID0gdGhpcy5hcHAucXVlcmllc1txdWVyeU5hbWVdO1xuICAgICAgICAgICAgICAgIGlmIChjY3F1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNjcXVlcnkuJGNvbHVtbkZpZWxkc1BhdHRlcm4gPSBuZXcgUGF0dGVybk1hdGNoZXIoXCJpbmNsdWRlZCBjb2x1bW4gZmllbGRzXCIsIFwiZXhjbHVkZWQgY29sdW1uIGZpZWxkc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgY2NxdWVyeS4kY29sdW1uRmllbGRzUGF0dGVybi5pbmNsdWRlZFBhdHRlcm4uc2V0VGV4dChjY3F1ZXJ5LmNvbHVtbkZpZWxkc0luY2x1ZGVkKTtcbiAgICAgICAgICAgICAgICAgICAgY2NxdWVyeS4kY29sdW1uRmllbGRzUGF0dGVybi5leGNsdWRlZFBhdHRlcm4uc2V0VGV4dChjY3F1ZXJ5LmNvbHVtbkZpZWxkc0V4Y2x1ZGVkKTtcbiAgICAgICAgICAgICAgICAgICAgY2NxdWVyeS4kcGFydG5hbWVGaWVsZHNQYXR0ZXJuID0gbmV3IFBhdHRlcm5NYXRjaGVyKFwiaW5jbHVkZWQgcGFydCBuYW1lIGZpZWxkc1wiLCBcImV4Y2x1ZGVkIHBhcnQgbmFtZSBmaWVsZHNcIik7XG4gICAgICAgICAgICAgICAgICAgIGNjcXVlcnkuJHBhcnRuYW1lRmllbGRzUGF0dGVybi5pbmNsdWRlZFBhdHRlcm4uc2V0VGV4dChjY3F1ZXJ5LnBhcnRuYW1lRmllbGRzSW5jbHVkZWQpO1xuICAgICAgICAgICAgICAgICAgICBjY3F1ZXJ5LiRwYXJ0bmFtZUZpZWxkc1BhdHRlcm4uZXhjbHVkZWRQYXR0ZXJuLnNldFRleHQoY2NxdWVyeS5wYXJ0bmFtZUZpZWxkc0V4Y2x1ZGVkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNjcXVlcnkuY29sdW1uc0luZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1hcCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2x1bW5zQnlRdWVyeVtVdGlscy50b0xvd2VyQ2FzZShjY3F1ZXJ5Lm5hbWUpXSA9IGNvbHVtbk1hcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21ha2VDb2x1bW5NYXBGb3JRdWVyeShjb2x1bW5NYXAsIGNjcXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSW5kZXhlc1xuICAgICAgICBpZiAodGhpcy5hcHAuaW5kZXhlcykge1xuICAgICAgICAgICAgLy8gU3BlY2lhbCBub3JtYWwgaW5kZXhcbiAgICAgICAgICAgIGNvbnN0IGNjaW5kZXggPSB0aGlzLmFwcC5pbmRleGVzLl87XG4gICAgICAgICAgICBpZiAoY2NpbmRleCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbk1hcCA9IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uc0J5SW5kZXguXyA9IGNvbHVtbk1hcDtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYWtlQ29sdW1uTWFwRm9ySW5kZXgoY29sdW1uTWFwLCBjY2luZGV4KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBpbmRleE5hbWUgb2YgT2JqZWN0LmtleXModGhpcy5hcHAuaW5kZXhlcykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjY2luZGV4MSA9IHRoaXMuYXBwLmluZGV4ZXNbVXRpbHMudG9Mb3dlckNhc2UoaW5kZXhOYW1lKV07XG4gICAgICAgICAgICAgICAgaWYgKGNjaW5kZXgxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmluZGV4SXNOb3JtYWwoY2NpbmRleDEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2NpbmRleDEubmFtZSAhPT0gXCJfXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbnNCeUluZGV4W1V0aWxzLnRvTG93ZXJDYXNlKGNjaW5kZXgxLm5hbWUpXSA9IHRoaXMuY29sdW1uc0J5SW5kZXguXztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1hcCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2x1bW5zQnlJbmRleFtVdGlscy50b0xvd2VyQ2FzZShjY2luZGV4MS5uYW1lKV0gPSBjb2x1bW5NYXA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWtlQ29sdW1uTWFwRm9ySW5kZXgoY29sdW1uTWFwLCBjY2luZGV4MSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaWVsZHMgcGVyIHF1ZXJ5IChjb250YWlucyBhbGlhc2VzIGZvciBkZWZhdWx0IHF1ZXJ5IGFuZCBnbG9iYWxseSBkZWZpbmVkIGFsaWFzZXMpXG4gICAgICAgIGNvbnN0IGdsb2JhbEZpZWxkcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gICAgICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLmNvbHVtbnNCeUluZGV4Ll87XG4gICAgICAgIGlmIChjb2x1bW5zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhjb2x1bW5zKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IGNvbHVtbnNba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uLmFsaWFzZXMgJiYgY29sdW1uLmFsaWFzZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbGlhcyA9IGNvbHVtbi5hbGlhc2VzWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWxpYXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbEZpZWxkcy5zZXQoYWxpYXMsIGFsaWFzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHF1ZXJ5TmFtZSBvZiBPYmplY3Qua2V5cyh0aGlzLmNvbHVtbnNCeVF1ZXJ5KSkge1xuICAgICAgICAgICAgY29uc3QgcXVlcnlGaWVsZHMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPihnbG9iYWxGaWVsZHMpO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uczEgPSB0aGlzLmNvbHVtbnNCeVF1ZXJ5W1V0aWxzLnRvTG93ZXJDYXNlKHRoaXMuZGVmYXVsdENDUXVlcnkgPyB0aGlzLmRlZmF1bHRDQ1F1ZXJ5Lm5hbWUgOiBcIlwiKV07XG4gICAgICAgICAgICBpZiAoY29sdW1uczEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhjb2x1bW5zMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sdW1uID0gY29sdW1uczFba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbHVtbi5hbGlhc2VzICYmIGNvbHVtbi5hbGlhc2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsaWFzID0gY29sdW1uLmFsaWFzZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWxpYXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeUZpZWxkcy5zZXQoYWxpYXMsIGFsaWFzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkc0J5UXVlcnlbcXVlcnlOYW1lXSA9IEFycmF5LmZyb20ocXVlcnlGaWVsZHMua2V5cygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBjbGVhck1hcHMoKSB7XG4gICAgICAgIHRoaXMuY29sdW1uc0J5UXVlcnkgPSB7fTtcbiAgICAgICAgdGhpcy5jb2x1bW5zQnlJbmRleCA9IHt9O1xuICAgICAgICB0aGlzLmZpZWxkc0J5UXVlcnkgPSB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGNvbmZpZ3VyYXRpb24gb2YgdGhlIHdlYiBzZXJ2aWNlIHdpdGggdGhlIHBhc3NlZCBuYW1lXG4gICAgICovXG4gICAgZ2V0V2ViU2VydmljZTxUIGV4dGVuZHMgQ0NXZWJTZXJ2aWNlPihuYW1lOiBzdHJpbmcpOiBUIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKCF0aGlzLmFwcCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gVXRpbHMuZ2V0RmllbGQ8Q0NDb25maWc+KHRoaXMuYXBwLndlYlNlcnZpY2VzLCBuYW1lKSBhcyBUO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbGlzdCBjb25maWd1cmF0aW9uIHdpdGggdGhlIHBhc3NlZCBuYW1lXG4gICAgICovXG4gICAgZ2V0TGlzdChuYW1lOiBzdHJpbmcpOiBDQ0xpc3QgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoIXRoaXMuYXBwKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmFwcC5saXN0c1tuYW1lXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGRlZmF1bHQge0BsaW5rIENDUXVlcnl9XG4gICAgICovXG4gICAgZ2V0IGRlZmF1bHRDQ1F1ZXJ5KCk6IENDUXVlcnkgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdENDUXVlcnk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBjdXJyZW50IHtAbGluayBDQ1F1ZXJ5fVxuICAgICAqL1xuICAgIGdldCBjY3F1ZXJ5KCk6IENDUXVlcnkgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoISF0aGlzLl9jY3F1ZXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2NxdWVyeTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdENDUXVlcnk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjdXJyZW50IHtAbGluayBDQ1F1ZXJ5fVxuICAgICAqL1xuICAgIHNldCBjY3F1ZXJ5KHZhbHVlOiBDQ1F1ZXJ5IHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fY2NxdWVyeSkge1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXMgPSB0aGlzLl9jY3F1ZXJ5O1xuICAgICAgICAgICAgdGhpcy5fY2NxdWVyeSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoe3R5cGU6IFwicXVlcnktY2hhbmdlZFwiLCBjdXJyZW50OiB0aGlzLl9jY3F1ZXJ5LCBwcmV2aW91czogcHJldmlvdXN9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUge0BsaW5rIENDUXVlcnl9IHdpdGggdGhlIHBhc3NlZCBuYW1lXG4gICAgICovXG4gICAgZ2V0Q0NRdWVyeShuYW1lOiBzdHJpbmcpOiBDQ1F1ZXJ5IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwID8gdGhpcy5hcHAucXVlcmllc1tVdGlscy50b0xvd2VyQ2FzZShuYW1lKV0gOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjdXJyZW50IHtAbGluayBDQ1F1ZXJ5fSB0byB0aGF0IHdpdGggdGhlIHBhc3NlZCBuYW1lXG4gICAgICovXG4gICAgc2V0Q0NRdWVyeShuYW1lPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGNjcXVlcnkgPSAhbmFtZSA/IHRoaXMuZGVmYXVsdENDUXVlcnkgOiB0aGlzLmdldENDUXVlcnkobmFtZSk7XG4gICAgICAgIGlmIChjY3F1ZXJ5KSB7XG4gICAgICAgICAgICB0aGlzLmNjcXVlcnkgPSBjY3F1ZXJ5O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEFwcFNlcnZpY2Uuc2V0Q0NRdWVyeSAtIHF1ZXJ5ICcke25hbWV9JyBkb2VzIG5vdCBleGlzdGApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBmaWVsZHMgZGVmaW5lZCBvbiB0aGUgY3VycmVudCB7QGxpbmsgQ0NRdWVyeX1cbiAgICAgKi9cbiAgICBnZXQgZmllbGRzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgaWYgKCF0aGlzLmNjcXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5maWVsZHNCeVF1ZXJ5W1V0aWxzLnRvTG93ZXJDYXNlKHRoaXMuY2NxdWVyeS5uYW1lKV0gfHwgW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB7QGxpbmsgQ0NBZ2dyZWdhdGlvbn0gd2l0aCB0aGUgcGFzc2VkIG5hbWVcbiAgICAgKi9cbiAgICBnZXRDQ0FnZ3JlZ2F0aW9uKG5hbWU6IHN0cmluZyk6IENDQWdncmVnYXRpb24gfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoIXRoaXMuY2NxdWVyeSB8fCAhdGhpcy5jY3F1ZXJ5LmFnZ3JlZ2F0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jY3F1ZXJ5LmFnZ3JlZ2F0aW9ucy5maW5kKCh2YWx1ZSkgPT4gVXRpbHMuZXFOQyhuYW1lLCB2YWx1ZS5uYW1lKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB7QGxpbmsgQ0NJbmRleH0gd2l0aCB0aGUgcGFzc2VkIG5hbWVcbiAgICAgKi9cbiAgICBnZXRJbmRleChuYW1lOiBzdHJpbmcpOiBDQ0luZGV4IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKCF0aGlzLmFwcCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gVXRpbHMuZ2V0RmllbGQ8Q0NJbmRleD4odGhpcy5hcHAuaW5kZXhlcywgbmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB7QGxpbmsgQ0NDb2x1bW59IHdpdGggdGhlIHBhc3NlZCBuYW1lLiBBbGlhc2VzIGFyZSByZXNvbHZlZFxuICAgICAqL1xuICAgIGdldENvbHVtbihuYW1lOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogQ0NDb2x1bW4gfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmNjcXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRmlyc3QsIENDUXVlcnkgc3BlY2lmaWMgYWxpYXNlc1xuICAgICAgICBsZXQgY29sdW1uOiBDQ0NvbHVtbjtcbiAgICAgICAgbGV0IGNvbHVtbkFsaWFzZXMgPSB0aGlzLmNvbHVtbnNCeVF1ZXJ5W1V0aWxzLnRvTG93ZXJDYXNlKHRoaXMuY2NxdWVyeS5uYW1lKV07XG4gICAgICAgIGlmIChjb2x1bW5BbGlhc2VzKSB7XG4gICAgICAgICAgICBjb2x1bW4gPSBjb2x1bW5BbGlhc2VzW1V0aWxzLnRvTG93ZXJDYXNlKG5hbWUpXTtcbiAgICAgICAgICAgIGlmIChjb2x1bW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sdW1uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFNlY29uZCwgYWxpYXNlcyBieSBpbmRleFxuICAgICAgICBjb25zdCBpbmRleGVzID0gVXRpbHMuc3BsaXQodGhpcy5jY3F1ZXJ5LnNlYXJjaEluZGV4ZXMsIFtcIixcIl0pO1xuICAgICAgICBjb25zdCBmaXJzdEluZGV4ID0gaW5kZXhlcy5sZW5ndGggPT09IDAgPyB1bmRlZmluZWQgOiB0aGlzLmdldEluZGV4KGluZGV4ZXNbMF0pO1xuICAgICAgICBpZiAoaW5kZXhlcy5sZW5ndGggPT09IDAgfHwgKCEhZmlyc3RJbmRleCAmJiB0aGlzLmluZGV4SXNOb3JtYWwoZmlyc3RJbmRleCkpKSB7XG4gICAgICAgICAgICBjb2x1bW5BbGlhc2VzID0gdGhpcy5jb2x1bW5zQnlJbmRleC5fO1xuICAgICAgICAgICAgaWYgKGNvbHVtbkFsaWFzZXMpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4gPSBjb2x1bW5BbGlhc2VzW1V0aWxzLnRvTG93ZXJDYXNlKG5hbWUpXTtcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb2x1bW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBpbmRleCBvZiBpbmRleGVzKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uQWxpYXNlcyA9IHRoaXMuY29sdW1uc0J5SW5kZXhbVXRpbHMudG9Mb3dlckNhc2UoaW5kZXgpXTtcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uQWxpYXNlcykge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW4gPSBjb2x1bW5BbGlhc2VzW1V0aWxzLnRvTG93ZXJDYXNlKG5hbWUpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbHVtbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbHVtbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBUaGlyZCwgZXh0cmEgY29sdW1uc1xuICAgICAgICBjb2x1bW4gPSBBcHBTZXJ2aWNlLmV4dHJhQ29sdW1uc1tVdGlscy50b0xvd2VyQ2FzZShuYW1lKV07XG4gICAgICAgIGlmIChjb2x1bW4pIHtcbiAgICAgICAgICAgIHJldHVybiBjb2x1bW47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGRlZmF1bHQgYWxpYXMgYSBjb2x1bW5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gVGhlIGNvbHVtblxuICAgICAqIEByZXR1cm4gVGhlIGRlZmF1bHQgYWxpYXMgb3IgYG51bGxgIGlmIG5vIGFsaWFzIGlzIGRlZmluZWRcbiAgICAgKi9cbiAgICBnZXRDb2x1bW5EZWZhdWx0QWxpYXMoY29sdW1uPzogQ0NDb2x1bW4pOiBzdHJpbmcge1xuICAgICAgICBpZiAoY29sdW1uKSB7XG4gICAgICAgICAgICBpZiAoY29sdW1uLmFsaWFzZXMgJiYgY29sdW1uLmFsaWFzZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2x1bW4uYWxpYXNlc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG5hbWUgb2YgYSBjb2x1bW5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gVGhlIGNvbHVtblxuICAgICAqIEBwYXJhbSBfZGVmYXVsdCBBIGRlZmF1bHQgbmFtZSB0byByZXR1cm4gaWYgYGNvbHVtbmAgaXMgZW1wdHlcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldENvbHVtbk5hbWUoY29sdW1uPzogQ0NDb2x1bW4sIF9kZWZhdWx0ID0gXCJcIik6IHN0cmluZyB7XG4gICAgICAgIGlmIChjb2x1bW4pIHtcbiAgICAgICAgICAgIHJldHVybiBjb2x1bW4ubmFtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX2RlZmF1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBkZWZhdWx0IGFsaWFzIGZvciBhIGNvbHVtblxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiBUaGUgY29sdW1uXG4gICAgICogQHBhcmFtIF9kZWZhdWx0IEEgZGVmYXVsdCBhbGlhcyBuYW1lIHRvIHJldHVybiBpZiB0aGUgYGNvbHVtbmAgaXMgZW1wdHkgb3Igbm8gYWxpYXMgaXMgZGVmaW5lZFxuICAgICAqL1xuICAgIGdldENvbHVtbkFsaWFzKGNvbHVtbj86IENDQ29sdW1uLCBfZGVmYXVsdCA9IFwiXCIpOiBzdHJpbmcge1xuICAgICAgICBpZiAoY29sdW1uKSB7XG4gICAgICAgICAgICBjb25zdCBhbGlhcyA9IHRoaXMuZ2V0Q29sdW1uRGVmYXVsdEFsaWFzKGNvbHVtbik7XG4gICAgICAgICAgICBpZiAoYWxpYXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWxpYXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9kZWZhdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGNvbHVtbiBuYW1lIGZyb20gYSBuYW1lIHdoaWNoIGNhbiBiZSBhbiBhbGlhc1xuICAgICAqL1xuICAgIHJlc29sdmVDb2x1bW5OYW1lKG5hbWU6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLmdldENvbHVtbihuYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29sdW1uTmFtZShjb2x1bW4sIG5hbWUgfHwgXCJcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgY29sdW1uIGFsaWFzIGZyb20gYSBuYW1lIHdoaWNoIGNhbiBiZSBhbiBhbGlhc1xuICAgICAqL1xuICAgIHJlc29sdmVDb2x1bW5BbGlhcyhuYW1lOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5nZXRDb2x1bW4obmFtZSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbHVtbkFsaWFzKGNvbHVtbiwgbmFtZSB8fCBcIlwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBhIGZpZWxkZWQgc2VhcmNoIGV4cHJlc3Npb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0IFRoZSBleHByZXNzaW9uXG4gICAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgdGhlIHBhcnNpbmdcbiAgICAgKiBAcmV0dXJuIFRoZSBwYXJzZWQge0BsaW5rIEV4cHJ9IG9yIGFuIGVycm9yIG1lc3NhZ2VcbiAgICAgKi9cbiAgICBwYXJzZUV4cHIodGV4dDogc3RyaW5nLCBvcHRpb25zPzogRXhwclBhcnNlck9wdGlvbnMpOiBFeHByIHwgc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEV4cHJQYXJzZXIucGFyc2UodGV4dCwge2FwcFNlcnZpY2U6IHRoaXMsIGZvcm1hdFNlcnZpY2U6IHRoaXMuZm9ybWF0U2VydmljZSwgaW50bFNlcnZpY2U6IHRoaXMuaW50bFNlcnZpY2V9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFc2NhcGUgYSB2YWx1ZSBmb3IgZmllbGRlZCBzZWFyY2ggaWYgbmVjZXNzYXJ5LiBgRGF0ZWAgb2JqZWN0cyBhcmUgY29udmVydGVkIHRvXG4gICAgICogU2luZXF1YSBzeXN0ZW0gZGF0ZSBzdHJpbmdzIGFuZCBub24tc2NhbGFycyBmaWVsZHMgYXJlIGVzY2FwZWRcbiAgICAgKiBAcGFyYW0gZmllbGQgVGhlIHZhbHVlJ3MgZmllbGRcbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlXG4gICAgICovXG4gICAgZXNjYXBlRmllbGRWYWx1ZShmaWVsZDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSB8IGJvb2xlYW4gfCB1bmRlZmluZWQpOiBzdHJpbmcge1xuICAgICAgICBpZiAoVXRpbHMuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnRvU3lzRGF0ZVN0cih2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUgPSB2YWx1ZSArIFwiXCI7XG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuZ2V0Q29sdW1uKGZpZWxkKTtcbiAgICAgICAgaWYgKGNvbHVtbiAmJiAhQXBwU2VydmljZS5pc1NjYWxhcihjb2x1bW4pKSB7XG4gICAgICAgICAgICAvLyBlc2Nhb2UgY29sdW1ucyB0aGF0IG1pZ2h0IGNvbnRhaW4gc2VhcmNoIG9wZXJhdG9ycyBpbiB0aGVtICh0cmVhdGluZyBuZWdhdGl2ZSBudW1iZXJzIGFzIGFuIGlnbm9yYWJsZSBlZGdlIGNhc2UpXG4gICAgICAgICAgICByZXR1cm4gRXhwclBhcnNlci5lc2NhcGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGxhYmVsIG9mIGEgY29sdW1uLiBUaGUgcGx1cmFsIGxhYmVsIGlzIHJldHVybmVkIGZvciBjc3YtdHlwZSBjb2x1bW5zLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGNvbHVtbiB3aGljaCBjYW4gYmUgYW4gYWxpYXNcbiAgICAgKiBAcGFyYW0gX2RlZmF1bHQgVGhlIGRlZmF1bHQgbGFiZWwgdG8gcmV0dXJuIGlmIG5vIGxhYmVsIGlzIGRlZmluZWRcbiAgICAgKi9cbiAgICBnZXRMYWJlbChuYW1lOiBzdHJpbmcsIF9kZWZhdWx0Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5nZXRDb2x1bW4obmFtZSk7XG4gICAgICAgIGlmIChjb2x1bW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gQXBwU2VydmljZS5pc0Nzdihjb2x1bW4pID8gY29sdW1uLmxhYmVsUGx1cmFsIDogY29sdW1uLmxhYmVsO1xuICAgICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhYmVsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghVXRpbHMuaXNVbmRlZmluZWQoX2RlZmF1bHQpKSB7XG4gICAgICAgICAgICByZXR1cm4gX2RlZmF1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBzaW5ndWxhciBsYWJlbCBvZiBhIGNvbHVtblxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGNvbHVtbiB3aGljaCBjYW4gYmUgYW4gYWxpYXNcbiAgICAgKiBAcGFyYW0gX2RlZmF1bHQgVGhlIGRlZmF1bHQgbGFiZWwgdG8gcmV0dXJuIGlmIG5vIGxhYmVsIGlzIGRlZmluZWRcbiAgICAgKi9cbiAgICBnZXRTaW5ndWxhckxhYmVsKG5hbWU6IHN0cmluZywgX2RlZmF1bHQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLmdldENvbHVtbihuYW1lKTtcbiAgICAgICAgaWYgKGNvbHVtbiAmJiBjb2x1bW4ubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBjb2x1bW4ubGFiZWw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFVdGlscy5pc1VuZGVmaW5lZChfZGVmYXVsdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBfZGVmYXVsdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHBsdXJhbCBsYWJlbCBvZiBhIGNvbHVtblxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGNvbHVtbiB3aGljaCBjYW4gYmUgYW4gYWxpYXNcbiAgICAgKiBAcGFyYW0gX2RlZmF1bHQgVGhlIGRlZmF1bHQgbGFiZWwgdG8gcmV0dXJuIGlmIG5vIGxhYmVsIGlzIGRlZmluZWRcbiAgICAgKi9cbiAgICBnZXRQbHVyYWxMYWJlbChuYW1lOiBzdHJpbmcsIF9kZWZhdWx0Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5nZXRDb2x1bW4obmFtZSk7XG4gICAgICAgIGlmIChjb2x1bW4gJiYgY29sdW1uLmxhYmVsUGx1cmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gY29sdW1uLmxhYmVsUGx1cmFsO1xuICAgICAgICB9XG4gICAgICAgIGlmICghVXRpbHMuaXNVbmRlZmluZWQoX2RlZmF1bHQpKSB7XG4gICAgICAgICAgICByZXR1cm4gX2RlZmF1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGB0cnVlYCBpZiBhIGNvbHVtbiB3aXRoIHRoZSBwYXNzZWQgbmFtZSBvciBhbGlhcyBpcyBhIHN0cmluZ1xuICAgICAqL1xuICAgIGlzU3RyaW5nKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLmdldENvbHVtbihuYW1lKTtcbiAgICAgICAgcmV0dXJuICEhY29sdW1uICYmIEFwcFNlcnZpY2UuaXNTdHJpbmcoY29sdW1uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIGEgY29sdW1uIHdpdGggdGhlIHBhc3NlZCBuYW1lIG9yIGFsaWFzIGlzIGEgY3N2XG4gICAgICovXG4gICAgaXNDc3YobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuZ2V0Q29sdW1uKG5hbWUpO1xuICAgICAgICByZXR1cm4gISFjb2x1bW4gJiYgQXBwU2VydmljZS5pc0Nzdihjb2x1bW4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgYSBjb2x1bW4gd2l0aCB0aGUgcGFzc2VkIG5hbWUgb3IgYWxpYXMgaXMgYSB0cmVlXG4gICAgICovXG4gICAgaXNUcmVlKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLmdldENvbHVtbihuYW1lKTtcbiAgICAgICAgcmV0dXJuICEhY29sdW1uICYmIEFwcFNlcnZpY2UuaXNUcmVlKGNvbHVtbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGB0cnVlYCBpZiBhIGNvbHVtbiB3aXRoIHRoZSBwYXNzZWQgbmFtZSBvciBhbGlhcyBpcyBhbiBlbnRpdHlcbiAgICAgKi9cbiAgICBpc0VudGl0eShuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5nZXRDb2x1bW4obmFtZSk7XG4gICAgICAgIHJldHVybiAhIWNvbHVtbiAmJiBBcHBTZXJ2aWNlLmlzRW50aXR5KGNvbHVtbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGB0cnVlYCBpZiBhIGNvbHVtbiB3aXRoIHRoZSBwYXNzZWQgbmFtZSBvciBhbGlhcyBpcyBhIGJvb2xlYW5cbiAgICAgKi9cbiAgICBpc0Jvb2xlYW4obmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuZ2V0Q29sdW1uKG5hbWUpO1xuICAgICAgICByZXR1cm4gISFjb2x1bW4gJiYgQXBwU2VydmljZS5pc0Jvb2xlYW4oY29sdW1uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIGEgY29sdW1uIHdpdGggdGhlIHBhc3NlZCBuYW1lIG9yIGFsaWFzIGlzIGEgZGF0ZVxuICAgICAqL1xuICAgIGlzRGF0ZShuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5nZXRDb2x1bW4obmFtZSk7XG4gICAgICAgIHJldHVybiAhIWNvbHVtbiAmJiBBcHBTZXJ2aWNlLmlzRGF0ZShjb2x1bW4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgYSBjb2x1bW4gd2l0aCB0aGUgcGFzc2VkIG5hbWUgb3IgYWxpYXMgaXMgYSBkb3VibGVcbiAgICAgKi9cbiAgICBpc0RvdWJsZShuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5nZXRDb2x1bW4obmFtZSk7XG4gICAgICAgIHJldHVybiAhIWNvbHVtbiAmJiBBcHBTZXJ2aWNlLmlzRG91YmxlKGNvbHVtbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGB0cnVlYCBpZiBhIGNvbHVtbiB3aXRoIHRoZSBwYXNzZWQgbmFtZSBvciBhbGlhcyBpcyBhbiBpbnRlZ2VyXG4gICAgICovXG4gICAgaXNJbnRlZ2VyKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLmdldENvbHVtbihuYW1lKTtcbiAgICAgICAgcmV0dXJuICEhY29sdW1uICYmIEFwcFNlcnZpY2UuaXNJbnRlZ2VyKGNvbHVtbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGB0cnVlYCBpZiBhIGNvbHVtbiB3aXRoIHRoZSBwYXNzZWQgbmFtZSBvciBhbGlhcyBpcyBhIG51bWJlciAoaW50ZWdlciBvciBkb3VibGUpXG4gICAgICovXG4gICAgaXNOdW1iZXIobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzSW50ZWdlcihuYW1lKSB8fCB0aGlzLmlzRG91YmxlKG5hbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgYSBjb2x1bW4gd2l0aCB0aGUgcGFzc2VkIG5hbWUgb3IgYWxpYXMgaXMgYSBzY2FsYXJcbiAgICAgKi9cbiAgICBpc1NjYWxhcihuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5nZXRDb2x1bW4obmFtZSk7XG4gICAgICAgIHJldHVybiAhIWNvbHVtbiAmJiBBcHBTZXJ2aWNlLmlzU2NhbGFyKGNvbHVtbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGB0cnVlYCBpZiBhIGNvbHVtbiB3aXRoIHRoZSBwYXNzZWQgbmFtZSBvciBhbGlhcyBpcyBzb3J0YWJsZVxuICAgICAqL1xuICAgIGlzU29ydGFibGUobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuZ2V0Q29sdW1uKG5hbWUpO1xuICAgICAgICByZXR1cm4gISFjb2x1bW4gJiYgQXBwU2VydmljZS5pc1NvcnRhYmxlKGNvbHVtbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgdGhlIHBhc3NlZCB1cmwgaXMgcmVsYXRpdmUgYW5kIENPUlMgaXMgYWN0aXZlIHRoZW5cbiAgICAgKiBwcmVwZW5kIGl0IHdpdGggdGhlIFNpbmVxdWEgc2VydmVyIG9yaWdpblxuICAgICAqL1xuICAgIHVwZGF0ZVVybEZvckNvcnModXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5zdGFydENvbmZpZy5jb3JzQWN0aXZlICYmICEhdXJsICYmICFVdGlscy5pc1VybEFic29sdXRlKHVybCkpIHtcbiAgICAgICAgICAgIHVybCA9IFV0aWxzLmFkZFVybCh0aGlzLm9yaWdpbiwgdXJsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgdXJsIHRvIHRoZSBTaW5lcXVhIGFkbWluaXN0cmF0aW9uIGNvbnNvbGVcbiAgICAgKi9cbiAgICBnZXQgYWRtaW5VcmwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlVXJsRm9yQ29ycyhVdGlscy5hZGRVcmwodGhpcy5zdGFydENvbmZpZy5hcHBsaWNhdGlvblBhdGghLCBcImFkbWluXCIpKTtcbiAgICB9XG59Il19