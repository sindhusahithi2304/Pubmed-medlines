import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IntlModule } from "@sinequa/core/intl";
import { BsActionModule } from "@sinequa/components/action";
import { BsResultsSelector } from "./results-selector/results-selector";
import { BsResultSelector } from "./result-selector/result-selector";
import { BsSelectionArranger } from "./selection-arranger/selection-arranger.component";
import { SELECTION_OPTIONS, defaultSelectionOptions } from "../selection.service";
import * as i0 from "@angular/core";
export class BsSelectionModule {
}
BsSelectionModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsSelectionModule });
BsSelectionModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsSelectionModule_Factory(t) { return new (t || BsSelectionModule)(); }, providers: [
        { provide: SELECTION_OPTIONS, useValue: defaultSelectionOptions }
    ], imports: [[
            CommonModule,
            DragDropModule,
            IntlModule,
            BsActionModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsSelectionModule, { declarations: [BsResultsSelector, BsResultSelector, BsSelectionArranger], imports: [CommonModule,
        DragDropModule,
        IntlModule,
        BsActionModule], exports: [BsResultsSelector, BsResultSelector, BsSelectionArranger] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsSelectionModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    DragDropModule,
                    IntlModule,
                    BsActionModule,
                ],
                declarations: [
                    BsResultsSelector, BsResultSelector, BsSelectionArranger
                ],
                exports: [
                    BsResultsSelector, BsResultSelector, BsSelectionArranger
                ],
                providers: [
                    { provide: SELECTION_OPTIONS, useValue: defaultSelectionOptions }
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NlbGVjdGlvbi8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9zZWxlY3Rpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFaEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQXFCbEYsTUFBTSxPQUFPLGlCQUFpQjs7cURBQWpCLGlCQUFpQjtpSEFBakIsaUJBQWlCLG1CQUpmO1FBQ1AsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFDO0tBQ2xFLFlBaEJRO1lBQ0wsWUFBWTtZQUNaLGNBQWM7WUFFZCxVQUFVO1lBRVYsY0FBYztTQUNqQjt3RkFXUSxpQkFBaUIsbUJBVHRCLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixhQVJ4RCxZQUFZO1FBQ1osY0FBYztRQUVkLFVBQVU7UUFFVixjQUFjLGFBTWQsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsbUJBQW1CO2tEQU1uRCxpQkFBaUI7Y0FuQjdCLFFBQVE7ZUFBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixjQUFjO29CQUVkLFVBQVU7b0JBRVYsY0FBYztpQkFDakI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLG1CQUFtQjtpQkFDM0Q7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLG1CQUFtQjtpQkFDM0Q7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBQztpQkFDbEU7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IERyYWdEcm9wTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5cbmltcG9ydCB7IEludGxNb2R1bGUgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9pbnRsXCI7XG5cbmltcG9ydCB7IEJzQWN0aW9uTW9kdWxlIH0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvYWN0aW9uXCI7XG5cbmltcG9ydCB7IEJzUmVzdWx0c1NlbGVjdG9yIH0gZnJvbSBcIi4vcmVzdWx0cy1zZWxlY3Rvci9yZXN1bHRzLXNlbGVjdG9yXCI7XG5pbXBvcnQgeyBCc1Jlc3VsdFNlbGVjdG9yIH0gZnJvbSBcIi4vcmVzdWx0LXNlbGVjdG9yL3Jlc3VsdC1zZWxlY3RvclwiO1xuaW1wb3J0IHsgQnNTZWxlY3Rpb25BcnJhbmdlciB9IGZyb20gXCIuL3NlbGVjdGlvbi1hcnJhbmdlci9zZWxlY3Rpb24tYXJyYW5nZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTRUxFQ1RJT05fT1BUSU9OUywgZGVmYXVsdFNlbGVjdGlvbk9wdGlvbnMgfSBmcm9tIFwiLi4vc2VsZWN0aW9uLnNlcnZpY2VcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRHJhZ0Ryb3BNb2R1bGUsXG5cbiAgICAgICAgSW50bE1vZHVsZSxcblxuICAgICAgICBCc0FjdGlvbk1vZHVsZSxcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBCc1Jlc3VsdHNTZWxlY3RvciwgQnNSZXN1bHRTZWxlY3RvciwgQnNTZWxlY3Rpb25BcnJhbmdlclxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBCc1Jlc3VsdHNTZWxlY3RvciwgQnNSZXN1bHRTZWxlY3RvciwgQnNTZWxlY3Rpb25BcnJhbmdlclxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBTRUxFQ1RJT05fT1BUSU9OUywgdXNlVmFsdWU6IGRlZmF1bHRTZWxlY3Rpb25PcHRpb25zfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQnNTZWxlY3Rpb25Nb2R1bGUge1xufVxuIl19