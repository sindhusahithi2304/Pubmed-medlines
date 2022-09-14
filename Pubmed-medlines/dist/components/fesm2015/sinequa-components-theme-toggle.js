import { ɵɵelementStart, ɵɵtext, ɵɵpipe, ɵɵelementEnd, ɵɵnextContext, ɵɵadvance, ɵɵtextInterpolate, ɵɵpipeBind1, ɵɵdefineComponent, ɵɵtemplate, ɵɵlistener, ɵɵelement, ɵɵproperty, ɵɵpropertyInterpolate, ɵɵpureFunction1, ɵsetClassMetadata, Component, Input, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { NgIf, NgClass, CommonModule } from '@angular/common';
import { TooltipDirective, UtilsModule } from '@sinequa/components/utils';
import { MessagePipe, IntlModule } from '@sinequa/core/intl';

function BsThemeToggleComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, ctx_r0.label));
} }
const _c0 = function (a0) { return { ovalSelected: a0 }; };
const _c1 = function (a0) { return { buttonSelected: a0 }; };
class BsThemeToggleComponent {
    constructor() {
        this.showLabel = true;
        this.labels = ['msg#theme.lightMode', 'msg#theme.darkMode'];
        this.tooltips = ['msg#theme.darkModeTitle', 'msg#theme.lightModeTitle'];
        this.label = '';
        this.theme = "normal";
    }
    ngOnInit() {
        this.theme = localStorage.getItem('sinequa-theme') || 'normal';
        this.label = this.theme === 'normal' ? this.labels[0] : this.labels[1];
        this.tooltip = this.theme === 'normal' ? this.tooltips[0] : this.tooltips[1];
    }
    /**
    * Whether the UI is in dark or light mode
    */
    isDark() {
        return this.theme === "dark";
    }
    toggleTheme() {
        let index = 0;
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
    }
}
BsThemeToggleComponent.ɵfac = function BsThemeToggleComponent_Factory(t) { return new (t || BsThemeToggleComponent)(); };
BsThemeToggleComponent.ɵcmp = ɵɵdefineComponent({ type: BsThemeToggleComponent, selectors: [["sq-theme-toggle"]], inputs: { showLabel: "showLabel" }, decls: 5, vars: 10, consts: [[1, "d-flex", "align-items-center"], [4, "ngIf"], [1, "oval", 3, "ngClass", "sqTooltip", "click"], [1, "buttonToggle", 3, "ngClass"]], template: function BsThemeToggleComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, BsThemeToggleComponent_div_1_Template, 3, 3, "div", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵlistener("click", function BsThemeToggleComponent_Template_div_click_2_listener() { return ctx.toggleTheme(); });
        ɵɵpipe(3, "sqMessage");
        ɵɵelement(4, "div", 3);
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.showLabel);
        ɵɵadvance(1);
        ɵɵpropertyInterpolate("sqTooltip", ɵɵpipeBind1(3, 4, ctx.tooltip));
        ɵɵproperty("ngClass", ɵɵpureFunction1(6, _c0, ctx.theme == "dark"));
        ɵɵadvance(2);
        ɵɵproperty("ngClass", ɵɵpureFunction1(8, _c1, ctx.theme == "dark"));
    } }, directives: [NgIf, NgClass, TooltipDirective], pipes: [MessagePipe], styles: [".oval[_ngcontent-%COMP%]{background-color:#0275d8;border-radius:25px;cursor:pointer;height:26px;margin:0 10px;position:relative;transition:background-color .15s ease-in-out;width:50px}.ovalSelected[_ngcontent-%COMP%]{background:#fadc04}.buttonToggle[_ngcontent-%COMP%]{background-color:#f7f7f7;border-radius:50%;height:20px;left:0;margin-left:3px;margin-top:3px;position:absolute;transition:left .15s ease-in-out,background-color .15s ease-in-out;width:20px}.buttonSelected[_ngcontent-%COMP%]{background-color:#919191;left:25px}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsThemeToggleComponent, [{
        type: Component,
        args: [{
                selector: 'sq-theme-toggle',
                templateUrl: './theme-toggle.component.html',
                styleUrls: ['./theme-toggle.component.scss']
            }]
    }], function () { return []; }, { showLabel: [{
            type: Input
        }] }); })();

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

class BsThemeToggleModule {
}
BsThemeToggleModule.ɵmod = ɵɵdefineNgModule({ type: BsThemeToggleModule });
BsThemeToggleModule.ɵinj = ɵɵdefineInjector({ factory: function BsThemeToggleModule_Factory(t) { return new (t || BsThemeToggleModule)(); }, providers: [], imports: [[
            CommonModule,
            UtilsModule,
            IntlModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BsThemeToggleModule, { declarations: [BsThemeToggleComponent], imports: [CommonModule,
        UtilsModule,
        IntlModule], exports: [BsThemeToggleComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsThemeToggleModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    UtilsModule,
                    IntlModule
                ],
                declarations: [
                    BsThemeToggleComponent
                ],
                exports: [
                    BsThemeToggleComponent
                ],
                providers: []
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { BsThemeToggleComponent, BsThemeToggleModule, de as deTheme, en as enTheme, fr as frTheme };
//# sourceMappingURL=sinequa-components-theme-toggle.js.map
