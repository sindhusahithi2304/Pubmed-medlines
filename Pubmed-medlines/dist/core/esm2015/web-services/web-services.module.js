import { HttpClientModule } from "@angular/common/http";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { CommonModule } from "@angular/common";
// Intl is required by various web services
import { BaseModule } from "@sinequa/core/base";
import { IntlModule } from "@sinequa/core/intl";
// StartConfig
import { StartConfigWebService, START_CONFIG } from "./start-config.web.service";
import { WEB_SERVICES_MODULE_PROVIDERS } from "./module.providers";
import * as i0 from "@angular/core";
// Used to ensure that the StartConfigWebService is instantiated
export function StartConfigInitializer(startConfigWebService) {
    const init = () => Promise.resolve();
    return init;
}
/**
 * This module implements client services for the Sinequa web service APIs
 */
// @dynamic
export class WebServicesModule {
    /**
     * Configures the module with a start configuration
     *
     * @param startConfig The start configuration object
     *
     * @returns The configured module
     */
    static forRoot(startConfig) {
        return {
            ngModule: WebServicesModule,
            providers: [
                // Provide START_CONFIG
                { provide: START_CONFIG, useValue: startConfig },
            ]
        };
    }
}
WebServicesModule.ɵmod = i0.ɵɵdefineNgModule({ type: WebServicesModule });
WebServicesModule.ɵinj = i0.ɵɵdefineInjector({ factory: function WebServicesModule_Factory(t) { return new (t || WebServicesModule)(); }, providers: [
        // Ensure that the StartConfigWebService is instantiated so StartConfig is initialized
        { provide: APP_INITIALIZER, useFactory: StartConfigInitializer, deps: [StartConfigWebService], multi: true },
        ...WEB_SERVICES_MODULE_PROVIDERS
    ], imports: [[
            CommonModule,
            HttpClientModule,
            BaseModule,
            IntlModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(WebServicesModule, { imports: [CommonModule,
        HttpClientModule,
        BaseModule,
        IntlModule] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(WebServicesModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    HttpClientModule,
                    BaseModule,
                    IntlModule
                ],
                declarations: [],
                exports: [],
                providers: [
                    // Ensure that the StartConfigWebService is instantiated so StartConfig is initialized
                    { provide: APP_INITIALIZER, useFactory: StartConfigInitializer, deps: [StartConfigWebService], multi: true },
                    ...WEB_SERVICES_MODULE_PROVIDERS
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLXNlcnZpY2VzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3dlYi1zZXJ2aWNlcy8iLCJzb3VyY2VzIjpbIndlYi1zZXJ2aWNlcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFdEQsT0FBTyxFQUFDLFFBQVEsRUFBdUIsZUFBZSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QywyQ0FBMkM7QUFDM0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxjQUFjO0FBQ2QsT0FBTyxFQUFDLHFCQUFxQixFQUFFLFlBQVksRUFBYyxNQUFNLDRCQUE0QixDQUFDO0FBRTVGLE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLG9CQUFvQixDQUFDOztBQUVqRSxnRUFBZ0U7QUFDaEUsTUFBTSxVQUFVLHNCQUFzQixDQUFDLHFCQUE0QztJQUMvRSxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckMsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVEOztHQUVHO0FBQ0gsV0FBVztBQWtCWCxNQUFNLE9BQU8saUJBQWlCO0lBQzFCOzs7Ozs7T0FNRztJQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBd0I7UUFDbkMsT0FBTztZQUNILFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsU0FBUyxFQUFFO2dCQUNQLHVCQUF1QjtnQkFDdkIsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUM7YUFDakQ7U0FDSixDQUFDO0lBQ04sQ0FBQzs7cURBaEJRLGlCQUFpQjtpSEFBakIsaUJBQWlCLG1CQU5mO1FBQ1Asc0ZBQXNGO1FBQ3RGLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSxFQUFFLENBQUMscUJBQXFCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO1FBQzFHLEdBQUcsNkJBQTZCO0tBQ25DLFlBZFE7WUFDTCxZQUFZO1lBQ1osZ0JBQWdCO1lBQ2hCLFVBQVU7WUFDVixVQUFVO1NBQ2I7d0ZBV1EsaUJBQWlCLGNBZnRCLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsVUFBVTtRQUNWLFVBQVU7a0RBWUwsaUJBQWlCO2NBakI3QixRQUFRO2VBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixVQUFVO29CQUNWLFVBQVU7aUJBQ2I7Z0JBQ0QsWUFBWSxFQUFFLEVBQ2I7Z0JBQ0QsT0FBTyxFQUFFLEVBQ1I7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLHNGQUFzRjtvQkFDdEYsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7b0JBQzFHLEdBQUcsNkJBQTZCO2lCQUNuQzthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcblxuaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgQVBQX0lOSVRJQUxJWkVSfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcblxuLy8gSW50bCBpcyByZXF1aXJlZCBieSB2YXJpb3VzIHdlYiBzZXJ2aWNlc1xuaW1wb3J0IHtCYXNlTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge0ludGxNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb3JlL2ludGxcIjtcbi8vIFN0YXJ0Q29uZmlnXG5pbXBvcnQge1N0YXJ0Q29uZmlnV2ViU2VydmljZSwgU1RBUlRfQ09ORklHLCBTdGFydENvbmZpZ30gZnJvbSBcIi4vc3RhcnQtY29uZmlnLndlYi5zZXJ2aWNlXCI7XG5cbmltcG9ydCB7V0VCX1NFUlZJQ0VTX01PRFVMRV9QUk9WSURFUlN9IGZyb20gXCIuL21vZHVsZS5wcm92aWRlcnNcIjtcblxuLy8gVXNlZCB0byBlbnN1cmUgdGhhdCB0aGUgU3RhcnRDb25maWdXZWJTZXJ2aWNlIGlzIGluc3RhbnRpYXRlZFxuZXhwb3J0IGZ1bmN0aW9uIFN0YXJ0Q29uZmlnSW5pdGlhbGl6ZXIoc3RhcnRDb25maWdXZWJTZXJ2aWNlOiBTdGFydENvbmZpZ1dlYlNlcnZpY2UpOiAoKSA9PiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBpbml0ID0gKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgcmV0dXJuIGluaXQ7XG59XG5cbi8qKlxuICogVGhpcyBtb2R1bGUgaW1wbGVtZW50cyBjbGllbnQgc2VydmljZXMgZm9yIHRoZSBTaW5lcXVhIHdlYiBzZXJ2aWNlIEFQSXNcbiAqL1xuLy8gQGR5bmFtaWNcbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgICAgIEJhc2VNb2R1bGUsXG4gICAgICAgIEludGxNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBTdGFydENvbmZpZ1dlYlNlcnZpY2UgaXMgaW5zdGFudGlhdGVkIHNvIFN0YXJ0Q29uZmlnIGlzIGluaXRpYWxpemVkXG4gICAgICAgIHtwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsIHVzZUZhY3Rvcnk6IFN0YXJ0Q29uZmlnSW5pdGlhbGl6ZXIsIGRlcHM6IFtTdGFydENvbmZpZ1dlYlNlcnZpY2VdLCBtdWx0aTogdHJ1ZX0sXG4gICAgICAgIC4uLldFQl9TRVJWSUNFU19NT0RVTEVfUFJPVklERVJTXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBXZWJTZXJ2aWNlc01vZHVsZSB7XG4gICAgLyoqXG4gICAgICogQ29uZmlndXJlcyB0aGUgbW9kdWxlIHdpdGggYSBzdGFydCBjb25maWd1cmF0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RhcnRDb25maWcgVGhlIHN0YXJ0IGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgY29uZmlndXJlZCBtb2R1bGVcbiAgICAgKi9cbiAgICBzdGF0aWMgZm9yUm9vdChzdGFydENvbmZpZzogU3RhcnRDb25maWcpIDogTW9kdWxlV2l0aFByb3ZpZGVyczxXZWJTZXJ2aWNlc01vZHVsZT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IFdlYlNlcnZpY2VzTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAgLy8gUHJvdmlkZSBTVEFSVF9DT05GSUdcbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogU1RBUlRfQ09ORklHLCB1c2VWYWx1ZTogc3RhcnRDb25maWd9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbn0iXX0=