import { EventEmitter, SimpleChanges, ElementRef, OnChanges, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { AppService, Expr, ExprBuilder, ExprValueInfo } from "@sinequa/core/app-utils";
import { Autocomplete, AutocompleteItem } from './autocomplete.directive';
import { SuggestService } from './suggest.service';
import { UIService } from '@sinequa/components/utils';
import * as i0 from "@angular/core";
/**
 * Interface required to be implement by the component displaying
 * the fielded search items (basically the content of fieldSearchItems)
 */
export interface FieldSearchItemsContainer {
    /** Update the list of items displayed by the container */
    update(items: AutocompleteItem[]): void;
    /** Event triggered when the user removes an item from the container */
    itemRemoved: EventEmitter<AutocompleteItem>;
}
export interface ParseResult {
    result?: Expr;
    error?: string;
}
export declare class AutocompleteFieldSearch extends Autocomplete implements OnChanges, OnDestroy {
    protected exprBuilder: ExprBuilder;
    /**
     * "text" mode: fielded search is entirely managed as text in the <input> component
     * "selects" mode: fielded search stores the selected autocomplete items to create selections, while keeping a clean <input> content (better UI/UX but does not support operators like OR, NOT, and parentheses)
     */
    fieldSearchMode: "off" | "text" | "selects";
    /** Fields excluded from fielded search (searched as regular strings if selected) */
    excludedFields: string[];
    includedFields?: string[];
    /** Container displaying the fieldSearchItems (only needed if mode === "selects") */
    fieldSearchItemsContainer?: FieldSearchItemsContainer;
    /** Current selection expression needed to update the list of field search items if mode === "selects" */
    fieldSearchExpression?: string;
    /** Stores the selected fielded search items selected via Tab */
    readonly fieldSearchItems: AutocompleteItem[];
    parse: EventEmitter<ParseResult>;
    constructor(elementRef: ElementRef<any>, suggestService: SuggestService, appService: AppService, uiService: UIService, exprBuilder: ExprBuilder);
    /**
     * If the off input changes state, react accordingly
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void;
    private _fieldSearchSubscription;
    /**
     * Unsubscribe when destroying the component
     */
    ngOnDestroy(): void;
    /**
     * Insert the given autocomplete item into the current search input
     * at the right location
     * @param item
     */
    protected insertAutocompleteItem(item: AutocompleteItem): boolean;
    /**
     * Replaces the piece of expression (res) with a new value
     * in the input form
     * @param res The piece of expression parsed from the input content
     * @param value The new value
     */
    protected replaceValueInForm(res: ExprValueInfo, value: string): void;
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
     * Returns an expression (Expr) for the fielded search items
     */
    getFieldSearchExpression(): string | undefined;
    /**
     * Transforms a list of AutocompleteItems into an expression
     * @param items list of AutocompleteItems
     */
    protected itemsToExpr(items: AutocompleteItem[]): string | undefined;
    /**
     * Transforms an expression into a list of AutocompleteItems
     * @param expr an expression
     */
    protected exprToItem(expr: Expr): AutocompleteItem;
    /**
     * Takes the text from the <input> element and parse it to
     * determine what type of suggestion to request from the server.
     * The suggestions are then fetched by getSuggestsObs() and processed
     * by processSuggests().
     */
    protected getSuggests(): void;
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
     * Parse the query for syntax errors (also allows to detect field search if needed).
     * Fires a parse event.
     */
    protected parseQuery(): ParseResult;
    /**
     * Listen to user's keyboard actions in the <input>, in order to navigate
     * and select the autocomplete suggestions.
     * Overrides the parent keydown method, adds the management of the backspace key
     * to remove field search items.
     * @param event the keyboard
     */
    keydown(event: KeyboardEvent): false | undefined;
    /**
     * Updates the <input>'s placeholder to avoid displaying something
     * when there are fieldSearchItems displayed to the left.
     */
    updatePlaceholder(): void;
    static ɵfac: i0.ɵɵFactoryDef<AutocompleteFieldSearch, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<AutocompleteFieldSearch, "[sqAutocompleteFieldSearch]", never, { "fieldSearchMode": "fieldSearchMode"; "excludedFields": "excludedFields"; "includedFields": "includedFields"; "fieldSearchItemsContainer": "fieldSearchItemsContainer"; "fieldSearchExpression": "fieldSearchExpression"; }, { "parse": "parse"; }, never>;
}
//# sourceMappingURL=autocomplete-field-search.directive.d.ts.map