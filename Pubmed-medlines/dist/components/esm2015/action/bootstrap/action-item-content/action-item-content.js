import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@sinequa/core/load-component";
import * as i3 from "@sinequa/core/intl";
function BsActionItemContent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c0 = function (a0, a1) { return { component: a0, inputs: a1 }; };
function BsActionItemContent_ng_template_1_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0, 5);
    i0.ɵɵlistener("click", function BsActionItemContent_ng_template_1_ng_container_0_Template_ng_container_click_0_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(2); return ctx_r7.componentClick($event); });
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("sqLoadComponent", i0.ɵɵpureFunction2(1, _c0, ctx_r5.item.component, ctx_r5.item.componentInputs));
} }
function BsActionItemContent_ng_template_1_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "span", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵclassMapInterpolate1("fas fa-check ", ctx_r9.item.selected ? "" : "invisible", "");
} }
function BsActionItemContent_ng_template_1_div_1_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "span", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap(ctx_r10.item.icon);
} }
function BsActionItemContent_ng_template_1_div_1_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵelement(1, "span", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap(ctx_r11.item.iconAfter);
} }
function BsActionItemContent_ng_template_1_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtemplate(1, BsActionItemContent_ng_template_1_div_1_div_1_Template, 2, 3, "div", 7);
    i0.ɵɵtemplate(2, BsActionItemContent_ng_template_1_div_1_div_2_Template, 2, 3, "div", 7);
    i0.ɵɵelementStart(3, "div");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, BsActionItemContent_ng_template_1_div_1_div_6_Template, 2, 3, "div", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.item.showSelected);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !!ctx_r6.item.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 4, ctx_r6.text, ctx_r6.item.messageParams));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !!ctx_r6.item.iconAfter);
} }
function BsActionItemContent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, BsActionItemContent_ng_template_1_ng_container_0_Template, 1, 4, "ng-container", 3);
    i0.ɵɵtemplate(1, BsActionItemContent_ng_template_1_div_1_Template, 7, 7, "div", 4);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", !!ctx_r2.item.component);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !!!ctx_r2.item.component);
} }
function BsActionItemContent_ng_template_3_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 9);
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(ctx_r12.item.icon);
} }
function BsActionItemContent_ng_template_3_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 9);
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(ctx_r13.item.iconAfter);
} }
function BsActionItemContent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 11);
    i0.ɵɵtemplate(1, BsActionItemContent_ng_template_3_span_1_Template, 1, 3, "span", 12);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵtemplate(4, BsActionItemContent_ng_template_3_span_4_Template, 1, 3, "span", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r4.item.styles || "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !!ctx_r4.item.icon);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(3, 4, ctx_r4.text, ctx_r4.item.messageParams), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !!ctx_r4.item.iconAfter);
} }
export class BsActionItemContent {
    componentClick(event) {
        if (this.item.action && !this.item.disabled) {
            this.item.action(this.item, event);
        }
        event.stopPropagation();
        return false;
    }
}
BsActionItemContent.ɵfac = function BsActionItemContent_Factory(t) { return new (t || BsActionItemContent)(); };
BsActionItemContent.ɵcmp = i0.ɵɵdefineComponent({ type: BsActionItemContent, selectors: [["sq-action-item-content"]], inputs: { item: "item", text: "text", inDropdownMenu: ["in-dropdown-menu", "inDropdownMenu"] }, decls: 5, vars: 3, consts: [[4, "ngIf", "ngIfThen", "ngIfElse"], ["in_dropdown_menu", ""], ["not_in_dropdown_menu", ""], [3, "sqLoadComponent", "click", 4, "ngIf"], ["class", "d-flex flex-row sq-action-item-content-container", 4, "ngIf"], [3, "sqLoadComponent", "click"], [1, "d-flex", "flex-row", "sq-action-item-content-container"], [4, "ngIf"], ["class", "ml-auto", 4, "ngIf"], ["aria-hidden", "true"], [1, "ml-auto"], [3, "ngClass"], ["aria-hidden", "true", 3, "class", 4, "ngIf"]], template: function BsActionItemContent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsActionItemContent_ng_container_0_Template, 1, 0, "ng-container", 0);
        i0.ɵɵtemplate(1, BsActionItemContent_ng_template_1_Template, 2, 2, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(3, BsActionItemContent_ng_template_3_Template, 5, 7, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r1 = i0.ɵɵreference(2);
        const _r3 = i0.ɵɵreference(4);
        i0.ɵɵproperty("ngIf", ctx.inDropdownMenu)("ngIfThen", _r1)("ngIfElse", _r3);
    } }, directives: [i1.NgIf, i2.LoadComponentDirective, i1.NgClass], pipes: [i3.MessagePipe], styles: [".sq-action-item-content-container[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 0.25rem;\n}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsActionItemContent, [{
        type: Component,
        args: [{
                selector: "sq-action-item-content",
                templateUrl: "./action-item-content.html",
                styles: [`
.sq-action-item-content-container > div:not(:last-child) {
    margin-right: 0.25rem;
}
    `]
            }]
    }], null, { item: [{
            type: Input
        }], text: [{
            type: Input
        }], inDropdownMenu: [{
            type: Input,
            args: ["in-dropdown-menu"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLWl0ZW0tY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2FjdGlvbi8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9hY3Rpb24taXRlbS1jb250ZW50L2FjdGlvbi1pdGVtLWNvbnRlbnQudHMiLCJib290c3RyYXAvYWN0aW9uLWl0ZW0tY29udGVudC9hY3Rpb24taXRlbS1jb250ZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7OztJQ0EvQyx3QkFBcUc7Ozs7O0lBR2pHLGdDQUFzSjtJQUEvRyxxT0FBZ0M7SUFBK0UsMEJBQWU7OztJQUE5RixnSEFBOEU7OztJQUVqSiwyQkFBK0I7SUFBQSwwQkFBMEY7SUFBQSxpQkFBTTs7O0lBQTFGLGVBQXlEO0lBQXpELHVGQUF5RDs7O0lBQzlGLDJCQUF5QjtJQUFBLDBCQUFzRDtJQUFBLGlCQUFNOzs7SUFBdEQsZUFBcUI7SUFBckIsZ0NBQXFCOzs7SUFFcEQsK0JBQThDO0lBQUEsMEJBQTJEO0lBQUEsaUJBQU07OztJQUEzRCxlQUEwQjtJQUExQixxQ0FBMEI7OztJQUpsRiw4QkFDSTtJQUFBLHdGQUErSDtJQUMvSCx3RkFBcUY7SUFDckYsMkJBQUs7SUFBQSxZQUF1Qzs7SUFBQSxpQkFBTTtJQUNsRCx3RkFBK0c7SUFDbkgsaUJBQU07OztJQUpJLGVBQXVCO0lBQXZCLCtDQUF1QjtJQUN2QixlQUFpQjtJQUFqQix5Q0FBaUI7SUFDbEIsZUFBdUM7SUFBdkMsa0ZBQXVDO0lBQ3RDLGVBQXNCO0lBQXRCLDhDQUFzQjs7O0lBTGhDLG9HQUFxSztJQUNySyxrRkFLTTs7O0lBTlMsOENBQXNCO0lBQy9CLGVBQXVCO0lBQXZCLCtDQUF1Qjs7O0lBVXpCLDBCQUEwRTs7O0lBQWhELGdDQUFxQjs7O0lBRS9DLDBCQUFvRjs7O0lBQXJELHFDQUEwQjs7O0lBSDdELGdDQUNJO0lBQUEscUZBQTBFO0lBQzFFLFlBQ0E7O0lBQUEscUZBQW9GO0lBQ3hGLGlCQUFPOzs7SUFKRCxrREFBNkI7SUFDeEIsZUFBaUI7SUFBakIseUNBQWlCO0lBQ3hCLGVBQ0E7SUFEQSw2RkFDQTtJQUFPLGVBQXNCO0lBQXRCLDhDQUFzQjs7QURKckMsTUFBTSxPQUFPLG1CQUFtQjtJQUs1QixjQUFjLENBQUMsS0FBYztRQUN6QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN0QztRQUNELEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOztzRkFYUSxtQkFBbUI7d0RBQW5CLG1CQUFtQjtRQ1poQyxzRkFBcUc7UUFFckcscUhBUWM7UUFFZCxxSEFNYzs7OztRQWxCQyx5Q0FBc0IsaUJBQUEsaUJBQUE7O2tERFl4QixtQkFBbUI7Y0FUL0IsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLFdBQVcsRUFBRSw0QkFBNEI7Z0JBQ3pDLE1BQU0sRUFBRSxDQUFDOzs7O0tBSVIsQ0FBQzthQUNMO2dCQUVZLElBQUk7a0JBQVosS0FBSztZQUNHLElBQUk7a0JBQVosS0FBSztZQUNxQixjQUFjO2tCQUF4QyxLQUFLO21CQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7QWN0aW9ufSBmcm9tIFwiLi4vLi4vYWN0aW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLWFjdGlvbi1pdGVtLWNvbnRlbnRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FjdGlvbi1pdGVtLWNvbnRlbnQuaHRtbFwiLFxuICAgIHN0eWxlczogW2Bcbi5zcS1hY3Rpb24taXRlbS1jb250ZW50LWNvbnRhaW5lciA+IGRpdjpub3QoOmxhc3QtY2hpbGQpIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDAuMjVyZW07XG59XG4gICAgYF1cbn0pXG5leHBvcnQgY2xhc3MgQnNBY3Rpb25JdGVtQ29udGVudCB7XG4gICAgQElucHV0KCkgaXRlbTogQWN0aW9uO1xuICAgIEBJbnB1dCgpIHRleHQ6IHN0cmluZztcbiAgICBASW5wdXQoXCJpbi1kcm9wZG93bi1tZW51XCIpIGluRHJvcGRvd25NZW51OiBib29sZWFuO1xuXG4gICAgY29tcG9uZW50Q2xpY2soZXZlbnQ6IFVJRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXRlbS5hY3Rpb24gJiYgIXRoaXMuaXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5pdGVtLmFjdGlvbih0aGlzLml0ZW0sIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn0iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiaW5Ecm9wZG93bk1lbnU7IHRoZW4gaW5fZHJvcGRvd25fbWVudSBlbHNlIG5vdF9pbl9kcm9wZG93bl9tZW51XCI+PC9uZy1jb250YWluZXI+XG5cbjxuZy10ZW1wbGF0ZSAjaW5fZHJvcGRvd25fbWVudT5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiISFpdGVtLmNvbXBvbmVudFwiIChjbGljayk9XCJjb21wb25lbnRDbGljaygkZXZlbnQpXCJbc3FMb2FkQ29tcG9uZW50XT1cIntjb21wb25lbnQ6IGl0ZW0uY29tcG9uZW50LCBpbnB1dHM6IGl0ZW0uY29tcG9uZW50SW5wdXRzIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICA8ZGl2ICpuZ0lmPVwiISEhaXRlbS5jb21wb25lbnRcIiBjbGFzcz1cImQtZmxleCBmbGV4LXJvdyBzcS1hY3Rpb24taXRlbS1jb250ZW50LWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiaXRlbS5zaG93U2VsZWN0ZWRcIj48c3BhbiBjbGFzcz1cImZhcyBmYS1jaGVjayB7e2l0ZW0uc2VsZWN0ZWQgPyAnJyA6ICdpbnZpc2libGUnfX1cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+PC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCIhIWl0ZW0uaWNvblwiPjxzcGFuIGNsYXNzPVwie3tpdGVtLmljb259fVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj48L2Rpdj5cbiAgICAgICAgPGRpdj57e3RleHQgfCBzcU1lc3NhZ2U6aXRlbS5tZXNzYWdlUGFyYW1zfX08L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIiEhaXRlbS5pY29uQWZ0ZXJcIiBjbGFzcz1cIm1sLWF1dG9cIj48c3BhbiBjbGFzcz1cInt7aXRlbS5pY29uQWZ0ZXJ9fVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj48L2Rpdj5cbiAgICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy10ZW1wbGF0ZSAjbm90X2luX2Ryb3Bkb3duX21lbnU+XG4gICAgPHNwYW4gW25nQ2xhc3NdPVwiaXRlbS5zdHlsZXMgfHwgJydcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCIhIWl0ZW0uaWNvblwiIGNsYXNzPVwie3tpdGVtLmljb259fVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICAgICAge3t0ZXh0IHwgc3FNZXNzYWdlOml0ZW0ubWVzc2FnZVBhcmFtc319XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiISFpdGVtLmljb25BZnRlclwiIGNsYXNzPVwie3tpdGVtLmljb25BZnRlcn19XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuICAgIDwvc3Bhbj5cbjwvbmctdGVtcGxhdGU+Il19