import { ɵɵelementStart, ɵɵtext, ɵɵpipe, ɵɵelementEnd, ɵɵnextContext, ɵɵadvance, ɵɵtextInterpolate2, ɵɵpipeBind2, ɵɵtemplate, ɵɵelement, ɵɵclassMapInterpolate1, ɵɵproperty, ɵɵsanitizeHtml, ɵɵtextInterpolate, ɵɵelementContainerStart, ɵɵelementContainerEnd, ɵɵgetCurrentView, ɵɵlistener, ɵɵrestoreView, ɵɵdefineComponent, ɵɵNgOnChangesFeature, ɵsetClassMetadata, Component, Input, ɵɵclassMapInterpolate2, ɵɵpropertyInterpolate, ɵɵtextInterpolate1, ɵɵpipeBind1, ɵɵsanitizeUrl, EventEmitter, ɵɵdirectiveInject, ViewEncapsulation, Output, ɵɵclassMap, ChangeDetectorRef, ɵɵpureFunction1, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { Utils } from '@sinequa/core/base';
import { NgIf, NgForOf, CommonModule } from '@angular/common';
import { CollapseButton, CollapseModule, enCollapse, frCollapse, deCollapse } from '@sinequa/components/collapse';
import { DatePipe, UtilsModule } from '@sinequa/components/utils';
import { MessagePipe, IntlModule } from '@sinequa/core/intl';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetadataModule, enMetadata, frMetadata, deMetadata } from '@sinequa/components/metadata';
import { SearchService, enSearch, frSearch, deSearch } from '@sinequa/components/search';
import { AppService, Query } from '@sinequa/core/app-utils';
import { UserRatingsWebService, SponsoredLinksWebService, AuditWebService } from '@sinequa/core/web-services';

function ResultExtracts_ng_container_0_p_1_span_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 5);
    ɵɵtext(1);
    ɵɵpipe(2, "sqDate");
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = ɵɵnextContext(3);
    ɵɵadvance(1);
    ɵɵtextInterpolate2("", ɵɵpipeBind2(2, 2, ctx_r4.record.modified, ctx_r4.dateFormat), "", !!ctx_r4.text ? " - " : "", "");
} }
function ResultExtracts_ng_container_0_p_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "p");
    ɵɵtemplate(1, ResultExtracts_ng_container_0_p_1_span_1_Template, 3, 5, "span", 3);
    ɵɵelement(2, "span", 4);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMapInterpolate1("", ctx_r1.extractsClass, " sq-text");
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r1.record.modified && !ctx_r1.hideDate);
    ɵɵadvance(1);
    ɵɵproperty("innerHTML", ctx_r1.text, ɵɵsanitizeHtml);
} }
function ResultExtracts_ng_container_0_ng_container_2_p_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "p");
    ɵɵtext(1);
    ɵɵpipe(2, "sqDate");
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = ɵɵnextContext(3);
    ɵɵclassMapInterpolate1("", ctx_r5.extractsClass, " extracts-date sq-text");
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind2(2, 4, ctx_r5.record.modified, ctx_r5.dateFormat));
} }
function ResultExtracts_ng_container_0_ng_container_2_ul_2_li_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "li", 7);
} if (rf & 2) {
    const extract_r8 = ctx.$implicit;
    ɵɵproperty("innerHTML", extract_r8, ɵɵsanitizeHtml);
} }
function ResultExtracts_ng_container_0_ng_container_2_ul_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "ul");
    ɵɵtemplate(1, ResultExtracts_ng_container_0_ng_container_2_ul_2_li_1_Template, 1, 1, "li", 6);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = ɵɵnextContext(3);
    ɵɵclassMapInterpolate1("", ctx_r6.extractsClass, " sq-text");
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r6.longExtracts);
} }
function ResultExtracts_ng_container_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, ResultExtracts_ng_container_0_ng_container_2_p_1_Template, 3, 7, "p", 1);
    ɵɵtemplate(2, ResultExtracts_ng_container_0_ng_container_2_ul_2_Template, 2, 4, "ul", 1);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r2.record.modified && !ctx_r2.hideDate);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r2.longExtracts);
} }
function ResultExtracts_ng_container_0_a_3_Template(rf, ctx) { if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 8);
    ɵɵlistener("click", function ResultExtracts_ng_container_0_a_3_Template_a_click_0_listener($event) { ɵɵrestoreView(_r10); const ctx_r9 = ɵɵnextContext(2); return ctx_r9.collapseClick($event); });
    ɵɵelement(1, "sq-collapse-button", 9);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("collapsed", ctx_r3.collapsed);
} }
function ResultExtracts_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, ResultExtracts_ng_container_0_p_1_Template, 3, 5, "p", 1);
    ɵɵtemplate(2, ResultExtracts_ng_container_0_ng_container_2_Template, 3, 2, "ng-container", 0);
    ɵɵtemplate(3, ResultExtracts_ng_container_0_a_3_Template, 2, 1, "a", 2);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r0.longExtracts);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.longExtracts);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.showLinesExpander);
} }
class ResultExtracts {
    constructor() {
        this.dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };
        this.collapsed = true;
    }
    setup() {
        this.text = undefined;
        this.longExtracts = undefined;
        if (this.showTextAlways) {
            this.text = Utils.encodeHTML(this.record.text);
            this.extractsClass = "sq-text-extracts";
        }
        else {
            if (this.showLongExtracts && (this.record["extracts"] || this.record["extractsperpartname"])) {
                this.longExtracts = [];
                // extractsperpartname is a complex structure where extracts are stored in an object: "highlight.data"
                // in a csv field (';' separator)
                let recordExtracts = this.record["extracts"] || this.record["extractsperpartname"].highlight[0].data.split(";");
                if (this.maxLongExtracts) {
                    recordExtracts = recordExtracts.slice(0, this.maxLongExtracts * 3);
                }
                for (let i = 0; i < recordExtracts.length; i += 3) {
                    this.longExtracts.push(recordExtracts[i].replace(/\{b\}/g, "<strong>").replace(/\{nb\}/g, "</strong>"));
                }
                this.extractsClass = "sq-long-extracts";
            }
            else if (this.record.relevantExtracts) {
                this.text = this.record.relevantExtracts;
                this.extractsClass = "sq-relevant-extracts";
            }
            else {
                this.text = Utils.encodeHTML(this.record.text);
                this.extractsClass = "sq-text-extracts";
            }
        }
        if (!this.limitLinesDisplayed || !this.collapsed) {
            this.extractsClass += " sq-show-all";
        }
    }
    ngOnChanges(changes) {
        this.setup();
    }
    collapseClick(event) {
        this.collapsed = !this.collapsed;
        this.setup();
        event.preventDefault();
    }
}
ResultExtracts.ɵfac = function ResultExtracts_Factory(t) { return new (t || ResultExtracts)(); };
ResultExtracts.ɵcmp = ɵɵdefineComponent({ type: ResultExtracts, selectors: [["sq-result-extracts"]], inputs: { record: "record", limitLinesDisplayed: "limitLinesDisplayed", showLinesExpander: "showLinesExpander", showTextAlways: "showTextAlways", showLongExtracts: "showLongExtracts", hideDate: "hideDate", maxLongExtracts: "maxLongExtracts", dateFormat: "dateFormat" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "class", 4, "ngIf"], ["class", "sq-text", "href", "#", 3, "click", 4, "ngIf"], ["class", "extracts-date", 4, "ngIf"], [1, "extracts-text", 3, "innerHTML"], [1, "extracts-date"], [3, "innerHTML", 4, "ngFor", "ngForOf"], [3, "innerHTML"], ["href", "#", 1, "sq-text", 3, "click"], [3, "collapsed"]], template: function ResultExtracts_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, ResultExtracts_ng_container_0_Template, 4, 3, "ng-container", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.text || ctx.longExtracts);
    } }, directives: [NgIf, NgForOf, CollapseButton], pipes: [DatePipe], styles: ["p[_ngcontent-%COMP%], ul[_ngcontent-%COMP%] {\n    margin: 0;\n    color: #676767;\n    font-size: 0.9em;\n}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ResultExtracts, [{
        type: Component,
        args: [{
                selector: "sq-result-extracts",
                templateUrl: "./result-extracts.html",
                styles: [`
p, ul {
    margin: 0;
    color: #676767;
    font-size: 0.9em;
}
    `]
            }]
    }], null, { record: [{
            type: Input
        }], limitLinesDisplayed: [{
            type: Input
        }], showLinesExpander: [{
            type: Input
        }], showTextAlways: [{
            type: Input
        }], showLongExtracts: [{
            type: Input
        }], hideDate: [{
            type: Input
        }], maxLongExtracts: [{
            type: Input
        }], dateFormat: [{
            type: Input
        }] }); })();

/**
 * This component requires a global CSS file to map file extensions (doc, ppt, xls, etc.)
 * to Font Awesome icons via a class `sq-icon-file-{{fileext}}`
 */
class ResultIcon {
    constructor() {
        /**
         * Integer controlling the icon's size
         */
        this.size = 1;
    }
}
ResultIcon.ɵfac = function ResultIcon_Factory(t) { return new (t || ResultIcon)(); };
ResultIcon.ɵcmp = ɵɵdefineComponent({ type: ResultIcon, selectors: [["sq-result-icon"]], inputs: { record: "record", size: "size" }, decls: 1, vars: 5, consts: [[3, "title"]], template: function ResultIcon_Template(rf, ctx) { if (rf & 1) {
        ɵɵelement(0, "span", 0);
    } if (rf & 2) {
        ɵɵclassMapInterpolate2("far fa-file sq-icon-file-", ctx.record.fileext, " fa-", ctx.size, "x fa-fw");
        ɵɵpropertyInterpolate("title", ctx.record.fileext);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ResultIcon, [{
        type: Component,
        args: [{
                selector: "sq-result-icon",
                templateUrl: "./result-icon.html"
            }]
    }], null, { record: [{
            type: Input
        }], size: [{
            type: Input
        }] }); })();

function ResultMissingTerms_ng_container_0_span_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 4);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const term_r2 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", term_r2, "");
} }
function ResultMissingTerms_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "span", 1);
    ɵɵtext(2);
    ɵɵpipe(3, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementStart(4, "span", 2);
    ɵɵtemplate(5, ResultMissingTerms_ng_container_0_span_5_Template, 2, 1, "span", 3);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(3, 2, "msg#results.missingTerms"));
    ɵɵadvance(3);
    ɵɵproperty("ngForOf", ctx_r0.missingTerms);
} }
class ResultMissingTerms {
    ngOnChanges(changes) {
        if (changes["record"]) {
            this.missingTerms = [];
            if (this.record.termspresence) {
                for (const tp of this.record.termspresence) {
                    if (Utils.eqNC(tp.presence, "missing")) {
                        this.missingTerms.push(tp.term);
                    }
                }
            }
        }
    }
}
ResultMissingTerms.ɵfac = function ResultMissingTerms_Factory(t) { return new (t || ResultMissingTerms)(); };
ResultMissingTerms.ɵcmp = ɵɵdefineComponent({ type: ResultMissingTerms, selectors: [["sq-result-missing-terms"]], inputs: { record: "record" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "sq-missing-terms-label", "sq-text"], [1, "sq-missing-terms", "sq-text"], ["class", "sq-missing-term", 4, "ngFor", "ngForOf"], [1, "sq-missing-term"]], template: function ResultMissingTerms_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, ResultMissingTerms_ng_container_0_Template, 6, 4, "ng-container", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.missingTerms.length > 0);
    } }, directives: [NgIf, NgForOf], pipes: [MessagePipe], styles: ["[_nghost-%COMP%]{color:#707070;display:block;font-size:.9rem}.sq-missing-term[_ngcontent-%COMP%]{-webkit-text-decoration-line:line-through;text-decoration-line:line-through}.sq-missing-term[_ngcontent-%COMP%]:not(:first-child){margin-left:.25em}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ResultMissingTerms, [{
        type: Component,
        args: [{
                selector: "sq-result-missing-terms",
                templateUrl: "./result-missing-terms.html",
                styleUrls: ["./result-missing-terms.css"]
            }]
    }], null, { record: [{
            type: Input
        }] }); })();

function ResultTitle_span_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span", 2);
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵpropertyInterpolate("title", ctx_r0.record.title);
    ɵɵproperty("innerHTML", ctx_r0.title, ɵɵsanitizeHtml);
} }
function ResultTitle_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 3);
    ɵɵlistener("click", function ResultTitle_a_1_Template_a_click_0_listener() { ɵɵrestoreView(_r3); const ctx_r2 = ɵɵnextContext(); return ctx_r2.click(); });
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵpropertyInterpolate("title", ctx_r1.record.title);
    ɵɵpropertyInterpolate("href", ctx_r1.href, ɵɵsanitizeUrl);
    ɵɵpropertyInterpolate("target", ctx_r1.target);
    ɵɵproperty("innerHTML", ctx_r1.title, ɵɵsanitizeHtml);
} }
class ResultTitle {
    constructor(searchService, appService) {
        this.searchService = searchService;
        this.appService = appService;
        /**
         * "open" mode: Display a link which opens the original document (url1) if available, or emits a titleClicked event to perform an action otherwise
         * "action" mode: Display a link which emits a titleClicked event to perform an action
         * "open-if-url" mode: Display a link which opens the original document (url1) if available, or displays a SPAN with the title otherwise
         * "display" mode: Only display a SPAN element (no link)
         */
        this.titleLinkBehavior = "open";
        /** Optional field name containing the title. Otherwise displayTitle or title are used */
        this.field = "";
        /** Event emitter to perform actions at the parent level */
        this.titleClicked = new EventEmitter(); // TODO: Custom options to get title & URL (replace pluginservice)
    }
    ngOnChanges(changes) {
        if (changes["record"]) {
            this.titleField = this.appService.resolveColumnAlias(this.field);
            this.title = this.getTitle();
            this.documentUrl = this.record.url1;
        }
    }
    get hasLinkBehaviour() {
        return this.titleLinkBehavior === "open" || (this.titleLinkBehavior === "open-if-url" && this.hasUrl);
    }
    /**
     * A span is shown in "display" mode or "open-if-url" mode when no url is present
     * A link is shown in all other cases (even in "open" mode with no url, which is equivalent to "action" mode)
     */
    get hasSpanBehaviour() {
        return this.titleLinkBehavior === "display" || (this.titleLinkBehavior === "open-if-url" && !this.hasUrl);
    }
    get href() {
        return (this.hasLinkBehaviour && this.documentUrl) || "#";
    }
    get target() {
        return (this.hasLinkBehaviour && this.documentUrl) ? this.originalDocTarget || '_blank' : "_self";
    }
    get hasUrl() {
        return !!this.documentUrl;
    }
    getTitle() {
        let title;
        if (this.titleField) {
            title = Utils.escapeHtml(this.record[this.titleField]);
        }
        if (!title) {
            title = this.record.displayTitle || Utils.escapeHtml(this.record.title);
        }
        return title;
    }
    click() {
        const isLink = this.hasLinkBehaviour && !!this.documentUrl; // true if this is a regular link (performs the default action)
        if (isLink)
            this.searchService.notifyOpenOriginalDocument(this.record);
        this.titleClicked.emit(isLink); // Can be use to trigger actions
        return isLink;
    }
}
ResultTitle.ɵfac = function ResultTitle_Factory(t) { return new (t || ResultTitle)(ɵɵdirectiveInject(SearchService), ɵɵdirectiveInject(AppService)); };
ResultTitle.ɵcmp = ɵɵdefineComponent({ type: ResultTitle, selectors: [["sq-result-title"]], inputs: { record: "record", titleLinkBehavior: "titleLinkBehavior", field: "field", originalDocTarget: "originalDocTarget" }, outputs: { titleClicked: "titleClicked" }, features: [ɵɵNgOnChangesFeature], decls: 2, vars: 2, consts: [["class", "sq-result-title", 3, "title", "innerHTML", 4, "ngIf"], ["class", "sq-result-title", 3, "title", "href", "target", "innerHTML", "click", 4, "ngIf"], [1, "sq-result-title", 3, "title", "innerHTML"], [1, "sq-result-title", 3, "title", "href", "target", "innerHTML", "click"]], template: function ResultTitle_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, ResultTitle_span_0_Template, 1, 2, "span", 0);
        ɵɵtemplate(1, ResultTitle_a_1_Template, 1, 4, "a", 1);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.hasSpanBehaviour);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", !ctx.hasSpanBehaviour);
    } }, directives: [NgIf], styles: ["\nsq-result-title {\n    font-size: 1.25rem;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n.match-highlight {\n    font-weight: bold;\n    font-style: italic;\n}\n    "], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ResultTitle, [{
        type: Component,
        args: [{
                selector: "sq-result-title",
                templateUrl: "./result-title.html",
                styles: [`
sq-result-title {
    font-size: 1.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.match-highlight {
    font-weight: bold;
    font-style: italic;
}
    `],
                encapsulation: ViewEncapsulation.None // Currently necessary for the match-highlight
            }]
    }], function () { return [{ type: SearchService }, { type: AppService }]; }, { record: [{
            type: Input
        }], titleLinkBehavior: [{
            type: Input
        }], field: [{
            type: Input
        }], originalDocTarget: [{
            type: Input
        }], titleClicked: [{
            type: Output
        }] }); })();

function ResultSource_ng_container_1_span_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1, " \u203A ");
    ɵɵelementEnd();
} }
function ResultSource_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, ResultSource_ng_container_1_span_1_Template, 2, 0, "span", 2);
    ɵɵelementStart(2, "span", 4);
    ɵɵlistener("click", function ResultSource_ng_container_1_Template_span_click_2_listener() { ɵɵrestoreView(_r7); const s_r3 = ctx.$implicit; const ctx_r6 = ɵɵnextContext(); return ctx_r6.select(s_r3); });
    ɵɵtext(3);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const s_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    ɵɵadvance(1);
    ɵɵproperty("ngIf", i_r4 > 0);
    ɵɵadvance(2);
    ɵɵtextInterpolate(s_r3.display);
} }
function ResultSource_span_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1, " - ");
    ɵɵelementEnd();
} }
function ResultSource_a_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "a", 5);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵpropertyInterpolate("href", ctx_r2.url, ɵɵsanitizeUrl);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ctx_r2.url);
} }
class ResultSource {
    constructor(searchService) {
        this.searchService = searchService;
        this.displayTreepathMinLevel = 0;
        this.displayUrl = true;
        this.source = [];
    }
    ngOnInit() {
        if (this.displayTreepath && !!this.record.treepath) {
            const treepath = this.record.treepath[0];
            if (!!treepath && treepath.length >= 2) {
                this.source = treepath.substr(1, treepath.length - 2).split('/')
                    .slice(this.displayTreepathMinLevel, this.displayTreepathMaxLevel)
                    .map((path, i, array) => {
                    return {
                        display: path,
                        value: '/' + array.slice(0, i + 1).join('/') + '/*'
                    };
                });
            }
        }
        if (this.displayUrl) {
            this.url = this.record.url1;
        }
    }
    select(item) {
        if (this.searchService.addFieldSelect("treepath", item)) {
            this.searchService.search();
        }
    }
}
ResultSource.ɵfac = function ResultSource_Factory(t) { return new (t || ResultSource)(ɵɵdirectiveInject(SearchService)); };
ResultSource.ɵcmp = ɵɵdefineComponent({ type: ResultSource, selectors: [["sq-result-source"]], inputs: { record: "record", displayTreepath: "displayTreepath", displayTreepathMinLevel: "displayTreepathMinLevel", displayTreepathMaxLevel: "displayTreepathMaxLevel", displayUrl: "displayUrl" }, decls: 4, vars: 3, consts: [[1, "sq-result-source"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["target", "_blank", 3, "href", 4, "ngIf"], ["title", "Select this source", 1, "link", 3, "click"], ["target", "_blank", 3, "href"]], template: function ResultSource_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "span", 0);
        ɵɵtemplate(1, ResultSource_ng_container_1_Template, 4, 2, "ng-container", 1);
        ɵɵtemplate(2, ResultSource_span_2_Template, 2, 0, "span", 2);
        ɵɵtemplate(3, ResultSource_a_3_Template, 2, 2, "a", 3);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.source);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.source.length > 0 && !!ctx.url);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.url);
    } }, directives: [NgForOf, NgIf], styles: [".sq-result-source[_ngcontent-%COMP%]{color:#006621;display:inline-block;font-size:.9rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}.link[_ngcontent-%COMP%]{cursor:pointer}.link[_ngcontent-%COMP%]:hover{text-decoration:underline}a[_ngcontent-%COMP%]{color:inherit}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ResultSource, [{
        type: Component,
        args: [{
                selector: "sq-result-source",
                templateUrl: "./result-source.html",
                styleUrls: ["./result-source.css"]
            }]
    }], function () { return [{ type: SearchService }]; }, { record: [{
            type: Input
        }], displayTreepath: [{
            type: Input
        }], displayTreepathMinLevel: [{
            type: Input
        }], displayTreepathMaxLevel: [{
            type: Input
        }], displayUrl: [{
            type: Input
        }] }); })();

function ResultThumbnail_a_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 1);
    ɵɵlistener("click", function ResultThumbnail_a_0_Template_a_click_0_listener() { ɵɵrestoreView(_r2); const ctx_r1 = ɵɵnextContext(); return ctx_r1.click(); });
    ɵɵelement(1, "img", 2);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵpropertyInterpolate("href", ctx_r0.href, ɵɵsanitizeUrl);
    ɵɵpropertyInterpolate("target", ctx_r0.target);
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("src", ctx_r0.thumbnailUrl, ɵɵsanitizeUrl);
} }
class ResultThumbnail {
    constructor(appService, searchService) {
        this.appService = appService;
        this.searchService = searchService;
        this.linkBehavior = "open";
        this.defaultThumbnail = "";
        this.thumbnailClicked = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (!!changes["record"]) {
            this.documentUrl = this.record.url1;
            if (!!this.thumbnailColumn) {
                this.thumbnailUrl = this.record[this.thumbnailColumn];
            }
            if (!this.thumbnailUrl && !!this.record.thumbnailUrl) {
                this.thumbnailUrl = this.record.thumbnailUrl;
            }
            if (!this.thumbnailUrl && !!this.defaultThumbnail) {
                this.thumbnailUrl = this.defaultThumbnail;
            }
            this.thumbnailUrl = this.appService.updateUrlForCors(this.thumbnailUrl);
        }
    }
    get hasLinkBehaviour() {
        return this.linkBehavior === "open";
    }
    get href() {
        return (this.hasLinkBehaviour && this.documentUrl) || "#";
    }
    get target() {
        return (this.hasLinkBehaviour && this.documentUrl) ? "_blank" : "_self";
    }
    click() {
        const isLink = this.hasLinkBehaviour && !!this.documentUrl; // true if this is a regular link (performs the default action)
        if (isLink)
            this.searchService.notifyOpenOriginalDocument(this.record);
        this.thumbnailClicked.emit(isLink); // Can be use to trigger actions
        return isLink;
    }
}
ResultThumbnail.ɵfac = function ResultThumbnail_Factory(t) { return new (t || ResultThumbnail)(ɵɵdirectiveInject(AppService), ɵɵdirectiveInject(SearchService)); };
ResultThumbnail.ɵcmp = ɵɵdefineComponent({ type: ResultThumbnail, selectors: [["sq-result-thumbnail"]], inputs: { record: "record", linkBehavior: "linkBehavior", thumbnailColumn: "thumbnailColumn", defaultThumbnail: "defaultThumbnail" }, outputs: { thumbnailClicked: "thumbnailClicked" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "href", "target", "click", 4, "ngIf"], [3, "href", "target", "click"], [3, "src"]], template: function ResultThumbnail_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, ResultThumbnail_a_0_Template, 2, 3, "a", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.thumbnailUrl);
    } }, directives: [NgIf], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ResultThumbnail, [{
        type: Component,
        args: [{
                selector: "sq-result-thumbnail",
                templateUrl: "./result-thumbnail.html"
            }]
    }], function () { return [{ type: AppService }, { type: SearchService }]; }, { record: [{
            type: Input
        }], linkBehavior: [{
            type: Input
        }], thumbnailColumn: [{
            type: Input
        }], defaultThumbnail: [{
            type: Input
        }], thumbnailClicked: [{
            type: Output
        }] }); })();

function UserRating_li_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "li", 4);
    ɵɵelementStart(1, "span");
    ɵɵtext(2);
    ɵɵpipe(3, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(3, 1, ctx_r0.caption));
} }
function UserRating_li_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 5);
    ɵɵelementStart(1, "a", 6);
    ɵɵlistener("click", function UserRating_li_2_Template_a_click_1_listener() { ɵɵrestoreView(_r6); const i_r4 = ctx.index; const ctx_r5 = ɵɵnextContext(); return ctx_r5.select(i_r4); });
    ɵɵelement(2, "span");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const i_r4 = ctx.index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("title", ctx_r1.getTitle(i_r4));
    ɵɵadvance(1);
    ɵɵclassMap(i_r4 <= ctx_r1.userRatingIndex ? "fas fa-star" : "far fa-star");
} }
function UserRating_li_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "li", 7);
    ɵɵelementStart(1, "span");
    ɵɵtext(2);
    ɵɵpipe(3, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind2(3, 1, "msg#userRatings.average", ctx_r2.messageParams));
} }
class UserRating {
    constructor(userRatingService, changeDetector) {
        this.userRatingService = userRatingService;
        this.changeDetector = changeDetector;
        this.handleResponse = (response) => {
            this.userRatingIndex = response.rating;
            this.averageRatingIndex = response.averagerating;
            this.changeDetector.markForCheck();
        };
    }
    ngOnInit() {
        this.ensureRatingValues();
        this.handleResponse(this.userRatingService.getRecordRating(this.record, this.getCCRating()));
    }
    getCCRating() {
        return {
            ratingsColumn: this.ratingsColumn,
            averageColumn: this.averageColumn,
            updateDocWeight: this.updateDocWeight,
            ratingsDistribution: this.ratingValues
        };
    }
    get messageParams() {
        return {
            values: {
                average: this.getAverageRating()
            }
        };
    }
    getTitle(ratingIndex) {
        if (this.titles) {
            return this.titles.split(";")[ratingIndex] || "";
        }
        else {
            return "";
        }
    }
    getRating(ratingIndex) {
        return this.ratingValues[ratingIndex];
    }
    getAverageRating() {
        if (this.averageRatingIndex < 0) {
            return "";
        }
        else {
            return this.ratingValues[this.averageRatingIndex];
        }
    }
    select(selectedRatingIndex) {
        //If selected rating was already selected, remove the rating
        if (this.userRatingIndex === selectedRatingIndex) {
            this.userRatingService.deleteRating(this.record, this.getCCRating()).subscribe(this.handleResponse);
        }
        else {
            this.userRatingService.setRating(this.record, selectedRatingIndex, this.getCCRating()).subscribe(this.handleResponse);
        }
    }
    ensureRatingValues() {
        if (!this.ratingValues) {
            const count = this.count || 0;
            //Work out rating value range
            if (this.values) {
                //Use predefined values
                this.ratingValues = this.values.split(";");
                //Initialize missing values - so that ratingValues.length matches config.count
                for (let i = this.ratingValues.length; i < count; i++) {
                    this.ratingValues.push((i + 1).toString());
                }
            }
            else {
                //Generates [1, ... config.count]
                this.ratingValues = Array(count).fill(0).map((_, i) => (i + 1).toString());
            }
        }
    }
}
UserRating.ɵfac = function UserRating_Factory(t) { return new (t || UserRating)(ɵɵdirectiveInject(UserRatingsWebService), ɵɵdirectiveInject(ChangeDetectorRef)); };
UserRating.ɵcmp = ɵɵdefineComponent({ type: UserRating, selectors: [["sq-user-rating"]], inputs: { record: "record", ratingsColumn: "ratingsColumn", averageColumn: "averageColumn", updateDocWeight: "updateDocWeight", count: "count", values: "values", titles: "titles", caption: "caption", showAverage: "showAverage" }, decls: 4, vars: 3, consts: [[1, "sq-user-rating-stars"], ["class", "sq-user-rating-caption", 4, "ngIf"], ["class", "sq-user-rating-item", 4, "ngFor", "ngForOf"], ["class", "sq-user-rating-average", 4, "ngIf"], [1, "sq-user-rating-caption"], [1, "sq-user-rating-item"], ["href", "javascript:void(0)", 1, "sq-user-rating-star", 3, "title", "click"], [1, "sq-user-rating-average"]], template: function UserRating_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "ul", 0);
        ɵɵtemplate(1, UserRating_li_1_Template, 4, 3, "li", 1);
        ɵɵtemplate(2, UserRating_li_2_Template, 3, 4, "li", 2);
        ɵɵtemplate(3, UserRating_li_3_Template, 4, 4, "li", 3);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.caption);
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.ratingValues);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.showAverage && ctx.getAverageRating() !== undefined && ctx.getAverageRating() !== "");
    } }, directives: [NgIf, NgForOf], pipes: [MessagePipe], styles: [".sq-user-rating-stars[_ngcontent-%COMP%]{list-style-type:none;padding:0}.sq-user-rating-item[_ngcontent-%COMP%]{display:inline}.sq-user-rating-star[_ngcontent-%COMP%]{text-decoration:none}.sq-user-rating-caption[_ngcontent-%COMP%]{display:inline;font-size:.875rem;margin-right:4px}.sq-user-rating-average[_ngcontent-%COMP%]{display:inline;font-size:.875rem;margin-left:4px}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(UserRating, [{
        type: Component,
        args: [{
                selector: "sq-user-rating",
                templateUrl: "./user-rating.html",
                styleUrls: ["./user-rating.css"]
            }]
    }], function () { return [{ type: UserRatingsWebService }, { type: ChangeDetectorRef }]; }, { record: [{
            type: Input
        }], ratingsColumn: [{
            type: Input
        }], averageColumn: [{
            type: Input
        }], updateDocWeight: [{
            type: Input
        }], count: [{
            type: Input
        }], values: [{
            type: Input
        }], titles: [{
            type: Input
        }], caption: [{
            type: Input
        }], showAverage: [{
            type: Input
        }] }); })();

function SponsoredResults_ul_0_li_1_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 9);
    ɵɵelementStart(1, "a", 10);
    ɵɵlistener("click", function SponsoredResults_ul_0_li_1_div_2_Template_a_click_1_listener() { ɵɵrestoreView(_r7); const link_r2 = ɵɵnextContext().$implicit; const ctx_r5 = ɵɵnextContext(2); return ctx_r5.click(link_r2); });
    ɵɵelement(2, "img", 11);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const link_r2 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("href", link_r2.url, ɵɵsanitizeUrl);
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("src", link_r2.thumbnail, ɵɵsanitizeUrl);
} }
function SponsoredResults_ul_0_li_1_div_8_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 12);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    const link_r2 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, link_r2.summary));
} }
function SponsoredResults_ul_0_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 3);
    ɵɵelementStart(1, "div", 4);
    ɵɵtemplate(2, SponsoredResults_ul_0_li_1_div_2_Template, 3, 2, "div", 5);
    ɵɵelementStart(3, "div", 6);
    ɵɵelementStart(4, "a", 7);
    ɵɵlistener("click", function SponsoredResults_ul_0_li_1_Template_a_click_4_listener() { ɵɵrestoreView(_r11); const link_r2 = ctx.$implicit; const ctx_r10 = ɵɵnextContext(2); return ctx_r10.click(link_r2); });
    ɵɵpipe(5, "sqMessage");
    ɵɵtext(6);
    ɵɵpipe(7, "sqMessage");
    ɵɵelementEnd();
    ɵɵtemplate(8, SponsoredResults_ul_0_li_1_div_8_Template, 3, 3, "div", 8);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const link_r2 = ctx.$implicit;
    ɵɵadvance(2);
    ɵɵproperty("ngIf", link_r2.thumbnail);
    ɵɵadvance(2);
    ɵɵpropertyInterpolate("href", link_r2.url, ɵɵsanitizeUrl);
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(5, 5, link_r2.title));
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(7, 7, link_r2.title));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", link_r2.summary);
} }
function SponsoredResults_ul_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "ul", 1);
    ɵɵtemplate(1, SponsoredResults_ul_0_li_1_Template, 9, 9, "li", 2);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r0.sponsoredlinks);
} }
/**
 * Represent the component that display the sponsored results on result page.
 * NOTE: this class and (its containing file) could have been named SponsoredLinks but this naming causes
 * the file to be flagged as ads by Adblock.
 */
class SponsoredResults {
    constructor(appService, searchService, sponsoredResultsService, auditService, changeDetectorRef) {
        this.appService = appService;
        this.searchService = searchService;
        this.sponsoredResultsService = sponsoredResultsService;
        this.auditService = auditService;
        this.changeDetectorRef = changeDetectorRef;
    }
    /**
     * Considers the text of the new query and sees if the list of the sponsored lists needs to be updated.
     *
     * @param text The text of the new query.
     * @memberof SponsoredLinks
     */
    updateSponsoredLinksIfNecessary(text) {
        if (!this.appService.app) {
            return; // logout
        }
        let redoQuery = false;
        const currentWS = this.getWebService();
        if (!Utils.eqNC(this.webService, currentWS)) {
            this.webService = currentWS;
            redoQuery = true;
        }
        if (!redoQuery && !Utils.eqNC(this.lastText, text)) {
            this.lastText = text;
            redoQuery = true;
        }
        if (!redoQuery && this.currentPage !== this.searchService.query.page) {
            this.currentPage = this.searchService.query.page;
            redoQuery = true;
        }
        if (redoQuery) {
            if (!Utils.isEmpty(this.webService) && !Utils.isEmpty(text)) {
                this.linksQuery.text = text;
                this.linksQuery.page = this.currentPage;
                Utils.subscribe(this.sponsoredResultsService.getLinks(this.linksQuery, this.webService), (results) => {
                    this.sponsoredlinks = results.links;
                    this.auditLinksDisplay();
                    this.changeDetectorRef.markForCheck();
                }, (error) => console.log(`Could not retrieve sponsored links: ${error}.`));
            }
            else {
                this.sponsoredlinks = [];
            }
        }
    }
    /**
     * Retrieves the web service for sponsored links.
     * If it is defined both in the component configuration and the app configuration,
     * this method returns the one in the component configuration.
     *
     * @returns the web service for sponsored links.
     */
    getWebService() {
        return (this.appService.app && this.appService.app.sponsoredLinks) || "";
    }
    ngOnChanges(changes) {
        if (!this.initDone) {
            this.initialize();
        }
        if (changes['query'] || changes['results']) {
            this.updateSponsoredLinksIfNecessary(Utils.trim(this.query.text || ""));
        }
    }
    initialize() {
        if (this.initDone) {
            return;
        }
        if (this.appService.ccquery) {
            this.linksQuery = new Query(this.appService.ccquery.name);
        }
        else {
            return;
        }
        this.initDone = true;
    }
    ngOnInit() {
        this.initialize();
    }
    auditLinksDisplay() {
        if (!!this.sponsoredlinks && this.sponsoredlinks.length > 0) {
            const auditEvents = [];
            this.sponsoredlinks.forEach(link => {
                auditEvents.push({
                    type: "Link_Display" /* Link_Display */,
                    detail: {
                        resultid: this.searchService.results && this.searchService.results.id,
                        linkid: link.id,
                        rank: link.rank,
                        title: link.title,
                        url: link.url
                    }
                });
            });
            this.auditService.notify(auditEvents);
        }
    }
    click(link) {
        this.auditService.notifySponsoredLink("Link_Click" /* Link_Click */, link, this.searchService.results && this.searchService.results.id || "");
    }
}
SponsoredResults.ɵfac = function SponsoredResults_Factory(t) { return new (t || SponsoredResults)(ɵɵdirectiveInject(AppService), ɵɵdirectiveInject(SearchService), ɵɵdirectiveInject(SponsoredLinksWebService), ɵɵdirectiveInject(AuditWebService), ɵɵdirectiveInject(ChangeDetectorRef)); };
SponsoredResults.ɵcmp = ɵɵdefineComponent({ type: SponsoredResults, selectors: [["sq-sponsored-results"]], inputs: { query: "query" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "sq-sponsored-links-list", 4, "ngIf"], [1, "sq-sponsored-links-list"], ["class", "sponsored-item", 4, "ngFor", "ngForOf"], [1, "sponsored-item"], [1, "sq-sponsored-link-view"], ["class", "sq-sponsored-link-view-thumbnail", 4, "ngIf"], [1, "sq-sponsored-link-view-info"], ["target", "_blank", 3, "href", "title", "click"], ["class", "sq-sponsored-link-view-summary", 4, "ngIf"], [1, "sq-sponsored-link-view-thumbnail"], ["target", "_blank", 3, "href", "click"], [3, "src"], [1, "sq-sponsored-link-view-summary"]], template: function SponsoredResults_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, SponsoredResults_ul_0_Template, 2, 1, "ul", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !!ctx.sponsoredlinks);
    } }, directives: [NgIf, NgForOf], pipes: [MessagePipe], styles: [".sq-sponsored-links-list[_ngcontent-%COMP%]{list-style:none;padding:0}.sq-sponsored-links-list[_ngcontent-%COMP%] > .sponsored-item[_ngcontent-%COMP%]{overflow:hidden;overflow-wrap:break-word;text-overflow:ellipsis;word-break:break-word;word-wrap:break-word}.sq-sponsored-link-view[_ngcontent-%COMP%]{align-items:center;display:flex}.sq-sponsored-link-view[_ngcontent-%COMP%]   .sq-sponsored-link-view-info[_ngcontent-%COMP%]{flex:1;min-width:0}.sq-sponsored-link-view[_ngcontent-%COMP%]   .sq-sponsored-link-view-info[_ngcontent-%COMP%]   .sq-sponsored-link-view-summary[_ngcontent-%COMP%], .sq-sponsored-link-view[_ngcontent-%COMP%]   .sq-sponsored-link-view-info[_ngcontent-%COMP%]   .sq-sponsored-link-view-title[_ngcontent-%COMP%]{min-width:0}.sq-sponsored-link-view[_ngcontent-%COMP%]   .sq-sponsored-link-view-thumbnail[_ngcontent-%COMP%]{margin-right:1em}.sq-sponsored-link-view[_ngcontent-%COMP%]   .sq-sponsored-link-view-thumbnail[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:7rem;max-width:5rem}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SponsoredResults, [{
        type: Component,
        args: [{
                selector: 'sq-sponsored-results',
                templateUrl: './sponsored-results.html',
                styleUrls: ["./sponsored-results.scss"]
            }]
    }], function () { return [{ type: AppService }, { type: SearchService }, { type: SponsoredLinksWebService }, { type: AuditWebService }, { type: ChangeDetectorRef }]; }, { query: [{
            type: Input
        }] }); })();

const _c0 = function (a0) { return { count: a0 }; };
const _c1 = function (a0) { return { values: a0 }; };
class ResultsCounter {
}
ResultsCounter.ɵfac = function ResultsCounter_Factory(t) { return new (t || ResultsCounter)(); };
ResultsCounter.ɵcmp = ɵɵdefineComponent({ type: ResultsCounter, selectors: [["sq-results-counter"]], inputs: { rowCount: "rowCount" }, decls: 3, vars: 8, consts: [[1, "sq-results-count"]], template: function ResultsCounter_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtext(1);
        ɵɵpipe(2, "sqMessage");
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵtextInterpolate(ɵɵpipeBind2(2, 1, "msg#results.resultsCount", ɵɵpureFunction1(6, _c1, ɵɵpureFunction1(4, _c0, ctx.rowCount))));
    } }, pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ResultsCounter, [{
        type: Component,
        args: [{
                selector: "sq-results-counter",
                templateUrl: "./results-counter.html"
            }]
    }], null, { rowCount: [{
            type: Input
        }] }); })();

class ResultModule {
}
ResultModule.ɵmod = ɵɵdefineNgModule({ type: ResultModule });
ResultModule.ɵinj = ɵɵdefineInjector({ factory: function ResultModule_Factory(t) { return new (t || ResultModule)(); }, imports: [[
            CommonModule,
            FormsModule, ReactiveFormsModule,
            IntlModule,
            UtilsModule,
            CollapseModule,
            MetadataModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(ResultModule, { declarations: [ResultTitle, ResultExtracts,
        ResultMissingTerms,
        ResultThumbnail, UserRating,
        SponsoredResults, ResultsCounter,
        ResultIcon, ResultSource], imports: [CommonModule,
        FormsModule, ReactiveFormsModule,
        IntlModule,
        UtilsModule,
        CollapseModule,
        MetadataModule], exports: [ResultTitle, ResultExtracts,
        ResultMissingTerms,
        ResultThumbnail, UserRating,
        SponsoredResults, ResultsCounter,
        ResultIcon, ResultSource] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(ResultModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule, ReactiveFormsModule,
                    IntlModule,
                    UtilsModule,
                    CollapseModule,
                    MetadataModule
                ],
                declarations: [
                    ResultTitle, ResultExtracts,
                    ResultMissingTerms,
                    ResultThumbnail, UserRating,
                    SponsoredResults, ResultsCounter,
                    ResultIcon, ResultSource
                ],
                exports: [
                    ResultTitle, ResultExtracts,
                    ResultMissingTerms,
                    ResultThumbnail, UserRating,
                    SponsoredResults, ResultsCounter,
                    ResultIcon, ResultSource
                ]
            }]
    }], null, null); })();

var _enResult = {
    results: {
        missingTerms: "Missing terms:",
        resultsCount: "{count, plural, =0 {no results} one {# result} other {# results}}",
    },
    userRatings: {
        average: "Average: {average}"
    },
};

var _frResult = {
    results: {
        missingTerms: "Termes manquants :",
        resultsCount: "{count, plural, =0 {aucune réponse} one {# réponse} other {# réponses}}",
    },
    userRatings: {
        average: "Moyenne : {average}"
    },
};

var _deResult = {
    "results": {
        "missingTerms": "fehlende Begriffe:",
        "resultsCount": "{count, plural, =0 {keine Ergebnisse} one {# Ergebnis} other {# Ergebnisse}}"
    },
    "userRatings": {
        "average": "Durchschnittlich: {average}"
    },
};

const enResult = Utils.merge({}, _enResult, enSearch, enMetadata, enCollapse);
const frResult = Utils.merge({}, _frResult, frSearch, frMetadata, frCollapse);
const deResult = Utils.merge({}, _deResult, deSearch, deMetadata, deCollapse);

/**
 * Generated bundle index. Do not edit.
 */

export { ResultExtracts, ResultIcon, ResultMissingTerms, ResultModule, ResultSource, ResultThumbnail, ResultTitle, ResultsCounter, SponsoredResults, UserRating, deResult, enResult, frResult };
//# sourceMappingURL=sinequa-components-result.js.map
