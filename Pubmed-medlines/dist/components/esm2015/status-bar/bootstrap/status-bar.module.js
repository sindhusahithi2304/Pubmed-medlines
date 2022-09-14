import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IntlModule } from "@sinequa/core/intl";
import { BsActionModule } from "@sinequa/components/action";
import { UtilsModule } from "@sinequa/components/utils";
import { BsFullscreenActivator } from "./fullscreen-activator/fullscreen-activator";
import { BsNetworkActivity } from "./network-activity/network-activity";
import * as i0 from "@angular/core";
export class BsStatusBarModule {
}
BsStatusBarModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsStatusBarModule });
BsStatusBarModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsStatusBarModule_Factory(t) { return new (t || BsStatusBarModule)(); }, imports: [[
            CommonModule,
            IntlModule,
            BsActionModule,
            UtilsModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsStatusBarModule, { declarations: [BsFullscreenActivator, BsNetworkActivity], imports: [CommonModule,
        IntlModule,
        BsActionModule,
        UtilsModule], exports: [BsFullscreenActivator, BsNetworkActivity] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsStatusBarModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    IntlModule,
                    BsActionModule,
                    UtilsModule,
                ],
                declarations: [
                    BsFullscreenActivator, BsNetworkActivity,
                ],
                exports: [
                    BsFullscreenActivator, BsNetworkActivity,
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWJhci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zdGF0dXMtYmFyLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL3N0YXR1cy1iYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDMUQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXRELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDOztBQWdCdEUsTUFBTSxPQUFPLGlCQUFpQjs7cURBQWpCLGlCQUFpQjtpSEFBakIsaUJBQWlCLGtCQWJqQjtZQUNMLFlBQVk7WUFDWixVQUFVO1lBQ1YsY0FBYztZQUNkLFdBQVc7U0FDZDt3RkFRUSxpQkFBaUIsbUJBTnRCLHFCQUFxQixFQUFFLGlCQUFpQixhQU54QyxZQUFZO1FBQ1osVUFBVTtRQUNWLGNBQWM7UUFDZCxXQUFXLGFBTVgscUJBQXFCLEVBQUUsaUJBQWlCO2tEQUduQyxpQkFBaUI7Y0FkN0IsUUFBUTtlQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFVBQVU7b0JBQ1YsY0FBYztvQkFDZCxXQUFXO2lCQUNkO2dCQUNELFlBQVksRUFBRTtvQkFDVixxQkFBcUIsRUFBRSxpQkFBaUI7aUJBQzNDO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxxQkFBcUIsRUFBRSxpQkFBaUI7aUJBQzNDO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcblxuaW1wb3J0IHtJbnRsTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9pbnRsXCI7XG5cbmltcG9ydCB7QnNBY3Rpb25Nb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2FjdGlvblwiO1xuaW1wb3J0IHtVdGlsc01vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvdXRpbHNcIjtcblxuaW1wb3J0IHtCc0Z1bGxzY3JlZW5BY3RpdmF0b3J9IGZyb20gXCIuL2Z1bGxzY3JlZW4tYWN0aXZhdG9yL2Z1bGxzY3JlZW4tYWN0aXZhdG9yXCI7XG5pbXBvcnQge0JzTmV0d29ya0FjdGl2aXR5fSBmcm9tIFwiLi9uZXR3b3JrLWFjdGl2aXR5L25ldHdvcmstYWN0aXZpdHlcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgSW50bE1vZHVsZSxcbiAgICAgICAgQnNBY3Rpb25Nb2R1bGUsXG4gICAgICAgIFV0aWxzTW9kdWxlLFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEJzRnVsbHNjcmVlbkFjdGl2YXRvciwgQnNOZXR3b3JrQWN0aXZpdHksXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEJzRnVsbHNjcmVlbkFjdGl2YXRvciwgQnNOZXR3b3JrQWN0aXZpdHksXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBCc1N0YXR1c0Jhck1vZHVsZSB7XG59XG4iXX0=