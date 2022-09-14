import { Input, Component } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/intl";
const _c0 = function (a0) { return { count: a0 }; };
const _c1 = function (a0) { return { values: a0 }; };
export class ResultsCounter {
}
ResultsCounter.ɵfac = function ResultsCounter_Factory(t) { return new (t || ResultsCounter)(); };
ResultsCounter.ɵcmp = i0.ɵɵdefineComponent({ type: ResultsCounter, selectors: [["sq-results-counter"]], inputs: { rowCount: "rowCount" }, decls: 3, vars: 8, consts: [[1, "sq-results-count"]], template: function ResultsCounter_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtext(1);
        i0.ɵɵpipe(2, "sqMessage");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "msg#results.resultsCount", i0.ɵɵpureFunction1(6, _c1, i0.ɵɵpureFunction1(4, _c0, ctx.rowCount))));
    } }, pipes: [i1.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ResultsCounter, [{
        type: Component,
        args: [{
                selector: "sq-results-counter",
                templateUrl: "./results-counter.html"
            }]
    }], null, { rowCount: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0cy1jb3VudGVyLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvcmVzdWx0LyIsInNvdXJjZXMiOlsicmVzdWx0cy1jb3VudGVyL3Jlc3VsdHMtY291bnRlci50cyIsInJlc3VsdHMtY291bnRlci9yZXN1bHRzLWNvdW50ZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFNL0MsTUFBTSxPQUFPLGNBQWM7OzRFQUFkLGNBQWM7bURBQWQsY0FBYztRQ04zQiw4QkFBOEI7UUFBQSxZQUF3RTs7UUFBQSxpQkFBTTs7UUFBOUUsZUFBd0U7UUFBeEUsNElBQXdFOztrRERNekYsY0FBYztjQUoxQixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsV0FBVyxFQUFFLHdCQUF3QjthQUN4QztnQkFFWSxRQUFRO2tCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbnB1dCwgQ29tcG9uZW50fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1yZXN1bHRzLWNvdW50ZXJcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3Jlc3VsdHMtY291bnRlci5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgUmVzdWx0c0NvdW50ZXIge1xuICAgIEBJbnB1dCgpIHJvd0NvdW50OiBudW1iZXI7XG59XG4iLCI8ZGl2IGNsYXNzPVwic3EtcmVzdWx0cy1jb3VudFwiPnt7J21zZyNyZXN1bHRzLnJlc3VsdHNDb3VudCcgfCBzcU1lc3NhZ2U6e3ZhbHVlczoge2NvdW50OiByb3dDb3VudH0gfSB9fTwvZGl2PiJdfQ==