import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { IntlModule } from "@sinequa/core/intl";
import { WebServicesModule } from "@sinequa/core/web-services";
import { ValidationModule } from "@sinequa/core/validation";
import { UtilsModule } from "@sinequa/components/utils";
import { CollapseModule } from "@sinequa/components/collapse";
import { MetadataModule } from "@sinequa/components/metadata";
import { BsModalModule } from "@sinequa/components/modal";
import { BsFacetModule } from "@sinequa/components/facet";
import { ResultModule } from "@sinequa/components/result";
import { BsActionModule } from "@sinequa/components/action";
import { PreviewModule } from "../preview.module";
import { BsPreviewHighlights } from "./preview-highlights/preview-highlights";
import { BsPreviewLinks } from "./preview-links/preview-links";
import { BsPreviewPopup } from "./preview-popup/preview-popup";
import { BsPreviewPanel } from "./preview-panel/preview-panel";
import { BsResultLinkPreview } from "./result-link-preview/result-link-preview";
import { BsFacetPreview } from "./facet-preview/facet-preview";
import { BsSimilarDocuments } from "./similar-documents/similar-documents";
import { BsFacetPreviewComponent2 } from './facet-preview-2/facet-preview.component';
import { BsPreviewEntityFacetComponent } from './preview-entity-facet/preview-entity-facet.component';
import { BsPreviewEntityPanelComponent } from './preview-entity-panel/preview-entity-panel.component';
import { BsPreviewExtractsPanelComponent } from './preview-extracts-panel/preview-extracts-panel.component';
import { BsPreviewSearchFormComponent } from './preview-search-form/preview-search-form.component';
import { BsPreviewPagesPanelComponent } from './preview-pages-panel/preview-pages-panel.component';
import { BsPreviewPageFormComponent } from './preview-page-form/preview-page-form.component';
import { PREVIEW_MODAL } from '../preview.service';
import * as i0 from "@angular/core";
export class BsPreviewModule {
}
BsPreviewModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsPreviewModule });
BsPreviewModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsPreviewModule_Factory(t) { return new (t || BsPreviewModule)(); }, providers: [
        { provide: PREVIEW_MODAL, useValue: BsPreviewPopup }
    ], imports: [[
            CommonModule,
            FormsModule, ReactiveFormsModule,
            ScrollingModule,
            IntlModule,
            WebServicesModule,
            ValidationModule,
            UtilsModule,
            CollapseModule,
            MetadataModule,
            BsModalModule,
            BsFacetModule,
            ResultModule,
            BsActionModule,
            PreviewModule
        ], PreviewModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsPreviewModule, { declarations: [BsPreviewHighlights, BsPreviewLinks,
        BsPreviewPopup, BsPreviewPanel, BsResultLinkPreview,
        BsFacetPreview, BsFacetPreviewComponent2,
        BsSimilarDocuments,
        BsPreviewEntityFacetComponent,
        BsPreviewEntityPanelComponent,
        BsPreviewExtractsPanelComponent,
        BsPreviewSearchFormComponent,
        BsPreviewPagesPanelComponent,
        BsPreviewPageFormComponent], imports: [CommonModule,
        FormsModule, ReactiveFormsModule,
        ScrollingModule,
        IntlModule,
        WebServicesModule,
        ValidationModule,
        UtilsModule,
        CollapseModule,
        MetadataModule,
        BsModalModule,
        BsFacetModule,
        ResultModule,
        BsActionModule,
        PreviewModule], exports: [PreviewModule,
        BsPreviewHighlights, BsPreviewLinks,
        BsPreviewPopup, BsPreviewPanel, BsResultLinkPreview,
        BsFacetPreview, BsFacetPreviewComponent2,
        BsSimilarDocuments,
        BsPreviewEntityFacetComponent,
        BsPreviewEntityPanelComponent,
        BsPreviewExtractsPanelComponent,
        BsPreviewSearchFormComponent,
        BsPreviewPagesPanelComponent,
        BsPreviewPageFormComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsPreviewModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule, ReactiveFormsModule,
                    ScrollingModule,
                    IntlModule,
                    WebServicesModule,
                    ValidationModule,
                    UtilsModule,
                    CollapseModule,
                    MetadataModule,
                    BsModalModule,
                    BsFacetModule,
                    ResultModule,
                    BsActionModule,
                    PreviewModule
                ],
                declarations: [
                    BsPreviewHighlights, BsPreviewLinks,
                    BsPreviewPopup, BsPreviewPanel, BsResultLinkPreview,
                    BsFacetPreview, BsFacetPreviewComponent2,
                    BsSimilarDocuments,
                    BsPreviewEntityFacetComponent,
                    BsPreviewEntityPanelComponent,
                    BsPreviewExtractsPanelComponent,
                    BsPreviewSearchFormComponent,
                    BsPreviewPagesPanelComponent,
                    BsPreviewPageFormComponent
                ],
                exports: [
                    PreviewModule,
                    BsPreviewHighlights, BsPreviewLinks,
                    BsPreviewPopup, BsPreviewPanel, BsResultLinkPreview,
                    BsFacetPreview, BsFacetPreviewComponent2,
                    BsSimilarDocuments,
                    BsPreviewEntityFacetComponent,
                    BsPreviewEntityPanelComponent,
                    BsPreviewExtractsPanelComponent,
                    BsPreviewSearchFormComponent,
                    BsPreviewPagesPanelComponent,
                    BsPreviewPageFormComponent
                ],
                providers: [
                    { provide: PREVIEW_MODAL, useValue: BsPreviewPopup }
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9wcmV2aWV3LyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL3ByZXZpZXcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRTFELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzVELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDNUUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLCtCQUEr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NEI7b0JBQzVCLDBCQUEwQjtpQkFDN0I7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGFBQWE7b0JBQ2IsbUJBQW1CLEVBQUUsY0FBYztvQkFDbkMsY0FBYyxFQUFFLGNBQWMsRUFBRSxtQkFBbUI7b0JBQ25ELGNBQWMsRUFBRSx3QkFBd0I7b0JBQ3hDLGtCQUFrQjtvQkFDbEIsNkJBQTZCO29CQUM3Qiw2QkFBNkI7b0JBQzdCLCtCQUErQjtvQkFDL0IsNEJBQTRCO29CQUM1Qiw0QkFBNEI7b0JBQzVCLDBCQUEwQjtpQkFDN0I7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFDO2lCQUNyRDthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7U2Nyb2xsaW5nTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY2RrL3Njcm9sbGluZ1wiO1xuXG5pbXBvcnQge0ludGxNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb3JlL2ludGxcIjtcbmltcG9ydCB7V2ViU2VydmljZXNNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtWYWxpZGF0aW9uTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS92YWxpZGF0aW9uXCI7XG5cbmltcG9ydCB7VXRpbHNNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3V0aWxzXCI7XG5pbXBvcnQge0NvbGxhcHNlTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9jb2xsYXBzZVwiO1xuaW1wb3J0IHtNZXRhZGF0YU1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvbWV0YWRhdGFcIjtcbmltcG9ydCB7QnNNb2RhbE1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvbW9kYWxcIjtcbmltcG9ydCB7QnNGYWNldE1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvZmFjZXRcIjtcbmltcG9ydCB7UmVzdWx0TW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9yZXN1bHRcIjtcbmltcG9ydCB7QnNBY3Rpb25Nb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2FjdGlvblwiO1xuaW1wb3J0IHtQcmV2aWV3TW9kdWxlfSBmcm9tIFwiLi4vcHJldmlldy5tb2R1bGVcIjtcbmltcG9ydCB7QnNQcmV2aWV3SGlnaGxpZ2h0c30gZnJvbSBcIi4vcHJldmlldy1oaWdobGlnaHRzL3ByZXZpZXctaGlnaGxpZ2h0c1wiO1xuaW1wb3J0IHtCc1ByZXZpZXdMaW5rc30gZnJvbSBcIi4vcHJldmlldy1saW5rcy9wcmV2aWV3LWxpbmtzXCI7XG5pbXBvcnQge0JzUHJldmlld1BvcHVwfSBmcm9tIFwiLi9wcmV2aWV3LXBvcHVwL3ByZXZpZXctcG9wdXBcIjtcbmltcG9ydCB7QnNQcmV2aWV3UGFuZWx9IGZyb20gXCIuL3ByZXZpZXctcGFuZWwvcHJldmlldy1wYW5lbFwiO1xuaW1wb3J0IHtCc1Jlc3VsdExpbmtQcmV2aWV3fSBmcm9tIFwiLi9yZXN1bHQtbGluay1wcmV2aWV3L3Jlc3VsdC1saW5rLXByZXZpZXdcIjtcbmltcG9ydCB7QnNGYWNldFByZXZpZXd9IGZyb20gXCIuL2ZhY2V0LXByZXZpZXcvZmFjZXQtcHJldmlld1wiO1xuaW1wb3J0IHtCc1NpbWlsYXJEb2N1bWVudHN9IGZyb20gXCIuL3NpbWlsYXItZG9jdW1lbnRzL3NpbWlsYXItZG9jdW1lbnRzXCI7XG5pbXBvcnQge0JzRmFjZXRQcmV2aWV3Q29tcG9uZW50MiB9IGZyb20gJy4vZmFjZXQtcHJldmlldy0yL2ZhY2V0LXByZXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7QnNQcmV2aWV3RW50aXR5RmFjZXRDb21wb25lbnR9IGZyb20gJy4vcHJldmlldy1lbnRpdHktZmFjZXQvcHJldmlldy1lbnRpdHktZmFjZXQuY29tcG9uZW50JztcbmltcG9ydCB7QnNQcmV2aWV3RW50aXR5UGFuZWxDb21wb25lbnR9IGZyb20gJy4vcHJldmlldy1lbnRpdHktcGFuZWwvcHJldmlldy1lbnRpdHktcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7QnNQcmV2aWV3RXh0cmFjdHNQYW5lbENvbXBvbmVudH0gZnJvbSAnLi9wcmV2aWV3LWV4dHJhY3RzLXBhbmVsL3ByZXZpZXctZXh0cmFjdHMtcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7QnNQcmV2aWV3U2VhcmNoRm9ybUNvbXBvbmVudH0gZnJvbSAnLi9wcmV2aWV3LXNlYXJjaC1mb3JtL3ByZXZpZXctc2VhcmNoLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7QnNQcmV2aWV3UGFnZXNQYW5lbENvbXBvbmVudH0gZnJvbSAnLi9wcmV2aWV3LXBhZ2VzLXBhbmVsL3ByZXZpZXctcGFnZXMtcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7QnNQcmV2aWV3UGFnZUZvcm1Db21wb25lbnR9IGZyb20gJy4vcHJldmlldy1wYWdlLWZvcm0vcHJldmlldy1wYWdlLWZvcm0uY29tcG9uZW50JztcblxuaW1wb3J0IHtQUkVWSUVXX01PREFMfSBmcm9tICcuLi9wcmV2aWV3LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgU2Nyb2xsaW5nTW9kdWxlLFxuXG4gICAgICAgIEludGxNb2R1bGUsXG4gICAgICAgIFdlYlNlcnZpY2VzTW9kdWxlLFxuICAgICAgICBWYWxpZGF0aW9uTW9kdWxlLFxuXG4gICAgICAgIFV0aWxzTW9kdWxlLFxuICAgICAgICBDb2xsYXBzZU1vZHVsZSxcbiAgICAgICAgTWV0YWRhdGFNb2R1bGUsXG4gICAgICAgIEJzTW9kYWxNb2R1bGUsXG4gICAgICAgIEJzRmFjZXRNb2R1bGUsXG4gICAgICAgIFJlc3VsdE1vZHVsZSxcbiAgICAgICAgQnNBY3Rpb25Nb2R1bGUsXG4gICAgICAgIFByZXZpZXdNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBCc1ByZXZpZXdIaWdobGlnaHRzLCBCc1ByZXZpZXdMaW5rcyxcbiAgICAgICAgQnNQcmV2aWV3UG9wdXAsIEJzUHJldmlld1BhbmVsLCBCc1Jlc3VsdExpbmtQcmV2aWV3LFxuICAgICAgICBCc0ZhY2V0UHJldmlldywgQnNGYWNldFByZXZpZXdDb21wb25lbnQyLFxuICAgICAgICBCc1NpbWlsYXJEb2N1bWVudHMsXG4gICAgICAgIEJzUHJldmlld0VudGl0eUZhY2V0Q29tcG9uZW50LFxuICAgICAgICBCc1ByZXZpZXdFbnRpdHlQYW5lbENvbXBvbmVudCxcbiAgICAgICAgQnNQcmV2aWV3RXh0cmFjdHNQYW5lbENvbXBvbmVudCxcbiAgICAgICAgQnNQcmV2aWV3U2VhcmNoRm9ybUNvbXBvbmVudCxcbiAgICAgICAgQnNQcmV2aWV3UGFnZXNQYW5lbENvbXBvbmVudCxcbiAgICAgICAgQnNQcmV2aWV3UGFnZUZvcm1Db21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgUHJldmlld01vZHVsZSxcbiAgICAgICAgQnNQcmV2aWV3SGlnaGxpZ2h0cywgQnNQcmV2aWV3TGlua3MsXG4gICAgICAgIEJzUHJldmlld1BvcHVwLCBCc1ByZXZpZXdQYW5lbCwgQnNSZXN1bHRMaW5rUHJldmlldyxcbiAgICAgICAgQnNGYWNldFByZXZpZXcsIEJzRmFjZXRQcmV2aWV3Q29tcG9uZW50MixcbiAgICAgICAgQnNTaW1pbGFyRG9jdW1lbnRzLFxuICAgICAgICBCc1ByZXZpZXdFbnRpdHlGYWNldENvbXBvbmVudCxcbiAgICAgICAgQnNQcmV2aWV3RW50aXR5UGFuZWxDb21wb25lbnQsXG4gICAgICAgIEJzUHJldmlld0V4dHJhY3RzUGFuZWxDb21wb25lbnQsXG4gICAgICAgIEJzUHJldmlld1NlYXJjaEZvcm1Db21wb25lbnQsXG4gICAgICAgIEJzUHJldmlld1BhZ2VzUGFuZWxDb21wb25lbnQsXG4gICAgICAgIEJzUHJldmlld1BhZ2VGb3JtQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IFBSRVZJRVdfTU9EQUwsIHVzZVZhbHVlOiBCc1ByZXZpZXdQb3B1cH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEJzUHJldmlld01vZHVsZSB7XG59Il19