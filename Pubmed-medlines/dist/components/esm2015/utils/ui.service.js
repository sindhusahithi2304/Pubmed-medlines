import { Injectable, Inject, InjectionToken } from "@angular/core";
import { Subject } from "rxjs";
import { Utils } from "@sinequa/core/base";
import elementResizeDetectorMaker from "element-resize-detector";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/notification";
import * as i2 from "@angular/cdk/clipboard";
export const SCREEN_SIZE_RULES = new InjectionToken('SCREEN_SIZE_RULES');
export class UIService {
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
UIService.ɵfac = function UIService_Factory(t) { return new (t || UIService)(i0.ɵɵinject(SCREEN_SIZE_RULES), i0.ɵɵinject(i1.NotificationsService), i0.ɵɵinject(i2.Clipboard)); };
UIService.ɵprov = i0.ɵɵdefineInjectable({ token: UIService, factory: UIService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(UIService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [SCREEN_SIZE_RULES]
            }] }, { type: i1.NotificationsService }, { type: i2.Clipboard }]; }, null); })();
(function (UIService) {
    let SelectionAction;
    (function (SelectionAction) {
        SelectionAction[SelectionAction["adjust"] = 0] = "adjust";
        SelectionAction[SelectionAction["none"] = 1] = "none";
        SelectionAction[SelectionAction["collapseToStart"] = 2] = "collapseToStart";
        SelectionAction[SelectionAction["collapse"] = 3] = "collapse";
    })(SelectionAction = UIService.SelectionAction || (UIService.SelectionAction = {}));
})(UIService || (UIService = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3V0aWxzLyIsInNvdXJjZXMiOlsidWkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQWtELE1BQU0sZUFBZSxDQUFDO0FBQ2xILE9BQU8sRUFBQyxPQUFPLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFDLEtBQUssRUFBUSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sMEJBQTBCLE1BQU0seUJBQXlCLENBQUM7Ozs7QUFTakUsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQWdCLG1CQUFtQixDQUFDLENBQUM7QUFLeEYsTUFBTSxPQUFPLFNBQVM7SUFRbEIsWUFDc0MsZUFBOEIsRUFDekQsb0JBQTBDLEVBQzFDLFNBQW9CO1FBRk8sb0JBQWUsR0FBZixlQUFlLENBQWU7UUFDekQseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBVi9CLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQUN0Qyx5QkFBb0IsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO1FBSTlDLGNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBb0MsQ0FBQztRQWM5Qyx3QkFBbUIsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBYyxFQUFFLEVBQUU7WUFDM0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUF3T0gsMkRBQTJEO1FBQzNELDJDQUEyQztRQUNuQywyQkFB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LENBQUMsdUJBQXVCLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxHQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxTQUFTLENBQUEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLElBQUksRUFBQyxDQUFDLENBQUM7aUJBQ25KO3FCQUNJO29CQUNELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztpQkFDNUQ7YUFDSjtRQUNMLENBQUMsQ0FBQztRQUNGLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7a0VBcmFRLFNBQVMsY0FTTixpQkFBaUI7aURBVHBCLFNBQVMsV0FBVCxTQUFTLG1CQUZOLE1BQU07a0RBRVQsU0FBUztjQUhyQixVQUFVO2VBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7O3NCQVVRLE1BQU07dUJBQUMsaUJBQWlCOztBQStaakMsV0FBYyxTQUFTO0lBQ25CLElBQVksZUFLWDtJQUxELFdBQVksZUFBZTtRQUN2Qix5REFBTSxDQUFBO1FBQ04scURBQUksQ0FBQTtRQUNKLDJFQUFlLENBQUE7UUFDZiw2REFBUSxDQUFBO0lBQ1osQ0FBQyxFQUxXLGVBQWUsR0FBZix5QkFBZSxLQUFmLHlCQUFlLFFBSzFCO0FBQ0wsQ0FBQyxFQVBhLFNBQVMsS0FBVCxTQUFTLFFBT3RCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3QsIEluamVjdGlvblRva2VuLCBPbkRlc3Ryb3ksIENvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudFJlZiwgVHlwZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7U3ViamVjdCwgT2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7VXRpbHMsIE1hcE9mfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQgZWxlbWVudFJlc2l6ZURldGVjdG9yTWFrZXIgZnJvbSBcImVsZW1lbnQtcmVzaXplLWRldGVjdG9yXCI7XG5pbXBvcnQge05vdGlmaWNhdGlvbnNTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9ub3RpZmljYXRpb25cIjtcbmltcG9ydCB7Q2xpcGJvYXJkfSBmcm9tICdAYW5ndWxhci9jZGsvY2xpcGJvYXJkJztcblxuZXhwb3J0IGludGVyZmFjZSBDYXJldFBvc2l0aW9uIHtcbiAgICBzdGFydDogbnVtYmVyO1xuICAgIGVuZDogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgU0NSRUVOX1NJWkVfUlVMRVMgPSBuZXcgSW5qZWN0aW9uVG9rZW48TWFwT2Y8c3RyaW5nPj4oJ1NDUkVFTl9TSVpFX1JVTEVTJyk7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBVSVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIF9yZXNpemVFdmVudCA9IG5ldyBTdWJqZWN0PFVJRXZlbnQ+KCk7XG4gICAgX3ByaW9yaXR5UmVzaXplRXZlbnQgPSBuZXcgU3ViamVjdDxVSUV2ZW50PigpO1xuICAgIHNjcmVlblNpemVzOiBzdHJpbmdbXTtcbiAgICBzY3JlZW5TaXplOiBzdHJpbmc7IC8vIG9uZSBvZiB0aGUgc2NyZWVuIHNpemUgcnVsZXMgdmFsdWVzXG4gICAgZWxlbWVudFJlc2l6ZURldGVjdG9yOiBhbnk7XG4gICAgZmFjdG9yaWVzID0gbmV3IE1hcDxUeXBlPGFueT4sIENvbXBvbmVudEZhY3Rvcnk8YW55Pj4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KFNDUkVFTl9TSVpFX1JVTEVTKSBwdWJsaWMgc2NyZWVuU2l6ZVJ1bGVzOiBNYXBPZjxzdHJpbmc+LFxuICAgICAgICBwdWJsaWMgbm90aWZpY2F0aW9uc1NlcnZpY2U6IE5vdGlmaWNhdGlvbnNTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgY2xpcGJvYXJkOiBDbGlwYm9hcmRcbiAgICApIHtcblxuICAgICAgICB0aGlzLnNjcmVlblNpemVzID0gW1wieHNcIiwgXCJzbVwiLCBcIm1kXCIsIFwibGdcIiwgXCJ4bFwiLCBcInh4bFwiXTsgLy8gaW4gYXNjZW5kaW5nIHNpemUgb3JkZXJcbiAgICAgICAgdGhpcy5zZXRTY3JlZW5TaXplKCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMucmVzaXplRXZlbnRMaXN0ZW5lcik7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlc2l6ZURldGVjdG9yID0gZWxlbWVudFJlc2l6ZURldGVjdG9yTWFrZXIoeyBzdHJhdGVneTogXCJzY3JvbGxcIiB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVzaXplRXZlbnRMaXN0ZW5lciA9IFV0aWxzLmZyYW1lKChldmVudDogVUlFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLnNldFNjcmVlblNpemUoKTtcbiAgICAgICAgdGhpcy5fcHJpb3JpdHlSZXNpemVFdmVudC5uZXh0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5fcmVzaXplRXZlbnQubmV4dChldmVudCk7XG4gICAgfSk7XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fcmVzaXplRXZlbnQuY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5fcHJpb3JpdHlSZXNpemVFdmVudC5jb21wbGV0ZSgpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZUV2ZW50TGlzdGVuZXIpO1xuICAgIH1cblxuICAgIGdldCByZXNpemVFdmVudCgpOiBPYnNlcnZhYmxlPFVJRXZlbnQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc2l6ZUV2ZW50O1xuICAgIH1cblxuICAgIGdldCBwcmlvcml0eVJlc2l6ZUV2ZW50KCk6IE9ic2VydmFibGU8VUlFdmVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJpb3JpdHlSZXNpemVFdmVudDtcbiAgICB9XG5cbiAgICAvKnByaXZhdGUgc2V0VGl0bGUodGl0bGU6IHN0cmluZykge1xuICAgICAgICBkb2N1bWVudC50aXRsZSA9IHRoaXMuaW50bFNlcnZpY2UuZm9ybWF0TWVzc2FnZSh0aXRsZSk7XG4gICAgfSovXG5cbiAgICBhcHBJbml0KGFwcENvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4pIHtcbiAgICAgICAgLy90aGlzLnNldFRpdGxlKCk7XG4gICAgICAgIC8vVXRpbHMuc3Vic2NyaWJlKHRoaXMuaW50bFNlcnZpY2UuZXZlbnRzLFxuICAgICAgICAvLyAgICAodmFsdWUpID0+IHtcbiAgICAgICAgLy8gICAgICAgIHRoaXMuc2V0VGl0bGUoKTtcbiAgICAgICAgLy8gICAgfSk7XG5cbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE4ODE3XG4gICAgICAgIC8qdGhpcy5yZXNpemVFdmVudC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBhcHBDb21wb25lbnRSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTsqL1xuXG4gICAgICAgIC8vIHRoaXMubG9hZENvbXBvbmVudCh7Y29tcG9uZW50OiBEaXJ0eUNoZWNrZXJ9KTtcbiAgICB9XG5cbiAgICAvLyBsZWdhY3kgKHdhcyBjYWxsZWQgZnJvbSBhcHAudHMpXG4gICAgYWRkUmVzaXplTGlzdGVuZXIobGlzdGVuZXI6IChldmVudD86IFVJRXZlbnQpID0+IGFueSkge1xuICAgICAgICB0aGlzLl9yZXNpemVFdmVudC5zdWJzY3JpYmUobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2NyZWVuU2l6ZUlzKGxpc3Q6IHN0cmluZyB8IHN0cmluZ1tdKSB7XG4gICAgICAgIC8vbGV0IHJ1bGVzID0gdGhpcy5jb3JlQ29uZmlnLnNjcmVlblNpemVSdWxlcztcblxuICAgICAgICAvLyB2YWxpZGF0ZSB0aGF0IHdlJ3JlIGdldHRpbmcgYSBzdHJpbmcgb3IgYXJyYXkuXG4gICAgICAgIGlmICghVXRpbHMuaXNTdHJpbmcobGlzdCkgJiYgIVV0aWxzLmlzQXJyYXkobGlzdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignc2NyZWVuU2l6ZUlzIHJlcXVpcmVzIGFuIGFycmF5IG9yIGNvbW1hLXNlcGFyYXRlZCBsaXN0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBpdCdzIGEgc3RyaW5nLCBjb252ZXJ0IHRvIGFycmF5LlxuICAgICAgICBpZiAoVXRpbHMuaXNTdHJpbmcobGlzdCkpIHtcbiAgICAgICAgICAgIGxpc3QgPSBsaXN0LnNwbGl0KC9cXHMqLFxccyovKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsaXN0LnNvbWUoKHNpemUpID0+IHdpbmRvdy5tYXRjaE1lZGlhKHRoaXMuc2NyZWVuU2l6ZVJ1bGVzW3NpemVdKS5tYXRjaGVzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFNjcmVlblNpemUoKSB7XG4gICAgICAgIGZvciAoY29uc3Qgc2l6ZSBvZiB0aGlzLnNjcmVlblNpemVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zY3JlZW5TaXplSXMoc2l6ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcmVlblNpemUgPSBzaXplO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVSVNlcnZpY2Uuc2V0U2NyZWVuU2l6ZSAtIG5vIG1hdGNoaW5nIHNjcmVlbiBzaXplXCIpO1xuICAgIH1cblxuICAgIHNjcmVlblNpemVJc0VxdWFsKHNjcmVlblNpemU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zY3JlZW5TaXplID09PSBzY3JlZW5TaXplO1xuICAgIH1cblxuICAgIHNjcmVlblNpemVJc0dyZWF0ZXIoc2NyZWVuU2l6ZTogc3RyaW5nIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGluZGV4MSA9IHRoaXMuc2NyZWVuU2l6ZXMuZmluZEluZGV4KCh2YWx1ZSkgPT4gdmFsdWUgPT09IHRoaXMuc2NyZWVuU2l6ZSk7XG4gICAgICAgIGNvbnN0IGluZGV4MiA9IHRoaXMuc2NyZWVuU2l6ZXMuZmluZEluZGV4KCh2YWx1ZSkgPT4gdmFsdWUgPT09IHNjcmVlblNpemUpO1xuICAgICAgICByZXR1cm4gaW5kZXgxID4gaW5kZXgyO1xuICAgIH1cblxuICAgIHNjcmVlblNpemVJc0xlc3Moc2NyZWVuU2l6ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGluZGV4MSA9IHRoaXMuc2NyZWVuU2l6ZXMuZmluZEluZGV4KCh2YWx1ZSkgPT4gdmFsdWUgPT09IHRoaXMuc2NyZWVuU2l6ZSk7XG4gICAgICAgIGNvbnN0IGluZGV4MiA9IHRoaXMuc2NyZWVuU2l6ZXMuZmluZEluZGV4KCh2YWx1ZSkgPT4gdmFsdWUgPT09IHNjcmVlblNpemUpO1xuICAgICAgICByZXR1cm4gaW5kZXgxIDwgaW5kZXgyO1xuICAgIH1cblxuICAgIHNjcmVlblNpemVJc0dyZWF0ZXJPckVxdWFsKHNjcmVlblNpemU6IHN0cmluZyB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoc2NyZWVuU2l6ZSA9PT0gdGhpcy5zY3JlZW5TaXplKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zY3JlZW5TaXplSXNHcmVhdGVyKHNjcmVlblNpemUpO1xuICAgIH1cblxuICAgIHNjcmVlblNpemVJc0xlc3NPckVxdWFsKHNjcmVlblNpemU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoc2NyZWVuU2l6ZSA9PT0gdGhpcy5zY3JlZW5TaXplKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zY3JlZW5TaXplSXNMZXNzKHNjcmVlblNpemUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NjcmVlblNpemVUZXN0KHNjcmVlblNpemU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoVXRpbHMuZXFOQ04oc2NyZWVuU2l6ZSwgXCJhbHdheXNcIiwgXCJ0cnVlXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVXRpbHMuZXFOQ04oc2NyZWVuU2l6ZSwgXCJuZXZlclwiLCBcImZhbHNlXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLnN0YXJ0c1dpdGgoc2NyZWVuU2l6ZSwgXCI+PVwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NyZWVuU2l6ZUlzR3JlYXRlck9yRXF1YWwoc2NyZWVuU2l6ZS5zbGljZSgyKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLnN0YXJ0c1dpdGgoc2NyZWVuU2l6ZSwgXCI+XCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zY3JlZW5TaXplSXNHcmVhdGVyKHNjcmVlblNpemUuc2xpY2UoMSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVdGlscy5zdGFydHNXaXRoKHNjcmVlblNpemUsIFwiPD1cIikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNjcmVlblNpemVJc0xlc3NPckVxdWFsKHNjcmVlblNpemUuc2xpY2UoMikpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVdGlscy5zdGFydHNXaXRoKHNjcmVlblNpemUsIFwiPFwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NyZWVuU2l6ZUlzTGVzcyhzY3JlZW5TaXplLnNsaWNlKDEpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVXRpbHMuc3RhcnRzV2l0aChzY3JlZW5TaXplLCBcIj1cIikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNjcmVlblNpemVJc0VxdWFsKHNjcmVlblNpemUuc2xpY2UoMSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNjcmVlblNpemVJc0VxdWFsKHNjcmVlblNpemUpO1xuICAgIH1cblxuICAgIC8vIHNjcmVlblNpemVzIGlzIGEgc2VxdWVuY2Ugb2Ygc2l6ZSBzcGVjcyB3aXRoIG9wdGlvbmFsIG9wZXJhdG9yIHNlcGFyYXRlZCBieSBzcGFjZSBvciBhbmQgKEFORClcbiAgICAvLyBNdWx0aXBsZSBzZXF1ZW5jZXMgY2FuIGJlIHNwZWNpZmllZCB1c2luZyAsIG9yIDsgYXMgYSBzZXBhcmF0b3IgKHRoZXNlIGFyZSBPUidkKVxuICAgIHNjcmVlblNpemVUZXN0KHNjcmVlblNpemVzOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCFzY3JlZW5TaXplcykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3JzID0gVXRpbHMuc3BsaXQoc2NyZWVuU2l6ZXMsIFsnLCcsICc7J10pO1xuICAgICAgICBmb3IgKGNvbnN0IG9yIG9mIG9ycykge1xuICAgICAgICAgICAgY29uc3QgYW5kcyA9IFV0aWxzLnNwbGl0KG9yLCBcIiBcIik7XG4gICAgICAgICAgICBpZiAoYW5kcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBvayA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGFuZCBvZiBhbmRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKFV0aWxzLmVxTkMoYW5kLCBcImFuZFwiKSkgeyAvLyBzcGFjZSBzZXBhcmF0ZWQgYnV0IHlvdSBjYW4gdXNlIGFuZCBpZiB5b3Ugd2FudCB0b1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9zY3JlZW5TaXplVGVzdChhbmQpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9rID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvaykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50UmVjdChlbGVtZW50OiBIVE1MRWxlbWVudCk6IENsaWVudFJlY3Qge1xuICAgICAgICBjb25zdCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgICAgICBjb25zdCBib3JkZXJMZWZ0ID0gcGFyc2VGbG9hdChjb21wdXRlZFN0eWxlLmJvcmRlckxlZnQpO1xuICAgICAgICBjb25zdCBib3JkZXJSaWdodCA9IHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZS5ib3JkZXJSaWdodCk7XG4gICAgICAgIGNvbnN0IGJvcmRlclRvcCA9IHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZS5ib3JkZXJUb3ApO1xuICAgICAgICBjb25zdCBib3JkZXJCb3R0b20gPSBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUuYm9yZGVyQm90dG9tKTtcbiAgICAgICAgY29uc3QgcGFkZGluZ0xlZnQgPSBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUucGFkZGluZ0xlZnQpO1xuICAgICAgICBjb25zdCBwYWRkaW5nUmlnaHQgPSBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUucGFkZGluZ1JpZ2h0KTtcbiAgICAgICAgY29uc3QgcGFkZGluZ1RvcCA9IHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nVG9wKTtcbiAgICAgICAgY29uc3QgcGFkZGluZ0JvdHRvbSA9IHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nQm90dG9tKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyBib3JkZXJUb3AgKyBwYWRkaW5nVG9wLFxuICAgICAgICAgICAgcmlnaHQ6IHJlY3QucmlnaHQgLSBib3JkZXJSaWdodCAtIHBhZGRpbmdSaWdodCxcbiAgICAgICAgICAgIGJvdHRvbTogcmVjdC5ib3R0b20gLSBib3JkZXJCb3R0b20gLSBwYWRkaW5nQm90dG9tLFxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgYm9yZGVyTGVmdCArIHBhZGRpbmdMZWZ0LFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Qud2lkdGggLSBib3JkZXJMZWZ0IC0gcGFkZGluZ0xlZnQgLSBwYWRkaW5nUmlnaHQgLSBib3JkZXJSaWdodCxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5oZWlnaHQgLSBib3JkZXJUb3AgLSBwYWRkaW5nVG9wIC0gcGFkZGluZ0JvdHRvbSAtIGJvcmRlckJvdHRvbVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIGNhcmV0IHN1cHBvcnRcbiAgICBnZXRDYXJldChpbnB1dDogSFRNTElucHV0RWxlbWVudCk6IENhcmV0UG9zaXRpb24ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IGlucHV0LnNlbGVjdGlvblN0YXJ0IHx8IDAsXG4gICAgICAgICAgICBlbmQ6IGlucHV0LnNlbGVjdGlvbkVuZCB8fCAwXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2V0Q2FyZXQoaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQsIHN0YXJ0OiBudW1iZXIsIGVuZCA9IHN0YXJ0LCB0ZXh0Pzogc3RyaW5nLCBzZWxlY3Rpb25BY3Rpb24gPSBVSVNlcnZpY2UuU2VsZWN0aW9uQWN0aW9uLmNvbGxhcHNlLCBlbnN1cmVWaXNpYmxlID0gdHJ1ZSwgcmFpc2VFdmVudCA9IHRydWUpIHtcbiAgICAgICAgaWYgKHN0YXJ0IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVdGlscy5pc1N0cmluZyh0ZXh0KSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICAgICAgICBpZiAoZW5kID49IHN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgwLCBzdGFydCkgKyB0ZXh0ICsgdmFsdWUuc2xpY2UoZW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMCwgc3RhcnQpICsgdGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGVjdGlvbkFjdGlvbikge1xuICAgICAgICAgICAgICAgIGNhc2UgVUlTZXJ2aWNlLlNlbGVjdGlvbkFjdGlvbi5hZGp1c3Q6XG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IHN0YXJ0ICsgdGV4dC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgVUlTZXJ2aWNlLlNlbGVjdGlvbkFjdGlvbi5ub25lOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFVJU2VydmljZS5TZWxlY3Rpb25BY3Rpb24uY29sbGFwc2VUb1N0YXJ0OlxuICAgICAgICAgICAgICAgICAgICBlbmQgPSBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBVSVNlcnZpY2UuU2VsZWN0aW9uQWN0aW9uLmNvbGxhcHNlOlxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IHN0YXJ0ICsgdGV4dC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gZW5kO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZW5kIDwgMCkge1xuICAgICAgICAgICAgZW5kID0gc3RhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgaW5wdXQuc2V0U2VsZWN0aW9uUmFuZ2Uoc3RhcnQsIGVuZCk7XG4gICAgICAgIGlmIChlbnN1cmVWaXNpYmxlKSB7XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gaW5wdXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50UmVjdCA9IHRoaXMuZ2V0Q29udGVudFJlY3QoaW5wdXQpO1xuICAgICAgICAgICAgY29uc3QgdGV4dFBvcyA9IHRoaXMuZ2V0VGV4dFBvc2l0aW9uKGlucHV0LCB0aGlzLmdldENhcmV0KGlucHV0KS5lbmQpO1xuICAgICAgICAgICAgbGV0IHNjcm9sbExlZnQgPSBpbnB1dC5zY3JvbGxMZWZ0O1xuICAgICAgICAgICAgY29uc3QgbWluWCA9IGNvbnRlbnRSZWN0LmxlZnQgKyBzY3JvbGxMZWZ0O1xuICAgICAgICAgICAgY29uc3QgbWF4WCA9IGNvbnRlbnRSZWN0LnJpZ2h0ICsgc2Nyb2xsTGVmdDtcbiAgICAgICAgICAgIGNvbnN0IGNhcmV0WCA9IHJlY3QubGVmdCArIHRleHRQb3MubGVmdDtcbiAgICAgICAgICAgIGlmIChjYXJldFggPCBtaW5YIHx8IGNhcmV0WCA+IG1heFgpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0ID0gTWF0aC5tYXgoY2FyZXRYIC0gY29udGVudFJlY3QucmlnaHQgKyAxLypmb3IgdGhlIGNhcmV0Ki8sIDApO1xuICAgICAgICAgICAgICAgIGlucHV0LnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyYWlzZUV2ZW50KSB7XG4gICAgICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChcImlucHV0XCIpO1xuICAgICAgICAgICAgaW5wdXQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2NvbXBvbmVudC90ZXh0YXJlYS1jYXJldC1wb3NpdGlvblxuICAgIC8vIFdlIHJldHVybiBhIGxpbmVIZWlnaHQgdmFsdWUgaW4gYWRkaXRpb25cbiAgICBwcml2YXRlIHRleHRQb3NpdGlvblByb3BlcnRpZXMgPSBbXG4gICAgICAgICdkaXJlY3Rpb24nLCAgLy8gUlRMIHN1cHBvcnRcbiAgICAgICAgJ2JveFNpemluZycsXG4gICAgICAgICd3aWR0aCcsICAvLyBvbiBDaHJvbWUgYW5kIElFLCBleGNsdWRlIHRoZSBzY3JvbGxiYXIsIHNvIHRoZSBtaXJyb3IgZGl2IHdyYXBzIGV4YWN0bHkgYXMgdGhlIHRleHRhcmVhIGRvZXNcbiAgICAgICAgJ2hlaWdodCcsXG4gICAgICAgICdvdmVyZmxvd1gnLFxuICAgICAgICAnb3ZlcmZsb3dZJywgIC8vIGNvcHkgdGhlIHNjcm9sbGJhciBmb3IgSUVcblxuICAgICAgICAnYm9yZGVyVG9wV2lkdGgnLFxuICAgICAgICAnYm9yZGVyUmlnaHRXaWR0aCcsXG4gICAgICAgICdib3JkZXJCb3R0b21XaWR0aCcsXG4gICAgICAgICdib3JkZXJMZWZ0V2lkdGgnLFxuICAgICAgICAnYm9yZGVyU3R5bGUnLFxuXG4gICAgICAgICdwYWRkaW5nVG9wJyxcbiAgICAgICAgJ3BhZGRpbmdSaWdodCcsXG4gICAgICAgICdwYWRkaW5nQm90dG9tJyxcbiAgICAgICAgJ3BhZGRpbmdMZWZ0JyxcblxuICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9DU1MvZm9udFxuICAgICAgICAnZm9udFN0eWxlJyxcbiAgICAgICAgJ2ZvbnRWYXJpYW50JyxcbiAgICAgICAgJ2ZvbnRXZWlnaHQnLFxuICAgICAgICAnZm9udFN0cmV0Y2gnLFxuICAgICAgICAnZm9udFNpemUnLFxuICAgICAgICAnZm9udFNpemVBZGp1c3QnLFxuICAgICAgICAnbGluZUhlaWdodCcsXG4gICAgICAgICdmb250RmFtaWx5JyxcblxuICAgICAgICAndGV4dEFsaWduJyxcbiAgICAgICAgJ3RleHRUcmFuc2Zvcm0nLFxuICAgICAgICAndGV4dEluZGVudCcsXG4gICAgICAgICd0ZXh0RGVjb3JhdGlvbicsICAvLyBtaWdodCBub3QgbWFrZSBhIGRpZmZlcmVuY2UsIGJ1dCBiZXR0ZXIgYmUgc2FmZVxuXG4gICAgICAgICdsZXR0ZXJTcGFjaW5nJyxcbiAgICAgICAgJ3dvcmRTcGFjaW5nJyxcblxuICAgICAgICAndGFiU2l6ZScsXG4gICAgICAgICdNb3pUYWJTaXplJ1xuICAgIF07XG4gICAgZ2V0VGV4dFBvc2l0aW9uKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwb3NpdGlvbjogbnVtYmVyLCBvcHRpb25zPzoge2RlYnVnOiBib29sZWFufSk6IHt0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyLCBsaW5lSGVpZ2h0OiBudW1iZXJ9IHtcbiAgICAgICAgY29uc3QgZGVidWcgPSBvcHRpb25zICYmIG9wdGlvbnMuZGVidWcgfHwgZmFsc2U7XG4gICAgICAgIGlmIChkZWJ1Zykge1xuICAgICAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5wdXQtdGV4dGFyZWEtY2FyZXQtcG9zaXRpb24tbWlycm9yLWRpdicpO1xuICAgICAgICAgICAgaWYgKCBlbCApIHtcbiAgICAgICAgICAgICAgICBpZiAoZWwucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtaXJyb3JlZCBkaXZcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5pZCA9ICdpbnB1dC10ZXh0YXJlYS1jYXJldC1wb3NpdGlvbi1taXJyb3ItZGl2JztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuXG4gICAgICAgIGNvbnN0IHN0eWxlID0gZGl2LnN0eWxlO1xuICAgICAgICBjb25zdCBjb21wdXRlZCA9ICEhd2luZG93LmdldENvbXB1dGVkU3R5bGUgPyBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIDogKDxhbnk+ZWxlbWVudCkuY3VycmVudFN0eWxlOyAgLy8gY3VycmVudFN0eWxlIGZvciBJRSA8IDlcblxuICAgICAgICAvLyBkZWZhdWx0IHRleHRhcmVhIHN0eWxlc1xuICAgICAgICBzdHlsZS53aGl0ZVNwYWNlID0gJ3ByZS13cmFwJztcbiAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUgIT09ICdJTlBVVCcpXG4gICAgICAgICAgICBzdHlsZS53b3JkV3JhcCA9ICdicmVhay13b3JkJzsgIC8vIG9ubHkgZm9yIHRleHRhcmVhLXNcblxuICAgICAgICAvLyBwb3NpdGlvbiBvZmYtc2NyZWVuXG4gICAgICAgIHN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJzsgIC8vIHJlcXVpcmVkIHRvIHJldHVybiBjb29yZGluYXRlcyBwcm9wZXJseVxuICAgICAgICBpZiAoIWRlYnVnKVxuICAgICAgICAgICAgc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nOyAgLy8gbm90ICdkaXNwbGF5OiBub25lJyBiZWNhdXNlIHdlIHdhbnQgcmVuZGVyaW5nXG5cbiAgICAgICAgLy8gdHJhbnNmZXIgdGhlIGVsZW1lbnQncyBwcm9wZXJ0aWVzIHRvIHRoZSBkaXZcbiAgICAgICAgdGhpcy50ZXh0UG9zaXRpb25Qcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgICAgIHN0eWxlW3Byb3BdID0gY29tcHV0ZWRbcHJvcF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghVXRpbHMuaXNVbmRlZmluZWQoKDxhbnk+d2luZG93KS5tb3pJbm5lclNjcmVlblgpKSB7XG4gICAgICAgICAgICAvLyBGaXJlZm94IGxpZXMgYWJvdXQgdGhlIG92ZXJmbG93IHByb3BlcnR5IGZvciB0ZXh0YXJlYXM6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTk4NDI3NVxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gcGFyc2VJbnQoY29tcHV0ZWQuaGVpZ2h0LCAxMCkpXG4gICAgICAgICAgICBzdHlsZS5vdmVyZmxvd1kgPSAnc2Nyb2xsJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7ICAvLyBmb3IgQ2hyb21lIHRvIG5vdCByZW5kZXIgYSBzY3JvbGxiYXI7IElFIGtlZXBzIG92ZXJmbG93WSA9ICdzY3JvbGwnXG4gICAgICAgIH1cblxuICAgICAgICBkaXYudGV4dENvbnRlbnQgPSAoPGFueT5lbGVtZW50KS52YWx1ZS5zdWJzdHJpbmcoMCwgcG9zaXRpb24pO1xuICAgICAgICAvLyB0aGUgc2Vjb25kIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGlucHV0IHR5cGU9XCJ0ZXh0XCIgdnMgdGV4dGFyZWE6IHNwYWNlcyBuZWVkIHRvIGJlIHJlcGxhY2VkIHdpdGggbm9uLWJyZWFraW5nIHNwYWNlcyAtIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzEzNDAyMDM1LzEyNjkwMzdcbiAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUgPT09ICdJTlBVVCcgJiYgZGl2LnRleHRDb250ZW50KSB7XG4gICAgICAgICAgICBkaXYudGV4dENvbnRlbnQgPSBkaXYudGV4dENvbnRlbnQucmVwbGFjZSgvXFxzL2csICdcXHUwMGEwJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAvLyBXcmFwcGluZyBtdXN0IGJlIHJlcGxpY2F0ZWQgKmV4YWN0bHkqLCBpbmNsdWRpbmcgd2hlbiBhIGxvbmcgd29yZCBnZXRzXG4gICAgICAgIC8vIG9udG8gdGhlIG5leHQgbGluZSwgd2l0aCB3aGl0ZXNwYWNlIGF0IHRoZSBlbmQgb2YgdGhlIGxpbmUgYmVmb3JlICgjNykuXG4gICAgICAgIC8vIFRoZSAgKm9ubHkqIHJlbGlhYmxlIHdheSB0byBkbyB0aGF0IGlzIHRvIGNvcHkgdGhlICplbnRpcmUqIHJlc3Qgb2YgdGhlXG4gICAgICAgIC8vIHRleHRhcmVhJ3MgY29udGVudCBpbnRvIHRoZSA8c3Bhbj4gY3JlYXRlZCBhdCB0aGUgY2FyZXQgcG9zaXRpb24uXG4gICAgICAgIC8vIGZvciBpbnB1dHMsIGp1c3QgJy4nIHdvdWxkIGJlIGVub3VnaCwgYnV0IHdoeSBib3RoZXI/XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChzcGFuKTtcblxuICAgICAgICAvLyByZXR1cm4gbGluZUhlaWdodCB0b29cbiAgICAgICAgc3Bhbi50ZXh0Q29udGVudCA9ICcuJztcbiAgICAgICAgY29uc3QgbGluZUhlaWdodCA9IHNwYW4ub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSAoPGFueT5lbGVtZW50KS52YWx1ZS5zdWJzdHJpbmcocG9zaXRpb24pIHx8ICcuJzsgIC8vIHx8IGJlY2F1c2UgYSBjb21wbGV0ZWx5IGVtcHR5IGZhdXggc3BhbiBkb2Vzbid0IHJlbmRlciBhdCBhbGxcblxuICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IHtcbiAgICAgICAgICAgIHRvcDogc3Bhbi5vZmZzZXRUb3AgKyBwYXJzZUludChjb21wdXRlZFsnYm9yZGVyVG9wV2lkdGgnXSwgMTApLFxuICAgICAgICAgICAgbGVmdDogc3Bhbi5vZmZzZXRMZWZ0ICsgcGFyc2VJbnQoY29tcHV0ZWRbJ2JvcmRlckxlZnRXaWR0aCddLCAxMCksXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGRlYnVnKSB7XG4gICAgICAgICAgICBzcGFuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjYWFhJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZGl2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgICB9XG5cbiAgICBnZXRWaWV3cG9ydCgpOiBDbGllbnRSZWN0IHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuXG4gICAgYWRkRWxlbWVudFJlc2l6ZUxpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBsaXN0ZW5lcjogKHRoaXM6IEhUTUxFbGVtZW50KSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlc2l6ZURldGVjdG9yLmxpc3RlblRvKGVsZW1lbnQsIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICByZW1vdmVFbGVtZW50UmVzaXplTGlzdGVuZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGxpc3RlbmVyOiAodGhpczogSFRNTEVsZW1lbnQpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVzaXplRGV0ZWN0b3IucmVtb3ZlTGlzdGVuZXIoZWxlbWVudCwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICBcbiAgICBjb3B5VG9DbGlwYm9hcmQoZGF0YTogc3RyaW5nLCBtYXhMZW5ndGggPSAzMCkge1xuICAgICAgICBpZiAoIW5hdmlnYXRvcj8uY2xpcGJvYXJkKSB7XG4gICAgICAgICAgICAvLyBOb3RlOiBDREsgc2VlbXMgdG8gc3RydWdnbGUgd2l0aCBsYXJnZSBjaHVua3Mgb2YgdGV4dFxuICAgICAgICAgICAgdGhpcy5jb3B5VG9DbGlwYm9hcmRDZGsoZGF0YSwgbWF4TGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIE5hdmlnYXRvciBidWlsdC1pbiBjbGlwYm9hcmQgbWFuYWdlbWVudFxuICAgICAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoZGF0YSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zU2VydmljZS5zdWNjZXNzKFwibXNnI2NsaXBib2FyZC5zdWNjZXNzXCIsIHtkYXRhOiBcIlxcXCJcIisoZGF0YS5sZW5ndGg+bWF4TGVuZ3RoPyAoZGF0YS5zbGljZSgwLG1heExlbmd0aCkgKyBcIi4uLlwiKSA6IGRhdGEpK1wiXFxcIlwifSk7XG4gICAgICAgICAgICB9LCBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uc1NlcnZpY2Uud2FybmluZyhcIm1zZyNjbGlwYm9hcmQuZXJyb3JcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvcHlUb0NsaXBib2FyZENkayhkYXRhOiBzdHJpbmcsIG1heExlbmd0aCA9IDMwKSB7XG4gICAgICAgIGNvbnN0IHBlbmRpbmcgPSB0aGlzLmNsaXBib2FyZC5iZWdpbkNvcHkoZGF0YSk7XG4gICAgICAgIGxldCByZW1haW5pbmdBdHRlbXB0cyA9IDM7XG4gICAgICAgIGNvbnN0IGF0dGVtcHQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwZW5kaW5nLmNvcHkoKTtcbiAgICAgICAgICAgIGlmICghcmVzdWx0ICYmIC0tcmVtYWluaW5nQXR0ZW1wdHMpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGF0dGVtcHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1lbWJlciB0byBkZXN0cm95IHdoZW4geW91J3JlIGRvbmUhXG4gICAgICAgICAgICAgICAgcGVuZGluZy5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgaWYocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uc1NlcnZpY2Uuc3VjY2VzcyhcIm1zZyNjbGlwYm9hcmQuc3VjY2Vzc1wiLCB7ZGF0YTogXCJcXFwiXCIrKGRhdGEubGVuZ3RoPm1heExlbmd0aD8gKGRhdGEuc2xpY2UoMCxtYXhMZW5ndGgpICsgXCIuLi5cIikgOiBkYXRhKStcIlxcXCJcIn0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zU2VydmljZS53YXJuaW5nKFwibXNnI2NsaXBib2FyZC5lcnJvclwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGF0dGVtcHQoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBtb2R1bGUgVUlTZXJ2aWNlIHtcbiAgICBleHBvcnQgZW51bSBTZWxlY3Rpb25BY3Rpb24ge1xuICAgICAgICBhZGp1c3QsXG4gICAgICAgIG5vbmUsXG4gICAgICAgIGNvbGxhcHNlVG9TdGFydCxcbiAgICAgICAgY29sbGFwc2VcbiAgICB9XG59XG4iXX0=