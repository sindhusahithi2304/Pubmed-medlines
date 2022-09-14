import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IntlModule } from "@sinequa/core/intl";
import { ValidationModule } from "@sinequa/core/validation";
import { BsModalModule } from "@sinequa/components/modal";
import { BsActionModule } from "@sinequa/components/action";
import { UtilsModule } from "@sinequa/components/utils";
import { BsEditUserSettings } from "./edit-user-settings/edit-user-settings";
import { BsUserSettingsEditor } from './user-settings-editor/user-settings-editor';
import { BsUserMenuComponent } from './user-menu/user-menu.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@sinequa/components/modal";
export class BsUserSettingsModule {
}
BsUserSettingsModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsUserSettingsModule });
BsUserSettingsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsUserSettingsModule_Factory(t) { return new (t || BsUserSettingsModule)(); }, imports: [[
            CommonModule,
            FormsModule, ReactiveFormsModule,
            IntlModule,
            ValidationModule,
            BsModalModule,
            BsActionModule,
            UtilsModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsUserSettingsModule, { declarations: [BsEditUserSettings, BsUserSettingsEditor, BsUserMenuComponent], imports: [CommonModule,
        FormsModule, ReactiveFormsModule,
        IntlModule,
        ValidationModule,
        BsModalModule,
        BsActionModule,
        UtilsModule], exports: [BsEditUserSettings, BsUserSettingsEditor, BsUserMenuComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsUserSettingsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule, ReactiveFormsModule,
                    IntlModule,
                    ValidationModule,
                    BsModalModule,
                    BsActionModule,
                    UtilsModule,
                ],
                declarations: [
                    BsEditUserSettings, BsUserSettingsEditor, BsUserMenuComponent
                ],
                exports: [
                    BsEditUserSettings, BsUserSettingsEditor, BsUserMenuComponent
                ],
            }]
    }], null, null); })();
i0.ɵɵsetComponentScope(BsEditUserSettings, [i1.ɵangular_packages_forms_forms_y, i1.NgControlStatusGroup, i1.FormGroupDirective, i2.BsModal, BsUserSettingsEditor], []);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1zZXR0aW5ncy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy91c2VyLXNldHRpbmdzLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL3VzZXItc2V0dGluZ3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFMUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFdEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDM0UsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFDakYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0saUNBQWlDLENBQUM7Ozs7QUFxQnBFLE1BQU0sT0FBTyxvQkFBb0I7O3dEQUFwQixvQkFBb0I7dUhBQXBCLG9CQUFvQixrQkFsQnBCO1lBQ0wsWUFBWTtZQUNaLFdBQVcsRUFBRSxtQkFBbUI7WUFFaEMsVUFBVTtZQUNWLGdCQUFnQjtZQUVoQixhQUFhO1lBQ2IsY0FBYztZQUNkLFdBQVc7U0FDZDt3RkFRUSxvQkFBb0IsbUJBTnpCLGtCQUFrQixFQUFFLG9CQUFvQixFQUFFLG1CQUFtQixhQVg3RCxZQUFZO1FBQ1osV0FBVyxFQUFFLG1CQUFtQjtRQUVoQyxVQUFVO1FBQ1YsZ0JBQWdCO1FBRWhCLGFBQWE7UUFDYixjQUFjO1FBQ2QsV0FBVyxhQU1YLGtCQUFrQixFQUFFLG9CQUFvQixFQUFFLG1CQUFtQjtrREFHeEQsb0JBQW9CO2NBbkJoQyxRQUFRO2VBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osV0FBVyxFQUFFLG1CQUFtQjtvQkFFaEMsVUFBVTtvQkFDVixnQkFBZ0I7b0JBRWhCLGFBQWE7b0JBQ2IsY0FBYztvQkFDZCxXQUFXO2lCQUNkO2dCQUNELFlBQVksRUFBRTtvQkFDVixrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSxtQkFBbUI7aUJBQ2hFO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSxtQkFBbUI7aUJBQ2hFO2FBQ0o7O3VCQUxPLGtCQUFrQixtR0FBRSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuXG5pbXBvcnQge0ludGxNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb3JlL2ludGxcIjtcbmltcG9ydCB7VmFsaWRhdGlvbk1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvdmFsaWRhdGlvblwiO1xuXG5pbXBvcnQge0JzTW9kYWxNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL21vZGFsXCI7XG5pbXBvcnQge0JzQWN0aW9uTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9hY3Rpb25cIjtcbmltcG9ydCB7VXRpbHNNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3V0aWxzXCI7XG5cbmltcG9ydCB7QnNFZGl0VXNlclNldHRpbmdzfSBmcm9tIFwiLi9lZGl0LXVzZXItc2V0dGluZ3MvZWRpdC11c2VyLXNldHRpbmdzXCI7XG5pbXBvcnQge0JzVXNlclNldHRpbmdzRWRpdG9yfSBmcm9tICcuL3VzZXItc2V0dGluZ3MtZWRpdG9yL3VzZXItc2V0dGluZ3MtZWRpdG9yJztcbmltcG9ydCB7QnNVc2VyTWVudUNvbXBvbmVudH0gZnJvbSAnLi91c2VyLW1lbnUvdXNlci1tZW51LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuXG4gICAgICAgIEludGxNb2R1bGUsXG4gICAgICAgIFZhbGlkYXRpb25Nb2R1bGUsXG5cbiAgICAgICAgQnNNb2RhbE1vZHVsZSxcbiAgICAgICAgQnNBY3Rpb25Nb2R1bGUsXG4gICAgICAgIFV0aWxzTW9kdWxlLFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEJzRWRpdFVzZXJTZXR0aW5ncywgQnNVc2VyU2V0dGluZ3NFZGl0b3IsIEJzVXNlck1lbnVDb21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgQnNFZGl0VXNlclNldHRpbmdzLCBCc1VzZXJTZXR0aW5nc0VkaXRvciwgQnNVc2VyTWVudUNvbXBvbmVudFxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIEJzVXNlclNldHRpbmdzTW9kdWxlIHtcbn1cbiJdfQ==