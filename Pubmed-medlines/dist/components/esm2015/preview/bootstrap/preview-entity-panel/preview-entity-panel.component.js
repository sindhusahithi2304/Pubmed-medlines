import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@sinequa/components/facet";
import * as i3 from "../preview-entity-facet/preview-entity-facet.component";
function BsPreviewEntityPanelComponent_ng_container_0_sq_facet_card_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "sq-facet-card", 2);
    i0.ɵɵelementStart(1, "sq-preview-entity-facet", 3, 4);
    i0.ɵɵlistener("itemsChecked", function BsPreviewEntityPanelComponent_ng_container_0_sq_facet_card_1_Template_sq_preview_entity_facet_itemsChecked_1_listener($event) { i0.ɵɵrestoreView(_r6); const entity_r1 = i0.ɵɵnextContext().$implicit; const ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.itemsChecked(entity_r1, $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entity_r1 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("title", ctx_r2.entityDisplay(entity_r1))("icon", ctx_r2.entityIcon(entity_r1))("collapsible", ctx_r2.collapsible)("buttonsStyle", ctx_r2.style);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("entity", entity_r1)("data", ctx_r2.entityValues(entity_r1))("previewData", ctx_r2.previewData)("previewDocument", ctx_r2.previewDocument)("startUnchecked", ctx_r2.startUnchecked[entity_r1]);
} }
function BsPreviewEntityPanelComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsPreviewEntityPanelComponent_ng_container_0_sq_facet_card_1_Template, 3, 9, "sq-facet-card", 1);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const entity_r1 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.entityValues(entity_r1).length);
} }
export class BsPreviewEntityPanelComponent {
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
BsPreviewEntityPanelComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewEntityPanelComponent, selectors: [["sq-preview-entity-panel"]], inputs: { previewData: "previewData", previewDocument: "previewDocument", style: "style", collapsible: "collapsible", startUnchecked: "startUnchecked", entities: "entities" }, outputs: { facetChecked: "facetChecked" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[4, "ngFor", "ngForOf"], ["class", "d-block my-3", 3, "title", "icon", "collapsible", "buttonsStyle", 4, "ngIf"], [1, "d-block", "my-3", 3, "title", "icon", "collapsible", "buttonsStyle"], [3, "entity", "data", "previewData", "previewDocument", "startUnchecked", "itemsChecked"], ["facet", ""]], template: function BsPreviewEntityPanelComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsPreviewEntityPanelComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngForOf", ctx._entities);
    } }, directives: [i1.NgForOf, i1.NgIf, i2.BsFacetCard, i3.BsPreviewEntityFacetComponent], styles: [""] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsPreviewEntityPanelComponent, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy1lbnRpdHktcGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvcHJldmlldy8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9wcmV2aWV3LWVudGl0eS1wYW5lbC9wcmV2aWV3LWVudGl0eS1wYW5lbC5jb21wb25lbnQudHMiLCJib290c3RyYXAvcHJldmlldy1lbnRpdHktcGFuZWwvcHJldmlldy1lbnRpdHktcGFuZWwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7OztJQ0M5RSx3Q0FDSTtJQUFBLHFEQU9BO0lBREksa1VBQTZDO0lBQ2pELGlCQUEwQjtJQUM5QixpQkFBZ0I7Ozs7SUFUd0QsdURBQStCLHNDQUFBLG1DQUFBLDhCQUFBO0lBRS9GLGVBQWlCO0lBQWpCLGtDQUFpQix3Q0FBQSxtQ0FBQSwyQ0FBQSxvREFBQTs7O0lBSDdCLDZCQUNJO0lBQUEsaUhBU2dCO0lBQ3BCLDBCQUFlOzs7O0lBVkssZUFBaUM7SUFBakMsNERBQWlDOztBRFFyRCxNQUFNLE9BQU8sNkJBQTZCO0lBdUN4QztRQXRCQTs7V0FFRztRQUNNLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBRXJDOztXQUVHO1FBQ00sbUJBQWMsR0FBZ0MsRUFBRSxDQUFDO1FBTzFEOztXQUVHO1FBQ08saUJBQVksR0FBRyxJQUFJLFlBQVksRUFBc0MsQ0FBQztRQUVoRixjQUFTLEdBQWEsRUFBRSxDQUFDO0lBRVQsQ0FBQztJQUVqQjs7T0FFRztJQUNILFdBQVc7UUFDVCxJQUFHLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsRUFBRSwrQ0FBK0M7WUFDdEYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ2hDO2FBQ0ksSUFBRyxJQUFJLENBQUMsV0FBVyxFQUFDLEVBQUUsd0RBQXdEO1lBQ2pGLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxLQUFLLG1CQUFtQixDQUFDLENBQUM7U0FDckg7YUFDSSxFQUFHLG9CQUFvQjtZQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJLENBQUMsTUFBYztRQUNqQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVEOzs7T0FHRztJQUNILGFBQWEsQ0FBQyxNQUFjO1FBQzFCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQywwQkFBMEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLG9CQUFvQixJQUFJLE1BQU0sQ0FBQztJQUMxRyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsVUFBVSxDQUFDLE1BQWM7UUFDdkIsT0FBTyxVQUFVLEdBQUMsTUFBTSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxZQUFZLENBQUMsTUFBYztRQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsWUFBWSxDQUFDLE1BQWMsRUFBRSxPQUFnQjtRQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7MEdBL0ZVLDZCQUE2QjtrRUFBN0IsNkJBQTZCO1FDVDFDLGdHQVdlOztRQVhrQix1Q0FBWTs7a0REU2hDLDZCQUE2QjtjQUx6QyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsV0FBVyxFQUFFLHVDQUF1QztnQkFDcEQsU0FBUyxFQUFFLENBQUMsdUNBQXVDLENBQUM7YUFDckQ7c0NBTVUsV0FBVztrQkFBbkIsS0FBSztZQUtHLGVBQWU7a0JBQXZCLEtBQUs7WUFLRyxLQUFLO2tCQUFiLEtBQUs7WUFLRyxXQUFXO2tCQUFuQixLQUFLO1lBS0csY0FBYztrQkFBdEIsS0FBSztZQUtHLFFBQVE7a0JBQWhCLEtBQUs7WUFLSSxZQUFZO2tCQUFyQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2F0ZWdvcnlIaWdobGlnaHREYXRhLCBIaWdobGlnaHRWYWx1ZSwgUHJldmlld0RhdGEgfSBmcm9tICdAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlcyc7XG5pbXBvcnQgeyBQcmV2aWV3RG9jdW1lbnQgfSBmcm9tICcuLi8uLi9wcmV2aWV3LWRvY3VtZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc3EtcHJldmlldy1lbnRpdHktcGFuZWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJldmlldy1lbnRpdHktcGFuZWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wcmV2aWV3LWVudGl0eS1wYW5lbC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJzUHJldmlld0VudGl0eVBhbmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAvKipcbiAgICogUHJldmlldyBkYXRhXG4gICAqL1xuICBASW5wdXQoKSBwcmV2aWV3RGF0YTogUHJldmlld0RhdGE7XG5cbiAgLyoqXG4gICAqIFByZXZpZXcgZG9jdW1lbnRcbiAgICovXG4gIEBJbnB1dCgpIHByZXZpZXdEb2N1bWVudDogUHJldmlld0RvY3VtZW50O1xuXG4gIC8qKlxuICAgKiBXaGF0IGlzIHRoZSBzdHlsZSBvZiB0aGUgZmFjZXRzXG4gICAqL1xuICBASW5wdXQoKSBzdHlsZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBmYWNldHMgYXJlIGNvbGxhcHNpYmxlXG4gICAqL1xuICBASW5wdXQoKSBjb2xsYXBzaWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIEFsbG93cyB0byB1bmNoZWNrIGFsbCBpdGVtcyBmcm9tIHNwZWNpZmljIGZhY2V0c1xuICAgKi9cbiAgQElucHV0KCkgc3RhcnRVbmNoZWNrZWQ6IHtbZW50aXR5OiBzdHJpbmddOiBib29sZWFufSA9IHt9O1xuXG4gIC8qKlxuICAgKiBUaGUgbGlzdCBvZiBlbnRpdGllcyB0byBkaXNwbGF5IChpZiBpZ25vcmVkLCB3aWxsIGJlIGRlZHVjdGVkIGZyb20gdGhlIHByZXZpZXcgZGF0YSlcbiAgICovXG4gIEBJbnB1dCgpIGVudGl0aWVzOiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogVHJpZ2dlcnMgYW4gZXZlbnQgd2hlbiBjaGVjayBhbGwgLyBjaGVjayBub25lIGlzIHVzZSBpbiBhIGZhY2V0XG4gICAqL1xuICBAT3V0cHV0KCkgZmFjZXRDaGVja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7ZW50aXR5OiBzdHJpbmcsIGNoZWNrZWQ6IGJvb2xlYW59PigpO1xuXG4gIF9lbnRpdGllczogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8qKlxuICAgKiBFeHRyYWN0cyB0aGUgbGlzdCBvZiBlbnRpdGllcyBmcm9tIHRoZSBwcmV2aWV3IGRhdGFcbiAgICovXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmKHRoaXMuZW50aXRpZXMgJiYgISF0aGlzLnByZXZpZXdEYXRhKXsgLy8gSWYgdGhlIGxpc3Qgb2YgZW50aXRpZXMgaXMgcHJvdmlkZWQgYXMgaW5wdXRcbiAgICAgIHRoaXMuX2VudGl0aWVzID0gdGhpcy5lbnRpdGllcztcbiAgICB9XG4gICAgZWxzZSBpZih0aGlzLnByZXZpZXdEYXRhKXsgLy8gVGhlIGxpc3Qgb2YgZW50aXRpZXMgaXMgZGVkdWNlZCBmcm9tIHRoZSBwcmV2aWV3IGRhdGFcbiAgICAgIHRoaXMuX2VudGl0aWVzID0gT2JqZWN0LmtleXModGhpcy5wcmV2aWV3RGF0YS5oaWdobGlnaHRzUGVyQ2F0ZWdvcnkpLmZpbHRlcih2YWx1ZSA9PiB2YWx1ZSAhPT0gXCJleHRyYWN0c2xvY2F0aW9uc1wiKTtcbiAgICB9XG4gICAgZWxzZSB7ICAvLyBObyBlbnRpdHkgdG8gc2hvd1xuICAgICAgdGhpcy5fZW50aXRpZXMgPSBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBkYXRhIGZvciBhIHNwZWNpZmljIGVudGl0eSBjYXRlZ29yeVxuICAgKiBAcGFyYW0gZW50aXR5XG4gICAqL1xuICBkYXRhKGVudGl0eTogc3RyaW5nKTogQ2F0ZWdvcnlIaWdobGlnaHREYXRhIHtcbiAgICByZXR1cm4gdGhpcy5wcmV2aWV3RGF0YS5oaWdobGlnaHRzUGVyQ2F0ZWdvcnlbZW50aXR5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBkaXNwbGF5IHZhbHVlIG9mIGEgc3BlY2lmaWMgZW50aXR5XG4gICAqIEBwYXJhbSBlbnRpdHlcbiAgICovXG4gIGVudGl0eURpc3BsYXkoZW50aXR5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmRhdGEoZW50aXR5KS5jYXRlZ29yeURpc3BsYXlMYWJlbFBsdXJhbCB8fCB0aGlzLmRhdGEoZW50aXR5KS5jYXRlZ29yeURpc3BsYXlMYWJlbCB8fCBlbnRpdHk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaWNvbiBvZiBhIHNwZWNpZmljIGVudGl0eVxuICAgKiBAcGFyYW0gZW50aXR5XG4gICAqL1xuICBlbnRpdHlJY29uKGVudGl0eTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCJzcS1pY29uLVwiK2VudGl0eTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsaXN0IG9mIHZhbHVlcyBvZiBhIHNwZWNpZmljIGVudGl0eVxuICAgKiBAcGFyYW0gZW50aXR5XG4gICAqL1xuICBlbnRpdHlWYWx1ZXMoZW50aXR5OiBzdHJpbmcpOiBIaWdobGlnaHRWYWx1ZVtdIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhKGVudGl0eSkudmFsdWVzO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCBieSBjaGlsZCBmYWNldCB3aGVuIGl0ZW1zIGFyZSBjaGVja2VkL3VuY2hlY2tlZFxuICAgKiBAcGFyYW0gZW50aXR5XG4gICAqIEBwYXJhbSBjaGVja2VkXG4gICAqL1xuICBpdGVtc0NoZWNrZWQoZW50aXR5OiBzdHJpbmcsIGNoZWNrZWQ6IGJvb2xlYW4pe1xuICAgIHRoaXMuZmFjZXRDaGVja2VkLm5leHQoe2VudGl0eTogZW50aXR5LCBjaGVja2VkOiBjaGVja2VkfSk7XG4gIH1cblxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZW50aXR5IG9mIF9lbnRpdGllc1wiPlxuICAgIDxzcS1mYWNldC1jYXJkICpuZ0lmPVwiZW50aXR5VmFsdWVzKGVudGl0eSkubGVuZ3RoXCIgY2xhc3M9XCJkLWJsb2NrIG15LTNcIiBbdGl0bGVdPVwiZW50aXR5RGlzcGxheShlbnRpdHkpXCIgW2ljb25dPVwiZW50aXR5SWNvbihlbnRpdHkpXCIgW2NvbGxhcHNpYmxlXT1cImNvbGxhcHNpYmxlXCIgW2J1dHRvbnNTdHlsZV09XCJzdHlsZVwiPlxuICAgICAgICA8c3EtcHJldmlldy1lbnRpdHktZmFjZXQgI2ZhY2V0IFxuICAgICAgICAgICAgW2VudGl0eV09XCJlbnRpdHlcIiBcbiAgICAgICAgICAgIFtkYXRhXT1cImVudGl0eVZhbHVlcyhlbnRpdHkpXCIgXG4gICAgICAgICAgICBbcHJldmlld0RhdGFdPVwicHJldmlld0RhdGFcIiBcbiAgICAgICAgICAgIFtwcmV2aWV3RG9jdW1lbnRdPVwicHJldmlld0RvY3VtZW50XCJcbiAgICAgICAgICAgIFtzdGFydFVuY2hlY2tlZF09XCJzdGFydFVuY2hlY2tlZFtlbnRpdHldXCJcbiAgICAgICAgICAgIChpdGVtc0NoZWNrZWQpPVwiaXRlbXNDaGVja2VkKGVudGl0eSwgJGV2ZW50KVwiPlxuICAgICAgICA8L3NxLXByZXZpZXctZW50aXR5LWZhY2V0PlxuICAgIDwvc3EtZmFjZXQtY2FyZD5cbjwvbmctY29udGFpbmVyPiJdfQ==