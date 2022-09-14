import { OnChanges, ElementRef, OnDestroy } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";
import { AutocompleteItem } from "@sinequa/components/autocomplete";
import { AppService } from '@sinequa/core/app-utils';
import * as i0 from "@angular/core";
/**
 * Component representing a text input that accepts multiple entries.
 * This component also performs value validation on each entry.
 *
 */
export declare class BsAdvancedFormMultiInput implements OnChanges, OnDestroy {
    private elementRef;
    appService: AppService;
    form: FormGroup;
    field: string;
    suggestQuery: string;
    label: string;
    items: AutocompleteItem[]; /** List of items already existing in the advanced search */
    private _valueChangesSubscription;
    control: AbstractControl | null;
    constructor(elementRef: ElementRef, appService: AppService);
    ngOnChanges(): void;
    ngOnDestroy(): void;
    removeItem(item: AutocompleteItem): void;
    onItemsChanged(items: AutocompleteItem[]): void;
    keydown(event: KeyboardEvent): false | undefined;
    keypress(event: KeyboardEvent): false | undefined;
    private _updateControl;
    private _getDropdownItem;
    static ɵfac: i0.ɵɵFactoryDef<BsAdvancedFormMultiInput, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsAdvancedFormMultiInput, "sq-advanced-form-multi-input", never, { "form": "form"; "field": "field"; "suggestQuery": "suggestQuery"; "label": "label"; }, {}, never, never>;
}
//# sourceMappingURL=advanced-form-multi-input.d.ts.map