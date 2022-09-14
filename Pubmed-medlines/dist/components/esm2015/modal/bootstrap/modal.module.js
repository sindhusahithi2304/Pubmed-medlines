import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule as CoreModalModule } from "@sinequa/core/modal";
import { LoginModule } from "@sinequa/core/login";
import { IntlModule } from "@sinequa/core/intl";
import { ValidationModule } from "@sinequa/core/validation";
import { UtilsModule } from "@sinequa/components/utils";
import { BsModal } from "./modal.component";
import { BsModalHeader } from "./modal-header.component";
import { BsModalFooter } from "./modal-footer.component";
import { BsLogin } from "./login.component";
import { BsConfirm } from "./confirm.component";
import { BsPrompt } from "./prompt.component";
import { BsHelp } from "./help/help";
import { BsOverrideUser } from "./override-user/override-user";
import { BsEditable } from "./editable/editable";
import { OverlayModule } from "@angular/cdk/overlay";
import { A11yModule } from "@angular/cdk/a11y";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/modal";
import * as i2 from "@sinequa/core/login";
export class BsModalModule {
}
BsModalModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsModalModule });
BsModalModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsModalModule_Factory(t) { return new (t || BsModalModule)(); }, imports: [[
            CommonModule,
            FormsModule, ReactiveFormsModule,
            OverlayModule,
            A11yModule,
            IntlModule,
            ValidationModule,
            CoreModalModule.forRoot(BsConfirm, BsPrompt),
            LoginModule.forRoot(BsLogin),
            UtilsModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsModalModule, { declarations: [BsModal, BsModalHeader, BsModalFooter, BsLogin, BsConfirm,
        BsHelp, BsOverrideUser, BsEditable, BsPrompt], imports: [CommonModule,
        FormsModule, ReactiveFormsModule,
        OverlayModule,
        A11yModule,
        IntlModule,
        ValidationModule, i1.ModalModule, i2.LoginModule, UtilsModule], exports: [BsModal, BsModalHeader, BsModalFooter, BsLogin, BsConfirm,
        BsHelp, BsOverrideUser, BsEditable, BsPrompt] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsModalModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule, ReactiveFormsModule,
                    OverlayModule,
                    A11yModule,
                    IntlModule,
                    ValidationModule,
                    CoreModalModule.forRoot(BsConfirm, BsPrompt),
                    LoginModule.forRoot(BsLogin),
                    UtilsModule,
                ],
                declarations: [
                    BsModal, BsModalHeader, BsModalFooter, BsLogin, BsConfirm,
                    BsHelp, BsOverrideUser, BsEditable, BsPrompt
                ],
                exports: [
                    BsModal, BsModalHeader, BsModalFooter, BsLogin, BsConfirm,
                    BsHelp, BsOverrideUser, BsEditable, BsPrompt
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvbW9kYWwvIiwic291cmNlcyI6WyJib290c3RyYXAvbW9kYWwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRSxPQUFPLEVBQUMsV0FBVyxJQUFJLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ25FLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFMUQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXRELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDbkMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUUvQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG1CQUFtQixDQUFDOzs7O0FBeUI3QyxNQUFNLE9BQU8sYUFBYTs7aURBQWIsYUFBYTt5R0FBYixhQUFhLGtCQXRCYjtZQUNMLFlBQVk7WUFDWixXQUFXLEVBQUUsbUJBQW1CO1lBQ2hDLGFBQWE7WUFDYixVQUFVO1lBRVYsVUFBVTtZQUNWLGdCQUFnQjtZQUNoQixlQUFlLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7WUFDNUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFFNUIsV0FBVztTQUNkO3dGQVVRLGFBQWEsbUJBUmxCLE9BQU8sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxTQUFTO1FBQ3pELE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsYUFkNUMsWUFBWTtRQUNaLFdBQVcsRUFBRSxtQkFBbUI7UUFDaEMsYUFBYTtRQUNiLFVBQVU7UUFFVixVQUFVO1FBQ1YsZ0JBQWdCLGtDQUloQixXQUFXLGFBT1gsT0FBTyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLFNBQVM7UUFDekQsTUFBTSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsUUFBUTtrREFHdkMsYUFBYTtjQXZCekIsUUFBUTtlQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFdBQVcsRUFBRSxtQkFBbUI7b0JBQ2hDLGFBQWE7b0JBQ2IsVUFBVTtvQkFFVixVQUFVO29CQUNWLGdCQUFnQjtvQkFDaEIsZUFBZSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDO29CQUM1QyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztvQkFFNUIsV0FBVztpQkFDZDtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsT0FBTyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLFNBQVM7b0JBQ3pELE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVE7aUJBQy9DO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsU0FBUztvQkFDekQsTUFBTSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsUUFBUTtpQkFDL0M7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuXG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcblxuaW1wb3J0IHtNb2RhbE1vZHVsZSBhcyBDb3JlTW9kYWxNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb3JlL21vZGFsXCI7XG5pbXBvcnQge0xvZ2luTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9sb2dpblwiO1xuaW1wb3J0IHtJbnRsTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9pbnRsXCI7XG5pbXBvcnQge1ZhbGlkYXRpb25Nb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb3JlL3ZhbGlkYXRpb25cIjtcblxuaW1wb3J0IHtVdGlsc01vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvdXRpbHNcIjtcblxuaW1wb3J0IHtCc01vZGFsfSBmcm9tIFwiLi9tb2RhbC5jb21wb25lbnRcIjtcbmltcG9ydCB7QnNNb2RhbEhlYWRlcn0gZnJvbSBcIi4vbW9kYWwtaGVhZGVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtCc01vZGFsRm9vdGVyfSBmcm9tIFwiLi9tb2RhbC1mb290ZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge0JzTG9naW59IGZyb20gXCIuL2xvZ2luLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtCc0NvbmZpcm19IGZyb20gXCIuL2NvbmZpcm0uY29tcG9uZW50XCI7XG5pbXBvcnQge0JzUHJvbXB0fSBmcm9tIFwiLi9wcm9tcHQuY29tcG9uZW50XCI7XG5pbXBvcnQge0JzSGVscH0gZnJvbSBcIi4vaGVscC9oZWxwXCI7XG5pbXBvcnQge0JzT3ZlcnJpZGVVc2VyfSBmcm9tIFwiLi9vdmVycmlkZS11c2VyL292ZXJyaWRlLXVzZXJcIjtcbmltcG9ydCB7QnNFZGl0YWJsZX0gZnJvbSBcIi4vZWRpdGFibGUvZWRpdGFibGVcIjtcblxuaW1wb3J0IHtPdmVybGF5TW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY2RrL292ZXJsYXlcIjtcbmltcG9ydCB7QTExeU1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2Nkay9hMTF5XCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBPdmVybGF5TW9kdWxlLFxuICAgICAgICBBMTF5TW9kdWxlLFxuXG4gICAgICAgIEludGxNb2R1bGUsXG4gICAgICAgIFZhbGlkYXRpb25Nb2R1bGUsXG4gICAgICAgIENvcmVNb2RhbE1vZHVsZS5mb3JSb290KEJzQ29uZmlybSwgQnNQcm9tcHQpLFxuICAgICAgICBMb2dpbk1vZHVsZS5mb3JSb290KEJzTG9naW4pLFxuXG4gICAgICAgIFV0aWxzTW9kdWxlLFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEJzTW9kYWwsIEJzTW9kYWxIZWFkZXIsIEJzTW9kYWxGb290ZXIsIEJzTG9naW4sIEJzQ29uZmlybSxcbiAgICAgICAgQnNIZWxwLCBCc092ZXJyaWRlVXNlciwgQnNFZGl0YWJsZSwgQnNQcm9tcHRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgQnNNb2RhbCwgQnNNb2RhbEhlYWRlciwgQnNNb2RhbEZvb3RlciwgQnNMb2dpbiwgQnNDb25maXJtLFxuICAgICAgICBCc0hlbHAsIEJzT3ZlcnJpZGVVc2VyLCBCc0VkaXRhYmxlLCBCc1Byb21wdFxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIEJzTW9kYWxNb2R1bGUge1xufSJdfQ==