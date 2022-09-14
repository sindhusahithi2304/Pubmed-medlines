import { OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { Query } from "@sinequa/core/app-utils";
import { Record } from "@sinequa/core/web-services";
import { PreviewData } from "@sinequa/core/web-services";
import { SearchService } from "@sinequa/components/search";
import { PreviewService } from "../../preview.service";
import { UIService } from "@sinequa/components/utils";
import * as i0 from "@angular/core";
export interface PreviewPopupModel {
    record: Record;
    query: Query;
    displaySimilarDocuments: boolean;
    metadata: string[];
}
export declare class BsPreviewPopup implements OnInit, OnDestroy {
    model: PreviewPopupModel;
    searchService: SearchService;
    previewService: PreviewService;
    protected uiService: UIService;
    private changeDetectorRef;
    private screenSize;
    private resizeSubscription;
    previewData: PreviewData;
    private previewDataError;
    constructor(model: PreviewPopupModel, searchService: SearchService, previewService: PreviewService, uiService: UIService, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    get currentId(): string;
    private updatePreviewData;
    get recordTitle(): string;
    get showPreviousNextText(): boolean;
    get showPreviousNext(): boolean;
    get previousEnabled(): boolean;
    get nextEnabled(): boolean;
    private getSearchPositionInPage;
    previous(): void;
    next(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsPreviewPopup, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsPreviewPopup, "sq-preview-popup", never, {}, {}, never, never>;
}
//# sourceMappingURL=preview-popup.d.ts.map