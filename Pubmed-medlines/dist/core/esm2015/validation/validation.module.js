import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BaseModule } from "@sinequa/core/base";
import { AppUtilsModule } from "@sinequa/core/app-utils";
import { IntlModule } from "@sinequa/core/intl";
import { LoadComponentModule } from "@sinequa/core/load-component";
import { ValidationDirective, VALIDATION_MESSAGE_COMPONENT } from "./validation.directive";
import { ValidationErrorPipe } from "./validation-error.pipe";
import { ValidationMessageComponent } from "./validation-message.component";
import { VALIDATION_MODULE_PROVIDERS } from "./module.providers";
import * as i0 from "@angular/core";
/**
 * This module contains facilities for working with Angular's form validation. It provides a
 * {@link ValidationService} that works with {@link IntlService} and {@link FormatService} to
 * support locale-sensitive validators.
 */
export class ValidationModule {
}
ValidationModule.ɵmod = i0.ɵɵdefineNgModule({ type: ValidationModule });
ValidationModule.ɵinj = i0.ɵɵdefineInjector({ factory: function ValidationModule_Factory(t) { return new (t || ValidationModule)(); }, providers: [
        { provide: VALIDATION_MESSAGE_COMPONENT, useValue: ValidationMessageComponent },
        ...VALIDATION_MODULE_PROVIDERS
    ], imports: [[
            CommonModule,
            BaseModule,
            AppUtilsModule,
            IntlModule,
            LoadComponentModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ValidationModule, { declarations: [ValidationDirective, ValidationMessageComponent, ValidationErrorPipe], imports: [CommonModule,
        BaseModule,
        AppUtilsModule,
        IntlModule,
        LoadComponentModule], exports: [ValidationDirective, ValidationMessageComponent, ValidationErrorPipe] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ValidationModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    BaseModule,
                    AppUtilsModule,
                    IntlModule,
                    LoadComponentModule
                ],
                declarations: [
                    ValidationDirective, ValidationMessageComponent, ValidationErrorPipe,
                ],
                exports: [
                    ValidationDirective, ValidationMessageComponent, ValidationErrorPipe,
                ],
                providers: [
                    { provide: VALIDATION_MESSAGE_COMPONENT, useValue: ValidationMessageComponent },
                    ...VALIDATION_MODULE_PROVIDERS
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS92YWxpZGF0aW9uLyIsInNvdXJjZXMiOlsidmFsaWRhdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFFakUsT0FBTyxFQUFDLG1CQUFtQixFQUFFLDRCQUE0QixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDekYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFFMUUsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7O0FBRS9EOzs7O0dBSUc7QUFxQkgsTUFBTSxPQUFPLGdCQUFnQjs7b0RBQWhCLGdCQUFnQjsrR0FBaEIsZ0JBQWdCLG1CQU5kO1FBQ1AsRUFBQyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixFQUFDO1FBRTdFLEdBQUcsMkJBQTJCO0tBQ2pDLFlBakJRO1lBQ0wsWUFBWTtZQUNaLFVBQVU7WUFDVixjQUFjO1lBQ2QsVUFBVTtZQUNWLG1CQUFtQjtTQUN0Qjt3RkFhUSxnQkFBZ0IsbUJBWHJCLG1CQUFtQixFQUFFLDBCQUEwQixFQUFFLG1CQUFtQixhQVBwRSxZQUFZO1FBQ1osVUFBVTtRQUNWLGNBQWM7UUFDZCxVQUFVO1FBQ1YsbUJBQW1CLGFBTW5CLG1CQUFtQixFQUFFLDBCQUEwQixFQUFFLG1CQUFtQjtrREFRL0QsZ0JBQWdCO2NBcEI1QixRQUFRO2VBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osVUFBVTtvQkFDVixjQUFjO29CQUNkLFVBQVU7b0JBQ1YsbUJBQW1CO2lCQUN0QjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsbUJBQW1CLEVBQUUsMEJBQTBCLEVBQUUsbUJBQW1CO2lCQUN2RTtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsbUJBQW1CLEVBQUUsMEJBQTBCLEVBQUUsbUJBQW1CO2lCQUN2RTtnQkFDRCxTQUFTLEVBQUU7b0JBQ1AsRUFBQyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixFQUFDO29CQUU3RSxHQUFHLDJCQUEyQjtpQkFDakM7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuXG5pbXBvcnQge0Jhc2VNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7QXBwVXRpbHNNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb3JlL2FwcC11dGlsc1wiO1xuaW1wb3J0IHtJbnRsTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9pbnRsXCI7XG5pbXBvcnQge0xvYWRDb21wb25lbnRNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb3JlL2xvYWQtY29tcG9uZW50XCI7XG5cbmltcG9ydCB7VmFsaWRhdGlvbkRpcmVjdGl2ZSwgVkFMSURBVElPTl9NRVNTQUdFX0NPTVBPTkVOVH0gZnJvbSBcIi4vdmFsaWRhdGlvbi5kaXJlY3RpdmVcIjtcbmltcG9ydCB7VmFsaWRhdGlvbkVycm9yUGlwZX0gZnJvbSBcIi4vdmFsaWRhdGlvbi1lcnJvci5waXBlXCI7XG5pbXBvcnQge1ZhbGlkYXRpb25NZXNzYWdlQ29tcG9uZW50fSBmcm9tIFwiLi92YWxpZGF0aW9uLW1lc3NhZ2UuY29tcG9uZW50XCI7XG5cbmltcG9ydCB7VkFMSURBVElPTl9NT0RVTEVfUFJPVklERVJTfSBmcm9tIFwiLi9tb2R1bGUucHJvdmlkZXJzXCI7XG5cbi8qKlxuICogVGhpcyBtb2R1bGUgY29udGFpbnMgZmFjaWxpdGllcyBmb3Igd29ya2luZyB3aXRoIEFuZ3VsYXIncyBmb3JtIHZhbGlkYXRpb24uIEl0IHByb3ZpZGVzIGFcbiAqIHtAbGluayBWYWxpZGF0aW9uU2VydmljZX0gdGhhdCB3b3JrcyB3aXRoIHtAbGluayBJbnRsU2VydmljZX0gYW5kIHtAbGluayBGb3JtYXRTZXJ2aWNlfSB0b1xuICogc3VwcG9ydCBsb2NhbGUtc2Vuc2l0aXZlIHZhbGlkYXRvcnMuXG4gKi9cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEJhc2VNb2R1bGUsXG4gICAgICAgIEFwcFV0aWxzTW9kdWxlLFxuICAgICAgICBJbnRsTW9kdWxlLFxuICAgICAgICBMb2FkQ29tcG9uZW50TW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgVmFsaWRhdGlvbkRpcmVjdGl2ZSwgVmFsaWRhdGlvbk1lc3NhZ2VDb21wb25lbnQsIFZhbGlkYXRpb25FcnJvclBpcGUsXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFZhbGlkYXRpb25EaXJlY3RpdmUsIFZhbGlkYXRpb25NZXNzYWdlQ29tcG9uZW50LCBWYWxpZGF0aW9uRXJyb3JQaXBlLFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBWQUxJREFUSU9OX01FU1NBR0VfQ09NUE9ORU5ULCB1c2VWYWx1ZTogVmFsaWRhdGlvbk1lc3NhZ2VDb21wb25lbnR9LFxuXG4gICAgICAgIC4uLlZBTElEQVRJT05fTU9EVUxFX1BST1ZJREVSU1xuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvbk1vZHVsZSB7XG59XG4iXX0=