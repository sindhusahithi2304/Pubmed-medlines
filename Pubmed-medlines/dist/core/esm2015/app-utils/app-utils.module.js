import { NgModule } from "@angular/core";
import { BaseModule } from "@sinequa/core/base";
import { IntlModule } from "@sinequa/core/intl";
import { WebServicesModule } from "@sinequa/core/web-services";
import { APP_UTILS_MODULE_PROVIDERS } from "./module.providers";
import * as i0 from "@angular/core";
/**
 * This module contains a utility {@link AppService} for managing the configuration of a Sinequa SBA and a {@link FormatService}
 * for handling the formatting and parsing of Sinequa field values. It also contains an implementation of a {@link Query} class
 * as well as classes for manipulating Sinequa fielded search expressions.
 *
 * The {@link AuditInterceptor} in this module should be registered using `HTTP_INTERCEPTORS` in your app module.
 */
export class AppUtilsModule {
}
AppUtilsModule.ɵmod = i0.ɵɵdefineNgModule({ type: AppUtilsModule });
AppUtilsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function AppUtilsModule_Factory(t) { return new (t || AppUtilsModule)(); }, providers: [
        ...APP_UTILS_MODULE_PROVIDERS
    ], imports: [[
            BaseModule,
            IntlModule,
            WebServicesModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AppUtilsModule, { imports: [BaseModule,
        IntlModule,
        WebServicesModule] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AppUtilsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    BaseModule,
                    IntlModule,
                    WebServicesModule
                ],
                declarations: [],
                exports: [],
                providers: [
                    ...APP_UTILS_MODULE_PROVIDERS
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXV0aWxzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2FwcC11dGlscy8iLCJzb3VyY2VzIjpbImFwcC11dGlscy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRTdELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLG9CQUFvQixDQUFDOztBQUU5RDs7Ozs7O0dBTUc7QUFlSCxNQUFNLE9BQU8sY0FBYzs7a0RBQWQsY0FBYzsyR0FBZCxjQUFjLG1CQUpaO1FBQ1AsR0FBRywwQkFBMEI7S0FDaEMsWUFYUTtZQUNMLFVBQVU7WUFDVixVQUFVO1lBQ1YsaUJBQWlCO1NBQ3BCO3dGQVNRLGNBQWMsY0FabkIsVUFBVTtRQUNWLFVBQVU7UUFDVixpQkFBaUI7a0RBVVosY0FBYztjQWQxQixRQUFRO2VBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFVBQVU7b0JBQ1YsVUFBVTtvQkFDVixpQkFBaUI7aUJBQ3BCO2dCQUNELFlBQVksRUFBRSxFQUNiO2dCQUNELE9BQU8sRUFBRSxFQUNSO2dCQUNELFNBQVMsRUFBRTtvQkFDUCxHQUFHLDBCQUEwQjtpQkFDaEM7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0Jhc2VNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7SW50bE1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvaW50bFwiO1xuaW1wb3J0IHtXZWJTZXJ2aWNlc01vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5cbmltcG9ydCB7QVBQX1VUSUxTX01PRFVMRV9QUk9WSURFUlN9IGZyb20gXCIuL21vZHVsZS5wcm92aWRlcnNcIjtcblxuLyoqXG4gKiBUaGlzIG1vZHVsZSBjb250YWlucyBhIHV0aWxpdHkge0BsaW5rIEFwcFNlcnZpY2V9IGZvciBtYW5hZ2luZyB0aGUgY29uZmlndXJhdGlvbiBvZiBhIFNpbmVxdWEgU0JBIGFuZCBhIHtAbGluayBGb3JtYXRTZXJ2aWNlfVxuICogZm9yIGhhbmRsaW5nIHRoZSBmb3JtYXR0aW5nIGFuZCBwYXJzaW5nIG9mIFNpbmVxdWEgZmllbGQgdmFsdWVzLiBJdCBhbHNvIGNvbnRhaW5zIGFuIGltcGxlbWVudGF0aW9uIG9mIGEge0BsaW5rIFF1ZXJ5fSBjbGFzc1xuICogYXMgd2VsbCBhcyBjbGFzc2VzIGZvciBtYW5pcHVsYXRpbmcgU2luZXF1YSBmaWVsZGVkIHNlYXJjaCBleHByZXNzaW9ucy5cbiAqXG4gKiBUaGUge0BsaW5rIEF1ZGl0SW50ZXJjZXB0b3J9IGluIHRoaXMgbW9kdWxlIHNob3VsZCBiZSByZWdpc3RlcmVkIHVzaW5nIGBIVFRQX0lOVEVSQ0VQVE9SU2AgaW4geW91ciBhcHAgbW9kdWxlLlxuICovXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQmFzZU1vZHVsZSxcbiAgICAgICAgSW50bE1vZHVsZSxcbiAgICAgICAgV2ViU2VydmljZXNNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIC4uLkFQUF9VVElMU19NT0RVTEVfUFJPVklERVJTXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBVdGlsc01vZHVsZSB7XG59XG4iXX0=