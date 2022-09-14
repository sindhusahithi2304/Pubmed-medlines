import { EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { SafeResourceUrl } from "@angular/platform-browser";
import { Query } from '@sinequa/core/app-utils';
import { Record, PreviewData } from "@sinequa/core/web-services";
import { PreviewService } from "../../preview.service";
import { PreviewDocument } from "../../preview-document";
import * as i0 from "@angular/core";
export declare class BsFacetPreview implements OnChanges {
    private previewService;
    record: Record;
    sandbox: string | null;
    query: Query;
    height: string;
    iframeClass: string;
    similarDocuments: Record[];
    recordOpened: EventEmitter<{
        record: Record;
        query: Query;
        startSmall?: boolean | undefined;
        iframeClass?: string | undefined;
    }>;
    data: PreviewData;
    document: PreviewDocument;
    downloadUrl?: SafeResourceUrl;
    constructor(previewService: PreviewService);
    ngOnChanges(changes: SimpleChanges): void;
    openSimilarDoc(doc: Record): boolean;
    static ɵfac: i0.ɵɵFactoryDef<BsFacetPreview, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsFacetPreview, "sq-facet-preview", never, { "record": "record"; "sandbox": "sandbox"; "query": "query"; "height": "height"; "iframeClass": "iframeClass"; "similarDocuments": "similarDocuments"; }, { "recordOpened": "recordOpened"; }, never, never>;
}
//# sourceMappingURL=facet-preview.d.ts.map