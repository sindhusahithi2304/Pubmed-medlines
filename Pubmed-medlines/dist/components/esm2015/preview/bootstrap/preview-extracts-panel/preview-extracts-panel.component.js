import { ChangeDetectionStrategy, Component, Inject, Input, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Action } from "@sinequa/components/action";
import { PreviewDocument } from '../../preview-document';
import * as i0 from "@angular/core";
import * as i1 from "../../preview.service";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/common";
import * as i4 from "@sinequa/components/action";
import * as i5 from "@angular/cdk/scrolling";
import * as i6 from "@sinequa/core/intl";
const _c0 = ["scrollViewport"];
const _c1 = function (a0) { return [a0]; };
const _c2 = function (a0) { return { items: a0, autoAdjust: true }; };
function BsPreviewExtractsPanelComponent_ng_container_0_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelementStart(1, "button", 7);
    i0.ɵɵlistener("click", function BsPreviewExtractsPanelComponent_ng_container_0_div_1_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(2); return ctx_r7.previousExtract(); });
    i0.ɵɵelement(2, "i", 8);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(5, "div", 9);
    i0.ɵɵelementStart(6, "button", 10);
    i0.ɵɵlistener("click", function BsPreviewExtractsPanelComponent_ng_container_0_div_1_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r8); const ctx_r9 = i0.ɵɵnextContext(2); return ctx_r9.nextExtract(); });
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "sqMessage");
    i0.ɵɵelement(9, "i", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r2.currentIndex < 1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\u00A0", i0.ɵɵpipeBind1(4, 5, "msg#preview.previousDocument"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction1(11, _c2, i0.ɵɵpureFunction1(9, _c1, ctx_r2.sortAction)));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r2.currentIndex >= ctx_r2.extracts.length - 1);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(8, 7, "msg#preview.nextDocument"), "\u00A0");
} }
function BsPreviewExtractsPanelComponent_ng_container_0_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵelement(1, "div", 13);
    i0.ɵɵelementEnd();
} }
function BsPreviewExtractsPanelComponent_ng_container_0_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "msg#preview.noextract"));
} }
const _c3 = function (a0) { return { "active": a0 }; };
function BsPreviewExtractsPanelComponent_ng_container_0_ng_template_4_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵelementStart(1, "a", 19);
    i0.ɵɵlistener("click", function BsPreviewExtractsPanelComponent_ng_container_0_ng_template_4_div_2_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r15); const extract_r12 = ctx.$implicit; const i_r13 = ctx.index; const ctx_r14 = i0.ɵɵnextContext(3); return ctx_r14.scrollExtract(extract_r12, i_r13); });
    i0.ɵɵelement(2, "p", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const extract_r12 = ctx.$implicit;
    const i_r13 = ctx.index;
    const ctx_r11 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c3, i_r13 === ctx_r11.currentIndex));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", extract_r12.text, i0.ɵɵsanitizeHtml);
} }
function BsPreviewExtractsPanelComponent_ng_container_0_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "cdk-virtual-scroll-viewport", 15, 16);
    i0.ɵɵtemplate(2, BsPreviewExtractsPanelComponent_ng_container_0_ng_template_4_div_2_Template, 3, 4, "div", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("itemSize", 64);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("cdkVirtualForOf", ctx_r6.extracts);
} }
function BsPreviewExtractsPanelComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsPreviewExtractsPanelComponent_ng_container_0_div_1_Template, 10, 13, "div", 2);
    i0.ɵɵtemplate(2, BsPreviewExtractsPanelComponent_ng_container_0_div_2_Template, 2, 0, "div", 3);
    i0.ɵɵtemplate(3, BsPreviewExtractsPanelComponent_ng_container_0_div_3_Template, 4, 3, "div", 4);
    i0.ɵɵtemplate(4, BsPreviewExtractsPanelComponent_ng_container_0_ng_template_4_Template, 3, 2, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const _r5 = i0.ɵɵreference(5);
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r0.extracts == null ? null : ctx_r0.extracts.length) > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.loading);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.loading && (ctx_r0.extracts == null ? null : ctx_r0.extracts.length) === 0)("ngIfElse", _r5);
} }
function BsPreviewExtractsPanelComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#preview.loading"), "\n");
} }
export class Extract {
}
export class BsPreviewExtractsPanelComponent {
    constructor(document, previewService, cdr, domSanitizer) {
        this.previewService = previewService;
        this.cdr = cdr;
        this.domSanitizer = domSanitizer;
        this.style = "light";
        this.extracts = [];
        this.currentIndex = -1;
        this.loading = false;
    }
    ngOnDestroy() {
        if (this.loadCompleteSubscription) {
            this.loadCompleteSubscription.unsubscribe();
        }
    }
    /**
     * Extracts the list of extracts from the preview document
     */
    ngOnChanges(changes) {
        var _a, _b;
        this.extracts = [];
        if (this.previewData && this.previewDocument) {
            const extracts = (_a = this.previewData.highlightsPerCategory["extractslocations"]) === null || _a === void 0 ? void 0 : _a.values; //Extract locations Array ordered by "relevance"
            if (!!extracts && extracts.length > 0) {
                this.extractAll(extracts, this.previewDocument);
                return;
            }
        }
        if (this.previewData && this.downloadUrl) {
            const extracts = (_b = this.previewData.highlightsPerCategory["extractslocations"]) === null || _b === void 0 ? void 0 : _b.values; //Extract locations Array ordered by "relevance"
            if (!!extracts && extracts.length > 0) {
                this.loading = true;
                if (this.previewDocument) {
                    this.extractAll(extracts, this.previewDocument);
                }
                else {
                    this.previewService.getHtmlPreview(this.downloadUrl)
                        .subscribe((value) => {
                        const previewDocument = this.createDocument(value);
                        this.extractAll(extracts, previewDocument);
                    });
                }
            }
        }
    }
    createDocument(value) {
        const doc = document.implementation.createHTMLDocument("");
        doc.write(value);
        doc.close();
        let previewDocument = new PreviewDocument(doc);
        const count = previewDocument.document.querySelectorAll("[id^='extractslocations']").length;
        if (count === 0 && this.previewDocument) {
            // use previous document to retrieve extracts
            previewDocument = this.previewDocument;
        }
        return previewDocument;
    }
    extractAll(extracts, previewDocument) {
        // Init the extracts Array and storing the relevancy index = i because extractsLocations is already ordered by relevance
        // but extract's text is sort by "start", that why text is set to empty here
        this.extracts = extracts[0].locations.map((el, i) => ({
            text: "",
            startIndex: el.start,
            relevanceIndex: i,
            textIndex: 0
        }));
        // next sort the array by startIndex to extract the correct extract's text
        // and set the textIndex
        this.extracts.sort((a, b) => a.startIndex - b.startIndex) // Sorting by start index (text index)
            .forEach((el, i) => {
            el.text = this.sanitize(previewDocument.getHighlightText("extractslocations", i)); // get the text
            el.textIndex = i; // Storing the TextIndex to be able to select extracts
        });
        // do not take item without text
        this.extracts = this.extracts.filter(el => el.text !== '');
        // finally sort extracts by relevance
        this.extracts.sort((a, b) => a.relevanceIndex - b.relevanceIndex);
        this.buildSortAction();
        this.loading = false;
        this.currentIndex = -1;
        this.cdr.detectChanges();
    }
    /**
     * Build Sort Action for Extracts
     * @param i
     */
    buildSortAction() {
        this.sortAction = new Action({
            title: "msg#sortSelector.sortByTitle",
            text: "msg#preview.relevanceSortHighlightButtonText",
            children: [
                new Action({
                    icon: 'fas fa-sort-amount-down',
                    text: "msg#preview.relevanceSortHighlightButtonText",
                    action: (item, event) => {
                        // return a new map to re-render the collection
                        this.extracts = this.extracts.map(el => el).sort((a, b) => a.relevanceIndex - b.relevanceIndex);
                        this.sortAction.text = item.text;
                        this.currentIndex = -1;
                    }
                }),
                new Action({
                    icon: 'fas fa-sort-amount-down',
                    text: "msg#preview.textOrderSortHighlightButtonText",
                    action: (item, event) => {
                        // return a new map to re-render the collection
                        this.extracts = this.extracts.map(el => el).sort((a, b) => a.textIndex - b.textIndex);
                        this.sortAction.text = item.text;
                        this.currentIndex = -1;
                    }
                })
            ]
        });
    }
    /**
     * Scroll to a specific extract
     * @param i
     */
    scrollExtract(extract, index) {
        if (index !== undefined) {
            this.currentIndex = index;
        }
        if (this.previewDocument) {
            // extracts are always at textIndex position whatever the sort
            this.previewDocument.selectHighlight("extractslocations", extract.textIndex);
        }
        return false;
    }
    /**
     * Sanitize the text of a HTML formatted extract
     * @param text
     */
    sanitize(text) {
        return text !== "" ? this.domSanitizer.bypassSecurityTrustHtml(text.replace(/sq\-current/, "")) : "";
    }
    /**
     * Select the previous extract in the list
     */
    previousExtract() {
        this.currentIndex--;
        this.scrollTo();
    }
    /**
     * Select the next extract in the list
     */
    nextExtract() {
        this.currentIndex++;
        this.scrollTo();
    }
    scrollTo() {
        this.cdkScrollViewport.scrollToIndex(this.currentIndex);
        const extract = this.extracts[this.currentIndex];
        this.scrollExtract(extract);
    }
}
BsPreviewExtractsPanelComponent.ɵfac = function BsPreviewExtractsPanelComponent_Factory(t) { return new (t || BsPreviewExtractsPanelComponent)(i0.ɵɵdirectiveInject(DOCUMENT), i0.ɵɵdirectiveInject(i1.PreviewService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.DomSanitizer)); };
BsPreviewExtractsPanelComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewExtractsPanelComponent, selectors: [["sq-preview-extracts-panel"]], viewQuery: function BsPreviewExtractsPanelComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.cdkScrollViewport = _t.first);
    } }, inputs: { previewData: "previewData", previewDocument: "previewDocument", downloadUrl: "downloadUrl", style: "style" }, features: [i0.ɵɵNgOnChangesFeature], decls: 2, vars: 2, consts: [[4, "ngIf"], ["class", "text-center", 4, "ngIf"], ["class", "d-flex justify-content-between p-2", 4, "ngIf"], ["class", "d-flex justify-content-center align-items-center h-100", 4, "ngIf"], ["class", "text-center text-muted", 4, "ngIf", "ngIfElse"], ["extractsTpl", ""], [1, "d-flex", "justify-content-between", "p-2"], [1, "btn", "btn-light", 3, "disabled", "click"], [1, "fas", "fa-arrow-left"], [1, "btn-group", 3, "sq-action-buttons"], [1, "btn", "btn-light", "float-right", 3, "disabled", "click"], [1, "fas", "fa-arrow-right"], [1, "d-flex", "justify-content-center", "align-items-center", "h-100"], ["role", "status", 1, "spinner-grow"], [1, "text-center", "text-muted"], [2, "height", "100%", 3, "itemSize"], ["scrollViewport", ""], ["class", "pl-2 pr-2", 4, "cdkVirtualFor", "cdkVirtualForOf"], [1, "pl-2", "pr-2"], ["href", "#", 1, "card", "my-1", "list-group-item-action", 3, "ngClass", "click"], [1, "card-body", "m-0", 3, "innerHTML"], [1, "text-center"]], template: function BsPreviewExtractsPanelComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsPreviewExtractsPanelComponent_ng_container_0_Template, 6, 4, "ng-container", 0);
        i0.ɵɵtemplate(1, BsPreviewExtractsPanelComponent_div_1_Template, 3, 3, "div", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.previewData);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.previewData);
    } }, directives: [i3.NgIf, i4.BsActionButtons, i5.CdkVirtualScrollViewport, i5.CdkFixedSizeVirtualScroll, i5.CdkVirtualForOf, i3.NgClass], pipes: [i6.MessagePipe], styles: ["[_nghost-%COMP%]     .cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{max-width:100%;min-width:100%}.spinner-grow[_ngcontent-%COMP%]{height:3rem;width:3rem}.active[_ngcontent-%COMP%]{background-color:#f8f9fa}.dark[_nghost-%COMP%]   .active[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .active[_ngcontent-%COMP%]{background-color:#e9ecef;color:#768883}"], changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsPreviewExtractsPanelComponent, [{
        type: Component,
        args: [{
                selector: 'sq-preview-extracts-panel',
                templateUrl: './preview-extracts-panel.component.html',
                styleUrls: ['./preview-extracts-panel.component.scss'],
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: Document, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: i1.PreviewService }, { type: i0.ChangeDetectorRef }, { type: i2.DomSanitizer }]; }, { previewData: [{
            type: Input
        }], previewDocument: [{
            type: Input
        }], downloadUrl: [{
            type: Input
        }], style: [{
            type: Input
        }], cdkScrollViewport: [{
            type: ViewChild,
            args: ["scrollViewport"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy1leHRyYWN0cy1wYW5lbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9wcmV2aWV3LyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL3ByZXZpZXctZXh0cmFjdHMtcGFuZWwvcHJldmlldy1leHRyYWN0cy1wYW5lbC5jb21wb25lbnQudHMiLCJib290c3RyYXAvcHJldmlldy1leHRyYWN0cy1wYW5lbC9wcmV2aWV3LWV4dHJhY3RzLXBhbmVsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBcUIsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXVDLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVySixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFLekMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRWxELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7Ozs7OztJQ1JyRCw4QkFDSTtJQUFBLGlDQUNJO0lBRDBCLHdOQUEyQjtJQUNyRCx1QkFBaUM7SUFBQSxZQUNyQzs7SUFBQSxpQkFBUztJQUNULHlCQUE0RjtJQUM1RixrQ0FDSTtJQURzQyxvTkFBdUI7SUFDN0QsWUFBaUQ7O0lBQUEsd0JBQWtDO0lBQ3ZGLGlCQUFTO0lBQ2IsaUJBQU07OztJQVB3RCxlQUE2QjtJQUE3QixrREFBNkI7SUFDbEQsZUFDckM7SUFEcUMsMEZBQ3JDO0lBQ3VCLGVBQTZEO0lBQTdELDhHQUE2RDtJQUNsQixlQUE4QztJQUE5Qyw0RUFBOEM7SUFDNUcsZUFBaUQ7SUFBakQsc0ZBQWlEOzs7SUFJekQsK0JBQ0k7SUFBQSwwQkFBOEM7SUFDbEQsaUJBQU07OztJQUNOLCtCQUNJO0lBQUEsNEJBQU07SUFBQSxZQUF3Qzs7SUFBQSxpQkFBTztJQUN6RCxpQkFBTTs7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O2FBQ2hEO3NDQWUrQixRQUFRO3NCQUFuQyxNQUFNO3VCQUFDLFFBQVE7Z0hBYlQsV0FBVztrQkFBbkIsS0FBSztZQUNHLGVBQWU7a0JBQXZCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBQ3VCLGlCQUFpQjtrQkFBN0MsU0FBUzttQkFBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5qZWN0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIFNpbXBsZUNoYW5nZXMsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Q2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0fSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSGlnaGxpZ2h0VmFsdWUsIFByZXZpZXdEYXRhIH0gZnJvbSAnQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXMnO1xuaW1wb3J0IHtBY3Rpb259IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2FjdGlvblwiO1xuXG5pbXBvcnQgeyBQcmV2aWV3RG9jdW1lbnQgfSBmcm9tICcuLi8uLi9wcmV2aWV3LWRvY3VtZW50JztcbmltcG9ydCB7UHJldmlld1NlcnZpY2V9IGZyb20gJy4uLy4uL3ByZXZpZXcuc2VydmljZSc7XG5cbmV4cG9ydCBjbGFzcyBFeHRyYWN0IHtcbiAgdGV4dDogU2FmZUh0bWw7IC8vIFNhbml0aXplZCBIVE1MIHRleHRcbiAgc3RhcnRJbmRleCA6IG51bWJlcjsgLy8gdGhpcyBpcyB0aGUgc3RhcnQgaW5kZXggb2YgdGhlIGV4dHJhY3RzIHdpdGhpbiB0aGUgRG9jdW1lbnQgVGV4dCAgXG4gIHJlbGV2YW5jZUluZGV4IDogbnVtYmVyOyAvLyAwIHRoZSBtb3N0IHJlbGV2YW50IHRvIE4gdGhlIGxlc3MgcmVsZXZhbnRcbiAgdGV4dEluZGV4IDogbnVtYmVyOyAvLyBpbmRleCBvZiB0aGUgZXh0cmFjdCBpbiB0aGUgdGV4dC4gZS5nIDAgaXMgdGhlIGZpcnN0IGV4dHJhY3QgZGlzcGxheWVkIGluIHRoZSBkb2N1bWVudFxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzcS1wcmV2aWV3LWV4dHJhY3RzLXBhbmVsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3ByZXZpZXctZXh0cmFjdHMtcGFuZWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wcmV2aWV3LWV4dHJhY3RzLXBhbmVsLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJzUHJldmlld0V4dHJhY3RzUGFuZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHByZXZpZXdEYXRhOiBQcmV2aWV3RGF0YTtcbiAgQElucHV0KCkgcHJldmlld0RvY3VtZW50OiBQcmV2aWV3RG9jdW1lbnQ7XG4gIEBJbnB1dCgpIGRvd25sb2FkVXJsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0eWxlOiBcImxpZ2h0XCJ8XCJkYXJrXCIgPSBcImxpZ2h0XCI7XG4gIEBWaWV3Q2hpbGQoXCJzY3JvbGxWaWV3cG9ydFwiKSBjZGtTY3JvbGxWaWV3cG9ydDogQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0O1xuXG4gIHNvcnRBY3Rpb24gOiBBY3Rpb247XG4gIGV4dHJhY3RzOiBFeHRyYWN0W10gPSBbXTtcbiAgY3VycmVudEluZGV4ID0gLTE7XG4gIGxvYWRpbmcgPSBmYWxzZTtcbiAgbG9hZENvbXBsZXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IERvY3VtZW50LFxuICAgIHByaXZhdGUgcHJldmlld1NlcnZpY2U6IFByZXZpZXdTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7IH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZih0aGlzLmxvYWRDb21wbGV0ZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5sb2FkQ29tcGxldGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbiAgICBcbiAgLyoqXG4gICAqIEV4dHJhY3RzIHRoZSBsaXN0IG9mIGV4dHJhY3RzIGZyb20gdGhlIHByZXZpZXcgZG9jdW1lbnRcbiAgICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLmV4dHJhY3RzID0gW107XG4gICAgaWYgKHRoaXMucHJldmlld0RhdGEgJiYgdGhpcy5wcmV2aWV3RG9jdW1lbnQpIHtcbiAgICAgIGNvbnN0IGV4dHJhY3RzID0gdGhpcy5wcmV2aWV3RGF0YS5oaWdobGlnaHRzUGVyQ2F0ZWdvcnlbXCJleHRyYWN0c2xvY2F0aW9uc1wiXT8udmFsdWVzOyAvL0V4dHJhY3QgbG9jYXRpb25zIEFycmF5IG9yZGVyZWQgYnkgXCJyZWxldmFuY2VcIlxuICAgICAgaWYgKCEhZXh0cmFjdHMgJiYgZXh0cmFjdHMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmV4dHJhY3RBbGwoZXh0cmFjdHMsIHRoaXMucHJldmlld0RvY3VtZW50KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBpZih0aGlzLnByZXZpZXdEYXRhICYmIHRoaXMuZG93bmxvYWRVcmwpe1xuICAgICAgY29uc3QgZXh0cmFjdHMgPSB0aGlzLnByZXZpZXdEYXRhLmhpZ2hsaWdodHNQZXJDYXRlZ29yeVtcImV4dHJhY3RzbG9jYXRpb25zXCJdPy52YWx1ZXM7IC8vRXh0cmFjdCBsb2NhdGlvbnMgQXJyYXkgb3JkZXJlZCBieSBcInJlbGV2YW5jZVwiXG4gICAgICBpZighIWV4dHJhY3RzICYmIGV4dHJhY3RzLmxlbmd0aCA+IDApe1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIGlmICh0aGlzLnByZXZpZXdEb2N1bWVudCkge1xuICAgICAgICAgIHRoaXMuZXh0cmFjdEFsbChleHRyYWN0cywgdGhpcy5wcmV2aWV3RG9jdW1lbnQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wcmV2aWV3U2VydmljZS5nZXRIdG1sUHJldmlldyh0aGlzLmRvd25sb2FkVXJsKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcHJldmlld0RvY3VtZW50ID0gdGhpcy5jcmVhdGVEb2N1bWVudCh2YWx1ZSk7XG4gICAgICAgICAgICAgIHRoaXMuZXh0cmFjdEFsbChleHRyYWN0cywgcHJldmlld0RvY3VtZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBwcml2YXRlIGNyZWF0ZURvY3VtZW50KHZhbHVlOiBzdHJpbmcpOiBQcmV2aWV3RG9jdW1lbnQge1xuICAgIGNvbnN0IGRvYyA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudChcIlwiKTtcbiAgICBkb2Mud3JpdGUodmFsdWUpO1xuICAgIGRvYy5jbG9zZSgpO1xuICAgIGxldCBwcmV2aWV3RG9jdW1lbnQgPSBuZXcgUHJldmlld0RvY3VtZW50KGRvYyk7XG5cbiAgICBjb25zdCBjb3VudCA9IHByZXZpZXdEb2N1bWVudC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2lkXj0nZXh0cmFjdHNsb2NhdGlvbnMnXVwiKS5sZW5ndGg7XG4gICAgaWYgKGNvdW50ID09PSAwICYmIHRoaXMucHJldmlld0RvY3VtZW50KSB7XG4gICAgICAvLyB1c2UgcHJldmlvdXMgZG9jdW1lbnQgdG8gcmV0cmlldmUgZXh0cmFjdHNcbiAgICAgIHByZXZpZXdEb2N1bWVudCA9IHRoaXMucHJldmlld0RvY3VtZW50O1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcHJldmlld0RvY3VtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0QWxsKGV4dHJhY3RzOkhpZ2hsaWdodFZhbHVlW10sIHByZXZpZXdEb2N1bWVudDogUHJldmlld0RvY3VtZW50KSB7XG4gICAgLy8gSW5pdCB0aGUgZXh0cmFjdHMgQXJyYXkgYW5kIHN0b3JpbmcgdGhlIHJlbGV2YW5jeSBpbmRleCA9IGkgYmVjYXVzZSBleHRyYWN0c0xvY2F0aW9ucyBpcyBhbHJlYWR5IG9yZGVyZWQgYnkgcmVsZXZhbmNlXG4gICAgLy8gYnV0IGV4dHJhY3QncyB0ZXh0IGlzIHNvcnQgYnkgXCJzdGFydFwiLCB0aGF0IHdoeSB0ZXh0IGlzIHNldCB0byBlbXB0eSBoZXJlXG4gICAgdGhpcy5leHRyYWN0cyA9IGV4dHJhY3RzWzBdLmxvY2F0aW9ucy5tYXAoKGVsLCBpKSA9PiAoe1xuICAgICAgdGV4dDogXCJcIixcbiAgICAgIHN0YXJ0SW5kZXg6IGVsLnN0YXJ0LFxuICAgICAgcmVsZXZhbmNlSW5kZXg6IGksICAvLyB1c2VkIHRvIHNvcnQgYnkgcmVsZXZhbmNlIGluZGV4XG4gICAgICB0ZXh0SW5kZXg6IDBcbiAgICB9KSk7XG5cbiAgICAvLyBuZXh0IHNvcnQgdGhlIGFycmF5IGJ5IHN0YXJ0SW5kZXggdG8gZXh0cmFjdCB0aGUgY29ycmVjdCBleHRyYWN0J3MgdGV4dFxuICAgIC8vIGFuZCBzZXQgdGhlIHRleHRJbmRleFxuICAgIHRoaXMuZXh0cmFjdHMuc29ydCgoYSwgYikgPT4gYS5zdGFydEluZGV4IC0gYi5zdGFydEluZGV4KSAvLyBTb3J0aW5nIGJ5IHN0YXJ0IGluZGV4ICh0ZXh0IGluZGV4KVxuICAgIC5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgICAgZWwudGV4dCA9IHRoaXMuc2FuaXRpemUocHJldmlld0RvY3VtZW50LmdldEhpZ2hsaWdodFRleHQoXCJleHRyYWN0c2xvY2F0aW9uc1wiLCBpKSk7IC8vIGdldCB0aGUgdGV4dFxuICAgICAgZWwudGV4dEluZGV4ID0gaSAvLyBTdG9yaW5nIHRoZSBUZXh0SW5kZXggdG8gYmUgYWJsZSB0byBzZWxlY3QgZXh0cmFjdHNcbiAgICB9KTtcblxuICAgIC8vIGRvIG5vdCB0YWtlIGl0ZW0gd2l0aG91dCB0ZXh0XG4gICAgdGhpcy5leHRyYWN0cyA9IHRoaXMuZXh0cmFjdHMuZmlsdGVyKGVsID0+IGVsLnRleHQgIT09ICcnKTtcbiAgICBcbiAgICAvLyBmaW5hbGx5IHNvcnQgZXh0cmFjdHMgYnkgcmVsZXZhbmNlXG4gICAgdGhpcy5leHRyYWN0cy5zb3J0KChhLGIpID0+IGEucmVsZXZhbmNlSW5kZXggLSBiLnJlbGV2YW5jZUluZGV4KTtcbiAgICBcbiAgICB0aGlzLmJ1aWxkU29ydEFjdGlvbigpO1xuICAgICAgICAgIFxuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuY3VycmVudEluZGV4ID0gLTE7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIFNvcnQgQWN0aW9uIGZvciBFeHRyYWN0c1xuICAgKiBAcGFyYW0gaSBcbiAgICovXG4gIGJ1aWxkU29ydEFjdGlvbigpe1xuICAgIHRoaXMuc29ydEFjdGlvbiA9IG5ldyBBY3Rpb24oe1xuICAgICAgdGl0bGU6IFwibXNnI3NvcnRTZWxlY3Rvci5zb3J0QnlUaXRsZVwiLFxuICAgICAgdGV4dDogIFwibXNnI3ByZXZpZXcucmVsZXZhbmNlU29ydEhpZ2hsaWdodEJ1dHRvblRleHRcIixcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgIG5ldyBBY3Rpb24oe1xuICAgICAgICAgIGljb246ICdmYXMgZmEtc29ydC1hbW91bnQtZG93bicsXG4gICAgICAgICAgdGV4dDogXCJtc2cjcHJldmlldy5yZWxldmFuY2VTb3J0SGlnaGxpZ2h0QnV0dG9uVGV4dFwiLFxuICAgICAgICAgIGFjdGlvbjogKGl0ZW06IEFjdGlvbiwgZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyByZXR1cm4gYSBuZXcgbWFwIHRvIHJlLXJlbmRlciB0aGUgY29sbGVjdGlvblxuICAgICAgICAgICAgdGhpcy5leHRyYWN0cyA9IHRoaXMuZXh0cmFjdHMubWFwKGVsID0+IGVsKS5zb3J0KChhLCBiKSA9PiBhLnJlbGV2YW5jZUluZGV4IC0gYi5yZWxldmFuY2VJbmRleCk7XG4gICAgICAgICAgICB0aGlzLnNvcnRBY3Rpb24udGV4dCA9IGl0ZW0udGV4dDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgQWN0aW9uKHtcbiAgICAgICAgICBpY29uOiAnZmFzIGZhLXNvcnQtYW1vdW50LWRvd24nLFxuICAgICAgICAgIHRleHQ6IFwibXNnI3ByZXZpZXcudGV4dE9yZGVyU29ydEhpZ2hsaWdodEJ1dHRvblRleHRcIixcbiAgICAgICAgICBhY3Rpb246IChpdGVtOiBBY3Rpb24sIGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gcmV0dXJuIGEgbmV3IG1hcCB0byByZS1yZW5kZXIgdGhlIGNvbGxlY3Rpb25cbiAgICAgICAgICAgIHRoaXMuZXh0cmFjdHMgPSB0aGlzLmV4dHJhY3RzLm1hcChlbCA9PiBlbCkuc29ydCgoYSxiKSA9PiBhLnRleHRJbmRleC1iLnRleHRJbmRleCk7XG4gICAgICAgICAgICB0aGlzLnNvcnRBY3Rpb24udGV4dCA9IGl0ZW0udGV4dDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gLTE7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgXVxuICAgIH0pO1xuXG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xsIHRvIGEgc3BlY2lmaWMgZXh0cmFjdFxuICAgKiBAcGFyYW0gaVxuICAgKi9cbiAgc2Nyb2xsRXh0cmFjdChleHRyYWN0OiBFeHRyYWN0LCBpbmRleD86IG51bWJlcikge1xuICAgIGlmIChpbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByZXZpZXdEb2N1bWVudCkge1xuICAgICAgLy8gZXh0cmFjdHMgYXJlIGFsd2F5cyBhdCB0ZXh0SW5kZXggcG9zaXRpb24gd2hhdGV2ZXIgdGhlIHNvcnRcbiAgICAgIHRoaXMucHJldmlld0RvY3VtZW50LnNlbGVjdEhpZ2hsaWdodChcImV4dHJhY3RzbG9jYXRpb25zXCIsIGV4dHJhY3QudGV4dEluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhbml0aXplIHRoZSB0ZXh0IG9mIGEgSFRNTCBmb3JtYXR0ZWQgZXh0cmFjdFxuICAgKiBAcGFyYW0gdGV4dFxuICAgKi9cbiAgc2FuaXRpemUodGV4dDogc3RyaW5nKTogU2FmZUh0bWwgfCBzdHJpbmcge1xuICAgIHJldHVybiB0ZXh0ICE9PSBcIlwiID8gdGhpcy5kb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodGV4dC5yZXBsYWNlKC9zcVxcLWN1cnJlbnQvLCBcIlwiKSkgOiBcIlwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCB0aGUgcHJldmlvdXMgZXh0cmFjdCBpbiB0aGUgbGlzdFxuICAgKi9cbiAgcHJldmlvdXNFeHRyYWN0KCl7XG4gICAgdGhpcy5jdXJyZW50SW5kZXgtLTtcbiAgICB0aGlzLnNjcm9sbFRvKCk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IHRoZSBuZXh0IGV4dHJhY3QgaW4gdGhlIGxpc3RcbiAgICovXG4gIG5leHRFeHRyYWN0KCl7XG4gICAgdGhpcy5jdXJyZW50SW5kZXgrKztcbiAgICB0aGlzLnNjcm9sbFRvKCk7XG4gIH1cbiAgXG4gIHByaXZhdGUgc2Nyb2xsVG8oKSB7XG4gICAgdGhpcy5jZGtTY3JvbGxWaWV3cG9ydC5zY3JvbGxUb0luZGV4KHRoaXMuY3VycmVudEluZGV4KTtcbiAgICBjb25zdCBleHRyYWN0ID0gdGhpcy5leHRyYWN0c1t0aGlzLmN1cnJlbnRJbmRleF07XG4gICAgdGhpcy5zY3JvbGxFeHRyYWN0KGV4dHJhY3QpO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwicHJldmlld0RhdGFcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIHAtMlwiICpuZ0lmPVwiZXh0cmFjdHM/Lmxlbmd0aCA+IDBcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tbGlnaHRcIiAoY2xpY2spPVwicHJldmlvdXNFeHRyYWN0KClcIiBbZGlzYWJsZWRdPVwiY3VycmVudEluZGV4IDwgMVwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtYXJyb3ctbGVmdFwiPjwvaT4mbmJzcDt7eyAnbXNnI3ByZXZpZXcucHJldmlvdXNEb2N1bWVudCcgfCBzcU1lc3NhZ2V9fVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIFtzcS1hY3Rpb24tYnV0dG9uc109XCJ7aXRlbXM6IFtzb3J0QWN0aW9uXSwgYXV0b0FkanVzdDogdHJ1ZX1cIiA+PC9kaXY+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWxpZ2h0IGZsb2F0LXJpZ2h0XCIgKGNsaWNrKT1cIm5leHRFeHRyYWN0KClcIiBbZGlzYWJsZWRdPVwiY3VycmVudEluZGV4ID49IGV4dHJhY3RzLmxlbmd0aC0xXCI+XG4gICAgICAgICAgICB7eyAnbXNnI3ByZXZpZXcubmV4dERvY3VtZW50JyB8IHNxTWVzc2FnZX19Jm5ic3A7PGkgY2xhc3M9XCJmYXMgZmEtYXJyb3ctcmlnaHRcIj48L2k+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiAqbmdJZj1cImxvYWRpbmdcIiBjbGFzcz1cImQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBoLTEwMFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1ncm93XCIgcm9sZT1cInN0YXR1c1wiPjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlciB0ZXh0LW11dGVkXCIgKm5nSWY9XCIhbG9hZGluZyAmJiBleHRyYWN0cz8ubGVuZ3RoID09PSAwOyBlbHNlIGV4dHJhY3RzVHBsXCI+XG4gICAgICAgIDxzcGFuPnt7ICdtc2cjcHJldmlldy5ub2V4dHJhY3QnIHwgc3FNZXNzYWdlfX08L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPG5nLXRlbXBsYXRlICNleHRyYWN0c1RwbD5cbiAgICAgICAgPGNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCAjc2Nyb2xsVmlld3BvcnQgW2l0ZW1TaXplXT1cIjY0XCIgc3R5bGU9XCJoZWlnaHQ6IDEwMCU7XCI+XG4gICAgICAgICAgICA8ZGl2ICpjZGtWaXJ0dWFsRm9yPVwibGV0IGV4dHJhY3Qgb2YgZXh0cmFjdHM7IGxldCBpID0gaW5kZXhcIiBjbGFzcz1cInBsLTIgcHItMlwiPlxuICAgICAgICAgICAgICAgIDxhICBocmVmPVwiI1wiIFxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImNhcmQgbXktMSBsaXN0LWdyb3VwLWl0ZW0tYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydhY3RpdmUnOiBpID09PSBjdXJyZW50SW5kZXh9XCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNjcm9sbEV4dHJhY3QoZXh0cmFjdCwgaSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLWJvZHkgbS0wXCIgW2lubmVySFRNTF09XCJleHRyYWN0LnRleHRcIj48L3A+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0PlxuICAgIDwvbmctdGVtcGxhdGU+XG48L25nLWNvbnRhaW5lcj5cblxuPGRpdiBjbGFzcz1cInRleHQtY2VudGVyXCIgKm5nSWY9XCIhcHJldmlld0RhdGFcIj5cbiAgICB7eyAnbXNnI3ByZXZpZXcubG9hZGluZycgfCBzcU1lc3NhZ2V9fVxuPC9kaXY+Il19