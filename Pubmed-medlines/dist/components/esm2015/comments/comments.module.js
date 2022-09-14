import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CollapseModule } from "@sinequa/components/collapse";
import { UtilsModule } from "@sinequa/components/utils";
import { IntlModule } from "@sinequa/core/intl";
import { LoginModule } from "@sinequa/core/login";
import { WebServicesModule } from "@sinequa/core/web-services";
import { CommentsComponent } from "./comments.component";
import { CreationDatePipe } from "./creation-date.pipe";
import { MarkdownPipe } from "./markdown.pipe";
import * as i0 from "@angular/core";
export class CommentsModule {
}
CommentsModule.ɵmod = i0.ɵɵdefineNgModule({ type: CommentsModule });
CommentsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function CommentsModule_Factory(t) { return new (t || CommentsModule)(); }, imports: [[
            CommonModule,
            WebServicesModule,
            IntlModule,
            LoginModule,
            UtilsModule,
            CollapseModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CommentsModule, { declarations: [CommentsComponent,
        CreationDatePipe,
        MarkdownPipe], imports: [CommonModule,
        WebServicesModule,
        IntlModule,
        LoginModule,
        UtilsModule,
        CollapseModule], exports: [CommentsComponent,
        MarkdownPipe] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CommentsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    WebServicesModule,
                    IntlModule,
                    LoginModule,
                    UtilsModule,
                    CollapseModule
                ],
                declarations: [
                    CommentsComponent,
                    CreationDatePipe,
                    MarkdownPipe
                ],
                exports: [
                    CommentsComponent,
                    MarkdownPipe
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvY29tbWVudHMvIiwic291cmNlcyI6WyJjb21tZW50cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUF1Qi9DLE1BQU0sT0FBTyxjQUFjOztrREFBZCxjQUFjOzJHQUFkLGNBQWMsa0JBcEJkO1lBQ0wsWUFBWTtZQUVaLGlCQUFpQjtZQUNqQixVQUFVO1lBQ1YsV0FBVztZQUVYLFdBQVc7WUFDWCxjQUFjO1NBQ2pCO3dGQVdRLGNBQWMsbUJBVG5CLGlCQUFpQjtRQUNqQixnQkFBZ0I7UUFDaEIsWUFBWSxhQVpaLFlBQVk7UUFFWixpQkFBaUI7UUFDakIsVUFBVTtRQUNWLFdBQVc7UUFFWCxXQUFXO1FBQ1gsY0FBYyxhQVFkLGlCQUFpQjtRQUNqQixZQUFZO2tEQUdQLGNBQWM7Y0FyQjFCLFFBQVE7ZUFBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFFWixpQkFBaUI7b0JBQ2pCLFVBQVU7b0JBQ1YsV0FBVztvQkFFWCxXQUFXO29CQUNYLGNBQWM7aUJBQ2pCO2dCQUNELFlBQVksRUFBRTtvQkFDVixpQkFBaUI7b0JBQ2pCLGdCQUFnQjtvQkFDaEIsWUFBWTtpQkFDZjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsaUJBQWlCO29CQUNqQixZQUFZO2lCQUNmO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQ29sbGFwc2VNb2R1bGUgfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9jb2xsYXBzZVwiO1xyXG5pbXBvcnQgeyBVdGlsc01vZHVsZSB9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3V0aWxzXCI7XHJcbmltcG9ydCB7IEludGxNb2R1bGUgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9pbnRsXCI7XHJcbmltcG9ydCB7IExvZ2luTW9kdWxlIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbG9naW5cIjtcclxuaW1wb3J0IHsgV2ViU2VydmljZXNNb2R1bGUgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcclxuaW1wb3J0IHsgQ29tbWVudHNDb21wb25lbnQgfSBmcm9tIFwiLi9jb21tZW50cy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ3JlYXRpb25EYXRlUGlwZSB9IGZyb20gXCIuL2NyZWF0aW9uLWRhdGUucGlwZVwiO1xyXG5pbXBvcnQgeyBNYXJrZG93blBpcGUgfSBmcm9tIFwiLi9tYXJrZG93bi5waXBlXCI7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZSxcclxuXHJcbiAgICAgICAgV2ViU2VydmljZXNNb2R1bGUsXHJcbiAgICAgICAgSW50bE1vZHVsZSxcclxuICAgICAgICBMb2dpbk1vZHVsZSxcclxuXHJcbiAgICAgICAgVXRpbHNNb2R1bGUsXHJcbiAgICAgICAgQ29sbGFwc2VNb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBDb21tZW50c0NvbXBvbmVudCxcclxuICAgICAgICBDcmVhdGlvbkRhdGVQaXBlLFxyXG4gICAgICAgIE1hcmtkb3duUGlwZVxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBDb21tZW50c0NvbXBvbmVudCxcclxuICAgICAgICBNYXJrZG93blBpcGVcclxuICAgIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb21tZW50c01vZHVsZSB7XHJcbn0iXX0=