import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { RouterModule } from '@angular/router';
import { IntlModule } from "@sinequa/core/intl";
import { ValidationModule } from "@sinequa/core/validation";
import { UtilsModule } from "@sinequa/components/utils";
import { BsSelectionModule } from "@sinequa/components/selection";
import { BsModalModule } from "@sinequa/components/modal";
import { BsActionModule } from "@sinequa/components/action";
import { SAVEDQUERY_COMPONENTS } from "../saved-queries.service";
import { BsEditSavedQuery } from "./edit-saved-query/edit-saved-query";
import { BsManageSavedQueries } from "./manage-saved-queries/manage-saved-queries";
import { BsExportQuery } from "./export-query/export-query";
import { BsQueryExporter } from "./query-exporter/query-exporter";
import { BsSavedQueriesMenuComponent } from "./saved-queries-menu/saved-queries-menu.component";
import { BsFacetSavedQueries } from "./facet-saved-queries/facet-saved-queries";
import { BsFacetRecentQueries } from "./facet-recent-queries/facet-recent-queries";
import { BsFacetRecentDocuments } from "./facet-recent-documents/facet-recent-documents";
import * as i0 from "@angular/core";
export class BsSavedQueriesModule {
}
BsSavedQueriesModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsSavedQueriesModule });
BsSavedQueriesModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsSavedQueriesModule_Factory(t) { return new (t || BsSavedQueriesModule)(); }, providers: [
        {
            provide: SAVEDQUERY_COMPONENTS,
            useValue: {
                editSavedQueryModal: BsEditSavedQuery,
                manageSavedQueriesModal: BsManageSavedQueries,
                exportSavedQueryModal: BsExportQuery
            }
        }
    ], imports: [[
            CommonModule,
            FormsModule, ReactiveFormsModule,
            DragDropModule,
            BsModalModule,
            IntlModule,
            ValidationModule,
            RouterModule,
            BsSelectionModule,
            BsModalModule,
            UtilsModule,
            BsActionModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsSavedQueriesModule, { declarations: [BsEditSavedQuery, BsManageSavedQueries,
        BsExportQuery, BsQueryExporter, BsSavedQueriesMenuComponent,
        BsFacetSavedQueries, BsFacetRecentQueries, BsFacetRecentDocuments], imports: [CommonModule,
        FormsModule, ReactiveFormsModule,
        DragDropModule,
        BsModalModule,
        IntlModule,
        ValidationModule,
        RouterModule,
        BsSelectionModule,
        BsModalModule,
        UtilsModule,
        BsActionModule], exports: [BsEditSavedQuery, BsManageSavedQueries,
        BsExportQuery, BsQueryExporter, BsSavedQueriesMenuComponent,
        BsFacetSavedQueries, BsFacetRecentQueries, BsFacetRecentDocuments] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsSavedQueriesModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule, ReactiveFormsModule,
                    DragDropModule,
                    BsModalModule,
                    IntlModule,
                    ValidationModule,
                    RouterModule,
                    BsSelectionModule,
                    BsModalModule,
                    UtilsModule,
                    BsActionModule
                ],
                declarations: [
                    BsEditSavedQuery, BsManageSavedQueries,
                    BsExportQuery, BsQueryExporter, BsSavedQueriesMenuComponent,
                    BsFacetSavedQueries, BsFacetRecentQueries, BsFacetRecentDocuments
                ],
                exports: [
                    BsEditSavedQuery, BsManageSavedQueries,
                    BsExportQuery, BsQueryExporter, BsSavedQueriesMenuComponent,
                    BsFacetSavedQueries, BsFacetRecentQueries, BsFacetRecentDocuments
                ],
                providers: [
                    {
                        provide: SAVEDQUERY_COMPONENTS,
                        useValue: {
                            editSavedQueryModal: BsEditSavedQuery,
                            manageSavedQueriesModal: BsManageSavedQueries,
                            exportSavedQueryModal: BsExportQuery
                        }
                    }
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZWQtcXVlcmllcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zYXZlZC1xdWVyaWVzLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL3NhdmVkLXF1ZXJpZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUUxRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUUxRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUNqRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQzlGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzlFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGlEQUFpRCxDQUFDOztBQXdDdkYsTUFBTSxPQUFPLG9CQUFvQjs7d0RBQXBCLG9CQUFvQjt1SEFBcEIsb0JBQW9CLG1CQVhsQjtRQUNQO1lBQ0ksT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixRQUFRLEVBQUU7Z0JBQ04sbUJBQW1CLEVBQUUsZ0JBQWdCO2dCQUNyQyx1QkFBdUIsRUFBRSxvQkFBb0I7Z0JBQzdDLHFCQUFxQixFQUFFLGFBQWE7YUFDdkM7U0FDSjtLQUNKLFlBbkNRO1lBQ0wsWUFBWTtZQUNaLFdBQVcsRUFBRSxtQkFBbUI7WUFDaEMsY0FBYztZQUVkLGFBQWE7WUFFYixVQUFVO1lBQ1YsZ0JBQWdCO1lBQ2hCLFlBQVk7WUFFWixpQkFBaUI7WUFDakIsYUFBYTtZQUNiLFdBQVc7WUFDWCxjQUFjO1NBQ2pCO3dGQXNCUSxvQkFBb0IsbUJBcEJ6QixnQkFBZ0IsRUFBRSxvQkFBb0I7UUFDdEMsYUFBYSxFQUFFLGVBQWUsRUFBRSwyQkFBMkI7UUFDM0QsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsc0JBQXNCLGFBbEJqRSxZQUFZO1FBQ1osV0FBVyxFQUFFLG1CQUFtQjtRQUNoQyxjQUFjO1FBRWQsYUFBYTtRQUViLFVBQVU7UUFDVixnQkFBZ0I7UUFDaEIsWUFBWTtRQUVaLGlCQUFpQjtRQUNqQixhQUFhO1FBQ2IsV0FBVztRQUNYLGNBQWMsYUFRZCxnQkFBZ0IsRUFBRSxvQkFBb0I7UUFDdEMsYUFBYSxFQUFFLGVBQWUsRUFBRSwyQkFBMkI7UUFDM0QsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsc0JBQXNCO2tEQWE1RCxvQkFBb0I7Y0F0Q2hDLFFBQVE7ZUFBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixXQUFXLEVBQUUsbUJBQW1CO29CQUNoQyxjQUFjO29CQUVkLGFBQWE7b0JBRWIsVUFBVTtvQkFDVixnQkFBZ0I7b0JBQ2hCLFlBQVk7b0JBRVosaUJBQWlCO29CQUNqQixhQUFhO29CQUNiLFdBQVc7b0JBQ1gsY0FBYztpQkFDakI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLGdCQUFnQixFQUFFLG9CQUFvQjtvQkFDdEMsYUFBYSxFQUFFLGVBQWUsRUFBRSwyQkFBMkI7b0JBQzNELG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLHNCQUFzQjtpQkFDcEU7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGdCQUFnQixFQUFFLG9CQUFvQjtvQkFDdEMsYUFBYSxFQUFFLGVBQWUsRUFBRSwyQkFBMkI7b0JBQzNELG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLHNCQUFzQjtpQkFDcEU7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQO3dCQUNJLE9BQU8sRUFBRSxxQkFBcUI7d0JBQzlCLFFBQVEsRUFBRTs0QkFDTixtQkFBbUIsRUFBRSxnQkFBZ0I7NEJBQ3JDLHVCQUF1QixFQUFFLG9CQUFvQjs0QkFDN0MscUJBQXFCLEVBQUUsYUFBYTt5QkFDdkM7cUJBQ0o7aUJBQ0o7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge0RyYWdEcm9wTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY2RrL2RyYWctZHJvcFwiO1xuaW1wb3J0IHtSb3V0ZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7SW50bE1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvaW50bFwiO1xuaW1wb3J0IHtWYWxpZGF0aW9uTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS92YWxpZGF0aW9uXCI7XG5cbmltcG9ydCB7VXRpbHNNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3V0aWxzXCI7XG5pbXBvcnQge0JzU2VsZWN0aW9uTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9zZWxlY3Rpb25cIjtcbmltcG9ydCB7QnNNb2RhbE1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvbW9kYWxcIjtcbmltcG9ydCB7QnNBY3Rpb25Nb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2FjdGlvblwiO1xuXG5pbXBvcnQge1NBVkVEUVVFUllfQ09NUE9ORU5UU30gZnJvbSBcIi4uL3NhdmVkLXF1ZXJpZXMuc2VydmljZVwiO1xuaW1wb3J0IHtCc0VkaXRTYXZlZFF1ZXJ5fSBmcm9tIFwiLi9lZGl0LXNhdmVkLXF1ZXJ5L2VkaXQtc2F2ZWQtcXVlcnlcIjtcbmltcG9ydCB7QnNNYW5hZ2VTYXZlZFF1ZXJpZXN9IGZyb20gXCIuL21hbmFnZS1zYXZlZC1xdWVyaWVzL21hbmFnZS1zYXZlZC1xdWVyaWVzXCI7XG5pbXBvcnQge0JzRXhwb3J0UXVlcnl9IGZyb20gXCIuL2V4cG9ydC1xdWVyeS9leHBvcnQtcXVlcnlcIjtcbmltcG9ydCB7QnNRdWVyeUV4cG9ydGVyfSBmcm9tIFwiLi9xdWVyeS1leHBvcnRlci9xdWVyeS1leHBvcnRlclwiO1xuaW1wb3J0IHtCc1NhdmVkUXVlcmllc01lbnVDb21wb25lbnR9IGZyb20gXCIuL3NhdmVkLXF1ZXJpZXMtbWVudS9zYXZlZC1xdWVyaWVzLW1lbnUuY29tcG9uZW50XCI7XG5pbXBvcnQge0JzRmFjZXRTYXZlZFF1ZXJpZXN9IGZyb20gXCIuL2ZhY2V0LXNhdmVkLXF1ZXJpZXMvZmFjZXQtc2F2ZWQtcXVlcmllc1wiO1xuaW1wb3J0IHtCc0ZhY2V0UmVjZW50UXVlcmllc30gZnJvbSBcIi4vZmFjZXQtcmVjZW50LXF1ZXJpZXMvZmFjZXQtcmVjZW50LXF1ZXJpZXNcIjtcbmltcG9ydCB7QnNGYWNldFJlY2VudERvY3VtZW50c30gZnJvbSBcIi4vZmFjZXQtcmVjZW50LWRvY3VtZW50cy9mYWNldC1yZWNlbnQtZG9jdW1lbnRzXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBEcmFnRHJvcE1vZHVsZSxcblxuICAgICAgICBCc01vZGFsTW9kdWxlLFxuXG4gICAgICAgIEludGxNb2R1bGUsXG4gICAgICAgIFZhbGlkYXRpb25Nb2R1bGUsXG4gICAgICAgIFJvdXRlck1vZHVsZSxcblxuICAgICAgICBCc1NlbGVjdGlvbk1vZHVsZSxcbiAgICAgICAgQnNNb2RhbE1vZHVsZSxcbiAgICAgICAgVXRpbHNNb2R1bGUsXG4gICAgICAgIEJzQWN0aW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQnNFZGl0U2F2ZWRRdWVyeSwgQnNNYW5hZ2VTYXZlZFF1ZXJpZXMsXG4gICAgICAgIEJzRXhwb3J0UXVlcnksIEJzUXVlcnlFeHBvcnRlciwgQnNTYXZlZFF1ZXJpZXNNZW51Q29tcG9uZW50LFxuICAgICAgICBCc0ZhY2V0U2F2ZWRRdWVyaWVzLCBCc0ZhY2V0UmVjZW50UXVlcmllcywgQnNGYWNldFJlY2VudERvY3VtZW50c1xuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBCc0VkaXRTYXZlZFF1ZXJ5LCBCc01hbmFnZVNhdmVkUXVlcmllcyxcbiAgICAgICAgQnNFeHBvcnRRdWVyeSwgQnNRdWVyeUV4cG9ydGVyLCBCc1NhdmVkUXVlcmllc01lbnVDb21wb25lbnQsXG4gICAgICAgIEJzRmFjZXRTYXZlZFF1ZXJpZXMsIEJzRmFjZXRSZWNlbnRRdWVyaWVzLCBCc0ZhY2V0UmVjZW50RG9jdW1lbnRzXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogU0FWRURRVUVSWV9DT01QT05FTlRTLFxuICAgICAgICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgICAgICAgICBlZGl0U2F2ZWRRdWVyeU1vZGFsOiBCc0VkaXRTYXZlZFF1ZXJ5LFxuICAgICAgICAgICAgICAgIG1hbmFnZVNhdmVkUXVlcmllc01vZGFsOiBCc01hbmFnZVNhdmVkUXVlcmllcyxcbiAgICAgICAgICAgICAgICBleHBvcnRTYXZlZFF1ZXJ5TW9kYWw6IEJzRXhwb3J0UXVlcnlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQnNTYXZlZFF1ZXJpZXNNb2R1bGUge1xufVxuIl19