import { TemplateRef, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { AutocompleteItem, AutocompleteComponent } from "../../autocomplete.directive";
import * as i0 from "@angular/core";
export declare class BsAutocompleteList implements AutocompleteComponent {
    private changeDetectorRef;
    /**
     * Template for the display of AutocompleteItem items, passed by transclusion
     */
    itemTpl: TemplateRef<any>;
    /**
     * Optional footer template, passed by transclusion
     */
    footerTpl: TemplateRef<any>;
    /**
     * Event emitter for clicks on an autocomplete item
     */
    clicked: EventEmitter<AutocompleteItem>;
    _active: boolean;
    _items: AutocompleteItem[] | undefined;
    _cursor: number;
    constructor(changeDetectorRef: ChangeDetectorRef);
    /**
     * Update the data and state of this component
     * @param active whether the component should be displayed
     * @param items The list of items to display
     */
    update(active: boolean, items?: AutocompleteItem[]): void;
    /**
     * Whether there are any item to display
     */
    get hasItems(): boolean;
    /**
     * Returns the currently selected item, if any
     */
    get selectedValue(): AutocompleteItem | undefined;
    /**
     * Select the next item in the list and returns it
     */
    selectNext(): AutocompleteItem | undefined;
    /**
     * Select the previous item in the list and returns it
     */
    selectPrevious(): AutocompleteItem | undefined;
    /**
     * Test whether an item is selected
     * @param item
     * @param i
     */
    _isSelected(item: AutocompleteItem, i: number): boolean;
    /**
     * Listen to click events and emits events
     * @param item
     * @param event
     */
    _itemClicked(item: AutocompleteItem, event: any): boolean;
    /**
     * This prevents the focus to be removed from the <input>, which clauses the dropdown
     */
    _mouseDown(event: any): void;
    static ɵfac: i0.ɵɵFactoryDef<BsAutocompleteList, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsAutocompleteList, "sq-autocomplete-list", never, {}, { "clicked": "clicked"; }, ["itemTpl", "footerTpl"], never>;
}
//# sourceMappingURL=autocomplete-list.d.ts.map