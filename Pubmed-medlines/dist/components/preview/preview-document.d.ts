import { ElementRef } from "@angular/core";
export declare enum HighlightCategoryFilterChoice {
    All = 0,
    None = 1,
    Value = 2
}
export interface HighlightCategoryFilterState {
    choice: HighlightCategoryFilterChoice;
    filterValue: string;
}
export declare type HighlightFilters = {
    [key: string]: HighlightCategoryFilterState;
} | string[];
/**
 * This class offers an API to manipulate the HTML of a preview document.
 * - Insert elements dynamically in the DOM of the preview (eg. tooltips)
 * - Retrieve the text of entities or extracts
 * - Select the elements of entities or extracts (by altering their CSS classes)
 * - Highlight (or not) specific entities or categories in the HTML (by altering their CSS classes)
 */
export declare class PreviewDocument {
    private static readonly SELECTED_HIGHLIGHT_CLASS;
    private static readonly SELECTED_HIGHLIGHT_FIRST_FRAGMENT_CLASS;
    private static readonly SELECTED_HIGHLIGHT_LAST_FRAGMENT_CLASS;
    private static readonly FILTERED_OUT_HIGHLIGHT_CLASS;
    private static readonly SVG_LINE_CLASS;
    private static readonly BASIC_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE;
    private static readonly ADVANCED_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE;
    private readonly _window;
    private readonly _document;
    private previousElement;
    constructor(element: ElementRef | Document);
    /**
     * Return the Window of the iframe containing the element
     */
    getContentWindow(): Window;
    /**
     * Returns the root Document element of the HTML Preview
     */
    get document(): Document;
    /**
     * Insert a given DOM Element in the body of the document preview
     * @param component
     */
    insertComponent(component: any): void;
    /**
     * Returns the text of a given entity
     * @param categoryId Category of the entity
     * @param index Index of the entity in that category
     */
    getHighlightText(categoryId: string, index: number): string;
    /**
     * Update the location of the entities' SVG background (for some converters)
     */
    setSvgBackgroundPositionAndSize(): void;
    /**
     * Select a specific entity by applying specific highlight classes
     * to the DOM elements and scrolling the view to center around them.
     * @param categoryId Category of the entity
     * @param index Index of the entity in that category
     */
    selectHighlight(categoryId: string, index: number): void;
    /**
     * Removes all entity selection classes from the document HTML elements
     */
    clearHighlightSelection(): void;
    /**
     * Turns highlights on or off based on the provided filter object. Additionally clears the selected entity
     * @param filters object where each key provides a filter for each category of entity/highlight
     */
    filterHighlights(filters: HighlightFilters): void;
    /**
     * Loop through every highlighted element in the document and turn highlights on or off based on the filters object.
     * If the filters object is an array then only the specified categories are highlighted.
     * @param filters object where each key provides a filter for each category of entity/highlight
     */
    updateHighlightFilterState(filters: HighlightFilters): void;
    /**
     * Turns on/off the highlights of one category of entities or a specific value if provided
     * @param category e.g. person
     * @param on true for highlighting / false for turning off
     * @param value e.g. "BILL GATES"
     */
    toggleHighlight(category: string, on: boolean, value?: string): void;
    private setHighlightSelection;
    private setHighlightSelectionHTML;
    private setHighlightSelectionSVG;
    private addSvgLine;
    private resizeSvgBackground;
    private getDocElements;
    private getFirst;
    private isSvgElement;
    private static elementIsFilteredOut;
    private static getElementCategory;
}
//# sourceMappingURL=preview-document.d.ts.map