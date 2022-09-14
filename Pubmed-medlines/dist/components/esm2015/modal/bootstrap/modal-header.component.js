import { Component, Input, HostBinding } from "@angular/core";
import { ModalService } from "@sinequa/core/modal";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/modal";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/core/intl";
function BsModalHeader_h5_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h5", 3);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.title));
} }
const _c0 = ["*"];
export class BsModalHeader {
    constructor(modalRef, injector) {
        this.modalRef = modalRef;
        this.injector = injector;
    }
    // Avoid circular reference (via Confirm)
    get modalService() {
        return this.injector.get(ModalService);
    }
    cancel() {
        this.modalRef.close(-2 /* Cancel */);
    }
}
BsModalHeader.ɵfac = function BsModalHeader_Factory(t) { return new (t || BsModalHeader)(i0.ɵɵdirectiveInject(i1.ModalRef), i0.ɵɵdirectiveInject(i0.Injector)); };
BsModalHeader.ɵcmp = i0.ɵɵdefineComponent({ type: BsModalHeader, selectors: [["sq-modal-header"]], hostVars: 2, hostBindings: function BsModalHeader_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("sq-modal-header", true);
    } }, inputs: { title: "title" }, ngContentSelectors: _c0, decls: 5, vars: 1, consts: [[1, "modal-header"], ["class", "modal-title", 4, "ngIf"], ["type", "button", "data-dismiss", "modal", "aria-hidden", "true", 1, "close", 3, "click"], [1, "modal-title"]], template: function BsModalHeader_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, BsModalHeader_h5_1_Template, 3, 3, "h5", 1);
        i0.ɵɵprojection(2);
        i0.ɵɵelementStart(3, "button", 2);
        i0.ɵɵlistener("click", function BsModalHeader_Template_button_click_3_listener() { return ctx.cancel(); });
        i0.ɵɵtext(4, "\u00D7");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.title);
    } }, directives: [i2.NgIf], pipes: [i3.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsModalHeader, [{
        type: Component,
        args: [{
                selector: "sq-modal-header",
                templateUrl: "./modal-header.component.html"
            }]
    }], function () { return [{ type: i1.ModalRef }, { type: i0.Injector }]; }, { title: [{
            type: Input
        }], true: [{
            type: HostBinding,
            args: ["class.sq-modal-header"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL21vZGFsLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL21vZGFsLWhlYWRlci5jb21wb25lbnQudHMiLCJib290c3RyYXAvbW9kYWwtaGVhZGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBVyxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUMsWUFBWSxFQUF3QixNQUFNLHFCQUFxQixDQUFDOzs7Ozs7SUNBcEUsNkJBQXNDO0lBQUEsWUFBcUI7O0lBQUEsaUJBQUs7OztJQUExQixlQUFxQjtJQUFyQix3REFBcUI7OztBRE0vRCxNQUFNLE9BQU8sYUFBYTtJQUl0QixZQUNjLFFBQWtCLEVBQ2xCLFFBQWtCO1FBRGxCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUNoQyxDQUFDO0lBRUQseUNBQXlDO0lBQ3pDLElBQUksWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssaUJBQW9CLENBQUM7SUFDNUMsQ0FBQzs7MEVBaEJRLGFBQWE7a0RBQWIsYUFBYTs7OztRQ1AxQiw4QkFDSTtRQUFBLDREQUFnRTtRQUNoRSxrQkFBeUI7UUFDekIsaUNBQStGO1FBQTNELDBGQUFTLFlBQVEsSUFBQztRQUF5QyxzQkFBTztRQUFBLGlCQUFTO1FBQ25ILGlCQUFNOztRQUhHLGVBQVc7UUFBWCxnQ0FBVzs7a0RETVAsYUFBYTtjQUp6QixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsV0FBVyxFQUFFLCtCQUErQjthQUMvQztrRkFFWSxLQUFLO2tCQUFiLEtBQUs7WUFDZ0MsSUFBSTtrQkFBekMsV0FBVzttQkFBQyx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIEhvc3RCaW5kaW5nLCBJbmplY3Rvcn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7TW9kYWxTZXJ2aWNlLCBNb2RhbFJlc3VsdCwgTW9kYWxSZWZ9IGZyb20gXCJAc2luZXF1YS9jb3JlL21vZGFsXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLW1vZGFsLWhlYWRlclwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbW9kYWwtaGVhZGVyLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQnNNb2RhbEhlYWRlciB7XG4gICAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5zcS1tb2RhbC1oZWFkZXJcIikgdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgbW9kYWxSZWY6IE1vZGFsUmVmLFxuICAgICAgICBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgY2lyY3VsYXIgcmVmZXJlbmNlICh2aWEgQ29uZmlybSlcbiAgICBnZXQgbW9kYWxTZXJ2aWNlKCk6IE1vZGFsU2VydmljZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluamVjdG9yLmdldChNb2RhbFNlcnZpY2UpO1xuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5tb2RhbFJlZi5jbG9zZShNb2RhbFJlc3VsdC5DYW5jZWwpO1xuICAgIH1cbn0iLCI8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgPGg1ICpuZ0lmPVwidGl0bGVcIiBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+e3t0aXRsZSB8IHNxTWVzc2FnZX19PC9oNT5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIChjbGljayk9XCJjYW5jZWwoKVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvYnV0dG9uPlxuPC9kaXY+XG4iXX0=