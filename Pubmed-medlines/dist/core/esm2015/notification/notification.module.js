import { NgModule } from "@angular/core";
import { NOTIFICATION_MODULE_PROVIDERS } from "./module.providers";
import * as i0 from "@angular/core";
/**
 * This module provides a service for managing notifications. It is used by the
 * Sinequa runtime and can also be used for application-specific purposes.
 *
 * The {@link NotificationsInterceptor} in this module should be registered using `HTTP_INTERCEPTORS` in your app module.
 */
export class NotificationModule {
}
NotificationModule.ɵmod = i0.ɵɵdefineNgModule({ type: NotificationModule });
NotificationModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NotificationModule_Factory(t) { return new (t || NotificationModule)(); }, providers: [
        ...NOTIFICATION_MODULE_PROVIDERS
    ], imports: [[]] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NotificationModule, [{
        type: NgModule,
        args: [{
                imports: [],
                declarations: [],
                exports: [],
                providers: [
                    ...NOTIFICATION_MODULE_PROVIDERS
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL25vdGlmaWNhdGlvbi8iLCJzb3VyY2VzIjpbIm5vdGlmaWNhdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV2QyxPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7QUFFakU7Ozs7O0dBS0c7QUFZSCxNQUFNLE9BQU8sa0JBQWtCOztzREFBbEIsa0JBQWtCO21IQUFsQixrQkFBa0IsbUJBSmhCO1FBQ1AsR0FBRyw2QkFBNkI7S0FDbkMsWUFSUSxFQUNSO2tEQVNRLGtCQUFrQjtjQVg5QixRQUFRO2VBQUM7Z0JBQ04sT0FBTyxFQUFFLEVBQ1I7Z0JBQ0QsWUFBWSxFQUFFLEVBQ2I7Z0JBQ0QsT0FBTyxFQUFFLEVBQ1I7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLEdBQUcsNkJBQTZCO2lCQUNuQzthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHtOT1RJRklDQVRJT05fTU9EVUxFX1BST1ZJREVSU30gZnJvbSBcIi4vbW9kdWxlLnByb3ZpZGVyc1wiO1xuXG4vKipcbiAqIFRoaXMgbW9kdWxlIHByb3ZpZGVzIGEgc2VydmljZSBmb3IgbWFuYWdpbmcgbm90aWZpY2F0aW9ucy4gSXQgaXMgdXNlZCBieSB0aGVcbiAqIFNpbmVxdWEgcnVudGltZSBhbmQgY2FuIGFsc28gYmUgdXNlZCBmb3IgYXBwbGljYXRpb24tc3BlY2lmaWMgcHVycG9zZXMuXG4gKlxuICogVGhlIHtAbGluayBOb3RpZmljYXRpb25zSW50ZXJjZXB0b3J9IGluIHRoaXMgbW9kdWxlIHNob3VsZCBiZSByZWdpc3RlcmVkIHVzaW5nIGBIVFRQX0lOVEVSQ0VQVE9SU2AgaW4geW91ciBhcHAgbW9kdWxlLlxuICovXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIC4uLk5PVElGSUNBVElPTl9NT0RVTEVfUFJPVklERVJTXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25Nb2R1bGUge1xufVxuIl19