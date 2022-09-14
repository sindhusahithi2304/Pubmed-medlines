import { Component, Input } from '@angular/core';
import { Action } from '@sinequa/components/action';
import { Utils } from '@sinequa/core/base';
import { BsOverrideUser } from '@sinequa/components/modal';
import { ModalButton } from '@sinequa/core/modal';
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/web-services";
import * as i2 from "@sinequa/core/login";
import * as i3 from "@sinequa/core/intl";
import * as i4 from "@sinequa/core/modal";
import * as i5 from "@sinequa/core/app-utils";
import * as i6 from "@sinequa/core/notification";
import * as i7 from "@angular/common";
import * as i8 from "@sinequa/components/action";
const _c0 = function (a0, a1, a2, a3) { return { item: a0, size: a1, autoAdjust: a2, autoAdjustBreakpoint: a3, inMenu: true }; };
function BsUserMenuComponent_li_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "li", 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("sq-action-item", i0.ɵɵpureFunction4(2, _c0, ctx_r0.menu, ctx_r0.size, ctx_r0.autoAdjust, ctx_r0.autoAdjustBreakpoint))("collapseBreakpoint", ctx_r0.collapseBreakpoint);
} }
export class BsUserMenuComponent {
    constructor(principalService, authenticationService, intlService, loginService, modalService, appService, userSettingsService, notificationsService, changeDetectorRef) {
        // Actions objects are initialized in the constructor
        this.principalService = principalService;
        this.authenticationService = authenticationService;
        this.intlService = intlService;
        this.loginService = loginService;
        this.modalService = modalService;
        this.appService = appService;
        this.userSettingsService = userSettingsService;
        this.notificationsService = notificationsService;
        this.changeDetectorRef = changeDetectorRef;
        this.icon = "fas fa-user";
        this.autoAdjust = true;
        this.autoAdjustBreakpoint = 'xl';
        this.collapseBreakpoint = 'sm';
        // User Menu
        // Login
        this.loginAction = new Action({
            text: "msg#userMenu.login",
            title: "msg#userMenu.login",
            action: () => {
                this.loginService.login();
            }
        });
        // Logout
        this.logoutAction = new Action({
            text: "msg#userMenu.logout",
            title: "msg#userMenu.logout",
            action: () => {
                this.loginService.logout();
                this.changeDetectorRef.markForCheck();
            }
        });
        // Override a user's identity
        this.overrideAction = new Action({
            text: "msg#userMenu.overrideUser",
            title: "msg#userMenu.overrideUser",
            action: () => {
                let userOverride = this.authenticationService.userOverride ?
                    Utils.copy(this.authenticationService.userOverride) : undefined;
                if (!userOverride) {
                    userOverride = {
                        userName: "",
                        domain: ""
                    };
                }
                this.modalService.open(BsOverrideUser, { model: userOverride })
                    .then((result) => {
                    if (result === -1 /* OK */) {
                        this.loginService.overrideUser(userOverride);
                        this.changeDetectorRef.markForCheck();
                    }
                });
            }
        });
        // Cancel user override
        this.revertOverrideAction = new Action({
            text: "msg#userMenu.revertUserOverride",
            title: "msg#userMenu.revertUserOverride",
            action: () => {
                this.loginService.overrideUser(undefined);
                this.changeDetectorRef.markForCheck();
            }
        });
        // Link to the admin
        this.adminAction = new Action({
            text: "msg#userMenu.administration",
            title: "msg#userMenu.administration",
            href: this.appService.adminUrl
        });
        // Language menu
        this.languageAction = new Action({
            text: "msg#userMenu.language",
            title: "msg#userMenu.language",
            children: this.intlService.locales.map(locale => new Action({
                text: locale.display,
                title: locale.display,
                data: locale,
                selected: locale === this.intlService.currentLocale,
                iconAfter: "sq-image sq-flag-" + locale.name,
                action: (item, $event) => {
                    this.intlService.use(item.data.name).subscribe((value) => this.languageAction.children.forEach(a => a.update()));
                },
                updater: (action) => {
                    action.selected = action.data === this.intlService.currentLocale;
                }
            }))
        });
        this.resetUserSettings = new Action({
            text: "msg#userMenu.resetUserSettings.menu",
            title: "msg#userMenu.resetUserSettings.menu",
            action: () => {
                this.modalService.confirm({
                    title: "msg#userMenu.resetUserSettings.modalTitle",
                    message: "msg#userMenu.resetUserSettings.modalMessage",
                    buttons: [
                        new ModalButton({ result: -1 /* OK */, text: "msg#userMenu.resetUserSettings.modalConfirmButton" }),
                        new ModalButton({ result: -2 /* Cancel */, primary: true })
                    ],
                    confirmType: 2 /* Warning */
                }).then(res => {
                    if (res === -1 /* OK */) {
                        this.userSettingsService.reset().subscribe({
                            next: () => this.notificationsService.notify(0 /* Success */, "msg#userMenu.resetUserSettings.successMessage"),
                            error: () => this.notificationsService.notify(3 /* Error */, "msg#userMenu.resetUserSettings.errorMessage")
                        });
                    }
                });
            }
        });
    }
    ngOnInit() {
        this.updateMenu();
        this._loginSubscription = this.loginService.events.subscribe(event => {
            if (event.type === "session-changed") {
                this.updateMenu();
            }
        });
        this._principalSubscription = this.principalService.events.subscribe(event => {
            this.updateMenu();
        });
    }
    ngOnDestroy() {
        if (this._loginSubscription) {
            this._loginSubscription.unsubscribe();
        }
        if (this._principalSubscription) {
            this._principalSubscription.unsubscribe();
        }
    }
    updateMenu() {
        const userActions = [];
        if (!this.principalService.principal && !this.authenticationService.userOverrideActive) {
            userActions.push(this.loginAction);
        }
        if (this.principalService.principal) {
            userActions.push(this.logoutAction);
        }
        if (this.authenticationService.userOverrideActive) {
            userActions.push(this.revertOverrideAction);
        }
        if (this.principalService.principal && this.principalService.principal.isAdministrator) {
            userActions.push(this.overrideAction);
        }
        if (this.principalService.principal && (this.principalService.principal.isAdministrator || this.principalService.principal.isDelegatedAdmin)) {
            userActions.push(this.adminAction);
        }
        if (this.loginService.complete) {
            userActions.push(this.resetUserSettings);
        }
        userActions.push(new Action({ separator: true }));
        if (this.intlService.locales.length > 1) {
            userActions.push(this.languageAction);
        }
        this.menu = new Action({
            icon: this.icon,
            text: this.loginService.complete && this.principalService.principal ? this.principalService.principal.name || "msg#userMenu.user" : "msg#userMenu.user",
            children: userActions
        });
    }
}
BsUserMenuComponent.ɵfac = function BsUserMenuComponent_Factory(t) { return new (t || BsUserMenuComponent)(i0.ɵɵdirectiveInject(i1.PrincipalWebService), i0.ɵɵdirectiveInject(i2.AuthenticationService), i0.ɵɵdirectiveInject(i3.IntlService), i0.ɵɵdirectiveInject(i2.LoginService), i0.ɵɵdirectiveInject(i4.ModalService), i0.ɵɵdirectiveInject(i5.AppService), i0.ɵɵdirectiveInject(i1.UserSettingsWebService), i0.ɵɵdirectiveInject(i6.NotificationsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
BsUserMenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsUserMenuComponent, selectors: [["sq-user-menu"]], inputs: { icon: "icon", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", size: "size" }, decls: 1, vars: 1, consts: [["class", "nav-item dropdown", 3, "sq-action-item", "collapseBreakpoint", 4, "ngIf"], [1, "nav-item", "dropdown", 3, "sq-action-item", "collapseBreakpoint"]], template: function BsUserMenuComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsUserMenuComponent_li_0_Template, 1, 7, "li", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !!ctx.menu && !ctx.menu.hidden);
    } }, directives: [i7.NgIf, i8.BsActionItem], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsUserMenuComponent, [{
        type: Component,
        args: [{
                selector: 'sq-user-menu',
                templateUrl: './user-menu.component.html'
            }]
    }], function () { return [{ type: i1.PrincipalWebService }, { type: i2.AuthenticationService }, { type: i3.IntlService }, { type: i2.LoginService }, { type: i4.ModalService }, { type: i5.AppService }, { type: i1.UserSettingsWebService }, { type: i6.NotificationsService }, { type: i0.ChangeDetectorRef }]; }, { icon: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3VzZXItc2V0dGluZ3MvIiwic291cmNlcyI6WyJib290c3RyYXAvdXNlci1tZW51L3VzZXItbWVudS5jb21wb25lbnQudHMiLCJib290c3RyYXAvdXNlci1tZW51L3VzZXItbWVudS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUE2QixLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFdkYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSXBELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUEwQyxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7Ozs7Ozs7O0lDUjFGLHdCQUdNOzs7SUFGRixxSUFBNkgsaURBQUE7O0FEZWpJLE1BQU0sT0FBTyxtQkFBbUI7SUFtQjlCLFlBQ1MsZ0JBQXFDLEVBQ3JDLHFCQUE0QyxFQUM1QyxXQUF3QixFQUN4QixZQUEwQixFQUMxQixZQUEwQixFQUMxQixVQUFzQixFQUN0QixtQkFBMkMsRUFDM0Msb0JBQTBDLEVBQzFDLGlCQUFvQztRQUczQyxxREFBcUQ7UUFYOUMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFxQjtRQUNyQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUF3QjtRQUMzQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLHNC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LENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUMxQztRQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN2QyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUN2QztRQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUM7WUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxtQkFBbUI7WUFDdkosUUFBUSxFQUFFLFdBQVc7U0FDeEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7c0ZBbk1VLG1CQUFtQjt3REFBbkIsbUJBQW1CO1FDaEJoQyxrRUFHTTs7UUFIRCxxREFBNEI7O2tERGdCcEIsbUJBQW1CO2NBSi9CLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsV0FBVyxFQUFFLDRCQUE0QjthQUMxQzsyVEFHVSxJQUFJO2tCQUFaLEtBQUs7WUFDRyxVQUFVO2tCQUFsQixLQUFLO1lBQ0csb0JBQW9CO2tCQUE1QixLQUFLO1lBQ0csa0JBQWtCO2tCQUExQixLQUFLO1lBQ0csSUFBSTtrQkFBWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIENoYW5nZURldGVjdG9yUmVmLCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BzaW5lcXVhL2NvbXBvbmVudHMvYWN0aW9uJztcbmltcG9ydCB7IFByaW5jaXBhbFdlYlNlcnZpY2UsIFVzZXJTZXR0aW5nc1dlYlNlcnZpY2UgfSBmcm9tICdAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlcyc7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblNlcnZpY2UsIExvZ2luU2VydmljZSwgVXNlck92ZXJyaWRlIH0gZnJvbSAnQHNpbmVxdWEvY29yZS9sb2dpbic7XG5pbXBvcnQgeyBJbnRsU2VydmljZSwgTG9jYWxlIH0gZnJvbSAnQHNpbmVxdWEvY29yZS9pbnRsJztcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnQHNpbmVxdWEvY29yZS9iYXNlJztcbmltcG9ydCB7IEJzT3ZlcnJpZGVVc2VyIH0gZnJvbSAnQHNpbmVxdWEvY29tcG9uZW50cy9tb2RhbCc7XG5pbXBvcnQgeyBNb2RhbFNlcnZpY2UsIE1vZGFsUmVzdWx0LCBDb25maXJtVHlwZSwgTW9kYWxCdXR0b24gfSBmcm9tICdAc2luZXF1YS9jb3JlL21vZGFsJztcbmltcG9ydCB7IEFwcFNlcnZpY2UgfSBmcm9tICdAc2luZXF1YS9jb3JlL2FwcC11dGlscyc7XG5pbXBvcnQge05vdGlmaWNhdGlvbnNTZXJ2aWNlLCBOb3RpZmljYXRpb25UeXBlfSBmcm9tICdAc2luZXF1YS9jb3JlL25vdGlmaWNhdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NxLXVzZXItbWVudScsXG4gIHRlbXBsYXRlVXJsOiAnLi91c2VyLW1lbnUuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEJzVXNlck1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgaWNvbjogc3RyaW5nID0gXCJmYXMgZmEtdXNlclwiO1xuICBASW5wdXQoKSBhdXRvQWRqdXN0OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgYXV0b0FkanVzdEJyZWFrcG9pbnQ6IHN0cmluZyA9ICd4bCc7XG4gIEBJbnB1dCgpIGNvbGxhcHNlQnJlYWtwb2ludDogc3RyaW5nID0gJ3NtJztcbiAgQElucHV0KCkgc2l6ZTogc3RyaW5nO1xuXG4gIG1lbnU6IEFjdGlvbjtcblxuICAvLyBVc2VyIGFjdGlvbnNcbiAgbG9naW5BY3Rpb246IEFjdGlvbjtcbiAgbG9nb3V0QWN0aW9uOiBBY3Rpb247XG4gIG92ZXJyaWRlQWN0aW9uOiBBY3Rpb247XG4gIHJldmVydE92ZXJyaWRlQWN0aW9uOiBBY3Rpb247XG4gIGFkbWluQWN0aW9uOiBBY3Rpb247XG4gIGxhbmd1YWdlQWN0aW9uOiBBY3Rpb247XG4gIHJlc2V0VXNlclNldHRpbmdzOiBBY3Rpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHByaW5jaXBhbFNlcnZpY2U6IFByaW5jaXBhbFdlYlNlcnZpY2UsXG4gICAgcHVibGljIGF1dGhlbnRpY2F0aW9uU2VydmljZTogQXV0aGVudGljYXRpb25TZXJ2aWNlLFxuICAgIHB1YmxpYyBpbnRsU2VydmljZTogSW50bFNlcnZpY2UsXG4gICAgcHVibGljIGxvZ2luU2VydmljZTogTG9naW5TZXJ2aWNlLFxuICAgIHB1YmxpYyBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSxcbiAgICBwdWJsaWMgYXBwU2VydmljZTogQXBwU2VydmljZSxcbiAgICBwdWJsaWMgdXNlclNldHRpbmdzU2VydmljZTogVXNlclNldHRpbmdzV2ViU2VydmljZSxcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uc1NlcnZpY2U6IE5vdGlmaWNhdGlvbnNTZXJ2aWNlLFxuICAgIHB1YmxpYyBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcblxuXG4gICAgLy8gQWN0aW9ucyBvYmplY3RzIGFyZSBpbml0aWFsaXplZCBpbiB0aGUgY29uc3RydWN0b3JcblxuICAgIC8vIFVzZXIgTWVudVxuXG4gICAgLy8gTG9naW5cbiAgICB0aGlzLmxvZ2luQWN0aW9uID0gbmV3IEFjdGlvbih7XG4gICAgICB0ZXh0OiBcIm1zZyN1c2VyTWVudS5sb2dpblwiLFxuICAgICAgdGl0bGU6IFwibXNnI3VzZXJNZW51LmxvZ2luXCIsXG4gICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgdGhpcy5sb2dpblNlcnZpY2UubG9naW4oKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIExvZ291dFxuICAgIHRoaXMubG9nb3V0QWN0aW9uID0gbmV3IEFjdGlvbih7XG4gICAgICB0ZXh0OiBcIm1zZyN1c2VyTWVudS5sb2dvdXRcIixcbiAgICAgIHRpdGxlOiBcIm1zZyN1c2VyTWVudS5sb2dvdXRcIixcbiAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICB0aGlzLmxvZ2luU2VydmljZS5sb2dvdXQoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIE92ZXJyaWRlIGEgdXNlcidzIGlkZW50aXR5XG4gICAgdGhpcy5vdmVycmlkZUFjdGlvbiA9IG5ldyBBY3Rpb24oe1xuICAgICAgdGV4dDogXCJtc2cjdXNlck1lbnUub3ZlcnJpZGVVc2VyXCIsXG4gICAgICB0aXRsZTogXCJtc2cjdXNlck1lbnUub3ZlcnJpZGVVc2VyXCIsXG4gICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgbGV0IHVzZXJPdmVycmlkZSA9IHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLnVzZXJPdmVycmlkZSA/XG4gICAgICAgICAgVXRpbHMuY29weTxVc2VyT3ZlcnJpZGU+KHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLnVzZXJPdmVycmlkZSkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghdXNlck92ZXJyaWRlKSB7XG4gICAgICAgICAgdXNlck92ZXJyaWRlID0ge1xuICAgICAgICAgICAgdXNlck5hbWU6IFwiXCIsXG4gICAgICAgICAgICBkb21haW46IFwiXCJcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlLm9wZW4oQnNPdmVycmlkZVVzZXIsIHttb2RlbDogdXNlck92ZXJyaWRlfSlcbiAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBNb2RhbFJlc3VsdC5PSykge1xuICAgICAgICAgICAgICB0aGlzLmxvZ2luU2VydmljZS5vdmVycmlkZVVzZXIodXNlck92ZXJyaWRlKTtcbiAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENhbmNlbCB1c2VyIG92ZXJyaWRlXG4gICAgdGhpcy5yZXZlcnRPdmVycmlkZUFjdGlvbiA9IG5ldyBBY3Rpb24oe1xuICAgICAgdGV4dDogXCJtc2cjdXNlck1lbnUucmV2ZXJ0VXNlck92ZXJyaWRlXCIsXG4gICAgICB0aXRsZTogXCJtc2cjdXNlck1lbnUucmV2ZXJ0VXNlck92ZXJyaWRlXCIsXG4gICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgdGhpcy5sb2dpblNlcnZpY2Uub3ZlcnJpZGVVc2VyKHVuZGVmaW5lZCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBMaW5rIHRvIHRoZSBhZG1pblxuICAgIHRoaXMuYWRtaW5BY3Rpb24gPSBuZXcgQWN0aW9uKHtcbiAgICAgIHRleHQ6IFwibXNnI3VzZXJNZW51LmFkbWluaXN0cmF0aW9uXCIsXG4gICAgICB0aXRsZTogXCJtc2cjdXNlck1lbnUuYWRtaW5pc3RyYXRpb25cIixcbiAgICAgIGhyZWY6IHRoaXMuYXBwU2VydmljZS5hZG1pblVybFxuICAgIH0pO1xuXG4gICAgLy8gTGFuZ3VhZ2UgbWVudVxuICAgIHRoaXMubGFuZ3VhZ2VBY3Rpb24gPSBuZXcgQWN0aW9uKHtcbiAgICAgIHRleHQ6IFwibXNnI3VzZXJNZW51Lmxhbmd1YWdlXCIsXG4gICAgICB0aXRsZTogXCJtc2cjdXNlck1lbnUubGFuZ3VhZ2VcIixcbiAgICAgIGNoaWxkcmVuOiB0aGlzLmludGxTZXJ2aWNlLmxvY2FsZXMubWFwKGxvY2FsZSA9PlxuICAgICAgICBuZXcgQWN0aW9uKHtcbiAgICAgICAgICB0ZXh0OiBsb2NhbGUuZGlzcGxheSwgICAvLyBcIkZyZW5jaFwiXG4gICAgICAgICAgdGl0bGU6IGxvY2FsZS5kaXNwbGF5LCAgIC8vIFwiRnJlbmNoXCJcbiAgICAgICAgICBkYXRhOiBsb2NhbGUsICAgLy8gRnJlbmNoIGxvY2FsZVxuICAgICAgICAgIHNlbGVjdGVkOiBsb2NhbGUgPT09IHRoaXMuaW50bFNlcnZpY2UuY3VycmVudExvY2FsZSwgLy8gV2hldGhlciBGcmVuY2ggaXMgdGhlIGN1cnJlbnQgbG9jYWxlXG4gICAgICAgICAgaWNvbkFmdGVyOiBcInNxLWltYWdlIHNxLWZsYWctXCIgKyBsb2NhbGUubmFtZSxcbiAgICAgICAgICBhY3Rpb246IChpdGVtOiBBY3Rpb24sICRldmVudDogVUlFdmVudCkgPT4geyAgICAvLyBPbiBjbGljaywgc3dpdGNoIHRvIHRoaXMgbGFuZ3VhZ2VcbiAgICAgICAgICAgIHRoaXMuaW50bFNlcnZpY2UudXNlKChpdGVtLmRhdGEgYXMgTG9jYWxlKS5uYW1lKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICh2YWx1ZSkgPT4gdGhpcy5sYW5ndWFnZUFjdGlvbi5jaGlsZHJlbiEuZm9yRWFjaChhID0+IGEudXBkYXRlKCkpKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVwZGF0ZXI6IChhY3Rpb24pID0+IHsgIC8vIFVwZGF0ZSB0aGUgc3RhdHVzIG9mIGJ1dHRvbnNcbiAgICAgICAgICAgIGFjdGlvbi5zZWxlY3RlZCA9IGFjdGlvbi5kYXRhID09PSB0aGlzLmludGxTZXJ2aWNlLmN1cnJlbnRMb2NhbGU7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH0pO1xuXG4gICAgdGhpcy5yZXNldFVzZXJTZXR0aW5ncyA9IG5ldyBBY3Rpb24oe1xuICAgICAgdGV4dDogXCJtc2cjdXNlck1lbnUucmVzZXRVc2VyU2V0dGluZ3MubWVudVwiLFxuICAgICAgdGl0bGU6IFwibXNnI3VzZXJNZW51LnJlc2V0VXNlclNldHRpbmdzLm1lbnVcIixcbiAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZS5jb25maXJtKHtcbiAgICAgICAgICB0aXRsZTogXCJtc2cjdXNlck1lbnUucmVzZXRVc2VyU2V0dGluZ3MubW9kYWxUaXRsZVwiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwibXNnI3VzZXJNZW51LnJlc2V0VXNlclNldHRpbmdzLm1vZGFsTWVzc2FnZVwiLCBcbiAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICBuZXcgTW9kYWxCdXR0b24oe3Jlc3VsdDogTW9kYWxSZXN1bHQuT0ssIHRleHQ6IFwibXNnI3VzZXJNZW51LnJlc2V0VXNlclNldHRpbmdzLm1vZGFsQ29uZmlybUJ1dHRvblwifSksXG4gICAgICAgICAgICBuZXcgTW9kYWxCdXR0b24oe3Jlc3VsdDogTW9kYWxSZXN1bHQuQ2FuY2VsLCBwcmltYXJ5OiB0cnVlfSlcbiAgICAgICAgICBdLFxuICAgICAgICAgIGNvbmZpcm1UeXBlOiBDb25maXJtVHlwZS5XYXJuaW5nXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICBpZihyZXMgPT09IE1vZGFsUmVzdWx0Lk9LKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UucmVzZXQoKS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICBuZXh0OiAoKSA9PiB0aGlzLm5vdGlmaWNhdGlvbnNTZXJ2aWNlLm5vdGlmeShOb3RpZmljYXRpb25UeXBlLlN1Y2Nlc3MsIFwibXNnI3VzZXJNZW51LnJlc2V0VXNlclNldHRpbmdzLnN1Y2Nlc3NNZXNzYWdlXCIpLFxuICAgICAgICAgICAgICBlcnJvcjogKCkgPT4gdGhpcy5ub3RpZmljYXRpb25zU2VydmljZS5ub3RpZnkoTm90aWZpY2F0aW9uVHlwZS5FcnJvciwgXCJtc2cjdXNlck1lbnUucmVzZXRVc2VyU2V0dGluZ3MuZXJyb3JNZXNzYWdlXCIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVwZGF0ZU1lbnUoKTtcbiAgICB0aGlzLl9sb2dpblN1YnNjcmlwdGlvbiA9IHRoaXMubG9naW5TZXJ2aWNlLmV2ZW50cy5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgaWYoZXZlbnQudHlwZSA9PT0gXCJzZXNzaW9uLWNoYW5nZWRcIil7XG4gICAgICAgIHRoaXMudXBkYXRlTWVudSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX3ByaW5jaXBhbFN1YnNjcmlwdGlvbiA9IHRoaXMucHJpbmNpcGFsU2VydmljZS5ldmVudHMuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgIHRoaXMudXBkYXRlTWVudSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfbG9naW5TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfcHJpbmNpcGFsU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIG5nT25EZXN0cm95KCl7XG4gICAgaWYodGhpcy5fbG9naW5TdWJzY3JpcHRpb24pe1xuICAgICAgdGhpcy5fbG9naW5TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYodGhpcy5fcHJpbmNpcGFsU3Vic2NyaXB0aW9uKXtcbiAgICAgIHRoaXMuX3ByaW5jaXBhbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZU1lbnUoKSB7XG4gICAgY29uc3QgdXNlckFjdGlvbnM6IEFjdGlvbltdID0gW107XG5cbiAgICBpZiAoIXRoaXMucHJpbmNpcGFsU2VydmljZS5wcmluY2lwYWwgJiYgIXRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLnVzZXJPdmVycmlkZUFjdGl2ZSkge1xuICAgICAgdXNlckFjdGlvbnMucHVzaCh0aGlzLmxvZ2luQWN0aW9uKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJpbmNpcGFsU2VydmljZS5wcmluY2lwYWwpIHtcbiAgICAgIHVzZXJBY3Rpb25zLnB1c2godGhpcy5sb2dvdXRBY3Rpb24pO1xuICAgIH1cbiAgICBpZiAodGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UudXNlck92ZXJyaWRlQWN0aXZlKSB7XG4gICAgICB1c2VyQWN0aW9ucy5wdXNoKHRoaXMucmV2ZXJ0T3ZlcnJpZGVBY3Rpb24pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcmluY2lwYWxTZXJ2aWNlLnByaW5jaXBhbCAmJiB0aGlzLnByaW5jaXBhbFNlcnZpY2UucHJpbmNpcGFsLmlzQWRtaW5pc3RyYXRvcikge1xuICAgICAgdXNlckFjdGlvbnMucHVzaCh0aGlzLm92ZXJyaWRlQWN0aW9uKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJpbmNpcGFsU2VydmljZS5wcmluY2lwYWwgJiYgKHRoaXMucHJpbmNpcGFsU2VydmljZS5wcmluY2lwYWwuaXNBZG1pbmlzdHJhdG9yIHx8IHRoaXMucHJpbmNpcGFsU2VydmljZS5wcmluY2lwYWwuaXNEZWxlZ2F0ZWRBZG1pbikpIHtcbiAgICAgIHVzZXJBY3Rpb25zLnB1c2godGhpcy5hZG1pbkFjdGlvbik7XG4gICAgfVxuICAgIGlmKHRoaXMubG9naW5TZXJ2aWNlLmNvbXBsZXRlKSB7XG4gICAgICB1c2VyQWN0aW9ucy5wdXNoKHRoaXMucmVzZXRVc2VyU2V0dGluZ3MpO1xuICAgIH1cbiAgICB1c2VyQWN0aW9ucy5wdXNoKG5ldyBBY3Rpb24oe3NlcGFyYXRvcjogdHJ1ZX0pKTtcbiAgICBpZiAodGhpcy5pbnRsU2VydmljZS5sb2NhbGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHVzZXJBY3Rpb25zLnB1c2godGhpcy5sYW5ndWFnZUFjdGlvbik7XG4gICAgfVxuXG4gICAgdGhpcy5tZW51ID0gbmV3IEFjdGlvbih7XG4gICAgICAgIGljb246IHRoaXMuaWNvbixcbiAgICAgICAgdGV4dDogdGhpcy5sb2dpblNlcnZpY2UuY29tcGxldGUgJiYgdGhpcy5wcmluY2lwYWxTZXJ2aWNlLnByaW5jaXBhbCA/IHRoaXMucHJpbmNpcGFsU2VydmljZS5wcmluY2lwYWwubmFtZSB8fCBcIm1zZyN1c2VyTWVudS51c2VyXCIgOiBcIm1zZyN1c2VyTWVudS51c2VyXCIsXG4gICAgICAgIGNoaWxkcmVuOiB1c2VyQWN0aW9uc1xuICAgIH0pO1xuICB9XG5cblxufVxuIiwiPGxpICpuZ0lmPVwiISFtZW51ICYmICFtZW51LmhpZGRlblwiIGNsYXNzPVwibmF2LWl0ZW0gZHJvcGRvd25cIiBcbiAgICBbc3EtYWN0aW9uLWl0ZW1dPVwie2l0ZW06IG1lbnUsIHNpemU6IHNpemUsIGF1dG9BZGp1c3Q6IGF1dG9BZGp1c3QsIGF1dG9BZGp1c3RCcmVha3BvaW50OiBhdXRvQWRqdXN0QnJlYWtwb2ludCwgaW5NZW51OiB0cnVlfVwiXG4gICAgW2NvbGxhcHNlQnJlYWtwb2ludF09XCJjb2xsYXBzZUJyZWFrcG9pbnRcIlxuPjwvbGk+Il19