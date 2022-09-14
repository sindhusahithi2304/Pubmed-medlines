import { ɵɵelementContainer, ɵɵelementContainerStart, ɵɵtemplate, ɵɵelementContainerEnd, ɵɵnextContext, ɵɵadvance, ɵɵproperty, ɵɵpureFunction1, ɵɵgetCurrentView, ɵɵelementStart, ɵɵlistener, ɵɵrestoreView, ɵɵelementEnd, ɵɵpureFunction2, EventEmitter, ɵɵdirectiveInject, ChangeDetectorRef, ɵɵdefineComponent, ɵɵcontentQuery, ɵɵqueryRefresh, ɵɵloadQuery, ɵsetClassMetadata, Component, ContentChild, Output, ɵɵtext, ɵɵtextInterpolate1, ɵɵinject, ɵɵdefineInjectable, Injectable, ElementRef, ɵɵdefineDirective, ɵɵattribute, ɵɵNgOnChangesFeature, Directive, Input, HostBinding, HostListener, ɵɵInheritDefinitionFeature, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { NgIf, NgForOf, NgClass, NgTemplateOutlet, CommonModule } from '@angular/common';
import { ScrollIntoView, UIService, UtilsModule } from '@sinequa/components/utils';
import { Utils, Keys } from '@sinequa/core/base';
import { __awaiter } from 'tslib';
import { of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { AppService, Expr, ExprParser, ExprBuilder } from '@sinequa/core/app-utils';
import { SuggestQueryWebService, SuggestFieldWebService } from '@sinequa/core/web-services';

const _c0 = ["itemTpl"];
const _c1 = ["footerTpl"];
function BsAutocompleteList_div_0_a_2_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
const _c2 = function (a0) { return { $implicit: a0 }; };
function BsAutocompleteList_div_0_a_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsAutocompleteList_div_0_a_2_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 7);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r3 = ɵɵnextContext().$implicit;
    const ctx_r5 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r5.itemTpl)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c2, item_r3));
} }
const _c3 = function (a0) { return { "list-group-item-primary": a0 }; };
const _c4 = function (a0, a1) { return { active: a0, first: a1 }; };
function BsAutocompleteList_div_0_a_2_Template(rf, ctx) { if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 5);
    ɵɵlistener("click", function BsAutocompleteList_div_0_a_2_Template_a_click_0_listener($event) { ɵɵrestoreView(_r9); const item_r3 = ctx.$implicit; const ctx_r8 = ɵɵnextContext(2); return ctx_r8._itemClicked(item_r3, $event); });
    ɵɵtemplate(1, BsAutocompleteList_div_0_a_2_ng_container_1_Template, 2, 4, "ng-container", 6);
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpureFunction1(3, _c3, ctx_r1._isSelected(item_r3, i_r4)))("sqScrollIntoView", ɵɵpureFunction2(5, _c4, ctx_r1._isSelected(item_r3, i_r4), i_r4 === 0));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r1.itemTpl);
} }
function BsAutocompleteList_div_0_div_3_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
function BsAutocompleteList_div_0_div_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 8);
    ɵɵtemplate(1, BsAutocompleteList_div_0_div_3_ng_container_1_Template, 1, 0, "ng-container", 7);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r2.footerTpl)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c2, ctx_r2._items));
} }
function BsAutocompleteList_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r12 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 1);
    ɵɵlistener("mousedown", function BsAutocompleteList_div_0_Template_div_mousedown_0_listener($event) { ɵɵrestoreView(_r12); const ctx_r11 = ɵɵnextContext(); return ctx_r11._mouseDown($event); });
    ɵɵelementStart(1, "div", 2);
    ɵɵtemplate(2, BsAutocompleteList_div_0_a_2_Template, 2, 8, "a", 3);
    ɵɵelementEnd();
    ɵɵtemplate(3, BsAutocompleteList_div_0_div_3_Template, 2, 4, "div", 4);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r0._items);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.footerTpl);
} }
class BsAutocompleteList {
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
BsAutocompleteList.ɵfac = function BsAutocompleteList_Factory(t) { return new (t || BsAutocompleteList)(ɵɵdirectiveInject(ChangeDetectorRef)); };
BsAutocompleteList.ɵcmp = ɵɵdefineComponent({ type: BsAutocompleteList, selectors: [["sq-autocomplete-list"]], contentQueries: function BsAutocompleteList_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, true);
        ɵɵcontentQuery(dirIndex, _c1, true);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemTpl = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerTpl = _t.first);
    } }, outputs: { clicked: "clicked" }, decls: 1, vars: 1, consts: [["class", "sq-autocomplete-list card position-absolute", 3, "mousedown", 4, "ngIf"], [1, "sq-autocomplete-list", "card", "position-absolute", 3, "mousedown"], [1, "list-group", "list-group-flush"], ["href", "#", "class", "list-group-item list-group-item-action p-0 border-0", 3, "ngClass", "sqScrollIntoView", "click", 4, "ngFor", "ngForOf"], ["class", "card-footer", 4, "ngIf"], ["href", "#", 1, "list-group-item", "list-group-item-action", "p-0", "border-0", 3, "ngClass", "sqScrollIntoView", "click"], [4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "card-footer"]], template: function BsAutocompleteList_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsAutocompleteList_div_0_Template, 4, 2, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.hasItems);
    } }, directives: [NgIf, NgForOf, NgClass, ScrollIntoView, NgTemplateOutlet], styles: [".sq-autocomplete-list[_ngcontent-%COMP%]{box-shadow:0 2px 5px 1px #d3d3d3;width:100%;z-index:10}.list-group[_ngcontent-%COMP%]{max-height:500px;overflow:auto}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsAutocompleteList, [{
        type: Component,
        args: [{
                selector: "sq-autocomplete-list",
                templateUrl: "./autocomplete-list.html",
                styleUrls: ["./autocomplete-list.css"]
            }]
    }], function () { return [{ type: ChangeDetectorRef }]; }, { itemTpl: [{
            type: ContentChild,
            args: ["itemTpl", { static: false }]
        }], footerTpl: [{
            type: ContentChild,
            args: ["footerTpl", { static: false }]
        }], clicked: [{
            type: Output
        }] }); })();

function BsFieldSearchItemsComponent_span_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 1);
    ɵɵtext(1);
    ɵɵelementStart(2, "span", 2);
    ɵɵlistener("click", function BsFieldSearchItemsComponent_span_0_Template_span_click_2_listener() { ɵɵrestoreView(_r3); const item_r1 = ctx.$implicit; const ctx_r2 = ɵɵnextContext(); return ctx_r2.removeItem(item_r1); });
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    ɵɵproperty("ngClass", item_r1.category);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", item_r1.display, " ");
} }
class BsFieldSearchItemsComponent {
    constructor(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.itemRemoved = new EventEmitter();
        this.items = [];
    }
    update(items) {
        this.items = items;
        this.changeDetectorRef.markForCheck();
    }
    removeItem(item) {
        this.itemRemoved.next(item);
        this.changeDetectorRef.markForCheck();
    }
}
BsFieldSearchItemsComponent.ɵfac = function BsFieldSearchItemsComponent_Factory(t) { return new (t || BsFieldSearchItemsComponent)(ɵɵdirectiveInject(ChangeDetectorRef)); };
BsFieldSearchItemsComponent.ɵcmp = ɵɵdefineComponent({ type: BsFieldSearchItemsComponent, selectors: [["sq-field-search-items"]], outputs: { itemRemoved: "itemRemoved" }, decls: 1, vars: 1, consts: [["class", "badge badge-pill badge-info align-self-center mr-1", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "badge", "badge-pill", "badge-info", "align-self-center", "mr-1", 3, "ngClass"], [1, "fas", "fa-times-circle", "clickable", 3, "click"]], template: function BsFieldSearchItemsComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsFieldSearchItemsComponent_span_0_Template, 3, 2, "span", 0);
    } if (rf & 2) {
        ɵɵproperty("ngForOf", ctx.items);
    } }, directives: [NgForOf, NgClass], styles: ["[_nghost-%COMP%] {\n    display: flex;\n}\n.clickable[_ngcontent-%COMP%] {\n    cursor: pointer;\n}\n.clickable[_ngcontent-%COMP%]:hover {\n    opacity: 85%;\n}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsFieldSearchItemsComponent, [{
        type: Component,
        args: [{
                selector: "sq-field-search-items",
                template: `
<span *ngFor="let item of items" class="badge badge-pill badge-info align-self-center mr-1" [ngClass]="item.category">
    {{item.display}} <span class="fas fa-times-circle clickable" (click)="removeItem(item)"></span>
</span>
`,
                styles: [`
:host {
    display: flex;
}
.clickable {
    cursor: pointer;
}
.clickable:hover {
    opacity: 85%;
}
`]
            }]
    }], function () { return [{ type: ChangeDetectorRef }]; }, { itemRemoved: [{
            type: Output
        }] }); })();

class SuggestService {
    constructor(suggestQueryWebService, suggestFieldWebService, appService) {
        this.suggestQueryWebService = suggestQueryWebService;
        this.suggestFieldWebService = suggestFieldWebService;
        this.appService = appService;
        this.fieldCategory = "$field$";
    }
    addFields(text, suggests) {
        if (text.includes(" ")) {
            return;
        }
        for (const field of this.appService.fields) {
            if (Utils.startsWith(field, text)) {
                suggests.unshift({
                    category: this.fieldCategory,
                    display: field
                });
            }
        }
    }
    get(suggestQuery, text, fields, query) {
        if (!this.appService.ccquery) {
            return of([]);
        }
        const observable = this.suggestQueryWebService.get(suggestQuery, text, this.appService.ccquery.name, fields);
        return observable.pipe(flatMap(suggests => {
            if (!fields) {
                if (!suggests) {
                    suggests = [];
                }
                this.addFields(text, suggests);
            }
            else {
                if (!suggests || suggests.length === 0) {
                    const _fields = Utils.isArray(fields) ? fields : [fields];
                    fields = [];
                    for (const field of _fields) {
                        const column = this.appService.getColumn(field);
                        if (!!column && (column.eType === 15 /* csv */ || AppService.isScalar(column))) {
                            fields.push(field);
                        }
                    }
                    if (fields.length > 0) {
                        return this.suggestFieldWebService.get(text, fields, query).pipe(map((suggests) => {
                            suggests.forEach(value => value.display = Utils.toSqlValue(value.display)); // because dates get automatically converted by the interceptor
                            return suggests;
                        }));
                    }
                }
            }
            return of(suggests);
        }));
    }
    /**
     * Search for the input text in a list of objects and return autocomplete items asynchronously
     * @param query The text to search for
     * @param data The list of objects
     * @param primaryText A function that returns the primary text input given the object
     * @param secondaryText An (optional) function that returns a list of secondary text inputs given the object
     */
    searchData(category, query, data, primaryText, secondaryText, label) {
        return __awaiter(this, void 0, void 0, function* () {
            return data
                .map(obj => SuggestService.findMatch(primaryText(obj), query, !!secondaryText ? secondaryText(obj) : [], obj)) // Look for matches in all saved queries
                .filter(item => !!item) // Keep only the matches
                .sort((a, b) => b.score - a.score) // Sort by decreasing score
                .map(item => {
                item = item;
                return {
                    display: item.display,
                    displayHtml: item.displayHtml,
                    category,
                    label: label || category,
                    data: item.data,
                    score: item.score
                };
            });
        });
    }
    /**
     * Searches for the query string inside a given text. Returns a match object containing:
     * - a score proportional to the number and quality of matches
     * - the text formatted as HTML with the query found in the text
     * @param text The text to search
     * @param query The string to search for
     * @param secondaryText Secondary fields to search input, with less importance than the primary field
     * @param data A data object to be included in the match object (for convenience mostly)
     */
    static findMatch(text, query, secondaryText, data) {
        if (!text || !query) {
            return undefined;
        }
        // pass text and query in lower case and no accent to make search case insensitive
        const textLower = Utils.removeAccents(text.toLowerCase());
        query = Utils.removeAccents(query.toLowerCase());
        let i = 0;
        const matches = [];
        let score = 0;
        // Compute score of the match
        i = textLower.indexOf(query);
        while (i !== -1) { // While there's a match
            matches.push(i);
            if (i === 0) { // Start of the text
                score += 4;
            }
            else if (textLower[i - 1] === " ") { // Start of a word
                score += 2;
            }
            else {
                score += 1; // Middle of a word
            }
            i = textLower.indexOf(query, i + query.length);
        }
        // Format HTML display
        let html = text;
        for (let j = matches.length - 1; j >= 0; j--) { // decreasing order so the indices remain valid
            i = matches[j];
            html = html.slice(0, i).concat("<strong>", html.slice(i, i + query.length), "</strong>", html.slice(i + query.length));
        }
        // Secondary text
        if (secondaryText) {
            secondaryText
                .map(t => this.findMatch(t, query)) // Search each secondary text for matches
                .filter(item => !!item) // Keep only the matches
                .sort((a, b) => b.score - a.score) // Sort by decreasing score
                .forEach(match => {
                match = match;
                score += match.score / 2; // Secondary matches added to the score, but count half
                html += " <small>" + match.displayHtml + "</small>"; // Concatenate secondary match html to the main html
            });
        }
        if (score > 0) {
            return {
                display: text,
                displayHtml: html,
                score: score,
                data: data
            };
        }
        return undefined;
    }
}
SuggestService.ɵfac = function SuggestService_Factory(t) { return new (t || SuggestService)(ɵɵinject(SuggestQueryWebService), ɵɵinject(SuggestFieldWebService), ɵɵinject(AppService)); };
SuggestService.ɵprov = ɵɵdefineInjectable({ token: SuggestService, factory: SuggestService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SuggestService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: SuggestQueryWebService }, { type: SuggestFieldWebService }, { type: AppService }]; }, null); })();

/**
 * States in which the autocomplete component can be
 */
var AutocompleteState;
(function (AutocompleteState) {
    AutocompleteState["OFF"] = "OFF";
    AutocompleteState["INIT"] = "INIT";
    AutocompleteState["START"] = "START";
    AutocompleteState["ACTIVE"] = "ACTIVE";
    AutocompleteState["OPENED"] = "OPENED";
    AutocompleteState["SELECTED"] = "SELECTED"; // Input is focused, an input from the dropdown was selected
})(AutocompleteState || (AutocompleteState = {}));
class Autocomplete {
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
Autocomplete.ɵfac = function Autocomplete_Factory(t) { return new (t || Autocomplete)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(SuggestService), ɵɵdirectiveInject(AppService), ɵɵdirectiveInject(UIService)); };
Autocomplete.ɵdir = ɵɵdefineDirective({ type: Autocomplete, selectors: [["", "sqAutocomplete", ""]], hostVars: 1, hostBindings: function Autocomplete_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function Autocomplete_click_HostBindingHandler() { return ctx.click(); })("touchstart", function Autocomplete_touchstart_HostBindingHandler() { return ctx.touchstart(); })("focus", function Autocomplete_focus_HostBindingHandler() { return ctx.focus(); })("blur", function Autocomplete_blur_HostBindingHandler($event) { return ctx.blur($event); })("input", function Autocomplete_input_HostBindingHandler($event) { return ctx.inputChanged($event); })("keydown", function Autocomplete_keydown_HostBindingHandler($event) { return ctx.keydown($event); });
    } if (rf & 2) {
        ɵɵattribute("placeholder", ctx._placeholder);
    } }, inputs: { dropdown: "dropdown", off: "off", suggestDelay: "suggestDelay", suggestQuery: "suggestQuery", placeholder: "placeholder" }, outputs: { stateChange: "stateChange", submit: "submit" }, features: [ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(Autocomplete, [{
        type: Directive,
        args: [{
                selector: "[sqAutocomplete]"
            }]
    }], function () { return [{ type: ElementRef }, { type: SuggestService }, { type: AppService }, { type: UIService }]; }, { dropdown: [{
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

class AutocompleteFieldSearch extends Autocomplete {
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
AutocompleteFieldSearch.ɵfac = function AutocompleteFieldSearch_Factory(t) { return new (t || AutocompleteFieldSearch)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(SuggestService), ɵɵdirectiveInject(AppService), ɵɵdirectiveInject(UIService), ɵɵdirectiveInject(ExprBuilder)); };
AutocompleteFieldSearch.ɵdir = ɵɵdefineDirective({ type: AutocompleteFieldSearch, selectors: [["", "sqAutocompleteFieldSearch", ""]], inputs: { fieldSearchMode: "fieldSearchMode", excludedFields: "excludedFields", includedFields: "includedFields", fieldSearchItemsContainer: "fieldSearchItemsContainer", fieldSearchExpression: "fieldSearchExpression" }, outputs: { parse: "parse" }, features: [ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AutocompleteFieldSearch, [{
        type: Directive,
        args: [{
                selector: "[sqAutocompleteFieldSearch]"
            }]
    }], function () { return [{ type: ElementRef }, { type: SuggestService }, { type: AppService }, { type: UIService }, { type: ExprBuilder }]; }, { fieldSearchMode: [{
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

class BsAutocompleteModule {
}
BsAutocompleteModule.ɵmod = ɵɵdefineNgModule({ type: BsAutocompleteModule });
BsAutocompleteModule.ɵinj = ɵɵdefineInjector({ factory: function BsAutocompleteModule_Factory(t) { return new (t || BsAutocompleteModule)(); }, imports: [[
            CommonModule,
            UtilsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BsAutocompleteModule, { declarations: [BsAutocompleteList, BsFieldSearchItemsComponent, Autocomplete, AutocompleteFieldSearch], imports: [CommonModule,
        UtilsModule], exports: [BsAutocompleteList, BsFieldSearchItemsComponent, Autocomplete, AutocompleteFieldSearch] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsAutocompleteModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    UtilsModule
                ],
                declarations: [
                    BsAutocompleteList, BsFieldSearchItemsComponent, Autocomplete, AutocompleteFieldSearch
                ],
                exports: [
                    BsAutocompleteList, BsFieldSearchItemsComponent, Autocomplete, AutocompleteFieldSearch
                ]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { Autocomplete, AutocompleteFieldSearch, AutocompleteState, BsAutocompleteList, BsAutocompleteModule, BsFieldSearchItemsComponent, SuggestService };
//# sourceMappingURL=sinequa-components-autocomplete.js.map
