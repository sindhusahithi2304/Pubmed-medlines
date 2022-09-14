import { ElementRef, EventEmitter, OnInit } from "@angular/core";
import { Autocomplete, SuggestService, AutocompleteItem } from "@sinequa/components/autocomplete";
import { UIService } from "@sinequa/components/utils";
import { AppService } from "@sinequa/core/app-utils";
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class BsAdvancedFormAutocomplete extends Autocomplete implements OnInit {
    UpdateItem: EventEmitter<AutocompleteItem | undefined>;
    field: string;
    constructor(elementRef: ElementRef, suggestService: SuggestService, appService: AppService, uiService: UIService);
    /**
     * The ngOnInit() method from the original directive is overriden
     * On initialization, we listen to the autocomplete component for
     * selection events
     */
    ngOnInit(): void;
    protected getSuggests(): void;
    protected processSuggests(obs: Observable<AutocompleteItem[]>): void;
    protected setAutocompleteItem(item: AutocompleteItem): boolean;
    /**
     * Listen to blur events on the <input> host and overrides the autocomplete blur events
     */
    blur(event: FocusEvent): void;
    /**
     * Overrides the parent inputChanged method, so that it is possible to reinitialize the autocomplete
     * @param event
     */
    inputChanged(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDef<BsAdvancedFormAutocomplete, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<BsAdvancedFormAutocomplete, "[sqAdvancedFormAutocomplete]", never, { "field": "field"; }, { "UpdateItem": "UpdateItem"; }, never>;
}
//# sourceMappingURL=advanced-form-autocomplete.directive.d.ts.map