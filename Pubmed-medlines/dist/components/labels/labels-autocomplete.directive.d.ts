import { ElementRef, EventEmitter, SimpleChanges, OnInit, OnChanges } from "@angular/core";
import { Autocomplete, SuggestService, AutocompleteItem } from "@sinequa/components/autocomplete";
import { AppService } from "@sinequa/core/app-utils";
import { UIService } from "@sinequa/components/utils";
import { LabelsWebService } from "@sinequa/core/web-services";
import { LabelsService } from "./labels.service";
import * as i0 from "@angular/core";
export declare class LabelsAutocomplete extends Autocomplete implements OnInit, OnChanges {
    private labelsWebService;
    private labelsService;
    /** Event synchronizing the list of selected labels in the parent component */
    itemsUpdate: EventEmitter<AutocompleteItem[]>;
    /** Whether the labels are public or not */
    public: boolean;
    /** Enable adding new labels in labelsItems or not */
    allowNewLabels: boolean;
    /** Define the right of adding new labels in labelsItems or not */
    allowManagePublicLabels: boolean;
    /** Stores the selected labels items selected via Tab */
    labelsItems: AutocompleteItem[];
    /** Stores the suggestions retrieved by th server in order to perform checks on key.enter events */
    private _suggestions;
    constructor(elementRef: ElementRef, suggestService: SuggestService, appService: AppService, uiService: UIService, labelsWebService: LabelsWebService, labelsService: LabelsService);
    /**
     * The ngOnInit() method from the original directive is overriden
     * On initialization, we listen to the autocomplete component for
     * selection events
     */
    ngOnInit(): void;
    /**
     * If the inputs changes state, react accordingly
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * The getSuggests() method from the original directive is overriden to
     * use the labelsService rather than suggest service.
     */
    protected getSuggests(): void;
    private _getLabelsSuggestions;
    /**
     * The setAutocompleteItem() method from the original directive is overriden to
     * Sets the content of the <input> based on the given
     * Autocomplete Item.
     * @returns false since labels items don't need to be searched
     */
    protected setAutocompleteItem(item: AutocompleteItem): boolean;
    /**
     * The startOrActive() method from the original directive is overriden to
     * immediately switch to ACTIVE if it is not the case
     */
    protected startOrActive(): void;
    /**
     * Listen to user's keyboard actions in the <input>, in order to navigate
     * and select the autocomplete suggestions.
     * Overrides the parent keydown method, adds the management of the backspace key
     * to remove labels items, enhance the enter key to support adding new labels.
     * @param event the keyboard
     */
    keydown(event: KeyboardEvent): false | undefined;
    /**
     * Listens to focus events on the <input> host and overrides the parent focus events in order to launch the autocomplete
     * If empty input :
     * - display top relevent labels if the auto-suggest wildcard is configured
     * - restart the autocomplete if no auto-suggest wildcard is found
     * If not empty input :
     * retrieve suggestions based on this input text
     */
    focus(): void;
    /**
     * Listens to blur events (out of focus) on the <input> host and overrides the parent blur events
     */
    blur(event: FocusEvent): void;
    /**
     * Overrides the parent inputChanged method, so that it is possible to reinitialize the autocomplete
     * @param event
     */
    inputChanged(event: Event): void;
    /**
     * Updates the <input>'s placeholder to avoid displaying something
     * when there are labelsItems displayed to the left.
     */
    updatePlaceholder(): void;
    private _manageSetAutocompleteItem;
    static ɵfac: i0.ɵɵFactoryDef<LabelsAutocomplete, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<LabelsAutocomplete, "[sqAutocompleteLabels]", never, { "public": "public"; "allowNewLabels": "allowNewLabels"; "allowManagePublicLabels": "allowManagePublicLabels"; "labelsItems": "labelsItems"; }, { "itemsUpdate": "itemsUpdate"; }, never>;
}
//# sourceMappingURL=labels-autocomplete.directive.d.ts.map