import { OnChanges, SimpleChanges } from "@angular/core";
import { HighlightDataPerCategory, CategoryHighlightData, PreviewData } from "@sinequa/core/web-services";
import { PreviewDocument, HighlightCategoryFilterState, HighlightCategoryFilterChoice } from "../../preview-document";
import * as i0 from "@angular/core";
export interface HighlightNavigationState {
    current: number;
    filters: {
        [key: string]: HighlightCategoryFilterState;
    };
}
export declare class BsPreviewHighlights implements OnChanges {
    previewDocument: PreviewDocument;
    previewData: PreviewData;
    highlightDataPerCategory?: HighlightDataPerCategory;
    private highlightDataPerLocation?;
    navigationState: HighlightNavigationState;
    private filteredHighlightData?;
    ngOnChanges(changes: SimpleChanges): void;
    private initialize;
    /**
     * Called on init and when non-value filters are clicked
     * Resets the navigationState entity selection.
     * Applies the filters to the preview document.
     * Updates the filtered data.
     */
    reset(): void;
    /**
     * Selects the first match location (highlight classes and scrolls to it)
     */
    private moveToFirstSearchTerm;
    /**
     * Index of currently selected entity (from 1)
     */
    get current(): number;
    /**
     * No categories to highlight
     */
    get noData(): boolean;
    /**
     * Total number of highlights
     */
    get total(): number;
    /**
     * @returns true when the document is ready to be interacted with
     */
    get previewReady(): boolean;
    /**
     * Returns the currently selected entity/match/extract based on the PreviewData
     * or potentially by fetching it directly from the HTML document.
     */
    get currentValue(): string;
    /**
     * Get categories of the currently selected entity/match/extract
     * based on the filtered Highlight data per location
     */
    get currentCategories(): string[];
    categoryIconClass(categoryId: string): string;
    getCategoryHighlightData(categoryId: string): CategoryHighlightData | undefined;
    categoryDisplayLabel(categoryId: string): string;
    categoryLabelPipeParams(categoryId: string): any;
    /**
     * Returns the list of entity categories that contain values
     */
    get nonEmptyCategoryIds(): string[];
    private categoryIsEmpty;
    /**
     * @returns true if there is more than one option per category
     * @param categoryId the category id
     */
    categoryHasMultipleValues(categoryId: string): boolean;
    /**
     * @returns the number of options per category
     * @param categoryId the category id
     */
    getHighlightValueCount(categoryId: string): number;
    first(): void;
    previous(): void;
    next(): void;
    last(): void;
    private selectHighlight;
    selectAll(): void;
    selectNone(): void;
    get allSelected(): boolean;
    get noneSelected(): boolean;
    keepAllFilter: HighlightCategoryFilterState;
    keepNoneFilter: HighlightCategoryFilterState;
    newFilter(value: string): SimpleHighlightCategoryFilterState;
    selectFilter(categoryId: string, value: HighlightCategoryFilterState): void;
    /**
     * Comparator allowing to sort the filters in the select
     */
    compareFilters(filter1: HighlightCategoryFilterState, filter2: HighlightCategoryFilterState): boolean;
    static ɵfac: i0.ɵɵFactoryDef<BsPreviewHighlights, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsPreviewHighlights, "sq-preview-highlights", never, { "previewDocument": "previewDocument"; "previewData": "previewData"; }, {}, never, never>;
}
declare class SimpleHighlightCategoryFilterState implements HighlightCategoryFilterState {
    readonly choice: HighlightCategoryFilterChoice;
    private _filterValue;
    constructor(param?: string | HighlightCategoryFilterChoice);
    get filterValue(): string;
    static compare(filter1: HighlightCategoryFilterState, filter2: HighlightCategoryFilterState): boolean;
}
export {};
//# sourceMappingURL=preview-highlights.d.ts.map