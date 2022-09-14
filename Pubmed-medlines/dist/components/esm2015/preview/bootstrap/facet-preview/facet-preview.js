import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "../../preview.service";
import * as i2 from "@angular/common";
import * as i3 from "../../preview-document-iframe.component";
import * as i4 from "../../preview-tooltip.component";
import * as i5 from "@sinequa/components/result";
const _c0 = function (a0) { return { height: a0 }; };
function BsFacetPreview_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelementStart(1, "sq-preview-document-iframe", 3);
    i0.ɵɵlistener("onPreviewReady", function BsFacetPreview_div_0_Template_sq_preview_document_iframe_onPreviewReady_1_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.document = $event; });
    i0.ɵɵelement(2, "sq-preview-tooltip", 4, 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMapInterpolate1("d-flex flex-column ", ctx_r0.iframeClass, "");
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(8, _c0, ctx_r0.height));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("sandbox", ctx_r0.sandbox)("downloadUrl", ctx_r0.downloadUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("previewDocument", ctx_r0.document)("previewData", ctx_r0.data);
} }
function BsFacetPreview_ul_1_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 8);
    i0.ɵɵelement(1, "sq-result-title", 9);
    i0.ɵɵelementStart(2, "div", 10);
    i0.ɵɵelementStart(3, "span", 11);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "a", 12);
    i0.ɵɵlistener("click", function BsFacetPreview_ul_1_li_1_Template_a_click_6_listener() { i0.ɵɵrestoreView(_r8); const doc_r6 = ctx.$implicit; const ctx_r7 = i0.ɵɵnextContext(2); return ctx_r7.openSimilarDoc(doc_r6); });
    i0.ɵɵelement(7, "i", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const doc_r6 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("record", doc_r6)("titleLinkBehavior", "open");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 3, 100 * doc_r6.globalrelevance, "1.0-0"));
} }
function BsFacetPreview_ul_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 6);
    i0.ɵɵtemplate(1, BsFacetPreview_ul_1_li_1_Template, 8, 6, "li", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.similarDocuments);
} }
export class BsFacetPreview {
    constructor(previewService) {
        this.previewService = previewService;
        this.recordOpened = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes["record"] || changes["query"]) {
            this.previewService.getPreviewData(this.record.id, this.query).subscribe(previewData => {
                this.data = previewData;
                this.downloadUrl = this.data ? this.previewService.makeDownloadUrl(this.data.documentCachedContentUrl) : undefined;
            });
        }
    }
    openSimilarDoc(doc) {
        this.recordOpened.next({
            record: doc,
            query: this.query,
            startSmall: true,
            iframeClass: this.iframeClass
        });
        return false;
    }
}
BsFacetPreview.ɵfac = function BsFacetPreview_Factory(t) { return new (t || BsFacetPreview)(i0.ɵɵdirectiveInject(i1.PreviewService)); };
BsFacetPreview.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetPreview, selectors: [["sq-facet-preview"]], inputs: { record: "record", sandbox: "sandbox", query: "query", height: "height", iframeClass: "iframeClass", similarDocuments: "similarDocuments" }, outputs: { recordOpened: "recordOpened" }, features: [i0.ɵɵNgOnChangesFeature], decls: 2, vars: 2, consts: [[3, "class", "ngStyle", 4, "ngIf"], ["class", "list-group", 4, "ngIf"], [3, "ngStyle"], [3, "sandbox", "downloadUrl", "onPreviewReady"], [3, "previewDocument", "previewData"], ["tooltip", ""], [1, "list-group"], ["class", "list-group-item d-flex justify-content-between align-items-center", "style", "background-color: transparent;", 4, "ngFor", "ngForOf"], [1, "list-group-item", "d-flex", "justify-content-between", "align-items-center", 2, "background-color", "transparent"], [3, "record", "titleLinkBehavior"], [1, "d-flex"], [1, "badge", "badge-pill", "badge-secondary", 2, "padding-top", "5px"], ["href", "#", "title", "Open document in workspace", 1, "open-record", "ml-2", 3, "click"], [1, "fas", "fa-arrow-circle-right"]], template: function BsFacetPreview_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsFacetPreview_div_0_Template, 4, 10, "div", 0);
        i0.ɵɵtemplate(1, BsFacetPreview_ul_1_Template, 2, 1, "ul", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !ctx.similarDocuments);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !!ctx.similarDocuments);
    } }, directives: [i2.NgIf, i2.NgStyle, i3.PreviewDocumentIframe, i4.PreviewTooltip, i2.NgForOf, i5.ResultTitle], pipes: [i2.DecimalPipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsFacetPreview, [{
        type: Component,
        args: [{
                selector: "sq-facet-preview",
                templateUrl: "./facet-preview.html",
            }]
    }], function () { return [{ type: i1.PreviewService }]; }, { record: [{
            type: Input
        }], sandbox: [{
            type: Input
        }], query: [{
            type: Input
        }], height: [{
            type: Input
        }], iframeClass: [{
            type: Input
        }], similarDocuments: [{
            type: Input
        }], recordOpened: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtcHJldmlldy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3ByZXZpZXcvIiwic291cmNlcyI6WyJib290c3RyYXAvZmFjZXQtcHJldmlldy9mYWNldC1wcmV2aWV3LnRzIiwiYm9vdHN0cmFwL2ZhY2V0LXByZXZpZXcvZmFjZXQtcHJldmlldy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTJCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7O0lDQS9GLDhCQUNJO0lBQUEscURBQ0k7SUFEeUUsbU9BQW9DO0lBQzdHLDJDQUFvRztJQUN4RyxpQkFBNkI7SUFDakMsaUJBQU07OztJQUp5Qix3RUFBMEM7SUFBQyxtRUFBNEI7SUFDckUsZUFBbUI7SUFBbkIsd0NBQW1CLG1DQUFBO0lBQ2YsZUFBNEI7SUFBNUIsaURBQTRCLDRCQUFBOzs7O0lBSTdELDZCQUNJO0lBQUEscUNBQStFO0lBQy9FLCtCQUNJO0lBQUEsZ0NBQXlFO0lBQUEsWUFBNEM7O0lBQUEsaUJBQU87SUFDNUgsNkJBQ0k7SUFEUSwwTkFBNkI7SUFDckMsd0JBQXlDO0lBQzdDLGlCQUFJO0lBQ1IsaUJBQU07SUFDVixpQkFBSzs7O0lBUGdCLGVBQWM7SUFBZCwrQkFBYyw2QkFBQTtJQUU4QyxlQUE0QztJQUE1QyxpRkFBNEM7OztJQUpqSSw2QkFDSTtJQUFBLGtFQVFLO0lBQ1QsaUJBQUs7OztJQVRtQixlQUFtQjtJQUFuQixpREFBbUI7O0FESzNDLE1BQU0sT0FBTyxjQUFjO0lBWXZCLFlBQ1ksY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTmhDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQThFLENBQUM7SUFPeEgsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FDcEUsV0FBVyxDQUFDLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDdkgsQ0FBQyxDQUFDLENBQUM7U0FDVjtJQUNMLENBQUM7SUFFRCxjQUFjLENBQUMsR0FBVztRQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNuQixNQUFNLEVBQUUsR0FBRztZQUNYLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixVQUFVLEVBQUUsSUFBSTtZQUNoQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDaEMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7NEVBbENRLGNBQWM7bURBQWQsY0FBYztRQ1gzQixnRUFJTTtRQUNOLDZEQVVLOztRQWZDLDRDQUF1QjtRQUtMLGVBQXdCO1FBQXhCLDZDQUF3Qjs7a0RETW5DLGNBQWM7Y0FKMUIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFdBQVcsRUFBRSxzQkFBc0I7YUFDdEM7aUVBRVksTUFBTTtrQkFBZCxLQUFLO1lBQ0csT0FBTztrQkFBZixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBQ0csTUFBTTtrQkFBZCxLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLGdCQUFnQjtrQkFBeEIsS0FBSztZQUNJLFlBQVk7a0JBQXJCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXN9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1NhZmVSZXNvdXJjZVVybH0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcbmltcG9ydCB7UXVlcnl9IGZyb20gJ0BzaW5lcXVhL2NvcmUvYXBwLXV0aWxzJztcbmltcG9ydCB7UmVjb3JkLCBQcmV2aWV3RGF0YX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge1ByZXZpZXdTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vcHJldmlldy5zZXJ2aWNlXCI7XG5pbXBvcnQge1ByZXZpZXdEb2N1bWVudH0gZnJvbSBcIi4uLy4uL3ByZXZpZXctZG9jdW1lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtZmFjZXQtcHJldmlld1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vZmFjZXQtcHJldmlldy5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEJzRmFjZXRQcmV2aWV3IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSByZWNvcmQ6IFJlY29yZDtcbiAgICBASW5wdXQoKSBzYW5kYm94OiBzdHJpbmcgfCBudWxsO1xuICAgIEBJbnB1dCgpIHF1ZXJ5OiBRdWVyeTtcbiAgICBASW5wdXQoKSBoZWlnaHQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBpZnJhbWVDbGFzczogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHNpbWlsYXJEb2N1bWVudHM6IFJlY29yZFtdO1xuICAgIEBPdXRwdXQoKSByZWNvcmRPcGVuZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtyZWNvcmQ6IFJlY29yZCwgcXVlcnk6IFF1ZXJ5LCBzdGFydFNtYWxsPzogYm9vbGVhbiwgaWZyYW1lQ2xhc3M/OiBzdHJpbmd9PigpO1xuICAgIGRhdGE6IFByZXZpZXdEYXRhO1xuICAgIGRvY3VtZW50OiBQcmV2aWV3RG9jdW1lbnQ7XG4gICAgZG93bmxvYWRVcmw/OiBTYWZlUmVzb3VyY2VVcmw7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBwcmV2aWV3U2VydmljZTogUHJldmlld1NlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzW1wicmVjb3JkXCJdIHx8IGNoYW5nZXNbXCJxdWVyeVwiXSkge1xuICAgICAgICAgICAgdGhpcy5wcmV2aWV3U2VydmljZS5nZXRQcmV2aWV3RGF0YSh0aGlzLnJlY29yZC5pZCwgdGhpcy5xdWVyeSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIHByZXZpZXdEYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcHJldmlld0RhdGE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bmxvYWRVcmwgPSB0aGlzLmRhdGEgPyB0aGlzLnByZXZpZXdTZXJ2aWNlLm1ha2VEb3dubG9hZFVybCh0aGlzLmRhdGEuZG9jdW1lbnRDYWNoZWRDb250ZW50VXJsKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW5TaW1pbGFyRG9jKGRvYzogUmVjb3JkKSB7XG4gICAgICAgIHRoaXMucmVjb3JkT3BlbmVkLm5leHQoe1xuICAgICAgICAgICAgcmVjb3JkOiBkb2MsXG4gICAgICAgICAgICBxdWVyeTogdGhpcy5xdWVyeSxcbiAgICAgICAgICAgIHN0YXJ0U21hbGw6IHRydWUsXG4gICAgICAgICAgICBpZnJhbWVDbGFzczogdGhpcy5pZnJhbWVDbGFzc1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn0iLCI8ZGl2ICpuZ0lmPVwiIXNpbWlsYXJEb2N1bWVudHNcIiBjbGFzcz1cImQtZmxleCBmbGV4LWNvbHVtbiB7e2lmcmFtZUNsYXNzfX1cIiBbbmdTdHlsZV09XCJ7aGVpZ2h0OiBoZWlnaHR9XCI+XG4gICAgPHNxLXByZXZpZXctZG9jdW1lbnQtaWZyYW1lICBbc2FuZGJveF09XCJzYW5kYm94XCIgW2Rvd25sb2FkVXJsXT1cImRvd25sb2FkVXJsXCIgKG9uUHJldmlld1JlYWR5KT1cImRvY3VtZW50ID0gJGV2ZW50XCI+XG4gICAgICAgIDxzcS1wcmV2aWV3LXRvb2x0aXAgI3Rvb2x0aXAgW3ByZXZpZXdEb2N1bWVudF09XCJkb2N1bWVudFwiIFtwcmV2aWV3RGF0YV09XCJkYXRhXCI+PC9zcS1wcmV2aWV3LXRvb2x0aXA+XG4gICAgPC9zcS1wcmV2aWV3LWRvY3VtZW50LWlmcmFtZT5cbjwvZGl2PlxuPHVsIGNsYXNzPVwibGlzdC1ncm91cFwiICpuZ0lmPVwiISFzaW1pbGFyRG9jdW1lbnRzXCI+XG4gICAgPGxpICpuZ0Zvcj1cImxldCBkb2Mgb2Ygc2ltaWxhckRvY3VtZW50c1wiIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiBhbGlnbi1pdGVtcy1jZW50ZXJcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1wiPlxuICAgICAgICA8c3EtcmVzdWx0LXRpdGxlIFtyZWNvcmRdPVwiZG9jXCIgW3RpdGxlTGlua0JlaGF2aW9yXT1cIidvcGVuJ1wiPjwvc3EtcmVzdWx0LXRpdGxlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2Utc2Vjb25kYXJ5XCIgc3R5bGU9XCJwYWRkaW5nLXRvcDogNXB4O1wiPnt7MTAwKmRvYy5nbG9iYWxyZWxldmFuY2UgfCBudW1iZXI6JzEuMC0wJ319PC9zcGFuPlxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiAoY2xpY2spPVwib3BlblNpbWlsYXJEb2MoZG9jKVwiIGNsYXNzPVwib3Blbi1yZWNvcmQgbWwtMlwiIHRpdGxlPVwiT3BlbiBkb2N1bWVudCBpbiB3b3Jrc3BhY2VcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1hcnJvdy1jaXJjbGUtcmlnaHRcIj48L2k+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvbGk+XG48L3VsPiJdfQ==