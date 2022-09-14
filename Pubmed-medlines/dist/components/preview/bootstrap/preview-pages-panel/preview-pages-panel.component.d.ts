import { OnChanges, SimpleChanges, EventEmitter, ElementRef, QueryList } from "@angular/core";
import { PreviewDocument } from "../../preview-document";
import { PreviewService } from "../../preview.service";
import { PreviewData, Results, Record } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
export declare class BsPreviewPagesPanelComponent implements OnChanges {
    previewService: PreviewService;
    pages: Results;
    previewData: PreviewData;
    previewDocument: PreviewDocument;
    style: "light" | "dark";
    gotopage: EventEmitter<number>;
    currentPageEl: QueryList<ElementRef>;
    sortedPages: Record[];
    containerid: string;
    currentPage: number;
    hasFirst: boolean;
    hasPrevious: boolean;
    hasNext: boolean;
    _pendingPreviewDocument: boolean;
    _pendingPages: boolean;
    _pendingPage?: number;
    constructor(previewService: PreviewService);
    ngOnChanges(changes: SimpleChanges): void;
    selectPage(page: number): boolean;
    selectPrevious(): boolean;
    selectNext(): boolean;
    static ɵfac: i0.ɵɵFactoryDef<BsPreviewPagesPanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsPreviewPagesPanelComponent, "sq-preview-pages-panel", never, { "pages": "pages"; "previewData": "previewData"; "previewDocument": "previewDocument"; "style": "style"; }, { "gotopage": "gotopage"; }, never, never>;
}
//# sourceMappingURL=preview-pages-panel.component.d.ts.map