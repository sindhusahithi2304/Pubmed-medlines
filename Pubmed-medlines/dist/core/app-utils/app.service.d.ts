import { OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IntlService } from "@sinequa/core/intl";
import { FormatService } from "./format.service";
import { AppWebService, AuditEvents, StartConfig, CCApp, CCQuery, CCLabels, CCAutocomplete, CCColumn, CCIndex, CCWebService, CCList, CCAggregation } from "@sinequa/core/web-services";
import { ExprParserOptions, Expr } from "./query/expr-parser";
import * as i0 from "@angular/core";
/**
 * A base event from which all events that can be issued by the {@link AppService} are derived
 */
export interface AppEvent {
    type: "query-changed";
}
/**
 * This event is fired each time the [ccquery]{@link AppService#ccquery} member is modified.
 */
export interface QueryChangedEvent extends AppEvent {
    type: "query-changed";
    current?: CCQuery;
    previous?: CCQuery;
}
/**
 * A union of the different events that the {@link AppService} can generate
 */
export declare type AppEvents = QueryChangedEvent;
/**
 * A service to manage the Sinequa SBA configuration
 */
export declare class AppService implements OnDestroy {
    startConfig: StartConfig;
    appWebService: AppWebService;
    intlService: IntlService;
    formatService: FormatService;
    private static extraColumns;
    /**
     * The app configuration
     */
    app?: CCApp;
    /**
     * The labels configuration
     */
    cclabels?: CCLabels;
    /**
     * The autocomplete configuration
     */
    ccautocomplete?: CCAutocomplete;
    /**
     * The suggest queries configured on the application
     */
    suggestQueries: string[];
    private columnsByQuery;
    private columnsByIndex;
    private fieldsByQuery;
    private _defaultCCQuery?;
    private _ccquery?;
    protected _events: Subject<QueryChangedEvent>;
    private static toEngineType;
    private static toEngineTypeModifierSimple;
    private static toEngineTypeModifier;
    private static makeColumn;
    /**
     * Return `true` if a `column` is a string
     */
    static isString(column: CCColumn | undefined): boolean;
    /**
     * Return `true` if a `column` is a csv
     */
    static isCsv(column: CCColumn | undefined): boolean;
    /**
     * Return `true` if a `column` is a tree
     */
    static isTree(column: CCColumn | undefined): boolean;
    /**
     * Return `true` if a `column` is an entity
     */
    static isEntity(column: CCColumn | undefined): boolean;
    /**
     * Return `true` if a `column` is a boolean
     */
    static isBoolean(column: CCColumn | undefined): boolean;
    /**
     * Return `true` if a `column` is a date
     */
    static isDate(column: CCColumn | undefined): boolean;
    /**
     * Return `true` if a `column` is a double
     */
    static isDouble(column: CCColumn | undefined): boolean;
    /**
     * Return `true` if a `column` is an integer
     */
    static isInteger(column: CCColumn | undefined): boolean;
    /**
     * Return `true` if a `column` is a number (integer or double)
     */
    static isNumber(column: CCColumn | undefined): boolean;
    /**
     * Return `true` if a `column` is a scalar
     */
    static isScalar(column: CCColumn | undefined): boolean;
    /**
     * Return `true` if a `column` is sortable
     */
    static isSortable(column: CCColumn | undefined): boolean;
    constructor(startConfig: StartConfig, appWebService: AppWebService, intlService: IntlService, formatService: FormatService);
    ngOnDestroy(): void;
    /**
     * Return an `Observable` stream of the events that the `AppService` can generate
     */
    get events(): Observable<AppEvents>;
    /**
     * Return the name of the SBA
     */
    get appName(): string;
    /**
     * Return the origin of the Sinequa server
     */
    get origin(): string;
    private initDefaultQuery;
    private setApp;
    private verifyServerApiVersionCompatibility;
    /**
     * Initialize this service by retrieving the current application
     * configuration from the Sinequa server and using it to set up the data structures
     * on which the service relies
     */
    init(): Observable<CCApp>;
    /**
     * Initialize this service from an application configuration object. This is typically
     * used for supporting mutiple concurrent queries within the same application by providing
     * component level instances of this service.
     */
    initFromApp(app: CCApp): void;
    /**
     * Refresh the application configuration, reinitializing the service if it has changed
     *
     * @param auditEvents Any associated audit events that should be stored
     */
    refresh(auditEvents?: AuditEvents): Observable<CCApp | undefined>;
    /**
     * Clear the data associated with the service. Typically used when processing a user logout
     */
    clear(): void;
    private indexIsNormal;
    private getIndexForQuery;
    private _makeColumnMapForIndex;
    private _makeColumnMapForQuery;
    protected makeMaps(): void;
    protected clearMaps(): void;
    /**
     * Get the configuration of the web service with the passed name
     */
    getWebService<T extends CCWebService>(name: string): T | undefined;
    /**
     * Get the list configuration with the passed name
     */
    getList(name: string): CCList | undefined;
    /**
     * Return the default {@link CCQuery}
     */
    get defaultCCQuery(): CCQuery | undefined;
    /**
     * Return the current {@link CCQuery}
     */
    get ccquery(): CCQuery | undefined;
    /**
     * Set the current {@link CCQuery}
     */
    set ccquery(value: CCQuery | undefined);
    /**
     * Get the {@link CCQuery} with the passed name
     */
    getCCQuery(name: string): CCQuery | undefined;
    /**
     * Set the current {@link CCQuery} to that with the passed name
     */
    setCCQuery(name?: string): boolean;
    /**
     * Return the fields defined on the current {@link CCQuery}
     */
    get fields(): string[];
    /**
     * Get the {@link CCAggregation} with the passed name
     */
    getCCAggregation(name: string): CCAggregation | undefined;
    /**
     * Get the {@link CCIndex} with the passed name
     */
    getIndex(name: string): CCIndex | undefined;
    /**
     * Get the {@link CCColumn} with the passed name. Aliases are resolved
     */
    getColumn(name: string | null | undefined): CCColumn | undefined;
    /**
     * Get the default alias a column
     *
     * @param column The column
     * @return The default alias or `null` if no alias is defined
     */
    getColumnDefaultAlias(column?: CCColumn): string;
    /**
     * Get the name of a column
     *
     * @param column The column
     * @param _default A default name to return if `column` is empty
     */
    private getColumnName;
    /**
     * Get the default alias for a column
     *
     * @param column The column
     * @param _default A default alias name to return if the `column` is empty or no alias is defined
     */
    getColumnAlias(column?: CCColumn, _default?: string): string;
    /**
     * Return a column name from a name which can be an alias
     */
    resolveColumnName(name: string | null | undefined): string;
    /**
     * Return a column alias from a name which can be an alias
     */
    resolveColumnAlias(name: string | null | undefined): string;
    /**
     * Parse a fielded search expression
     *
     * @param text The expression
     * @param options Options for the parsing
     * @return The parsed {@link Expr} or an error message
     */
    parseExpr(text: string, options?: ExprParserOptions): Expr | string;
    /**
     * Escape a value for fielded search if necessary. `Date` objects are converted to
     * Sinequa system date strings and non-scalars fields are escaped
     * @param field The value's field
     * @param value The value
     */
    escapeFieldValue(field: string, value: string | number | Date | boolean | undefined): string;
    /**
     * Get the label of a column. The plural label is returned for csv-type columns.
     *
     * @param name The name of the column which can be an alias
     * @param _default The default label to return if no label is defined
     */
    getLabel(name: string, _default?: string): string;
    /**
     * Get the singular label of a column
     *
     * @param name The name of the column which can be an alias
     * @param _default The default label to return if no label is defined
     */
    getSingularLabel(name: string, _default?: string): string;
    /**
     * Get the plural label of a column
     *
     * @param name The name of the column which can be an alias
     * @param _default The default label to return if no label is defined
     */
    getPluralLabel(name: string, _default?: string): string;
    /**
     * Return `true` if a column with the passed name or alias is a string
     */
    isString(name: string): boolean;
    /**
     * Return `true` if a column with the passed name or alias is a csv
     */
    isCsv(name: string): boolean;
    /**
     * Return `true` if a column with the passed name or alias is a tree
     */
    isTree(name: string): boolean;
    /**
     * Return `true` if a column with the passed name or alias is an entity
     */
    isEntity(name: string): boolean;
    /**
     * Return `true` if a column with the passed name or alias is a boolean
     */
    isBoolean(name: string): boolean;
    /**
     * Return `true` if a column with the passed name or alias is a date
     */
    isDate(name: string): boolean;
    /**
     * Return `true` if a column with the passed name or alias is a double
     */
    isDouble(name: string): boolean;
    /**
     * Return `true` if a column with the passed name or alias is an integer
     */
    isInteger(name: string): boolean;
    /**
     * Return `true` if a column with the passed name or alias is a number (integer or double)
     */
    isNumber(name: string): boolean;
    /**
     * Return `true` if a column with the passed name or alias is a scalar
     */
    isScalar(name: string): boolean;
    /**
     * Return `true` if a column with the passed name or alias is sortable
     */
    isSortable(name: string): boolean;
    /**
     * If the passed url is relative and CORS is active then
     * prepend it with the Sinequa server origin
     */
    updateUrlForCors(url: string): string;
    /**
     * Return the url to the Sinequa administration console
     */
    get adminUrl(): string;
    static ɵfac: i0.ɵɵFactoryDef<AppService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AppService>;
}
//# sourceMappingURL=app.service.d.ts.map