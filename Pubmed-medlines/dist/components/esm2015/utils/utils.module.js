import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { A11yModule } from "@angular/cdk/a11y";
import { IntlModule } from "@sinequa/core/intl";
// Formatting pipes
import { DatePipe } from "./pipes/date-pipe";
import { ExprPipe } from "./pipes/expr-pipe";
import { MemorySizePipe } from "./pipes/memory-size-pipe";
import { MomentPipe } from "./pipes/moment-pipe";
import { NumberPipe } from "./pipes/number-pipe";
import { RelativeTimePipe } from "./pipes/relative-time-pipe";
import { TimePipe } from "./pipes/time-pipe";
import { ValuePipe } from "./pipes/value-pipe";
// UI Directives
import { Autofocus } from "./directives/autofocus";
import { ClickOutside } from "./directives/click-outside";
import { MediaIf } from "./directives/media-if";
import { ScrollIntoView } from "./directives/scroll-into-view";
import { FocusKeyListDirective } from "./directives/focus-key-list.directive";
import { FocusKeyListItemDirective } from "./directives/focus-key-list-item.directive";
import { ResizeEventDirective } from "./directives/resize-event.directive";
import { StickyComponent } from "./directives/sticky";
import { TooltipComponent } from "./directives/tooltip/tooltip.component";
import { TooltipDirective } from "./directives/tooltip/tooltip.directive";
// UI Service
import { SCREEN_SIZE_RULES } from "./ui.service";
import * as i0 from "@angular/core";
export const defaultScreenSizeRules = {
    xxl: "(min-width: 1920px)",
    xl: "(min-width: 1200px) and (max-width: 1919.98px)",
    lg: "(min-width: 992px) and (max-width: 1199.98px)",
    md: "(min-width: 768px) and (max-width: 991.98px)",
    sm: "(min-width: 576px) and (max-width: 767.98px)",
    xs: "(max-width: 575.98px)",
};
export class UtilsModule {
}
UtilsModule.ɵmod = i0.ɵɵdefineNgModule({ type: UtilsModule });
UtilsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function UtilsModule_Factory(t) { return new (t || UtilsModule)(); }, providers: [
        {
            provide: SCREEN_SIZE_RULES,
            useValue: defaultScreenSizeRules
        }
    ], imports: [[
            CommonModule,
            A11yModule,
            IntlModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(UtilsModule, { declarations: [DatePipe, ExprPipe, MemorySizePipe, MomentPipe, NumberPipe, RelativeTimePipe, TimePipe, ValuePipe,
        Autofocus, ClickOutside, MediaIf, ScrollIntoView, FocusKeyListDirective, FocusKeyListItemDirective,
        ResizeEventDirective, StickyComponent, TooltipComponent, TooltipDirective], imports: [CommonModule,
        A11yModule,
        IntlModule], exports: [DatePipe, ExprPipe, MemorySizePipe, MomentPipe, NumberPipe, RelativeTimePipe, TimePipe, ValuePipe,
        Autofocus, ClickOutside, MediaIf, ScrollIntoView, FocusKeyListDirective, FocusKeyListItemDirective,
        ResizeEventDirective, StickyComponent, TooltipComponent, TooltipDirective] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(UtilsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    A11yModule,
                    IntlModule
                ],
                declarations: [
                    DatePipe, ExprPipe, MemorySizePipe, MomentPipe, NumberPipe, RelativeTimePipe, TimePipe, ValuePipe,
                    Autofocus, ClickOutside, MediaIf, ScrollIntoView, FocusKeyListDirective, FocusKeyListItemDirective,
                    ResizeEventDirective, StickyComponent, TooltipComponent, TooltipDirective
                ],
                exports: [
                    DatePipe, ExprPipe, MemorySizePipe, MomentPipe, NumberPipe, RelativeTimePipe, TimePipe, ValuePipe,
                    Autofocus, ClickOutside, MediaIf, ScrollIntoView, FocusKeyListDirective, FocusKeyListItemDirective,
                    ResizeEventDirective, StickyComponent, TooltipComponent, TooltipDirective
                ],
                providers: [
                    {
                        provide: SCREEN_SIZE_RULES,
                        useValue: defaultScreenSizeRules
                    }
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvdXRpbHMvIiwic291cmNlcyI6WyJ1dGlscy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxtQkFBbUI7QUFDbkIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRTdDLGdCQUFnQjtBQUNoQixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDakQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDNUUsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDckYsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDekUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBRXhFLGFBQWE7QUFDYixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxjQUFjLENBQUM7O0FBRS9DLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHO0lBQ2xDLEdBQUcsRUFBRSxxQkFBcUI7SUFDMUIsRUFBRSxFQUFFLGdEQUFnRDtJQUNwRCxFQUFFLEVBQUUsK0NBQStDO0lBQ25ELEVBQUUsRUFBRSw4Q0FBOEM7SUFDbEQsRUFBRSxFQUFFLDhDQUE4QztJQUNsRCxFQUFFLEVBQUUsdUJBQXVCO0NBQzlCLENBQUM7QUF5QkYsTUFBTSxPQUFPLFdBQVc7OytDQUFYLFdBQVc7cUdBQVgsV0FBVyxtQkFQVDtRQUNQO1lBQ0ksT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixRQUFRLEVBQUUsc0JBQXNCO1NBQ25DO0tBQ0osWUFwQlE7WUFDTCxZQUFZO1lBQ1osVUFBVTtZQUNWLFVBQVU7U0FDYjt3RkFrQlEsV0FBVyxtQkFoQmhCLFFBQVEsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLFNBQVM7UUFDakcsU0FBUyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUFFLHlCQUF5QjtRQUNsRyxvQkFBb0IsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLGFBUHpFLFlBQVk7UUFDWixVQUFVO1FBQ1YsVUFBVSxhQVFWLFFBQVEsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLFNBQVM7UUFDakcsU0FBUyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUFFLHlCQUF5QjtRQUNsRyxvQkFBb0IsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCO2tEQVNwRSxXQUFXO2NBdkJ2QixRQUFRO2VBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osVUFBVTtvQkFDVixVQUFVO2lCQUNiO2dCQUNELFlBQVksRUFBRTtvQkFDVixRQUFRLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxTQUFTO29CQUNqRyxTQUFTLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUUseUJBQXlCO29CQUNsRyxvQkFBb0IsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCO2lCQUM1RTtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsUUFBUSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsU0FBUztvQkFDakcsU0FBUyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUFFLHlCQUF5QjtvQkFDbEcsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQjtpQkFDNUU7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQO3dCQUNJLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFFBQVEsRUFBRSxzQkFBc0I7cUJBQ25DO2lCQUNKO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7QTExeU1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2Nkay9hMTF5XCI7XG5cbmltcG9ydCB7SW50bE1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvaW50bFwiO1xuXG4vLyBGb3JtYXR0aW5nIHBpcGVzXG5pbXBvcnQge0RhdGVQaXBlfSBmcm9tIFwiLi9waXBlcy9kYXRlLXBpcGVcIjtcbmltcG9ydCB7RXhwclBpcGV9IGZyb20gXCIuL3BpcGVzL2V4cHItcGlwZVwiO1xuaW1wb3J0IHtNZW1vcnlTaXplUGlwZX0gZnJvbSBcIi4vcGlwZXMvbWVtb3J5LXNpemUtcGlwZVwiO1xuaW1wb3J0IHtNb21lbnRQaXBlfSBmcm9tIFwiLi9waXBlcy9tb21lbnQtcGlwZVwiO1xuaW1wb3J0IHtOdW1iZXJQaXBlfSBmcm9tIFwiLi9waXBlcy9udW1iZXItcGlwZVwiO1xuaW1wb3J0IHtSZWxhdGl2ZVRpbWVQaXBlfSBmcm9tIFwiLi9waXBlcy9yZWxhdGl2ZS10aW1lLXBpcGVcIjtcbmltcG9ydCB7VGltZVBpcGV9IGZyb20gXCIuL3BpcGVzL3RpbWUtcGlwZVwiO1xuaW1wb3J0IHtWYWx1ZVBpcGV9IGZyb20gXCIuL3BpcGVzL3ZhbHVlLXBpcGVcIjtcblxuLy8gVUkgRGlyZWN0aXZlc1xuaW1wb3J0IHtBdXRvZm9jdXN9IGZyb20gXCIuL2RpcmVjdGl2ZXMvYXV0b2ZvY3VzXCI7XG5pbXBvcnQge0NsaWNrT3V0c2lkZX0gZnJvbSBcIi4vZGlyZWN0aXZlcy9jbGljay1vdXRzaWRlXCI7XG5pbXBvcnQge01lZGlhSWZ9IGZyb20gXCIuL2RpcmVjdGl2ZXMvbWVkaWEtaWZcIjtcbmltcG9ydCB7U2Nyb2xsSW50b1ZpZXd9IGZyb20gXCIuL2RpcmVjdGl2ZXMvc2Nyb2xsLWludG8tdmlld1wiO1xuaW1wb3J0IHtGb2N1c0tleUxpc3REaXJlY3RpdmV9IGZyb20gXCIuL2RpcmVjdGl2ZXMvZm9jdXMta2V5LWxpc3QuZGlyZWN0aXZlXCI7XG5pbXBvcnQge0ZvY3VzS2V5TGlzdEl0ZW1EaXJlY3RpdmV9IGZyb20gXCIuL2RpcmVjdGl2ZXMvZm9jdXMta2V5LWxpc3QtaXRlbS5kaXJlY3RpdmVcIjtcbmltcG9ydCB7UmVzaXplRXZlbnREaXJlY3RpdmV9IGZyb20gXCIuL2RpcmVjdGl2ZXMvcmVzaXplLWV2ZW50LmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtTdGlja3lDb21wb25lbnR9IGZyb20gXCIuL2RpcmVjdGl2ZXMvc3RpY2t5XCI7XG5pbXBvcnQge1Rvb2x0aXBDb21wb25lbnR9IGZyb20gXCIuL2RpcmVjdGl2ZXMvdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtUb29sdGlwRGlyZWN0aXZlfSBmcm9tIFwiLi9kaXJlY3RpdmVzL3Rvb2x0aXAvdG9vbHRpcC5kaXJlY3RpdmVcIjtcblxuLy8gVUkgU2VydmljZVxuaW1wb3J0IHtTQ1JFRU5fU0laRV9SVUxFU30gZnJvbSBcIi4vdWkuc2VydmljZVwiO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdFNjcmVlblNpemVSdWxlcyA9IHtcbiAgICB4eGw6IFwiKG1pbi13aWR0aDogMTkyMHB4KVwiLFxuICAgIHhsOiBcIihtaW4td2lkdGg6IDEyMDBweCkgYW5kIChtYXgtd2lkdGg6IDE5MTkuOThweClcIixcbiAgICBsZzogXCIobWluLXdpZHRoOiA5OTJweCkgYW5kIChtYXgtd2lkdGg6IDExOTkuOThweClcIixcbiAgICBtZDogXCIobWluLXdpZHRoOiA3NjhweCkgYW5kIChtYXgtd2lkdGg6IDk5MS45OHB4KVwiLFxuICAgIHNtOiBcIihtaW4td2lkdGg6IDU3NnB4KSBhbmQgKG1heC13aWR0aDogNzY3Ljk4cHgpXCIsXG4gICAgeHM6IFwiKG1heC13aWR0aDogNTc1Ljk4cHgpXCIsXG59O1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBBMTF5TW9kdWxlLFxuICAgICAgICBJbnRsTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgRGF0ZVBpcGUsIEV4cHJQaXBlLCBNZW1vcnlTaXplUGlwZSwgTW9tZW50UGlwZSwgTnVtYmVyUGlwZSwgUmVsYXRpdmVUaW1lUGlwZSwgVGltZVBpcGUsIFZhbHVlUGlwZSxcbiAgICAgICAgQXV0b2ZvY3VzLCBDbGlja091dHNpZGUsIE1lZGlhSWYsIFNjcm9sbEludG9WaWV3LCBGb2N1c0tleUxpc3REaXJlY3RpdmUsIEZvY3VzS2V5TGlzdEl0ZW1EaXJlY3RpdmUsIFxuICAgICAgICBSZXNpemVFdmVudERpcmVjdGl2ZSwgU3RpY2t5Q29tcG9uZW50LCBUb29sdGlwQ29tcG9uZW50LCBUb29sdGlwRGlyZWN0aXZlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIERhdGVQaXBlLCBFeHByUGlwZSwgTWVtb3J5U2l6ZVBpcGUsIE1vbWVudFBpcGUsIE51bWJlclBpcGUsIFJlbGF0aXZlVGltZVBpcGUsIFRpbWVQaXBlLCBWYWx1ZVBpcGUsXG4gICAgICAgIEF1dG9mb2N1cywgQ2xpY2tPdXRzaWRlLCBNZWRpYUlmLCBTY3JvbGxJbnRvVmlldywgRm9jdXNLZXlMaXN0RGlyZWN0aXZlLCBGb2N1c0tleUxpc3RJdGVtRGlyZWN0aXZlLFxuICAgICAgICBSZXNpemVFdmVudERpcmVjdGl2ZSwgU3RpY2t5Q29tcG9uZW50LCBUb29sdGlwQ29tcG9uZW50LCBUb29sdGlwRGlyZWN0aXZlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogU0NSRUVOX1NJWkVfUlVMRVMsXG4gICAgICAgICAgICB1c2VWYWx1ZTogZGVmYXVsdFNjcmVlblNpemVSdWxlc1xuICAgICAgICB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBVdGlsc01vZHVsZSB7XG59XG4iXX0=