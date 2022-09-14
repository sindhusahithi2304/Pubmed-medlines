import { Directive, Input, HostListener } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "./ml-audit.service";
export class DwellTime {
    constructor(mlAuditService) {
        this.mlAuditService = mlAuditService;
    }
    ngOnInit() {
        if (this.options.actionType === "preview") {
            this.action = this.mlAuditService.newAction(this.options.actionType, this.options.docId);
            this.action.subType = "start";
            this.mlAuditService.notifyEvent(this.action);
            this.action.timestamp = this.mlAuditService.newTimestamp();
        }
    }
    ngOnDestroy() {
        if (this.options.actionType === "preview") {
            if (this.action) {
                this.mlAuditService.endAction(this.action);
                this.action = undefined;
            }
        }
    }
    onMouseEnter(event) {
        if (this.options.actionType === "over") {
            this.action = this.mlAuditService.newAction(this.options.actionType, this.options.docId);
            this.action.timestamp = this.mlAuditService.newTimestamp();
        }
    }
    onMouseLeave(event) {
        if (this.options.actionType === "over") {
            if (this.action) {
                this.action.dwellTime = this.mlAuditService.calcDwellTime(this.action);
                this.action.timestamp = undefined;
                this.mlAuditService.notifyEvent(this.action);
                this.action = undefined;
            }
        }
    }
}
DwellTime.ɵfac = function DwellTime_Factory(t) { return new (t || DwellTime)(i0.ɵɵdirectiveInject(i1.MlAuditService)); };
DwellTime.ɵdir = i0.ɵɵdefineDirective({ type: DwellTime, selectors: [["", "sqDwellTime", ""]], hostBindings: function DwellTime_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("mouseenter", function DwellTime_mouseenter_HostBindingHandler($event) { return ctx.onMouseEnter($event); })("mouseleave", function DwellTime_mouseleave_HostBindingHandler($event) { return ctx.onMouseLeave($event); });
    } }, inputs: { options: ["sqDwellTime", "options"] } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DwellTime, [{
        type: Directive,
        args: [{
                selector: "[sqDwellTime]"
            }]
    }], function () { return [{ type: i1.MlAuditService }]; }, { options: [{
            type: Input,
            args: ["sqDwellTime"]
        }], onMouseEnter: [{
            type: HostListener,
            args: ["mouseenter", ["$event"]]
        }], onMouseLeave: [{
            type: HostListener,
            args: ["mouseleave", ["$event"]]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHdlbGwtdGltZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9tYWNoaW5lLWxlYXJuaW5nLyIsInNvdXJjZXMiOlsiZHdlbGwtdGltZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFvQixNQUFNLGVBQWUsQ0FBQzs7O0FBV2hGLE1BQU0sT0FBTyxTQUFTO0lBSWxCLFlBQ2MsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQzVDLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pGLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUM5RDtJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDdkMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNiLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7YUFDM0I7U0FDSjtJQUNMLENBQUM7SUFHRCxZQUFZLENBQUMsS0FBaUI7UUFDMUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBSyxNQUFNLEVBQUU7WUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pGLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDOUQ7SUFDTCxDQUFDO0lBR0QsWUFBWSxDQUFDLEtBQWlCO1FBQzFCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFFO1lBQ3BDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDYixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQzthQUMzQjtTQUNKO0lBQ0wsQ0FBQzs7a0VBNUNRLFNBQVM7OENBQVQsU0FBUztzR0FBVCx3QkFBb0IscUZBQXBCLHdCQUFvQjs7a0RBQXBCLFNBQVM7Y0FIckIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxlQUFlO2FBQzVCO2lFQUV5QixPQUFPO2tCQUE1QixLQUFLO21CQUFDLGFBQWE7WUEwQnBCLFlBQVk7a0JBRFgsWUFBWTttQkFBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFTdEMsWUFBWTtrQkFEWCxZQUFZO21CQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dCwgSG9zdExpc3RlbmVyLCBPbkluaXQsIE9uRGVzdHJveX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7TWxBdWRpdFNlcnZpY2V9IGZyb20gXCIuL21sLWF1ZGl0LnNlcnZpY2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBEd2VsbFRpbWVPcHRpb25zIHtcbiAgICBhY3Rpb25UeXBlOiBNbEF1ZGl0U2VydmljZS5BY3Rpb25UeXBlO1xuICAgIGRvY0lkOiBzdHJpbmc7XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltzcUR3ZWxsVGltZV1cIlxufSlcbmV4cG9ydCBjbGFzcyBEd2VsbFRpbWUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KFwic3FEd2VsbFRpbWVcIikgb3B0aW9uczogRHdlbGxUaW1lT3B0aW9ucztcbiAgICBhY3Rpb246IE1sQXVkaXRTZXJ2aWNlLkFjdGlvbiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgbWxBdWRpdFNlcnZpY2U6IE1sQXVkaXRTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWN0aW9uVHlwZSA9PT0gXCJwcmV2aWV3XCIpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uID0gdGhpcy5tbEF1ZGl0U2VydmljZS5uZXdBY3Rpb24odGhpcy5vcHRpb25zLmFjdGlvblR5cGUsIHRoaXMub3B0aW9ucy5kb2NJZCk7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbi5zdWJUeXBlID0gXCJzdGFydFwiO1xuICAgICAgICAgICAgdGhpcy5tbEF1ZGl0U2VydmljZS5ub3RpZnlFdmVudCh0aGlzLmFjdGlvbik7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbi50aW1lc3RhbXAgPSB0aGlzLm1sQXVkaXRTZXJ2aWNlLm5ld1RpbWVzdGFtcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWN0aW9uVHlwZSA9PT0gXCJwcmV2aWV3XCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMubWxBdWRpdFNlcnZpY2UuZW5kQWN0aW9uKHRoaXMuYWN0aW9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIFtcIiRldmVudFwiXSlcbiAgICBvbk1vdXNlRW50ZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hY3Rpb25UeXBlID09PSBcIm92ZXJcIikge1xuICAgICAgICAgICAgdGhpcy5hY3Rpb24gPSB0aGlzLm1sQXVkaXRTZXJ2aWNlLm5ld0FjdGlvbih0aGlzLm9wdGlvbnMuYWN0aW9uVHlwZSwgdGhpcy5vcHRpb25zLmRvY0lkKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uLnRpbWVzdGFtcCA9IHRoaXMubWxBdWRpdFNlcnZpY2UubmV3VGltZXN0YW1wKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBbXCIkZXZlbnRcIl0pXG4gICAgb25Nb3VzZUxlYXZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWN0aW9uVHlwZSA9PT0gXCJvdmVyXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uLmR3ZWxsVGltZSA9IHRoaXMubWxBdWRpdFNlcnZpY2UuY2FsY0R3ZWxsVGltZSh0aGlzLmFjdGlvbik7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb24udGltZXN0YW1wID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRoaXMubWxBdWRpdFNlcnZpY2Uubm90aWZ5RXZlbnQodGhpcy5hY3Rpb24pO1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSJdfQ==