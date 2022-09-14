import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AutocompleteItem } from '../autocomplete.directive';
import { FieldSearchItemsContainer } from '../autocomplete-field-search.directive';
import * as i0 from "@angular/core";
export declare class BsFieldSearchItemsComponent implements FieldSearchItemsContainer {
    protected changeDetectorRef: ChangeDetectorRef;
    itemRemoved: EventEmitter<AutocompleteItem>;
    items: AutocompleteItem[];
    constructor(changeDetectorRef: ChangeDetectorRef);
    update(items: AutocompleteItem[]): void;
    removeItem(item: AutocompleteItem): void;
    static ɵfac: i0.ɵɵFactoryDef<BsFieldSearchItemsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsFieldSearchItemsComponent, "sq-field-search-items", never, {}, { "itemRemoved": "itemRemoved"; }, never, never>;
}
//# sourceMappingURL=field-search-items.component.d.ts.map