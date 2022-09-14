import { Component, Input, HostBinding, ChangeDetectionStrategy } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../action-item-content/action-item-content";
import * as i3 from "@sinequa/core/intl";
const _c0 = ["sq-dropdown-menu", ""];
function BsDropdownMenu_h6_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h6", 2);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, ctx_r0.options.item.title, ctx_r0.options.item.messageParams));
} }
function BsDropdownMenu_ng_container_1_li_1_ng_container_3_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 10);
    i0.ɵɵelement(1, "sq-action-item-content", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const child_r2 = i0.ɵɵnextContext(3).$implicit;
    i0.ɵɵclassMapInterpolate1("dropdown-item ", child_r2.disabled ? "disabled" : "", "");
    i0.ɵɵpropertyInterpolate("href", child_r2.href, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("item", child_r2)("text", child_r2.text)("in-dropdown-menu", true);
} }
function BsDropdownMenu_ng_container_1_li_1_ng_container_3_a_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 12);
    i0.ɵɵlistener("click", function BsDropdownMenu_ng_container_1_li_1_ng_container_3_a_2_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r12); const child_r2 = i0.ɵɵnextContext(3).$implicit; const ctx_r10 = i0.ɵɵnextContext(); return ctx_r10.click(child_r2, $event); });
    i0.ɵɵelement(1, "sq-action-item-content", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const child_r2 = i0.ɵɵnextContext(3).$implicit;
    i0.ɵɵclassMapInterpolate2("dropdown-item ", child_r2.hasChildren ? "dropdown-toggle" : "", " ", child_r2.disabled ? "disabled" : "", "");
    i0.ɵɵattribute("data-toggle", child_r2.hasChildren ? "dropdown" : "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("item", child_r2)("text", child_r2.text)("in-dropdown-menu", true);
} }
function BsDropdownMenu_ng_container_1_li_1_ng_container_3_sq_action_item_content_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "sq-action-item-content", 11);
} if (rf & 2) {
    const child_r2 = i0.ɵɵnextContext(3).$implicit;
    i0.ɵɵproperty("item", child_r2)("text", child_r2.text)("in-dropdown-menu", true);
} }
const _c1 = function (a0, a1) { return { item: a0, showMenuClass: a1 }; };
function BsDropdownMenu_ng_container_1_li_1_ng_container_3_ul_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ul", 13);
} if (rf & 2) {
    const child_r2 = i0.ɵɵnextContext(3).$implicit;
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵproperty("sq-dropdown-menu", i0.ɵɵpureFunction2(1, _c1, child_r2, ctx_r8.options.showMenuClass));
} }
function BsDropdownMenu_ng_container_1_li_1_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsDropdownMenu_ng_container_1_li_1_ng_container_3_a_1_Template, 2, 7, "a", 6);
    i0.ɵɵtemplate(2, BsDropdownMenu_ng_container_1_li_1_ng_container_3_a_2_Template, 2, 8, "a", 7);
    i0.ɵɵtemplate(3, BsDropdownMenu_ng_container_1_li_1_ng_container_3_sq_action_item_content_3_Template, 1, 3, "sq-action-item-content", 8);
    i0.ɵɵtemplate(4, BsDropdownMenu_ng_container_1_li_1_ng_container_3_ul_4_Template, 1, 4, "ul", 9);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const child_r2 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !child_r2.scrollGroup && child_r2.href);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !child_r2.scrollGroup && !child_r2.href && !child_r2.component);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", child_r2.component);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", child_r2.hasChildren);
} }
function BsDropdownMenu_ng_container_1_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 4);
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵtemplate(3, BsDropdownMenu_ng_container_1_li_1_ng_container_3_Template, 5, 4, "ng-container", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const child_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassMap(child_r2.separator ? "dropdown-divider" : child_r2.scrollGroup ? "sq-scroll-menu-item open" : child_r2.hasChildren ? "dropdown-submenu" : "");
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind2(1, 6, child_r2.title, child_r2.messageParams));
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(2, 9, child_r2.title, child_r2.messageParams));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !child_r2.separator);
} }
function BsDropdownMenu_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsDropdownMenu_ng_container_1_li_1_Template, 4, 12, "li", 3);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const child_r2 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !child_r2.hidden);
} }
export class BsDropdownMenu {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    set options(opts) {
        var _a;
        this._options = Object.assign({}, opts);
        this.children = ((_a = opts.item.children) === null || _a === void 0 ? void 0 : _a.filter(child => !child.hidden)) || [];
    }
    get options() {
        return this._options;
    }
    ngOnInit() {
        const element = this.elementRef.nativeElement;
        if (this.options.item.scrollable) {
            element.classList.add("sq-scrollable-menu");
        }
        else if (this.options.item.scrollGroup) {
            element.classList.add("sq-scroll-menu");
        }
        this.rightAligned = this.options.rightAligned;
    }
    getLi(element) {
        let element1 = element;
        while (element1 && element1.nodeName !== "LI") {
            element1 = element1.parentElement;
        }
        return element1;
    }
    click(item, event) {
        if (!this.options.item.disabled) {
            // Handle sub-menu opening
            let isOpen = false;
            const li = this.getLi(event.target);
            if (!!li && li.classList.contains("dropdown-submenu")) {
                event.preventDefault();
                event.stopPropagation();
                isOpen = li.classList.contains(this.options.showMenuClass);
                const ul = li.parentElement;
                if (ul) {
                    for (let i = 0, ic = ul.children.length; i < ic; i++) {
                        const _li = ul.children[i];
                        _li.classList.remove(this.options.showMenuClass);
                    }
                }
                // NB toggle's second param does not work on IE
                // li.classList.toggle(this.options.showMenuClass, !isOpen);
                if (!isOpen) {
                    li.classList.add(this.options.showMenuClass);
                }
            }
            if (item.action) {
                item.action(item, event);
            }
            if (item.toggle) {
                item.toggle(item, !isOpen);
            }
        }
    }
}
BsDropdownMenu.ɵfac = function BsDropdownMenu_Factory(t) { return new (t || BsDropdownMenu)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
BsDropdownMenu.ɵcmp = i0.ɵɵdefineComponent({ type: BsDropdownMenu, selectors: [["", "sq-dropdown-menu", ""]], hostAttrs: ["role", "menu", 1, "dropdown-menu"], hostVars: 2, hostBindings: function BsDropdownMenu_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("dropdown-menu-right", ctx.rightAligned);
    } }, inputs: { options: ["sq-dropdown-menu", "options"] }, attrs: _c0, decls: 2, vars: 2, consts: [["class", "dropdown-header", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "dropdown-header"], [3, "class", "title", 4, "ngIf"], [3, "title"], [4, "ngIf"], ["tabindex", "-1", 3, "class", "href", 4, "ngIf"], ["href", "javascript:void(0)", "tabindex", "-1", 3, "class", "click", 4, "ngIf"], [3, "item", "text", "in-dropdown-menu", 4, "ngIf"], [3, "sq-dropdown-menu", 4, "ngIf"], ["tabindex", "-1", 3, "href"], [3, "item", "text", "in-dropdown-menu"], ["href", "javascript:void(0)", "tabindex", "-1", 3, "click"], [3, "sq-dropdown-menu"]], template: function BsDropdownMenu_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsDropdownMenu_h6_0_Template, 3, 4, "h6", 0);
        i0.ɵɵtemplate(1, BsDropdownMenu_ng_container_1_Template, 2, 1, "ng-container", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.options.item.title && ctx.options.item.headerGroup);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.options.item.children);
    } }, directives: [i1.NgIf, i1.NgForOf, i2.BsActionItemContent, BsDropdownMenu], pipes: [i3.MessagePipe], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsDropdownMenu, [{
        type: Component,
        args: [{
                selector: "[sq-dropdown-menu]",
                host: {
                    "class": "dropdown-menu",
                    "role": "menu"
                },
                templateUrl: "./dropdown-menu.html",
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { options: [{
            type: Input,
            args: ["sq-dropdown-menu"]
        }], rightAligned: [{
            type: HostBinding,
            args: ["class.dropdown-menu-right"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tbWVudS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2FjdGlvbi8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9kcm9wZG93bi1tZW51L2Ryb3Bkb3duLW1lbnUudHMiLCJib290c3RyYXAvZHJvcGRvd24tbWVudS9kcm9wZG93bi1tZW51Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQXNCLFdBQVcsRUFBRSx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7OztJQ0F6Ryw2QkFBbUY7SUFBQSxZQUErRDs7SUFBQSxpQkFBSzs7O0lBQXBFLGVBQStEO0lBQS9ELHdHQUErRDs7O0lBSXRJLDZCQUNJO0lBQUEsNkNBQThHO0lBQ2xILGlCQUFJOzs7SUFGd0Msb0ZBQTBEO0lBQWUsaUVBQXFCO0lBQzlHLGVBQWM7SUFBZCwrQkFBYyx1QkFBQSwwQkFBQTs7OztJQUUxQyw2QkFDSTtJQUR1USxrUkFBOEI7SUFDclMsNkNBQThHO0lBQ2xILGlCQUFJOzs7SUFGdUYsd0lBQXdHO0lBQUMscUVBQXdEO0lBQ2hPLGVBQWM7SUFBZCwrQkFBYyx1QkFBQSwwQkFBQTs7O0lBRTFDLDZDQUFzSTs7O0lBQXRGLCtCQUFjLHVCQUFBLDBCQUFBOzs7O0lBQzlELHlCQUE0Rzs7OztJQUE5RSxxR0FBd0U7OztJQVIxRyw2QkFDSTtJQUFBLDhGQUVJO0lBQ0osOEZBRUk7SUFDSix3SUFBc0k7SUFDdEksZ0dBQTRHO0lBQ2hILDBCQUFlOzs7SUFSUCxlQUFzQztJQUF0Qyw2REFBc0M7SUFHdEMsZUFBMkQ7SUFBM0QscUZBQTJEO0lBR3RDLGVBQXFCO0lBQXJCLHlDQUFxQjtJQUN6QyxlQUF1QjtJQUF2QiwyQ0FBdUI7OztJQVRwQyw2QkFDSTs7O0lBQUEscUdBU2U7SUFDbkIsaUJBQUs7OztJQVhxQiwySkFBK0k7SUFBQywrRkFBdUQ7SUFBQywwRkFBK0Q7SUFD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Q0FBQyxDQUFDO2lCQUNoRDthQUNKO1lBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzVCO1lBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDOUI7U0FDSjtJQUNMLENBQUM7OzRFQXBFUSxjQUFjO21EQUFkLGNBQWM7OztRQ25CM0IsNkRBQXVKO1FBQ3ZKLGlGQWFlOztRQWRWLDZFQUFvRDtRQUN6QixlQUF3QjtRQUF4QixtREFBd0I7bUVEa0IzQyxjQUFjO2tEQUFkLGNBQWM7Y0FUMUIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLElBQUksRUFBRTtvQkFDRixPQUFPLEVBQUUsZUFBZTtvQkFDeEIsTUFBTSxFQUFFLE1BQU07aUJBQ2pCO2dCQUNELFdBQVcsRUFBRSxzQkFBc0I7Z0JBQ25DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2xEOzZEQU9PLE9BQU87a0JBRFYsS0FBSzttQkFBQyxrQkFBa0I7WUFTaUIsWUFBWTtrQkFBckQsV0FBVzttQkFBQywyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtBY3Rpb259IGZyb20gXCIuLi8uLi9hY3Rpb25cIjtcblxuZXhwb3J0IGludGVyZmFjZSBEcm9wZG93bk1lbnVPcHRpb25zIHtcbiAgICBpdGVtOiBBY3Rpb247XG4gICAgcmlnaHRBbGlnbmVkPzogYm9vbGVhbjtcbiAgICBzaG93TWVudUNsYXNzOiBzdHJpbmc7XG4gICAgaGVhZGVyPzogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJbc3EtZHJvcGRvd24tbWVudV1cIixcbiAgICBob3N0OiB7XG4gICAgICAgIFwiY2xhc3NcIjogXCJkcm9wZG93bi1tZW51XCIsXG4gICAgICAgIFwicm9sZVwiOiBcIm1lbnVcIlxuICAgIH0sXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9kcm9wZG93bi1tZW51Lmh0bWxcIixcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCc0Ryb3Bkb3duTWVudSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgY2hpbGRyZW46IEFjdGlvbltdO1xuICAgIFxuICAgIHByaXZhdGUgX29wdGlvbnM6IERyb3Bkb3duTWVudU9wdGlvbnM7XG4gICAgXG4gICAgQElucHV0KFwic3EtZHJvcGRvd24tbWVudVwiKVxuICAgIHNldCBvcHRpb25zKG9wdHM6IERyb3Bkb3duTWVudU9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHsuLi5vcHRzfTtcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IG9wdHMuaXRlbS5jaGlsZHJlbj8uZmlsdGVyKGNoaWxkID0+ICFjaGlsZC5oaWRkZW4pIHx8IFtdO1xuICAgIH1cbiAgICBnZXQgb3B0aW9ucygpOiBEcm9wZG93bk1lbnVPcHRpb25zIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gICAgfVxuICAgIFxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmRyb3Bkb3duLW1lbnUtcmlnaHRcIikgcmlnaHRBbGlnbmVkO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLml0ZW0uc2Nyb2xsYWJsZSkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic3Etc2Nyb2xsYWJsZS1tZW51XCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMub3B0aW9ucy5pdGVtLnNjcm9sbEdyb3VwKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzcS1zY3JvbGwtbWVudVwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJpZ2h0QWxpZ25lZCA9IHRoaXMub3B0aW9ucy5yaWdodEFsaWduZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMaShlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGxldCBlbGVtZW50MTogSFRNTEVsZW1lbnQgfCBudWxsID0gZWxlbWVudDtcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQxICYmIGVsZW1lbnQxLm5vZGVOYW1lICE9PSBcIkxJXCIpIHtcbiAgICAgICAgICAgIGVsZW1lbnQxID0gZWxlbWVudDEucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudDE7XG4gICAgfVxuXG4gICAgY2xpY2soaXRlbTogQWN0aW9uLCBldmVudDogVUlFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5pdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgc3ViLW1lbnUgb3BlbmluZ1xuICAgICAgICAgICAgbGV0IGlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgbGkgPSB0aGlzLmdldExpKDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgaWYgKCEhbGkgJiYgbGkuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZHJvcGRvd24tc3VibWVudVwiKSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaXNPcGVuID0gbGkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMub3B0aW9ucy5zaG93TWVudUNsYXNzKTtcbiAgICAgICAgICAgICAgICBjb25zdCB1bCA9IGxpLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgaWYgKHVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBpYyA9IHVsLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGljOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF9saSA9IHVsLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2xpLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5vcHRpb25zLnNob3dNZW51Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIE5CIHRvZ2dsZSdzIHNlY29uZCBwYXJhbSBkb2VzIG5vdCB3b3JrIG9uIElFXG4gICAgICAgICAgICAgICAgLy8gbGkuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLm9wdGlvbnMuc2hvd01lbnVDbGFzcywgIWlzT3Blbik7XG4gICAgICAgICAgICAgICAgaWYgKCFpc09wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCh0aGlzLm9wdGlvbnMuc2hvd01lbnVDbGFzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGl0ZW0uYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5hY3Rpb24oaXRlbSwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGl0ZW0udG9nZ2xlKSB7XG4gICAgICAgICAgICAgICAgaXRlbS50b2dnbGUoaXRlbSwgIWlzT3Blbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiPGg2ICpuZ0lmPVwib3B0aW9ucy5pdGVtLnRpdGxlICYmIG9wdGlvbnMuaXRlbS5oZWFkZXJHcm91cFwiIGNsYXNzPVwiZHJvcGRvd24taGVhZGVyXCI+e3sgb3B0aW9ucy5pdGVtLnRpdGxlIHwgc3FNZXNzYWdlOm9wdGlvbnMuaXRlbS5tZXNzYWdlUGFyYW1zIH19PC9oNj5cbjxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkIG9mIG9wdGlvbnMuaXRlbS5jaGlsZHJlblwiPlxuICAgIDxsaSAqbmdJZj1cIiFjaGlsZC5oaWRkZW5cIiBjbGFzcz1cInt7Y2hpbGQuc2VwYXJhdG9yID8gJ2Ryb3Bkb3duLWRpdmlkZXInIDogY2hpbGQuc2Nyb2xsR3JvdXAgPyAnc3Etc2Nyb2xsLW1lbnUtaXRlbSBvcGVuJyA6IGNoaWxkLmhhc0NoaWxkcmVuID8gJ2Ryb3Bkb3duLXN1Ym1lbnUnIDogJyd9fVwiIHRpdGxlPVwie3tjaGlsZC50aXRsZSB8IHNxTWVzc2FnZTpjaGlsZC5tZXNzYWdlUGFyYW1zfX1cIiBbYXR0ci5hcmlhLWxhYmVsXT1cImNoaWxkLnRpdGxlIHwgc3FNZXNzYWdlOmNoaWxkLm1lc3NhZ2VQYXJhbXNcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjaGlsZC5zZXBhcmF0b3JcIj5cbiAgICAgICAgICAgIDxhICpuZ0lmPVwiIWNoaWxkLnNjcm9sbEdyb3VwICYmIGNoaWxkLmhyZWZcIiBjbGFzcz1cImRyb3Bkb3duLWl0ZW0ge3tjaGlsZC5kaXNhYmxlZCA/ICdkaXNhYmxlZCcgOiAnJ319XCIgdGFiaW5kZXg9XCItMVwiIGhyZWY9XCJ7e2NoaWxkLmhyZWZ9fVwiPlxuICAgICAgICAgICAgICAgIDxzcS1hY3Rpb24taXRlbS1jb250ZW50IFtpdGVtXT1cImNoaWxkXCIgW3RleHRdPVwiY2hpbGQudGV4dFwiIFtpbi1kcm9wZG93bi1tZW51XT1cInRydWVcIj48L3NxLWFjdGlvbi1pdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8YSAqbmdJZj1cIiFjaGlsZC5zY3JvbGxHcm91cCAmJiAhY2hpbGQuaHJlZiAmJiAhY2hpbGQuY29tcG9uZW50XCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiZHJvcGRvd24taXRlbSB7e2NoaWxkLmhhc0NoaWxkcmVuID8gJ2Ryb3Bkb3duLXRvZ2dsZSc6ICcnfX0ge3tjaGlsZC5kaXNhYmxlZCA/ICdkaXNhYmxlZCcgOiAnJ319XCIgW2F0dHIuZGF0YS10b2dnbGVdPVwiY2hpbGQuaGFzQ2hpbGRyZW4gPyAnZHJvcGRvd24nIDogJydcIiB0YWJpbmRleD1cIi0xXCIgKGNsaWNrKT1cImNsaWNrKGNoaWxkLCAkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPHNxLWFjdGlvbi1pdGVtLWNvbnRlbnQgW2l0ZW1dPVwiY2hpbGRcIiBbdGV4dF09XCJjaGlsZC50ZXh0XCIgW2luLWRyb3Bkb3duLW1lbnVdPVwidHJ1ZVwiPjwvc3EtYWN0aW9uLWl0ZW0tY29udGVudD5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxzcS1hY3Rpb24taXRlbS1jb250ZW50ICpuZ0lmPVwiY2hpbGQuY29tcG9uZW50XCIgW2l0ZW1dPVwiY2hpbGRcIiBbdGV4dF09XCJjaGlsZC50ZXh0XCIgW2luLWRyb3Bkb3duLW1lbnVdPVwidHJ1ZVwiPjwvc3EtYWN0aW9uLWl0ZW0tY29udGVudD5cbiAgICAgICAgICAgIDx1bCAqbmdJZj1cImNoaWxkLmhhc0NoaWxkcmVuXCIgW3NxLWRyb3Bkb3duLW1lbnVdPVwie2l0ZW06IGNoaWxkLCBzaG93TWVudUNsYXNzOiBvcHRpb25zLnNob3dNZW51Q2xhc3N9XCI+PC91bD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9saT5cbjwvbmctY29udGFpbmVyPiJdfQ==