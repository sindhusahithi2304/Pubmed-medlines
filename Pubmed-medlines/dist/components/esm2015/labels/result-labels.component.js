import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./labels.component";
import * as i3 from "@sinequa/core/intl";
function ResultLabels_span_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 2);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.caption));
} }
export class ResultLabels {
}
ResultLabels.ɵfac = function ResultLabels_Factory(t) { return new (t || ResultLabels)(); };
ResultLabels.ɵcmp = i0.ɵɵdefineComponent({ type: ResultLabels, selectors: [["sq-result-labels"]], inputs: { record: "record", caption: "caption", public: "public" }, decls: 2, vars: 3, consts: [["class", "sq-text", 4, "ngIf"], [3, "record", "public"], [1, "sq-text"]], template: function ResultLabels_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, ResultLabels_span_0_Template, 3, 3, "span", 0);
        i0.ɵɵelement(1, "sq-labels", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.caption);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("record", ctx.record)("public", ctx.public);
    } }, directives: [i1.NgIf, i2.Labels], pipes: [i3.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ResultLabels, [{
        type: Component,
        args: [{
                selector: "sq-result-labels",
                templateUrl: "./result-labels.component.html"
            }]
    }], null, { record: [{
            type: Input
        }], caption: [{
            type: Input
        }], public: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LWxhYmVscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9sYWJlbHMvIiwic291cmNlcyI6WyJyZXN1bHQtbGFiZWxzLmNvbXBvbmVudC50cyIsInJlc3VsdC1sYWJlbHMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7OztJQ0EvQywrQkFBc0M7SUFBQSxZQUF1Qjs7SUFBQSxpQkFBTzs7O0lBQTlCLGVBQXVCO0lBQXZCLDBEQUF1Qjs7QURPN0QsTUFBTSxPQUFPLFlBQVk7O3dFQUFaLFlBQVk7aURBQVosWUFBWTtRQ1B6QiwrREFBb0U7UUFDcEUsK0JBQTJEOztRQURwRCxrQ0FBYTtRQUNULGVBQWlCO1FBQWpCLG1DQUFpQixzQkFBQTs7a0RETWYsWUFBWTtjQUp4QixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsV0FBVyxFQUFFLGdDQUFnQzthQUNoRDtnQkFFWSxNQUFNO2tCQUFkLEtBQUs7WUFDRyxPQUFPO2tCQUFmLEtBQUs7WUFDRyxNQUFNO2tCQUFkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1JlY29yZH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLXJlc3VsdC1sYWJlbHNcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3Jlc3VsdC1sYWJlbHMuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBSZXN1bHRMYWJlbHMge1xuICAgIEBJbnB1dCgpIHJlY29yZDogUmVjb3JkO1xuICAgIEBJbnB1dCgpIGNhcHRpb246IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWM6IGJvb2xlYW47XG59XG4iLCI8c3BhbiAqbmdJZj1cImNhcHRpb25cIiBjbGFzcz1cInNxLXRleHRcIj57e2NhcHRpb24gfCBzcU1lc3NhZ2V9fTwvc3Bhbj5cbjxzcS1sYWJlbHMgW3JlY29yZF09XCJyZWNvcmRcIiBbcHVibGljXT1cInB1YmxpY1wiPjwvc3EtbGFiZWxzPlxuIl19