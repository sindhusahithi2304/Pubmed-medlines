import { ɵɵgetCurrentView, ɵɵelementStart, ɵɵlistener, ɵɵrestoreView, ɵɵnextContext, ɵɵtext, ɵɵelementEnd, ɵɵelementContainerStart, ɵɵpipe, ɵɵelement, ɵɵelementContainerEnd, ɵɵadvance, ɵɵtextInterpolate, ɵɵpipeBind1, ɵɵdirectiveInject, ɵɵdefineComponent, ɵɵtemplate, ɵɵclassMapInterpolate1, ɵɵproperty, ɵɵclassMap, ɵɵpipeBind2, ɵɵpureFunction1, ɵsetClassMetadata, Component, Input, ChangeDetectorRef, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { NgIf, NgForOf, CommonModule } from '@angular/common';
import { trigger, transition, animate, style } from '@angular/animations';
import { Utils } from '@sinequa/core/base';
import { NotificationsService } from '@sinequa/core/notification';
import { MessagePipe, IntlModule } from '@sinequa/core/intl';
import { Action, BsActionButtons, BsActionModule } from '@sinequa/components/action';

function BsNotification_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 7);
    ɵɵlistener("click", function BsNotification_button_1_Template_button_click_0_listener() { ɵɵrestoreView(_r3); const ctx_r2 = ɵɵnextContext(); return ctx_r2.close(); });
    ɵɵelementStart(1, "span", 8);
    ɵɵtext(2, "\u00D7");
    ɵɵelementEnd();
    ɵɵelementStart(3, "span", 9);
    ɵɵtext(4, "Close");
    ɵɵelementEnd();
    ɵɵelementEnd();
} }
function BsNotification_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "span", 10);
    ɵɵtext(2);
    ɵɵpipe(3, "sqMessage");
    ɵɵelementEnd();
    ɵɵelement(4, "hr");
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(3, 1, ctx_r1.notification.title));
} }
const _c0 = function (a0) { return { values: a0 }; };
function notificationAnimations(timings) {
    return [
        trigger('autoClose', [
            transition('1 => void', [
                animate(timings, style({ opacity: 0 }))
            ])
        ])
    ];
}
class BsNotification {
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    ngOnInit() {
        if (this.notification.autoClose && this.notification.state === 0 /* Initial */) {
            this.autoClose = true;
            Utils.delay(5000).then(value => {
                if (this.notification.state === 0 /* Initial */) {
                    this.close();
                }
            });
        }
    }
    get alertClass() {
        switch (this.notification.type) {
            case 1 /* Info */: return "info";
            case 0 /* Success */: return "success";
            case 2 /* Warning */: return "warning";
            case 3 /* Error */: return "danger";
        }
        return "";
    }
    get notificationClass() {
        switch (this.notification.type) {
            case 1 /* Info */: return "fas fa-info-circle fa-lg";
            case 0 /* Success */: return "fas fa-check-circle fa-lg";
            case 2 /* Warning */: return "fas fa-exclamation-triangle fa-lg";
            case 3 /* Error */: return "fas fa-exclamation-circle fa-lg";
        }
        return "";
    }
    get showClose() {
        return !this.notification.autoClose || this.notification.state !== 0 /* Initial */;
    }
    close() {
        this.notificationsService.closeNotification(this.notification);
    }
}
BsNotification.ɵfac = function BsNotification_Factory(t) { return new (t || BsNotification)(ɵɵdirectiveInject(NotificationsService)); };
BsNotification.ɵcmp = ɵɵdefineComponent({ type: BsNotification, selectors: [["sq-notification"]], inputs: { notification: "notification" }, decls: 10, vars: 15, consts: [["role", "alert"], ["type", "button", "class", "close", "aria-label", "Close", 3, "click", 4, "ngIf"], [1, "sq-notification-container"], [1, "sq-notification-icon"], [1, "sq-notification-message"], [4, "ngIf"], [1, "sq-notification-text"], ["type", "button", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "sr-only"], [1, "sq-notification-title"]], template: function BsNotification_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, BsNotification_button_1_Template, 5, 0, "button", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelementStart(3, "div", 3);
        ɵɵelement(4, "span");
        ɵɵelementEnd();
        ɵɵelementStart(5, "div", 4);
        ɵɵtemplate(6, BsNotification_ng_container_6_Template, 5, 3, "ng-container", 5);
        ɵɵelementStart(7, "span", 6);
        ɵɵtext(8);
        ɵɵpipe(9, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵclassMapInterpolate1("alert alert-", ctx.alertClass, " sq-notification");
        ɵɵproperty("@autoClose", ctx.autoClose);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.showClose);
        ɵɵadvance(3);
        ɵɵclassMap(ctx.notificationClass);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", !!ctx.notification.title);
        ɵɵadvance(2);
        ɵɵtextInterpolate(ɵɵpipeBind2(9, 10, ctx.notification.text, ɵɵpureFunction1(13, _c0, ctx.notification.params)));
    } }, directives: [NgIf], pipes: [MessagePipe], encapsulation: 2, data: { animation: notificationAnimations(".15s ease-in-out") } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsNotification, [{
        type: Component,
        args: [{
                selector: "sq-notification",
                templateUrl: "./notification.html",
                animations: notificationAnimations(".15s ease-in-out")
            }]
    }], function () { return [{ type: NotificationsService }]; }, { notification: [{
            type: Input
        }] }); })();

function BsNotifications_sq_notification_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "sq-notification", 2);
} if (rf & 2) {
    const notification_r1 = ctx.$implicit;
    ɵɵproperty("notification", notification_r1);
} }
class BsNotifications {
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
BsNotifications.ɵfac = function BsNotifications_Factory(t) { return new (t || BsNotifications)(ɵɵdirectiveInject(NotificationsService), ɵɵdirectiveInject(ChangeDetectorRef)); };
BsNotifications.ɵcmp = ɵɵdefineComponent({ type: BsNotifications, selectors: [["sq-notifications"]], decls: 2, vars: 1, consts: [[1, "sq-notifications"], [3, "notification", 4, "ngFor", "ngForOf"], [3, "notification"]], template: function BsNotifications_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, BsNotifications_sq_notification_1_Template, 1, 1, "sq-notification", 1);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.notifications);
    } }, directives: [NgForOf, BsNotification], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsNotifications, [{
        type: Component,
        args: [{
                selector: "sq-notifications",
                templateUrl: "./notifications.html"
            }]
    }], function () { return [{ type: NotificationsService }, { type: ChangeDetectorRef }]; }, null); })();

const _c0$1 = function (a0) { return [a0]; };
const _c1 = function (a0) { return { items: a0 }; };
class BsNotificationsManager {
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
BsNotificationsManager.ɵfac = function BsNotificationsManager_Factory(t) { return new (t || BsNotificationsManager)(ɵɵdirectiveInject(NotificationsService), ɵɵdirectiveInject(ChangeDetectorRef)); };
BsNotificationsManager.ɵcmp = ɵɵdefineComponent({ type: BsNotificationsManager, selectors: [["sq-notifications-manager"]], decls: 2, vars: 5, consts: [[1, "btn-toolbar", "dropup"], [1, "btn-group", 3, "sq-action-buttons"]], template: function BsNotificationsManager_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelement(1, "div", 1);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("sq-action-buttons", ɵɵpureFunction1(3, _c1, ɵɵpureFunction1(1, _c0$1, ctx.action)));
    } }, directives: [BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsNotificationsManager, [{
        type: Component,
        args: [{
                selector: "sq-notifications-manager",
                templateUrl: "./notifications-manager.html"
            }]
    }], function () { return [{ type: NotificationsService }, { type: ChangeDetectorRef }]; }, null); })();

class BsNotificationModule {
}
BsNotificationModule.ɵmod = ɵɵdefineNgModule({ type: BsNotificationModule });
BsNotificationModule.ɵinj = ɵɵdefineInjector({ factory: function BsNotificationModule_Factory(t) { return new (t || BsNotificationModule)(); }, imports: [[
            CommonModule,
            IntlModule,
            BsActionModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BsNotificationModule, { declarations: [BsNotification, BsNotifications, BsNotificationsManager], imports: [CommonModule,
        IntlModule,
        BsActionModule], exports: [BsNotifications, BsNotificationsManager] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsNotificationModule, [{
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

var en = {
    "notification": {
        "title": "Notifications",
        "showNotifications": "Show notifications",
        "hideNotifications": "Hide notifications",
        "clearNotifications": "Clear notifications",
    }
};

var fr = {
    "notification": {
        "title": "Notifications",
        "showNotifications": "Afficher les notifications",
        "hideNotifications": "Masquer les notifications",
        "clearNotifications": "Effacer les notifications",
    }
};

var de = {
    "notification": {
        "title": "Benachrichtigungen",
        "showNotifications": "Zeige Benachrichtigungen",
        "hideNotifications": "Benachrichtigungen verstecken",
        "clearNotifications": "Benachrichtigungen löschen",
    }
};

/**
 * Generated bundle index. Do not edit.
 */

export { BsNotification, BsNotificationModule, BsNotifications, BsNotificationsManager, de as deNotification, en as enNotification, fr as frNotification, notificationAnimations };
//# sourceMappingURL=sinequa-components-notification.js.map
