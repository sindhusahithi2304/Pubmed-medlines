import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MODAL_MODEL, ModalButton } from "@sinequa/core/modal";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@sinequa/components/modal";
import * as i3 from "@sinequa/components/utils";
import * as i4 from "@sinequa/core/validation";
import * as i5 from "@sinequa/core/intl";
export class BsEditSavedQuery {
    constructor(model, formBuilder) {
        this.model = model;
        this.formBuilder = formBuilder;
    }
    ngOnInit() {
        this.nameControl = new FormControl(this.model.name, Validators.required);
        this.form = this.formBuilder.group({
            savedQueryName: this.nameControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges, (value) => {
            this.model.name = this.nameControl.value;
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
}
BsEditSavedQuery.ɵfac = function BsEditSavedQuery_Factory(t) { return new (t || BsEditSavedQuery)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(i1.FormBuilder)); };
BsEditSavedQuery.ɵcmp = i0.ɵɵdefineComponent({ type: BsEditSavedQuery, selectors: [["sq-edit-saved-query"]], decls: 7, vars: 7, consts: [["name", "editSavedQuery", "novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "form-group", "sq-form-group"], ["for", "savedQueryName"], ["type", "text", "id", "savedQueryName", "formControlName", "savedQueryName", "spellcheck", "off", "sqAutofocus", "", 1, "form-control", 3, "sqValidation"]], template: function BsEditSavedQuery_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "sq-modal", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "label", 3);
        i0.ɵɵtext(4);
        i0.ɵɵpipe(5, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(6, "input", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("title", "msg#editSavedQuery.title")("buttons", ctx.buttons);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 5, "msg#editSavedQuery.name"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("sqValidation", ctx.form);
    } }, directives: [i1.ɵangular_packages_forms_forms_y, i1.NgControlStatusGroup, i1.FormGroupDirective, i2.BsModal, i1.DefaultValueAccessor, i1.NgControlStatus, i1.FormControlName, i3.Autofocus, i4.ValidationDirective], pipes: [i5.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsEditSavedQuery, [{
        type: Component,
        args: [{
                selector: "sq-edit-saved-query",
                templateUrl: "./edit-saved-query.html"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: i1.FormBuilder }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zYXZlZC1xdWVyeS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NhdmVkLXF1ZXJpZXMvIiwic291cmNlcyI6WyJib290c3RyYXAvZWRpdC1zYXZlZC1xdWVyeS9lZGl0LXNhdmVkLXF1ZXJ5LnRzIiwiYm9vdHN0cmFwL2VkaXQtc2F2ZWQtcXVlcnkvZWRpdC1zYXZlZC1xdWVyeS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQXFCLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQXlCLFdBQVcsRUFBRSxVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvRSxPQUFPLEVBQUMsV0FBVyxFQUFFLFdBQVcsRUFBYyxNQUFNLHFCQUFxQixDQUFDO0FBQzFFLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7OztBQU96QyxNQUFNLE9BQU8sZ0JBQWdCO0lBTXpCLFlBQ2dDLEtBQWlCLEVBQ3JDLFdBQXdCO1FBREosVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNyQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUNwQyxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDL0IsY0FBYyxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQ25DLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFDckQsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBQzdDLENBQUMsQ0FDSixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLElBQUksV0FBVyxDQUFDO2dCQUNaLE1BQU0sYUFBZ0I7Z0JBQ3RCLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSTthQUN4QixDQUFDO1lBQ0YsSUFBSSxXQUFXLENBQUM7Z0JBQ1osTUFBTSxpQkFBb0I7YUFDN0IsQ0FBQztTQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7Z0ZBcENRLGdCQUFnQix1QkFPYixXQUFXO3FEQVBkLGdCQUFnQjtRQ1g3QiwrQkFDSTtRQUFBLG1DQUNJO1FBQUEsOEJBQ0k7UUFBQSxnQ0FBNEI7UUFBQSxZQUF5Qzs7UUFBQSxpQkFBUTtRQUM3RSwyQkFDSjtRQUFBLGlCQUFNO1FBQ1YsaUJBQVc7UUFDZixpQkFBTzs7UUFQZ0Msb0NBQWtCO1FBQzNDLGVBQW9DO1FBQXBDLGtEQUFvQyx3QkFBQTtRQUVWLGVBQXlDO1FBQXpDLHFFQUF5QztRQUM5RCxlQUFxQjtRQUFyQix1Q0FBcUI7O2tERE8zQixnQkFBZ0I7Y0FKNUIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFdBQVcsRUFBRSx5QkFBeUI7YUFDekM7O3NCQVFRLE1BQU07dUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgSW5qZWN0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9yc30gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7TU9EQUxfTU9ERUwsIE1vZGFsQnV0dG9uLCBNb2RhbFJlc3VsdH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbW9kYWxcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7U2F2ZWRRdWVyeX0gZnJvbSBcIi4uLy4uL3NhdmVkLXF1ZXJpZXMuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1lZGl0LXNhdmVkLXF1ZXJ5XCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9lZGl0LXNhdmVkLXF1ZXJ5Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBCc0VkaXRTYXZlZFF1ZXJ5IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIG5hbWVDb250cm9sOiBGb3JtQ29udHJvbDtcbiAgICBmb3JtOiBGb3JtR3JvdXA7XG4gICAgZm9ybUNoYW5nZXM6IFN1YnNjcmlwdGlvbjtcbiAgICBidXR0b25zOiBNb2RhbEJ1dHRvbltdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoTU9EQUxfTU9ERUwpIHB1YmxpYyBtb2RlbDogU2F2ZWRRdWVyeSxcbiAgICAgICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5uYW1lQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCh0aGlzLm1vZGVsLm5hbWUsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIHNhdmVkUXVlcnlOYW1lOiB0aGlzLm5hbWVDb250cm9sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZvcm1DaGFuZ2VzID0gVXRpbHMuc3Vic2NyaWJlKHRoaXMuZm9ybS52YWx1ZUNoYW5nZXMsXG4gICAgICAgICAgICAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLm5hbWUgPSB0aGlzLm5hbWVDb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IFtcbiAgICAgICAgICAgIG5ldyBNb2RhbEJ1dHRvbih7XG4gICAgICAgICAgICAgICAgcmVzdWx0OiBNb2RhbFJlc3VsdC5PSyxcbiAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IHRoaXMuZm9ybVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXcgTW9kYWxCdXR0b24oe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogTW9kYWxSZXN1bHQuQ2FuY2VsXG4gICAgICAgICAgICB9KVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmZvcm1DaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufVxuIiwiPGZvcm0gbmFtZT1cImVkaXRTYXZlZFF1ZXJ5XCIgbm92YWxpZGF0ZSBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICA8c3EtbW9kYWwgW3RpdGxlXT1cIidtc2cjZWRpdFNhdmVkUXVlcnkudGl0bGUnXCIgW2J1dHRvbnNdPVwiYnV0dG9uc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBzcS1mb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwic2F2ZWRRdWVyeU5hbWVcIj57eydtc2cjZWRpdFNhdmVkUXVlcnkubmFtZScgfCBzcU1lc3NhZ2V9fTwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgW3NxVmFsaWRhdGlvbl09XCJmb3JtXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwic2F2ZWRRdWVyeU5hbWVcIiBmb3JtQ29udHJvbE5hbWU9XCJzYXZlZFF1ZXJ5TmFtZVwiIHNwZWxsY2hlY2s9XCJvZmZcIiBzcUF1dG9mb2N1cz5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9zcS1tb2RhbD5cbjwvZm9ybT4iXX0=