import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "../../facet.service";
import * as i2 from "@angular/common";
import * as i3 from "../facet-card/facet-card";
import * as i4 from "../facet-list/facet-list";
import * as i5 from "../facet-tree/facet-tree";
function BsFacetBar_ng_container_3_sq_facet_list_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "sq-facet-list", 5, 6);
} if (rf & 2) {
    const f_r1 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("name", f_r1.name)("results", ctx_r2.results)("aggregation", f_r1.aggregations);
} }
function BsFacetBar_ng_container_3_sq_facet_tree_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "sq-facet-tree", 5, 6);
} if (rf & 2) {
    const f_r1 = i0.ɵɵnextContext().$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("name", f_r1.name)("results", ctx_r3.results)("aggregation", f_r1.aggregations);
} }
function BsFacetBar_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "sq-facet-card", 3);
    i0.ɵɵtemplate(2, BsFacetBar_ng_container_3_sq_facet_list_2_Template, 2, 3, "sq-facet-list", 4);
    i0.ɵɵtemplate(3, BsFacetBar_ng_container_3_sq_facet_tree_3_Template, 2, 3, "sq-facet-tree", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const f_r1 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap(f_r1["className"]);
    i0.ɵɵproperty("ngSwitch", f_r1.type)("title", f_r1.title);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "list");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "tree");
} }
const _c0 = ["*"];
export class BsFacetBar {
    constructor(facetService) {
        this.facetService = facetService;
        this.containerIndex = 0; // There could be various facet bars (but only one service and storage array)
    }
    get facets() {
        const facets = this.facetService.getFacets(this.containerIndex);
        return facets;
    }
}
BsFacetBar.ɵfac = function BsFacetBar_Factory(t) { return new (t || BsFacetBar)(i0.ɵɵdirectiveInject(i1.FacetService)); };
BsFacetBar.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetBar, selectors: [["sq-facet-bar"]], inputs: { results: "results", containerIndex: "containerIndex" }, ngContentSelectors: _c0, decls: 4, vars: 1, consts: [[1, "container-fluid"], [1, "row"], [4, "ngFor", "ngForOf"], [3, "ngSwitch", "title"], [3, "name", "results", "aggregation", 4, "ngSwitchCase"], [3, "name", "results", "aggregation"], ["facet", ""]], template: function BsFacetBar_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵprojection(2);
        i0.ɵɵtemplate(3, BsFacetBar_ng_container_3_Template, 4, 7, "ng-container", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.facets);
    } }, directives: [i2.NgForOf, i3.BsFacetCard, i2.NgSwitch, i2.NgSwitchCase, i4.BsFacetList, i5.BsFacetTree], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsFacetBar, [{
        type: Component,
        args: [{
                selector: "sq-facet-bar",
                templateUrl: "./facet-bar.html"
            }]
    }], function () { return [{ type: i1.FacetService }]; }, { results: [{
            type: Input
        }], containerIndex: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtYmFyLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvZmFjZXQvIiwic291cmNlcyI6WyJib290c3RyYXAvZmFjZXQtYmFyL2ZhY2V0LWJhci50cyIsImJvb3RzdHJhcC9mYWNldC1iYXIvZmFjZXQtYmFyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0lDSy9CLHNDQUFnSTs7OztJQUFuRixnQ0FBZSwyQkFBQSxrQ0FBQTs7O0lBQzVELHNDQUFnSTs7OztJQUFuRixnQ0FBZSwyQkFBQSxrQ0FBQTs7O0lBSHBFLDZCQUNJO0lBQUEsd0NBQ0k7SUFBQSw4RkFBZ0k7SUFDaEksOEZBQWdJO0lBRXBJLGlCQUFnQjtJQUNwQiwwQkFBZTs7O0lBTHdCLGVBQTBCO0lBQTFCLGdDQUEwQjtJQUE5QyxvQ0FBbUIscUJBQUE7SUFDUCxlQUFvQjtJQUFwQixxQ0FBb0I7SUFDcEIsZUFBb0I7SUFBcEIscUNBQW9COzs7QURFM0QsTUFBTSxPQUFPLFVBQVU7SUFJbkIsWUFDWSxZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUg3QixtQkFBYyxHQUFXLENBQUMsQ0FBQyxDQUFDLDZFQUE2RTtJQUlsSCxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7O29FQVhRLFVBQVU7K0NBQVYsVUFBVTs7UUNSdkIsOEJBQ0k7UUFBQSw4QkFDSTtRQUFBLGtCQUF5QjtRQUN6Qiw2RUFNZTtRQUNuQixpQkFBTTtRQUNWLGlCQUFNOztRQVI4QixlQUFTO1FBQVQsb0NBQVM7O2tEREtoQyxVQUFVO2NBSnRCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsV0FBVyxFQUFFLGtCQUFrQjthQUNsQzsrREFFWSxPQUFPO2tCQUFmLEtBQUs7WUFDRyxjQUFjO2tCQUF0QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSZXN1bHRzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7RmFjZXRTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vZmFjZXQuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1mYWNldC1iYXJcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2ZhY2V0LWJhci5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQnNGYWNldEJhciB7XG4gICAgQElucHV0KCkgcmVzdWx0czogUmVzdWx0cztcbiAgICBASW5wdXQoKSBjb250YWluZXJJbmRleDogbnVtYmVyID0gMDsgLy8gVGhlcmUgY291bGQgYmUgdmFyaW91cyBmYWNldCBiYXJzIChidXQgb25seSBvbmUgc2VydmljZSBhbmQgc3RvcmFnZSBhcnJheSlcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGZhY2V0U2VydmljZTogRmFjZXRTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgZ2V0IGZhY2V0cygpOiBhbnlbXSB7IC8vIFdoaWNoIGZhY2V0cyBhcmUgYWN0dWFsbHkgZGlzcGxheWVkIGluIHRoaXMgZmFjZXQgYmFyXG4gICAgICAgIGNvbnN0IGZhY2V0cyA9IHRoaXMuZmFjZXRTZXJ2aWNlLmdldEZhY2V0cyh0aGlzLmNvbnRhaW5lckluZGV4KTtcbiAgICAgICAgcmV0dXJuIGZhY2V0cztcbiAgICB9XG5cbn0iLCI8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGYgb2YgZmFjZXRzXCI+XG4gICAgICAgICAgICA8c3EtZmFjZXQtY2FyZCBbbmdTd2l0Y2hdPVwiZi50eXBlXCIgY2xhc3M9XCJ7e2ZbJ2NsYXNzTmFtZSddfX1cIiBbdGl0bGVdPVwiZi50aXRsZVwiPlxuICAgICAgICAgICAgICAgIDxzcS1mYWNldC1saXN0ICNmYWNldCAqbmdTd2l0Y2hDYXNlPVwiJ2xpc3QnXCIgW25hbWVdPVwiZi5uYW1lXCIgW3Jlc3VsdHNdPVwicmVzdWx0c1wiIFthZ2dyZWdhdGlvbl09XCJmLmFnZ3JlZ2F0aW9uc1wiPjwvc3EtZmFjZXQtbGlzdD5cbiAgICAgICAgICAgICAgICA8c3EtZmFjZXQtdHJlZSAjZmFjZXQgKm5nU3dpdGNoQ2FzZT1cIid0cmVlJ1wiIFtuYW1lXT1cImYubmFtZVwiIFtyZXN1bHRzXT1cInJlc3VsdHNcIiBbYWdncmVnYXRpb25dPVwiZi5hZ2dyZWdhdGlvbnNcIj48L3NxLWZhY2V0LXRyZWU+XG4gICAgICAgICAgICAgICAgPCEtLSBOb3RlOiBSZW1vdmluZyB0aGUgc3VwcG9ydCBmb3IgY2hhcnRzLCBidXQgY291bGQgYmUgZW5hYmxlZCBiYWNrIHZpYSBhIG1vcmUgZ2VuZXJpYyBuZy10ZW1wbGF0ZSBhcHByb2FjaCAoZ2V0IGFsbCBuZy10ZW1wbGF0ZSBwYXNzZWQgYnkgdHJhbnNjbHVzaW9uIGFuZCBtYXAgdGhlbSB0byBhIGZhY2V0IHR5cGUpIC0tPlxuICAgICAgICAgICAgPC9zcS1mYWNldC1jYXJkPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj4gXG4gICAgPC9kaXY+XG48L2Rpdj4iXX0=