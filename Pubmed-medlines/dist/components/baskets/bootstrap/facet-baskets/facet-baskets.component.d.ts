import { BasketsService, Basket, BasketEventType } from '../../baskets.service';
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import * as i0 from "@angular/core";
export declare class BsFacetBasketsComponent extends AbstractFacet {
    basketsService: BasketsService;
    searchRoute: string;
    maxBaskets: number;
    enableDelete: boolean;
    page: number;
    createBasket: Action;
    manageBasket: Action;
    previousPage: Action;
    nextPage: Action;
    constructor(basketsService: BasketsService);
    get maxPage(): number;
    get startIndex(): number;
    get endIndex(): number;
    openBasket(basket: Basket): boolean;
    get actions(): Action[];
    deleteBasket(basket: Basket, event: Event): boolean;
    getQueryParams(basket: Basket): {
        query: string;
    };
    getRouterState(basket: Basket): {
        audit: {
            type: BasketEventType;
            detail: {
                basket: string;
            };
        };
    };
    static ɵfac: i0.ɵɵFactoryDef<BsFacetBasketsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsFacetBasketsComponent, "sq-facet-baskets", never, { "searchRoute": "searchRoute"; "maxBaskets": "maxBaskets"; "enableDelete": "enableDelete"; }, {}, never, never>;
}
//# sourceMappingURL=facet-baskets.component.d.ts.map