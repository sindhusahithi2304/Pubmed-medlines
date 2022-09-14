import { ɵɵelementStart, ɵɵelementContainer, ɵɵelementEnd, ɵɵnextContext, ɵɵproperty, ɵɵadvance, ɵɵdefineComponent, ɵɵcontentQuery, TemplateRef, ɵɵqueryRefresh, ɵɵloadQuery, ɵɵtemplate, ɵsetClassMetadata, Component, Input, ContentChild, ɵɵelementContainerStart, ɵɵelement, ɵɵelementContainerEnd, ɵɵclassMap, ɵɵgetCurrentView, ɵɵlistener, ɵɵrestoreView, ɵɵtext, ɵɵpipe, ɵɵtextInterpolate, ɵɵpipeBind1, EventEmitter, ɵɵpropertyInterpolate, Output, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgIf, NgTemplateOutlet, CommonModule } from '@angular/common';
import { MessagePipe, IntlModule } from '@sinequa/core/intl';

function Collapse_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 1);
    ɵɵelementContainer(1, 2);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("@show", !ctx_r0.collapsed && ctx_r0.afterViewInit);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.template);
} }
function collapseAnimations(timings) {
    return [
        trigger('show', [
            state('void', style({ height: 0 })),
            transition('void <=> 1', [
                animate(timings)
            ])
        ])
    ];
}
class Collapse {
    constructor() {
        this.collapsed = true;
    }
    ngAfterViewInit() {
        setTimeout(() => this.afterViewInit = true, 0); // Value can switch synchronously => this can cause "Expression has changed" error
    }
}
Collapse.ɵfac = function Collapse_Factory(t) { return new (t || Collapse)(); };
Collapse.ɵcmp = ɵɵdefineComponent({ type: Collapse, selectors: [["sq-collapse"]], contentQueries: function Collapse_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵɵcontentQuery(dirIndex, TemplateRef, true);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
    } }, inputs: { collapsed: "collapsed" }, decls: 1, vars: 1, consts: [["class", "sq-collapse", 4, "ngIf"], [1, "sq-collapse"], [3, "ngTemplateOutlet"]], template: function Collapse_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, Collapse_div_0_Template, 2, 2, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !ctx.collapsed);
    } }, directives: [NgIf, NgTemplateOutlet], styles: [".sq-collapse.ng-animating[_ngcontent-%COMP%] { overflow: hidden; }"], data: { animation: collapseAnimations(".15s ease-in-out") } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(Collapse, [{
        type: Component,
        args: [{
                selector: "sq-collapse",
                template: `
        <div *ngIf="!collapsed" class="sq-collapse" [@show]="!collapsed && afterViewInit">
            <ng-container [ngTemplateOutlet]="template"></ng-container>
        </div>
    `,
                styles: [".sq-collapse.ng-animating { overflow: hidden; }"],
                animations: collapseAnimations(".15s ease-in-out")
            }]
    }], function () { return []; }, { collapsed: [{
            type: Input
        }], template: [{
            type: ContentChild,
            args: [TemplateRef, { static: false }]
        }] }); })();

function CollapseButton_ng_container_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
function CollapseButton_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "span");
    ɵɵtemplate(2, CollapseButton_ng_container_0_ng_container_2_Template, 1, 0, "ng-container", 0);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵclassMap(ctx_r0.icon);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !!ctx_r0.text);
} }
function CollapseButton_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 3);
    ɵɵlistener("click", function CollapseButton_span_1_Template_span_click_0_listener() { ɵɵrestoreView(_r4); const ctx_r3 = ɵɵnextContext(); return ctx_r3.toggleCollapsed(); });
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, ctx_r1.text));
} }
function collapseButtonAnimations(timings) {
    return [
        trigger('toggleCollapsed', [
            state('0', style({ transform: 'rotate(0deg)' })),
            state('1', style({ transform: 'rotate(-180deg)' })),
            transition('0 <=> 1', [
                animate(timings)
            ])
        ]),
    ];
}
class CollapseButton {
    constructor() {
        this.state = new EventEmitter();
        this.collapsed = true;
    }
    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.state.emit(this.collapsed);
    }
}
CollapseButton.ɵfac = function CollapseButton_Factory(t) { return new (t || CollapseButton)(); };
CollapseButton.ɵcmp = ɵɵdefineComponent({ type: CollapseButton, selectors: [["sq-collapse-button"]], inputs: { collapsed: "collapsed", icon: "icon", text: "text" }, outputs: { state: "state" }, decls: 4, vars: 6, consts: [[4, "ngIf"], [3, "click", 4, "ngIf"], ["role", "button", 1, "fas", "fa-chevron-up", "fa-fw", 3, "title", "click"], [3, "click"]], template: function CollapseButton_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, CollapseButton_ng_container_0_Template, 3, 4, "ng-container", 0);
        ɵɵtemplate(1, CollapseButton_span_1_Template, 3, 3, "span", 1);
        ɵɵelementStart(2, "span", 2);
        ɵɵlistener("click", function CollapseButton_Template_span_click_2_listener() { return ctx.toggleCollapsed(); });
        ɵɵpipe(3, "sqMessage");
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("ngIf", !!ctx.icon);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", !!ctx.text);
        ɵɵadvance(1);
        ɵɵpropertyInterpolate("title", ɵɵpipeBind1(3, 4, ctx.collapsed ? "msg#collapseButton.expand" : "msg#collapseButton.collapse"));
        ɵɵproperty("@toggleCollapsed", ctx.collapsed);
    } }, directives: [NgIf], pipes: [MessagePipe], encapsulation: 2, data: { animation: collapseButtonAnimations(".15s ease-in-out") } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(CollapseButton, [{
        type: Component,
        args: [{
                selector: "sq-collapse-button",
                templateUrl: "./collapse-button.component.html",
                animations: collapseButtonAnimations(".15s ease-in-out")
            }]
    }], function () { return []; }, { collapsed: [{
            type: Input
        }], icon: [{
            type: Input
        }], text: [{
            type: Input
        }], state: [{
            type: Output
        }] }); })();

class CollapseLink {
    constructor() {
        this.title = "";
        this.icon = "";
        this.text = "";
        this.stateChange = new EventEmitter();
        this.collapsed = true;
    }
    click() {
        this.collapsed = !this.collapsed;
        this.stateChange.emit({ group: this.group, collapsed: this.collapsed });
        return false; // Prevent following href
    }
}
CollapseLink.ɵfac = function CollapseLink_Factory(t) { return new (t || CollapseLink)(); };
CollapseLink.ɵcmp = ɵɵdefineComponent({ type: CollapseLink, selectors: [["sq-collapse-link"]], inputs: { title: "title", icon: "icon", text: "text", group: "group" }, outputs: { stateChange: "stateChange" }, decls: 3, vars: 6, consts: [["href", "#", 3, "title", "click"], [3, "collapsed", "icon", "text"]], template: function CollapseLink_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "a", 0);
        ɵɵlistener("click", function CollapseLink_Template_a_click_0_listener() { return ctx.click(); });
        ɵɵpipe(1, "sqMessage");
        ɵɵelement(2, "sq-collapse-button", 1);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵpropertyInterpolate("title", ɵɵpipeBind1(1, 4, ctx.title));
        ɵɵadvance(2);
        ɵɵproperty("collapsed", ctx.collapsed)("icon", ctx.icon)("text", ctx.text);
    } }, directives: [CollapseButton], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(CollapseLink, [{
        type: Component,
        args: [{
                selector: "sq-collapse-link",
                templateUrl: "./collapse-link.component.html"
            }]
    }], function () { return []; }, { title: [{
            type: Input
        }], icon: [{
            type: Input
        }], text: [{
            type: Input
        }], group: [{
            type: Input
        }], stateChange: [{
            type: Output
        }] }); })();

class CollapseModule {
}
CollapseModule.ɵmod = ɵɵdefineNgModule({ type: CollapseModule });
CollapseModule.ɵinj = ɵɵdefineInjector({ factory: function CollapseModule_Factory(t) { return new (t || CollapseModule)(); }, imports: [[
            CommonModule,
            IntlModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(CollapseModule, { declarations: [Collapse, CollapseButton, CollapseLink], imports: [CommonModule,
        IntlModule], exports: [Collapse, CollapseButton, CollapseLink] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(CollapseModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    IntlModule
                ],
                declarations: [
                    Collapse, CollapseButton, CollapseLink
                ],
                exports: [
                    Collapse, CollapseButton, CollapseLink
                ],
            }]
    }], null, null); })();

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

export { Collapse, CollapseButton, CollapseLink, CollapseModule, collapseAnimations, collapseButtonAnimations, de as deCollapse, en as enCollapse, fr as frCollapse };
//# sourceMappingURL=sinequa-components-collapse.js.map
