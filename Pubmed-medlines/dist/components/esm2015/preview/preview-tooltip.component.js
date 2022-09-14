import { Component, Input, ViewChild } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/core/intl";
const _c0 = ["tooltip"];
const _c1 = function (a0) { return { disabled: a0 }; };
function PreviewTooltip_ng_container_2_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "span", 9);
    i0.ɵɵlistener("click", function PreviewTooltip_ng_container_2_ng_container_11_Template_span_click_1_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(2); return ctx_r5.previousEntity($event); });
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵtext(3, "\u276C");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 10);
    i0.ɵɵlistener("click", function PreviewTooltip_ng_container_2_ng_container_11_Template_span_click_4_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r7 = i0.ɵɵnextContext(2); return ctx_r7.nextEntity($event); });
    i0.ɵɵpipe(5, "sqMessage");
    i0.ɵɵtext(6, "\u276D");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(2, 4, "msg#preview.previousHighlightButtonAltText"));
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c1, ctx_r3.entityIdx <= 1));
    i0.ɵɵadvance(3);
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(5, 6, "msg#preview.nextHighlightButtonAltText"));
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c1, ctx_r3.entityIdx >= ctx_r3.entityCount));
} }
function PreviewTooltip_ng_container_2_button_13_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span");
} if (rf & 2) {
    const action_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassMap(action_r8.icon);
} }
const _c2 = function (a0, a1, a2) { return { type: a0, value: a1, display: a2 }; };
const _c3 = function (a0) { return { values: a0 }; };
function PreviewTooltip_ng_container_2_button_13_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const action_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, action_r8.text, i0.ɵɵpureFunction1(8, _c3, i0.ɵɵpureFunction3(4, _c2, ctx_r10.entityType, ctx_r10.entityValue, ctx_r10.entityDisplay))));
} }
function PreviewTooltip_ng_container_2_button_13_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span");
} if (rf & 2) {
    const action_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassMap(action_r8.iconAfter);
} }
function PreviewTooltip_ng_container_2_button_13_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 11);
    i0.ɵɵlistener("click", function PreviewTooltip_ng_container_2_button_13_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r16); const action_r8 = ctx.$implicit; const ctx_r15 = i0.ɵɵnextContext(2); return ctx_r15.entityAction(action_r8, $event); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵtemplate(2, PreviewTooltip_ng_container_2_button_13_span_2_Template, 1, 3, "span", 12);
    i0.ɵɵtemplate(3, PreviewTooltip_ng_container_2_button_13_span_3_Template, 3, 10, "span", 2);
    i0.ɵɵtemplate(4, PreviewTooltip_ng_container_2_button_13_span_4_Template, 1, 3, "span", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const action_r8 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind2(1, 6, action_r8.title || "", i0.ɵɵpureFunction1(13, _c3, i0.ɵɵpureFunction3(9, _c2, ctx_r4.entityType, ctx_r4.entityValue, ctx_r4.entityDisplay))));
    i0.ɵɵproperty("disabled", action_r8.disabled)("hidden", action_r8.hidden);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", action_r8.icon);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", action_r8.text);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", action_r8.iconAfter);
} }
function PreviewTooltip_ng_container_2_Template(rf, ctx) { if (rf & 1) {
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
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
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
} }
function PreviewTooltip_ng_container_3_ng_container_1_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span");
} if (rf & 2) {
    const action_r18 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassMap(action_r18.icon);
} }
const _c4 = function (a0) { return { text: a0 }; };
function PreviewTooltip_ng_container_3_ng_container_1_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const action_r18 = i0.ɵɵnextContext().$implicit;
    const ctx_r20 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, action_r18.text, i0.ɵɵpureFunction1(6, _c3, i0.ɵɵpureFunction1(4, _c4, ctx_r20.selectedText.slice(0, 50)))));
} }
function PreviewTooltip_ng_container_3_ng_container_1_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span");
} if (rf & 2) {
    const action_r18 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassMap(action_r18.iconAfter);
} }
function PreviewTooltip_ng_container_3_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "button", 11);
    i0.ɵɵlistener("click", function PreviewTooltip_ng_container_3_ng_container_1_Template_button_click_1_listener($event) { i0.ɵɵrestoreView(_r26); const action_r18 = ctx.$implicit; const ctx_r25 = i0.ɵɵnextContext(2); return ctx_r25.selectedTextAction(action_r18, $event); });
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵtemplate(3, PreviewTooltip_ng_container_3_ng_container_1_span_3_Template, 1, 3, "span", 12);
    i0.ɵɵtemplate(4, PreviewTooltip_ng_container_3_ng_container_1_span_4_Template, 3, 8, "span", 2);
    i0.ɵɵtemplate(5, PreviewTooltip_ng_container_3_ng_container_1_span_5_Template, 1, 3, "span", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const action_r18 = ctx.$implicit;
    const ctx_r17 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind2(2, 6, action_r18.title || "", i0.ɵɵpureFunction1(11, _c3, i0.ɵɵpureFunction1(9, _c4, ctx_r17.selectedText.slice(0, 50)))));
    i0.ɵɵproperty("disabled", action_r18.disabled)("hidden", action_r18.hidden);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", action_r18.icon);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", action_r18.text);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", action_r18.iconAfter);
} }
function PreviewTooltip_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, PreviewTooltip_ng_container_3_ng_container_1_Template, 6, 13, "ng-container", 13);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.selectedTextActions);
} }
const _c5 = function (a0, a1, a2) { return { "visibility": a0, "bottom": a1, "left": a2 }; };
export class PreviewTooltip {
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
PreviewTooltip.ɵfac = function PreviewTooltip_Factory(t) { return new (t || PreviewTooltip)(i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.DomSanitizer)); };
PreviewTooltip.ɵcmp = i0.ɵɵdefineComponent({ type: PreviewTooltip, selectors: [["sq-preview-tooltip"]], viewQuery: function PreviewTooltip_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.tooltip = _t.first);
    } }, inputs: { previewDocument: "previewDocument", previewData: "previewData", entityActions: "entityActions", entityNavActions: "entityNavActions", selectedTextActions: "selectedTextActions", scalingFactor: "scalingFactor" }, features: [i0.ɵɵNgOnChangesFeature], decls: 4, vars: 12, consts: [[1, "sq-selection-tooltip", 3, "ngClass", "ngStyle"], ["tooltip", ""], [4, "ngIf"], [1, "display"], [1, "label"], [1, "index"], [1, "count"], [1, "btn-list"], [3, "disabled", "hidden", "title", "click", 4, "ngFor", "ngForOf"], [1, "nav-btn", "previous", 3, "ngClass", "title", "click"], [1, "nav-btn", "next", 3, "ngClass", "title", "click"], [3, "disabled", "hidden", "title", "click"], [3, "class", 4, "ngIf"], [4, "ngFor", "ngForOf"]], template: function PreviewTooltip_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0, 1);
        i0.ɵɵtemplate(2, PreviewTooltip_ng_container_2_Template, 14, 8, "ng-container", 2);
        i0.ɵɵtemplate(3, PreviewTooltip_ng_container_3_Template, 2, 1, "ng-container", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵstyleProp("--left", ctx.leftPin)("--factor", 1 / ctx.scalingFactor);
        i0.ɵɵproperty("ngClass", ctx.isBottom ? "sq-bottom-tooltip" : "sq-top-tooltip")("ngStyle", i0.ɵɵpureFunction3(8, _c5, ctx.visibility, ctx.bottom, ctx.left));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.entityType && !ctx.selectedText);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.selectedText);
    } }, directives: [i2.NgClass, i2.NgStyle, i2.NgIf, i2.NgForOf], pipes: [i3.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PreviewTooltip, [{
        type: Component,
        args: [{
                selector: "sq-preview-tooltip",
                templateUrl: "./preview-tooltip.component.html"
            }]
    }], function () { return [{ type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i1.DomSanitizer }]; }, { previewDocument: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy10b29sdGlwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3ByZXZpZXcvIiwic291cmNlcyI6WyJwcmV2aWV3LXRvb2x0aXAuY29tcG9uZW50LnRzIiwicHJldmlldy10b29sdGlwLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUF1RCxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7OztJQ1FuSCw2QkFDSTtJQUFBLCtCQUE4SztJQUEvSSwwTkFBZ0M7O0lBQStHLHNCQUFDO0lBQUEsaUJBQU87SUFDdEwsZ0NBQTRLO0lBQWpKLHNOQUE0Qjs7SUFBcUgsc0JBQUM7SUFBQSxpQkFBTztJQUN4TCwwQkFBZTs7O0lBRjRGLGVBQXNFO0lBQXRFLHFHQUFzRTtJQUE3RywyRUFBc0M7SUFDRyxlQUFrRTtJQUFsRSxpR0FBa0U7SUFBbkgsNkZBQWdEOzs7SUFJcEcsdUJBQXlEOzs7SUFBL0IsNkJBQXVCOzs7OztJQUNqRCw0QkFBMEI7SUFBQSxZQUF1Rzs7SUFBQSxpQkFBTzs7OztJQUE5RyxlQUF1RztJQUF2RyxrTEFBdUc7OztJQUNqSSx1QkFBbUU7OztJQUFwQyxrQ0FBNEI7Ozs7SUFIL0Qsa0NBQ0k7SUFEeUMsbVFBQXNDOztJQUMvRSwyRkFBeUQ7SUFDekQsMkZBQXdJO0lBQ3hJLDJGQUFtRTtJQUN2RSxpQkFBUzs7OztJQUppSSxvTUFBd0g7SUFBOUssNkNBQTRCLDRCQUFBO0lBQ3JHLGVBQWlCO0lBQWpCLHFDQUFpQjtJQUNqQixlQUFpQjtJQUFqQixxQ0FBaUI7SUFDakIsZUFBc0I7SUFBdEIsMENBQXNCOzs7SUFYekMsNkJBQ0k7SUFBQSwrQkFBc0I7SUFBQSxZQUFvQjtJQUFBLGlCQUFPO0lBQUMsK0JBQW9CO0lBQUEsWUFBZ0M7O0lBQUEsaUJBQU87SUFDN0csK0JBQW9CO0lBQUEsWUFBZ0I7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b3J0IHtDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIENoYW5nZURldGVjdG9yUmVmLCBOZ1pvbmUsIFZpZXdDaGlsZCwgRWxlbWVudFJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7RG9tU2FuaXRpemVyfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xuaW1wb3J0IHtQcmV2aWV3RGF0YX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge1ByZXZpZXdEb2N1bWVudH0gZnJvbSBcIi4vcHJldmlldy1kb2N1bWVudFwiO1xuaW1wb3J0IHtBY3Rpb259IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2FjdGlvblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1wcmV2aWV3LXRvb2x0aXBcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3ByZXZpZXctdG9vbHRpcC5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIFByZXZpZXdUb29sdGlwIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpIHByZXZpZXdEb2N1bWVudDogUHJldmlld0RvY3VtZW50O1xuICAgIEBJbnB1dCgpIHByZXZpZXdEYXRhOiBQcmV2aWV3RGF0YTtcbiAgICBASW5wdXQoKSBlbnRpdHlBY3Rpb25zOiBBY3Rpb25bXSA9IFtdO1xuICAgIEBJbnB1dCgpIGVudGl0eU5hdkFjdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkVGV4dEFjdGlvbnM6IEFjdGlvbltdID0gW107XG4gICAgQElucHV0KCkgc2NhbGluZ0ZhY3RvciA9IDEuMDtcbiAgICBAVmlld0NoaWxkKCd0b29sdGlwJywge3N0YXRpYzogZmFsc2V9KSB0b29sdGlwIDogRWxlbWVudFJlZjtcblxuICAgIC8vIFNlbGVjdGVkIHRleHQgbW9kZVxuICAgIHNlbGVjdGVkVGV4dDogc3RyaW5nID0gXCJcIjtcblxuICAgIC8vIEVudGl0eSBob3ZlciBtb2RlXG4gICAgZW50aXR5VHlwZTogc3RyaW5nID0gXCJcIjtcbiAgICBlbnRpdHlWYWx1ZTogc3RyaW5nO1xuICAgIGVudGl0eURpc3BsYXk6IHN0cmluZztcbiAgICBlbnRpdHlMYWJlbDogc3RyaW5nO1xuICAgIGVudGl0eUNvdW50OiBudW1iZXI7XG4gICAgZW50aXR5SWR4OiBudW1iZXI7XG5cbiAgICAvLyBUb29sdGlwIGZpeGVkIHBvc2l0aW9uaW5nXG4gICAgYm90dG9tOiBzdHJpbmcgPSBcIjBweFwiO1xuICAgIGxlZnQ6IHN0cmluZyA9IFwiMHB4XCI7XG4gICAgbGVmdFBpbjsgLy8gcG9zaXRpb24gb2YgdGhlIHRvb2x0aXAgcGluIHJlbGF0aXZlIHRvIGxlZnRcbiAgICBpc0JvdHRvbTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcil7XG5cbiAgICAgICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIG1vdXNlIGxpc3RlbmVycyB0byBhIG5ldyBwcmV2aWV3IGRvY3VtZW50IGluIG9yZGVyIHRvIGRpc3BsYXkgdGhlIHRvb2x0aXBcbiAgICAgKiBpbiByZXNwb25zZSB0byBzcGVjaWZpYyBob3ZlciBvZiBjbGljayBldmVudHNcbiAgICAgKiBAcGFyYW0gY2hhbmdlc1xuICAgICAqL1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpe1xuICAgICAgICBpZihjaGFuZ2VzW1wicHJldmlld0RvY3VtZW50XCJdICYmICEhdGhpcy5wcmV2aWV3RG9jdW1lbnQpe1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJldmlld0RvY3VtZW50LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5oYW5kbGVNb3VzZVVwLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuaGFuZGxlTW91c2VEb3duLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuaGFuZGxlTW91c2VNb3ZlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLmhhbmRsZVNjcm9sbCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBpZihjaGFuZ2VzW1wic2NhbGluZ0ZhY3RvclwiXSAmJiB0aGlzLnByZXZpZXdEb2N1bWVudCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmhhbmRsZU1vdXNlVXAoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byB0aGUgcHJldmlldyBkb2N1bWVudFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0IGRvY3VtZW50KCk6IERvY3VtZW50e1xuICAgICAgICByZXR1cm4gdGhpcy5wcmV2aWV3RG9jdW1lbnQuZG9jdW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgdG8gdGhlIHByZXZpZXcgV2luZG93XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXQgd2luZG93KCk6IFdpbmRvdyB7XG4gICAgICAgIHJldHVybiB0aGlzLnByZXZpZXdEb2N1bWVudC5nZXRDb250ZW50V2luZG93KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udHJvbCB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgdG9vbHRpcFxuICAgICAqL1xuICAgIGdldCB2aXNpYmlsaXR5KCkgOiBcInZpc2libGVcIiB8IFwiaGlkZGVuXCIge1xuICAgICAgICByZXR1cm4gKHRoaXMuc2VsZWN0ZWRUZXh0ICE9PSBcIlwiIHx8IHRoaXMuZW50aXR5VHlwZSAhPT0gXCJcIik/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiB0aGUgdG9vbHRpcCBhYm92ZSBhIGJvdW5kaW5nIGJveFxuICAgICAqL1xuICAgIHBvc2l0aW9uVG9vbHRpcEFib3ZlKGJveDogRE9NUmVjdCB8IENsaWVudFJlY3Qpe1xuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHsgICAvLyBOZWNlc3NhcnkgdG8gY29tcHV0ZSB0aGUgcmlnaHQgc2l6ZSBvZiB0aGUgdG9vbHRpcCB3aGVuIHVwZGF0aW5nIHRoZSB0ZXh0XG4gICAgICAgICAgICBjb25zdCB0b29sdGlwV2lkdGggPSB0aGlzLnRvb2x0aXAubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IHRvb2x0aXBIZWlnaHQgPSB0aGlzLnRvb2x0aXAubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICAgICAgICBsZXQgbGVmdCA9IHRoaXMuc2NhbGluZ0ZhY3RvciooYm94LmxlZnQgKyAwLjUqYm94LndpZHRoKSAtIDAuNSp0b29sdGlwV2lkdGhcbiAgICAgICAgICAgIGxlZnQgPSBNYXRoLm1pbihNYXRoLm1heChsZWZ0LCAwKSwgdGhpcy5zY2FsaW5nRmFjdG9yKnRoaXMuZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCAtIHRvb2x0aXBXaWR0aCk7IC8vIEF2b2lkIHRvb2x0aXAgb3ZlcmZsb3dcbiAgICAgICAgICAgIHRoaXMubGVmdCA9IE1hdGgucm91bmQobGVmdCkrXCJweFwiO1xuXG4gICAgICAgICAgICBjb25zdCBsZWZ0UGluID0gTWF0aC5yb3VuZCgxMDAgKiAodGhpcy5zY2FsaW5nRmFjdG9yKihib3gubGVmdCArIDAuNSpib3gud2lkdGgpIC0gbGVmdCkgLyB0b29sdGlwV2lkdGgpO1xuICAgICAgICAgICAgdGhpcy5sZWZ0UGluID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGAke2xlZnRQaW59JWApO1xuICAgICAgICAgICAgLy9hYnNvbHV0ZSB0b3AgcG9zaXRpb25pbmdcbiAgICAgICAgICAgIC8vdGhpcy5ib3R0b20gPSBNYXRoLnJvdW5kKGJveC50b3AtdG9vbHRpcEhlaWdodC01K3RoaXMud2luZG93LnNjcm9sbFkpK1wicHhcIjtcbiAgICAgICAgICAgIC8vYWJzb2x1dGUgYm90dG9tIHBvc2l0aW9uaW5nXG4gICAgICAgICAgICAvL3RoaXMuYm90dG9tID0gTWF0aC5yb3VuZCh0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSB0aGlzLndpbmRvdy5zY3JvbGxZIC0gYm94LnRvcCArIDUpK1wicHhcIjtcbiAgICAgICAgICAgIC8vZml4ZWQgYm90dG9tIHBvc2l0aW9uaW5nXG4gICAgICAgICAgICBpZiAoTWF0aC5yb3VuZChib3gudG9wIC0gNSAtIHRvb2x0aXBIZWlnaHQpID4gMCkge1xuICAgICAgICAgICAgICB0aGlzLmlzQm90dG9tID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRoaXMuYm90dG9tID0gTWF0aC5yb3VuZCh0aGlzLnNjYWxpbmdGYWN0b3IqICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAtIGJveC50b3ApICsgNSkrXCJweFwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5pc0JvdHRvbSA9IHRydWU7XG4gICAgICAgICAgICAgIHRoaXMuYm90dG9tID0gTWF0aC5yb3VuZCh0aGlzLnNjYWxpbmdGYWN0b3IqICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCAtIGJveC50b3AgLSBib3guaGVpZ2h0KSAtIHRvb2x0aXBIZWlnaHQgLSA1KStcInB4XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIG1vdXNlIGJ1dHRvbiBkb3duOiByZWluaXRpbGl6ZXMgc2VsZWN0aW9uXG4gICAgICovXG4gICAgaGFuZGxlTW91c2VEb3duID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIC8vaWYoZXZlbnQudGFyZ2V0ICE9PSB0aGlzLnRvb2x0aXApXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUZXh0ID0gXCJcIjtcbiAgICAgICAgLy90aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgbW91c2UgYnV0dG9uIHVwOiBnZXQgdGhlIHNlbGVjdGVkIHRleHQgYW5kIGRpc3BsYXkgYSB0b29sdGlwIGFib3ZlIGl0XG4gICAgICovXG4gICAgaGFuZGxlTW91c2VVcCA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5kb2N1bWVudC5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRleHQgPSBzZWxlY3Rpb24gPyBzZWxlY3Rpb24udG9TdHJpbmcoKS50cmltKCkgOiBcIlwiO1xuICAgICAgICBpZihzZWxlY3Rpb24gJiYgdGhpcy5zZWxlY3RlZFRleHQpe1xuICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJTZWxlY3RlZCB0ZXh0OiBcIiwgdGV4dCk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmFuZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7IC8vIFJlZnJlc2ggc2l6ZSBvZiB0b29sdGlwXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uVG9vbHRpcEFib3ZlKHJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pblRpbWU6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICogSGFuZGxlIG1vdXNlIG1vdmVtZW50cy4gSWYgaG92ZXJpbmcgYW4gZW50aXR5IGFuZCBubyB0ZXh0IGlzIHNlbGVjdGVkLCB3aWxsIGRpc3BsYXkgYSB0b29sdGlwIGZvciB0aGlzIGVudGl0eVxuICAgICAqL1xuICAgIGhhbmRsZU1vdXNlTW92ZSA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBpZighdGhpcy5zZWxlY3RlZFRleHQgJiYgZXZlbnRbXCJwYXRoXCJdKXtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSA8RWxlbWVudFtdPiBldmVudFtcInBhdGhcIl07XG4gICAgICAgICAgICBpZihwYXRoLmxlbmd0aD4wKXtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gcGF0aFswXTtcbiAgICAgICAgICAgICAgICBpZihlbGVtZW50Lm5vZGVUeXBlID09PSAxICYmIGVsZW1lbnQubm9kZU5hbWUgPT09IFwiU1BBTlwiICYmIChlbGVtZW50LmF0dHJpYnV0ZXNbXCJkYXRhLWVudGl0eS1iYXNpY1wiXSB8fCBlbGVtZW50LmF0dHJpYnV0ZXNbXCJkYXRhLWVudGl0eS1kaXNwbGF5XCJdKSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZW50aXR5VHlwZSAhPT0gZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoXCIgXCIpWzBdIHx8IHRoaXMuZW50aXR5RGlzcGxheSAhPT0gZWxlbWVudC50ZXh0Q29udGVudCl7ICAvLyBUb29sdGlwIG5vdCBhbHJlYWR5IGRpc3BsYXllZFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdHlUeXBlID0gZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoXCIgXCIpWzBdOyAgICAvLyBVcGRhdGUgdGV4dCAoYW5kIHZpc2liaWxpdHkpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGl0eURpc3BsYXkgPSBlbGVtZW50LnRleHRDb250ZW50IHx8IFwiXCI7ICAgLy8gVG9vbHRpcCBjb250ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGVsZW1lbnQuYXR0cmlidXRlc1tcImRhdGEtZW50aXR5LWJhc2ljXCJdIHx8IGVsZW1lbnQuYXR0cmlidXRlc1tcImRhdGEtZW50aXR5LWRpc3BsYXlcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGl0eVZhbHVlID0gdmFsdWUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoaWdobGlnaHRzID0gdGhpcy5wcmV2aWV3RGF0YS5oaWdobGlnaHRzUGVyQ2F0ZWdvcnlbdGhpcy5lbnRpdHlUeXBlXS52YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCh2ID0+IHYudmFsdWUgPT09IHZhbHVlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5Q291bnQgPSBoaWdobGlnaHRzID8gaGlnaGxpZ2h0cy5sb2NhdGlvbnMubGVuZ3RoIDogMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5TGFiZWwgPSB0aGlzLnByZXZpZXdEYXRhLmhpZ2hsaWdodHNQZXJDYXRlZ29yeVt0aGlzLmVudGl0eVR5cGVdLmNhdGVnb3J5RGlzcGxheUxhYmVsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZHNwbHQgPSBlbGVtZW50LmlkLnNwbGl0KFwiX1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IHBhcnNlSW50KGlkc3BsdFtpZHNwbHQubGVuZ3RoLTFdLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLmZpbmRFbnRpdHkodGhpcy5lbnRpdHlUeXBlLCB0aGlzLmVudGl0eVZhbHVlLCAoXywgaWRJbmRleCkgPT4gaWRJbmRleCA9PT0gaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5SWR4ID0gZW50aXR5ID8gZW50aXR5LnZhbHVlSW5kZXggOiAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTsgLy8gUmVmcmVzaCBzaXplIG9mIHRvb2x0aXBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25Ub29sdGlwQWJvdmUoZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5UaW1lID0gRGF0ZS5ub3coKTsgLy8gUmVzZXQgdGhlIHRpbWVyIG92ZXIgYW4gZW50aXR5XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2UgYXJlIG5vdCBob3ZlcmluZyBhbiBlbnRpdHlcbiAgICAgICAgaWYodGhpcy5lbnRpdHlUeXBlKXsgICAgLy8gSWYgc3RpbGwgZGlzcGxheWluZyB0aGUgdG9vbHRpcC4uLlxuICAgICAgICAgICAgY29uc3QgaXNPdmVyVG9vbHRpcCA9ICEhZXZlbnRbXCJwYXRoXCJdLmZpbmQoZWwgPT4gZWwubG9jYWxOYW1lID09PSBcInNxLXByZXZpZXctdG9vbHRpcFwiKTtcbiAgICAgICAgICAgIGlmKCFpc092ZXJUb29sdGlwKSB7XG4gICAgICAgICAgICAgICAgaWYoRGF0ZS5ub3coKSAtIHRoaXMuX2luVGltZSA+IDIwMCl7IC8vIDIwMCBtcyB0b2xlcmFuY2UgYmVmb3JlIGNsb3NpbmcgdG9vbHRpcFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGl0eVR5cGUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGl0eVZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdHlEaXNwbGF5ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdHlMYWJlbCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5Q291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGl0eUlkeCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpOyAvLyBUdXJuIG9mZiB0b29sdGlwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLl9pblRpbWUgPSBEYXRlLm5vdygpOyAvLyBSZXNldCB0aGUgdGltZXIgb3ZlciB0aGUgdG9vbHRpcFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIHNjcm9sbCBldmVudHNcbiAgICAgKi9cbiAgICBoYW5kbGVTY3JvbGwgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYodGhpcy5zZWxlY3RlZFRleHQgIT09IFwiXCIpe1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3VzZVVwKCk7IC8vIFJlcG9zaXRpb24gdG9vbHRpcCBhYm92ZSBzZWxlY3RlZCB0ZXh0XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLmVudGl0eVR5cGUgIT09IFwiXCIpe1xuICAgICAgICAgICAgdGhpcy5lbnRpdHlUeXBlID0gXCJcIjtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5VmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7IC8vIFR1cm4gb2ZmIHRvb2x0aXBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdmUgdG8gdGhlIHByZXZpb3VzIGVudGl0eSBpZiBwb3NzaWJsZVxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqL1xuICAgIHByZXZpb3VzRW50aXR5KGV2ZW50OiBFdmVudCl7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyAvLyBzdG9wIHRoZSBwcm9wYWdhdGlvbiB0byBhdm9pZCB0cmlnZ2VyaW5nIHRoZSB0b29sdGlwIGxpc3RlbmVyc1xuICAgICAgICBpZih0aGlzLmVudGl0eUlkeCA+IDEpe1xuICAgICAgICAgICAgLy8gRmluZCB0aGUgaW5kZXggb2YgdGhlIHByZXZpb3VzIGVudGl0eVxuICAgICAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5maW5kRW50aXR5KHRoaXMuZW50aXR5VHlwZSwgdGhpcy5lbnRpdHlWYWx1ZSwgKHZhbHVlSWR4LF8pID0+IHZhbHVlSWR4ID09PSB0aGlzLmVudGl0eUlkeC0xKTtcbiAgICAgICAgICAgIGlmIChlbnRpdHkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpZHggPSBlbnRpdHkuaWRJbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdEb2N1bWVudC5zZWxlY3RIaWdobGlnaHQodGhpcy5lbnRpdHlUeXBlLCBpZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW92ZSB0byB0aGUgbmV4dCBlbnRpdHkgaWYgcG9zc2libGVcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBuZXh0RW50aXR5KGV2ZW50OiBFdmVudCl7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyAvLyBzdG9wIHRoZSBwcm9wYWdhdGlvbiB0byBhdm9pZCB0cmlnZ2VyaW5nIHRoZSB0b29sdGlwIGxpc3RlbmVyc1xuICAgICAgICBpZih0aGlzLmVudGl0eUlkeCA8IHRoaXMuZW50aXR5Q291bnQpe1xuICAgICAgICAgICAgLy8gRmluZCB0aGUgaW5kZXggb2YgdGhlIG5leHQgZW50aXR5XG4gICAgICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLmZpbmRFbnRpdHkodGhpcy5lbnRpdHlUeXBlLCB0aGlzLmVudGl0eVZhbHVlLCAodmFsdWVJZHgsXykgPT4gdmFsdWVJZHggPT09IHRoaXMuZW50aXR5SWR4KzEpO1xuICAgICAgICAgICAgaWYgKGVudGl0eSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IGVudGl0eS5pZEluZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmlld0RvY3VtZW50LnNlbGVjdEhpZ2hsaWdodCh0aGlzLmVudGl0eVR5cGUsIGlkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlcyBhIGNsaWNrZWQgYWN0aW9uIGJ1dHRvbiBpbiB0aGUgY29udGV4dCBvZiBhIHRvb2x0aXAgZm9yIGhvdmVyZWQgZW50aXRpZXNcbiAgICAgKiBAcGFyYW0gYWN0aW9uXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgZW50aXR5QWN0aW9uKGFjdGlvbjogQWN0aW9uLCBldmVudDogRXZlbnQpe1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy8gc3RvcCB0aGUgcHJvcGFnYXRpb24gdG8gYXZvaWQgdHJpZ2dlcmluZyB0aGUgdG9vbHRpcCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBpZihhY3Rpb24uYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmFjdGlvbihhY3Rpb24sIDxhbnk+IHt0eXBlOiB0aGlzLmVudGl0eVR5cGUsIGlkeDogdGhpcy5lbnRpdHlJZHgsIHZhbHVlOiB0aGlzLmVudGl0eVZhbHVlLCBkaXNwbGF5OiB0aGlzLmVudGl0eURpc3BsYXl9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhlY3V0ZXMgYSBjbGlja2VkIGFjdGlvbiBidXR0b24gaW4gdGhlIGNvbnRleHQgb2YgYSB0b29sdGlwIGZvciB0ZXh0IHNlbGVjdGlvblxuICAgICAqIEBwYXJhbSBhY3Rpb24gdGhlIGFjdGlvbiB0byBleGVjdXRlXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgc2VsZWN0ZWRUZXh0QWN0aW9uKGFjdGlvbjogQWN0aW9uLCBldmVudDogRXZlbnQpe1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy8gc3RvcCB0aGUgcHJvcGFnYXRpb24gdG8gYXZvaWQgdHJpZ2dlcmluZyB0aGUgdG9vbHRpcCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBpZihhY3Rpb24uYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmFjdGlvbihhY3Rpb24sIDxhbnk+IHt0ZXh0OiB0aGlzLnNlbGVjdGVkVGV4dH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgZnVuY3Rpb24gdG8gZmluZCB0aGUgaW5kZXhlcyBvZiBhIHNwZWNpZmljIGVudGl0eSAqb2NjdXJyZW5jZSouIFJldHVybnMgYm90aCB0aGUgaW5kZXggd2l0aGluIGFsbFxuICAgICAqIG9mIGl0cyBvd24gb2NjdXJyZW5jZXM6IHZhbHVlSW5kZXggKGVnLiBCSUxMIEdBVEVTIDMvMTQpIEFORCB0aGUgaW5kZXggY29ycmVzcG9uZGluZyB0byB0aGVcbiAgICAgKiBlbnRpdHkgaWQgaW5zaWRlIHRoZSBkb2N1bWVudDogaWRJbmRleCAoZWcuIGlkPVwicGVyc29uXzMyXCIpLlxuICAgICAqIEBwYXJhbSBjYXRlZ29yeSBlZy4gcGVyc29uXG4gICAgICogQHBhcmFtIHZhbHVlIGVnLiBCSUxMIEdBVEVTXG4gICAgICogQHBhcmFtIHByZWRpY2F0ZSBmdW5jdGlvbiB0ZXN0aW5nIHdoZXRoZXIgaXQgaXMgdGhlIGVudGl0eSBvY2N1cnJlbmNlIG9mIGludGVyZXN0XG4gICAgICogQHJldHVybnMgYW4gb2JqZWN0IHdpdGggYm90aCBpbmRleGVzXG4gICAgICovXG4gICAgcHJpdmF0ZSBmaW5kRW50aXR5KGVudGl0eVR5cGU6IHN0cmluZywgZW50aXR5VmFsdWU6IHN0cmluZywgcHJlZGljYXRlOiAoaW5kZXg6IG51bWJlciwgaWRJbmRleDogbnVtYmVyKSA9PiBib29sZWFuKVxuICAgICAgICAgICAgOiB7dmFsdWVJbmRleDogbnVtYmVyLCBpZEluZGV4OiBudW1iZXJ9IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgbGV0IGN1cnJlbnRJZHggPSAwO1xuICAgICAgICAvLyBGb3IgZWFjaCBoaWdobGlnaHQgaW4gdGhlIGRvY1xuICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLnByZXZpZXdEYXRhLmhpZ2hsaWdodHNQZXJMb2NhdGlvblsnbGVuZ3RoJ107IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaGlnaGxpZ2h0ID0gdGhpcy5wcmV2aWV3RGF0YS5oaWdobGlnaHRzUGVyTG9jYXRpb25baV07XG4gICAgICAgICAgICBjb25zdCBjYXRlZ29yaWVzID0gT2JqZWN0LmtleXMoaGlnaGxpZ2h0LnBvc2l0aW9uSW5DYXRlZ29yaWVzKTtcbiAgICAgICAgICAgIC8vIEZvciBlYWNoIHZhbHVlIG9mIHRoZSBoaWdobGlnaHRcbiAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqPGNhdGVnb3JpZXMubGVuZ3RoOyBqKyspe1xuICAgICAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgdGhlIHJpZ2h0IGVudGl0eSB0eXBlIGFuZCB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmKGNhdGVnb3JpZXNbal0gPT09IGVudGl0eVR5cGUgJiYgaGlnaGxpZ2h0LnZhbHVlc1tqXSA9PT0gZW50aXR5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSW5jcmVhc2UgdGhlIGNvdW50ZXJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudElkeCsrO1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGlzIGlzIHRoZSBpZHggd2UgYXJlIGxvb2tpbmcgZm9yLCByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgaWYocHJlZGljYXRlKGN1cnJlbnRJZHgsIGhpZ2hsaWdodC5wb3NpdGlvbkluQ2F0ZWdvcmllc1tlbnRpdHlUeXBlXSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHt2YWx1ZUluZGV4OiBjdXJyZW50SWR4LCBpZEluZGV4OiBoaWdobGlnaHQucG9zaXRpb25JbkNhdGVnb3JpZXNbZW50aXR5VHlwZV19O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG59XG4iLCI8ZGl2ICN0b29sdGlwXG4gICAgY2xhc3M9XCJzcS1zZWxlY3Rpb24tdG9vbHRpcFwiIFtuZ0NsYXNzXT1cImlzQm90dG9tID8gJ3NxLWJvdHRvbS10b29sdGlwJyA6ICdzcS10b3AtdG9vbHRpcCdcIlxuICAgIFtzdHlsZS4tLWxlZnRdPVwibGVmdFBpblwiIFtuZ1N0eWxlXT1cInsndmlzaWJpbGl0eScgOiB2aXNpYmlsaXR5LCAnYm90dG9tJyA6IGJvdHRvbSwgJ2xlZnQnIDogbGVmdH1cIlxuICAgIFtzdHlsZS4tLWZhY3Rvcl09XCIxLjAvc2NhbGluZ0ZhY3RvclwiPlxuXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImVudGl0eVR5cGUgJiYgIXNlbGVjdGVkVGV4dFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImRpc3BsYXlcIj57eyBlbnRpdHlEaXNwbGF5IH19IDwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJsYWJlbFwiPih7eyBlbnRpdHlMYWJlbCB8IHNxTWVzc2FnZSB9fSkgPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImluZGV4XCI+e3sgZW50aXR5SWR4IH19IDwvc3Bhbj4vPHNwYW4gY2xhc3M9XCJjb3VudFwiPiB7eyBlbnRpdHlDb3VudCB9fSA8L3NwYW4+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJlbnRpdHlOYXZBY3Rpb25zXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hdi1idG4gcHJldmlvdXNcIiAoY2xpY2spPVwicHJldmlvdXNFbnRpdHkoJGV2ZW50KVwiIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogZW50aXR5SWR4IDw9IDF9XCIgdGl0bGU9XCJ7eyAnbXNnI3ByZXZpZXcucHJldmlvdXNIaWdobGlnaHRCdXR0b25BbHRUZXh0JyB8IHNxTWVzc2FnZSB9fVwiPuKdrDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2LWJ0biBuZXh0XCIgKGNsaWNrKT1cIm5leHRFbnRpdHkoJGV2ZW50KVwiIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogZW50aXR5SWR4ID49IGVudGl0eUNvdW50fVwiIHRpdGxlPVwie3sgJ21zZyNwcmV2aWV3Lm5leHRIaWdobGlnaHRCdXR0b25BbHRUZXh0JyB8IHNxTWVzc2FnZSB9fVwiPuKdrTwvc3Bhbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4tbGlzdFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIGVudGl0eUFjdGlvbnNcIiAoY2xpY2spPVwiZW50aXR5QWN0aW9uKGFjdGlvbiwgJGV2ZW50KVwiIFtkaXNhYmxlZF09XCJhY3Rpb24uZGlzYWJsZWRcIiBbaGlkZGVuXT1cImFjdGlvbi5oaWRkZW5cIiB0aXRsZT1cInt7IChhY3Rpb24udGl0bGUgfHwgJycpIHwgc3FNZXNzYWdlOnt2YWx1ZXM6IHt0eXBlOiBlbnRpdHlUeXBlLCB2YWx1ZTogZW50aXR5VmFsdWUsIGRpc3BsYXk6IGVudGl0eURpc3BsYXl9IH0gfX1cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImFjdGlvbi5pY29uXCIgY2xhc3M9XCJ7e2FjdGlvbi5pY29ufX1cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24udGV4dFwiPnt7IGFjdGlvbi50ZXh0IHwgc3FNZXNzYWdlOnt2YWx1ZXM6IHt0eXBlOiBlbnRpdHlUeXBlLCB2YWx1ZTogZW50aXR5VmFsdWUsIGRpc3BsYXk6IGVudGl0eURpc3BsYXl9IH0gfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24uaWNvbkFmdGVyXCIgY2xhc3M9XCJ7e2FjdGlvbi5pY29uQWZ0ZXJ9fVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNlbGVjdGVkVGV4dFwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBhY3Rpb24gb2Ygc2VsZWN0ZWRUZXh0QWN0aW9uc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwic2VsZWN0ZWRUZXh0QWN0aW9uKGFjdGlvbiwgJGV2ZW50KVwiIFtkaXNhYmxlZF09XCJhY3Rpb24uZGlzYWJsZWRcIiBbaGlkZGVuXT1cImFjdGlvbi5oaWRkZW5cIiB0aXRsZT1cInt7IChhY3Rpb24udGl0bGUgfHwgJycpIHwgc3FNZXNzYWdlOnt2YWx1ZXM6IHt0ZXh0OiBzZWxlY3RlZFRleHQuc2xpY2UoMCw1MCl9IH0gfX1cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImFjdGlvbi5pY29uXCIgY2xhc3M9XCJ7e2FjdGlvbi5pY29ufX1cIj48L3NwYW4+IDxzcGFuICpuZ0lmPVwiYWN0aW9uLnRleHRcIj57eyBhY3Rpb24udGV4dCB8IHNxTWVzc2FnZTp7dmFsdWVzOiB7dGV4dDogc2VsZWN0ZWRUZXh0LnNsaWNlKDAsNTApfSB9IH19PC9zcGFuPiA8c3BhbiAqbmdJZj1cImFjdGlvbi5pY29uQWZ0ZXJcIiBjbGFzcz1cInt7YWN0aW9uLmljb25BZnRlcn19XCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG4iXX0=