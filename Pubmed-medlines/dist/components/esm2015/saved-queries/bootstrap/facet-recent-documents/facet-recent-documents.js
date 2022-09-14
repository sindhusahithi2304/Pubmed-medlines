import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import * as i0 from "@angular/core";
import * as i1 from "../../recent-documents.service";
import * as i2 from "@sinequa/components/search";
import * as i3 from "@angular/common";
import * as i4 from "@angular/router";
import * as i5 from "@sinequa/components/utils";
import * as i6 from "@sinequa/core/intl";
function BsFacetRecentDocuments_ng_container_1_a_1_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqDate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r2 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, document_r2.date));
} }
function BsFacetRecentDocuments_ng_container_1_a_1_i_4_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "i", 10);
    i0.ɵɵlistener("click", function BsFacetRecentDocuments_ng_container_1_a_1_i_4_Template_i_click_0_listener($event) { i0.ɵɵrestoreView(_r11); const document_r2 = i0.ɵɵnextContext(2).$implicit; const ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.deleteDocument(document_r2, $event); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 1, "msg#recentDocuments.delete"));
} }
function BsFacetRecentDocuments_ng_container_1_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 5);
    i0.ɵɵlistener("click", function BsFacetRecentDocuments_ng_container_1_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r14); const document_r2 = i0.ɵɵnextContext().$implicit; const ctx_r12 = i0.ɵɵnextContext(); return ctx_r12.openRecentDocument(document_r2); });
    i0.ɵɵelementStart(1, "span", 6);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, BsFacetRecentDocuments_ng_container_1_a_1_span_3_Template, 3, 3, "span", 7);
    i0.ɵɵtemplate(4, BsFacetRecentDocuments_ng_container_1_a_1_i_4_Template, 2, 3, "i", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r2 = i0.ɵɵnextContext().$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵattribute("href", document_r2.url1, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("title", document_r2.title);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(document_r2.title);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", document_r2.date);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.enableDelete);
} }
function BsFacetRecentDocuments_ng_container_1_ng_template_2_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqDate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r2 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, document_r2.date));
} }
function BsFacetRecentDocuments_ng_container_1_ng_template_2_i_4_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "i", 10);
    i0.ɵɵlistener("click", function BsFacetRecentDocuments_ng_container_1_ng_template_2_i_4_Template_i_click_0_listener($event) { i0.ɵɵrestoreView(_r21); const document_r2 = i0.ɵɵnextContext(2).$implicit; const ctx_r19 = i0.ɵɵnextContext(); return ctx_r19.deleteDocument(document_r2, $event); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 1, "msg#recentDocuments.delete"));
} }
function BsFacetRecentDocuments_ng_container_1_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 11);
    i0.ɵɵlistener("click", function BsFacetRecentDocuments_ng_container_1_ng_template_2_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r24); const document_r2 = i0.ɵɵnextContext().$implicit; const ctx_r22 = i0.ɵɵnextContext(); return ctx_r22.openRecentDocument(document_r2); });
    i0.ɵɵelementStart(1, "span", 6);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, BsFacetRecentDocuments_ng_container_1_ng_template_2_span_3_Template, 3, 3, "span", 7);
    i0.ɵɵtemplate(4, BsFacetRecentDocuments_ng_container_1_ng_template_2_i_4_Template, 2, 3, "i", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r2 = i0.ɵɵnextContext().$implicit;
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", ctx_r5.searchRoute)("queryParams", ctx_r5.getQueryParams(document_r2));
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("title", document_r2.title);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(document_r2.title);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", document_r2.date);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.enableDelete);
} }
function BsFacetRecentDocuments_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsFacetRecentDocuments_ng_container_1_a_1_Template, 5, 5, "a", 3);
    i0.ɵɵtemplate(2, BsFacetRecentDocuments_ng_container_1_ng_template_2_Template, 5, 6, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const document_r2 = ctx.$implicit;
    const _r4 = i0.ɵɵreference(3);
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.openOriginal && document_r2.url1)("ngIfElse", _r4);
} }
function BsFacetRecentDocuments_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#recentDocuments.noRecentDocument"), " ");
} }
export class BsFacetRecentDocuments extends AbstractFacet {
    constructor(recentDocumentsService, searchService) {
        super();
        this.recentDocumentsService = recentDocumentsService;
        this.searchService = searchService;
        this.searchRoute = "/preview";
        this.maxDocuments = 5;
        this.enableDelete = true;
        this.openOriginal = false;
        this.documentOpened = new EventEmitter();
        this.page = 0;
        this.previousPage = new Action({
            icon: "fas fa-chevron-left",
            title: "msg#facet.previous",
            action: () => {
                this.page--;
            },
            updater: (action) => {
                action.disabled = this.page <= 0;
                action.hidden = this.maxPage === 0;
            }
        });
        this.nextPage = new Action({
            icon: "fas fa-chevron-right",
            title: "msg#facet.next",
            action: () => {
                this.page++;
            },
            updater: (action) => {
                action.disabled = this.page >= this.maxPage;
                action.hidden = this.maxPage === 0;
            }
        });
    }
    get maxPage() {
        return Math.max(0, Math.ceil(this.recentDocumentsService.recentdocuments.length / this.maxDocuments) - 1);
    }
    get startIndex() {
        return this.page * this.maxDocuments;
    }
    get endIndex() {
        return (this.page + 1) * this.maxDocuments;
    }
    get actions() {
        this.previousPage.update();
        this.nextPage.update();
        return [this.previousPage, this.nextPage];
    }
    openRecentDocument(document) {
        if (this.openOriginal && !!document.url1) {
            this.searchService.notifyOpenOriginalDocument(document);
        }
        this.documentOpened.emit(document); // Can be use to trigger actions, like the preview
        return true;
    }
    deleteDocument(document, event) {
        this.recentDocumentsService.deleteRecentDocument(document);
        this.page = Math.min(this.page, this.maxPage);
        return false;
    }
    getQueryParams(document) {
        return {
            id: document.id,
            query: this.searchService.makeQuery().toJsonForQueryString()
        };
    }
}
BsFacetRecentDocuments.ɵfac = function BsFacetRecentDocuments_Factory(t) { return new (t || BsFacetRecentDocuments)(i0.ɵɵdirectiveInject(i1.RecentDocumentsService), i0.ɵɵdirectiveInject(i2.SearchService)); };
BsFacetRecentDocuments.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetRecentDocuments, selectors: [["sq-facet-recent-documents"]], inputs: { searchRoute: "searchRoute", maxDocuments: "maxDocuments", enableDelete: "enableDelete", openOriginal: "openOriginal" }, outputs: { documentOpened: "documentOpened" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 4, vars: 6, consts: [[1, "list-group", "list-group-flush"], [4, "ngFor", "ngForOf"], ["class", "list-group-item text-center text-muted font-italic small py-5", 4, "ngIf"], ["class", "recent-document-item list-group-item list-group-item-action d-flex align-items-center", "target", "_blank", "rel", "noopener", 3, "click", 4, "ngIf", "ngIfElse"], ["internalLink", ""], ["target", "_blank", "rel", "noopener", 1, "recent-document-item", "list-group-item", "list-group-item-action", "d-flex", "align-items-center", 3, "click"], [1, "document-text", "mr-auto", "text-truncate", 3, "title"], ["class", "document-date ml-2 text-muted small text-right", 4, "ngIf"], ["class", "document-delete ml-2 fas fa-times", 3, "title", "click", 4, "ngIf"], [1, "document-date", "ml-2", "text-muted", "small", "text-right"], [1, "document-delete", "ml-2", "fas", "fa-times", 3, "title", "click"], [1, "recent-document-item", "list-group-item", "list-group-item-action", "d-flex", "align-items-center", 3, "routerLink", "queryParams", "click"], [1, "list-group-item", "text-center", "text-muted", "font-italic", "small", "py-5"]], template: function BsFacetRecentDocuments_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, BsFacetRecentDocuments_ng_container_1_Template, 4, 2, "ng-container", 1);
        i0.ɵɵpipe(2, "slice");
        i0.ɵɵtemplate(3, BsFacetRecentDocuments_div_3_Template, 3, 3, "div", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind3(2, 2, ctx.recentDocumentsService.recentdocuments, ctx.startIndex, ctx.endIndex));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.recentDocumentsService.recentdocuments.length == 0);
    } }, directives: [i3.NgForOf, i3.NgIf, i4.RouterLinkWithHref], pipes: [i3.SlicePipe, i5.DatePipe, i6.MessagePipe], styles: [".recent-document-item[_ngcontent-%COMP%]   .document-delete[_ngcontent-%COMP%]{\n    opacity: 0;\n}\n\n.recent-document-item[_ngcontent-%COMP%]:hover   .document-delete[_ngcontent-%COMP%]{\n    opacity: 1;\n    transition: opacity 0.2s ease-in-out;\n}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsFacetRecentDocuments, [{
        type: Component,
        args: [{
                selector: 'sq-facet-recent-documents',
                templateUrl: './facet-recent-documents.html',
                styles: [`
.recent-document-item .document-delete{
    opacity: 0;
}

.recent-document-item:hover .document-delete{
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
}
  `]
            }]
    }], function () { return [{ type: i1.RecentDocumentsService }, { type: i2.SearchService }]; }, { searchRoute: [{
            type: Input
        }], maxDocuments: [{
            type: Input
        }], enableDelete: [{
            type: Input
        }], openOriginal: [{
            type: Input
        }], documentOpened: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtcmVjZW50LWRvY3VtZW50cy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NhdmVkLXF1ZXJpZXMvIiwic291cmNlcyI6WyJib290c3RyYXAvZmFjZXQtcmVjZW50LWRvY3VtZW50cy9mYWNldC1yZWNlbnQtZG9jdW1lbnRzLnRzIiwiYm9vdHN0cmFwL2ZhY2V0LXJlY2VudC1kb2N1bWVudHMvZmFjZXQtcmVjZW50LWRvY3VtZW50cy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7Ozs7O0lDSXhDLCtCQUFtRjtJQUFBLFlBQTRCOztJQUFBLGlCQUFPOzs7SUFBbkMsZUFBNEI7SUFBNUIsNERBQTRCOzs7O0lBQy9HLDZCQUFnSztJQUEzQyx1UkFBMEM7O0lBQUMsaUJBQUk7O0lBQWxHLDBFQUFrRDs7OztJQU54SCw0QkFJSTtJQURBLDBRQUFzQztJQUN0QywrQkFBK0U7SUFBQSxZQUFvQjtJQUFBLGlCQUFPO0lBQzFHLDRGQUFzSDtJQUN0SCxzRkFBb0s7SUFDeEssaUJBQUk7Ozs7SUFMQSwwREFBMkI7SUFFdUIsZUFBNEI7SUFBNUIsb0RBQTRCO0lBQUMsZUFBb0I7SUFBcEIsdUNBQW9CO0lBQzVGLGVBQW1CO0lBQW5CLHVDQUFtQjtJQUN0QixlQUFrQjtJQUFsQiwwQ0FBa0I7OztJQU90QiwrQkFBbUY7SUFBQSxZQUE0Qjs7SUFBQSxpQkFBTzs7O0lBQW5DLGVBQTRCO0lBQTVCLDREQUE0Qjs7OztJQUMvRyw2QkFBZ0s7SUFBM0MsbVNBQTBDOztJQUFDLGlCQUFJOztJQUFsRywwRUFBa0Q7Ozs7SUFMeEgsNkJBR0k7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VztrQkFBbkIsS0FBSztZQUNHLFlBQVk7a0JBQXBCLEtBQUs7WUFDRyxZQUFZO2tCQUFwQixLQUFLO1lBQ0csWUFBWTtrQkFBcEIsS0FBSztZQUNJLGNBQWM7a0JBQXZCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVjZW50RG9jdW1lbnRzU2VydmljZSwgUmVjZW50RG9jdW1lbnQgfSBmcm9tICcuLi8uLi9yZWNlbnQtZG9jdW1lbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWJzdHJhY3RGYWNldCB9IGZyb20gJ0BzaW5lcXVhL2NvbXBvbmVudHMvZmFjZXQnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQHNpbmVxdWEvY29tcG9uZW50cy9hY3Rpb24nO1xuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gJ0BzaW5lcXVhL2NvbXBvbmVudHMvc2VhcmNoJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc3EtZmFjZXQtcmVjZW50LWRvY3VtZW50cycsXG4gIHRlbXBsYXRlVXJsOiAnLi9mYWNldC1yZWNlbnQtZG9jdW1lbnRzLmh0bWwnLFxuICBzdHlsZXM6IFtgXG4ucmVjZW50LWRvY3VtZW50LWl0ZW0gLmRvY3VtZW50LWRlbGV0ZXtcbiAgICBvcGFjaXR5OiAwO1xufVxuXG4ucmVjZW50LWRvY3VtZW50LWl0ZW06aG92ZXIgLmRvY3VtZW50LWRlbGV0ZXtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBlYXNlLWluLW91dDtcbn1cbiAgYF1cbn0pXG5leHBvcnQgY2xhc3MgQnNGYWNldFJlY2VudERvY3VtZW50cyBleHRlbmRzIEFic3RyYWN0RmFjZXQgIHtcbiAgICBASW5wdXQoKSBzZWFyY2hSb3V0ZTogc3RyaW5nID0gXCIvcHJldmlld1wiO1xuICAgIEBJbnB1dCgpIG1heERvY3VtZW50czogbnVtYmVyID0gNTtcbiAgICBASW5wdXQoKSBlbmFibGVEZWxldGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIG9wZW5PcmlnaW5hbDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBPdXRwdXQoKSBkb2N1bWVudE9wZW5lZCA9IG5ldyBFdmVudEVtaXR0ZXI8UmVjZW50RG9jdW1lbnQ+KCk7XG5cbiAgICBwYWdlOiBudW1iZXIgPSAwO1xuXG4gICAgcHJldmlvdXNQYWdlOiBBY3Rpb247XG4gICAgbmV4dFBhZ2U6IEFjdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcmVjZW50RG9jdW1lbnRzU2VydmljZTogUmVjZW50RG9jdW1lbnRzU2VydmljZSxcbiAgICAgICAgcHVibGljIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnByZXZpb3VzUGFnZSA9IG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgaWNvbjogXCJmYXMgZmEtY2hldnJvbi1sZWZ0XCIsXG4gICAgICAgICAgICB0aXRsZTogXCJtc2cjZmFjZXQucHJldmlvdXNcIixcbiAgICAgICAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZS0tO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZXI6IChhY3Rpb246IEFjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGFjdGlvbi5kaXNhYmxlZCA9IHRoaXMucGFnZSA8PSAwO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5oaWRkZW4gPSB0aGlzLm1heFBhZ2UgPT09IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5leHRQYWdlID0gbmV3IEFjdGlvbih7XG4gICAgICAgICAgICBpY29uOiBcImZhcyBmYS1jaGV2cm9uLXJpZ2h0XCIsXG4gICAgICAgICAgICB0aXRsZTogXCJtc2cjZmFjZXQubmV4dFwiLFxuICAgICAgICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlKys7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlcjogKGFjdGlvbjogQWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmRpc2FibGVkID0gdGhpcy5wYWdlID49IHRoaXMubWF4UGFnZTtcbiAgICAgICAgICAgICAgICBhY3Rpb24uaGlkZGVuID0gdGhpcy5tYXhQYWdlID09PSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgbWF4UGFnZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKHRoaXMucmVjZW50RG9jdW1lbnRzU2VydmljZS5yZWNlbnRkb2N1bWVudHMubGVuZ3RoIC8gdGhpcy5tYXhEb2N1bWVudHMpIC0gMSk7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXJ0SW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZSAqIHRoaXMubWF4RG9jdW1lbnRzO1xuICAgIH1cblxuICAgIGdldCBlbmRJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gKHRoaXMucGFnZSsxKSAqIHRoaXMubWF4RG9jdW1lbnRzO1xuICAgIH1cblxuICAgIGdldCBhY3Rpb25zKCk6IEFjdGlvbltdIHtcbiAgICAgICAgdGhpcy5wcmV2aW91c1BhZ2UudXBkYXRlKCk7XG4gICAgICAgIHRoaXMubmV4dFBhZ2UudXBkYXRlKCk7XG4gICAgICAgIHJldHVybiBbdGhpcy5wcmV2aW91c1BhZ2UsIHRoaXMubmV4dFBhZ2VdO1xuICAgIH1cblxuICAgIG9wZW5SZWNlbnREb2N1bWVudChkb2N1bWVudDogUmVjZW50RG9jdW1lbnQpIHtcbiAgICAgICAgaWYodGhpcy5vcGVuT3JpZ2luYWwgJiYgISFkb2N1bWVudC51cmwxKXtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5ub3RpZnlPcGVuT3JpZ2luYWxEb2N1bWVudCg8YW55PiBkb2N1bWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kb2N1bWVudE9wZW5lZC5lbWl0KGRvY3VtZW50KTsgLy8gQ2FuIGJlIHVzZSB0byB0cmlnZ2VyIGFjdGlvbnMsIGxpa2UgdGhlIHByZXZpZXdcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZGVsZXRlRG9jdW1lbnQoZG9jdW1lbnQ6IFJlY2VudERvY3VtZW50LCBldmVudDogRXZlbnQpe1xuICAgICAgICB0aGlzLnJlY2VudERvY3VtZW50c1NlcnZpY2UuZGVsZXRlUmVjZW50RG9jdW1lbnQoZG9jdW1lbnQpO1xuICAgICAgICB0aGlzLnBhZ2UgPSBNYXRoLm1pbih0aGlzLnBhZ2UsIHRoaXMubWF4UGFnZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRRdWVyeVBhcmFtcyhkb2N1bWVudDogUmVjZW50RG9jdW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiBkb2N1bWVudC5pZCxcbiAgICAgICAgICAgIHF1ZXJ5OiB0aGlzLnNlYXJjaFNlcnZpY2UubWFrZVF1ZXJ5KCkudG9Kc29uRm9yUXVlcnlTdHJpbmcoKVxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJsaXN0LWdyb3VwIGxpc3QtZ3JvdXAtZmx1c2hcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBkb2N1bWVudCBvZiByZWNlbnREb2N1bWVudHNTZXJ2aWNlLnJlY2VudGRvY3VtZW50cyB8IHNsaWNlOnN0YXJ0SW5kZXg6ZW5kSW5kZXhcIj5cbiAgICAgICAgPGEgKm5nSWY9XCJvcGVuT3JpZ2luYWwgJiYgZG9jdW1lbnQudXJsMTsgZWxzZSBpbnRlcm5hbExpbmtcIlxuICAgICAgICAgICAgY2xhc3M9XCJyZWNlbnQtZG9jdW1lbnQtaXRlbSBsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWFjdGlvbiBkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyXCJcbiAgICAgICAgICAgIFthdHRyLmhyZWZdPVwiZG9jdW1lbnQudXJsMVwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvcGVuUmVjZW50RG9jdW1lbnQoZG9jdW1lbnQpXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRvY3VtZW50LXRleHQgbXItYXV0byB0ZXh0LXRydW5jYXRlXCIgdGl0bGU9XCJ7eyBkb2N1bWVudC50aXRsZSB9fVwiPnt7IGRvY3VtZW50LnRpdGxlIH19PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJkb2N1bWVudC5kYXRlXCIgY2xhc3M9XCJkb2N1bWVudC1kYXRlIG1sLTIgdGV4dC1tdXRlZCBzbWFsbCB0ZXh0LXJpZ2h0XCI+e3sgZG9jdW1lbnQuZGF0ZSB8IHNxRGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwiZW5hYmxlRGVsZXRlXCIgY2xhc3M9XCJkb2N1bWVudC1kZWxldGUgbWwtMiBmYXMgZmEtdGltZXNcIiBbdGl0bGVdPVwiJ21zZyNyZWNlbnREb2N1bWVudHMuZGVsZXRlJyB8IHNxTWVzc2FnZVwiIChjbGljayk9XCJkZWxldGVEb2N1bWVudChkb2N1bWVudCwgJGV2ZW50KVwiPjwvaT5cbiAgICAgICAgPC9hPlxuICAgICAgICA8bmctdGVtcGxhdGUgI2ludGVybmFsTGluaz5cbiAgICAgICAgPGEgY2xhc3M9XCJyZWNlbnQtZG9jdW1lbnQtaXRlbSBsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWFjdGlvbiBkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyXCJcbiAgICAgICAgICAgIFtyb3V0ZXJMaW5rXT1cInNlYXJjaFJvdXRlXCIgW3F1ZXJ5UGFyYW1zXT1cImdldFF1ZXJ5UGFyYW1zKGRvY3VtZW50KVwiXG4gICAgICAgICAgICAoY2xpY2spPVwib3BlblJlY2VudERvY3VtZW50KGRvY3VtZW50KVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkb2N1bWVudC10ZXh0IG1yLWF1dG8gdGV4dC10cnVuY2F0ZVwiIHRpdGxlPVwie3sgZG9jdW1lbnQudGl0bGUgfX1cIj57eyBkb2N1bWVudC50aXRsZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiZG9jdW1lbnQuZGF0ZVwiIGNsYXNzPVwiZG9jdW1lbnQtZGF0ZSBtbC0yIHRleHQtbXV0ZWQgc21hbGwgdGV4dC1yaWdodFwiPnt7IGRvY3VtZW50LmRhdGUgfCBzcURhdGUgfX08L3NwYW4+XG4gICAgICAgICAgICA8aSAqbmdJZj1cImVuYWJsZURlbGV0ZVwiIGNsYXNzPVwiZG9jdW1lbnQtZGVsZXRlIG1sLTIgZmFzIGZhLXRpbWVzXCIgW3RpdGxlXT1cIidtc2cjcmVjZW50RG9jdW1lbnRzLmRlbGV0ZScgfCBzcU1lc3NhZ2VcIiAoY2xpY2spPVwiZGVsZXRlRG9jdW1lbnQoZG9jdW1lbnQsICRldmVudClcIj48L2k+XG4gICAgICAgIDwvYT5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8ZGl2ICpuZ0lmPVwicmVjZW50RG9jdW1lbnRzU2VydmljZS5yZWNlbnRkb2N1bWVudHMubGVuZ3RoID09IDBcIiBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbSB0ZXh0LWNlbnRlciB0ZXh0LW11dGVkIGZvbnQtaXRhbGljIHNtYWxsIHB5LTVcIj5cbiAgICAgICAge3sgJ21zZyNyZWNlbnREb2N1bWVudHMubm9SZWNlbnREb2N1bWVudCcgfCBzcU1lc3NhZ2UgfX1cbiAgICA8L2Rpdj5cbjwvZGl2PiJdfQ==