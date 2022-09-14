import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BaseModule } from "@sinequa/core/base";
import { LoadComponentDirective } from "./load-component.directive";
import { LOAD_COMPONENT_MODULE_PROVIDERS } from "./module.providers";
import * as i0 from "@angular/core";
/**
 * This module provides functionality for the dynamic loading of components based on the
 * techniques described in the [angular documentation]{@link https://angular.io/guide/dynamic-component-loader}
 */
// @dynamic
export class LoadComponentModule {
}
LoadComponentModule.ɵmod = i0.ɵɵdefineNgModule({ type: LoadComponentModule });
LoadComponentModule.ɵinj = i0.ɵɵdefineInjector({ factory: function LoadComponentModule_Factory(t) { return new (t || LoadComponentModule)(); }, providers: [
        ...LOAD_COMPONENT_MODULE_PROVIDERS
    ], imports: [[
            CommonModule,
            BaseModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LoadComponentModule, { declarations: [LoadComponentDirective], imports: [CommonModule,
        BaseModule], exports: [LoadComponentDirective] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LoadComponentModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    BaseModule
                ],
                declarations: [
                    LoadComponentDirective
                ],
                exports: [
                    LoadComponentDirective
                ],
                providers: [
                    ...LOAD_COMPONENT_MODULE_PROVIDERS
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZC1jb21wb25lbnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvbG9hZC1jb21wb25lbnQvIiwic291cmNlcyI6WyJsb2FkLWNvbXBvbmVudC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRTlDLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ2xFLE9BQU8sRUFBQywrQkFBK0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDOztBQUVuRTs7O0dBR0c7QUFDSCxXQUFXO0FBZ0JYLE1BQU0sT0FBTyxtQkFBbUI7O3VEQUFuQixtQkFBbUI7cUhBQW5CLG1CQUFtQixtQkFKakI7UUFDUCxHQUFHLCtCQUErQjtLQUNyQyxZQVpRO1lBQ0wsWUFBWTtZQUNaLFVBQVU7U0FDYjt3RkFXUSxtQkFBbUIsbUJBVHhCLHNCQUFzQixhQUp0QixZQUFZO1FBQ1osVUFBVSxhQU1WLHNCQUFzQjtrREFNakIsbUJBQW1CO2NBZi9CLFFBQVE7ZUFBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixVQUFVO2lCQUNiO2dCQUNELFlBQVksRUFBRTtvQkFDVixzQkFBc0I7aUJBQ3pCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxzQkFBc0I7aUJBQ3pCO2dCQUNELFNBQVMsRUFBRTtvQkFDUCxHQUFHLCtCQUErQjtpQkFDckM7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtCYXNlTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5cbmltcG9ydCB7TG9hZENvbXBvbmVudERpcmVjdGl2ZX0gZnJvbSBcIi4vbG9hZC1jb21wb25lbnQuZGlyZWN0aXZlXCI7XG5pbXBvcnQge0xPQURfQ09NUE9ORU5UX01PRFVMRV9QUk9WSURFUlN9IGZyb20gXCIuL21vZHVsZS5wcm92aWRlcnNcIjtcblxuLyoqXG4gKiBUaGlzIG1vZHVsZSBwcm92aWRlcyBmdW5jdGlvbmFsaXR5IGZvciB0aGUgZHluYW1pYyBsb2FkaW5nIG9mIGNvbXBvbmVudHMgYmFzZWQgb24gdGhlXG4gKiB0ZWNobmlxdWVzIGRlc2NyaWJlZCBpbiB0aGUgW2FuZ3VsYXIgZG9jdW1lbnRhdGlvbl17QGxpbmsgaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2R5bmFtaWMtY29tcG9uZW50LWxvYWRlcn1cbiAqL1xuLy8gQGR5bmFtaWNcbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEJhc2VNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBMb2FkQ29tcG9uZW50RGlyZWN0aXZlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIExvYWRDb21wb25lbnREaXJlY3RpdmVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICAuLi5MT0FEX0NPTVBPTkVOVF9NT0RVTEVfUFJPVklERVJTXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBMb2FkQ29tcG9uZW50TW9kdWxlIHtcbn1cbiJdfQ==