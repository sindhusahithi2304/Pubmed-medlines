import { OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { ModalButton } from "@sinequa/core/modal";
import { Basket } from "../../baskets.service";
import * as i0 from "@angular/core";
export declare class BsEditBasket implements OnInit, OnDestroy {
    model: Basket;
    private formBuilder;
    nameControl: FormControl;
    form: FormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];
    constructor(model: Basket, formBuilder: FormBuilder);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsEditBasket, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsEditBasket, "sq-edit-basket", never, {}, {}, never, never>;
}
//# sourceMappingURL=edit-basket.d.ts.map