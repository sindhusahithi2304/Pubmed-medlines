import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IntlModule } from "@sinequa/core/intl";
import { ValidationModule } from "@sinequa/core/validation";
import { UtilsModule } from "@sinequa/components/utils";
import { BsModalModule } from "@sinequa/components/modal";
import { BsAutocompleteModule } from "@sinequa/components/autocomplete";
import { LabelPipe } from "./label.pipe";
import { Labels } from "./labels.component";
import { ResultLabels } from "./result-labels.component";
import { LabelsAutocomplete } from "./labels-autocomplete.directive";
import * as i0 from "@angular/core";
export class LabelsModule {
}
LabelsModule.ɵmod = i0.ɵɵdefineNgModule({ type: LabelsModule });
LabelsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function LabelsModule_Factory(t) { return new (t || LabelsModule)(); }, imports: [[
            FormsModule, ReactiveFormsModule,
            CommonModule,
            IntlModule,
            ValidationModule,
            UtilsModule,
            BsModalModule,
            BsAutocompleteModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LabelsModule, { declarations: [LabelPipe, Labels, ResultLabels, LabelsAutocomplete], imports: [FormsModule, ReactiveFormsModule,
        CommonModule,
        IntlModule,
        ValidationModule,
        UtilsModule,
        BsModalModule,
        BsAutocompleteModule], exports: [LabelPipe, Labels, ResultLabels, LabelsAutocomplete] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LabelsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    FormsModule, ReactiveFormsModule,
                    CommonModule,
                    IntlModule,
                    ValidationModule,
                    UtilsModule,
                    BsModalModule,
                    BsAutocompleteModule,
                ],
                declarations: [
                    LabelPipe, Labels, ResultLabels, LabelsAutocomplete
                ],
                exports: [
                    LabelPipe, Labels, ResultLabels, LabelsAutocomplete
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWxzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2xhYmVscy8iLCJzb3VyY2VzIjpbImxhYmVscy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRWhFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFdEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXhELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBRXRFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQzs7QUFxQm5FLE1BQU0sT0FBTyxZQUFZOztnREFBWixZQUFZO3VHQUFaLFlBQVksa0JBbEJaO1lBQ0wsV0FBVyxFQUFFLG1CQUFtQjtZQUNoQyxZQUFZO1lBRVosVUFBVTtZQUNWLGdCQUFnQjtZQUVoQixXQUFXO1lBQ1gsYUFBYTtZQUNiLG9CQUFvQjtTQUN2Qjt3RkFRUSxZQUFZLG1CQU5qQixTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxrQkFBa0IsYUFYbkQsV0FBVyxFQUFFLG1CQUFtQjtRQUNoQyxZQUFZO1FBRVosVUFBVTtRQUNWLGdCQUFnQjtRQUVoQixXQUFXO1FBQ1gsYUFBYTtRQUNiLG9CQUFvQixhQU1wQixTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxrQkFBa0I7a0RBRzlDLFlBQVk7Y0FuQnhCLFFBQVE7ZUFBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsV0FBVyxFQUFFLG1CQUFtQjtvQkFDaEMsWUFBWTtvQkFFWixVQUFVO29CQUNWLGdCQUFnQjtvQkFFaEIsV0FBVztvQkFDWCxhQUFhO29CQUNiLG9CQUFvQjtpQkFDdkI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGtCQUFrQjtpQkFDdEQ7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGtCQUFrQjtpQkFDdEQ7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5cbmltcG9ydCB7SW50bE1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvaW50bFwiO1xuaW1wb3J0IHtWYWxpZGF0aW9uTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS92YWxpZGF0aW9uXCI7XG5pbXBvcnQge1V0aWxzTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy91dGlsc1wiO1xuXG5pbXBvcnQge0JzTW9kYWxNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL21vZGFsXCI7XG5cbmltcG9ydCB7QnNBdXRvY29tcGxldGVNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2F1dG9jb21wbGV0ZVwiO1xuXG5pbXBvcnQge0xhYmVsUGlwZX0gZnJvbSBcIi4vbGFiZWwucGlwZVwiO1xuaW1wb3J0IHtMYWJlbHN9IGZyb20gXCIuL2xhYmVscy5jb21wb25lbnRcIjtcbmltcG9ydCB7UmVzdWx0TGFiZWxzfSBmcm9tIFwiLi9yZXN1bHQtbGFiZWxzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtMYWJlbHNBdXRvY29tcGxldGV9IGZyb20gXCIuL2xhYmVscy1hdXRvY29tcGxldGUuZGlyZWN0aXZlXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuXG4gICAgICAgIEludGxNb2R1bGUsXG4gICAgICAgIFZhbGlkYXRpb25Nb2R1bGUsXG5cbiAgICAgICAgVXRpbHNNb2R1bGUsXG4gICAgICAgIEJzTW9kYWxNb2R1bGUsXG4gICAgICAgIEJzQXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIExhYmVsUGlwZSwgTGFiZWxzLCBSZXN1bHRMYWJlbHMsIExhYmVsc0F1dG9jb21wbGV0ZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBMYWJlbFBpcGUsIExhYmVscywgUmVzdWx0TGFiZWxzLCBMYWJlbHNBdXRvY29tcGxldGVcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBMYWJlbHNNb2R1bGUge1xufVxuIl19