import { ModalRef, ConfirmOptions } from "@sinequa/core/modal";
import * as i0 from "@angular/core";
export declare class BsConfirm {
    model: ConfirmOptions;
    protected modalRef: ModalRef;
    true: any;
    constructor(model: ConfirmOptions, modalRef: ModalRef);
    get title(): string;
    getMessageClass(confirmType: any): string;
    static ɵfac: i0.ɵɵFactoryDef<BsConfirm, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsConfirm, "sq-confirm", never, {}, {}, never, never>;
}
//# sourceMappingURL=confirm.component.d.ts.map