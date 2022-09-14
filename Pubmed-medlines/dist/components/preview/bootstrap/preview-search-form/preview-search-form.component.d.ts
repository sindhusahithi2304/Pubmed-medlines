import { EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Query } from '@sinequa/core/app-utils';
import * as i0 from "@angular/core";
export declare class BsPreviewSearchFormComponent implements OnChanges {
    private formBuilder;
    query: Query;
    searchText: EventEmitter<string>;
    readonly form: FormGroup;
    readonly searchControl: FormControl;
    constructor(formBuilder: FormBuilder);
    /**
     * Updates the text of the search form when the query changes
     */
    ngOnChanges(): void;
    /**
     * Emits an event for the parent component to search this next text
     */
    search(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsPreviewSearchFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsPreviewSearchFormComponent, "sq-preview-search-form", never, { "query": "query"; }, { "searchText": "searchText"; }, never, never>;
}
//# sourceMappingURL=preview-search-form.component.d.ts.map