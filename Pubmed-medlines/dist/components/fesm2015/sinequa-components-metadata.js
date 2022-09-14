import { ɵɵelementStart, ɵɵtext, ɵɵelementEnd, ɵɵadvance, ɵɵtextInterpolate, ɵɵtemplate, ɵɵnextContext, ɵɵproperty, ɵɵdefineComponent, ɵɵpipe, ɵɵlistener, ɵɵelement, ɵɵtextInterpolate1, ɵɵpipeBind2, ɵɵpureFunction1, ɵsetClassMetadata, Component, Input, ɵɵpropertyInterpolate, ɵɵpipeBind1, ɵɵelementContainerStart, ɵɵelementContainerEnd, ɵɵsanitizeHtml, ɵɵgetCurrentView, ɵɵrestoreView, ɵɵclassMapInterpolate2, ɵɵclassMapInterpolate1, ɵɵsanitizeUrl, ɵɵattribute, ɵɵclassMap, ɵɵtemplateRefExtractor, ɵɵreference, EventEmitter, ɵɵdirectiveInject, ɵɵhostProperty, ɵɵNgOnChangesFeature, Output, HostBinding, ɵɵclassProp, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { AppService, FormatService } from '@sinequa/core/app-utils';
import { SearchService } from '@sinequa/components/search';
import { NgForOf, NgIf, NgClass, CommonModule } from '@angular/common';
import { Utils } from '@sinequa/core/base';
import { FacetService, enFacet, frFacet, deFacet } from '@sinequa/components/facet';
import { CollapseButton, Collapse, CollapseModule, enCollapse, frCollapse, deCollapse } from '@sinequa/components/collapse';
import { MessagePipe, IntlModule } from '@sinequa/core/intl';
import { ValuePipe, UtilsModule } from '@sinequa/components/utils';

function MetadataAccessListsItemSingleAccessList_ng_template_6_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 7);
    ɵɵelementStart(1, "div", 8);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵelementStart(3, "div", 9);
    ɵɵtext(4, " | ");
    ɵɵelementEnd();
    ɵɵelementStart(5, "div", 10);
    ɵɵtext(6);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const principal_r2 = ctx.$implicit;
    ɵɵadvance(2);
    ɵɵtextInterpolate(principal_r2.domain);
    ɵɵadvance(4);
    ɵɵtextInterpolate(principal_r2.id);
} }
function MetadataAccessListsItemSingleAccessList_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 4);
    ɵɵelementStart(1, "div", 5);
    ɵɵtemplate(2, MetadataAccessListsItemSingleAccessList_ng_template_6_div_2_Template, 7, 2, "div", 6);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r0.accessList);
} }
const _c0 = function (a0) { return { value: a0 }; };
const _c1 = function (a0) { return { values: a0 }; };
class MetadataAccessListsItemSingleAccessList {
    constructor() {
        this.collapsed = true;
    }
    get headerMessage() {
        return "msg#metadata.accessLists." + (this.authorized ? "authorizedListHeader" : "deniedListHeader");
    }
    collapseClick(event) {
        this.collapsed = !this.collapsed;
        event.preventDefault();
    }
}
MetadataAccessListsItemSingleAccessList.ɵfac = function MetadataAccessListsItemSingleAccessList_Factory(t) { return new (t || MetadataAccessListsItemSingleAccessList)(); };
MetadataAccessListsItemSingleAccessList.ɵcmp = ɵɵdefineComponent({ type: MetadataAccessListsItemSingleAccessList, selectors: [["sq-metadata-access-lists-item-single-access-list"]], inputs: { authorized: "authorized", index: "index", accessList: "accessList" }, decls: 7, vars: 10, consts: [[1, "accessListHeader"], ["href", "#", 3, "click"], [1, "collapseButton", 3, "collapsed"], [3, "collapsed"], [1, "accessListBody"], [1, "principalList"], ["class", "principal", 4, "ngFor", "ngForOf"], [1, "principal"], [1, "domain"], [1, "separator"], [1, "id"]], template: function MetadataAccessListsItemSingleAccessList_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtext(1);
        ɵɵpipe(2, "sqMessage");
        ɵɵelementStart(3, "a", 1);
        ɵɵlistener("click", function MetadataAccessListsItemSingleAccessList_Template_a_click_3_listener($event) { return ctx.collapseClick($event); });
        ɵɵelement(4, "sq-collapse-button", 2);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(5, "sq-collapse", 3);
        ɵɵtemplate(6, MetadataAccessListsItemSingleAccessList_ng_template_6_Template, 3, 1, "ng-template");
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵtextInterpolate1(" ", ɵɵpipeBind2(2, 3, ctx.headerMessage, ɵɵpureFunction1(8, _c1, ɵɵpureFunction1(6, _c0, ctx.index))), " ");
        ɵɵadvance(3);
        ɵɵproperty("collapsed", ctx.collapsed);
        ɵɵadvance(1);
        ɵɵproperty("collapsed", ctx.collapsed);
    } }, directives: [CollapseButton, Collapse, NgForOf], pipes: [MessagePipe], styles: [".collapseButton[_ngcontent-%COMP%]{float:right}.principalList[_ngcontent-%COMP%]{display:table}.principal[_ngcontent-%COMP%]{display:table-row}.domain[_ngcontent-%COMP%], .id[_ngcontent-%COMP%], .separator[_ngcontent-%COMP%]{display:table-cell}.separator[_ngcontent-%COMP%]{padding-left:.25em;padding-right:.25em}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(MetadataAccessListsItemSingleAccessList, [{
        type: Component,
        args: [{
                selector: "sq-metadata-access-lists-item-single-access-list",
                templateUrl: "./metadata-access-lists-item-single-access-list.html",
                styleUrls: ["./metadata-access-lists-item-single-access-list.css"]
            }]
    }], null, { authorized: [{
            type: Input
        }], index: [{
            type: Input
        }], accessList: [{
            type: Input
        }] }); })();

function MetadataAccessListsItem_ng_container_0_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵelement(1, "div", 3);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementStart(3, "div", 4);
    ɵɵelement(4, "sq-metadata-access-lists-item-single-access-list", 5);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const i_r1 = ɵɵnextContext().$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(2, 4, "msg#metadata.accessLists.authorizedListTitleText"));
    ɵɵadvance(3);
    ɵɵproperty("authorized", true)("index", i_r1)("accessList", ctx_r2.accessLists.authorizedLists[i_r1]);
} }
function MetadataAccessListsItem_ng_container_0_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵelement(1, "div", 6);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementStart(3, "div", 4);
    ɵɵelement(4, "sq-metadata-access-lists-item-single-access-list", 5);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const i_r1 = ɵɵnextContext().$implicit;
    const ctx_r3 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(2, 4, "msg#metadata.accessLists.deniedListTitleText"));
    ɵɵadvance(3);
    ɵɵproperty("authorized", false)("index", i_r1)("accessList", ctx_r3.accessLists.deniedLists[i_r1]);
} }
function MetadataAccessListsItem_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MetadataAccessListsItem_ng_container_0_div_1_Template, 5, 6, "div", 1);
    ɵɵtemplate(2, MetadataAccessListsItem_ng_container_0_div_2_Template, 5, 6, "div", 1);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const i_r1 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.accessLists.authorizedLists[i_r1]);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.accessLists.deniedLists[i_r1]);
} }
class MetadataAccessListsItem {
}
MetadataAccessListsItem.ɵfac = function MetadataAccessListsItem_Factory(t) { return new (t || MetadataAccessListsItem)(); };
MetadataAccessListsItem.ɵcmp = ɵɵdefineComponent({ type: MetadataAccessListsItem, selectors: [["sq-metadata-access-lists-item"]], inputs: { accessLists: "accessLists" }, decls: 1, vars: 1, consts: [[4, "ngFor", "ngForOf"], ["class", "accessList", 4, "ngIf"], [1, "accessList"], [1, "accessListIcon", "authorizedListIcon", "far", "fa-check-circle", 3, "title"], [1, "accessListValue"], [3, "authorized", "index", "accessList"], [1, "accessListIcon", "deniedListIcon", "fas", "fa-minus-circle", 3, "title"]], template: function MetadataAccessListsItem_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, MetadataAccessListsItem_ng_container_0_Template, 3, 2, "ng-container", 0);
    } if (rf & 2) {
        ɵɵproperty("ngForOf", ctx.accessLists.accessListIndices);
    } }, directives: [NgForOf, NgIf, MetadataAccessListsItemSingleAccessList], pipes: [MessagePipe], styles: [".accessList[_ngcontent-%COMP%]{display:table-row}.accessListIcon[_ngcontent-%COMP%], .accessListValue[_ngcontent-%COMP%]{display:table-cell}.accessListValue[_ngcontent-%COMP%]{padding-left:.5em;width:99%}.authorizedListIcon[_ngcontent-%COMP%]{color:green}.deniedListIcon[_ngcontent-%COMP%]{color:red}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(MetadataAccessListsItem, [{
        type: Component,
        args: [{
                selector: "sq-metadata-access-lists-item",
                templateUrl: "./metadata-access-lists-item.html",
                styleUrls: ["./metadata-access-lists-item.css"]
            }]
    }], null, { accessLists: [{
            type: Input
        }] }); })();

function Showmore_span_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span", 2);
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("innerHTML", ctx_r0.shortQuestion, ɵɵsanitizeHtml);
} }
function Showmore_span_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span", 2);
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("innerHTML", ctx_r1.longQuestion, ɵɵsanitizeHtml);
} }
function Showmore_span_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 3);
    ɵɵlistener("click", function Showmore_span_2_Template_span_click_0_listener($event) { ɵɵrestoreView(_r4); const ctx_r3 = ɵɵnextContext(); return ctx_r3.showMore($event); });
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ctx_r2.isShowMore ? "show less" : "show more", "");
} }
class Showmore {
    constructor() {
        this.isShowMore = false;
        this.isBigQuestion = false;
    }
    ngOnInit() {
        this.longQuestion = this.question;
        // this.searchTextArray.forEach(element => {
        //     const re = new RegExp(element, "gi");
        //     this.longQuestion = this.longQuestion.replace(re,
        //         '<span class="highlighted">' + element + "</span>"
        //     );
        // });
        if (this.question.length > 300) {
            this.isBigQuestion = true;
            this.shortQuestion = this.question.substring(0, 400) + "...";
            // this.searchTextArray.forEach(element => {
            //     const re = new RegExp(element, "gi");
            //     this.shortQuestion = this.shortQuestion.replace(re, '<span class="highlighted">' + element + "</span>");
            // });
            this.display = this.shortQuestion;
        }
        else {
            this.display = this.longQuestion;
        }
    }
    showMore(event) {
        event.stopPropagation();
        this.isShowMore = !this.isShowMore;
        if (this.isShowMore)
            this.display = this.longQuestion;
        else
            this.display = this.shortQuestion;
    }
}
Showmore.ɵfac = function Showmore_Factory(t) { return new (t || Showmore)(); };
Showmore.ɵcmp = ɵɵdefineComponent({ type: Showmore, selectors: [["sq-showmore"]], inputs: { question: "question" }, decls: 3, vars: 3, consts: [[3, "innerHTML", 4, "ngIf"], ["class", "showMore", 3, "click", 4, "ngIf"], [3, "innerHTML"], [1, "showMore", 3, "click"]], template: function Showmore_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, Showmore_span_0_Template, 1, 1, "span", 0);
        ɵɵtemplate(1, Showmore_span_1_Template, 1, 1, "span", 0);
        ɵɵtemplate(2, Showmore_span_2_Template, 2, 1, "span", 1);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !ctx.isShowMore);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.isShowMore || !ctx.isBigQuestion);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.isBigQuestion);
    } }, directives: [NgIf], styles: [".showMore[_ngcontent-%COMP%]{color:#00f;cursor:pointer}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(Showmore, [{
        type: Component,
        args: [{
                selector: 'sq-showmore',
                templateUrl: './showmore.html',
                styleUrls: ['./showmore.scss'],
            }]
    }], function () { return []; }, { question: [{
            type: Input
        }] }); })();

function MetadataItem_div_0_span_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span", 8);
    ɵɵpipe(1, "sqMessage");
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMapInterpolate2("sq-metadata-item-icon sq-icon-", ctx_r1.item, " ", ctx_r1.docFormatIconClass, " fa-fw pr-2");
    ɵɵproperty("title", ɵɵpipeBind1(1, 5, ctx_r1.label));
} }
function MetadataItem_div_0_span_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 9);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind2(2, 1, "msg#metadata.item.label", ctx_r2.itemLabelMessageParams));
} }
function MetadataItem_div_0_a_5_Template(rf, ctx) { if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 10);
    ɵɵlistener("click", function MetadataItem_div_0_a_5_Template_a_click_0_listener() { ɵɵrestoreView(_r9); const ctx_r8 = ɵɵnextContext(2); return ctx_r8.toggleCollapse(); });
    ɵɵelement(1, "i");
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵclassMapInterpolate1("fas fa-fw fa-chevron-", ctx_r4.collapsed ? "right" : "down", "");
} }
function MetadataItem_div_0_sq_metadata_access_lists_item_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "sq-metadata-access-lists-item", 11);
} if (rf & 2) {
    const ctx_r5 = ɵɵnextContext(2);
    ɵɵproperty("accessLists", ctx_r5.accessListsData);
} }
function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r26 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 21);
    ɵɵlistener("click", function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_a_1_Template_a_click_0_listener() { ɵɵrestoreView(_r26); const $subIndex_r20 = ɵɵnextContext().index; const $index_r15 = ɵɵnextContext(2).index; const ctx_r24 = ɵɵnextContext(4); return ctx_r24.select($index_r15, $subIndex_r20); });
    ɵɵtext(1);
    ɵɵpipe(2, "sqValue");
    ɵɵelementEnd();
} if (rf & 2) {
    const part_r19 = ɵɵnextContext().$implicit;
    const ctx_r21 = ɵɵnextContext(6);
    ɵɵproperty("ngClass", "sq-metadata-item-" + ctx_r21.item);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind2(2, 2, part_r19, ctx_r21.column));
} }
function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_span_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 22);
    ɵɵtext(1);
    ɵɵpipe(2, "sqValue");
    ɵɵelementEnd();
} if (rf & 2) {
    const part_r19 = ɵɵnextContext().$implicit;
    const ctx_r22 = ɵɵnextContext(6);
    ɵɵproperty("ngClass", "sq-metadata-item-" + ctx_r22.item);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind2(2, 2, part_r19, ctx_r22.column));
} }
function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_span_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 23);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, "msg#metadata.item.treeNodeSeparator"));
} }
function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "li");
    ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_a_1_Template, 3, 5, "a", 18);
    ɵɵtemplate(2, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_span_2_Template, 3, 5, "span", 19);
    ɵɵtemplate(3, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_span_3_Template, 3, 3, "span", 20);
    ɵɵelementEnd();
} if (rf & 2) {
    const $subIndex_r20 = ctx.index;
    const valueItem_r14 = ɵɵnextContext(2).$implicit;
    const ctx_r18 = ɵɵnextContext(4);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r18.clickable);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r18.clickable);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", $subIndex_r20 < valueItem_r14.parts.length - 1);
} }
function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "ol", 17);
    ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_li_1_Template, 4, 3, "li", 14);
    ɵɵelementEnd();
} if (rf & 2) {
    const valueItem_r14 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", valueItem_r14.parts);
} }
function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_span_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 24);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, "msg#metadata.item.treeSeparator"));
} }
function MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_ol_1_Template, 2, 1, "ol", 15);
    ɵɵtemplate(2, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_span_2_Template, 3, 3, "span", 16);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const valueItem_r14 = ctx.$implicit;
    const $index_r15 = ctx.index;
    const ctx_r13 = ɵɵnextContext(4);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !!valueItem_r14.parts && valueItem_r14.parts.length > 0);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", $index_r15 < ctx_r13.valueItems.length - 1);
} }
function MetadataItem_div_0_ng_template_7_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_container_0_ng_container_1_Template, 3, 2, "ng-container", 14);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r10 = ɵɵnextContext(3);
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r10.valueItems);
} }
function MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_a_1_span_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 29);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const valueItem_r36 = ɵɵnextContext().$implicit;
    ɵɵproperty("title", valueItem_r36.count + " occurrences in document");
    ɵɵadvance(1);
    ɵɵtextInterpolate(valueItem_r36.count);
} }
function MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r41 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 27);
    ɵɵlistener("click", function MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_a_1_Template_a_click_0_listener() { ɵɵrestoreView(_r41); const $index_r37 = ctx.index; const ctx_r40 = ɵɵnextContext(5); return ctx_r40.select($index_r37); });
    ɵɵpipe(1, "sqMessage");
    ɵɵtext(2);
    ɵɵpipe(3, "sqValue");
    ɵɵtemplate(4, MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_a_1_span_4_Template, 2, 2, "span", 28);
    ɵɵelementEnd();
} if (rf & 2) {
    const valueItem_r36 = ctx.$implicit;
    const ctx_r35 = ɵɵnextContext(5);
    ɵɵclassMapInterpolate1("badge badge-pill ", "sq-metadata-item-" + ctx_r35.item, " mr-1");
    ɵɵproperty("href", valueItem_r36.value, ɵɵsanitizeUrl);
    ɵɵattribute("title", ctx_r35.showTitle ? null : ɵɵpipeBind1(1, 7, ctx_r35.label));
    ɵɵadvance(2);
    ɵɵtextInterpolate1("", ɵɵpipeBind2(3, 9, valueItem_r36, ctx_r35.column), " ");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r35.showCounts && valueItem_r36.count);
} }
function MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_a_1_Template, 5, 12, "a", 26);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r32 = ɵɵnextContext(4);
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r32.valueItems);
} }
function MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_ng_container_0_span_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 33);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const valueItem_r43 = ɵɵnextContext().$implicit;
    ɵɵproperty("title", valueItem_r43.count + " occurrences in document");
    ɵɵadvance(1);
    ɵɵtextInterpolate1("(", valueItem_r43.count, ")");
} }
function MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_ng_container_0_span_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 34);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, "msg#metadata.item.listSeparator"));
} }
function MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "span");
    ɵɵpipe(2, "sqMessage");
    ɵɵelement(3, "sq-showmore", 30);
    ɵɵtemplate(4, MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_ng_container_0_span_4_Template, 2, 2, "span", 31);
    ɵɵelementEnd();
    ɵɵtemplate(5, MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_ng_container_0_span_5_Template, 3, 3, "span", 32);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const valueItem_r43 = ctx.$implicit;
    const $index_r44 = ctx.index;
    const ctx_r42 = ɵɵnextContext(5);
    ɵɵadvance(1);
    ɵɵclassMap("sq-metadata-item-" + ctx_r42.item);
    ɵɵattribute("title", ctx_r42.showTitle ? null : ɵɵpipeBind1(2, 7, ctx_r42.label));
    ɵɵadvance(2);
    ɵɵproperty("question", valueItem_r43.value);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r42.showCounts && valueItem_r43.count);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", $index_r44 < ctx_r42.valueItems.length - 1);
} }
function MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵtemplate(0, MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_ng_container_0_Template, 6, 9, "ng-container", 14);
} if (rf & 2) {
    const ctx_r34 = ɵɵnextContext(4);
    ɵɵproperty("ngForOf", ctx_r34.valueItems);
} }
function MetadataItem_div_0_ng_template_7_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵtemplate(0, MetadataItem_div_0_ng_template_7_ng_template_1_ng_container_0_Template, 2, 1, "ng-container", 12);
    ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_template_1_ng_template_1_Template, 1, 1, "ng-template", null, 25, ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const _r33 = ɵɵreference(2);
    const ctx_r12 = ɵɵnextContext(3);
    ɵɵproperty("ngIf", ctx_r12.clickable)("ngIfElse", _r33);
} }
function MetadataItem_div_0_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    ɵɵtemplate(0, MetadataItem_div_0_ng_template_7_ng_container_0_Template, 2, 1, "ng-container", 12);
    ɵɵtemplate(1, MetadataItem_div_0_ng_template_7_ng_template_1_Template, 3, 2, "ng-template", null, 13, ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const _r11 = ɵɵreference(2);
    const ctx_r7 = ɵɵnextContext(2);
    ɵɵproperty("ngIf", ctx_r7.isTree)("ngIfElse", _r11);
} }
const _c0$1 = function (a0) { return { collapsed: a0 }; };
function MetadataItem_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtemplate(1, MetadataItem_div_0_span_1_Template, 2, 7, "span", 1);
    ɵɵtemplate(2, MetadataItem_div_0_span_2_Template, 3, 4, "span", 2);
    ɵɵelementStart(3, "span", 3, 4);
    ɵɵtemplate(5, MetadataItem_div_0_a_5_Template, 2, 3, "a", 5);
    ɵɵtemplate(6, MetadataItem_div_0_sq_metadata_access_lists_item_6_Template, 1, 1, "sq-metadata-access-lists-item", 6);
    ɵɵtemplate(7, MetadataItem_div_0_ng_template_7_Template, 3, 2, "ng-template", null, 7, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const _r6 = ɵɵreference(8);
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMapInterpolate1("sq-metadata-item ", ctx_r0.itemClasses, "");
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.showIcon && !!ctx_r0.item);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.showTitle && !!ctx_r0.item);
    ɵɵadvance(1);
    ɵɵproperty("ngClass", ɵɵpureFunction1(9, _c0$1, !!ctx_r0.collapsed));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r0.collapseRows && ctx_r0.needsCollapse);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.isAccessLists)("ngIfElse", _r6);
} }
class MetadataItem {
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
MetadataItem.ɵfac = function MetadataItem_Factory(t) { return new (t || MetadataItem)(ɵɵdirectiveInject(AppService), ɵɵdirectiveInject(FormatService)); };
MetadataItem.ɵcmp = ɵɵdefineComponent({ type: MetadataItem, selectors: [["sq-metadata-item"]], hostVars: 1, hostBindings: function MetadataItem_HostBindings(rf, ctx) { if (rf & 2) {
        ɵɵhostProperty("hidden", ctx.hidden);
    } }, inputs: { record: "record", item: "item", showTitle: "showTitle", showIcon: "showIcon", showCounts: "showCounts", clickable: "clickable", tabular: "tabular", collapseRows: "collapseRows" }, outputs: { _select: "select" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "class", 4, "ngIf"], [3, "class", "title", 4, "ngIf"], ["class", "sq-metadata-item-label pr-2", 4, "ngIf"], [1, "sq-metadata-item-values", 3, "ngClass"], ["values", ""], ["href", "#", "class", "collapse-button mr-1", 3, "click", 4, "ngIf"], [3, "accessLists", 4, "ngIf", "ngIfElse"], ["default", ""], [3, "title"], [1, "sq-metadata-item-label", "pr-2"], ["href", "#", 1, "collapse-button", "mr-1", 3, "click"], [3, "accessLists"], [4, "ngIf", "ngIfElse"], ["isNotTree", ""], [4, "ngFor", "ngForOf"], ["class", "breadcrumb", 4, "ngIf"], ["class", "sq-metadata-item-tree-separator", 4, "ngIf"], [1, "breadcrumb"], ["class", "badge badge-pill", "href", "#", 3, "ngClass", "click", 4, "ngIf"], [3, "ngClass", 4, "ngIf"], ["class", "sq-metadata-item-tree-node-separator", 4, "ngIf"], ["href", "#", 1, "badge", "badge-pill", 3, "ngClass", "click"], [3, "ngClass"], [1, "sq-metadata-item-tree-node-separator"], [1, "sq-metadata-item-tree-separator"], ["notTreeNonClickable", ""], ["target", "_blank", 3, "class", "href", "click", 4, "ngFor", "ngForOf"], ["target", "_blank", 3, "href", "click"], ["class", "counter badge badge-light ml-1", 3, "title", 4, "ngIf"], [1, "counter", "badge", "badge-light", "ml-1", 3, "title"], [3, "question"], ["class", "small", 3, "title", 4, "ngIf"], ["class", "sq-metadata-item-list-separator", 4, "ngIf"], [1, "small", 3, "title"], [1, "sq-metadata-item-list-separator"]], template: function MetadataItem_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, MetadataItem_div_0_Template, 9, 11, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !ctx.isEmpty);
    } }, directives: [NgIf, NgClass, MetadataAccessListsItem, NgForOf, Showmore], pipes: [MessagePipe, ValuePipe], styles: [".sq-metadata-item-label[_ngcontent-%COMP%]{white-space:nowrap;width:1px}.sq-metadata-item-values[_ngcontent-%COMP%]{max-height:15rem;overflow:hidden;transition:max-height .2s ease-in-out}.sq-metadata-item-values[_ngcontent-%COMP%]   .breadcrumb[_ngcontent-%COMP%]{background-color:inherit;display:inline;padding:0}.sq-metadata-item-values[_ngcontent-%COMP%]   .breadcrumb[_ngcontent-%COMP%]:after, .sq-metadata-item-values[_ngcontent-%COMP%]   .breadcrumb[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{display:inline}.sq-metadata-item-values[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%]{font-size:83%}.sq-metadata-item-values.collapsed[_ngcontent-%COMP%]{display:block;max-height:1.5rem}.sq-metadata-item-values[_ngcontent-%COMP%]   .collapse-button[_ngcontent-%COMP%]{font-size:.9rem}.sq-metadata-item.sq-tabular[_ngcontent-%COMP%]{display:table-row}.sq-metadata-item.sq-tabular[_ngcontent-%COMP%]   .sq-metadata-item-icon[_ngcontent-%COMP%], .sq-metadata-item.sq-tabular[_ngcontent-%COMP%]   .sq-metadata-item-label[_ngcontent-%COMP%]{display:table-cell}.sq-metadata-item[_ngcontent-%COMP%]:not(.sq-tabular), .sq-metadata-item[_ngcontent-%COMP%]:not(.sq-tabular)   .sq-metadata-item-label[_ngcontent-%COMP%], .sq-metadata-item[_ngcontent-%COMP%]:not(.sq-tabular)   .sq-metadata-item-values[_ngcontent-%COMP%]{display:inline}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(MetadataItem, [{
        type: Component,
        args: [{
                selector: "sq-metadata-item",
                templateUrl: "./metadata-item.html",
                styleUrls: ['./metadata-item.scss']
            }]
    }], function () { return [{ type: AppService }, { type: FormatService }]; }, { record: [{
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

function Metadata_sq_metadata_item_0_span_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 3);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, "msg#metadata.item.separator"));
} }
function Metadata_sq_metadata_item_0_Template(rf, ctx) { if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "sq-metadata-item", 1);
    ɵɵlistener("select", function Metadata_sq_metadata_item_0_Template_sq_metadata_item_select_0_listener($event) { ɵɵrestoreView(_r5); const ctx_r4 = ɵɵnextContext(); return ctx_r4.select($event.item, $event.valueItem); });
    ɵɵtemplate(1, Metadata_sq_metadata_item_0_span_1_Template, 3, 3, "span", 2);
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const $index_r2 = ctx.index;
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("record", ctx_r0.record)("item", item_r1)("showTitle", ctx_r0.showTitles)("showIcon", ctx_r0.showIcons)("showCounts", ctx_r0.showCounts)("clickable", ctx_r0.clickable)("tabular", ctx_r0.tabular)("collapseRows", ctx_r0.collapseRows);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r0.tabular && $index_r2 < ctx_r0.items.length - 1);
} }
class Metadata {
    constructor(appService, searchService) {
        this.appService = appService;
        this.searchService = searchService;
        this.showTitles = true;
        this.showIcons = false;
        this.showCounts = true;
        this.clickable = true;
        this.tabular = true;
        this.collapseRows = true;
        this.searchOnClick = true;
        this._select = new EventEmitter();
    }
    select(item, valueItem) {
        if (this.searchOnClick) {
            this.searchService.addFieldSelect(item, valueItem);
            this.searchService.search();
        }
        this._select.emit({ item: item, valueItem: valueItem });
    }
}
Metadata.ɵfac = function Metadata_Factory(t) { return new (t || Metadata)(ɵɵdirectiveInject(AppService), ɵɵdirectiveInject(SearchService)); };
Metadata.ɵcmp = ɵɵdefineComponent({ type: Metadata, selectors: [["sq-metadata"]], hostVars: 2, hostBindings: function Metadata_HostBindings(rf, ctx) { if (rf & 2) {
        ɵɵclassProp("sq-tabular", ctx.tabular);
    } }, inputs: { record: "record", items: "items", showTitles: "showTitles", showIcons: "showIcons", showCounts: "showCounts", clickable: "clickable", tabular: "tabular", collapseRows: "collapseRows", searchOnClick: "searchOnClick" }, outputs: { _select: "select" }, decls: 1, vars: 1, consts: [[3, "record", "item", "showTitle", "showIcon", "showCounts", "clickable", "tabular", "collapseRows", "select", 4, "ngFor", "ngForOf"], [3, "record", "item", "showTitle", "showIcon", "showCounts", "clickable", "tabular", "collapseRows", "select"], ["class", "ml-1 mr-2", 4, "ngIf"], [1, "ml-1", "mr-2"]], template: function Metadata_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, Metadata_sq_metadata_item_0_Template, 2, 9, "sq-metadata-item", 0);
    } if (rf & 2) {
        ɵɵproperty("ngForOf", ctx.items);
    } }, directives: [NgForOf, MetadataItem, NgIf], pipes: [MessagePipe], styles: [".sq-tabular[_nghost-%COMP%]{display:table}.sq-tabular[_nghost-%COMP%]   sq-metadata-item[_ngcontent-%COMP%]{display:table-row-group}[_nghost-%COMP%]:not(.sq-tabular){display:block}[_nghost-%COMP%]:not(.sq-tabular)   sq-metadata-item[_ngcontent-%COMP%]{display:inline}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(Metadata, [{
        type: Component,
        args: [{
                selector: "sq-metadata",
                templateUrl: "./metadata.html",
                styleUrls: ["./metadata.scss"]
            }]
    }], function () { return [{ type: AppService }, { type: SearchService }]; }, { record: [{
            type: Input
        }], items: [{
            type: Input
        }], showTitles: [{
            type: Input
        }], showIcons: [{
            type: Input
        }], showCounts: [{
            type: Input
        }], clickable: [{
            type: Input
        }], tabular: [{
            type: HostBinding,
            args: ["class.sq-tabular"]
        }, {
            type: Input
        }], collapseRows: [{
            type: Input
        }], searchOnClick: [{
            type: Input
        }], _select: [{
            type: Output,
            args: ["select"]
        }] }); })();

class MetadataModule {
}
MetadataModule.ɵmod = ɵɵdefineNgModule({ type: MetadataModule });
MetadataModule.ɵinj = ɵɵdefineInjector({ factory: function MetadataModule_Factory(t) { return new (t || MetadataModule)(); }, imports: [[
            CommonModule,
            IntlModule,
            UtilsModule,
            CollapseModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(MetadataModule, { declarations: [Metadata, MetadataItem, Showmore,
        MetadataAccessListsItem, MetadataAccessListsItemSingleAccessList], imports: [CommonModule,
        IntlModule,
        UtilsModule,
        CollapseModule], exports: [Metadata, MetadataItem, Showmore] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(MetadataModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    IntlModule,
                    UtilsModule,
                    CollapseModule,
                ],
                declarations: [
                    Metadata, MetadataItem, Showmore,
                    MetadataAccessListsItem, MetadataAccessListsItemSingleAccessList
                ],
                exports: [
                    Metadata, MetadataItem, Showmore
                ],
            }]
    }], null, null); })();

var _enMetadata = {
    metadata: {
        extractslocationsLabel: "Relevant extract",
        extractslocationsPluralLabel: "Relevant extracts",
        geoLabel: "Place",
        geoPluralLabel: "Places",
        personLabel: "Person",
        personPluralLabel: "People",
        companyLabel: "Company",
        companyPluralLabel: "Companies",
        treepathLabel: "Source",
        treepathPluralLabel: "Sources",
        matchlocationsLabel: "Search term",
        matchlocationsPluralLabel: "Search terms",
        titleLabel: "Title",
        titlePluralLabel: "Titles",
        authorsLabel: "Author",
        authorsPluralLabel: "Authors",
        filenameLabel: "Filename",
        filenamePluralLabel: "Filenames",
        modifiedLabel: "Date",
        modifiedPluralLabel: "Dates",
        sizeLabel: "Size",
        sizePluralLabel: "Sizes",
        docformatLabel: "Format",
        docformatPluralLabel: "Formats",
        documentlanguagesLabel: "Language",
        documentlanguagesPluralLabel: "Languages",
        geo_label: "Place",
        geo_plural_label: "Places",
        person_label: "Person",
        person_plural_label: "People",
        company_label: "Company",
        company_plural_label: "Companies",
        treepath_label: "Source",
        treepath_plural_label: "Sources",
        title_label: "Title",
        title_plural_label: "Titles",
        authors_label: "Author",
        authors_plural_label: "Authors",
        filename_label: "Filename",
        filename_plural_label: "Filenames",
        modified_label: "Date",
        modified_plural_label: "Dates",
        size_label: "Size",
        size_plural_label: "Sizes",
        docformat_label: "Format",
        docformat_plural_label: "Formats",
        documentlanguages_label: "Language",
        documentlanguages_plural_label: "Languages",
        accessLists: {
            authorizedListTitleText: "Authorized access list",
            authorizedListHeader: "Authorized access list {value, number}",
            deniedListTitleText: "Denied access list",
            deniedListHeader: "Denied access list {value, number}"
        },
        item: {
            label: "{label}:",
            separator: "|",
            treeSeparator: " ; ",
            treeNodeSeparator: "/",
            listSeparator: ", ",
            empty_boolean: 'false',
            empty_number: '0'
        }
    },
};

var _frMetadata = {
    metadata: {
        extractslocationsLabel: "Extrait pertinent",
        extractslocationsPluralLabel: "Extraits pertinents",
        geoLabel: "Lieu",
        geoPluralLabel: "Lieux",
        personLabel: "Personne",
        personPluralLabel: "Personnes",
        companyLabel: "Société",
        companyPluralLabel: "Sociétés",
        treepathLabel: "Source",
        treepathPluralLabel: "Sources",
        matchlocationsLabel: "Terme recherché",
        matchlocationsPluralLabel: "Termes recherchés",
        titleLabel: "Titre",
        titlePluralLabel: "Titres",
        authorsLabel: "Auteur",
        authorsPluralLabel: "Auteurs",
        filenameLabel: "Nom de fichier",
        filenamePluralLabel: "Noms de fichiers",
        modifiedLabel: "Date",
        modifiedPluralLabel: "Dates",
        sizeLabel: "Taille",
        sizePluralLabel: "Tailles",
        docformatLabel: "Format",
        docformatPluralLabel: "Formats",
        documentlanguagesLabel: "Langue",
        documentlanguagesPluralLabel: "Langues",
        geo_label: "Lieu",
        geo_plural_label: "Lieux",
        person_label: "Personne",
        person_plural_label: "Personnes",
        company_label: "Société",
        company_plural_label: "Sociétés",
        treepath_label: "Source",
        treepath_plural_label: "Sources",
        title_label: "Titre",
        title_plural_label: "Titres",
        authors_label: "Auteur",
        authors_plural_label: "Auteurs",
        filename_label: "Nom de fichier",
        filename_plural_label: "Noms de fichiers",
        modified_label: "Date",
        modified_plural_label: "Dates",
        size_label: "Taille",
        size_plural_label: "Tailles",
        docformat_label: "Format",
        docformat_plural_label: "Formats",
        documentlanguages_label: "Langue",
        documentlanguages_plural_label: "Langues",
        accessLists: {
            authorizedListTitleText: "Accès autorisés",
            authorizedListHeader: "Liste d'accès autorisés {value, number}",
            deniedListTitleText: "Accès refusés",
            deniedListHeader: "Liste d'accès refusés {value, number}"
        },
        item: {
            label: "{label}:",
            separator: "|",
            treeSeparator: " ; ",
            treeNodeSeparator: "/",
            listSeparator: ", ",
            empty_boolean: 'false',
            empty_number: '0'
        }
    },
};

var _deMetadata = {
    metadata: {
        extractslocationsLabel: "Relevanter Extrakt",
        extractslocationsPluralLabel: "Relevante Extrakte",
        geoLabel: "Ort",
        geoPluralLabel: "Orte",
        personLabel: "Person",
        personPluralLabel: "Personen",
        companyLabel: "Firma",
        companyPluralLabel: "Firmen",
        treepathLabel: "Quelle",
        treepathPluralLabel: "Quellen",
        matchlocationsLabel: "Suchbegriff",
        matchlocationsPluralLabel: "Suchbegriffe",
        titleLabel: "Titel",
        titlePluralLabel: "Titel",
        authorsLabel: "Autor",
        authorsPluralLabel: "Autoren",
        filenameLabel: "Dateiname",
        filenamePluralLabel: "Dateinamen",
        modifiedLabel: "Datum",
        modifiedPluralLabel: "Datumsangaben",
        sizeLabel: "Größe",
        sizePluralLabel: "Größen",
        docformatLabel: "Format",
        docformatPluralLabel: "Formate",
        documentlanguagesLabel: "Sprache",
        documentlanguagesPluralLabel: "Sprachen",
        geo_label: "Ort",
        geo_plural_label: "Orte",
        person_label: "Person",
        person_plural_label: "Personen",
        company_label: "Firma",
        company_plural_label: "Firmen",
        treepath_label: "Quelle",
        treepath_plural_label: "Quellen",
        title_label: "Titel",
        title_plural_label: "Titel",
        authors_label: "Autor",
        authors_plural_label: "Autoren",
        filename_label: "Dateiname",
        filename_plural_label: "Dateinamen",
        modified_label: "Datum",
        modified_plural_label: "Datumsangaben",
        size_label: "Größe",
        size_plural_label: "Größen",
        docformat_label: "Format",
        docformat_plural_label: "Formate",
        documentlanguages_label: "Sprache",
        documentlanguages_plural_label: "Sprachen",
        accessLists: {
            authorizedListTitleText: "Liste der erlaubten Zugriffe",
            authorizedListHeader: "Liste der erlaubten Zugriffe {value, number}",
            deniedListTitleText: "Liste der unerlaubten Zugriffe",
            deniedListHeader: "Liste der unerlaubten Zugriffe {value, number}"
        },
        item: {
            label: "{label}:",
            separator: "|",
            treeSeparator: " ; ",
            treeNodeSeparator: "/",
            listSeparator: ", ",
            empty_boolean: 'false',
            empty_number: '0'
        }
    }
};

const enMetadata = Utils.merge({}, _enMetadata, enFacet, enCollapse);
const frMetadata = Utils.merge({}, _frMetadata, frFacet, frCollapse);
const deMetadata = Utils.merge({}, _deMetadata, deFacet, deCollapse);

/**
 * Generated bundle index. Do not edit.
 */

export { Metadata, MetadataAccessListsItem, MetadataAccessListsItemSingleAccessList, MetadataItem, MetadataModule, Showmore, deMetadata, enMetadata, frMetadata };
//# sourceMappingURL=sinequa-components-metadata.js.map
