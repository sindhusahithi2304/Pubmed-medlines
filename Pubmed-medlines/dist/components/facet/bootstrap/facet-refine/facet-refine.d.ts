import { OnChanges, SimpleChanges, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, AbstractControl } from "@angular/forms";
import { Results } from "@sinequa/core/web-services";
import { SearchService } from "@sinequa/components/search";
import { AbstractFacet } from "../../abstract-facet";
import { ParseResult } from '@sinequa/components/autocomplete';
import * as i0 from "@angular/core";
export declare class BsRefine extends AbstractFacet implements OnChanges {
    formBuilder: FormBuilder;
    searchService: SearchService;
    private changeDetectorRef;
    /**
     * Results of the search page associated to this refine
     */
    results: Results;
    /**
     * Whether or not to enable autocompletion
     */
    autocompleteEnabled: boolean;
    /**
     * Suggest query with which to perform autocompletion
     */
    suggestQuery: string;
    /**
     * Minimum delay (in ms) between suggest queries
     */
    suggestDelay: number;
    form: FormGroup;
    searchControl: AbstractControl | null;
    inputErrorMessage: string;
    constructor(formBuilder: FormBuilder, searchService: SearchService, changeDetectorRef: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    doRefine: () => void;
    setError(parseResult?: ParseResult): void;
    static ɵfac: i0.ɵɵFactoryDef<BsRefine, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsRefine, "sq-refine", never, { "results": "results"; "autocompleteEnabled": "autocompleteEnabled"; "suggestQuery": "suggestQuery"; "suggestDelay": "suggestDelay"; }, {}, never, never>;
}
//# sourceMappingURL=facet-refine.d.ts.map