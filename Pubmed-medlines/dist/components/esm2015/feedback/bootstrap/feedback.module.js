import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IntlModule } from "@sinequa/core/intl";
import { ValidationModule } from "@sinequa/core/validation";
import { BsActionModule } from "@sinequa/components/action";
import { BsModalModule } from "@sinequa/components/modal";
import { BsFeedbackMenu } from "./feedback-menu/feedback-menu";
import * as i0 from "@angular/core";
export class BsFeedbackModule {
}
BsFeedbackModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsFeedbackModule });
BsFeedbackModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsFeedbackModule_Factory(t) { return new (t || BsFeedbackModule)(); }, imports: [[
            CommonModule,
            IntlModule,
            BsActionModule,
            ValidationModule,
            BsModalModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsFeedbackModule, { declarations: [BsFeedbackMenu], imports: [CommonModule,
        IntlModule,
        BsActionModule,
        ValidationModule,
        BsModalModule], exports: [BsFeedbackMenu] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsFeedbackModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    IntlModule,
                    BsActionModule,
                    ValidationModule,
                    BsModalModule
                ],
                declarations: [
                    BsFeedbackMenu
                ],
                exports: [
                    BsFeedbackMenu
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVlZGJhY2subW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvZmVlZGJhY2svIiwic291cmNlcyI6WyJib290c3RyYXAvZmVlZGJhY2subW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDMUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXhELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQzs7QUFpQjdELE1BQU0sT0FBTyxnQkFBZ0I7O29EQUFoQixnQkFBZ0I7K0dBQWhCLGdCQUFnQixrQkFkaEI7WUFDTCxZQUFZO1lBQ1osVUFBVTtZQUNWLGNBQWM7WUFDZCxnQkFBZ0I7WUFDaEIsYUFBYTtTQUNoQjt3RkFRUSxnQkFBZ0IsbUJBTnJCLGNBQWMsYUFQZCxZQUFZO1FBQ1osVUFBVTtRQUNWLGNBQWM7UUFDZCxnQkFBZ0I7UUFDaEIsYUFBYSxhQU1iLGNBQWM7a0RBR1QsZ0JBQWdCO2NBZjVCLFFBQVE7ZUFBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixVQUFVO29CQUNWLGNBQWM7b0JBQ2QsZ0JBQWdCO29CQUNoQixhQUFhO2lCQUNoQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsY0FBYztpQkFDakI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGNBQWM7aUJBQ2pCO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcblxuaW1wb3J0IHtJbnRsTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9pbnRsXCI7XG5pbXBvcnQge1ZhbGlkYXRpb25Nb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb3JlL3ZhbGlkYXRpb25cIjtcbmltcG9ydCB7QnNBY3Rpb25Nb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2FjdGlvblwiO1xuaW1wb3J0IHtCc01vZGFsTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9tb2RhbFwiO1xuXG5pbXBvcnQge0JzRmVlZGJhY2tNZW51fSBmcm9tIFwiLi9mZWVkYmFjay1tZW51L2ZlZWRiYWNrLW1lbnVcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgSW50bE1vZHVsZSxcbiAgICAgICAgQnNBY3Rpb25Nb2R1bGUsXG4gICAgICAgIFZhbGlkYXRpb25Nb2R1bGUsXG4gICAgICAgIEJzTW9kYWxNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBCc0ZlZWRiYWNrTWVudVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBCc0ZlZWRiYWNrTWVudVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQnNGZWVkYmFja01vZHVsZSB7XG59XG4iXX0=