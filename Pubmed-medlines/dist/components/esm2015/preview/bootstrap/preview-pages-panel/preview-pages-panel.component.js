import { Component, Input, Output, EventEmitter, ViewChildren, ElementRef } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "../../preview.service";
import * as i2 from "@angular/common";
import * as i3 from "../preview-extracts-panel/preview-extracts-panel.component";
import * as i4 from "@sinequa/core/intl";
const _c0 = ["currentPageEl"];
function BsPreviewPagesPanelComponent_div_0_a_1_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵelement(1, "div", 9);
    i0.ɵɵelementEnd();
} }
const _c1 = function () { return { page: 1 }; };
const _c2 = function (a0) { return { values: a0 }; };
function BsPreviewPagesPanelComponent_div_0_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 4);
    i0.ɵɵlistener("click", function BsPreviewPagesPanelComponent_div_0_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r4 = i0.ɵɵnextContext(2); return ctx_r4.selectPage(1); });
    i0.ɵɵelementStart(1, "div", 5);
    i0.ɵɵelementStart(2, "span", 6);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, BsPreviewPagesPanelComponent_div_0_a_1_div_5_Template, 2, 0, "div", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 2, "msg#preview.page", i0.ɵɵpureFunction1(6, _c2, i0.ɵɵpureFunction0(5, _c1))));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1._pendingPage === 1);
} }
function BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_p_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p", 12);
} if (rf & 2) {
    const page_r6 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵproperty("innerHTML", page_r6.relevantExtracts, i0.ɵɵsanitizeHtml);
} }
function BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵelement(1, "div", 9);
    i0.ɵɵelementEnd();
} }
const _c3 = function (a0) { return { page: a0 }; };
function BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 4);
    i0.ɵɵlistener("click", function BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r14); const page_r6 = i0.ɵɵnextContext().$implicit; const ctx_r12 = i0.ɵɵnextContext(2); return ctx_r12.selectPage(page_r6.$page); });
    i0.ɵɵelementStart(1, "div", 5);
    i0.ɵɵelementStart(2, "span", 6);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_p_5_Template, 1, 1, "p", 11);
    i0.ɵɵtemplate(6, BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_div_6_Template, 2, 0, "div", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const page_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 3, "msg#preview.page", i0.ɵɵpureFunction1(8, _c2, i0.ɵɵpureFunction1(6, _c3, page_r6.$page))));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r7._pendingPage !== page_r6.$page);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7._pendingPage === page_r6.$page);
} }
function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_1_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵelement(1, "div", 9);
    i0.ɵɵelementEnd();
} }
function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 4);
    i0.ɵɵlistener("click", function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r22); const ctx_r21 = i0.ɵɵnextContext(4); return ctx_r21.selectPrevious(); });
    i0.ɵɵelementStart(1, "div", 5);
    i0.ɵɵelementStart(2, "span", 6);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵpipe(5, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_1_div_6_Template, 2, 0, "div", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r16 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(4, 3, "msg#preview.page", i0.ɵɵpureFunction1(10, _c2, i0.ɵɵpureFunction1(8, _c3, ctx_r16.currentPage - 1))), " (", i0.ɵɵpipeBind1(5, 6, "msg#preview.previousDocument"), ")");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r16._pendingPage === ctx_r16.currentPage - 1);
} }
function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_sq_preview_extracts_panel_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "sq-preview-extracts-panel", 18);
} if (rf & 2) {
    const ctx_r18 = i0.ɵɵnextContext(4);
    i0.ɵɵstyleMap(ctx_r18.style);
    i0.ɵɵproperty("previewData", ctx_r18.previewData)("previewDocument", ctx_r18.previewDocument);
} }
function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_10_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵelement(1, "div", 9);
    i0.ɵɵelementEnd();
} }
function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_10_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 4);
    i0.ɵɵlistener("click", function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_10_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r25); const ctx_r24 = i0.ɵɵnextContext(4); return ctx_r24.selectNext(); });
    i0.ɵɵelementStart(1, "div", 5);
    i0.ɵɵelementStart(2, "span", 6);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵpipe(5, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_10_div_6_Template, 2, 0, "div", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r19 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(4, 3, "msg#preview.page", i0.ɵɵpureFunction1(10, _c2, i0.ɵɵpureFunction1(8, _c3, ctx_r19.currentPage + 1))), " (", i0.ɵɵpipeBind1(5, 6, "msg#preview.nextDocument"), ")");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r19._pendingPage === ctx_r19.currentPage + 1);
} }
function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_1_Template, 7, 12, "a", 2);
    i0.ɵɵelementStart(2, "div", 13, 14);
    i0.ɵɵelementStart(4, "div", 15);
    i0.ɵɵelementStart(5, "span", 16);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "sqMessage");
    i0.ɵɵpipe(8, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_sq_preview_extracts_panel_9_Template, 1, 4, "sq-preview-extracts-panel", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_10_Template, 7, 12, "a", 2);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r8.hasPrevious);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(7, 5, "msg#preview.page", i0.ɵɵpureFunction1(12, _c2, i0.ɵɵpureFunction1(10, _c3, ctx_r8.currentPage))), " (", i0.ɵɵpipeBind1(8, 8, "msg#preview.current"), ")");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r8._pendingPreviewDocument);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r8.hasNext);
} }
function BsPreviewPagesPanelComponent_div_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_Template, 7, 10, "a", 2);
    i0.ɵɵtemplate(2, BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_Template, 11, 14, "ng-container", 10);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const page_r6 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.currentPage !== page_r6.$page);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.currentPage === page_r6.$page);
} }
function BsPreviewPagesPanelComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtemplate(1, BsPreviewPagesPanelComponent_div_0_a_1_Template, 6, 8, "a", 2);
    i0.ɵɵtemplate(2, BsPreviewPagesPanelComponent_div_0_ng_container_2_Template, 3, 2, "ng-container", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.hasFirst);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.sortedPages);
} }
export class BsPreviewPagesPanelComponent {
    constructor(previewService) {
        this.previewService = previewService;
        this.style = "light";
        this.gotopage = new EventEmitter();
        this._pendingPreviewDocument = true;
        this._pendingPages = true;
    }
    ngOnChanges(changes) {
        // PreviewData should change first, which triggers the new previewDocument and pages
        if (changes["previewData"]) {
            this._pendingPreviewDocument = true;
            this._pendingPages = true;
        }
        if (changes["previewDocument"]) {
            this._pendingPreviewDocument = false;
        }
        if (changes["pages"]) {
            this._pendingPages = false;
        }
        // ngOnChanges is called multiple times due to async updates of the Inputs()
        // The _pending variables let us wait for all these inputs to come in before apply the changes
        if (!this._pendingPreviewDocument && !this._pendingPages) {
            this._pendingPage = undefined;
            if (this.previewData) {
                this.currentPage = this.previewData.record.$page;
                this.containerid = this.previewData.record.containerid;
            }
            if (this.pages && this.currentPage && this.containerid) {
                this.sortedPages = this.pages.records;
                // Parse the page number from each record id
                this.sortedPages.forEach(record => {
                    this.previewService.getPageNumber(record);
                    if (!record.$page) {
                        throw new Error("Record is not page... " + record.id);
                    }
                });
                // Insert current page if missing (possible when navigating to previous/next page)
                if (!this.sortedPages.find(page => page.$page === this.currentPage)) {
                    this.sortedPages.push(this.previewData.record);
                }
                // Sort the pages
                this.sortedPages.sort((a, b) => a.$page - b.$page);
                // Update current page neighbours
                this.hasFirst = !!this.sortedPages.find(page => page.$page === 1 || this.currentPage === 2); // include 2nd page, because is covered by the previous page below
                this.hasPrevious = this.currentPage === 1 || !!this.sortedPages.find(page => page.$page === this.currentPage - 1);
                this.hasNext = !!this.sortedPages.find(page => page.$page === this.currentPage + 1);
            }
            // SetTimeout is needed to scroll only after the DOM changes
            setTimeout(() => {
                var _a, _b;
                (_b = (_a = this.currentPageEl) === null || _a === void 0 ? void 0 : _a.first) === null || _b === void 0 ? void 0 : _b.nativeElement.scrollIntoView({ behaviour: "smooth", block: "start" });
            });
        }
    }
    selectPage(page) {
        this.gotopage.next(page);
        this._pendingPage = page;
        return false;
    }
    selectPrevious() {
        return this.selectPage(this.currentPage - 1);
    }
    selectNext() {
        return this.selectPage(this.currentPage + 1);
    }
}
BsPreviewPagesPanelComponent.ɵfac = function BsPreviewPagesPanelComponent_Factory(t) { return new (t || BsPreviewPagesPanelComponent)(i0.ɵɵdirectiveInject(i1.PreviewService)); };
BsPreviewPagesPanelComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewPagesPanelComponent, selectors: [["sq-preview-pages-panel"]], viewQuery: function BsPreviewPagesPanelComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true, ElementRef);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.currentPageEl = _t);
    } }, inputs: { pages: "pages", previewData: "previewData", previewDocument: "previewDocument", style: "style" }, outputs: { gotopage: "gotopage" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "list-group", 4, "ngIf"], [1, "list-group"], ["href", "#", "class", "card my-1 list-group-item-action", 3, "click", 4, "ngIf"], [4, "ngFor", "ngForOf"], ["href", "#", 1, "card", "my-1", "list-group-item-action", 3, "click"], [1, "card-body"], [1, "small", "text-muted"], ["class", "text-center my-3", 4, "ngIf"], [1, "text-center", "my-3"], ["role", "status", 1, "spinner-grow"], [4, "ngIf"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML"], [1, "card", "my-1"], ["currentPageEl", ""], [1, "card-body", "m-0"], [1, "small", "font-weight-bold", "mb-1"], ["class", "d-flex flex-column", "style", "height: 300px;", 3, "previewData", "previewDocument", "style", 4, "ngIf"], [1, "d-flex", "flex-column", 2, "height", "300px", 3, "previewData", "previewDocument"]], template: function BsPreviewPagesPanelComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsPreviewPagesPanelComponent_div_0_Template, 3, 2, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.sortedPages);
    } }, directives: [i2.NgIf, i2.NgForOf, i3.BsPreviewExtractsPanelComponent], pipes: [i4.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsPreviewPagesPanelComponent, [{
        type: Component,
        args: [{
                selector: 'sq-preview-pages-panel',
                templateUrl: './preview-pages-panel.component.html'
            }]
    }], function () { return [{ type: i1.PreviewService }]; }, { pages: [{
            type: Input
        }], previewData: [{
            type: Input
        }], previewDocument: [{
            type: Input
        }], style: [{
            type: Input
        }], gotopage: [{
            type: Output
        }], currentPageEl: [{
            type: ViewChildren,
            args: ['currentPageEl', { read: ElementRef }]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy1wYWdlcy1wYW5lbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9wcmV2aWV3LyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL3ByZXZpZXctcGFnZXMtcGFuZWwvcHJldmlldy1wYWdlcy1wYW5lbC5jb21wb25lbnQudHMiLCJib290c3RyYXAvcHJldmlldy1wYWdlcy1wYW5lbC9wcmV2aWV3LXBhZ2VzLXBhbmVsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBNEIsWUFBWSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0lDUTFILDhCQUNJO0lBQUEseUJBQThDO0lBQ2xELGlCQUFNOzs7Ozs7SUFQZCw0QkFHSTtJQUZBLDJMQUFvQixDQUFDLEtBQUU7SUFFdkIsOEJBQ0k7SUFBQSwrQkFBK0I7SUFBQSxZQUF3RDs7SUFBQSxpQkFBTztJQUM5Rix1RkFFTTtJQUNWLGlCQUFNO0lBQ1YsaUJBQUk7OztJQUxtQyxlQUF3RDtJQUF4RCxzSEFBd0Q7SUFDeEQsZUFBd0I7SUFBeEIsZ0RBQXdCOzs7SUFlbkQsd0JBQStFOzs7SUFBNUUsdUVBQW1DOzs7SUFDdEMsOEJBQ0k7SUFBQSx5QkFBOEM7SUFDbEQsaUJBQU07Ozs7O0lBUmQsNEJBR0k7SUFGQSw2UUFBZ0M7SUFFaEMsOEJBQ0k7SUFBQSwrQkFBK0I7SUFBQSxZQUFpRTs7SUFBQSxpQkFBTztJQUN2RyxtR0FBK0U7SUFDL0Usc0dBRU07SUFDVixpQkFBTTtJQUNWLGlCQUFJOzs7O0lBTm1DLGVBQWlFO0lBQWpFLHFJQUFpRTtJQUN4RCxlQUFpQztJQUFqQyw0REFBaUM7SUFDMUMsZUFBaUM7SUFBakMsNERBQWlDOzs7SUFhNUQsOEJBQ0k7SUFBQSx5QkFBOEM7SUFDbEQsaUJBQU07Ozs7SUFQZCw0QkFH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LE1BQU07WUFFNEMsYUFBYTtrQkFBL0QsWUFBWTttQkFBQyxlQUFlLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkcmVuLCBFbGVtZW50UmVmLCBRdWVyeUxpc3QgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUHJldmlld0RvY3VtZW50IH0gZnJvbSBcIi4uLy4uL3ByZXZpZXctZG9jdW1lbnRcIjtcbmltcG9ydCB7IFByZXZpZXdTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3ByZXZpZXcuc2VydmljZVwiO1xuaW1wb3J0IHsgUHJldmlld0RhdGEsIFJlc3VsdHMsIFJlY29yZCB9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3NxLXByZXZpZXctcGFnZXMtcGFuZWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wcmV2aWV3LXBhZ2VzLXBhbmVsLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBCc1ByZXZpZXdQYWdlc1BhbmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBwYWdlczogUmVzdWx0cztcbiAgICBASW5wdXQoKSBwcmV2aWV3RGF0YTogUHJldmlld0RhdGE7XG4gICAgQElucHV0KCkgcHJldmlld0RvY3VtZW50OiBQcmV2aWV3RG9jdW1lbnQ7XG4gICAgQElucHV0KCkgc3R5bGU6IFwibGlnaHRcInxcImRhcmtcIiA9IFwibGlnaHRcIjtcbiAgICBAT3V0cHV0KCkgZ290b3BhZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIEBWaWV3Q2hpbGRyZW4oJ2N1cnJlbnRQYWdlRWwnLCB7cmVhZDogRWxlbWVudFJlZn0pIGN1cnJlbnRQYWdlRWw6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcblxuICAgIHNvcnRlZFBhZ2VzOiBSZWNvcmRbXTtcblxuICAgIGNvbnRhaW5lcmlkOiBzdHJpbmc7XG4gICAgY3VycmVudFBhZ2U6IG51bWJlcjtcblxuICAgIGhhc0ZpcnN0OiBib29sZWFuO1xuICAgIGhhc1ByZXZpb3VzOiBib29sZWFuO1xuICAgIGhhc05leHQ6IGJvb2xlYW47XG5cbiAgICBfcGVuZGluZ1ByZXZpZXdEb2N1bWVudDogYm9vbGVhbiA9IHRydWU7XG4gICAgX3BlbmRpbmdQYWdlczogYm9vbGVhbiA9IHRydWU7XG4gICAgX3BlbmRpbmdQYWdlPzogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHByZXZpZXdTZXJ2aWNlOiBQcmV2aWV3U2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuXG4gICAgICAgIC8vIFByZXZpZXdEYXRhIHNob3VsZCBjaGFuZ2UgZmlyc3QsIHdoaWNoIHRyaWdnZXJzIHRoZSBuZXcgcHJldmlld0RvY3VtZW50IGFuZCBwYWdlc1xuICAgICAgICBpZihjaGFuZ2VzW1wicHJldmlld0RhdGFcIl0pIHtcbiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdQcmV2aWV3RG9jdW1lbnQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ1BhZ2VzID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNoYW5nZXNbXCJwcmV2aWV3RG9jdW1lbnRcIl0pIHtcbiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdQcmV2aWV3RG9jdW1lbnQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNoYW5nZXNbXCJwYWdlc1wiXSkge1xuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ1BhZ2VzID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBuZ09uQ2hhbmdlcyBpcyBjYWxsZWQgbXVsdGlwbGUgdGltZXMgZHVlIHRvIGFzeW5jIHVwZGF0ZXMgb2YgdGhlIElucHV0cygpXG4gICAgICAgIC8vIFRoZSBfcGVuZGluZyB2YXJpYWJsZXMgbGV0IHVzIHdhaXQgZm9yIGFsbCB0aGVzZSBpbnB1dHMgdG8gY29tZSBpbiBiZWZvcmUgYXBwbHkgdGhlIGNoYW5nZXNcbiAgICAgICAgaWYoIXRoaXMuX3BlbmRpbmdQcmV2aWV3RG9jdW1lbnQgJiYgIXRoaXMuX3BlbmRpbmdQYWdlcykge1xuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ1BhZ2UgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIGlmKHRoaXMucHJldmlld0RhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5wcmV2aWV3RGF0YS5yZWNvcmQuJHBhZ2UhO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyaWQgPSB0aGlzLnByZXZpZXdEYXRhLnJlY29yZC5jb250YWluZXJpZCE7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBpZih0aGlzLnBhZ2VzICYmIHRoaXMuY3VycmVudFBhZ2UgJiYgdGhpcy5jb250YWluZXJpZCkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0ZWRQYWdlcyA9IHRoaXMucGFnZXMucmVjb3JkcztcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBQYXJzZSB0aGUgcGFnZSBudW1iZXIgZnJvbSBlYWNoIHJlY29yZCBpZFxuICAgICAgICAgICAgICAgIHRoaXMuc29ydGVkUGFnZXMuZm9yRWFjaChyZWNvcmQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdTZXJ2aWNlLmdldFBhZ2VOdW1iZXIocmVjb3JkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXJlY29yZC4kcGFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVjb3JkIGlzIG5vdCBwYWdlLi4uIFwiKyByZWNvcmQuaWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICAgICAgICAgLy8gSW5zZXJ0IGN1cnJlbnQgcGFnZSBpZiBtaXNzaW5nIChwb3NzaWJsZSB3aGVuIG5hdmlnYXRpbmcgdG8gcHJldmlvdXMvbmV4dCBwYWdlKVxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLnNvcnRlZFBhZ2VzLmZpbmQocGFnZSA9PiBwYWdlLiRwYWdlID09PSB0aGlzLmN1cnJlbnRQYWdlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRlZFBhZ2VzLnB1c2godGhpcy5wcmV2aWV3RGF0YS5yZWNvcmQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAvLyBTb3J0IHRoZSBwYWdlc1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydGVkUGFnZXMuc29ydCgoYSxiKSA9PiBhLiRwYWdlISAtIGIuJHBhZ2UhKTtcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgY3VycmVudCBwYWdlIG5laWdoYm91cnNcbiAgICAgICAgICAgICAgICB0aGlzLmhhc0ZpcnN0ID0gISF0aGlzLnNvcnRlZFBhZ2VzLmZpbmQocGFnZSA9PiBwYWdlLiRwYWdlISA9PT0gMSB8fCB0aGlzLmN1cnJlbnRQYWdlID09PSAyICk7IC8vIGluY2x1ZGUgMm5kIHBhZ2UsIGJlY2F1c2UgaXMgY292ZXJlZCBieSB0aGUgcHJldmlvdXMgcGFnZSBiZWxvd1xuICAgICAgICAgICAgICAgIHRoaXMuaGFzUHJldmlvdXMgPSB0aGlzLmN1cnJlbnRQYWdlID09PSAxIHx8ICEhdGhpcy5zb3J0ZWRQYWdlcy5maW5kKHBhZ2UgPT4gcGFnZS4kcGFnZSA9PT0gdGhpcy5jdXJyZW50UGFnZSAtIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFzTmV4dCA9ICEhdGhpcy5zb3J0ZWRQYWdlcy5maW5kKHBhZ2UgPT4gcGFnZS4kcGFnZSA9PT0gdGhpcy5jdXJyZW50UGFnZSArIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTZXRUaW1lb3V0IGlzIG5lZWRlZCB0byBzY3JvbGwgb25seSBhZnRlciB0aGUgRE9NIGNoYW5nZXNcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VFbD8uZmlyc3Q/Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW91cjogXCJzbW9vdGhcIiwgYmxvY2s6IFwic3RhcnRcIn0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHNlbGVjdFBhZ2UocGFnZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZ290b3BhZ2UubmV4dChwYWdlKTtcbiAgICAgICAgdGhpcy5fcGVuZGluZ1BhZ2UgPSBwYWdlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdFBhZ2UodGhpcy5jdXJyZW50UGFnZS0xKTtcbiAgICB9XG5cbiAgICBzZWxlY3ROZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RQYWdlKHRoaXMuY3VycmVudFBhZ2UrMSk7XG4gICAgfVxufSIsIjxkaXYgY2xhc3M9XCJsaXN0LWdyb3VwXCIgKm5nSWY9XCJzb3J0ZWRQYWdlc1wiPlxuXG4gICAgPCEtLSBGaXJzdCBwYWdlIGxpbmsgaWYgbmVlZGVkLS0+XG4gICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImNhcmQgbXktMSBsaXN0LWdyb3VwLWl0ZW0tYWN0aW9uXCJcbiAgICAgICAgKGNsaWNrKT1cInNlbGVjdFBhZ2UoMSlcIlxuICAgICAgICAqbmdJZj1cIiFoYXNGaXJzdFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNtYWxsIHRleHQtbXV0ZWRcIj57eyAnbXNnI3ByZXZpZXcucGFnZScgfCBzcU1lc3NhZ2U6e3ZhbHVlczp7cGFnZTogMX0gfSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlciBteS0zXCIgKm5nSWY9XCJfcGVuZGluZ1BhZ2UgPT09IDFcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1ncm93XCIgcm9sZT1cInN0YXR1c1wiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvYT5cblxuICAgIDwhLS0gRm9yIGVhY2ggcGFnZSBpbiB0aGUgZG9jdW1lbnQgLS0+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgcGFnZSBvZiBzb3J0ZWRQYWdlc1wiPlxuXG4gICAgICAgIDwhLS0gTGluayB0byBwYWdlIG90aGVyIHRoYW4gY3VycmVudCAtLT5cbiAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImNhcmQgbXktMSBsaXN0LWdyb3VwLWl0ZW0tYWN0aW9uXCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RQYWdlKHBhZ2UuJHBhZ2UpXCJcbiAgICAgICAgICAgICpuZ0lmPVwiY3VycmVudFBhZ2UgIT09IHBhZ2UuJHBhZ2VcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIiA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzbWFsbCB0ZXh0LW11dGVkXCI+e3sgJ21zZyNwcmV2aWV3LnBhZ2UnIHwgc3FNZXNzYWdlOnt2YWx1ZXM6e3BhZ2U6IHBhZ2UuJHBhZ2V9IH0gfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHAgW2lubmVySFRNTF09XCJwYWdlLnJlbGV2YW50RXh0cmFjdHNcIiAqbmdJZj1cIl9wZW5kaW5nUGFnZSAhPT0gcGFnZS4kcGFnZVwiPjwvcD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXIgbXktM1wiICpuZ0lmPVwiX3BlbmRpbmdQYWdlID09PSBwYWdlLiRwYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWdyb3dcIiByb2xlPVwic3RhdHVzXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9hPlxuXG4gICAgICAgIDwhLS0gRm9yIGN1cnJlbnQgcGFnZSB3ZSBkaXNwbGF5IGV4dHJhY3RzIC0tPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY3VycmVudFBhZ2UgPT09IHBhZ2UuJHBhZ2VcIj5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJjYXJkIG15LTEgbGlzdC1ncm91cC1pdGVtLWFjdGlvblwiXG4gICAgICAgICAgICAgICAgKm5nSWY9XCIhaGFzUHJldmlvdXNcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RQcmV2aW91cygpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNtYWxsIHRleHQtbXV0ZWRcIj57eyAnbXNnI3ByZXZpZXcucGFnZScgfCBzcU1lc3NhZ2U6e3ZhbHVlczp7cGFnZTogY3VycmVudFBhZ2UgLSAxfSB9IH19ICh7eyAnbXNnI3ByZXZpZXcucHJldmlvdXNEb2N1bWVudCcgfCBzcU1lc3NhZ2UgfX0pPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXIgbXktM1wiICpuZ0lmPVwiX3BlbmRpbmdQYWdlID09PSBjdXJyZW50UGFnZSAtIDFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWdyb3dcIiByb2xlPVwic3RhdHVzXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQgbXktMVwiICNjdXJyZW50UGFnZUVsPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHkgbS0wXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic21hbGwgZm9udC13ZWlnaHQtYm9sZCBtYi0xXCI+e3sgJ21zZyNwcmV2aWV3LnBhZ2UnIHwgc3FNZXNzYWdlOnt2YWx1ZXM6e3BhZ2U6IGN1cnJlbnRQYWdlfSB9IH19ICh7eyAnbXNnI3ByZXZpZXcuY3VycmVudCcgfCBzcU1lc3NhZ2UgfX0pPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3EtcHJldmlldy1leHRyYWN0cy1wYW5lbCBcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiIV9wZW5kaW5nUHJldmlld0RvY3VtZW50XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImQtZmxleCBmbGV4LWNvbHVtblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cImhlaWdodDogMzAwcHg7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcmV2aWV3RGF0YV09XCJwcmV2aWV3RGF0YVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbcHJldmlld0RvY3VtZW50XT1cInByZXZpZXdEb2N1bWVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGVdPVwic3R5bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9zcS1wcmV2aWV3LWV4dHJhY3RzLXBhbmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiY2FyZCBteS0xIGxpc3QtZ3JvdXAtaXRlbS1hY3Rpb25cIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwiIWhhc05leHRcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3ROZXh0KClcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic21hbGwgdGV4dC1tdXRlZFwiPnt7ICdtc2cjcHJldmlldy5wYWdlJyB8IHNxTWVzc2FnZTp7dmFsdWVzOntwYWdlOiBjdXJyZW50UGFnZSArIDF9IH0gfX0gKHt7ICdtc2cjcHJldmlldy5uZXh0RG9jdW1lbnQnIHwgc3FNZXNzYWdlIH19KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2VudGVyIG15LTNcIiAqbmdJZj1cIl9wZW5kaW5nUGFnZSA9PT0gY3VycmVudFBhZ2UgKyAxXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1ncm93XCIgcm9sZT1cInN0YXR1c1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvZGl2PiJdfQ==