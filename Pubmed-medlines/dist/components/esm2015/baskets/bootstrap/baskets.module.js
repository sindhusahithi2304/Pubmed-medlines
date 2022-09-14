import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { IntlModule } from "@sinequa/core/intl";
import { ValidationModule } from "@sinequa/core/validation";
import { UtilsModule } from "@sinequa/components/utils";
import { BsSelectionModule } from "@sinequa/components/selection";
import { BsModalModule } from "@sinequa/components/modal";
import { BsActionModule } from "@sinequa/components/action";
import { BASKET_COMPONENTS } from "../baskets.service";
import { BsEditBasket } from "./edit-basket/edit-basket";
import { BsManageBaskets } from "./manage-baskets/manage-baskets";
import { BsSelectBasket } from "./select-basket/select-basket";
import { BsResultBaskets } from "./result-baskets/result-baskets";
import { BsBasketsMenuComponent } from "./baskets-menu/baskets-menu.component";
import { BsFacetBasketsComponent } from './facet-baskets/facet-baskets.component';
import { RouterModule } from '@angular/router';
import * as i0 from "@angular/core";
export class BsBasketsModule {
}
BsBasketsModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsBasketsModule });
BsBasketsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsBasketsModule_Factory(t) { return new (t || BsBasketsModule)(); }, providers: [
        {
            provide: BASKET_COMPONENTS,
            useValue: {
                selectBasketModal: BsSelectBasket,
                editBasketModal: BsEditBasket,
                manageBasketsModal: BsManageBaskets
            }
        }
    ], imports: [[
            CommonModule,
            FormsModule, ReactiveFormsModule,
            DragDropModule,
            RouterModule,
            BsModalModule,
            IntlModule,
            ValidationModule,
            UtilsModule,
            BsSelectionModule,
            BsActionModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsBasketsModule, { declarations: [BsEditBasket, BsManageBaskets, BsSelectBasket,
        BsResultBaskets, BsBasketsMenuComponent,
        BsFacetBasketsComponent], imports: [CommonModule,
        FormsModule, ReactiveFormsModule,
        DragDropModule,
        RouterModule,
        BsModalModule,
        IntlModule,
        ValidationModule,
        UtilsModule,
        BsSelectionModule,
        BsActionModule], exports: [BsEditBasket, BsManageBaskets, BsSelectBasket,
        BsResultBaskets, BsBasketsMenuComponent,
        BsFacetBasketsComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsBasketsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule, ReactiveFormsModule,
                    DragDropModule,
                    RouterModule,
                    BsModalModule,
                    IntlModule,
                    ValidationModule,
                    UtilsModule,
                    BsSelectionModule,
                    BsActionModule
                ],
                declarations: [
                    BsEditBasket, BsManageBaskets, BsSelectBasket,
                    BsResultBaskets, BsBasketsMenuComponent,
                    BsFacetBasketsComponent
                ],
                exports: [
                    BsEditBasket, BsManageBaskets, BsSelectBasket,
                    BsResultBaskets, BsBasketsMenuComponent,
                    BsFacetBasketsComponent
                ],
                providers: [
                    {
                        provide: BASKET_COMPONENTS,
                        useValue: {
                            selectBasketModal: BsSelectBasket,
                            editBasketModal: BsEditBasket,
                            manageBasketsModal: BsManageBaskets
                        }
                    }
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFza2V0cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9iYXNrZXRzLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2Jhc2tldHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFdEQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRTFELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRTFELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNoRSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBc0M3QyxNQUFNLE9BQU8sZUFBZTs7bURBQWYsZUFBZTs2R0FBZixlQUFlLG1CQVhiO1FBQ1A7WUFDSSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFFBQVEsRUFBRTtnQkFDTixpQkFBaUIsRUFBRSxjQUFjO2dCQUNqQyxlQUFlLEVBQUUsWUFBWTtnQkFDN0Isa0JBQWtCLEVBQUUsZUFBZTthQUN0QztTQUNKO0tBQ0osWUFqQ1E7WUFDTCxZQUFZO1lBQ1osV0FBVyxFQUFFLG1CQUFtQjtZQUNoQyxjQUFjO1lBQ2QsWUFBWTtZQUVaLGFBQWE7WUFDYixVQUFVO1lBQ1YsZ0JBQWdCO1lBRWhCLFdBQVc7WUFDWCxpQkFBaUI7WUFDakIsY0FBYztTQUNqQjt3RkFzQlEsZUFBZSxtQkFwQnBCLFlBQVksRUFBRSxlQUFlLEVBQUUsY0FBYztRQUM3QyxlQUFlLEVBQUUsc0JBQXNCO1FBQ3ZDLHVCQUF1QixhQWhCdkIsWUFBWTtRQUNaLFdBQVcsRUFBRSxtQkFBbUI7UUFDaEMsY0FBYztRQUNkLFlBQVk7UUFFWixhQUFhO1FBQ2IsVUFBVTtRQUNWLGdCQUFnQjtRQUVoQixXQUFXO1FBQ1gsaUJBQWlCO1FBQ2pCLGNBQWMsYUFRZCxZQUFZLEVBQUUsZUFBZSxFQUFFLGNBQWM7UUFDN0MsZUFBZSxFQUFFLHNCQUFzQjtRQUN2Qyx1QkFBdUI7a0RBYWxCLGVBQWU7Y0FwQzNCLFFBQVE7ZUFBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixXQUFXLEVBQUUsbUJBQW1CO29CQUNoQyxjQUFjO29CQUNkLFlBQVk7b0JBRVosYUFBYTtvQkFDYixVQUFVO29CQUNWLGdCQUFnQjtvQkFFaEIsV0FBVztvQkFDWCxpQkFBaUI7b0JBQ2pCLGNBQWM7aUJBQ2pCO2dCQUNELFlBQVksRUFBRTtvQkFDVixZQUFZLEVBQUUsZUFBZSxFQUFFLGNBQWM7b0JBQzdDLGVBQWUsRUFBRSxzQkFBc0I7b0JBQ3ZDLHVCQUF1QjtpQkFDMUI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLFlBQVksRUFBRSxlQUFlLEVBQUUsY0FBYztvQkFDN0MsZUFBZSxFQUFFLHNCQUFzQjtvQkFDdkMsdUJBQXVCO2lCQUMxQjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1A7d0JBQ0ksT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsUUFBUSxFQUFFOzRCQUNOLGlCQUFpQixFQUFFLGNBQWM7NEJBQ2pDLGVBQWUsRUFBRSxZQUFZOzRCQUM3QixrQkFBa0IsRUFBRSxlQUFlO3lCQUN0QztxQkFDSjtpQkFDSjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7RHJhZ0Ryb3BNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jZGsvZHJhZy1kcm9wXCI7XG5cbmltcG9ydCB7SW50bE1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvaW50bFwiO1xuaW1wb3J0IHtWYWxpZGF0aW9uTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS92YWxpZGF0aW9uXCI7XG5cbmltcG9ydCB7VXRpbHNNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3V0aWxzXCI7XG5pbXBvcnQge0JzU2VsZWN0aW9uTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9zZWxlY3Rpb25cIjtcbmltcG9ydCB7QnNNb2RhbE1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvbW9kYWxcIjtcbmltcG9ydCB7QnNBY3Rpb25Nb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2FjdGlvblwiO1xuXG5pbXBvcnQge0JBU0tFVF9DT01QT05FTlRTfSBmcm9tIFwiLi4vYmFza2V0cy5zZXJ2aWNlXCI7XG5pbXBvcnQge0JzRWRpdEJhc2tldH0gZnJvbSBcIi4vZWRpdC1iYXNrZXQvZWRpdC1iYXNrZXRcIjtcbmltcG9ydCB7QnNNYW5hZ2VCYXNrZXRzfSBmcm9tIFwiLi9tYW5hZ2UtYmFza2V0cy9tYW5hZ2UtYmFza2V0c1wiO1xuaW1wb3J0IHtCc1NlbGVjdEJhc2tldH0gZnJvbSBcIi4vc2VsZWN0LWJhc2tldC9zZWxlY3QtYmFza2V0XCI7XG5pbXBvcnQge0JzUmVzdWx0QmFza2V0c30gZnJvbSBcIi4vcmVzdWx0LWJhc2tldHMvcmVzdWx0LWJhc2tldHNcIjtcbmltcG9ydCB7QnNCYXNrZXRzTWVudUNvbXBvbmVudH0gZnJvbSBcIi4vYmFza2V0cy1tZW51L2Jhc2tldHMtbWVudS5jb21wb25lbnRcIjtcbmltcG9ydCB7QnNGYWNldEJhc2tldHNDb21wb25lbnR9IGZyb20gJy4vZmFjZXQtYmFza2V0cy9mYWNldC1iYXNrZXRzLmNvbXBvbmVudCc7XG5pbXBvcnQge1JvdXRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIERyYWdEcm9wTW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGUsXG5cbiAgICAgICAgQnNNb2RhbE1vZHVsZSxcbiAgICAgICAgSW50bE1vZHVsZSxcbiAgICAgICAgVmFsaWRhdGlvbk1vZHVsZSxcblxuICAgICAgICBVdGlsc01vZHVsZSxcbiAgICAgICAgQnNTZWxlY3Rpb25Nb2R1bGUsXG4gICAgICAgIEJzQWN0aW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQnNFZGl0QmFza2V0LCBCc01hbmFnZUJhc2tldHMsIEJzU2VsZWN0QmFza2V0LFxuICAgICAgICBCc1Jlc3VsdEJhc2tldHMsIEJzQmFza2V0c01lbnVDb21wb25lbnQsXG4gICAgICAgIEJzRmFjZXRCYXNrZXRzQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEJzRWRpdEJhc2tldCwgQnNNYW5hZ2VCYXNrZXRzLCBCc1NlbGVjdEJhc2tldCxcbiAgICAgICAgQnNSZXN1bHRCYXNrZXRzLCBCc0Jhc2tldHNNZW51Q29tcG9uZW50LFxuICAgICAgICBCc0ZhY2V0QmFza2V0c0NvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IEJBU0tFVF9DT01QT05FTlRTLFxuICAgICAgICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgICAgICAgICBzZWxlY3RCYXNrZXRNb2RhbDogQnNTZWxlY3RCYXNrZXQsXG4gICAgICAgICAgICAgICAgZWRpdEJhc2tldE1vZGFsOiBCc0VkaXRCYXNrZXQsXG4gICAgICAgICAgICAgICAgbWFuYWdlQmFza2V0c01vZGFsOiBCc01hbmFnZUJhc2tldHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQnNCYXNrZXRzTW9kdWxlIHtcbn1cbiJdfQ==