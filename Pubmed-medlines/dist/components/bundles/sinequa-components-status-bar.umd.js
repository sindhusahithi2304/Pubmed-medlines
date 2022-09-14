(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@sinequa/components/action'), require('@sinequa/core/base'), require('@sinequa/components/utils'), require('@sinequa/core/notification'), require('@angular/common'), require('@sinequa/core/intl')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/status-bar', ['exports', '@angular/core', '@sinequa/components/action', '@sinequa/core/base', '@sinequa/components/utils', '@sinequa/core/notification', '@angular/common', '@sinequa/core/intl'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components['status-bar'] = {}), global.ng.core, global.sinequa.components.action, global.sinequa.core.base, global.sinequa.components.utils, global.sinequa.core.notification, global.ng.common, global.sinequa.core.intl));
}(this, (function (exports, i0, i2, base, i1, i1$1, i2$1, i3) { 'use strict';

    var _c0 = function (a0) { return [a0]; };
    var _c1 = function (a0) { return { items: a0 }; };
    var BsFullscreenActivator = /** @class */ (function () {
        function BsFullscreenActivator(uiService) {
            this.uiService = uiService;
            this.buildAction();
        }
        BsFullscreenActivator.prototype.getFullscreenIcon = function () {
            return !this.isFullscreen() ? "fas fa-expand" : "fas fa-compress";
        };
        BsFullscreenActivator.prototype.getFullscreenTitle = function () {
            return !this.isFullscreen() ? "msg#statusbar.fullscreenTitleEnter" : "msg#statusbar.fullscreenTitleExit";
        };
        BsFullscreenActivator.prototype.buildAction = function () {
            var _this = this;
            this.action = new i2.Action({
                icon: this.getFullscreenIcon(),
                title: this.getFullscreenTitle(),
                action: function (item, $event) {
                    _this.toggleFullscreen();
                    item.icon = _this.getFullscreenIcon();
                    item.title = _this.getFullscreenTitle();
                },
                init: function (item) {
                    _this.resizeSubscription = base.Utils.subscribe(_this.uiService.resizeEvent, function (event) {
                        _this.action.icon = _this.getFullscreenIcon();
                        _this.action.title = _this.getFullscreenTitle();
                    });
                },
                destroy: function (item) {
                    if (_this.resizeSubscription) {
                        _this.resizeSubscription.unsubscribe();
                        _this.resizeSubscription = undefined;
                    }
                }
            });
        };
        BsFullscreenActivator.prototype.requestFullscreen = function () {
            var doc = window.document;
            var docEl = doc.documentElement;
            var requestFullScreen = docEl["requestFullscreen"] || docEl["mozRequestFullScreen"] || docEl["webkitRequestFullScreen"] || docEl["msRequestFullscreen"];
            if (requestFullScreen) {
                requestFullScreen.call(docEl);
            }
        };
        BsFullscreenActivator.prototype.cancelFullscreen = function () {
            var doc = window.document;
            var cancelFullScreen = doc["exitFullscreen"] || doc["mozCancelFullScreen"] || doc["webkitExitFullscreen"] || doc["msExitFullscreen"];
            if (cancelFullScreen) {
                cancelFullScreen.call(doc);
            }
        };
        BsFullscreenActivator.prototype.isFullscreen = function () {
            var doc = window.document;
            return doc["fullscreenElement"] || doc["mozFullScreenElement"] || doc["webkitFullscreenElement"] || doc["msFullscreenElement"];
        };
        BsFullscreenActivator.prototype.toggleFullscreen = function () {
            if (!this.isFullscreen()) {
                this.requestFullscreen();
            }
            else {
                this.cancelFullscreen();
            }
        };
        return BsFullscreenActivator;
    }());
    BsFullscreenActivator.ɵfac = function BsFullscreenActivator_Factory(t) { return new (t || BsFullscreenActivator)(i0.ɵɵdirectiveInject(i1.UIService)); };
    BsFullscreenActivator.ɵcmp = i0.ɵɵdefineComponent({ type: BsFullscreenActivator, selectors: [["sq-fullscreen-activator"]], decls: 2, vars: 5, consts: [[1, "btn-toolbar"], [1, "btn-group", 3, "sq-action-buttons"]], template: function BsFullscreenActivator_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelement(1, "div", 1);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction1(3, _c1, i0.ɵɵpureFunction1(1, _c0, ctx.action)));
            }
        }, directives: [i2.BsActionButtons], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsFullscreenActivator, [{
                type: i0.Component,
                args: [{
                        selector: "sq-fullscreen-activator",
                        templateUrl: "./fullscreen-activator.html"
                    }]
            }], function () { return [{ type: i1.UIService }]; }, null);
    })();

    var _c0$1 = function (a0) { return { "blink": a0 }; };
    var BsNetworkActivity = /** @class */ (function () {
        function BsNetworkActivity(notificationsService, changeDetectorRef) {
            this.notificationsService = notificationsService;
            this.changeDetectorRef = changeDetectorRef;
        }
        BsNetworkActivity.prototype.ngOnInit = function () {
            this.unbind();
            this.bind();
        };
        BsNetworkActivity.prototype.ngOnDestroy = function () {
            this.unbind();
        };
        BsNetworkActivity.prototype.bind = function () {
            var _this = this;
            this.subscription = this.notificationsService.events.subscribe(function (value) {
                _this.active = _this.notificationsService.get("network") > 0;
                setTimeout(function () { return _this.changeDetectorRef.markForCheck(); }, 0); // Value can switch synchronously => this can cause "Expression has changed" error
            });
        };
        BsNetworkActivity.prototype.unbind = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
                this.subscription = undefined;
            }
        };
        return BsNetworkActivity;
    }());
    BsNetworkActivity.ɵfac = function BsNetworkActivity_Factory(t) { return new (t || BsNetworkActivity)(i0.ɵɵdirectiveInject(i1$1.NotificationsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    BsNetworkActivity.ɵcmp = i0.ɵɵdefineComponent({ type: BsNetworkActivity, selectors: [["sq-network-activity"]], decls: 5, vars: 6, consts: [[1, "btn-toolbar"], [1, "btn-group"], [1, "btn-text", 3, "title"], [1, "fas", "fa-bolt", 3, "ngClass"]], template: function BsNetworkActivity_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "div", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵpipe(3, "sqMessage");
                i0.ɵɵelement(4, "span", 3);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(2);
                i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(3, 2, "msg#statusbar.networkActivity"));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c0$1, ctx.active));
            }
        }, directives: [i2$1.NgClass], pipes: [i3.MessagePipe], styles: ["@-webkit-keyframes blink{0%{opacity:1}25%{opacity:.25}50%{opacity:.5}75%{opacity:.75}to{opacity:0}}@keyframes blink{0%{opacity:1}25%{opacity:.25}50%{opacity:.5}75%{opacity:.75}to{opacity:0}}.blink[_ngcontent-%COMP%]{-webkit-animation:blink .75s linear infinite;animation:blink .75s linear infinite;color:red}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsNetworkActivity, [{
                type: i0.Component,
                args: [{
                        selector: "sq-network-activity",
                        templateUrl: "./network-activity.html",
                        styleUrls: ["./network-activity.scss"]
                    }]
            }], function () { return [{ type: i1$1.NotificationsService }, { type: i0.ChangeDetectorRef }]; }, null);
    })();

    var BsStatusBarModule = /** @class */ (function () {
        function BsStatusBarModule() {
        }
        return BsStatusBarModule;
    }());
    BsStatusBarModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsStatusBarModule });
    BsStatusBarModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsStatusBarModule_Factory(t) { return new (t || BsStatusBarModule)(); }, imports: [[
                i2$1.CommonModule,
                i3.IntlModule,
                i2.BsActionModule,
                i1.UtilsModule,
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsStatusBarModule, { declarations: [BsFullscreenActivator, BsNetworkActivity], imports: [i2$1.CommonModule,
                i3.IntlModule,
                i2.BsActionModule,
                i1.UtilsModule], exports: [BsFullscreenActivator, BsNetworkActivity] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsStatusBarModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i2$1.CommonModule,
                            i3.IntlModule,
                            i2.BsActionModule,
                            i1.UtilsModule,
                        ],
                        declarations: [
                            BsFullscreenActivator, BsNetworkActivity,
                        ],
                        exports: [
                            BsFullscreenActivator, BsNetworkActivity,
                        ]
                    }]
            }], null, null);
    })();

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

    exports.BsFullscreenActivator = BsFullscreenActivator;
    exports.BsNetworkActivity = BsNetworkActivity;
    exports.BsStatusBarModule = BsStatusBarModule;
    exports.deStatusBar = de;
    exports.enStatusBar = en;
    exports.frStatusBar = fr;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-status-bar.umd.js.map
