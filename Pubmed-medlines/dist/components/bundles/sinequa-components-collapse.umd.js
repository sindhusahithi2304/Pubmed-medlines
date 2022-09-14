(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('@sinequa/core/intl')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/collapse', ['exports', '@angular/core', '@angular/animations', '@angular/common', '@sinequa/core/intl'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components.collapse = {}), global.ng.core, global.ng.animations, global.ng.common, global.sinequa.core.intl));
}(this, (function (exports, i0, animations, i1, i2) { 'use strict';

    function Collapse_div_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵelementContainer(1, 2);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("@show", !ctx_r0.collapsed && ctx_r0.afterViewInit);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngTemplateOutlet", ctx_r0.template);
        }
    }
    function collapseAnimations(timings) {
        return [
            animations.trigger('show', [
                animations.state('void', animations.style({ height: 0 })),
                animations.transition('void <=> 1', [
                    animations.animate(timings)
                ])
            ])
        ];
    }
    var Collapse = /** @class */ (function () {
        function Collapse() {
            this.collapsed = true;
        }
        Collapse.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(function () { return _this.afterViewInit = true; }, 0); // Value can switch synchronously => this can cause "Expression has changed" error
        };
        return Collapse;
    }());
    Collapse.ɵfac = function Collapse_Factory(t) { return new (t || Collapse)(); };
    Collapse.ɵcmp = i0.ɵɵdefineComponent({ type: Collapse, selectors: [["sq-collapse"]], contentQueries: function Collapse_ContentQueries(rf, ctx, dirIndex) {
            if (rf & 1) {
                i0.ɵɵcontentQuery(dirIndex, i0.TemplateRef, true);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.template = _t.first);
            }
        }, inputs: { collapsed: "collapsed" }, decls: 1, vars: 1, consts: [["class", "sq-collapse", 4, "ngIf"], [1, "sq-collapse"], [3, "ngTemplateOutlet"]], template: function Collapse_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, Collapse_div_0_Template, 2, 2, "div", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !ctx.collapsed);
            }
        }, directives: [i1.NgIf, i1.NgTemplateOutlet], styles: [".sq-collapse.ng-animating[_ngcontent-%COMP%] { overflow: hidden; }"], data: { animation: collapseAnimations(".15s ease-in-out") } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(Collapse, [{
                type: i0.Component,
                args: [{
                        selector: "sq-collapse",
                        template: "\n        <div *ngIf=\"!collapsed\" class=\"sq-collapse\" [@show]=\"!collapsed && afterViewInit\">\n            <ng-container [ngTemplateOutlet]=\"template\"></ng-container>\n        </div>\n    ",
                        styles: [".sq-collapse.ng-animating { overflow: hidden; }"],
                        animations: collapseAnimations(".15s ease-in-out")
                    }]
            }], function () { return []; }, { collapsed: [{
                    type: i0.Input
                }], template: [{
                    type: i0.ContentChild,
                    args: [i0.TemplateRef, { static: false }]
                }] });
    })();

    function CollapseButton_ng_container_0_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0);
        }
    }
    function CollapseButton_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelement(1, "span");
            i0.ɵɵtemplate(2, CollapseButton_ng_container_0_ng_container_2_Template, 1, 0, "ng-container", 0);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵclassMap(ctx_r0.icon);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !!ctx_r0.text);
        }
    }
    function CollapseButton_span_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r4_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "span", 3);
            i0.ɵɵlistener("click", function CollapseButton_span_1_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r4_1); var ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.toggleCollapsed(); });
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.text));
        }
    }
    function collapseButtonAnimations(timings) {
        return [
            animations.trigger('toggleCollapsed', [
                animations.state('0', animations.style({ transform: 'rotate(0deg)' })),
                animations.state('1', animations.style({ transform: 'rotate(-180deg)' })),
                animations.transition('0 <=> 1', [
                    animations.animate(timings)
                ])
            ]),
        ];
    }
    var CollapseButton = /** @class */ (function () {
        function CollapseButton() {
            this.state = new i0.EventEmitter();
            this.collapsed = true;
        }
        CollapseButton.prototype.toggleCollapsed = function () {
            this.collapsed = !this.collapsed;
            this.state.emit(this.collapsed);
        };
        return CollapseButton;
    }());
    CollapseButton.ɵfac = function CollapseButton_Factory(t) { return new (t || CollapseButton)(); };
    CollapseButton.ɵcmp = i0.ɵɵdefineComponent({ type: CollapseButton, selectors: [["sq-collapse-button"]], inputs: { collapsed: "collapsed", icon: "icon", text: "text" }, outputs: { state: "state" }, decls: 4, vars: 6, consts: [[4, "ngIf"], [3, "click", 4, "ngIf"], ["role", "button", 1, "fas", "fa-chevron-up", "fa-fw", 3, "title", "click"], [3, "click"]], template: function CollapseButton_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, CollapseButton_ng_container_0_Template, 3, 4, "ng-container", 0);
                i0.ɵɵtemplate(1, CollapseButton_span_1_Template, 3, 3, "span", 1);
                i0.ɵɵelementStart(2, "span", 2);
                i0.ɵɵlistener("click", function CollapseButton_Template_span_click_2_listener() { return ctx.toggleCollapsed(); });
                i0.ɵɵpipe(3, "sqMessage");
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !!ctx.icon);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", !!ctx.text);
                i0.ɵɵadvance(1);
                i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(3, 4, ctx.collapsed ? "msg#collapseButton.expand" : "msg#collapseButton.collapse"));
                i0.ɵɵproperty("@toggleCollapsed", ctx.collapsed);
            }
        }, directives: [i1.NgIf], pipes: [i2.MessagePipe], encapsulation: 2, data: { animation: collapseButtonAnimations(".15s ease-in-out") } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(CollapseButton, [{
                type: i0.Component,
                args: [{
                        selector: "sq-collapse-button",
                        templateUrl: "./collapse-button.component.html",
                        animations: collapseButtonAnimations(".15s ease-in-out")
                    }]
            }], function () { return []; }, { collapsed: [{
                    type: i0.Input
                }], icon: [{
                    type: i0.Input
                }], text: [{
                    type: i0.Input
                }], state: [{
                    type: i0.Output
                }] });
    })();

    var CollapseLink = /** @class */ (function () {
        function CollapseLink() {
            this.title = "";
            this.icon = "";
            this.text = "";
            this.stateChange = new i0.EventEmitter();
            this.collapsed = true;
        }
        CollapseLink.prototype.click = function () {
            this.collapsed = !this.collapsed;
            this.stateChange.emit({ group: this.group, collapsed: this.collapsed });
            return false; // Prevent following href
        };
        return CollapseLink;
    }());
    CollapseLink.ɵfac = function CollapseLink_Factory(t) { return new (t || CollapseLink)(); };
    CollapseLink.ɵcmp = i0.ɵɵdefineComponent({ type: CollapseLink, selectors: [["sq-collapse-link"]], inputs: { title: "title", icon: "icon", text: "text", group: "group" }, outputs: { stateChange: "stateChange" }, decls: 3, vars: 6, consts: [["href", "#", 3, "title", "click"], [3, "collapsed", "icon", "text"]], template: function CollapseLink_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "a", 0);
                i0.ɵɵlistener("click", function CollapseLink_Template_a_click_0_listener() { return ctx.click(); });
                i0.ɵɵpipe(1, "sqMessage");
                i0.ɵɵelement(2, "sq-collapse-button", 1);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 4, ctx.title));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("collapsed", ctx.collapsed)("icon", ctx.icon)("text", ctx.text);
            }
        }, directives: [CollapseButton], pipes: [i2.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(CollapseLink, [{
                type: i0.Component,
                args: [{
                        selector: "sq-collapse-link",
                        templateUrl: "./collapse-link.component.html"
                    }]
            }], function () { return []; }, { title: [{
                    type: i0.Input
                }], icon: [{
                    type: i0.Input
                }], text: [{
                    type: i0.Input
                }], group: [{
                    type: i0.Input
                }], stateChange: [{
                    type: i0.Output
                }] });
    })();

    var CollapseModule = /** @class */ (function () {
        function CollapseModule() {
        }
        return CollapseModule;
    }());
    CollapseModule.ɵmod = i0.ɵɵdefineNgModule({ type: CollapseModule });
    CollapseModule.ɵinj = i0.ɵɵdefineInjector({ factory: function CollapseModule_Factory(t) { return new (t || CollapseModule)(); }, imports: [[
                i1.CommonModule,
                i2.IntlModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CollapseModule, { declarations: [Collapse, CollapseButton, CollapseLink], imports: [i1.CommonModule,
                i2.IntlModule], exports: [Collapse, CollapseButton, CollapseLink] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(CollapseModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i1.CommonModule,
                            i2.IntlModule
                        ],
                        declarations: [
                            Collapse, CollapseButton, CollapseLink
                        ],
                        exports: [
                            Collapse, CollapseButton, CollapseLink
                        ],
                    }]
            }], null, null);
    })();

    var en = {
        collapseButton: {
            collapse: "Collapse",
            expand: "Expand"
        }
    };

    var fr = {
        collapseButton: {
            collapse: "Replier",
            expand: "Déplier"
        }
    };

    var de = {
        collapseButton: {
            "collapse": "Reduzieren",
            "expand": "Erweitern"
        }
    };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Collapse = Collapse;
    exports.CollapseButton = CollapseButton;
    exports.CollapseLink = CollapseLink;
    exports.CollapseModule = CollapseModule;
    exports.collapseAnimations = collapseAnimations;
    exports.collapseButtonAnimations = collapseButtonAnimations;
    exports.deCollapse = de;
    exports.enCollapse = en;
    exports.frCollapse = fr;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-collapse.umd.js.map
