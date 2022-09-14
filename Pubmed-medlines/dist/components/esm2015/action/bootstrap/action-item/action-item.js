import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/components/utils";
import * as i2 from "@angular/common";
import * as i3 from "../action-item-content/action-item-content";
import * as i4 from "../dropdown.directive";
import * as i5 from "../dropdown-menu/dropdown-menu";
import * as i6 from "@sinequa/core/intl";
const _c0 = ["sq-action-item", ""];
function BsActionItem_ng_container_0_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("click", function BsActionItem_ng_container_0_button_1_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r10 = i0.ɵɵnextContext(2); return ctx_r10.click($event); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelement(3, "sq-action-item-content", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMapInterpolate3("btn ", ctx_r4.styleClass, " ", ctx_r4.sizeClass, " ", ctx_r4.options.item.disabled ? "disabled" : "", "");
    i0.ɵɵpropertyInterpolate("sqTooltip", i0.ɵɵpipeBind2(1, 9, ctx_r4.itemTitle, ctx_r4.itemMessageParams));
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(2, 12, ctx_r4.itemTitle, ctx_r4.itemMessageParams));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("item", ctx_r4.options.item)("text", ctx_r4.itemText);
} }
function BsActionItem_ng_container_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function BsActionItem_ng_container_0_ng_template_3_div_0_sq_action_item_content_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "sq-action-item-content", 8);
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("item", ctx_r13.options.item)("text", ctx_r13.itemText);
} }
function BsActionItem_ng_container_0_ng_template_3_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, BsActionItem_ng_container_0_ng_template_3_div_0_sq_action_item_content_1_Template, 1, 2, "sq-action-item-content", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(3);
    i0.ɵɵclassMapInterpolate1("btn-text ", ctx_r12.sizeClass, "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r12.hasAction);
} }
function BsActionItem_ng_container_0_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, BsActionItem_ng_container_0_ng_template_3_div_0_Template, 2, 4, "div", 9);
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngIf", !ctx_r7.hasAction);
} }
function BsActionItem_ng_container_0_ng_template_5_sq_action_item_content_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "sq-action-item-content", 8);
} if (rf & 2) {
    const ctx_r14 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("item", ctx_r14.options.item)("text", ctx_r14.itemText);
} }
function BsActionItem_ng_container_0_ng_template_5_ul_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ul", 12);
} if (rf & 2) {
    const ctx_r15 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("sq-dropdown-menu", ctx_r15.dropdownMenuOptions);
} }
function BsActionItem_ng_container_0_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 10);
    i0.ɵɵlistener("touchstart", function BsActionItem_ng_container_0_ng_template_5_Template_button_touchstart_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r16 = i0.ɵɵnextContext(2); return ctx_r16.touchstart(); })("mousedown", function BsActionItem_ng_container_0_ng_template_5_Template_button_mousedown_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r18 = i0.ɵɵnextContext(2); return ctx_r18.mousedown(); })("focusin", function BsActionItem_ng_container_0_ng_template_5_Template_button_focusin_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r19 = i0.ɵɵnextContext(2); return ctx_r19.focusin(); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵtemplate(3, BsActionItem_ng_container_0_ng_template_5_sq_action_item_content_3_Template, 1, 2, "sq-action-item-content", 1);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, BsActionItem_ng_container_0_ng_template_5_ul_4_Template, 1, 1, "ul", 11);
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMapInterpolate2("btn ", ctx_r9.styleClass, " dropdown-toggle ", ctx_r9.sizeClass, "");
    i0.ɵɵpropertyInterpolate("sqTooltip", i0.ɵɵpipeBind2(1, 8, ctx_r9.itemTitle, ctx_r9.itemMessageParams));
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(2, 11, ctx_r9.itemTitle, ctx_r9.itemMessageParams));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r9.hasAction);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.showDropdown);
} }
function BsActionItem_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsActionItem_ng_container_0_button_1_Template, 4, 15, "button", 3);
    i0.ɵɵtemplate(2, BsActionItem_ng_container_0_ng_container_2_Template, 1, 0, "ng-container", 4);
    i0.ɵɵtemplate(3, BsActionItem_ng_container_0_ng_template_3_Template, 1, 1, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵtemplate(5, BsActionItem_ng_container_0_ng_template_5_Template, 5, 14, "ng-template", null, 6, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const _r6 = i0.ɵɵreference(4);
    const _r8 = i0.ɵɵreference(6);
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.hasAction);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.options.item.flattenable && (ctx_r0.options.item.children == null ? null : ctx_r0.options.item.children.length) === 1)("ngIfThen", _r6)("ngIfElse", _r8);
} }
function BsActionItem_sq_action_item_content_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "sq-action-item-content", 8);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("item", ctx_r1.options.item)("text", ctx_r1.itemText);
} }
function BsActionItem_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "a", 13);
    i0.ɵɵlistener("click", function BsActionItem_ng_container_2_Template_a_click_1_listener($event) { i0.ɵɵrestoreView(_r21); const ctx_r20 = i0.ɵɵnextContext(); return ctx_r20.click($event); });
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵelement(4, "sq-action-item-content", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(5, "ul", 12);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassMapInterpolate2("", ctx_r2.options.inMenu ? "nav-link" : "dropdown-item", " dropdown-toggle ", ctx_r2.options.item.disabled ? "disabled" : "", "");
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind2(2, 9, ctx_r2.itemTitle, ctx_r2.itemMessageParams));
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(3, 12, ctx_r2.itemTitle, ctx_r2.itemMessageParams));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("item", ctx_r2.options.item)("text", ctx_r2.itemText);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("sq-dropdown-menu", ctx_r2.dropdownMenuOptions);
} }
function BsActionItem_a_3_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 14);
    i0.ɵɵlistener("click", function BsActionItem_a_3_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r23); const ctx_r22 = i0.ɵɵnextContext(); return ctx_r22.click($event); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelement(3, "sq-action-item-content", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵclassMapInterpolate2("", ctx_r3.options.inMenu ? "nav-link" : "dropdown-item", " ", ctx_r3.options.item.disabled ? "disabled" : "", "");
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind2(1, 8, ctx_r3.itemTitle, ctx_r3.itemMessageParams));
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(2, 11, ctx_r3.itemTitle, ctx_r3.itemMessageParams));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("item", ctx_r3.options.item)("text", ctx_r3.itemText);
} }
export class BsActionItem {
    constructor(uiService, elementRef, cdRef) {
        this.uiService = uiService;
        this.elementRef = elementRef;
        this.cdRef = cdRef;
        this.collapseBreakpoint = "md";
    }
    get haveItem() {
        return !!this.options.item;
    }
    get isVisible() {
        return this.haveItem && !this.options.item.hidden;
    }
    get hasAction() {
        return this.haveItem && !!this.options.item.action;
    }
    get isDropdownButton() {
        return this.isVisible && !this.inListItem && this.options.item.hasChildren;
    }
    get isButton() {
        return this.isVisible && !this.inListItem && !this.options.item.hasChildren && this.hasAction;
    }
    get isDropdownListItem() {
        return this.isVisible && this.inListItem && this.options.item.hasChildren;
    }
    get isListItem() {
        return this.isVisible && this.inListItem && !this.options.item.hasChildren && this.hasAction;
    }
    get haveSpace() {
        if (this.uiService.screenSizeIsGreaterOrEqual(this.autoAdjustBreakpoint)) {
            return true;
        }
        if (this.inListItem && this.uiService.screenSizeIsLess(this.collapseBreakpoint)) {
            return true;
        }
        return false;
    }
    get haveIcon() {
        return !!this.options.item.icon || !!this.options.item.iconAfter;
    }
    get itemText() {
        if (!this.haveItem) {
            return "";
        }
        const text = this.options.item.text || "";
        if (this.options.autoAdjust && this.haveIcon) {
            return this.haveSpace ? text : "";
        }
        else {
            return text;
        }
    }
    get itemTitle() {
        if (!this.haveItem) {
            return "";
        }
        const text = this.options.item.text || "";
        const title = this.options.item.title || "";
        if (this.options.autoAdjust && this.haveIcon) {
            return this.haveSpace ? (title !== text ? title : "") : title || text;
        }
        else {
            return title;
        }
    }
    get itemMessageParams() {
        if (!this.haveItem) {
            return null;
        }
        return this.options.item.messageParams;
    }
    get sizeClass() {
        return this.options.size ? `btn-${this.options.size}` : "";
    }
    get styleClass() {
        return this.options.style ? `btn-${this.options.style}` : "btn-light";
    }
    get dropdownMenuOptions() {
        return (Object.assign(Object.assign({}, this.options), { showMenuClass: 'show' }));
    }
    ngAfterViewInit() {
        this.dropdownButton = this.elementRef.nativeElement.querySelector("div.dropdown");
        this.dropdownListItem = this.elementRef.nativeElement.querySelector("li.dropdown-toggle");
    }
    ngOnInit() {
        this.inListItem = (this.elementRef.nativeElement.nodeName === "LI");
        if (this.options.item.init) {
            this.options.item.init(this.options.item);
        }
        this.autoAdjustBreakpoint = this.options.autoAdjustBreakpoint;
        this.uiService.resizeEvent.subscribe(e => this.cdRef.detectChanges());
    }
    ngOnDestroy() {
        if (this.options.item.destroy) {
            this.options.item.destroy(this.options.item);
        }
    }
    click(event) {
        if (!this.options.item.disabled) {
            if (this.options.item.action) {
                this.options.item.action(this.options.item, event);
            }
            if (this.options.item.toggle && (this.isDropdownButton || this.isDropdownListItem)) {
                const openElement = this.dropdownButton || (this.dropdownListItem ? this.dropdownListItem.parentElement : null);
                if (openElement) {
                    this.options.item.toggle(this.options.item, !openElement.classList.contains("open"));
                }
            }
        }
    }
    touchstart() {
        this.showDropdown = true;
    }
    mousedown() {
        this.showDropdown = true;
    }
    focusin() {
        this.showDropdown = true;
    }
}
BsActionItem.ɵfac = function BsActionItem_Factory(t) { return new (t || BsActionItem)(i0.ɵɵdirectiveInject(i1.UIService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
BsActionItem.ɵcmp = i0.ɵɵdefineComponent({ type: BsActionItem, selectors: [["", "sq-action-item", ""]], inputs: { options: ["sq-action-item", "options"], collapseBreakpoint: "collapseBreakpoint" }, attrs: _c0, decls: 4, vars: 4, consts: [[4, "ngIf"], [3, "item", "text", 4, "ngIf"], ["href", "javascript:void(0)", "role", "button", 3, "class", "title", "click", 4, "ngIf"], ["type", "button", 3, "class", "sqTooltip", "click", 4, "ngIf"], [4, "ngIf", "ngIfThen", "ngIfElse"], ["flattened", ""], ["unflattened", ""], ["type", "button", 3, "sqTooltip", "click"], [3, "item", "text"], [3, "class", 4, "ngIf"], ["type", "button", "data-toggle", "dropdown", 3, "sqTooltip", "touchstart", "mousedown", "focusin"], [3, "sq-dropdown-menu", 4, "ngIf"], [3, "sq-dropdown-menu"], ["href", "javascript:void(0)", "data-toggle", "dropdown", "role", "button", "aria-haspopup", "true", "aria-expanded", "false", 3, "title", "click"], ["href", "javascript:void(0)", "role", "button", 3, "title", "click"]], template: function BsActionItem_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsActionItem_ng_container_0_Template, 7, 4, "ng-container", 0);
        i0.ɵɵtemplate(1, BsActionItem_sq_action_item_content_1_Template, 1, 2, "sq-action-item-content", 1);
        i0.ɵɵtemplate(2, BsActionItem_ng_container_2_Template, 6, 15, "ng-container", 0);
        i0.ɵɵtemplate(3, BsActionItem_a_3_Template, 4, 14, "a", 2);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.isDropdownButton);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isButton);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isDropdownListItem);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isListItem);
    } }, directives: [i2.NgIf, i1.TooltipDirective, i3.BsActionItemContent, i4.BsDropdownDirective, i5.BsDropdownMenu], pipes: [i6.MessagePipe], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsActionItem, [{
        type: Component,
        args: [{
                selector: "[sq-action-item]",
                templateUrl: "./action-item.html",
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: i1.UIService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, { options: [{
            type: Input,
            args: ["sq-action-item"]
        }], collapseBreakpoint: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLWl0ZW0uanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9hY3Rpb24vIiwic291cmNlcyI6WyJib290c3RyYXAvYWN0aW9uLWl0ZW0vYWN0aW9uLWl0ZW0udHMiLCJib290c3RyYXAvYWN0aW9uLWl0ZW0vYWN0aW9uLWl0ZW0uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBcUMsdUJBQXVCLEVBQW9CLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7OztJQ0UxSCxpQ0FDSTtJQUR5SCw2TUFBdUI7OztJQUNoSiw0Q0FBeUY7SUFDN0YsaUJBQVM7OztJQUZpQixvSUFBb0Y7SUFBdUMsdUdBQXVEO0lBQUMsK0ZBQTJEO0lBQzVPLGVBQXFCO0lBQXJCLDBDQUFxQix5QkFBQTs7O0lBRWpELHdCQUFzSTs7O0lBRzlILDRDQUE0Rzs7O0lBQWpFLDJDQUFxQiwwQkFBQTs7O0lBRHBFLDJCQUNJO0lBQUEsc0lBQTRHO0lBQ2hILGlCQUFNOzs7SUFGa0IsNkRBQThCO0lBQ3pCLGVBQWdCO0lBQWhCLHlDQUFnQjs7O0lBRDdDLDBGQUVNOzs7SUFGQSx3Q0FBZ0I7OztJQU1sQiw0Q0FBNEc7OztJQUFqRSwyQ0FBcUIsMEJBQUE7OztJQUVwRSx5QkFBdUU7OztJQUE5Qyw4REFBd0M7Ozs7SUFIakUsa0NBQ0k7SUFEc04scU5BQTJCLHFNQUFBLCtMQUFBOzs7SUFDalAsZ0lBQTRHO0lBQ2hILGlCQUFTO0lBQ1QseUZBQXVFOzs7SUFIL0QsK0ZBQXdEO0lBQXNDLHVHQUF1RDtJQUFDLCtGQUEyRDtJQUM1TCxlQUFnQjtJQUFoQix3Q0FBZ0I7SUFFeEMsZUFBa0I7SUFBbEIsMENBQWtCOzs7SUFkL0IsNkJBQ0k7SUFBQSxtRkFFUztJQUNULDhGQUFzSTtJQUN0SSw2SEFJYztJQUNkLDhIQUtjO0lBQ2xCLDBCQUFlOzs7OztJQWZGLGVBQWU7SUFBZix1Q0FBZTtJQUdULGVB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SUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUM3QixDQUFDOzt3RUFuSlEsWUFBWTtpREFBWixZQUFZO1FDcEJ6QiwrRUFnQmU7UUFFZixtR0FBMEc7UUFFMUcsZ0ZBS2U7UUFHZiwwREFFSTs7UUE5QlcsMkNBQXNCO1FBa0JaLGVBQWM7UUFBZCxtQ0FBYztRQUV4QixlQUF3QjtRQUF4Qiw2Q0FBd0I7UUFRbkMsZUFBZ0I7UUFBaEIscUNBQWdCOztrRERSUCxZQUFZO2NBTHhCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixXQUFXLEVBQUUsb0JBQW9CO2dCQUNqQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNsRDtxSEFFNEIsT0FBTztrQkFBL0IsS0FBSzttQkFBQyxnQkFBZ0I7WUFDZCxrQkFBa0I7a0JBQTFCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgRWxlbWVudFJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtBY3Rpb259IGZyb20gXCIuLi8uLi9hY3Rpb25cIjtcbmltcG9ydCB7VUlTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy91dGlsc1wiO1xuaW1wb3J0IHtEcm9wZG93bk1lbnVPcHRpb25zfSBmcm9tIFwiLi4vZHJvcGRvd24tbWVudS9kcm9wZG93bi1tZW51XCI7XG5cblxuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25JdGVtT3B0aW9ucyB7XG4gICAgaXRlbTogQWN0aW9uO1xuICAgIHNpemU/OiBzdHJpbmc7XG4gICAgc3R5bGU/OiBzdHJpbmc7XG4gICAgYXV0b0FkanVzdD86IGJvb2xlYW47XG4gICAgYXV0b0FkanVzdEJyZWFrcG9pbnQ/OiBzdHJpbmc7XG4gICAgaW5NZW51OiBib29sZWFuO1xuICAgIHJpZ2h0QWxpZ25lZD86IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIltzcS1hY3Rpb24taXRlbV1cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FjdGlvbi1pdGVtLmh0bWxcIixcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCc0FjdGlvbkl0ZW0gaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICAgIEBJbnB1dChcInNxLWFjdGlvbi1pdGVtXCIpIG9wdGlvbnM6IEFjdGlvbkl0ZW1PcHRpb25zO1xuICAgIEBJbnB1dCgpIGNvbGxhcHNlQnJlYWtwb2ludDogc3RyaW5nID0gXCJtZFwiO1xuICAgIGluTGlzdEl0ZW06IGJvb2xlYW47XG4gICAgZHJvcGRvd25CdXR0b246IEVsZW1lbnQ7XG4gICAgZHJvcGRvd25MaXN0SXRlbTogRWxlbWVudDtcbiAgICBhdXRvQWRqdXN0QnJlYWtwb2ludD86IHN0cmluZztcbiAgICBzaG93RHJvcGRvd246IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSB1aVNlcnZpY2U6IFVJU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIH1cblxuICAgIGdldCBoYXZlSXRlbSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5vcHRpb25zLml0ZW07XG4gICAgfVxuXG4gICAgZ2V0IGlzVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGF2ZUl0ZW0gJiYgIXRoaXMub3B0aW9ucy5pdGVtLmhpZGRlbjtcbiAgICB9XG5cbiAgICBnZXQgaGFzQWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXZlSXRlbSAmJiAhIXRoaXMub3B0aW9ucy5pdGVtLmFjdGlvbjtcbiAgICB9XG5cbiAgICBnZXQgaXNEcm9wZG93bkJ1dHRvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWaXNpYmxlICYmICF0aGlzLmluTGlzdEl0ZW0gJiYgdGhpcy5vcHRpb25zLml0ZW0uaGFzQ2hpbGRyZW47XG4gICAgfVxuXG4gICAgZ2V0IGlzQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1Zpc2libGUgJiYgIXRoaXMuaW5MaXN0SXRlbSAmJiAhdGhpcy5vcHRpb25zLml0ZW0uaGFzQ2hpbGRyZW4gJiYgdGhpcy5oYXNBY3Rpb247XG4gICAgfVxuXG4gICAgZ2V0IGlzRHJvcGRvd25MaXN0SXRlbSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWaXNpYmxlICYmIHRoaXMuaW5MaXN0SXRlbSAmJiB0aGlzLm9wdGlvbnMuaXRlbS5oYXNDaGlsZHJlbjtcbiAgICB9XG5cbiAgICBnZXQgaXNMaXN0SXRlbSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWaXNpYmxlICYmIHRoaXMuaW5MaXN0SXRlbSAmJiAhdGhpcy5vcHRpb25zLml0ZW0uaGFzQ2hpbGRyZW4gJiYgdGhpcy5oYXNBY3Rpb247XG4gICAgfVxuXG4gICAgZ2V0IGhhdmVTcGFjZSgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMudWlTZXJ2aWNlLnNjcmVlblNpemVJc0dyZWF0ZXJPckVxdWFsKHRoaXMuYXV0b0FkanVzdEJyZWFrcG9pbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pbkxpc3RJdGVtICYmIHRoaXMudWlTZXJ2aWNlLnNjcmVlblNpemVJc0xlc3ModGhpcy5jb2xsYXBzZUJyZWFrcG9pbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0IGhhdmVJY29uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLm9wdGlvbnMuaXRlbS5pY29uIHx8ICEhdGhpcy5vcHRpb25zLml0ZW0uaWNvbkFmdGVyO1xuICAgIH1cblxuICAgIGdldCBpdGVtVGV4dCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuaGF2ZUl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRleHQgPSB0aGlzLm9wdGlvbnMuaXRlbS50ZXh0IHx8IFwiXCI7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b0FkanVzdCAmJiB0aGlzLmhhdmVJY29uKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXZlU3BhY2UgPyB0ZXh0IDogXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGl0ZW1UaXRsZSgpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuaGF2ZUl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRleHQgPSB0aGlzLm9wdGlvbnMuaXRlbS50ZXh0IHx8IFwiXCI7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5vcHRpb25zLml0ZW0udGl0bGUgfHwgXCJcIjtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvQWRqdXN0ICYmIHRoaXMuaGF2ZUljb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhdmVTcGFjZSA/ICh0aXRsZSAhPT0gdGV4dCA/IHRpdGxlIDogXCJcIikgOiB0aXRsZSB8fCB0ZXh0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRpdGxlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGl0ZW1NZXNzYWdlUGFyYW1zKCk6IGFueSB7XG4gICAgICAgIGlmICghdGhpcy5oYXZlSXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5pdGVtLm1lc3NhZ2VQYXJhbXM7XG4gICAgfVxuXG4gICAgZ2V0IHNpemVDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNpemUgPyBgYnRuLSR7dGhpcy5vcHRpb25zLnNpemV9YCA6IFwiXCI7XG4gICAgfVxuXG4gICAgZ2V0IHN0eWxlQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zdHlsZSA/IGBidG4tJHt0aGlzLm9wdGlvbnMuc3R5bGV9YCA6IFwiYnRuLWxpZ2h0XCI7XG4gICAgfVxuICAgIFxuICAgIGdldCBkcm9wZG93bk1lbnVPcHRpb25zKCk6IERyb3Bkb3duTWVudU9wdGlvbnMge1xuICAgICAgICByZXR1cm4gKHsuLi50aGlzLm9wdGlvbnMsIHNob3dNZW51Q2xhc3M6ICdzaG93J30pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5kcm9wZG93bkJ1dHRvbiA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkaXYuZHJvcGRvd25cIik7XG4gICAgICAgIHRoaXMuZHJvcGRvd25MaXN0SXRlbSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJsaS5kcm9wZG93bi10b2dnbGVcIik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5MaXN0SXRlbSA9ICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ub2RlTmFtZSA9PT0gXCJMSVwiKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pdGVtLmluaXQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pdGVtLmluaXQodGhpcy5vcHRpb25zLml0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXV0b0FkanVzdEJyZWFrcG9pbnQgPSB0aGlzLm9wdGlvbnMuYXV0b0FkanVzdEJyZWFrcG9pbnQ7XG4gICAgICAgIHRoaXMudWlTZXJ2aWNlLnJlc2l6ZUV2ZW50LnN1YnNjcmliZShlID0+IHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pdGVtLmRlc3Ryb3kpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pdGVtLmRlc3Ryb3kodGhpcy5vcHRpb25zLml0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xpY2soZXZlbnQ6IFVJRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuaXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pdGVtLmFjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pdGVtLmFjdGlvbih0aGlzLm9wdGlvbnMuaXRlbSwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pdGVtLnRvZ2dsZSAmJiAodGhpcy5pc0Ryb3Bkb3duQnV0dG9uIHx8IHRoaXMuaXNEcm9wZG93bkxpc3RJdGVtKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wZW5FbGVtZW50ID0gdGhpcy5kcm9wZG93bkJ1dHRvbiB8fCAodGhpcy5kcm9wZG93bkxpc3RJdGVtID8gdGhpcy5kcm9wZG93bkxpc3RJdGVtLnBhcmVudEVsZW1lbnQgOiBudWxsKTtcbiAgICAgICAgICAgICAgICBpZiAob3BlbkVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLml0ZW0udG9nZ2xlKHRoaXMub3B0aW9ucy5pdGVtLCAhb3BlbkVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwib3BlblwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG91Y2hzdGFydCgpIHtcbiAgICAgICAgdGhpcy5zaG93RHJvcGRvd24gPSB0cnVlO1xuICAgIH1cblxuICAgIG1vdXNlZG93bigpIHtcbiAgICAgICAgdGhpcy5zaG93RHJvcGRvd24gPSB0cnVlO1xuICAgIH1cblxuICAgIGZvY3VzaW4oKSB7XG4gICAgICAgIHRoaXMuc2hvd0Ryb3Bkb3duID0gdHJ1ZTtcbiAgICB9XG59IiwiPCEtLSBkcm9wZG93biBidXR0b24gLS0+XG48bmctY29udGFpbmVyICpuZ0lmPVwiaXNEcm9wZG93bkJ1dHRvblwiPlxuICAgIDxidXR0b24gKm5nSWY9XCJoYXNBY3Rpb25cIiBjbGFzcz1cImJ0biB7e3N0eWxlQ2xhc3N9fSB7e3NpemVDbGFzc319IHt7b3B0aW9ucy5pdGVtLmRpc2FibGVkID8gJ2Rpc2FibGVkJyA6ICcnfX1cIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNsaWNrKCRldmVudClcIiBzcVRvb2x0aXA9XCJ7e2l0ZW1UaXRsZSB8IHNxTWVzc2FnZTppdGVtTWVzc2FnZVBhcmFtc319XCIgW2F0dHIuYXJpYS1sYWJlbF09XCJpdGVtVGl0bGUgfCBzcU1lc3NhZ2U6aXRlbU1lc3NhZ2VQYXJhbXNcIj5cbiAgICAgICAgPHNxLWFjdGlvbi1pdGVtLWNvbnRlbnQgW2l0ZW1dPVwib3B0aW9ucy5pdGVtXCIgW3RleHRdPVwiaXRlbVRleHRcIj48L3NxLWFjdGlvbi1pdGVtLWNvbnRlbnQ+XG4gICAgPC9idXR0b24+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm9wdGlvbnMuaXRlbS5mbGF0dGVuYWJsZSAmJiBvcHRpb25zLml0ZW0uY2hpbGRyZW4/Lmxlbmd0aCA9PT0gMTsgdGhlbiBmbGF0dGVuZWQgZWxzZSB1bmZsYXR0ZW5lZFwiPjwvbmctY29udGFpbmVyPlxuICAgIDxuZy10ZW1wbGF0ZSAjZmxhdHRlbmVkPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiIWhhc0FjdGlvblwiIGNsYXNzPVwiYnRuLXRleHQge3tzaXplQ2xhc3N9fVwiPlxuICAgICAgICAgICAgPHNxLWFjdGlvbi1pdGVtLWNvbnRlbnQgKm5nSWY9XCIhaGFzQWN0aW9uXCIgW2l0ZW1dPVwib3B0aW9ucy5pdGVtXCIgW3RleHRdPVwiaXRlbVRleHRcIj48L3NxLWFjdGlvbi1pdGVtLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICN1bmZsYXR0ZW5lZD5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biB7e3N0eWxlQ2xhc3N9fSBkcm9wZG93bi10b2dnbGUge3tzaXplQ2xhc3N9fVwiIHR5cGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgc3FUb29sdGlwPVwie3tpdGVtVGl0bGUgfCBzcU1lc3NhZ2U6aXRlbU1lc3NhZ2VQYXJhbXN9fVwiIFthdHRyLmFyaWEtbGFiZWxdPVwiaXRlbVRpdGxlIHwgc3FNZXNzYWdlOml0ZW1NZXNzYWdlUGFyYW1zXCIgKHRvdWNoc3RhcnQpPVwidG91Y2hzdGFydCgpXCIgKG1vdXNlZG93bik9XCJtb3VzZWRvd24oKVwiIChmb2N1c2luKT1cImZvY3VzaW4oKVwiPlxuICAgICAgICAgICAgPHNxLWFjdGlvbi1pdGVtLWNvbnRlbnQgKm5nSWY9XCIhaGFzQWN0aW9uXCIgW2l0ZW1dPVwib3B0aW9ucy5pdGVtXCIgW3RleHRdPVwiaXRlbVRleHRcIj48L3NxLWFjdGlvbi1pdGVtLWNvbnRlbnQ+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8dWwgKm5nSWY9XCJzaG93RHJvcGRvd25cIiBbc3EtZHJvcGRvd24tbWVudV09XCJkcm9wZG93bk1lbnVPcHRpb25zXCI+PC91bD5cbiAgICA8L25nLXRlbXBsYXRlPlxuPC9uZy1jb250YWluZXI+XG48IS0tIGJ1dHRvbiAtLT5cbjxzcS1hY3Rpb24taXRlbS1jb250ZW50ICpuZ0lmPVwiaXNCdXR0b25cIiBbaXRlbV09XCJvcHRpb25zLml0ZW1cIiBbdGV4dF09XCJpdGVtVGV4dFwiPjwvc3EtYWN0aW9uLWl0ZW0tY29udGVudD5cbjwhLS0gZHJvcGRvd24gbGlzdCBpdGVtIC0tPlxuPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzRHJvcGRvd25MaXN0SXRlbVwiPlxuICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwiY2xpY2soJGV2ZW50KVwiIGNsYXNzPVwie3tvcHRpb25zLmluTWVudSA/ICduYXYtbGluaycgOiAnZHJvcGRvd24taXRlbSd9fSBkcm9wZG93bi10b2dnbGUge3tvcHRpb25zLml0ZW0uZGlzYWJsZWQgPyAnZGlzYWJsZWQnIDogJyd9fVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiByb2xlPVwiYnV0dG9uXCIgdGl0bGU9XCJ7e2l0ZW1UaXRsZSB8IHNxTWVzc2FnZTppdGVtTWVzc2FnZVBhcmFtc319XCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiBbYXR0ci5hcmlhLWxhYmVsXT1cIml0ZW1UaXRsZSB8IHNxTWVzc2FnZTppdGVtTWVzc2FnZVBhcmFtc1wiPlxuICAgICAgICA8c3EtYWN0aW9uLWl0ZW0tY29udGVudCBbaXRlbV09XCJvcHRpb25zLml0ZW1cIiBbdGV4dF09XCJpdGVtVGV4dFwiPjwvc3EtYWN0aW9uLWl0ZW0tY29udGVudD5cbiAgICA8L2E+XG4gICAgPHVsIFtzcS1kcm9wZG93bi1tZW51XT1cImRyb3Bkb3duTWVudU9wdGlvbnNcIj48L3VsPiAgIFxuPC9uZy1jb250YWluZXI+XG5cbjwhLS0gbGlzdCBpdGVtIC0tPlxuPGEgKm5nSWY9XCJpc0xpc3RJdGVtXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwie3tvcHRpb25zLmluTWVudSA/ICduYXYtbGluaycgOiAnZHJvcGRvd24taXRlbSd9fSB7e29wdGlvbnMuaXRlbS5kaXNhYmxlZCA/ICdkaXNhYmxlZCcgOiAnJ319XCIgcm9sZT1cImJ1dHRvblwiIChjbGljayk9XCJjbGljaygkZXZlbnQpXCIgdGl0bGU9XCJ7e2l0ZW1UaXRsZSB8IHNxTWVzc2FnZTppdGVtTWVzc2FnZVBhcmFtc319XCIgW2F0dHIuYXJpYS1sYWJlbF09XCJpdGVtVGl0bGUgfCBzcU1lc3NhZ2U6aXRlbU1lc3NhZ2VQYXJhbXNcIj5cbiAgICA8c3EtYWN0aW9uLWl0ZW0tY29udGVudCBbaXRlbV09XCJvcHRpb25zLml0ZW1cIiBbdGV4dF09XCJpdGVtVGV4dFwiPjwvc3EtYWN0aW9uLWl0ZW0tY29udGVudD5cbjwvYT5cbiJdfQ==