import { Component, Inject } from "@angular/core";
import { Validators } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { MODAL_MODEL, ModalButton } from "@sinequa/core/modal";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../modal.component";
import * as i3 from "@sinequa/components/utils";
import * as i4 from "@sinequa/core/validation";
import * as i5 from "@sinequa/core/intl";
export class BsOverrideUser {
    constructor(model, formBuilder) {
        this.model = model;
        this.formBuilder = formBuilder;
    }
    ngOnInit() {
        this.form = this.formBuilder.group({
            "userName": [this.model.userName, Validators.required],
            "domain": [this.model.domain, Validators.required]
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges.pipe(debounceTime(100)), (value) => {
            Utils.merge(this.model, value);
            //this.model.userName = this.form.get("userName").value;
            //this.model.domain = this.form.get("domain").value;
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
BsOverrideUser.ɵfac = function BsOverrideUser_Factory(t) { return new (t || BsOverrideUser)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(i1.FormBuilder)); };
BsOverrideUser.ɵcmp = i0.ɵɵdefineComponent({ type: BsOverrideUser, selectors: [["sq-override-user"]], decls: 12, vars: 11, consts: [["name", "overrideUser", "novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "form-group", "sq-form-group"], ["for", "userName"], ["type", "text", "id", "userName", "formControlName", "userName", "spellcheck", "off", "sqAutofocus", "", 1, "form-control", 3, "sqValidation"], ["for", "domain"], ["type", "text", "id", "domain", "formControlName", "domain", "spellcheck", "off", 1, "form-control", 3, "sqValidation"]], template: function BsOverrideUser_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "sq-modal", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "label", 3);
        i0.ɵɵtext(4);
        i0.ɵɵpipe(5, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(6, "input", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "div", 2);
        i0.ɵɵelementStart(8, "label", 5);
        i0.ɵɵtext(9);
        i0.ɵɵpipe(10, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(11, "input", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("title", "msg#overrideUser.title")("buttons", ctx.buttons);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 7, "msg#overrideUser.userName"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("sqValidation", ctx.form);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 9, "msg#overrideUser.domain"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("sqValidation", ctx.form);
    } }, directives: [i1.ɵangular_packages_forms_forms_y, i1.NgControlStatusGroup, i1.FormGroupDirective, i2.BsModal, i1.DefaultValueAccessor, i1.NgControlStatus, i1.FormControlName, i3.Autofocus, i4.ValidationDirective], pipes: [i5.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsOverrideUser, [{
        type: Component,
        args: [{
                selector: "sq-override-user",
                templateUrl: "./override-user.html"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: i1.FormBuilder }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcnJpZGUtdXNlci5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL21vZGFsLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL292ZXJyaWRlLXVzZXIvb3ZlcnJpZGUtdXNlci50cyIsImJvb3RzdHJhcC9vdmVycmlkZS11c2VyL292ZXJyaWRlLXVzZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFxQixNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUF5QixVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFDLFdBQVcsRUFBRSxXQUFXLEVBQWMsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7QUFPekMsTUFBTSxPQUFPLGNBQWM7SUFLdkIsWUFDZ0MsS0FBbUIsRUFDdkMsV0FBd0I7UUFESixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBQ3ZDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQ3BDLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUMvQixVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQ3RELFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDckQsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDN0UsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNOLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMvQix3REFBd0Q7WUFDeEQsb0RBQW9EO1FBQ3hELENBQUMsQ0FBQyxDQUFDO1FBRVAsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLElBQUksV0FBVyxDQUFDO2dCQUNaLE1BQU0sYUFBZ0I7Z0JBQ3RCLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFVBQVUsRUFBTyxJQUFJLENBQUMsSUFBSTthQUM3QixDQUFDO1lBQ0YsSUFBSSxXQUFXLENBQUM7Z0JBQ1osTUFBTSxpQkFBb0I7YUFDN0IsQ0FBQztTQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7NEVBcENRLGNBQWMsdUJBTVgsV0FBVzttREFOZCxjQUFjO1FDWjNCLCtCQUNJO1FBQUEsbUNBQ0k7UUFBQSw4QkFDSTtRQUFBLGdDQUFzQjtRQUFBLFlBQTJDOztRQUFBLGlCQUFRO1FBQ3pFLDJCQUNKO1FBQUEsaUJBQU07UUFDTiw4QkFDSTtRQUFBLGdDQUFvQjtRQUFBLFlBQXlDOztRQUFBLGlCQUFRO1FBQ3JFLDRCQUNKO1FBQUEsaUJBQU07UUFDVixpQkFBVztRQUNmLGlCQUFPOztRQVg4QixvQ0FBa0I7UUFDekMsZUFBa0M7UUFBbEMsZ0RBQWtDLHdCQUFBO1FBRWQsZUFBMkM7UUFBM0MsdUVBQTJDO1FBQzFELGVBQXFCO1FBQXJCLHVDQUFxQjtRQUdSLGVBQXlDO1FBQXpDLHNFQUF5QztRQUN0RCxlQUFxQjtRQUFyQix1Q0FBcUI7O2tEREkzQixjQUFjO2NBSjFCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixXQUFXLEVBQUUsc0JBQXNCO2FBQ3RDOztzQkFPUSxNQUFNO3VCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIEluamVjdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Rm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9yc30gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7ZGVib3VuY2VUaW1lfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCB7TU9EQUxfTU9ERUwsIE1vZGFsQnV0dG9uLCBNb2RhbFJlc3VsdH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbW9kYWxcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7VXNlck92ZXJyaWRlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9sb2dpblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1vdmVycmlkZS11c2VyXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9vdmVycmlkZS11c2VyLmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBCc092ZXJyaWRlVXNlciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBmb3JtOiBGb3JtR3JvdXA7XG4gICAgZm9ybUNoYW5nZXM6IFN1YnNjcmlwdGlvbjtcbiAgICBidXR0b25zOiBNb2RhbEJ1dHRvbltdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoTU9EQUxfTU9ERUwpIHB1YmxpYyBtb2RlbDogVXNlck92ZXJyaWRlLFxuICAgICAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIFwidXNlck5hbWVcIjogW3RoaXMubW9kZWwudXNlck5hbWUsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgXCJkb21haW5cIjogW3RoaXMubW9kZWwuZG9tYWluLCBWYWxpZGF0b3JzLnJlcXVpcmVkXVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5mb3JtQ2hhbmdlcyA9IFV0aWxzLnN1YnNjcmliZSh0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLnBpcGUoZGVib3VuY2VUaW1lKDEwMCkpLFxuICAgICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgVXRpbHMubWVyZ2UodGhpcy5tb2RlbCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5tb2RlbC51c2VyTmFtZSA9IHRoaXMuZm9ybS5nZXQoXCJ1c2VyTmFtZVwiKS52YWx1ZTtcbiAgICAgICAgICAgICAgICAvL3RoaXMubW9kZWwuZG9tYWluID0gdGhpcy5mb3JtLmdldChcImRvbWFpblwiKS52YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IFtcbiAgICAgICAgICAgIG5ldyBNb2RhbEJ1dHRvbih7XG4gICAgICAgICAgICAgICAgcmVzdWx0OiBNb2RhbFJlc3VsdC5PSyxcbiAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IDxhbnk+dGhpcy5mb3JtXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBNb2RhbEJ1dHRvbih7XG4gICAgICAgICAgICAgICAgcmVzdWx0OiBNb2RhbFJlc3VsdC5DYW5jZWxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZm9ybUNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG59IiwiPGZvcm0gbmFtZT1cIm92ZXJyaWRlVXNlclwiIG5vdmFsaWRhdGUgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgPHNxLW1vZGFsIFt0aXRsZV09XCInbXNnI292ZXJyaWRlVXNlci50aXRsZSdcIiBbYnV0dG9uc109XCJidXR0b25zXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHNxLWZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ1c2VyTmFtZVwiPnt7J21zZyNvdmVycmlkZVVzZXIudXNlck5hbWUnIHwgc3FNZXNzYWdlfX08L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IFtzcVZhbGlkYXRpb25dPVwiZm9ybVwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInVzZXJOYW1lXCIgZm9ybUNvbnRyb2xOYW1lPVwidXNlck5hbWVcIiBzcGVsbGNoZWNrPVwib2ZmXCIgc3FBdXRvZm9jdXM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBzcS1mb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZG9tYWluXCI+e3snbXNnI292ZXJyaWRlVXNlci5kb21haW4nIHwgc3FNZXNzYWdlfX08L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IFtzcVZhbGlkYXRpb25dPVwiZm9ybVwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cImRvbWFpblwiIGZvcm1Db250cm9sTmFtZT1cImRvbWFpblwiIHNwZWxsY2hlY2s9XCJvZmZcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9zcS1tb2RhbD5cbjwvZm9ybT4iXX0=