import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from '@angular/forms';
import { MODAL_MODEL, ModalButton } from "@sinequa/core/modal";
import { Utils } from '@sinequa/core/base';
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/modal";
import * as i2 from "@angular/forms";
import * as i3 from "./modal.component";
import * as i4 from "@angular/common";
import * as i5 from "@sinequa/components/utils";
import * as i6 from "@sinequa/core/validation";
import * as i7 from "@sinequa/core/intl";
function BsPrompt_input_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 6);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("sqValidation", ctx_r0.form);
} }
function BsPrompt_textarea_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "textarea", 7);
    i0.ɵɵtext(1, "                    ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵpropertyInterpolate("rows", ctx_r1.model.rowCount);
    i0.ɵɵproperty("sqValidation", ctx_r1.form);
} }
export class BsPrompt {
    constructor(model, modalRef, formBuilder) {
        this.model = model;
        this.modalRef = modalRef;
        this.formBuilder = formBuilder;
    }
    ngOnInit() {
        this.inputControl = new FormControl(this.model.output, this.model.validators || Validators.required);
        this.form = this.formBuilder.group({
            input: this.inputControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges, (value) => {
            this.model.output = this.inputControl.value;
        });
        this.buttons = [
            new ModalButton({
                result: -1 /* OK */,
                primary: true,
                validation: this.form
            }),
            new ModalButton({
                result: -2 /* Cancel */
            })
        ];
    }
    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }
    get title() {
        return this.model.title ? this.model.title : "msg#modal.prompt.title";
    }
}
BsPrompt.ɵfac = function BsPrompt_Factory(t) { return new (t || BsPrompt)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(i1.ModalRef), i0.ɵɵdirectiveInject(i2.FormBuilder)); };
BsPrompt.ɵcmp = i0.ɵɵdefineComponent({ type: BsPrompt, selectors: [["sq-prompt"]], decls: 8, vars: 9, consts: [["name", "prompt", "novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "form-group", "sq-form-group"], ["for", "input"], ["type", "text", "class", "form-control", "id", "input", "formControlName", "input", "spellcheck", "off", "sqAutofocus", "", 3, "sqValidation", 4, "ngIf"], ["type", "text", "class", "form-control", "id", "input", "formControlName", "input", "spellcheck", "on", "sqAutofocus", "", 3, "sqValidation", "rows", 4, "ngIf"], ["type", "text", "id", "input", "formControlName", "input", "spellcheck", "off", "sqAutofocus", "", 1, "form-control", 3, "sqValidation"], ["type", "text", "id", "input", "formControlName", "input", "spellcheck", "on", "sqAutofocus", "", 1, "form-control", 3, "sqValidation", "rows"]], template: function BsPrompt_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "sq-modal", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "label", 3);
        i0.ɵɵtext(4);
        i0.ɵɵpipe(5, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(6, BsPrompt_input_6_Template, 1, 1, "input", 4);
        i0.ɵɵtemplate(7, BsPrompt_textarea_7_Template, 2, 2, "textarea", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("title", ctx.title)("buttons", ctx.buttons);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 6, ctx.model.message, ctx.model.messageParams));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", !ctx.model.rowCount);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !!ctx.model.rowCount);
    } }, directives: [i2.ɵangular_packages_forms_forms_y, i2.NgControlStatusGroup, i2.FormGroupDirective, i3.BsModal, i4.NgIf, i2.DefaultValueAccessor, i2.NgControlStatus, i2.FormControlName, i5.Autofocus, i6.ValidationDirective], pipes: [i7.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsPrompt, [{
        type: Component,
        args: [{
                selector: "sq-prompt",
                template: `
        <form name="prompt" novalidate [formGroup]="form">
            <sq-modal [title]="title" [buttons]="buttons">
                <div class="form-group sq-form-group">
                    <label for="input">{{model.message | sqMessage:model.messageParams}}</label>
                    <input [sqValidation]="form" type="text" class="form-control" id="input" formControlName="input" spellcheck="off" sqAutofocus *ngIf="!model.rowCount">
                    <textarea [sqValidation]="form" type="text" class="form-control" id="input" formControlName="input" spellcheck="on" rows="{{model.rowCount}}" sqAutofocus *ngIf="!!model.rowCount">
                    </textarea>
                </div>
            </sq-modal>
        </form>
    `
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: i1.ModalRef }, { type: i2.FormBuilder }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbXB0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL21vZGFsLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL3Byb21wdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxXQUFXLEVBQWUsVUFBVSxFQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFFakYsT0FBTyxFQUFFLFdBQVcsRUFBd0MsV0FBVyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDcEcsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7Ozs7O0lBU3ZCLDJCQUNBOzs7SUFETywwQ0FBcUI7OztJQUM1QixtQ0FDQTtJQUFBLG9DQUFBO0lBQUEsaUJBQVc7OztJQUR5Ryx1REFBeUI7SUFBbkksMENBQXFCOztBQU9uRCxNQUFNLE9BQU8sUUFBUTtJQU1qQixZQUNnQyxLQUFvQixFQUN0QyxRQUFrQixFQUNsQixXQUF3QjtRQUZOLFVBQUssR0FBTCxLQUFLLENBQWU7UUFDdEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUN0QyxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDL0IsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZO1NBQzNCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFDckQsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO1FBRVAsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLElBQUksV0FBVyxDQUFDO2dCQUNaLE1BQU0sYUFBZ0I7Z0JBQ3RCLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSTthQUN4QixDQUFDO1lBQ0YsSUFBSSxXQUFXLENBQUM7Z0JBQ1osTUFBTSxpQkFBb0I7YUFDN0IsQ0FBQztTQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQztJQUMxRSxDQUFDOztnRUF4Q1EsUUFBUSx1QkFPTCxXQUFXOzZDQVBkLFFBQVE7UUFaYiwrQkFDSTtRQUFBLG1DQUNJO1FBQUEsOEJBQ0k7UUFBQSxnQ0FBbUI7UUFBQSxZQUFpRDs7UUFBQSxpQkFBUTtRQUM1RSw2REFDQTtRQUFBLG1FQUNXO1FBQ2YsaUJBQU07UUFDVixpQkFBVztRQUNmLGlCQUFPOztRQVR3QixvQ0FBa0I7UUFDbkMsZUFBZTtRQUFmLGlDQUFlLHdCQUFBO1FBRUUsZUFBaUQ7UUFBakQsc0ZBQWlEO1FBQzJELGVBQXFCO1FBQXJCLDBDQUFxQjtRQUNPLGVBQXNCO1FBQXRCLDJDQUFzQjs7a0RBT3hMLFFBQVE7Y0FmcEIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7O0tBV1Q7YUFDSjs7c0JBUVEsTUFBTTt1QkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtQnVpbGRlciwgVmFsaWRhdG9ycywgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNT0RBTF9NT0RFTCwgUHJvbXB0T3B0aW9ucywgTW9kYWxSZXN1bHQsIE1vZGFsUmVmLCBNb2RhbEJ1dHRvbn0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbW9kYWxcIjtcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnQHNpbmVxdWEvY29yZS9iYXNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtcHJvbXB0XCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGZvcm0gbmFtZT1cInByb21wdFwiIG5vdmFsaWRhdGUgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgICAgICAgICA8c3EtbW9kYWwgW3RpdGxlXT1cInRpdGxlXCIgW2J1dHRvbnNdPVwiYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHNxLWZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImlucHV0XCI+e3ttb2RlbC5tZXNzYWdlIHwgc3FNZXNzYWdlOm1vZGVsLm1lc3NhZ2VQYXJhbXN9fTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBbc3FWYWxpZGF0aW9uXT1cImZvcm1cIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJpbnB1dFwiIGZvcm1Db250cm9sTmFtZT1cImlucHV0XCIgc3BlbGxjaGVjaz1cIm9mZlwiIHNxQXV0b2ZvY3VzICpuZ0lmPVwiIW1vZGVsLnJvd0NvdW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBbc3FWYWxpZGF0aW9uXT1cImZvcm1cIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJpbnB1dFwiIGZvcm1Db250cm9sTmFtZT1cImlucHV0XCIgc3BlbGxjaGVjaz1cIm9uXCIgcm93cz1cInt7bW9kZWwucm93Q291bnR9fVwiIHNxQXV0b2ZvY3VzICpuZ0lmPVwiISFtb2RlbC5yb3dDb3VudFwiPlxuICAgICAgICAgICAgICAgICAgICA8L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9zcS1tb2RhbD5cbiAgICAgICAgPC9mb3JtPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgQnNQcm9tcHQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgaW5wdXRDb250cm9sOiBGb3JtQ29udHJvbDtcbiAgICBmb3JtOiBGb3JtR3JvdXA7XG4gICAgZm9ybUNoYW5nZXM6IFN1YnNjcmlwdGlvbjtcbiAgICBidXR0b25zOiBNb2RhbEJ1dHRvbltdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoTU9EQUxfTU9ERUwpIHB1YmxpYyBtb2RlbDogUHJvbXB0T3B0aW9ucyxcbiAgICAgICAgcHJvdGVjdGVkIG1vZGFsUmVmOiBNb2RhbFJlZixcbiAgICAgICAgcHJvdGVjdGVkIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmlucHV0Q29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCh0aGlzLm1vZGVsLm91dHB1dCwgdGhpcy5tb2RlbC52YWxpZGF0b3JzIHx8IFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIGlucHV0OiB0aGlzLmlucHV0Q29udHJvbFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5mb3JtQ2hhbmdlcyA9IFV0aWxzLnN1YnNjcmliZSh0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLFxuICAgICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5vdXRwdXQgPSB0aGlzLmlucHV0Q29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IFtcbiAgICAgICAgICAgIG5ldyBNb2RhbEJ1dHRvbih7XG4gICAgICAgICAgICAgICAgcmVzdWx0OiBNb2RhbFJlc3VsdC5PSyxcbiAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IHRoaXMuZm9ybVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXcgTW9kYWxCdXR0b24oe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogTW9kYWxSZXN1bHQuQ2FuY2VsXG4gICAgICAgICAgICB9KVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmZvcm1DaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLnRpdGxlID8gdGhpcy5tb2RlbC50aXRsZSA6IFwibXNnI21vZGFsLnByb21wdC50aXRsZVwiO1xuICAgIH1cblxufVxuIl19