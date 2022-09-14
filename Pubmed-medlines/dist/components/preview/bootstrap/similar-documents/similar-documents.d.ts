import { OnChanges, ChangeDetectorRef } from "@angular/core";
import { Record, SimilarDocumentsWebService } from "@sinequa/core/web-services";
import { PreviewService } from "../../preview.service";
import * as i0 from "@angular/core";
export declare class BsSimilarDocuments implements OnChanges {
    private similarDocumentsService;
    private previewService;
    private changeDetectorRef;
    private sourceDocumentId;
    private query;
    private documentList;
    get documents(): Record[];
    constructor(similarDocumentsService: SimilarDocumentsWebService, previewService: PreviewService, changeDetectorRef: ChangeDetectorRef);
    ngOnChanges(): void;
    documentIconClass(document: Record): string;
    onLinkClick(document: Record): void;
    static ɵfac: i0.ɵɵFactoryDef<BsSimilarDocuments, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsSimilarDocuments, "sq-similar-documents", never, { "sourceDocumentId": "sourceDocumentId"; "query": "query"; }, {}, never, never>;
}
//# sourceMappingURL=similar-documents.d.ts.map