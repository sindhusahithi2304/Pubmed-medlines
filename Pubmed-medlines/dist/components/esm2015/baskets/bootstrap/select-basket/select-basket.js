import { Component, Inject } from "@angular/core";
import { MODAL_MODEL, ModalButton } from "@sinequa/core/modal";
import * as i0 from "@angular/core";
import * as i1 from "../../baskets.service";
import * as i2 from "@sinequa/core/modal";
import * as i3 from "@angular/forms";
import * as i4 from "@sinequa/components/modal";
import * as i5 from "@angular/common";
import * as i6 from "@sinequa/core/intl";
function BsSelectBasket_a_4_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 6);
    i0.ɵɵlistener("click", function BsSelectBasket_a_4_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r4); const basket_r2 = ctx.$implicit; const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.select(basket_r2); });
    i0.ɵɵelementStart(1, "div");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const basket_r2 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, basket_r2.name));
} }
function BsSelectBasket_a_5_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 6);
    i0.ɵɵlistener("click", function BsSelectBasket_a_5_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.newBasket(); });
    i0.ɵɵelementStart(1, "div");
    i0.ɵɵelementStart(2, "i");
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, "msg#selectBasket.newBasket"));
} }
export class BsSelectBasket {
    constructor(model, basketsService, modalRef) {
        this.model = model;
        this.basketsService = basketsService;
        this.modalRef = modalRef;
        this.baskets = this.basketsService.baskets;
        if (!this.baskets) {
            this.baskets = [];
        }
        this.buttons = [
            new ModalButton({
                result: -2 /* Cancel */
            })
        ];
    }
    ngOnInit() {
        if (!!this.model.basketFilter) {
            this.baskets = this.baskets.filter(this.model.basketFilter);
        }
    }
    activate(model) {
        this.model = model;
    }
    select(basket) {
        if (basket) {
            this.model.basket = basket;
            this.modalRef.close(-1 /* OK */);
        }
    }
    newBasket() {
        const model = { name: "" };
        this.basketsService.createBasketModal(model)
            .then((result) => {
            if (result) { // The basket was created
                this.select(model);
            }
        });
    }
}
BsSelectBasket.ɵfac = function BsSelectBasket_Factory(t) { return new (t || BsSelectBasket)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(i1.BasketsService), i0.ɵɵdirectiveInject(i2.ModalRef)); };
BsSelectBasket.ɵcmp = i0.ɵɵdefineComponent({ type: BsSelectBasket, selectors: [["sq-select-basket"]], decls: 6, vars: 4, consts: [["name", "selectBasket", "novalidate", ""], [3, "title", "buttons"], [1, "form-group"], [1, "list-group", "sq-list-group"], ["href", "javascript:void(0)", "class", "list-group-item list-group-item-action", 3, "click", 4, "ngFor", "ngForOf"], ["href", "javascript:void(0)", "class", "list-group-item list-group-item-action", 3, "click", 4, "ngIf"], ["href", "javascript:void(0)", 1, "list-group-item", "list-group-item-action", 3, "click"]], template: function BsSelectBasket_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "sq-modal", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵtemplate(4, BsSelectBasket_a_4_Template, 4, 3, "a", 4);
        i0.ɵɵtemplate(5, BsSelectBasket_a_5_Template, 5, 3, "a", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("title", "msg#selectBasket.title")("buttons", ctx.buttons);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.baskets);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.model.allowNew);
    } }, directives: [i3.ɵangular_packages_forms_forms_y, i3.NgControlStatusGroup, i3.NgForm, i4.BsModal, i5.NgForOf, i5.NgIf], pipes: [i6.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsSelectBasket, [{
        type: Component,
        args: [{
                selector: "sq-select-basket",
                templateUrl: "./select-basket.html"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: i1.BasketsService }, { type: i2.ModalRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWJhc2tldC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2Jhc2tldHMvIiwic291cmNlcyI6WyJib290c3RyYXAvc2VsZWN0LWJhc2tldC9zZWxlY3QtYmFza2V0LnRzIiwiYm9vdHN0cmFwL3NlbGVjdC1iYXNrZXQvc2VsZWN0LWJhc2tldC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxXQUFXLEVBQVksV0FBVyxFQUFjLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7Ozs7SUNHcEUsNEJBQ0k7SUFEdUcsaU5BQXdCO0lBQy9ILDJCQUFLO0lBQUEsWUFBMkI7O0lBQUEsaUJBQU07SUFDMUMsaUJBQUk7OztJQURLLGVBQTJCO0lBQTNCLDBEQUEyQjs7OztJQUVwQyw0QkFDSTtJQUQrRiwwS0FBcUI7SUFDcEgsMkJBQUs7SUFBQSx5QkFBRztJQUFBLFlBQTRDOztJQUFBLGlCQUFJO0lBQUEsaUJBQU07SUFDbEUsaUJBQUk7O0lBRFEsZUFBNEM7SUFBNUMsd0VBQTRDOztBREF4RSxNQUFNLE9BQU8sY0FBYztJQUl2QixZQUNnQyxLQUF3QixFQUM1QyxjQUE4QixFQUM5QixRQUFrQjtRQUZFLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQzVDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7UUFFM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztTQUNyQjtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxJQUFJLFdBQVcsQ0FBQztnQkFDWixNQUFNLGlCQUFvQjthQUM3QixDQUFDO1NBQ0wsQ0FBQztJQUNOLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQy9EO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFLO1FBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFjO1FBQ2pCLElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxhQUFnQixDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQUVELFNBQVM7UUFDTCxNQUFNLEtBQUssR0FBWSxFQUFDLElBQUksRUFBRyxFQUFFLEVBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQzthQUN2QyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNiLElBQUcsTUFBTSxFQUFDLEVBQUUseUJBQXlCO2dCQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDOzs0RUE5Q1EsY0FBYyx1QkFLWCxXQUFXO21EQUxkLGNBQWM7UUNSM0IsK0JBQ0k7UUFBQSxtQ0FDSTtRQUFBLDhCQUNJO1FBQUEsOEJBQ0k7UUFBQSwyREFFSTtRQUNKLDJEQUVJO1FBQ1IsaUJBQU07UUFDVixpQkFBTTtRQUNWLGlCQUFXO1FBQ2YsaUJBQU87O1FBWk8sZUFBa0M7UUFBbEMsZ0RBQWtDLHdCQUFBO1FBR1YsZUFBVTtRQUFWLHFDQUFVO1FBRzVCLGVBQW9CO1FBQXBCLHlDQUFvQjs7a0REQzNCLGNBQWM7Y0FKMUIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFdBQVcsRUFBRSxzQkFBc0I7YUFDdEM7O3NCQU1RLE1BQU07dUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIEluamVjdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7TU9EQUxfTU9ERUwsIE1vZGFsUmVmLCBNb2RhbEJ1dHRvbiwgTW9kYWxSZXN1bHR9IGZyb20gXCJAc2luZXF1YS9jb3JlL21vZGFsXCI7XG5pbXBvcnQge0Jhc2tldCwgQmFza2V0c1NlcnZpY2UsIFNlbGVjdEJhc2tldE1vZGVsfSBmcm9tIFwiLi4vLi4vYmFza2V0cy5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLXNlbGVjdC1iYXNrZXRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3NlbGVjdC1iYXNrZXQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEJzU2VsZWN0QmFza2V0IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBiYXNrZXRzOiBCYXNrZXRbXTtcbiAgICBidXR0b25zOiBNb2RhbEJ1dHRvbltdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoTU9EQUxfTU9ERUwpIHB1YmxpYyBtb2RlbDogU2VsZWN0QmFza2V0TW9kZWwsXG4gICAgICAgIHByaXZhdGUgYmFza2V0c1NlcnZpY2U6IEJhc2tldHNTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG1vZGFsUmVmOiBNb2RhbFJlZikge1xuICAgICAgICB0aGlzLmJhc2tldHMgPSB0aGlzLmJhc2tldHNTZXJ2aWNlLmJhc2tldHM7XG5cbiAgICAgICAgaWYgKCF0aGlzLmJhc2tldHMpIHtcbiAgICAgICAgICAgIHRoaXMuYmFza2V0cyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5idXR0b25zID0gW1xuICAgICAgICAgICAgbmV3IE1vZGFsQnV0dG9uKHtcbiAgICAgICAgICAgICAgICByZXN1bHQ6IE1vZGFsUmVzdWx0LkNhbmNlbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCEhdGhpcy5tb2RlbC5iYXNrZXRGaWx0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYmFza2V0cyA9IHRoaXMuYmFza2V0cy5maWx0ZXIodGhpcy5tb2RlbC5iYXNrZXRGaWx0ZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWN0aXZhdGUobW9kZWwpIHtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIH1cblxuICAgIHNlbGVjdChiYXNrZXQ6IEJhc2tldCkge1xuICAgICAgICBpZiAoYmFza2V0KSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLmJhc2tldCA9IGJhc2tldDtcbiAgICAgICAgICAgIHRoaXMubW9kYWxSZWYuY2xvc2UoTW9kYWxSZXN1bHQuT0spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV3QmFza2V0KCl7XG4gICAgICAgIGNvbnN0IG1vZGVsIDogQmFza2V0ID0ge25hbWUgOiBcIlwifTtcbiAgICAgICAgdGhpcy5iYXNrZXRzU2VydmljZS5jcmVhdGVCYXNrZXRNb2RhbChtb2RlbClcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZihyZXN1bHQpeyAvLyBUaGUgYmFza2V0IHdhcyBjcmVhdGVkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KG1vZGVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4iLCI8Zm9ybSBuYW1lPVwic2VsZWN0QmFza2V0XCIgbm92YWxpZGF0ZT5cbiAgICA8c3EtbW9kYWwgW3RpdGxlXT1cIidtc2cjc2VsZWN0QmFza2V0LnRpdGxlJ1wiIFtidXR0b25zXT1cImJ1dHRvbnNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWdyb3VwIHNxLWxpc3QtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8YSAqbmdGb3I9XCJsZXQgYmFza2V0IG9mIGJhc2tldHNcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWFjdGlvblwiIChjbGljayk9XCJzZWxlY3QoYmFza2V0KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2Pnt7YmFza2V0Lm5hbWUgfCBzcU1lc3NhZ2V9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIm1vZGVsLmFsbG93TmV3XCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS1hY3Rpb25cIiAoY2xpY2spPVwibmV3QmFza2V0KClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj48aT57eydtc2cjc2VsZWN0QmFza2V0Lm5ld0Jhc2tldCcgfCBzcU1lc3NhZ2V9fTwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9zcS1tb2RhbD5cbjwvZm9ybT4iXX0=