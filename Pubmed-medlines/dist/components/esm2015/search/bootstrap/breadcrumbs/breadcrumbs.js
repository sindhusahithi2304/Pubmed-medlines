import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "../../search.service";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/components/utils";
import * as i4 from "@sinequa/core/intl";
const _c0 = function (a0) { return { withFields: a0, asHTML: true }; };
function BsBreadcrumbs_ng_container_4_li_1_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 9);
    i0.ɵɵlistener("click", function BsBreadcrumbs_ng_container_4_li_1_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r8); const item_r1 = i0.ɵɵnextContext(2).$implicit; const ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.selectItem(item_r1); });
    i0.ɵɵpipe(1, "sqExpr");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind2(1, 1, item_r1.display, i0.ɵɵpureFunction1(4, _c0, ctx_r3.displayFieldNames)), i0.ɵɵsanitizeHtml);
} }
function BsBreadcrumbs_ng_container_4_li_1_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 10);
    i0.ɵɵpipe(1, "sqExpr");
} if (rf & 2) {
    const item_r1 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind2(1, 1, item_r1.display, i0.ɵɵpureFunction1(4, _c0, ctx_r4.displayFieldNames)), i0.ɵɵsanitizeHtml);
} }
function BsBreadcrumbs_ng_container_4_li_1_span_3_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 11);
    i0.ɵɵlistener("click", function BsBreadcrumbs_ng_container_4_li_1_span_3_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r13); const item_r1 = i0.ɵɵnextContext(2).$implicit; const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.removeItem(item_r1); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 1, "msg#breadcrumbs.itemRemove"));
} }
function BsBreadcrumbs_ng_container_4_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtemplate(1, BsBreadcrumbs_ng_container_4_li_1_a_1_Template, 2, 6, "a", 6);
    i0.ɵɵtemplate(2, BsBreadcrumbs_ng_container_4_li_1_span_2_Template, 2, 6, "span", 7);
    i0.ɵɵtemplate(3, BsBreadcrumbs_ng_container_4_li_1_span_3_Template, 2, 3, "span", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassMapInterpolate2("breadcrumb-item ", item_r1.active ? "active" : "", " sq-breadcrumb-item  sq-breadcrumb-item-", ctx_r2.getField(item_r1), "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !item_r1.active);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r1.active);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.allowDeletion);
} }
function BsBreadcrumbs_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsBreadcrumbs_ng_container_4_li_1_Template, 4, 7, "li", 5);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !item_r1.hidden);
} }
export class BsBreadcrumbs {
    constructor(searchService) {
        this.searchService = searchService;
        this.allowDeletion = true;
        this.displayFieldNames = true;
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
    home() {
        this.searchService.home();
        return false;
    }
    selectItem(item) {
        this.searchService.selectBreadcrumbsItem(item);
        return false;
    }
    removeItem(item) {
        this.searchService.removeBreadcrumbsItem(item);
    }
}
BsBreadcrumbs.ɵfac = function BsBreadcrumbs_Factory(t) { return new (t || BsBreadcrumbs)(i0.ɵɵdirectiveInject(i1.SearchService)); };
BsBreadcrumbs.ɵcmp = i0.ɵɵdefineComponent({ type: BsBreadcrumbs, selectors: [["sq-breadcrumbs"]], inputs: { results: "results", allowDeletion: "allowDeletion", displayFieldNames: "displayFieldNames" }, decls: 5, vars: 1, consts: [[1, "breadcrumb"], [1, "breadcrumb-item"], ["href", "#", "title", "Home", 3, "click"], [1, "fas", "fa-home"], [4, "ngFor", "ngForOf"], [3, "class", 4, "ngIf"], ["href", "#", 3, "innerHTML", "click", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], ["class", "fas fa-times", "role", "button", 3, "title", "click", 4, "ngIf"], ["href", "#", 3, "innerHTML", "click"], [3, "innerHTML"], ["role", "button", 1, "fas", "fa-times", 3, "title", "click"]], template: function BsBreadcrumbs_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "ol", 0);
        i0.ɵɵelementStart(1, "li", 1);
        i0.ɵɵelementStart(2, "a", 2);
        i0.ɵɵlistener("click", function BsBreadcrumbs_Template_a_click_2_listener() { return ctx.home(); });
        i0.ɵɵelement(3, "span", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(4, BsBreadcrumbs_ng_container_4_Template, 2, 1, "ng-container", 4);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngForOf", ctx.searchService.breadcrumbs == null ? null : ctx.searchService.breadcrumbs.items);
    } }, directives: [i2.NgForOf, i2.NgIf], pipes: [i3.ExprPipe, i4.MessagePipe], styles: [".breadcrumb[_ngcontent-%COMP%]{background-color:inherit;font-size:.85rem;margin-bottom:0;padding:.375rem 0}.sq-breadcrumbs-remove[_ngcontent-%COMP%]{color:#d3d3d3;cursor:pointer}.sq-breadcrumbs-remove[_ngcontent-%COMP%]:hover{color:#a9a9a9}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsBreadcrumbs, [{
        type: Component,
        args: [{
                selector: "sq-breadcrumbs",
                templateUrl: "./breadcrumbs.html",
                styleUrls: ["./breadcrumbs.css"]
            }]
    }], function () { return [{ type: i1.SearchService }]; }, { results: [{
            type: Input
        }], allowDeletion: [{
            type: Input
        }], displayFieldNames: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYnMuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zZWFyY2gvIiwic291cmNlcyI6WyJib290c3RyYXAvYnJlYWRjcnVtYnMvYnJlYWRjcnVtYnMudHMiLCJib290c3RyYXAvYnJlYWRjcnVtYnMvYnJlYWRjcnVtYnMuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0lDTWhDLDRCQUE4STtJQUE3RyxvUEFBMEI7O0lBQW1GLGlCQUFJOzs7O0lBQXRGLDBJQUFpRjs7O0lBQzdJLDJCQUFtSDs7Ozs7SUFBekYsMElBQWlGOzs7O0lBQzlHLGdDQUErSTtJQUFoRiw2UEFBMEI7O0lBQXNELGlCQUFPOztJQUE1RCxxRkFBb0Q7OztJQUhsSiwwQkFBMkk7SUFDcEksOEVBQWtKO0lBQ2xKLG9GQUFtSDtJQUN0SCxvRkFBc0o7SUFDMUosaUJBQUs7Ozs7SUFKb0IsdUpBQWlIO0lBQy9ILGVBQWtCO0lBQWxCLHNDQUFrQjtJQUNmLGVBQWlCO0lBQWpCLHFDQUFpQjtJQUNwQixlQUFtQjtJQUFuQiwyQ0FBbUI7OztJQUpsQyw2QkFDSTtJQUFBLDJFQUlLO0lBQ1QsMEJBQWU7OztJQUxOLGVBQWtCO0lBQWxCLHNDQUFrQjs7QURLL0IsTUFBTSxPQUFPLGFBQWE7SUFLdEIsWUFDVyxhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUo5QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixzQkFBaUIsR0FBWSxJQUFJLENBQUM7SUFJM0MsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFxQjtRQUMxQixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQzFCO2lCQUNJO2dCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDekIsT0FBTyxNQUFNLENBQUM7aUJBQ2pCO3FCQUNJO29CQUNELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ3JDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDM0I7YUFDSjtTQUNKO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFCLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBcUI7UUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsVUFBVSxDQUFDLElBQXFCO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7MEVBdkNRLGFBQWE7a0RBQWIsYUFBYTtRQ1YxQiw2QkFDSTtRQUFBLDZCQUNJO1FBQUEsNEJBQTBDO1FBQTlCLHFGQUFTLFVBQU0sSUFBQztRQUFjLDBCQUFpQztRQUFBLGlCQUFJO1FBQ25GLGlCQUFLO1FBQ0wsZ0ZBTWU7UUFDbkIsaUJBQUs7O1FBUDhCLGVBQW1DO1FBQW5DLDRHQUFtQzs7a0RETXpELGFBQWE7Y0FMekIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFdBQVcsRUFBRSxvQkFBb0I7Z0JBQ2pDLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2FBQ25DO2dFQUVZLE9BQU87a0JBQWYsS0FBSztZQUNHLGFBQWE7a0JBQXJCLEtBQUs7WUFDRyxpQkFBaUI7a0JBQXpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1Jlc3VsdHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtTZWFyY2hTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VhcmNoLnNlcnZpY2VcIjtcbmltcG9ydCB7QnJlYWRjcnVtYnNJdGVtfSBmcm9tIFwiLi4vLi4vYnJlYWRjcnVtYnNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtYnJlYWRjcnVtYnNcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2JyZWFkY3J1bWJzLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vYnJlYWRjcnVtYnMuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEJzQnJlYWRjcnVtYnMge1xuICAgIEBJbnB1dCgpIHJlc3VsdHM6IFJlc3VsdHM7XG4gICAgQElucHV0KCkgYWxsb3dEZWxldGlvbjogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgZGlzcGxheUZpZWxkTmFtZXM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgZ2V0RmllbGQoaXRlbTogQnJlYWRjcnVtYnNJdGVtKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGl0ZW0uZXhwcikge1xuICAgICAgICAgICAgaWYgKGl0ZW0uZXhwci5maWVsZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmV4cHIuZmllbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0uZXhwci5pc1N0cnVjdHVyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGV4dFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmllbGRzID0gaXRlbS5leHByLmdldEZpZWxkcygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmllbGRzLmpvaW4oXCItXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJ1bmtub3duXCI7XG4gICAgfVxuXG4gICAgaG9tZSgpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLmhvbWUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHNlbGVjdEl0ZW0oaXRlbTogQnJlYWRjcnVtYnNJdGVtKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWxlY3RCcmVhZGNydW1ic0l0ZW0oaXRlbSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZW1vdmVJdGVtKGl0ZW06IEJyZWFkY3J1bWJzSXRlbSkge1xuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucmVtb3ZlQnJlYWRjcnVtYnNJdGVtKGl0ZW0pO1xuICAgIH1cbn0iLCI8b2wgY2xhc3M9XCJicmVhZGNydW1iXCI+XG4gICAgPGxpIGNsYXNzPVwiYnJlYWRjcnVtYi1pdGVtXCI+XG4gICAgICAgIDxhIGhyZWY9XCIjXCIgKGNsaWNrKT1cImhvbWUoKVwiIHRpdGxlPVwiSG9tZVwiPjxzcGFuIGNsYXNzPVwiZmFzIGZhLWhvbWVcIj48L3NwYW4+PC9hPlxuICAgIDwvbGk+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzZWFyY2hTZXJ2aWNlLmJyZWFkY3J1bWJzPy5pdGVtc1wiPlxuICAgICAgICA8bGkgKm5nSWY9XCIhaXRlbS5oaWRkZW5cIiBjbGFzcz1cImJyZWFkY3J1bWItaXRlbSB7e2l0ZW0uYWN0aXZlID8gJ2FjdGl2ZScgOiAnJ319IHNxLWJyZWFkY3J1bWItaXRlbSAgc3EtYnJlYWRjcnVtYi1pdGVtLXt7Z2V0RmllbGQoaXRlbSl9fVwiPjwhLS1cbiAgICAgICAgICAgIC0tPjxhICpuZ0lmPVwiIWl0ZW0uYWN0aXZlXCIgaHJlZj1cIiNcIiAoY2xpY2spPVwic2VsZWN0SXRlbShpdGVtKVwiIFtpbm5lckhUTUxdPVwiaXRlbS5kaXNwbGF5IHwgc3FFeHByOnt3aXRoRmllbGRzOiBkaXNwbGF5RmllbGROYW1lcywgYXNIVE1MOiB0cnVlfVwiPjwvYT48IS0tXG4gICAgICAgICAgICAtLT48c3BhbiAqbmdJZj1cIml0ZW0uYWN0aXZlXCIgW2lubmVySFRNTF09XCJpdGVtLmRpc3BsYXkgfCBzcUV4cHI6e3dpdGhGaWVsZHM6IGRpc3BsYXlGaWVsZE5hbWVzLCBhc0hUTUw6IHRydWV9XCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhbGxvd0RlbGV0aW9uXCIgY2xhc3M9XCJmYXMgZmEtdGltZXNcIiByb2xlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInJlbW92ZUl0ZW0oaXRlbSlcIiB0aXRsZT1cInt7J21zZyNicmVhZGNydW1icy5pdGVtUmVtb3ZlJyB8IHNxTWVzc2FnZX19XCI+PC9zcGFuPlxuICAgICAgICA8L2xpPlxuICAgIDwvbmctY29udGFpbmVyPlxuPC9vbD4iXX0=