import { Component, Input } from '@angular/core';
import { Action } from '@sinequa/components/action';
import { Utils } from '@sinequa/core/base';
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/login";
import * as i2 from "../../alerts.service";
import * as i3 from "@sinequa/components/search";
import * as i4 from "@angular/common";
import * as i5 from "@sinequa/components/action";
const _c0 = function (a0, a1, a2, a3) { return { item: a0, size: a1, autoAdjust: a2, autoAdjustBreakpoint: a3, inMenu: true }; };
function BsAlertsMenuComponent_li_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "li", 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("sq-action-item", i0.ɵɵpureFunction4(2, _c0, ctx_r0.menu, ctx_r0.size, ctx_r0.autoAdjust, ctx_r0.autoAdjustBreakpoint))("collapseBreakpoint", ctx_r0.collapseBreakpoint);
} }
export class BsAlertsMenuComponent {
    constructor(loginService, alertsService, searchService) {
        this.loginService = loginService;
        this.alertsService = alertsService;
        this.searchService = searchService;
        this.searchRoute = "/search";
        this.icon = "fas fa-bell";
        this.autoAdjust = true;
        this.autoAdjustBreakpoint = 'xl';
        this.collapseBreakpoint = 'sm';
        this.createAction = new Action({
            text: "msg#alerts.createAlert",
            title: "msg#alerts.createAlert",
            action: () => { this.alertsService.createAlertModal(); }
        });
        this.manageAction = new Action({
            text: "msg#alerts.manageAlerts",
            title: "msg#alerts.manageAlerts",
            action: () => { this.alertsService.manageAlertsModal(this.searchRoute); }
        });
    }
    ngOnInit() {
        this.updateMenu();
        this._alertsServiceSubscription = this.alertsService.changes.subscribe({
            next: () => { this.updateMenu(); }
        });
        this._loginServiceSubscription = this.loginService.events.subscribe(event => {
            if (event.type === "session-changed") {
                this.updateMenu();
            }
        });
        this._searchServiceSubscription = this.searchService.resultsStream.subscribe(results => {
            this.updateMenu();
        });
    }
    ngOnDestroy() {
        if (this._alertsServiceSubscription) {
            this._alertsServiceSubscription.unsubscribe();
        }
        if (this._loginServiceSubscription) {
            this._loginServiceSubscription.unsubscribe();
        }
        if (this._searchServiceSubscription) {
            this._searchServiceSubscription.unsubscribe();
        }
    }
    updateMenu() {
        if (!this.loginService.complete) {
            this.menu = undefined;
            return;
        }
        const alertsActions = [];
        if (this.alertsService.hasAlert) {
            const scrollGroup = new Action({
                scrollGroup: true,
                children: this.alertsService.alerts.map(alert => new Action({
                    text: alert.name,
                    data: alert,
                    action: (item) => {
                        const alert = Utils.copy(item.data);
                        this.alertsService.editAlertModal(alert, undefined, this.searchRoute);
                    }
                }))
            });
            alertsActions.push(scrollGroup);
        }
        if (!!this.searchService.results) {
            alertsActions.push(this.createAction);
        }
        if (this.alertsService.hasAlert) {
            alertsActions.push(this.manageAction);
        }
        this.menu = new Action({
            icon: this.icon,
            text: "msg#alerts.alerts",
            children: alertsActions
        });
    }
}
BsAlertsMenuComponent.ɵfac = function BsAlertsMenuComponent_Factory(t) { return new (t || BsAlertsMenuComponent)(i0.ɵɵdirectiveInject(i1.LoginService), i0.ɵɵdirectiveInject(i2.AlertsService), i0.ɵɵdirectiveInject(i3.SearchService)); };
BsAlertsMenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsAlertsMenuComponent, selectors: [["sq-alerts-menu"]], inputs: { searchRoute: "searchRoute", icon: "icon", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", size: "size" }, decls: 1, vars: 1, consts: [["class", "nav-item dropdown", 3, "sq-action-item", "collapseBreakpoint", 4, "ngIf"], [1, "nav-item", "dropdown", 3, "sq-action-item", "collapseBreakpoint"]], template: function BsAlertsMenuComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsAlertsMenuComponent_li_0_Template, 1, 7, "li", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !!ctx.menu && !ctx.menu.hidden);
    } }, directives: [i4.NgIf, i5.BsActionItem], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsAlertsMenuComponent, [{
        type: Component,
        args: [{
                selector: 'sq-alerts-menu',
                templateUrl: './alerts-menu.component.html'
            }]
    }], function () { return [{ type: i1.LoginService }, { type: i2.AlertsService }, { type: i3.SearchService }]; }, { searchRoute: [{
            type: Input
        }], icon: [{
            type: Input
        }], autoAdjust: [{
            type: Input
        }], autoAdjustBreakpoint: [{
            type: Input
        }], collapseBreakpoint: [{
            type: Input
        }], size: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRzLW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvYWxlcnRzLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2FsZXJ0cy1tZW51L2FsZXJ0cy1tZW51LmNvbXBvbmVudC50cyIsImJvb3RzdHJhcC9hbGVydHMtbWVudS9hbGVydHMtbWVudS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFJcEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7Ozs7SUNMM0Msd0JBR007OztJQUZGLHFJQUE2SCxpREFBQTs7QURXakksTUFBTSxPQUFPLHFCQUFxQjtJQWVoQyxZQUNTLFlBQTBCLEVBQzFCLGFBQTRCLEVBQzVCLGFBQTRCO1FBRjVCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBaEI1QixnQkFBVyxHQUFXLFNBQVMsQ0FBQztRQUNoQyxTQUFJLEdBQVcsYUFBYSxDQUFDO1FBQzdCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IseUJBQW9CLEdBQVcsSUFBSSxDQUFDO1FBQ3BDLHVCQUFrQixHQUFXLElBQUksQ0FBQztRQWV6QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDO1lBQzdCLElBQUksRUFBRSx3QkFBd0I7WUFDOUIsS0FBSyxFQUFFLHdCQUF3QjtZQUMvQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN6RCxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsWUFBWSxHQUFH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Q0FBQyxZQUFZLENBQUMsQ0FBQztTQUN6QztRQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUM7WUFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixRQUFRLEVBQUUsYUFBYTtTQUN4QixDQUFDLENBQUM7SUFDTCxDQUFDOzswRkF0R1UscUJBQXFCOzBEQUFyQixxQkFBcUI7UUNabEMsb0VBR007O1FBSEQscURBQTRCOztrRERZcEIscUJBQXFCO2NBSmpDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixXQUFXLEVBQUUsOEJBQThCO2FBQzVDO3VIQUdVLFdBQVc7a0JBQW5CLEtBQUs7WUFDRyxJQUFJO2tCQUFaLEtBQUs7WUFDRyxVQUFVO2tCQUFsQixLQUFLO1lBQ0csb0JBQW9CO2tCQUE1QixLQUFLO1lBQ0csa0JBQWtCO2tCQUExQixLQUFLO1lBQ0csSUFBSTtrQkFBWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BzaW5lcXVhL2NvbXBvbmVudHMvYWN0aW9uJztcbmltcG9ydCB7IExvZ2luU2VydmljZSB9IGZyb20gJ0BzaW5lcXVhL2NvcmUvbG9naW4nO1xuaW1wb3J0IHsgQWxlcnRzU2VydmljZSwgQWxlcnQgfSBmcm9tICcuLi8uLi9hbGVydHMuc2VydmljZSc7XG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnQHNpbmVxdWEvY29tcG9uZW50cy9zZWFyY2gnO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICdAc2luZXF1YS9jb3JlL2Jhc2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NxLWFsZXJ0cy1tZW51JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FsZXJ0cy1tZW51LmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBCc0FsZXJ0c01lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIFxuICBASW5wdXQoKSBzZWFyY2hSb3V0ZTogc3RyaW5nID0gXCIvc2VhcmNoXCI7XG4gIEBJbnB1dCgpIGljb246IHN0cmluZyA9IFwiZmFzIGZhLWJlbGxcIjtcbiAgQElucHV0KCkgYXV0b0FkanVzdDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGF1dG9BZGp1c3RCcmVha3BvaW50OiBzdHJpbmcgPSAneGwnO1xuICBASW5wdXQoKSBjb2xsYXBzZUJyZWFrcG9pbnQ6IHN0cmluZyA9ICdzbSc7XG4gIEBJbnB1dCgpIHNpemU6IHN0cmluZztcblxuICBtZW51OiBBY3Rpb24gfCB1bmRlZmluZWQ7XG5cbiAgLy8gQWxlcnRzIGFjdGlvbnNcbiAgY3JlYXRlQWN0aW9uOiBBY3Rpb247XG4gIG1hbmFnZUFjdGlvbjogQWN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBsb2dpblNlcnZpY2U6IExvZ2luU2VydmljZSxcbiAgICBwdWJsaWMgYWxlcnRzU2VydmljZTogQWxlcnRzU2VydmljZSxcbiAgICBwdWJsaWMgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZVxuICApIHtcblxuICAgIHRoaXMuY3JlYXRlQWN0aW9uID0gbmV3IEFjdGlvbih7XG4gICAgICB0ZXh0OiBcIm1zZyNhbGVydHMuY3JlYXRlQWxlcnRcIixcbiAgICAgIHRpdGxlOiBcIm1zZyNhbGVydHMuY3JlYXRlQWxlcnRcIixcbiAgICAgIGFjdGlvbjogKCkgPT4geyB0aGlzLmFsZXJ0c1NlcnZpY2UuY3JlYXRlQWxlcnRNb2RhbCgpOyB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm1hbmFnZUFjdGlvbiA9IG5ldyBBY3Rpb24oe1xuICAgICAgdGV4dDogXCJtc2cjYWxlcnRzLm1hbmFnZUFsZXJ0c1wiLFxuICAgICAgdGl0bGU6IFwibXNnI2FsZXJ0cy5tYW5hZ2VBbGVydHNcIixcbiAgICAgIGFjdGlvbjogKCkgPT4geyB0aGlzLmFsZXJ0c1NlcnZpY2UubWFuYWdlQWxlcnRzTW9kYWwodGhpcy5zZWFyY2hSb3V0ZSk7IH1cbiAgICB9KTtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy51cGRhdGVNZW51KCk7XG4gICAgdGhpcy5fYWxlcnRzU2VydmljZVN1YnNjcmlwdGlvbiA9IHRoaXMuYWxlcnRzU2VydmljZS5jaGFuZ2VzLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAoKSA9PiB7IHRoaXMudXBkYXRlTWVudSgpOyB9XG4gICAgfSk7XG4gICAgdGhpcy5fbG9naW5TZXJ2aWNlU3Vic2NyaXB0aW9uID0gdGhpcy5sb2dpblNlcnZpY2UuZXZlbnRzLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICBpZihldmVudC50eXBlID09PSBcInNlc3Npb24tY2hhbmdlZFwiKXtcbiAgICAgICAgdGhpcy51cGRhdGVNZW51KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fc2VhcmNoU2VydmljZVN1YnNjcmlwdGlvbiA9IHRoaXMuc2VhcmNoU2VydmljZS5yZXN1bHRzU3RyZWFtLnN1YnNjcmliZShyZXN1bHRzID0+IHtcbiAgICAgIHRoaXMudXBkYXRlTWVudSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWxlcnRzU2VydmljZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIF9sb2dpblNlcnZpY2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfc2VhcmNoU2VydmljZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBuZ09uRGVzdHJveSgpe1xuICAgIGlmKHRoaXMuX2FsZXJ0c1NlcnZpY2VTdWJzY3JpcHRpb24pe1xuICAgICAgdGhpcy5fYWxlcnRzU2VydmljZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZih0aGlzLl9sb2dpblNlcnZpY2VTdWJzY3JpcHRpb24pe1xuICAgICAgdGhpcy5fbG9naW5TZXJ2aWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmKHRoaXMuX3NlYXJjaFNlcnZpY2VTdWJzY3JpcHRpb24pe1xuICAgICAgdGhpcy5fc2VhcmNoU2VydmljZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZU1lbnUoKSB7XG5cbiAgICBpZiAoIXRoaXMubG9naW5TZXJ2aWNlLmNvbXBsZXRlKSB7XG4gICAgICB0aGlzLm1lbnUgPSB1bmRlZmluZWQ7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYWxlcnRzQWN0aW9uczogQWN0aW9uW10gPSBbXTtcblxuICAgIGlmICh0aGlzLmFsZXJ0c1NlcnZpY2UuaGFzQWxlcnQpIHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsR3JvdXAgPSBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgIHNjcm9sbEdyb3VwOiB0cnVlLFxuICAgICAgICAgICAgY2hpbGRyZW46IHRoaXMuYWxlcnRzU2VydmljZS5hbGVydHMubWFwKGFsZXJ0ID0+IG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgICB0ZXh0OiBhbGVydC5uYW1lLFxuICAgICAgICAgICAgICBkYXRhOiBhbGVydCxcbiAgICAgICAgICAgICAgYWN0aW9uOiAoaXRlbTogQWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWxlcnQ6IEFsZXJ0ID0gVXRpbHMuY29weShpdGVtLmRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRzU2VydmljZS5lZGl0QWxlcnRNb2RhbChhbGVydCwgdW5kZWZpbmVkLCB0aGlzLnNlYXJjaFJvdXRlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKVxuICAgICAgICB9KTtcbiAgICAgICAgYWxlcnRzQWN0aW9ucy5wdXNoKHNjcm9sbEdyb3VwKTtcbiAgICB9XG5cbiAgICBpZiAoISF0aGlzLnNlYXJjaFNlcnZpY2UucmVzdWx0cykge1xuICAgICAgICBhbGVydHNBY3Rpb25zLnB1c2godGhpcy5jcmVhdGVBY3Rpb24pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFsZXJ0c1NlcnZpY2UuaGFzQWxlcnQpIHtcbiAgICAgICAgYWxlcnRzQWN0aW9ucy5wdXNoKHRoaXMubWFuYWdlQWN0aW9uKTtcbiAgICB9XG5cbiAgICB0aGlzLm1lbnUgPSBuZXcgQWN0aW9uKHtcbiAgICAgIGljb246IHRoaXMuaWNvbixcbiAgICAgIHRleHQ6IFwibXNnI2FsZXJ0cy5hbGVydHNcIixcbiAgICAgIGNoaWxkcmVuOiBhbGVydHNBY3Rpb25zXG4gICAgfSk7XG4gIH1cblxufVxuIiwiPGxpICpuZ0lmPVwiISFtZW51ICYmICFtZW51LmhpZGRlblwiIGNsYXNzPVwibmF2LWl0ZW0gZHJvcGRvd25cIiBcbiAgICBbc3EtYWN0aW9uLWl0ZW1dPVwie2l0ZW06IG1lbnUsIHNpemU6IHNpemUsIGF1dG9BZGp1c3Q6IGF1dG9BZGp1c3QsIGF1dG9BZGp1c3RCcmVha3BvaW50OiBhdXRvQWRqdXN0QnJlYWtwb2ludCwgaW5NZW51OiB0cnVlfVwiXG4gICAgW2NvbGxhcHNlQnJlYWtwb2ludF09XCJjb2xsYXBzZUJyZWFrcG9pbnRcIlxuPjwvbGk+Il19