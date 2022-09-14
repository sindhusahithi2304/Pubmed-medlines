import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IntlModule } from "@sinequa/core/intl";
import { LoadComponentModule } from "@sinequa/core/load-component";
import { ValidationModule } from "@sinequa/core/validation";
import { UtilsModule } from "@sinequa/components/utils";
import { BsActionModule } from "@sinequa/components/action";
import { BsSelectionModule } from "@sinequa/components/selection";
import { RESULTS_VIEWS } from "../results-view.service";
import { BsResultsViewSelector } from "./results-view-selector/results-view-selector";
import { BsResultsGridView } from "./results-grid-view/results-grid-view";
import * as i0 from "@angular/core";
export class BsResultsViewModule {
    static forRoot(resultsViews, defaultView) {
        return {
            ngModule: BsResultsViewModule,
            providers: [
                {
                    provide: RESULTS_VIEWS,
                    useValue: resultsViews
                },
            ]
        };
    }
}
BsResultsViewModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsResultsViewModule });
BsResultsViewModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsResultsViewModule_Factory(t) { return new (t || BsResultsViewModule)(); }, imports: [[
            CommonModule,
            LoadComponentModule,
            IntlModule,
            ValidationModule,
            UtilsModule,
            BsActionModule,
            BsSelectionModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsResultsViewModule, { declarations: [BsResultsViewSelector,
        BsResultsGridView], imports: [CommonModule,
        LoadComponentModule,
        IntlModule,
        ValidationModule,
        UtilsModule,
        BsActionModule,
        BsSelectionModule], exports: [BsResultsViewSelector,
        BsResultsGridView] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsResultsViewModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    LoadComponentModule,
                    IntlModule,
                    ValidationModule,
                    UtilsModule,
                    BsActionModule,
                    BsSelectionModule
                ],
                declarations: [
                    BsResultsViewSelector,
                    BsResultsGridView,
                ],
                exports: [
                    BsResultsViewSelector,
                    BsResultsGridView,
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0cy12aWV3LW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3Jlc3VsdHMtdmlldy8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9yZXN1bHRzLXZpZXctbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQXNCLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFMUQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUVoRSxPQUFPLEVBQUMsYUFBYSxFQUFjLE1BQU0seUJBQXlCLENBQUM7QUFFbkUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sK0NBQStDLENBQUM7QUFDcEYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7O0FBdUJ4RSxNQUFNLE9BQU8sbUJBQW1CO0lBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBMkIsRUFBRSxXQUF3QjtRQUN2RSxPQUFPO1lBQ0gsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixTQUFTLEVBQUU7Z0JBQ1A7b0JBQ0ksT0FBTyxFQUFFLGFBQWE7b0JBQ3RCLFFBQVEsRUFBRSxZQUFZO2lCQUN6QjthQUtKO1NBQ0osQ0FBQztJQUNOLENBQUM7O3VEQWZRLG1CQUFtQjtxSEFBbkIsbUJBQW1CLGtCQXBCbkI7WUFDTCxZQUFZO1lBRVosbUJBQW1CO1lBQ25CLFVBQVU7WUFDVixnQkFBZ0I7WUFFaEIsV0FBVztZQUNYLGNBQWM7WUFDZCxpQkFBaUI7U0FDcEI7d0ZBVVEsbUJBQW1CLG1CQVJ4QixxQkFBcUI7UUFDckIsaUJBQWlCLGFBWmpCLFlBQVk7UUFFWixtQkFBbUI7UUFDbkIsVUFBVTtRQUNWLGdCQUFnQjtRQUVoQixXQUFXO1FBQ1gsY0FBYztRQUNkLGlCQUFpQixhQU9qQixxQkFBcUI7UUFDckIsaUJBQWlCO2tEQUdaLG1CQUFtQjtjQXJCL0IsUUFBUTtlQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUVaLG1CQUFtQjtvQkFDbkIsVUFBVTtvQkFDVixnQkFBZ0I7b0JBRWhCLFdBQVc7b0JBQ1gsY0FBYztvQkFDZCxpQkFBaUI7aUJBQ3BCO2dCQUNELFlBQVksRUFBRTtvQkFDVixxQkFBcUI7b0JBQ3JCLGlCQUFpQjtpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLHFCQUFxQjtvQkFDckIsaUJBQWlCO2lCQUNwQjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5cbmltcG9ydCB7SW50bE1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvaW50bFwiO1xuaW1wb3J0IHtMb2FkQ29tcG9uZW50TW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9sb2FkLWNvbXBvbmVudFwiO1xuaW1wb3J0IHtWYWxpZGF0aW9uTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS92YWxpZGF0aW9uXCI7XG5cbmltcG9ydCB7VXRpbHNNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3V0aWxzXCI7XG5pbXBvcnQge0JzQWN0aW9uTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9hY3Rpb25cIjtcbmltcG9ydCB7QnNTZWxlY3Rpb25Nb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3NlbGVjdGlvblwiO1xuXG5pbXBvcnQge1JFU1VMVFNfVklFV1MsIFJlc3VsdHNWaWV3fSBmcm9tIFwiLi4vcmVzdWx0cy12aWV3LnNlcnZpY2VcIjtcblxuaW1wb3J0IHtCc1Jlc3VsdHNWaWV3U2VsZWN0b3J9IGZyb20gXCIuL3Jlc3VsdHMtdmlldy1zZWxlY3Rvci9yZXN1bHRzLXZpZXctc2VsZWN0b3JcIjtcbmltcG9ydCB7QnNSZXN1bHRzR3JpZFZpZXd9IGZyb20gXCIuL3Jlc3VsdHMtZ3JpZC12aWV3L3Jlc3VsdHMtZ3JpZC12aWV3XCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG5cbiAgICAgICAgTG9hZENvbXBvbmVudE1vZHVsZSxcbiAgICAgICAgSW50bE1vZHVsZSxcbiAgICAgICAgVmFsaWRhdGlvbk1vZHVsZSxcblxuICAgICAgICBVdGlsc01vZHVsZSxcbiAgICAgICAgQnNBY3Rpb25Nb2R1bGUsXG4gICAgICAgIEJzU2VsZWN0aW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQnNSZXN1bHRzVmlld1NlbGVjdG9yLFxuICAgICAgICBCc1Jlc3VsdHNHcmlkVmlldyxcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgQnNSZXN1bHRzVmlld1NlbGVjdG9yLFxuICAgICAgICBCc1Jlc3VsdHNHcmlkVmlldyxcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBCc1Jlc3VsdHNWaWV3TW9kdWxlIHtcbiAgICBwdWJsaWMgc3RhdGljIGZvclJvb3QocmVzdWx0c1ZpZXdzOiBSZXN1bHRzVmlld1tdLCBkZWZhdWx0VmlldzogUmVzdWx0c1ZpZXcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEJzUmVzdWx0c1ZpZXdNb2R1bGU+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBCc1Jlc3VsdHNWaWV3TW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBSRVNVTFRTX1ZJRVdTLFxuICAgICAgICAgICAgICAgICAgICB1c2VWYWx1ZTogcmVzdWx0c1ZpZXdzXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgLyogIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogREVGQVVMVF9WSUVXLFxuICAgICAgICAgICAgICAgICAgICB1c2VWYWx1ZTogZGVmYXVsdFZpZXdcbiAgICAgICAgICAgICAgICB9ICovXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19