import { Directive, Input, EventEmitter, Output, HostListener, } from "@angular/core";
import { Autocomplete, AutocompleteState, } from "@sinequa/components/autocomplete";
import { Keys } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/components/autocomplete";
import * as i2 from "@sinequa/core/app-utils";
import * as i3 from "@sinequa/components/utils";
import * as i4 from "@sinequa/core/web-services";
import * as i5 from "./labels.service";
export class LabelsAutocomplete extends Autocomplete {
    constructor(elementRef, suggestService, appService, uiService, labelsWebService, labelsService) {
        super(elementRef, suggestService, appService, uiService);
        this.labelsWebService = labelsWebService;
        this.labelsService = labelsService;
        /** Event synchronizing the list of selected labels in the parent component */
        this.itemsUpdate = new EventEmitter();
        /** Enable adding new labels in labelsItems or not */
        this.allowNewLabels = false;
        /** Define the right of adding new labels in labelsItems or not */
        this.allowManagePublicLabels = false;
        /** Stores the selected labels items selected via Tab */
        this.labelsItems = [];
        /** Stores the suggestions retrieved by th server in order to perform checks on key.enter events */
        this._suggestions = [];
    }
    /**
     * The ngOnInit() method from the original directive is overriden
     * On initialization, we listen to the autocomplete component for
     * selection events
     */
    ngOnInit() {
        this._dropdownSubscription = this.dropdown.clicked.subscribe((item) => {
            this.select(item, true); // An item was selected from the autocomplete => take the value
        });
        this.start();
    }
    /**
     * If the inputs changes state, react accordingly
     * @param changes
     */
    ngOnChanges(changes) {
        if (changes["labelsItems"]) {
            this.updatePlaceholder();
        }
        // Override start() by using init() instead, so that no double queries are generated and autocomplete dropdown is shown only on focus
        if (changes["off"] && !this.off) {
            this.init();
        }
        // If labels category changes, we must remove the selected labels items and reinitialize the autocomplete
        if (changes["public"] && !changes["public"].firstChange) {
            const newInitLabels = [...changes["labelsItems"].currentValue];
            this.inputElement.blur();
            /** Reset the input Value*/
            this.setInputValue("");
            /** initialize the input needed specially for labels edit cases */
            this.updatePlaceholder();
            this.itemsUpdate.next(newInitLabels);
        }
    }
    /**
     * The getSuggests() method from the original directive is overriden to
     * use the labelsService rather than suggest service.
     */
    getSuggests() {
        const value = this.getInputValue();
        if (value) {
            // parse
            const labels = value.split(";");
            // find label at caret location
            const position = this.getInputPosition();
            let length = 0;
            let val;
            for (const label of labels) {
                if (position >= length && position <= length + label.length) {
                    val = {
                        value: label,
                        start: length,
                        length: label.length,
                    };
                    break;
                }
                length += label.length + 1;
            }
            // Get suggestions from web service
            if (val) {
                this._getLabelsSuggestions(val.value);
            }
        }
        else {
            if (!!this.labelsService.labelsAutoSuggestWildcard) {
                this._getLabelsSuggestions(this.labelsService.labelsAutoSuggestWildcard);
            }
            else {
                this.start();
            }
        }
    }
    _getLabelsSuggestions(val) {
        this.labelsWebService.list(val, this.public).subscribe((labels) => {
            if (this.getState() === AutocompleteState.ACTIVE ||
                this.getState() === AutocompleteState.OPENED) {
                /** Eliminate suggestions that are already selected */
                labels.labels = labels.labels.filter((label) => !this.labelsItems.find((item) => item.display === label));
                /** update the local list of suggestions */
                this._suggestions = labels.labels;
                /** limit the suggestions to be displayed to 10  */
                labels.labels = labels.labels.slice(0, 10);
                this.dropdown.update(true, labels.labels.map((label) => {
                    return {
                        display: label,
                        category: "",
                    };
                }));
            }
        }, () => {
            this.dropdown.update(false);
        }, () => {
            if (this.dropdown.hasItems &&
                this.getState() === AutocompleteState.ACTIVE) {
                this.open(); // Switch from ACTIVE to OPENED (if not already)
            }
            else if (!this.dropdown.hasItems &&
                this.getState() === AutocompleteState.OPENED) {
                // No data
                this.active(); // Switch from OPENED to ACTIVE (if not already)
            }
        });
    }
    /**
     * The setAutocompleteItem() method from the original directive is overriden to
     * Sets the content of the <input> based on the given
     * Autocomplete Item.
     * @returns false since labels items don't need to be searched
     */
    setAutocompleteItem(item) {
        if (item) {
            // Store the autocomplete items that will be used to create a selection
            this.labelsItems.push(item);
            this.updatePlaceholder();
            this.itemsUpdate.next(this.labelsItems);
            this.setInputValue("");
        }
        return false;
    }
    /**
     * The startOrActive() method from the original directive is overriden to
     * immediately switch to ACTIVE if it is not the case
     */
    startOrActive() {
        if (this.getState() !== AutocompleteState.ACTIVE &&
            this.getState() !== AutocompleteState.OPENED) {
            // Avoid flickering
            this.start();
            this.active();
        }
    }
    /**
     * Listen to user's keyboard actions in the <input>, in order to navigate
     * and select the autocomplete suggestions.
     * Overrides the parent keydown method, adds the management of the backspace key
     * to remove labels items, enhance the enter key to support adding new labels.
     * @param event the keyboard
     */
    keydown(event) {
        const keydown = super.keydown(event);
        if (keydown === undefined) {
            //We can remove selections by typing <backspace> when the input is empty
            if (event.keyCode === Keys.backspace) {
                if (this.getInputValue() === "") {
                    this.labelsItems.pop();
                    this.updatePlaceholder();
                    this.itemsUpdate.next(this.labelsItems);
                }
            }
            /** Allow the selection one of new labels that not exists in the list */
            if (event.keyCode === Keys.enter) {
                this._manageSetAutocompleteItem();
            }
        }
        return keydown;
    }
    /**
     * Listens to focus events on the <input> host and overrides the parent focus events in order to launch the autocomplete
     * If empty input :
     * - display top relevent labels if the auto-suggest wildcard is configured
     * - restart the autocomplete if no auto-suggest wildcard is found
     * If not empty input :
     * retrieve suggestions based on this input text
     */
    focus() {
        this.start();
        this.active();
    }
    /**
     * Listens to blur events (out of focus) on the <input> host and overrides the parent blur events
     */
    blur(event) {
        this._manageSetAutocompleteItem();
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
    /**
     * Updates the <input>'s placeholder to avoid displaying something
     * when there are labelsItems displayed to the left.
     */
    updatePlaceholder() {
        this._placeholder = this.labelsItems.length > 0 ? "" : this.placeholder;
    }
    _manageSetAutocompleteItem() {
        /** Always consider if there is text in the <input> and that it is not yet added in the labelsItems  */
        if (!!this.getInputValue() && this.getInputValue() !== "") {
            if (this.allowNewLabels) {
                /** When it is an add Labels action ==> check the privilege to create new label */
                if (!this.public ||
                    (this.public && this.allowManagePublicLabels)) {
                    this.setAutocompleteItem({
                        display: this.getInputValue(),
                        category: "",
                    });
                }
            }
            else {
                /** For all other actions on the labels, check if the typed text equals an existing label in the _suggestions  */
                if (this._suggestions.indexOf(this.getInputValue()) > -1) {
                    this.setAutocompleteItem({
                        display: this.getInputValue(),
                        category: "",
                    });
                }
            }
        }
    }
}
LabelsAutocomplete.ɵfac = function LabelsAutocomplete_Factory(t) { return new (t || LabelsAutocomplete)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.SuggestService), i0.ɵɵdirectiveInject(i2.AppService), i0.ɵɵdirectiveInject(i3.UIService), i0.ɵɵdirectiveInject(i4.LabelsWebService), i0.ɵɵdirectiveInject(i5.LabelsService)); };
LabelsAutocomplete.ɵdir = i0.ɵɵdefineDirective({ type: LabelsAutocomplete, selectors: [["", "sqAutocompleteLabels", ""]], hostBindings: function LabelsAutocomplete_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("focus", function LabelsAutocomplete_focus_HostBindingHandler() { return ctx.focus(); })("blur", function LabelsAutocomplete_blur_HostBindingHandler($event) { return ctx.blur($event); })("input", function LabelsAutocomplete_input_HostBindingHandler($event) { return ctx.inputChanged($event); });
    } }, inputs: { public: "public", allowNewLabels: "allowNewLabels", allowManagePublicLabels: "allowManagePublicLabels", labelsItems: "labelsItems" }, outputs: { itemsUpdate: "itemsUpdate" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LabelsAutocomplete, [{
        type: Directive,
        args: [{
                selector: "[sqAutocompleteLabels]",
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.SuggestService }, { type: i2.AppService }, { type: i3.UIService }, { type: i4.LabelsWebService }, { type: i5.LabelsService }]; }, { itemsUpdate: [{
            type: Output
        }], public: [{
            type: Input
        }], allowNewLabels: [{
            type: Input
        }], allowManagePublicLabels: [{
            type: Input
        }], labelsItems: [{
            type: Input
        }], focus: [{
            type: HostListener,
            args: ["focus"]
        }], blur: [{
            type: HostListener,
            args: ["blur", ["$event"]]
        }], inputChanged: [{
            type: HostListener,
            args: ["input", ["$event"]]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWxzLWF1dG9jb21wbGV0ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9sYWJlbHMvIiwic291cmNlcyI6WyJsYWJlbHMtYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUVULEtBQUssRUFDTCxZQUFZLEVBRVosTUFBTSxFQUNOLFlBQVksR0FHZixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsWUFBWSxFQUVaLGlCQUFpQixHQUVwQixNQUFNLGtDQUFrQyxDQUFDO0FBSTFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7OztBQU0xQyxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsWUFBWTtJQW1CaEQsWUFDSSxVQUFzQixFQUN0QixjQUE4QixFQUM5QixVQUFzQixFQUN0QixTQUFvQixFQUNaLGdCQUFrQyxFQUNsQyxhQUE0QjtRQUVwQyxLQUFLLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFIakQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXhCeEMsOEVBQThFO1FBQ3BFLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQXNCLENBQUM7UUFLL0QscURBQXFEO1FBQzVDLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBRXpDLGtFQUFrRTtRQUN6RCw0QkFBdUIsR0FBWSxLQUFLLENBQUM7UUFFbEQsd0RBQXdEO1FBQy9DLGdCQUFXLEdBQXVCLEVBQUUsQ0FBQztRQUU5QyxtR0FBbUc7UUFDM0YsaUJBQVksR0FBYSxFQUFFLENBQUM7SUFXcEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxRQUFRO1FBQ0osSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFD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O2tCQUEvQixLQUFLO1lBR0csV0FBVztrQkFBbkIsS0FBSztZQXlOaUIsS0FBSztrQkFBM0IsWUFBWTttQkFBQyxPQUFPO1lBUWEsSUFBSTtrQkFBckMsWUFBWTttQkFBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFTRyxZQUFZO2tCQUE5QyxZQUFZO21CQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgT3V0cHV0LFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBPbkluaXQsXG4gICAgT25DaGFuZ2VzLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgICBBdXRvY29tcGxldGUsXG4gICAgU3VnZ2VzdFNlcnZpY2UsXG4gICAgQXV0b2NvbXBsZXRlU3RhdGUsXG4gICAgQXV0b2NvbXBsZXRlSXRlbSxcbn0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlXCI7XG5pbXBvcnQgeyBBcHBTZXJ2aWNlIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYXBwLXV0aWxzXCI7XG5pbXBvcnQgeyBVSVNlcnZpY2UgfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy91dGlsc1wiO1xuaW1wb3J0IHsgTGFiZWxzV2ViU2VydmljZSwgTGFiZWxzIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQgeyBLZXlzIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHsgTGFiZWxzU2VydmljZSB9IGZyb20gXCIuL2xhYmVscy5zZXJ2aWNlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltzcUF1dG9jb21wbGV0ZUxhYmVsc11cIixcbn0pXG5leHBvcnQgY2xhc3MgTGFiZWxzQXV0b2NvbXBsZXRlIGV4dGVuZHMgQXV0b2NvbXBsZXRlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAgIC8qKiBFdmVudCBzeW5jaHJvbml6aW5nIHRoZSBsaXN0IG9mIHNlbGVjdGVkIGxhYmVscyBpbiB0aGUgcGFyZW50IGNvbXBvbmVudCAqL1xuICAgIEBPdXRwdXQoKSBpdGVtc1VwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8QXV0b2NvbXBsZXRlSXRlbVtdPigpO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGxhYmVscyBhcmUgcHVibGljIG9yIG5vdCAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYzogYm9vbGVhbjtcblxuICAgIC8qKiBFbmFibGUgYWRkaW5nIG5ldyBsYWJlbHMgaW4gbGFiZWxzSXRlbXMgb3Igbm90ICovXG4gICAgQElucHV0KCkgYWxsb3dOZXdMYWJlbHM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBEZWZpbmUgdGhlIHJpZ2h0IG9mIGFkZGluZyBuZXcgbGFiZWxzIGluIGxhYmVsc0l0ZW1zIG9yIG5vdCAqL1xuICAgIEBJbnB1dCgpIGFsbG93TWFuYWdlUHVibGljTGFiZWxzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogU3RvcmVzIHRoZSBzZWxlY3RlZCBsYWJlbHMgaXRlbXMgc2VsZWN0ZWQgdmlhIFRhYiAqL1xuICAgIEBJbnB1dCgpIGxhYmVsc0l0ZW1zOiBBdXRvY29tcGxldGVJdGVtW10gPSBbXTtcblxuICAgIC8qKiBTdG9yZXMgdGhlIHN1Z2dlc3Rpb25zIHJldHJpZXZlZCBieSB0aCBzZXJ2ZXIgaW4gb3JkZXIgdG8gcGVyZm9ybSBjaGVja3Mgb24ga2V5LmVudGVyIGV2ZW50cyAqL1xuICAgIHByaXZhdGUgX3N1Z2dlc3Rpb25zOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHN1Z2dlc3RTZXJ2aWNlOiBTdWdnZXN0U2VydmljZSxcbiAgICAgICAgYXBwU2VydmljZTogQXBwU2VydmljZSxcbiAgICAgICAgdWlTZXJ2aWNlOiBVSVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbGFiZWxzV2ViU2VydmljZTogTGFiZWxzV2ViU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBsYWJlbHNTZXJ2aWNlOiBMYWJlbHNTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYsIHN1Z2dlc3RTZXJ2aWNlLCBhcHBTZXJ2aWNlLCB1aVNlcnZpY2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBuZ09uSW5pdCgpIG1ldGhvZCBmcm9tIHRoZSBvcmlnaW5hbCBkaXJlY3RpdmUgaXMgb3ZlcnJpZGVuXG4gICAgICogT24gaW5pdGlhbGl6YXRpb24sIHdlIGxpc3RlbiB0byB0aGUgYXV0b2NvbXBsZXRlIGNvbXBvbmVudCBmb3JcbiAgICAgKiBzZWxlY3Rpb24gZXZlbnRzXG4gICAgICovXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX2Ryb3Bkb3duU3Vic2NyaXB0aW9uID0gdGhpcy5kcm9wZG93bi5jbGlja2VkLnN1YnNjcmliZSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3QoaXRlbSwgdHJ1ZSk7IC8vIEFuIGl0ZW0gd2FzIHNlbGVjdGVkIGZyb20gdGhlIGF1dG9jb21wbGV0ZSA9PiB0YWtlIHRoZSB2YWx1ZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIHRoZSBpbnB1dHMgY2hhbmdlcyBzdGF0ZSwgcmVhY3QgYWNjb3JkaW5nbHlcbiAgICAgKiBAcGFyYW0gY2hhbmdlc1xuICAgICAqL1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbXCJsYWJlbHNJdGVtc1wiXSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQbGFjZWhvbGRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3ZlcnJpZGUgc3RhcnQoKSBieSB1c2luZyBpbml0KCkgaW5zdGVhZCwgc28gdGhhdCBubyBkb3VibGUgcXVlcmllcyBhcmUgZ2VuZXJhdGVkIGFuZCBhdXRvY29tcGxldGUgZHJvcGRvd24gaXMgc2hvd24gb25seSBvbiBmb2N1c1xuICAgICAgICBpZiAoY2hhbmdlc1tcIm9mZlwiXSAmJiAhdGhpcy5vZmYpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgbGFiZWxzIGNhdGVnb3J5IGNoYW5nZXMsIHdlIG11c3QgcmVtb3ZlIHRoZSBzZWxlY3RlZCBsYWJlbHMgaXRlbXMgYW5kIHJlaW5pdGlhbGl6ZSB0aGUgYXV0b2NvbXBsZXRlXG4gICAgICAgIGlmIChjaGFuZ2VzW1wicHVibGljXCJdICYmICFjaGFuZ2VzW1wicHVibGljXCJdLmZpcnN0Q2hhbmdlKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdJbml0TGFiZWxzID0gWy4uLmNoYW5nZXNbXCJsYWJlbHNJdGVtc1wiXS5jdXJyZW50VmFsdWVdO1xuICAgICAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQuYmx1cigpO1xuICAgICAgICAgICAgLyoqIFJlc2V0IHRoZSBpbnB1dCBWYWx1ZSovXG4gICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUoXCJcIik7XG4gICAgICAgICAgICAvKiogaW5pdGlhbGl6ZSB0aGUgaW5wdXQgbmVlZGVkIHNwZWNpYWxseSBmb3IgbGFiZWxzIGVkaXQgY2FzZXMgKi9cbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGxhY2Vob2xkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNVcGRhdGUubmV4dChuZXdJbml0TGFiZWxzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBnZXRTdWdnZXN0cygpIG1ldGhvZCBmcm9tIHRoZSBvcmlnaW5hbCBkaXJlY3RpdmUgaXMgb3ZlcnJpZGVuIHRvXG4gICAgICogdXNlIHRoZSBsYWJlbHNTZXJ2aWNlIHJhdGhlciB0aGFuIHN1Z2dlc3Qgc2VydmljZS5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0U3VnZ2VzdHMoKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRJbnB1dFZhbHVlKCk7XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBwYXJzZVxuICAgICAgICAgICAgY29uc3QgbGFiZWxzID0gdmFsdWUuc3BsaXQoXCI7XCIpO1xuXG4gICAgICAgICAgICAvLyBmaW5kIGxhYmVsIGF0IGNhcmV0IGxvY2F0aW9uXG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuZ2V0SW5wdXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgICAgICAgICBsZXQgdmFsOlxuICAgICAgICAgICAgICAgIHwgeyB2YWx1ZTogc3RyaW5nLCBzdGFydDogbnVtYmVyLCBsZW5ndGg6IG51bWJlciB9XG4gICAgICAgICAgICAgICAgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxhYmVsIG9mIGxhYmVscykge1xuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA+PSBsZW5ndGggJiYgcG9zaXRpb24gPD0gbGVuZ3RoICsgbGFiZWwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBsYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBsZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IGxhYmVsLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxlbmd0aCArPSBsYWJlbC5sZW5ndGggKyAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBHZXQgc3VnZ2VzdGlvbnMgZnJvbSB3ZWIgc2VydmljZVxuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dldExhYmVsc1N1Z2dlc3Rpb25zKHZhbC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoISF0aGlzLmxhYmVsc1NlcnZpY2UubGFiZWxzQXV0b1N1Z2dlc3RXaWxkY2FyZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dldExhYmVsc1N1Z2dlc3Rpb25zKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhYmVsc1NlcnZpY2UubGFiZWxzQXV0b1N1Z2dlc3RXaWxkY2FyZFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2dldExhYmVsc1N1Z2dlc3Rpb25zKHZhbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubGFiZWxzV2ViU2VydmljZS5saXN0KHZhbCwgdGhpcy5wdWJsaWMpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChsYWJlbHM6IExhYmVscykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTdGF0ZSgpID09PSBBdXRvY29tcGxldGVTdGF0ZS5BQ1RJVkUgfHxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTdGF0ZSgpID09PSBBdXRvY29tcGxldGVTdGF0ZS5PUEVORURcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqIEVsaW1pbmF0ZSBzdWdnZXN0aW9ucyB0aGF0IGFyZSBhbHJlYWR5IHNlbGVjdGVkICovXG4gICAgICAgICAgICAgICAgICAgIGxhYmVscy5sYWJlbHMgPSBsYWJlbHMubGFiZWxzLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgICAgIChsYWJlbCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhdGhpcy5sYWJlbHNJdGVtcy5maW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaXRlbSkgPT4gaXRlbS5kaXNwbGF5ID09PSBsYWJlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAvKiogdXBkYXRlIHRoZSBsb2NhbCBsaXN0IG9mIHN1Z2dlc3Rpb25zICovXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zID0gbGFiZWxzLmxhYmVscztcblxuICAgICAgICAgICAgICAgICAgICAvKiogbGltaXQgdGhlIHN1Z2dlc3Rpb25zIHRvIGJlIGRpc3BsYXllZCB0byAxMCAgKi9cbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzLmxhYmVscyA9IGxhYmVscy5sYWJlbHMuc2xpY2UoMCwgMTApO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd24udXBkYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVscy5sYWJlbHMubWFwKChsYWJlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd24udXBkYXRlKGZhbHNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duLmhhc0l0ZW1zICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3RhdGUoKSA9PT0gQXV0b2NvbXBsZXRlU3RhdGUuQUNUSVZFXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbigpOyAvLyBTd2l0Y2ggZnJvbSBBQ1RJVkUgdG8gT1BFTkVEIChpZiBub3QgYWxyZWFkeSlcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICAhdGhpcy5kcm9wZG93bi5oYXNJdGVtcyAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFN0YXRlKCkgPT09IEF1dG9jb21wbGV0ZVN0YXRlLk9QRU5FRFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBObyBkYXRhXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlKCk7IC8vIFN3aXRjaCBmcm9tIE9QRU5FRCB0byBBQ1RJVkUgKGlmIG5vdCBhbHJlYWR5KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2V0QXV0b2NvbXBsZXRlSXRlbSgpIG1ldGhvZCBmcm9tIHRoZSBvcmlnaW5hbCBkaXJlY3RpdmUgaXMgb3ZlcnJpZGVuIHRvXG4gICAgICogU2V0cyB0aGUgY29udGVudCBvZiB0aGUgPGlucHV0PiBiYXNlZCBvbiB0aGUgZ2l2ZW5cbiAgICAgKiBBdXRvY29tcGxldGUgSXRlbS5cbiAgICAgKiBAcmV0dXJucyBmYWxzZSBzaW5jZSBsYWJlbHMgaXRlbXMgZG9uJ3QgbmVlZCB0byBiZSBzZWFyY2hlZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBzZXRBdXRvY29tcGxldGVJdGVtKGl0ZW06IEF1dG9jb21wbGV0ZUl0ZW0pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgIC8vIFN0b3JlIHRoZSBhdXRvY29tcGxldGUgaXRlbXMgdGhhdCB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlIGEgc2VsZWN0aW9uXG4gICAgICAgICAgICB0aGlzLmxhYmVsc0l0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYWNlaG9sZGVyKCk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zVXBkYXRlLm5leHQodGhpcy5sYWJlbHNJdGVtcyk7XG4gICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUoXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzdGFydE9yQWN0aXZlKCkgbWV0aG9kIGZyb20gdGhlIG9yaWdpbmFsIGRpcmVjdGl2ZSBpcyBvdmVycmlkZW4gdG9cbiAgICAgKiBpbW1lZGlhdGVseSBzd2l0Y2ggdG8gQUNUSVZFIGlmIGl0IGlzIG5vdCB0aGUgY2FzZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBzdGFydE9yQWN0aXZlKCk6IHZvaWQge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLmdldFN0YXRlKCkgIT09IEF1dG9jb21wbGV0ZVN0YXRlLkFDVElWRSAmJlxuICAgICAgICAgICAgdGhpcy5nZXRTdGF0ZSgpICE9PSBBdXRvY29tcGxldGVTdGF0ZS5PUEVORURcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyBBdm9pZCBmbGlja2VyaW5nXG4gICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIHVzZXIncyBrZXlib2FyZCBhY3Rpb25zIGluIHRoZSA8aW5wdXQ+LCBpbiBvcmRlciB0byBuYXZpZ2F0ZVxuICAgICAqIGFuZCBzZWxlY3QgdGhlIGF1dG9jb21wbGV0ZSBzdWdnZXN0aW9ucy5cbiAgICAgKiBPdmVycmlkZXMgdGhlIHBhcmVudCBrZXlkb3duIG1ldGhvZCwgYWRkcyB0aGUgbWFuYWdlbWVudCBvZiB0aGUgYmFja3NwYWNlIGtleVxuICAgICAqIHRvIHJlbW92ZSBsYWJlbHMgaXRlbXMsIGVuaGFuY2UgdGhlIGVudGVyIGtleSB0byBzdXBwb3J0IGFkZGluZyBuZXcgbGFiZWxzLlxuICAgICAqIEBwYXJhbSBldmVudCB0aGUga2V5Ym9hcmRcbiAgICAgKi9cbiAgICBrZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGtleWRvd24gPSBzdXBlci5rZXlkb3duKGV2ZW50KTtcblxuICAgICAgICBpZiAoa2V5ZG93biA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvL1dlIGNhbiByZW1vdmUgc2VsZWN0aW9ucyBieSB0eXBpbmcgPGJhY2tzcGFjZT4gd2hlbiB0aGUgaW5wdXQgaXMgZW1wdHlcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBLZXlzLmJhY2tzcGFjZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldElucHV0VmFsdWUoKSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhYmVsc0l0ZW1zLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYWNlaG9sZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNVcGRhdGUubmV4dCh0aGlzLmxhYmVsc0l0ZW1zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKiogQWxsb3cgdGhlIHNlbGVjdGlvbiBvbmUgb2YgbmV3IGxhYmVscyB0aGF0IG5vdCBleGlzdHMgaW4gdGhlIGxpc3QgKi9cbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBLZXlzLmVudGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFuYWdlU2V0QXV0b2NvbXBsZXRlSXRlbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXlkb3duO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3RlbnMgdG8gZm9jdXMgZXZlbnRzIG9uIHRoZSA8aW5wdXQ+IGhvc3QgYW5kIG92ZXJyaWRlcyB0aGUgcGFyZW50IGZvY3VzIGV2ZW50cyBpbiBvcmRlciB0byBsYXVuY2ggdGhlIGF1dG9jb21wbGV0ZVxuICAgICAqIElmIGVtcHR5IGlucHV0IDpcbiAgICAgKiAtIGRpc3BsYXkgdG9wIHJlbGV2ZW50IGxhYmVscyBpZiB0aGUgYXV0by1zdWdnZXN0IHdpbGRjYXJkIGlzIGNvbmZpZ3VyZWRcbiAgICAgKiAtIHJlc3RhcnQgdGhlIGF1dG9jb21wbGV0ZSBpZiBubyBhdXRvLXN1Z2dlc3Qgd2lsZGNhcmQgaXMgZm91bmRcbiAgICAgKiBJZiBub3QgZW1wdHkgaW5wdXQgOlxuICAgICAqIHJldHJpZXZlIHN1Z2dlc3Rpb25zIGJhc2VkIG9uIHRoaXMgaW5wdXQgdGV4dFxuICAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoXCJmb2N1c1wiKSBmb2N1cygpIHtcbiAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICB0aGlzLmFjdGl2ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3RlbnMgdG8gYmx1ciBldmVudHMgKG91dCBvZiBmb2N1cykgb24gdGhlIDxpbnB1dD4gaG9zdCBhbmQgb3ZlcnJpZGVzIHRoZSBwYXJlbnQgYmx1ciBldmVudHNcbiAgICAgKi9cbiAgICBASG9zdExpc3RlbmVyKFwiYmx1clwiLCBbXCIkZXZlbnRcIl0pIGJsdXIoZXZlbnQ6IEZvY3VzRXZlbnQpIHtcbiAgICAgICAgdGhpcy5fbWFuYWdlU2V0QXV0b2NvbXBsZXRlSXRlbSgpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZXMgdGhlIHBhcmVudCBpbnB1dENoYW5nZWQgbWV0aG9kLCBzbyB0aGF0IGl0IGlzIHBvc3NpYmxlIHRvIHJlaW5pdGlhbGl6ZSB0aGUgYXV0b2NvbXBsZXRlXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgQEhvc3RMaXN0ZW5lcihcImlucHV0XCIsIFtcIiRldmVudFwiXSkgaW5wdXRDaGFuZ2VkKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0U3RhdGUoKSkge1xuICAgICAgICAgICAgY2FzZSBBdXRvY29tcGxldGVTdGF0ZS5PUEVORUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5zdWdnZXN0KCk7IC8vIEp1c3QgcmVxdWVzdCBtb3JlIGRhdGEsIGJ1dCBubyBzdGF0ZSBjaGFuZ2VcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQXV0b2NvbXBsZXRlU3RhdGUuU1RBUlQ6XG4gICAgICAgICAgICBjYXNlIEF1dG9jb21wbGV0ZVN0YXRlLkFDVElWRTpcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSgpOyAvLyBnZXQgbW9yZSBkYXRhLCBhbmQgY2hhbmdlIHN0YXRlIGlmIG5vdCBhbHJlYWR5IEFDVElWRVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBdXRvY29tcGxldGVTdGF0ZS5TRUxFQ1RFRDpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0KCk7IC8vIFRoZSBtb2RlbCBjaGFuZ2VkIGJlY2F1c2Ugd2Ugc2VsZWN0ZWQgYSB2YWx1ZSA9PT4gd2UgcmVzdGFydCBpbiBjYXNlIHRoZSB1c2VyIGtlZXBzIHR5cGluZ1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEF1dG9jb21wbGV0ZVN0YXRlLklOSVQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSA8aW5wdXQ+J3MgcGxhY2Vob2xkZXIgdG8gYXZvaWQgZGlzcGxheWluZyBzb21ldGhpbmdcbiAgICAgKiB3aGVuIHRoZXJlIGFyZSBsYWJlbHNJdGVtcyBkaXNwbGF5ZWQgdG8gdGhlIGxlZnQuXG4gICAgICovXG4gICAgdXBkYXRlUGxhY2Vob2xkZXIoKSB7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdGhpcy5sYWJlbHNJdGVtcy5sZW5ndGggPiAwID8gXCJcIiA6IHRoaXMucGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWFuYWdlU2V0QXV0b2NvbXBsZXRlSXRlbSgpOiB2b2lkIHtcbiAgICAgICAgLyoqIEFsd2F5cyBjb25zaWRlciBpZiB0aGVyZSBpcyB0ZXh0IGluIHRoZSA8aW5wdXQ+IGFuZCB0aGF0IGl0IGlzIG5vdCB5ZXQgYWRkZWQgaW4gdGhlIGxhYmVsc0l0ZW1zICAqL1xuICAgICAgICBpZiAoISF0aGlzLmdldElucHV0VmFsdWUoKSAmJiB0aGlzLmdldElucHV0VmFsdWUoKSAhPT0gXCJcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxsb3dOZXdMYWJlbHMpIHtcbiAgICAgICAgICAgICAgICAvKiogV2hlbiBpdCBpcyBhbiBhZGQgTGFiZWxzIGFjdGlvbiA9PT4gY2hlY2sgdGhlIHByaXZpbGVnZSB0byBjcmVhdGUgbmV3IGxhYmVsICovXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAhdGhpcy5wdWJsaWMgfHxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucHVibGljICYmIHRoaXMuYWxsb3dNYW5hZ2VQdWJsaWNMYWJlbHMpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QXV0b2NvbXBsZXRlSXRlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiB0aGlzLmdldElucHV0VmFsdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8qKiBGb3IgYWxsIG90aGVyIGFjdGlvbnMgb24gdGhlIGxhYmVscywgY2hlY2sgaWYgdGhlIHR5cGVkIHRleHQgZXF1YWxzIGFuIGV4aXN0aW5nIGxhYmVsIGluIHRoZSBfc3VnZ2VzdGlvbnMgICovXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N1Z2dlc3Rpb25zLmluZGV4T2YodGhpcy5nZXRJbnB1dFZhbHVlKCkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdXRvY29tcGxldGVJdGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHRoaXMuZ2V0SW5wdXRWYWx1ZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==