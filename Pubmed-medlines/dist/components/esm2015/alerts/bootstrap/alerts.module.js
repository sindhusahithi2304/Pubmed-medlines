import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { IntlModule } from "@sinequa/core/intl";
import { ValidationModule } from "@sinequa/core/validation";
import { UtilsModule } from "@sinequa/components/utils";
import { BsActionModule } from "@sinequa/components/action";
import { BsModalModule } from "@sinequa/components/modal";
import { ALERT_COMPONENTS, WINDOW } from "../alerts.service";
import { BsEditAlert } from "./edit-alert/edit-alert";
import { BsManageAlerts } from "./manage-alerts/manage-alerts";
import { BsAlertsMenuComponent } from "./alerts-menu/alerts-menu.component";
import { BsAlertMessageComponent } from "./alert-message/alert-message.component";
import * as i0 from "@angular/core";
function windowFactory() {
    return window;
}
export class BsAlertsModule {
}
BsAlertsModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsAlertsModule });
BsAlertsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsAlertsModule_Factory(t) { return new (t || BsAlertsModule)(); }, providers: [
        {
            provide: ALERT_COMPONENTS,
            useValue: {
                editAlertModal: BsEditAlert,
                manageAlertsModal: BsManageAlerts
            }
        },
        {
            provide: WINDOW,
            useFactory: windowFactory
        }
    ], imports: [[
            CommonModule,
            FormsModule, ReactiveFormsModule,
            DragDropModule,
            BsModalModule,
            IntlModule,
            ValidationModule,
            UtilsModule,
            BsActionModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsAlertsModule, { declarations: [BsEditAlert, BsManageAlerts, BsAlertsMenuComponent, BsAlertMessageComponent], imports: [CommonModule,
        FormsModule, ReactiveFormsModule,
        DragDropModule,
        BsModalModule,
        IntlModule,
        ValidationModule,
        UtilsModule,
        BsActionModule], exports: [BsEditAlert, BsManageAlerts, BsAlertsMenuComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsAlertsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule, ReactiveFormsModule,
                    DragDropModule,
                    BsModalModule,
                    IntlModule,
                    ValidationModule,
                    UtilsModule,
                    BsActionModule
                ],
                declarations: [
                    BsEditAlert, BsManageAlerts, BsAlertsMenuComponent, BsAlertMessageComponent
                ],
                exports: [
                    BsEditAlert, BsManageAlerts, BsAlertsMenuComponent
                ],
                providers: [
                    {
                        provide: ALERT_COMPONENTS,
                        useValue: {
                            editAlertModal: BsEditAlert,
                            manageAlertsModal: BsManageAlerts
                        }
                    },
                    {
                        provide: WINDOW,
                        useFactory: windowFactory
                    }
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2FsZXJ0cy8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9hbGVydHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFdEQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRTFELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDMUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXhELE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxNQUFNLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDcEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHlDQUF5QyxDQUFDOztBQUVoRixTQUFTLGFBQWE7SUFDbEIsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQW9DRCxNQUFNLE9BQU8sY0FBYzs7a0RBQWQsY0FBYzsyR0FBZCxjQUFjLG1CQWRaO1FBQ1A7WUFDSSxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLFFBQVEsRUFBRTtnQkFDTixjQUFjLEVBQUUsV0FBVztnQkFDM0IsaUJBQWlCLEVBQUUsY0FBYzthQUNwQztTQUNKO1FBQ0Q7WUFDSSxPQUFPLEVBQUUsTUFBTTtZQUNmLFVBQVUsRUFBRSxhQUFhO1NBQzVCO0tBQ0osWUEvQlE7WUFDTCxZQUFZO1lBQ1osV0FBVyxFQUFFLG1CQUFtQjtZQUNoQyxjQUFjO1lBRWQsYUFBYTtZQUViLFVBQVU7WUFDVixnQkFBZ0I7WUFFaEIsV0FBVztZQUNYLGNBQWM7U0FDakI7d0ZBcUJRLGNBQWMsbUJBbkJuQixXQUFXLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUFFLHVCQUF1QixhQWIzRSxZQUFZO1FBQ1osV0FBVyxFQUFFLG1CQUFtQjtRQUNoQyxjQUFjO1FBRWQsYUFBYTtRQUViLFVBQVU7UUFDVixnQkFBZ0I7UUFFaEIsV0FBVztRQUNYLGNBQWMsYUFNZCxXQUFXLEVBQUUsY0FBYyxFQUFFLHFCQUFxQjtrREFnQjdDLGNBQWM7Y0FsQzFCLFFBQVE7ZUFBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixXQUFXLEVBQUUsbUJBQW1CO29CQUNoQyxjQUFjO29CQUVkLGFBQWE7b0JBRWIsVUFBVTtvQkFDVixnQkFBZ0I7b0JBRWhCLFdBQVc7b0JBQ1gsY0FBYztpQkFDakI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLFdBQVcsRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUUsdUJBQXVCO2lCQUM5RTtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsV0FBVyxFQUFFLGNBQWMsRUFBRSxxQkFBcUI7aUJBQ3JEO2dCQUNELFNBQVMsRUFBRTtvQkFDUDt3QkFDSSxPQUFPLEVBQUUsZ0JBQWdCO3dCQUN6QixRQUFRLEVBQUU7NEJBQ04sY0FBYyxFQUFFLFdBQVc7NEJBQzNCLGlCQUFpQixFQUFFLGNBQWM7eUJBQ3BDO3FCQUNKO29CQUNEO3dCQUNJLE9BQU8sRUFBRSxNQUFNO3dCQUNmLFVBQVUsRUFBRSxhQUFhO3FCQUM1QjtpQkFDSjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7RHJhZ0Ryb3BNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jZGsvZHJhZy1kcm9wXCI7XG5cbmltcG9ydCB7SW50bE1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvaW50bFwiO1xuaW1wb3J0IHtWYWxpZGF0aW9uTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS92YWxpZGF0aW9uXCI7XG5cbmltcG9ydCB7VXRpbHNNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3V0aWxzXCI7XG5pbXBvcnQge0JzQWN0aW9uTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9hY3Rpb25cIjtcbmltcG9ydCB7QnNNb2RhbE1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvbW9kYWxcIjtcblxuaW1wb3J0IHtBTEVSVF9DT01QT05FTlRTLCBXSU5ET1d9IGZyb20gXCIuLi9hbGVydHMuc2VydmljZVwiO1xuaW1wb3J0IHtCc0VkaXRBbGVydH0gZnJvbSBcIi4vZWRpdC1hbGVydC9lZGl0LWFsZXJ0XCI7XG5pbXBvcnQge0JzTWFuYWdlQWxlcnRzfSBmcm9tIFwiLi9tYW5hZ2UtYWxlcnRzL21hbmFnZS1hbGVydHNcIjtcbmltcG9ydCB7QnNBbGVydHNNZW51Q29tcG9uZW50fSBmcm9tIFwiLi9hbGVydHMtbWVudS9hbGVydHMtbWVudS5jb21wb25lbnRcIjtcbmltcG9ydCB7QnNBbGVydE1lc3NhZ2VDb21wb25lbnR9IGZyb20gXCIuL2FsZXJ0LW1lc3NhZ2UvYWxlcnQtbWVzc2FnZS5jb21wb25lbnRcIjtcblxuZnVuY3Rpb24gd2luZG93RmFjdG9yeSgpIHtcbiAgICByZXR1cm4gd2luZG93O1xufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgRHJhZ0Ryb3BNb2R1bGUsXG5cbiAgICAgICAgQnNNb2RhbE1vZHVsZSxcblxuICAgICAgICBJbnRsTW9kdWxlLFxuICAgICAgICBWYWxpZGF0aW9uTW9kdWxlLFxuXG4gICAgICAgIFV0aWxzTW9kdWxlLFxuICAgICAgICBCc0FjdGlvbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEJzRWRpdEFsZXJ0LCBCc01hbmFnZUFsZXJ0cywgQnNBbGVydHNNZW51Q29tcG9uZW50LCBCc0FsZXJ0TWVzc2FnZUNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBCc0VkaXRBbGVydCwgQnNNYW5hZ2VBbGVydHMsIEJzQWxlcnRzTWVudUNvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IEFMRVJUX0NPTVBPTkVOVFMsXG4gICAgICAgICAgICB1c2VWYWx1ZToge1xuICAgICAgICAgICAgICAgIGVkaXRBbGVydE1vZGFsOiBCc0VkaXRBbGVydCxcbiAgICAgICAgICAgICAgICBtYW5hZ2VBbGVydHNNb2RhbDogQnNNYW5hZ2VBbGVydHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogV0lORE9XLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogd2luZG93RmFjdG9yeVxuICAgICAgICB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBCc0FsZXJ0c01vZHVsZSB7XG59XG4iXX0=