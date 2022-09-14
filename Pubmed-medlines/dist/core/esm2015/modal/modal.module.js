import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { A11yModule } from "@angular/cdk/a11y";
import { OverlayModule } from "@angular/cdk/overlay";
// Sinequa modules
import { BaseModule } from "@sinequa/core/base";
import { IntlModule } from "@sinequa/core/intl";
import { ValidationModule } from "@sinequa/core/validation";
import { MODAL_CONFIRM } from "./modal.service";
import { MODAL_PROMPT } from "./modal.service";
import { MODAL_MODULE_PROVIDERS } from "./module.providers";
import { Confirm } from "./confirm.component";
import { Prompt } from './prompt.component';
import * as i0 from "@angular/core";
/**
 * This module contains an implementation of a [modal dialog service]{@link ModalService} which can be extended
 * to support UI frameworks such as Bootstrap and Material Design. It uses the `Overlay` and `Portal` funcionality
 * provided by the [Angular CDK]{@link https://material.angular.io/cdk/categories} library.
 */
export class ModalModule {
    static forRoot(confirmModal = Confirm, promptModal = Prompt) {
        return {
            ngModule: ModalModule,
            providers: [
                { provide: MODAL_CONFIRM, useValue: confirmModal },
                { provide: MODAL_PROMPT, useValue: promptModal },
            ]
        };
    }
}
ModalModule.ɵmod = i0.ɵɵdefineNgModule({ type: ModalModule });
ModalModule.ɵinj = i0.ɵɵdefineInjector({ factory: function ModalModule_Factory(t) { return new (t || ModalModule)(); }, providers: [
        ...MODAL_MODULE_PROVIDERS
    ], imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            // CDK
            OverlayModule,
            A11yModule,
            // Sinequa modules
            BaseModule,
            IntlModule,
            ValidationModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ModalModule, { declarations: [Confirm,
        Prompt], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // CDK
        OverlayModule,
        A11yModule,
        // Sinequa modules
        BaseModule,
        IntlModule,
        ValidationModule] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ModalModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    // CDK
                    OverlayModule,
                    A11yModule,
                    // Sinequa modules
                    BaseModule,
                    IntlModule,
                    ValidationModule,
                ],
                declarations: [
                    Confirm,
                    Prompt
                ],
                exports: [],
                providers: [
                    ...MODAL_MODULE_PROVIDERS
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvbW9kYWwvIiwic291cmNlcyI6WyJtb2RhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRW5ELGtCQUFrQjtBQUNsQixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRTFELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFN0MsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFMUQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7QUFFMUM7Ozs7R0FJRztBQTBCSCxNQUFNLE9BQU8sV0FBVztJQUNwQixNQUFNLENBQUMsT0FBTyxDQUFDLGVBQTBCLE9BQU8sRUFBRSxjQUF5QixNQUFNO1FBQzdFLE9BQU87WUFDSCxRQUFRLEVBQUUsV0FBVztZQUNyQixTQUFTLEVBQUU7Z0JBQ1AsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUM7Z0JBQ2hELEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFDO2FBQ2pEO1NBQ0osQ0FBQztJQUNOLENBQUM7OytDQVRRLFdBQVc7cUdBQVgsV0FBVyxtQkFKVDtRQUNQLEdBQUcsc0JBQXNCO0tBQzVCLFlBdEJRO1lBQ0wsWUFBWTtZQUNaLFdBQVc7WUFDWCxtQkFBbUI7WUFFbkIsTUFBTTtZQUNOLGFBQWE7WUFDYixVQUFVO1lBRVYsa0JBQWtCO1lBQ2xCLFVBQVU7WUFDVixVQUFVO1lBQ1YsZ0JBQWdCO1NBQ25CO3dGQVdRLFdBQVcsbUJBVGhCLE9BQU87UUFDUCxNQUFNLGFBZk4sWUFBWTtRQUNaLFdBQVc7UUFDWCxtQkFBbUI7UUFFbkIsTUFBTTtRQUNOLGFBQWE7UUFDYixVQUFVO1FBRVYsa0JBQWtCO1FBQ2xCLFVBQVU7UUFDVixVQUFVO1FBQ1YsZ0JBQWdCO2tEQVlYLFdBQVc7Y0F6QnZCLFFBQVE7ZUFBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixXQUFXO29CQUNYLG1CQUFtQjtvQkFFbkIsTUFBTTtvQkFDTixhQUFhO29CQUNiLFVBQVU7b0JBRVYsa0JBQWtCO29CQUNsQixVQUFVO29CQUNWLFVBQVU7b0JBQ1YsZ0JBQWdCO2lCQUNuQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsT0FBTztvQkFDUCxNQUFNO2lCQUNUO2dCQUNELE9BQU8sRUFBRSxFQUNSO2dCQUNELFNBQVMsRUFBRTtvQkFDUCxHQUFHLHNCQUFzQjtpQkFDNUI7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFR5cGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5cbmltcG9ydCB7QTExeU1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2Nkay9hMTF5XCI7XG5pbXBvcnQge092ZXJsYXlNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jZGsvb3ZlcmxheVwiO1xuXG4vLyBTaW5lcXVhIG1vZHVsZXNcbmltcG9ydCB7QmFzZU1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHtJbnRsTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9pbnRsXCI7XG5pbXBvcnQge1ZhbGlkYXRpb25Nb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb3JlL3ZhbGlkYXRpb25cIjtcblxuaW1wb3J0IHtNT0RBTF9DT05GSVJNfSBmcm9tIFwiLi9tb2RhbC5zZXJ2aWNlXCI7XG5pbXBvcnQge01PREFMX1BST01QVH0gZnJvbSBcIi4vbW9kYWwuc2VydmljZVwiO1xuXG5pbXBvcnQge01PREFMX01PRFVMRV9QUk9WSURFUlN9IGZyb20gXCIuL21vZHVsZS5wcm92aWRlcnNcIjtcblxuaW1wb3J0IHtDb25maXJtfSBmcm9tIFwiLi9jb25maXJtLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtQcm9tcHR9IGZyb20gJy4vcHJvbXB0LmNvbXBvbmVudCc7XG5cbi8qKlxuICogVGhpcyBtb2R1bGUgY29udGFpbnMgYW4gaW1wbGVtZW50YXRpb24gb2YgYSBbbW9kYWwgZGlhbG9nIHNlcnZpY2Vde0BsaW5rIE1vZGFsU2VydmljZX0gd2hpY2ggY2FuIGJlIGV4dGVuZGVkXG4gKiB0byBzdXBwb3J0IFVJIGZyYW1ld29ya3Mgc3VjaCBhcyBCb290c3RyYXAgYW5kIE1hdGVyaWFsIERlc2lnbi4gSXQgdXNlcyB0aGUgYE92ZXJsYXlgIGFuZCBgUG9ydGFsYCBmdW5jaW9uYWxpdHlcbiAqIHByb3ZpZGVkIGJ5IHRoZSBbQW5ndWxhciBDREtde0BsaW5rIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9jZGsvY2F0ZWdvcmllc30gbGlicmFyeS5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG5cbiAgICAgICAgLy8gQ0RLXG4gICAgICAgIE92ZXJsYXlNb2R1bGUsIC8vIE5lZWRlZCBmb3IgdGhlIG1vZGFsIHNlcnZpY2VcbiAgICAgICAgQTExeU1vZHVsZSxcblxuICAgICAgICAvLyBTaW5lcXVhIG1vZHVsZXNcbiAgICAgICAgQmFzZU1vZHVsZSxcbiAgICAgICAgSW50bE1vZHVsZSxcbiAgICAgICAgVmFsaWRhdGlvbk1vZHVsZSxcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDb25maXJtLCAgICAvLyBEZWZhdWx0IGNvbmZpcm1cbiAgICAgICAgUHJvbXB0XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgLi4uTU9EQUxfTU9EVUxFX1BST1ZJREVSU1xuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxNb2R1bGUge1xuICAgIHN0YXRpYyBmb3JSb290KGNvbmZpcm1Nb2RhbDogVHlwZTxhbnk+ID0gQ29uZmlybSwgcHJvbXB0TW9kYWw6IFR5cGU8YW55PiA9IFByb21wdCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8TW9kYWxNb2R1bGU+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBNb2RhbE1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIHtwcm92aWRlOiBNT0RBTF9DT05GSVJNLCB1c2VWYWx1ZTogY29uZmlybU1vZGFsfSxcbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogTU9EQUxfUFJPTVBULCB1c2VWYWx1ZTogcHJvbXB0TW9kYWx9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==