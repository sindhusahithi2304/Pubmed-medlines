import { ElementRef, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, ChangeDetectorRef, OnInit, OnDestroy } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PreviewDocument } from "./preview-document";
import * as i0 from "@angular/core";
/**
 * This component manages the iframe containing the document's preview.
 * The main input is the URL of the document's preview.
 * The main output is an event emitter providing an instance of PreviewDocument.
 *
 * PreviewDocument is a wrapper around the HTML Document, allowing to interact with
 * the HTML of the preview (for example to highlight some entities)
 *
 * It is possible to insert a tooltip in the preview via transclusion.
 * Example:
    <sq-preview-document-iframe
        [downloadUrl]="downloadUrl"
        (onPreviewReady)="onPreviewReady($event)">
        <sq-preview-tooltip #tooltip
            [previewDocument]="previewDocument"
            [previewData]="previewDocument">
        </sq-preview-tooltip>
    </sq-preview-document-iframe>
 */
export declare class PreviewDocumentIframe implements OnChanges, OnInit, OnDestroy, AfterViewInit {
    private cdr;
    private sanitizer;
    defaultSandbox: string;
    sandbox: string | null | undefined;
    downloadUrl: string;
    scalingFactor: number;
    onPreviewReady: EventEmitter<PreviewDocument>;
    pageChange: EventEmitter<string | PreviewDocument>;
    documentFrame: ElementRef;
    tooltip: ElementRef;
    sanitizedUrlSrc: SafeResourceUrl;
    _sandbox: string | null | undefined;
    private previewDocument;
    readonly previewDocLoadHandler: any;
    constructor(cdr: ChangeDetectorRef, sanitizer: DomSanitizer);
    onPreviewDocLoad(): void;
    addTooltip(previewDocument: PreviewDocument): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(simpleChanges: SimpleChanges): void;
    ngAfterViewInit(): void;
    iframeURLChange(iframe: any, callback: any): void;
    resetContent(): void;
    static ɵfac: i0.ɵɵFactoryDef<PreviewDocumentIframe, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<PreviewDocumentIframe, "sq-preview-document-iframe", never, { "sandbox": "sandbox"; "downloadUrl": "downloadUrl"; "scalingFactor": "scalingFactor"; }, { "onPreviewReady": "onPreviewReady"; "pageChange": "pageChange"; }, ["tooltip"], never>;
}
//# sourceMappingURL=preview-document-iframe.component.d.ts.map