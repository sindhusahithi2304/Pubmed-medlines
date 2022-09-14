import { OnChanges, SimpleChanges, ChangeDetectorRef } from "@angular/core";
import { SafeResourceUrl } from '@angular/platform-browser';
import { PreviewData } from "@sinequa/core/web-services";
import { Query } from "@sinequa/core/app-utils";
import { PreviewService } from "../../preview.service";
import { PreviewDocument } from "../../preview-document";
import * as i0 from "@angular/core";
export declare class BsPreviewPanel implements OnChanges {
    private previewService;
    private changeDetectorRef;
    query: Query;
    previewData: PreviewData;
    sandbox: string;
    displaySimilarDocuments: boolean;
    metadata: string[];
    leftPaneAdditionalClasses: string;
    downloadUrl?: SafeResourceUrl;
    previewDocument: PreviewDocument;
    constructor(previewService: PreviewService, changeDetectorRef: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    onPreviewReady(previewDocument: PreviewDocument): void;
    static ɵfac: i0.ɵɵFactoryDef<BsPreviewPanel, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsPreviewPanel, "sq-preview-panel", never, { "query": "query"; "previewData": "previewData"; "sandbox": "sandbox"; "displaySimilarDocuments": "displaySimilarDocuments"; "metadata": "metadata"; "leftPaneAdditionalClasses": "leftPaneAdditionalClasses"; }, {}, never, never>;
}
//# sourceMappingURL=preview-panel.d.ts.map