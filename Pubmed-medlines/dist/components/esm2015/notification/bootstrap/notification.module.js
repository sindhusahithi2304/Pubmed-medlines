import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BsNotification } from "./notification/notification";
import { BsNotifications } from "./notifications/notifications";
import { BsNotificationsManager } from "./notifications-manager/notifications-manager";
import { IntlModule } from "@sinequa/core/intl";
import { BsActionModule } from "@sinequa/components/action";
import * as i0 from "@angular/core";
export class BsNotificationModule {
}
BsNotificationModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsNotificationModule });
BsNotificationModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsNotificationModule_Factory(t) { return new (t || BsNotificationModule)(); }, imports: [[
            CommonModule,
            IntlModule,
            BsActionModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsNotificationModule, { declarations: [BsNotification, BsNotifications, BsNotificationsManager], imports: [CommonModule,
        IntlModule,
        BsActionModule], exports: [BsNotifications, BsNotificationsManager] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsNotificationModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    IntlModule,
                    BsActionModule,
                ],
                declarations: [
                    BsNotification, BsNotifications, BsNotificationsManager
                ],
                exports: [
                    BsNotifications, BsNotificationsManager
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL25vdGlmaWNhdGlvbi8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9ub3RpZmljYXRpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDOUQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sK0NBQStDLENBQUM7QUFFckYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQzs7QUFlMUQsTUFBTSxPQUFPLG9CQUFvQjs7d0RBQXBCLG9CQUFvQjt1SEFBcEIsb0JBQW9CLGtCQVpwQjtZQUNMLFlBQVk7WUFDWixVQUFVO1lBQ1YsY0FBYztTQUNqQjt3RkFRUSxvQkFBb0IsbUJBTnpCLGNBQWMsRUFBRSxlQUFlLEVBQUUsc0JBQXNCLGFBTHZELFlBQVk7UUFDWixVQUFVO1FBQ1YsY0FBYyxhQU1kLGVBQWUsRUFBRSxzQkFBc0I7a0RBR2xDLG9CQUFvQjtjQWJoQyxRQUFRO2VBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osVUFBVTtvQkFDVixjQUFjO2lCQUNqQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsY0FBYyxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7aUJBQzFEO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxlQUFlLEVBQUUsc0JBQXNCO2lCQUMxQzthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge0JzTm90aWZpY2F0aW9ufSBmcm9tIFwiLi9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uXCI7XG5pbXBvcnQge0JzTm90aWZpY2F0aW9uc30gZnJvbSBcIi4vbm90aWZpY2F0aW9ucy9ub3RpZmljYXRpb25zXCI7XG5pbXBvcnQge0JzTm90aWZpY2F0aW9uc01hbmFnZXJ9IGZyb20gXCIuL25vdGlmaWNhdGlvbnMtbWFuYWdlci9ub3RpZmljYXRpb25zLW1hbmFnZXJcIjtcblxuaW1wb3J0IHtJbnRsTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9pbnRsXCI7XG5pbXBvcnQge0JzQWN0aW9uTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9hY3Rpb25cIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgSW50bE1vZHVsZSxcbiAgICAgICAgQnNBY3Rpb25Nb2R1bGUsXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQnNOb3RpZmljYXRpb24sIEJzTm90aWZpY2F0aW9ucywgQnNOb3RpZmljYXRpb25zTWFuYWdlclxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBCc05vdGlmaWNhdGlvbnMsIEJzTm90aWZpY2F0aW9uc01hbmFnZXJcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEJzTm90aWZpY2F0aW9uTW9kdWxlIHtcbn1cbiJdfQ==