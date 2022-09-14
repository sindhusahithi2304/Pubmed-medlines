import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/components/utils";
import * as i4 from "@sinequa/core/intl";
function BsPreviewEntityFacetComponent_div_1_span_8_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵlistener("click", function BsPreviewEntityFacetComponent_div_1_span_8_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r7); const value_r2 = i0.ɵɵnextContext().$implicit; const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.prevEntity(value_r2); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelement(2, "i", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 1, "msg#preview.previousHighlightButtonAltText"));
} }
function BsPreviewEntityFacetComponent_div_1_span_9_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵlistener("click", function BsPreviewEntityFacetComponent_div_1_span_9_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r10); const value_r2 = i0.ɵɵnextContext().$implicit; const ctx_r8 = i0.ɵɵnextContext(); return ctx_r8.nextEntity(value_r2); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelement(2, "i", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 1, "msg#preview.nextHighlightButtonAltText"));
} }
const _c0 = function (a0, a1) { return { "fa-check-square": a0, "fa-square": a1 }; };
function BsPreviewEntityFacetComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelementStart(1, "span", 4);
    i0.ɵɵlistener("click", function BsPreviewEntityFacetComponent_div_1_Template_span_click_1_listener() { i0.ɵɵrestoreView(_r12); const value_r2 = ctx.$implicit; const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.toggleEntity(value_r2); });
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
} if (rf & 2) {
    const value_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(8, _c0, !ctx_r0.entityHidden(value_r2), ctx_r0.entityHidden(value_r2)));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 5, value_r2.displayValue, ctx_r0.column));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.entityCount(value_r2));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.previewDocument);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.previewDocument);
} }
function BsPreviewEntityFacetComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵelementStart(1, "a", 13);
    i0.ɵɵlistener("click", function BsPreviewEntityFacetComponent_div_2_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r14); const ctx_r13 = i0.ɵɵnextContext(); return ctx_r13.showAll(); });
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(2, 2, "msg#preview.showAll"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 4, "msg#preview.showAll"));
} }
export class BsPreviewEntityFacetComponent extends AbstractFacet {
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
BsPreviewEntityFacetComponent.ɵfac = function BsPreviewEntityFacetComponent_Factory(t) { return new (t || BsPreviewEntityFacetComponent)(i0.ɵɵdirectiveInject(i1.AppService)); };
BsPreviewEntityFacetComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewEntityFacetComponent, selectors: [["sq-preview-entity-facet"]], inputs: { entity: "entity", data: "data", previewData: "previewData", previewDocument: "previewDocument", startUnchecked: "startUnchecked" }, outputs: { itemsChecked: "itemsChecked" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 3, vars: 2, consts: [[1, "list-group", "list-group-flush", "entity-facet"], ["class", "list-group-item align-items-center border-0 py-1 px-3 d-flex", 4, "ngFor", "ngForOf"], ["class", "list-group-item border-0 py-1 text-center", 4, "ngIf"], [1, "list-group-item", "align-items-center", "border-0", "py-1", "px-3", "d-flex"], [1, "text-muted", "px-1", "cursor-pointer", 3, "click"], [1, "far", 3, "ngClass"], [1, "mr-auto", "mx-1"], [1, "text-muted", "small", "mx-1"], ["class", "text-muted px-1 cursor-pointer", 3, "title", "click", 4, "ngIf"], [1, "text-muted", "px-1", "cursor-pointer", 3, "title", "click"], [1, "fas", "fa-chevron-left"], [1, "fas", "fa-chevron-right"], [1, "list-group-item", "border-0", "py-1", "text-center"], ["href", "#", 1, "text-muted", "small", 3, "title", "click"]], template: function BsPreviewEntityFacetComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, BsPreviewEntityFacetComponent_div_1_Template, 10, 11, "div", 1);
        i0.ɵɵtemplate(2, BsPreviewEntityFacetComponent_div_2_Template, 5, 6, "div", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.entityValues);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.data.length > ctx.count);
    } }, directives: [i2.NgForOf, i2.NgIf, i2.NgClass], pipes: [i3.ValuePipe, i4.MessagePipe], styles: [".cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.entity-facet[_ngcontent-%COMP%]{font-size:.9em}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsPreviewEntityFacetComponent, [{
        type: Component,
        args: [{
                selector: 'sq-preview-entity-facet',
                templateUrl: './preview-entity-facet.component.html',
                styleUrls: ['./preview-entity-facet.component.scss']
            }]
    }], function () { return [{ type: i1.AppService }]; }, { entity: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy1lbnRpdHktZmFjZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvcHJldmlldy8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9wcmV2aWV3LWVudGl0eS1mYWNldC9wcmV2aWV3LWVudGl0eS1mYWNldC5jb21wb25lbnQudHMiLCJib290c3RyYXAvcHJldmlldy1lbnRpdHktZmFjZXQvcHJldmlldy1lbnRpdHktZmFjZXQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFHekcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7Ozs7SUNHNUMsK0JBQXdLO0lBQW5HLDZQQUEyQjs7SUFBd0Usd0JBQW1DO0lBQUEsaUJBQU87O0lBQWpILHFHQUFzRTs7OztJQUN2SywrQkFBb0s7SUFBL0YsOFBBQTJCOztJQUFvRSx3QkFBb0M7SUFBQSxpQkFBTzs7SUFBOUcsaUdBQWtFOzs7OztJQVB2Syw4QkFDSTtJQUFBLCtCQUNJO0lBRHlDLDRPQUE2QjtJQUN0RSx1QkFBMkc7SUFDL0csaUJBQU87SUFDUCwrQkFBMkI7SUFBQSxZQUF5Qzs7SUFBQSxpQkFBTztJQUMzRSwrQkFBb0M7SUFBQSxZQUF3QjtJQUFBLGlCQUFPO0lBQ25FLHNGQUFrTjtJQUNsTixzRkFBK007SUFDbk4saUJBQU07Ozs7SUFOaUIsZUFBdUY7SUFBdkYsbUhBQXVGO0lBRS9FLGVBQXlDO0lBQXpDLGdGQUF5QztJQUNoQyxlQUF3QjtJQUF4QixrREFBd0I7SUFDckQsZUFBcUI7SUFBckIsNkNBQXFCO0lBQ3JCLGVBQXFCO0lBQXJCLDZDQUFxQjs7OztJQUVoQywrQkFDSTtJQUFB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Y0FBYyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUU7d0JBQzdDLElBQUksY0FBYyxLQUFLLEtBQUssRUFBRTs0QkFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzt5QkFDeEQ7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7MEdBbFFVLDZCQUE2QjtrRUFBN0IsNkJBQTZCO1FDWjFDLDhCQUNJO1FBQUEsZ0ZBUU07UUFDTiw4RUFFTTtRQUNWLGlCQUFNOztRQVowRixlQUFlO1FBQWYsMENBQWU7UUFTbkQsZUFBeUI7UUFBekIsa0RBQXlCOztrRERFeEUsNkJBQTZCO2NBTHpDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxXQUFXLEVBQUUsdUNBQXVDO2dCQUNwRCxTQUFTLEVBQUUsQ0FBQyx1Q0FBdUMsQ0FBQzthQUNyRDs2REFFVSxNQUFNO2tCQUFkLEtBQUs7WUFDRyxJQUFJO2tCQUFaLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csZUFBZTtrQkFBdkIsS0FBSztZQUNHLGNBQWM7a0JBQXRCLEtBQUs7WUFDSSxZQUFZO2tCQUFyQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIaWdobGlnaHRWYWx1ZSwgUHJldmlld0RhdGEsIENDQ29sdW1uIH0gZnJvbSAnQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXMnO1xuaW1wb3J0IHsgUHJldmlld0RvY3VtZW50IH0gZnJvbSAnLi4vLi4vcHJldmlldy1kb2N1bWVudCc7XG5pbXBvcnQgeyBBYnN0cmFjdEZhY2V0IH0gZnJvbSAnQHNpbmVxdWEvY29tcG9uZW50cy9mYWNldCc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAc2luZXF1YS9jb21wb25lbnRzL2FjdGlvbic7XG5pbXBvcnQgeyBBcHBTZXJ2aWNlIH0gZnJvbSAnQHNpbmVxdWEvY29yZS9hcHAtdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzcS1wcmV2aWV3LWVudGl0eS1mYWNldCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcmV2aWV3LWVudGl0eS1mYWNldC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3ByZXZpZXctZW50aXR5LWZhY2V0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQnNQcmV2aWV3RW50aXR5RmFjZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZhY2V0IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBlbnRpdHk6IHN0cmluZzsgIC8vIFJlcXVpcmVkIGZyb20gaW5pdFxuICBASW5wdXQoKSBkYXRhOiBIaWdobGlnaHRWYWx1ZVtdOyAgLy8gUmVxdWlyZWQgZnJvbSBpbml0XG4gIEBJbnB1dCgpIHByZXZpZXdEYXRhOiBQcmV2aWV3RGF0YTsgIC8vIFJlcXVpcmVkIGZyb20gaW5pdCBhbmQgZG9lcyBub3QgY2hhbmdlIChmYWNldCBpcyByZWJ1aWx0IGlmIGl0IGRvZXMpXG4gIEBJbnB1dCgpIHByZXZpZXdEb2N1bWVudDogUHJldmlld0RvY3VtZW50OyAgLy8gTWF5IGJlIG51bGwgYXQgdGhlIHN0YXJ0XG4gIEBJbnB1dCgpIHN0YXJ0VW5jaGVja2VkOiBib29sZWFuO1xuICBAT3V0cHV0KCkgaXRlbXNDaGVja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIGNvdW50OiBudW1iZXIgPSAxMDtcbiAgc29ydEZyZXE6IGJvb2xlYW4gPSB0cnVlO1xuICBoaWRkZW4gPSBuZXcgTWFwPHN0cmluZywgYm9vbGVhbj4oKTtcbiAgbmF2ID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcbiAgY29sdW1uOiBDQ0NvbHVtbiB8IHVuZGVmaW5lZDtcblxuICBjaGVja0FjdGlvbjogQWN0aW9uO1xuICBzb3J0RnJlcUFjdGlvbjogQWN0aW9uO1xuICBzb3J0QWxwaGFBY3Rpb246IEFjdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFwcFNlcnZpY2U6QXBwU2VydmljZVxuICApIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5jaGVja0FjdGlvbiA9IG5ldyBBY3Rpb24oe1xuICAgICAgaWNvbjogXCJmYXIgZmEtY2hlY2stc3F1YXJlXCIsXG4gICAgICB0aXRsZTogXCJtc2cjcHJldmlldy5oaWdobGlnaHRGaWx0ZXJzLmtlZXBOb25lXCIsXG4gICAgICBhY3Rpb246IHRoaXMudW5zZWxlY3RBbGwsXG4gICAgICB1cGRhdGVyOiAoYWN0aW9uOiBBY3Rpb24pID0+IHtcbiAgICAgICAgbGV0IGZvdW5kSGlkZGVuID0gZmFsc2U7XG4gICAgICAgIGxldCBmb3VuZE5vdEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgICAgZm91bmRIaWRkZW4gPSBmb3VuZEhpZGRlbiB8fCB0aGlzLmhpZGRlbi5nZXQodmFsdWUudmFsdWUpIHx8IGZhbHNlO1xuICAgICAgICAgIGZvdW5kTm90SGlkZGVuID0gZm91bmROb3RIaWRkZW4gfHwgIXRoaXMuaGlkZGVuLmdldCh2YWx1ZS52YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZighZm91bmRIaWRkZW4peyAvLyBBbGwgaXRlbXMgc2VsZWN0ZWRcbiAgICAgICAgICBhY3Rpb24uYWN0aW9uID0gdGhpcy51bnNlbGVjdEFsbDtcbiAgICAgICAgICBhY3Rpb24uaWNvbiA9IFwiZmFyIGZhLWNoZWNrLXNxdWFyZVwiO1xuICAgICAgICAgIGFjdGlvbi50aXRsZSA9IFwibXNnI3ByZXZpZXcuaGlnaGxpZ2h0RmlsdGVycy5rZWVwTm9uZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoIWZvdW5kTm90SGlkZGVuKXsgLy8gQWxsIGl0ZW1zIHVuc2VsZWN0ZWRcbiAgICAgICAgICBhY3Rpb24uYWN0aW9uID0gdGhpcy5zZWxlY3RBbGw7XG4gICAgICAgICAgYWN0aW9uLmljb24gPSBcImZhciBmYS1zcXVhcmVcIjtcbiAgICAgICAgICBhY3Rpb24udGl0bGUgPSBcIm1zZyNwcmV2aWV3LmhpZ2hsaWdodEZpbHRlcnMua2VlcEFsbFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvLyBTb21lIGl0ZW1zIHNlbGVjdGVkXG4gICAgICAgICAgYWN0aW9uLmFjdGlvbiA9IHRoaXMuc2VsZWN0QWxsO1xuICAgICAgICAgIGFjdGlvbi5pY29uID0gXCJmYXIgZmEtY2hlY2stc3F1YXJlXCI7XG4gICAgICAgICAgYWN0aW9uLnRpdGxlID0gXCJtc2cjcHJldmlldy5oaWdobGlnaHRGaWx0ZXJzLmtlZXBBbGxcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc29ydEFscGhhQWN0aW9uID0gbmV3IEFjdGlvbih7XG4gICAgICBpY29uOiBcImZhcyBmYS1zb3J0LWFscGhhLWRvd25cIixcbiAgICAgIHRpdGxlOiBcIm1zZyNwcmV2aWV3LnNvcnRBbHBoYWJldGljYWxseVwiLFxuICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuc29ydEZyZXEgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnNvcnRGcmVxQWN0aW9uID0gbmV3IEFjdGlvbih7XG4gICAgICBpY29uOiBcImZhcyBmYS1zb3J0LWFtb3VudC1kb3duXCIsXG4gICAgICB0aXRsZTogXCJtc2cjcHJldmlldy5zb3J0RnJlcXVlbmN5XCIsXG4gICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgdGhpcy5zb3J0RnJlcSA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXQgYWN0aW9ucygpOiBBY3Rpb25bXXtcbiAgICBjb25zdCBhY3Rpb25zOiBBY3Rpb25bXSA9IFtdO1xuICAgIGlmKHRoaXMucHJldmlld0RvY3VtZW50KXtcbiAgICAgIGFjdGlvbnMucHVzaCh0aGlzLmNoZWNrQWN0aW9uKTtcbiAgICB9XG4gICAgYWN0aW9ucy5wdXNoKHRoaXMuc29ydEZyZXE/IHRoaXMuc29ydEFscGhhQWN0aW9uIDogdGhpcy5zb3J0RnJlcUFjdGlvbik7XG4gICAgcmV0dXJuIGFjdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogVW5jaGVjayBpdGVtcyBpZiBuZWVkZWRcbiAgICovXG4gIG5nT25Jbml0KCl7XG4gICAgaWYodGhpcy5zdGFydFVuY2hlY2tlZCl7XG4gICAgICB0aGlzLnVuc2VsZWN0QWxsKCk7XG4gICAgICB0aGlzLmNoZWNrQWN0aW9uLnVwZGF0ZSgpO1xuICAgIH1cbiAgICB0aGlzLmNvbHVtbiA9IHRoaXMuYXBwU2VydmljZS5nZXRDb2x1bW4odGhpcy5lbnRpdHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpbmNlIHRoZSBwcmV2aWV3IGRvY3VtZW50IGNvbWVzIGFmdGVyIHRoZSBwcmV2aWV3IGRhdGEsIHdlIG5lZWQgdG8gd2FpdCBmb3IgdGhhdCBjaGFuZ2VcbiAgICogYW5kIGFwcGx5IHRoZSBoaWRkZW4gc3RhdGUgaW4gdGhlIGRvY3VtZW50LlxuICAgKiBAcGFyYW0gY2hhbmdlc1xuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmKGNoYW5nZXNbXCJwcmV2aWV3RG9jdW1lbnRcIl0pe1xuICAgICAgaWYodGhpcy5wcmV2aWV3RG9jdW1lbnQpe1xuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCh2YWwgPT4ge1xuICAgICAgICAgIGlmKHRoaXMuaGlkZGVuLmdldCh2YWwudmFsdWUpKXtcbiAgICAgICAgICAgIHRoaXMucHJldmlld0RvY3VtZW50LnRvZ2dsZUhpZ2hsaWdodCh0aGlzLmVudGl0eSwgZmFsc2UsIHZhbC52YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZW50aXRpZXMgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBmYWNldCwgcGVyZm9ybWluZyB0cnVuY2F0aW9uIGFuZCBzb3J0aW5nIG9mIHRoZSBpbnB1dCBsaXN0XG4gICAqL1xuICBnZXQgZW50aXR5VmFsdWVzKCk6IEhpZ2hsaWdodFZhbHVlW10ge1xuICAgIHJldHVybiB0aGlzLmRhdGEuc29ydCgoYSxiKSA9PiB7XG4gICAgICBjb25zdCBkID0gYi5sb2NhdGlvbnMubGVuZ3RoIC0gYS5sb2NhdGlvbnMubGVuZ3RoO1xuICAgICAgcmV0dXJuIHRoaXMuc29ydEZyZXEgJiYgZCAhPT0gMD8gIGQgOiBhLmRpc3BsYXlWYWx1ZS5sb2NhbGVDb21wYXJlKGIuZGlzcGxheVZhbHVlKTtcbiAgICB9KS5zbGljZSgwLCB0aGlzLmNvdW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2Ygb2NjdXJyZW5jZXMgb2YgYSBnaXZlbiB2YWx1ZS5cbiAgICogSWYgdGhlIHVzZXIgdXNlZCB0aGUgZmFjZXQgdG8gbmF2aWdhdGUsIHRoZSBmb3JtYXQgaXMgXCJpIC8gY291bnRcIlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIGVudGl0eUNvdW50KHZhbHVlOiBIaWdobGlnaHRWYWx1ZSk6IHN0cmluZyB7XG4gICAgbGV0IGNvdW50ID0gdmFsdWUubG9jYXRpb25zLmxlbmd0aCArIFwiXCI7XG4gICAgY29uc3QgbmF2VmFsdWUgPSB0aGlzLm5hdi5nZXQodmFsdWUudmFsdWUpO1xuICAgIGlmKG5hdlZhbHVlICE9PSB1bmRlZmluZWQpe1xuICAgICAgY291bnQgPSAobmF2VmFsdWUrMSkgKyBcIiAvIFwiICsgY291bnQ7XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gd2hldGhlciB0aGUgZW50aXR5IGlzIGhpZGRlbiAodW5jaGVja2VkKSBvciBub3RcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBlbnRpdHlIaWRkZW4odmFsdWU6IEhpZ2hsaWdodFZhbHVlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5oaWRkZW4uZ2V0KHZhbHVlLnZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyBhbGwgdGhlIGVudGl0aWVzIGluIHRoZSBsaXN0XG4gICAqL1xuICBzaG93QWxsKCl7XG4gICAgdGhpcy5jb3VudCA9IHRoaXMuZGF0YS5sZW5ndGg7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIGhpZGRlbiAoY2hlY2tlZC91bmNoZWNrZWQpIHN0YXRlIG9mIGEgdmFsdWUgaW4gdGhlIGxpc3QuXG4gICAqIE1vZGlmaWVzIHRoZSBwcm92aWRlZCBwcmV2aWV3IGRvY3VtZW50LlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHRvZ2dsZUVudGl0eSh2YWx1ZTogSGlnaGxpZ2h0VmFsdWUpe1xuICAgIHRoaXMuaGlkZGVuLnNldCh2YWx1ZS52YWx1ZSwgIXRoaXMuaGlkZGVuLmdldCh2YWx1ZS52YWx1ZSkpO1xuICAgIGlmKHRoaXMucHJldmlld0RvY3VtZW50KXtcbiAgICAgIHRoaXMucHJldmlld0RvY3VtZW50LnRvZ2dsZUhpZ2hsaWdodCh0aGlzLmVudGl0eSwgIXRoaXMuaGlkZGVuLmdldCh2YWx1ZS52YWx1ZSksIHZhbHVlLnZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5jaGVja0FjdGlvbi51cGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnNlbGVjdCBhbGwgZW50aXRpZXMgKHNldCBoaWRkZW4pXG4gICAqL1xuICB1bnNlbGVjdEFsbCA9IChhY3Rpb24/OiBBY3Rpb24pID0+IHtcbiAgICBpZih0aGlzLnByZXZpZXdEb2N1bWVudCl7XG4gICAgICB0aGlzLnByZXZpZXdEb2N1bWVudC50b2dnbGVIaWdobGlnaHQodGhpcy5lbnRpdHksIGZhbHNlKTtcbiAgICB9XG4gICAgdGhpcy5kYXRhLmZvckVhY2goKHZhbHVlKT0+IHtcbiAgICAgIHRoaXMuaGlkZGVuLnNldCh2YWx1ZS52YWx1ZSwgdHJ1ZSk7XG4gICAgfSk7XG4gICAgaWYoYWN0aW9uKXtcbiAgICAgIGFjdGlvbi51cGRhdGUoKTtcbiAgICAgIHRoaXMuaXRlbXNDaGVja2VkLm5leHQoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgYWxsIGVudGl0aWVzICh1bnNldCBoaWRkZW4pXG4gICAqL1xuICBzZWxlY3RBbGwgPSAoYWN0aW9uOiBBY3Rpb24pID0+IHtcbiAgICBpZih0aGlzLnByZXZpZXdEb2N1bWVudCl7XG4gICAgICB0aGlzLnByZXZpZXdEb2N1bWVudC50b2dnbGVIaWdobGlnaHQodGhpcy5lbnRpdHksIHRydWUpO1xuICAgIH1cbiAgICB0aGlzLmRhdGEuZm9yRWFjaCgodmFsdWUpPT4ge1xuICAgICAgdGhpcy5oaWRkZW4uc2V0KHZhbHVlLnZhbHVlLCBmYWxzZSk7XG4gICAgfSk7XG4gICAgaWYoYWN0aW9uKXtcbiAgICAgIGFjdGlvbi51cGRhdGUoKTtcbiAgICAgIHRoaXMuaXRlbXNDaGVja2VkLm5leHQodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlIHRvIHRoZSBuZXh0IHZhbHVlIG9mIHRoaXMgZW50aXR5LlxuICAgKiBNb2RpZmllcyB0aGUgcHJvdmlkZWQgcHJldmlldyBkb2N1bWVudC5cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBuZXh0RW50aXR5KHZhbHVlOiBIaWdobGlnaHRWYWx1ZSl7XG4gICAgbGV0IG5hdlZhbHVlID0gdGhpcy5uYXYuZ2V0KHZhbHVlLnZhbHVlKTtcbiAgICBpZihuYXZWYWx1ZSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgIG5hdlZhbHVlID0gMDtcbiAgICAgIHRoaXMubmF2LnNldCh2YWx1ZS52YWx1ZSwgbmF2VmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmKG5hdlZhbHVlIDwgdmFsdWUubG9jYXRpb25zLmxlbmd0aC0xKXtcbiAgICAgIG5hdlZhbHVlKys7XG4gICAgICB0aGlzLm5hdi5zZXQodmFsdWUudmFsdWUsIG5hdlZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RFbnRpdHkodGhpcy5lbnRpdHksIHZhbHVlLnZhbHVlLCBuYXZWYWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGUgdG8gdGhlIG5leHQgdmFsdWUgb2YgdGhpcyBlbnRpdHkuXG4gICAqIE1vZGlmaWVzIHRoZSBwcm92aWRlZCBwcmV2aWV3IGRvY3VtZW50LlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHByZXZFbnRpdHkodmFsdWU6IEhpZ2hsaWdodFZhbHVlKXtcbiAgICBsZXQgbmF2VmFsdWUgPSB0aGlzLm5hdi5nZXQodmFsdWUudmFsdWUpO1xuICAgIGlmKG5hdlZhbHVlID09PSB1bmRlZmluZWQpe1xuICAgICAgbmF2VmFsdWUgPSAwO1xuICAgICAgdGhpcy5uYXYuc2V0KHZhbHVlLnZhbHVlLCBuYXZWYWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYobmF2VmFsdWUgPiAwKXtcbiAgICAgIG5hdlZhbHVlLS07XG4gICAgICB0aGlzLm5hdi5zZXQodmFsdWUudmFsdWUsIG5hdlZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RFbnRpdHkodGhpcy5lbnRpdHksIHZhbHVlLnZhbHVlLCBuYXZWYWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGUgdG8gdGhlIGdpdmVuIG9jY3VycmVuY2Ugb2YgYW4gZW50aXR5IGluIGEgc3BlY2lmaWMgY2F0ZWdvcnlcbiAgICogTW9kaWZpZXMgdGhlIHByb3ZpZGVkIHByZXZpZXcgZG9jdW1lbnQuXG4gICAqIEBwYXJhbSBjYXRlZ29yeVxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICogQHBhcmFtIGlcbiAgICovXG4gIHNlbGVjdEVudGl0eShjYXRlZ29yeTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBpOiBudW1iZXIpe1xuICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzLmdldEVudGl0eUluZGV4ZXMoY2F0ZWdvcnksIHZhbHVlKTtcbiAgICB0aGlzLnByZXZpZXdEb2N1bWVudC5zZWxlY3RIaWdobGlnaHQoY2F0ZWdvcnksIGluZGV4ZXNbaV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBmdW5jdGlvbiB0byBmaW5kIHRoZSBpbmRleGVzIG9mIGFsbCBvY2N1cnJlbmNlcyBvZiBhIGVudGl0eSB2YWx1ZSBpbiB0aGUgZG9jdW1lbnRcbiAgICogQHBhcmFtIGNhdGVnb3J5XG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBnZXRFbnRpdHlJbmRleGVzKGNhdGVnb3J5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpbmRleGVzOiBudW1iZXJbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcmV2aWV3RGF0YS5oaWdobGlnaHRzUGVyTG9jYXRpb25bJ2xlbmd0aCddOyBpKyspIHtcbiAgICAgIGNvbnN0IGhpZ2hsaWdodCA9IHRoaXMucHJldmlld0RhdGEuaGlnaGxpZ2h0c1BlckxvY2F0aW9uW2ldO1xuICAgICAgY29uc3QgY2F0ZWdvcmllcyA9IE9iamVjdC5rZXlzKGhpZ2hsaWdodC5wb3NpdGlvbkluQ2F0ZWdvcmllcyk7XG4gICAgICBmb3IgKGNvbnN0IGN1cnJlbnRDYXRlZ29yeSBvZiBjYXRlZ29yaWVzKSB7XG4gICAgICAgIGlmIChjdXJyZW50Q2F0ZWdvcnkgPT09IGNhdGVnb3J5KSB7XG4gICAgICAgICAgZm9yIChjb25zdCBoaWdobGlnaHRWYWx1ZSBvZiBoaWdobGlnaHQudmFsdWVzKSB7XG4gICAgICAgICAgICBpZiAoaGlnaGxpZ2h0VmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIGluZGV4ZXMucHVzaChoaWdobGlnaHQucG9zaXRpb25JbkNhdGVnb3JpZXNbY2F0ZWdvcnldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGluZGV4ZXM7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJsaXN0LWdyb3VwIGxpc3QtZ3JvdXAtZmx1c2ggZW50aXR5LWZhY2V0XCI+XG4gICAgPGRpdiBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbSBhbGlnbi1pdGVtcy1jZW50ZXIgYm9yZGVyLTAgcHktMSBweC0zIGQtZmxleFwiICpuZ0Zvcj1cImxldCB2YWx1ZSBvZiBlbnRpdHlWYWx1ZXNcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LW11dGVkIHB4LTEgY3Vyc29yLXBvaW50ZXJcIiAoY2xpY2spPVwidG9nZ2xlRW50aXR5KHZhbHVlKVwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXJcIiBbbmdDbGFzc109XCJ7J2ZhLWNoZWNrLXNxdWFyZSc6ICFlbnRpdHlIaWRkZW4odmFsdWUpLCAnZmEtc3F1YXJlJzogZW50aXR5SGlkZGVuKHZhbHVlKX1cIj48L2k+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJtci1hdXRvIG14LTFcIj57eyB2YWx1ZS5kaXNwbGF5VmFsdWUgfCBzcVZhbHVlOmNvbHVtbiB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LW11dGVkIHNtYWxsIG14LTFcIj57eyBlbnRpdHlDb3VudCh2YWx1ZSkgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwicHJldmlld0RvY3VtZW50XCIgY2xhc3M9XCJ0ZXh0LW11dGVkIHB4LTEgY3Vyc29yLXBvaW50ZXJcIiAoY2xpY2spPVwicHJldkVudGl0eSh2YWx1ZSlcIiB0aXRsZT1cInt7ICdtc2cjcHJldmlldy5wcmV2aW91c0hpZ2hsaWdodEJ1dHRvbkFsdFRleHQnIHwgc3FNZXNzYWdlIH19XCI+PGkgY2xhc3M9XCJmYXMgZmEtY2hldnJvbi1sZWZ0XCI+PC9pPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJwcmV2aWV3RG9jdW1lbnRcIiBjbGFzcz1cInRleHQtbXV0ZWQgcHgtMSBjdXJzb3ItcG9pbnRlclwiIChjbGljayk9XCJuZXh0RW50aXR5KHZhbHVlKVwiIHRpdGxlPVwie3sgJ21zZyNwcmV2aWV3Lm5leHRIaWdobGlnaHRCdXR0b25BbHRUZXh0JyB8IHNxTWVzc2FnZSB9fVwiPjxpIGNsYXNzPVwiZmFzIGZhLWNoZXZyb24tcmlnaHRcIj48L2k+PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gYm9yZGVyLTAgcHktMSB0ZXh0LWNlbnRlclwiICpuZ0lmPVwiZGF0YS5sZW5ndGggPiBjb3VudFwiPlxuICAgICAgICA8YSBjbGFzcz1cInRleHQtbXV0ZWQgc21hbGxcIiBocmVmPVwiI1wiIChjbGljayk9XCJzaG93QWxsKClcIiB0aXRsZT1cInt7ICdtc2cjcHJldmlldy5zaG93QWxsJyB8IHNxTWVzc2FnZSB9fVwiPnt7ICdtc2cjcHJldmlldy5zaG93QWxsJyB8IHNxTWVzc2FnZSB9fTwvYT5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuIl19