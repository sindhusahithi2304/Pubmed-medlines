import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IntlModule } from "@sinequa/core/intl";
import { WebServicesModule } from "@sinequa/core/web-services";
import { UtilsModule } from "@sinequa/components/utils";
import { PreviewDocumentIframe } from "./preview-document-iframe.component";
import { PreviewTooltip } from "./preview-tooltip.component";
import { PREVIEW_MODAL } from "./preview.service";
import * as i0 from "@angular/core";
export class PreviewModule {
    static forRoot(previewModal) {
        return {
            ngModule: PreviewModule,
            providers: [
                { provide: PREVIEW_MODAL, useValue: previewModal },
            ]
        };
    }
}
PreviewModule.ɵmod = i0.ɵɵdefineNgModule({ type: PreviewModule });
PreviewModule.ɵinj = i0.ɵɵdefineInjector({ factory: function PreviewModule_Factory(t) { return new (t || PreviewModule)(); }, imports: [[
            CommonModule,
            IntlModule,
            WebServicesModule,
            UtilsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(PreviewModule, { declarations: [PreviewDocumentIframe, PreviewTooltip], imports: [CommonModule,
        IntlModule,
        WebServicesModule,
        UtilsModule], exports: [PreviewDocumentIframe, PreviewTooltip] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PreviewModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    IntlModule,
                    WebServicesModule,
                    UtilsModule
                ],
                declarations: [
                    PreviewDocumentIframe, PreviewTooltip
                ],
                exports: [
                    PreviewDocumentIframe, PreviewTooltip
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9wcmV2aWV3LyIsInNvdXJjZXMiOlsicHJldmlldy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7QUFnQmhELE1BQU0sT0FBTyxhQUFhO0lBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBdUI7UUFDbEMsT0FBTztZQUNILFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRTtnQkFDUCxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBQzthQUNuRDtTQUNKLENBQUM7SUFDTixDQUFDOztpREFSUSxhQUFhO3lHQUFiLGFBQWEsa0JBYmI7WUFDTCxZQUFZO1lBQ1osVUFBVTtZQUNWLGlCQUFpQjtZQUNqQixXQUFXO1NBQ2Q7d0ZBUVEsYUFBYSxtQkFObEIscUJBQXFCLEVBQUUsY0FBYyxhQU5yQyxZQUFZO1FBQ1osVUFBVTtRQUNWLGlCQUFpQjtRQUNqQixXQUFXLGFBTVgscUJBQXFCLEVBQUUsY0FBYztrREFHaEMsYUFBYTtjQWR6QixRQUFRO2VBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osVUFBVTtvQkFDVixpQkFBaUI7b0JBQ2pCLFdBQVc7aUJBQ2Q7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLHFCQUFxQixFQUFFLGNBQWM7aUJBQ3hDO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxxQkFBcUIsRUFBRSxjQUFjO2lCQUN4QzthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgVHlwZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge0ludGxNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb3JlL2ludGxcIjtcbmltcG9ydCB7V2ViU2VydmljZXNNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtVdGlsc01vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvdXRpbHNcIjtcbmltcG9ydCB7UHJldmlld0RvY3VtZW50SWZyYW1lfSBmcm9tIFwiLi9wcmV2aWV3LWRvY3VtZW50LWlmcmFtZS5jb21wb25lbnRcIjtcbmltcG9ydCB7UHJldmlld1Rvb2x0aXB9IGZyb20gXCIuL3ByZXZpZXctdG9vbHRpcC5jb21wb25lbnRcIjtcbmltcG9ydCB7UFJFVklFV19NT0RBTH0gZnJvbSBcIi4vcHJldmlldy5zZXJ2aWNlXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEludGxNb2R1bGUsXG4gICAgICAgIFdlYlNlcnZpY2VzTW9kdWxlLFxuICAgICAgICBVdGlsc01vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFByZXZpZXdEb2N1bWVudElmcmFtZSwgUHJldmlld1Rvb2x0aXBcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgUHJldmlld0RvY3VtZW50SWZyYW1lLCBQcmV2aWV3VG9vbHRpcFxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIFByZXZpZXdNb2R1bGUge1xuICAgIHN0YXRpYyBmb3JSb290KHByZXZpZXdNb2RhbDogVHlwZTxhbnk+KSA6IE1vZHVsZVdpdGhQcm92aWRlcnM8UHJldmlld01vZHVsZT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IFByZXZpZXdNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogUFJFVklFV19NT0RBTCwgdXNlVmFsdWU6IHByZXZpZXdNb2RhbH0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxufSJdfQ==