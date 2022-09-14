import { NgModule, APP_BOOTSTRAP_LISTENER } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BsSearchModule } from "@sinequa/components/search";
import { HTTP_REQUEST_INITIALIZERS } from "@sinequa/core/login";
import { MlAuditService } from "./ml-audit.service";
import { DwellTime } from "./dwell-time.directive";
import * as i0 from "@angular/core";
// Initialization that needs to be done once the app component has been created
export function AppBootstrapListener(mlAuditService) {
    return () => {
        mlAuditService.init();
    };
}
export function HttpRequestListener(mlAuditService) {
    return mlAuditService.requestInitializer;
}
// See https://github.com/angular/angular/issues/19698
// @dynamic
export class MLModule {
}
MLModule.ɵmod = i0.ɵɵdefineNgModule({ type: MLModule });
MLModule.ɵinj = i0.ɵɵdefineInjector({ factory: function MLModule_Factory(t) { return new (t || MLModule)(); }, providers: [
        { provide: APP_BOOTSTRAP_LISTENER, useFactory: AppBootstrapListener, deps: [MlAuditService], multi: true },
        { provide: HTTP_REQUEST_INITIALIZERS, useFactory: HttpRequestListener, deps: [MlAuditService], multi: true },
    ], imports: [[
            CommonModule,
            BsSearchModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(MLModule, { declarations: [DwellTime], imports: [CommonModule,
        BsSearchModule] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MLModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    BsSearchModule
                ],
                declarations: [
                    DwellTime
                ],
                exports: [],
                providers: [
                    { provide: APP_BOOTSTRAP_LISTENER, useFactory: AppBootstrapListener, deps: [MlAuditService], multi: true },
                    { provide: HTTP_REQUEST_INITIALIZERS, useFactory: HttpRequestListener, deps: [MlAuditService], multi: true },
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFjaGluZS1sZWFybmluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9tYWNoaW5lLWxlYXJuaW5nLyIsInNvdXJjZXMiOlsibWFjaGluZS1sZWFybmluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBRSxzQkFBc0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRTlELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7O0FBR2pELCtFQUErRTtBQUMvRSxNQUFNLFVBQVUsb0JBQW9CLENBQUMsY0FBOEI7SUFDL0QsT0FBTyxHQUFHLEVBQUU7UUFDUixjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxjQUE4QjtJQUM5RCxPQUFPLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQztBQUM3QyxDQUFDO0FBRUQsc0RBQXNEO0FBQ3RELFdBQVc7QUFnQlgsTUFBTSxPQUFPLFFBQVE7OzRDQUFSLFFBQVE7K0ZBQVIsUUFBUSxtQkFMTjtRQUNQLEVBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO1FBQ3hHLEVBQUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO0tBQzdHLFlBWlE7WUFDTCxZQUFZO1lBQ1osY0FBYztTQUNqQjt3RkFXUSxRQUFRLG1CQVRiLFNBQVMsYUFKVCxZQUFZO1FBQ1osY0FBYztrREFZVCxRQUFRO2NBZnBCLFFBQVE7ZUFBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixjQUFjO2lCQUNqQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsU0FBUztpQkFDWjtnQkFDRCxPQUFPLEVBQUUsRUFDUjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1AsRUFBQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7b0JBQ3hHLEVBQUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO2lCQUM3RzthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSwgQVBQX0JPT1RTVFJBUF9MSVNURU5FUn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge0JzU2VhcmNoTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9zZWFyY2hcIjtcbmltcG9ydCB7SFRUUF9SRVFVRVNUX0lOSVRJQUxJWkVSU30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbG9naW5cIjtcblxuaW1wb3J0IHtNbEF1ZGl0U2VydmljZX0gZnJvbSBcIi4vbWwtYXVkaXQuc2VydmljZVwiO1xuaW1wb3J0IHtEd2VsbFRpbWV9IGZyb20gXCIuL2R3ZWxsLXRpbWUuZGlyZWN0aXZlXCI7XG5cblxuLy8gSW5pdGlhbGl6YXRpb24gdGhhdCBuZWVkcyB0byBiZSBkb25lIG9uY2UgdGhlIGFwcCBjb21wb25lbnQgaGFzIGJlZW4gY3JlYXRlZFxuZXhwb3J0IGZ1bmN0aW9uIEFwcEJvb3RzdHJhcExpc3RlbmVyKG1sQXVkaXRTZXJ2aWNlOiBNbEF1ZGl0U2VydmljZSkge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIG1sQXVkaXRTZXJ2aWNlLmluaXQoKTtcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gSHR0cFJlcXVlc3RMaXN0ZW5lcihtbEF1ZGl0U2VydmljZTogTWxBdWRpdFNlcnZpY2UpIHtcbiAgICByZXR1cm4gbWxBdWRpdFNlcnZpY2UucmVxdWVzdEluaXRpYWxpemVyO1xufVxuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTk2OThcbi8vIEBkeW5hbWljXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBCc1NlYXJjaE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIER3ZWxsVGltZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBBUFBfQk9PVFNUUkFQX0xJU1RFTkVSLCB1c2VGYWN0b3J5OiBBcHBCb290c3RyYXBMaXN0ZW5lciwgZGVwczogW01sQXVkaXRTZXJ2aWNlXSwgbXVsdGk6IHRydWV9LFxuICAgICAgICB7cHJvdmlkZTogSFRUUF9SRVFVRVNUX0lOSVRJQUxJWkVSUywgdXNlRmFjdG9yeTogSHR0cFJlcXVlc3RMaXN0ZW5lciwgZGVwczogW01sQXVkaXRTZXJ2aWNlXSwgbXVsdGk6IHRydWV9LFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTUxNb2R1bGUge1xufVxuIl19