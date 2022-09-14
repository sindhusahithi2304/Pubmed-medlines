import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from '@angular/forms';
import { MODAL_MODEL } from "./modal.service";
import { Utils } from '@sinequa/core/base';
import * as i0 from "@angular/core";
import * as i1 from "./modal-ref";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/cdk/a11y";
import * as i4 from "@angular/common";
import * as i5 from "@sinequa/core/intl";
import * as i6 from "@sinequa/core/validation";
function Prompt_input_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 7);
} }
function Prompt_textarea_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "textarea", 8);
    i0.ɵɵtext(1, "            ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵpropertyInterpolate("rows", ctx_r1.model.rowCount);
} }
function Prompt_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "br");
    i0.ɵɵelementStart(2, "span", 9);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqValidationError");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    let tmp_0_0 = null;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, (tmp_0_0 = ctx_r2.form.get("input")) == null ? null : tmp_0_0.errors));
} }
export class Prompt {
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
    }
    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }
    showError(control) {
        return control.invalid && (control.dirty || this.modalRef.submitted);
    }
    ok() {
        if (!this.form.valid) {
            return;
        }
        this.modalRef.close(-1 /* OK */);
    }
    cancel() {
        this.modalRef.close(-2 /* Cancel */);
    }
    get title() {
        return this.model.title ? this.model.title : "msg#modal.prompt.title";
    }
}
Prompt.ɵfac = function Prompt_Factory(t) { return new (t || Prompt)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(i1.ModalRef), i0.ɵɵdirectiveInject(i2.FormBuilder)); };
Prompt.ɵcmp = i0.ɵɵdefineComponent({ type: Prompt, selectors: [["sq-core-prompt"]], decls: 17, vars: 18, consts: [["novalidate", "", "cdkTrapFocus", "", 2, "border", "solid", "padding", "16px", "background-color", "white", 3, "formGroup", "cdkTrapFocusAutoCapture"], [2, "margin-top", "0"], ["type", "text", "formControlName", "input", 4, "ngIf"], ["type", "text", "formControlName", "input", "spellcheck", "on", "autofocus", "", 3, "rows", 4, "ngIf"], [4, "ngIf"], ["type", "submit", 3, "click"], ["type", "button", 3, "click"], ["type", "text", "formControlName", "input"], ["type", "text", "formControlName", "input", "spellcheck", "on", "autofocus", "", 3, "rows"], [2, "color", "red"]], template: function Prompt_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "h3", 1);
        i0.ɵɵtext(2);
        i0.ɵɵpipe(3, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "div");
        i0.ɵɵtext(5);
        i0.ɵɵpipe(6, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(7, Prompt_input_7_Template, 1, 0, "input", 2);
        i0.ɵɵtemplate(8, Prompt_textarea_8_Template, 2, 1, "textarea", 3);
        i0.ɵɵtemplate(9, Prompt_ng_container_9_Template, 5, 3, "ng-container", 4);
        i0.ɵɵelement(10, "hr");
        i0.ɵɵelementStart(11, "button", 5);
        i0.ɵɵlistener("click", function Prompt_Template_button_click_11_listener() { return ctx.ok(); });
        i0.ɵɵtext(12);
        i0.ɵɵpipe(13, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(14, "button", 6);
        i0.ɵɵlistener("click", function Prompt_Template_button_click_14_listener() { return ctx.cancel(); });
        i0.ɵɵtext(15);
        i0.ɵɵpipe(16, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.form)("cdkTrapFocusAutoCapture", true);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 9, ctx.title));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 11, ctx.model.message, ctx.model.messageParams));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", !ctx.model.rowCount);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !!ctx.model.rowCount);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showError(ctx.inputControl));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 14, "msg#modal.buttons.ok"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 16, "msg#modal.buttons.cancel"));
    } }, directives: [i2.ɵangular_packages_forms_forms_y, i2.NgControlStatusGroup, i3.CdkTrapFocus, i2.FormGroupDirective, i4.NgIf, i2.DefaultValueAccessor, i2.NgControlStatus, i2.FormControlName], pipes: [i5.MessagePipe, i6.ValidationErrorPipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Prompt, [{
        type: Component,
        args: [{
                selector: "sq-core-prompt",
                template: `
        <form novalidate [formGroup]="form" style="border: solid;padding: 16px;background-color: white;" cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
            <h3 style="margin-top: 0;">{{title | sqMessage}}</h3>
            <div>{{model.message | sqMessage:model.messageParams}}</div>
            <input type="text" formControlName="input" *ngIf="!model.rowCount">
            <textarea type="text" formControlName="input" spellcheck="on" rows="{{model.rowCount}}" autofocus *ngIf="!!model.rowCount">
            </textarea>
            <ng-container *ngIf="showError(inputControl)">
                <br>
                <span style="color: red;">{{form.get("input")?.errors | sqValidationError}}</span>
            </ng-container>
            <hr>
            <button type="submit" (click)="ok()">{{'msg#modal.buttons.ok' | sqMessage}}</button>
            <button type="button" (click)="cancel()">{{'msg#modal.buttons.cancel' | sqMessage}}</button>
        </form>
    `
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: i1.ModalRef }, { type: i2.FormBuilder }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbXB0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL21vZGFsLyIsInNvdXJjZXMiOlsicHJvbXB0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFFLFdBQVcsRUFBZSxVQUFVLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRixPQUFPLEVBQUUsV0FBVyxFQUE2QixNQUFNLGlCQUFpQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7O0lBUS9CLDJCQUNBOzs7SUFBQSxtQ0FDQTtJQUFBLDRCQUFBO0lBQUEsaUJBQVc7OztJQURtRCx1REFBeUI7OztJQUV2Riw2QkFDSTtJQUFBLHFCQUNBO0lBQUEsK0JBQTBCO0lBQUEsWUFBaUQ7O0lBQUEsaUJBQU87SUFDdEYsMEJBQWU7Ozs7SUFEZSxlQUFpRDtJQUFqRCxnSEFBaUQ7O0FBUTNGLE1BQU0sT0FBTyxNQUFNO0lBS2YsWUFDZ0MsS0FBb0IsRUFDdEMsUUFBa0IsRUFDbEIsV0FBd0I7UUFGTixVQUFLLEdBQUwsS0FBSyxDQUFlO1FBQ3RDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFDdEMsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQy9CLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWTtTQUMzQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQ3JELENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsU0FBUyxDQUFDLE9BQW9CO1FBQzFCLE9BQU8sT0FBTyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsRUFBRTtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNsQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssYUFBZ0IsQ0FBQztJQUN4QyxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxpQkFBb0IsQ0FBQztJQUM1QyxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDO0lBQzFFLENBQUM7OzREQTNDUSxNQUFNLHVCQU1ILFdBQVc7MkNBTmQsTUFBTTtRQWhCWCwrQkFDSTtRQUFBLDZCQUEyQjtRQUFBLFlBQXFCOztRQUFBLGlCQUFLO1FBQ3JELDJCQUFLO1FBQUEsWUFBaUQ7O1FBQUEsaUJBQU07UUFDNUQsMkRBQ0E7UUFBQSxpRUFDVztRQUNYLHlFQUdlO1FBQ2Ysc0JBQ0E7UUFBQSxrQ0FBcUM7UUFBZixvRkFBUyxRQUFJLElBQUM7UUFBQyxhQUFzQzs7UUFBQSxpQkFBUztRQUNwRixrQ0FBeUM7UUFBbkIsb0ZBQVMsWUFBUSxJQUFDO1FBQUMsYUFBMEM7O1FBQUEsaUJBQVM7UUFDaEcsaUJBQU87O1FBYlUsb0NBQWtCLGlDQUFBO1FBQ0osZUFBcUI7UUFBckIscURBQXFCO1FBQzNDLGVBQWlEO1FBQWpELHVGQUFpRDtRQUNWLGVBQXFCO1FBQXJCLDBDQUFxQjtRQUNrQyxlQUFzQjtRQUF0QiwyQ0FBc0I7UUFFMUcsZUFBNkI7UUFBN0Isc0RBQTZCO1FBS1AsZUFBc0M7UUFBdEMsb0VBQXNDO1FBQ2xDLGVBQTBDO1FBQTFDLHdFQUEwQzs7a0RBSWxGLE1BQU07Y0FuQmxCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztLQWVUO2FBQ0o7O3NCQU9RLE1BQU07dUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTU9EQUxfTU9ERUwsIFByb21wdE9wdGlvbnMsIE1vZGFsUmVzdWx0fSBmcm9tIFwiLi9tb2RhbC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBNb2RhbFJlZiB9IGZyb20gXCIuL21vZGFsLXJlZlwiO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICdAc2luZXF1YS9jb3JlL2Jhc2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1jb3JlLXByb21wdFwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxmb3JtIG5vdmFsaWRhdGUgW2Zvcm1Hcm91cF09XCJmb3JtXCIgc3R5bGU9XCJib3JkZXI6IHNvbGlkO3BhZGRpbmc6IDE2cHg7YmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XCIgY2RrVHJhcEZvY3VzIFtjZGtUcmFwRm9jdXNBdXRvQ2FwdHVyZV09XCJ0cnVlXCI+XG4gICAgICAgICAgICA8aDMgc3R5bGU9XCJtYXJnaW4tdG9wOiAwO1wiPnt7dGl0bGUgfCBzcU1lc3NhZ2V9fTwvaDM+XG4gICAgICAgICAgICA8ZGl2Pnt7bW9kZWwubWVzc2FnZSB8IHNxTWVzc2FnZTptb2RlbC5tZXNzYWdlUGFyYW1zfX08L2Rpdj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGZvcm1Db250cm9sTmFtZT1cImlucHV0XCIgKm5nSWY9XCIhbW9kZWwucm93Q291bnRcIj5cbiAgICAgICAgICAgIDx0ZXh0YXJlYSB0eXBlPVwidGV4dFwiIGZvcm1Db250cm9sTmFtZT1cImlucHV0XCIgc3BlbGxjaGVjaz1cIm9uXCIgcm93cz1cInt7bW9kZWwucm93Q291bnR9fVwiIGF1dG9mb2N1cyAqbmdJZj1cIiEhbW9kZWwucm93Q291bnRcIj5cbiAgICAgICAgICAgIDwvdGV4dGFyZWE+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2hvd0Vycm9yKGlucHV0Q29udHJvbClcIj5cbiAgICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJjb2xvcjogcmVkO1wiPnt7Zm9ybS5nZXQoXCJpbnB1dFwiKT8uZXJyb3JzIHwgc3FWYWxpZGF0aW9uRXJyb3J9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPGhyPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgKGNsaWNrKT1cIm9rKClcIj57eydtc2cjbW9kYWwuYnV0dG9ucy5vaycgfCBzcU1lc3NhZ2V9fTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNhbmNlbCgpXCI+e3snbXNnI21vZGFsLmJ1dHRvbnMuY2FuY2VsJyB8IHNxTWVzc2FnZX19PC9idXR0b24+XG4gICAgICAgIDwvZm9ybT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFByb21wdCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBpbnB1dENvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIGZvcm06IEZvcm1Hcm91cDtcbiAgICBmb3JtQ2hhbmdlczogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoTU9EQUxfTU9ERUwpIHB1YmxpYyBtb2RlbDogUHJvbXB0T3B0aW9ucyxcbiAgICAgICAgcHJvdGVjdGVkIG1vZGFsUmVmOiBNb2RhbFJlZixcbiAgICAgICAgcHJvdGVjdGVkIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmlucHV0Q29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCh0aGlzLm1vZGVsLm91dHB1dCwgdGhpcy5tb2RlbC52YWxpZGF0b3JzIHx8IFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIGlucHV0OiB0aGlzLmlucHV0Q29udHJvbFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5mb3JtQ2hhbmdlcyA9IFV0aWxzLnN1YnNjcmliZSh0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLFxuICAgICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5vdXRwdXQgPSB0aGlzLmlucHV0Q29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmZvcm1DaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgc2hvd0Vycm9yKGNvbnRyb2w6IEZvcm1Db250cm9sKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBjb250cm9sLmludmFsaWQgJiYgKGNvbnRyb2wuZGlydHkgfHwgdGhpcy5tb2RhbFJlZi5zdWJtaXR0ZWQpO1xuICAgIH1cblxuICAgIG9rKCkge1xuICAgICAgICBpZiAoIXRoaXMuZm9ybS52YWxpZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9kYWxSZWYuY2xvc2UoTW9kYWxSZXN1bHQuT0spO1xuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5tb2RhbFJlZi5jbG9zZShNb2RhbFJlc3VsdC5DYW5jZWwpO1xuICAgIH1cblxuICAgIGdldCB0aXRsZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC50aXRsZSA/IHRoaXMubW9kZWwudGl0bGUgOiBcIm1zZyNtb2RhbC5wcm9tcHQudGl0bGVcIjtcbiAgICB9XG5cbn1cbiJdfQ==