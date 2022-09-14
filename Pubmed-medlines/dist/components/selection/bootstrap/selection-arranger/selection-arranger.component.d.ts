import { TemplateRef, EventEmitter } from "@angular/core";
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Record } from "@sinequa/core/web-services";
import { SearchService } from '@sinequa/components/search';
import { SelectionService, SelectionItem } from '../../selection.service';
import * as i0 from "@angular/core";
export declare class BsSelectionArranger {
    searchService: SearchService;
    selectionService: SelectionService;
    /**
     * If a list of records is supplied it is used to display and rearrange the list of records.
     * If this list is not supplied, the SelectionService list of items is used instead.
     */
    records?: Record[];
    /**
     * A template must be passed by transclusion to display each record in the selection
     */
    recordTpl: TemplateRef<any>;
    /**
     * Triggers event when the user moves or removes a record in the list.
     */
    change: EventEmitter<SelectionItem[]>;
    constructor(searchService: SearchService, selectionService: SelectionService);
    getRecords(): SelectionItem[];
    dropRecord(event: CdkDragDrop<string[]>): void;
    removeRecord(record: Record): void;
    static ɵfac: i0.ɵɵFactoryDef<BsSelectionArranger, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsSelectionArranger, "sq-selection-arranger", never, { "records": "records"; }, { "change": "change"; }, ["recordTpl"], never>;
}
//# sourceMappingURL=selection-arranger.component.d.ts.map