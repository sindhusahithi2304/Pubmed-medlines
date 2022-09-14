import { EventEmitter } from "@angular/core";
import { AutocompleteItem } from "@sinequa/components/autocomplete";
import { BsAdvancedFormAutocomplete } from "../advanced-form-autocomplete.directive";
import * as i0 from "@angular/core";
export declare class BsAdvancedFormAutocompleteMultiInput extends BsAdvancedFormAutocomplete {
    /** Event synchronizing the list of search terms in the parent component */
    itemsUpdate: EventEmitter<AutocompleteItem[]>;
    /** Stores the selected search terms selected via Tab */
    items: AutocompleteItem[];
    /**
     * The setAutocompleteItem() method from the original directive is overriden to
     * Sets the content of the <input> based on the given
     * Autocomplete Item.
     * @returns false since we don't need trigger search at this point of time
     */
    protected setAutocompleteItem(item: AutocompleteItem): boolean;
    /**
     * Listen to user's keyboard actions in the <input>, in order to navigate
     * and select the autocomplete suggestions.
     * Overrides the parent keydown method, adds the management of the backspace key
     * to remove items, enhance the enter key to support adding new items.
     * @param event the keyboard
     */
    keydown(event: KeyboardEvent): false | undefined;
    /**
     * Listens to blur events (out of focus) on the <input> host and overrides the parent blur events
     */
    blur(event: FocusEvent): void;
    private _manageSetAutocompleteItem;
    static ɵfac: i0.ɵɵFactoryDef<BsAdvancedFormAutocompleteMultiInput, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<BsAdvancedFormAutocompleteMultiInput, "[sqAdvancedFormAutocompleteMultiInput]", never, { "items": "items"; }, { "itemsUpdate": "itemsUpdate"; }, never>;
}
//# sourceMappingURL=advanced-form-autocomplete-multi-input.directive.d.ts.map