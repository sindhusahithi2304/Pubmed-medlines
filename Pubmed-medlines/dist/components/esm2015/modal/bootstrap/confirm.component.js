import { Component, Inject, HostBinding } from "@angular/core";
import { MODAL_MODEL } from "@sinequa/core/modal";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/modal";
import * as i2 from "./modal.component";
import * as i3 from "@sinequa/core/intl";
export class BsConfirm {
    constructor(model, modalRef) {
        this.model = model;
        this.modalRef = modalRef;
    }
    get title() {
        return this.model.title ? this.model.title : "msg#modal.confirm.title";
    }
    getMessageClass(confirmType) {
        switch (confirmType) {
            case 1 /* Info */:
                return "alert-info";
            case 0 /* Success */:
                return "alert-sucess";
            case 2 /* Warning */:
                return "alert-warning";
            case 3 /* Error */:
                return "alert-danger";
            default:
                return "";
        }
    }
}
BsConfirm.ɵfac = function BsConfirm_Factory(t) { return new (t || BsConfirm)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(i1.ModalRef)); };
BsConfirm.ɵcmp = i0.ɵɵdefineComponent({ type: BsConfirm, selectors: [["sq-confirm"]], hostVars: 2, hostBindings: function BsConfirm_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("sq-confirm", true);
    } }, decls: 4, vars: 9, consts: [[3, "title", "buttons"]], template: function BsConfirm_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "sq-modal", 0);
        i0.ɵɵelementStart(1, "div");
        i0.ɵɵtext(2);
        i0.ɵɵpipe(3, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("title", ctx.title)("buttons", ctx.model.buttons);
        i0.ɵɵadvance(1);
        i0.ɵɵclassMapInterpolate1("alert ", ctx.getMessageClass(ctx.model.confirmType), "");
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 6, ctx.model.message, ctx.model.messageParams));
    } }, directives: [i2.BsModal], pipes: [i3.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsConfirm, [{
        type: Component,
        args: [{
                selector: "sq-confirm",
                templateUrl: "./confirm.component.html"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: i1.ModalRef }]; }, { true: [{
            type: HostBinding,
            args: ["class.sq-confirm"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9tb2RhbC8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9jb25maXJtLmNvbXBvbmVudC50cyIsImJvb3RzdHJhcC9jb25maXJtLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUMsV0FBVyxFQUF3QyxNQUFNLHFCQUFxQixDQUFDOzs7OztBQU12RixNQUFNLE9BQU8sU0FBUztJQUdsQixZQUNnQyxLQUFxQixFQUN2QyxRQUFrQjtRQURBLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3ZDLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDaEMsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQztJQUMzRSxDQUFDO0lBRU0sZUFBZSxDQUFDLFdBQVc7UUFDOUIsUUFBUSxXQUFXLEVBQUU7WUFDakI7Z0JBQ0ksT0FBTyxZQUFZLENBQUM7WUFDeEI7Z0JBQ0ksT0FBTyxjQUFjLENBQUM7WUFDMUI7Z0JBQ0ksT0FBTyxlQUFlLENBQUM7WUFDM0I7Z0JBQ0ksT0FBTyxjQUFjLENBQUM7WUFDMUI7Z0JBQ0ksT0FBTyxFQUFFLENBQUM7U0FDakI7SUFDTCxDQUFDOztrRUF6QlEsU0FBUyx1QkFJTixXQUFXOzhDQUpkLFNBQVM7OztRQ1B0QixtQ0FHSTtRQUFBLDJCQUEwRDtRQUFBLFlBQWlEOztRQUFBLGlCQUFNO1FBQ3JILGlCQUFXOztRQUhQLGlDQUFlLDhCQUFBO1FBRVYsZUFBb0Q7UUFBcEQsbUZBQW9EO1FBQUMsZUFBaUQ7UUFBakQsc0ZBQWlEOztrRERJbEcsU0FBUztjQUpyQixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFdBQVcsRUFBRSwwQkFBMEI7YUFDMUM7O3NCQUtRLE1BQU07dUJBQUMsV0FBVzsrQ0FIVSxJQUFJO2tCQUFwQyxXQUFXO21CQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbmplY3QsIEhvc3RCaW5kaW5nfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtNT0RBTF9NT0RFTCwgTW9kYWxSZWYsIENvbmZpcm1PcHRpb25zLCBDb25maXJtVHlwZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbW9kYWxcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtY29uZmlybVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY29uZmlybS5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEJzQ29uZmlybSB7XG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3Muc3EtY29uZmlybVwiKSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoTU9EQUxfTU9ERUwpIHB1YmxpYyBtb2RlbDogQ29uZmlybU9wdGlvbnMsXG4gICAgICAgIHByb3RlY3RlZCBtb2RhbFJlZjogTW9kYWxSZWYpIHtcbiAgICB9XG5cbiAgICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwudGl0bGUgPyB0aGlzLm1vZGVsLnRpdGxlIDogXCJtc2cjbW9kYWwuY29uZmlybS50aXRsZVwiO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNZXNzYWdlQ2xhc3MoY29uZmlybVR5cGUpOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2ggKGNvbmZpcm1UeXBlKSB7XG4gICAgICAgICAgICBjYXNlIENvbmZpcm1UeXBlLkluZm86XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiYWxlcnQtaW5mb1wiO1xuICAgICAgICAgICAgY2FzZSBDb25maXJtVHlwZS5TdWNjZXNzOlxuICAgICAgICAgICAgICAgIHJldHVybiBcImFsZXJ0LXN1Y2Vzc1wiO1xuICAgICAgICAgICAgY2FzZSBDb25maXJtVHlwZS5XYXJuaW5nOlxuICAgICAgICAgICAgICAgIHJldHVybiBcImFsZXJ0LXdhcm5pbmdcIjtcbiAgICAgICAgICAgIGNhc2UgQ29uZmlybVR5cGUuRXJyb3I6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiYWxlcnQtZGFuZ2VyXCI7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgfVxufSIsIjxzcS1tb2RhbFxuICAgIFt0aXRsZV09XCJ0aXRsZVwiXG4gICAgW2J1dHRvbnNdPVwibW9kZWwuYnV0dG9uc1wiPlxuICAgIDxkaXYgY2xhc3M9XCJhbGVydCB7e2dldE1lc3NhZ2VDbGFzcyhtb2RlbC5jb25maXJtVHlwZSl9fVwiPnt7bW9kZWwubWVzc2FnZSB8IHNxTWVzc2FnZTptb2RlbC5tZXNzYWdlUGFyYW1zfX08L2Rpdj5cbjwvc3EtbW9kYWw+XG4iXX0=