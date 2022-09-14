import { ɵɵdirectiveInject, ElementRef, ɵɵdefineDirective, ɵɵNgOnChangesFeature, ɵsetClassMetadata, Directive, Input, EventEmitter, Output, TemplateRef, ViewContainerRef, ChangeDetectorRef, ɵɵhostProperty, ɵɵattribute, HostBinding, ɵɵcontentQuery, ɵɵqueryRefresh, ɵɵloadQuery, ɵɵlistener, ContentChildren, HostListener, InjectionToken, ɵɵinject, ɵɵdefineInjectable, Injectable, Inject, NgZone, ɵɵdefineComponent, ɵɵviewQuery, ɵɵprojectionDef, ɵɵelement, ɵɵelementStart, ɵɵprojection, ɵɵelementEnd, ɵɵproperty, ɵɵpureFunction1, ɵɵadvance, ɵɵpureFunction2, Component, ChangeDetectionStrategy, ViewChild, ɵɵtext, ɵɵtextInterpolate, ɵɵinjectPipeChangeDetectorRef, ɵɵdefinePipe, Pipe, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { Utils } from '@sinequa/core/base';
import { Subject, throwError } from 'rxjs';
import { map, switchMap, startWith } from 'rxjs/operators';
import { BreakPointRegistry, ɵMatchMedia } from '@angular/flex-layout';
import { FocusKeyManager, A11yModule } from '@angular/cdk/a11y';
import elementResizeDetectorMaker from 'element-resize-detector';
import { NotificationsService } from '@sinequa/core/notification';
import { Clipboard } from '@angular/cdk/clipboard';
import { NgStyle, CommonModule } from '@angular/common';
import { ComponentPortal } from '@angular/cdk/portal';
import { trigger, transition, style, animate } from '@angular/animations';
import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { AbstractIntlPipe, IntlService, IntlModule } from '@sinequa/core/intl';
import { Expr, FormatService } from '@sinequa/core/app-utils';
import moment from 'moment';

class Autofocus {
    constructor(elementRef) {
        this.element = elementRef.nativeElement;
    }
    setFocus() {
        Utils.delay()
            .then(() => {
            if (this.element.offsetWidth !== 0) {
                this.element.focus();
            }
        });
    }
    ngOnChanges() {
        this.setFocus();
    }
}
Autofocus.ɵfac = function Autofocus_Factory(t) { return new (t || Autofocus)(ɵɵdirectiveInject(ElementRef)); };
Autofocus.ɵdir = ɵɵdefineDirective({ type: Autofocus, selectors: [["", "sqAutofocus", ""]], inputs: { value: ["sqAutofocus", "value"] }, features: [ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(Autofocus, [{
        type: Directive,
        args: [{
                selector: "[sqAutofocus]"
            }]
    }], function () { return [{ type: ElementRef }]; }, { value: [{
            type: Input,
            args: ["sqAutofocus"]
        }] }); })();

class ClickOutside {
    constructor(elementRef) {
        this.clickOutside = new EventEmitter();
        this.clickHandler = (event) => {
            if (!event || !event.target) {
                return;
            }
            if (this.element.offsetWidth === 0) {
                return;
            }
            if (event.target === document.body && document.elementFromPoint(event.pageX, event.pageY) !== event.target) {
                return;
            }
            if (this.element.contains(event.target)) {
                return;
            }
            if (this.options.exclude) {
                let targetRoot = event.target;
                while (!!targetRoot.parentElement) {
                    targetRoot = targetRoot.parentElement;
                }
                for (const selector of this.options.exclude) {
                    const elts = Array.from(targetRoot.querySelectorAll(selector));
                    for (const elt of elts) {
                        if (elt && elt.contains(event.target)) {
                            return;
                        }
                    }
                }
            }
            // Call via timeout so we can check whether the click was leading to us taking focus
            // If we have the focus then we don't call clickOutside
            Utils.delay()
                .then(() => {
                if (!this.isActive(this.element)) {
                    this.clickOutside.emit({ click: event });
                }
            });
        };
        this.element = elementRef.nativeElement;
    }
    ngOnInit() {
        document.addEventListener("click", this.clickHandler);
        if (!this.options) {
            this.options = { exclude: ['.bs-datepicker'] }; // By default exclude bootstrap date picker
        }
    }
    ngOnDestroy() {
        document.removeEventListener("click", this.clickHandler);
    }
    isActive(element) {
        let active = document["activeElement"];
        while (active) {
            if (element === active) {
                return true;
            }
            active = active.parentElement;
        }
        return false;
    }
}
ClickOutside.ɵfac = function ClickOutside_Factory(t) { return new (t || ClickOutside)(ɵɵdirectiveInject(ElementRef)); };
ClickOutside.ɵdir = ɵɵdefineDirective({ type: ClickOutside, selectors: [["", "sqClickOutside", ""]], inputs: { options: ["sqClickOutside", "options"] }, outputs: { clickOutside: "sqClickOutside" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ClickOutside, [{
        type: Directive,
        args: [{
                selector: "[sqClickOutside]"
            }]
    }], function () { return [{ type: ElementRef }]; }, { options: [{
            type: Input,
            args: ["sqClickOutside"]
        }], clickOutside: [{
            type: Output,
            args: ["sqClickOutside"]
        }] }); })();

// Adapted from https://github.com/angular/flex-layout/issues/142#issuecomment-379465022
// Change ɵMatchMedia => MatchMedia when we move to angular 8
class MediaIf {
    constructor(template, viewContainer, breakpoints, matchMedia, changeDetectorRef) {
        this.template = template;
        this.viewContainer = viewContainer;
        this.breakpoints = breakpoints;
        this.matchMedia = matchMedia;
        this.changeDetectorRef = changeDetectorRef;
        this.hasView = false;
        this.matcher = new Subject();
        this.subscription = this.matcher
            .pipe(map(alias => {
            const breakpoint = this.breakpoints.findByAlias(alias);
            if (!breakpoint) {
                throwError(`breakpoint not found for ${alias}`);
                return "";
            }
            else {
                return breakpoint.mediaQuery;
            }
        }), switchMap(mq => {
            //console.log("MediaIf:", mq);
            return this.matchMedia.observe([mq], true)
                .pipe(map(result => {
                //console.log("MediaChange:", result);
                return result.matches;
            }), startWith(this.matchMedia.isActive(mq)));
        }))
            .subscribe(matches => matches ? this.createView() : this.destroyView());
    }
    set sqMediaIf(value) {
        this.matcher.next(value);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    createView() {
        if (!this.hasView) {
            this.viewContainer.createEmbeddedView(this.template);
            this.changeDetectorRef.markForCheck();
            this.hasView = true;
        }
    }
    destroyView() {
        if (this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}
MediaIf.ɵfac = function MediaIf_Factory(t) { return new (t || MediaIf)(ɵɵdirectiveInject(TemplateRef), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(BreakPointRegistry), ɵɵdirectiveInject(ɵMatchMedia), ɵɵdirectiveInject(ChangeDetectorRef)); };
MediaIf.ɵdir = ɵɵdefineDirective({ type: MediaIf, selectors: [["", "sqMediaIf", ""]], inputs: { sqMediaIf: "sqMediaIf" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(MediaIf, [{
        type: Directive,
        args: [{
                selector: "[sqMediaIf]",
            }]
    }], function () { return [{ type: TemplateRef }, { type: ViewContainerRef }, { type: BreakPointRegistry }, { type: ɵMatchMedia }, { type: ChangeDetectorRef }]; }, { sqMediaIf: [{
            type: Input
        }] }); })();

class ScrollIntoView {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnChanges() {
        if (this.options.active) {
            if (this.options.first) {
                this.elementRef.nativeElement.scrollIntoView(false);
            }
            else {
                this.elementRef.nativeElement.scrollIntoViewIfNeeded(false);
            }
        }
    }
}
ScrollIntoView.ɵfac = function ScrollIntoView_Factory(t) { return new (t || ScrollIntoView)(ɵɵdirectiveInject(ElementRef)); };
ScrollIntoView.ɵdir = ɵɵdefineDirective({ type: ScrollIntoView, selectors: [["", "sqScrollIntoView", ""]], inputs: { options: ["sqScrollIntoView", "options"] }, features: [ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ScrollIntoView, [{
        type: Directive,
        args: [{
                selector: "[sqScrollIntoView]"
            }]
    }], function () { return [{ type: ElementRef }]; }, { options: [{
            type: Input,
            args: ["sqScrollIntoView"]
        }] }); })();

class FocusKeyListItemDirective {
    constructor(element) {
        this.element = element;
        this.tabindex = -1;
        this.role = "list-item";
    }
    focus() {
        this.element.nativeElement.focus();
    }
}
FocusKeyListItemDirective.ɵfac = function FocusKeyListItemDirective_Factory(t) { return new (t || FocusKeyListItemDirective)(ɵɵdirectiveInject(ElementRef)); };
FocusKeyListItemDirective.ɵdir = ɵɵdefineDirective({ type: FocusKeyListItemDirective, selectors: [["", "sqFocusKeyListItem", ""]], hostVars: 2, hostBindings: function FocusKeyListItemDirective_HostBindings(rf, ctx) { if (rf & 2) {
        ɵɵhostProperty("tabindex", ctx.tabindex);
        ɵɵattribute("role", ctx.role);
    } } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(FocusKeyListItemDirective, [{
        type: Directive,
        args: [{
                selector: "[sqFocusKeyListItem]"
            }]
    }], function () { return [{ type: ElementRef }]; }, { tabindex: [{
            type: HostBinding
        }], role: [{
            type: HostBinding,
            args: ["attr.role"]
        }] }); })();

class FocusKeyListDirective {
    constructor() {
        this.activeItem = -1;
        this.withWrap = true;
        this.itemSelect = new EventEmitter();
        this.role = "list";
    }
    ngOnChanges() {
        if (this.keyManager) {
            this.keyManager.setActiveItem(this.activeItem);
        }
    }
    ngAfterContentInit() {
        this.keyManager = new FocusKeyManager(this.components);
        if (this.withWrap) {
            this.keyManager.withWrap();
        }
        if (this.activeItem >= 0 && this.components.length > 0) {
            Utils.delay().then(() => {
                this.keyManager.setActiveItem(this.activeItem);
            });
        }
    }
    onKeydown(event) {
        this.keyManager.onKeydown(event);
        this.itemSelect.emit(this.keyManager.activeItemIndex !== null ? this.keyManager.activeItemIndex : undefined);
    }
}
FocusKeyListDirective.ɵfac = function FocusKeyListDirective_Factory(t) { return new (t || FocusKeyListDirective)(); };
FocusKeyListDirective.ɵdir = ɵɵdefineDirective({ type: FocusKeyListDirective, selectors: [["", "sqFocusKeyList", ""]], contentQueries: function FocusKeyListDirective_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵɵcontentQuery(dirIndex, FocusKeyListItemDirective, false);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.components = _t);
    } }, hostVars: 1, hostBindings: function FocusKeyListDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("keydown", function FocusKeyListDirective_keydown_HostBindingHandler($event) { return ctx.onKeydown($event); });
    } if (rf & 2) {
        ɵɵattribute("role", ctx.role);
    } }, inputs: { activeItem: "activeItem", withWrap: "withWrap" }, outputs: { itemSelect: "itemSelect" }, features: [ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(FocusKeyListDirective, [{
        type: Directive,
        args: [{
                selector: "[sqFocusKeyList]"
            }]
    }], null, { activeItem: [{
            type: Input
        }], withWrap: [{
            type: Input
        }], itemSelect: [{
            type: Output
        }], role: [{
            type: HostBinding,
            args: ["attr.role"]
        }], components: [{
            type: ContentChildren,
            args: [FocusKeyListItemDirective]
        }], onKeydown: [{
            type: HostListener,
            args: ["keydown", ["$event"]]
        }] }); })();

const SCREEN_SIZE_RULES = new InjectionToken('SCREEN_SIZE_RULES');
class UIService {
    constructor(screenSizeRules, notificationsService, clipboard) {
        this.screenSizeRules = screenSizeRules;
        this.notificationsService = notificationsService;
        this.clipboard = clipboard;
        this._resizeEvent = new Subject();
        this._priorityResizeEvent = new Subject();
        this.factories = new Map();
        this.resizeEventListener = Utils.frame((event) => {
            this.setScreenSize();
            this._priorityResizeEvent.next(event);
            this._resizeEvent.next(event);
        });
        // See https://github.com/component/textarea-caret-position
        // We return a lineHeight value in addition
        this.textPositionProperties = [
            'direction',
            'boxSizing',
            'width',
            'height',
            'overflowX',
            'overflowY',
            'borderTopWidth',
            'borderRightWidth',
            'borderBottomWidth',
            'borderLeftWidth',
            'borderStyle',
            'paddingTop',
            'paddingRight',
            'paddingBottom',
            'paddingLeft',
            // https://developer.mozilla.org/en-US/docs/Web/CSS/font
            'fontStyle',
            'fontVariant',
            'fontWeight',
            'fontStretch',
            'fontSize',
            'fontSizeAdjust',
            'lineHeight',
            'fontFamily',
            'textAlign',
            'textTransform',
            'textIndent',
            'textDecoration',
            'letterSpacing',
            'wordSpacing',
            'tabSize',
            'MozTabSize'
        ];
        this.screenSizes = ["xs", "sm", "md", "lg", "xl", "xxl"]; // in ascending size order
        this.setScreenSize();
        window.addEventListener("resize", this.resizeEventListener);
        this.elementResizeDetector = elementResizeDetectorMaker({ strategy: "scroll" });
    }
    ngOnDestroy() {
        this._resizeEvent.complete();
        this._priorityResizeEvent.complete();
        window.removeEventListener("resize", this.resizeEventListener);
    }
    get resizeEvent() {
        return this._resizeEvent;
    }
    get priorityResizeEvent() {
        return this._priorityResizeEvent;
    }
    /*private setTitle(title: string) {
        document.title = this.intlService.formatMessage(title);
    }*/
    appInit(appComponentRef) {
        //this.setTitle();
        //Utils.subscribe(this.intlService.events,
        //    (value) => {
        //        this.setTitle();
        //    });
        // See https://github.com/angular/angular/issues/18817
        /*this.resizeEvent.subscribe(
            (event) => {
                appComponentRef.changeDetectorRef.markForCheck();
            });*/
        // this.loadComponent({component: DirtyChecker});
    }
    // legacy (was called from app.ts)
    addResizeListener(listener) {
        this._resizeEvent.subscribe(listener);
    }
    screenSizeIs(list) {
        //let rules = this.coreConfig.screenSizeRules;
        // validate that we're getting a string or array.
        if (!Utils.isString(list) && !Utils.isArray(list)) {
            throw new Error('screenSizeIs requires an array or comma-separated list');
        }
        // if it's a string, convert to array.
        if (Utils.isString(list)) {
            list = list.split(/\s*,\s*/);
        }
        return list.some((size) => window.matchMedia(this.screenSizeRules[size]).matches);
    }
    setScreenSize() {
        for (const size of this.screenSizes) {
            if (this.screenSizeIs(size)) {
                this.screenSize = size;
                return;
            }
        }
        throw new Error("UIService.setScreenSize - no matching screen size");
    }
    screenSizeIsEqual(screenSize) {
        return this.screenSize === screenSize;
    }
    screenSizeIsGreater(screenSize) {
        const index1 = this.screenSizes.findIndex((value) => value === this.screenSize);
        const index2 = this.screenSizes.findIndex((value) => value === screenSize);
        return index1 > index2;
    }
    screenSizeIsLess(screenSize) {
        const index1 = this.screenSizes.findIndex((value) => value === this.screenSize);
        const index2 = this.screenSizes.findIndex((value) => value === screenSize);
        return index1 < index2;
    }
    screenSizeIsGreaterOrEqual(screenSize) {
        if (screenSize === this.screenSize) {
            return true;
        }
        return this.screenSizeIsGreater(screenSize);
    }
    screenSizeIsLessOrEqual(screenSize) {
        if (screenSize === this.screenSize) {
            return true;
        }
        return this.screenSizeIsLess(screenSize);
    }
    _screenSizeTest(screenSize) {
        if (Utils.eqNCN(screenSize, "always", "true")) {
            return true;
        }
        if (Utils.eqNCN(screenSize, "never", "false")) {
            return false;
        }
        if (Utils.startsWith(screenSize, ">=")) {
            return this.screenSizeIsGreaterOrEqual(screenSize.slice(2));
        }
        if (Utils.startsWith(screenSize, ">")) {
            return this.screenSizeIsGreater(screenSize.slice(1));
        }
        if (Utils.startsWith(screenSize, "<=")) {
            return this.screenSizeIsLessOrEqual(screenSize.slice(2));
        }
        if (Utils.startsWith(screenSize, "<")) {
            return this.screenSizeIsLess(screenSize.slice(1));
        }
        if (Utils.startsWith(screenSize, "=")) {
            return this.screenSizeIsEqual(screenSize.slice(1));
        }
        return this.screenSizeIsEqual(screenSize);
    }
    // screenSizes is a sequence of size specs with optional operator separated by space or and (AND)
    // Multiple sequences can be specified using , or ; as a separator (these are OR'd)
    screenSizeTest(screenSizes) {
        if (!screenSizes) {
            return true;
        }
        const ors = Utils.split(screenSizes, [',', ';']);
        for (const or of ors) {
            const ands = Utils.split(or, " ");
            if (ands.length === 0) {
                continue;
            }
            let ok = true;
            for (const and of ands) {
                if (Utils.eqNC(and, "and")) { // space separated but you can use and if you want to
                    continue;
                }
                if (!this._screenSizeTest(and)) {
                    ok = false;
                    break;
                }
            }
            if (ok) {
                return true;
            }
        }
        return false;
    }
    getContentRect(element) {
        const rect = element.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(element);
        const borderLeft = parseFloat(computedStyle.borderLeft);
        const borderRight = parseFloat(computedStyle.borderRight);
        const borderTop = parseFloat(computedStyle.borderTop);
        const borderBottom = parseFloat(computedStyle.borderBottom);
        const paddingLeft = parseFloat(computedStyle.paddingLeft);
        const paddingRight = parseFloat(computedStyle.paddingRight);
        const paddingTop = parseFloat(computedStyle.paddingTop);
        const paddingBottom = parseFloat(computedStyle.paddingBottom);
        return {
            top: rect.top + borderTop + paddingTop,
            right: rect.right - borderRight - paddingRight,
            bottom: rect.bottom - borderBottom - paddingBottom,
            left: rect.left + borderLeft + paddingLeft,
            width: rect.width - borderLeft - paddingLeft - paddingRight - borderRight,
            height: rect.height - borderTop - paddingTop - paddingBottom - borderBottom
        };
    }
    // caret support
    getCaret(input) {
        return {
            start: input.selectionStart || 0,
            end: input.selectionEnd || 0
        };
    }
    setCaret(input, start, end = start, text, selectionAction = UIService.SelectionAction.collapse, ensureVisible = true, raiseEvent = true) {
        if (start < 0) {
            return;
        }
        if (Utils.isString(text)) {
            let value = input.value;
            if (end >= start) {
                value = value.slice(0, start) + text + value.slice(end);
            }
            else {
                value = value.slice(0, start) + text;
            }
            input.value = value;
            switch (selectionAction) {
                case UIService.SelectionAction.adjust:
                    end = start + text.length;
                    break;
                case UIService.SelectionAction.none:
                    break;
                case UIService.SelectionAction.collapseToStart:
                    end = start;
                    break;
                case UIService.SelectionAction.collapse:
                default:
                    end = start + text.length;
                    start = end;
                    break;
            }
        }
        if (end < 0) {
            end = start;
        }
        input.setSelectionRange(start, end);
        if (ensureVisible) {
            const rect = input.getBoundingClientRect();
            const contentRect = this.getContentRect(input);
            const textPos = this.getTextPosition(input, this.getCaret(input).end);
            let scrollLeft = input.scrollLeft;
            const minX = contentRect.left + scrollLeft;
            const maxX = contentRect.right + scrollLeft;
            const caretX = rect.left + textPos.left;
            if (caretX < minX || caretX > maxX) {
                scrollLeft = Math.max(caretX - contentRect.right + 1 /*for the caret*/, 0);
                input.scrollLeft = scrollLeft;
            }
        }
        if (raiseEvent) {
            const event = new CustomEvent("input");
            input.dispatchEvent(event);
        }
    }
    getTextPosition(element, position, options) {
        const debug = options && options.debug || false;
        if (debug) {
            const el = document.querySelector('#input-textarea-caret-position-mirror-div');
            if (el) {
                if (el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            }
        }
        // mirrored div
        const div = document.createElement('div');
        div.id = 'input-textarea-caret-position-mirror-div';
        document.body.appendChild(div);
        const style = div.style;
        const computed = !!window.getComputedStyle ? getComputedStyle(element) : element.currentStyle; // currentStyle for IE < 9
        // default textarea styles
        style.whiteSpace = 'pre-wrap';
        if (element.nodeName !== 'INPUT')
            style.wordWrap = 'break-word'; // only for textarea-s
        // position off-screen
        style.position = 'absolute'; // required to return coordinates properly
        if (!debug)
            style.visibility = 'hidden'; // not 'display: none' because we want rendering
        // transfer the element's properties to the div
        this.textPositionProperties.forEach(function (prop) {
            style[prop] = computed[prop];
        });
        if (!Utils.isUndefined(window.mozInnerScreenX)) {
            // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
            if (element.scrollHeight > parseInt(computed.height, 10))
                style.overflowY = 'scroll';
        }
        else {
            style.overflow = 'hidden'; // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
        }
        div.textContent = element.value.substring(0, position);
        // the second special handling for input type="text" vs textarea: spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
        if (element.nodeName === 'INPUT' && div.textContent) {
            div.textContent = div.textContent.replace(/\s/g, '\u00a0');
        }
        const span = document.createElement('span');
        // Wrapping must be replicated *exactly*, including when a long word gets
        // onto the next line, with whitespace at the end of the line before (#7).
        // The  *only* reliable way to do that is to copy the *entire* rest of the
        // textarea's content into the <span> created at the caret position.
        // for inputs, just '.' would be enough, but why bother?
        div.appendChild(span);
        // return lineHeight too
        span.textContent = '.';
        const lineHeight = span.offsetHeight;
        span.textContent = element.value.substring(position) || '.'; // || because a completely empty faux span doesn't render at all
        const coordinates = {
            top: span.offsetTop + parseInt(computed['borderTopWidth'], 10),
            left: span.offsetLeft + parseInt(computed['borderLeftWidth'], 10),
            lineHeight: lineHeight
        };
        if (debug) {
            span.style.backgroundColor = '#aaa';
        }
        else {
            document.body.removeChild(div);
        }
        return coordinates;
    }
    getViewport() {
        return document.body.getBoundingClientRect();
    }
    addElementResizeListener(element, listener) {
        this.elementResizeDetector.listenTo(element, listener);
    }
    removeElementResizeListener(element, listener) {
        this.elementResizeDetector.removeListener(element, listener);
    }
    copyToClipboard(data, maxLength = 30) {
        if (!(navigator === null || navigator === void 0 ? void 0 : navigator.clipboard)) {
            // Note: CDK seems to struggle with large chunks of text
            this.copyToClipboardCdk(data, maxLength);
        }
        else {
            // Navigator built-in clipboard management
            navigator.clipboard.writeText(data).then(() => {
                this.notificationsService.success("msg#clipboard.success", { data: "\"" + (data.length > maxLength ? (data.slice(0, maxLength) + "...") : data) + "\"" });
            }, err => {
                this.notificationsService.warning("msg#clipboard.error");
            });
        }
    }
    copyToClipboardCdk(data, maxLength = 30) {
        const pending = this.clipboard.beginCopy(data);
        let remainingAttempts = 3;
        const attempt = () => {
            const result = pending.copy();
            if (!result && --remainingAttempts) {
                setTimeout(attempt);
            }
            else {
                // Remember to destroy when you're done!
                pending.destroy();
                if (result) {
                    this.notificationsService.success("msg#clipboard.success", { data: "\"" + (data.length > maxLength ? (data.slice(0, maxLength) + "...") : data) + "\"" });
                }
                else {
                    this.notificationsService.warning("msg#clipboard.error");
                }
            }
        };
        attempt();
    }
}
UIService.ɵfac = function UIService_Factory(t) { return new (t || UIService)(ɵɵinject(SCREEN_SIZE_RULES), ɵɵinject(NotificationsService), ɵɵinject(Clipboard)); };
UIService.ɵprov = ɵɵdefineInjectable({ token: UIService, factory: UIService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(UIService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [SCREEN_SIZE_RULES]
            }] }, { type: NotificationsService }, { type: Clipboard }]; }, null); })();
(function (UIService) {
    let SelectionAction;
    (function (SelectionAction) {
        SelectionAction[SelectionAction["adjust"] = 0] = "adjust";
        SelectionAction[SelectionAction["none"] = 1] = "none";
        SelectionAction[SelectionAction["collapseToStart"] = 2] = "collapseToStart";
        SelectionAction[SelectionAction["collapse"] = 3] = "collapse";
    })(SelectionAction = UIService.SelectionAction || (UIService.SelectionAction = {}));
})(UIService || (UIService = {}));

class ResizeEventDirective {
    constructor(elementRef, zone, uiService) {
        this.elementRef = elementRef;
        this.zone = zone;
        this.uiService = uiService;
        this.resizeEvent = new EventEmitter();
        this.raiseEvent = () => {
            const contentRect = this.elementRef.nativeElement.getBoundingClientRect();
            this.resizeEvent.emit(contentRect);
        };
    }
    ngAfterViewInit() {
        if (window.ResizeObserver) {
            this.resizeObserver = new window.ResizeObserver((entries) => {
                this.zone.run(() => {
                    const contentRect = ((entries === null || entries === void 0 ? void 0 : entries.length) === 1 && entries[0].contentRect);
                    this.resizeEvent.emit(contentRect);
                });
            });
            this.resizeObserver.observe(this.elementRef.nativeElement);
        }
        else {
            this.uiService.addElementResizeListener(this.elementRef.nativeElement, this.raiseEvent);
        }
    }
    ngOnDestroy() {
        if (window.ResizeObserver) {
            this.resizeObserver.unobserve(this.elementRef.nativeElement);
        }
        else {
            this.uiService.removeElementResizeListener(this.elementRef.nativeElement, this.raiseEvent);
        }
    }
}
ResizeEventDirective.ɵfac = function ResizeEventDirective_Factory(t) { return new (t || ResizeEventDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(UIService)); };
ResizeEventDirective.ɵdir = ɵɵdefineDirective({ type: ResizeEventDirective, selectors: [["", "sqResize", ""]], outputs: { resizeEvent: "sqResize" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ResizeEventDirective, [{
        type: Directive,
        args: [{
                selector: "[sqResize]"
            }]
    }], function () { return [{ type: ElementRef }, { type: NgZone }, { type: UIService }]; }, { resizeEvent: [{
            type: Output,
            args: ["sqResize"]
        }] }); })();

const _c0 = ["container"];
const _c1 = ["sqSticky", ""];
const _c2 = function (a0) { return { "margin-top.px": a0 }; };
const _c3 = function (a0, a1) { return { "top.px": a0, "bottom.px": a1 }; };
const _c4 = ["*"];
class StickyComponent {
    constructor(ui, cdRef) {
        this.ui = ui;
        this.cdRef = cdRef;
        this.marginTop = 0;
        this.postScrollUp = Utils.debounce(() => {
            this.onScroll(true);
        }, 250);
    }
    onScroll(forceScrollDown = false) {
        const scrollDelta = window.pageYOffset - this.scrollY;
        this.scrollY = window.pageYOffset;
        const offsets = this.offsets || { top: 0, bottom: 0 };
        const componentHeight = this.container.nativeElement.getBoundingClientRect().height;
        // Scrolling down (OR top of page OR forced after a scroll up OR component height small than screen height)
        if (scrollDelta >= 0 || this.scrollY === 0 || forceScrollDown || componentHeight + offsets.top + offsets.bottom < window.innerHeight) {
            this.marginTop = Math.min(this.scrollY, this.marginTop);
            this.bottom = undefined;
            this.top = Math.min(window.innerHeight - componentHeight - offsets.bottom, offsets.top);
        }
        // Scrolling up
        else {
            this.marginTop = Math.max(this.scrollY + window.innerHeight - componentHeight - offsets.bottom - offsets.top, this.marginTop);
            this.bottom = window.innerHeight - offsets.top - componentHeight;
            this.top = undefined;
            if (this.scrollY <= this.marginTop) {
                this.postScrollUp();
            }
        }
        this.cdRef.markForCheck();
    }
    ngOnInit() {
        var _a;
        if (CSS.supports("position", "sticky") || CSS.supports("position", "-webkit-sticky")) {
            this.scrollY = window.pageYOffset;
            this.top = (((_a = this.offsets) === null || _a === void 0 ? void 0 : _a.top) || 0);
        }
    }
    ngAfterViewInit() {
        // position: sticky is not supported in Internet Explorer. A workaround could be to rely on position: relative and position: fixed, with additional logic.
        if (CSS.supports("position", "sticky") || CSS.supports("position", "-webkit-sticky")) {
            this.listener = () => this.onScroll();
            window.addEventListener('scroll', this.listener);
            window.addEventListener('resize', this.listener);
            this.ui.addElementResizeListener(this.container.nativeElement, this.listener);
        }
    }
    ngOnDestroy() {
        if (this.listener) {
            window.removeEventListener('scroll', this.listener);
            window.removeEventListener('resize', this.listener);
            this.ui.removeElementResizeListener(this.container.nativeElement, this.listener);
        }
    }
}
StickyComponent.ɵfac = function StickyComponent_Factory(t) { return new (t || StickyComponent)(ɵɵdirectiveInject(UIService), ɵɵdirectiveInject(ChangeDetectorRef)); };
StickyComponent.ɵcmp = ɵɵdefineComponent({ type: StickyComponent, selectors: [["", "sqSticky", ""]], viewQuery: function StickyComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.container = _t.first);
    } }, inputs: { offsets: ["sqSticky", "offsets"] }, attrs: _c1, ngContentSelectors: _c4, decls: 4, vars: 7, consts: [[3, "ngStyle"], [1, "sticky-container", 3, "ngStyle"], ["container", ""]], template: function StickyComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelement(0, "div", 0);
        ɵɵelementStart(1, "div", 1, 2);
        ɵɵprojection(3);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("ngStyle", ɵɵpureFunction1(2, _c2, ctx.marginTop));
        ɵɵadvance(1);
        ɵɵproperty("ngStyle", ɵɵpureFunction2(4, _c3, ctx.top, ctx.bottom));
    } }, directives: [NgStyle], styles: [".sticky-container[_ngcontent-%COMP%] {\n    position: sticky;\n    position: -webkit-sticky;\n}"], changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(StickyComponent, [{
        type: Component,
        args: [{
                selector: '[sqSticky]',
                template: `
<div [ngStyle]="{'margin-top.px': marginTop}"></div>
<div #container class="sticky-container" [ngStyle]="{'top.px': top, 'bottom.px': bottom}">
    <ng-content></ng-content>
</div>
`,
                styles: [`
.sticky-container {
    position: sticky;
    position: -webkit-sticky;
}
    `],
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: UIService }, { type: ChangeDetectorRef }]; }, { offsets: [{
            type: Input,
            args: ["sqSticky"]
        }], container: [{
            type: ViewChild,
            args: ["container"]
        }] }); })();

class TooltipComponent {
    constructor() {
        this.text = '';
    }
}
TooltipComponent.ɵfac = function TooltipComponent_Factory(t) { return new (t || TooltipComponent)(); };
TooltipComponent.ɵcmp = ɵɵdefineComponent({ type: TooltipComponent, selectors: [["sqx-tooltip"]], inputs: { text: "text" }, decls: 2, vars: 2, consts: [[1, "sq-tooltip"]], template: function TooltipComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtext(1);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("@tooltip", undefined);
        ɵɵadvance(1);
        ɵɵtextInterpolate(ctx.text);
    } }, styles: ["[_nghost-%COMP%]{display:block}[_nghost-%COMP%]   .sq-tooltip[_ngcontent-%COMP%]{background-color:#494949;border-radius:4px;color:#fff;font-size:14px;max-width:280px;padding:.5rem 1rem}.dark[_nghost-%COMP%]   .sq-tooltip[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .sq-tooltip[_ngcontent-%COMP%]{background-color:#f0f0f0;color:#606060}"], data: { animation: [
            trigger('tooltip', [
                transition(':enter', [
                    style({ opacity: 0 }),
                    animate(300, style({ opacity: 1 })),
                ]),
                transition(':leave', [
                    animate(300, style({ opacity: 0 })),
                ]),
            ]),
        ] }, changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(TooltipComponent, [{
        type: Component,
        args: [{
                selector: 'sqx-tooltip',
                styleUrls: ['./tooltip.component.css'],
                template: `<div class="sq-tooltip" @tooltip>{{ text }}</div>`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('tooltip', [
                        transition(':enter', [
                            style({ opacity: 0 }),
                            animate(300, style({ opacity: 1 })),
                        ]),
                        transition(':leave', [
                            animate(300, style({ opacity: 0 })),
                        ]),
                    ]),
                ],
            }]
    }], null, { text: [{
            type: Input
        }] }); })();

class TooltipDirective {
    constructor(overlay, overlayPositionBuilder, elementRef) {
        this.overlay = overlay;
        this.overlayPositionBuilder = overlayPositionBuilder;
        this.elementRef = elementRef;
        this.text = "";
        this.placement = "bottom";
        this.delay = 300;
    }
    ngOnDestroy() {
        if (this.overlayRef) {
            this.overlayRef.detach();
        }
    }
    show(event) {
        event.preventDefault();
        event.stopPropagation();
        this.clearTimer();
        this.timeoutId = setTimeout(() => {
            if (this.overlayRef) {
                this.overlayRef.detach();
            }
            if (this.text.trim().length === 0) {
                return;
            }
            const positionStrategy = this.overlayPositionBuilder
                .flexibleConnectedTo(this.elementRef)
                .withPositions([this.position()]);
            const scrollStrategy = this.overlay.scrollStrategies.close();
            this.overlayRef = this.overlay.create({ positionStrategy, scrollStrategy });
            const tooltipRef = this.overlayRef.attach(new ComponentPortal(TooltipComponent));
            tooltipRef.instance.text = this.text;
        }, this.delay);
    }
    mouseClick(event) {
        event.preventDefault();
        event.stopPropagation();
        this.clearTimer();
    }
    hide() {
        this.clearTimer();
    }
    position() {
        switch (this.placement) {
            case "bottom":
                return {
                    originX: "center",
                    originY: "bottom",
                    overlayX: "center",
                    overlayY: "top",
                    offsetY: 8
                };
            case "right":
                return {
                    originX: "end",
                    originY: "center",
                    overlayX: "start",
                    overlayY: "center",
                    offsetX: 8
                };
            case "left":
                return {
                    originX: "start",
                    originY: "center",
                    overlayX: "end",
                    overlayY: "center",
                    offsetX: -8
                };
            default:
                return {
                    originX: "center",
                    originY: "top",
                    overlayX: "center",
                    overlayY: "bottom",
                    offsetY: -8
                };
        }
    }
    clearTimer() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        if (this.overlayRef) {
            this.overlayRef.detach();
        }
    }
}
TooltipDirective.ɵfac = function TooltipDirective_Factory(t) { return new (t || TooltipDirective)(ɵɵdirectiveInject(Overlay), ɵɵdirectiveInject(OverlayPositionBuilder), ɵɵdirectiveInject(ElementRef)); };
TooltipDirective.ɵdir = ɵɵdefineDirective({ type: TooltipDirective, selectors: [["", "sqTooltip", ""]], hostBindings: function TooltipDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("mouseenter", function TooltipDirective_mouseenter_HostBindingHandler($event) { return ctx.show($event); })("mousedown", function TooltipDirective_mousedown_HostBindingHandler($event) { return ctx.mouseClick($event); })("mouseleave", function TooltipDirective_mouseleave_HostBindingHandler() { return ctx.hide(); });
    } }, inputs: { text: ["sqTooltip", "text"], placement: "placement", delay: "delay" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(TooltipDirective, [{
        type: Directive,
        args: [{ selector: "[sqTooltip]" }]
    }], function () { return [{ type: Overlay }, { type: OverlayPositionBuilder }, { type: ElementRef }]; }, { text: [{
            type: Input,
            args: ["sqTooltip"]
        }], placement: [{
            type: Input
        }], delay: [{
            type: Input
        }], show: [{
            type: HostListener,
            args: ["mouseenter", ['$event']]
        }], mouseClick: [{
            type: HostListener,
            args: ["mousedown", ['$event']]
        }], hide: [{
            type: HostListener,
            args: ["mouseleave"]
        }] }); })();

class DatePipe extends AbstractIntlPipe {
    constructor(intlService, changeDetectorRef) {
        super(intlService, changeDetectorRef);
    }
    updateValue(key, params) {
        super.updateValue(key, params);
        this.value = this.intlService.formatDate(key, params);
    }
}
DatePipe.ɵfac = function DatePipe_Factory(t) { return new (t || DatePipe)(ɵɵdirectiveInject(IntlService), ɵɵinjectPipeChangeDetectorRef()); };
DatePipe.ɵpipe = ɵɵdefinePipe({ name: "sqDate", type: DatePipe, pure: false });
/*@__PURE__*/ (function () { ɵsetClassMetadata(DatePipe, [{
        type: Pipe,
        args: [{ name: "sqDate", pure: false }]
    }], function () { return [{ type: IntlService }, { type: ChangeDetectorRef }]; }, null); })();

class ExprPipe extends AbstractIntlPipe {
    constructor(intlService, changeDetectorRef) {
        super(intlService, changeDetectorRef);
    }
    updateValue(key, params) {
        super.updateValue(key, params);
        if (key instanceof Expr) {
            const message = key.toMessage(params);
            this.value = this.intlService.formatMessage(message.message, message.values);
        }
        else {
            this.value = this.intlService.formatMessage(key);
            if (params && params.asHTML) {
                this.value = Utils.encodeHTML(this.value);
            }
        }
    }
}
ExprPipe.ɵfac = function ExprPipe_Factory(t) { return new (t || ExprPipe)(ɵɵdirectiveInject(IntlService), ɵɵinjectPipeChangeDetectorRef()); };
ExprPipe.ɵpipe = ɵɵdefinePipe({ name: "sqExpr", type: ExprPipe, pure: false });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ExprPipe, [{
        type: Pipe,
        args: [{ name: "sqExpr", pure: false }]
    }], function () { return [{ type: IntlService }, { type: ChangeDetectorRef }]; }, null); })();

/**
 * A pipe to transform a number into a readable internationalized memory size label,
 * for example "126432" into "126 kB".
 *
 * @example
 * <span>Size:</span><span>{{ documentSize | sqMemorySize }}</span>
 */
class MemorySizePipe extends AbstractIntlPipe {
    constructor(formatService, intlService, changeDetectorRef) {
        super(intlService, changeDetectorRef);
        this.formatService = formatService;
    }
    updateValue(key) {
        super.updateValue(key);
        this.value = this.formatService.formatMemorySize(key);
    }
}
MemorySizePipe.ɵfac = function MemorySizePipe_Factory(t) { return new (t || MemorySizePipe)(ɵɵdirectiveInject(FormatService), ɵɵdirectiveInject(IntlService), ɵɵinjectPipeChangeDetectorRef()); };
MemorySizePipe.ɵpipe = ɵɵdefinePipe({ name: "sqMemorySize", type: MemorySizePipe, pure: false });
/*@__PURE__*/ (function () { ɵsetClassMetadata(MemorySizePipe, [{
        type: Pipe,
        args: [{ name: "sqMemorySize", pure: false }]
    }], function () { return [{ type: FormatService }, { type: IntlService }, { type: ChangeDetectorRef }]; }, null); })();

class MomentPipe extends AbstractIntlPipe {
    constructor(intlService, changeDetectorRef) {
        super(intlService, changeDetectorRef);
    }
    updateValue(key, params = {}) {
        super.updateValue(key, params);
        const m = moment(key);
        if (params.format) {
            this.value = m.format(params.format);
        }
        else {
            switch (params.type) {
                case "fromNow":
                    this.value = m.fromNow(params.suffix);
                    break;
                case "from":
                    this.value = m.from(params.reference, params.suffix);
                    break;
                case "toNow":
                    this.value = m.toNow(params.suffix);
                    break;
                case "to":
                    this.value = m.to(params.reference, params.suffix);
                    break;
                case "calendar":
                    this.value = m.calendar(params.reference);
                    break;
                case "diff":
                    this.value = "" + m.diff(params.reference, params.unit, params.precise);
                    break;
                case "valueOf":
                    this.value = "" + m.valueOf();
                    break;
                case "unix":
                    this.value = "" + m.unix();
                    break;
                case "daysInMonth":
                    this.value = "" + m.daysInMonth();
                    break;
                case "iso":
                    this.value = m.toISOString();
                    break;
            }
        }
    }
}
MomentPipe.ɵfac = function MomentPipe_Factory(t) { return new (t || MomentPipe)(ɵɵdirectiveInject(IntlService), ɵɵinjectPipeChangeDetectorRef()); };
MomentPipe.ɵpipe = ɵɵdefinePipe({ name: "sqMoment", type: MomentPipe, pure: false });
/*@__PURE__*/ (function () { ɵsetClassMetadata(MomentPipe, [{
        type: Pipe,
        args: [{ name: "sqMoment", pure: false }]
    }], function () { return [{ type: IntlService }, { type: ChangeDetectorRef }]; }, null); })();

class NumberPipe extends AbstractIntlPipe {
    constructor(intlService, changeDetectorRef) {
        super(intlService, changeDetectorRef);
    }
    updateValue(key, params) {
        super.updateValue(key, params);
        this.value = typeof key === "number" ? this.intlService.formatNumber(key, params) : key;
    }
}
NumberPipe.ɵfac = function NumberPipe_Factory(t) { return new (t || NumberPipe)(ɵɵdirectiveInject(IntlService), ɵɵinjectPipeChangeDetectorRef()); };
NumberPipe.ɵpipe = ɵɵdefinePipe({ name: "sqNumber", type: NumberPipe, pure: false });
/*@__PURE__*/ (function () { ɵsetClassMetadata(NumberPipe, [{
        type: Pipe,
        args: [{ name: "sqNumber", pure: false }]
    }], function () { return [{ type: IntlService }, { type: ChangeDetectorRef }]; }, null); })();

class RelativeTimePipe extends AbstractIntlPipe {
    constructor(intlService, changeDetectorRef) {
        super(intlService, changeDetectorRef);
    }
    updateValue(key, params) {
        super.updateValue(key, params);
        this.value = this.intlService.formatRelativeTime(key, params ? params.unit : undefined, params);
    }
}
RelativeTimePipe.ɵfac = function RelativeTimePipe_Factory(t) { return new (t || RelativeTimePipe)(ɵɵdirectiveInject(IntlService), ɵɵinjectPipeChangeDetectorRef()); };
RelativeTimePipe.ɵpipe = ɵɵdefinePipe({ name: "sqRelativeTime", type: RelativeTimePipe, pure: false });
/*@__PURE__*/ (function () { ɵsetClassMetadata(RelativeTimePipe, [{
        type: Pipe,
        args: [{ name: "sqRelativeTime", pure: false }]
    }], function () { return [{ type: IntlService }, { type: ChangeDetectorRef }]; }, null); })();

class TimePipe extends AbstractIntlPipe {
    constructor(intlService, changeDetectorRef) {
        super(intlService, changeDetectorRef);
    }
    updateValue(key, params) {
        super.updateValue(key, params);
        this.value = this.intlService.formatTime(key, params);
    }
}
TimePipe.ɵfac = function TimePipe_Factory(t) { return new (t || TimePipe)(ɵɵdirectiveInject(IntlService), ɵɵinjectPipeChangeDetectorRef()); };
TimePipe.ɵpipe = ɵɵdefinePipe({ name: "sqTime", type: TimePipe, pure: false });
/*@__PURE__*/ (function () { ɵsetClassMetadata(TimePipe, [{
        type: Pipe,
        args: [{ name: "sqTime", pure: false }]
    }], function () { return [{ type: IntlService }, { type: ChangeDetectorRef }]; }, null); })();

class ValuePipe extends AbstractIntlPipe {
    constructor(formatService, intlService, changeDetectorRef) {
        super(intlService, changeDetectorRef);
        this.formatService = formatService;
    }
    updateValue(key, params) {
        super.updateValue(key, params);
        this.value = this.formatService.formatFieldValue(key, params);
        this.value = Utils.replace(this.value, /;/g, "$&\u200B");
    }
}
ValuePipe.ɵfac = function ValuePipe_Factory(t) { return new (t || ValuePipe)(ɵɵdirectiveInject(FormatService), ɵɵdirectiveInject(IntlService), ɵɵinjectPipeChangeDetectorRef()); };
ValuePipe.ɵpipe = ɵɵdefinePipe({ name: "sqValue", type: ValuePipe, pure: false });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ValuePipe, [{
        type: Pipe,
        args: [{ name: "sqValue", pure: false }]
    }], function () { return [{ type: FormatService }, { type: IntlService }, { type: ChangeDetectorRef }]; }, null); })();

const defaultScreenSizeRules = {
    xxl: "(min-width: 1920px)",
    xl: "(min-width: 1200px) and (max-width: 1919.98px)",
    lg: "(min-width: 992px) and (max-width: 1199.98px)",
    md: "(min-width: 768px) and (max-width: 991.98px)",
    sm: "(min-width: 576px) and (max-width: 767.98px)",
    xs: "(max-width: 575.98px)",
};
class UtilsModule {
}
UtilsModule.ɵmod = ɵɵdefineNgModule({ type: UtilsModule });
UtilsModule.ɵinj = ɵɵdefineInjector({ factory: function UtilsModule_Factory(t) { return new (t || UtilsModule)(); }, providers: [
        {
            provide: SCREEN_SIZE_RULES,
            useValue: defaultScreenSizeRules
        }
    ], imports: [[
            CommonModule,
            A11yModule,
            IntlModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(UtilsModule, { declarations: [DatePipe, ExprPipe, MemorySizePipe, MomentPipe, NumberPipe, RelativeTimePipe, TimePipe, ValuePipe,
        Autofocus, ClickOutside, MediaIf, ScrollIntoView, FocusKeyListDirective, FocusKeyListItemDirective,
        ResizeEventDirective, StickyComponent, TooltipComponent, TooltipDirective], imports: [CommonModule,
        A11yModule,
        IntlModule], exports: [DatePipe, ExprPipe, MemorySizePipe, MomentPipe, NumberPipe, RelativeTimePipe, TimePipe, ValuePipe,
        Autofocus, ClickOutside, MediaIf, ScrollIntoView, FocusKeyListDirective, FocusKeyListItemDirective,
        ResizeEventDirective, StickyComponent, TooltipComponent, TooltipDirective] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(UtilsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    A11yModule,
                    IntlModule
                ],
                declarations: [
                    DatePipe, ExprPipe, MemorySizePipe, MomentPipe, NumberPipe, RelativeTimePipe, TimePipe, ValuePipe,
                    Autofocus, ClickOutside, MediaIf, ScrollIntoView, FocusKeyListDirective, FocusKeyListItemDirective,
                    ResizeEventDirective, StickyComponent, TooltipComponent, TooltipDirective
                ],
                exports: [
                    DatePipe, ExprPipe, MemorySizePipe, MomentPipe, NumberPipe, RelativeTimePipe, TimePipe, ValuePipe,
                    Autofocus, ClickOutside, MediaIf, ScrollIntoView, FocusKeyListDirective, FocusKeyListItemDirective,
                    ResizeEventDirective, StickyComponent, TooltipComponent, TooltipDirective
                ],
                providers: [
                    {
                        provide: SCREEN_SIZE_RULES,
                        useValue: defaultScreenSizeRules
                    }
                ]
            }]
    }], null, null); })();

class VoiceRecognitionService {
    constructor(intlService, notify) {
        this.intlService = intlService;
        this.notify = notify;
        this.recognizing = false;
        this.ignore_onend = false;
        this.text = new Subject();
        this.started = new Subject();
        this.available = false;
        this.onResult = e => {
            const transcript = Array.from(e.results)
                .map((result) => result[0])
                .map(result => result.transcript)
                .join("");
            this.text.next(transcript);
        };
        this.onStart = event => {
            this.recognizing = true;
            this.start_timestamp = event.timeStamp;
        };
        this.onEnd = () => {
            if (this.ignore_onend) {
                return;
            }
            this.recognizing = false;
            this.started.next(false);
        };
        this.onError = event => {
            let message = event.error;
            switch (event.error) {
                case "no-speech": {
                    message = "No speech was detected.";
                    break;
                }
                case "audio-capture": {
                    message = "Audio capture failed.";
                    break;
                }
                case "not-allowed": {
                    if (event.timeStamp - this.start_timestamp < 100) {
                        message = "info_blocked";
                    }
                    else {
                        message = "The user agent is not allowing any speech input to occur for reasons of security, privacy or user preference.";
                    }
                    break;
                }
                case "aborted":
                    {
                        message = "Speech input was aborted somehow, maybe by some user-agent-specific behavior such as UI that lets the user cancel speech input.";
                        break;
                    }
                    ;
                case "network": {
                    message = "Some network communication that was required to complete the recognition failed.";
                    break;
                }
                case "service-not-allowed": {
                    message = "The user agent is not allowing the web application requested speech service, but would allow some speech service, to be used either because the user agent doesn’t support the selected one or because of reasons of security, privacy or user preference.";
                    break;
                }
                case "bad-grammar": {
                    message = "There was an error in the speech recognition grammar or semantic tags, or the grammar format or semantic tag format is unsupported.";
                    break;
                }
                case "language-not-supported": {
                    message = `The language [${this.recognition.lang}] was not supported.`;
                    this.recognition.lang = "en-US";
                    break;
                }
            }
            this.notify.warning(message);
            this.ignore_onend = true;
            this.started.next(false);
        };
    }
    init() {
        var _a;
        this.intlService.events.subscribe(() => {
            var _a;
            this.recognition.lang = (_a = this.intlService.currentLocale.data) === null || _a === void 0 ? void 0 : _a.intl.locale;
        });
        try {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.recognition.lang = (_a = this.intlService.currentLocale.data) === null || _a === void 0 ? void 0 : _a.intl.locale;
            this.recognition.addEventListener("error", this.onError);
            this.recognition.addEventListener("result", this.onResult);
            this.recognition.addEventListener("start", this.onStart);
            this.recognition.addEventListener("end", this.onEnd);
            this.available = true;
        }
        catch (error) {
            this.available = false;
        }
    }
    ngOnDestroy() {
        this.recognition.removeEventListener("error", this.onError);
        this.recognition.removeEventListener("result", this.onResult);
        this.recognition.removeEventListener("start", this.onStart);
        this.recognition.removeEventListener("end", this.onEnd);
    }
    start() {
        if (this.recognizing) {
            this.stop();
            return;
        }
        this.text.next("");
        this.started.next(true);
        this.recognition.start();
    }
    stop() {
        this.recognition.stop();
        this.started.next(false);
    }
    toggleRecognition() {
        if (this.recognizing) {
            this.stop();
        }
        else {
            this.start();
        }
    }
}
VoiceRecognitionService.ɵfac = function VoiceRecognitionService_Factory(t) { return new (t || VoiceRecognitionService)(ɵɵinject(IntlService), ɵɵinject(NotificationsService)); };
VoiceRecognitionService.ɵprov = ɵɵdefineInjectable({ token: VoiceRecognitionService, factory: VoiceRecognitionService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(VoiceRecognitionService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: IntlService }, { type: NotificationsService }]; }, null); })();

var _enUtils = {
    "clipboard": {
        "success": "{data} copied to the clipboard",
        "error": "Clipboard error"
    }
};

var _frUtils = {
    "clipboard": {
        "success": "{data} copié dans le presse-papiers",
        "error": "Erreur du presse-papiers"
    }
};

var _deUtils = {
    "clipboard": {
        "success": "{data} in die Zwischenablage kopiert",
        "error": "Zwischenablagefehler"
    }
};

const enUtils = Utils.merge({}, _enUtils);
const frUtils = Utils.merge({}, _frUtils);
const deUtils = Utils.merge({}, _deUtils);

/**
 * Generated bundle index. Do not edit.
 */

export { Autofocus, ClickOutside, DatePipe, ExprPipe, FocusKeyListDirective, FocusKeyListItemDirective, MediaIf, MemorySizePipe, MomentPipe, NumberPipe, RelativeTimePipe, ResizeEventDirective, SCREEN_SIZE_RULES, ScrollIntoView, StickyComponent, TimePipe, TooltipComponent, TooltipDirective, UIService, UtilsModule, ValuePipe, VoiceRecognitionService, deUtils, defaultScreenSizeRules, enUtils, frUtils };
//# sourceMappingURL=sinequa-components-utils.js.map
