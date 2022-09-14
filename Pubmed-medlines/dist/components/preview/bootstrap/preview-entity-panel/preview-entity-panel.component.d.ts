import { OnChanges, EventEmitter } from '@angular/core';
import { CategoryHighlightData, HighlightValue, PreviewData } from '@sinequa/core/web-services';
import { PreviewDocument } from '../../preview-document';
import * as i0 from "@angular/core";
export declare class BsPreviewEntityPanelComponent implements OnChanges {
    /**
     * Preview data
     */
    previewData: PreviewData;
    /**
     * Preview document
     */
    previewDocument: PreviewDocument;
    /**
     * What is the style of the facets
     */
    style: string;
    /**
     * Whether the facets are collapsible
     */
    collapsible: boolean;
    /**
     * Allows to uncheck all items from specific facets
     */
    startUnchecked: {
        [entity: string]: boolean;
    };
    /**
     * The list of entities to display (if ignored, will be deducted from the preview data)
     */
    entities: string[];
    /**
     * Triggers an event when check all / check none is use in a facet
     */
    facetChecked: EventEmitter<{
        entity: string;
        checked: boolean;
    }>;
    _entities: string[];
    constructor();
    /**
     * Extracts the list of entities from the preview data
     */
    ngOnChanges(): void;
    /**
     * Return the data for a specific entity category
     * @param entity
     */
    data(entity: string): CategoryHighlightData;
    /**
     * Returns the display value of a specific entity
     * @param entity
     */
    entityDisplay(entity: string): string;
    /**
     * Returns the icon of a specific entity
     * @param entity
     */
    entityIcon(entity: string): string;
    /**
     * Returns the list of values of a specific entity
     * @param entity
     */
    entityValues(entity: string): HighlightValue[];
    /**
     * Called by child facet when items are checked/unchecked
     * @param entity
     * @param checked
     */
    itemsChecked(entity: string, checked: boolean): void;
    static ɵfac: i0.ɵɵFactoryDef<BsPreviewEntityPanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsPreviewEntityPanelComponent, "sq-preview-entity-panel", never, { "previewData": "previewData"; "previewDocument": "previewDocument"; "style": "style"; "collapsible": "collapsible"; "startUnchecked": "startUnchecked"; "entities": "entities"; }, { "facetChecked": "facetChecked"; }, never, never>;
}
//# sourceMappingURL=preview-entity-panel.component.d.ts.map