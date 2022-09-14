import { OnChanges, SimpleChanges } from "@angular/core";
import { AppService, FormatService } from "@sinequa/core/app-utils";
import { CCColumn, Results } from "@sinequa/core/web-services";
import { SelectionService } from "@sinequa/components/selection";
import { SearchService } from "@sinequa/components/search";
import { ResultsView } from "../../results-view.service";
import * as i0 from "@angular/core";
export interface GridView extends ResultsView {
    columns: Column[];
}
export interface Column {
    active: boolean;
    title: string;
    field: string;
    sortable: boolean;
    renderAsHtml: boolean;
}
export interface ColumnData {
    config: Column;
    column: CCColumn | undefined;
    sortIndex?: number;
    ascending?: boolean;
    sortIcon?: string;
    sortIndicator?: string;
}
export declare class BsResultsGridView implements OnChanges {
    appService: AppService;
    searchService: SearchService;
    formatService: FormatService;
    private selectionService;
    results: Results;
    view: GridView;
    private orderBy;
    columnsData: ColumnData[] | undefined;
    constructor(appService: AppService, searchService: SearchService, formatService: FormatService, selectionService: SelectionService);
    observeQueryFields(): void;
    ngOnChanges(changes: SimpleChanges): void;
    toggleSelectedRecords(): void;
    get haveSelectedRecords(): boolean;
    getSortIndicator(columnData: ColumnData): string | undefined;
    ascendingFirst(column: Column): boolean;
    get maxSortIndex(): number;
    _setSort(columnData: ColumnData, ascending: boolean): void;
    _clearSort(columnData: ColumnData): void;
    clearSorts(): void;
    isSortable(columnData: ColumnData): boolean;
    initSorts(): void;
    setSort(columnData: ColumnData): void;
    static ɵfac: i0.ɵɵFactoryDef<BsResultsGridView, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsResultsGridView, "sq-results-grid-view", never, { "results": "results"; "view": "view"; }, {}, never, never>;
}
//# sourceMappingURL=results-grid-view.d.ts.map