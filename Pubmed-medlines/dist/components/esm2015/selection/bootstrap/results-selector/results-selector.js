import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "../../selection.service";
import * as i2 from "@sinequa/components/action";
const _c0 = function (a0, a1, a2, a3) { return { items: a0, size: a1, style: a2, rightAligned: a3 }; };
export class BsResultsSelector {
    constructor(selectionService) {
        this.selectionService = selectionService;
    }
    get actions() {
        return this.rightAligned ? this.selectionService.selectionActions.slice().reverse() : this.selectionService.selectionActions;
    }
}
BsResultsSelector.ɵfac = function BsResultsSelector_Factory(t) { return new (t || BsResultsSelector)(i0.ɵɵdirectiveInject(i1.SelectionService)); };
BsResultsSelector.ɵcmp = i0.ɵɵdefineComponent({ type: BsResultsSelector, selectors: [["sq-results-selector"]], inputs: { size: "size", style: "style", rightAligned: "rightAligned" }, decls: 1, vars: 6, consts: [[1, "btn-group", 3, "sq-action-buttons"]], template: function BsResultsSelector_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction4(1, _c0, ctx.actions, ctx.size, ctx.style, ctx.rightAligned));
    } }, directives: [i2.BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsResultsSelector, [{
        type: Component,
        args: [{
                selector: "sq-results-selector",
                templateUrl: "./results-selector.html"
            }]
    }], function () { return [{ type: i1.SelectionService }]; }, { size: [{
            type: Input
        }], style: [{
            type: Input
        }], rightAligned: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0cy1zZWxlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NlbGVjdGlvbi8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9yZXN1bHRzLXNlbGVjdG9yL3Jlc3VsdHMtc2VsZWN0b3IudHMiLCJib290c3RyYXAvcmVzdWx0cy1zZWxlY3Rvci9yZXN1bHRzLXNlbGVjdG9yLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7O0FBUS9DLE1BQU0sT0FBTyxpQkFBaUI7SUFLMUIsWUFDVyxnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUM3QyxDQUFDO0lBRUQsSUFBVyxPQUFPO1FBQ2QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQztJQUNoSSxDQUFDOztrRkFYUSxpQkFBaUI7c0RBQWpCLGlCQUFpQjtRQ1I5Qix5QkFBMEg7O1FBQW5HLGtIQUE0Rjs7a0REUXRHLGlCQUFpQjtjQUo3QixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsV0FBVyxFQUFFLHlCQUF5QjthQUN6QzttRUFFWSxJQUFJO2tCQUFaLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxZQUFZO2tCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtTZWxlY3Rpb25TZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VsZWN0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7QWN0aW9ufSBmcm9tICdAc2luZXF1YS9jb21wb25lbnRzL2FjdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLXJlc3VsdHMtc2VsZWN0b3JcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3Jlc3VsdHMtc2VsZWN0b3IuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEJzUmVzdWx0c1NlbGVjdG9yIHtcbiAgICBASW5wdXQoKSBzaXplOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc3R5bGU6IHN0cmluZztcbiAgICBASW5wdXQoKSByaWdodEFsaWduZWQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHNlbGVjdGlvblNlcnZpY2U6IFNlbGVjdGlvblNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGFjdGlvbnMoKTogQWN0aW9uW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5yaWdodEFsaWduZWQ/IHRoaXMuc2VsZWN0aW9uU2VydmljZS5zZWxlY3Rpb25BY3Rpb25zLnNsaWNlKCkucmV2ZXJzZSgpIDogdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdGlvbkFjdGlvbnM7XG4gICAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIFtzcS1hY3Rpb24tYnV0dG9uc109XCJ7aXRlbXM6IGFjdGlvbnMsIHNpemU6IHNpemUsIHN0eWxlOiBzdHlsZSwgcmlnaHRBbGlnbmVkOiByaWdodEFsaWduZWR9XCI+PC9kaXY+Il19