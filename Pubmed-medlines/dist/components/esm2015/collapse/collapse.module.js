import { NgModule } from "@angular/core";
import { Collapse } from "./collapse.component";
import { CollapseButton } from "./collapse-button.component";
import { CollapseLink } from "./collapse-link.component";
import { CommonModule } from "@angular/common";
import { IntlModule } from "@sinequa/core/intl";
import * as i0 from "@angular/core";
export class CollapseModule {
}
CollapseModule.ɵmod = i0.ɵɵdefineNgModule({ type: CollapseModule });
CollapseModule.ɵinj = i0.ɵɵdefineInjector({ factory: function CollapseModule_Factory(t) { return new (t || CollapseModule)(); }, imports: [[
            CommonModule,
            IntlModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CollapseModule, { declarations: [Collapse, CollapseButton, CollapseLink], imports: [CommonModule,
        IntlModule], exports: [Collapse, CollapseButton, CollapseLink] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CollapseModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    IntlModule
                ],
                declarations: [
                    Collapse, CollapseButton, CollapseLink
                ],
                exports: [
                    Collapse, CollapseButton, CollapseLink
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvY29sbGFwc2UvIiwic291cmNlcyI6WyJjb2xsYXBzZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDOztBQWM5QyxNQUFNLE9BQU8sY0FBYzs7a0RBQWQsY0FBYzsyR0FBZCxjQUFjLGtCQVhkO1lBQ0wsWUFBWTtZQUNaLFVBQVU7U0FDYjt3RkFRUSxjQUFjLG1CQU5uQixRQUFRLEVBQUUsY0FBYyxFQUFFLFlBQVksYUFKdEMsWUFBWTtRQUNaLFVBQVUsYUFNVixRQUFRLEVBQUUsY0FBYyxFQUFFLFlBQVk7a0RBR2pDLGNBQWM7Y0FaMUIsUUFBUTtlQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFVBQVU7aUJBQ2I7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLFFBQVEsRUFBRSxjQUFjLEVBQUUsWUFBWTtpQkFDekM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLFFBQVEsRUFBRSxjQUFjLEVBQUUsWUFBWTtpQkFDekM7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbGxhcHNlfSBmcm9tIFwiLi9jb2xsYXBzZS5jb21wb25lbnRcIjtcbmltcG9ydCB7Q29sbGFwc2VCdXR0b259IGZyb20gXCIuL2NvbGxhcHNlLWJ1dHRvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7Q29sbGFwc2VMaW5rfSBmcm9tIFwiLi9jb2xsYXBzZS1saW5rLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7SW50bE1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvaW50bFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBJbnRsTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQ29sbGFwc2UsIENvbGxhcHNlQnV0dG9uLCBDb2xsYXBzZUxpbmtcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgQ29sbGFwc2UsIENvbGxhcHNlQnV0dG9uLCBDb2xsYXBzZUxpbmtcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDb2xsYXBzZU1vZHVsZSB7XG59XG4iXX0=