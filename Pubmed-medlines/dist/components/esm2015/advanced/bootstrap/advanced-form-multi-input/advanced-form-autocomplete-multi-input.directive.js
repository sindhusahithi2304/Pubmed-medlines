import { Directive, Input, Output, EventEmitter, HostListener, } from "@angular/core";
import { BsAdvancedFormAutocomplete } from "../advanced-form-autocomplete.directive";
import { Keys } from "@sinequa/core/base";
import * as i0 from "@angular/core";
export class BsAdvancedFormAutocompleteMultiInput extends BsAdvancedFormAutocomplete {
    constructor() {
        super(...arguments);
        /** Event synchronizing the list of search terms in the parent component */
        this.itemsUpdate = new EventEmitter();
        /** Stores the selected search terms selected via Tab */
        this.items = [];
    }
    /**
     * The setAutocompleteItem() method from the original directive is overriden to
     * Sets the content of the <input> based on the given
     * Autocomplete Item.
     * @returns false since we don't need trigger search at this point of time
     */
    setAutocompleteItem(item) {
        if (item) {
            // Store the autocomplete items that will be used to create a selection
            this.items.push(item);
            this.itemsUpdate.next(this.items);
            this.setInputValue("");
        }
        return false;
    }
    /**
     * Listen to user's keyboard actions in the <input>, in order to navigate
     * and select the autocomplete suggestions.
     * Overrides the parent keydown method, adds the management of the backspace key
     * to remove items, enhance the enter key to support adding new items.
     * @param event the keyboard
     */
    keydown(event) {
        const keydown = super.keydown(event);
        if (keydown === undefined) {
            /** We can remove selections by typing <backspace> when the input is empty */
            if (event.keyCode === Keys.backspace) {
                if (this.getInputValue() === "") {
                    this.items.pop();
                    this.itemsUpdate.next(this.items);
                }
            }
            /** Allow the selection one of new item */
            if (event.keyCode === Keys.enter) {
                this._manageSetAutocompleteItem();
            }
        }
        return keydown;
    }
    /**
     * Listens to blur events (out of focus) on the <input> host and overrides the parent blur events
     */
    blur(event) {
        this._manageSetAutocompleteItem();
        this.init();
    }
    _manageSetAutocompleteItem() {
        /** Always consider if there is text in the <input> and that it is not yet added in items  */
        if (!!this.getInputValue() && this.getInputValue() !== "") {
            this.setAutocompleteItem({
                display: this.getInputValue(),
                normalized: this.getInputValue(),
                category: "",
            });
        }
    }
}
BsAdvancedFormAutocompleteMultiInput.ɵfac = function BsAdvancedFormAutocompleteMultiInput_Factory(t) { return ɵBsAdvancedFormAutocompleteMultiInput_BaseFactory(t || BsAdvancedFormAutocompleteMultiInput); };
BsAdvancedFormAutocompleteMultiInput.ɵdir = i0.ɵɵdefineDirective({ type: BsAdvancedFormAutocompleteMultiInput, selectors: [["", "sqAdvancedFormAutocompleteMultiInput", ""]], hostBindings: function BsAdvancedFormAutocompleteMultiInput_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("blur", function BsAdvancedFormAutocompleteMultiInput_blur_HostBindingHandler($event) { return ctx.blur($event); });
    } }, inputs: { items: "items" }, outputs: { itemsUpdate: "itemsUpdate" }, features: [i0.ɵɵInheritDefinitionFeature] });
const ɵBsAdvancedFormAutocompleteMultiInput_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(BsAdvancedFormAutocompleteMultiInput);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsAdvancedFormAutocompleteMultiInput, [{
        type: Directive,
        args: [{
                selector: "[sqAdvancedFormAutocompleteMultiInput]",
            }]
    }], null, { itemsUpdate: [{
            type: Output
        }], items: [{
            type: Input
        }], blur: [{
            type: HostListener,
            args: ["blur", ["$event"]]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2YW5jZWQtZm9ybS1hdXRvY29tcGxldGUtbXVsdGktaW5wdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvYWR2YW5jZWQvIiwic291cmNlcyI6WyJib290c3RyYXAvYWR2YW5jZWQtZm9ybS1tdWx0aS1pbnB1dC9hZHZhbmNlZC1mb3JtLWF1dG9jb21wbGV0ZS1tdWx0aS1pbnB1dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEdBQ2YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDckYsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQUsxQyxNQUFNLE9BQU8sb0NBQXFDLFNBQVEsMEJBQTBCO0lBSHBGOztRQUlJLDJFQUEyRTtRQUNqRSxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFzQixDQUFDO1FBRS9ELHdEQUF3RDtRQUMvQyxVQUFLLEdBQXVCLEVBQUUsQ0FBQztLQThEM0M7SUE1REc7Ozs7O09BS0c7SUFDTyxtQkFBbUIsQ0FBQyxJQUFzQjtRQUNoRCxJQUFJLElBQUksRUFBRTtZQUNOLHVFQUF1RTtZQUN2RSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMxQjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxPQUFPLENBQUMsS0FBb0I7UUFDeEIsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyQyxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDdkIsNkVBQTZFO1lBQzdFLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNsQyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUU7b0JBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDckM7YUFDSjtZQUNELDBDQUEwQztZQUMxQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDOUIsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7YUFDckM7U0FDSjtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7T0FFRztJQUMrQixJQUFJLENBQUMsS0FBaUI7UUFDcEQsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFTywwQkFBMEI7UUFDOUIsNkZBQTZGO1FBQzdGLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxtQkFBbUIsQ0FBQztnQkFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQzdCLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNoQyxRQUFRLEVBQUUsRUFBRTthQUNmLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7cUtBbEVRLG9DQUFvQzt5RUFBcEMsb0NBQW9DO3FIQUFwQyxnQkFBWTs7aUdBQVosb0NBQW9DO2tEQUFwQyxvQ0FBb0M7Y0FIaEQsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSx3Q0FBd0M7YUFDckQ7Z0JBR2EsV0FBVztrQkFBcEIsTUFBTTtZQUdFLEtBQUs7a0JBQWIsS0FBSztZQStDNEIsSUFBSTtrQkFBckMsWUFBWTttQkFBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEhvc3RMaXN0ZW5lcixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEF1dG9jb21wbGV0ZUl0ZW0gfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9hdXRvY29tcGxldGVcIjtcbmltcG9ydCB7IEJzQWR2YW5jZWRGb3JtQXV0b2NvbXBsZXRlIH0gZnJvbSBcIi4uL2FkdmFuY2VkLWZvcm0tYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHsgS2V5cyB9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3NxQWR2YW5jZWRGb3JtQXV0b2NvbXBsZXRlTXVsdGlJbnB1dF1cIixcbn0pXG5leHBvcnQgY2xhc3MgQnNBZHZhbmNlZEZvcm1BdXRvY29tcGxldGVNdWx0aUlucHV0IGV4dGVuZHMgQnNBZHZhbmNlZEZvcm1BdXRvY29tcGxldGUge1xuICAgIC8qKiBFdmVudCBzeW5jaHJvbml6aW5nIHRoZSBsaXN0IG9mIHNlYXJjaCB0ZXJtcyBpbiB0aGUgcGFyZW50IGNvbXBvbmVudCAqL1xuICAgIEBPdXRwdXQoKSBpdGVtc1VwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8QXV0b2NvbXBsZXRlSXRlbVtdPigpO1xuXG4gICAgLyoqIFN0b3JlcyB0aGUgc2VsZWN0ZWQgc2VhcmNoIHRlcm1zIHNlbGVjdGVkIHZpYSBUYWIgKi9cbiAgICBASW5wdXQoKSBpdGVtczogQXV0b2NvbXBsZXRlSXRlbVtdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2V0QXV0b2NvbXBsZXRlSXRlbSgpIG1ldGhvZCBmcm9tIHRoZSBvcmlnaW5hbCBkaXJlY3RpdmUgaXMgb3ZlcnJpZGVuIHRvXG4gICAgICogU2V0cyB0aGUgY29udGVudCBvZiB0aGUgPGlucHV0PiBiYXNlZCBvbiB0aGUgZ2l2ZW5cbiAgICAgKiBBdXRvY29tcGxldGUgSXRlbS5cbiAgICAgKiBAcmV0dXJucyBmYWxzZSBzaW5jZSB3ZSBkb24ndCBuZWVkIHRyaWdnZXIgc2VhcmNoIGF0IHRoaXMgcG9pbnQgb2YgdGltZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBzZXRBdXRvY29tcGxldGVJdGVtKGl0ZW06IEF1dG9jb21wbGV0ZUl0ZW0pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgIC8vIFN0b3JlIHRoZSBhdXRvY29tcGxldGUgaXRlbXMgdGhhdCB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlIGEgc2VsZWN0aW9uXG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zVXBkYXRlLm5leHQodGhpcy5pdGVtcyk7XG4gICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUoXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byB1c2VyJ3Mga2V5Ym9hcmQgYWN0aW9ucyBpbiB0aGUgPGlucHV0PiwgaW4gb3JkZXIgdG8gbmF2aWdhdGVcbiAgICAgKiBhbmQgc2VsZWN0IHRoZSBhdXRvY29tcGxldGUgc3VnZ2VzdGlvbnMuXG4gICAgICogT3ZlcnJpZGVzIHRoZSBwYXJlbnQga2V5ZG93biBtZXRob2QsIGFkZHMgdGhlIG1hbmFnZW1lbnQgb2YgdGhlIGJhY2tzcGFjZSBrZXlcbiAgICAgKiB0byByZW1vdmUgaXRlbXMsIGVuaGFuY2UgdGhlIGVudGVyIGtleSB0byBzdXBwb3J0IGFkZGluZyBuZXcgaXRlbXMuXG4gICAgICogQHBhcmFtIGV2ZW50IHRoZSBrZXlib2FyZFxuICAgICAqL1xuICAgIGtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3Qga2V5ZG93biA9IHN1cGVyLmtleWRvd24oZXZlbnQpO1xuXG4gICAgICAgIGlmIChrZXlkb3duID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8qKiBXZSBjYW4gcmVtb3ZlIHNlbGVjdGlvbnMgYnkgdHlwaW5nIDxiYWNrc3BhY2U+IHdoZW4gdGhlIGlucHV0IGlzIGVtcHR5ICovXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS2V5cy5iYWNrc3BhY2UpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRJbnB1dFZhbHVlKCkgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtc1VwZGF0ZS5uZXh0KHRoaXMuaXRlbXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qKiBBbGxvdyB0aGUgc2VsZWN0aW9uIG9uZSBvZiBuZXcgaXRlbSAqL1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEtleXMuZW50ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYW5hZ2VTZXRBdXRvY29tcGxldGVJdGVtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtleWRvd247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlzdGVucyB0byBibHVyIGV2ZW50cyAob3V0IG9mIGZvY3VzKSBvbiB0aGUgPGlucHV0PiBob3N0IGFuZCBvdmVycmlkZXMgdGhlIHBhcmVudCBibHVyIGV2ZW50c1xuICAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoXCJibHVyXCIsIFtcIiRldmVudFwiXSkgYmx1cihldmVudDogRm9jdXNFdmVudCkge1xuICAgICAgICB0aGlzLl9tYW5hZ2VTZXRBdXRvY29tcGxldGVJdGVtKCk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21hbmFnZVNldEF1dG9jb21wbGV0ZUl0ZW0oKTogdm9pZCB7XG4gICAgICAgIC8qKiBBbHdheXMgY29uc2lkZXIgaWYgdGhlcmUgaXMgdGV4dCBpbiB0aGUgPGlucHV0PiBhbmQgdGhhdCBpdCBpcyBub3QgeWV0IGFkZGVkIGluIGl0ZW1zICAqL1xuICAgICAgICBpZiAoISF0aGlzLmdldElucHV0VmFsdWUoKSAmJiB0aGlzLmdldElucHV0VmFsdWUoKSAhPT0gXCJcIikge1xuICAgICAgICAgICAgdGhpcy5zZXRBdXRvY29tcGxldGVJdGVtKHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiB0aGlzLmdldElucHV0VmFsdWUoKSxcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkOiB0aGlzLmdldElucHV0VmFsdWUoKSxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogXCJcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19