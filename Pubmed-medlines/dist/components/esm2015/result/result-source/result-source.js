import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/components/search";
import * as i2 from "@angular/common";
function ResultSource_ng_container_1_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, " \u203A ");
    i0.ɵɵelementEnd();
} }
function ResultSource_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ResultSource_ng_container_1_span_1_Template, 2, 0, "span", 2);
    i0.ɵɵelementStart(2, "span", 4);
    i0.ɵɵlistener("click", function ResultSource_ng_container_1_Template_span_click_2_listener() { i0.ɵɵrestoreView(_r7); const s_r3 = ctx.$implicit; const ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.select(s_r3); });
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const s_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", i_r4 > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r3.display);
} }
function ResultSource_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, " - ");
    i0.ɵɵelementEnd();
} }
function ResultSource_a_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵpropertyInterpolate("href", ctx_r2.url, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r2.url);
} }
export class ResultSource {
    constructor(searchService) {
        this.searchService = searchService;
        this.displayTreepathMinLevel = 0;
        this.displayUrl = true;
        this.source = [];
    }
    ngOnInit() {
        if (this.displayTreepath && !!this.record.treepath) {
            const treepath = this.record.treepath[0];
            if (!!treepath && treepath.length >= 2) {
                this.source = treepath.substr(1, treepath.length - 2).split('/')
                    .slice(this.displayTreepathMinLevel, this.displayTreepathMaxLevel)
                    .map((path, i, array) => {
                    return {
                        display: path,
                        value: '/' + array.slice(0, i + 1).join('/') + '/*'
                    };
                });
            }
        }
        if (this.displayUrl) {
            this.url = this.record.url1;
        }
    }
    select(item) {
        if (this.searchService.addFieldSelect("treepath", item)) {
            this.searchService.search();
        }
    }
}
ResultSource.ɵfac = function ResultSource_Factory(t) { return new (t || ResultSource)(i0.ɵɵdirectiveInject(i1.SearchService)); };
ResultSource.ɵcmp = i0.ɵɵdefineComponent({ type: ResultSource, selectors: [["sq-result-source"]], inputs: { record: "record", displayTreepath: "displayTreepath", displayTreepathMinLevel: "displayTreepathMinLevel", displayTreepathMaxLevel: "displayTreepathMaxLevel", displayUrl: "displayUrl" }, decls: 4, vars: 3, consts: [[1, "sq-result-source"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["target", "_blank", 3, "href", 4, "ngIf"], ["title", "Select this source", 1, "link", 3, "click"], ["target", "_blank", 3, "href"]], template: function ResultSource_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 0);
        i0.ɵɵtemplate(1, ResultSource_ng_container_1_Template, 4, 2, "ng-container", 1);
        i0.ɵɵtemplate(2, ResultSource_span_2_Template, 2, 0, "span", 2);
        i0.ɵɵtemplate(3, ResultSource_a_3_Template, 2, 2, "a", 3);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.source);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.source.length > 0 && !!ctx.url);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.url);
    } }, directives: [i2.NgForOf, i2.NgIf], styles: [".sq-result-source[_ngcontent-%COMP%]{color:#006621;display:inline-block;font-size:.9rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}.link[_ngcontent-%COMP%]{cursor:pointer}.link[_ngcontent-%COMP%]:hover{text-decoration:underline}a[_ngcontent-%COMP%]{color:inherit}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ResultSource, [{
        type: Component,
        args: [{
                selector: "sq-result-source",
                templateUrl: "./result-source.html",
                styleUrls: ["./result-source.css"]
            }]
    }], function () { return [{ type: i1.SearchService }]; }, { record: [{
            type: Input
        }], displayTreepath: [{
            type: Input
        }], displayTreepathMinLevel: [{
            type: Input
        }], displayTreepathMaxLevel: [{
            type: Input
        }], displayUrl: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3Jlc3VsdC8iLCJzb3VyY2VzIjpbInJlc3VsdC1zb3VyY2UvcmVzdWx0LXNvdXJjZS50cyIsInJlc3VsdC1zb3VyY2UvcmVzdWx0LXNvdXJjZS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFDOzs7OztJQ0UvQyw0QkFBcUI7SUFBQSx3QkFBUTtJQUFBLGlCQUFPOzs7O0lBRHhDLDZCQUNJO0lBQUEsOEVBQW9DO0lBQ3BDLCtCQUFrRTtJQUE1RCxtTkFBbUI7SUFBeUMsWUFBYTtJQUFBLGlCQUFPO0lBQzFGLDBCQUFlOzs7O0lBRkosZUFBVztJQUFYLCtCQUFXO0lBQ2dELGVBQWE7SUFBYixrQ0FBYTs7O0lBRW5GLDRCQUF3QztJQUFBLG1CQUFFO0lBQUEsaUJBQU87OztJQUNqRCw0QkFBOEM7SUFBQSxZQUFPO0lBQUEsaUJBQUk7OztJQUExQyw4REFBYztJQUFpQixlQUFPO0lBQVAsZ0NBQU87O0FESXpELE1BQU0sT0FBTyxZQUFZO0lBVXJCLFlBQ1csYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFSOUIsNEJBQXVCLEdBQUcsQ0FBQyxDQUFDO1FBRTVCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFcEMsV0FBTSxHQUFnQixFQUFFLENBQUM7SUFLekIsQ0FBQztJQUVNLFFBQVE7UUFDWCxJQUFHLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFDO1lBQzlDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLElBQUcsQ0FBQyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztnQkFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7cUJBQ3pELEtBQUssQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDO3FCQUNqRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxFQUFFO29CQUNsQixPQUFPO3dCQUNILE9BQU8sRUFBRSxJQUFJO3dCQUNiLEtBQUssRUFBRSxHQUFHLEdBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQyxJQUFJO3FCQUMvQyxDQUFDO2dCQUNOLENBQUMsQ0FBQyxDQUFDO2FBQ1Y7U0FDSjtRQUNELElBQUcsSUFBSSxDQUFDLFVBQVUsRUFBQztZQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUk7UUFDUCxJQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQy9CO0lBQ0wsQ0FBQzs7d0VBckNRLFlBQVk7aURBQVosWUFBWTtRQ1Z6QiwrQkFDSTtRQUFBLCtFQUdlO1FBQ2YsK0RBQWlEO1FBQ2pELHlEQUF5RDtRQUM3RCxpQkFBTzs7UUFOeUIsZUFBVztRQUFYLG9DQUFXO1FBSWhDLGVBQThCO1FBQTlCLHlEQUE4QjtRQUNqQyxlQUFTO1FBQVQsOEJBQVM7O2tERElKLFlBQVk7Y0FMeEIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFdBQVcsRUFBRSxzQkFBc0I7Z0JBQ25DLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO2FBQ3JDO2dFQUVZLE1BQU07a0JBQWQsS0FBSztZQUNHLGVBQWU7a0JBQXZCLEtBQUs7WUFDRyx1QkFBdUI7a0JBQS9CLEtBQUs7WUFDRyx1QkFBdUI7a0JBQS9CLEtBQUs7WUFDRyxVQUFVO2tCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1ZhbHVlSXRlbX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYXBwLXV0aWxzXCI7XG5pbXBvcnQge1JlY29yZH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge1NlYXJjaFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3NlYXJjaFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1yZXN1bHQtc291cmNlXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9yZXN1bHQtc291cmNlLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vcmVzdWx0LXNvdXJjZS5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgUmVzdWx0U291cmNlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSByZWNvcmQ6IFJlY29yZDtcbiAgICBASW5wdXQoKSBkaXNwbGF5VHJlZXBhdGg6IGJvb2xlYW47XG4gICAgQElucHV0KCkgZGlzcGxheVRyZWVwYXRoTWluTGV2ZWwgPSAwO1xuICAgIEBJbnB1dCgpIGRpc3BsYXlUcmVlcGF0aE1heExldmVsOiBudW1iZXI7XG4gICAgQElucHV0KCkgZGlzcGxheVVybDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBzb3VyY2U6IFZhbHVlSXRlbVtdID0gW107XG4gICAgdXJsOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmKHRoaXMuZGlzcGxheVRyZWVwYXRoICYmICEhdGhpcy5yZWNvcmQudHJlZXBhdGgpe1xuICAgICAgICAgICAgY29uc3QgdHJlZXBhdGggPSB0aGlzLnJlY29yZC50cmVlcGF0aFswXTtcbiAgICAgICAgICAgIGlmKCEhdHJlZXBhdGggJiYgdHJlZXBhdGgubGVuZ3RoID49IDIpe1xuICAgICAgICAgICAgICAgIHRoaXMuc291cmNlID0gdHJlZXBhdGguc3Vic3RyKDEsIHRyZWVwYXRoLmxlbmd0aC0yKS5zcGxpdCgnLycpXG4gICAgICAgICAgICAgICAgICAgIC5zbGljZSh0aGlzLmRpc3BsYXlUcmVlcGF0aE1pbkxldmVsLCB0aGlzLmRpc3BsYXlUcmVlcGF0aE1heExldmVsKVxuICAgICAgICAgICAgICAgICAgICAubWFwKChwYXRoLGksYXJyYXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogcGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJy8nK2FycmF5LnNsaWNlKDAsaSsxKS5qb2luKCcvJykrJy8qJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5kaXNwbGF5VXJsKXtcbiAgICAgICAgICAgIHRoaXMudXJsID0gdGhpcy5yZWNvcmQudXJsMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdChpdGVtKXtcbiAgICAgICAgaWYodGhpcy5zZWFyY2hTZXJ2aWNlLmFkZEZpZWxkU2VsZWN0KFwidHJlZXBhdGhcIiwgaXRlbSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2goKTtcbiAgICAgICAgfVxuICAgIH1cblxufSIsIjxzcGFuIGNsYXNzPVwic3EtcmVzdWx0LXNvdXJjZVwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHMgb2Ygc291cmNlOyBsZXQgaT1pbmRleFwiPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImkgPiAwXCI+ICYjODI1MDsgPC9zcGFuPlxuICAgICAgICA8c3BhbiAoY2xpY2spPVwic2VsZWN0KHMpXCIgY2xhc3M9XCJsaW5rXCIgdGl0bGU9XCJTZWxlY3QgdGhpcyBzb3VyY2VcIj57e3MuZGlzcGxheX19PC9zcGFuPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxzcGFuICpuZ0lmPVwic291cmNlLmxlbmd0aD4wICYmICEhdXJsXCI+IC0gPC9zcGFuPlxuICAgIDxhICpuZ0lmPVwidXJsXCIgaHJlZj1cInt7dXJsfX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj57e3VybH19PC9hPlxuPC9zcGFuPiJdfQ==