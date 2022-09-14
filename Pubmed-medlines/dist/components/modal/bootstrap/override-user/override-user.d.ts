import { OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { ModalButton } from "@sinequa/core/modal";
import { UserOverride } from "@sinequa/core/login";
import * as i0 from "@angular/core";
export declare class BsOverrideUser implements OnInit, OnDestroy {
    model: UserOverride;
    private formBuilder;
    form: FormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];
    constructor(model: UserOverride, formBuilder: FormBuilder);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsOverrideUser, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsOverrideUser, "sq-override-user", never, {}, {}, never, never>;
}
//# sourceMappingURL=override-user.d.ts.map