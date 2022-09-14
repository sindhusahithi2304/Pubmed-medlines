import { Component, Input } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import { HighlightCategoryFilterChoice } from "../../preview-document";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@sinequa/core/intl";
import * as i4 from "@sinequa/components/utils";
function BsPreviewHighlights_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 4);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 1, "msg#preview.noEntityToHighlight"), " ");
} }
function BsPreviewHighlights_ng_template_5_div_6_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "span");
    i0.ɵɵelementStart(2, "span", 30);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const categoryId_r9 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵclassMapInterpolate2("fas fa-bullseye ", ctx_r8.categoryIconClass(categoryId_r9), " ", categoryId_r9, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 5, ctx_r8.categoryDisplayLabel(categoryId_r9), ctx_r8.categoryLabelPipeParams(categoryId_r9)));
} }
function BsPreviewHighlights_ng_template_5_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵelementStart(1, "div", 27);
    i0.ɵɵtemplate(2, BsPreviewHighlights_ng_template_5_div_6_span_2_Template, 5, 8, "span", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "div", 29);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r3.currentCategories);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", ctx_r3.currentValue, i0.ɵɵsanitizeHtml);
} }
function BsPreviewHighlights_ng_template_5_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div");
    i0.ɵɵtext(4, "\u00A0");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#preview.noSelectedHighlight"), " ");
} }
function BsPreviewHighlights_ng_template_5_div_36_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵelement(1, "div", 33);
    i0.ɵɵelement(2, "div", 33);
    i0.ɵɵelementStart(3, "div", 34);
    i0.ɵɵelementStart(4, "div", 35);
    i0.ɵɵelementStart(5, "button", 36);
    i0.ɵɵlistener("click", function BsPreviewHighlights_ng_template_5_div_36_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r11); const ctx_r10 = i0.ɵɵnextContext(2); return ctx_r10.selectAll(); });
    i0.ɵɵpipe(6, "sqMessage");
    i0.ɵɵelement(7, "span", 37);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 35);
    i0.ɵɵelementStart(11, "button", 36);
    i0.ɵɵlistener("click", function BsPreviewHighlights_ng_template_5_div_36_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r11); const ctx_r12 = i0.ɵɵnextContext(2); return ctx_r12.selectNone(); });
    i0.ɵɵpipe(12, "sqMessage");
    i0.ɵɵelement(13, "span", 38);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
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
} }
function BsPreviewHighlights_ng_template_5_div_38_ng_container_7_option_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 45);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entityValue_r18 = ctx.$implicit;
    const ctx_r17 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("ngValue", ctx_r17.newFilter(entityValue_r18.value));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(entityValue_r18.displayValue);
} }
function BsPreviewHighlights_ng_template_5_div_38_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "select", 44);
    i0.ɵɵlistener("ngModelChange", function BsPreviewHighlights_ng_template_5_div_38_ng_container_7_Template_select_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r20); const categoryId_r13 = i0.ɵɵnextContext().$implicit; const ctx_r19 = i0.ɵɵnextContext(2); return (ctx_r19.navigationState.filters[categoryId_r13] = $event); })("ngModelChange", function BsPreviewHighlights_ng_template_5_div_38_ng_container_7_Template_select_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r20); const categoryId_r13 = i0.ɵɵnextContext().$implicit; const ctx_r22 = i0.ɵɵnextContext(2); return ctx_r22.selectFilter(categoryId_r13, $event); });
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
} if (rf & 2) {
    const categoryId_r13 = i0.ɵɵnextContext().$implicit;
    const ctx_r14 = i0.ɵɵnextContext(2);
    let tmp_3_0 = null;
    let tmp_5_0 = null;
    let tmp_6_0 = null;
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
} }
function BsPreviewHighlights_ng_template_5_div_38_ng_template_8_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const displayValue_r26 = ctx.ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" (", displayValue_r26, ") ");
} }
function BsPreviewHighlights_ng_template_5_div_38_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "select", 44);
    i0.ɵɵlistener("ngModelChange", function BsPreviewHighlights_ng_template_5_div_38_ng_template_8_Template_select_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r28); const categoryId_r13 = i0.ɵɵnextContext().$implicit; const ctx_r27 = i0.ɵɵnextContext(2); return (ctx_r27.navigationState.filters[categoryId_r13] = $event); })("ngModelChange", function BsPreviewHighlights_ng_template_5_div_38_ng_template_8_Template_select_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r28); const categoryId_r13 = i0.ɵɵnextContext().$implicit; const ctx_r30 = i0.ɵɵnextContext(2); return ctx_r30.selectFilter(categoryId_r13, $event); });
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
} if (rf & 2) {
    const categoryId_r13 = i0.ɵɵnextContext().$implicit;
    const ctx_r16 = i0.ɵɵnextContext(2);
    let tmp_3_0 = null;
    let tmp_4_0 = null;
    let tmp_6_0 = null;
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
} }
function BsPreviewHighlights_ng_template_5_div_38_Template(rf, ctx) { if (rf & 1) {
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
} if (rf & 2) {
    const categoryId_r13 = ctx.$implicit;
    const _r15 = i0.ɵɵreference(9);
    const ctx_r7 = i0.ɵɵnextContext(2);
    let tmp_1_0 = null;
    i0.ɵɵadvance(2);
    i0.ɵɵclassMapInterpolate2("fas fa-bullseye ", ctx_r7.categoryIconClass(categoryId_r13), " ", categoryId_r13, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(5, 7, (tmp_1_0 = ctx_r7.getCategoryHighlightData(categoryId_r13)) == null ? null : tmp_1_0.categoryDisplayLabelPlural, ctx_r7.categoryLabelPipeParams(categoryId_r13)), ": ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r7.categoryHasMultipleValues(categoryId_r13))("ngIfElse", _r15);
} }
function BsPreviewHighlights_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    const _r34 = i0.ɵɵgetCurrentView();
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
    i0.ɵɵlistener("click", function BsPreviewHighlights_ng_template_5_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r34); const ctx_r33 = i0.ɵɵnextContext(); return ctx_r33.first(); });
    i0.ɵɵpipe(11, "sqMessage");
    i0.ɵɵelement(12, "span", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 12);
    i0.ɵɵlistener("click", function BsPreviewHighlights_ng_template_5_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r34); const ctx_r35 = i0.ɵɵnextContext(); return ctx_r35.previous(); });
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
    i0.ɵɵlistener("click", function BsPreviewHighlights_ng_template_5_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r34); const ctx_r36 = i0.ɵɵnextContext(); return ctx_r36.next(); });
    i0.ɵɵpipe(26, "sqMessage");
    i0.ɵɵelement(27, "span", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "button", 12);
    i0.ɵɵlistener("click", function BsPreviewHighlights_ng_template_5_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r34); const ctx_r37 = i0.ɵɵnextContext(); return ctx_r37.last(); });
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
} if (rf & 2) {
    const _r4 = i0.ɵɵreference(8);
    const ctx_r2 = i0.ɵɵnextContext();
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
} }
export class BsPreviewHighlights {
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
BsPreviewHighlights.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewHighlights, selectors: [["sq-preview-highlights"]], inputs: { previewDocument: "previewDocument", previewData: "previewData" }, features: [i0.ɵɵNgOnChangesFeature], decls: 7, vars: 5, consts: [[1, "card", "sq-facet"], [1, "card-header"], [4, "ngIf", "ngIfElse"], ["normalCase", ""], [1, "card-body", "noEntityToHighlightMessage"], [1, "card-body"], [1, "currentSelection"], [1, "selectedHighlightTitle"], [1, "currentSelectionPanel"], ["class", "selectedHighlight", 4, "ngIf", "ngIfElse"], ["noSelection", ""], [1, "navigation-buttons"], [1, "btn", "btn-secondary", 3, "disabled", "title", "click"], [1, "fas", "fa-fast-backward"], [1, "fas", "fa-step-backward"], [1, "counter-container"], [1, "counter"], [1, "counter", "ghost"], [1, "fas", "fa-step-forward"], [1, "fas", "fa-fast-forward"], [1, "card-body", "filterPanel"], [1, "filterPanelTitle"], [1, "fas", "fa-filter"], ["class", "batchSelectButtonsContainer", 4, "ngIf"], [1, "filters"], ["class", "sq-highlight", 4, "ngFor", "ngForOf"], [1, "selectedHighlight"], [1, "currentCategories"], [4, "ngFor", "ngForOf"], [1, "selectedHighlightValue", 3, "innerHTML"], [1, "currentCategoryLabel"], [1, "noSelectionMessage"], [1, "batchSelectButtonsContainer"], [1, "batchSelectButtonsPaddingPlaceholder"], [1, "batchSelectButtons"], [1, "batchSelectButton"], [1, "btn", 3, "disabled", "title", "click"], [1, "far", "fa-check-square"], [1, "fas", "fa-times"], [1, "sq-highlight"], [1, "categoryIcon"], [1, "categoryLabel"], [1, "categoryFilter"], ["singleValue", ""], [1, "custom-select", 3, "ngModel", "compareWith", "ngModelChange"], [3, "ngValue"], ["disabled", "", 1, "selectSeparator"], [3, "ngValue", 4, "ngFor", "ngForOf"], [4, "ngIf"]], template: function BsPreviewHighlights_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵtext(2);
        i0.ɵɵpipe(3, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(4, BsPreviewHighlights_ng_container_4_Template, 4, 3, "ng-container", 2);
        i0.ɵɵtemplate(5, BsPreviewHighlights_ng_template_5_Template, 39, 38, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r1 = i0.ɵɵreference(6);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 3, "msg#preview.highlightsTitle"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.noData)("ngIfElse", _r1);
    } }, directives: [i1.NgIf, i1.NgForOf, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgModel, i2.NgSelectOption, i2.ɵangular_packages_forms_forms_x], pipes: [i3.MessagePipe, i4.NumberPipe], styles: [".noEntityToHighlightMessage[_ngcontent-%COMP%]{opacity:.5}.currentSelection[_ngcontent-%COMP%]{margin-bottom:.75rem}.selectedHighlightTitle[_ngcontent-%COMP%]{padding-bottom:.375em}.currentSelectionPanel[_ngcontent-%COMP%]{border:1px solid rgba(0,0,0,.125);padding:.5rem;text-align:center}.currentCategories[_ngcontent-%COMP%]{height:1.5em}.selectedHighlightValue[_ngcontent-%COMP%]{font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.noSelectionMessage[_ngcontent-%COMP%]{opacity:.5}.navigation-buttons[_ngcontent-%COMP%]{text-align:center}.counter-container[_ngcontent-%COMP%]{display:inline-block;position:relative}.counter[_ngcontent-%COMP%]{padding-left:.125rem;padding-right:.125rem;position:absolute;right:0}.ghost[_ngcontent-%COMP%]{position:static;visibility:hidden}.filterPanel[_ngcontent-%COMP%]{border-spacing:0 .375em;display:table}.filterPanelTitle[_ngcontent-%COMP%]{border-top:1px solid rgba(0,0,0,.125);display:table-caption;margin-bottom:-.5em;padding-left:.75em;padding-top:.75em}.batchSelectButtonsContainer[_ngcontent-%COMP%]{display:table-row}.batchSelectButtonsPaddingPlaceholder[_ngcontent-%COMP%]{display:table-cell}.batchSelectButtons[_ngcontent-%COMP%]{border-spacing:0;display:table;table-layout:fixed;width:100%}.batchSelectButton[_ngcontent-%COMP%]{display:table-cell}.batchSelectButton[_ngcontent-%COMP%]:not(:last-child){padding-right:.5rem}.batchSelectButton[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:block;white-space:normal;width:100%}.filterPanelTitle[_ngcontent-%COMP%]   .fa-filter[_ngcontent-%COMP%]{padding-right:.375em}.filters[_ngcontent-%COMP%]{display:table-row-group}.sq-highlight[_ngcontent-%COMP%]{display:table-row}.categoryIcon[_ngcontent-%COMP%], .categoryLabel[_ngcontent-%COMP%]{display:table-cell;padding-right:.375em;white-space:nowrap}.categoryFilter[_ngcontent-%COMP%]{display:table-cell;width:100%}.selectSeparator[_ngcontent-%COMP%]{background-color:#ccc;font-size:1pt}.sq-highlight[_ngcontent-%COMP%]{flex-wrap:nowrap}.sq-highlight[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:focus{z-index:4}.sq-highlight[_ngcontent-%COMP%]   .sq-highlight-btns[_ngcontent-%COMP%]{flex-direction:row}.sq-highlight[_ngcontent-%COMP%]   .sq-highlight-item[_ngcontent-%COMP%]{width:100%}.sq-highlight[_ngcontent-%COMP%]   .sq-highlight-item[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{white-space:normal;width:100%}.sq-highlight[_ngcontent-%COMP%]:not(:first-child){margin-top:.25rem}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsPreviewHighlights, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy1oaWdobGlnaHRzLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvcHJldmlldy8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9wcmV2aWV3LWhpZ2hsaWdodHMvcHJldmlldy1oaWdobGlnaHRzLnRzIiwiYm9vdHN0cmFwL3ByZXZpZXctaGlnaGxpZ2h0cy9wcmV2aWV3LWhpZ2hsaWdodHMuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBMkIsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzNDLE9BQU8sRUFBaUQsNkJBQTZCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7OztJQ0RsSCw2QkFDSTtJQUFBLDhCQUNJO0lBQUEsWUFDSjs7SUFBQSxpQkFBTTtJQUNWLDBCQUFlOztJQUZQLGVBQ0o7SUFESSx3RkFDSjs7O0lBU29CLDRCQUNJO0lBQUEsdUJBQTBGO0lBQzFGLGdDQUFtQztJQUFBLFlBQXFGOztJQUFBLGlCQUFPO0lBQ25JLGlCQUFPOzs7O0lBRkcsZUFBNEU7SUFBNUUsOEdBQTRFO0lBQy9DLGVBQXFGO0lBQXJGLHFJQUFxRjs7O0lBSnBJLCtCQUNJO0lBQUEsK0JBQ0k7SUFBQSwyRkFHTztJQUNYLGlCQUFNO0lBQ04sMEJBQXFFO0lBQ3pFLGlCQUFNOzs7SUFOK0IsZUFBb0I7SUFBcEIsa0RBQW9CO0lBS2pCLGVBQTBCO0lBQTFCLGtFQUEwQjs7O0lBRzlELCtCQUNJO0lBQUEsWUFDSjs7SUFBQSxpQkFBTTtJQUNOLDJCQUFLO0lBQUEsc0JBQU07SUFBQSxpQkFBTTs7SUFGYixlQUNKO0lBREksd0ZBQ0o7Ozs7SUE0QlosK0JBQ0k7SUFBQSwwQkFBd0Q7SUFDeEQsMEJBQXdEO0lBQ3hELCtCQUNJO0lBQUEsK0JBQ0k7SUFBQSxrQ0FFSTtJQUYrRCx5TUFBcUI7O0lBRXBGLDJCQUF5QztJQUN6QyxZQUNKOztJQUFBLGlCQUFTO0lBQ2IsaUJBQU07SUFDTixnQ0FDSTtJQUFBLG1DQUVJO0lBRmdFLDJNQUFzQjs7SUFFdEYsNEJBQWtDO0lBQ2xDLGFBQ0o7O0lBQUEsaUJBQVM7SUFDYixpQkFBTTtJQUNWLGlCQUFNO0lBQ1YsaUJBQU07OztJQWJjLGVBQThEO0lBQTlELCtGQUE4RDtJQURsRCxxRUFBOEM7SUFHOUQsZUFDSjtJQURJLDZGQUNKO0lBSVEsZUFBK0Q7SUFBL0Qsa0dBQStEO0lBRG5ELHNFQUErQztJQUcvRCxlQUNKO0lBREksZ0dBQ0o7OztJQWtCUSxrQ0FBK0g7SUFBQSxZQUE0QjtJQUFBLGlCQUFTOzs7O0lBQTlFLGtFQUF3QztJQUFDLGVBQTRCO0lBQTVCLGtEQUE0Qjs7OztJQUxuSyw2QkFDSTtJQUFBLGtDQUNJO0lBRDBCLDBVQUFpRCwrU0FBQTtJQUMzRSxrQ0FBa0M7SUFBQSxZQUFnSTs7O0lBQUEsaUJBQVM7SUFDM0ssa0NBQW1DO0lBQUEsWUFBNkU7O0lBQUEsaUJBQVM7SUFDekgsa0NBQXlDO0lBQUEsdUJBQU07SUFBQSxpQkFBUztJQUN4RCxpSEFBb0s7SUFDeEssaUJBQVM7SUFDYiwwQkFBZTs7Ozs7OztJQU5tQixlQUFpRDtJQUFqRCx5RUFBaUQsdUNBQUE7SUFDbkUsZUFBeUI7SUFBekIsK0NBQXlCO0lBQUMsZUFBZ0k7SUFBaEksK09BQWdJO0lBQzFKLGVBQTBCO0lBQTFCLGdEQUEwQjtJQUFDLGVBQTZFO0lBQTdFLDBKQUE2RTtJQUVoRixlQUFvRDtJQUFwRCxzSEFBb0Q7OztJQU9oRiw2QkFDSTtJQUFBLFlBQ0o7SUFBQSwwQkFBZTs7O0lBRFgsZUFDSjtJQURJLG1EQUNKOzs7O0lBTFIsa0NBQ0k7SUFEMEIseVVBQWlELDhTQUFBO0lBQzNFLGtDQUNJO0lBQUEsWUFDQTs7SUFBQSwwSEFFZTtJQUNuQixpQkFBUztJQUNULGtDQUFtQztJQUFBLFlBQTZFOztJQUFBLGlCQUFTO0lBQzdILGlCQUFTOzs7Ozs7O0lBUnFCLHlFQUFpRCx1Q0FBQTtJQUNuRSxlQUF5QjtJQUF6QiwrQ0FBeUI7SUFDN0IsZUFDQTtJQURBLG1LQUNBO0lBQWUsZUFBbUU7SUFBbkUsbUlBQW1FO0lBSTlFLGVBQTBCO0lBQTFCLGdEQUEwQjtJQUFDLGVBQTZFO0lBQTdFLHlKQUE2RTs7O0lBeEJoSSwrQkFDSTtJQUFBLCtCQUNJO0lBQUEsdUJBQTBGO0lBQzlGLGlCQUFNO0lBQ04sK0JBQ0k7SUFBQSxZQUNKOztJQUFBLGlCQUFNO0lBQ04sK0JBQ0k7SUFBQSw2R0FPZTtJQUNmLDRJQVVjO0lBQ2xCLGlCQUFNO0lBQ1YsaUJBQU07Ozs7OztJQTFCUSxlQUE0RTtJQUE1RSxnSEFBNEU7SUFHbEYsZUFDSjtJQURJLHVOQUNKO0lBRW1CLGVBQTZDO0lBQTdDLHVFQUE2QyxrQkFBQTs7OztJQXpFNUUsOEJBQ0k7SUFBQSw4QkFDSTtJQUFBLDhCQUFvQztJQUFBLFlBQWdEOztJQUFBLGlCQUFNO0lBQzFGLDhCQUNJO0lBQUEsa0ZBUU07SUFDTixvSUFLYztJQUNsQixpQkFBTTtJQUNWLGlCQUFNO0lBQ04sK0JBQ0k7SUFBQSxtQ0FDSTtJQUR5RCw4TEFBaUI7O0lBQzFFLDRCQUEwQztJQUM5QyxpQkFBUztJQUNULG1DQUNJO0lBRHlELGlNQUFvQjs7SUFDN0UsNEJBQTBDO0lBQzlDLGlCQUFTO0lBQ1QsZ0NBQ0k7SUFBQSxpQ0FBc0I7SUFBQSxhQUE2Qzs7O0lBQUEsaUJBQU87SUFDMUUsaUNBQTRCO0lBQUEsYUFBMkM7OztJQUFBLGlCQUFPO0lBQ2xGLGlCQUFNO0lBQ04sbUNBQ0k7SUFEeUQsNkxBQWdCOztJQUN6RSw0QkFBeUM7SUFDN0MsaUJBQVM7SUFDVCxtQ0FDSTtJQUR5RCw2TEFBZ0I7O0lBQ3pFLDRCQUF5QztJQUM3QyxpQkFBUztJQUNiLGlCQUFNO0lBQ1YsaUJBQU07SUFDTixnQ0FDSTtJQUFBLGdDQUNJO0lBQUEsNEJBQW1DO0lBQUEsYUFDdkM7O0lBQUEsaUJBQU07SUFDTix1RkFtQk07SUFDTixnQ0FDSTtJQUFBLHVGQTRCTTtJQUNWLGlCQUFNO0lBQ1YsaUJBQU07Ozs7SUE3RnNDLGVBQWdEO0lBQWhELHNGQUFnRDtJQUUxRSxlQUF5QztJQUF6QyxzRUFBeUMsaUJBQUE7SUFrQjRCLGVBQWlFO0lBQWpFLG9HQUFpRTtJQUE5RywrQ0FBMEI7SUFHc0IsZUFBb0U7SUFBcEUsdUdBQW9FO0lBQXBILCtDQUEwQjtJQUlsQyxlQUE2QztJQUE3QyxrSEFBNkM7SUFDdkMsZUFBMkM7SUFBM0MsZ0hBQTJDO0lBRUcsZUFBZ0U7SUFBaEUsbUdBQWdFO0lBQTVHLCtDQUEwQjtJQUdrQixlQUFnRTtJQUFoRSxtR0FBZ0U7SUFBNUcsK0NBQTBCO0lBT3pCLGVBQ3ZDO0lBRHVDLDRGQUN2QztJQUMwQyxlQUFvQztJQUFwQyw0REFBb0M7SUFxQjlDLGVBQXNCO0lBQXRCLG9EQUFzQjs7QUR4RGxFLE1BQU0sT0FBTyxtQkFBbUI7SUFMaEM7UUFpU0ksaUJBQWlCO1FBRWpCLGtCQUFrQjtRQUNYLGtCQUFhLEdBQWlDLElBQUksa0NBQWtDLEVBQUUsQ0FBQztRQUN2RixtQkFBYyxHQUFpQyxJQUFJLGtDQUFrQyxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxDQUFDO0tBMERwSTtJQTFVRyxXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBRyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUM7WUFDdEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxPQUFPLENBQUMsaUJBQWlCLENBQUMsRUFBRTtZQUM1QixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2FBQ2hDO1NBQ0o7SUFDTCxDQUFDO0lBRU8sVUFBVTtRQUNkLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQztRQUN2RyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUM7UUFDdkcsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLDhCQUE4QixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLO1FBQ1IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBRSwrQ0FBK0M7UUFDbkYsSUFBRyxJQUFJLENBQUMsWUFBWSxFQUFnQiwrQ0FBK0M7WUFDL0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hFLDZCQUE2QjtRQUM3QixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDeEQsSUFBSSxnQ0FBZ0MsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3RILENBQUM7SUFFRDs7T0FFRztJQUNLLHFCQUFxQjtRQUN6QixJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMxQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELElBQUksU0FBUyxDQUFDLG9CQUFvQixFQUFFO29CQUNoQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUM7b0JBQ3ZCLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDeEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7d0JBQzNCLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQzt3QkFDNUIsUUFBUSxHQUFHLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDdkQ7b0JBQ0QsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO3dCQUMxQixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7d0JBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQzt3QkFDekQsTUFBTTtxQkFDVDtpQkFDSjthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLFlBQVk7UUFDWixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJLFlBQVk7UUFDWixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUNqRSxPQUFPLEVBQUUsQ0FBQztTQUNiO1FBQ0QsTUFBTSxNQUFNLEdBQVcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDO1FBQzdGLElBQUksTUFBTSxFQUFFO1lBQ1IsT0FBTyxNQUFNLENBQUM7U0FDakI7UUFDRCxNQUFNLE1BQU0sR0FBYSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDekYsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2xFLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsTUFBTSxLQUFLLENBQUM7ZUFDaEcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUMzRyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQ3hDLG1CQUFtQixFQUNuQixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7U0FDM0c7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJLGlCQUFpQjtRQUNqQixNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7UUFDNUIsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3RJLE9BQU8sTUFBTSxDQUFDO1NBQ2pCO1FBQ0QsS0FBSyxNQUFNLFVBQVUsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxvQkFBb0IsRUFBRTtZQUNwRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzNCO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVNLGlCQUFpQixDQUFDLFVBQWtCO1FBQ3ZDLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMvQixPQUFPLGFBQWEsQ0FBQztTQUN4QjtRQUNELE9BQU8sVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNuQyxDQUFDO0lBRU0sd0JBQXdCLENBQUMsVUFBa0I7UUFDOUMsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ2pHLENBQUM7SUFFTSxvQkFBb0IsQ0FBQyxVQUFrQjtRQUMxQyxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDL0csQ0FBQztJQUVNLHVCQUF1QixDQUFDLFVBQWtCO1FBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFDRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN0RCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNkLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEVBQUMsTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxFQUFDLENBQUM7SUFDcEMsQ0FBQztJQUdEOztPQUVHO0lBQ0gsSUFBSSxtQkFBbUI7UUFDbkIsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO1FBQzVCLEtBQUssTUFBTSxVQUFVLElBQUksSUFBSSxDQUFDLHdCQUF3QixFQUFFO1lBQ3BELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsRUFBRTtnQkFDbEUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMzQjtTQUNKO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVPLGVBQWUsQ0FBQyxVQUFrQixFQUFFLGFBQXdDO1FBQ2hGLE9BQU8sYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUk7ZUFDakMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJO2VBQ3hDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0kseUJBQXlCLENBQUMsVUFBa0I7UUFDL0MsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7O09BR0c7SUFDSSxzQkFBc0IsQ0FBQyxVQUFrQjtRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO1lBQ25HLE9BQU8sQ0FBQyxDQUFDO1NBQ1o7UUFDRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ2hFLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtZQUNoQixPQUFPLENBQUMsQ0FBQztTQUNaO1FBQ0QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFHRCw4QkFBOEI7SUFFOUIsS0FBSztRQUNELElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQy9DLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ2pELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFFTyxlQUFlO1FBQ25CLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQzVCLE1BQU0sb0JBQW9CLEdBQXFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLG9CQUFvQixDQUFDO1lBQzdJLE1BQU0sYUFBYSxHQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRSxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztTQUM1RjtJQUNMLENBQUM7SUFFTSxTQUFTO1FBQ1osS0FBSyxNQUFNLFVBQVUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRTtZQUNuRCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQ2pFO1FBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTSxVQUFVO1FBQ2IsS0FBSyxNQUFNLFVBQVUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRTtZQUNuRCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1NBQ2xFO1FBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDWCxLQUFLLE1BQU0sVUFBVSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFO1lBQ25ELE1BQU0sTUFBTSxHQUFpQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN0RixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLDZCQUE2QixDQUFDLEdBQUcsRUFBRTtnQkFDL0QsT0FBTyxLQUFLLENBQUM7YUFDaEI7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDWixLQUFLLE1BQU0sVUFBVSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFO1lBQ25ELE1BQU0sTUFBTSxHQUFpQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssNkJBQTZCLENBQUMsSUFBSSxFQUFFO2dCQUNqRSxPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQVNELGlDQUFpQztJQUMxQixTQUFTLENBQUMsS0FBYTtRQUMxQixPQUFPLElBQUksa0NBQWtDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELHVCQUF1QjtJQUN2QixZQUFZLENBQUMsVUFBa0IsRUFBRSxLQUFtQztRQUNoRSxpQ0FBaUM7UUFFakMsbUdBQW1HO1FBQ25HLElBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyw2QkFBNkIsQ0FBQyxLQUFLLEVBQUM7WUFFcEQsMEVBQTBFO1lBQzFFLEtBQUksTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUM7Z0JBQzFDLElBQUcsR0FBRyxLQUFLLFVBQVUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxjQUFjLEVBQUM7b0JBQzNJLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7aUJBQzFEO2FBQ0o7WUFFRCx1QkFBdUI7WUFDdkIsSUFBSSxTQUFTLENBQUM7WUFDZCxLQUFJLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyx3QkFBd0IsRUFBQztnQkFDM0MsU0FBUyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0MsSUFBRyxTQUFTLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFDO29CQUMxRixNQUFNO2lCQUNUO2FBQ0o7WUFFRCxJQUFHLFNBQVMsRUFBQztnQkFDVCxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDaEc7U0FFSjthQUNJO1lBRUQsdUJBQXVCO1lBQ3ZCLEtBQUksTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUM7Z0JBQzFDLElBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsY0FBYyxFQUFDO29CQUNySCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO2lCQUMxRDthQUNKO1lBRUQsK0VBQStFO1lBQy9FLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUVoQjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLGNBQWMsQ0FBQyxPQUFxQyxFQUFFLE9BQXFDO1FBQzlGLE9BQU8sa0NBQWtDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4RSxDQUFDOztzRkF2VlEsbUJBQW1CO3dEQUFuQixtQkFBbUI7UUNqQmhDLDhCQUNJO1FBQUEsOEJBQXlCO1FBQUEsWUFBNkM7O1FBQUEsaUJBQU07UUFDNUUsc0ZBSWU7UUFDZix1SEFpR2M7UUFDbEIsaUJBQU07OztRQXhHdUIsZUFBNkM7UUFBN0MseUVBQTZDO1FBQ3ZELGVBQWM7UUFBZCxpQ0FBYyxpQkFBQTs7a0REZXBCLG1CQUFtQjtjQUwvQixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsV0FBVyxFQUFFLDJCQUEyQjtnQkFDeEMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7YUFDM0M7Z0JBR1ksZUFBZTtrQkFBdkIsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUs7O0FBNFZWLG9DQUFvQztBQUVwQyxNQUFNLDhCQUE4QjtJQUtoQyxZQUFZLFVBQW9CO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBRSxlQUFlO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLEtBQUssTUFBTSxRQUFRLElBQUksVUFBVSxFQUFFO1lBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxrQ0FBa0MsRUFBRSxDQUFDLENBQUMsa0NBQWtDO1NBQ3hHO0lBQ0wsQ0FBQztDQUNKO0FBR0QsTUFBTSxrQ0FBa0M7SUFJcEMsWUFBWSxLQUE4QztRQUhqRCxXQUFNLEdBQWtDLDZCQUE2QixDQUFDLEdBQUcsQ0FBQztRQUMzRSxpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUc5QixJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDZixPQUFPO1NBQ1Y7UUFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLDZCQUE2QixDQUFDLEtBQUssQ0FBQztZQUNsRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUM3QjthQUFNO1lBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ1gsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLDZCQUE2QixDQUFDLEtBQUssRUFBRTtZQUNyRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDNUI7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFTSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQXFDLEVBQUUsT0FBcUM7UUFDOUYsSUFBRyxPQUFPLElBQUksT0FBTyxFQUFFO1lBQ25CLElBQUcsT0FBTyxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUNsQyxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUNELE9BQU8sT0FBTyxDQUFDLE1BQU0sS0FBSyw2QkFBNkIsQ0FBQyxLQUFLO21CQUN0RCxPQUFPLENBQUMsV0FBVyxLQUFLLE9BQU8sQ0FBQyxXQUFXLENBQUM7U0FDdEQ7UUFDRCxPQUFPLE9BQU8sS0FBSyxPQUFPLENBQUM7SUFDL0IsQ0FBQztDQUNKO0FBR0QsTUFBTSxnQ0FBZ0M7SUFVbEMsWUFBbUIsUUFBa0MsRUFBRSxPQUF5RDtRQUM1RyxJQUFJLE9BQU8sR0FBVyxDQUFDLENBQUM7UUFDeEIsS0FBSyxNQUFNLENBQUMsSUFBSSxRQUFRLEVBQUU7WUFDdEIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNqSCxJQUFJLFVBQVUsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQUU7Z0JBQ2hGLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLE9BQU8sRUFBRSxDQUFDO2FBQ2I7U0FDSjtJQUNMLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNwQyxDQUFDO0lBRU0sa0JBQWtCLENBQUMsTUFBZ0IsRUFBRSxVQUFvQixFQUFFLE9BQXlEO1FBQ3ZILElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDYixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELEtBQUssTUFBTSxRQUFRLElBQUksVUFBVSxFQUFFO1lBQy9CLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQztnQkFDakIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxLQUFLLDZCQUE2QixDQUFDLEdBQUc7dUJBQzVELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEtBQUssNkJBQTZCLENBQUMsS0FBSyxJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRTtnQkFDMUksT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSGlnaGxpZ2h0RGF0YVBlckNhdGVnb3J5LCBDYXRlZ29yeUhpZ2hsaWdodERhdGEsIEhpZ2hsaWdodERhdGFQZXJMb2NhdGlvbiwgUHJldmlld0RhdGEgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHsgUHJldmlld0RvY3VtZW50LCBIaWdobGlnaHRDYXRlZ29yeUZpbHRlclN0YXRlLCBIaWdobGlnaHRDYXRlZ29yeUZpbHRlckNob2ljZSB9IGZyb20gXCIuLi8uLi9wcmV2aWV3LWRvY3VtZW50XCI7XG5cblxuZXhwb3J0IGludGVyZmFjZSBIaWdobGlnaHROYXZpZ2F0aW9uU3RhdGUge1xuICAgIGN1cnJlbnQ6IG51bWJlcjtcbiAgICBmaWx0ZXJzOiB7IFtrZXk6IHN0cmluZ10gOiBIaWdobGlnaHRDYXRlZ29yeUZpbHRlclN0YXRlIH07XG59XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtcHJldmlldy1oaWdobGlnaHRzXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wcmV2aWV3LWhpZ2hsaWdodHMuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9wcmV2aWV3LWhpZ2hsaWdodHMuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBCc1ByZXZpZXdIaWdobGlnaHRzIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpIHByZXZpZXdEb2N1bWVudDogUHJldmlld0RvY3VtZW50O1xuICAgIEBJbnB1dCgpIHByZXZpZXdEYXRhOiBQcmV2aWV3RGF0YTtcblxuICAgIC8vIEhpZ2hsaWdodCBkYXRhIHJldHJpZXZlZCBieSB0aGUgc2VydmVyXG4gICAgcHVibGljIGhpZ2hsaWdodERhdGFQZXJDYXRlZ29yeT86IEhpZ2hsaWdodERhdGFQZXJDYXRlZ29yeTtcbiAgICBwcml2YXRlIGhpZ2hsaWdodERhdGFQZXJMb2NhdGlvbj86IEhpZ2hsaWdodERhdGFQZXJMb2NhdGlvbjtcblxuICAgIC8vIFNlbGVjdGVkIGVudGl0eSAmIGZpbHRlcnMgKHRoZSAuZmlsdGVyc1tjYXRlZ29yeV0gYXJlIHRoZSBOZ01vZGVsIG9mIHRoZSBzZWxlY3QgZWxlbWVudHMpXG4gICAgcHVibGljIG5hdmlnYXRpb25TdGF0ZTogSGlnaGxpZ2h0TmF2aWdhdGlvblN0YXRlO1xuXG4gICAgLy8gaGlnaGxpZ2h0IGRhdGEgcmVzdWx0aW5nIGZyb20gZmlsdGVyaW5nXG4gICAgcHJpdmF0ZSBmaWx0ZXJlZEhpZ2hsaWdodERhdGE/OiBIaWdobGlnaHREYXRhUGVyTG9jYXRpb247XG5cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYoY2hhbmdlc1tcInByZXZpZXdEYXRhXCJdKXtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzW1wicHJldmlld0RvY3VtZW50XCJdKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2aWV3UmVhZHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb0ZpcnN0U2VhcmNoVGVybSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhpZ2hsaWdodERhdGFQZXJDYXRlZ29yeSA9ICF0aGlzLnByZXZpZXdEYXRhID8gdW5kZWZpbmVkIDogdGhpcy5wcmV2aWV3RGF0YS5oaWdobGlnaHRzUGVyQ2F0ZWdvcnk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0RGF0YVBlckxvY2F0aW9uID0gIXRoaXMucHJldmlld0RhdGEgPyB1bmRlZmluZWQgOiB0aGlzLnByZXZpZXdEYXRhLmhpZ2hsaWdodHNQZXJMb2NhdGlvbjtcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUgPSBuZXcgU2ltcGxlSGlnaGxpZ2h0TmF2aWdhdGlvblN0YXRlKHRoaXMubm9uRW1wdHlDYXRlZ29yeUlkcyk7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgb24gaW5pdCBhbmQgd2hlbiBub24tdmFsdWUgZmlsdGVycyBhcmUgY2xpY2tlZFxuICAgICAqIFJlc2V0cyB0aGUgbmF2aWdhdGlvblN0YXRlIGVudGl0eSBzZWxlY3Rpb24uXG4gICAgICogQXBwbGllcyB0aGUgZmlsdGVycyB0byB0aGUgcHJldmlldyBkb2N1bWVudC5cbiAgICAgKiBVcGRhdGVzIHRoZSBmaWx0ZXJlZCBkYXRhLlxuICAgICAqL1xuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUuY3VycmVudCA9IC0xOyAgLy8gUmVzZXRzIHRoZSBuYXZpZ2F0aW9uU3RhdGUgZW50aXR5IHNlbGVjdGlvbi5cbiAgICAgICAgaWYodGhpcy5wcmV2aWV3UmVhZHkpICAgICAgICAgICAgICAgLy8gQXBwbGllcyB0aGUgZmlsdGVycyB0byB0aGUgcHJldmlldyBkb2N1bWVudC5cbiAgICAgICAgICAgIHRoaXMucHJldmlld0RvY3VtZW50LmZpbHRlckhpZ2hsaWdodHModGhpcy5uYXZpZ2F0aW9uU3RhdGUuZmlsdGVycyk7XG4gICAgICAgIC8vIFVwZGF0ZXMgdGhlIGZpbHRlcmVkIGRhdGEuXG4gICAgICAgIHRoaXMuZmlsdGVyZWRIaWdobGlnaHREYXRhID0gdGhpcy5oaWdobGlnaHREYXRhUGVyTG9jYXRpb24gP1xuICAgICAgICAgICAgbmV3IEZpbHRlcmVkSGlnaGxpZ2h0RGF0YVBlckxvY2F0aW9uKHRoaXMuaGlnaGxpZ2h0RGF0YVBlckxvY2F0aW9uLCB0aGlzLm5hdmlnYXRpb25TdGF0ZS5maWx0ZXJzKSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3RzIHRoZSBmaXJzdCBtYXRjaCBsb2NhdGlvbiAoaGlnaGxpZ2h0IGNsYXNzZXMgYW5kIHNjcm9sbHMgdG8gaXQpXG4gICAgICovXG4gICAgcHJpdmF0ZSBtb3ZlVG9GaXJzdFNlYXJjaFRlcm0oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlcmVkSGlnaGxpZ2h0RGF0YSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGljID0gdGhpcy50b3RhbDsgaSA8IGljOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBoaWdobGlnaHQgPSB0aGlzLmZpbHRlcmVkSGlnaGxpZ2h0RGF0YVtpXTtcbiAgICAgICAgICAgICAgICBpZiAoaGlnaGxpZ2h0LnBvc2l0aW9uSW5DYXRlZ29yaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjYXRlZ29yeSA9IFwidGVybTFcIjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gaGlnaGxpZ2h0LnBvc2l0aW9uSW5DYXRlZ29yaWVzW2NhdGVnb3J5XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFVdGlscy5pc051bWJlcihwb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5ID0gXCJtYXRjaGxvY2F0aW9uc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSBoaWdobGlnaHQucG9zaXRpb25JbkNhdGVnb3JpZXNbY2F0ZWdvcnldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc051bWJlcihwb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlLmN1cnJlbnQgPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aWV3RG9jdW1lbnQuc2VsZWN0SGlnaGxpZ2h0KGNhdGVnb3J5LCBwb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluZGV4IG9mIGN1cnJlbnRseSBzZWxlY3RlZCBlbnRpdHkgKGZyb20gMSlcbiAgICAgKi9cbiAgICBnZXQgY3VycmVudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0aW9uU3RhdGUuY3VycmVudCArIDE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTm8gY2F0ZWdvcmllcyB0byBoaWdobGlnaHRcbiAgICAgKi9cbiAgICBnZXQgbm9EYXRhKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5ub25FbXB0eUNhdGVnb3J5SWRzLmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb3RhbCBudW1iZXIgb2YgaGlnaGxpZ2h0c1xuICAgICAqL1xuICAgIGdldCB0b3RhbCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJlZEhpZ2hsaWdodERhdGEgPyB0aGlzLmZpbHRlcmVkSGlnaGxpZ2h0RGF0YS5zaXplKCkgOiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRydWUgd2hlbiB0aGUgZG9jdW1lbnQgaXMgcmVhZHkgdG8gYmUgaW50ZXJhY3RlZCB3aXRoXG4gICAgICovXG4gICAgZ2V0IHByZXZpZXdSZWFkeSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5wcmV2aWV3RG9jdW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGVudGl0eS9tYXRjaC9leHRyYWN0IGJhc2VkIG9uIHRoZSBQcmV2aWV3RGF0YVxuICAgICAqIG9yIHBvdGVudGlhbGx5IGJ5IGZldGNoaW5nIGl0IGRpcmVjdGx5IGZyb20gdGhlIEhUTUwgZG9jdW1lbnQuXG4gICAgICovXG4gICAgZ2V0IGN1cnJlbnRWYWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5uYXZpZ2F0aW9uU3RhdGUuY3VycmVudCA8IDAgfHwgIXRoaXMuZmlsdGVyZWRIaWdobGlnaHREYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQ6IHN0cmluZyA9IHRoaXMuZmlsdGVyZWRIaWdobGlnaHREYXRhW3RoaXMubmF2aWdhdGlvblN0YXRlLmN1cnJlbnRdLmRpc3BsYXlWYWx1ZTtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZXM6IHN0cmluZ1tdID0gdGhpcy5maWx0ZXJlZEhpZ2hsaWdodERhdGFbdGhpcy5uYXZpZ2F0aW9uU3RhdGUuY3VycmVudF0udmFsdWVzO1xuICAgICAgICBpZiAodmFsdWVzICYmIHZhbHVlcy5sZW5ndGggPiAwICYmIHZhbHVlc1swXSAmJiB2YWx1ZXNbMF0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlc1swXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5maWx0ZXJlZEhpZ2hsaWdodERhdGFbdGhpcy5uYXZpZ2F0aW9uU3RhdGUuY3VycmVudF0ucG9zaXRpb25JbkNhdGVnb3JpZXMpLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgICAgICYmIHRoaXMuZmlsdGVyZWRIaWdobGlnaHREYXRhW3RoaXMubmF2aWdhdGlvblN0YXRlLmN1cnJlbnRdLnBvc2l0aW9uSW5DYXRlZ29yaWVzW1wiZXh0cmFjdHNsb2NhdGlvbnNcIl0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZpZXdEb2N1bWVudC5nZXRIaWdobGlnaHRUZXh0KFxuICAgICAgICAgICAgICAgIFwiZXh0cmFjdHNsb2NhdGlvbnNcIixcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmVkSGlnaGxpZ2h0RGF0YVt0aGlzLm5hdmlnYXRpb25TdGF0ZS5jdXJyZW50XS5wb3NpdGlvbkluQ2F0ZWdvcmllc1tcImV4dHJhY3RzbG9jYXRpb25zXCJdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgY2F0ZWdvcmllcyBvZiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGVudGl0eS9tYXRjaC9leHRyYWN0XG4gICAgICogYmFzZWQgb24gdGhlIGZpbHRlcmVkIEhpZ2hsaWdodCBkYXRhIHBlciBsb2NhdGlvblxuICAgICAqL1xuICAgIGdldCBjdXJyZW50Q2F0ZWdvcmllcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgaWYgKHRoaXMubmF2aWdhdGlvblN0YXRlLmN1cnJlbnQgPCAwIHx8ICF0aGlzLmZpbHRlcmVkSGlnaGxpZ2h0RGF0YSB8fCB0aGlzLm5hdmlnYXRpb25TdGF0ZS5jdXJyZW50ID49IHRoaXMuZmlsdGVyZWRIaWdobGlnaHREYXRhLnNpemUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGNhdGVnb3J5SWQgaW4gdGhpcy5maWx0ZXJlZEhpZ2hsaWdodERhdGFbdGhpcy5uYXZpZ2F0aW9uU3RhdGUuY3VycmVudF0ucG9zaXRpb25JbkNhdGVnb3JpZXMpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNhdGVnb3J5SWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGNhdGVnb3J5SWNvbkNsYXNzKGNhdGVnb3J5SWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmIChjYXRlZ29yeUlkLnN0YXJ0c1dpdGgoXCJ0ZXJtXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJmYXIgZmEtZmxhZ1wiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcInNxLWljb24tXCIgKyBjYXRlZ29yeUlkO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDYXRlZ29yeUhpZ2hsaWdodERhdGEoY2F0ZWdvcnlJZDogc3RyaW5nKTogQ2F0ZWdvcnlIaWdobGlnaHREYXRhIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlnaGxpZ2h0RGF0YVBlckNhdGVnb3J5ID8gdGhpcy5oaWdobGlnaHREYXRhUGVyQ2F0ZWdvcnlbY2F0ZWdvcnlJZF0gOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGNhdGVnb3J5RGlzcGxheUxhYmVsKGNhdGVnb3J5SWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hsaWdodERhdGFQZXJDYXRlZ29yeSA/IHRoaXMuaGlnaGxpZ2h0RGF0YVBlckNhdGVnb3J5W2NhdGVnb3J5SWRdLmNhdGVnb3J5RGlzcGxheUxhYmVsIDogXCJcIjtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2F0ZWdvcnlMYWJlbFBpcGVQYXJhbXMoY2F0ZWdvcnlJZDogc3RyaW5nKTogYW55IHtcbiAgICAgICAgaWYgKCFjYXRlZ29yeUlkLnN0YXJ0c1dpdGgoXCJ0ZXJtXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaW5kZXggPSBOdW1iZXIoY2F0ZWdvcnlJZC5zbGljZShcInRlcm1cIi5sZW5ndGgpKTtcbiAgICAgICAgaWYgKGlzTmFOKGluZGV4KSkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7dmFsdWVzOiB7aW5kZXg6IGluZGV4fX07XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsaXN0IG9mIGVudGl0eSBjYXRlZ29yaWVzIHRoYXQgY29udGFpbiB2YWx1ZXNcbiAgICAgKi9cbiAgICBnZXQgbm9uRW1wdHlDYXRlZ29yeUlkcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBjYXRlZ29yeUlkIGluIHRoaXMuaGlnaGxpZ2h0RGF0YVBlckNhdGVnb3J5KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY2F0ZWdvcnlJc0VtcHR5KGNhdGVnb3J5SWQsIHRoaXMuaGlnaGxpZ2h0RGF0YVBlckNhdGVnb3J5KSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNhdGVnb3J5SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYXRlZ29yeUlzRW1wdHkoY2F0ZWdvcnlJZDogc3RyaW5nLCBoaWdobGlnaHREYXRhIDogSGlnaGxpZ2h0RGF0YVBlckNhdGVnb3J5KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBoaWdobGlnaHREYXRhW2NhdGVnb3J5SWRdID09IG51bGxcbiAgICAgICAgICAgIHx8IGhpZ2hsaWdodERhdGFbY2F0ZWdvcnlJZF0udmFsdWVzID09IG51bGxcbiAgICAgICAgICAgIHx8IGhpZ2hsaWdodERhdGFbY2F0ZWdvcnlJZF0udmFsdWVzLmxlbmd0aCA8PSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgdGhlcmUgaXMgbW9yZSB0aGFuIG9uZSBvcHRpb24gcGVyIGNhdGVnb3J5XG4gICAgICogQHBhcmFtIGNhdGVnb3J5SWQgdGhlIGNhdGVnb3J5IGlkXG4gICAgICovXG4gICAgcHVibGljIGNhdGVnb3J5SGFzTXVsdGlwbGVWYWx1ZXMoY2F0ZWdvcnlJZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEhpZ2hsaWdodFZhbHVlQ291bnQoY2F0ZWdvcnlJZCkgPiAxO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSBudW1iZXIgb2Ygb3B0aW9ucyBwZXIgY2F0ZWdvcnlcbiAgICAgKiBAcGFyYW0gY2F0ZWdvcnlJZCB0aGUgY2F0ZWdvcnkgaWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0SGlnaGxpZ2h0VmFsdWVDb3VudChjYXRlZ29yeUlkOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBpZiAoIXRoaXMuaGlnaGxpZ2h0RGF0YVBlckNhdGVnb3J5IHx8IHRoaXMuY2F0ZWdvcnlJc0VtcHR5KGNhdGVnb3J5SWQsIHRoaXMuaGlnaGxpZ2h0RGF0YVBlckNhdGVnb3J5KSkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWVzID0gdGhpcy5oaWdobGlnaHREYXRhUGVyQ2F0ZWdvcnlbY2F0ZWdvcnlJZF0udmFsdWVzO1xuICAgICAgICBpZiAodmFsdWVzID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZXMubGVuZ3RoO1xuICAgIH1cblxuXG4gICAgLy8gTmF2aWdhdGlvbiBidXR0b25zIGhhbmRsZXJzXG5cbiAgICBmaXJzdCgpIHtcbiAgICAgICAgaWYgKHRoaXMubmF2aWdhdGlvblN0YXRlLmN1cnJlbnQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZS5jdXJyZW50ID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0SGlnaGxpZ2h0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcmV2aW91cygpIHtcbiAgICAgICAgaWYgKHRoaXMubmF2aWdhdGlvblN0YXRlLmN1cnJlbnQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZS5jdXJyZW50LS07XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEhpZ2hsaWdodCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgaWYgKHRoaXMubmF2aWdhdGlvblN0YXRlLmN1cnJlbnQgPCB0aGlzLnRvdGFsIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUuY3VycmVudCsrO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RIaWdobGlnaHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxhc3QoKSB7XG4gICAgICAgIGlmICh0aGlzLm5hdmlnYXRpb25TdGF0ZS5jdXJyZW50ICE9PSB0aGlzLnRvdGFsIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUuY3VycmVudCA9IHRoaXMudG90YWwgLSAxO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RIaWdobGlnaHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2VsZWN0SGlnaGxpZ2h0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJlZEhpZ2hsaWdodERhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uSW5DYXRlZ29yaWVzOiB7IFtjYXRlZ29yeUlkOiBzdHJpbmddOiBudW1iZXIgfSA9IHRoaXMuZmlsdGVyZWRIaWdobGlnaHREYXRhW3RoaXMubmF2aWdhdGlvblN0YXRlLmN1cnJlbnRdLnBvc2l0aW9uSW5DYXRlZ29yaWVzO1xuICAgICAgICAgICAgY29uc3QgZmlyc3RDYXRlZ29yeTogc3RyaW5nID0gT2JqZWN0LmtleXMocG9zaXRpb25JbkNhdGVnb3JpZXMpWzBdO1xuICAgICAgICAgICAgdGhpcy5wcmV2aWV3RG9jdW1lbnQuc2VsZWN0SGlnaGxpZ2h0KGZpcnN0Q2F0ZWdvcnksIHBvc2l0aW9uSW5DYXRlZ29yaWVzW2ZpcnN0Q2F0ZWdvcnldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZWxlY3RBbGwoKTogdm9pZCB7XG4gICAgICAgIGZvciAoY29uc3QgY2F0ZWdvcnlJZCBpbiB0aGlzLm5hdmlnYXRpb25TdGF0ZS5maWx0ZXJzKSB7XG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZS5maWx0ZXJzW2NhdGVnb3J5SWRdID0gdGhpcy5rZWVwQWxsRmlsdGVyO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VsZWN0Tm9uZSgpOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBjYXRlZ29yeUlkIGluIHRoaXMubmF2aWdhdGlvblN0YXRlLmZpbHRlcnMpIHtcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlLmZpbHRlcnNbY2F0ZWdvcnlJZF0gPSB0aGlzLmtlZXBOb25lRmlsdGVyO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICBnZXQgYWxsU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGZvciAoY29uc3QgY2F0ZWdvcnlJZCBpbiB0aGlzLm5hdmlnYXRpb25TdGF0ZS5maWx0ZXJzKSB7XG4gICAgICAgICAgICBjb25zdCBmaWx0ZXI6IEhpZ2hsaWdodENhdGVnb3J5RmlsdGVyU3RhdGUgPSB0aGlzLm5hdmlnYXRpb25TdGF0ZS5maWx0ZXJzW2NhdGVnb3J5SWRdO1xuICAgICAgICAgICAgaWYgKGZpbHRlciAmJiBmaWx0ZXIuY2hvaWNlICE9PSBIaWdobGlnaHRDYXRlZ29yeUZpbHRlckNob2ljZS5BbGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZ2V0IG5vbmVTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChjb25zdCBjYXRlZ29yeUlkIGluIHRoaXMubmF2aWdhdGlvblN0YXRlLmZpbHRlcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcjogSGlnaGxpZ2h0Q2F0ZWdvcnlGaWx0ZXJTdGF0ZSA9IHRoaXMubmF2aWdhdGlvblN0YXRlLmZpbHRlcnNbY2F0ZWdvcnlJZF07XG4gICAgICAgICAgICBpZiAoIWZpbHRlciB8fCBmaWx0ZXIuY2hvaWNlICE9PSBIaWdobGlnaHRDYXRlZ29yeUZpbHRlckNob2ljZS5Ob25lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuXG4gICAgLy8gRW50aXR5IGZpbHRlcnNcblxuICAgIC8vIFRyaXZpYWwgZmlsdGVyc1xuICAgIHB1YmxpYyBrZWVwQWxsRmlsdGVyOiBIaWdobGlnaHRDYXRlZ29yeUZpbHRlclN0YXRlID0gbmV3IFNpbXBsZUhpZ2hsaWdodENhdGVnb3J5RmlsdGVyU3RhdGUoKTtcbiAgICBwdWJsaWMga2VlcE5vbmVGaWx0ZXI6IEhpZ2hsaWdodENhdGVnb3J5RmlsdGVyU3RhdGUgPSBuZXcgU2ltcGxlSGlnaGxpZ2h0Q2F0ZWdvcnlGaWx0ZXJTdGF0ZShIaWdobGlnaHRDYXRlZ29yeUZpbHRlckNob2ljZS5Ob25lKTtcblxuICAgIC8vIEZpbHRlciBjcmVhdGVkIGZvciBlYWNoIG9wdGlvblxuICAgIHB1YmxpYyBuZXdGaWx0ZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFNpbXBsZUhpZ2hsaWdodENhdGVnb3J5RmlsdGVyU3RhdGUodmFsdWUpO1xuICAgIH1cblxuICAgIC8vIEEgZmlsdGVyIHdhcyBjbGlja2VkXG4gICAgc2VsZWN0RmlsdGVyKGNhdGVnb3J5SWQ6IHN0cmluZywgdmFsdWU6IEhpZ2hsaWdodENhdGVnb3J5RmlsdGVyU3RhdGUpe1xuICAgICAgICAvL2NvbnNvbGUubG9nKGNhdGVnb3J5SWQsIHZhbHVlKTtcblxuICAgICAgICAvLyBJZiBhIHNwZWNpZmljIGVudGl0eS9leHRyYWN0IGlzIHNlbGVjdGVkIHdlIHdhbnQgdG8gc2VsZWN0IGl0LCByYXRoZXIgdGhhbiBmaWx0ZXIgb3RoZXIgZW50aXRpZXNcbiAgICAgICAgaWYodmFsdWUuY2hvaWNlID09PSBIaWdobGlnaHRDYXRlZ29yeUZpbHRlckNob2ljZS5WYWx1ZSl7XG5cbiAgICAgICAgICAgIC8vIEZpcnN0LCBsZXQncyBjYW5jZWwgdmFsdWUgZmlsdGVycyBFWENFUFQgdGhlIG9uZSB0aGF0IHdhcyBqdXN0IHNlbGVjdGVkXG4gICAgICAgICAgICBmb3IoY29uc3Qga2V5IGluIHRoaXMubmF2aWdhdGlvblN0YXRlLmZpbHRlcnMpe1xuICAgICAgICAgICAgICAgIGlmKGtleSAhPT0gY2F0ZWdvcnlJZCAmJiB0aGlzLm5hdmlnYXRpb25TdGF0ZS5maWx0ZXJzW2tleV0gIT09IHRoaXMua2VlcEFsbEZpbHRlciAmJiB0aGlzLm5hdmlnYXRpb25TdGF0ZS5maWx0ZXJzW2tleV0gIT09IHRoaXMua2VlcE5vbmVGaWx0ZXIpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZS5maWx0ZXJzW2tleV0gPSB0aGlzLmtlZXBBbGxGaWx0ZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTZWFyY2ggdGhlIGVudGl0eSBJRFxuICAgICAgICAgICAgbGV0IGhpZ2hsaWdodDtcbiAgICAgICAgICAgIGZvcihjb25zdCBrZXkgaW4gdGhpcy5oaWdobGlnaHREYXRhUGVyTG9jYXRpb24pe1xuICAgICAgICAgICAgICAgIGhpZ2hsaWdodCA9IHRoaXMuaGlnaGxpZ2h0RGF0YVBlckxvY2F0aW9uW2tleV07XG4gICAgICAgICAgICAgICAgaWYoaGlnaGxpZ2h0LnBvc2l0aW9uSW5DYXRlZ29yaWVzW2NhdGVnb3J5SWRdICYmIGhpZ2hsaWdodC52YWx1ZXMuaW5jbHVkZXModmFsdWUuZmlsdGVyVmFsdWUpKXtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihoaWdobGlnaHQpe1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmlld0RvY3VtZW50LnNlbGVjdEhpZ2hsaWdodChjYXRlZ29yeUlkLCBoaWdobGlnaHQucG9zaXRpb25JbkNhdGVnb3JpZXNbY2F0ZWdvcnlJZF0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIENhbmNlbCB2YWx1ZSBmaWx0ZXJzXG4gICAgICAgICAgICBmb3IoY29uc3Qga2V5IGluIHRoaXMubmF2aWdhdGlvblN0YXRlLmZpbHRlcnMpe1xuICAgICAgICAgICAgICAgIGlmKHRoaXMubmF2aWdhdGlvblN0YXRlLmZpbHRlcnNba2V5XSAhPT0gdGhpcy5rZWVwQWxsRmlsdGVyICYmIHRoaXMubmF2aWdhdGlvblN0YXRlLmZpbHRlcnNba2V5XSAhPT0gdGhpcy5rZWVwTm9uZUZpbHRlcil7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlLmZpbHRlcnNba2V5XSA9IHRoaXMua2VlcEFsbEZpbHRlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJlc2V0IGp1c3QgYXBwbGllcyB0aGUgKG5vbi12YWx1ZSkgZmlsdGVycyBhcyB0aGV5IGFyZSBhbmQgcmVtb3ZlcyBzZWxlY3Rpb25cbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcGFyYXRvciBhbGxvd2luZyB0byBzb3J0IHRoZSBmaWx0ZXJzIGluIHRoZSBzZWxlY3RcbiAgICAgKi9cbiAgICBwdWJsaWMgY29tcGFyZUZpbHRlcnMoZmlsdGVyMTogSGlnaGxpZ2h0Q2F0ZWdvcnlGaWx0ZXJTdGF0ZSwgZmlsdGVyMjogSGlnaGxpZ2h0Q2F0ZWdvcnlGaWx0ZXJTdGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gU2ltcGxlSGlnaGxpZ2h0Q2F0ZWdvcnlGaWx0ZXJTdGF0ZS5jb21wYXJlKGZpbHRlcjEsIGZpbHRlcjIpO1xuICAgIH1cblxuXG59XG5cblxuXG5cbi8vIEltcGxlbWVudGF0aW9uIG9mIGRhdGEgc3RydWN0dXJlc1xuXG5jbGFzcyBTaW1wbGVIaWdobGlnaHROYXZpZ2F0aW9uU3RhdGUge1xuXG4gICAgY3VycmVudDogbnVtYmVyO1xuICAgIGZpbHRlcnM6IHsgW2tleTogc3RyaW5nXSA6IEhpZ2hsaWdodENhdGVnb3J5RmlsdGVyU3RhdGV9O1xuXG4gICAgY29uc3RydWN0b3IoY2F0ZWdvcmllczogc3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gLTE7ICAvLyBObyBzZWxlY3Rpb25cbiAgICAgICAgdGhpcy5maWx0ZXJzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgY2F0ZWdvcnkgb2YgY2F0ZWdvcmllcykge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzW2NhdGVnb3J5XSA9IG5ldyBTaW1wbGVIaWdobGlnaHRDYXRlZ29yeUZpbHRlclN0YXRlKCk7IC8vIEFsbCBlbnRpdGllcyB2aXNpYmxlIGJ5IGRlZmF1bHRcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5jbGFzcyBTaW1wbGVIaWdobGlnaHRDYXRlZ29yeUZpbHRlclN0YXRlIGltcGxlbWVudHMgSGlnaGxpZ2h0Q2F0ZWdvcnlGaWx0ZXJTdGF0ZSB7XG4gICAgcmVhZG9ubHkgY2hvaWNlOiBIaWdobGlnaHRDYXRlZ29yeUZpbHRlckNob2ljZSA9IEhpZ2hsaWdodENhdGVnb3J5RmlsdGVyQ2hvaWNlLkFsbDtcbiAgICBwcml2YXRlIF9maWx0ZXJWYWx1ZTogc3RyaW5nID0gXCJcIjtcblxuICAgIGNvbnN0cnVjdG9yKHBhcmFtPzogc3RyaW5nIHwgSGlnaGxpZ2h0Q2F0ZWdvcnlGaWx0ZXJDaG9pY2UpIHtcbiAgICAgICAgaWYgKHBhcmFtID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHBhcmFtID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLmNob2ljZSA9IEhpZ2hsaWdodENhdGVnb3J5RmlsdGVyQ2hvaWNlLlZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fZmlsdGVyVmFsdWUgPSBwYXJhbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hvaWNlID0gcGFyYW07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZmlsdGVyVmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuY2hvaWNlID09PSBIaWdobGlnaHRDYXRlZ29yeUZpbHRlckNob2ljZS5WYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlclZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY29tcGFyZShmaWx0ZXIxOiBIaWdobGlnaHRDYXRlZ29yeUZpbHRlclN0YXRlLCBmaWx0ZXIyOiBIaWdobGlnaHRDYXRlZ29yeUZpbHRlclN0YXRlKSB7XG4gICAgICAgIGlmKGZpbHRlcjEgJiYgZmlsdGVyMikge1xuICAgICAgICAgICAgaWYoZmlsdGVyMS5jaG9pY2UgIT09IGZpbHRlcjIuY2hvaWNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcjEuY2hvaWNlICE9PSBIaWdobGlnaHRDYXRlZ29yeUZpbHRlckNob2ljZS5WYWx1ZVxuICAgICAgICAgICAgICAgIHx8IGZpbHRlcjEuZmlsdGVyVmFsdWUgPT09IGZpbHRlcjIuZmlsdGVyVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbHRlcjEgPT09IGZpbHRlcjI7XG4gICAgfVxufVxuXG5cbmNsYXNzIEZpbHRlcmVkSGlnaGxpZ2h0RGF0YVBlckxvY2F0aW9uIGltcGxlbWVudHMgSGlnaGxpZ2h0RGF0YVBlckxvY2F0aW9uIHtcblxuICAgIFtpbmRleDogbnVtYmVyXToge1xuICAgICAgICBzdGFydDogbnVtYmVyLFxuICAgICAgICBsZW5ndGg6IG51bWJlcixcbiAgICAgICAgdmFsdWVzOiBzdHJpbmdbXSxcbiAgICAgICAgZGlzcGxheVZhbHVlOiBzdHJpbmcsXG4gICAgICAgIHBvc2l0aW9uSW5DYXRlZ29yaWVzOiB7IFtjYXRlZ29yeTogc3RyaW5nXTogbnVtYmVyIH1cbiAgICB9O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGJhc2VEYXRhOiBIaWdobGlnaHREYXRhUGVyTG9jYXRpb24sIGZpbHRlcnM6IHsgW2tleTogc3RyaW5nXSA6IEhpZ2hsaWdodENhdGVnb3J5RmlsdGVyU3RhdGUgfSkge1xuICAgICAgICBsZXQgY291bnRlcjogbnVtYmVyID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBpIGluIGJhc2VEYXRhKSB7XG4gICAgICAgICAgICBjb25zdCBjYXRlZ29yaWVzID0gIWJhc2VEYXRhW2ldLnBvc2l0aW9uSW5DYXRlZ29yaWVzID8gdW5kZWZpbmVkIDogT2JqZWN0LmtleXMoYmFzZURhdGFbaV0ucG9zaXRpb25JbkNhdGVnb3JpZXMpO1xuICAgICAgICAgICAgaWYgKGNhdGVnb3JpZXMgJiYgdGhpcy5sb2NhdGlvbklzSW5jbHVkZWQoYmFzZURhdGFbaV0udmFsdWVzLCBjYXRlZ29yaWVzLCBmaWx0ZXJzKSkge1xuICAgICAgICAgICAgICAgIHRoaXNbY291bnRlcl0gPSBiYXNlRGF0YVtpXTtcbiAgICAgICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgcHVibGljIGxvY2F0aW9uSXNJbmNsdWRlZCh2YWx1ZXM6IHN0cmluZ1tdLCBjYXRlZ29yaWVzOiBzdHJpbmdbXSwgZmlsdGVyczogeyBba2V5OiBzdHJpbmddIDogSGlnaGxpZ2h0Q2F0ZWdvcnlGaWx0ZXJTdGF0ZSB9KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghY2F0ZWdvcmllcykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgY2F0ZWdvcnkgb2YgY2F0ZWdvcmllcykge1xuICAgICAgICAgICAgaWYgKGZpbHRlcnNbY2F0ZWdvcnldICYmXG4gICAgICAgICAgICAgICAgKGZpbHRlcnNbY2F0ZWdvcnldLmNob2ljZSA9PT0gSGlnaGxpZ2h0Q2F0ZWdvcnlGaWx0ZXJDaG9pY2UuQWxsXG4gICAgICAgICAgICAgICAgfHwgZmlsdGVyc1tjYXRlZ29yeV0uY2hvaWNlID09PSBIaWdobGlnaHRDYXRlZ29yeUZpbHRlckNob2ljZS5WYWx1ZSAmJiB2YWx1ZXMgIT0gbnVsbCAmJiB2YWx1ZXMuaW5jbHVkZXMoZmlsdGVyc1tjYXRlZ29yeV0uZmlsdGVyVmFsdWUpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiY2FyZCBzcS1mYWNldFwiPlxuICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPnt7J21zZyNwcmV2aWV3LmhpZ2hsaWdodHNUaXRsZScgfCBzcU1lc3NhZ2V9fTwvZGl2PlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJub0RhdGE7IGVsc2Ugbm9ybWFsQ2FzZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5IG5vRW50aXR5VG9IaWdobGlnaHRNZXNzYWdlXCI+XG4gICAgICAgICAgICB7e1wibXNnI3ByZXZpZXcubm9FbnRpdHlUb0hpZ2hsaWdodFwiIHwgc3FNZXNzYWdlfX1cbiAgICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLXRlbXBsYXRlICNub3JtYWxDYXNlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3VycmVudFNlbGVjdGlvblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3RlZEhpZ2hsaWdodFRpdGxlXCI+e3tcIm1zZyNwcmV2aWV3LnNlbGVjdGVkSGlnaGxpZ2h0XCIgfCBzcU1lc3NhZ2V9fTo8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3VycmVudFNlbGVjdGlvblBhbmVsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJjdXJyZW50VmFsdWUgfHwgY3VycmVudENhdGVnb3JpZXM7IGVsc2Ugbm9TZWxlY3Rpb25cIiBjbGFzcz1cInNlbGVjdGVkSGlnaGxpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3VycmVudENhdGVnb3JpZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdGb3I9XCJsZXQgY2F0ZWdvcnlJZCBvZiBjdXJyZW50Q2F0ZWdvcmllc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhcyBmYS1idWxsc2V5ZSB7eyBjYXRlZ29yeUljb25DbGFzcyhjYXRlZ29yeUlkKSB9fSB7eyBjYXRlZ29yeUlkIH19XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImN1cnJlbnRDYXRlZ29yeUxhYmVsXCI+e3tjYXRlZ29yeURpc3BsYXlMYWJlbChjYXRlZ29yeUlkKSB8IHNxTWVzc2FnZTogY2F0ZWdvcnlMYWJlbFBpcGVQYXJhbXMoY2F0ZWdvcnlJZCl9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3RlZEhpZ2hsaWdodFZhbHVlXCIgW2lubmVySFRNTF09XCJjdXJyZW50VmFsdWVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjbm9TZWxlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm9TZWxlY3Rpb25NZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tcIm1zZyNwcmV2aWV3Lm5vU2VsZWN0ZWRIaWdobGlnaHRcIiB8IHNxTWVzc2FnZX19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+Jm5ic3A7PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYXZpZ2F0aW9uLWJ1dHRvbnNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBbZGlzYWJsZWRdPVwiIXByZXZpZXdSZWFkeVwiIChjbGljayk9XCJmaXJzdCgpXCIgdGl0bGU9XCJ7eydtc2cjcHJldmlldy5maXJzdEhpZ2hsaWdodEJ1dHRvbkFsdFRleHQnIHwgc3FNZXNzYWdlfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYXMgZmEtZmFzdC1iYWNrd2FyZFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBbZGlzYWJsZWRdPVwiIXByZXZpZXdSZWFkeVwiIChjbGljayk9XCJwcmV2aW91cygpXCIgdGl0bGU9XCJ7eydtc2cjcHJldmlldy5wcmV2aW91c0hpZ2hsaWdodEJ1dHRvbkFsdFRleHQnIHwgc3FNZXNzYWdlfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYXMgZmEtc3RlcC1iYWNrd2FyZFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY291bnRlci1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb3VudGVyXCI+e3tjdXJyZW50IHwgc3FOdW1iZXJ9fSAvIHt7dG90YWwgfCBzcU51bWJlcn19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvdW50ZXIgZ2hvc3RcIj57e3RvdGFsIHwgc3FOdW1iZXJ9fSAvIHt7dG90YWwgfCBzcU51bWJlcn19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiIFtkaXNhYmxlZF09XCIhcHJldmlld1JlYWR5XCIgKGNsaWNrKT1cIm5leHQoKVwiIHRpdGxlPVwie3snbXNnI3ByZXZpZXcubmV4dEhpZ2hsaWdodEJ1dHRvbkFsdFRleHQnIHwgc3FNZXNzYWdlfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYXMgZmEtc3RlcC1mb3J3YXJkXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiIFtkaXNhYmxlZF09XCIhcHJldmlld1JlYWR5XCIgKGNsaWNrKT1cImxhc3QoKVwiIHRpdGxlPVwie3snbXNnI3ByZXZpZXcubGFzdEhpZ2hsaWdodEJ1dHRvbkFsdFRleHQnIHwgc3FNZXNzYWdlfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYXMgZmEtZmFzdC1mb3J3YXJkXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5IGZpbHRlclBhbmVsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyUGFuZWxUaXRsZVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmFzIGZhLWZpbHRlclwiPjwvc3Bhbj57eyBcIm1zZyNwcmV2aWV3LmhpZ2hsaWdodEZpbHRlcnMudGl0bGVcIiB8IHNxTWVzc2FnZSB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmF0Y2hTZWxlY3RCdXR0b25zQ29udGFpbmVyXCIgKm5nSWY9XCJub25FbXB0eUNhdGVnb3J5SWRzLmxlbmd0aCA+IDFcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmF0Y2hTZWxlY3RCdXR0b25zUGFkZGluZ1BsYWNlaG9sZGVyXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhdGNoU2VsZWN0QnV0dG9uc1BhZGRpbmdQbGFjZWhvbGRlclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXRjaFNlbGVjdEJ1dHRvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhdGNoU2VsZWN0QnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgW2Rpc2FibGVkXT1cIiFwcmV2aWV3UmVhZHkgfHwgdGhpcy5hbGxTZWxlY3RlZFwiIChjbGljayk9XCJzZWxlY3RBbGwoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwie3snbXNnI3ByZXZpZXcuaGlnaGxpZ2h0RmlsdGVycy5rZWVwQWxsJyB8IHNxTWVzc2FnZX19XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYXIgZmEtY2hlY2stc3F1YXJlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7XCJtc2cjcHJldmlldy5oaWdobGlnaHRGaWx0ZXJzLmtlZXBBbGxcIiB8IHNxTWVzc2FnZX19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXRjaFNlbGVjdEJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0blwiIFtkaXNhYmxlZF09XCIhcHJldmlld1JlYWR5IHx8IHRoaXMubm9uZVNlbGVjdGVkXCIgKGNsaWNrKT1cInNlbGVjdE5vbmUoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwie3snbXNnI3ByZXZpZXcuaGlnaGxpZ2h0RmlsdGVycy5rZWVwTm9uZScgfCBzcU1lc3NhZ2V9fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmFzIGZhLXRpbWVzXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7XCJtc2cjcHJldmlldy5oaWdobGlnaHRGaWx0ZXJzLmtlZXBOb25lXCIgfCBzcU1lc3NhZ2V9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyc1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGNhdGVnb3J5SWQgb2Ygbm9uRW1wdHlDYXRlZ29yeUlkc1wiIGNsYXNzPVwic3EtaGlnaGxpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXRlZ29yeUljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmFzIGZhLWJ1bGxzZXllIHt7IGNhdGVnb3J5SWNvbkNsYXNzKGNhdGVnb3J5SWQpIH19IHt7IGNhdGVnb3J5SWQgfX1cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2F0ZWdvcnlMYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3tnZXRDYXRlZ29yeUhpZ2hsaWdodERhdGEoY2F0ZWdvcnlJZCk/LmNhdGVnb3J5RGlzcGxheUxhYmVsUGx1cmFsIHwgc3FNZXNzYWdlOiBjYXRlZ29yeUxhYmVsUGlwZVBhcmFtcyhjYXRlZ29yeUlkKX19OlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhdGVnb3J5RmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY2F0ZWdvcnlIYXNNdWx0aXBsZVZhbHVlcyhjYXRlZ29yeUlkKTsgZWxzZSBzaW5nbGVWYWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJjdXN0b20tc2VsZWN0XCIgWyhuZ01vZGVsKV09XCJuYXZpZ2F0aW9uU3RhdGUuZmlsdGVyc1tjYXRlZ29yeUlkXVwiIFtjb21wYXJlV2l0aF09XCJjb21wYXJlRmlsdGVyc1wiIChuZ01vZGVsQ2hhbmdlKT1cInNlbGVjdEZpbHRlcihjYXRlZ29yeUlkLCAkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gW25nVmFsdWVdPVwia2VlcEFsbEZpbHRlclwiPnt7Z2V0Q2F0ZWdvcnlIaWdobGlnaHREYXRhKGNhdGVnb3J5SWQpPy5jYXRlZ29yeUZpbHRlckFsbExhYmVsIHwgc3FNZXNzYWdlfX0gKHt7Z2V0SGlnaGxpZ2h0VmFsdWVDb3VudChjYXRlZ29yeUlkKSB8IHNxTnVtYmVyfX0pPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gW25nVmFsdWVdPVwia2VlcE5vbmVGaWx0ZXJcIj57e2dldENhdGVnb3J5SGlnaGxpZ2h0RGF0YShjYXRlZ29yeUlkKT8uY2F0ZWdvcnlGaWx0ZXJOb25lTGFiZWwgfCBzcU1lc3NhZ2V9fTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGNsYXNzPVwic2VsZWN0U2VwYXJhdG9yXCIgZGlzYWJsZWQ+Jm5ic3A7PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IGVudGl0eVZhbHVlIG9mIHRoaXMuZ2V0Q2F0ZWdvcnlIaWdobGlnaHREYXRhKGNhdGVnb3J5SWQpPy52YWx1ZXNcIiBbbmdWYWx1ZV09XCJuZXdGaWx0ZXIoZW50aXR5VmFsdWUudmFsdWUpXCI+e3tlbnRpdHlWYWx1ZS5kaXNwbGF5VmFsdWV9fTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI3NpbmdsZVZhbHVlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJjdXN0b20tc2VsZWN0XCIgWyhuZ01vZGVsKV09XCJuYXZpZ2F0aW9uU3RhdGUuZmlsdGVyc1tjYXRlZ29yeUlkXVwiIFtjb21wYXJlV2l0aF09XCJjb21wYXJlRmlsdGVyc1wiIChuZ01vZGVsQ2hhbmdlKT1cInNlbGVjdEZpbHRlcihjYXRlZ29yeUlkLCAkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gW25nVmFsdWVdPVwia2VlcEFsbEZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tnZXRDYXRlZ29yeUhpZ2hsaWdodERhdGEoY2F0ZWdvcnlJZCk/LmNhdGVnb3J5RmlsdGVyQWxsTGFiZWwgfCBzcU1lc3NhZ2V9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImdldENhdGVnb3J5SGlnaGxpZ2h0RGF0YShjYXRlZ29yeUlkKT8udmFsdWVzWzBdLmRpc3BsYXlWYWx1ZSBhcyBkaXNwbGF5VmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoe3tkaXNwbGF5VmFsdWV9fSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBbbmdWYWx1ZV09XCJrZWVwTm9uZUZpbHRlclwiPnt7Z2V0Q2F0ZWdvcnlIaWdobGlnaHREYXRhKGNhdGVnb3J5SWQpPy5jYXRlZ29yeUZpbHRlck5vbmVMYWJlbCB8IHNxTWVzc2FnZX19PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuPC9kaXY+Il19