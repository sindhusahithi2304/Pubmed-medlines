(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@sinequa/components/utils'), require('@sinequa/core/intl')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/theme-toggle', ['exports', '@angular/core', '@angular/common', '@sinequa/components/utils', '@sinequa/core/intl'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components['theme-toggle'] = {}), global.ng.core, global.ng.common, global.sinequa.components.utils, global.sinequa.core.intl));
}(this, (function (exports, i0, i1, i2, i3) { 'use strict';

    function BsThemeToggleComponent_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.label));
        }
    }
    var _c0 = function (a0) { return { ovalSelected: a0 }; };
    var _c1 = function (a0) { return { buttonSelected: a0 }; };
    var BsThemeToggleComponent = /** @class */ (function () {
        function BsThemeToggleComponent() {
            this.showLabel = true;
            this.labels = ['msg#theme.lightMode', 'msg#theme.darkMode'];
            this.tooltips = ['msg#theme.darkModeTitle', 'msg#theme.lightModeTitle'];
            this.label = '';
            this.theme = "normal";
        }
        BsThemeToggleComponent.prototype.ngOnInit = function () {
            this.theme = localStorage.getItem('sinequa-theme') || 'normal';
            this.label = this.theme === 'normal' ? this.labels[0] : this.labels[1];
            this.tooltip = this.theme === 'normal' ? this.tooltips[0] : this.tooltips[1];
        };
        /**
        * Whether the UI is in dark or light mode
        */
        BsThemeToggleComponent.prototype.isDark = function () {
            return this.theme === "dark";
        };
        BsThemeToggleComponent.prototype.toggleTheme = function () {
            var index = 0;
            if (this.theme === 'normal') {
                this.theme = 'dark';
                index = 1;
            }
            else {
                this.theme = 'normal';
            }
            this.label = this.labels[index];
            this.tooltip = this.tooltips[index];
            localStorage.setItem('sinequa-theme', this.theme);
            document.body.classList.toggle("dark");
            return false;
        };
        return BsThemeToggleComponent;
    }());
    BsThemeToggleComponent.ɵfac = function BsThemeToggleComponent_Factory(t) { return new (t || BsThemeToggleComponent)(); };
    BsThemeToggleComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsThemeToggleComponent, selectors: [["sq-theme-toggle"]], inputs: { showLabel: "showLabel" }, decls: 5, vars: 10, consts: [[1, "d-flex", "align-items-center"], [4, "ngIf"], [1, "oval", 3, "ngClass", "sqTooltip", "click"], [1, "buttonToggle", 3, "ngClass"]], template: function BsThemeToggleComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtemplate(1, BsThemeToggleComponent_div_1_Template, 3, 3, "div", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵlistener("click", function BsThemeToggleComponent_Template_div_click_2_listener() { return ctx.toggleTheme(); });
                i0.ɵɵpipe(3, "sqMessage");
                i0.ɵɵelement(4, "div", 3);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.showLabel);
                i0.ɵɵadvance(1);
                i0.ɵɵpropertyInterpolate("sqTooltip", i0.ɵɵpipeBind1(3, 4, ctx.tooltip));
                i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c0, ctx.theme == "dark"));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c1, ctx.theme == "dark"));
            }
        }, directives: [i1.NgIf, i1.NgClass, i2.TooltipDirective], pipes: [i3.MessagePipe], styles: [".oval[_ngcontent-%COMP%]{background-color:#0275d8;border-radius:25px;cursor:pointer;height:26px;margin:0 10px;position:relative;transition:background-color .15s ease-in-out;width:50px}.ovalSelected[_ngcontent-%COMP%]{background:#fadc04}.buttonToggle[_ngcontent-%COMP%]{background-color:#f7f7f7;border-radius:50%;height:20px;left:0;margin-left:3px;margin-top:3px;position:absolute;transition:left .15s ease-in-out,background-color .15s ease-in-out;width:20px}.buttonSelected[_ngcontent-%COMP%]{background-color:#919191;left:25px}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsThemeToggleComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-theme-toggle',
                        templateUrl: './theme-toggle.component.html',
                        styleUrls: ['./theme-toggle.component.scss']
                    }]
            }], function () { return []; }, { showLabel: [{
                    type: i0.Input
                }] });
    })();

    var en = {
        "theme": {
            "darkMode": "Dark mode",
            "darkModeTitle": "Toggle dark mode",
            "lightMode": "Light mode",
            "lightModeTitle": "Toggle light mode"
        }
    };

    var fr = {
        "theme": {
            "darkMode": "Mode sombre",
            "darkModeTitle": "Activer le mode sombre",
            "lightMode": "Mode clair",
            "lightModeTitle": "Activer le mode clair"
        }
    };

    var de = {
        "theme": {
            "darkMode": "Dunkler Modus",
            "darkModeTitle": "Dunkelmodus umschalten",
            "lightMode": "Licht Modus",
            "lightModeTitle": "lichtmodus umschalten"
        }
    };

    var BsThemeToggleModule = /** @class */ (function () {
        function BsThemeToggleModule() {
        }
        return BsThemeToggleModule;
    }());
    BsThemeToggleModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsThemeToggleModule });
    BsThemeToggleModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsThemeToggleModule_Factory(t) { return new (t || BsThemeToggleModule)(); }, providers: [], imports: [[
                i1.CommonModule,
                i2.UtilsModule,
                i3.IntlModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsThemeToggleModule, { declarations: [BsThemeToggleComponent], imports: [i1.CommonModule,
                i2.UtilsModule,
                i3.IntlModule], exports: [BsThemeToggleComponent] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsThemeToggleModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i1.CommonModule,
                            i2.UtilsModule,
                            i3.IntlModule
                        ],
                        declarations: [
                            BsThemeToggleComponent
                        ],
                        exports: [
                            BsThemeToggleComponent
                        ],
                        providers: []
                    }]
            }], null, null);
    })();

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BsThemeToggleComponent = BsThemeToggleComponent;
    exports.BsThemeToggleModule = BsThemeToggleModule;
    exports.deTheme = de;
    exports.enTheme = en;
    exports.frTheme = fr;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-theme-toggle.umd.js.map
