import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import { Action } from "@sinequa/components/action";
import { AbstractFacet } from "../../abstract-facet";
import { BehaviorSubject, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "../../facet.service";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/components/action";
import * as i4 from "@angular/forms";
import * as i5 from "@sinequa/components/utils";
import * as i6 from "@sinequa/components/search";
import * as i7 from "@sinequa/core/intl";
const _c0 = function (a0) { return { items: a0, size: "sm" }; };
function BsFacetList_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵelement(1, "div", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction1(1, _c0, ctx_r1.actions));
} }
function BsFacetList_div_0_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelementStart(1, "div", 12);
    i0.ɵɵelement(2, "input", 13);
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "sq-loading-bar", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("formGroup", ctx_r2.myGroup);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(3, 3, "msg#facet.searchPlaceholder"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("active", ctx_r2.searchActive);
} }
function BsFacetList_div_0_div_3_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 21);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqNumber");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, item_r8.count));
} }
const _c1 = function (a0, a1) { return { "list-group-item-success": a0, "list-group-item-secondary": a1 }; };
function BsFacetList_div_0_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵlistener("click", function BsFacetList_div_0_div_3_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r12); const item_r8 = ctx.$implicit; const ctx_r11 = i0.ɵɵnextContext(2); return ctx_r11.filterItem(item_r8, $event); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelementStart(2, "a", 16);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqValue");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, BsFacetList_div_0_div_3_span_5_Template, 3, 3, "span", 17);
    i0.ɵɵelementStart(6, "span", 18);
    i0.ɵɵelement(7, "i", 19);
    i0.ɵɵelement(8, "i", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(9, _c1, !item_r8.$excluded, item_r8.$excluded))("title", i0.ɵɵpipeBind1(1, 4, "msg#facet.selectedValue"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 6, item_r8, item_r8.$column));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r3.showCount && item_r8.count);
} }
function BsFacetList_div_0_div_4_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 21);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqNumber");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r13 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, item_r13.count));
} }
const _c2 = function (a0) { return { "terme": a0 }; };
function BsFacetList_div_0_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵlistener("click", function BsFacetList_div_0_div_4_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r17); const item_r13 = ctx.$implicit; const ctx_r16 = i0.ɵɵnextContext(2); return ctx_r16.selectItem(item_r13, $event); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelementStart(2, "a", 23);
    i0.ɵɵlistener("click", function BsFacetList_div_0_div_4_Template_a_click_2_listener($event) { i0.ɵɵrestoreView(_r17); const item_r13 = ctx.$implicit; const ctx_r18 = i0.ɵɵnextContext(2); return ctx_r18.filterItem(item_r13, $event); });
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵpipe(4, "sqValue");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "sqValue");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, BsFacetList_div_0_div_4_span_7_Template, 3, 3, "span", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r13 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 4, "msg#facet.itemUnselect"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("title", i0.ɵɵpipeBind2(3, 6, "msg#facet.filterItem", i0.ɵɵpureFunction1(15, _c2, i0.ɵɵpipeBind2(4, 9, item_r13, item_r13.$column))));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 12, item_r13, item_r13.$column));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r4.showCount && item_r13.count);
} }
function BsFacetList_div_0_div_5_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 27);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqNumber");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const suggest_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, suggest_r19.count));
} }
const _c3 = function (a0) { return { "list-group-item-primary": a0 }; };
function BsFacetList_div_0_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵlistener("click", function BsFacetList_div_0_div_5_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r23); const suggest_r19 = ctx.$implicit; const ctx_r22 = i0.ɵɵnextContext(2); return ctx_r22.selectItem(suggest_r19, $event); });
    i0.ɵɵelementStart(1, "a", 25);
    i0.ɵɵlistener("click", function BsFacetList_div_0_div_5_Template_a_click_1_listener($event) { i0.ɵɵrestoreView(_r23); const suggest_r19 = ctx.$implicit; const ctx_r24 = i0.ɵɵnextContext(2); return ctx_r24.filterItem(suggest_r19, $event); });
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵpipe(3, "sqValue");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "sqValue");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, BsFacetList_div_0_div_5_span_6_Template, 3, 3, "span", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const suggest_r19 = ctx.$implicit;
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(13, _c3, ctx_r5.isSelected(suggest_r19)));
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind2(2, 4, "msg#facet.filterItem", i0.ɵɵpureFunction1(15, _c2, i0.ɵɵpipeBind2(3, 7, suggest_r19, suggest_r19.$column))));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 10, suggest_r19, suggest_r19.$column));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r5.showCount && suggest_r19.count);
} }
function BsFacetList_div_0_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 28);
    i0.ɵɵelementStart(1, "i");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "msg#facet.searchNoResult"));
} }
function BsFacetList_div_0_div_8_div_1_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 36);
} if (rf & 2) {
    const item_r27 = i0.ɵɵnextContext().$implicit;
    const ctx_r28 = i0.ɵɵnextContext(3);
    i0.ɵɵstyleProp("--count", ctx_r28.getPercent(item_r27.count));
} }
function BsFacetList_div_0_div_8_div_1_span_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 27);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqNumber");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r27 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, item_r27.count));
} }
function BsFacetList_div_0_div_8_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r33 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵlistener("click", function BsFacetList_div_0_div_8_div_1_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r33); const item_r27 = ctx.$implicit; const ctx_r32 = i0.ɵɵnextContext(3); return ctx_r32.selectItem(item_r27, $event); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵtemplate(2, BsFacetList_div_0_div_8_div_1_div_2_Template, 1, 2, "div", 33);
    i0.ɵɵelementStart(3, "div", 34);
    i0.ɵɵelementStart(4, "a", 35);
    i0.ɵɵlistener("click", function BsFacetList_div_0_div_8_div_1_Template_a_click_4_listener($event) { i0.ɵɵrestoreView(_r33); const item_r27 = ctx.$implicit; const ctx_r34 = i0.ɵɵnextContext(3); return ctx_r34.filterItem(item_r27, $event); });
    i0.ɵɵpipe(5, "sqMessage");
    i0.ɵɵpipe(6, "sqValue");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "sqValue");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, BsFacetList_div_0_div_8_div_1_span_9_Template, 3, 3, "span", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r27 = ctx.$implicit;
    const ctx_r25 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(17, _c3, ctx_r25.isSelected(item_r27)))("title", i0.ɵɵpipeBind1(1, 6, ctx_r25.isSelected(item_r27) ? "msg#facet.itemUnselect" : "msg#facet.itemSelect"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r25.showProgressBar && ctx_r25.resultsLength > 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("title", i0.ɵɵpipeBind2(5, 8, "msg#facet.filterItem", i0.ɵɵpureFunction1(19, _c2, i0.ɵɵpipeBind2(6, 11, item_r27, item_r27.$column))));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 14, item_r27, item_r27.$column));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r25.showCount && item_r27.count);
} }
function BsFacetList_div_0_div_8_a_3_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 40);
} }
function BsFacetList_div_0_div_8_a_3_small_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "msg#facet.loadMore"));
} }
function BsFacetList_div_0_div_8_a_3_Template(rf, ctx) { if (rf & 1) {
    const _r38 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 37);
    i0.ɵɵlistener("click", function BsFacetList_div_0_div_8_a_3_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r38); const ctx_r37 = i0.ɵɵnextContext(3); return ctx_r37.loadMore($event); });
    i0.ɵɵtemplate(1, BsFacetList_div_0_div_8_a_3_span_1_Template, 1, 0, "span", 38);
    i0.ɵɵtemplate(2, BsFacetList_div_0_div_8_a_3_small_2_Template, 3, 3, "small", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r26 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r26.loadingMore);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r26.loadingMore);
} }
function BsFacetList_div_0_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtemplate(1, BsFacetList_div_0_div_8_div_1_Template, 10, 21, "div", 30);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵtemplate(3, BsFacetList_div_0_div_8_a_3_Template, 3, 2, "a", 31);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(2, 2, ctx_r7.items$));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r7.hasMore);
} }
function BsFacetList_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtemplate(1, BsFacetList_div_0_div_1_Template, 2, 3, "div", 2);
    i0.ɵɵtemplate(2, BsFacetList_div_0_div_2_Template, 5, 5, "div", 3);
    i0.ɵɵtemplate(3, BsFacetList_div_0_div_3_Template, 9, 12, "div", 4);
    i0.ɵɵtemplate(4, BsFacetList_div_0_div_4_Template, 8, 17, "div", 5);
    i0.ɵɵtemplate(5, BsFacetList_div_0_div_5_Template, 7, 17, "div", 6);
    i0.ɵɵpipe(6, "async");
    i0.ɵɵtemplate(7, BsFacetList_div_0_span_7_Template, 4, 3, "span", 7);
    i0.ɵɵtemplate(8, BsFacetList_div_0_div_8_Template, 4, 4, "div", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.displayActions && ctx_r0.actions);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.searchItems.selected);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.filtered);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.hiddenSelected);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(6, 7, ctx_r0.suggestions$));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.noResults);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.hasSuggestions());
} }
export class BsFacetList extends AbstractFacet {
    constructor(facetService, changeDetectorRef) {
        super();
        this.facetService = facetService;
        this.changeDetectorRef = changeDetectorRef;
        this.showCount = true; // Show the number of occurrences
        this.searchable = true; // Allow to search for items in the facet
        this.allowExclude = true; // Allow to exclude selected items
        this.allowOr = true; // Allow to search various items in OR mode
        this.allowAnd = true; // Allow to search various items in AND mode
        this.displayEmptyDistributionIntervals = false; // If the aggregration is a distribution, then this property controls whether empty distribution intervals will be displayed
        this.displayActions = false;
        this.showProgressBar = false; // Allow to display item count as progress bar
        // Aggregation from the Results object
        this.data$ = new BehaviorSubject(undefined);
        this.items$ = new BehaviorSubject([]);
        this.data = () => this.data$.getValue();
        this.subscriptions = [];
        this.filtering = false;
        this.suggestDelay = 200;
        this.noResults = false;
        this.searchActive = false;
        this.suggestions$ = new BehaviorSubject([]);
        /** List of selected items */
        this.selected = [];
        /** Selected items that are not visible in the current aggregation (or suggestions in search mode) */
        this.hiddenSelected = [];
        /** List of excluded/filtered items */
        this.filtered = [];
        // Loading more data
        this.skip = 0;
        /** num of items currently displayed in the facet */
        this.count = 0;
        /** Does facet has more items to display ? */
        this.loadingMore = false;
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
            this.searchActive = true;
            this.changeDetectorRef.markForCheck();
            return this.facetService.suggest(term, ((_a = this.data()) === null || _a === void 0 ? void 0 : _a.column) || '').pipe(catchError(err => {
                console.log(err);
                this.noResults = false;
                return of([]);
            }), map(items => {
                const suggestions = items.slice(0, this.count)
                    .map(item => this.facetService.suggestionToAggregationItem(item))
                    .filter(item => !this.isFiltered(this.data(), item));
                this.noResults = suggestions.length === 0 && term.trim() !== "";
                return suggestions;
            }));
        }));
        this.myGroup = new FormGroup({
            searchQuery: new FormControl()
        });
        this.searchQuery = this.myGroup.get("searchQuery");
        this.subscriptions["suggest"] = this.suggest$(this.searchQuery.valueChanges)
            .subscribe(values => {
            this.suggestions$.next(values);
            // Refresh hiddenSelected list when the list of items is updated
            this.refreshHiddenSelected();
            this.searchActive = false;
            this.changeDetectorRef.markForCheck();
        });
        // Keep documents with ANY of the selected items
        this.filterItemsOr = new Action({
            icon: "fas fa-filter",
            title: "msg#facet.filterItems",
            action: () => {
                if (this.data()) {
                    this.facetService.addFilterSearch(this.getName(), this.data(), this.selected);
                }
            }
        });
        // Keep documents with ALL the selected items
        this.filterItemsAnd = new Action({
            icon: "fas fa-bullseye",
            title: "msg#facet.filterItemsAnd",
            action: () => {
                if (this.data()) {
                    this.facetService.addFilterSearch(this.getName(), this.data(), this.selected, { and: true });
                }
            }
        });
        // Exclude document with selected items
        this.excludeItems = new Action({
            icon: "fas fa-times",
            title: "msg#facet.excludeItems",
            action: () => {
                if (this.data()) {
                    this.facetService.addFilterSearch(this.getName(), this.data(), this.selected, { not: true });
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
    clearSearch() {
        this.searchQuery.setValue(""); // Remove suggestions if some remain
        this.noResults = false;
        this.suggestions$.next([]);
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
        if (this.showCount === undefined)
            this.showCount = true;
        if (this.searchable === undefined)
            this.searchable = true;
        if (this.allowExclude === undefined)
            this.allowExclude = true;
        if (this.allowOr === undefined)
            this.allowOr = true;
        if (this.allowAnd === undefined)
            this.allowAnd = true;
        if (!!changes["results"]) { // New data from the search service
            if (!this.count) {
                this.count = this.facetService.getAggregationCount(this.aggregation);
            }
            this.filtered.length = 0;
            this.selected.length = 0;
            this.hiddenSelected.length = 0;
            this.skip = 0;
            this.searchItems.selected = false;
            this.clearSearch();
            this.data$.next(this.facetService.getAggregation(this.aggregation, this.results));
        }
    }
    ngOnInit() {
        this.subscriptions["data"] = this.data$.pipe(map(data => {
            const nonFilteredItems = this.refreshFiltered(data);
            return !(data === null || data === void 0 ? void 0 : data.isDistribution) || this.displayEmptyDistributionIntervals ?
                nonFilteredItems : nonFilteredItems.filter(item => item.count > 0);
        })).subscribe(items => {
            this.sumOfCount = items.length > 0 ? items.map(item => item.count).reduce((acc, value) => acc += value) / 100 : 0;
            this.items$.next(items);
            // Refresh hiddenSelected list when the list of items is updated
            this.refreshHiddenSelected();
        });
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
    /**
     * Returns all the actions that are relevant in the current context
     */
    get actions() {
        const actions = [];
        if (this.selected.length > 0) {
            if (this.allowOr) {
                actions.push(this.filterItemsOr);
            }
            if (this.allowAnd && this.selected.length > 1) {
                actions.push(this.filterItemsAnd);
            }
            if (this.allowExclude) {
                actions.push(this.excludeItems);
            }
        }
        if (!this.hasSuggestions() && this.hasFiltered()) {
            actions.push(this.clearFilters);
        }
        if (this.searchable) {
            actions.push(this.searchItems);
        }
        return actions;
    }
    // Filtered items
    /**
     * Actualize the state of filtered items (note that excluded terms are not in the distribution, so the equivalent cannot be done)
     */
    refreshFiltered(data) {
        var _a;
        // refresh filters from breadcrumbs
        const items = this.facetService.getAggregationItemsFiltered(this.getName(), data === null || data === void 0 ? void 0 : data.valuesAreExpressions);
        items.forEach(item => {
            if (!this.isFiltered(data, item)) {
                this.filtered.push(item);
            }
        });
        const nonFilteredItems = [];
        (_a = data === null || data === void 0 ? void 0 : data.items) === null || _a === void 0 ? void 0 : _a.forEach(item => {
            const indx = this.facetService.filteredIndex(data, this.filtered, item);
            if (this.facetService.itemFiltered(this.getName(), data, item)) {
                if (!this.isFiltered(data, item)) {
                    this.filtered.push(item);
                }
                else {
                    this.filtered[indx].count = item.count;
                }
            }
            else {
                // sometime facetService.itemFiltered() could returns false but item is present in breadcrumbs
                if (indx !== -1) {
                    this.filtered[indx].count = item.count;
                }
                else {
                    nonFilteredItems.push(item);
                }
            }
        });
        return nonFilteredItems;
    }
    refreshHiddenSelected() {
        this.hiddenSelected = this.selected.filter(item => {
            const idx = this.hasSuggestions()
                ? this.facetService.findAggregationItemIndex(this.suggestions$.getValue(), item)
                : this.facetService.findAggregationItemIndex(this.items$.getValue() || [], item);
            return idx === -1;
        });
    }
    /**
     * Returns true if the given AggregationItem is filtered
     * @param item
     */
    isFiltered(data, item) {
        return this.facetService.filteredIndex(data, this.filtered, item) !== -1;
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
        const data = this.data();
        if (data) {
            this.filtering = true;
            if (!this.isFiltered(data, item)) {
                this.facetService.addFilterSearch(this.getName(), data, item);
            }
            else {
                this.facetService.removeFilterSearch(this.getName(), data, item);
            }
        }
        event.preventDefault();
    }
    // Selected items
    /**
     * Returns true if the given AggregationItem is selected
     * @param item
     */
    isSelected(item) {
        return this.facetService.findAggregationItemIndex(this.selected, item) !== -1;
    }
    /**
     * Called when selecting/unselecting an item in the facet
     * @param item
     */
    selectItem(item, e) {
        e.preventDefault();
        if (!this.filtering) {
            this.updateSelected(item);
            e.stopPropagation();
        }
        this.filtering = false;
    }
    updateSelected(item) {
        if (!this.isFiltered(this.data(), item)) {
            const index = this.facetService.findAggregationItemIndex(this.selected, item);
            if (index === -1) {
                this.selected.push(item);
            }
            else {
                this.selected.splice(index, 1);
            }
            this.refreshHiddenSelected();
        }
    }
    // Loading more items
    /**
     * Returns true if this facet can get more data from the server
     * (The only way to guess is to check if the facet is "full", it capacity being the (skip+)count)
     */
    get hasMore() {
        return this.resultsLength >= this.skip + this.count;
    }
    get resultsLength() {
        return this.items$.getValue().length + this.filtered.length;
    }
    /**
     * Called on loadMore button click
     */
    loadMore(e) {
        e.stopPropagation();
        if (this.data()) {
            const skip = this.resultsLength; // avoid hasMore() to return false when fetching data
            this.loadingMore = true;
            this.changeDetectorRef.markForCheck();
            Utils.subscribe(this.facetService.loadData(this.aggregation, skip, this.count), agg => {
                this.skip = skip;
                if ((agg === null || agg === void 0 ? void 0 : agg.items) && this.data()) {
                    agg.items = this.items$.getValue().concat(agg.items);
                    this.data$.next(agg);
                }
            }, undefined, () => {
                this.loadingMore = false;
                this.changeDetectorRef.markForCheck();
            });
        }
        return false; // Avoids following href
    }
    // Suggest / Search
    /**
     * Returns true if the search mode is active (ie. there are suggestions to display in place of the aggregation)
     */
    hasSuggestions() {
        return this.suggestions$.getValue().length > 0 || this.noResults;
    }
    /* AbstractFacet abstract methods */
    isHidden() {
        return !this.data();
    }
    /**
     * Convert facet item count to percentage width
     * @param count item count
     * @returns a % string representation
     */
    getPercent(count) {
        return `${100 - (count / this.sumOfCount)}%`;
    }
}
BsFacetList.ɵfac = function BsFacetList_Factory(t) { return new (t || BsFacetList)(i0.ɵɵdirectiveInject(i1.FacetService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
BsFacetList.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetList, selectors: [["sq-facet-list"]], inputs: { name: "name", results: "results", aggregation: "aggregation", showCount: "showCount", searchable: "searchable", allowExclude: "allowExclude", allowOr: "allowOr", allowAnd: "allowAnd", displayEmptyDistributionIntervals: "displayEmptyDistributionIntervals", displayActions: "displayActions", showProgressBar: "showProgressBar" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "list-group list-group-flush", 4, "ngIf"], [1, "list-group", "list-group-flush"], ["class", "d-flex pb-2 pr-2", 4, "ngIf"], ["class", "position-relative", 3, "formGroup", 4, "ngIf"], ["class", "d-flex flex-row align-items-center list-group-item list-group-item-action list-group-item-success text-truncate border-0 px-3 py-1 facet-row cursor-pointer", 3, "ngClass", "title", "click", 4, "ngFor", "ngForOf"], ["class", "d-flex flex-row align-items-center list-group-item list-group-item-primary text-truncate border-0 px-3 py-1 facet-row cursor-pointer", 3, "title", "click", 4, "ngFor", "ngForOf"], ["class", "d-flex flex-row align-items-center list-group-item list-group-item-action text-truncate border-0 px-3 py-1 facet-row cursor-pointer", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["class", "d-block text-center text-muted small py-1", 4, "ngIf"], ["class", "facet-results-scrollable", 4, "ngIf"], [1, "d-flex", "pb-2", "pr-2"], [1, "btn-group", "ml-auto", 3, "sq-action-buttons"], [1, "position-relative", 3, "formGroup"], [1, "p-1"], ["sqAutofocus", "", "formControlName", "searchQuery", 1, "form-control", 3, "placeholder"], [3, "active"], [1, "d-flex", "flex-row", "align-items-center", "list-group-item", "list-group-item-action", "list-group-item-success", "text-truncate", "border-0", "px-3", "py-1", "facet-row", "cursor-pointer", 3, "ngClass", "title", "click"], ["href", "#", 1, "text-truncate", "mr-auto"], ["class", "ml-2 text-muted small", 4, "ngIf"], [1, "fa-stack", "cursor-pointer"], [1, "ml-2", "far", "fa-minus-square", "fa-stack-1x", "icons", "icon-hover", "rotate"], [1, "ml-2", "far", "fa-check-square", "fa-stack-1x", "icons", "icon-default", "rotate"], [1, "ml-2", "text-muted", "small"], [1, "d-flex", "flex-row", "align-items-center", "list-group-item", "list-group-item-primary", "text-truncate", "border-0", "px-3", "py-1", "facet-row", "cursor-pointer", 3, "title", "click"], ["href", "#", 1, "text-truncate", "mr-auto", 3, "title", "click"], [1, "d-flex", "flex-row", "align-items-center", "list-group-item", "list-group-item-action", "text-truncate", "border-0", "px-3", "py-1", "facet-row", "cursor-pointer", 3, "ngClass", "click"], ["href", "#", "role", "button", 1, "text-truncate", "mr-auto", 3, "title", "click"], ["class", "ml-2 text-muted small", "style", "z-index: 1;", 4, "ngIf"], [1, "ml-2", "text-muted", "small", 2, "z-index", "1"], [1, "d-block", "text-center", "text-muted", "small", "py-1"], [1, "facet-results-scrollable"], ["class", "position-relative list-group-item list-group-item-action border-0 px-3 py-1 facet-row cursor-pointer", 3, "ngClass", "title", "click", 4, "ngFor", "ngForOf"], ["class", "d-block border-0 px-3 py-1 text-center", "href", "#", 3, "click", 4, "ngIf"], [1, "position-relative", "list-group-item", "list-group-item-action", "border-0", "px-3", "py-1", "facet-row", "cursor-pointer", 3, "ngClass", "title", "click"], ["class", "position-absolute progress-bar progress-color", 3, "--count", 4, "ngIf"], [1, "d-flex", "justify-content-between", "align-items-baseline"], ["href", "#", 1, "text-truncate", "mr-auto", 2, "z-index", "1", 3, "title", "click"], [1, "position-absolute", "progress-bar", "progress-color"], ["href", "#", 1, "d-block", "border-0", "px-3", "py-1", "text-center", 3, "click"], ["class", "fas fa-sync fa-fw fa-spin", 4, "ngIf"], [4, "ngIf"], [1, "fas", "fa-sync", "fa-fw", "fa-spin"]], template: function BsFacetList_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsFacetList_div_0_Template, 9, 9, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !ctx.isHidden());
    } }, directives: [i2.NgIf, i2.NgForOf, i3.BsActionButtons, i4.NgControlStatusGroup, i4.FormGroupDirective, i4.DefaultValueAccessor, i5.Autofocus, i4.NgControlStatus, i4.FormControlName, i6.BsLoadingBar, i2.NgClass], pipes: [i2.AsyncPipe, i7.MessagePipe, i5.ValuePipe, i5.NumberPipe], styles: ["[_ngcontent-%COMP%]::-webkit-scrollbar{width:10px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background-color:#ccc}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background-color:#f3f3f3}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.progress-bar[_ngcontent-%COMP%]{bottom:0;height:2px;right:0;width:calc(100% - var(--count))}.progress-bar.progress-color[_ngcontent-%COMP%]{background-color:#7c7c7c;background-image:linear-gradient(90deg,#b8daff,transparent)}.facet-row[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]{transition:opacity .3s,transform .3s ease}.facet-row[_ngcontent-%COMP%]   .icons.icon-hover[_ngcontent-%COMP%]{opacity:0}.facet-row[_ngcontent-%COMP%]   .icons.icon-hover.rotate[_ngcontent-%COMP%]{transform:rotate(-180deg)}.facet-row[_ngcontent-%COMP%]:hover   .icon-default[_ngcontent-%COMP%]{opacity:0}.facet-row[_ngcontent-%COMP%]:hover   .icon-default.rotate[_ngcontent-%COMP%]{transform:rotate(180deg)}.facet-row[_ngcontent-%COMP%]:hover   .icon-hover[_ngcontent-%COMP%]{opacity:1}.facet-row[_ngcontent-%COMP%]:hover   .icon-hover.rotate[_ngcontent-%COMP%]{transform:rotate(0deg)}.facet-row[_ngcontent-%COMP%]   .fa-stack[_ngcontent-%COMP%]{height:1.5em;line-height:1.5em}.facet-results-scrollable[_ngcontent-%COMP%]{max-height:385px;overflow-y:auto}"], changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsFacetList, [{
        type: Component,
        args: [{
                selector: "sq-facet-list",
                templateUrl: "./facet-list.html",
                styleUrls: ["./facet-list.scss"],
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
        }], searchable: [{
            type: Input
        }], allowExclude: [{
            type: Input
        }], allowOr: [{
            type: Input
        }], allowAnd: [{
            type: Input
        }], displayEmptyDistributionIntervals: [{
            type: Input
        }], displayActions: [{
            type: Input
        }], showProgressBar: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2ZhY2V0LyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2ZhY2V0LWxpc3QvZmFjZXQtbGlzdC50cyIsImJvb3RzdHJhcC9mYWNldC1saXN0L2ZhY2V0LWxpc3QuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBK0MsdUJBQXVCLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBRXhJLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUV6QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDbEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxlQUFlLEVBQWMsRUFBRSxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQ25FLE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RixPQUFPLEVBQUMsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7OztJQ1BsRCw4QkFDSTtJQUFBLDBCQUVNO0lBQ1YsaUJBQU07OztJQUZFLGVBQWtEO0lBQWxELDhFQUFrRDs7O0lBSTFELCtCQUNJO0lBQUEsK0JBQ0k7SUFBQSw0QkFHSjs7SUFBQSxpQkFBTTtJQUNOLHFDQUF5RDtJQUM3RCxpQkFBTTs7O0lBUHNELDBDQUFxQjtJQUlyRSxlQUF5RDtJQUF6RCxpRkFBeUQ7SUFFakQsZUFBdUI7SUFBdkIsNENBQXVCOzs7SUFZdkMsZ0NBQW9FO0lBQUEsWUFBeUI7O0lBQUEsaUJBQU87OztJQUFoQyxlQUF5QjtJQUF6Qix5REFBeUI7Ozs7O0lBUmpHLCtCQU1JO0lBRkEsME9BQWtDOztJQUVsQyw2QkFBMEM7SUFB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QUFDLENBQUMsQ0FBQztTQUNWO1FBQ0QsT0FBTyxLQUFLLENBQUMsQ0FBQyx3QkFBd0I7SUFDMUMsQ0FBQztJQUdELG1CQUFtQjtJQUVuQjs7T0FFRztJQUNILGNBQWM7UUFDVixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3JFLENBQUM7SUFtQ0Qsb0NBQW9DO0lBQ3BDLFFBQVE7UUFDSixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsVUFBVSxDQUFDLEtBQWE7UUFDcEIsT0FBTyxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztJQUNqRCxDQUFDOztzRUFwYlEsV0FBVztnREFBWCxXQUFXO1FDaEJ4Qiw0REFzRk07O1FBdEZBLHNDQUFpQjs7a0REZ0JWLFdBQVc7Y0FOdkIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixXQUFXLEVBQUUsbUJBQW1CO2dCQUNoQyxTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDaEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDbEQ7K0ZBRVksSUFBSTtrQkFBWixLQUFLO1lBQ0csT0FBTztrQkFBZixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUs7WUFDRyxVQUFVO2tCQUFsQixLQUFLO1lBQ0csWUFBWTtrQkFBcEIsS0FBSztZQUNHLE9BQU87a0JBQWYsS0FBSztZQUNHLFFBQVE7a0JBQWhCLEtBQUs7WUFDRyxpQ0FBaUM7a0JBQXpDLEtBQUs7WUFDRyxjQUFjO2tCQUF0QixLQUFLO1lBQ0csZUFBZTtrQkFBdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBDaGFuZ2VEZXRlY3RvclJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE9uSW5pdCwgT25EZXN0cm95fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSZXN1bHRzLCBBZ2dyZWdhdGlvbiwgQWdncmVnYXRpb25JdGVtfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7RmFjZXRTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vZmFjZXQuc2VydmljZVwiO1xuaW1wb3J0IHtBY3Rpb259IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2FjdGlvblwiO1xuaW1wb3J0IHtBYnN0cmFjdEZhY2V0fSBmcm9tIFwiLi4vLi4vYWJzdHJhY3QtZmFjZXRcIjtcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBvZiwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7Y2F0Y2hFcnJvciwgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBzd2l0Y2hNYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7Rm9ybUNvbnRyb2wsIEZvcm1Hcm91cH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1mYWNldC1saXN0XCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9mYWNldC1saXN0Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vZmFjZXQtbGlzdC5zY3NzXCJdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJzRmFjZXRMaXN0IGV4dGVuZHMgQWJzdHJhY3RGYWNldCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZzsgLy8gSWYgb21taXRlZCwgdGhlIGFnZ3JlZ2F0aW9uIG5hbWUgaXMgdXNlZFxuICAgIEBJbnB1dCgpIHJlc3VsdHM6IFJlc3VsdHM7XG4gICAgQElucHV0KCkgYWdncmVnYXRpb246IHN0cmluZztcbiAgICBASW5wdXQoKSBzaG93Q291bnQ6IGJvb2xlYW4gPSB0cnVlOyAvLyBTaG93IHRoZSBudW1iZXIgb2Ygb2NjdXJyZW5jZXNcbiAgICBASW5wdXQoKSBzZWFyY2hhYmxlOiBib29sZWFuID0gdHJ1ZTsgLy8gQWxsb3cgdG8gc2VhcmNoIGZvciBpdGVtcyBpbiB0aGUgZmFjZXRcbiAgICBASW5wdXQoKSBhbGxvd0V4Y2x1ZGU6IGJvb2xlYW4gPSB0cnVlOyAvLyBBbGxvdyB0byBleGNsdWRlIHNlbGVjdGVkIGl0ZW1zXG4gICAgQElucHV0KCkgYWxsb3dPcjogYm9vbGVhbiA9IHRydWU7IC8vIEFsbG93IHRvIHNlYXJjaCB2YXJpb3VzIGl0ZW1zIGluIE9SIG1vZGVcbiAgICBASW5wdXQoKSBhbGxvd0FuZDogYm9vbGVhbiA9IHRydWU7IC8vIEFsbG93IHRvIHNlYXJjaCB2YXJpb3VzIGl0ZW1zIGluIEFORCBtb2RlXG4gICAgQElucHV0KCkgZGlzcGxheUVtcHR5RGlzdHJpYnV0aW9uSW50ZXJ2YWxzOiBib29sZWFuID0gZmFsc2U7IC8vIElmIHRoZSBhZ2dyZWdyYXRpb24gaXMgYSBkaXN0cmlidXRpb24sIHRoZW4gdGhpcyBwcm9wZXJ0eSBjb250cm9scyB3aGV0aGVyIGVtcHR5IGRpc3RyaWJ1dGlvbiBpbnRlcnZhbHMgd2lsbCBiZSBkaXNwbGF5ZWRcbiAgICBASW5wdXQoKSBkaXNwbGF5QWN0aW9ucyA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHNob3dQcm9ncmVzc0JhciA9IGZhbHNlOyAgICAvLyBBbGxvdyB0byBkaXNwbGF5IGl0ZW0gY291bnQgYXMgcHJvZ3Jlc3MgYmFyXG5cbiAgICAvLyBBZ2dyZWdhdGlvbiBmcm9tIHRoZSBSZXN1bHRzIG9iamVjdFxuICAgIGRhdGEkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBZ2dyZWdhdGlvbiB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKVxuICAgIGl0ZW1zJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWdncmVnYXRpb25JdGVtW10+KFtdKTtcbiAgICBkYXRhID0gKCkgPT4gdGhpcy5kYXRhJC5nZXRWYWx1ZSgpO1xuICAgIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgICBmaWx0ZXJpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vIFNlYXJjaFxuICAgIG15R3JvdXA6IEZvcm1Hcm91cDtcbiAgICBzZWFyY2hRdWVyeTogRm9ybUNvbnRyb2w7IC8vIG5nTW9kZWwgZm9yIHRleHRhcmVhXG4gICAgc3VnZ2VzdERlbGF5ID0gMjAwO1xuICAgIG5vUmVzdWx0cyA9IGZhbHNlO1xuICAgIHNlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgIHN1Z2dlc3Rpb25zJDogQmVoYXZpb3JTdWJqZWN0PEFnZ3JlZ2F0aW9uSXRlbVtdPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWdncmVnYXRpb25JdGVtW10+KFtdKTtcbiAgICBcbiAgICAvKiogU3VtIG9mIGFsbCBpdGVtcyBjb3VudCB2YWx1ZSAqL1xuICAgIHN1bU9mQ291bnQ6IG51bWJlcjtcblxuICAgIC8qKiBMaXN0IG9mIHNlbGVjdGVkIGl0ZW1zICovXG4gICAgc2VsZWN0ZWQ6IEFnZ3JlZ2F0aW9uSXRlbVtdID0gW107XG5cbiAgICAvKiogU2VsZWN0ZWQgaXRlbXMgdGhhdCBhcmUgbm90IHZpc2libGUgaW4gdGhlIGN1cnJlbnQgYWdncmVnYXRpb24gKG9yIHN1Z2dlc3Rpb25zIGluIHNlYXJjaCBtb2RlKSAqL1xuICAgIGhpZGRlblNlbGVjdGVkOiBBZ2dyZWdhdGlvbkl0ZW1bXSA9IFtdO1xuICAgIFxuICAgIC8qKiBMaXN0IG9mIGV4Y2x1ZGVkL2ZpbHRlcmVkIGl0ZW1zICovXG4gICAgZmlsdGVyZWQ6IEFnZ3JlZ2F0aW9uSXRlbVtdID0gW107XG5cblxuICAgIC8vIExvYWRpbmcgbW9yZSBkYXRhXG4gICAgcHJpdmF0ZSBza2lwID0gMDtcbiAgICAvKiogbnVtIG9mIGl0ZW1zIGN1cnJlbnRseSBkaXNwbGF5ZWQgaW4gdGhlIGZhY2V0ICovXG4gICAgcHJpdmF0ZSBjb3VudCA9IDA7XG4gICAgLyoqIERvZXMgZmFjZXQgaGFzIG1vcmUgaXRlbXMgdG8gZGlzcGxheSA/ICovXG4gICAgbG9hZGluZ01vcmUgPSBmYWxzZTtcblxuICAgIC8vIEFjdGlvbnMgKGRpc3BsYXllZCBpbiBmYWNldCBtZW51KVxuICAgIC8vIEFsbCBhY3Rpb25zIGFyZSBidWlsdCBpbiB0aGUgY29uc3RydWN0b3JcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZpbHRlckl0ZW1zT3I6IEFjdGlvbjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZpbHRlckl0ZW1zQW5kOiBBY3Rpb247XG4gICAgcHJpdmF0ZSByZWFkb25seSBleGNsdWRlSXRlbXM6IEFjdGlvbjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNsZWFyRmlsdGVyczogQWN0aW9uO1xuICAgIHB1YmxpYyByZWFkb25seSBzZWFyY2hJdGVtczogQWN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZmFjZXRTZXJ2aWNlOiBGYWNldFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5teUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgICAgICAgICBzZWFyY2hRdWVyeTogbmV3IEZvcm1Db250cm9sKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSA9IHRoaXMubXlHcm91cC5nZXQoXCJzZWFyY2hRdWVyeVwiKSBhcyBGb3JtQ29udHJvbDtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zW1wic3VnZ2VzdFwiXSA9IHRoaXMuc3VnZ2VzdCQodGhpcy5zZWFyY2hRdWVyeS52YWx1ZUNoYW5nZXMpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHZhbHVlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWdnZXN0aW9ucyQubmV4dCh2YWx1ZXMpO1xuICAgICAgICAgICAgICAgIC8vIFJlZnJlc2ggaGlkZGVuU2VsZWN0ZWQgbGlzdCB3aGVuIHRoZSBsaXN0IG9mIGl0ZW1zIGlzIHVwZGF0ZWRcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hIaWRkZW5TZWxlY3RlZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEtlZXAgZG9jdW1lbnRzIHdpdGggQU5ZIG9mIHRoZSBzZWxlY3RlZCBpdGVtc1xuICAgICAgICB0aGlzLmZpbHRlckl0ZW1zT3IgPSBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgIGljb246IFwiZmFzIGZhLWZpbHRlclwiLFxuICAgICAgICAgICAgdGl0bGU6IFwibXNnI2ZhY2V0LmZpbHRlckl0ZW1zXCIsXG4gICAgICAgICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWNldFNlcnZpY2UuYWRkRmlsdGVyU2VhcmNoKHRoaXMuZ2V0TmFtZSgpLCB0aGlzLmRhdGEoKSBhcyBBZ2dyZWdhdGlvbiwgdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBLZWVwIGRvY3VtZW50cyB3aXRoIEFMTCB0aGUgc2VsZWN0ZWQgaXRlbXNcbiAgICAgICAgdGhpcy5maWx0ZXJJdGVtc0FuZCA9IG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgaWNvbjogXCJmYXMgZmEtYnVsbHNleWVcIixcbiAgICAgICAgICAgIHRpdGxlOiBcIm1zZyNmYWNldC5maWx0ZXJJdGVtc0FuZFwiLFxuICAgICAgICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmFjZXRTZXJ2aWNlLmFkZEZpbHRlclNlYXJjaCh0aGlzLmdldE5hbWUoKSwgdGhpcy5kYXRhKCkgYXMgQWdncmVnYXRpb24sIHRoaXMuc2VsZWN0ZWQsIHthbmQ6IHRydWV9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEV4Y2x1ZGUgZG9jdW1lbnQgd2l0aCBzZWxlY3RlZCBpdGVtc1xuICAgICAgICB0aGlzLmV4Y2x1ZGVJdGVtcyA9IG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgaWNvbjogXCJmYXMgZmEtdGltZXNcIixcbiAgICAgICAgICAgIHRpdGxlOiBcIm1zZyNmYWNldC5leGNsdWRlSXRlbXNcIixcbiAgICAgICAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhY2V0U2VydmljZS5hZGRGaWx0ZXJTZWFyY2godGhpcy5nZXROYW1lKCksIHRoaXMuZGF0YSgpIGFzIEFnZ3JlZ2F0aW9uLCB0aGlzLnNlbGVjdGVkLCB7bm90OiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDbGVhciB0aGUgY3VycmVudCBmaWx0ZXJzXG4gICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJzID0gbmV3IEFjdGlvbih7XG4gICAgICAgICAgICBpY29uOiBcImZhciBmYS1taW51cy1zcXVhcmVcIixcbiAgICAgICAgICAgIHRpdGxlOiBcIm1zZyNmYWNldC5jbGVhclNlbGVjdHNcIixcbiAgICAgICAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZmFjZXRTZXJ2aWNlLmNsZWFyRmlsdGVyc1NlYXJjaCh0aGlzLmdldE5hbWUoKSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFNlYXJjaCBmb3IgYSB2YWx1ZSBpbiB0aGlzIGxpc3RcbiAgICAgICAgdGhpcy5zZWFyY2hJdGVtcyA9IG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgaWNvbjogXCJmYXMgZmEtc2VhcmNoXCIsXG4gICAgICAgICAgICB0aXRsZTogXCJtc2cjZmFjZXQuc2VhcmNoSXRlbXNcIixcbiAgICAgICAgICAgIGFjdGlvbjogKGl0ZW0sIGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9ICFpdGVtLnNlbGVjdGVkO1xuICAgICAgICAgICAgICAgIGlmKCFpdGVtLnNlbGVjdGVkKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclNlYXJjaCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGVhclNlYXJjaCgpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hRdWVyeS5zZXRWYWx1ZShcIlwiKTsgLy8gUmVtb3ZlIHN1Z2dlc3Rpb25zIGlmIHNvbWUgcmVtYWluXG4gICAgICAgIHRoaXMubm9SZXN1bHRzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3VnZ2VzdGlvbnMkLm5leHQoW10pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGZhY2V0LCB1c2VkIHRvIGNyZWF0ZSBhbmQgcmV0cmlldmUgc2VsZWN0aW9uc1xuICAgICAqIHRocm91Z2ggdGhlIGZhY2V0IHNlcnZpY2UuXG4gICAgICovXG4gICAgZ2V0TmFtZSgpIDogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSB8fCB0aGlzLmFnZ3JlZ2F0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9uQ2hhbmdlcyBsaXN0ZW5lciBhd2FpdHMgbmV3IHJlc3VsdHMgZnJvbSB0aGUgc2VhcmNoIHNlcnZpY2VcbiAgICAgKiBUaGlzIGNvbXBsZXRlbHkgcmVzZXRzIHRoZSBkaXNwbGF5XG4gICAgICogQHBhcmFtIGNoYW5nZXNcbiAgICAgKi9cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dDb3VudCA9PT0gdW5kZWZpbmVkKSB0aGlzLnNob3dDb3VudCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaGFibGUgPT09IHVuZGVmaW5lZCkgdGhpcy5zZWFyY2hhYmxlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuYWxsb3dFeGNsdWRlID09PSB1bmRlZmluZWQpIHRoaXMuYWxsb3dFeGNsdWRlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuYWxsb3dPciA9PT0gdW5kZWZpbmVkKSB0aGlzLmFsbG93T3IgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5hbGxvd0FuZCA9PT0gdW5kZWZpbmVkKSB0aGlzLmFsbG93QW5kID0gdHJ1ZTtcblxuICAgICAgICBpZiAoISFjaGFuZ2VzW1wicmVzdWx0c1wiXSkgeyAgICAgLy8gTmV3IGRhdGEgZnJvbSB0aGUgc2VhcmNoIHNlcnZpY2VcbiAgICAgICAgICAgIGlmKCF0aGlzLmNvdW50KXtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50ID0gdGhpcy5mYWNldFNlcnZpY2UuZ2V0QWdncmVnYXRpb25Db3VudCh0aGlzLmFnZ3JlZ2F0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZmlsdGVyZWQubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRoaXMuaGlkZGVuU2VsZWN0ZWQubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2tpcCA9IDA7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaEl0ZW1zLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VhcmNoKCk7XG4gICAgICAgICAgICB0aGlzLmRhdGEkLm5leHQodGhpcy5mYWNldFNlcnZpY2UuZ2V0QWdncmVnYXRpb24odGhpcy5hZ2dyZWdhdGlvbiwgdGhpcy5yZXN1bHRzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zW1wiZGF0YVwiXSA9IHRoaXMuZGF0YSQucGlwZShcbiAgICAgICAgICAgIG1hcChkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBub25GaWx0ZXJlZEl0ZW1zID0gdGhpcy5yZWZyZXNoRmlsdGVyZWQoZGF0YSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gIWRhdGE/LmlzRGlzdHJpYnV0aW9uIHx8IHRoaXMuZGlzcGxheUVtcHR5RGlzdHJpYnV0aW9uSW50ZXJ2YWxzP1xuICAgICAgICAgICAgICAgICAgICBub25GaWx0ZXJlZEl0ZW1zIDogbm9uRmlsdGVyZWRJdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmNvdW50ID4gMCk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKS5zdWJzY3JpYmUoaXRlbXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdW1PZkNvdW50ID0gaXRlbXMubGVuZ3RoID4gMCA/IGl0ZW1zLm1hcChpdGVtID0+IGl0ZW0uY291bnQpLnJlZHVjZSgoYWNjLCB2YWx1ZSkgPT4gYWNjICs9IHZhbHVlKSAvIDEwMCA6IDA7XG4gICAgICAgICAgICB0aGlzLml0ZW1zJC5uZXh0KGl0ZW1zKTtcbiAgICAgICAgICAgIC8vIFJlZnJlc2ggaGlkZGVuU2VsZWN0ZWQgbGlzdCB3aGVuIHRoZSBsaXN0IG9mIGl0ZW1zIGlzIHVwZGF0ZWRcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEhpZGRlblNlbGVjdGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWJzY3JpcHRpb24gPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHRoZSBhY3Rpb25zIHRoYXQgYXJlIHJlbGV2YW50IGluIHRoZSBjdXJyZW50IGNvbnRleHRcbiAgICAgKi9cbiAgICBnZXQgYWN0aW9ucygpOiBBY3Rpb25bXSB7XG5cbiAgICAgICAgY29uc3QgYWN0aW9uczogQWN0aW9uW10gPSBbXTtcblxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZih0aGlzLmFsbG93T3Ipe1xuICAgICAgICAgICAgICAgIGFjdGlvbnMucHVzaCh0aGlzLmZpbHRlckl0ZW1zT3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5hbGxvd0FuZCAmJiB0aGlzLnNlbGVjdGVkLmxlbmd0aCA+IDEpe1xuICAgICAgICAgICAgICAgIGFjdGlvbnMucHVzaCh0aGlzLmZpbHRlckl0ZW1zQW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMuYWxsb3dFeGNsdWRlKXtcbiAgICAgICAgICAgICAgICBhY3Rpb25zLnB1c2godGhpcy5leGNsdWRlSXRlbXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXRoaXMuaGFzU3VnZ2VzdGlvbnMoKSAmJiB0aGlzLmhhc0ZpbHRlcmVkKCkpIHtcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaCh0aGlzLmNsZWFyRmlsdGVycyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLnNlYXJjaGFibGUpe1xuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKHRoaXMuc2VhcmNoSXRlbXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFjdGlvbnM7XG4gICAgfVxuXG5cbiAgICAvLyBGaWx0ZXJlZCBpdGVtc1xuXG4gICAgLyoqXG4gICAgICogQWN0dWFsaXplIHRoZSBzdGF0ZSBvZiBmaWx0ZXJlZCBpdGVtcyAobm90ZSB0aGF0IGV4Y2x1ZGVkIHRlcm1zIGFyZSBub3QgaW4gdGhlIGRpc3RyaWJ1dGlvbiwgc28gdGhlIGVxdWl2YWxlbnQgY2Fubm90IGJlIGRvbmUpXG4gICAgICovXG4gICAgcmVmcmVzaEZpbHRlcmVkKGRhdGE6IEFnZ3JlZ2F0aW9uIHwgdW5kZWZpbmVkKTogQWdncmVnYXRpb25JdGVtW10ge1xuICAgICAgICAvLyByZWZyZXNoIGZpbHRlcnMgZnJvbSBicmVhZGNydW1ic1xuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuZmFjZXRTZXJ2aWNlLmdldEFnZ3JlZ2F0aW9uSXRlbXNGaWx0ZXJlZCh0aGlzLmdldE5hbWUoKSwgZGF0YT8udmFsdWVzQXJlRXhwcmVzc2lvbnMpO1xuICAgICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzRmlsdGVyZWQoZGF0YSwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmVkLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG5vbkZpbHRlcmVkSXRlbXM6IEFnZ3JlZ2F0aW9uSXRlbVtdID0gW107XG4gICAgICAgIGRhdGE/Lml0ZW1zPy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5keCA9IHRoaXMuZmFjZXRTZXJ2aWNlLmZpbHRlcmVkSW5kZXgoZGF0YSwgdGhpcy5maWx0ZXJlZCwgaXRlbSk7XG4gICAgICAgICAgICBpZiAodGhpcy5mYWNldFNlcnZpY2UuaXRlbUZpbHRlcmVkKHRoaXMuZ2V0TmFtZSgpLCBkYXRhLCBpdGVtKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0ZpbHRlcmVkKGRhdGEsIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWQucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmVkW2luZHhdLmNvdW50ID0gaXRlbS5jb3VudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHNvbWV0aW1lIGZhY2V0U2VydmljZS5pdGVtRmlsdGVyZWQoKSBjb3VsZCByZXR1cm5zIGZhbHNlIGJ1dCBpdGVtIGlzIHByZXNlbnQgaW4gYnJlYWRjcnVtYnNcbiAgICAgICAgICAgICAgICBpZiAoaW5keCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZFtpbmR4XS5jb3VudCA9IGl0ZW0uY291bnQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbm9uRmlsdGVyZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBub25GaWx0ZXJlZEl0ZW1zO1xuICAgIH1cblxuICAgIHJlZnJlc2hIaWRkZW5TZWxlY3RlZCgpIHtcbiAgICAgICAgdGhpcy5oaWRkZW5TZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5oYXNTdWdnZXN0aW9ucygpXG4gICAgICAgICAgICAgICAgPyB0aGlzLmZhY2V0U2VydmljZS5maW5kQWdncmVnYXRpb25JdGVtSW5kZXgodGhpcy5zdWdnZXN0aW9ucyQuZ2V0VmFsdWUoKSwgaXRlbSlcbiAgICAgICAgICAgICAgICA6IHRoaXMuZmFjZXRTZXJ2aWNlLmZpbmRBZ2dyZWdhdGlvbkl0ZW1JbmRleCh0aGlzLml0ZW1zJC5nZXRWYWx1ZSgpIHx8IFtdLCBpdGVtKTtcbiAgICAgICAgICAgIHJldHVybiBpZHggPT09IC0xO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIEFnZ3JlZ2F0aW9uSXRlbSBpcyBmaWx0ZXJlZFxuICAgICAqIEBwYXJhbSBpdGVtXG4gICAgICovXG4gICAgaXNGaWx0ZXJlZChkYXRhOiBBZ2dyZWdhdGlvbiB8IHVuZGVmaW5lZCwgaXRlbTogQWdncmVnYXRpb25JdGVtKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZhY2V0U2VydmljZS5maWx0ZXJlZEluZGV4KGRhdGEsIHRoaXMuZmlsdGVyZWQsIGl0ZW0pICE9PSAtMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlcmUgaXMgYW4gYWN0aXZlIHNlbGVjdGlvbiAob3IgZXhjbHVzaW9uKSBmcm9tIHRoaXMgZmFjZXRcbiAgICAgKi9cbiAgICBoYXNGaWx0ZXJlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmFjZXRTZXJ2aWNlLmhhc0ZpbHRlcmVkKHRoaXMuZ2V0TmFtZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBjbGlja2luZyBvbiBhIGZhY2V0IGl0ZW0gdGV4dFxuICAgICAqIEBwYXJhbSBpdGVtXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgZmlsdGVySXRlbShpdGVtOiBBZ2dyZWdhdGlvbkl0ZW0sIGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRhdGEoKTtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0ZpbHRlcmVkKGRhdGEsIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNldFNlcnZpY2UuYWRkRmlsdGVyU2VhcmNoKHRoaXMuZ2V0TmFtZSgpLCBkYXRhLCBpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZmFjZXRTZXJ2aWNlLnJlbW92ZUZpbHRlclNlYXJjaCh0aGlzLmdldE5hbWUoKSwgZGF0YSwgaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cblxuICAgIC8vIFNlbGVjdGVkIGl0ZW1zXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIEFnZ3JlZ2F0aW9uSXRlbSBpcyBzZWxlY3RlZFxuICAgICAqIEBwYXJhbSBpdGVtXG4gICAgICovXG4gICAgaXNTZWxlY3RlZChpdGVtOiBBZ2dyZWdhdGlvbkl0ZW0pIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZhY2V0U2VydmljZS5maW5kQWdncmVnYXRpb25JdGVtSW5kZXgodGhpcy5zZWxlY3RlZCwgaXRlbSkgIT09IC0xO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gc2VsZWN0aW5nL3Vuc2VsZWN0aW5nIGFuIGl0ZW0gaW4gdGhlIGZhY2V0XG4gICAgICogQHBhcmFtIGl0ZW1cbiAgICAgKi9cbiAgICBzZWxlY3RJdGVtKGl0ZW06IEFnZ3JlZ2F0aW9uSXRlbSwgZTogRXZlbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZighdGhpcy5maWx0ZXJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWQoaXRlbSk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmlsdGVyaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVTZWxlY3RlZChpdGVtOiBBZ2dyZWdhdGlvbkl0ZW0pIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRmlsdGVyZWQodGhpcy5kYXRhKCksIGl0ZW0pKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZmFjZXRTZXJ2aWNlLmZpbmRBZ2dyZWdhdGlvbkl0ZW1JbmRleCh0aGlzLnNlbGVjdGVkLCBpdGVtKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEhpZGRlblNlbGVjdGVkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIExvYWRpbmcgbW9yZSBpdGVtc1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgZmFjZXQgY2FuIGdldCBtb3JlIGRhdGEgZnJvbSB0aGUgc2VydmVyXG4gICAgICogKFRoZSBvbmx5IHdheSB0byBndWVzcyBpcyB0byBjaGVjayBpZiB0aGUgZmFjZXQgaXMgXCJmdWxsXCIsIGl0IGNhcGFjaXR5IGJlaW5nIHRoZSAoc2tpcCspY291bnQpXG4gICAgICovXG4gICAgZ2V0IGhhc01vcmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3VsdHNMZW5ndGggPj0gdGhpcy5za2lwICsgdGhpcy5jb3VudDtcbiAgICB9XG5cbiAgICBnZXQgcmVzdWx0c0xlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMkLmdldFZhbHVlKCkubGVuZ3RoICsgdGhpcy5maWx0ZXJlZC5sZW5ndGhcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgb24gbG9hZE1vcmUgYnV0dG9uIGNsaWNrXG4gICAgICovXG4gICAgbG9hZE1vcmUoZTogRXZlbnQpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKHRoaXMuZGF0YSgpKSB7XG4gICAgICAgICAgICBjb25zdCBza2lwID0gdGhpcy5yZXN1bHRzTGVuZ3RoOyAgICAvLyBhdm9pZCBoYXNNb3JlKCkgdG8gcmV0dXJuIGZhbHNlIHdoZW4gZmV0Y2hpbmcgZGF0YVxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nTW9yZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgICAgICBVdGlscy5zdWJzY3JpYmUodGhpcy5mYWNldFNlcnZpY2UubG9hZERhdGEodGhpcy5hZ2dyZWdhdGlvbiwgc2tpcCwgdGhpcy5jb3VudCksXG4gICAgICAgICAgICAgICAgYWdnID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lwID0gc2tpcDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFnZz8uaXRlbXMgJiYgdGhpcy5kYXRhKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZy5pdGVtcyA9IHRoaXMuaXRlbXMkLmdldFZhbHVlKCkuY29uY2F0KGFnZy5pdGVtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEkLm5leHQoYWdnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nTW9yZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gQXZvaWRzIGZvbGxvd2luZyBocmVmXG4gICAgfVxuXG5cbiAgICAvLyBTdWdnZXN0IC8gU2VhcmNoXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHNlYXJjaCBtb2RlIGlzIGFjdGl2ZSAoaWUuIHRoZXJlIGFyZSBzdWdnZXN0aW9ucyB0byBkaXNwbGF5IGluIHBsYWNlIG9mIHRoZSBhZ2dyZWdhdGlvbilcbiAgICAgKi9cbiAgICBoYXNTdWdnZXN0aW9ucygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VnZ2VzdGlvbnMkLmdldFZhbHVlKCkubGVuZ3RoID4gMCB8fCB0aGlzLm5vUmVzdWx0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgb24gTmdNb2RlbCBjaGFuZ2UgKHNlYXJjaFF1ZXJ5KVxuICAgICAqIFVzZXMgdGhlIHN1Z2dlc3RmaWVsZCBBUEkgdG8gcmV0cmlldmUgc3VnZ2VzdGlvbnMgZnJvbSB0aGUgc2VydmVyXG4gICAgICogVGhlIHN1Z2dlc3Rpb25zIFwib3ZlcnJpZGVcIiB0aGUgZGF0YSBmcm9tIHRoZSBkaXN0cmlidXRpb24gKHVudGlsIHNlYXJjaCByZXN1bHRzIGFyZSBjbGVhcmVkKVxuICAgICAqL1xuICAgIHN1Z2dlc3QkID0gKHRleHQkOiBPYnNlcnZhYmxlPHN0cmluZz4pID0+IHRleHQkLnBpcGUoXG4gICAgICAgIGRlYm91bmNlVGltZSh0aGlzLnN1Z2dlc3REZWxheSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgIHN3aXRjaE1hcCh0ZXJtID0+IHtcbiAgICAgICAgICAgIGlmICh0ZXJtLnRyaW0oKSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgIHRoaXMubm9SZXN1bHRzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VhcmNoQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mYWNldFNlcnZpY2Uuc3VnZ2VzdCh0ZXJtLCB0aGlzLmRhdGEoKT8uY29sdW1uIHx8ICcnKS5waXBlKFxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub1Jlc3VsdHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKFtdKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBtYXAoaXRlbXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWdnZXN0aW9ucyA9IGl0ZW1zLnNsaWNlKDAsIHRoaXMuY291bnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKGl0ZW0gPT4gdGhpcy5mYWNldFNlcnZpY2Uuc3VnZ2VzdGlvblRvQWdncmVnYXRpb25JdGVtKGl0ZW0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihpdGVtID0+ICF0aGlzLmlzRmlsdGVyZWQodGhpcy5kYXRhKCksIGl0ZW0pKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vUmVzdWx0cyA9IHN1Z2dlc3Rpb25zLmxlbmd0aCA9PT0gMCAmJiB0ZXJtLnRyaW0oKSAhPT0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1Z2dlc3Rpb25zO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgKVxuXG4gICAgLyogQWJzdHJhY3RGYWNldCBhYnN0cmFjdCBtZXRob2RzICovXG4gICAgaXNIaWRkZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5kYXRhKCk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgZmFjZXQgaXRlbSBjb3VudCB0byBwZXJjZW50YWdlIHdpZHRoXG4gICAgICogQHBhcmFtIGNvdW50IGl0ZW0gY291bnRcbiAgICAgKiBAcmV0dXJucyBhICUgc3RyaW5nIHJlcHJlc2VudGF0aW9uXG4gICAgICovXG4gICAgZ2V0UGVyY2VudChjb3VudDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAkezEwMCAtIChjb3VudCAvIHRoaXMuc3VtT2ZDb3VudCl9JWA7XG4gICAgfVxufVxuIiwiPGRpdiAqbmdJZj1cIiFpc0hpZGRlbigpXCIgY2xhc3M9XCJsaXN0LWdyb3VwIGxpc3QtZ3JvdXAtZmx1c2hcIj5cbiAgICA8ZGl2ICpuZ0lmPVwiZGlzcGxheUFjdGlvbnMgJiYgYWN0aW9uc1wiIGNsYXNzPVwiZC1mbGV4IHBiLTIgcHItMlwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIG1sLWF1dG9cIlxuICAgICAgICAgICAgW3NxLWFjdGlvbi1idXR0b25zXT1cIntpdGVtczogYWN0aW9ucywgc2l6ZTogJ3NtJ31cIj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2ICpuZ0lmPVwic2VhcmNoSXRlbXMuc2VsZWN0ZWRcIiBjbGFzcz1cInBvc2l0aW9uLXJlbGF0aXZlXCIgW2Zvcm1Hcm91cF09XCJteUdyb3VwXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwLTFcIj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHNxQXV0b2ZvY3VzXG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwic2VhcmNoUXVlcnlcIlxuICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCInbXNnI2ZhY2V0LnNlYXJjaFBsYWNlaG9sZGVyJyB8IHNxTWVzc2FnZVwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHNxLWxvYWRpbmctYmFyIFthY3RpdmVdPVwic2VhcmNoQWN0aXZlXCI+PC9zcS1sb2FkaW5nLWJhcj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gZmlsdGVyZWQgaXRlbXMgLS0+XG4gICAgPGRpdiAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZmlsdGVyZWRcIlxuICAgICAgICBjbGFzcz1cImQtZmxleCBmbGV4LXJvdyBhbGlnbi1pdGVtcy1jZW50ZXIgbGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS1hY3Rpb24gbGlzdC1ncm91cC1pdGVtLXN1Y2Nlc3MgdGV4dC10cnVuY2F0ZSBib3JkZXItMCBweC0zIHB5LTEgZmFjZXQtcm93IGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieydsaXN0LWdyb3VwLWl0ZW0tc3VjY2Vzcyc6ICFpdGVtLiRleGNsdWRlZCwgJ2xpc3QtZ3JvdXAtaXRlbS1zZWNvbmRhcnknOiBpdGVtLiRleGNsdWRlZH1cIlxuICAgICAgICBbdGl0bGVdPVwiJ21zZyNmYWNldC5zZWxlY3RlZFZhbHVlJyB8IHNxTWVzc2FnZVwiXG4gICAgICAgIChjbGljayk9XCJmaWx0ZXJJdGVtKGl0ZW0sICRldmVudClcIj5cblxuICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwidGV4dC10cnVuY2F0ZSBtci1hdXRvXCI+e3tpdGVtIHwgc3FWYWx1ZTppdGVtLiRjb2x1bW59fTwvYT5cblxuICAgICAgICA8c3BhbiAqbmdJZj1cInNob3dDb3VudCAmJiBpdGVtLmNvdW50XCIgY2xhc3M9XCJtbC0yIHRleHQtbXV0ZWQgc21hbGxcIj57e2l0ZW0uY291bnQgfCBzcU51bWJlcn19PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhLXN0YWNrIGN1cnNvci1wb2ludGVyXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cIm1sLTIgZmFyIGZhLW1pbnVzLXNxdWFyZSBmYS1zdGFjay0xeCBpY29ucyBpY29uLWhvdmVyIHJvdGF0ZVwiPjwvaT5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwibWwtMiBmYXIgZmEtY2hlY2stc3F1YXJlIGZhLXN0YWNrLTF4IGljb25zIGljb24tZGVmYXVsdCByb3RhdGVcIj48L2k+XG4gICAgICAgIDwvc3Bhbj5cblxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBoaWRkZW4gc2VsZWN0ZWQgaXRlbXMgLS0+XG4gICAgPGRpdiAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaGlkZGVuU2VsZWN0ZWRcIlxuICAgICAgICBjbGFzcz1cImQtZmxleCBmbGV4LXJvdyBhbGlnbi1pdGVtcy1jZW50ZXIgbGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS1wcmltYXJ5IHRleHQtdHJ1bmNhdGUgYm9yZGVyLTAgcHgtMyBweS0xIGZhY2V0LXJvdyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgIFt0aXRsZV09XCInbXNnI2ZhY2V0Lml0ZW1VbnNlbGVjdCcgfCBzcU1lc3NhZ2VcIlxuICAgICAgICAoY2xpY2spPVwic2VsZWN0SXRlbShpdGVtLCAkZXZlbnQpXCI+XG5cbiAgICAgICAgPGEgIGhyZWY9XCIjXCIgKGNsaWNrKT1cImZpbHRlckl0ZW0oaXRlbSwgJGV2ZW50KVwiXG4gICAgICAgICAgICBbdGl0bGVdPVwiJ21zZyNmYWNldC5maWx0ZXJJdGVtJyB8IHNxTWVzc2FnZTp7J3Rlcm1lJzooaXRlbSB8IHNxVmFsdWU6aXRlbS4kY29sdW1uKX1cIlxuICAgICAgICAgICAgY2xhc3M9XCJ0ZXh0LXRydW5jYXRlIG1yLWF1dG9cIj57e2l0ZW0gfCBzcVZhbHVlOml0ZW0uJGNvbHVtbn19PC9hPlxuICAgICAgICBcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93Q291bnQgJiYgaXRlbS5jb3VudFwiIGNsYXNzPVwibWwtMiB0ZXh0LW11dGVkIHNtYWxsXCI+e3tpdGVtLmNvdW50IHwgc3FOdW1iZXJ9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0tIHN1Z2dlc3Rpb25zIGl0ZW1zIC0tPlxuICAgIDxkaXYgKm5nRm9yPVwibGV0IHN1Z2dlc3Qgb2Ygc3VnZ2VzdGlvbnMkIHwgYXN5bmNcIlxuICAgICAgICBjbGFzcz1cImQtZmxleCBmbGV4LXJvdyBhbGlnbi1pdGVtcy1jZW50ZXIgbGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS1hY3Rpb24gdGV4dC10cnVuY2F0ZSBib3JkZXItMCBweC0zIHB5LTEgZmFjZXQtcm93IGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieydsaXN0LWdyb3VwLWl0ZW0tcHJpbWFyeSc6IGlzU2VsZWN0ZWQoc3VnZ2VzdCl9XCJcbiAgICAgICAgKGNsaWNrKT1cInNlbGVjdEl0ZW0oc3VnZ2VzdCwgJGV2ZW50KVwiPlxuICAgICAgICBcbiAgICAgICAgPGEgIGhyZWY9XCIjXCIgKGNsaWNrKT1cImZpbHRlckl0ZW0oc3VnZ2VzdCwgJGV2ZW50KVwiXG4gICAgICAgICAgICByb2xlPVwiYnV0dG9uXCIgXG4gICAgICAgICAgICB0aXRsZT1cInt7ICdtc2cjZmFjZXQuZmlsdGVySXRlbScgfCBzcU1lc3NhZ2U6eyd0ZXJtZSc6KHN1Z2dlc3QgfCBzcVZhbHVlOnN1Z2dlc3QuJGNvbHVtbil9IH19XCJcbiAgICAgICAgICAgIGNsYXNzPVwidGV4dC10cnVuY2F0ZSBtci1hdXRvXCI+e3tzdWdnZXN0IHwgc3FWYWx1ZTpzdWdnZXN0LiRjb2x1bW59fTwvYT4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93Q291bnQgJiYgc3VnZ2VzdC5jb3VudFwiIGNsYXNzPVwibWwtMiB0ZXh0LW11dGVkIHNtYWxsXCIgc3R5bGU9XCJ6LWluZGV4OiAxO1wiPnt7c3VnZ2VzdC5jb3VudCB8IHNxTnVtYmVyfX08L3NwYW4+XG4gICAgXG4gICAgPC9kaXY+XG4gICAgPHNwYW4gKm5nSWY9XCJub1Jlc3VsdHNcIiBjbGFzcz1cImQtYmxvY2sgdGV4dC1jZW50ZXIgdGV4dC1tdXRlZCBzbWFsbCBweS0xXCI+PGk+e3snbXNnI2ZhY2V0LnNlYXJjaE5vUmVzdWx0JyB8IHNxTWVzc2FnZX19PC9pPjwvc3Bhbj5cblxuICAgIDxkaXYgKm5nSWY9XCIhaGFzU3VnZ2VzdGlvbnMoKVwiIGNsYXNzPVwiZmFjZXQtcmVzdWx0cy1zY3JvbGxhYmxlXCI+XG4gICAgICAgIDwhLS0tIGFnZ3JlZ2F0aW9uIGl0ZW1zIHdpdGhvdXQgZmlsdGVyZWQgLS0+XG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXMkIHwgYXN5bmNcIlxuICAgICAgICAgICAgY2xhc3M9XCJwb3NpdGlvbi1yZWxhdGl2ZSBsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWFjdGlvbiBib3JkZXItMCBweC0zIHB5LTEgZmFjZXQtcm93IGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ2xpc3QtZ3JvdXAtaXRlbS1wcmltYXJ5JzogaXNTZWxlY3RlZChpdGVtKSB9XCJcbiAgICAgICAgICAgIFt0aXRsZV09XCIoaXNTZWxlY3RlZChpdGVtKSA/ICdtc2cjZmFjZXQuaXRlbVVuc2VsZWN0JyA6ICdtc2cjZmFjZXQuaXRlbVNlbGVjdCcpIHwgc3FNZXNzYWdlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RJdGVtKGl0ZW0sICRldmVudClcIj5cblxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cInNob3dQcm9ncmVzc0JhciAmJiByZXN1bHRzTGVuZ3RoID4gMVwiIGNsYXNzPVwicG9zaXRpb24tYWJzb2x1dGUgcHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWNvbG9yXCIgW3N0eWxlLi0tY291bnRdPVwiZ2V0UGVyY2VudChpdGVtLmNvdW50KVwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiBhbGlnbi1pdGVtcy1iYXNlbGluZVwiPlxuICAgICAgICAgICAgICAgIDxhICBocmVmPVwiI1wiIChjbGljayk9XCJmaWx0ZXJJdGVtKGl0ZW0sICRldmVudClcIiBzdHlsZT1cInotaW5kZXg6IDE7XCJcbiAgICAgICAgICAgICAgICAgICAgW3RpdGxlXT1cIidtc2cjZmFjZXQuZmlsdGVySXRlbScgfCBzcU1lc3NhZ2U6eyd0ZXJtZSc6KGl0ZW0gfCBzcVZhbHVlOml0ZW0uJGNvbHVtbil9XCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0ZXh0LXRydW5jYXRlIG1yLWF1dG9cIj57e2l0ZW0gfCBzcVZhbHVlOml0ZW0uJGNvbHVtbn19PC9hPlxuXG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93Q291bnQgJiYgaXRlbS5jb3VudFwiIGNsYXNzPVwibWwtMiB0ZXh0LW11dGVkIHNtYWxsXCIgc3R5bGU9XCJ6LWluZGV4OiAxO1wiPnt7aXRlbS5jb3VudCB8IHNxTnVtYmVyfX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGEgKm5nSWY9XCJoYXNNb3JlXCIgY2xhc3M9XCJkLWJsb2NrIGJvcmRlci0wIHB4LTMgcHktMSB0ZXh0LWNlbnRlclwiIChjbGljayk9XCJsb2FkTW9yZSgkZXZlbnQpXCIgaHJlZj1cIiNcIj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwibG9hZGluZ01vcmVcIiBjbGFzcz1cImZhcyBmYS1zeW5jIGZhLWZ3IGZhLXNwaW5cIj48L3NwYW4+XG4gICAgICAgICAgICA8c21hbGwgKm5nSWY9XCIhbG9hZGluZ01vcmVcIj57eydtc2cjZmFjZXQubG9hZE1vcmUnIHwgc3FNZXNzYWdlfX08L3NtYWxsPlxuICAgICAgICA8L2E+XG4gICAgPC9kaXY+XG5cbjwvZGl2PiJdfQ==