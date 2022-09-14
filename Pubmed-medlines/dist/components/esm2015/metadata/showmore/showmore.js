import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function Showmore_span_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r0.shortQuestion, i0.ɵɵsanitizeHtml);
} }
function Showmore_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 2);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r1.longQuestion, i0.ɵɵsanitizeHtml);
} }
function Showmore_span_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 3);
    i0.ɵɵlistener("click", function Showmore_span_2_Template_span_click_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.showMore($event); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.isShowMore ? "show less" : "show more", "");
} }
export class Showmore {
    constructor() {
        this.isShowMore = false;
        this.isBigQuestion = false;
    }
    ngOnInit() {
        this.longQuestion = this.question;
        // this.searchTextArray.forEach(element => {
        //     const re = new RegExp(element, "gi");
        //     this.longQuestion = this.longQuestion.replace(re,
        //         '<span class="highlighted">' + element + "</span>"
        //     );
        // });
        if (this.question.length > 300) {
            this.isBigQuestion = true;
            this.shortQuestion = this.question.substring(0, 400) + "...";
            // this.searchTextArray.forEach(element => {
            //     const re = new RegExp(element, "gi");
            //     this.shortQuestion = this.shortQuestion.replace(re, '<span class="highlighted">' + element + "</span>");
            // });
            this.display = this.shortQuestion;
        }
        else {
            this.display = this.longQuestion;
        }
    }
    showMore(event) {
        event.stopPropagation();
        this.isShowMore = !this.isShowMore;
        if (this.isShowMore)
            this.display = this.longQuestion;
        else
            this.display = this.shortQuestion;
    }
}
Showmore.ɵfac = function Showmore_Factory(t) { return new (t || Showmore)(); };
Showmore.ɵcmp = i0.ɵɵdefineComponent({ type: Showmore, selectors: [["sq-showmore"]], inputs: { question: "question" }, decls: 3, vars: 3, consts: [[3, "innerHTML", 4, "ngIf"], ["class", "showMore", 3, "click", 4, "ngIf"], [3, "innerHTML"], [1, "showMore", 3, "click"]], template: function Showmore_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, Showmore_span_0_Template, 1, 1, "span", 0);
        i0.ɵɵtemplate(1, Showmore_span_1_Template, 1, 1, "span", 0);
        i0.ɵɵtemplate(2, Showmore_span_2_Template, 2, 1, "span", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !ctx.isShowMore);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isShowMore || !ctx.isBigQuestion);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isBigQuestion);
    } }, directives: [i1.NgIf], styles: [".showMore[_ngcontent-%COMP%]{color:#00f;cursor:pointer}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Showmore, [{
        type: Component,
        args: [{
                selector: 'sq-showmore',
                templateUrl: './showmore.html',
                styleUrls: ['./showmore.scss'],
            }]
    }], function () { return []; }, { question: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvd21vcmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9tZXRhZGF0YS8iLCJzb3VyY2VzIjpbInNob3dtb3JlL3Nob3dtb3JlLnRzIiwic2hvd21vcmUvc2hvd21vcmUuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztJQ0F6RCwwQkFBNkQ7OztJQUF2RCxtRUFBMkI7OztJQUVqQywwQkFBOEU7OztJQUF4RSxrRUFBMEI7Ozs7SUFFaEMsK0JBQ0U7SUFEMkMscUxBQTBCO0lBQ3JFLFlBQTRDO0lBQUEsaUJBQU87OztJQUFuRCxlQUE0QztJQUE1Qyw2RUFBNEM7O0FERTlDLE1BQU0sT0FBTyxRQUFRO0lBU2pCO1FBSkEsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixrQkFBYSxHQUFHLEtBQUssQ0FBQztJQUdOLENBQUM7SUFFakIsUUFBUTtRQUNKLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNsQyw0Q0FBNEM7UUFDNUMsNENBQTRDO1FBQzVDLHdEQUF3RDtRQUN4RCw2REFBNkQ7UUFDN0QsU0FBUztRQUNULE1BQU07UUFDTixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDN0QsNENBQTRDO1lBQzVDLDRDQUE0QztZQUM1QywrR0FBK0c7WUFDL0csTUFBTTtZQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUNyQzthQUFNO1lBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBRXBDO0lBQ0wsQ0FBQztJQUNELFFBQVEsQ0FBQyxLQUFZO1FBQ2pCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzVELElBQUksSUFBSSxDQUFDLFVBQVU7WUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7O1lBQU0sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQ2xHLENBQUM7O2dFQW5DUSxRQUFROzZDQUFSLFFBQVE7UUNQckIsMkRBQTZEO1FBRTdELDJEQUE4RTtRQUU5RSwyREFDcUQ7O1FBTGxCLHNDQUFpQjtRQUVsQixlQUFrQztRQUFsQywyREFBa0M7UUFFNUMsZUFBbUI7UUFBbkIsd0NBQW1COztrRERHOUIsUUFBUTtjQUxwQixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFdBQVcsRUFBRSxpQkFBaUI7Z0JBQzlCLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO2FBQ2pDO3NDQUVZLFFBQVE7a0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdzcS1zaG93bW9yZScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2hvd21vcmUuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9zaG93bW9yZS5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaG93bW9yZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSBxdWVzdGlvbjogc3RyaW5nO1xyXG4gICAgLy8gQElucHV0KCkgc2VhcmNoVGV4dEFycmF5OiBzdHJpbmdbXTtcclxuICAgIHNob3J0UXVlc3Rpb246IHN0cmluZztcclxuICAgIGxvbmdRdWVzdGlvbjogc3RyaW5nO1xyXG4gICAgaXNTaG93TW9yZSA9IGZhbHNlO1xyXG4gICAgaXNCaWdRdWVzdGlvbiA9IGZhbHNlO1xyXG4gICAgZGlzcGxheTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb25nUXVlc3Rpb24gPSB0aGlzLnF1ZXN0aW9uO1xyXG4gICAgICAgIC8vIHRoaXMuc2VhcmNoVGV4dEFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IHJlID0gbmV3IFJlZ0V4cChlbGVtZW50LCBcImdpXCIpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmxvbmdRdWVzdGlvbiA9IHRoaXMubG9uZ1F1ZXN0aW9uLnJlcGxhY2UocmUsXHJcbiAgICAgICAgLy8gICAgICAgICAnPHNwYW4gY2xhc3M9XCJoaWdobGlnaHRlZFwiPicgKyBlbGVtZW50ICsgXCI8L3NwYW4+XCJcclxuICAgICAgICAvLyAgICAgKTtcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICBpZiAodGhpcy5xdWVzdGlvbi5sZW5ndGggPiAzMDApIHtcclxuICAgICAgICAgICAgdGhpcy5pc0JpZ1F1ZXN0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zaG9ydFF1ZXN0aW9uID0gdGhpcy5xdWVzdGlvbi5zdWJzdHJpbmcoMCwgNDAwKSArIFwiLi4uXCI7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2VhcmNoVGV4dEFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICBjb25zdCByZSA9IG5ldyBSZWdFeHAoZWxlbWVudCwgXCJnaVwiKTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuc2hvcnRRdWVzdGlvbiA9IHRoaXMuc2hvcnRRdWVzdGlvbi5yZXBsYWNlKHJlLCAnPHNwYW4gY2xhc3M9XCJoaWdobGlnaHRlZFwiPicgKyBlbGVtZW50ICsgXCI8L3NwYW4+XCIpO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID0gdGhpcy5zaG9ydFF1ZXN0aW9uO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSA9IHRoaXMubG9uZ1F1ZXN0aW9uO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzaG93TW9yZShldmVudDogRXZlbnQpIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgdGhpcy5pc1Nob3dNb3JlID0gIXRoaXMuaXNTaG93TW9yZTtcclxuICAgICAgICBpZiAodGhpcy5pc1Nob3dNb3JlKSB0aGlzLmRpc3BsYXkgPSB0aGlzLmxvbmdRdWVzdGlvbjsgZWxzZSB0aGlzLmRpc3BsYXkgPSB0aGlzLnNob3J0UXVlc3Rpb247XHJcbiAgICB9XHJcbn0iLCI8c3BhbiBbaW5uZXJIVE1MXT1cInNob3J0UXVlc3Rpb25cIiAqbmdJZj1cIiFpc1Nob3dNb3JlXCI+PC9zcGFuPlxyXG5cclxuPHNwYW4gW2lubmVySFRNTF09XCJsb25nUXVlc3Rpb25cIiAqbmdJZj1cImlzU2hvd01vcmUgfHwgIWlzQmlnUXVlc3Rpb25cIj4gPC9zcGFuPlxyXG5cclxuPHNwYW4gY2xhc3M9XCJzaG93TW9yZVwiICpuZ0lmPVwiaXNCaWdRdWVzdGlvblwiIChjbGljayk9XCJzaG93TW9yZSgkZXZlbnQpXCI+XHJcbiAge3sgaXNTaG93TW9yZSA/ICdzaG93IGxlc3MnIDogJ3Nob3cgbW9yZScgfX08L3NwYW4+Il19