import { Component, Input, HostBinding } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/modal";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/core/intl";
function BsModalFooter_ng_container_1_section_1_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 5);
    i0.ɵɵlistener("click", function BsModalFooter_ng_container_1_section_1_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const button_r3 = i0.ɵɵnextContext().$implicit; const ctx_r6 = i0.ɵɵnextContext(2); return ctx_r6.buttonClick(button_r3); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const button_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassMapInterpolate1("btn ", button_r3.primary ? "btn-primary" : button_r3.result < 0 ? "" : "btn-secondary", "");
    i0.ɵɵpropertyInterpolate("type", button_r3.primary ? "submit" : "button");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 5, button_r3.getText()));
} }
function BsModalFooter_ng_container_1_section_1_a_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 6);
    i0.ɵɵlistener("click", function BsModalFooter_ng_container_1_section_1_a_2_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r12); const button_r3 = i0.ɵɵnextContext().$implicit; const ctx_r10 = i0.ɵɵnextContext(2); return ctx_r10.buttonClick(button_r3); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const button_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassMapInterpolate1("btn ", button_r3.primary ? "btn-primary" : button_r3.result < 0 ? "sq-anchor-btn" : "btn-secondary", "");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 4, button_r3.getText()));
} }
function BsModalFooter_ng_container_1_section_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section");
    i0.ɵɵtemplate(1, BsModalFooter_ng_container_1_section_1_button_1_Template, 3, 7, "button", 3);
    i0.ɵɵtemplate(2, BsModalFooter_ng_container_1_section_1_a_2_Template, 3, 6, "a", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const button_r3 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", button_r3.visible && !button_r3.anchor);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", button_r3.visible && button_r3.anchor);
} }
function BsModalFooter_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsModalFooter_ng_container_1_section_1_Template, 3, 2, "section", 2);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.buttons);
} }
function BsModalFooter_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "span", 7);
    i0.ɵɵelementStart(2, "button", 8);
    i0.ɵɵlistener("click", function BsModalFooter_ng_container_2_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r15); const ctx_r14 = i0.ɵɵnextContext(); return ctx_r14.close(); });
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, "msg#btnClose.text"));
} }
const _c0 = ["*"];
export class BsModalFooter {
    constructor(modalRef, injector) {
        this.modalRef = modalRef;
        this.injector = injector;
        this.buttons = [];
    }
    ngOnChanges(changes) {
        if (changes.isProcessingState) {
            this.isProcessingState = changes.isProcessingState.currentValue;
        }
    }
    buttonClick(button) {
        if (button.validation && button.validation.controls) {
            // Mark all controls as dirty so validation errors are shown on all controls after a submit
            for (const name of Object.keys(button.validation.controls)) {
                button.validation.controls[name].markAsDirty();
            }
        }
        button.click(this.modalRef);
        return false;
    }
    close() {
        this.modalRef.close(-2 /* Cancel */);
    }
}
BsModalFooter.ɵfac = function BsModalFooter_Factory(t) { return new (t || BsModalFooter)(i0.ɵɵdirectiveInject(i1.ModalRef), i0.ɵɵdirectiveInject(i0.Injector)); };
BsModalFooter.ɵcmp = i0.ɵɵdefineComponent({ type: BsModalFooter, selectors: [["sq-modal-footer"]], hostVars: 2, hostBindings: function BsModalFooter_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("sq-modal-footer", true);
    } }, inputs: { buttons: "buttons", isProcessingState: "isProcessingState" }, features: [i0.ɵɵNgOnChangesFeature], ngContentSelectors: _c0, decls: 4, vars: 2, consts: [[1, "modal-footer"], [4, "ngIf"], [4, "ngFor", "ngForOf"], [3, "type", "class", "click", 4, "ngIf"], ["href", "#", 3, "class", "click", 4, "ngIf"], [3, "type", "click"], ["href", "#", 3, "click"], [1, "loader"], ["type", "button", 1, "btn", 3, "click"]], template: function BsModalFooter_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, BsModalFooter_ng_container_1_Template, 2, 1, "ng-container", 1);
        i0.ɵɵtemplate(2, BsModalFooter_ng_container_2_Template, 5, 3, "ng-container", 1);
        i0.ɵɵelementEnd();
        i0.ɵɵprojection(3);
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isProcessingState);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isProcessingState);
    } }, directives: [i2.NgIf, i2.NgForOf], pipes: [i3.MessagePipe], styles: [".loader[_ngcontent-%COMP%]{-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite;border:.6rem solid #f3f3f3;border-radius:50%;border-top-color:#3498db;height:2.5rem;width:2.5rem}@-webkit-keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsModalFooter, [{
        type: Component,
        args: [{
                selector: "sq-modal-footer",
                templateUrl: "./modal-footer.component.html",
                styleUrls: ["./modal-footer.component.scss"]
            }]
    }], function () { return [{ type: i1.ModalRef }, { type: i0.Injector }]; }, { buttons: [{
            type: Input
        }], isProcessingState: [{
            type: Input
        }], true: [{
            type: HostBinding,
            args: ["class.sq-modal-footer"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL21vZGFsLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL21vZGFsLWZvb3Rlci5jb21wb25lbnQudHMiLCJib290c3RyYXAvbW9kYWwtZm9vdGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBcUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7SUNHcEYsaUNBQXlOO0lBQTlCLHdRQUE2QjtJQUFDLFlBQWdDOztJQUFBLGlCQUFTOzs7SUFBakssc0hBQXlGO0lBQXpJLHlFQUErQztJQUF5SCxlQUFnQztJQUFoQywrREFBZ0M7Ozs7SUFDelAsNEJBR2tDO0lBQTlCLGlRQUE2QjtJQUFDLFlBQWdDOztJQUFBLGlCQUFJOzs7SUFEbEUsbUlBQXNHO0lBQ3hFLGVBQWdDO0lBQWhDLCtEQUFnQzs7O0lBTHRFLCtCQUNJO0lBQUEsNkZBQWtRO0lBQ2xRLG1GQUdzRTtJQUMxRSxpQkFBVTs7O0lBTEcsZUFBc0M7SUFBdEMsNkRBQXNDO0lBQzNDLGVBQXFDO0lBQXJDLDREQUFxQzs7O0lBSGpELDZCQUNJO0lBQUEscUZBTVU7SUFDZCwwQkFBZTs7O0lBUGlCLGVBQVU7SUFBVix3Q0FBVTs7OztJQVExQyw2QkFDSTtJQUFBLDBCQUE0QjtJQUM1QixpQ0FBb0Q7SUFBbEIsd0xBQWlCO0lBQUMsWUFBcUM7O0lBQUEsaUJBQVM7SUFDdEcsMEJBQWU7O0lBRHlDLGVBQXFDO0lBQXJDLCtEQUFxQzs7O0FESmpHLE1BQU0sT0FBTyxhQUFhO0lBS3RCLFlBQ2MsUUFBa0IsRUFDbEIsUUFBa0I7UUFEbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBTnZCLFlBQU8sR0FBa0IsRUFBRSxDQUFDO0lBT3JDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxPQUFPLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUM7U0FDbkU7SUFDTCxDQUFDO0lBRUQsV0FBVyxDQUFDLE1BQW1CO1FBQzNCLElBQUksTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTtZQUNqRCwyRkFBMkY7WUFDM0YsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3hELE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ2xEO1NBQ0o7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU0sS0FBSztRQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxpQkFBb0IsQ0FBQztJQUM1QyxDQUFDOzswRUE3QlEsYUFBYTtrREFBYixhQUFhOzs7O1FDUjFCLDhCQUNJO1FBQUEsZ0ZBUWU7UUFDZixnRkFHZTtRQUNuQixpQkFBTTtRQUNOLGtCQUF5Qjs7UUFkTixlQUF3QjtRQUF4Qiw2Q0FBd0I7UUFTeEIsZUFBdUI7UUFBdkIsNENBQXVCOztrRERGN0IsYUFBYTtjQUx6QixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsV0FBVyxFQUFFLCtCQUErQjtnQkFDNUMsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7YUFDL0M7a0ZBRVksT0FBTztrQkFBZixLQUFLO1lBQ0csaUJBQWlCO2tCQUF6QixLQUFLO1lBQ2dDLElBQUk7a0JBQXpDLFdBQVc7bUJBQUMsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBIb3N0QmluZGluZywgSW5qZWN0b3IsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlc30gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7TW9kYWxCdXR0b24sIE1vZGFsUmVmLCBNb2RhbFJlc3VsdH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbW9kYWxcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtbW9kYWwtZm9vdGVyXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9tb2RhbC1mb290ZXIuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vbW9kYWwtZm9vdGVyLmNvbXBvbmVudC5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEJzTW9kYWxGb290ZXIgaW1wbGVtZW50cyBPbkNoYW5nZXN7XG4gICAgQElucHV0KCkgYnV0dG9uczogTW9kYWxCdXR0b25bXSA9IFtdO1xuICAgIEBJbnB1dCgpIGlzUHJvY2Vzc2luZ1N0YXRlOiBib29sZWFuO1xuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnNxLW1vZGFsLWZvb3RlclwiKSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBtb2RhbFJlZjogTW9kYWxSZWYsXG4gICAgICAgIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmlzUHJvY2Vzc2luZ1N0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmlzUHJvY2Vzc2luZ1N0YXRlID0gY2hhbmdlcy5pc1Byb2Nlc3NpbmdTdGF0ZS5jdXJyZW50VmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBidXR0b25DbGljayhidXR0b246IE1vZGFsQnV0dG9uKSB7XG4gICAgICAgIGlmIChidXR0b24udmFsaWRhdGlvbiAmJiBidXR0b24udmFsaWRhdGlvbi5jb250cm9scykge1xuICAgICAgICAgICAgLy8gTWFyayBhbGwgY29udHJvbHMgYXMgZGlydHkgc28gdmFsaWRhdGlvbiBlcnJvcnMgYXJlIHNob3duIG9uIGFsbCBjb250cm9scyBhZnRlciBhIHN1Ym1pdFxuICAgICAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5rZXlzKGJ1dHRvbi52YWxpZGF0aW9uLmNvbnRyb2xzKSkge1xuICAgICAgICAgICAgICAgIGJ1dHRvbi52YWxpZGF0aW9uLmNvbnRyb2xzW25hbWVdLm1hcmtBc0RpcnR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnV0dG9uLmNsaWNrKHRoaXMubW9kYWxSZWYpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1vZGFsUmVmLmNsb3NlKE1vZGFsUmVzdWx0LkNhbmNlbCk7XG4gICAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNQcm9jZXNzaW5nU3RhdGVcIj5cbiAgICAgICAgPHNlY3Rpb24gKm5nRm9yPVwibGV0IGJ1dHRvbiBvZiBidXR0b25zXCI+XG4gICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiYnV0dG9uLnZpc2libGUgJiYgIWJ1dHRvbi5hbmNob3JcIiB0eXBlPVwie3tidXR0b24ucHJpbWFyeSA/ICdzdWJtaXQnIDogJ2J1dHRvbid9fVwiIGNsYXNzPVwiYnRuIHt7YnV0dG9uLnByaW1hcnkgPyAnYnRuLXByaW1hcnknIDogYnV0dG9uLnJlc3VsdCA8IDAgPyAnJyA6ICdidG4tc2Vjb25kYXJ5J319XCIgKGNsaWNrKT1cImJ1dHRvbkNsaWNrKGJ1dHRvbilcIj57e2J1dHRvbi5nZXRUZXh0KCkgfCBzcU1lc3NhZ2V9fTwvYnV0dG9uPlxuICAgICAgICAgICAgPGEgKm5nSWY9XCJidXR0b24udmlzaWJsZSAmJiBidXR0b24uYW5jaG9yXCJcbiAgICAgICAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJidG4ge3tidXR0b24ucHJpbWFyeSA/ICdidG4tcHJpbWFyeScgOiBidXR0b24ucmVzdWx0IDwgMCA/ICdzcS1hbmNob3ItYnRuJyA6ICdidG4tc2Vjb25kYXJ5J319XCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiYnV0dG9uQ2xpY2soYnV0dG9uKVwiPnt7YnV0dG9uLmdldFRleHQoKSB8IHNxTWVzc2FnZX19PC9hPlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzUHJvY2Vzc2luZ1N0YXRlXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibG9hZGVyXCI+PC9zcGFuPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0blwiIChjbGljayk9XCJjbG9zZSgpXCI+e3sgJ21zZyNidG5DbG9zZS50ZXh0JyB8IHNxTWVzc2FnZSB9fTwvYnV0dG9uPlxuICAgIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG48bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cblxuIl19