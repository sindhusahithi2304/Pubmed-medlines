import { Component, Input, HostBinding, ViewEncapsulation } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/common";
import * as i3 from "./modal-header.component";
import * as i4 from "./modal-footer.component";
function BsModal_sq_modal_header_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "sq-modal-header", 5);
    i0.ɵɵprojection(1, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", ctx_r0.title);
} }
function BsModal_sq_modal_footer_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "sq-modal-footer", 6);
    i0.ɵɵprojection(1, 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("buttons", ctx_r1.buttons)("isProcessingState", ctx_r1.isProcessingState);
} }
const _c0 = ["*", [["", "header", ""]], [["", "footer", ""]]];
const _c1 = ["*", "[header]", "[footer]"];
export class BsModal {
    constructor() {
        this.showHeader = true;
        this.showFooter = true;
        this.isProcessingState = false;
    }
}
BsModal.ɵfac = function BsModal_Factory(t) { return new (t || BsModal)(); };
BsModal.ɵcmp = i0.ɵɵdefineComponent({ type: BsModal, selectors: [["sq-modal"]], hostVars: 2, hostBindings: function BsModal_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("sq-modal", true);
    } }, inputs: { title: "title", buttons: "buttons", showHeader: "showHeader", showFooter: "showFooter", isProcessingState: "isProcessingState" }, ngContentSelectors: _c1, decls: 6, vars: 3, consts: [["cdkTrapFocus", "", 1, "modal-dialog", 3, "cdkTrapFocusAutoCapture"], [1, "modal-content"], [3, "title", 4, "ngIf"], [1, "modal-body"], [3, "buttons", "isProcessingState", 4, "ngIf"], [3, "title"], [3, "buttons", "isProcessingState"]], template: function BsModal_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c0);
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵtemplate(2, BsModal_sq_modal_header_2_Template, 2, 1, "sq-modal-header", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵprojection(4);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(5, BsModal_sq_modal_footer_5_Template, 2, 2, "sq-modal-footer", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("cdkTrapFocusAutoCapture", true);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.showHeader);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.showFooter);
    } }, directives: [i1.CdkTrapFocus, i2.NgIf, i3.BsModalHeader, i4.BsModalFooter], styles: [".cdk-global-overlay-wrapper,.cdk-overlay-backdrop,.cdk-overlay-container{z-index:1040}.sq-modal-host{display:block;overflow:auto;pointer-events:auto}.sq-modal-pane{display:block;height:100%;padding:30px;pointer-events:none!important}.sq-modal-fullscreen *>form,.sq-modal-fullscreen .modal-content,.sq-modal-fullscreen .modal-dialog{height:100%}.sq-modal-fullscreen .modal-dialog{margin:0;max-width:none}"], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsModal, [{
        type: Component,
        args: [{
                selector: "sq-modal",
                templateUrl: "./modal.component.html",
                styleUrls: ["./modal.component.scss"],
                encapsulation: ViewEncapsulation.None
            }]
    }], null, { title: [{
            type: Input
        }], buttons: [{
            type: Input
        }], showHeader: [{
            type: Input
        }], showFooter: [{
            type: Input
        }], isProcessingState: [{
            type: Input
        }], true: [{
            type: HostBinding,
            args: ["class.sq-modal"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvbW9kYWwvIiwic291cmNlcyI6WyJib290c3RyYXAvbW9kYWwuY29tcG9uZW50LnRzIiwiYm9vdHN0cmFwL21vZGFsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7OztJQ0V2RSwwQ0FDSTtJQUFBLHFCQUEyQztJQUMvQyxpQkFBa0I7OztJQUZrQixvQ0FBZTs7O0lBTW5ELDBDQUNJO0lBQUEscUJBQTJDO0lBQy9DLGlCQUFrQjs7O0lBRmtCLHdDQUFtQiwrQ0FBQTs7OztBREMvRCxNQUFNLE9BQU8sT0FBTztJQU5wQjtRQVNhLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7S0FFdEM7OzhEQVBZLE9BQU87NENBQVAsT0FBTzs7OztRQ1RwQiw4QkFDSTtRQUFBLDhCQUNJO1FBQUEsZ0ZBRWtCO1FBQ2xCLDhCQUNJO1FBQUEsa0JBQXlCO1FBQzdCLGlCQUFNO1FBQ04sZ0ZBRWtCO1FBQ3RCLGlCQUFNO1FBQ1YsaUJBQU07O1FBWmlDLDhDQUFnQztRQUU3QyxlQUFnQjtRQUFoQixxQ0FBZ0I7UUFNaEIsZUFBZ0I7UUFBaEIscUNBQWdCOztrRERDN0IsT0FBTztjQU5uQixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFdBQVcsRUFBRSx3QkFBd0I7Z0JBQ3JDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO2dCQUNyQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN4QztnQkFFWSxLQUFLO2tCQUFiLEtBQUs7WUFDRyxPQUFPO2tCQUFmLEtBQUs7WUFDRyxVQUFVO2tCQUFsQixLQUFLO1lBQ0csVUFBVTtrQkFBbEIsS0FBSztZQUNHLGlCQUFpQjtrQkFBekIsS0FBSztZQUN5QixJQUFJO2tCQUFsQyxXQUFXO21CQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgSG9zdEJpbmRpbmcsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtNb2RhbEJ1dHRvbn0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbW9kYWxcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtbW9kYWxcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL21vZGFsLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL21vZGFsLmNvbXBvbmVudC5zY3NzXCJdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQnNNb2RhbCB7XG4gICAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcbiAgICBASW5wdXQoKSBidXR0b25zOiBNb2RhbEJ1dHRvbltdO1xuICAgIEBJbnB1dCgpIHNob3dIZWFkZXIgPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNob3dGb290ZXIgPSB0cnVlO1xuICAgIEBJbnB1dCgpIGlzUHJvY2Vzc2luZ1N0YXRlID0gZmFsc2U7XG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3Muc3EtbW9kYWxcIikgdHJ1ZTtcbn1cbiIsIjxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2dcIiBjZGtUcmFwRm9jdXMgW2Nka1RyYXBGb2N1c0F1dG9DYXB0dXJlXT1cInRydWVcIj5cbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICA8c3EtbW9kYWwtaGVhZGVyICpuZ0lmPVwic2hvd0hlYWRlclwiIFt0aXRsZV09XCJ0aXRsZVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW2hlYWRlcl1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvc3EtbW9kYWwtaGVhZGVyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHNxLW1vZGFsLWZvb3RlciAqbmdJZj1cInNob3dGb290ZXJcIiBbYnV0dG9uc109XCJidXR0b25zXCIgW2lzUHJvY2Vzc2luZ1N0YXRlXT1cImlzUHJvY2Vzc2luZ1N0YXRlXCI+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbZm9vdGVyXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9zcS1tb2RhbC1mb290ZXI+XG4gICAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==