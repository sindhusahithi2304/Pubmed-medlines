import { ɵɵdirectiveInject, ɵɵdefineComponent, ɵɵelementStart, ɵɵelement, ɵɵelementEnd, ɵɵadvance, ɵɵproperty, ɵɵpureFunction1, ɵsetClassMetadata, Component, ChangeDetectorRef, ɵɵpipe, ɵɵpropertyInterpolate, ɵɵpipeBind1, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { Action, BsActionButtons, BsActionModule } from '@sinequa/components/action';
import { Utils } from '@sinequa/core/base';
import { UIService, UtilsModule } from '@sinequa/components/utils';
import { NotificationsService } from '@sinequa/core/notification';
import { NgClass, CommonModule } from '@angular/common';
import { MessagePipe, IntlModule } from '@sinequa/core/intl';

const _c0 = function (a0) { return [a0]; };
const _c1 = function (a0) { return { items: a0 }; };
class BsFullscreenActivator {
    constructor(uiService) {
        this.uiService = uiService;
        this.buildAction();
    }
    getFullscreenIcon() {
        return !this.isFullscreen() ? "fas fa-expand" : "fas fa-compress";
    }
    getFullscreenTitle() {
        return !this.isFullscreen() ? "msg#statusbar.fullscreenTitleEnter" : "msg#statusbar.fullscreenTitleExit";
    }
    buildAction() {
        this.action = new Action({
            icon: this.getFullscreenIcon(),
            title: this.getFullscreenTitle(),
            action: (item, $event) => {
                this.toggleFullscreen();
                item.icon = this.getFullscreenIcon();
                item.title = this.getFullscreenTitle();
            },
            init: (item) => {
                this.resizeSubscription = Utils.subscribe(this.uiService.resizeEvent, (event) => {
                    this.action.icon = this.getFullscreenIcon();
                    this.action.title = this.getFullscreenTitle();
                });
            },
            destroy: (item) => {
                if (this.resizeSubscription) {
                    this.resizeSubscription.unsubscribe();
                    this.resizeSubscription = undefined;
                }
            }
        });
    }
    requestFullscreen() {
        const doc = window.document;
        const docEl = doc.documentElement;
        const requestFullScreen = docEl["requestFullscreen"] || docEl["mozRequestFullScreen"] || docEl["webkitRequestFullScreen"] || docEl["msRequestFullscreen"];
        if (requestFullScreen) {
            requestFullScreen.call(docEl);
        }
    }
    cancelFullscreen() {
        const doc = window.document;
        const cancelFullScreen = doc["exitFullscreen"] || doc["mozCancelFullScreen"] || doc["webkitExitFullscreen"] || doc["msExitFullscreen"];
        if (cancelFullScreen) {
            cancelFullScreen.call(doc);
        }
    }
    isFullscreen() {
        const doc = window.document;
        return doc["fullscreenElement"] || doc["mozFullScreenElement"] || doc["webkitFullscreenElement"] || doc["msFullscreenElement"];
    }
    toggleFullscreen() {
        if (!this.isFullscreen()) {
            this.requestFullscreen();
        }
        else {
            this.cancelFullscreen();
        }
    }
}
BsFullscreenActivator.ɵfac = function BsFullscreenActivator_Factory(t) { return new (t || BsFullscreenActivator)(ɵɵdirectiveInject(UIService)); };
BsFullscreenActivator.ɵcmp = ɵɵdefineComponent({ type: BsFullscreenActivator, selectors: [["sq-fullscreen-activator"]], decls: 2, vars: 5, consts: [[1, "btn-toolbar"], [1, "btn-group", 3, "sq-action-buttons"]], template: function BsFullscreenActivator_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelement(1, "div", 1);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("sq-action-buttons", ɵɵpureFunction1(3, _c1, ɵɵpureFunction1(1, _c0, ctx.action)));
    } }, directives: [BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsFullscreenActivator, [{
        type: Component,
        args: [{
                selector: "sq-fullscreen-activator",
                templateUrl: "./fullscreen-activator.html"
            }]
    }], function () { return [{ type: UIService }]; }, null); })();

const _c0$1 = function (a0) { return { "blink": a0 }; };
class BsNetworkActivity {
    constructor(notificationsService, changeDetectorRef) {
        this.notificationsService = notificationsService;
        this.changeDetectorRef = changeDetectorRef;
    }
    ngOnInit() {
        this.unbind();
        this.bind();
    }
    ngOnDestroy() {
        this.unbind();
    }
    bind() {
        this.subscription = this.notificationsService.events.subscribe((value) => {
            this.active = this.notificationsService.get("network") > 0;
            setTimeout(() => this.changeDetectorRef.markForCheck(), 0); // Value can switch synchronously => this can cause "Expression has changed" error
        });
    }
    unbind() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }
}
BsNetworkActivity.ɵfac = function BsNetworkActivity_Factory(t) { return new (t || BsNetworkActivity)(ɵɵdirectiveInject(NotificationsService), ɵɵdirectiveInject(ChangeDetectorRef)); };
BsNetworkActivity.ɵcmp = ɵɵdefineComponent({ type: BsNetworkActivity, selectors: [["sq-network-activity"]], decls: 5, vars: 6, consts: [[1, "btn-toolbar"], [1, "btn-group"], [1, "btn-text", 3, "title"], [1, "fas", "fa-bolt", 3, "ngClass"]], template: function BsNetworkActivity_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "div", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵpipe(3, "sqMessage");
        ɵɵelement(4, "span", 3);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(2);
        ɵɵpropertyInterpolate("title", ɵɵpipeBind1(3, 2, "msg#statusbar.networkActivity"));
        ɵɵadvance(2);
        ɵɵproperty("ngClass", ɵɵpureFunction1(4, _c0$1, ctx.active));
    } }, directives: [NgClass], pipes: [MessagePipe], styles: ["@-webkit-keyframes blink{0%{opacity:1}25%{opacity:.25}50%{opacity:.5}75%{opacity:.75}to{opacity:0}}@keyframes blink{0%{opacity:1}25%{opacity:.25}50%{opacity:.5}75%{opacity:.75}to{opacity:0}}.blink[_ngcontent-%COMP%]{-webkit-animation:blink .75s linear infinite;animation:blink .75s linear infinite;color:red}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsNetworkActivity, [{
        type: Component,
        args: [{
                selector: "sq-network-activity",
                templateUrl: "./network-activity.html",
                styleUrls: ["./network-activity.scss"]
            }]
    }], function () { return [{ type: NotificationsService }, { type: ChangeDetectorRef }]; }, null); })();

class BsStatusBarModule {
}
BsStatusBarModule.ɵmod = ɵɵdefineNgModule({ type: BsStatusBarModule });
BsStatusBarModule.ɵinj = ɵɵdefineInjector({ factory: function BsStatusBarModule_Factory(t) { return new (t || BsStatusBarModule)(); }, imports: [[
            CommonModule,
            IntlModule,
            BsActionModule,
            UtilsModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BsStatusBarModule, { declarations: [BsFullscreenActivator, BsNetworkActivity], imports: [CommonModule,
        IntlModule,
        BsActionModule,
        UtilsModule], exports: [BsFullscreenActivator, BsNetworkActivity] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsStatusBarModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    IntlModule,
                    BsActionModule,
                    UtilsModule,
                ],
                declarations: [
                    BsFullscreenActivator, BsNetworkActivity,
                ],
                exports: [
                    BsFullscreenActivator, BsNetworkActivity,
                ]
            }]
    }], null, null); })();

var en = {
    "statusBar": {
        "fullscreenTitleEnter": "Fullscreen",
        "fullscreenTitleExit": "Exit fullscreen",
        "networkActivity": "Network activity"
    }
};

var fr = {
    "statusBar": {
        "fullscreenTitleEnter": "Plein écran",
        "fullscreenTitleExit": "Quitter le mode plein écran",
        "networkActivity": "Activité reseau"
    }
};

var de = {
    "statusBar": {
        "fullscreenTitleEnter": "Vollbildmodus",
        "fullscreenTitleExit": "Volbildmodus verlassen",
        "networkActivity": "Netzwerk-Aktivität"
    }
};

/**
 * Generated bundle index. Do not edit.
 */

export { BsFullscreenActivator, BsNetworkActivity, BsStatusBarModule, de as deStatusBar, en as enStatusBar, fr as frStatusBar };
//# sourceMappingURL=sinequa-components-status-bar.js.map
