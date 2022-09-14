import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/components/search";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/core/intl";
function BsPreviewLinks_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelementStart(1, "div", 2);
    i0.ɵɵelementStart(2, "nav");
    i0.ɵɵelementStart(3, "ul", 3);
    i0.ɵɵelementStart(4, "li", 4);
    i0.ɵɵelementStart(5, "a", 5);
    i0.ɵɵlistener("click", function BsPreviewLinks_div_0_Template_a_click_5_listener() { i0.ɵɵrestoreView(_r2); const ctx_r1 = i0.ɵɵnextContext(); return ctx_r1.click(); });
    i0.ɵɵelement(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵpropertyInterpolate("href", ctx_r0.originalDocumentUrl, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵclassMapInterpolate1("far fa-file sq-icon-file-", ctx_r0.record.fileext, "");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(8, 5, "msg#preview.originalDocument"), " ");
} }
export class BsPreviewLinks {
    constructor(searchService) {
        this.searchService = searchService;
    }
    ngOnChanges() {
        this.originalDocumentUrl = this.record.url1;
    }
    click() {
        this.searchService.notifyOpenOriginalDocument(this.record, this.resultId);
    }
}
BsPreviewLinks.ɵfac = function BsPreviewLinks_Factory(t) { return new (t || BsPreviewLinks)(i0.ɵɵdirectiveInject(i1.SearchService)); };
BsPreviewLinks.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewLinks, selectors: [["sq-preview-links"]], inputs: { record: "record", resultId: "resultId" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "card sq-facet", 4, "ngIf"], [1, "card", "sq-facet"], [1, "card-body"], [1, "nav", "nav-pills", "nav-stacked"], [1, "nav-item"], ["target", "_blank", 1, "nav-link", "originalDocumentLink", 3, "href", "click"]], template: function BsPreviewLinks_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsPreviewLinks_div_0_Template, 9, 7, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !!ctx.originalDocumentUrl);
    } }, directives: [i2.NgIf], pipes: [i3.MessagePipe], styles: [".originalDocumentLink[_ngcontent-%COMP%]{padding-left:0}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsPreviewLinks, [{
        type: Component,
        args: [{
                selector: "sq-preview-links",
                // For highlight buttons...
                // http://stackoverflow.com/questions/21245541/min-and-max-width-mess-up-text-align-center
                templateUrl: "./preview-links.html",
                styleUrls: ["./preview-links.css"]
            }]
    }], function () { return [{ type: i1.SearchService }]; }, { record: [{
            type: Input
        }], resultId: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy1saW5rcy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3ByZXZpZXcvIiwic291cmNlcyI6WyJib290c3RyYXAvcHJldmlldy1saW5rcy9wcmV2aWV3LWxpbmtzLnRzIiwiYm9vdHN0cmFwL3ByZXZpZXctbGlua3MvcHJldmlldy1saW5rcy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFZLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0lDQTFELDhCQUNJO0lBQUEsOEJBQ0k7SUFBQSwyQkFDSTtJQUFBLDZCQUNJO0lBQUEsNkJBQ0k7SUFBQSw0QkFDSTtJQUQ4Qix3S0FBaUI7SUFDL0MsdUJBQWlFO0lBQUMsWUFDdEU7O0lBQUEsaUJBQUk7SUFDUixpQkFBSztJQUNULGlCQUFLO0lBQ1QsaUJBQU07SUFDVixpQkFBTTtJQUNWLGlCQUFNOzs7SUFQaUIsZUFBOEI7SUFBOUIsOEVBQThCO0lBQ3ZCLGVBQW1EO0lBQW5ELGlGQUFtRDtJQUFTLGVBQ3RFO0lBRHNFLHFGQUN0RTs7QURJcEIsTUFBTSxPQUFPLGNBQWM7SUFLdkIsWUFDWSxhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUN4QyxDQUFDO0lBRU0sV0FBVztRQUNkLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoRCxDQUFDO0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUUsQ0FBQzs7NEVBZlEsY0FBYzttREFBZCxjQUFjO1FDWDNCLCtEQVlNOztRQVpBLGdEQUEyQjs7a0REV3BCLGNBQWM7Y0FQMUIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLDJCQUEyQjtnQkFDM0IsMEZBQTBGO2dCQUMxRixXQUFXLEVBQUUsc0JBQXNCO2dCQUNuQyxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQzthQUNyQztnRUFFWSxNQUFNO2tCQUFkLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXN9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1JlY29yZH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge1NlYXJjaFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3NlYXJjaFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1wcmV2aWV3LWxpbmtzXCIsXG4gICAgLy8gRm9yIGhpZ2hsaWdodCBidXR0b25zLi4uXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMTI0NTU0MS9taW4tYW5kLW1heC13aWR0aC1tZXNzLXVwLXRleHQtYWxpZ24tY2VudGVyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wcmV2aWV3LWxpbmtzLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vcHJldmlldy1saW5rcy5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQnNQcmV2aWV3TGlua3MgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIHJlY29yZDogUmVjb3JkO1xuICAgIEBJbnB1dCgpIHJlc3VsdElkOiBzdHJpbmc7XG4gICAgb3JpZ2luYWxEb2N1bWVudFVybDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbERvY3VtZW50VXJsID0gdGhpcy5yZWNvcmQudXJsMTtcbiAgICB9XG5cbiAgICBjbGljaygpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLm5vdGlmeU9wZW5PcmlnaW5hbERvY3VtZW50KHRoaXMucmVjb3JkLCB0aGlzLnJlc3VsdElkKTtcbiAgICB9XG59IiwiPGRpdiAqbmdJZj1cIiEhb3JpZ2luYWxEb2N1bWVudFVybFwiIGNsYXNzPVwiY2FyZCBzcS1mYWNldFwiPlxuICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgPG5hdj5cbiAgICAgICAgICAgIDx1bCBjbGFzcz1cIm5hdiBuYXYtcGlsbHMgbmF2LXN0YWNrZWRcIj5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwie3tvcmlnaW5hbERvY3VtZW50VXJsfX1cIiAoY2xpY2spPVwiY2xpY2soKVwiIGNsYXNzPVwibmF2LWxpbmsgb3JpZ2luYWxEb2N1bWVudExpbmtcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmFyIGZhLWZpbGUgc3EtaWNvbi1maWxlLXt7cmVjb3JkLmZpbGVleHR9fVwiPjwvc3Bhbj4ge3snbXNnI3ByZXZpZXcub3JpZ2luYWxEb2N1bWVudCcgfCBzcU1lc3NhZ2V9fVxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvbmF2PlxuICAgIDwvZGl2PlxuPC9kaXY+Il19