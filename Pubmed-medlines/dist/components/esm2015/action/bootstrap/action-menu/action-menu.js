import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../action-item/action-item";
const _c0 = function (a0, a1, a2, a3) { return { item: a0, size: a1, autoAdjust: a2, autoAdjustBreakpoint: a3, inMenu: true }; };
function BsActionMenu_ng_container_1_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "li", 2);
} if (rf & 2) {
    const item_r1 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassMapInterpolate1("nav-item ", item_r1.hasChildren ? "dropdown" : "", "");
    i0.ɵɵproperty("sq-action-item", i0.ɵɵpureFunction4(5, _c0, item_r1, ctx_r2.size, ctx_r2.autoAdjust, ctx_r2.autoAdjustBreakpoint))("collapseBreakpoint", ctx_r2.collapseBreakpoint);
} }
function BsActionMenu_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsActionMenu_ng_container_1_li_1_Template, 1, 10, "li", 1);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !item_r1.hidden);
} }
export class BsActionMenu {
    ngOnInit() {
        if (!Utils.isArray(this.items)) {
            this.items = [this.items];
        }
    }
    identify(index, item) {
        return item.name || item.text || item.title || index;
    }
}
BsActionMenu.ɵfac = function BsActionMenu_Factory(t) { return new (t || BsActionMenu)(); };
BsActionMenu.ɵcmp = i0.ɵɵdefineComponent({ type: BsActionMenu, selectors: [["sq-action-menu"]], inputs: { items: "items", size: "size", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", right: "right" }, decls: 2, vars: 5, consts: [[4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "class", "sq-action-item", "collapseBreakpoint", 4, "ngIf"], [3, "sq-action-item", "collapseBreakpoint"]], template: function BsActionMenu_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "ul");
        i0.ɵɵtemplate(1, BsActionMenu_ng_container_1_Template, 2, 1, "ng-container", 0);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵclassMapInterpolate1("navbar-nav ", ctx.right ? "navbar-right" : "", "");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.items)("ngForTrackBy", ctx.identify);
    } }, directives: [i1.NgForOf, i1.NgIf, i2.BsActionItem], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsActionMenu, [{
        type: Component,
        args: [{
                selector: "sq-action-menu",
                templateUrl: "./action-menu.html",
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], null, { items: [{
            type: Input
        }], size: [{
            type: Input
        }], autoAdjust: [{
            type: Input
        }], autoAdjustBreakpoint: [{
            type: Input
        }], collapseBreakpoint: [{
            type: Input
        }], right: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLW1lbnUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9hY3Rpb24vIiwic291cmNlcyI6WyJib290c3RyYXAvYWN0aW9uLW1lbnUvYWN0aW9uLW1lbnUudHMiLCJib290c3RyYXAvYWN0aW9uLW1lbnUvYWN0aW9uLW1lbnUuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7OztJQ0NqQyx3QkFFbUQ7Ozs7SUFGMUIsaUZBQXVEO0lBQzVFLGlJQUE2SCxpREFBQTs7O0lBRnJJLDZCQUNJO0lBQUEsMkVBRW1EO0lBQ3ZELDBCQUFlOzs7SUFITixlQUFrQjtJQUFsQixzQ0FBa0I7O0FETy9CLE1BQU0sT0FBTyxZQUFZO0lBUXJCLFFBQVE7UUFDSixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBWSxFQUFFLElBQVk7UUFDL0IsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7SUFDekQsQ0FBQzs7d0VBaEJRLFlBQVk7aURBQVosWUFBWTtRQ1R6QiwwQkFDSTtRQUFBLCtFQUllO1FBQ25CLGlCQUFLOztRQU5ELDZFQUFrRDtRQUNuQixlQUFVO1FBQVYsbUNBQVUsOEJBQUE7O2tERFFoQyxZQUFZO2NBTHhCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixXQUFXLEVBQUUsb0JBQW9CO2dCQUNqQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNsRDtnQkFFWSxLQUFLO2tCQUFiLEtBQUs7WUFDRyxJQUFJO2tCQUFaLEtBQUs7WUFDRyxVQUFVO2tCQUFsQixLQUFLO1lBQ0csb0JBQW9CO2tCQUE1QixLQUFLO1lBQ0csa0JBQWtCO2tCQUExQixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHtBY3Rpb259IGZyb20gXCIuLi8uLi9hY3Rpb25cIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtYWN0aW9uLW1lbnVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FjdGlvbi1tZW51Lmh0bWxcIixcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCc0FjdGlvbk1lbnUgaW1wbGVtZW50cyBPbkluaXR7XG4gICAgQElucHV0KCkgaXRlbXM6IEFjdGlvbltdO1xuICAgIEBJbnB1dCgpIHNpemU6IHN0cmluZztcbiAgICBASW5wdXQoKSBhdXRvQWRqdXN0OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGF1dG9BZGp1c3RCcmVha3BvaW50OiBzdHJpbmc7XG4gICAgQElucHV0KCkgY29sbGFwc2VCcmVha3BvaW50OiBzdHJpbmc7XG4gICAgQElucHV0KCkgcmlnaHQ6IGJvb2xlYW47XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKCFVdGlscy5pc0FycmF5KHRoaXMuaXRlbXMpKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gWzxBY3Rpb24+dGhpcy5pdGVtc107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZGVudGlmeShpbmRleDpudW1iZXIsIGl0ZW06IEFjdGlvbikge1xuICAgICAgICByZXR1cm4gaXRlbS5uYW1lIHx8IGl0ZW0udGV4dCB8fCBpdGVtLnRpdGxlIHx8IGluZGV4O1xuICAgIH1cbn0iLCI8dWwgY2xhc3M9XCJuYXZiYXItbmF2IHt7cmlnaHQgPyAnbmF2YmFyLXJpZ2h0JyA6ICcnfX1cIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zOyB0cmFja0J5KGlkZW50aWZ5KVwiPlxuICAgICAgICA8bGkgKm5nSWY9XCIhaXRlbS5oaWRkZW5cIiBjbGFzcz1cIm5hdi1pdGVtIHt7aXRlbS5oYXNDaGlsZHJlbiA/ICdkcm9wZG93bicgOiAnJ319XCJcbiAgICAgICAgICAgIFtzcS1hY3Rpb24taXRlbV09XCJ7aXRlbTogaXRlbSwgc2l6ZTogc2l6ZSwgYXV0b0FkanVzdDogYXV0b0FkanVzdCwgYXV0b0FkanVzdEJyZWFrcG9pbnQ6IGF1dG9BZGp1c3RCcmVha3BvaW50LCBpbk1lbnU6IHRydWV9XCJcbiAgICAgICAgICAgIFtjb2xsYXBzZUJyZWFrcG9pbnRdPVwiY29sbGFwc2VCcmVha3BvaW50XCI+PC9saT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvdWw+Il19