import { OnInit, ChangeDetectorRef } from "@angular/core";
import { ModalButton, ModalRef } from "@sinequa/core/modal";
import { ModalProperties, LabelsService } from "../../labels.service";
import * as i0 from "@angular/core";
export declare class BsDeleteLabel implements OnInit {
    model: {
        values: string[];
        properties: ModalProperties;
    };
    private labelsService;
    private changeDetectorRef;
    private modalRef;
    buttons: ModalButton[];
    title: string;
    alert: string;
    btnText: string;
    isProcessing: boolean;
    private _action;
    constructor(model: {
        values: string[];
        properties: ModalProperties;
    }, labelsService: LabelsService, changeDetectorRef: ChangeDetectorRef, modalRef: ModalRef);
    ngOnInit(): void;
    updateLabelsNature(nature: boolean): void;
    onLabelsChanged(values: string[]): void;
    static ɵfac: i0.ɵɵFactoryDef<BsDeleteLabel, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsDeleteLabel, "sq-delete-label", never, {}, {}, never, never>;
}
//# sourceMappingURL=delete-label.d.ts.map