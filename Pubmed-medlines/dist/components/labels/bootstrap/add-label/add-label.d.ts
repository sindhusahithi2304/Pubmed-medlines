import { OnInit, ChangeDetectorRef } from "@angular/core";
import { ModalButton, ModalRef } from "@sinequa/core/modal";
import { ModalProperties, LabelsService } from "../../labels.service";
import * as i0 from "@angular/core";
export declare class BsAddLabel implements OnInit {
    model: {
        values: string[];
        properties: ModalProperties;
    };
    private labelsService;
    private changeDetectorRef;
    private modalRef;
    buttons: ModalButton[];
    isProcessing: boolean;
    constructor(model: {
        values: string[];
        properties: ModalProperties;
    }, labelsService: LabelsService, changeDetectorRef: ChangeDetectorRef, modalRef: ModalRef);
    ngOnInit(): void;
    updateLabelsNature(nature: boolean): void;
    onLabelsChanged(values: string[]): void;
    static ɵfac: i0.ɵɵFactoryDef<BsAddLabel, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsAddLabel, "sq-add-label", never, {}, {}, never, never>;
}
//# sourceMappingURL=add-label.d.ts.map