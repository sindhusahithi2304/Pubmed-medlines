import { OnInit } from "@angular/core";
import { ModalRef, ModalButton } from "@sinequa/core/modal";
import { Basket, BasketsService, SelectBasketModel } from "../../baskets.service";
import * as i0 from "@angular/core";
export declare class BsSelectBasket implements OnInit {
    model: SelectBasketModel;
    private basketsService;
    private modalRef;
    baskets: Basket[];
    buttons: ModalButton[];
    constructor(model: SelectBasketModel, basketsService: BasketsService, modalRef: ModalRef);
    ngOnInit(): void;
    activate(model: any): void;
    select(basket: Basket): void;
    newBasket(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsSelectBasket, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsSelectBasket, "sq-select-basket", never, {}, {}, never, never>;
}
//# sourceMappingURL=select-basket.d.ts.map