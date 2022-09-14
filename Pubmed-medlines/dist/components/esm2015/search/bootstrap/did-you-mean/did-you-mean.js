import { Component, Input } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import { DidYouMeanKind } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
import * as i1 from "../../search.service";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/core/intl";
function BsDidYouMean_div_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementStart(3, "a", 3);
    i0.ɵɵlistener("click", function BsDidYouMean_div_0_ng_container_1_Template_a_click_3_listener() { i0.ɵɵrestoreView(_r5); const ctx_r4 = i0.ɵɵnextContext(2); return ctx_r4.selectCorrected(); });
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "sqMessage");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 3, "msg#didYouMean.dymonlyBeforeCorrected"), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.item.corrected);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(6, 5, "msg#didYouMean.dymonlyAfterCorrected"), " ");
} }
function BsDidYouMean_div_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementStart(3, "a", 3);
    i0.ɵɵlistener("click", function BsDidYouMean_div_0_ng_container_2_Template_a_click_3_listener() { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(2); return ctx_r6.selectCorrected(); });
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "sqMessage");
    i0.ɵɵelementStart(7, "a", 4);
    i0.ɵɵlistener("click", function BsDidYouMean_div_0_ng_container_2_Template_a_click_7_listener() { i0.ɵɵrestoreView(_r7); const ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.selectOriginal(); });
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "sqMessage");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 5, "msg#didYouMean.correctBeforeCorrected"), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.item.corrected);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 7, "msg#didYouMean.correctBeforeOriginal"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.item.original);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(10, 9, "msg#didYouMean.correctAfterOriginal"), " ");
} }
function BsDidYouMean_div_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementStart(3, "a", 4);
    i0.ɵɵlistener("click", function BsDidYouMean_div_0_ng_container_3_Template_a_click_3_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(2); return ctx_r9.selectOriginal(); });
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "sqMessage");
    i0.ɵɵelementStart(7, "a", 4);
    i0.ɵɵlistener("click", function BsDidYouMean_div_0_ng_container_3_Template_a_click_7_listener() { i0.ɵɵrestoreView(_r10); const ctx_r11 = i0.ɵɵnextContext(2); return ctx_r11.selectCorrected(); });
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "sqMessage");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 5, "msg#didYouMean.smartBeforeOriginal"), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.item.original);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 7, "msg#didYouMean.smartBeforeCorrected"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.item.corrected);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(10, 9, "msg#didYouMean.smartAfterCorrected"), " ");
} }
function BsDidYouMean_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtemplate(1, BsDidYouMean_div_0_ng_container_1_Template, 7, 7, "ng-container", 2);
    i0.ɵɵtemplate(2, BsDidYouMean_div_0_ng_container_2_Template, 11, 11, "ng-container", 2);
    i0.ɵɵtemplate(3, BsDidYouMean_div_0_ng_container_3_Template, 11, 11, "ng-container", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMapInterpolate1("sq-did-you-mean sq-text ", "sq-" + ctx_r0.context, "");
    i0.ɵɵproperty("ngSwitch", ctx_r0.results.didYouMean.spellingCorrectionMode);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "DYMOnly");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "Correct");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "Smart");
} }
export class BsDidYouMean {
    constructor(searchService) {
        this.searchService = searchService;
        this.context = "search";
    }
    handleResults() {
        this.item = undefined;
        if (this.results && this.results.didYouMean) {
            if (this.context === "search") {
                const item = this.results.didYouMean.text;
                if (item && item.corrected) {
                    this.item = item;
                }
            }
            else {
                const refineSelect = this.searchService.query.findSelect("refine");
                if (refineSelect && Utils.startsWith(refineSelect.expression, "refine:") && !!this.results.didYouMean.refine) {
                    const dymItem = this.results.didYouMean.refine[this.results.didYouMean.refine.length - 1];
                    if (dymItem.corrected) {
                        this.item = dymItem;
                    }
                }
            }
        }
    }
    ngOnChanges(changes) {
        if (!!changes["results"]) {
            this.handleResults();
        }
    }
    selectOriginal() {
        if (this.item) {
            this.searchService.didYouMean(this.item.original, this.context, DidYouMeanKind.Original);
        }
        return false;
    }
    selectCorrected() {
        if (this.item) {
            this.searchService.didYouMean(this.item.corrected, this.context, DidYouMeanKind.Corrected);
        }
        return false;
    }
}
BsDidYouMean.ɵfac = function BsDidYouMean_Factory(t) { return new (t || BsDidYouMean)(i0.ɵɵdirectiveInject(i1.SearchService)); };
BsDidYouMean.ɵcmp = i0.ɵɵdefineComponent({ type: BsDidYouMean, selectors: [["sq-did-you-mean"]], inputs: { results: "results", context: "context" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "class", "ngSwitch", 4, "ngIf"], [3, "ngSwitch"], [4, "ngSwitchCase"], ["href", "#", 1, "sq-did-you-mean-corrected", 3, "click"], ["href", "#", 1, "sq-did-you-mean-original", 3, "click"]], template: function BsDidYouMean_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsDidYouMean_div_0_Template, 4, 7, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !!ctx.item);
    } }, directives: [i2.NgIf, i2.NgSwitch, i2.NgSwitchCase], pipes: [i3.MessagePipe], styles: [".sq-did-you-mean[_ngcontent-%COMP%]   .sq-did-you-mean-corrected[_ngcontent-%COMP%], .sq-did-you-mean[_ngcontent-%COMP%]   .sq-did-you-mean-original[_ngcontent-%COMP%]{font-style:italic}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsDidYouMean, [{
        type: Component,
        args: [{
                selector: "sq-did-you-mean",
                templateUrl: "./did-you-mean.html",
                styleUrls: ["./did-you-mean.css"]
            }]
    }], function () { return [{ type: i1.SearchService }]; }, { results: [{
            type: Input
        }], context: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlkLXlvdS1tZWFuLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc2VhcmNoLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2RpZC15b3UtbWVhbi9kaWQteW91LW1lYW4udHMiLCJib290c3RyYXAvZGlkLXlvdS1tZWFuL2RpZC15b3UtbWVhbi5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUEyQixNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDekMsT0FBTyxFQUEwQixjQUFjLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7OztJQ0QvRSw2QkFDSTtJQUFBLFlBQXVEOztJQUFBLDRCQUEwRTtJQUE1QixnTUFBMkI7SUFBQyxZQUFrQjtJQUFBLGlCQUFJO0lBQUEsWUFDM0o7O0lBQUEsMEJBQWU7OztJQURYLGVBQXVEO0lBQXZELDZGQUF1RDtJQUEwRSxlQUFrQjtJQUFsQiwyQ0FBa0I7SUFBSSxlQUMzSjtJQUQySiw0RkFDM0o7Ozs7SUFDQSw2QkFDSTtJQUFBLFlBQXVEOztJQUFBLDRCQUEwRTtJQUE1QixnTUFBMkI7SUFBQyxZQUFrQjtJQUFBLGlCQUFJO0lBQUEsWUFBc0Q7O0lBQUEsNEJBQXdFO0lBQTNCLCtMQUEwQjtJQUFDLFlBQWlCO0lBQUEsaUJBQUk7SUFBQSxZQUM5Uzs7SUFBQSwwQkFBZTs7O0lBRFgsZUFBdUQ7SUFBdkQsNkZBQXVEO0lBQTBFLGVBQWtCO0lBQWxCLDJDQUFrQjtJQUFJLGVBQXNEO0lBQXRELGtGQUFzRDtJQUF3RSxlQUFpQjtJQUFqQiwwQ0FBaUI7SUFBSSxlQUM5UztJQUQ4Uyw0RkFDOVM7Ozs7SUFDQSw2QkFDSTtJQUFBLFlBQW9EOztJQUFBLDRCQUF3RTtJQUEzQixnTUFBMEI7SUFBQyxZQUFpQjtJQUFBLGlCQUFJO0lBQUEsWUFBcUQ7O0lBQUEsNEJBQXlF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bEMsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUM7YUFDcEM7Z0VBRVksT0FBTztrQkFBZixLQUFLO1lBQ0csT0FBTztrQkFBZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXN9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge1Jlc3VsdHMsIERpZFlvdU1lYW5JdGVtLCBEaWRZb3VNZWFuS2luZH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge1NlYXJjaFNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZWFyY2guc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1kaWQteW91LW1lYW5cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2RpZC15b3UtbWVhbi5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL2RpZC15b3UtbWVhbi5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQnNEaWRZb3VNZWFuIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSByZXN1bHRzOiBSZXN1bHRzO1xuICAgIEBJbnB1dCgpIGNvbnRleHQ6IFwic2VhcmNoXCIgfCBcInJlZmluZVwiID0gXCJzZWFyY2hcIjtcbiAgICBpdGVtOiBEaWRZb3VNZWFuSXRlbSB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSkge1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlUmVzdWx0cygpIHtcbiAgICAgICAgdGhpcy5pdGVtID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAodGhpcy5yZXN1bHRzICYmIHRoaXMucmVzdWx0cy5kaWRZb3VNZWFuKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0ID09PSBcInNlYXJjaFwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMucmVzdWx0cy5kaWRZb3VNZWFuLnRleHQ7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5jb3JyZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtID0gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWZpbmVTZWxlY3QgPSB0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnkuZmluZFNlbGVjdChcInJlZmluZVwiKTtcbiAgICAgICAgICAgICAgICBpZiAocmVmaW5lU2VsZWN0ICYmIFV0aWxzLnN0YXJ0c1dpdGgocmVmaW5lU2VsZWN0LmV4cHJlc3Npb24sIFwicmVmaW5lOlwiKSAmJiAhIXRoaXMucmVzdWx0cy5kaWRZb3VNZWFuLnJlZmluZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkeW1JdGVtID0gdGhpcy5yZXN1bHRzLmRpZFlvdU1lYW4ucmVmaW5lW3RoaXMucmVzdWx0cy5kaWRZb3VNZWFuLnJlZmluZS5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGR5bUl0ZW0uY29ycmVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW0gPSBkeW1JdGVtO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoISFjaGFuZ2VzW1wicmVzdWx0c1wiXSkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHRzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RPcmlnaW5hbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXRlbSkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLmRpZFlvdU1lYW4odGhpcy5pdGVtLm9yaWdpbmFsLCB0aGlzLmNvbnRleHQsIERpZFlvdU1lYW5LaW5kLk9yaWdpbmFsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc2VsZWN0Q29ycmVjdGVkKCkge1xuICAgICAgICBpZiAodGhpcy5pdGVtKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UuZGlkWW91TWVhbih0aGlzLml0ZW0uY29ycmVjdGVkLCB0aGlzLmNvbnRleHQsIERpZFlvdU1lYW5LaW5kLkNvcnJlY3RlZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn0iLCI8ZGl2ICpuZ0lmPVwiISFpdGVtXCIgY2xhc3M9XCJzcS1kaWQteW91LW1lYW4gc3EtdGV4dCB7eydzcS0nICsgY29udGV4dH19XCIgW25nU3dpdGNoXT1cInJlc3VsdHMuZGlkWW91TWVhbi5zcGVsbGluZ0NvcnJlY3Rpb25Nb2RlXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ0RZTU9ubHknXCI+XG4gICAgICAgIHt7J21zZyNkaWRZb3VNZWFuLmR5bW9ubHlCZWZvcmVDb3JyZWN0ZWQnIHwgc3FNZXNzYWdlfX08YSBjbGFzcz1cInNxLWRpZC15b3UtbWVhbi1jb3JyZWN0ZWRcIiBocmVmPVwiI1wiIChjbGljayk9XCJzZWxlY3RDb3JyZWN0ZWQoKVwiPnt7aXRlbS5jb3JyZWN0ZWR9fTwvYT57eydtc2cjZGlkWW91TWVhbi5keW1vbmx5QWZ0ZXJDb3JyZWN0ZWQnIHwgc3FNZXNzYWdlfX1cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCInQ29ycmVjdCdcIj5cbiAgICAgICAge3snbXNnI2RpZFlvdU1lYW4uY29ycmVjdEJlZm9yZUNvcnJlY3RlZCcgfCBzcU1lc3NhZ2V9fTxhIGNsYXNzPVwic3EtZGlkLXlvdS1tZWFuLWNvcnJlY3RlZFwiIGhyZWY9XCIjXCIgKGNsaWNrKT1cInNlbGVjdENvcnJlY3RlZCgpXCI+e3tpdGVtLmNvcnJlY3RlZH19PC9hPnt7J21zZyNkaWRZb3VNZWFuLmNvcnJlY3RCZWZvcmVPcmlnaW5hbCcgfCBzcU1lc3NhZ2V9fTxhIGNsYXNzPVwic3EtZGlkLXlvdS1tZWFuLW9yaWdpbmFsXCIgaHJlZj1cIiNcIiAoY2xpY2spPVwic2VsZWN0T3JpZ2luYWwoKVwiPnt7aXRlbS5vcmlnaW5hbH19PC9hPnt7J21zZyNkaWRZb3VNZWFuLmNvcnJlY3RBZnRlck9yaWdpbmFsJyB8IHNxTWVzc2FnZX19XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ1NtYXJ0J1wiPlxuICAgICAgICB7eydtc2cjZGlkWW91TWVhbi5zbWFydEJlZm9yZU9yaWdpbmFsJyB8IHNxTWVzc2FnZX19PGEgY2xhc3M9XCJzcS1kaWQteW91LW1lYW4tb3JpZ2luYWxcIiBocmVmPVwiI1wiIChjbGljayk9XCJzZWxlY3RPcmlnaW5hbCgpXCI+e3tpdGVtLm9yaWdpbmFsfX08L2E+e3snbXNnI2RpZFlvdU1lYW4uc21hcnRCZWZvcmVDb3JyZWN0ZWQnIHwgc3FNZXNzYWdlfX08YSBjbGFzcz1cInNxLWRpZC15b3UtbWVhbi1vcmlnaW5hbFwiIGhyZWY9XCIjXCIgKGNsaWNrKT1cInNlbGVjdENvcnJlY3RlZCgpXCI+e3tpdGVtLmNvcnJlY3RlZH19PC9hPnt7J21zZyNkaWRZb3VNZWFuLnNtYXJ0QWZ0ZXJDb3JyZWN0ZWQnIHwgc3FNZXNzYWdlfX1cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvZGl2PiJdfQ==