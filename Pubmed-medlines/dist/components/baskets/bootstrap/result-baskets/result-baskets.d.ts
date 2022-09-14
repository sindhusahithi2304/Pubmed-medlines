import { OnChanges, SimpleChanges, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Record } from "@sinequa/core/web-services";
import { ModalService } from "@sinequa/core/modal";
import { BasketsService } from "../../baskets.service";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
/**
 * Component representing the add-to-baskets button in one item of the result list view.
 *
 */
export declare class BsResultBaskets implements OnChanges, OnDestroy {
    private modalService;
    private basketsService;
    private changeDetectorRef;
    record: Record;
    rightAligned: boolean;
    basketsAction: Action;
    private addToBasketAction;
    private removeFromBasketAction;
    private removeFromAllBasketsAction;
    private baskets;
    private initialized;
    private basketsSubscription;
    constructor(modalService: ModalService, basketsService: BasketsService, changeDetectorRef: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    get isInBaskets(): boolean;
    private refreshVisualization;
    private updateRecordBaskets;
    private buildAddToBasketAction;
    private buildRemoveFromBasketAction;
    private buildRemovalFromAllBasketsAction;
    private buildBasketsAction;
    static ɵfac: i0.ɵɵFactoryDef<BsResultBaskets, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsResultBaskets, "sq-result-baskets", never, { "record": "record"; "rightAligned": "rightAligned"; }, {}, never, never>;
}
//# sourceMappingURL=result-baskets.d.ts.map