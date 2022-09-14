import { Component, Input } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@sinequa/core/intl";
function ResultMissingTerms_ng_container_0_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const term_r2 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", term_r2, "");
} }
function ResultMissingTerms_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "span", 1);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 2);
    i0.ɵɵtemplate(5, ResultMissingTerms_ng_container_0_span_5_Template, 2, 1, "span", 3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, "msg#results.missingTerms"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r0.missingTerms);
} }
export class ResultMissingTerms {
    ngOnChanges(changes) {
        if (changes["record"]) {
            this.missingTerms = [];
            if (this.record.termspresence) {
                for (const tp of this.record.termspresence) {
                    if (Utils.eqNC(tp.presence, "missing")) {
                        this.missingTerms.push(tp.term);
                    }
                }
            }
        }
    }
}
ResultMissingTerms.ɵfac = function ResultMissingTerms_Factory(t) { return new (t || ResultMissingTerms)(); };
ResultMissingTerms.ɵcmp = i0.ɵɵdefineComponent({ type: ResultMissingTerms, selectors: [["sq-result-missing-terms"]], inputs: { record: "record" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "sq-missing-terms-label", "sq-text"], [1, "sq-missing-terms", "sq-text"], ["class", "sq-missing-term", 4, "ngFor", "ngForOf"], [1, "sq-missing-term"]], template: function ResultMissingTerms_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, ResultMissingTerms_ng_container_0_Template, 6, 4, "ng-container", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.missingTerms.length > 0);
    } }, directives: [i1.NgIf, i1.NgForOf], pipes: [i2.MessagePipe], styles: ["[_nghost-%COMP%]{color:#707070;display:block;font-size:.9rem}.sq-missing-term[_ngcontent-%COMP%]{-webkit-text-decoration-line:line-through;text-decoration-line:line-through}.sq-missing-term[_ngcontent-%COMP%]:not(:first-child){margin-left:.25em}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ResultMissingTerms, [{
        type: Component,
        args: [{
                selector: "sq-result-missing-terms",
                templateUrl: "./result-missing-terms.html",
                styleUrls: ["./result-missing-terms.css"]
            }]
    }], null, { record: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LW1pc3NpbmctdGVybXMuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9yZXN1bHQvIiwic291cmNlcyI6WyJyZXN1bHQtbWlzc2luZy10ZXJtcy9yZXN1bHQtbWlzc2luZy10ZXJtcy50cyIsInJlc3VsdC1taXNzaW5nLXRlcm1zL3Jlc3VsdC1taXNzaW5nLXRlcm1zLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQTJCLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7SUNFakMsK0JBQWlFO0lBQUEsWUFBUTtJQUFBLGlCQUFPOzs7SUFBZixlQUFRO0lBQVIsdUNBQVE7OztJQUhqRiw2QkFDSTtJQUFBLCtCQUE2QztJQUFBLFlBQTBDOztJQUFBLGlCQUFPO0lBQzlGLCtCQUNJO0lBQUEsb0ZBQWdGO0lBQ3BGLGlCQUFPO0lBQ1gsMEJBQWU7OztJQUprQyxlQUEwQztJQUExQyxzRUFBMEM7SUFFNUQsZUFBZTtJQUFmLDZDQUFlOztBRE05QyxNQUFNLE9BQU8sa0JBQWtCO0lBSTNCLFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO2dCQUMzQixLQUFLLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO29CQUN4QyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsRUFBRTt3QkFDcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNuQztpQkFDSjthQUNKO1NBQ0o7SUFDTCxDQUFDOztvRkFmUSxrQkFBa0I7dURBQWxCLGtCQUFrQjtRQ1QvQixxRkFLZTs7UUFMQSxrREFBNkI7O2tERFMvQixrQkFBa0I7Y0FMOUIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLFdBQVcsRUFBRSw2QkFBNkI7Z0JBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO2FBQzVDO2dCQUVZLE1BQU07a0JBQWQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHtSZWNvcmR9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1yZXN1bHQtbWlzc2luZy10ZXJtc1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcmVzdWx0LW1pc3NpbmctdGVybXMuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9yZXN1bHQtbWlzc2luZy10ZXJtcy5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgUmVzdWx0TWlzc2luZ1Rlcm1zIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSByZWNvcmQ6IFJlY29yZDtcbiAgICBtaXNzaW5nVGVybXM6IHN0cmluZ1tdO1xuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlc1tcInJlY29yZFwiXSkge1xuICAgICAgICAgICAgdGhpcy5taXNzaW5nVGVybXMgPSBbXTtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlY29yZC50ZXJtc3ByZXNlbmNlKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB0cCBvZiB0aGlzLnJlY29yZC50ZXJtc3ByZXNlbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChVdGlscy5lcU5DKHRwLnByZXNlbmNlLCBcIm1pc3NpbmdcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWlzc2luZ1Rlcm1zLnB1c2godHAudGVybSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1pc3NpbmdUZXJtcy5sZW5ndGggPiAwXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJzcS1taXNzaW5nLXRlcm1zLWxhYmVsIHNxLXRleHRcIj57eydtc2cjcmVzdWx0cy5taXNzaW5nVGVybXMnIHwgc3FNZXNzYWdlfX08L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJzcS1taXNzaW5nLXRlcm1zIHNxLXRleHRcIj5cbiAgICAgICAgPHNwYW4gKm5nRm9yPVwibGV0IHRlcm0gb2YgbWlzc2luZ1Rlcm1zXCIgY2xhc3M9XCJzcS1taXNzaW5nLXRlcm1cIj4ge3t0ZXJtfX08L3NwYW4+XG4gICAgPC9zcGFuPlxuPC9uZy1jb250YWluZXI+XG4iXX0=