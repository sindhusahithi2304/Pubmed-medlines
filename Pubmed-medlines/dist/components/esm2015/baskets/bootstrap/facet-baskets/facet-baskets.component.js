import { Component, Input } from '@angular/core';
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import * as i0 from "@angular/core";
import * as i1 from "../../baskets.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
import * as i4 from "@sinequa/core/intl";
function BsFacetBasketsComponent_a_1_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const basket_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(basket_r2.ids.length);
} }
function BsFacetBasketsComponent_a_1_i_4_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "i", 8);
    i0.ɵɵlistener("click", function BsFacetBasketsComponent_a_1_i_4_Template_i_click_0_listener($event) { i0.ɵɵrestoreView(_r8); const basket_r2 = i0.ɵɵnextContext().$implicit; const ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.deleteBasket(basket_r2, $event); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 1, "msg#baskets.delete"));
} }
const _c0 = function (a0) { return [a0]; };
function BsFacetBasketsComponent_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 3);
    i0.ɵɵlistener("click", function BsFacetBasketsComponent_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r10); const basket_r2 = ctx.$implicit; const ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.openBasket(basket_r2); });
    i0.ɵɵelementStart(1, "span", 4);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, BsFacetBasketsComponent_a_1_span_3_Template, 2, 1, "span", 5);
    i0.ɵɵtemplate(4, BsFacetBasketsComponent_a_1_i_4_Template, 2, 3, "i", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const basket_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(6, _c0, ctx_r0.searchRoute))("queryParams", ctx_r0.getQueryParams(basket_r2))("state", ctx_r0.getRouterState(basket_r2));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(basket_r2.name);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", basket_r2.ids);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.enableDelete);
} }
function BsFacetBasketsComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#baskets.noBasket"), " ");
} }
export class BsFacetBasketsComponent extends AbstractFacet {
    constructor(basketsService) {
        super();
        this.basketsService = basketsService;
        this.searchRoute = "/search";
        this.maxBaskets = 5;
        this.enableDelete = true;
        this.page = 0;
        this.createBasket = new Action({
            icon: "fas fa-plus",
            title: "msg#baskets.createBasket",
            action: () => {
                this.basketsService.createBasketModal();
            }
        });
        this.manageBasket = new Action({
            icon: "fas fa-cog",
            title: "msg#baskets.manageBaskets",
            action: () => {
                this.basketsService.manageBasketsModal();
            }
        });
        this.previousPage = new Action({
            icon: "fas fa-chevron-left",
            title: "msg#facet.previous",
            action: () => {
                this.page--;
            },
            updater: (action) => {
                action.disabled = this.page <= 0;
                action.hidden = this.maxPage === 0;
            }
        });
        this.nextPage = new Action({
            icon: "fas fa-chevron-right",
            title: "msg#facet.next",
            action: () => {
                this.page++;
            },
            updater: (action) => {
                action.disabled = this.page >= this.maxPage;
                action.hidden = this.maxPage === 0;
            }
        });
    }
    get maxPage() {
        return Math.max(0, Math.ceil(this.basketsService.baskets.length / this.maxBaskets) - 1);
    }
    get startIndex() {
        return this.page * this.maxBaskets;
    }
    get endIndex() {
        return (this.page + 1) * this.maxBaskets;
    }
    openBasket(basket) {
        this.basketsService.notifyOpenBasket(basket);
        return true;
    }
    get actions() {
        this.previousPage.update();
        this.nextPage.update();
        return [this.createBasket, this.previousPage, this.nextPage, this.manageBasket];
    }
    deleteBasket(basket, event) {
        event.stopPropagation();
        this.basketsService.deleteBasket(basket);
        this.page = Math.min(this.page, this.maxPage);
        return false;
    }
    getQueryParams(basket) {
        const query = this.basketsService.makeQuery(basket);
        const queryParams = query.toJsonForQueryString();
        return { query: queryParams };
    }
    getRouterState(basket) {
        return {
            audit: {
                type: "Basket_Open" /* Open */,
                detail: {
                    basket: basket.name
                }
            }
        };
    }
}
BsFacetBasketsComponent.ɵfac = function BsFacetBasketsComponent_Factory(t) { return new (t || BsFacetBasketsComponent)(i0.ɵɵdirectiveInject(i1.BasketsService)); };
BsFacetBasketsComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetBasketsComponent, selectors: [["sq-facet-baskets"]], inputs: { searchRoute: "searchRoute", maxBaskets: "maxBaskets", enableDelete: "enableDelete" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 4, vars: 6, consts: [[1, "list-group", "list-group-flush"], ["class", "basket-item list-group-item list-group-item-action d-flex align-items-center", 3, "routerLink", "queryParams", "state", "click", 4, "ngFor", "ngForOf"], ["class", "list-group-item text-center text-muted font-italic small py-5", 4, "ngIf"], [1, "basket-item", "list-group-item", "list-group-item-action", "d-flex", "align-items-center", 3, "routerLink", "queryParams", "state", "click"], [1, "basket-name", "text-truncate", "mr-auto"], ["class", "basket-count ml-2 text-muted small", 4, "ngIf"], ["class", "basket-delete ml-2 fas fa-times", 3, "title", "click", 4, "ngIf"], [1, "basket-count", "ml-2", "text-muted", "small"], [1, "basket-delete", "ml-2", "fas", "fa-times", 3, "title", "click"], [1, "list-group-item", "text-center", "text-muted", "font-italic", "small", "py-5"]], template: function BsFacetBasketsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, BsFacetBasketsComponent_a_1_Template, 5, 8, "a", 1);
        i0.ɵɵpipe(2, "slice");
        i0.ɵɵtemplate(3, BsFacetBasketsComponent_div_3_Template, 3, 3, "div", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind3(2, 2, ctx.basketsService.baskets, ctx.startIndex, ctx.endIndex));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.basketsService.baskets.length == 0);
    } }, directives: [i2.NgForOf, i2.NgIf, i3.RouterLinkWithHref], pipes: [i2.SlicePipe, i4.MessagePipe], styles: [".basket-item[_ngcontent-%COMP%]   .basket-delete[_ngcontent-%COMP%]{\n    opacity: 0;\n}\n\n.basket-item[_ngcontent-%COMP%]:hover   .basket-delete[_ngcontent-%COMP%]{\n    opacity: 1;\n    transition: opacity 0.2s ease-in-out;\n}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsFacetBasketsComponent, [{
        type: Component,
        args: [{
                selector: 'sq-facet-baskets',
                templateUrl: './facet-baskets.component.html',
                styles: [`
.basket-item .basket-delete{
    opacity: 0;
}

.basket-item:hover .basket-delete{
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
}
  `]
            }]
    }], function () { return [{ type: i1.BasketsService }]; }, { searchRoute: [{
            type: Input
        }], maxBaskets: [{
            type: Input
        }], enableDelete: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtYmFza2V0cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9iYXNrZXRzLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2ZhY2V0LWJhc2tldHMvZmFjZXQtYmFza2V0cy5jb21wb25lbnQudHMiLCJib290c3RyYXAvZmFjZXQtYmFza2V0cy9mYWNldC1iYXNrZXRzLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7SUNHNUMsK0JBQW9FO0lBQUEsWUFBdUI7SUFBQSxpQkFBTzs7O0lBQTlCLGVBQXVCO0lBQXZCLDBDQUF1Qjs7OztJQUMzRiw0QkFBa0o7SUFBdkMsaVFBQXNDOztJQUFDLGlCQUFJOztJQUF0RixrRUFBMEM7Ozs7O0lBTjlHLDRCQUlJO0lBREEsK05BQTRCO0lBQzVCLCtCQUFnRDtJQUFBLFlBQWlCO0lBQUEsaUJBQU87SUFDeEUsOEVBQWtHO0lBQ2xHLHdFQUFzSjtJQUMxSixpQkFBSTs7OztJQUxBLDJFQUE0QixpREFBQSwyQ0FBQTtJQUVvQixlQUFpQjtJQUFqQixvQ0FBaUI7SUFDMUQsZUFBZ0I7SUFBaEIsb0NBQWdCO0lBQ25CLGVBQWtCO0lBQWxCLDBDQUFrQjs7O0lBRTFCLDhCQUNJO0lBQUEsWUFDSjs7SUFBQSxpQkFBTTs7SUFERixlQUNKO0lBREksNkVBQ0o7O0FEUUosTUFBTSxPQUFPLHVCQUF3QixTQUFRLGFBQWE7SUFZeEQsWUFDUyxjQUE4QjtRQUNyQyxLQUFLLEVBQUUsQ0FBQztRQURELG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVo5QixnQkFBVyxHQUFXLFNBQVMsQ0FBQztRQUNoQyxl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Y29yZSc7XG5pbXBvcnQgeyBCYXNrZXRzU2VydmljZSwgQmFza2V0LCBCYXNrZXRFdmVudFR5cGUgfSBmcm9tICcuLi8uLi9iYXNrZXRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWJzdHJhY3RGYWNldCB9IGZyb20gJ0BzaW5lcXVhL2NvbXBvbmVudHMvZmFjZXQnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQHNpbmVxdWEvY29tcG9uZW50cy9hY3Rpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzcS1mYWNldC1iYXNrZXRzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZhY2V0LWJhc2tldHMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZXM6IFtgXG4uYmFza2V0LWl0ZW0gLmJhc2tldC1kZWxldGV7XG4gICAgb3BhY2l0eTogMDtcbn1cblxuLmJhc2tldC1pdGVtOmhvdmVyIC5iYXNrZXQtZGVsZXRle1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGVhc2UtaW4tb3V0O1xufVxuICBgXVxufSlcbmV4cG9ydCBjbGFzcyBCc0ZhY2V0QmFza2V0c0NvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmFjZXQge1xuICBASW5wdXQoKSBzZWFyY2hSb3V0ZTogc3RyaW5nID0gXCIvc2VhcmNoXCI7XG4gIEBJbnB1dCgpIG1heEJhc2tldHM6IG51bWJlciA9IDU7XG4gIEBJbnB1dCgpIGVuYWJsZURlbGV0ZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgcGFnZTogbnVtYmVyID0gMDtcblxuICBjcmVhdGVCYXNrZXQ6IEFjdGlvbjtcbiAgbWFuYWdlQmFza2V0OiBBY3Rpb247XG4gIHByZXZpb3VzUGFnZTogQWN0aW9uO1xuICBuZXh0UGFnZTogQWN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBiYXNrZXRzU2VydmljZTogQmFza2V0c1NlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5jcmVhdGVCYXNrZXQgPSBuZXcgQWN0aW9uKHtcbiAgICAgIGljb246IFwiZmFzIGZhLXBsdXNcIixcbiAgICAgIHRpdGxlOiBcIm1zZyNiYXNrZXRzLmNyZWF0ZUJhc2tldFwiLFxuICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuYmFza2V0c1NlcnZpY2UuY3JlYXRlQmFza2V0TW9kYWwoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMubWFuYWdlQmFza2V0ID0gbmV3IEFjdGlvbih7XG4gICAgICBpY29uOiBcImZhcyBmYS1jb2dcIixcbiAgICAgIHRpdGxlOiBcIm1zZyNiYXNrZXRzLm1hbmFnZUJhc2tldHNcIixcbiAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICB0aGlzLmJhc2tldHNTZXJ2aWNlLm1hbmFnZUJhc2tldHNNb2RhbCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5wcmV2aW91c1BhZ2UgPSBuZXcgQWN0aW9uKHtcbiAgICAgIGljb246IFwiZmFzIGZhLWNoZXZyb24tbGVmdFwiLFxuICAgICAgdGl0bGU6IFwibXNnI2ZhY2V0LnByZXZpb3VzXCIsXG4gICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgdGhpcy5wYWdlLS07XG4gICAgICB9LFxuICAgICAgdXBkYXRlcjogKGFjdGlvbjogQWN0aW9uKSA9PiB7XG4gICAgICAgIGFjdGlvbi5kaXNhYmxlZCA9IHRoaXMucGFnZSA8PSAwO1xuICAgICAgICBhY3Rpb24uaGlkZGVuID0gdGhpcy5tYXhQYWdlID09PSAwO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5uZXh0UGFnZSA9IG5ldyBBY3Rpb24oe1xuICAgICAgaWNvbjogXCJmYXMgZmEtY2hldnJvbi1yaWdodFwiLFxuICAgICAgdGl0bGU6IFwibXNnI2ZhY2V0Lm5leHRcIixcbiAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICB0aGlzLnBhZ2UrKztcbiAgICAgIH0sXG4gICAgICB1cGRhdGVyOiAoYWN0aW9uOiBBY3Rpb24pID0+IHtcbiAgICAgICAgYWN0aW9uLmRpc2FibGVkID0gdGhpcy5wYWdlID49IHRoaXMubWF4UGFnZTtcbiAgICAgICAgYWN0aW9uLmhpZGRlbiA9IHRoaXMubWF4UGFnZSA9PT0gMDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldCBtYXhQYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGguY2VpbCh0aGlzLmJhc2tldHNTZXJ2aWNlLmJhc2tldHMubGVuZ3RoIC8gdGhpcy5tYXhCYXNrZXRzKSAtIDEpO1xuICB9XG5cbiAgZ2V0IHN0YXJ0SW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlICogdGhpcy5tYXhCYXNrZXRzO1xuICB9XG5cbiAgZ2V0IGVuZEluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuICh0aGlzLnBhZ2UrMSkgKiB0aGlzLm1heEJhc2tldHM7XG4gIH1cblxuICBvcGVuQmFza2V0KGJhc2tldDogQmFza2V0KXtcbiAgICB0aGlzLmJhc2tldHNTZXJ2aWNlLm5vdGlmeU9wZW5CYXNrZXQoYmFza2V0KVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0IGFjdGlvbnMoKTogQWN0aW9uW10ge1xuICAgIHRoaXMucHJldmlvdXNQYWdlLnVwZGF0ZSgpO1xuICAgIHRoaXMubmV4dFBhZ2UudXBkYXRlKCk7XG4gICAgcmV0dXJuIFt0aGlzLmNyZWF0ZUJhc2tldCwgdGhpcy5wcmV2aW91c1BhZ2UsIHRoaXMubmV4dFBhZ2UsIHRoaXMubWFuYWdlQmFza2V0XTtcbiAgfVxuXG4gIGRlbGV0ZUJhc2tldChiYXNrZXQ6IEJhc2tldCwgZXZlbnQ6IEV2ZW50KXtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmJhc2tldHNTZXJ2aWNlLmRlbGV0ZUJhc2tldChiYXNrZXQpO1xuICAgIHRoaXMucGFnZSA9IE1hdGgubWluKHRoaXMucGFnZSwgdGhpcy5tYXhQYWdlKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRRdWVyeVBhcmFtcyhiYXNrZXQ6IEJhc2tldCkge1xuICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5iYXNrZXRzU2VydmljZS5tYWtlUXVlcnkoYmFza2V0KTtcbiAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHF1ZXJ5LnRvSnNvbkZvclF1ZXJ5U3RyaW5nKCk7XG4gICAgcmV0dXJuIHtxdWVyeTogcXVlcnlQYXJhbXN9O1xuICB9XG5cbiAgZ2V0Um91dGVyU3RhdGUoYmFza2V0OiBCYXNrZXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXVkaXQ6IHtcbiAgICAgICAgdHlwZTogQmFza2V0RXZlbnRUeXBlLk9wZW4sXG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIGJhc2tldDogYmFza2V0Lm5hbWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImxpc3QtZ3JvdXAgbGlzdC1ncm91cC1mbHVzaFwiPlxuICAgIDxhICpuZ0Zvcj1cImxldCBiYXNrZXQgb2YgYmFza2V0c1NlcnZpY2UuYmFza2V0cyB8IHNsaWNlOnN0YXJ0SW5kZXg6ZW5kSW5kZXhcIlxuICAgICAgICBjbGFzcz1cImJhc2tldC1pdGVtIGxpc3QtZ3JvdXAtaXRlbSBsaXN0LWdyb3VwLWl0ZW0tYWN0aW9uIGQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXJcIlxuICAgICAgICBbcm91dGVyTGlua109XCJbc2VhcmNoUm91dGVdXCIgW3F1ZXJ5UGFyYW1zXT1cImdldFF1ZXJ5UGFyYW1zKGJhc2tldClcIiBbc3RhdGVdPVwiZ2V0Um91dGVyU3RhdGUoYmFza2V0KVwiXG4gICAgICAgIChjbGljayk9XCJvcGVuQmFza2V0KGJhc2tldClcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJiYXNrZXQtbmFtZSB0ZXh0LXRydW5jYXRlIG1yLWF1dG9cIj57eyBiYXNrZXQubmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJiYXNrZXQuaWRzXCIgY2xhc3M9XCJiYXNrZXQtY291bnQgbWwtMiB0ZXh0LW11dGVkIHNtYWxsXCI+e3sgYmFza2V0Lmlkcy5sZW5ndGggfX08L3NwYW4+XG4gICAgICAgIDxpICpuZ0lmPVwiZW5hYmxlRGVsZXRlXCIgY2xhc3M9XCJiYXNrZXQtZGVsZXRlIG1sLTIgZmFzIGZhLXRpbWVzXCIgW3RpdGxlXT1cIidtc2cjYmFza2V0cy5kZWxldGUnIHwgc3FNZXNzYWdlXCIgKGNsaWNrKT1cImRlbGV0ZUJhc2tldChiYXNrZXQsICRldmVudClcIj48L2k+XG4gICAgPC9hPlxuICAgIDxkaXYgKm5nSWY9XCJiYXNrZXRzU2VydmljZS5iYXNrZXRzLmxlbmd0aCA9PSAwXCIgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gdGV4dC1jZW50ZXIgdGV4dC1tdXRlZCBmb250LWl0YWxpYyBzbWFsbCBweS01XCI+XG4gICAgICAgIHt7ICdtc2cjYmFza2V0cy5ub0Jhc2tldCcgfCBzcU1lc3NhZ2UgfX1cbiAgICA8L2Rpdj5cbjwvZGl2PiJdfQ==