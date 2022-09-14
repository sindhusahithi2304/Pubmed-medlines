import { ChangeDetectorRef, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';
import { PreviewData } from '@sinequa/core/web-services';
import { Action } from "@sinequa/components/action";
import { PreviewDocument } from '../../preview-document';
import { PreviewService } from '../../preview.service';
import * as i0 from "@angular/core";
export declare class Extract {
    text: SafeHtml;
    startIndex: number;
    relevanceIndex: number;
    textIndex: number;
}
export declare class BsPreviewExtractsPanelComponent implements OnChanges, OnDestroy {
    private previewService;
    private cdr;
    private domSanitizer;
    previewData: PreviewData;
    previewDocument: PreviewDocument;
    downloadUrl: string;
    style: "light" | "dark";
    cdkScrollViewport: CdkVirtualScrollViewport;
    sortAction: Action;
    extracts: Extract[];
    currentIndex: number;
    loading: boolean;
    loadCompleteSubscription: Subscription;
    constructor(document: Document, previewService: PreviewService, cdr: ChangeDetectorRef, domSanitizer: DomSanitizer);
    ngOnDestroy(): void;
    /**
     * Extracts the list of extracts from the preview document
     */
    ngOnChanges(changes: SimpleChanges): void;
    private createDocument;
    private extractAll;
    /**
     * Build Sort Action for Extracts
     * @param i
     */
    buildSortAction(): void;
    /**
     * Scroll to a specific extract
     * @param i
     */
    scrollExtract(extract: Extract, index?: number): boolean;
    /**
     * Sanitize the text of a HTML formatted extract
     * @param text
     */
    sanitize(text: string): SafeHtml | string;
    /**
     * Select the previous extract in the list
     */
    previousExtract(): void;
    /**
     * Select the next extract in the list
     */
    nextExtract(): void;
    private scrollTo;
    static ɵfac: i0.ɵɵFactoryDef<BsPreviewExtractsPanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsPreviewExtractsPanelComponent, "sq-preview-extracts-panel", never, { "previewData": "previewData"; "previewDocument": "previewDocument"; "downloadUrl": "downloadUrl"; "style": "style"; }, {}, never, never>;
}
//# sourceMappingURL=preview-extracts-panel.component.d.ts.map