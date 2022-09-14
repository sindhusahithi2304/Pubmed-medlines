import { Directive, Input, HostListener, Output, EventEmitter } from "@angular/core";
import { Autocomplete, AutocompleteState } from "@sinequa/components/autocomplete";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/components/autocomplete";
import * as i2 from "@sinequa/core/app-utils";
import * as i3 from "@sinequa/components/utils";
export class BsAdvancedFormAutocomplete extends Autocomplete {
    constructor(elementRef, suggestService, appService, uiService) {
        super(elementRef, suggestService, appService, uiService);
        this.UpdateItem = new EventEmitter();
    }
    /**
     * The ngOnInit() method from the original directive is overriden
     * On initialization, we listen to the autocomplete component for
     * selection events
     */
    ngOnInit() {
        this._dropdownSubscription = this.dropdown.clicked.subscribe((item) => {
            this.select(item, false); // An item was selected from the autocomplete => take the value
        });
        this.start();
    }
    getSuggests() {
        const value = this.getInputValue();
        if (value) {
            // If there is text, make a call to the suggest API
            this.processSuggests(this.getSuggestsObs(value, [this.field]));
        }
        else {
            // If empty input, restart autocomplete
            this.start();
        }
    }
    processSuggests(obs) {
        obs.subscribe(suggests => {
            if (this.getState() === AutocompleteState.ACTIVE || this.getState() === AutocompleteState.OPENED) {
                this.dropdown.update(true, suggests
                    .filter(item => item.category !== "$field$") // Filter out fields
                    .map(item => {
                    if (!item.label) {
                        item.label = this.appService.getLabel(item.category);
                    }
                    if (!item.normalized) {
                        item.normalized = item.display;
                    }
                    return item;
                }));
            }
        }, err => {
            this.dropdown.update(false);
        }, () => {
            if (this.dropdown.hasItems && this.getState() === AutocompleteState.ACTIVE) {
                this.open(); // Switch from ACTIVE to OPENED (if not already)
            }
            else if (!this.dropdown.hasItems && this.getState() === AutocompleteState.OPENED) { // No data
                this.active(); // Switch from OPENED to ACTIVE (if not already)
            }
        });
    }
    setAutocompleteItem(item) {
        if (item) {
            this.setInputValue(item.display);
            this.UpdateItem.next(Object.assign(Object.assign({}, item), { normalized: item.normalized ? item.normalized : item.display }));
            return true;
        }
        return false;
    }
    /**
     * Listen to blur events on the <input> host and overrides the autocomplete blur events
     */
    blur(event) {
        /** If there is text in the <input/> and not selected from the dropdown ==> set the item manually */
        if (this.getState() !== AutocompleteState.SELECTED) {
            if (!!this.getInputValue() && this.getInputValue() !== "") {
                const item = {
                    display: this.getInputValue(),
                    normalized: this.getInputValue(),
                    category: "",
                };
                this.setAutocompleteItem(item);
            }
            else {
                this.UpdateItem.next(undefined);
            }
        }
        this.init();
    }
    /**
     * Overrides the parent inputChanged method, so that it is possible to reinitialize the autocomplete
     * @param event
     */
    inputChanged(event) {
        switch (this.getState()) {
            case AutocompleteState.OPENED:
                this.suggest(); // Just request more data, but no state change
                break;
            case AutocompleteState.START:
            case AutocompleteState.ACTIVE:
                this.active(); // get more data, and change state if not already ACTIVE
                break;
            case AutocompleteState.SELECTED:
                this.start(); // The model changed because we selected a value ==> we restart in case the user keeps typing
                this.active();
                break;
            case AutocompleteState.INIT:
                break;
        }
    }
}
BsAdvancedFormAutocomplete.ɵfac = function BsAdvancedFormAutocomplete_Factory(t) { return new (t || BsAdvancedFormAutocomplete)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.SuggestService), i0.ɵɵdirectiveInject(i2.AppService), i0.ɵɵdirectiveInject(i3.UIService)); };
BsAdvancedFormAutocomplete.ɵdir = i0.ɵɵdefineDirective({ type: BsAdvancedFormAutocomplete, selectors: [["", "sqAdvancedFormAutocomplete", ""]], hostBindings: function BsAdvancedFormAutocomplete_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("blur", function BsAdvancedFormAutocomplete_blur_HostBindingHandler($event) { return ctx.blur($event); })("input", function BsAdvancedFormAutocomplete_input_HostBindingHandler($event) { return ctx.inputChanged($event); });
    } }, inputs: { field: "field" }, outputs: { UpdateItem: "UpdateItem" }, features: [i0.ɵɵInheritDefinitionFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsAdvancedFormAutocomplete, [{
        type: Directive,
        args: [{
                selector: "[sqAdvancedFormAutocomplete]",
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.SuggestService }, { type: i2.AppService }, { type: i3.UIService }]; }, { UpdateItem: [{
            type: Output
        }], field: [{
            type: Input
        }], blur: [{
            type: HostListener,
            args: ["blur", ["$event"]]
        }], inputChanged: [{
            type: HostListener,
            args: ["input", ["$event"]]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2YW5jZWQtZm9ybS1hdXRvY29tcGxldGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvYWR2YW5jZWQvIiwic291cmNlcyI6WyJib290c3RyYXAvYWR2YW5jZWQtZm9ybS1hdXRvY29tcGxldGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFjLFlBQVksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxZQUFZLEVBQW9DLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7O0FBUXJILE1BQU0sT0FBTywwQkFBMkIsU0FBUSxZQUFZO0lBSXhELFlBQ0ksVUFBc0IsRUFDdEIsY0FBOEIsRUFDOUIsVUFBc0IsRUFDdEIsU0FBb0I7UUFFcEIsS0FBSyxDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBVG5ELGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBZ0MsQ0FBQztJQVV4RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFFBQVE7UUFDSixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQywrREFBK0Q7UUFDN0YsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVTLFdBQVc7UUFDakIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ25DLElBQUksS0FBSyxFQUFFO1lBQ1AsbURBQW1EO1lBQ25ELElBQUksQ0FBQyxlQUFlLENBQ2hCLElBQUksQ0FB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QUM7YUFDbEM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDbkM7U0FDSjtRQUNELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztPQUdHO0lBQ2dDLFlBQVksQ0FBQyxLQUFZO1FBQ3hELFFBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3JCLEtBQUssaUJBQWlCLENBQUMsTUFBTTtnQkFDekIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsOENBQThDO2dCQUM5RCxNQUFNO1lBQ1YsS0FBSyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7WUFDN0IsS0FBSyxpQkFBaUIsQ0FBQyxNQUFNO2dCQUN6QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyx3REFBd0Q7Z0JBQ3ZFLE1BQU07WUFDVixLQUFLLGlCQUFpQixDQUFDLFFBQVE7Z0JBQzNCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLDZGQUE2RjtnQkFDM0csSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNkLE1BQU07WUFDVixLQUFLLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3ZCLE1BQU07U0FDYjtJQUNMLENBQUM7O29HQXhIUSwwQkFBMEI7K0RBQTFCLDBCQUEwQjsyR0FBMUIsZ0JBQVksNEZBQVosd0JBQW9COztrREFBcEIsMEJBQTBCO2NBSHRDLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsOEJBQThCO2FBQzNDOzJJQUVhLFVBQVU7a0JBQW5CLE1BQU07WUFDRSxLQUFLO2tCQUFiLEtBQUs7WUFpRjRCLElBQUk7a0JBQXJDLFlBQVk7bUJBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBcUJHLFlBQVk7a0JBQTlDLFlBQVk7bUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEF1dG9jb21wbGV0ZSwgU3VnZ2VzdFNlcnZpY2UsIEF1dG9jb21wbGV0ZUl0ZW0sIEF1dG9jb21wbGV0ZVN0YXRlIH0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlXCI7XG5pbXBvcnQgeyBVSVNlcnZpY2UgfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy91dGlsc1wiO1xuaW1wb3J0IHsgQXBwU2VydmljZSB9IGZyb20gXCJAc2luZXF1YS9jb3JlL2FwcC11dGlsc1wiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbc3FBZHZhbmNlZEZvcm1BdXRvY29tcGxldGVdXCIsXG59KVxuZXhwb3J0IGNsYXNzIEJzQWR2YW5jZWRGb3JtQXV0b2NvbXBsZXRlIGV4dGVuZHMgQXV0b2NvbXBsZXRlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBAT3V0cHV0KCkgVXBkYXRlSXRlbSA9IG5ldyBFdmVudEVtaXR0ZXI8QXV0b2NvbXBsZXRlSXRlbSB8IHVuZGVmaW5lZD4oKTtcbiAgICBASW5wdXQoKSBmaWVsZCA6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBzdWdnZXN0U2VydmljZTogU3VnZ2VzdFNlcnZpY2UsXG4gICAgICAgIGFwcFNlcnZpY2U6IEFwcFNlcnZpY2UsXG4gICAgICAgIHVpU2VydmljZTogVUlTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYsIHN1Z2dlc3RTZXJ2aWNlLCBhcHBTZXJ2aWNlLCB1aVNlcnZpY2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBuZ09uSW5pdCgpIG1ldGhvZCBmcm9tIHRoZSBvcmlnaW5hbCBkaXJlY3RpdmUgaXMgb3ZlcnJpZGVuXG4gICAgICogT24gaW5pdGlhbGl6YXRpb24sIHdlIGxpc3RlbiB0byB0aGUgYXV0b2NvbXBsZXRlIGNvbXBvbmVudCBmb3JcbiAgICAgKiBzZWxlY3Rpb24gZXZlbnRzXG4gICAgICovXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX2Ryb3Bkb3duU3Vic2NyaXB0aW9uID0gdGhpcy5kcm9wZG93bi5jbGlja2VkLnN1YnNjcmliZSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3QoaXRlbSwgZmFsc2UpOyAvLyBBbiBpdGVtIHdhcyBzZWxlY3RlZCBmcm9tIHRoZSBhdXRvY29tcGxldGUgPT4gdGFrZSB0aGUgdmFsdWVcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0U3VnZ2VzdHMoKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRJbnB1dFZhbHVlKCk7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgdGV4dCwgbWFrZSBhIGNhbGwgdG8gdGhlIHN1Z2dlc3QgQVBJXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NTdWdnZXN0cyhcbiAgICAgICAgICAgICAgICB0aGlzLmdldFN1Z2dlc3RzT2JzKHZhbHVlLCBbdGhpcy5maWVsZF0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSWYgZW1wdHkgaW5wdXQsIHJlc3RhcnQgYXV0b2NvbXBsZXRlXG4gICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcHJvY2Vzc1N1Z2dlc3RzKG9iczogT2JzZXJ2YWJsZTxBdXRvY29tcGxldGVJdGVtW10+KXtcbiAgICAgICAgb2JzLnN1YnNjcmliZShcbiAgICAgICAgICAgIHN1Z2dlc3RzID0+IHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmdldFN0YXRlKCkgPT09IEF1dG9jb21wbGV0ZVN0YXRlLkFDVElWRSB8fCB0aGlzLmdldFN0YXRlKCkgPT09IEF1dG9jb21wbGV0ZVN0YXRlLk9QRU5FRCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd24udXBkYXRlKHRydWUsIHN1Z2dlc3RzXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gaXRlbS5jYXRlZ29yeSAhPT0gXCIkZmllbGQkXCIpICAvLyBGaWx0ZXIgb3V0IGZpZWxkc1xuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighaXRlbS5sYWJlbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubGFiZWwgPSB0aGlzLmFwcFNlcnZpY2UuZ2V0TGFiZWwoaXRlbS5jYXRlZ29yeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXRlbS5ub3JtYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubm9ybWFsaXplZCA9IGl0ZW0uZGlzcGxheTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bi51cGRhdGUoZmFsc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmRyb3Bkb3duLmhhc0l0ZW1zICYmIHRoaXMuZ2V0U3RhdGUoKSA9PT0gQXV0b2NvbXBsZXRlU3RhdGUuQUNUSVZFKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuKCk7ICAgIC8vIFN3aXRjaCBmcm9tIEFDVElWRSB0byBPUEVORUQgKGlmIG5vdCBhbHJlYWR5KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKCF0aGlzLmRyb3Bkb3duLmhhc0l0ZW1zICYmIHRoaXMuZ2V0U3RhdGUoKSA9PT0gQXV0b2NvbXBsZXRlU3RhdGUuT1BFTkVEKXsgICAvLyBObyBkYXRhXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlKCk7ICAvLyBTd2l0Y2ggZnJvbSBPUEVORUQgdG8gQUNUSVZFIChpZiBub3QgYWxyZWFkeSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0QXV0b2NvbXBsZXRlSXRlbShpdGVtOiBBdXRvY29tcGxldGVJdGVtKTogYm9vbGVhbiB7XG4gICAgICAgIGlmKGl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZShpdGVtLmRpc3BsYXkpO1xuICAgICAgICAgICAgdGhpcy5VcGRhdGVJdGVtLm5leHQoe1xuICAgICAgICAgICAgICAgIC4uLml0ZW0sXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZDogaXRlbS5ub3JtYWxpemVkID8gaXRlbS5ub3JtYWxpemVkIDogaXRlbS5kaXNwbGF5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gYmx1ciBldmVudHMgb24gdGhlIDxpbnB1dD4gaG9zdCBhbmQgb3ZlcnJpZGVzIHRoZSBhdXRvY29tcGxldGUgYmx1ciBldmVudHNcbiAgICAgKi9cbiAgICBASG9zdExpc3RlbmVyKFwiYmx1clwiLCBbXCIkZXZlbnRcIl0pIGJsdXIoZXZlbnQ6IEZvY3VzRXZlbnQpIHtcbiAgICAgICAgLyoqIElmIHRoZXJlIGlzIHRleHQgaW4gdGhlIDxpbnB1dC8+IGFuZCBub3Qgc2VsZWN0ZWQgZnJvbSB0aGUgZHJvcGRvd24gPT0+IHNldCB0aGUgaXRlbSBtYW51YWxseSAqL1xuICAgICAgICBpZiAodGhpcy5nZXRTdGF0ZSgpICE9PSBBdXRvY29tcGxldGVTdGF0ZS5TRUxFQ1RFRCkge1xuICAgICAgICAgICAgaWYgKCEhdGhpcy5nZXRJbnB1dFZhbHVlKCkgJiYgdGhpcy5nZXRJbnB1dFZhbHVlKCkgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiB0aGlzLmdldElucHV0VmFsdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsaXplZDogdGhpcy5nZXRJbnB1dFZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBcIlwiLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNldEF1dG9jb21wbGV0ZUl0ZW0oaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlSXRlbS5uZXh0KHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGVzIHRoZSBwYXJlbnQgaW5wdXRDaGFuZ2VkIG1ldGhvZCwgc28gdGhhdCBpdCBpcyBwb3NzaWJsZSB0byByZWluaXRpYWxpemUgdGhlIGF1dG9jb21wbGV0ZVxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoXCJpbnB1dFwiLCBbXCIkZXZlbnRcIl0pIGlucHV0Q2hhbmdlZChldmVudDogRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmdldFN0YXRlKCkpIHtcbiAgICAgICAgICAgIGNhc2UgQXV0b2NvbXBsZXRlU3RhdGUuT1BFTkVEOlxuICAgICAgICAgICAgICAgIHRoaXMuc3VnZ2VzdCgpOyAvLyBKdXN0IHJlcXVlc3QgbW9yZSBkYXRhLCBidXQgbm8gc3RhdGUgY2hhbmdlXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEF1dG9jb21wbGV0ZVN0YXRlLlNUQVJUOlxuICAgICAgICAgICAgY2FzZSBBdXRvY29tcGxldGVTdGF0ZS5BQ1RJVkU6XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUoKTsgLy8gZ2V0IG1vcmUgZGF0YSwgYW5kIGNoYW5nZSBzdGF0ZSBpZiBub3QgYWxyZWFkeSBBQ1RJVkVcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQXV0b2NvbXBsZXRlU3RhdGUuU0VMRUNURUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydCgpOyAvLyBUaGUgbW9kZWwgY2hhbmdlZCBiZWNhdXNlIHdlIHNlbGVjdGVkIGEgdmFsdWUgPT0+IHdlIHJlc3RhcnQgaW4gY2FzZSB0aGUgdXNlciBrZWVwcyB0eXBpbmdcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBdXRvY29tcGxldGVTdGF0ZS5JTklUOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19