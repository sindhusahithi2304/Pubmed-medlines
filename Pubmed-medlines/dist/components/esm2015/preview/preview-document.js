import { ElementRef } from "@angular/core";
import { Utils } from "@sinequa/core/base";
export var HighlightCategoryFilterChoice;
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
export class PreviewDocument {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy1kb2N1bWVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3ByZXZpZXcvIiwic291cmNlcyI6WyJwcmV2aWV3LWRvY3VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTNDLE1BQU0sQ0FBTixJQUFZLDZCQUVYO0FBRkQsV0FBWSw2QkFBNkI7SUFDckMsK0VBQUcsQ0FBQTtJQUFFLGlGQUFJLENBQUE7SUFBRSxtRkFBSyxDQUFBO0FBQ3BCLENBQUMsRUFGVyw2QkFBNkIsS0FBN0IsNkJBQTZCLFFBRXhDO0FBU0QsNEdBQTRHO0FBQzVHLDJGQUEyRjtBQUMzRixTQUFTLE9BQU8sQ0FBaUIsUUFBdUIsRUFBRSxVQUF3RTtJQUM5SCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtRQUNuQixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUM1QztTQUNJO1FBQ0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNoQztBQUNMLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLE9BQU8sZUFBZTtJQWdCeEIsWUFBWSxPQUE4Qjs7UUFDdEMsSUFBSSxPQUFPLFlBQVksVUFBVSxFQUFFO1lBQy9CLElBQUksQ0FBQyxPQUFPLFNBQUcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLGFBQWEsMENBQUUsYUFBYSxDQUFDO1lBQ3JELElBQUksT0FBQSxJQUFJLENBQUMsT0FBTywwQ0FBRSxNQUFNLEtBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3hELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9B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QUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLDZCQUE2QixDQUFDLEdBQUcsRUFBRTtZQUMxRCxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsc0NBQXNDLENBQUMsRUFBRTtZQUM5RSxPQUFPLFdBQVcsQ0FBQyxXQUFXLEtBQUssT0FBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsc0NBQXNDLENBQUMsQ0FBQztTQUNuSDtRQUNELE9BQU8sV0FBVyxDQUFDLFdBQVcsS0FBSyxPQUFPLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0lBQ3ZILENBQUM7SUFFTyxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBZ0IsRUFBRSxXQUFxQjtRQUNyRSxLQUFLLE1BQU0sVUFBVSxJQUFJLFdBQVcsRUFBRTtZQUNsQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUN4QyxPQUFPLFVBQVUsQ0FBQzthQUNyQjtTQUNKO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDOztBQXRWdUIsd0NBQXdCLEdBQVcsWUFBWSxDQUFDO0FBQ2hELHVEQUF1QyxHQUFXLFVBQVUsQ0FBQztBQUM3RCxzREFBc0MsR0FBVyxTQUFTLENBQUM7QUFDM0QsNENBQTRCLEdBQVcsYUFBYSxDQUFDO0FBQ3JELDhCQUFjLEdBQVcsUUFBUSxDQUFDO0FBRWxDLHNEQUFzQyxHQUFHLG1CQUFtQixDQUFDO0FBQzdELHlEQUF5QyxHQUFHLHFCQUFxQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuXG5leHBvcnQgZW51bSBIaWdobGlnaHRDYXRlZ29yeUZpbHRlckNob2ljZSB7XG4gICAgQWxsLCBOb25lLCBWYWx1ZVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEhpZ2hsaWdodENhdGVnb3J5RmlsdGVyU3RhdGUge1xuICAgIGNob2ljZTogSGlnaGxpZ2h0Q2F0ZWdvcnlGaWx0ZXJDaG9pY2U7XG4gICAgZmlsdGVyVmFsdWU6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgSGlnaGxpZ2h0RmlsdGVycyA9IHsgW2tleTogc3RyaW5nXTogSGlnaGxpZ2h0Q2F0ZWdvcnlGaWx0ZXJTdGF0ZSB9IHwgc3RyaW5nW107XG5cbi8vIGZvckVhY2ggb24gYSBOb2RlTGlzdCBpcyBwb2x5ZmlsbGVkIGZvciBJRSBidXQgbm90IGF0IGFsbCBuZWNlc3NhcmlseSB3aGVuIHRoZSBsaXN0IGNvbWVzIGZyb20gYSBkb2N1bWVudFxuLy8gaW4gYW5vdGhlciBmcmFtZS4gVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIHBlcmZvcm0gdGhlIGZvckVhY2ggdGFraW5nIHRoaXMgaW50byBhY2NvdW50LlxuZnVuY3Rpb24gZm9yRWFjaDxUIGV4dGVuZHMgTm9kZT4obm9kZUxpc3Q6IE5vZGVMaXN0T2Y8VD4sIGNhbGxiYWNrZm46ICh2YWx1ZTogVCwga2V5OiBudW1iZXIsIHBhcmVudDogTm9kZUxpc3RPZjxUPiB8IFRbXSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIGlmICghbm9kZUxpc3QuZm9yRWFjaCkge1xuICAgICAgICBBcnJheS5mcm9tKG5vZGVMaXN0KS5mb3JFYWNoKGNhbGxiYWNrZm4pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbm9kZUxpc3QuZm9yRWFjaChjYWxsYmFja2ZuKTtcbiAgICB9XG59XG5cbi8qKlxuICogVGhpcyBjbGFzcyBvZmZlcnMgYW4gQVBJIHRvIG1hbmlwdWxhdGUgdGhlIEhUTUwgb2YgYSBwcmV2aWV3IGRvY3VtZW50LlxuICogLSBJbnNlcnQgZWxlbWVudHMgZHluYW1pY2FsbHkgaW4gdGhlIERPTSBvZiB0aGUgcHJldmlldyAoZWcuIHRvb2x0aXBzKVxuICogLSBSZXRyaWV2ZSB0aGUgdGV4dCBvZiBlbnRpdGllcyBvciBleHRyYWN0c1xuICogLSBTZWxlY3QgdGhlIGVsZW1lbnRzIG9mIGVudGl0aWVzIG9yIGV4dHJhY3RzIChieSBhbHRlcmluZyB0aGVpciBDU1MgY2xhc3NlcylcbiAqIC0gSGlnaGxpZ2h0IChvciBub3QpIHNwZWNpZmljIGVudGl0aWVzIG9yIGNhdGVnb3JpZXMgaW4gdGhlIEhUTUwgKGJ5IGFsdGVyaW5nIHRoZWlyIENTUyBjbGFzc2VzKVxuICovXG5leHBvcnQgY2xhc3MgUHJldmlld0RvY3VtZW50IHtcblxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFNFTEVDVEVEX0hJR0hMSUdIVF9DTEFTUzogc3RyaW5nID0gXCJzcS1jdXJyZW50XCI7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgU0VMRUNURURfSElHSExJR0hUX0ZJUlNUX0ZSQUdNRU5UX0NMQVNTOiBzdHJpbmcgPSBcInNxLWZpcnN0XCI7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgU0VMRUNURURfSElHSExJR0hUX0xBU1RfRlJBR01FTlRfQ0xBU1M6IHN0cmluZyA9IFwic3EtbGFzdFwiO1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEZJTFRFUkVEX09VVF9ISUdITElHSFRfQ0xBU1M6IHN0cmluZyA9IFwic3EtaW5hY3RpdmVcIjtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBTVkdfTElORV9DTEFTUzogc3RyaW5nID0gXCJzcS1zdmdcIjtcblxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEJBU0lDX0VOVElUWV9ESVNQTEFZX0VMRU1FTlRfQVRUUklCVVRFID0gXCJkYXRhLWVudGl0eS1iYXNpY1wiO1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEFEVkFOQ0VEX0VOVElUWV9ESVNQTEFZX0VMRU1FTlRfQVRUUklCVVRFID0gXCJkYXRhLWVudGl0eS1kaXNwbGF5XCI7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IF93aW5kb3c6IFdpbmRvdztcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kb2N1bWVudDogRG9jdW1lbnQ7XG4gICAgXG4gICAgcHJpdmF0ZSBwcmV2aW91c0VsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmIHwgRG9jdW1lbnQpe1xuICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnRSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuX3dpbmRvdyA9IGVsZW1lbnQ/Lm5hdGl2ZUVsZW1lbnQ/LmNvbnRlbnRXaW5kb3c7XG4gICAgICAgICAgICBpZiAodGhpcy5fd2luZG93Py5mcmFtZXMgJiYgdGhpcy5fd2luZG93LmZyYW1lc1tcImZyU2hlZXRcIl0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93aW5kb3cgPSB0aGlzLl93aW5kb3cuZnJhbWVzW1wiZnJTaGVldFwiXTsgIC8vIGFzcG9zZSB4bHMgcHJldmlld1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZG9jdW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyBQVUJMSUMgTUVUSE9EU1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBXaW5kb3cgb2YgdGhlIGlmcmFtZSBjb250YWluaW5nIHRoZSBlbGVtZW50XG4gICAgICovXG4gICAgcHVibGljIGdldENvbnRlbnRXaW5kb3coKTogV2luZG93IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpbmRvdztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSByb290IERvY3VtZW50IGVsZW1lbnQgb2YgdGhlIEhUTUwgUHJldmlld1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgZG9jdW1lbnQoKTogRG9jdW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5fZG9jdW1lbnQgfHwgdGhpcy5fd2luZG93LmRvY3VtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluc2VydCBhIGdpdmVuIERPTSBFbGVtZW50IGluIHRoZSBib2R5IG9mIHRoZSBkb2N1bWVudCBwcmV2aWV3XG4gICAgICogQHBhcmFtIGNvbXBvbmVudFxuICAgICAqL1xuICAgIHB1YmxpYyBpbnNlcnRDb21wb25lbnQoY29tcG9uZW50KXtcbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdGV4dCBvZiBhIGdpdmVuIGVudGl0eVxuICAgICAqIEBwYXJhbSBjYXRlZ29yeUlkIENhdGVnb3J5IG9mIHRoZSBlbnRpdHlcbiAgICAgKiBAcGFyYW0gaW5kZXggSW5kZXggb2YgdGhlIGVudGl0eSBpbiB0aGF0IGNhdGVnb3J5XG4gICAgICovXG4gICAgcHVibGljIGdldEhpZ2hsaWdodFRleHQoY2F0ZWdvcnlJZDogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA6IHN0cmluZyB7XG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5vZGVzID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI1wiK2NhdGVnb3J5SWQgKyBcIl9cIiArIGluZGV4KTtcbiAgICAgICAgaWYgKCFub2RlcyB8fCBub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0ZXh0ID0gXCJcIjtcbiAgICAgICAgZm9yRWFjaChub2RlcywgbiA9PiB0ZXh0ICs9IChuWydpbm5lckhUTUwnXSB8fCBuLnRleHRDb250ZW50KSk7XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgbG9jYXRpb24gb2YgdGhlIGVudGl0aWVzJyBTVkcgYmFja2dyb3VuZCAoZm9yIHNvbWUgY29udmVydGVycylcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0U3ZnQmFja2dyb3VuZFBvc2l0aW9uQW5kU2l6ZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc3ZnTGlzdDogTm9kZUxpc3RPZjxFbGVtZW50PiA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInN2Z1wiKTtcbiAgICAgICAgaWYgKHN2Z0xpc3QgIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGljID0gc3ZnTGlzdC5sZW5ndGg7IGkgPCBpYzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ZnID0gc3ZnTGlzdC5pdGVtKGkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRzcGFuTGlzdDogSFRNTENvbGxlY3Rpb25PZjxTVkdUU3BhbkVsZW1lbnQ+ID0gc3ZnLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidHNwYW5cIik7XG4gICAgICAgICAgICAgICAgaWYgKHRzcGFuTGlzdCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBqYyA9IHRzcGFuTGlzdC5sZW5ndGg7IGogPCBqYzsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0c3BhbiA9IHRzcGFuTGlzdC5pdGVtKGopO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRzcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmdJZCA9IHRzcGFuLmdldEF0dHJpYnV0ZShcImRhdGEtZW50aXR5LWJhY2tncm91bmRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJnSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZ2V0Rmlyc3QodGhpcy5nZXREb2NFbGVtZW50cyhiZ0lkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZVN2Z0JhY2tncm91bmQocmVjdCwgdHNwYW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VsZWN0IGEgc3BlY2lmaWMgZW50aXR5IGJ5IGFwcGx5aW5nIHNwZWNpZmljIGhpZ2hsaWdodCBjbGFzc2VzXG4gICAgICogdG8gdGhlIERPTSBlbGVtZW50cyBhbmQgc2Nyb2xsaW5nIHRoZSB2aWV3IHRvIGNlbnRlciBhcm91bmQgdGhlbS5cbiAgICAgKiBAcGFyYW0gY2F0ZWdvcnlJZCBDYXRlZ29yeSBvZiB0aGUgZW50aXR5XG4gICAgICogQHBhcmFtIGluZGV4IEluZGV4IG9mIHRoZSBlbnRpdHkgaW4gdGhhdCBjYXRlZ29yeVxuICAgICAqL1xuICAgIHB1YmxpYyBzZWxlY3RIaWdobGlnaHQoY2F0ZWdvcnlJZDogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA6IHZvaWQge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jbGVhckhpZ2hsaWdodFNlbGVjdGlvbigpO1xuICAgICAgICAvLyBjdXJyZW50IGVsZW1lbnQgYmVjb21lcyBwcmV2aW91cyBlbGVtZW50XG4gICAgICAgIHRoaXMucHJldmlvdXNFbGVtZW50ID0gdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYXRlZ29yeUlkICsgJ18nICsgaW5kZXgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBoaWdobGlnaHQgbmV3IHNlbGVjdGVkIGVsZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2V0SGlnaGxpZ2h0U2VsZWN0aW9uKHRoaXMucHJldmlvdXNFbGVtZW50LHRydWUsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c0VsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoe2Jsb2NrOiAnY2VudGVyJ30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgZW50aXR5IHNlbGVjdGlvbiBjbGFzc2VzIGZyb20gdGhlIGRvY3VtZW50IEhUTUwgZWxlbWVudHNcbiAgICAgKi9cbiAgICBwdWJsaWMgY2xlYXJIaWdobGlnaHRTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIC8vIENsZWFyIEhUTUwgZWxlbWVudHMgYm9yZGVyc1xuICAgICAgICBpZiAodGhpcy5wcmV2aW91c0VsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoUHJldmlld0RvY3VtZW50LlNFTEVDVEVEX0hJR0hMSUdIVF9DTEFTUyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2xlYXIgU1ZHIGVsZW1lbnRzIGJvcmRlcnNcbiAgICAgICAgY29uc3QgZWxlbWVudHM6IE5vZGVMaXN0T2Y8RWxlbWVudD4gPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaW5lLnNxLXN2Z1wiKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IGVsZW1lbnRzW2ldLnBhcmVudE5vZGU7XG4gICAgICAgICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudHNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHVybnMgaGlnaGxpZ2h0cyBvbiBvciBvZmYgYmFzZWQgb24gdGhlIHByb3ZpZGVkIGZpbHRlciBvYmplY3QuIEFkZGl0aW9uYWxseSBjbGVhcnMgdGhlIHNlbGVjdGVkIGVudGl0eVxuICAgICAqIEBwYXJhbSBmaWx0ZXJzIG9iamVjdCB3aGVyZSBlYWNoIGtleSBwcm92aWRlcyBhIGZpbHRlciBmb3IgZWFjaCBjYXRlZ29yeSBvZiBlbnRpdHkvaGlnaGxpZ2h0XG4gICAgICovXG4gICAgcHVibGljIGZpbHRlckhpZ2hsaWdodHMoZmlsdGVyczogSGlnaGxpZ2h0RmlsdGVycyl7XG5cbiAgICAgICAgdGhpcy51cGRhdGVIaWdobGlnaHRGaWx0ZXJTdGF0ZShmaWx0ZXJzKTtcbiAgICAgICAgdGhpcy5jbGVhckhpZ2hsaWdodFNlbGVjdGlvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvb3AgdGhyb3VnaCBldmVyeSBoaWdobGlnaHRlZCBlbGVtZW50IGluIHRoZSBkb2N1bWVudCBhbmQgdHVybiBoaWdobGlnaHRzIG9uIG9yIG9mZiBiYXNlZCBvbiB0aGUgZmlsdGVycyBvYmplY3QuXG4gICAgICogSWYgdGhlIGZpbHRlcnMgb2JqZWN0IGlzIGFuIGFycmF5IHRoZW4gb25seSB0aGUgc3BlY2lmaWVkIGNhdGVnb3JpZXMgYXJlIGhpZ2hsaWdodGVkLlxuICAgICAqIEBwYXJhbSBmaWx0ZXJzIG9iamVjdCB3aGVyZSBlYWNoIGtleSBwcm92aWRlcyBhIGZpbHRlciBmb3IgZWFjaCBjYXRlZ29yeSBvZiBlbnRpdHkvaGlnaGxpZ2h0XG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZUhpZ2hsaWdodEZpbHRlclN0YXRlKGZpbHRlcnM6IEhpZ2hsaWdodEZpbHRlcnMpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1lbnRpdHktZGlzcGxheV0sIC5leHRyYWN0c2xvY2F0aW9ucywgLm1hdGNobG9jYXRpb25zXCIpO1xuICAgICAgICBpZiAoVXRpbHMuaXNBcnJheShmaWx0ZXJzKSkge1xuICAgICAgICAgICAgZm9yRWFjaDxFbGVtZW50PihlbGVtZW50cywgZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGlnaGxpZ2h0ID0gZmlsdGVycy5zb21lKGNhdGVnb3J5ID0+IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNhdGVnb3J5KSk7XG4gICAgICAgICAgICAgICAgaWYgKGhpZ2hsaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoUHJldmlld0RvY3VtZW50LkZJTFRFUkVEX09VVF9ISUdITElHSFRfQ0xBU1MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFByZXZpZXdEb2N1bWVudC5GSUxURVJFRF9PVVRfSElHSExJR0hUX0NMQVNTKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvckVhY2goZWxlbWVudHMsIGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChQcmV2aWV3RG9jdW1lbnQuZWxlbWVudElzRmlsdGVyZWRPdXQoZWxlbWVudCwgZmlsdGVycykpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFByZXZpZXdEb2N1bWVudC5GSUxURVJFRF9PVVRfSElHSExJR0hUX0NMQVNTKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShQcmV2aWV3RG9jdW1lbnQuRklMVEVSRURfT1VUX0hJR0hMSUdIVF9DTEFTUyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUdXJucyBvbi9vZmYgdGhlIGhpZ2hsaWdodHMgb2Ygb25lIGNhdGVnb3J5IG9mIGVudGl0aWVzIG9yIGEgc3BlY2lmaWMgdmFsdWUgaWYgcHJvdmlkZWRcbiAgICAgKiBAcGFyYW0gY2F0ZWdvcnkgZS5nLiBwZXJzb25cbiAgICAgKiBAcGFyYW0gb24gdHJ1ZSBmb3IgaGlnaGxpZ2h0aW5nIC8gZmFsc2UgZm9yIHR1cm5pbmcgb2ZmXG4gICAgICogQHBhcmFtIHZhbHVlIGUuZy4gXCJCSUxMIEdBVEVTXCJcbiAgICAgKi9cbiAgICBwdWJsaWMgdG9nZ2xlSGlnaGxpZ2h0KGNhdGVnb3J5OiBzdHJpbmcsIG9uOiBib29sZWFuLCB2YWx1ZT86IHN0cmluZykge1xuICAgICAgICBjb25zdCBlbGVtZW50cyA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5cIitjYXRlZ29yeSk7XG4gICAgICAgIGZvckVhY2goZWxlbWVudHMsIGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgaWYoIXZhbHVlXG4gICAgICAgICAgICAgICAgfHwgKGVsZW1lbnQuaGFzQXR0cmlidXRlKFByZXZpZXdEb2N1bWVudC5CQVNJQ19FTlRJVFlfRElTUExBWV9FTEVNRU5UX0FUVFJJQlVURSkgJiYgdmFsdWUgPT09IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFByZXZpZXdEb2N1bWVudC5CQVNJQ19FTlRJVFlfRElTUExBWV9FTEVNRU5UX0FUVFJJQlVURSkpXG4gICAgICAgICAgICAgICAgfHwgKGVsZW1lbnQuaGFzQXR0cmlidXRlKFByZXZpZXdEb2N1bWVudC5BRFZBTkNFRF9FTlRJVFlfRElTUExBWV9FTEVNRU5UX0FUVFJJQlVURSkgJiYgdmFsdWUgPT09IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFByZXZpZXdEb2N1bWVudC5BRFZBTkNFRF9FTlRJVFlfRElTUExBWV9FTEVNRU5UX0FUVFJJQlVURSkpKSB7XG5cbiAgICAgICAgICAgICAgICBpZihvbil7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShQcmV2aWV3RG9jdW1lbnQuRklMVEVSRURfT1VUX0hJR0hMSUdIVF9DTEFTUyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChQcmV2aWV3RG9jdW1lbnQuRklMVEVSRURfT1VUX0hJR0hMSUdIVF9DTEFTUyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBQUklWQVRFIE1FVEhPRFNcblxuICAgIHByaXZhdGUgc2V0SGlnaGxpZ2h0U2VsZWN0aW9uKGVsdDogRWxlbWVudCwgaXNGaXJzdDogYm9vbGVhbiwgaXNMYXN0OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzU3ZnRWxlbWVudChlbHQpKSB7XG4gICAgICAgICAgICB0aGlzLnNldEhpZ2hsaWdodFNlbGVjdGlvblNWRyhlbHQsIGlzRmlyc3QsIGlzTGFzdCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldEhpZ2hsaWdodFNlbGVjdGlvbkhUTUwoZWx0LCBpc0ZpcnN0LCBpc0xhc3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRIaWdobGlnaHRTZWxlY3Rpb25IVE1MKGVsdDogRWxlbWVudCwgaXNGaXJzdDogYm9vbGVhbiwgaXNMYXN0OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGVsdC5jbGFzc0xpc3QuYWRkKFByZXZpZXdEb2N1bWVudC5TRUxFQ1RFRF9ISUdITElHSFRfQ0xBU1MpO1xuICAgICAgICBpZiAoaXNGaXJzdCkge1xuICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5hZGQoUHJldmlld0RvY3VtZW50LlNFTEVDVEVEX0hJR0hMSUdIVF9GSVJTVF9GUkFHTUVOVF9DTEFTUyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTGFzdCkge1xuICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5hZGQoUHJldmlld0RvY3VtZW50LlNFTEVDVEVEX0hJR0hMSUdIVF9MQVNUX0ZSQUdNRU5UX0NMQVNTKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0SGlnaGxpZ2h0U2VsZWN0aW9uU1ZHKGVsdDogRWxlbWVudCwgaXNGaXJzdDogYm9vbGVhbiwgaXNMYXN0OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGJnSWQgPSBlbHQuZ2V0QXR0cmlidXRlKFwiZGF0YS1lbnRpdHktYmFja2dyb3VuZFwiKTtcbiAgICAgICAgaWYgKCFiZ0lkKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHJlY3Q6IFNWR1JlY3RFbGVtZW50ID0gPFNWR1JlY3RFbGVtZW50PnRoaXMuZ2V0Rmlyc3QodGhpcy5nZXREb2NFbGVtZW50cyhiZ0lkKSk7XG4gICAgICAgIGNvbnN0IGdyb3VwID0gcmVjdC5wYXJlbnROb2RlO1xuICAgICAgICBjb25zdCByZWN0UG9zaXRpb24gPSByZWN0LmdldEJCb3goKTtcblxuICAgICAgICBpZiAoZ3JvdXApIHtcbiAgICAgICAgICAgIGNvbnN0IHRvcCA9IHJlY3RQb3NpdGlvbi55O1xuICAgICAgICAgICAgY29uc3QgYm90dG9tID0gcmVjdFBvc2l0aW9uLnkgKyByZWN0UG9zaXRpb24uaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgbGVmdCA9IHJlY3RQb3NpdGlvbi54O1xuICAgICAgICAgICAgY29uc3QgcmlnaHQgPSByZWN0UG9zaXRpb24ueCArIHJlY3RQb3NpdGlvbi53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlVHJhbnNmb3JtID0gcmVjdC5nZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIik7XG4gICAgICAgICAgICB0aGlzLmFkZFN2Z0xpbmUoZ3JvdXAsIGxlZnQsIHRvcCAgICwgcmlnaHQsIHRvcCAgICwgdmFsdWVUcmFuc2Zvcm0pO1xuICAgICAgICAgICAgdGhpcy5hZGRTdmdMaW5lKGdyb3VwLCBsZWZ0LCBib3R0b20sIHJpZ2h0LCBib3R0b20sIHZhbHVlVHJhbnNmb3JtKTtcbiAgICAgICAgICAgIGlmIChpc0ZpcnN0KSB0aGlzLmFkZFN2Z0xpbmUoZ3JvdXAsIGxlZnQgLCB0b3AsIGxlZnQgLCBib3R0b20sIHZhbHVlVHJhbnNmb3JtKTtcbiAgICAgICAgICAgIGlmIChpc0xhc3QpICB0aGlzLmFkZFN2Z0xpbmUoZ3JvdXAsIHJpZ2h0LCB0b3AsIHJpZ2h0LCBib3R0b20sIHZhbHVlVHJhbnNmb3JtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkU3ZnTGluZShncm91cDogTm9kZSwgeDE6IG51bWJlciwgeTE6IG51bWJlciwgeDI6IG51bWJlciwgeTI6IG51bWJlciwgdHJhbnNmb3JtOiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxpbmU6IEVsZW1lbnQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXCJsaW5lXCIpO1xuICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFByZXZpZXdEb2N1bWVudC5TVkdfTElORV9DTEFTUyk7XG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKFwieDFcIiwgU3RyaW5nKHgxKSk7XG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKFwieTFcIiwgU3RyaW5nKHkxKSk7XG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKFwieDJcIiwgU3RyaW5nKHgyKSk7XG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKFwieTJcIiwgU3RyaW5nKHkyKSk7XG4gICAgICAgIGlmICh0cmFuc2Zvcm0pIGxpbmUuc2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIsIHRyYW5zZm9ybSk7XG4gICAgICAgIGdyb3VwLmFwcGVuZENoaWxkKGxpbmUpO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSByZXNpemVTdmdCYWNrZ3JvdW5kKHJlY3Q6IEVsZW1lbnQsIHRzcGFuOiBTVkdUU3BhbkVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgbGV0IGVsdDogRWxlbWVudCA9IHRzcGFuO1xuICAgICAgICB3aGlsZSAoZWx0LnRhZ05hbWUgIT09IFwidGV4dFwiKSB7XG4gICAgICAgICAgICBlbHQgPSBlbHQucGFyZW50Tm9kZSBhcyBFbGVtZW50O1xuICAgICAgICAgICAgaWYgKGVsdCA9PSBudWxsKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0ZXh0OiBTVkdUZXh0RWxlbWVudCA9IGVsdCBhcyBTVkdUZXh0RWxlbWVudDtcbiAgICAgICAgY29uc3QgdGV4dEJveFBpeGVsOiBDbGllbnRSZWN0ID0gdGV4dC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgdGV4dEJveFNWRzogU1ZHUmVjdCA9IHRleHQuZ2V0QkJveCgpO1xuICAgICAgICBpZiAodGV4dEJveFBpeGVsLmhlaWdodCA9PT0gMCB8fCB0ZXh0Qm94UGl4ZWwud2lkdGggPT09IDApIHJldHVybjtcbiAgICAgICAgY29uc3Qgc2NhbGVYID0gdGV4dEJveFNWRy53aWR0aCAvIHRleHRCb3hQaXhlbC53aWR0aDtcbiAgICAgICAgY29uc3Qgc2NhbGVZID0gdGV4dEJveFNWRy5oZWlnaHQgLyB0ZXh0Qm94UGl4ZWwuaGVpZ2h0O1xuICAgICAgICBjb25zdCBkZWx0YVggPSAyICogc2NhbGVYO1xuICAgICAgICBjb25zdCBkZWx0YVkgPSAyICogc2NhbGVZO1xuXG4gICAgICAgIGNvbnN0IGZpcnN0Q2hhclJlY3QgPSB0c3Bhbi5nZXRFeHRlbnRPZkNoYXIoMCk7XG4gICAgICAgIGNvbnN0IHRzcGFuV2lkdGggPSB0c3Bhbi5nZXRDb21wdXRlZFRleHRMZW5ndGgoKTtcblxuICAgICAgICByZWN0LnNldEF0dHJpYnV0ZShcInhcIiwgU3RyaW5nKGZpcnN0Q2hhclJlY3QueCAtIGRlbHRhWCkpO1xuICAgICAgICByZWN0LnNldEF0dHJpYnV0ZShcInlcIiwgU3RyaW5nKGZpcnN0Q2hhclJlY3QueSAtIGRlbHRhWSkpO1xuICAgICAgICByZWN0LnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIFN0cmluZyh0c3BhbldpZHRoICsgMiAqIGRlbHRhWCkpO1xuICAgICAgICByZWN0LnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBTdHJpbmcodGV4dEJveFNWRy5oZWlnaHQgKyAyICogZGVsdGFZKSk7XG4gICAgICAgIGNvbnN0IHZhbHVlVHJhbnNmb3JtID0gdGV4dC5nZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIik7XG4gICAgICAgIGlmICh2YWx1ZVRyYW5zZm9ybSkgcmVjdC5zZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIiwgdmFsdWVUcmFuc2Zvcm0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RG9jRWxlbWVudHMoaWQ6IHN0cmluZyk6IEFycmF5PEVsZW1lbnQ+IHtcbiAgICAgICAgY29uc3QgbGlzdCA9IEFycmF5PEVsZW1lbnQ+KCk7XG4gICAgICAgIC8vIEdldCBIVE1MIGVsZW1lbnRzIGRpcmVjdGx5IGJ5IGlkXG4gICAgICAgIGNvbnN0IGVsdExpc3Q6IE5vZGVMaXN0T2Y8RWxlbWVudD4gPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjXCIgKyBpZCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWx0TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGlzdC5wdXNoKGVsdExpc3RbaV0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdldCBTVkcgdHNwYW4gaXRlcmF0aW5nIG9uIHRoZW0gKGpxdWVyeSBxdWVyeVNlbGVjdG9yQWxsIGRpZG4ndCByZXR1cm4gU1ZHIGlubmVyIGVsZW1lbnRzKVxuICAgICAgICBjb25zdCBzdmdMaXN0OiBOb2RlTGlzdE9mPEVsZW1lbnQ+ID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic3ZnXCIpO1xuICAgICAgICBpZiAoc3ZnTGlzdCAhPSBudWxsKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaWMgPSBzdmdMaXN0Lmxlbmd0aDsgaSA8IGljOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdmcgPSBzdmdMaXN0Lml0ZW0oaSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdHNwYW5MaXN0OiBIVE1MQ29sbGVjdGlvbk9mPFNWR1RTcGFuRWxlbWVudD4gPSBzdmcuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0c3BhblwiKTtcbiAgICAgICAgICAgICAgICBpZiAodHNwYW5MaXN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIGpjID0gdHNwYW5MaXN0Lmxlbmd0aDsgaiA8IGpjOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRzcGFuID0gdHNwYW5MaXN0Lml0ZW0oaik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHNwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHNwYW4uaWQgPT09IGlkKSBsaXN0LnB1c2godHNwYW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaXN0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Rmlyc3Qobm9kZXM6IEFycmF5PEVsZW1lbnQ+KTogRWxlbWVudCB8IG51bGwge1xuICAgICAgICByZXR1cm4gKG5vZGVzICE9IG51bGwgJiYgbm9kZXMubGVuZ3RoID4gMCkgPyBub2Rlc1swXSA6IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1N2Z0VsZW1lbnQoZWx0OiBFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChlbHQgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gXCJ2aWV3cG9ydEVsZW1lbnRcIiBpbiA8YW55PmVsdDtcbiAgICB9XG5cblxuXG4gICAgLy8gUFJJVkFURSBTVEFUSUMgKGZyb20gaGlnaGxpZ2h0IGhlbHBlcilcblxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZWxlbWVudElzRmlsdGVyZWRPdXQoZWxlbWVudDogRWxlbWVudCwgZmlsdGVyczoge1trZXk6IHN0cmluZ106IEhpZ2hsaWdodENhdGVnb3J5RmlsdGVyU3RhdGV9KTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRDbGFzczogc3RyaW5nID0gdGhpcy5nZXRFbGVtZW50Q2F0ZWdvcnkoZWxlbWVudCwgT2JqZWN0LmtleXMoZmlsdGVycykpO1xuICAgICAgICBpZiAoZWxlbWVudENsYXNzID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWx0ZXJTdGF0ZSA9IGZpbHRlcnNbZWxlbWVudENsYXNzXTtcbiAgICAgICAgaWYgKGZpbHRlclN0YXRlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlsdGVyU3RhdGUuY2hvaWNlID09PSBIaWdobGlnaHRDYXRlZ29yeUZpbHRlckNob2ljZS5Ob25lKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlsdGVyU3RhdGUuY2hvaWNlID09PSBIaWdobGlnaHRDYXRlZ29yeUZpbHRlckNob2ljZS5BbGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoUHJldmlld0RvY3VtZW50LkJBU0lDX0VOVElUWV9ESVNQTEFZX0VMRU1FTlRfQVRUUklCVVRFKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlclN0YXRlLmZpbHRlclZhbHVlICE9PSBlbGVtZW50LmdldEF0dHJpYnV0ZShQcmV2aWV3RG9jdW1lbnQuQkFTSUNfRU5USVRZX0RJU1BMQVlfRUxFTUVOVF9BVFRSSUJVVEUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWx0ZXJTdGF0ZS5maWx0ZXJWYWx1ZSAhPT0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoUHJldmlld0RvY3VtZW50LkFEVkFOQ0VEX0VOVElUWV9ESVNQTEFZX0VMRU1FTlRfQVRUUklCVVRFKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRFbGVtZW50Q2F0ZWdvcnkoZWxlbWVudDogRWxlbWVudCwgY2F0ZWdvcnlJZHM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgICAgICAgZm9yIChjb25zdCBjYXRlZ29yeUlkIG9mIGNhdGVnb3J5SWRzKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2F0ZWdvcnlJZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2F0ZWdvcnlJZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG59XG4iXX0=