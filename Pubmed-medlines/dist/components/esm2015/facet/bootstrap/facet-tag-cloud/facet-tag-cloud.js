import { Component, Input } from "@angular/core";
import { AbstractFacet } from "../../abstract-facet";
import { Action } from "@sinequa/components/action";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "../../facet.service";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/components/utils";
function BsFacetTagCloud_li_1_i_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 4);
} }
function BsFacetTagCloud_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵelementStart(1, "a", 2);
    i0.ɵɵlistener("click", function BsFacetTagCloud_li_1_Template_a_click_1_listener($event) { i0.ɵɵrestoreView(_r4); const data_r1 = ctx.$implicit; const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.filterItem(data_r1, $event); });
    i0.ɵɵtemplate(2, BsFacetTagCloud_li_1_i_2_Template, 1, 0, "i", 3);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqValue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r1 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassMapInterpolate1("sq-metadata-color-", data_r1.aggregation.column, "");
    i0.ɵɵattribute("data-count", data_r1.item.count)("data-weight", ctx_r0.proportionalWeight ? data_r1.weight : null);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", data_r1.item.$filtered);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(4, 7, data_r1.item, data_r1.item.$column), " ");
} }
export class BsFacetTagCloud extends AbstractFacet {
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
BsFacetTagCloud.ɵfac = function BsFacetTagCloud_Factory(t) { return new (t || BsFacetTagCloud)(i0.ɵɵdirectiveInject(i1.FacetService)); };
BsFacetTagCloud.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetTagCloud, selectors: [["sq-facet-tag-cloud"]], inputs: { results: "results", aggregations: "aggregations", limit: "limit", uniformRepartition: "uniformRepartition", showCount: "showCount", proportionalWeight: "proportionalWeight", countThreshold: "countThreshold", shuffleData: "shuffleData", isolateFacetFilters: "isolateFacetFilters" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 2, vars: 2, consts: [[1, "cloud"], [4, "ngFor", "ngForOf"], ["href", "#", 3, "click"], ["class", "far fa-check-circle filtered", 4, "ngIf"], [1, "far", "fa-check-circle", "filtered"]], template: function BsFacetTagCloud_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "ul", 0);
        i0.ɵɵtemplate(1, BsFacetTagCloud_li_1_Template, 5, 10, "li", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵattribute("data-show-count", ctx.showCount ? "" : null);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.tagCloudData);
    } }, directives: [i2.NgForOf, i2.NgIf], pipes: [i3.ValuePipe], styles: ["ul.cloud[_ngcontent-%COMP%]{align-items:center;display:flex;flex-wrap:wrap;justify-content:center;list-style:none;overflow-wrap:anywhere;padding-left:0}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"1\"][_ngcontent-%COMP%]{--size:1}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"2\"][_ngcontent-%COMP%]{--size:2}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"3\"][_ngcontent-%COMP%]{--size:3}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"4\"][_ngcontent-%COMP%]{--size:4}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"5\"][_ngcontent-%COMP%]{--size:5}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"6\"][_ngcontent-%COMP%]{--size:6}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"7\"][_ngcontent-%COMP%]{--size:7}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"8\"][_ngcontent-%COMP%]{--size:8}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"9\"][_ngcontent-%COMP%]{--size:9}ul.cloud[_ngcontent-%COMP%]   a[data-weight=\"10\"][_ngcontent-%COMP%]{--size:10}ul.cloud[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{--color:#a33;--size:2;color:var(--color);display:block;font-size:calc(var(--size)*0.25rem + .5rem);padding:.125rem .25rem;position:relative;text-decoration:none}ul[data-show-count][_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:after{content:\" (\" attr(data-count) \")\";font-size:calc(var(--size)*0.125rem + .5rem)}ul.cloud[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:before{background:rgba(0,0,0,.03);content:\"\";height:100%;left:50%;position:absolute;top:0;transform:translate(-50%);transition:width .25s;width:0}ul.cloud[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus:before, ul.cloud[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover:before{width:100%}.filtered[_ngcontent-%COMP%]{font-size:calc(var(--size)*0.125rem + .5rem)}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsFacetTagCloud, [{
        type: Component,
        args: [{
                selector: "sq-facet-tag-cloud",
                templateUrl: "./facet-tag-cloud.html",
                styleUrls: ["./facet-tag-cloud.scss"],
            }]
    }], function () { return [{ type: i1.FacetService }]; }, { results: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtdGFnLWNsb3VkLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvZmFjZXQvIiwic291cmNlcyI6WyJib290c3RyYXAvZmFjZXQtdGFnLWNsb3VkL2ZhY2V0LXRhZy1jbG91ZC50cyIsImJvb3RzdHJhcC9mYWNldC10YWctY2xvdWQvZmFjZXQtdGFnLWNsb3VkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQU1yRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFcEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7SUNEL0IsdUJBQXdFOzs7O0lBUGhGLDBCQUNJO0lBQUEsNEJBTUk7SUFEQSxpT0FBa0M7SUFDbEMsaUVBQXdFO0lBQ3hFLFlBQ0o7O0lBQUEsaUJBQUk7SUFDUixpQkFBSzs7OztJQUxHLGVBQXFEO0lBQXJELCtFQUFxRDtJQUZyRCxnREFBbUMsa0VBQUE7SUFJTSxlQUF5QjtJQUF6Qiw2Q0FBeUI7SUFDbEUsZUFDSjtJQURJLHlGQUNKOztBRFlSLE1BQU0sT0FBTyxlQUFnQixTQUFRLGFBQWE7SUErQjlDLFlBQW9CLFlBQTBCO1FBQzFDLEtBQUssRUFBRSxDQUFDO1FBRFEsaUJBQVksR0FBWixZQUFZLENBQWM7UUExQjlDLDBEQUEwRDtRQUNqRCxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLDRIQUE0SDtRQUNuSCx1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDcEMsa0RBQWtEO1FBQ3pDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDM0IsNEdBQTRHO1FBQ25HLHVCQUFrQixHQUFHLElBQUksQ0FBQztRQUNuQyxzRkFBc0Y7UUFDN0UsbUJBQWMsR0FBRyxDQUFDLENBQUM7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QzlCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FDL0QsQ0FBQztJQUNkLENBQUM7OzhFQWxUUSxlQUFlO29EQUFmLGVBQWU7UUN0QjVCLDZCQUNJO1FBQUEsK0RBVUs7UUFDVCxpQkFBSzs7UUFaYSw0REFBOEM7UUFDdkMsZUFBZTtRQUFmLDBDQUFlOztrRERxQjNCLGVBQWU7Y0FMM0IsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFdBQVcsRUFBRSx3QkFBd0I7Z0JBQ3JDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO2FBQ3hDOytEQUdZLE9BQU87a0JBQWYsS0FBSztZQUVHLFlBQVk7a0JBQXBCLEtBQUs7WUFFRyxLQUFLO2tCQUFiLEtBQUs7WUFFRyxrQkFBa0I7a0JBQTFCLEtBQUs7WUFFRyxTQUFTO2tCQUFqQixLQUFLO1lBRUcsa0JBQWtCO2tCQUExQixLQUFLO1lBRUcsY0FBYztrQkFBdEIsS0FBSztZQUVHLFdBQVc7a0JBQW5CLEtBQUs7WUFFRyxtQkFBbUI7a0JBQTNCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBTaW1wbGVDaGFuZ2VzLCBPbkNoYW5nZXMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQWJzdHJhY3RGYWNldCB9IGZyb20gXCIuLi8uLi9hYnN0cmFjdC1mYWNldFwiO1xuaW1wb3J0IHtcbiAgICBSZXN1bHRzLFxuICAgIEFnZ3JlZ2F0aW9uSXRlbSxcbiAgICBBZ2dyZWdhdGlvbixcbn0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9hY3Rpb25cIjtcbmltcG9ydCB7IEZhY2V0U2VydmljZSB9IGZyb20gXCIuLi8uLi9mYWNldC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBUYWdDbG91ZEl0ZW0ge1xuICAgIGFnZ3JlZ2F0aW9uOiBBZ2dyZWdhdGlvbjtcbiAgICBpdGVtOiBBZ2dyZWdhdGlvbkl0ZW07XG4gICAgd2VpZ2h0OiBudW1iZXI7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLWZhY2V0LXRhZy1jbG91ZFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vZmFjZXQtdGFnLWNsb3VkLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vZmFjZXQtdGFnLWNsb3VkLnNjc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIEJzRmFjZXRUYWdDbG91ZCBleHRlbmRzIEFic3RyYWN0RmFjZXQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIC8qKiBzZWFyY2ggcmVzdWx0cyAqL1xuICAgIEBJbnB1dCgpIHJlc3VsdHM6IFJlc3VsdHM7XG4gICAgLyoqIGxpc3Qgb2YgYWdncmVnYXRpb25zIHRvIGJlIGNvbnNpZGVyZWQgaW4gY29sbGVjdGluZyB0YWctY2xvdWQgZGF0YSAqL1xuICAgIEBJbnB1dCgpIGFnZ3JlZ2F0aW9uczogc3RyaW5nIHwgc3RyaW5nW107XG4gICAgLyoqIG1heGltdW0gbnVtYmVyIG9mIGRhdGEgdG8gYmUgZGlzcGxheWVkIGluIHRhZy1jbG91ZCAqL1xuICAgIEBJbnB1dCgpIGxpbWl0ID0gNTA7XG4gICAgLyoqIHRoZSB3YXkgZGF0YSBhcmUgY29sbGVjdGVkIGZyb20gZ2l2ZW4gYWdncmVnYXRpb25zOiBlcXVhbCByZXBhcnRpdGlvbiBiZXR3ZWVuIHRoZW0gb3IgbW9zdCByZWxldmFudCBhbW9uZyBhbGwgb2YgdGhlbSAqL1xuICAgIEBJbnB1dCgpIHVuaWZvcm1SZXBhcnRpdGlvbiA9IGZhbHNlO1xuICAgIC8qKiBzaG93L2hpZGUgbnVtYmVyIG9mIG9jY3VycmVuY2VzIG9mIGVhY2ggaXRlbSovXG4gICAgQElucHV0KCkgc2hvd0NvdW50ID0gZmFsc2U7XG4gICAgLyoqIGRlZmluZSB0aGUgc2l6ZSBvZiBlYWNoIGRpc3BsYXllZCBpdGVtOiBjb21tb24gc2l6ZSBmb3IgYWxsIG9yIHByb3BvcnRpb25hbCBzaXplIGJhc2VkIG9uIHRoZWlyIGNvdW50ICovXG4gICAgQElucHV0KCkgcHJvcG9ydGlvbmFsV2VpZ2h0ID0gdHJ1ZTtcbiAgICAvKiogbG93ZXN0IGNvdW50IHVuZGVyIHdoaWNoIGl0ZW1zIHdpbGwgbm90IGJlIHRha2VuIGludG8gYWNjb3VudCBpbiB0YWctY2xvdWQgZGF0YSAqL1xuICAgIEBJbnB1dCgpIGNvdW50VGhyZXNob2xkID0gMDtcbiAgICAvKiogd2V0aGVyIGRhdGEgYXJlIHJlbmRlcmVkIGZvbGxvd2luZyB0aGVpciBjb3VudCBzb3J0aW5nIG9yIHJhbmRvbWx5ICovXG4gICAgQElucHV0KCkgc2h1ZmZsZURhdGEgPSBmYWxzZTtcbiAgICAvKiogSXNvbGF0ZSBmaWx0ZXJpbmcgcmVzdWx0cyBmcm9tIG90aGVyIGZhY2V0cyBhdmFpbGFibGUgaW4gdGhlIGFwcCAqL1xuICAgIEBJbnB1dCgpIGlzb2xhdGVGYWNldEZpbHRlcnMgPSBmYWxzZTtcblxuICAgIGFnZ3JlZ2F0aW9uc0RhdGE6IEFnZ3JlZ2F0aW9uW10gPSBbXTtcbiAgICB0YWdDbG91ZERhdGE6IFRhZ0Nsb3VkSXRlbVtdID0gW107XG4gICAgcHJpdmF0ZSBmaWx0ZXJlZDogQWdncmVnYXRpb25JdGVtW10gPSBbXTtcblxuICAgIC8vIEFjdGlvbnMgZW5hYmxlZCB3aXRoaW4gdGhlIGZhY2V0XG4gICAgcHJpdmF0ZSByZWFkb25seSBjbGVhckZpbHRlcnM6IEFjdGlvbjtcbiAgICAvLyBEZWZhdWx0IHdlaWdodCB0byBiZSBhcHBsaWVkIGlmIHByb3BvcnRpb25hbFdlaWdodCA9IGZhbHNlXG4gICAgcHJpdmF0ZSByZWFkb25seSBkZWZhdWx0V2VpZ2h0ID0gMjtcbiAgICAvLyBQcmVmaXggZm9yIHRhZy1jbG91ZCBmYWNldCBuYW1lIHRvIGJlIHVzZWQgaWYgaXNvbGF0ZUZhY2V0RmlsdGVycyA9IHRydWVcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRhZ0Nsb3VkRmFjZXRQcmVmaXggPSBcInRhZy1jbG91ZF9cIjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZmFjZXRTZXJ2aWNlOiBGYWNldFNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBDbGVhciB0aGUgY3VycmVudCBmaWx0ZXJzXG4gICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJzID0gbmV3IEFjdGlvbih7XG4gICAgICAgICAgICBpY29uOiBcImZhciBmYS1taW51cy1zcXVhcmVcIixcbiAgICAgICAgICAgIHRpdGxlOiBcIm1zZyNmYWNldC5jbGVhclNlbGVjdHNcIixcbiAgICAgICAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc0FycmF5KHRoaXMuYWdncmVnYXRpb25zKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGFnZ3JlZ2F0aW9uIG9mIHRoaXMuYWdncmVnYXRpb25zKSB0aGlzLmZhY2V0U2VydmljZS5jbGVhckZpbHRlcnNTZWFyY2godGhpcy5nZXROYW1lKGFnZ3JlZ2F0aW9uKSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmFjZXRTZXJ2aWNlLmNsZWFyRmlsdGVyc1NlYXJjaCh0aGlzLmdldE5hbWUodGhpcy5hZ2dyZWdhdGlvbnMpLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmICghIWNoYW5nZXNbXCJyZXN1bHRzXCJdKSB7XG4gICAgICAgICAgICAvKiByZXNldCBmaWx0ZXJlZCBpdGVtcyAqL1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJlZCA9IFtdO1xuXG4gICAgICAgICAgICAvKiB1cGRhdGUgdGFnLWNsb3VkIGRhdGEgKi9cbiAgICAgICAgICAgIHRoaXMudGFnQ2xvdWREYXRhID0gdGhpcy5nZXRUYWdDbG91ZERhdGEoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIHRhZy1jbG91ZCBkYXRhIGFjY29yZGluZyB0byBnaXZlbiBpbnB1dHNcbiAgICAgKi9cbiAgICBnZXRUYWdDbG91ZERhdGEoKTogVGFnQ2xvdWRJdGVtW10ge1xuICAgICAgICBjb25zdCBhZ2dyZWdhdGlvbnNEYXRhID0gdGhpcy5nZXRBZ2dyZWdhdGlvbnNEYXRhKCk7XG5cbiAgICAgICAgaWYgKGFnZ3JlZ2F0aW9uc0RhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgdG1wOiBUYWdDbG91ZEl0ZW1bXSA9IFtdO1xuXG4gICAgICAgICAgICBpZiAodGhpcy51bmlmb3JtUmVwYXJ0aXRpb24pIHtcbiAgICAgICAgICAgICAgICBhZ2dyZWdhdGlvbnNEYXRhLmZvckVhY2goKGRhdGE6IEFnZ3JlZ2F0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IE1hdGguZmxvb3IodGhpcy5saW1pdCAvIGFnZ3JlZ2F0aW9uc0RhdGEubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gRmlyc3RseSwgdGFrZSBmaWx0ZXJlZCBpdGVtc1xuICAgICAgICAgICAgICAgICAgICB0bXAucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMhLmZpbHRlcigoaXRlbSkgPT4gaXRlbS4kZmlsdGVyZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGIuY291bnQgLSBhLmNvdW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCBlbmQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGl0ZW06IEFnZ3JlZ2F0aW9uSXRlbSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRpb246IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbTogaXRlbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IHRoaXMucHJvcG9ydGlvbmFsV2VpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gaXRlbS5jb3VudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuZGVmYXVsdFdlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgVGFnQ2xvdWRJdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG1vc3QgcmVsZXZhbnQgaXRlbXMgaWYgdGhyZXNob2xkIG5vdCBhdHRlbnVhdGVkXG4gICAgICAgICAgICAgICAgICAgIGlmICh0bXAubGVuZ3RoIDwgZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5kYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyEuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGl0ZW0pID0+IGl0ZW0uY291bnQgPiB0aGlzLmNvdW50VGhyZXNob2xkICYmICFpdGVtLiRmaWx0ZXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLmNvdW50IC0gYS5jb3VudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDAsIGVuZCAtIHRtcC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaXRlbTogQWdncmVnYXRpb25JdGVtKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IHRoaXMucHJvcG9ydGlvbmFsV2VpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGl0ZW0uY291bnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5kZWZhdWx0V2VpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgVGFnQ2xvdWRJdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdG1wID0gdG1wLnNvcnQoKGEsIGIpID0+IGIuaXRlbS5jb3VudCAtIGEuaXRlbS5jb3VudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFnZ3JlZ2F0aW9uc0RhdGEuZm9yRWFjaCgoZGF0YTogQWdncmVnYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdG1wLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5kYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zIS5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpdGVtKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jb3VudCA+IHRoaXMuY291bnRUaHJlc2hvbGQgfHwgaXRlbS4kZmlsdGVyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGl0ZW06IEFnZ3JlZ2F0aW9uSXRlbSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRpb246IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbTogaXRlbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IHRoaXMucHJvcG9ydGlvbmFsV2VpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gaXRlbS5jb3VudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuZGVmYXVsdFdlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgVGFnQ2xvdWRJdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IHRtcC5maWx0ZXIoKGVsZW0pID0+IGVsZW0uaXRlbS4kZmlsdGVyZWQpO1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGggPCB0aGlzLmxpbWl0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vdEZpbHRlcmVkID0gdG1wXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChlbGVtKSA9PiAhZWxlbS5pdGVtLiRmaWx0ZXJlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLml0ZW0uY291bnQgLSBhLml0ZW0uY291bnQpO1xuICAgICAgICAgICAgICAgICAgICB0bXAgPSBbLi4uZmlsdGVyZWRdO1xuICAgICAgICAgICAgICAgICAgICB0bXAucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm5vdEZpbHRlcmVkLnNsaWNlKDAsIHRoaXMubGltaXQgLSBmaWx0ZXJlZC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gZmlsdGVyZWQuc2xpY2UoMCwgdGhpcy5saW1pdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBCeSBkZWZhdWx0LCBzb3J0IHRoZSB3aG9sZSBhcnJheSB3aXRoIHJlc3BlY3QgdG8gaXRzIGNvdW50cyBhbmQgdXBkYXRlIGl0cyBlbGVtZW50cyB3ZWlnaHQgdmFsdWVcbiAgICAgICAgICAgIHRtcCA9IHRtcFxuICAgICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLml0ZW0uY291bnQgLSBhLml0ZW0uY291bnQpXG4gICAgICAgICAgICAgICAgLm1hcChcbiAgICAgICAgICAgICAgICAgICAgKGVsZW06IFRhZ0Nsb3VkSXRlbSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uZWxlbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IHRoaXMucHJvcG9ydGlvbmFsV2VpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5zY2FsZUl0ZW1XZWlnaHQodG1wLCBlbGVtLml0ZW0uY291bnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5kZWZhdWx0V2VpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBhcyBUYWdDbG91ZEl0ZW0pXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gU2h1ZmZsZSB0aGUgYXJyYXlcbiAgICAgICAgICAgIGlmICh0aGlzLnNodWZmbGVEYXRhKSB7XG4gICAgICAgICAgICAgICAgdG1wID0gdGhpcy5zaHVmZmxlKHRtcCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0bXA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnZva2VkIG9uIGNsaWNrIG9uIGFuIGl0ZW0gaW4gb3JkZXIgdG8gdXBkYXRlIHRoZSBxdWVyeVxuICAgICAqIEBwYXJhbSB0YWdDbG91ZEl0ZW1cbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBmaWx0ZXJJdGVtKHRhZ0Nsb3VkSXRlbTogVGFnQ2xvdWRJdGVtLCBldmVudCkge1xuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKHRhZ0Nsb3VkSXRlbS5hZ2dyZWdhdGlvbi5uYW1lKTtcbiAgICAgICAgY29uc3QgYWdncmVnYXRpb24gPSB0YWdDbG91ZEl0ZW0uYWdncmVnYXRpb247XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0YWdDbG91ZEl0ZW0uaXRlbTtcbiAgICAgICAgaWYgKCF0aGlzLmlzRmlsdGVyZWQoYWdncmVnYXRpb24sIGl0ZW0pKSB7XG4gICAgICAgICAgICB0aGlzLmZhY2V0U2VydmljZS5hZGRGaWx0ZXJTZWFyY2gobmFtZSwgYWdncmVnYXRpb24sIGl0ZW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mYWNldFNlcnZpY2UucmVtb3ZlRmlsdGVyU2VhcmNoKG5hbWUsIGFnZ3JlZ2F0aW9uLCBpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmluZSB0aGUgcG9zc2libGUgYWN0aW9ucyBhY2NvcmRpbmcgdG8gdGhlIGFjdHVhbCBjb250ZXh0XG4gICAgICovXG4gICAgZ2V0IGFjdGlvbnMoKTogQWN0aW9uW10ge1xuICAgICAgICBjb25zdCBhY3Rpb25zOiBBY3Rpb25bXSA9IFtdO1xuICAgICAgICBpZih0aGlzLmlzRmlsdGVyaW5nKCkpIHtcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaCh0aGlzLmNsZWFyRmlsdGVycyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjdGlvbnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFwIHRoZSBpbml0aWFsIGFnZ3JlZ2F0aW9ucyBuYW1lcyB0byBhIGxpc3Qgb2YgQWdncmVnYXRpb25cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0QWdncmVnYXRpb25zRGF0YSgpOiBBZ2dyZWdhdGlvbltdIHtcbiAgICAgICAgcmV0dXJuIFtdXG4gICAgICAgICAgICAuY29uY2F0KHRoaXMuYWdncmVnYXRpb25zIGFzIFtdKVxuICAgICAgICAgICAgLmZpbHRlcigoYWdnOiBzdHJpbmcpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNldFNlcnZpY2UuaGFzRGF0YShhZ2csIHRoaXMucmVzdWx0cylcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAgICAgKGFnZzogc3RyaW5nKSA9PlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhY2V0U2VydmljZS5nZXRBZ2dyZWdhdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0c1xuICAgICAgICAgICAgICAgICAgICApIGFzIEFnZ3JlZ2F0aW9uXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAubWFwKChkYXRhOiBBZ2dyZWdhdGlvbikgPT4gdGhpcy5yZWZyZXNoRmlsdGVyZWQoZGF0YSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhZ2dyZWdhdGlvbidzIGRhdGEgd2l0aCByZXNwZWN0IHRvIGFjdGl2ZSBmaWx0ZXJzIGluIHRoZSBxdWVyeSAmIGJyZWFkY3J1bWJzXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcmVmcmVzaEZpbHRlcmVkKGRhdGE6IEFnZ3JlZ2F0aW9uKTogQWdncmVnYXRpb24ge1xuICAgICAgICBjb25zdCBmYWNldE5hbWUgPSB0aGlzLmdldE5hbWUoZGF0YS5uYW1lKTtcbiAgICAgICAgaWYgKHRoaXMuZmFjZXRTZXJ2aWNlLmhhc0ZpbHRlcmVkKGZhY2V0TmFtZSkpIHtcbiAgICAgICAgICAgIC8vIHJlZnJlc2ggZmlsdGVycyBmcm9tIGJyZWFkY3J1bWJzXG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuZmFjZXRTZXJ2aWNlLmdldEFnZ3JlZ2F0aW9uSXRlbXNGaWx0ZXJlZChmYWNldE5hbWUsIGRhdGEudmFsdWVzQXJlRXhwcmVzc2lvbnMpO1xuICAgICAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0ZpbHRlcmVkKGRhdGEsIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uJGZpbHRlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBkb3VibGUgY2hlY2sgZmlsdGVycyBmcm9tIHF1ZXJ5IGFuZCBicmVhZGNydW1iXG4gICAgICAgICAgICBkYXRhLml0ZW1zIS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5keCA9IHRoaXMuZmFjZXRTZXJ2aWNlLmZpbHRlcmVkSW5kZXgoZGF0YSwgdGhpcy5maWx0ZXJlZCwgaXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmFjZXRTZXJ2aWNlLml0ZW1GaWx0ZXJlZChmYWNldE5hbWUsIGRhdGEsIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uJGZpbHRlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzRmlsdGVyZWQoZGF0YSwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWQucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5keCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc29tZXRpbWUgZmFjZXRTZXJ2aWNlLml0ZW1GaWx0ZXJlZCgpIGNvdWxkIHJldHVybnMgZmFsc2UgYnV0IGl0ZW0gaXMgcHJlc2VudCBpbiBicmVhZGNydW1ic1xuICAgICAgICAgICAgICAgICAgICBpdGVtLiRmaWx0ZXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBmYWNldHMgbmFtZXMgdG8gYmUgdXNlZCBhY2NvcmRpbmcgdG8gQGlucHV0KCkgaXNvbGF0ZUZhY2V0RmlsdGVyc1xuICAgICAqIEBwYXJhbSBhZ2dyZWdhdGlvbk5hbWVcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldE5hbWUoYWdncmVnYXRpb25OYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuaXNvbGF0ZUZhY2V0RmlsdGVycykge1xuICAgICAgICAgICAgcmV0dXJuIGFnZ3JlZ2F0aW9uTmFtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50YWdDbG91ZEZhY2V0UHJlZml4ICsgYWdncmVnYXRpb25OYW1lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpbmVhcmx5IG1hcCB0aGUgb3JpZ2luYWwgd2VpZ2h0IHRvIGEgZGlzY3JldGUgc2NhbGUgZnJvbSAxIHRvIDEwXG4gICAgICogQHBhcmFtIHdlaWdodCBvcmlnaW5hbCB3ZWlnaHRcbiAgICAgKi9cbiAgICBwcml2YXRlIHNjYWxlSXRlbVdlaWdodCh0YWdDbG91ZERhdGE6IFRhZ0Nsb3VkSXRlbVtdLCB3ZWlnaHQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBNYXRoLnJvdW5kKFxuICAgICAgICAgICAgICAgICgod2VpZ2h0IC0gdGFnQ2xvdWREYXRhW3RhZ0Nsb3VkRGF0YS5sZW5ndGggLSAxXS53ZWlnaHQpIC9cbiAgICAgICAgICAgICAgICAgICAgKHRhZ0Nsb3VkRGF0YVswXS53ZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnQ2xvdWREYXRhW3RhZ0Nsb3VkRGF0YS5sZW5ndGggLSAxXS53ZWlnaHQpKSAqXG4gICAgICAgICAgICAgICAgICAgIDkuMFxuICAgICAgICAgICAgKSArIDFcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHN1cHBsaWVkIGl0ZW0gd2l0aGluIHRoZSBnaXZlbiBhZ2dyZWdhdGlvbiBpcyBmaWx0ZXJpbmcgdGhlIHF1ZXJ5XG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcGFyYW0gaXRlbVxuICAgICAqL1xuICAgIHByaXZhdGUgaXNGaWx0ZXJlZChkYXRhOiBBZ2dyZWdhdGlvbiwgaXRlbTogQWdncmVnYXRpb25JdGVtKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZhY2V0U2VydmljZS5maWx0ZXJlZEluZGV4KGRhdGEsIHRoaXMuZmlsdGVyZWQsIGl0ZW0pICE9PSAtMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaHVmZmxlIGl0ZW1zIG9mIHRoZSBzdXBwbGllZCBhcnJheVxuICAgICAqIEBwYXJhbSBhcnJcbiAgICAgKi9cbiAgICBwcml2YXRlIHNodWZmbGUoYXJyOiBUYWdDbG91ZEl0ZW1bXSk6IFRhZ0Nsb3VkSXRlbVtdIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGFyci5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICBjb25zdCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSk7XG4gICAgICAgICAgICBjb25zdCBhdXggPSBhcnJbaV07XG4gICAgICAgICAgICBhcnJbaV0gPSBhcnJbal07XG4gICAgICAgICAgICBhcnJbal0gPSBhdXg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlcmUgaXMgYXQgbGVhc3Qgb25lIGFjdGl2ZSBmaWx0ZXIgaW4gdGhlIHRhZy1jbG91ZCBmYWNldFxuICAgICAqL1xuICAgIHByaXZhdGUgaXNGaWx0ZXJpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBbXVxuICAgICAgICAgICAgICAgIC5jb25jYXQodGhpcy5hZ2dyZWdhdGlvbnMgYXMgW10pXG4gICAgICAgICAgICAgICAgLnNvbWUoKGFnZ3JlZ2F0aW9uTmFtZTogc3RyaW5nKSA9PlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhY2V0U2VydmljZS5oYXNGaWx0ZXJlZCh0aGlzLmdldE5hbWUoYWdncmVnYXRpb25OYW1lKSlcbiAgICAgICAgICAgICAgICApO1xuICAgIH1cbn1cbiIsIjx1bCBjbGFzcz1cImNsb3VkXCIgW2F0dHIuZGF0YS1zaG93LWNvdW50XT1cInNob3dDb3VudCA/ICcnIDogbnVsbFwiPlxuICAgIDxsaSAqbmdGb3I9XCJsZXQgZGF0YSBvZiB0YWdDbG91ZERhdGFcIj5cbiAgICAgICAgPGFcbiAgICAgICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtY291bnRdPVwiZGF0YS5pdGVtLmNvdW50XCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtd2VpZ2h0XT1cInByb3BvcnRpb25hbFdlaWdodCA/IGRhdGEud2VpZ2h0IDogbnVsbFwiXG4gICAgICAgICAgICBjbGFzcz1cInNxLW1ldGFkYXRhLWNvbG9yLXt7ZGF0YS5hZ2dyZWdhdGlvbi5jb2x1bW59fVwiXG4gICAgICAgICAgICAoY2xpY2spPVwiZmlsdGVySXRlbShkYXRhLCAkZXZlbnQpXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhciBmYS1jaGVjay1jaXJjbGUgZmlsdGVyZWRcIiAqbmdJZj1cImRhdGEuaXRlbS4kZmlsdGVyZWRcIj48L2k+XG4gICAgICAgICAgICB7e2RhdGEuaXRlbSB8IHNxVmFsdWU6ZGF0YS5pdGVtLiRjb2x1bW59fVxuICAgICAgICA8L2E+XG4gICAgPC9saT5cbjwvdWw+XG4iXX0=