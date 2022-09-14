import { Directive, Input, Output, HostListener, EventEmitter, HostBinding } from "@angular/core";
import { Utils, Keys } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "./suggest.service";
import * as i2 from "@sinequa/core/app-utils";
import * as i3 from "@sinequa/components/utils";
/**
 * States in which the autocomplete component can be
 */
export var AutocompleteState;
(function (AutocompleteState) {
    AutocompleteState["OFF"] = "OFF";
    AutocompleteState["INIT"] = "INIT";
    AutocompleteState["START"] = "START";
    AutocompleteState["ACTIVE"] = "ACTIVE";
    AutocompleteState["OPENED"] = "OPENED";
    AutocompleteState["SELECTED"] = "SELECTED"; // Input is focused, an input from the dropdown was selected
})(AutocompleteState || (AutocompleteState = {}));
export class Autocomplete {
    // Initialization
    constructor(elementRef, suggestService, appService, uiService) {
        this.suggestService = suggestService;
        this.appService = appService;
        this.uiService = uiService;
        /** Debounce delay between autocomplete queries */
        this.suggestDelay = 200;
        /** Custom placeholder */
        this.placeholder = '';
        // Event emitters
        this.stateChange = new EventEmitter();
        this.submit = new EventEmitter();
        this._state = AutocompleteState.INIT;
        /**
         * Use the suggest service to retrieve suggestions given the input text.
         * The suggest (autocomplete) query is debounded to avoid flooding the server.
         */
        this.debounceSuggest = Utils.debounce(() => {
            this.getSuggests();
        }, this.suggestDelay);
        this.inputElement = elementRef.nativeElement;
    }
    /**
     * On initialization, we listen to the autocomplete component for
     * selection events
     */
    ngOnInit() {
        this._dropdownSubscription = this.dropdown.clicked.subscribe(item => {
            this.select(item, true); // An item was selected from the autocomplete => take the value
        });
        this._placeholder = this.placeholder;
        this.inputElement.focus();
        this.start();
    }
    /**
     * If the off input changes state, react accordingly
     * @param changes
     */
    ngOnChanges(changes) {
        // Turn on the autocomplete
        if (changes["off"] && !this.off) {
            this.start();
        }
    }
    /**
     * Unsubscribe when destroying the component
     */
    ngOnDestroy() {
        if (this._dropdownSubscription) {
            this._dropdownSubscription.unsubscribe();
        }
    }
    // Getters and Setters
    /**
     * Return the current state of the autocomplete
     */
    getState() {
        return this._state;
    }
    /**
     * Set the current state of the autocomplete
     */
    setState(state) {
        if (this.off) {
            if (this._state !== AutocompleteState.OFF) {
                this._state = AutocompleteState.OFF;
                this.stateChange.next(this.getState());
            }
            // ignore state change if Autocomplete is off
        }
        else if (!!state && this._state !== state) {
            this._state = state;
            //console.log("STATE: ", this._state);
            this.stateChange.next(this.getState());
        }
    }
    /**
     * Get the current text value of the HTML <input>
     * to which this directive is attached
     */
    getInputValue() {
        return this.inputElement.value;
    }
    /**
     * Set the current text value of the HTML <input>
     * to which this directive is attached
     */
    setInputValue(value) {
        // Using setCaret() allows to properly update the underlying form
        this.uiService.setCaret(this.inputElement, 0, -1, value); // 0, -1 erases the current value and writes the new one
    }
    /**
     * Sets the content of the <input> based on the given
     * Autocomplete Item (various implementations are possible,
     * depending on the item content and nature).
     * This would be the right method to override to implement
     * fielded search autocomplete.
     * @returns true if this autocomplete item should be searched
     */
    setAutocompleteItem(item) {
        if (item) {
            this.setInputValue(item.display);
            return true;
        }
        return false;
    }
    // Methods triggering state changes
    /**
     * INIT state (Input is not focused, dropdown is closed)
     */
    init() {
        this.setState(AutocompleteState.INIT);
        this.dropdown.update(false); // If the dropdown was active
    }
    /**
     * START state (Input is focused, no text typed in, dropdown is closed)
     */
    start() {
        this.setState(AutocompleteState.START);
        this.dropdown.update(false); // If the dropdown was active
    }
    /**
     * START state and if the <input> has content, immediately switch to ACTIVE
     */
    startOrActive() {
        if (this.getState() !== AutocompleteState.ACTIVE && this.getState() !== AutocompleteState.OPENED) { // Avoid flickering
            this.start();
            if (!!this.getInputValue()) {
                this.active();
            }
        }
    }
    /**
     * ACTIVE state (Input is focused, text is typed, suggests are being queried, dropdown is closed)
     */
    active() {
        if (this.getState() === AutocompleteState.START || this.getState() === AutocompleteState.ACTIVE || this.getState() === AutocompleteState.OPENED) {
            this.setState(AutocompleteState.ACTIVE);
            this.dropdown.update(false); // If the dropdown was active
            this.suggest();
        }
    }
    /**
     * Select the given autocomplete suggestion for search
     * @param submit if, true also trigger a submit
     * @param item a specific item to submit
     */
    select(item, submit) {
        this.setState(AutocompleteState.SELECTED); // Change state BEFORE setting input value, so the event is correctly processed
        const searchable = this.setAutocompleteItem(item);
        this.dropdown.update(false); // Close dropdown
        if (submit && searchable)
            this.submit.next();
    }
    /**
     * Switch to OPENED state (from ACTIVE only)
     */
    open() {
        if (this.getState() === AutocompleteState.ACTIVE) {
            this.setState(AutocompleteState.OPENED);
        }
    }
    /**
     * Request suggestions from the server, and update the dropdown contents
     * and autocomplete state asynchronously.
     * Override this method for a synchronous implementation.
     */
    suggest() {
        this.debounceSuggest();
    }
    /**
     * Actually makes the API call to the suggestService to retrieve suggestions
     * and process them.
     */
    getSuggests() {
        const value = this.getInputValue();
        if (value) { // If there is text, make a call to the suggest API
            this.processSuggests(this.getSuggestsObs(value));
        }
        else { // If empty input, restart autocomplete
            this.start();
        }
    }
    /**
     * Returns an observable of Suggestions, given some input text
     * @param value input text for which to return suggestions
     */
    getSuggestsObs(value, fields) {
        return this.suggestService.get(this.suggestQuery, value, fields);
    }
    /**
     * Process suggestions obtained (from whatever mean):
     * - If data available, filter out fields
     * - update the dropdown content
     * - Switch between OPEN and ACTIVE states
     * - Use changeDetectorRef to update display
     * @param obs an observable of AutocompleteItem suggestions
     */
    processSuggests(obs) {
        obs.subscribe(suggests => {
            if (this.getState() === AutocompleteState.ACTIVE || this.getState() === AutocompleteState.OPENED) {
                this.dropdown.update(true, suggests
                    .filter(item => item.category !== "$field$") // Filter out fields
                    .map(item => {
                    if (!item.label) {
                        item.label = this.appService.getLabel(item.category);
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
    /**
     * Returns the caret position within the input
     */
    getInputPosition() {
        // Come back before trailing spaces so the preceding value is still seen as the input value
        // (needed for ExprParser to stop autocomplete being cancelled on entering trailing spaces)
        const position = this.uiService.getCaret(this.inputElement).start;
        const length = Utils.len(Utils.trimEnd(this.getInputValue()));
        return Math.min(position, length);
    }
    /**
     * The following are event listeners applied to the <input> host component
     * onto which this directive is applied.
     * The events affect the state of the autocomplete, which triggers
     * various actions (call to suggest API, etc.).
     */
    /**
     * Listens to click events on the <input> host
     */
    click() {
        //console.log("input clicked");
        this.startOrActive();
    }
    /**
     * Listens to touchstart events (mobile clicks) on the <input> host
     */
    touchstart() {
        //console.log("input touchstart");
        this.startOrActive();
    }
    /**
     * Listens to focus events on the <input> host
     */
    focus() {
        //console.log("input focus gained");
        this.start();
    }
    /**
     * Listens to blur events (out of focus) on the <input> host
     */
    blur(event) {
        //console.log("input focus lost");
        this.init();
    }
    /**
     * Listen to any change in the <input> content and react
     * according to the current state of the autocomplete
     * @param event
     */
    inputChanged(event) {
        //console.log("input value changed");
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
                break;
            case AutocompleteState.INIT:
                console.error("Should not be in INIT state if the form changes");
                break;
        }
    }
    /**
     * Listen to user's keyboard actions in the <input>, in order to navigate
     * and select the autocomplete suggestions.
     * @param event the keyboard
     */
    keydown(event) {
        // Navigation in the opened dropdown
        if (this.getState() === AutocompleteState.OPENED) {
            switch (event.keyCode) {
                case Keys.up:
                    this.dropdown.selectPrevious();
                    return false; // prevent default
                case Keys.down:
                    this.dropdown.selectNext();
                    return false; // prevent default
                case Keys.tab:
                    if (!!this.dropdown.selectedValue) {
                        this.select(this.dropdown.selectedValue);
                    }
                    else {
                        this.dropdown.selectNext();
                    }
                    return false; // prevent default (change focus)
                case Keys.esc:
                    this.start(); // Just restart the autocomplete
                    //event.stopPropagation(); // needed?
                    return false; // prevent default
                case Keys.enter:
                    if (!!this.dropdown.selectedValue) {
                        this.select(this.dropdown.selectedValue, true);
                        //event.stopPropagation(); // needed?
                        return false; // prevent default action (auto submit)
                    }
            }
        }
        // If a search was triggered, restart the autocomplete
        if (event.keyCode === Keys.enter) {
            this.submit.next();
            this.start();
        }
        return undefined;
    }
}
Autocomplete.ɵfac = function Autocomplete_Factory(t) { return new (t || Autocomplete)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.SuggestService), i0.ɵɵdirectiveInject(i2.AppService), i0.ɵɵdirectiveInject(i3.UIService)); };
Autocomplete.ɵdir = i0.ɵɵdefineDirective({ type: Autocomplete, selectors: [["", "sqAutocomplete", ""]], hostVars: 1, hostBindings: function Autocomplete_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function Autocomplete_click_HostBindingHandler() { return ctx.click(); })("touchstart", function Autocomplete_touchstart_HostBindingHandler() { return ctx.touchstart(); })("focus", function Autocomplete_focus_HostBindingHandler() { return ctx.focus(); })("blur", function Autocomplete_blur_HostBindingHandler($event) { return ctx.blur($event); })("input", function Autocomplete_input_HostBindingHandler($event) { return ctx.inputChanged($event); })("keydown", function Autocomplete_keydown_HostBindingHandler($event) { return ctx.keydown($event); });
    } if (rf & 2) {
        i0.ɵɵattribute("placeholder", ctx._placeholder);
    } }, inputs: { dropdown: "dropdown", off: "off", suggestDelay: "suggestDelay", suggestQuery: "suggestQuery", placeholder: "placeholder" }, outputs: { stateChange: "stateChange", submit: "submit" }, features: [i0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Autocomplete, [{
        type: Directive,
        args: [{
                selector: "[sqAutocomplete]"
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.SuggestService }, { type: i2.AppService }, { type: i3.UIService }]; }, { dropdown: [{
            type: Input
        }], off: [{
            type: Input
        }], suggestDelay: [{
            type: Input
        }], suggestQuery: [{
            type: Input
        }], placeholder: [{
            type: Input
        }], _placeholder: [{
            type: HostBinding,
            args: ['attr.placeholder']
        }], stateChange: [{
            type: Output
        }], submit: [{
            type: Output
        }], click: [{
            type: HostListener,
            args: ["click"]
        }], touchstart: [{
            type: HostListener,
            args: ["touchstart"]
        }], focus: [{
            type: HostListener,
            args: ["focus"]
        }], blur: [{
            type: HostListener,
            args: ["blur", ["$event"]]
        }], inputChanged: [{
            type: HostListener,
            args: ["input", ["$event"]]
        }], keydown: [{
            type: HostListener,
            args: ["keydown", ["$event"]]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImF1dG9jb21wbGV0ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFjLFlBQVksRUFBVSxZQUFZLEVBQXVDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6SixPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7OztBQTJEL0M7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSxpQkFPWDtBQVBELFdBQVksaUJBQWlCO0lBQ3pCLGdDQUFXLENBQUE7SUFDWCxrQ0FBYSxDQUFBO0lBQ2Isb0NBQWUsQ0FBQTtJQUNmLHNDQUFpQixDQUFBO0lBQ2pCLHNDQUFpQixDQUFBO0lBQ2pCLDBDQUFxQixDQUFBLENBQUMsNERBQTREO0FBQ3RGLENBQUMsRUFQVyxpQkFBaUIsS0FBakIsaUJBQWlCLFFBTzVCO0FBS0QsTUFBTSxPQUFPLFlBQVk7SUE4QnJCLGlCQUFpQjtJQUVqQixZQUNJLFVBQXNCLEVBQ1osY0FBOEIsRUFDOUIsVUFBc0IsRUFDdEIsU0FBb0I7UUFGcEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQTVCbEMsa0RBQWtEO1FBQ3pDLGlCQUFZLEdBQVcsR0FBRyxDQUFDO1FBS3BDLHlCQUF5QjtRQUNoQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUlsQyxpQkFBaUI7UUFFUCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO1FBQ3BELFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBRXBDLFdBQU0sR0FBc0IsaUJBQWlCLENBQUMsSUFBSSxD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LFlBQVk7bUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgT25Jbml0LCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBIb3N0QmluZGluZ30gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtVdGlscywgS2V5c30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHtBcHBTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9hcHAtdXRpbHNcIjtcbmltcG9ydCB7U3VnZ2VzdFNlcnZpY2V9IGZyb20gXCIuL3N1Z2dlc3Quc2VydmljZVwiO1xuaW1wb3J0IHtVSVNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3V0aWxzXCI7XG5cbi8qKlxuICogTWluaW1hbCBpbnRlcmZhY2UgZm9yIGF1dG9jb21wbGV0ZSBpdGVtcyAobm90ZSB0aGF0IHRoZSBTdWdnZXN0aW9uXG4gKiBvYmplY3RzIHJldHVybmVkIGJ5IHRoZSBTdWdnZXN0aW9uIHNlcnZpY2UgaW1wbGVtZW50IG5hdHVyYWxseSB0aGlzXG4gKiBpbnRlcmZhY2UpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXV0b2NvbXBsZXRlSXRlbSB7XG4gICAgZGlzcGxheTogc3RyaW5nO1xuICAgIG5vcm1hbGl6ZWQ/OiBzdHJpbmc7XG4gICAgY2F0ZWdvcnk6IHN0cmluZztcbiAgICBsYWJlbD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgcmVxdWlyZWQgdG8gYmUgaW1wbGVtZW50ZWQgYnkgdGhlIGRyb3Bkb3duIGNvbXBvbmVudHNcbiAqIGJpbmRlZCB0byB0aGlzIGF1dG9jb21wbGV0ZSBkaXJlY3RpdmUuXG4gKiBUaGUgY29tcG9uZW50IGlzIHJlc3BvbnNpYmxlIGZvciBkaXNwbGF5aW5nIGEgbGlzdCBvZiBpdGVtc1xuICogYW5kIHNpZ25hbGluZyBiYWNrIGlmIGEgY29tcG9uZW50IHdhcyBjbGlja2VkLiBUaGUgY29tcG9uZW50IG11c3RcbiAqIGFsc28gbWFuYWdlIG5hdmlnYXRpb24gdGhyb3VnaCB0aGUgbGlzdCAobmV4dC9wcmV2aW91cyBhbmQgc2VsZWN0ZWRWYWx1ZSkuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXV0b2NvbXBsZXRlQ29tcG9uZW50IHtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlcmUgYXJlIGFueSBpdGVtIHRvIGRpc3BsYXlcbiAgICAgKi9cbiAgICBoYXNJdGVtczogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGVtaXR0ZXIgZm9yIGNsaWNrcyBvbiBhbiBhdXRvY29tcGxldGUgaXRlbVxuICAgICAqL1xuICAgIGNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxBdXRvY29tcGxldGVJdGVtPjtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtLCBpZiBhbnlcbiAgICAgKi9cbiAgICBzZWxlY3RlZFZhbHVlOiBBdXRvY29tcGxldGVJdGVtIHwgdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBkYXRhIGFuZCBzdGF0ZSBvZiB0aGlzIGNvbXBvbmVudFxuICAgICAqIEBwYXJhbSBhY3RpdmUgd2hldGhlciB0aGUgY29tcG9uZW50IHNob3VsZCBiZSBkaXNwbGF5ZWRcbiAgICAgKiBAcGFyYW0gaXRlbXMgVGhlIGxpc3Qgb2YgaXRlbXMgdG8gZGlzcGxheVxuICAgICAqL1xuICAgIHVwZGF0ZShhY3RpdmU6IGJvb2xlYW4sIGl0ZW1zPzogQXV0b2NvbXBsZXRlSXRlbVtdKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFNlbGVjdCB0aGUgbmV4dCBpdGVtIGluIHRoZSBsaXN0IGFuZCByZXR1cm5zIGl0XG4gICAgICovXG4gICAgc2VsZWN0TmV4dCgpOiBBdXRvY29tcGxldGVJdGVtIHwgdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogU2VsZWN0IHRoZSBwcmV2aW91cyBpdGVtIGluIHRoZSBsaXN0IGFuZCByZXR1cm5zIGl0XG4gICAgICovXG4gICAgc2VsZWN0UHJldmlvdXMoKTogQXV0b2NvbXBsZXRlSXRlbSB8IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBTdGF0ZXMgaW4gd2hpY2ggdGhlIGF1dG9jb21wbGV0ZSBjb21wb25lbnQgY2FuIGJlXG4gKi9cbmV4cG9ydCBlbnVtIEF1dG9jb21wbGV0ZVN0YXRlIHtcbiAgICBPRkYgPSBcIk9GRlwiLCAvLyBBdXRvY29tcGxldGUgaXMgdHVybmVkIG9mZiAodmlhIEBJbnB1dCgpKVxuICAgIElOSVQgPSBcIklOSVRcIiwgLy8gSW5wdXQgaXMgbm90IGZvY3VzZWQsIGRyb3Bkb3duIGlzIGNsb3NlZFxuICAgIFNUQVJUID0gXCJTVEFSVFwiLCAvLyBJbnB1dCBpcyBmb2N1c2VkLCBubyB0ZXh0IHR5cGVkIGluLCBkcm9wZG93biBpcyBjbG9zZWRcbiAgICBBQ1RJVkUgPSBcIkFDVElWRVwiLCAvLyBJbnB1dCBpcyBmb2N1c2VkLCB0ZXh0IGlzIHR5cGVkLCBzdWdnZXN0cyBhcmUgYmVpbmcgcXVlcmllZCwgZHJvcGRvd24gaXMgY2xvc2VkXG4gICAgT1BFTkVEID0gXCJPUEVORURcIiwgLy8gSW5wdXQgaXMgZm9jdXNlZCwgdGV4dCBpcyB0eXBlZCwgc3VnZ2VzdHMgYXJlIGF2YWlsYWJsZSwgZHJvcGRvd24vYXV0b2NvbXBsZXRlIGNvbXBvbmVudCBpcyBkaXNwbGF5ZWRcbiAgICBTRUxFQ1RFRCA9IFwiU0VMRUNURURcIiAvLyBJbnB1dCBpcyBmb2N1c2VkLCBhbiBpbnB1dCBmcm9tIHRoZSBkcm9wZG93biB3YXMgc2VsZWN0ZWRcbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3NxQXV0b2NvbXBsZXRlXVwiXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9jb21wbGV0ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgQXV0b2NvbXBsZXRlQ29tcG9uZW50IHRoYXQgZGlzcGxheXMgdGhlIGF1dG9jb21wbGV0ZSBpdGVtcyAqL1xuICAgIEBJbnB1dCgpIGRyb3Bkb3duOiBBdXRvY29tcGxldGVDb21wb25lbnQ7XG5cbiAgICAvKiogV2hldGhlciB0aGUgYXV0b2NvbXBsZXRlIHNob3VsZCBiZSBhY3RpdmUgb3Igbm90ICovXG4gICAgQElucHV0KCkgb2ZmOiBib29sZWFuO1xuXG4gICAgLyoqIERlYm91bmNlIGRlbGF5IGJldHdlZW4gYXV0b2NvbXBsZXRlIHF1ZXJpZXMgKi9cbiAgICBASW5wdXQoKSBzdWdnZXN0RGVsYXk6IG51bWJlciA9IDIwMDtcblxuICAgIC8qKiBOYW1lIG9mIHRoZSBTdWdnZXN0IFF1ZXJ5IHRvIGJlIHVzZWQgKi9cbiAgICBASW5wdXQoKSBzdWdnZXN0UXVlcnk6IHN0cmluZztcblxuICAgIC8qKiBDdXN0b20gcGxhY2Vob2xkZXIgKi9cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2F0dHIucGxhY2Vob2xkZXInKSBfcGxhY2Vob2xkZXI7XG5cbiAgICAvLyBFdmVudCBlbWl0dGVyc1xuXG4gICAgQE91dHB1dCgpIHN0YXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxBdXRvY29tcGxldGVTdGF0ZT4oKTtcbiAgICBAT3V0cHV0KCkgc3VibWl0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgcHJpdmF0ZSBfc3RhdGU6IEF1dG9jb21wbGV0ZVN0YXRlID0gQXV0b2NvbXBsZXRlU3RhdGUuSU5JVDtcblxuICAgIC8vIFRoZSBpbnB1dCBIVE1MIGVsZW1lbnQgdG8gd2hpY2ggdGhpcyBkaXJlY3RpdmUgaXMgYXR0YWNoZWRcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuXG5cbiAgICAvLyBJbml0aWFsaXphdGlvblxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByb3RlY3RlZCBzdWdnZXN0U2VydmljZTogU3VnZ2VzdFNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBhcHBTZXJ2aWNlOiBBcHBTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgdWlTZXJ2aWNlOiBVSVNlcnZpY2Upe1xuXG4gICAgICAgIHRoaXMuaW5wdXRFbGVtZW50ID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogT24gaW5pdGlhbGl6YXRpb24sIHdlIGxpc3RlbiB0byB0aGUgYXV0b2NvbXBsZXRlIGNvbXBvbmVudCBmb3JcbiAgICAgKiBzZWxlY3Rpb24gZXZlbnRzXG4gICAgICovXG4gICAgbmdPbkluaXQoKXtcbiAgICAgICAgdGhpcy5fZHJvcGRvd25TdWJzY3JpcHRpb24gPSB0aGlzLmRyb3Bkb3duLmNsaWNrZWQuc3Vic2NyaWJlKGl0ZW0gPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3QoaXRlbSwgdHJ1ZSk7ICAvLyBBbiBpdGVtIHdhcyBzZWxlY3RlZCBmcm9tIHRoZSBhdXRvY29tcGxldGUgPT4gdGFrZSB0aGUgdmFsdWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyO1xuICAgICAgICB0aGlzLmlucHV0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgdGhlIG9mZiBpbnB1dCBjaGFuZ2VzIHN0YXRlLCByZWFjdCBhY2NvcmRpbmdseVxuICAgICAqIEBwYXJhbSBjaGFuZ2VzXG4gICAgICovXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyl7XG4gICAgICAgIC8vIFR1cm4gb24gdGhlIGF1dG9jb21wbGV0ZVxuICAgICAgICBpZihjaGFuZ2VzW1wib2ZmXCJdICYmICF0aGlzLm9mZil7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHByb3RlY3RlZCBfZHJvcGRvd25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICAvKipcbiAgICAgKiBVbnN1YnNjcmliZSB3aGVuIGRlc3Ryb3lpbmcgdGhlIGNvbXBvbmVudFxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCl7XG4gICAgICAgIGlmKHRoaXMuX2Ryb3Bkb3duU3Vic2NyaXB0aW9uKXtcbiAgICAgICAgICAgIHRoaXMuX2Ryb3Bkb3duU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIEdldHRlcnMgYW5kIFNldHRlcnNcblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgYXV0b2NvbXBsZXRlXG4gICAgICovXG4gICAgcHVibGljIGdldFN0YXRlKCk6IEF1dG9jb21wbGV0ZVN0YXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgYXV0b2NvbXBsZXRlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHNldFN0YXRlKHN0YXRlOiBBdXRvY29tcGxldGVTdGF0ZSkge1xuICAgICAgICBpZih0aGlzLm9mZil7XG4gICAgICAgICAgICBpZih0aGlzLl9zdGF0ZSAhPT0gQXV0b2NvbXBsZXRlU3RhdGUuT0ZGKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IEF1dG9jb21wbGV0ZVN0YXRlLk9GRjtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlLm5leHQodGhpcy5nZXRTdGF0ZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlnbm9yZSBzdGF0ZSBjaGFuZ2UgaWYgQXV0b2NvbXBsZXRlIGlzIG9mZlxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoISFzdGF0ZSAmJiB0aGlzLl9zdGF0ZSAhPT0gc3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gc3RhdGU7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiU1RBVEU6IFwiLCB0aGlzLl9zdGF0ZSk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlLm5leHQodGhpcy5nZXRTdGF0ZSgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCB0ZXh0IHZhbHVlIG9mIHRoZSBIVE1MIDxpbnB1dD5cbiAgICAgKiB0byB3aGljaCB0aGlzIGRpcmVjdGl2ZSBpcyBhdHRhY2hlZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRJbnB1dFZhbHVlKCkgOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dEVsZW1lbnQudmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjdXJyZW50IHRleHQgdmFsdWUgb2YgdGhlIEhUTUwgPGlucHV0PlxuICAgICAqIHRvIHdoaWNoIHRoaXMgZGlyZWN0aXZlIGlzIGF0dGFjaGVkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHNldElucHV0VmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgICAgICAvLyBVc2luZyBzZXRDYXJldCgpIGFsbG93cyB0byBwcm9wZXJseSB1cGRhdGUgdGhlIHVuZGVybHlpbmcgZm9ybVxuICAgICAgICB0aGlzLnVpU2VydmljZS5zZXRDYXJldCh0aGlzLmlucHV0RWxlbWVudCwgMCwgLTEsIHZhbHVlKTsgLy8gMCwgLTEgZXJhc2VzIHRoZSBjdXJyZW50IHZhbHVlIGFuZCB3cml0ZXMgdGhlIG5ldyBvbmVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjb250ZW50IG9mIHRoZSA8aW5wdXQ+IGJhc2VkIG9uIHRoZSBnaXZlblxuICAgICAqIEF1dG9jb21wbGV0ZSBJdGVtICh2YXJpb3VzIGltcGxlbWVudGF0aW9ucyBhcmUgcG9zc2libGUsXG4gICAgICogZGVwZW5kaW5nIG9uIHRoZSBpdGVtIGNvbnRlbnQgYW5kIG5hdHVyZSkuXG4gICAgICogVGhpcyB3b3VsZCBiZSB0aGUgcmlnaHQgbWV0aG9kIHRvIG92ZXJyaWRlIHRvIGltcGxlbWVudFxuICAgICAqIGZpZWxkZWQgc2VhcmNoIGF1dG9jb21wbGV0ZS5cbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIHRoaXMgYXV0b2NvbXBsZXRlIGl0ZW0gc2hvdWxkIGJlIHNlYXJjaGVkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHNldEF1dG9jb21wbGV0ZUl0ZW0oaXRlbTogQXV0b2NvbXBsZXRlSXRlbSk6IGJvb2xlYW4ge1xuICAgICAgICBpZihpdGVtKSB7XG4gICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUoaXRlbS5kaXNwbGF5KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cblxuICAgIC8vIE1ldGhvZHMgdHJpZ2dlcmluZyBzdGF0ZSBjaGFuZ2VzXG5cbiAgICAvKipcbiAgICAgKiBJTklUIHN0YXRlIChJbnB1dCBpcyBub3QgZm9jdXNlZCwgZHJvcGRvd24gaXMgY2xvc2VkKVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFN0YXRlKEF1dG9jb21wbGV0ZVN0YXRlLklOSVQpO1xuICAgICAgICB0aGlzLmRyb3Bkb3duLnVwZGF0ZShmYWxzZSk7ICAgIC8vIElmIHRoZSBkcm9wZG93biB3YXMgYWN0aXZlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU1RBUlQgc3RhdGUgKElucHV0IGlzIGZvY3VzZWQsIG5vIHRleHQgdHlwZWQgaW4sIGRyb3Bkb3duIGlzIGNsb3NlZClcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoQXV0b2NvbXBsZXRlU3RhdGUuU1RBUlQpO1xuICAgICAgICB0aGlzLmRyb3Bkb3duLnVwZGF0ZShmYWxzZSk7ICAgIC8vIElmIHRoZSBkcm9wZG93biB3YXMgYWN0aXZlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU1RBUlQgc3RhdGUgYW5kIGlmIHRoZSA8aW5wdXQ+IGhhcyBjb250ZW50LCBpbW1lZGlhdGVseSBzd2l0Y2ggdG8gQUNUSVZFXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHN0YXJ0T3JBY3RpdmUoKTogdm9pZCB7XG4gICAgICAgIGlmKHRoaXMuZ2V0U3RhdGUoKSE9PSBBdXRvY29tcGxldGVTdGF0ZS5BQ1RJVkUgJiYgdGhpcy5nZXRTdGF0ZSgpIT09IEF1dG9jb21wbGV0ZVN0YXRlLk9QRU5FRCl7IC8vIEF2b2lkIGZsaWNrZXJpbmdcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgICAgIGlmKCEhdGhpcy5nZXRJbnB1dFZhbHVlKCkpe1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBQ1RJVkUgc3RhdGUgKElucHV0IGlzIGZvY3VzZWQsIHRleHQgaXMgdHlwZWQsIHN1Z2dlc3RzIGFyZSBiZWluZyBxdWVyaWVkLCBkcm9wZG93biBpcyBjbG9zZWQpXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFjdGl2ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYodGhpcy5nZXRTdGF0ZSgpID09PSBBdXRvY29tcGxldGVTdGF0ZS5TVEFSVCB8fCB0aGlzLmdldFN0YXRlKCkgPT09IEF1dG9jb21wbGV0ZVN0YXRlLkFDVElWRSB8fCB0aGlzLmdldFN0YXRlKCkgPT09IEF1dG9jb21wbGV0ZVN0YXRlLk9QRU5FRCl7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKEF1dG9jb21wbGV0ZVN0YXRlLkFDVElWRSk7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLnVwZGF0ZShmYWxzZSk7ICAgIC8vIElmIHRoZSBkcm9wZG93biB3YXMgYWN0aXZlXG4gICAgICAgICAgICB0aGlzLnN1Z2dlc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbGVjdCB0aGUgZ2l2ZW4gYXV0b2NvbXBsZXRlIHN1Z2dlc3Rpb24gZm9yIHNlYXJjaFxuICAgICAqIEBwYXJhbSBzdWJtaXQgaWYsIHRydWUgYWxzbyB0cmlnZ2VyIGEgc3VibWl0XG4gICAgICogQHBhcmFtIGl0ZW0gYSBzcGVjaWZpYyBpdGVtIHRvIHN1Ym1pdFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBzZWxlY3QoaXRlbTogQXV0b2NvbXBsZXRlSXRlbSwgc3VibWl0PzogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFN0YXRlKEF1dG9jb21wbGV0ZVN0YXRlLlNFTEVDVEVEKTsgLy8gQ2hhbmdlIHN0YXRlIEJFRk9SRSBzZXR0aW5nIGlucHV0IHZhbHVlLCBzbyB0aGUgZXZlbnQgaXMgY29ycmVjdGx5IHByb2Nlc3NlZFxuICAgICAgICBjb25zdCBzZWFyY2hhYmxlID0gdGhpcy5zZXRBdXRvY29tcGxldGVJdGVtKGl0ZW0pO1xuICAgICAgICB0aGlzLmRyb3Bkb3duLnVwZGF0ZShmYWxzZSk7ICAgIC8vIENsb3NlIGRyb3Bkb3duXG5cbiAgICAgICAgaWYoc3VibWl0ICYmIHNlYXJjaGFibGUpIHRoaXMuc3VibWl0Lm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTd2l0Y2ggdG8gT1BFTkVEIHN0YXRlIChmcm9tIEFDVElWRSBvbmx5KVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBvcGVuKCk6IHZvaWQge1xuICAgICAgICBpZih0aGlzLmdldFN0YXRlKCkgPT09IEF1dG9jb21wbGV0ZVN0YXRlLkFDVElWRSl7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKEF1dG9jb21wbGV0ZVN0YXRlLk9QRU5FRCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IHN1Z2dlc3Rpb25zIGZyb20gdGhlIHNlcnZlciwgYW5kIHVwZGF0ZSB0aGUgZHJvcGRvd24gY29udGVudHNcbiAgICAgKiBhbmQgYXV0b2NvbXBsZXRlIHN0YXRlIGFzeW5jaHJvbm91c2x5LlxuICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGZvciBhIHN5bmNocm9ub3VzIGltcGxlbWVudGF0aW9uLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBzdWdnZXN0KCkge1xuICAgICAgICB0aGlzLmRlYm91bmNlU3VnZ2VzdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjdHVhbGx5IG1ha2VzIHRoZSBBUEkgY2FsbCB0byB0aGUgc3VnZ2VzdFNlcnZpY2UgdG8gcmV0cmlldmUgc3VnZ2VzdGlvbnNcbiAgICAgKiBhbmQgcHJvY2VzcyB0aGVtLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRTdWdnZXN0cygpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldElucHV0VmFsdWUoKTtcbiAgICAgICAgaWYodmFsdWUpIHsgLy8gSWYgdGhlcmUgaXMgdGV4dCwgbWFrZSBhIGNhbGwgdG8gdGhlIHN1Z2dlc3QgQVBJXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NTdWdnZXN0cyhcbiAgICAgICAgICAgICAgICB0aGlzLmdldFN1Z2dlc3RzT2JzKHZhbHVlKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgIC8vIElmIGVtcHR5IGlucHV0LCByZXN0YXJ0IGF1dG9jb21wbGV0ZVxuICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBvYnNlcnZhYmxlIG9mIFN1Z2dlc3Rpb25zLCBnaXZlbiBzb21lIGlucHV0IHRleHRcbiAgICAgKiBAcGFyYW0gdmFsdWUgaW5wdXQgdGV4dCBmb3Igd2hpY2ggdG8gcmV0dXJuIHN1Z2dlc3Rpb25zXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldFN1Z2dlc3RzT2JzKHZhbHVlOiBzdHJpbmcsIGZpZWxkcz86IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxBdXRvY29tcGxldGVJdGVtW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VnZ2VzdFNlcnZpY2UuZ2V0KHRoaXMuc3VnZ2VzdFF1ZXJ5LCB2YWx1ZSwgZmllbGRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9jZXNzIHN1Z2dlc3Rpb25zIG9idGFpbmVkIChmcm9tIHdoYXRldmVyIG1lYW4pOlxuICAgICAqIC0gSWYgZGF0YSBhdmFpbGFibGUsIGZpbHRlciBvdXQgZmllbGRzXG4gICAgICogLSB1cGRhdGUgdGhlIGRyb3Bkb3duIGNvbnRlbnRcbiAgICAgKiAtIFN3aXRjaCBiZXR3ZWVuIE9QRU4gYW5kIEFDVElWRSBzdGF0ZXNcbiAgICAgKiAtIFVzZSBjaGFuZ2VEZXRlY3RvclJlZiB0byB1cGRhdGUgZGlzcGxheVxuICAgICAqIEBwYXJhbSBvYnMgYW4gb2JzZXJ2YWJsZSBvZiBBdXRvY29tcGxldGVJdGVtIHN1Z2dlc3Rpb25zXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHByb2Nlc3NTdWdnZXN0cyhvYnM6IE9ic2VydmFibGU8QXV0b2NvbXBsZXRlSXRlbVtdPil7XG4gICAgICAgIG9icy5zdWJzY3JpYmUoXG4gICAgICAgICAgICBzdWdnZXN0cyA9PiB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5nZXRTdGF0ZSgpID09PSBBdXRvY29tcGxldGVTdGF0ZS5BQ1RJVkUgfHwgdGhpcy5nZXRTdGF0ZSgpID09PSBBdXRvY29tcGxldGVTdGF0ZS5PUEVORUQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duLnVwZGF0ZSh0cnVlLCBzdWdnZXN0c1xuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihpdGVtID0+IGl0ZW0uY2F0ZWdvcnkgIT09IFwiJGZpZWxkJFwiKSAgLy8gRmlsdGVyIG91dCBmaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWl0ZW0ubGFiZWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmxhYmVsID0gdGhpcy5hcHBTZXJ2aWNlLmdldExhYmVsKGl0ZW0uY2F0ZWdvcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duLnVwZGF0ZShmYWxzZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuZHJvcGRvd24uaGFzSXRlbXMgJiYgdGhpcy5nZXRTdGF0ZSgpID09PSBBdXRvY29tcGxldGVTdGF0ZS5BQ1RJVkUpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW4oKTsgICAgLy8gU3dpdGNoIGZyb20gQUNUSVZFIHRvIE9QRU5FRCAoaWYgbm90IGFscmVhZHkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoIXRoaXMuZHJvcGRvd24uaGFzSXRlbXMgJiYgdGhpcy5nZXRTdGF0ZSgpID09PSBBdXRvY29tcGxldGVTdGF0ZS5PUEVORUQpeyAgIC8vIE5vIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUoKTsgIC8vIFN3aXRjaCBmcm9tIE9QRU5FRCB0byBBQ1RJVkUgKGlmIG5vdCBhbHJlYWR5KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZSB0aGUgc3VnZ2VzdCBzZXJ2aWNlIHRvIHJldHJpZXZlIHN1Z2dlc3Rpb25zIGdpdmVuIHRoZSBpbnB1dCB0ZXh0LlxuICAgICAqIFRoZSBzdWdnZXN0IChhdXRvY29tcGxldGUpIHF1ZXJ5IGlzIGRlYm91bmRlZCB0byBhdm9pZCBmbG9vZGluZyB0aGUgc2VydmVyLlxuICAgICAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVib3VuY2VTdWdnZXN0OiAoKSA9PiB2b2lkID0gVXRpbHMuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICB0aGlzLmdldFN1Z2dlc3RzKCk7XG4gICAgfSwgdGhpcy5zdWdnZXN0RGVsYXkpO1xuXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjYXJldCBwb3NpdGlvbiB3aXRoaW4gdGhlIGlucHV0XG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldElucHV0UG9zaXRpb24oKTogbnVtYmVyIHtcbiAgICAgICAgLy8gQ29tZSBiYWNrIGJlZm9yZSB0cmFpbGluZyBzcGFjZXMgc28gdGhlIHByZWNlZGluZyB2YWx1ZSBpcyBzdGlsbCBzZWVuIGFzIHRoZSBpbnB1dCB2YWx1ZVxuICAgICAgICAvLyAobmVlZGVkIGZvciBFeHByUGFyc2VyIHRvIHN0b3AgYXV0b2NvbXBsZXRlIGJlaW5nIGNhbmNlbGxlZCBvbiBlbnRlcmluZyB0cmFpbGluZyBzcGFjZXMpXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy51aVNlcnZpY2UuZ2V0Q2FyZXQodGhpcy5pbnB1dEVsZW1lbnQpLnN0YXJ0O1xuICAgICAgICBjb25zdCBsZW5ndGggPSBVdGlscy5sZW4oVXRpbHMudHJpbUVuZCh0aGlzLmdldElucHV0VmFsdWUoKSkpO1xuICAgICAgICByZXR1cm4gTWF0aC5taW4ocG9zaXRpb24sIGxlbmd0aCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGZvbGxvd2luZyBhcmUgZXZlbnQgbGlzdGVuZXJzIGFwcGxpZWQgdG8gdGhlIDxpbnB1dD4gaG9zdCBjb21wb25lbnRcbiAgICAgKiBvbnRvIHdoaWNoIHRoaXMgZGlyZWN0aXZlIGlzIGFwcGxpZWQuXG4gICAgICogVGhlIGV2ZW50cyBhZmZlY3QgdGhlIHN0YXRlIG9mIHRoZSBhdXRvY29tcGxldGUsIHdoaWNoIHRyaWdnZXJzXG4gICAgICogdmFyaW91cyBhY3Rpb25zIChjYWxsIHRvIHN1Z2dlc3QgQVBJLCBldGMuKS5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIExpc3RlbnMgdG8gY2xpY2sgZXZlbnRzIG9uIHRoZSA8aW5wdXQ+IGhvc3RcbiAgICAgKi9cbiAgICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIikgY2xpY2soKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJpbnB1dCBjbGlja2VkXCIpO1xuICAgICAgICB0aGlzLnN0YXJ0T3JBY3RpdmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMaXN0ZW5zIHRvIHRvdWNoc3RhcnQgZXZlbnRzIChtb2JpbGUgY2xpY2tzKSBvbiB0aGUgPGlucHV0PiBob3N0XG4gICAgICovXG4gICAgQEhvc3RMaXN0ZW5lcihcInRvdWNoc3RhcnRcIikgdG91Y2hzdGFydCgpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImlucHV0IHRvdWNoc3RhcnRcIik7XG4gICAgICAgIHRoaXMuc3RhcnRPckFjdGl2ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3RlbnMgdG8gZm9jdXMgZXZlbnRzIG9uIHRoZSA8aW5wdXQ+IGhvc3RcbiAgICAgKi9cbiAgICBASG9zdExpc3RlbmVyKFwiZm9jdXNcIikgZm9jdXMoKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJpbnB1dCBmb2N1cyBnYWluZWRcIik7XG4gICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMaXN0ZW5zIHRvIGJsdXIgZXZlbnRzIChvdXQgb2YgZm9jdXMpIG9uIHRoZSA8aW5wdXQ+IGhvc3RcbiAgICAgKi9cbiAgICBASG9zdExpc3RlbmVyKFwiYmx1clwiLCBbXCIkZXZlbnRcIl0pIGJsdXIoZXZlbnQ6IEZvY3VzRXZlbnQpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImlucHV0IGZvY3VzIGxvc3RcIik7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byBhbnkgY2hhbmdlIGluIHRoZSA8aW5wdXQ+IGNvbnRlbnQgYW5kIHJlYWN0XG4gICAgICogYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBhdXRvY29tcGxldGVcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBASG9zdExpc3RlbmVyKFwiaW5wdXRcIiwgW1wiJGV2ZW50XCJdKSBpbnB1dENoYW5nZWQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJpbnB1dCB2YWx1ZSBjaGFuZ2VkXCIpO1xuICAgICAgICBzd2l0Y2godGhpcy5nZXRTdGF0ZSgpKXtcbiAgICAgICAgICAgIGNhc2UgQXV0b2NvbXBsZXRlU3RhdGUuT1BFTkVEOlxuICAgICAgICAgICAgICAgIHRoaXMuc3VnZ2VzdCgpOyAvLyBKdXN0IHJlcXVlc3QgbW9yZSBkYXRhLCBidXQgbm8gc3RhdGUgY2hhbmdlXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEF1dG9jb21wbGV0ZVN0YXRlLlNUQVJUOlxuICAgICAgICAgICAgY2FzZSBBdXRvY29tcGxldGVTdGF0ZS5BQ1RJVkU6XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUoKTsgLy8gZ2V0IG1vcmUgZGF0YSwgYW5kIGNoYW5nZSBzdGF0ZSBpZiBub3QgYWxyZWFkeSBBQ1RJVkVcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQXV0b2NvbXBsZXRlU3RhdGUuU0VMRUNURUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydCgpOyAvLyBUaGUgbW9kZWwgY2hhbmdlZCBiZWNhdXNlIHdlIHNlbGVjdGVkIGEgdmFsdWUgPT0+IHdlIHJlc3RhcnQgaW4gY2FzZSB0aGUgdXNlciBrZWVwcyB0eXBpbmdcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQXV0b2NvbXBsZXRlU3RhdGUuSU5JVDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiU2hvdWxkIG5vdCBiZSBpbiBJTklUIHN0YXRlIGlmIHRoZSBmb3JtIGNoYW5nZXNcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gdXNlcidzIGtleWJvYXJkIGFjdGlvbnMgaW4gdGhlIDxpbnB1dD4sIGluIG9yZGVyIHRvIG5hdmlnYXRlXG4gICAgICogYW5kIHNlbGVjdCB0aGUgYXV0b2NvbXBsZXRlIHN1Z2dlc3Rpb25zLlxuICAgICAqIEBwYXJhbSBldmVudCB0aGUga2V5Ym9hcmRcbiAgICAgKi9cbiAgICBASG9zdExpc3RlbmVyKFwia2V5ZG93blwiLCBbXCIkZXZlbnRcIl0pIGtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgLy8gTmF2aWdhdGlvbiBpbiB0aGUgb3BlbmVkIGRyb3Bkb3duXG4gICAgICAgIGlmICh0aGlzLmdldFN0YXRlKCkgPT09IEF1dG9jb21wbGV0ZVN0YXRlLk9QRU5FRCkge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBLZXlzLnVwOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duLnNlbGVjdFByZXZpb3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gcHJldmVudCBkZWZhdWx0XG4gICAgICAgICAgICAgICAgY2FzZSBLZXlzLmRvd246XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd24uc2VsZWN0TmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHByZXZlbnQgZGVmYXVsdFxuICAgICAgICAgICAgICAgIGNhc2UgS2V5cy50YWI6XG4gICAgICAgICAgICAgICAgICAgIGlmKCEhdGhpcy5kcm9wZG93bi5zZWxlY3RlZFZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZHJvcGRvd24uc2VsZWN0ZWRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duLnNlbGVjdE5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHByZXZlbnQgZGVmYXVsdCAoY2hhbmdlIGZvY3VzKVxuICAgICAgICAgICAgICAgIGNhc2UgS2V5cy5lc2M6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQoKTsgLy8gSnVzdCByZXN0YXJ0IHRoZSBhdXRvY29tcGxldGVcbiAgICAgICAgICAgICAgICAgICAgLy9ldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy8gbmVlZGVkP1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHByZXZlbnQgZGVmYXVsdFxuICAgICAgICAgICAgICAgIGNhc2UgS2V5cy5lbnRlcjpcbiAgICAgICAgICAgICAgICAgICAgaWYoISF0aGlzLmRyb3Bkb3duLnNlbGVjdGVkVmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QodGhpcy5kcm9wZG93bi5zZWxlY3RlZFZhbHVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIG5lZWRlZD9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gcHJldmVudCBkZWZhdWx0IGFjdGlvbiAoYXV0byBzdWJtaXQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIGEgc2VhcmNoIHdhcyB0cmlnZ2VyZWQsIHJlc3RhcnQgdGhlIGF1dG9jb21wbGV0ZVxuICAgICAgICBpZihldmVudC5rZXlDb2RlID09PSBLZXlzLmVudGVyKSB7XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdC5uZXh0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG4iXX0=