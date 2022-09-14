import { ElementRef, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { AutocompleteItem } from "@sinequa/components/autocomplete";
import * as i0 from "@angular/core";
/**
 * Component containing a form and autocomplete to search
 * through the list labels according to a specific type (public/private) and select one(s) of them
 *
 * The component can be used as custom component in the Action
 * menu's modals.
 */
export declare class BsLabelsAutocompleteComponent implements OnChanges {
    private elementRef;
    /** Event synchronizing the list of selected labels and label's type in the parent component */
    labelsUpdate: EventEmitter<string[]>;
    public: boolean; /** Whether labels are public/private */
    disableAutocomplete: boolean;
    allowNewLabels: boolean; /** Whether enable adding new labels or not */
    allowManagePublicLabels: boolean; /** Define the right of adding new labels */
    initLabels: string[]; /** Initial labels to be displayed in the labelsAutocomplete input*/
    labelsItems: AutocompleteItem[]; /** List of assigned labels to selected record(s) */
    constructor(elementRef: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    removeItem(item: AutocompleteItem): void;
    onLabelsItemsChanged(labelsItems: AutocompleteItem[]): void;
    private getDropdownItem;
    keydown(event: KeyboardEvent): false | undefined;
    keypress(event: KeyboardEvent): false | undefined;
    static ɵfac: i0.ɵɵFactoryDef<BsLabelsAutocompleteComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsLabelsAutocompleteComponent, "sq-labels-autocomplete", never, { "public": "public"; "disableAutocomplete": "disableAutocomplete"; "allowNewLabels": "allowNewLabels"; "allowManagePublicLabels": "allowManagePublicLabels"; "initLabels": "initLabels"; }, { "labelsUpdate": "labelsUpdate"; }, never, never>;
}
//# sourceMappingURL=labels-autocomplete.component.d.ts.map