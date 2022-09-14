import { ElementRef, OnInit, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { AppService } from "@sinequa/core/app-utils";
import { SuggestService } from "./suggest.service";
import { UIService } from "@sinequa/components/utils";
import * as i0 from "@angular/core";
/**
 * Minimal interface for autocomplete items (note that the Suggestion
 * objects returned by the Suggestion service implement naturally this
 * interface)
 */
export interface AutocompleteItem {
    display: string;
    normalized?: string;
    category: string;
    label?: string;
}
/**
 * Interface required to be implemented by the dropdown components
 * binded to this autocomplete directive.
 * The component is responsible for displaying a list of items
 * and signaling back if a component was clicked. The component must
 * also manage navigation through the list (next/previous and selectedValue).
 */
export interface AutocompleteComponent {
    /**
     * Whether there are any item to display
     */
    hasItems: boolean;
    /**
     * Event emitter for clicks on an autocomplete item
     */
    clicked: EventEmitter<AutocompleteItem>;
    /**
     * Returns the currently selected item, if any
     */
    selectedValue: AutocompleteItem | undefined;
    /**
     * Update the data and state of this component
     * @param active whether the component should be displayed
     * @param items The list of items to display
     */
    update(active: boolean, items?: AutocompleteItem[]): void;
    /**
     * Select the next item in the list and returns it
     */
    selectNext(): AutocompleteItem | undefined;
    /**
     * Select the previous item in the list and returns it
     */
    selectPrevious(): AutocompleteItem | undefined;
}
/**
 * States in which the autocomplete component can be
 */
export declare enum AutocompleteState {
    OFF = "OFF",
    INIT = "INIT",
    START = "START",
    ACTIVE = "ACTIVE",
    OPENED = "OPENED",
    SELECTED = "SELECTED"
}
export declare class Autocomplete implements OnInit, OnChanges, OnDestroy {
    protected suggestService: SuggestService;
    protected appService: AppService;
    protected uiService: UIService;
    /** Reference to the AutocompleteComponent that displays the autocomplete items */
    dropdown: AutocompleteComponent;
    /** Whether the autocomplete should be active or not */
    off: boolean;
    /** Debounce delay between autocomplete queries */
    suggestDelay: number;
    /** Name of the Suggest Query to be used */
    suggestQuery: string;
    /** Custom placeholder */
    placeholder: string;
    _placeholder: any;
    stateChange: EventEmitter<AutocompleteState>;
    submit: EventEmitter<void>;
    private _state;
    protected readonly inputElement: HTMLInputElement;
    constructor(elementRef: ElementRef, suggestService: SuggestService, appService: AppService, uiService: UIService);
    /**
     * On initialization, we listen to the autocomplete component for
     * selection events
     */
    ngOnInit(): void;
    /**
     * If the off input changes state, react accordingly
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void;
    protected _dropdownSubscription: Subscription;
    /**
     * Unsubscribe when destroying the component
     */
    ngOnDestroy(): void;
    /**
     * Return the current state of the autocomplete
     */
    getState(): AutocompleteState;
    /**
     * Set the current state of the autocomplete
     */
    protected setState(state: AutocompleteState): void;
    /**
     * Get the current text value of the HTML <input>
     * to which this directive is attached
     */
    protected getInputValue(): string;
    /**
     * Set the current text value of the HTML <input>
     * to which this directive is attached
     */
    protected setInputValue(value: string): void;
    /**
     * Sets the content of the <input> based on the given
     * Autocomplete Item (various implementations are possible,
     * depending on the item content and nature).
     * This would be the right method to override to implement
     * fielded search autocomplete.
     * @returns true if this autocomplete item should be searched
     */
    protected setAutocompleteItem(item: AutocompleteItem): boolean;
    /**
     * INIT state (Input is not focused, dropdown is closed)
     */
    protected init(): void;
    /**
     * START state (Input is focused, no text typed in, dropdown is closed)
     */
    protected start(): void;
    /**
     * START state and if the <input> has content, immediately switch to ACTIVE
     */
    protected startOrActive(): void;
    /**
     * ACTIVE state (Input is focused, text is typed, suggests are being queried, dropdown is closed)
     */
    protected active(): void;
    /**
     * Select the given autocomplete suggestion for search
     * @param submit if, true also trigger a submit
     * @param item a specific item to submit
     */
    protected select(item: AutocompleteItem, submit?: boolean): void;
    /**
     * Switch to OPENED state (from ACTIVE only)
     */
    protected open(): void;
    /**
     * Request suggestions from the server, and update the dropdown contents
     * and autocomplete state asynchronously.
     * Override this method for a synchronous implementation.
     */
    protected suggest(): void;
    /**
     * Actually makes the API call to the suggestService to retrieve suggestions
     * and process them.
     */
    protected getSuggests(): void;
    /**
     * Returns an observable of Suggestions, given some input text
     * @param value input text for which to return suggestions
     */
    protected getSuggestsObs(value: string, fields?: string[]): Observable<AutocompleteItem[]>;
    /**
     * Process suggestions obtained (from whatever mean):
     * - If data available, filter out fields
     * - update the dropdown content
     * - Switch between OPEN and ACTIVE states
     * - Use changeDetectorRef to update display
     * @param obs an observable of AutocompleteItem suggestions
     */
    protected processSuggests(obs: Observable<AutocompleteItem[]>): void;
    /**
     * Use the suggest service to retrieve suggestions given the input text.
     * The suggest (autocomplete) query is debounded to avoid flooding the server.
     */
    private readonly debounceSuggest;
    /**
     * Returns the caret position within the input
     */
    protected getInputPosition(): number;
    /**
     * The following are event listeners applied to the <input> host component
     * onto which this directive is applied.
     * The events affect the state of the autocomplete, which triggers
     * various actions (call to suggest API, etc.).
     */
    /**
     * Listens to click events on the <input> host
     */
    click(): void;
    /**
     * Listens to touchstart events (mobile clicks) on the <input> host
     */
    touchstart(): void;
    /**
     * Listens to focus events on the <input> host
     */
    focus(): void;
    /**
     * Listens to blur events (out of focus) on the <input> host
     */
    blur(event: FocusEvent): void;
    /**
     * Listen to any change in the <input> content and react
     * according to the current state of the autocomplete
     * @param event
     */
    inputChanged(event: Event): void;
    /**
     * Listen to user's keyboard actions in the <input>, in order to navigate
     * and select the autocomplete suggestions.
     * @param event the keyboard
     */
    keydown(event: KeyboardEvent): false | undefined;
    static ɵfac: i0.ɵɵFactoryDef<Autocomplete, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<Autocomplete, "[sqAutocomplete]", never, { "dropdown": "dropdown"; "off": "off"; "suggestDelay": "suggestDelay"; "suggestQuery": "suggestQuery"; "placeholder": "placeholder"; }, { "stateChange": "stateChange"; "submit": "submit"; }, never>;
}
//# sourceMappingURL=autocomplete.directive.d.ts.map