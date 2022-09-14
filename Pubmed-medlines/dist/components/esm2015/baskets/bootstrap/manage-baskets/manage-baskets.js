import { Component, Inject } from "@angular/core";
import { Validators } from "@angular/forms";
import { MODAL_MODEL, ModalButton } from "@sinequa/core/modal";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@sinequa/components/modal";
import * as i3 from "@angular/common";
import * as i4 from "@angular/cdk/drag-drop";
import * as i5 from "@sinequa/core/intl";
function BsManageBaskets_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelementStart(1, "button", 7);
    i0.ɵɵlistener("click", function BsManageBaskets_div_2_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.reorder(); });
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, ctx_r0.reordering ? "msg#manageBaskets.edit" : "msg#manageBaskets.reorder"));
} }
function BsManageBaskets_div_5_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const basket_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(basket_r4.name);
} }
function BsManageBaskets_div_5_sq_editable_2_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "sq-editable", 15);
    i0.ɵɵlistener("valueChange", function BsManageBaskets_div_5_sq_editable_2_Template_sq_editable_valueChange_0_listener($event) { i0.ɵɵrestoreView(_r13); const basket_r4 = i0.ɵɵnextContext().$implicit; const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.setName(basket_r4, $event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const basket_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", basket_r4.name)("model", basket_r4)("validators", ctx_r7.nameValidators);
} }
function BsManageBaskets_div_5_a_4_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 16);
    i0.ɵɵlistener("click", function BsManageBaskets_div_5_a_4_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r16 = i0.ɵɵnextContext(); const basket_r4 = ctx_r16.$implicit; const $index_r5 = ctx_r16.index; const ctx_r15 = i0.ɵɵnextContext(); return ctx_r15.remove(basket_r4, $index_r5); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelement(2, "span", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 1, "msg#manageBaskets.remove"));
} }
function BsManageBaskets_div_5_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 18);
} }
const _c0 = "list-group-item list-group-item-action d-flex w-auto-unimportant";
const _c1 = function (a1) { return [_c0, a1]; };
function BsManageBaskets_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtemplate(1, BsManageBaskets_div_5_div_1_Template, 2, 1, "div", 9);
    i0.ɵɵtemplate(2, BsManageBaskets_div_5_sq_editable_2_Template, 1, 3, "sq-editable", 10);
    i0.ɵɵelementStart(3, "div", 11);
    i0.ɵɵtemplate(4, BsManageBaskets_div_5_a_4_Template, 3, 3, "a", 12);
    i0.ɵɵtemplate(5, BsManageBaskets_div_5_span_5_Template, 1, 0, "span", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(5, _c1, ctx_r1.reordering ? "cursor-move" : ""));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.reordering);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r1.reordering);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r1.reordering);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.reordering);
} }
export class BsManageBaskets {
    constructor(model) {
        this.model = model;
        this.reordering = false;
        this.nameValidators = [
            Validators.required,
            (control) => {
                const modelControl = control.root.get("model");
                if (modelControl) {
                    for (const item of this.model.baskets) {
                        if (modelControl.value === item) {
                            continue;
                        }
                        if (control.value === item.name) {
                            return {
                                unique: true
                            };
                        }
                    }
                }
                return null;
            }
        ];
    }
    ngOnInit() {
        this.buttons = [
            this.removeAllButton = new ModalButton({
                text: "msg#manageBaskets.removeAll",
                result: 0 /* Custom */,
                action: (button) => {
                    this.model.baskets.splice(0);
                    button.visible = false;
                    this.addAuditEvent({
                        type: "Basket_DeleteAll" /* DeleteAll */
                    });
                },
                visible: this.model.baskets.length > 0
            }),
            new ModalButton({
                result: -1 /* OK */,
                primary: true
            }),
            new ModalButton({
                result: -2 /* Cancel */
            })
        ];
    }
    addAuditEvent(auditEvent) {
        if (!this.model.auditEvents) {
            this.model.auditEvents = [];
        }
        this.model.auditEvents.push(auditEvent);
    }
    reorder() {
        this.reordering = !this.reordering;
    }
    setName(basket, name) {
        if (!Utils.eqNC(basket.name, name)) {
            this.addAuditEvent({
                type: "Basket_Rename" /* Rename */,
                detail: {
                    basket: name,
                    "old-name": basket.name
                }
            });
            basket.name = name;
        }
    }
    remove(basket, index) {
        this.model.baskets.splice(index, 1);
        this.removeAllButton.visible = this.model.baskets.length > 0;
        this.addAuditEvent({
            type: "Basket_Delete" /* Delete */,
            detail: {
                basket: basket.name
            }
        });
        return false;
    }
    dropped(drop) {
        Utils.arrayMove(this.model.baskets, drop.previousIndex, drop.currentIndex);
    }
}
BsManageBaskets.ɵfac = function BsManageBaskets_Factory(t) { return new (t || BsManageBaskets)(i0.ɵɵdirectiveInject(MODAL_MODEL)); };
BsManageBaskets.ɵcmp = i0.ɵɵdefineComponent({ type: BsManageBaskets, selectors: [["sq-manage-baskets"]], decls: 6, vars: 6, consts: [["name", "manageBaskets", "novalidate", ""], [3, "title", "buttons"], ["class", "form-group clearfix", 4, "ngIf"], [1, "form-group"], ["cdkDropList", "", 1, "list-group", 3, "cdkDropListData", "cdkDropListDisabled", "cdkDropListDropped"], ["cdkDrag", "", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "form-group", "clearfix"], ["type", "button", 1, "btn", "btn-secondary", "float-right", 3, "click"], ["cdkDrag", "", 3, "ngClass"], ["class", "sq-basket-text", 4, "ngIf"], ["name", "msg#manageBaskets.name", 3, "value", "model", "validators", "valueChange", 4, "ngIf"], [1, "ml-auto"], ["class", "ml-2", "href", "#", 3, "title", "click", 4, "ngIf"], ["class", "ml-2 fas fa-bars sq-move", 4, "ngIf"], [1, "sq-basket-text"], ["name", "msg#manageBaskets.name", 3, "value", "model", "validators", "valueChange"], ["href", "#", 1, "ml-2", 3, "title", "click"], [1, "fas", "fa-times", "sq-remove"], [1, "ml-2", "fas", "fa-bars", "sq-move"]], template: function BsManageBaskets_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "sq-modal", 1);
        i0.ɵɵtemplate(2, BsManageBaskets_div_2_Template, 4, 3, "div", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵelementStart(4, "div", 4);
        i0.ɵɵlistener("cdkDropListDropped", function BsManageBaskets_Template_div_cdkDropListDropped_4_listener($event) { return ctx.dropped($event); });
        i0.ɵɵtemplate(5, BsManageBaskets_div_5_Template, 6, 7, "div", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("title", "msg#manageBaskets.title")("buttons", ctx.buttons);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.model.baskets.length);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("cdkDropListData", ctx.model.baskets)("cdkDropListDisabled", !ctx.reordering);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.model.baskets);
    } }, directives: [i1.ɵangular_packages_forms_forms_y, i1.NgControlStatusGroup, i1.NgForm, i2.BsModal, i3.NgIf, i4.CdkDropList, i3.NgForOf, i4.CdkDrag, i3.NgClass, i2.BsEditable], pipes: [i5.MessagePipe], styles: [".list-group[_ngcontent-%COMP%]{max-height:18.5rem;overflow-y:auto;width:100%}.sq-basket-text[_ngcontent-%COMP%]{overflow-wrap:break-word;width:100%;word-break:break-word;word-wrap:break-word}.sq-move[_ngcontent-%COMP%]{cursor:move}span.sq-move[_ngcontent-%COMP%]{color:grey}.sq-remove[_ngcontent-%COMP%]{color:#d3d3d3;cursor:pointer}.sq-remove[_ngcontent-%COMP%]:hover{color:#8b0000}.w-auto-unimportant[_ngcontent-%COMP%]{width:auto}.cursor-move[_ngcontent-%COMP%]{cursor:move}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsManageBaskets, [{
        type: Component,
        args: [{
                selector: "sq-manage-baskets",
                templateUrl: "./manage-baskets.html",
                styleUrls: ["./manage-baskets.scss"]
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWJhc2tldHMuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9iYXNrZXRzLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL21hbmFnZS1iYXNrZXRzL21hbmFnZS1iYXNrZXRzLnRzIiwiYm9vdHN0cmFwL21hbmFnZS1iYXNrZXRzL21hbmFnZS1iYXNrZXRzLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEQsT0FBTyxFQUFDLFVBQVUsRUFBa0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUczRCxPQUFPLEVBQUMsV0FBVyxFQUFFLFdBQVcsRUFBYyxNQUFNLHFCQUFxQixDQUFDO0FBQzFFLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7O0lDSGpDLDhCQUNJO0lBQUEsaUNBQWdGO0lBQXBCLGdMQUFtQjtJQUFDLFlBQXFGOztJQUFBLGlCQUFTO0lBQ2xMLGlCQUFNOzs7SUFEOEUsZUFBcUY7SUFBckYsc0hBQXFGOzs7SUFNN0osK0JBQStDO0lBQUEsWUFBZTtJQUFBLGlCQUFNOzs7SUFBckIsZUFBZTtJQUFmLG9DQUFlOzs7O0lBQzlELHVDQUNtRDtJQURJLHlSQUF1QztJQUMzQyxpQkFBYzs7OztJQURoQyxzQ0FBcUIsb0JBQUEscUNBQUE7Ozs7SUFHbEQsNkJBQ0k7SUFEeUMsK1NBQWdDOztJQUN6RSwyQkFBNEM7SUFDaEQsaUJBQUk7O0lBRjBFLG1GQUFrRDs7O0lBR2hJLDJCQUFpRTs7Ozs7SUFUekUsOEJBRUk7SUFBQSxzRUFBb0U7SUFDcEUsdUZBQ2lFO0lBQ2pFLCtCQUNJO0lBQUEsbUVBRUk7SUFDSix5RUFBaUU7SUFDckUsaUJBQU07SUFDVixpQkFBTTs7O0lBVkYsNEZBQWdIO0lBQzFHLGVBQWdCO0lBQWhCLHdDQUFnQjtJQUNSLGVBQWlCO0lBQWpCLHlDQUFpQjtJQUd2Qixl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LE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxhQUFhLENBQUM7WUFDZixJQUFJLDhCQUF3QjtZQUM1QixNQUFNLEVBQUU7Z0JBQ0osTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJO2FBQ3RCO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUEyQjtRQUMvQixLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQy9FLENBQUM7OzhFQTdGUSxlQUFlLHVCQU9aLFdBQVc7b0RBUGQsZUFBZTtRQ2Q1QiwrQkFDSTtRQUFBLG1DQUNJO1FBQUEsZ0VBRU07UUFDTiw4QkFDSTtRQUFBLDhCQUNJO1FBRHNHLHlIQUFzQixtQkFBZSxJQUFDO1FBQzVJLGdFQVdNO1FBQ1YsaUJBQU07UUFDVixpQkFBTTtRQUNWLGlCQUFXO1FBQ2YsaUJBQU87O1FBckJPLGVBQW1DO1FBQW5DLGlEQUFtQyx3QkFBQTtRQUNuQyxlQUEwQjtRQUExQiwrQ0FBMEI7UUFJUSxlQUFpQztRQUFqQyxtREFBaUMsd0NBQUE7UUFDekMsZUFBa0I7UUFBbEIsMkNBQWtCOztrRERPN0MsZUFBZTtjQUwzQixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsV0FBVyxFQUFFLHVCQUF1QjtnQkFDcEMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7YUFDdkM7O3NCQVFRLE1BQU07dUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIEluamVjdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7VmFsaWRhdG9ycywgQWJzdHJhY3RDb250cm9sfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7VmFsaWRhdG9yRm59IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtDZGtEcmFnRHJvcH0gZnJvbSBcIkBhbmd1bGFyL2Nkay9kcmFnLWRyb3BcIjtcbmltcG9ydCB7TU9EQUxfTU9ERUwsIE1vZGFsQnV0dG9uLCBNb2RhbFJlc3VsdH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbW9kYWxcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7QXVkaXRFdmVudH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge0Jhc2tldCwgQmFza2V0RXZlbnRUeXBlLCBNYW5hZ2VCYXNrZXRzTW9kZWx9IGZyb20gXCIuLi8uLi9iYXNrZXRzLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtbWFuYWdlLWJhc2tldHNcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL21hbmFnZS1iYXNrZXRzLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vbWFuYWdlLWJhc2tldHMuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBCc01hbmFnZUJhc2tldHMgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHJlb3JkZXJpbmc6IGJvb2xlYW47XG4gICAgYnV0dG9uczogTW9kYWxCdXR0b25bXTtcbiAgICByZW1vdmVBbGxCdXR0b246IE1vZGFsQnV0dG9uO1xuICAgIG5hbWVWYWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoTU9EQUxfTU9ERUwpIHB1YmxpYyBtb2RlbDogTWFuYWdlQmFza2V0c01vZGVsKSB7XG4gICAgICAgIHRoaXMucmVvcmRlcmluZyA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMubmFtZVZhbGlkYXRvcnMgPSBbXG4gICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICAgICAgKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsQ29udHJvbCA9IGNvbnRyb2wucm9vdC5nZXQoXCJtb2RlbFwiKTtcbiAgICAgICAgICAgICAgICBpZiAobW9kZWxDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLm1vZGVsLmJhc2tldHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2RlbENvbnRyb2wudmFsdWUgPT09IGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250cm9sLnZhbHVlID09PSBpdGVtLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmlxdWU6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBbXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbEJ1dHRvbiA9IG5ldyBNb2RhbEJ1dHRvbih7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJtc2cjbWFuYWdlQmFza2V0cy5yZW1vdmVBbGxcIixcbiAgICAgICAgICAgICAgICByZXN1bHQ6IE1vZGFsUmVzdWx0LkN1c3RvbSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IChidXR0b24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5iYXNrZXRzLnNwbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRBdWRpdEV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEJhc2tldEV2ZW50VHlwZS5EZWxldGVBbGxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiB0aGlzLm1vZGVsLmJhc2tldHMubGVuZ3RoID4gMFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXcgTW9kYWxCdXR0b24oe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogTW9kYWxSZXN1bHQuT0ssXG4gICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXcgTW9kYWxCdXR0b24oe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogTW9kYWxSZXN1bHQuQ2FuY2VsXG4gICAgICAgICAgICB9KVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGFkZEF1ZGl0RXZlbnQoYXVkaXRFdmVudDogQXVkaXRFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMubW9kZWwuYXVkaXRFdmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwuYXVkaXRFdmVudHMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGVsLmF1ZGl0RXZlbnRzLnB1c2goYXVkaXRFdmVudCk7XG4gICAgfVxuXG4gICAgcmVvcmRlcigpIHtcbiAgICAgICAgdGhpcy5yZW9yZGVyaW5nID0gIXRoaXMucmVvcmRlcmluZztcbiAgICB9XG5cbiAgICBzZXROYW1lKGJhc2tldDogQmFza2V0LCBuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCFVdGlscy5lcU5DKGJhc2tldC5uYW1lLCBuYW1lKSkge1xuICAgICAgICAgICAgdGhpcy5hZGRBdWRpdEV2ZW50KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBCYXNrZXRFdmVudFR5cGUuUmVuYW1lLFxuICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICBiYXNrZXQ6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwib2xkLW5hbWVcIjogYmFza2V0Lm5hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJhc2tldC5uYW1lID0gbmFtZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZShiYXNrZXQ6IEJhc2tldCwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLm1vZGVsLmJhc2tldHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxCdXR0b24udmlzaWJsZSA9IHRoaXMubW9kZWwuYmFza2V0cy5sZW5ndGggPiAwO1xuICAgICAgICB0aGlzLmFkZEF1ZGl0RXZlbnQoe1xuICAgICAgICAgICAgdHlwZTogQmFza2V0RXZlbnRUeXBlLkRlbGV0ZSxcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgIGJhc2tldDogYmFza2V0Lm5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBkcm9wcGVkKGRyb3A6IENka0RyYWdEcm9wPEJhc2tldFtdPikge1xuICAgICAgICBVdGlscy5hcnJheU1vdmUodGhpcy5tb2RlbC5iYXNrZXRzLCBkcm9wLnByZXZpb3VzSW5kZXgsIGRyb3AuY3VycmVudEluZGV4KTtcbiAgICB9XG59XG4iLCI8Zm9ybSBuYW1lPVwibWFuYWdlQmFza2V0c1wiIG5vdmFsaWRhdGU+XG4gICAgPHNxLW1vZGFsIFt0aXRsZV09XCInbXNnI21hbmFnZUJhc2tldHMudGl0bGUnXCIgW2J1dHRvbnNdPVwiYnV0dG9uc1wiPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwibW9kZWwuYmFza2V0cy5sZW5ndGhcIiBjbGFzcz1cImZvcm0tZ3JvdXAgY2xlYXJmaXhcIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgZmxvYXQtcmlnaHRcIiAoY2xpY2spPVwicmVvcmRlcigpXCI+e3socmVvcmRlcmluZyA/IFwibXNnI21hbmFnZUJhc2tldHMuZWRpdFwiIDogXCJtc2cjbWFuYWdlQmFza2V0cy5yZW9yZGVyXCIpIHwgc3FNZXNzYWdlfX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1ncm91cFwiIGNka0Ryb3BMaXN0IFtjZGtEcm9wTGlzdERhdGFdPVwibW9kZWwuYmFza2V0c1wiIFtjZGtEcm9wTGlzdERpc2FibGVkXT1cIiFyZW9yZGVyaW5nXCIgKGNka0Ryb3BMaXN0RHJvcHBlZCk9XCJkcm9wcGVkKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBiYXNrZXQgb2YgbW9kZWwuYmFza2V0czsgbGV0ICRpbmRleCA9IGluZGV4XCIgY2RrRHJhZyBcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiWydsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWFjdGlvbiBkLWZsZXggdy1hdXRvLXVuaW1wb3J0YW50JywgcmVvcmRlcmluZyA/ICdjdXJzb3ItbW92ZSc6ICcnXVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwicmVvcmRlcmluZ1wiIGNsYXNzPVwic3EtYmFza2V0LXRleHRcIj57e2Jhc2tldC5uYW1lfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNxLWVkaXRhYmxlICpuZ0lmPVwiIXJlb3JkZXJpbmdcIiBbdmFsdWVdPVwiYmFza2V0Lm5hbWVcIiAodmFsdWVDaGFuZ2UpPVwic2V0TmFtZShiYXNrZXQsICRldmVudClcIiBuYW1lPVwibXNnI21hbmFnZUJhc2tldHMubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbW9kZWxdPVwiYmFza2V0XCIgW3ZhbGlkYXRvcnNdPVwibmFtZVZhbGlkYXRvcnNcIj48L3NxLWVkaXRhYmxlPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWwtYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCIhcmVvcmRlcmluZ1wiIGNsYXNzPVwibWwtMlwiIGhyZWY9XCIjXCIgKGNsaWNrKT1cInJlbW92ZShiYXNrZXQsICRpbmRleClcIiB0aXRsZT1cInt7J21zZyNtYW5hZ2VCYXNrZXRzLnJlbW92ZScgfCBzcU1lc3NhZ2V9fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmFzIGZhLXRpbWVzIHNxLXJlbW92ZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwicmVvcmRlcmluZ1wiIGNsYXNzPVwibWwtMiBmYXMgZmEtYmFycyBzcS1tb3ZlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L3NxLW1vZGFsPlxuPC9mb3JtPlxuIl19