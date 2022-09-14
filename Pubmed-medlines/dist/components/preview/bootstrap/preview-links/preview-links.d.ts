import { OnChanges } from "@angular/core";
import { Record } from "@sinequa/core/web-services";
import { SearchService } from "@sinequa/components/search";
import * as i0 from "@angular/core";
export declare class BsPreviewLinks implements OnChanges {
    private searchService;
    record: Record;
    resultId: string;
    originalDocumentUrl: string;
    constructor(searchService: SearchService);
    ngOnChanges(): void;
    click(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsPreviewLinks, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsPreviewLinks, "sq-preview-links", never, { "record": "record"; "resultId": "resultId"; }, {}, never, never>;
}
//# sourceMappingURL=preview-links.d.ts.map