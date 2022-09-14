import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import { Action } from "@sinequa/components/action";
import { AbstractFacet } from "../../abstract-facet";
import { FormControl, FormGroup } from "@angular/forms";
import { of } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from "rxjs/operators";
import * as i0 from "@angular/core";
import * as i1 from "../../facet.service";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/components/action";
import * as i4 from "@angular/forms";
import * as i5 from "@sinequa/components/utils";
import * as i6 from "@sinequa/components/search";
import * as i7 from "@sinequa/core/intl";
const _c0 = function (a0) { return { items: a0, size: "sm" }; };
function BsFacetTree_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵelement(1, "div", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction1(1, _c0, ctx_r3.actions));
} }
function BsFacetTree_div_0_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵelementStart(1, "div", 11);
    i0.ɵɵelement(2, "input", 12);
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "sq-loading-bar", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("formGroup", ctx_r4.myGroup);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(3, 3, "msg#facet.searchPlaceholder"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("active", ctx_r4.searchActive);
} }
function BsFacetTree_div_0_div_3_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 17);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqNumber");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, item_r8.count));
} }
const _c1 = function (a0) { return { "terme": a0 }; };
function BsFacetTree_div_0_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵlistener("click", function BsFacetTree_div_0_div_3_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r12); const item_r8 = ctx.$implicit; const ctx_r11 = i0.ɵɵnextContext(2); return ctx_r11.selectItem(item_r8); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelementStart(2, "a", 15);
    i0.ɵɵlistener("click", function BsFacetTree_div_0_div_3_Template_a_click_2_listener($event) { i0.ɵɵrestoreView(_r12); const item_r8 = ctx.$implicit; const ctx_r13 = i0.ɵɵnextContext(2); return ctx_r13.filterItem(item_r8, $event); });
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵpipe(4, "slice");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "slice");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, BsFacetTree_div_0_div_3_span_7_Template, 3, 3, "span", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 4, "msg#facet.itemUnselect"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("title", i0.ɵɵpipeBind2(3, 6, "msg#facet.filterItem", i0.ɵɵpureFunction1(17, _c1, i0.ɵɵpipeBind3(4, 9, item_r8.$path, 1, -1))));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind3(6, 13, item_r8.$path, 1, -1));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r5.showCount && item_r8.count);
} }
function BsFacetTree_div_0_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 18);
    i0.ɵɵelementStart(1, "i");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "msg#facet.searchNoResult"));
} }
function BsFacetTree_div_0_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c2 = function (a0) { return { "scrollable": a0 }; };
function BsFacetTree_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtemplate(1, BsFacetTree_div_0_div_1_Template, 2, 3, "div", 3);
    i0.ɵɵtemplate(2, BsFacetTree_div_0_div_2_Template, 5, 5, "div", 4);
    i0.ɵɵtemplate(3, BsFacetTree_div_0_div_3_Template, 8, 19, "div", 5);
    i0.ɵɵtemplate(4, BsFacetTree_div_0_span_4_Template, 4, 3, "span", 6);
    i0.ɵɵtemplate(5, BsFacetTree_div_0_ng_container_5_Template, 1, 0, "ng-container", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    const _r1 = i0.ɵɵreference(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(7, _c2, ctx_r0.forceMaxHeight));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.displayActions && ctx_r0.actions);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.searchItems.selected);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.hiddenSelected);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.noResults);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", ctx_r0.data);
} }
function BsFacetTree_ng_template_1_ng_container_0_a_4_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 31);
} }
function BsFacetTree_ng_template_1_ng_container_0_a_4_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 32);
} }
function BsFacetTree_ng_template_1_ng_container_0_a_4_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 33);
} }
function BsFacetTree_ng_template_1_ng_container_0_a_4_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 27);
    i0.ɵɵlistener("click", function BsFacetTree_ng_template_1_ng_container_0_a_4_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r27); const item_r16 = i0.ɵɵnextContext().$implicit; const ctx_r25 = i0.ɵɵnextContext(2); return ctx_r25.open(item_r16, $event); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵtemplate(2, BsFacetTree_ng_template_1_ng_container_0_a_4_span_2_Template, 1, 0, "span", 28);
    i0.ɵɵtemplate(3, BsFacetTree_ng_template_1_ng_container_0_a_4_span_3_Template, 1, 0, "span", 29);
    i0.ɵɵtemplate(4, BsFacetTree_ng_template_1_ng_container_0_a_4_span_4_Template, 1, 0, "span", 30);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r16 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 4, item_r16["$opened"] ? "msg#facet.closeItem" : "msg#facet.openItem"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", item_r16["$opening"]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !item_r16["$opening"] && item_r16["$opened"]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !item_r16["$opening"] && !item_r16["$opened"]);
} }
function BsFacetTree_ng_template_1_ng_container_0_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 34);
} }
function BsFacetTree_ng_template_1_ng_container_0_i_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 35);
} }
function BsFacetTree_ng_template_1_ng_container_0_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 17);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqNumber");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r16 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, item_r16.count));
} }
function BsFacetTree_ng_template_1_ng_container_0_ng_container_12_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function BsFacetTree_ng_template_1_ng_container_0_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsFacetTree_ng_template_1_ng_container_0_ng_container_12_ng_container_1_Template, 1, 0, "ng-container", 7);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r16 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵnextContext(2);
    const _r1 = i0.ɵɵreference(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", item_r16);
} }
const _c3 = function (a0, a1, a2, a3) { return { "list-group-item-primary": a0, "list-group-item-success": a1, "list-group-item-action": a2, "filtered": a3 }; };
const _c4 = function (a0) { return { "margin-left.rem": a0 }; };
function BsFacetTree_ng_template_1_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r33 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "a", 20);
    i0.ɵɵlistener("click", function BsFacetTree_ng_template_1_ng_container_0_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r33); const item_r16 = ctx.$implicit; const ctx_r32 = i0.ɵɵnextContext(2); return ctx_r32.selectItem(item_r16); });
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementStart(3, "span", 21);
    i0.ɵɵtemplate(4, BsFacetTree_ng_template_1_ng_container_0_a_4_Template, 5, 6, "a", 22);
    i0.ɵɵtemplate(5, BsFacetTree_ng_template_1_ng_container_0_span_5_Template, 1, 0, "span", 23);
    i0.ɵɵelementStart(6, "a", 24);
    i0.ɵɵlistener("click", function BsFacetTree_ng_template_1_ng_container_0_Template_a_click_6_listener($event) { i0.ɵɵrestoreView(_r33); const item_r16 = ctx.$implicit; const ctx_r34 = i0.ɵɵnextContext(2); return ctx_r34.filterItem(item_r16, $event); });
    i0.ɵɵpipe(7, "sqValue");
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "sqValue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, BsFacetTree_ng_template_1_ng_container_0_i_10_Template, 1, 0, "i", 25);
    i0.ɵɵtemplate(11, BsFacetTree_ng_template_1_ng_container_0_span_11_Template, 3, 3, "span", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(12, BsFacetTree_ng_template_1_ng_container_0_ng_container_12_Template, 2, 2, "ng-container", 26);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r16 = ctx.$implicit;
    const ctx_r15 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction4(18, _c3, ctx_r15.isSelected(item_r16), ctx_r15.isFiltered(item_r16), !ctx_r15.isFiltered(item_r16), ctx_r15.isFiltered(item_r16)))("title", i0.ɵɵpipeBind1(2, 10, ctx_r15.isFiltered(item_r16) ? "msg#facet.selectedValue" : "msg#facet.itemSelect"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(23, _c4, item_r16["$level"] - 1));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r16["hasChildren"]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !item_r16["hasChildren"]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("title", i0.ɵɵpipeBind2(7, 12, item_r16, item_r16.$column));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(9, 15, item_r16, item_r16.$column), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r15.isFiltered(item_r16));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r15.showCount && item_r16.count);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r16["$opened"]);
} }
function BsFacetTree_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, BsFacetTree_ng_template_1_ng_container_0_Template, 13, 25, "ng-container", 19);
} if (rf & 2) {
    const items_r14 = ctx.items;
    i0.ɵɵproperty("ngForOf", items_r14);
} }
export class BsFacetTree extends AbstractFacet {
    constructor(facetService, changeDetectorRef) {
        super();
        this.facetService = facetService;
        this.changeDetectorRef = changeDetectorRef;
        this.showCount = true; // Show the number of occurrences
        this.allowExclude = true; // Allow to exclude selected items
        this.allowOr = true; // Allow to search various items in OR mode
        this.searchable = true; // Allow to search for items in the facet
        this.expandedLevel = 2;
        this.forceMaxHeight = true; // Allow to display a scrollbar automatically on long list items
        this.displayActions = false;
        this.subscriptions = [];
        // Sets to keep track of selected/excluded/filtered items
        this.filtered = new Set();
        this.selected = new Map();
        this.hiddenSelected = [];
        this.suggestDelay = 200;
        this.searchActive = false;
        this.noResults = false;
        // For each new node, set up properties necessary for display
        // This callback could also be used to filter or sorts nodes, etc.
        this.initNodes = (nodes, level, node) => {
            if (node.$filtered) {
                this.filtered.add(node);
            }
            if (node.hasChildren && !node.$opened && node.items && node.items.length >= 0 && level <= this.expandedLevel) {
                node.$opened = true;
            }
        };
        /**
         * Called on NgModel change (searchQuery)
         * Uses the suggestfield API to retrieve suggestions from the server
         * The suggestions "override" the data from the distribution (until search results are cleared)
         */
        this.suggest$ = (text$) => text$.pipe(debounceTime(this.suggestDelay), distinctUntilChanged(), switchMap(term => {
            var _a;
            if (term.trim() === "") {
                this.noResults = false;
                return of([]);
            }
            this.changeDetectorRef.markForCheck();
            this.searchActive = true;
            return this.facetService.suggest(term, ((_a = this.data) === null || _a === void 0 ? void 0 : _a.column) || '').pipe(catchError(err => {
                console.log(err);
                this.noResults = false;
                return of([]);
            }), map(suggests => {
                const items = this.facetService.suggestionsToTreeAggregationNodes(suggests, term, this.data);
                this.noResults = items.length === 0 && term.trim() !== "";
                return items;
            }));
        }));
        this.myGroup = new FormGroup({
            searchQuery: new FormControl()
        });
        this.searchQuery = this.myGroup.get("searchQuery");
        this.subscriptions["suggest"] = this.suggest$(this.searchQuery.valueChanges)
            .subscribe(values => {
            if (this.data) {
                let items = this.searchQuery.value ? values : this.originalItems;
                this.data = {
                    column: this.data.column,
                    name: this.data.name,
                    isTree: true,
                    items
                };
                // Refresh hiddenSelected list when the list of items is updated
                this.refreshHiddenSelected();
                this.searchActive = false;
                this.changeDetectorRef.markForCheck();
            }
        });
        // Keep documents with ANY of the selected items
        this.filterItemsOr = new Action({
            icon: "fas fa-filter",
            title: "msg#facet.filterItems",
            action: () => {
                if (this.data) {
                    this.facetService.addFilterSearch(this.getName(), this.data, this.getSelectedItems());
                }
            }
        });
        // Exclude document with selected items
        this.excludeItems = new Action({
            icon: "fas fa-times",
            title: "msg#facet.excludeItems",
            action: () => {
                if (this.data) {
                    this.facetService.addFilterSearch(this.getName(), this.data, this.getSelectedItems(), { not: true });
                }
            }
        });
        // Clear the current filters
        this.clearFilters = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.clearSelects",
            action: () => {
                this.facetService.clearFiltersSearch(this.getName(), true);
            }
        });
        // Search for a value in this list
        this.searchItems = new Action({
            icon: "fas fa-search",
            title: "msg#facet.searchItems",
            action: (item, event) => {
                item.selected = !item.selected;
                if (!item.selected) {
                    this.clearSearch();
                }
                event.stopPropagation();
                this.changeDetectorRef.markForCheck();
            }
        });
    }
    /**
     * Name of the facet, used to create and retrieve selections
     * through the facet service.
     */
    getName() {
        return this.name || this.aggregation;
    }
    /**
     * OnChanges listener awaits new results from the search service
     * This completely resets the display
     * @param changes
     */
    ngOnChanges(changes) {
        var _a;
        if (this.showCount === undefined)
            this.showCount = true;
        if (this.searchable === undefined)
            this.searchable = true;
        if (this.allowExclude === undefined)
            this.allowExclude = true;
        if (this.allowOr === undefined)
            this.allowOr = true;
        if (!!changes["results"]) { // New data from the search service
            this.filtered.clear();
            this.selected.clear();
            this.hiddenSelected.length = 0;
            this.data = this.facetService.getAggregation(this.aggregation, this.results, {
                facetName: this.getName(),
                levelCallback: this.initNodes
            });
            this.originalItems = (_a = this.data) === null || _a === void 0 ? void 0 : _a.items;
            this.searchItems.selected = false;
            this.clearSearch();
        }
    }
    /**
     * Returns all the actions that are relevant in the current context
     */
    get actions() {
        const actions = [];
        if (this.selected.size > 0) {
            if (this.allowOr) {
                actions.push(this.filterItemsOr);
            }
            if (this.allowExclude) {
                actions.push(this.excludeItems);
            }
        }
        if (this.hasFiltered()) {
            actions.push(this.clearFilters);
        }
        if (this.searchable) {
            actions.push(this.searchItems);
        }
        return actions;
    }
    // Filtered items
    /**
     * Returns true if the given AggregationItem is filtered
     * @param item
     */
    isFiltered(item) {
        return this.filtered.has(item);
    }
    /**
     * Returns true if there is an active selection (or exclusion) from this facet
     */
    hasFiltered() {
        return this.facetService.hasFiltered(this.getName());
    }
    /**
     * Called when clicking on a facet item text
     * @param item
     * @param event
     */
    filterItem(item, event) {
        if (this.data) {
            if (!this.isFiltered(item)) {
                this.facetService.addFilterSearch(this.getName(), this.data, item);
            }
            else {
                this.facetService.removeFilterSearch(this.getName(), this.data, item);
            }
        }
        event.preventDefault();
        event.stopPropagation();
        return false; // Stop the propagation of the event (link inside link)
    }
    // Selected items
    /**
     * Returns true if the given AggregationItem is selected
     * @param item
     */
    isSelected(item) {
        return this.selected.has(item.$path);
    }
    /**
     * Returns all the selected items
     */
    getSelectedItems() {
        return Array.from(this.selected.values());
    }
    /**
     * Called when selecting/unselecting an item in the facet
     * @param item
     */
    selectItem(item) {
        if (!this.isFiltered(item)) {
            if (this.selected.has(item.$path)) {
                this.selected.delete(item.$path);
            }
            else {
                this.selected.set(item.$path, item);
            }
            this.refreshHiddenSelected();
        }
        return false;
    }
    refreshHiddenSelected() {
        this.hiddenSelected = this.getSelectedItems()
            .filter(item => { var _a; return !this.find((_a = this.data) === null || _a === void 0 ? void 0 : _a.items, item); });
    }
    find(items, item) {
        if (items) {
            for (let i of items) {
                if (i.$path === item.$path || (i.$opened && this.find(i.items, item))) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Expand/Collapse a Tree node (the data may need to downloaded from the server)
     * @param item
     */
    open(item, event) {
        if (item.hasChildren) {
            item.$opened = !item.$opened;
            if (!item.items || item.items.length === 0) {
                item['$opening'] = true;
                if (this.data) {
                    Utils.subscribe(this.facetService.open(this.getName(), this.data, item, this.initNodes), (results) => {
                        item['$opening'] = false;
                        this.refreshHiddenSelected();
                        this.changeDetectorRef.markForCheck();
                    });
                }
            }
            this.refreshHiddenSelected();
        }
        event.preventDefault();
        event.stopPropagation();
        return false; // Prevent default action
    }
    /* AbstractFacet abstract methods */
    isHidden() {
        return !this.data;
    }
    // Search    
    clearSearch() {
        this.searchQuery.setValue(""); // Remove suggestions if some remain
        this.noResults = false;
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
BsFacetTree.ɵfac = function BsFacetTree_Factory(t) { return new (t || BsFacetTree)(i0.ɵɵdirectiveInject(i1.FacetService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
BsFacetTree.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetTree, selectors: [["sq-facet-tree"]], inputs: { name: "name", results: "results", aggregation: "aggregation", showCount: "showCount", allowExclude: "allowExclude", allowOr: "allowOr", searchable: "searchable", expandedLevel: "expandedLevel", forceMaxHeight: "forceMaxHeight", displayActions: "displayActions", initNodes: "initNodes" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 3, vars: 1, consts: [["class", "list-group list-group-flush", 3, "ngClass", 4, "ngIf"], ["itemsTpl", ""], [1, "list-group", "list-group-flush", 3, "ngClass"], ["class", "d-flex pb-2 pr-2", 4, "ngIf"], ["class", "position-relative", 3, "formGroup", 4, "ngIf"], ["class", "d-flex flex-row align-items-center list-group-item list-group-item-primary border-0 px-3 py-1 facet-row cursor-pointer", 3, "title", "click", 4, "ngFor", "ngForOf"], ["class", "d-block text-center text-muted small py-1", 4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "d-flex", "pb-2", "pr-2"], [1, "btn-group", "ml-auto", 3, "sq-action-buttons"], [1, "position-relative", 3, "formGroup"], [1, "p-1"], ["sqAutofocus", "", "formControlName", "searchQuery", 1, "form-control", 3, "placeholder"], [3, "active"], [1, "d-flex", "flex-row", "align-items-center", "list-group-item", "list-group-item-primary", "border-0", "px-3", "py-1", "facet-row", "cursor-pointer", 3, "title", "click"], ["href", "#", 1, "text-truncate", "mr-auto", 3, "title", "click"], ["class", "ml-2 text-muted small", 4, "ngIf"], [1, "ml-2", "text-muted", "small"], [1, "d-block", "text-center", "text-muted", "small", "py-1"], [4, "ngFor", "ngForOf"], ["href", "#", 1, "d-flex", "flex-row", "align-items-center", "list-group-item", "border-0", "pl-1", "pr-3", "py-1", 3, "ngClass", "title", "click"], [1, "mr-auto", "text-truncate", 3, "ngStyle"], ["class", "item-opener", "href", "#", 3, "title", "click", 4, "ngIf"], ["class", "fas fa-fw", 4, "ngIf"], ["href", "#", "role", "button", 1, "text-truncate", 3, "title", "click"], ["class", "ml-2 far fa-check-square", 4, "ngIf"], [4, "ngIf"], ["href", "#", 1, "item-opener", 3, "title", "click"], ["class", "fas fa-sync fa-fw fa-spin", 4, "ngIf"], ["class", "fas fa-caret-down fa-fw", 4, "ngIf"], ["class", "fas fa-caret-right fa-fw", 4, "ngIf"], [1, "fas", "fa-sync", "fa-fw", "fa-spin"], [1, "fas", "fa-caret-down", "fa-fw"], [1, "fas", "fa-caret-right", "fa-fw"], [1, "fas", "fa-fw"], [1, "ml-2", "far", "fa-check-square"]], template: function BsFacetTree_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsFacetTree_div_0_Template, 6, 9, "div", 0);
        i0.ɵɵtemplate(1, BsFacetTree_ng_template_1_Template, 1, 1, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !ctx.isHidden());
    } }, directives: [i2.NgIf, i2.NgClass, i2.NgForOf, i2.NgTemplateOutlet, i3.BsActionButtons, i4.NgControlStatusGroup, i4.FormGroupDirective, i4.DefaultValueAccessor, i5.Autofocus, i4.NgControlStatus, i4.FormControlName, i6.BsLoadingBar, i2.NgStyle], pipes: [i7.MessagePipe, i2.SlicePipe, i5.NumberPipe, i5.ValuePipe], styles: ["[_ngcontent-%COMP%]::-webkit-scrollbar{width:10px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#ccc}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background-color:#f3f3f3}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.scrollable[_ngcontent-%COMP%]{max-height:85vh;overflow-y:auto}.item-opener[_ngcontent-%COMP%]{text-decoration:none!important}a.filtered[_ngcontent-%COMP%], a.filtered[_ngcontent-%COMP%]:hover{color:inherit;cursor:inherit;text-decoration:none}"], changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsFacetTree, [{
        type: Component,
        args: [{
                selector: "sq-facet-tree",
                templateUrl: "./facet-tree.html",
                styleUrls: ["./facet-tree.scss"],
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: i1.FacetService }, { type: i0.ChangeDetectorRef }]; }, { name: [{
            type: Input
        }], results: [{
            type: Input
        }], aggregation: [{
            type: Input
        }], showCount: [{
            type: Input
        }], allowExclude: [{
            type: Input
        }], allowOr: [{
            type: Input
        }], searchable: [{
            type: Input
        }], expandedLevel: [{
            type: Input
        }], forceMaxHeight: [{
            type: Input
        }], displayActions: [{
            type: Input
        }], initNodes: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtdHJlZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2ZhY2V0LyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2ZhY2V0LXRyZWUvZmFjZXQtdHJlZS50cyIsImJvb3RzdHJhcC9mYWNldC10cmVlL2ZhY2V0LXRyZWUuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBK0MsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFckgsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRXpDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RCxPQUFPLEVBQWMsRUFBRSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7O0lDUDVGLDhCQUNJO0lBQUEseUJBRU07SUFDVixpQkFBTTs7O0lBRkUsZUFBa0Q7SUFBbEQsOEVBQWtEOzs7SUFJMUQsK0JBQ0k7SUFBQSwrQkFDSTtJQUFBLDRCQUdKOztJQUFBLGlCQUFNO0lBQ04scUNBQXlEO0lBQzdELGlCQUFNOzs7SUFQc0QsMENBQXFCO0lBSXJFLGVBQXlEO0lBQXpELGlGQUF5RDtJQUVqRCxlQUF1QjtJQUF2Qiw0Q0FBdUI7OztJQWF2QyxnQ0FBb0U7SUFBQSxZQUF5Qjs7SUFBQSxpQkFBTzs7O0lBQWhDLGVBQXlCO0lBQXpCLHlEQUF5Qjs7Ozs7SUFUakcsK0JBS0k7SUFGQSw0TkFBMEI7O0lBRTFCLDZCQUVrQztJQUZ0Qix3T0FBa0M7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IE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0b3JSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSZXN1bHRzLCBUcmVlQWdncmVnYXRpb24sIEFnZ3JlZ2F0aW9uSXRlbSwgVHJlZUFnZ3JlZ2F0aW9uTm9kZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge0ZhY2V0U2VydmljZX0gZnJvbSBcIi4uLy4uL2ZhY2V0LnNlcnZpY2VcIjtcbmltcG9ydCB7QWN0aW9ufSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9hY3Rpb25cIjtcbmltcG9ydCB7QWJzdHJhY3RGYWNldH0gZnJvbSBcIi4uLy4uL2Fic3RyYWN0LWZhY2V0XCI7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgc3dpdGNoTWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLWZhY2V0LXRyZWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2ZhY2V0LXRyZWUuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9mYWNldC10cmVlLnNjc3NcIl0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQnNGYWNldFRyZWUgZXh0ZW5kcyBBYnN0cmFjdEZhY2V0IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7IC8vIElmIG9tbWl0ZWQsIHRoZSBhZ2dyZWdhdGlvbiBuYW1lIGlzIHVzZWRcbiAgICBASW5wdXQoKSByZXN1bHRzOiBSZXN1bHRzO1xuICAgIEBJbnB1dCgpIGFnZ3JlZ2F0aW9uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc2hvd0NvdW50OiBib29sZWFuID0gdHJ1ZTsgLy8gU2hvdyB0aGUgbnVtYmVyIG9mIG9jY3VycmVuY2VzXG4gICAgQElucHV0KCkgYWxsb3dFeGNsdWRlOiBib29sZWFuID0gdHJ1ZTsgLy8gQWxsb3cgdG8gZXhjbHVkZSBzZWxlY3RlZCBpdGVtc1xuICAgIEBJbnB1dCgpIGFsbG93T3I6IGJvb2xlYW4gPSB0cnVlOyAvLyBBbGxvdyB0byBzZWFyY2ggdmFyaW91cyBpdGVtcyBpbiBPUiBtb2RlXG4gICAgQElucHV0KCkgc2VhcmNoYWJsZTogYm9vbGVhbiA9IHRydWU7IC8vIEFsbG93IHRvIHNlYXJjaCBmb3IgaXRlbXMgaW4gdGhlIGZhY2V0XG4gICAgQElucHV0KCkgZXhwYW5kZWRMZXZlbDogbnVtYmVyID0gMjtcbiAgICBASW5wdXQoKSBmb3JjZU1heEhlaWdodDogYm9vbGVhbiA9IHRydWU7IC8vIEFsbG93IHRvIGRpc3BsYXkgYSBzY3JvbGxiYXIgYXV0b21hdGljYWxseSBvbiBsb25nIGxpc3QgaXRlbXNcbiAgICBASW5wdXQoKSBkaXNwbGF5QWN0aW9ucyA9IGZhbHNlO1xuXG4gICAgLy8gQWdncmVnYXRpb24gZnJvbSB0aGUgUmVzdWx0cyBvYmplY3RcbiAgICBkYXRhOiBUcmVlQWdncmVnYXRpb24gfCB1bmRlZmluZWQ7XG4gICAgb3JpZ2luYWxJdGVtczogQWdncmVnYXRpb25JdGVtW10gfCB1bmRlZmluZWQ7XG4gICAgXG4gICAgcHJpdmF0ZSByZWFkb25seSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gICAgLy8gU2V0cyB0byBrZWVwIHRyYWNrIG9mIHNlbGVjdGVkL2V4Y2x1ZGVkL2ZpbHRlcmVkIGl0ZW1zXG4gICAgcHJpdmF0ZSByZWFkb25seSBmaWx0ZXJlZCA9IG5ldyBTZXQ8QWdncmVnYXRpb25JdGVtPigpO1xuICAgIFxuICAgIHJlYWRvbmx5IHNlbGVjdGVkID0gbmV3IE1hcDxzdHJpbmcsVHJlZUFnZ3JlZ2F0aW9uTm9kZT4oKTtcblxuICAgIGhpZGRlblNlbGVjdGVkOiBUcmVlQWdncmVnYXRpb25Ob2RlW10gPSBbXTtcbiAgICAvLyBUT0RPIGtlZXAgdHJhY2sgb2YgZXhjbHVkZWQgdGVybXMgYW5kIGRpc3BsYXkgdGhlbSB3aXRoIHNwZWNpZmljIGNvbG9yIHByaXZhdGVcbiAgICAvLyByZWFkb25seSBmaWx0ZXJlZCA9IG5ldyBTZXQ8QWdncmVnYXRpb25JdGVtPigpO1xuXG4gICAgLy8gU2VhcmNoXG4gICAgbXlHcm91cDogRm9ybUdyb3VwO1xuICAgIHNlYXJjaFF1ZXJ5OiBGb3JtQ29udHJvbDsgLy8gbmdNb2RlbCBmb3IgdGV4dGFyZWFcbiAgICBzdWdnZXN0RGVsYXkgPSAyMDA7XG4gICAgc2VhcmNoQWN0aXZlID0gZmFsc2U7XG4gICAgbm9SZXN1bHRzID0gZmFsc2U7XG4gICAgXG4gICAgLy8gQWN0aW9ucyAoZGlzcGxheWVkIGluIGZhY2V0IG1lbnUpXG4gICAgLy8gQWxsIGFjdGlvbnMgYXJlIGJ1aWx0IGluIHRoZSBjb25zdHJ1Y3RvclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZmlsdGVySXRlbXNPcjogQWN0aW9uO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZXhjbHVkZUl0ZW1zOiBBY3Rpb247XG4gICAgcHJpdmF0ZSByZWFkb25seSBjbGVhckZpbHRlcnM6IEFjdGlvbjtcbiAgICBwdWJsaWMgcmVhZG9ubHkgc2VhcmNoSXRlbXM6IEFjdGlvbjtcblxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZmFjZXRTZXJ2aWNlOiBGYWNldFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKXtcbiAgICAgICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgICAgIHRoaXMubXlHcm91cCA9IG5ldyBGb3JtR3JvdXAoe1xuICAgICAgICAgICAgICAgIHNlYXJjaFF1ZXJ5OiBuZXcgRm9ybUNvbnRyb2woKVxuICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gdGhpcy5teUdyb3VwLmdldChcInNlYXJjaFF1ZXJ5XCIpIGFzIEZvcm1Db250cm9sO1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zW1wic3VnZ2VzdFwiXSA9IHRoaXMuc3VnZ2VzdCQodGhpcy5zZWFyY2hRdWVyeS52YWx1ZUNoYW5nZXMpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSh2YWx1ZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtcyA9IHRoaXMuc2VhcmNoUXVlcnkudmFsdWU/IHZhbHVlcyA6IHRoaXMub3JpZ2luYWxJdGVtcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IHRoaXMuZGF0YS5jb2x1bW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5kYXRhLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNUcmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWZyZXNoIGhpZGRlblNlbGVjdGVkIGxpc3Qgd2hlbiB0aGUgbGlzdCBvZiBpdGVtcyBpcyB1cGRhdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hIaWRkZW5TZWxlY3RlZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgICAgIC8vIEtlZXAgZG9jdW1lbnRzIHdpdGggQU5ZIG9mIHRoZSBzZWxlY3RlZCBpdGVtc1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJJdGVtc09yID0gbmV3IEFjdGlvbih7XG4gICAgICAgICAgICAgICAgaWNvbjogXCJmYXMgZmEtZmlsdGVyXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwibXNnI2ZhY2V0LmZpbHRlckl0ZW1zXCIsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmFjZXRTZXJ2aWNlLmFkZEZpbHRlclNlYXJjaCh0aGlzLmdldE5hbWUoKSwgdGhpcy5kYXRhLCB0aGlzLmdldFNlbGVjdGVkSXRlbXMoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gRXhjbHVkZSBkb2N1bWVudCB3aXRoIHNlbGVjdGVkIGl0ZW1zXG4gICAgICAgICAgICB0aGlzLmV4Y2x1ZGVJdGVtcyA9IG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgICAgIGljb246IFwiZmFzIGZhLXRpbWVzXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwibXNnI2ZhY2V0LmV4Y2x1ZGVJdGVtc1wiLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZhY2V0U2VydmljZS5hZGRGaWx0ZXJTZWFyY2godGhpcy5nZXROYW1lKCksIHRoaXMuZGF0YSwgdGhpcy5nZXRTZWxlY3RlZEl0ZW1zKCksIHtub3Q6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBDbGVhciB0aGUgY3VycmVudCBmaWx0ZXJzXG4gICAgICAgICAgICB0aGlzLmNsZWFyRmlsdGVycyA9IG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgICAgIGljb246IFwiZmFyIGZhLW1pbnVzLXNxdWFyZVwiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIm1zZyNmYWNldC5jbGVhclNlbGVjdHNcIixcbiAgICAgICAgICAgICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWNldFNlcnZpY2UuY2xlYXJGaWx0ZXJzU2VhcmNoKHRoaXMuZ2V0TmFtZSgpLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gU2VhcmNoIGZvciBhIHZhbHVlIGluIHRoaXMgbGlzdFxuICAgICAgICAgICAgdGhpcy5zZWFyY2hJdGVtcyA9IG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgICAgIGljb246IFwiZmFzIGZhLXNlYXJjaFwiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIm1zZyNmYWNldC5zZWFyY2hJdGVtc1wiLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogKGl0ZW0sIGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSAhaXRlbS5zZWxlY3RlZDtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWl0ZW0uc2VsZWN0ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclNlYXJjaCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGZhY2V0LCB1c2VkIHRvIGNyZWF0ZSBhbmQgcmV0cmlldmUgc2VsZWN0aW9uc1xuICAgICAqIHRocm91Z2ggdGhlIGZhY2V0IHNlcnZpY2UuXG4gICAgICovXG4gICAgZ2V0TmFtZSgpIDogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSB8fCB0aGlzLmFnZ3JlZ2F0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9uQ2hhbmdlcyBsaXN0ZW5lciBhd2FpdHMgbmV3IHJlc3VsdHMgZnJvbSB0aGUgc2VhcmNoIHNlcnZpY2VcbiAgICAgKiBUaGlzIGNvbXBsZXRlbHkgcmVzZXRzIHRoZSBkaXNwbGF5XG4gICAgICogQHBhcmFtIGNoYW5nZXNcbiAgICAgKi9cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dDb3VudCA9PT0gdW5kZWZpbmVkKSB0aGlzLnNob3dDb3VudCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaGFibGUgPT09IHVuZGVmaW5lZCkgdGhpcy5zZWFyY2hhYmxlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuYWxsb3dFeGNsdWRlID09PSB1bmRlZmluZWQpIHRoaXMuYWxsb3dFeGNsdWRlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuYWxsb3dPciA9PT0gdW5kZWZpbmVkKSB0aGlzLmFsbG93T3IgPSB0cnVlO1xuXG4gICAgICAgIGlmICghIWNoYW5nZXNbXCJyZXN1bHRzXCJdKSB7ICAgICAvLyBOZXcgZGF0YSBmcm9tIHRoZSBzZWFyY2ggc2VydmljZVxuICAgICAgICAgICAgdGhpcy5maWx0ZXJlZC5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5oaWRkZW5TZWxlY3RlZC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5mYWNldFNlcnZpY2UuZ2V0QWdncmVnYXRpb24odGhpcy5hZ2dyZWdhdGlvbiwgdGhpcy5yZXN1bHRzLCB7XG4gICAgICAgICAgICAgICAgZmFjZXROYW1lOiB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgICBsZXZlbENhbGxiYWNrOiB0aGlzLmluaXROb2Rlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm9yaWdpbmFsSXRlbXMgPSB0aGlzLmRhdGE/Lml0ZW1zO1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hJdGVtcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlYXJjaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRm9yIGVhY2ggbmV3IG5vZGUsIHNldCB1cCBwcm9wZXJ0aWVzIG5lY2Vzc2FyeSBmb3IgZGlzcGxheVxuICAgIC8vIFRoaXMgY2FsbGJhY2sgY291bGQgYWxzbyBiZSB1c2VkIHRvIGZpbHRlciBvciBzb3J0cyBub2RlcywgZXRjLlxuICAgIEBJbnB1dCgpXG4gICAgaW5pdE5vZGVzID0gKG5vZGVzOiBUcmVlQWdncmVnYXRpb25Ob2RlW10sIGxldmVsOiBudW1iZXIsIG5vZGU6IFRyZWVBZ2dyZWdhdGlvbk5vZGUpID0+IHtcbiAgICAgICAgaWYobm9kZS4kZmlsdGVyZWQpe1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJlZC5hZGQobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYobm9kZS5oYXNDaGlsZHJlbiAmJiAhbm9kZS4kb3BlbmVkICYmIG5vZGUuaXRlbXMgJiYgbm9kZS5pdGVtcy5sZW5ndGggPj0gMCAmJiBsZXZlbCA8PSB0aGlzLmV4cGFuZGVkTGV2ZWwpe1xuICAgICAgICAgICAgbm9kZS4kb3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHRoZSBhY3Rpb25zIHRoYXQgYXJlIHJlbGV2YW50IGluIHRoZSBjdXJyZW50IGNvbnRleHRcbiAgICAgKi9cbiAgICBnZXQgYWN0aW9ucygpOiBBY3Rpb25bXSB7XG5cbiAgICAgICAgY29uc3QgYWN0aW9uczogQWN0aW9uW10gPSBbXTtcblxuICAgICAgICBpZih0aGlzLnNlbGVjdGVkLnNpemUgPiAwKSB7XG4gICAgICAgICAgICBpZih0aGlzLmFsbG93T3Ipe1xuICAgICAgICAgICAgICAgIGFjdGlvbnMucHVzaCh0aGlzLmZpbHRlckl0ZW1zT3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5hbGxvd0V4Y2x1ZGUpe1xuICAgICAgICAgICAgICAgIGFjdGlvbnMucHVzaCh0aGlzLmV4Y2x1ZGVJdGVtcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLmhhc0ZpbHRlcmVkKCkpIHtcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaCh0aGlzLmNsZWFyRmlsdGVycyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuc2VhcmNoYWJsZSl7XG4gICAgICAgICAgICBhY3Rpb25zLnB1c2godGhpcy5zZWFyY2hJdGVtcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYWN0aW9ucztcbiAgICB9XG5cblxuICAgIC8vIEZpbHRlcmVkIGl0ZW1zXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIEFnZ3JlZ2F0aW9uSXRlbSBpcyBmaWx0ZXJlZFxuICAgICAqIEBwYXJhbSBpdGVtXG4gICAgICovXG4gICAgaXNGaWx0ZXJlZChpdGVtOiBBZ2dyZWdhdGlvbkl0ZW0pIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcmVkLmhhcyhpdGVtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlcmUgaXMgYW4gYWN0aXZlIHNlbGVjdGlvbiAob3IgZXhjbHVzaW9uKSBmcm9tIHRoaXMgZmFjZXRcbiAgICAgKi9cbiAgICBoYXNGaWx0ZXJlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmFjZXRTZXJ2aWNlLmhhc0ZpbHRlcmVkKHRoaXMuZ2V0TmFtZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBjbGlja2luZyBvbiBhIGZhY2V0IGl0ZW0gdGV4dFxuICAgICAqIEBwYXJhbSBpdGVtXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgZmlsdGVySXRlbShpdGVtOiBBZ2dyZWdhdGlvbkl0ZW0sIGV2ZW50KSA6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5kYXRhKSB7XG4gICAgICAgICAgICBpZighdGhpcy5pc0ZpbHRlcmVkKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNldFNlcnZpY2UuYWRkRmlsdGVyU2VhcmNoKHRoaXMuZ2V0TmFtZSgpLCB0aGlzLmRhdGEsIGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNldFNlcnZpY2UucmVtb3ZlRmlsdGVyU2VhcmNoKHRoaXMuZ2V0TmFtZSgpLCB0aGlzLmRhdGEsIGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICByZXR1cm4gZmFsc2U7ICAgLy8gU3RvcCB0aGUgcHJvcGFnYXRpb24gb2YgdGhlIGV2ZW50IChsaW5rIGluc2lkZSBsaW5rKVxuICAgIH1cblxuXG4gICAgLy8gU2VsZWN0ZWQgaXRlbXNcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gQWdncmVnYXRpb25JdGVtIGlzIHNlbGVjdGVkXG4gICAgICogQHBhcmFtIGl0ZW1cbiAgICAgKi9cbiAgICBpc1NlbGVjdGVkKGl0ZW06IFRyZWVBZ2dyZWdhdGlvbk5vZGUpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkLmhhcyhpdGVtLiRwYXRoISk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgdGhlIHNlbGVjdGVkIGl0ZW1zXG4gICAgICovXG4gICAgZ2V0U2VsZWN0ZWRJdGVtcygpOiBUcmVlQWdncmVnYXRpb25Ob2RlW10ge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnNlbGVjdGVkLnZhbHVlcygpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBzZWxlY3RpbmcvdW5zZWxlY3RpbmcgYW4gaXRlbSBpbiB0aGUgZmFjZXRcbiAgICAgKiBAcGFyYW0gaXRlbVxuICAgICAqL1xuICAgIHNlbGVjdEl0ZW0oaXRlbTogVHJlZUFnZ3JlZ2F0aW9uTm9kZSkgOiBib29sZWFuIHtcbiAgICAgICAgaWYoIXRoaXMuaXNGaWx0ZXJlZChpdGVtKSl7XG4gICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkLmhhcyhpdGVtLiRwYXRoISkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLmRlbGV0ZShpdGVtLiRwYXRoISk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLnNldChpdGVtLiRwYXRoISwgaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hIaWRkZW5TZWxlY3RlZCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZWZyZXNoSGlkZGVuU2VsZWN0ZWQoKSB7XG4gICAgICAgIHRoaXMuaGlkZGVuU2VsZWN0ZWQgPSB0aGlzLmdldFNlbGVjdGVkSXRlbXMoKVxuICAgICAgICAgICAgLmZpbHRlcihpdGVtID0+ICF0aGlzLmZpbmQodGhpcy5kYXRhPy5pdGVtcyBhcyBUcmVlQWdncmVnYXRpb25Ob2RlW10sIGl0ZW0pKTtcbiAgICB9XG5cbiAgICBmaW5kKGl0ZW1zOiBUcmVlQWdncmVnYXRpb25Ob2RlW10gfCB1bmRlZmluZWQsIGl0ZW06IFRyZWVBZ2dyZWdhdGlvbk5vZGUpIHtcbiAgICAgICAgaWYoaXRlbXMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaSBvZiBpdGVtcykge1xuICAgICAgICAgICAgICAgIGlmKGkuJHBhdGggPT09IGl0ZW0uJHBhdGggfHwgKGkuJG9wZW5lZCAmJiB0aGlzLmZpbmQoaS5pdGVtcywgaXRlbSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhwYW5kL0NvbGxhcHNlIGEgVHJlZSBub2RlICh0aGUgZGF0YSBtYXkgbmVlZCB0byBkb3dubG9hZGVkIGZyb20gdGhlIHNlcnZlcilcbiAgICAgKiBAcGFyYW0gaXRlbVxuICAgICAqL1xuICAgIG9wZW4oaXRlbTogVHJlZUFnZ3JlZ2F0aW9uTm9kZSwgZXZlbnQ6IEV2ZW50KXtcbiAgICAgICAgaWYgKGl0ZW0uaGFzQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGl0ZW0uJG9wZW5lZCA9ICFpdGVtLiRvcGVuZWQ7XG4gICAgICAgICAgICBpZiAoIWl0ZW0uaXRlbXMgfHwgaXRlbS5pdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBpdGVtWyckb3BlbmluZyddID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLnN1YnNjcmliZSh0aGlzLmZhY2V0U2VydmljZS5vcGVuKHRoaXMuZ2V0TmFtZSgpLCB0aGlzLmRhdGEsIGl0ZW0sIHRoaXMuaW5pdE5vZGVzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVsnJG9wZW5pbmcnXT0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoSGlkZGVuU2VsZWN0ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoSGlkZGVuU2VsZWN0ZWQoKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBQcmV2ZW50IGRlZmF1bHQgYWN0aW9uXG4gICAgfVxuXG4gICAgLyogQWJzdHJhY3RGYWNldCBhYnN0cmFjdCBtZXRob2RzICovXG4gICAgaXNIaWRkZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5kYXRhO1xuICAgIH1cblxuXG4gICAgLy8gU2VhcmNoICAgIFxuXG4gICAgY2xlYXJTZWFyY2goKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoUXVlcnkuc2V0VmFsdWUoXCJcIik7IC8vIFJlbW92ZSBzdWdnZXN0aW9ucyBpZiBzb21lIHJlbWFpblxuICAgICAgICB0aGlzLm5vUmVzdWx0cyA9IGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBDYWxsZWQgb24gTmdNb2RlbCBjaGFuZ2UgKHNlYXJjaFF1ZXJ5KVxuICAgICAqIFVzZXMgdGhlIHN1Z2dlc3RmaWVsZCBBUEkgdG8gcmV0cmlldmUgc3VnZ2VzdGlvbnMgZnJvbSB0aGUgc2VydmVyXG4gICAgICogVGhlIHN1Z2dlc3Rpb25zIFwib3ZlcnJpZGVcIiB0aGUgZGF0YSBmcm9tIHRoZSBkaXN0cmlidXRpb24gKHVudGlsIHNlYXJjaCByZXN1bHRzIGFyZSBjbGVhcmVkKVxuICAgICAqL1xuICAgIHN1Z2dlc3QkID0gKHRleHQkOiBPYnNlcnZhYmxlPHN0cmluZz4pID0+IHRleHQkLnBpcGUoXG4gICAgICAgIGRlYm91bmNlVGltZSh0aGlzLnN1Z2dlc3REZWxheSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgIHN3aXRjaE1hcCh0ZXJtID0+IHtcbiAgICAgICAgICAgIGlmICh0ZXJtLnRyaW0oKSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgIHRoaXMubm9SZXN1bHRzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaEFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mYWNldFNlcnZpY2Uuc3VnZ2VzdCh0ZXJtLCB0aGlzLmRhdGE/LmNvbHVtbiB8fCAnJykucGlwZShcbiAgICAgICAgICAgICAgICBjYXRjaEVycm9yKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9SZXN1bHRzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihbXSk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbWFwKHN1Z2dlc3RzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLmZhY2V0U2VydmljZS5zdWdnZXN0aW9uc1RvVHJlZUFnZ3JlZ2F0aW9uTm9kZXMoc3VnZ2VzdHMsIHRlcm0sIHRoaXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9SZXN1bHRzID0gaXRlbXMubGVuZ3RoID09PSAwICYmIHRlcm0udHJpbSgpICE9PSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICApXG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3Vic2NyaXB0aW9uID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpKTtcbiAgICB9XG5cbn0iLCI8ZGl2ICpuZ0lmPVwiIWlzSGlkZGVuKClcIiBjbGFzcz1cImxpc3QtZ3JvdXAgbGlzdC1ncm91cC1mbHVzaFwiIFtuZ0NsYXNzXT1cInsnc2Nyb2xsYWJsZSc6IGZvcmNlTWF4SGVpZ2h0IH1cIj5cbiAgICA8ZGl2ICpuZ0lmPVwiZGlzcGxheUFjdGlvbnMgJiYgYWN0aW9uc1wiIGNsYXNzPVwiZC1mbGV4IHBiLTIgcHItMlwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIG1sLWF1dG9cIlxuICAgICAgICAgICAgW3NxLWFjdGlvbi1idXR0b25zXT1cIntpdGVtczogYWN0aW9ucywgc2l6ZTogJ3NtJ31cIj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiAqbmdJZj1cInNlYXJjaEl0ZW1zLnNlbGVjdGVkXCIgY2xhc3M9XCJwb3NpdGlvbi1yZWxhdGl2ZVwiIFtmb3JtR3JvdXBdPVwibXlHcm91cFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicC0xXCI+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBzcUF1dG9mb2N1c1xuICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInNlYXJjaFF1ZXJ5XCJcbiAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiJ21zZyNmYWNldC5zZWFyY2hQbGFjZWhvbGRlcicgfCBzcU1lc3NhZ2VcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxzcS1sb2FkaW5nLWJhciBbYWN0aXZlXT1cInNlYXJjaEFjdGl2ZVwiPjwvc3EtbG9hZGluZy1iYXI+XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPCEtLSBoaWRkZW4gc2VsZWN0ZWQgaXRlbXMgLS0+XG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBoaWRkZW5TZWxlY3RlZFwiXG4gICAgICAgIGNsYXNzPVwiZC1mbGV4IGZsZXgtcm93IGFsaWduLWl0ZW1zLWNlbnRlciBsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLXByaW1hcnkgYm9yZGVyLTAgcHgtMyBweS0xIGZhY2V0LXJvdyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgIFt0aXRsZV09XCInbXNnI2ZhY2V0Lml0ZW1VbnNlbGVjdCcgfCBzcU1lc3NhZ2VcIlxuICAgICAgICAoY2xpY2spPVwic2VsZWN0SXRlbShpdGVtKVwiPlxuXG4gICAgICAgIDxhIGhyZWY9XCIjXCIgKGNsaWNrKT1cImZpbHRlckl0ZW0oaXRlbSwgJGV2ZW50KVwiXG4gICAgICAgICAgICBbdGl0bGVdPVwiJ21zZyNmYWNldC5maWx0ZXJJdGVtJyB8IHNxTWVzc2FnZTp7J3Rlcm1lJzooaXRlbS4kcGF0aCB8IHNsaWNlOjE6LTEpfVwiXG4gICAgICAgICAgICBjbGFzcz1cInRleHQtdHJ1bmNhdGUgbXItYXV0b1wiPnt7aXRlbS4kcGF0aCB8IHNsaWNlOjE6LTF9fTwvYT5cbiAgICAgICAgXG4gICAgICAgIDxzcGFuICpuZ0lmPVwic2hvd0NvdW50ICYmIGl0ZW0uY291bnRcIiBjbGFzcz1cIm1sLTIgdGV4dC1tdXRlZCBzbWFsbFwiPnt7aXRlbS5jb3VudCB8IHNxTnVtYmVyfX08L3NwYW4+XG4gICAgPC9kaXY+XG5cbiAgICA8c3BhbiAqbmdJZj1cIm5vUmVzdWx0c1wiIGNsYXNzPVwiZC1ibG9jayB0ZXh0LWNlbnRlciB0ZXh0LW11dGVkIHNtYWxsIHB5LTFcIj48aT57eydtc2cjZmFjZXQuc2VhcmNoTm9SZXN1bHQnIHwgc3FNZXNzYWdlfX08L2k+PC9zcGFuPlxuXG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1zVHBsOyBjb250ZXh0OmRhdGFcIj48L25nLWNvbnRhaW5lcj5cblxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjaXRlbXNUcGwgbGV0LWl0ZW1zPVwiaXRlbXNcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zXCI+XG5cbiAgICAgICAgPGEgIGNsYXNzPVwiZC1mbGV4IGZsZXgtcm93IGFsaWduLWl0ZW1zLWNlbnRlciBsaXN0LWdyb3VwLWl0ZW0gYm9yZGVyLTAgcGwtMSBwci0zIHB5LTFcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieydsaXN0LWdyb3VwLWl0ZW0tcHJpbWFyeSc6aXNTZWxlY3RlZChpdGVtKSwnbGlzdC1ncm91cC1pdGVtLXN1Y2Nlc3MnOmlzRmlsdGVyZWQoaXRlbSksJ2xpc3QtZ3JvdXAtaXRlbS1hY3Rpb24nOiFpc0ZpbHRlcmVkKGl0ZW0pLCAnZmlsdGVyZWQnOmlzRmlsdGVyZWQoaXRlbSkgfVwiIFxuICAgICAgICAgICAgW3RpdGxlXT1cIihpc0ZpbHRlcmVkKGl0ZW0pPyAnbXNnI2ZhY2V0LnNlbGVjdGVkVmFsdWUnIDogJ21zZyNmYWNldC5pdGVtU2VsZWN0JykgfCBzcU1lc3NhZ2VcIiBcbiAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RJdGVtKGl0ZW0pXCIgaHJlZj1cIiNcIj5cbiAgICBcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibXItYXV0byB0ZXh0LXRydW5jYXRlXCIgW25nU3R5bGVdPVwieydtYXJnaW4tbGVmdC5yZW0nIDogaXRlbVsnJGxldmVsJ10gLSAxfVwiPlxuXG4gICAgICAgICAgICAgICAgPGEgKm5nSWY9XCJpdGVtWydoYXNDaGlsZHJlbiddXCIgY2xhc3M9XCJpdGVtLW9wZW5lclwiIGhyZWY9XCIjXCIgKGNsaWNrKT1cIm9wZW4oaXRlbSwgJGV2ZW50KVwiIFt0aXRsZV09XCIoaXRlbVsnJG9wZW5lZCddID8gJ21zZyNmYWNldC5jbG9zZUl0ZW0nIDogJ21zZyNmYWNldC5vcGVuSXRlbScpIHwgc3FNZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbVsnJG9wZW5pbmcnXVwiIGNsYXNzPVwiZmFzIGZhLXN5bmMgZmEtZncgZmEtc3BpblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhaXRlbVsnJG9wZW5pbmcnXSAmJiBpdGVtWyckb3BlbmVkJ11cIiBjbGFzcz1cImZhcyBmYS1jYXJldC1kb3duIGZhLWZ3XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFpdGVtWyckb3BlbmluZyddICYmICFpdGVtWyckb3BlbmVkJ11cIiBjbGFzcz1cImZhcyBmYS1jYXJldC1yaWdodCBmYS1md1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhaXRlbVsnaGFzQ2hpbGRyZW4nXVwiIGNsYXNzPVwiZmFzIGZhLWZ3XCI+PC9zcGFuPlxuICAgIFxuICAgICAgICAgICAgICAgIDxhICBocmVmPVwiI1wiIChjbGljayk9XCJmaWx0ZXJJdGVtKGl0ZW0sICRldmVudClcIiBcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cImJ1dHRvblwiIFt0aXRsZV09XCJpdGVtIHwgc3FWYWx1ZTppdGVtLiRjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInRleHQtdHJ1bmNhdGVcIj4ge3tpdGVtIHwgc3FWYWx1ZTppdGVtLiRjb2x1bW59fTwvYT5cblxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8aSBjbGFzcz1cIm1sLTIgZmFyIGZhLWNoZWNrLXNxdWFyZVwiICpuZ0lmPVwiaXNGaWx0ZXJlZChpdGVtKVwiPjwvaT5cblxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93Q291bnQgJiYgaXRlbS5jb3VudFwiIGNsYXNzPVwibWwtMiB0ZXh0LW11dGVkIHNtYWxsXCI+e3tpdGVtLmNvdW50IHwgc3FOdW1iZXJ9fTwvc3Bhbj5cbiAgICBcbiAgICAgICAgPC9hPlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpdGVtWyckb3BlbmVkJ11cIj5cblxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1zVHBsOyBjb250ZXh0Oml0ZW1cIj48L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDwvbmctY29udGFpbmVyPlxuXG48L25nLXRlbXBsYXRlPlxuIl19