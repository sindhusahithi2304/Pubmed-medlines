import { MapOf, JsonObject, PatternMatcher } from "@sinequa/core/base";
/**
 * Describes the fields available in all configuration objects. By convention, configuration object
 * interfaces are prefixed by `CC`.
 */
export interface CCConfig {
    /**
     * The name of the configuration object
     */
    name: string;
    /**
     * An optional description of the configuration object
     */
    description?: string;
}
/**
 * Describes the fields available in all web service configuration objects
 */
export interface CCWebService extends CCConfig {
    webServiceType: "Query" | "sponsoredlinks" | "queryexport" | "Preview" | "Labels" | "Autocomplete" | "DataSet";
}
/**
 * Describes the fields available in the index configuration object
 */
export interface CCIndex extends CCConfig {
    /**
     * The type of the index
     */
    indexType: string;
    /**
     * The columns in the index
     */
    columns?: MapOf<CCColumn>;
}
/**
 * Describes the fields available in a list item configuration object
 */
export interface CCListItem {
    /**
     * The name is used to display an item
     */
    name: string;
    /**
     * The value holds the underlying value of the item
     */
    value: string;
}
/**
 * Describes a list configuration object. Lists can be created in `App Dependencies/Lists` in the admin interface.
 */
export interface CCList extends CCConfig {
    /**
     * The name of the list
     */
    name: string;
    /**
     * The items in the list
     */
    items: CCListItem[];
}
/**
 * Describes an RFM action configuration object
 */
export interface CCRFMAction {
    name: string;
    enabled: boolean;
    actionEnabled: boolean;
    noMenu: boolean;
    displayUnrated: boolean;
    negAvailable: boolean;
}
/**
 * Describes an RFM configuration object
 */
export interface CCRFM {
    name: string;
    click: CCRFMAction;
    like: CCRFMAction;
    important: CCRFMAction;
}
/**
 * Describes an aggregation configuration object
 */
export interface CCAggregation {
    /**
     * The name of the aggregation
     */
    name: string;
    /**
     * The underlying column in the aggregation
     */
    column: string;
    /**
     * Determines whether this aggregation should be included in a regular search
     */
    includeInStandardSearch: boolean;
    /**
     * The maximum number of values to retrieve
     */
    count: number;
    /**
     * The value of the `order` clause
     */
    order: string;
    /**
     * The value of the `mask` clause
     */
    mask: string;
    /**
     * The name of an associated distribution configuration object
     */
    distribution: string;
    /**
     * Determines whether the aggregation is requested in the context of the currently selected tab or globally.
     * The default is to respect the [CCTabSearch.loadAggregationsForSelectedTab]{@link CCTabSearch#loadAggregationsForSelectedTab} setting
     */
    tabBehavior: "" | "Default" | "LoadForSelectedTab" | "LoadForAllTabs";
    /**
     * The separator used for crossed aggregations
     */
    keySeparator: string;
    /**
     * The display separator used for crossed aggregations
     */
    displayKeySeparator: string;
}
/**
 * Describes the fields for a tab configuration object
 */
export interface CCTab {
    /**
     * The name of the tab
     */
    name: string;
    /**
     * The display value of the tab
     */
    display: string;
    /**
     * The values in the tab distribution that contribute to this tab
     */
    value: string;
    /**
     * Set if this tab is the default to be used when no tab is specified in a query
     */
    isDefault: boolean;
    /**
     * Indexes to exclude when executing a query with this tab selected
     */
    excludedIndices: string;
    /**
     * Aggregations to exclude when executing a query with this tab selected
     */
    excludedAggregations: string;
    /**
     * Results sorting options that should be available when executing a query with this tab selected
     */
    sortingChoices: CCSortingChoice[];
}
/**
 * Describes the fields for the tab search configuration in a query. A tab search defines a special distribution which is evaluated
 * as a part of query to group the results by a set of tab items. The distribution gives the count of documents
 * associated with each tab item. The values associated with a tab item are used to filter a query when a tab item is selected.
 */
export interface CCTabSearch {
    /**
     * Determines whether this tab search is used in a query
     */
    isActive: boolean;
    /**
     * Defines the column to be used in the tab distribution and for filtering results by a selected tab item
     */
    column: string;
    /**
     * `true` if the associated column is a tree
     */
    columnIsTree: boolean;
    /**
     * Determines whether the overall document total should be calculated from the per-tab item documents totals
     */
    totalIsSumOfTabTotals: boolean;
    /**
     * Determines whether configured aggregations should be evaluated in the context of the selected tab or not.
     * This setting can be overridden at the tab item level using [CCTab.excludedAggregations]{@link CCTab#excludedAggregations}
     */
    loadAggregationsForSelectedTab: boolean;
    /**
     * Determines the `minlevel` value to use when evaluating the tab distribution for a tree column
     */
    valueLevels: number;
    /**
     * Determines whether `post-group-by=true` should be used in the tab distribution
     */
    postGroupBy: boolean;
    /**
     * Determines whether 'merge-groups=true` should be used in the tab distribution. This is only used if `postGroupBy` is set to `true`
     */
    mergeGroups: boolean;
    /**
     * The set of configured tab items
     */
    tabs: CCTab[];
}
/**
 * Describes a sorting choice which can be selected for a query
 */
export interface CCSortingChoice {
    /**
     * The name of this sorting choice
     */
    name: string;
    /**
     * The description of this sorting choice
     */
    description: string;
    /**
     * The display value to use when rendering this sorting choice
     */
    display: string;
    /**
     * The `ORDER BY` clause to use when this sorting choice is selected
     */
    orderByClause: string;
    /**
     * Determines whether this sorting choice should be used as the default when
     * the query has no `text contains` clause
     */
    isDefaultNoRelevance: boolean;
    /**
     * Determines whether this sorting choice should be used as the default when
     * the query has a `text contains` clause
     */
    isDefaultWithRelevance: boolean;
}
/**
 * Describes a scope configuration object. A scope defines a set of conditions which
 * will be added to the query `where clause` when the scope is selected
 */
export interface CCScope {
    /**
     * The name of the scope
     */
    name: string;
    /**
     * The description of the scope
     */
    description: string;
    /**
     * The display value to be used when rendering the scope
     */
    display: string;
    /**
     * Determines whether the scope is active or not
     */
    isActive: boolean;
    /**
     * Determines whether the scope should be considered the default scope
     * when a scope is not specified in a query
     */
    isDefault: boolean;
}
/**
 * Defines different precision operators that can be automatically added to a `text contains` clause
 * when no precision operators are present.
 *
 * `Default` - no operators are added
 *
 * `ExactExpression` - text surrounded by `"..."`
 *
 * `InTheSamePhrase` - text surrounded by `[...]`
 *
 * `EveryWord` - text surrounded by `+(...)`
 */
export declare type QueryPrecision = "Default" | "ExactExpression" | "InTheSamePhrase" | "EveryWord";
/**
 * Defines strategies that can used in the query search parameters. Each strategy defines a pair of word weight (`ww`) and meaning
 * weight (`mw`) values to be used.
 *
 * `Default` - no `ww` and `mw` parameters used
 *
 * `WordsOnly` - `ww=1;mw=0`
 *
 * `WordsFirst` - `ww=0.8;mw=0.2`
 *
 * `WordsAndMeaning` - `ww=0.6;mw=0.4`
 *
 * `MeaningFirst` - `ww=0.3;mw=0.7`
 *
 * `MeaningOnly` - `ww=0;mw=1`
 */
export declare type QueryStrategy = "Default" | "WordsOnly" | "WordsFirst" | "WordsAndMeaning" | "MeaningFirst" | "MeaningOnly";
/**
 * Defines modes for the spelling correction of search terms and did-you-mean functionality. Corrections
 * are based on edit and phonetic distance and exist among the searched documents
 *
 * `default | classic` - corrections are sought for terms that are not present in any documents. The original terms
 * and corrections are included in the query
 *
 * `smart` - corrections are sought for terms that are present in less than 10 documents and where the correction
 * is 20 times more frequent than the original term. Only the best corrections are kept. The original terms and corrections
 * are included in the query. The [Results.didYouMean]{@link Results#didYouMean] member is populated allowing for a "We included
 * results for these terms..." feedback to be displayed
 *
 * `correct` - corrections are sought for terms that are present in less than 10 documents and where the correction is
 * 20 times more frequent than the original term. Only the best corrections are kept. The original terms that have corrections
 * are not included in the query. The [Results.didYouMean]{@link Results#didYouMean] member is populated allowing for a "Your query
 * has been corrected to..." feedback to be displayed
 *
 * `dymonly` - corrections are sought for terms that are present in less than 10 documents and where the correction is
 * 20 times more frequent than the original term. The actual query is unaffected but the
 * [Results.didYouMean]{@link Results#didYouMean] member will be populated allowing for a "Did you mean..." feedback to be
 * displayed
 *
 * `force` - corrections are sought for all terms. All terms and corrections are included in the query
 *
 * `false` - no spelling correction processing occurs
 */
export declare type SpellingCorrectionMode = "default" | "classic" | "smart" | "correct" | "dymonly" | "force" | "false";
/**
 * Describes the query web service configuration object
 */
export interface CCQuery extends CCWebService {
    /**
     * Defines the number of records or documents to request when executing the query
     */
    pageSize: number;
    /**
     * Defines the aggregations that should be included in the query
     */
    aggregations: CCAggregation[];
    /**
     * Defines configuration information for the columns in the indexes
     */
    columnsInfo: CCColumnsInfo;
    /**
     * Defines the sorting choices that can be used
     */
    sortingChoices: CCSortingChoice[];
    /**
     * Defines the scopes that can be used
     */
    scopes: CCScope[];
    /**
     * Defines whether scopes processing is activated for this query
     */
    scopesActive: boolean;
    /**
     * Defines the spelling correction mode for this query
     */
    sCMode: SpellingCorrectionMode;
    /**
     * Defines the distance to use for the `NEAR` operator when no value is specified
     */
    defaultNearValue: number;
    /**
     * Defines the tab search configuration for this query
     */
    tabSearch: CCTabSearch;
    /**
     * Defines the name of the [CCRFM]{@link CCRFM} configuration for this query
     */
    rFM: string;
    /**
     * Defines the default language to use when parsing the query text
     */
    questionLanguage: string;
    /**
     * Defines the default precision to use for this query
     */
    questionPrecision: QueryPrecision;
    /**
     * Defines the default strategy to use for this query
     */
    questionStrategy: QueryStrategy;
    /**
     * Defines the indexes that the query selects from
     */
    searchIndexes: string;
    /**
     * Determines whether filter-less queries are permitted
     */
    allowEmptySearch: boolean;
    /**
     * Defines the patterns to control which column fields are allowed
     * in fielded search expressions.
     */
    columnFieldsIncluded: string[];
    /**
     * Defines the patterns to control which column fields are disallowed
     * in fielded search expressions.
     */
    columnFieldsExcluded: string[];
    /**
     * The `PatternMatcher` instance created on the client using the `columnFieldsIncluded` and `columnFieldsExcluded` values.
     */
    $columnFieldsPattern: PatternMatcher;
    /**
     * Defines the patterns to control which part name fields are allowed
     * in fielded search expressions.
     */
    partnameFieldsIncluded: string[];
    /**
     * Defines the patterns to control which part name fields are disallowed
     * in fielded search expressions.
     */
    partnameFieldsExcluded: string[];
    /**
     * The `PatternMatcher` instance created on the client using the `partnameFieldsIncluded` and `partnameFieldsExcluded` values.
     */
    $partnameFieldsPattern: PatternMatcher;
}
/**
 * Defines configuration parameters for a column
 */
export interface CCColumnInfo {
    /**
     * The column name
     */
    name: string;
    /**
     * A description of the column
     */
    description: string;
    /**
     * A comma-separated list of aliases for the column
     */
    aliases: string;
    /**
     * A display label for the column
     */
    label: string;
    /**
     * A plural form display label for the column
     */
    labelPlural: string;
    /**
     * The name of a formatter function that produces a formatted string value from the column value. See {@link FormatService}
     */
    formatter: string;
    /**
     * A set of transform functions that are applied to the a formatted string value. See {@link FormatService}
     */
    transforms: string;
    /**
     * The name of a parser function that produces a column value from a formatted string value. See {@link FormatService}
     */
    parser: string;
}
/**
 * Describes a set of `CCColumnInfo` objects
 */
export interface CCColumnsInfo {
    columns: CCColumnInfo[];
}
/**
 * Defines the range of column types for a column
 */
export declare const enum EngineType {
    none = 0,
    bool = 1,
    date = 2,
    dateTime = 3,
    time = 4,
    unsigned = 5,
    integer = 6,
    float = 7,
    double = 8,
    dates = 9,
    dateTimes = 10,
    times = 11,
    varchar = 12,
    binary = 13,
    string = 14,
    csv = 15
}
/**
 * Defines the type modifiers that can be used for a column
 */
export declare const enum EngineTypeModifier {
    none = 0,
    a = 2053,
    c = 4,
    d = 8,
    e = 2068,
    i = 256,
    l = 2052,
    n = 8192,
    t = 524292,
    x = 8388608,
    z = 33554432,
    f_ordinal = 8192,
    f_multidates = 8192,
    f_varchar = 33554432,
    f_binary = 33562624,
    f_string = 33562888,
    f_csv = 42477853,
    f_overridable = 33554696
}
/**
 * Defines the fields for a column configuration object defined in an index. See {@link CCIndex}
 */
export interface CCColumn {
    name: string;
    description?: string;
    type: string;
    typeModifier?: string;
    eType: EngineType;
    eTypeModifier: EngineTypeModifier;
    aliases?: string[];
    label?: string;
    labelPlural?: string;
    formatter?: string;
    transforms?: string;
    parser?: string;
}
/**
 * Enum representing supported export source.
 */
export declare enum ExportSourceType {
    None = 0,
    Result = 1,
    Selection = 2,
    SavedQuery = 4
}
/**
 * Enum representing supported export format.
 */
export declare enum ExportOutputFormat {
    None = 0,
    Csv = 1,
    Xlsx = 2,
    Json = 4
}
/**
 * Data model of the Export dialog.
 */
export interface ExportDialogModel {
    format: ExportOutputFormat;
    export: ExportSourceType;
    webService: string;
    maxCount?: number;
    queryName?: string;
}
/**
 * Describes the fields in the labels web service configuration object
 */
export interface CCLabels extends CCWebService {
    /**
     * The the index column to use for public labels
     */
    publicLabelsField: string;
    /**
     * A semi-colon separated list of predefined public labels
     */
    defaultPublicLabels: string;
    /**
     * Determines whether new public labels can be created by users
     */
    allowPublicLabelsCreation: boolean;
    /**
     * A list of principal ids identifying users and groups that can create public labels
     */
    publicLabelsCreationPrincipalIds: string;
    /**
     * Determines whether existing public labels can be modified by users
     */
    allowPublicLabelsModification: boolean;
    /**
     * A list of principal ids identifying users and groups that can modify existing public labels
     */
    publicLabelsModificationPrincipalIds: string;
    /**
     * The the index column to use for private labels
     */
    privateLabelsField: string;
    /**
     * The maximum number of labels to return when listing labels using the [LabelsWebService.list]{@link LabelsWebService#list} api
     */
    labelsAutoSuggestMaxCount: number;
    /**
     * The wildcard character to recognise when listing labels using the [LabelsWebService.list]{@link LabelsWebService#list} api
     */
    labelsAutoSuggestWildcard: string;
}
/**
 * Describes the fields in the autocomplete web service configuration object
 */
export interface CCAutocomplete extends CCWebService {
    /**
     * Defines whether this autocomplete service is enabled
     */
    enabled: boolean;
    /**
     * Contains a comma-separated list of suggest queries for this service
     */
    suggestQueries: string;
    /**
     * Defines the minimum number of characters that must be entered before presenting
     * suggestions
     */
    inputLengthTrigger: number;
    /**
     * Defines whether suggestions should be grouped into categories when they are displayed
     */
    groupSuggestionsByCategory: boolean;
    /**
     * Defines whether fielded search should be used when processing suggestions
     */
    useFieldedSearch: boolean;
    /**
     * Defines the number of items per category to display when a category is not collapsed
     */
    uncollapsedItemsPerCategory: number;
}
/**
 * Describes the fields in the application configuration object
 */
export interface CCApp extends CCConfig {
    /**
     * Identifies the version of the application configuration. This field can be passed
     * to the [AppWebService.refresh]{@link AppWebService#refresh} api to update the application
     * configuration if the version now available on the server is different.
     */
    versionId: string;
    /**
     * Defines the queries configured on the application
     */
    queries: MapOf<CCQuery>;
    /**
     * Defines the RFM objects configured on the application
     */
    rfms: MapOf<CCRFM>;
    /**
     * Defines the indexes configured on the application
     */
    indexes: MapOf<CCIndex>;
    /**
     * Defines the lists configured on the application
     */
    lists: MapOf<CCList>;
    /**
     * Defines the web services configured on the application
     */
    webServices: MapOf<CCWebService>;
    /**
     * A comma-separated list of the names of the queries configured on the application
     */
    queryNames: string;
    /**
     * The name of the labels web service configured on the application
     */
    labels: string;
    /**
     * The name of the preview web service configured on the application
     */
    preview: string;
    /**
     * The name of the autocomplete web service configured on the application
     */
    autocomplete: string;
    /**
     * The name of the sponsored links web service configured on the application
     */
    sponsoredLinks: string;
    /**
     * The name of the query export web service configured on the application
     */
    queryExport: string;
    /**
     * Determines whether RSS feeds are available on saved queries
     */
    queryRssEnabled: boolean;
    /**
     * Custom JSON configuration (see App Customization tab in Sinequa admin)
     */
    data: JsonObject;
    /**
     * The version of the server API.
     * This field is used to compare with [MINIMUM_COMPATIBLE_SERVER_API_VERSION]{@link MINIMUM_COMPATIBLE_SERVER_API_VERSION}
     */
    apiVersion: string;
    /**
     * The workspace associated with this app
     */
    workspaceApp: string;
    /**
     * The name of the default query
     */
    defaultQueryName: string;
}
/**
 * The minimum server api version that compatible with this version of SBA.
 */
export declare const MINIMUM_COMPATIBLE_SERVER_API_VERSION = "1.0";
//# sourceMappingURL=ccapp.d.ts.map