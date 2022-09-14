import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Utils, Keys } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@sinequa/components/utils";
import * as i3 from "@sinequa/core/intl";
const _c0 = ["button"];
const _c1 = function (a0, a1) { return { active: a0, first: a1 }; };
function BsSelectComponent_div_6_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 7);
    i0.ɵɵlistener("click", function BsSelectComponent_div_6_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r6); const i_r4 = ctx.index; const ctx_r5 = i0.ɵɵnextContext(2); return ctx_r5.toggleItemSelected(i_r4); })("keydown", function BsSelectComponent_div_6_a_1_Template_a_keydown_0_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r7 = i0.ɵɵnextContext(2); return ctx_r7.keydown($event); });
    i0.ɵɵelement(1, "span");
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const itemName_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMapInterpolate1("dropdown-item", ctx_r2.activeItem === i_r4 ? " active" : "", "");
    i0.ɵɵproperty("sqScrollIntoView", i0.ɵɵpureFunction2(8, _c1, i_r4 === ctx_r2.activeItem, i_r4 === 0));
    i0.ɵɵadvance(1);
    i0.ɵɵclassMapInterpolate1("fas fa-check ", ctx_r2.isItemSelected(i_r4) ? "" : " invisible", " left");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(itemName_r3);
} }
function BsSelectComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵlistener("mousedown", function BsSelectComponent_div_6_Template_div_mousedown_0_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r8 = i0.ɵɵnextContext(); return ctx_r8.mousedown($event); });
    i0.ɵɵtemplate(1, BsSelectComponent_div_6_a_1_Template, 4, 11, "a", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("max-height", ctx_r1.itemListHeight);
    i0.ɵɵproperty("hidden", !ctx_r1.isOpen);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.names);
} }
export class BsSelectComponent {
    constructor() {
        this.opened = false;
        this.isOpen = false;
        this.activeItem = -1;
        this.cancelBlur = false; // For IE which takes focus when clicking on dropdown scrollbar despite the mousedown handling
        this.onChangeCallback = () => { };
    }
    ngOnInit() {
        this.clearSelected();
        if (this.items.length === 0) {
            this.disabled = false;
        }
        this.names = [];
        this.items.forEach(item => this.names.push(item.display));
    }
    setOpen(value) {
        if (!this.opened) {
            if (this.disabled || !value) {
                return;
            }
            this.opened = true;
        }
        this.isOpen = value;
        if (!value) {
            this.activeItem = -1;
        }
    }
    mousedown(event) {
        event.preventDefault();
        this.cancelBlur = true;
        Utils.delay().then(() => this.cancelBlur = false);
    }
    blur(event) {
        if (this.cancelBlur) {
            event.preventDefault();
            event.stopImmediatePropagation();
            Utils.delay().then(() => {
                this.buttonElement.nativeElement.focus();
            });
            return;
        }
        this.setOpen(false);
    }
    toggleOpen() {
        if (this.disabled) {
            return;
        }
        this.setOpen(!this.isOpen);
    }
    keydown($event) {
        if (this.disabled) {
            return;
        }
        // arrow down
        if ($event.keyCode === Keys.down) {
            if (!this.isOpen) {
                this.setOpen(true);
            }
            this.activeItem++;
            if (this.activeItem >= this.items.length) {
                this.activeItem = 0;
            }
            $event.preventDefault();
            $event.stopPropagation();
        }
        // arrow up
        else if ($event.keyCode === Keys.up) {
            if (!this.isOpen) {
                this.setOpen(true);
            }
            this.activeItem--;
            if (this.activeItem < 0) {
                this.activeItem = this.items.length - 1;
            }
            $event.preventDefault();
            $event.stopPropagation();
        }
        // enter or space
        else if (($event.keyCode === Keys.enter || $event.keyCode === Keys.space) &&
            this.activeItem >= 0 && this.activeItem < this.items.length) {
            this.toggleItemSelected(this.activeItem);
            $event.preventDefault();
            $event.stopPropagation();
        }
        // escape
        else if ($event.keyCode === Keys.esc && this.isOpen) {
            this.setOpen(false);
            $event.preventDefault();
            $event.stopPropagation();
        }
    }
    clearSelected() {
        this.selectedItems = [];
    }
    countSelected() {
        return this.selectedItems.length;
    }
    isItemSelected(itemIndex) {
        return this.selectedItems.includes(itemIndex);
    }
    toggleItemSelected(itemIndex) {
        const idx = this.selectedItems.indexOf(itemIndex);
        // Remove item if it was already selected
        if (idx > -1) {
            this.selectedItems.splice(idx, 1);
        }
        // regular case: just add the index, and update the active item if it exists
        else if (this.multiple) {
            this.selectedItems.push(itemIndex);
            if (this.activeItem >= 0)
                this.activeItem = itemIndex;
        }
        // single-item case: ensure there is only one selected item, and close the menu
        else {
            this.selectedItems = [itemIndex];
            this.setOpen(false);
        }
        this.triggerOnChange();
    }
    /* Template properties */
    get buttonTitleMessageParams() {
        return {
            values: {
                count: this.countSelected()
            }
        };
    }
    get buttonTitle() {
        const selectCount = this.countSelected();
        if (selectCount === 0) {
            return "msg#advanced.select.noItems";
        }
        if (!this.multiple) {
            return this.items[this.selectedItems[0]].display;
        }
        if (selectCount === this.items.length) {
            return "msg#advanced.select.allItems";
        }
        //Get list of items names corresponding to selected indices
        return this.selectedItems
            .map(index => this.items[index].display)
            .sort()
            .join(", ");
    }
    get itemListHeight() {
        // use 10 as default
        return (10 * 4) + "ex";
    }
    /* End Template properties */
    /* Change event */
    triggerOnChange() {
        // Gather selected item values
        let values;
        // We can not pass an empty array, when empty use undefined instead
        if (this.selectedItems.length === 0) {
            values = undefined;
        }
        // return an array if multiple
        else if (this.multiple) {
            values = this.selectedItems.map(index => this.items[index]);
        }
        // directly pass the value if not multiple
        else {
            values = this.items[this.selectedItems[0]];
        }
        this.onChangeCallback(values);
    }
    /* End Change event */
    /* ControlValueAccessor methods */
    writeValue(value) {
        this.clearSelected();
        if (value) {
            // the value may not be an array if this select is not multiple
            const asArray = Array.isArray(value) ? value : [value];
            //Mark items as selected based on input values
            this.items.forEach((item, index) => {
                if (asArray.find((el) => el.value === item.value) && index !== undefined) {
                    this.selectedItems.push(index);
                }
            });
        }
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
    }
}
BsSelectComponent.ɵfac = function BsSelectComponent_Factory(t) { return new (t || BsSelectComponent)(); };
BsSelectComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsSelectComponent, selectors: [["sq-select"]], viewQuery: function BsSelectComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.buttonElement = _t.first);
    } }, inputs: { items: "items", disabled: "disabled", multiple: "multiple" }, features: [i0.ɵɵProvidersFeature([{
                provide: NG_VALUE_ACCESSOR,
                multi: true,
                useExisting: forwardRef(() => BsSelectComponent),
            }])], decls: 7, vars: 8, consts: [[1, "dropdown"], ["data-toggle", "dropdown", "type", "button", "role", "button", "tabindex", "0", 3, "click", "blur", "keydown"], ["button", ""], [1, "sq-button-text"], ["class", "dropdown-menu dropdown-menu-left show", "role", "combobox", 3, "hidden", "max-height", "mousedown", 4, "ngIf"], ["role", "combobox", 1, "dropdown-menu", "dropdown-menu-left", "show", 3, "hidden", "mousedown"], ["tabindex", "-1", 3, "class", "sqScrollIntoView", "click", "keydown", 4, "ngFor", "ngForOf"], ["tabindex", "-1", 3, "sqScrollIntoView", "click", "keydown"]], template: function BsSelectComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "button", 1, 2);
        i0.ɵɵlistener("click", function BsSelectComponent_Template_button_click_1_listener() { return ctx.toggleOpen(); })("blur", function BsSelectComponent_Template_button_blur_1_listener($event) { return ctx.blur($event); })("keydown", function BsSelectComponent_Template_button_keydown_1_listener($event) { return ctx.keydown($event); });
        i0.ɵɵelementStart(3, "span", 3);
        i0.ɵɵtext(4);
        i0.ɵɵpipe(5, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(6, BsSelectComponent_div_6_Template, 2, 4, "div", 4);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵclassMapInterpolate1("btn btn-light ", ctx.disabled ? " disabled" : "", " dropdown-toggle form-control");
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 5, ctx.buttonTitle, ctx.buttonTitleMessageParams));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.opened);
    } }, directives: [i1.NgIf, i1.NgForOf, i2.ScrollIntoView], pipes: [i3.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsSelectComponent, [{
        type: Component,
        args: [{
                selector: "sq-select",
                templateUrl: "./select.html",
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        multi: true,
                        useExisting: forwardRef(() => BsSelectComponent),
                    }]
            }]
    }], null, { items: [{
            type: Input
        }], disabled: [{
            type: Input
        }], multiple: [{
            type: Input
        }], buttonElement: [{
            type: ViewChild,
            args: ["button", { static: false }]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvYWR2YW5jZWQvIiwic291cmNlcyI6WyJib290c3RyYXAvYWR2YW5jZWQtZm9ybS1zZWxlY3Qvc2VsZWN0L3NlbGVjdC50cyIsImJvb3RzdHJhcC9hZHZhbmNlZC1mb3JtLXNlbGVjdC9zZWxlY3Qvc2VsZWN0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBYyxNQUFNLGVBQWUsQ0FBQztBQUM1RixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7O0lDSXpDLDRCQUdJO0lBRkEseU5BQStCLHFMQUFBO0lBRS9CLHVCQUFpRjtJQUNqRiw0QkFBTTtJQUFBLFlBQVk7SUFBQSxpQkFBTztJQUM3QixpQkFBSTs7Ozs7SUFMNkMsMkZBQTBEO0lBRXZHLHFHQUErRDtJQUN6RCxlQUFtRTtJQUFuRSxvR0FBbUU7SUFDbkUsZUFBWTtJQUFaLGlDQUFZOzs7O0lBTjFCLDhCQUNJO0lBRHFJLHFNQUErQjtJQUVwSyxxRUFLSTtJQUNSLGlCQUFNOzs7SUFSK0UsbURBQW1DO0lBQXBHLHVDQUFrQjtJQUVWLGVBQVU7SUFBVixzQ0FBVTs7QURRMUMsTUFBTSxPQUFPLGlCQUFpQjtJQVQ5QjtRQWNJLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixlQUFVLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDaEIsZUFBVSxHQUFZLEtBQUssQ0FBQyxDQUFDLDhGQUE4RjtRQUczSCxxQkFBZ0IsR0FBcUIsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0tBME16RDtJQXhNRyxRQUFRO1FBQ0osSUFBSSxDQUFDLGFBQWEs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QUFXLEVBQUUsZUFBZTtnQkFDNUIsU0FBUyxFQUFFLENBQUM7d0JBQ1IsT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsS0FBSyxFQUFFLElBQUk7d0JBQ1gsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUM7cUJBQy9DLENBQUM7YUFDVDtnQkFFWSxLQUFLO2tCQUFiLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLO1lBQ0csUUFBUTtrQkFBaEIsS0FBSztZQUNnQyxhQUFhO2tCQUFsRCxTQUFTO21CQUFDLFFBQVEsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIGZvcndhcmRSZWYsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVXRpbHMsIEtleXMgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQgeyBWYWx1ZUl0ZW0gfSBmcm9tICdAc2luZXF1YS9jb3JlL2FwcC11dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLXNlbGVjdFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2VsZWN0Lmh0bWxcIixcbiAgICBwcm92aWRlcnM6IFt7XG4gICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQnNTZWxlY3RDb21wb25lbnQpLFxuICAgICAgICB9XVxufSlcbmV4cG9ydCBjbGFzcyBCc1NlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuICAgIEBJbnB1dCgpIGl0ZW1zOiBWYWx1ZUl0ZW1bXTtcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbjtcbiAgICBAVmlld0NoaWxkKFwiYnV0dG9uXCIsIHtzdGF0aWM6IGZhbHNlfSkgYnV0dG9uRWxlbWVudDogRWxlbWVudFJlZjtcbiAgICBvcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBhY3RpdmVJdGVtOiBudW1iZXIgPSAtMTtcbiAgICBwcml2YXRlIGNhbmNlbEJsdXI6IGJvb2xlYW4gPSBmYWxzZTsgLy8gRm9yIElFIHdoaWNoIHRha2VzIGZvY3VzIHdoZW4gY2xpY2tpbmcgb24gZHJvcGRvd24gc2Nyb2xsYmFyIGRlc3BpdGUgdGhlIG1vdXNlZG93biBoYW5kbGluZ1xuICAgIHB1YmxpYyBuYW1lczogc3RyaW5nW107XG4gICAgcHJpdmF0ZSBzZWxlY3RlZEl0ZW1zOiBudW1iZXJbXTsgLy9zdG9yZXMgaW5kaWNlcyBvZiBzZWxlY3RlZCBpdGVtc1xuICAgIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3RlZCgpO1xuICAgICAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uYW1lcyA9IFtdO1xuICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goaXRlbSA9PiB0aGlzLm5hbWVzLnB1c2goaXRlbS5kaXNwbGF5ISkpO1xuICAgIH1cblxuICAgIHNldE9wZW4odmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wZW5lZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vcGVuZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNPcGVuID0gdmFsdWU7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IC0xO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW91c2Vkb3duKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmNhbmNlbEJsdXIgPSB0cnVlO1xuICAgICAgICBVdGlscy5kZWxheSgpLnRoZW4oKCkgPT4gdGhpcy5jYW5jZWxCbHVyID0gZmFsc2UpO1xuICAgIH1cblxuICAgIGJsdXIoZXZlbnQ6IEZvY3VzRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuY2VsQmx1cikge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgVXRpbHMuZGVsYXkoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbkVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcbiAgICB9XG5cbiAgICB0b2dnbGVPcGVuKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0T3BlbighdGhpcy5pc09wZW4pO1xuICAgIH1cblxuICAgIGtleWRvd24oJGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gYXJyb3cgZG93blxuICAgICAgICBpZiAoJGV2ZW50LmtleUNvZGUgPT09IEtleXMuZG93bikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSsrO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlSXRlbSA+PSB0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhcnJvdyB1cFxuICAgICAgICBlbHNlIGlmICgkZXZlbnQua2V5Q29kZSA9PT0gS2V5cy51cCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbS0tO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlSXRlbSA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSB0aGlzLml0ZW1zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBlbnRlciBvciBzcGFjZVxuICAgICAgICBlbHNlIGlmICgoJGV2ZW50LmtleUNvZGUgPT09IEtleXMuZW50ZXIgfHwgJGV2ZW50LmtleUNvZGUgPT09IEtleXMuc3BhY2UpICYmXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPj0gMCAmJiB0aGlzLmFjdGl2ZUl0ZW0gPCB0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVJdGVtU2VsZWN0ZWQodGhpcy5hY3RpdmVJdGVtKTtcbiAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGVzY2FwZVxuICAgICAgICBlbHNlIGlmICgkZXZlbnQua2V5Q29kZSA9PT0gS2V5cy5lc2MgJiYgdGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYXJTZWxlY3RlZCgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb3VudFNlbGVjdGVkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO1xuICAgIH1cblxuICAgIGlzSXRlbVNlbGVjdGVkKGl0ZW1JbmRleDogbnVtYmVyKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGl0ZW1JbmRleCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlSXRlbVNlbGVjdGVkKGl0ZW1JbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGlkeDogbnVtYmVyID0gdGhpcy5zZWxlY3RlZEl0ZW1zLmluZGV4T2YoaXRlbUluZGV4KTtcbiAgICAgICAgLy8gUmVtb3ZlIGl0ZW0gaWYgaXQgd2FzIGFscmVhZHkgc2VsZWN0ZWRcbiAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVndWxhciBjYXNlOiBqdXN0IGFkZCB0aGUgaW5kZXgsIGFuZCB1cGRhdGUgdGhlIGFjdGl2ZSBpdGVtIGlmIGl0IGV4aXN0c1xuICAgICAgICBlbHNlIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMucHVzaChpdGVtSW5kZXgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlSXRlbSA+PSAwKVxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IGl0ZW1JbmRleDtcbiAgICAgICAgfVxuICAgICAgICAvLyBzaW5nbGUtaXRlbSBjYXNlOiBlbnN1cmUgdGhlcmUgaXMgb25seSBvbmUgc2VsZWN0ZWQgaXRlbSwgYW5kIGNsb3NlIHRoZSBtZW51XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW2l0ZW1JbmRleF07XG4gICAgICAgICAgICB0aGlzLnNldE9wZW4oZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJpZ2dlck9uQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgLyogVGVtcGxhdGUgcHJvcGVydGllcyAqL1xuICAgIGdldCBidXR0b25UaXRsZU1lc3NhZ2VQYXJhbXMoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgICAgIGNvdW50OiB0aGlzLmNvdW50U2VsZWN0ZWQoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldCBidXR0b25UaXRsZSgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBzZWxlY3RDb3VudCA9IHRoaXMuY291bnRTZWxlY3RlZCgpO1xuXG4gICAgICAgIGlmIChzZWxlY3RDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwibXNnI2FkdmFuY2VkLnNlbGVjdC5ub0l0ZW1zXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtc1t0aGlzLnNlbGVjdGVkSXRlbXNbMF1dLmRpc3BsYXkhO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxlY3RDb3VudCA9PT0gdGhpcy5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBcIm1zZyNhZHZhbmNlZC5zZWxlY3QuYWxsSXRlbXNcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vR2V0IGxpc3Qgb2YgaXRlbXMgbmFtZXMgY29ycmVzcG9uZGluZyB0byBzZWxlY3RlZCBpbmRpY2VzXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSXRlbXNcbiAgICAgICAgICAgIC5tYXAoaW5kZXggPT4gdGhpcy5pdGVtc1tpbmRleF0uZGlzcGxheSEpXG4gICAgICAgICAgICAuc29ydCgpXG4gICAgICAgICAgICAuam9pbihcIiwgXCIpO1xuICAgIH1cblxuICAgIGdldCBpdGVtTGlzdEhlaWdodCgpOiBzdHJpbmcge1xuICAgICAgICAvLyB1c2UgMTAgYXMgZGVmYXVsdFxuICAgICAgICByZXR1cm4gKDEwICogNCkgKyBcImV4XCI7XG4gICAgfVxuICAgIC8qIEVuZCBUZW1wbGF0ZSBwcm9wZXJ0aWVzICovXG5cbiAgICAvKiBDaGFuZ2UgZXZlbnQgKi9cbiAgICBwcml2YXRlIHRyaWdnZXJPbkNoYW5nZSgpIHtcbiAgICAgICAgLy8gR2F0aGVyIHNlbGVjdGVkIGl0ZW0gdmFsdWVzXG4gICAgICAgIGxldCB2YWx1ZXM6IFZhbHVlSXRlbSB8IFZhbHVlSXRlbVtdIHwgdW5kZWZpbmVkO1xuICAgICAgICAvLyBXZSBjYW4gbm90IHBhc3MgYW4gZW1wdHkgYXJyYXksIHdoZW4gZW1wdHkgdXNlIHVuZGVmaW5lZCBpbnN0ZWFkXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmV0dXJuIGFuIGFycmF5IGlmIG11bHRpcGxlXG4gICAgICAgIGVsc2UgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHRoaXMuc2VsZWN0ZWRJdGVtcy5tYXAoaW5kZXggPT4gdGhpcy5pdGVtc1tpbmRleF0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRpcmVjdGx5IHBhc3MgdGhlIHZhbHVlIGlmIG5vdCBtdWx0aXBsZVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHRoaXMuaXRlbXNbdGhpcy5zZWxlY3RlZEl0ZW1zWzBdXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2YWx1ZXMpO1xuICAgIH1cbiAgICAvKiBFbmQgQ2hhbmdlIGV2ZW50ICovXG5cbiAgICAvKiBDb250cm9sVmFsdWVBY2Nlc3NvciBtZXRob2RzICovXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogVmFsdWVJdGVtIHwgVmFsdWVJdGVtW10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGVkKCk7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgLy8gdGhlIHZhbHVlIG1heSBub3QgYmUgYW4gYXJyYXkgaWYgdGhpcyBzZWxlY3QgaXMgbm90IG11bHRpcGxlXG4gICAgICAgICAgICBjb25zdCBhc0FycmF5ID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV07XG4gICAgICAgICAgICAvL01hcmsgaXRlbXMgYXMgc2VsZWN0ZWQgYmFzZWQgb24gaW5wdXQgdmFsdWVzXG4gICAgICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGFzQXJyYXkuZmluZCgoZWwpID0+IGVsLnZhbHVlID09PSBpdGVtLnZhbHVlKSAmJiBpbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgfVxuICAgIC8qIEVuZCBDb250cm9sVmFsdWVBY2Nlc3NvciBtZXRob2RzICovXG59XG4iLCI8ZGl2IGNsYXNzPVwiZHJvcGRvd25cIj5cbiAgICA8IS0tIGl0ZW0tbGlzdCB0b2dnbGUgLS0+XG4gICAgPGJ1dHRvbiAjYnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1saWdodCB7e2Rpc2FibGVkID8gJyBkaXNhYmxlZCcgOiAnJ319IGRyb3Bkb3duLXRvZ2dsZSBmb3JtLWNvbnRyb2xcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgdHlwZT1cImJ1dHRvblwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwidG9nZ2xlT3BlbigpXCIgKGJsdXIpPVwiYmx1cigkZXZlbnQpXCIgKGtleWRvd24pPVwia2V5ZG93bigkZXZlbnQpXCIgdGFiaW5kZXg9XCIwXCI+PHNwYW4gY2xhc3M9XCJzcS1idXR0b24tdGV4dFwiPnt7YnV0dG9uVGl0bGUgfCBzcU1lc3NhZ2U6YnV0dG9uVGl0bGVNZXNzYWdlUGFyYW1zfX08L3NwYW4+PC9idXR0b24+XG4gICAgPCEtLSBpdGVtLWxpc3QgdmlldyAtLT5cbiAgICA8ZGl2ICpuZ0lmPVwib3BlbmVkXCIgW2hpZGRlbl09XCIhaXNPcGVuXCIgY2xhc3M9XCJkcm9wZG93bi1tZW51IGRyb3Bkb3duLW1lbnUtbGVmdCBzaG93XCIgW3N0eWxlLm1heC1oZWlnaHRdPVwiaXRlbUxpc3RIZWlnaHRcIiByb2xlPVwiY29tYm9ib3hcIiAobW91c2Vkb3duKT1cIm1vdXNlZG93bigkZXZlbnQpXCI+XG4gICAgICAgIDwhLS0gaXRlbXMgLS0+XG4gICAgICAgIDxhICpuZ0Zvcj1cImxldCBpdGVtTmFtZSBvZiBuYW1lczsgbGV0IGkgPSBpbmRleFwiIGNsYXNzPVwiZHJvcGRvd24taXRlbXt7YWN0aXZlSXRlbSA9PT0gaSA/ICcgYWN0aXZlJyA6ICcnfX1cIlxuICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUl0ZW1TZWxlY3RlZChpKVwiIChrZXlkb3duKT1cImtleWRvd24oJGV2ZW50KVwiIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgICAgW3NxU2Nyb2xsSW50b1ZpZXddPVwie2FjdGl2ZTogaSA9PT0gYWN0aXZlSXRlbSwgZmlyc3Q6IGkgPT09IDB9XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhcyBmYS1jaGVjayB7e2lzSXRlbVNlbGVjdGVkKGkpID8gJycgOiAnIGludmlzaWJsZSd9fSBsZWZ0XCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+e3tpdGVtTmFtZX19PC9zcGFuPlxuICAgICAgICA8L2E+XG4gICAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==