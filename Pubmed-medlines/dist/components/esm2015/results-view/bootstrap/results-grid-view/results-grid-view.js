import { Component, Input } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "@sinequa/components/search";
import * as i3 from "@sinequa/components/selection";
import * as i4 from "@angular/common";
import * as i5 from "@sinequa/core/intl";
import * as i6 from "@sinequa/components/utils";
function BsResultsGridView_th_9_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span");
} if (rf & 2) {
    const columnData_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassMap(columnData_r2.sortIcon);
} }
const _c0 = function (a0) { return { "sq-clickable": a0 }; };
function BsResultsGridView_th_9_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "th", 7);
    i0.ɵɵlistener("click", function BsResultsGridView_th_9_Template_th_click_0_listener() { i0.ɵɵrestoreView(_r6); const columnData_r2 = ctx.$implicit; const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.setSort(columnData_r2); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵtemplate(3, BsResultsGridView_th_9_span_3_Template, 1, 3, "span", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const columnData_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c0, ctx_r0.isSortable(columnData_r2)));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(2, 4, columnData_r2.config.title), "", columnData_r2.sortIndicator, "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.isSortable(columnData_r2));
} }
function BsResultsGridView_tr_11_ng_container_3_td_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "td", 12);
    i0.ɵɵpipe(1, "sqValue");
} if (rf & 2) {
    const ctx_r14 = i0.ɵɵnextContext();
    const columnData_r9 = ctx_r14.$implicit;
    const $index_r10 = ctx_r14.index;
    const record_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind2(1, 2, record_r7[columnData_r9.config.field], columnData_r9.column), i0.ɵɵsanitizeHtml);
    i0.ɵɵattribute("scope", $index_r10 === 0 ? "row" : null);
} }
function BsResultsGridView_tr_11_ng_container_3_td_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqValue");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r15 = i0.ɵɵnextContext();
    const $index_r10 = ctx_r15.index;
    const columnData_r9 = ctx_r15.$implicit;
    const record_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵattribute("scope", $index_r10 === 0 ? "row" : null);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 2, record_r7[columnData_r9.config.field], columnData_r9.column));
} }
function BsResultsGridView_tr_11_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsResultsGridView_tr_11_ng_container_3_td_1_Template, 2, 5, "td", 10);
    i0.ɵɵtemplate(2, BsResultsGridView_tr_11_ng_container_3_td_2_Template, 3, 5, "td", 11);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const columnData_r9 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", columnData_r9.config.renderAsHtml);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !columnData_r9.config.renderAsHtml);
} }
function BsResultsGridView_tr_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 1);
    i0.ɵɵelement(2, "sq-result-selector", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, BsResultsGridView_tr_11_ng_container_3_Template, 3, 2, "ng-container", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const record_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("record", record_r7);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.columnsData);
} }
export class BsResultsGridView {
    constructor(appService, searchService, formatService, selectionService) {
        this.appService = appService;
        this.searchService = searchService;
        this.formatService = formatService;
        this.selectionService = selectionService;
    }
    observeQueryFields() {
        this.initSorts();
    }
    ngOnChanges(changes) {
        if (!this.columnsData) {
            if (!!this.view.columns) {
                this.columnsData = this.view.columns.filter(config => config.active).map(config => ({
                    config: config,
                    column: this.appService.getColumn(config.field)
                }));
                this.clearSorts();
            }
            else {
                this.columnsData = [];
            }
        }
        if (!!changes["query"]) {
            this.observeQueryFields();
        }
    }
    toggleSelectedRecords() {
        this.selectionService.toggleSelectedRecords();
    }
    get haveSelectedRecords() {
        return this.selectionService.haveSelectedRecords;
    }
    getSortIndicator(columnData) {
        if (columnData.sortIndex === -1) {
            return undefined;
        }
        if (this.maxSortIndex === 0) {
            return undefined;
        }
        switch (columnData.sortIndex || -1 + 1) {
            case 1: return "\u00B9";
            case 2: return "\u00B2";
            case 3: return "\u00B3";
            case 4: return "\u2074";
            case 5: return "\u2075";
            case 6: return "\u2076";
            case 7: return "\u2077";
            case 8: return "\u2078";
            case 9: return "\u2079";
            default: return "\u207A";
        }
    }
    ascendingFirst(column) {
        //return this.appService.isNumber(column.field);
        return false;
    }
    get maxSortIndex() {
        let sortIndex = -1;
        if (this.columnsData) {
            for (const columnData of this.columnsData) {
                if (columnData.sortIndex !== undefined && columnData.sortIndex > sortIndex) {
                    sortIndex = columnData.sortIndex;
                }
            }
        }
        return sortIndex;
    }
    _setSort(columnData, ascending) {
        const previousSortIndex = columnData.sortIndex;
        if (previousSortIndex === -1) {
            columnData.sortIndex = this.maxSortIndex + 1;
        }
        columnData.ascending = ascending;
        columnData.sortIcon = columnData.ascending ? "fas fa-caret-up" : "fas fa-caret-down";
        columnData.sortIndicator = this.getSortIndicator(columnData);
        if (previousSortIndex === -1) {
            if (this.columnsData) {
                for (const columnData1 of this.columnsData) {
                    columnData1.sortIndicator = this.getSortIndicator(columnData1);
                }
            }
        }
    }
    _clearSort(columnData) {
        const previousSortIndex = columnData.sortIndex || -1;
        columnData.sortIndex = -1;
        columnData.ascending = false;
        columnData.sortIcon = "fas fa-sort";
        columnData.sortIndicator = undefined;
        if (previousSortIndex !== -1) {
            if (this.columnsData) {
                for (const columnData1 of this.columnsData) {
                    if (columnData1.sortIndex !== undefined && columnData1.sortIndex > previousSortIndex) {
                        columnData1.sortIndex--;
                    }
                    columnData1.sortIndicator = this.getSortIndicator(columnData1);
                }
            }
        }
    }
    clearSorts() {
        if (this.columnsData) {
            for (const columnData of this.columnsData) {
                this._clearSort(columnData);
            }
        }
    }
    isSortable(columnData) {
        return !!columnData && columnData.config.sortable && this.appService.isSortable(columnData.config.field);
    }
    initSorts() {
        if (this.searchService.query.orderBy === this.orderBy) {
            return;
        }
        this.orderBy = this.searchService.query.orderBy;
        this.clearSorts();
        if (!!this.orderBy) {
            const parts = Utils.split(this.orderBy, ",");
            for (const part of parts) {
                const tokens = Utils.split(part, " ");
                if (tokens.length > 0) {
                    const field = tokens[0];
                    if (this.columnsData) {
                        const columnData = this.columnsData.find(value => Utils.eqNC(field, value.config.field));
                        if (columnData && this.isSortable(columnData)) {
                            this._setSort(columnData, tokens.length > 1 ? Utils.eqNC(tokens[1], "asc") : true);
                        }
                    }
                }
            }
        }
    }
    setSort(columnData) {
        if (this.isSortable(columnData)) {
            if (columnData.sortIndex !== -1) {
                if (this.ascendingFirst(columnData.config)) {
                    if (columnData.ascending) {
                        this._setSort(columnData, false);
                    }
                    else {
                        this._clearSort(columnData);
                    }
                }
                else {
                    if (columnData.ascending) {
                        this._clearSort(columnData);
                    }
                    else {
                        this._setSort(columnData, true);
                    }
                }
            }
            else {
                this._setSort(columnData, this.ascendingFirst(columnData.config));
            }
            const orderBy = [];
            if (this.columnsData) {
                for (let sortIndex = 0;; sortIndex++) {
                    const columnData = this.columnsData.find(columnData => columnData.sortIndex === sortIndex);
                    if (!columnData) {
                        break;
                    }
                    if (orderBy.length !== 0) {
                        orderBy.push(",");
                    }
                    orderBy.push(columnData.config.field);
                    if (!columnData.ascending) {
                        orderBy.push(" desc");
                    }
                }
            }
            if (orderBy.length === 0) {
                this.searchService.query.orderBy = this.orderBy = undefined;
            }
            else {
                this.searchService.query.orderBy = this.orderBy = orderBy.join("");
            }
            this.searchService.search();
        }
    }
}
BsResultsGridView.ɵfac = function BsResultsGridView_Factory(t) { return new (t || BsResultsGridView)(i0.ɵɵdirectiveInject(i1.AppService), i0.ɵɵdirectiveInject(i2.SearchService), i0.ɵɵdirectiveInject(i1.FormatService), i0.ɵɵdirectiveInject(i3.SelectionService)); };
BsResultsGridView.ɵcmp = i0.ɵɵdefineComponent({ type: BsResultsGridView, selectors: [["sq-results-grid-view"]], inputs: { results: "results", view: "view" }, features: [i0.ɵɵNgOnChangesFeature], decls: 12, vars: 6, consts: [[1, "sq-results-grid-view"], [1, "sq-grid-view-checkbox"], [1, "custom-control", "custom-checkbox", 3, "title"], ["type", "checkbox", 1, "custom-control-input", 3, "checked", "change"], [1, "custom-control-label"], ["scope", "col", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [4, "ngFor", "ngForOf"], ["scope", "col", 3, "ngClass", "click"], [3, "class", 4, "ngIf"], [3, "record"], [3, "innerHTML", 4, "ngIf"], [4, "ngIf"], [3, "innerHTML"]], template: function BsResultsGridView_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "table", 0);
        i0.ɵɵelementStart(1, "thead");
        i0.ɵɵelementStart(2, "tr");
        i0.ɵɵelementStart(3, "th", 1);
        i0.ɵɵelementStart(4, "label", 2);
        i0.ɵɵpipe(5, "sqMessage");
        i0.ɵɵelementStart(6, "input", 3);
        i0.ɵɵlistener("change", function BsResultsGridView_Template_input_change_6_listener() { return ctx.toggleSelectedRecords(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "span", 4);
        i0.ɵɵtext(8, "\u200B");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(9, BsResultsGridView_th_9_Template, 4, 8, "th", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(10, "tbody");
        i0.ɵɵtemplate(11, BsResultsGridView_tr_11_Template, 4, 2, "tr", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(4);
        i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(5, 4, ctx.haveSelectedRecords ? "msg#results.resultsGridView.unselectDocuments" : "msg#results.resultsGridView.selectDocuments"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("checked", ctx.haveSelectedRecords);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.columnsData);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.results.records);
    } }, directives: [i4.NgForOf, i4.NgClass, i4.NgIf, i3.BsResultSelector], pipes: [i5.MessagePipe, i6.ValuePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsResultsGridView, [{
        type: Component,
        args: [{
                selector: "sq-results-grid-view",
                templateUrl: "./results-grid-view.html"
            }]
    }], function () { return [{ type: i1.AppService }, { type: i2.SearchService }, { type: i1.FormatService }, { type: i3.SelectionService }]; }, { results: [{
            type: Input
        }], view: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0cy1ncmlkLXZpZXcuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9yZXN1bHRzLXZpZXcvIiwic291cmNlcyI6WyJib290c3RyYXAvcmVzdWx0cy1ncmlkLXZpZXcvcmVzdWx0cy1ncmlkLXZpZXcudHMiLCJib290c3RyYXAvcmVzdWx0cy1ncmlkLXZpZXcvcmVzdWx0cy1ncmlkLXZpZXcuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBMkIsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7Ozs7SUNRZ0wsdUJBQTRFOzs7SUFBdkMscUNBQStCOzs7OztJQUFqUiw2QkFBMEk7SUFBOUIsK05BQTZCO0lBQUMsWUFBbUU7O0lBQUEseUVBQTRFO0lBQUEsaUJBQUs7Ozs7SUFBdk8sc0ZBQW9EO0lBQStCLGVBQW1FO0lBQW5FLGdIQUFtRTtJQUFPLGVBQTRCO0lBQTVCLHVEQUE0Qjs7O0lBUzVPLHlCQUFxSzs7Ozs7OztJQUEvRSxnSUFBeUU7SUFBcEgsd0RBQTBDOzs7SUFDckYsMEJBQXVGO0lBQUEsWUFBK0Q7O0lBQUEsaUJBQUs7Ozs7OztJQUEvRyx3REFBMEM7SUFBQyxlQUErRDtJQUEvRCx1R0FBK0Q7OztJQUYxSiw2QkFDSTtJQUFBLHNGQUFxSztJQUNySyxzRkFBMko7SUFDL0osMEJBQWU7OztJQUZOLGVBQW9DO0lBQXBDLHdEQUFvQztJQUNwQyxlQUFxQztJQUFyQyx5REFBcUM7OztJQU5sRCwwQkFDSTtJQUFBLDZCQUNJO0lBQUEsd0NBQTJEO0lBQy9ELGlCQUFLO0lBQ0wsMEZBR2U7SUFDbkIsaUJBQUs7Ozs7SUFOdUIsZUFBaUI7SUFBakIsa0NBQWlCO0lBRUosZUFBZ0I7SUFBaEIsNENBQWdCOztBRGlCakUsTUFBTSxPQUFPLGlCQUFpQjtJQU0xQixZQUNXLFVBQXNCLEVB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Q0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO2FBQy9EO2lCQUNJO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdEU7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQy9CO0lBQ0wsQ0FBQzs7a0ZBdk1RLGlCQUFpQjtzREFBakIsaUJBQWlCO1FDbEM5QixnQ0FDSTtRQUFBLDZCQUNJO1FBQUEsMEJBQ0k7UUFBQSw2QkFDSTtRQUFBLGdDQUNJOztRQUFBLGdDQUNBO1FBRG9GLCtGQUFVLDJCQUF1QixJQUFDO1FBQXRILGlCQUNBO1FBQUEsK0JBQW1DO1FBQUEsc0JBQU87UUFBQSxpQkFBTztRQUNyRCxpQkFBUTtRQUNaLGlCQUFLO1FBQ0wsZ0VBQThSO1FBQ2xTLGlCQUFLO1FBQ1QsaUJBQVE7UUFDUiw4QkFDSTtRQUFBLGtFQVFLO1FBQ1QsaUJBQVE7UUFDWixpQkFBUTs7UUFuQnNELGVBQStJO1FBQS9JLGtMQUErSTtRQUNySSxlQUErQjtRQUEvQixpREFBK0I7UUFJaEUsZUFBYztRQUFkLHlDQUFjO1FBSXRCLGVBQWtCO1FBQWxCLDZDQUFrQjs7a0REcUJwQyxpQkFBaUI7Y0FKN0IsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFdBQVcsRUFBRSwwQkFBMEI7YUFDMUM7b0pBRVksT0FBTztrQkFBZixLQUFLO1lBQ0csSUFBSTtrQkFBWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXN9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge0FwcFNlcnZpY2UsIEZvcm1hdFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL2FwcC11dGlsc1wiO1xuaW1wb3J0IHtDQ0NvbHVtbiwgUmVzdWx0c30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge1NlbGVjdGlvblNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3NlbGVjdGlvblwiO1xuaW1wb3J0IHtTZWFyY2hTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9zZWFyY2hcIjtcbmltcG9ydCB7UmVzdWx0c1ZpZXd9IGZyb20gXCIuLi8uLi9yZXN1bHRzLXZpZXcuc2VydmljZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRWaWV3IGV4dGVuZHMgUmVzdWx0c1ZpZXcge1xuICAgIGNvbHVtbnM6IENvbHVtbltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbHVtbiB7XG4gICAgYWN0aXZlOiBib29sZWFuO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgZmllbGQ6IHN0cmluZztcbiAgICBzb3J0YWJsZTogYm9vbGVhbjtcbiAgICByZW5kZXJBc0h0bWw6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29sdW1uRGF0YSB7XG4gICAgY29uZmlnOiBDb2x1bW47XG4gICAgY29sdW1uOiBDQ0NvbHVtbiB8IHVuZGVmaW5lZDtcbiAgICAvLyBTb3J0aW5nIGRhdGFcbiAgICBzb3J0SW5kZXg/OiBudW1iZXI7XG4gICAgYXNjZW5kaW5nPzogYm9vbGVhbjtcbiAgICBzb3J0SWNvbj86IHN0cmluZztcbiAgICBzb3J0SW5kaWNhdG9yPzogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1yZXN1bHRzLWdyaWQtdmlld1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcmVzdWx0cy1ncmlkLXZpZXcuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEJzUmVzdWx0c0dyaWRWaWV3IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSByZXN1bHRzOiBSZXN1bHRzO1xuICAgIEBJbnB1dCgpIHZpZXc6IEdyaWRWaWV3O1xuICAgIHByaXZhdGUgb3JkZXJCeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGNvbHVtbnNEYXRhOiBDb2x1bW5EYXRhW10gfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGFwcFNlcnZpY2U6IEFwcFNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgZm9ybWF0U2VydmljZTogRm9ybWF0U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBzZWxlY3Rpb25TZXJ2aWNlOiBTZWxlY3Rpb25TZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgb2JzZXJ2ZVF1ZXJ5RmllbGRzKCkge1xuICAgICAgICB0aGlzLmluaXRTb3J0cygpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbHVtbnNEYXRhKSB7XG4gICAgICAgICAgICBpZiAoISF0aGlzLnZpZXcuY29sdW1ucykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uc0RhdGEgPSB0aGlzLnZpZXcuY29sdW1ucy5maWx0ZXIoY29uZmlnID0+IGNvbmZpZy5hY3RpdmUpLm1hcChjb25maWcgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbjogdGhpcy5hcHBTZXJ2aWNlLmdldENvbHVtbihjb25maWcuZmllbGQpXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJTb3J0cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2x1bW5zRGF0YSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghIWNoYW5nZXNbXCJxdWVyeVwiXSkge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlUXVlcnlGaWVsZHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgdG9nZ2xlU2VsZWN0ZWRSZWNvcmRzKCkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UudG9nZ2xlU2VsZWN0ZWRSZWNvcmRzKCk7XG4gICAgfVxuXG4gICAgZ2V0IGhhdmVTZWxlY3RlZFJlY29yZHMoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uU2VydmljZS5oYXZlU2VsZWN0ZWRSZWNvcmRzO1xuICAgIH1cblxuICAgIGdldFNvcnRJbmRpY2F0b3IoY29sdW1uRGF0YTogQ29sdW1uRGF0YSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmIChjb2x1bW5EYXRhLnNvcnRJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubWF4U29ydEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoY29sdW1uRGF0YS5zb3J0SW5kZXggfHwgLTEgKyAxKSB7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBcIlxcdTAwQjlcIjtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFwiXFx1MDBCMlwiO1xuICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gXCJcXHUwMEIzXCI7XG4gICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBcIlxcdTIwNzRcIjtcbiAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFwiXFx1MjA3NVwiO1xuICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gXCJcXHUyMDc2XCI7XG4gICAgICAgICAgICBjYXNlIDc6IHJldHVybiBcIlxcdTIwNzdcIjtcbiAgICAgICAgICAgIGNhc2UgODogcmV0dXJuIFwiXFx1MjA3OFwiO1xuICAgICAgICAgICAgY2FzZSA5OiByZXR1cm4gXCJcXHUyMDc5XCI7XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJcXHUyMDdBXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc2NlbmRpbmdGaXJzdChjb2x1bW46IENvbHVtbik6IGJvb2xlYW4ge1xuICAgICAgICAvL3JldHVybiB0aGlzLmFwcFNlcnZpY2UuaXNOdW1iZXIoY29sdW1uLmZpZWxkKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBtYXhTb3J0SW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHNvcnRJbmRleCA9IC0xO1xuICAgICAgICBpZiAodGhpcy5jb2x1bW5zRGF0YSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjb2x1bW5EYXRhIG9mIHRoaXMuY29sdW1uc0RhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uRGF0YS5zb3J0SW5kZXggIT09IHVuZGVmaW5lZCAmJiBjb2x1bW5EYXRhLnNvcnRJbmRleCA+IHNvcnRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBzb3J0SW5kZXggPSBjb2x1bW5EYXRhLnNvcnRJbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNvcnRJbmRleDtcbiAgICB9XG5cbiAgICBfc2V0U29ydChjb2x1bW5EYXRhOiBDb2x1bW5EYXRhLCBhc2NlbmRpbmc6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTb3J0SW5kZXggPSBjb2x1bW5EYXRhLnNvcnRJbmRleDtcbiAgICAgICAgaWYgKHByZXZpb3VzU29ydEluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgY29sdW1uRGF0YS5zb3J0SW5kZXggPSB0aGlzLm1heFNvcnRJbmRleCArIDE7XG4gICAgICAgIH1cbiAgICAgICAgY29sdW1uRGF0YS5hc2NlbmRpbmcgPSBhc2NlbmRpbmc7XG4gICAgICAgIGNvbHVtbkRhdGEuc29ydEljb24gPSBjb2x1bW5EYXRhLmFzY2VuZGluZyA/IFwiZmFzIGZhLWNhcmV0LXVwXCIgOiBcImZhcyBmYS1jYXJldC1kb3duXCI7XG4gICAgICAgIGNvbHVtbkRhdGEuc29ydEluZGljYXRvciA9IHRoaXMuZ2V0U29ydEluZGljYXRvcihjb2x1bW5EYXRhKTtcbiAgICAgICAgaWYgKHByZXZpb3VzU29ydEluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29sdW1uc0RhdGEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNvbHVtbkRhdGExIG9mIHRoaXMuY29sdW1uc0RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uRGF0YTEuc29ydEluZGljYXRvciA9IHRoaXMuZ2V0U29ydEluZGljYXRvcihjb2x1bW5EYXRhMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2NsZWFyU29ydChjb2x1bW5EYXRhOiBDb2x1bW5EYXRhKSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzU29ydEluZGV4ID0gY29sdW1uRGF0YS5zb3J0SW5kZXggfHwgLTE7XG4gICAgICAgIGNvbHVtbkRhdGEuc29ydEluZGV4ID0gLTE7XG4gICAgICAgIGNvbHVtbkRhdGEuYXNjZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIGNvbHVtbkRhdGEuc29ydEljb24gPSBcImZhcyBmYS1zb3J0XCI7XG4gICAgICAgIGNvbHVtbkRhdGEuc29ydEluZGljYXRvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHByZXZpb3VzU29ydEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29sdW1uc0RhdGEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNvbHVtbkRhdGExIG9mIHRoaXMuY29sdW1uc0RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbHVtbkRhdGExLnNvcnRJbmRleCAhPT0gdW5kZWZpbmVkICYmIGNvbHVtbkRhdGExLnNvcnRJbmRleCA+IHByZXZpb3VzU29ydEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5EYXRhMS5zb3J0SW5kZXgtLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5EYXRhMS5zb3J0SW5kaWNhdG9yID0gdGhpcy5nZXRTb3J0SW5kaWNhdG9yKGNvbHVtbkRhdGExKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhclNvcnRzKCkge1xuICAgICAgICBpZiAodGhpcy5jb2x1bW5zRGF0YSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjb2x1bW5EYXRhIG9mIHRoaXMuY29sdW1uc0RhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGVhclNvcnQoY29sdW1uRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1NvcnRhYmxlKGNvbHVtbkRhdGE6IENvbHVtbkRhdGEpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhY29sdW1uRGF0YSAmJiBjb2x1bW5EYXRhLmNvbmZpZy5zb3J0YWJsZSAmJiB0aGlzLmFwcFNlcnZpY2UuaXNTb3J0YWJsZShjb2x1bW5EYXRhLmNvbmZpZy5maWVsZCk7XG4gICAgfVxuXG4gICAgaW5pdFNvcnRzKCkge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hTZXJ2aWNlLnF1ZXJ5Lm9yZGVyQnkgPT09IHRoaXMub3JkZXJCeSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3JkZXJCeSA9IHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeS5vcmRlckJ5O1xuICAgICAgICB0aGlzLmNsZWFyU29ydHMoKTtcbiAgICAgICAgaWYgKCEhdGhpcy5vcmRlckJ5KSB7XG4gICAgICAgICAgICBjb25zdCBwYXJ0cyA9IFV0aWxzLnNwbGl0KHRoaXMub3JkZXJCeSwgXCIsXCIpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBwYXJ0IG9mIHBhcnRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW5zID0gVXRpbHMuc3BsaXQocGFydCwgXCIgXCIpO1xuICAgICAgICAgICAgICAgIGlmICh0b2tlbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWVsZCA9IHRva2Vuc1swXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29sdW1uc0RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtbkRhdGEgPSB0aGlzLmNvbHVtbnNEYXRhLmZpbmQodmFsdWUgPT4gVXRpbHMuZXFOQyhmaWVsZCwgdmFsdWUuY29uZmlnLmZpZWxkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sdW1uRGF0YSAmJiB0aGlzLmlzU29ydGFibGUoY29sdW1uRGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRTb3J0KGNvbHVtbkRhdGEsIHRva2Vucy5sZW5ndGggPiAxID8gVXRpbHMuZXFOQyh0b2tlbnNbMV0sIFwiYXNjXCIpIDogdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRTb3J0KGNvbHVtbkRhdGE6IENvbHVtbkRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTb3J0YWJsZShjb2x1bW5EYXRhKSkge1xuICAgICAgICAgICAgaWYgKGNvbHVtbkRhdGEuc29ydEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFzY2VuZGluZ0ZpcnN0KGNvbHVtbkRhdGEuY29uZmlnKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29sdW1uRGF0YS5hc2NlbmRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldFNvcnQoY29sdW1uRGF0YSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2xlYXJTb3J0KGNvbHVtbkRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29sdW1uRGF0YS5hc2NlbmRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NsZWFyU29ydChjb2x1bW5EYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldFNvcnQoY29sdW1uRGF0YSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRTb3J0KGNvbHVtbkRhdGEsIHRoaXMuYXNjZW5kaW5nRmlyc3QoY29sdW1uRGF0YS5jb25maWcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG9yZGVyQnk6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICBpZiAodGhpcy5jb2x1bW5zRGF0YSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNvcnRJbmRleCA9IDA7IDsgc29ydEluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sdW1uRGF0YSA9IHRoaXMuY29sdW1uc0RhdGEuZmluZChjb2x1bW5EYXRhID0+IGNvbHVtbkRhdGEuc29ydEluZGV4ID09PSBzb3J0SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbHVtbkRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmRlckJ5Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJCeS5wdXNoKFwiLFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvcmRlckJ5LnB1c2goY29sdW1uRGF0YS5jb25maWcuZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbHVtbkRhdGEuYXNjZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlckJ5LnB1c2goXCIgZGVzY1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcmRlckJ5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeS5vcmRlckJ5ID0gdGhpcy5vcmRlckJ5ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnF1ZXJ5Lm9yZGVyQnkgPSB0aGlzLm9yZGVyQnkgPSBvcmRlckJ5LmpvaW4oXCJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCI8dGFibGUgY2xhc3M9XCJzcS1yZXN1bHRzLWdyaWQtdmlld1wiPlxuICAgIDx0aGVhZD5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRoIGNsYXNzPVwic3EtZ3JpZC12aWV3LWNoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wgY3VzdG9tLWNoZWNrYm94XCIgdGl0bGU9XCJ7eyhoYXZlU2VsZWN0ZWRSZWNvcmRzID8gJ21zZyNyZXN1bHRzLnJlc3VsdHNHcmlkVmlldy51bnNlbGVjdERvY3VtZW50cycgOiAnbXNnI3Jlc3VsdHMucmVzdWx0c0dyaWRWaWV3LnNlbGVjdERvY3VtZW50cycpIHwgc3FNZXNzYWdlfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wtaW5wdXRcIiB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJoYXZlU2VsZWN0ZWRSZWNvcmRzXCIgKGNoYW5nZSk9XCJ0b2dnbGVTZWxlY3RlZFJlY29yZHMoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImN1c3RvbS1jb250cm9sLWxhYmVsXCI+JiM4MjAzOzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2xhYmVsPiAgICAgICAgICAgIFxuICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgIDx0aCAqbmdGb3I9XCJsZXQgY29sdW1uRGF0YSBvZiBjb2x1bW5zRGF0YVwiIHNjb3BlPVwiY29sXCIgW25nQ2xhc3NdPVwieydzcS1jbGlja2FibGUnOiBpc1NvcnRhYmxlKGNvbHVtbkRhdGEpfVwiIChjbGljayk9XCJzZXRTb3J0KGNvbHVtbkRhdGEpXCI+e3tjb2x1bW5EYXRhLmNvbmZpZy50aXRsZSB8IHNxTWVzc2FnZX19e3tjb2x1bW5EYXRhLnNvcnRJbmRpY2F0b3J9fTxzcGFuICpuZ0lmPVwiaXNTb3J0YWJsZShjb2x1bW5EYXRhKVwiIGNsYXNzPVwie3tjb2x1bW5EYXRhLnNvcnRJY29ufX1cIj48L3NwYW4+PC90aD5cbiAgICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuICAgIDx0Ym9keT5cbiAgICAgICAgPHRyICpuZ0Zvcj1cImxldCByZWNvcmQgb2YgcmVzdWx0cy5yZWNvcmRzXCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJzcS1ncmlkLXZpZXctY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICA8c3EtcmVzdWx0LXNlbGVjdG9yIFtyZWNvcmRdPVwicmVjb3JkXCI+PC9zcS1yZXN1bHQtc2VsZWN0b3I+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29sdW1uRGF0YSBvZiBjb2x1bW5zRGF0YTsgbGV0ICRpbmRleCA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgPHRkICpuZ0lmPVwiY29sdW1uRGF0YS5jb25maWcucmVuZGVyQXNIdG1sXCIgW2F0dHIuc2NvcGVdPVwiJGluZGV4ID09PSAwID8gJ3JvdycgOiBudWxsXCIgW2lubmVySFRNTF09XCJyZWNvcmRbY29sdW1uRGF0YS5jb25maWcuZmllbGRdIHwgc3FWYWx1ZTpjb2x1bW5EYXRhLmNvbHVtblwiPjwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkICpuZ0lmPVwiIWNvbHVtbkRhdGEuY29uZmlnLnJlbmRlckFzSHRtbFwiIFthdHRyLnNjb3BlXT1cIiRpbmRleCA9PT0gMCA/ICdyb3cnIDogbnVsbFwiPnt7cmVjb3JkW2NvbHVtbkRhdGEuY29uZmlnLmZpZWxkXSB8IHNxVmFsdWU6Y29sdW1uRGF0YS5jb2x1bW59fTwvdGQ+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC90cj5cbiAgICA8L3Rib2R5PlxuPC90YWJsZT4iXX0=