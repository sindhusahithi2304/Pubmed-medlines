import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { AbstractFacet } from '../../abstract-facet';
import { Action } from '@sinequa/components/action';
import { Utils } from '@sinequa/core/base';
import * as i0 from "@angular/core";
import * as i1 from "../../facet.service";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/components/utils";
import * as i4 from "../facet-list/facet-list";
import * as i5 from "../facet-tree/facet-tree";
import * as i6 from "@sinequa/core/intl";
const _c0 = ["facet"];
function BsFacetMultiComponent_div_0_div_1_span_4_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵlistener("click", function BsFacetMultiComponent_div_0_div_1_span_4_Template_span_click_0_listener($event) { i0.ɵɵrestoreView(_r8); const facet_r3 = i0.ɵɵnextContext().$implicit; const ctx_r6 = i0.ɵɵnextContext(2); return ctx_r6.clearFacetFilters(facet_r3, $event); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelement(2, "i", 10);
    i0.ɵɵelement(3, "i", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵpropertyInterpolate("sqTooltip", i0.ɵɵpipeBind1(1, 1, "msg#facet.filters.clear"));
} }
const _c1 = function (a0) { return { count: a0 }; };
const _c2 = function (a0) { return { values: a0 }; };
function BsFacetMultiComponent_div_0_div_1_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 12);
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "sqNumber");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const facet_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind2(1, 2, "msg#facet.filterItemCountTooltip", i0.ɵɵpureFunction1(9, _c2, i0.ɵɵpureFunction1(7, _c1, facet_r3.$count))));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 5, facet_r3.$count), " ");
} }
const _c3 = function (a0, a1) { return { "list-group-item-success": a0, "disabled": a1 }; };
function BsFacetMultiComponent_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵlistener("click", function BsFacetMultiComponent_div_0_div_1_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r11); const facet_r3 = ctx.$implicit; const ctx_r10 = i0.ɵɵnextContext(2); return ctx_r10.openFacet(facet_r3); });
    i0.ɵɵelementStart(1, "span", 5);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, BsFacetMultiComponent_div_0_div_1_span_4_Template, 4, 3, "span", 6);
    i0.ɵɵtemplate(5, BsFacetMultiComponent_div_0_div_1_span_5_Template, 4, 11, "span", 7);
    i0.ɵɵelement(6, "i", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const facet_r3 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(6, _c3, facet_r3.$hasFiltered, !facet_r3.$hasData));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 4, facet_r3.title));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", facet_r3.$hasFiltered);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.showCount);
} }
function BsFacetMultiComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtemplate(1, BsFacetMultiComponent_div_0_div_1_Template, 7, 9, "div", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.facets);
} }
function BsFacetMultiComponent_ng_container_1_sq_facet_list_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "sq-facet-list", 15, 16);
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("name", ctx_r12.openedFacet.name)("results", ctx_r12.results)("aggregation", ctx_r12.openedFacet.aggregation)("showCount", ctx_r12.openedFacet.showCount)("searchable", ctx_r12.openedFacet.searchable)("allowExclude", ctx_r12.openedFacet.allowExclude)("allowOr", ctx_r12.openedFacet.allowOr)("allowAnd", ctx_r12.openedFacet.allowAnd)("displayEmptyDistributionIntervals", ctx_r12.openedFacet.displayEmptyDistributionIntervals)("showProgressBar", ctx_r12.showProgressBar);
} }
function BsFacetMultiComponent_ng_container_1_sq_facet_tree_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "sq-facet-tree", 17, 16);
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("name", ctx_r13.openedFacet.name)("results", ctx_r13.results)("aggregation", ctx_r13.openedFacet.aggregation)("showCount", ctx_r13.openedFacet.showCount)("allowExclude", ctx_r13.openedFacet.allowExclude)("allowOr", ctx_r13.openedFacet.allowOr);
} }
function BsFacetMultiComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsFacetMultiComponent_ng_container_1_sq_facet_list_1_Template, 2, 10, "sq-facet-list", 13);
    i0.ɵɵtemplate(2, BsFacetMultiComponent_ng_container_1_sq_facet_tree_2_Template, 2, 6, "sq-facet-tree", 14);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.openedFacet.type === "list");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.openedFacet.type === "tree");
} }
export class BsFacetMultiComponent extends AbstractFacet {
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
BsFacetMultiComponent.ɵfac = function BsFacetMultiComponent_Factory(t) { return new (t || BsFacetMultiComponent)(i0.ɵɵdirectiveInject(i1.FacetService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
BsFacetMultiComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetMultiComponent, selectors: [["sq-facet-multi"]], viewQuery: function BsFacetMultiComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.facetComponent = _t.first);
    } }, inputs: { results: "results", facets: "facets", showCount: "showCount", showProgressBar: "showProgressBar" }, outputs: { events: "events" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 2, vars: 2, consts: [["class", "list-group list-group-flush", 4, "ngIf"], [4, "ngIf"], [1, "list-group", "list-group-flush"], ["class", "open-facet d-flex flex-row list-group-item border-0 list-group-item-action px-3 py-1 align-items-center", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "open-facet", "d-flex", "flex-row", "list-group-item", "border-0", "list-group-item-action", "px-3", "py-1", "align-items-center", 3, "ngClass", "click"], [1, "flex-grow-1"], ["class", "fa-stack icons-group", 3, "sqTooltip", "click", 4, "ngIf"], ["class", "mx-2 text-muted small", 3, "title", 4, "ngIf"], [1, "fas", "fa-caret-right"], [1, "fa-stack", "icons-group", 3, "sqTooltip", "click"], [1, "ml-2", "far", "fa-minus-square", "fa-stack-1x", "icons", "icon-hover"], [1, "ml-2", "far", "fa-check-square", "fa-stack-1x", "icons", "icon-default"], [1, "mx-2", "text-muted", "small", 3, "title"], [3, "name", "results", "aggregation", "showCount", "searchable", "allowExclude", "allowOr", "allowAnd", "displayEmptyDistributionIntervals", "showProgressBar", 4, "ngIf"], [3, "name", "results", "aggregation", "showCount", "allowExclude", "allowOr", 4, "ngIf"], [3, "name", "results", "aggregation", "showCount", "searchable", "allowExclude", "allowOr", "allowAnd", "displayEmptyDistributionIntervals", "showProgressBar"], ["facet", ""], [3, "name", "results", "aggregation", "showCount", "allowExclude", "allowOr"]], template: function BsFacetMultiComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsFacetMultiComponent_div_0_Template, 2, 1, "div", 0);
        i0.ɵɵtemplate(1, BsFacetMultiComponent_ng_container_1_Template, 3, 2, "ng-container", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !ctx.openedFacet);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.openedFacet);
    } }, directives: [i2.NgIf, i2.NgForOf, i2.NgClass, i3.TooltipDirective, i4.BsFacetList, i5.BsFacetTree], pipes: [i6.MessagePipe, i3.NumberPipe], styles: [".open-facet[_ngcontent-%COMP%]{cursor:pointer}.list-group-item.disabled[_ngcontent-%COMP%]{color:#d3d3d3}.icons-group[_ngcontent-%COMP%]{cursor:pointer}.icons-group[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]{transition:opacity .3s,transform .3s}.icons-group[_ngcontent-%COMP%]   .icons.icon-hover[_ngcontent-%COMP%]{opacity:0;transform:rotate(-180deg)}.icons-group[_ngcontent-%COMP%]:hover   .icon-default[_ngcontent-%COMP%]{opacity:0;transform:rotate(180deg)}.icons-group[_ngcontent-%COMP%]:hover   .icon-hover[_ngcontent-%COMP%]{opacity:1;transform:rotate(0deg)}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsFacetMultiComponent, [{
        type: Component,
        args: [{
                selector: 'sq-facet-multi',
                templateUrl: './facet-multi.component.html',
                styleUrls: ['./facet-multi.component.scss']
            }]
    }], function () { return [{ type: i1.FacetService }, { type: i0.ChangeDetectorRef }]; }, { results: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtbXVsdGkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvZmFjZXQvIiwic291cmNlcyI6WyJib290c3RyYXAvZmFjZXQtbXVsdGkvZmFjZXQtbXVsdGkuY29tcG9uZW50LnRzIiwiYm9vdHN0cmFwL2ZhY2V0LW11bHRpL2ZhY2V0LW11bHRpLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWEsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUVoSCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXBELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7Ozs7SUNBbkMsK0JBQ0k7SUFEdUYsaVJBQTBDOztJQUNqSSx3QkFBcUU7SUFDckUsd0JBQXVFO0lBQzNFLGlCQUFPOztJQUg0QixzRkFBdUQ7Ozs7O0lBSTFGLGdDQUtJOztJQUFBLFlBQ0o7O0lBQUEsaUJBQU87OztJQUhILG9LQUFnRztJQUVoRyxlQUNKO0lBREksc0VBQ0o7Ozs7O0lBZEosOEJBR0k7SUFIOEIsdU9BQTBCO0lBR3hELCtCQUEwQjtJQUFBLFlBQTZCOztJQUFBLGlCQUFPO0lBQzlELG9GQUdPO0lBQ1AscUZBTU87SUFDUCx1QkFBa0M7SUFDdEMsaUJBQU07Ozs7SUFkRiwrRkFBdUY7SUFDN0QsZUFBNkI7SUFBN0IsMERBQTZCO0lBQ2dGLGVBQXdCO0lBQXhCLDRDQUF3QjtJQUsxSixlQUFlO0lBQWYsdUNBQWU7OztJQVY1Qiw4QkFDSTtJQUFBLDRFQWdCTTtJQUNWLGlCQUFNOzs7SUFqQnFCLGVBQVM7SUFBVCx1Q0FBUzs7O0lBb0JoQyx3Q0FZZ0I7OztJQVhaLCtDQUF5Qiw0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QUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uQ2hhbmdlcywgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXN1bHRzIH0gZnJvbSAnQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXMnO1xuaW1wb3J0IHsgQWJzdHJhY3RGYWNldCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWZhY2V0JztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BzaW5lcXVhL2NvbXBvbmVudHMvYWN0aW9uJztcbmltcG9ydCB7IEZhY2V0U2VydmljZSB9IGZyb20gJy4uLy4uL2ZhY2V0LnNlcnZpY2UnO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICdAc2luZXF1YS9jb3JlL2Jhc2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2V0Q29uZmlnIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiAnbGlzdCcgfCAndHJlZSc7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGljb24/OiBzdHJpbmc7XG4gIGFnZ3JlZ2F0aW9uOiBzdHJpbmc7XG4gIHNob3dDb3VudD86IGJvb2xlYW47XG4gIHNlYXJjaGFibGU/OiBib29sZWFuO1xuICBhbGxvd0V4Y2x1ZGU/OiBib29sZWFuO1xuICBhbGxvd09yPzogYm9vbGVhbjtcbiAgYWxsb3dBbmQ/OiBib29sZWFuO1xuICBkaXNwbGF5RW1wdHlEaXN0cmlidXRpb25JbnRlcnZhbHM/OiBib29sZWFuO1xuXG4gIC8vIFBhcmFtZXRlcnMgc2V0IGJ5IHRoZSBjb21wb25lbnRcbiAgJGNvdW50Pzogc3RyaW5nO1xuICAkaGFzRGF0YT86IGJvb2xlYW47XG4gICRoYXNGaWx0ZXJlZD86IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NxLWZhY2V0LW11bHRpJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZhY2V0LW11bHRpLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmFjZXQtbXVsdGkuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBCc0ZhY2V0TXVsdGlDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZhY2V0IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSByZXN1bHRzOiBSZXN1bHRzO1xuICBASW5wdXQoKSBmYWNldHM6IEZhY2V0Q29uZmlnW107XG4gIEBJbnB1dCgpIHNob3dDb3VudDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dQcm9ncmVzc0JhciA9IGZhbHNlOyAgICAvLyB3aWxsIGRpc3BsYXkgb3Igbm90IGl0ZW0gY291bnQgYXMgcHJvZ3Jlc3MgYmFyXG5cbiAgQE91dHB1dCgpIGV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXI8RmFjZXRDb25maWc+KCk7XG4gIEBWaWV3Q2hpbGQoXCJmYWNldFwiLCB7c3RhdGljOiBmYWxzZX0pIHB1YmxpYyBmYWNldENvbXBvbmVudDogQWJzdHJhY3RGYWNldDtcblxuICAvKipcbiAgICogVGhlIGZhY2V0IGNvbmZpZ3VyYXRpb24gdG8gb3BlblxuICAgKi9cbiAgb3BlbmVkRmFjZXQ6IEZhY2V0Q29uZmlnIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBBY3Rpb24gdG8gc3dpdGNoIGJhY2sgZnJvbSBhbiBvcGVuZWQgZmFjZXQgdG8gdGhlIGZhY2V0IG11bHRpIHZpZXdcbiAgICovXG4gIGJhY2tBY3Rpb246IEFjdGlvbjtcbiAgY2xlYXJBbGxGaWx0ZXJzQWN0aW9uOiBBY3Rpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGZhY2V0U2VydmljZTogRmFjZXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge1xuXG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYmFja0FjdGlvbiA9IG5ldyBBY3Rpb24oe1xuICAgICAgbmFtZTogXCJiYWNrXCIsXG4gICAgICBpY29uOiBcImZhcyBmYS1hcnJvdy1sZWZ0XCIsXG4gICAgICB0aXRsZTogXCJtc2cjZmFjZXQuZmlsdGVycy5iYWNrXCIsXG4gICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgdGhpcy5vcGVuZWRGYWNldCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5ldmVudHMubmV4dCh1bmRlZmluZWQpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuY2xlYXJBbGxGaWx0ZXJzQWN0aW9uID0gbmV3IEFjdGlvbih7XG4gICAgICBpY29uOiBcImZhciBmYS1taW51cy1zcXVhcmVcIixcbiAgICAgIHRpdGxlOiBcIm1zZyNmYWNldC5maWx0ZXJzLmNsZWFyXCIsXG4gICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgY29uc3QgZmFjZXRzV2l0aEZpbHRlcmVkID0gdGhpcy5mYWNldHMuZmlsdGVyKChmYWNldCkgPT4gZmFjZXQuJGhhc0ZpbHRlcmVkKS5tYXAoZmFjZXQgPT4gZmFjZXQubmFtZSk7XG4gICAgICAgIHRoaXMuZmFjZXRTZXJ2aWNlLmNsZWFyRmlsdGVyc1NlYXJjaChmYWNldHNXaXRoRmlsdGVyZWQsIHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICAvKipcbiAgICogSWYgYSBzdWItZmFjZXQgaXMgb3BlbmVkLCBhZGQgYSBCYWNrIGJ1dHRvbiBhbmQgZm9yd2FyZFxuICAgKiB0aGUgYWN0aW9ucyBvZiB0aGUgZmFjZXQuXG4gICAqL1xuICBnZXQgYWN0aW9ucygpOiBBY3Rpb25bXSB7XG4gICAgY29uc3QgYWN0aW9uczogQWN0aW9uW10gPSBbXTtcbiAgICBpZih0aGlzLm9wZW5lZEZhY2V0KXtcbiAgICAgIGFjdGlvbnMucHVzaCh0aGlzLmJhY2tBY3Rpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBoYXNGaWx0ZXJlZCA9IHRoaXMuZmFjZXRzLnNvbWUoZmFjZXQgPT4gZmFjZXQuJGhhc0ZpbHRlcmVkKTtcbiAgICAgIGlmIChoYXNGaWx0ZXJlZCkgYWN0aW9ucy5wdXNoKHRoaXMuY2xlYXJBbGxGaWx0ZXJzQWN0aW9uKTtcbiAgICB9XG4gICAgaWYodGhpcy5mYWNldENvbXBvbmVudCl7XG4gICAgICBhY3Rpb25zLnB1c2goLi4udGhpcy5mYWNldEFjdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gYWN0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGFjdGlvbnMgb2YgdGhlIGNoaWxkIGZhY2V0XG4gICAqL1xuICBnZXQgZmFjZXRBY3Rpb25zKCk6IEFjdGlvbltdIHtcbiAgICBpZih0aGlzLmZhY2V0Q29tcG9uZW50KXtcbiAgICAgIHJldHVybiB0aGlzLmZhY2V0Q29tcG9uZW50LmFjdGlvbnM7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVuIHRoaXMgc3ViIGZhY2V0XG4gICAqIEBwYXJhbSBmYWNldFxuICAgKi9cbiAgb3BlbkZhY2V0KGZhY2V0OiBGYWNldENvbmZpZyl7XG4gICAgdGhpcy5vcGVuZWRGYWNldCA9IGZhY2V0O1xuICAgIHRoaXMuZXZlbnRzLm5leHQoZmFjZXQpO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgY2xlYXJGYWNldEZpbHRlcnMoZmFjZXQ6IEZhY2V0Q29uZmlnLCBlOkV2ZW50KSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmZhY2V0U2VydmljZS5jbGVhckZpbHRlcnNTZWFyY2goZmFjZXQubmFtZSwgdHJ1ZSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgbnVtYmVyIG9mIGl0ZW1zIHRvIGRpc3BsYXkgZm9yIGEgZ2l2ZW4gZmFjZXRcbiAgICogQHBhcmFtIGZhY2V0XG4gICAqL1xuICBwcml2YXRlIGdldEZhY2V0Q291bnQoZmFjZXQ6IEZhY2V0Q29uZmlnKTogc3RyaW5nIHtcbiAgICBjb25zdCBhZ2cgPSB0aGlzLnJlc3VsdHMuYWdncmVnYXRpb25zLmZpbmQoYWdnID0+IFV0aWxzLmVxTkMoYWdnLm5hbWUsIGZhY2V0LmFnZ3JlZ2F0aW9uKSk7IC8vIGF2b2lkIGNhbGxpbmcgZ2V0QWdncmVnYXRpb24oKSB3aGljaCBpcyBjb3N0bHkgZm9yIHRyZWVzXG4gICAgaWYgKCFhZ2c/Lml0ZW1zKVxuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgY29uc3QgY291bnQgPSB0aGlzLmZhY2V0U2VydmljZS5nZXRBZ2dyZWdhdGlvbkNvdW50KGZhY2V0LmFnZ3JlZ2F0aW9uKTsgLy8gY29uZmlndXJlZCBjb3VudCAoZGVmYXVsdDogMTApXG4gICAgY29uc3QgYWdnSXRlbUNvdW50ZXIgPSAoIWFnZy5pc0Rpc3RyaWJ1dGlvbiB8fCBmYWNldC5kaXNwbGF5RW1wdHlEaXN0cmlidXRpb25JbnRlcnZhbHMpXG4gICAgICA/IGFnZy5pdGVtcy5sZW5ndGhcbiAgICAgIDogYWdnLml0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0uY291bnQgPiAwKS5sZW5ndGg7XG4gICAgcmV0dXJuIGFnZ0l0ZW1Db3VudGVyID49IGNvdW50ID8gYCR7Y291bnR9K2AgOiBgJHthZ2dJdGVtQ291bnRlcn1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB3aGV0aGVyIGEgZ2l2ZW4gZmFjZXQgaGFzIGJlZW4gdXNlZCBpbiB0aGUgY3VycmVudCBjb250ZXh0XG4gICAqIEBwYXJhbSBmYWNldFxuICAgKi9cbiAgcHJpdmF0ZSBoYXNGaWx0ZXJlZChmYWNldDogRmFjZXRDb25maWcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5mYWNldFNlcnZpY2UuaGFzRmlsdGVyZWQoZmFjZXQubmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiB0aGUgcmVzdWx0cyBjaGFuZ2UsIGFjdHVhbGl6ZSBjb3VudCwgaGFzRGF0YSBhbmQgaGFzRmlsdGVyZWRcbiAgICogd2hpY2ggYXJlIGRpc3BsYXllZCBpbiB0aGUgdGVtcGxhdGUuXG4gICAqL1xuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmZhY2V0cy5mb3JFYWNoKGZhY2V0ID0+IHtcbiAgICAgIGZhY2V0LiRjb3VudCA9IHRoaXMuZ2V0RmFjZXRDb3VudChmYWNldCk7XG4gICAgICBmYWNldC4kaGFzRGF0YSA9IHRoaXMuZmFjZXRTZXJ2aWNlLmhhc0RhdGEoZmFjZXQuYWdncmVnYXRpb24sIHRoaXMucmVzdWx0cyk7XG4gICAgICBmYWNldC4kaGFzRmlsdGVyZWQgPSB0aGlzLmhhc0ZpbHRlcmVkKGZhY2V0KTtcbiAgICB9KTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG59XG4iLCI8ZGl2ICpuZ0lmPVwiIW9wZW5lZEZhY2V0XCIgY2xhc3M9XCJsaXN0LWdyb3VwIGxpc3QtZ3JvdXAtZmx1c2hcIj5cbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBmYWNldCBvZiBmYWNldHNcIiAoY2xpY2spPVwib3BlbkZhY2V0KGZhY2V0KVwiXG4gICAgICAgIGNsYXNzPVwib3Blbi1mYWNldCBkLWZsZXggZmxleC1yb3cgbGlzdC1ncm91cC1pdGVtIGJvcmRlci0wIGxpc3QtZ3JvdXAtaXRlbS1hY3Rpb24gcHgtMyBweS0xIGFsaWduLWl0ZW1zLWNlbnRlclwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsnbGlzdC1ncm91cC1pdGVtLXN1Y2Nlc3MnOmZhY2V0LiRoYXNGaWx0ZXJlZCwgJ2Rpc2FibGVkJzohZmFjZXQuJGhhc0RhdGEgfVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZsZXgtZ3Jvdy0xXCI+e3sgZmFjZXQudGl0bGUgfCBzcU1lc3NhZ2UgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZmEtc3RhY2sgaWNvbnMtZ3JvdXBcIiBzcVRvb2x0aXA9XCJ7eyAnbXNnI2ZhY2V0LmZpbHRlcnMuY2xlYXInIHwgc3FNZXNzYWdlIH19XCIgKGNsaWNrKT1cImNsZWFyRmFjZXRGaWx0ZXJzKGZhY2V0LCAkZXZlbnQpXCIgKm5nSWY9XCJmYWNldC4kaGFzRmlsdGVyZWRcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwibWwtMiBmYXIgZmEtbWludXMtc3F1YXJlIGZhLXN0YWNrLTF4IGljb25zIGljb24taG92ZXJcIj48L2k+XG4gICAgICAgICAgICA8aSBjbGFzcz1cIm1sLTIgZmFyIGZhLWNoZWNrLXNxdWFyZSBmYS1zdGFjay0xeCBpY29ucyBpY29uLWRlZmF1bHRcIj48L2k+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICpuZ0lmPVwic2hvd0NvdW50XCJcbiAgICAgICAgICAgIGNsYXNzPVwibXgtMiB0ZXh0LW11dGVkIHNtYWxsXCJcbiAgICAgICAgICAgIHRpdGxlPVwie3sgJ21zZyNmYWNldC5maWx0ZXJJdGVtQ291bnRUb29sdGlwJyB8IHNxTWVzc2FnZTp7IHZhbHVlczogeyBjb3VudDogZmFjZXQuJGNvdW50IH0gfSB9fVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIHt7IGZhY2V0LiRjb3VudCB8IHNxTnVtYmVyIH19XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtY2FyZXQtcmlnaHRcIj48L2k+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cIm9wZW5lZEZhY2V0XCI+XG4gICAgPHNxLWZhY2V0LWxpc3QgI2ZhY2V0ICpuZ0lmPVwib3BlbmVkRmFjZXQudHlwZT09PSdsaXN0J1wiXG4gICAgICAgIFtuYW1lXT1cIm9wZW5lZEZhY2V0Lm5hbWVcIlxuICAgICAgICBbcmVzdWx0c109XCJyZXN1bHRzXCJcbiAgICAgICAgW2FnZ3JlZ2F0aW9uXT1cIm9wZW5lZEZhY2V0LmFnZ3JlZ2F0aW9uXCJcbiAgICAgICAgW3Nob3dDb3VudF09XCJvcGVuZWRGYWNldC5zaG93Q291bnRcIlxuICAgICAgICBbc2VhcmNoYWJsZV09XCJvcGVuZWRGYWNldC5zZWFyY2hhYmxlXCJcbiAgICAgICAgW2FsbG93RXhjbHVkZV09XCJvcGVuZWRGYWNldC5hbGxvd0V4Y2x1ZGVcIlxuICAgICAgICBbYWxsb3dPcl09XCJvcGVuZWRGYWNldC5hbGxvd09yXCJcbiAgICAgICAgW2FsbG93QW5kXT1cIm9wZW5lZEZhY2V0LmFsbG93QW5kXCJcbiAgICAgICAgW2Rpc3BsYXlFbXB0eURpc3RyaWJ1dGlvbkludGVydmFsc109XCJvcGVuZWRGYWNldC5kaXNwbGF5RW1wdHlEaXN0cmlidXRpb25JbnRlcnZhbHNcIlxuICAgICAgICBbc2hvd1Byb2dyZXNzQmFyXT1cInNob3dQcm9ncmVzc0JhclwiXG4gICAgPlxuICAgIDwvc3EtZmFjZXQtbGlzdD5cblxuICAgIDxzcS1mYWNldC10cmVlICNmYWNldCAqbmdJZj1cIm9wZW5lZEZhY2V0LnR5cGU9PT0ndHJlZSdcIlxuICAgICAgICBbbmFtZV09XCJvcGVuZWRGYWNldC5uYW1lXCJcbiAgICAgICAgW3Jlc3VsdHNdPVwicmVzdWx0c1wiXG4gICAgICAgIFthZ2dyZWdhdGlvbl09XCJvcGVuZWRGYWNldC5hZ2dyZWdhdGlvblwiXG4gICAgICAgIFtzaG93Q291bnRdPVwib3BlbmVkRmFjZXQuc2hvd0NvdW50XCJcbiAgICAgICAgW2FsbG93RXhjbHVkZV09XCJvcGVuZWRGYWNldC5hbGxvd0V4Y2x1ZGVcIlxuICAgICAgICBbYWxsb3dPcl09XCJvcGVuZWRGYWNldC5hbGxvd09yXCI+XG4gICAgPC9zcS1mYWNldC10cmVlPlxuPC9uZy1jb250YWluZXI+XG4iXX0=