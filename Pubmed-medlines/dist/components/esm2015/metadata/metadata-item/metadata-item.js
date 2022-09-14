import { Component, Input, Output, HostBinding, EventEmitter } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import { AppService } from "@sinequa/core/app-utils";
import { FacetService } from "@sinequa/components/facet";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "@angular/common";
import * as i3 from "../metadata-access-lists-item/metadata-access-lists-item";
import * as i4 from "../showmore/showmore";
import * as i5 from "@sinequa/core/intl";
import * as i6 from "@sinequa/components/utils";
function MetadataItem_div_0_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 8);
    i0.ɵɵpipe(1, "sqMessage");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMapInterpolate2("sq-metadata-item-icon sq-icon-", ctx_r1.item, " ", ctx_r1.docFormatIconClass, " fa-fw pr-2");
    i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 5, ctx_r1.label));
} }
function MetadataItem_div_0_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, "msg#metadata.item.label", ctx_r2.itemLabelMessageParams));
} }
function MetadataItem_div_0_a_5_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 10);
    i0.ɵɵlistener("click", function MetadataItem_div_0_a_5_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.toggleCollapse(); });
    i0.ɵɵelement(1, "i");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵclassMapInterpolate1("fas fa-fw fa-chevron-", ctx_r4.collapsed ? "right" : "down", "");
} }
function MetadataItem_div_0_sq_metadata_access_lists_item_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "sq-metadata-access-lists-item", 11);
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("accessLists", ctx_r5.accessListsData);
} }
function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 21);
    i0.ɵɵlistener("click", function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r26); const $subIndex_r20 = i0.ɵɵnextContext().index; const $index_r15 = i0.ɵɵnextContext(2).index; const ctx_r24 = i0.ɵɵnextContext(4); return ctx_r24.select($index_r15, $subIndex_r20); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqValue");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const part_r19 = i0.ɵɵnextContext().$implicit;
    const ctx_r21 = i0.ɵɵnextContext(6);
    i0.ɵɵproperty("ngClass", "sq-metadata-item-" + ctx_r21.item);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 2, part_r19, ctx_r21.column));
} }
function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqValue");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const part_r19 = i0.ɵɵnextContext().$implicit;
    const ctx_r22 = i0.ɵɵnextContext(6);
    i0.ɵɵproperty("ngClass", "sq-metadata-item-" + ctx_r22.item);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 2, part_r19, ctx_r22.column));
} }
function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 23);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "msg#metadata.item.treeNodeSeparator"));
} }
function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_a_1_Template, 3, 5, "a", 18);
    i0.ɵɵtemplate(2, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_span_2_Template, 3, 5, "span", 19);
    i0.ɵɵtemplate(3, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_span_3_Template, 3, 3, "span", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const $subIndex_r20 = ctx.index;
    const valueItem_r14 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r18 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r18.clickable);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r18.clickable);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", $subIndex_r20 < valueItem_r14.parts.length - 1);
} }
function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ol", 17);
    i0.ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_Template, 4, 3, "li", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const valueItem_r14 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", valueItem_r14.parts);
} }
function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 24);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "msg#metadata.item.treeSeparator"));
} }
function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_Template, 2, 1, "ol", 15);
    i0.ɵɵtemplate(2, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_span_2_Template, 3, 3, "span", 16);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const valueItem_r14 = ctx.$implicit;
    const $index_r15 = ctx.index;
    const ctx_r13 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !!valueItem_r14.parts && valueItem_r14.parts.length > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", $index_r15 < ctx_r13.valueItems.length - 1);
} }
function MetadataItem_div_0_ng_template_7_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_Template, 3, 2, "ng-container", 14);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r10.valueItems);
} }
function MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_a_1_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const valueItem_r36 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("title", valueItem_r36.count + " occurrences in document");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(valueItem_r36.count);
} }
function MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r41 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 27);
    i0.ɵɵlistener("click", function MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r41); const $index_r37 = ctx.index; const ctx_r40 = i0.ɵɵnextContext(5); return ctx_r40.select($index_r37); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "sqValue");
    i0.ɵɵtemplate(4, MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_a_1_span_4_Template, 2, 2, "span", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const valueItem_r36 = ctx.$implicit;
    const ctx_r35 = i0.ɵɵnextContext(5);
    i0.ɵɵclassMapInterpolate1("badge badge-pill ", "sq-metadata-item-" + ctx_r35.item, " mr-1");
    i0.ɵɵproperty("href", valueItem_r36.value, i0.ɵɵsanitizeUrl);
    i0.ɵɵattribute("title", ctx_r35.showTitle ? null : i0.ɵɵpipeBind1(1, 7, ctx_r35.label));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(3, 9, valueItem_r36, ctx_r35.column), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r35.showCounts && valueItem_r36.count);
} }
function MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_a_1_Template, 5, 12, "a", 26);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r32 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r32.valueItems);
} }
function MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_ng_container_0_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 33);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const valueItem_r43 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("title", valueItem_r43.count + " occurrences in document");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("(", valueItem_r43.count, ")");
} }
function MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_ng_container_0_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 34);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "msg#metadata.item.listSeparator"));
} }
function MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelement(3, "sq-showmore", 30);
    i0.ɵɵtemplate(4, MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_ng_container_0_span_4_Template, 2, 2, "span", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_ng_container_0_span_5_Template, 3, 3, "span", 32);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const valueItem_r43 = ctx.$implicit;
    const $index_r44 = ctx.index;
    const ctx_r42 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap("sq-metadata-item-" + ctx_r42.item);
    i0.ɵɵattribute("title", ctx_r42.showTitle ? null : i0.ɵɵpipeBind1(2, 7, ctx_r42.label));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("question", valueItem_r43.value);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r42.showCounts && valueItem_r43.count);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", $index_r44 < ctx_r42.valueItems.length - 1);
} }
function MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_ng_container_0_Template, 6, 9, "ng-container", 14);
} if (rf & 2) {
    const ctx_r34 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("ngForOf", ctx_r34.valueItems);
} }
function MetadataItem_div_0_ng_template_7_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_Template, 2, 1, "ng-container", 12);
    i0.ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_Template, 1, 1, "ng-template", null, 25, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const _r33 = i0.ɵɵreference(2);
    const ctx_r12 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngIf", ctx_r12.clickable)("ngIfElse", _r33);
} }
function MetadataItem_div_0_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, MetadataItem_div_0_ng_template_7_ng_container_0_Template, 2, 1, "ng-container", 12);
    i0.ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_template_1_Template, 3, 2, "ng-template", null, 13, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const _r11 = i0.ɵɵreference(2);
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngIf", ctx_r7.isTree)("ngIfElse", _r11);
} }
const _c0 = function (a0) { return { collapsed: a0 }; };
function MetadataItem_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, MetadataItem_div_0_span_1_Template, 2, 7, "span", 1);
    i0.ɵɵtemplate(2, MetadataItem_div_0_span_2_Template, 3, 4, "span", 2);
    i0.ɵɵelementStart(3, "span", 3, 4);
    i0.ɵɵtemplate(5, MetadataItem_div_0_a_5_Template, 2, 3, "a", 5);
    i0.ɵɵtemplate(6, MetadataItem_div_0_sq_metadata_access_lists_item_6_Template, 1, 1, "sq-metadata-access-lists-item", 6);
    i0.ɵɵtemplate(7, MetadataItem_div_0_ng_template_7_Template, 3, 2, "ng-template", null, 7, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const _r6 = i0.ɵɵreference(8);
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMapInterpolate1("sq-metadata-item ", ctx_r0.itemClasses, "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.showIcon && !!ctx_r0.item);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.showTitle && !!ctx_r0.item);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(9, _c0, !!ctx_r0.collapsed));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.collapseRows && ctx_r0.needsCollapse);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.isAccessLists)("ngIfElse", _r6);
} }
export class MetadataItem {
    constructor(appService, formatService) {
        this.appService = appService;
        this.formatService = formatService;
        this.showTitle = true;
        this.showIcon = false;
        this.showCounts = true;
        this.clickable = true;
        this.tabular = true;
        this.collapseRows = true;
        this._select = new EventEmitter();
        this.needsCollapse = false;
        this.valueItems = [];
    }
    get hidden() { return this.isEmpty; }
    ensureScalarValue(value) {
        if (Utils.isEmpty(value) && this.column) {
            if (AppService.isBoolean(this.column)) {
                value = 'msg#metadata.item.empty_boolean';
            }
            else if (AppService.isNumber(this.column)) {
                value = 'msg#metadata.item.empty_number';
            }
        }
        return value;
    }
    ngOnChanges(changes) {
        if (!this.column) {
            this.column = this.appService.getColumn(this.item);
            this.itemLabelMessageParams = { values: { label: this.label } };
        }
        this.valueItems = [];
        this.isTree = !!this.column && AppService.isTree(this.column);
        this.isEntity = !!this.column && AppService.isEntity(this.column);
        this.isCsv = !!this.column && AppService.isCsv(this.column);
        const values = this.record[this.appService.getColumnAlias(this.column, this.item)];
        if (this.isTree) {
            const paths = values;
            if (paths) {
                for (const path of paths) {
                    const parts = path.split("/");
                    if (parts.length > 0 && parts[0] === "") {
                        parts.splice(0, 1);
                    }
                    if (parts.length > 0 && parts[parts.length - 1] === "") {
                        parts.splice(parts.length - 1, 1);
                    }
                    const item = { value: path, parts: parts.map(value => ({ value: value })) };
                    this.valueItems.push(item);
                }
            }
        }
        else if (this.isEntity) {
            const entityItems = values;
            if (entityItems) {
                this.valueItems.push(...entityItems);
            }
        }
        else if (this.isCsv) {
            if (values && values instanceof Array) {
                this.valueItems.push(...values.map(value => ({ value: value })));
            }
            else if (!Utils.isEmpty(values)) {
                this.valueItems.push({ value: values });
            }
        }
        else {
            const value = this.ensureScalarValue(values);
            if (!Utils.isEmpty(value)) {
                this.valueItems.push({ value: value });
            }
        }
        const collapsable = (this.isEntity || this.isCsv) && !this.isTree; // Tree columns are multivalues, and therefore isCsv=true
        if (changes.collapseRows || this.collapsed === undefined) {
            this.collapsed = collapsable && this.collapseRows;
        }
        this.needsCollapse = collapsable && this.collapseRows && this.tabular && this.valueItems.length > 1; // We display the collapse button as soon as the number of values is >1 which does not take into account the actualy width of each value...
    }
    get isEmpty() {
        if (!this.item) {
            return true;
        }
        if (this.item === "accesslists") {
            if (!this.record.accesslists || !this.record.accesslists.accessListIndices
                || this.record.accesslists.accessListIndices.length === 0) {
                return true;
            }
        }
        else {
            if (this.valueItems.length === 0) {
                return true;
            }
        }
        return false;
    }
    get itemClasses() {
        let classes = "sq-text";
        if (this.clickable) {
            classes += " sq-clickable";
        }
        if (this.tabular) {
            classes += " sq-tabular";
        }
        return classes;
    }
    get label() {
        return this.appService.getLabel(this.item);
    }
    get isAccessLists() {
        return this.item === "accesslists";
    }
    get accessListsData() {
        return this.record.accesslists;
    }
    get docFormatIconClass() {
        if (this.item == null || this.item !== "docformat" && this.item !== "fileext") {
            return "";
        }
        const value = this.record[this.item];
        if (!value) {
            return "far fa-file";
        }
        return "far fa-file sq-icon-file-" + value;
    }
    select(index, subIndex = 0) {
        if (this.isTree) {
            const valueItem = this.valueItems[index];
            const parts = valueItem.parts.map((item) => item.value).slice(0, subIndex + 1);
            if (parts.length > 0) {
                parts.unshift("");
                parts.push("");
            }
            const path = parts.join("/");
            this._select.emit({ item: this.item, valueItem: { value: path + "*", display: FacetService.treepathLast(path) } });
        }
        else {
            this._select.emit({ item: this.item, valueItem: this.valueItems[index] });
        }
        return false; // prevent default
    }
    toggleCollapse() {
        this.collapsed = !this.collapsed;
        return false;
    }
}
MetadataItem.ɵfac = function MetadataItem_Factory(t) { return new (t || MetadataItem)(i0.ɵɵdirectiveInject(i1.AppService), i0.ɵɵdirectiveInject(i1.FormatService)); };
MetadataItem.ɵcmp = i0.ɵɵdefineComponent({ type: MetadataItem, selectors: [["sq-metadata-item"]], hostVars: 1, hostBindings: function MetadataItem_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵhostProperty("hidden", ctx.hidden);
    } }, inputs: { record: "record", item: "item", showTitle: "showTitle", showIcon: "showIcon", showCounts: "showCounts", clickable: "clickable", tabular: "tabular", collapseRows: "collapseRows" }, outputs: { _select: "select" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "class", 4, "ngIf"], [3, "class", "title", 4, "ngIf"], ["class", "sq-metadata-item-label pr-2", 4, "ngIf"], [1, "sq-metadata-item-values", 3, "ngClass"], ["values", ""], ["href", "#", "class", "collapse-button mr-1", 3, "click", 4, "ngIf"], [3, "accessLists", 4, "ngIf", "ngIfElse"], ["default", ""], [3, "title"], [1, "sq-metadata-item-label", "pr-2"], ["href", "#", 1, "collapse-button", "mr-1", 3, "click"], [3, "accessLists"], [4, "ngIf", "ngIfElse"], ["isNotTree", ""], [4, "ngFor", "ngForOf"], ["class", "breadcrumb", 4, "ngIf"], ["class", "sq-metadata-item-tree-separator", 4, "ngIf"], [1, "breadcrumb"], ["class", "badge badge-pill", "href", "#", 3, "ngClass", "click", 4, "ngIf"], [3, "ngClass", 4, "ngIf"], ["class", "sq-metadata-item-tree-node-separator", 4, "ngIf"], ["href", "#", 1, "badge", "badge-pill", 3, "ngClass", "click"], [3, "ngClass"], [1, "sq-metadata-item-tree-node-separator"], [1, "sq-metadata-item-tree-separator"], ["notTreeNonClickable", ""], ["target", "_blank", 3, "class", "href", "click", 4, "ngFor", "ngForOf"], ["target", "_blank", 3, "href", "click"], ["class", "counter badge badge-light ml-1", 3, "title", 4, "ngIf"], [1, "counter", "badge", "badge-light", "ml-1", 3, "title"], [3, "question"], ["class", "small", 3, "title", 4, "ngIf"], ["class", "sq-metadata-item-list-separator", 4, "ngIf"], [1, "small", 3, "title"], [1, "sq-metadata-item-list-separator"]], template: function MetadataItem_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, MetadataItem_div_0_Template, 9, 11, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !ctx.isEmpty);
    } }, directives: [i2.NgIf, i2.NgClass, i3.MetadataAccessListsItem, i2.NgForOf, i4.Showmore], pipes: [i5.MessagePipe, i6.ValuePipe], styles: [".sq-metadata-item-label[_ngcontent-%COMP%]{white-space:nowrap;width:1px}.sq-metadata-item-values[_ngcontent-%COMP%]{max-height:15rem;overflow:hidden;transition:max-height .2s ease-in-out}.sq-metadata-item-values[_ngcontent-%COMP%]   .breadcrumb[_ngcontent-%COMP%]{background-color:inherit;display:inline;padding:0}.sq-metadata-item-values[_ngcontent-%COMP%]   .breadcrumb[_ngcontent-%COMP%]:after, .sq-metadata-item-values[_ngcontent-%COMP%]   .breadcrumb[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{display:inline}.sq-metadata-item-values[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%]{font-size:83%}.sq-metadata-item-values.collapsed[_ngcontent-%COMP%]{display:block;max-height:1.5rem}.sq-metadata-item-values[_ngcontent-%COMP%]   .collapse-button[_ngcontent-%COMP%]{font-size:.9rem}.sq-metadata-item.sq-tabular[_ngcontent-%COMP%]{display:table-row}.sq-metadata-item.sq-tabular[_ngcontent-%COMP%]   .sq-metadata-item-icon[_ngcontent-%COMP%], .sq-metadata-item.sq-tabular[_ngcontent-%COMP%]   .sq-metadata-item-label[_ngcontent-%COMP%]{display:table-cell}.sq-metadata-item[_ngcontent-%COMP%]:not(.sq-tabular), .sq-metadata-item[_ngcontent-%COMP%]:not(.sq-tabular)   .sq-metadata-item-label[_ngcontent-%COMP%], .sq-metadata-item[_ngcontent-%COMP%]:not(.sq-tabular)   .sq-metadata-item-values[_ngcontent-%COMP%]{display:inline}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MetadataItem, [{
        type: Component,
        args: [{
                selector: "sq-metadata-item",
                templateUrl: "./metadata-item.html",
                styleUrls: ['./metadata-item.scss']
            }]
    }], function () { return [{ type: i1.AppService }, { type: i1.FormatService }]; }, { record: [{
            type: Input
        }], item: [{
            type: Input
        }], showTitle: [{
            type: Input
        }], showIcon: [{
            type: Input
        }], showCounts: [{
            type: Input
        }], clickable: [{
            type: Input
        }], tabular: [{
            type: Input
        }], collapseRows: [{
            type: Input
        }], _select: [{
            type: Output,
            args: ["select"]
        }], hidden: [{
            type: HostBinding,
            args: ['hidden']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL21ldGFkYXRhLyIsInNvdXJjZXMiOlsibWV0YWRhdGEtaXRlbS9tZXRhZGF0YS1pdGVtLnRzIiwibWV0YWRhdGEtaXRlbS9tZXRhZGF0YS1pdGVtLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBNEIsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVHLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsVUFBVSxFQUEyQixNQUFNLHlCQUF5QixDQUFDO0FBRTdFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7O0lDRm5ELDBCQUVPOzs7O0lBRjBCLHVIQUFnRjtJQUM3RywwREFBMkI7OztJQUkvQiwrQkFBc0U7SUFBQSxZQUFnRTs7SUFBQSxpQkFBTzs7O0lBQXZFLGVBQWdFO0lBQWhFLG9HQUFnRTs7OztJQUlsSSw2QkFDSTtJQUQ4QyxvTEFBMEI7SUFDeEUsb0JBQW9FO0lBQ3hFLGlCQUFJOzs7SUFERyxlQUE0RDtJQUE1RCwyRkFBNEQ7OztJQUluRSxvREFDZ0M7OztJQURtQyxvREFBK0I7Ozs7SUFVOUUsNkJBQXNJO0lBQXBDLDRWQUFtQztJQUFDLFlBQXlCOztJQUFBLGlCQUFJOzs7O0lBQWpILDREQUFzQztJQUE4QyxlQUF5QjtJQUF6QixvRUFBeUI7OztJQUMvSixnQ0FBZ0U7SUFBQSxZQUF5Qjs7SUFBQSxpQkFBTzs7OztJQUF2RSw0REFBc0M7SUFBQyxlQUF5QjtJQUF6QixvRUFBeUI7OztJQUN6RixnQ0FBa0c7SUFBQSxZQUFxRDs7SUFBQSxpQkFBTzs7SUFBNUQsZUFBcUQ7SUFBckQsaUZBQXFEOzs7SUFIM0osMEJBQ0k7SUFBQSxzSEFBbUs7SUFDbkss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LEVBQUUsSUFBSSxHQUFHLEdBQUcsRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUFDLENBQUMsQ0FBQztTQUNsSDthQUNJO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLENBQUM7U0FDM0U7UUFDRCxPQUFPLEtBQUssQ0FBQyxDQUFDLGtCQUFrQjtJQUNwQyxDQUFDO0lBRUQsY0FBYztRQUNWLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pDLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7O3dFQXBLUSxZQUFZO2lEQUFaLFlBQVk7OztRQ2Z6Qiw4REFxRU07O1FBckVBLG1DQUFjOztrRERlUCxZQUFZO2NBTHhCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixXQUFXLEVBQUUsc0JBQXNCO2dCQUNuQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzthQUN0Qzt5RkFFWSxNQUFNO2tCQUFkLEtBQUs7WUFDRyxJQUFJO2tCQUFaLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLO1lBQ0csUUFBUTtrQkFBaEIsS0FBSztZQUNHLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLO1lBQ0csT0FBTztrQkFBZixLQUFLO1lBQ0csWUFBWTtrQkFBcEIsS0FBSztZQUNZLE9BQU87a0JBQXhCLE1BQU07bUJBQUMsUUFBUTtZQUNXLE1BQU07a0JBQWhDLFdBQVc7bUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBIb3N0QmluZGluZywgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBFdmVudEVtaXR0ZXJ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcclxuaW1wb3J0IHtBcHBTZXJ2aWNlLCBGb3JtYXRTZXJ2aWNlLCBWYWx1ZUl0ZW19IGZyb20gXCJAc2luZXF1YS9jb3JlL2FwcC11dGlsc1wiO1xyXG5pbXBvcnQge1JlY29yZCwgRW50aXR5SXRlbSwgRG9jdW1lbnRBY2Nlc3NMaXN0cywgQ0NDb2x1bW59IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xyXG5pbXBvcnQge0ZhY2V0U2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvZmFjZXRcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHJlZVZhbHVlSXRlbSBleHRlbmRzIFZhbHVlSXRlbSB7XHJcbiAgICBwYXJ0czogVmFsdWVJdGVtW107XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwic3EtbWV0YWRhdGEtaXRlbVwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9tZXRhZGF0YS1pdGVtLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL21ldGFkYXRhLWl0ZW0uc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZXRhZGF0YUl0ZW0gaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gICAgQElucHV0KCkgcmVjb3JkOiBSZWNvcmQ7XHJcbiAgICBASW5wdXQoKSBpdGVtOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBzaG93VGl0bGUgPSB0cnVlO1xyXG4gICAgQElucHV0KCkgc2hvd0ljb246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHNob3dDb3VudHM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCkgY2xpY2thYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIHRhYnVsYXI6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCkgY29sbGFwc2VSb3dzOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBPdXRwdXQoXCJzZWxlY3RcIikgX3NlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8e2l0ZW06IHN0cmluZywgdmFsdWVJdGVtOiBWYWx1ZUl0ZW19PigpO1xyXG4gICAgQEhvc3RCaW5kaW5nKCdoaWRkZW4nKSBnZXQgaGlkZGVuKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5pc0VtcHR5OyB9XHJcbiAgICB2YWx1ZUl0ZW1zOiAoVmFsdWVJdGVtIHwgVHJlZVZhbHVlSXRlbSlbXTtcclxuICAgIGNvbHVtbjogQ0NDb2x1bW4gfCB1bmRlZmluZWQ7XHJcbiAgICBpc1RyZWU6IGJvb2xlYW47XHJcbiAgICBpc0VudGl0eTogYm9vbGVhbjtcclxuICAgIGlzQ3N2OiBib29sZWFuO1xyXG4gICAgaXRlbUxhYmVsTWVzc2FnZVBhcmFtczogYW55O1xyXG4gICAgY29sbGFwc2VkOiBib29sZWFuO1xyXG4gICAgbmVlZHNDb2xsYXBzZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBhcHBTZXJ2aWNlOiBBcHBTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyBmb3JtYXRTZXJ2aWNlOiBGb3JtYXRTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZUl0ZW1zID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgZW5zdXJlU2NhbGFyVmFsdWUodmFsdWU6IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKFV0aWxzLmlzRW1wdHkodmFsdWUpICYmIHRoaXMuY29sdW1uKSB7XHJcbiAgICAgICAgICAgIGlmIChBcHBTZXJ2aWNlLmlzQm9vbGVhbih0aGlzLmNvbHVtbikpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gJ21zZyNtZXRhZGF0YS5pdGVtLmVtcHR5X2Jvb2xlYW4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKEFwcFNlcnZpY2UuaXNOdW1iZXIodGhpcy5jb2x1bW4pKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICdtc2cjbWV0YWRhdGEuaXRlbS5lbXB0eV9udW1iZXInO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbHVtbikge1xyXG4gICAgICAgICAgICB0aGlzLmNvbHVtbiA9IHRoaXMuYXBwU2VydmljZS5nZXRDb2x1bW4odGhpcy5pdGVtKTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtTGFiZWxNZXNzYWdlUGFyYW1zID0ge3ZhbHVlczoge2xhYmVsOiB0aGlzLmxhYmVsfX07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmFsdWVJdGVtcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaXNUcmVlID0gISF0aGlzLmNvbHVtbiAmJiBBcHBTZXJ2aWNlLmlzVHJlZSh0aGlzLmNvbHVtbik7XHJcbiAgICAgICAgdGhpcy5pc0VudGl0eSA9ICEhdGhpcy5jb2x1bW4gJiYgQXBwU2VydmljZS5pc0VudGl0eSh0aGlzLmNvbHVtbik7XHJcbiAgICAgICAgdGhpcy5pc0NzdiA9ICEhdGhpcy5jb2x1bW4gJiYgQXBwU2VydmljZS5pc0Nzdih0aGlzLmNvbHVtbik7XHJcbiAgICAgICAgY29uc3QgdmFsdWVzID0gdGhpcy5yZWNvcmRbdGhpcy5hcHBTZXJ2aWNlLmdldENvbHVtbkFsaWFzKHRoaXMuY29sdW1uLCB0aGlzLml0ZW0pXTtcclxuICAgICAgICBpZiAodGhpcy5pc1RyZWUpIHtcclxuICAgICAgICAgICAgY29uc3QgcGF0aHM6IHN0cmluZ1tdID0gdmFsdWVzO1xyXG4gICAgICAgICAgICBpZiAocGF0aHMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcGF0aCBvZiBwYXRocykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gcGF0aC5zcGxpdChcIi9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA+IDAgJiYgcGFydHNbMF0gPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydHMuc3BsaWNlKDAsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFydHMubGVuZ3RoID4gMCAmJiBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0cy5zcGxpY2UocGFydHMubGVuZ3RoIC0gMSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW06IFRyZWVWYWx1ZUl0ZW0gPSB7dmFsdWU6IHBhdGgsIHBhcnRzOiBwYXJ0cy5tYXAodmFsdWUgPT4gKHt2YWx1ZTogdmFsdWV9KSl9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVJdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNFbnRpdHkpIHtcclxuICAgICAgICAgICAgY29uc3QgZW50aXR5SXRlbXM6IEVudGl0eUl0ZW1bXSA9IHZhbHVlcztcclxuICAgICAgICAgICAgaWYgKGVudGl0eUl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlSXRlbXMucHVzaCguLi5lbnRpdHlJdGVtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc0Nzdikge1xyXG4gICAgICAgICAgICBpZiAodmFsdWVzICYmIHZhbHVlcyBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlSXRlbXMucHVzaCguLi52YWx1ZXMubWFwPFZhbHVlSXRlbT4odmFsdWUgPT4gKHt2YWx1ZTogdmFsdWV9KSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKCFVdGlscy5pc0VtcHR5KHZhbHVlcykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVJdGVtcy5wdXNoKHt2YWx1ZTogdmFsdWVzfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5lbnN1cmVTY2FsYXJWYWx1ZSh2YWx1ZXMpO1xyXG4gICAgICAgICAgICBpZiAoIVV0aWxzLmlzRW1wdHkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlSXRlbXMucHVzaCh7dmFsdWU6IHZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgY29sbGFwc2FibGUgPSAodGhpcy5pc0VudGl0eSB8fCB0aGlzLmlzQ3N2KSAmJiAhdGhpcy5pc1RyZWU7IC8vIFRyZWUgY29sdW1ucyBhcmUgbXVsdGl2YWx1ZXMsIGFuZCB0aGVyZWZvcmUgaXNDc3Y9dHJ1ZVxyXG4gICAgICAgIGlmIChjaGFuZ2VzLmNvbGxhcHNlUm93cyB8fCB0aGlzLmNvbGxhcHNlZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkID0gY29sbGFwc2FibGUgJiYgdGhpcy5jb2xsYXBzZVJvd3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmVlZHNDb2xsYXBzZSA9IGNvbGxhcHNhYmxlICYmIHRoaXMuY29sbGFwc2VSb3dzICYmIHRoaXMudGFidWxhciAmJiB0aGlzLnZhbHVlSXRlbXMubGVuZ3RoID4gMTsgLy8gV2UgZGlzcGxheSB0aGUgY29sbGFwc2UgYnV0dG9uIGFzIHNvb24gYXMgdGhlIG51bWJlciBvZiB2YWx1ZXMgaXMgPjEgd2hpY2ggZG9lcyBub3QgdGFrZSBpbnRvIGFjY291bnQgdGhlIGFjdHVhbHkgd2lkdGggb2YgZWFjaCB2YWx1ZS4uLlxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXRlbSA9PT0gXCJhY2Nlc3NsaXN0c1wiKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5yZWNvcmQuYWNjZXNzbGlzdHMgfHwgIXRoaXMucmVjb3JkLmFjY2Vzc2xpc3RzLmFjY2Vzc0xpc3RJbmRpY2VzXHJcbiAgICAgICAgICAgICAgICB8fCB0aGlzLnJlY29yZC5hY2Nlc3NsaXN0cy5hY2Nlc3NMaXN0SW5kaWNlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy52YWx1ZUl0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXRlbUNsYXNzZXMoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgY2xhc3NlcyA9IFwic3EtdGV4dFwiO1xyXG4gICAgICAgIGlmICh0aGlzLmNsaWNrYWJsZSkge1xyXG4gICAgICAgICAgICBjbGFzc2VzICs9IFwiIHNxLWNsaWNrYWJsZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy50YWJ1bGFyKSB7XHJcbiAgICAgICAgICAgIGNsYXNzZXMgKz0gXCIgc3EtdGFidWxhclwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2xhc3NlcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGxhYmVsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwU2VydmljZS5nZXRMYWJlbCh0aGlzLml0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNBY2Nlc3NMaXN0cygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtID09PSBcImFjY2Vzc2xpc3RzXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBhY2Nlc3NMaXN0c0RhdGEoKTogRG9jdW1lbnRBY2Nlc3NMaXN0cyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjb3JkLmFjY2Vzc2xpc3RzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZG9jRm9ybWF0SWNvbkNsYXNzKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXRlbSA9PSBudWxsIHx8IHRoaXMuaXRlbSAhPT0gXCJkb2Nmb3JtYXRcIiAmJiB0aGlzLml0ZW0gIT09IFwiZmlsZWV4dFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gdGhpcy5yZWNvcmRbdGhpcy5pdGVtXTtcclxuICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImZhciBmYS1maWxlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcImZhciBmYS1maWxlIHNxLWljb24tZmlsZS1cIiArIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdChpbmRleDogbnVtYmVyLCBzdWJJbmRleCA9IDApIHtcclxuICAgICAgICBpZiAodGhpcy5pc1RyZWUpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWVJdGVtID0gPFRyZWVWYWx1ZUl0ZW0+dGhpcy52YWx1ZUl0ZW1zW2luZGV4XTtcclxuICAgICAgICAgICAgY29uc3QgcGFydHMgPSB2YWx1ZUl0ZW0ucGFydHMubWFwKChpdGVtKSA9PiBpdGVtLnZhbHVlKS5zbGljZSgwLCBzdWJJbmRleCArIDEpO1xyXG4gICAgICAgICAgICBpZiAocGFydHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcGFydHMudW5zaGlmdChcIlwiKTtcclxuICAgICAgICAgICAgICAgIHBhcnRzLnB1c2goXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IHBhcnRzLmpvaW4oXCIvXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3QuZW1pdCh7aXRlbTogdGhpcy5pdGVtLCB2YWx1ZUl0ZW06IHt2YWx1ZTogcGF0aCArIFwiKlwiLCBkaXNwbGF5OiBGYWNldFNlcnZpY2UudHJlZXBhdGhMYXN0KHBhdGgpfX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0LmVtaXQoe2l0ZW06IHRoaXMuaXRlbSwgdmFsdWVJdGVtOiB0aGlzLnZhbHVlSXRlbXNbaW5kZXhdfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gcHJldmVudCBkZWZhdWx0XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlQ29sbGFwc2UoKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsYXBzZWQgPSAhdGhpcy5jb2xsYXBzZWQ7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiIsIjxkaXYgKm5nSWY9XCIhaXNFbXB0eVwiIGNsYXNzPVwic3EtbWV0YWRhdGEtaXRlbSB7e2l0ZW1DbGFzc2VzfX1cIj5cclxuICAgIDwhLS0gSWNvbiAtLT5cclxuICAgIDxzcGFuICpuZ0lmPVwic2hvd0ljb24gJiYgISFpdGVtXCIgY2xhc3M9XCJzcS1tZXRhZGF0YS1pdGVtLWljb24gc3EtaWNvbi17e2l0ZW19fSB7e2RvY0Zvcm1hdEljb25DbGFzc319IGZhLWZ3IHByLTJcIlxyXG4gICAgICAgIFt0aXRsZV09XCJsYWJlbCB8IHNxTWVzc2FnZVwiPlxyXG4gICAgPC9zcGFuPlxyXG5cclxuICAgIDwhLS0gTGFiZWwgKHRpdGxlKS0tPlxyXG4gICAgPHNwYW4gKm5nSWY9XCJzaG93VGl0bGUgJiYgISFpdGVtXCIgY2xhc3M9XCJzcS1tZXRhZGF0YS1pdGVtLWxhYmVsIHByLTJcIj57eydtc2cjbWV0YWRhdGEuaXRlbS5sYWJlbCcgfCBzcU1lc3NhZ2U6aXRlbUxhYmVsTWVzc2FnZVBhcmFtc319PC9zcGFuPlxyXG4gICAgXHJcbiAgICA8c3BhbiBjbGFzcz1cInNxLW1ldGFkYXRhLWl0ZW0tdmFsdWVzXCIgW25nQ2xhc3NdPVwie2NvbGxhcHNlZDogISFjb2xsYXBzZWR9XCIgI3ZhbHVlcz5cclxuICAgICAgICA8IS0tIENvbGxhcHNlIGJ1dHRvbiAtLT5cclxuICAgICAgICA8YSAqbmdJZj1cImNvbGxhcHNlUm93cyAmJiBuZWVkc0NvbGxhcHNlXCIgaHJlZj1cIiNcIiAoY2xpY2spPVwidG9nZ2xlQ29sbGFwc2UoKVwiIGNsYXNzPVwiY29sbGFwc2UtYnV0dG9uIG1yLTFcIj5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZncgZmEtY2hldnJvbi17e2NvbGxhcHNlZD8gJ3JpZ2h0JyA6ICdkb3duJ319XCI+PC9pPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgICBcclxuICAgICAgICA8IS0tIEFjY2VzcyBsaXN0IG1ldGFkYXRhIC0tPlxyXG4gICAgICAgIDxzcS1tZXRhZGF0YS1hY2Nlc3MtbGlzdHMtaXRlbSAqbmdJZj1cImlzQWNjZXNzTGlzdHM7IGVsc2UgZGVmYXVsdFwiIFthY2Nlc3NMaXN0c109XCJhY2Nlc3NMaXN0c0RhdGFcIj5cclxuICAgICAgICA8L3NxLW1ldGFkYXRhLWFjY2Vzcy1saXN0cy1pdGVtPlxyXG5cclxuICAgICAgICA8IS0tIE90aGVyIHR5cGVzIG9mIG1ldGFkYXRhIC0tPlxyXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdD5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzVHJlZTsgZWxzZSBpc05vdFRyZWVcIj5cclxuICAgICAgICAgICAgICAgIDwhLS0gVHJlZSAoZGlzcGxheWVkIGFzIGJyZWFkY3J1bWJzKS0tPlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgdmFsdWVJdGVtIG9mIHZhbHVlSXRlbXM7IGxldCAkaW5kZXggPSBpbmRleFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxvbCBjbGFzcz1cImJyZWFkY3J1bWJcIiAqbmdJZj1cIiEhdmFsdWVJdGVtLnBhcnRzICYmIHZhbHVlSXRlbS5wYXJ0cy5sZW5ndGggPiAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgcGFydCBvZiB2YWx1ZUl0ZW0ucGFydHM7IGxldCAkc3ViSW5kZXggPSBpbmRleFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgICAgKm5nSWY9XCJjbGlja2FibGVcIiAgY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsXCIgW25nQ2xhc3NdPVwiJ3NxLW1ldGFkYXRhLWl0ZW0tJyArIGl0ZW1cIiBocmVmPVwiI1wiIChjbGljayk9XCJzZWxlY3QoJGluZGV4LCAkc3ViSW5kZXgpXCI+e3twYXJ0IHwgc3FWYWx1ZTpjb2x1bW59fTwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWNsaWNrYWJsZVwiIFtuZ0NsYXNzXT1cIidzcS1tZXRhZGF0YS1pdGVtLScgKyBpdGVtXCI+e3twYXJ0IHwgc3FWYWx1ZTpjb2x1bW59fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiJHN1YkluZGV4IDwgdmFsdWVJdGVtLnBhcnRzLmxlbmd0aCAtIDFcIiBjbGFzcz1cInNxLW1ldGFkYXRhLWl0ZW0tdHJlZS1ub2RlLXNlcGFyYXRvclwiPnt7J21zZyNtZXRhZGF0YS5pdGVtLnRyZWVOb2RlU2VwYXJhdG9yJyB8IHNxTWVzc2FnZX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvb2w+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIkaW5kZXggPCB2YWx1ZUl0ZW1zLmxlbmd0aCAtIDFcIiBjbGFzcz1cInNxLW1ldGFkYXRhLWl0ZW0tdHJlZS1zZXBhcmF0b3JcIj57eydtc2cjbWV0YWRhdGEuaXRlbS50cmVlU2VwYXJhdG9yJyB8IHNxTWVzc2FnZX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgICAgICAgPCEtLSBOb3QgYSBUcmVlLS0+XHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaXNOb3RUcmVlPlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNsaWNrYWJsZTsgZWxzZSBub3RUcmVlTm9uQ2xpY2thYmxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPCEtLSBDbGlja2FibGUgLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgICpuZ0Zvcj1cImxldCB2YWx1ZUl0ZW0gb2YgdmFsdWVJdGVtczsgbGV0ICRpbmRleCA9IGluZGV4XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIHt7J3NxLW1ldGFkYXRhLWl0ZW0tJyArIGl0ZW19fSBtci0xXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2hyZWZdPVwidmFsdWVJdGVtLnZhbHVlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdCgkaW5kZXgpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwic2hvd1RpdGxlPyBudWxsIDogKGxhYmVsIHwgc3FNZXNzYWdlKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiPnt7dmFsdWVJdGVtIHwgc3FWYWx1ZTpjb2x1bW59fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cInNob3dDb3VudHMgJiYgdmFsdWVJdGVtLmNvdW50XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiY291bnRlciBiYWRnZSBiYWRnZS1saWdodCBtbC0xXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aXRsZV09XCJ2YWx1ZUl0ZW0uY291bnQgKyAnIG9jY3VycmVuY2VzIGluIGRvY3VtZW50J1wiPnt7dmFsdWVJdGVtLmNvdW50fX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG5cclxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNub3RUcmVlTm9uQ2xpY2thYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgIDwhLS0gTm90IGNsaWNrYWJsZSAtLT5cclxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCB2YWx1ZUl0ZW0gb2YgdmFsdWVJdGVtczsgbGV0ICRpbmRleCA9IGluZGV4XCI+ICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ7eydzcS1tZXRhZGF0YS1pdGVtLScgKyBpdGVtfX1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwic2hvd1RpdGxlPyBudWxsIDogKGxhYmVsIHwgc3FNZXNzYWdlKVwiPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcS1zaG93bW9yZSBbcXVlc3Rpb25dPVwidmFsdWVJdGVtLnZhbHVlXCI+PC9zcS1zaG93bW9yZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0ge3t2YWx1ZUl0ZW0gfCBzcVZhbHVlOmNvbHVtbn19IC0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93Q291bnRzICYmIHZhbHVlSXRlbS5jb3VudFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJzbWFsbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RpdGxlXT1cInZhbHVlSXRlbS5jb3VudCArICcgb2NjdXJyZW5jZXMgaW4gZG9jdW1lbnQnXCI+KHt7dmFsdWVJdGVtLmNvdW50fX0pPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiJGluZGV4IDwgdmFsdWVJdGVtcy5sZW5ndGggLSAxXCIgY2xhc3M9XCJzcS1tZXRhZGF0YS1pdGVtLWxpc3Qtc2VwYXJhdG9yXCI+e3snbXNnI21ldGFkYXRhLml0ZW0ubGlzdFNlcGFyYXRvcicgfCBzcU1lc3NhZ2V9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDwvc3Bhbj5cclxuPC9kaXY+Il19