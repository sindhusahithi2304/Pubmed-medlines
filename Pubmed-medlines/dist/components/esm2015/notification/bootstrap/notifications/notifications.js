import { Component } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/notification";
import * as i2 from "@angular/common";
import * as i3 from "../notification/notification";
function BsNotifications_sq_notification_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "sq-notification", 2);
} if (rf & 2) {
    const notification_r1 = ctx.$implicit;
    i0.ɵɵproperty("notification", notification_r1);
} }
export class BsNotifications {
    constructor(notificationsService, changeDetectorRef) {
        this.notificationsService = notificationsService;
        this.changeDetectorRef = changeDetectorRef;
        this.notifications = [];
    }
    ngOnInit() {
        this.loadNotifications();
        this.subscription = this.notificationsService.events.subscribe((event) => {
            if (event.type === "updated") {
                this.loadNotifications();
                this.changeDetectorRef.markForCheck();
            }
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    loadNotifications() {
        this.notifications.splice(0);
        for (const notification of this.notificationsService.notifications) {
            if (notification.state !== 2 /* Hidden */) {
                this.notifications.unshift(notification);
            }
        }
    }
}
BsNotifications.ɵfac = function BsNotifications_Factory(t) { return new (t || BsNotifications)(i0.ɵɵdirectiveInject(i1.NotificationsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
BsNotifications.ɵcmp = i0.ɵɵdefineComponent({ type: BsNotifications, selectors: [["sq-notifications"]], decls: 2, vars: 1, consts: [[1, "sq-notifications"], [3, "notification", 4, "ngFor", "ngForOf"], [3, "notification"]], template: function BsNotifications_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, BsNotifications_sq_notification_1_Template, 1, 1, "sq-notification", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.notifications);
    } }, directives: [i2.NgForOf, i3.BsNotification], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsNotifications, [{
        type: Component,
        args: [{
                selector: "sq-notifications",
                templateUrl: "./notifications.html"
            }]
    }], function () { return [{ type: i1.NotificationsService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL25vdGlmaWNhdGlvbi8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9ub3RpZmljYXRpb25zL25vdGlmaWNhdGlvbnMudHMiLCJib290c3RyYXAvbm90aWZpY2F0aW9ucy9ub3RpZmljYXRpb25zLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBdUMsTUFBTSxlQUFlLENBQUM7Ozs7OztJQ0MxRSxxQ0FBNEc7OztJQUFoRCw4Q0FBNkI7O0FETzdGLE1BQU0sT0FBTyxlQUFlO0lBSXhCLFlBQ1ksb0JBQTBDLEVBQzFDLGlCQUFvQztRQURwQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDNUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUMxRCxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ04sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN6QztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxpQkFBaUI7UUFDYixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixLQUFLLE1BQU0sWUFBWSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUU7WUFDaEUsSUFBSSxZQUFZLENBQUMsS0FBSyxtQkFBNkIsRUFBRTtnQkFDakQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDNUM7U0FDSjtJQUNMLENBQUM7OzhFQWhDUSxlQUFlO29EQUFmLGVBQWU7UUNSNUIsOEJBQ0k7UUFBQSx3RkFBNEc7UUFDaEgsaUJBQU07O1FBRHdDLGVBQWdCO1FBQWhCLDJDQUFnQjs7a0RET2pELGVBQWU7Y0FKM0IsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFdBQVcsRUFBRSxzQkFBc0I7YUFDdEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdG9yUmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge05vdGlmaWNhdGlvbnNTZXJ2aWNlLCBOb3RpZmljYXRpb24sIE5vdGlmaWNhdGlvblN0YXRlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9ub3RpZmljYXRpb25cIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3Etbm90aWZpY2F0aW9uc1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbm90aWZpY2F0aW9ucy5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQnNOb3RpZmljYXRpb25zIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9uW107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25zU2VydmljZTogTm90aWZpY2F0aW9uc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IFtdO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmxvYWROb3RpZmljYXRpb25zKCk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5ub3RpZmljYXRpb25zU2VydmljZS5ldmVudHMuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwidXBkYXRlZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZE5vdGlmaWNhdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBsb2FkTm90aWZpY2F0aW9ucygpIHtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zLnNwbGljZSgwKTtcbiAgICAgICAgZm9yIChjb25zdCBub3RpZmljYXRpb24gb2YgdGhpcy5ub3RpZmljYXRpb25zU2VydmljZS5ub3RpZmljYXRpb25zKSB7XG4gICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uLnN0YXRlICE9PSBOb3RpZmljYXRpb25TdGF0ZS5IaWRkZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMudW5zaGlmdChub3RpZmljYXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsIjxkaXYgY2xhc3M9XCJzcS1ub3RpZmljYXRpb25zXCI+XG4gICAgPHNxLW5vdGlmaWNhdGlvbiAqbmdGb3I9XCJsZXQgbm90aWZpY2F0aW9uIG9mIG5vdGlmaWNhdGlvbnNcIiBbbm90aWZpY2F0aW9uXT1cIm5vdGlmaWNhdGlvblwiPjwvc3Etbm90aWZpY2F0aW9uPlxuPC9kaXY+Il19