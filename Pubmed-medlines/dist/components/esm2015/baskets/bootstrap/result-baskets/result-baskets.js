import { Component, Input } from '@angular/core';
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/modal";
import * as i2 from "../../baskets.service";
import * as i3 from "@sinequa/components/action";
const _c0 = function (a0) { return [a0]; };
const _c1 = function (a0, a2) { return { items: a0, autoAdjust: true, rightAligned: a2 }; };
/**
 * Component representing the add-to-baskets button in one item of the result list view.
 *
 */
export class BsResultBaskets {
    constructor(modalService, basketsService, changeDetectorRef) {
        this.modalService = modalService;
        this.basketsService = basketsService;
        this.changeDetectorRef = changeDetectorRef;
        this.baskets = [];
    }
    ngOnChanges(changes) {
        if (!this.initialized) {
            this.initialized = true;
            this.addToBasketAction = this.buildAddToBasketAction();
            this.removeFromBasketAction = this.buildRemoveFromBasketAction();
            this.removeFromAllBasketsAction = this.buildRemovalFromAllBasketsAction();
            this.basketsSubscription = this.basketsService.changes.subscribe(event => {
                this.updateRecordBaskets();
                this.refreshVisualization();
            });
        }
        this.updateRecordBaskets();
        this.refreshVisualization();
    }
    ngOnDestroy() {
        if (this.basketsSubscription) {
            this.basketsSubscription.unsubscribe();
        }
    }
    get isInBaskets() {
        return this.baskets.length > 0;
    }
    refreshVisualization() {
        this.basketsAction = this.buildBasketsAction();
        this.changeDetectorRef.markForCheck();
    }
    updateRecordBaskets() {
        const currentBaskets = this.basketsService.baskets;
        this.baskets = [];
        for (const basket of currentBaskets) {
            if (!!basket.ids && basket.ids.includes(this.record.id)) {
                this.baskets.push(basket.name);
            }
        }
    }
    buildAddToBasketAction() {
        return new Action({
            text: 'msg#baskets.addToBasket',
            action: (item, $event) => {
                this.basketsService.addToBasketModal(this.record.id, this.baskets);
            }
        });
    }
    buildRemoveFromBasketAction() {
        return new Action({
            text: 'msg#baskets.removeFromBasket',
            action: (item, $event) => {
                this.basketsService.removeFromBasketModal(this.record.id, this.baskets);
            }
        });
    }
    buildRemovalFromAllBasketsAction() {
        return new Action({
            text: 'msg#baskets.removeFromAllBaskets',
            action: () => {
                this.modalService
                    .yesNo('msg#baskets.removeFromAllBasketsConfirmation', { values: { baskets: this.baskets.join(', ') } })
                    .then(result => {
                    if (result === -3 /* Yes */) {
                        this.basketsService.removeFromAllBaskets(this.record.id);
                    }
                });
            }
        });
    }
    buildBasketsAction() {
        return new Action({
            icon: 'fas fa-shopping-basket',
            title: 'msg#baskets.baskets',
            children: this.isInBaskets
                ? this.baskets.length === 1
                    ? [this.addToBasketAction, this.removeFromBasketAction]
                    : [this.addToBasketAction, this.removeFromBasketAction, this.removeFromAllBasketsAction]
                : [this.addToBasketAction]
        });
    }
}
BsResultBaskets.ɵfac = function BsResultBaskets_Factory(t) { return new (t || BsResultBaskets)(i0.ɵɵdirectiveInject(i1.ModalService), i0.ɵɵdirectiveInject(i2.BasketsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
BsResultBaskets.ɵcmp = i0.ɵɵdefineComponent({ type: BsResultBaskets, selectors: [["sq-result-baskets"]], inputs: { record: "record", rightAligned: "rightAligned" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 9, consts: [[3, "sq-action-buttons"]], template: function BsResultBaskets_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "div", 0);
    } if (rf & 2) {
        i0.ɵɵclassMapInterpolate1("btn-group ", ctx.isInBaskets ? "sq-document-in-baskets" : "sq-document-not-in-baskets", "");
        i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction2(6, _c1, i0.ɵɵpureFunction1(4, _c0, ctx.basketsAction), ctx.rightAligned));
    } }, directives: [i3.BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsResultBaskets, [{
        type: Component,
        args: [{
                selector: 'sq-result-baskets',
                templateUrl: './result-baskets.html'
            }]
    }], function () { return [{ type: i1.ModalService }, { type: i2.BasketsService }, { type: i0.ChangeDetectorRef }]; }, { record: [{
            type: Input
        }], rightAligned: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LWJhc2tldHMuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9iYXNrZXRzLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL3Jlc3VsdC1iYXNrZXRzL3Jlc3VsdC1iYXNrZXRzLnRzIiwiYm9vdHN0cmFwL3Jlc3VsdC1iYXNrZXRzL3Jlc3VsdC1iYXNrZXRzLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTBELE1BQU0sZUFBZSxDQUFDO0FBS3pHLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7OztBQUVwRDs7O0dBR0c7QUFLSCxNQUFNLE9BQU8sZUFBZTtJQWF4QixZQUNZLFlBQTBCLEVBQzFCLGNBQThCLEVBQzlCLGlCQUFvQztRQUZwQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUU1QyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUN2RCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7WUFDakUsSUFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDO1lBQzFFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3JFLElBQUksQ0FBQyxtQkFBbUIsRUFB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Q0FBQyxNQUFNLEtBQUssQ0FBQztvQkFDdkIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztvQkFDdkQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUM7Z0JBQzVGLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztTQUNqQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs4RUExR1EsZUFBZTtvREFBZixlQUFlO1FDZjVCLHlCQUthOztRQUxSLHNIQUE2RjtRQUM5RiwrSEFJRTs7a0REVU8sZUFBZTtjQUozQixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsV0FBVyxFQUFFLHVCQUF1QjthQUN2Qzs0SEFFWSxNQUFNO2tCQUFkLEtBQUs7WUFDRyxZQUFZO2tCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBDaGFuZ2VEZXRlY3RvclJlZiwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFJlY29yZCB9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHsgTW9kYWxTZXJ2aWNlLCBNb2RhbFJlc3VsdCB9IGZyb20gXCJAc2luZXF1YS9jb3JlL21vZGFsXCI7XG5pbXBvcnQgeyBCYXNrZXRzU2VydmljZSwgQmFza2V0IH0gZnJvbSBcIi4uLy4uL2Jhc2tldHMuc2VydmljZVwiO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvYWN0aW9uXCI7XG5cbi8qKlxuICogQ29tcG9uZW50IHJlcHJlc2VudGluZyB0aGUgYWRkLXRvLWJhc2tldHMgYnV0dG9uIGluIG9uZSBpdGVtIG9mIHRoZSByZXN1bHQgbGlzdCB2aWV3LlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdzcS1yZXN1bHQtYmFza2V0cycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Jlc3VsdC1iYXNrZXRzLmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEJzUmVzdWx0QmFza2V0cyBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSByZWNvcmQ6IFJlY29yZDtcbiAgICBASW5wdXQoKSByaWdodEFsaWduZWQ6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgYmFza2V0c0FjdGlvbjogQWN0aW9uO1xuICAgIHByaXZhdGUgYWRkVG9CYXNrZXRBY3Rpb246IEFjdGlvbjtcbiAgICBwcml2YXRlIHJlbW92ZUZyb21CYXNrZXRBY3Rpb246IEFjdGlvbjtcbiAgICBwcml2YXRlIHJlbW92ZUZyb21BbGxCYXNrZXRzQWN0aW9uOiBBY3Rpb247XG5cbiAgICBwcml2YXRlIGJhc2tldHM6IHN0cmluZ1tdO1xuICAgIHByaXZhdGUgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBiYXNrZXRzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBiYXNrZXRzU2VydmljZTogQmFza2V0c1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIHRoaXMuYmFza2V0cyA9IFtdO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYWRkVG9CYXNrZXRBY3Rpb24gPSB0aGlzLmJ1aWxkQWRkVG9CYXNrZXRBY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbUJhc2tldEFjdGlvbiA9IHRoaXMuYnVpbGRSZW1vdmVGcm9tQmFza2V0QWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21BbGxCYXNrZXRzQWN0aW9uID0gdGhpcy5idWlsZFJlbW92YWxGcm9tQWxsQmFza2V0c0FjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5iYXNrZXRzU3Vic2NyaXB0aW9uID0gdGhpcy5iYXNrZXRzU2VydmljZS5jaGFuZ2VzLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVSZWNvcmRCYXNrZXRzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoVmlzdWFsaXphdGlvbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVSZWNvcmRCYXNrZXRzKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaFZpc3VhbGl6YXRpb24oKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuYmFza2V0c1N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5iYXNrZXRzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzSW5CYXNrZXRzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNrZXRzLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoVmlzdWFsaXphdGlvbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5iYXNrZXRzQWN0aW9uID0gdGhpcy5idWlsZEJhc2tldHNBY3Rpb24oKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVJlY29yZEJhc2tldHMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRCYXNrZXRzOiBCYXNrZXRbXSA9IHRoaXMuYmFza2V0c1NlcnZpY2UuYmFza2V0cztcbiAgICAgICAgdGhpcy5iYXNrZXRzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgYmFza2V0IG9mIGN1cnJlbnRCYXNrZXRzKSB7XG4gICAgICAgICAgICBpZiAoISFiYXNrZXQuaWRzICYmIGJhc2tldC5pZHMuaW5jbHVkZXModGhpcy5yZWNvcmQuaWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iYXNrZXRzLnB1c2goYmFza2V0Lm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZEFkZFRvQmFza2V0QWN0aW9uKCk6IEFjdGlvbiB7XG4gICAgICAgIHJldHVybiBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgIHRleHQ6ICdtc2cjYmFza2V0cy5hZGRUb0Jhc2tldCcsXG4gICAgICAgICAgICBhY3Rpb246IChpdGVtLCAkZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2tldHNTZXJ2aWNlLmFkZFRvQmFza2V0TW9kYWwodGhpcy5yZWNvcmQuaWQsIHRoaXMuYmFza2V0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYnVpbGRSZW1vdmVGcm9tQmFza2V0QWN0aW9uKCk6IEFjdGlvbiB7XG4gICAgICAgIHJldHVybiBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgIHRleHQ6ICdtc2cjYmFza2V0cy5yZW1vdmVGcm9tQmFza2V0JyxcbiAgICAgICAgICAgIGFjdGlvbjogKGl0ZW0sICRldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYmFza2V0c1NlcnZpY2UucmVtb3ZlRnJvbUJhc2tldE1vZGFsKHRoaXMucmVjb3JkLmlkLCB0aGlzLmJhc2tldHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJ1aWxkUmVtb3ZhbEZyb21BbGxCYXNrZXRzQWN0aW9uKCk6IEFjdGlvbiB7XG4gICAgICAgIHJldHVybiBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgIHRleHQ6ICdtc2cjYmFza2V0cy5yZW1vdmVGcm9tQWxsQmFza2V0cycsXG4gICAgICAgICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAueWVzTm8oXG4gICAgICAgICAgICAgICAgICAgICAgICAnbXNnI2Jhc2tldHMucmVtb3ZlRnJvbUFsbEJhc2tldHNDb25maXJtYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAge3ZhbHVlczoge2Jhc2tldHM6IHRoaXMuYmFza2V0cy5qb2luKCcsICcpfX0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBNb2RhbFJlc3VsdC5ZZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2tldHNTZXJ2aWNlLnJlbW92ZUZyb21BbGxCYXNrZXRzKHRoaXMucmVjb3JkLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYnVpbGRCYXNrZXRzQWN0aW9uKCk6IEFjdGlvbiB7XG4gICAgICAgIHJldHVybiBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgIGljb246ICdmYXMgZmEtc2hvcHBpbmctYmFza2V0JyxcbiAgICAgICAgICAgIHRpdGxlOiAnbXNnI2Jhc2tldHMuYmFza2V0cycsXG4gICAgICAgICAgICBjaGlsZHJlbjogdGhpcy5pc0luQmFza2V0c1xuICAgICAgICAgICAgICAgID8gdGhpcy5iYXNrZXRzLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgICAgICAgICA/IFt0aGlzLmFkZFRvQmFza2V0QWN0aW9uLCB0aGlzLnJlbW92ZUZyb21CYXNrZXRBY3Rpb25dXG4gICAgICAgICAgICAgICAgICAgIDogW3RoaXMuYWRkVG9CYXNrZXRBY3Rpb24sIHRoaXMucmVtb3ZlRnJvbUJhc2tldEFjdGlvbiwgdGhpcy5yZW1vdmVGcm9tQWxsQmFza2V0c0FjdGlvbl1cbiAgICAgICAgICAgICAgICA6IFt0aGlzLmFkZFRvQmFza2V0QWN0aW9uXVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIHt7IGlzSW5CYXNrZXRzID8gJ3NxLWRvY3VtZW50LWluLWJhc2tldHMnIDogJ3NxLWRvY3VtZW50LW5vdC1pbi1iYXNrZXRzJyB9fVwiXG4gICAgW3NxLWFjdGlvbi1idXR0b25zXT1cIntcbiAgICAgICAgaXRlbXM6IFtiYXNrZXRzQWN0aW9uXSxcbiAgICAgICAgYXV0b0FkanVzdDogdHJ1ZSxcbiAgICAgICAgcmlnaHRBbGlnbmVkOiByaWdodEFsaWduZWRcbiAgICB9XCI+PC9kaXY+XG4iXX0=