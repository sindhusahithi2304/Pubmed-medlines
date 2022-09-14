import { ElementRef, EventEmitter, ɵɵdirectiveInject, ChangeDetectorRef, ɵɵdefineComponent, ɵɵcontentQuery, ɵɵqueryRefresh, ɵɵloadQuery, ɵɵstaticViewQuery, ɵɵNgOnChangesFeature, ɵɵelement, ɵɵstyleProp, ɵɵproperty, ɵɵsanitizeResourceUrl, ɵɵpureFunction1, ɵɵattribute, ɵsetClassMetadata, Component, ChangeDetectionStrategy, Input, Output, ViewChild, ContentChild, ɵɵgetCurrentView, ɵɵelementContainerStart, ɵɵelementStart, ɵɵlistener, ɵɵrestoreView, ɵɵnextContext, ɵɵpipe, ɵɵtext, ɵɵelementEnd, ɵɵelementContainerEnd, ɵɵadvance, ɵɵpropertyInterpolate, ɵɵpipeBind1, ɵɵclassMap, ɵɵtextInterpolate, ɵɵpipeBind2, ɵɵpureFunction3, ɵɵtemplate, ɵɵtextInterpolate1, NgZone, ɵɵviewQuery, InjectionToken, ɵɵinject, ɵɵdefineInjectable, Injectable, Type, Optional, Inject, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule, ɵɵclassMapInterpolate1, ɵɵInheritDefinitionFeature, ɵɵtemplateRefExtractor, ɵɵpureFunction0, HostBinding, ɵɵclassMapInterpolate2, ɵɵsanitizeHtml, ɵɵtextInterpolate2, ɵɵreference, ɵɵsanitizeUrl, ɵɵpureFunction2, ɵɵstyleMap, ViewChildren } from '@angular/core';
import { NgStyle, NgClass, NgIf, NgForOf, CommonModule, DecimalPipe, DOCUMENT } from '@angular/common';
import { MessagePipe, IntlModule } from '@sinequa/core/intl';
import { PreviewWebService, WebServicesModule, SimilarDocumentsWebService } from '@sinequa/core/web-services';
import { UtilsModule, NumberPipe, UIService, ValuePipe, Autofocus } from '@sinequa/components/utils';
import { Utils } from '@sinequa/core/base';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AppService, ExprBuilder } from '@sinequa/core/app-utils';
import { AuthenticationService } from '@sinequa/core/login';
import { SearchService, enSearch, frSearch, deSearch } from '@sinequa/components/search';
import { ModalService, MODAL_MODEL } from '@sinequa/core/modal';
import { RecentDocumentsService } from '@sinequa/components/saved-queries';
import { ResultTitle, ResultModule, enResult, frResult, deResult } from '@sinequa/components/result';
import { AbstractFacet, BsFacetCard, BsFacetModule, enFacet, frFacet, deFacet } from '@sinequa/components/facet';
import { Action, BsActionButtons, BsActionModule } from '@sinequa/components/action';
import { Metadata, MetadataModule, enMetadata, frMetadata, deMetadata } from '@sinequa/components/metadata';
import { SelectControlValueAccessor, NgControlStatus, NgModel, NgSelectOption, ɵangular_packages_forms_forms_x, FormControl, FormBuilder, ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, DefaultValueAccessor, FormControlName, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf, ScrollingModule } from '@angular/cdk/scrolling';
import { ValidationService, ValidationDirective, ValidationModule } from '@sinequa/core/validation';
import { CollapseModule, enCollapse, frCollapse, deCollapse } from '@sinequa/components/collapse';
import { BsModal, BsModalModule, enModal, frModal, deModal } from '@sinequa/components/modal';

var HighlightCategoryFilterChoice;
(function (HighlightCategoryFilterChoice) {
    HighlightCategoryFilterChoice[HighlightCategoryFilterChoice["All"] = 0] = "All";
    HighlightCategoryFilterChoice[HighlightCategoryFilterChoice["None"] = 1] = "None";
    HighlightCategoryFilterChoice[HighlightCategoryFilterChoice["Value"] = 2] = "Value";
})(HighlightCategoryFilterChoice || (HighlightCategoryFilterChoice = {}));
// forEach on a NodeList is polyfilled for IE but not at all necessarily when the list comes from a document
// in another frame. This function is used to perform the forEach taking this into account.
function forEach(nodeList, callbackfn) {
    if (!nodeList.forEach) {
        Array.from(nodeList).forEach(callbackfn);
    }
    else {
        nodeList.forEach(callbackfn);
    }
}
/**
 * This class offers an API to manipulate the HTML of a preview document.
 * - Insert elements dynamically in the DOM of the preview (eg. tooltips)
 * - Retrieve the text of entities or extracts
 * - Select the elements of entities or extracts (by altering their CSS classes)
 * - Highlight (or not) specific entities or categories in the HTML (by altering their CSS classes)
 */
class PreviewDocument {
    constructor(element) {
        var _a, _b;
        if (element instanceof ElementRef) {
            this._window = (_a = element === null || element === void 0 ? void 0 : element.nativeElement) === null || _a === void 0 ? void 0 : _a.contentWindow;
            if (((_b = this._window) === null || _b === void 0 ? void 0 : _b.frames) && this._window.frames["frSheet"]) {
                this._window = this._window.frames["frSheet"]; // aspose xls preview
            }
        }
        else {
            this._document = element;
        }
    }
    // PUBLIC METHODS
    /**
     * Return the Window of the iframe containing the element
     */
    getContentWindow() {
        return this._window;
    }
    /**
     * Returns the root Document element of the HTML Preview
     */
    get document() {
        return this._document || this._window.document;
    }
    /**
     * Insert a given DOM Element in the body of the document preview
     * @param component
     */
    insertComponent(component) {
        this.document.body.appendChild(component);
    }
    /**
     * Returns the text of a given entity
     * @param categoryId Category of the entity
     * @param index Index of the entity in that category
     */
    getHighlightText(categoryId, index) {
        if (index < 0) {
            return "";
        }
        const nodes = this.document.querySelectorAll("#" + categoryId + "_" + index);
        if (!nodes || nodes.length === 0) {
            return "";
        }
        let text = "";
        forEach(nodes, n => text += (n['innerHTML'] || n.textContent));
        return text;
    }
    /**
     * Update the location of the entities' SVG background (for some converters)
     */
    setSvgBackgroundPositionAndSize() {
        const svgList = this.document.querySelectorAll("svg");
        if (svgList != null) {
            for (let i = 0, ic = svgList.length; i < ic; i++) {
                const svg = svgList.item(i);
                const tspanList = svg.getElementsByTagName("tspan");
                if (tspanList != null) {
                    for (let j = 0, jc = tspanList.length; j < jc; j++) {
                        const tspan = tspanList.item(j);
                        if (tspan) {
                            const bgId = tspan.getAttribute("data-entity-background");
                            if (bgId) {
                                const rect = this.getFirst(this.getDocElements(bgId));
                                if (rect) {
                                    this.resizeSvgBackground(rect, tspan);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    /**
     * Select a specific entity by applying specific highlight classes
     * to the DOM elements and scrolling the view to center around them.
     * @param categoryId Category of the entity
     * @param index Index of the entity in that category
     */
    selectHighlight(categoryId, index) {
        this.clearHighlightSelection();
        // current element becomes previous element
        this.previousElement = this.document.getElementById(categoryId + '_' + index);
        if (this.previousElement) {
            // highlight new selected element
            this.setHighlightSelection(this.previousElement, true, true);
            this.previousElement.scrollIntoView({ block: 'center' });
        }
    }
    /**
     * Removes all entity selection classes from the document HTML elements
     */
    clearHighlightSelection() {
        // Clear HTML elements borders
        if (this.previousElement) {
            this.previousElement.classList.remove(PreviewDocument.SELECTED_HIGHLIGHT_CLASS);
        }
        // Clear SVG elements borders
        const elements = this.document.querySelectorAll("line.sq-svg");
        for (let i = 0; i < elements.length; i++) {
            const parentNode = elements[i].parentNode;
            if (parentNode) {
                parentNode.removeChild(elements[i]);
            }
        }
    }
    /**
     * Turns highlights on or off based on the provided filter object. Additionally clears the selected entity
     * @param filters object where each key provides a filter for each category of entity/highlight
     */
    filterHighlights(filters) {
        this.updateHighlightFilterState(filters);
        this.clearHighlightSelection();
    }
    /**
     * Loop through every highlighted element in the document and turn highlights on or off based on the filters object.
     * If the filters object is an array then only the specified categories are highlighted.
     * @param filters object where each key provides a filter for each category of entity/highlight
     */
    updateHighlightFilterState(filters) {
        const elements = this.document.querySelectorAll("[data-entity-display], .extractslocations, .matchlocations");
        if (Utils.isArray(filters)) {
            forEach(elements, element => {
                const highlight = filters.some(category => element.classList.contains(category));
                if (highlight) {
                    element.classList.remove(PreviewDocument.FILTERED_OUT_HIGHLIGHT_CLASS);
                }
                else {
                    element.classList.add(PreviewDocument.FILTERED_OUT_HIGHLIGHT_CLASS);
                }
            });
        }
        else {
            forEach(elements, element => {
                if (PreviewDocument.elementIsFilteredOut(element, filters)) {
                    element.classList.add(PreviewDocument.FILTERED_OUT_HIGHLIGHT_CLASS);
                }
                else {
                    element.classList.remove(PreviewDocument.FILTERED_OUT_HIGHLIGHT_CLASS);
                }
            });
        }
    }
    /**
     * Turns on/off the highlights of one category of entities or a specific value if provided
     * @param category e.g. person
     * @param on true for highlighting / false for turning off
     * @param value e.g. "BILL GATES"
     */
    toggleHighlight(category, on, value) {
        const elements = this.document.querySelectorAll("." + category);
        forEach(elements, element => {
            if (!value
                || (element.hasAttribute(PreviewDocument.BASIC_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE) && value === element.getAttribute(PreviewDocument.BASIC_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE))
                || (element.hasAttribute(PreviewDocument.ADVANCED_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE) && value === element.getAttribute(PreviewDocument.ADVANCED_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE))) {
                if (on) {
                    element.classList.remove(PreviewDocument.FILTERED_OUT_HIGHLIGHT_CLASS);
                }
                else {
                    element.classList.add(PreviewDocument.FILTERED_OUT_HIGHLIGHT_CLASS);
                }
            }
        });
    }
    // PRIVATE METHODS
    setHighlightSelection(elt, isFirst, isLast) {
        if (this.isSvgElement(elt)) {
            this.setHighlightSelectionSVG(elt, isFirst, isLast);
        }
        else {
            this.setHighlightSelectionHTML(elt, isFirst, isLast);
        }
    }
    setHighlightSelectionHTML(elt, isFirst, isLast) {
        elt.classList.add(PreviewDocument.SELECTED_HIGHLIGHT_CLASS);
        if (isFirst) {
            elt.classList.add(PreviewDocument.SELECTED_HIGHLIGHT_FIRST_FRAGMENT_CLASS);
        }
        if (isLast) {
            elt.classList.add(PreviewDocument.SELECTED_HIGHLIGHT_LAST_FRAGMENT_CLASS);
        }
    }
    setHighlightSelectionSVG(elt, isFirst, isLast) {
        const bgId = elt.getAttribute("data-entity-background");
        if (!bgId)
            return;
        const rect = this.getFirst(this.getDocElements(bgId));
        const group = rect.parentNode;
        const rectPosition = rect.getBBox();
        if (group) {
            const top = rectPosition.y;
            const bottom = rectPosition.y + rectPosition.height;
            const left = rectPosition.x;
            const right = rectPosition.x + rectPosition.width;
            const valueTransform = rect.getAttribute("transform");
            this.addSvgLine(group, left, top, right, top, valueTransform);
            this.addSvgLine(group, left, bottom, right, bottom, valueTransform);
            if (isFirst)
                this.addSvgLine(group, left, top, left, bottom, valueTransform);
            if (isLast)
                this.addSvgLine(group, right, top, right, bottom, valueTransform);
        }
    }
    addSvgLine(group, x1, y1, x2, y2, transform) {
        const line = this.document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("class", PreviewDocument.SVG_LINE_CLASS);
        line.setAttribute("x1", String(x1));
        line.setAttribute("y1", String(y1));
        line.setAttribute("x2", String(x2));
        line.setAttribute("y2", String(y2));
        if (transform)
            line.setAttribute("transform", transform);
        group.appendChild(line);
    }
    resizeSvgBackground(rect, tspan) {
        let elt = tspan;
        while (elt.tagName !== "text") {
            elt = elt.parentNode;
            if (elt == null)
                break;
        }
        const text = elt;
        const textBoxPixel = text.getBoundingClientRect();
        const textBoxSVG = text.getBBox();
        if (textBoxPixel.height === 0 || textBoxPixel.width === 0)
            return;
        const scaleX = textBoxSVG.width / textBoxPixel.width;
        const scaleY = textBoxSVG.height / textBoxPixel.height;
        const deltaX = 2 * scaleX;
        const deltaY = 2 * scaleY;
        const firstCharRect = tspan.getExtentOfChar(0);
        const tspanWidth = tspan.getComputedTextLength();
        rect.setAttribute("x", String(firstCharRect.x - deltaX));
        rect.setAttribute("y", String(firstCharRect.y - deltaY));
        rect.setAttribute("width", String(tspanWidth + 2 * deltaX));
        rect.setAttribute("height", String(textBoxSVG.height + 2 * deltaY));
        const valueTransform = text.getAttribute("transform");
        if (valueTransform)
            rect.setAttribute("transform", valueTransform);
    }
    getDocElements(id) {
        const list = Array();
        // Get HTML elements directly by id
        const eltList = this.document.querySelectorAll("#" + id);
        for (let i = 0; i < eltList.length; i++) {
            list.push(eltList[i]);
        }
        // Get SVG tspan iterating on them (jquery querySelectorAll didn't return SVG inner elements)
        const svgList = this.document.querySelectorAll("svg");
        if (svgList != null) {
            for (let i = 0, ic = svgList.length; i < ic; i++) {
                const svg = svgList.item(i);
                const tspanList = svg.getElementsByTagName("tspan");
                if (tspanList != null) {
                    for (let j = 0, jc = tspanList.length; j < jc; j++) {
                        const tspan = tspanList.item(j);
                        if (tspan) {
                            if (tspan.id === id)
                                list.push(tspan);
                        }
                    }
                }
            }
        }
        return list;
    }
    getFirst(nodes) {
        return (nodes != null && nodes.length > 0) ? nodes[0] : null;
    }
    isSvgElement(elt) {
        if (elt == null)
            return false;
        return "viewportElement" in elt;
    }
    // PRIVATE STATIC (from highlight helper)
    static elementIsFilteredOut(element, filters) {
        const elementClass = this.getElementCategory(element, Object.keys(filters));
        if (elementClass == null) {
            return false;
        }
        const filterState = filters[elementClass];
        if (filterState == null) {
            return false;
        }
        if (filterState.choice === HighlightCategoryFilterChoice.None) {
            return true;
        }
        if (filterState.choice === HighlightCategoryFilterChoice.All) {
            return false;
        }
        if (element.hasAttribute(PreviewDocument.BASIC_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE)) {
            return filterState.filterValue !== element.getAttribute(PreviewDocument.BASIC_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE);
        }
        return filterState.filterValue !== element.getAttribute(PreviewDocument.ADVANCED_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE);
    }
    static getElementCategory(element, categoryIds) {
        for (const categoryId of categoryIds) {
            if (element.classList.contains(categoryId)) {
                return categoryId;
            }
        }
        return "";
    }
}
PreviewDocument.SELECTED_HIGHLIGHT_CLASS = "sq-current";
PreviewDocument.SELECTED_HIGHLIGHT_FIRST_FRAGMENT_CLASS = "sq-first";
PreviewDocument.SELECTED_HIGHLIGHT_LAST_FRAGMENT_CLASS = "sq-last";
PreviewDocument.FILTERED_OUT_HIGHLIGHT_CLASS = "sq-inactive";
PreviewDocument.SVG_LINE_CLASS = "sq-svg";
PreviewDocument.BASIC_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE = "data-entity-basic";
PreviewDocument.ADVANCED_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE = "data-entity-display";

const _c0 = ["tooltip"];
const _c1 = ["documentFrame"];
const _c2 = function (a0) { return { "-ms-zoom": a0, "-moz-transform": "scale(var(--factor))", "-o-transform": "scale(var(--factor))", "-webkit-transform": "scale(var(--factor))" }; };
/**
 * This component manages the iframe containing the document's preview.
 * The main input is the URL of the document's preview.
 * The main output is an event emitter providing an instance of PreviewDocument.
 *
 * PreviewDocument is a wrapper around the HTML Document, allowing to interact with
 * the HTML of the preview (for example to highlight some entities)
 *
 * It is possible to insert a tooltip in the preview via transclusion.
 * Example:
    <sq-preview-document-iframe
        [downloadUrl]="downloadUrl"
        (onPreviewReady)="onPreviewReady($event)">
        <sq-preview-tooltip #tooltip
            [previewDocument]="previewDocument"
            [previewData]="previewDocument">
        </sq-preview-tooltip>
    </sq-preview-document-iframe>
 */
class PreviewDocumentIframe {
    constructor(cdr, sanitizer) {
        this.cdr = cdr;
        this.sanitizer = sanitizer;
        this.defaultSandbox = "allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts";
        this.scalingFactor = 1.0;
        this.onPreviewReady = new EventEmitter();
        // page could change when location.href change or when user click on a tab (sheet case)
        // when URL a string is sent otherwise a PreviewDocument
        this.pageChange = new EventEmitter();
        this.previewDocLoadHandler = this.onPreviewDocLoad.bind(this);
    }
    onPreviewDocLoad() {
        if (this.downloadUrl === undefined)
            return;
        // previewDocument must be created here when document is fully loaded
        // because in case of sheet, PreviewDocument constructor change.
        this.previewDocument = new PreviewDocument(this.documentFrame);
        // SVG highlight:
        //   background rectangle (highlight) were added to the SVG by the HTML generator (C#), but html generation is
        //   not able to know the geometry of the text. It is up to the browser to compute the position and size of the
        //   background. That needs to be done now that the iFrame is loaded.
        try {
            this.previewDocument.setSvgBackgroundPositionAndSize();
        }
        catch (error) {
            console.error(error);
        }
        /* To catch tab's sheet changes
         * Sheet structure:
         * <iframe #preview>
         *      #document
         *          ...
         *          <frameset>
         *              <iframe name="frSheet"> // current sheet displayed
         *              <iframe name="frTabs">  // contains all sheet's tabs
         *          </frameset>
         *          ...
         * </iframe>
         */
        const sheetFrame = this.documentFrame.nativeElement.contentDocument.getElementsByName("frSheet");
        if (sheetFrame.length > 0) {
            sheetFrame[0].removeEventListener("load", () => { });
            sheetFrame[0].addEventListener("load", () => {
                this.previewDocument = new PreviewDocument(this.documentFrame);
                this.pageChange.next(this.previewDocument);
                this.cdr.markForCheck();
            }, true);
        }
        if (this.tooltip)
            this.addTooltip(this.previewDocument);
        // Let upstream component know document is now ready
        this.onPreviewReady.next(this.previewDocument);
        this.cdr.markForCheck();
    }
    addTooltip(previewDocument) {
        previewDocument.insertComponent(this.tooltip.nativeElement);
    }
    ngOnInit() {
        this.documentFrame.nativeElement.addEventListener("load", this.previewDocLoadHandler, true);
    }
    ngOnDestroy() {
        this.documentFrame.nativeElement.removeEventListener("load", this.previewDocLoadHandler);
    }
    ngOnChanges(simpleChanges) {
        if (simpleChanges.scalingFactor && !simpleChanges.scalingFactor.firstChange) {
            return;
        }
        this.resetContent();
        if (simpleChanges.downloadUrl && simpleChanges.downloadUrl.currentValue !== undefined) {
            // set sandbox attribute only when downloadUrl is defined, so iframe is created without sandbox attribute
            // if sandbox is null, keep sandbox attribute to undefined
            // otherwise put sanbox value in the sanbox attribute or default sandbox value
            this._sandbox = (this.sandbox === null) ? undefined : Utils.isString(this.sandbox) ? this.sandbox : this.defaultSandbox;
            this.sanitizedUrlSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.downloadUrl);
        }
    }
    ngAfterViewInit() {
        this.resetContent();
        this.iframeURLChange(this.documentFrame.nativeElement, (newURL) => {
            this.previewDocument = new PreviewDocument(this.documentFrame);
            this.pageChange.next(newURL);
        });
    }
    iframeURLChange(iframe, callback) {
        let lastDispatched = null;
        const dispatchChange = function () {
            if (iframe.contentWindow) {
                const newHref = iframe.contentWindow.location.href;
                if (newHref === "about:blank")
                    return;
                if (newHref !== lastDispatched) {
                    callback(newHref);
                    lastDispatched = newHref;
                }
            }
        };
        const unloadHandler = function (e) {
            setTimeout(dispatchChange, 0);
        };
        function attachUnload() {
            // Remove the unloadHandler in case it was already attached.
            // Otherwise, there will be two handlers, which is unnecessary.
            if (iframe.contentWindow) {
                iframe.contentWindow.removeEventListener("unload", unloadHandler);
                iframe.contentWindow.addEventListener("unload", unloadHandler);
            }
        }
        iframe.addEventListener("load", function () {
            attachUnload();
            // Just in case the change wasn't dispatched during the unload event...
            dispatchChange();
        });
        attachUnload();
    }
    resetContent() {
        this.sanitizedUrlSrc = this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    }
}
PreviewDocumentIframe.ɵfac = function PreviewDocumentIframe_Factory(t) { return new (t || PreviewDocumentIframe)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(DomSanitizer)); };
PreviewDocumentIframe.ɵcmp = ɵɵdefineComponent({ type: PreviewDocumentIframe, selectors: [["sq-preview-document-iframe"]], contentQueries: function PreviewDocumentIframe_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, true, ElementRef);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tooltip = _t.first);
    } }, viewQuery: function PreviewDocumentIframe_Query(rf, ctx) { if (rf & 1) {
        ɵɵstaticViewQuery(_c1, true);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.documentFrame = _t.first);
    } }, inputs: { sandbox: "sandbox", downloadUrl: "downloadUrl", scalingFactor: "scalingFactor" }, outputs: { onPreviewReady: "onPreviewReady", pageChange: "pageChange" }, features: [ɵɵNgOnChangesFeature], decls: 2, vars: 7, consts: [[3, "src", "ngStyle"], ["documentFrame", ""]], template: function PreviewDocumentIframe_Template(rf, ctx) { if (rf & 1) {
        ɵɵelement(0, "iframe", 0, 1);
    } if (rf & 2) {
        ɵɵstyleProp("--factor", ctx.scalingFactor);
        ɵɵproperty("src", ctx.sanitizedUrlSrc, ɵɵsanitizeResourceUrl)("ngStyle", ɵɵpureFunction1(5, _c2, ctx.scalingFactor));
        ɵɵattribute("sandbox", ctx._sandbox);
    } }, directives: [NgStyle], styles: ["[_nghost-%COMP%]{\n    flex: 1;\n}\n\n\niframe[_ngcontent-%COMP%] {\n    background-color: white;\n    flex: 1;\n    position: relative;\n    display: block;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    height: calc(100% / var(--factor));\n    width: calc(100% / var(--factor));\n    border: 0;\n\n    -moz-transform-origin: 0 0;\n    -o-transform-origin: 0 0;\n    -webkit-transform-origin: 0 0;\n}\n\n.spinner-grow[_ngcontent-%COMP%] {\n    width: 3rem;\n    height: 3rem\n}"], changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(PreviewDocumentIframe, [{
        type: Component,
        args: [{
                selector: "sq-preview-document-iframe",
                template: `
                <iframe #documentFrame
                    [attr.sandbox]="_sandbox"
                    [src]="sanitizedUrlSrc"
                    [style.--factor]="scalingFactor"
                    [ngStyle]="{'-ms-zoom': scalingFactor, '-moz-transform': 'scale(var(--factor))', '-o-transform': 'scale(var(--factor))', '-webkit-transform': 'scale(var(--factor))'}">
                </iframe>`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
:host{
    flex: 1;
}


iframe {
    background-color: white;
    flex: 1;
    position: relative;
    display: block;
    top: 0;
    left: 0;
    bottom: 0;
    height: calc(100% / var(--factor));
    width: calc(100% / var(--factor));
    border: 0;

    -moz-transform-origin: 0 0;
    -o-transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
}

.spinner-grow {
    width: 3rem;
    height: 3rem
}
    `]
            }]
    }], function () { return [{ type: ChangeDetectorRef }, { type: DomSanitizer }]; }, { sandbox: [{
            type: Input
        }], downloadUrl: [{
            type: Input
        }], scalingFactor: [{
            type: Input
        }], onPreviewReady: [{
            type: Output
        }], pageChange: [{
            type: Output
        }], documentFrame: [{
            type: ViewChild,
            args: ['documentFrame', { static: true }]
        }], tooltip: [{
            type: ContentChild,
            args: ['tooltip', { read: ElementRef, static: false }]
        }] }); })();

const _c0$1 = ["tooltip"];
const _c1$1 = function (a0) { return { disabled: a0 }; };
function PreviewTooltip_ng_container_2_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "span", 9);
    ɵɵlistener("click", function PreviewTooltip_ng_container_2_ng_container_11_Template_span_click_1_listener($event) { ɵɵrestoreView(_r6); const ctx_r5 = ɵɵnextContext(2); return ctx_r5.previousEntity($event); });
    ɵɵpipe(2, "sqMessage");
    ɵɵtext(3, "\u276C");
    ɵɵelementEnd();
    ɵɵelementStart(4, "span", 10);
    ɵɵlistener("click", function PreviewTooltip_ng_container_2_ng_container_11_Template_span_click_4_listener($event) { ɵɵrestoreView(_r6); const ctx_r7 = ɵɵnextContext(2); return ctx_r7.nextEntity($event); });
    ɵɵpipe(5, "sqMessage");
    ɵɵtext(6, "\u276D");
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(2, 4, "msg#preview.previousHighlightButtonAltText"));
    ɵɵproperty("ngClass", ɵɵpureFunction1(8, _c1$1, ctx_r3.entityIdx <= 1));
    ɵɵadvance(3);
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(5, 6, "msg#preview.nextHighlightButtonAltText"));
    ɵɵproperty("ngClass", ɵɵpureFunction1(10, _c1$1, ctx_r3.entityIdx >= ctx_r3.entityCount));
} }
function PreviewTooltip_ng_container_2_button_13_span_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span");
} if (rf & 2) {
    const action_r8 = ɵɵnextContext().$implicit;
    ɵɵclassMap(action_r8.icon);
} }
const _c2$1 = function (a0, a1, a2) { return { type: a0, value: a1, display: a2 }; };
const _c3 = function (a0) { return { values: a0 }; };
function PreviewTooltip_ng_container_2_button_13_span_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    const action_r8 = ɵɵnextContext().$implicit;
    const ctx_r10 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind2(2, 1, action_r8.text, ɵɵpureFunction1(8, _c3, ɵɵpureFunction3(4, _c2$1, ctx_r10.entityType, ctx_r10.entityValue, ctx_r10.entityDisplay))));
} }
function PreviewTooltip_ng_container_2_button_13_span_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span");
} if (rf & 2) {
    const action_r8 = ɵɵnextContext().$implicit;
    ɵɵclassMap(action_r8.iconAfter);
} }
function PreviewTooltip_ng_container_2_button_13_Template(rf, ctx) { if (rf & 1) {
    const _r16 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 11);
    ɵɵlistener("click", function PreviewTooltip_ng_container_2_button_13_Template_button_click_0_listener($event) { ɵɵrestoreView(_r16); const action_r8 = ctx.$implicit; const ctx_r15 = ɵɵnextContext(2); return ctx_r15.entityAction(action_r8, $event); });
    ɵɵpipe(1, "sqMessage");
    ɵɵtemplate(2, PreviewTooltip_ng_container_2_button_13_span_2_Template, 1, 3, "span", 12);
    ɵɵtemplate(3, PreviewTooltip_ng_container_2_button_13_span_3_Template, 3, 10, "span", 2);
    ɵɵtemplate(4, PreviewTooltip_ng_container_2_button_13_span_4_Template, 1, 3, "span", 12);
    ɵɵelementEnd();
} if (rf & 2) {
    const action_r8 = ctx.$implicit;
    const ctx_r4 = ɵɵnextContext(2);
    ɵɵpropertyInterpolate("title", ɵɵpipeBind2(1, 6, action_r8.title || "", ɵɵpureFunction1(13, _c3, ɵɵpureFunction3(9, _c2$1, ctx_r4.entityType, ctx_r4.entityValue, ctx_r4.entityDisplay))));
    ɵɵproperty("disabled", action_r8.disabled)("hidden", action_r8.hidden);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", action_r8.icon);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", action_r8.text);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", action_r8.iconAfter);
} }
function PreviewTooltip_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "span", 3);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵelementStart(3, "span", 4);
    ɵɵtext(4);
    ɵɵpipe(5, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementStart(6, "span", 5);
    ɵɵtext(7);
    ɵɵelementEnd();
    ɵɵtext(8, "/");
    ɵɵelementStart(9, "span", 6);
    ɵɵtext(10);
    ɵɵelementEnd();
    ɵɵtemplate(11, PreviewTooltip_ng_container_2_ng_container_11_Template, 7, 12, "ng-container", 2);
    ɵɵelementStart(12, "div", 7);
    ɵɵtemplate(13, PreviewTooltip_ng_container_2_button_13_Template, 5, 15, "button", 8);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate1("", ctx_r1.entityDisplay, " ");
    ɵɵadvance(2);
    ɵɵtextInterpolate1("(", ɵɵpipeBind1(5, 6, ctx_r1.entityLabel), ") ");
    ɵɵadvance(3);
    ɵɵtextInterpolate1("", ctx_r1.entityIdx, " ");
    ɵɵadvance(3);
    ɵɵtextInterpolate1(" ", ctx_r1.entityCount, " ");
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r1.entityNavActions);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r1.entityActions);
} }
function PreviewTooltip_ng_container_3_ng_container_1_span_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span");
} if (rf & 2) {
    const action_r18 = ɵɵnextContext().$implicit;
    ɵɵclassMap(action_r18.icon);
} }
const _c4 = function (a0) { return { text: a0 }; };
function PreviewTooltip_ng_container_3_ng_container_1_span_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    const action_r18 = ɵɵnextContext().$implicit;
    const ctx_r20 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind2(2, 1, action_r18.text, ɵɵpureFunction1(6, _c3, ɵɵpureFunction1(4, _c4, ctx_r20.selectedText.slice(0, 50)))));
} }
function PreviewTooltip_ng_container_3_ng_container_1_span_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span");
} if (rf & 2) {
    const action_r18 = ɵɵnextContext().$implicit;
    ɵɵclassMap(action_r18.iconAfter);
} }
function PreviewTooltip_ng_container_3_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r26 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "button", 11);
    ɵɵlistener("click", function PreviewTooltip_ng_container_3_ng_container_1_Template_button_click_1_listener($event) { ɵɵrestoreView(_r26); const action_r18 = ctx.$implicit; const ctx_r25 = ɵɵnextContext(2); return ctx_r25.selectedTextAction(action_r18, $event); });
    ɵɵpipe(2, "sqMessage");
    ɵɵtemplate(3, PreviewTooltip_ng_container_3_ng_container_1_span_3_Template, 1, 3, "span", 12);
    ɵɵtemplate(4, PreviewTooltip_ng_container_3_ng_container_1_span_4_Template, 3, 8, "span", 2);
    ɵɵtemplate(5, PreviewTooltip_ng_container_3_ng_container_1_span_5_Template, 1, 3, "span", 12);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const action_r18 = ctx.$implicit;
    const ctx_r17 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("title", ɵɵpipeBind2(2, 6, action_r18.title || "", ɵɵpureFunction1(11, _c3, ɵɵpureFunction1(9, _c4, ctx_r17.selectedText.slice(0, 50)))));
    ɵɵproperty("disabled", action_r18.disabled)("hidden", action_r18.hidden);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", action_r18.icon);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", action_r18.text);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", action_r18.iconAfter);
} }
function PreviewTooltip_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PreviewTooltip_ng_container_3_ng_container_1_Template, 6, 13, "ng-container", 13);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r2.selectedTextActions);
} }
const _c5 = function (a0, a1, a2) { return { "visibility": a0, "bottom": a1, "left": a2 }; };
class PreviewTooltip {
    constructor(zone, changeDetectorRef, sanitizer) {
        this.zone = zone;
        this.changeDetectorRef = changeDetectorRef;
        this.sanitizer = sanitizer;
        this.entityActions = [];
        this.entityNavActions = true;
        this.selectedTextActions = [];
        this.scalingFactor = 1.0;
        // Selected text mode
        this.selectedText = "";
        // Entity hover mode
        this.entityType = "";
        // Tooltip fixed positioning
        this.bottom = "0px";
        this.left = "0px";
        this.isBottom = false;
        /**
         * Handle mouse button down: reinitilizes selection
         */
        this.handleMouseDown = (event) => {
            //if(event.target !== this.tooltip)
            this.selectedText = "";
            //this.changeDetectorRef.detectChanges();
        };
        /**
         * Handle mouse button up: get the selected text and display a tooltip above it
         */
        this.handleMouseUp = () => {
            const selection = this.document.getSelection();
            this.selectedText = selection ? selection.toString().trim() : "";
            if (selection && this.selectedText) {
                const range = selection.getRangeAt(0);
                //console.log("Selected text: ", text);
                //console.log(event);
                //console.log(range.getBoundingClientRect());
                this.changeDetectorRef.detectChanges(); // Refresh size of tooltip
                this.positionTooltipAbove(range.getBoundingClientRect());
            }
            this.changeDetectorRef.detectChanges();
        };
        this._inTime = 0;
        /**
         * Handle mouse movements. If hovering an entity and no text is selected, will display a tooltip for this entity
         */
        this.handleMouseMove = (event) => {
            if (!this.selectedText && event["path"]) {
                const path = event["path"];
                if (path.length > 0) {
                    const element = path[0];
                    if (element.nodeType === 1 && element.nodeName === "SPAN" && (element.attributes["data-entity-basic"] || element.attributes["data-entity-display"])) {
                        if (this.entityType !== element.className.split(" ")[0] || this.entityDisplay !== element.textContent) { // Tooltip not already displayed
                            this.entityType = element.className.split(" ")[0]; // Update text (and visibility)
                            this.entityDisplay = element.textContent || ""; // Tooltip content
                            const value = element.attributes["data-entity-basic"] || element.attributes["data-entity-display"];
                            this.entityValue = value.value;
                            const highlights = this.previewData.highlightsPerCategory[this.entityType].values
                                .find(v => v.value === value.value);
                            this.entityCount = highlights ? highlights.locations.length : 0;
                            this.entityLabel = this.previewData.highlightsPerCategory[this.entityType].categoryDisplayLabel;
                            const idsplt = element.id.split("_");
                            const idx = parseInt(idsplt[idsplt.length - 1], 10);
                            const entity = this.findEntity(this.entityType, this.entityValue, (_, idIndex) => idIndex === idx);
                            this.entityIdx = entity ? entity.valueIndex : 0;
                            this.changeDetectorRef.detectChanges(); // Refresh size of tooltip
                            this.positionTooltipAbove(element.getBoundingClientRect());
                        }
                        this._inTime = Date.now(); // Reset the timer over an entity
                        return;
                    }
                }
            }
            // We are not hovering an entity
            if (this.entityType) { // If still displaying the tooltip...
                const isOverTooltip = !!event["path"].find(el => el.localName === "sq-preview-tooltip");
                if (!isOverTooltip) {
                    if (Date.now() - this._inTime > 200) { // 200 ms tolerance before closing tooltip
                        this.entityType = "";
                        this.entityValue = "";
                        this.entityDisplay = "";
                        this.entityLabel = "";
                        this.entityCount = 0;
                        this.entityIdx = 0;
                        this.changeDetectorRef.detectChanges(); // Turn off tooltip
                    }
                }
                else {
                    this._inTime = Date.now(); // Reset the timer over the tooltip
                }
            }
        };
        /**
         * Handle scroll events
         */
        this.handleScroll = (event) => {
            if (this.selectedText !== "") {
                this.handleMouseUp(); // Reposition tooltip above selected text
            }
            else if (this.entityType !== "") {
                this.entityType = "";
                this.entityValue = "";
                this.changeDetectorRef.detectChanges(); // Turn off tooltip
            }
        };
    }
    /**
     * Add mouse listeners to a new preview document in order to display the tooltip
     * in response to specific hover of click events
     * @param changes
     */
    ngOnChanges(changes) {
        if (changes["previewDocument"] && !!this.previewDocument) {
            if (typeof this.previewDocument.document.addEventListener !== undefined) {
                this.document.addEventListener("mouseup", this.handleMouseUp, false);
                this.document.addEventListener("mousedown", this.handleMouseDown, false);
                this.document.addEventListener("mousemove", this.handleMouseMove, false);
                this.window.addEventListener("scroll", this.handleScroll, false);
            }
        }
        if (changes["scalingFactor"] && this.previewDocument) {
            setTimeout(() => this.handleMouseUp());
        }
    }
    /**
     * Shortcut to the preview document
     */
    get document() {
        return this.previewDocument.document;
    }
    /**
     * Shortcut to the preview Window
     */
    get window() {
        return this.previewDocument.getContentWindow();
    }
    /**
     * Control the visibility of the tooltip
     */
    get visibility() {
        return (this.selectedText !== "" || this.entityType !== "") ? "visible" : "hidden";
    }
    /**
     * Position the tooltip above a bounding box
     */
    positionTooltipAbove(box) {
        this.zone.run(() => {
            const tooltipWidth = this.tooltip.nativeElement.getBoundingClientRect().width;
            const tooltipHeight = this.tooltip.nativeElement.getBoundingClientRect().height;
            let left = this.scalingFactor * (box.left + 0.5 * box.width) - 0.5 * tooltipWidth;
            left = Math.min(Math.max(left, 0), this.scalingFactor * this.document.body.clientWidth - tooltipWidth); // Avoid tooltip overflow
            this.left = Math.round(left) + "px";
            const leftPin = Math.round(100 * (this.scalingFactor * (box.left + 0.5 * box.width) - left) / tooltipWidth);
            this.leftPin = this.sanitizer.bypassSecurityTrustStyle(`${leftPin}%`);
            //absolute top positioning
            //this.bottom = Math.round(box.top-tooltipHeight-5+this.window.scrollY)+"px";
            //absolute bottom positioning
            //this.bottom = Math.round(this.document.documentElement.clientHeight - this.window.scrollY - box.top + 5)+"px";
            //fixed bottom positioning
            if (Math.round(box.top - 5 - tooltipHeight) > 0) {
                this.isBottom = false;
                this.bottom = Math.round(this.scalingFactor * (this.window.innerHeight - box.top) + 5) + "px";
            }
            else {
                this.isBottom = true;
                this.bottom = Math.round(this.scalingFactor * (this.window.innerHeight - box.top - box.height) - tooltipHeight - 5) + "px";
            }
            this.changeDetectorRef.detectChanges();
        });
    }
    /**
     * Move to the previous entity if possible
     * @param event
     */
    previousEntity(event) {
        event.stopPropagation(); // stop the propagation to avoid triggering the tooltip listeners
        if (this.entityIdx > 1) {
            // Find the index of the previous entity
            const entity = this.findEntity(this.entityType, this.entityValue, (valueIdx, _) => valueIdx === this.entityIdx - 1);
            if (entity) {
                const idx = entity.idIndex;
                this.previewDocument.selectHighlight(this.entityType, idx);
            }
        }
    }
    /**
     * Move to the next entity if possible
     * @param event
     */
    nextEntity(event) {
        event.stopPropagation(); // stop the propagation to avoid triggering the tooltip listeners
        if (this.entityIdx < this.entityCount) {
            // Find the index of the next entity
            const entity = this.findEntity(this.entityType, this.entityValue, (valueIdx, _) => valueIdx === this.entityIdx + 1);
            if (entity) {
                const idx = entity.idIndex;
                this.previewDocument.selectHighlight(this.entityType, idx);
            }
        }
    }
    /**
     * Executes a clicked action button in the context of a tooltip for hovered entities
     * @param action
     * @param event
     */
    entityAction(action, event) {
        event.stopPropagation(); // stop the propagation to avoid triggering the tooltip listeners
        this.zone.run(() => {
            if (action.action) {
                action.action(action, { type: this.entityType, idx: this.entityIdx, value: this.entityValue, display: this.entityDisplay });
            }
        });
    }
    /**
     * Executes a clicked action button in the context of a tooltip for text selection
     * @param action the action to execute
     * @param event
     */
    selectedTextAction(action, event) {
        event.stopPropagation(); // stop the propagation to avoid triggering the tooltip listeners
        this.zone.run(() => {
            if (action.action) {
                action.action(action, { text: this.selectedText });
            }
        });
    }
    /**
     * Helper function to find the indexes of a specific entity *occurrence*. Returns both the index within all
     * of its own occurrences: valueIndex (eg. BILL GATES 3/14) AND the index corresponding to the
     * entity id inside the document: idIndex (eg. id="person_32").
     * @param category eg. person
     * @param value eg. BILL GATES
     * @param predicate function testing whether it is the entity occurrence of interest
     * @returns an object with both indexes
     */
    findEntity(entityType, entityValue, predicate) {
        let currentIdx = 0;
        // For each highlight in the doc
        for (let i = 0; i < this.previewData.highlightsPerLocation['length']; i++) {
            const highlight = this.previewData.highlightsPerLocation[i];
            const categories = Object.keys(highlight.positionInCategories);
            // For each value of the highlight
            for (let j = 0; j < categories.length; j++) {
                // If this is the right entity type and value
                if (categories[j] === entityType && highlight.values[j] === entityValue) {
                    // Increase the counter
                    currentIdx++;
                    // If this is the idx we are looking for, return
                    if (predicate(currentIdx, highlight.positionInCategories[entityType])) {
                        return { valueIndex: currentIdx, idIndex: highlight.positionInCategories[entityType] };
                    }
                }
            }
        }
        return undefined;
    }
}
PreviewTooltip.ɵfac = function PreviewTooltip_Factory(t) { return new (t || PreviewTooltip)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(DomSanitizer)); };
PreviewTooltip.ɵcmp = ɵɵdefineComponent({ type: PreviewTooltip, selectors: [["sq-preview-tooltip"]], viewQuery: function PreviewTooltip_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0$1, true);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tooltip = _t.first);
    } }, inputs: { previewDocument: "previewDocument", previewData: "previewData", entityActions: "entityActions", entityNavActions: "entityNavActions", selectedTextActions: "selectedTextActions", scalingFactor: "scalingFactor" }, features: [ɵɵNgOnChangesFeature], decls: 4, vars: 12, consts: [[1, "sq-selection-tooltip", 3, "ngClass", "ngStyle"], ["tooltip", ""], [4, "ngIf"], [1, "display"], [1, "label"], [1, "index"], [1, "count"], [1, "btn-list"], [3, "disabled", "hidden", "title", "click", 4, "ngFor", "ngForOf"], [1, "nav-btn", "previous", 3, "ngClass", "title", "click"], [1, "nav-btn", "next", 3, "ngClass", "title", "click"], [3, "disabled", "hidden", "title", "click"], [3, "class", 4, "ngIf"], [4, "ngFor", "ngForOf"]], template: function PreviewTooltip_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0, 1);
        ɵɵtemplate(2, PreviewTooltip_ng_container_2_Template, 14, 8, "ng-container", 2);
        ɵɵtemplate(3, PreviewTooltip_ng_container_3_Template, 2, 1, "ng-container", 2);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵstyleProp("--left", ctx.leftPin)("--factor", 1 / ctx.scalingFactor);
        ɵɵproperty("ngClass", ctx.isBottom ? "sq-bottom-tooltip" : "sq-top-tooltip")("ngStyle", ɵɵpureFunction3(8, _c5, ctx.visibility, ctx.bottom, ctx.left));
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.entityType && !ctx.selectedText);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.selectedText);
    } }, directives: [NgClass, NgStyle, NgIf, NgForOf], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(PreviewTooltip, [{
        type: Component,
        args: [{
                selector: "sq-preview-tooltip",
                templateUrl: "./preview-tooltip.component.html"
            }]
    }], function () { return [{ type: NgZone }, { type: ChangeDetectorRef }, { type: DomSanitizer }]; }, { previewDocument: [{
            type: Input
        }], previewData: [{
            type: Input
        }], entityActions: [{
            type: Input
        }], entityNavActions: [{
            type: Input
        }], selectedTextActions: [{
            type: Input
        }], scalingFactor: [{
            type: Input
        }], tooltip: [{
            type: ViewChild,
            args: ['tooltip', { static: false }]
        }] }); })();

const PREVIEW_MODAL = new InjectionToken("PREVIEW_MODAL");
class PreviewService {
    constructor(previewModal, router, previewWebService, appService, authenticationService, searchService, modalService, recentDocumentsService, exprBuilder) {
        this.previewModal = previewModal;
        this.router = router;
        this.previewWebService = previewWebService;
        this.appService = appService;
        this.authenticationService = authenticationService;
        this.searchService = searchService;
        this.modalService = modalService;
        this.recentDocumentsService = recentDocumentsService;
        this.exprBuilder = exprBuilder;
        this._events = new Subject();
        // Subscribe to own events and add documents to the recent documents service
        this.events.subscribe(event => {
            if (event.record && (event.type === "Preview_Modal" /* Modal */ || event.type === "Preview_Route" /* Route */ || event.type === "Preview_Window" /* Window */)) {
                this.recentDocumentsService.addDocument(event.record, false);
            }
        });
    }
    /**
     * Triggers any event among PreviewEvent
     */
    get events() {
        return this._events;
    }
    makeQuery(query) {
        query = Utils.copy(query);
        delete query.sort;
        delete query.scope;
        delete query.tab;
        delete query.basket;
        delete query.page;
        delete query.queryId;
        if (query.select) {
            query.select = query.select.filter(value => Utils.eqNC(value.facet, "refine"));
            if (query.select.length === 0) {
                delete query.select;
            }
        }
        return query;
    }
    getPreviewData(id, query, audit = true) {
        var _a;
        let auditEvent;
        const record = this.searchService.getRecordFromId(id);
        const resultId = record ? (_a = this.searchService.results) === null || _a === void 0 ? void 0 : _a.id : undefined;
        if (audit) {
            auditEvent = {
                type: "Doc_Preview" /* Doc_Preview */,
                detail: this.getAuditPreviewDetail(id, query, record, resultId)
            };
        }
        query = this.makeQuery(query);
        const observable = this.previewWebService.get(id, query, auditEvent);
        Utils.subscribe(observable, (previewData) => {
            previewData.resultId = resultId || "";
            return previewData;
        });
        this._events.next({ type: "Preview_Data" /* Data */, record, query });
        return observable;
    }
    makeDownloadUrl(url) {
        return url ? this.appService.updateUrlForCors(url) : undefined;
    }
    openModal(record, query, model) {
        model.record = record;
        model.query = query;
        this._events.next({ type: "Preview_Modal" /* Modal */, record, query });
        this.modalService.open(this.previewModal, { model });
    }
    getQueryStr(query) {
        query = this.makeQuery(query);
        return query.toJsonForQueryString();
    }
    openNewWindow(record, query) {
        const params = {
            id: record.id,
            query: this.getQueryStr(query),
            app: this.appService.appName
        };
        if (this.authenticationService.userOverrideActive && this.authenticationService.userOverride) {
            params["overrideUser"] = this.authenticationService.userOverride.userName;
            params["overrideDomain"] = this.authenticationService.userOverride.domain;
        }
        const httpParams = Utils.makeHttpParams(params);
        const url = "#/preview?" + httpParams.toString();
        this._events.next({ type: "Preview_Window" /* Window */, record, query });
        return window.open(url, "_blank");
    }
    openRoute(record, query, path = "preview") {
        this._events.next({ type: "Preview_Route" /* Route */, record, query });
        this.rank = record.rank;
        return this.router.navigate([path], {
            queryParams: {
                id: record.id,
                query: this.getQueryStr(query)
            }
        });
    }
    /**
     * Get the page number of a splitted document's record or undefined if
     * it is not in fact splitted. Stores the page number in the record itself ($page property)
     * @param record
     */
    getPageNumber(record) {
        const containerid = record.containerid;
        if (containerid && record.id.startsWith(containerid)) {
            const pageNumberStr = record.id.slice(containerid.length + 1);
            if (/#\d+#/g.test(pageNumberStr)) {
                const pageNumber = parseInt(pageNumberStr.slice(1, pageNumberStr.length - 1), 10);
                if (!isNaN(pageNumber)) {
                    record.$page = pageNumber;
                    return pageNumber;
                }
            }
        }
        return undefined;
    }
    /**
     * Returns the pages of a given record id
     * @param containerid
     * @param query
     */
    fetchPages(containerid, query) {
        query = this.makeQuery(query);
        query.groupBy = ""; // If the query web service uses GROUP BY containerid
        query.addSelect(this.exprBuilder.makeExpr("containerid", containerid));
        return this.searchService.getResults(query);
    }
    getAuditPreviewDetail(id, query, record, resultId) {
        var _a, _b, _c, _d, _e, _f;
        const queryLanguage = ((_b = (_a = this.searchService.results) === null || _a === void 0 ? void 0 : _a.queryAnalysis) === null || _b === void 0 ? void 0 : _b.queryLanguage) || ((_d = (_c = this.searchService) === null || _c === void 0 ? void 0 : _c.query) === null || _d === void 0 ? void 0 : _d.questionLanguage)
            || ((_f = (_e = this.appService) === null || _e === void 0 ? void 0 : _e.ccquery) === null || _f === void 0 ? void 0 : _f.questionLanguage);
        const collectionColumn = record === null || record === void 0 ? void 0 : record.collection;
        const collection = !!collectionColumn ? collectionColumn[0] : Utils.split(id, "|")[0];
        const rank = !!record ? record.rank : this.rank || 0;
        return {
            "doc-id": id,
            rank: rank,
            collection: collection,
            source: Utils.treeFirstNode(collection),
            resultid: resultId,
            querylang: queryLanguage,
            text: query.text,
            filename: record === null || record === void 0 ? void 0 : record.filename,
            fileext: record === null || record === void 0 ? void 0 : record.fileext,
        };
    }
    /**
     * returns document's preview HTML
     * @param url
     * @returns document's preview HTML
     */
    getHtmlPreview(url) {
        return this.previewWebService.getHtmlPreview(url);
    }
}
PreviewService.ɵfac = function PreviewService_Factory(t) { return new (t || PreviewService)(ɵɵinject(PREVIEW_MODAL, 8), ɵɵinject(Router), ɵɵinject(PreviewWebService), ɵɵinject(AppService), ɵɵinject(AuthenticationService), ɵɵinject(SearchService), ɵɵinject(ModalService), ɵɵinject(RecentDocumentsService), ɵɵinject(ExprBuilder)); };
PreviewService.ɵprov = ɵɵdefineInjectable({ token: PreviewService, factory: PreviewService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(PreviewService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: Type, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [PREVIEW_MODAL]
            }] }, { type: Router }, { type: PreviewWebService }, { type: AppService }, { type: AuthenticationService }, { type: SearchService }, { type: ModalService }, { type: RecentDocumentsService }, { type: ExprBuilder }]; }, null); })();

class PreviewModule {
    static forRoot(previewModal) {
        return {
            ngModule: PreviewModule,
            providers: [
                { provide: PREVIEW_MODAL, useValue: previewModal },
            ]
        };
    }
}
PreviewModule.ɵmod = ɵɵdefineNgModule({ type: PreviewModule });
PreviewModule.ɵinj = ɵɵdefineInjector({ factory: function PreviewModule_Factory(t) { return new (t || PreviewModule)(); }, imports: [[
            CommonModule,
            IntlModule,
            WebServicesModule,
            UtilsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(PreviewModule, { declarations: [PreviewDocumentIframe, PreviewTooltip], imports: [CommonModule,
        IntlModule,
        WebServicesModule,
        UtilsModule], exports: [PreviewDocumentIframe, PreviewTooltip] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(PreviewModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    IntlModule,
                    WebServicesModule,
                    UtilsModule
                ],
                declarations: [
                    PreviewDocumentIframe, PreviewTooltip
                ],
                exports: [
                    PreviewDocumentIframe, PreviewTooltip
                ],
            }]
    }], null, null); })();

const _c0$2 = function (a0) { return { height: a0 }; };
function BsFacetPreview_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 2);
    ɵɵelementStart(1, "sq-preview-document-iframe", 3);
    ɵɵlistener("onPreviewReady", function BsFacetPreview_div_0_Template_sq_preview_document_iframe_onPreviewReady_1_listener($event) { ɵɵrestoreView(_r4); const ctx_r3 = ɵɵnextContext(); return ctx_r3.document = $event; });
    ɵɵelement(2, "sq-preview-tooltip", 4, 5);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMapInterpolate1("d-flex flex-column ", ctx_r0.iframeClass, "");
    ɵɵproperty("ngStyle", ɵɵpureFunction1(8, _c0$2, ctx_r0.height));
    ɵɵadvance(1);
    ɵɵproperty("sandbox", ctx_r0.sandbox)("downloadUrl", ctx_r0.downloadUrl);
    ɵɵadvance(1);
    ɵɵproperty("previewDocument", ctx_r0.document)("previewData", ctx_r0.data);
} }
function BsFacetPreview_ul_1_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 8);
    ɵɵelement(1, "sq-result-title", 9);
    ɵɵelementStart(2, "div", 10);
    ɵɵelementStart(3, "span", 11);
    ɵɵtext(4);
    ɵɵpipe(5, "number");
    ɵɵelementEnd();
    ɵɵelementStart(6, "a", 12);
    ɵɵlistener("click", function BsFacetPreview_ul_1_li_1_Template_a_click_6_listener() { ɵɵrestoreView(_r8); const doc_r6 = ctx.$implicit; const ctx_r7 = ɵɵnextContext(2); return ctx_r7.openSimilarDoc(doc_r6); });
    ɵɵelement(7, "i", 13);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const doc_r6 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵproperty("record", doc_r6)("titleLinkBehavior", "open");
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind2(5, 3, 100 * doc_r6.globalrelevance, "1.0-0"));
} }
function BsFacetPreview_ul_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "ul", 6);
    ɵɵtemplate(1, BsFacetPreview_ul_1_li_1_Template, 8, 6, "li", 7);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r1.similarDocuments);
} }
class BsFacetPreview {
    constructor(previewService) {
        this.previewService = previewService;
        this.recordOpened = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes["record"] || changes["query"]) {
            this.previewService.getPreviewData(this.record.id, this.query).subscribe(previewData => {
                this.data = previewData;
                this.downloadUrl = this.data ? this.previewService.makeDownloadUrl(this.data.documentCachedContentUrl) : undefined;
            });
        }
    }
    openSimilarDoc(doc) {
        this.recordOpened.next({
            record: doc,
            query: this.query,
            startSmall: true,
            iframeClass: this.iframeClass
        });
        return false;
    }
}
BsFacetPreview.ɵfac = function BsFacetPreview_Factory(t) { return new (t || BsFacetPreview)(ɵɵdirectiveInject(PreviewService)); };
BsFacetPreview.ɵcmp = ɵɵdefineComponent({ type: BsFacetPreview, selectors: [["sq-facet-preview"]], inputs: { record: "record", sandbox: "sandbox", query: "query", height: "height", iframeClass: "iframeClass", similarDocuments: "similarDocuments" }, outputs: { recordOpened: "recordOpened" }, features: [ɵɵNgOnChangesFeature], decls: 2, vars: 2, consts: [[3, "class", "ngStyle", 4, "ngIf"], ["class", "list-group", 4, "ngIf"], [3, "ngStyle"], [3, "sandbox", "downloadUrl", "onPreviewReady"], [3, "previewDocument", "previewData"], ["tooltip", ""], [1, "list-group"], ["class", "list-group-item d-flex justify-content-between align-items-center", "style", "background-color: transparent;", 4, "ngFor", "ngForOf"], [1, "list-group-item", "d-flex", "justify-content-between", "align-items-center", 2, "background-color", "transparent"], [3, "record", "titleLinkBehavior"], [1, "d-flex"], [1, "badge", "badge-pill", "badge-secondary", 2, "padding-top", "5px"], ["href", "#", "title", "Open document in workspace", 1, "open-record", "ml-2", 3, "click"], [1, "fas", "fa-arrow-circle-right"]], template: function BsFacetPreview_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsFacetPreview_div_0_Template, 4, 10, "div", 0);
        ɵɵtemplate(1, BsFacetPreview_ul_1_Template, 2, 1, "ul", 1);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !ctx.similarDocuments);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", !!ctx.similarDocuments);
    } }, directives: [NgIf, NgStyle, PreviewDocumentIframe, PreviewTooltip, NgForOf, ResultTitle], pipes: [DecimalPipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsFacetPreview, [{
        type: Component,
        args: [{
                selector: "sq-facet-preview",
                templateUrl: "./facet-preview.html",
            }]
    }], function () { return [{ type: PreviewService }]; }, { record: [{
            type: Input
        }], sandbox: [{
            type: Input
        }], query: [{
            type: Input
        }], height: [{
            type: Input
        }], iframeClass: [{
            type: Input
        }], similarDocuments: [{
            type: Input
        }], recordOpened: [{
            type: Output
        }] }); })();

function BsFacetPreviewComponent2_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "sq-result-title", 4);
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("record", ctx_r1.record)("originalDocTarget", ctx_r1.originalDocTarget);
} }
function BsFacetPreviewComponent2_ng_template_4_sq_metadata_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "sq-metadata", 6);
} if (rf & 2) {
    const ctx_r4 = ɵɵnextContext(2);
    ɵɵproperty("record", ctx_r4.record)("items", ctx_r4.metadata)("showTitles", true)("showIcons", true)("clickable", false);
} }
function BsFacetPreviewComponent2_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵtemplate(0, BsFacetPreviewComponent2_ng_template_4_sq_metadata_0_Template, 1, 5, "sq-metadata", 5);
} if (rf & 2) {
    const ctx_r3 = ɵɵnextContext();
    ɵɵproperty("ngIf", ctx_r3.metadata && ctx_r3.metadata.length > 0);
} }
const _c0$3 = function () { return { "height.%": 100 }; };
class BsFacetPreviewComponent2 extends AbstractFacet {
    constructor(previewService) {
        super();
        this.previewService = previewService;
        this.height = 500;
        this.scalingFactor = 0.6;
        this.metadata = [];
        this.expandModal = true;
        this.closable = true;
        this.highlightActions = true;
        this.recordClosed = new EventEmitter();
        this.previewLoaded = new EventEmitter();
        this._height = this.height;
        this.scaleFactorThreshold = 0.1;
        this.loaded = false;
        this.closeAction = new Action({
            icon: "fas fa-times",
            title: "msg#facet.preview.closeTitle",
            action: () => {
                this.recordClosed.next();
            }
        });
        this.expandModalAction = new Action({
            icon: "far fa-window-maximize",
            title: "msg#facet.preview.expandTitle",
            action: () => {
                this.previewService.openModal(this.record, this.query, {
                    displaySimilarDocuments: false,
                    metadata: this.metadata
                });
            }
        });
        this.toggleEntitiesAction = new Action({
            icon: "fas fa-lightbulb",
            title: "msg#facet.preview.toggleEntities",
            selected: true,
            action: (action) => {
                var _a;
                action.selected = !action.selected;
                if ((_a = this.data) === null || _a === void 0 ? void 0 : _a.highlightsPerCategory) {
                    Object.keys(this.data.highlightsPerCategory)
                        .filter(value => value !== "extractslocations" && value !== "matchlocations")
                        .forEach(cat => { var _a; return (_a = this.document) === null || _a === void 0 ? void 0 : _a.toggleHighlight(cat, action.selected); });
                }
            }
        });
        this.toggleExtractsAction = new Action({
            icon: "fas fa-highlighter",
            title: "msg#facet.preview.toggleExtracts",
            selected: true,
            action: (action) => {
                var _a, _b;
                action.selected = !action.selected;
                (_a = this.document) === null || _a === void 0 ? void 0 : _a.toggleHighlight("matchlocations", action.selected);
                (_b = this.document) === null || _b === void 0 ? void 0 : _b.toggleHighlight("extractslocations", action.selected);
            }
        });
        this.maximizeAction = new Action({
            icon: "fas fa-search-plus",
            title: "msg#facet.preview.maximize",
            action: () => {
                this.scalingFactor = this.scalingFactor + this.scaleFactorThreshold;
            }
        });
        this.minimizeAction = new Action({
            icon: "fas fa-search-minus",
            title: "msg#facet.preview.minimize",
            disabled: this.scalingFactor === 0.1,
            action: () => {
                this.scalingFactor = Math.round(Math.max(0.1, this.scalingFactor - this.scaleFactorThreshold) * 100) / 100;
            },
            updater: (action) => {
                action.disabled = this.scalingFactor === 0.1;
            }
        });
    }
    get actions() {
        const actions = [];
        if (this.customActions) {
            actions.push(...this.customActions);
        }
        if (this.highlightActions) {
            actions.push(this.toggleExtractsAction, this.toggleEntitiesAction);
        }
        this.minimizeAction.update();
        actions.push(this.minimizeAction, this.maximizeAction);
        if (this.expandModal) {
            actions.push(this.expandModalAction);
        }
        if (this.closable) {
            actions.push(this.closeAction);
        }
        return actions;
    }
    ngOnChanges(changes) {
        if (changes["record"]) {
            this.previewService.getPreviewData(this.record.id, this.query).subscribe(previewData => {
                this.data = previewData;
                this.downloadUrl = this.data ? this.previewService.makeDownloadUrl(this.data.documentCachedContentUrl) : undefined;
            });
            this.downloadUrl = undefined;
            this.data = undefined;
            this.document = undefined;
        }
        if (changes["height"] || changes["scalingFactor"]) {
            this._height = this.height;
        }
    }
    ngAfterViewChecked() {
        if (this.document && this.loaded) {
            this.loaded = false;
            // as now view is checked, emit event
            this.previewLoaded.emit(this.document);
        }
    }
    onPreviewReady(document) {
        this.document = document;
        if (this.document && this.filters) {
            this.document.filterHighlights(this.filters);
        }
        this.loaded = true;
    }
}
BsFacetPreviewComponent2.ɵfac = function BsFacetPreviewComponent2_Factory(t) { return new (t || BsFacetPreviewComponent2)(ɵɵdirectiveInject(PreviewService)); };
BsFacetPreviewComponent2.ɵcmp = ɵɵdefineComponent({ type: BsFacetPreviewComponent2, selectors: [["sq-facet-preview-2"]], hostVars: 2, hostBindings: function BsFacetPreviewComponent2_HostBindings(rf, ctx) { if (rf & 2) {
        ɵɵstyleProp("height", ctx._height, "px");
    } }, inputs: { record: "record", query: "query", iframeClass: "iframeClass", sandbox: "sandbox", height: "height", scalingFactor: "scalingFactor", metadata: "metadata", expandModal: "expandModal", closable: "closable", highlightActions: "highlightActions", customActions: "customActions", filters: "filters", originalDocTarget: "originalDocTarget" }, outputs: { recordClosed: "recordClosed", previewLoaded: "previewLoaded" }, features: [ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature], decls: 6, vars: 8, consts: [[3, "ngStyle"], [3, "sandbox", "downloadUrl", "scalingFactor", "onPreviewReady"], ["headerTpl", ""], ["subHeaderTpl", ""], ["titleLinkBehavior", "open-if-url", 1, "flex-grow-1", "flex-basis-0", 3, "record", "originalDocTarget"], [3, "record", "items", "showTitles", "showIcons", "clickable", 4, "ngIf"], [3, "record", "items", "showTitles", "showIcons", "clickable"]], template: function BsFacetPreviewComponent2_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "sq-preview-document-iframe", 1);
        ɵɵlistener("onPreviewReady", function BsFacetPreviewComponent2_Template_sq_preview_document_iframe_onPreviewReady_1_listener($event) { return ctx.onPreviewReady($event); });
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵtemplate(2, BsFacetPreviewComponent2_ng_template_2_Template, 1, 2, "ng-template", null, 2, ɵɵtemplateRefExtractor);
        ɵɵtemplate(4, BsFacetPreviewComponent2_ng_template_4_Template, 1, 1, "ng-template", null, 3, ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        ɵɵclassMapInterpolate1("d-flex flex-column ", ctx.iframeClass, "");
        ɵɵproperty("ngStyle", ɵɵpureFunction0(7, _c0$3));
        ɵɵadvance(1);
        ɵɵproperty("sandbox", ctx.sandbox)("downloadUrl", ctx.downloadUrl)("scalingFactor", ctx.scalingFactor);
    } }, directives: [NgStyle, PreviewDocumentIframe, ResultTitle, NgIf, Metadata], styles: ["[_nghost-%COMP%]{display:block;overflow:hidden}.sq-app-loading[_ngcontent-%COMP%]{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsFacetPreviewComponent2, [{
        type: Component,
        args: [{
                selector: 'sq-facet-preview-2',
                templateUrl: './facet-preview.component.html',
                styleUrls: ['./facet-preview.component.scss']
            }]
    }], function () { return [{ type: PreviewService }]; }, { record: [{
            type: Input
        }], query: [{
            type: Input
        }], iframeClass: [{
            type: Input
        }], sandbox: [{
            type: Input
        }], height: [{
            type: Input
        }], scalingFactor: [{
            type: Input
        }], metadata: [{
            type: Input
        }], expandModal: [{
            type: Input
        }], closable: [{
            type: Input
        }], highlightActions: [{
            type: Input
        }], customActions: [{
            type: Input
        }], filters: [{
            type: Input
        }], originalDocTarget: [{
            type: Input
        }], recordClosed: [{
            type: Output
        }], previewLoaded: [{
            type: Output
        }], _height: [{
            type: HostBinding,
            args: ['style.height.px']
        }] }); })();

function BsPreviewHighlights_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 4);
    ɵɵtext(2);
    ɵɵpipe(3, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(3, 1, "msg#preview.noEntityToHighlight"), " ");
} }
function BsPreviewHighlights_ng_template_5_div_6_span_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵelement(1, "span");
    ɵɵelementStart(2, "span", 30);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const categoryId_r9 = ctx.$implicit;
    const ctx_r8 = ɵɵnextContext(3);
    ɵɵadvance(1);
    ɵɵclassMapInterpolate2("fas fa-bullseye ", ctx_r8.categoryIconClass(categoryId_r9), " ", categoryId_r9, "");
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind2(4, 5, ctx_r8.categoryDisplayLabel(categoryId_r9), ctx_r8.categoryLabelPipeParams(categoryId_r9)));
} }
function BsPreviewHighlights_ng_template_5_div_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 26);
    ɵɵelementStart(1, "div", 27);
    ɵɵtemplate(2, BsPreviewHighlights_ng_template_5_div_6_span_2_Template, 5, 8, "span", 28);
    ɵɵelementEnd();
    ɵɵelement(3, "div", 29);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r3.currentCategories);
    ɵɵadvance(1);
    ɵɵproperty("innerHTML", ctx_r3.currentValue, ɵɵsanitizeHtml);
} }
function BsPreviewHighlights_ng_template_5_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 31);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementStart(3, "div");
    ɵɵtext(4, "\u00A0");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(2, 1, "msg#preview.noSelectedHighlight"), " ");
} }
function BsPreviewHighlights_ng_template_5_div_36_Template(rf, ctx) { if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 32);
    ɵɵelement(1, "div", 33);
    ɵɵelement(2, "div", 33);
    ɵɵelementStart(3, "div", 34);
    ɵɵelementStart(4, "div", 35);
    ɵɵelementStart(5, "button", 36);
    ɵɵlistener("click", function BsPreviewHighlights_ng_template_5_div_36_Template_button_click_5_listener() { ɵɵrestoreView(_r11); const ctx_r10 = ɵɵnextContext(2); return ctx_r10.selectAll(); });
    ɵɵpipe(6, "sqMessage");
    ɵɵelement(7, "span", 37);
    ɵɵtext(8);
    ɵɵpipe(9, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(10, "div", 35);
    ɵɵelementStart(11, "button", 36);
    ɵɵlistener("click", function BsPreviewHighlights_ng_template_5_div_36_Template_button_click_11_listener() { ɵɵrestoreView(_r11); const ctx_r12 = ɵɵnextContext(2); return ctx_r12.selectNone(); });
    ɵɵpipe(12, "sqMessage");
    ɵɵelement(13, "span", 38);
    ɵɵtext(14);
    ɵɵpipe(15, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = ɵɵnextContext(2);
    ɵɵadvance(5);
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(6, 6, "msg#preview.highlightFilters.keepAll"));
    ɵɵproperty("disabled", !ctx_r6.previewReady || ctx_r6.allSelected);
    ɵɵadvance(3);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(9, 8, "msg#preview.highlightFilters.keepAll"), " ");
    ɵɵadvance(3);
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(12, 10, "msg#preview.highlightFilters.keepNone"));
    ɵɵproperty("disabled", !ctx_r6.previewReady || ctx_r6.noneSelected);
    ɵɵadvance(3);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(15, 12, "msg#preview.highlightFilters.keepNone"), " ");
} }
function BsPreviewHighlights_ng_template_5_div_38_ng_container_7_option_11_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "option", 45);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const entityValue_r18 = ctx.$implicit;
    const ctx_r17 = ɵɵnextContext(4);
    ɵɵproperty("ngValue", ctx_r17.newFilter(entityValue_r18.value));
    ɵɵadvance(1);
    ɵɵtextInterpolate(entityValue_r18.displayValue);
} }
function BsPreviewHighlights_ng_template_5_div_38_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    const _r20 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "select", 44);
    ɵɵlistener("ngModelChange", function BsPreviewHighlights_ng_template_5_div_38_ng_container_7_Template_select_ngModelChange_1_listener($event) { ɵɵrestoreView(_r20); const categoryId_r13 = ɵɵnextContext().$implicit; const ctx_r19 = ɵɵnextContext(2); return (ctx_r19.navigationState.filters[categoryId_r13] = $event); })("ngModelChange", function BsPreviewHighlights_ng_template_5_div_38_ng_container_7_Template_select_ngModelChange_1_listener($event) { ɵɵrestoreView(_r20); const categoryId_r13 = ɵɵnextContext().$implicit; const ctx_r22 = ɵɵnextContext(2); return ctx_r22.selectFilter(categoryId_r13, $event); });
    ɵɵelementStart(2, "option", 45);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵpipe(5, "sqNumber");
    ɵɵelementEnd();
    ɵɵelementStart(6, "option", 45);
    ɵɵtext(7);
    ɵɵpipe(8, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementStart(9, "option", 46);
    ɵɵtext(10, "\u00A0");
    ɵɵelementEnd();
    ɵɵtemplate(11, BsPreviewHighlights_ng_template_5_div_38_ng_container_7_option_11_Template, 2, 2, "option", 47);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const categoryId_r13 = ɵɵnextContext().$implicit;
    const ctx_r14 = ɵɵnextContext(2);
    let tmp_3_0 = null;
    let tmp_5_0 = null;
    let tmp_6_0 = null;
    ɵɵadvance(1);
    ɵɵproperty("ngModel", ctx_r14.navigationState.filters[categoryId_r13])("compareWith", ctx_r14.compareFilters);
    ɵɵadvance(1);
    ɵɵproperty("ngValue", ctx_r14.keepAllFilter);
    ɵɵadvance(1);
    ɵɵtextInterpolate2("", ɵɵpipeBind1(4, 8, (tmp_3_0 = ctx_r14.getCategoryHighlightData(categoryId_r13)) == null ? null : tmp_3_0.categoryFilterAllLabel), " (", ɵɵpipeBind1(5, 10, ctx_r14.getHighlightValueCount(categoryId_r13)), ")");
    ɵɵadvance(3);
    ɵɵproperty("ngValue", ctx_r14.keepNoneFilter);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(8, 12, (tmp_5_0 = ctx_r14.getCategoryHighlightData(categoryId_r13)) == null ? null : tmp_5_0.categoryFilterNoneLabel));
    ɵɵadvance(4);
    ɵɵproperty("ngForOf", (tmp_6_0 = ctx_r14.getCategoryHighlightData(categoryId_r13)) == null ? null : tmp_6_0.values);
} }
function BsPreviewHighlights_ng_template_5_div_38_ng_template_8_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const displayValue_r26 = ctx.ngIf;
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" (", displayValue_r26, ") ");
} }
function BsPreviewHighlights_ng_template_5_div_38_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    const _r28 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "select", 44);
    ɵɵlistener("ngModelChange", function BsPreviewHighlights_ng_template_5_div_38_ng_template_8_Template_select_ngModelChange_0_listener($event) { ɵɵrestoreView(_r28); const categoryId_r13 = ɵɵnextContext().$implicit; const ctx_r27 = ɵɵnextContext(2); return (ctx_r27.navigationState.filters[categoryId_r13] = $event); })("ngModelChange", function BsPreviewHighlights_ng_template_5_div_38_ng_template_8_Template_select_ngModelChange_0_listener($event) { ɵɵrestoreView(_r28); const categoryId_r13 = ɵɵnextContext().$implicit; const ctx_r30 = ɵɵnextContext(2); return ctx_r30.selectFilter(categoryId_r13, $event); });
    ɵɵelementStart(1, "option", 45);
    ɵɵtext(2);
    ɵɵpipe(3, "sqMessage");
    ɵɵtemplate(4, BsPreviewHighlights_ng_template_5_div_38_ng_template_8_ng_container_4_Template, 2, 1, "ng-container", 48);
    ɵɵelementEnd();
    ɵɵelementStart(5, "option", 45);
    ɵɵtext(6);
    ɵɵpipe(7, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const categoryId_r13 = ɵɵnextContext().$implicit;
    const ctx_r16 = ɵɵnextContext(2);
    let tmp_3_0 = null;
    let tmp_4_0 = null;
    let tmp_6_0 = null;
    ɵɵproperty("ngModel", ctx_r16.navigationState.filters[categoryId_r13])("compareWith", ctx_r16.compareFilters);
    ɵɵadvance(1);
    ɵɵproperty("ngValue", ctx_r16.keepAllFilter);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(3, 7, (tmp_3_0 = ctx_r16.getCategoryHighlightData(categoryId_r13)) == null ? null : tmp_3_0.categoryFilterAllLabel), " ");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", (tmp_4_0 = ctx_r16.getCategoryHighlightData(categoryId_r13)) == null ? null : tmp_4_0.values[0].displayValue);
    ɵɵadvance(1);
    ɵɵproperty("ngValue", ctx_r16.keepNoneFilter);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(7, 9, (tmp_6_0 = ctx_r16.getCategoryHighlightData(categoryId_r13)) == null ? null : tmp_6_0.categoryFilterNoneLabel));
} }
function BsPreviewHighlights_ng_template_5_div_38_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 39);
    ɵɵelementStart(1, "div", 40);
    ɵɵelement(2, "span");
    ɵɵelementEnd();
    ɵɵelementStart(3, "div", 41);
    ɵɵtext(4);
    ɵɵpipe(5, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementStart(6, "div", 42);
    ɵɵtemplate(7, BsPreviewHighlights_ng_template_5_div_38_ng_container_7_Template, 12, 14, "ng-container", 2);
    ɵɵtemplate(8, BsPreviewHighlights_ng_template_5_div_38_ng_template_8_Template, 8, 11, "ng-template", null, 43, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const categoryId_r13 = ctx.$implicit;
    const _r15 = ɵɵreference(9);
    const ctx_r7 = ɵɵnextContext(2);
    let tmp_1_0 = null;
    ɵɵadvance(2);
    ɵɵclassMapInterpolate2("fas fa-bullseye ", ctx_r7.categoryIconClass(categoryId_r13), " ", categoryId_r13, "");
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind2(5, 7, (tmp_1_0 = ctx_r7.getCategoryHighlightData(categoryId_r13)) == null ? null : tmp_1_0.categoryDisplayLabelPlural, ctx_r7.categoryLabelPipeParams(categoryId_r13)), ": ");
    ɵɵadvance(3);
    ɵɵproperty("ngIf", ctx_r7.categoryHasMultipleValues(categoryId_r13))("ngIfElse", _r15);
} }
function BsPreviewHighlights_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    const _r34 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 5);
    ɵɵelementStart(1, "div", 6);
    ɵɵelementStart(2, "div", 7);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementStart(5, "div", 8);
    ɵɵtemplate(6, BsPreviewHighlights_ng_template_5_div_6_Template, 4, 2, "div", 9);
    ɵɵtemplate(7, BsPreviewHighlights_ng_template_5_ng_template_7_Template, 5, 3, "ng-template", null, 10, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(9, "div", 11);
    ɵɵelementStart(10, "button", 12);
    ɵɵlistener("click", function BsPreviewHighlights_ng_template_5_Template_button_click_10_listener() { ɵɵrestoreView(_r34); const ctx_r33 = ɵɵnextContext(); return ctx_r33.first(); });
    ɵɵpipe(11, "sqMessage");
    ɵɵelement(12, "span", 13);
    ɵɵelementEnd();
    ɵɵelementStart(13, "button", 12);
    ɵɵlistener("click", function BsPreviewHighlights_ng_template_5_Template_button_click_13_listener() { ɵɵrestoreView(_r34); const ctx_r35 = ɵɵnextContext(); return ctx_r35.previous(); });
    ɵɵpipe(14, "sqMessage");
    ɵɵelement(15, "span", 14);
    ɵɵelementEnd();
    ɵɵelementStart(16, "div", 15);
    ɵɵelementStart(17, "span", 16);
    ɵɵtext(18);
    ɵɵpipe(19, "sqNumber");
    ɵɵpipe(20, "sqNumber");
    ɵɵelementEnd();
    ɵɵelementStart(21, "span", 17);
    ɵɵtext(22);
    ɵɵpipe(23, "sqNumber");
    ɵɵpipe(24, "sqNumber");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(25, "button", 12);
    ɵɵlistener("click", function BsPreviewHighlights_ng_template_5_Template_button_click_25_listener() { ɵɵrestoreView(_r34); const ctx_r36 = ɵɵnextContext(); return ctx_r36.next(); });
    ɵɵpipe(26, "sqMessage");
    ɵɵelement(27, "span", 18);
    ɵɵelementEnd();
    ɵɵelementStart(28, "button", 12);
    ɵɵlistener("click", function BsPreviewHighlights_ng_template_5_Template_button_click_28_listener() { ɵɵrestoreView(_r34); const ctx_r37 = ɵɵnextContext(); return ctx_r37.last(); });
    ɵɵpipe(29, "sqMessage");
    ɵɵelement(30, "span", 19);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(31, "div", 20);
    ɵɵelementStart(32, "div", 21);
    ɵɵelement(33, "span", 22);
    ɵɵtext(34);
    ɵɵpipe(35, "sqMessage");
    ɵɵelementEnd();
    ɵɵtemplate(36, BsPreviewHighlights_ng_template_5_div_36_Template, 16, 14, "div", 23);
    ɵɵelementStart(37, "div", 24);
    ɵɵtemplate(38, BsPreviewHighlights_ng_template_5_div_38_Template, 10, 10, "div", 25);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const _r4 = ɵɵreference(8);
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(3);
    ɵɵtextInterpolate1("", ɵɵpipeBind1(4, 18, "msg#preview.selectedHighlight"), ":");
    ɵɵadvance(3);
    ɵɵproperty("ngIf", ctx_r2.currentValue || ctx_r2.currentCategories)("ngIfElse", _r4);
    ɵɵadvance(4);
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(11, 20, "msg#preview.firstHighlightButtonAltText"));
    ɵɵproperty("disabled", !ctx_r2.previewReady);
    ɵɵadvance(3);
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(14, 22, "msg#preview.previousHighlightButtonAltText"));
    ɵɵproperty("disabled", !ctx_r2.previewReady);
    ɵɵadvance(5);
    ɵɵtextInterpolate2("", ɵɵpipeBind1(19, 24, ctx_r2.current), " / ", ɵɵpipeBind1(20, 26, ctx_r2.total), "");
    ɵɵadvance(4);
    ɵɵtextInterpolate2("", ɵɵpipeBind1(23, 28, ctx_r2.total), " / ", ɵɵpipeBind1(24, 30, ctx_r2.total), "");
    ɵɵadvance(3);
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(26, 32, "msg#preview.nextHighlightButtonAltText"));
    ɵɵproperty("disabled", !ctx_r2.previewReady);
    ɵɵadvance(3);
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(29, 34, "msg#preview.lastHighlightButtonAltText"));
    ɵɵproperty("disabled", !ctx_r2.previewReady);
    ɵɵadvance(6);
    ɵɵtextInterpolate1("", ɵɵpipeBind1(35, 36, "msg#preview.highlightFilters.title"), " ");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r2.nonEmptyCategoryIds.length > 1);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r2.nonEmptyCategoryIds);
} }
class BsPreviewHighlights {
    constructor() {
        // Entity filters
        // Trivial filters
        this.keepAllFilter = new SimpleHighlightCategoryFilterState();
        this.keepNoneFilter = new SimpleHighlightCategoryFilterState(HighlightCategoryFilterChoice.None);
    }
    ngOnChanges(changes) {
        if (changes["previewData"]) {
            this.initialize();
        }
        if (changes["previewDocument"]) {
            if (this.previewReady) {
                this.moveToFirstSearchTerm();
            }
        }
    }
    initialize() {
        this.highlightDataPerCategory = !this.previewData ? undefined : this.previewData.highlightsPerCategory;
        this.highlightDataPerLocation = !this.previewData ? undefined : this.previewData.highlightsPerLocation;
        this.navigationState = new SimpleHighlightNavigationState(this.nonEmptyCategoryIds);
        this.reset();
    }
    /**
     * Called on init and when non-value filters are clicked
     * Resets the navigationState entity selection.
     * Applies the filters to the preview document.
     * Updates the filtered data.
     */
    reset() {
        this.navigationState.current = -1; // Resets the navigationState entity selection.
        if (this.previewReady) // Applies the filters to the preview document.
            this.previewDocument.filterHighlights(this.navigationState.filters);
        // Updates the filtered data.
        this.filteredHighlightData = this.highlightDataPerLocation ?
            new FilteredHighlightDataPerLocation(this.highlightDataPerLocation, this.navigationState.filters) : undefined;
    }
    /**
     * Selects the first match location (highlight classes and scrolls to it)
     */
    moveToFirstSearchTerm() {
        if (this.filteredHighlightData) {
            for (let i = 0, ic = this.total; i < ic; i++) {
                const highlight = this.filteredHighlightData[i];
                if (highlight.positionInCategories) {
                    let category = "term1";
                    let position = highlight.positionInCategories[category];
                    if (!Utils.isNumber(position)) {
                        category = "matchlocations";
                        position = highlight.positionInCategories[category];
                    }
                    if (Utils.isNumber(position)) {
                        this.navigationState.current = i;
                        this.previewDocument.selectHighlight(category, position);
                        break;
                    }
                }
            }
        }
    }
    /**
     * Index of currently selected entity (from 1)
     */
    get current() {
        return this.navigationState.current + 1;
    }
    /**
     * No categories to highlight
     */
    get noData() {
        return this.nonEmptyCategoryIds.length === 0;
    }
    /**
     * Total number of highlights
     */
    get total() {
        return this.filteredHighlightData ? this.filteredHighlightData.size() : 0;
    }
    /**
     * @returns true when the document is ready to be interacted with
     */
    get previewReady() {
        return !!this.previewDocument;
    }
    /**
     * Returns the currently selected entity/match/extract based on the PreviewData
     * or potentially by fetching it directly from the HTML document.
     */
    get currentValue() {
        if (this.navigationState.current < 0 || !this.filteredHighlightData) {
            return "";
        }
        const result = this.filteredHighlightData[this.navigationState.current].displayValue;
        if (result) {
            return result;
        }
        const values = this.filteredHighlightData[this.navigationState.current].values;
        if (values && values.length > 0 && values[0] && values[0].length > 0) {
            return values[0];
        }
        if (Object.keys(this.filteredHighlightData[this.navigationState.current].positionInCategories).length === 1
            && this.filteredHighlightData[this.navigationState.current].positionInCategories["extractslocations"]) {
            return this.previewDocument.getHighlightText("extractslocations", this.filteredHighlightData[this.navigationState.current].positionInCategories["extractslocations"]);
        }
        return "";
    }
    /**
     * Get categories of the currently selected entity/match/extract
     * based on the filtered Highlight data per location
     */
    get currentCategories() {
        const result = [];
        if (this.navigationState.current < 0 || !this.filteredHighlightData || this.navigationState.current >= this.filteredHighlightData.size()) {
            return result;
        }
        for (const categoryId in this.filteredHighlightData[this.navigationState.current].positionInCategories) {
            result.push(categoryId);
        }
        return result;
    }
    categoryIconClass(categoryId) {
        if (categoryId.startsWith("term")) {
            return "far fa-flag";
        }
        return "sq-icon-" + categoryId;
    }
    getCategoryHighlightData(categoryId) {
        return this.highlightDataPerCategory ? this.highlightDataPerCategory[categoryId] : undefined;
    }
    categoryDisplayLabel(categoryId) {
        return this.highlightDataPerCategory ? this.highlightDataPerCategory[categoryId].categoryDisplayLabel : "";
    }
    categoryLabelPipeParams(categoryId) {
        if (!categoryId.startsWith("term")) {
            return {};
        }
        const index = Number(categoryId.slice("term".length));
        if (isNaN(index)) {
            return {};
        }
        return { values: { index: index } };
    }
    /**
     * Returns the list of entity categories that contain values
     */
    get nonEmptyCategoryIds() {
        const result = [];
        for (const categoryId in this.highlightDataPerCategory) {
            if (!this.categoryIsEmpty(categoryId, this.highlightDataPerCategory)) {
                result.push(categoryId);
            }
        }
        return result;
    }
    categoryIsEmpty(categoryId, highlightData) {
        return highlightData[categoryId] == null
            || highlightData[categoryId].values == null
            || highlightData[categoryId].values.length <= 0;
    }
    /**
     * @returns true if there is more than one option per category
     * @param categoryId the category id
     */
    categoryHasMultipleValues(categoryId) {
        return this.getHighlightValueCount(categoryId) > 1;
    }
    /**
     * @returns the number of options per category
     * @param categoryId the category id
     */
    getHighlightValueCount(categoryId) {
        if (!this.highlightDataPerCategory || this.categoryIsEmpty(categoryId, this.highlightDataPerCategory)) {
            return 0;
        }
        const values = this.highlightDataPerCategory[categoryId].values;
        if (values == null) {
            return 0;
        }
        return values.length;
    }
    // Navigation buttons handlers
    first() {
        if (this.navigationState.current > 0) {
            this.navigationState.current = 0;
            this.selectHighlight();
        }
    }
    previous() {
        if (this.navigationState.current > 0) {
            this.navigationState.current--;
            this.selectHighlight();
        }
    }
    next() {
        if (this.navigationState.current < this.total - 1) {
            this.navigationState.current++;
            this.selectHighlight();
        }
    }
    last() {
        if (this.navigationState.current !== this.total - 1) {
            this.navigationState.current = this.total - 1;
            this.selectHighlight();
        }
    }
    selectHighlight() {
        if (this.filteredHighlightData) {
            const positionInCategories = this.filteredHighlightData[this.navigationState.current].positionInCategories;
            const firstCategory = Object.keys(positionInCategories)[0];
            this.previewDocument.selectHighlight(firstCategory, positionInCategories[firstCategory]);
        }
    }
    selectAll() {
        for (const categoryId in this.navigationState.filters) {
            this.navigationState.filters[categoryId] = this.keepAllFilter;
        }
        this.reset();
    }
    selectNone() {
        for (const categoryId in this.navigationState.filters) {
            this.navigationState.filters[categoryId] = this.keepNoneFilter;
        }
        this.reset();
    }
    get allSelected() {
        for (const categoryId in this.navigationState.filters) {
            const filter = this.navigationState.filters[categoryId];
            if (filter && filter.choice !== HighlightCategoryFilterChoice.All) {
                return false;
            }
        }
        return true;
    }
    get noneSelected() {
        for (const categoryId in this.navigationState.filters) {
            const filter = this.navigationState.filters[categoryId];
            if (!filter || filter.choice !== HighlightCategoryFilterChoice.None) {
                return false;
            }
        }
        return true;
    }
    // Filter created for each option
    newFilter(value) {
        return new SimpleHighlightCategoryFilterState(value);
    }
    // A filter was clicked
    selectFilter(categoryId, value) {
        //console.log(categoryId, value);
        // If a specific entity/extract is selected we want to select it, rather than filter other entities
        if (value.choice === HighlightCategoryFilterChoice.Value) {
            // First, let's cancel value filters EXCEPT the one that was just selected
            for (const key in this.navigationState.filters) {
                if (key !== categoryId && this.navigationState.filters[key] !== this.keepAllFilter && this.navigationState.filters[key] !== this.keepNoneFilter) {
                    this.navigationState.filters[key] = this.keepAllFilter;
                }
            }
            // Search the entity ID
            let highlight;
            for (const key in this.highlightDataPerLocation) {
                highlight = this.highlightDataPerLocation[key];
                if (highlight.positionInCategories[categoryId] && highlight.values.includes(value.filterValue)) {
                    break;
                }
            }
            if (highlight) {
                this.previewDocument.selectHighlight(categoryId, highlight.positionInCategories[categoryId]);
            }
        }
        else {
            // Cancel value filters
            for (const key in this.navigationState.filters) {
                if (this.navigationState.filters[key] !== this.keepAllFilter && this.navigationState.filters[key] !== this.keepNoneFilter) {
                    this.navigationState.filters[key] = this.keepAllFilter;
                }
            }
            // Reset just applies the (non-value) filters as they are and removes selection
            this.reset();
        }
    }
    /**
     * Comparator allowing to sort the filters in the select
     */
    compareFilters(filter1, filter2) {
        return SimpleHighlightCategoryFilterState.compare(filter1, filter2);
    }
}
BsPreviewHighlights.ɵfac = function BsPreviewHighlights_Factory(t) { return new (t || BsPreviewHighlights)(); };
BsPreviewHighlights.ɵcmp = ɵɵdefineComponent({ type: BsPreviewHighlights, selectors: [["sq-preview-highlights"]], inputs: { previewDocument: "previewDocument", previewData: "previewData" }, features: [ɵɵNgOnChangesFeature], decls: 7, vars: 5, consts: [[1, "card", "sq-facet"], [1, "card-header"], [4, "ngIf", "ngIfElse"], ["normalCase", ""], [1, "card-body", "noEntityToHighlightMessage"], [1, "card-body"], [1, "currentSelection"], [1, "selectedHighlightTitle"], [1, "currentSelectionPanel"], ["class", "selectedHighlight", 4, "ngIf", "ngIfElse"], ["noSelection", ""], [1, "navigation-buttons"], [1, "btn", "btn-secondary", 3, "disabled", "title", "click"], [1, "fas", "fa-fast-backward"], [1, "fas", "fa-step-backward"], [1, "counter-container"], [1, "counter"], [1, "counter", "ghost"], [1, "fas", "fa-step-forward"], [1, "fas", "fa-fast-forward"], [1, "card-body", "filterPanel"], [1, "filterPanelTitle"], [1, "fas", "fa-filter"], ["class", "batchSelectButtonsContainer", 4, "ngIf"], [1, "filters"], ["class", "sq-highlight", 4, "ngFor", "ngForOf"], [1, "selectedHighlight"], [1, "currentCategories"], [4, "ngFor", "ngForOf"], [1, "selectedHighlightValue", 3, "innerHTML"], [1, "currentCategoryLabel"], [1, "noSelectionMessage"], [1, "batchSelectButtonsContainer"], [1, "batchSelectButtonsPaddingPlaceholder"], [1, "batchSelectButtons"], [1, "batchSelectButton"], [1, "btn", 3, "disabled", "title", "click"], [1, "far", "fa-check-square"], [1, "fas", "fa-times"], [1, "sq-highlight"], [1, "categoryIcon"], [1, "categoryLabel"], [1, "categoryFilter"], ["singleValue", ""], [1, "custom-select", 3, "ngModel", "compareWith", "ngModelChange"], [3, "ngValue"], ["disabled", "", 1, "selectSeparator"], [3, "ngValue", 4, "ngFor", "ngForOf"], [4, "ngIf"]], template: function BsPreviewHighlights_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "div", 1);
        ɵɵtext(2);
        ɵɵpipe(3, "sqMessage");
        ɵɵelementEnd();
        ɵɵtemplate(4, BsPreviewHighlights_ng_container_4_Template, 4, 3, "ng-container", 2);
        ɵɵtemplate(5, BsPreviewHighlights_ng_template_5_Template, 39, 38, "ng-template", null, 3, ɵɵtemplateRefExtractor);
        ɵɵelementEnd();
    } if (rf & 2) {
        const _r1 = ɵɵreference(6);
        ɵɵadvance(2);
        ɵɵtextInterpolate(ɵɵpipeBind1(3, 3, "msg#preview.highlightsTitle"));
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.noData)("ngIfElse", _r1);
    } }, directives: [NgIf, NgForOf, SelectControlValueAccessor, NgControlStatus, NgModel, NgSelectOption, ɵangular_packages_forms_forms_x], pipes: [MessagePipe, NumberPipe], styles: [".noEntityToHighlightMessage[_ngcontent-%COMP%]{opacity:.5}.currentSelection[_ngcontent-%COMP%]{margin-bottom:.75rem}.selectedHighlightTitle[_ngcontent-%COMP%]{padding-bottom:.375em}.currentSelectionPanel[_ngcontent-%COMP%]{border:1px solid rgba(0,0,0,.125);padding:.5rem;text-align:center}.currentCategories[_ngcontent-%COMP%]{height:1.5em}.selectedHighlightValue[_ngcontent-%COMP%]{font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.noSelectionMessage[_ngcontent-%COMP%]{opacity:.5}.navigation-buttons[_ngcontent-%COMP%]{text-align:center}.counter-container[_ngcontent-%COMP%]{display:inline-block;position:relative}.counter[_ngcontent-%COMP%]{padding-left:.125rem;padding-right:.125rem;position:absolute;right:0}.ghost[_ngcontent-%COMP%]{position:static;visibility:hidden}.filterPanel[_ngcontent-%COMP%]{border-spacing:0 .375em;display:table}.filterPanelTitle[_ngcontent-%COMP%]{border-top:1px solid rgba(0,0,0,.125);display:table-caption;margin-bottom:-.5em;padding-left:.75em;padding-top:.75em}.batchSelectButtonsContainer[_ngcontent-%COMP%]{display:table-row}.batchSelectButtonsPaddingPlaceholder[_ngcontent-%COMP%]{display:table-cell}.batchSelectButtons[_ngcontent-%COMP%]{border-spacing:0;display:table;table-layout:fixed;width:100%}.batchSelectButton[_ngcontent-%COMP%]{display:table-cell}.batchSelectButton[_ngcontent-%COMP%]:not(:last-child){padding-right:.5rem}.batchSelectButton[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:block;white-space:normal;width:100%}.filterPanelTitle[_ngcontent-%COMP%]   .fa-filter[_ngcontent-%COMP%]{padding-right:.375em}.filters[_ngcontent-%COMP%]{display:table-row-group}.sq-highlight[_ngcontent-%COMP%]{display:table-row}.categoryIcon[_ngcontent-%COMP%], .categoryLabel[_ngcontent-%COMP%]{display:table-cell;padding-right:.375em;white-space:nowrap}.categoryFilter[_ngcontent-%COMP%]{display:table-cell;width:100%}.selectSeparator[_ngcontent-%COMP%]{background-color:#ccc;font-size:1pt}.sq-highlight[_ngcontent-%COMP%]{flex-wrap:nowrap}.sq-highlight[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:focus{z-index:4}.sq-highlight[_ngcontent-%COMP%]   .sq-highlight-btns[_ngcontent-%COMP%]{flex-direction:row}.sq-highlight[_ngcontent-%COMP%]   .sq-highlight-item[_ngcontent-%COMP%]{width:100%}.sq-highlight[_ngcontent-%COMP%]   .sq-highlight-item[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{white-space:normal;width:100%}.sq-highlight[_ngcontent-%COMP%]:not(:first-child){margin-top:.25rem}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsPreviewHighlights, [{
        type: Component,
        args: [{
                selector: "sq-preview-highlights",
                templateUrl: "./preview-highlights.html",
                styleUrls: ["./preview-highlights.scss"]
            }]
    }], null, { previewDocument: [{
            type: Input
        }], previewData: [{
            type: Input
        }] }); })();
// Implementation of data structures
class SimpleHighlightNavigationState {
    constructor(categories) {
        this.current = -1; // No selection
        this.filters = {};
        for (const category of categories) {
            this.filters[category] = new SimpleHighlightCategoryFilterState(); // All entities visible by default
        }
    }
}
class SimpleHighlightCategoryFilterState {
    constructor(param) {
        this.choice = HighlightCategoryFilterChoice.All;
        this._filterValue = "";
        if (param == null) {
            return;
        }
        if (typeof param === "string") {
            this.choice = HighlightCategoryFilterChoice.Value;
            this._filterValue = param;
        }
        else {
            this.choice = param;
        }
    }
    get filterValue() {
        if (this.choice === HighlightCategoryFilterChoice.Value) {
            return this._filterValue;
        }
        return "";
    }
    static compare(filter1, filter2) {
        if (filter1 && filter2) {
            if (filter1.choice !== filter2.choice) {
                return false;
            }
            return filter1.choice !== HighlightCategoryFilterChoice.Value
                || filter1.filterValue === filter2.filterValue;
        }
        return filter1 === filter2;
    }
}
class FilteredHighlightDataPerLocation {
    constructor(baseData, filters) {
        let counter = 0;
        for (const i in baseData) {
            const categories = !baseData[i].positionInCategories ? undefined : Object.keys(baseData[i].positionInCategories);
            if (categories && this.locationIsIncluded(baseData[i].values, categories, filters)) {
                this[counter] = baseData[i];
                counter++;
            }
        }
    }
    size() {
        return Object.keys(this).length;
    }
    locationIsIncluded(values, categories, filters) {
        if (!categories) {
            return false;
        }
        for (const category of categories) {
            if (filters[category] &&
                (filters[category].choice === HighlightCategoryFilterChoice.All
                    || filters[category].choice === HighlightCategoryFilterChoice.Value && values != null && values.includes(filters[category].filterValue))) {
                return true;
            }
        }
        return false;
    }
}

function BsPreviewLinks_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 1);
    ɵɵelementStart(1, "div", 2);
    ɵɵelementStart(2, "nav");
    ɵɵelementStart(3, "ul", 3);
    ɵɵelementStart(4, "li", 4);
    ɵɵelementStart(5, "a", 5);
    ɵɵlistener("click", function BsPreviewLinks_div_0_Template_a_click_5_listener() { ɵɵrestoreView(_r2); const ctx_r1 = ɵɵnextContext(); return ctx_r1.click(); });
    ɵɵelement(6, "span");
    ɵɵtext(7);
    ɵɵpipe(8, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(5);
    ɵɵpropertyInterpolate("href", ctx_r0.originalDocumentUrl, ɵɵsanitizeUrl);
    ɵɵadvance(1);
    ɵɵclassMapInterpolate1("far fa-file sq-icon-file-", ctx_r0.record.fileext, "");
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(8, 5, "msg#preview.originalDocument"), " ");
} }
class BsPreviewLinks {
    constructor(searchService) {
        this.searchService = searchService;
    }
    ngOnChanges() {
        this.originalDocumentUrl = this.record.url1;
    }
    click() {
        this.searchService.notifyOpenOriginalDocument(this.record, this.resultId);
    }
}
BsPreviewLinks.ɵfac = function BsPreviewLinks_Factory(t) { return new (t || BsPreviewLinks)(ɵɵdirectiveInject(SearchService)); };
BsPreviewLinks.ɵcmp = ɵɵdefineComponent({ type: BsPreviewLinks, selectors: [["sq-preview-links"]], inputs: { record: "record", resultId: "resultId" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "card sq-facet", 4, "ngIf"], [1, "card", "sq-facet"], [1, "card-body"], [1, "nav", "nav-pills", "nav-stacked"], [1, "nav-item"], ["target", "_blank", 1, "nav-link", "originalDocumentLink", 3, "href", "click"]], template: function BsPreviewLinks_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsPreviewLinks_div_0_Template, 9, 7, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !!ctx.originalDocumentUrl);
    } }, directives: [NgIf], pipes: [MessagePipe], styles: [".originalDocumentLink[_ngcontent-%COMP%]{padding-left:0}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsPreviewLinks, [{
        type: Component,
        args: [{
                selector: "sq-preview-links",
                // For highlight buttons...
                // http://stackoverflow.com/questions/21245541/min-and-max-width-mess-up-text-align-center
                templateUrl: "./preview-links.html",
                styleUrls: ["./preview-links.css"]
            }]
    }], function () { return [{ type: SearchService }]; }, { record: [{
            type: Input
        }], resultId: [{
            type: Input
        }] }); })();

function BsSimilarDocuments_sq_facet_card_0_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 5);
    ɵɵlistener("click", function BsSimilarDocuments_sq_facet_card_0_ng_container_2_ng_container_1_Template_div_click_1_listener() { ɵɵrestoreView(_r6); const document_r2 = ɵɵnextContext().$implicit; const ctx_r4 = ɵɵnextContext(2); return ctx_r4.onLinkClick(document_r2); });
    ɵɵelement(2, "div");
    ɵɵelementStart(3, "a", 6);
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const document_r2 = ɵɵnextContext().$implicit;
    const ctx_r3 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵclassMapInterpolate1("similarDocumentIcon ", ctx_r3.documentIconClass(document_r2), "");
    ɵɵadvance(2);
    ɵɵtextInterpolate(document_r2.title);
} }
function BsSimilarDocuments_sq_facet_card_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsSimilarDocuments_sq_facet_card_0_ng_container_2_ng_container_1_Template, 5, 4, "ng-container", 4);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const document_r2 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵproperty("ngIf", document_r2);
} }
function BsSimilarDocuments_sq_facet_card_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "sq-facet-card", 1);
    ɵɵelementStart(1, "div", 2);
    ɵɵtemplate(2, BsSimilarDocuments_sq_facet_card_0_ng_container_2_Template, 2, 1, "ng-container", 3);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("title", "msg#preview.similarDocumentsTitle");
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r0.documents);
} }
class BsSimilarDocuments {
    constructor(similarDocumentsService, previewService, changeDetectorRef) {
        this.similarDocumentsService = similarDocumentsService;
        this.previewService = previewService;
        this.changeDetectorRef = changeDetectorRef;
    }
    get documents() {
        return this.documentList;
    }
    ngOnChanges() {
        if (this.sourceDocumentId == null) {
            this.documentList = [];
            return;
        }
        this.similarDocumentsService.get(this.sourceDocumentId, this.query.name).subscribe((results) => {
            this.documentList = results;
            this.changeDetectorRef.markForCheck();
        });
    }
    documentIconClass(document) {
        const documentFormat = document.fileext;
        if (!documentFormat) {
            return "far fa-file";
        }
        return "far fa-file sq-icon-file-" + document.fileext;
    }
    onLinkClick(document) {
        this.previewService.openNewWindow(document, this.query);
    }
}
BsSimilarDocuments.ɵfac = function BsSimilarDocuments_Factory(t) { return new (t || BsSimilarDocuments)(ɵɵdirectiveInject(SimilarDocumentsWebService), ɵɵdirectiveInject(PreviewService), ɵɵdirectiveInject(ChangeDetectorRef)); };
BsSimilarDocuments.ɵcmp = ɵɵdefineComponent({ type: BsSimilarDocuments, selectors: [["sq-similar-documents"]], inputs: { sourceDocumentId: "sourceDocumentId", query: "query" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "title", 4, "ngIf"], [3, "title"], ["id", "similarDocumentsBody", 1, "card-body", "collapse", "show"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "similarDocument", 3, "click"], ["href", "javascript:void(0)", 1, "similarDocumentTitle"]], template: function BsSimilarDocuments_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsSimilarDocuments_sq_facet_card_0_Template, 3, 2, "sq-facet-card", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.documents != null && ctx.documents.length > 0);
    } }, directives: [NgIf, BsFacetCard, NgForOf], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsSimilarDocuments, [{
        type: Component,
        args: [{
                selector: "sq-similar-documents",
                templateUrl: "./similar-documents.html"
            }]
    }], function () { return [{ type: SimilarDocumentsWebService }, { type: PreviewService }, { type: ChangeDetectorRef }]; }, { sourceDocumentId: [{
            type: Input
        }], query: [{
            type: Input
        }] }); })();

function BsPreviewPanel_div_0_sq_metadata_8_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "sq-metadata", 14);
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("record", ctx_r1.previewData.record)("items", ctx_r1.metadata)("showTitles", false)("showIcons", true)("clickable", false);
} }
function BsPreviewPanel_div_0_sq_similar_documents_9_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "sq-similar-documents", 15);
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("sourceDocumentId", ctx_r2.previewData.record.id)("query", ctx_r2.query);
} }
function BsPreviewPanel_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 1);
    ɵɵelementStart(1, "div", 2);
    ɵɵelementStart(2, "div");
    ɵɵelementStart(3, "div", 3);
    ɵɵelement(4, "sq-preview-links", 4);
    ɵɵelement(5, "sq-preview-highlights", 5);
    ɵɵelementStart(6, "sq-facet-card", 6);
    ɵɵelementStart(7, "div", 7);
    ɵɵtemplate(8, BsPreviewPanel_div_0_sq_metadata_8_Template, 1, 5, "sq-metadata", 8);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵtemplate(9, BsPreviewPanel_div_0_sq_similar_documents_9_Template, 1, 2, "sq-similar-documents", 9);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(10, "div", 10);
    ɵɵelementStart(11, "sq-preview-document-iframe", 11);
    ɵɵlistener("onPreviewReady", function BsPreviewPanel_div_0_Template_sq_preview_document_iframe_onPreviewReady_11_listener($event) { ɵɵrestoreView(_r5); const ctx_r4 = ɵɵnextContext(); return ctx_r4.onPreviewReady($event); });
    ɵɵelement(12, "sq-preview-tooltip", 12, 13);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵclassMapInterpolate1("col-lg-3 sq-col ", ctx_r0.leftPaneAdditionalClasses, "");
    ɵɵadvance(2);
    ɵɵproperty("record", ctx_r0.previewData.record)("resultId", ctx_r0.previewData.resultId);
    ɵɵadvance(1);
    ɵɵproperty("previewDocument", ctx_r0.previewDocument)("previewData", ctx_r0.previewData);
    ɵɵadvance(1);
    ɵɵproperty("title", "msg#preview.documentPropertiesTitle");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r0.previewData.record);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.displaySimilarDocuments);
    ɵɵadvance(2);
    ɵɵproperty("sandbox", ctx_r0.sandbox)("downloadUrl", ctx_r0.downloadUrl);
    ɵɵadvance(1);
    ɵɵproperty("previewDocument", ctx_r0.previewDocument)("previewData", ctx_r0.previewDocument);
} }
class BsPreviewPanel {
    constructor(previewService, changeDetectorRef) {
        this.previewService = previewService;
        this.changeDetectorRef = changeDetectorRef;
    }
    ngOnChanges(changes) {
        if (changes["previewData"]) {
            this.downloadUrl = this.previewData ? this.previewService.makeDownloadUrl(this.previewData.documentCachedContentUrl) : undefined;
        }
    }
    onPreviewReady(previewDocument) {
        this.previewDocument = previewDocument;
        this.changeDetectorRef.markForCheck();
    }
}
BsPreviewPanel.ɵfac = function BsPreviewPanel_Factory(t) { return new (t || BsPreviewPanel)(ɵɵdirectiveInject(PreviewService), ɵɵdirectiveInject(ChangeDetectorRef)); };
BsPreviewPanel.ɵcmp = ɵɵdefineComponent({ type: BsPreviewPanel, selectors: [["sq-preview-panel"]], inputs: { query: "query", previewData: "previewData", sandbox: "sandbox", displaySimilarDocuments: "displaySimilarDocuments", metadata: "metadata", leftPaneAdditionalClasses: "leftPaneAdditionalClasses" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "container-fluid sq-preview", 4, "ngIf"], [1, "container-fluid", "sq-preview"], [1, "row", "sq-row"], [1, "sq-preview-bar"], [1, "d-block", "mb-3", 3, "record", "resultId"], [1, "d-block", "mb-3", 3, "previewDocument", "previewData"], [1, "d-block", "mb-3", 3, "title"], ["id", "documentPropertiesBody", 1, "card-body", "collapse", "show"], [3, "record", "items", "showTitles", "showIcons", "clickable", 4, "ngIf"], ["class", "d-block mb-3", 3, "sourceDocumentId", "query", 4, "ngIf"], [1, "col-lg-9", "sq-col", "d-flex", "flex-column"], [3, "sandbox", "downloadUrl", "onPreviewReady"], [3, "previewDocument", "previewData"], ["tooltip", ""], [3, "record", "items", "showTitles", "showIcons", "clickable"], [1, "d-block", "mb-3", 3, "sourceDocumentId", "query"]], template: function BsPreviewPanel_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsPreviewPanel_div_0_Template, 14, 14, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !!ctx.previewData);
    } }, directives: [NgIf, BsPreviewLinks, BsPreviewHighlights, BsFacetCard, PreviewDocumentIframe, PreviewTooltip, Metadata, BsSimilarDocuments], styles: [".sq-preview-document-properties[_ngcontent-%COMP%]{margin-top:.5em}.collapseButton[_ngcontent-%COMP%]{float:right}.sq-preview-bar[_ngcontent-%COMP%]{min-height:100%;overflow-x:hidden}.sq-preview[_ngcontent-%COMP%]{height:100%}.sq-preview[_ngcontent-%COMP%] > .row[_ngcontent-%COMP%]{flex-wrap:nowrap;height:100%}.sq-preview[_ngcontent-%COMP%] > .row[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{-webkit-overflow-scrolling:touch;height:100%;overflow-x:hidden;overflow-y:auto}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsPreviewPanel, [{
        type: Component,
        args: [{
                selector: "sq-preview-panel",
                templateUrl: "./preview-panel.html",
                styleUrls: ["./preview-panel.scss"]
            }]
    }], function () { return [{ type: PreviewService }, { type: ChangeDetectorRef }]; }, { query: [{
            type: Input
        }], previewData: [{
            type: Input
        }], sandbox: [{
            type: Input
        }], displaySimilarDocuments: [{
            type: Input
        }], metadata: [{
            type: Input
        }], leftPaneAdditionalClasses: [{
            type: Input
        }] }); })();

function BsPreviewPopup_div_2_span_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(2, 1, "msg#preview.previousDocument"), "");
} }
function BsPreviewPopup_div_2_span_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(2, 1, "msg#preview.nextDocument"), "");
} }
function BsPreviewPopup_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 4);
    ɵɵelementStart(1, "button", 5);
    ɵɵlistener("click", function BsPreviewPopup_div_2_Template_button_click_1_listener() { ɵɵrestoreView(_r4); const ctx_r3 = ɵɵnextContext(); return ctx_r3.previous(); });
    ɵɵelement(2, "span", 6);
    ɵɵtemplate(3, BsPreviewPopup_div_2_span_3_Template, 3, 3, "span", 7);
    ɵɵelementEnd();
    ɵɵelementStart(4, "button", 5);
    ɵɵlistener("click", function BsPreviewPopup_div_2_Template_button_click_4_listener() { ɵɵrestoreView(_r4); const ctx_r5 = ɵɵnextContext(); return ctx_r5.next(); });
    ɵɵelement(5, "span", 8);
    ɵɵtemplate(6, BsPreviewPopup_div_2_span_6_Template, 3, 3, "span", 7);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵclassMapInterpolate1("btn btn btn-outline-primary ", !ctx_r0.previousEnabled ? "disabled" : "", "");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r0.showPreviousNextText);
    ɵɵadvance(1);
    ɵɵclassMapInterpolate1("btn btn btn-outline-primary ", !ctx_r0.nextEnabled ? "disabled" : "", "");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r0.showPreviousNextText);
} }
class BsPreviewPopup {
    constructor(model, searchService, previewService, uiService, changeDetectorRef) {
        this.model = model;
        this.searchService = searchService;
        this.previewService = previewService;
        this.uiService = uiService;
        this.changeDetectorRef = changeDetectorRef;
    }
    ngOnInit() {
        this.screenSize = this.uiService.screenSize;
        this.resizeSubscription = Utils.subscribe(this.uiService.resizeEvent, (event) => {
            if (this.screenSize !== this.uiService.screenSize) {
                this.screenSize = this.uiService.screenSize;
                this.changeDetectorRef.markForCheck();
            }
        });
        this.updatePreviewData(this.model.record.id);
    }
    ngOnDestroy() {
        this.resizeSubscription.unsubscribe();
    }
    get currentId() {
        if (this.previewData && this.previewData.record) {
            return this.previewData.record.id;
        }
        return "";
    }
    updatePreviewData(id) {
        this.previewService.getPreviewData(id, this.model.query).subscribe(previewData => {
            this.previewData = previewData;
            this.previewDataError = false;
            this.changeDetectorRef.markForCheck();
        }, error => {
            this.previewDataError = true;
        });
    }
    get recordTitle() {
        if (this.previewData && this.previewData.record != null) {
            return this.previewData.record.title;
        }
        return this.previewDataError ? "msg#preview.noDocumentDataErrorPopupTitle" : "";
    }
    get showPreviousNextText() {
        return this.uiService.screenSizeIsGreaterOrEqual("lg");
    }
    get showPreviousNext() {
        return this.getSearchPositionInPage() >= 0 && !!this.searchService.results &&
            !!this.searchService.results.records && this.searchService.results.records.length > 1;
    }
    get previousEnabled() {
        return this.getSearchPositionInPage() > 0;
    }
    get nextEnabled() {
        if (!this.searchService.results || !this.searchService.results.records) {
            return false;
        }
        const searchPosition = this.getSearchPositionInPage();
        return searchPosition >= 0 && searchPosition < (this.searchService.results.records.length - 1);
    }
    getSearchPositionInPage() {
        const id = this.currentId;
        if (id && this.searchService.results && this.searchService.results.records) {
            for (let i = 0, ic = this.searchService.results.records.length; i < ic; i++) {
                const record = this.searchService.results.records[i];
                if (record.id === id) {
                    return i;
                }
            }
        }
        return -1;
    }
    previous() {
        if (!this.searchService.results || !this.searchService.results.records) {
            return;
        }
        const index = this.getSearchPositionInPage();
        if (index <= 0) {
            return;
        }
        const item = this.searchService.results.records[index - 1];
        this.updatePreviewData(item.id);
    }
    next() {
        if (!this.searchService.results || !this.searchService.results.records) {
            return;
        }
        const index = this.getSearchPositionInPage();
        if (index === -1 || index >= (this.searchService.results.records.length - 1)) {
            return;
        }
        const item = this.searchService.results.records[index + 1];
        this.updatePreviewData(item.id);
    }
}
BsPreviewPopup.ɵfac = function BsPreviewPopup_Factory(t) { return new (t || BsPreviewPopup)(ɵɵdirectiveInject(MODAL_MODEL), ɵɵdirectiveInject(SearchService), ɵɵdirectiveInject(PreviewService), ɵɵdirectiveInject(UIService), ɵɵdirectiveInject(ChangeDetectorRef)); };
BsPreviewPopup.ɵcmp = ɵɵdefineComponent({ type: BsPreviewPopup, selectors: [["sq-preview-popup"]], decls: 4, vars: 8, consts: [[1, "modal-content", "sq-preview-popup"], [3, "title", "showFooter"], ["header", "", "class", "previousNextDocumentButtons", 4, "ngIf"], [3, "leftPaneAdditionalClasses", "query", "previewData", "displaySimilarDocuments", "metadata"], ["header", "", 1, "previousNextDocumentButtons"], [3, "click"], ["aria-hidden", "true", 1, "fas", "fa-arrow-left"], [4, "ngIf"], ["aria-hidden", "true", 1, "fas", "fa-arrow-right"]], template: function BsPreviewPopup_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "sq-modal", 1);
        ɵɵtemplate(2, BsPreviewPopup_div_2_Template, 7, 8, "div", 2);
        ɵɵelement(3, "sq-preview-panel", 3);
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("title", ctx.recordTitle)("showFooter", false);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.showPreviousNext);
        ɵɵadvance(1);
        ɵɵproperty("leftPaneAdditionalClasses", "d-none d-lg-block")("query", ctx.model.query)("previewData", ctx.previewData)("displaySimilarDocuments", ctx.model.displaySimilarDocuments)("metadata", ctx.model.metadata);
    } }, directives: [BsModal, NgIf, BsPreviewPanel], pipes: [MessagePipe], styles: [".previousNextDocumentButtons[_ngcontent-%COMP%]{display:inline-block;margin-left:auto;white-space:nowrap}.previousNextDocumentButtons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:not(:first-child){margin-left:.5em}.sq-preview-popup[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]{margin:0 15px}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsPreviewPopup, [{
        type: Component,
        args: [{
                selector: "sq-preview-popup",
                templateUrl: "./preview-popup.html",
                styleUrls: ["./preview-popup.css"]
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: SearchService }, { type: PreviewService }, { type: UIService }, { type: ChangeDetectorRef }]; }, null); })();

function BsResultLinkPreview_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "span");
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵclassMap(ctx_r0.icon);
} }
function BsResultLinkPreview_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, ctx_r1.text));
} }
class BsResultLinkPreview {
    constructor(modalService, previewService) {
        this.modalService = modalService;
        this.previewService = previewService;
        this.icon = "fas fa-search";
        this.text = "";
        this.title = "";
    }
    click(event) {
        if (this.usePopup) {
            if (event.ctrlKey) {
                this.previewService.openNewWindow(this.record, this.query);
            }
            else {
                this.previewService.openModal(this.record, this.query, { displaySimilarDocuments: this.displaySimilarDocuments, metadata: this.metadata });
            }
        }
        else {
            if (this.newWindow) {
                this.previewService.openNewWindow(this.record, this.query);
            }
            else {
                this.previewService.openRoute(this.record, this.query);
            }
        }
        return false;
    }
}
BsResultLinkPreview.ɵfac = function BsResultLinkPreview_Factory(t) { return new (t || BsResultLinkPreview)(ɵɵdirectiveInject(ModalService), ɵɵdirectiveInject(PreviewService)); };
BsResultLinkPreview.ɵcmp = ɵɵdefineComponent({ type: BsResultLinkPreview, selectors: [["sq-result-link-preview"]], inputs: { query: "query", record: "record", icon: "icon", text: "text", title: "title", usePopup: "usePopup", newWindow: "newWindow", displaySimilarDocuments: "displaySimilarDocuments", metadata: "metadata" }, decls: 4, vars: 5, consts: [["href", "#", 3, "title", "click"], [4, "ngIf"]], template: function BsResultLinkPreview_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "a", 0);
        ɵɵlistener("click", function BsResultLinkPreview_Template_a_click_0_listener($event) { return ctx.click($event); });
        ɵɵpipe(1, "sqMessage");
        ɵɵtemplate(2, BsResultLinkPreview_ng_container_2_Template, 2, 3, "ng-container", 1);
        ɵɵtemplate(3, BsResultLinkPreview_ng_container_3_Template, 3, 3, "ng-container", 1);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵpropertyInterpolate("title", ɵɵpipeBind1(1, 3, ctx.title));
        ɵɵadvance(2);
        ɵɵproperty("ngIf", !!ctx.icon);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", !!ctx.text);
    } }, directives: [NgIf], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsResultLinkPreview, [{
        type: Component,
        args: [{
                selector: "sq-result-link-preview",
                templateUrl: "./result-link-preview.html"
            }]
    }], function () { return [{ type: ModalService }, { type: PreviewService }]; }, { query: [{
            type: Input
        }], record: [{
            type: Input
        }], icon: [{
            type: Input
        }], text: [{
            type: Input
        }], title: [{
            type: Input
        }], usePopup: [{
            type: Input
        }], newWindow: [{
            type: Input
        }], displaySimilarDocuments: [{
            type: Input
        }], metadata: [{
            type: Input
        }] }); })();

function BsPreviewEntityFacetComponent_div_1_span_8_Template(rf, ctx) { if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 9);
    ɵɵlistener("click", function BsPreviewEntityFacetComponent_div_1_span_8_Template_span_click_0_listener() { ɵɵrestoreView(_r7); const value_r2 = ɵɵnextContext().$implicit; const ctx_r5 = ɵɵnextContext(); return ctx_r5.prevEntity(value_r2); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelement(2, "i", 10);
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(1, 1, "msg#preview.previousHighlightButtonAltText"));
} }
function BsPreviewEntityFacetComponent_div_1_span_9_Template(rf, ctx) { if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 9);
    ɵɵlistener("click", function BsPreviewEntityFacetComponent_div_1_span_9_Template_span_click_0_listener() { ɵɵrestoreView(_r10); const value_r2 = ɵɵnextContext().$implicit; const ctx_r8 = ɵɵnextContext(); return ctx_r8.nextEntity(value_r2); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelement(2, "i", 11);
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(1, 1, "msg#preview.nextHighlightButtonAltText"));
} }
const _c0$4 = function (a0, a1) { return { "fa-check-square": a0, "fa-square": a1 }; };
function BsPreviewEntityFacetComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r12 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 3);
    ɵɵelementStart(1, "span", 4);
    ɵɵlistener("click", function BsPreviewEntityFacetComponent_div_1_Template_span_click_1_listener() { ɵɵrestoreView(_r12); const value_r2 = ctx.$implicit; const ctx_r11 = ɵɵnextContext(); return ctx_r11.toggleEntity(value_r2); });
    ɵɵelement(2, "i", 5);
    ɵɵelementEnd();
    ɵɵelementStart(3, "span", 6);
    ɵɵtext(4);
    ɵɵpipe(5, "sqValue");
    ɵɵelementEnd();
    ɵɵelementStart(6, "span", 7);
    ɵɵtext(7);
    ɵɵelementEnd();
    ɵɵtemplate(8, BsPreviewEntityFacetComponent_div_1_span_8_Template, 3, 3, "span", 8);
    ɵɵtemplate(9, BsPreviewEntityFacetComponent_div_1_span_9_Template, 3, 3, "span", 8);
    ɵɵelementEnd();
} if (rf & 2) {
    const value_r2 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("ngClass", ɵɵpureFunction2(8, _c0$4, !ctx_r0.entityHidden(value_r2), ctx_r0.entityHidden(value_r2)));
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind2(5, 5, value_r2.displayValue, ctx_r0.column));
    ɵɵadvance(3);
    ɵɵtextInterpolate(ctx_r0.entityCount(value_r2));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.previewDocument);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.previewDocument);
} }
function BsPreviewEntityFacetComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r14 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 12);
    ɵɵelementStart(1, "a", 13);
    ɵɵlistener("click", function BsPreviewEntityFacetComponent_div_2_Template_a_click_1_listener() { ɵɵrestoreView(_r14); const ctx_r13 = ɵɵnextContext(); return ctx_r13.showAll(); });
    ɵɵpipe(2, "sqMessage");
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(2, 2, "msg#preview.showAll"));
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(4, 4, "msg#preview.showAll"));
} }
class BsPreviewEntityFacetComponent extends AbstractFacet {
    constructor(appService) {
        super();
        this.appService = appService;
        this.itemsChecked = new EventEmitter();
        this.count = 10;
        this.sortFreq = true;
        this.hidden = new Map();
        this.nav = new Map();
        /**
         * Unselect all entities (set hidden)
         */
        this.unselectAll = (action) => {
            if (this.previewDocument) {
                this.previewDocument.toggleHighlight(this.entity, false);
            }
            this.data.forEach((value) => {
                this.hidden.set(value.value, true);
            });
            if (action) {
                action.update();
                this.itemsChecked.next(false);
            }
        };
        /**
         * Select all entities (unset hidden)
         */
        this.selectAll = (action) => {
            if (this.previewDocument) {
                this.previewDocument.toggleHighlight(this.entity, true);
            }
            this.data.forEach((value) => {
                this.hidden.set(value.value, false);
            });
            if (action) {
                action.update();
                this.itemsChecked.next(true);
            }
        };
        this.checkAction = new Action({
            icon: "far fa-check-square",
            title: "msg#preview.highlightFilters.keepNone",
            action: this.unselectAll,
            updater: (action) => {
                let foundHidden = false;
                let foundNotHidden = false;
                this.data.forEach(value => {
                    foundHidden = foundHidden || this.hidden.get(value.value) || false;
                    foundNotHidden = foundNotHidden || !this.hidden.get(value.value);
                });
                if (!foundHidden) { // All items selected
                    action.action = this.unselectAll;
                    action.icon = "far fa-check-square";
                    action.title = "msg#preview.highlightFilters.keepNone";
                }
                else if (!foundNotHidden) { // All items unselected
                    action.action = this.selectAll;
                    action.icon = "far fa-square";
                    action.title = "msg#preview.highlightFilters.keepAll";
                }
                else { // Some items selected
                    action.action = this.selectAll;
                    action.icon = "far fa-check-square";
                    action.title = "msg#preview.highlightFilters.keepAll";
                }
            }
        });
        this.sortAlphaAction = new Action({
            icon: "fas fa-sort-alpha-down",
            title: "msg#preview.sortAlphabetically",
            action: () => {
                this.sortFreq = false;
            }
        });
        this.sortFreqAction = new Action({
            icon: "fas fa-sort-amount-down",
            title: "msg#preview.sortFrequency",
            action: () => {
                this.sortFreq = true;
            }
        });
    }
    get actions() {
        const actions = [];
        if (this.previewDocument) {
            actions.push(this.checkAction);
        }
        actions.push(this.sortFreq ? this.sortAlphaAction : this.sortFreqAction);
        return actions;
    }
    /**
     * Uncheck items if needed
     */
    ngOnInit() {
        if (this.startUnchecked) {
            this.unselectAll();
            this.checkAction.update();
        }
        this.column = this.appService.getColumn(this.entity);
    }
    /**
     * Since the preview document comes after the preview data, we need to wait for that change
     * and apply the hidden state in the document.
     * @param changes
     */
    ngOnChanges(changes) {
        if (changes["previewDocument"]) {
            if (this.previewDocument) {
                this.data.forEach(val => {
                    if (this.hidden.get(val.value)) {
                        this.previewDocument.toggleHighlight(this.entity, false, val.value);
                    }
                });
            }
        }
    }
    /**
     * Returns the entities to be displayed in the facet, performing truncation and sorting of the input list
     */
    get entityValues() {
        return this.data.sort((a, b) => {
            const d = b.locations.length - a.locations.length;
            return this.sortFreq && d !== 0 ? d : a.displayValue.localeCompare(b.displayValue);
        }).slice(0, this.count);
    }
    /**
     * Returns the number of occurrences of a given value.
     * If the user used the facet to navigate, the format is "i / count"
     * @param value
     */
    entityCount(value) {
        let count = value.locations.length + "";
        const navValue = this.nav.get(value.value);
        if (navValue !== undefined) {
            count = (navValue + 1) + " / " + count;
        }
        return count;
    }
    /**
     * Return whether the entity is hidden (unchecked) or not
     * @param value
     */
    entityHidden(value) {
        return !!this.hidden.get(value.value);
    }
    /**
     * Shows all the entities in the list
     */
    showAll() {
        this.count = this.data.length;
        return false;
    }
    /**
     * Toggles the hidden (checked/unchecked) state of a value in the list.
     * Modifies the provided preview document.
     * @param value
     */
    toggleEntity(value) {
        this.hidden.set(value.value, !this.hidden.get(value.value));
        if (this.previewDocument) {
            this.previewDocument.toggleHighlight(this.entity, !this.hidden.get(value.value), value.value);
        }
        this.checkAction.update();
    }
    /**
     * Navigate to the next value of this entity.
     * Modifies the provided preview document.
     * @param value
     */
    nextEntity(value) {
        let navValue = this.nav.get(value.value);
        if (navValue === undefined) {
            navValue = 0;
            this.nav.set(value.value, navValue);
        }
        else if (navValue < value.locations.length - 1) {
            navValue++;
            this.nav.set(value.value, navValue);
        }
        this.selectEntity(this.entity, value.value, navValue);
    }
    /**
     * Navigate to the next value of this entity.
     * Modifies the provided preview document.
     * @param value
     */
    prevEntity(value) {
        let navValue = this.nav.get(value.value);
        if (navValue === undefined) {
            navValue = 0;
            this.nav.set(value.value, navValue);
        }
        else if (navValue > 0) {
            navValue--;
            this.nav.set(value.value, navValue);
        }
        this.selectEntity(this.entity, value.value, navValue);
    }
    /**
     * Navigate to the given occurrence of an entity in a specific category
     * Modifies the provided preview document.
     * @param category
     * @param value
     * @param i
     */
    selectEntity(category, value, i) {
        const indexes = this.getEntityIndexes(category, value);
        this.previewDocument.selectHighlight(category, indexes[i]);
    }
    /**
     * Helper function to find the indexes of all occurrences of a entity value in the document
     * @param category
     * @param value
     */
    getEntityIndexes(category, value) {
        const indexes = [];
        for (let i = 0; i < this.previewData.highlightsPerLocation['length']; i++) {
            const highlight = this.previewData.highlightsPerLocation[i];
            const categories = Object.keys(highlight.positionInCategories);
            for (const currentCategory of categories) {
                if (currentCategory === category) {
                    for (const highlightValue of highlight.values) {
                        if (highlightValue === value) {
                            indexes.push(highlight.positionInCategories[category]);
                        }
                    }
                }
            }
        }
        return indexes;
    }
}
BsPreviewEntityFacetComponent.ɵfac = function BsPreviewEntityFacetComponent_Factory(t) { return new (t || BsPreviewEntityFacetComponent)(ɵɵdirectiveInject(AppService)); };
BsPreviewEntityFacetComponent.ɵcmp = ɵɵdefineComponent({ type: BsPreviewEntityFacetComponent, selectors: [["sq-preview-entity-facet"]], inputs: { entity: "entity", data: "data", previewData: "previewData", previewDocument: "previewDocument", startUnchecked: "startUnchecked" }, outputs: { itemsChecked: "itemsChecked" }, features: [ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature], decls: 3, vars: 2, consts: [[1, "list-group", "list-group-flush", "entity-facet"], ["class", "list-group-item align-items-center border-0 py-1 px-3 d-flex", 4, "ngFor", "ngForOf"], ["class", "list-group-item border-0 py-1 text-center", 4, "ngIf"], [1, "list-group-item", "align-items-center", "border-0", "py-1", "px-3", "d-flex"], [1, "text-muted", "px-1", "cursor-pointer", 3, "click"], [1, "far", 3, "ngClass"], [1, "mr-auto", "mx-1"], [1, "text-muted", "small", "mx-1"], ["class", "text-muted px-1 cursor-pointer", 3, "title", "click", 4, "ngIf"], [1, "text-muted", "px-1", "cursor-pointer", 3, "title", "click"], [1, "fas", "fa-chevron-left"], [1, "fas", "fa-chevron-right"], [1, "list-group-item", "border-0", "py-1", "text-center"], ["href", "#", 1, "text-muted", "small", 3, "title", "click"]], template: function BsPreviewEntityFacetComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, BsPreviewEntityFacetComponent_div_1_Template, 10, 11, "div", 1);
        ɵɵtemplate(2, BsPreviewEntityFacetComponent_div_2_Template, 5, 6, "div", 2);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.entityValues);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.data.length > ctx.count);
    } }, directives: [NgForOf, NgIf, NgClass], pipes: [ValuePipe, MessagePipe], styles: [".cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.entity-facet[_ngcontent-%COMP%]{font-size:.9em}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsPreviewEntityFacetComponent, [{
        type: Component,
        args: [{
                selector: 'sq-preview-entity-facet',
                templateUrl: './preview-entity-facet.component.html',
                styleUrls: ['./preview-entity-facet.component.scss']
            }]
    }], function () { return [{ type: AppService }]; }, { entity: [{
            type: Input
        }], data: [{
            type: Input
        }], previewData: [{
            type: Input
        }], previewDocument: [{
            type: Input
        }], startUnchecked: [{
            type: Input
        }], itemsChecked: [{
            type: Output
        }] }); })();

function BsPreviewEntityPanelComponent_ng_container_0_sq_facet_card_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "sq-facet-card", 2);
    ɵɵelementStart(1, "sq-preview-entity-facet", 3, 4);
    ɵɵlistener("itemsChecked", function BsPreviewEntityPanelComponent_ng_container_0_sq_facet_card_1_Template_sq_preview_entity_facet_itemsChecked_1_listener($event) { ɵɵrestoreView(_r6); const entity_r1 = ɵɵnextContext().$implicit; const ctx_r4 = ɵɵnextContext(); return ctx_r4.itemsChecked(entity_r1, $event); });
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const entity_r1 = ɵɵnextContext().$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("title", ctx_r2.entityDisplay(entity_r1))("icon", ctx_r2.entityIcon(entity_r1))("collapsible", ctx_r2.collapsible)("buttonsStyle", ctx_r2.style);
    ɵɵadvance(1);
    ɵɵproperty("entity", entity_r1)("data", ctx_r2.entityValues(entity_r1))("previewData", ctx_r2.previewData)("previewDocument", ctx_r2.previewDocument)("startUnchecked", ctx_r2.startUnchecked[entity_r1]);
} }
function BsPreviewEntityPanelComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsPreviewEntityPanelComponent_ng_container_0_sq_facet_card_1_Template, 3, 9, "sq-facet-card", 1);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const entity_r1 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.entityValues(entity_r1).length);
} }
class BsPreviewEntityPanelComponent {
    constructor() {
        /**
         * Whether the facets are collapsible
         */
        this.collapsible = true;
        /**
         * Allows to uncheck all items from specific facets
         */
        this.startUnchecked = {};
        /**
         * Triggers an event when check all / check none is use in a facet
         */
        this.facetChecked = new EventEmitter();
        this._entities = [];
    }
    /**
     * Extracts the list of entities from the preview data
     */
    ngOnChanges() {
        if (this.entities && !!this.previewData) { // If the list of entities is provided as input
            this._entities = this.entities;
        }
        else if (this.previewData) { // The list of entities is deduced from the preview data
            this._entities = Object.keys(this.previewData.highlightsPerCategory).filter(value => value !== "extractslocations");
        }
        else { // No entity to show
            this._entities = [];
        }
    }
    /**
     * Return the data for a specific entity category
     * @param entity
     */
    data(entity) {
        return this.previewData.highlightsPerCategory[entity];
    }
    /**
     * Returns the display value of a specific entity
     * @param entity
     */
    entityDisplay(entity) {
        return this.data(entity).categoryDisplayLabelPlural || this.data(entity).categoryDisplayLabel || entity;
    }
    /**
     * Returns the icon of a specific entity
     * @param entity
     */
    entityIcon(entity) {
        return "sq-icon-" + entity;
    }
    /**
     * Returns the list of values of a specific entity
     * @param entity
     */
    entityValues(entity) {
        return this.data(entity).values;
    }
    /**
     * Called by child facet when items are checked/unchecked
     * @param entity
     * @param checked
     */
    itemsChecked(entity, checked) {
        this.facetChecked.next({ entity: entity, checked: checked });
    }
}
BsPreviewEntityPanelComponent.ɵfac = function BsPreviewEntityPanelComponent_Factory(t) { return new (t || BsPreviewEntityPanelComponent)(); };
BsPreviewEntityPanelComponent.ɵcmp = ɵɵdefineComponent({ type: BsPreviewEntityPanelComponent, selectors: [["sq-preview-entity-panel"]], inputs: { previewData: "previewData", previewDocument: "previewDocument", style: "style", collapsible: "collapsible", startUnchecked: "startUnchecked", entities: "entities" }, outputs: { facetChecked: "facetChecked" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[4, "ngFor", "ngForOf"], ["class", "d-block my-3", 3, "title", "icon", "collapsible", "buttonsStyle", 4, "ngIf"], [1, "d-block", "my-3", 3, "title", "icon", "collapsible", "buttonsStyle"], [3, "entity", "data", "previewData", "previewDocument", "startUnchecked", "itemsChecked"], ["facet", ""]], template: function BsPreviewEntityPanelComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsPreviewEntityPanelComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
    } if (rf & 2) {
        ɵɵproperty("ngForOf", ctx._entities);
    } }, directives: [NgForOf, NgIf, BsFacetCard, BsPreviewEntityFacetComponent], styles: [""] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsPreviewEntityPanelComponent, [{
        type: Component,
        args: [{
                selector: 'sq-preview-entity-panel',
                templateUrl: './preview-entity-panel.component.html',
                styleUrls: ['./preview-entity-panel.component.scss']
            }]
    }], function () { return []; }, { previewData: [{
            type: Input
        }], previewDocument: [{
            type: Input
        }], style: [{
            type: Input
        }], collapsible: [{
            type: Input
        }], startUnchecked: [{
            type: Input
        }], entities: [{
            type: Input
        }], facetChecked: [{
            type: Output
        }] }); })();

const _c0$5 = ["scrollViewport"];
const _c1$2 = function (a0) { return [a0]; };
const _c2$2 = function (a0) { return { items: a0, autoAdjust: true }; };
function BsPreviewExtractsPanelComponent_ng_container_0_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 6);
    ɵɵelementStart(1, "button", 7);
    ɵɵlistener("click", function BsPreviewExtractsPanelComponent_ng_container_0_div_1_Template_button_click_1_listener() { ɵɵrestoreView(_r8); const ctx_r7 = ɵɵnextContext(2); return ctx_r7.previousExtract(); });
    ɵɵelement(2, "i", 8);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵelement(5, "div", 9);
    ɵɵelementStart(6, "button", 10);
    ɵɵlistener("click", function BsPreviewExtractsPanelComponent_ng_container_0_div_1_Template_button_click_6_listener() { ɵɵrestoreView(_r8); const ctx_r9 = ɵɵnextContext(2); return ctx_r9.nextExtract(); });
    ɵɵtext(7);
    ɵɵpipe(8, "sqMessage");
    ɵɵelement(9, "i", 11);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("disabled", ctx_r2.currentIndex < 1);
    ɵɵadvance(2);
    ɵɵtextInterpolate1("\u00A0", ɵɵpipeBind1(4, 5, "msg#preview.previousDocument"), " ");
    ɵɵadvance(2);
    ɵɵproperty("sq-action-buttons", ɵɵpureFunction1(11, _c2$2, ɵɵpureFunction1(9, _c1$2, ctx_r2.sortAction)));
    ɵɵadvance(1);
    ɵɵproperty("disabled", ctx_r2.currentIndex >= ctx_r2.extracts.length - 1);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(8, 7, "msg#preview.nextDocument"), "\u00A0");
} }
function BsPreviewExtractsPanelComponent_ng_container_0_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 12);
    ɵɵelement(1, "div", 13);
    ɵɵelementEnd();
} }
function BsPreviewExtractsPanelComponent_ng_container_0_div_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 14);
    ɵɵelementStart(1, "span");
    ɵɵtext(2);
    ɵɵpipe(3, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(3, 1, "msg#preview.noextract"));
} }
const _c3$1 = function (a0) { return { "active": a0 }; };
function BsPreviewExtractsPanelComponent_ng_container_0_ng_template_4_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r15 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 18);
    ɵɵelementStart(1, "a", 19);
    ɵɵlistener("click", function BsPreviewExtractsPanelComponent_ng_container_0_ng_template_4_div_2_Template_a_click_1_listener() { ɵɵrestoreView(_r15); const extract_r12 = ctx.$implicit; const i_r13 = ctx.index; const ctx_r14 = ɵɵnextContext(3); return ctx_r14.scrollExtract(extract_r12, i_r13); });
    ɵɵelement(2, "p", 20);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const extract_r12 = ctx.$implicit;
    const i_r13 = ctx.index;
    const ctx_r11 = ɵɵnextContext(3);
    ɵɵadvance(1);
    ɵɵproperty("ngClass", ɵɵpureFunction1(2, _c3$1, i_r13 === ctx_r11.currentIndex));
    ɵɵadvance(1);
    ɵɵproperty("innerHTML", extract_r12.text, ɵɵsanitizeHtml);
} }
function BsPreviewExtractsPanelComponent_ng_container_0_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "cdk-virtual-scroll-viewport", 15, 16);
    ɵɵtemplate(2, BsPreviewExtractsPanelComponent_ng_container_0_ng_template_4_div_2_Template, 3, 4, "div", 17);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = ɵɵnextContext(2);
    ɵɵproperty("itemSize", 64);
    ɵɵadvance(2);
    ɵɵproperty("cdkVirtualForOf", ctx_r6.extracts);
} }
function BsPreviewExtractsPanelComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsPreviewExtractsPanelComponent_ng_container_0_div_1_Template, 10, 13, "div", 2);
    ɵɵtemplate(2, BsPreviewExtractsPanelComponent_ng_container_0_div_2_Template, 2, 0, "div", 3);
    ɵɵtemplate(3, BsPreviewExtractsPanelComponent_ng_container_0_div_3_Template, 4, 3, "div", 4);
    ɵɵtemplate(4, BsPreviewExtractsPanelComponent_ng_container_0_ng_template_4_Template, 3, 2, "ng-template", null, 5, ɵɵtemplateRefExtractor);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const _r5 = ɵɵreference(5);
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngIf", (ctx_r0.extracts == null ? null : ctx_r0.extracts.length) > 0);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.loading);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r0.loading && (ctx_r0.extracts == null ? null : ctx_r0.extracts.length) === 0)("ngIfElse", _r5);
} }
function BsPreviewExtractsPanelComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 21);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(2, 1, "msg#preview.loading"), "\n");
} }
class Extract {
}
class BsPreviewExtractsPanelComponent {
    constructor(document, previewService, cdr, domSanitizer) {
        this.previewService = previewService;
        this.cdr = cdr;
        this.domSanitizer = domSanitizer;
        this.style = "light";
        this.extracts = [];
        this.currentIndex = -1;
        this.loading = false;
    }
    ngOnDestroy() {
        if (this.loadCompleteSubscription) {
            this.loadCompleteSubscription.unsubscribe();
        }
    }
    /**
     * Extracts the list of extracts from the preview document
     */
    ngOnChanges(changes) {
        var _a, _b;
        this.extracts = [];
        if (this.previewData && this.previewDocument) {
            const extracts = (_a = this.previewData.highlightsPerCategory["extractslocations"]) === null || _a === void 0 ? void 0 : _a.values; //Extract locations Array ordered by "relevance"
            if (!!extracts && extracts.length > 0) {
                this.extractAll(extracts, this.previewDocument);
                return;
            }
        }
        if (this.previewData && this.downloadUrl) {
            const extracts = (_b = this.previewData.highlightsPerCategory["extractslocations"]) === null || _b === void 0 ? void 0 : _b.values; //Extract locations Array ordered by "relevance"
            if (!!extracts && extracts.length > 0) {
                this.loading = true;
                if (this.previewDocument) {
                    this.extractAll(extracts, this.previewDocument);
                }
                else {
                    this.previewService.getHtmlPreview(this.downloadUrl)
                        .subscribe((value) => {
                        const previewDocument = this.createDocument(value);
                        this.extractAll(extracts, previewDocument);
                    });
                }
            }
        }
    }
    createDocument(value) {
        const doc = document.implementation.createHTMLDocument("");
        doc.write(value);
        doc.close();
        let previewDocument = new PreviewDocument(doc);
        const count = previewDocument.document.querySelectorAll("[id^='extractslocations']").length;
        if (count === 0 && this.previewDocument) {
            // use previous document to retrieve extracts
            previewDocument = this.previewDocument;
        }
        return previewDocument;
    }
    extractAll(extracts, previewDocument) {
        // Init the extracts Array and storing the relevancy index = i because extractsLocations is already ordered by relevance
        // but extract's text is sort by "start", that why text is set to empty here
        this.extracts = extracts[0].locations.map((el, i) => ({
            text: "",
            startIndex: el.start,
            relevanceIndex: i,
            textIndex: 0
        }));
        // next sort the array by startIndex to extract the correct extract's text
        // and set the textIndex
        this.extracts.sort((a, b) => a.startIndex - b.startIndex) // Sorting by start index (text index)
            .forEach((el, i) => {
            el.text = this.sanitize(previewDocument.getHighlightText("extractslocations", i)); // get the text
            el.textIndex = i; // Storing the TextIndex to be able to select extracts
        });
        // do not take item without text
        this.extracts = this.extracts.filter(el => el.text !== '');
        // finally sort extracts by relevance
        this.extracts.sort((a, b) => a.relevanceIndex - b.relevanceIndex);
        this.buildSortAction();
        this.loading = false;
        this.currentIndex = -1;
        this.cdr.detectChanges();
    }
    /**
     * Build Sort Action for Extracts
     * @param i
     */
    buildSortAction() {
        this.sortAction = new Action({
            title: "msg#sortSelector.sortByTitle",
            text: "msg#preview.relevanceSortHighlightButtonText",
            children: [
                new Action({
                    icon: 'fas fa-sort-amount-down',
                    text: "msg#preview.relevanceSortHighlightButtonText",
                    action: (item, event) => {
                        // return a new map to re-render the collection
                        this.extracts = this.extracts.map(el => el).sort((a, b) => a.relevanceIndex - b.relevanceIndex);
                        this.sortAction.text = item.text;
                        this.currentIndex = -1;
                    }
                }),
                new Action({
                    icon: 'fas fa-sort-amount-down',
                    text: "msg#preview.textOrderSortHighlightButtonText",
                    action: (item, event) => {
                        // return a new map to re-render the collection
                        this.extracts = this.extracts.map(el => el).sort((a, b) => a.textIndex - b.textIndex);
                        this.sortAction.text = item.text;
                        this.currentIndex = -1;
                    }
                })
            ]
        });
    }
    /**
     * Scroll to a specific extract
     * @param i
     */
    scrollExtract(extract, index) {
        if (index !== undefined) {
            this.currentIndex = index;
        }
        if (this.previewDocument) {
            // extracts are always at textIndex position whatever the sort
            this.previewDocument.selectHighlight("extractslocations", extract.textIndex);
        }
        return false;
    }
    /**
     * Sanitize the text of a HTML formatted extract
     * @param text
     */
    sanitize(text) {
        return text !== "" ? this.domSanitizer.bypassSecurityTrustHtml(text.replace(/sq\-current/, "")) : "";
    }
    /**
     * Select the previous extract in the list
     */
    previousExtract() {
        this.currentIndex--;
        this.scrollTo();
    }
    /**
     * Select the next extract in the list
     */
    nextExtract() {
        this.currentIndex++;
        this.scrollTo();
    }
    scrollTo() {
        this.cdkScrollViewport.scrollToIndex(this.currentIndex);
        const extract = this.extracts[this.currentIndex];
        this.scrollExtract(extract);
    }
}
BsPreviewExtractsPanelComponent.ɵfac = function BsPreviewExtractsPanelComponent_Factory(t) { return new (t || BsPreviewExtractsPanelComponent)(ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(PreviewService), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(DomSanitizer)); };
BsPreviewExtractsPanelComponent.ɵcmp = ɵɵdefineComponent({ type: BsPreviewExtractsPanelComponent, selectors: [["sq-preview-extracts-panel"]], viewQuery: function BsPreviewExtractsPanelComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0$5, true);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.cdkScrollViewport = _t.first);
    } }, inputs: { previewData: "previewData", previewDocument: "previewDocument", downloadUrl: "downloadUrl", style: "style" }, features: [ɵɵNgOnChangesFeature], decls: 2, vars: 2, consts: [[4, "ngIf"], ["class", "text-center", 4, "ngIf"], ["class", "d-flex justify-content-between p-2", 4, "ngIf"], ["class", "d-flex justify-content-center align-items-center h-100", 4, "ngIf"], ["class", "text-center text-muted", 4, "ngIf", "ngIfElse"], ["extractsTpl", ""], [1, "d-flex", "justify-content-between", "p-2"], [1, "btn", "btn-light", 3, "disabled", "click"], [1, "fas", "fa-arrow-left"], [1, "btn-group", 3, "sq-action-buttons"], [1, "btn", "btn-light", "float-right", 3, "disabled", "click"], [1, "fas", "fa-arrow-right"], [1, "d-flex", "justify-content-center", "align-items-center", "h-100"], ["role", "status", 1, "spinner-grow"], [1, "text-center", "text-muted"], [2, "height", "100%", 3, "itemSize"], ["scrollViewport", ""], ["class", "pl-2 pr-2", 4, "cdkVirtualFor", "cdkVirtualForOf"], [1, "pl-2", "pr-2"], ["href", "#", 1, "card", "my-1", "list-group-item-action", 3, "ngClass", "click"], [1, "card-body", "m-0", 3, "innerHTML"], [1, "text-center"]], template: function BsPreviewExtractsPanelComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsPreviewExtractsPanelComponent_ng_container_0_Template, 6, 4, "ng-container", 0);
        ɵɵtemplate(1, BsPreviewExtractsPanelComponent_div_1_Template, 3, 3, "div", 1);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.previewData);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", !ctx.previewData);
    } }, directives: [NgIf, BsActionButtons, CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf, NgClass], pipes: [MessagePipe], styles: ["[_nghost-%COMP%]     .cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{max-width:100%;min-width:100%}.spinner-grow[_ngcontent-%COMP%]{height:3rem;width:3rem}.active[_ngcontent-%COMP%]{background-color:#f8f9fa}.dark[_nghost-%COMP%]   .active[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .active[_ngcontent-%COMP%]{background-color:#e9ecef;color:#768883}"], changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsPreviewExtractsPanelComponent, [{
        type: Component,
        args: [{
                selector: 'sq-preview-extracts-panel',
                templateUrl: './preview-extracts-panel.component.html',
                styleUrls: ['./preview-extracts-panel.component.scss'],
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: Document, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: PreviewService }, { type: ChangeDetectorRef }, { type: DomSanitizer }]; }, { previewData: [{
            type: Input
        }], previewDocument: [{
            type: Input
        }], downloadUrl: [{
            type: Input
        }], style: [{
            type: Input
        }], cdkScrollViewport: [{
            type: ViewChild,
            args: ["scrollViewport"]
        }] }); })();

class BsPreviewSearchFormComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.searchText = new EventEmitter();
        this.searchControl = new FormControl('');
        this.form = this.formBuilder.group({
            search: this.searchControl
        });
    }
    /**
     * Updates the text of the search form when the query changes
     */
    ngOnChanges() {
        this.searchControl.setValue((!this.query || !this.query.text) ? "" : this.query.text);
    }
    /**
     * Emits an event for the parent component to search this next text
     */
    search() {
        this.searchText.next(this.searchControl.value || "");
    }
}
BsPreviewSearchFormComponent.ɵfac = function BsPreviewSearchFormComponent_Factory(t) { return new (t || BsPreviewSearchFormComponent)(ɵɵdirectiveInject(FormBuilder)); };
BsPreviewSearchFormComponent.ɵcmp = ɵɵdefineComponent({ type: BsPreviewSearchFormComponent, selectors: [["sq-preview-search-form"]], inputs: { query: "query" }, outputs: { searchText: "searchText" }, features: [ɵɵNgOnChangesFeature], decls: 12, vars: 10, consts: [["novalidate", "", 3, "formGroup"], [1, "input-group", "mb-3"], [1, "input-group-prepend"], ["for", "search-input", 1, "input-group-text"], ["id", "search-input", "type", "text", "formControlName", "search", "sqAutofocus", "", 1, "form-control", 3, "placeholder"], [1, "input-group-append"], ["type", "submit", 1, "btn", "btn-primary", 3, "title", "click"], [1, "fas", "fa-fw", "fa-search"]], template: function BsPreviewSearchFormComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "div", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelementStart(3, "label", 3);
        ɵɵtext(4);
        ɵɵpipe(5, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelement(6, "input", 4);
        ɵɵpipe(7, "sqMessage");
        ɵɵelementStart(8, "div", 5);
        ɵɵelementStart(9, "button", 6);
        ɵɵlistener("click", function BsPreviewSearchFormComponent_Template_button_click_9_listener() { return ctx.search(); });
        ɵɵpipe(10, "sqMessage");
        ɵɵelement(11, "i", 7);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("formGroup", ctx.form);
        ɵɵadvance(4);
        ɵɵtextInterpolate(ɵɵpipeBind1(5, 4, "msg#preview.search"));
        ɵɵadvance(2);
        ɵɵpropertyInterpolate("placeholder", ɵɵpipeBind1(7, 6, "msg#searchForm.searchFor"));
        ɵɵadvance(3);
        ɵɵpropertyInterpolate("title", ɵɵpipeBind1(10, 8, "msg#searchForm.search"));
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, DefaultValueAccessor, NgControlStatus, FormControlName, Autofocus], pipes: [MessagePipe], styles: [""] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsPreviewSearchFormComponent, [{
        type: Component,
        args: [{
                selector: 'sq-preview-search-form',
                templateUrl: './preview-search-form.component.html',
                styleUrls: ['./preview-search-form.component.scss']
            }]
    }], function () { return [{ type: FormBuilder }]; }, { query: [{
            type: Input
        }], searchText: [{
            type: Output
        }] }); })();

const _c0$6 = ["currentPageEl"];
function BsPreviewPagesPanelComponent_div_0_a_1_div_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 8);
    ɵɵelement(1, "div", 9);
    ɵɵelementEnd();
} }
const _c1$3 = function () { return { page: 1 }; };
const _c2$3 = function (a0) { return { values: a0 }; };
function BsPreviewPagesPanelComponent_div_0_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 4);
    ɵɵlistener("click", function BsPreviewPagesPanelComponent_div_0_a_1_Template_a_click_0_listener() { ɵɵrestoreView(_r5); const ctx_r4 = ɵɵnextContext(2); return ctx_r4.selectPage(1); });
    ɵɵelementStart(1, "div", 5);
    ɵɵelementStart(2, "span", 6);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵtemplate(5, BsPreviewPagesPanelComponent_div_0_a_1_div_5_Template, 2, 0, "div", 7);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind2(4, 2, "msg#preview.page", ɵɵpureFunction1(6, _c2$3, ɵɵpureFunction0(5, _c1$3))));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1._pendingPage === 1);
} }
function BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_p_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "p", 12);
} if (rf & 2) {
    const page_r6 = ɵɵnextContext(2).$implicit;
    ɵɵproperty("innerHTML", page_r6.relevantExtracts, ɵɵsanitizeHtml);
} }
function BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_div_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 8);
    ɵɵelement(1, "div", 9);
    ɵɵelementEnd();
} }
const _c3$2 = function (a0) { return { page: a0 }; };
function BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r14 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 4);
    ɵɵlistener("click", function BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_Template_a_click_0_listener() { ɵɵrestoreView(_r14); const page_r6 = ɵɵnextContext().$implicit; const ctx_r12 = ɵɵnextContext(2); return ctx_r12.selectPage(page_r6.$page); });
    ɵɵelementStart(1, "div", 5);
    ɵɵelementStart(2, "span", 6);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵtemplate(5, BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_p_5_Template, 1, 1, "p", 11);
    ɵɵtemplate(6, BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_div_6_Template, 2, 0, "div", 7);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const page_r6 = ɵɵnextContext().$implicit;
    const ctx_r7 = ɵɵnextContext(2);
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind2(4, 3, "msg#preview.page", ɵɵpureFunction1(8, _c2$3, ɵɵpureFunction1(6, _c3$2, page_r6.$page))));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r7._pendingPage !== page_r6.$page);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r7._pendingPage === page_r6.$page);
} }
function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_1_div_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 8);
    ɵɵelement(1, "div", 9);
    ɵɵelementEnd();
} }
function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r22 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 4);
    ɵɵlistener("click", function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_1_Template_a_click_0_listener() { ɵɵrestoreView(_r22); const ctx_r21 = ɵɵnextContext(4); return ctx_r21.selectPrevious(); });
    ɵɵelementStart(1, "div", 5);
    ɵɵelementStart(2, "span", 6);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵpipe(5, "sqMessage");
    ɵɵelementEnd();
    ɵɵtemplate(6, BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_1_div_6_Template, 2, 0, "div", 7);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r16 = ɵɵnextContext(4);
    ɵɵadvance(3);
    ɵɵtextInterpolate2("", ɵɵpipeBind2(4, 3, "msg#preview.page", ɵɵpureFunction1(10, _c2$3, ɵɵpureFunction1(8, _c3$2, ctx_r16.currentPage - 1))), " (", ɵɵpipeBind1(5, 6, "msg#preview.previousDocument"), ")");
    ɵɵadvance(3);
    ɵɵproperty("ngIf", ctx_r16._pendingPage === ctx_r16.currentPage - 1);
} }
function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_sq_preview_extracts_panel_9_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "sq-preview-extracts-panel", 18);
} if (rf & 2) {
    const ctx_r18 = ɵɵnextContext(4);
    ɵɵstyleMap(ctx_r18.style);
    ɵɵproperty("previewData", ctx_r18.previewData)("previewDocument", ctx_r18.previewDocument);
} }
function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_10_div_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 8);
    ɵɵelement(1, "div", 9);
    ɵɵelementEnd();
} }
function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_10_Template(rf, ctx) { if (rf & 1) {
    const _r25 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 4);
    ɵɵlistener("click", function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_10_Template_a_click_0_listener() { ɵɵrestoreView(_r25); const ctx_r24 = ɵɵnextContext(4); return ctx_r24.selectNext(); });
    ɵɵelementStart(1, "div", 5);
    ɵɵelementStart(2, "span", 6);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵpipe(5, "sqMessage");
    ɵɵelementEnd();
    ɵɵtemplate(6, BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_10_div_6_Template, 2, 0, "div", 7);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r19 = ɵɵnextContext(4);
    ɵɵadvance(3);
    ɵɵtextInterpolate2("", ɵɵpipeBind2(4, 3, "msg#preview.page", ɵɵpureFunction1(10, _c2$3, ɵɵpureFunction1(8, _c3$2, ctx_r19.currentPage + 1))), " (", ɵɵpipeBind1(5, 6, "msg#preview.nextDocument"), ")");
    ɵɵadvance(3);
    ɵɵproperty("ngIf", ctx_r19._pendingPage === ctx_r19.currentPage + 1);
} }
function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_1_Template, 7, 12, "a", 2);
    ɵɵelementStart(2, "div", 13, 14);
    ɵɵelementStart(4, "div", 15);
    ɵɵelementStart(5, "span", 16);
    ɵɵtext(6);
    ɵɵpipe(7, "sqMessage");
    ɵɵpipe(8, "sqMessage");
    ɵɵelementEnd();
    ɵɵtemplate(9, BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_sq_preview_extracts_panel_9_Template, 1, 4, "sq-preview-extracts-panel", 17);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵtemplate(10, BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_10_Template, 7, 12, "a", 2);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r8 = ɵɵnextContext(3);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r8.hasPrevious);
    ɵɵadvance(5);
    ɵɵtextInterpolate2("", ɵɵpipeBind2(7, 5, "msg#preview.page", ɵɵpureFunction1(12, _c2$3, ɵɵpureFunction1(10, _c3$2, ctx_r8.currentPage))), " (", ɵɵpipeBind1(8, 8, "msg#preview.current"), ")");
    ɵɵadvance(3);
    ɵɵproperty("ngIf", !ctx_r8._pendingPreviewDocument);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r8.hasNext);
} }
function BsPreviewPagesPanelComponent_div_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_Template, 7, 10, "a", 2);
    ɵɵtemplate(2, BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_Template, 11, 14, "ng-container", 10);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const page_r6 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r2.currentPage !== page_r6.$page);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r2.currentPage === page_r6.$page);
} }
function BsPreviewPagesPanelComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 1);
    ɵɵtemplate(1, BsPreviewPagesPanelComponent_div_0_a_1_Template, 6, 8, "a", 2);
    ɵɵtemplate(2, BsPreviewPagesPanelComponent_div_0_ng_container_2_Template, 3, 2, "ng-container", 3);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r0.hasFirst);
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r0.sortedPages);
} }
class BsPreviewPagesPanelComponent {
    constructor(previewService) {
        this.previewService = previewService;
        this.style = "light";
        this.gotopage = new EventEmitter();
        this._pendingPreviewDocument = true;
        this._pendingPages = true;
    }
    ngOnChanges(changes) {
        // PreviewData should change first, which triggers the new previewDocument and pages
        if (changes["previewData"]) {
            this._pendingPreviewDocument = true;
            this._pendingPages = true;
        }
        if (changes["previewDocument"]) {
            this._pendingPreviewDocument = false;
        }
        if (changes["pages"]) {
            this._pendingPages = false;
        }
        // ngOnChanges is called multiple times due to async updates of the Inputs()
        // The _pending variables let us wait for all these inputs to come in before apply the changes
        if (!this._pendingPreviewDocument && !this._pendingPages) {
            this._pendingPage = undefined;
            if (this.previewData) {
                this.currentPage = this.previewData.record.$page;
                this.containerid = this.previewData.record.containerid;
            }
            if (this.pages && this.currentPage && this.containerid) {
                this.sortedPages = this.pages.records;
                // Parse the page number from each record id
                this.sortedPages.forEach(record => {
                    this.previewService.getPageNumber(record);
                    if (!record.$page) {
                        throw new Error("Record is not page... " + record.id);
                    }
                });
                // Insert current page if missing (possible when navigating to previous/next page)
                if (!this.sortedPages.find(page => page.$page === this.currentPage)) {
                    this.sortedPages.push(this.previewData.record);
                }
                // Sort the pages
                this.sortedPages.sort((a, b) => a.$page - b.$page);
                // Update current page neighbours
                this.hasFirst = !!this.sortedPages.find(page => page.$page === 1 || this.currentPage === 2); // include 2nd page, because is covered by the previous page below
                this.hasPrevious = this.currentPage === 1 || !!this.sortedPages.find(page => page.$page === this.currentPage - 1);
                this.hasNext = !!this.sortedPages.find(page => page.$page === this.currentPage + 1);
            }
            // SetTimeout is needed to scroll only after the DOM changes
            setTimeout(() => {
                var _a, _b;
                (_b = (_a = this.currentPageEl) === null || _a === void 0 ? void 0 : _a.first) === null || _b === void 0 ? void 0 : _b.nativeElement.scrollIntoView({ behaviour: "smooth", block: "start" });
            });
        }
    }
    selectPage(page) {
        this.gotopage.next(page);
        this._pendingPage = page;
        return false;
    }
    selectPrevious() {
        return this.selectPage(this.currentPage - 1);
    }
    selectNext() {
        return this.selectPage(this.currentPage + 1);
    }
}
BsPreviewPagesPanelComponent.ɵfac = function BsPreviewPagesPanelComponent_Factory(t) { return new (t || BsPreviewPagesPanelComponent)(ɵɵdirectiveInject(PreviewService)); };
BsPreviewPagesPanelComponent.ɵcmp = ɵɵdefineComponent({ type: BsPreviewPagesPanelComponent, selectors: [["sq-preview-pages-panel"]], viewQuery: function BsPreviewPagesPanelComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0$6, true, ElementRef);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.currentPageEl = _t);
    } }, inputs: { pages: "pages", previewData: "previewData", previewDocument: "previewDocument", style: "style" }, outputs: { gotopage: "gotopage" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "list-group", 4, "ngIf"], [1, "list-group"], ["href", "#", "class", "card my-1 list-group-item-action", 3, "click", 4, "ngIf"], [4, "ngFor", "ngForOf"], ["href", "#", 1, "card", "my-1", "list-group-item-action", 3, "click"], [1, "card-body"], [1, "small", "text-muted"], ["class", "text-center my-3", 4, "ngIf"], [1, "text-center", "my-3"], ["role", "status", 1, "spinner-grow"], [4, "ngIf"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML"], [1, "card", "my-1"], ["currentPageEl", ""], [1, "card-body", "m-0"], [1, "small", "font-weight-bold", "mb-1"], ["class", "d-flex flex-column", "style", "height: 300px;", 3, "previewData", "previewDocument", "style", 4, "ngIf"], [1, "d-flex", "flex-column", 2, "height", "300px", 3, "previewData", "previewDocument"]], template: function BsPreviewPagesPanelComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsPreviewPagesPanelComponent_div_0_Template, 3, 2, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.sortedPages);
    } }, directives: [NgIf, NgForOf, BsPreviewExtractsPanelComponent], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsPreviewPagesPanelComponent, [{
        type: Component,
        args: [{
                selector: 'sq-preview-pages-panel',
                templateUrl: './preview-pages-panel.component.html'
            }]
    }], function () { return [{ type: PreviewService }]; }, { pages: [{
            type: Input
        }], previewData: [{
            type: Input
        }], previewDocument: [{
            type: Input
        }], style: [{
            type: Input
        }], gotopage: [{
            type: Output
        }], currentPageEl: [{
            type: ViewChildren,
            args: ['currentPageEl', { read: ElementRef }]
        }] }); })();

const _c0$7 = function (a0) { return { form: a0, controlName: "page" }; };
function BsPreviewPageFormComponent_form_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "form", 1);
    ɵɵelementStart(1, "div", 2);
    ɵɵelementStart(2, "div", 3);
    ɵɵelementStart(3, "label", 4);
    ɵɵtext(4);
    ɵɵpipe(5, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelement(6, "input", 5);
    ɵɵelementStart(7, "div", 6);
    ɵɵelementStart(8, "button", 7);
    ɵɵlistener("click", function BsPreviewPageFormComponent_form_0_Template_button_click_8_listener() { ɵɵrestoreView(_r2); const ctx_r1 = ɵɵnextContext(); return ctx_r1.submit(); });
    ɵɵelement(9, "i", 8);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("formGroup", ctx_r0.form);
    ɵɵadvance(1);
    ɵɵproperty("sqValidation", ɵɵpureFunction1(5, _c0$7, ctx_r0.form));
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind1(5, 3, "msg#preview.gotopage"));
} }
class BsPreviewPageFormComponent {
    constructor(formBuilder, validationService) {
        this.gotopage = new EventEmitter();
        this.pageControl = new FormControl('', [validationService.integerValidator(), validationService.minValidator(1)]);
        this.form = formBuilder.group({
            page: this.pageControl
        });
    }
    ngOnChanges() {
        this.pageControl.setValue(this.pageNumber);
    }
    submit() {
        const page = parseInt(this.pageControl.value, 10);
        if (!isNaN(page) && page !== this.pageNumber) {
            // remember the page number submitted
            // this allow us to submit again the previous page 
            // when page not exists and/or an error is triggered
            this.pageNumber = page;
            this.gotopage.next(page);
        }
    }
}
BsPreviewPageFormComponent.ɵfac = function BsPreviewPageFormComponent_Factory(t) { return new (t || BsPreviewPageFormComponent)(ɵɵdirectiveInject(FormBuilder), ɵɵdirectiveInject(ValidationService)); };
BsPreviewPageFormComponent.ɵcmp = ɵɵdefineComponent({ type: BsPreviewPageFormComponent, selectors: [["sq-preview-page-form"]], inputs: { pageNumber: "pageNumber" }, outputs: { gotopage: "gotopage" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["novalidate", "", "class", "mb-2", 3, "formGroup", 4, "ngIf"], ["novalidate", "", 1, "mb-2", 3, "formGroup"], [1, "input-group", "mb-1", 3, "sqValidation"], [1, "input-group-prepend"], ["for", "page-input", 1, "input-group-text"], ["id", "page-input", "type", "text", "placeholder", "page", "formControlName", "page", "autocomplete", "off", "spellcheck", "off", 1, "form-control"], [1, "input-group-append"], ["type", "submit", 1, "btn", "btn-primary", 3, "click"], [1, "fas", "fa-fw", "fa-arrow-right"]], template: function BsPreviewPageFormComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsPreviewPageFormComponent_form_0_Template, 10, 7, "form", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.pageNumber);
    } }, directives: [NgIf, ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, ValidationDirective, DefaultValueAccessor, NgControlStatus, FormControlName], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsPreviewPageFormComponent, [{
        type: Component,
        args: [{
                selector: 'sq-preview-page-form',
                templateUrl: './preview-page-form.component.html'
            }]
    }], function () { return [{ type: FormBuilder }, { type: ValidationService }]; }, { pageNumber: [{
            type: Input
        }], gotopage: [{
            type: Output
        }] }); })();

class BsPreviewModule {
}
BsPreviewModule.ɵmod = ɵɵdefineNgModule({ type: BsPreviewModule });
BsPreviewModule.ɵinj = ɵɵdefineInjector({ factory: function BsPreviewModule_Factory(t) { return new (t || BsPreviewModule)(); }, providers: [
        { provide: PREVIEW_MODAL, useValue: BsPreviewPopup }
    ], imports: [[
            CommonModule,
            FormsModule, ReactiveFormsModule,
            ScrollingModule,
            IntlModule,
            WebServicesModule,
            ValidationModule,
            UtilsModule,
            CollapseModule,
            MetadataModule,
            BsModalModule,
            BsFacetModule,
            ResultModule,
            BsActionModule,
            PreviewModule
        ], PreviewModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BsPreviewModule, { declarations: [BsPreviewHighlights, BsPreviewLinks,
        BsPreviewPopup, BsPreviewPanel, BsResultLinkPreview,
        BsFacetPreview, BsFacetPreviewComponent2,
        BsSimilarDocuments,
        BsPreviewEntityFacetComponent,
        BsPreviewEntityPanelComponent,
        BsPreviewExtractsPanelComponent,
        BsPreviewSearchFormComponent,
        BsPreviewPagesPanelComponent,
        BsPreviewPageFormComponent], imports: [CommonModule,
        FormsModule, ReactiveFormsModule,
        ScrollingModule,
        IntlModule,
        WebServicesModule,
        ValidationModule,
        UtilsModule,
        CollapseModule,
        MetadataModule,
        BsModalModule,
        BsFacetModule,
        ResultModule,
        BsActionModule,
        PreviewModule], exports: [PreviewModule,
        BsPreviewHighlights, BsPreviewLinks,
        BsPreviewPopup, BsPreviewPanel, BsResultLinkPreview,
        BsFacetPreview, BsFacetPreviewComponent2,
        BsSimilarDocuments,
        BsPreviewEntityFacetComponent,
        BsPreviewEntityPanelComponent,
        BsPreviewExtractsPanelComponent,
        BsPreviewSearchFormComponent,
        BsPreviewPagesPanelComponent,
        BsPreviewPageFormComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsPreviewModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule, ReactiveFormsModule,
                    ScrollingModule,
                    IntlModule,
                    WebServicesModule,
                    ValidationModule,
                    UtilsModule,
                    CollapseModule,
                    MetadataModule,
                    BsModalModule,
                    BsFacetModule,
                    ResultModule,
                    BsActionModule,
                    PreviewModule
                ],
                declarations: [
                    BsPreviewHighlights, BsPreviewLinks,
                    BsPreviewPopup, BsPreviewPanel, BsResultLinkPreview,
                    BsFacetPreview, BsFacetPreviewComponent2,
                    BsSimilarDocuments,
                    BsPreviewEntityFacetComponent,
                    BsPreviewEntityPanelComponent,
                    BsPreviewExtractsPanelComponent,
                    BsPreviewSearchFormComponent,
                    BsPreviewPagesPanelComponent,
                    BsPreviewPageFormComponent
                ],
                exports: [
                    PreviewModule,
                    BsPreviewHighlights, BsPreviewLinks,
                    BsPreviewPopup, BsPreviewPanel, BsResultLinkPreview,
                    BsFacetPreview, BsFacetPreviewComponent2,
                    BsSimilarDocuments,
                    BsPreviewEntityFacetComponent,
                    BsPreviewEntityPanelComponent,
                    BsPreviewExtractsPanelComponent,
                    BsPreviewSearchFormComponent,
                    BsPreviewPagesPanelComponent,
                    BsPreviewPageFormComponent
                ],
                providers: [
                    { provide: PREVIEW_MODAL, useValue: BsPreviewPopup }
                ]
            }]
    }], null, null); })();

var _enPreview = {
    "preview": {
        "noDocumentDataErrorPopupTitle": "Error loading document's data",
        "highlightsTitle": "Highlights",
        "noEntityToHighlight": "No highlighted entity in document",
        "termXLabel": "Search term {index, number}",
        "otherTerms": "Other terms",
        "previousDocument": "Previous",
        "nextDocument": "Next",
        "originalDocument": "Original document",
        "selectedHighlight": "Selected highlight",
        "noSelectedHighlight": "No highlight selected",
        "firstHighlightButtonAltText": "First",
        "previousHighlightButtonAltText": "Previous",
        "nextHighlightButtonAltText": "Next",
        "relevanceSortHighlightButtonText": "Relevance",
        "textOrderSortHighlightButtonText": "Text order",
        "lastHighlightButtonAltText": "Last",
        "highlightFilters": {
            "title": "Filters",
            "keepAll": "All",
            "keepNone": "None",
            "keepAllInCategory": "All",
            "keepNoneInCategory": "None"
        },
        "documentPropertiesTitle": "Details",
        "similarDocumentsTitle": "Similar documents",
        "showAll": "Show all values",
        "sortAlphabetically": "Sort alphabetically",
        "sortFrequency": "Sort by frequency",
        "loading": "Loading...",
        "noextract": "No extract",
        "search": "Search",
        "gotopage": "Go to page",
        "page": "Page {page}",
        "current": "current"
    },
    "facet": {
        "preview": {
            "closeTitle": "Close",
            "expandTitle": "Maximize",
            "minimize": "Zoom out",
            "maximize": "Zoom in",
            "toggleExtracts": "Toggle relevant extracts highlighting",
            "toggleEntities": "Toggle entities highlighting"
        }
    }
};

var _frPreview = {
    "preview": {
        "noDocumentDataErrorPopupTitle": "Echec d'accès aux données de ce document",
        "highlightsTitle": "Surlignage",
        "noEntityToHighlight": "Aucune entité affichée dans ce document",
        "termXLabel": "Terme recherché {index, number}",
        "otherTerms": "Autres termes",
        "previousDocument": "Précédent",
        "nextDocument": "Suivant",
        "originalDocument": "Document original",
        "selectedHighlight": "Elément sélectionné",
        "noSelectedHighlight": "Aucun élément sélectionné",
        "firstHighlightButtonAltText": "Premier élément",
        "previousHighlightButtonAltText": "Elément précédent",
        "nextHighlightButtonAltText": "Elément suivant",
        "relevanceSortHighlightButtonText": "Pertinence",
        "textOrderSortHighlightButtonText": "Ordre du texte",
        "lastHighlightButtonAltText": "Dernier élément",
        "highlightFilters": {
            "title": "Filtres",
            "keepAll": "Tout inclure",
            "keepNone": "Tout exclure",
            "keepAllInCategory": "Toutes les entités",
            "keepNoneInCategory": "Aucune entité"
        },
        "documentPropertiesTitle": "Détails",
        "similarDocumentsTitle": "Documents similaires",
        "showAll": "Montrer toutes les valeurs",
        "sortAlphabetically": "Trier par ordre alphabetique",
        "sortFrequency": "Trier par fréquence",
        "loading": "Chargement...",
        "noextract": "Pas d'extrait",
        "search": "Recherche",
        "gotopage": "Aller à la page",
        "page": "Page {page}",
        "current": "actuel"
    },
    "facet": {
        "preview": {
            "closeTitle": "Fermer",
            "expandTitle": "Maximiser",
            "minimize": "Réduire",
            "maximize": "Agrandir",
            "toggleExtracts": "Surlignage des extraits pertinents",
            "toggleEntities": "Surlignage des entités"
        }
    }
};

var _dePreview = {
    "preview": {
        "noDocumentDataErrorPopupTitle": "Fehler beim Laden der Dokumentdaten",
        "highlightsTitle": "Markierungen",
        "noEntityToHighlight": "Keine Markierungen im Dokument verfügbar",
        "termXLabel": "Suchbegriff",
        "otherTerms": "Andere Begriffe",
        "previousDocument": "Vorheriges Dokument",
        "nextDocument": "Nächstes Dokument",
        "originalDocument": "Originales Dokument",
        "selectedHighlight": "Ausgewählte Markierung",
        "noSelectedHighlight": "Keine Markierung ausgewählt",
        "firstHighlightButtonAltText": "Erste Markierung",
        "previousHighlightButtonAltText": "Vorherige Markierung",
        "nextHighlightButtonAltText": "Nächste Markierung",
        "lastHighlightButtonAltText": "Letzte Markierung",
        "highlightFilters": {
            "title": "Filter",
            "keepAll": "Alle",
            "keepNone": "Keine",
            "keepAllInCategory": "Alle",
            "keepNoneInCategory": "Keine"
        },
        "documentPropertiesTitle": "Dokumenteigenschaften",
        "similarDocumentsTitle": "Ähnliche Dokumente",
        "showAll": "Zeige alle Werte",
        "sortAlphabetically": "Alphabetische Sortierung",
        "sortFrequency": "Sortierung nach Häufigkeit",
        "loading": "Laden...",
        "noextract": "kein Auszug",
        "search": "Suche",
        "gotopage": "Zur Seite gehen",
        "page": "Seite {page}",
        "current": "aktuell"
    },
    "facet": {
        "preview": {
            "closeTitle": "Schließen",
            "expandTitle": "Maximieren",
            "minimize": "Rauszoomen",
            "maximize": "hineinzoomen",
            "toggleExtracts": "Schalten Sie die Hervorhebung relevanter Auszüge um",
            "toggleEntities": "Schalten Sie die Hervorhebung von Objekten"
        }
    }
};

const enPreview = Utils.merge({}, _enPreview, enSearch, enCollapse, enMetadata, enModal, enFacet, enResult);
const frPreview = Utils.merge({}, _frPreview, frSearch, frCollapse, frMetadata, frModal, frFacet, frResult);
const dePreview = Utils.merge({}, _dePreview, deSearch, deCollapse, deMetadata, deModal, deFacet, deResult);

/**
 * Generated bundle index. Do not edit.
 */

export { BsFacetPreview, BsFacetPreviewComponent2, BsPreviewEntityFacetComponent, BsPreviewEntityPanelComponent, BsPreviewExtractsPanelComponent, BsPreviewHighlights, BsPreviewLinks, BsPreviewModule, BsPreviewPageFormComponent, BsPreviewPagesPanelComponent, BsPreviewPanel, BsPreviewPopup, BsPreviewSearchFormComponent, BsResultLinkPreview, BsSimilarDocuments, Extract, HighlightCategoryFilterChoice, PREVIEW_MODAL, PreviewDocument, PreviewDocumentIframe, PreviewModule, PreviewService, PreviewTooltip, dePreview, enPreview, frPreview };
//# sourceMappingURL=sinequa-components-preview.js.map
