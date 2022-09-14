import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../action-item/action-item";
import * as i3 from "@sinequa/components/utils";
import * as i4 from "@sinequa/core/intl";
const _c0 = ["sq-action-buttons", ""];
function BsActionButtons_ng_container_0_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 3);
    i0.ɵɵlistener("click", function BsActionButtons_ng_container_0_a_1_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r6); const item_r1 = i0.ɵɵnextContext().$implicit; const ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.itemClick(item_r1, $event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("sq-action-item", ctx_r2.getActionItemOptions(item_r1));
    i0.ɵɵattribute("href", !item_r1.disabled ? item_r1.href : null, i0.ɵɵsanitizeUrl);
} }
function BsActionButtons_ng_container_0_ng_container_2_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 6);
} if (rf & 2) {
    const item_r1 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵproperty("sq-action-item", ctx_r8.getActionItemOptions(item_r1));
} }
function BsActionButtons_ng_container_0_ng_container_2_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("click", function BsActionButtons_ng_container_0_ng_container_2_button_2_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r13); const item_r1 = i0.ɵɵnextContext(2).$implicit; const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.itemClick(item_r1, $event); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r9 = i0.ɵɵnextContext();
    i0.ɵɵclassMapInterpolate4("btn ", ctx_r9.styleClass, " ", ctx_r9.sizeClass, " ", item_r1.selected ? "active" : "", " ", item_r1.disabled ? "disabled" : "", "");
    i0.ɵɵpropertyInterpolate("sqTooltip", i0.ɵɵpipeBind2(1, 9, item_r1.title, item_r1.messageParams));
    i0.ɵɵproperty("sq-action-item", ctx_r9.getActionItemOptions(item_r1));
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(2, 12, item_r1.title, item_r1.messageParams));
} }
function BsActionButtons_ng_container_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsActionButtons_ng_container_0_ng_container_2_div_1_Template, 1, 1, "div", 4);
    i0.ɵɵtemplate(2, BsActionButtons_ng_container_0_ng_container_2_button_2_Template, 3, 15, "button", 5);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r1.hasChildren);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !item_r1.hasChildren);
} }
function BsActionButtons_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsActionButtons_ng_container_0_a_1_Template, 1, 2, "a", 1);
    i0.ɵɵtemplate(2, BsActionButtons_ng_container_0_ng_container_2_Template, 3, 2, "ng-container", 2);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r1.href);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !item_r1.href);
} }
export class BsActionButtons {
    set options(opts) {
        this._options = opts;
    }
    get options() {
        return this._options;
    }
    get sizeClass() {
        return this._options.size ? `btn-${this._options.size}` : "";
    }
    get styleClass() {
        return this._options.style ? `btn-${this._options.style}` : "btn-light";
    }
    get itemsVisible() {
        // hidden items are not displayed
        return (Array.isArray(this._options.items)) ? this._options.items.filter(item => !item.hidden) : this._options.items.hidden ? [] : [this._options.items];
    }
    getActionItemOptions(item) {
        return (Object.assign(Object.assign({}, this._options), { item, inMenu: false }));
    }
    itemClick(item, event) {
        if (!item.disabled && item.action) {
            item.action(item, event);
        }
        if (item.href === "#" || (!!item.href && item.disabled)) {
            event.preventDefault();
        }
    }
}
BsActionButtons.ɵfac = function BsActionButtons_Factory(t) { return new (t || BsActionButtons)(); };
BsActionButtons.ɵcmp = i0.ɵɵdefineComponent({ type: BsActionButtons, selectors: [["", "sq-action-buttons", ""]], inputs: { options: ["sq-action-buttons", "options"] }, attrs: _c0, decls: 1, vars: 1, consts: [[4, "ngFor", "ngForOf"], ["class", "btn-text", 3, "sq-action-item", "click", 4, "ngIf"], [4, "ngIf"], [1, "btn-text", 3, "sq-action-item", "click"], ["class", "btn-group dropdown", 3, "sq-action-item", 4, "ngIf"], ["type", "button", 3, "class", "sq-action-item", "sqTooltip", "click", 4, "ngIf"], [1, "btn-group", "dropdown", 3, "sq-action-item"], ["type", "button", 3, "sq-action-item", "sqTooltip", "click"]], template: function BsActionButtons_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsActionButtons_ng_container_0_Template, 3, 2, "ng-container", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngForOf", ctx.itemsVisible);
    } }, directives: [i1.NgForOf, i1.NgIf, i2.BsActionItem, i3.TooltipDirective], pipes: [i4.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsActionButtons, [{
        type: Component,
        args: [{
                selector: "[sq-action-buttons]",
                templateUrl: "./action-buttons.html"
            }]
    }], null, { options: [{
            type: Input,
            args: ["sq-action-buttons"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLWJ1dHRvbnMuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9hY3Rpb24vIiwic291cmNlcyI6WyJib290c3RyYXAvYWN0aW9uLWJ1dHRvbnMvYWN0aW9uLWJ1dHRvbnMudHMiLCJib290c3RyYXAvYWN0aW9uLWJ1dHRvbnMvYWN0aW9uLWJ1dHRvbnMuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0lDQzNDLDRCQUFzSztJQUFoRiw2UEFBaUM7SUFBK0MsaUJBQUk7Ozs7SUFBbEQscUVBQTZDO0lBQS9ILGlGQUErQzs7O0lBRWpGLHlCQUE2Rzs7OztJQUFwRCxxRUFBNkM7Ozs7SUFDdEcsaUNBQXVXO0lBQTFKLDBSQUFpQzs7O0lBQXlILGlCQUFTOzs7O0lBQWhVLCtKQUE4RztJQUFpRixpR0FBeUQ7SUFBekkscUVBQTZDO0lBQTZGLHlGQUE2RDs7O0lBRjFXLDZCQUNJO0lBQUEsOEZBQTZHO0lBQzdHLHFHQUFnWDtJQUNwWCwwQkFBZTs7O0lBRkwsZUFBc0I7SUFBdEIsMENBQXNCO0lBQ25CLGVBQXVCO0lBQXZCLDJDQUF1Qjs7O0lBSnhDLDZCQUNJO0lBQUEsMkVBQTBLO0lBQzFLLGlHQUdlO0lBQ25CLDBCQUFlOzs7SUFMUCxlQUFlO0lBQWYsbUNBQWU7SUFDSixlQUFnQjtJQUFoQixvQ0FBZ0I7O0FEZW5DLE1BQU0sT0FBTyxlQUFlO0lBR3hCLElBQ0ksT0FBTyxDQUFFLElBQTBCO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2pFLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztJQUM1RSxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ1osaUNBQWlDO1FBQ2pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0osQ0FBQztJQUVELG9CQUFvQixDQUFDLElBQVk7UUFDN0IsT0FBTyxpQ0FBSyxJQUFJLENBQUMsUUFBUSxLQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxJQUFFLENBQUM7SUFDckQsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFZLEVBQUUsS0FBYztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNyRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDOzs4RUFuQ1EsZUFBZTtvREFBZixlQUFlO1FDakI1QixrRkFNZTs7UUFOZ0IsMENBQWU7O2tERGlCakMsZUFBZTtjQUozQixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsV0FBVyxFQUFFLHVCQUF1QjthQUN2QztnQkFLTyxPQUFPO2tCQURWLEtBQUs7bUJBQUMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtBY3Rpb25JdGVtT3B0aW9uc30gZnJvbSBcIi4uXCI7XG5pbXBvcnQge0FjdGlvbn0gZnJvbSBcIi4uLy4uL2FjdGlvblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbkJ1dHRvbnNPcHRpb25zIHtcbiAgICBpdGVtczogQWN0aW9uW10gfCBBY3Rpb247XG4gICAgc2l6ZT86IHN0cmluZztcbiAgICBzdHlsZT86IHN0cmluZztcbiAgICBhdXRvQWRqdXN0PzogYm9vbGVhbjtcbiAgICBhdXRvQWRqdXN0QnJlYWtwb2ludD86IHN0cmluZztcbiAgICByaWdodEFsaWduZWQ/OiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJbc3EtYWN0aW9uLWJ1dHRvbnNdXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9hY3Rpb24tYnV0dG9ucy5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQnNBY3Rpb25CdXR0b25zIHtcbiAgICBwcml2YXRlIF9vcHRpb25zOiBBY3Rpb25CdXR0b25zT3B0aW9ucztcbiAgICBcbiAgICBASW5wdXQoXCJzcS1hY3Rpb24tYnV0dG9uc1wiKVxuICAgIHNldCBvcHRpb25zIChvcHRzOiBBY3Rpb25CdXR0b25zT3B0aW9ucykge1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0cztcbiAgICB9XG4gICAgZ2V0IG9wdGlvbnMoKTogQWN0aW9uQnV0dG9uc09wdGlvbnMge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgICB9XG5cbiAgICBnZXQgc2l6ZUNsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zLnNpemUgPyBgYnRuLSR7dGhpcy5fb3B0aW9ucy5zaXplfWAgOiBcIlwiO1xuICAgIH1cblxuICAgIGdldCBzdHlsZUNsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zLnN0eWxlID8gYGJ0bi0ke3RoaXMuX29wdGlvbnMuc3R5bGV9YCA6IFwiYnRuLWxpZ2h0XCI7XG4gICAgfVxuICAgIFxuICAgIGdldCBpdGVtc1Zpc2libGUoKTogQWN0aW9uW10ge1xuICAgICAgICAvLyBoaWRkZW4gaXRlbXMgYXJlIG5vdCBkaXNwbGF5ZWRcbiAgICAgICAgcmV0dXJuIChBcnJheS5pc0FycmF5KHRoaXMuX29wdGlvbnMuaXRlbXMpKSA/IHRoaXMuX29wdGlvbnMuaXRlbXMuZmlsdGVyKGl0ZW0gPT4gIWl0ZW0uaGlkZGVuKSA6IHRoaXMuX29wdGlvbnMuaXRlbXMuaGlkZGVuID8gW10gOiBbdGhpcy5fb3B0aW9ucy5pdGVtc107XG4gICAgfVxuICAgIFxuICAgIGdldEFjdGlvbkl0ZW1PcHRpb25zKGl0ZW06IEFjdGlvbik6IEFjdGlvbkl0ZW1PcHRpb25zIHtcbiAgICAgICAgcmV0dXJuICh7Li4udGhpcy5fb3B0aW9ucywgaXRlbSwgaW5NZW51OiBmYWxzZX0pO1xuICAgIH1cblxuICAgIGl0ZW1DbGljayhpdGVtOiBBY3Rpb24sIGV2ZW50OiBVSUV2ZW50KSB7XG4gICAgICAgIGlmICghaXRlbS5kaXNhYmxlZCAmJiBpdGVtLmFjdGlvbikge1xuICAgICAgICAgICAgaXRlbS5hY3Rpb24oaXRlbSwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtLmhyZWYgPT09IFwiI1wiIHx8ICghIWl0ZW0uaHJlZiAmJiBpdGVtLmRpc2FibGVkKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCI8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zVmlzaWJsZVwiPlxuICAgIDxhICpuZ0lmPVwiaXRlbS5ocmVmXCIgY2xhc3M9XCJidG4tdGV4dFwiIFthdHRyLmhyZWZdPVwiIWl0ZW0uZGlzYWJsZWQgPyBpdGVtLmhyZWYgOiBudWxsXCIgKGNsaWNrKT1cIml0ZW1DbGljayhpdGVtLCAkZXZlbnQpXCIgW3NxLWFjdGlvbi1pdGVtXT1cImdldEFjdGlvbkl0ZW1PcHRpb25zKGl0ZW0pXCI+PC9hPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXRlbS5ocmVmXCI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJpdGVtLmhhc0NoaWxkcmVuXCIgY2xhc3M9XCJidG4tZ3JvdXAgZHJvcGRvd25cIiBbc3EtYWN0aW9uLWl0ZW1dPVwiZ2V0QWN0aW9uSXRlbU9wdGlvbnMoaXRlbSlcIj48L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiAqbmdJZj1cIiFpdGVtLmhhc0NoaWxkcmVuXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIHt7c3R5bGVDbGFzc319IHt7c2l6ZUNsYXNzfX0ge3tpdGVtLnNlbGVjdGVkID8gJ2FjdGl2ZScgOiAnJ319IHt7aXRlbS5kaXNhYmxlZCA/ICdkaXNhYmxlZCcgOiAnJ319XCIgW3NxLWFjdGlvbi1pdGVtXT1cImdldEFjdGlvbkl0ZW1PcHRpb25zKGl0ZW0pXCIgKGNsaWNrKT1cIml0ZW1DbGljayhpdGVtLCAkZXZlbnQpXCIgc3FUb29sdGlwPVwie3tpdGVtLnRpdGxlIHwgc3FNZXNzYWdlOml0ZW0ubWVzc2FnZVBhcmFtc319XCIgW2F0dHIuYXJpYS1sYWJlbF09XCJpdGVtLnRpdGxlIHwgc3FNZXNzYWdlOml0ZW0ubWVzc2FnZVBhcmFtc1wiPjwvYnV0dG9uPlxuICAgIDwvbmctY29udGFpbmVyPlxuPC9uZy1jb250YWluZXI+Il19