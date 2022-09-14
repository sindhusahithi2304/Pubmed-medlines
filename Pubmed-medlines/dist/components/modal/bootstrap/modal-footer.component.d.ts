import { Injector, OnChanges, SimpleChanges } from "@angular/core";
import { ModalButton, ModalRef } from "@sinequa/core/modal";
import * as i0 from "@angular/core";
export declare class BsModalFooter implements OnChanges {
    protected modalRef: ModalRef;
    protected injector: Injector;
    buttons: ModalButton[];
    isProcessingState: boolean;
    true: any;
    constructor(modalRef: ModalRef, injector: Injector);
    ngOnChanges(changes: SimpleChanges): void;
    buttonClick(button: ModalButton): boolean;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsModalFooter, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsModalFooter, "sq-modal-footer", never, { "buttons": "buttons"; "isProcessingState": "isProcessingState"; }, {}, never, ["*"]>;
}
//# sourceMappingURL=modal-footer.component.d.ts.map