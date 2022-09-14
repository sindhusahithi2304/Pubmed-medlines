import { Component, Input, Output, EventEmitter } from "@angular/core";
import { trigger, state, animate, transition, style } from '@angular/animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@sinequa/core/intl";
function CollapseButton_ng_container_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function CollapseButton_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "span");
    i0.ɵɵtemplate(2, CollapseButton_ng_container_0_ng_container_2_Template, 1, 0, "ng-container", 0);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap(ctx_r0.icon);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !!ctx_r0.text);
} }
function CollapseButton_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 3);
    i0.ɵɵlistener("click", function CollapseButton_span_1_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.toggleCollapsed(); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.text));
} }
export function collapseButtonAnimations(timings) {
    return [
        trigger('toggleCollapsed', [
            state('0', style({ transform: 'rotate(0deg)' })),
            state('1', style({ transform: 'rotate(-180deg)' })),
            transition('0 <=> 1', [
                animate(timings)
            ])
        ]),
    ];
}
export class CollapseButton {
    constructor() {
        this.state = new EventEmitter();
        this.collapsed = true;
    }
    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.state.emit(this.collapsed);
    }
}
CollapseButton.ɵfac = function CollapseButton_Factory(t) { return new (t || CollapseButton)(); };
CollapseButton.ɵcmp = i0.ɵɵdefineComponent({ type: CollapseButton, selectors: [["sq-collapse-button"]], inputs: { collapsed: "collapsed", icon: "icon", text: "text" }, outputs: { state: "state" }, decls: 4, vars: 6, consts: [[4, "ngIf"], [3, "click", 4, "ngIf"], ["role", "button", 1, "fas", "fa-chevron-up", "fa-fw", 3, "title", "click"], [3, "click"]], template: function CollapseButton_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CollapseButton_ng_container_0_Template, 3, 4, "ng-container", 0);
        i0.ɵɵtemplate(1, CollapseButton_span_1_Template, 3, 3, "span", 1);
        i0.ɵɵelementStart(2, "span", 2);
        i0.ɵɵlistener("click", function CollapseButton_Template_span_click_2_listener() { return ctx.toggleCollapsed(); });
        i0.ɵɵpipe(3, "sqMessage");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !!ctx.icon);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !!ctx.text);
        i0.ɵɵadvance(1);
        i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(3, 4, ctx.collapsed ? "msg#collapseButton.expand" : "msg#collapseButton.collapse"));
        i0.ɵɵproperty("@toggleCollapsed", ctx.collapsed);
    } }, directives: [i1.NgIf], pipes: [i2.MessagePipe], encapsulation: 2, data: { animation: collapseButtonAnimations(".15s ease-in-out") } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CollapseButton, [{
        type: Component,
        args: [{
                selector: "sq-collapse-button",
                templateUrl: "./collapse-button.component.html",
                animations: collapseButtonAnimations(".15s ease-in-out")
            }]
    }], function () { return []; }, { collapsed: [{
            type: Input
        }], icon: [{
            type: Input
        }], text: [{
            type: Input
        }], state: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UtYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2NvbGxhcHNlLyIsInNvdXJjZXMiOlsiY29sbGFwc2UtYnV0dG9uLmNvbXBvbmVudC50cyIsImNvbGxhcHNlLWJ1dHRvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUEyQixNQUFNLHFCQUFxQixDQUFDOzs7OztJQ0Q5Qyx3QkFBNkM7OztJQUF4Ryw2QkFBNkI7SUFBQSx1QkFBOEI7SUFBQSxnR0FBNkM7SUFBQSwwQkFBZTs7O0lBQXBGLGVBQWdCO0lBQWhCLDBCQUFnQjtJQUF1QixlQUFZO0lBQVosb0NBQVk7Ozs7SUFDbkYsK0JBQWlEO0lBQTVCLHNMQUEyQjtJQUFDLFlBQW9COztJQUFBLGlCQUFPOzs7SUFBM0IsZUFBb0I7SUFBcEIsdURBQW9COztBREV4RSxNQUFNLFVBQVUsd0JBQXdCLENBQUMsT0FBd0I7SUFDN0QsT0FBTztRQUNILE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTtZQUN2QixLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxjQUFjLEVBQUMsQ0FBQyxDQUFDO1lBQzlDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLGlCQUFpQixFQUFDLENBQUMsQ0FBQztZQUNqRCxVQUFVLENBQUMsU0FBUyxFQUFFO2dCQUNsQixPQUFPLENBQUMsT0FBTyxDQUFDO2FBQ25CLENBQUM7U0FDTCxDQUFDO0tBQ0wsQ0FBQztBQUNOLENBQUM7QUFPRCxNQUFNLE9BQU8sY0FBYztJQU12QjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs0RUFkUSxjQUFjO21EQUFkLGNBQWM7UUNwQjNCLGlGQUF1SDtRQUNwSCxpRUFBNEU7UUFDNUUsK0JBQWlOO1FBQTdKLHlGQUFTLHFCQUFpQixJQUFDOztRQUFrSSxpQkFBTzs7UUFGNU0saUNBQVk7UUFDakIsZUFBWTtRQUFaLGlDQUFZO1FBQzRGLGVBQWlHO1FBQWpHLG9JQUFpRztRQUFoSSxnREFBOEI7OEZEZ0JqRyx3QkFBd0IsQ0FBQyxrQkFBa0IsQ0FBQztrREFFL0MsY0FBYztjQUwxQixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsV0FBVyxFQUFFLGtDQUFrQztnQkFDL0MsVUFBVSxFQUFFLHdCQUF3QixDQUFDLGtCQUFrQixDQUFDO2FBQzNEO3NDQUVZLFNBQVM7a0JBQWpCLEtBQUs7WUFDRyxJQUFJO2tCQUFaLEtBQUs7WUFDRyxJQUFJO2tCQUFaLEtBQUs7WUFDSSxLQUFLO2tCQUFkLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHt0cmlnZ2VyLCBzdGF0ZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiwgc3R5bGUsIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsYXBzZUJ1dHRvbkFuaW1hdGlvbnModGltaW5nczogbnVtYmVyIHwgc3RyaW5nKTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhW10ge1xuICAgIHJldHVybiBbXG4gICAgICAgIHRyaWdnZXIoJ3RvZ2dsZUNvbGxhcHNlZCcsIFtcbiAgICAgICAgICAgIHN0YXRlKCcwJywgc3R5bGUoe3RyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKSd9KSksXG4gICAgICAgICAgICBzdGF0ZSgnMScsIHN0eWxlKHt0cmFuc2Zvcm06ICdyb3RhdGUoLTE4MGRlZyknfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignMCA8PT4gMScsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKHRpbWluZ3MpXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKSxcbiAgICBdO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1jb2xsYXBzZS1idXR0b25cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2NvbGxhcHNlLWJ1dHRvbi5jb21wb25lbnQuaHRtbFwiLFxuICAgIGFuaW1hdGlvbnM6IGNvbGxhcHNlQnV0dG9uQW5pbWF0aW9ucyhcIi4xNXMgZWFzZS1pbi1vdXRcIilcbn0pXG5leHBvcnQgY2xhc3MgQ29sbGFwc2VCdXR0b24ge1xuICAgIEBJbnB1dCgpIGNvbGxhcHNlZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBpY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdGV4dDogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBzdGF0ZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gICAgICAgIHRoaXMuY29sbGFwc2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0b2dnbGVDb2xsYXBzZWQoKSB7XG4gICAgICAgIHRoaXMuY29sbGFwc2VkID0gIXRoaXMuY29sbGFwc2VkO1xuICAgICAgICB0aGlzLnN0YXRlLmVtaXQodGhpcy5jb2xsYXBzZWQpO1xuICAgIH1cbn0iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiISFpY29uXCI+PHNwYW4gY2xhc3M9XCJ7e2ljb259fVwiPjwvc3Bhbj48bmctY29udGFpbmVyICpuZ0lmPVwiISF0ZXh0XCI+IDwvbmctY29udGFpbmVyPjwvbmctY29udGFpbmVyPjwhLS1cbi0tPjxzcGFuICpuZ0lmPVwiISF0ZXh0XCIgKGNsaWNrKT1cInRvZ2dsZUNvbGxhcHNlZCgpXCI+e3t0ZXh0IHwgc3FNZXNzYWdlfX08L3NwYW4+PCEtLVxuLS0+PHNwYW4gY2xhc3M9XCJmYXMgZmEtY2hldnJvbi11cCBmYS1md1wiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwidG9nZ2xlQ29sbGFwc2VkKClcIiBbQHRvZ2dsZUNvbGxhcHNlZF09XCJjb2xsYXBzZWRcIiB0aXRsZT1cInt7KGNvbGxhcHNlZCA/ICdtc2cjY29sbGFwc2VCdXR0b24uZXhwYW5kJyA6ICdtc2cjY29sbGFwc2VCdXR0b24uY29sbGFwc2UnKSB8IHNxTWVzc2FnZX19XCI+PC9zcGFuPiJdfQ==