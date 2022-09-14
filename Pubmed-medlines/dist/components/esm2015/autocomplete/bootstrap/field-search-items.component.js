import { Component, EventEmitter, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function BsFieldSearchItemsComponent_span_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 1);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "span", 2);
    i0.ɵɵlistener("click", function BsFieldSearchItemsComponent_span_0_Template_span_click_2_listener() { i0.ɵɵrestoreView(_r3); const item_r1 = ctx.$implicit; const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.removeItem(item_r1); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵproperty("ngClass", item_r1.category);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r1.display, " ");
} }
export class BsFieldSearchItemsComponent {
    constructor(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.itemRemoved = new EventEmitter();
        this.items = [];
    }
    update(items) {
        this.items = items;
        this.changeDetectorRef.markForCheck();
    }
    removeItem(item) {
        this.itemRemoved.next(item);
        this.changeDetectorRef.markForCheck();
    }
}
BsFieldSearchItemsComponent.ɵfac = function BsFieldSearchItemsComponent_Factory(t) { return new (t || BsFieldSearchItemsComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
BsFieldSearchItemsComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsFieldSearchItemsComponent, selectors: [["sq-field-search-items"]], outputs: { itemRemoved: "itemRemoved" }, decls: 1, vars: 1, consts: [["class", "badge badge-pill badge-info align-self-center mr-1", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "badge", "badge-pill", "badge-info", "align-self-center", "mr-1", 3, "ngClass"], [1, "fas", "fa-times-circle", "clickable", 3, "click"]], template: function BsFieldSearchItemsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsFieldSearchItemsComponent_span_0_Template, 3, 2, "span", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngForOf", ctx.items);
    } }, directives: [i1.NgForOf, i1.NgClass], styles: ["[_nghost-%COMP%] {\n    display: flex;\n}\n.clickable[_ngcontent-%COMP%] {\n    cursor: pointer;\n}\n.clickable[_ngcontent-%COMP%]:hover {\n    opacity: 85%;\n}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsFieldSearchItemsComponent, [{
        type: Component,
        args: [{
                selector: "sq-field-search-items",
                template: `
<span *ngFor="let item of items" class="badge badge-pill badge-info align-self-center mr-1" [ngClass]="item.category">
    {{item.display}} <span class="fas fa-times-circle clickable" (click)="removeItem(item)"></span>
</span>
`,
                styles: [`
:host {
    display: flex;
}
.clickable {
    cursor: pointer;
}
.clickable:hover {
    opacity: 85%;
}
`]
            }]
    }], function () { return [{ type: i0.ChangeDetectorRef }]; }, { itemRemoved: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtc2VhcmNoLWl0ZW1zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9maWVsZC1zZWFyY2gtaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBcUIsTUFBTSxlQUFlLENBQUM7Ozs7O0lBT25GLCtCQUNJO0lBQUEsWUFBaUI7SUFBQSwrQkFBdUU7SUFBM0Isb09BQTBCO0lBQUMsaUJBQU87SUFDbkcsaUJBQU87OztJQUZxRiwwQ0FBeUI7SUFDakgsZUFBaUI7SUFBakIsZ0RBQWlCOztBQWVyQixNQUFNLE9BQU8sMkJBQTJCO0lBS3BDLFlBQXNCLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBSmhELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7UUFFN0QsVUFBSyxHQUF1QixFQUFFLENBQUM7SUFHL0IsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUF5QjtRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFzQjtRQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUMsQ0FBQzs7c0dBaEJRLDJCQUEyQjtnRUFBM0IsMkJBQTJCO1FBaEJ4Qyw4RUFFTzs7UUFGZ0IsbUNBQVE7O2tEQWdCbEIsMkJBQTJCO2NBbkJ2QyxTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsUUFBUSxFQUFFOzs7O0NBSWI7Z0JBQ0csTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Q0FVWixDQUFDO2FBQ0Q7b0VBRWEsV0FBVztrQkFBcEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdXRvY29tcGxldGVJdGVtIH0gZnJvbSAnLi4vYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGaWVsZFNlYXJjaEl0ZW1zQ29udGFpbmVyIH0gZnJvbSAnLi4vYXV0b2NvbXBsZXRlLWZpZWxkLXNlYXJjaC5kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1maWVsZC1zZWFyY2gtaXRlbXNcIixcbiAgICB0ZW1wbGF0ZTogYFxuPHNwYW4gKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtaW5mbyBhbGlnbi1zZWxmLWNlbnRlciBtci0xXCIgW25nQ2xhc3NdPVwiaXRlbS5jYXRlZ29yeVwiPlxuICAgIHt7aXRlbS5kaXNwbGF5fX0gPHNwYW4gY2xhc3M9XCJmYXMgZmEtdGltZXMtY2lyY2xlIGNsaWNrYWJsZVwiIChjbGljayk9XCJyZW1vdmVJdGVtKGl0ZW0pXCI+PC9zcGFuPlxuPC9zcGFuPlxuYCxcbiAgICBzdHlsZXM6IFtgXG46aG9zdCB7XG4gICAgZGlzcGxheTogZmxleDtcbn1cbi5jbGlja2FibGUge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5jbGlja2FibGU6aG92ZXIge1xuICAgIG9wYWNpdHk6IDg1JTtcbn1cbmBdXG59KVxuZXhwb3J0IGNsYXNzIEJzRmllbGRTZWFyY2hJdGVtc0NvbXBvbmVudCBpbXBsZW1lbnRzIEZpZWxkU2VhcmNoSXRlbXNDb250YWluZXIge1xuICAgIEBPdXRwdXQoKSBpdGVtUmVtb3ZlZCA9IG5ldyBFdmVudEVtaXR0ZXI8QXV0b2NvbXBsZXRlSXRlbT4oKTtcblxuICAgIGl0ZW1zOiBBdXRvY29tcGxldGVJdGVtW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB9XG5cbiAgICB1cGRhdGUoaXRlbXM6IEF1dG9jb21wbGV0ZUl0ZW1bXSk6IHZvaWQge1xuICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlSXRlbShpdGVtOiBBdXRvY29tcGxldGVJdGVtKSB7XG4gICAgICAgIHRoaXMuaXRlbVJlbW92ZWQubmV4dChpdGVtKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbn1cbiJdfQ==