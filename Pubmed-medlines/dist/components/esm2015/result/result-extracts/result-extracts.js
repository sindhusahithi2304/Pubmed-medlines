import { Component, Input } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@sinequa/components/collapse";
import * as i3 from "@sinequa/components/utils";
function ResultExtracts_ng_container_0_p_1_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 5);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqDate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(2, 2, ctx_r4.record.modified, ctx_r4.dateFormat), "", !!ctx_r4.text ? " - " : "", "");
} }
function ResultExtracts_ng_container_0_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtemplate(1, ResultExtracts_ng_container_0_p_1_span_1_Template, 3, 5, "span", 3);
    i0.ɵɵelement(2, "span", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMapInterpolate1("", ctx_r1.extractsClass, " sq-text");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.record.modified && !ctx_r1.hideDate);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", ctx_r1.text, i0.ɵɵsanitizeHtml);
} }
function ResultExtracts_ng_container_0_ng_container_2_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqDate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(3);
    i0.ɵɵclassMapInterpolate1("", ctx_r5.extractsClass, " extracts-date sq-text");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 4, ctx_r5.record.modified, ctx_r5.dateFormat));
} }
function ResultExtracts_ng_container_0_ng_container_2_ul_2_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "li", 7);
} if (rf & 2) {
    const extract_r8 = ctx.$implicit;
    i0.ɵɵproperty("innerHTML", extract_r8, i0.ɵɵsanitizeHtml);
} }
function ResultExtracts_ng_container_0_ng_container_2_ul_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul");
    i0.ɵɵtemplate(1, ResultExtracts_ng_container_0_ng_container_2_ul_2_li_1_Template, 1, 1, "li", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(3);
    i0.ɵɵclassMapInterpolate1("", ctx_r6.extractsClass, " sq-text");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r6.longExtracts);
} }
function ResultExtracts_ng_container_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ResultExtracts_ng_container_0_ng_container_2_p_1_Template, 3, 7, "p", 1);
    i0.ɵɵtemplate(2, ResultExtracts_ng_container_0_ng_container_2_ul_2_Template, 2, 4, "ul", 1);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.record.modified && !ctx_r2.hideDate);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.longExtracts);
} }
function ResultExtracts_ng_container_0_a_3_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 8);
    i0.ɵɵlistener("click", function ResultExtracts_ng_container_0_a_3_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(2); return ctx_r9.collapseClick($event); });
    i0.ɵɵelement(1, "sq-collapse-button", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("collapsed", ctx_r3.collapsed);
} }
function ResultExtracts_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ResultExtracts_ng_container_0_p_1_Template, 3, 5, "p", 1);
    i0.ɵɵtemplate(2, ResultExtracts_ng_container_0_ng_container_2_Template, 3, 2, "ng-container", 0);
    i0.ɵɵtemplate(3, ResultExtracts_ng_container_0_a_3_Template, 2, 1, "a", 2);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.longExtracts);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.longExtracts);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.showLinesExpander);
} }
export class ResultExtracts {
    constructor() {
        this.dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };
        this.collapsed = true;
    }
    setup() {
        this.text = undefined;
        this.longExtracts = undefined;
        if (this.showTextAlways) {
            this.text = Utils.encodeHTML(this.record.text);
            this.extractsClass = "sq-text-extracts";
        }
        else {
            if (this.showLongExtracts && (this.record["extracts"] || this.record["extractsperpartname"])) {
                this.longExtracts = [];
                // extractsperpartname is a complex structure where extracts are stored in an object: "highlight.data"
                // in a csv field (';' separator)
                let recordExtracts = this.record["extracts"] || this.record["extractsperpartname"].highlight[0].data.split(";");
                if (this.maxLongExtracts) {
                    recordExtracts = recordExtracts.slice(0, this.maxLongExtracts * 3);
                }
                for (let i = 0; i < recordExtracts.length; i += 3) {
                    this.longExtracts.push(recordExtracts[i].replace(/\{b\}/g, "<strong>").replace(/\{nb\}/g, "</strong>"));
                }
                this.extractsClass = "sq-long-extracts";
            }
            else if (this.record.relevantExtracts) {
                this.text = this.record.relevantExtracts;
                this.extractsClass = "sq-relevant-extracts";
            }
            else {
                this.text = Utils.encodeHTML(this.record.text);
                this.extractsClass = "sq-text-extracts";
            }
        }
        if (!this.limitLinesDisplayed || !this.collapsed) {
            this.extractsClass += " sq-show-all";
        }
    }
    ngOnChanges(changes) {
        this.setup();
    }
    collapseClick(event) {
        this.collapsed = !this.collapsed;
        this.setup();
        event.preventDefault();
    }
}
ResultExtracts.ɵfac = function ResultExtracts_Factory(t) { return new (t || ResultExtracts)(); };
ResultExtracts.ɵcmp = i0.ɵɵdefineComponent({ type: ResultExtracts, selectors: [["sq-result-extracts"]], inputs: { record: "record", limitLinesDisplayed: "limitLinesDisplayed", showLinesExpander: "showLinesExpander", showTextAlways: "showTextAlways", showLongExtracts: "showLongExtracts", hideDate: "hideDate", maxLongExtracts: "maxLongExtracts", dateFormat: "dateFormat" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "class", 4, "ngIf"], ["class", "sq-text", "href", "#", 3, "click", 4, "ngIf"], ["class", "extracts-date", 4, "ngIf"], [1, "extracts-text", 3, "innerHTML"], [1, "extracts-date"], [3, "innerHTML", 4, "ngFor", "ngForOf"], [3, "innerHTML"], ["href", "#", 1, "sq-text", 3, "click"], [3, "collapsed"]], template: function ResultExtracts_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, ResultExtracts_ng_container_0_Template, 4, 3, "ng-container", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.text || ctx.longExtracts);
    } }, directives: [i1.NgIf, i1.NgForOf, i2.CollapseButton], pipes: [i3.DatePipe], styles: ["p[_ngcontent-%COMP%], ul[_ngcontent-%COMP%] {\n    margin: 0;\n    color: #676767;\n    font-size: 0.9em;\n}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ResultExtracts, [{
        type: Component,
        args: [{
                selector: "sq-result-extracts",
                templateUrl: "./result-extracts.html",
                styles: [`
p, ul {
    margin: 0;
    color: #676767;
    font-size: 0.9em;
}
    `]
            }]
    }], null, { record: [{
            type: Input
        }], limitLinesDisplayed: [{
            type: Input
        }], showLinesExpander: [{
            type: Input
        }], showTextAlways: [{
            type: Input
        }], showLongExtracts: [{
            type: Input
        }], hideDate: [{
            type: Input
        }], maxLongExtracts: [{
            type: Input
        }], dateFormat: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LWV4dHJhY3RzLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvcmVzdWx0LyIsInNvdXJjZXMiOlsicmVzdWx0LWV4dHJhY3RzL3Jlc3VsdC1leHRyYWN0cy50cyIsInJlc3VsdC1leHRyYWN0cy9yZXN1bHQtZXh0cmFjdHMuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBMkIsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7SUNDakMsK0JBQWlFO0lBQUEsWUFBOEQ7O0lBQUEsaUJBQU87OztJQUFyRSxlQUE4RDtJQUE5RCw4SEFBOEQ7OztJQURuSSx5QkFDSTtJQUFBLG9GQUFzSTtJQUN0SSwwQkFBc0Q7SUFDMUQsaUJBQUk7OztJQUhxQiwrREFBaUM7SUFDL0MsZUFBa0M7SUFBbEMsaUVBQWtDO0lBQ2IsZUFBa0I7SUFBbEIsMERBQWtCOzs7SUFHOUMseUJBQXdGO0lBQUEsWUFBdUM7O0lBQUEsaUJBQUk7OztJQUEzRiw2RUFBK0M7SUFBQyxlQUF1QztJQUF2QyxxRkFBdUM7OztJQUUzSCx3QkFBb0U7OztJQUEzQix5REFBcUI7OztJQURsRSwwQkFDSTtJQUFBLGdHQUFvRTtJQUN4RSxpQkFBSzs7O0lBRm9CLCtEQUFpQztJQUM5QixlQUFlO0lBQWYsNkNBQWU7OztJQUgvQyw2QkFDSTtJQUFBLHlGQUFtSTtJQUNuSSwyRkFFSztJQUNULDBCQUFlOzs7SUFKUCxlQUFrQztJQUFsQyxpRUFBa0M7SUFDakMsZUFBa0I7SUFBbEIsMENBQWtCOzs7O0lBSTNCLDRCQUNJO0lBRGtELDJNQUErQjtJQUNqRix3Q0FBaUU7SUFDckUsaUJBQUk7OztJQURvQixlQUF1QjtJQUF2Qiw0Q0FBdUI7OztJQVpuRCw2QkFDSTtJQUFBLDBFQUdJO0lBQ0osZ0dBS2U7SUFDZiwwRUFFSTtJQUNSLDBC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Qzs7NEVBMURRLGNBQWM7bURBQWQsY0FBYztRQ2YzQixpRkFjZTs7UUFkQSxtREFBMEI7O2tERGU1QixjQUFjO2NBWDFCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixXQUFXLEVBQUUsd0JBQXdCO2dCQUNyQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7O0tBTVIsQ0FBQzthQUNMO2dCQUVZLE1BQU07a0JBQWQsS0FBSztZQUNHLG1CQUFtQjtrQkFBM0IsS0FBSztZQUNHLGlCQUFpQjtrQkFBekIsS0FBSztZQUNHLGNBQWM7a0JBQXRCLEtBQUs7WUFDRyxnQkFBZ0I7a0JBQXhCLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLO1lBQ0csZUFBZTtrQkFBdkIsS0FBSztZQUNHLFVBQVU7a0JBQWxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlc30gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7UmVjb3JkfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtcmVzdWx0LWV4dHJhY3RzXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9yZXN1bHQtZXh0cmFjdHMuaHRtbFwiLFxuICAgIHN0eWxlczogW2BcbnAsIHVsIHtcbiAgICBtYXJnaW46IDA7XG4gICAgY29sb3I6ICM2NzY3Njc7XG4gICAgZm9udC1zaXplOiAwLjllbTtcbn1cbiAgICBgXVxufSlcbmV4cG9ydCBjbGFzcyBSZXN1bHRFeHRyYWN0cyBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgcmVjb3JkOiBSZWNvcmQ7XG4gICAgQElucHV0KCkgbGltaXRMaW5lc0Rpc3BsYXllZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBzaG93TGluZXNFeHBhbmRlcjogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBzaG93VGV4dEFsd2F5czogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBzaG93TG9uZ0V4dHJhY3RzOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGhpZGVEYXRlOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIG1heExvbmdFeHRyYWN0czogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGRhdGVGb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge3llYXI6ICdudW1lcmljJywgbW9udGg6ICdzaG9ydCcsIGRheTogJ251bWVyaWMnfTtcbiAgICBjb2xsYXBzZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHRleHQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBsb25nRXh0cmFjdHM6IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xuICAgIGV4dHJhY3RzQ2xhc3M6IHN0cmluZztcblxuICAgIHNldHVwKCkge1xuICAgICAgICB0aGlzLnRleHQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubG9uZ0V4dHJhY3RzID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAodGhpcy5zaG93VGV4dEFsd2F5cykge1xuICAgICAgICAgICAgdGhpcy50ZXh0ID0gVXRpbHMuZW5jb2RlSFRNTCh0aGlzLnJlY29yZC50ZXh0KTtcbiAgICAgICAgICAgIHRoaXMuZXh0cmFjdHNDbGFzcyA9IFwic3EtdGV4dC1leHRyYWN0c1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd0xvbmdFeHRyYWN0cyAmJiAodGhpcy5yZWNvcmRbXCJleHRyYWN0c1wiXSB8fCB0aGlzLnJlY29yZFtcImV4dHJhY3RzcGVycGFydG5hbWVcIl0gKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9uZ0V4dHJhY3RzID0gW107XG4gICAgICAgICAgICAgICAgLy8gZXh0cmFjdHNwZXJwYXJ0bmFtZSBpcyBhIGNvbXBsZXggc3RydWN0dXJlIHdoZXJlIGV4dHJhY3RzIGFyZSBzdG9yZWQgaW4gYW4gb2JqZWN0OiBcImhpZ2hsaWdodC5kYXRhXCJcbiAgICAgICAgICAgICAgICAvLyBpbiBhIGNzdiBmaWVsZCAoJzsnIHNlcGFyYXRvcilcbiAgICAgICAgICAgICAgICBsZXQgcmVjb3JkRXh0cmFjdHMgPSB0aGlzLnJlY29yZFtcImV4dHJhY3RzXCJdIHx8IHRoaXMucmVjb3JkW1wiZXh0cmFjdHNwZXJwYXJ0bmFtZVwiXS5oaWdobGlnaHRbMF0uZGF0YS5zcGxpdChcIjtcIik7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4TG9uZ0V4dHJhY3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlY29yZEV4dHJhY3RzID0gcmVjb3JkRXh0cmFjdHMuc2xpY2UoMCwgdGhpcy5tYXhMb25nRXh0cmFjdHMgKiAzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWNvcmRFeHRyYWN0cy5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvbmdFeHRyYWN0cy5wdXNoKHJlY29yZEV4dHJhY3RzW2ldLnJlcGxhY2UoL1xce2JcXH0vZywgXCI8c3Ryb25nPlwiKS5yZXBsYWNlKC9cXHtuYlxcfS9nLCBcIjwvc3Ryb25nPlwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZXh0cmFjdHNDbGFzcyA9IFwic3EtbG9uZy1leHRyYWN0c1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5yZWNvcmQucmVsZXZhbnRFeHRyYWN0cykge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dCA9IHRoaXMucmVjb3JkLnJlbGV2YW50RXh0cmFjdHM7XG4gICAgICAgICAgICAgICAgdGhpcy5leHRyYWN0c0NsYXNzID0gXCJzcS1yZWxldmFudC1leHRyYWN0c1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gVXRpbHMuZW5jb2RlSFRNTCh0aGlzLnJlY29yZC50ZXh0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmV4dHJhY3RzQ2xhc3MgPSBcInNxLXRleHQtZXh0cmFjdHNcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5saW1pdExpbmVzRGlzcGxheWVkIHx8ICF0aGlzLmNvbGxhcHNlZCkge1xuICAgICAgICAgICAgdGhpcy5leHRyYWN0c0NsYXNzICs9IFwiIHNxLXNob3ctYWxsXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuc2V0dXAoKTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZUNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmNvbGxhcHNlZCA9ICF0aGlzLmNvbGxhcHNlZDtcbiAgICAgICAgdGhpcy5zZXR1cCgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn0iLCI8bmctY29udGFpbmVyICpuZ0lmPVwidGV4dCB8fCBsb25nRXh0cmFjdHNcIj5cbiAgICA8cCAqbmdJZj1cIiFsb25nRXh0cmFjdHNcIiBjbGFzcz1cInt7ZXh0cmFjdHNDbGFzc319IHNxLXRleHRcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJyZWNvcmQubW9kaWZpZWQgJiYgIWhpZGVEYXRlXCIgY2xhc3M9XCJleHRyYWN0cy1kYXRlXCI+e3tyZWNvcmQubW9kaWZpZWQgfCBzcURhdGU6ZGF0ZUZvcm1hdH19e3shIXRleHQgPyAnIC0gJyA6ICcnfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZXh0cmFjdHMtdGV4dFwiIFtpbm5lckhUTUxdPVwidGV4dFwiPjwvc3Bhbj5cbiAgICA8L3A+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxvbmdFeHRyYWN0c1wiPlxuICAgICAgICA8cCAqbmdJZj1cInJlY29yZC5tb2RpZmllZCAmJiAhaGlkZURhdGVcIiBjbGFzcz1cInt7ZXh0cmFjdHNDbGFzc319IGV4dHJhY3RzLWRhdGUgc3EtdGV4dFwiPnt7cmVjb3JkLm1vZGlmaWVkIHwgc3FEYXRlOmRhdGVGb3JtYXR9fTwvcD5cbiAgICAgICAgPHVsICpuZ0lmPVwibG9uZ0V4dHJhY3RzXCIgY2xhc3M9XCJ7e2V4dHJhY3RzQ2xhc3N9fSBzcS10ZXh0XCI+XG4gICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGV4dHJhY3Qgb2YgbG9uZ0V4dHJhY3RzXCIgW2lubmVySFRNTF09XCJleHRyYWN0XCI+PC9saT5cbiAgICAgICAgPC91bD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8YSAqbmdJZj1cInNob3dMaW5lc0V4cGFuZGVyXCIgY2xhc3M9XCJzcS10ZXh0XCIgaHJlZj1cIiNcIiAoY2xpY2spPVwiY29sbGFwc2VDbGljaygkZXZlbnQpXCI+XG4gICAgICAgIDxzcS1jb2xsYXBzZS1idXR0b24gW2NvbGxhcHNlZF09XCJjb2xsYXBzZWRcIj48L3NxLWNvbGxhcHNlLWJ1dHRvbj5cbiAgICA8L2E+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==