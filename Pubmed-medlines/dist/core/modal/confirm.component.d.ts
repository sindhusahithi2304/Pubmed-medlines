import { ConfirmOptions, ModalButton } from "./modal.service";
import { ModalRef } from "./modal-ref";
import * as i0 from "@angular/core";
export declare class Confirm {
    model: ConfirmOptions;
    protected modalRef: ModalRef;
    constructor(model: ConfirmOptions, modalRef: ModalRef);
    get title(): string;
    buttonClick(button: ModalButton): void;
    static ɵfac: i0.ɵɵFactoryDef<Confirm, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<Confirm, "sq-core-confirm", never, {}, {}, never, never>;
}
//# sourceMappingURL=confirm.component.d.ts.map