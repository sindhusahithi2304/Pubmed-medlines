import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/web-services";
import * as i2 from "../../preview.service";
import * as i3 from "@angular/common";
import * as i4 from "@sinequa/components/facet";
function BsSimilarDocuments_sq_facet_card_0_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 5);
    i0.ɵɵlistener("click", function BsSimilarDocuments_sq_facet_card_0_ng_container_2_ng_container_1_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r6); const document_r2 = i0.ɵɵnextContext().$implicit; const ctx_r4 = i0.ɵɵnextContext(2); return ctx_r4.onLinkClick(document_r2); });
    i0.ɵɵelement(2, "div");
    i0.ɵɵelementStart(3, "a", 6);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const document_r2 = i0.ɵɵnextContext().$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMapInterpolate1("similarDocumentIcon ", ctx_r3.documentIconClass(document_r2), "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(document_r2.title);
} }
function BsSimilarDocuments_sq_facet_card_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsSimilarDocuments_sq_facet_card_0_ng_container_2_ng_container_1_Template, 5, 4, "ng-container", 4);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const document_r2 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", document_r2);
} }
function BsSimilarDocuments_sq_facet_card_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "sq-facet-card", 1);
    i0.ɵɵelementStart(1, "div", 2);
    i0.ɵɵtemplate(2, BsSimilarDocuments_sq_facet_card_0_ng_container_2_Template, 2, 1, "ng-container", 3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", "msg#preview.similarDocumentsTitle");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0.documents);
} }
export class BsSimilarDocuments {
    constructor(similarDocumentsService, previewService, changeDetectorRef) {
        this.similarDocumentsService = similarDocumentsService;
        this.previewService = previewService;
        this.changeDetectorRef = changeDetectorRef;
    }
    get documents() {
        return this.documentList;
    }
    ngOnChanges() {
        if (this.sourceDocumentId == null) {
            this.documentList = [];
            return;
        }
        this.similarDocumentsService.get(this.sourceDocumentId, this.query.name).subscribe((results) => {
            this.documentList = results;
            this.changeDetectorRef.markForCheck();
        });
    }
    documentIconClass(document) {
        const documentFormat = document.fileext;
        if (!documentFormat) {
            return "far fa-file";
        }
        return "far fa-file sq-icon-file-" + document.fileext;
    }
    onLinkClick(document) {
        this.previewService.openNewWindow(document, this.query);
    }
}
BsSimilarDocuments.ɵfac = function BsSimilarDocuments_Factory(t) { return new (t || BsSimilarDocuments)(i0.ɵɵdirectiveInject(i1.SimilarDocumentsWebService), i0.ɵɵdirectiveInject(i2.PreviewService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
BsSimilarDocuments.ɵcmp = i0.ɵɵdefineComponent({ type: BsSimilarDocuments, selectors: [["sq-similar-documents"]], inputs: { sourceDocumentId: "sourceDocumentId", query: "query" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "title", 4, "ngIf"], [3, "title"], ["id", "similarDocumentsBody", 1, "card-body", "collapse", "show"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "similarDocument", 3, "click"], ["href", "javascript:void(0)", 1, "similarDocumentTitle"]], template: function BsSimilarDocuments_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsSimilarDocuments_sq_facet_card_0_Template, 3, 2, "sq-facet-card", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.documents != null && ctx.documents.length > 0);
    } }, directives: [i3.NgIf, i4.BsFacetCard, i3.NgForOf], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsSimilarDocuments, [{
        type: Component,
        args: [{
                selector: "sq-similar-documents",
                templateUrl: "./similar-documents.html"
            }]
    }], function () { return [{ type: i1.SimilarDocumentsWebService }, { type: i2.PreviewService }, { type: i0.ChangeDetectorRef }]; }, { sourceDocumentId: [{
            type: Input
        }], query: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltaWxhci1kb2N1bWVudHMuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9wcmV2aWV3LyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL3NpbWlsYXItZG9jdW1lbnRzL3NpbWlsYXItZG9jdW1lbnRzLnRzIiwiYm9vdHN0cmFwL3NpbWlsYXItZG9jdW1lbnRzL3NpbWlsYXItZG9jdW1lbnRzLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWdDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztJQ0duRSw2QkFDSTtJQUFBLDhCQUNJO0lBRHlCLDBSQUErQjtJQUN4RCxzQkFBdUU7SUFDdkUsNEJBQTJEO0lBQUEsWUFBb0I7SUFBQSxpQkFBSTtJQUN2RixpQkFBTTtJQUNWLDBCQUFlOzs7O0lBSEYsZUFBMkQ7SUFBM0QsNEZBQTJEO0lBQ0wsZUFBb0I7SUFBcEIsdUNBQW9COzs7SUFKM0YsNkJBQ0k7SUFBQSxvSEFLZTtJQUNuQiwwQkFBZTs7O0lBTkksZUFBYztJQUFkLGtDQUFjOzs7SUFIekMsd0NBQ0k7SUFBQSw4QkFDSTtJQUFBLHFHQU9lO0lBQ25CLGlCQUFNO0lBQ1YsaUJBQWdCOzs7SUFYaUQsMkRBQTZDO0lBRW5FLGVBQVk7SUFBWiwwQ0FBWTs7QURPdkQsTUFBTSxPQUFPLGtCQUFrQjtJQVMzQixZQUNZLHVCQUFtRCxFQUNuRCxjQUE4QixFQUM5QixpQkFBb0M7UUFGcEMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUE0QjtRQUNuRCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUNoRCxDQUFDO0lBUkQsSUFBVyxTQUFTO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBUU0sV0FBVztRQUNkLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksRUFBRTtZQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUN2QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FDOUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNSLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1lBQzVCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQyxDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxRQUFnQjtRQUNyQyxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDakIsT0FBTyxhQUFhLENBQUM7U0FDeEI7UUFDRCxPQUFPLDJCQUEyQixHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDMUQsQ0FBQztJQUVNLFdBQVcsQ0FBQyxRQUFnQjtRQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVELENBQUM7O29GQXRDUSxrQkFBa0I7dURBQWxCLGtCQUFrQjtRQ1QvQix1RkFXZ0I7O1FBWEEsd0VBQStDOztrRERTbEQsa0JBQWtCO2NBSjlCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxXQUFXLEVBQUUsMEJBQTBCO2FBQzFDOzBJQUVvQixnQkFBZ0I7a0JBQWhDLEtBQUs7WUFDVyxLQUFLO2tCQUFyQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSZWNvcmQsIFNpbWlsYXJEb2N1bWVudHNXZWJTZXJ2aWNlIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCJAc2luZXF1YS9jb3JlL2FwcC11dGlsc1wiO1xuaW1wb3J0IHsgUHJldmlld1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vcHJldmlldy5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLXNpbWlsYXItZG9jdW1lbnRzXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zaW1pbGFyLWRvY3VtZW50cy5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQnNTaW1pbGFyRG9jdW1lbnRzIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBwcml2YXRlIHNvdXJjZURvY3VtZW50SWQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBwcml2YXRlIHF1ZXJ5OiBRdWVyeTtcbiAgICBwcml2YXRlIGRvY3VtZW50TGlzdDogUmVjb3JkW107XG5cbiAgICBwdWJsaWMgZ2V0IGRvY3VtZW50cygpOiBSZWNvcmRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvY3VtZW50TGlzdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2ltaWxhckRvY3VtZW50c1NlcnZpY2U6IFNpbWlsYXJEb2N1bWVudHNXZWJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHByZXZpZXdTZXJ2aWNlOiBQcmV2aWV3U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNvdXJjZURvY3VtZW50SWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudExpc3QgPSBbXTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNpbWlsYXJEb2N1bWVudHNTZXJ2aWNlLmdldCh0aGlzLnNvdXJjZURvY3VtZW50SWQsIHRoaXMucXVlcnkubmFtZSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50TGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZG9jdW1lbnRJY29uQ2xhc3MoZG9jdW1lbnQ6IFJlY29yZCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGRvY3VtZW50Rm9ybWF0ID0gZG9jdW1lbnQuZmlsZWV4dDtcbiAgICAgICAgaWYgKCFkb2N1bWVudEZvcm1hdCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiZmFyIGZhLWZpbGVcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJmYXIgZmEtZmlsZSBzcS1pY29uLWZpbGUtXCIgKyBkb2N1bWVudC5maWxlZXh0O1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkxpbmtDbGljayhkb2N1bWVudDogUmVjb3JkKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJldmlld1NlcnZpY2Uub3Blbk5ld1dpbmRvdyhkb2N1bWVudCwgdGhpcy5xdWVyeSk7XG4gICAgfVxufVxuIiwiPHNxLWZhY2V0LWNhcmQgKm5nSWY9XCJkb2N1bWVudHMgIT0gbnVsbCAmJiBkb2N1bWVudHMubGVuZ3RoID4gMFwiIFt0aXRsZV09XCInbXNnI3ByZXZpZXcuc2ltaWxhckRvY3VtZW50c1RpdGxlJ1wiPlxuICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHkgY29sbGFwc2Ugc2hvd1wiIGlkPVwic2ltaWxhckRvY3VtZW50c0JvZHlcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZG9jdW1lbnQgb2YgZG9jdW1lbnRzXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZG9jdW1lbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2ltaWxhckRvY3VtZW50XCIgKGNsaWNrKT1cIm9uTGlua0NsaWNrKGRvY3VtZW50KVwiID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpbWlsYXJEb2N1bWVudEljb24ge3tkb2N1bWVudEljb25DbGFzcyhkb2N1bWVudCl9fVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInNpbWlsYXJEb2N1bWVudFRpdGxlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiID57eyBkb2N1bWVudC50aXRsZSB9fTwvYT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbjwvc3EtZmFjZXQtY2FyZD4iXX0=