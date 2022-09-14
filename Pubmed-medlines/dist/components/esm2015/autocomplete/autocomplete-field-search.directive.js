import { Directive, Input, Output, EventEmitter } from "@angular/core";
import { of } from "rxjs";
import { Utils, Keys } from "@sinequa/core/base";
import { Expr, ExprParser } from "@sinequa/core/app-utils";
import { Autocomplete, AutocompleteState } from './autocomplete.directive';
import * as i0 from "@angular/core";
import * as i1 from "./suggest.service";
import * as i2 from "@sinequa/core/app-utils";
import * as i3 from "@sinequa/components/utils";
export class AutocompleteFieldSearch extends Autocomplete {
    constructor(elementRef, suggestService, appService, uiService, exprBuilder) {
        super(elementRef, suggestService, appService, uiService);
        this.exprBuilder = exprBuilder;
        // FIELDED SEARCH
        /**
         * "text" mode: fielded search is entirely managed as text in the <input> component
         * "selects" mode: fielded search stores the selected autocomplete items to create selections, while keeping a clean <input> content (better UI/UX but does not support operators like OR, NOT, and parentheses)
         */
        this.fieldSearchMode = "text";
        /** Fields excluded from fielded search (searched as regular strings if selected) */
        this.excludedFields = ["concepts"];
        /** Stores the selected fielded search items selected via Tab */
        this.fieldSearchItems = [];
        // Event emitters
        this.parse = new EventEmitter();
    }
    /**
     * If the off input changes state, react accordingly
     * @param changes
     */
    ngOnChanges(changes) {
        var _a;
        super.ngOnChanges(changes);
        // Subscribe to the field search items's container
        if (changes["fieldSearchItemsContainer"] && this.fieldSearchItemsContainer) {
            if (this._fieldSearchSubscription) {
                this._fieldSearchSubscription.unsubscribe();
            }
            this._fieldSearchSubscription = this.fieldSearchItemsContainer.itemRemoved.subscribe(item => {
                this.fieldSearchItems.splice(this.fieldSearchItems.indexOf(item), 1);
                this.updatePlaceholder();
                this.submit.next();
            });
        }
        // Transform the field search expresion (Expr string) into a list of autocomplete items displayed in the field search container
        if (changes["fieldSearchExpression"] && this.fieldSearchMode === "selects") {
            if (this.fieldSearchExpression) {
                const expr = this.appService.parseExpr(this.fieldSearchExpression);
                if (expr instanceof Expr && this.fieldSearchItems.length !== expr.getFields().length) {
                    this.fieldSearchItems.splice(0);
                    if (expr.and) {
                        expr.operands.forEach(e => this.fieldSearchItems.push(this.exprToItem(e)));
                    }
                    else {
                        this.fieldSearchItems.push(this.exprToItem(expr));
                    }
                }
            }
            else {
                this.fieldSearchItems.splice(0);
            }
        }
        // If fieldSearchMode changes from selects to something else, we must remove the field search items
        if (changes["fieldSearchMode"] && this.fieldSearchMode !== "selects" && this.fieldSearchItems.length > 0) {
            this.fieldSearchItems.splice(0);
        }
        this.updatePlaceholder();
        (_a = this.fieldSearchItemsContainer) === null || _a === void 0 ? void 0 : _a.update(this.fieldSearchItems);
    }
    /**
     * Unsubscribe when destroying the component
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._fieldSearchSubscription) {
            this._fieldSearchSubscription.unsubscribe();
        }
    }
    /**
     * Insert the given autocomplete item into the current search input
     * at the right location
     * @param item
     */
    insertAutocompleteItem(item) {
        var _a, _b;
        const value = this.getInputValue(); // Current text in the input
        if (value) { // There should always be text
            const parseResult = this.parseQuery(); // Parse the current text
            if (parseResult.result) { // (if no result, a parsing error occurred)
                const res = parseResult.result.findValue(this.getInputPosition()); // Get the expression at the caret location
                // Autocomplete "compa" => "company:"
                if (res && item.category === "$field$") {
                    this.replaceValueInForm(res, item.display + ": ");
                    return false;
                }
                // Autocomplete "company:Goo" => "company:`GOOGLE`"
                if (res && res.field === item.category) {
                    this.replaceValueInForm(res, ExprParser.escape(item.normalized || item.display));
                    return true;
                }
                // Autocomplete "Goo" => "company:`GOOGLE`"
                if (res && !res.field && item.category &&
                    (this.includedFields && ((_a = this.includedFields) === null || _a === void 0 ? void 0 : _a.includes(item.category)) ||
                        (!this.includedFields && !((_b = this.excludedFields) === null || _b === void 0 ? void 0 : _b.includes(item.category))))) { // Filter out fields if not in fieldSearch mode
                    this.replaceValueInForm(res, this.exprBuilder.makeExpr(item.category, item.normalized || item.display));
                    return true;
                }
                // Autocomplete "Search eng" => "Search engine"
                if (res && !res.field) {
                    this.replaceValueInForm(res, item.display);
                    return true;
                }
                // Remaining edge case ?
                console.error(item, parseResult.result);
            }
        }
        console.error("Shouldn't be here: an autocomplete item is selected, but there is no text or a parse error!");
        // Default to just overriding the current value (a complex query with multiple items might become reduced to this single item!)
        if (item.category === "$field$") {
            this.setInputValue(item.display + ":");
            return false;
        }
        this.setInputValue(this.exprBuilder.makeExpr(item.category, item.normalized || item.display)); // person: `Bill Gates`
        return true;
    }
    /**
     * Replaces the piece of expression (res) with a new value
     * in the input form
     * @param res The piece of expression parsed from the input content
     * @param value The new value
     */
    replaceValueInForm(res, value) {
        this.uiService.setCaret(this.inputElement, res.start, res.start + res.length, value);
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
        var _a, _b, _c;
        if (item) {
            if (this.fieldSearchMode === "text") {
                return this.insertAutocompleteItem(item);
            }
            else if (this.fieldSearchMode === "selects" && item.category &&
                (this.includedFields && ((_a = this.includedFields) === null || _a === void 0 ? void 0 : _a.includes(item.category)) ||
                    (!this.includedFields && !((_b = this.excludedFields) === null || _b === void 0 ? void 0 : _b.includes(item.category))))) { // Filter out fields if not in fieldSearch mode
                // In the case of of a field name, we display the field for autocomplete, but we don't want to search for it
                if (item.category === "$field$") {
                    this.setInputValue(item.display + ":");
                    return false;
                }
                // Store the autocomplete item that will be used to create a selection
                this.setInputValue("");
                this.fieldSearchItems.push(item);
                this.updatePlaceholder();
                (_c = this.fieldSearchItemsContainer) === null || _c === void 0 ? void 0 : _c.update(this.fieldSearchItems);
                return true;
            }
            else {
                this.setInputValue(item.display);
                return true;
            }
        }
        return false;
    }
    /**
     * Returns an expression (Expr) for the fielded search items
     */
    getFieldSearchExpression() {
        return this.itemsToExpr(this.fieldSearchItems);
    }
    /**
     * Transforms a list of AutocompleteItems into an expression
     * @param items list of AutocompleteItems
     */
    itemsToExpr(items) {
        if (items.length > 0) {
            return this.exprBuilder.concatAndExpr(items.map(item => this.exprBuilder.makeExpr(item.category, item.normalized || item.display, item.display)));
        }
        return undefined;
    }
    /**
     * Transforms an expression into a list of AutocompleteItems
     * @param expr an expression
     */
    exprToItem(expr) {
        return {
            category: expr.field,
            display: expr.display,
            normalized: expr.value,
        };
    }
    /**
     * Takes the text from the <input> element and parse it to
     * determine what type of suggestion to request from the server.
     * The suggestions are then fetched by getSuggestsObs() and processed
     * by processSuggests().
     */
    getSuggests() {
        let value = this.getInputValue();
        if (value) { // If there is text, make a call to the suggest API
            const parseResult = this.parseQuery(); // If using fieldSearch, the result can be used to detect an active field
            let fields;
            if (parseResult.result && this.fieldSearchMode !== "off") {
                const position = this.getInputPosition(); // Position of the caret, if needed
                const res = parseResult.result.findValue(position);
                // Field Search suggest
                if (!!res && !!res.field) {
                    fields = Utils.startsWith(res.field, "@") ? ["text"] : [res.field];
                    value = res.value;
                }
                if (!!res && this.fieldSearchMode === "text") {
                    value = res.value;
                }
            }
            if (parseResult.error && this.fieldSearchMode !== "off") {
                this.processSuggests(of([])); // Empty autocomplete if parsing errors
                return;
            }
            this.processSuggests(this.getSuggestsObs(value, fields));
        }
        else { // If empty input, restart autocomplete
            this.parse.next({}); // remove error messages if any
            this.start();
        }
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
                    .filter(item => {
                    var _a, _b;
                    return item.category !== "$field$" || (this.fieldSearchMode !== "off" &&
                        (this.includedFields && ((_a = this.includedFields) === null || _a === void 0 ? void 0 : _a.includes(item.display)) ||
                            (!this.includedFields && !((_b = this.excludedFields) === null || _b === void 0 ? void 0 : _b.includes(item.display)))));
                }) // Filter out fields if not in fieldSearch mode
                    .map(item => {
                    if (!item.label) {
                        if (item.category === "$field$") {
                            item.label = "Field";
                        }
                        else {
                            item.label = this.appService.getLabel(item.category);
                        }
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
     * Parse the query for syntax errors (also allows to detect field search if needed).
     * Fires a parse event.
     */
    parseQuery() {
        const value = this.getInputValue();
        const result = this.appService.parseExpr(value, { allowEmptyValues: true });
        const event = result instanceof Expr ? { result: result } : { error: result };
        this.parse.next(event);
        return event;
    }
    /**
     * Listen to user's keyboard actions in the <input>, in order to navigate
     * and select the autocomplete suggestions.
     * Overrides the parent keydown method, adds the management of the backspace key
     * to remove field search items.
     * @param event the keyboard
     */
    keydown(event) {
        var _a;
        const keydown = super.keydown(event);
        if (keydown === undefined) {
            // In fielded search mode, we can remove selections by typing <backspace> when the input is empty
            if (event.keyCode === Keys.backspace) {
                if (this.fieldSearchMode === "selects" && this.getInputValue() === '') {
                    this.fieldSearchItems.pop();
                    this.updatePlaceholder();
                    (_a = this.fieldSearchItemsContainer) === null || _a === void 0 ? void 0 : _a.update(this.fieldSearchItems);
                }
            }
        }
        return keydown;
    }
    /**
     * Updates the <input>'s placeholder to avoid displaying something
     * when there are fieldSearchItems displayed to the left.
     */
    updatePlaceholder() {
        this._placeholder = this.fieldSearchItems.length > 0 ? '' : this.placeholder;
    }
}
AutocompleteFieldSearch.ɵfac = function AutocompleteFieldSearch_Factory(t) { return new (t || AutocompleteFieldSearch)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.SuggestService), i0.ɵɵdirectiveInject(i2.AppService), i0.ɵɵdirectiveInject(i3.UIService), i0.ɵɵdirectiveInject(i2.ExprBuilder)); };
AutocompleteFieldSearch.ɵdir = i0.ɵɵdefineDirective({ type: AutocompleteFieldSearch, selectors: [["", "sqAutocompleteFieldSearch", ""]], inputs: { fieldSearchMode: "fieldSearchMode", excludedFields: "excludedFields", includedFields: "includedFields", fieldSearchItemsContainer: "fieldSearchItemsContainer", fieldSearchExpression: "fieldSearchExpression" }, outputs: { parse: "parse" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AutocompleteFieldSearch, [{
        type: Directive,
        args: [{
                selector: "[sqAutocompleteFieldSearch]"
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.SuggestService }, { type: i2.AppService }, { type: i3.UIService }, { type: i2.ExprBuilder }]; }, { fieldSearchMode: [{
            type: Input
        }], excludedFields: [{
            type: Input
        }], includedFields: [{
            type: Input
        }], fieldSearchItemsContainer: [{
            type: Input
        }], fieldSearchExpression: [{
            type: Input
        }], parse: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLWZpZWxkLXNlYXJjaC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9hdXRvY29tcGxldGUvIiwic291cmNlcyI6WyJhdXRvY29tcGxldGUtZmllbGQtc2VhcmNoLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFtRCxNQUFNLGVBQWUsQ0FBQztBQUN4SCxPQUFPLEVBQTRCLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBYyxJQUFJLEVBQWUsVUFBVSxFQUFnQixNQUFNLHlCQUF5QixDQUFDO0FBQ2xHLE9BQU8sRUFBRSxZQUFZLEVBQW9CLGlCQUFpQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7O0FBeUI3RixNQUFNLE9BQU8sdUJBQXdCLFNBQVEsWUFBWTtJQStCckQsWUFBWSxVQUEyQixFQUNuQyxjQUE4QixFQUM5QixVQUFzQixFQUN0QixTQUFvQixFQUNWLFdBQXdCO1FBQ2xDLEtBQUssQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUQvQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWhDdEMsaUJBQWlCO1FBRWpCOzs7V0FHRztRQUNNLG9CQUFlLEdBQStCLE1BQU0sQ0FBQztRQUU5RCxvRkFBb0Y7UUFDM0UsbUJBQWMsR0FBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBV2pELGdFQUFnRTtRQUNoRCxxQkFBZ0IsR0FBdUIsRUFBRSxDQUFDO1FBRzFELGlCQUFpQjtRQUVQLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBZSxDQUFDO0lBUWxELENBQUM7SUFHRDs7O09BR0c7SUFDSCxXQUFXLENBQUMsT0FB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LElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUN6QixNQUFBLElBQUksQ0FBQyx5QkFBeUIsMENBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtpQkFDakU7YUFDSjtTQUNKO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7T0FHRztJQUNILGlCQUFpQjtRQUNiLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUNqRixDQUFDOzs4RkFsV1EsdUJBQXVCOzREQUF2Qix1QkFBdUI7a0RBQXZCLHVCQUF1QjtjQUhuQyxTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLDZCQUE2QjthQUMxQztxS0FVWSxlQUFlO2tCQUF2QixLQUFLO1lBR0csY0FBYztrQkFBdEIsS0FBSztZQUdHLGNBQWM7a0JBQXRCLEtBQUs7WUFHRyx5QkFBeUI7a0JBQWpDLEtBQUs7WUFHRyxxQkFBcUI7a0JBQTdCLEtBQUs7WUFRSSxLQUFLO2tCQUFkLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgU2ltcGxlQ2hhbmdlcywgRWxlbWVudFJlZiwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBvZiB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBVdGlscywgS2V5c30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHsgQXBwU2VydmljZSwgRXhwciwgRXhwckJ1aWxkZXIsIEV4cHJQYXJzZXIsIEV4cHJWYWx1ZUluZm99IGZyb20gXCJAc2luZXF1YS9jb3JlL2FwcC11dGlsc1wiO1xuaW1wb3J0IHsgQXV0b2NvbXBsZXRlLCBBdXRvY29tcGxldGVJdGVtLCBBdXRvY29tcGxldGVTdGF0ZSB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTdWdnZXN0U2VydmljZSB9IGZyb20gJy4vc3VnZ2VzdC5zZXJ2aWNlJztcbmltcG9ydCB7IFVJU2VydmljZSB9IGZyb20gJ0BzaW5lcXVhL2NvbXBvbmVudHMvdXRpbHMnO1xuXG4vKipcbiAqIEludGVyZmFjZSByZXF1aXJlZCB0byBiZSBpbXBsZW1lbnQgYnkgdGhlIGNvbXBvbmVudCBkaXNwbGF5aW5nXG4gKiB0aGUgZmllbGRlZCBzZWFyY2ggaXRlbXMgKGJhc2ljYWxseSB0aGUgY29udGVudCBvZiBmaWVsZFNlYXJjaEl0ZW1zKVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkU2VhcmNoSXRlbXNDb250YWluZXIge1xuXG4gICAgLyoqIFVwZGF0ZSB0aGUgbGlzdCBvZiBpdGVtcyBkaXNwbGF5ZWQgYnkgdGhlIGNvbnRhaW5lciAqL1xuICAgIHVwZGF0ZShpdGVtczogQXV0b2NvbXBsZXRlSXRlbVtdKTogdm9pZDtcblxuICAgIC8qKiBFdmVudCB0cmlnZ2VyZWQgd2hlbiB0aGUgdXNlciByZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgY29udGFpbmVyICovXG4gICAgaXRlbVJlbW92ZWQ6IEV2ZW50RW1pdHRlcjxBdXRvY29tcGxldGVJdGVtPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXJzZVJlc3VsdCB7XG4gICAgcmVzdWx0PzogRXhwcjtcbiAgICBlcnJvcj86IHN0cmluZztcbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3NxQXV0b2NvbXBsZXRlRmllbGRTZWFyY2hdXCJcbn0pXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlRmllbGRTZWFyY2ggZXh0ZW5kcyBBdXRvY29tcGxldGUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cblxuICAgIC8vIEZJRUxERUQgU0VBUkNIXG5cbiAgICAvKiogXG4gICAgICogXCJ0ZXh0XCIgbW9kZTogZmllbGRlZCBzZWFyY2ggaXMgZW50aXJlbHkgbWFuYWdlZCBhcyB0ZXh0IGluIHRoZSA8aW5wdXQ+IGNvbXBvbmVudCBcbiAgICAgKiBcInNlbGVjdHNcIiBtb2RlOiBmaWVsZGVkIHNlYXJjaCBzdG9yZXMgdGhlIHNlbGVjdGVkIGF1dG9jb21wbGV0ZSBpdGVtcyB0byBjcmVhdGUgc2VsZWN0aW9ucywgd2hpbGUga2VlcGluZyBhIGNsZWFuIDxpbnB1dD4gY29udGVudCAoYmV0dGVyIFVJL1VYIGJ1dCBkb2VzIG5vdCBzdXBwb3J0IG9wZXJhdG9ycyBsaWtlIE9SLCBOT1QsIGFuZCBwYXJlbnRoZXNlcylcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWVsZFNlYXJjaE1vZGU6IFwib2ZmXCIgfCBcInRleHRcIiB8IFwic2VsZWN0c1wiID0gXCJ0ZXh0XCI7XG5cbiAgICAvKiogRmllbGRzIGV4Y2x1ZGVkIGZyb20gZmllbGRlZCBzZWFyY2ggKHNlYXJjaGVkIGFzIHJlZ3VsYXIgc3RyaW5ncyBpZiBzZWxlY3RlZCkgKi9cbiAgICBASW5wdXQoKSBleGNsdWRlZEZpZWxkczogc3RyaW5nW10gPSBbXCJjb25jZXB0c1wiXTtcblxuICAgIC8qIEZpZWxkcyBpbmNsdWRlZCBpbiBmaWVsZGVkIHNlYXJjaCAoaGF2ZSBwcmVjZWRlbmNlIG92ZXIgZXhjbHVkZWQgZmllbGRzKSAqL1xuICAgIEBJbnB1dCgpIGluY2x1ZGVkRmllbGRzPzogc3RyaW5nW107XG5cbiAgIC8qKiBDb250YWluZXIgZGlzcGxheWluZyB0aGUgZmllbGRTZWFyY2hJdGVtcyAob25seSBuZWVkZWQgaWYgbW9kZSA9PT0gXCJzZWxlY3RzXCIpICovXG4gICAgQElucHV0KCkgZmllbGRTZWFyY2hJdGVtc0NvbnRhaW5lcj86IEZpZWxkU2VhcmNoSXRlbXNDb250YWluZXI7XG5cbiAgICAvKiogQ3VycmVudCBzZWxlY3Rpb24gZXhwcmVzc2lvbiBuZWVkZWQgdG8gdXBkYXRlIHRoZSBsaXN0IG9mIGZpZWxkIHNlYXJjaCBpdGVtcyBpZiBtb2RlID09PSBcInNlbGVjdHNcIiAqL1xuICAgIEBJbnB1dCgpIGZpZWxkU2VhcmNoRXhwcmVzc2lvbj86IHN0cmluZztcbiBcbiAgICAvKiogU3RvcmVzIHRoZSBzZWxlY3RlZCBmaWVsZGVkIHNlYXJjaCBpdGVtcyBzZWxlY3RlZCB2aWEgVGFiICovXG4gICAgcHVibGljIHJlYWRvbmx5IGZpZWxkU2VhcmNoSXRlbXM6IEF1dG9jb21wbGV0ZUl0ZW1bXSA9IFtdO1xuXG5cbiAgICAvLyBFdmVudCBlbWl0dGVyc1xuXG4gICAgQE91dHB1dCgpIHBhcnNlID0gbmV3IEV2ZW50RW1pdHRlcjxQYXJzZVJlc3VsdD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8YW55PiwgXG4gICAgICAgIHN1Z2dlc3RTZXJ2aWNlOiBTdWdnZXN0U2VydmljZSxcbiAgICAgICAgYXBwU2VydmljZTogQXBwU2VydmljZSxcbiAgICAgICAgdWlTZXJ2aWNlOiBVSVNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBleHByQnVpbGRlcjogRXhwckJ1aWxkZXIpe1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmLCBzdWdnZXN0U2VydmljZSwgYXBwU2VydmljZSwgdWlTZXJ2aWNlKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIElmIHRoZSBvZmYgaW5wdXQgY2hhbmdlcyBzdGF0ZSwgcmVhY3QgYWNjb3JkaW5nbHlcbiAgICAgKiBAcGFyYW0gY2hhbmdlc1xuICAgICAqL1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpe1xuICAgICAgICBzdXBlci5uZ09uQ2hhbmdlcyhjaGFuZ2VzKTtcblxuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gdGhlIGZpZWxkIHNlYXJjaCBpdGVtcydzIGNvbnRhaW5lclxuICAgICAgICBpZihjaGFuZ2VzW1wiZmllbGRTZWFyY2hJdGVtc0NvbnRhaW5lclwiXSAmJiB0aGlzLmZpZWxkU2VhcmNoSXRlbXNDb250YWluZXIpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuX2ZpZWxkU2VhcmNoU3Vic2NyaXB0aW9uKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9maWVsZFNlYXJjaFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZmllbGRTZWFyY2hTdWJzY3JpcHRpb24gPSB0aGlzLmZpZWxkU2VhcmNoSXRlbXNDb250YWluZXIuaXRlbVJlbW92ZWQuc3Vic2NyaWJlKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZmllbGRTZWFyY2hJdGVtcy5zcGxpY2UodGhpcy5maWVsZFNlYXJjaEl0ZW1zLmluZGV4T2YoaXRlbSksIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUGxhY2Vob2xkZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdC5uZXh0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRyYW5zZm9ybSB0aGUgZmllbGQgc2VhcmNoIGV4cHJlc2lvbiAoRXhwciBzdHJpbmcpIGludG8gYSBsaXN0IG9mIGF1dG9jb21wbGV0ZSBpdGVtcyBkaXNwbGF5ZWQgaW4gdGhlIGZpZWxkIHNlYXJjaCBjb250YWluZXJcbiAgICAgICAgaWYoY2hhbmdlc1tcImZpZWxkU2VhcmNoRXhwcmVzc2lvblwiXSAmJiB0aGlzLmZpZWxkU2VhcmNoTW9kZSA9PT0gXCJzZWxlY3RzXCIpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuZmllbGRTZWFyY2hFeHByZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXhwciA9IHRoaXMuYXBwU2VydmljZS5wYXJzZUV4cHIodGhpcy5maWVsZFNlYXJjaEV4cHJlc3Npb24pO1xuICAgICAgICAgICAgICAgIGlmKGV4cHIgaW5zdGFuY2VvZiBFeHByICYmIHRoaXMuZmllbGRTZWFyY2hJdGVtcy5sZW5ndGggIT09IGV4cHIuZ2V0RmllbGRzKCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmllbGRTZWFyY2hJdGVtcy5zcGxpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGV4cHIuYW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHByLm9wZXJhbmRzLmZvckVhY2goZSA9PiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZWxkU2VhcmNoSXRlbXMucHVzaCh0aGlzLmV4cHJUb0l0ZW0oZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWVsZFNlYXJjaEl0ZW1zLnB1c2godGhpcy5leHByVG9JdGVtKGV4cHIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZmllbGRTZWFyY2hJdGVtcy5zcGxpY2UoMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBmaWVsZFNlYXJjaE1vZGUgY2hhbmdlcyBmcm9tIHNlbGVjdHMgdG8gc29tZXRoaW5nIGVsc2UsIHdlIG11c3QgcmVtb3ZlIHRoZSBmaWVsZCBzZWFyY2ggaXRlbXNcbiAgICAgICAgaWYoY2hhbmdlc1tcImZpZWxkU2VhcmNoTW9kZVwiXSAmJiB0aGlzLmZpZWxkU2VhcmNoTW9kZSAhPT0gXCJzZWxlY3RzXCIgJiYgdGhpcy5maWVsZFNlYXJjaEl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZmllbGRTZWFyY2hJdGVtcy5zcGxpY2UoMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZVBsYWNlaG9sZGVyKCk7XG4gICAgICAgIHRoaXMuZmllbGRTZWFyY2hJdGVtc0NvbnRhaW5lcj8udXBkYXRlKHRoaXMuZmllbGRTZWFyY2hJdGVtcyk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIF9maWVsZFNlYXJjaFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIC8qKlxuICAgICAqIFVuc3Vic2NyaWJlIHdoZW4gZGVzdHJveWluZyB0aGUgY29tcG9uZW50XG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKXtcbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICAgICAgaWYodGhpcy5fZmllbGRTZWFyY2hTdWJzY3JpcHRpb24pe1xuICAgICAgICAgICAgdGhpcy5fZmllbGRTZWFyY2hTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluc2VydCB0aGUgZ2l2ZW4gYXV0b2NvbXBsZXRlIGl0ZW0gaW50byB0aGUgY3VycmVudCBzZWFyY2ggaW5wdXRcbiAgICAgKiBhdCB0aGUgcmlnaHQgbG9jYXRpb25cbiAgICAgKiBAcGFyYW0gaXRlbSBcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaW5zZXJ0QXV0b2NvbXBsZXRlSXRlbShpdGVtOiBBdXRvY29tcGxldGVJdGVtKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRJbnB1dFZhbHVlKCk7IC8vIEN1cnJlbnQgdGV4dCBpbiB0aGUgaW5wdXRcbiAgICAgICAgaWYodmFsdWUpIHsgLy8gVGhlcmUgc2hvdWxkIGFsd2F5cyBiZSB0ZXh0XG4gICAgICAgICAgICBjb25zdCBwYXJzZVJlc3VsdCA9IHRoaXMucGFyc2VRdWVyeSgpOyAvLyBQYXJzZSB0aGUgY3VycmVudCB0ZXh0XG4gICAgICAgICAgICBpZihwYXJzZVJlc3VsdC5yZXN1bHQpIHsgLy8gKGlmIG5vIHJlc3VsdCwgYSBwYXJzaW5nIGVycm9yIG9jY3VycmVkKVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHBhcnNlUmVzdWx0LnJlc3VsdC5maW5kVmFsdWUodGhpcy5nZXRJbnB1dFBvc2l0aW9uKCkpOyAvLyBHZXQgdGhlIGV4cHJlc3Npb24gYXQgdGhlIGNhcmV0IGxvY2F0aW9uXG4gICAgICAgICAgICAgICAgLy8gQXV0b2NvbXBsZXRlIFwiY29tcGFcIiA9PiBcImNvbXBhbnk6XCJcbiAgICAgICAgICAgICAgICBpZihyZXMgJiYgaXRlbS5jYXRlZ29yeSA9PT0gXCIkZmllbGQkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXBsYWNlVmFsdWVJbkZvcm0ocmVzLCBpdGVtLmRpc3BsYXkgKyBcIjogXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEF1dG9jb21wbGV0ZSBcImNvbXBhbnk6R29vXCIgPT4gXCJjb21wYW55OmBHT09HTEVgXCJcbiAgICAgICAgICAgICAgICBpZihyZXMgJiYgcmVzLmZpZWxkID09PSBpdGVtLmNhdGVnb3J5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVwbGFjZVZhbHVlSW5Gb3JtKHJlcywgRXhwclBhcnNlci5lc2NhcGUoaXRlbS5ub3JtYWxpemVkIHx8IGl0ZW0uZGlzcGxheSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQXV0b2NvbXBsZXRlIFwiR29vXCIgPT4gXCJjb21wYW55OmBHT09HTEVgXCJcbiAgICAgICAgICAgICAgICBpZihyZXMgJiYgIXJlcy5maWVsZCAmJiBpdGVtLmNhdGVnb3J5ICYmIFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5pbmNsdWRlZEZpZWxkcyAmJiB0aGlzLmluY2x1ZGVkRmllbGRzPy5pbmNsdWRlcyhpdGVtLmNhdGVnb3J5KSB8fCBcbiAgICAgICAgICAgICAgICAgICAgKCF0aGlzLmluY2x1ZGVkRmllbGRzICYmICF0aGlzLmV4Y2x1ZGVkRmllbGRzPy5pbmNsdWRlcyhpdGVtLmNhdGVnb3J5KSkpKSB7IC8vIEZpbHRlciBvdXQgZmllbGRzIGlmIG5vdCBpbiBmaWVsZFNlYXJjaCBtb2RlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVwbGFjZVZhbHVlSW5Gb3JtKHJlcywgdGhpcy5leHByQnVpbGRlci5tYWtlRXhwcihpdGVtLmNhdGVnb3J5LCBpdGVtLm5vcm1hbGl6ZWQgfHwgaXRlbS5kaXNwbGF5KSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBBdXRvY29tcGxldGUgXCJTZWFyY2ggZW5nXCIgPT4gXCJTZWFyY2ggZW5naW5lXCJcbiAgICAgICAgICAgICAgICBpZihyZXMgJiYgIXJlcy5maWVsZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcGxhY2VWYWx1ZUluRm9ybShyZXMsIGl0ZW0uZGlzcGxheSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBSZW1haW5pbmcgZWRnZSBjYXNlID9cbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGl0ZW0sIHBhcnNlUmVzdWx0LnJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmVycm9yKFwiU2hvdWxkbid0IGJlIGhlcmU6IGFuIGF1dG9jb21wbGV0ZSBpdGVtIGlzIHNlbGVjdGVkLCBidXQgdGhlcmUgaXMgbm8gdGV4dCBvciBhIHBhcnNlIGVycm9yIVwiKTtcbiAgICAgICAgLy8gRGVmYXVsdCB0byBqdXN0IG92ZXJyaWRpbmcgdGhlIGN1cnJlbnQgdmFsdWUgKGEgY29tcGxleCBxdWVyeSB3aXRoIG11bHRpcGxlIGl0ZW1zIG1pZ2h0IGJlY29tZSByZWR1Y2VkIHRvIHRoaXMgc2luZ2xlIGl0ZW0hKVxuICAgICAgICBpZihpdGVtLmNhdGVnb3J5ID09PSBcIiRmaWVsZCRcIikge1xuICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKGl0ZW0uZGlzcGxheSArIFwiOlwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldElucHV0VmFsdWUodGhpcy5leHByQnVpbGRlci5tYWtlRXhwcihpdGVtLmNhdGVnb3J5LCBpdGVtLm5vcm1hbGl6ZWQgfHwgaXRlbS5kaXNwbGF5KSk7IC8vIHBlcnNvbjogYEJpbGwgR2F0ZXNgXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcGxhY2VzIHRoZSBwaWVjZSBvZiBleHByZXNzaW9uIChyZXMpIHdpdGggYSBuZXcgdmFsdWVcbiAgICAgKiBpbiB0aGUgaW5wdXQgZm9ybVxuICAgICAqIEBwYXJhbSByZXMgVGhlIHBpZWNlIG9mIGV4cHJlc3Npb24gcGFyc2VkIGZyb20gdGhlIGlucHV0IGNvbnRlbnRcbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIG5ldyB2YWx1ZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCByZXBsYWNlVmFsdWVJbkZvcm0ocmVzOiBFeHByVmFsdWVJbmZvLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudWlTZXJ2aWNlLnNldENhcmV0KHRoaXMuaW5wdXRFbGVtZW50LCByZXMuc3RhcnQsIHJlcy5zdGFydCtyZXMubGVuZ3RoLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY29udGVudCBvZiB0aGUgPGlucHV0PiBiYXNlZCBvbiB0aGUgZ2l2ZW5cbiAgICAgKiBBdXRvY29tcGxldGUgSXRlbSAodmFyaW91cyBpbXBsZW1lbnRhdGlvbnMgYXJlIHBvc3NpYmxlLFxuICAgICAqIGRlcGVuZGluZyBvbiB0aGUgaXRlbSBjb250ZW50IGFuZCBuYXR1cmUpLlxuICAgICAqIFRoaXMgd291bGQgYmUgdGhlIHJpZ2h0IG1ldGhvZCB0byBvdmVycmlkZSB0byBpbXBsZW1lbnRcbiAgICAgKiBmaWVsZGVkIHNlYXJjaCBhdXRvY29tcGxldGUuXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiB0aGlzIGF1dG9jb21wbGV0ZSBpdGVtIHNob3VsZCBiZSBzZWFyY2hlZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBzZXRBdXRvY29tcGxldGVJdGVtKGl0ZW06IEF1dG9jb21wbGV0ZUl0ZW0pOiBib29sZWFuIHtcbiAgICAgICAgaWYoaXRlbSkge1xuICAgICAgICAgICAgaWYodGhpcy5maWVsZFNlYXJjaE1vZGUgPT09IFwidGV4dFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zZXJ0QXV0b2NvbXBsZXRlSXRlbShpdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmZpZWxkU2VhcmNoTW9kZSA9PT0gXCJzZWxlY3RzXCIgJiYgaXRlbS5jYXRlZ29yeSAmJiBcbiAgICAgICAgICAgICAgICAodGhpcy5pbmNsdWRlZEZpZWxkcyAmJiB0aGlzLmluY2x1ZGVkRmllbGRzPy5pbmNsdWRlcyhpdGVtLmNhdGVnb3J5KSB8fCBcbiAgICAgICAgICAgICAgICAoIXRoaXMuaW5jbHVkZWRGaWVsZHMgJiYgIXRoaXMuZXhjbHVkZWRGaWVsZHM/LmluY2x1ZGVzKGl0ZW0uY2F0ZWdvcnkpKSkpIHsgLy8gRmlsdGVyIG91dCBmaWVsZHMgaWYgbm90IGluIGZpZWxkU2VhcmNoIG1vZGVcbiAgICAgICAgICAgICAgICAvLyBJbiB0aGUgY2FzZSBvZiBvZiBhIGZpZWxkIG5hbWUsIHdlIGRpc3BsYXkgdGhlIGZpZWxkIGZvciBhdXRvY29tcGxldGUsIGJ1dCB3ZSBkb24ndCB3YW50IHRvIHNlYXJjaCBmb3IgaXRcbiAgICAgICAgICAgICAgICBpZihpdGVtLmNhdGVnb3J5ID09PSBcIiRmaWVsZCRcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUoaXRlbS5kaXNwbGF5ICsgXCI6XCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFN0b3JlIHRoZSBhdXRvY29tcGxldGUgaXRlbSB0aGF0IHdpbGwgYmUgdXNlZCB0byBjcmVhdGUgYSBzZWxlY3Rpb25cbiAgICAgICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUoXCJcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZFNlYXJjaEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQbGFjZWhvbGRlcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmllbGRTZWFyY2hJdGVtc0NvbnRhaW5lcj8udXBkYXRlKHRoaXMuZmllbGRTZWFyY2hJdGVtcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZShpdGVtLmRpc3BsYXkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGV4cHJlc3Npb24gKEV4cHIpIGZvciB0aGUgZmllbGRlZCBzZWFyY2ggaXRlbXNcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0RmllbGRTZWFyY2hFeHByZXNzaW9uKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zVG9FeHByKHRoaXMuZmllbGRTZWFyY2hJdGVtcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhbnNmb3JtcyBhIGxpc3Qgb2YgQXV0b2NvbXBsZXRlSXRlbXMgaW50byBhbiBleHByZXNzaW9uXG4gICAgICogQHBhcmFtIGl0ZW1zIGxpc3Qgb2YgQXV0b2NvbXBsZXRlSXRlbXNcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaXRlbXNUb0V4cHIoaXRlbXM6IEF1dG9jb21wbGV0ZUl0ZW1bXSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmKGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cHJCdWlsZGVyLmNvbmNhdEFuZEV4cHIoaXRlbXMubWFwKGl0ZW0gPT4gXG4gICAgICAgICAgICAgICAgdGhpcy5leHByQnVpbGRlci5tYWtlRXhwcihpdGVtLmNhdGVnb3J5LCBpdGVtLm5vcm1hbGl6ZWQgfHwgaXRlbS5kaXNwbGF5LCBpdGVtLmRpc3BsYXkpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmFuc2Zvcm1zIGFuIGV4cHJlc3Npb24gaW50byBhIGxpc3Qgb2YgQXV0b2NvbXBsZXRlSXRlbXNcbiAgICAgKiBAcGFyYW0gZXhwciBhbiBleHByZXNzaW9uXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGV4cHJUb0l0ZW0oZXhwcjogRXhwcik6IEF1dG9jb21wbGV0ZUl0ZW0ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2F0ZWdvcnk6IGV4cHIuZmllbGQhLFxuICAgICAgICAgICAgZGlzcGxheTogZXhwci5kaXNwbGF5ISxcbiAgICAgICAgICAgIG5vcm1hbGl6ZWQ6IGV4cHIudmFsdWUhLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGFrZXMgdGhlIHRleHQgZnJvbSB0aGUgPGlucHV0PiBlbGVtZW50IGFuZCBwYXJzZSBpdCB0b1xuICAgICAqIGRldGVybWluZSB3aGF0IHR5cGUgb2Ygc3VnZ2VzdGlvbiB0byByZXF1ZXN0IGZyb20gdGhlIHNlcnZlci5cbiAgICAgKiBUaGUgc3VnZ2VzdGlvbnMgYXJlIHRoZW4gZmV0Y2hlZCBieSBnZXRTdWdnZXN0c09icygpIGFuZCBwcm9jZXNzZWRcbiAgICAgKiBieSBwcm9jZXNzU3VnZ2VzdHMoKS5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0U3VnZ2VzdHMoKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgpO1xuICAgICAgICBpZih2YWx1ZSkgeyAvLyBJZiB0aGVyZSBpcyB0ZXh0LCBtYWtlIGEgY2FsbCB0byB0aGUgc3VnZ2VzdCBBUElcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlUmVzdWx0ID0gdGhpcy5wYXJzZVF1ZXJ5KCk7IC8vIElmIHVzaW5nIGZpZWxkU2VhcmNoLCB0aGUgcmVzdWx0IGNhbiBiZSB1c2VkIHRvIGRldGVjdCBhbiBhY3RpdmUgZmllbGRcbiAgICAgICAgICAgIGxldCBmaWVsZHM6IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYocGFyc2VSZXN1bHQucmVzdWx0ICYmIHRoaXMuZmllbGRTZWFyY2hNb2RlICE9PSBcIm9mZlwiKXtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuZ2V0SW5wdXRQb3NpdGlvbigpOyAvLyBQb3NpdGlvbiBvZiB0aGUgY2FyZXQsIGlmIG5lZWRlZFxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHBhcnNlUmVzdWx0LnJlc3VsdC5maW5kVmFsdWUocG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIC8vIEZpZWxkIFNlYXJjaCBzdWdnZXN0XG4gICAgICAgICAgICAgICAgaWYoISFyZXMgJiYgISFyZXMuZmllbGQpe1xuICAgICAgICAgICAgICAgICAgICBmaWVsZHMgPSBVdGlscy5zdGFydHNXaXRoKHJlcy5maWVsZCwgXCJAXCIpID8gW1widGV4dFwiXSA6IFtyZXMuZmllbGRdO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHJlcy52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoISFyZXMgJiYgdGhpcy5maWVsZFNlYXJjaE1vZGUgPT09IFwidGV4dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcmVzLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYocGFyc2VSZXN1bHQuZXJyb3IgJiYgdGhpcy5maWVsZFNlYXJjaE1vZGUgIT09IFwib2ZmXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NTdWdnZXN0cyhvZihbXSkpOyAvLyBFbXB0eSBhdXRvY29tcGxldGUgaWYgcGFyc2luZyBlcnJvcnNcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc1N1Z2dlc3RzKFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3VnZ2VzdHNPYnModmFsdWUsIGZpZWxkcylcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgIC8vIElmIGVtcHR5IGlucHV0LCByZXN0YXJ0IGF1dG9jb21wbGV0ZVxuICAgICAgICAgICAgdGhpcy5wYXJzZS5uZXh0KHt9KTsgLy8gcmVtb3ZlIGVycm9yIG1lc3NhZ2VzIGlmIGFueVxuICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvY2VzcyBzdWdnZXN0aW9ucyBvYnRhaW5lZCAoZnJvbSB3aGF0ZXZlciBtZWFuKTpcbiAgICAgKiAtIElmIGRhdGEgYXZhaWxhYmxlLCBmaWx0ZXIgb3V0IGZpZWxkc1xuICAgICAqIC0gdXBkYXRlIHRoZSBkcm9wZG93biBjb250ZW50XG4gICAgICogLSBTd2l0Y2ggYmV0d2VlbiBPUEVOIGFuZCBBQ1RJVkUgc3RhdGVzXG4gICAgICogLSBVc2UgY2hhbmdlRGV0ZWN0b3JSZWYgdG8gdXBkYXRlIGRpc3BsYXlcbiAgICAgKiBAcGFyYW0gb2JzIGFuIG9ic2VydmFibGUgb2YgQXV0b2NvbXBsZXRlSXRlbSBzdWdnZXN0aW9uc1xuICAgICAqL1xuICAgIHByb3RlY3RlZCBwcm9jZXNzU3VnZ2VzdHMob2JzOiBPYnNlcnZhYmxlPEF1dG9jb21wbGV0ZUl0ZW1bXT4pe1xuICAgICAgICBvYnMuc3Vic2NyaWJlKFxuICAgICAgICAgICAgc3VnZ2VzdHMgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2V0U3RhdGUoKSA9PT0gQXV0b2NvbXBsZXRlU3RhdGUuQUNUSVZFIHx8IHRoaXMuZ2V0U3RhdGUoKSA9PT0gQXV0b2NvbXBsZXRlU3RhdGUuT1BFTkVEKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bi51cGRhdGUodHJ1ZSwgc3VnZ2VzdHNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtLmNhdGVnb3J5ICE9PSBcIiRmaWVsZCRcIiB8fCAodGhpcy5maWVsZFNlYXJjaE1vZGUgIT09IFwib2ZmXCIgJiYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuaW5jbHVkZWRGaWVsZHMgJiYgdGhpcy5pbmNsdWRlZEZpZWxkcz8uaW5jbHVkZXMoaXRlbS5kaXNwbGF5KSB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIXRoaXMuaW5jbHVkZWRGaWVsZHMgJiYgIXRoaXMuZXhjbHVkZWRGaWVsZHM/LmluY2x1ZGVzKGl0ZW0uZGlzcGxheSkpKSkpICAvLyBGaWx0ZXIgb3V0IGZpZWxkcyBpZiBub3QgaW4gZmllbGRTZWFyY2ggbW9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighaXRlbS5sYWJlbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0uY2F0ZWdvcnkgPT09IFwiJGZpZWxkJFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmxhYmVsID0gXCJGaWVsZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5sYWJlbCA9IHRoaXMuYXBwU2VydmljZS5nZXRMYWJlbChpdGVtLmNhdGVnb3J5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duLnVwZGF0ZShmYWxzZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuZHJvcGRvd24uaGFzSXRlbXMgJiYgdGhpcy5nZXRTdGF0ZSgpID09PSBBdXRvY29tcGxldGVTdGF0ZS5BQ1RJVkUpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW4oKTsgICAgLy8gU3dpdGNoIGZyb20gQUNUSVZFIHRvIE9QRU5FRCAoaWYgbm90IGFscmVhZHkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoIXRoaXMuZHJvcGRvd24uaGFzSXRlbXMgJiYgdGhpcy5nZXRTdGF0ZSgpID09PSBBdXRvY29tcGxldGVTdGF0ZS5PUEVORUQpeyAgIC8vIE5vIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUoKTsgIC8vIFN3aXRjaCBmcm9tIE9QRU5FRCB0byBBQ1RJVkUgKGlmIG5vdCBhbHJlYWR5KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIHRoZSBxdWVyeSBmb3Igc3ludGF4IGVycm9ycyAoYWxzbyBhbGxvd3MgdG8gZGV0ZWN0IGZpZWxkIHNlYXJjaCBpZiBuZWVkZWQpLlxuICAgICAqIEZpcmVzIGEgcGFyc2UgZXZlbnQuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHBhcnNlUXVlcnkoKSA6IFBhcnNlUmVzdWx0IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldElucHV0VmFsdWUoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5hcHBTZXJ2aWNlLnBhcnNlRXhwcih2YWx1ZSwge2FsbG93RW1wdHlWYWx1ZXM6IHRydWV9KTtcbiAgICAgICAgY29uc3QgZXZlbnQgPSByZXN1bHQgaW5zdGFuY2VvZiBFeHByPyB7IHJlc3VsdDogcmVzdWx0IH0gOiB7IGVycm9yOiByZXN1bHQgfTtcbiAgICAgICAgdGhpcy5wYXJzZS5uZXh0KGV2ZW50KTtcbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIHVzZXIncyBrZXlib2FyZCBhY3Rpb25zIGluIHRoZSA8aW5wdXQ+LCBpbiBvcmRlciB0byBuYXZpZ2F0ZVxuICAgICAqIGFuZCBzZWxlY3QgdGhlIGF1dG9jb21wbGV0ZSBzdWdnZXN0aW9ucy5cbiAgICAgKiBPdmVycmlkZXMgdGhlIHBhcmVudCBrZXlkb3duIG1ldGhvZCwgYWRkcyB0aGUgbWFuYWdlbWVudCBvZiB0aGUgYmFja3NwYWNlIGtleVxuICAgICAqIHRvIHJlbW92ZSBmaWVsZCBzZWFyY2ggaXRlbXMuXG4gICAgICogQHBhcmFtIGV2ZW50IHRoZSBrZXlib2FyZFxuICAgICAqL1xuICAgIGtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcblxuICAgICAgICBjb25zdCBrZXlkb3duID0gc3VwZXIua2V5ZG93bihldmVudCk7XG5cbiAgICAgICAgaWYoa2V5ZG93biA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBJbiBmaWVsZGVkIHNlYXJjaCBtb2RlLCB3ZSBjYW4gcmVtb3ZlIHNlbGVjdGlvbnMgYnkgdHlwaW5nIDxiYWNrc3BhY2U+IHdoZW4gdGhlIGlucHV0IGlzIGVtcHR5XG4gICAgICAgICAgICBpZihldmVudC5rZXlDb2RlID09PSBLZXlzLmJhY2tzcGFjZSkge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuZmllbGRTZWFyY2hNb2RlID09PSBcInNlbGVjdHNcIiAmJiB0aGlzLmdldElucHV0VmFsdWUoKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWVsZFNlYXJjaEl0ZW1zLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYWNlaG9sZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmllbGRTZWFyY2hJdGVtc0NvbnRhaW5lcj8udXBkYXRlKHRoaXMuZmllbGRTZWFyY2hJdGVtcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGtleWRvd247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgPGlucHV0PidzIHBsYWNlaG9sZGVyIHRvIGF2b2lkIGRpc3BsYXlpbmcgc29tZXRoaW5nXG4gICAgICogd2hlbiB0aGVyZSBhcmUgZmllbGRTZWFyY2hJdGVtcyBkaXNwbGF5ZWQgdG8gdGhlIGxlZnQuXG4gICAgICovXG4gICAgdXBkYXRlUGxhY2Vob2xkZXIoKSB7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdGhpcy5maWVsZFNlYXJjaEl0ZW1zLmxlbmd0aCA+IDAgPyAnJyA6IHRoaXMucGxhY2Vob2xkZXI7XG4gICAgfVxufSJdfQ==