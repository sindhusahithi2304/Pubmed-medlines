import { Utils, Keys } from '@sinequa/core/base';
import { ɵɵelementContainer, ɵɵgetCurrentView, ɵɵelementContainerStart, ɵɵlistener, ɵɵrestoreView, ɵɵnextContext, ɵɵelementContainerEnd, ɵɵproperty, ɵɵpureFunction2, ɵɵelementStart, ɵɵelement, ɵɵelementEnd, ɵɵadvance, ɵɵclassMapInterpolate1, ɵɵclassMap, ɵɵtemplate, ɵɵtext, ɵɵpipe, ɵɵtextInterpolate, ɵɵpipeBind2, ɵɵtextInterpolate1, ɵɵdefineComponent, ɵɵtemplateRefExtractor, ɵɵreference, ɵsetClassMetadata, Component, Input, ɵɵinject, RendererFactory2, ɵɵdefineInjectable, Injectable, ɵɵdirectiveInject, ElementRef, ɵɵdefineDirective, Directive, HostListener, ɵɵpropertyInterpolate, ɵɵsanitizeUrl, ɵɵclassMapInterpolate2, ɵɵattribute, ɵɵclassProp, ChangeDetectionStrategy, HostBinding, ɵɵclassMapInterpolate3, ChangeDetectorRef, ɵɵclassMapInterpolate4, ɵɵpureFunction4, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { NgIf, NgClass, NgForOf, CommonModule } from '@angular/common';
import { UIService, TooltipDirective, UtilsModule } from '@sinequa/components/utils';
import { LoadComponentDirective, LoadComponentModule } from '@sinequa/core/load-component';
import { MessagePipe, IntlModule } from '@sinequa/core/intl';
import Popper from 'popper.js';
import { Subject } from 'rxjs';

class IAction {
}
class Action extends IAction {
    constructor(options) {
        super();
        Utils.extend(this, options);
    }
    get hasChildren() {
        return !!this.children && (this.children.length > 0);
    }
    get showSelected() {
        return typeof this.selected !== 'undefined';
    }
    update() {
        if (this.updater) {
            this.updater(this);
        }
        if (this.children) {
            for (const child of this.children) {
                child.update();
            }
        }
    }
}

function BsActionItemContent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
const _c0 = function (a0, a1) { return { component: a0, inputs: a1 }; };
function BsActionItemContent_ng_template_1_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0, 5);
    ɵɵlistener("click", function BsActionItemContent_ng_template_1_ng_container_0_Template_ng_container_click_0_listener($event) { ɵɵrestoreView(_r8); const ctx_r7 = ɵɵnextContext(2); return ctx_r7.componentClick($event); });
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r5 = ɵɵnextContext(2);
    ɵɵproperty("sqLoadComponent", ɵɵpureFunction2(1, _c0, ctx_r5.item.component, ctx_r5.item.componentInputs));
} }
function BsActionItemContent_ng_template_1_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵelement(1, "span", 9);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = ɵɵnextContext(3);
    ɵɵadvance(1);
    ɵɵclassMapInterpolate1("fas fa-check ", ctx_r9.item.selected ? "" : "invisible", "");
} }
function BsActionItemContent_ng_template_1_div_1_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵelement(1, "span", 9);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = ɵɵnextContext(3);
    ɵɵadvance(1);
    ɵɵclassMap(ctx_r10.item.icon);
} }
function BsActionItemContent_ng_template_1_div_1_div_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 10);
    ɵɵelement(1, "span", 9);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = ɵɵnextContext(3);
    ɵɵadvance(1);
    ɵɵclassMap(ctx_r11.item.iconAfter);
} }
function BsActionItemContent_ng_template_1_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 6);
    ɵɵtemplate(1, BsActionItemContent_ng_template_1_div_1_div_1_Template, 2, 3, "div", 7);
    ɵɵtemplate(2, BsActionItemContent_ng_template_1_div_1_div_2_Template, 2, 3, "div", 7);
    ɵɵelementStart(3, "div");
    ɵɵtext(4);
    ɵɵpipe(5, "sqMessage");
    ɵɵelementEnd();
    ɵɵtemplate(6, BsActionItemContent_ng_template_1_div_1_div_6_Template, 2, 3, "div", 8);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r6.item.showSelected);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !!ctx_r6.item.icon);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind2(5, 4, ctx_r6.text, ctx_r6.item.messageParams));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !!ctx_r6.item.iconAfter);
} }
function BsActionItemContent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵtemplate(0, BsActionItemContent_ng_template_1_ng_container_0_Template, 1, 4, "ng-container", 3);
    ɵɵtemplate(1, BsActionItemContent_ng_template_1_div_1_Template, 7, 7, "div", 4);
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("ngIf", !!ctx_r2.item.component);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !!!ctx_r2.item.component);
} }
function BsActionItemContent_ng_template_3_span_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span", 9);
} if (rf & 2) {
    const ctx_r12 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r12.item.icon);
} }
function BsActionItemContent_ng_template_3_span_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span", 9);
} if (rf & 2) {
    const ctx_r13 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r13.item.iconAfter);
} }
function BsActionItemContent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 11);
    ɵɵtemplate(1, BsActionItemContent_ng_template_3_span_1_Template, 1, 3, "span", 12);
    ɵɵtext(2);
    ɵɵpipe(3, "sqMessage");
    ɵɵtemplate(4, BsActionItemContent_ng_template_3_span_4_Template, 1, 3, "span", 12);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r4.item.styles || "");
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !!ctx_r4.item.icon);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind2(3, 4, ctx_r4.text, ctx_r4.item.messageParams), " ");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !!ctx_r4.item.iconAfter);
} }
class BsActionItemContent {
    componentClick(event) {
        if (this.item.action && !this.item.disabled) {
            this.item.action(this.item, event);
        }
        event.stopPropagation();
        return false;
    }
}
BsActionItemContent.ɵfac = function BsActionItemContent_Factory(t) { return new (t || BsActionItemContent)(); };
BsActionItemContent.ɵcmp = ɵɵdefineComponent({ type: BsActionItemContent, selectors: [["sq-action-item-content"]], inputs: { item: "item", text: "text", inDropdownMenu: ["in-dropdown-menu", "inDropdownMenu"] }, decls: 5, vars: 3, consts: [[4, "ngIf", "ngIfThen", "ngIfElse"], ["in_dropdown_menu", ""], ["not_in_dropdown_menu", ""], [3, "sqLoadComponent", "click", 4, "ngIf"], ["class", "d-flex flex-row sq-action-item-content-container", 4, "ngIf"], [3, "sqLoadComponent", "click"], [1, "d-flex", "flex-row", "sq-action-item-content-container"], [4, "ngIf"], ["class", "ml-auto", 4, "ngIf"], ["aria-hidden", "true"], [1, "ml-auto"], [3, "ngClass"], ["aria-hidden", "true", 3, "class", 4, "ngIf"]], template: function BsActionItemContent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsActionItemContent_ng_container_0_Template, 1, 0, "ng-container", 0);
        ɵɵtemplate(1, BsActionItemContent_ng_template_1_Template, 2, 2, "ng-template", null, 1, ɵɵtemplateRefExtractor);
        ɵɵtemplate(3, BsActionItemContent_ng_template_3_Template, 5, 7, "ng-template", null, 2, ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r1 = ɵɵreference(2);
        const _r3 = ɵɵreference(4);
        ɵɵproperty("ngIf", ctx.inDropdownMenu)("ngIfThen", _r1)("ngIfElse", _r3);
    } }, directives: [NgIf, LoadComponentDirective, NgClass], pipes: [MessagePipe], styles: [".sq-action-item-content-container[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 0.25rem;\n}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsActionItemContent, [{
        type: Component,
        args: [{
                selector: "sq-action-item-content",
                templateUrl: "./action-item-content.html",
                styles: [`
.sq-action-item-content-container > div:not(:last-child) {
    margin-right: 0.25rem;
}
    `]
            }]
    }], null, { item: [{
            type: Input
        }], text: [{
            type: Input
        }], inDropdownMenu: [{
            type: Input,
            args: ["in-dropdown-menu"]
        }] }); })();

const gClassName = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    DROPRIGHT: 'dropright',
    DROPLEFT: 'dropleft',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left',
    POSITION_STATIC: 'position-static'
};
const gSelector = {
    DROPDOWN: '.dropdown',
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
};
const gAttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end',
    RIGHT: 'right-start',
    RIGHTEND: 'right-end',
    LEFT: 'left-start',
    LEFTEND: 'left-end'
};
class BsDropdownService {
    constructor(rendererFactory) {
        this.dataApiKeydownHandler = (event) => {
            const descendant = this.matchDescendant(document.documentElement, event, `${gSelector.DATA_TOGGLE},${gSelector.MENU}`);
            if (!descendant) {
                return;
            }
            // If not input/textarea:
            //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
            // If input/textarea:
            //  - If space key => not a dropdown command
            //  - If key is other than escape
            //    - If key is not up or down => not a dropdown command
            //    - If trigger inside the menu => not a dropdown command
            if (/input|textarea/i.test(event.target.tagName) ?
                event.which === Keys.space || event.which !== Keys.esc &&
                    (event.which !== Keys.down && event.which !== Keys.up || event.target.closest(gSelector.MENU)) :
                !(event.which === Keys.up || event.which === Keys.down || event.which === Keys.esc)) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            if ( /*TODO descendant.disabled || */descendant.classList.contains(gClassName.DISABLED)) {
                return;
            }
            const parent = this.getParentFromElement(descendant);
            const isActive = parent instanceof HTMLElement && parent.classList.contains(gClassName.SHOW);
            if (!isActive && event.which === Keys.esc) {
                return;
            }
            if (!isActive || isActive && (event.which === Keys.esc || event.which === Keys.space)) {
                if (event.which === Keys.esc) {
                    const toggle = parent instanceof Element && parent.querySelector(gSelector.DATA_TOGGLE);
                    if (toggle instanceof HTMLElement) {
                        // toggle.dispatchEvent(new Event("focus", {bubbles: true}));
                        // NB $(toggle).trigger('focus') will set the focus on toggle
                        toggle.focus();
                    }
                }
                descendant.dispatchEvent(new Event("click", { bubbles: true }));
                return;
            }
            let items = [];
            if (parent instanceof Element) {
                items = items.slice.call(parent.querySelectorAll(gSelector.VISIBLE_ITEMS))
                    .filter((item) => item instanceof HTMLElement && (item.offsetWidth > 0 || item.offsetHeight > 0));
            }
            if (items.length === 0) {
                return;
            }
            let index = items.indexOf(event.target);
            if (event.which === Keys.up && index > 0) { // Up
                index--;
            }
            if (event.which === Keys.down && index < items.length - 1) { // Down
                index++;
            }
            if (index < 0) {
                index = 0;
            }
            items[index].focus();
        };
        this.clearMenus = (event) => {
            if (event && (event.which === 3 /*RIGHT_MOUSE_BUTTON_WHICH*/ ||
                event.type === 'keyup' && event.which !== Keys.tab)) {
                return;
            }
            this._events.next({ type: "clear", sourceEvent: event });
        };
        this.toggle = (event) => {
            const descendant = this.matchDescendant(document.documentElement, event, gSelector.DATA_TOGGLE);
            if (!descendant) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            this._events.next({ type: "toggle", element: descendant });
        };
        this.formChildClick = (event) => {
            if (!this.matchDescendant(document.documentElement, event, gSelector.FORM_CHILD)) {
                return;
            }
            event.stopPropagation();
        };
        this._events = new Subject();
        this.renderer = rendererFactory.createRenderer(null, null);
        this.unlisteners = [];
        this.unlisteners.push(this.renderer.listen(document, "keydown", this.dataApiKeydownHandler));
        this.unlisteners.push(this.renderer.listen(document, "click", this.clearMenus));
        this.unlisteners.push(this.renderer.listen(document, "keyup", this.clearMenus));
        this.unlisteners.push(this.renderer.listen(document, "click", this.toggle));
        this.unlisteners.push(this.renderer.listen(document, "click", this.formChildClick));
    }
    ngOnDestroy() {
        this._events.complete();
        this.unlisteners.forEach((unlistener) => unlistener());
    }
    get events() {
        return this._events;
    }
    matchDescendant(base, event, selector) {
        let element = event.target;
        while (element && element !== base) {
            if (element.matches(selector)) {
                return element;
            }
            element = element.parentElement;
        }
        return null;
    }
    getSelectorFromElement(element) {
        let selector = element.getAttribute('data-target');
        if (!selector || selector === '#') {
            const hrefAttr = element.getAttribute('href');
            selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
        }
        try {
            return document.querySelector(selector) ? selector : null;
        }
        catch (err) {
            return null;
        }
    }
    getParentFromElement(element) {
        let parent = null;
        const selector = this.getSelectorFromElement(element);
        if (selector) {
            parent = document.querySelector(selector);
        }
        if (!parent) {
            // Account for scroll menus and sub menus
            parent = element.parentElement;
            while (parent &&
                (parent.classList.contains("sq-scroll-menu") ||
                    parent.classList.contains("sq-scroll-menu-item") ||
                    parent.classList.contains("dropdown-submenu"))) {
                parent = parent.parentElement;
            }
        }
        return parent;
    }
    raiseClear() {
        this._events.next({ type: "clear", sourceEvent: undefined });
    }
}
BsDropdownService.ɵfac = function BsDropdownService_Factory(t) { return new (t || BsDropdownService)(ɵɵinject(RendererFactory2)); };
BsDropdownService.ɵprov = ɵɵdefineInjectable({ token: BsDropdownService, factory: BsDropdownService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsDropdownService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: RendererFactory2 }]; }, null); })();

// Based on  Bootstrap (v4.4.1): dropdown.js
function noop() { }
const gConfig = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
};
class BsDropdownDirective {
    constructor(elementRef, dropdownService) {
        this.elementRef = elementRef;
        this.dropdownService = dropdownService;
    }
    get dropdownMenu() {
        if (!this._dropdownMenu && this.dropdown) {
            this._dropdownMenu = this.dropdown.querySelector(gSelector.MENU);
        }
        return this._dropdownMenu;
    }
    ngOnInit() {
        this.subscription = this.dropdownService.events.subscribe((event) => {
            if (event.type === "clear") {
                this.clear(event.sourceEvent);
            }
            else if (event.type === "toggle") {
                this.toggle(event.element);
            }
        });
    }
    ngAfterViewInit() {
        this.dropdownToggle = this.elementRef.nativeElement;
        this.dropdown = this.dropdownService.getParentFromElement(this.dropdownToggle);
        this.inNavbar = !!this.dropdownToggle.closest('.navbar');
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    clickHandler(event) {
        // before event.stopPropagation() 
        // needed to avoid dropdown menu list to stay opened,
        // bubble event to his root parent first and once
        const isActive = this.dropdownMenu && this.dropdownMenu.classList.contains(gClassName.SHOW);
        if (!isActive)
            this.dropdown.dispatchEvent(new Event('click', { bubbles: true, cancelable: false }));
        event.preventDefault();
        event.stopPropagation();
        this.toggle(this.dropdownToggle);
    }
    toggle(element) {
        if (!element || this.dropdownToggle !== element || !this.dropdownMenu || !this.dropdown) {
            return;
        }
        if ( /*TODO element.disabled || */element.classList.contains(gClassName.DISABLED)) {
            return;
        }
        const isActive = this.dropdownMenu && this.dropdownMenu.classList.contains(gClassName.SHOW);
        this.dropdownService.raiseClear();
        if (isActive) {
            return;
        }
        this.show(true);
    }
    getPlacement() {
        let placement = gAttachmentMap.BOTTOM;
        // Handle dropup
        if (this.dropdown.classList.contains(gClassName.DROPUP)) {
            placement = gAttachmentMap.TOP;
            if (this.dropdownMenu && this.dropdownMenu.classList.contains(gClassName.MENURIGHT)) {
                placement = gAttachmentMap.TOPEND;
            }
        }
        else if (this.dropdown.classList.contains(gClassName.DROPRIGHT)) {
            placement = gAttachmentMap.RIGHT;
        }
        else if (this.dropdown.classList.contains(gClassName.DROPLEFT)) {
            placement = gAttachmentMap.LEFT;
        }
        else if (this.dropdownMenu && this.dropdownMenu.classList.contains(gClassName.MENURIGHT)) {
            placement = gAttachmentMap.BOTTOMEND;
        }
        return placement;
    }
    getOffset() {
        return {
            offset: gConfig.offset
        };
    }
    getPopperConfig() {
        const popperConfig = {
            placement: this.getPlacement(),
            modifiers: {
                offset: this.getOffset(),
                flip: {
                    enabled: gConfig.flip
                },
                preventOverflow: {
                    boundariesElement: gConfig.boundary
                }
            }
        };
        // Disable Popper.js if we have a static display
        if (gConfig.display === 'static') {
            popperConfig.modifiers.applyStyle = {
                enabled: false
            };
        }
        return popperConfig;
    }
    show(usePopper = false) {
        if (!this.dropdownToggle || !this.dropdownMenu || !this.dropdown) {
            return;
        }
        if ( /*TODO element.disabled || */this.dropdownToggle.classList.contains(gClassName.DISABLED) ||
            this.dropdownMenu.classList.contains(gClassName.SHOW)) {
            return;
        }
        const parent = this.dropdown;
        // Disable totally Popper.js for Dropdown in Navbar
        if (!this.inNavbar && usePopper) {
            /**
             * Check for Popper dependency
             * Popper - https://popper.js.org
             */
            if (typeof Popper === 'undefined') {
                throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
            }
            let referenceElement = this.dropdownToggle;
            if (gConfig.reference === 'parent') {
                referenceElement = parent;
            }
            // If boundary is not `scrollParent`, then set position to `static`
            // to allow the menu to "escape" the scroll parent's boundaries
            // https://github.com/twbs/bootstrap/issues/24251
            if (gConfig.boundary !== 'scrollParent') {
                parent.classList.add(gClassName.POSITION_STATIC);
            }
            this.popper = new Popper(referenceElement, this.dropdownMenu, this.getPopperConfig());
        }
        // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
        if ('ontouchstart' in document.documentElement &&
            !parent.closest(gSelector.NAVBAR_NAV)) {
            Array.from(document.body.children).forEach((element) => element.addEventListener('mouseover', noop));
        }
        this.dropdownToggle.focus();
        this.dropdownToggle.setAttribute('aria-expanded', "true");
        this.dropdownMenu.classList.toggle(gClassName.SHOW);
        parent.classList.toggle(gClassName.SHOW);
    }
    clear(event) {
        if (!this.dropdownToggle || !this.dropdownMenu || !this.dropdown) {
            return;
        }
        const parent = this.dropdown;
        if (!parent.classList.contains(gClassName.SHOW)) {
            return;
        }
        if (event && (event.type === 'click' &&
            /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === Keys.tab) &&
            parent.contains(event.target)) {
            return;
        }
        // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support
        if ('ontouchstart' in document.documentElement) {
            Array.from(document.body.children).forEach((element) => element.removeEventListener('mouseover', noop));
        }
        this.dropdownToggle.setAttribute('aria-expanded', 'false');
        if (this.popper) {
            this.popper.destroy();
        }
        this.dropdownMenu.classList.remove(gClassName.SHOW);
        parent.classList.remove(gClassName.SHOW);
    }
}
BsDropdownDirective.ɵfac = function BsDropdownDirective_Factory(t) { return new (t || BsDropdownDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(BsDropdownService)); };
BsDropdownDirective.ɵdir = ɵɵdefineDirective({ type: BsDropdownDirective, selectors: [["", "data-toggle", "dropdown"]], hostBindings: function BsDropdownDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function BsDropdownDirective_click_HostBindingHandler($event) { return ctx.clickHandler($event); });
    } } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsDropdownDirective, [{
        type: Directive,
        args: [{
                selector: gSelector.DATA_TOGGLE
            }]
    }], function () { return [{ type: ElementRef }, { type: BsDropdownService }]; }, { clickHandler: [{
            type: HostListener,
            args: ["click", ["$event"]]
        }] }); })();

const _c0$1 = ["sq-dropdown-menu", ""];
function BsDropdownMenu_h6_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "h6", 2);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind2(2, 1, ctx_r0.options.item.title, ctx_r0.options.item.messageParams));
} }
function BsDropdownMenu_ng_container_1_li_1_ng_container_3_a_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "a", 10);
    ɵɵelement(1, "sq-action-item-content", 11);
    ɵɵelementEnd();
} if (rf & 2) {
    const child_r2 = ɵɵnextContext(3).$implicit;
    ɵɵclassMapInterpolate1("dropdown-item ", child_r2.disabled ? "disabled" : "", "");
    ɵɵpropertyInterpolate("href", child_r2.href, ɵɵsanitizeUrl);
    ɵɵadvance(1);
    ɵɵproperty("item", child_r2)("text", child_r2.text)("in-dropdown-menu", true);
} }
function BsDropdownMenu_ng_container_1_li_1_ng_container_3_a_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 12);
    ɵɵlistener("click", function BsDropdownMenu_ng_container_1_li_1_ng_container_3_a_2_Template_a_click_0_listener($event) { ɵɵrestoreView(_r12); const child_r2 = ɵɵnextContext(3).$implicit; const ctx_r10 = ɵɵnextContext(); return ctx_r10.click(child_r2, $event); });
    ɵɵelement(1, "sq-action-item-content", 11);
    ɵɵelementEnd();
} if (rf & 2) {
    const child_r2 = ɵɵnextContext(3).$implicit;
    ɵɵclassMapInterpolate2("dropdown-item ", child_r2.hasChildren ? "dropdown-toggle" : "", " ", child_r2.disabled ? "disabled" : "", "");
    ɵɵattribute("data-toggle", child_r2.hasChildren ? "dropdown" : "");
    ɵɵadvance(1);
    ɵɵproperty("item", child_r2)("text", child_r2.text)("in-dropdown-menu", true);
} }
function BsDropdownMenu_ng_container_1_li_1_ng_container_3_sq_action_item_content_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "sq-action-item-content", 11);
} if (rf & 2) {
    const child_r2 = ɵɵnextContext(3).$implicit;
    ɵɵproperty("item", child_r2)("text", child_r2.text)("in-dropdown-menu", true);
} }
const _c1 = function (a0, a1) { return { item: a0, showMenuClass: a1 }; };
function BsDropdownMenu_ng_container_1_li_1_ng_container_3_ul_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "ul", 13);
} if (rf & 2) {
    const child_r2 = ɵɵnextContext(3).$implicit;
    const ctx_r8 = ɵɵnextContext();
    ɵɵproperty("sq-dropdown-menu", ɵɵpureFunction2(1, _c1, child_r2, ctx_r8.options.showMenuClass));
} }
function BsDropdownMenu_ng_container_1_li_1_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsDropdownMenu_ng_container_1_li_1_ng_container_3_a_1_Template, 2, 7, "a", 6);
    ɵɵtemplate(2, BsDropdownMenu_ng_container_1_li_1_ng_container_3_a_2_Template, 2, 8, "a", 7);
    ɵɵtemplate(3, BsDropdownMenu_ng_container_1_li_1_ng_container_3_sq_action_item_content_3_Template, 1, 3, "sq-action-item-content", 8);
    ɵɵtemplate(4, BsDropdownMenu_ng_container_1_li_1_ng_container_3_ul_4_Template, 1, 4, "ul", 9);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const child_r2 = ɵɵnextContext(2).$implicit;
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !child_r2.scrollGroup && child_r2.href);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !child_r2.scrollGroup && !child_r2.href && !child_r2.component);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", child_r2.component);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", child_r2.hasChildren);
} }
function BsDropdownMenu_ng_container_1_li_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "li", 4);
    ɵɵpipe(1, "sqMessage");
    ɵɵpipe(2, "sqMessage");
    ɵɵtemplate(3, BsDropdownMenu_ng_container_1_li_1_ng_container_3_Template, 5, 4, "ng-container", 5);
    ɵɵelementEnd();
} if (rf & 2) {
    const child_r2 = ɵɵnextContext().$implicit;
    ɵɵclassMap(child_r2.separator ? "dropdown-divider" : child_r2.scrollGroup ? "sq-scroll-menu-item open" : child_r2.hasChildren ? "dropdown-submenu" : "");
    ɵɵpropertyInterpolate("title", ɵɵpipeBind2(1, 6, child_r2.title, child_r2.messageParams));
    ɵɵattribute("aria-label", ɵɵpipeBind2(2, 9, child_r2.title, child_r2.messageParams));
    ɵɵadvance(3);
    ɵɵproperty("ngIf", !child_r2.separator);
} }
function BsDropdownMenu_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsDropdownMenu_ng_container_1_li_1_Template, 4, 12, "li", 3);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const child_r2 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !child_r2.hidden);
} }
class BsDropdownMenu {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    set options(opts) {
        var _a;
        this._options = Object.assign({}, opts);
        this.children = ((_a = opts.item.children) === null || _a === void 0 ? void 0 : _a.filter(child => !child.hidden)) || [];
    }
    get options() {
        return this._options;
    }
    ngOnInit() {
        const element = this.elementRef.nativeElement;
        if (this.options.item.scrollable) {
            element.classList.add("sq-scrollable-menu");
        }
        else if (this.options.item.scrollGroup) {
            element.classList.add("sq-scroll-menu");
        }
        this.rightAligned = this.options.rightAligned;
    }
    getLi(element) {
        let element1 = element;
        while (element1 && element1.nodeName !== "LI") {
            element1 = element1.parentElement;
        }
        return element1;
    }
    click(item, event) {
        if (!this.options.item.disabled) {
            // Handle sub-menu opening
            let isOpen = false;
            const li = this.getLi(event.target);
            if (!!li && li.classList.contains("dropdown-submenu")) {
                event.preventDefault();
                event.stopPropagation();
                isOpen = li.classList.contains(this.options.showMenuClass);
                const ul = li.parentElement;
                if (ul) {
                    for (let i = 0, ic = ul.children.length; i < ic; i++) {
                        const _li = ul.children[i];
                        _li.classList.remove(this.options.showMenuClass);
                    }
                }
                // NB toggle's second param does not work on IE
                // li.classList.toggle(this.options.showMenuClass, !isOpen);
                if (!isOpen) {
                    li.classList.add(this.options.showMenuClass);
                }
            }
            if (item.action) {
                item.action(item, event);
            }
            if (item.toggle) {
                item.toggle(item, !isOpen);
            }
        }
    }
}
BsDropdownMenu.ɵfac = function BsDropdownMenu_Factory(t) { return new (t || BsDropdownMenu)(ɵɵdirectiveInject(ElementRef)); };
BsDropdownMenu.ɵcmp = ɵɵdefineComponent({ type: BsDropdownMenu, selectors: [["", "sq-dropdown-menu", ""]], hostAttrs: ["role", "menu", 1, "dropdown-menu"], hostVars: 2, hostBindings: function BsDropdownMenu_HostBindings(rf, ctx) { if (rf & 2) {
        ɵɵclassProp("dropdown-menu-right", ctx.rightAligned);
    } }, inputs: { options: ["sq-dropdown-menu", "options"] }, attrs: _c0$1, decls: 2, vars: 2, consts: [["class", "dropdown-header", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "dropdown-header"], [3, "class", "title", 4, "ngIf"], [3, "title"], [4, "ngIf"], ["tabindex", "-1", 3, "class", "href", 4, "ngIf"], ["href", "javascript:void(0)", "tabindex", "-1", 3, "class", "click", 4, "ngIf"], [3, "item", "text", "in-dropdown-menu", 4, "ngIf"], [3, "sq-dropdown-menu", 4, "ngIf"], ["tabindex", "-1", 3, "href"], [3, "item", "text", "in-dropdown-menu"], ["href", "javascript:void(0)", "tabindex", "-1", 3, "click"], [3, "sq-dropdown-menu"]], template: function BsDropdownMenu_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsDropdownMenu_h6_0_Template, 3, 4, "h6", 0);
        ɵɵtemplate(1, BsDropdownMenu_ng_container_1_Template, 2, 1, "ng-container", 1);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.options.item.title && ctx.options.item.headerGroup);
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.options.item.children);
    } }, directives: [NgIf, NgForOf, BsActionItemContent, BsDropdownMenu], pipes: [MessagePipe], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsDropdownMenu, [{
        type: Component,
        args: [{
                selector: "[sq-dropdown-menu]",
                host: {
                    "class": "dropdown-menu",
                    "role": "menu"
                },
                templateUrl: "./dropdown-menu.html",
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: ElementRef }]; }, { options: [{
            type: Input,
            args: ["sq-dropdown-menu"]
        }], rightAligned: [{
            type: HostBinding,
            args: ["class.dropdown-menu-right"]
        }] }); })();

const _c0$2 = ["sq-action-item", ""];
function BsActionItem_ng_container_0_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 7);
    ɵɵlistener("click", function BsActionItem_ng_container_0_button_1_Template_button_click_0_listener($event) { ɵɵrestoreView(_r11); const ctx_r10 = ɵɵnextContext(2); return ctx_r10.click($event); });
    ɵɵpipe(1, "sqMessage");
    ɵɵpipe(2, "sqMessage");
    ɵɵelement(3, "sq-action-item-content", 8);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = ɵɵnextContext(2);
    ɵɵclassMapInterpolate3("btn ", ctx_r4.styleClass, " ", ctx_r4.sizeClass, " ", ctx_r4.options.item.disabled ? "disabled" : "", "");
    ɵɵpropertyInterpolate("sqTooltip", ɵɵpipeBind2(1, 9, ctx_r4.itemTitle, ctx_r4.itemMessageParams));
    ɵɵattribute("aria-label", ɵɵpipeBind2(2, 12, ctx_r4.itemTitle, ctx_r4.itemMessageParams));
    ɵɵadvance(3);
    ɵɵproperty("item", ctx_r4.options.item)("text", ctx_r4.itemText);
} }
function BsActionItem_ng_container_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
function BsActionItem_ng_container_0_ng_template_3_div_0_sq_action_item_content_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "sq-action-item-content", 8);
} if (rf & 2) {
    const ctx_r13 = ɵɵnextContext(4);
    ɵɵproperty("item", ctx_r13.options.item)("text", ctx_r13.itemText);
} }
function BsActionItem_ng_container_0_ng_template_3_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtemplate(1, BsActionItem_ng_container_0_ng_template_3_div_0_sq_action_item_content_1_Template, 1, 2, "sq-action-item-content", 1);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r12 = ɵɵnextContext(3);
    ɵɵclassMapInterpolate1("btn-text ", ctx_r12.sizeClass, "");
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r12.hasAction);
} }
function BsActionItem_ng_container_0_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵtemplate(0, BsActionItem_ng_container_0_ng_template_3_div_0_Template, 2, 4, "div", 9);
} if (rf & 2) {
    const ctx_r7 = ɵɵnextContext(2);
    ɵɵproperty("ngIf", !ctx_r7.hasAction);
} }
function BsActionItem_ng_container_0_ng_template_5_sq_action_item_content_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "sq-action-item-content", 8);
} if (rf & 2) {
    const ctx_r14 = ɵɵnextContext(3);
    ɵɵproperty("item", ctx_r14.options.item)("text", ctx_r14.itemText);
} }
function BsActionItem_ng_container_0_ng_template_5_ul_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "ul", 12);
} if (rf & 2) {
    const ctx_r15 = ɵɵnextContext(3);
    ɵɵproperty("sq-dropdown-menu", ctx_r15.dropdownMenuOptions);
} }
function BsActionItem_ng_container_0_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    const _r17 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 10);
    ɵɵlistener("touchstart", function BsActionItem_ng_container_0_ng_template_5_Template_button_touchstart_0_listener() { ɵɵrestoreView(_r17); const ctx_r16 = ɵɵnextContext(2); return ctx_r16.touchstart(); })("mousedown", function BsActionItem_ng_container_0_ng_template_5_Template_button_mousedown_0_listener() { ɵɵrestoreView(_r17); const ctx_r18 = ɵɵnextContext(2); return ctx_r18.mousedown(); })("focusin", function BsActionItem_ng_container_0_ng_template_5_Template_button_focusin_0_listener() { ɵɵrestoreView(_r17); const ctx_r19 = ɵɵnextContext(2); return ctx_r19.focusin(); });
    ɵɵpipe(1, "sqMessage");
    ɵɵpipe(2, "sqMessage");
    ɵɵtemplate(3, BsActionItem_ng_container_0_ng_template_5_sq_action_item_content_3_Template, 1, 2, "sq-action-item-content", 1);
    ɵɵelementEnd();
    ɵɵtemplate(4, BsActionItem_ng_container_0_ng_template_5_ul_4_Template, 1, 1, "ul", 11);
} if (rf & 2) {
    const ctx_r9 = ɵɵnextContext(2);
    ɵɵclassMapInterpolate2("btn ", ctx_r9.styleClass, " dropdown-toggle ", ctx_r9.sizeClass, "");
    ɵɵpropertyInterpolate("sqTooltip", ɵɵpipeBind2(1, 8, ctx_r9.itemTitle, ctx_r9.itemMessageParams));
    ɵɵattribute("aria-label", ɵɵpipeBind2(2, 11, ctx_r9.itemTitle, ctx_r9.itemMessageParams));
    ɵɵadvance(3);
    ɵɵproperty("ngIf", !ctx_r9.hasAction);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r9.showDropdown);
} }
function BsActionItem_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsActionItem_ng_container_0_button_1_Template, 4, 15, "button", 3);
    ɵɵtemplate(2, BsActionItem_ng_container_0_ng_container_2_Template, 1, 0, "ng-container", 4);
    ɵɵtemplate(3, BsActionItem_ng_container_0_ng_template_3_Template, 1, 1, "ng-template", null, 5, ɵɵtemplateRefExtractor);
    ɵɵtemplate(5, BsActionItem_ng_container_0_ng_template_5_Template, 5, 14, "ng-template", null, 6, ɵɵtemplateRefExtractor);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const _r6 = ɵɵreference(4);
    const _r8 = ɵɵreference(6);
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.hasAction);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.options.item.flattenable && (ctx_r0.options.item.children == null ? null : ctx_r0.options.item.children.length) === 1)("ngIfThen", _r6)("ngIfElse", _r8);
} }
function BsActionItem_sq_action_item_content_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "sq-action-item-content", 8);
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("item", ctx_r1.options.item)("text", ctx_r1.itemText);
} }
function BsActionItem_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r21 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "a", 13);
    ɵɵlistener("click", function BsActionItem_ng_container_2_Template_a_click_1_listener($event) { ɵɵrestoreView(_r21); const ctx_r20 = ɵɵnextContext(); return ctx_r20.click($event); });
    ɵɵpipe(2, "sqMessage");
    ɵɵpipe(3, "sqMessage");
    ɵɵelement(4, "sq-action-item-content", 8);
    ɵɵelementEnd();
    ɵɵelement(5, "ul", 12);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵclassMapInterpolate2("", ctx_r2.options.inMenu ? "nav-link" : "dropdown-item", " dropdown-toggle ", ctx_r2.options.item.disabled ? "disabled" : "", "");
    ɵɵpropertyInterpolate("title", ɵɵpipeBind2(2, 9, ctx_r2.itemTitle, ctx_r2.itemMessageParams));
    ɵɵattribute("aria-label", ɵɵpipeBind2(3, 12, ctx_r2.itemTitle, ctx_r2.itemMessageParams));
    ɵɵadvance(3);
    ɵɵproperty("item", ctx_r2.options.item)("text", ctx_r2.itemText);
    ɵɵadvance(1);
    ɵɵproperty("sq-dropdown-menu", ctx_r2.dropdownMenuOptions);
} }
function BsActionItem_a_3_Template(rf, ctx) { if (rf & 1) {
    const _r23 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 14);
    ɵɵlistener("click", function BsActionItem_a_3_Template_a_click_0_listener($event) { ɵɵrestoreView(_r23); const ctx_r22 = ɵɵnextContext(); return ctx_r22.click($event); });
    ɵɵpipe(1, "sqMessage");
    ɵɵpipe(2, "sqMessage");
    ɵɵelement(3, "sq-action-item-content", 8);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵɵnextContext();
    ɵɵclassMapInterpolate2("", ctx_r3.options.inMenu ? "nav-link" : "dropdown-item", " ", ctx_r3.options.item.disabled ? "disabled" : "", "");
    ɵɵpropertyInterpolate("title", ɵɵpipeBind2(1, 8, ctx_r3.itemTitle, ctx_r3.itemMessageParams));
    ɵɵattribute("aria-label", ɵɵpipeBind2(2, 11, ctx_r3.itemTitle, ctx_r3.itemMessageParams));
    ɵɵadvance(3);
    ɵɵproperty("item", ctx_r3.options.item)("text", ctx_r3.itemText);
} }
class BsActionItem {
    constructor(uiService, elementRef, cdRef) {
        this.uiService = uiService;
        this.elementRef = elementRef;
        this.cdRef = cdRef;
        this.collapseBreakpoint = "md";
    }
    get haveItem() {
        return !!this.options.item;
    }
    get isVisible() {
        return this.haveItem && !this.options.item.hidden;
    }
    get hasAction() {
        return this.haveItem && !!this.options.item.action;
    }
    get isDropdownButton() {
        return this.isVisible && !this.inListItem && this.options.item.hasChildren;
    }
    get isButton() {
        return this.isVisible && !this.inListItem && !this.options.item.hasChildren && this.hasAction;
    }
    get isDropdownListItem() {
        return this.isVisible && this.inListItem && this.options.item.hasChildren;
    }
    get isListItem() {
        return this.isVisible && this.inListItem && !this.options.item.hasChildren && this.hasAction;
    }
    get haveSpace() {
        if (this.uiService.screenSizeIsGreaterOrEqual(this.autoAdjustBreakpoint)) {
            return true;
        }
        if (this.inListItem && this.uiService.screenSizeIsLess(this.collapseBreakpoint)) {
            return true;
        }
        return false;
    }
    get haveIcon() {
        return !!this.options.item.icon || !!this.options.item.iconAfter;
    }
    get itemText() {
        if (!this.haveItem) {
            return "";
        }
        const text = this.options.item.text || "";
        if (this.options.autoAdjust && this.haveIcon) {
            return this.haveSpace ? text : "";
        }
        else {
            return text;
        }
    }
    get itemTitle() {
        if (!this.haveItem) {
            return "";
        }
        const text = this.options.item.text || "";
        const title = this.options.item.title || "";
        if (this.options.autoAdjust && this.haveIcon) {
            return this.haveSpace ? (title !== text ? title : "") : title || text;
        }
        else {
            return title;
        }
    }
    get itemMessageParams() {
        if (!this.haveItem) {
            return null;
        }
        return this.options.item.messageParams;
    }
    get sizeClass() {
        return this.options.size ? `btn-${this.options.size}` : "";
    }
    get styleClass() {
        return this.options.style ? `btn-${this.options.style}` : "btn-light";
    }
    get dropdownMenuOptions() {
        return (Object.assign(Object.assign({}, this.options), { showMenuClass: 'show' }));
    }
    ngAfterViewInit() {
        this.dropdownButton = this.elementRef.nativeElement.querySelector("div.dropdown");
        this.dropdownListItem = this.elementRef.nativeElement.querySelector("li.dropdown-toggle");
    }
    ngOnInit() {
        this.inListItem = (this.elementRef.nativeElement.nodeName === "LI");
        if (this.options.item.init) {
            this.options.item.init(this.options.item);
        }
        this.autoAdjustBreakpoint = this.options.autoAdjustBreakpoint;
        this.uiService.resizeEvent.subscribe(e => this.cdRef.detectChanges());
    }
    ngOnDestroy() {
        if (this.options.item.destroy) {
            this.options.item.destroy(this.options.item);
        }
    }
    click(event) {
        if (!this.options.item.disabled) {
            if (this.options.item.action) {
                this.options.item.action(this.options.item, event);
            }
            if (this.options.item.toggle && (this.isDropdownButton || this.isDropdownListItem)) {
                const openElement = this.dropdownButton || (this.dropdownListItem ? this.dropdownListItem.parentElement : null);
                if (openElement) {
                    this.options.item.toggle(this.options.item, !openElement.classList.contains("open"));
                }
            }
        }
    }
    touchstart() {
        this.showDropdown = true;
    }
    mousedown() {
        this.showDropdown = true;
    }
    focusin() {
        this.showDropdown = true;
    }
}
BsActionItem.ɵfac = function BsActionItem_Factory(t) { return new (t || BsActionItem)(ɵɵdirectiveInject(UIService), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef)); };
BsActionItem.ɵcmp = ɵɵdefineComponent({ type: BsActionItem, selectors: [["", "sq-action-item", ""]], inputs: { options: ["sq-action-item", "options"], collapseBreakpoint: "collapseBreakpoint" }, attrs: _c0$2, decls: 4, vars: 4, consts: [[4, "ngIf"], [3, "item", "text", 4, "ngIf"], ["href", "javascript:void(0)", "role", "button", 3, "class", "title", "click", 4, "ngIf"], ["type", "button", 3, "class", "sqTooltip", "click", 4, "ngIf"], [4, "ngIf", "ngIfThen", "ngIfElse"], ["flattened", ""], ["unflattened", ""], ["type", "button", 3, "sqTooltip", "click"], [3, "item", "text"], [3, "class", 4, "ngIf"], ["type", "button", "data-toggle", "dropdown", 3, "sqTooltip", "touchstart", "mousedown", "focusin"], [3, "sq-dropdown-menu", 4, "ngIf"], [3, "sq-dropdown-menu"], ["href", "javascript:void(0)", "data-toggle", "dropdown", "role", "button", "aria-haspopup", "true", "aria-expanded", "false", 3, "title", "click"], ["href", "javascript:void(0)", "role", "button", 3, "title", "click"]], template: function BsActionItem_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsActionItem_ng_container_0_Template, 7, 4, "ng-container", 0);
        ɵɵtemplate(1, BsActionItem_sq_action_item_content_1_Template, 1, 2, "sq-action-item-content", 1);
        ɵɵtemplate(2, BsActionItem_ng_container_2_Template, 6, 15, "ng-container", 0);
        ɵɵtemplate(3, BsActionItem_a_3_Template, 4, 14, "a", 2);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.isDropdownButton);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.isButton);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.isDropdownListItem);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.isListItem);
    } }, directives: [NgIf, TooltipDirective, BsActionItemContent, BsDropdownDirective, BsDropdownMenu], pipes: [MessagePipe], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsActionItem, [{
        type: Component,
        args: [{
                selector: "[sq-action-item]",
                templateUrl: "./action-item.html",
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: UIService }, { type: ElementRef }, { type: ChangeDetectorRef }]; }, { options: [{
            type: Input,
            args: ["sq-action-item"]
        }], collapseBreakpoint: [{
            type: Input
        }] }); })();

const _c0$3 = ["sq-action-buttons", ""];
function BsActionButtons_ng_container_0_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 3);
    ɵɵlistener("click", function BsActionButtons_ng_container_0_a_1_Template_a_click_0_listener($event) { ɵɵrestoreView(_r6); const item_r1 = ɵɵnextContext().$implicit; const ctx_r4 = ɵɵnextContext(); return ctx_r4.itemClick(item_r1, $event); });
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ɵɵnextContext().$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("sq-action-item", ctx_r2.getActionItemOptions(item_r1));
    ɵɵattribute("href", !item_r1.disabled ? item_r1.href : null, ɵɵsanitizeUrl);
} }
function BsActionButtons_ng_container_0_ng_container_2_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "div", 6);
} if (rf & 2) {
    const item_r1 = ɵɵnextContext(2).$implicit;
    const ctx_r8 = ɵɵnextContext();
    ɵɵproperty("sq-action-item", ctx_r8.getActionItemOptions(item_r1));
} }
function BsActionButtons_ng_container_0_ng_container_2_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r13 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 7);
    ɵɵlistener("click", function BsActionButtons_ng_container_0_ng_container_2_button_2_Template_button_click_0_listener($event) { ɵɵrestoreView(_r13); const item_r1 = ɵɵnextContext(2).$implicit; const ctx_r11 = ɵɵnextContext(); return ctx_r11.itemClick(item_r1, $event); });
    ɵɵpipe(1, "sqMessage");
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ɵɵnextContext(2).$implicit;
    const ctx_r9 = ɵɵnextContext();
    ɵɵclassMapInterpolate4("btn ", ctx_r9.styleClass, " ", ctx_r9.sizeClass, " ", item_r1.selected ? "active" : "", " ", item_r1.disabled ? "disabled" : "", "");
    ɵɵpropertyInterpolate("sqTooltip", ɵɵpipeBind2(1, 9, item_r1.title, item_r1.messageParams));
    ɵɵproperty("sq-action-item", ctx_r9.getActionItemOptions(item_r1));
    ɵɵattribute("aria-label", ɵɵpipeBind2(2, 12, item_r1.title, item_r1.messageParams));
} }
function BsActionButtons_ng_container_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsActionButtons_ng_container_0_ng_container_2_div_1_Template, 1, 1, "div", 4);
    ɵɵtemplate(2, BsActionButtons_ng_container_0_ng_container_2_button_2_Template, 3, 15, "button", 5);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r1 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵproperty("ngIf", item_r1.hasChildren);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !item_r1.hasChildren);
} }
function BsActionButtons_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsActionButtons_ng_container_0_a_1_Template, 1, 2, "a", 1);
    ɵɵtemplate(2, BsActionButtons_ng_container_0_ng_container_2_Template, 3, 2, "ng-container", 2);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵproperty("ngIf", item_r1.href);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !item_r1.href);
} }
class BsActionButtons {
    set options(opts) {
        this._options = opts;
    }
    get options() {
        return this._options;
    }
    get sizeClass() {
        return this._options.size ? `btn-${this._options.size}` : "";
    }
    get styleClass() {
        return this._options.style ? `btn-${this._options.style}` : "btn-light";
    }
    get itemsVisible() {
        // hidden items are not displayed
        return (Array.isArray(this._options.items)) ? this._options.items.filter(item => !item.hidden) : this._options.items.hidden ? [] : [this._options.items];
    }
    getActionItemOptions(item) {
        return (Object.assign(Object.assign({}, this._options), { item, inMenu: false }));
    }
    itemClick(item, event) {
        if (!item.disabled && item.action) {
            item.action(item, event);
        }
        if (item.href === "#" || (!!item.href && item.disabled)) {
            event.preventDefault();
        }
    }
}
BsActionButtons.ɵfac = function BsActionButtons_Factory(t) { return new (t || BsActionButtons)(); };
BsActionButtons.ɵcmp = ɵɵdefineComponent({ type: BsActionButtons, selectors: [["", "sq-action-buttons", ""]], inputs: { options: ["sq-action-buttons", "options"] }, attrs: _c0$3, decls: 1, vars: 1, consts: [[4, "ngFor", "ngForOf"], ["class", "btn-text", 3, "sq-action-item", "click", 4, "ngIf"], [4, "ngIf"], [1, "btn-text", 3, "sq-action-item", "click"], ["class", "btn-group dropdown", 3, "sq-action-item", 4, "ngIf"], ["type", "button", 3, "class", "sq-action-item", "sqTooltip", "click", 4, "ngIf"], [1, "btn-group", "dropdown", 3, "sq-action-item"], ["type", "button", 3, "sq-action-item", "sqTooltip", "click"]], template: function BsActionButtons_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsActionButtons_ng_container_0_Template, 3, 2, "ng-container", 0);
    } if (rf & 2) {
        ɵɵproperty("ngForOf", ctx.itemsVisible);
    } }, directives: [NgForOf, NgIf, BsActionItem, TooltipDirective], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsActionButtons, [{
        type: Component,
        args: [{
                selector: "[sq-action-buttons]",
                templateUrl: "./action-buttons.html"
            }]
    }], null, { options: [{
            type: Input,
            args: ["sq-action-buttons"]
        }] }); })();

const _c0$4 = function (a0, a1, a2, a3) { return { item: a0, size: a1, autoAdjust: a2, autoAdjustBreakpoint: a3, inMenu: true }; };
function BsActionMenu_ng_container_1_li_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "li", 2);
} if (rf & 2) {
    const item_r1 = ɵɵnextContext().$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassMapInterpolate1("nav-item ", item_r1.hasChildren ? "dropdown" : "", "");
    ɵɵproperty("sq-action-item", ɵɵpureFunction4(5, _c0$4, item_r1, ctx_r2.size, ctx_r2.autoAdjust, ctx_r2.autoAdjustBreakpoint))("collapseBreakpoint", ctx_r2.collapseBreakpoint);
} }
function BsActionMenu_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsActionMenu_ng_container_1_li_1_Template, 1, 10, "li", 1);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !item_r1.hidden);
} }
class BsActionMenu {
    ngOnInit() {
        if (!Utils.isArray(this.items)) {
            this.items = [this.items];
        }
    }
    identify(index, item) {
        return item.name || item.text || item.title || index;
    }
}
BsActionMenu.ɵfac = function BsActionMenu_Factory(t) { return new (t || BsActionMenu)(); };
BsActionMenu.ɵcmp = ɵɵdefineComponent({ type: BsActionMenu, selectors: [["sq-action-menu"]], inputs: { items: "items", size: "size", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", right: "right" }, decls: 2, vars: 5, consts: [[4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "class", "sq-action-item", "collapseBreakpoint", 4, "ngIf"], [3, "sq-action-item", "collapseBreakpoint"]], template: function BsActionMenu_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "ul");
        ɵɵtemplate(1, BsActionMenu_ng_container_1_Template, 2, 1, "ng-container", 0);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵclassMapInterpolate1("navbar-nav ", ctx.right ? "navbar-right" : "", "");
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.items)("ngForTrackBy", ctx.identify);
    } }, directives: [NgForOf, NgIf, BsActionItem], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsActionMenu, [{
        type: Component,
        args: [{
                selector: "sq-action-menu",
                templateUrl: "./action-menu.html",
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], null, { items: [{
            type: Input
        }], size: [{
            type: Input
        }], autoAdjust: [{
            type: Input
        }], autoAdjustBreakpoint: [{
            type: Input
        }], collapseBreakpoint: [{
            type: Input
        }], right: [{
            type: Input
        }] }); })();

class BsActionModule {
}
BsActionModule.ɵmod = ɵɵdefineNgModule({ type: BsActionModule });
BsActionModule.ɵinj = ɵɵdefineInjector({ factory: function BsActionModule_Factory(t) { return new (t || BsActionModule)(); }, imports: [[
            CommonModule,
            IntlModule,
            LoadComponentModule,
            UtilsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BsActionModule, { declarations: [BsActionButtons,
        BsActionItemContent,
        BsActionItem,
        BsActionMenu,
        BsDropdownMenu,
        BsDropdownDirective], imports: [CommonModule,
        IntlModule,
        LoadComponentModule,
        UtilsModule], exports: [BsActionButtons,
        BsActionMenu,
        BsActionItem,
        BsDropdownDirective] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsActionModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    IntlModule,
                    LoadComponentModule,
                    UtilsModule
                ],
                declarations: [
                    BsActionButtons,
                    BsActionItemContent,
                    BsActionItem,
                    BsActionMenu,
                    BsDropdownMenu,
                    BsDropdownDirective
                ],
                exports: [
                    BsActionButtons,
                    BsActionMenu,
                    BsActionItem,
                    BsDropdownDirective
                ]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { Action, BsActionButtons, BsActionItem, BsActionItemContent, BsActionMenu, BsActionModule, BsDropdownDirective, BsDropdownMenu, BsDropdownService, IAction, gAttachmentMap, gClassName, gSelector };
//# sourceMappingURL=sinequa-components-action.js.map
