import { OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { ModalButton, ModalRef } from "@sinequa/core/modal";
import { ModalProperties, LabelsService } from "../../labels.service";
import * as i0 from "@angular/core";
export declare class BsRenameLabel implements OnInit, OnDestroy {
    model: {
        oldValues: string[];
        newValue: string;
        properties: ModalProperties;
    };
    private formBuilder;
    private labelsService;
    private changeDetectorRef;
    private modalRef;
    labelControl: FormControl;
    form: FormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];
    isProcessing: boolean;
    constructor(model: {
        oldValues: string[];
        newValue: string;
        properties: ModalProperties;
    }, formBuilder: FormBuilder, labelsService: LabelsService, changeDetectorRef: ChangeDetectorRef, modalRef: ModalRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    updateLabelsNature(nature: boolean): void;
    onLabelsChanged(values: string[]): void;
    static ɵfac: i0.ɵɵFactoryDef<BsRenameLabel, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsRenameLabel, "sq-rename-label", never, {}, {}, never, never>;
}
//# sourceMappingURL=rename-label.d.ts.map