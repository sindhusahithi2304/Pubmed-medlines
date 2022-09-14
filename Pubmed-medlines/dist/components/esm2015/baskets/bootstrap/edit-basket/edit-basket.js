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
export class BsEditBasket {
    constructor(model, formBuilder) {
        this.model = model;
        this.formBuilder = formBuilder;
    }
    ngOnInit() {
        this.nameControl = new FormControl(this.model.name, Validators.required);
        this.form = this.formBuilder.group({
            basketName: this.nameControl
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
BsEditBasket.ɵfac = function BsEditBasket_Factory(t) { return new (t || BsEditBasket)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(i1.FormBuilder)); };
BsEditBasket.ɵcmp = i0.ɵɵdefineComponent({ type: BsEditBasket, selectors: [["sq-edit-basket"]], decls: 7, vars: 7, consts: [["name", "editBasket", "novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "form-group", "sq-form-group"], ["for", "basketName"], ["type", "text", "id", "basketName", "formControlName", "basketName", "spellcheck", "off", "sqAutofocus", "", 1, "form-control", 3, "sqValidation"]], template: function BsEditBasket_Template(rf, ctx) { if (rf & 1) {
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
        i0.ɵɵproperty("title", "msg#editBasket.title")("buttons", ctx.buttons);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 5, "msg#editBasket.name"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("sqValidation", ctx.form);
    } }, directives: [i1.ɵangular_packages_forms_forms_y, i1.NgControlStatusGroup, i1.FormGroupDirective, i2.BsModal, i1.DefaultValueAccessor, i1.NgControlStatus, i1.FormControlName, i3.Autofocus, i4.ValidationDirective], pipes: [i5.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsEditBasket, [{
        type: Component,
        args: [{
                selector: "sq-edit-basket",
                templateUrl: "./edit-basket.html"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: i1.FormBuilder }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1iYXNrZXQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9iYXNrZXRzLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2VkaXQtYmFza2V0L2VkaXQtYmFza2V0LnRzIiwiYm9vdHN0cmFwL2VkaXQtYmFza2V0L2VkaXQtYmFza2V0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBcUIsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBeUIsV0FBVyxFQUFFLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRS9FLE9BQU8sRUFBQyxXQUFXLEVBQUUsV0FBVyxFQUFjLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7O0FBT3pDLE1BQU0sT0FBTyxZQUFZO0lBTXJCLFlBQ2dDLEtBQWEsRUFDakMsV0FBd0I7UUFESixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2pDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQ3BDLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUMvQixVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDL0IsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUNyRCxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFDN0MsQ0FBQyxDQUNKLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ1gsSUFBSSxXQUFXLENBQUM7Z0JBQ1osTUFBTSxhQUFnQjtnQkFDdEIsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJO2FBQ3hCLENBQUM7WUFDRixJQUFJLFdBQVcsQ0FBQztnQkFDWixNQUFNLGlCQUFvQjthQUM3QixDQUFDO1NBQ0wsQ0FBQztJQUNOLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzt3RUFwQ1EsWUFBWSx1QkFPVCxXQUFXO2lEQVBkLFlBQVk7UUNYekIsK0JBQ0k7UUFBQSxtQ0FDSTtRQUFBLDhCQUNJO1FBQUEsZ0NBQXdCO1FBQUEsWUFBcUM7O1FBQUEsaUJBQVE7UUFDckUsMkJBQ0o7UUFBQSxpQkFBTTtRQUNWLGlCQUFXO1FBQ2YsaUJBQU87O1FBUDRCLG9DQUFrQjtRQUN2QyxlQUFnQztRQUFoQyw4Q0FBZ0Msd0JBQUE7UUFFVixlQUFxQztRQUFyQyxpRUFBcUM7UUFDdEQsZUFBcUI7UUFBckIsdUNBQXFCOztrRERPM0IsWUFBWTtjQUp4QixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsV0FBVyxFQUFFLG9CQUFvQjthQUNwQzs7c0JBUVEsTUFBTTt1QkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBJbmplY3R9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0Zvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JzfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtNT0RBTF9NT0RFTCwgTW9kYWxCdXR0b24sIE1vZGFsUmVzdWx0fSBmcm9tIFwiQHNpbmVxdWEvY29yZS9tb2RhbFwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHtCYXNrZXR9IGZyb20gXCIuLi8uLi9iYXNrZXRzLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtZWRpdC1iYXNrZXRcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2VkaXQtYmFza2V0Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBCc0VkaXRCYXNrZXQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgbmFtZUNvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIGZvcm06IEZvcm1Hcm91cDtcbiAgICBmb3JtQ2hhbmdlczogU3Vic2NyaXB0aW9uO1xuICAgIGJ1dHRvbnM6IE1vZGFsQnV0dG9uW107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChNT0RBTF9NT0RFTCkgcHVibGljIG1vZGVsOiBCYXNrZXQsXG4gICAgICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubmFtZUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wodGhpcy5tb2RlbC5uYW1lLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICBiYXNrZXROYW1lOiB0aGlzLm5hbWVDb250cm9sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZvcm1DaGFuZ2VzID0gVXRpbHMuc3Vic2NyaWJlKHRoaXMuZm9ybS52YWx1ZUNoYW5nZXMsXG4gICAgICAgICAgICAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLm5hbWUgPSB0aGlzLm5hbWVDb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IFtcbiAgICAgICAgICAgIG5ldyBNb2RhbEJ1dHRvbih7XG4gICAgICAgICAgICAgICAgcmVzdWx0OiBNb2RhbFJlc3VsdC5PSyxcbiAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IHRoaXMuZm9ybVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXcgTW9kYWxCdXR0b24oe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogTW9kYWxSZXN1bHQuQ2FuY2VsXG4gICAgICAgICAgICB9KVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmZvcm1DaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufVxuIiwiPGZvcm0gbmFtZT1cImVkaXRCYXNrZXRcIiBub3ZhbGlkYXRlIFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgIDxzcS1tb2RhbCBbdGl0bGVdPVwiJ21zZyNlZGl0QmFza2V0LnRpdGxlJ1wiIFtidXR0b25zXT1cImJ1dHRvbnNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgc3EtZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImJhc2tldE5hbWVcIj57eydtc2cjZWRpdEJhc2tldC5uYW1lJyB8IHNxTWVzc2FnZX19PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBbc3FWYWxpZGF0aW9uXT1cImZvcm1cIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJiYXNrZXROYW1lXCIgZm9ybUNvbnRyb2xOYW1lPVwiYmFza2V0TmFtZVwiIHNwZWxsY2hlY2s9XCJvZmZcIiBzcUF1dG9mb2N1cz5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9zcS1tb2RhbD5cbjwvZm9ybT4iXX0=