import { EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HighlightValue, PreviewData, CCColumn } from '@sinequa/core/web-services';
import { PreviewDocument } from '../../preview-document';
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import { AppService } from '@sinequa/core/app-utils';
import * as i0 from "@angular/core";
export declare class BsPreviewEntityFacetComponent extends AbstractFacet implements OnInit, OnChanges {
    private appService;
    entity: string;
    data: HighlightValue[];
    previewData: PreviewData;
    previewDocument: PreviewDocument;
    startUnchecked: boolean;
    itemsChecked: EventEmitter<boolean>;
    count: number;
    sortFreq: boolean;
    hidden: Map<string, boolean>;
    nav: Map<string, number>;
    column: CCColumn | undefined;
    checkAction: Action;
    sortFreqAction: Action;
    sortAlphaAction: Action;
    constructor(appService: AppService);
    get actions(): Action[];
    /**
     * Uncheck items if needed
     */
    ngOnInit(): void;
    /**
     * Since the preview document comes after the preview data, we need to wait for that change
     * and apply the hidden state in the document.
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Returns the entities to be displayed in the facet, performing truncation and sorting of the input list
     */
    get entityValues(): HighlightValue[];
    /**
     * Returns the number of occurrences of a given value.
     * If the user used the facet to navigate, the format is "i / count"
     * @param value
     */
    entityCount(value: HighlightValue): string;
    /**
     * Return whether the entity is hidden (unchecked) or not
     * @param value
     */
    entityHidden(value: HighlightValue): boolean;
    /**
     * Shows all the entities in the list
     */
    showAll(): boolean;
    /**
     * Toggles the hidden (checked/unchecked) state of a value in the list.
     * Modifies the provided preview document.
     * @param value
     */
    toggleEntity(value: HighlightValue): void;
    /**
     * Unselect all entities (set hidden)
     */
    unselectAll: (action?: Action | undefined) => void;
    /**
     * Select all entities (unset hidden)
     */
    selectAll: (action: Action) => void;
    /**
     * Navigate to the next value of this entity.
     * Modifies the provided preview document.
     * @param value
     */
    nextEntity(value: HighlightValue): void;
    /**
     * Navigate to the next value of this entity.
     * Modifies the provided preview document.
     * @param value
     */
    prevEntity(value: HighlightValue): void;
    /**
     * Navigate to the given occurrence of an entity in a specific category
     * Modifies the provided preview document.
     * @param category
     * @param value
     * @param i
     */
    selectEntity(category: string, value: string, i: number): void;
    /**
     * Helper function to find the indexes of all occurrences of a entity value in the document
     * @param category
     * @param value
     */
    private getEntityIndexes;
    static ɵfac: i0.ɵɵFactoryDef<BsPreviewEntityFacetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsPreviewEntityFacetComponent, "sq-preview-entity-facet", never, { "entity": "entity"; "data": "data"; "previewData": "previewData"; "previewDocument": "previewDocument"; "startUnchecked": "startUnchecked"; }, { "itemsChecked": "itemsChecked"; }, never, never>;
}
//# sourceMappingURL=preview-entity-facet.component.d.ts.map