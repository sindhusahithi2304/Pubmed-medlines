(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@sinequa/core/intl'), require('@sinequa/core/web-services'), require('@sinequa/components/utils'), require('@sinequa/core/base'), require('@angular/platform-browser'), require('rxjs'), require('@angular/router'), require('@sinequa/core/app-utils'), require('@sinequa/core/login'), require('@sinequa/components/search'), require('@sinequa/core/modal'), require('@sinequa/components/saved-queries'), require('@sinequa/components/result'), require('@sinequa/components/facet'), require('@sinequa/components/action'), require('@sinequa/components/metadata'), require('@angular/forms'), require('@angular/cdk/scrolling'), require('@sinequa/core/validation'), require('@sinequa/components/collapse'), require('@sinequa/components/modal')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/preview', ['exports', '@angular/core', '@angular/common', '@sinequa/core/intl', '@sinequa/core/web-services', '@sinequa/components/utils', '@sinequa/core/base', '@angular/platform-browser', 'rxjs', '@angular/router', '@sinequa/core/app-utils', '@sinequa/core/login', '@sinequa/components/search', '@sinequa/core/modal', '@sinequa/components/saved-queries', '@sinequa/components/result', '@sinequa/components/facet', '@sinequa/components/action', '@sinequa/components/metadata', '@angular/forms', '@angular/cdk/scrolling', '@sinequa/core/validation', '@sinequa/components/collapse', '@sinequa/components/modal'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components.preview = {}), global.ng.core, global.ng.common, global.sinequa.core.intl, global.sinequa.core['web-services'], global.sinequa.components.utils, global.sinequa.core.base, global.ng.platformBrowser, global.rxjs, global.ng.router, global.sinequa.core['app-utils'], global.sinequa.core.login, global.sinequa.components.search, global.sinequa.core.modal, global.sinequa.components['saved-queries'], global.sinequa.components.result, global.sinequa.components.facet, global.sinequa.components.action, global.sinequa.components.metadata, global.ng.forms, global.ng.cdk.scrolling, global.sinequa.core.validation, global.sinequa.components.collapse, global.sinequa.components.modal));
}(this, (function (exports, i0, i2, i3, i2$1, i3$2, base, i1, rxjs, i1$1, i3$1, i4, i1$2, i6, i7, i5, i4$2, i4$1, i5$1, i1$3, i5$2, i2$2, collapse, i4$3) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    (function (HighlightCategoryFilterChoice) {
        HighlightCategoryFilterChoice[HighlightCategoryFilterChoice["All"] = 0] = "All";
        HighlightCategoryFilterChoice[HighlightCategoryFilterChoice["None"] = 1] = "None";
        HighlightCategoryFilterChoice[HighlightCategoryFilterChoice["Value"] = 2] = "Value";
    })(exports.HighlightCategoryFilterChoice || (exports.HighlightCategoryFilterChoice = {}));
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
    var PreviewDocument = /** @class */ (function () {
        function PreviewDocument(element) {
            var _a, _b;
            if (element instanceof i0.ElementRef) {
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
        PreviewDocument.prototype.getContentWindow = function () {
            return this._window;
        };
        Object.defineProperty(PreviewDocument.prototype, "document", {
            /**
             * Returns the root Document element of the HTML Preview
             */
            get: function () {
                return this._document || this._window.document;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Insert a given DOM Element in the body of the document preview
         * @param component
         */
        PreviewDocument.prototype.insertComponent = function (component) {
            this.document.body.appendChild(component);
        };
        /**
         * Returns the text of a given entity
         * @param categoryId Category of the entity
         * @param index Index of the entity in that category
         */
        PreviewDocument.prototype.getHighlightText = function (categoryId, index) {
            if (index < 0) {
                return "";
            }
            var nodes = this.document.querySelectorAll("#" + categoryId + "_" + index);
            if (!nodes || nodes.length === 0) {
                return "";
            }
            var text = "";
            forEach(nodes, function (n) { return text += (n['innerHTML'] || n.textContent); });
            return text;
        };
        /**
         * Update the location of the entities' SVG background (for some converters)
         */
        PreviewDocument.prototype.setSvgBackgroundPositionAndSize = function () {
            var svgList = this.document.querySelectorAll("svg");
            if (svgList != null) {
                for (var i = 0, ic = svgList.length; i < ic; i++) {
                    var svg = svgList.item(i);
                    var tspanList = svg.getElementsByTagName("tspan");
                    if (tspanList != null) {
                        for (var j = 0, jc = tspanList.length; j < jc; j++) {
                            var tspan = tspanList.item(j);
                            if (tspan) {
                                var bgId = tspan.getAttribute("data-entity-background");
                                if (bgId) {
                                    var rect = this.getFirst(this.getDocElements(bgId));
                                    if (rect) {
                                        this.resizeSvgBackground(rect, tspan);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        /**
         * Select a specific entity by applying specific highlight classes
         * to the DOM elements and scrolling the view to center around them.
         * @param categoryId Category of the entity
         * @param index Index of the entity in that category
         */
        PreviewDocument.prototype.selectHighlight = function (categoryId, index) {
            this.clearHighlightSelection();
            // current element becomes previous element
            this.previousElement = this.document.getElementById(categoryId + '_' + index);
            if (this.previousElement) {
                // highlight new selected element
                this.setHighlightSelection(this.previousElement, true, true);
                this.previousElement.scrollIntoView({ block: 'center' });
            }
        };
        /**
         * Removes all entity selection classes from the document HTML elements
         */
        PreviewDocument.prototype.clearHighlightSelection = function () {
            // Clear HTML elements borders
            if (this.previousElement) {
                this.previousElement.classList.remove(PreviewDocument.SELECTED_HIGHLIGHT_CLASS);
            }
            // Clear SVG elements borders
            var elements = this.document.querySelectorAll("line.sq-svg");
            for (var i = 0; i < elements.length; i++) {
                var parentNode = elements[i].parentNode;
                if (parentNode) {
                    parentNode.removeChild(elements[i]);
                }
            }
        };
        /**
         * Turns highlights on or off based on the provided filter object. Additionally clears the selected entity
         * @param filters object where each key provides a filter for each category of entity/highlight
         */
        PreviewDocument.prototype.filterHighlights = function (filters) {
            this.updateHighlightFilterState(filters);
            this.clearHighlightSelection();
        };
        /**
         * Loop through every highlighted element in the document and turn highlights on or off based on the filters object.
         * If the filters object is an array then only the specified categories are highlighted.
         * @param filters object where each key provides a filter for each category of entity/highlight
         */
        PreviewDocument.prototype.updateHighlightFilterState = function (filters) {
            var elements = this.document.querySelectorAll("[data-entity-display], .extractslocations, .matchlocations");
            if (base.Utils.isArray(filters)) {
                forEach(elements, function (element) {
                    var highlight = filters.some(function (category) { return element.classList.contains(category); });
                    if (highlight) {
                        element.classList.remove(PreviewDocument.FILTERED_OUT_HIGHLIGHT_CLASS);
                    }
                    else {
                        element.classList.add(PreviewDocument.FILTERED_OUT_HIGHLIGHT_CLASS);
                    }
                });
            }
            else {
                forEach(elements, function (element) {
                    if (PreviewDocument.elementIsFilteredOut(element, filters)) {
                        element.classList.add(PreviewDocument.FILTERED_OUT_HIGHLIGHT_CLASS);
                    }
                    else {
                        element.classList.remove(PreviewDocument.FILTERED_OUT_HIGHLIGHT_CLASS);
                    }
                });
            }
        };
        /**
         * Turns on/off the highlights of one category of entities or a specific value if provided
         * @param category e.g. person
         * @param on true for highlighting / false for turning off
         * @param value e.g. "BILL GATES"
         */
        PreviewDocument.prototype.toggleHighlight = function (category, on, value) {
            var elements = this.document.querySelectorAll("." + category);
            forEach(elements, function (element) {
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
        };
        // PRIVATE METHODS
        PreviewDocument.prototype.setHighlightSelection = function (elt, isFirst, isLast) {
            if (this.isSvgElement(elt)) {
                this.setHighlightSelectionSVG(elt, isFirst, isLast);
            }
            else {
                this.setHighlightSelectionHTML(elt, isFirst, isLast);
            }
        };
        PreviewDocument.prototype.setHighlightSelectionHTML = function (elt, isFirst, isLast) {
            elt.classList.add(PreviewDocument.SELECTED_HIGHLIGHT_CLASS);
            if (isFirst) {
                elt.classList.add(PreviewDocument.SELECTED_HIGHLIGHT_FIRST_FRAGMENT_CLASS);
            }
            if (isLast) {
                elt.classList.add(PreviewDocument.SELECTED_HIGHLIGHT_LAST_FRAGMENT_CLASS);
            }
        };
        PreviewDocument.prototype.setHighlightSelectionSVG = function (elt, isFirst, isLast) {
            var bgId = elt.getAttribute("data-entity-background");
            if (!bgId)
                return;
            var rect = this.getFirst(this.getDocElements(bgId));
            var group = rect.parentNode;
            var rectPosition = rect.getBBox();
            if (group) {
                var top = rectPosition.y;
                var bottom = rectPosition.y + rectPosition.height;
                var left = rectPosition.x;
                var right = rectPosition.x + rectPosition.width;
                var valueTransform = rect.getAttribute("transform");
                this.addSvgLine(group, left, top, right, top, valueTransform);
                this.addSvgLine(group, left, bottom, right, bottom, valueTransform);
                if (isFirst)
                    this.addSvgLine(group, left, top, left, bottom, valueTransform);
                if (isLast)
                    this.addSvgLine(group, right, top, right, bottom, valueTransform);
            }
        };
        PreviewDocument.prototype.addSvgLine = function (group, x1, y1, x2, y2, transform) {
            var line = this.document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("class", PreviewDocument.SVG_LINE_CLASS);
            line.setAttribute("x1", String(x1));
            line.setAttribute("y1", String(y1));
            line.setAttribute("x2", String(x2));
            line.setAttribute("y2", String(y2));
            if (transform)
                line.setAttribute("transform", transform);
            group.appendChild(line);
        };
        PreviewDocument.prototype.resizeSvgBackground = function (rect, tspan) {
            var elt = tspan;
            while (elt.tagName !== "text") {
                elt = elt.parentNode;
                if (elt == null)
                    break;
            }
            var text = elt;
            var textBoxPixel = text.getBoundingClientRect();
            var textBoxSVG = text.getBBox();
            if (textBoxPixel.height === 0 || textBoxPixel.width === 0)
                return;
            var scaleX = textBoxSVG.width / textBoxPixel.width;
            var scaleY = textBoxSVG.height / textBoxPixel.height;
            var deltaX = 2 * scaleX;
            var deltaY = 2 * scaleY;
            var firstCharRect = tspan.getExtentOfChar(0);
            var tspanWidth = tspan.getComputedTextLength();
            rect.setAttribute("x", String(firstCharRect.x - deltaX));
            rect.setAttribute("y", String(firstCharRect.y - deltaY));
            rect.setAttribute("width", String(tspanWidth + 2 * deltaX));
            rect.setAttribute("height", String(textBoxSVG.height + 2 * deltaY));
            var valueTransform = text.getAttribute("transform");
            if (valueTransform)
                rect.setAttribute("transform", valueTransform);
        };
        PreviewDocument.prototype.getDocElements = function (id) {
            var list = Array();
            // Get HTML elements directly by id
            var eltList = this.document.querySelectorAll("#" + id);
            for (var i = 0; i < eltList.length; i++) {
                list.push(eltList[i]);
            }
            // Get SVG tspan iterating on them (jquery querySelectorAll didn't return SVG inner elements)
            var svgList = this.document.querySelectorAll("svg");
            if (svgList != null) {
                for (var i = 0, ic = svgList.length; i < ic; i++) {
                    var svg = svgList.item(i);
                    var tspanList = svg.getElementsByTagName("tspan");
                    if (tspanList != null) {
                        for (var j = 0, jc = tspanList.length; j < jc; j++) {
                            var tspan = tspanList.item(j);
                            if (tspan) {
                                if (tspan.id === id)
                                    list.push(tspan);
                            }
                        }
                    }
                }
            }
            return list;
        };
        PreviewDocument.prototype.getFirst = function (nodes) {
            return (nodes != null && nodes.length > 0) ? nodes[0] : null;
        };
        PreviewDocument.prototype.isSvgElement = function (elt) {
            if (elt == null)
                return false;
            return "viewportElement" in elt;
        };
        // PRIVATE STATIC (from highlight helper)
        PreviewDocument.elementIsFilteredOut = function (element, filters) {
            var elementClass = this.getElementCategory(element, Object.keys(filters));
            if (elementClass == null) {
                return false;
            }
            var filterState = filters[elementClass];
            if (filterState == null) {
                return false;
            }
            if (filterState.choice === exports.HighlightCategoryFilterChoice.None) {
                return true;
            }
            if (filterState.choice === exports.HighlightCategoryFilterChoice.All) {
                return false;
            }
            if (element.hasAttribute(PreviewDocument.BASIC_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE)) {
                return filterState.filterValue !== element.getAttribute(PreviewDocument.BASIC_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE);
            }
            return filterState.filterValue !== element.getAttribute(PreviewDocument.ADVANCED_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE);
        };
        PreviewDocument.getElementCategory = function (element, categoryIds) {
            var e_1, _c;
            try {
                for (var categoryIds_1 = __values(categoryIds), categoryIds_1_1 = categoryIds_1.next(); !categoryIds_1_1.done; categoryIds_1_1 = categoryIds_1.next()) {
                    var categoryId = categoryIds_1_1.value;
                    if (element.classList.contains(categoryId)) {
                        return categoryId;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (categoryIds_1_1 && !categoryIds_1_1.done && (_c = categoryIds_1.return)) _c.call(categoryIds_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return "";
        };
        return PreviewDocument;
    }());
    PreviewDocument.SELECTED_HIGHLIGHT_CLASS = "sq-current";
    PreviewDocument.SELECTED_HIGHLIGHT_FIRST_FRAGMENT_CLASS = "sq-first";
    PreviewDocument.SELECTED_HIGHLIGHT_LAST_FRAGMENT_CLASS = "sq-last";
    PreviewDocument.FILTERED_OUT_HIGHLIGHT_CLASS = "sq-inactive";
    PreviewDocument.SVG_LINE_CLASS = "sq-svg";
    PreviewDocument.BASIC_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE = "data-entity-basic";
    PreviewDocument.ADVANCED_ENTITY_DISPLAY_ELEMENT_ATTRIBUTE = "data-entity-display";

    var _c0 = ["tooltip"];
    var _c1 = ["documentFrame"];
    var _c2 = function (a0) { return { "-ms-zoom": a0, "-moz-transform": "scale(var(--factor))", "-o-transform": "scale(var(--factor))", "-webkit-transform": "scale(var(--factor))" }; };
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
    var PreviewDocumentIframe = /** @class */ (function () {
        function PreviewDocumentIframe(cdr, sanitizer) {
            this.cdr = cdr;
            this.sanitizer = sanitizer;
            this.defaultSandbox = "allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts";
            this.scalingFactor = 1.0;
            this.onPreviewReady = new i0.EventEmitter();
            // page could change when location.href change or when user click on a tab (sheet case)
            // when URL a string is sent otherwise a PreviewDocument
            this.pageChange = new i0.EventEmitter();
            this.previewDocLoadHandler = this.onPreviewDocLoad.bind(this);
        }
        PreviewDocumentIframe.prototype.onPreviewDocLoad = function () {
            var _this = this;
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
            var sheetFrame = this.documentFrame.nativeElement.contentDocument.getElementsByName("frSheet");
            if (sheetFrame.length > 0) {
                sheetFrame[0].removeEventListener("load", function () { });
                sheetFrame[0].addEventListener("load", function () {
                    _this.previewDocument = new PreviewDocument(_this.documentFrame);
                    _this.pageChange.next(_this.previewDocument);
                    _this.cdr.markForCheck();
                }, true);
            }
            if (this.tooltip)
                this.addTooltip(this.previewDocument);
            // Let upstream component know document is now ready
            this.onPreviewReady.next(this.previewDocument);
            this.cdr.markForCheck();
        };
        PreviewDocumentIframe.prototype.addTooltip = function (previewDocument) {
            previewDocument.insertComponent(this.tooltip.nativeElement);
        };
        PreviewDocumentIframe.prototype.ngOnInit = function () {
            this.documentFrame.nativeElement.addEventListener("load", this.previewDocLoadHandler, true);
        };
        PreviewDocumentIframe.prototype.ngOnDestroy = function () {
            this.documentFrame.nativeElement.removeEventListener("load", this.previewDocLoadHandler);
        };
        PreviewDocumentIframe.prototype.ngOnChanges = function (simpleChanges) {
            if (simpleChanges.scalingFactor && !simpleChanges.scalingFactor.firstChange) {
                return;
            }
            this.resetContent();
            if (simpleChanges.downloadUrl && simpleChanges.downloadUrl.currentValue !== undefined) {
                // set sandbox attribute only when downloadUrl is defined, so iframe is created without sandbox attribute
                // if sandbox is null, keep sandbox attribute to undefined
                // otherwise put sanbox value in the sanbox attribute or default sandbox value
                this._sandbox = (this.sandbox === null) ? undefined : base.Utils.isString(this.sandbox) ? this.sandbox : this.defaultSandbox;
                this.sanitizedUrlSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.downloadUrl);
            }
        };
        PreviewDocumentIframe.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.resetContent();
            this.iframeURLChange(this.documentFrame.nativeElement, function (newURL) {
                _this.previewDocument = new PreviewDocument(_this.documentFrame);
                _this.pageChange.next(newURL);
            });
        };
        PreviewDocumentIframe.prototype.iframeURLChange = function (iframe, callback) {
            var lastDispatched = null;
            var dispatchChange = function () {
                if (iframe.contentWindow) {
                    var newHref = iframe.contentWindow.location.href;
                    if (newHref === "about:blank")
                        return;
                    if (newHref !== lastDispatched) {
                        callback(newHref);
                        lastDispatched = newHref;
                    }
                }
            };
            var unloadHandler = function (e) {
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
        };
        PreviewDocumentIframe.prototype.resetContent = function () {
            this.sanitizedUrlSrc = this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
        };
        return PreviewDocumentIframe;
    }());
    PreviewDocumentIframe.ɵfac = function PreviewDocumentIframe_Factory(t) { return new (t || PreviewDocumentIframe)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.DomSanitizer)); };
    PreviewDocumentIframe.ɵcmp = i0.ɵɵdefineComponent({ type: PreviewDocumentIframe, selectors: [["sq-preview-document-iframe"]], contentQueries: function PreviewDocumentIframe_ContentQueries(rf, ctx, dirIndex) {
            if (rf & 1) {
                i0.ɵɵcontentQuery(dirIndex, _c0, true, i0.ElementRef);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.tooltip = _t.first);
            }
        }, viewQuery: function PreviewDocumentIframe_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵstaticViewQuery(_c1, true);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.documentFrame = _t.first);
            }
        }, inputs: { sandbox: "sandbox", downloadUrl: "downloadUrl", scalingFactor: "scalingFactor" }, outputs: { onPreviewReady: "onPreviewReady", pageChange: "pageChange" }, features: [i0.ɵɵNgOnChangesFeature], decls: 2, vars: 7, consts: [[3, "src", "ngStyle"], ["documentFrame", ""]], template: function PreviewDocumentIframe_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelement(0, "iframe", 0, 1);
            }
            if (rf & 2) {
                i0.ɵɵstyleProp("--factor", ctx.scalingFactor);
                i0.ɵɵproperty("src", ctx.sanitizedUrlSrc, i0.ɵɵsanitizeResourceUrl)("ngStyle", i0.ɵɵpureFunction1(5, _c2, ctx.scalingFactor));
                i0.ɵɵattribute("sandbox", ctx._sandbox);
            }
        }, directives: [i2.NgStyle], styles: ["[_nghost-%COMP%]{\n    flex: 1;\n}\n\n\niframe[_ngcontent-%COMP%] {\n    background-color: white;\n    flex: 1;\n    position: relative;\n    display: block;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    height: calc(100% / var(--factor));\n    width: calc(100% / var(--factor));\n    border: 0;\n\n    -moz-transform-origin: 0 0;\n    -o-transform-origin: 0 0;\n    -webkit-transform-origin: 0 0;\n}\n\n.spinner-grow[_ngcontent-%COMP%] {\n    width: 3rem;\n    height: 3rem\n}"], changeDetection: 0 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PreviewDocumentIframe, [{
                type: i0.Component,
                args: [{
                        selector: "sq-preview-document-iframe",
                        template: "\n                <iframe #documentFrame\n                    [attr.sandbox]=\"_sandbox\"\n                    [src]=\"sanitizedUrlSrc\"\n                    [style.--factor]=\"scalingFactor\"\n                    [ngStyle]=\"{'-ms-zoom': scalingFactor, '-moz-transform': 'scale(var(--factor))', '-o-transform': 'scale(var(--factor))', '-webkit-transform': 'scale(var(--factor))'}\">\n                </iframe>",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        styles: ["\n:host{\n    flex: 1;\n}\n\n\niframe {\n    background-color: white;\n    flex: 1;\n    position: relative;\n    display: block;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    height: calc(100% / var(--factor));\n    width: calc(100% / var(--factor));\n    border: 0;\n\n    -moz-transform-origin: 0 0;\n    -o-transform-origin: 0 0;\n    -webkit-transform-origin: 0 0;\n}\n\n.spinner-grow {\n    width: 3rem;\n    height: 3rem\n}\n    "]
                    }]
            }], function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.DomSanitizer }]; }, { sandbox: [{
                    type: i0.Input
                }], downloadUrl: [{
                    type: i0.Input
                }], scalingFactor: [{
                    type: i0.Input
                }], onPreviewReady: [{
                    type: i0.Output
                }], pageChange: [{
                    type: i0.Output
                }], documentFrame: [{
                    type: i0.ViewChild,
                    args: ['documentFrame', { static: true }]
                }], tooltip: [{
                    type: i0.ContentChild,
                    args: ['tooltip', { read: i0.ElementRef, static: false }]
                }] });
    })();

    var _c0$1 = ["tooltip"];
    var _c1$1 = function (a0) { return { disabled: a0 }; };
    function PreviewTooltip_ng_container_2_ng_container_11_Template(rf, ctx) {
        if (rf & 1) {
            var _r6_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "span", 9);
            i0.ɵɵlistener("click", function PreviewTooltip_ng_container_2_ng_container_11_Template_span_click_1_listener($event) { i0.ɵɵrestoreView(_r6_1); var ctx_r5 = i0.ɵɵnextContext(2); return ctx_r5.previousEntity($event); });
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵtext(3, "\u276C");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "span", 10);
            i0.ɵɵlistener("click", function PreviewTooltip_ng_container_2_ng_container_11_Template_span_click_4_listener($event) { i0.ɵɵrestoreView(_r6_1); var ctx_r7 = i0.ɵɵnextContext(2); return ctx_r7.nextEntity($event); });
            i0.ɵɵpipe(5, "sqMessage");
            i0.ɵɵtext(6, "\u276D");
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r3 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(2, 4, "msg#preview.previousHighlightButtonAltText"));
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c1$1, ctx_r3.entityIdx <= 1));
            i0.ɵɵadvance(3);
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(5, 6, "msg#preview.nextHighlightButtonAltText"));
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c1$1, ctx_r3.entityIdx >= ctx_r3.entityCount));
        }
    }
    function PreviewTooltip_ng_container_2_button_13_span_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span");
        }
        if (rf & 2) {
            var action_r8 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵclassMap(action_r8.icon);
        }
    }
    var _c2$1 = function (a0, a1, a2) { return { type: a0, value: a1, display: a2 }; };
    var _c3 = function (a0) { return { values: a0 }; };
    function PreviewTooltip_ng_container_2_button_13_span_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var action_r8 = i0.ɵɵnextContext().$implicit;
            var ctx_r10 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, action_r8.text, i0.ɵɵpureFunction1(8, _c3, i0.ɵɵpureFunction3(4, _c2$1, ctx_r10.entityType, ctx_r10.entityValue, ctx_r10.entityDisplay))));
        }
    }
    function PreviewTooltip_ng_container_2_button_13_span_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span");
        }
        if (rf & 2) {
            var action_r8 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵclassMap(action_r8.iconAfter);
        }
    }
    function PreviewTooltip_ng_container_2_button_13_Template(rf, ctx) {
        if (rf & 1) {
            var _r16_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "button", 11);
            i0.ɵɵlistener("click", function PreviewTooltip_ng_container_2_button_13_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r16_1); var action_r8 = ctx.$implicit; var ctx_r15 = i0.ɵɵnextContext(2); return ctx_r15.entityAction(action_r8, $event); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵtemplate(2, PreviewTooltip_ng_container_2_button_13_span_2_Template, 1, 3, "span", 12);
            i0.ɵɵtemplate(3, PreviewTooltip_ng_container_2_button_13_span_3_Template, 3, 10, "span", 2);
            i0.ɵɵtemplate(4, PreviewTooltip_ng_container_2_button_13_span_4_Template, 1, 3, "span", 12);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var action_r8 = ctx.$implicit;
            var ctx_r4 = i0.ɵɵnextContext(2);
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind2(1, 6, action_r8.title || "", i0.ɵɵpureFunction1(13, _c3, i0.ɵɵpureFunction3(9, _c2$1, ctx_r4.entityType, ctx_r4.entityValue, ctx_r4.entityDisplay))));
            i0.ɵɵproperty("disabled", action_r8.disabled)("hidden", action_r8.hidden);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", action_r8.icon);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", action_r8.text);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", action_r8.iconAfter);
        }
    }
    function PreviewTooltip_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "span", 3);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "span", 4);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "span", 5);
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(8, "/");
            i0.ɵɵelementStart(9, "span", 6);
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(11, PreviewTooltip_ng_container_2_ng_container_11_Template, 7, 12, "ng-container", 2);
            i0.ɵɵelementStart(12, "div", 7);
            i0.ɵɵtemplate(13, PreviewTooltip_ng_container_2_button_13_Template, 5, 15, "button", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", ctx_r1.entityDisplay, " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("(", i0.ɵɵpipeBind1(5, 6, ctx_r1.entityLabel), ") ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", ctx_r1.entityIdx, " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx_r1.entityCount, " ");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r1.entityNavActions);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx_r1.entityActions);
        }
    }
    function PreviewTooltip_ng_container_3_ng_container_1_span_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span");
        }
        if (rf & 2) {
            var action_r18 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵclassMap(action_r18.icon);
        }
    }
    var _c4 = function (a0) { return { text: a0 }; };
    function PreviewTooltip_ng_container_3_ng_container_1_span_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var action_r18 = i0.ɵɵnextContext().$implicit;
            var ctx_r20 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, action_r18.text, i0.ɵɵpureFunction1(6, _c3, i0.ɵɵpureFunction1(4, _c4, ctx_r20.selectedText.slice(0, 50)))));
        }
    }
    function PreviewTooltip_ng_container_3_ng_container_1_span_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span");
        }
        if (rf & 2) {
            var action_r18 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵclassMap(action_r18.iconAfter);
        }
    }
    function PreviewTooltip_ng_container_3_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r26_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "button", 11);
            i0.ɵɵlistener("click", function PreviewTooltip_ng_container_3_ng_container_1_Template_button_click_1_listener($event) { i0.ɵɵrestoreView(_r26_1); var action_r18 = ctx.$implicit; var ctx_r25 = i0.ɵɵnextContext(2); return ctx_r25.selectedTextAction(action_r18, $event); });
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵtemplate(3, PreviewTooltip_ng_container_3_ng_container_1_span_3_Template, 1, 3, "span", 12);
            i0.ɵɵtemplate(4, PreviewTooltip_ng_container_3_ng_container_1_span_4_Template, 3, 8, "span", 2);
            i0.ɵɵtemplate(5, PreviewTooltip_ng_container_3_ng_container_1_span_5_Template, 1, 3, "span", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var action_r18 = ctx.$implicit;
            var ctx_r17 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind2(2, 6, action_r18.title || "", i0.ɵɵpureFunction1(11, _c3, i0.ɵɵpureFunction1(9, _c4, ctx_r17.selectedText.slice(0, 50)))));
            i0.ɵɵproperty("disabled", action_r18.disabled)("hidden", action_r18.hidden);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", action_r18.icon);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", action_r18.text);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", action_r18.iconAfter);
        }
    }
    function PreviewTooltip_ng_container_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, PreviewTooltip_ng_container_3_ng_container_1_Template, 6, 13, "ng-container", 13);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r2.selectedTextActions);
        }
    }
    var _c5 = function (a0, a1, a2) { return { "visibility": a0, "bottom": a1, "left": a2 }; };
    var PreviewTooltip = /** @class */ (function () {
        function PreviewTooltip(zone, changeDetectorRef, sanitizer) {
            var _this = this;
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
            this.handleMouseDown = function (event) {
                //if(event.target !== this.tooltip)
                _this.selectedText = "";
                //this.changeDetectorRef.detectChanges();
            };
            /**
             * Handle mouse button up: get the selected text and display a tooltip above it
             */
            this.handleMouseUp = function () {
                var selection = _this.document.getSelection();
                _this.selectedText = selection ? selection.toString().trim() : "";
                if (selection && _this.selectedText) {
                    var range = selection.getRangeAt(0);
                    //console.log("Selected text: ", text);
                    //console.log(event);
                    //console.log(range.getBoundingClientRect());
                    _this.changeDetectorRef.detectChanges(); // Refresh size of tooltip
                    _this.positionTooltipAbove(range.getBoundingClientRect());
                }
                _this.changeDetectorRef.detectChanges();
            };
            this._inTime = 0;
            /**
             * Handle mouse movements. If hovering an entity and no text is selected, will display a tooltip for this entity
             */
            this.handleMouseMove = function (event) {
                if (!_this.selectedText && event["path"]) {
                    var path = event["path"];
                    if (path.length > 0) {
                        var element = path[0];
                        if (element.nodeType === 1 && element.nodeName === "SPAN" && (element.attributes["data-entity-basic"] || element.attributes["data-entity-display"])) {
                            if (_this.entityType !== element.className.split(" ")[0] || _this.entityDisplay !== element.textContent) { // Tooltip not already displayed
                                _this.entityType = element.className.split(" ")[0]; // Update text (and visibility)
                                _this.entityDisplay = element.textContent || ""; // Tooltip content
                                var value_1 = element.attributes["data-entity-basic"] || element.attributes["data-entity-display"];
                                _this.entityValue = value_1.value;
                                var highlights = _this.previewData.highlightsPerCategory[_this.entityType].values
                                    .find(function (v) { return v.value === value_1.value; });
                                _this.entityCount = highlights ? highlights.locations.length : 0;
                                _this.entityLabel = _this.previewData.highlightsPerCategory[_this.entityType].categoryDisplayLabel;
                                var idsplt = element.id.split("_");
                                var idx_1 = parseInt(idsplt[idsplt.length - 1], 10);
                                var entity = _this.findEntity(_this.entityType, _this.entityValue, function (_, idIndex) { return idIndex === idx_1; });
                                _this.entityIdx = entity ? entity.valueIndex : 0;
                                _this.changeDetectorRef.detectChanges(); // Refresh size of tooltip
                                _this.positionTooltipAbove(element.getBoundingClientRect());
                            }
                            _this._inTime = Date.now(); // Reset the timer over an entity
                            return;
                        }
                    }
                }
                // We are not hovering an entity
                if (_this.entityType) { // If still displaying the tooltip...
                    var isOverTooltip = !!event["path"].find(function (el) { return el.localName === "sq-preview-tooltip"; });
                    if (!isOverTooltip) {
                        if (Date.now() - _this._inTime > 200) { // 200 ms tolerance before closing tooltip
                            _this.entityType = "";
                            _this.entityValue = "";
                            _this.entityDisplay = "";
                            _this.entityLabel = "";
                            _this.entityCount = 0;
                            _this.entityIdx = 0;
                            _this.changeDetectorRef.detectChanges(); // Turn off tooltip
                        }
                    }
                    else {
                        _this._inTime = Date.now(); // Reset the timer over the tooltip
                    }
                }
            };
            /**
             * Handle scroll events
             */
            this.handleScroll = function (event) {
                if (_this.selectedText !== "") {
                    _this.handleMouseUp(); // Reposition tooltip above selected text
                }
                else if (_this.entityType !== "") {
                    _this.entityType = "";
                    _this.entityValue = "";
                    _this.changeDetectorRef.detectChanges(); // Turn off tooltip
                }
            };
        }
        /**
         * Add mouse listeners to a new preview document in order to display the tooltip
         * in response to specific hover of click events
         * @param changes
         */
        PreviewTooltip.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if (changes["previewDocument"] && !!this.previewDocument) {
                if (typeof this.previewDocument.document.addEventListener !== undefined) {
                    this.document.addEventListener("mouseup", this.handleMouseUp, false);
                    this.document.addEventListener("mousedown", this.handleMouseDown, false);
                    this.document.addEventListener("mousemove", this.handleMouseMove, false);
                    this.window.addEventListener("scroll", this.handleScroll, false);
                }
            }
            if (changes["scalingFactor"] && this.previewDocument) {
                setTimeout(function () { return _this.handleMouseUp(); });
            }
        };
        Object.defineProperty(PreviewTooltip.prototype, "document", {
            /**
             * Shortcut to the preview document
             */
            get: function () {
                return this.previewDocument.document;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PreviewTooltip.prototype, "window", {
            /**
             * Shortcut to the preview Window
             */
            get: function () {
                return this.previewDocument.getContentWindow();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PreviewTooltip.prototype, "visibility", {
            /**
             * Control the visibility of the tooltip
             */
            get: function () {
                return (this.selectedText !== "" || this.entityType !== "") ? "visible" : "hidden";
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Position the tooltip above a bounding box
         */
        PreviewTooltip.prototype.positionTooltipAbove = function (box) {
            var _this = this;
            this.zone.run(function () {
                var tooltipWidth = _this.tooltip.nativeElement.getBoundingClientRect().width;
                var tooltipHeight = _this.tooltip.nativeElement.getBoundingClientRect().height;
                var left = _this.scalingFactor * (box.left + 0.5 * box.width) - 0.5 * tooltipWidth;
                left = Math.min(Math.max(left, 0), _this.scalingFactor * _this.document.body.clientWidth - tooltipWidth); // Avoid tooltip overflow
                _this.left = Math.round(left) + "px";
                var leftPin = Math.round(100 * (_this.scalingFactor * (box.left + 0.5 * box.width) - left) / tooltipWidth);
                _this.leftPin = _this.sanitizer.bypassSecurityTrustStyle(leftPin + "%");
                //absolute top positioning
                //this.bottom = Math.round(box.top-tooltipHeight-5+this.window.scrollY)+"px";
                //absolute bottom positioning
                //this.bottom = Math.round(this.document.documentElement.clientHeight - this.window.scrollY - box.top + 5)+"px";
                //fixed bottom positioning
                if (Math.round(box.top - 5 - tooltipHeight) > 0) {
                    _this.isBottom = false;
                    _this.bottom = Math.round(_this.scalingFactor * (_this.window.innerHeight - box.top) + 5) + "px";
                }
                else {
                    _this.isBottom = true;
                    _this.bottom = Math.round(_this.scalingFactor * (_this.window.innerHeight - box.top - box.height) - tooltipHeight - 5) + "px";
                }
                _this.changeDetectorRef.detectChanges();
            });
        };
        /**
         * Move to the previous entity if possible
         * @param event
         */
        PreviewTooltip.prototype.previousEntity = function (event) {
            var _this = this;
            event.stopPropagation(); // stop the propagation to avoid triggering the tooltip listeners
            if (this.entityIdx > 1) {
                // Find the index of the previous entity
                var entity = this.findEntity(this.entityType, this.entityValue, function (valueIdx, _) { return valueIdx === _this.entityIdx - 1; });
                if (entity) {
                    var idx = entity.idIndex;
                    this.previewDocument.selectHighlight(this.entityType, idx);
                }
            }
        };
        /**
         * Move to the next entity if possible
         * @param event
         */
        PreviewTooltip.prototype.nextEntity = function (event) {
            var _this = this;
            event.stopPropagation(); // stop the propagation to avoid triggering the tooltip listeners
            if (this.entityIdx < this.entityCount) {
                // Find the index of the next entity
                var entity = this.findEntity(this.entityType, this.entityValue, function (valueIdx, _) { return valueIdx === _this.entityIdx + 1; });
                if (entity) {
                    var idx = entity.idIndex;
                    this.previewDocument.selectHighlight(this.entityType, idx);
                }
            }
        };
        /**
         * Executes a clicked action button in the context of a tooltip for hovered entities
         * @param action
         * @param event
         */
        PreviewTooltip.prototype.entityAction = function (action, event) {
            var _this = this;
            event.stopPropagation(); // stop the propagation to avoid triggering the tooltip listeners
            this.zone.run(function () {
                if (action.action) {
                    action.action(action, { type: _this.entityType, idx: _this.entityIdx, value: _this.entityValue, display: _this.entityDisplay });
                }
            });
        };
        /**
         * Executes a clicked action button in the context of a tooltip for text selection
         * @param action the action to execute
         * @param event
         */
        PreviewTooltip.prototype.selectedTextAction = function (action, event) {
            var _this = this;
            event.stopPropagation(); // stop the propagation to avoid triggering the tooltip listeners
            this.zone.run(function () {
                if (action.action) {
                    action.action(action, { text: _this.selectedText });
                }
            });
        };
        /**
         * Helper function to find the indexes of a specific entity *occurrence*. Returns both the index within all
         * of its own occurrences: valueIndex (eg. BILL GATES 3/14) AND the index corresponding to the
         * entity id inside the document: idIndex (eg. id="person_32").
         * @param category eg. person
         * @param value eg. BILL GATES
         * @param predicate function testing whether it is the entity occurrence of interest
         * @returns an object with both indexes
         */
        PreviewTooltip.prototype.findEntity = function (entityType, entityValue, predicate) {
            var currentIdx = 0;
            // For each highlight in the doc
            for (var i = 0; i < this.previewData.highlightsPerLocation['length']; i++) {
                var highlight = this.previewData.highlightsPerLocation[i];
                var categories = Object.keys(highlight.positionInCategories);
                // For each value of the highlight
                for (var j = 0; j < categories.length; j++) {
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
        };
        return PreviewTooltip;
    }());
    PreviewTooltip.ɵfac = function PreviewTooltip_Factory(t) { return new (t || PreviewTooltip)(i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.DomSanitizer)); };
    PreviewTooltip.ɵcmp = i0.ɵɵdefineComponent({ type: PreviewTooltip, selectors: [["sq-preview-tooltip"]], viewQuery: function PreviewTooltip_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵviewQuery(_c0$1, true);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.tooltip = _t.first);
            }
        }, inputs: { previewDocument: "previewDocument", previewData: "previewData", entityActions: "entityActions", entityNavActions: "entityNavActions", selectedTextActions: "selectedTextActions", scalingFactor: "scalingFactor" }, features: [i0.ɵɵNgOnChangesFeature], decls: 4, vars: 12, consts: [[1, "sq-selection-tooltip", 3, "ngClass", "ngStyle"], ["tooltip", ""], [4, "ngIf"], [1, "display"], [1, "label"], [1, "index"], [1, "count"], [1, "btn-list"], [3, "disabled", "hidden", "title", "click", 4, "ngFor", "ngForOf"], [1, "nav-btn", "previous", 3, "ngClass", "title", "click"], [1, "nav-btn", "next", 3, "ngClass", "title", "click"], [3, "disabled", "hidden", "title", "click"], [3, "class", 4, "ngIf"], [4, "ngFor", "ngForOf"]], template: function PreviewTooltip_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0, 1);
                i0.ɵɵtemplate(2, PreviewTooltip_ng_container_2_Template, 14, 8, "ng-container", 2);
                i0.ɵɵtemplate(3, PreviewTooltip_ng_container_3_Template, 2, 1, "ng-container", 2);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵstyleProp("--left", ctx.leftPin)("--factor", 1 / ctx.scalingFactor);
                i0.ɵɵproperty("ngClass", ctx.isBottom ? "sq-bottom-tooltip" : "sq-top-tooltip")("ngStyle", i0.ɵɵpureFunction3(8, _c5, ctx.visibility, ctx.bottom, ctx.left));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", ctx.entityType && !ctx.selectedText);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.selectedText);
            }
        }, directives: [i2.NgClass, i2.NgStyle, i2.NgIf, i2.NgForOf], pipes: [i3.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PreviewTooltip, [{
                type: i0.Component,
                args: [{
                        selector: "sq-preview-tooltip",
                        templateUrl: "./preview-tooltip.component.html"
                    }]
            }], function () { return [{ type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i1.DomSanitizer }]; }, { previewDocument: [{
                    type: i0.Input
                }], previewData: [{
                    type: i0.Input
                }], entityActions: [{
                    type: i0.Input
                }], entityNavActions: [{
                    type: i0.Input
                }], selectedTextActions: [{
                    type: i0.Input
                }], scalingFactor: [{
                    type: i0.Input
                }], tooltip: [{
                    type: i0.ViewChild,
                    args: ['tooltip', { static: false }]
                }] });
    })();

    var PREVIEW_MODAL = new i0.InjectionToken("PREVIEW_MODAL");
    var PreviewService = /** @class */ (function () {
        function PreviewService(previewModal, router, previewWebService, appService, authenticationService, searchService, modalService, recentDocumentsService, exprBuilder) {
            var _this = this;
            this.previewModal = previewModal;
            this.router = router;
            this.previewWebService = previewWebService;
            this.appService = appService;
            this.authenticationService = authenticationService;
            this.searchService = searchService;
            this.modalService = modalService;
            this.recentDocumentsService = recentDocumentsService;
            this.exprBuilder = exprBuilder;
            this._events = new rxjs.Subject();
            // Subscribe to own events and add documents to the recent documents service
            this.events.subscribe(function (event) {
                if (event.record && (event.type === "Preview_Modal" /* Modal */ || event.type === "Preview_Route" /* Route */ || event.type === "Preview_Window" /* Window */)) {
                    _this.recentDocumentsService.addDocument(event.record, false);
                }
            });
        }
        Object.defineProperty(PreviewService.prototype, "events", {
            /**
             * Triggers any event among PreviewEvent
             */
            get: function () {
                return this._events;
            },
            enumerable: false,
            configurable: true
        });
        PreviewService.prototype.makeQuery = function (query) {
            query = base.Utils.copy(query);
            delete query.sort;
            delete query.scope;
            delete query.tab;
            delete query.basket;
            delete query.page;
            delete query.queryId;
            if (query.select) {
                query.select = query.select.filter(function (value) { return base.Utils.eqNC(value.facet, "refine"); });
                if (query.select.length === 0) {
                    delete query.select;
                }
            }
            return query;
        };
        PreviewService.prototype.getPreviewData = function (id, query, audit) {
            if (audit === void 0) { audit = true; }
            var _a;
            var auditEvent;
            var record = this.searchService.getRecordFromId(id);
            var resultId = record ? (_a = this.searchService.results) === null || _a === void 0 ? void 0 : _a.id : undefined;
            if (audit) {
                auditEvent = {
                    type: "Doc_Preview" /* Doc_Preview */,
                    detail: this.getAuditPreviewDetail(id, query, record, resultId)
                };
            }
            query = this.makeQuery(query);
            var observable = this.previewWebService.get(id, query, auditEvent);
            base.Utils.subscribe(observable, function (previewData) {
                previewData.resultId = resultId || "";
                return previewData;
            });
            this._events.next({ type: "Preview_Data" /* Data */, record: record, query: query });
            return observable;
        };
        PreviewService.prototype.makeDownloadUrl = function (url) {
            return url ? this.appService.updateUrlForCors(url) : undefined;
        };
        PreviewService.prototype.openModal = function (record, query, model) {
            model.record = record;
            model.query = query;
            this._events.next({ type: "Preview_Modal" /* Modal */, record: record, query: query });
            this.modalService.open(this.previewModal, { model: model });
        };
        PreviewService.prototype.getQueryStr = function (query) {
            query = this.makeQuery(query);
            return query.toJsonForQueryString();
        };
        PreviewService.prototype.openNewWindow = function (record, query) {
            var params = {
                id: record.id,
                query: this.getQueryStr(query),
                app: this.appService.appName
            };
            if (this.authenticationService.userOverrideActive && this.authenticationService.userOverride) {
                params["overrideUser"] = this.authenticationService.userOverride.userName;
                params["overrideDomain"] = this.authenticationService.userOverride.domain;
            }
            var httpParams = base.Utils.makeHttpParams(params);
            var url = "#/preview?" + httpParams.toString();
            this._events.next({ type: "Preview_Window" /* Window */, record: record, query: query });
            return window.open(url, "_blank");
        };
        PreviewService.prototype.openRoute = function (record, query, path) {
            if (path === void 0) { path = "preview"; }
            this._events.next({ type: "Preview_Route" /* Route */, record: record, query: query });
            this.rank = record.rank;
            return this.router.navigate([path], {
                queryParams: {
                    id: record.id,
                    query: this.getQueryStr(query)
                }
            });
        };
        /**
         * Get the page number of a splitted document's record or undefined if
         * it is not in fact splitted. Stores the page number in the record itself ($page property)
         * @param record
         */
        PreviewService.prototype.getPageNumber = function (record) {
            var containerid = record.containerid;
            if (containerid && record.id.startsWith(containerid)) {
                var pageNumberStr = record.id.slice(containerid.length + 1);
                if (/#\d+#/g.test(pageNumberStr)) {
                    var pageNumber = parseInt(pageNumberStr.slice(1, pageNumberStr.length - 1), 10);
                    if (!isNaN(pageNumber)) {
                        record.$page = pageNumber;
                        return pageNumber;
                    }
                }
            }
            return undefined;
        };
        /**
         * Returns the pages of a given record id
         * @param containerid
         * @param query
         */
        PreviewService.prototype.fetchPages = function (containerid, query) {
            query = this.makeQuery(query);
            query.groupBy = ""; // If the query web service uses GROUP BY containerid
            query.addSelect(this.exprBuilder.makeExpr("containerid", containerid));
            return this.searchService.getResults(query);
        };
        PreviewService.prototype.getAuditPreviewDetail = function (id, query, record, resultId) {
            var _a, _b, _c, _d, _e, _f;
            var queryLanguage = ((_b = (_a = this.searchService.results) === null || _a === void 0 ? void 0 : _a.queryAnalysis) === null || _b === void 0 ? void 0 : _b.queryLanguage) || ((_d = (_c = this.searchService) === null || _c === void 0 ? void 0 : _c.query) === null || _d === void 0 ? void 0 : _d.questionLanguage)
                || ((_f = (_e = this.appService) === null || _e === void 0 ? void 0 : _e.ccquery) === null || _f === void 0 ? void 0 : _f.questionLanguage);
            var collectionColumn = record === null || record === void 0 ? void 0 : record.collection;
            var collection = !!collectionColumn ? collectionColumn[0] : base.Utils.split(id, "|")[0];
            var rank = !!record ? record.rank : this.rank || 0;
            return {
                "doc-id": id,
                rank: rank,
                collection: collection,
                source: base.Utils.treeFirstNode(collection),
                resultid: resultId,
                querylang: queryLanguage,
                text: query.text,
                filename: record === null || record === void 0 ? void 0 : record.filename,
                fileext: record === null || record === void 0 ? void 0 : record.fileext,
            };
        };
        /**
         * returns document's preview HTML
         * @param url
         * @returns document's preview HTML
         */
        PreviewService.prototype.getHtmlPreview = function (url) {
            return this.previewWebService.getHtmlPreview(url);
        };
        return PreviewService;
    }());
    PreviewService.ɵfac = function PreviewService_Factory(t) { return new (t || PreviewService)(i0.ɵɵinject(PREVIEW_MODAL, 8), i0.ɵɵinject(i1$1.Router), i0.ɵɵinject(i2$1.PreviewWebService), i0.ɵɵinject(i3$1.AppService), i0.ɵɵinject(i4.AuthenticationService), i0.ɵɵinject(i1$2.SearchService), i0.ɵɵinject(i6.ModalService), i0.ɵɵinject(i7.RecentDocumentsService), i0.ɵɵinject(i3$1.ExprBuilder)); };
    PreviewService.ɵprov = i0.ɵɵdefineInjectable({ token: PreviewService, factory: PreviewService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PreviewService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: i0.Type, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [PREVIEW_MODAL]
                        }] }, { type: i1$1.Router }, { type: i2$1.PreviewWebService }, { type: i3$1.AppService }, { type: i4.AuthenticationService }, { type: i1$2.SearchService }, { type: i6.ModalService }, { type: i7.RecentDocumentsService }, { type: i3$1.ExprBuilder }];
        }, null);
    })();

    var PreviewModule = /** @class */ (function () {
        function PreviewModule() {
        }
        PreviewModule.forRoot = function (previewModal) {
            return {
                ngModule: PreviewModule,
                providers: [
                    { provide: PREVIEW_MODAL, useValue: previewModal },
                ]
            };
        };
        return PreviewModule;
    }());
    PreviewModule.ɵmod = i0.ɵɵdefineNgModule({ type: PreviewModule });
    PreviewModule.ɵinj = i0.ɵɵdefineInjector({ factory: function PreviewModule_Factory(t) { return new (t || PreviewModule)(); }, imports: [[
                i2.CommonModule,
                i3.IntlModule,
                i2$1.WebServicesModule,
                i3$2.UtilsModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(PreviewModule, { declarations: [PreviewDocumentIframe, PreviewTooltip], imports: [i2.CommonModule,
                i3.IntlModule,
                i2$1.WebServicesModule,
                i3$2.UtilsModule], exports: [PreviewDocumentIframe, PreviewTooltip] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PreviewModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i2.CommonModule,
                            i3.IntlModule,
                            i2$1.WebServicesModule,
                            i3$2.UtilsModule
                        ],
                        declarations: [
                            PreviewDocumentIframe, PreviewTooltip
                        ],
                        exports: [
                            PreviewDocumentIframe, PreviewTooltip
                        ],
                    }]
            }], null, null);
    })();

    var _c0$2 = function (a0) { return { height: a0 }; };
    function BsFacetPreview_div_0_Template(rf, ctx) {
        if (rf & 1) {
            var _r4_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2);
            i0.ɵɵelementStart(1, "sq-preview-document-iframe", 3);
            i0.ɵɵlistener("onPreviewReady", function BsFacetPreview_div_0_Template_sq_preview_document_iframe_onPreviewReady_1_listener($event) { i0.ɵɵrestoreView(_r4_1); var ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.document = $event; });
            i0.ɵɵelement(2, "sq-preview-tooltip", 4, 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵclassMapInterpolate1("d-flex flex-column ", ctx_r0.iframeClass, "");
            i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(8, _c0$2, ctx_r0.height));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("sandbox", ctx_r0.sandbox)("downloadUrl", ctx_r0.downloadUrl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("previewDocument", ctx_r0.document)("previewData", ctx_r0.data);
        }
    }
    function BsFacetPreview_ul_1_li_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r8_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "li", 8);
            i0.ɵɵelement(1, "sq-result-title", 9);
            i0.ɵɵelementStart(2, "div", 10);
            i0.ɵɵelementStart(3, "span", 11);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "number");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "a", 12);
            i0.ɵɵlistener("click", function BsFacetPreview_ul_1_li_1_Template_a_click_6_listener() { i0.ɵɵrestoreView(_r8_1); var doc_r6 = ctx.$implicit; var ctx_r7 = i0.ɵɵnextContext(2); return ctx_r7.openSimilarDoc(doc_r6); });
            i0.ɵɵelement(7, "i", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var doc_r6 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("record", doc_r6)("titleLinkBehavior", "open");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 3, 100 * doc_r6.globalrelevance, "1.0-0"));
        }
    }
    function BsFacetPreview_ul_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "ul", 6);
            i0.ɵɵtemplate(1, BsFacetPreview_ul_1_li_1_Template, 8, 6, "li", 7);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r1.similarDocuments);
        }
    }
    var BsFacetPreview = /** @class */ (function () {
        function BsFacetPreview(previewService) {
            this.previewService = previewService;
            this.recordOpened = new i0.EventEmitter();
        }
        BsFacetPreview.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if (changes["record"] || changes["query"]) {
                this.previewService.getPreviewData(this.record.id, this.query).subscribe(function (previewData) {
                    _this.data = previewData;
                    _this.downloadUrl = _this.data ? _this.previewService.makeDownloadUrl(_this.data.documentCachedContentUrl) : undefined;
                });
            }
        };
        BsFacetPreview.prototype.openSimilarDoc = function (doc) {
            this.recordOpened.next({
                record: doc,
                query: this.query,
                startSmall: true,
                iframeClass: this.iframeClass
            });
            return false;
        };
        return BsFacetPreview;
    }());
    BsFacetPreview.ɵfac = function BsFacetPreview_Factory(t) { return new (t || BsFacetPreview)(i0.ɵɵdirectiveInject(PreviewService)); };
    BsFacetPreview.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetPreview, selectors: [["sq-facet-preview"]], inputs: { record: "record", sandbox: "sandbox", query: "query", height: "height", iframeClass: "iframeClass", similarDocuments: "similarDocuments" }, outputs: { recordOpened: "recordOpened" }, features: [i0.ɵɵNgOnChangesFeature], decls: 2, vars: 2, consts: [[3, "class", "ngStyle", 4, "ngIf"], ["class", "list-group", 4, "ngIf"], [3, "ngStyle"], [3, "sandbox", "downloadUrl", "onPreviewReady"], [3, "previewDocument", "previewData"], ["tooltip", ""], [1, "list-group"], ["class", "list-group-item d-flex justify-content-between align-items-center", "style", "background-color: transparent;", 4, "ngFor", "ngForOf"], [1, "list-group-item", "d-flex", "justify-content-between", "align-items-center", 2, "background-color", "transparent"], [3, "record", "titleLinkBehavior"], [1, "d-flex"], [1, "badge", "badge-pill", "badge-secondary", 2, "padding-top", "5px"], ["href", "#", "title", "Open document in workspace", 1, "open-record", "ml-2", 3, "click"], [1, "fas", "fa-arrow-circle-right"]], template: function BsFacetPreview_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsFacetPreview_div_0_Template, 4, 10, "div", 0);
                i0.ɵɵtemplate(1, BsFacetPreview_ul_1_Template, 2, 1, "ul", 1);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !ctx.similarDocuments);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", !!ctx.similarDocuments);
            }
        }, directives: [i2.NgIf, i2.NgStyle, PreviewDocumentIframe, PreviewTooltip, i2.NgForOf, i5.ResultTitle], pipes: [i2.DecimalPipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsFacetPreview, [{
                type: i0.Component,
                args: [{
                        selector: "sq-facet-preview",
                        templateUrl: "./facet-preview.html",
                    }]
            }], function () { return [{ type: PreviewService }]; }, { record: [{
                    type: i0.Input
                }], sandbox: [{
                    type: i0.Input
                }], query: [{
                    type: i0.Input
                }], height: [{
                    type: i0.Input
                }], iframeClass: [{
                    type: i0.Input
                }], similarDocuments: [{
                    type: i0.Input
                }], recordOpened: [{
                    type: i0.Output
                }] });
    })();

    function BsFacetPreviewComponent2_ng_template_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "sq-result-title", 4);
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵproperty("record", ctx_r1.record)("originalDocTarget", ctx_r1.originalDocTarget);
        }
    }
    function BsFacetPreviewComponent2_ng_template_4_sq_metadata_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "sq-metadata", 6);
        }
        if (rf & 2) {
            var ctx_r4 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("record", ctx_r4.record)("items", ctx_r4.metadata)("showTitles", true)("showIcons", true)("clickable", false);
        }
    }
    function BsFacetPreviewComponent2_ng_template_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtemplate(0, BsFacetPreviewComponent2_ng_template_4_sq_metadata_0_Template, 1, 5, "sq-metadata", 5);
        }
        if (rf & 2) {
            var ctx_r3 = i0.ɵɵnextContext();
            i0.ɵɵproperty("ngIf", ctx_r3.metadata && ctx_r3.metadata.length > 0);
        }
    }
    var _c0$3 = function () { return { "height.%": 100 }; };
    var BsFacetPreviewComponent2 = /** @class */ (function (_super) {
        __extends(BsFacetPreviewComponent2, _super);
        function BsFacetPreviewComponent2(previewService) {
            var _this = _super.call(this) || this;
            _this.previewService = previewService;
            _this.height = 500;
            _this.scalingFactor = 0.6;
            _this.metadata = [];
            _this.expandModal = true;
            _this.closable = true;
            _this.highlightActions = true;
            _this.recordClosed = new i0.EventEmitter();
            _this.previewLoaded = new i0.EventEmitter();
            _this._height = _this.height;
            _this.scaleFactorThreshold = 0.1;
            _this.loaded = false;
            _this.closeAction = new i4$1.Action({
                icon: "fas fa-times",
                title: "msg#facet.preview.closeTitle",
                action: function () {
                    _this.recordClosed.next();
                }
            });
            _this.expandModalAction = new i4$1.Action({
                icon: "far fa-window-maximize",
                title: "msg#facet.preview.expandTitle",
                action: function () {
                    _this.previewService.openModal(_this.record, _this.query, {
                        displaySimilarDocuments: false,
                        metadata: _this.metadata
                    });
                }
            });
            _this.toggleEntitiesAction = new i4$1.Action({
                icon: "fas fa-lightbulb",
                title: "msg#facet.preview.toggleEntities",
                selected: true,
                action: function (action) {
                    var _a;
                    action.selected = !action.selected;
                    if ((_a = _this.data) === null || _a === void 0 ? void 0 : _a.highlightsPerCategory) {
                        Object.keys(_this.data.highlightsPerCategory)
                            .filter(function (value) { return value !== "extractslocations" && value !== "matchlocations"; })
                            .forEach(function (cat) { var _a; return (_a = _this.document) === null || _a === void 0 ? void 0 : _a.toggleHighlight(cat, action.selected); });
                    }
                }
            });
            _this.toggleExtractsAction = new i4$1.Action({
                icon: "fas fa-highlighter",
                title: "msg#facet.preview.toggleExtracts",
                selected: true,
                action: function (action) {
                    var _a, _b;
                    action.selected = !action.selected;
                    (_a = _this.document) === null || _a === void 0 ? void 0 : _a.toggleHighlight("matchlocations", action.selected);
                    (_b = _this.document) === null || _b === void 0 ? void 0 : _b.toggleHighlight("extractslocations", action.selected);
                }
            });
            _this.maximizeAction = new i4$1.Action({
                icon: "fas fa-search-plus",
                title: "msg#facet.preview.maximize",
                action: function () {
                    _this.scalingFactor = _this.scalingFactor + _this.scaleFactorThreshold;
                }
            });
            _this.minimizeAction = new i4$1.Action({
                icon: "fas fa-search-minus",
                title: "msg#facet.preview.minimize",
                disabled: _this.scalingFactor === 0.1,
                action: function () {
                    _this.scalingFactor = Math.round(Math.max(0.1, _this.scalingFactor - _this.scaleFactorThreshold) * 100) / 100;
                },
                updater: function (action) {
                    action.disabled = _this.scalingFactor === 0.1;
                }
            });
            return _this;
        }
        Object.defineProperty(BsFacetPreviewComponent2.prototype, "actions", {
            get: function () {
                var actions = [];
                if (this.customActions) {
                    actions.push.apply(actions, __spread(this.customActions));
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
            },
            enumerable: false,
            configurable: true
        });
        BsFacetPreviewComponent2.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if (changes["record"]) {
                this.previewService.getPreviewData(this.record.id, this.query).subscribe(function (previewData) {
                    _this.data = previewData;
                    _this.downloadUrl = _this.data ? _this.previewService.makeDownloadUrl(_this.data.documentCachedContentUrl) : undefined;
                });
                this.downloadUrl = undefined;
                this.data = undefined;
                this.document = undefined;
            }
            if (changes["height"] || changes["scalingFactor"]) {
                this._height = this.height;
            }
        };
        BsFacetPreviewComponent2.prototype.ngAfterViewChecked = function () {
            if (this.document && this.loaded) {
                this.loaded = false;
                // as now view is checked, emit event
                this.previewLoaded.emit(this.document);
            }
        };
        BsFacetPreviewComponent2.prototype.onPreviewReady = function (document) {
            this.document = document;
            if (this.document && this.filters) {
                this.document.filterHighlights(this.filters);
            }
            this.loaded = true;
        };
        return BsFacetPreviewComponent2;
    }(i4$2.AbstractFacet));
    BsFacetPreviewComponent2.ɵfac = function BsFacetPreviewComponent2_Factory(t) { return new (t || BsFacetPreviewComponent2)(i0.ɵɵdirectiveInject(PreviewService)); };
    BsFacetPreviewComponent2.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetPreviewComponent2, selectors: [["sq-facet-preview-2"]], hostVars: 2, hostBindings: function BsFacetPreviewComponent2_HostBindings(rf, ctx) {
            if (rf & 2) {
                i0.ɵɵstyleProp("height", ctx._height, "px");
            }
        }, inputs: { record: "record", query: "query", iframeClass: "iframeClass", sandbox: "sandbox", height: "height", scalingFactor: "scalingFactor", metadata: "metadata", expandModal: "expandModal", closable: "closable", highlightActions: "highlightActions", customActions: "customActions", filters: "filters", originalDocTarget: "originalDocTarget" }, outputs: { recordClosed: "recordClosed", previewLoaded: "previewLoaded" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 6, vars: 8, consts: [[3, "ngStyle"], [3, "sandbox", "downloadUrl", "scalingFactor", "onPreviewReady"], ["headerTpl", ""], ["subHeaderTpl", ""], ["titleLinkBehavior", "open-if-url", 1, "flex-grow-1", "flex-basis-0", 3, "record", "originalDocTarget"], [3, "record", "items", "showTitles", "showIcons", "clickable", 4, "ngIf"], [3, "record", "items", "showTitles", "showIcons", "clickable"]], template: function BsFacetPreviewComponent2_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "sq-preview-document-iframe", 1);
                i0.ɵɵlistener("onPreviewReady", function BsFacetPreviewComponent2_Template_sq_preview_document_iframe_onPreviewReady_1_listener($event) { return ctx.onPreviewReady($event); });
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(2, BsFacetPreviewComponent2_ng_template_2_Template, 1, 2, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
                i0.ɵɵtemplate(4, BsFacetPreviewComponent2_ng_template_4_Template, 1, 1, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
            }
            if (rf & 2) {
                i0.ɵɵclassMapInterpolate1("d-flex flex-column ", ctx.iframeClass, "");
                i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction0(7, _c0$3));
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("sandbox", ctx.sandbox)("downloadUrl", ctx.downloadUrl)("scalingFactor", ctx.scalingFactor);
            }
        }, directives: [i2.NgStyle, PreviewDocumentIframe, i5.ResultTitle, i2.NgIf, i5$1.Metadata], styles: ["[_nghost-%COMP%]{display:block;overflow:hidden}.sq-app-loading[_ngcontent-%COMP%]{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsFacetPreviewComponent2, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-facet-preview-2',
                        templateUrl: './facet-preview.component.html',
                        styleUrls: ['./facet-preview.component.scss']
                    }]
            }], function () { return [{ type: PreviewService }]; }, { record: [{
                    type: i0.Input
                }], query: [{
                    type: i0.Input
                }], iframeClass: [{
                    type: i0.Input
                }], sandbox: [{
                    type: i0.Input
                }], height: [{
                    type: i0.Input
                }], scalingFactor: [{
                    type: i0.Input
                }], metadata: [{
                    type: i0.Input
                }], expandModal: [{
                    type: i0.Input
                }], closable: [{
                    type: i0.Input
                }], highlightActions: [{
                    type: i0.Input
                }], customActions: [{
                    type: i0.Input
                }], filters: [{
                    type: i0.Input
                }], originalDocTarget: [{
                    type: i0.Input
                }], recordClosed: [{
                    type: i0.Output
                }], previewLoaded: [{
                    type: i0.Output
                }], _height: [{
                    type: i0.HostBinding,
                    args: ['style.height.px']
                }] });
    })();

    function BsPreviewHighlights_ng_container_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "div", 4);
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 1, "msg#preview.noEntityToHighlight"), " ");
        }
    }
    function BsPreviewHighlights_ng_template_5_div_6_span_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵelement(1, "span");
            i0.ɵɵelementStart(2, "span", 30);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var categoryId_r9 = ctx.$implicit;
            var ctx_r8 = i0.ɵɵnextContext(3);
            i0.ɵɵadvance(1);
            i0.ɵɵclassMapInterpolate2("fas fa-bullseye ", ctx_r8.categoryIconClass(categoryId_r9), " ", categoryId_r9, "");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 5, ctx_r8.categoryDisplayLabel(categoryId_r9), ctx_r8.categoryLabelPipeParams(categoryId_r9)));
        }
    }
    function BsPreviewHighlights_ng_template_5_div_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 26);
            i0.ɵɵelementStart(1, "div", 27);
            i0.ɵɵtemplate(2, BsPreviewHighlights_ng_template_5_div_6_span_2_Template, 5, 8, "span", 28);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(3, "div", 29);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r3 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx_r3.currentCategories);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("innerHTML", ctx_r3.currentValue, i0.ɵɵsanitizeHtml);
        }
    }
    function BsPreviewHighlights_ng_template_5_ng_template_7_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 31);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div");
            i0.ɵɵtext(4, "\u00A0");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#preview.noSelectedHighlight"), " ");
        }
    }
    function BsPreviewHighlights_ng_template_5_div_36_Template(rf, ctx) {
        if (rf & 1) {
            var _r11_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 32);
            i0.ɵɵelement(1, "div", 33);
            i0.ɵɵelement(2, "div", 33);
            i0.ɵɵelementStart(3, "div", 34);
            i0.ɵɵelementStart(4, "div", 35);
            i0.ɵɵelementStart(5, "button", 36);
            i0.ɵɵlistener("click", function BsPreviewHighlights_ng_template_5_div_36_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r11_1); var ctx_r10 = i0.ɵɵnextContext(2); return ctx_r10.selectAll(); });
            i0.ɵɵpipe(6, "sqMessage");
            i0.ɵɵelement(7, "span", 37);
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "div", 35);
            i0.ɵɵelementStart(11, "button", 36);
            i0.ɵɵlistener("click", function BsPreviewHighlights_ng_template_5_div_36_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r11_1); var ctx_r12 = i0.ɵɵnextContext(2); return ctx_r12.selectNone(); });
            i0.ɵɵpipe(12, "sqMessage");
            i0.ɵɵelement(13, "span", 38);
            i0.ɵɵtext(14);
            i0.ɵɵpipe(15, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r6 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(5);
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(6, 6, "msg#preview.highlightFilters.keepAll"));
            i0.ɵɵproperty("disabled", !ctx_r6.previewReady || ctx_r6.allSelected);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(9, 8, "msg#preview.highlightFilters.keepAll"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(12, 10, "msg#preview.highlightFilters.keepNone"));
            i0.ɵɵproperty("disabled", !ctx_r6.previewReady || ctx_r6.noneSelected);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(15, 12, "msg#preview.highlightFilters.keepNone"), " ");
        }
    }
    function BsPreviewHighlights_ng_template_5_div_38_ng_container_7_option_11_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "option", 45);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var entityValue_r18 = ctx.$implicit;
            var ctx_r17 = i0.ɵɵnextContext(4);
            i0.ɵɵproperty("ngValue", ctx_r17.newFilter(entityValue_r18.value));
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(entityValue_r18.displayValue);
        }
    }
    function BsPreviewHighlights_ng_template_5_div_38_ng_container_7_Template(rf, ctx) {
        if (rf & 1) {
            var _r20_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "select", 44);
            i0.ɵɵlistener("ngModelChange", function BsPreviewHighlights_ng_template_5_div_38_ng_container_7_Template_select_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r20_1); var categoryId_r13 = i0.ɵɵnextContext().$implicit; var ctx_r19 = i0.ɵɵnextContext(2); return (ctx_r19.navigationState.filters[categoryId_r13] = $event); })("ngModelChange", function BsPreviewHighlights_ng_template_5_div_38_ng_container_7_Template_select_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r20_1); var categoryId_r13 = i0.ɵɵnextContext().$implicit; var ctx_r22 = i0.ɵɵnextContext(2); return ctx_r22.selectFilter(categoryId_r13, $event); });
            i0.ɵɵelementStart(2, "option", 45);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵpipe(5, "sqNumber");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "option", 45);
            i0.ɵɵtext(7);
            i0.ɵɵpipe(8, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "option", 46);
            i0.ɵɵtext(10, "\u00A0");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(11, BsPreviewHighlights_ng_template_5_div_38_ng_container_7_option_11_Template, 2, 2, "option", 47);
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var categoryId_r13 = i0.ɵɵnextContext().$implicit;
            var ctx_r14 = i0.ɵɵnextContext(2);
            var tmp_3_0 = null;
            var tmp_5_0 = null;
            var tmp_6_0 = null;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngModel", ctx_r14.navigationState.filters[categoryId_r13])("compareWith", ctx_r14.compareFilters);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngValue", ctx_r14.keepAllFilter);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(4, 8, (tmp_3_0 = ctx_r14.getCategoryHighlightData(categoryId_r13)) == null ? null : tmp_3_0.categoryFilterAllLabel), " (", i0.ɵɵpipeBind1(5, 10, ctx_r14.getHighlightValueCount(categoryId_r13)), ")");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngValue", ctx_r14.keepNoneFilter);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 12, (tmp_5_0 = ctx_r14.getCategoryHighlightData(categoryId_r13)) == null ? null : tmp_5_0.categoryFilterNoneLabel));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", (tmp_6_0 = ctx_r14.getCategoryHighlightData(categoryId_r13)) == null ? null : tmp_6_0.values);
        }
    }
    function BsPreviewHighlights_ng_template_5_div_38_ng_template_8_ng_container_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtext(1);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var displayValue_r26 = ctx.ngIf;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" (", displayValue_r26, ") ");
        }
    }
    function BsPreviewHighlights_ng_template_5_div_38_ng_template_8_Template(rf, ctx) {
        if (rf & 1) {
            var _r28_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "select", 44);
            i0.ɵɵlistener("ngModelChange", function BsPreviewHighlights_ng_template_5_div_38_ng_template_8_Template_select_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r28_1); var categoryId_r13 = i0.ɵɵnextContext().$implicit; var ctx_r27 = i0.ɵɵnextContext(2); return (ctx_r27.navigationState.filters[categoryId_r13] = $event); })("ngModelChange", function BsPreviewHighlights_ng_template_5_div_38_ng_template_8_Template_select_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r28_1); var categoryId_r13 = i0.ɵɵnextContext().$implicit; var ctx_r30 = i0.ɵɵnextContext(2); return ctx_r30.selectFilter(categoryId_r13, $event); });
            i0.ɵɵelementStart(1, "option", 45);
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵtemplate(4, BsPreviewHighlights_ng_template_5_div_38_ng_template_8_ng_container_4_Template, 2, 1, "ng-container", 48);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "option", 45);
            i0.ɵɵtext(6);
            i0.ɵɵpipe(7, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var categoryId_r13 = i0.ɵɵnextContext().$implicit;
            var ctx_r16 = i0.ɵɵnextContext(2);
            var tmp_3_0 = null;
            var tmp_4_0 = null;
            var tmp_6_0 = null;
            i0.ɵɵproperty("ngModel", ctx_r16.navigationState.filters[categoryId_r13])("compareWith", ctx_r16.compareFilters);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngValue", ctx_r16.keepAllFilter);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 7, (tmp_3_0 = ctx_r16.getCategoryHighlightData(categoryId_r13)) == null ? null : tmp_3_0.categoryFilterAllLabel), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", (tmp_4_0 = ctx_r16.getCategoryHighlightData(categoryId_r13)) == null ? null : tmp_4_0.values[0].displayValue);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngValue", ctx_r16.keepNoneFilter);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 9, (tmp_6_0 = ctx_r16.getCategoryHighlightData(categoryId_r13)) == null ? null : tmp_6_0.categoryFilterNoneLabel));
        }
    }
    function BsPreviewHighlights_ng_template_5_div_38_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 39);
            i0.ɵɵelementStart(1, "div", 40);
            i0.ɵɵelement(2, "span");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 41);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 42);
            i0.ɵɵtemplate(7, BsPreviewHighlights_ng_template_5_div_38_ng_container_7_Template, 12, 14, "ng-container", 2);
            i0.ɵɵtemplate(8, BsPreviewHighlights_ng_template_5_div_38_ng_template_8_Template, 8, 11, "ng-template", null, 43, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var categoryId_r13 = ctx.$implicit;
            var _r15 = i0.ɵɵreference(9);
            var ctx_r7 = i0.ɵɵnextContext(2);
            var tmp_1_0 = null;
            i0.ɵɵadvance(2);
            i0.ɵɵclassMapInterpolate2("fas fa-bullseye ", ctx_r7.categoryIconClass(categoryId_r13), " ", categoryId_r13, "");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(5, 7, (tmp_1_0 = ctx_r7.getCategoryHighlightData(categoryId_r13)) == null ? null : tmp_1_0.categoryDisplayLabelPlural, ctx_r7.categoryLabelPipeParams(categoryId_r13)), ": ");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx_r7.categoryHasMultipleValues(categoryId_r13))("ngIfElse", _r15);
        }
    }
    function BsPreviewHighlights_ng_template_5_Template(rf, ctx) {
        if (rf & 1) {
            var _r34_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 5);
            i0.ɵɵelementStart(1, "div", 6);
            i0.ɵɵelementStart(2, "div", 7);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 8);
            i0.ɵɵtemplate(6, BsPreviewHighlights_ng_template_5_div_6_Template, 4, 2, "div", 9);
            i0.ɵɵtemplate(7, BsPreviewHighlights_ng_template_5_ng_template_7_Template, 5, 3, "ng-template", null, 10, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 11);
            i0.ɵɵelementStart(10, "button", 12);
            i0.ɵɵlistener("click", function BsPreviewHighlights_ng_template_5_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r34_1); var ctx_r33 = i0.ɵɵnextContext(); return ctx_r33.first(); });
            i0.ɵɵpipe(11, "sqMessage");
            i0.ɵɵelement(12, "span", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "button", 12);
            i0.ɵɵlistener("click", function BsPreviewHighlights_ng_template_5_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r34_1); var ctx_r35 = i0.ɵɵnextContext(); return ctx_r35.previous(); });
            i0.ɵɵpipe(14, "sqMessage");
            i0.ɵɵelement(15, "span", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 15);
            i0.ɵɵelementStart(17, "span", 16);
            i0.ɵɵtext(18);
            i0.ɵɵpipe(19, "sqNumber");
            i0.ɵɵpipe(20, "sqNumber");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "span", 17);
            i0.ɵɵtext(22);
            i0.ɵɵpipe(23, "sqNumber");
            i0.ɵɵpipe(24, "sqNumber");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "button", 12);
            i0.ɵɵlistener("click", function BsPreviewHighlights_ng_template_5_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r34_1); var ctx_r36 = i0.ɵɵnextContext(); return ctx_r36.next(); });
            i0.ɵɵpipe(26, "sqMessage");
            i0.ɵɵelement(27, "span", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "button", 12);
            i0.ɵɵlistener("click", function BsPreviewHighlights_ng_template_5_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r34_1); var ctx_r37 = i0.ɵɵnextContext(); return ctx_r37.last(); });
            i0.ɵɵpipe(29, "sqMessage");
            i0.ɵɵelement(30, "span", 19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "div", 20);
            i0.ɵɵelementStart(32, "div", 21);
            i0.ɵɵelement(33, "span", 22);
            i0.ɵɵtext(34);
            i0.ɵɵpipe(35, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(36, BsPreviewHighlights_ng_template_5_div_36_Template, 16, 14, "div", 23);
            i0.ɵɵelementStart(37, "div", 24);
            i0.ɵɵtemplate(38, BsPreviewHighlights_ng_template_5_div_38_Template, 10, 10, "div", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var _r4 = i0.ɵɵreference(8);
            var ctx_r2 = i0.ɵɵnextContext();
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(4, 18, "msg#preview.selectedHighlight"), ":");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx_r2.currentValue || ctx_r2.currentCategories)("ngIfElse", _r4);
            i0.ɵɵadvance(4);
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(11, 20, "msg#preview.firstHighlightButtonAltText"));
            i0.ɵɵproperty("disabled", !ctx_r2.previewReady);
            i0.ɵɵadvance(3);
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(14, 22, "msg#preview.previousHighlightButtonAltText"));
            i0.ɵɵproperty("disabled", !ctx_r2.previewReady);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(19, 24, ctx_r2.current), " / ", i0.ɵɵpipeBind1(20, 26, ctx_r2.total), "");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(23, 28, ctx_r2.total), " / ", i0.ɵɵpipeBind1(24, 30, ctx_r2.total), "");
            i0.ɵɵadvance(3);
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(26, 32, "msg#preview.nextHighlightButtonAltText"));
            i0.ɵɵproperty("disabled", !ctx_r2.previewReady);
            i0.ɵɵadvance(3);
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(29, 34, "msg#preview.lastHighlightButtonAltText"));
            i0.ɵɵproperty("disabled", !ctx_r2.previewReady);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(35, 36, "msg#preview.highlightFilters.title"), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r2.nonEmptyCategoryIds.length > 1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx_r2.nonEmptyCategoryIds);
        }
    }
    var BsPreviewHighlights = /** @class */ (function () {
        function BsPreviewHighlights() {
            // Entity filters
            // Trivial filters
            this.keepAllFilter = new SimpleHighlightCategoryFilterState();
            this.keepNoneFilter = new SimpleHighlightCategoryFilterState(exports.HighlightCategoryFilterChoice.None);
        }
        BsPreviewHighlights.prototype.ngOnChanges = function (changes) {
            if (changes["previewData"]) {
                this.initialize();
            }
            if (changes["previewDocument"]) {
                if (this.previewReady) {
                    this.moveToFirstSearchTerm();
                }
            }
        };
        BsPreviewHighlights.prototype.initialize = function () {
            this.highlightDataPerCategory = !this.previewData ? undefined : this.previewData.highlightsPerCategory;
            this.highlightDataPerLocation = !this.previewData ? undefined : this.previewData.highlightsPerLocation;
            this.navigationState = new SimpleHighlightNavigationState(this.nonEmptyCategoryIds);
            this.reset();
        };
        /**
         * Called on init and when non-value filters are clicked
         * Resets the navigationState entity selection.
         * Applies the filters to the preview document.
         * Updates the filtered data.
         */
        BsPreviewHighlights.prototype.reset = function () {
            this.navigationState.current = -1; // Resets the navigationState entity selection.
            if (this.previewReady) // Applies the filters to the preview document.
                this.previewDocument.filterHighlights(this.navigationState.filters);
            // Updates the filtered data.
            this.filteredHighlightData = this.highlightDataPerLocation ?
                new FilteredHighlightDataPerLocation(this.highlightDataPerLocation, this.navigationState.filters) : undefined;
        };
        /**
         * Selects the first match location (highlight classes and scrolls to it)
         */
        BsPreviewHighlights.prototype.moveToFirstSearchTerm = function () {
            if (this.filteredHighlightData) {
                for (var i = 0, ic = this.total; i < ic; i++) {
                    var highlight = this.filteredHighlightData[i];
                    if (highlight.positionInCategories) {
                        var category = "term1";
                        var position = highlight.positionInCategories[category];
                        if (!base.Utils.isNumber(position)) {
                            category = "matchlocations";
                            position = highlight.positionInCategories[category];
                        }
                        if (base.Utils.isNumber(position)) {
                            this.navigationState.current = i;
                            this.previewDocument.selectHighlight(category, position);
                            break;
                        }
                    }
                }
            }
        };
        Object.defineProperty(BsPreviewHighlights.prototype, "current", {
            /**
             * Index of currently selected entity (from 1)
             */
            get: function () {
                return this.navigationState.current + 1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsPreviewHighlights.prototype, "noData", {
            /**
             * No categories to highlight
             */
            get: function () {
                return this.nonEmptyCategoryIds.length === 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsPreviewHighlights.prototype, "total", {
            /**
             * Total number of highlights
             */
            get: function () {
                return this.filteredHighlightData ? this.filteredHighlightData.size() : 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsPreviewHighlights.prototype, "previewReady", {
            /**
             * @returns true when the document is ready to be interacted with
             */
            get: function () {
                return !!this.previewDocument;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsPreviewHighlights.prototype, "currentValue", {
            /**
             * Returns the currently selected entity/match/extract based on the PreviewData
             * or potentially by fetching it directly from the HTML document.
             */
            get: function () {
                if (this.navigationState.current < 0 || !this.filteredHighlightData) {
                    return "";
                }
                var result = this.filteredHighlightData[this.navigationState.current].displayValue;
                if (result) {
                    return result;
                }
                var values = this.filteredHighlightData[this.navigationState.current].values;
                if (values && values.length > 0 && values[0] && values[0].length > 0) {
                    return values[0];
                }
                if (Object.keys(this.filteredHighlightData[this.navigationState.current].positionInCategories).length === 1
                    && this.filteredHighlightData[this.navigationState.current].positionInCategories["extractslocations"]) {
                    return this.previewDocument.getHighlightText("extractslocations", this.filteredHighlightData[this.navigationState.current].positionInCategories["extractslocations"]);
                }
                return "";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsPreviewHighlights.prototype, "currentCategories", {
            /**
             * Get categories of the currently selected entity/match/extract
             * based on the filtered Highlight data per location
             */
            get: function () {
                var result = [];
                if (this.navigationState.current < 0 || !this.filteredHighlightData || this.navigationState.current >= this.filteredHighlightData.size()) {
                    return result;
                }
                for (var categoryId in this.filteredHighlightData[this.navigationState.current].positionInCategories) {
                    result.push(categoryId);
                }
                return result;
            },
            enumerable: false,
            configurable: true
        });
        BsPreviewHighlights.prototype.categoryIconClass = function (categoryId) {
            if (categoryId.startsWith("term")) {
                return "far fa-flag";
            }
            return "sq-icon-" + categoryId;
        };
        BsPreviewHighlights.prototype.getCategoryHighlightData = function (categoryId) {
            return this.highlightDataPerCategory ? this.highlightDataPerCategory[categoryId] : undefined;
        };
        BsPreviewHighlights.prototype.categoryDisplayLabel = function (categoryId) {
            return this.highlightDataPerCategory ? this.highlightDataPerCategory[categoryId].categoryDisplayLabel : "";
        };
        BsPreviewHighlights.prototype.categoryLabelPipeParams = function (categoryId) {
            if (!categoryId.startsWith("term")) {
                return {};
            }
            var index = Number(categoryId.slice("term".length));
            if (isNaN(index)) {
                return {};
            }
            return { values: { index: index } };
        };
        Object.defineProperty(BsPreviewHighlights.prototype, "nonEmptyCategoryIds", {
            /**
             * Returns the list of entity categories that contain values
             */
            get: function () {
                var result = [];
                for (var categoryId in this.highlightDataPerCategory) {
                    if (!this.categoryIsEmpty(categoryId, this.highlightDataPerCategory)) {
                        result.push(categoryId);
                    }
                }
                return result;
            },
            enumerable: false,
            configurable: true
        });
        BsPreviewHighlights.prototype.categoryIsEmpty = function (categoryId, highlightData) {
            return highlightData[categoryId] == null
                || highlightData[categoryId].values == null
                || highlightData[categoryId].values.length <= 0;
        };
        /**
         * @returns true if there is more than one option per category
         * @param categoryId the category id
         */
        BsPreviewHighlights.prototype.categoryHasMultipleValues = function (categoryId) {
            return this.getHighlightValueCount(categoryId) > 1;
        };
        /**
         * @returns the number of options per category
         * @param categoryId the category id
         */
        BsPreviewHighlights.prototype.getHighlightValueCount = function (categoryId) {
            if (!this.highlightDataPerCategory || this.categoryIsEmpty(categoryId, this.highlightDataPerCategory)) {
                return 0;
            }
            var values = this.highlightDataPerCategory[categoryId].values;
            if (values == null) {
                return 0;
            }
            return values.length;
        };
        // Navigation buttons handlers
        BsPreviewHighlights.prototype.first = function () {
            if (this.navigationState.current > 0) {
                this.navigationState.current = 0;
                this.selectHighlight();
            }
        };
        BsPreviewHighlights.prototype.previous = function () {
            if (this.navigationState.current > 0) {
                this.navigationState.current--;
                this.selectHighlight();
            }
        };
        BsPreviewHighlights.prototype.next = function () {
            if (this.navigationState.current < this.total - 1) {
                this.navigationState.current++;
                this.selectHighlight();
            }
        };
        BsPreviewHighlights.prototype.last = function () {
            if (this.navigationState.current !== this.total - 1) {
                this.navigationState.current = this.total - 1;
                this.selectHighlight();
            }
        };
        BsPreviewHighlights.prototype.selectHighlight = function () {
            if (this.filteredHighlightData) {
                var positionInCategories = this.filteredHighlightData[this.navigationState.current].positionInCategories;
                var firstCategory = Object.keys(positionInCategories)[0];
                this.previewDocument.selectHighlight(firstCategory, positionInCategories[firstCategory]);
            }
        };
        BsPreviewHighlights.prototype.selectAll = function () {
            for (var categoryId in this.navigationState.filters) {
                this.navigationState.filters[categoryId] = this.keepAllFilter;
            }
            this.reset();
        };
        BsPreviewHighlights.prototype.selectNone = function () {
            for (var categoryId in this.navigationState.filters) {
                this.navigationState.filters[categoryId] = this.keepNoneFilter;
            }
            this.reset();
        };
        Object.defineProperty(BsPreviewHighlights.prototype, "allSelected", {
            get: function () {
                for (var categoryId in this.navigationState.filters) {
                    var filter = this.navigationState.filters[categoryId];
                    if (filter && filter.choice !== exports.HighlightCategoryFilterChoice.All) {
                        return false;
                    }
                }
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsPreviewHighlights.prototype, "noneSelected", {
            get: function () {
                for (var categoryId in this.navigationState.filters) {
                    var filter = this.navigationState.filters[categoryId];
                    if (!filter || filter.choice !== exports.HighlightCategoryFilterChoice.None) {
                        return false;
                    }
                }
                return true;
            },
            enumerable: false,
            configurable: true
        });
        // Filter created for each option
        BsPreviewHighlights.prototype.newFilter = function (value) {
            return new SimpleHighlightCategoryFilterState(value);
        };
        // A filter was clicked
        BsPreviewHighlights.prototype.selectFilter = function (categoryId, value) {
            //console.log(categoryId, value);
            // If a specific entity/extract is selected we want to select it, rather than filter other entities
            if (value.choice === exports.HighlightCategoryFilterChoice.Value) {
                // First, let's cancel value filters EXCEPT the one that was just selected
                for (var key in this.navigationState.filters) {
                    if (key !== categoryId && this.navigationState.filters[key] !== this.keepAllFilter && this.navigationState.filters[key] !== this.keepNoneFilter) {
                        this.navigationState.filters[key] = this.keepAllFilter;
                    }
                }
                // Search the entity ID
                var highlight = void 0;
                for (var key in this.highlightDataPerLocation) {
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
                for (var key in this.navigationState.filters) {
                    if (this.navigationState.filters[key] !== this.keepAllFilter && this.navigationState.filters[key] !== this.keepNoneFilter) {
                        this.navigationState.filters[key] = this.keepAllFilter;
                    }
                }
                // Reset just applies the (non-value) filters as they are and removes selection
                this.reset();
            }
        };
        /**
         * Comparator allowing to sort the filters in the select
         */
        BsPreviewHighlights.prototype.compareFilters = function (filter1, filter2) {
            return SimpleHighlightCategoryFilterState.compare(filter1, filter2);
        };
        return BsPreviewHighlights;
    }());
    BsPreviewHighlights.ɵfac = function BsPreviewHighlights_Factory(t) { return new (t || BsPreviewHighlights)(); };
    BsPreviewHighlights.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewHighlights, selectors: [["sq-preview-highlights"]], inputs: { previewDocument: "previewDocument", previewData: "previewData" }, features: [i0.ɵɵNgOnChangesFeature], decls: 7, vars: 5, consts: [[1, "card", "sq-facet"], [1, "card-header"], [4, "ngIf", "ngIfElse"], ["normalCase", ""], [1, "card-body", "noEntityToHighlightMessage"], [1, "card-body"], [1, "currentSelection"], [1, "selectedHighlightTitle"], [1, "currentSelectionPanel"], ["class", "selectedHighlight", 4, "ngIf", "ngIfElse"], ["noSelection", ""], [1, "navigation-buttons"], [1, "btn", "btn-secondary", 3, "disabled", "title", "click"], [1, "fas", "fa-fast-backward"], [1, "fas", "fa-step-backward"], [1, "counter-container"], [1, "counter"], [1, "counter", "ghost"], [1, "fas", "fa-step-forward"], [1, "fas", "fa-fast-forward"], [1, "card-body", "filterPanel"], [1, "filterPanelTitle"], [1, "fas", "fa-filter"], ["class", "batchSelectButtonsContainer", 4, "ngIf"], [1, "filters"], ["class", "sq-highlight", 4, "ngFor", "ngForOf"], [1, "selectedHighlight"], [1, "currentCategories"], [4, "ngFor", "ngForOf"], [1, "selectedHighlightValue", 3, "innerHTML"], [1, "currentCategoryLabel"], [1, "noSelectionMessage"], [1, "batchSelectButtonsContainer"], [1, "batchSelectButtonsPaddingPlaceholder"], [1, "batchSelectButtons"], [1, "batchSelectButton"], [1, "btn", 3, "disabled", "title", "click"], [1, "far", "fa-check-square"], [1, "fas", "fa-times"], [1, "sq-highlight"], [1, "categoryIcon"], [1, "categoryLabel"], [1, "categoryFilter"], ["singleValue", ""], [1, "custom-select", 3, "ngModel", "compareWith", "ngModelChange"], [3, "ngValue"], ["disabled", "", 1, "selectSeparator"], [3, "ngValue", 4, "ngFor", "ngForOf"], [4, "ngIf"]], template: function BsPreviewHighlights_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "div", 1);
                i0.ɵɵtext(2);
                i0.ɵɵpipe(3, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(4, BsPreviewHighlights_ng_container_4_Template, 4, 3, "ng-container", 2);
                i0.ɵɵtemplate(5, BsPreviewHighlights_ng_template_5_Template, 39, 38, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                var _r1 = i0.ɵɵreference(6);
                i0.ɵɵadvance(2);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 3, "msg#preview.highlightsTitle"));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", ctx.noData)("ngIfElse", _r1);
            }
        }, directives: [i2.NgIf, i2.NgForOf, i1$3.SelectControlValueAccessor, i1$3.NgControlStatus, i1$3.NgModel, i1$3.NgSelectOption, i1$3.ɵangular_packages_forms_forms_x], pipes: [i3.MessagePipe, i3$2.NumberPipe], styles: [".noEntityToHighlightMessage[_ngcontent-%COMP%]{opacity:.5}.currentSelection[_ngcontent-%COMP%]{margin-bottom:.75rem}.selectedHighlightTitle[_ngcontent-%COMP%]{padding-bottom:.375em}.currentSelectionPanel[_ngcontent-%COMP%]{border:1px solid rgba(0,0,0,.125);padding:.5rem;text-align:center}.currentCategories[_ngcontent-%COMP%]{height:1.5em}.selectedHighlightValue[_ngcontent-%COMP%]{font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.noSelectionMessage[_ngcontent-%COMP%]{opacity:.5}.navigation-buttons[_ngcontent-%COMP%]{text-align:center}.counter-container[_ngcontent-%COMP%]{display:inline-block;position:relative}.counter[_ngcontent-%COMP%]{padding-left:.125rem;padding-right:.125rem;position:absolute;right:0}.ghost[_ngcontent-%COMP%]{position:static;visibility:hidden}.filterPanel[_ngcontent-%COMP%]{border-spacing:0 .375em;display:table}.filterPanelTitle[_ngcontent-%COMP%]{border-top:1px solid rgba(0,0,0,.125);display:table-caption;margin-bottom:-.5em;padding-left:.75em;padding-top:.75em}.batchSelectButtonsContainer[_ngcontent-%COMP%]{display:table-row}.batchSelectButtonsPaddingPlaceholder[_ngcontent-%COMP%]{display:table-cell}.batchSelectButtons[_ngcontent-%COMP%]{border-spacing:0;display:table;table-layout:fixed;width:100%}.batchSelectButton[_ngcontent-%COMP%]{display:table-cell}.batchSelectButton[_ngcontent-%COMP%]:not(:last-child){padding-right:.5rem}.batchSelectButton[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:block;white-space:normal;width:100%}.filterPanelTitle[_ngcontent-%COMP%]   .fa-filter[_ngcontent-%COMP%]{padding-right:.375em}.filters[_ngcontent-%COMP%]{display:table-row-group}.sq-highlight[_ngcontent-%COMP%]{display:table-row}.categoryIcon[_ngcontent-%COMP%], .categoryLabel[_ngcontent-%COMP%]{display:table-cell;padding-right:.375em;white-space:nowrap}.categoryFilter[_ngcontent-%COMP%]{display:table-cell;width:100%}.selectSeparator[_ngcontent-%COMP%]{background-color:#ccc;font-size:1pt}.sq-highlight[_ngcontent-%COMP%]{flex-wrap:nowrap}.sq-highlight[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:focus{z-index:4}.sq-highlight[_ngcontent-%COMP%]   .sq-highlight-btns[_ngcontent-%COMP%]{flex-direction:row}.sq-highlight[_ngcontent-%COMP%]   .sq-highlight-item[_ngcontent-%COMP%]{width:100%}.sq-highlight[_ngcontent-%COMP%]   .sq-highlight-item[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{white-space:normal;width:100%}.sq-highlight[_ngcontent-%COMP%]:not(:first-child){margin-top:.25rem}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsPreviewHighlights, [{
                type: i0.Component,
                args: [{
                        selector: "sq-preview-highlights",
                        templateUrl: "./preview-highlights.html",
                        styleUrls: ["./preview-highlights.scss"]
                    }]
            }], null, { previewDocument: [{
                    type: i0.Input
                }], previewData: [{
                    type: i0.Input
                }] });
    })();
    // Implementation of data structures
    var SimpleHighlightNavigationState = /** @class */ (function () {
        function SimpleHighlightNavigationState(categories) {
            var e_1, _a;
            this.current = -1; // No selection
            this.filters = {};
            try {
                for (var categories_1 = __values(categories), categories_1_1 = categories_1.next(); !categories_1_1.done; categories_1_1 = categories_1.next()) {
                    var category = categories_1_1.value;
                    this.filters[category] = new SimpleHighlightCategoryFilterState(); // All entities visible by default
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (categories_1_1 && !categories_1_1.done && (_a = categories_1.return)) _a.call(categories_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return SimpleHighlightNavigationState;
    }());
    var SimpleHighlightCategoryFilterState = /** @class */ (function () {
        function SimpleHighlightCategoryFilterState(param) {
            this.choice = exports.HighlightCategoryFilterChoice.All;
            this._filterValue = "";
            if (param == null) {
                return;
            }
            if (typeof param === "string") {
                this.choice = exports.HighlightCategoryFilterChoice.Value;
                this._filterValue = param;
            }
            else {
                this.choice = param;
            }
        }
        Object.defineProperty(SimpleHighlightCategoryFilterState.prototype, "filterValue", {
            get: function () {
                if (this.choice === exports.HighlightCategoryFilterChoice.Value) {
                    return this._filterValue;
                }
                return "";
            },
            enumerable: false,
            configurable: true
        });
        SimpleHighlightCategoryFilterState.compare = function (filter1, filter2) {
            if (filter1 && filter2) {
                if (filter1.choice !== filter2.choice) {
                    return false;
                }
                return filter1.choice !== exports.HighlightCategoryFilterChoice.Value
                    || filter1.filterValue === filter2.filterValue;
            }
            return filter1 === filter2;
        };
        return SimpleHighlightCategoryFilterState;
    }());
    var FilteredHighlightDataPerLocation = /** @class */ (function () {
        function FilteredHighlightDataPerLocation(baseData, filters) {
            var counter = 0;
            for (var i in baseData) {
                var categories = !baseData[i].positionInCategories ? undefined : Object.keys(baseData[i].positionInCategories);
                if (categories && this.locationIsIncluded(baseData[i].values, categories, filters)) {
                    this[counter] = baseData[i];
                    counter++;
                }
            }
        }
        FilteredHighlightDataPerLocation.prototype.size = function () {
            return Object.keys(this).length;
        };
        FilteredHighlightDataPerLocation.prototype.locationIsIncluded = function (values, categories, filters) {
            var e_2, _a;
            if (!categories) {
                return false;
            }
            try {
                for (var categories_2 = __values(categories), categories_2_1 = categories_2.next(); !categories_2_1.done; categories_2_1 = categories_2.next()) {
                    var category = categories_2_1.value;
                    if (filters[category] &&
                        (filters[category].choice === exports.HighlightCategoryFilterChoice.All
                            || filters[category].choice === exports.HighlightCategoryFilterChoice.Value && values != null && values.includes(filters[category].filterValue))) {
                        return true;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (categories_2_1 && !categories_2_1.done && (_a = categories_2.return)) _a.call(categories_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return false;
        };
        return FilteredHighlightDataPerLocation;
    }());

    function BsPreviewLinks_div_0_Template(rf, ctx) {
        if (rf & 1) {
            var _r2_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵelementStart(1, "div", 2);
            i0.ɵɵelementStart(2, "nav");
            i0.ɵɵelementStart(3, "ul", 3);
            i0.ɵɵelementStart(4, "li", 4);
            i0.ɵɵelementStart(5, "a", 5);
            i0.ɵɵlistener("click", function BsPreviewLinks_div_0_Template_a_click_5_listener() { i0.ɵɵrestoreView(_r2_1); var ctx_r1 = i0.ɵɵnextContext(); return ctx_r1.click(); });
            i0.ɵɵelement(6, "span");
            i0.ɵɵtext(7);
            i0.ɵɵpipe(8, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(5);
            i0.ɵɵpropertyInterpolate("href", ctx_r0.originalDocumentUrl, i0.ɵɵsanitizeUrl);
            i0.ɵɵadvance(1);
            i0.ɵɵclassMapInterpolate1("far fa-file sq-icon-file-", ctx_r0.record.fileext, "");
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(8, 5, "msg#preview.originalDocument"), " ");
        }
    }
    var BsPreviewLinks = /** @class */ (function () {
        function BsPreviewLinks(searchService) {
            this.searchService = searchService;
        }
        BsPreviewLinks.prototype.ngOnChanges = function () {
            this.originalDocumentUrl = this.record.url1;
        };
        BsPreviewLinks.prototype.click = function () {
            this.searchService.notifyOpenOriginalDocument(this.record, this.resultId);
        };
        return BsPreviewLinks;
    }());
    BsPreviewLinks.ɵfac = function BsPreviewLinks_Factory(t) { return new (t || BsPreviewLinks)(i0.ɵɵdirectiveInject(i1$2.SearchService)); };
    BsPreviewLinks.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewLinks, selectors: [["sq-preview-links"]], inputs: { record: "record", resultId: "resultId" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "card sq-facet", 4, "ngIf"], [1, "card", "sq-facet"], [1, "card-body"], [1, "nav", "nav-pills", "nav-stacked"], [1, "nav-item"], ["target", "_blank", 1, "nav-link", "originalDocumentLink", 3, "href", "click"]], template: function BsPreviewLinks_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsPreviewLinks_div_0_Template, 9, 7, "div", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !!ctx.originalDocumentUrl);
            }
        }, directives: [i2.NgIf], pipes: [i3.MessagePipe], styles: [".originalDocumentLink[_ngcontent-%COMP%]{padding-left:0}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsPreviewLinks, [{
                type: i0.Component,
                args: [{
                        selector: "sq-preview-links",
                        // For highlight buttons...
                        // http://stackoverflow.com/questions/21245541/min-and-max-width-mess-up-text-align-center
                        templateUrl: "./preview-links.html",
                        styleUrls: ["./preview-links.css"]
                    }]
            }], function () { return [{ type: i1$2.SearchService }]; }, { record: [{
                    type: i0.Input
                }], resultId: [{
                    type: i0.Input
                }] });
    })();

    function BsSimilarDocuments_sq_facet_card_0_ng_container_2_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r6_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "div", 5);
            i0.ɵɵlistener("click", function BsSimilarDocuments_sq_facet_card_0_ng_container_2_ng_container_1_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r6_1); var document_r2 = i0.ɵɵnextContext().$implicit; var ctx_r4 = i0.ɵɵnextContext(2); return ctx_r4.onLinkClick(document_r2); });
            i0.ɵɵelement(2, "div");
            i0.ɵɵelementStart(3, "a", 6);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var document_r2 = i0.ɵɵnextContext().$implicit;
            var ctx_r3 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(2);
            i0.ɵɵclassMapInterpolate1("similarDocumentIcon ", ctx_r3.documentIconClass(document_r2), "");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(document_r2.title);
        }
    }
    function BsSimilarDocuments_sq_facet_card_0_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsSimilarDocuments_sq_facet_card_0_ng_container_2_ng_container_1_Template, 5, 4, "ng-container", 4);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var document_r2 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", document_r2);
        }
    }
    function BsSimilarDocuments_sq_facet_card_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "sq-facet-card", 1);
            i0.ɵɵelementStart(1, "div", 2);
            i0.ɵɵtemplate(2, BsSimilarDocuments_sq_facet_card_0_ng_container_2_Template, 2, 1, "ng-container", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("title", "msg#preview.similarDocumentsTitle");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx_r0.documents);
        }
    }
    var BsSimilarDocuments = /** @class */ (function () {
        function BsSimilarDocuments(similarDocumentsService, previewService, changeDetectorRef) {
            this.similarDocumentsService = similarDocumentsService;
            this.previewService = previewService;
            this.changeDetectorRef = changeDetectorRef;
        }
        Object.defineProperty(BsSimilarDocuments.prototype, "documents", {
            get: function () {
                return this.documentList;
            },
            enumerable: false,
            configurable: true
        });
        BsSimilarDocuments.prototype.ngOnChanges = function () {
            var _this = this;
            if (this.sourceDocumentId == null) {
                this.documentList = [];
                return;
            }
            this.similarDocumentsService.get(this.sourceDocumentId, this.query.name).subscribe(function (results) {
                _this.documentList = results;
                _this.changeDetectorRef.markForCheck();
            });
        };
        BsSimilarDocuments.prototype.documentIconClass = function (document) {
            var documentFormat = document.fileext;
            if (!documentFormat) {
                return "far fa-file";
            }
            return "far fa-file sq-icon-file-" + document.fileext;
        };
        BsSimilarDocuments.prototype.onLinkClick = function (document) {
            this.previewService.openNewWindow(document, this.query);
        };
        return BsSimilarDocuments;
    }());
    BsSimilarDocuments.ɵfac = function BsSimilarDocuments_Factory(t) { return new (t || BsSimilarDocuments)(i0.ɵɵdirectiveInject(i2$1.SimilarDocumentsWebService), i0.ɵɵdirectiveInject(PreviewService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    BsSimilarDocuments.ɵcmp = i0.ɵɵdefineComponent({ type: BsSimilarDocuments, selectors: [["sq-similar-documents"]], inputs: { sourceDocumentId: "sourceDocumentId", query: "query" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "title", 4, "ngIf"], [3, "title"], ["id", "similarDocumentsBody", 1, "card-body", "collapse", "show"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "similarDocument", 3, "click"], ["href", "javascript:void(0)", 1, "similarDocumentTitle"]], template: function BsSimilarDocuments_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsSimilarDocuments_sq_facet_card_0_Template, 3, 2, "sq-facet-card", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.documents != null && ctx.documents.length > 0);
            }
        }, directives: [i2.NgIf, i4$2.BsFacetCard, i2.NgForOf], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsSimilarDocuments, [{
                type: i0.Component,
                args: [{
                        selector: "sq-similar-documents",
                        templateUrl: "./similar-documents.html"
                    }]
            }], function () { return [{ type: i2$1.SimilarDocumentsWebService }, { type: PreviewService }, { type: i0.ChangeDetectorRef }]; }, { sourceDocumentId: [{
                    type: i0.Input
                }], query: [{
                    type: i0.Input
                }] });
    })();

    function BsPreviewPanel_div_0_sq_metadata_8_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "sq-metadata", 14);
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("record", ctx_r1.previewData.record)("items", ctx_r1.metadata)("showTitles", false)("showIcons", true)("clickable", false);
        }
    }
    function BsPreviewPanel_div_0_sq_similar_documents_9_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "sq-similar-documents", 15);
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("sourceDocumentId", ctx_r2.previewData.record.id)("query", ctx_r2.query);
        }
    }
    function BsPreviewPanel_div_0_Template(rf, ctx) {
        if (rf & 1) {
            var _r5_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵelementStart(1, "div", 2);
            i0.ɵɵelementStart(2, "div");
            i0.ɵɵelementStart(3, "div", 3);
            i0.ɵɵelement(4, "sq-preview-links", 4);
            i0.ɵɵelement(5, "sq-preview-highlights", 5);
            i0.ɵɵelementStart(6, "sq-facet-card", 6);
            i0.ɵɵelementStart(7, "div", 7);
            i0.ɵɵtemplate(8, BsPreviewPanel_div_0_sq_metadata_8_Template, 1, 5, "sq-metadata", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(9, BsPreviewPanel_div_0_sq_similar_documents_9_Template, 1, 2, "sq-similar-documents", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "div", 10);
            i0.ɵɵelementStart(11, "sq-preview-document-iframe", 11);
            i0.ɵɵlistener("onPreviewReady", function BsPreviewPanel_div_0_Template_sq_preview_document_iframe_onPreviewReady_11_listener($event) { i0.ɵɵrestoreView(_r5_1); var ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.onPreviewReady($event); });
            i0.ɵɵelement(12, "sq-preview-tooltip", 12, 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵclassMapInterpolate1("col-lg-3 sq-col ", ctx_r0.leftPaneAdditionalClasses, "");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("record", ctx_r0.previewData.record)("resultId", ctx_r0.previewData.resultId);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("previewDocument", ctx_r0.previewDocument)("previewData", ctx_r0.previewData);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("title", "msg#preview.documentPropertiesTitle");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r0.previewData.record);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.displaySimilarDocuments);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("sandbox", ctx_r0.sandbox)("downloadUrl", ctx_r0.downloadUrl);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("previewDocument", ctx_r0.previewDocument)("previewData", ctx_r0.previewDocument);
        }
    }
    var BsPreviewPanel = /** @class */ (function () {
        function BsPreviewPanel(previewService, changeDetectorRef) {
            this.previewService = previewService;
            this.changeDetectorRef = changeDetectorRef;
        }
        BsPreviewPanel.prototype.ngOnChanges = function (changes) {
            if (changes["previewData"]) {
                this.downloadUrl = this.previewData ? this.previewService.makeDownloadUrl(this.previewData.documentCachedContentUrl) : undefined;
            }
        };
        BsPreviewPanel.prototype.onPreviewReady = function (previewDocument) {
            this.previewDocument = previewDocument;
            this.changeDetectorRef.markForCheck();
        };
        return BsPreviewPanel;
    }());
    BsPreviewPanel.ɵfac = function BsPreviewPanel_Factory(t) { return new (t || BsPreviewPanel)(i0.ɵɵdirectiveInject(PreviewService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    BsPreviewPanel.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewPanel, selectors: [["sq-preview-panel"]], inputs: { query: "query", previewData: "previewData", sandbox: "sandbox", displaySimilarDocuments: "displaySimilarDocuments", metadata: "metadata", leftPaneAdditionalClasses: "leftPaneAdditionalClasses" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "container-fluid sq-preview", 4, "ngIf"], [1, "container-fluid", "sq-preview"], [1, "row", "sq-row"], [1, "sq-preview-bar"], [1, "d-block", "mb-3", 3, "record", "resultId"], [1, "d-block", "mb-3", 3, "previewDocument", "previewData"], [1, "d-block", "mb-3", 3, "title"], ["id", "documentPropertiesBody", 1, "card-body", "collapse", "show"], [3, "record", "items", "showTitles", "showIcons", "clickable", 4, "ngIf"], ["class", "d-block mb-3", 3, "sourceDocumentId", "query", 4, "ngIf"], [1, "col-lg-9", "sq-col", "d-flex", "flex-column"], [3, "sandbox", "downloadUrl", "onPreviewReady"], [3, "previewDocument", "previewData"], ["tooltip", ""], [3, "record", "items", "showTitles", "showIcons", "clickable"], [1, "d-block", "mb-3", 3, "sourceDocumentId", "query"]], template: function BsPreviewPanel_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsPreviewPanel_div_0_Template, 14, 14, "div", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !!ctx.previewData);
            }
        }, directives: [i2.NgIf, BsPreviewLinks, BsPreviewHighlights, i4$2.BsFacetCard, PreviewDocumentIframe, PreviewTooltip, i5$1.Metadata, BsSimilarDocuments], styles: [".sq-preview-document-properties[_ngcontent-%COMP%]{margin-top:.5em}.collapseButton[_ngcontent-%COMP%]{float:right}.sq-preview-bar[_ngcontent-%COMP%]{min-height:100%;overflow-x:hidden}.sq-preview[_ngcontent-%COMP%]{height:100%}.sq-preview[_ngcontent-%COMP%] > .row[_ngcontent-%COMP%]{flex-wrap:nowrap;height:100%}.sq-preview[_ngcontent-%COMP%] > .row[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{-webkit-overflow-scrolling:touch;height:100%;overflow-x:hidden;overflow-y:auto}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsPreviewPanel, [{
                type: i0.Component,
                args: [{
                        selector: "sq-preview-panel",
                        templateUrl: "./preview-panel.html",
                        styleUrls: ["./preview-panel.scss"]
                    }]
            }], function () { return [{ type: PreviewService }, { type: i0.ChangeDetectorRef }]; }, { query: [{
                    type: i0.Input
                }], previewData: [{
                    type: i0.Input
                }], sandbox: [{
                    type: i0.Input
                }], displaySimilarDocuments: [{
                    type: i0.Input
                }], metadata: [{
                    type: i0.Input
                }], leftPaneAdditionalClasses: [{
                    type: i0.Input
                }] });
    })();

    function BsPreviewPopup_div_2_span_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#preview.previousDocument"), "");
        }
    }
    function BsPreviewPopup_div_2_span_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#preview.nextDocument"), "");
        }
    }
    function BsPreviewPopup_div_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r4_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 4);
            i0.ɵɵelementStart(1, "button", 5);
            i0.ɵɵlistener("click", function BsPreviewPopup_div_2_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r4_1); var ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.previous(); });
            i0.ɵɵelement(2, "span", 6);
            i0.ɵɵtemplate(3, BsPreviewPopup_div_2_span_3_Template, 3, 3, "span", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "button", 5);
            i0.ɵɵlistener("click", function BsPreviewPopup_div_2_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r4_1); var ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.next(); });
            i0.ɵɵelement(5, "span", 8);
            i0.ɵɵtemplate(6, BsPreviewPopup_div_2_span_6_Template, 3, 3, "span", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵclassMapInterpolate1("btn btn btn-outline-primary ", !ctx_r0.previousEnabled ? "disabled" : "", "");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r0.showPreviousNextText);
            i0.ɵɵadvance(1);
            i0.ɵɵclassMapInterpolate1("btn btn btn-outline-primary ", !ctx_r0.nextEnabled ? "disabled" : "", "");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r0.showPreviousNextText);
        }
    }
    var BsPreviewPopup = /** @class */ (function () {
        function BsPreviewPopup(model, searchService, previewService, uiService, changeDetectorRef) {
            this.model = model;
            this.searchService = searchService;
            this.previewService = previewService;
            this.uiService = uiService;
            this.changeDetectorRef = changeDetectorRef;
        }
        BsPreviewPopup.prototype.ngOnInit = function () {
            var _this = this;
            this.screenSize = this.uiService.screenSize;
            this.resizeSubscription = base.Utils.subscribe(this.uiService.resizeEvent, function (event) {
                if (_this.screenSize !== _this.uiService.screenSize) {
                    _this.screenSize = _this.uiService.screenSize;
                    _this.changeDetectorRef.markForCheck();
                }
            });
            this.updatePreviewData(this.model.record.id);
        };
        BsPreviewPopup.prototype.ngOnDestroy = function () {
            this.resizeSubscription.unsubscribe();
        };
        Object.defineProperty(BsPreviewPopup.prototype, "currentId", {
            get: function () {
                if (this.previewData && this.previewData.record) {
                    return this.previewData.record.id;
                }
                return "";
            },
            enumerable: false,
            configurable: true
        });
        BsPreviewPopup.prototype.updatePreviewData = function (id) {
            var _this = this;
            this.previewService.getPreviewData(id, this.model.query).subscribe(function (previewData) {
                _this.previewData = previewData;
                _this.previewDataError = false;
                _this.changeDetectorRef.markForCheck();
            }, function (error) {
                _this.previewDataError = true;
            });
        };
        Object.defineProperty(BsPreviewPopup.prototype, "recordTitle", {
            get: function () {
                if (this.previewData && this.previewData.record != null) {
                    return this.previewData.record.title;
                }
                return this.previewDataError ? "msg#preview.noDocumentDataErrorPopupTitle" : "";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsPreviewPopup.prototype, "showPreviousNextText", {
            get: function () {
                return this.uiService.screenSizeIsGreaterOrEqual("lg");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsPreviewPopup.prototype, "showPreviousNext", {
            get: function () {
                return this.getSearchPositionInPage() >= 0 && !!this.searchService.results &&
                    !!this.searchService.results.records && this.searchService.results.records.length > 1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsPreviewPopup.prototype, "previousEnabled", {
            get: function () {
                return this.getSearchPositionInPage() > 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsPreviewPopup.prototype, "nextEnabled", {
            get: function () {
                if (!this.searchService.results || !this.searchService.results.records) {
                    return false;
                }
                var searchPosition = this.getSearchPositionInPage();
                return searchPosition >= 0 && searchPosition < (this.searchService.results.records.length - 1);
            },
            enumerable: false,
            configurable: true
        });
        BsPreviewPopup.prototype.getSearchPositionInPage = function () {
            var id = this.currentId;
            if (id && this.searchService.results && this.searchService.results.records) {
                for (var i = 0, ic = this.searchService.results.records.length; i < ic; i++) {
                    var record = this.searchService.results.records[i];
                    if (record.id === id) {
                        return i;
                    }
                }
            }
            return -1;
        };
        BsPreviewPopup.prototype.previous = function () {
            if (!this.searchService.results || !this.searchService.results.records) {
                return;
            }
            var index = this.getSearchPositionInPage();
            if (index <= 0) {
                return;
            }
            var item = this.searchService.results.records[index - 1];
            this.updatePreviewData(item.id);
        };
        BsPreviewPopup.prototype.next = function () {
            if (!this.searchService.results || !this.searchService.results.records) {
                return;
            }
            var index = this.getSearchPositionInPage();
            if (index === -1 || index >= (this.searchService.results.records.length - 1)) {
                return;
            }
            var item = this.searchService.results.records[index + 1];
            this.updatePreviewData(item.id);
        };
        return BsPreviewPopup;
    }());
    BsPreviewPopup.ɵfac = function BsPreviewPopup_Factory(t) { return new (t || BsPreviewPopup)(i0.ɵɵdirectiveInject(i6.MODAL_MODEL), i0.ɵɵdirectiveInject(i1$2.SearchService), i0.ɵɵdirectiveInject(PreviewService), i0.ɵɵdirectiveInject(i3$2.UIService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    BsPreviewPopup.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewPopup, selectors: [["sq-preview-popup"]], decls: 4, vars: 8, consts: [[1, "modal-content", "sq-preview-popup"], [3, "title", "showFooter"], ["header", "", "class", "previousNextDocumentButtons", 4, "ngIf"], [3, "leftPaneAdditionalClasses", "query", "previewData", "displaySimilarDocuments", "metadata"], ["header", "", 1, "previousNextDocumentButtons"], [3, "click"], ["aria-hidden", "true", 1, "fas", "fa-arrow-left"], [4, "ngIf"], ["aria-hidden", "true", 1, "fas", "fa-arrow-right"]], template: function BsPreviewPopup_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "sq-modal", 1);
                i0.ɵɵtemplate(2, BsPreviewPopup_div_2_Template, 7, 8, "div", 2);
                i0.ɵɵelement(3, "sq-preview-panel", 3);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("title", ctx.recordTitle)("showFooter", false);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.showPreviousNext);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("leftPaneAdditionalClasses", "d-none d-lg-block")("query", ctx.model.query)("previewData", ctx.previewData)("displaySimilarDocuments", ctx.model.displaySimilarDocuments)("metadata", ctx.model.metadata);
            }
        }, directives: [i4$3.BsModal, i2.NgIf, BsPreviewPanel], pipes: [i3.MessagePipe], styles: [".previousNextDocumentButtons[_ngcontent-%COMP%]{display:inline-block;margin-left:auto;white-space:nowrap}.previousNextDocumentButtons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:not(:first-child){margin-left:.5em}.sq-preview-popup[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]{margin:0 15px}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsPreviewPopup, [{
                type: i0.Component,
                args: [{
                        selector: "sq-preview-popup",
                        templateUrl: "./preview-popup.html",
                        styleUrls: ["./preview-popup.css"]
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i6.MODAL_MODEL]
                        }] }, { type: i1$2.SearchService }, { type: PreviewService }, { type: i3$2.UIService }, { type: i0.ChangeDetectorRef }];
        }, null);
    })();

    function BsResultLinkPreview_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelement(1, "span");
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵclassMap(ctx_r0.icon);
        }
    }
    function BsResultLinkPreview_ng_container_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.text));
        }
    }
    var BsResultLinkPreview = /** @class */ (function () {
        function BsResultLinkPreview(modalService, previewService) {
            this.modalService = modalService;
            this.previewService = previewService;
            this.icon = "fas fa-search";
            this.text = "";
            this.title = "";
        }
        BsResultLinkPreview.prototype.click = function (event) {
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
        };
        return BsResultLinkPreview;
    }());
    BsResultLinkPreview.ɵfac = function BsResultLinkPreview_Factory(t) { return new (t || BsResultLinkPreview)(i0.ɵɵdirectiveInject(i6.ModalService), i0.ɵɵdirectiveInject(PreviewService)); };
    BsResultLinkPreview.ɵcmp = i0.ɵɵdefineComponent({ type: BsResultLinkPreview, selectors: [["sq-result-link-preview"]], inputs: { query: "query", record: "record", icon: "icon", text: "text", title: "title", usePopup: "usePopup", newWindow: "newWindow", displaySimilarDocuments: "displaySimilarDocuments", metadata: "metadata" }, decls: 4, vars: 5, consts: [["href", "#", 3, "title", "click"], [4, "ngIf"]], template: function BsResultLinkPreview_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "a", 0);
                i0.ɵɵlistener("click", function BsResultLinkPreview_Template_a_click_0_listener($event) { return ctx.click($event); });
                i0.ɵɵpipe(1, "sqMessage");
                i0.ɵɵtemplate(2, BsResultLinkPreview_ng_container_2_Template, 2, 3, "ng-container", 1);
                i0.ɵɵtemplate(3, BsResultLinkPreview_ng_container_3_Template, 3, 3, "ng-container", 1);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 3, ctx.title));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", !!ctx.icon);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", !!ctx.text);
            }
        }, directives: [i2.NgIf], pipes: [i3.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsResultLinkPreview, [{
                type: i0.Component,
                args: [{
                        selector: "sq-result-link-preview",
                        templateUrl: "./result-link-preview.html"
                    }]
            }], function () { return [{ type: i6.ModalService }, { type: PreviewService }]; }, { query: [{
                    type: i0.Input
                }], record: [{
                    type: i0.Input
                }], icon: [{
                    type: i0.Input
                }], text: [{
                    type: i0.Input
                }], title: [{
                    type: i0.Input
                }], usePopup: [{
                    type: i0.Input
                }], newWindow: [{
                    type: i0.Input
                }], displaySimilarDocuments: [{
                    type: i0.Input
                }], metadata: [{
                    type: i0.Input
                }] });
    })();

    function BsPreviewEntityFacetComponent_div_1_span_8_Template(rf, ctx) {
        if (rf & 1) {
            var _r7_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "span", 9);
            i0.ɵɵlistener("click", function BsPreviewEntityFacetComponent_div_1_span_8_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r7_1); var value_r2 = i0.ɵɵnextContext().$implicit; var ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.prevEntity(value_r2); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelement(2, "i", 10);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 1, "msg#preview.previousHighlightButtonAltText"));
        }
    }
    function BsPreviewEntityFacetComponent_div_1_span_9_Template(rf, ctx) {
        if (rf & 1) {
            var _r10_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "span", 9);
            i0.ɵɵlistener("click", function BsPreviewEntityFacetComponent_div_1_span_9_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r10_1); var value_r2 = i0.ɵɵnextContext().$implicit; var ctx_r8 = i0.ɵɵnextContext(); return ctx_r8.nextEntity(value_r2); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelement(2, "i", 11);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 1, "msg#preview.nextHighlightButtonAltText"));
        }
    }
    var _c0$4 = function (a0, a1) { return { "fa-check-square": a0, "fa-square": a1 }; };
    function BsPreviewEntityFacetComponent_div_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r12_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 3);
            i0.ɵɵelementStart(1, "span", 4);
            i0.ɵɵlistener("click", function BsPreviewEntityFacetComponent_div_1_Template_span_click_1_listener() { i0.ɵɵrestoreView(_r12_1); var value_r2 = ctx.$implicit; var ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.toggleEntity(value_r2); });
            i0.ɵɵelement(2, "i", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "span", 6);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "sqValue");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "span", 7);
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(8, BsPreviewEntityFacetComponent_div_1_span_8_Template, 3, 3, "span", 8);
            i0.ɵɵtemplate(9, BsPreviewEntityFacetComponent_div_1_span_9_Template, 3, 3, "span", 8);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var value_r2 = ctx.$implicit;
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(8, _c0$4, !ctx_r0.entityHidden(value_r2), ctx_r0.entityHidden(value_r2)));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 5, value_r2.displayValue, ctx_r0.column));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx_r0.entityCount(value_r2));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.previewDocument);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.previewDocument);
        }
    }
    function BsPreviewEntityFacetComponent_div_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r14_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 12);
            i0.ɵɵelementStart(1, "a", 13);
            i0.ɵɵlistener("click", function BsPreviewEntityFacetComponent_div_2_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r14_1); var ctx_r13 = i0.ɵɵnextContext(); return ctx_r13.showAll(); });
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(2, 2, "msg#preview.showAll"));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 4, "msg#preview.showAll"));
        }
    }
    var BsPreviewEntityFacetComponent = /** @class */ (function (_super) {
        __extends(BsPreviewEntityFacetComponent, _super);
        function BsPreviewEntityFacetComponent(appService) {
            var _this = _super.call(this) || this;
            _this.appService = appService;
            _this.itemsChecked = new i0.EventEmitter();
            _this.count = 10;
            _this.sortFreq = true;
            _this.hidden = new Map();
            _this.nav = new Map();
            /**
             * Unselect all entities (set hidden)
             */
            _this.unselectAll = function (action) {
                if (_this.previewDocument) {
                    _this.previewDocument.toggleHighlight(_this.entity, false);
                }
                _this.data.forEach(function (value) {
                    _this.hidden.set(value.value, true);
                });
                if (action) {
                    action.update();
                    _this.itemsChecked.next(false);
                }
            };
            /**
             * Select all entities (unset hidden)
             */
            _this.selectAll = function (action) {
                if (_this.previewDocument) {
                    _this.previewDocument.toggleHighlight(_this.entity, true);
                }
                _this.data.forEach(function (value) {
                    _this.hidden.set(value.value, false);
                });
                if (action) {
                    action.update();
                    _this.itemsChecked.next(true);
                }
            };
            _this.checkAction = new i4$1.Action({
                icon: "far fa-check-square",
                title: "msg#preview.highlightFilters.keepNone",
                action: _this.unselectAll,
                updater: function (action) {
                    var foundHidden = false;
                    var foundNotHidden = false;
                    _this.data.forEach(function (value) {
                        foundHidden = foundHidden || _this.hidden.get(value.value) || false;
                        foundNotHidden = foundNotHidden || !_this.hidden.get(value.value);
                    });
                    if (!foundHidden) { // All items selected
                        action.action = _this.unselectAll;
                        action.icon = "far fa-check-square";
                        action.title = "msg#preview.highlightFilters.keepNone";
                    }
                    else if (!foundNotHidden) { // All items unselected
                        action.action = _this.selectAll;
                        action.icon = "far fa-square";
                        action.title = "msg#preview.highlightFilters.keepAll";
                    }
                    else { // Some items selected
                        action.action = _this.selectAll;
                        action.icon = "far fa-check-square";
                        action.title = "msg#preview.highlightFilters.keepAll";
                    }
                }
            });
            _this.sortAlphaAction = new i4$1.Action({
                icon: "fas fa-sort-alpha-down",
                title: "msg#preview.sortAlphabetically",
                action: function () {
                    _this.sortFreq = false;
                }
            });
            _this.sortFreqAction = new i4$1.Action({
                icon: "fas fa-sort-amount-down",
                title: "msg#preview.sortFrequency",
                action: function () {
                    _this.sortFreq = true;
                }
            });
            return _this;
        }
        Object.defineProperty(BsPreviewEntityFacetComponent.prototype, "actions", {
            get: function () {
                var actions = [];
                if (this.previewDocument) {
                    actions.push(this.checkAction);
                }
                actions.push(this.sortFreq ? this.sortAlphaAction : this.sortFreqAction);
                return actions;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Uncheck items if needed
         */
        BsPreviewEntityFacetComponent.prototype.ngOnInit = function () {
            if (this.startUnchecked) {
                this.unselectAll();
                this.checkAction.update();
            }
            this.column = this.appService.getColumn(this.entity);
        };
        /**
         * Since the preview document comes after the preview data, we need to wait for that change
         * and apply the hidden state in the document.
         * @param changes
         */
        BsPreviewEntityFacetComponent.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if (changes["previewDocument"]) {
                if (this.previewDocument) {
                    this.data.forEach(function (val) {
                        if (_this.hidden.get(val.value)) {
                            _this.previewDocument.toggleHighlight(_this.entity, false, val.value);
                        }
                    });
                }
            }
        };
        Object.defineProperty(BsPreviewEntityFacetComponent.prototype, "entityValues", {
            /**
             * Returns the entities to be displayed in the facet, performing truncation and sorting of the input list
             */
            get: function () {
                var _this = this;
                return this.data.sort(function (a, b) {
                    var d = b.locations.length - a.locations.length;
                    return _this.sortFreq && d !== 0 ? d : a.displayValue.localeCompare(b.displayValue);
                }).slice(0, this.count);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Returns the number of occurrences of a given value.
         * If the user used the facet to navigate, the format is "i / count"
         * @param value
         */
        BsPreviewEntityFacetComponent.prototype.entityCount = function (value) {
            var count = value.locations.length + "";
            var navValue = this.nav.get(value.value);
            if (navValue !== undefined) {
                count = (navValue + 1) + " / " + count;
            }
            return count;
        };
        /**
         * Return whether the entity is hidden (unchecked) or not
         * @param value
         */
        BsPreviewEntityFacetComponent.prototype.entityHidden = function (value) {
            return !!this.hidden.get(value.value);
        };
        /**
         * Shows all the entities in the list
         */
        BsPreviewEntityFacetComponent.prototype.showAll = function () {
            this.count = this.data.length;
            return false;
        };
        /**
         * Toggles the hidden (checked/unchecked) state of a value in the list.
         * Modifies the provided preview document.
         * @param value
         */
        BsPreviewEntityFacetComponent.prototype.toggleEntity = function (value) {
            this.hidden.set(value.value, !this.hidden.get(value.value));
            if (this.previewDocument) {
                this.previewDocument.toggleHighlight(this.entity, !this.hidden.get(value.value), value.value);
            }
            this.checkAction.update();
        };
        /**
         * Navigate to the next value of this entity.
         * Modifies the provided preview document.
         * @param value
         */
        BsPreviewEntityFacetComponent.prototype.nextEntity = function (value) {
            var navValue = this.nav.get(value.value);
            if (navValue === undefined) {
                navValue = 0;
                this.nav.set(value.value, navValue);
            }
            else if (navValue < value.locations.length - 1) {
                navValue++;
                this.nav.set(value.value, navValue);
            }
            this.selectEntity(this.entity, value.value, navValue);
        };
        /**
         * Navigate to the next value of this entity.
         * Modifies the provided preview document.
         * @param value
         */
        BsPreviewEntityFacetComponent.prototype.prevEntity = function (value) {
            var navValue = this.nav.get(value.value);
            if (navValue === undefined) {
                navValue = 0;
                this.nav.set(value.value, navValue);
            }
            else if (navValue > 0) {
                navValue--;
                this.nav.set(value.value, navValue);
            }
            this.selectEntity(this.entity, value.value, navValue);
        };
        /**
         * Navigate to the given occurrence of an entity in a specific category
         * Modifies the provided preview document.
         * @param category
         * @param value
         * @param i
         */
        BsPreviewEntityFacetComponent.prototype.selectEntity = function (category, value, i) {
            var indexes = this.getEntityIndexes(category, value);
            this.previewDocument.selectHighlight(category, indexes[i]);
        };
        /**
         * Helper function to find the indexes of all occurrences of a entity value in the document
         * @param category
         * @param value
         */
        BsPreviewEntityFacetComponent.prototype.getEntityIndexes = function (category, value) {
            var e_1, _a, e_2, _b;
            var indexes = [];
            for (var i = 0; i < this.previewData.highlightsPerLocation['length']; i++) {
                var highlight = this.previewData.highlightsPerLocation[i];
                var categories = Object.keys(highlight.positionInCategories);
                try {
                    for (var categories_1 = (e_1 = void 0, __values(categories)), categories_1_1 = categories_1.next(); !categories_1_1.done; categories_1_1 = categories_1.next()) {
                        var currentCategory = categories_1_1.value;
                        if (currentCategory === category) {
                            try {
                                for (var _c = (e_2 = void 0, __values(highlight.values)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var highlightValue = _d.value;
                                    if (highlightValue === value) {
                                        indexes.push(highlight.positionInCategories[category]);
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (categories_1_1 && !categories_1_1.done && (_a = categories_1.return)) _a.call(categories_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return indexes;
        };
        return BsPreviewEntityFacetComponent;
    }(i4$2.AbstractFacet));
    BsPreviewEntityFacetComponent.ɵfac = function BsPreviewEntityFacetComponent_Factory(t) { return new (t || BsPreviewEntityFacetComponent)(i0.ɵɵdirectiveInject(i3$1.AppService)); };
    BsPreviewEntityFacetComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewEntityFacetComponent, selectors: [["sq-preview-entity-facet"]], inputs: { entity: "entity", data: "data", previewData: "previewData", previewDocument: "previewDocument", startUnchecked: "startUnchecked" }, outputs: { itemsChecked: "itemsChecked" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 3, vars: 2, consts: [[1, "list-group", "list-group-flush", "entity-facet"], ["class", "list-group-item align-items-center border-0 py-1 px-3 d-flex", 4, "ngFor", "ngForOf"], ["class", "list-group-item border-0 py-1 text-center", 4, "ngIf"], [1, "list-group-item", "align-items-center", "border-0", "py-1", "px-3", "d-flex"], [1, "text-muted", "px-1", "cursor-pointer", 3, "click"], [1, "far", 3, "ngClass"], [1, "mr-auto", "mx-1"], [1, "text-muted", "small", "mx-1"], ["class", "text-muted px-1 cursor-pointer", 3, "title", "click", 4, "ngIf"], [1, "text-muted", "px-1", "cursor-pointer", 3, "title", "click"], [1, "fas", "fa-chevron-left"], [1, "fas", "fa-chevron-right"], [1, "list-group-item", "border-0", "py-1", "text-center"], ["href", "#", 1, "text-muted", "small", 3, "title", "click"]], template: function BsPreviewEntityFacetComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtemplate(1, BsPreviewEntityFacetComponent_div_1_Template, 10, 11, "div", 1);
                i0.ɵɵtemplate(2, BsPreviewEntityFacetComponent_div_2_Template, 5, 6, "div", 2);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", ctx.entityValues);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.data.length > ctx.count);
            }
        }, directives: [i2.NgForOf, i2.NgIf, i2.NgClass], pipes: [i3$2.ValuePipe, i3.MessagePipe], styles: [".cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.entity-facet[_ngcontent-%COMP%]{font-size:.9em}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsPreviewEntityFacetComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-preview-entity-facet',
                        templateUrl: './preview-entity-facet.component.html',
                        styleUrls: ['./preview-entity-facet.component.scss']
                    }]
            }], function () { return [{ type: i3$1.AppService }]; }, { entity: [{
                    type: i0.Input
                }], data: [{
                    type: i0.Input
                }], previewData: [{
                    type: i0.Input
                }], previewDocument: [{
                    type: i0.Input
                }], startUnchecked: [{
                    type: i0.Input
                }], itemsChecked: [{
                    type: i0.Output
                }] });
    })();

    function BsPreviewEntityPanelComponent_ng_container_0_sq_facet_card_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r6_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "sq-facet-card", 2);
            i0.ɵɵelementStart(1, "sq-preview-entity-facet", 3, 4);
            i0.ɵɵlistener("itemsChecked", function BsPreviewEntityPanelComponent_ng_container_0_sq_facet_card_1_Template_sq_preview_entity_facet_itemsChecked_1_listener($event) { i0.ɵɵrestoreView(_r6_1); var entity_r1 = i0.ɵɵnextContext().$implicit; var ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.itemsChecked(entity_r1, $event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var entity_r1 = i0.ɵɵnextContext().$implicit;
            var ctx_r2 = i0.ɵɵnextContext();
            i0.ɵɵproperty("title", ctx_r2.entityDisplay(entity_r1))("icon", ctx_r2.entityIcon(entity_r1))("collapsible", ctx_r2.collapsible)("buttonsStyle", ctx_r2.style);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("entity", entity_r1)("data", ctx_r2.entityValues(entity_r1))("previewData", ctx_r2.previewData)("previewDocument", ctx_r2.previewDocument)("startUnchecked", ctx_r2.startUnchecked[entity_r1]);
        }
    }
    function BsPreviewEntityPanelComponent_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsPreviewEntityPanelComponent_ng_container_0_sq_facet_card_1_Template, 3, 9, "sq-facet-card", 1);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var entity_r1 = ctx.$implicit;
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.entityValues(entity_r1).length);
        }
    }
    var BsPreviewEntityPanelComponent = /** @class */ (function () {
        function BsPreviewEntityPanelComponent() {
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
            this.facetChecked = new i0.EventEmitter();
            this._entities = [];
        }
        /**
         * Extracts the list of entities from the preview data
         */
        BsPreviewEntityPanelComponent.prototype.ngOnChanges = function () {
            if (this.entities && !!this.previewData) { // If the list of entities is provided as input
                this._entities = this.entities;
            }
            else if (this.previewData) { // The list of entities is deduced from the preview data
                this._entities = Object.keys(this.previewData.highlightsPerCategory).filter(function (value) { return value !== "extractslocations"; });
            }
            else { // No entity to show
                this._entities = [];
            }
        };
        /**
         * Return the data for a specific entity category
         * @param entity
         */
        BsPreviewEntityPanelComponent.prototype.data = function (entity) {
            return this.previewData.highlightsPerCategory[entity];
        };
        /**
         * Returns the display value of a specific entity
         * @param entity
         */
        BsPreviewEntityPanelComponent.prototype.entityDisplay = function (entity) {
            return this.data(entity).categoryDisplayLabelPlural || this.data(entity).categoryDisplayLabel || entity;
        };
        /**
         * Returns the icon of a specific entity
         * @param entity
         */
        BsPreviewEntityPanelComponent.prototype.entityIcon = function (entity) {
            return "sq-icon-" + entity;
        };
        /**
         * Returns the list of values of a specific entity
         * @param entity
         */
        BsPreviewEntityPanelComponent.prototype.entityValues = function (entity) {
            return this.data(entity).values;
        };
        /**
         * Called by child facet when items are checked/unchecked
         * @param entity
         * @param checked
         */
        BsPreviewEntityPanelComponent.prototype.itemsChecked = function (entity, checked) {
            this.facetChecked.next({ entity: entity, checked: checked });
        };
        return BsPreviewEntityPanelComponent;
    }());
    BsPreviewEntityPanelComponent.ɵfac = function BsPreviewEntityPanelComponent_Factory(t) { return new (t || BsPreviewEntityPanelComponent)(); };
    BsPreviewEntityPanelComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewEntityPanelComponent, selectors: [["sq-preview-entity-panel"]], inputs: { previewData: "previewData", previewDocument: "previewDocument", style: "style", collapsible: "collapsible", startUnchecked: "startUnchecked", entities: "entities" }, outputs: { facetChecked: "facetChecked" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[4, "ngFor", "ngForOf"], ["class", "d-block my-3", 3, "title", "icon", "collapsible", "buttonsStyle", 4, "ngIf"], [1, "d-block", "my-3", 3, "title", "icon", "collapsible", "buttonsStyle"], [3, "entity", "data", "previewData", "previewDocument", "startUnchecked", "itemsChecked"], ["facet", ""]], template: function BsPreviewEntityPanelComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsPreviewEntityPanelComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngForOf", ctx._entities);
            }
        }, directives: [i2.NgForOf, i2.NgIf, i4$2.BsFacetCard, BsPreviewEntityFacetComponent], styles: [""] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsPreviewEntityPanelComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-preview-entity-panel',
                        templateUrl: './preview-entity-panel.component.html',
                        styleUrls: ['./preview-entity-panel.component.scss']
                    }]
            }], function () { return []; }, { previewData: [{
                    type: i0.Input
                }], previewDocument: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], collapsible: [{
                    type: i0.Input
                }], startUnchecked: [{
                    type: i0.Input
                }], entities: [{
                    type: i0.Input
                }], facetChecked: [{
                    type: i0.Output
                }] });
    })();

    var _c0$5 = ["scrollViewport"];
    var _c1$2 = function (a0) { return [a0]; };
    var _c2$2 = function (a0) { return { items: a0, autoAdjust: true }; };
    function BsPreviewExtractsPanelComponent_ng_container_0_div_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r8_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 6);
            i0.ɵɵelementStart(1, "button", 7);
            i0.ɵɵlistener("click", function BsPreviewExtractsPanelComponent_ng_container_0_div_1_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r8_1); var ctx_r7 = i0.ɵɵnextContext(2); return ctx_r7.previousExtract(); });
            i0.ɵɵelement(2, "i", 8);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "div", 9);
            i0.ɵɵelementStart(6, "button", 10);
            i0.ɵɵlistener("click", function BsPreviewExtractsPanelComponent_ng_container_0_div_1_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r8_1); var ctx_r9 = i0.ɵɵnextContext(2); return ctx_r9.nextExtract(); });
            i0.ɵɵtext(7);
            i0.ɵɵpipe(8, "sqMessage");
            i0.ɵɵelement(9, "i", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("disabled", ctx_r2.currentIndex < 1);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("\u00A0", i0.ɵɵpipeBind1(4, 5, "msg#preview.previousDocument"), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction1(11, _c2$2, i0.ɵɵpureFunction1(9, _c1$2, ctx_r2.sortAction)));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("disabled", ctx_r2.currentIndex >= ctx_r2.extracts.length - 1);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(8, 7, "msg#preview.nextDocument"), "\u00A0");
        }
    }
    function BsPreviewExtractsPanelComponent_ng_container_0_div_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 12);
            i0.ɵɵelement(1, "div", 13);
            i0.ɵɵelementEnd();
        }
    }
    function BsPreviewExtractsPanelComponent_ng_container_0_div_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 14);
            i0.ɵɵelementStart(1, "span");
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "msg#preview.noextract"));
        }
    }
    var _c3$1 = function (a0) { return { "active": a0 }; };
    function BsPreviewExtractsPanelComponent_ng_container_0_ng_template_4_div_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r15_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 18);
            i0.ɵɵelementStart(1, "a", 19);
            i0.ɵɵlistener("click", function BsPreviewExtractsPanelComponent_ng_container_0_ng_template_4_div_2_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r15_1); var extract_r12 = ctx.$implicit; var i_r13 = ctx.index; var ctx_r14 = i0.ɵɵnextContext(3); return ctx_r14.scrollExtract(extract_r12, i_r13); });
            i0.ɵɵelement(2, "p", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var extract_r12 = ctx.$implicit;
            var i_r13 = ctx.index;
            var ctx_r11 = i0.ɵɵnextContext(3);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c3$1, i_r13 === ctx_r11.currentIndex));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("innerHTML", extract_r12.text, i0.ɵɵsanitizeHtml);
        }
    }
    function BsPreviewExtractsPanelComponent_ng_container_0_ng_template_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "cdk-virtual-scroll-viewport", 15, 16);
            i0.ɵɵtemplate(2, BsPreviewExtractsPanelComponent_ng_container_0_ng_template_4_div_2_Template, 3, 4, "div", 17);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r6 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("itemSize", 64);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("cdkVirtualForOf", ctx_r6.extracts);
        }
    }
    function BsPreviewExtractsPanelComponent_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsPreviewExtractsPanelComponent_ng_container_0_div_1_Template, 10, 13, "div", 2);
            i0.ɵɵtemplate(2, BsPreviewExtractsPanelComponent_ng_container_0_div_2_Template, 2, 0, "div", 3);
            i0.ɵɵtemplate(3, BsPreviewExtractsPanelComponent_ng_container_0_div_3_Template, 4, 3, "div", 4);
            i0.ɵɵtemplate(4, BsPreviewExtractsPanelComponent_ng_container_0_ng_template_4_Template, 3, 2, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var _r5 = i0.ɵɵreference(5);
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx_r0.extracts == null ? null : ctx_r0.extracts.length) > 0);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.loading);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r0.loading && (ctx_r0.extracts == null ? null : ctx_r0.extracts.length) === 0)("ngIfElse", _r5);
        }
    }
    function BsPreviewExtractsPanelComponent_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 21);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#preview.loading"), "\n");
        }
    }
    var Extract = /** @class */ (function () {
        function Extract() {
        }
        return Extract;
    }());
    var BsPreviewExtractsPanelComponent = /** @class */ (function () {
        function BsPreviewExtractsPanelComponent(document, previewService, cdr, domSanitizer) {
            this.previewService = previewService;
            this.cdr = cdr;
            this.domSanitizer = domSanitizer;
            this.style = "light";
            this.extracts = [];
            this.currentIndex = -1;
            this.loading = false;
        }
        BsPreviewExtractsPanelComponent.prototype.ngOnDestroy = function () {
            if (this.loadCompleteSubscription) {
                this.loadCompleteSubscription.unsubscribe();
            }
        };
        /**
         * Extracts the list of extracts from the preview document
         */
        BsPreviewExtractsPanelComponent.prototype.ngOnChanges = function (changes) {
            var _this = this;
            var _a, _b;
            this.extracts = [];
            if (this.previewData && this.previewDocument) {
                var extracts = (_a = this.previewData.highlightsPerCategory["extractslocations"]) === null || _a === void 0 ? void 0 : _a.values; //Extract locations Array ordered by "relevance"
                if (!!extracts && extracts.length > 0) {
                    this.extractAll(extracts, this.previewDocument);
                    return;
                }
            }
            if (this.previewData && this.downloadUrl) {
                var extracts_1 = (_b = this.previewData.highlightsPerCategory["extractslocations"]) === null || _b === void 0 ? void 0 : _b.values; //Extract locations Array ordered by "relevance"
                if (!!extracts_1 && extracts_1.length > 0) {
                    this.loading = true;
                    if (this.previewDocument) {
                        this.extractAll(extracts_1, this.previewDocument);
                    }
                    else {
                        this.previewService.getHtmlPreview(this.downloadUrl)
                            .subscribe(function (value) {
                            var previewDocument = _this.createDocument(value);
                            _this.extractAll(extracts_1, previewDocument);
                        });
                    }
                }
            }
        };
        BsPreviewExtractsPanelComponent.prototype.createDocument = function (value) {
            var doc = document.implementation.createHTMLDocument("");
            doc.write(value);
            doc.close();
            var previewDocument = new PreviewDocument(doc);
            var count = previewDocument.document.querySelectorAll("[id^='extractslocations']").length;
            if (count === 0 && this.previewDocument) {
                // use previous document to retrieve extracts
                previewDocument = this.previewDocument;
            }
            return previewDocument;
        };
        BsPreviewExtractsPanelComponent.prototype.extractAll = function (extracts, previewDocument) {
            var _this = this;
            // Init the extracts Array and storing the relevancy index = i because extractsLocations is already ordered by relevance
            // but extract's text is sort by "start", that why text is set to empty here
            this.extracts = extracts[0].locations.map(function (el, i) { return ({
                text: "",
                startIndex: el.start,
                relevanceIndex: i,
                textIndex: 0
            }); });
            // next sort the array by startIndex to extract the correct extract's text
            // and set the textIndex
            this.extracts.sort(function (a, b) { return a.startIndex - b.startIndex; }) // Sorting by start index (text index)
                .forEach(function (el, i) {
                el.text = _this.sanitize(previewDocument.getHighlightText("extractslocations", i)); // get the text
                el.textIndex = i; // Storing the TextIndex to be able to select extracts
            });
            // do not take item without text
            this.extracts = this.extracts.filter(function (el) { return el.text !== ''; });
            // finally sort extracts by relevance
            this.extracts.sort(function (a, b) { return a.relevanceIndex - b.relevanceIndex; });
            this.buildSortAction();
            this.loading = false;
            this.currentIndex = -1;
            this.cdr.detectChanges();
        };
        /**
         * Build Sort Action for Extracts
         * @param i
         */
        BsPreviewExtractsPanelComponent.prototype.buildSortAction = function () {
            var _this = this;
            this.sortAction = new i4$1.Action({
                title: "msg#sortSelector.sortByTitle",
                text: "msg#preview.relevanceSortHighlightButtonText",
                children: [
                    new i4$1.Action({
                        icon: 'fas fa-sort-amount-down',
                        text: "msg#preview.relevanceSortHighlightButtonText",
                        action: function (item, event) {
                            // return a new map to re-render the collection
                            _this.extracts = _this.extracts.map(function (el) { return el; }).sort(function (a, b) { return a.relevanceIndex - b.relevanceIndex; });
                            _this.sortAction.text = item.text;
                            _this.currentIndex = -1;
                        }
                    }),
                    new i4$1.Action({
                        icon: 'fas fa-sort-amount-down',
                        text: "msg#preview.textOrderSortHighlightButtonText",
                        action: function (item, event) {
                            // return a new map to re-render the collection
                            _this.extracts = _this.extracts.map(function (el) { return el; }).sort(function (a, b) { return a.textIndex - b.textIndex; });
                            _this.sortAction.text = item.text;
                            _this.currentIndex = -1;
                        }
                    })
                ]
            });
        };
        /**
         * Scroll to a specific extract
         * @param i
         */
        BsPreviewExtractsPanelComponent.prototype.scrollExtract = function (extract, index) {
            if (index !== undefined) {
                this.currentIndex = index;
            }
            if (this.previewDocument) {
                // extracts are always at textIndex position whatever the sort
                this.previewDocument.selectHighlight("extractslocations", extract.textIndex);
            }
            return false;
        };
        /**
         * Sanitize the text of a HTML formatted extract
         * @param text
         */
        BsPreviewExtractsPanelComponent.prototype.sanitize = function (text) {
            return text !== "" ? this.domSanitizer.bypassSecurityTrustHtml(text.replace(/sq\-current/, "")) : "";
        };
        /**
         * Select the previous extract in the list
         */
        BsPreviewExtractsPanelComponent.prototype.previousExtract = function () {
            this.currentIndex--;
            this.scrollTo();
        };
        /**
         * Select the next extract in the list
         */
        BsPreviewExtractsPanelComponent.prototype.nextExtract = function () {
            this.currentIndex++;
            this.scrollTo();
        };
        BsPreviewExtractsPanelComponent.prototype.scrollTo = function () {
            this.cdkScrollViewport.scrollToIndex(this.currentIndex);
            var extract = this.extracts[this.currentIndex];
            this.scrollExtract(extract);
        };
        return BsPreviewExtractsPanelComponent;
    }());
    BsPreviewExtractsPanelComponent.ɵfac = function BsPreviewExtractsPanelComponent_Factory(t) { return new (t || BsPreviewExtractsPanelComponent)(i0.ɵɵdirectiveInject(i2.DOCUMENT), i0.ɵɵdirectiveInject(PreviewService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.DomSanitizer)); };
    BsPreviewExtractsPanelComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewExtractsPanelComponent, selectors: [["sq-preview-extracts-panel"]], viewQuery: function BsPreviewExtractsPanelComponent_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵviewQuery(_c0$5, true);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.cdkScrollViewport = _t.first);
            }
        }, inputs: { previewData: "previewData", previewDocument: "previewDocument", downloadUrl: "downloadUrl", style: "style" }, features: [i0.ɵɵNgOnChangesFeature], decls: 2, vars: 2, consts: [[4, "ngIf"], ["class", "text-center", 4, "ngIf"], ["class", "d-flex justify-content-between p-2", 4, "ngIf"], ["class", "d-flex justify-content-center align-items-center h-100", 4, "ngIf"], ["class", "text-center text-muted", 4, "ngIf", "ngIfElse"], ["extractsTpl", ""], [1, "d-flex", "justify-content-between", "p-2"], [1, "btn", "btn-light", 3, "disabled", "click"], [1, "fas", "fa-arrow-left"], [1, "btn-group", 3, "sq-action-buttons"], [1, "btn", "btn-light", "float-right", 3, "disabled", "click"], [1, "fas", "fa-arrow-right"], [1, "d-flex", "justify-content-center", "align-items-center", "h-100"], ["role", "status", 1, "spinner-grow"], [1, "text-center", "text-muted"], [2, "height", "100%", 3, "itemSize"], ["scrollViewport", ""], ["class", "pl-2 pr-2", 4, "cdkVirtualFor", "cdkVirtualForOf"], [1, "pl-2", "pr-2"], ["href", "#", 1, "card", "my-1", "list-group-item-action", 3, "ngClass", "click"], [1, "card-body", "m-0", 3, "innerHTML"], [1, "text-center"]], template: function BsPreviewExtractsPanelComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsPreviewExtractsPanelComponent_ng_container_0_Template, 6, 4, "ng-container", 0);
                i0.ɵɵtemplate(1, BsPreviewExtractsPanelComponent_div_1_Template, 3, 3, "div", 1);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.previewData);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", !ctx.previewData);
            }
        }, directives: [i2.NgIf, i4$1.BsActionButtons, i5$2.CdkVirtualScrollViewport, i5$2.CdkFixedSizeVirtualScroll, i5$2.CdkVirtualForOf, i2.NgClass], pipes: [i3.MessagePipe], styles: ["[_nghost-%COMP%]     .cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{max-width:100%;min-width:100%}.spinner-grow[_ngcontent-%COMP%]{height:3rem;width:3rem}.active[_ngcontent-%COMP%]{background-color:#f8f9fa}.dark[_nghost-%COMP%]   .active[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .active[_ngcontent-%COMP%]{background-color:#e9ecef;color:#768883}"], changeDetection: 0 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsPreviewExtractsPanelComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-preview-extracts-panel',
                        templateUrl: './preview-extracts-panel.component.html',
                        styleUrls: ['./preview-extracts-panel.component.scss'],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], function () {
            return [{ type: Document, decorators: [{
                            type: i0.Inject,
                            args: [i2.DOCUMENT]
                        }] }, { type: PreviewService }, { type: i0.ChangeDetectorRef }, { type: i1.DomSanitizer }];
        }, { previewData: [{
                    type: i0.Input
                }], previewDocument: [{
                    type: i0.Input
                }], downloadUrl: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], cdkScrollViewport: [{
                    type: i0.ViewChild,
                    args: ["scrollViewport"]
                }] });
    })();

    var BsPreviewSearchFormComponent = /** @class */ (function () {
        function BsPreviewSearchFormComponent(formBuilder) {
            this.formBuilder = formBuilder;
            this.searchText = new i0.EventEmitter();
            this.searchControl = new i1$3.FormControl('');
            this.form = this.formBuilder.group({
                search: this.searchControl
            });
        }
        /**
         * Updates the text of the search form when the query changes
         */
        BsPreviewSearchFormComponent.prototype.ngOnChanges = function () {
            this.searchControl.setValue((!this.query || !this.query.text) ? "" : this.query.text);
        };
        /**
         * Emits an event for the parent component to search this next text
         */
        BsPreviewSearchFormComponent.prototype.search = function () {
            this.searchText.next(this.searchControl.value || "");
        };
        return BsPreviewSearchFormComponent;
    }());
    BsPreviewSearchFormComponent.ɵfac = function BsPreviewSearchFormComponent_Factory(t) { return new (t || BsPreviewSearchFormComponent)(i0.ɵɵdirectiveInject(i1$3.FormBuilder)); };
    BsPreviewSearchFormComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewSearchFormComponent, selectors: [["sq-preview-search-form"]], inputs: { query: "query" }, outputs: { searchText: "searchText" }, features: [i0.ɵɵNgOnChangesFeature], decls: 12, vars: 10, consts: [["novalidate", "", 3, "formGroup"], [1, "input-group", "mb-3"], [1, "input-group-prepend"], ["for", "search-input", 1, "input-group-text"], ["id", "search-input", "type", "text", "formControlName", "search", "sqAutofocus", "", 1, "form-control", 3, "placeholder"], [1, "input-group-append"], ["type", "submit", 1, "btn", "btn-primary", 3, "title", "click"], [1, "fas", "fa-fw", "fa-search"]], template: function BsPreviewSearchFormComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "form", 0);
                i0.ɵɵelementStart(1, "div", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵelementStart(3, "label", 3);
                i0.ɵɵtext(4);
                i0.ɵɵpipe(5, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelement(6, "input", 4);
                i0.ɵɵpipe(7, "sqMessage");
                i0.ɵɵelementStart(8, "div", 5);
                i0.ɵɵelementStart(9, "button", 6);
                i0.ɵɵlistener("click", function BsPreviewSearchFormComponent_Template_button_click_9_listener() { return ctx.search(); });
                i0.ɵɵpipe(10, "sqMessage");
                i0.ɵɵelement(11, "i", 7);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("formGroup", ctx.form);
                i0.ɵɵadvance(4);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 4, "msg#preview.search"));
                i0.ɵɵadvance(2);
                i0.ɵɵpropertyInterpolate("placeholder", i0.ɵɵpipeBind1(7, 6, "msg#searchForm.searchFor"));
                i0.ɵɵadvance(3);
                i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(10, 8, "msg#searchForm.search"));
            }
        }, directives: [i1$3.ɵangular_packages_forms_forms_y, i1$3.NgControlStatusGroup, i1$3.FormGroupDirective, i1$3.DefaultValueAccessor, i1$3.NgControlStatus, i1$3.FormControlName, i3$2.Autofocus], pipes: [i3.MessagePipe], styles: [""] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsPreviewSearchFormComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-preview-search-form',
                        templateUrl: './preview-search-form.component.html',
                        styleUrls: ['./preview-search-form.component.scss']
                    }]
            }], function () { return [{ type: i1$3.FormBuilder }]; }, { query: [{
                    type: i0.Input
                }], searchText: [{
                    type: i0.Output
                }] });
    })();

    var _c0$6 = ["currentPageEl"];
    function BsPreviewPagesPanelComponent_div_0_a_1_div_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 8);
            i0.ɵɵelement(1, "div", 9);
            i0.ɵɵelementEnd();
        }
    }
    var _c1$3 = function () { return { page: 1 }; };
    var _c2$3 = function (a0) { return { values: a0 }; };
    function BsPreviewPagesPanelComponent_div_0_a_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r5_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 4);
            i0.ɵɵlistener("click", function BsPreviewPagesPanelComponent_div_0_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r5_1); var ctx_r4 = i0.ɵɵnextContext(2); return ctx_r4.selectPage(1); });
            i0.ɵɵelementStart(1, "div", 5);
            i0.ɵɵelementStart(2, "span", 6);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, BsPreviewPagesPanelComponent_div_0_a_1_div_5_Template, 2, 0, "div", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 2, "msg#preview.page", i0.ɵɵpureFunction1(6, _c2$3, i0.ɵɵpureFunction0(5, _c1$3))));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r1._pendingPage === 1);
        }
    }
    function BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_p_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "p", 12);
        }
        if (rf & 2) {
            var page_r6 = i0.ɵɵnextContext(2).$implicit;
            i0.ɵɵproperty("innerHTML", page_r6.relevantExtracts, i0.ɵɵsanitizeHtml);
        }
    }
    function BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_div_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 8);
            i0.ɵɵelement(1, "div", 9);
            i0.ɵɵelementEnd();
        }
    }
    var _c3$2 = function (a0) { return { page: a0 }; };
    function BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r14_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 4);
            i0.ɵɵlistener("click", function BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r14_1); var page_r6 = i0.ɵɵnextContext().$implicit; var ctx_r12 = i0.ɵɵnextContext(2); return ctx_r12.selectPage(page_r6.$page); });
            i0.ɵɵelementStart(1, "div", 5);
            i0.ɵɵelementStart(2, "span", 6);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_p_5_Template, 1, 1, "p", 11);
            i0.ɵɵtemplate(6, BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_div_6_Template, 2, 0, "div", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var page_r6 = i0.ɵɵnextContext().$implicit;
            var ctx_r7 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 3, "msg#preview.page", i0.ɵɵpureFunction1(8, _c2$3, i0.ɵɵpureFunction1(6, _c3$2, page_r6.$page))));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r7._pendingPage !== page_r6.$page);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r7._pendingPage === page_r6.$page);
        }
    }
    function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_1_div_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 8);
            i0.ɵɵelement(1, "div", 9);
            i0.ɵɵelementEnd();
        }
    }
    function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r22_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 4);
            i0.ɵɵlistener("click", function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r22_1); var ctx_r21 = i0.ɵɵnextContext(4); return ctx_r21.selectPrevious(); });
            i0.ɵɵelementStart(1, "div", 5);
            i0.ɵɵelementStart(2, "span", 6);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵpipe(5, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_1_div_6_Template, 2, 0, "div", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r16 = i0.ɵɵnextContext(4);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(4, 3, "msg#preview.page", i0.ɵɵpureFunction1(10, _c2$3, i0.ɵɵpureFunction1(8, _c3$2, ctx_r16.currentPage - 1))), " (", i0.ɵɵpipeBind1(5, 6, "msg#preview.previousDocument"), ")");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx_r16._pendingPage === ctx_r16.currentPage - 1);
        }
    }
    function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_sq_preview_extracts_panel_9_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "sq-preview-extracts-panel", 18);
        }
        if (rf & 2) {
            var ctx_r18 = i0.ɵɵnextContext(4);
            i0.ɵɵstyleMap(ctx_r18.style);
            i0.ɵɵproperty("previewData", ctx_r18.previewData)("previewDocument", ctx_r18.previewDocument);
        }
    }
    function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_10_div_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 8);
            i0.ɵɵelement(1, "div", 9);
            i0.ɵɵelementEnd();
        }
    }
    function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_10_Template(rf, ctx) {
        if (rf & 1) {
            var _r25_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 4);
            i0.ɵɵlistener("click", function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_10_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r25_1); var ctx_r24 = i0.ɵɵnextContext(4); return ctx_r24.selectNext(); });
            i0.ɵɵelementStart(1, "div", 5);
            i0.ɵɵelementStart(2, "span", 6);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵpipe(5, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_10_div_6_Template, 2, 0, "div", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r19 = i0.ɵɵnextContext(4);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(4, 3, "msg#preview.page", i0.ɵɵpureFunction1(10, _c2$3, i0.ɵɵpureFunction1(8, _c3$2, ctx_r19.currentPage + 1))), " (", i0.ɵɵpipeBind1(5, 6, "msg#preview.nextDocument"), ")");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx_r19._pendingPage === ctx_r19.currentPage + 1);
        }
    }
    function BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_1_Template, 7, 12, "a", 2);
            i0.ɵɵelementStart(2, "div", 13, 14);
            i0.ɵɵelementStart(4, "div", 15);
            i0.ɵɵelementStart(5, "span", 16);
            i0.ɵɵtext(6);
            i0.ɵɵpipe(7, "sqMessage");
            i0.ɵɵpipe(8, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(9, BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_sq_preview_extracts_panel_9_Template, 1, 4, "sq-preview-extracts-panel", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(10, BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_a_10_Template, 7, 12, "a", 2);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r8 = i0.ɵɵnextContext(3);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r8.hasPrevious);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(7, 5, "msg#preview.page", i0.ɵɵpureFunction1(12, _c2$3, i0.ɵɵpureFunction1(10, _c3$2, ctx_r8.currentPage))), " (", i0.ɵɵpipeBind1(8, 8, "msg#preview.current"), ")");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", !ctx_r8._pendingPreviewDocument);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r8.hasNext);
        }
    }
    function BsPreviewPagesPanelComponent_div_0_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsPreviewPagesPanelComponent_div_0_ng_container_2_a_1_Template, 7, 10, "a", 2);
            i0.ɵɵtemplate(2, BsPreviewPagesPanelComponent_div_0_ng_container_2_ng_container_2_Template, 11, 14, "ng-container", 10);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var page_r6 = ctx.$implicit;
            var ctx_r2 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r2.currentPage !== page_r6.$page);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r2.currentPage === page_r6.$page);
        }
    }
    function BsPreviewPagesPanelComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵtemplate(1, BsPreviewPagesPanelComponent_div_0_a_1_Template, 6, 8, "a", 2);
            i0.ɵɵtemplate(2, BsPreviewPagesPanelComponent_div_0_ng_container_2_Template, 3, 2, "ng-container", 3);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r0.hasFirst);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r0.sortedPages);
        }
    }
    var BsPreviewPagesPanelComponent = /** @class */ (function () {
        function BsPreviewPagesPanelComponent(previewService) {
            this.previewService = previewService;
            this.style = "light";
            this.gotopage = new i0.EventEmitter();
            this._pendingPreviewDocument = true;
            this._pendingPages = true;
        }
        BsPreviewPagesPanelComponent.prototype.ngOnChanges = function (changes) {
            var _this = this;
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
                    this.sortedPages.forEach(function (record) {
                        _this.previewService.getPageNumber(record);
                        if (!record.$page) {
                            throw new Error("Record is not page... " + record.id);
                        }
                    });
                    // Insert current page if missing (possible when navigating to previous/next page)
                    if (!this.sortedPages.find(function (page) { return page.$page === _this.currentPage; })) {
                        this.sortedPages.push(this.previewData.record);
                    }
                    // Sort the pages
                    this.sortedPages.sort(function (a, b) { return a.$page - b.$page; });
                    // Update current page neighbours
                    this.hasFirst = !!this.sortedPages.find(function (page) { return page.$page === 1 || _this.currentPage === 2; }); // include 2nd page, because is covered by the previous page below
                    this.hasPrevious = this.currentPage === 1 || !!this.sortedPages.find(function (page) { return page.$page === _this.currentPage - 1; });
                    this.hasNext = !!this.sortedPages.find(function (page) { return page.$page === _this.currentPage + 1; });
                }
                // SetTimeout is needed to scroll only after the DOM changes
                setTimeout(function () {
                    var _a, _b;
                    (_b = (_a = _this.currentPageEl) === null || _a === void 0 ? void 0 : _a.first) === null || _b === void 0 ? void 0 : _b.nativeElement.scrollIntoView({ behaviour: "smooth", block: "start" });
                });
            }
        };
        BsPreviewPagesPanelComponent.prototype.selectPage = function (page) {
            this.gotopage.next(page);
            this._pendingPage = page;
            return false;
        };
        BsPreviewPagesPanelComponent.prototype.selectPrevious = function () {
            return this.selectPage(this.currentPage - 1);
        };
        BsPreviewPagesPanelComponent.prototype.selectNext = function () {
            return this.selectPage(this.currentPage + 1);
        };
        return BsPreviewPagesPanelComponent;
    }());
    BsPreviewPagesPanelComponent.ɵfac = function BsPreviewPagesPanelComponent_Factory(t) { return new (t || BsPreviewPagesPanelComponent)(i0.ɵɵdirectiveInject(PreviewService)); };
    BsPreviewPagesPanelComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewPagesPanelComponent, selectors: [["sq-preview-pages-panel"]], viewQuery: function BsPreviewPagesPanelComponent_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵviewQuery(_c0$6, true, i0.ElementRef);
            }
            if (rf & 2) {
                var _t = void 0;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.currentPageEl = _t);
            }
        }, inputs: { pages: "pages", previewData: "previewData", previewDocument: "previewDocument", style: "style" }, outputs: { gotopage: "gotopage" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "list-group", 4, "ngIf"], [1, "list-group"], ["href", "#", "class", "card my-1 list-group-item-action", 3, "click", 4, "ngIf"], [4, "ngFor", "ngForOf"], ["href", "#", 1, "card", "my-1", "list-group-item-action", 3, "click"], [1, "card-body"], [1, "small", "text-muted"], ["class", "text-center my-3", 4, "ngIf"], [1, "text-center", "my-3"], ["role", "status", 1, "spinner-grow"], [4, "ngIf"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML"], [1, "card", "my-1"], ["currentPageEl", ""], [1, "card-body", "m-0"], [1, "small", "font-weight-bold", "mb-1"], ["class", "d-flex flex-column", "style", "height: 300px;", 3, "previewData", "previewDocument", "style", 4, "ngIf"], [1, "d-flex", "flex-column", 2, "height", "300px", 3, "previewData", "previewDocument"]], template: function BsPreviewPagesPanelComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsPreviewPagesPanelComponent_div_0_Template, 3, 2, "div", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.sortedPages);
            }
        }, directives: [i2.NgIf, i2.NgForOf, BsPreviewExtractsPanelComponent], pipes: [i3.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsPreviewPagesPanelComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-preview-pages-panel',
                        templateUrl: './preview-pages-panel.component.html'
                    }]
            }], function () { return [{ type: PreviewService }]; }, { pages: [{
                    type: i0.Input
                }], previewData: [{
                    type: i0.Input
                }], previewDocument: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], gotopage: [{
                    type: i0.Output
                }], currentPageEl: [{
                    type: i0.ViewChildren,
                    args: ['currentPageEl', { read: i0.ElementRef }]
                }] });
    })();

    var _c0$7 = function (a0) { return { form: a0, controlName: "page" }; };
    function BsPreviewPageFormComponent_form_0_Template(rf, ctx) {
        if (rf & 1) {
            var _r2_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "form", 1);
            i0.ɵɵelementStart(1, "div", 2);
            i0.ɵɵelementStart(2, "div", 3);
            i0.ɵɵelementStart(3, "label", 4);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelement(6, "input", 5);
            i0.ɵɵelementStart(7, "div", 6);
            i0.ɵɵelementStart(8, "button", 7);
            i0.ɵɵlistener("click", function BsPreviewPageFormComponent_form_0_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r2_1); var ctx_r1 = i0.ɵɵnextContext(); return ctx_r1.submit(); });
            i0.ɵɵelement(9, "i", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("formGroup", ctx_r0.form);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("sqValidation", i0.ɵɵpureFunction1(5, _c0$7, ctx_r0.form));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 3, "msg#preview.gotopage"));
        }
    }
    var BsPreviewPageFormComponent = /** @class */ (function () {
        function BsPreviewPageFormComponent(formBuilder, validationService) {
            this.gotopage = new i0.EventEmitter();
            this.pageControl = new i1$3.FormControl('', [validationService.integerValidator(), validationService.minValidator(1)]);
            this.form = formBuilder.group({
                page: this.pageControl
            });
        }
        BsPreviewPageFormComponent.prototype.ngOnChanges = function () {
            this.pageControl.setValue(this.pageNumber);
        };
        BsPreviewPageFormComponent.prototype.submit = function () {
            var page = parseInt(this.pageControl.value, 10);
            if (!isNaN(page) && page !== this.pageNumber) {
                // remember the page number submitted
                // this allow us to submit again the previous page 
                // when page not exists and/or an error is triggered
                this.pageNumber = page;
                this.gotopage.next(page);
            }
        };
        return BsPreviewPageFormComponent;
    }());
    BsPreviewPageFormComponent.ɵfac = function BsPreviewPageFormComponent_Factory(t) { return new (t || BsPreviewPageFormComponent)(i0.ɵɵdirectiveInject(i1$3.FormBuilder), i0.ɵɵdirectiveInject(i2$2.ValidationService)); };
    BsPreviewPageFormComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewPageFormComponent, selectors: [["sq-preview-page-form"]], inputs: { pageNumber: "pageNumber" }, outputs: { gotopage: "gotopage" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["novalidate", "", "class", "mb-2", 3, "formGroup", 4, "ngIf"], ["novalidate", "", 1, "mb-2", 3, "formGroup"], [1, "input-group", "mb-1", 3, "sqValidation"], [1, "input-group-prepend"], ["for", "page-input", 1, "input-group-text"], ["id", "page-input", "type", "text", "placeholder", "page", "formControlName", "page", "autocomplete", "off", "spellcheck", "off", 1, "form-control"], [1, "input-group-append"], ["type", "submit", 1, "btn", "btn-primary", 3, "click"], [1, "fas", "fa-fw", "fa-arrow-right"]], template: function BsPreviewPageFormComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsPreviewPageFormComponent_form_0_Template, 10, 7, "form", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.pageNumber);
            }
        }, directives: [i2.NgIf, i1$3.ɵangular_packages_forms_forms_y, i1$3.NgControlStatusGroup, i1$3.FormGroupDirective, i2$2.ValidationDirective, i1$3.DefaultValueAccessor, i1$3.NgControlStatus, i1$3.FormControlName], pipes: [i3.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsPreviewPageFormComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-preview-page-form',
                        templateUrl: './preview-page-form.component.html'
                    }]
            }], function () { return [{ type: i1$3.FormBuilder }, { type: i2$2.ValidationService }]; }, { pageNumber: [{
                    type: i0.Input
                }], gotopage: [{
                    type: i0.Output
                }] });
    })();

    var BsPreviewModule = /** @class */ (function () {
        function BsPreviewModule() {
        }
        return BsPreviewModule;
    }());
    BsPreviewModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsPreviewModule });
    BsPreviewModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsPreviewModule_Factory(t) { return new (t || BsPreviewModule)(); }, providers: [
            { provide: PREVIEW_MODAL, useValue: BsPreviewPopup }
        ], imports: [[
                i2.CommonModule,
                i1$3.FormsModule, i1$3.ReactiveFormsModule,
                i5$2.ScrollingModule,
                i3.IntlModule,
                i2$1.WebServicesModule,
                i2$2.ValidationModule,
                i3$2.UtilsModule,
                collapse.CollapseModule,
                i5$1.MetadataModule,
                i4$3.BsModalModule,
                i4$2.BsFacetModule,
                i5.ResultModule,
                i4$1.BsActionModule,
                PreviewModule
            ], PreviewModule] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsPreviewModule, { declarations: [BsPreviewHighlights, BsPreviewLinks,
                BsPreviewPopup, BsPreviewPanel, BsResultLinkPreview,
                BsFacetPreview, BsFacetPreviewComponent2,
                BsSimilarDocuments,
                BsPreviewEntityFacetComponent,
                BsPreviewEntityPanelComponent,
                BsPreviewExtractsPanelComponent,
                BsPreviewSearchFormComponent,
                BsPreviewPagesPanelComponent,
                BsPreviewPageFormComponent], imports: [i2.CommonModule,
                i1$3.FormsModule, i1$3.ReactiveFormsModule,
                i5$2.ScrollingModule,
                i3.IntlModule,
                i2$1.WebServicesModule,
                i2$2.ValidationModule,
                i3$2.UtilsModule,
                collapse.CollapseModule,
                i5$1.MetadataModule,
                i4$3.BsModalModule,
                i4$2.BsFacetModule,
                i5.ResultModule,
                i4$1.BsActionModule,
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
                BsPreviewPageFormComponent] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsPreviewModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i2.CommonModule,
                            i1$3.FormsModule, i1$3.ReactiveFormsModule,
                            i5$2.ScrollingModule,
                            i3.IntlModule,
                            i2$1.WebServicesModule,
                            i2$2.ValidationModule,
                            i3$2.UtilsModule,
                            collapse.CollapseModule,
                            i5$1.MetadataModule,
                            i4$3.BsModalModule,
                            i4$2.BsFacetModule,
                            i5.ResultModule,
                            i4$1.BsActionModule,
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
            }], null, null);
    })();

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

    var enPreview = base.Utils.merge({}, _enPreview, i1$2.enSearch, collapse.enCollapse, i5$1.enMetadata, i4$3.enModal, i4$2.enFacet, i5.enResult);
    var frPreview = base.Utils.merge({}, _frPreview, i1$2.frSearch, collapse.frCollapse, i5$1.frMetadata, i4$3.frModal, i4$2.frFacet, i5.frResult);
    var dePreview = base.Utils.merge({}, _dePreview, i1$2.deSearch, collapse.deCollapse, i5$1.deMetadata, i4$3.deModal, i4$2.deFacet, i5.deResult);

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BsFacetPreview = BsFacetPreview;
    exports.BsFacetPreviewComponent2 = BsFacetPreviewComponent2;
    exports.BsPreviewEntityFacetComponent = BsPreviewEntityFacetComponent;
    exports.BsPreviewEntityPanelComponent = BsPreviewEntityPanelComponent;
    exports.BsPreviewExtractsPanelComponent = BsPreviewExtractsPanelComponent;
    exports.BsPreviewHighlights = BsPreviewHighlights;
    exports.BsPreviewLinks = BsPreviewLinks;
    exports.BsPreviewModule = BsPreviewModule;
    exports.BsPreviewPageFormComponent = BsPreviewPageFormComponent;
    exports.BsPreviewPagesPanelComponent = BsPreviewPagesPanelComponent;
    exports.BsPreviewPanel = BsPreviewPanel;
    exports.BsPreviewPopup = BsPreviewPopup;
    exports.BsPreviewSearchFormComponent = BsPreviewSearchFormComponent;
    exports.BsResultLinkPreview = BsResultLinkPreview;
    exports.BsSimilarDocuments = BsSimilarDocuments;
    exports.Extract = Extract;
    exports.PREVIEW_MODAL = PREVIEW_MODAL;
    exports.PreviewDocument = PreviewDocument;
    exports.PreviewDocumentIframe = PreviewDocumentIframe;
    exports.PreviewModule = PreviewModule;
    exports.PreviewService = PreviewService;
    exports.PreviewTooltip = PreviewTooltip;
    exports.dePreview = dePreview;
    exports.enPreview = enPreview;
    exports.frPreview = frPreview;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-preview.umd.js.map
