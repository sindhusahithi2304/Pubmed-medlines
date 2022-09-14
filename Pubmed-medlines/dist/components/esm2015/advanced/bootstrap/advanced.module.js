import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IntlModule } from "@sinequa/core/intl";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { UtilsModule } from "@sinequa/components/utils";
import { BsAutocompleteModule } from "@sinequa/components/autocomplete";
import { BsAdvancedFormCheckbox } from "./advanced-form-checkbox/advanced-form-checkbox";
import { BsAdvancedFormRange } from "./advanced-form-range/advanced-form-range";
import { BsAdvancedFormSelect } from "./advanced-form-select/advanced-form-select";
import { BsAdvancedFormMultiInput } from './advanced-form-multi-input/advanced-form-multi-input';
import { BsAdvancedFormInput } from './advanced-form-input/advanced-form-input';
import { BsDatePicker } from './advanced-form-range/date-picker/date-picker';
import { BsDateRangePicker } from './advanced-form-range/date-range-picker/date-range-picker';
import { BsSelectComponent } from './advanced-form-select/select/select';
// Directives
import { BsAdvancedFormAutocomplete } from "./advanced-form-autocomplete.directive";
import { BsAdvancedFormValidation } from "./advanced-form-validation.directive";
import { BsAdvancedFormAutocompleteMultiInput } from './advanced-form-multi-input/advanced-form-autocomplete-multi-input.directive';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/datepicker";
export class BsAdvancedModule {
}
BsAdvancedModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsAdvancedModule });
BsAdvancedModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsAdvancedModule_Factory(t) { return new (t || BsAdvancedModule)(); }, imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            IntlModule,
            // ngx-bootstrap
            BsDatepickerModule.forRoot(),
            UtilsModule,
            BsAutocompleteModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsAdvancedModule, { declarations: [BsAdvancedFormCheckbox,
        BsAdvancedFormInput,
        BsAdvancedFormRange,
        BsAdvancedFormSelect,
        BsAdvancedFormMultiInput,
        BsDatePicker,
        BsDateRangePicker,
        BsSelectComponent,
        BsAdvancedFormAutocompleteMultiInput,
        BsAdvancedFormAutocomplete,
        BsAdvancedFormValidation], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IntlModule, i1.BsDatepickerModule, UtilsModule,
        BsAutocompleteModule], exports: [BsAdvancedFormCheckbox,
        BsAdvancedFormInput,
        BsAdvancedFormRange,
        BsAdvancedFormSelect,
        BsAdvancedFormMultiInput,
        BsDatePicker,
        BsDateRangePicker,
        BsSelectComponent,
        BsAdvancedFormAutocompleteMultiInput,
        BsAdvancedFormAutocomplete,
        BsAdvancedFormValidation] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsAdvancedModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    IntlModule,
                    // ngx-bootstrap
                    BsDatepickerModule.forRoot(),
                    UtilsModule,
                    BsAutocompleteModule
                ],
                declarations: [
                    BsAdvancedFormCheckbox,
                    BsAdvancedFormInput,
                    BsAdvancedFormRange,
                    BsAdvancedFormSelect,
                    BsAdvancedFormMultiInput,
                    BsDatePicker,
                    BsDateRangePicker,
                    BsSelectComponent,
                    BsAdvancedFormAutocompleteMultiInput,
                    BsAdvancedFormAutocomplete,
                    BsAdvancedFormValidation,
                ],
                exports: [
                    BsAdvancedFormCheckbox,
                    BsAdvancedFormInput,
                    BsAdvancedFormRange,
                    BsAdvancedFormSelect,
                    BsAdvancedFormMultiInput,
                    BsDatePicker,
                    BsDateRangePicker,
                    BsSelectComponent,
                    BsAdvancedFormAutocompleteMultiInput,
                    BsAdvancedFormAutocomplete,
                    BsAdvancedFormValidation,
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2YW5jZWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvYWR2YW5jZWQvIiwic291cmNlcyI6WyJib290c3RyYXAvYWR2YW5jZWQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFOUMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFNUQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBRXRFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzlFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUM5RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUV6RSxhQUFhO0FBQ2IsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDbEYsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDOUUsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sOEVBQThFLENBQUM7OztBQThDcEksTUFBTSxPQUFPLGdCQUFnQjs7b0RBQWhCLGdCQUFnQjsrR0FBaEIsZ0JBQWdCLGtCQTFDaEI7WUFDTCxZQUFZO1lBQ1osV0FBVztZQUNYLG1CQUFtQjtZQUVuQixVQUFVO1lBRVYsZ0JBQWdCO1lBQ2hCLGtCQUFrQixDQUFDLE9BQU8sRUFBRTtZQUU1QixXQUFXO1lBQ1gsb0JBQW9CO1NBQ3ZCO3dGQThCUSxnQkFBZ0IsbUJBNUJyQixzQkFBc0I7UUFDdEIsbUJBQW1CO1FBQ25CLG1CQUFtQjtRQUNuQixvQkFBb0I7UUFDcEIsd0JBQXdCO1FBQ3hCLFlBQVk7UUFDWixpQkFBaUI7UUFDakIsaUJBQWlCO1FBRWpCLG9DQUFvQztRQUNwQywwQkFBMEI7UUFDMUIsd0JBQXdCLGFBeEJ4QixZQUFZO1FBQ1osV0FBVztRQUNYLG1CQUFtQjtRQUVuQixVQUFVLHlCQUtWLFdBQVc7UUFDWCxvQkFBb0IsYUFpQnBCLHNCQUFzQjtRQUN0QixtQkFBbUI7UUFDbkIsbUJBQW1CO1FBQ25CLG9CQUFvQjtRQUNwQix3QkFBd0I7UUFDeEIsWUFBWTtRQUNaLGlCQUFpQjtRQUNqQixpQkFBaUI7UUFFakIsb0NBQW9DO1FBQ3BDLDBCQUEwQjtRQUMxQix3QkFBd0I7a0RBR25CLGdCQUFnQjtjQTNDNUIsUUFBUTtlQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUVuQixVQUFVO29CQUVWLGdCQUFnQjtvQkFDaEIsa0JBQWtCLENBQUMsT0FBTyxFQUFFO29CQUU1QixXQUFXO29CQUNYLG9CQUFvQjtpQkFDdkI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLHNCQUFzQjtvQkFDdEIsbUJBQW1CO29CQUNuQixtQkFBbUI7b0JBQ25CLG9CQUFvQjtvQkFDcEIsd0JBQXdCO29CQUN4QixZQUFZO29CQUNaLGlCQUFpQjtvQkFDakIsaUJBQWlCO29CQUVqQixvQ0FBb0M7b0JBQ3BDLDBCQUEwQjtvQkFDMUIsd0JBQXdCO2lCQUMzQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsc0JBQXNCO29CQUN0QixtQkFBbUI7b0JBQ25CLG1CQUFtQjtvQkFDbkIsb0JBQW9CO29CQUNwQix3QkFBd0I7b0JBQ3hCLFlBQVk7b0JBQ1osaUJBQWlCO29CQUNqQixpQkFBaUI7b0JBRWpCLG9DQUFvQztvQkFDcEMsMEJBQTBCO29CQUMxQix3QkFBd0I7aUJBQzNCO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuXG5pbXBvcnQge0ludGxNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb3JlL2ludGxcIjtcblxuaW1wb3J0IHtCc0RhdGVwaWNrZXJNb2R1bGV9IGZyb20gXCJuZ3gtYm9vdHN0cmFwL2RhdGVwaWNrZXJcIjtcblxuaW1wb3J0IHtVdGlsc01vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvdXRpbHNcIjtcbmltcG9ydCB7QnNBdXRvY29tcGxldGVNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2F1dG9jb21wbGV0ZVwiO1xuXG5pbXBvcnQge0JzQWR2YW5jZWRGb3JtQ2hlY2tib3h9IGZyb20gXCIuL2FkdmFuY2VkLWZvcm0tY2hlY2tib3gvYWR2YW5jZWQtZm9ybS1jaGVja2JveFwiO1xuaW1wb3J0IHtCc0FkdmFuY2VkRm9ybVJhbmdlfSBmcm9tIFwiLi9hZHZhbmNlZC1mb3JtLXJhbmdlL2FkdmFuY2VkLWZvcm0tcmFuZ2VcIjtcbmltcG9ydCB7QnNBZHZhbmNlZEZvcm1TZWxlY3R9IGZyb20gXCIuL2FkdmFuY2VkLWZvcm0tc2VsZWN0L2FkdmFuY2VkLWZvcm0tc2VsZWN0XCI7XG5pbXBvcnQgeyBCc0FkdmFuY2VkRm9ybU11bHRpSW5wdXQgfSBmcm9tICcuL2FkdmFuY2VkLWZvcm0tbXVsdGktaW5wdXQvYWR2YW5jZWQtZm9ybS1tdWx0aS1pbnB1dCc7XG5pbXBvcnQgeyBCc0FkdmFuY2VkRm9ybUlucHV0IH0gZnJvbSAnLi9hZHZhbmNlZC1mb3JtLWlucHV0L2FkdmFuY2VkLWZvcm0taW5wdXQnO1xuaW1wb3J0IHsgQnNEYXRlUGlja2VyIH0gZnJvbSAnLi9hZHZhbmNlZC1mb3JtLXJhbmdlL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyJztcbmltcG9ydCB7IEJzRGF0ZVJhbmdlUGlja2VyIH0gZnJvbSAnLi9hZHZhbmNlZC1mb3JtLXJhbmdlL2RhdGUtcmFuZ2UtcGlja2VyL2RhdGUtcmFuZ2UtcGlja2VyJztcbmltcG9ydCB7IEJzU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9hZHZhbmNlZC1mb3JtLXNlbGVjdC9zZWxlY3Qvc2VsZWN0JztcblxuLy8gRGlyZWN0aXZlc1xuaW1wb3J0IHtCc0FkdmFuY2VkRm9ybUF1dG9jb21wbGV0ZX0gZnJvbSBcIi4vYWR2YW5jZWQtZm9ybS1hdXRvY29tcGxldGUuZGlyZWN0aXZlXCI7XG5pbXBvcnQge0JzQWR2YW5jZWRGb3JtVmFsaWRhdGlvbn0gZnJvbSBcIi4vYWR2YW5jZWQtZm9ybS12YWxpZGF0aW9uLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHsgQnNBZHZhbmNlZEZvcm1BdXRvY29tcGxldGVNdWx0aUlucHV0IH0gZnJvbSAnLi9hZHZhbmNlZC1mb3JtLW11bHRpLWlucHV0L2FkdmFuY2VkLWZvcm0tYXV0b2NvbXBsZXRlLW11bHRpLWlucHV0LmRpcmVjdGl2ZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG5cbiAgICAgICAgSW50bE1vZHVsZSxcblxuICAgICAgICAvLyBuZ3gtYm9vdHN0cmFwXG4gICAgICAgIEJzRGF0ZXBpY2tlck1vZHVsZS5mb3JSb290KCksXG5cbiAgICAgICAgVXRpbHNNb2R1bGUsXG4gICAgICAgIEJzQXV0b2NvbXBsZXRlTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQnNBZHZhbmNlZEZvcm1DaGVja2JveCxcbiAgICAgICAgQnNBZHZhbmNlZEZvcm1JbnB1dCxcbiAgICAgICAgQnNBZHZhbmNlZEZvcm1SYW5nZSxcbiAgICAgICAgQnNBZHZhbmNlZEZvcm1TZWxlY3QsXG4gICAgICAgIEJzQWR2YW5jZWRGb3JtTXVsdGlJbnB1dCxcbiAgICAgICAgQnNEYXRlUGlja2VyLFxuICAgICAgICBCc0RhdGVSYW5nZVBpY2tlcixcbiAgICAgICAgQnNTZWxlY3RDb21wb25lbnQsXG5cbiAgICAgICAgQnNBZHZhbmNlZEZvcm1BdXRvY29tcGxldGVNdWx0aUlucHV0LFxuICAgICAgICBCc0FkdmFuY2VkRm9ybUF1dG9jb21wbGV0ZSxcbiAgICAgICAgQnNBZHZhbmNlZEZvcm1WYWxpZGF0aW9uLFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBCc0FkdmFuY2VkRm9ybUNoZWNrYm94LFxuICAgICAgICBCc0FkdmFuY2VkRm9ybUlucHV0LFxuICAgICAgICBCc0FkdmFuY2VkRm9ybVJhbmdlLFxuICAgICAgICBCc0FkdmFuY2VkRm9ybVNlbGVjdCxcbiAgICAgICAgQnNBZHZhbmNlZEZvcm1NdWx0aUlucHV0LFxuICAgICAgICBCc0RhdGVQaWNrZXIsXG4gICAgICAgIEJzRGF0ZVJhbmdlUGlja2VyLFxuICAgICAgICBCc1NlbGVjdENvbXBvbmVudCxcblxuICAgICAgICBCc0FkdmFuY2VkRm9ybUF1dG9jb21wbGV0ZU11bHRpSW5wdXQsXG4gICAgICAgIEJzQWR2YW5jZWRGb3JtQXV0b2NvbXBsZXRlLFxuICAgICAgICBCc0FkdmFuY2VkRm9ybVZhbGlkYXRpb24sXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBCc0FkdmFuY2VkTW9kdWxlIHtcbn1cbiJdfQ==