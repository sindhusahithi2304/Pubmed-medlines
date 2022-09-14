import { Component, Inject } from "@angular/core";
import { MODAL_MODEL } from "@sinequa/core/modal";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/components/search";
import * as i2 from "../../preview.service";
import * as i3 from "@sinequa/components/utils";
import * as i4 from "@sinequa/components/modal";
import * as i5 from "@angular/common";
import * as i6 from "../preview-panel/preview-panel";
import * as i7 from "@sinequa/core/intl";
function BsPreviewPopup_div_2_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#preview.previousDocument"), "");
} }
function BsPreviewPopup_div_2_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#preview.nextDocument"), "");
} }
function BsPreviewPopup_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelementStart(1, "button", 5);
    i0.ɵɵlistener("click", function BsPreviewPopup_div_2_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.previous(); });
    i0.ɵɵelement(2, "span", 6);
    i0.ɵɵtemplate(3, BsPreviewPopup_div_2_span_3_Template, 3, 3, "span", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 5);
    i0.ɵɵlistener("click", function BsPreviewPopup_div_2_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r4); const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.next(); });
    i0.ɵɵelement(5, "span", 8);
    i0.ɵɵtemplate(6, BsPreviewPopup_div_2_span_6_Template, 3, 3, "span", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassMapInterpolate1("btn btn btn-outline-primary ", !ctx_r0.previousEnabled ? "disabled" : "", "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.showPreviousNextText);
    i0.ɵɵadvance(1);
    i0.ɵɵclassMapInterpolate1("btn btn btn-outline-primary ", !ctx_r0.nextEnabled ? "disabled" : "", "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.showPreviousNextText);
} }
export class BsPreviewPopup {
    constructor(model, searchService, previewService, uiService, changeDetectorRef) {
        this.model = model;
        this.searchService = searchService;
        this.previewService = previewService;
        this.uiService = uiService;
        this.changeDetectorRef = changeDetectorRef;
    }
    ngOnInit() {
        this.screenSize = this.uiService.screenSize;
        this.resizeSubscription = Utils.subscribe(this.uiService.resizeEvent, (event) => {
            if (this.screenSize !== this.uiService.screenSize) {
                this.screenSize = this.uiService.screenSize;
                this.changeDetectorRef.markForCheck();
            }
        });
        this.updatePreviewData(this.model.record.id);
    }
    ngOnDestroy() {
        this.resizeSubscription.unsubscribe();
    }
    get currentId() {
        if (this.previewData && this.previewData.record) {
            return this.previewData.record.id;
        }
        return "";
    }
    updatePreviewData(id) {
        this.previewService.getPreviewData(id, this.model.query).subscribe(previewData => {
            this.previewData = previewData;
            this.previewDataError = false;
            this.changeDetectorRef.markForCheck();
        }, error => {
            this.previewDataError = true;
        });
    }
    get recordTitle() {
        if (this.previewData && this.previewData.record != null) {
            return this.previewData.record.title;
        }
        return this.previewDataError ? "msg#preview.noDocumentDataErrorPopupTitle" : "";
    }
    get showPreviousNextText() {
        return this.uiService.screenSizeIsGreaterOrEqual("lg");
    }
    get showPreviousNext() {
        return this.getSearchPositionInPage() >= 0 && !!this.searchService.results &&
            !!this.searchService.results.records && this.searchService.results.records.length > 1;
    }
    get previousEnabled() {
        return this.getSearchPositionInPage() > 0;
    }
    get nextEnabled() {
        if (!this.searchService.results || !this.searchService.results.records) {
            return false;
        }
        const searchPosition = this.getSearchPositionInPage();
        return searchPosition >= 0 && searchPosition < (this.searchService.results.records.length - 1);
    }
    getSearchPositionInPage() {
        const id = this.currentId;
        if (id && this.searchService.results && this.searchService.results.records) {
            for (let i = 0, ic = this.searchService.results.records.length; i < ic; i++) {
                const record = this.searchService.results.records[i];
                if (record.id === id) {
                    return i;
                }
            }
        }
        return -1;
    }
    previous() {
        if (!this.searchService.results || !this.searchService.results.records) {
            return;
        }
        const index = this.getSearchPositionInPage();
        if (index <= 0) {
            return;
        }
        const item = this.searchService.results.records[index - 1];
        this.updatePreviewData(item.id);
    }
    next() {
        if (!this.searchService.results || !this.searchService.results.records) {
            return;
        }
        const index = this.getSearchPositionInPage();
        if (index === -1 || index >= (this.searchService.results.records.length - 1)) {
            return;
        }
        const item = this.searchService.results.records[index + 1];
        this.updatePreviewData(item.id);
    }
}
BsPreviewPopup.ɵfac = function BsPreviewPopup_Factory(t) { return new (t || BsPreviewPopup)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(i1.SearchService), i0.ɵɵdirectiveInject(i2.PreviewService), i0.ɵɵdirectiveInject(i3.UIService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
BsPreviewPopup.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewPopup, selectors: [["sq-preview-popup"]], decls: 4, vars: 8, consts: [[1, "modal-content", "sq-preview-popup"], [3, "title", "showFooter"], ["header", "", "class", "previousNextDocumentButtons", 4, "ngIf"], [3, "leftPaneAdditionalClasses", "query", "previewData", "displaySimilarDocuments", "metadata"], ["header", "", 1, "previousNextDocumentButtons"], [3, "click"], ["aria-hidden", "true", 1, "fas", "fa-arrow-left"], [4, "ngIf"], ["aria-hidden", "true", 1, "fas", "fa-arrow-right"]], template: function BsPreviewPopup_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "sq-modal", 1);
        i0.ɵɵtemplate(2, BsPreviewPopup_div_2_Template, 7, 8, "div", 2);
        i0.ɵɵelement(3, "sq-preview-panel", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("title", ctx.recordTitle)("showFooter", false);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showPreviousNext);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("leftPaneAdditionalClasses", "d-none d-lg-block")("query", ctx.model.query)("previewData", ctx.previewData)("displaySimilarDocuments", ctx.model.displaySimilarDocuments)("metadata", ctx.model.metadata);
    } }, directives: [i4.BsModal, i5.NgIf, i6.BsPreviewPanel], pipes: [i7.MessagePipe], styles: [".previousNextDocumentButtons[_ngcontent-%COMP%]{display:inline-block;margin-left:auto;white-space:nowrap}.previousNextDocumentButtons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:not(:first-child){margin-left:.5em}.sq-preview-popup[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]{margin:0 15px}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsPreviewPopup, [{
        type: Component,
        args: [{
                selector: "sq-preview-popup",
                templateUrl: "./preview-popup.html",
                styleUrls: ["./preview-popup.css"]
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: i1.SearchService }, { type: i2.PreviewService }, { type: i3.UIService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy1wb3B1cC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3ByZXZpZXcvIiwic291cmNlcyI6WyJib290c3RyYXAvcHJldmlldy1wb3B1cC9wcmV2aWV3LXBvcHVwLnRzIiwiYm9vdHN0cmFwL3ByZXZpZXctcG9wdXAvcHJldmlldy1wb3B1cC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQXdDLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUl0RixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7Ozs7O0lDQ2lDLDRCQUFvQztJQUFBLFlBQThDOztJQUFBLGlCQUFPOztJQUFyRCxlQUE4QztJQUE5QyxvRkFBOEM7OztJQUdqRiw0QkFBb0M7SUFBQSxZQUEwQzs7SUFBQSxpQkFBTzs7SUFBakQsZUFBMEM7SUFBMUMsZ0ZBQTBDOzs7O0lBTGpKLDhCQUNJO0lBQUEsaUNBQ0k7SUFEK0UsZ0xBQW9CO0lBQ25HLDBCQUEwRDtJQUFBLHVFQUF5RjtJQUN2SixpQkFBUztJQUNULGlDQUNJO0lBRDJFLDRLQUFnQjtJQUMzRiwwQkFBMkQ7SUFBQSx1RUFBcUY7SUFDcEosaUJBQVM7SUFDYixpQkFBTTs7O0lBTk0sZUFBMEU7SUFBMUUsd0dBQTBFO0lBQ2IsZUFBMEI7SUFBMUIsa0RBQTBCO0lBRXZGLGVBQXNFO0lBQXRFLG9HQUFzRTtJQUNSLGVBQTBCO0lBQTFCLGtEQUEwQjs7QURjNUcsTUFBTSxPQUFPLGNBQWM7SUFNdkIsWUFDZ0MsS0FBd0IsRUFDN0MsYUFBNEIsRUFDNUIsY0FBOEIsRUFDM0IsU0FBb0IsRUFDdEIsaUJBQW9DO1FBSmhCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQzdDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLG1CQUFjLEdBQWQsY0FB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QU07dUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEluamVjdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtRdWVyeX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYXBwLXV0aWxzXCI7XG5pbXBvcnQge1JlY29yZH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge01PREFMX01PREVMfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9tb2RhbFwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHtQcmV2aWV3RGF0YX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge1NlYXJjaFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3NlYXJjaFwiO1xuaW1wb3J0IHtQcmV2aWV3U2VydmljZX0gZnJvbSBcIi4uLy4uL3ByZXZpZXcuc2VydmljZVwiO1xuaW1wb3J0IHtVSVNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3V0aWxzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJldmlld1BvcHVwTW9kZWwge1xuICAgIHJlY29yZDogUmVjb3JkO1xuICAgIHF1ZXJ5OiBRdWVyeTtcbiAgICBkaXNwbGF5U2ltaWxhckRvY3VtZW50czogYm9vbGVhbjtcbiAgICBtZXRhZGF0YTogc3RyaW5nW107XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLXByZXZpZXctcG9wdXBcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3ByZXZpZXctcG9wdXAuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9wcmV2aWV3LXBvcHVwLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBCc1ByZXZpZXdQb3B1cCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIHNjcmVlblNpemU6IHN0cmluZztcbiAgICBwcml2YXRlIHJlc2l6ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByZXZpZXdEYXRhOiBQcmV2aWV3RGF0YTtcbiAgICBwcml2YXRlIHByZXZpZXdEYXRhRXJyb3I6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChNT0RBTF9NT0RFTCkgcHVibGljIG1vZGVsOiBQcmV2aWV3UG9wdXBNb2RlbCxcbiAgICAgICAgcHVibGljIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBwcmV2aWV3U2VydmljZTogUHJldmlld1NlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCB1aVNlcnZpY2U6IFVJU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zY3JlZW5TaXplID0gdGhpcy51aVNlcnZpY2Uuc2NyZWVuU2l6ZTtcbiAgICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24gPSBVdGlscy5zdWJzY3JpYmUodGhpcy51aVNlcnZpY2UucmVzaXplRXZlbnQsXG4gICAgICAgICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JlZW5TaXplICE9PSB0aGlzLnVpU2VydmljZS5zY3JlZW5TaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NyZWVuU2l6ZSA9IHRoaXMudWlTZXJ2aWNlLnNjcmVlblNpemU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudXBkYXRlUHJldmlld0RhdGEodGhpcy5tb2RlbC5yZWNvcmQuaWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudElkKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByZXZpZXdEYXRhICYmIHRoaXMucHJldmlld0RhdGEucmVjb3JkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2aWV3RGF0YS5yZWNvcmQuaWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVQcmV2aWV3RGF0YShpZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucHJldmlld1NlcnZpY2UuZ2V0UHJldmlld0RhdGEoaWQsIHRoaXMubW9kZWwucXVlcnkpLnN1YnNjcmliZShcbiAgICAgICAgICAgIHByZXZpZXdEYXRhID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdEYXRhID0gcHJldmlld0RhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aWV3RGF0YUVycm9yID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aWV3RGF0YUVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHJlY29yZFRpdGxlKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByZXZpZXdEYXRhICYmIHRoaXMucHJldmlld0RhdGEucmVjb3JkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZpZXdEYXRhLnJlY29yZC50aXRsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcmV2aWV3RGF0YUVycm9yID8gXCJtc2cjcHJldmlldy5ub0RvY3VtZW50RGF0YUVycm9yUG9wdXBUaXRsZVwiIDogXCJcIjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNob3dQcmV2aW91c05leHRUZXh0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy51aVNlcnZpY2Uuc2NyZWVuU2l6ZUlzR3JlYXRlck9yRXF1YWwoXCJsZ1wiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNob3dQcmV2aW91c05leHQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNlYXJjaFBvc2l0aW9uSW5QYWdlKCkgPj0gMCAmJiAhIXRoaXMuc2VhcmNoU2VydmljZS5yZXN1bHRzICYmXG4gICAgICAgICAgICAhIXRoaXMuc2VhcmNoU2VydmljZS5yZXN1bHRzLnJlY29yZHMgJiYgdGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHMucmVjb3Jkcy5sZW5ndGggPiAxO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcHJldmlvdXNFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTZWFyY2hQb3NpdGlvbkluUGFnZSgpID4gMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG5leHRFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIXRoaXMuc2VhcmNoU2VydmljZS5yZXN1bHRzIHx8ICF0aGlzLnNlYXJjaFNlcnZpY2UucmVzdWx0cy5yZWNvcmRzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VhcmNoUG9zaXRpb24gPSB0aGlzLmdldFNlYXJjaFBvc2l0aW9uSW5QYWdlKCk7XG4gICAgICAgIHJldHVybiBzZWFyY2hQb3NpdGlvbiA+PSAwICYmIHNlYXJjaFBvc2l0aW9uIDwgKHRoaXMuc2VhcmNoU2VydmljZS5yZXN1bHRzLnJlY29yZHMubGVuZ3RoIC0gMSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRTZWFyY2hQb3NpdGlvbkluUGFnZSgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMuY3VycmVudElkO1xuICAgICAgICBpZiAoaWQgJiYgdGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHMgJiYgdGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHMucmVjb3Jkcykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGljID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHMucmVjb3Jkcy5sZW5ndGg7IGkgPCBpYzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHMucmVjb3Jkc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAocmVjb3JkLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIHB1YmxpYyBwcmV2aW91cygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlYXJjaFNlcnZpY2UucmVzdWx0cyB8fCAhdGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHMucmVjb3Jkcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRTZWFyY2hQb3NpdGlvbkluUGFnZSgpO1xuICAgICAgICBpZiAoaW5kZXggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnNlYXJjaFNlcnZpY2UucmVzdWx0cy5yZWNvcmRzW2luZGV4IC0gMV07XG4gICAgICAgIHRoaXMudXBkYXRlUHJldmlld0RhdGEoaXRlbS5pZCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5leHQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHMgfHwgIXRoaXMuc2VhcmNoU2VydmljZS5yZXN1bHRzLnJlY29yZHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0U2VhcmNoUG9zaXRpb25JblBhZ2UoKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSB8fCBpbmRleCA+PSAodGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHMucmVjb3Jkcy5sZW5ndGggLSAxKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnNlYXJjaFNlcnZpY2UucmVzdWx0cy5yZWNvcmRzW2luZGV4ICsgMV07XG4gICAgICAgIHRoaXMudXBkYXRlUHJldmlld0RhdGEoaXRlbS5pZCk7XG4gICAgfVxufSIsIjxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50IHNxLXByZXZpZXctcG9wdXBcIj5cbiAgICA8c3EtbW9kYWwgXG4gICAgICAgIFt0aXRsZV09XCJyZWNvcmRUaXRsZVwiXG4gICAgICAgIFtzaG93Rm9vdGVyXT1cImZhbHNlXCI+XG4gICAgICAgIDxkaXYgaGVhZGVyICpuZ0lmPVwic2hvd1ByZXZpb3VzTmV4dFwiIGNsYXNzPVwicHJldmlvdXNOZXh0RG9jdW1lbnRCdXR0b25zXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0biBidG4tb3V0bGluZS1wcmltYXJ5IHt7IXByZXZpb3VzRW5hYmxlZCA/ICdkaXNhYmxlZCcgOiAnJ319XCIgKGNsaWNrKT1cInByZXZpb3VzKClcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhcyBmYS1hcnJvdy1sZWZ0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPjxzcGFuICpuZ0lmPVwic2hvd1ByZXZpb3VzTmV4dFRleHRcIj4ge3snbXNnI3ByZXZpZXcucHJldmlvdXNEb2N1bWVudCcgfCBzcU1lc3NhZ2V9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4gYnRuLW91dGxpbmUtcHJpbWFyeSB7eyFuZXh0RW5hYmxlZCA/ICdkaXNhYmxlZCcgOiAnJ319XCIgKGNsaWNrKT1cIm5leHQoKVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmFzIGZhLWFycm93LXJpZ2h0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPjxzcGFuICpuZ0lmPVwic2hvd1ByZXZpb3VzTmV4dFRleHRcIj4ge3snbXNnI3ByZXZpZXcubmV4dERvY3VtZW50JyB8IHNxTWVzc2FnZX19PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8c3EtcHJldmlldy1wYW5lbCBbbGVmdFBhbmVBZGRpdGlvbmFsQ2xhc3Nlc109XCInZC1ub25lIGQtbGctYmxvY2snXCIgW3F1ZXJ5XT1cIm1vZGVsLnF1ZXJ5XCIgW3ByZXZpZXdEYXRhXT1cInByZXZpZXdEYXRhXCIgW2Rpc3BsYXlTaW1pbGFyRG9jdW1lbnRzXT1cIm1vZGVsLmRpc3BsYXlTaW1pbGFyRG9jdW1lbnRzXCIgW21ldGFkYXRhXT1cIm1vZGVsLm1ldGFkYXRhXCI+XG4gICAgICAgIDwvc3EtcHJldmlldy1wYW5lbD5cbiAgICA8L3NxLW1vZGFsPlxuPC9kaXY+Il19