import { Component } from "@angular/core";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/notification";
import * as i2 from "@sinequa/components/action";
const _c0 = function (a0) { return [a0]; };
const _c1 = function (a0) { return { items: a0 }; };
export class BsNotificationsManager {
    constructor(notificationsService, changeDetectorRef) {
        this.notificationsService = notificationsService;
        this.changeDetectorRef = changeDetectorRef;
    }
    ngOnInit() {
        this.buildAction();
        this.unbind();
        this.bind();
    }
    bind() {
        this.subscription = this.notificationsService.notificationsStream.subscribe(notification => {
            this.action.update();
        });
    }
    unbind() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }
    ngOnDestroy() {
        this.unbind();
    }
    buildAction() {
        this.action = new Action({
            icon: "fas fa-shield-alt",
            title: "msg#notification.title",
            hidden: true,
            children: [
                new Action({
                    text: "msg#notification.showNotifications",
                    action: (item, $event) => {
                        this.notificationsService.showNotifications();
                    },
                    updater: (item) => {
                        item.hidden = this.notificationsService.allNotificationsShowing;
                        this.changeDetectorRef.markForCheck();
                    }
                }),
                new Action({
                    text: "msg#notification.hideNotifications",
                    action: (item, $event) => {
                        this.notificationsService.hideNotifications();
                    },
                    updater: (item) => {
                        item.hidden = this.notificationsService.allNotificationsHidden;
                        this.changeDetectorRef.markForCheck();
                    }
                }),
                new Action({
                    separator: true
                }),
                new Action({
                    text: "msg#notification.clearNotifications",
                    action: (item, $event) => {
                        this.notificationsService.deleteAllNotifications();
                    }
                })
            ]
        });
    }
}
BsNotificationsManager.ɵfac = function BsNotificationsManager_Factory(t) { return new (t || BsNotificationsManager)(i0.ɵɵdirectiveInject(i1.NotificationsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
BsNotificationsManager.ɵcmp = i0.ɵɵdefineComponent({ type: BsNotificationsManager, selectors: [["sq-notifications-manager"]], decls: 2, vars: 5, consts: [[1, "btn-toolbar", "dropup"], [1, "btn-group", 3, "sq-action-buttons"]], template: function BsNotificationsManager_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelement(1, "div", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction1(3, _c1, i0.ɵɵpureFunction1(1, _c0, ctx.action)));
    } }, directives: [i2.BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsNotificationsManager, [{
        type: Component,
        args: [{
                selector: "sq-notifications-manager",
                templateUrl: "./notifications-manager.html"
            }]
    }], function () { return [{ type: i1.NotificationsService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL25vdGlmaWNhdGlvbnMtbWFuYWdlci9ub3RpZmljYXRpb25zLW1hbmFnZXIudHMiLCJib290c3RyYXAvbm90aWZpY2F0aW9ucy1tYW5hZ2VyL25vdGlmaWNhdGlvbnMtbWFuYWdlci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQXVDLE1BQU0sZUFBZSxDQUFDO0FBRzlFLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7O0FBT2xELE1BQU0sT0FBTyxzQkFBc0I7SUFLL0IsWUFDWSxvQkFBMEMsRUFDMUMsaUJBQW9DO1FBRHBDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUNoRCxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQ3ZFLFlBQVksQ0FBQyxFQUFFO1lBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUM7WUFDckIsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixLQUFLLEVBQUUsd0JBQXdCO1lBQy9CLE1BQU0sRUFBRSxJQUFJO1lBQ1osUUFBUSxFQUFFO2dCQUNOLElBQUksTUFBTSxDQUFDO29CQUNQLElBQUksRUFBRSxvQ0FBb0M7b0JBQzFDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTt3QkFDckIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ2xELENBQUM7b0JBQ0QsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7d0JBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsdUJBQXVCLENBQUM7d0JBQ2hFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDMUMsQ0FBQztpQkFDSixDQUFDO2dCQUNGLElBQUksTUFBTSxDQUFDO29CQUNQLElBQUksRUFBRSxvQ0FBb0M7b0JBQzFDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTt3QkFDckIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ2xELENBQUM7b0JBQ0QsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7d0JBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsc0JBQXNCLENBQUM7d0JBQy9ELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDMUMsQ0FBQztpQkFDSixDQUFDO2dCQUNGLElBQUksTUFBTSxDQUFDO29CQUNQLFNBQVMsRUFBRSxJQUFJO2lCQUNsQixDQUFDO2dCQUNGLElBQUksTUFBTSxDQUFDO29CQUNQLElBQUksRUFBRSxxQ0FBcUM7b0JBQzNDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTt3QkFDckIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLHNCQUFzQixFQUFFLENBQUM7b0JBQ3ZELENBQUM7aUJBQ0osQ0FBQzthQUNMO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7NEZBdkVRLHNCQUFzQjsyREFBdEIsc0JBQXNCO1FDVm5DLDhCQUNJO1FBQUEseUJBQXFFO1FBQ3pFLGlCQUFNOztRQURxQixlQUF1QztRQUF2QyxzR0FBdUM7O2tERFNyRCxzQkFBc0I7Y0FKbEMsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFdBQVcsRUFBRSw4QkFBOEI7YUFDOUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdG9yUmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge05vdGlmaWNhdGlvbnNTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9ub3RpZmljYXRpb25cIjtcbmltcG9ydCB7QWN0aW9ufSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9hY3Rpb25cIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1ub3RpZmljYXRpb25zLW1hbmFnZXJcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL25vdGlmaWNhdGlvbnMtbWFuYWdlci5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQnNOb3RpZmljYXRpb25zTWFuYWdlciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuICAgIGFjdGlvbjogQWN0aW9uO1xuICAgIHJhbmRvbUFjdGlvbjogQWN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uc1NlcnZpY2U6IE5vdGlmaWNhdGlvbnNTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmJ1aWxkQWN0aW9uKCk7XG4gICAgICAgIHRoaXMudW5iaW5kKCk7XG4gICAgICAgIHRoaXMuYmluZCgpO1xuICAgIH1cblxuICAgIGJpbmQoKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5ub3RpZmljYXRpb25zU2VydmljZS5ub3RpZmljYXRpb25zU3RyZWFtLnN1YnNjcmliZShcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb24udXBkYXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVuYmluZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmQoKTtcbiAgICB9XG5cbiAgICBidWlsZEFjdGlvbigpIHtcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgIGljb246IFwiZmFzIGZhLXNoaWVsZC1hbHRcIixcbiAgICAgICAgICAgIHRpdGxlOiBcIm1zZyNub3RpZmljYXRpb24udGl0bGVcIixcbiAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgbmV3IEFjdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwibXNnI25vdGlmaWNhdGlvbi5zaG93Tm90aWZpY2F0aW9uc1wiLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IChpdGVtLCAkZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uc1NlcnZpY2Uuc2hvd05vdGlmaWNhdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlcjogKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaGlkZGVuID0gdGhpcy5ub3RpZmljYXRpb25zU2VydmljZS5hbGxOb3RpZmljYXRpb25zU2hvd2luZztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJtc2cjbm90aWZpY2F0aW9uLmhpZGVOb3RpZmljYXRpb25zXCIsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogKGl0ZW0sICRldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zU2VydmljZS5oaWRlTm90aWZpY2F0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVyOiAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5oaWRkZW4gPSB0aGlzLm5vdGlmaWNhdGlvbnNTZXJ2aWNlLmFsbE5vdGlmaWNhdGlvbnNIaWRkZW47XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbmV3IEFjdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIHNlcGFyYXRvcjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIm1zZyNub3RpZmljYXRpb24uY2xlYXJOb3RpZmljYXRpb25zXCIsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogKGl0ZW0sICRldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zU2VydmljZS5kZWxldGVBbGxOb3RpZmljYXRpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG59IiwiPGRpdiBjbGFzcz1cImJ0bi10b29sYmFyIGRyb3B1cFwiPlxuICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiBbc3EtYWN0aW9uLWJ1dHRvbnNdPVwie2l0ZW1zOiBbYWN0aW9uXX1cIj48L2Rpdj5cbjwvZGl2PiJdfQ==