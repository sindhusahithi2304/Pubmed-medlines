import { Output, ContentChild, Component, EventEmitter } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@sinequa/components/utils";
const _c0 = ["itemTpl"];
const _c1 = ["footerTpl"];
function BsAutocompleteList_div_0_a_2_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c2 = function (a0) { return { $implicit: a0 }; };
function BsAutocompleteList_div_0_a_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsAutocompleteList_div_0_a_2_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 7);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r5.itemTpl)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c2, item_r3));
} }
const _c3 = function (a0) { return { "list-group-item-primary": a0 }; };
const _c4 = function (a0, a1) { return { active: a0, first: a1 }; };
function BsAutocompleteList_div_0_a_2_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 5);
    i0.ɵɵlistener("click", function BsAutocompleteList_div_0_a_2_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r9); const item_r3 = ctx.$implicit; const ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8._itemClicked(item_r3, $event); });
    i0.ɵɵtemplate(1, BsAutocompleteList_div_0_a_2_ng_container_1_Template, 2, 4, "ng-container", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c3, ctx_r1._isSelected(item_r3, i_r4)))("sqScrollIntoView", i0.ɵɵpureFunction2(5, _c4, ctx_r1._isSelected(item_r3, i_r4), i_r4 === 0));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.itemTpl);
} }
function BsAutocompleteList_div_0_div_3_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function BsAutocompleteList_div_0_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtemplate(1, BsAutocompleteList_div_0_div_3_ng_container_1_Template, 1, 0, "ng-container", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r2.footerTpl)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c2, ctx_r2._items));
} }
function BsAutocompleteList_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵlistener("mousedown", function BsAutocompleteList_div_0_Template_div_mousedown_0_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11._mouseDown($event); });
    i0.ɵɵelementStart(1, "div", 2);
    i0.ɵɵtemplate(2, BsAutocompleteList_div_0_a_2_Template, 2, 8, "a", 3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, BsAutocompleteList_div_0_div_3_Template, 2, 4, "div", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0._items);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.footerTpl);
} }
export class BsAutocompleteList {
    constructor(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        /**
         * Event emitter for clicks on an autocomplete item
         */
        this.clicked = new EventEmitter();
        this._active = false;
        this._cursor = -1;
    }
    /**
     * Update the data and state of this component
     * @param active whether the component should be displayed
     * @param items The list of items to display
     */
    update(active, items) {
        //console.log("autocomplete update ", active, items);
        this._active = active;
        this._items = items;
        this._cursor = -1;
        this.changeDetectorRef.markForCheck();
    }
    /**
     * Whether there are any item to display
     */
    get hasItems() {
        return this._active && !!this._items && this._items.length > 0;
    }
    /**
     * Returns the currently selected item, if any
     */
    get selectedValue() {
        if (this._items && this._cursor >= 0 && this._cursor < this._items.length)
            return this._items[this._cursor];
        return undefined;
    }
    /**
     * Select the next item in the list and returns it
     */
    selectNext() {
        if (this._items && this._cursor < this._items.length - 1) {
            this._cursor++;
        }
        return this.selectedValue;
    }
    /**
     * Select the previous item in the list and returns it
     */
    selectPrevious() {
        if (this._cursor > 0)
            this._cursor--;
        return this.selectedValue;
    }
    /**
     * Test whether an item is selected
     * @param item
     * @param i
     */
    _isSelected(item, i) {
        return this._cursor === i;
    }
    /**
     * Listen to click events and emits events
     * @param item
     * @param event
     */
    _itemClicked(item, event) {
        this.clicked.next(item);
        event.stopPropagation();
        return false;
    }
    /**
     * This prevents the focus to be removed from the <input>, which clauses the dropdown
     */
    _mouseDown(event) {
        event.preventDefault();
    }
}
BsAutocompleteList.ɵfac = function BsAutocompleteList_Factory(t) { return new (t || BsAutocompleteList)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
BsAutocompleteList.ɵcmp = i0.ɵɵdefineComponent({ type: BsAutocompleteList, selectors: [["sq-autocomplete-list"]], contentQueries: function BsAutocompleteList_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, _c0, true);
        i0.ɵɵcontentQuery(dirIndex, _c1, true);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.itemTpl = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.footerTpl = _t.first);
    } }, outputs: { clicked: "clicked" }, decls: 1, vars: 1, consts: [["class", "sq-autocomplete-list card position-absolute", 3, "mousedown", 4, "ngIf"], [1, "sq-autocomplete-list", "card", "position-absolute", 3, "mousedown"], [1, "list-group", "list-group-flush"], ["href", "#", "class", "list-group-item list-group-item-action p-0 border-0", 3, "ngClass", "sqScrollIntoView", "click", 4, "ngFor", "ngForOf"], ["class", "card-footer", 4, "ngIf"], ["href", "#", 1, "list-group-item", "list-group-item-action", "p-0", "border-0", 3, "ngClass", "sqScrollIntoView", "click"], [4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "card-footer"]], template: function BsAutocompleteList_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsAutocompleteList_div_0_Template, 4, 2, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.hasItems);
    } }, directives: [i1.NgIf, i1.NgForOf, i1.NgClass, i2.ScrollIntoView, i1.NgTemplateOutlet], styles: [".sq-autocomplete-list[_ngcontent-%COMP%]{box-shadow:0 2px 5px 1px #d3d3d3;width:100%;z-index:10}.list-group[_ngcontent-%COMP%]{max-height:500px;overflow:auto}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsAutocompleteList, [{
        type: Component,
        args: [{
                selector: "sq-autocomplete-list",
                templateUrl: "./autocomplete-list.html",
                styleUrls: ["./autocomplete-list.css"]
            }]
    }], function () { return [{ type: i0.ChangeDetectorRef }]; }, { itemTpl: [{
            type: ContentChild,
            args: ["itemTpl", { static: false }]
        }], footerTpl: [{
            type: ContentChild,
            args: ["footerTpl", { static: false }]
        }], clicked: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLWxpc3QuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9hdXRvY29tcGxldGUvIiwic291cmNlcyI6WyJib290c3RyYXAvYXV0b2NvbXBsZXRlLWxpc3QvYXV0b2NvbXBsZXRlLWxpc3QudHMiLCJib290c3RyYXAvYXV0b2NvbXBsZXRlLWxpc3QvYXV0b2NvbXBsZXRlLWxpc3QuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFlBQVksRUFBZSxTQUFTLEVBQUUsWUFBWSxFQUFvQixNQUFNLGVBQWUsQ0FBQzs7Ozs7OztJQ1E1Rix3QkFBb0Y7Ozs7SUFEeEYsNkJBQ0k7SUFBQSw4R0FBb0Y7SUFDeEYsMEJBQWU7Ozs7SUFESSxlQUEyQjtJQUEzQixpREFBMkIsZ0VBQUE7Ozs7OztJQU5sRCw0QkFLSTtJQUxTLDRPQUFvQztJQUs3QywrRkFFZTtJQUNuQixpQkFBSTs7Ozs7SUFMQSx1RkFBNkQsK0ZBQUE7SUFFOUMsZUFBYTtJQUFiLHFDQUFhOzs7SUFNaEMsd0JBQXdGOzs7SUFENUYsOEJBQ0k7SUFBQSxpR0FBd0Y7SUFDNUYsaUJBQU07OztJQURhLGVBQTZCO0lBQTdCLG1EQUE2QixzRUFBQTs7OztJQWJwRCw4QkFDSTtJQURzRSwwTUFBZ0M7SUFDdEcsOEJBQ0k7SUFBQSxxRUFRSTtJQUNSLGlCQUFNO0lBQ04seUVBRU07SUFDVixpQkFBTTs7O0lBWnVCLGVBQVc7SUFBWCx1Q0FBVztJQVNWLGVBQWU7SUFBZix1Q0FBZTs7QURKN0MsTUFBTSxPQUFPLGtCQUFrQjtJQXVCM0IsWUFDWSxpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQVpoRDs7V0FFRztRQUNPLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUV6RCxZQUFPLEdBQVksS0FBSyxDQUFDO1FBR3pCLFlBQU8sR0FBVyxDQUFDLENBQUMsQ0FBQztJQUtyQixDQUFDO0lBR0Q7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxNQUFlLEVBQUUsS0FBMEI7UUFDckQscURBQXFEO1FBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFbEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsUUFBUTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxhQUFhO1FBQ3BCLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtZQUNwRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNJLFVBQVU7UUFDYixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUU7WUFDcEQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2xCO1FBQ0QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFRDs7T0FFRztJQUNJLGNBQWM7UUFDakIsSUFBRyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUM7WUFDZixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsV0FBVyxDQUFDLElBQXNCLEVBQUUsQ0FBUztRQUN6QyxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsWUFBWSxDQUFDLElBQXNCLEVBQUUsS0FBSztRQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVSxDQUFDLEtBQUs7UUFDWixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7b0ZBdEdRLGtCQUFrQjt1REFBbEIsa0JBQWtCOzs7Ozs7OztRQ1IvQixtRUFlTTs7UUFmb0QsbUNBQWM7O2tERFEzRCxrQkFBa0I7Y0FMOUIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFdBQVcsRUFBRSwwQkFBMEI7Z0JBQ3ZDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO2FBQ3pDO29FQU02QyxPQUFPO2tCQUFoRCxZQUFZO21CQUFDLFNBQVMsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7WUFLSSxTQUFTO2tCQUFwRCxZQUFZO21CQUFDLFdBQVcsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7WUFLaEMsT0FBTztrQkFBaEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T3V0cHV0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0F1dG9jb21wbGV0ZUl0ZW0sIEF1dG9jb21wbGV0ZUNvbXBvbmVudH0gZnJvbSBcIi4uLy4uL2F1dG9jb21wbGV0ZS5kaXJlY3RpdmVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtYXV0b2NvbXBsZXRlLWxpc3RcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2F1dG9jb21wbGV0ZS1saXN0Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vYXV0b2NvbXBsZXRlLWxpc3QuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEJzQXV0b2NvbXBsZXRlTGlzdCBpbXBsZW1lbnRzIEF1dG9jb21wbGV0ZUNvbXBvbmVudCB7XG5cbiAgICAvKipcbiAgICAgKiBUZW1wbGF0ZSBmb3IgdGhlIGRpc3BsYXkgb2YgQXV0b2NvbXBsZXRlSXRlbSBpdGVtcywgcGFzc2VkIGJ5IHRyYW5zY2x1c2lvblxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoXCJpdGVtVHBsXCIsIHtzdGF0aWM6IGZhbHNlfSkgaXRlbVRwbDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKlxuICAgICAqIE9wdGlvbmFsIGZvb3RlciB0ZW1wbGF0ZSwgcGFzc2VkIGJ5IHRyYW5zY2x1c2lvblxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoXCJmb290ZXJUcGxcIiwge3N0YXRpYzogZmFsc2V9KSBmb290ZXJUcGw6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBlbWl0dGVyIGZvciBjbGlja3Mgb24gYW4gYXV0b2NvbXBsZXRlIGl0ZW1cbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgY2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8QXV0b2NvbXBsZXRlSXRlbT4oKTtcblxuICAgIF9hY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBfaXRlbXM6IEF1dG9jb21wbGV0ZUl0ZW1bXSB8IHVuZGVmaW5lZDtcblxuICAgIF9jdXJzb3I6IG51bWJlciA9IC0xO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpe1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBkYXRhIGFuZCBzdGF0ZSBvZiB0aGlzIGNvbXBvbmVudFxuICAgICAqIEBwYXJhbSBhY3RpdmUgd2hldGhlciB0aGUgY29tcG9uZW50IHNob3VsZCBiZSBkaXNwbGF5ZWRcbiAgICAgKiBAcGFyYW0gaXRlbXMgVGhlIGxpc3Qgb2YgaXRlbXMgdG8gZGlzcGxheVxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGUoYWN0aXZlOiBib29sZWFuLCBpdGVtcz86IEF1dG9jb21wbGV0ZUl0ZW1bXSl7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJhdXRvY29tcGxldGUgdXBkYXRlIFwiLCBhY3RpdmUsIGl0ZW1zKTtcbiAgICAgICAgdGhpcy5fYWN0aXZlID0gYWN0aXZlO1xuICAgICAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuICAgICAgICB0aGlzLl9jdXJzb3IgPSAtMTtcblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlcmUgYXJlIGFueSBpdGVtIHRvIGRpc3BsYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGhhc0l0ZW1zKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlICYmICEhdGhpcy5faXRlbXMgJiYgdGhpcy5faXRlbXMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbSwgaWYgYW55XG4gICAgICovXG4gICAgcHVibGljIGdldCBzZWxlY3RlZFZhbHVlKCk6IEF1dG9jb21wbGV0ZUl0ZW0gfCB1bmRlZmluZWQge1xuICAgICAgICBpZih0aGlzLl9pdGVtcyAmJiB0aGlzLl9jdXJzb3IgPj0gMCAmJiB0aGlzLl9jdXJzb3IgPCB0aGlzLl9pdGVtcy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNbdGhpcy5fY3Vyc29yXTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3QgdGhlIG5leHQgaXRlbSBpbiB0aGUgbGlzdCBhbmQgcmV0dXJucyBpdFxuICAgICAqL1xuICAgIHB1YmxpYyBzZWxlY3ROZXh0KCk6IEF1dG9jb21wbGV0ZUl0ZW0gfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy5faXRlbXMgJiYgdGhpcy5fY3Vyc29yIDwgdGhpcy5faXRlbXMubGVuZ3RoLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvcisrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkVmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VsZWN0IHRoZSBwcmV2aW91cyBpdGVtIGluIHRoZSBsaXN0IGFuZCByZXR1cm5zIGl0XG4gICAgICovXG4gICAgcHVibGljIHNlbGVjdFByZXZpb3VzKCk6IEF1dG9jb21wbGV0ZUl0ZW0gfCB1bmRlZmluZWQge1xuICAgICAgICBpZih0aGlzLl9jdXJzb3IgPiAwKVxuICAgICAgICAgICAgdGhpcy5fY3Vyc29yLS07XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkVmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGVzdCB3aGV0aGVyIGFuIGl0ZW0gaXMgc2VsZWN0ZWRcbiAgICAgKiBAcGFyYW0gaXRlbVxuICAgICAqIEBwYXJhbSBpXG4gICAgICovXG4gICAgX2lzU2VsZWN0ZWQoaXRlbTogQXV0b2NvbXBsZXRlSXRlbSwgaTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3IgPT09IGk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIGNsaWNrIGV2ZW50cyBhbmQgZW1pdHMgZXZlbnRzXG4gICAgICogQHBhcmFtIGl0ZW1cbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBfaXRlbUNsaWNrZWQoaXRlbTogQXV0b2NvbXBsZXRlSXRlbSwgZXZlbnQpe1xuICAgICAgICB0aGlzLmNsaWNrZWQubmV4dChpdGVtKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHByZXZlbnRzIHRoZSBmb2N1cyB0byBiZSByZW1vdmVkIGZyb20gdGhlIDxpbnB1dD4sIHdoaWNoIGNsYXVzZXMgdGhlIGRyb3Bkb3duXG4gICAgICovXG4gICAgX21vdXNlRG93bihldmVudCl7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG59IiwiPGRpdiBjbGFzcz1cInNxLWF1dG9jb21wbGV0ZS1saXN0IGNhcmQgcG9zaXRpb24tYWJzb2x1dGVcIiAqbmdJZj1cImhhc0l0ZW1zXCIgKG1vdXNlZG93bik9XCJfbW91c2VEb3duKCRldmVudClcIj5cbiAgICA8ZGl2IGNsYXNzPVwibGlzdC1ncm91cCBsaXN0LWdyb3VwLWZsdXNoXCI+XG4gICAgICAgIDxhICBocmVmPVwiI1wiIChjbGljayk9XCJfaXRlbUNsaWNrZWQoaXRlbSwgJGV2ZW50KVwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBfaXRlbXM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICAgICAgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWFjdGlvbiBwLTAgYm9yZGVyLTBcIiBcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnbGlzdC1ncm91cC1pdGVtLXByaW1hcnknOiBfaXNTZWxlY3RlZChpdGVtLCBpKX1cIlxuICAgICAgICAgICAgW3NxU2Nyb2xsSW50b1ZpZXddPVwie2FjdGl2ZTogX2lzU2VsZWN0ZWQoaXRlbSwgaSksIGZpcnN0OiBpID09PSAwfVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIml0ZW1UcGxcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRwbDsgY29udGV4dDp7JGltcGxpY2l0OiBpdGVtfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvYT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY2FyZC1mb290ZXJcIiAqbmdJZj1cImZvb3RlclRwbFwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZm9vdGVyVHBsOyBjb250ZXh0OnskaW1wbGljaXQ6IF9pdGVtc31cIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbjwvZGl2PiJdfQ==