import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IntlModule } from "@sinequa/core/intl";
import { LoadComponentModule } from "@sinequa/core/load-component";
import { UtilsModule } from "@sinequa/components/utils";
import { BsActionButtons } from "./action-buttons/action-buttons";
import { BsActionItemContent } from "./action-item-content/action-item-content";
import { BsActionItem } from "./action-item/action-item";
import { BsActionMenu } from "./action-menu/action-menu";
import { BsDropdownMenu } from "./dropdown-menu/dropdown-menu";
import { BsDropdownDirective } from "./dropdown.directive";
import * as i0 from "@angular/core";
export class BsActionModule {
}
BsActionModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsActionModule });
BsActionModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsActionModule_Factory(t) { return new (t || BsActionModule)(); }, imports: [[
            CommonModule,
            IntlModule,
            LoadComponentModule,
            UtilsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsActionModule, { declarations: [BsActionButtons,
        BsActionItemContent,
        BsActionItem,
        BsActionMenu,
        BsDropdownMenu,
        BsDropdownDirective], imports: [CommonModule,
        IntlModule,
        LoadComponentModule,
        UtilsModule], exports: [BsActionButtons,
        BsActionMenu,
        BsActionItem,
        BsDropdownDirective] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsActionModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    IntlModule,
                    LoadComponentModule,
                    UtilsModule
                ],
                declarations: [
                    BsActionButtons,
                    BsActionItemContent,
                    BsActionItem,
                    BsActionMenu,
                    BsDropdownMenu,
                    BsDropdownDirective
                ],
                exports: [
                    BsActionButtons,
                    BsActionMenu,
                    BsActionItem,
                    BsDropdownDirective
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2FjdGlvbi8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9hY3Rpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFdEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzlFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDOztBQXlCekQsTUFBTSxPQUFPLGNBQWM7O2tEQUFkLGNBQWM7MkdBQWQsY0FBYyxrQkFyQmQ7WUFDTCxZQUFZO1lBQ1osVUFBVTtZQUNWLG1CQUFtQjtZQUNuQixXQUFXO1NBQ2Q7d0ZBZ0JRLGNBQWMsbUJBZG5CLGVBQWU7UUFDZixtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLFlBQVk7UUFDWixjQUFjO1FBQ2QsbUJBQW1CLGFBWG5CLFlBQVk7UUFDWixVQUFVO1FBQ1YsbUJBQW1CO1FBQ25CLFdBQVcsYUFXWCxlQUFlO1FBQ2YsWUFBWTtRQUNaLFlBQVk7UUFDWixtQkFBbUI7a0RBR2QsY0FBYztjQXRCMUIsUUFBUTtlQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFVBQVU7b0JBQ1YsbUJBQW1CO29CQUNuQixXQUFXO2lCQUNkO2dCQUNELFlBQVksRUFBRTtvQkFDVixlQUFlO29CQUNmLG1CQUFtQjtvQkFDbkIsWUFBWTtvQkFDWixZQUFZO29CQUNaLGNBQWM7b0JBQ2QsbUJBQW1CO2lCQUN0QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsZUFBZTtvQkFDZixZQUFZO29CQUNaLFlBQVk7b0JBQ1osbUJBQW1CO2lCQUN0QjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5cbmltcG9ydCB7SW50bE1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvaW50bFwiO1xuaW1wb3J0IHtMb2FkQ29tcG9uZW50TW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9sb2FkLWNvbXBvbmVudFwiO1xuaW1wb3J0IHtVdGlsc01vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvdXRpbHNcIjtcblxuaW1wb3J0IHtCc0FjdGlvbkJ1dHRvbnN9IGZyb20gXCIuL2FjdGlvbi1idXR0b25zL2FjdGlvbi1idXR0b25zXCI7XG5pbXBvcnQge0JzQWN0aW9uSXRlbUNvbnRlbnR9IGZyb20gXCIuL2FjdGlvbi1pdGVtLWNvbnRlbnQvYWN0aW9uLWl0ZW0tY29udGVudFwiO1xuaW1wb3J0IHtCc0FjdGlvbkl0ZW19IGZyb20gXCIuL2FjdGlvbi1pdGVtL2FjdGlvbi1pdGVtXCI7XG5pbXBvcnQge0JzQWN0aW9uTWVudX0gZnJvbSBcIi4vYWN0aW9uLW1lbnUvYWN0aW9uLW1lbnVcIjtcbmltcG9ydCB7QnNEcm9wZG93bk1lbnV9IGZyb20gXCIuL2Ryb3Bkb3duLW1lbnUvZHJvcGRvd24tbWVudVwiO1xuaW1wb3J0IHtCc0Ryb3Bkb3duRGlyZWN0aXZlfSBmcm9tIFwiLi9kcm9wZG93bi5kaXJlY3RpdmVcIjtcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBJbnRsTW9kdWxlLFxuICAgICAgICBMb2FkQ29tcG9uZW50TW9kdWxlLFxuICAgICAgICBVdGlsc01vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEJzQWN0aW9uQnV0dG9ucyxcbiAgICAgICAgQnNBY3Rpb25JdGVtQ29udGVudCxcbiAgICAgICAgQnNBY3Rpb25JdGVtLFxuICAgICAgICBCc0FjdGlvbk1lbnUsXG4gICAgICAgIEJzRHJvcGRvd25NZW51LFxuICAgICAgICBCc0Ryb3Bkb3duRGlyZWN0aXZlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEJzQWN0aW9uQnV0dG9ucyxcbiAgICAgICAgQnNBY3Rpb25NZW51LFxuICAgICAgICBCc0FjdGlvbkl0ZW0sXG4gICAgICAgIEJzRHJvcGRvd25EaXJlY3RpdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEJzQWN0aW9uTW9kdWxlIHtcbn0iXX0=