import { OnInit } from "@angular/core";
import { ValidatorFn } from "@angular/forms";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { ModalButton } from "@sinequa/core/modal";
import { AuditEvent } from "@sinequa/core/web-services";
import { Basket, ManageBasketsModel } from "../../baskets.service";
import * as i0 from "@angular/core";
export declare class BsManageBaskets implements OnInit {
    model: ManageBasketsModel;
    reordering: boolean;
    buttons: ModalButton[];
    removeAllButton: ModalButton;
    nameValidators: ValidatorFn[];
    constructor(model: ManageBasketsModel);
    ngOnInit(): void;
    addAuditEvent(auditEvent: AuditEvent): void;
    reorder(): void;
    setName(basket: Basket, name: string): void;
    remove(basket: Basket, index: number): boolean;
    dropped(drop: CdkDragDrop<Basket[]>): void;
    static ɵfac: i0.ɵɵFactoryDef<BsManageBaskets, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsManageBaskets, "sq-manage-baskets", never, {}, {}, never, never>;
}
//# sourceMappingURL=manage-baskets.d.ts.map