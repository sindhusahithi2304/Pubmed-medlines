import { Injector } from "@angular/core";
import { ModalService, ModalRef } from "@sinequa/core/modal";
import * as i0 from "@angular/core";
export declare class BsModalHeader {
    protected modalRef: ModalRef;
    protected injector: Injector;
    title: string;
    true: any;
    constructor(modalRef: ModalRef, injector: Injector);
    get modalService(): ModalService;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsModalHeader, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsModalHeader, "sq-modal-header", never, { "title": "title"; }, {}, never, ["*"]>;
}
//# sourceMappingURL=modal-header.component.d.ts.map