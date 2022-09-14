import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../search.service";
import * as i2 from "@angular/common";
function BsLoadingBar_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelement(1, "div", 2);
    i0.ɵɵelement(2, "div", 3);
    i0.ɵɵelement(3, "div", 4);
    i0.ɵɵelementEnd();
} }
// From https://stackoverflow.com/questions/34773266/how-to-write-css-keyframes-to-indeterminate-material-design-progress-bar
export class BsLoadingBar {
    constructor(searchService) {
        this.searchService = searchService;
    }
    isActive() {
        return this.active === undefined ? this.searchService.searchActive : this.active;
    }
}
BsLoadingBar.ɵfac = function BsLoadingBar_Factory(t) { return new (t || BsLoadingBar)(i0.ɵɵdirectiveInject(i1.SearchService)); };
BsLoadingBar.ɵcmp = i0.ɵɵdefineComponent({ type: BsLoadingBar, selectors: [["sq-loading-bar"]], inputs: { active: "active" }, decls: 1, vars: 1, consts: [["class", "slider", 4, "ngIf"], [1, "slider"], [1, "line"], [1, "subline", "inc"], [1, "subline", "dec"]], template: function BsLoadingBar_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsLoadingBar_div_0_Template, 4, 0, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.isActive());
    } }, directives: [i2.NgIf], styles: [".slider[_ngcontent-%COMP%]{\n  position:absolute;\n  width:100%;\n  height:3px;\n  overflow: hidden;\n  z-index: 3;\n}\n\n.line[_ngcontent-%COMP%]{\n  position:absolute;\n  opacity: 0.4;\n  background:#4a8df8;\n  width:150%;\n  height:5px;\n}\n\n.subline[_ngcontent-%COMP%]{\n  position:absolute;\n  background:#4a8df8;\n  height:5px;\n}\n.inc[_ngcontent-%COMP%]{\nanimation: increase 1s infinite;\n}\n.dec[_ngcontent-%COMP%]{\nanimation: decrease 1s 0.25s infinite;\n}\n\n@keyframes increase {\n from { left: -5%; width: 5%; }\n to { left: 130%; width: 100%;}\n}\n@keyframes decrease {\n from { left: -80%; width: 80%; }\n to { left: 110%; width: 10%;}\n}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsLoadingBar, [{
        type: Component,
        args: [{
                selector: 'sq-loading-bar',
                template: `
<div class="slider" *ngIf="isActive()">
	<div class="line"></div>
  <div class="subline inc"></div>
  <div class="subline dec"></div>
</div>
    `,
                styles: [`

.slider{
  position:absolute;
  width:100%;
  height:3px;
  overflow: hidden;
  z-index: 3;
}

.line{
  position:absolute;
  opacity: 0.4;
  background:#4a8df8;
  width:150%;
  height:5px;
}

.subline{
  position:absolute;
  background:#4a8df8;
  height:5px;
}
.inc{
animation: increase 1s infinite;
}
.dec{
animation: decrease 1s 0.25s infinite;
}

@keyframes increase {
 from { left: -5%; width: 5%; }
 to { left: 130%; width: 100%;}
}
@keyframes decrease {
 from { left: -80%; width: 80%; }
 to { left: 110%; width: 10%;}
}
    `]
            }]
    }], function () { return [{ type: i1.SearchService }]; }, { active: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1iYXIuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zZWFyY2gvIiwic291cmNlcyI6WyJib290c3RyYXAvbG9hZGluZy1iYXIvbG9hZGluZy1iYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7O0lBUS9DLDhCQUNDO0lBQUEseUJBQXdCO0lBQ3ZCLHlCQUErQjtJQUMvQix5QkFBK0I7SUFDakMsaUJBQU07O0FBVE4sNkhBQTZIO0FBbUQ3SCxNQUFNLE9BQU8sWUFBWTtJQU92QixZQUNTLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQ2pDLENBQUM7SUFFTCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDbkYsQ0FBQzs7d0VBYlUsWUFBWTtpREFBWixZQUFZO1FBOUN6Qiw2REFJTTs7UUFKZSxxQ0FBZ0I7O2tEQThDeEIsWUFBWTtjQWpEeEIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7O0tBTVQ7Z0JBQ0QsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBc0NSLENBQUM7YUFDTDtnRUFNVSxNQUFNO2tCQUFkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTZWFyY2hTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VhcmNoLnNlcnZpY2VcIjtcblxuLy8gRnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDc3MzI2Ni9ob3ctdG8td3JpdGUtY3NzLWtleWZyYW1lcy10by1pbmRldGVybWluYXRlLW1hdGVyaWFsLWRlc2lnbi1wcm9ncmVzcy1iYXJcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdzcS1sb2FkaW5nLWJhcicsXG4gICAgdGVtcGxhdGU6IGBcbjxkaXYgY2xhc3M9XCJzbGlkZXJcIiAqbmdJZj1cImlzQWN0aXZlKClcIj5cblx0PGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInN1YmxpbmUgaW5jXCI+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzdWJsaW5lIGRlY1wiPjwvZGl2PlxuPC9kaXY+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtgXG5cbi5zbGlkZXJ7XG4gIHBvc2l0aW9uOmFic29sdXRlO1xuICB3aWR0aDoxMDAlO1xuICBoZWlnaHQ6M3B4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB6LWluZGV4OiAzO1xufVxuXG4ubGluZXtcbiAgcG9zaXRpb246YWJzb2x1dGU7XG4gIG9wYWNpdHk6IDAuNDtcbiAgYmFja2dyb3VuZDojNGE4ZGY4O1xuICB3aWR0aDoxNTAlO1xuICBoZWlnaHQ6NXB4O1xufVxuXG4uc3VibGluZXtcbiAgcG9zaXRpb246YWJzb2x1dGU7XG4gIGJhY2tncm91bmQ6IzRhOGRmODtcbiAgaGVpZ2h0OjVweDtcbn1cbi5pbmN7XG5hbmltYXRpb246IGluY3JlYXNlIDFzIGluZmluaXRlO1xufVxuLmRlY3tcbmFuaW1hdGlvbjogZGVjcmVhc2UgMXMgMC4yNXMgaW5maW5pdGU7XG59XG5cbkBrZXlmcmFtZXMgaW5jcmVhc2Uge1xuIGZyb20geyBsZWZ0OiAtNSU7IHdpZHRoOiA1JTsgfVxuIHRvIHsgbGVmdDogMTMwJTsgd2lkdGg6IDEwMCU7fVxufVxuQGtleWZyYW1lcyBkZWNyZWFzZSB7XG4gZnJvbSB7IGxlZnQ6IC04MCU7IHdpZHRoOiA4MCU7IH1cbiB0byB7IGxlZnQ6IDExMCU7IHdpZHRoOiAxMCU7fVxufVxuICAgIGBdXG59KVxuZXhwb3J0IGNsYXNzIEJzTG9hZGluZ0JhciB7XG4gIC8qKlxuICAgKiBhY3RpdmUgY2FuIHByb3ZpZGVkIGFzIGEgYm9vbGVhbiB0byBhY3RpdmF0ZSB0aGUgbG9hZGluZyBiYXIuXG4gICAqIElmIGl0IGlzIG5vdCBwcm92aWRlZCwgdGhlIFNlYXJjaFNlcnZpY2Ugc2VhcmNoQWN0aXZlIHByb3BlcnR5IGlzIHVzZWQuXG4gICAqL1xuICBASW5wdXQoKSBhY3RpdmU/OiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlXG4gICkgeyB9XG5cbiAgaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlID09PSB1bmRlZmluZWQgPyB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoQWN0aXZlIDogdGhpcy5hY3RpdmU7XG4gIH1cbn1cbiJdfQ==