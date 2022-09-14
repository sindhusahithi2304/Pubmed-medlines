import { Utils } from "@sinequa/core/base";
export const advancedFacetPrefix = "advanced_";
/**
 * Represents a query for retrieving search results from a Sinequa search engine.
 *
 * The properties are described in the {@link IQuery} interface
 */
export class Query {
    constructor(name) {
        this.name = name;
    }
    /**
     * Return a copy of the passed query
     */
    static copy(query) {
        if (!query) {
            return query;
        }
        return query.copy();
    }
    /**
     * Return `true` if the query has fulltext search elements
     */
    get hasRelevance() {
        if (!Utils.isEmpty(this.text)) {
            return true;
        }
        if (this.findSelect("refine")) {
            return true;
        }
        return false;
    }
    /**
     * Add a select filter to the query
     *
     * @param expr The fielded search expression to filter the results
     * @param facet The name of the associated facet
     */
    addSelect(expr, facet) {
        return this.pushSelect({
            expression: expr,
            facet: facet || ""
        });
    }
    /**
     * Adds a new `Select` object to the end of the query's `selects`
     */
    pushSelect(select) {
        if (!this.select) {
            this.select = [];
        }
        return this.select.push(select);
    }
    /**
     * Remove the last `Select` object from the `selects` and return it
     */
    popSelect() {
        if (!this.select) {
            return undefined;
        }
        return this.select.pop();
    }
    /**
     * Remove the `Select` object identified by `indexOrFacet`
     *
     * @param indexOrFacet either an index in the `selects` array or a facet name
     * @param all If `true` and `indexOrFacet` is a facet name then all `Select` objects with a matching facet name will be removed
     */
    removeSelect(indexOrFacet, all = false) {
        if (!this.select) {
            return;
        }
        if (Utils.isString(indexOrFacet)) {
            // indexOrFacet is a facet name
            for (let i = this.select.length - 1; i >= 0; i--) {
                const _select = this.select[i];
                if (Utils.eqNC(_select.facet, indexOrFacet)) {
                    this.select.splice(i, 1);
                    if (this.select.length === 0) {
                        delete this.select; // Clean the query if no more select
                        return;
                    }
                    if (!all) {
                        return;
                    }
                }
            }
        }
        else {
            if (indexOrFacet < 0 || indexOrFacet >= this.select.length) {
                return;
            }
            this.select.splice(indexOrFacet, 1);
            if (this.select.length === 0) {
                delete this.select;
            }
        }
    }
    /**
     * Replace a `Select` with another
     *
     * @param index The index in the `selects` array of the `Select to replace
     * @param select The `Select` to use as a replacement
     */
    replaceSelect(index, select) {
        if (!this.select) {
            return;
        }
        this.select.splice(index, 1, select);
    }
    /**
     * Find the index of the nth `Select` object matching the passed facet name
     *
     * @param facet A facet name
     * @param ordinal Specifies which `Select` object to retrieve among selects with the same facet name
     */
    findSelectIndex(facet, ordinal = 0) {
        if (!this.select) {
            return -1;
        }
        let index = 0;
        let facetOrdinal = 0;
        let facetIndex = -1;
        for (const select of this.select) {
            if (Utils.eqNC(facet, select.facet)) {
                facetIndex = index;
                if (facetOrdinal === ordinal) {
                    break;
                }
                facetOrdinal++;
            }
            index++;
        }
        return facetIndex;
    }
    /**
     * Find the first `Select` matching the passed facet name
     *
     * @param facet A facet name
     * @param fromEnd If `true` start searching backwards from the last `Select`
     */
    findSelect(facet, fromEnd = true) {
        const facetSelectIndex = this.findSelectIndex(facet, fromEnd ? -1 : 0);
        return facetSelectIndex >= 0 ? this.select && this.select[facetSelectIndex] : undefined;
    }
    /**
     * Return the last `Select` object
     */
    lastSelect() {
        if (!this.select) {
            return undefined;
        }
        return this.select[this.select.length - 1];
    }
    /**
     * Return the number of `Select` objects
     */
    get selectLength() {
        if (!this.select) {
            return 0;
        }
        return this.select.length;
    }
    /**
     * Add an `Open` filter to the query. This is typically used to load children of tree nodes
     *
     * @param expr The fielded search expression specifying the node to expand
     * @param aggregation The associated aggregation
     */
    addOpen(expr, aggregation) {
        if (!this.open || !Utils.isArray(this.open)) {
            this.open = [];
        }
        return this.open.push({
            expression: expr,
            aggregation
        });
    }
    /**
     * Clear all fields in the query except the name
     */
    clear() {
        const name = this.name;
        Utils.clearObject(this);
        this.name = name;
    }
    /**
     * Remove advanced search select(s) from the query
     */
    toStandard() {
        var _a;
        const advancedSelect = (_a = this.select) === null || _a === void 0 ? void 0 : _a.filter((select) => select.facet && select.facet.startsWith(advancedFacetPrefix));
        advancedSelect === null || advancedSelect === void 0 ? void 0 : advancedSelect.forEach((select) => this.removeSelect(select.facet, true));
        return this;
    }
    /**
     * Return a copy of this query
     */
    copy() {
        const query = new Query(this.name);
        Utils.copy(this, query);
        return query;
    }
    /**
     * Return a copy of this query but without any advanced select
     */
    copyStandard() {
        const query = this.copy();
        return query.toStandard();
    }
    /**
     * Remove all properties from the query except advanced search select(s) and optionally `text`
     *
     * @param withText If `true` do not remove the `text` field
     */
    toAdvanced(withText = false) {
        var _a;
        for (const property in this) {
            if (this.hasOwnProperty(property) && !Utils.eqNC(property, "select") && (!withText || !Utils.eqNC(property, "text"))) {
                delete this[property];
            }
        }
        const notAdvancedSelect = (_a = this.select) === null || _a === void 0 ? void 0 : _a.filter((select) => select.facet && !select.facet.startsWith(advancedFacetPrefix));
        notAdvancedSelect === null || notAdvancedSelect === void 0 ? void 0 : notAdvancedSelect.forEach((select) => this.removeSelect(select.facet));
        return this;
    }
    /**
     * Return a copy of this query including just the advanced fields and optionally `text`
     *
     * @param withText If `true` include the `text` field
     */
    copyAdvanced(withText = false) {
        const query = this.copy();
        return query.toAdvanced(withText);
    }
    /**
     * Tests whether this query has advanced search selections
     */
    hasAdvanced() {
        var _a;
        return !!((_a = this.select) === null || _a === void 0 ? void 0 : _a.find(s => s.facet && s.facet.startsWith(advancedFacetPrefix)));
    }
    /**
     * Initialize this query from the passed JSON string
     *
     * @param jquery JSON in string form
     */
    fromJson(jquery) {
        this.clear();
        const query = Utils.fromJson(jquery);
        // convert select and open
        const select = query.select;
        if (Utils.isArray(select)) {
            query.select = select.map((value) => {
                if (Utils.isArray(value)) {
                    return {
                        expression: value[0],
                        facet: value[1]
                    };
                }
                else {
                    return value;
                }
            });
        }
        const open = query.open;
        if (Utils.isArray(open)) {
            query.open = open.map((value) => {
                if (Utils.isArray(value)) {
                    return {
                        expression: value[0],
                        aggregation: value[1]
                    };
                }
                else {
                    return value;
                }
            });
        }
        Utils.extend(this, query);
        return this;
    }
    /**
     * Returns a JSON representation of this query where `Select` and `Open` objects are expressed as tuple arrays for conciseness
     */
    toJsonForQueryString() {
        const o = {};
        Utils.merge(o, this);
        if (this.select) {
            o.select = this.select.map((value) => {
                const a = [value.expression];
                if (value.facet) {
                    a.push(value.facet);
                }
                return a;
            });
        }
        if (this.open) {
            o.open = this.open.map((value) => [value.expression, value.aggregation]);
        }
        return Utils.toJson(o);
    }
    /**
     * Return a hash value of this query that excludes any pagination parameters
     */
    hash() {
        const obj = {};
        Utils.mergeAndSort(obj, this);
        // remove pagination
        delete obj.page;
        delete obj.pageSize;
        const str = Utils.toJson(obj);
        return Utils.sha512(str);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9hcHAtdXRpbHMvIiwic291cmNlcyI6WyJxdWVyeS9xdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsS0FBSyxFQUFRLE1BQU0sb0JBQW9CLENBQUM7QUFJaEQsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsV0FBVyxDQUFDO0FBRS9DOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8sS0FBSztJQXFDZCxZQUNXLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO0lBQ3ZCLENBQUM7SUFaRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBWTtRQUNwQixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBTUQ7O09BRUc7SUFDSCxJQUFJLFlBQVk7UUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0IsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsU0FBUyxDQUFDLElBQVksRUFBRSxLQUFjO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNuQixVQUFVLEVBQUUsSUFBSTtZQUNoQixLQUFLLEVBQUUsS0FBSyxJQUFJLEVBQUU7U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVSxDQUFDLE1BQWM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxH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WUFDYixDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFXLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQzNDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7b0JBQ2IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3ZCO2dCQUNELE9BQU8sQ0FBQyxDQUFDO1lBQ2IsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUNELElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztTQUN0RjtRQUNELE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJO1FBQ0EsTUFBTSxHQUFHLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlCLG9CQUFvQjtRQUNwQixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDaEIsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQ3BCLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VXRpbHMsIE1hcE9mfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge0lRdWVyeSwgU2VsZWN0LCBPcGVuLCBTcGVsbGluZ0NvcnJlY3Rpb25Nb2RlLCBBZ2dyZWdhdGlvbk9wdGlvbnN9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuXG5cbmV4cG9ydCBjb25zdCBhZHZhbmNlZEZhY2V0UHJlZml4ID0gXCJhZHZhbmNlZF9cIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcXVlcnkgZm9yIHJldHJpZXZpbmcgc2VhcmNoIHJlc3VsdHMgZnJvbSBhIFNpbmVxdWEgc2VhcmNoIGVuZ2luZS5cbiAqXG4gKiBUaGUgcHJvcGVydGllcyBhcmUgZGVzY3JpYmVkIGluIHRoZSB7QGxpbmsgSVF1ZXJ5fSBpbnRlcmZhY2VcbiAqL1xuZXhwb3J0IGNsYXNzIFF1ZXJ5IGltcGxlbWVudHMgSVF1ZXJ5IHtcbiAgICB0ZXh0Pzogc3RyaW5nO1xuICAgIGFjdGlvbjogXCJcIiB8IFwic2VhcmNoXCIgfCBcIm9wZW5cIiB8IFwiYWdncmVnYXRlXCI7XG4gICAgc2VsZWN0PzogU2VsZWN0W107XG4gICAgb3Blbj86IE9wZW5bXTtcbiAgICBwYWdlPzogbnVtYmVyO1xuICAgIHBhZ2VTaXplPzogbnVtYmVyO1xuICAgIHRhYj86IHN0cmluZztcbiAgICBzY29wZT86IHN0cmluZztcbiAgICBzb3J0Pzogc3RyaW5nO1xuICAgIGJhc2tldD86IHN0cmluZztcbiAgICBpc0ZpcnN0UGFnZT86IGJvb2xlYW47XG4gICAgc3RyaWN0UmVmaW5lPzogYm9vbGVhbjtcbiAgICBnbG9iYWxSZWxldmFuY2U/OiBudW1iZXI7XG4gICAgcXVlc3Rpb25MYW5ndWFnZT86IHN0cmluZztcbiAgICBxdWVzdGlvbkRlZmF1bHRMYW5ndWFnZT86IHN0cmluZztcbiAgICBzcGVsbGluZ0NvcnJlY3Rpb25Nb2RlPzogU3BlbGxpbmdDb3JyZWN0aW9uTW9kZTtcbiAgICBzcGVsbGluZ0NvcnJlY3Rpb25GaWx0ZXI/OiBzdHJpbmc7XG4gICAgZG9jdW1lbnRXZWlnaHQ/OiBzdHJpbmc7XG4gICAgdGV4dFBhcnRXZWlnaHRzPzogc3RyaW5nO1xuICAgIHJlbGV2YW5jZVRyYW5zZm9ybXM/OiBzdHJpbmc7XG4gICAgcmVtb3ZlRHVwbGljYXRlcz86IGJvb2xlYW47XG4gICAgcXVlcnlJZD86IHN0cmluZztcbiAgICBhZ2dyZWdhdGlvbnM6IE1hcE9mPEFnZ3JlZ2F0aW9uT3B0aW9ucz4gfCBzdHJpbmdbXTtcbiAgICBvcmRlckJ5Pzogc3RyaW5nO1xuICAgIGdyb3VwQnk/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBjb3B5IG9mIHRoZSBwYXNzZWQgcXVlcnlcbiAgICAgKi9cbiAgICBzdGF0aWMgY29weShxdWVyeTogUXVlcnkpOiBRdWVyeSB7XG4gICAgICAgIGlmICghcXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiBxdWVyeTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcXVlcnkuY29weSgpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgbmFtZTogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGB0cnVlYCBpZiB0aGUgcXVlcnkgaGFzIGZ1bGx0ZXh0IHNlYXJjaCBlbGVtZW50c1xuICAgICAqL1xuICAgIGdldCBoYXNSZWxldmFuY2UoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghVXRpbHMuaXNFbXB0eSh0aGlzLnRleHQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5maW5kU2VsZWN0KFwicmVmaW5lXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgc2VsZWN0IGZpbHRlciB0byB0aGUgcXVlcnlcbiAgICAgKlxuICAgICAqIEBwYXJhbSBleHByIFRoZSBmaWVsZGVkIHNlYXJjaCBleHByZXNzaW9uIHRvIGZpbHRlciB0aGUgcmVzdWx0c1xuICAgICAqIEBwYXJhbSBmYWNldCBUaGUgbmFtZSBvZiB0aGUgYXNzb2NpYXRlZCBmYWNldFxuICAgICAqL1xuICAgIGFkZFNlbGVjdChleHByOiBzdHJpbmcsIGZhY2V0Pzogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHVzaFNlbGVjdCh7XG4gICAgICAgICAgICBleHByZXNzaW9uOiBleHByLFxuICAgICAgICAgICAgZmFjZXQ6IGZhY2V0IHx8IFwiXCJcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIG5ldyBgU2VsZWN0YCBvYmplY3QgdG8gdGhlIGVuZCBvZiB0aGUgcXVlcnkncyBgc2VsZWN0c2BcbiAgICAgKi9cbiAgICBwdXNoU2VsZWN0KHNlbGVjdDogU2VsZWN0KTogbnVtYmVyIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3QgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3QucHVzaChzZWxlY3QpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSB0aGUgbGFzdCBgU2VsZWN0YCBvYmplY3QgZnJvbSB0aGUgYHNlbGVjdHNgIGFuZCByZXR1cm4gaXRcbiAgICAgKi9cbiAgICBwb3BTZWxlY3QoKTogU2VsZWN0IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3QucG9wKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHRoZSBgU2VsZWN0YCBvYmplY3QgaWRlbnRpZmllZCBieSBgaW5kZXhPckZhY2V0YFxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4T3JGYWNldCBlaXRoZXIgYW4gaW5kZXggaW4gdGhlIGBzZWxlY3RzYCBhcnJheSBvciBhIGZhY2V0IG5hbWVcbiAgICAgKiBAcGFyYW0gYWxsIElmIGB0cnVlYCBhbmQgYGluZGV4T3JGYWNldGAgaXMgYSBmYWNldCBuYW1lIHRoZW4gYWxsIGBTZWxlY3RgIG9iamVjdHMgd2l0aCBhIG1hdGNoaW5nIGZhY2V0IG5hbWUgd2lsbCBiZSByZW1vdmVkXG4gICAgICovXG4gICAgcmVtb3ZlU2VsZWN0KGluZGV4T3JGYWNldDogbnVtYmVyIHwgc3RyaW5nLCBhbGwgPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKGluZGV4T3JGYWNldCkpIHtcbiAgICAgICAgICAgIC8vIGluZGV4T3JGYWNldCBpcyBhIGZhY2V0IG5hbWVcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnNlbGVjdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IF9zZWxlY3QgPSB0aGlzLnNlbGVjdFtpXTtcbiAgICAgICAgICAgICAgICBpZiAoVXRpbHMuZXFOQyhfc2VsZWN0LmZhY2V0LCBpbmRleE9yRmFjZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2VsZWN0OyAvLyBDbGVhbiB0aGUgcXVlcnkgaWYgbm8gbW9yZSBzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGluZGV4T3JGYWNldCA8IDAgfHwgaW5kZXhPckZhY2V0ID49IHRoaXMuc2VsZWN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0LnNwbGljZShpbmRleE9yRmFjZXQsIDEpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNlbGVjdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcGxhY2UgYSBgU2VsZWN0YCB3aXRoIGFub3RoZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggaW4gdGhlIGBzZWxlY3RzYCBhcnJheSBvZiB0aGUgYFNlbGVjdCB0byByZXBsYWNlXG4gICAgICogQHBhcmFtIHNlbGVjdCBUaGUgYFNlbGVjdGAgdG8gdXNlIGFzIGEgcmVwbGFjZW1lbnRcbiAgICAgKi9cbiAgICByZXBsYWNlU2VsZWN0KGluZGV4OiBudW1iZXIsIHNlbGVjdDogU2VsZWN0KSB7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGVjdC5zcGxpY2UoaW5kZXgsIDEsIHNlbGVjdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZCB0aGUgaW5kZXggb2YgdGhlIG50aCBgU2VsZWN0YCBvYmplY3QgbWF0Y2hpbmcgdGhlIHBhc3NlZCBmYWNldCBuYW1lXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZmFjZXQgQSBmYWNldCBuYW1lXG4gICAgICogQHBhcmFtIG9yZGluYWwgU3BlY2lmaWVzIHdoaWNoIGBTZWxlY3RgIG9iamVjdCB0byByZXRyaWV2ZSBhbW9uZyBzZWxlY3RzIHdpdGggdGhlIHNhbWUgZmFjZXQgbmFtZVxuICAgICAqL1xuICAgIGZpbmRTZWxlY3RJbmRleChmYWNldDogc3RyaW5nLCBvcmRpbmFsID0gMCk6IG51bWJlciB7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3QpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBsZXQgZmFjZXRPcmRpbmFsID0gMDtcbiAgICAgICAgbGV0IGZhY2V0SW5kZXggPSAtMTtcbiAgICAgICAgZm9yIChjb25zdCBzZWxlY3Qgb2YgdGhpcy5zZWxlY3QpIHtcbiAgICAgICAgICAgIGlmIChVdGlscy5lcU5DKGZhY2V0LCBzZWxlY3QuZmFjZXQpKSB7XG4gICAgICAgICAgICAgICAgZmFjZXRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgIGlmIChmYWNldE9yZGluYWwgPT09IG9yZGluYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZhY2V0T3JkaW5hbCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFjZXRJbmRleDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kIHRoZSBmaXJzdCBgU2VsZWN0YCBtYXRjaGluZyB0aGUgcGFzc2VkIGZhY2V0IG5hbWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSBmYWNldCBBIGZhY2V0IG5hbWVcbiAgICAgKiBAcGFyYW0gZnJvbUVuZCBJZiBgdHJ1ZWAgc3RhcnQgc2VhcmNoaW5nIGJhY2t3YXJkcyBmcm9tIHRoZSBsYXN0IGBTZWxlY3RgXG4gICAgICovXG4gICAgZmluZFNlbGVjdChmYWNldDogc3RyaW5nLCBmcm9tRW5kID0gdHJ1ZSk6IFNlbGVjdCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGNvbnN0IGZhY2V0U2VsZWN0SW5kZXggPSB0aGlzLmZpbmRTZWxlY3RJbmRleChmYWNldCwgZnJvbUVuZCA/IC0xIDogMCk7XG4gICAgICAgIHJldHVybiBmYWNldFNlbGVjdEluZGV4ID49IDAgPyB0aGlzLnNlbGVjdCAmJiB0aGlzLnNlbGVjdFtmYWNldFNlbGVjdEluZGV4XSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGxhc3QgYFNlbGVjdGAgb2JqZWN0XG4gICAgICovXG4gICAgbGFzdFNlbGVjdCgpOiBTZWxlY3QgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdFt0aGlzLnNlbGVjdC5sZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIG51bWJlciBvZiBgU2VsZWN0YCBvYmplY3RzXG4gICAgICovXG4gICAgZ2V0IHNlbGVjdExlbmd0aCgpOiBudW1iZXIge1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3QubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhbiBgT3BlbmAgZmlsdGVyIHRvIHRoZSBxdWVyeS4gVGhpcyBpcyB0eXBpY2FsbHkgdXNlZCB0byBsb2FkIGNoaWxkcmVuIG9mIHRyZWUgbm9kZXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBleHByIFRoZSBmaWVsZGVkIHNlYXJjaCBleHByZXNzaW9uIHNwZWNpZnlpbmcgdGhlIG5vZGUgdG8gZXhwYW5kXG4gICAgICogQHBhcmFtIGFnZ3JlZ2F0aW9uIFRoZSBhc3NvY2lhdGVkIGFnZ3JlZ2F0aW9uXG4gICAgICovXG4gICAgYWRkT3BlbihleHByOiBzdHJpbmcsIGFnZ3JlZ2F0aW9uOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wZW4gfHwgIVV0aWxzLmlzQXJyYXkodGhpcy5vcGVuKSkge1xuICAgICAgICAgICAgdGhpcy5vcGVuID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMub3Blbi5wdXNoKHtcbiAgICAgICAgICAgIGV4cHJlc3Npb246IGV4cHIsXG4gICAgICAgICAgICBhZ2dyZWdhdGlvblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhciBhbGwgZmllbGRzIGluIHRoZSBxdWVyeSBleGNlcHQgdGhlIG5hbWVcbiAgICAgKi9cbiAgICBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMubmFtZTtcbiAgICAgICAgVXRpbHMuY2xlYXJPYmplY3QodGhpcyk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFkdmFuY2VkIHNlYXJjaCBzZWxlY3QocykgZnJvbSB0aGUgcXVlcnlcbiAgICAgKi9cbiAgICB0b1N0YW5kYXJkKCk6IFF1ZXJ5IHtcbiAgICAgICAgY29uc3QgYWR2YW5jZWRTZWxlY3QgPSB0aGlzLnNlbGVjdD8uZmlsdGVyKFxuICAgICAgICAgIChzZWxlY3Q6IFNlbGVjdCkgPT4gc2VsZWN0LmZhY2V0ICYmIHNlbGVjdC5mYWNldC5zdGFydHNXaXRoKGFkdmFuY2VkRmFjZXRQcmVmaXgpXG4gICAgICAgIClcbiAgICAgICAgYWR2YW5jZWRTZWxlY3Q/LmZvckVhY2goXG4gICAgICAgICAgKHNlbGVjdCkgPT4gdGhpcy5yZW1vdmVTZWxlY3Qoc2VsZWN0LmZhY2V0LCB0cnVlKVxuICAgICAgICApXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGNvcHkgb2YgdGhpcyBxdWVyeVxuICAgICAqL1xuICAgIGNvcHkoKTogUXVlcnkge1xuICAgICAgICBjb25zdCBxdWVyeSA9IG5ldyBRdWVyeSh0aGlzLm5hbWUpO1xuICAgICAgICBVdGlscy5jb3B5KHRoaXMsIHF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGNvcHkgb2YgdGhpcyBxdWVyeSBidXQgd2l0aG91dCBhbnkgYWR2YW5jZWQgc2VsZWN0XG4gICAgICovXG4gICAgY29weVN0YW5kYXJkKCk6IFF1ZXJ5IHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLmNvcHkoKTtcbiAgICAgICAgcmV0dXJuIHF1ZXJ5LnRvU3RhbmRhcmQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIHByb3BlcnRpZXMgZnJvbSB0aGUgcXVlcnkgZXhjZXB0IGFkdmFuY2VkIHNlYXJjaCBzZWxlY3QocykgYW5kIG9wdGlvbmFsbHkgYHRleHRgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2l0aFRleHQgSWYgYHRydWVgIGRvIG5vdCByZW1vdmUgdGhlIGB0ZXh0YCBmaWVsZFxuICAgICAqL1xuICAgIHRvQWR2YW5jZWQod2l0aFRleHQ6IGJvb2xlYW4gPSBmYWxzZSk6IFF1ZXJ5IHtcbiAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiB0aGlzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkgJiYgIVV0aWxzLmVxTkMocHJvcGVydHksIFwic2VsZWN0XCIpICYmICghd2l0aFRleHQgfHwgIVV0aWxzLmVxTkMocHJvcGVydHksIFwidGV4dFwiKSkpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpc1twcm9wZXJ0eV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm90QWR2YW5jZWRTZWxlY3QgPSB0aGlzLnNlbGVjdD8uZmlsdGVyKFxuICAgICAgICAgIChzZWxlY3Q6IFNlbGVjdCkgPT4gc2VsZWN0LmZhY2V0ICYmICFzZWxlY3QuZmFjZXQuc3RhcnRzV2l0aChhZHZhbmNlZEZhY2V0UHJlZml4KVxuICAgICAgICApXG4gICAgICAgIG5vdEFkdmFuY2VkU2VsZWN0Py5mb3JFYWNoKFxuICAgICAgICAgIChzZWxlY3QpID0+IHRoaXMucmVtb3ZlU2VsZWN0KHNlbGVjdC5mYWNldClcbiAgICAgICAgKVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBjb3B5IG9mIHRoaXMgcXVlcnkgaW5jbHVkaW5nIGp1c3QgdGhlIGFkdmFuY2VkIGZpZWxkcyBhbmQgb3B0aW9uYWxseSBgdGV4dGBcbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aXRoVGV4dCBJZiBgdHJ1ZWAgaW5jbHVkZSB0aGUgYHRleHRgIGZpZWxkXG4gICAgICovXG4gICAgY29weUFkdmFuY2VkKHdpdGhUZXh0OiBib29sZWFuID0gZmFsc2UpOiBRdWVyeSB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5jb3B5KCk7XG4gICAgICAgIHJldHVybiBxdWVyeS50b0FkdmFuY2VkKHdpdGhUZXh0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUZXN0cyB3aGV0aGVyIHRoaXMgcXVlcnkgaGFzIGFkdmFuY2VkIHNlYXJjaCBzZWxlY3Rpb25zXG4gICAgICovXG4gICAgaGFzQWR2YW5jZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuc2VsZWN0Py5maW5kKHMgPT4gcy5mYWNldCAmJiBzLmZhY2V0LnN0YXJ0c1dpdGgoYWR2YW5jZWRGYWNldFByZWZpeCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhpcyBxdWVyeSBmcm9tIHRoZSBwYXNzZWQgSlNPTiBzdHJpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSBqcXVlcnkgSlNPTiBpbiBzdHJpbmcgZm9ybVxuICAgICAqL1xuICAgIGZyb21Kc29uKGpxdWVyeTogc3RyaW5nKTogUXVlcnkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gVXRpbHMuZnJvbUpzb24oanF1ZXJ5KTtcbiAgICAgICAgLy8gY29udmVydCBzZWxlY3QgYW5kIG9wZW5cbiAgICAgICAgY29uc3Qgc2VsZWN0ID0gcXVlcnkuc2VsZWN0O1xuICAgICAgICBpZiAoVXRpbHMuaXNBcnJheShzZWxlY3QpKSB7XG4gICAgICAgICAgICBxdWVyeS5zZWxlY3QgPSBzZWxlY3QubWFwPFNlbGVjdD4oKHZhbHVlOiBTZWxlY3QgfCBzdHJpbmdbXSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogdmFsdWVbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWNldDogdmFsdWVbMV1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcGVuID0gcXVlcnkub3BlbjtcbiAgICAgICAgaWYgKFV0aWxzLmlzQXJyYXkob3BlbikpIHtcbiAgICAgICAgICAgIHF1ZXJ5Lm9wZW4gPSBvcGVuLm1hcDxPcGVuPigodmFsdWU6IE9wZW4gfCBzdHJpbmdbXSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogdmFsdWVbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGlvbjogdmFsdWVbMV1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBVdGlscy5leHRlbmQodGhpcywgcXVlcnkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGlzIHF1ZXJ5IHdoZXJlIGBTZWxlY3RgIGFuZCBgT3BlbmAgb2JqZWN0cyBhcmUgZXhwcmVzc2VkIGFzIHR1cGxlIGFycmF5cyBmb3IgY29uY2lzZW5lc3NcbiAgICAgKi9cbiAgICB0b0pzb25Gb3JRdWVyeVN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBvOiBhbnkgPSB7fTtcbiAgICAgICAgVXRpbHMubWVyZ2UobywgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdCkge1xuICAgICAgICAgICAgby5zZWxlY3QgPSB0aGlzLnNlbGVjdC5tYXA8c3RyaW5nW10+KCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGEgPSBbdmFsdWUuZXhwcmVzc2lvbl07XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmZhY2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGEucHVzaCh2YWx1ZS5mYWNldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3Blbikge1xuICAgICAgICAgICAgby5vcGVuID0gdGhpcy5vcGVuLm1hcDxzdHJpbmdbXT4oKHZhbHVlKSA9PiBbdmFsdWUuZXhwcmVzc2lvbiwgdmFsdWUuYWdncmVnYXRpb25dKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gVXRpbHMudG9Kc29uKG8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGhhc2ggdmFsdWUgb2YgdGhpcyBxdWVyeSB0aGF0IGV4Y2x1ZGVzIGFueSBwYWdpbmF0aW9uIHBhcmFtZXRlcnNcbiAgICAgKi9cbiAgICBoYXNoKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IG9iajogYW55ID0ge307XG4gICAgICAgIFV0aWxzLm1lcmdlQW5kU29ydChvYmosIHRoaXMpO1xuICAgICAgICAvLyByZW1vdmUgcGFnaW5hdGlvblxuICAgICAgICBkZWxldGUgb2JqLnBhZ2U7XG4gICAgICAgIGRlbGV0ZSBvYmoucGFnZVNpemU7XG4gICAgICAgIGNvbnN0IHN0ciA9IFV0aWxzLnRvSnNvbihvYmopO1xuICAgICAgICByZXR1cm4gVXRpbHMuc2hhNTEyKHN0cik7XG4gICAgfVxufVxuIl19