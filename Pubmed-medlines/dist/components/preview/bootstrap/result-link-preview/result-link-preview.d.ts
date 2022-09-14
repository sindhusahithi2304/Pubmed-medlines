import { Record } from "@sinequa/core/web-services";
import { Query } from "@sinequa/core/app-utils";
import { ModalService } from "@sinequa/core/modal";
import { PreviewService } from "../../preview.service";
import * as i0 from "@angular/core";
export declare class BsResultLinkPreview {
    modalService: ModalService;
    previewService: PreviewService;
    query: Query;
    record: Record;
    icon: string;
    text: string;
    title: string;
    usePopup: boolean;
    newWindow: boolean;
    displaySimilarDocuments: boolean;
    metadata: string[];
    constructor(modalService: ModalService, previewService: PreviewService);
    click(event: MouseEvent): boolean;
    static ɵfac: i0.ɵɵFactoryDef<BsResultLinkPreview, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsResultLinkPreview, "sq-result-link-preview", never, { "query": "query"; "record": "record"; "icon": "icon"; "text": "text"; "title": "title"; "usePopup": "usePopup"; "newWindow": "newWindow"; "displaySimilarDocuments": "displaySimilarDocuments"; "metadata": "metadata"; }, {}, never, never>;
}
//# sourceMappingURL=result-link-preview.d.ts.map