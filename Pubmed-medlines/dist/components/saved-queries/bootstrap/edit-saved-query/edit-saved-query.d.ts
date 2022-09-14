import { OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { ModalButton } from "@sinequa/core/modal";
import { SavedQuery } from "../../saved-queries.service";
import * as i0 from "@angular/core";
export declare class BsEditSavedQuery implements OnInit, OnDestroy {
    model: SavedQuery;
    private formBuilder;
    nameControl: FormControl;
    form: FormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];
    constructor(model: SavedQuery, formBuilder: FormBuilder);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsEditSavedQuery, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsEditSavedQuery, "sq-edit-saved-query", never, {}, {}, never, never>;
}
//# sourceMappingURL=edit-saved-query.d.ts.map