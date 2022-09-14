import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/components/collapse";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/core/intl";
function MetadataAccessListsItemSingleAccessList_ng_template_6_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵelementStart(1, "div", 8);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 9);
    i0.ɵɵtext(4, " | ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 10);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const principal_r2 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(principal_r2.domain);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(principal_r2.id);
} }
function MetadataAccessListsItemSingleAccessList_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelementStart(1, "div", 5);
    i0.ɵɵtemplate(2, MetadataAccessListsItemSingleAccessList_ng_template_6_div_2_Template, 7, 2, "div", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0.accessList);
} }
const _c0 = function (a0) { return { value: a0 }; };
const _c1 = function (a0) { return { values: a0 }; };
export class MetadataAccessListsItemSingleAccessList {
    constructor() {
        this.collapsed = true;
    }
    get headerMessage() {
        return "msg#metadata.accessLists." + (this.authorized ? "authorizedListHeader" : "deniedListHeader");
    }
    collapseClick(event) {
        this.collapsed = !this.collapsed;
        event.preventDefault();
    }
}
MetadataAccessListsItemSingleAccessList.ɵfac = function MetadataAccessListsItemSingleAccessList_Factory(t) { return new (t || MetadataAccessListsItemSingleAccessList)(); };
MetadataAccessListsItemSingleAccessList.ɵcmp = i0.ɵɵdefineComponent({ type: MetadataAccessListsItemSingleAccessList, selectors: [["sq-metadata-access-lists-item-single-access-list"]], inputs: { authorized: "authorized", index: "index", accessList: "accessList" }, decls: 7, vars: 10, consts: [[1, "accessListHeader"], ["href", "#", 3, "click"], [1, "collapseButton", 3, "collapsed"], [3, "collapsed"], [1, "accessListBody"], [1, "principalList"], ["class", "principal", 4, "ngFor", "ngForOf"], [1, "principal"], [1, "domain"], [1, "separator"], [1, "id"]], template: function MetadataAccessListsItemSingleAccessList_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtext(1);
        i0.ɵɵpipe(2, "sqMessage");
        i0.ɵɵelementStart(3, "a", 1);
        i0.ɵɵlistener("click", function MetadataAccessListsItemSingleAccessList_Template_a_click_3_listener($event) { return ctx.collapseClick($event); });
        i0.ɵɵelement(4, "sq-collapse-button", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "sq-collapse", 3);
        i0.ɵɵtemplate(6, MetadataAccessListsItemSingleAccessList_ng_template_6_Template, 3, 1, "ng-template");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(2, 3, ctx.headerMessage, i0.ɵɵpureFunction1(8, _c1, i0.ɵɵpureFunction1(6, _c0, ctx.index))), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("collapsed", ctx.collapsed);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("collapsed", ctx.collapsed);
    } }, directives: [i1.CollapseButton, i1.Collapse, i2.NgForOf], pipes: [i3.MessagePipe], styles: [".collapseButton[_ngcontent-%COMP%]{float:right}.principalList[_ngcontent-%COMP%]{display:table}.principal[_ngcontent-%COMP%]{display:table-row}.domain[_ngcontent-%COMP%], .id[_ngcontent-%COMP%], .separator[_ngcontent-%COMP%]{display:table-cell}.separator[_ngcontent-%COMP%]{padding-left:.25em;padding-right:.25em}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MetadataAccessListsItemSingleAccessList, [{
        type: Component,
        args: [{
                selector: "sq-metadata-access-lists-item-single-access-list",
                templateUrl: "./metadata-access-lists-item-single-access-list.html",
                styleUrls: ["./metadata-access-lists-item-single-access-list.css"]
            }]
    }], null, { authorized: [{
            type: Input
        }], index: [{
            type: Input
        }], accessList: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEtYWNjZXNzLWxpc3RzLWl0ZW0tc2luZ2xlLWFjY2Vzcy1saXN0LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvbWV0YWRhdGEvIiwic291cmNlcyI6WyJtZXRhZGF0YS1hY2Nlc3MtbGlzdHMtaXRlbS1zaW5nbGUtYWNjZXNzLWxpc3QvbWV0YWRhdGEtYWNjZXNzLWxpc3RzLWl0ZW0tc2luZ2xlLWFjY2Vzcy1saXN0LnRzIiwibWV0YWRhdGEtYWNjZXNzLWxpc3RzLWl0ZW0tc2luZ2xlLWFjY2Vzcy1saXN0L21ldGFkYXRhLWFjY2Vzcy1saXN0cy1pdGVtLXNpbmdsZS1hY2Nlc3MtbGlzdC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7SUNXakMsOEJBQ0k7SUFBQSw4QkFBb0I7SUFBQSxZQUFzQjtJQUFBLGlCQUFNO0lBQ2hELDhCQUF3QjtJQUFBLG1CQUFFO0lBQUEsaUJBQU07SUFDaEMsK0JBQWdCO0lBQUEsWUFBa0I7SUFBQSxpQkFBTTtJQUM1QyxpQkFBTTs7O0lBSGtCLGVBQXNCO0lBQXRCLHlDQUFzQjtJQUUxQixlQUFrQjtJQUFsQixxQ0FBa0I7OztJQUw5Qyw4QkFDSTtJQUFBLDhCQUNJO0lBQUEsc0dBSU07SUFDVixpQkFBTTtJQUNWLGlCQUFNOzs7SUFONkIsZUFBYTtJQUFiLDJDQUFhOzs7O0FESHhELE1BQU0sT0FBTyx1Q0FBdUM7SUFMcEQ7UUFVVyxjQUFTLEdBQUcsSUFBSSxDQUFDO0tBVTNCO0lBUkcsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sMkJBQTJCLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBRU0sYUFBYSxDQUFDLEtBQVk7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDakMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7OzhIQWRRLHVDQUF1Qzs0RUFBdkMsdUNBQXVDO1FDUnBELDhCQUNJO1FBQUEsWUFDQTs7UUFBQSw0QkFDSTtRQURRLHFIQUFTLHlCQUFxQixJQUFDO1FBQ3ZDLHdDQUNxQjtRQUN6QixpQkFBSTtRQUNSLGlCQUFNO1FBQ04sc0NBQ0k7UUFBQSxxR0FVYztRQUNsQixpQkFBYzs7UUFsQlYsZUFDQTtRQURBLDJJQUNBO1FBQytDLGVBQXVCO1FBQXZCLHlDQUF1QjtRQUk3RCxlQUF1QjtRQUF2Qix5Q0FBdUI7O2tEREN2Qix1Q0FBdUM7Y0FMbkQsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxrREFBa0Q7Z0JBQzVELFdBQVcsRUFBRSxzREFBc0Q7Z0JBQ25FLFNBQVMsRUFBRSxDQUFDLHFEQUFxRCxDQUFDO2FBQ3JFO2dCQUc2QixVQUFVO2tCQUFuQyxLQUFLO1lBQ21CLEtBQUs7a0JBQTdCLEtBQUs7WUFDbUIsVUFBVTtrQkFBbEMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUHJpbmNpcGFsIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLW1ldGFkYXRhLWFjY2Vzcy1saXN0cy1pdGVtLXNpbmdsZS1hY2Nlc3MtbGlzdFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbWV0YWRhdGEtYWNjZXNzLWxpc3RzLWl0ZW0tc2luZ2xlLWFjY2Vzcy1saXN0Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vbWV0YWRhdGEtYWNjZXNzLWxpc3RzLWl0ZW0tc2luZ2xlLWFjY2Vzcy1saXN0LmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBNZXRhZGF0YUFjY2Vzc0xpc3RzSXRlbVNpbmdsZUFjY2Vzc0xpc3Qge1xuXG4gICAgQElucHV0KCkgcHJpdmF0ZSByZWFkb25seSBhdXRob3JpemVkOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHB1YmxpYyByZWFkb25seSBpbmRleDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyByZWFkb25seSBhY2Nlc3NMaXN0OiBQcmluY2lwYWxbXTtcbiAgICBwdWJsaWMgY29sbGFwc2VkID0gdHJ1ZTtcblxuICAgIHB1YmxpYyBnZXQgaGVhZGVyTWVzc2FnZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gXCJtc2cjbWV0YWRhdGEuYWNjZXNzTGlzdHMuXCIgKyAodGhpcy5hdXRob3JpemVkID8gXCJhdXRob3JpemVkTGlzdEhlYWRlclwiIDogXCJkZW5pZWRMaXN0SGVhZGVyXCIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb2xsYXBzZUNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmNvbGxhcHNlZCA9ICF0aGlzLmNvbGxhcHNlZDtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiYWNjZXNzTGlzdEhlYWRlclwiPlxuICAgIHt7IGhlYWRlck1lc3NhZ2UgfCBzcU1lc3NhZ2U6e3ZhbHVlczoge3ZhbHVlOiBpbmRleH0gfSB9fVxuICAgIDxhIGhyZWY9XCIjXCIgKGNsaWNrKT1cImNvbGxhcHNlQ2xpY2soJGV2ZW50KVwiPlxuICAgICAgICA8c3EtY29sbGFwc2UtYnV0dG9uIGNsYXNzPVwiY29sbGFwc2VCdXR0b25cIiBbY29sbGFwc2VkXT1cImNvbGxhcHNlZFwiPlxuICAgICAgICA8L3NxLWNvbGxhcHNlLWJ1dHRvbj5cbiAgICA8L2E+XG48L2Rpdj5cbjxzcS1jb2xsYXBzZSBbY29sbGFwc2VkXT1cImNvbGxhcHNlZFwiPlxuICAgIDxuZy10ZW1wbGF0ZT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFjY2Vzc0xpc3RCb2R5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpbmNpcGFsTGlzdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHByaW5jaXBhbCBvZiBhY2Nlc3NMaXN0XCIgY2xhc3M9XCJwcmluY2lwYWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRvbWFpblwiPnt7IHByaW5jaXBhbC5kb21haW4gfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlcGFyYXRvclwiPiB8IDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWRcIj57eyBwcmluY2lwYWwuaWQgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj4gICAgXG4gICAgPC9uZy10ZW1wbGF0ZT5cbjwvc3EtY29sbGFwc2U+XG4iXX0=