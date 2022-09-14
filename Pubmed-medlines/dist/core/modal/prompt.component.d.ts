import { OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PromptOptions } from "./modal.service";
import { ModalRef } from "./modal-ref";
import * as i0 from "@angular/core";
export declare class Prompt implements OnInit, OnDestroy {
    model: PromptOptions;
    protected modalRef: ModalRef;
    protected formBuilder: FormBuilder;
    inputControl: FormControl;
    form: FormGroup;
    formChanges: Subscription;
    constructor(model: PromptOptions, modalRef: ModalRef, formBuilder: FormBuilder);
    ngOnInit(): void;
    ngOnDestroy(): void;
    showError(control: FormControl): boolean;
    ok(): void;
    cancel(): void;
    get title(): string;
    static ɵfac: i0.ɵɵFactoryDef<Prompt, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<Prompt, "sq-core-prompt", never, {}, {}, never, never>;
}
//# sourceMappingURL=prompt.component.d.ts.map