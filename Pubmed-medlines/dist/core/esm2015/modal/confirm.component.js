import { Component, Inject } from "@angular/core";
import { MODAL_MODEL } from "./modal.service";
import * as i0 from "@angular/core";
import * as i1 from "./modal-ref";
import * as i2 from "@angular/cdk/a11y";
import * as i3 from "@angular/common";
import * as i4 from "@sinequa/core/intl";
function Confirm_ng_container_8_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 4);
    i0.ɵɵlistener("click", function Confirm_ng_container_8_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const button_r1 = i0.ɵɵnextContext().$implicit; const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.buttonClick(button_r1); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const button_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵpropertyInterpolate("type", button_r1.primary ? "submit" : "button");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, button_r1.getText()));
} }
function Confirm_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, Confirm_ng_container_8_button_1_Template, 3, 4, "button", 3);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const button_r1 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", button_r1.visible);
} }
export class Confirm {
    constructor(model, modalRef) {
        this.model = model;
        this.modalRef = modalRef;
    }
    get title() {
        return this.model.title ? this.model.title : "msg#modal.confirm.title";
    }
    buttonClick(button) {
        button.click(this.modalRef);
    }
}
Confirm.ɵfac = function Confirm_Factory(t) { return new (t || Confirm)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(i1.ModalRef)); };
Confirm.ɵcmp = i0.ɵɵdefineComponent({ type: Confirm, selectors: [["sq-core-confirm"]], decls: 9, vars: 9, consts: [["cdkTrapFocus", "", 2, "border", "solid", "padding", "16px", "background-color", "white", 3, "cdkTrapFocusAutoCapture"], [2, "margin-top", "0"], [4, "ngFor", "ngForOf"], [3, "type", "click", 4, "ngIf"], [3, "type", "click"]], template: function Confirm_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "h3", 1);
        i0.ɵɵtext(2);
        i0.ɵɵpipe(3, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "div");
        i0.ɵɵtext(5);
        i0.ɵɵpipe(6, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(7, "hr");
        i0.ɵɵtemplate(8, Confirm_ng_container_8_Template, 2, 1, "ng-container", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("cdkTrapFocusAutoCapture", true);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 4, ctx.title));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 6, ctx.model.message, ctx.model.messageParams));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.model.buttons);
    } }, directives: [i2.CdkTrapFocus, i3.NgForOf, i3.NgIf], pipes: [i4.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Confirm, [{
        type: Component,
        args: [{
                selector: "sq-core-confirm",
                template: `
        <div style="border: solid;padding: 16px;background-color: white;" cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
            <h3 style="margin-top: 0;">{{title | sqMessage}}</h3>
            <div>{{model.message | sqMessage:model.messageParams}}</div>
            <hr>
            <ng-container *ngFor="let button of model.buttons">
                <button *ngIf="button.visible" type="{{button.primary ? 'submit' : 'button'}}"
                    (click)="buttonClick(button)">{{button.getText() | sqMessage}}</button>
            </ng-container>
        </div>
    `
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: i1.ModalRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9tb2RhbC8iLCJzb3VyY2VzIjpbImNvbmZpcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hELE9BQU8sRUFBQyxXQUFXLEVBQThCLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7O0lBV3pELGlDQUNrQztJQUE5Qix1UEFBNkI7SUFBQyxZQUFnQzs7SUFBQSxpQkFBUzs7O0lBRDVDLHlFQUErQztJQUM1QyxlQUFnQztJQUFoQywrREFBZ0M7OztJQUZ0RSw2QkFDSTtJQUFBLDZFQUMyRTtJQUMvRSwwQkFBZTs7O0lBRkYsZUFBb0I7SUFBcEIsd0NBQW9COztBQU03QyxNQUFNLE9BQU8sT0FBTztJQUNoQixZQUNnQyxLQUFxQixFQUN2QyxRQUFrQjtRQURBLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3ZDLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDaEMsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQztJQUMzRSxDQUFDO0lBRUQsV0FBVyxDQUFDLE1BQW1CO1FBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7OzhEQVpRLE9BQU8sdUJBRUosV0FBVzs0Q0FGZCxPQUFPO1FBWFosOEJBQ0k7UUFBQSw2QkFBMkI7UUFBQSxZQUFxQjs7UUFBQSxpQkFBSztRQUNyRCwyQkFBSztRQUFBLFlBQWlEOztRQUFBLGlCQUFNO1FBQzVELHFCQUNBO1FBQUEsMEVBR2U7UUFDbkIsaUJBQU07O1FBUnlFLDhDQUFnQztRQUNoRixlQUFxQjtRQUFyQixxREFBcUI7UUFDM0MsZUFBaUQ7UUFBakQsc0ZBQWlEO1FBRXJCLGVBQWdCO1FBQWhCLDJDQUFnQjs7a0RBT2hELE9BQU87Y0FkbkIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7OztLQVVUO2FBQ0o7O3NCQUdRLE1BQU07dUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbmplY3R9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge01PREFMX01PREVMLCBDb25maXJtT3B0aW9ucywgTW9kYWxCdXR0b259IGZyb20gXCIuL21vZGFsLnNlcnZpY2VcIjtcbmltcG9ydCB7TW9kYWxSZWZ9IGZyb20gXCIuL21vZGFsLXJlZlwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1jb3JlLWNvbmZpcm1cIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IHN0eWxlPVwiYm9yZGVyOiBzb2xpZDtwYWRkaW5nOiAxNnB4O2JhY2tncm91bmQtY29sb3I6IHdoaXRlO1wiIGNka1RyYXBGb2N1cyBbY2RrVHJhcEZvY3VzQXV0b0NhcHR1cmVdPVwidHJ1ZVwiPlxuICAgICAgICAgICAgPGgzIHN0eWxlPVwibWFyZ2luLXRvcDogMDtcIj57e3RpdGxlIHwgc3FNZXNzYWdlfX08L2gzPlxuICAgICAgICAgICAgPGRpdj57e21vZGVsLm1lc3NhZ2UgfCBzcU1lc3NhZ2U6bW9kZWwubWVzc2FnZVBhcmFtc319PC9kaXY+XG4gICAgICAgICAgICA8aHI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBidXR0b24gb2YgbW9kZWwuYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJidXR0b24udmlzaWJsZVwiIHR5cGU9XCJ7e2J1dHRvbi5wcmltYXJ5ID8gJ3N1Ym1pdCcgOiAnYnV0dG9uJ319XCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImJ1dHRvbkNsaWNrKGJ1dHRvbilcIj57e2J1dHRvbi5nZXRUZXh0KCkgfCBzcU1lc3NhZ2V9fTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlybSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoTU9EQUxfTU9ERUwpIHB1YmxpYyBtb2RlbDogQ29uZmlybU9wdGlvbnMsXG4gICAgICAgIHByb3RlY3RlZCBtb2RhbFJlZjogTW9kYWxSZWYpIHtcbiAgICB9XG5cbiAgICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwudGl0bGUgPyB0aGlzLm1vZGVsLnRpdGxlIDogXCJtc2cjbW9kYWwuY29uZmlybS50aXRsZVwiO1xuICAgIH1cblxuICAgIGJ1dHRvbkNsaWNrKGJ1dHRvbjogTW9kYWxCdXR0b24pIHtcbiAgICAgICAgYnV0dG9uLmNsaWNrKHRoaXMubW9kYWxSZWYpO1xuICAgIH1cbn1cbiJdfQ==