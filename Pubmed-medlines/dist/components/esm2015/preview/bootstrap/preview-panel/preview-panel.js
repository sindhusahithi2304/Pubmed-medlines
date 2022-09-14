import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "../../preview.service";
import * as i2 from "@angular/common";
import * as i3 from "../preview-links/preview-links";
import * as i4 from "../preview-highlights/preview-highlights";
import * as i5 from "@sinequa/components/facet";
import * as i6 from "../../preview-document-iframe.component";
import * as i7 from "../../preview-tooltip.component";
import * as i8 from "@sinequa/components/metadata";
import * as i9 from "../similar-documents/similar-documents";
function BsPreviewPanel_div_0_sq_metadata_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "sq-metadata", 14);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("record", ctx_r1.previewData.record)("items", ctx_r1.metadata)("showTitles", false)("showIcons", true)("clickable", false);
} }
function BsPreviewPanel_div_0_sq_similar_documents_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "sq-similar-documents", 15);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("sourceDocumentId", ctx_r2.previewData.record.id)("query", ctx_r2.query);
} }
function BsPreviewPanel_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelementStart(1, "div", 2);
    i0.ɵɵelementStart(2, "div");
    i0.ɵɵelementStart(3, "div", 3);
    i0.ɵɵelement(4, "sq-preview-links", 4);
    i0.ɵɵelement(5, "sq-preview-highlights", 5);
    i0.ɵɵelementStart(6, "sq-facet-card", 6);
    i0.ɵɵelementStart(7, "div", 7);
    i0.ɵɵtemplate(8, BsPreviewPanel_div_0_sq_metadata_8_Template, 1, 5, "sq-metadata", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, BsPreviewPanel_div_0_sq_similar_documents_9_Template, 1, 2, "sq-similar-documents", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 10);
    i0.ɵɵelementStart(11, "sq-preview-document-iframe", 11);
    i0.ɵɵlistener("onPreviewReady", function BsPreviewPanel_div_0_Template_sq_preview_document_iframe_onPreviewReady_11_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.onPreviewReady($event); });
    i0.ɵɵelement(12, "sq-preview-tooltip", 12, 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵclassMapInterpolate1("col-lg-3 sq-col ", ctx_r0.leftPaneAdditionalClasses, "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("record", ctx_r0.previewData.record)("resultId", ctx_r0.previewData.resultId);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("previewDocument", ctx_r0.previewDocument)("previewData", ctx_r0.previewData);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("title", "msg#preview.documentPropertiesTitle");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.previewData.record);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.displaySimilarDocuments);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("sandbox", ctx_r0.sandbox)("downloadUrl", ctx_r0.downloadUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("previewDocument", ctx_r0.previewDocument)("previewData", ctx_r0.previewDocument);
} }
export class BsPreviewPanel {
    constructor(previewService, changeDetectorRef) {
        this.previewService = previewService;
        this.changeDetectorRef = changeDetectorRef;
    }
    ngOnChanges(changes) {
        if (changes["previewData"]) {
            this.downloadUrl = this.previewData ? this.previewService.makeDownloadUrl(this.previewData.documentCachedContentUrl) : undefined;
        }
    }
    onPreviewReady(previewDocument) {
        this.previewDocument = previewDocument;
        this.changeDetectorRef.markForCheck();
    }
}
BsPreviewPanel.ɵfac = function BsPreviewPanel_Factory(t) { return new (t || BsPreviewPanel)(i0.ɵɵdirectiveInject(i1.PreviewService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
BsPreviewPanel.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewPanel, selectors: [["sq-preview-panel"]], inputs: { query: "query", previewData: "previewData", sandbox: "sandbox", displaySimilarDocuments: "displaySimilarDocuments", metadata: "metadata", leftPaneAdditionalClasses: "leftPaneAdditionalClasses" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "container-fluid sq-preview", 4, "ngIf"], [1, "container-fluid", "sq-preview"], [1, "row", "sq-row"], [1, "sq-preview-bar"], [1, "d-block", "mb-3", 3, "record", "resultId"], [1, "d-block", "mb-3", 3, "previewDocument", "previewData"], [1, "d-block", "mb-3", 3, "title"], ["id", "documentPropertiesBody", 1, "card-body", "collapse", "show"], [3, "record", "items", "showTitles", "showIcons", "clickable", 4, "ngIf"], ["class", "d-block mb-3", 3, "sourceDocumentId", "query", 4, "ngIf"], [1, "col-lg-9", "sq-col", "d-flex", "flex-column"], [3, "sandbox", "downloadUrl", "onPreviewReady"], [3, "previewDocument", "previewData"], ["tooltip", ""], [3, "record", "items", "showTitles", "showIcons", "clickable"], [1, "d-block", "mb-3", 3, "sourceDocumentId", "query"]], template: function BsPreviewPanel_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsPreviewPanel_div_0_Template, 14, 14, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !!ctx.previewData);
    } }, directives: [i2.NgIf, i3.BsPreviewLinks, i4.BsPreviewHighlights, i5.BsFacetCard, i6.PreviewDocumentIframe, i7.PreviewTooltip, i8.Metadata, i9.BsSimilarDocuments], styles: [".sq-preview-document-properties[_ngcontent-%COMP%]{margin-top:.5em}.collapseButton[_ngcontent-%COMP%]{float:right}.sq-preview-bar[_ngcontent-%COMP%]{min-height:100%;overflow-x:hidden}.sq-preview[_ngcontent-%COMP%]{height:100%}.sq-preview[_ngcontent-%COMP%] > .row[_ngcontent-%COMP%]{flex-wrap:nowrap;height:100%}.sq-preview[_ngcontent-%COMP%] > .row[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{-webkit-overflow-scrolling:touch;height:100%;overflow-x:hidden;overflow-y:auto}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsPreviewPanel, [{
        type: Component,
        args: [{
                selector: "sq-preview-panel",
                templateUrl: "./preview-panel.html",
                styleUrls: ["./preview-panel.scss"]
            }]
    }], function () { return [{ type: i1.PreviewService }, { type: i0.ChangeDetectorRef }]; }, { query: [{
            type: Input
        }], previewData: [{
            type: Input
        }], sandbox: [{
            type: Input
        }], displaySimilarDocuments: [{
            type: Input
        }], metadata: [{
            type: Input
        }], leftPaneAdditionalClasses: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy1wYW5lbC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3ByZXZpZXcvIiwic291cmNlcyI6WyJib290c3RyYXAvcHJldmlldy1wYW5lbC9wcmV2aWV3LXBhbmVsLnRzIiwiYm9vdHN0cmFwL3ByZXZpZXctcGFuZWwvcHJldmlldy1wYW5lbC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUErQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7O0lDY3RFLGtDQUNjOzs7SUFEMEIsa0RBQTZCLDBCQUFBLHFCQUFBLG1CQUFBLG9CQUFBOzs7SUFJN0UsMkNBRXVCOzs7SUFEbkIsK0RBQTBDLHVCQUFBOzs7O0lBbkI5RCw4QkFDSTtJQUFBLDhCQUNJO0lBQUEsMkJBQ0k7SUFBQSw4QkFDSTtJQUFBLHNDQUdtQjtJQUNuQiwyQ0FHd0I7SUFDeEIsd0NBQ0k7SUFBQSw4QkFDSTtJQUFBLHFGQUNjO0lBQ2xCLGlCQUFNO0lBQ1YsaUJBQWdCO0lBQ2hCLHVHQUV1QjtJQUMzQixpQkFBTTtJQUNWLGlCQUFNO0lBQ04sZ0NBQ0k7SUFBQSx1REFJSTtJQURBLHlPQUF5QztJQUN6Qyw4Q0FHcUI7SUFDekIsaUJBQTZCO0lBQ2pDLGlCQUFNO0lBQ1YsaUJBQU07SUFDVixpQkFBTTs7O0lBakNPLGVBQXFEO0lBQXJELG1GQUFxRDtJQUc5QyxlQUE2QjtJQUE3QixrREFBNkIseUNBQUE7SUFJN0IsZUFBbUM7SUFBbkMsd0RBQW1DLG1DQUFBO0lBR3hCLGVBQStDO0lBQS9DLDZEQUErQztJQUV4QyxlQUF3QjtJQUF4QixnREFBd0I7SUFJdkIsZUFBNkI7SUFBN0IscURBQTZCO0lBT3BELGVBQXFCO0lBQXJCLHdDQUFxQixtQ0FBQTtJQUlqQixlQUFtQztJQUFuQyx3REFBbUMsdUNBQUE7O0FEaEJ2RCxNQUFNLE9BQU8sY0FBYztJQVd2QixZQUNZLGNBQThCLEVBQzlCLGlCQUFvQztRQURwQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUNoRCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7U0FDcEk7SUFDTCxDQUFDO0lBRUQsY0FBYyxDQUFDLGVBQWdDO1FBQzNDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDOzs0RUF6QlEsY0FBYzttREFBZCxjQUFjO1FDYjNCLGlFQW1DTTs7UUFuQ0Esd0NBQW1COztrRERhWixjQUFjO2NBTDFCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixXQUFXLEVBQUUsc0JBQXNCO2dCQUNuQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzthQUN0QztpR0FFWSxLQUFLO2tCQUFiLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csT0FBTztrQkFBZixLQUFLO1lBQ0csdUJBQXVCO2tCQUEvQixLQUFLO1lBQ0csUUFBUTtrQkFBaEIsS0FBSztZQUNHLHlCQUF5QjtrQkFBakMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU2FmZVJlc291cmNlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBQcmV2aWV3RGF0YSB9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9hcHAtdXRpbHNcIjtcbmltcG9ydCB7IFByZXZpZXdTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3ByZXZpZXcuc2VydmljZVwiO1xuaW1wb3J0IHsgUHJldmlld0RvY3VtZW50IH0gZnJvbSBcIi4uLy4uL3ByZXZpZXctZG9jdW1lbnRcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1wcmV2aWV3LXBhbmVsXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wcmV2aWV3LXBhbmVsLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vcHJldmlldy1wYW5lbC5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEJzUHJldmlld1BhbmVsIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBxdWVyeTogUXVlcnk7XG4gICAgQElucHV0KCkgcHJldmlld0RhdGE6IFByZXZpZXdEYXRhO1xuICAgIEBJbnB1dCgpIHNhbmRib3g6IHN0cmluZztcbiAgICBASW5wdXQoKSBkaXNwbGF5U2ltaWxhckRvY3VtZW50czogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBtZXRhZGF0YTogc3RyaW5nW107XG4gICAgQElucHV0KCkgbGVmdFBhbmVBZGRpdGlvbmFsQ2xhc3Nlczogc3RyaW5nO1xuXG4gICAgZG93bmxvYWRVcmw/OiBTYWZlUmVzb3VyY2VVcmw7XG4gICAgcHJldmlld0RvY3VtZW50OiBQcmV2aWV3RG9jdW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBwcmV2aWV3U2VydmljZTogUHJldmlld1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlc1tcInByZXZpZXdEYXRhXCJdKSB7XG4gICAgICAgICAgICB0aGlzLmRvd25sb2FkVXJsID0gdGhpcy5wcmV2aWV3RGF0YSA/IHRoaXMucHJldmlld1NlcnZpY2UubWFrZURvd25sb2FkVXJsKHRoaXMucHJldmlld0RhdGEuZG9jdW1lbnRDYWNoZWRDb250ZW50VXJsKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUHJldmlld1JlYWR5KHByZXZpZXdEb2N1bWVudDogUHJldmlld0RvY3VtZW50KXtcbiAgICAgICAgdGhpcy5wcmV2aWV3RG9jdW1lbnQgPSBwcmV2aWV3RG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxufSIsIjxkaXYgKm5nSWY9XCIhIXByZXZpZXdEYXRhXCIgY2xhc3M9XCJjb250YWluZXItZmx1aWQgc3EtcHJldmlld1wiPlxuICAgIDxkaXYgY2xhc3M9XCJyb3cgc3Etcm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctMyBzcS1jb2wge3tsZWZ0UGFuZUFkZGl0aW9uYWxDbGFzc2VzfX1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcS1wcmV2aWV3LWJhclwiPlxuICAgICAgICAgICAgICAgIDxzcS1wcmV2aWV3LWxpbmtzIGNsYXNzPVwiZC1ibG9jayBtYi0zXCJcbiAgICAgICAgICAgICAgICAgICAgW3JlY29yZF09XCJwcmV2aWV3RGF0YS5yZWNvcmRcIiBcbiAgICAgICAgICAgICAgICAgICAgW3Jlc3VsdElkXT1cInByZXZpZXdEYXRhLnJlc3VsdElkXCI+XG4gICAgICAgICAgICAgICAgPC9zcS1wcmV2aWV3LWxpbmtzPlxuICAgICAgICAgICAgICAgIDxzcS1wcmV2aWV3LWhpZ2hsaWdodHMgY2xhc3M9XCJkLWJsb2NrIG1iLTNcIlxuICAgICAgICAgICAgICAgICAgICBbcHJldmlld0RvY3VtZW50XT1cInByZXZpZXdEb2N1bWVudFwiXG4gICAgICAgICAgICAgICAgICAgIFtwcmV2aWV3RGF0YV09XCJwcmV2aWV3RGF0YVwiPlxuICAgICAgICAgICAgICAgIDwvc3EtcHJldmlldy1oaWdobGlnaHRzPlxuICAgICAgICAgICAgICAgIDxzcS1mYWNldC1jYXJkIFt0aXRsZV09XCInbXNnI3ByZXZpZXcuZG9jdW1lbnRQcm9wZXJ0aWVzVGl0bGUnXCIgY2xhc3M9XCJkLWJsb2NrIG1iLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keSBjb2xsYXBzZSBzaG93XCIgaWQ9XCJkb2N1bWVudFByb3BlcnRpZXNCb2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3EtbWV0YWRhdGEgKm5nSWY9XCJwcmV2aWV3RGF0YS5yZWNvcmRcIiBbcmVjb3JkXT1cInByZXZpZXdEYXRhLnJlY29yZFwiIFtpdGVtc109XCJtZXRhZGF0YVwiIFtzaG93VGl0bGVzXT1cImZhbHNlXCIgW3Nob3dJY29uc109XCJ0cnVlXCIgW2NsaWNrYWJsZV09XCJmYWxzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcS1tZXRhZGF0YT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9zcS1mYWNldC1jYXJkPlxuICAgICAgICAgICAgICAgIDxzcS1zaW1pbGFyLWRvY3VtZW50cyAqbmdJZj1cImRpc3BsYXlTaW1pbGFyRG9jdW1lbnRzXCIgY2xhc3M9XCJkLWJsb2NrIG1iLTNcIlxuICAgICAgICAgICAgICAgICAgICBbc291cmNlRG9jdW1lbnRJZF09XCJwcmV2aWV3RGF0YS5yZWNvcmQuaWRcIiBbcXVlcnldPVwicXVlcnlcIj5cbiAgICAgICAgICAgICAgICA8L3NxLXNpbWlsYXItZG9jdW1lbnRzPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxnLTkgc3EtY29sIGQtZmxleCBmbGV4LWNvbHVtblwiPlxuICAgICAgICAgICAgPHNxLXByZXZpZXctZG9jdW1lbnQtaWZyYW1lIFxuICAgICAgICAgICAgICAgIFtzYW5kYm94XSA9IFwic2FuZGJveFwiIFxuICAgICAgICAgICAgICAgIFtkb3dubG9hZFVybF09XCJkb3dubG9hZFVybFwiIFxuICAgICAgICAgICAgICAgIChvblByZXZpZXdSZWFkeSk9XCJvblByZXZpZXdSZWFkeSgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPHNxLXByZXZpZXctdG9vbHRpcCAjdG9vbHRpcFxuICAgICAgICAgICAgICAgICAgICBbcHJldmlld0RvY3VtZW50XT1cInByZXZpZXdEb2N1bWVudFwiXG4gICAgICAgICAgICAgICAgICAgIFtwcmV2aWV3RGF0YV09XCJwcmV2aWV3RG9jdW1lbnRcIj5cbiAgICAgICAgICAgICAgICA8L3NxLXByZXZpZXctdG9vbHRpcD5cbiAgICAgICAgICAgIDwvc3EtcHJldmlldy1kb2N1bWVudC1pZnJhbWU+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+Il19