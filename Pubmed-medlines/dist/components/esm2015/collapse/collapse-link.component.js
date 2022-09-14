import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "./collapse-button.component";
import * as i2 from "@sinequa/core/intl";
export class CollapseLink {
    constructor() {
        this.title = "";
        this.icon = "";
        this.text = "";
        this.stateChange = new EventEmitter();
        this.collapsed = true;
    }
    click() {
        this.collapsed = !this.collapsed;
        this.stateChange.emit({ group: this.group, collapsed: this.collapsed });
        return false; // Prevent following href
    }
}
CollapseLink.ɵfac = function CollapseLink_Factory(t) { return new (t || CollapseLink)(); };
CollapseLink.ɵcmp = i0.ɵɵdefineComponent({ type: CollapseLink, selectors: [["sq-collapse-link"]], inputs: { title: "title", icon: "icon", text: "text", group: "group" }, outputs: { stateChange: "stateChange" }, decls: 3, vars: 6, consts: [["href", "#", 3, "title", "click"], [3, "collapsed", "icon", "text"]], template: function CollapseLink_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "a", 0);
        i0.ɵɵlistener("click", function CollapseLink_Template_a_click_0_listener() { return ctx.click(); });
        i0.ɵɵpipe(1, "sqMessage");
        i0.ɵɵelement(2, "sq-collapse-button", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 4, ctx.title));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("collapsed", ctx.collapsed)("icon", ctx.icon)("text", ctx.text);
    } }, directives: [i1.CollapseButton], pipes: [i2.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CollapseLink, [{
        type: Component,
        args: [{
                selector: "sq-collapse-link",
                templateUrl: "./collapse-link.component.html"
            }]
    }], function () { return []; }, { title: [{
            type: Input
        }], icon: [{
            type: Input
        }], text: [{
            type: Input
        }], group: [{
            type: Input
        }], stateChange: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UtbGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9jb2xsYXBzZS8iLCJzb3VyY2VzIjpbImNvbGxhcHNlLWxpbmsuY29tcG9uZW50LnRzIiwiY29sbGFwc2UtbGluay5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7O0FBV3JFLE1BQU0sT0FBTyxZQUFZO0lBUXJCO1FBUFMsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLFNBQUksR0FBVyxFQUFFLENBQUM7UUFFakIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBdUIsQ0FBQztRQUNoRSxjQUFTLEdBQVksSUFBSSxDQUFDO0lBRzFCLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUM7UUFDdEUsT0FBTyxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7SUFDM0MsQ0FBQzs7d0VBZlEsWUFBWTtpREFBWixZQUFZO1FDWHpCLDRCQUNJO1FBRHNDLG9GQUFTLFdBQU8sSUFBQzs7UUFDdkQsd0NBQTZGO1FBQ2pHLGlCQUFJOztRQUZRLGtFQUE2QjtRQUNqQixlQUF1QjtRQUF2Qix5Q0FBdUIsa0JBQUEsa0JBQUE7O2tERFVsQyxZQUFZO2NBSnhCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixXQUFXLEVBQUUsZ0NBQWdDO2FBQ2hEO3NDQUVZLEtBQUs7a0JBQWIsS0FBSztZQUNHLElBQUk7a0JBQVosS0FBSztZQUNHLElBQUk7a0JBQVosS0FBSztZQUNHLEtBQUs7a0JBQWIsS0FBSztZQUNJLFdBQVc7a0JBQXBCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbGxhcHNlU3RhdGVDaGFuZ2Uge1xuICAgIGdyb3VwOiBzdHJpbmc7XG4gICAgY29sbGFwc2VkOiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1jb2xsYXBzZS1saW5rXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9jb2xsYXBzZS1saW5rLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQ29sbGFwc2VMaW5rIHtcbiAgICBASW5wdXQoKSB0aXRsZTogc3RyaW5nID0gXCJcIjtcbiAgICBASW5wdXQoKSBpY29uOiBzdHJpbmcgPSBcIlwiO1xuICAgIEBJbnB1dCgpIHRleHQ6IHN0cmluZyA9IFwiXCI7XG4gICAgQElucHV0KCkgZ3JvdXA6IHN0cmluZztcbiAgICBAT3V0cHV0KCkgc3RhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENvbGxhcHNlU3RhdGVDaGFuZ2U+KCk7XG4gICAgY29sbGFwc2VkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGNsaWNrKCkge1xuICAgICAgICB0aGlzLmNvbGxhcHNlZCA9ICF0aGlzLmNvbGxhcHNlZDtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZS5lbWl0KHtncm91cDogdGhpcy5ncm91cCwgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlZH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIFByZXZlbnQgZm9sbG93aW5nIGhyZWZcbiAgICB9XG59IiwiPGEgaHJlZj1cIiNcIiB0aXRsZT1cInt7dGl0bGUgfCBzcU1lc3NhZ2V9fVwiIChjbGljayk9XCJjbGljaygpXCI+XHJcbiAgICA8c3EtY29sbGFwc2UtYnV0dG9uIFtjb2xsYXBzZWRdPVwiY29sbGFwc2VkXCIgW2ljb25dPVwiaWNvblwiIFt0ZXh0XT1cInRleHRcIj48L3NxLWNvbGxhcHNlLWJ1dHRvbj5cclxuPC9hPiJdfQ==