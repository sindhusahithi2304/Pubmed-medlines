import { OnDestroy, InjectionToken } from "@angular/core";
import { Subject } from "rxjs";
import { Record } from "@sinequa/core/web-services";
import { Action } from "@sinequa/components/action";
import { SearchService } from "@sinequa/components/search";
import * as i0 from "@angular/core";
export declare enum SelectionEventType {
    SELECT = 0,
    UNSELECT = 1,
    MOVE = 2
}
export interface SelectionEvent {
    type: SelectionEventType;
    records: Record[];
    source?: string;
}
export interface SelectionItem {
    id: string;
}
/**
 * The storage mode allows to customize how the service stores records,
 * which enables different features:
 * - id: only store the id of a selected record (default)
 * - record: store the entire record
 * - a function that customize what is stored (at least the record id is required)
 */
export interface SelectionOptions {
    resetOnNewResults: boolean;
    resetOnNewQuery: boolean;
    storage: "id" | "record" | ((record: Record) => SelectionItem);
}
export declare const defaultSelectionOptions: SelectionOptions;
export declare const SELECTION_OPTIONS: InjectionToken<SelectionOptions>;
export declare class SelectionService implements OnDestroy {
    searchService: SearchService;
    selectionOptions: SelectionOptions;
    protected readonly selectedRecords: SelectionItem[];
    readonly selectionActions: Action[];
    private _events;
    readonly selectedRecordsAction: Action;
    constructor(searchService: SearchService, selectionOptions: SelectionOptions);
    /**
     * Emits an event on any (bulk or single) selection and unselection events
     */
    get events(): Subject<SelectionEvent>;
    ngOnDestroy(): void;
    private getItem;
    /**
     * Returns a copy of the list of selected records
     */
    getSelectedItems(): SelectionItem[];
    /**
     * Return the list of selected record ids
     */
    getSelectedIds(): string[];
    /**
     * @returns true if at least one record is selected
     */
    get haveSelectedRecords(): boolean;
    getSelectedCount(): number;
    /**
     * @returns true if all records in the search results are selected
     */
    get allRecordsSelected(): boolean;
    private selectCurrentRecords;
    /**
     * Toggles the selection of one record or all those in the results.
     * Emits a SelectionEvent if a record is selected or unselected.
     * @param record if provided, will toggle the selection of this record; if not will toggle all records in results
     */
    toggleSelectedRecords(record?: Record, source?: string): void;
    /**
     * Moves a selected record to a different index;
     * @param record
     * @param newIndex
     */
    moveSelectedRecord(record: Record, newIndex: number, source?: string): void;
    /**
     * Unselect all selected records
     * Emits a SelectionEvent
     */
    clearSelectedRecords(source?: string): void;
    private buildSelectRecordsAction;
    static ɵfac: i0.ɵɵFactoryDef<SelectionService, never>;
    static ɵprov: i0.ɵɵInjectableDef<SelectionService>;
}
//# sourceMappingURL=selection.service.d.ts.map