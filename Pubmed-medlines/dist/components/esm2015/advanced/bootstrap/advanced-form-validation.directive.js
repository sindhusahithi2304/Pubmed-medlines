import { Directive, Input } from "@angular/core";
import { ValidationDirective } from "@sinequa/core/validation";
import * as i0 from "@angular/core";
export class BsAdvancedFormValidation extends ValidationDirective {
    ngOnInit() {
        this.options = {
            form: this.validationForm,
            controlName: this.field,
        };
        super.ngOnInit();
    }
}
BsAdvancedFormValidation.ɵfac = function BsAdvancedFormValidation_Factory(t) { return ɵBsAdvancedFormValidation_BaseFactory(t || BsAdvancedFormValidation); };
BsAdvancedFormValidation.ɵdir = i0.ɵɵdefineDirective({ type: BsAdvancedFormValidation, selectors: [["", "sqAdvancedFormValidation", ""]], inputs: { field: "field", validationForm: "validationForm" }, features: [i0.ɵɵInheritDefinitionFeature] });
const ɵBsAdvancedFormValidation_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(BsAdvancedFormValidation);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsAdvancedFormValidation, [{
        type: Directive,
        args: [{
                selector: "[sqAdvancedFormValidation]",
            }]
    }], null, { field: [{
            type: Input
        }], validationForm: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2YW5jZWQtZm9ybS12YWxpZGF0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2FkdmFuY2VkLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2FkdmFuY2VkLWZvcm0tdmFsaWRhdGlvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBSy9ELE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxtQkFBbUI7SUFJN0QsUUFBUTtRQUNKLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDekIsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQzFCLENBQUM7UUFDRixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckIsQ0FBQzs7aUlBVlEsd0JBQXdCOzZEQUF4Qix3QkFBd0I7cUZBQXhCLHdCQUF3QjtrREFBeEIsd0JBQXdCO2NBSHBDLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsNEJBQTRCO2FBQ3pDO2dCQUVZLEtBQUs7a0JBQWIsS0FBSztZQUNHLGNBQWM7a0JBQXRCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRGlyZWN0aXZlIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvdmFsaWRhdGlvblwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbc3FBZHZhbmNlZEZvcm1WYWxpZGF0aW9uXVwiLFxufSlcbmV4cG9ydCBjbGFzcyBCc0FkdmFuY2VkRm9ybVZhbGlkYXRpb24gZXh0ZW5kcyBWYWxpZGF0aW9uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBmaWVsZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHZhbGlkYXRpb25Gb3JtOiBGb3JtR3JvdXA7XG4gICAgXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGZvcm06IHRoaXMudmFsaWRhdGlvbkZvcm0sXG4gICAgICAgICAgICBjb250cm9sTmFtZTogdGhpcy5maWVsZCxcbiAgICAgICAgfTtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB9XG59XG4iXX0=