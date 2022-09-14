import { OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PromptOptions, ModalRef, ModalButton } from "@sinequa/core/modal";
import * as i0 from "@angular/core";
export declare class BsPrompt implements OnInit, OnDestroy {
    model: PromptOptions;
    protected modalRef: ModalRef;
    protected formBuilder: FormBuilder;
    inputControl: FormControl;
    form: FormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];
    constructor(model: PromptOptions, modalRef: ModalRef, formBuilder: FormBuilder);
    ngOnInit(): void;
    ngOnDestroy(): void;
    get title(): string;
    static ɵfac: i0.ɵɵFactoryDef<BsPrompt, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsPrompt, "sq-prompt", never, {}, {}, never, never>;
}
//# sourceMappingURL=prompt.component.d.ts.map