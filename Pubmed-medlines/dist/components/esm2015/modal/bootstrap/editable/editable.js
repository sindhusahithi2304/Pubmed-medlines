import { Component, Input, Output, EventEmitter, HostBinding, HostListener } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Utils, Keys } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/components/utils";
import * as i4 from "@sinequa/core/validation";
import * as i5 from "@sinequa/core/intl";
function BsEditable_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r0.value);
} }
function BsEditable_form_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 3);
    i0.ɵɵelementStart(1, "div", 4);
    i0.ɵɵelementStart(2, "label", 5);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "input", 6);
    i0.ɵɵlistener("keydown", function BsEditable_form_1_Template_input_keydown_5_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.inputKeydown($event); })("blur", function BsEditable_form_1_Template_input_blur_5_listener() { i0.ɵɵrestoreView(_r3); const ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.stopEditing(); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r1.form);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 3, ctx_r1.name));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("sqValidation", ctx_r1.form);
} }
export class BsEditable {
    constructor(formBuilder, elementRef) {
        this.formBuilder = formBuilder;
        this.elementRef = elementRef;
        this.tabindex = "0";
        this.valueChange = new EventEmitter();
    }
    ngOnInit() {
        this.editableControl = new FormControl(this.value, this.validators);
        this.modelControl = new FormControl(this.model);
        this.form = this.formBuilder.group({
            editable: this.editableControl,
            model: this.modelControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges, (value) => {
            this.value = this.editableControl.value;
        });
    }
    ngOnDestroy() {
        this.valueChange.unsubscribe();
        this.formChanges.unsubscribe();
    }
    startEditing() {
        if (!this.editing) {
            this.previousValue = this.value;
            this.editableControl["_touched"] = false; //TODO - need markAsPristine?
            this.editableControl["_pristine"] = true; //
            this.editing = true;
        }
    }
    stopEditing(cancel = false) {
        if (this.editing) {
            this.editing = false;
            if (this.focusAfterEdit && this.elementRef) {
                this.elementRef.nativeElement.focus();
            }
            this.focusAfterEdit = false;
            if (cancel) {
                this.value = this.previousValue;
            }
            this.valueChange.emit(this.value);
        }
    }
    inputKeydown(event) {
        switch (event.keyCode) {
            case Keys.enter:
                event.stopPropagation();
                this.stopEditing();
                return false;
            case Keys.esc:
                event.stopPropagation();
                this.stopEditing(true);
                return false;
        }
        return undefined;
    }
    hostKeydown(event) {
        if (event.keyCode === Keys.enter) {
            this.focusAfterEdit = true;
            this.startEditing();
            return false;
        }
        return undefined;
    }
}
BsEditable.ɵfac = function BsEditable_Factory(t) { return new (t || BsEditable)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i0.ElementRef)); };
BsEditable.ɵcmp = i0.ɵɵdefineComponent({ type: BsEditable, selectors: [["sq-editable"]], hostVars: 1, hostBindings: function BsEditable_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("mousedown", function BsEditable_mousedown_HostBindingHandler() { return ctx.startEditing(); })("touchstart", function BsEditable_touchstart_HostBindingHandler() { return ctx.startEditing(); })("keydown", function BsEditable_keydown_HostBindingHandler($event) { return ctx.hostKeydown($event); });
    } if (rf & 2) {
        i0.ɵɵattribute("tabindex", ctx.tabindex);
    } }, inputs: { name: "name", value: "value", model: "model", validators: "validators" }, outputs: { valueChange: "valueChange" }, decls: 2, vars: 2, consts: [["class", "editable-text", 4, "ngIf"], ["class", "form-inline", "role", "form", "novalidate", "", 3, "formGroup", 4, "ngIf"], [1, "editable-text"], ["role", "form", "novalidate", "", 1, "form-inline", 3, "formGroup"], [1, "form-group"], ["for", "editable", 1, "sr-only"], ["type", "text", "id", "editable", "formControlName", "editable", "spellcheck", "false", "sqAutofocus", "", 1, "form-control", 3, "sqValidation", "keydown", "blur"]], template: function BsEditable_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsEditable_div_0_Template, 2, 1, "div", 0);
        i0.ɵɵtemplate(1, BsEditable_form_1_Template, 6, 5, "form", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !ctx.editing);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.editing);
    } }, directives: [i2.NgIf, i1.ɵangular_packages_forms_forms_y, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.DefaultValueAccessor, i1.NgControlStatus, i1.FormControlName, i3.Autofocus, i4.ValidationDirective], pipes: [i5.MessagePipe], styles: ["[_nghost-%COMP%]{display:block;flex:1 1 0px}[_nghost-%COMP%]   .editable-text[_ngcontent-%COMP%]{min-width:4rem;overflow-wrap:break-word;word-break:break-word;word-wrap:break-word}[_nghost-%COMP%]   form[_ngcontent-%COMP%]{display:inline-block;margin:0;white-space:nowrap;width:90%}[_nghost-%COMP%]   form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%!important}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsEditable, [{
        type: Component,
        args: [{
                selector: "sq-editable",
                templateUrl: "./editable.html",
                styleUrls: ["./editable.scss"]
            }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i0.ElementRef }]; }, { tabindex: [{
            type: HostBinding,
            args: ["attr.tabindex"]
        }], name: [{
            type: Input
        }], value: [{
            type: Input
        }], model: [{
            type: Input
        }], valueChange: [{
            type: Output
        }], validators: [{
            type: Input
        }], startEditing: [{
            type: HostListener,
            args: ["mousedown"]
        }, {
            type: HostListener,
            args: ["touchstart"]
        }], hostKeydown: [{
            type: HostListener,
            args: ["keydown", ["$event"]]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdGFibGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9tb2RhbC8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9lZGl0YWJsZS9lZGl0YWJsZS50cyIsImJvb3RzdHJhcC9lZGl0YWJsZS9lZGl0YWJsZS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQXFCLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDL0gsT0FBTyxFQUF5QixXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUduRSxPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7OztJQ0ovQyw4QkFBNEM7SUFBQSxZQUFTO0lBQUEsaUJBQU07OztJQUFmLGVBQVM7SUFBVCxrQ0FBUzs7OztJQUNyRCwrQkFDSTtJQUFBLDhCQUNJO0lBQ0EsZ0NBQXNDO0lBQUEsWUFBb0I7O0lBQUEsaUJBQVE7SUFDbEUsZ0NBQ0o7SUFEOEgsZ01BQWdDLGdLQUFBO0lBQTFKLGlCQUNKO0lBQUEsaUJBQU07SUFDVixpQkFBTzs7O0lBTjBELHVDQUFrQjtJQUdyQyxlQUFvQjtJQUFwQix1REFBb0I7SUFDbkQsZUFBcUI7SUFBckIsMENBQXFCOztBRE1wQyxNQUFNLE9BQU8sVUFBVTtJQWVuQixZQUNZLFdBQXdCLEVBQ3hCLFVBQXNCO1FBRHRCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFoQkosYUFBUSxHQUFHLEdBQUcsQ0FBQztRQWtCekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBQ2xELENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FB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VVAsVUFBVTtjQUx0QixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFdBQVcsRUFBRSxpQkFBaUI7Z0JBQzlCLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO2FBQ2pDO3VGQUVpQyxRQUFRO2tCQUFyQyxXQUFXO21CQUFDLGVBQWU7WUFDbkIsSUFBSTtrQkFBWixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBQ0ksV0FBVztrQkFBcEIsTUFBTTtZQUNFLFVBQVU7a0JBQWxCLEtBQUs7WUFxQ04sWUFBWTtrQkFGWCxZQUFZO21CQUFDLFdBQVc7O2tCQUN4QixZQUFZO21CQUFDLFlBQVk7WUF1QzFCLFdBQVc7a0JBRFYsWUFBWTttQkFBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgRWxlbWVudFJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Rm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgRm9ybUNvbnRyb2x9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtWYWxpZGF0b3JGbn0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7VXRpbHMsIEtleXN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtZWRpdGFibGVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2VkaXRhYmxlLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vZWRpdGFibGUuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBCc0VkaXRhYmxlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBIb3N0QmluZGluZyhcImF0dHIudGFiaW5kZXhcIikgdGFiaW5kZXggPSBcIjBcIjtcbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdmFsdWU6IHN0cmluZztcbiAgICBASW5wdXQoKSBtb2RlbDogYW55O1xuICAgIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz47XG4gICAgQElucHV0KCkgdmFsaWRhdG9yczogVmFsaWRhdG9yRm5bXTtcbiAgICBlZGl0YWJsZUNvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIG1vZGVsQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgZm9ybTogRm9ybUdyb3VwO1xuICAgIGZvcm1DaGFuZ2VzOiBTdWJzY3JpcHRpb247XG4gICAgcHJldmlvdXNWYWx1ZTogc3RyaW5nO1xuICAgIGVkaXRpbmc6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBmb2N1c0FmdGVyRWRpdDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICAgKSB7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wodGhpcy52YWx1ZSwgdGhpcy52YWxpZGF0b3JzKTtcbiAgICAgICAgdGhpcy5tb2RlbENvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wodGhpcy5tb2RlbCk7XG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgZWRpdGFibGU6IHRoaXMuZWRpdGFibGVDb250cm9sLFxuICAgICAgICAgICAgbW9kZWw6IHRoaXMubW9kZWxDb250cm9sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZvcm1DaGFuZ2VzID0gVXRpbHMuc3Vic2NyaWJlKHRoaXMuZm9ybS52YWx1ZUNoYW5nZXMsXG4gICAgICAgICAgICAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5lZGl0YWJsZUNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5mb3JtQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJtb3VzZWRvd25cIilcbiAgICBASG9zdExpc3RlbmVyKFwidG91Y2hzdGFydFwiKVxuICAgIHN0YXJ0RWRpdGluZygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVkaXRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgICAgICB0aGlzLmVkaXRhYmxlQ29udHJvbFtcIl90b3VjaGVkXCJdID0gZmFsc2U7IC8vVE9ETyAtIG5lZWQgbWFya0FzUHJpc3RpbmU/XG4gICAgICAgICAgICB0aGlzLmVkaXRhYmxlQ29udHJvbFtcIl9wcmlzdGluZVwiXSA9IHRydWU7IC8vXG4gICAgICAgICAgICB0aGlzLmVkaXRpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RvcEVkaXRpbmcoY2FuY2VsID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuZWRpdGluZykge1xuICAgICAgICAgICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodGhpcy5mb2N1c0FmdGVyRWRpdCAmJiB0aGlzLmVsZW1lbnRSZWYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5mb2N1c0FmdGVyRWRpdCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGNhbmNlbCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnByZXZpb3VzVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnB1dEtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIEtleXMuZW50ZXI6XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wRWRpdGluZygpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGNhc2UgS2V5cy5lc2M6XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wRWRpdGluZyh0cnVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwia2V5ZG93blwiLCBbXCIkZXZlbnRcIl0pXG4gICAgaG9zdEtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEtleXMuZW50ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNBZnRlckVkaXQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGFydEVkaXRpbmcoKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cbiIsIjxkaXYgKm5nSWY9XCIhZWRpdGluZ1wiIGNsYXNzPVwiZWRpdGFibGUtdGV4dFwiPnt7dmFsdWV9fTwvZGl2PlxuPGZvcm0gKm5nSWY9XCJlZGl0aW5nXCIgY2xhc3M9XCJmb3JtLWlubGluZVwiIHJvbGU9XCJmb3JtXCIgbm92YWxpZGF0ZSBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8IS0tbGFiZWwgW2hpZGRlbl09XCJmb3JtLnZhbGlkXCIgZm9yPVwiZWRpdGFibGVcIj57e25hbWUgfCBzcU1lc3NhZ2V9fTwvbGFiZWwtLT5cbiAgICAgICAgPGxhYmVsIGZvcj1cImVkaXRhYmxlXCIgY2xhc3M9XCJzci1vbmx5XCI+e3tuYW1lIHwgc3FNZXNzYWdlfX08L2xhYmVsPlxuICAgICAgICA8aW5wdXQgW3NxVmFsaWRhdGlvbl09XCJmb3JtXCIgdHlwZT1cInRleHRcIiBpZD1cImVkaXRhYmxlXCIgZm9ybUNvbnRyb2xOYW1lPVwiZWRpdGFibGVcIiBzcGVsbGNoZWNrPVwiZmFsc2VcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIChrZXlkb3duKT1cImlucHV0S2V5ZG93bigkZXZlbnQpXCIgc3FBdXRvZm9jdXMgKGJsdXIpPVwic3RvcEVkaXRpbmcoKVwiPlxuICAgIDwvZGl2PlxuPC9mb3JtPlxuIl19