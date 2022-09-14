import { OnChanges, SimpleChanges, ChangeDetectorRef, NgZone, ElementRef } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { PreviewData } from "@sinequa/core/web-services";
import { PreviewDocument } from "./preview-document";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
export declare class PreviewTooltip implements OnChanges {
    private zone;
    private changeDetectorRef;
    private sanitizer;
    previewDocument: PreviewDocument;
    previewData: PreviewData;
    entityActions: Action[];
    entityNavActions: boolean;
    selectedTextActions: Action[];
    scalingFactor: number;
    tooltip: ElementRef;
    selectedText: string;
    entityType: string;
    entityValue: string;
    entityDisplay: string;
    entityLabel: string;
    entityCount: number;
    entityIdx: number;
    bottom: string;
    left: string;
    leftPin: any;
    isBottom: boolean;
    constructor(zone: NgZone, changeDetectorRef: ChangeDetectorRef, sanitizer: DomSanitizer);
    /**
     * Add mouse listeners to a new preview document in order to display the tooltip
     * in response to specific hover of click events
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Shortcut to the preview document
     */
    private get document();
    /**
     * Shortcut to the preview Window
     */
    private get window();
    /**
     * Control the visibility of the tooltip
     */
    get visibility(): "visible" | "hidden";
    /**
     * Position the tooltip above a bounding box
     */
    positionTooltipAbove(box: DOMRect | ClientRect): void;
    /**
     * Handle mouse button down: reinitilizes selection
     */
    handleMouseDown: (event: MouseEvent) => void;
    /**
     * Handle mouse button up: get the selected text and display a tooltip above it
     */
    handleMouseUp: () => void;
    private _inTime;
    /**
     * Handle mouse movements. If hovering an entity and no text is selected, will display a tooltip for this entity
     */
    handleMouseMove: (event: MouseEvent) => void;
    /**
     * Handle scroll events
     */
    handleScroll: (event: any) => void;
    /**
     * Move to the previous entity if possible
     * @param event
     */
    previousEntity(event: Event): void;
    /**
     * Move to the next entity if possible
     * @param event
     */
    nextEntity(event: Event): void;
    /**
     * Executes a clicked action button in the context of a tooltip for hovered entities
     * @param action
     * @param event
     */
    entityAction(action: Action, event: Event): void;
    /**
     * Executes a clicked action button in the context of a tooltip for text selection
     * @param action the action to execute
     * @param event
     */
    selectedTextAction(action: Action, event: Event): void;
    /**
     * Helper function to find the indexes of a specific entity *occurrence*. Returns both the index within all
     * of its own occurrences: valueIndex (eg. BILL GATES 3/14) AND the index corresponding to the
     * entity id inside the document: idIndex (eg. id="person_32").
     * @param category eg. person
     * @param value eg. BILL GATES
     * @param predicate function testing whether it is the entity occurrence of interest
     * @returns an object with both indexes
     */
    private findEntity;
    static ɵfac: i0.ɵɵFactoryDef<PreviewTooltip, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<PreviewTooltip, "sq-preview-tooltip", never, { "previewDocument": "previewDocument"; "previewData": "previewData"; "entityActions": "entityActions"; "entityNavActions": "entityNavActions"; "selectedTextActions": "selectedTextActions"; "scalingFactor": "scalingFactor"; }, {}, never, never>;
}
//# sourceMappingURL=preview-tooltip.component.d.ts.map