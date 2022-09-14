import { MapOf } from "@sinequa/core/base";
import { IQuery, Select, Open, SpellingCorrectionMode, AggregationOptions } from "@sinequa/core/web-services";
export declare const advancedFacetPrefix = "advanced_";
/**
 * Represents a query for retrieving search results from a Sinequa search engine.
 *
 * The properties are described in the {@link IQuery} interface
 */
export declare class Query implements IQuery {
    name: string;
    text?: string;
    action: "" | "search" | "open" | "aggregate";
    select?: Select[];
    open?: Open[];
    page?: number;
    pageSize?: number;
    tab?: string;
    scope?: string;
    sort?: string;
    basket?: string;
    isFirstPage?: boolean;
    strictRefine?: boolean;
    globalRelevance?: number;
    questionLanguage?: string;
    questionDefaultLanguage?: string;
    spellingCorrectionMode?: SpellingCorrectionMode;
    spellingCorrectionFilter?: string;
    documentWeight?: string;
    textPartWeights?: string;
    relevanceTransforms?: string;
    removeDuplicates?: boolean;
    queryId?: string;
    aggregations: MapOf<AggregationOptions> | string[];
    orderBy?: string;
    groupBy?: string;
    /**
     * Return a copy of the passed query
     */
    static copy(query: Query): Query;
    constructor(name: string);
    /**
     * Return `true` if the query has fulltext search elements
     */
    get hasRelevance(): boolean;
    /**
     * Add a select filter to the query
     *
     * @param expr The fielded search expression to filter the results
     * @param facet The name of the associated facet
     */
    addSelect(expr: string, facet?: string): number;
    /**
     * Adds a new `Select` object to the end of the query's `selects`
     */
    pushSelect(select: Select): number;
    /**
     * Remove the last `Select` object from the `selects` and return it
     */
    popSelect(): Select | undefined;
    /**
     * Remove the `Select` object identified by `indexOrFacet`
     *
     * @param indexOrFacet either an index in the `selects` array or a facet name
     * @param all If `true` and `indexOrFacet` is a facet name then all `Select` objects with a matching facet name will be removed
     */
    removeSelect(indexOrFacet: number | string, all?: boolean): void;
    /**
     * Replace a `Select` with another
     *
     * @param index The index in the `selects` array of the `Select to replace
     * @param select The `Select` to use as a replacement
     */
    replaceSelect(index: number, select: Select): void;
    /**
     * Find the index of the nth `Select` object matching the passed facet name
     *
     * @param facet A facet name
     * @param ordinal Specifies which `Select` object to retrieve among selects with the same facet name
     */
    findSelectIndex(facet: string, ordinal?: number): number;
    /**
     * Find the first `Select` matching the passed facet name
     *
     * @param facet A facet name
     * @param fromEnd If `true` start searching backwards from the last `Select`
     */
    findSelect(facet: string, fromEnd?: boolean): Select | undefined;
    /**
     * Return the last `Select` object
     */
    lastSelect(): Select | undefined;
    /**
     * Return the number of `Select` objects
     */
    get selectLength(): number;
    /**
     * Add an `Open` filter to the query. This is typically used to load children of tree nodes
     *
     * @param expr The fielded search expression specifying the node to expand
     * @param aggregation The associated aggregation
     */
    addOpen(expr: string, aggregation: string): number;
    /**
     * Clear all fields in the query except the name
     */
    clear(): void;
    /**
     * Remove advanced search select(s) from the query
     */
    toStandard(): Query;
    /**
     * Return a copy of this query
     */
    copy(): Query;
    /**
     * Return a copy of this query but without any advanced select
     */
    copyStandard(): Query;
    /**
     * Remove all properties from the query except advanced search select(s) and optionally `text`
     *
     * @param withText If `true` do not remove the `text` field
     */
    toAdvanced(withText?: boolean): Query;
    /**
     * Return a copy of this query including just the advanced fields and optionally `text`
     *
     * @param withText If `true` include the `text` field
     */
    copyAdvanced(withText?: boolean): Query;
    /**
     * Tests whether this query has advanced search selections
     */
    hasAdvanced(): boolean;
    /**
     * Initialize this query from the passed JSON string
     *
     * @param jquery JSON in string form
     */
    fromJson(jquery: string): Query;
    /**
     * Returns a JSON representation of this query where `Select` and `Open` objects are expressed as tuple arrays for conciseness
     */
    toJsonForQueryString(): string;
    /**
     * Return a hash value of this query that excludes any pagination parameters
     */
    hash(): string;
}
//# sourceMappingURL=query.d.ts.map