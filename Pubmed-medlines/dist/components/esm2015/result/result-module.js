import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IntlModule } from "@sinequa/core/intl";
import { UtilsModule } from "@sinequa/components/utils";
import { CollapseModule } from "@sinequa/components/collapse";
import { MetadataModule } from "@sinequa/components/metadata";
import { ResultTitle } from "./result-title/result-title";
import { ResultSource } from "./result-source/result-source";
import { ResultExtracts } from "./result-extracts/result-extracts";
import { ResultMissingTerms } from "./result-missing-terms/result-missing-terms";
import { ResultThumbnail } from "./result-thumbnail/result-thumbnail";
import { UserRating } from "./user-rating/user-rating";
import { SponsoredResults } from './sponsored-results/sponsored-results';
import { ResultsCounter } from "./results-counter/results-counter";
import { ResultIcon } from "./result-icon/result-icon";
import * as i0 from "@angular/core";
export class ResultModule {
}
ResultModule.ɵmod = i0.ɵɵdefineNgModule({ type: ResultModule });
ResultModule.ɵinj = i0.ɵɵdefineInjector({ factory: function ResultModule_Factory(t) { return new (t || ResultModule)(); }, imports: [[
            CommonModule,
            FormsModule, ReactiveFormsModule,
            IntlModule,
            UtilsModule,
            CollapseModule,
            MetadataModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ResultModule, { declarations: [ResultTitle, ResultExtracts,
        ResultMissingTerms,
        ResultThumbnail, UserRating,
        SponsoredResults, ResultsCounter,
        ResultIcon, ResultSource], imports: [CommonModule,
        FormsModule, ReactiveFormsModule,
        IntlModule,
        UtilsModule,
        CollapseModule,
        MetadataModule], exports: [ResultTitle, ResultExtracts,
        ResultMissingTerms,
        ResultThumbnail, UserRating,
        SponsoredResults, ResultsCounter,
        ResultIcon, ResultSource] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ResultModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule, ReactiveFormsModule,
                    IntlModule,
                    UtilsModule,
                    CollapseModule,
                    MetadataModule
                ],
                declarations: [
                    ResultTitle, ResultExtracts,
                    ResultMissingTerms,
                    ResultThumbnail, UserRating,
                    SponsoredResults, ResultsCounter,
                    ResultIcon, ResultSource
                ],
                exports: [
                    ResultTitle, ResultExtracts,
                    ResultMissingTerms,
                    ResultThumbnail, UserRating,
                    SponsoredResults, ResultsCounter,
                    ResultIcon, ResultSource
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3Jlc3VsdC8iLCJzb3VyY2VzIjpbInJlc3VsdC1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRWhFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzVELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUU1RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDcEUsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7O0FBNEJyRCxNQUFNLE9BQU8sWUFBWTs7Z0RBQVosWUFBWTt1R0FBWixZQUFZLGtCQXpCWjtZQUNMLFlBQVk7WUFDWixXQUFXLEVBQUUsbUJBQW1CO1lBRWhDLFVBQVU7WUFFVixXQUFXO1lBQ1gsY0FBYztZQUNkLGNBQWM7U0FDakI7d0ZBZ0JRLFlBQVksbUJBZGpCLFdBQVcsRUFBRSxjQUFjO1FBQzNCLGtCQUFrQjtRQUNsQixlQUFlLEVBQUUsVUFBVTtRQUMzQixnQkFBZ0IsRUFBRSxjQUFjO1FBQ2hDLFVBQVUsRUFBRSxZQUFZLGFBZHhCLFlBQVk7UUFDWixXQUFXLEVBQUUsbUJBQW1CO1FBRWhDLFVBQVU7UUFFVixXQUFXO1FBQ1gsY0FBYztRQUNkLGNBQWMsYUFVZCxXQUFXLEVBQUUsY0FBYztRQUMzQixrQkFBa0I7UUFDbEIsZUFBZSxFQUFFLFVBQVU7UUFDM0IsZ0JBQWdCLEVBQUUsY0FBYztRQUNoQyxVQUFVLEVBQUUsWUFBWTtrREFHbkIsWUFBWTtjQTFCeEIsUUFBUTtlQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFdBQVcsRUFBRSxtQkFBbUI7b0JBRWhDLFVBQVU7b0JBRVYsV0FBVztvQkFDWCxjQUFjO29CQUNkLGNBQWM7aUJBQ2pCO2dCQUNELFlBQVksRUFBRTtvQkFDVixXQUFXLEVBQUUsY0FBYztvQkFDM0Isa0JBQWtCO29CQUNsQixlQUFlLEVBQUUsVUFBVTtvQkFDM0IsZ0JBQWdCLEVBQUUsY0FBYztvQkFDaEMsVUFBVSxFQUFFLFlBQVk7aUJBQzNCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxXQUFXLEVBQUUsY0FBYztvQkFDM0Isa0JBQWtCO29CQUNsQixlQUFlLEVBQUUsVUFBVTtvQkFDM0IsZ0JBQWdCLEVBQUUsY0FBYztvQkFDaEMsVUFBVSxFQUFFLFlBQVk7aUJBQzNCO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuXG5pbXBvcnQge0ludGxNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb3JlL2ludGxcIjtcblxuaW1wb3J0IHtVdGlsc01vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvdXRpbHNcIjtcbmltcG9ydCB7Q29sbGFwc2VNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2NvbGxhcHNlXCI7XG5pbXBvcnQge01ldGFkYXRhTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9tZXRhZGF0YVwiO1xuXG5pbXBvcnQge1Jlc3VsdFRpdGxlfSBmcm9tIFwiLi9yZXN1bHQtdGl0bGUvcmVzdWx0LXRpdGxlXCI7XG5pbXBvcnQge1Jlc3VsdFNvdXJjZX0gZnJvbSBcIi4vcmVzdWx0LXNvdXJjZS9yZXN1bHQtc291cmNlXCI7XG5pbXBvcnQge1Jlc3VsdEV4dHJhY3RzfSBmcm9tIFwiLi9yZXN1bHQtZXh0cmFjdHMvcmVzdWx0LWV4dHJhY3RzXCI7XG5pbXBvcnQge1Jlc3VsdE1pc3NpbmdUZXJtc30gZnJvbSBcIi4vcmVzdWx0LW1pc3NpbmctdGVybXMvcmVzdWx0LW1pc3NpbmctdGVybXNcIjtcbmltcG9ydCB7UmVzdWx0VGh1bWJuYWlsfSBmcm9tIFwiLi9yZXN1bHQtdGh1bWJuYWlsL3Jlc3VsdC10aHVtYm5haWxcIjtcbmltcG9ydCB7VXNlclJhdGluZ30gZnJvbSBcIi4vdXNlci1yYXRpbmcvdXNlci1yYXRpbmdcIjtcbmltcG9ydCB7U3BvbnNvcmVkUmVzdWx0c30gZnJvbSAnLi9zcG9uc29yZWQtcmVzdWx0cy9zcG9uc29yZWQtcmVzdWx0cyc7XG5pbXBvcnQge1Jlc3VsdHNDb3VudGVyfSBmcm9tIFwiLi9yZXN1bHRzLWNvdW50ZXIvcmVzdWx0cy1jb3VudGVyXCI7XG5pbXBvcnQge1Jlc3VsdEljb259IGZyb20gXCIuL3Jlc3VsdC1pY29uL3Jlc3VsdC1pY29uXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuXG4gICAgICAgIEludGxNb2R1bGUsXG5cbiAgICAgICAgVXRpbHNNb2R1bGUsXG4gICAgICAgIENvbGxhcHNlTW9kdWxlLFxuICAgICAgICBNZXRhZGF0YU1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFJlc3VsdFRpdGxlLCBSZXN1bHRFeHRyYWN0cyxcbiAgICAgICAgUmVzdWx0TWlzc2luZ1Rlcm1zLFxuICAgICAgICBSZXN1bHRUaHVtYm5haWwsIFVzZXJSYXRpbmcsXG4gICAgICAgIFNwb25zb3JlZFJlc3VsdHMsIFJlc3VsdHNDb3VudGVyLFxuICAgICAgICBSZXN1bHRJY29uLCBSZXN1bHRTb3VyY2VcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgUmVzdWx0VGl0bGUsIFJlc3VsdEV4dHJhY3RzLFxuICAgICAgICBSZXN1bHRNaXNzaW5nVGVybXMsXG4gICAgICAgIFJlc3VsdFRodW1ibmFpbCwgVXNlclJhdGluZyxcbiAgICAgICAgU3BvbnNvcmVkUmVzdWx0cywgUmVzdWx0c0NvdW50ZXIsXG4gICAgICAgIFJlc3VsdEljb24sIFJlc3VsdFNvdXJjZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgUmVzdWx0TW9kdWxlIHtcbn1cbiJdfQ==